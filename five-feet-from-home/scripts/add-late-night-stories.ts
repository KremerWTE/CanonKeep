import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING LATE NIGHT STORIES ===\n");

  // These are intimate moments for the Fun Time section
  const storylines = [
    {
      title: "Late Night Story: Post-Gala Suite",
      category: "Fun Time / Intimate",
      description: "After the gala, intimate encounter in hotel suite",
      content: `SETTING:
After a perfect gala night. Hotel suite with city views.

PARTICIPANTS:
- Michael (the husband)
- Elena (his wife)
- Sofia (Elena's best friend)

THE EVENING:
The three return from the gala still glowing from dancing and champagne.
The energy between them shifts to something new, intimate, trusting.

THE MOMENT:
On the balcony overlooking the city, Sofia makes the first move.
She kisses Elena - a kiss that had been hovering unspoken for years.
Elena responds with warmth and affection.
Michael joins them as they move deeper into the suite.

KEY MOMENTS:
- Sofia's boldness in the elevator (symbolic gesture of surrender)
- The walk down the hallway, all three hand in hand
- Elena checking with Sofia: "You sure?" - love and protectiveness
- Sofia's answer: "I've never been more sure of anything"
- The suite door closing on their shared intimacy`,
      characters: JSON.stringify(['Michael', 'Elena', 'Sofia']),
      themes: JSON.stringify(['Threesome', 'Trust', 'Gala', 'Hotel Suite'])
    },
    {
      title: "Late Night Story: Dinner with Toys",
      category: "Fun Time / Intimate",
      description: "Romantic dinner with hidden tension",
      content: `SETTING:
Fancy restaurant dinner for Michael and Elena.
Private, romantic, charged with anticipation.

THE SECRET:
Elena spends the entire dinner in a state of hidden tension.
Private toys involved throughout the evening.
They share knowing glances across the table.
The anticipation builds through each course.

AFTER DINNER:
In the car after dinner, they act like teenagers.
The enclosed space creates urgency and intimacy.
Everything they'd been holding back releases.

THE CONNECTION:
Years of marriage, still burning for each other.
The contrast between public elegance and private passion.`,
      characters: JSON.stringify(['Michael', 'Elena']),
      themes: JSON.stringify(['Couple', 'Toys', 'Dinner', 'Car'])
    },
    {
      title: "Late Night Story: Fire Pit Under the Stars",
      category: "Fun Time / Intimate",
      description: "Outdoor intimacy by the fire pit",
      content: `SETTING:
Private fire pit at night.
Flames crackling, sparks spiraling into the sky.
Just the two of them, no crowds, no city lights.

THE MOMENT:
Elena in a beautiful dress, glowing amber in firelight.
The warmth of the fire matching the heat between them.
Whispered vulnerabilities.

THE INTIMACY:
No need to fully undress - just enough.
Dress pulled aside, the firelight casting shadows.
The night wrapping around them.
Shared breaths and soft movements by the glow of flames.`,
      characters: JSON.stringify(['Michael', 'Elena']),
      themes: JSON.stringify(['Outdoor', 'Fire Pit', 'Romantic', 'Stars'])
    },
    {
      title: "Late Night Story: Sofia's Initiation",
      category: "Fun Time / Intimate",
      description: "Best friend's first intimate moment with the couple",
      content: `THE DYNAMIC:
Sofia is Elena's best friend of many years.
There's always been an unspoken tension.
The gala night becomes the moment of truth.

SOFIA'S BOLDNESS:
- Initiates the first kiss with Elena on the balcony
- Makes a bold gesture of surrender in the elevator
- Trembling but committed to the moment

ELENA'S RESPONSE:
"You should've done that years ago."
Protective of her friend while inviting her in.
The warmth of longstanding friendship becoming something more.

MICHAEL'S ROLE:
Invited into the moment by both women.
Steady, respectful, present.
Holding both women close as they step into the suite together.

THE MEANING:
Trust between three people who genuinely care for one another.
Boundaries fading naturally.
Affection intertwining like their fingers.`,
      characters: JSON.stringify(['Sofia', 'Elena', 'Michael']),
      themes: JSON.stringify(['Threesome', 'Best Friends', 'Trust', 'Initiation'])
    },
    {
      title: "Late Night Story: The Elevator Moment",
      category: "Fun Time / Intimate",
      description: "Bold gesture of intimacy in the elevator",
      content: `SETTING:
Glass elevator rising through the hotel.
City lights blurring through the walls.
Three people sealed in together after the gala.

SOFIA'S DECISION:
Something shifts in her - boldness, a spark.
She steps closer to Michael, close enough to feel his heat.
Elena watches with amused curiosity.

THE GESTURE:
"Hold this for me."
Sofia slips something delicate into Michael's palm.
A quiet surrender to the moment.
A sign of how deeply she wants this closeness with them both.

THE REACTION:
Michael closes his fingers around the soft fabric.
Elena squeezes his other hand, her smile slow and knowing.
The elevator rises, filled with electric tension.
None of them speak - they don't need words.`,
      characters: JSON.stringify(['Sofia', 'Michael', 'Elena']),
      themes: JSON.stringify(['Bold', 'Elevator', 'Surrender', 'Tension'])
    },
    {
      title: "Late Night Story: The Hallway Walk",
      category: "Fun Time / Intimate",
      description: "The charged walk to the hotel suite",
      content: `THE MOMENT:
Elevator doors open, warm hallway light spills over them.
Elena's hand laced with Sofia's.
Michael holding what Sofia trusted him with.

THE WALK:
Three people walking hand in hand.
Long gowns brushing together.
Sofia glancing back over her shoulder at Michael.
The look that says: "I meant what I did. Please don't step away from me now."

ELENA'S LOVE:
"You two are adorable," she teases.
But also protective: "You sure?"
Making sure her friend's heart is safe.

SOFIA'S ANSWER:
"I've never been more sure of anything."
Her hand sliding up Michael's arm.
Reaching for Elena with her other hand.

THE DOOR:
The key clicks. The door opens.
Warm light pools at their feet like an invitation.
They step inside together.
The door closes softly behind them.`,
      characters: JSON.stringify(['Elena', 'Sofia', 'Michael']),
      themes: JSON.stringify(['Anticipation', 'Trust', 'Hallway', 'Permission'])
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
