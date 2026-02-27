import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

// AI Writing Suggestions API
// Configurable to work with different AI providers (OpenAI, Claude, etc.)
// Set AI_API_KEY and AI_PROVIDER in environment variables

const AI_PROVIDER = process.env.AI_PROVIDER || 'mock'; // 'openai', 'anthropic', 'mock'
const AI_API_KEY = process.env.AI_API_KEY;

interface SuggestionRequest {
  type: 'continue' | 'improve' | 'alternatives' | 'dialogue' | 'description' | 'outline';
  text: string;
  context?: {
    chapterId?: string;
    characterIds?: string[];
    genre?: string;
    tone?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: SuggestionRequest = await request.json();
    const { type, text, context } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Get additional context from database if provided
    let contextInfo = '';
    if (context?.chapterId) {
      const chapter = await prisma.chapter.findUnique({
        where: { id: context.chapterId },
        include: {
          characters: { include: { character: true } },
          book: true,
        },
      });
      if (chapter) {
        contextInfo += `\nChapter: ${chapter.title || `Chapter ${chapter.number}`}`;
        if (chapter.synopsis) contextInfo += `\nSynopsis: ${chapter.synopsis}`;
        if (chapter.characters.length > 0) {
          contextInfo += `\nCharacters: ${chapter.characters.map(c => c.character.name).join(', ')}`;
        }
      }
    }

    if (context?.characterIds?.length) {
      const characters = await prisma.character.findMany({
        where: { id: { in: context.characterIds } },
        select: { name: true, background: true, personality: true },
      });
      for (const char of characters) {
        contextInfo += `\n\nCharacter ${char.name}:`;
        if (char.personality) contextInfo += ` Personality: ${char.personality}`;
        if (char.background) contextInfo += ` Background: ${char.background}`;
      }
    }

    // Build prompt based on suggestion type
    const prompts: Record<string, string> = {
      continue: `Continue this story passage naturally, maintaining the same tone and style:\n\n${text}\n${contextInfo}\n\nContinue the story:`,
      improve: `Improve this writing while keeping the same meaning. Make it more vivid and engaging:\n\n${text}\n${contextInfo}\n\nImproved version:`,
      alternatives: `Provide 3 alternative ways to write this passage:\n\n${text}\n${contextInfo}\n\nAlternatives:`,
      dialogue: `Write natural dialogue for this scene. The dialogue should feel authentic to the characters:\n\n${text}\n${contextInfo}\n\nDialogue:`,
      description: `Enhance this description with more sensory details and vivid imagery:\n\n${text}\n${contextInfo}\n\nEnhanced description:`,
      outline: `Create a scene outline or beat structure based on this:\n\n${text}\n${contextInfo}\n\nOutline:`,
    };

    const prompt = prompts[type] || prompts.improve;

    // Call AI provider
    let suggestion: string;

    if (AI_PROVIDER === 'mock' || !AI_API_KEY) {
      // Mock response for demo/testing
      suggestion = getMockSuggestion(type, text);
    } else if (AI_PROVIDER === 'openai') {
      suggestion = await callOpenAI(prompt);
    } else if (AI_PROVIDER === 'anthropic') {
      suggestion = await callAnthropic(prompt);
    } else {
      suggestion = getMockSuggestion(type, text);
    }

    return NextResponse.json({
      success: true,
      suggestion,
      type,
      provider: AI_PROVIDER,
    });
  } catch (error) {
    console.error('AI suggestion error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestion' },
      { status: 500 }
    );
  }
}

// Mock suggestions for demo mode
function getMockSuggestion(type: string, text: string): string {
  const previews: Record<string, string> = {
    continue: `[Demo Mode - Configure AI_API_KEY for real suggestions]\n\nThe story could continue with:\n- A new character entering the scene\n- An unexpected revelation\n- A shift in the protagonist's emotional state\n- An external event that creates tension\n\nOriginal ending: "${text.slice(-100)}..."`,
    improve: `[Demo Mode - Configure AI_API_KEY for real suggestions]\n\nSuggestions to improve this passage:\n- Add more sensory details (sight, sound, touch)\n- Vary sentence length for rhythm\n- Show emotion through action rather than telling\n- Consider stronger verb choices`,
    alternatives: `[Demo Mode - Configure AI_API_KEY for real suggestions]\n\n1. Alternative approach using different perspective\n2. Alternative with more dialogue\n3. Alternative with more internal monologue`,
    dialogue: `[Demo Mode - Configure AI_API_KEY for real suggestions]\n\nDialogue tips:\n- Use subtext - what characters mean vs what they say\n- Add action beats between lines\n- Give each character a distinct voice\n- Avoid exposition dumps`,
    description: `[Demo Mode - Configure AI_API_KEY for real suggestions]\n\nDescription enhancement ideas:\n- Add specific details that reveal character\n- Use metaphors that fit the story's mood\n- Engage multiple senses\n- Balance detail with pacing`,
    outline: `[Demo Mode - Configure AI_API_KEY for real suggestions]\n\nPossible scene structure:\n1. Opening hook - immediate tension\n2. Rising action - obstacles and complications\n3. Midpoint shift - new information or reversal\n4. Climax - key decision or confrontation\n5. Resolution - consequences and setup for next scene`,
  };
  return previews[type] || previews.improve;
}

// OpenAI API call
async function callOpenAI(prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a skilled creative writing assistant helping authors improve their fiction.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Unable to generate suggestion';
}

// Anthropic API call
async function callAnthropic(prompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': AI_API_KEY!,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [
        { role: 'user', content: prompt },
      ],
      system: 'You are a skilled creative writing assistant helping authors improve their fiction.',
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0]?.text || 'Unable to generate suggestion';
}
