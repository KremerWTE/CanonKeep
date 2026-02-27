import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const doc = await prisma.document.findFirst({
    where: { fileName: { equals: 'Love Option Book 4.docx' } }
  });

  if (!doc) {
    console.log('Love Option Book 4.docx not found');
    return;
  }

  console.log('Found:', doc.fileName);

  const total = await prisma.contentBlock.count({ where: { documentId: doc.id } });
  console.log('Total blocks:', total);
  console.log('First third ends at block:', Math.floor(total / 3));

  // Get first third
  const blocks = await prisma.contentBlock.findMany({
    where: { documentId: doc.id },
    orderBy: { blockIndex: 'asc' },
    take: Math.floor(total / 3)
  });

  console.log('\n=== FIRST THIRD OF LOVE OPTION BOOK 4 ===\n');
  for (const b of blocks) {
    console.log('[Block', b.blockIndex, ']');
    console.log(b.rawText);
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
