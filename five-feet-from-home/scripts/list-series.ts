import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // List all series
  const allSeries = await prisma.bookSeries.findMany({
    orderBy: { readingOrder: 'asc' },
    select: { id: true, name: true, readingOrder: true }
  });

  console.log('Current Series:');
  allSeries.forEach((s, i) => {
    console.log(`${i+1}. [Order ${s.readingOrder}] ${s.name} (ID: ${s.id})`);
  });

  await prisma.$disconnect();
}
main().catch(console.error);
