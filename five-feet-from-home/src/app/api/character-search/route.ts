import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search content blocks for the character name
    const blocks = await prisma.contentBlock.findMany({
      where: {
        rawText: {
          contains: query,
        },
      },
      include: {
        document: {
          select: { fileName: true },
        },
      },
      orderBy: [
        { documentId: 'asc' },
        { blockIndex: 'asc' },
      ],
      take: 100, // Limit results
    });

    const results = blocks.map((block) => ({
      document: block.document.fileName,
      blockIndex: block.blockIndex,
      text: block.rawText.length > 500
        ? block.rawText.substring(0, 500) + '...'
        : block.rawText,
      context: block.sectionHeading || 'General',
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
