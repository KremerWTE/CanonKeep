import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const docs = await prisma.document.findMany({
    take: 5,
    select: { id: true, fileName: true }
  });
  console.log('Sample docs:', docs);

  const blocks = await prisma.contentBlock.findMany({
    take: 3,
    select: { id: true, sectionHeading: true, rawText: true, documentId: true }
  });

  console.log('\nSample content blocks:');
  blocks.forEach(b => {
    console.log({
      id: b.id,
      section: b.sectionHeading,
      text: b.rawText.substring(0, 150) + '...'
    });
  });

  const totalDocs = await prisma.document.count();
  const totalBlocks = await prisma.contentBlock.count();
  console.log(`\nTotal: ${totalDocs} documents, ${totalBlocks} content blocks`);
}

main().finally(() => prisma.$disconnect());
