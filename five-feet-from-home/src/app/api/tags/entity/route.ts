import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get tags for a specific entity
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId required' }, { status: 400 });
    }

    const entityTags = await prisma.entityTag.findMany({
      where: { entityType, entityId },
      include: {
        tag: true
      }
    });

    return NextResponse.json({
      tags: entityTags.map(et => ({
        id: et.tag.id,
        name: et.tag.name,
        color: et.tag.color,
        category: et.tag.category
      }))
    });
  } catch (error) {
    console.error('Error fetching entity tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

// Apply a tag to an entity
export async function POST(request: NextRequest) {
  try {
    const { tagId, entityType, entityId, entityName } = await request.json();

    if (!tagId || !entityType || !entityId) {
      return NextResponse.json({ error: 'tagId, entityType, and entityId required' }, { status: 400 });
    }

    // Check if already applied
    const existing = await prisma.entityTag.findFirst({
      where: { tagId, entityType, entityId }
    });

    if (existing) {
      return NextResponse.json({ success: true, message: 'Tag already applied' });
    }

    // Create entity tag
    const entityTag = await prisma.entityTag.create({
      data: {
        tagId,
        entityType,
        entityId,
        entityName
      }
    });

    // Update usage count
    await prisma.tag.update({
      where: { id: tagId },
      data: { usageCount: { increment: 1 } }
    });

    return NextResponse.json({ success: true, entityTag });
  } catch (error) {
    console.error('Error applying tag:', error);
    return NextResponse.json({ error: 'Failed to apply tag' }, { status: 500 });
  }
}

// Remove a tag from an entity
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tagId = searchParams.get('tagId');
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    if (!tagId || !entityType || !entityId) {
      return NextResponse.json({ error: 'tagId, entityType, and entityId required' }, { status: 400 });
    }

    // Find and delete
    const entityTag = await prisma.entityTag.findFirst({
      where: { tagId, entityType, entityId }
    });

    if (entityTag) {
      await prisma.entityTag.delete({ where: { id: entityTag.id } });

      // Update usage count
      await prisma.tag.update({
        where: { id: tagId },
        data: { usageCount: { decrement: 1 } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing tag:', error);
    return NextResponse.json({ error: 'Failed to remove tag' }, { status: 500 });
  }
}
