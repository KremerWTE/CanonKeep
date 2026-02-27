import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== CHECKING WHAT IS STILL MISSING ===\n');

  // Book 1 core characters from Chat 1 and Love Option Book 4
  const book1CoreNames = [
    'Jasper Barrett', 'Elena Barrett', 'Grace Barrett',
    'Harper Caldwell', 'Addison Price', 'Jessica Vaughn',
    'Sara Whitaker', 'Alexandra Pierce', 'Mason Reilly',
    'Rafe Moreno', 'Caroline Westbrook', 'Madison "Maddie" Cole',
    'Chris Cole', 'Cole', 'Dean'
  ];

  console.log('=== BOOK 1 CORE CHARACTER STATUS ===\n');

  for (const name of book1CoreNames) {
    const char = await prisma.character.findFirst({
      where: { name },
      select: {
        name: true,
        appearance: true,
        personality: true,
        background: true,
        wardrobeStyle: true,
        modeledAfter: true,
        nameVariants: true
      }
    });

    if (char) {
      const missing = [];
      if (!char.appearance) missing.push('appearance');
      if (!char.personality) missing.push('personality');
      if (!char.background) missing.push('background');
      if (!char.wardrobeStyle) missing.push('wardrobe');
      if (!char.modeledAfter) missing.push('modeledAfter');

      if (missing.length > 0) {
        console.log(`❌ ${char.name}: Missing ${missing.join(', ')}`);
      } else {
        console.log(`✓ ${char.name}: COMPLETE`);
      }
    } else {
      console.log(`⚠️ ${name}: NOT IN DATABASE`);
    }
  }

  // Check overall database stats
  const total = await prisma.character.count();
  const complete = await prisma.character.count({
    where: {
      AND: [
        { appearance: { not: null } },
        { personality: { not: null } },
        { background: { not: null } },
        { lastName: { not: null } }
      ]
    }
  });

  const missingAppearance = await prisma.character.count({ where: { appearance: null } });
  const missingPersonality = await prisma.character.count({ where: { personality: null } });
  const missingBackground = await prisma.character.count({ where: { background: null } });
  const missingLastName = await prisma.character.count({ where: { lastName: null } });
  const missingWardrobe = await prisma.character.count({ where: { wardrobeStyle: null } });

  console.log('\n=== DATABASE SUMMARY ===');
  console.log(`Total characters: ${total}`);
  console.log(`Fully complete (appearance + personality + background + lastName): ${complete}`);
  console.log(`\nMissing data:`);
  console.log(`  - Missing appearance: ${missingAppearance}`);
  console.log(`  - Missing personality: ${missingPersonality}`);
  console.log(`  - Missing background: ${missingBackground}`);
  console.log(`  - Missing lastName: ${missingLastName}`);
  console.log(`  - Missing wardrobe: ${missingWardrobe}`);

  // Check content counts
  const flashbacks = await prisma.storyline.count({ where: { category: { contains: 'Flashback' } } });
  const crises = await prisma.crisis.count();
  const trips = await prisma.businessTrip.count();
  const galas = await prisma.gala.count();

  console.log('\n=== CONTENT STATUS ===');
  console.log(`Flashbacks/Storylines: ${flashbacks}`);
  console.log(`Crises/Cases: ${crises}`);
  console.log(`Business Trips: ${trips}`);
  console.log(`Galas/Events: ${galas}`);

  // Wives Club stats
  const wivesClub = await prisma.character.count({
    where: {
      OR: [
        { wivesClubRole: { not: null } },
        { bssRole: { contains: 'Wives Club' } }
      ]
    }
  });

  console.log(`\nWives Club members: ${wivesClub}`);

  await prisma.$disconnect();
}

main().catch(console.error);
