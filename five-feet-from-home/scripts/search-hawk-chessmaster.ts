import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== SEARCHING FOR HAWK AND CHESSMASTER CONTENT ===\n');

  // Find Hawk-related documents
  const docs = await prisma.document.findMany({
    where: {
      OR: [
        { fileName: { contains: 'Hawk' } },
        { fileName: { contains: 'Addie and Hawk' } }
      ]
    }
  });

  console.log('Found', docs.length, 'Hawk-related documents:');
  for (const d of docs) {
    console.log(' - ' + d.fileName);
  }

  // Read each Hawk document
  for (const doc of docs) {
    console.log('\n=== ' + doc.fileName + ' ===\n');

    const blocks = await prisma.contentBlock.findMany({
      where: { documentId: doc.id },
      orderBy: { blockIndex: 'asc' }
    });

    for (const b of blocks) {
      console.log('[Block ' + b.blockIndex + ']');
      console.log(b.rawText.substring(0, 700));
      console.log('---');
    }
  }

  // Also search for "playing the board" or chess-related strategy
  console.log('\n=== SEARCHING FOR STRATEGY/BOARD REFERENCES ===\n');

  const strategyBlocks = await prisma.contentBlock.findMany({
    where: {
      rawText: { contains: 'playing the board' }
    },
    include: { document: true }
  });

  for (const b of strategyBlocks) {
    console.log('[' + b.document.fileName + ' Block ' + b.blockIndex + ']');
    console.log(b.rawText.substring(0, 800));
    console.log('---');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
