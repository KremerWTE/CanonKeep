import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Adding BSS Boston Team...\n');

  // Phantom (C) - Boston Cyber
  const phantom = await prisma.character.findFirst({
    where: { name: 'Phantom' }
  });

  if (phantom) {
    await prisma.character.update({
      where: { id: phantom.id },
      data: {
        bssRole: 'Cyber',
        hubLocation: 'Boston',
        affiliationRole: 'BSS Boston - Cyber',
        background: 'Cyber specialist for BSS (Barrett Security Solutions) based in Boston. Goes by callsign "Phantom".',
      }
    });
    console.log('Updated: Phantom (Cyber - Boston)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Phantom',
        firstName: 'Phantom',
        archetype: 'BSS Cyber',
        bssRole: 'Cyber',
        hubLocation: 'Boston',
        affiliationRole: 'BSS Boston - Cyber',
        background: 'Cyber specialist for BSS (Barrett Security Solutions) based in Boston. Goes by callsign "Phantom".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Phantom (Cyber - Boston)');
  }

  // Declan "Fin" O'Rourke (Analyst) - Boston
  const declan = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Declan' } },
        { name: { contains: 'Fin' } },
        { name: { contains: "O'Rourke" } },
      ]
    }
  });

  if (declan) {
    await prisma.character.update({
      where: { id: declan.id },
      data: {
        name: 'Declan "Fin" O\'Rourke',
        firstName: 'Declan',
        lastName: 'O\'Rourke',
        nameVariants: 'Fin',
        bssRole: 'Analyst',
        hubLocation: 'Boston',
        affiliationRole: 'BSS Boston - Analyst',
        background: 'Analyst for BSS (Barrett Security Solutions) based in Boston. Known by nickname "Fin".',
      }
    });
    console.log('Updated: Declan "Fin" O\'Rourke (Analyst - Boston)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Declan "Fin" O\'Rourke',
        firstName: 'Declan',
        lastName: 'O\'Rourke',
        nameVariants: 'Fin',
        archetype: 'BSS Analyst',
        bssRole: 'Analyst',
        hubLocation: 'Boston',
        affiliationRole: 'BSS Boston - Analyst',
        background: 'Analyst for BSS (Barrett Security Solutions) based in Boston. Known by nickname "Fin".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Declan "Fin" O\'Rourke (Analyst - Boston)');
  }

  console.log('\n=== BSS Boston Team ===');
  console.log('- Phantom (Cyber)');
  console.log('- Declan "Fin" O\'Rourke (Analyst)');

  // ========== NY TEAM ==========
  console.log('\nAdding BSS NY Team...\n');

  // Carolina Westbrook - Fixer + Office Lead
  const carolina = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Carolina Westbrook' } },
        { firstName: 'Carolina', lastName: 'Westbrook' },
      ]
    }
  });

  if (carolina) {
    await prisma.character.update({
      where: { id: carolina.id },
      data: {
        bssRole: 'Fixer / NY Office Lead',
        hubLocation: 'New York',
        affiliationRole: 'BSS NY - Fixer & Office Lead',
        background: 'Fixer for BSS (Barrett Security Solutions) who runs the New York office.',
      }
    });
    console.log('Updated: Carolina Westbrook (Fixer / Office Lead - NY)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Carolina Westbrook',
        firstName: 'Carolina',
        lastName: 'Westbrook',
        archetype: 'BSS Fixer / Office Lead',
        bssRole: 'Fixer / NY Office Lead',
        hubLocation: 'New York',
        affiliationRole: 'BSS NY - Fixer & Office Lead',
        background: 'Fixer for BSS (Barrett Security Solutions) who runs the New York office.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Carolina Westbrook (Fixer / Office Lead - NY)');
  }

  // Logan Carr (Analyst) - NY
  const logan = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Logan Carr' } },
        { firstName: 'Logan', lastName: 'Carr' },
      ]
    }
  });

  if (logan) {
    await prisma.character.update({
      where: { id: logan.id },
      data: {
        bssRole: 'Analyst',
        hubLocation: 'New York',
        affiliationRole: 'BSS NY - Analyst',
        background: 'Analyst for BSS (Barrett Security Solutions) based in New York.',
      }
    });
    console.log('Updated: Logan Carr (Analyst - NY)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Logan Carr',
        firstName: 'Logan',
        lastName: 'Carr',
        archetype: 'BSS Analyst',
        bssRole: 'Analyst',
        hubLocation: 'New York',
        affiliationRole: 'BSS NY - Analyst',
        background: 'Analyst for BSS (Barrett Security Solutions) based in New York.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Logan Carr (Analyst - NY)');
  }

  // Keys (C) - NY Cyber
  const keys = await prisma.character.findFirst({
    where: { name: 'Keys' }
  });

  if (keys) {
    await prisma.character.update({
      where: { id: keys.id },
      data: {
        bssRole: 'Cyber',
        hubLocation: 'New York',
        affiliationRole: 'BSS NY - Cyber',
        background: 'Cyber specialist for BSS (Barrett Security Solutions) based in New York. Goes by callsign "Keys".',
      }
    });
    console.log('Updated: Keys (Cyber - NY)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Keys',
        firstName: 'Keys',
        archetype: 'BSS Cyber',
        bssRole: 'Cyber',
        hubLocation: 'New York',
        affiliationRole: 'BSS NY - Cyber',
        background: 'Cyber specialist for BSS (Barrett Security Solutions) based in New York. Goes by callsign "Keys".',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Keys (Cyber - NY)');
  }

  console.log('\n=== BSS NY Team ===');
  console.log('- Carolina Westbrook (Fixer / Office Lead)');
  console.log('- Logan Carr (Analyst)');
  console.log('- Keys (Cyber)');

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
