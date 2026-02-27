import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get the Characters.docx document
  const doc = await prisma.document.findFirst({
    where: { fileName: { contains: 'Characters' } }
  });

  if (!doc) {
    console.log('Characters.docx not found');
    return;
  }

  console.log(`Found document: ${doc.fileName} (ID: ${doc.id})\n`);

  // Get all content blocks from this document
  const blocks = await prisma.contentBlock.findMany({
    where: { documentId: doc.id },
    orderBy: { blockIndex: 'asc' }
  });

  console.log(`Total blocks: ${blocks.length}\n`);

  // Look for character definition patterns
  const characterPatterns = [
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?:\s*[-–—]\s*|\s*:)/,  // Name - or Name:
    /^([A-Z][a-z]+\s+"[^"]+"\s+[A-Z][a-z]+)/,  // Name "Nickname" Surname
    /^([A-Z][a-z]+\s+\([^)]+\)\s+[A-Z][a-z]+)/,  // Name (aka) Surname
  ];

  // Key terms to identify character blocks
  const charTerms = ['Spouse:', 'Occupation:', 'Age:', 'Appearance:', 'Background:', 'Personality:', 'Role:', 'Archetype:'];

  let characterBlocks: any[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const text = block.rawText.trim();

    // Check if this looks like a character definition block
    const hasCharTerms = charTerms.some(term => text.includes(term));
    const hasNamePattern = characterPatterns.some(p => p.test(text));

    if (hasCharTerms || (hasNamePattern && text.length < 100)) {
      characterBlocks.push({
        index: i,
        heading: block.sectionHeading,
        text: text.substring(0, 500)
      });
    }
  }

  console.log(`Found ${characterBlocks.length} potential character blocks:\n`);

  // Show first 30
  characterBlocks.slice(0, 30).forEach(b => {
    console.log(`[${b.index}] ${b.heading || 'No heading'}`);
    console.log(b.text);
    console.log('---\n');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
