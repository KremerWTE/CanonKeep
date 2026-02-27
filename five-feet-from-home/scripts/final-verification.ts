/**
 * Final verification of STORY_PROJECT data
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  console.log('========================================');
  console.log('STORY_PROJECT - Final Verification');
  console.log('========================================\n');

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

  console.log('Entity Counts:');
  for (const [entity, count] of Object.entries(counts)) {
    console.log(`  ${entity}: ${count}`);
  }

  // Check for newly synced data
  console.log('\n--- Newly Synced Book Series ---');
  const series = await prisma.bookSeries.findMany({
    where: { projectId: project.id },
    select: { name: true, totalBooks: true, status: true },
  });
  series.forEach(s => console.log(`  • ${s.name} (${s.totalBooks || '?'} books, ${s.status})`));

  console.log('\n--- Intimate Encounters (new) ---');
  const encounters = await prisma.funTimeEncounter.findMany({
    where: { projectId: project.id },
    select: { title: true, encounterType: true },
  });
  encounters.forEach(e => console.log(`  • ${e.title} (${e.encounterType})`));

  // Verify key characters have been updated
  console.log('\n--- Key Character Verification ---');
  const keyChars = ['Isabella "Bella" Rossi', 'Adelaide "Addie" Barrett', 'Michael "Hawk" Barrett'];
  for (const name of keyChars) {
    const char = await prisma.character.findUnique({
      where: { projectId_name: { projectId: project.id, name } },
      select: { name: true, archetype: true, pohRole: true, wardrobeStyle: true },
    });
    if (char) {
      console.log(`  • ${char.name}`);
      console.log(`    Archetype: ${char.archetype || 'none'}`);
      console.log(`    POH Role: ${char.pohRole || 'none'}`);
      console.log(`    Has Wardrobe: ${char.wardrobeStyle ? 'Yes' : 'No'}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
