import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

// GET /api/projects/[projectId]/relationships - List relationships
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;

    const relationships = await prisma.relationship.findMany({
      where: {
        sourceEntity: { projectId },
      },
      include: {
        sourceEntity: {
          select: { id: true, name: true, type: true },
        },
        targetEntity: {
          select: { id: true, name: true, type: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(relationships);
  } catch (error) {
    console.error('Failed to fetch relationships:', error);
    return NextResponse.json({ error: 'Failed to fetch relationships' }, { status: 500 });
  }
}
