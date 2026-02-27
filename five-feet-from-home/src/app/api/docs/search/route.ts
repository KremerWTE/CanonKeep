import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const entityType = searchParams.get('type'); // gala, crisis, character, etc.
  const entityName = searchParams.get('name'); // specific entity name to search for
  const limit = parseInt(searchParams.get('limit') || '20');

  if (!query && !entityName) {
    return NextResponse.json({ error: 'Query or entity name required' }, { status: 400 });
  }

  try {
    const searchTerm = entityName || query || '';

    // Search content blocks for relevant text
    const blocks = await prisma.contentBlock.findMany({
      where: {
        rawText: {
          contains: searchTerm,
        },
      },
      include: {
        document: {
          select: {
            fileName: true,
          },
        },
      },
      take: limit * 3, // Get more to filter
    });

    // Process and deduplicate results
    const results: {
      id: string;
      text: string;
      source: string;
      section: string | null;
      relevance: number;
    }[] = [];

    const seenText = new Set<string>();

    for (const block of blocks) {
      // Skip very short or duplicate content
      const text = block.rawText.trim();
      if (text.length < 50) continue;

      // Create a key for deduplication (first 100 chars)
      const key = text.substring(0, 100).toLowerCase();
      if (seenText.has(key)) continue;
      seenText.add(key);

      // Skip obvious non-content
      if (text.startsWith('Skip to content') ||
          text.startsWith('Chat history') ||
          text.startsWith('You said:') ||
          text.startsWith('ChatGPT said:')) continue;

      // Calculate relevance based on keyword matches
      const lowerText = text.toLowerCase();
      const lowerSearch = searchTerm.toLowerCase();
      let relevance = 0;

      // Exact phrase match
      if (lowerText.includes(lowerSearch)) {
        relevance += 10;
      }

      // Word matches
      const searchWords = lowerSearch.split(/\s+/);
      for (const word of searchWords) {
        if (word.length > 2 && lowerText.includes(word)) {
          relevance += 2;
        }
      }

      // Boost for specific entity types in content
      if (entityType === 'gala' && (lowerText.includes('gala') || lowerText.includes('event') || lowerText.includes('party'))) {
        relevance += 5;
      }
      if (entityType === 'crisis' && (lowerText.includes('crisis') || lowerText.includes('operation') || lowerText.includes('mission'))) {
        relevance += 5;
      }
      if (entityType === 'character' && (lowerText.includes('character') || lowerText.includes('personality') || lowerText.includes('background'))) {
        relevance += 5;
      }

      if (relevance > 0) {
        results.push({
          id: block.id,
          text: text.length > 500 ? text.substring(0, 500) + '...' : text,
          source: block.document.fileName,
          section: block.sectionHeading,
          relevance,
        });
      }
    }

    // Sort by relevance and limit
    results.sort((a, b) => b.relevance - a.relevance);
    const finalResults = results.slice(0, limit);

    // Also get list of source documents that mention this term
    const docs = await prisma.document.findMany({
      where: {
        blocks: {
          some: {
            rawText: {
              contains: searchTerm,
            },
          },
        },
      },
      select: {
        id: true,
        fileName: true,
        _count: {
          select: { blocks: true },
        },
      },
    });

    return NextResponse.json({
      query: searchTerm,
      results: finalResults,
      sources: docs.map(d => ({
        id: d.id,
        fileName: d.fileName,
        blockCount: d._count.blocks,
      })),
      totalFound: results.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
