import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const chatDoc = await prisma.document.findFirst({
    where: { fileName: { equals: 'Chat 1.docx' } }
  });

  if (chatDoc) {
    console.log('=== CHAT 1 - Major Plot Points ===\n');

    // Search for key story elements
    const keywords = ['Hawk', 'Bella', 'hospital', 'wedding', 'proposal', 'baby', 'pregnant',
                      'Ridge', 'Miami', 'global', 'expansion', 'fixer', 'book 4', 'book 5',
                      'breakdown', 'collapse', 'crisis'];

    for (const keyword of keywords) {
      const blocks = await prisma.contentBlock.findMany({
        where: {
          documentId: chatDoc.id,
          rawText: { contains: keyword }
        },
        orderBy: { blockIndex: 'asc' },
        take: 5
      });

      if (blocks.length > 0) {
        console.log(`\n--- ${keyword.toUpperCase()} ---`);
        for (const b of blocks.slice(0, 3)) {
          console.log('[Block', b.blockIndex, ']', b.rawText.substring(0, 400));
          console.log('');
        }
      }
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
