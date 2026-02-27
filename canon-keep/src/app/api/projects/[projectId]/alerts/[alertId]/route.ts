import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
  params: Promise<{ projectId: string; alertId: string }>;
}

// PUT /api/projects/[projectId]/alerts/[alertId] - Update alert status
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { alertId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['open', 'dismissed', 'resolved'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const alert = await prisma.canonAlert.update({
      where: { id: alertId },
      data: {
        status,
        ...(status === 'resolved' ? { resolvedAt: new Date() } : {}),
      },
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Failed to update alert:', error);
    return NextResponse.json({ error: 'Failed to update alert' }, { status: 500 });
  }
}
