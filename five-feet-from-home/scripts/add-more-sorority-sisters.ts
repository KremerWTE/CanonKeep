import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Additional Harper Sorority Sisters...\n");

  const sororityMembers = [
    // ========== MADELINE "MADDIE" CROSS ==========
    {
      name: 'Madeline "Maddie" Cross',
      firstName: 'Madeline',
      lastName: 'Cross',
      nameVariants: 'Maddie',
      archetype: 'Former VS Model / Wellness Entrepreneur',
      careerHistory: 'Former Victoria\'s Secret model. Now wellness entrepreneur.',
      affiliationRole: 'Wellness Entrepreneur',
      relationships: "Harper's sorority sister. Former Victoria's Secret model.",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Wellness',
      background: "One of Harper's sorority sisters. Former Victoria's Secret model who leveraged her platform and health expertise to become a wellness entrepreneur. Brings glamour and wellness industry connections to the Wives Club.",
    },

    // ========== SLOANE BISHOP ==========
    {
      name: 'Sloane Bishop',
      firstName: 'Sloane',
      lastName: 'Bishop',
      archetype: 'TV Actress',
      careerHistory: 'TV actress on a drama show.',
      affiliationRole: 'TV Actress',
      relationships: "Harper's sorority sister. TV drama actress.",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Entertainment',
      background: "One of Harper's sorority sisters. Working TV actress starring in a drama series. Brings Hollywood connections and entertainment industry insight to the Wives Club network.",
    },

    // ========== RILEY ST JAMES & EVAN MADDOX ==========
    {
      name: 'Riley St James',
      firstName: 'Riley',
      lastName: 'St James',
      archetype: 'Luxury Lifestyle Influencer',
      careerHistory: 'Luxury lifestyle influencer.',
      affiliationRole: 'Luxury Lifestyle Influencer',
      relationships: "Harper's sorority sister. Married to Evan Maddox (NFL QB, Patriots).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Influencer',
      background: "One of Harper's sorority sisters. Built a major following as a luxury lifestyle influencer. Married to NFL quarterback Evan Maddox of the New England Patriots.",
    },
    {
      name: 'Evan Maddox',
      firstName: 'Evan',
      lastName: 'Maddox',
      archetype: 'NFL Quarterback',
      careerHistory: 'NFL Quarterback for the New England Patriots.',
      affiliationRole: 'NFL QB - Patriots',
      relationships: "Married to Riley St James (luxury lifestyle influencer, Harper's sorority sister).",
      background: 'NFL quarterback for the New England Patriots. Part of the athletes network connected to BSS through his wife\'s Wives Club connections.',
    },

    // ========== CAROLINE WESTBROOK (or VANCE) ==========
    {
      name: 'Caroline Westbrook',
      firstName: 'Caroline',
      lastName: 'Westbrook',
      nameVariants: 'Caroline Vance',
      archetype: 'Quant Analyst / Journalist / Professor / BSS Consultant',
      careerHistory: 'Wall Street Quant analyst. Turned journalist. Now professor. Works for Jasper at BSS from time to time.',
      affiliationRole: 'BSS Consultant / Professor',
      bssRole: 'Part-Time Consultant',
      relationships: "Harper's sorority sister. Works for Jasper at BSS part-time.",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Finance-Media-Academia',
      background: "One of Harper's sorority sisters. Remarkable career arc from Wall Street quant analyst to journalist to professor. Works for Jasper at BSS from time to time, bringing her unique blend of financial analysis, media savvy, and academic rigor to crisis situations.",
    },

    // ========== SOFIA (Ethan Cross's wife) ==========
    {
      name: 'Sofia Cross',
      firstName: 'Sofia',
      lastName: 'Cross',
      archetype: 'International Arts & Tech',
      careerHistory: 'Potential job with international arts and tech collaboration.',
      affiliationRole: 'Arts & Tech Collaboration',
      relationships: "Harper's sorority sister. Married to Ethan Cross (BSS Excon, also known as Rafe).",
      wivesClubRole: 'Core Circle - Harper Sorority Sister / Arts-Tech',
      background: "One of Harper's sorority sisters. Married to Ethan Cross (the BSS Excon, possibly also known as Rafe in some versions). Has a potential role with an international arts and technology collaboration, bridging creative and tech worlds.",
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

  // Update Ethan Cross (Excon) with Sofia as wife
  const ethanCross = await prisma.character.findFirst({
    where: {
      name: { contains: 'Ethan Cross' },
      bssRole: { contains: 'Excon' }
    }
  });
  if (ethanCross) {
    await prisma.character.update({
      where: { id: ethanCross.id },
      data: {
        nameVariants: 'Rafe',
        relationships: "Married to Sofia Cross (Harper's sorority sister, arts & tech). BSS Excon based in Charlotte.",
      }
    });
    console.log('Updated Ethan Cross with Sofia as wife and Rafe alias');
  }

  // Update Harper with additional sorority sisters
  const harper = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });
  if (harper) {
    await prisma.character.update({
      where: { id: harper.id },
      data: {
        relationships: `Married to Matthew Keating (shipping magnate). Three children: Isabella "Izzy" (9), twins Nicolas "Nico" and Sofia (7). Au pair: Chiara Benedetti (Florence). Strategic partners with Jasper. Sorority sisters: Madison "Maddie" Cole, Vivienne "Viv" Ross, Natalia "Talia" Cruz, Camille "Cam" Whitmore, Isabella "Izzy" Santoro, Madeline "Maddie" Cross, Sloane Bishop, Riley St James, Caroline Westbrook, Sofia Cross. Mentor to Bella, Kendra, Selene.`,
      }
    });
    console.log('\nUpdated Harper with all sorority sisters');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
