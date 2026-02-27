import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Search for how Chris and Kendra meet
  const blocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'Chris met Kendra' } },
        { rawText: { contains: 'Kendra met Chris' } },
        { rawText: { contains: 'how they met' } },
        { rawText: { contains: 'Chris and Kendra' } },
        { rawText: { contains: 'Kendra and Chris' } },
        { rawText: { contains: 'first date' } },
        { rawText: { contains: 'Kendra Texas' } },
        { rawText: { contains: 'Kendra Oklahoma' } },
        { rawText: { contains: 'Kendra scholarship' } },
      ]
    },
    include: { document: { select: { fileName: true } } },
    take: 40
  });

  console.log('Found', blocks.length, 'blocks\n');

  for (const b of blocks) {
    console.log('[' + b.document.fileName + ' - Block ' + b.blockIndex + ']');
    console.log(b.rawText.substring(0, 600));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
