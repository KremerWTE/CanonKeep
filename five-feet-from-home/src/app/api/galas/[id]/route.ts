import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gala = await prisma.gala.findUnique({
      where: { id: params.id },
    });

    if (!gala) {
      return NextResponse.json({ error: 'Gala not found' }, { status: 404 });
    }

    return NextResponse.json(gala);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gala' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id, projectId, createdAt, updatedAt, ...updateData } = body;

    const gala = await prisma.gala.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(gala);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update gala' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gala.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gala' }, { status: 500 });
  }
}
