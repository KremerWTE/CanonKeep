import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Sara's Elite CrossFit Athletes...\n");

  const crossfitAthletes = [
    // ========== DYLAN MARKS ==========
    {
      name: 'Dylan Marks',
      firstName: 'Dylan',
      lastName: 'Marks',
      archetype: 'Elite CrossFit Athlete',
      careerHistory: 'Elite CrossFit athlete. 5th overall men at CrossFit Games.',
      affiliationRole: 'CrossFit Games Athlete - Men',
      relationships: "Trains at Sara Whitaker's CrossFit gym. 5th place overall men.",
      background: "One of Sara Whitaker's elite CrossFit athletes. Achieved 5th place overall in the men's division at the CrossFit Games. Part of Sara's stable of championship-level athletes.",
    },

    // ========== TASHA VELEZ ==========
    {
      name: 'Tasha Velez',
      firstName: 'Tasha',
      lastName: 'Velez',
      archetype: 'Elite CrossFit Athlete',
      careerHistory: 'Elite CrossFit athlete. 3rd overall women at CrossFit Games.',
      affiliationRole: 'CrossFit Games Athlete - Women',
      relationships: "Trains at Sara Whitaker's CrossFit gym. 3rd place overall women (podium).",
      background: "One of Sara Whitaker's elite CrossFit athletes. Achieved 3rd place overall (podium finish) in the women's division at the CrossFit Games. One of Sara's top female competitors.",
    },

    // ========== ELI ROURKE (MORENO) ==========
    {
      name: 'Eli Rourke',
      firstName: 'Eli',
      lastName: 'Rourke',
      nameVariants: 'Eli Moreno',
      archetype: 'Adaptive CrossFit Champion',
      careerHistory: 'Elite adaptive CrossFit athlete. Winner of adaptive lower extremity division.',
      affiliationRole: 'CrossFit Games Athlete - Adaptive Champion',
      relationships: "Trains at Sara Whitaker's CrossFit gym. Winner of adaptive lower extremity division.",
      background: "One of Sara Whitaker's elite CrossFit athletes. Champion in the adaptive lower extremity division at the CrossFit Games. Inspirational athlete who proves that physical challenges don't define limits.",
    },

    // ========== TESSA QUINN ==========
    {
      name: 'Tessa Quinn',
      firstName: 'Tessa',
      lastName: 'Quinn',
      archetype: 'Elite CrossFit Athlete',
      careerHistory: 'Elite CrossFit athlete. Top 10 women finish at CrossFit Games.',
      affiliationRole: 'CrossFit Games Athlete - Women',
      relationships: "Trains at Sara Whitaker's CrossFit gym. Top 10 women finish.",
      background: "One of Sara Whitaker's elite CrossFit athletes. Achieved top 10 finish in the women's division at the CrossFit Games. Consistent high-level competitor.",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const athlete of crossfitAthletes) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: athlete.name },
          { firstName: athlete.firstName, lastName: athlete.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: athlete
      });
      console.log(`Updated: ${athlete.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...athlete,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${athlete.name}`);
      created++;
    }
  }

  // Update Kendra Whitaker with maiden name Voss and CrossFit Games wins
  const kendra = await prisma.character.findFirst({
    where: { name: { contains: 'Kendra' }, bssRole: { not: null } }
  });
  if (kendra) {
    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        nameVariants: 'Kendra Voss (maiden name)',
        careerHistory: 'Elite CrossFit Games champion (multiple wins). Started as analyst at BSS. Now Senior Analyst/Fixer.',
        background: `Raised Catholic, never walked away from faith. Elite CrossFit athlete who was new to qualifications but went on to win the CrossFit Games several times - trained at Sara Whitaker's gym. Becomes working mother balancing championship training, BSS career, and family. Groomed to become fixer. Develops East Coast corridor expertise. Known for running "full speed" at work. Journaling helps process emotions. Maternity year: graduated from analyst to fixer while raising baby.`,
        relationships: "Married to Chris (Whitaker). Daughter: Sophia Addison Whitaker. Past romantic involvement with Addie (complicates working relationship). Bella is her field analyst. Addie is mentor/godmother to Sophia. Hawk is godfather to Sophia. Trained at Sara Whitaker's CrossFit gym - multiple Games champion.",
      }
    });
    console.log('\nUpdated Kendra Whitaker with maiden name Voss and CrossFit Games wins');
  }

  // Update Sara Whitaker with her athletes
  const sara = await prisma.character.findFirst({
    where: { name: { contains: 'Sara' } }
  });
  if (sara) {
    await prisma.character.update({
      where: { id: sara.id },
      data: {
        careerHistory: 'Owns CrossFit gym. Trains elite Games-level athletes.',
        background: "Elena's younger sister (formerly Mitchell from first marriage). Owns a CrossFit gym that trains elite Games-level athletes. Has children Chloe and Lily from first marriage, and Ethan with Mark Whitaker. Her gym has produced multiple CrossFit Games champions and podium finishers.",
        relationships: "Elena Barrett's younger sister. Married to Mark Whitaker. Children: Chloe, Lily (first marriage), Ethan (with Mark). Trains elite athletes: Dylan Marks (5th men), Tasha Velez (3rd women), Eli Rourke (adaptive champion), Kendra Voss/Whitaker (multiple Games winner), Tessa Quinn (top 10 women).",
      }
    });
    console.log('Updated Sara Whitaker with her elite athletes');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
