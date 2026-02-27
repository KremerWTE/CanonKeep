import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, projectId, chapterIds } = body;

    if (!title || !projectId) {
      return NextResponse.json(
        { success: false, error: 'Title and projectId are required' },
        { status: 400 }
      );
    }

    // Create the book
    const book = await prisma.book.create({
      data: {
        title,
        subtitle: subtitle || null,
        projectId,
      },
    });

    // Assign chapters to the book
    if (chapterIds && chapterIds.length > 0) {
      await prisma.chapter.updateMany({
        where: {
          id: { in: chapterIds },
          projectId, // Ensure chapters belong to the same project
        },
        data: {
          bookId: book.id,
        },
      });

      // Update sort order
      for (let i = 0; i < chapterIds.length; i++) {
        await prisma.chapter.update({
          where: { id: chapterIds[i] },
          data: { sortOrder: i },
        });
      }
    }

    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create book' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        project: true,
        chapters: {
          orderBy: { sortOrder: 'asc' },
          select: {
            id: true,
            title: true,
            number: true,
            wordCount: true,
            sortOrder: true,
          },
        },
      },
      orderBy: { title: 'asc' },
    });

    // Add computed stats
    const booksWithStats = books.map(book => ({
      ...book,
      chapterCount: book.chapters.length,
      wordCount: book.chapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0),
    }));

    return NextResponse.json({ success: true, data: booksWithStats, books: booksWithStats });
  } catch (error) {
    console.error('Get books error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get books' },
      { status: 500 }
    );
  }
}
