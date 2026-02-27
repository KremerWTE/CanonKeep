import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import mammoth from 'mammoth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file type
    if (!file.name.endsWith('.docx')) {
      return NextResponse.json({ error: 'Only .docx files are supported' }, { status: 400 });
    }

    // Read file as buffer first
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate file hash from content
    const fileHash = crypto.createHash('md5').update(buffer).digest('hex');

    // Get or create project
    let project = await prisma.project.findFirst();
    if (!project) {
      project = await prisma.project.create({
        data: {
          name: 'Five Feet From Home',
          description: 'Story project',
        }
      });
    }

    // Check if document already exists
    const existingDoc = await prisma.document.findFirst({
      where: { fileName: file.name }
    });

    if (existingDoc) {
      // Delete existing blocks
      await prisma.contentBlock.deleteMany({
        where: { documentId: existingDoc.id }
      });
      // Delete the document
      await prisma.document.delete({
        where: { id: existingDoc.id }
      });
    }

    // Parse docx with mammoth
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value;

    // Create document record with correct schema fields
    const document = await prisma.document.create({
      data: {
        projectId: project.id,
        fileName: file.name,
        filePath: `uploads/${file.name}`,
        fileHash: fileHash,
        lastModified: new Date(),
      }
    });

    // Split text into paragraphs/blocks
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

    // Create content blocks
    let blockIndex = 0;
    let currentSection: string | null = null;

    for (const paragraph of paragraphs) {
      const trimmed = paragraph.trim();
      if (!trimmed) continue;

      // Detect section headings (lines that are short and look like titles)
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

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        fileName: document.fileName,
        blocksCreated: blockIndex,
      },
      message: `Successfully parsed ${file.name} into ${blockIndex} content blocks`
    });

  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload document'
    }, { status: 500 });
  }
}

// Get list of all documents
export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      select: {
        id: true,
        fileName: true,
        filePath: true,
        ingestedAt: true,
        _count: {
          select: { blocks: true }
        }
      },
      orderBy: { ingestedAt: 'desc' }
    });

    return NextResponse.json({
      documents: documents.map(d => ({
        id: d.id,
        fileName: d.fileName,
        filePath: d.filePath,
        ingestedAt: d.ingestedAt,
        blockCount: d._count.blocks
      }))
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
