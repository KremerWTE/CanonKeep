import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("=== GALAS IN DATABASE ===\n");

  const galas = await prisma.gala.findMany({
    orderBy: { name: 'asc' }
  });

  console.log(`Found ${galas.length} galas:\n`);
  galas.forEach(g => {
    console.log(`- ${g.name}`);
    console.log(`  Org: ${g.organization}`);
    console.log(`  Location: ${g.location}`);
    console.log(`  Significance: ${g.significance?.substring(0, 100)}...`);
    console.log('');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
