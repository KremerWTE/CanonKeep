import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Chris's Non-BSS Friends & Minor Characters...\n");

  const characters = [
    // ========== RYAN McKENNA ==========
    {
      name: 'Ryan McKenna',
      firstName: 'Ryan',
      lastName: 'McKenna',
      archetype: 'Chris\'s Boston Firefighter Friend',
      hubLocation: 'South Boston, MA',
      background: `Oldest friend of Chris from Boston, a firefighter like Chris's dad. Still lives in Southie.

Married with two kids, Ryan keeps Chris grounded with reminders of his roots.

They talk once a week, usually about sports (Boston Bruins, Notre Dame football) and life.

Ryan doesn't care about BSS or politics — he just wants to know when Chris is coming home for a Sox game.`,
      personality: 'Down-to-earth, family-oriented. Keeps Chris grounded with reminders of his roots. Doesn\'t care about BSS or politics.',
      relationships: 'Chris Donnelly - oldest friend from Boston',
      sourceFiles: 'New character creation',
    },

    // ========== NATE "BOOKER" ELLIS ==========
    {
      name: 'Nate "Booker" Ellis',
      firstName: 'Nate',
      lastName: 'Ellis',
      nickname: 'Booker',
      archetype: 'Chris\'s Notre Dame Roommate / Lawyer',
      education: 'Notre Dame',
      hubLocation: 'Chicago, IL',
      background: `College roommate at Notre Dame, now a lawyer in Chicago specializing in startup law.

The guy Chris calls when he needs a reality check outside the BSS bubble.

Loud, opinionated, hilarious — Chris and Nate have been best men in each other's weddings. Nate's the one who can get under Chris's skin and still walk away laughing.

When Kendra first met Nate, she called him "the only person besides Addie who can out-sarcasm Chris."`,
      personality: 'Loud, opinionated, hilarious. Can get under Chris\'s skin and still walk away laughing.',
      relationships: `Chris Donnelly - college roommate, best man at each other's weddings
Kendra - impressed by his sarcasm`,
      sourceFiles: 'New character creation',
    },

    // ========== ALICIA "ALI" GRANT ==========
    {
      name: 'Alicia "Ali" Grant',
      firstName: 'Alicia',
      lastName: 'Grant',
      nickname: 'Ali',
      archetype: 'CrossFit Gym Owner',
      hubLocation: 'Raleigh, NC',
      background: `Fellow CrossFit competitor who retired after an injury. Now runs her own gym in Raleigh.

Chris and Ali stayed friends because of respect — she helped him refine his training approach, and he helped her transition into the business side of fitness.

She's not romantically tied to Chris, but Kendra teases him about Ali's early crush on him.

Ali often reminds Chris to keep competing for himself, not just for Kendra's intensity.`,
      personality: 'Respectful, former athlete. Helps Chris stay grounded in fitness goals.',
      relationships: `Chris Donnelly - mutual respect, helped each other professionally
Kendra - teases Chris about Ali's early crush`,
      sourceFiles: 'New character creation',
    },

    // ========== EVAN ROSS ==========
    {
      name: 'Evan Ross',
      firstName: 'Evan',
      lastName: 'Ross',
      archetype: 'Tech Entrepreneur / Chris\'s Business Friend',
      hubLocation: 'Charlotte, NC',
      background: `A client turned friend — tech entrepreneur in Charlotte.

Introduced Chris to circles outside BSS and military networks, which gave him credibility in the civilian finance and business world.

The friend who pushes Chris to think bigger: investing in properties, long-term wealth building, and — recently — encouraging him to get into real estate development with Kendra's future gym projects.`,
      personality: 'Forward-thinking, business-minded. Pushes Chris to think bigger about investments and development.',
      relationships: 'Chris Donnelly - client turned friend',
      sourceFiles: 'New character creation',
    },

    // ========== VICTORIA (ELENA'S MOTHER) ==========
    {
      name: 'Victoria Barrett',
      firstName: 'Victoria',
      lastName: 'Barrett',
      archetype: 'Elena\'s Mother',
      hubLocation: 'Charlotte, NC / Southern family home',
      background: `Elena's mother. Warm, welcoming presence. Her warmth and grace are what Elena and Evie remind each other of.

Victoria represents the kind of everyday heroes Jasper wants Grace surrounded by — good, kind, salt-of-the-earth people who model integrity.

Her presence echoes in Elena's event planning and hospitality style.`,
      personality: 'Warm, welcoming, gracious. Model of Southern hospitality and integrity.',
      relationships: `Elena Barrett - mother
Grace Barrett - grandmother`,
      sourceFiles: 'Characters.docx',
    },

    // ========== CARDINAL ALVAREZ ==========
    {
      name: 'Cardinal Alvarez',
      firstName: 'Cardinal',
      lastName: 'Alvarez',
      archetype: 'Catholic Cardinal / Chris\'s Vatican Connection',
      hubLocation: 'Rome / Washington D.C.',
      background: `Catholic Cardinal connected to Chris through Jasper's introduction.

At a Vatican fundraiser, Cardinal Alvarez leaned across the table, telling Jasper: "You didn't just bring us another soldier. You brought us a builder."

Over the next year, Chris develops genuine friendship with him and other Church leaders through Catholic finance and philanthropic boards.`,
      personality: 'Sees value in Chris\'s financial expertise for the Church. Treats him as a confidant.',
      relationships: `Chris Donnelly - friend and trusted advisor
Jasper Barrett - introduced them`,
      sourceFiles: 'New character creation',
    },

    // ========== PAPAL NUNCIO ==========
    {
      name: 'Papal Nuncio',
      firstName: 'Papal',
      lastName: 'Nuncio',
      archetype: 'Vatican Ambassador to the US',
      hubLocation: 'Washington D.C.',
      background: `The Papal Nuncio (Vatican's ambassador to the US) treats Chris as a confidant, often seeking his advice on American culture and business.

Connected through Jasper's introduction at a Vatican fundraiser in Washington D.C.

Part of Chris's growing circle of Catholic elite connections.`,
      personality: 'Diplomatic, wise. Values Chris\'s practical American perspective.',
      relationships: `Chris Donnelly - confidant
Jasper Barrett - introduced them`,
      sourceFiles: 'New character creation',
    },

    // ========== RILEY (OFFICE MANAGER) ==========
    {
      name: 'Riley',
      firstName: 'Riley',
      lastName: '',
      archetype: 'BSS Office Manager / Addie\'s First Mentor',
      hubLocation: 'Boston, MA / Charlotte, NC',
      bssRole: 'Office Manager',
      background: `Pragmatic BSS office manager who became Addie's first "trainer" during her Year One.

RILEY'S INFLUENCE (Discipline & Professionalism):
Riley taught Addie how to:
- Build and control schedules with precision
- Present information crisply, no rambling
- Show up on time, dressed for the room she was entering

Riley's approach: Tough love. He pushed back hard on her chaotic tendencies until she started to self-correct.

When Addie arrived at BSS for her first day, Riley led her toward her desk. Within an hour, Riley dropped a pile of scheduling conflicts on her desk, more as a test than an assignment.`,
      personality: 'Pragmatic, tough love mentor. Pushes back hard on chaos until people self-correct.',
      relationships: 'Addie - first mentor during Year One, taught discipline and professionalism',
      sourceFiles: 'New character creation',
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

  // Update Chris with friend references
  const chris = await prisma.character.findFirst({
    where: { firstName: 'Chris', lastName: 'Donnelly' }
  });

  if (chris) {
    const currentRelationships = chris.relationships || '';
    if (!currentRelationships.includes('Ryan McKenna')) {
      await prisma.character.update({
        where: { id: chris.id },
        data: {
          relationships: currentRelationships + `

NON-BSS FRIENDS:
- Ryan McKenna - oldest friend from Boston, firefighter like his dad
- Nate "Booker" Ellis - Notre Dame roommate, lawyer in Chicago, best man
- Alicia "Ali" Grant - CrossFit friend, runs gym in Raleigh
- Evan Ross - tech entrepreneur, pushes Chris to think bigger

CATHOLIC CONNECTIONS:
- Cardinal Alvarez - friend, sees Chris as "a builder"
- Papal Nuncio - treats Chris as confidant on American culture`,
        }
      });
      console.log('Updated: Chris Donnelly with friend references');
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
