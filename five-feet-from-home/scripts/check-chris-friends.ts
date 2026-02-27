import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const friends = ['Alicia', 'Evan', 'Ryan', 'Nate'];

  for (const name of friends) {
    const char = await prisma.character.findFirst({
      where: { firstName: name }
    });

    if (char) {
      console.log(`\n=== ${char.name} ===`);
      console.log('Archetype:', char.archetype);
      console.log('Hub:', char.hubLocation);
      console.log('Background:', char.background?.substring(0, 300) + '...');
    } else {
      console.log(`\n${name} not found`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
