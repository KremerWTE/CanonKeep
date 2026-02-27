import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get the BSS and POH outline document
  const doc = await prisma.document.findFirst({
    where: { fileName: { contains: 'BSS and POH' } }
  });

  if (!doc) {
    console.log('Document not found');
    return;
  }

  console.log('Found document:', doc.fileName);

  const blocks = await prisma.contentBlock.findMany({
    where: { documentId: doc.id },
    orderBy: { blockIndex: 'asc' },
    take: 100
  });

  console.log(`\n=== ${blocks.length} blocks ===\n`);

  blocks.forEach((b, i) => {
    console.log(`[Block ${i}]`);
    console.log(b.rawText.substring(0, 500));
    console.log('\n---\n');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
