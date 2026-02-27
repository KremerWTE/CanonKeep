import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Adding BSS Asia Team...\n');

  // Update Ridge - starts in Asia, moves to CLT after marrying Julia Raines
  const ridge = await prisma.character.findFirst({
    where: { name: { contains: 'Ridge' } }
  });

  if (ridge) {
    await prisma.character.update({
      where: { id: ridge.id },
      data: {
        hubLocation: 'Asia → Charlotte, NC',
        relationships: 'Married to Julia Raines. Started at BSS Asia hub, moved to Charlotte HQ after marriage.',
        background: 'Tier operator for BSS (Barrett Security Solutions). Originally based in Asia, relocated to Charlotte HQ after marrying Julia Raines.',
      }
    });
    console.log('Updated: Ridge (Asia → CLT after marrying Julia Raines)');
  }

  // Create Julia Raines (Ridge's wife)
  const julia = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Julia Raines' } },
        { firstName: 'Julia', lastName: 'Raines' },
      ]
    }
  });

  if (julia) {
    await prisma.character.update({
      where: { id: julia.id },
      data: {
        relationships: 'Married to Ridge (BSS Operator).',
        hubLocation: 'Charlotte, NC',
      }
    });
    console.log('Updated: Julia Raines');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Julia Raines',
        firstName: 'Julia',
        lastName: 'Raines',
        archetype: 'BSS Family',
        relationships: 'Married to Ridge (BSS Operator).',
        hubLocation: 'Charlotte, NC',
        background: 'Married to Ridge, a BSS operator who was originally based in Asia and relocated to Charlotte after their marriage.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Julia Raines (Ridge\'s wife)');
  }

  // Create/update Evan Cross (OCFA) - Asia based
  // Note: This may be different from Evan (OCF) in CLT or Ethan Cross
  const evanCross = await prisma.character.findFirst({
    where: {
      OR: [
        { name: 'Evan Cross' },
        { firstName: 'Evan', lastName: 'Cross' },
      ]
    }
  });

  if (evanCross) {
    await prisma.character.update({
      where: { id: evanCross.id },
      data: {
        bssRole: 'Operator / Cyber / Fixer / Analyst',
        hubLocation: 'Asia',
        affiliationRole: 'BSS Asia - Operator/Cyber/Fixer/Analyst',
        background: 'Multi-talented BSS operative based in Asia with skills as Operator, Cyber specialist, Fixer, and Analyst. One of the most versatile members of the team.',
      }
    });
    console.log('Updated: Evan Cross (OCFA - Asia)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Evan Cross',
        firstName: 'Evan',
        lastName: 'Cross',
        archetype: 'BSS Multi-Role Operative',
        bssRole: 'Operator / Cyber / Fixer / Analyst',
        hubLocation: 'Asia',
        affiliationRole: 'BSS Asia - Operator/Cyber/Fixer/Analyst',
        background: 'Multi-talented BSS operative based in Asia with skills as Operator, Cyber specialist, Fixer, and Analyst. One of the most versatile members of the team.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Evan Cross (OCFA - Asia)');
  }

  // Create/update Tom Hawkins (O) - Asia based Operator
  const tom = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Tom Hawkins' } },
        { firstName: 'Tom', lastName: 'Hawkins' },
      ]
    }
  });

  if (tom) {
    await prisma.character.update({
      where: { id: tom.id },
      data: {
        bssRole: 'Operator',
        hubLocation: 'Asia',
        affiliationRole: 'BSS Asia - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Asia. Handles high-risk field operations in the Asia region.',
      }
    });
    console.log('Updated: Tom Hawkins (Operator - Asia)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Tom Hawkins',
        firstName: 'Tom',
        lastName: 'Hawkins',
        archetype: 'BSS Operator',
        bssRole: 'Operator',
        hubLocation: 'Asia',
        affiliationRole: 'BSS Asia - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Asia. Handles high-risk field operations in the Asia region.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Tom Hawkins (Operator - Asia)');
  }

  // Create/update Dean (O) - Asia based Operator
  const dean = await prisma.character.findFirst({
    where: { name: 'Dean' }
  });

  if (dean) {
    await prisma.character.update({
      where: { id: dean.id },
      data: {
        bssRole: 'Operator',
        hubLocation: 'Asia',
        affiliationRole: 'BSS Asia - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Asia. Handles high-risk field operations in the Asia region.',
      }
    });
    console.log('Updated: Dean (Operator - Asia)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Dean',
        firstName: 'Dean',
        archetype: 'BSS Operator',
        bssRole: 'Operator',
        hubLocation: 'Asia',
        affiliationRole: 'BSS Asia - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Asia. Handles high-risk field operations in the Asia region.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Dean (Operator - Asia)');
  }

  console.log('\n=== BSS Asia Team ===');
  console.log('- Ridge (Operator) - moved to CLT after marrying Julia Raines');
  console.log('- Evan Cross (Operator/Cyber/Fixer/Analyst)');
  console.log('- Tom Hawkins (Operator)');
  console.log('- Dean (Operator)');

  // ========== EUROPE TEAM ==========
  console.log('\nAdding BSS Europe Team...\n');

  // Ghost (O) - Europe Operator
  const ghost = await prisma.character.findFirst({
    where: { name: 'Ghost' }
  });

  if (ghost) {
    await prisma.character.update({
      where: { id: ghost.id },
      data: {
        bssRole: 'Operator',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Europe. Goes by callsign "Ghost".',
      }
    });
    console.log('Updated: Ghost (Operator - Europe)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Ghost',
        firstName: 'Ghost',
        archetype: 'BSS Operator',
        bssRole: 'Operator',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Europe. Goes by callsign "Ghost".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Ghost (Operator - Europe)');
  }

  // Hoya (O) - Europe Operator
  const hoya = await prisma.character.findFirst({
    where: { name: 'Hoya' }
  });

  if (hoya) {
    await prisma.character.update({
      where: { id: hoya.id },
      data: {
        bssRole: 'Operator',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Europe.',
      }
    });
    console.log('Updated: Hoya (Operator - Europe)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Hoya',
        firstName: 'Hoya',
        archetype: 'BSS Operator',
        bssRole: 'Operator',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Europe.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Hoya (Operator - Europe)');
  }

  // Dax (OC) - Europe Operator/Cyber
  const dax = await prisma.character.findFirst({
    where: { name: 'Dax' }
  });

  if (dax) {
    await prisma.character.update({
      where: { id: dax.id },
      data: {
        bssRole: 'Operator / Cyber',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Europe.',
      }
    });
    console.log('Updated: Dax (Operator/Cyber - Europe)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Dax',
        firstName: 'Dax',
        archetype: 'BSS Operator/Cyber',
        bssRole: 'Operator / Cyber',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Europe.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Dax (Operator/Cyber - Europe)');
  }

  // Sofia Ritcher (FA) - Europe Fixer/Analyst
  const sofiaR = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Sofia Ritcher' } },
        { firstName: 'Sofia', lastName: 'Ritcher' },
      ]
    }
  });

  if (sofiaR) {
    await prisma.character.update({
      where: { id: sofiaR.id },
      data: {
        bssRole: 'Fixer / Analyst',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Fixer/Analyst',
        background: 'Fixer and analyst for BSS (Barrett Security Solutions) based in Europe.',
      }
    });
    console.log('Updated: Sofia Ritcher (Fixer/Analyst - Europe)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Sofia Ritcher',
        firstName: 'Sofia',
        lastName: 'Ritcher',
        archetype: 'BSS Fixer/Analyst',
        bssRole: 'Fixer / Analyst',
        hubLocation: 'Europe',
        affiliationRole: 'BSS Europe - Fixer/Analyst',
        background: 'Fixer and analyst for BSS (Barrett Security Solutions) based in Europe.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Sofia Ritcher (Fixer/Analyst - Europe)');
  }

  console.log('\n=== BSS Europe Team ===');
  console.log('- Ghost (Operator)');
  console.log('- Hoya (Operator)');
  console.log('- Dax (Operator/Cyber)');
  console.log('- Sofia Ritcher (Fixer/Analyst)');

  // ========== MIAMI TEAM (Harper's Office) ==========
  console.log('\nAdding BSS Miami Team...\n');

  // Update Harper as Miami office leader
  const harperMiami = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });

  if (harperMiami) {
    await prisma.character.update({
      where: { id: harperMiami.id },
      data: {
        hubLocation: 'Miami',
        bssRole: 'Co-Founder / Miami Office Lead / Traveling Fixer',
        affiliationRole: 'BSS Co-Founder & Miami Office Lead',
        background: 'Co-founder of BSS with Jasper Barrett. Leads the Miami office and serves as a traveling fixer. Married to Matthew Keating (Trident Global Risk Solutions, Miami shipping). Strategic voice in the Wives Club.',
      }
    });
    console.log('Updated: Harper (Miami Office Lead)');
  }

  // Troy (OC) - Miami Operator/Cyber
  const troy = await prisma.character.findFirst({
    where: { name: 'Troy' }
  });

  if (troy) {
    await prisma.character.update({
      where: { id: troy.id },
      data: {
        bssRole: 'Operator / Cyber',
        hubLocation: 'Miami',
        affiliationRole: 'BSS Miami - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Miami under Harper\'s leadership.',
      }
    });
    console.log('Updated: Troy (Operator/Cyber - Miami)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Troy',
        firstName: 'Troy',
        archetype: 'BSS Operator/Cyber',
        bssRole: 'Operator / Cyber',
        hubLocation: 'Miami',
        affiliationRole: 'BSS Miami - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Miami under Harper\'s leadership.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Troy (Operator/Cyber - Miami)');
  }

  console.log('\n=== BSS Miami Team ===');
  console.log('- Harper (Office Lead)');
  console.log('- Troy (Operator/Cyber)');

  // ========== LA TEAM ==========
  console.log('\nAdding BSS LA Team...\n');

  // Jordan Cross - NFL Agent + Fixer + BSS Agent (part time)
  const jordan = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Jordan Cross' } },
        { firstName: 'Jordan', lastName: 'Cross' },
      ]
    }
  });

  if (jordan) {
    await prisma.character.update({
      where: { id: jordan.id },
      data: {
        bssRole: 'Fixer / Agent (Part-Time)',
        hubLocation: 'Los Angeles',
        affiliationRole: 'BSS LA - Fixer/Agent (Part-Time) + NFL Agent',
        careerHistory: 'NFL Agent. Part-time BSS Fixer and Agent.',
        background: 'NFL agent who also works as a part-time fixer and agent for BSS (Barrett Security Solutions) in Los Angeles.',
      }
    });
    console.log('Updated: Jordan Cross (NFL Agent + Fixer - LA)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Jordan Cross',
        firstName: 'Jordan',
        lastName: 'Cross',
        archetype: 'NFL Agent / BSS Fixer',
        bssRole: 'Fixer / Agent (Part-Time)',
        hubLocation: 'Los Angeles',
        affiliationRole: 'BSS LA - Fixer/Agent (Part-Time) + NFL Agent',
        careerHistory: 'NFL Agent. Part-time BSS Fixer and Agent.',
        background: 'NFL agent who also works as a part-time fixer and agent for BSS (Barrett Security Solutions) in Los Angeles.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Jordan Cross (NFL Agent + Fixer - LA)');
  }

  // Nico (O) - LA Operator
  const nico = await prisma.character.findFirst({
    where: { name: 'Nico' }
  });

  if (nico) {
    await prisma.character.update({
      where: { id: nico.id },
      data: {
        bssRole: 'Operator',
        hubLocation: 'Los Angeles',
        affiliationRole: 'BSS LA - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Los Angeles.',
      }
    });
    console.log('Updated: Nico (Operator - LA)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Nico',
        firstName: 'Nico',
        archetype: 'BSS Operator',
        bssRole: 'Operator',
        hubLocation: 'Los Angeles',
        affiliationRole: 'BSS LA - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Los Angeles.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Nico (Operator - LA)');
  }

  // Update Danny Russo - LA based fixer
  const dannyLA = await prisma.character.findFirst({
    where: { name: { contains: 'Danny Russo' } }
  });

  if (dannyLA) {
    await prisma.character.update({
      where: { id: dannyLA.id },
      data: {
        hubLocation: 'Los Angeles',
        affiliationRole: 'BSS LA - Fixer',
        background: 'Fixer for BSS (Barrett Security Solutions) based in Los Angeles. Also known as Danny Marchand in some edits.',
      }
    });
    console.log('Updated: Danny Russo (Fixer - LA)');
  }

  console.log('\n=== BSS LA Team ===');
  console.log('- Jordan Cross (NFL Agent + Fixer/Agent Part-Time)');
  console.log('- Nico (Operator)');
  console.log('- Danny Russo (Fixer)');

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
