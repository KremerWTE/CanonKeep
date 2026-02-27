/**
 * Quick verification that story elements were synced
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'Five Feet From Home' },
  });

  if (!project) {
    console.log('Project not found!');
    return;
  }

  const counts = {
    characters: await prisma.character.count({ where: { projectId: project.id } }),
    bookSeries: await prisma.bookSeries.count({ where: { projectId: project.id } }),
    organizations: await prisma.organization.count({ where: { projectId: project.id } }),
    locations: await prisma.location.count({ where: { projectId: project.id } }),
    crises: await prisma.crisis.count({ where: { projectId: project.id } }),
    galas: await prisma.gala.count({ where: { projectId: project.id } }),
    businessTrips: await prisma.businessTrip.count({ where: { projectId: project.id } }),
    funTimeEncounters: await prisma.funTimeEncounter.count({ where: { projectId: project.id } }),
    storylines: await prisma.storyline.count({ where: { projectId: project.id } }),
  };

  console.log('\n========================================');
  console.log('Database Verification - Five Feet From Home');
  console.log('========================================\n');

  for (const [entity, count] of Object.entries(counts)) {
    console.log(`  ${entity}: ${count}`);
  }

  // Show some sample data
  console.log('\n--- Sample Characters ---');
  const chars = await prisma.character.findMany({
    where: { projectId: project.id },
    take: 5,
    select: { name: true, archetype: true },
  });
  chars.forEach(c => console.log(`  • ${c.name} (${c.archetype})`));

  console.log('\n--- Sample Book Series ---');
  const series = await prisma.bookSeries.findMany({
    where: { projectId: project.id },
    select: { name: true, totalBooks: true, status: true },
  });
  series.forEach(s => console.log(`  • ${s.name} - ${s.totalBooks} books (${s.status})`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
