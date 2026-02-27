import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all characters with modeledAfter data
    const characters = await prisma.character.findMany({
      where: {
        modeledAfter: { not: null }
      },
      select: {
        id: true,
        name: true,
        modeledAfter: true,
        archetype: true,
        tags: true
      }
    });

    // Group by modeledAfter reference
    const groupedLookalikes: Record<string, typeof characters> = {};

    for (const char of characters) {
      if (!char.modeledAfter) continue;

      // Normalize the modeledAfter text to extract key references
      const references = extractReferences(char.modeledAfter);

      for (const ref of references) {
        if (!groupedLookalikes[ref]) {
          groupedLookalikes[ref] = [];
        }
        groupedLookalikes[ref].push(char);
      }
    }

    // Filter to only show conflicts (2+ characters sharing same reference)
    const conflicts = Object.entries(groupedLookalikes)
      .filter(([_, chars]) => chars.length > 1)
      .map(([reference, chars]) => ({
        reference,
        count: chars.length,
        characters: chars.map(c => ({
          id: c.id,
          name: c.name,
          fullModeledAfter: c.modeledAfter,
          archetype: c.archetype
        }))
      }))
      .sort((a, b) => b.count - a.count);

    // Also get all unique lookalike references for reference
    const allReferences = Object.entries(groupedLookalikes)
      .map(([reference, chars]) => ({
        reference,
        count: chars.length,
        characters: chars.map(c => c.name)
      }))
      .sort((a, b) => a.reference.localeCompare(b.reference));

    return NextResponse.json({
      totalCharactersWithLookalikes: characters.length,
      totalUniqueReferences: Object.keys(groupedLookalikes).length,
      conflictsCount: conflicts.length,
      conflicts,
      allReferences
    });
  } catch (error) {
    console.error('Error fetching lookalikes:', error);
    return NextResponse.json({ error: 'Failed to fetch lookalikes' }, { status: 500 });
  }
}

function extractReferences(modeledAfter: string): string[] {
  const references: string[] = [];

  // Common patterns to extract
  const text = modeledAfter.toLowerCase();

  // Split by common delimiters
  const parts = text.split(/[+,;\/]|with|and|mixed with|combined with/i);

  for (const part of parts) {
    // Clean and normalize
    let cleaned = part
      .replace(/\([^)]*\)/g, '') // Remove parenthetical notes
      .replace(/energy|vibes|look|style|aesthetic|archetype|inspired|like|type/gi, '')
      .trim();

    // Extract potential names (capitalized words in original)
    const originalPart = modeledAfter.substring(
      modeledAfter.toLowerCase().indexOf(part.trim().substring(0, 10)),
      modeledAfter.toLowerCase().indexOf(part.trim().substring(0, 10)) + part.length + 20
    );

    // Look for known actress/character names
    const knownNames = [
      'Brooke Davis', 'Jamie Scott', 'Mike Ross', 'Sarah Walker', 'Olivia Pope',
      'Carla Gugino', 'Rosario Dawson', 'Kate Mara', 'Blake Moran', 'Carrie Coon',
      'Amy Adams', 'Olivia Munn', 'Tiffani Thiessen', 'Lacey Chabert', 'Reese Witherspoon',
      'Gisele Bündchen', 'Kristin Cavallari', 'Eiza González', 'Lee Radziwill',
      'Sheryl Sandberg', 'CZ Guest', 'Lynn Wyatt', 'Autumn Reeser', 'Ashley Williams',
      'Alison Sweeney', 'Eloise Mumford', 'Erin Krakow', 'Bethany Joy Lenz',
      'Rachael Leigh Cook', 'Jill Wagner', 'Alexa PenaVega', 'Caissie Levy',
      'Luciane Buchanan', 'Katrin Davidsdottir'
    ];

    for (const name of knownNames) {
      if (text.includes(name.toLowerCase())) {
        references.push(name);
      }
    }

    // Also check for show/character references
    const showRefs = ['OTH', 'Suits', 'Chuck', 'Scandal', 'The Unit', 'SEAL Team',
      'Billions', 'Madam Secretary', 'BLL'];
    for (const show of showRefs) {
      if (text.includes(show.toLowerCase())) {
        // Try to extract character + show
        const charMatch = text.match(new RegExp(`(\\w+\\s+\\w+)\\s*\\(${show.toLowerCase()}\\)`, 'i'));
        if (charMatch) {
          references.push(`${charMatch[1]} (${show})`);
        }
      }
    }
  }

  // If no specific references found, use the whole string (normalized)
  if (references.length === 0) {
    const normalized = modeledAfter
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50);
    if (normalized.length > 3) {
      references.push(normalized);
    }
  }

  return [...new Set(references)]; // Remove duplicates
}
