import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get audit logs with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const limit = parseInt(searchParams.get('limit') || '100');

    const where: any = {};

    if (entityType) {
      where.entityType = entityType;
    }
    if (entityId) {
      where.entityId = entityId;
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    // Get summary stats
    const stats = await prisma.auditLog.groupBy({
      by: ['entityType', 'action'],
      _count: true
    });

    return NextResponse.json({
      logs,
      stats: stats.map(s => ({
        entityType: s.entityType,
        action: s.action,
        count: s._count
      }))
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

// Create an audit log entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entityType, entityId, entityName, action, fieldName, oldValue, newValue, changedBy } = body;

    if (!entityType || !entityId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const project = await prisma.project.findFirst();
    if (!project) {
      return NextResponse.json({ error: 'No project found' }, { status: 400 });
    }

    const log = await prisma.auditLog.create({
      data: {
        projectId: project.id,
        entityType,
        entityId,
        entityName: entityName || null,
        action,
        fieldName: fieldName || null,
        oldValue: oldValue ? String(oldValue).substring(0, 5000) : null,
        newValue: newValue ? String(newValue).substring(0, 5000) : null,
        changedBy: changedBy || null
      }
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json({ error: 'Failed to create log' }, { status: 500 });
  }
}
