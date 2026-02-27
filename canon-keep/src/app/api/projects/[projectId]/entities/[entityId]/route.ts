import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
  params: Promise<{ projectId: string; entityId: string }>;
}

// GET /api/projects/[projectId]/entities/[entityId] - Get entity details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId, entityId } = await params;

    const entity = await prisma.entity.findUnique({
      where: { id: entityId },
      include: {
        mentions: {
          include: {
            chapter: {
              select: {
                id: true,
                title: true,
                orderIndex: true,
                book: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
          orderBy: {
            chapter: { orderIndex: 'asc' },
          },
        },
        facts: {
          orderBy: { createdAt: 'asc' },
        },
        sourceRelations: {
          include: {
            targetEntity: {
              select: { id: true, name: true, type: true },
            },
          },
        },
        targetRelations: {
          include: {
            sourceEntity: {
              select: { id: true, name: true, type: true },
            },
          },
        },
      },
    });

    if (!entity || entity.projectId !== projectId) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Parse JSON fields
    const result = {
      ...entity,
      aliases: entity.aliases ? JSON.parse(entity.aliases) : [],
      metadata: entity.metadata ? JSON.parse(entity.metadata) : {},
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch entity:', error);
    return NextResponse.json({ error: 'Failed to fetch entity' }, { status: 500 });
  }
}

// PUT /api/projects/[projectId]/entities/[entityId] - Update entity
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { entityId } = await params;
    const body = await request.json();
    const { name, description, aliases } = body;

    const entity = await prisma.entity.update({
      where: { id: entityId },
      data: {
        name,
        description,
        aliases: aliases ? JSON.stringify(aliases) : undefined,
      },
    });

    return NextResponse.json(entity);
  } catch (error) {
    console.error('Failed to update entity:', error);
    return NextResponse.json({ error: 'Failed to update entity' }, { status: 500 });
  }
}

// DELETE /api/projects/[projectId]/entities/[entityId] - Delete entity
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { entityId } = await params;

    await prisma.entity.delete({
      where: { id: entityId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete entity:', error);
    return NextResponse.json({ error: 'Failed to delete entity' }, { status: 500 });
  }
}
