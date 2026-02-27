import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all notes or filter by entity
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    const where: any = {};

    if (entityType) {
      where.suggestedType = entityType;
    }
    if (entityId) {
      where.suggestedName = entityId;
    }

    const notes = await prisma.note.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// Create a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, entityType, entityId, tags } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Get project ID
    const project = await prisma.project.findFirst();
    if (!project) {
      return NextResponse.json({ error: 'No project found' }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        projectId: project.id,
        title: title || null,
        content,
        suggestedType: entityType || null,
        suggestedName: entityId || null,
        tags: tags || null
      }
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}

// Delete a note
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note ID required' }, { status: 400 });
    }

    await prisma.note.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
