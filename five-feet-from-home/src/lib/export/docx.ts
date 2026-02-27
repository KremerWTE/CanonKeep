import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, AlignmentType } from 'docx';
import { PrismaClient } from '@prisma/client';

/**
 * Export a book as a DOCX document
 */
export async function exportDocx(
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

  const children: Paragraph[] = [];

  // Title
  children.push(
    new Paragraph({
      text: book.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // Subtitle
  if (book.subtitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: book.subtitle,
            italics: true,
            size: 28,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
      })
    );
  }

  // Synopsis
  if (book.synopsis) {
    children.push(
      new Paragraph({
        text: 'Synopsis',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );
    children.push(
      new Paragraph({
        text: book.synopsis,
        spacing: { after: 400 },
      })
    );
  }

  // Divider
  children.push(
    new Paragraph({
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: 'auto' },
      },
      spacing: { after: 600 },
    })
  );

  // Chapters
  for (const chapter of book.chapters) {
    const chapterTitle = chapter.title || `Chapter ${chapter.number}`;

    // Page break before chapter (except first)
    if (book.chapters.indexOf(chapter) > 0) {
      children.push(
        new Paragraph({
          pageBreakBefore: true,
        })
      );
    }

    // Chapter title
    children.push(
      new Paragraph({
        text: chapterTitle,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    // Chapter synopsis (italics)
    if (chapter.synopsis) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: chapter.synopsis,
              italics: true,
            }),
          ],
          spacing: { after: 400 },
        })
      );
    }

    // Chapter draft text
    if (chapter.draftText) {
      // Split by double newlines to create paragraphs
      const paragraphs = chapter.draftText.split(/\n\n+/);
      for (const para of paragraphs) {
        if (para.trim()) {
          children.push(
            new Paragraph({
              text: para.trim(),
              spacing: { after: 200 },
            })
          );
        }
      }
    }

    // Characters in chapter
    if (chapter.characters.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 400 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Characters: ',
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: chapter.characters.map(c => c.character.name).join(', '),
              size: 20,
            }),
          ],
          spacing: { after: 200 },
        })
      );
    }
  }

  // Footer
  children.push(
    new Paragraph({
      border: {
        top: { style: BorderStyle.SINGLE, size: 6, color: 'auto' },
      },
      spacing: { before: 600, after: 200 },
    })
  );
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated from project: ${book.project.name}`,
          italics: true,
          size: 18,
        }),
      ],
    })
  );
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Export date: ${new Date().toLocaleDateString()}`,
          italics: true,
          size: 18,
        }),
      ],
    })
  );

  // Create document
  const doc = new Document({
    title: book.title,
    creator: 'Story Site',
    description: book.synopsis || `Manuscript for ${book.title}`,
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  // Generate buffer
  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
