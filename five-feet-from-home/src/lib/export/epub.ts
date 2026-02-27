import EPub from 'epub-gen-memory';
import { PrismaClient } from '@prisma/client';
import { marked } from 'marked';

interface EpubChapter {
  title: string;
  content: string;
}

/**
 * Export a book as an ePub document
 */
export async function exportEpub(
  prisma: PrismaClient,
  bookId: string
): Promise<Buffer> {
  // Get book with chapters
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      chapters: {
        orderBy: { sortOrder: 'asc' },
        include: {
          characters: {
            include: { character: true },
          },
        },
      },
      project: true,
    },
  });

  if (!book) {
    throw new Error(`Book not found: ${bookId}`);
  }

  // Build chapters for ePub
  const epubChapters: EpubChapter[] = [];

  // Add synopsis as first chapter if it exists
  if (book.synopsis) {
    epubChapters.push({
      title: 'Synopsis',
      content: `<p>${escapeHtml(book.synopsis)}</p>`,
    });
  }

  // Add each chapter
  for (const chapter of book.chapters) {
    const chapterTitle = chapter.title || `Chapter ${chapter.number}`;
    let content = '';

    // Chapter synopsis
    if (chapter.synopsis) {
      content += `<p><em>${escapeHtml(chapter.synopsis)}</em></p><hr/>`;
    }

    // Chapter content
    if (chapter.draftText) {
      // Convert markdown to HTML
      const htmlContent = await marked.parse(chapter.draftText);
      content += htmlContent;
    }

    // Characters
    if (chapter.characters.length > 0) {
      content += `<hr/><p><strong>Characters:</strong> ${chapter.characters.map(c => escapeHtml(c.character.name)).join(', ')}</p>`;
    }

    if (content) {
      epubChapters.push({
        title: chapterTitle,
        content,
      });
    }
  }

  // Generate ePub
  const epub = await EPub({
    title: book.title,
    author: 'Story Site Export',
    publisher: 'Story Site',
    description: book.synopsis || `Manuscript for ${book.title}`,
    tocTitle: 'Table of Contents',
    date: new Date().toISOString().split('T')[0],
    lang: 'en',
    css: `
      body { font-family: Georgia, serif; line-height: 1.6; }
      h1 { page-break-before: always; margin-top: 2em; }
      p { margin: 1em 0; text-indent: 1.5em; }
      p:first-of-type { text-indent: 0; }
      hr { border: none; border-top: 1px solid #ccc; margin: 2em 0; }
      em { font-style: italic; }
      strong { font-weight: bold; }
    `,
  }, epubChapters);

  return Buffer.from(epub);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
