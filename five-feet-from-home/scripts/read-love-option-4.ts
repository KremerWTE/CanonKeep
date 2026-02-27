import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const loveDoc = await prisma.document.findFirst({
    where: { fileName: { contains: 'Love Option Book 4' } }
  });

  if (loveDoc) {
    console.log('=== LOVE OPTION BOOK 4 - Key Plot Points ===\n');

    const total = await prisma.contentBlock.count({ where: { documentId: loveDoc.id } });
    console.log('Total blocks:', total, '\n');

    // Get blocks in chunks
    for (let skip = 35; skip < Math.min(total, 200); skip += 40) {
      const blocks = await prisma.contentBlock.findMany({
        where: { documentId: loveDoc.id },
        orderBy: { blockIndex: 'asc' },
        skip: skip,
        take: 40
      });

      for (const b of blocks) {
        // Only show substantive content
        if (b.rawText.length > 100 && !b.rawText.startsWith('You said') && !b.rawText.startsWith('ChatGPT')) {
          console.log('[Block', b.blockIndex, ']');
          console.log(b.rawText.substring(0, 700));
          console.log('\n---\n');
        }
      }
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
