import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const galas = await prisma.gala.findMany();
  console.log(`Current Galas: ${galas.length}\n`);

  for (const gala of galas) {
    console.log(`--- ${gala.name} ---`);
    console.log(`  Venue: ${gala.venue || 'Not set'}`);
    console.log(`  Location: ${gala.location || 'Not set'}`);
    console.log(`  Purpose: ${gala.purpose || 'Not set'}`);
    console.log(`  Clothing: ${gala.clothingDescriptions ? 'Has data' : 'MISSING'}`);
    console.log(`  Before: ${gala.beforeActivities ? 'Has data' : 'MISSING'}`);
    console.log(`  After: ${gala.afterActivities ? 'Has data' : 'MISSING'}`);
    console.log('');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
