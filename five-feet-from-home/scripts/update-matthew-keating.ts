import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Updating Matthew Keating...\n');

  // Check for existing Matthew or Daniel Whitfield (Harper's husband from earlier)
  const existing = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Matthew Keating' } },
        { name: { contains: 'Daniel Whitfield' } },
        { firstName: 'Matthew', lastName: 'Keating' },
      ]
    }
  });

  const matthewData = {
    name: 'Matthew Keating',
    firstName: 'Matthew',
    lastName: 'Keating',
    archetype: 'Shipping Magnate / Harper\'s Husband',
    careerHistory: 'Owner and operator of Trident Global Risk Solutions - shipping company based in Miami',
    background: 'Owns and operates Trident Global Risk Solutions, a shipping company headquartered in Miami. Married to Harper Steele.',
    relationships: 'Married to Harper Steele. Brother of Mason Keating (Jasper\'s truth-teller from Duke Lacrosse).',
    hubLocation: 'Miami',
    affiliationRole: 'CEO/Owner - Trident Global Risk Solutions (Miami shipping company)',
    sourceFiles: 'Canon update',
    isConfirmed: true,
  };

  if (existing) {
    await prisma.character.update({
      where: { id: existing.id },
      data: matthewData
    });
    console.log(`Updated: ${existing.name} → Matthew Keating`);
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        ...matthewData,
      }
    });
    console.log('Created: Matthew Keating');
  }

  // Update Harper to reference Matthew as spouse
  const harper = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });

  if (harper) {
    await prisma.character.update({
      where: { id: harper.id },
      data: {
        relationships: 'Married to Matthew Keating (owns Trident Global Risk Solutions, Miami shipping company). Strategic voice in Wives Club. BSS co-founder with Jasper.',
        hubLocation: 'Miami',
      }
    });
    console.log('Updated Harper with Matthew Keating as spouse');
  }

  // Also check if Mason Keating should be noted as Matthew's brother
  const mason = await prisma.character.findFirst({
    where: { name: { contains: 'Mason Keating' } }
  });

  if (mason) {
    await prisma.character.update({
      where: { id: mason.id },
      data: {
        relationships: 'Jasper Barrett\'s college friend (Duke Lacrosse teammate). Jasper\'s truth-teller. Brother of Matthew Keating (married to Harper).',
      }
    });
    console.log('Updated Mason Keating - noted as Matthew\'s brother');
  }

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
