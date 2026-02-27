import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import type { ManuscriptExport, BookStructure, ChapterOutline } from '@/types';

/**
 * Export a book as a Markdown manuscript
 */
export async function exportManuscript(
  prisma: PrismaClient,
  bookId: string,
  outputPath?: string
): Promise<string> {
  // Get book with chapters
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      chapters: {
        orderBy: { sortOrder: 'asc' },
        include: {
          characters: {
            include: { character: true },
          },
          plots: {
            include: { plotThread: true },
          },
        },
      },
      project: true,
    },
  });

  if (!book) {
    throw new Error(`Book not found: ${bookId}`);
  }

  // Build manuscript content
  let markdown = `# ${book.title}\n\n`;

  if (book.subtitle) {
    markdown += `*${book.subtitle}*\n\n`;
  }

  if (book.synopsis) {
    markdown += `## Synopsis\n\n${book.synopsis}\n\n`;
  }

  markdown += `---\n\n`;

  // Add chapters
  for (const chapter of book.chapters) {
    const chapterTitle = chapter.title || `Chapter ${chapter.number}`;
    markdown += `## ${chapterTitle}\n\n`;

    if (chapter.synopsis) {
      markdown += `*${chapter.synopsis}*\n\n`;
    }

    if (chapter.draftText) {
      markdown += `${chapter.draftText}\n\n`;
    }

    // Add provenance info
    const provenance = await getChapterProvenance(prisma, chapter.id);
    if (provenance.length > 0) {
      markdown += `---\n\n`;
      markdown += `**Sources:**\n`;
      for (const p of provenance) {
        markdown += `- ${p.documentName}: ${p.sectionHeading || 'Section'} (Block ${p.blockIndex})\n`;
      }
      markdown += `\n`;
    }

    markdown += `---\n\n`;
  }

  // Add metadata
  markdown += `\n---\n\n`;
  markdown += `*Generated from project: ${book.project.name}*\n`;
  markdown += `*Export date: ${new Date().toISOString()}*\n`;

  // Write to file if path provided
  if (outputPath) {
    const resolvedPath = path.resolve(outputPath);
    fs.writeFileSync(resolvedPath, markdown, 'utf-8');
  }

  return markdown;
}

/**
 * Get provenance information for a chapter
 */
async function getChapterProvenance(
  prisma: PrismaClient,
  chapterId: string
): Promise<{ documentName: string; sectionHeading: string | null; blockIndex: number }[]> {
  const provenances = await prisma.provenance.findMany({
    where: {
      entityType: 'chapter',
      entityId: chapterId,
    },
    include: {
      block: {
        include: {
          document: true,
        },
      },
    },
  });

  return provenances.map(p => ({
    documentName: p.block.document.fileName,
    sectionHeading: p.block.sectionHeading,
    blockIndex: p.block.blockIndex,
  }));
}

/**
 * Generate a suggested chapter structure for a book
 */
export async function generateChapterStructure(
  prisma: PrismaClient,
  projectId: string
): Promise<ChapterOutline[]> {
  // Get all chapters in the project
  const chapters = await prisma.chapter.findMany({
    where: { projectId },
    orderBy: [{ number: 'asc' }, { sortOrder: 'asc' }],
    include: {
      characters: {
        include: { character: true },
      },
      plots: {
        include: { plotThread: true },
      },
      events: {
        include: { event: true },
      },
    },
  });

  // If we have existing chapters, use them
  if (chapters.length > 0) {
    return chapters.map((ch, index) => ({
      number: ch.number || index + 1,
      title: ch.title || undefined,
      synopsis: ch.synopsis || undefined,
      beats: ch.beats ? JSON.parse(ch.beats) : [],
      linkedCharacters: ch.characters.map(cc => cc.character.name),
      linkedPlots: ch.plots.map(cp => cp.plotThread.name),
      linkedEvents: ch.events.map(ce => ce.event.name),
    }));
  }

  // Otherwise, try to generate from plot threads and events
  const plotThreads = await prisma.plotThread.findMany({
    where: { projectId },
    include: {
      characters: {
        include: { character: true },
      },
    },
  });

  const events = await prisma.event.findMany({
    where: { projectId },
    orderBy: { timelineSort: 'asc' },
  });

  // Create a basic chapter outline from plot phases and events
  const outlines: ChapterOutline[] = [];
  let chapterNum = 1;

  // Add chapters based on plot thread phases
  for (const plot of plotThreads) {
    if (plot.phases) {
      const phases = JSON.parse(plot.phases) as string[];
      for (const phase of phases) {
        outlines.push({
          number: chapterNum++,
          title: `${plot.name} - Phase`,
          synopsis: phase,
          beats: [],
          linkedCharacters: plot.characters.map(pc => pc.character.name),
          linkedPlots: [plot.name],
          linkedEvents: [],
        });
      }
    }
  }

  // If no plot phases, create chapters from events
  if (outlines.length === 0 && events.length > 0) {
    for (const event of events) {
      outlines.push({
        number: chapterNum++,
        title: event.name,
        synopsis: event.description || undefined,
        beats: [],
        linkedCharacters: [],
        linkedPlots: [],
        linkedEvents: [event.name],
      });
    }
  }

  return outlines;
}

/**
 * Create a book with suggested structure
 */
export async function createBookFromStructure(
  prisma: PrismaClient,
  projectId: string,
  title: string,
  structure: BookStructure,
  chapterOutlines: ChapterOutline[]
): Promise<string> {
  const book = await prisma.book.create({
    data: {
      projectId,
      title,
      structure: JSON.stringify(structure),
    },
  });

  // Create chapters
  for (const outline of chapterOutlines) {
    const chapter = await prisma.chapter.create({
      data: {
        projectId,
        bookId: book.id,
        number: outline.number,
        title: outline.title,
        synopsis: outline.synopsis,
        beats: JSON.stringify(outline.beats),
        sortOrder: outline.number,
      },
    });

    // Link characters
    for (const charName of outline.linkedCharacters) {
      const character = await prisma.character.findFirst({
        where: { projectId, name: charName },
      });
      if (character) {
        await prisma.chapterCharacter.create({
          data: {
            chapterId: chapter.id,
            characterId: character.id,
          },
        });
      }
    }

    // Link plot threads
    for (const plotName of outline.linkedPlots) {
      const plot = await prisma.plotThread.findFirst({
        where: { projectId, name: plotName },
      });
      if (plot) {
        await prisma.chapterPlot.create({
          data: {
            chapterId: chapter.id,
            plotThreadId: plot.id,
          },
        });
      }
    }
  }

  return book.id;
}
