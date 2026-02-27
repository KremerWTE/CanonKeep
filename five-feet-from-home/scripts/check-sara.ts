import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("=== SARA IN DATABASE ===\n");

  const saras = await prisma.character.findMany({
    where: {
      OR: [
        { firstName: 'Sara' },
        { name: { contains: 'Sara' } }
      ]
    }
  });

  saras.forEach(s => {
    console.log(`Name: ${s.name}`);
    console.log(`First: ${s.firstName}, Last: ${s.lastName}`);
    console.log(`Archetype: ${s.archetype}`);
    console.log(`Background: ${s.background?.substring(0, 200)}...`);
    console.log('---');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
