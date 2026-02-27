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

  // Search for story/plot content in Chat 1
  const storyBlocks = await prisma.contentBlock.findMany({
    where: {
      documentId: doc.id,
      OR: [
        { rawText: { contains: 'Chapter' } },
        { rawText: { contains: 'Book 3' } },
        { rawText: { contains: 'Book Three' } },
        { rawText: { contains: 'storyline' } },
        { rawText: { contains: 'Addie and Hawk' } },
        { rawText: { contains: 'POH' } },
        { rawText: { contains: 'Palace of Honor' } },
        { rawText: { contains: 'wedding' } },
        { rawText: { contains: 'engagement' } },
      ]
    },
    orderBy: { blockIndex: 'asc' },
    take: 50
  });

  console.log('Found', storyBlocks.length, 'story-related blocks in Chat 1\n');

  for (const b of storyBlocks) {
    console.log('[Block', b.blockIndex, ']');
    console.log(b.rawText.substring(0, 600));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
