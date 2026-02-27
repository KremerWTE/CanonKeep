import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// These are the galas I fabricated that don't exist in source docs
const fabricatedGalaNames = [
  "EOHSJ Annual Investiture",
  "Charlotte Opera Opening Night",
  "Annual Wives Club Christmas Gala",
  "Spring Garden Gala",
  "Palace of Honor Annual Charity Ball",
  "Vatican-linked Fundraisers",
  "Easter Vigil Mass",
  "Grace's First Communion",
  "Grace's Confirmation",
  "Bella & Matt Wedding",
  "Palace of Honor Galas"
];

async function main() {
  console.log('Removing fabricated galas...\n');

  for (const name of fabricatedGalaNames) {
    const gala = await prisma.gala.findFirst({
      where: { name }
    });

    if (gala) {
      await prisma.gala.delete({
        where: { id: gala.id }
      });
      console.log(`Deleted: ${name}`);
    } else {
      console.log(`Not found: ${name}`);
    }
  }

  // List remaining galas
  const remaining = await prisma.gala.findMany({
    orderBy: { name: 'asc' },
    select: { name: true }
  });

  console.log('\n--- Remaining Galas (from source docs) ---');
  remaining.forEach((g, i) => {
    console.log(`${i + 1}. ${g.name}`);
  });

  console.log(`\nTotal: ${remaining.length} galas`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
