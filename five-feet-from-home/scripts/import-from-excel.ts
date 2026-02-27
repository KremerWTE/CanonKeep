/**
 * Import character data from BSS Master Characters spreadsheet
 */
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing characters from Excel spreadsheet...\n');

  const project = await prisma.project.findFirst({
    where: { name: 'Five Feet From Home' },
  });

  if (!project) {
    console.log('Project not found.');
    return;
  }

  const filePath = path.join(process.cwd(), 'BSS_Master_Characters_All_In_One.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet) as Record<string, any>[];

  console.log(`Found ${data.length} character rows in spreadsheet.\n`);

  // Clear existing characters
  await prisma.characterRelationship.deleteMany({ where: { fromCharacter: { projectId: project.id } } });
  await prisma.character.deleteMany({ where: { projectId: project.id } });

  let created = 0;
  for (const row of data) {
    const canonName = row['Canon Name'];
    if (!canonName) continue;

    // Parse name parts
    const nameParts = parseNameParts(canonName);

    const character = await prisma.character.create({
      data: {
        projectId: project.id,
        name: canonName,
        firstName: nameParts.firstName,
        lastName: nameParts.lastName,
        nickname: nameParts.nickname,
        nameVariants: row['Name Variants'] || null,
        affiliationRole: row['Affiliation/Role'] || null,
        hubLocation: row['Hub/Location'] || null,
        education: row['Education (all)'] || null,
        careerHistory: row['Career History (verbatim from docs)'] || null,
        modeledAfter: row['Modeled After / Lookalike (verbatim)'] || null,
        personality: row['Personality (verbatim)'] || null,
        relationships: row['Relationships (verbatim)'] || null,
        sourceFiles: row['Source Files'] || null,
        appearance: row['Physical Description (verbatim)'] || null,
        wardrobeStyle: row['Wardrobe / Style (verbatim)'] || null,
        fitnessSports: row['Fitness / Sports (verbatim)'] || null,
        catchphrases: row['Catchphrases (verbatim)'] || null,
        majorCases: row['Major Cases / Projects (verbatim)'] || null,
        mentorsMentees: row['Mentors / Mentees (verbatim)'] || null,
        firstAppearance: row['First Appearance (Doc/Thread)'] || null,
        reputationalNotes: row['Reputational Notes (verbatim)'] || null,
        faithRoots: row['Faith / Roots (verbatim)'] || null,
        clubsAssociations: row['Clubs / Associations (verbatim)'] || null,

        // Determine roles from affiliation
        bssRole: extractBSSRole(row['Affiliation/Role']),
        wivesClubRole: extractWivesClubRole(row['Clubs / Associations (verbatim)'], row['Affiliation/Role']),
        maisonAureliaRole: extractMaisonRole(row['Affiliation/Role']),
      },
    });

    console.log(`  Created: ${canonName}`);
    created++;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Imported ${created} characters from spreadsheet.`);
  console.log('='.repeat(60));

  // Now add additional data: galas, business trips, etc.
  await createGalas(project.id);
  await createBusinessTrips(project.id);
}

function parseNameParts(fullName: string): { firstName: string; lastName: string; nickname?: string } {
  const parts = fullName.split(' ');
  let firstName = parts[0];
  let lastName = parts.slice(1).join(' ');
  let nickname: string | undefined;

  // Handle nickname in parentheses
  const nickMatch = fullName.match(/\(([^)]+)\)/);
  if (nickMatch) {
    nickname = nickMatch[1];
    firstName = firstName.replace(/\([^)]+\)/, '').trim();
  }

  // Handle hyphenated names
  if (lastName.includes('-')) {
    // Keep as is
  }

  return { firstName, lastName, nickname };
}

function extractBSSRole(affiliation: string | undefined): string | null {
  if (!affiliation) return null;
  const lower = affiliation.toLowerCase();
  if (lower.includes('bss')) {
    return affiliation;
  }
  if (lower.includes('fixer') || lower.includes('operator') || lower.includes('strategist')) {
    return affiliation;
  }
  return null;
}

function extractWivesClubRole(clubs: string | undefined, affiliation: string | undefined): string | null {
  const combined = `${clubs || ''} ${affiliation || ''}`.toLowerCase();
  if (combined.includes('wives club') || combined.includes("wives' club")) {
    return 'Member';
  }
  if (combined.includes('anchor')) {
    return 'Anchor';
  }
  return null;
}

function extractMaisonRole(affiliation: string | undefined): string | null {
  if (!affiliation) return null;
  if (affiliation.toLowerCase().includes('maison aurelia')) {
    return affiliation;
  }
  return null;
}

async function createGalas(projectId: string) {
  console.log('\nCreating galas...');

  await prisma.gala.deleteMany({ where: { projectId } });

  const galas = [
    {
      name: 'Hawk Foundation Gala - NYC',
      organization: 'The Hawk Foundation',
      venue: 'The Plaza Hotel',
      location: 'New York City',
      purpose: 'Veteran Support Fundraiser',
      dresscode: 'Black Tie',
      attendees: JSON.stringify(['Chris Donnelly', 'Kendra', 'Jasper Barrett', 'Elena Barrett', 'Addie', 'Hawk']),
      significance: 'Where Chris and Kendra get engaged',
      events: 'Chris proposes to Kendra. Major networking for BSS. Announcement of foundation expansion.',
      bookAppearance: 'Book 1',
    },
    {
      name: 'The Big Party',
      organization: 'Barrett Family',
      venue: 'Jasper & Elena\'s Estate',
      location: 'Charlotte, North Carolina',
      purpose: 'Family celebration / Series milestone',
      dresscode: 'Cocktail to Black Tie',
      attendees: JSON.stringify(['All main characters']),
      significance: 'Book 1 climax - celebration of family reconciliation',
      events: 'Major gathering of all characters. Jasper finally present. Multiple storylines converge.',
      bookAppearance: 'Book 1, Chapter 10',
    },
    {
      name: 'Vatican Fundraiser',
      organization: 'Catholic Charitable Foundation',
      venue: 'TBD',
      location: 'Rome, Italy',
      purpose: 'Catholic philanthropy',
      dresscode: 'Black Tie / Formal',
      attendees: JSON.stringify(['Chris Donnelly', 'Kendra', 'Elena Barrett', 'Papal Nuncio']),
      significance: 'Showcases Chris\'s Catholic connections',
      bookAppearance: 'Book 2',
    },
    {
      name: 'POH Palace Event',
      organization: 'Palace of Honor',
      venue: 'POH Estate',
      location: 'International',
      purpose: 'Elite networking / Power brokering',
      dresscode: 'White Tie',
      attendees: JSON.stringify(['Addie', 'Selene', 'Harper']),
      significance: 'Where Addie and Selene operate in shadows',
      events: 'Political maneuvering. Information gathering. Elite society.',
      bookAppearance: 'Various',
    },
    {
      name: 'Chris & Kendra Wedding',
      organization: 'Donnelly-[Kendra\'s surname] Families',
      venue: 'Cathedral + Reception Venue',
      location: 'Charlotte / NYC',
      purpose: 'Wedding',
      dresscode: 'Black Tie',
      attendees: JSON.stringify(['Full cast']),
      significance: 'Top-level millionaire wedding centered on Catholic Mass',
      events: 'Msgr. Anthony Russo officiates. Major character interactions.',
      bookAppearance: 'Book 2',
    },
    {
      name: 'Fortune 100 Summit',
      organization: 'Maison Aurelia / BSS Joint',
      venue: 'Various luxury venues',
      location: 'Multiple cities',
      purpose: 'Corporate diplomacy / Crisis smoothing',
      dresscode: 'Business Formal to Black Tie',
      attendees: JSON.stringify(['Elena Barrett', 'Jasper Barrett', 'Harper', 'Lottie Hale']),
      significance: 'Where BSS and Maison Aurelia collaborate',
      events: 'Dinners where crises get smoothed over socially',
      bookAppearance: 'Various',
    },
  ];

  for (const gala of galas) {
    await prisma.gala.create({
      data: { projectId, ...gala },
    });
    console.log(`  Created gala: ${gala.name}`);
  }
}

async function createBusinessTrips(projectId: string) {
  console.log('\nCreating business trips...');

  await prisma.businessTrip.deleteMany({ where: { projectId } });

  const trips = [
    {
      name: 'London Data Breach Response',
      traveler: 'Jasper Barrett',
      destination: 'London, UK',
      origin: 'Charlotte, NC',
      purpose: 'Crisis response - major data breach',
      duration: '3-5 days',
      timeframe: 'Book 1, Chapter 1-3',
      crisisName: 'The London Data Breach',
      companions: JSON.stringify(['Harper Whitfield', 'Hawk team members']),
      storyEvents: '2:17 AM call wakes Jasper. Assembles team, flies out before dawn. Manages breach containment, media narrative.',
      homeImpact: 'Elena left alone again. Grace disappointed. Sets up main conflict of Book 1.',
      outcome: 'Crisis contained but family tension at breaking point.',
      tripOrder: 1,
      bookAppearance: 'Book 1',
    },
    {
      name: 'Silicon Valley CEO Crisis',
      traveler: 'Jasper Barrett',
      destination: 'San Francisco, CA',
      origin: 'Charlotte, NC',
      purpose: 'Personal scandal management before IPO',
      duration: 'Multiple trips',
      timeframe: 'Book 1, Chapter 5-6',
      crisisName: 'The Tech Titan Scandal',
      companions: JSON.stringify(['Addie', 'Legal team']),
      storyEvents: 'Managing whistleblower fallout. IPO timeline pressure.',
      homeImpact: 'Jasper torn between home after Elena\'s health scare and professional obligations.',
      tripOrder: 2,
      bookAppearance: 'Book 1',
    },
    {
      name: 'Middle East Extraction',
      traveler: 'Hawk / Ridge',
      destination: 'Undisclosed Middle East',
      origin: 'Charlotte, NC',
      purpose: 'American executive extraction',
      duration: '1-2 weeks',
      timeframe: 'Book 3',
      crisisName: 'The Embassy Crisis',
      companions: JSON.stringify(['Ridge', 'BSS Operator Team']),
      storyEvents: 'Covert operation. Three executives held without charges.',
      homeImpact: 'Addie worried. Ridge\'s wife managing at home.',
      tripOrder: 5,
      bookAppearance: 'Book 3',
    },
    {
      name: 'Elena Rome Trip',
      traveler: 'Elena Barrett',
      destination: 'Rome, Italy',
      origin: 'Charlotte, NC',
      purpose: 'Maison Aurelia event planning / Vatican fundraiser',
      duration: '4-5 days',
      timeframe: 'Book 2',
      companions: JSON.stringify(['Lottie Hale']),
      storyEvents: 'Elena re-emerging as CEO. Vatican connections.',
      homeImpact: 'Jasper managing kids at home - role reversal.',
      tripOrder: 3,
      bookAppearance: 'Book 2',
    },
    {
      name: 'Dubai Cultural Summit',
      traveler: 'Elena Barrett',
      destination: 'Dubai, UAE',
      origin: 'Charlotte, NC',
      purpose: 'Cultural diplomacy dinner planning',
      duration: '1 week',
      timeframe: 'Book 2-3',
      companions: JSON.stringify(['Lottie Hale', 'Maison Aurelia team']),
      storyEvents: 'High-stakes event coordination. Elena fully back in CEO mode.',
      homeImpact: 'Collaborative scheduling with Jasper - only one parent away at a time.',
      tripOrder: 4,
      bookAppearance: 'Book 2-3',
    },
  ];

  for (const trip of trips) {
    await prisma.businessTrip.create({
      data: { projectId, ...trip },
    });
    console.log(`  Created trip: ${trip.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
