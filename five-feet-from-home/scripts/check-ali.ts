import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ali = await prisma.character.findFirst({
    where: {
      OR: [
        { firstName: 'Alicia' },
        { nickname: 'Ali' }
      ]
    }
  });

  if (ali) {
    console.log('=== ALICIA "ALI" GRANT ===\n');
    console.log('Name:', ali.name);
    console.log('Nickname:', ali.nickname);
    console.log('Archetype:', ali.archetype);
    console.log('Hub Location:', ali.hubLocation);
    console.log('\nBackground:', ali.background);
    console.log('\nPersonality:', ali.personality);
    console.log('\nRelationships:', ali.relationships);
  } else {
    console.log('Alicia Ali Grant not found in database');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
