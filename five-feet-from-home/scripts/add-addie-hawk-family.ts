import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING ADDIE & HAWK FAMILY CONTENT ===\n");

  // ============ CHILDREN CHARACTERS ============
  const children = [
    {
      name: "William Hawthorne",
      firstName: "William",
      lastName: "Hawthorne",
      nickname: "Will",
      archetype: "Oldest Twin",
      background: `Oldest twin (by 6 minutes) of Addie and Hawk.

PERSONALITY:
- Protective and observant, even as a toddler
- Always watching out for his sister
- Has Hawk's steady eyes and quiet intensity
- Rarely the loudest in the room
- The one everyone notices when he decides to act

NAME MEANING:
- William: "resolute protector"
- Alexander (middle name): connects to history and leadership
- Subtle tie to Addie and Hawk's role in shaping strategy and legacy`,
      relationships: "Twin of Izzy, older brother to Mikey, son of Addie and Hawk"
    },
    {
      name: "Isabella Hawthorne",
      firstName: "Isabella",
      lastName: "Hawthorne",
      nickname: "Izzy (Grace calls her 'Izzy-Bee')",
      archetype: "Younger Twin",
      background: `Younger twin of Addie and Hawk.

PERSONALITY:
- Bright, bold, and adventurous
- Has Addie's spark
- Fearless around horses
- Quick to charm adults
- Often the one dragging Will and cousins into new games
- Free spirit but fiercely loyal to family

NAME MEANING:
- Isabella honors Bella
- Grace (middle name) honors Grace
- Ties her directly to the "sisters" in Addie's life
- Reminds everyone of the interconnectedness of chosen family`,
      relationships: "Twin of Will, older sister to Mikey, daughter of Addie and Hawk"
    },
    {
      name: "Michael Hawthorne",
      firstName: "Michael",
      lastName: "Hawthorne",
      nickname: "Mikey (later prefers 'Gabe')",
      archetype: "The Surprise Baby",
      background: `Youngest child, born just over a year after the twins.

PERSONALITY:
- The peacemaker of the siblings
- Almost angelic calm about him
- Often giggling, content to be passed from arms to arms
- As he grows, smooths over sibling rivalries
- Always smiling and bridging gaps

NAME MEANING:
- Michael: Archangel, protector, warrior
- Gabriel (middle name): Archangel, messenger
- Ties back to Addie and Hawk's Catholic journey
- His birth feels like a divine gift, blessing beyond their plans

SYMBOLISM:
- Represents unexpected grace and God's providence
- Theme that ties into Addie and Hawk's faith`,
      relationships: "Youngest child of Addie and Hawk, younger brother to twins Will and Izzy"
    }
  ];

  // ============ STORYLINES ============
  const storylines = [
    {
      title: "Addie & Hawk: The Twins Arrive",
      category: "Family",
      description: "The birth of twins Will and Izzy",
      content: `THE BIRTH:
After Addie stepped fully into her POH role and balanced leadership at the compound with Order commitments, she and Hawk welcome twin babies — one boy and one girl.

THE IMPACT:
The birth shakes their carefully balanced schedules.
But it also softens Hawk in ways that surprise even him.

HAWK'S TRANSFORMATION:
- Late nights strategizing with teams shift to late nights rocking babies to sleep
- The team jokingly calls him "Dad Ops"

ADDIE'S JOY:
Though overwhelmed, she finds joy in the twin dynamic.
They remind her of balance, of unity in difference.
She begins weaving "two lights, one mission" into her leadership ethos at POH.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Will Hawthorne', 'Izzy Hawthorne']),
      themes: JSON.stringify(['Family', 'Twins', 'Transformation', 'Parenthood'])
    },
    {
      title: "Addie & Hawk: The Surprise Third Child",
      category: "Family",
      description: "Mikey arrives just a year after the twins",
      content: `THE NEWS:
Just as they're finding their footing with twins, Addie discovers she's pregnant again within a year.
The news shocks both of them.
Addie worries about balancing a third child with her public role.

HAWK'S RESPONSE:
Steady as ever, Hawk reassures her:
"We've survived combat zones together, love. We can survive diapers."

DIVINE SURPRISE:
This third child becomes a kind of divine surprise for them both.
Strengthens their faith.
Addie leans more heavily into her Catholic faith.
Finds comfort in the rhythm of sacraments, Sunday dinners, and wives' club support.

THE REALITY:
Three kids under three.
Addie deep in POH responsibilities.
Hawk steps back from frontline operations.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Surprise', 'Faith', 'Divine Providence', 'Three Under Three'])
    },
    {
      title: "Hawk: Stay-at-Home Dad Transition",
      category: "Character Arc / Family",
      description: "From operator to stay-at-home father",
      content: `THE SHIFT:
After twins born, Hawk still insists on deploying with BSS teams.
But with Mikey arriving quickly after, reality of three kids under three hits hard.
Addie is deep in POH responsibilities.
Hawk steps back from frontline operations.

IT'S NOT EASY:
He misses the adrenaline, the brotherhood, the mission tempo.
But he recognizes his new battlefield is home and boardroom.

THE STAY-AT-HOME GENERAL:
- Takes over day-to-day parenting
- Bottles at dawn, wrangling toddlers, managing chaos
- Wives' club teases him as "Commander of Chaos" — he wears it with pride
- Sets up household like military unit: duty rosters, gear inspections (toys, laundry)
- "Mini-rucks" where kids carry small backpacks on hikes
- Turns parenting into a mission — purposeful, not rigid`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Will Hawthorne', 'Izzy Hawthorne', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Fatherhood', 'Transformation', 'Stay-at-Home Dad', 'New Mission'])
    },
    {
      title: "Hawk: The Boardroom Warrior",
      category: "Character Arc / BSS",
      description: "Hawk shifts from operations to governance",
      content: `THE TRANSITION:
Hawk shifts operational expertise into strategy and governance.

NEW ROLES:
- Joins BSS Board of Directors
- Leads foundation's security & resilience initiatives
- Advises on high-level projects with The Foundry and the Orders

VALUE:
His discipline and ability to cut through noise make him invaluable in:
- Long-range planning
- Donor relations
- Crisis management for BSS Foundation and Order ventures

THE QUIET ARCHITECT:
He becomes the quiet architect behind the scenes.
Not the flashy face (that's Addie, Elena, or Harper).
The one who ensures the machine runs without failure.`,
      characters: JSON.stringify(['Hawk', 'Jasper Barrett', 'Harper']),
      themes: JSON.stringify(['Leadership', 'Board', 'Strategy', 'Behind the Scenes'])
    },
    {
      title: "Hawk's No-Tech Rules",
      category: "Family / Values",
      description: "Hawk's strict rules about screens in the home",
      content: `THE NURSERY RULE:
No tech allowed in the room with the twins.
No tablet, no baby monitor glowing, no phone on nightstand.
"They get us. Not whatever's buzzing out there."

THE LIVING ROOM:
No TVs in the living room or common areas.
"This is where we talk, not zone out."

WHAT FILLS THE SPACE:
- Twins' laughter
- Grace's piano practice
- Hawk reading aloud from war history while rocking Mikey
- BSS operators sharing stories by firelight
- Sunday dinner conversations

THE TABLE RULE:
Zero tolerance for screens at meals — even for guests.
Even Addie and Bella must follow.

THE ENFORCEMENT:
If a phone appears, Hawk holds out his palm: "Phone."
No raised voice. Just steady authority.
"You'll get it back after dessert. House rule."

THE PHILOSOPHY:
"I've spent half my life staring at screens. These kids are gonna grow up knowing their dad's eyes, not the back of a phone."`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Bella', 'Will Hawthorne', 'Izzy Hawthorne']),
      themes: JSON.stringify(['No Screens', 'Presence', 'Values', 'Family Rules'])
    },
    {
      title: "Hawk's Happiest Dad Moments",
      category: "Family / Vignettes",
      description: "Scenes showing Hawk thriving as a father",
      content: `3 A.M. BOTTLE WATCH:
Hawk rocks Mikey at 3am, half-closed eyes.
"Battle drills at oh-three-hundred. Enemy is armed with… lungs."
He tells Addie: "You've got the world to save. I got this."

THE DIAPER DEBACLE:
Treating diaper changes like mission planning.
"Alright, Will, this is a textbook operation. Quick in, quick out."
Things go sideways. Addie laughs from the doorway.
"Did the op go sideways, Commander?"
"Compromised. We've lost containment."

FIRST SADDLE:
Teaching the twins to ride ponies.
"This is no different than a helo insert. Eyes up, grip tight, don't let go."

PASTA NIGHT:
Flour in hair, noodles on ceiling, sauce everywhere.
"This is why we can't have nice things."
Wearing a dish towel cape pretending to be an Italian chef.

THE REALIZATION:
"I thought I'd miss the rush. Kicking in doors, jumping out of planes.
Turns out… this is harder. And better.
I don't need to be out there proving myself anymore.
This is the only mission that matters. And it feels good to win here."`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Will Hawthorne', 'Izzy Hawthorne', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Fatherhood', 'Joy', 'Humor', 'Victory'])
    },
    {
      title: "Sunday Dinners at the Ranch",
      category: "Family Traditions",
      description: "The weekly gathering at Hawk and Addie's compound",
      content: `THE SETTING:
Long farmhouse table. Candles flickering.
Cast-iron pan of cornbread.
Mountain twilight pressing against windows.
Room glowing with firelight and children's laughter.

THE RULES:
- No screens at the table
- Grace before every meal
- Everyone helps clean up

WHO'S THERE:
- Addie and Hawk with the three kids
- Elena and Jasper with Grace
- Bella and Matt
- Kendra and Chris
- Other wives' club members and operators

THE ATMOSPHERE:
Without screens pulling attention away, conversations run deeper.
About family, faith, the future of their work.
Kids sprawl across the rug building Lego castles.
Adults sit cross-legged, plates on laps.
Charades and silly games after food is cleared.

HAWK'S VIEW:
"Fire, food, my people in one room. That's command."`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Elena Barrett', 'Jasper Barrett', 'Bella', 'Grace', 'Kendra', 'Matt']),
      themes: JSON.stringify(['Sunday Dinner', 'Tradition', 'Family', 'Community'])
    },
    {
      title: "The Compound Adapts",
      category: "Family / Setting",
      description: "How the ranch house changes for three kids",
      content: `THE EXPANSION:
A new wing in the ranch house is added.
Designed with input from Addie, Hawk, and the wider circle of families.

THE LIBRARY:
Becomes Addie's quiet refuge when she needs a break from chaos of three children under three.

THE NURSERY:
Tech-free zone with soft gray-blue walls.
Twin cribs side by side.
Rocking chair in the corner.
Shelves with board books and wooden toys.
No screens anywhere.

HAWK'S MAN CAVE:
Walls lined with mementos:
- Sand-scoured rifle
- Framed team photo from Afghanistan
- Medals from his Guard service

Also contains:
- Baby monitor (the only tech allowed)
- Secure laptop for board meetings
- Journals about leadership lessons for his kids`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Will Hawthorne', 'Izzy Hawthorne', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Compound', 'Ranch', 'Adaptation', 'Home'])
    }
  ];

  // Add children characters
  console.log("--- Adding Children Characters ---");
  for (const child of children) {
    const existing = await prisma.character.findFirst({
      where: { name: child.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...child }
      });
      console.log(`Created: ${child.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: child
      });
      console.log(`Updated: ${child.name}`);
    }
  }

  // Add storylines
  console.log("\n--- Adding Family Storylines ---");
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

  const charCount = await prisma.character.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Storylines: ${storyCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
