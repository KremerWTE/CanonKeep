import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Wives Club Members and Spouses...\n");

  const wivesClubMembers = [
    // ========== CAROLINE & THOMAS WHITMORE (DC) ==========
    {
      name: 'Caroline Whitmore',
      firstName: 'Caroline',
      lastName: 'Whitmore',
      archetype: 'Political Consultant / BSS Connected',
      careerHistory: 'Political Consultant who works for BSS. Reaches out to Elena for advice.',
      affiliationRole: 'BSS Political Consultant',
      bssRole: 'Political Consultant',
      hubLocation: 'Washington D.C.',
      relationships: 'Married to Thomas Whitmore (former congressman, now lobbyist). Works for BSS. Reaches out to Elena Barrett for advice.',
      wivesClubRole: 'Core Circle - Political Consultant',
      background: 'Political consultant with deep D.C. connections. Works for BSS on political crisis management. Maintains close relationship with Elena Barrett for advice on navigating elite social circles.',
    },
    {
      name: 'Thomas Whitmore',
      firstName: 'Thomas',
      lastName: 'Whitmore',
      archetype: 'Former Congressman / Lobbyist',
      careerHistory: 'Former U.S. Congressman. Now works as lobbyist in Washington D.C.',
      affiliationRole: 'Lobbyist - Political Connection',
      hubLocation: 'Washington D.C.',
      relationships: 'Married to Caroline Whitmore (political consultant, BSS). Former congressman turned lobbyist.',
      background: 'Former U.S. Congressman who transitioned to lobbying after leaving office. Part of Jasper\'s D.C. political network through his wife Caroline.',
    },

    // ========== VERONICA "RONNIE" BLAKE (NY) ==========
    {
      name: 'Veronica "Ronnie" Blake',
      firstName: 'Veronica',
      lastName: 'Blake',
      nameVariants: 'Ronnie',
      archetype: 'PR Crisis Firm CEO',
      careerHistory: 'CEO of PR Crisis Firm. Divorced and remarried.',
      affiliationRole: 'PR Crisis Firm CEO',
      hubLocation: 'New York',
      relationships: 'Divorced and remarried to Wall Street managing partner. Mentor to Kara Vega (protege).',
      wivesClubRole: 'Core Circle - PR Crisis CEO',
      background: 'CEO of a major PR crisis management firm in New York. Has been through divorce and found love again with a Wall Street managing partner. Mentors Kara Vega as her protege in the PR world.',
    },
    {
      name: 'Kara Vega',
      firstName: 'Kara',
      lastName: 'Vega',
      archetype: 'PR Professional / Protege',
      careerHistory: 'Protege of Veronica "Ronnie" Blake. Rising PR professional.',
      affiliationRole: 'PR Professional',
      hubLocation: 'New York',
      relationships: 'Protege of Veronica "Ronnie" Blake (PR Crisis Firm CEO).',
      wivesClubRole: 'Rising Circle - PR Protege',
      background: 'Rising star in PR crisis management, learning from Veronica Blake. Part of the younger generation of Wives Club.',
    },

    // ========== JULIA RAINES (DC) - Ridge's fiancée ==========
    {
      name: 'Julia Raines',
      firstName: 'Julia',
      lastName: 'Raines',
      archetype: 'Defense Contractor / Veteran Nonprofit',
      careerHistory: 'Former defense contractor. Now runs veteran nonprofit.',
      affiliationRole: 'Veteran Nonprofit Director',
      hubLocation: 'Washington D.C. → Charlotte, NC',
      relationships: 'Dating and engaged to Ridge (BSS Head of Operators). Defense contractor turned veteran nonprofit leader.',
      wivesClubRole: 'Core Circle - Defense/Veteran Nonprofit',
      background: 'Transitioned from defense contracting to running a veteran nonprofit organization. Met Ridge and they became engaged. Relocates to Charlotte after marriage. Strong connection to military and veteran community.',
    },

    // ========== SAVANNAH COLE (Charleston) ==========
    {
      name: 'Savannah Cole',
      firstName: 'Savannah',
      lastName: 'Cole',
      archetype: 'Luxury Real Estate Broker',
      careerHistory: 'Luxury Real Estate Broker in Charleston.',
      affiliationRole: 'Luxury Real Estate',
      hubLocation: 'Charleston, SC',
      relationships: 'Married to corporate attorney. Sister gets married in Book 2.',
      wivesClubRole: 'Core Circle - Luxury Real Estate',
      background: 'Luxury real estate broker in Charleston with expertise in high-end properties. Her sister\'s wedding becomes a significant event in Book 2.',
    },

    // ========== MADISON LOWE (Miami) ==========
    {
      name: 'Madison Lowe',
      firstName: 'Madison',
      lastName: 'Lowe',
      archetype: 'Former Model / Philanthropy Director',
      careerHistory: 'Former model. Now Philanthropy Director in Miami.',
      affiliationRole: 'Philanthropy Director',
      hubLocation: 'Miami',
      relationships: 'Married to shipping empire owner. Former model turned philanthropy leader.',
      wivesClubRole: 'Core Circle - Philanthropy Director',
      background: 'Former model who transitioned to running philanthropic initiatives in Miami. Married to a shipping empire owner, giving her access to both glamour and significant resources for charitable work.',
    },

    // ========== TESSA & RYAN McCLAIN (NFL) ==========
    {
      name: 'Tessa McClain',
      firstName: 'Tessa',
      lastName: 'McClain',
      archetype: 'Sports Journalist / Lifestyle Blogger',
      careerHistory: 'Former sports journalist. Now lifestyle blogger.',
      affiliationRole: 'Lifestyle Blogger / Sports Media',
      relationships: 'Married to Ryan McClain (NFL defensive player).',
      wivesClubRole: 'Athletes Circle - NFL Wife / Media',
      background: 'Former sports journalist who pivoted to lifestyle blogging. Married to NFL defensive player Ryan McClain. Bridges the media and sports worlds.',
    },
    {
      name: 'Ryan McClain',
      firstName: 'Ryan',
      lastName: 'McClain',
      archetype: 'NFL Player',
      careerHistory: 'NFL Defensive Player.',
      affiliationRole: 'NFL Defensive Player',
      relationships: 'Married to Tessa McClain (sports journalist/lifestyle blogger).',
      background: 'Professional NFL defensive player. Part of BSS athlete client network.',
    },

    // ========== CAROLINA & MATT (NFL QB) ==========
    {
      name: 'Carolina (NFL Wife)',
      firstName: 'Carolina',
      archetype: 'NFL Quarterback Wife',
      relationships: 'Married to Matt (NFL Quarterback).',
      wivesClubRole: 'Athletes Circle - NFL QB Wife',
      background: 'Wife of NFL quarterback Matt. Part of the elite athletes\' wives circle.',
    },
    {
      name: 'Matt (NFL QB)',
      firstName: 'Matt',
      archetype: 'NFL Quarterback',
      careerHistory: 'NFL Quarterback.',
      affiliationRole: 'NFL Quarterback',
      relationships: 'Married to Carolina.',
      background: 'Professional NFL quarterback. High-profile athlete in BSS client network.',
    },

    // ========== KAITLYN (Model) ==========
    {
      name: 'Kaitlyn',
      firstName: 'Kaitlyn',
      archetype: 'Model',
      careerHistory: 'Professional Model.',
      affiliationRole: 'Model',
      wivesClubRole: 'Extended Circle - Model',
      background: 'Professional model connected to Wives Club through fashion and social circles.',
    },

    // ========== BROOKE (Chef / Reality Show) ==========
    {
      name: 'Brooke',
      firstName: 'Brooke',
      archetype: 'Celebrity Chef / Reality TV',
      careerHistory: 'Chef with her own reality show.',
      affiliationRole: 'Celebrity Chef',
      wivesClubRole: 'Extended Circle - Celebrity Chef',
      background: 'Professional chef who has her own reality cooking show. Brings culinary expertise and media connections to Wives Club events.',
    },

    // ========== ANNALISE ==========
    {
      name: 'Annalise',
      firstName: 'Annalise',
      archetype: 'Wives Club Member',
      wivesClubRole: 'Extended Circle',
      background: 'Member of the Wives Club extended circle.',
    },

    // ========== TAYLOR ==========
    {
      name: 'Taylor',
      firstName: 'Taylor',
      archetype: 'Wives Club Member',
      wivesClubRole: 'Extended Circle',
      background: 'Member of the Wives Club extended circle.',
    },

    // ========== SABRINA BLOOMFIELD ==========
    {
      name: 'Sabrina Bloomfield',
      firstName: 'Sabrina',
      lastName: 'Bloomfield',
      archetype: 'Wives Club Member',
      wivesClubRole: 'Extended Circle',
      background: 'Member of the Wives Club Bloomfield family connection.',
    },

    // ========== ISLA STRATTON & COLE (Former CIA) ==========
    {
      name: 'Isla Stratton',
      firstName: 'Isla',
      lastName: 'Stratton',
      archetype: 'Photographer',
      careerHistory: 'Professional Photographer.',
      affiliationRole: 'Photographer',
      relationships: 'Married to Cole (former CIA officer).',
      wivesClubRole: 'Core Circle - Photographer / Intelligence Wife',
      background: 'Professional photographer married to a former CIA officer. Her artistic eye and his intelligence background create an interesting dynamic in the Wives Club.',
    },
    {
      name: 'Cole Stratton',
      firstName: 'Cole',
      lastName: 'Stratton',
      archetype: 'Former CIA Officer',
      careerHistory: 'Former CIA Officer.',
      affiliationRole: 'Former CIA - Intelligence Contact',
      relationships: 'Married to Isla Stratton (photographer).',
      background: 'Former CIA officer who transitioned to private sector. Connected to BSS through intelligence networks. Married to photographer Isla Stratton.',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const member of wivesClubMembers) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: member.name },
          { firstName: member.firstName, lastName: member.lastName || undefined },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: member
      });
      console.log(`Updated: ${member.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...member,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${member.name}`);
      created++;
    }
  }

  // Update Ridge with Julia Raines as fiancée/wife
  const ridge = await prisma.character.findFirst({
    where: { name: 'Ridge' }
  });
  if (ridge) {
    await prisma.character.update({
      where: { id: ridge.id },
      data: {
        relationships: 'Engaged/Married to Julia Raines (defense contractor turned veteran nonprofit). Two children: daughter (same age as Sophia) and son. Operator bond with Hawk. Close to operator brotherhood.',
      }
    });
    console.log('Updated Ridge with Julia Raines relationship');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
