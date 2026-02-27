import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Generate AI image prompt from character data
function generateImagePrompt(character: {
  name: string;
  modeledAfter?: string | null;
  appearance?: string | null;
  wardrobeStyle?: string | null;
  age?: string | null;
  archetype?: string | null;
}): string {
  const parts: string[] = [];

  // Start with base description
  parts.push('Professional portrait photograph of a person');

  // Use modeledAfter for inspiration (extract descriptors, not celebrity names)
  if (character.modeledAfter) {
    const modelInfo = character.modeledAfter.toLowerCase();
    if (modelInfo.includes('blonde')) parts.push('blonde hair');
    if (modelInfo.includes('brunette') || modelInfo.includes('brown hair')) parts.push('brown hair');
    if (modelInfo.includes('red') || modelInfo.includes('auburn')) parts.push('auburn/red hair');
    if (modelInfo.includes('black hair')) parts.push('black hair');
    if (modelInfo.includes('athletic')) parts.push('athletic build');
    if (modelInfo.includes('elegant') || modelInfo.includes('refined')) parts.push('elegant appearance');
    if (modelInfo.includes('southern')) parts.push('southern charm');
  }

  // Add physical description
  if (character.appearance) {
    // Clean and limit the description
    const cleanDesc = character.appearance
      .replace(/[^\w\s,.-]/g, '')
      .slice(0, 200);
    parts.push(cleanDesc);
  }

  // Add style/wardrobe hints
  if (character.wardrobeStyle) {
    const styleWords = character.wardrobeStyle.slice(0, 100);
    parts.push(`wearing ${styleWords}`);
  }

  // Add age context
  if (character.age) {
    parts.push(`approximately ${character.age} years old`);
  }

  // Add quality markers for better results
  parts.push('professional lighting, studio quality, detailed face, realistic, looking at camera');

  return parts.filter(Boolean).join(', ');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get the character
    const character = await prisma.character.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        modeledAfter: true,
        appearance: true,
        wardrobeStyle: true,
        age: true,
        archetype: true,
      },
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // Generate the prompt
    const prompt = generateImagePrompt(character);

    // Check for OpenAI API key
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      // No API key - just save the prompt and return placeholder info
      await prisma.character.update({
        where: { id },
        data: {
          portraitPrompt: prompt,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Prompt generated. Set OPENAI_API_KEY in .env to generate actual images.',
        prompt,
        portraitUrl: null,
      });
    }

    // Call OpenAI DALL-E API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);

      // Save prompt even if generation fails
      await prisma.character.update({
        where: { id },
        data: { portraitPrompt: prompt },
      });

      return NextResponse.json({
        success: false,
        error: error.error?.message || 'Failed to generate image',
        prompt,
      }, { status: 500 });
    }

    const data = await response.json();
    const imageUrl = data.data[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({
        success: false,
        error: 'No image URL in response',
        prompt,
      }, { status: 500 });
    }

    // Update character with the generated image URL and prompt
    await prisma.character.update({
      where: { id },
      data: {
        portraitUrl: imageUrl,
        portraitPrompt: prompt,
      },
    });

    return NextResponse.json({
      success: true,
      portraitUrl: imageUrl,
      prompt,
    });

  } catch (error) {
    console.error('Error generating portrait:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
