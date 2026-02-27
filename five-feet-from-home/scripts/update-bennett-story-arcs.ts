import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Updating Bennett Family Story Arcs...\n");

  // ========== GRACE BARRETT ==========
  const grace = await prisma.character.findFirst({
    where: { name: { contains: 'Grace' }, lastName: 'Barrett' }
  });
  if (grace) {
    await prisma.character.update({
      where: { id: grace.id },
      data: {
        arcStart: 'Young daughter starting 1st grade. Active in sports.',
        arcChange: 'Chapter 4: Sprains ankle during sports activity. First major family health scare.',
        background: "Jasper and Elena's daughter, in 1st grade at start of Book 1. Active in sports. Sprains ankle in Chapter 4. Warm, kindhearted. Adores Addie, Kendra, and Bella. Does NOT favor Selene (\"Selene's boring. She doesn't play\"). Symbol: The pawn capable of becoming queen.",
      }
    });
    console.log('Updated: Grace Barrett with ankle sprain arc');
  }

  // ========== ELENA BARRETT ==========
  const elena = await prisma.character.findFirst({
    where: { name: { contains: 'Elena Barrett' } }
  });
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        arcStart: 'Southern mother raising Grace and expecting Lucas. Supporting Jasper while managing her own career.',
        arcChange: 'Chapter 9: Neurological episode causes her to pass out - hospitalized with Jasper by her side. Relapses when Jasper leaves for crisis. 3-year abstinence period with Jasper. Hints at divorce. Eventually becomes pregnant with Lucas, gives birth, faces postpartum challenges.',
        arcEnd: 'Reclaims her identity as CEO of Maison Aurelia while navigating motherhood and marriage.',
        background: `Lives on Barrett family compound outside Charlotte, NC in Appalachian foothills. Former luxury real estate agent and literary non-profit organizer. Elite party planner who started in high society. Now southern mother raising Grace (1st grade at Book 1 start) and baby Lucas. CEO of Maison Aurelia.

STORY ARC: Chapter 9 - Has neurological episode and passes out, hospitalized. Jasper stays with her but must leave for crisis, leading to relapse. Marriage strained by 3-year period of abstinence. Hints at divorce during crisis. Eventually becomes pregnant with Lucas, gives birth, struggles with postpartum issues. Her neurologist is Dr. Julia Bennett (also a friend).`,
      }
    });
    console.log('Updated: Elena Barrett with full story arc');
  }

  // ========== JASPER BARRETT ==========
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });
  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        arcStart: 'Workaholic CEO putting career before family. Missing key moments with Grace.',
        arcChange: 'Elena\'s hospitalization forces reckoning. Must choose between crisis and wife. 3-year abstinence period strains marriage. Alexandra Vance tempts him during this vulnerable time. Elena hints at divorce. Must learn to balance empire with family.',
        arcEnd: 'Shifts from Work 90%/Family 10% toward Work 60%/Family 40%. Learns to delegate. Builds compound office to stay close to family.',
        background: `Lives on large compound outside Charlotte, NC in Appalachian foothills. Estate has many guest rooms and extensive land. Started in Construction Management as PM before being found by Jessica Hall. CEO and Founder of BSS (Barrett Security Solutions). BSS is corporate crisis management firm employing tier operators, cyber analysts, and fixers. Grew from 2 clients in townhouse garage to global think tank. Leads 6am/6pm "battle handoff" rituals. Lives by "Five Foot World" mindset.

STORY ARC: Chapter 9 - Stays at hospital when Elena passes out from neurological issue. Forced to leave for crisis, Elena relapses. Marriage endures 3-year period of abstinence. Alexandra Vance (rocket company client) tempts him during this vulnerable period. Elena hints at divorce. Must reckon with his workaholism. Eventually witnesses Elena's pregnancy, Lucas's birth, and postpartum struggles. Addie introduced as main character during hospital chapter.`,
      }
    });
    console.log('Updated: Jasper Barrett with full story arc');
  }

  // ========== ADDISON PRICE (ADDIE) ==========
  const addie = await prisma.character.findFirst({
    where: { OR: [{ name: { contains: 'Addison' } }, { name: { contains: 'Addie' } }] }
  });
  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        arcStart: 'Rough but sharp assistant at BSS. Unknown to readers.',
        arcChange: 'Chapter 9: Introduced as main character during Elena\'s hospitalization. Steps up when Jasper must leave for crisis. Proves herself invaluable.',
        arcEnd: 'Rises to Managing Partner. Becomes POH (Patroness of Honor). Marries Hawk. Has twins and Mikey.',
        background: `Started as office assistant, then analyst at BSS. Evolved into core operator and strategic leader. Initially resisted POH title but grew into role. Las Vegas breakthrough: 3-week operation exposing money laundering, mafia/cartel pipeline, and trafficking ring. Converts to Catholicism with Hawk to become Grace's godparents. "IT girl" who thrived where perfect resumes (PhDs, Navy SEALs, Rhodes Scholars) failed.

INTRODUCED: Chapter 9 - Becomes main character during Elena's hospitalization crisis. When Jasper must leave Elena's side for a BSS crisis, Addie steps up and proves herself as more than just an assistant. This chapter marks her emergence as a central figure in both BSS operations and the Barrett family's support system.`,
      }
    });
    console.log('Updated: Addison Price with introduction arc');
  }

  // ========== ALEXANDRA VANCE ==========
  const alexandra = await prisma.character.findFirst({
    where: { name: { contains: 'Alexandra' } }
  });
  if (alexandra) {
    await prisma.character.update({
      where: { id: alexandra.id },
      data: {
        arcStart: 'Client of BSS through rocket company. Attracted to Jasper.',
        arcChange: 'Tempts Jasper during the 3-year abstinence period between him and Elena. Tests his loyalty during vulnerable time in his marriage.',
        background: `Client of a rocket company who flirts with Jasper in Book 1 during the long period without intimacy at home. Also known in some versions as Pierce.

STORY ARC: During the 3-year abstinence period between Jasper and Elena, Alexandra tempts Jasper at his most vulnerable. She represents the external threat to the Barrett marriage while Elena's health issues represent the internal strain. Her attempted seduction tests whether Jasper will choose the excitement of a new relationship or fight for his marriage.`,
      }
    });
    console.log('Updated: Alexandra Vance with temptation arc');
  }

  // ========== DR. JULIA BENNETT ==========
  const drBennett = await prisma.character.findFirst({
    where: { name: { contains: 'Julia Bennett' } }
  });
  if (drBennett) {
    await prisma.character.update({
      where: { id: drBennett.id },
      data: {
        background: "Elena Barrett's neurologist who has also become a personal friend. Provides medical expertise while being part of Elena's trusted inner circle. Key figure in Elena's Chapter 9 hospitalization for neurological episode. Her dual role as doctor and friend gives Elena both medical care and emotional support during her health crisis and recovery.",
      }
    });
    console.log('Updated: Dr. Julia Bennett with Elena\'s neuro crisis role');
  }

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
