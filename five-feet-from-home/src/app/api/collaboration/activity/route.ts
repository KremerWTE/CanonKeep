import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

// Get recent activity (combination of audit logs, comments, and presence)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    const project = await prisma.project.findFirst();
    if (!project) {
      return NextResponse.json({ error: 'No project found' }, { status: 404 });
    }

    // Build where clause for audit logs
    const auditWhere: Record<string, unknown> = { projectId: project.id };
    if (entityType && entityId) {
      auditWhere.entityType = entityType;
      auditWhere.entityId = entityId;
    }

    // Get recent audit logs
    const auditLogs = await prisma.auditLog.findMany({
      where: auditWhere,
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    // Get active users (last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const presenceWhere: Record<string, unknown> = {
      lastSeen: { gte: fiveMinutesAgo }
    };
    if (entityType && entityId) {
      presenceWhere.entityType = entityType;
      presenceWhere.entityId = entityId;
    }

    const activeUsers = await prisma.userPresence.findMany({
      where: presenceWhere,
      include: {
        user: { select: { id: true, email: true, name: true } }
      },
      orderBy: { lastSeen: 'desc' }
    });

    // Get recent comments
    const commentWhere: Record<string, unknown> = {};
    if (entityType && entityId) {
      commentWhere.entityType = entityType;
      commentWhere.entityId = entityId;
    }

    const recentComments = await prisma.comment.findMany({
      where: commentWhere,
      include: {
        user: { select: { id: true, email: true, name: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    // Combine and format activity
    const activity = [
      ...auditLogs.map(log => ({
        type: 'edit' as const,
        action: log.action,
        entityType: log.entityType,
        entityId: log.entityId,
        entityName: log.entityName,
        fieldName: log.fieldName,
        user: log.changedBy,
        timestamp: log.createdAt
      })),
      ...recentComments.map(comment => ({
        type: 'comment' as const,
        action: 'comment',
        entityType: comment.entityType,
        entityId: comment.entityId,
        content: comment.content.substring(0, 100) + (comment.content.length > 100 ? '...' : ''),
        user: comment.user.email,
        userId: comment.user.id,
        userName: comment.user.name,
        timestamp: comment.createdAt
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    return NextResponse.json({
      activity,
      activeUsers: activeUsers.map(p => ({
        userId: p.user.id,
        email: p.user.email,
        name: p.user.name,
        action: p.action,
        entityType: p.entityType,
        entityId: p.entityId,
        entityName: p.entityName,
        lastSeen: p.lastSeen
      })),
      stats: {
        totalActivity: activity.length,
        activeUserCount: new Set(activeUsers.map(p => p.userId)).size
      }
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 });
  }
}
