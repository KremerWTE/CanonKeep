import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Query Book 1 Crises
  const crises = await prisma.crisis.findMany({
    where: {
      OR: [
        { bookAppearance: { contains: 'Book 1' } },
        { timeframe: { contains: 'Book 1' } },
      ]
    },
    select: { name: true, status: true, location: true, crisisType: true }
  });

  console.log('\n=== BOOK 1 CRISES/DILEMMAS IN DATABASE ===\n');
  crises.forEach(c => {
    console.log(`• ${c.name}`);
    console.log(`  Location: ${c.location || 'N/A'}`);
    console.log(`  Type: ${c.crisisType || 'N/A'}`);
    console.log(`  Status: ${c.status || 'N/A'}`);
    console.log('');
  });
  console.log(`Total Book 1 crises: ${crises.length}`);

  // Query Flashback Storylines
  const storylines = await prisma.storyline.findMany({
    where: { category: 'Flashback' },
    select: { title: true, timeline: true, characters: true },
    orderBy: { createdAt: 'desc' },
    take: 25
  });

  console.log('\n\n=== FLASHBACK STORYLINES IN DATABASE ===\n');
  storylines.forEach(s => {
    const chars = s.characters ? JSON.parse(s.characters).join(', ') : 'N/A';
    console.log(`• ${s.title}`);
    console.log(`  Timeline: ${s.timeline || 'N/A'}`);
    console.log(`  Characters: ${chars}`);
    console.log('');
  });
  console.log(`Total flashbacks shown: ${storylines.length}`);

  // Get total counts
  const totalCrises = await prisma.crisis.count();
  const totalStorylines = await prisma.storyline.count();

  console.log('\n\n=== TOTALS ===');
  console.log(`Total crises in database: ${totalCrises}`);
  console.log(`Total storylines in database: ${totalStorylines}`);

  await prisma.$disconnect();
}

main().catch(console.error);
