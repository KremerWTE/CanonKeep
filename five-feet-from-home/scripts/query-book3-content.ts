import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get content blocks that mention Book 3 related content
  const blocks = await prisma.contentBlock.findMany({
    include: { document: true },
    where: {
      OR: [
        { rawText: { contains: 'Book 3' } },
        { rawText: { contains: 'book 3' } },
        { rawText: { contains: 'Expansion' } },
        { rawText: { contains: 'Hawk' } },
        { rawText: { contains: 'POH' } },
        { rawText: { contains: 'Palace of Honor' } },
        { rawText: { contains: 'Addie and Hawk' } },
        { rawText: { contains: 'junior strategist' } },
        { rawText: { contains: 'senior' } },
        { rawText: { contains: 'COO' } },
      ]
    }
  });

  console.log(`Found ${blocks.length} content blocks related to Book 3\n`);

  // Group by document
  const byDoc = new Map<string, string[]>();
  for (const block of blocks) {
    const docName = block.document?.fileName || 'Unknown';
    if (!byDoc.has(docName)) byDoc.set(docName, []);
    byDoc.get(docName)!.push(block.rawText.substring(0, 600));
  }

  // Focus on key documents
  const keyDocs = ['book 1.docx', 'Jasper Barrett series chat.docx', 'Addie and Hawk', 'Harper COO', 'BSS'];

  for (const [doc, texts] of byDoc) {
    // Only show docs that might have Book 3 content
    if (keyDocs.some(k => doc.toLowerCase().includes(k.toLowerCase())) ||
        texts.some(t => t.toLowerCase().includes('book 3') || t.toLowerCase().includes('expansion'))) {
      console.log(`\n${'='.repeat(70)}`);
      console.log(`DOCUMENT: ${doc}`);
      console.log('='.repeat(70));
      texts.slice(0, 5).forEach((t, i) => {
        console.log(`\n--- Block ${i + 1} ---`);
        console.log(t);
      });
      if (texts.length > 5) console.log(`\n... and ${texts.length - 5} more blocks`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
