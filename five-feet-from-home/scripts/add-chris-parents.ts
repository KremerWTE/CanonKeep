import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Chris Donnelly's Parents...\n");

  const characters = [
    // ========== CHRIS'S FATHER ==========
    {
      name: "Patrick Donnelly",
      firstName: 'Patrick',
      lastName: 'Donnelly',
      archetype: "Chris's Father / Boston Firefighter",
      hubLocation: 'Boston, MA',
      background: `Chris Donnelly's father. Boston firefighter who gave Chris his grit and service-mindedness early on.

Raised Chris in a working-class Irish-American family in Boston. The firefighter culture shaped Chris's values: loyalty, service, showing up for people.

Chris credits his dad with his blue-collar work ethic even though he went into finance.

His sudden death was a pivotal moment - Fr. James Callahan (Chris's college friend turned priest) helped keep Chris anchored through it.

Still remembered at Knights of Columbus fish fries and family gatherings. His legacy lives in Chris's grounded, service-oriented approach to life.`,
      personality: 'Boston firefighter - grit, service-minded, loyal. Shaped Chris\'s values.',
      relationships: `Chris Donnelly - son
Mary Donnelly - wife`,
      sourceFiles: 'New character creation',
      tags: 'deceased',
    },

    // ========== CHRIS'S MOTHER ==========
    {
      name: "Mary Donnelly",
      firstName: 'Mary',
      lastName: 'Donnelly',
      archetype: "Chris's Mother / Boston Nurse",
      hubLocation: 'Boston, MA',
      background: `Chris Donnelly's mother. Nurse in Boston who raised Chris alongside his firefighter father.

Working-class Irish-American family. Mary balanced the chaos of firefighter schedules with her nursing shifts while raising Chris Catholic - Mass on Sundays, altar serving, Knights of Columbus fish fries.

Her nursing background gave Chris an appreciation for caregiving professions and service to others.

Still living in Boston. Chris visits when he can, and she's proud of his success even if she doesn't fully understand the BSS world.`,
      personality: 'Nurturing, faith-centered, practical. Raised Chris with strong Catholic values.',
      relationships: `Chris Donnelly - son
Patrick Donnelly - husband (deceased)
Kendra Whitaker - daughter-in-law`,
      sourceFiles: 'New character creation',
    },
  ];

  let created = 0;

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: { firstName: char.firstName, lastName: char.lastName }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    } else {
      console.log(`Exists: ${char.name}`);
    }
  }

  // Update Chris with parent references
  const chris = await prisma.character.findFirst({
    where: { firstName: 'Chris', lastName: 'Donnelly' }
  });

  if (chris) {
    const currentRelationships = chris.relationships || '';
    if (!currentRelationships.includes('Patrick Donnelly')) {
      await prisma.character.update({
        where: { id: chris.id },
        data: {
          relationships: currentRelationships + `

PARENTS:
- Patrick Donnelly (father) - Boston firefighter, deceased. Gave Chris his grit and service-mindedness.
- Mary Donnelly (mother) - Boston nurse. Raised him Catholic.`,
        }
      });
      console.log('Updated: Chris Donnelly with parent references');
    }
  }

  console.log(`\nCreated: ${created}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
