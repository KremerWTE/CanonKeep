import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all relationships
    const relationships = await prisma.characterRelationship.findMany({
      include: {
        fromCharacter: { select: { id: true, name: true, archetype: true, bssRole: true } },
        toCharacter: { select: { id: true, name: true, archetype: true, bssRole: true } }
      }
    });

    // Build nodes and links for graph
    const nodesMap = new Map<string, any>();
    const links: any[] = [];

    for (const rel of relationships) {
      // Add from character as node
      if (!nodesMap.has(rel.fromCharacter.id)) {
        nodesMap.set(rel.fromCharacter.id, {
          id: rel.fromCharacter.id,
          name: rel.fromCharacter.name,
          archetype: rel.fromCharacter.archetype,
          group: getGroup(rel.fromCharacter),
          connections: 0
        });
      }

      // Add to character as node
      if (!nodesMap.has(rel.toCharacter.id)) {
        nodesMap.set(rel.toCharacter.id, {
          id: rel.toCharacter.id,
          name: rel.toCharacter.name,
          archetype: rel.toCharacter.archetype,
          group: getGroup(rel.toCharacter),
          connections: 0
        });
      }

      // Increment connection counts
      nodesMap.get(rel.fromCharacter.id)!.connections++;
      nodesMap.get(rel.toCharacter.id)!.connections++;

      // Add link
      links.push({
        source: rel.fromCharacter.id,
        target: rel.toCharacter.id,
        type: rel.relationshipType,
        description: rel.description
      });
    }

    const nodes = Array.from(nodesMap.values());

    // Group relationships by type for legend
    const relationshipTypes = [...new Set(relationships.map(r => r.relationshipType))].sort();

    return NextResponse.json({
      nodes,
      links,
      stats: {
        totalNodes: nodes.length,
        totalLinks: links.length,
        relationshipTypes
      }
    });
  } catch (error) {
    console.error('Error fetching graph data:', error);
    return NextResponse.json({ error: 'Failed to fetch graph data' }, { status: 500 });
  }
}

function getGroup(char: { bssRole: string | null; archetype: string | null }): string {
  if (char.bssRole) return 'BSS';
  if (char.archetype?.toLowerCase().includes('wife') || char.archetype?.toLowerCase().includes('wives')) return 'Wives Circle';
  return 'Other';
}
