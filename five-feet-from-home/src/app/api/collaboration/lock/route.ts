import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Check if entity is locked
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId required' }, { status: 400 });
    }

    // Clean up expired locks first
    await prisma.editLock.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });

    // Check for existing lock
    const lock = await prisma.editLock.findUnique({
      where: { entityType_entityId: { entityType, entityId } },
      include: {
        user: {
          select: { id: true, email: true, name: true }
        }
      }
    });

    if (!lock) {
      return NextResponse.json({ locked: false });
    }

    const isOwnLock = lock.userId === session.user.id;

    return NextResponse.json({
      locked: true,
      isOwnLock,
      lockedBy: {
        id: lock.user.id,
        email: lock.user.email,
        name: lock.user.name
      },
      lockedAt: lock.lockedAt,
      expiresAt: lock.expiresAt
    });
  } catch (error) {
    console.error('Error checking lock:', error);
    return NextResponse.json({ error: 'Failed to check lock' }, { status: 500 });
  }
}

// Acquire or refresh lock
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user can edit
    if (session.user.role === 'viewer') {
      return NextResponse.json({ error: 'Viewers cannot edit' }, { status: 403 });
    }

    const { entityType, entityId, entityName } = await request.json();

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId required' }, { status: 400 });
    }

    // Clean up expired locks first
    await prisma.editLock.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });

    // Check for existing lock
    const existingLock = await prisma.editLock.findUnique({
      where: { entityType_entityId: { entityType, entityId } },
      include: { user: { select: { email: true, name: true } } }
    });

    if (existingLock && existingLock.userId !== session.user.id) {
      return NextResponse.json({
        success: false,
        error: 'Entity is locked by another user',
        lockedBy: {
          email: existingLock.user.email,
          name: existingLock.user.name
        },
        expiresAt: existingLock.expiresAt
      }, { status: 409 });
    }

    const expiresAt = new Date(Date.now() + LOCK_DURATION_MS);

    // Create or refresh lock
    const lock = await prisma.editLock.upsert({
      where: { entityType_entityId: { entityType, entityId } },
      update: {
        expiresAt,
        entityName
      },
      create: {
        userId: session.user.id,
        entityType,
        entityId,
        entityName,
        expiresAt
      }
    });

    return NextResponse.json({
      success: true,
      lock: {
        id: lock.id,
        expiresAt: lock.expiresAt
      }
    });
  } catch (error) {
    console.error('Error acquiring lock:', error);
    return NextResponse.json({ error: 'Failed to acquire lock' }, { status: 500 });
  }
}

// Release lock
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId required' }, { status: 400 });
    }

    // Only delete own locks (or admin can delete any)
    const whereClause: Record<string, unknown> = {
      entityType,
      entityId
    };

    if (session.user.role !== 'admin') {
      whereClause.userId = session.user.id;
    }

    await prisma.editLock.deleteMany({ where: whereClause });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error releasing lock:', error);
    return NextResponse.json({ error: 'Failed to release lock' }, { status: 500 });
  }
}
