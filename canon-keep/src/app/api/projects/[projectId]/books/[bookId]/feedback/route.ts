import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateBookFeedback, FeedbackMode } from '@/lib/ai/feedback';

interface RouteParams {
  params: Promise<{ projectId: string; bookId: string }>;
}

// GET /api/projects/[projectId]/books/[bookId]/feedback - Get existing book feedback
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { bookId } = await params;

    const feedbacks = await prisma.aIFeedback.findMany({
      where: { bookId },
      orderBy: { createdAt: 'desc' },
    });

    const result = feedbacks.map(f => ({
      ...f,
      summary: f.summary ? JSON.parse(f.summary) : null,
      strengths: f.strengths ? JSON.parse(f.strengths) : [],
      weaknesses: f.weaknesses ? JSON.parse(f.weaknesses) : [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch book feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// POST /api/projects/[projectId]/books/[bookId]/feedback - Generate new book feedback
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId, bookId } = await params;
    const body = await request.json();
    const mode = (body.mode as FeedbackMode) || 'professional';

    if (!['gentle', 'professional', 'brutal'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid feedback mode' }, { status: 400 });
    }

    // Get book with chapters
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        chapters: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!book || book.projectId !== projectId) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    if (book.chapters.length === 0) {
      return NextResponse.json({ error: 'Book has no chapters' }, { status: 400 });
    }

    // Get canon facts and entities for context
    const [canonFacts, entities, relationships] = await Promise.all([
      prisma.canonFact.findMany({
        where: { entity: { projectId } },
        take: 50,
        select: {
          factType: true,
          factValue: true,
          entity: { select: { name: true } },
        },
      }),
      prisma.entity.findMany({
        where: { projectId },
        take: 30,
        select: { name: true, type: true },
      }),
      prisma.relationship.findMany({
        where: { sourceEntity: { projectId } },
        take: 30,
        select: {
          relationType: true,
          sourceEntity: { select: { name: true } },
          targetEntity: { select: { name: true } },
        },
      }),
    ]);

    const context = {
      canonFacts: canonFacts.map(f => `${f.entity.name}: ${f.factType} = ${f.factValue}`),
      entities: entities.map(e => `${e.name} (${e.type})`),
      relationships: relationships.map(r =>
        `${r.sourceEntity.name} -[${r.relationType}]-> ${r.targetEntity.name}`
      ),
    };

    // Generate book-level feedback
    const feedback = await generateBookFeedback(
      book.chapters.map(ch => ({
        title: ch.title,
        content: ch.content,
        orderIndex: ch.orderIndex,
      })),
      book.title,
      mode,
      context
    );

    // Save to database (using bookId instead of chapterId)
    const savedFeedback = await prisma.aIFeedback.create({
      data: {
        bookId,
        mode,
        summary: JSON.stringify(feedback),
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
    console.error('Failed to generate book feedback:', error);
    return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 });
  }
}
