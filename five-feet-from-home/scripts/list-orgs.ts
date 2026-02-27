import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const orgs = await prisma.organization.findMany();

  console.log('=== ORGANIZATIONS ===\n');
  console.log('Total:', orgs.length);

  for (const org of orgs) {
    console.log(`\nNAME: ${org.name}`);
    console.log(`  Type: ${org.type}`);
    console.log(`  Industry: ${org.industry}`);
  }

  await prisma.$disconnect();
}

main();
