import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Elena's Charlotte Area Friends...\n");

  const cltFriends = [
    // ========== JIMMY KELLER & BROOKE MATHERS ==========
    {
      name: 'Jimmy Keller',
      firstName: 'Jimmy',
      lastName: 'Keller',
      archetype: 'Former Minor League Baseball Player',
      careerHistory: 'Former minor league baseball player.',
      affiliationRole: 'Former Athlete',
      hubLocation: 'Charlotte, NC',
      relationships: "Elena Barrett's friend in Charlotte area. Married to Brooke Mathers (pilates/barre company owner).",
      background: "One of Elena's friends in the Charlotte area. Former minor league baseball player who understands the athlete world. Married to Brooke Mathers.",
    },
    {
      name: 'Brooke Mathers',
      firstName: 'Brooke',
      lastName: 'Mathers',
      archetype: 'Fitness Entrepreneur',
      careerHistory: 'Runs boutique pilates and barre company.',
      affiliationRole: 'Pilates/Barre Company Owner',
      hubLocation: 'Charlotte, NC',
      relationships: "Married to Jimmy Keller (former minor league baseball player). Connected to Elena Barrett's Charlotte circle.",
      wivesClubRole: 'Extended Circle - Charlotte / Fitness',
      background: "Runs a successful boutique pilates and barre fitness company in the Charlotte area. Married to former minor league player Jimmy Keller. Part of Elena's local Charlotte network.",
    },

    // ========== CALEB WEST ==========
    {
      name: 'Caleb West',
      firstName: 'Caleb',
      lastName: 'West',
      archetype: 'Wine Importer',
      careerHistory: 'Runs wine import business.',
      affiliationRole: 'Wine Import Business Owner',
      hubLocation: 'Charlotte, NC',
      relationships: "Elena Barrett's friend in Charlotte area. Wine importer.",
      background: "One of Elena's friends in the Charlotte area. Runs a wine import business, providing expertise for Elena's Maison Aurelia events and access to fine wines for gatherings at the Barrett compound.",
    },

    // ========== TESSA MOORE & DANIEL PARK ==========
    {
      name: 'Tessa Moore',
      firstName: 'Tessa',
      lastName: 'Moore',
      archetype: 'Nurse Practitioner',
      careerHistory: 'Nurse Practitioner (NP).',
      affiliationRole: 'Healthcare - NP',
      hubLocation: 'Charlotte, NC',
      relationships: "Elena Barrett's friend in Charlotte area. Married to Dr. Daniel Park (orthopedic surgeon).",
      wivesClubRole: 'Extended Circle - Charlotte / Healthcare',
      background: "One of Elena's friends in the Charlotte area. Nurse practitioner who provides medical expertise and connections to the healthcare community. Married to orthopedic surgeon Daniel Park.",
    },
    {
      name: 'Dr. Daniel Park',
      firstName: 'Daniel',
      lastName: 'Park',
      title: 'Dr.',
      archetype: 'Orthopedic Surgeon',
      careerHistory: 'Orthopedic surgeon.',
      affiliationRole: 'Orthopedic Surgeon',
      hubLocation: 'Charlotte, NC',
      relationships: "Married to Tessa Moore (NP). Connected to Elena Barrett's Charlotte circle.",
      background: "Orthopedic surgeon in the Charlotte area. Connected to Elena's network through his wife Tessa. His specialty could be valuable for BSS athlete clients and operators.",
    },

    // ========== DEREK VAUGHN & KEISHA LAMB ==========
    {
      name: 'Derek Vaughn',
      firstName: 'Derek',
      lastName: 'Vaughn',
      archetype: 'Sports Agent / Youth Mentor',
      careerHistory: 'Sports agent. Youth mentor.',
      affiliationRole: 'Sports Agent / Youth Mentor',
      hubLocation: 'Charlotte, NC',
      relationships: "Elena Barrett's friend in Charlotte area. Married to Keisha Lamb (track star). Sports agent and youth mentor.",
      background: "One of Elena's friends in the Charlotte area. Sports agent who also dedicates time to youth mentorship. His athlete connections complement BSS's sports protection division. Married to track star Keisha Lamb.",
    },
    {
      name: 'Keisha Lamb',
      firstName: 'Keisha',
      lastName: 'Lamb',
      archetype: 'Track Star / Athlete',
      careerHistory: 'Professional track and field athlete.',
      affiliationRole: 'Professional Athlete - Track',
      hubLocation: 'Charlotte, NC',
      relationships: "Married to Derek Vaughn (sports agent/youth mentor). Connected to Elena Barrett's Charlotte circle.",
      wivesClubRole: 'Athletes Circle - Track Star',
      background: "Professional track and field athlete. Married to sports agent Derek Vaughn. Part of the athletes' circle connected to BSS and Elena's Charlotte network.",
    },

    // ========== LILA BROOKS ==========
    {
      name: 'Lila Brooks',
      firstName: 'Lila',
      lastName: 'Brooks',
      archetype: 'Literacy Nonprofit Director',
      careerHistory: 'Director at literacy nonprofit.',
      affiliationRole: 'Literacy Nonprofit Director',
      hubLocation: 'Charlotte, NC',
      relationships: "Elena Barrett's friend in Charlotte area. Literacy nonprofit director.",
      wivesClubRole: 'Extended Circle - Charlotte / Nonprofit',
      background: "One of Elena's friends in the Charlotte area. Director at a literacy nonprofit, connecting to Elena's literary nonprofit background and Palace of Honor charitable work.",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const friend of cltFriends) {
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

  // Update Elena with Charlotte friends
  const elena = await prisma.character.findFirst({
    where: { name: { contains: 'Elena Barrett' } }
  });
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        relationships: `Married to Jasper Barrett. Mother of Grace and Lucas. Sisters: Camila (older, European royal), Sara Whitaker (younger, CrossFit gym owner). College best friends: Marisol Vega (roommate, HS counselor), Anna Cho (photographer). Georgetown friends: Marisol Delgado (human rights attorney), Patrick O'Connor (consulting VP), Anika Sharma (luxury hospitality). Charlotte friends: Jimmy Keller & Brooke Mathers (fitness), Caleb West (wine), Tessa Moore & Daniel Park (healthcare), Derek Vaughn & Keisha Lamb (sports), Lila Brooks (literacy nonprofit). CEO of Maison Aurelia.`,
      }
    });
    console.log('\nUpdated Elena Barrett with Charlotte friends');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
