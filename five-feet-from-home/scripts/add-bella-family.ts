import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Bella's Family Members...\n");

  const bellaFamily = [
    {
      name: "Bella's Mother",
      archetype: 'Café Owner / Family Matriarch',
      careerHistory: 'Runs the family café.',
      hubLocation: "Bella's Hometown",
      relationships: "Bella's mother. Married to Bella's father (bookstore owner). Mother of Bella and two older sons.",
      background: "Runs the family café - warm, charismatic, social hub of the community. Always pulling people in. Bella learned warmth, patience, and social ease from her. The café taught Bella hospitality and how to read people through customer service. After COVID, the café struggled financially.",
      personality: 'Warm, charismatic, community-centered, highly social.',
    },
    {
      name: "Bella's Father",
      archetype: 'Bookstore Owner / Family Patriarch',
      careerHistory: 'Runs the family bookstore.',
      hubLocation: "Bella's Hometown",
      relationships: "Bella's father. Married to Bella's mother (café owner). Father of Bella and two older sons.",
      background: "Runs the family bookstore - orderly, quiet, intellectual. His pride and joy. Bella inherited her love of order, detail, and quiet observation from him. The bookstore gave her introspection and analytical thinking. After COVID, the bookstore struggled financially.",
      personality: 'Quiet, strategic, orderly, intellectual.',
    },
    {
      name: "Bella's Brothers (2)",
      archetype: 'Older Siblings',
      relationships: "Bella's two older brothers. Sons of the café/bookstore owners.",
      background: "Bella's two older brothers. Growing up as the youngest and only girl, Bella constantly had to prove herself against them. They overshadowed her achievements, contributing to her pattern of feeling like she was never the star in the room. Their accomplishments were often praised by parents while Bella's contributions felt like 'just helping.'",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const member of bellaFamily) {
    const existing = await prisma.character.findFirst({
      where: { name: member.name }
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
          sourceFiles: 'Bella Background Pre-BSS',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${member.name}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
