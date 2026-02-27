import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { processUpload } from '@/lib/ingestion/service';

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

// GET /api/projects/[projectId]/uploads - List uploads
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;

    const uploads = await prisma.upload.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(uploads);
  } catch (error) {
    console.error('Failed to fetch uploads:', error);
    return NextResponse.json({ error: 'Failed to fetch uploads' }, { status: 500 });
  }
}

// POST /api/projects/[projectId]/uploads - Upload a file
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params;

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bookId = formData.get('bookId') as string | null;
    const seriesId = formData.get('seriesId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'text/markdown',
      'text/plain',
    ];

    const allowedExtensions = ['.docx', '.doc', '.pdf', '.md', '.txt'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported: DOCX, PDF, MD, TXT' },
        { status: 400 }
      );
    }

    // Create upload directory
    const uploadDir = join(process.cwd(), 'uploads', projectId);
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filename = `${uuidv4()}${ext}`;
    const filePath = join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    // Create upload record
    const upload = await prisma.upload.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type || 'application/octet-stream',
        fileSize: file.size,
        filePath,
        projectId,
        status: 'pending',
      },
    });

    // Start processing in background
    processUpload({
      projectId,
      uploadId: upload.id,
      filePath,
      mimeType: file.type || ext,
      bookId: bookId || undefined,
      seriesId: seriesId || undefined,
    }).catch(error => {
      console.error('Background processing failed:', error);
    });

    return NextResponse.json(upload, { status: 201 });
  } catch (error) {
    console.error('Failed to upload file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
