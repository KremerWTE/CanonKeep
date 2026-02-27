import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all confirmed characters with their relationships
    const characters = await prisma.character.findMany({
      where: { isConfirmed: true },
      orderBy: { name: 'asc' }
    });

    // Get relationships
    const relationships = await prisma.characterRelationship.findMany({
      include: {
        fromCharacter: { select: { name: true } },
        toCharacter: { select: { name: true } }
      }
    });

    // Build character bible structure
    const bible = {
      title: 'Five Feet From Home - Character Bible',
      generatedAt: new Date().toISOString(),
      totalCharacters: characters.length,
      sections: [
        {
          title: 'Core Characters',
          characters: characters.filter(c =>
            ['Jasper Barrett', 'Elena Barrett', 'Addison Price', 'Tom Hawkins', 'Cole Harrington', 'Kendra Holt', 'Chris Whitaker', 'Grace Barrett']
            .some(n => c.name.includes(n.split(' ')[0]))
          )
        },
        {
          title: 'BSS Team',
          characters: characters.filter(c => c.bssRole && !['Jasper', 'Harper', 'Hawk', 'Cole'].some(n => c.name.includes(n)))
        },
        {
          title: 'Wives Circle',
          characters: characters.filter(c => c.wivesClubRole)
        },
        {
          title: 'Supporting Characters',
          characters: characters.filter(c =>
            !c.bssRole && !c.wivesClubRole &&
            !['Jasper', 'Elena', 'Addison', 'Hawk', 'Cole', 'Kendra', 'Chris', 'Grace'].some(n => c.name.includes(n))
          )
        }
      ].map(section => ({
        ...section,
        characters: section.characters.map(c => ({
          name: c.name,
          nickname: c.nickname,
          archetype: c.archetype,
          age: c.age,
          role: c.bssRole || c.wivesClubRole || c.affiliationRole,
          personality: c.personality,
          background: c.background,
          careerHistory: c.careerHistory,
          appearance: c.appearance,
          modeledAfter: c.modeledAfter,
          relationships: relationships
            .filter(r => r.fromCharacter.name === c.name)
            .map(r => `${r.toCharacter.name} (${r.relationshipType})`)
        }))
      }))
    };

    return NextResponse.json(bible);
  } catch (error) {
    console.error('Error generating character bible:', error);
    return NextResponse.json({ error: 'Failed to generate bible' }, { status: 500 });
  }
}
