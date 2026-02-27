import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const crisis = await prisma.crisis.findUnique({
      where: { id: params.id },
    });

    if (!crisis) {
      return NextResponse.json({ error: 'Crisis not found' }, { status: 404 });
    }

    return NextResponse.json(crisis);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch crisis' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id, projectId, createdAt, updatedAt, ...updateData } = body;

    const crisis = await prisma.crisis.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(crisis);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update crisis' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.crisis.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete crisis' }, { status: 500 });
  }
}
