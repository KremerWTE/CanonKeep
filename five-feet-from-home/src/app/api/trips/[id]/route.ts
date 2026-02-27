import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trip = await prisma.businessTrip.findUnique({
      where: { id: params.id },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Business trip not found' }, { status: 404 });
    }

    return NextResponse.json(trip);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch business trip' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id, projectId, createdAt, updatedAt, ...updateData } = body;

    const trip = await prisma.businessTrip.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update business trip' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.businessTrip.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete business trip' }, { status: 500 });
  }
}
