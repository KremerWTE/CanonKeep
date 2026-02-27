import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get Love Option Book 4
  const loveDoc = await prisma.document.findFirst({
    where: { fileName: { contains: 'Love Option Book 4' } }
  });

  if (loveDoc) {
    console.log('=== LOVE OPTION BOOK 4 ===\n');
    const blocks = await prisma.contentBlock.findMany({
      where: { documentId: loveDoc.id },
      orderBy: { blockIndex: 'asc' },
      take: 100
    });

    for (const b of blocks) {
      console.log('[Block', b.blockIndex, ']');
      console.log(b.rawText.substring(0, 500));
      console.log('\n---\n');
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
