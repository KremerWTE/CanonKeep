import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Adding BSS Traveling Fixers...\n');

  // Create/update Addie
  const addie = await prisma.character.findFirst({
    where: { name: { contains: 'Addie' } }
  });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        relationships: 'Married to Hawk. BSS traveling fixer.',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Married to Hawk. Works crisis management cases across multiple locations.',
      }
    });
    console.log('Updated: Addie (Traveling Fixer)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Addie',
        firstName: 'Addie',
        archetype: 'BSS Traveling Fixer',
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        relationships: 'Married to Hawk. BSS traveling fixer.',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Married to Hawk. Works crisis management cases across multiple locations.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Addie (Traveling Fixer)');
  }

  // Create/update Hawk (Addie's husband)
  const hawk = await prisma.character.findFirst({
    where: { name: { contains: 'Hawk' } }
  });

  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        relationships: 'Married to Addie (BSS Traveling Fixer).',
      }
    });
    console.log('Updated: Hawk');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Hawk',
        firstName: 'Hawk',
        archetype: 'BSS Connected',
        relationships: 'Married to Addie (BSS Traveling Fixer).',
        background: 'Married to Addie, a traveling fixer for BSS.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Hawk (Addie\'s husband)');
  }

  // Create/update Danny Russo (or Marchand)
  const danny = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Danny Russo' } },
        { name: { contains: 'Danny Marchand' } },
        { firstName: 'Danny' },
      ]
    }
  });

  if (danny) {
    await prisma.character.update({
      where: { id: danny.id },
      data: {
        name: 'Danny Russo',
        firstName: 'Danny',
        lastName: 'Russo',
        nameVariants: 'Danny Marchand',
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        archetype: 'BSS Traveling Fixer',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Also known as Danny Marchand in some edits. Works crisis management cases across multiple locations.',
      }
    });
    console.log('Updated: Danny Russo (Traveling Fixer)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Danny Russo',
        firstName: 'Danny',
        lastName: 'Russo',
        nameVariants: 'Danny Marchand',
        archetype: 'BSS Traveling Fixer',
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Also known as Danny Marchand in some edits. Works crisis management cases across multiple locations.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Danny Russo (Traveling Fixer)');
  }

  // Update Harper with Traveling Fixer role
  const harper = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });

  if (harper) {
    await prisma.character.update({
      where: { id: harper.id },
      data: {
        bssRole: 'Co-Founder / Traveling Fixer',
        affiliationRole: 'BSS Co-Founder & Traveling Fixer',
        background: 'Co-founder of BSS with Jasper Barrett and traveling fixer. BSS is a corporate crisis management firm. Married to Matthew Keating (Trident Global Risk Solutions, Miami shipping). Strategic voice in the Wives Club.',
      }
    });
    console.log('Updated: Harper (Co-Founder / Traveling Fixer)');
  }

  // Update Jasper with Traveling Fixer role
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });

  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        bssRole: 'Founder / Principal / Traveling Fixer',
        affiliationRole: 'BSS Founder & Traveling Fixer',
        background: `Lives on a large compound outside Charlotte, NC in the foothills of the Appalachian Mountains. The estate features many guest rooms and extensive land. Started in Construction Management as a PM before being found by Jessica Hall. Founder and principal of BSS (Barrett Security Solutions), a corporate crisis management firm. Also serves as a traveling fixer, working cases personally across multiple locations. BSS employs tier operators, cyber analysts, and fixers who are elite problem solvers.`,
      }
    });
    console.log('Updated: Jasper Barrett (Founder / Traveling Fixer)');
  }

  // Update Kendra - becomes a fixer (traveling)
  const kendra = await prisma.character.findFirst({
    where: { name: { contains: 'Kendra' } }
  });

  if (kendra) {
    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Elite problem solver specializing in crisis resolution. Works cases across multiple locations.',
      }
    });
    console.log('Updated: Kendra (Traveling Fixer)');
  }

  // Create/update Bella - becomes a fixer
  const bella = await prisma.character.findFirst({
    where: { name: { contains: 'Bella' } }
  });

  if (bella) {
    await prisma.character.update({
      where: { id: bella.id },
      data: {
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Elite problem solver working crisis management cases.',
      }
    });
    console.log('Updated: Bella (Traveling Fixer)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Bella',
        firstName: 'Bella',
        archetype: 'BSS Traveling Fixer',
        bssRole: 'Traveling Fixer',
        affiliationRole: 'BSS Traveling Fixer',
        background: 'Traveling fixer for BSS (Barrett Security Solutions). Elite problem solver working crisis management cases.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Bella (Traveling Fixer)');
  }

  console.log('\n=== BSS Traveling Fixers ===');
  console.log('- Jasper Barrett (Founder)');
  console.log('- Harper Steele (Co-Founder)');
  console.log('- Addie (married to Hawk)');
  console.log('- Danny Russo (aka Marchand)');
  console.log('- Kendra');
  console.log('- Bella');

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
