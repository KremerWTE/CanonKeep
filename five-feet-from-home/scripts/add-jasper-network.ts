import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Adding Jasper\'s network of contacts...\n');

  const characters = [
    // === AMBASSADORS ===
    {
      name: 'Ambassador Robert Hale',
      firstName: 'Robert',
      lastName: 'Hale',
      title: 'Ambassador',
      archetype: 'Diplomat / Ambassador',
      careerHistory: 'U.S. Ambassador to Africa',
      affiliationRole: 'Ambassador (Africa) - Friend of Jasper Barrett',
      relationships: 'Friend of Jasper Barrett. U.S. diplomatic contact for African operations.',
      hubLocation: 'Africa',
    },
    {
      name: 'Ambassador Charles Whitfield',
      firstName: 'Charles',
      lastName: 'Whitfield',
      title: 'Ambassador',
      archetype: 'Diplomat / Ambassador',
      careerHistory: 'U.S. Ambassador to the Holy See (Vatican)',
      affiliationRole: 'Ambassador (Holy See) - Friend of Jasper Barrett',
      relationships: 'Friend of Jasper Barrett. Vatican diplomatic contact.',
      hubLocation: 'Vatican City / Rome',
    },
    {
      name: 'Ambassador Lila Serrano',
      firstName: 'Lila',
      lastName: 'Serrano',
      title: 'Ambassador',
      archetype: 'Diplomat / Ambassador',
      careerHistory: 'U.S. Ambassador to South America',
      affiliationRole: 'Ambassador (South America) - Friend of Jasper Barrett',
      relationships: 'Friend of Jasper Barrett. South American diplomatic contact.',
      hubLocation: 'South America',
    },
    {
      name: 'Ambassador William Carrington',
      firstName: 'William',
      lastName: 'Carrington',
      title: 'Ambassador',
      archetype: 'Diplomat / Ambassador',
      careerHistory: 'U.S. Ambassador to Europe',
      affiliationRole: 'Ambassador (Europe) - Friend of Jasper Barrett',
      relationships: 'Friend of Jasper Barrett. European diplomatic contact.',
      hubLocation: 'Europe',
    },

    // === SENATOR ===
    {
      name: 'Senator Ruth Halversen',
      firstName: 'Ruth',
      lastName: 'Halversen',
      title: 'Senator',
      archetype: 'Politician / Senator',
      careerHistory: 'U.S. Senator',
      affiliationRole: 'U.S. Senator - Friend of Jasper Barrett',
      relationships: 'Friend of Jasper Barrett. Political connection in Washington.',
      hubLocation: 'Washington D.C.',
    },

    // === CLIVE PATTERSON (Client provider) ===
    {
      name: 'Clive Patterson',
      firstName: 'Clive',
      lastName: 'Patterson',
      archetype: 'Academic / Former IMF',
      education: 'Ivy League',
      careerHistory: 'Ivy League Economics Professor. Former IMF official.',
      affiliationRole: 'Economics Professor / Former IMF - Provides clients to Jasper',
      relationships: 'Provides clients to Jasper Barrett. Academic and IMF connections.',
      background: 'Ivy League Economic Professor and former IMF official who provides Jasper with clients through his extensive international finance network.',
    },

    // === BRENDAN CHO (CIA) ===
    {
      name: 'Brendan Cho',
      firstName: 'Brendan',
      lastName: 'Cho',
      archetype: 'Intelligence / CIA Agent',
      careerHistory: 'CIA Agent',
      affiliationRole: 'CIA Agent - Jasper\'s intelligence contact',
      relationships: 'Known to Jasper Barrett. Married to/related to Mia Cho (luxury travel agent). Possible relation to Anna Cho (Elena\'s friend, photographer).',
      bssRole: 'Intelligence Contact',
    },

    // === MIA CHO (Luxury Travel) ===
    {
      name: 'Mia Cho',
      firstName: 'Mia',
      lastName: 'Cho',
      archetype: 'Luxury Travel Agent',
      careerHistory: 'Luxury Travel Agent',
      affiliationRole: 'Luxury Travel Agent - Jasper\'s contact',
      relationships: 'Known to Jasper Barrett. Related to Brendan Cho (CIA agent). Possible relation to Anna Cho (Elena\'s friend, photographer).',
      background: 'Luxury travel agent who assists with high-end travel arrangements.',
    },

    // === DAVID KIM (Tech COO) ===
    {
      name: 'David Kim',
      firstName: 'David',
      lastName: 'Kim',
      archetype: 'Tech Executive',
      careerHistory: 'Tech COO',
      affiliationRole: 'Tech COO - Jasper\'s contact',
      relationships: 'Known to Jasper Barrett. Married to Amelia Kim.',
    },

    // === AMELIA KIM ===
    {
      name: 'Amelia Kim',
      firstName: 'Amelia',
      lastName: 'Kim',
      archetype: 'Tech Executive Spouse',
      relationships: 'Married to David Kim (Tech COO). Known to Jasper Barrett.',
      wivesClubRole: 'Extended Circle - Tech Executive Wife',
    },

    // === HOLT (Tier 1 BSS Operator) ===
    {
      name: 'Holt',
      firstName: 'Holt',
      archetype: 'Tier 1 Operator',
      careerHistory: 'Tier 1 Special Operations',
      bssRole: 'Tier 1 Operator',
      affiliationRole: 'BSS Tier 1 Operator',
      relationships: 'Works for BSS. Tier 1 special operations background.',
      background: 'Tier 1 operator who works for BSS on high-risk operations.',
    },

    // === COL (ret) JACK MADDOX ===
    {
      name: 'COL (ret) Jack Maddox',
      firstName: 'Jack',
      lastName: 'Maddox',
      title: 'COL (ret)',
      archetype: 'Retired Military / Security Consultant',
      careerHistory: 'Retired Tier 1 General. Now owns security consultant firm.',
      affiliationRole: 'Security Consultant Firm Owner - Jasper\'s contact',
      relationships: 'Known to Jasper Barrett. Retired military, now private security.',
      background: 'Retired Colonel and former Tier 1 general who now owns a security consultant firm. Part of Jasper\'s network of military and security contacts.',
    },

    // === DR. NOLAN GRAY (NFL Team Doc) ===
    {
      name: 'Dr. Nolan Gray',
      firstName: 'Nolan',
      lastName: 'Gray',
      title: 'Dr.',
      archetype: 'Sports Medicine / NFL Team Doctor',
      careerHistory: 'NFL Team Doctor',
      affiliationRole: 'NFL Team Doctor - Jasper\'s contact',
      relationships: 'Known to Jasper Barrett. NFL team physician.',
      background: 'NFL team doctor connected to Jasper\'s network of sports and medical professionals.',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { name: { contains: char.firstName + ' ' + (char.lastName || '') } },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    }
  }

  // Update Jasper's relationships to include these contacts
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });

  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        relationships: `Married to Elena Barrett. Father of Grace and Lucas. Mentored by Jessica Hall. Truth-teller: Mason Keating (Duke Lacrosse).
Ambassador friends: Robert Hale (Africa), Charles Whitfield (Holy See), Lila Serrano (South America), William Carrington (Europe).
Political: Senator Ruth Halversen.
Client sources: Clive Patterson (Ivy League Economics/IMF).
Intelligence: Brendan Cho (CIA).
Operators: Holt (BSS Tier 1), COL (ret) Jack Maddox (security consultant).
Other contacts: David Kim (Tech COO), Dr. Nolan Gray (NFL team doc).`,
      }
    });
    console.log('\nUpdated Jasper Barrett with full network');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
