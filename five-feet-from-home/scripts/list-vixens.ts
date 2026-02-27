import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const vixens = await prisma.character.findMany({
    where: {
      OR: [
        { clubsAssociations: { contains: 'Sirens' } },
        { clubsAssociations: { contains: 'Vixens' } },
        { archetype: { contains: 'Siren' } },
      ],
    },
    select: {
      name: true,
      nickname: true,
      archetype: true,
      modeledAfter: true,
      background: true,
    },
    orderBy: { name: 'asc' },
  });

  console.log('\n=== VIXEN/SIREN CHARACTERS ===\n');
  console.log(`Total: ${vixens.length} characters\n`);

  for (const v of vixens) {
    console.log(`NAME: ${v.name}`);
    if (v.nickname) console.log(`  Stage Name: ${v.nickname}`);
    if (v.archetype) console.log(`  Archetype: ${v.archetype}`);
    if (v.modeledAfter) console.log(`  MODELED AFTER: ${v.modeledAfter}`);
    console.log('');
  }

  await prisma.$disconnect();
}

main();
