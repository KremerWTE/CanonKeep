import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

// Get comments for an entity
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const includeResolved = searchParams.get('includeResolved') === 'true';

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId required' }, { status: 400 });
    }

    const whereClause: Record<string, unknown> = {
      entityType,
      entityId,
      parentId: null // Only get top-level comments
    };

    if (!includeResolved) {
      whereClause.isResolved = false;
    }

    const comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, email: true, name: true }
        },
        replies: {
          include: {
            user: {
              select: { id: true, email: true, name: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      comments: comments.map(c => ({
        id: c.id,
        content: c.content,
        isResolved: c.isResolved,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        user: c.user,
        isOwn: c.userId === session.user.id,
        replies: c.replies.map(r => ({
          id: r.id,
          content: r.content,
          createdAt: r.createdAt,
          user: r.user,
          isOwn: r.userId === session.user.id
        }))
      }))
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// Create a comment
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entityType, entityId, content, parentId } = await request.json();

    if (!entityType || !entityId || !content) {
      return NextResponse.json({ error: 'entityType, entityId, and content required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        userId: session.user.id,
        entityType,
        entityId,
        content,
        parentId: parentId || null
      },
      include: {
        user: {
          select: { id: true, email: true, name: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        user: comment.user,
        isOwn: true
      }
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

// Update a comment (resolve or edit content)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, content, isResolved } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Comment ID required' }, { status: 400 });
    }

    // Check ownership or admin status
    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Only owner can edit content, but anyone can resolve
    if (content !== undefined && existing.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Cannot edit others comments' }, { status: 403 });
    }

    const updateData: Record<string, unknown> = {};
    if (content !== undefined) updateData.content = content;
    if (isResolved !== undefined) updateData.isResolved = isResolved;

    const comment = await prisma.comment.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
  }
}

// Delete a comment
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Comment ID required' }, { status: 400 });
    }

    // Check ownership or admin status
    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    if (existing.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Cannot delete others comments' }, { status: 403 });
    }

    // Delete comment and its replies
    await prisma.comment.deleteMany({
      where: { OR: [{ id }, { parentId: id }] }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
