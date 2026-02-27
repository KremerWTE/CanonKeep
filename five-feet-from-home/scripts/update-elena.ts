import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Update Elena Barrett with Book 1 storyline
  const elena = await prisma.character.findFirst({ where: { name: 'Elena Barrett' } });

  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        arcStart: 'Pregnant, dealing with grayscale condition on brain discovered during pregnancy',
        arcChange: 'Gives birth to baby boy, faces post-birth complications linked to brain condition, struggles with postpartum issues while Jasper is away on crises',
        arcEnd: 'Relationship dynamics shift - becomes entangled in complex emotional threesome dynamic with Jasper and Addie',
        background: `Elena comes from Boston old-money family. Married to Jasper Barrett. During Book 1, she faces significant medical challenges including a brain condition (grayscale) discovered during pregnancy, followed by post-birth complications and postpartum struggles - all while managing the household and Wives Club during Jasper's extended absences.`,
        secrets: 'The depth of her medical struggles; the complex emotional dynamics developing between herself, Jasper, and Addie',
      }
    });
    console.log('Updated Elena Barrett with Book 1 arc');
  } else {
    console.log('Elena Barrett not found');
  }

  // Add Elena's medical crisis
  const project = await prisma.project.findFirst();
  if (!project) return;

  try {
    await prisma.crisis.create({
      data: {
        projectId: project.id,
        name: "Elena's Medical Crisis",
        crisisType: 'Personal/Medical',
        location: 'Charlotte, NC',
        timeframe: 'Book 1',
        severity: 'Critical',
        description: 'Elena discovers grayscale condition on brain during pregnancy. After giving birth to baby boy, faces post-birth complications linked to brain condition and postpartum struggles.',
        situation: 'Medical crisis during pregnancy and postpartum period',
        complications: 'Jasper frequently away on BSS crises, leaving Elena to cope with support of Wives Club and particularly Addie',
        bssTeam: 'Addie Price (primary support)',
        stakes: "Elena's health, family stability, Barrett marriage",
        status: 'ongoing',
        bookAppearance: 'Book 1 - Major subplot'
      }
    });
    console.log("Added Elena's Medical Crisis");
  } catch (e: any) {
    if (e.code === 'P2002') {
      console.log("Elena's Medical Crisis already exists");
    }
  }

  // Also add the new baby to characters
  const existingBaby = await prisma.character.findFirst({ where: { name: { contains: 'Baby Barrett' } } });
  if (!existingBaby) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Baby Boy Barrett',
        firstName: 'TBD',
        lastName: 'Barrett',
        relationships: 'Son of Jasper and Elena Barrett, younger sibling to Grace, Lucas, and Izzy',
        firstAppearance: 'Book 1 - born during story',
        background: 'Born during Book 1, birth complicated by Elena\'s brain condition',
      }
    });
    console.log('Added Baby Boy Barrett');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
