import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateChapterFeedback, FeedbackMode } from '@/lib/ai/feedback';

interface RouteParams {
  params: Promise<{ projectId: string; chapterId: string }>;
}

// GET /api/projects/[projectId]/chapters/[chapterId]/feedback - Get existing feedback
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { chapterId } = await params;

    const feedbacks = await prisma.aIFeedback.findMany({
      where: { chapterId },
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON fields
    const result = feedbacks.map(f => ({
      ...f,
      summary: JSON.parse(f.summary),
      strengths: f.strengths ? JSON.parse(f.strengths) : [],
      weaknesses: f.weaknesses ? JSON.parse(f.weaknesses) : [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// POST /api/projects/[projectId]/chapters/[chapterId]/feedback - Generate new feedback
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId, chapterId } = await params;
    const body = await request.json();
    const mode = (body.mode as FeedbackMode) || 'professional';

    if (!['gentle', 'professional', 'brutal'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid feedback mode' }, { status: 400 });
    }

    // Get chapter content
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        book: true,
      },
    });

    if (!chapter || chapter.book.projectId !== projectId) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    // Get canon facts for context
    const canonFacts = await prisma.canonFact.findMany({
      where: {
        entity: { projectId },
      },
      take: 50,
      select: {
        factType: true,
        factValue: true,
        entity: { select: { name: true } },
      },
    });

    const factsContext = canonFacts.map(f =>
      `${f.entity.name}: ${f.factType} = ${f.factValue}`
    );

    // Generate feedback
    const feedback = await generateChapterFeedback(
      chapter.content,
      chapter.title,
      mode,
      { canonFacts: factsContext }
    );

    // Save to database
    const savedFeedback = await prisma.aIFeedback.create({
      data: {
        chapterId,
        mode,
        summary: JSON.stringify(feedback),
        pacing: JSON.stringify(feedback.pacing),
        clarity: JSON.stringify(feedback.clarity),
        stakes: JSON.stringify(feedback.stakes),
        characterAgency: JSON.stringify(feedback.characterAgency),
        scenePurpose: JSON.stringify(feedback.scenePurpose),
        emotionalImpact: JSON.stringify(feedback.emotionalImpact),
        strengths: JSON.stringify(feedback.strengths),
        weaknesses: JSON.stringify(feedback.weaknesses),
      },
    });

    return NextResponse.json({
      id: savedFeedback.id,
      mode: savedFeedback.mode,
      feedback,
      createdAt: savedFeedback.createdAt,
    });
  } catch (error) {
    console.error('Failed to generate feedback:', error);
    return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 });
  }
}
