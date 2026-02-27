import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all content blocks that contain structured character info
  // Look for patterns like "Age:", "Occupation:", "Background:", etc.
  const blocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'Age:' } },
        { rawText: { contains: 'Occupation:' } },
        { rawText: { contains: 'Background:' } },
        { rawText: { contains: 'Personality:' } },
        { rawText: { contains: 'Spouse:' } },
        { rawText: { contains: 'Full Name:' } },
        { rawText: { contains: 'Archetype:' } },
      ]
    },
    select: {
      rawText: true,
      blockIndex: true,
      document: { select: { fileName: true } }
    },
    orderBy: { blockIndex: 'asc' }
  });

  console.log(`Found ${blocks.length} structured character blocks:\n`);

  // Group by document
  const byDoc: Record<string, typeof blocks> = {};
  blocks.forEach(b => {
    const doc = b.document.fileName;
    if (!byDoc[doc]) byDoc[doc] = [];
    byDoc[doc].push(b);
  });

  for (const [doc, docBlocks] of Object.entries(byDoc)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`=== ${doc} (${docBlocks.length} blocks) ===`);
    console.log('='.repeat(60));

    // Show first 15 blocks from this doc
    docBlocks.slice(0, 15).forEach(b => {
      console.log(`[${b.blockIndex}] ${b.rawText.substring(0, 400)}`);
      console.log('---');
    });
  }

  await prisma.$disconnect();
}

main().catch(console.error);
