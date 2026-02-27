import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const doc = await prisma.document.findFirst({
    where: { fileName: { contains: 'Chat 1' } }
  });

  if (!doc) {
    console.log('Chat 1 not found');
    return;
  }

  // Search for later story arcs - BSS operations, Hawk, expansion, etc.
  const blocks = await prisma.contentBlock.findMany({
    where: {
      documentId: doc.id,
      OR: [
        { rawText: { contains: 'Hawk' } },
        { rawText: { contains: 'expansion' } },
        { rawText: { contains: 'Miami' } },
        { rawText: { contains: 'senior strategist' } },
        { rawText: { contains: 'fixer' } },
        { rawText: { contains: 'Kendra' } },
        { rawText: { contains: 'Bella' } },
      ]
    },
    orderBy: { blockIndex: 'asc' },
    take: 60
  });

  console.log('Found', blocks.length, 'blocks about later story arcs\n');

  for (const b of blocks.slice(0, 40)) {
    console.log('[Block', b.blockIndex, ']');
    console.log(b.rawText.substring(0, 500));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
