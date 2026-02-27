import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all characters
  const chars = await prisma.character.findMany({
    select: { id: true, name: true, firstName: true, lastName: true },
    orderBy: { name: 'asc' }
  });

  console.log(`Total characters: ${chars.length}\n`);

  // Find potential duplicates
  const nameMap = new Map<string, typeof chars>();

  for (const char of chars) {
    // Normalize name for comparison
    const normalized = char.name.toLowerCase()
      .replace(/['"]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Extract core name parts
    const parts = normalized.split(' ');
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];

    // Create key from first + last name
    const key = `${firstName}_${lastName}`;

    if (!nameMap.has(key)) {
      nameMap.set(key, []);
    }
    nameMap.get(key)!.push(char);
  }

  // Find groups with more than one character
  console.log('Potential duplicates:');
  let duplicateGroups = 0;

  for (const [key, group] of nameMap.entries()) {
    if (group.length > 1) {
      duplicateGroups++;
      console.log(`\n--- ${key} (${group.length} entries) ---`);
      group.forEach(c => console.log(`  [${c.id}] ${c.name}`));
    }
  }

  console.log(`\n\nFound ${duplicateGroups} potential duplicate groups`);

  await prisma.$disconnect();
}

main().catch(console.error);
