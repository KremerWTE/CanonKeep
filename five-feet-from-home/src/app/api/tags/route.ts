import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get all tags with usage counts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    // Get project
    const project = await prisma.project.findFirst();
    if (!project) {
      return NextResponse.json({ error: 'No project found' }, { status: 404 });
    }

    // Build where clause
    const whereClause: Record<string, unknown> = { projectId: project.id };
    if (category) {
      whereClause.category = category;
    }

    // Get tags
    const tags = await prisma.tag.findMany({
      where: whereClause,
      include: {
        entityTags: entityType && entityId ? {
          where: { entityType, entityId }
        } : {
          take: 0 // Don't fetch entity tags by default
        },
        _count: {
          select: { entityTags: true }
        }
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }]
    });

    // If entityId is provided, get tags for that entity
    let entityTags: string[] = [];
    if (entityType && entityId) {
      const eTags = await prisma.entityTag.findMany({
        where: { entityType, entityId },
        select: { tagId: true }
      });
      entityTags = eTags.map(et => et.tagId);
    }

    // Get categories with counts
    const categories = await prisma.tag.groupBy({
      by: ['category'],
      where: { projectId: project.id },
      _count: { category: true }
    });

    return NextResponse.json({
      tags: tags.map(t => ({
        id: t.id,
        name: t.name,
        color: t.color,
        category: t.category,
        description: t.description,
        usageCount: t._count.entityTags,
        isApplied: entityTags.includes(t.id)
      })),
      categories: categories.map(c => ({
        name: c.category || 'uncategorized',
        count: c._count.category
      })),
      entityTags
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

// Create a new tag
export async function POST(request: NextRequest) {
  try {
    const { name, color, category, description } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Tag name required' }, { status: 400 });
    }

    const project = await prisma.project.findFirst();
    if (!project) {
      return NextResponse.json({ error: 'No project found' }, { status: 404 });
    }

    // Check if tag exists
    const existing = await prisma.tag.findFirst({
      where: { projectId: project.id, name }
    });

    if (existing) {
      return NextResponse.json({ error: 'Tag already exists', tag: existing }, { status: 409 });
    }

    const tag = await prisma.tag.create({
      data: {
        projectId: project.id,
        name,
        color: color || '#6B7280',
        category: category || null,
        description: description || null
      }
    });

    return NextResponse.json({ success: true, tag });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}

// Update a tag
export async function PUT(request: NextRequest) {
  try {
    const { id, name, color, category, description } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Tag ID required' }, { status: 400 });
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name,
        color,
        category,
        description
      }
    });

    return NextResponse.json({ success: true, tag });
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 });
  }
}

// Delete a tag
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Tag ID required' }, { status: 400 });
    }

    await prisma.tag.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
  }
}
