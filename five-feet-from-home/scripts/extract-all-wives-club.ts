import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCharacterInfo(searchTerms: string[]) {
  const results: any[] = [];
  for (const term of searchTerms) {
    const blocks = await prisma.contentBlock.findMany({
      where: { rawText: { contains: term } },
      select: { rawText: true, document: { select: { fileName: true } } },
      orderBy: { blockIndex: 'asc' }
    });
    blocks.forEach(b => {
      if (results.findIndex(r => r.rawText === b.rawText) === -1) {
        results.push(b);
      }
    });
  }
  return results;
}

async function main() {
  const charactersToFind = [
    { search: ['Harper Steele'], name: 'Harper Steele' },
    { search: ['Nat Serrano', 'Natalie Serrano'], name: 'Natalie Serrano' },
    { search: ['Mia Laurent'], name: 'Mia Laurent' },
    { search: ['Lo Maren', 'Lauren Maren'], name: 'Lauren Lo Maren' },
    { search: ['Bonnie McCrae', 'Bonnie Mc'], name: 'Bonnie McCrae' },
    { search: ['Remy Everard'], name: 'Remy Everard' },
    { search: ['Jonas Vinter'], name: 'Jonas Vinter' },
    { search: ['Anya Novak'], name: 'Anya Novak' },
    { search: ['Kensi', 'Kendall Rourke'], name: 'Kendall Kensi Rourke' },
    { search: ['Deeks', 'Mason Carrow'], name: 'Mason Deeks Carrow' },
    { search: ['Shore', 'Shane Kavanagh'], name: 'Shane Shore Kavanagh' },
    { search: ['Victoria Aldridge', 'Vee Aldridge'], name: 'Victoria Vee Aldridge' },
    { search: ['Selene Marquez'], name: 'Selene Marquez' },
    { search: ['Elise Romano'], name: 'Elise Romano' },
    { search: ['Brianna Knox'], name: 'Brianna Knox' },
    { search: ['Evelyn Hartmann'], name: 'Evelyn Hartmann' },
    { search: ['Bailey Brewer'], name: 'Bailey Brewer' },
    { search: ['Jenna Carter'], name: 'Jenna Carter' },
    { search: ['Lila Chamberlain'], name: 'Lila Chamberlain' },
    { search: ['Juliana Montes', 'Jules Montes'], name: 'Juliana Montes' },
    { search: ['Riley Bishop'], name: 'Riley Bishop' },
    { search: ['Anik Tremblay'], name: 'Anik Tremblay' },
    { search: ['Molly Gallagher'], name: 'Molly Gallagher' },
    { search: ['Camila Reyes', 'Camila Knox'], name: 'Camila Reyes' },
  ];

  for (const char of charactersToFind) {
    const blocks = await getCharacterInfo(char.search);
    console.log(`\n${'='.repeat(70)}`);
    console.log(`=== ${char.name} (${blocks.length} blocks) ===`);
    console.log('='.repeat(70));
    // Show first 5 relevant blocks
    blocks.slice(0, 5).forEach(b => {
      console.log(`[${b.document.fileName}]`);
      console.log(b.rawText.substring(0, 500));
      console.log('---');
    });
  }

  await prisma.$disconnect();
}

main().catch(console.error);
