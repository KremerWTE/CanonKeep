import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find all characters with Hawk in name
  const hawkChars = await prisma.character.findMany({
    where: {
      OR: [
        { name: { contains: 'Hawk' } },
        { name: { contains: 'hawk' } }
      ]
    },
    select: { id: true, name: true, bssRole: true }
  });

  console.log('Characters with "Hawk" in name:');
  console.log(JSON.stringify(hawkChars, null, 2));

  // Also find characters that are just single names (callsigns)
  const singleNames = await prisma.character.findMany({
    where: {
      projectId: (await prisma.project.findFirst())?.id,
      name: {
        notIn: ['Battle Captain'] // exclude known multi-word non-nickname names
      }
    },
    select: { id: true, name: true }
  });

  const callsigns = singleNames.filter(c => !c.name.includes(' ') && !c.name.includes('"'));
  console.log('\nPotential callsigns (single word names):');
  callsigns.forEach(c => console.log(`  - ${c.name}`));

  await prisma.$disconnect();
}

main().catch(console.error);
