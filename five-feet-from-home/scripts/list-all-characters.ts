import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const characters = await prisma.character.findMany({
    orderBy: { lastName: 'asc' },
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      nickname: true,
      archetype: true,
      affiliationRole: true,
      bssRole: true,
      age: true,
      appearance: true,
      personality: true,
      background: true,
      modeledAfter: true,
    }
  });

  console.log('=== ALL CHARACTERS IN DATABASE (Ordered by Last Name) ===\n');

  // Sort: null lastNames at the end
  const sorted = characters.sort((a, b) => {
    if (!a.lastName && !b.lastName) return 0;
    if (!a.lastName) return 1;
    if (!b.lastName) return -1;
    return a.lastName.localeCompare(b.lastName);
  });

  sorted.forEach((c, i) => {
    const nickname = c.nickname ? ` "${c.nickname}"` : '';
    const fullName = `${c.firstName || ''}${nickname} ${c.lastName || '(No Last Name)'}`.trim();
    console.log(`${i + 1}. ${fullName} [${c.name}]`);
    console.log(`   Archetype: ${c.archetype || 'Not set'}`);
    console.log(`   BSS Role: ${c.bssRole || 'Not set'}`);
    console.log(`   Age: ${c.age || 'Not set'}`);
    console.log(`   Modeled After: ${c.modeledAfter || 'Not set'}`);
    console.log(`   Has Appearance: ${c.appearance ? 'Yes' : 'NO'}`);
    console.log(`   Has Personality: ${c.personality ? 'Yes' : 'NO'}`);
    console.log(`   Has Background: ${c.background ? 'Yes' : 'NO'}`);
    console.log('');
  });

  console.log(`\nTotal characters: ${characters.length}`);

  // Find characters missing key data
  const missingData = characters.filter(c =>
    !c.appearance || !c.personality || !c.background || !c.lastName
  );

  if (missingData.length > 0) {
    console.log('\n=== CHARACTERS MISSING KEY DATA ===\n');
    missingData.forEach(c => {
      const missing = [];
      if (!c.lastName) missing.push('lastName');
      if (!c.appearance) missing.push('appearance');
      if (!c.personality) missing.push('personality');
      if (!c.background) missing.push('background');
      console.log(`- ${c.name}: Missing ${missing.join(', ')}`);
    });
  }

  await prisma.$disconnect();
}

main().catch(console.error);
