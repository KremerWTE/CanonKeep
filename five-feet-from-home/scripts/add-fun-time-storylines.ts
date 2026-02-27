import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING FUN TIME STORYLINES ===\n");

  const funTimeStorylines = [
    {
      title: "The Inner Circle: Addie, Jasper & Elena",
      category: "Intimate / Fun Time",
      description: "The threesome that defined the inner circle's trust",
      content: `THE DYNAMIC:
When the three most powerful people in BSS come together, the power dynamics are electric.

THE SETUP:
After a particularly intense crisis resolution, the walls came down. Elena and Addie had been growing closer. Jasper watched, fascinated by the bond between his wife and his rising star.

THE MOMENT:
A late night at the Compound. Wine. Honesty. Elena made the first move - inviting Addie to stay. Jasper followed his wife's lead.

WHAT IT MEANT:
- For Elena: Sharing her husband with someone she trusted completely
- For Jasper: Seeing a new side of both women
- For Addie: Being accepted into the innermost circle

THE AFTERMATH:
It didn't become a regular thing. But it cemented a bond. The three of them share a secret that makes their professional relationship unbreakable. They can look at each other across a crowded gala and remember.`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett', 'Elena Barrett']),
      themes: JSON.stringify(['Trust', 'Power', 'Intimacy', 'Inner Circle'])
    },
    {
      title: "The Wives' Retreat: Addie, Kendra & Elena",
      category: "Intimate / Fun Time",
      description: "Three-way connection between the core wives",
      content: `THE BOND:
What happens at the Wives Club retreat stays at the retreat.

THE SETUP:
A weekend getaway. Just the inner circle women. Wine, spa, honesty. The conversation turned personal. Very personal.

THE MOMENT:
Elena admitted curiosity. Kendra blushed but didn't look away. Addie, ever the chaos coordinator, created the space for what came next.

WHAT IT MEANT:
- Sisterhood taken to its deepest level
- Trust without the men, just for them
- A secret that bound them even closer

THE AFTERMATH:
Kendra later getting serious with Chris created distance. This is the wound Addie carries - losing that connection when Kendra chose a traditional path.`,
      characters: JSON.stringify(['Addie', 'Kendra Donnelly', 'Elena Barrett']),
      themes: JSON.stringify(['Sisterhood', 'Intimacy', 'Trust', 'Loss'])
    },
    {
      title: "Addie & Kendra: The Deepest Bond",
      category: "Intimate / Fun Time",
      description: "The relationship that hurt the most when it changed",
      content: `THE CONNECTION:
Of all Addie's inner circle relationships, Kendra was the deepest.

HOW IT STARTED:
Kendra was new to BSS world. Addie took her under wing. The mentorship became friendship. The friendship became more.

THE RELATIONSHIP:
- Late nights after training
- Shared vulnerability about their pasts
- Physical intimacy born from emotional trust
- Addie let her guard down completely

THE CHANGE:
When Kendra got serious with Chris, everything shifted. She chose the traditional path. Marriage. Family. Faith.

ADDIE'S WOUND:
This is the only time the chaos coordinator couldn't control the outcome. She lost someone she loved - not to death or betrayal, but to a different choice. It's the scar she carries privately.`,
      characters: JSON.stringify(['Addie', 'Kendra Donnelly']),
      themes: JSON.stringify(['Love', 'Loss', 'Choice', 'Vulnerability'])
    },
    {
      title: "Addie & Selene: The Wild Card",
      category: "Intimate / Fun Time",
      description: "When chaos meets chaos",
      content: `THE DYNAMIC:
Selene is the one person Addie can't fully control. Their encounters are unpredictable.

THE CONNECTION:
- Both understand the world of performance
- Both know how to wear masks
- Both recognize something in each other

THE SHOW:
They did a show together. (Details TBD from source documents)

WHAT IT MEANS:
Selene challenges Addie in ways the others don't. She's not seeking approval or following Addie's lead. Their intimacy is a negotiation between equals - neither fully submitting.`,
      characters: JSON.stringify(['Addie', 'Selene Thorne']),
      themes: JSON.stringify(['Chaos', 'Control', 'Performance', 'Equals'])
    },
    {
      title: "Addie's College Secret",
      category: "Backstory / Fun Time",
      description: "The cam work Addie did in college - and how Hawk found out",
      content: `THE PAST:
In college, Addie did cam work under a screen name. (Name TBD from source documents)

THE DISCOVERY:
Hawk found something - evidence of her past. (Details TBD from source documents)

THE CONFESSION:
Addie told him everything. The truth about her college years. Why she did it. What it meant.

HAWK'S RESPONSE:
He didn't judge. He loved her more for her honesty. The secret became a bond between them.

SELENE CONNECTION:
Addie and Selene did a show together. This is how they first connected - before BSS, before everything.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Selene Thorne']),
      themes: JSON.stringify(['Secrets', 'Past', 'Trust', 'Acceptance'])
    },
    {
      title: "The Cabin Weekend",
      category: "Intimate / Fun Time",
      description: "What happens at the cabin stays at the cabin",
      content: `THE RETREAT:
A weekend away from everything. The inner circle at a private cabin.

WHO WAS THERE:
(TBD from source documents)

WHAT HAPPENED:
(TBD from source documents)

THE SIGNIFICANCE:
A defining moment for the group's bonds.`,
      characters: JSON.stringify(['TBD']),
      themes: JSON.stringify(['Retreat', 'Intimacy', 'Bonding'])
    },
    {
      title: "Hawk & Addie: Surrender and Trust",
      category: "Intimate / Fun Time",
      description: "How the operator and chaos coordinator find balance",
      content: `THE DYNAMIC:
Hawk commands in the field. Addie runs an empire of relationships. In private, they take turns.

THE DANCE:
- Sometimes he leads - the operator in control
- Sometimes she leads - the Patroness commanding
- The surrender is always mutual, always chosen

THEIR INTIMACY:
Built on absolute trust. Years of watching each other in crisis. Knowing the other will never break.

WHAT MAKES IT WORK:
They've seen each other at their worst. Their best. Every shade between. There are no masks between them.`,
      characters: JSON.stringify(['Hawk', 'Addie']),
      themes: JSON.stringify(['Trust', 'Surrender', 'Partnership', 'Vulnerability'])
    }
  ];

  for (const storyline of funTimeStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  const count = await prisma.storyline.count();
  console.log(`\nTotal Storylines: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
