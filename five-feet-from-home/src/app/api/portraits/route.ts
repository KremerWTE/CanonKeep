import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all characters with portrait data
export async function GET() {
  try {
    const characters = await prisma.character.findMany({
      where: { isConfirmed: true },
      select: {
        id: true,
        name: true,
        modeledAfter: true,
        appearance: true,
        portraitUrl: true,
        portraitPrompt: true,
        archetype: true
      },
      orderBy: { name: 'asc' }
    });

    const stats = {
      total: characters.length,
      withPrompt: characters.filter(c => c.portraitPrompt).length,
      withPortrait: characters.filter(c => c.portraitUrl).length,
      withModeledAfter: characters.filter(c => c.modeledAfter).length
    };

    return NextResponse.json({ characters, stats });
  } catch (error) {
    console.error('Error fetching portraits:', error);
    return NextResponse.json({ error: 'Failed to fetch portraits' }, { status: 500 });
  }
}

// Update portrait URL for a character
export async function PUT(request: NextRequest) {
  try {
    const { characterId, portraitUrl } = await request.json();

    if (!characterId) {
      return NextResponse.json({ error: 'Character ID required' }, { status: 400 });
    }

    await prisma.character.update({
      where: { id: characterId },
      data: { portraitUrl: portraitUrl || null }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating portrait:', error);
    return NextResponse.json({ error: 'Failed to update portrait' }, { status: 500 });
  }
}

// Batch generate prompts for characters without them
export async function POST(request: NextRequest) {
  try {
    const { characterIds } = await request.json();

    // If no IDs provided, get all confirmed characters without prompts
    let targetIds = characterIds;
    if (!targetIds || targetIds.length === 0) {
      const chars = await prisma.character.findMany({
        where: {
          isConfirmed: true,
          portraitPrompt: null,
          OR: [
            { modeledAfter: { not: null } },
            { appearance: { not: null } }
          ]
        },
        select: { id: true }
      });
      targetIds = chars.map(c => c.id);
    }

    let generated = 0;
    for (const id of targetIds) {
      try {
        // Call the generate-prompt endpoint internally
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/portraits/generate-prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ characterId: id })
        });

        if (response.ok) {
          generated++;
        }
      } catch (e) {
        // Continue with next character
      }
    }

    return NextResponse.json({
      success: true,
      generated,
      total: targetIds.length
    });
  } catch (error) {
    console.error('Error batch generating prompts:', error);
    return NextResponse.json({ error: 'Failed to generate prompts' }, { status: 500 });
  }
}
