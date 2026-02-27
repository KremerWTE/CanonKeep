/**
 * Fix character database:
 * 1. Remove garbage entries (column headers, single words, etc.)
 * 2. Merge duplicate characters
 * 3. Add missing characters (husbands, etc.)
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Names that are definitely NOT characters (garbage data)
const GARBAGE_NAMES = [
  'Actress Models', 'Age', 'Ah', 'Ahh', 'Alright', 'Appearances', 'Arc', 'Archetype',
  'Background', 'Beautiful', 'Blue', 'Career', 'Career Path', 'Character', 'Character Arc',
  'Character Model', 'Childhood', 'Children', 'College', 'Conflicts', 'Connection',
  'Core Trait', 'Current Role', 'Details', 'Exactly', 'Example', 'Excellent', 'Fit',
  'Flexibility', 'Full Name', 'Function', 'Future', 'Great', 'Grounded Teacher',
  'Handyman', 'Health', 'However', 'Job', 'Knife', 'Leadership Style', 'Long-haul trucker',
  'Mechanic', 'Meeting Ethan', 'Mentorship Threads', 'Missing', 'Model Inspiration',
  'Modeled After', 'Name', 'Nice', 'Notes', 'Office Manager', 'Okay', 'Overlap',
  'Parents', 'Perfect', 'Personality', 'Personality Model', 'Personality Models',
  'Post', 'Pull For', 'Purpose', 'Relationships', 'Role', 'Roles', 'Scene', 'So',
  'Traits', 'Use', 'Whit', 'With Addie', 'With Elena', 'Yes', 'Duke Lacrosse Coach',
  'Iron Mike', 'Joe', 'Spencer'
];

// Characters to merge (duplicates)
const MERGE_MAP: Record<string, string> = {
  'Addie': 'Addie Price',
  'Addie (Addison) Price': 'Addie Price',
  'Addison Price': 'Addie Price',
  'Addie Arc': 'Addie Price',
  'Bella': 'Bella Romano',
  'Ridge': 'Ridge Callahan',
  'Hawk': 'Cole "Hawk" Hawkins',
  'Kendra': 'Kendra Donnelly',
  'Elena Davenport': 'Elena Barrett',
  'Elena Davenport-Barrett': 'Elena Barrett',
  'Jasper Barrett': 'Jasper Barrett', // Keep one
  'Sofia': 'Sofia Larkin',
  'Riley': 'Riley Whitmore',
  'Mason': 'Mason Whitmore',
  'Jessica': 'Jessica Cole',
};

// Missing characters to add
const MISSING_CHARACTERS = [
  {
    name: 'Kyle Price',
    firstName: 'Kyle',
    lastName: 'Price',
    relationships: 'Husband of Addie Price',
    affiliationRole: 'BSS Connected (Spouse)',
    personality: 'Supportive husband, understands the demands of BSS work',
    wivesClubRole: 'Spouse of Core Member',
  },
  {
    name: 'Marco Romano',
    firstName: 'Marco',
    lastName: 'Romano',
    relationships: 'Husband of Bella Romano',
    affiliationRole: 'Romano Ventures Founder',
    personality: 'Italian-American businessman, devoted family man',
    wivesClubRole: 'Spouse of Core Member',
  },
  {
    name: 'Chris Donnelly',
    firstName: 'Chris',
    lastName: 'Donnelly',
    relationships: 'Husband of Kendra Donnelly',
    affiliationRole: 'Donnelly Capital Founder, Catholic Private Equity',
    personality: 'Faith-driven businessman, devoted husband and father',
    wivesClubRole: 'Spouse of Core Member',
    faithRoots: 'Devout Catholic',
  },
  {
    name: 'Declan Hale',
    firstName: 'Declan',
    lastName: 'Hale',
    relationships: 'Husband of Sara Hale, Father of Lottie Hale',
    affiliationRole: 'Hale Industries CEO',
    personality: 'Business magnate, family patriarch',
    wivesClubRole: 'Spouse of Member',
  },
  {
    name: 'Cole "Hawk" Hawkins',
    firstName: 'Cole',
    lastName: 'Hawkins',
    nickname: 'Hawk',
    relationships: 'BSS Head of Operations, potential romantic connection with Sara',
    affiliationRole: 'BSS Head of Operations',
    bssRole: 'Head of Operations',
    personality: 'Silent professional, deadly efficient, protective',
    careerHistory: 'Special Forces veteran, multiple overseas deployments',
    hubLocation: 'Charlotte HQ',
  },
  {
    name: 'Ridge Callahan',
    firstName: 'Ridge',
    lastName: 'Callahan',
    relationships: 'BSS Assistant Head of Ops, works closely with Hawk',
    affiliationRole: 'BSS Assistant Head of Operations',
    bssRole: 'Assistant Head of Operations',
    personality: 'Southern gentleman, military precision, loyal',
    careerHistory: 'Military veteran, served with Hawk',
    hubLocation: 'Charlotte HQ',
  },
  {
    name: 'Bella Romano',
    firstName: 'Bella',
    lastName: 'Romano',
    relationships: 'Wife of Marco Romano, Wives Club Core Member',
    wivesClubRole: 'Core Member - Emotional Heart',
    personality: 'Emotional, passionate, Italian-American warmth',
  },
  {
    name: 'Sara Hale',
    firstName: 'Sara',
    lastName: 'Hale',
    relationships: 'Wife of Declan Hale, Mother of Lottie, Maison Aurelia support',
    wivesClubRole: 'Core Member',
    maisonAureliaRole: 'Events Support',
    personality: 'Grounding presence, sophisticated, widowed then remarried?',
  },
  {
    name: 'Charlotte "Lottie" Hale',
    firstName: 'Charlotte',
    lastName: 'Hale',
    nickname: 'Lottie',
    relationships: 'Daughter of Sara and Declan Hale, Maison Aurelia Operations Chief',
    wivesClubRole: 'Extended Circle',
    maisonAureliaRole: 'Operations Chief',
    personality: 'Organizational genius, legendary seating chart skills',
  },
  {
    name: 'Maggie Donnelly',
    firstName: 'Maggie',
    lastName: 'Donnelly',
    relationships: 'Sister or relative of Chris Donnelly, teacher',
    wivesClubRole: 'Extended Circle - Next-gen connector',
    personality: 'Warm teacher, romantic at heart',
    careerHistory: 'Elementary school teacher',
  },
  {
    name: 'Selene Marchetti',
    firstName: 'Selene',
    lastName: 'Marchetti',
    relationships: 'Wives Club member, mysterious past',
    wivesClubRole: 'Core Member - Wild Card',
    personality: 'Mysterious, unpredictable, fiercely loyal once trust earned',
  },
  {
    name: 'Izzy Barrett',
    firstName: 'Izzy',
    lastName: 'Barrett',
    relationships: 'Daughter of Jasper and Elena Barrett',
    personality: 'Coming-of-age protagonist for Spring Break series',
  },
  {
    name: 'Grace Barrett',
    firstName: 'Grace',
    lastName: 'Barrett',
    relationships: 'Daughter of Jasper and Elena Barrett',
    modeledAfter: 'Jamie Scott (OTH)',
  },
  {
    name: 'Lucas Barrett',
    firstName: 'Lucas',
    lastName: 'Barrett',
    relationships: 'Son of Jasper and Elena Barrett',
  },
];

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.log('No project found');
    return;
  }

  console.log('=== CLEANING CHARACTER DATABASE ===\n');

  // Step 1: Delete garbage entries
  console.log('Step 1: Removing garbage entries...');
  const deleteResult = await prisma.character.deleteMany({
    where: {
      name: { in: GARBAGE_NAMES }
    }
  });
  console.log(`Deleted ${deleteResult.count} garbage entries\n`);

  // Step 2: Handle duplicates - keep the one with most data
  console.log('Step 2: Handling duplicates...');
  for (const [oldName, newName] of Object.entries(MERGE_MAP)) {
    if (oldName === newName) continue;

    const oldChar = await prisma.character.findFirst({ where: { name: oldName } });
    if (oldChar) {
      // Check if target exists
      const newChar = await prisma.character.findFirst({ where: { name: newName } });
      if (newChar) {
        // Delete the duplicate
        await prisma.character.delete({ where: { id: oldChar.id } });
        console.log(`  Merged "${oldName}" into "${newName}"`);
      } else {
        // Rename to canonical name
        await prisma.character.update({
          where: { id: oldChar.id },
          data: { name: newName }
        });
        console.log(`  Renamed "${oldName}" to "${newName}"`);
      }
    }
  }

  // Step 3: Add missing characters
  console.log('\nStep 3: Adding missing characters...');
  for (const char of MISSING_CHARACTERS) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          ...char,
          projectId: project.id,
        }
      });
      console.log(`  Added: ${char.name}`);
    } else {
      // Update with missing data
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`  Updated: ${char.name}`);
    }
  }

  // Step 4: Delete any remaining single-word garbage
  console.log('\nStep 4: Removing remaining single-word non-names...');
  const allChars = await prisma.character.findMany({ select: { id: true, name: true } });
  let cleanedCount = 0;
  for (const char of allChars) {
    // Remove entries that are single common words or very short
    const name = char.name.trim();
    if (
      name.length < 3 ||
      (!name.includes(' ') && !name.includes('-') && !name.includes('"') &&
       ['The', 'And', 'But', 'For', 'Not', 'All', 'Can', 'Her', 'His', 'Our', 'Out', 'Get'].includes(name))
    ) {
      await prisma.character.delete({ where: { id: char.id } });
      cleanedCount++;
    }
  }
  console.log(`Deleted ${cleanedCount} more invalid entries`);

  // Final count
  const finalCount = await prisma.character.count();
  console.log(`\n=== DONE ===`);
  console.log(`Total characters: ${finalCount}`);

  // List remaining characters
  const remaining = await prisma.character.findMany({
    select: { name: true },
    orderBy: { name: 'asc' }
  });
  console.log('\nRemaining characters:');
  remaining.forEach(c => console.log(`  - ${c.name}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
