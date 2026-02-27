import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function searchInCharactersDoc(searchTerm: string) {
  const blocks = await prisma.contentBlock.findMany({
    where: {
      rawText: { contains: searchTerm },
      document: { fileName: { contains: 'Characters' } }
    },
    select: { rawText: true, blockIndex: true },
    orderBy: { blockIndex: 'asc' },
    take: 3
  });
  return blocks;
}

async function main() {
  // Search for more characters with detailed info
  const searches = [
    'Addie', 'Addison', 'Elena', 'Kendra', 'Harper', 'Bella',
    'Selene', 'Grace Barrett', 'Jasper', 'Hawk', 'Cole Hawkins',
    'Chris Donnelly', 'Christopher', 'Mark Whitaker', 'Dominic',
    'Connor St. James', 'Riley St. James',
  ];

  for (const term of searches) {
    const blocks = await searchInCharactersDoc(term);
    if (blocks.length > 0) {
      console.log(`\n${'='.repeat(50)}`);
      console.log(`=== ${term} (${blocks.length} blocks) ===`);
      console.log('='.repeat(50));
      blocks.slice(0, 2).forEach(b => {
        console.log(`[${b.blockIndex}] ${b.rawText.substring(0, 400)}`);
        console.log('---');
      });
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
