import prisma from '../db';
import { parseDocument, ParsedDocument, ParsedChapter } from '../parsers';
import { extractFromChapter, mergeEntities, ExtractedEntity, ExtractionResult } from '../extraction/entities';
import { runConsistencyChecks, saveAlerts } from '../consistency/engine';
import { logger, updateJobProgress, startJob, failJob } from '../logger';
import * as path from 'path';

export interface IngestionOptions {
  projectId: string;
  uploadId: string;
  filePath: string;
  mimeType: string;
  bookId?: string;
  seriesId?: string;
}

export async function processUpload(options: IngestionOptions): Promise<void> {
  const { projectId, uploadId, filePath, mimeType, bookId } = options;

  // Create a job for tracking
  const job = await prisma.job.create({
    data: {
      projectId,
      type: 'ingestion',
      status: 'pending',
      metadata: JSON.stringify({ uploadId, filePath }),
    },
  });

  try {
    await startJob(job.id);

    // Step 1: Parse the document
    logger.info('Parsing document', { jobId: job.id, uploadId, filePath });
    await updateJobProgress(job.id, 10, 'Parsing document', 1);

    const parsedDoc = await parseDocument(filePath, mimeType);

    logger.info(`Parsed document: ${parsedDoc.metadata.wordCount} words, ${parsedDoc.chapters.length} chapters`, {
      jobId: job.id,
    });

    // Step 2: Create or get book
    let targetBookId = bookId;
    if (!targetBookId) {
      const book = await prisma.book.create({
        data: {
          title: path.basename(filePath, path.extname(filePath)),
          projectId,
          seriesId: options.seriesId,
        },
      });
      targetBookId = book.id;
    }

    await updateJobProgress(job.id, 20, 'Creating chapters', 2);

    // Step 3: Create chapters
    const chapters = await Promise.all(
      parsedDoc.chapters.map(async (chapter, index) => {
        return prisma.chapter.create({
          data: {
            title: chapter.title,
            content: chapter.content,
            orderIndex: chapter.orderIndex,
            bookId: targetBookId!,
            wordCount: chapter.content.split(/\s+/).length,
            uploadId,
          },
        });
      })
    );

    logger.info(`Created ${chapters.length} chapters`, { jobId: job.id });

    // Step 4: Extract entities from each chapter
    await updateJobProgress(job.id, 30, 'Extracting entities', 3);

    const existingEntities = await prisma.entity.findMany({
      where: { projectId },
      select: { name: true },
    });
    const existingEntityNames = existingEntities.map(e => e.name);

    const allExtractions: ExtractionResult[] = [];
    const totalChapters = chapters.length;

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const parsedChapter = parsedDoc.chapters[i];

      logger.info(`Extracting from chapter ${i + 1}/${totalChapters}: ${chapter.title}`, { jobId: job.id });

      const progress = 30 + Math.floor((i / totalChapters) * 40);
      await updateJobProgress(job.id, progress, `Extracting: ${chapter.title}`, 3);

      try {
        const extraction = await extractFromChapter(
          parsedChapter.content,
          chapter.title,
          existingEntityNames
        );

        allExtractions.push(extraction);

        // Add newly found entities to the list for next chapter
        for (const entity of extraction.entities) {
          if (!existingEntityNames.includes(entity.name)) {
            existingEntityNames.push(entity.name);
          }
        }
      } catch (error) {
        logger.warn(`Failed to extract from chapter ${chapter.title}: ${error}`, { jobId: job.id });
      }
    }

    // Step 5: Persist entities to database
    await updateJobProgress(job.id, 70, 'Saving entities', 4);

    await persistExtractions(projectId, chapters, allExtractions, job.id);

    // Step 6: Run consistency checks
    await updateJobProgress(job.id, 85, 'Checking consistency', 5);

    const alerts = await runConsistencyChecks(projectId);
    await saveAlerts(projectId, alerts);

    logger.info(`Found ${alerts.length} consistency alerts`, { jobId: job.id });

    // Step 7: Update upload status
    await prisma.upload.update({
      where: { id: uploadId },
      data: {
        status: 'completed',
        processedAt: new Date(),
      },
    });

    await updateJobProgress(job.id, 100, 'Complete', 6);
    logger.info('Ingestion complete', { jobId: job.id, uploadId });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await failJob(job.id, errorMessage);

    await prisma.upload.update({
      where: { id: uploadId },
      data: {
        status: 'failed',
        error: errorMessage,
      },
    });

    throw error;
  }
}

async function persistExtractions(
  projectId: string,
  chapters: { id: string; title: string }[],
  extractions: ExtractionResult[],
  jobId: string
): Promise<void> {
  // Merge all entities
  const allEntities: ExtractedEntity[] = [];
  for (const extraction of extractions) {
    allEntities.push(...extraction.entities);
  }
  const mergedEntities = mergeEntities(allEntities);

  // Create entities
  const entityMap = new Map<string, string>();

  for (const entity of mergedEntities) {
    try {
      const dbEntity = await prisma.entity.upsert({
        where: {
          projectId_name_type: {
            projectId,
            name: entity.name,
            type: entity.type,
          },
        },
        create: {
          projectId,
          name: entity.name,
          type: entity.type,
          description: entity.description,
          aliases: entity.aliases ? JSON.stringify(entity.aliases) : null,
          metadata: entity.attributes ? JSON.stringify(entity.attributes) : null,
        },
        update: {
          description: entity.description,
          aliases: entity.aliases ? JSON.stringify(entity.aliases) : undefined,
          metadata: entity.attributes ? JSON.stringify(entity.attributes) : undefined,
        },
      });

      entityMap.set(`${entity.name.toLowerCase()}-${entity.type}`, dbEntity.id);

      // Create mentions for each chapter where this entity appears
      for (let i = 0; i < extractions.length; i++) {
        const extraction = extractions[i];
        const chapter = chapters[i];

        const entityInChapter = extraction.entities.find(
          e => e.name.toLowerCase() === entity.name.toLowerCase() && e.type === entity.type
        );

        if (entityInChapter) {
          for (const mention of entityInChapter.mentions) {
            await prisma.entityMention.create({
              data: {
                entityId: dbEntity.id,
                chapterId: chapter.id,
                startOffset: mention.startOffset,
                endOffset: mention.endOffset,
                evidenceSnippet: mention.text,
                context: mention.context,
              },
            });
          }
        }
      }
    } catch (error) {
      logger.warn(`Failed to create entity ${entity.name}: ${error}`, { jobId });
    }
  }

  // Create relationships
  for (let i = 0; i < extractions.length; i++) {
    const extraction = extractions[i];
    const chapter = chapters[i];

    for (const rel of extraction.relationships) {
      const sourceKey = `${rel.sourceEntity.toLowerCase()}-character`;
      const targetKey = `${rel.targetEntity.toLowerCase()}-character`;

      const sourceId = entityMap.get(sourceKey);
      const targetId = entityMap.get(targetKey);

      if (sourceId && targetId) {
        try {
          await prisma.relationship.create({
            data: {
              sourceEntityId: sourceId,
              targetEntityId: targetId,
              relationType: rel.relationType,
              description: rel.description,
              evidence: rel.evidence,
              chapterId: chapter.id,
            },
          });
        } catch (error) {
          logger.warn(`Failed to create relationship: ${error}`, { jobId });
        }
      }
    }

    // Create events
    for (const event of extraction.events) {
      try {
        await prisma.event.create({
          data: {
            name: event.name,
            description: event.description,
            chapterId: chapter.id,
            orderIndex: event.orderIndex,
            narrativeTime: event.narrativeTime,
            participants: JSON.stringify(event.participants),
            location: event.location,
            evidence: event.evidence,
            eventType: event.eventType,
          },
        });
      } catch (error) {
        logger.warn(`Failed to create event: ${error}`, { jobId });
      }
    }

    // Create facts
    for (const fact of extraction.facts) {
      const entityKey = `${fact.entityName.toLowerCase()}-character`;
      const entityId = entityMap.get(entityKey);

      if (entityId) {
        try {
          await prisma.canonFact.create({
            data: {
              entityId,
              factType: fact.factType,
              factValue: fact.factValue,
              evidence: fact.evidence,
              chapterId: chapter.id,
            },
          });
        } catch (error) {
          logger.warn(`Failed to create fact: ${error}`, { jobId });
        }
      }
    }
  }

  logger.info(`Persisted ${mergedEntities.length} entities`, { jobId });
}
