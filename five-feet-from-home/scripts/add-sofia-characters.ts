import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Sofia Storyline Characters...\n");

  const characters = [
    // ========== SOFIA ==========
    {
      name: 'Sofia',
      firstName: 'Sofia',
      lastName: '',
      archetype: 'Foundation Leader / Evie\'s Love Interest',
      hubLocation: 'Charlotte, NC',
      wivesClubRole: 'Extended Circle - Foundation Leadership',
      background: `Foundation leader who works closely with Evie Maren on children's programming and galas.

RELATIONSHIP WITH EVIE:
- Started as professional collaboration (8 late-night work sessions developing foundation gala for kids)
- 25 "friend dates" building from casual to intimate
- Friends-to-lovers progression through meaningful moments
- Eventually cross the line into romantic relationship
- Sofia dates both Evie and Dr. Adrian Markos simultaneously

THE DYNAMIC:
Sofia = steel, Evie = fire. One without the other is incomplete.
"I don't just love you. I need you. Not because of what you do, but because you remind me why I started all this. Without you, I'd be steel without fire. And steel without fire is just… cold."

AT GALAS:
Sofia's body tilts toward Evie even when speaking to board members. Her gaze searches for Evie across the room when applause rises. The softness that slips through her polished smile whenever Evie laughs. Bella notices: "Sofia, the woman who can outplay any room, loses her mask the second Evie walks by."

CRISIS:
Foundation cooking showcase went wrong - students got food poisoning, athletes from Special Olympics got sick. Sofia went into crisis-control mode while Evie comforted the kids. Their approaches clashed - steel versus fire, colliding in the worst possible spotlight.`,
      personality: 'Polished, strategic, steel-like composure. Can outplay any room. Loses her mask around Evie. Struggles with jealousy when Evie gets credit. Needs control and stability but craves Evie\'s fire.',
      relationships: `Evie Maren - lovers, co-leaders of foundation work
Dr. Adrian Markos - physician boyfriend (stability, prestige)
Bella - mentor figure, watches the dynamic
Chris - arranges double dates with Adrian`,
      sourceFiles: 'Build Evie and Sofia Chat.docx',
    },

    // ========== DR. ADRIAN MARKOS ==========
    {
      name: 'Dr. Adrian Elias Markos',
      firstName: 'Adrian',
      lastName: 'Markos',
      title: 'Dr.',
      archetype: 'Cardiothoracic Surgeon / Sofia\'s Boyfriend',
      education: 'Columbia University pre-med, Harvard Medical School, Chief resident at Johns Hopkins',
      hubLocation: 'Charlotte, NC',
      background: `Cardiothoracic surgeon at Atrium Health Carolinas Medical Center, also teaches part-time at Duke University School of Medicine.

BACKGROUND:
- Born to Greek-American family, father ran a successful import business
- Former college rower, still runs marathons for charity
- First in his family to attend Ivy League

RELATIONSHIP WITH SOFIA:
- Represents security, prestige, and social approval - everything the board and donors want for Sofia
- Their relationship is real - she does care for him - but it's more about grounding than passion
- Creates Sofia's central tension: Does she choose safety with Adrian, or soul with Evie?

AT GALAS:
Adrian stands proudly with Sofia on his arm - donors murmur about what a "perfect couple" they make. Meanwhile, across the room, Evie is surrounded by kids and parents, glowing with authenticity. Adrian sees the way Sofia looks at Evie and realizes, for the first time, he might be fighting a battle he can't win with credentials and charm.

BLIND SPOT:
Can underestimate passion-driven people like Evie, dismissing their fire as "idealism."`,
      personality: 'Polished & composed, comfortable in high-society settings but doesn\'t seek attention. Grounded - believes in stability, structure, and "building wisely." Protective, calm, stabilizing presence.',
      appearance: '6\'2", athletic (former college rower, runs marathons). Dark brown hair neatly kept with touch of early gray at temples. Hazel-green eyes, steady and analytical. Crisp suits, minimal accessories.',
      relationships: `Sofia - girlfriend, represents stability and social approval
Evie Maren - respects her heart but sees her as "idealistic"
Bella - cordial respect but Bella is cautious
Addie - approves on paper but keeps watchful distance`,
      sourceFiles: 'Build Evie and Sofia Chat.docx',
    },

    // ========== JAMAL (SPECIAL OLYMPICS ATHLETE) ==========
    {
      name: 'Jamal',
      firstName: 'Jamal',
      lastName: '',
      archetype: 'Special Olympics Athlete',
      hubLocation: 'Charlotte, NC',
      background: `Special Olympics athlete who participates in the foundation's cooking showcase programs.

CRISIS NIGHT:
At the regional cooking showcase, Jamal was the first athlete to go pale at his station, clutching his stomach. He staggered, knocking over a tray of spring rolls. Evie ran to him, kneeling beside him as he dry-heaved into a bucket. Her hands shook, but her voice was steady: "Water, towels, now!"

Evie refused to let go of Jamal's hand until his breathing calmed, even as Sofia handled the crisis PR.`,
      personality: 'One of the Special Olympics athletes in the foundation programs.',
      relationships: 'Part of Evie\'s cooking class programs',
      sourceFiles: 'Build Evie and Sofia Chat.docx',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { firstName: char.firstName, lastName: char.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    }
  }

  // Update Evie with Sofia relationship
  const evie = await prisma.character.findFirst({
    where: { firstName: 'Evelyn', lastName: 'Maren' }
  });

  if (evie) {
    const currentRelationships = evie.relationships || '';
    if (!currentRelationships.includes('Sofia')) {
      await prisma.character.update({
        where: { id: evie.id },
        data: {
          relationships: currentRelationships + `

Sofia - friends-to-lovers progression through 25 "friend dates" and 8 late-night work sessions. Dynamic: Sofia = steel, Evie = fire. One without the other is incomplete.

Wives Club: Invited by Bella, introduction ceremony in white gown. Becomes "Bella's Helper" - her first role in the organization.`,
          wivesClubRole: 'Extended Circle - Bella\'s Helper / Mentee',
        }
      });
      console.log('Updated: Evie with Sofia relationship and Wives Club role');
    }
  }

  // Add storyline events
  const events = [
    {
      name: 'Foundation Cooking Showcase Crisis',
      description: `Regional cooking showcase where foundation students prepared meals. Disaster struck when several Special Olympics athletes got food poisoning mid-event.

The gymnasium buzzed with energy - banners, plated meals, the air thick with spices. For an hour, everything went perfectly. Then Jamal went pale at his station, clutching his stomach.

Evie ran to comfort the kids while Sofia went into crisis-control mode:
- Evie: "I'm not leaving them here shaking on the floor!"
- Sofia: "Clear the floor. Contain this. Call paramedics, quietly."

Their approaches clashed - steel versus fire, colliding in the worst possible spotlight.

AFTERMATH:
- Board members question if rapid growth compromised training quality
- Sofia defensive about polished image taking a hit
- Evie blames herself even though it wasn't her fault
- Bella's advice: "You don't lose trust because of one mistake. You rebuild it by how you respond."`,
      timelineRef: 'Foundation arc',
      consequences: 'Led to redemption showcase where students proved themselves. Foundation moved from "idealistic and new" to "serious, resilient institution."',
    },
    {
      name: 'Evie Joins Wives Club - Introduction Ceremony',
      description: `Evie's introduction ceremony to the Wives Club.

SETTING: Wives Club gathering, Evie in a simple white gown (symbol of purity and new beginnings), Bella in deep navy.

CEREMONIAL STEPS:
1. Welcome by chairwoman: "Tonight, we welcome a new sister. A woman of heart, courage, and vision."
2. Bella's mentor words: "This is Evie. She has given her heart to children who are not her own..."
3. Evie recites the vow
4. First embrace from Bella: "You are home now."

Sofia watches from the circle, chest aching - pride but also jealousy, knowing Evie now belongs to something bigger than just her.

Evie appointed as "Bella's Helper" - her first role in the organization.`,
      timelineRef: 'After foundation work deepens',
      consequences: 'Evie gains belonging and recognition, officially stepping into new world of influence. Sofia torn between pride and jealousy.',
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

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const charCount = await prisma.character.count();
  const eventCount = await prisma.event.count();
  console.log(`Total characters: ${charCount}`);
  console.log(`Total events: ${eventCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
