import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('Updating core characters with canonical information...\n');

  // === JASPER BARRETT ===
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });
  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        careerHistory: 'Started in Construction Management as a PM. Found and mentored by Jessica Hall. Rose to become world-class corporate crisis manager at BSS.',
        education: 'Duke University - Lacrosse player',
        background: 'Former Construction PM discovered by mentor Jessica Hall. Built BSS into elite crisis management firm. Married to Elena Barrett, father of Grace (1st grade at Book 1 start) and baby Lucas.',
        relationships: 'Married to Elena Barrett. Father of Grace and Lucas. Mentored by Jessica Hall (Maddox/Vaughn). College friend and truth-teller: Mason Keating (Duke Lacrosse teammate).',
        mentorsMentees: 'Mentor: Jessica Hall (discovered him in construction management). Truth-teller: Mason Keating (Duke Lacrosse friend).',
      }
    });
    console.log('Updated: Jasper Barrett');
  }

  // === ELENA BARRETT ===
  const elena = await prisma.character.findFirst({
    where: { name: { contains: 'Elena Barrett' } }
  });
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        careerHistory: 'Luxury real estate agent → Literary non-profit work → Elite party planner → CEO of Maison Aurelia',
        background: 'Started in high society. Luxury real estate and literary non-profit background before becoming elite party planner. Now a southern mother and CEO of Maison Aurelia. Has older sister Camila (married to European royal) and younger sister Sara (CrossFit gym owner).',
        relationships: 'Married to Jasper Barrett. Mother of Grace (1st grade at Book 1 start) and baby Lucas. Older sister: Camila (married to European royal). Younger sister: Sara Whitaker (owns CrossFit gym).',
        wivesClubRole: 'The Queen - Anchor, graceful center of the Wives Club',
        maisonAureliaRole: 'CEO',
      }
    });
    console.log('Updated: Elena Barrett');
  }

  // === GRACE BARRETT ===
  const grace = await prisma.character.findFirst({
    where: { name: { contains: 'Grace Barrett' } }
  });
  if (grace) {
    await prisma.character.update({
      where: { id: grace.id },
      data: {
        age: '6-7 (1st grade at Book 1 start)',
        relationships: 'Daughter of Jasper and Elena Barrett. Has baby brother Lucas. Aunt Camila (European royal) and Aunt Sara (CrossFit gym owner). Cousins: Chloe, Lily, Ethan (Sara\'s kids).',
      }
    });
    console.log('Updated: Grace Barrett');
  }

  // === LUCAS BARRETT (create if not exists) ===
  const lucas = await prisma.character.findFirst({
    where: { name: { contains: 'Lucas Barrett' } }
  });
  if (!lucas) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Lucas Barrett',
        firstName: 'Lucas',
        lastName: 'Barrett',
        age: 'Infant/Baby (newborn in Book 1)',
        archetype: 'Child',
        relationships: 'Son of Jasper and Elena Barrett. Baby brother of Grace. Nephew of Camila and Sara.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Lucas Barrett');
  } else {
    await prisma.character.update({
      where: { id: lucas.id },
      data: {
        age: 'Infant/Baby (newborn in Book 1)',
        relationships: 'Son of Jasper and Elena Barrett. Baby brother of Grace. Nephew of Camila and Sara.',
      }
    });
    console.log('Updated: Lucas Barrett');
  }

  // === CAMILA (Elena's older sister) ===
  // First check for existing Camila entries
  const existingCamila = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Camila' } },
        { firstName: 'Camila' }
      ]
    }
  });

  if (existingCamila) {
    await prisma.character.update({
      where: { id: existingCamila.id },
      data: {
        name: 'Camila Barrett-[Royal Surname]',
        firstName: 'Camila',
        archetype: 'Elite Sister / European Royal',
        background: 'Elena\'s older sister. Married a rich royal European. Lives in high society European circles.',
        relationships: 'Elena Barrett\'s older sister. Sara Whitaker\'s older sister. Married to European royal. Aunt to Grace and Lucas Barrett.',
        hubLocation: 'Europe',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Camila (Elena\'s older sister)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Camila Barrett-[Royal Surname]',
        firstName: 'Camila',
        archetype: 'Elite Sister / European Royal',
        background: 'Elena\'s older sister. Married a rich royal European. Lives in high society European circles.',
        relationships: 'Elena Barrett\'s older sister. Sara Whitaker\'s older sister. Married to European royal. Aunt to Grace and Lucas Barrett.',
        hubLocation: 'Europe',
        wivesClubRole: 'Extended Circle - European Connection',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Camila (Elena\'s older sister)');
  }

  // === SARA WHITAKER (was Mitchell) ===
  const sara = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Sara' } },
        { name: { contains: 'Sara Whitaker' } },
        { name: { contains: 'Sara Hale' } },
      ]
    }
  });
  if (sara) {
    await prisma.character.update({
      where: { id: sara.id },
      data: {
        name: 'Sara Whitaker',
        firstName: 'Sara',
        lastName: 'Whitaker',
        archetype: 'Athletic Sister / CrossFit Entrepreneur',
        careerHistory: 'Owns a CrossFit gym. Former married name: Mitchell.',
        background: 'Elena\'s younger sister. Was Mitchell from first marriage. Now married to Mark Whitaker. Has children Chloe and Lily from first marriage, and new baby Ethan with Mark.',
        relationships: 'Married to Mark Whitaker. Elena Barrett\'s younger sister. Camila\'s younger sister. Children: Chloe (first marriage), Lily (first marriage), Ethan (with Mark Whitaker). Aunt to Grace and Lucas Barrett.',
        wivesClubRole: 'Core Member - Athletic Heart',
        hubLocation: 'Charlotte',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Sara Whitaker (Elena\'s younger sister)');
  }

  // === MARK WHITAKER ===
  const mark = await prisma.character.findFirst({
    where: { name: { contains: 'Mark' } }
  });
  if (mark) {
    await prisma.character.update({
      where: { id: mark.id },
      data: {
        name: 'Mark Whitaker',
        firstName: 'Mark',
        lastName: 'Whitaker',
        relationships: 'Married to Sara Whitaker (Elena\'s younger sister). Father of baby Ethan. Step-father to Chloe and Lily.',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Mark Whitaker');
  }

  // === JESSICA HALL (Jasper's mentor) - also known as Maddox, Vaughn ===
  const jessica = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Jessica Hall' } },
        { name: { contains: 'Jessica Maddox' } },
        { name: { contains: 'Vaughn' } },
      ]
    }
  });
  if (jessica) {
    await prisma.character.update({
      where: { id: jessica.id },
      data: {
        name: 'Jessica Hall',
        firstName: 'Jessica',
        lastName: 'Hall',
        nameVariants: '["Jessica Maddox", "Jessica Vaughn", "Maddox", "Vaughn"]',
        archetype: 'Mentor / Corporate Strategist',
        background: 'Discovered Jasper Barrett when he was working in Construction Management as a PM. Brought him into crisis management world.',
        relationships: 'Jasper Barrett\'s mentor - discovered him in construction management and launched his career.',
        mentorsMentees: 'Mentee: Jasper Barrett (discovered him, launched his career)',
        affiliationRole: 'Jasper\'s mentor and career launcher',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Jessica Hall (Jasper\'s mentor)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Jessica Hall',
        firstName: 'Jessica',
        lastName: 'Hall',
        nameVariants: '["Jessica Maddox", "Jessica Vaughn", "Maddox", "Vaughn"]',
        archetype: 'Mentor / Corporate Strategist',
        background: 'Discovered Jasper Barrett when he was working in Construction Management as a PM. Brought him into crisis management world.',
        relationships: 'Jasper Barrett\'s mentor - discovered him in construction management and launched his career.',
        mentorsMentees: 'Mentee: Jasper Barrett (discovered him, launched his career)',
        affiliationRole: 'Jasper\'s mentor and career launcher',
        bssRole: 'Co-founder / Strategic Partner',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Jessica Hall (Jasper\'s mentor)');
  }

  // === MASON KEATING (Jasper's truth-teller) - also known as Kane, Ward, Reilly, Price ===
  const mason = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Mason' } },
        { name: { contains: 'Keating' } },
        { name: { contains: 'Kane' } },
        { name: { contains: 'Ward' } },
      ]
    }
  });
  if (mason) {
    await prisma.character.update({
      where: { id: mason.id },
      data: {
        name: 'Mason Keating',
        firstName: 'Mason',
        lastName: 'Keating',
        nameVariants: '["Mason Kane", "Mason Ward", "Mason Reilly", "Mason Price"]',
        archetype: 'Truth-Teller / Loyal Friend',
        education: 'Duke University - Lacrosse',
        background: 'Jasper\'s college friend and teammate at Duke Lacrosse. Serves as Jasper\'s truth-teller - the one who keeps him grounded and calls him out.',
        relationships: 'Jasper Barrett\'s college friend (Duke Lacrosse teammate). Jasper\'s truth-teller.',
        personality: 'Honest, loyal, not afraid to call Jasper out. The friend who keeps Jasper grounded.',
        affiliationRole: 'Jasper\'s truth-teller and grounding force',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Mason Keating (Jasper\'s truth-teller)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Mason Keating',
        firstName: 'Mason',
        lastName: 'Keating',
        nameVariants: '["Mason Kane", "Mason Ward", "Mason Reilly", "Mason Price"]',
        archetype: 'Truth-Teller / Loyal Friend',
        education: 'Duke University - Lacrosse',
        background: 'Jasper\'s college friend and teammate at Duke Lacrosse. Serves as Jasper\'s truth-teller - the one who keeps him grounded and calls him out.',
        relationships: 'Jasper Barrett\'s college friend (Duke Lacrosse teammate). Jasper\'s truth-teller.',
        personality: 'Honest, loyal, not afraid to call Jasper out. The friend who keeps Jasper grounded.',
        affiliationRole: 'Jasper\'s truth-teller and grounding force',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Mason Keating (Jasper\'s truth-teller)');
  }

  // === ALEXANDRA VANCE (also known as Pierce) - Rocket company client ===
  const alexandra = await prisma.character.findFirst({
    where: {
      OR: [
        { name: { contains: 'Alexandra' } },
        { name: { contains: 'Vance' } },
        { name: { contains: 'Pierce' } },
      ]
    }
  });
  if (alexandra) {
    await prisma.character.update({
      where: { id: alexandra.id },
      data: {
        name: 'Alexandra Vance',
        firstName: 'Alexandra',
        lastName: 'Vance',
        nameVariants: '["Alexandra Pierce", "Alex Vance", "Alex Pierce"]',
        archetype: 'Client / Temptation',
        background: 'Client of a rocket company. Flirts with Jasper in Book 1 during the long period without sex at home.',
        relationships: 'BSS client. Flirts with Jasper Barrett in Book 1 during marital tension.',
        affiliationRole: 'BSS Client - Rocket company executive',
        personality: 'Flirtatious, ambitious. Represents temptation for Jasper during difficult period in his marriage.',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Alexandra Vance (rocket company client)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Alexandra Vance',
        firstName: 'Alexandra',
        lastName: 'Vance',
        nameVariants: '["Alexandra Pierce", "Alex Vance", "Alex Pierce"]',
        archetype: 'Client / Temptation',
        background: 'Client of a rocket company. Flirts with Jasper in Book 1 during the long period without sex at home.',
        relationships: 'BSS client. Flirts with Jasper Barrett in Book 1 during marital tension.',
        affiliationRole: 'BSS Client - Rocket company executive',
        personality: 'Flirtatious, ambitious. Represents temptation for Jasper during difficult period in his marriage.',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Alexandra Vance (rocket company client)');
  }

  // === MARISOL VEGA (Elena's college roommate) ===
  const marisol = await prisma.character.findFirst({
    where: { name: { contains: 'Marisol' } }
  });
  if (marisol) {
    await prisma.character.update({
      where: { id: marisol.id },
      data: {
        name: 'Marisol Vega',
        firstName: 'Marisol',
        lastName: 'Vega',
        archetype: 'Best Friend / Guidance Counselor',
        careerHistory: 'High School Guidance Counselor',
        background: 'Elena\'s college roommate and best friend. Now works as a high school guidance counselor.',
        relationships: 'Elena Barrett\'s college roommate and best friend. Close friend of Anna Cho.',
        wivesClubRole: 'Extended Circle - Elena\'s College Friend',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Marisol Vega (Elena\'s college roommate)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Marisol Vega',
        firstName: 'Marisol',
        lastName: 'Vega',
        archetype: 'Best Friend / Guidance Counselor',
        careerHistory: 'High School Guidance Counselor',
        background: 'Elena\'s college roommate and best friend. Now works as a high school guidance counselor.',
        relationships: 'Elena Barrett\'s college roommate and best friend. Close friend of Anna Cho.',
        wivesClubRole: 'Extended Circle - Elena\'s College Friend',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Marisol Vega (Elena\'s college roommate)');
  }

  // === ANNA CHO (Elena's college best friend - photographer) ===
  const anna = await prisma.character.findFirst({
    where: { name: { contains: 'Anna Cho' } }
  });
  if (anna) {
    await prisma.character.update({
      where: { id: anna.id },
      data: {
        name: 'Anna Cho',
        firstName: 'Anna',
        lastName: 'Cho',
        archetype: 'Best Friend / World-Class Photographer',
        careerHistory: 'World-class photographer',
        background: 'Elena\'s college best friend. Now a world-class photographer.',
        relationships: 'Elena Barrett\'s college best friend. Close friend of Marisol Vega.',
        wivesClubRole: 'Extended Circle - Elena\'s College Friend',
        sourceFiles: 'Canon update',
      }
    });
    console.log('Updated: Anna Cho (Elena\'s college friend - photographer)');
  } else {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Anna Cho',
        firstName: 'Anna',
        lastName: 'Cho',
        archetype: 'Best Friend / World-Class Photographer',
        careerHistory: 'World-class photographer',
        background: 'Elena\'s college best friend. Now a world-class photographer.',
        relationships: 'Elena Barrett\'s college best friend. Close friend of Marisol Vega.',
        wivesClubRole: 'Extended Circle - Elena\'s College Friend',
        sourceFiles: 'Canon update',
        isConfirmed: true,
      }
    });
    console.log('Created: Anna Cho (Elena\'s college friend - photographer)');
  }

  // Also update Elena with her college friends
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        relationships: 'Married to Jasper Barrett. Mother of Grace (1st grade at Book 1 start) and baby Lucas. Older sister: Camila (married to European royal). Younger sister: Sara Whitaker (owns CrossFit gym). College best friends: Marisol Vega (college roommate, now HS guidance counselor) and Anna Cho (world-class photographer).',
      }
    });
    console.log('Updated Elena with college friends');
  }

  // === Create Sara's children if they don't exist ===
  const childrenToCreate = [
    { name: 'Chloe Whitaker', note: 'Sara\'s daughter from first marriage (Mitchell)' },
    { name: 'Lily Whitaker', note: 'Sara\'s daughter from first marriage (Mitchell)' },
    { name: 'Ethan Whitaker', note: 'Sara and Mark Whitaker\'s baby' },
  ];

  for (const child of childrenToCreate) {
    const exists = await prisma.character.findFirst({
      where: { name: { contains: child.name.split(' ')[0] } }
    });
    if (!exists) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          name: child.name,
          firstName: child.name.split(' ')[0],
          lastName: 'Whitaker',
          archetype: 'Child',
          relationships: `Child of Sara Whitaker. ${child.note}. Cousins: Grace and Lucas Barrett.`,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${child.name}`);
    }
  }

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
