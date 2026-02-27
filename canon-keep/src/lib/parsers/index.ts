import mammoth from 'mammoth';
import { marked } from 'marked';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface ParsedDocument {
  text: string;
  chapters: ParsedChapter[];
  metadata: DocumentMetadata;
}

export interface ParsedChapter {
  title: string;
  content: string;
  orderIndex: number;
  startOffset: number;
  endOffset: number;
}

export interface DocumentMetadata {
  filename: string;
  mimeType: string;
  wordCount: number;
  characterCount: number;
  estimatedChapterCount: number;
}

// Chapter heading patterns
const CHAPTER_PATTERNS = [
  /^(?:Chapter|CHAPTER)\s+(\d+|[IVXLCDM]+)(?:\s*[:\-–—]\s*(.+))?$/m,
  /^(?:Part|PART)\s+(\d+|[IVXLCDM]+)(?:\s*[:\-–—]\s*(.+))?$/m,
  /^(\d+)\.\s+(.+)$/m,
  /^#{1,2}\s+(?:Chapter|CHAPTER)\s+(\d+|[IVXLCDM]+)(?:\s*[:\-–—]\s*(.+))?$/m,
  /^#{1,2}\s+(.+)$/m,
];

function detectChapters(text: string): ParsedChapter[] {
  const chapters: ParsedChapter[] = [];
  const lines = text.split('\n');
  let currentChapter: { title: string; startLine: number; startOffset: number } | null = null;
  let currentOffset = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    let isChapterHeading = false;
    let chapterTitle = '';

    for (const pattern of CHAPTER_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        isChapterHeading = true;
        chapterTitle = line;
        break;
      }
    }

    if (isChapterHeading) {
      // Save previous chapter
      if (currentChapter) {
        const content = lines.slice(currentChapter.startLine + 1, i).join('\n').trim();
        chapters.push({
          title: currentChapter.title,
          content,
          orderIndex: chapters.length,
          startOffset: currentChapter.startOffset,
          endOffset: currentOffset - 1,
        });
      }

      currentChapter = {
        title: chapterTitle,
        startLine: i,
        startOffset: currentOffset,
      };
    }

    currentOffset += lines[i].length + 1; // +1 for newline
  }

  // Add the last chapter
  if (currentChapter) {
    const content = lines.slice(currentChapter.startLine + 1).join('\n').trim();
    chapters.push({
      title: currentChapter.title,
      content,
      orderIndex: chapters.length,
      startOffset: currentChapter.startOffset,
      endOffset: text.length,
    });
  }

  // If no chapters detected, treat entire document as one chapter
  if (chapters.length === 0) {
    chapters.push({
      title: 'Full Document',
      content: text,
      orderIndex: 0,
      startOffset: 0,
      endOffset: text.length,
    });
  }

  return chapters;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

export async function parseDocx(filePath: string): Promise<ParsedDocument> {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value;

  const chapters = detectChapters(text);

  return {
    text,
    chapters,
    metadata: {
      filename: path.basename(filePath),
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      wordCount: countWords(text),
      characterCount: text.length,
      estimatedChapterCount: chapters.length,
    },
  };
}

export async function parsePdf(filePath: string): Promise<ParsedDocument> {
  // Dynamic import for pdf-parse as it has issues with SSR
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfParseModule = await import('pdf-parse') as any;
  const pdfParse = pdfParseModule.default || pdfParseModule;
  const buffer = await fs.readFile(filePath);
  const data = await pdfParse(buffer);
  const text = data.text;

  const chapters = detectChapters(text);

  return {
    text,
    chapters,
    metadata: {
      filename: path.basename(filePath),
      mimeType: 'application/pdf',
      wordCount: countWords(text),
      characterCount: text.length,
      estimatedChapterCount: chapters.length,
    },
  };
}

export async function parseMarkdown(filePath: string): Promise<ParsedDocument> {
  const content = await fs.readFile(filePath, 'utf-8');

  // Convert to plain text for processing
  const html = await marked(content);
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  // For markdown, we can use the original content for chapter detection
  const chapters = detectChapters(content);

  return {
    text: content, // Keep original markdown for better processing
    chapters,
    metadata: {
      filename: path.basename(filePath),
      mimeType: 'text/markdown',
      wordCount: countWords(text),
      characterCount: content.length,
      estimatedChapterCount: chapters.length,
    },
  };
}

export async function parsePlainText(filePath: string): Promise<ParsedDocument> {
  const text = await fs.readFile(filePath, 'utf-8');
  const chapters = detectChapters(text);

  return {
    text,
    chapters,
    metadata: {
      filename: path.basename(filePath),
      mimeType: 'text/plain',
      wordCount: countWords(text),
      characterCount: text.length,
      estimatedChapterCount: chapters.length,
    },
  };
}

export async function parseDocument(filePath: string, mimeType: string): Promise<ParsedDocument> {
  switch (mimeType) {
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
      return parseDocx(filePath);
    case 'application/pdf':
      return parsePdf(filePath);
    case 'text/markdown':
    case 'text/x-markdown':
      return parseMarkdown(filePath);
    case 'text/plain':
      return parsePlainText(filePath);
    default:
      // Try to detect by extension
      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.docx' || ext === '.doc') {
        return parseDocx(filePath);
      } else if (ext === '.pdf') {
        return parsePdf(filePath);
      } else if (ext === '.md' || ext === '.markdown') {
        return parseMarkdown(filePath);
      } else {
        return parsePlainText(filePath);
      }
  }
}
