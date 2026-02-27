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

  const total = await prisma.contentBlock.count({ where: { documentId: doc.id } });
  console.log('Chat 1.docx has', total, 'blocks total');
  console.log('Last third starts at block', Math.floor(total * 2/3));

  // Get last third
  const blocks = await prisma.contentBlock.findMany({
    where: { documentId: doc.id },
    orderBy: { blockIndex: 'asc' },
    skip: Math.floor(total * 2/3),
    take: 80
  });

  console.log('\n=== LAST THIRD OF CHAT 1 ===\n');
  for (const b of blocks) {
    console.log('[Block', b.blockIndex, ']');
    console.log(b.rawText.substring(0, 500));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
