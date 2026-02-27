import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

// GET /api/projects/[projectId]/entities - List entities
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const entities = await prisma.entity.findMany({
      where: {
        projectId,
        ...(type ? { type } : {}),
      },
      include: {
        _count: {
          select: {
            mentions: true,
            facts: true,
            sourceRelations: true,
            targetRelations: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(entities);
  } catch (error) {
    console.error('Failed to fetch entities:', error);
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 });
  }
}
