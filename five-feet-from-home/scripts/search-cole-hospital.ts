import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== SEARCHING FOR COLE AND HOSPITAL IN ALL DOCUMENTS ===\n');

  // Get all documents
  const docs = await prisma.document.findMany();
  console.log('Total documents:', docs.length);

  // Search for Cole (case insensitive by searching both)
  console.log('\n--- COLE REFERENCES ---\n');

  const coleBlocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'Cole' } },
        { rawText: { contains: 'cole' } }
      ]
    },
    include: { document: true },
    take: 30
  });

  console.log('Found', coleBlocks.length, 'blocks with Cole');
  for (const b of coleBlocks) {
    console.log('[' + b.document.fileName + ' Block ' + b.blockIndex + ']');
    console.log(b.rawText.substring(0, 500));
    console.log('---');
  }

  // Search for hospital stay / forced rest with Addie
  console.log('\n--- HOSPITAL/FORCED REST REFERENCES ---\n');

  const hospitalBlocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'hospital' } },
        { rawText: { contains: 'forced rest' } },
        { rawText: { contains: 'bed rest' } },
        { rawText: { contains: 'admitted' } },
        { rawText: { contains: 'recovery room' } }
      ]
    },
    include: { document: true }
  });

  console.log('Found', hospitalBlocks.length, 'hospital-related blocks');
  for (const b of hospitalBlocks) {
    const text = b.rawText.toLowerCase();
    if (text.includes('addie') || text.includes('addison')) {
      console.log('[' + b.document.fileName + ' Block ' + b.blockIndex + ']');
      console.log(b.rawText.substring(0, 600));
      console.log('---');
    }
  }

  // Also search Chat 1 for anything after the breakdown
  console.log('\n--- CHAT 1 BREAKDOWN/AFTERMATH ---\n');

  const chatDoc = await prisma.document.findFirst({
    where: { fileName: { equals: 'Chat 1.docx' } }
  });

  if (chatDoc) {
    const chatBlocks = await prisma.contentBlock.findMany({
      where: {
        documentId: chatDoc.id,
        OR: [
          { rawText: { contains: 'Addie' } },
          { rawText: { contains: 'Addison' } }
        ]
      },
      orderBy: { blockIndex: 'asc' }
    });

    for (const b of chatBlocks) {
      const text = b.rawText.toLowerCase();
      if (text.includes('hospital') || text.includes('recover') || text.includes('rest') ||
          text.includes('cole') || text.includes('guard') || text.includes('watch')) {
        console.log('[Chat 1 Block ' + b.blockIndex + ']');
        console.log(b.rawText.substring(0, 600));
        console.log('---');
      }
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
