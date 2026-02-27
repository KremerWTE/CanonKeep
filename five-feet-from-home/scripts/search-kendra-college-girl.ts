import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Search for any mentions of girls in Kendra's past or college
  const blocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'Kendra UCLA' } },
        { rawText: { contains: 'Kendra gymnast' } },
        { rawText: { contains: 'Kendra teammate' } },
        { rawText: { contains: 'Kendra experimented' } },
        { rawText: { contains: 'Kendra first' } },
        { rawText: { contains: 'Kendra sexuality' } },
        { rawText: { contains: 'Kendra women' } },
        { rawText: { contains: 'Kendra girl' } },
      ]
    },
    include: { document: { select: { fileName: true } } },
    take: 30
  });

  console.log('Found', blocks.length, 'blocks\n');

  for (const b of blocks) {
    console.log('[' + b.document.fileName + ']');
    console.log(b.rawText.substring(0, 700));
    console.log('\n---\n');
  }

  // Also search Love Triangle document
  const loveDoc = await prisma.document.findFirst({
    where: { fileName: { contains: 'Love Triangle' } }
  });

  if (loveDoc) {
    console.log('\n=== LOVE TRIANGLE DOCUMENT ===\n');
    const loveBlocks = await prisma.contentBlock.findMany({
      where: { documentId: loveDoc.id },
      orderBy: { blockIndex: 'asc' },
      take: 40
    });
    for (const b of loveBlocks) {
      console.log('[Block', b.blockIndex, ']', b.rawText.substring(0, 300));
      console.log('---');
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
