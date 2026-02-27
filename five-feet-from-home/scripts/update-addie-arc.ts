import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const addie = await prisma.character.findFirst({ where: { name: 'Addie Price' } });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        arcStart: 'BSS Managing Partner, married to Hawk, practical stabilizer of the Wives Club. Primarily operational/administrative role at BSS.',

        arcChange: `Becomes Elena's rock during Jasper's absences - handles everything at hospital during Elena's medical crisis (grayscale, birth complications, postpartum). This crisis work awakens something in her. Starts taking on fixer work herself. Begins having conflicts with Jasper over direction and methods. Bond with Elena deepens, extends to include Kendra.`,

        arcEnd: 'Evolving from Managing Partner to Fixer in her own right. Growing tension/conflicts with Jasper over BSS. Intimate dynamic with Elena and Kendra (cabin threesome). Navigating all this while married to Hawk.',

        background: `Military intelligence background, same unit as Jasper. Recruited to help start BSS, became Managing Partner. During Elena's medical crisis in Book 1, Addie handled everything - hospital, home, kids, Wives Club coordination. This experience showed her she could do the fixer work, not just manage operations. By Book 2, she's taking on her own cases and starting to clash with Jasper.`,

        careerHistory: 'Military Intelligence → BSS Co-founder/Managing Partner → Emerging as Fixer',

        motivations: 'Proving herself as a fixer, not just support. Protecting Elena and the people she loves. Building something of her own.',

        flaw: 'Takes on too much. Conflict between loyalty to Jasper/BSS and her own ambitions.',

        secrets: 'Growing resentment toward Jasper for taking her for granted; cabin threesome with Elena and Kendra; ambition to be more than Managing Partner',
      }
    });
    console.log('Updated Addie with fixer arc and Jasper conflicts');
  }

  // Also add this as a plot thread
  const project = await prisma.project.findFirst();
  if (project) {
    try {
      await prisma.plotThread.create({
        data: {
          projectId: project.id,
          name: 'Addie Becomes a Fixer',
          premise: 'Addie evolves from BSS Managing Partner to Fixer in her own right, leading to conflicts with Jasper',
          stakes: 'BSS partnership, Addie\'s identity, her relationships with Jasper and Elena',
          status: 'active',
        }
      });
      console.log('Added plot thread: Addie Becomes a Fixer');
    } catch (e: any) {
      if (e.code === 'P2002') console.log('Plot thread already exists');
    }

    try {
      await prisma.plotThread.create({
        data: {
          projectId: project.id,
          name: 'Addie vs Jasper Conflicts',
          premise: 'Growing tension between Addie and Jasper over BSS direction, methods, and recognition',
          stakes: 'BSS leadership, their friendship, the found family dynamic',
          status: 'active',
        }
      });
      console.log('Added plot thread: Addie vs Jasper Conflicts');
    } catch (e: any) {
      if (e.code === 'P2002') console.log('Plot thread already exists');
    }
  }

  // Update Kendra - becomes Addie's analyst
  const kendra = await prisma.character.findFirst({ where: { name: 'Kendra Donnelly' } });
  if (kendra) {
    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        arcStart: 'The Integrator of Wives Club, married to Chris, enthusiastic organizer',

        arcChange: 'As Addie evolves into a fixer, Kendra becomes her analyst. Uses her organizational skills and network knowledge for intelligence gathering. Part of intimate dynamic with Addie and Elena (cabin threesome). Competes in Crossfit.',

        arcEnd: 'Found her professional calling as Addie\'s analyst. Balancing fixer work with Wives Club role and marriage to Chris.',

        affiliationRole: 'Addie\'s Analyst, Wives Club Integrator',
        bssRole: 'Analyst (Addie\'s team)',

        careerHistory: 'Wives Club organizer → Addie\'s Analyst',

        motivations: 'Supporting Addie, proving her value beyond social organizing, the thrill of fixer work',

        secrets: 'Cabin threesome with Addie and Elena; growing ambition in fixer world; how much she enjoys the work',
      }
    });
    console.log('Updated Kendra - becomes Addie\'s analyst');
  }

  // Update Addie's team info (stored in relationships field)
  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        mentorsMentees: 'Kendra (Analyst) - mentee/protégé',
      }
    });
  }

  console.log('\nDone!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
