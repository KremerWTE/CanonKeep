import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding Dragon Toy & Elena Recovery Storylines ===\n");

  const storylines = [
    {
      title: 'The Dragon Toy',
      category: 'Intimate / Toys',
      description: 'A special toy that becomes part of intimate play',
      content: `THE DRAGON TOY

A special toy that adds spice to intimate moments.
Referenced in private conversations between partners.
Part of the growing comfort in exploring desires together.

This represents the couples opening up to experimentation and trust.
The dragon toy becomes a symbol of playful intimacy.`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['Intimate', 'Toys', 'Fun Time', 'Trust'])
    },
    {
      title: 'Elena Recovery Play - Breaking the Drought',
      category: 'Intimate / Jasper & Elena',
      description: 'Jasper and Elena rebuild intimacy after her medical crisis and 3-year dry spell',
      content: `ELENA RECOVERY PLAY - BREAKING THE DROUGHT

THE CONTEXT:
After Elena's medical crisis, intimacy disappeared for 3 years.
The "drought" became the unspoken tension in their marriage.

THE TIMELINE:
Week 1: "Drought" reminder - Jasper tries to rub her shoulders, she stiffens
Week 2: Hospital recovery teasing - flashback to PT jokes about "full activity"
Week 3-7: Medical interruptions, stress, disconnection
Week 8: Dress moment - She catches him looking at her in a new dress
Week 9: Post-party kitchen embrace - champagne glasses, she leans against him
Week 10: Morning-after conversation - "If we're going to do that, I want to do it right"
Final scene: Bedroom close - she reaches for his hand as they get into bed

THE WIVES' CIRCLE ADVICE:
During a Zoom call, the wives discuss Elena's situation:
- Caroline: "Start small. Touch him when you walk past."
- Ronnie: "Surprise him. Show up somewhere he doesn't expect you."
- Julia: "Be direct. Tell him what you need."

Elena starts acting on this advice, leading to the Week 8-10 reconnection.

PROGRESSION:
Drought awareness → light teasing → medical interruptions → emotional re-connection → physical closeness`,
      characters: JSON.stringify(['Elena Barrett', 'Jasper Barrett']),
      themes: JSON.stringify(['Intimate', 'Recovery', 'Marriage', 'Fun Time'])
    },
    {
      title: 'Jasper & Elena - Intimacy Hints Timeline',
      category: 'Intimate / Jasper & Elena',
      description: 'The slow rebuild of intimacy between Jasper and Elena over 10 weeks',
      content: `JASPER & ELENA INTIMACY HINTS TIMELINE

WEEK 1 – Grace's broken foot, London cyber issue begins
Hint 1 – "Drought" reminder
Evening at home, Jasper tries to rub Elena's shoulders, but she stiffens.
Banter about "we used to be better at unwinding" — first nod to the 3-year dry spell.

WEEK 2 – Elena hints at divorce/counseling
Hint 2 – Hospital recovery teasing (flashback)
Short flashback to her recovery days — Jasper joking about "full activity" during PT, Elena smirking but avoiding eye contact.

WEEK 3-7 – Crisis mode
Medical and work interruptions keep them apart emotionally and physically.

WEEK 8 – Dress moment
She catches him looking at her in the new dress. He doesn't look away.
That look lingers longer than necessary.

WEEK 9 – Party Night
Hint 6 – Post-party cleanup
After everyone leaves, champagne glasses on the counter, she leans against him at the sink.
His hands slide to her hips — they linger, but exhaustion wins out.

WEEK 10 – Morning after party
Hint 7 – Answer to Kid #2
Over coffee, Jasper says "If we're going to do that, I want to do it right. That means fixing us first."
It's quiet, but charged.

WEEK 10 – Closing chapter
Hint 8 – Bedroom close
Final page — Elena reaches for his hand as they get into bed.
No words, just a mutual choice to stay close.`,
      characters: JSON.stringify(['Elena Barrett', 'Jasper Barrett']),
      themes: JSON.stringify(['Intimate', 'Marriage', 'Slow Burn', 'Fun Time'])
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
