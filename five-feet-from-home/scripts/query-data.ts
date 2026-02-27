/**
 * Query script to view extracted data
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== CHARACTERS ===');
  const characters = await prisma.character.findMany({
    orderBy: { name: 'asc' },
    select: {
      name: true,
      archetype: true,
      age: true,
      background: true,
    },
  });

  for (const char of characters) {
    console.log(`\n${char.name}`);
    if (char.archetype) console.log(`  Archetype: ${char.archetype}`);
    if (char.age) console.log(`  Age: ${char.age}`);
    if (char.background) console.log(`  Background: ${char.background.substring(0, 150)}...`);
  }

  console.log('\n\n=== DOCUMENTS ===');
  const docs = await prisma.document.findMany({
    orderBy: { fileName: 'asc' },
    select: {
      fileName: true,
      _count: { select: { blocks: true } },
    },
  });

  for (const doc of docs) {
    console.log(`${doc.fileName}: ${doc._count.blocks} blocks`);
  }

  console.log('\n\n=== SAMPLE CONTENT BLOCKS (from Chat 1.docx) ===');
  const chatDoc = await prisma.document.findFirst({
    where: { fileName: 'Chat 1.docx' },
  });

  if (chatDoc) {
    const blocks = await prisma.contentBlock.findMany({
      where: { documentId: chatDoc.id },
      orderBy: { blockIndex: 'asc' },
      take: 30,
    });

    for (const block of blocks) {
      console.log(`\n[${block.blockIndex}] ${block.styleType}${block.headingLevel ? ` (H${block.headingLevel})` : ''}`);
      console.log(`  Section: ${block.sectionHeading || 'none'}`);
      console.log(`  Text: ${block.rawText.substring(0, 200)}${block.rawText.length > 200 ? '...' : ''}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
