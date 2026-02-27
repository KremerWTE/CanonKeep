/**
 * Compare the two projects to understand what data is where
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const storyProject = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  const ffh = await prisma.project.findUnique({
    where: { name: 'Five Feet From Home' },
  });

  console.log('=== STORY_PROJECT ===');
  if (storyProject) {
    const counts = {
      characters: await prisma.character.count({ where: { projectId: storyProject.id } }),
      locations: await prisma.location.count({ where: { projectId: storyProject.id } }),
      organizations: await prisma.organization.count({ where: { projectId: storyProject.id } }),
      crises: await prisma.crisis.count({ where: { projectId: storyProject.id } }),
      galas: await prisma.gala.count({ where: { projectId: storyProject.id } }),
      bookSeries: await prisma.bookSeries.count({ where: { projectId: storyProject.id } }),
      storylines: await prisma.storyline.count({ where: { projectId: storyProject.id } }),
      funTimeEncounters: await prisma.funTimeEncounter.count({ where: { projectId: storyProject.id } }),
    };
    console.log(counts);

    // Sample characters
    console.log('\nSample characters from STORY_PROJECT:');
    const chars = await prisma.character.findMany({
      where: { projectId: storyProject.id },
      take: 10,
      select: { name: true, archetype: true, bssRole: true },
    });
    chars.forEach(c => console.log(`  • ${c.name} - ${c.archetype || 'no archetype'} - ${c.bssRole || 'no bssRole'}`));
  }

  console.log('\n=== FIVE FEET FROM HOME ===');
  if (ffh) {
    const counts = {
      characters: await prisma.character.count({ where: { projectId: ffh.id } }),
      locations: await prisma.location.count({ where: { projectId: ffh.id } }),
      organizations: await prisma.organization.count({ where: { projectId: ffh.id } }),
      crises: await prisma.crisis.count({ where: { projectId: ffh.id } }),
      galas: await prisma.gala.count({ where: { projectId: ffh.id } }),
      bookSeries: await prisma.bookSeries.count({ where: { projectId: ffh.id } }),
      storylines: await prisma.storyline.count({ where: { projectId: ffh.id } }),
      funTimeEncounters: await prisma.funTimeEncounter.count({ where: { projectId: ffh.id } }),
    };
    console.log(counts);

    // Sample characters
    console.log('\nSample characters from Five Feet From Home:');
    const chars = await prisma.character.findMany({
      where: { projectId: ffh.id },
      take: 10,
      select: { name: true, archetype: true, bssRole: true },
    });
    chars.forEach(c => console.log(`  • ${c.name} - ${c.archetype || 'no archetype'} - ${c.bssRole || 'no bssRole'}`));
  }

  // Check if Bella exists in both
  console.log('\n=== CHECKING KEY CHARACTERS IN BOTH ===');
  const keyNames = ['Bella', 'Addie', 'Harper', 'Elena', 'Jasper', 'Hawk'];
  for (const name of keyNames) {
    const inStory = storyProject ? await prisma.character.findMany({
      where: { projectId: storyProject.id, name: { contains: name } },
      select: { name: true },
    }) : [];
    const inFFH = ffh ? await prisma.character.findMany({
      where: { projectId: ffh.id, name: { contains: name } },
      select: { name: true },
    }) : [];
    console.log(`${name}: STORY_PROJECT=${inStory.length}, FFH=${inFFH.length}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
