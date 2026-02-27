import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding More Intimate Scenes ===\n");

  const storylines = [
    {
      title: "Elena Exhaustion Recovery - With Addie and Kendra",
      category: "Intimate / Elena",
      description: "Elena's recovery from exhaustion with intimate care from Addie and Kendra",
      content: `ELENA EXHAUSTION RECOVERY

THE SITUATION:
Elena has pushed herself to the breaking point - work, family, medical issues.
She collapses from exhaustion, needing recovery time.

THE CARE:
Addie and Kendra step in to help her recover.
What starts as caring for a friend evolves into something deeper.
The vulnerability of illness opens doors to intimacy.

THE DYNAMIC:
Elena, usually in control, must let others take care of her.
Addie provides grounding, steady presence.
Kendra brings energy and warmth.
Together, they help Elena heal - body and soul.

THE MOMENT:
In the quiet of recovery, boundaries blur.
What they share becomes one of the foundational bonds of the inner circle.`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Kendra']),
      themes: JSON.stringify(['Intimate', 'Recovery', 'Care', 'Sisterhood', 'Fun Time'])
    },
    {
      title: "Savannah's Sister Wedding - Lingerie Kiss",
      category: "Intimate / Kendra & Addie",
      description: "Kendra and Addie share an intimate moment while getting dressed for Savannah's sister's wedding",
      content: `SAVANNAH'S SISTER WEDDING - THE DRESSING ROOM

THE SETTING:
Savannah's sister is getting married.
Kendra and Addie are invited as part of the extended circle.
They share a room to get ready.

GETTING DRESSED:
Both in lingerie, preparing for the event.
The intimacy of the moment - helping with zippers, adjusting straps.
Mirrors reflecting them together.

THE KISS:
It starts as play, teasing about who looks better.
Kendra leans in, and Addie doesn't pull away.
A kiss that lingers longer than friends should.

THE AFTERMATH:
They finish getting dressed, the air charged.
Neither speaks of it directly, but both carry it with them through the wedding.
A secret shared between sisters.`,
      characters: JSON.stringify(['Kendra', 'Addie']),
      themes: JSON.stringify(['Intimate', 'Wedding', 'Lingerie', 'Kiss', 'Fun Time'])
    },
    {
      title: "Addie and Selene - Wild Card Connection",
      category: "Intimate / Addie & Selene",
      description: "The unpredictable intimate connection between Addie and Selene",
      content: `ADDIE AND SELENE - WILD CARD CONNECTION

THE DYNAMIC:
Selene is chaos. Addie is control.
Their connection is electric, unpredictable.
What happens between them is never planned.

SELENE'S ENERGY:
She brings fire, recklessness, desire without filters.
She pushes Addie past her comfort zone.
With Selene, Addie can't stay in control.

ADDIE'S PULL:
For Selene, Addie represents grounding she craves.
Being with Addie makes her feel safe enough to be wild.
The contrast feeds both of them.

THE ENCOUNTERS:
Always unexpected - after galas, during crises, in quiet moments.
Never the same twice.
Selene is the one person who can surprise Addie.`,
      characters: JSON.stringify(['Addie', 'Selene']),
      themes: JSON.stringify(['Intimate', 'Wild', 'Passion', 'Contrast', 'Fun Time'])
    },
    {
      title: "Bella and Mandy - Beautiful & Wild",
      category: "Intimate / Bella & Mandy",
      description: "The intimate history between Bella and Mandy that opened doors",
      content: `BELLA AND MANDY - BEAUTIFUL & WILD

THE HISTORY:
Before Matt, Bella was shy, reserved, uncertain.
Mandy was beautiful, wild, unforgettable... but complicated.

THE AWAKENING:
Mandy saw something in Bella that Bella couldn't see herself.
She coaxed her out of her shell.
Their relationship opened doors to Bella's sexuality.

THE MOMENTS:
Late nights with wine and laughter turning to more.
Mandy teaching Bella confidence, desire, how to be seen.
Adventures that pushed boundaries and built trust.

WHAT IT MEANT:
Those moments shaped who Bella became.
Even now, she carries that awakening with her.
Mandy gave her permission to want, to feel, to explore.

THE COMPLEXITY:
It was never simple. Mandy's wildness came with chaos.
Bella learned to separate the heat from the storm.
When Matt came along, she was ready for something steady - but still passionate.`,
      characters: JSON.stringify(['Bella', 'Mandy']),
      themes: JSON.stringify(['Intimate', 'Awakening', 'Sexuality', 'History', 'Fun Time'])
    },
    {
      title: "Bella and Matt - Steady Heat",
      category: "Intimate / Bella & Matt",
      description: "The passionate but stable intimacy between Bella and Matt",
      content: `BELLA AND MATT - STEADY HEAT

THE RELATIONSHIP:
After the wildness with Mandy, Matt was different.
Steady, reliable, but not boring.
Their intimacy burned just as hot, but with trust underneath.

HOW IT STARTED:
Matt saw past Bella's shyness immediately.
He was patient, giving her space to come to him.
When she did, the connection was instant.

THEIR DYNAMIC:
Matt grounds her while she opens him up.
He's protective without being controlling.
Their bedroom is where Bella fully blooms.

THE HEAT:
What they share is private but intense.
Bella discovered she could have passion AND safety.
Matt matches her curiosity with his own.

WHAT BELLA LEARNED:
Mandy taught her to want. Matt taught her she deserved to have.
The combination made her who she is - confident, warm, sensual.`,
      characters: JSON.stringify(['Bella', 'Matt']),
      themes: JSON.stringify(['Intimate', 'Passion', 'Trust', 'Marriage', 'Fun Time'])
    },
    {
      title: "Hawk, Addie, and Selene - The Triangle",
      category: "Intimate / Threesome",
      description: "The intimate encounter between Hawk, Addie, and Selene",
      content: `HAWK, ADDIE, AND SELENE - THE TRIANGLE

THE SETUP:
Selene is close to both Hawk and Addie.
The tension has always been there - acknowledged but unexplored.
Until one night when circumstances aligned.

THE CONTEXT:
After a particularly intense crisis or celebration.
Adrenaline running high, guards down.
Selene's presence blurs the usual boundaries.

THE DYNAMIC:
Hawk: Protective, commanding, but willing to follow Addie's lead.
Addie: In control even when sharing control.
Selene: The catalyst, the fire, the one who makes it happen.

THE ENCOUNTER:
What they share changes things but doesn't break them.
It becomes one of those moments referenced but rarely discussed.
A secret held between three people who trust each other completely.

THE AFTERMATH:
Life continues. Relationships deepen in unexpected ways.
Selene remains the wild card in their lives.
The experience binds them even tighter.`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Selene']),
      themes: JSON.stringify(['Intimate', 'Threesome', 'Trust', 'Passion', 'Fun Time'])
    },
    {
      title: "Bella and Mandy - The First Time",
      category: "Intimate / Bella & Mandy",
      description: "How Bella and Mandy's intimate relationship began",
      content: `BELLA AND MANDY - THE FIRST TIME

THE SETTING:
A girls' weekend away. Wine flowing. Guard down.
Mandy had been flirting for months, but Bella never took it seriously.
Until that night.

THE CONVERSATION:
Mandy: "You're beautiful, you know. Like, actually beautiful."
Bella: "You're drunk."
Mandy: "I'm honest. Different thing."

THE MOMENT:
Mandy reached for her hand. Bella didn't pull away.
What followed was gentle, exploratory, safe.
Mandy led, but never pushed.

BELLA'S THOUGHTS:
"I didn't know I wanted this until it happened."
"She made me feel like I was allowed to feel."
"Everything I'd been holding back suddenly had permission."

THE MORNING AFTER:
No awkwardness. Mandy made coffee, cracked jokes.
They never defined it, but they didn't need to.
Something had opened that would never fully close.`,
      characters: JSON.stringify(['Bella', 'Mandy']),
      themes: JSON.stringify(['Intimate', 'First Time', 'Awakening', 'Permission', 'Fun Time'])
    },
    {
      title: "Pre-Gala Dressing Room Tension",
      category: "Intimate / Inner Circle",
      description: "The charged moments in the dressing room before galas",
      content: `PRE-GALA DRESSING ROOM TENSION

THE TRADITION:
Before every major gala, the women gather in one suite.
Gowns, lingerie, makeup, hair - transformation together.
What happens in the dressing room stays there.

THE ENERGY:
Half-dressed women helping each other with zippers.
Compliments that linger. Touches that last a beat too long.
Mirror reflections catching moments meant to be private.

WHO'S INVOLVED:
Addie, Elena, Kendra, Bella, Selene, Mandy - the inner circle.
Each pairing has its own history, its own tension.
The room holds all of it.

UNSPOKEN RULES:
What's said here stays here.
Intimacy is expected, not explained.
The bonds formed in this room outlast any gala.

THE TRUTH:
These moments are as important as the events themselves.
Sisterhood means seeing each other fully.
The dressing room is where the masks come off.`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Kendra', 'Bella', 'Selene', 'Mandy']),
      themes: JSON.stringify(['Intimate', 'Gala', 'Sisterhood', 'Tension', 'Fun Time'])
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

  const count = await prisma.storyline.count({ where: { projectId: project.id } });
  console.log(`\nTotal storylines: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
