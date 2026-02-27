import { PrismaClient } from '@prisma/client';
import * as mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// All document paths to scan
const documentPaths = [
  // Main story documents
  'Five Feet From Home/Chat 1.docx',
  'Five Feet From Home/Outline.docx',
  'Five Feet From Home/Chapter 1.docx',
  'Five Feet From Home/Chapter 2.docx',
  'Five Feet From Home/Chapter 1&2.docx',
  'Five Feet From Home/Chapter 3.docx',
  'Five Feet From Home/Chapter 4.docx',
  'Five Feet From Home/Chapter 5.docx',
  'Five Feet From Home/Chapter 6.docx',
  'Five Feet From Home/Chapter 7.docx',
  'Five Feet From Home/Chapter 8.docx',
  'Five Feet From Home/Chapter 9.docx',
  'Five Feet From Home/The Five Dilemmas.docx',
  'Five Feet From Home/Flashback.docx',
  'Five Feet From Home/second chat.docx',

  // Root level documents
  'Characters.docx',
  'Character Bio.docx',
  'Cam Star Build.docx',
  'Family Party Narrative (series closing).docx',
  'Build Evie and Sofia Chat.docx',
  'Sorority name options.docx',
  'Character beauty in fiction.docx',
  'Spring Break Scene Florida.docx',
  'CLT HQ staff storyline.docx',
  'Izzy College Journey.docx',
  'Selene Troubles.docx',
  'Harper Story ideas.docx',
  'BSS early growth outline.docx',
  'Addie and POH role.docx',
  'BSS and POH outline.docx',
  'POH story outlines.docx',
  'Kebdra Maternity leave outline.docx',
  "Addie's Power dynamic.docx",
  'Harper COO transition story.docx',
  'Ridge story.docx',
  'Summer Camp set-up.docx',
  'Jasper and Elena Transitions.docx',
  'Bella work schedule.docx',
  'Traditions for book scenes.docx',
  "Bella's Background Pre-BSS.docx",
  'BSS Description.docx',
  'Jasper expansion story.docx',
  'Jasper bussdies creation.docx',
  'Wives Club structure.docx',
  'Character influences and calibaration.docx',
  'wives club anchor names.docx',
  'Vegas for Addie.docx',
  'BSS failures.docx',
  'New character creation.docx',
  'Travel style comparison.docx',
  'Crisi Management solutions.docx',
  'Hawk character background.docx',
  'Chris background expnasion.docx',
  'Jasper Barrett series chat.docx',
  'Organize character profiles.docx',
  'Wives Club Characters Development.docx',

  // Characters_Source folder
  'Characters_Source/Love Option Book 4.docx',
  'Characters_Source/Addie and Hawk family growth.docx',
  "Characters_Source/Addie and Hawk's Journey.docx",
  'Characters_Source/Addie and POH role.docx',
  "Characters_Source/Addie's Power dynamic.docx",
  'Characters_Source/Bella work schedule.docx',
  "Characters_Source/Bella's Background Pre-BSS.docx",
  'Characters_Source/BSS and POH outline.docx',
  'Characters_Source/BSS Description.docx',
  'Characters_Source/BSS early growth outline.docx',
  'Characters_Source/BSS failures.docx',
  'Characters_Source/Build Evie and Sofia Chat.docx',
  'Characters_Source/Cam Star Build.docx',
  'Characters_Source/Character beauty in fiction.docx',
  'Characters_Source/Character Bio.docx',
  'Characters_Source/Character influences and calibaration.docx',
  'Characters_Source/Characters.docx',
  'Characters_Source/Chris background expnasion.docx',
  'Characters_Source/CLT HQ staff storyline.docx',
  'Characters_Source/Continue love story thread.docx',
  'Characters_Source/Crisi Management solutions.docx',
  'Characters_Source/Family Party Narrative (series closing).docx',
  'Characters_Source/Harper COO transition story.docx',
  'Characters_Source/Harper Story ideas.docx',
  'Characters_Source/Hawk character background.docx',
  'Characters_Source/Izzy College Journey.docx',
  'Characters_Source/Jasper and Elena Transitions.docx',
  'Characters_Source/Jasper Barrett series chat.docx',
  'Characters_Source/Jasper bussdies creation.docx',
  'Characters_Source/Jasper expansion story.docx',
  'Characters_Source/Kebdra Maternity leave outline.docx',
  'Characters_Source/Love Triangle Storyline.docx',
  'Characters_Source/New character creation.docx',
  'Characters_Source/Organize character profiles.docx',
  'Characters_Source/POH story outlines.docx',
  'Characters_Source/Ridge story.docx',
  'Characters_Source/Selene Troubles.docx',
  'Characters_Source/Sorority name options.docx',
  'Characters_Source/Spring Break Scene Florida.docx',
  'Characters_Source/Summer Camp set-up.docx',
  'Characters_Source/Traditions for book scenes.docx',
  'Characters_Source/Travel style comparison.docx',
  'Characters_Source/Vegas for Addie.docx',
  'Characters_Source/Wives Club Characters Development.docx',
];

// Character name variations to search for
interface CharacterSearch {
  id: string;
  name: string;
  searchTerms: string[];
}

async function parseDocument(docPath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: docPath });
    return result.value;
  } catch (e) {
    return '';
  }
}

function getShortDocName(docPath: string): string {
  return path.basename(docPath, '.docx');
}

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== UPDATING CHARACTER SOURCES AND DETAILS ===\n");

  // Get all characters
  const characters = await prisma.character.findMany({
    where: { projectId: project.id }
  });

  console.log(`Found ${characters.length} characters to process\n`);

  // Build search terms for each character
  const characterSearches: CharacterSearch[] = characters.map(char => {
    const searchTerms: string[] = [];

    // Add main name
    if (char.name) searchTerms.push(char.name);
    if (char.firstName) searchTerms.push(char.firstName);
    if (char.lastName) searchTerms.push(char.lastName);
    if (char.nickname) searchTerms.push(char.nickname);

    // Parse name variants if they exist
    if (char.nameVariants) {
      try {
        const variants = JSON.parse(char.nameVariants);
        if (Array.isArray(variants)) {
          searchTerms.push(...variants);
        }
      } catch {}
    }

    // Parse aliases if they exist
    if (char.aliases) {
      try {
        const aliases = JSON.parse(char.aliases);
        if (Array.isArray(aliases)) {
          searchTerms.push(...aliases);
        }
      } catch {}
    }

    // Filter unique, non-empty terms with length > 2 (avoid single letters)
    const uniqueTerms = [...new Set(searchTerms.filter(t => t && t.length > 2))];

    return {
      id: char.id,
      name: char.name,
      searchTerms: uniqueTerms
    };
  });

  // Parse all documents and build character -> documents mapping
  const characterSources: Map<string, Set<string>> = new Map();

  for (const char of characterSearches) {
    characterSources.set(char.id, new Set());
  }

  console.log("--- Parsing Documents ---\n");

  for (const docPath of documentPaths) {
    const text = await parseDocument(docPath);
    if (!text) continue;

    const docName = getShortDocName(docPath);
    let foundChars: string[] = [];

    // Search for each character in this document
    for (const char of characterSearches) {
      for (const term of char.searchTerms) {
        // Case-insensitive word boundary search
        const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(text)) {
          characterSources.get(char.id)?.add(docName);
          foundChars.push(char.name);
          break; // Found in this doc, move to next character
        }
      }
    }

    if (foundChars.length > 0) {
      console.log(`${docName}: ${foundChars.length} characters found`);
    }
  }

  // Update each character with their source files
  console.log("\n--- Updating Character Source Files ---\n");

  let updatedCount = 0;
  for (const char of characterSearches) {
    const sources = characterSources.get(char.id);
    if (sources && sources.size > 0) {
      const sourceList = Array.from(sources).sort();
      await prisma.character.update({
        where: { id: char.id },
        data: { sourceFiles: sourceList.join(', ') }
      });
      updatedCount++;
      if (sourceList.length >= 5) {
        console.log(`${char.name}: ${sourceList.length} sources`);
      }
    }
  }

  console.log(`\nUpdated ${updatedCount} characters with source files\n`);

  // ========== ADDIE AS MAIN CHARACTER - COMPREHENSIVE UPDATE ==========
  console.log("--- Establishing Addie as Main Character ---\n");

  const addie = await prisma.character.findFirst({
    where: {
      OR: [
        { firstName: 'Addison' },
        { name: { contains: 'Addie' } },
        { nickname: 'Addie' }
      ]
    }
  });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        name: 'Addison "Addie"',
        firstName: 'Addison',
        nickname: 'Addie',
        archetype: 'MAIN CHARACTER / Protectress of Honor / Royal Phoenix',
        background: `ADDIE IS THE MAIN CHARACTER OF THE FIVE FEET FROM HOME UNIVERSE

THE ROYAL PHOENIX - 13-BOOK SAGA
Addie's complete transformation from burned-out BSS fixer to wife, mother, and spiritual leader.

ORIGIN & BSS CAREER:
- "Fixer of last resort" at Barrett Strategic Solutions
- Known for handling impossible situations
- Mentors Daniel (#4) as trusted fixer
- Manages month-long Denver telecoms crisis
- Works with Cole Harrington (Tier 1) on tactical operations

THE BREAKING POINT:
- Denver Crisis: Month-long operation pushes her past limits
- Misses Grace's calls, Harper's wedding planning, Kendra's Games placement
- Hospitalized from exhaustion
- Cole watches over her during recovery
- Doctor helps her confront her feelings for Kendra

HAWK'S ENTRANCE:
- Met during her burnout recovery period
- The midnight shower "proposal" scene
- He takes on Phoenix Project role - helping people rebuild
- Not just hovering for romance but invested in same battlefield: perfection, burnout, identity, hidden wounds

BUILDING A LIFE WITH HAWK:
- Built house together, moved in
- Quiet but romantic proposal on their property
- Wedding with Brotherhood attending
- Compound family celebrating
- "A warrior goddess learning to be a bride"

FAMILY GROWTH:
- Fertility struggles after exhaustion hospitalization
- Dr. wife of Wives Club in Greensboro helped them
- Twin babies - one boy, one girl
- Hawk becomes "Dad Ops" - late nights rocking babies
- Third child within a year - "divine surprise"
- "We've survived combat zones together, love. We can survive diapers."

PROTECTRESS OF HONOR (POH):
- Leadership position in the Order
- Became the "umbrella" that protects everyone in the orbit
- Uses motherhood experience to speak with authentic empathy
- Training next generation of protectresses
- Brought Evie formally under protection

THE CONNECTION POINT:
Addie becomes the connection point for EVERYTHING in the Five Feet From Home universe:
- BSS: Senior Fixer, mentors Daniel
- POH: Protectress, the "umbrella" for everyone
- Jasper: Trusted completely, his top field operator
- Harper: Colleague, friend (feels Addie's absence during wedding planning)
- Kendra: Complicated love, unresolved spark
- Elena: Close friend, protector
- Grace: "Aunt Addie," protective relationship
- Cole Harrington: He watches over her, brother-in-arms
- Hawk: Husband, father of her children, her rock
- Evie: Brought her under protection
- The Wives Club: Her family, the foundation of her support

THE PHOENIX SYMBOLISM:
- Burned out, hospitalized, nearly destroyed
- Rose from the ashes through love (Hawk)
- Built a family (twins + third child)
- Became the matriarch of the entire orbit
- The Royal Phoenix fully risen

SERIES ENDING - FAMILY PARTY:
At the Family Party, Addie looks around at everyone she protected and everyone who protected her, and finally exhales. The Phoenix, complete.

"You can have the career and the family. You can burn out and rise again. You can love deeply in ways you never expected. And in the end, it's not the crises that define you - it's the people who stay."`,
        relationships: `HAWK - Husband, married after quiet proposal, have twins + third child. He's her rock.

COLE HARRINGTON - Brother-in-arms from Tier 1, watched over her during hospitalization, deep protective bond

KENDRA VOS - Complicated love, unresolved spark. The one that got away, or maybe the one she ran from.

JASPER BARRETT - Complete trust. He relies on her as senior fixer. She's his field extension.

ELENA BARRETT - Close friend, protector. Addie shields Elena like a sister.

GRACE BARRETT - "Aunt Addie." Protective, nurturing relationship.

HARPER VANCE - Colleague, friend. Harper felt Addie's absence during wedding planning keenly.

EVIE MAREN - Brought her under POH protection. "You're protected now. Whatever comes, you're not alone."

DANIEL (#4) - Mentee at BSS. She groomed him as trusted fixer.

THE WIVES CLUB - Her family. Elena, Harper, Kendra, Bella, Selene, Lottie, Sara - unbreakable bonds.

THE BROTHERHOOD - Hawk's military family became her family too.`,
        arcStart: 'Burned-out BSS fixer, running from herself, missing connections, heading toward collapse',
        arcChange: 'Hospitalized, forced to confront feelings, met Hawk, learned to let someone in, became wife and mother',
        arcEnd: 'The Royal Phoenix fully risen - wife, mother of three, Protectress, the heart that holds everyone together'
      }
    });
    console.log('Updated: Addie as Main Character with complete background');
  }

  // ========== BUILD OUT LAST NAMES FOR KEY CHARACTERS ==========
  console.log("\n--- Building Out Character Last Names ---\n");

  const lastNameUpdates = [
    { firstName: 'Jasper', lastName: 'Barrett', fullName: 'Jasper Barrett' },
    { firstName: 'Elena', lastName: 'Barrett', fullName: 'Elena Barrett' },
    { firstName: 'Grace', lastName: 'Barrett', fullName: 'Grace Barrett' },
    { firstName: 'Harper', lastName: 'Vance', fullName: 'Harper Vance' },
    { firstName: 'Kendra', lastName: 'Vos', fullName: 'Kendra Vos' },
    { firstName: 'Bella', lastName: 'Romano', fullName: 'Bella Romano' },
    { firstName: 'Evie', lastName: 'Maren', fullName: 'Evie Maren' },
    { firstName: 'Cole', lastName: 'Harrington', fullName: 'Cole Harrington' },
    { firstName: 'Sara', lastName: 'Hale', fullName: 'Sara Hale/Marquez' },
    { firstName: 'Daniel', lastName: 'Cruz', fullName: 'Daniel Cruz' },
    { firstName: 'Selene', lastName: 'Thorne', fullName: 'Selene Thorne' },
    { firstName: 'Lottie', lastName: 'Chen', fullName: 'Lottie Chen' },
    { firstName: 'Maggie', lastName: 'Chen', fullName: 'Maggie Chen' },
    { firstName: 'Matt', lastName: 'Richards', fullName: 'Matt Richards' },
    { firstName: 'Mandy', lastName: 'Brooks', fullName: 'Mandy Brooks' },
    { firstName: 'Jazz', lastName: 'Carter', fullName: 'Jazz Carter' },
    { firstName: 'Claire', lastName: 'Donahue', fullName: 'Claire Donahue' },
    { firstName: 'Riley', lastName: 'Foster', fullName: 'Riley Foster' },
    { firstName: 'Sofia', lastName: 'Reyes', fullName: 'Sofia Reyes' },
    { firstName: 'Izzy', lastName: 'Morgan', fullName: 'Isabella "Izzy" Morgan' },
    { firstName: 'Camila', lastName: 'Rose', fullName: 'Camila Rose' },
    { firstName: 'Lila', lastName: 'Monroe', fullName: 'Lila Monroe' },
    { firstName: 'Scarlett', lastName: 'Vaughn', fullName: 'Scarlett Vaughn' },
    { firstName: 'Valeria', lastName: 'Knight', fullName: 'Valeria Knight' },
  ];

  for (const update of lastNameUpdates) {
    const char = await prisma.character.findFirst({
      where: {
        firstName: update.firstName,
        projectId: project.id
      }
    });

    if (char && !char.lastName) {
      await prisma.character.update({
        where: { id: char.id },
        data: {
          lastName: update.lastName,
          name: update.fullName
        }
      });
      console.log(`Updated: ${update.fullName}`);
    }
  }

  // ========== CROSS-LEVEL SCHOOL/SORORITY INFORMATION ==========
  console.log("\n--- Cross-Leveling School/Sorority Information ---\n");

  // Parse sorority document for information
  const sororityText = await parseDocument('Sorority name options.docx');
  const izzyCollegeText = await parseDocument('Izzy College Journey.docx');

  // Characters with sorority connections
  const sororityMembers = [
    { name: 'Grace Barrett', sorority: 'Kappa Kappa Gamma', school: 'University of Virginia', role: 'Legacy member through Elena' },
    { name: 'Elena Barrett', sorority: 'Kappa Kappa Gamma', school: 'University of Virginia', role: 'Alumna, set the legacy' },
    { name: 'Izzy', sorority: 'Kappa Kappa Gamma', school: 'University of North Carolina', role: 'College student, sorority sister' },
  ];

  for (const member of sororityMembers) {
    const char = await prisma.character.findFirst({
      where: {
        name: { contains: member.name.split(' ')[0] },
        projectId: project.id
      }
    });

    if (char) {
      const educationUpdate = `${member.school}${member.sorority ? ` - ${member.sorority} (${member.role})` : ''}`;
      await prisma.character.update({
        where: { id: char.id },
        data: {
          education: educationUpdate,
          clubsAssociations: member.sorority
        }
      });
      console.log(`Updated sorority/school: ${member.name}`);
    }
  }

  // ========== ADD CHARACTER CIRCLES ==========
  console.log("\n--- Defining Character Circles ---\n");

  const characterCircles = {
    'BSS Core Team': ['Jasper Barrett', 'Addie', 'Harper Vance', 'Daniel Cruz', 'Cole Harrington', 'Bella Romano'],
    'Wives Club': ['Elena Barrett', 'Addie', 'Harper Vance', 'Kendra Vos', 'Bella Romano', 'Selene Thorne', 'Lottie Chen', 'Sara Hale'],
    'Barrett Family': ['Jasper Barrett', 'Elena Barrett', 'Grace Barrett'],
    'The Brotherhood': ['Hawk', 'Cole Harrington', 'Ridge'],
    'Strong & Savory': ['Evie Maren', 'Jazz Carter', 'Sara Hale', 'Kendra Vos', 'Grace Barrett', 'Claire Donahue'],
    'Special Olympics': ['Jazz Carter', 'Claire Donahue', 'Bella Romano'],
    'Addie Orbit': ['Addie', 'Hawk', 'Cole Harrington', 'Kendra Vos', 'Elena Barrett', 'Grace Barrett', 'Harper Vance', 'Evie Maren', 'Daniel Cruz'],
    'Sirens (Cam Star)': ['Selene Thorne', 'Camila Rose', 'Lila Monroe', 'Scarlett Vaughn', 'Valeria Knight'],
    'POH (Protectresses of Honor)': ['Addie', 'Elena Barrett', 'Sara Hale', 'Evie Maren'],
  };

  // Store circles as a storyline for reference
  await prisma.storyline.upsert({
    where: {
      projectId_title: { projectId: project.id, title: 'Character Circles Reference' }
    },
    update: {
      content: JSON.stringify(characterCircles, null, 2),
      description: 'Reference for character social circles and groups',
      category: 'Reference',
      characters: JSON.stringify(Object.values(characterCircles).flat())
    },
    create: {
      projectId: project.id,
      title: 'Character Circles Reference',
      category: 'Reference',
      description: 'Reference for character social circles and groups',
      content: JSON.stringify(characterCircles, null, 2),
      characters: JSON.stringify(Object.values(characterCircles).flat())
    }
  });

  console.log('Created/Updated: Character Circles Reference');

  // Update characters with their circles
  for (const [circle, members] of Object.entries(characterCircles)) {
    for (const memberName of members) {
      const char = await prisma.character.findFirst({
        where: {
          OR: [
            { name: { contains: memberName } },
            { firstName: memberName }
          ],
          projectId: project.id
        }
      });

      if (char) {
        // Append circle to clubsAssociations
        const existingClubs = char.clubsAssociations || '';
        if (!existingClubs.includes(circle)) {
          const newClubs = existingClubs ? `${existingClubs}, ${circle}` : circle;
          await prisma.character.update({
            where: { id: char.id },
            data: { clubsAssociations: newClubs }
          });
        }
      }
    }
  }
  console.log('Updated characters with circle memberships');

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
