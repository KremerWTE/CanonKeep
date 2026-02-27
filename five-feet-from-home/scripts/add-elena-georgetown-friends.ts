import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Elena's Georgetown Friends...\n");

  const georgetownFriends = [
    // ========== MARISOL DELGADO & DR. ALEX NAVARRO ==========
    {
      name: 'Marisol Delgado',
      firstName: 'Marisol',
      lastName: 'Delgado',
      archetype: 'Human Rights Attorney / NGO',
      careerHistory: 'Human rights attorney. Works for NGO in Washington D.C.',
      affiliationRole: 'Human Rights Attorney - DC NGO',
      hubLocation: 'Washington D.C.',
      relationships: "Elena Barrett's friend from Georgetown. Married to Dr. Alex Navarro (ER doctor).",
      wivesClubRole: 'Extended Circle - Elena Georgetown Friend',
      background: "One of Elena's friends from Georgetown. Human rights attorney working for an NGO in Washington D.C. Her work in human rights advocacy connects to the ethical dimensions of BSS operations and Palace of Honor humanitarian efforts.",
    },
    {
      name: 'Dr. Alex Navarro',
      firstName: 'Alex',
      lastName: 'Navarro',
      title: 'Dr.',
      archetype: 'ER Doctor',
      careerHistory: 'Emergency Room physician.',
      affiliationRole: 'ER Doctor',
      hubLocation: 'Washington D.C.',
      relationships: "Married to Marisol Delgado (human rights attorney, Elena's Georgetown friend).",
      background: 'Emergency room doctor in Washington D.C. Connected to Elena\'s network through his wife Marisol. Medical expertise could be valuable for BSS crisis situations.',
    },

    // ========== PATRICK O'CONNOR ==========
    {
      name: 'Patrick O\'Connor',
      firstName: 'Patrick',
      lastName: 'O\'Connor',
      archetype: 'Global Consulting VP',
      careerHistory: 'VP at Global Consulting firm.',
      affiliationRole: 'Global Consulting VP',
      relationships: "Elena Barrett's friend from Georgetown. VP at global consulting firm.",
      wivesClubRole: 'Extended Circle - Elena Georgetown Friend',
      background: "One of Elena's friends from Georgetown. Rose to VP at a major global consulting firm. Brings strategic consulting expertise and international business connections to Elena's network.",
    },

    // ========== ANIKA SHARMA & ROHAN MEHAT ==========
    {
      name: 'Anika Sharma',
      firstName: 'Anika',
      lastName: 'Sharma',
      archetype: 'Luxury Hospitality Executive',
      careerHistory: 'Runs a luxury hospitality firm.',
      affiliationRole: 'Luxury Hospitality Firm Owner',
      relationships: "Elena Barrett's friend from Georgetown. Married to Rohan Mehat (Michelin star chef).",
      wivesClubRole: 'Extended Circle - Elena Georgetown Friend / Hospitality',
      background: "One of Elena's friends from Georgetown. Runs a luxury hospitality firm, making her a natural partner for Elena's Maison Aurelia events. Her expertise in high-end hospitality and husband's culinary fame make them a power couple in the luxury service world.",
    },
    {
      name: 'Rohan Mehat',
      firstName: 'Rohan',
      lastName: 'Mehat',
      archetype: 'Michelin Star Chef',
      careerHistory: 'Michelin star chef.',
      affiliationRole: 'Celebrity Chef',
      relationships: "Married to Anika Sharma (luxury hospitality, Elena's Georgetown friend).",
      background: 'Michelin star chef married to Anika Sharma. Their combined expertise in luxury hospitality and fine dining makes them valuable partners for Elena\'s high-profile events through Maison Aurelia.',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const friend of georgetownFriends) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: friend.name },
          { firstName: friend.firstName, lastName: friend.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: friend
      });
      console.log(`Updated: ${friend.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...friend,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${friend.name}`);
      created++;
    }
  }

  // Update Elena with Georgetown friends
  const elena = await prisma.character.findFirst({
    where: { name: { contains: 'Elena Barrett' } }
  });
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        relationships: `Married to Jasper Barrett. Mother of Grace and Lucas. Sisters: Camila (older, European royal), Sara Whitaker (younger, CrossFit gym owner). College best friends: Marisol Vega (roommate, HS guidance counselor), Anna Cho (photographer). Georgetown friends: Marisol Delgado (human rights attorney), Patrick O'Connor (consulting VP), Anika Sharma (luxury hospitality). CEO of Maison Aurelia.`,
      }
    });
    console.log('\nUpdated Elena Barrett with Georgetown friends');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
