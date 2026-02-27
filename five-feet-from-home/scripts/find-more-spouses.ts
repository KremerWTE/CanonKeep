import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Search for spouse-related blocks
  const spouseBlocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'Married to' } },
        { rawText: { contains: 'married to' } },
        { rawText: { contains: 'Spouse:' } },
        { rawText: { contains: 'Wife of' } },
        { rawText: { contains: 'wife of' } },
        { rawText: { contains: 'Husband:' } },
      ]
    },
    select: {
      rawText: true,
      document: { select: { fileName: true } }
    },
    orderBy: { blockIndex: 'asc' }
  });

  console.log(`Found ${spouseBlocks.length} blocks with spouse info:\n`);

  // Show unique blocks
  const seen = new Set<string>();
  spouseBlocks.forEach(b => {
    const snippet = b.rawText.substring(0, 300);
    if (!seen.has(snippet)) {
      seen.add(snippet);
      console.log(`[${b.document.fileName}]`);
      console.log(b.rawText.substring(0, 500));
      console.log('---\n');
    }
  });

  await prisma.$disconnect();
}

main().catch(console.error);
