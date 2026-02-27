import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const storylines = await prisma.storyline.findMany({
    where: {
      OR: [
        { category: 'Romance' },
        { category: 'Tension' },
        { category: 'Relationship' }
      ]
    },
    select: {
      title: true,
      category: true,
      characters: true,
      timeline: true,
      themes: true,
    },
    orderBy: {
      category: 'asc'
    }
  });

  console.log('\n========================================');
  console.log('ROMANCE & TENSION STORYLINES');
  console.log('========================================\n');

  for (const story of storylines) {
    console.log(`📖 ${story.title}`);
    console.log(`   Category: ${story.category}`);
    console.log(`   Timeline: ${story.timeline}`);

    if (story.characters) {
      const chars = JSON.parse(story.characters);
      console.log(`   Characters: ${chars.join(', ')}`);
    }

    if (story.themes) {
      const themes = JSON.parse(story.themes);
      console.log(`   Themes: ${themes.slice(0, 3).join(', ')}${themes.length > 3 ? '...' : ''}`);
    }

    console.log('');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
