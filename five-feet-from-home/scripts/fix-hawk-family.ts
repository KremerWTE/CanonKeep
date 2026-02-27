import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== FIXING HAWK'S FAMILY (Correcting incorrect data) ===\n");

  // Delete the incorrect family members I made up
  const wrongNames = [
    'Colonel James "Jim" Hawkins (Ret.)',
    'Patricia "Pat" Hawkins',
    'Captain Luke Hawkins'
  ];

  for (const name of wrongNames) {
    const char = await prisma.character.findFirst({
      where: { name: name, projectId: project.id }
    });
    if (char) {
      await prisma.character.delete({ where: { id: char.id } });
      console.log(`Deleted incorrect character: ${name}`);
    }
  }

  // Add the correct family: Sister and her family on a ranch in Texas
  const correctFamily = [
    {
      name: "Hawk's Sister",
      firstName: 'Sarah', // Placeholder - user can correct
      lastName: 'Hawkins',
      archetype: "Hawk's Sister",
      background: `Hawk's only surviving family. Lives on a ranch in Texas with her husband and children.

Hawk's parents passed away (details TBD by author).

She represents Hawk's connection to a simpler life, a reminder of where he came from before the military and BSS.`,
      hubLocation: 'Texas - Family Ranch',
      relationships: `Sister to Hawk
Only surviving immediate family
Lives on a ranch in Texas with her husband and children`,
      sourceFiles: 'User correction'
    }
  ];

  for (const char of correctFamily) {
    const existing = await prisma.character.findFirst({
      where: {
        archetype: { contains: "Hawk's Sister" },
        projectId: project.id
      }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created placeholder: ${char.name} (name TBD)`);
    }
  }

  // Update Hawk's character with correct family info
  const hawk = await prisma.character.findFirst({
    where: {
      OR: [
        { nickname: 'Hawk' },
        { name: { contains: 'Hawk' } }
      ],
      archetype: { not: { contains: 'Sister' } },
      projectId: project.id
    }
  });

  if (hawk) {
    // Remove any incorrect family references and add correct ones
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        relationships: `FAMILY:
- Parents: Deceased
- Sister: Lives on a ranch in Texas with her husband and children
- Only surviving immediate family

PARTNER:
- Addie - The love of his life, his anchor, the reason he found peace after leaving the military

BSS FAMILY:
- Jasper Barrett - The man who gave him purpose after military
- The operators - Brothers in arms`
      }
    });
    console.log("Updated Hawk with correct family information");
  }

  console.log("\n=== FAMILY CORRECTED ===");
  console.log("Note: Sister's name is placeholder - please provide correct name if known");

  await prisma.$disconnect();
}

main().catch(console.error);
