import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find Chris background document
  const chrisDoc = await prisma.document.findFirst({
    where: { fileName: { contains: 'Chris background' } }
  });

  if (chrisDoc) {
    console.log('=== CHRIS BACKGROUND DOCUMENT ===\n');
    const blocks = await prisma.contentBlock.findMany({
      where: { documentId: chrisDoc.id },
      orderBy: { blockIndex: 'asc' },
      take: 30
    });
    for (const b of blocks) {
      console.log('[Block', b.blockIndex, ']');
      console.log(b.rawText);
      console.log('\n---\n');
    }
  }

  // Search for Kendra + gymnastics or college
  console.log('\n=== KENDRA GYMNASTICS/COLLEGE MENTIONS ===\n');
  const kendraBlocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'gymnast' } },
        { rawText: { contains: 'Gymnastics' } },
        { rawText: { contains: 'Kendra college' } },
        { rawText: { contains: 'Kendra met Chris' } },
      ]
    },
    include: { document: { select: { fileName: true } } },
    take: 20
  });

  for (const b of kendraBlocks) {
    console.log('[' + b.document.fileName + ']');
    console.log(b.rawText.substring(0, 500));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
