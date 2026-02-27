import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Consolidating Sara Characters...\n");

  // Delete the duplicate/incomplete Sara entries
  const toDelete = ['Sara Hale', 'Sara Barrett', 'Sara Davenport-Whitaker', "Sara's Oldest Child", "Sara's Middle Child", "Sara's Youngest Child"];

  for (const name of toDelete) {
    const char = await prisma.character.findFirst({
      where: { name: name }
    });
    if (char) {
      await prisma.character.delete({ where: { id: char.id } });
      console.log(`Deleted: ${name}`);
    }
  }

  // Create/Update the correct Sara Marquez
  const saraMarquez = await prisma.character.findFirst({
    where: { firstName: 'Sara', lastName: 'Marquez' }
  });

  const saraData = {
    name: 'Sara Marquez',
    firstName: 'Sara',
    lastName: 'Marquez',
    archetype: "Elena's Younger Sister / Wives Club Family Member",
    hubLocation: 'Charlotte, NC / Near Elena\'s compound',
    wivesClubRole: 'Extended Circle - Family',
    appearance: 'Sofía Vergara in her more casual/approachable mode (warm, expressive, elegant without trying).',
    modeledAfter: 'Sofía Vergara (casual mode)',
    background: `Elena's younger sister. Grew up with Elena in Madrid. Where Elena carries elegance and gravity, Sara carries energy and charm.

Married to a Spanish-American businessman based out of Charlotte, which brought her into proximity with Elena after Jasper built the mountain compound.

THREE KIDS:
- Isabella (9) → thoughtful, budding athlete, closest with Grace
- Lucía (7) → same age as Grace and Clara, the three are inseparable
- Mateo (5) → close in age to Gabriel (4), always wrestling with him

Not married to a BSS operator, but her proximity and kids make her essential to the wives club circle.

SCENE - Sara Joins the Wives Club:
The long table at Elena's compound is filled with fresh bread, fruit, and coffee. Evelyn is mid-story when Sara enters with a casserole dish and a grin.

"Am I late?"

Elena stands, pulling her sister into a hug. "Right on time."

The kids swarm in - Isabella heads straight for Grace, Lucía skips to the toy box, and Mateo already has Gabriel in a wrestling match on the rug.`,
    personality: 'Outgoing, maternal, fiercely protective of her sister but not afraid to push back. Adds lively, maternal, family-first voice to the wives club. Grounds the group in everyday family life.',
    relationships: `Elena Barrett - older sister, knows her best
Jasper Barrett - brother-in-law
Grace Barrett - niece, close with Isabella
Evelyn Cross - wives club friend
Addie - teases her about being "mom material"

Her husband is a Spanish-American businessman based in Charlotte.`,
  };

  if (saraMarquez) {
    await prisma.character.update({
      where: { id: saraMarquez.id },
      data: saraData
    });
    console.log('Updated: Sara Marquez');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        ...saraData,
        isConfirmed: true,
      }
    });
    console.log('Created: Sara Marquez');
  }

  // Create Sara's kids with proper names
  const kids = [
    {
      name: 'Isabella Marquez',
      firstName: 'Isabella',
      lastName: 'Marquez',
      archetype: "Sara's Daughter (Age 9)",
      age: '9',
      hubLocation: 'Charlotte, NC',
      background: `Sara Marquez's oldest daughter (age 9). Elena's niece. Thoughtful, budding athlete.

Closest with Grace Barrett. As the oldest kid in the compound circle, often takes a leadership role.

Part of the extended family kid network:
- Grace Barrett (7) - cousin, best friend
- Clara Vega (7) - friend
- Gabriel Vega (4) - friend
- Lucía (7) - sister
- Mateo (5) - brother
- Lucas Barrett (1.5) - cousin`,
      relationships: `Sara Marquez - mother
Elena Barrett - aunt
Grace Barrett - cousin, closest friend
Lucía Marquez - younger sister
Mateo Marquez - younger brother`,
    },
    {
      name: 'Lucía Marquez',
      firstName: 'Lucía',
      lastName: 'Marquez',
      archetype: "Sara's Daughter (Age 7)",
      age: '7',
      hubLocation: 'Charlotte, NC',
      background: `Sara Marquez's middle daughter (age 7). Elena's niece. Same age as Grace and Clara.

Best playmates with Grace Barrett and Clara Vega - the three are inseparable at family gatherings, school events, and compound playdates.`,
      relationships: `Sara Marquez - mother
Elena Barrett - aunt
Grace Barrett - cousin, same age, best friends
Clara Vega - friend, same age
Isabella Marquez - older sister
Mateo Marquez - younger brother`,
    },
    {
      name: 'Mateo Marquez',
      firstName: 'Mateo',
      lastName: 'Marquez',
      archetype: "Sara's Son (Age 5)",
      age: '5',
      hubLocation: 'Charlotte, NC',
      background: `Sara Marquez's son (age 5). Elena's nephew. Close in age to Gabriel Vega (4).

Always wrestling with Gabriel at family gatherings. The two boys crash through life together.`,
      personality: 'Energetic, playful, loves wrestling and roughhousing with Gabriel.',
      relationships: `Sara Marquez - mother
Elena Barrett - aunt
Gabriel Vega - best friend, wrestling buddy
Isabella Marquez - older sister
Lucía Marquez - older sister`,
    },
  ];

  for (const kid of kids) {
    const existing = await prisma.character.findFirst({
      where: { firstName: kid.firstName, lastName: kid.lastName }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: kid
      });
      console.log(`Updated: ${kid.name}`);
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...kid,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${kid.name}`);
    }
  }

  console.log("\nSara family consolidated!");

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
