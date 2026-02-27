import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== FIXING ADDIE WITH CORRECT DATA FROM DOCUMENTS ===\n");
  console.log("REMOVING ALL MADE-UP CAM STAR BACKSTORY\n");

  const addie = await prisma.character.findFirst({
    where: {
      OR: [
        { firstName: 'Addie' },
        { name: { contains: 'Addie' } },
        { name: { contains: 'Addison' } }
      ],
      projectId: project.id
    }
  });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        archetype: 'Patroness of Honor (POH) / BSS Senior Leader',
        background: `PATRONESS OF HONOR (POH):
Addie is the unofficial but universally recognized leader of the inner circle. Everyone defers to her. The title isn't about status - it's about stewardship. She is the "chaos coordinator" who holds the threads of different worlds (BSS, the Orders, family life) together.

BSS CAREER:
Rose through BSS from analyst to senior leadership. Proved herself on high-stakes missions including:
- Vegas casino operations (The Argentum) - financial crisis and art forgery cases
- Multiple international operations
- Hawk helped prepare her for the Vegas world, teaching her the culture and how to spot "tells"

THE INNER CIRCLE:
Addie is the first in BSS to blur the lines between personal and professional relationships within the circle. She has intimate connections with Elena, Jasper, Kendra, and Selena - kept quiet and controlled within the inner circle. She's the "chaos coordinator" who manages these complex dynamics.

FAITH JOURNEY:
Catholic convert. Her journey deepened especially after becoming a godmother and Grace's confirmation sponsor. The POH role became reframed as a vocation - service, not self-glory.

FAMILY WITH HAWK:
- Twins: William "Will" Alexander and Isabella "Izzy" Grace
- Third child: Michael Gabriel "Mikey"
- Hawk became a stay-at-home father for the first 3 years while Addie led BSS operations and POH duties`,

        bssRole: 'Patroness of Honor / Senior Fixer - The chaos coordinator who holds all threads together',

        pohRole: 'Patroness of Honor - Though unofficial, everyone in the circle quietly defers to her. She is the steward of what they are building together.',

        relationships: `PARTNER:
- Hawk - Her partner, father of her children

CHILDREN:
- Will (twin) - Protective and observant like Hawk
- Izzy (twin) - Bold and adventurous like Addie
- Mikey - The peacemaker, born a year after twins

INNER CIRCLE CONNECTIONS:
- Elena Barrett - Sisterhood/mentorship, intimate bond
- Jasper Barrett - Power/intensity dynamic, her boss
- Kendra Donnelly - Trust bond (Addie felt pain when Kendra got serious with Chris)
- Selena - Wild card connection

BSS FAMILY:
- Jasper - The one who gave her opportunities to prove herself
- The operators and analysts - Her team`,

        secrets: `KEPT WITHIN INNER CIRCLE:
- The full extent of her intimate connections with Elena, Jasper, Kendra, and Selena
- To everyone outside the inner circle, Addie is just the sharp, rising operator
- Discretion as survival - they all understand if it got out, it would damage BSS`,

        faithRoots: `Catholic convert. Her faith journey deepened through:
- Becoming a godmother
- Serving as Grace's confirmation sponsor
- Connection to EOHSJ and Order of Malta
- The POH role reframed as vocation and service`,

        arcStart: 'Hippie free-spirit transformed by Elena, Harper, and the wives\' circle into a polished coordinator (Pre-Book 1 "My Fair Lady" Phase 1)',
        arcChange: 'Book 2: Jasper mentors her (pushed by Elena) from coordinator to junior strategist ("My Fair Lady" Phase 2). Proves herself under fire on NFL media crisis.',
        arcEnd: 'Fully embraces the POH role as crown and vocation, balancing family with Hawk and leadership',

        // CLEAR OUT THE FAKE BACKSTORY
        sourceFiles: 'Addie and POH role.docx, Vegas for Addie.docx, Addie Power dynamic.docx, Addie and Hawk family growth.docx'
      }
    });
    console.log("FIXED: Addie - removed fake cam star backstory, added correct POH/BSS background");
  }

  // Delete the fake family members I created for Addie
  const fakeAddieFamily = ['Margaret "Maggie" Price', 'Tommy Price'];
  for (const name of fakeAddieFamily) {
    const char = await prisma.character.findFirst({
      where: { name: name, projectId: project.id }
    });
    if (char) {
      await prisma.character.delete({ where: { id: char.id } });
      console.log(`Deleted fake character: ${name}`);
    }
  }

  // Delete incorrect storylines about Addie's fake past
  const fakeStorylines = [
    "Flashback: Addie's Darkest Days",
    "Addie's Emergency L.A. Run"
  ];
  for (const title of fakeStorylines) {
    const story = await prisma.storyline.findFirst({
      where: { title: title, projectId: project.id }
    });
    if (story) {
      await prisma.storyline.delete({ where: { id: story.id } });
      console.log(`Deleted fake storyline: ${title}`);
    }
  }

  // Add Addie and Hawk's children
  const children = [
    {
      name: 'William "Will" Alexander Hawthorne',
      firstName: 'William',
      lastName: 'Hawthorne',
      nickname: 'Will',
      archetype: 'Addie & Hawk\'s Son (Twin)',
      background: `Oldest twin by 6 minutes. Protective and observant, even as a toddler he's always watching out for his sister. Has Hawk's steady eyes and quiet intensity - rarely the loudest in the room, but the one everyone notices when he decides to act.`,
      relationships: 'Twin to Izzy, older brother to Mikey, son of Addie and Hawk',
      sourceFiles: 'Addie and Hawk family growth.docx'
    },
    {
      name: 'Isabella "Izzy" Grace Hawthorne',
      firstName: 'Isabella',
      lastName: 'Hawthorne',
      nickname: 'Izzy',
      archetype: 'Addie & Hawk\'s Daughter (Twin)',
      background: `Younger twin. Bright, bold, and adventurous. Has Addie's spark - fearless around horses, quick to charm adults. A free spirit but fiercely loyal to family. Named to honor Bella and Grace.`,
      relationships: 'Twin to Will, older sister to Mikey, daughter of Addie and Hawk',
      sourceFiles: 'Addie and Hawk family growth.docx'
    },
    {
      name: 'Michael "Mikey" Gabriel Hawthorne',
      firstName: 'Michael',
      lastName: 'Hawthorne',
      nickname: 'Mikey',
      archetype: 'Addie & Hawk\'s Son (Youngest)',
      background: `The "surprise baby" born just over a year after the twins. The peacemaker of the siblings with an almost angelic calm. Named after Archangels Michael (protector) and Gabriel (messenger), tying to Addie and Hawk's Catholic journey.`,
      relationships: 'Younger brother to twins Will and Izzy, son of Addie and Hawk',
      sourceFiles: 'Addie and Hawk family growth.docx'
    }
  ];

  for (const child of children) {
    const existing = await prisma.character.findFirst({
      where: { firstName: child.firstName, lastName: child.lastName, projectId: project.id }
    });
    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...child }
      });
      console.log(`Created: ${child.name}`);
    }
  }

  console.log("\n=== ADDIE CORRECTED ===");
  console.log("Removed: Fake cam star backstory, fake estranged family");
  console.log("Added: Correct POH role, BSS career, inner circle dynamics, children with Hawk");

  await prisma.$disconnect();
}

main().catch(console.error);
