import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const friendNames = [
    { first: 'Ryan', last: 'McKenna' },
    { first: 'Nate', last: 'Ellis' },
    { first: 'Alicia', last: 'Grant' },
    { first: 'Evan', last: 'Ross' },
  ];

  console.log("=== CHRIS'S NON-BSS FRIENDS ===\n");

  for (const name of friendNames) {
    const char = await prisma.character.findFirst({
      where: { firstName: name.first, lastName: name.last }
    });

    if (char) {
      console.log(`✓ ${char.name}`);
      console.log(`  Archetype: ${char.archetype}`);
      console.log(`  Location: ${char.hubLocation}`);
      console.log(`  Background: ${char.background?.substring(0, 150)}...`);
      console.log('');
    } else {
      console.log(`✗ ${name.first} ${name.last} - NOT FOUND\n`);
    }
  }

  // Also check for any Evan Ross specifically
  const evanRoss = await prisma.character.findFirst({
    where: { name: { contains: 'Evan Ross' } }
  });

  if (evanRoss) {
    console.log('\n=== EVAN ROSS (by name search) ===');
    console.log('Found:', evanRoss.name);
    console.log('Background:', evanRoss.background);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
