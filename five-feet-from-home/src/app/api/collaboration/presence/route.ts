import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

// Get active users on an entity
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    // Get presence within last 2 minutes
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    let whereClause: Record<string, unknown> = {
      lastSeen: { gte: twoMinutesAgo }
    };

    if (entityType && entityId) {
      whereClause = { ...whereClause, entityType, entityId };
    }

    const presence = await prisma.userPresence.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, email: true, name: true }
        }
      },
      orderBy: { lastSeen: 'desc' }
    });

    // Filter out current user from presence
    const otherUsers = presence.filter(p => p.userId !== session.user.id);

    return NextResponse.json({
      users: otherUsers.map(p => ({
        userId: p.user.id,
        email: p.user.email,
        name: p.user.name,
        action: p.action,
        entityType: p.entityType,
        entityId: p.entityId,
        entityName: p.entityName,
        lastSeen: p.lastSeen
      }))
    });
  } catch (error) {
    console.error('Error fetching presence:', error);
    return NextResponse.json({ error: 'Failed to fetch presence' }, { status: 500 });
  }
}

// Update user presence (heartbeat)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entityType, entityId, entityName, action = 'viewing' } = await request.json();

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId required' }, { status: 400 });
    }

    // Upsert presence
    await prisma.userPresence.upsert({
      where: {
        userId_entityType_entityId: {
          userId: session.user.id,
          entityType,
          entityId
        }
      },
      update: {
        action,
        entityName,
        lastSeen: new Date()
      },
      create: {
        userId: session.user.id,
        entityType,
        entityId,
        entityName,
        action
      }
    });

    // Clean up old presence records (older than 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    await prisma.userPresence.deleteMany({
      where: { lastSeen: { lt: fiveMinutesAgo } }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating presence:', error);
    return NextResponse.json({ error: 'Failed to update presence' }, { status: 500 });
  }
}

// Remove user presence when leaving
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    if (entityType && entityId) {
      await prisma.userPresence.deleteMany({
        where: {
          userId: session.user.id,
          entityType,
          entityId
        }
      });
    } else {
      // Clear all presence for user
      await prisma.userPresence.deleteMany({
        where: { userId: session.user.id }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing presence:', error);
    return NextResponse.json({ error: 'Failed to remove presence' }, { status: 500 });
  }
}
