/**
 * Find characters that should exist but are missing from database
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

// Known characters that MUST exist based on story canon
const REQUIRED_CHARACTERS = [
  // Barrett Family
  'Jasper Barrett',
  'Elena Barrett',
  'Grace Barrett',
  'Lucas Barrett',
  'Adelaide "Addie" Barrett',
  'Michael "Hawk" Barrett',

  // Core Women
  'Isabella "Bella" Rossi',
  'Kendra Donnelly',
  'Charlotte "Lottie" Hale',
  'Sara Hale',
  'Selene Marchetti',
  'Evelyn "Evie" Maren',
  'Sofia',
  'Harper Reynolds',

  // Love Interests
  'Matt',
  'Mandy',
  'Chris Donnelly',
  'Daniel',

  // BSS Operators
  'Ridge',
  'Cole',
  'Patch',
  'Ghost',
  'Bear',
  'Holt',
  'Switch',
  'Dax',
  'Dean',
  'Shade',
  'Troy',

  // Bella's Family
  'Marcus Rossi',
  'Daniel Rossi',
  "Bella's Father",
  "Bella's Mother",

  // Elena's Family
  'Victoria Barrett',
  'Sara Marquez',

  // Key Mentors
  'Jessica Cole',
  'Mason Keating',
  'Riley Whitmore',

  // Wives Club Members
  'Camille "Cam" Whitmore',
  'Caroline Whitmore',
  'Chiara Benedetti',

  // POH Characters
  'Msgr. Anthony Russo',
  'Bishop',

  // Children/Next Gen
  'Isabella "Izzy" Reynolds',
  'Nicolas "Nico" Reynolds',
  'Sofia Reynolds',

  // Ranch Characters
  'Storm (Horse)',
  'Veterans Group Members',

  // Minor but important
  'Maggie Donnelly',
  'Dr. Maya Reynolds',
  'Alexandra Vance',
  'Cal "Ghost" Harlow',
  'Ryan "Ry" Maddox',
  'Ethan "Patch" Cole',
  'Alexis "Lex" Navarro',
  'Priya "Radar" Ranganathan',
  'Rina',
];

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
    select: { name: true },
  });

  const existingNames = allChars.map(c => c.name.toLowerCase());

  console.log('========================================');
  console.log('MISSING CHARACTER CHECK');
  console.log('========================================\n');

  const missing: string[] = [];
  const found: string[] = [];

  for (const reqChar of REQUIRED_CHARACTERS) {
    const searchName = reqChar.toLowerCase();
    const exists = existingNames.some(n =>
      n.includes(searchName) ||
      searchName.includes(n.split(' ')[0].toLowerCase())
    );

    if (!exists) {
      missing.push(reqChar);
    } else {
      found.push(reqChar);
    }
  }

  console.log(`Found: ${found.length}/${REQUIRED_CHARACTERS.length}`);
  console.log(`Missing: ${missing.length}/${REQUIRED_CHARACTERS.length}\n`);

  if (missing.length > 0) {
    console.log('=== MISSING CHARACTERS ===');
    missing.forEach(m => console.log(`  • ${m}`));
  }

  // Also check for characters mentioned in Bella series that should exist
  console.log('\n========================================');
  console.log('CHECKING BELLA SERIES SPECIFIC CHARACTERS');
  console.log('========================================\n');

  const bellaSeriesChars = [
    'Matt', // Bella's husband
    'Mandy', // Bella's ex/first love
    'Storm', // Horse at ranch
    'Chiara Benedetti', // Italian mentor
    'Marcus Rossi', // Bella's brother
    'Daniel Rossi', // Bella's brother
    'Msgr. Anthony Russo', // Priest
  ];

  for (const char of bellaSeriesChars) {
    const exists = existingNames.some(n => n.toLowerCase().includes(char.toLowerCase()));
    console.log(`${exists ? '✓' : '✗'} ${char}`);
  }

  // Check for characters that should have POH roles
  console.log('\n========================================');
  console.log('POH ROLE CHECK');
  console.log('========================================\n');

  const pohChars = await prisma.character.findMany({
    where: {
      projectId: project.id,
      pohRole: { not: null }
    },
    select: { name: true, pohRole: true },
  });

  console.log(`Characters with POH roles: ${pohChars.length}`);
  pohChars.forEach(c => console.log(`  • ${c.name}: ${c.pohRole}`));

  // POH roles that should exist
  const requiredPohRoles = [
    'Patroness of Honor (Addie)',
    'Page (Bella)',
    'Vestals',
    'Knights',
  ];

  console.log('\nRequired POH structure:');
  requiredPohRoles.forEach(r => console.log(`  - ${r}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
