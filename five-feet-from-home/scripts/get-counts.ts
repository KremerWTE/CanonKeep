import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [charCount, storylineCount, seriesCount, orgCount] = await Promise.all([
    prisma.character.count(),
    prisma.storyline.count(),
    prisma.bookSeries.count(),
    prisma.organization.count(),
  ]);

  console.log('\n=== FINAL DATABASE SUMMARY ===\n');
  console.log('Characters:', charCount);
  console.log('Storylines:', storylineCount);
  console.log('Book Series:', seriesCount);
  console.log('Organizations:', orgCount);

  await prisma.$disconnect();
}

main();
