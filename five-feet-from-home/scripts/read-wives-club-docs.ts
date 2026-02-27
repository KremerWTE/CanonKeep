import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const docNames = [
    'Wives Club Characters.docx',
    'Wives Club Characters Development.docx',
    'Wives Club structure.docx',
    'wives club anchor names.docx'
  ];

  for (const fileName of docNames) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`DOCUMENT: ${fileName}`);
    console.log('='.repeat(80));

    const doc = await prisma.document.findFirst({
      where: { fileName }
    });

    if (!doc) {
      console.log('Document not found');
      continue;
    }

    const blocks = await prisma.contentBlock.findMany({
      where: { documentId: doc.id },
      orderBy: { blockIndex: 'asc' }
    });

    for (const block of blocks) {
      if (block.sectionHeading) {
        console.log(`\n--- ${block.sectionHeading} ---`);
      }
      console.log(block.rawText);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
