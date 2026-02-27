import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Updating Chris Donnelly & Kendra Storyline...\n");

  // Update Chris Donnelly with expanded backstory
  const chris = await prisma.character.findFirst({
    where: { firstName: 'Chris', lastName: 'Donnelly' }
  });

  if (chris) {
    await prisma.character.update({
      where: { id: chris.id },
      data: {
        background: `Boston-born Irish-American. Firefighter dad, nurse mom. Grew up Catholic — Mass on Sundays, altar serving, Knights of Columbus fish fries. The faith never left him, even when his path veered into finance and athletics.

Notre Dame graduate — Economics major, Political Science minor. Played club hockey, lived for Saturday football games. Two lifelong relationships from Notre Dame: Fr. James Callahan (roommate turned priest) and Msgr. Patrick Reilly (eventual spiritual director).

Through his faith partnership with Dr. Evelyn Ross, invited into Catholic finance & philanthropic boards, high-level Vatican/Jesuit diplomatic dinners. His Boston Brahmin connections give him leverage in old money circles.

RELATIONSHIP WITH KENDRA:
- Married to Kendra Whitaker (BSS operator, CrossFit athlete)
- Engagement: NY Gala hosted by Hawk's Foundation - proposed on balcony overlooking the city
- Wedding: Top-tier millionaire wedding, Kendra pregnant but glowing
- Home: Built house on adjacent property to Addie and Hawk, with massive gym between properties
- First Child: Learning of Kendra's pregnancy was a pivotal moment - he responded with steady optimism, envisioning house with yard, dogs, family life`,

        personality: `Grounded, stubborn (only Msgr. Reilly can out-stubborn him), faithful, intense about CrossFit. Blue-collar roots despite finance career.

In relationship with Kendra: Steady and grounding. When Kendra panics, he anchors. When she pushes back, he holds steady. His optimism isn't naive - it's earned through faith and discipline.

His proposal was blunt and simple: "You already fight beside me in everything. Marry me, and we'll build the rest together."

His vow: "You've been my fire and my fight. Now you're my home. Always."`,

        relationships: `Married to Kendra (Whitaker).

Spiritual director: Msgr. Patrick Reilly (known him since his 20s, meets for coffee or golf).

College roommate/best friend: Fr. James Callahan (two years at Notre Dame, still talks monthly, kept Chris anchored when his dad died suddenly, still calls Chris "Donny").

Close to Dr. Evelyn Ross through Catholic faith - they connect on quiet moments, long talks about vocation and calling, supporting each other balancing faith with ambition. They share Msgr. Reilly as spiritual director.

Through faith circles: Access to Catholic Medical Association, Vatican-linked bioethics think tanks, Boston Catholic elite.

Lives on property adjacent to Addie and Hawk near Elena's compound - shares massive gym between properties.`,

        majorCases: `Vatican Bank Leak crisis - uses Catholic connections to provide cover and controlled disclosure.

Boston Brahmin Family Secrets - handles through Catholic elite connections, multi-quarter management of old money crisis.`,

        arcStart: 'Finance professional with deep Catholic roots, married to Kendra',
        arcChange: 'Learning of Kendra\'s pregnancy, building family life while maintaining BSS connections',
        arcEnd: 'Father, husband, faith anchor for the group, living on compound adjacent to Addie/Hawk',
      }
    });
    console.log('Updated: Chris Donnelly with expanded backstory');
  }

  // Update Kendra with pregnancy/wedding storyline
  const kendra = await prisma.character.findFirst({
    where: { firstName: 'Kendra', lastName: 'Whitaker' }
  });

  if (kendra) {
    const currentBackground = kendra.background || '';
    const currentRelationships = kendra.relationships || '';

    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        background: currentBackground + `

PREGNANCY & WEDDING ARC:
Addie noticed something off at the gym - called it out before Kendra even suspected. Bought a test at a pharmacy, took it in her minimalist bathroom. Positive.

Her first fear: CrossFit Games timeline, Regionals, her carefully mapped athletic career. All of it shifting.

Telling Chris: He was steady, optimistic. When she panicked about losing her identity, he said "Get a house. With a yard. So our kid has room to run wild. Maybe a dog. Maybe two."

ENGAGEMENT at NY Gala hosted by Hawk's Foundation:
Chris slipped away with her onto a balcony overlooking the city. In a midnight-blue gown, she heard his blunt proposal: "You already fight beside me in everything. Marry me, and we'll build the rest together."
Her response: "God, you're terrible at speeches. But yes."

WEDDING:
Top-tier millionaire wedding. Kendra walked the aisle pregnant but glowing, gown tailored to her frame.
Vows - Kendra: "I never thought I'd let someone close enough to hold me. But you broke through. So I'm yours. Forever."
Addie's speech was legendary: "She swore no man would ever tame her. Turns out Chris didn't tame her — he just matched her."
Night ended with fireworks over the estate.

HOME:
Built house on property adjacent to Addie and Hawk near Elena's compound. Massive shared gym between properties - their daily battleground and gathering place.`,

        relationships: currentRelationships + `

Married to Chris Donnelly (Notre Dame, Catholic, finance).

History with Addie: Had a romantic thing before Chris and after for a bit. Now deep platonic bond. Addie was first to notice pregnancy, first person Kendra told after Chris. Addie joked "So is it Chris' or mine?" - only she could get away with that.

Adjacent neighbors to Addie and Hawk - share massive gym between properties.

Wives club support: Elena (emotional), Evelyn (doctor mode), Sara (teasing).`,

        arcStart: 'Elite BSS operator and CrossFit athlete, fiercely independent',
        arcChange: 'Pregnancy disrupts her carefully planned athletic timeline, but Chris anchors her',
        arcEnd: 'Mother, wife, still fierce but allowing herself family and support system',
      }
    });
    console.log('Updated: Kendra Whitaker with pregnancy/wedding storyline');
  }

  // Create key events
  const events = [
    {
      name: "Chris & Kendra Engagement",
      description: "Chris proposes to Kendra at NY Gala hosted by Hawk's Foundation. On a balcony overlooking the city, he blurts out: 'You already fight beside me in everything. Marry me, and we'll build the rest together.' She responds: 'God, you're terrible at speeches. But yes.'",
      timelineRef: 'NY Gala - Before main series events',
      consequences: 'Sets up wedding arc and family building',
    },
    {
      name: "Kendra Pregnancy Reveal",
      description: "Addie notices something off at the gym and calls it out before Kendra suspects. Kendra takes a test - positive. First tells Chris (who responds with optimism about house with yard), then Addie (who jokes 'So is it Chris' or mine?').",
      timelineRef: 'After engagement',
      consequences: 'Shifts Kendra\'s CrossFit Games/Regionals timeline, begins family building arc',
    },
    {
      name: "Chris & Kendra Wedding",
      description: "Top-tier millionaire wedding. Kendra walks aisle pregnant but glowing. Hawk toasts about wrestling Kendra into a gown. Addie's legendary speech: 'She swore no man would ever tame her. Turns out Chris didn't tame her — he just matched her.' Night ends with fireworks.",
      timelineRef: 'After pregnancy reveal',
      consequences: 'Solidifies the extended family, moves to property adjacent to Addie/Hawk',
    },
    {
      name: "Donnelly House Construction",
      description: "Chris and Kendra build house on property adjacent to Addie and Hawk near Elena's compound. Includes massive shared gym between properties - their daily battleground and gathering place for the extended family.",
      timelineRef: 'After wedding',
      consequences: 'Creates the compound community, strengthens bonds between families',
    },
  ];

  for (const event of events) {
    const existing = await prisma.event.findFirst({
      where: { name: event.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.event.create({
        data: {
          projectId: project.id,
          ...event,
        }
      });
      console.log(`Created event: ${event.name}`);
    } else {
      console.log(`Event exists: ${event.name}`);
    }
  }

  // Add galas
  const galas = [
    {
      name: "NY Gala - Hawk Foundation",
      organization: "Hawk Foundation",
      venue: "NYC Venue",
      location: "New York City",
      purpose: "Foundation fundraiser, also site of Chris/Kendra engagement",
      dresscode: "Black tie",
      attendees: JSON.stringify(['Addie', 'Hawk', 'Chris', 'Kendra', 'Jasper', 'Elena', 'Evelyn', 'Marcus', 'Grace']),
      significance: "Major social event for BSS extended family. Chris proposes to Kendra on balcony. Addie and Hawk appear with Grace like a family unit.",
      events: "Chris proposes to Kendra on balcony. Hawk's teammate teases Addie and Hawk about Grace. Chris/Kendra have side conversations with Jasper/Elena. Evelyn/Marcus work the floor.",
    },
  ];

  for (const gala of galas) {
    const existing = await prisma.gala.findFirst({
      where: { name: gala.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.gala.create({
        data: {
          projectId: project.id,
          ...gala,
        }
      });
      console.log(`Created gala: ${gala.name}`);
    } else {
      console.log(`Gala exists: ${gala.name}`);
    }
  }

  console.log("\nChris/Kendra storyline updated!");
  await prisma.$disconnect();
}

main().catch(console.error);
