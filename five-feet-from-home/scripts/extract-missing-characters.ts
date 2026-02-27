import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCharacterBlocks(searchTerms: string[]) {
  const results: any[] = [];
  for (const term of searchTerms) {
    const blocks = await prisma.contentBlock.findMany({
      where: { rawText: { contains: term } },
      select: { rawText: true, sectionHeading: true, document: { select: { fileName: true } } },
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
  const characters = [
    { search: ['Cassie Drake', 'Cassandra Drake'], name: 'CASSIE DRAKE' },
    { search: ['Brooke Tanner'], name: 'BROOKE TANNER' },
    { search: ['Caroline Reilly-Keane', 'Caroline Reilly'], name: 'CAROLINE REILLY-KEANE' },
    { search: ['Taylor Hale'], name: 'TAYLOR HALE' },
    { search: ['Marcus Hale'], name: 'MARCUS HALE' },
    { search: ['Jordan Vega'], name: 'JORDAN VEGA' },
    { search: ['Alex Vega'], name: 'ALEX VEGA' },
    { search: ['Elise Dubois'], name: 'ELISE DUBOIS' },
    { search: ['Vincent Dubois'], name: 'VINCENT DUBOIS' },
    { search: ['Savvy Knox', 'Savannah Knox'], name: 'SAVVY KNOX' },
    { search: ['Cassie Varela', 'Cassandra Varela'], name: 'CASSIE VARELA' },
    { search: ['Lauren Steele'], name: 'LAUREN STEELE' },
    { search: ['Faith Parker'], name: 'FAITH PARKER' },
    { search: ['Dani Cross', 'Danielle Cross'], name: 'DANI CROSS' },
    { search: ['Marcus Kellan', 'Cav Kellan'], name: 'MARCUS CAV KELLAN' },
    { search: ['Callum Reeves', 'Iron Reeves'], name: 'CALLUM IRON REEVES' },
    { search: ['Gareth Morgan', 'Grit Morgan'], name: 'GARETH GRIT MORGAN' },
    { search: ['Theo Pojan'], name: 'THEO POJAN' },
  ];

  for (const char of characters) {
    const blocks = await getCharacterBlocks(char.search);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`=== ${char.name} (${blocks.length} blocks) ===`);
    console.log('='.repeat(60));
    blocks.forEach(b => {
      console.log(`[${b.document.fileName}]`);
      console.log(b.rawText);
      console.log('---');
    });
  }

  await prisma.$disconnect();
}

main().catch(console.error);
