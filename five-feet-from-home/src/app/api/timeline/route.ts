import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all events with related data
    const events = await prisma.event.findMany({
      include: {
        characters: {
          include: { character: { select: { id: true, name: true } } }
        },
        locations: {
          include: { location: { select: { id: true, name: true } } }
        }
      },
      orderBy: [{ timelineSort: 'asc' }, { createdAt: 'asc' }]
    });

    // Get crises
    const crises = await prisma.crisis.findMany({
      select: {
        id: true,
        name: true,
        codeName: true,
        timeframe: true,
        severity: true,
        crisisType: true,
        status: true
      }
    });

    // Get galas
    const galas = await prisma.gala.findMany({
      select: {
        id: true,
        name: true,
        date: true,
        venue: true,
        location: true
      }
    });

    // Get trips
    const trips = await prisma.businessTrip.findMany({
      select: {
        id: true,
        name: true,
        timeframe: true,
        destination: true,
        traveler: true
      }
    });

    // Combine into unified timeline items
    const timelineItems = [
      ...events.map(e => ({
        id: e.id,
        type: 'event' as const,
        name: e.name,
        timeRef: e.timelineRef,
        sortOrder: e.timelineSort || 0,
        description: e.description,
        characters: e.characters.map(c => c.character),
        locations: e.locations.map(l => l.location),
        metadata: { consequences: e.consequences }
      })),
      ...crises.map(c => ({
        id: c.id,
        type: 'crisis' as const,
        name: c.name,
        timeRef: c.timeframe,
        sortOrder: 0,
        description: c.codeName ? `Operation: ${c.codeName}` : null,
        characters: [],
        locations: [],
        metadata: { severity: c.severity, crisisType: c.crisisType, status: c.status }
      })),
      ...galas.map(g => ({
        id: g.id,
        type: 'gala' as const,
        name: g.name,
        timeRef: g.date,
        sortOrder: 0,
        description: g.venue,
        characters: [],
        locations: g.location ? [{ id: '', name: g.location }] : [],
        metadata: {}
      })),
      ...trips.map(t => ({
        id: t.id,
        type: 'trip' as const,
        name: t.name,
        timeRef: t.timeframe,
        sortOrder: 0,
        description: `${t.traveler || 'Unknown'} travels to ${t.destination || 'unknown'}`,
        characters: [],
        locations: t.destination ? [{ id: '', name: t.destination }] : [],
        metadata: {}
      }))
    ];

    // Group by book reference if available
    const bookGroups: Record<string, typeof timelineItems> = {};
    for (const item of timelineItems) {
      const bookMatch = item.timeRef?.match(/book\s*(\d+)/i);
      const key = bookMatch ? `Book ${bookMatch[1]}` : 'Unassigned';
      if (!bookGroups[key]) bookGroups[key] = [];
      bookGroups[key].push(item);
    }

    return NextResponse.json({
      totalItems: timelineItems.length,
      byType: {
        events: events.length,
        crises: crises.length,
        galas: galas.length,
        trips: trips.length
      },
      items: timelineItems,
      bookGroups
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}
