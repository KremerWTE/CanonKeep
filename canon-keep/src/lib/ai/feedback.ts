import { z } from 'zod';
import { getAIClient } from './provider';

export type FeedbackMode = 'gentle' | 'professional' | 'brutal';

export const FeedbackSchema = z.object({
  summary: z.string(),
  pacing: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),
  clarity: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),
  stakes: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),
  characterAgency: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),
  scenePurpose: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),
  emotionalImpact: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  overallScore: z.number().min(1).max(10),
});

export type ChapterFeedback = z.infer<typeof FeedbackSchema>;

const MODE_PROMPTS: Record<FeedbackMode, string> = {
  gentle: `You are a supportive writing coach providing encouraging feedback.
Focus on what the author does well while gently suggesting improvements.
Frame critiques as opportunities for growth. Use warm, encouraging language.
Never be harsh or discouraging. The author is doing great work.`,

  professional: `You are a professional developmental editor providing honest, constructive feedback.
Be direct but respectful. Balance praise with critique.
Provide specific, actionable suggestions. Use industry-standard terminology.
Your goal is to help the author improve their craft.`,

  brutal: `You are a brutally honest editor who pulls no punches.
The author has specifically requested harsh, unfiltered feedback.
Point out every weakness, cliché, and problem you find.
Be direct and blunt. No sugarcoating. The author wants the truth.
Focus heavily on what needs improvement. Only mention strengths briefly.
This is tough love - the author wants to grow through honest critique.`,
};

export async function generateChapterFeedback(
  chapterContent: string,
  chapterTitle: string,
  mode: FeedbackMode,
  context?: { previousChapters?: string[]; canonFacts?: string[] }
): Promise<ChapterFeedback> {
  const ai = getAIClient();

  const systemPrompt = `${MODE_PROMPTS[mode]}

You are analyzing a chapter from a fiction manuscript. Evaluate it across multiple dimensions:

1. PACING: How well does the chapter flow? Are there slow spots or rushed sections?
2. CLARITY: Is the writing clear? Can readers easily follow what's happening?
3. STAKES: What's at risk in this chapter? Do the stakes feel meaningful?
4. CHARACTER AGENCY: Do characters make active choices? Or do things just happen to them?
5. SCENE PURPOSE: Does every scene advance the plot or character development?
6. EMOTIONAL IMPACT: Does the chapter evoke emotions? Does it feel engaging?

For each dimension, provide:
- A score from 1-10
- Brief analysis
- Specific suggestions for improvement

Also identify the chapter's top strengths and weaknesses.

Respond with valid JSON only.`;

  let contextInfo = '';
  if (context?.previousChapters?.length) {
    contextInfo += `\n\nPrevious chapter summaries for context:\n${context.previousChapters.join('\n')}`;
  }
  if (context?.canonFacts?.length) {
    contextInfo += `\n\nEstablished canon facts:\n${context.canonFacts.join('\n')}`;
  }

  const feedback = await ai.extractJSON(
    {
      systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Chapter: ${chapterTitle}

${chapterContent}${contextInfo}

Provide your ${mode} feedback on this chapter as JSON.`,
        },
      ],
      maxTokens: 4000,
      temperature: mode === 'brutal' ? 0.8 : 0.7,
    },
    FeedbackSchema
  );

  return feedback;
}

export const EnhancementSuggestionSchema = z.object({
  suggestions: z.array(z.object({
    type: z.enum(['weak_subplot', 'dropped_thread', 'escalation', 'thematic', 'character_arc', 'world_building', 'tension', 'pacing']),
    title: z.string(),
    description: z.string(),
    priority: z.enum(['low', 'medium', 'high']),
    canonConstraints: z.array(z.string()).optional(),
    evidence: z.string(),
    implementation: z.string(),
  })),
});

export type EnhancementSuggestions = z.infer<typeof EnhancementSuggestionSchema>;

// Book-level feedback schema
export const BookFeedbackSchema = z.object({
  summary: z.string(),
  overallScore: z.number().min(1).max(10),

  // Structural analysis
  structure: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    arcStrength: z.string(),
    suggestions: z.array(z.string()),
  }),

  // Character development across the book
  characterDevelopment: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    characterArcs: z.array(z.object({
      character: z.string(),
      arcDescription: z.string(),
      strength: z.enum(['weak', 'moderate', 'strong']),
    })),
    suggestions: z.array(z.string()),
  }),

  // Plot and pacing
  plotAndPacing: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    plotHoles: z.array(z.string()),
    pacingIssues: z.array(z.string()),
    suggestions: z.array(z.string()),
  }),

  // Theme and meaning
  thematicDepth: z.object({
    score: z.number().min(1).max(10),
    themes: z.array(z.string()),
    analysis: z.string(),
    suggestions: z.array(z.string()),
  }),

  // World building
  worldBuilding: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    strengths: z.array(z.string()),
    gaps: z.array(z.string()),
    suggestions: z.array(z.string()),
  }),

  // Dialogue and voice
  dialogueAndVoice: z.object({
    score: z.number().min(1).max(10),
    analysis: z.string(),
    distinctVoices: z.boolean(),
    suggestions: z.array(z.string()),
  }),

  // Market readiness
  marketReadiness: z.object({
    score: z.number().min(1).max(10),
    genre: z.string(),
    targetAudience: z.string(),
    comparableTitles: z.array(z.string()),
    publishingReadiness: z.enum(['needs_major_revision', 'needs_polish', 'ready_for_beta', 'ready_for_submission']),
    analysis: z.string(),
  }),

  // Top-level summary
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  prioritizedImprovements: z.array(z.object({
    priority: z.number().min(1).max(5),
    area: z.string(),
    description: z.string(),
    impact: z.enum(['low', 'medium', 'high']),
  })),
});

export type BookFeedback = z.infer<typeof BookFeedbackSchema>;

const BOOK_MODE_PROMPTS: Record<FeedbackMode, string> = {
  gentle: `You are a supportive writing coach reviewing a complete manuscript.
Focus on what the author does well while gently suggesting improvements.
Celebrate their accomplishment in completing a book. Frame critiques as opportunities.
Be warm and encouraging while still providing useful feedback.`,

  professional: `You are a professional developmental editor reviewing a complete manuscript.
Be direct, thorough, and constructive. Provide the kind of feedback a literary agent would give.
Balance praise with substantive critique. Use industry terminology.
Your goal is to help this book reach its full potential.`,

  brutal: `You are a brutally honest editor reviewing a complete manuscript.
The author specifically requested harsh, unfiltered feedback.
Identify every weakness, cliché, plot hole, and problem you find.
Be direct and blunt. This is tough love - the author wants to grow.
Don't sugarcoat. Focus on what must be fixed for this book to succeed.`,
};

export async function generateBookFeedback(
  chapters: { title: string; content: string; orderIndex: number }[],
  bookTitle: string,
  mode: FeedbackMode,
  context?: { canonFacts?: string[]; entities?: string[]; relationships?: string[] }
): Promise<BookFeedback> {
  const ai = getAIClient();

  // Create chapter summaries for analysis (full content would be too long)
  const chapterSummaries = chapters
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((ch, i) => {
      const preview = ch.content.slice(0, 2000);
      return `Chapter ${i + 1}: ${ch.title}\n${preview}${ch.content.length > 2000 ? '...' : ''}`;
    })
    .join('\n\n---\n\n');

  const systemPrompt = `${BOOK_MODE_PROMPTS[mode]}

You are analyzing a COMPLETE BOOK manuscript. Evaluate it holistically:

1. STRUCTURE: Three-act structure, story arc, chapter organization
2. CHARACTER DEVELOPMENT: Character arcs, growth, consistency
3. PLOT & PACING: Story progression, tension, plot holes, pacing issues
4. THEMATIC DEPTH: Themes, symbolism, meaning
5. WORLD BUILDING: Setting consistency, immersion, believability
6. DIALOGUE & VOICE: Character voices, dialogue quality, narrative voice
7. MARKET READINESS: Genre fit, target audience, publishing readiness

Provide:
- Scores from 1-10 for each dimension
- Detailed analysis with specific examples
- Prioritized list of improvements
- Market positioning assessment

Be thorough. This is a full manuscript review.

Respond with valid JSON only.`;

  let contextInfo = '';
  if (context?.canonFacts?.length) {
    contextInfo += `\n\nESTABLISHED FACTS:\n${context.canonFacts.slice(0, 30).join('\n')}`;
  }
  if (context?.entities?.length) {
    contextInfo += `\n\nKEY ENTITIES:\n${context.entities.slice(0, 20).join(', ')}`;
  }

  const feedback = await ai.extractJSON(
    {
      systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Book Title: ${bookTitle}
Total Chapters: ${chapters.length}

${chapterSummaries}${contextInfo}

Provide your ${mode} book-level feedback as JSON.`,
        },
      ],
      maxTokens: 8000,
      temperature: mode === 'brutal' ? 0.8 : 0.7,
    },
    BookFeedbackSchema
  );

  return feedback;
}

// Interactive writing coach chat
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function chatWithWritingCoach(
  messages: ChatMessage[],
  mode: FeedbackMode,
  context?: {
    chapterContent?: string;
    chapterTitle?: string;
    canonFacts?: string[];
    entities?: string[];
  }
): Promise<string> {
  const ai = getAIClient();

  const systemPrompt = `${MODE_PROMPTS[mode]}

You are an AI writing coach helping an author improve their manuscript.

You can:
- Answer questions about writing craft
- Discuss specific passages they share
- Suggest improvements
- Help brainstorm ideas (while respecting canon)
- Explain feedback you've given
- Help with specific writing challenges

${context?.chapterContent ? `\nCURRENT CHAPTER: ${context.chapterTitle}\n${context.chapterContent.slice(0, 3000)}${context.chapterContent.length > 3000 ? '...' : ''}` : ''}
${context?.canonFacts?.length ? `\nESTABLISHED CANON:\n${context.canonFacts.slice(0, 20).join('\n')}` : ''}
${context?.entities?.length ? `\nKNOWN ENTITIES: ${context.entities.join(', ')}` : ''}

Be conversational but substantive. Give specific, actionable advice.
Keep responses focused and helpful.`;

  const response = await ai.chat({
    systemPrompt,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    maxTokens: 2000,
    temperature: 0.8,
  });

  return response;
}

export async function generateEnhancementSuggestions(
  chapterContent: string,
  chapterTitle: string,
  canonFacts: string[],
  existingEntities: string[],
  relationships: string[]
): Promise<EnhancementSuggestions> {
  const ai = getAIClient();

  const systemPrompt = `You are an expert story consultant identifying opportunities to strengthen a manuscript.

Your job is to find:
1. WEAK SUBPLOTS: Storylines that could be stronger or more integrated
2. DROPPED THREADS: Setup or foreshadowing that hasn't paid off
3. ESCALATION OPPORTUNITIES: Places where stakes could be raised
4. THEMATIC REINFORCEMENT: Ways to strengthen the story's themes
5. CHARACTER ARC OPPORTUNITIES: Ways to deepen character development
6. WORLD BUILDING: Opportunities to enrich the setting
7. TENSION: Places to add or increase conflict
8. PACING: Structural improvements

CRITICAL: All suggestions MUST respect the established canon. You cannot suggest anything that contradicts established facts, relationships, or events.

For each suggestion:
- Explain what you've identified
- Why it's an opportunity
- How to implement it without breaking canon
- What canon constraints apply

Respond with valid JSON only.`;

  const suggestions = await ai.extractJSON(
    {
      systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Chapter: ${chapterTitle}

${chapterContent}

ESTABLISHED CANON FACTS:
${canonFacts.length > 0 ? canonFacts.join('\n') : 'None yet'}

KNOWN ENTITIES:
${existingEntities.length > 0 ? existingEntities.join(', ') : 'None yet'}

ESTABLISHED RELATIONSHIPS:
${relationships.length > 0 ? relationships.join('\n') : 'None yet'}

Identify enhancement opportunities that respect the established canon.`,
        },
      ],
      maxTokens: 4000,
      temperature: 0.8,
    },
    EnhancementSuggestionSchema
  );

  return suggestions;
}
