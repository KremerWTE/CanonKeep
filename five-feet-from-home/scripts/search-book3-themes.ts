import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Searching for Book 3 Themes ===\n');

  // Search for Harper COO transition
  const harperCOO = await prisma.contentBlock.findMany({
    where: { rawText: { contains: 'Harper' } },
    include: { document: true },
    take: 50
  });

  const cooBocks = harperCOO.filter(b =>
    b.rawText.toLowerCase().includes('coo') ||
    b.rawText.toLowerCase().includes('transition') ||
    b.rawText.toLowerCase().includes('miami')
  );

  console.log('=== HARPER COO/TRANSITION ===');
  cooBocks.slice(0, 5).forEach(b => {
    console.log('\n---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 500));
  });

  // Search for Addie/Hawk relationship
  const addieHawk = await prisma.contentBlock.findMany({
    where: {
      AND: [
        { rawText: { contains: 'Hawk' } },
        { rawText: { contains: 'Addie' } }
      ]
    },
    include: { document: true },
    take: 30
  });

  const relationshipBlocks = addieHawk.filter(b =>
    b.rawText.toLowerCase().includes('wedding') ||
    b.rawText.toLowerCase().includes('engagement') ||
    b.rawText.toLowerCase().includes('marry') ||
    b.rawText.toLowerCase().includes('dating') ||
    b.rawText.toLowerCase().includes('relationship')
  );

  console.log('\n\n=== ADDIE & HAWK RELATIONSHIP ===');
  relationshipBlocks.slice(0, 5).forEach(b => {
    console.log('\n---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 500));
  });

  // Search for Kendra's rise
  const kendraRise = await prisma.contentBlock.findMany({
    where: { rawText: { contains: 'Kendra' } },
    include: { document: true },
    take: 50
  });

  const kendraBSS = kendraRise.filter(b =>
    b.rawText.toLowerCase().includes('analyst') ||
    b.rawText.toLowerCase().includes('fixer') ||
    b.rawText.toLowerCase().includes('bss') ||
    b.rawText.toLowerCase().includes('chris')
  );

  console.log('\n\n=== KENDRA BSS RISE ===');
  kendraBSS.slice(0, 5).forEach(b => {
    console.log('\n---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 500));
  });

  // Search for BSS expansion
  const expansion = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'expansion' } },
        { rawText: { contains: 'regional' } },
        { rawText: { contains: 'Miami office' } },
        { rawText: { contains: 'London' } }
      ]
    },
    include: { document: true },
    take: 30
  });

  const bssExpansion = expansion.filter(b =>
    b.rawText.toLowerCase().includes('bss') ||
    b.rawText.toLowerCase().includes('jasper') ||
    b.rawText.toLowerCase().includes('harper')
  );

  console.log('\n\n=== BSS EXPANSION ===');
  bssExpansion.slice(0, 5).forEach(b => {
    console.log('\n---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 500));
  });

  await prisma.$disconnect();
}

main().catch(console.error);
