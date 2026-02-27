import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

// GET /api/projects/[projectId]/events - List events (timeline)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;

    const events = await prisma.event.findMany({
      where: {
        chapter: {
          book: { projectId },
        },
      },
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
            orderIndex: true,
            book: {
              select: { id: true, title: true },
            },
          },
        },
      },
      orderBy: [
        { chapter: { book: { orderIndex: 'asc' } } },
        { chapter: { orderIndex: 'asc' } },
        { orderIndex: 'asc' },
      ],
    });

    // Parse participants JSON
    const result = events.map(event => ({
      ...event,
      participants: event.participants ? JSON.parse(event.participants) : [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
