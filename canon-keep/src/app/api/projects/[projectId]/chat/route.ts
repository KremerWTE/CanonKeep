import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { chatWithWritingCoach, FeedbackMode } from '@/lib/ai/feedback';

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

// GET /api/projects/[projectId]/chat - Get chat sessions
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;

    const sessions = await prisma.chatSession.findMany({
      where: { projectId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 1, // Just get first message for preview
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Failed to fetch chat sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

// POST /api/projects/[projectId]/chat - Create new session or send message
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;
    const body = await request.json();
    const { sessionId, message, mode = 'professional', chapterId, bookId } = body;

    if (!['gentle', 'professional', 'brutal'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }

    // Get or create session
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });
      if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
      }
    } else {
      session = await prisma.chatSession.create({
        data: {
          projectId,
          mode,
          chapterId,
          bookId,
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
        },
        include: {
          messages: true,
        },
      });
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content: message,
      },
    });

    // Build context
    let context: {
      chapterContent?: string;
      chapterTitle?: string;
      canonFacts?: string[];
      entities?: string[];
    } = {};

    // Get chapter content if we have a chapter context
    if (session.chapterId || chapterId) {
      const chapter = await prisma.chapter.findUnique({
        where: { id: session.chapterId || chapterId },
      });
      if (chapter) {
        context.chapterContent = chapter.content;
        context.chapterTitle = chapter.title;
      }
    }

    // Get canon facts and entities
    const [canonFacts, entities] = await Promise.all([
      prisma.canonFact.findMany({
        where: { entity: { projectId } },
        take: 30,
        include: { entity: { select: { name: true } } },
      }),
      prisma.entity.findMany({
        where: { projectId },
        take: 30,
      }),
    ]);

    context.canonFacts = canonFacts.map(f => `${f.entity.name}: ${f.factType} = ${f.factValue}`);
    context.entities = entities.map(e => e.name);

    // Build message history
    const messageHistory = session.messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));
    messageHistory.push({ role: 'user', content: message });

    // Get AI response
    const response = await chatWithWritingCoach(
      messageHistory,
      session.mode as FeedbackMode,
      context
    );

    // Save assistant message
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: response,
      },
    });

    // Update session timestamp
    await prisma.chatSession.update({
      where: { id: session.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({
      sessionId: session.id,
      message: {
        id: assistantMessage.id,
        role: 'assistant',
        content: response,
        createdAt: assistantMessage.createdAt,
      },
    });
  } catch (error) {
    console.error('Failed to process chat:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
