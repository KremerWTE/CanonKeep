import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING ELENA RECOVERY STORYLINE (DOCUMENTED INFO ONLY) ===\n");

  // Based on documented info from Wives Club Characters Development.docx
  // and other source files - leaving gaps where info is missing
  const storylines = [
    {
      title: "Elena's Hospital Crisis",
      category: "Medical / Personal",
      description: "Hospital scenes that tie the wives' group together emotionally",
      content: `DOCUMENTED FACTS:
- Elena had hospital scenes that are mentioned as "tying others together emotionally"
- Addie "supports Elena in early hospital crises"
- Grace was "frozen in trauma hospital scene" and built a bond with Addie during this time

WHAT WE KNOW:
- This was an "early" crisis (before the wives' club was fully established)
- Elena serves as the "glue of early wives' club"
- She serves as "emotional bridge when crises erupt"

AWAITING MORE DETAIL:
- Specific nature of Elena's medical crisis
- Timeline of the hospital stay
- Recovery process details
- Impact on Jasper and the family

Note: User requested to leave blank if info missing. More source documents needed for full details.`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Grace', 'Jasper Barrett']),
      themes: JSON.stringify(['Health', 'Crisis', 'Sisterhood', 'Recovery'])
    },
    {
      title: "Hospital Vigil: The Founding Moment",
      category: "Wives Club Origin",
      description: "The night that formed the seeds of the Wives Club",
      content: `DOCUMENTED SCENE:
Elena, Addie, Grace spend the night during Elena's medical crisis.
This emotional glue forms → this becomes the seed of the "Wives' Club."

CHARACTER RESPONSES:
- Addie: Steps into protector/stabilizing role
- Grace: Initially frozen in trauma, builds bond with Addie
- Elena: Even in crisis, her presence unites the others

SIGNIFICANCE:
This is described as a "founding moment" for the wives' network.
The shared experience of fear and support created bonds that became the foundation of their sisterhood.

AWAITING MORE DETAIL:
- Specific hospital location
- What happened during the vigil
- Conversations had
- How Jasper handled this`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Grace']),
      themes: JSON.stringify(['Founding Moment', 'Sisterhood', 'Trauma', 'Bonding'])
    },
    {
      title: "Elena: Mentor to Addie",
      category: "Relationship",
      description: "The mentorship that grew from shared crisis",
      content: `THE RELATIONSHIP:
- Elena serves as mentor to Addie
- Their bond deepened during the hospital crisis
- Elena's grace under pressure became a model for Addie

DYNAMIC:
Elena represents the "quiet intelligence" and "steady presence" that Addie learns to embody.
When Elena was in crisis, Addie stepped up - and Elena's recovery marked a transition in their relationship from mentor/mentee to equals.

Note: More detail on specific mentorship moments awaiting source documents.`,
      characters: JSON.stringify(['Elena Barrett', 'Addie']),
      themes: JSON.stringify(['Mentorship', 'Growth', 'Sisterhood'])
    }
  ];

  for (const storyline of storylines) {
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
