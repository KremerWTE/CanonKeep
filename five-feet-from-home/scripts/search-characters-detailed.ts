import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function searchCharacter(name: string) {
  const blocks = await prisma.contentBlock.findMany({
    where: {
      rawText: { contains: name },
      document: { fileName: { contains: 'Characters' } }
    },
    select: {
      rawText: true,
      sectionHeading: true,
      blockIndex: true
    },
    orderBy: { blockIndex: 'asc' },
    take: 5
  });
  return blocks;
}

async function main() {
  // Characters to search for in Characters.docx
  const toSearch = [
    'Evelyn Maren',
    'Evie Maren',
    'Claire Donahue',
    'Jazz',
    'Maggie',
    'Lottie',
    'Charlotte Hale',
    'Sara Hale',
    'Grace',
    'Isabella Santore',
    'Bella Romano',
  ];

  for (const name of toSearch) {
    const blocks = await searchCharacter(name);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`=== ${name} (${blocks.length} blocks) ===`);
    console.log('='.repeat(60));

    if (blocks.length > 0) {
      // Show first 2 relevant blocks
      blocks.slice(0, 2).forEach(b => {
        console.log(`[Block ${b.blockIndex}]`);
        console.log(b.rawText.substring(0, 600));
        console.log('---');
      });
    } else {
      console.log('No blocks found');
    }
  }

  // Also get count of all characters currently in DB
  const charCount = await prisma.character.count();
  console.log(`\n\nTotal characters in database: ${charCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
