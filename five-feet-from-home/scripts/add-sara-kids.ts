import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Sara's Kids...\n");

  const kids = [
    {
      name: 'Sara\'s Oldest Child',
      firstName: 'TBD',
      lastName: 'Barrett',
      archetype: 'Sara\'s Child (Age 9)',
      age: '9',
      hubLocation: 'Charlotte, NC / Near Elena\'s compound',
      background: `Sara Barrett's oldest child (age 9). Part of the extended family kid network.

Integrates perfectly with the other kids in the compound circle:
- Grace Barrett (7) - Elena & Jasper's daughter
- Clara Vega (7) - Evelyn & Marcus's daughter
- Gabriel "Gabe" Vega (4) - Evelyn & Marcus's son
- Lucas Barrett (1.5) - Elena & Jasper's son

As the oldest, often takes a leadership role in kid activities and helps watch the younger ones.`,
      relationships: `Sara Barrett - mother
Grace Barrett - cousin
Clara Vega - friend
Gabriel Vega - friend
Lucas Barrett - cousin`,
    },
    {
      name: 'Sara\'s Middle Child',
      firstName: 'TBD',
      lastName: 'Barrett',
      archetype: 'Sara\'s Child (Age 7)',
      age: '7',
      hubLocation: 'Charlotte, NC / Near Elena\'s compound',
      background: `Sara Barrett's middle child (age 7). Same age as Grace and Clara.

Best playmates with Grace Barrett and Clara Vega - the three are often inseparable at family gatherings, school events, and compound playdates.

Part of the extended family kid network that gives Grace a wider cousin-like circle.`,
      relationships: `Sara Barrett - mother
Grace Barrett - cousin, same age, best friends
Clara Vega - friend, same age
Gabriel Vega - friend
Lucas Barrett - cousin`,
    },
    {
      name: 'Sara\'s Youngest Child',
      firstName: 'TBD',
      lastName: 'Barrett',
      archetype: 'Sara\'s Child (Age 5)',
      age: '5',
      hubLocation: 'Charlotte, NC / Near Elena\'s compound',
      background: `Sara Barrett's youngest child (age 5). Closer in age to Gabriel Vega (4).

Playmates with Gabriel and the younger kids in the compound circle. Often looked after by the older kids (Grace, Clara, Sara's older two).

Part of the extended family kid network.`,
      relationships: `Sara Barrett - mother
Gabriel Vega - friend, close in age
Grace Barrett - cousin
Clara Vega - friend
Lucas Barrett - cousin`,
    },
  ];

  let created = 0;

  for (const kid of kids) {
    const existing = await prisma.character.findFirst({
      where: { name: kid.name }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...kid,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${kid.name}`);
      created++;
    } else {
      console.log(`Exists: ${kid.name}`);
    }
  }

  // Update Sara with kids reference
  const sara = await prisma.character.findFirst({
    where: { firstName: 'Sara', lastName: 'Barrett' }
  });

  if (sara) {
    const currentBackground = sara.background || '';
    if (!currentBackground.includes('three kids')) {
      await prisma.character.update({
        where: { id: sara.id },
        data: {
          background: currentBackground + `

SARA'S KIDS (Ages 9, 7, 5):
Has her own three kids who integrate perfectly with Grace, Clara, Gabriel, and Lucas.
- Oldest (9) - takes leadership role in kid activities
- Middle (7) - same age as Grace and Clara, best playmates
- Youngest (5) - close in age to Gabriel (4)

They give the kids a wider cousin-like network and bring Sara's warmth and maternal energy into the extended family gatherings.`,
        }
      });
      console.log('Updated: Sara Barrett with kids reference');
    }
  }

  console.log(`\nCreated: ${created}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
