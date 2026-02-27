import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First list all documents to find the right one
  const docs = await prisma.document.findMany({ select: { id: true, fileName: true } });
  console.log('All documents:');
  docs.forEach(d => console.log(' -', d.fileName));

  // Find love options document
  const doc = await prisma.document.findFirst({
    where: {
      OR: [
        { fileName: { contains: 'love' } },
        { fileName: { contains: 'Love' } },
        { fileName: { contains: 'option' } },
        { fileName: { contains: 'Option' } },
      ]
    }
  });

  if (!doc) {
    console.log('\nNo love/option document found');
    return;
  }

  console.log('\nFound:', doc.fileName);

  const total = await prisma.contentBlock.count({ where: { documentId: doc.id } });
  console.log('Total blocks:', total);

  // Get first third
  const blocks = await prisma.contentBlock.findMany({
    where: { documentId: doc.id },
    orderBy: { blockIndex: 'asc' },
    take: Math.min(80, Math.floor(total / 3))
  });

  console.log('\n=== FIRST THIRD ===\n');
  for (const b of blocks) {
    console.log('[Block', b.blockIndex, ']');
    console.log(b.rawText.substring(0, 600));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
