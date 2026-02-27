import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const characters = await prisma.character.findMany({
    orderBy: { lastName: 'asc' },
    select: {
      name: true,
      firstName: true,
      lastName: true,
      nickname: true,
      appearance: true,
      personality: true,
      background: true,
      wardrobeStyle: true,
      modeledAfter: true,
    }
  });

  // Sort: null lastNames at the end
  const sorted = characters.sort((a, b) => {
    if (!a.lastName && !b.lastName) return 0;
    if (!a.lastName) return 1;
    if (!b.lastName) return -1;
    return a.lastName.localeCompare(b.lastName);
  });

  console.log('========================================');
  console.log('BOOK 1 CHARACTERS STILL MISSING DATA');
  console.log('(Ordered by Last Name)');
  console.log('========================================\n');

  // Book 1 core character names to filter
  const book1CoreNames = [
    'Jasper Barrett', 'Elena Barrett', 'Grace Barrett',
    'Harper Caldwell', 'Addison Price', 'Jessica Vaughn',
    'Sara Whitaker', 'Alexandra Pierce', 'Mason Reilly',
    'Cole', 'Dean', 'Rafe Moreno', 'Caroline Westbrook',
    'Chris Cole', 'Madison "Maddie" Cole'
  ];

  // Find characters mentioned in Book 1 sources that are missing data
  const missingFromBook1 = sorted.filter(c => {
    // Characters explicitly from Book 1 docs
    const isBook1 = book1CoreNames.some(name =>
      c.name.includes(name.split(' ')[0]) || name.includes(c.firstName || '')
    );

    // Check if missing key data
    const missingData = !c.appearance || !c.personality || !c.background;

    return missingData;
  });

  // Categorize by what's missing
  const missingLastName = sorted.filter(c => !c.lastName);
  const missingAppearance = sorted.filter(c => !c.appearance);
  const missingPersonality = sorted.filter(c => !c.personality);
  const missingBackground = sorted.filter(c => !c.background);
  const missingWardrobe = sorted.filter(c => !c.wardrobeStyle);

  console.log('=== MISSING LAST NAME ===');
  console.log(`Total: ${missingLastName.length} characters\n`);
  missingLastName.slice(0, 30).forEach(c => {
    console.log(`- ${c.name}`);
  });
  if (missingLastName.length > 30) {
    console.log(`... and ${missingLastName.length - 30} more`);
  }

  console.log('\n=== MISSING APPEARANCE ===');
  console.log(`Total: ${missingAppearance.length} characters\n`);
  missingAppearance.slice(0, 30).forEach(c => {
    console.log(`- ${c.name}`);
  });
  if (missingAppearance.length > 30) {
    console.log(`... and ${missingAppearance.length - 30} more`);
  }

  console.log('\n=== MISSING PERSONALITY ===');
  console.log(`Total: ${missingPersonality.length} characters\n`);
  missingPersonality.slice(0, 30).forEach(c => {
    console.log(`- ${c.name}`);
  });
  if (missingPersonality.length > 30) {
    console.log(`... and ${missingPersonality.length - 30} more`);
  }

  console.log('\n=== MISSING BACKGROUND ===');
  console.log(`Total: ${missingBackground.length} characters\n`);
  missingBackground.slice(0, 30).forEach(c => {
    console.log(`- ${c.name}`);
  });
  if (missingBackground.length > 30) {
    console.log(`... and ${missingBackground.length - 30} more`);
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total characters in database: ${characters.length}`);
  console.log(`Missing lastName: ${missingLastName.length}`);
  console.log(`Missing appearance: ${missingAppearance.length}`);
  console.log(`Missing personality: ${missingPersonality.length}`);
  console.log(`Missing background: ${missingBackground.length}`);
  console.log(`Missing wardrobe: ${missingWardrobe.length}`);

  // Characters with COMPLETE data
  const complete = sorted.filter(c =>
    c.lastName && c.appearance && c.personality && c.background
  );
  console.log(`\nFully complete characters: ${complete.length}`);

  await prisma.$disconnect();
}

main().catch(console.error);
