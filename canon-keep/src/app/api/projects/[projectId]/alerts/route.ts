import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { runConsistencyChecks, saveAlerts } from '@/lib/consistency/engine';

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

// GET /api/projects/[projectId]/alerts - List alerts
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';

    const alerts = await prisma.canonAlert.findMany({
      where: {
        projectId,
        ...(status !== 'all' ? { status } : {}),
      },
      orderBy: [
        { severity: 'desc' },
        { confidence: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse evidence JSON
    const result = alerts.map(alert => ({
      ...alert,
      evidence: JSON.parse(alert.evidence),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

// POST /api/projects/[projectId]/alerts/recheck - Re-run consistency checks
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;

    const alerts = await runConsistencyChecks(projectId);
    await saveAlerts(projectId, alerts);

    return NextResponse.json({ count: alerts.length, alerts });
  } catch (error) {
    console.error('Failed to run consistency checks:', error);
    return NextResponse.json({ error: 'Failed to run consistency checks' }, { status: 500 });
  }
}
