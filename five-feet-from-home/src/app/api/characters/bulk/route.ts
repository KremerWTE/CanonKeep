import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Bulk update characters
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { characterIds, updates } = body;

    if (!characterIds || !Array.isArray(characterIds) || characterIds.length === 0) {
      return NextResponse.json({ error: 'No character IDs provided' }, { status: 400 });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    // Filter out null/undefined values and empty strings
    const cleanUpdates: Record<string, any> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== null && value !== undefined && value !== '') {
        cleanUpdates[key] = value;
      }
    }

    if (Object.keys(cleanUpdates).length === 0) {
      return NextResponse.json({ error: 'No valid updates provided' }, { status: 400 });
    }

    // Update all selected characters
    const result = await prisma.character.updateMany({
      where: { id: { in: characterIds } },
      data: cleanUpdates
    });

    return NextResponse.json({
      success: true,
      updated: result.count,
      message: `Updated ${result.count} characters`
    });
  } catch (error) {
    console.error('Error bulk updating characters:', error);
    return NextResponse.json({ error: 'Failed to update characters' }, { status: 500 });
  }
}

// Bulk delete characters
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { characterIds } = body;

    if (!characterIds || !Array.isArray(characterIds) || characterIds.length === 0) {
      return NextResponse.json({ error: 'No character IDs provided' }, { status: 400 });
    }

    // Delete related records first
    await prisma.characterRelationship.deleteMany({
      where: {
        OR: [
          { fromCharacterId: { in: characterIds } },
          { toCharacterId: { in: characterIds } }
        ]
      }
    });

    // Delete characters
    const result = await prisma.character.deleteMany({
      where: { id: { in: characterIds } }
    });

    return NextResponse.json({
      success: true,
      deleted: result.count,
      message: `Deleted ${result.count} characters`
    });
  } catch (error) {
    console.error('Error bulk deleting characters:', error);
    return NextResponse.json({ error: 'Failed to delete characters' }, { status: 500 });
  }
}
