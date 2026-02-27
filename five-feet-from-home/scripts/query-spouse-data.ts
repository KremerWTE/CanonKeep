import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find characters with spouse/married info
  const chars = await prisma.character.findMany({
    where: {
      OR: [
        { relationships: { contains: 'Married' } },
        { relationships: { contains: 'married' } },
        { relationships: { contains: 'Spouse' } },
        { relationships: { contains: 'spouse' } },
        { relationships: { contains: 'wife' } },
        { relationships: { contains: 'husband' } },
      ]
    },
    select: {
      name: true,
      relationships: true,
      careerHistory: true,
      affiliationRole: true,
      background: true,
    },
    take: 20
  });

  console.log(`Found ${chars.length} characters with spouse info:\n`);
  for (const c of chars) {
    console.log(`=== ${c.name} ===`);
    if (c.relationships) console.log(`  Relationships: ${c.relationships.substring(0, 200)}`);
    if (c.careerHistory) console.log(`  Career: ${c.careerHistory.substring(0, 150)}`);
    if (c.affiliationRole) console.log(`  Role: ${c.affiliationRole.substring(0, 150)}`);
    console.log('');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
