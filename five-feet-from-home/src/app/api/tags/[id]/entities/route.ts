import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface EntityInfo {
  id: string;
  type: string;
  name: string;
  link: string;
  description?: string;
}

// Get all entities with a specific tag
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: tagId } = await params;

    // Get tag info
    const tag = await prisma.tag.findUnique({
      where: { id: tagId }
    });

    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    // Get all entity tags for this tag
    const entityTags = await prisma.entityTag.findMany({
      where: { tagId },
      orderBy: { entityType: 'asc' }
    });

    // Group by entity type
    const byType: Record<string, string[]> = {};
    for (const et of entityTags) {
      if (!byType[et.entityType]) byType[et.entityType] = [];
      byType[et.entityType].push(et.entityId);
    }

    // Fetch entity details
    const entities: EntityInfo[] = [];

    // Characters
    if (byType.character) {
      const chars = await prisma.character.findMany({
        where: { id: { in: byType.character } },
        select: { id: true, name: true, archetype: true }
      });
      for (const c of chars) {
        entities.push({
          id: c.id,
          type: 'character',
          name: c.name,
          link: `/characters/${c.id}`,
          description: c.archetype || undefined
        });
      }
    }

    // Crises
    if (byType.crisis) {
      const crises = await prisma.crisis.findMany({
        where: { id: { in: byType.crisis } },
        select: { id: true, title: true, type: true }
      });
      for (const c of crises) {
        entities.push({
          id: c.id,
          type: 'crisis',
          name: c.title,
          link: `/crises/${c.id}`,
          description: c.type || undefined
        });
      }
    }

    // Galas
    if (byType.gala) {
      const galas = await prisma.gala.findMany({
        where: { id: { in: byType.gala } },
        select: { id: true, title: true, theme: true }
      });
      for (const g of galas) {
        entities.push({
          id: g.id,
          type: 'gala',
          name: g.title,
          link: `/galas/${g.id}`,
          description: g.theme || undefined
        });
      }
    }

    // Chapters
    if (byType.chapter) {
      const chapters = await prisma.chapter.findMany({
        where: { id: { in: byType.chapter } },
        select: { id: true, title: true, number: true },
        include: { book: { select: { title: true } } }
      });
      for (const c of chapters) {
        entities.push({
          id: c.id,
          type: 'chapter',
          name: c.title || `Chapter ${c.number}`,
          link: `/chapters/${c.id}`,
          description: c.book?.title || undefined
        });
      }
    }

    // Locations
    if (byType.location) {
      const locs = await prisma.location.findMany({
        where: { id: { in: byType.location } },
        select: { id: true, name: true, locationType: true }
      });
      for (const l of locs) {
        entities.push({
          id: l.id,
          type: 'location',
          name: l.name,
          link: `/locations/${l.id}`,
          description: l.locationType || undefined
        });
      }
    }

    // Storylines
    if (byType.storyline) {
      const storylines = await prisma.storyline.findMany({
        where: { id: { in: byType.storyline } },
        select: { id: true, title: true, status: true }
      });
      for (const s of storylines) {
        entities.push({
          id: s.id,
          type: 'storyline',
          name: s.title,
          link: `/storylines/${s.id}`,
          description: s.status || undefined
        });
      }
    }

    // Business Trips
    if (byType.businessTrip) {
      const trips = await prisma.businessTrip.findMany({
        where: { id: { in: byType.businessTrip } },
        select: { id: true, title: true, destination: true }
      });
      for (const t of trips) {
        entities.push({
          id: t.id,
          type: 'businessTrip',
          name: t.title,
          link: `/trips/${t.id}`,
          description: t.destination || undefined
        });
      }
    }

    // Group entities by type for display
    const groupedEntities: Record<string, EntityInfo[]> = {};
    for (const entity of entities) {
      if (!groupedEntities[entity.type]) {
        groupedEntities[entity.type] = [];
      }
      groupedEntities[entity.type].push(entity);
    }

    return NextResponse.json({
      tag,
      entities,
      groupedEntities,
      total: entities.length
    });

  } catch (error) {
    console.error('Error fetching tag entities:', error);
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 });
  }
}
