/**
 * List low priority characters that need enhancement
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

  const allChars = await prisma.character.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  // Score each character
  const scored = allChars.map(char => {
    let score = 0;
    const missing: string[] = [];

    if (char.background) score += 2; else missing.push('background');
    if (char.appearance) score += 2; else missing.push('appearance');
    if (char.personality) score += 2; else missing.push('personality');
    if (char.relationships) score += 2; else missing.push('relationships');
    if (char.motivations) score += 2; else missing.push('motivations');
    if (char.fears) score += 2; else missing.push('fears');
    if (char.archetype) score += 1; else missing.push('archetype');
    if (char.wardrobeStyle) score += 1;
    if (char.age) score += 1; else missing.push('age');

    return { ...char, score, missing };
  });

  // Get low priority (0-5)
  const lowPriority = scored.filter(c => c.score <= 5).sort((a, b) => b.score - a.score);

  console.log('========================================');
  console.log(`LOW PRIORITY CHARACTERS: ${lowPriority.length}`);
  console.log('========================================\n');

  // Group by score
  for (let s = 5; s >= 0; s--) {
    const group = lowPriority.filter(c => c.score === s);
    if (group.length > 0) {
      console.log(`\n=== SCORE ${s} (${group.length} characters) ===`);
      group.forEach(c => {
        console.log(`\n${c.name}`);
        console.log(`  Archetype: ${c.archetype || 'NONE'}`);
        console.log(`  Missing: ${c.missing.join(', ')}`);
        if (c.background) console.log(`  Has: background`);
        if (c.personality) console.log(`  Has: personality`);
        if (c.relationships) console.log(`  Has: relationships`);
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
