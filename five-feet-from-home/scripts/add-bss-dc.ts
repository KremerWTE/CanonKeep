import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Adding BSS DC Team...\n');

  // Carolina Bauer - Fixer + DC Office Lead
  const carolinaB = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Carolina Bauer' } },
        { firstName: 'Carolina', lastName: 'Bauer' },
      ]
    }
  });

  if (carolinaB) {
    await prisma.character.update({
      where: { id: carolinaB.id },
      data: {
        bssRole: 'Fixer / DC Office Lead',
        hubLocation: 'Washington D.C.',
        affiliationRole: 'BSS DC - Fixer & Office Lead',
        background: 'Fixer for BSS (Barrett Security Solutions) who runs the Washington D.C. office.',
      }
    });
    console.log('Updated: Carolina Bauer (Fixer / Office Lead - DC)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Carolina Bauer',
        firstName: 'Carolina',
        lastName: 'Bauer',
        archetype: 'BSS Fixer / Office Lead',
        bssRole: 'Fixer / DC Office Lead',
        hubLocation: 'Washington D.C.',
        affiliationRole: 'BSS DC - Fixer & Office Lead',
        background: 'Fixer for BSS (Barrett Security Solutions) who runs the Washington D.C. office.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Carolina Bauer (Fixer / Office Lead - DC)');
  }

  // Patch (OC) - DC → CLT, creates central cyber team with Cipher
  const patch = await prisma.character.findFirst({
    where: { name: 'Patch' }
  });

  if (patch) {
    await prisma.character.update({
      where: { id: patch.id },
      data: {
        bssRole: 'Operator / Cyber',
        hubLocation: 'Washington D.C. → Charlotte, NC',
        affiliationRole: 'BSS - Operator/Cyber (Central Cyber Team Lead)',
        relationships: 'In a relationship with Amanda. Moved from DC to CLT to create central cyber team with Cipher.',
        background: 'Operator and cyber specialist for BSS. Originally based in DC, relocated to Charlotte to build the central cyber team with Cipher and Grayson.',
      }
    });
    console.log('Updated: Patch (Operator/Cyber - DC → CLT)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Patch',
        firstName: 'Patch',
        archetype: 'BSS Operator/Cyber',
        bssRole: 'Operator / Cyber',
        hubLocation: 'Washington D.C. → Charlotte, NC',
        affiliationRole: 'BSS - Operator/Cyber (Central Cyber Team Lead)',
        relationships: 'In a relationship with Amanda. Moved from DC to CLT to create central cyber team with Cipher.',
        background: 'Operator and cyber specialist for BSS. Originally based in DC, relocated to Charlotte to build the central cyber team with Cipher and Grayson.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Patch (Operator/Cyber - DC → CLT)');
  }

  // Amanda (Patch's partner)
  const amanda = await prisma.character.findFirst({
    where: { name: 'Amanda' }
  });

  if (amanda) {
    await prisma.character.update({
      where: { id: amanda.id },
      data: {
        relationships: 'In a relationship with Patch (BSS Operator/Cyber).',
      }
    });
    console.log('Updated: Amanda (Patch\'s partner)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Amanda',
        firstName: 'Amanda',
        archetype: 'BSS Connected',
        relationships: 'In a relationship with Patch (BSS Operator/Cyber).',
        hubLocation: 'Charlotte, NC',
        background: 'Partner of Patch, who moved from DC to Charlotte to lead the central cyber team.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Amanda (Patch\'s partner)');
  }

  // Grayson - Central Cyber Team (CLT)
  const grayson = await prisma.character.findFirst({
    where: { name: 'Grayson' }
  });

  if (grayson) {
    await prisma.character.update({
      where: { id: grayson.id },
      data: {
        bssRole: 'Cyber',
        hubLocation: 'Charlotte, NC',
        affiliationRole: 'BSS CLT - Central Cyber Team',
        background: 'Cyber specialist for BSS (Barrett Security Solutions). Part of the central cyber team in Charlotte with Patch and Cipher.',
      }
    });
    console.log('Updated: Grayson (Cyber - CLT Central Team)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Grayson',
        firstName: 'Grayson',
        archetype: 'BSS Cyber',
        bssRole: 'Cyber',
        hubLocation: 'Charlotte, NC',
        affiliationRole: 'BSS CLT - Central Cyber Team',
        background: 'Cyber specialist for BSS (Barrett Security Solutions). Part of the central cyber team in Charlotte with Patch and Cipher.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Grayson (Cyber - CLT Central Team)');
  }

  // Update Cipher to note central cyber team
  const cipher = await prisma.character.findFirst({
    where: { name: 'Cipher' }
  });

  if (cipher) {
    await prisma.character.update({
      where: { id: cipher.id },
      data: {
        background: 'Cyber specialist for BSS (Barrett Security Solutions). Part of the central cyber team in Charlotte with Patch and Grayson. Goes by the callsign "Cipher".',
        affiliationRole: 'BSS CLT - Central Cyber Team',
      }
    });
    console.log('Updated: Cipher (Central Cyber Team)');
  }

  console.log('\n=== BSS DC Team ===');
  console.log('- Carolina Bauer (Fixer / Office Lead)');
  console.log('- Patch (Operator/Cyber) - moved to CLT');

  console.log('\n=== BSS Central Cyber Team (CLT) ===');
  console.log('- Patch (Team Lead, from DC)');
  console.log('- Cipher');
  console.log('- Grayson');

  // ========== MIDWEST TEAM ==========
  console.log('\nAdding BSS Midwest Team...\n');

  // Claire (F) - Fixer / Runs Midwest office
  const claire = await prisma.character.findFirst({
    where: { name: 'Claire' }
  });

  if (claire) {
    await prisma.character.update({
      where: { id: claire.id },
      data: {
        bssRole: 'Fixer / Midwest Office Lead',
        hubLocation: 'Midwest',
        affiliationRole: 'BSS Midwest - Fixer & Office Lead',
        background: 'Fixer for BSS (Barrett Security Solutions) who runs the Midwest office.',
      }
    });
    console.log('Updated: Claire (Fixer / Office Lead - Midwest)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Claire',
        firstName: 'Claire',
        archetype: 'BSS Fixer / Office Lead',
        bssRole: 'Fixer / Midwest Office Lead',
        hubLocation: 'Midwest',
        affiliationRole: 'BSS Midwest - Fixer & Office Lead',
        background: 'Fixer for BSS (Barrett Security Solutions) who runs the Midwest office.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Claire (Fixer / Office Lead - Midwest)');
  }

  // Mark (Analyst) - Midwest
  const markMW = await prisma.character.findFirst({
    where: {
      name: 'Mark',
      hubLocation: { contains: 'Midwest' }
    }
  });

  if (markMW) {
    await prisma.character.update({
      where: { id: markMW.id },
      data: {
        bssRole: 'Analyst',
        hubLocation: 'Midwest',
        affiliationRole: 'BSS Midwest - Analyst',
      }
    });
    console.log('Updated: Mark (Analyst - Midwest)');
  } else {
    // Check if any Mark exists without location
    const anyMark = await prisma.character.findFirst({
      where: {
        firstName: 'Mark',
        bssRole: null
      }
    });

    if (anyMark) {
      await prisma.character.update({
        where: { id: anyMark.id },
        data: {
          bssRole: 'Analyst',
          hubLocation: 'Midwest',
          affiliationRole: 'BSS Midwest - Analyst',
          background: 'Analyst for BSS (Barrett Security Solutions) based in the Midwest office.',
        }
      });
      console.log('Updated: Mark (Analyst - Midwest)');
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          name: 'Mark (Midwest)',
          firstName: 'Mark',
          archetype: 'BSS Analyst',
          bssRole: 'Analyst',
          hubLocation: 'Midwest',
          affiliationRole: 'BSS Midwest - Analyst',
          background: 'Analyst for BSS (Barrett Security Solutions) based in the Midwest office.',
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log('Created: Mark (Analyst - Midwest)');
    }
  }

  // Riley (Analyst) - Midwest (different from Riley Office Manager in CLT)
  await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Riley (Midwest)',
      firstName: 'Riley',
      archetype: 'BSS Analyst',
      bssRole: 'Analyst',
      hubLocation: 'Midwest',
      affiliationRole: 'BSS Midwest - Analyst',
      background: 'Analyst for BSS (Barrett Security Solutions) based in the Midwest office.',
      sourceFiles: 'Canon update',
      isConfirmed: true,
    }
  });
  console.log('Created: Riley (Analyst - Midwest)');

  // Theo (OC) - Midwest Operator/Cyber
  const theo = await prisma.character.findFirst({
    where: { name: 'Theo' }
  });

  if (theo) {
    await prisma.character.update({
      where: { id: theo.id },
      data: {
        bssRole: 'Operator / Cyber',
        hubLocation: 'Midwest',
        affiliationRole: 'BSS Midwest - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in the Midwest office.',
      }
    });
    console.log('Updated: Theo (Operator/Cyber - Midwest)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Theo',
        firstName: 'Theo',
        archetype: 'BSS Operator/Cyber',
        bssRole: 'Operator / Cyber',
        hubLocation: 'Midwest',
        affiliationRole: 'BSS Midwest - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in the Midwest office.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Theo (Operator/Cyber - Midwest)');
  }

  console.log('\n=== BSS Midwest Team ===');
  console.log('- Claire (Fixer / Office Lead)');
  console.log('- Mark (Analyst)');
  console.log('- Riley (Analyst)');
  console.log('- Theo (Operator/Cyber)');

  // ========== AFRICA TEAM ==========
  console.log('\nAdding BSS Africa Team...\n');

  // Bear (O) - Africa Operator
  const bear = await prisma.character.findFirst({
    where: { name: 'Bear' }
  });

  if (bear) {
    await prisma.character.update({
      where: { id: bear.id },
      data: {
        bssRole: 'Operator',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Africa. Goes by callsign "Bear".',
      }
    });
    console.log('Updated: Bear (Operator - Africa)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Bear',
        firstName: 'Bear',
        archetype: 'BSS Operator',
        bssRole: 'Operator',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Operator',
        background: 'Tier operator for BSS (Barrett Security Solutions) based in Africa. Goes by callsign "Bear".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Bear (Operator - Africa)');
  }

  // Switch (OC) - Africa Operator/Cyber
  const switchChar = await prisma.character.findFirst({
    where: { name: 'Switch' }
  });

  if (switchChar) {
    await prisma.character.update({
      where: { id: switchChar.id },
      data: {
        bssRole: 'Operator / Cyber',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Africa. Goes by callsign "Switch".',
      }
    });
    console.log('Updated: Switch (Operator/Cyber - Africa)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Switch',
        firstName: 'Switch',
        archetype: 'BSS Operator/Cyber',
        bssRole: 'Operator / Cyber',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Africa. Goes by callsign "Switch".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Switch (Operator/Cyber - Africa)');
  }

  // Shade (OC) - Africa Operator/Cyber
  const shade = await prisma.character.findFirst({
    where: { name: 'Shade' }
  });

  if (shade) {
    await prisma.character.update({
      where: { id: shade.id },
      data: {
        bssRole: 'Operator / Cyber',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Africa. Goes by callsign "Shade".',
      }
    });
    console.log('Updated: Shade (Operator/Cyber - Africa)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Shade',
        firstName: 'Shade',
        archetype: 'BSS Operator/Cyber',
        bssRole: 'Operator / Cyber',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Operator/Cyber',
        background: 'Operator and cyber specialist for BSS (Barrett Security Solutions) based in Africa. Goes by callsign "Shade".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Shade (Operator/Cyber - Africa)');
  }

  // David Okoro (Analyst) - Africa
  const davidO = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'David Okoro' } },
        { firstName: 'David', lastName: 'Okoro' },
      ]
    }
  });

  if (davidO) {
    await prisma.character.update({
      where: { id: davidO.id },
      data: {
        bssRole: 'Analyst',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Analyst',
        background: 'Analyst for BSS (Barrett Security Solutions) based in Africa.',
      }
    });
    console.log('Updated: David Okoro (Analyst - Africa)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'David Okoro',
        firstName: 'David',
        lastName: 'Okoro',
        archetype: 'BSS Analyst',
        bssRole: 'Analyst',
        hubLocation: 'Africa',
        affiliationRole: 'BSS Africa - Analyst',
        background: 'Analyst for BSS (Barrett Security Solutions) based in Africa.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: David Okoro (Analyst - Africa)');
  }

  console.log('\n=== BSS Africa Team ===');
  console.log('- Bear (Operator)');
  console.log('- Switch (Operator/Cyber)');
  console.log('- Shade (Operator/Cyber)');
  console.log('- David Okoro (Analyst)');

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
