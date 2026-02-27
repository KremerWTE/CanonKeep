import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';
import crypto from 'crypto';

// Re-parse a specific document by ID
export async function POST(request: NextRequest) {
  try {
    const { documentId, forceReparse } = await request.json();

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 });
    }

    // Get the document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { _count: { select: { blocks: true } } }
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Check if file exists on disk
    const ingestPath = path.join(process.cwd(), 'ingest');
    const filePath = path.join(ingestPath, document.fileName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        error: `File not found at ${filePath}. Please place the file in the ingest folder.`,
        filePath
      }, { status: 404 });
    }

    // Calculate new file hash
    const fileBuffer = fs.readFileSync(filePath);
    const newHash = crypto.createHash('md5').update(fileBuffer).digest('hex');

    // Check if file has changed
    if (!forceReparse && newHash === document.fileHash) {
      return NextResponse.json({
        success: true,
        unchanged: true,
        message: 'Document has not changed since last parse',
        document: {
          id: document.id,
          fileName: document.fileName,
          blockCount: document._count.blocks
        }
      });
    }

    // Parse the document with mammoth
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    const text = result.value;

    // Delete existing content blocks
    await prisma.contentBlock.deleteMany({
      where: { documentId: document.id }
    });

    // Split text into paragraphs/blocks
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

    // Create content blocks
    let blockIndex = 0;
    let currentSection: string | null = null;

    for (const paragraph of paragraphs) {
      const trimmed = paragraph.trim();
      if (!trimmed) continue;

      // Detect section headings
      const isHeading = trimmed.length < 100 &&
        (trimmed.endsWith(':') ||
         /^[A-Z][A-Z\s]+$/.test(trimmed) ||
         /^(Chapter|Section|\d+\.|Part|Book)\s/i.test(trimmed) ||
         /^[A-Z][^.!?]*$/.test(trimmed) && trimmed.length < 60);

      if (isHeading) {
        currentSection = trimmed.replace(/:$/, '');
      }

      await prisma.contentBlock.create({
        data: {
          documentId: document.id,
          blockIndex: blockIndex++,
          rawText: trimmed,
          sectionHeading: currentSection,
          styleType: isHeading ? 'heading' : 'paragraph',
        }
      });
    }

    // Update document metadata
    await prisma.document.update({
      where: { id: document.id },
      data: {
        fileHash: newHash,
        lastModified: fs.statSync(filePath).mtime,
        ingestedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: `Re-parsed ${document.fileName}`,
      document: {
        id: document.id,
        fileName: document.fileName,
        previousBlocks: document._count.blocks,
        newBlocks: blockIndex,
        hashChanged: newHash !== document.fileHash
      }
    });

  } catch (error) {
    console.error('Error re-parsing document:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to re-parse document'
    }, { status: 500 });
  }
}

// Check for changed documents in the ingest folder
export async function GET() {
  try {
    const ingestPath = path.join(process.cwd(), 'ingest');

    // Get all documents from database
    const documents = await prisma.document.findMany({
      select: {
        id: true,
        fileName: true,
        fileHash: true,
        ingestedAt: true,
        _count: { select: { blocks: true } }
      },
      orderBy: { fileName: 'asc' }
    });

    // Check each document for changes
    const documentStatus = documents.map(doc => {
      const filePath = path.join(ingestPath, doc.fileName);
      let status = 'missing';
      let newHash: string | null = null;
      let fileModified: Date | null = null;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        newHash = crypto.createHash('md5').update(fileBuffer).digest('hex');
        fileModified = fs.statSync(filePath).mtime;

        if (newHash === doc.fileHash) {
          status = 'unchanged';
        } else {
          status = 'changed';
        }
      }

      return {
        id: doc.id,
        fileName: doc.fileName,
        status,
        ingestedAt: doc.ingestedAt,
        fileModified,
        blockCount: doc._count.blocks,
        hashChanged: newHash !== doc.fileHash
      };
    });

    // Check for new files in ingest folder
    const newFiles: string[] = [];
    if (fs.existsSync(ingestPath)) {
      const files = fs.readdirSync(ingestPath);
      const existingNames = new Set(documents.map(d => d.fileName));

      for (const file of files) {
        if (file.endsWith('.docx') && !existingNames.has(file)) {
          newFiles.push(file);
        }
      }
    }

    return NextResponse.json({
      documents: documentStatus,
      newFiles,
      stats: {
        total: documents.length,
        unchanged: documentStatus.filter(d => d.status === 'unchanged').length,
        changed: documentStatus.filter(d => d.status === 'changed').length,
        missing: documentStatus.filter(d => d.status === 'missing').length,
        newFiles: newFiles.length
      }
    });

  } catch (error) {
    console.error('Error checking documents:', error);
    return NextResponse.json({ error: 'Failed to check documents' }, { status: 500 });
  }
}
