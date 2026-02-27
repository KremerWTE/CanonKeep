import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface DocumentSearchResult {
  id: string;
  type: 'document' | 'block' | 'character' | 'crisis' | 'gala' | 'chapter' | 'location';
  name: string;
  matchedField: string;
  matchedText: string;
  documentName?: string;
  documentId?: string;
  score: number;
  link: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const documentIds = searchParams.get('documents')?.split(',').filter(Boolean);
    const entityTypes = searchParams.get('types')?.split(',').filter(Boolean);
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!query || query.length < 2) {
      return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 });
    }

    const results: DocumentSearchResult[] = [];
    const searchLower = query.toLowerCase();

    // Helper functions
    const matches = (text: string | null | undefined): boolean => {
      if (!text) return false;
      return text.toLowerCase().includes(searchLower);
    };

    const getSnippet = (text: string | null | undefined, maxLen: number = 150): string => {
      if (!text) return '';
      const lower = text.toLowerCase();
      const idx = lower.indexOf(searchLower);
      if (idx === -1) return text.slice(0, maxLen);

      const start = Math.max(0, idx - 50);
      const end = Math.min(text.length, idx + query.length + 100);
      let snippet = text.slice(start, end);
      if (start > 0) snippet = '...' + snippet;
      if (end < text.length) snippet = snippet + '...';
      return snippet;
    };

    const shouldSearch = (type: string): boolean => {
      if (!entityTypes || entityTypes.length === 0) return true;
      return entityTypes.includes(type);
    };

    // Search in content blocks (raw document text)
    if (shouldSearch('document')) {
      const whereClause: Record<string, unknown> = {
        rawText: { contains: query }
      };

      if (documentIds && documentIds.length > 0) {
        whereClause.documentId = { in: documentIds };
      }

      const blocks = await prisma.contentBlock.findMany({
        where: whereClause,
        include: {
          document: {
            select: { id: true, fileName: true }
          }
        },
        take: limit
      });

      for (const block of blocks) {
        results.push({
          id: block.id,
          type: 'block',
          name: block.sectionHeading || `Block ${block.blockIndex}`,
          matchedField: 'content',
          matchedText: getSnippet(block.rawText),
          documentName: block.document.fileName,
          documentId: block.document.id,
          score: 0.7,
          link: `/documents/${block.document.id}#block-${block.blockIndex}`
        });
      }
    }

    // Search characters
    if (shouldSearch('character')) {
      const characters = await prisma.character.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { background: { contains: query } },
            { personality: { contains: query } },
            { appearance: { contains: query } },
            { motivations: { contains: query } },
            { rawNotes: { contains: query } }
          ]
        },
        take: limit
      });

      for (const char of characters) {
        const fields = [
          { name: 'name', value: char.name, score: 1.0 },
          { name: 'background', value: char.background, score: 0.8 },
          { name: 'personality', value: char.personality, score: 0.8 },
          { name: 'appearance', value: char.appearance, score: 0.7 },
          { name: 'motivations', value: char.motivations, score: 0.8 },
          { name: 'rawNotes', value: char.rawNotes, score: 0.6 }
        ];

        for (const field of fields) {
          if (matches(field.value)) {
            results.push({
              id: char.id,
              type: 'character',
              name: char.name,
              matchedField: field.name,
              matchedText: getSnippet(field.value),
              score: field.score,
              link: `/characters/${char.id}`
            });
            break;
          }
        }
      }
    }

    // Search crises
    if (shouldSearch('crisis')) {
      const crises = await prisma.crisis.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { resolution: { contains: query } },
            { lessonsLearned: { contains: query } }
          ]
        },
        take: limit
      });

      for (const crisis of crises) {
        const fields = [
          { name: 'title', value: crisis.title, score: 1.0 },
          { name: 'description', value: crisis.description, score: 0.8 },
          { name: 'resolution', value: crisis.resolution, score: 0.7 },
          { name: 'lessonsLearned', value: crisis.lessonsLearned, score: 0.7 }
        ];

        for (const field of fields) {
          if (matches(field.value)) {
            results.push({
              id: crisis.id,
              type: 'crisis',
              name: crisis.title,
              matchedField: field.name,
              matchedText: getSnippet(field.value),
              score: field.score,
              link: `/crises/${crisis.id}`
            });
            break;
          }
        }
      }
    }

    // Search galas
    if (shouldSearch('gala')) {
      const galas = await prisma.gala.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { theme: { contains: query } },
            { description: { contains: query } },
            { venue: { contains: query } }
          ]
        },
        take: limit
      });

      for (const gala of galas) {
        const fields = [
          { name: 'title', value: gala.title, score: 1.0 },
          { name: 'theme', value: gala.theme, score: 0.9 },
          { name: 'description', value: gala.description, score: 0.8 },
          { name: 'venue', value: gala.venue, score: 0.7 }
        ];

        for (const field of fields) {
          if (matches(field.value)) {
            results.push({
              id: gala.id,
              type: 'gala',
              name: gala.title,
              matchedField: field.name,
              matchedText: getSnippet(field.value),
              score: field.score,
              link: `/galas/${gala.id}`
            });
            break;
          }
        }
      }
    }

    // Search chapters
    if (shouldSearch('chapter')) {
      const chapters = await prisma.chapter.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { synopsis: { contains: query } },
            { draftText: { contains: query } }
          ]
        },
        include: {
          book: { select: { title: true } }
        },
        take: limit
      });

      for (const chapter of chapters) {
        const fields = [
          { name: 'title', value: chapter.title, score: 1.0 },
          { name: 'synopsis', value: chapter.synopsis, score: 0.8 },
          { name: 'draftText', value: chapter.draftText, score: 0.6 }
        ];

        for (const field of fields) {
          if (matches(field.value)) {
            results.push({
              id: chapter.id,
              type: 'chapter',
              name: chapter.title || `Chapter ${chapter.number}`,
              matchedField: field.name,
              matchedText: getSnippet(field.value),
              documentName: chapter.book?.title,
              score: field.score,
              link: `/chapters/${chapter.id}`
            });
            break;
          }
        }
      }
    }

    // Search locations
    if (shouldSearch('location')) {
      const locations = await prisma.location.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { significance: { contains: query } }
          ]
        },
        take: limit
      });

      for (const loc of locations) {
        const fields = [
          { name: 'name', value: loc.name, score: 1.0 },
          { name: 'description', value: loc.description, score: 0.8 },
          { name: 'significance', value: loc.significance, score: 0.7 }
        ];

        for (const field of fields) {
          if (matches(field.value)) {
            results.push({
              id: loc.id,
              type: 'location',
              name: loc.name,
              matchedField: field.name,
              matchedText: getSnippet(field.value),
              score: field.score,
              link: `/locations/${loc.id}`
            });
            break;
          }
        }
      }
    }

    // Sort by score
    results.sort((a, b) => b.score - a.score);

    // Get available documents for filter
    const documents = await prisma.document.findMany({
      select: { id: true, fileName: true }
    });

    return NextResponse.json({
      results: results.slice(0, limit),
      total: results.length,
      documents,
      entityTypes: ['document', 'character', 'crisis', 'gala', 'chapter', 'location']
    });

  } catch (error) {
    console.error('Document search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
