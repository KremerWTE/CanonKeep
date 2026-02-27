import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Harper's Sorority Sisters and Wives Club Members...\n");

  const sororityMembers = [
    // ========== MADISON "MADDIE" COLE & CHRIS COLE ==========
    {
      name: 'Madison "Maddie" Cole',
      firstName: 'Madison',
      lastName: 'Cole',
      nameVariants: 'Maddie',
      archetype: 'Wellness Empire Owner / Former Swimmer',
      careerHistory: 'Former college swimmer. Built wellness empire. Boutique fitness entrepreneur.',
      affiliationRole: 'Wellness Empire / Fitness Entrepreneur',
      relationships: "Harper's sorority sister. Married to Chris Cole (NFL QB, Panthers).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Wellness Entrepreneur',
      background: "One of Harper's sorority sisters from college. Former competitive swimmer who leveraged her athletic background to build a wellness empire and boutique fitness brand. Brings health and wellness expertise to the Wives Club.",
    },
    {
      name: 'Chris Cole',
      firstName: 'Chris',
      lastName: 'Cole',
      archetype: 'NFL Quarterback',
      careerHistory: 'NFL Quarterback for the Carolina Panthers.',
      affiliationRole: 'NFL QB - Panthers',
      relationships: 'Married to Madison "Maddie" Cole (wellness entrepreneur, Harper\'s sorority sister).',
      background: 'NFL quarterback for the Carolina Panthers. Connected to BSS through athlete protection network and his wife\'s Wives Club connections.',
    },

    // ========== VIVIENNE "VIV" ROSS & JONATHAN ROSS ==========
    {
      name: 'Vivienne "Viv" Ross',
      firstName: 'Vivienne',
      lastName: 'Ross',
      nameVariants: 'Viv',
      archetype: 'Shipping Heiress / Interior Designer',
      careerHistory: 'Heiress to East Coast Shipping fortune. Interior designer.',
      affiliationRole: 'Interior Designer / Shipping Heiress',
      relationships: "Harper's sorority sister. Married to Jonathan Ross (VC firm with ties to Jasper's firm).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Shipping Heiress',
      background: "One of Harper's sorority sisters. Heiress to major East Coast shipping fortune who pursued her passion for interior design. Her family's shipping connections and husband's VC ties make her a valuable network node.",
    },
    {
      name: 'Jonathan Ross',
      firstName: 'Jonathan',
      lastName: 'Ross',
      archetype: 'Venture Capitalist',
      careerHistory: 'VC firm partner. Ties to Jasper\'s firm for clients.',
      affiliationRole: 'VC Partner - Client Pipeline',
      relationships: 'Married to Vivienne "Viv" Ross (shipping heiress, interior designer). VC firm has ties to Jasper\'s firm for clients.',
      background: 'Venture capitalist whose firm has business ties to Jasper and BSS. Provides client referrals and investment opportunities. Connected to elite circles through wife Vivienne.',
    },

    // ========== NATALIA "TALIA" CRUZ & MARK DELGADO ==========
    {
      name: 'Natalia "Talia" Cruz',
      firstName: 'Natalia',
      lastName: 'Cruz',
      nameVariants: 'Talia',
      archetype: 'Wall Street Trader / Angel Investor',
      careerHistory: 'Wall Street Equity Trader. Runs Angel Investment firm for women-led startups.',
      affiliationRole: 'Wall Street / Angel Investor',
      relationships: "Harper's sorority sister. Married to Mark Delgado (luxury real estate, golfs with Mason).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Finance',
      background: "One of Harper's sorority sisters. Built career as Wall Street equity trader before founding an angel investment firm focused on women-led startups. Champion for female entrepreneurship in the Wives Club network.",
    },
    {
      name: 'Mark Delgado',
      firstName: 'Mark',
      lastName: 'Delgado',
      archetype: 'Luxury Real Estate',
      careerHistory: 'Luxury real estate professional.',
      affiliationRole: 'Luxury Real Estate',
      relationships: 'Married to Natalia "Talia" Cruz (Wall Street/Angel Investor). Golfs with Mason Keating (Jasper\'s truth-teller).',
      background: 'Luxury real estate professional who golfs with Mason Keating, making him part of Jasper\'s extended social circle through both his wife\'s connections and his friendship with Mason.',
    },

    // ========== CAMILLE "CAM" WHITMORE & EVAN ==========
    {
      name: 'Camille "Cam" Whitmore',
      firstName: 'Camille',
      lastName: 'Whitmore',
      nameVariants: 'Cam',
      archetype: 'Lifestyle Influencer / Cookbook Author',
      careerHistory: 'Lifestyle influencer. Cookbook author.',
      affiliationRole: 'Lifestyle Influencer / Author',
      relationships: "Harper's sorority sister. Married to Evan Whitmore (entertainment lawyer for A-list artists).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Media Influencer',
      background: "One of Harper's sorority sisters. Built a brand as a lifestyle influencer and published cookbook author. Her media presence and husband's entertainment law connections bring celebrity access to the network.",
    },
    {
      name: 'Evan Whitmore',
      firstName: 'Evan',
      lastName: 'Whitmore',
      archetype: 'Entertainment Lawyer',
      careerHistory: 'Entertainment lawyer representing A-list artists. Provides clients to Jasper.',
      affiliationRole: 'Entertainment Lawyer - Client Pipeline',
      relationships: 'Married to Camille "Cam" Whitmore (lifestyle influencer/cookbook author). Provides celebrity clients to Jasper.',
      background: 'High-powered entertainment lawyer representing A-list artists. Refers celebrity clients to Jasper and BSS for crisis management. Key connection between Hollywood and BSS.',
    },

    // ========== ISABELLA "IZZY" SANTORO & DOMINIC ==========
    {
      name: 'Isabella "Izzy" Santoro',
      firstName: 'Isabella',
      lastName: 'Santoro',
      nameVariants: 'Izzy',
      archetype: 'Former Broadway / Youth Talent Academy',
      careerHistory: 'Former Broadway performer. Now runs elite youth talent academy.',
      affiliationRole: 'Youth Talent Academy Director',
      relationships: "Harper's sorority sister. Married to Dominic Santoro (CEO luxury hotel group, partnered with Jasper).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Arts/Talent',
      mentorsMentees: 'Mentors Grace in performing arts. Mentors Kendra in stage presence/professional femininity.',
      background: "One of Harper's sorority sisters. Former Broadway star who transitioned to running an elite youth talent academy. Mentors young talents including Grace (performing arts) and Kendra (stage presence). Acts as social hub between elite families, BSS, and the Wives Club. 'Motherly' figure to younger women.",
      personality: 'Theater-trained voice. Commands attention. Warm with mentees. Can be perfectionist.',
    },
    {
      name: 'Dominic Santoro',
      firstName: 'Dominic',
      lastName: 'Santoro',
      archetype: 'Luxury Hotel CEO',
      careerHistory: 'CEO of luxury hotel group. Has partnered with Jasper in the past.',
      affiliationRole: 'Luxury Hotel CEO - Business Partner',
      relationships: 'Married to Isabella "Izzy" Santoro (youth talent academy). Has partnered with Jasper on business ventures.',
      background: 'CEO of a luxury hotel group who has partnered with Jasper on past ventures. His hotels may serve as safe houses, meeting locations, or VIP venues for BSS operations.',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const member of sororityMembers) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: member.name },
          { firstName: member.firstName, lastName: member.lastName },
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

  // Update Harper with sorority sisters reference
  const harper = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });
  if (harper) {
    await prisma.character.update({
      where: { id: harper.id },
      data: {
        relationships: `Married to Matthew Keating (shipping magnate). Three children: Isabella "Izzy" (9), twins Nicolas "Nico" and Sofia (7). Au pair: Chiara Benedetti (Florence). Strategic partners with Jasper. Sorority sisters: Madison "Maddie" Cole, Vivienne "Viv" Ross, Natalia "Talia" Cruz, Camille "Cam" Whitmore, Isabella "Izzy" Santoro. Mentor to Bella, Kendra, Selene.`,
      }
    });
    console.log('\nUpdated Harper with sorority sisters');
  }

  // Update Mason with Mark Delgado golf connection
  const mason = await prisma.character.findFirst({
    where: { name: { contains: 'Mason Keating' } }
  });
  if (mason) {
    await prisma.character.update({
      where: { id: mason.id },
      data: {
        relationships: "Jasper Barrett's college friend (Duke Lacrosse teammate). Jasper's truth-teller. Brother of Matthew Keating (married to Harper). Golfs with Mark Delgado.",
      }
    });
    console.log('Updated Mason Keating with golf connection');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
