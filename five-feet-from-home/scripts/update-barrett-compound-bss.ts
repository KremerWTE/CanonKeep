import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Barrett Compound and BSS details...\n');

  // Update Jasper Barrett with compound location
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });

  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        hubLocation: 'Charlotte, NC (Appalachian Foothills)',
        background: `Lives on a large compound outside Charlotte, NC in the foothills of the Appalachian Mountains. The estate features many guest rooms and extensive land. Started in Construction Management as a PM before being found by Jessica Hall. Co-founder and leader of BSS (Barrett Security Solutions), a corporate crisis management firm that solves all types of crises and conflicts. BSS employs tier operators, cyber analysts, and fixers who are elite problem solvers.`,
        bssRole: 'Founder / Principal',
        affiliationRole: 'BSS Founder - Corporate Crisis Management',
      }
    });
    console.log('Updated Jasper Barrett with compound location and BSS role');
  }

  // Update Elena Barrett with compound location
  const elena = await prisma.character.findFirst({
    where: { name: { contains: 'Elena Barrett' } }
  });

  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        hubLocation: 'Charlotte, NC (Appalachian Foothills)',
        background: `Lives on the Barrett family compound outside Charlotte, NC in the foothills of the Appalachian Mountains. Former luxury real estate agent and literary non-profit organizer. Elite party planner who started in high society. Now a southern mother raising Grace (1st grade at start of Book 1) and baby Lucas. CEO of Maison Aurelia.`,
      }
    });
    console.log('Updated Elena Barrett with compound location');
  }

  // Update Harper with BSS co-founder role
  const harper = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });

  if (harper) {
    await prisma.character.update({
      where: { id: harper.id },
      data: {
        bssRole: 'Co-Founder',
        affiliationRole: 'BSS Co-Founder - Corporate Crisis Management',
        background: `Co-founder of BSS with Jasper Barrett. BSS is a corporate crisis management firm that solves all types of crises and conflicts. Married to Matthew Keating (Trident Global Risk Solutions, Miami shipping). Strategic voice in the Wives Club.`,
      }
    });
    console.log('Updated Harper with BSS co-founder details');
  }

  // Update Holt with more BSS details
  const holt = await prisma.character.findFirst({
    where: { name: 'Holt' }
  });

  if (holt) {
    await prisma.character.update({
      where: { id: holt.id },
      data: {
        bssRole: 'Tier 1 Operator',
        background: 'Tier 1 special operations operator employed by BSS. BSS is a corporate crisis management firm that hires tier operators, cyber analysts, and fixers who are elite problem solvers.',
        affiliationRole: 'BSS Tier 1 Operator - Elite Problem Solver',
      }
    });
    console.log('Updated Holt with BSS operator details');
  }

  // Update Jessica Hall with BSS connection
  const jessica = await prisma.character.findFirst({
    where: { name: { contains: 'Jessica Hall' } }
  });

  if (jessica) {
    await prisma.character.update({
      where: { id: jessica.id },
      data: {
        bssRole: 'Mentor / Advisor',
        background: `Jasper Barrett's mentor who discovered him when he was in Construction Management. Connected to BSS operations. Also known as Maddox and Vaughn in some edits.`,
      }
    });
    console.log('Updated Jessica Hall with BSS mentor role');
  }

  // Update Jack Maddox - may work with BSS
  const maddox = await prisma.character.findFirst({
    where: { name: { contains: 'Jack Maddox' } }
  });

  if (maddox) {
    await prisma.character.update({
      where: { id: maddox.id },
      data: {
        background: 'Retired Colonel and former Tier 1 general who now owns a security consultant firm. Part of Jasper\'s network of military and security contacts. May collaborate with BSS on crisis management operations.',
      }
    });
    console.log('Updated COL Jack Maddox');
  }

  // Update Brendan Cho - intelligence contact for BSS
  const brendan = await prisma.character.findFirst({
    where: { name: { contains: 'Brendan Cho' } }
  });

  if (brendan) {
    await prisma.character.update({
      where: { id: brendan.id },
      data: {
        bssRole: 'Intelligence Contact',
        background: 'CIA Agent who serves as Jasper\'s intelligence contact. Provides information and resources for BSS crisis management operations.',
      }
    });
    console.log('Updated Brendan Cho with intelligence contact role');
  }

  console.log('\n=== BSS Organization Summary ===');
  console.log('BSS (Barrett Security Solutions)');
  console.log('Type: Corporate Crisis Management Firm');
  console.log('Services: Solves all types of crises and conflicts');
  console.log('Staff: Tier operators, cyber analysts, fixers (elite problem solvers)');
  console.log('Location: Based from Barrett Compound, Charlotte NC area');

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
