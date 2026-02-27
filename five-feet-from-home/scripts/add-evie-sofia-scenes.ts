import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding Evie & Sofia Scenes ===\n");

  const storylines = [
    {
      title: "Evie & Cole - The Flour Moment",
      category: "Romantic / Evie & Cole",
      description: "First meeting - Evie covered in flour, Cole intrigued",
      content: `EVIE & COLE - THE FLOUR MOMENT

THE MEETING:
Evie was in Sara's gym kitchen, covered head to toe in flour.
Cole walked in looking for Sara.
Their eyes met. Evie's heart stopped.

THE INSTANT CONNECTION:
Cole: intrigued by this messy, joyful woman
Evie: frozen, embarrassed, heart racing

THE DATE:
They tried one date.
Conversation flowed but both felt it: neither was ready.
They laughed at themselves over dessert.
Instead of disappointment, there was relief.

THE RESULT:
It wasn't a "no" - it was a "not now."
From then on, they stayed close friends.
Cole stopped by to check on the program, helping with workouts.
Always teasing her about her "battle scars of flour."
Evie joked he only came for cookies. Cole never denied it.`,
      characters: JSON.stringify(['Evie', 'Cole']),
      themes: JSON.stringify(['Romantic', 'First Meeting', 'Slow Burn', 'Friendship'])
    },
    {
      title: "Evie & Cole - The Balcony Kiss",
      category: "Intimate / Evie & Cole",
      description: "Their first real kiss at the Wilmington gala",
      content: `EVIE & COLE - THE BALCONY KISS

THE SETTING:
Wilmington gala. Night air cool. Ocean stretching dark beyond the harbor.
Evie's chest still aching from Cole's words: "They saw your glow."

THE CONVERSATION:
Evie: "Why do you always say things like that? Things I don't believe but somehow... want to."

Cole stepped closer, brushing a strand of hair from her face.
"Because you don't see what I see."

THE KISS:
Neither knew who started it. It just happened.
Steady, careful, but undeniable.
He pulled back first, something flickering in his eyes - regret? Fear?
"That... shouldn't have happened."
She nodded, breathless. "But it did."

EVIE'S JOURNAL:
"The kiss. My first real one in... I don't even know how long. And it was him. Steady, careful Cole, who swore off relationships. He kissed me. Or maybe I kissed him back. I just know it happened.

It scares me. I don't want to want this. But tonight, on that balcony, none of that mattered. It was just him. And me. And a kiss that I'll never forget."`,
      characters: JSON.stringify(['Evie', 'Cole']),
      themes: JSON.stringify(['Intimate', 'First Kiss', 'Balcony', 'Fun Time'])
    },
    {
      title: "Evie & Cole - What Happens After",
      category: "Intimate / Evie & Cole",
      description: "The night after the gala kiss - what they choose",
      content: `EVIE & COLE - WHAT HAPPENS AFTER

THE TENSION:
After the kiss, everything changed.
Cole drove her back to the hotel in silence.
The air thick with unspoken questions.

THE CHOICE:
At her door, they stood facing each other.
Evie: "Do you want to come in?"
Cole: "More than anything. But not if you'll regret it."
Evie: "I'm tired of playing it safe."

THE NIGHT:
What happened behind that door was gentle, exploratory.
Cole treated her like something precious.
Evie discovered parts of herself she'd buried.
For the first time in years, she felt desired. Seen. Wanted.

THE MORNING:
Coffee on the balcony. Comfortable silence.
Neither defined it. Neither needed to.
They'd figure it out together, one day at a time.`,
      characters: JSON.stringify(['Evie', 'Cole']),
      themes: JSON.stringify(['Intimate', 'First Night', 'Trust', 'Fun Time'])
    },
    {
      title: "Sofia's Awakening",
      category: "Intimate / Sofia",
      description: "Sofia's journey of self-discovery and desire",
      content: `SOFIA'S AWAKENING

THE BACKGROUND:
Sofia had always been the good girl.
Focused on career, family expectations, doing everything "right."
Desire was something she'd buried.

THE CATALYST:
Being around the BSS world changed things.
Watching the confidence of women like Addie, Elena, Selene.
Seeing how they owned their sexuality without shame.

THE MOMENTS:
- The first time she let herself want
- The conversation that changed her perspective
- The night she decided to explore

THE TRANSFORMATION:
Sofia learned that desire wasn't weakness.
That wanting could be strength.
That her body was hers to enjoy.

She emerged more confident, more alive, more herself.`,
      characters: JSON.stringify(['Sofia']),
      themes: JSON.stringify(['Intimate', 'Awakening', 'Self-Discovery', 'Fun Time'])
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
