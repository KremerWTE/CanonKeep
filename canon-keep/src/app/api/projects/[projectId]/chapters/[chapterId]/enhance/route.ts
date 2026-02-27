import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateEnhancementSuggestions } from '@/lib/ai/feedback';

interface RouteParams {
  params: Promise<{ projectId: string; chapterId: string }>;
}

// GET /api/projects/[projectId]/chapters/[chapterId]/enhance - Get existing suggestions
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { chapterId } = await params;

    const suggestions = await prisma.aISuggestion.findMany({
      where: { chapterId },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse JSON fields
    const result = suggestions.map(s => ({
      ...s,
      canonConstraints: s.canonConstraints ? JSON.parse(s.canonConstraints) : [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}

// POST /api/projects/[projectId]/chapters/[chapterId]/enhance - Generate new suggestions
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId, chapterId } = await params;

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

    // Get canon context
    const [entities, relationships, canonFacts] = await Promise.all([
      prisma.entity.findMany({
        where: { projectId },
        select: { name: true, type: true },
      }),
      prisma.relationship.findMany({
        where: { sourceEntity: { projectId } },
        include: {
          sourceEntity: { select: { name: true } },
          targetEntity: { select: { name: true } },
        },
      }),
      prisma.canonFact.findMany({
        where: { entity: { projectId } },
        include: { entity: { select: { name: true } } },
      }),
    ]);

    const entityNames = entities.map(e => `${e.name} (${e.type})`);
    const relationshipStrs = relationships.map(
      r => `${r.sourceEntity.name} ${r.relationType} ${r.targetEntity.name}`
    );
    const factStrs = canonFacts.map(
      f => `${f.entity.name}: ${f.factType} = ${f.factValue}`
    );

    // Generate suggestions
    const result = await generateEnhancementSuggestions(
      chapter.content,
      chapter.title,
      factStrs,
      entityNames,
      relationshipStrs
    );

    // Save suggestions to database
    await prisma.aISuggestion.deleteMany({
      where: { chapterId, status: 'pending' },
    });

    const savedSuggestions = await Promise.all(
      result.suggestions.map(s =>
        prisma.aISuggestion.create({
          data: {
            chapterId,
            suggestionType: s.type,
            title: s.title,
            description: s.description,
            canonConstraints: s.canonConstraints ? JSON.stringify(s.canonConstraints) : null,
            evidence: s.evidence,
            priority: s.priority,
            status: 'pending',
          },
        })
      )
    );

    return NextResponse.json(savedSuggestions);
  } catch (error) {
    console.error('Failed to generate suggestions:', error);
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
  }
}
