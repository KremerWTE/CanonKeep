import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { exportManuscript, exportDocx, exportEpub } from '@/lib/export';

interface RouteParams {
  params: Promise<{ bookId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { bookId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'markdown';

    // Get book title for filename
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { title: true },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    const safeTitle = book.title.replace(/[^a-zA-Z0-9]/g, '_');

    switch (format) {
      case 'docx': {
        const buffer = await exportDocx(prisma, bookId);
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment; filename="${safeTitle}_manuscript.docx"`,
          },
        });
      }

      case 'epub': {
        const buffer = await exportEpub(prisma, bookId);
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': 'application/epub+zip',
            'Content-Disposition': `attachment; filename="${safeTitle}_manuscript.epub"`,
          },
        });
      }

      case 'markdown':
      default: {
        const markdown = await exportManuscript(prisma, bookId);
        return new NextResponse(markdown, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Content-Disposition': `attachment; filename="${safeTitle}_manuscript.md"`,
          },
        });
      }
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export manuscript' },
      { status: 500 }
    );
  }
}
