import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// TARGET ORDER: Jasper, Addie, Harper, Kendra, Bella, Selene, Evie
// Note: "Strong and Savory" is Evie's series, "The Teacher's Heart" is Maggie's
const seriesOrder = [
  { order: 1, exactName: 'Jasper Barrett Series', protagonist: 'Jasper Barrett' },
  { order: 2, exactName: 'The Royal Phoenix', protagonist: 'Addie' },
  { order: 3, nameContains: 'Miami Heat', protagonist: 'Harper' },
  { order: 4, nameContains: 'Kendra', protagonist: 'Kendra' },
  { order: 5, nameContains: 'Bella', protagonist: 'Bella' },
  { order: 6, nameContains: 'Midnight Sun', protagonist: 'Selene' },
  { order: 7, nameContains: 'Strong and Savory', protagonist: 'Evie' },
];

async function main() {
  console.log('=== REORDERING SERIES: Jasper → Addie → Harper → Kendra → Bella → Selene → Evie ===\n');

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // First, delete duplicate series
  const duplicatesToDelete = [
    'Five Feet From Home', // Keep "Jasper Barrett Series" instead
    'The Royal Phoenix: Addie\'s Story', // Keep "The Royal Phoenix" instead
  ];

  for (const name of duplicatesToDelete) {
    const dup = await prisma.bookSeries.findFirst({ where: { name } });
    if (dup) {
      await prisma.bookSeries.delete({ where: { id: dup.id } });
      console.log(`DELETED duplicate: ${name}`);
    }
  }

  // Reset all series to high numbers first to avoid conflicts
  const allSeries = await prisma.bookSeries.findMany();
  for (let i = 0; i < allSeries.length; i++) {
    await prisma.bookSeries.update({
      where: { id: allSeries[i].id },
      data: { readingOrder: 100 + i }
    });
  }
  console.log('Reset all series to temp order\n');

  for (const target of seriesOrder) {
    // Try to find the series by exact name or contains
    let series: any = null;

    if ((target as any).exactName) {
      series = await prisma.bookSeries.findFirst({
        where: { name: (target as any).exactName }
      });
    }

    if (!series && target.nameContains) {
      series = await prisma.bookSeries.findFirst({
        where: { name: { contains: target.nameContains } }
      });
    }

    if (series) {
      // Update the reading order
      await prisma.bookSeries.update({
        where: { id: series.id },
        data: { readingOrder: target.order }
      });
      console.log(`UPDATED: ${series.name} → Order ${target.order}`);
    } else {
      console.log(`NOT FOUND: Series for ${target.protagonist} (Order ${target.order})`);
    }
  }

  // Move other series to higher numbers (8+)
  const mainSeries = await prisma.bookSeries.findMany({
    where: { readingOrder: { lte: 7 } }
  });
  const mainIds = mainSeries.map(s => s.id);

  const otherSeries = await prisma.bookSeries.findMany({
    where: { id: { notIn: mainIds } }
  });

  let nextOrder = 8;
  for (const s of otherSeries) {
    await prisma.bookSeries.update({
      where: { id: s.id },
      data: { readingOrder: nextOrder++ }
    });
  }

  // Final list
  const finalSeries = await prisma.bookSeries.findMany({
    orderBy: { readingOrder: 'asc' }
  });

  console.log('\n=== FINAL SERIES ORDER ===');
  finalSeries.forEach(s => {
    console.log(`${s.readingOrder}: ${s.name} (${s.protagonist})`);
  });

  await prisma.$disconnect();
}

main().catch(console.error);
