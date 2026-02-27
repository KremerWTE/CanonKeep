import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const elena = await prisma.character.findFirst({ where: { name: 'Elena Barrett' } });

  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        // Proper character arc - journey not just issues
        arcStart: 'Confident wife and mother, the graceful center of the Wives Club, managing elite social world while pregnant',
        arcChange: 'Faces isolation as Jasper is constantly called away on crises. Deals with grayscale brain diagnosis during pregnancy, difficult birth of baby boy, post-birth complications, postpartum depression. Long stretches without intimacy or partner support. Leans heavily on Addie for emotional and practical support, developing deeper bond.',
        arcEnd: 'Transformed by her struggles - more vulnerable but also stronger. Relationship with Jasper strained by distance. Complex emotional entanglement develops between herself, Jasper, and Addie.',

        // Background with full Book 1 storyline
        background: `Elena comes from Boston old-money family. The graceful queen of the Wives Club. In Book 1: Discovers grayscale condition on brain during pregnancy. Jasper is constantly away on BSS crises (London data breach, Hong Kong, etc.). Gives birth to baby boy with complications. Struggles with postpartum issues alone. Long periods without intimacy due to Jasper's absences and her medical recovery. Addie becomes her primary support system, leading to deepening bond that eventually becomes a complex threesome dynamic with Jasper.`,

        // Key details
        fears: 'Losing Jasper to his work, her health failing, the family falling apart',
        motivations: 'Keeping her family together, being the anchor everyone needs, finding balance between her needs and everyone else\'s',
        flaw: 'Puts everyone else first until she breaks, struggles to ask for help',
        secrets: 'Depth of her loneliness and resentment about Jasper\'s absences; growing feelings in the dynamic with Addie; severity of her medical struggles',
      }
    });
    console.log('Updated Elena with proper character arc');
  }

  // Also update Jasper's arc for Book 1
  const jasper = await prisma.character.findFirst({ where: { name: 'Jasper Barrett' } });
  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        arcStart: 'Elite fixer at the top of his game, devoted family man who believes he can balance both worlds',
        arcChange: 'Constantly pulled away by escalating crises (12+ major cases in Book 1). Missing his wife\'s pregnancy struggles, birth complications, postpartum depression. Long periods away from home, no intimacy with Elena. Guilt mounting but unable to step back from work.',
        arcEnd: 'Forced to confront the cost of his choices. Marriage strained. Complex dynamic develops with Elena and Addie as they all navigate the aftermath.',
        fears: 'Failing his clients, failing his family, having to choose between them',
        motivations: 'Protecting those who need him - both clients and family',
        flaw: 'Cannot say no to a crisis, believes he\'s indispensable',
        secrets: 'Knows he\'s failing Elena; the complexity of feelings in the threesome dynamic',
      }
    });
    console.log('Updated Jasper with proper character arc');
  }

  // Update Addie's arc too
  const addie = await prisma.character.findFirst({ where: { name: 'Addie Price' } });
  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        arcStart: 'BSS Managing Partner, married to Hawk, practical stabilizer of the Wives Club',
        arcChange: 'Becomes Elena\'s rock during Jasper\'s absences. Provides emotional and practical support through pregnancy, birth, medical crises. Bond deepens beyond friendship.',
        arcEnd: 'Navigating complex emotional territory - loyalty to Elena, her own marriage to Hawk, and the developing threesome dynamic with Jasper and Elena',
        fears: 'Losing the people she loves, being caught between loyalties',
        motivations: 'Taking care of everyone, being the reliable one',
        flaw: 'Takes on too much responsibility for others\' problems',
        secrets: 'The depth of her bond with Elena; her role in the developing dynamic with Jasper',
      }
    });
    console.log('Updated Addie with proper character arc');
  }

  console.log('\nDone - character arcs now show journey, not just issues');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
