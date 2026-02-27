import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Generate a portrait prompt from character data
export async function POST(request: NextRequest) {
  try {
    const { characterId } = await request.json();

    if (!characterId) {
      return NextResponse.json({ error: 'Character ID required' }, { status: 400 });
    }

    const character = await prisma.character.findUnique({
      where: { id: characterId }
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // Build portrait prompt from character data
    const prompt = buildPortraitPrompt(character);

    // Save prompt to character
    await prisma.character.update({
      where: { id: characterId },
      data: { portraitPrompt: prompt }
    });

    return NextResponse.json({
      success: true,
      characterId,
      characterName: character.name,
      prompt
    });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json({ error: 'Failed to generate prompt' }, { status: 500 });
  }
}

function buildPortraitPrompt(character: any): string {
  const parts: string[] = [];

  // Base style
  parts.push('Professional portrait photograph, studio lighting, high quality, photorealistic');

  // Gender inference from name/description
  const isFemale = inferGender(character);
  parts.push(isFemale ? 'woman' : 'man');

  // Age
  if (character.age) {
    parts.push(`${character.age}`);
  }

  // Modeled after (celebrity reference)
  if (character.modeledAfter) {
    const celeb = extractCelebrity(character.modeledAfter);
    if (celeb) {
      parts.push(`resembling ${celeb}`);
    }
  }

  // Physical appearance
  if (character.appearance) {
    const appearance = extractAppearanceDetails(character.appearance);
    if (appearance) {
      parts.push(appearance);
    }
  }

  // Personality reflected in expression
  if (character.personality) {
    const expression = personalityToExpression(character.personality);
    if (expression) {
      parts.push(expression);
    }
  }

  // Archetype styling
  if (character.archetype) {
    const style = archetypeToStyle(character.archetype);
    if (style) {
      parts.push(style);
    }
  }

  // Professional context
  if (character.bssRole) {
    parts.push('professional business attire, confident posture');
  } else if (character.wivesClubRole) {
    parts.push('elegant attire, sophisticated appearance');
  } else if (character.careerHistory) {
    const attire = careerToAttire(character.careerHistory);
    if (attire) {
      parts.push(attire);
    }
  }

  // Wardrobe style
  if (character.wardrobeStyle) {
    parts.push(character.wardrobeStyle.substring(0, 100));
  }

  // Quality tags
  parts.push('sharp focus, detailed face, natural skin texture');

  return parts.join(', ');
}

function inferGender(character: any): boolean {
  const femaleIndicators = ['she', 'her', 'wife', 'mother', 'sister', 'daughter', 'woman', 'female', 'mrs', 'ms'];
  const text = `${character.name} ${character.personality || ''} ${character.background || ''}`.toLowerCase();

  for (const indicator of femaleIndicators) {
    if (text.includes(indicator)) return true;
  }

  // Check common female names
  const femaleNames = ['elena', 'addie', 'addison', 'grace', 'kendra', 'harper', 'bella', 'selene', 'evie', 'sofia', 'maggie', 'lottie', 'sara'];
  const firstName = character.name.split(' ')[0].toLowerCase();
  return femaleNames.includes(firstName);
}

function extractCelebrity(modeledAfter: string): string | null {
  // Extract first recognizable name
  const celebPatterns = [
    /([A-Z][a-z]+ [A-Z][a-z]+)/,  // "First Last"
    /like ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /resembles ([A-Z][a-z]+ [A-Z][a-z]+)/i
  ];

  for (const pattern of celebPatterns) {
    const match = modeledAfter.match(pattern);
    if (match) return match[1];
  }

  // Just use first part if short enough
  if (modeledAfter.length < 50) {
    return modeledAfter.split(/[+,;]/)[0].trim();
  }

  return null;
}

function extractAppearanceDetails(appearance: string): string | null {
  const keywords = ['hair', 'eyes', 'skin', 'tall', 'athletic', 'slim', 'curvy', 'blonde', 'brunette', 'redhead'];
  const parts: string[] = [];

  const lower = appearance.toLowerCase();
  for (const keyword of keywords) {
    if (lower.includes(keyword)) {
      // Extract phrase around keyword
      const idx = lower.indexOf(keyword);
      const start = Math.max(0, idx - 20);
      const end = Math.min(appearance.length, idx + keyword.length + 30);
      const phrase = appearance.substring(start, end).trim();
      if (phrase.length > 5) {
        parts.push(phrase);
      }
    }
  }

  return parts.length > 0 ? parts.slice(0, 3).join(', ') : null;
}

function personalityToExpression(personality: string): string | null {
  const lower = personality.toLowerCase();

  if (lower.includes('confident') || lower.includes('powerful')) return 'confident expression';
  if (lower.includes('warm') || lower.includes('kind')) return 'warm, approachable smile';
  if (lower.includes('serious') || lower.includes('intense')) return 'intense, focused gaze';
  if (lower.includes('playful') || lower.includes('witty')) return 'slight knowing smile';
  if (lower.includes('calm') || lower.includes('steady')) return 'serene, composed expression';
  if (lower.includes('fierce') || lower.includes('strong')) return 'determined expression';

  return null;
}

function archetypeToStyle(archetype: string): string | null {
  const lower = archetype.toLowerCase();

  if (lower.includes('leader') || lower.includes('ceo')) return 'executive presence, power stance';
  if (lower.includes('warrior') || lower.includes('protector')) return 'strong, alert posture';
  if (lower.includes('healer') || lower.includes('caregiver')) return 'gentle, nurturing aura';
  if (lower.includes('mentor')) return 'wise, experienced appearance';
  if (lower.includes('creative') || lower.includes('artist')) return 'artistic, expressive style';

  return null;
}

function careerToAttire(career: string): string | null {
  const lower = career.toLowerCase();

  if (lower.includes('doctor') || lower.includes('medical')) return 'medical professional attire';
  if (lower.includes('lawyer') || lower.includes('legal')) return 'professional legal attire';
  if (lower.includes('military') || lower.includes('soldier')) return 'formal military bearing';
  if (lower.includes('fitness') || lower.includes('crossfit')) return 'athletic wear, fit physique';
  if (lower.includes('teacher') || lower.includes('professor')) return 'smart casual academic style';
  if (lower.includes('chef') || lower.includes('cook')) return 'chef attire';

  return null;
}
