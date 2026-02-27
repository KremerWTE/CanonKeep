import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Adding BSS Employees (Charlotte HQ)...\n');

  // Role mappings
  // O = Operator, F = Fixer, C = Cyber, E = Excon, M = Mental Coach

  const bssEmployees = [
    {
      name: 'Kendra',
      firstName: 'Kendra',
      archetype: 'BSS Fixer',
      bssRole: 'Fixer',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Fixer - Elite problem solver',
      affiliationRole: 'BSS Employee - Fixer',
      background: 'Fixer for BSS (Barrett Security Solutions). Elite problem solver specializing in crisis resolution.',
    },
    {
      name: 'Lexi',
      firstName: 'Lexi',
      archetype: 'BSS Analyst',
      bssRole: 'Analyst',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Analyst',
      affiliationRole: 'BSS Employee - Analyst',
      background: 'Analyst for BSS (Barrett Security Solutions). Provides intelligence analysis and research support for crisis management operations.',
    },
    {
      name: 'Rina',
      firstName: 'Rina',
      archetype: 'BSS Logistics',
      bssRole: 'Logistics',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Logistics Coordinator',
      affiliationRole: 'BSS Employee - Logistics',
      background: 'Logistics coordinator for BSS (Barrett Security Solutions). Manages operational logistics for crisis response.',
    },
    {
      name: 'Evan',
      firstName: 'Evan',
      archetype: 'BSS Multi-Role Operative',
      bssRole: 'Operator / Cyber / Fixer',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Operator, Cyber Specialist, and Fixer',
      affiliationRole: 'BSS Employee - Operator/Cyber/Fixer',
      background: 'Multi-talented BSS operative with skills as a Tier operator, cyber specialist, and fixer. One of the most versatile members of the team.',
    },
    {
      name: 'Riley',
      firstName: 'Riley',
      archetype: 'BSS Office Manager',
      bssRole: 'Office Manager',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Office Manager',
      affiliationRole: 'BSS Employee - Office Manager',
      background: 'Office Manager for BSS (Barrett Security Solutions). Keeps the Charlotte headquarters running smoothly.',
    },
    {
      name: 'Sophie Roberts',
      firstName: 'Sophie',
      lastName: 'Roberts',
      archetype: 'BSS Mental Coach',
      bssRole: 'Mental Coach',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Mental Performance Coach',
      affiliationRole: 'BSS Employee - Mental Coach',
      background: 'Mental performance coach for BSS (Barrett Security Solutions). Provides psychological support and mental conditioning for the team.',
    },
    {
      name: 'Cipher',
      firstName: 'Cipher',
      archetype: 'BSS Cyber Specialist',
      bssRole: 'Cyber',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Cyber Analyst/Hacker',
      affiliationRole: 'BSS Employee - Cyber',
      background: 'Cyber specialist for BSS (Barrett Security Solutions). Handles digital intelligence, hacking, and cyber operations. Goes by the callsign "Cipher".',
    },
    {
      name: 'Ethan Cross',
      firstName: 'Ethan',
      lastName: 'Cross',
      archetype: 'BSS Excon',
      bssRole: 'Excon',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Executive Consultant',
      affiliationRole: 'BSS Employee - Excon',
      relationships: 'Married to Sofia.',
      background: 'Executive consultant (Excon) for BSS (Barrett Security Solutions). Married to Sofia.',
    },
    {
      name: 'Ridge',
      firstName: 'Ridge',
      archetype: 'BSS Operator',
      bssRole: 'Operator',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Tier Operator',
      affiliationRole: 'BSS Employee - Operator',
      background: 'Tier operator for BSS (Barrett Security Solutions). Handles high-risk field operations.',
    },
    {
      name: 'Cole',
      firstName: 'Cole',
      archetype: 'BSS Operator',
      bssRole: 'Operator',
      hubLocation: 'Charlotte, NC',
      careerHistory: 'BSS Tier Operator',
      affiliationRole: 'BSS Employee - Operator',
      background: 'Tier operator for BSS (Barrett Security Solutions). Handles high-risk field operations.',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const emp of bssEmployees) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: emp.name },
          { firstName: emp.firstName, lastName: emp.lastName || undefined },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: emp
      });
      console.log(`Updated: ${emp.name} (${emp.bssRole})`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...emp,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${emp.name} (${emp.bssRole})`);
      created++;
    }
  }

  // Also add Sofia (Ethan Cross's wife) if not already in system
  const sofia = await prisma.character.findFirst({
    where: { name: 'Sofia' }
  });

  if (!sofia) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Sofia',
        firstName: 'Sofia',
        archetype: 'BSS Family',
        relationships: 'Married to Ethan Cross (BSS Excon).',
        hubLocation: 'Charlotte, NC',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Sofia (Ethan Cross\'s wife)');
    created++;
  }

  console.log('\n=== BSS Charlotte Team Summary ===');
  console.log('Operators: Holt, Ridge, Cole, Evan');
  console.log('Cyber: Cipher, Evan');
  console.log('Fixers: Kendra, Evan');
  console.log('Excon: Ethan Cross');
  console.log('Mental Coach: Sophie Roberts');
  console.log('Analyst: Lexi');
  console.log('Logistics: Rina');
  console.log('Office Manager: Riley');

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
