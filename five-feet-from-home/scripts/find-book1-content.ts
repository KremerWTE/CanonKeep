/**
 * Search for Book 1 content - Jasper going to London to the big party
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find Chat 1.docx and search for Jasper/London content
  const chatDoc = await prisma.document.findFirst({
    where: { fileName: 'Chat 1.docx' },
  });

  if (!chatDoc) {
    console.log('Chat 1.docx not found');
    return;
  }

  console.log('=== SEARCHING FOR JASPER LONDON CONTENT ===\n');

  // Search for "London" mentions
  const londonBlocks = await prisma.contentBlock.findMany({
    where: {
      documentId: chatDoc.id,
      rawText: { contains: 'London' },
    },
    orderBy: { blockIndex: 'asc' },
    take: 20,
  });

  console.log(`Found ${londonBlocks.length} blocks mentioning "London":\n`);
  for (const block of londonBlocks.slice(0, 10)) {
    console.log(`[${block.blockIndex}] ${block.rawText.substring(0, 200)}...\n`);
  }

  // Search for "Jasper" early mentions
  console.log('\n=== FIRST JASPER MENTIONS ===\n');
  const jasperBlocks = await prisma.contentBlock.findMany({
    where: {
      documentId: chatDoc.id,
      rawText: { contains: 'Jasper' },
    },
    orderBy: { blockIndex: 'asc' },
    take: 10,
  });

  for (const block of jasperBlocks.slice(0, 5)) {
    console.log(`[${block.blockIndex}] ${block.rawText.substring(0, 200)}...\n`);
  }

  // Search for "party" mentions
  console.log('\n=== PARTY MENTIONS (potential end of Book 1) ===\n');
  const partyBlocks = await prisma.contentBlock.findMany({
    where: {
      documentId: chatDoc.id,
      OR: [
        { rawText: { contains: 'big party' } },
        { rawText: { contains: 'house party' } },
        { rawText: { contains: "Jasper's house" } },
        { rawText: { contains: 'party at' } },
      ],
    },
    orderBy: { blockIndex: 'asc' },
    take: 20,
  });

  console.log(`Found ${partyBlocks.length} blocks mentioning party:\n`);
  for (const block of partyBlocks.slice(0, 10)) {
    console.log(`[${block.blockIndex}] ${block.rawText.substring(0, 200)}...\n`);
  }

  // Get content around block 500-1000 where story might start
  console.log('\n=== CONTENT AROUND BLOCK 500-600 (where story may begin) ===\n');
  const earlyBlocks = await prisma.contentBlock.findMany({
    where: {
      documentId: chatDoc.id,
      blockIndex: { gte: 500, lte: 600 },
      styleType: 'paragraph',
    },
    orderBy: { blockIndex: 'asc' },
    take: 20,
  });

  for (const block of earlyBlocks) {
    if (block.rawText.length > 50) {
      console.log(`[${block.blockIndex}] ${block.rawText.substring(0, 300)}...\n`);
    }
  }

  // Check book 1.docx structure
  console.log('\n=== BOOK 1.DOCX STRUCTURE ===\n');
  const book1Doc = await prisma.document.findFirst({
    where: { fileName: 'book 1.docx' },
  });

  if (book1Doc) {
    const book1Blocks = await prisma.contentBlock.findMany({
      where: { documentId: book1Doc.id },
      orderBy: { blockIndex: 'asc' },
      take: 50,
    });

    for (const block of book1Blocks) {
      if (block.rawText.length > 30) {
        console.log(`[${block.blockIndex}] ${block.styleType}${block.headingLevel ? ` H${block.headingLevel}` : ''}: ${block.rawText.substring(0, 200)}...\n`);
      }
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
