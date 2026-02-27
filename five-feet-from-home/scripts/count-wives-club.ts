import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Count characters with Wives Club connections
  const wivesClubCount = await prisma.character.count({
    where: {
      OR: [
        { wivesClubRole: { not: null } },
        { maisonAureliaRole: { not: null } },
        { clubsAssociations: { contains: 'Wives' } },
        { affiliationRole: { contains: 'Wives' } },
        { affiliationRole: { contains: 'wife' } },
        { relationships: { contains: 'Married' } },
        { relationships: { contains: 'married' } },
      ]
    }
  });

  console.log(`Characters with Wives Club/spouse connections: ${wivesClubCount}`);

  // Get some sample names
  const samples = await prisma.character.findMany({
    where: {
      OR: [
        { wivesClubRole: { not: null } },
        { maisonAureliaRole: { not: null } },
        { relationships: { contains: 'Married' } },
      ]
    },
    select: { name: true, wivesClubRole: true, relationships: true },
    take: 20
  });

  console.log('\nSample members:');
  samples.forEach(s => {
    console.log(`  - ${s.name}: ${s.wivesClubRole || 'No role'}`);
    if (s.relationships) {
      const spouseMatch = s.relationships.match(/(?:Married to|Spouse:|Wife of|Husband of)\s*([^,.;]+)/i);
      if (spouseMatch) console.log(`    Spouse: ${spouseMatch[1].trim()}`);
    }
  });

  await prisma.$disconnect();
}

main().catch(console.error);
