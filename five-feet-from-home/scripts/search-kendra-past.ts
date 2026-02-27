import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Search for Kendra's past relationships
  const blocks = await prisma.contentBlock.findMany({
    where: {
      AND: [
        { rawText: { contains: 'Kendra' } },
        {
          OR: [
            { rawText: { contains: 'dated' } },
            { rawText: { contains: 'relationship' } },
            { rawText: { contains: 'girlfriend' } },
            { rawText: { contains: 'boyfriend' } },
            { rawText: { contains: 'college' } },
            { rawText: { contains: 'UCLA' } },
            { rawText: { contains: 'past' } },
          ]
        }
      ]
    },
    include: { document: { select: { fileName: true } } },
    take: 30
  });

  console.log('Found', blocks.length, 'blocks about Kendra\'s past\n');

  for (const b of blocks) {
    console.log('[' + b.document.fileName + ']');
    console.log(b.rawText.substring(0, 600));
    console.log('\n---\n');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
