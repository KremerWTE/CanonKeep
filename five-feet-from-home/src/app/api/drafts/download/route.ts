import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import JSZip from 'jszip';

const BOOK_TITLES: Record<string, string> = {
  book1: 'Five Feet From Home',
  book2: 'The Ownership Game',
  book3: 'The Expansion'
};

async function getBookChapters(draftsPath: string, bookFolder: string) {
  const bookPath = path.join(draftsPath, bookFolder);
  try {
    const files = await fs.readdir(bookPath);
    return files
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format') || 'docx';
  const file = searchParams.get('file');
  const type = searchParams.get('type');

  const draftsPath = path.join(process.cwd(), 'drafts');

  try {
    let content = '';
    let filename = '';

    // Handle zip downloads for individual chapters
    if (type?.endsWith('-chapters-zip')) {
      const bookFolder = type.replace('-chapters-zip', '');
      const bookTitle = BOOK_TITLES[bookFolder] || bookFolder;
      const chapters = await getBookChapters(draftsPath, bookFolder);

      if (chapters.length === 0) {
        return NextResponse.json({ error: 'No chapters found' }, { status: 404 });
      }

      const zip = new JSZip();
      const bookPath = path.join(draftsPath, bookFolder);

      for (const chapterFile of chapters) {
        const chapterContent = await fs.readFile(path.join(bookPath, chapterFile), 'utf-8');

        if (format === 'docx') {
          const doc = createWordDocument(chapterContent, chapterFile.replace('.md', ''));
          const buffer = await Packer.toBuffer(doc);
          zip.file(chapterFile.replace('.md', '.docx'), buffer);
        } else {
          zip.file(chapterFile, chapterContent);
        }
      }

      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      const ext = format === 'docx' ? 'docx' : 'md';

      return new NextResponse(new Uint8Array(zipBuffer), {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${bookTitle.toLowerCase().replace(/\s+/g, '-')}-chapters-${ext}.zip"`,
        },
      });
    }

    if (type === 'all') {
      // Combine all drafts from all books
      for (const bookFolder of ['book1', 'book2', 'book3']) {
        const bookTitle = BOOK_TITLES[bookFolder];
        const chapters = await getBookChapters(draftsPath, bookFolder);

        if (chapters.length > 0) {
          content += `\n\n# ${bookTitle.toUpperCase()}\n\n`;
          const bookPath = path.join(draftsPath, bookFolder);

          for (const f of chapters) {
            const chapterContent = await fs.readFile(path.join(bookPath, f), 'utf-8');
            content += chapterContent + '\n\n---\n\n';
          }
        }
      }

      // Add character bible
      try {
        const bibleContent = await fs.readFile(path.join(draftsPath, 'character-bible.md'), 'utf-8');
        content += '\n\n# CHARACTER BIBLE\n\n' + bibleContent;
      } catch {
        // No bible yet
      }

      filename = 'five-feet-from-home-all-drafts';
    } else if (type === 'book1' || type === 'book2' || type === 'book3') {
      // Single book chapters combined
      const bookTitle = BOOK_TITLES[type];
      const chapters = await getBookChapters(draftsPath, type);
      const bookPath = path.join(draftsPath, type);

      content = `# ${bookTitle}\n\n`;

      for (const f of chapters) {
        const chapterContent = await fs.readFile(path.join(bookPath, f), 'utf-8');
        content += chapterContent + '\n\n---\n\n';
      }

      filename = `${bookTitle.toLowerCase().replace(/\s+/g, '-')}`;
    } else if (file) {
      // Single file
      let filePath: string;
      if (file === 'character-bible') {
        filePath = path.join(draftsPath, 'character-bible.md');
        filename = 'character-bible';
      } else {
        filePath = path.join(draftsPath, `${file}.md`);
        filename = file.replace(/\//g, '-');
      }

      content = await fs.readFile(filePath, 'utf-8');
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (format === 'md') {
      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': `attachment; filename="${filename}.md"`,
        },
      });
    }

    // Generate Word document
    const doc = createWordDocument(content, filename);
    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}.docx"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

function createWordDocument(markdown: string, title: string): Document {
  const paragraphs: Paragraph[] = [];

  // Split content into lines
  const lines = markdown.split('\n');

  for (const line of lines) {
    if (line.startsWith('# ')) {
      // H1 heading
      paragraphs.push(
        new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );
    } else if (line.startsWith('## ')) {
      // H2 heading
      paragraphs.push(
        new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        })
      );
    } else if (line.startsWith('### ')) {
      // H3 heading
      paragraphs.push(
        new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (line.startsWith('---')) {
      // Horizontal rule - add page break or spacing
      paragraphs.push(
        new Paragraph({
          text: '',
          spacing: { before: 400, after: 400 },
        })
      );
    } else if (line.startsWith('> ')) {
      // Blockquote
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.replace('> ', ''),
              italics: true,
            }),
          ],
          indent: { left: 720 },
          spacing: { before: 100, after: 100 },
        })
      );
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      // Italic line (like *Source:*)
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.replace(/\*/g, ''),
              italics: true,
            }),
          ],
          spacing: { before: 100, after: 100 },
        })
      );
    } else if (line.startsWith('- **') || line.startsWith('- ')) {
      // List item
      const cleanLine = line.replace(/^- \*\*/, '').replace(/\*\*:/, ':').replace(/^- /, '');
      paragraphs.push(
        new Paragraph({
          text: '• ' + cleanLine,
          indent: { left: 360 },
          spacing: { before: 50, after: 50 },
        })
      );
    } else if (line.trim() === '') {
      // Empty line
      paragraphs.push(new Paragraph({ text: '' }));
    } else {
      // Regular paragraph - handle inline formatting
      const children: TextRun[] = [];
      let remaining = line;

      // Simple parsing for bold and italic
      const parts = remaining.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/);
      for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
          children.push(
            new TextRun({
              text: part.slice(2, -2),
              bold: true,
            })
          );
        } else if (part.startsWith('*') && part.endsWith('*')) {
          children.push(
            new TextRun({
              text: part.slice(1, -1),
              italics: true,
            })
          );
        } else if (part) {
          children.push(new TextRun({ text: part }));
        }
      }

      paragraphs.push(
        new Paragraph({
          children: children.length > 0 ? children : [new TextRun({ text: line })],
          spacing: { before: 100, after: 100 },
        })
      );
    }
  }

  return new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });
}
