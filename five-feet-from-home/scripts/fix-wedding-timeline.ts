import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Fixing Kendra & Chris Timeline Order...\n");
  console.log("CORRECT ORDER:");
  console.log("1. Engagement (NY Gala)");
  console.log("2. Compound/House Construction");
  console.log("3. Wedding");
  console.log("4. Pregnancy\n");

  // Update Donnelly House Construction - BEFORE wedding
  const houseEvent = await prisma.event.findFirst({
    where: { name: 'Donnelly House Construction' }
  });

  if (houseEvent) {
    await prisma.event.update({
      where: { id: houseEvent.id },
      data: {
        timelineRef: 'After engagement, before wedding',
        description: `Chris and Kendra build house on property adjacent to Addie and Hawk near Elena's compound BEFORE the wedding.

The compound becomes their foundation - a home ready and waiting for their future together.

Includes massive shared gym between properties - their daily battleground and gathering place for the extended family.

Building the house first shows Chris's practical, grounded approach: "Let's build our life first, then celebrate it."`,
      }
    });
    console.log('Updated: Donnelly House Construction → After engagement, before wedding');
  }

  // Update Wedding - AFTER house construction
  const weddingEvent = await prisma.event.findFirst({
    where: { name: 'Chris & Kendra Wedding' }
  });

  if (weddingEvent) {
    await prisma.event.update({
      where: { id: weddingEvent.id },
      data: {
        timelineRef: 'After compound construction',
        description: `Top-tier millionaire wedding AFTER the compound house is built.

Kendra walks aisle radiant and strong. Hawk toasts about wrestling Kendra into a gown.

Addie's legendary speech: 'She swore no man would ever tame her. Turns out Chris didn't tame her — he just matched her.'

Chris's vow: "You've been my fire and my fight. Now you're my home. Always."
Kendra's vow: "I never thought I'd let someone close enough to hold me. But you broke through. So I'm yours. Forever."

Night ended with fireworks over the estate - their new compound home visible in the distance.`,
      }
    });
    console.log('Updated: Chris & Kendra Wedding → After compound construction');
  }

  // Update Pregnancy - AFTER wedding
  const pregnancyEvent = await prisma.event.findFirst({
    where: { name: 'Kendra Pregnancy Reveal' }
  });

  if (pregnancyEvent) {
    await prisma.event.update({
      where: { id: pregnancyEvent.id },
      data: {
        timelineRef: 'After wedding',
        description: `AFTER the wedding, Addie notices something off at the gym and calls it out before Kendra suspects.

Kendra takes a test in her bathroom at the new compound house - positive.

First tells Chris (who responds with steady optimism - they already have the house with the yard), then Addie (who jokes "So is it Chris' or mine?" - only she could get away with that).

The compound they built before the wedding now has purpose - room for their growing family.`,
      }
    });
    console.log('Updated: Kendra Pregnancy Reveal → After wedding');
  }

  // Update Kendra's character profile
  const kendra = await prisma.character.findFirst({
    where: { firstName: 'Kendra', lastName: 'Whitaker' }
  });

  if (kendra) {
    const background = kendra.background || '';
    if (background.includes('PREGNANCY & WEDDING ARC')) {
      const newBackground = background.replace(
        /PREGNANCY & WEDDING ARC:[\s\S]*?Adjacent neighbors to Addie and Hawk/,
        `TIMELINE:
1. ENGAGEMENT at NY Gala - Chris proposes on balcony overlooking city
2. COMPOUND CONSTRUCTION - Build house adjacent to Addie/Hawk before wedding
3. WEDDING - Top-tier millionaire wedding, radiant and strong
4. PREGNANCY - Discovered after wedding, in their new compound home

ENGAGEMENT at NY Gala hosted by Hawk's Foundation:
Chris slipped away with her onto a balcony overlooking the city. His blunt proposal: "You already fight beside me in everything. Marry me, and we'll build the rest together."
Her response: "God, you're terrible at speeches. But yes."

HOME (Before Wedding):
Built house on property adjacent to Addie and Hawk near Elena's compound. Massive shared gym between properties. Chris's practical approach: "Let's build our life first, then celebrate it."

WEDDING (After Compound):
Top-tier millionaire wedding. Kendra walked aisle radiant and strong.
Vows - Kendra: "I never thought I'd let someone close enough to hold me. But you broke through. So I'm yours. Forever."
Addie's speech was legendary: "She swore no man would ever tame her. Turns out Chris didn't tame her — he just matched her."
Night ended with fireworks, their compound home visible in the distance.

PREGNANCY (After Wedding):
Addie noticed something off at the gym. Kendra took the test in her new compound bathroom - positive.
Chris responded with steady optimism - they already had the house with the yard.
Addie joked "So is it Chris' or mine?" - only she could get away with that.

Adjacent neighbors to Addie and Hawk`
      );

      await prisma.character.update({
        where: { id: kendra.id },
        data: { background: newBackground }
      });
      console.log('Updated: Kendra character profile with correct timeline');
    }
  }

  console.log("\nTimeline corrected!");
  console.log("1. Engagement (NY Gala)");
  console.log("2. Compound/House Construction");
  console.log("3. Wedding");
  console.log("4. Pregnancy");

  await prisma.$disconnect();
}

main().catch(console.error);
