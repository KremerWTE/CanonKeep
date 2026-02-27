import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING COMPREHENSIVE POH CONTENT ===\n");

  // ============ POH ORGANIZATION ============
  const pohOrg = {
    name: "Palace of Honor (POH)",
    type: "Secret Society / Patronage Network",
    industry: "Philanthropy / Catholic Orders / Recovery Operations",
    headquarters: "Charlotte Compound (Silver Room)",
    description: `THE PALACE OF HONOR (POH) - ADDIE'S DOMAIN

WHAT IT IS:
An unofficial but universally understood network centered on Addie as the Patroness of Honor.
Not an organization with bylaws, but a recognized circle of influence connecting BSS, Catholic Orders, and elite philanthropy.

LEADERSHIP:
Patroness of Honor: Addie
- Title not announced but earned through action
- Natural center of gravity for BSS, Orders, and families
- Bridges strategy, hospitality, and connection

═══════════════════════════════════════════════════════════
POH ASSISTANT ROLES (Unofficial but Everyone Knows)
═══════════════════════════════════════════════════════════

THE HAND OF THE POH - Bella
- Closest personal confidante and executive assistant
- Handles daily coordination, messaging, and whispers
- Symbol: Silver quill pin (voice and right hand)

THE MARSHAL OF THE SILVER ROOM - Elena
- Keeper of POH library and artifacts
- Ensures cultural and historical gifts are catalogued
- Acts as ceremonial planner for major gatherings
- Symbol: Key-shaped brooch

THE GUARDIAN OF THE LEDGER - Harper
- Manages treasury of favors, gifts, and promises
- Keeps track of who owes what and when
- Symbol: Silver bracelet with etched scales of justice

THE WARDEN OF THE GATES - Kendra
- Oversees security, travel, and protective measures
- Ensures POH's safety without drawing attention
- Symbol: Steel signet ring with hidden cross

THE HERALD OF THE FLAME - Selene
- Public face when Addie cannot appear
- Speaks at galas, manages whispers
- Spreads POH message subtly through high society
- Symbol: Pendant with stylized flame

THE MISTRESS OF THE TABLE - Sara
- Ensures traditions of meals, gatherings, rituals
- Keeps bonds alive through shared moments
- Symbol: Silver goblet charm

THE KEEPER OF THE SEAL - Mandy
- Delivers confidential messages, negotiates on Addie's behalf
- Her word carries Addie's weight when abroad
- Symbol: Wax-seal emblem necklace

═══════════════════════════════════════════════════════════
HOW IT WORKS
═══════════════════════════════════════════════════════════

NO OATHS, NO CEREMONY:
Addie never announces positions. Uses them in practice.
Titles slip into conversation with humor and respect.

THE NICKNAMES STICK:
Names begin as half-jokes at Sunday dinners.
Over time, everyone uses them. Outsiders assume more structure.

A SHADOW CHAIN OF COMMAND:
No badges or offices, but when Addie moves, assistants move.
In crises, they naturally fall into roles.

EVERYONE KNOWS, NO ONE ADMITS:
"Talk to the Hand first" or "Only the Keeper can deliver that"
Never written, never public, but understood.

ADDIE AS THE CENTER:
By keeping it unofficial, avoids looking institutional.
Preserves image of a woman who commands respect by being present.`,
    significance: "Addie's sphere of influence connecting BSS, Catholic Orders, and recovery operations"
  };

  // ============ POH STORYLINES ============
  const pohStorylines = [
    {
      title: "Addie Accepts the POH Mantle",
      category: "POH / Character Arc",
      description: "The scene where Addie publicly accepts her role as Patroness of Honor",
      content: `SUNDAY DINNER AT THE COMPOUND

The long oak table glowed under golden light of wrought-iron chandeliers.
Children's laughter echoed from the loft.
Smell of smoked brisket from Hawk's pit mingled with wine and lavender.

Addie had been quiet through dinner, listening to Elena, watching Kendra with her newborn, watching Bella tease Matt.

When plates cleared and noise settled, Addie stood, one hand on Hawk's chair.

"I've been thinking about this whole... Patroness of Honor thing."

The room went quiet. Even the kids paused.

"At first, I fought it. You all know I didn't want the title. I thought it was too much. Too much responsibility, too much attention. I thought maybe it would put me above you when all I ever wanted was to walk beside you."

She drew a breath. "But these past months... building the Silver Room together, praying with Grace, watching all of us juggle work and kids and missions — I realized something. Being POH isn't about me. It's about us. It's about being a steward of what we're building, of this family, this order we've created."

"And if that means I'm the one who has to stand at the center sometimes, then I'll do it. Not because I want the title, but because I love you all enough to carry it."

Bella's eyes shimmered. She wrapped her arms around Addie. "That's why you're perfect for it."

Kendra raised her glass. "To Addie — our Patroness."

Hawk reached up, catching Addie's hand, and squeezed once. His eyes said what he didn't need to: I've been waiting for you to see what we already knew.

For the first time, the title didn't feel heavy. It felt like a crown she was finally ready to wear.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella', 'Kendra', 'Elena Barrett']),
      themes: JSON.stringify(['POH', 'Acceptance', 'Leadership', 'Sunday Dinner'])
    },
    {
      title: "POH Assistant Roles: The Unofficial Council",
      category: "POH / Structure",
      description: "The informal but universally understood roles within POH",
      content: `ADDIE'S POH INNER CIRCLE ROLES

These aren't official positions. No oaths, no ceremony.
But everyone in the circle knows exactly who holds which mantle.

THE HAND OF THE POH - Bella
Role: Executive assistant, daily coordination, messaging
Symbol: Silver quill pin
"Talk to the Hand first"

THE MARSHAL OF THE SILVER ROOM - Elena
Role: Keeper of library and artifacts, ceremonial planner
Symbol: Key-shaped brooch

THE GUARDIAN OF THE LEDGER - Harper
Role: Treasury of favors, gifts, promises - tracks who owes what
Symbol: Silver bracelet with etched scales

THE WARDEN OF THE GATES - Kendra
Role: Security, travel, protective measures
Symbol: Steel signet ring with hidden cross

THE HERALD OF THE FLAME - Selene
Role: Public face, speaks at galas, manages whispers
Symbol: Pendant with stylized flame

THE MISTRESS OF THE TABLE - Sara
Role: Traditions of meals and gatherings
Symbol: Silver goblet charm

THE KEEPER OF THE SEAL - Mandy
Role: Confidential messages, negotiates abroad
Symbol: Wax-seal emblem necklace

Together they form the Council of the Silver Room under Addie.
Like a court-in-exile or secret household staff.
Informal, but far more effective than formal ranks.`,
      characters: JSON.stringify(['Addie', 'Bella', 'Elena Barrett', 'Harper', 'Kendra', 'Selene', 'Sara', 'Mandy']),
      themes: JSON.stringify(['POH', 'Roles', 'Council', 'Symbols'])
    },
    {
      title: "Hawk Assigns Bella as POH Assistant",
      category: "POH / Character Arc",
      description: "The moment Hawk formally pairs Bella with Addie",
      content: `THE LIBRARY, LATE EVENING

The fire had burned low. Addie sat cross-legged on the rug with a ledger, papers scattered around her. Hair slipping free, ink-stained fingers rubbing her temples.

Hawk stood in the doorway. "You've been at it for six hours. You promised me one glass of wine."

She laughed. "I promised to try."

"That's exactly why we need to change something." He scooped up papers before she could protest. "Addie, you can't carry POH on your shoulders alone."

Bella appeared behind him, cradling her wine. "Surprise. Turns out, I'm your new assistant. Effective immediately."

Addie blinked. "What?"

"You're drowning, and I'm not going to watch it happen," Hawk said. "Bella's already running East Coast ops like a maestro. She can handle calendars, comms, travel, all of it."

Bella clinked her glass against Addie's. "And I'm bossy enough to tell you when to go to bed."

Addie stared at them. "You... planned this."

"Damn right I did," Hawk said. "You're the Patroness now. That doesn't mean you stop being human. Delegating isn't weakness. It's how leaders last."

The tightness in her chest eased. For so long she had equated love with sacrifice. But here was Hawk, battle-hardened soldier turned gentle father, quietly making space for her to breathe. And Bella, radiant and relentless, ready to share the weight.

"Alright then. Assistant it is. But if you start color-coding my calendar, Bella, I'm firing you."

Bella laughed. "Please. You'll thank me when you're not double-booked on two continents."`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella']),
      themes: JSON.stringify(['POH', 'Delegation', 'Partnership', 'Support'])
    },
    {
      title: "POH Regional Stories: Southeast",
      category: "POH / Recovery Stories",
      description: "POH recovery and influence stories in the Southeast region",
      content: `POH SOUTHEAST REGION (CLT / ATL / Miami)

1. THE SILVER ROOM DEDICATION
Addie unveils the curated library and artifacts wing to the Southeast circle.
Guests gift her rare manuscripts.

2. MIAMI GALA RESCUE
Harper pulls off a last-minute miracle saving a high-profile gala when venue cancels.
POH reputation for crisis management solidified.

3. SUMMER CAMP LEGACY
Bella and Matt host the first Camp Legacy.
Blending family, training, and tradition.

4. HURRICANE CAROLINAS
A Category 4 hurricane devastates the NC coast.
Addie and Hawk open their ranch compound to shelter displaced families.
She personally coordinates with BSS logistics and Knights of Columbus.
FEMA delays cause tension; Elena's network brings supplies by private jet.
Survivors call her "The Lady of the Mountains."

5. SILENT RETREAT
Hawk convinces Addie, Kendra, and Bella into a weekend retreat in NC mountains.
Business secrets surface during the quiet.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella', 'Harper', 'Elena Barrett', 'Kendra', 'Matt']),
      themes: JSON.stringify(['POH', 'Southeast', 'Recovery', 'Hurricane'])
    },
    {
      title: "POH Regional Stories: Northeast",
      category: "POH / Recovery Stories",
      description: "POH recovery and influence stories in the Northeast region",
      content: `POH NORTHEAST REGION (NYC / DC / Boston)

1. THE EMBASSY DINNER
Addie represents POH at a Vatican Embassy dinner.
Networking future ambassadors.

2. WALL STREET INTERVENTION
Harper and Jasper step in to save a financial partner during market crash.

3. GEORGETOWN GALA
Elena stages a Catholic Order gala in DC.
Introducing POH's presence to old-money powerhouses.

4. BOSTON IVORY TOWER
POH members secure access to rare manuscripts for Addie's library via Harvard contacts.

5. THE MADISON SQUARE MEET
Bella and Mandy attend a secret Wives Club–POH crossover meeting with Ivy League elites.

TRAIN DERAILMENT RECOVERY (PENNSYLVANIA):
A toxic chemical spill threatens Appalachian towns.
Addie arrives in boots and work gloves, ignoring press requests.
Walks the wreckage with first responders.
Pulls Harper and Bella into rapid-response fundraising - millions raised.
A corporate donor tries to spin the disaster; Addie confronts him privately.
Families receive treatment, and Addie's leadership is whispered about in DC circles.`,
      characters: JSON.stringify(['Addie', 'Harper', 'Jasper Barrett', 'Elena Barrett', 'Bella', 'Mandy']),
      themes: JSON.stringify(['POH', 'Northeast', 'Recovery', 'Influence'])
    },
    {
      title: "POH International Recovery Missions",
      category: "POH / Recovery Stories",
      description: "POH team deployed to international crisis zones",
      content: `POH INTERNATIONAL RECOVERY MISSIONS

PHILIPPINES – TYPHOON
Addie arrives in Tacloban with Hawk, Bella, and BSS logistics.
Chartered cargo jet loaded with water purification units and medical tents.
Coordinates distribution through Catholic parishes when infrastructure collapses.
Rival NGOs accuse POH of being "shadowy" - Addie walks into storm-battered cathedral and publicly prays.
Survivors remember her as the woman who brought light to a city with no power.

HAITI – EARTHQUAKE AFTERMATH
Addie leads POH/BSS delegation with Elena (fundraising) and Harper (finance).
Directs medical triage in a ruined school with Order of Malta.
Local gangs try to extort aid convoys - BSS security defuses situation.
Photo of Addie holding Haitian child circulates among DC diplomats.

UKRAINE – WAR RELIEF
Addie and POH circle travel with humanitarian convoys into Lviv.
Joined by BSS cyber and logistics.
Arranges secure communications between aid workers and separated families.
Russian cyberattacks target relief groups - authorizes BSS cyber counter-hacks.
Word spreads of "American lady commander" who outmaneuvered chaos.

LEBANON – BEIRUT EXPLOSION
Months after port explosion, travels with Bella, Selene, and Kendra.
Bring architectural engineers and trauma counselors.
Negotiates with church leaders to rebuild a Catholic school.
Politicians try to co-opt funds - demands direct oversight by parish nuns.
Rebuilt school plaque honors "those who came from abroad with no flag but faith."

KENYA – DROUGHT & FAMINE
POH/BSS team into Nairobi, then by convoy to rural villages.
Elena manages water purification, Bella runs food distribution.
Ensures partnerships with Catholic Relief Services and local chiefs.
Skeptical villagers distrust foreign aid - earns trust by carrying water on her head.
Village grants her honorary title.

INDIA – MONSOON FLOODING
Leads POH/BSS into Kerala after floods destroy thousands of homes.
Organizes temporary housing and helicopter supply drops.
Bureaucracy stalls permits - charms regional governor over dinner.
BSS establishes emergency playbook for Asia.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella', 'Elena Barrett', 'Harper', 'Selene', 'Kendra']),
      themes: JSON.stringify(['POH', 'International', 'Recovery', 'Humanitarian'])
    },
    {
      title: "Addie's POH Battle Rhythm",
      category: "POH / Operations",
      description: "How Addie balances 40 cases per month with POH duties",
      content: `ADDIE'S BATTLE RHYTHM: 40 CASES/MONTH + POH

THE TEMPO:
~40 BSS cases per month (1-2 per day, sometimes bundled)
Evening POH events, ceremonies, strategic meetings
1 recovery week per month (CLT, TX, or Denver)

TYPICAL MONTH:

WEEK 1 - EAST COAST SURGE
10 cases NYC (Wall Street, hedge funds, media)
8 cases DC (Congressional hearings, lobbying, defense)
7 cases Boston (University, biotech)
Evening: EOHSJ Mass & charity dinner in DC
Evening: Shieldmaiden roundtable at CLT compound

WEEK 2 - INTERNATIONAL
15 cases London/Brussels (EU, NATO)
Evening: Sapientia Minervae salon in London
Evening: Private dinner with European contacts

WEEK 3 - DOMESTIC
15 cases mixed US cities
Evening: POH board meeting
Evening: Catholic Order coordination

WEEK 4 - RECOVERY
CLT HQ strategy sessions
Family time (Denver or TX)
Spiritual retreat preparation

WHO'S WITH HER:
Daily: Selene and Bella
Weekends: Hawk (always)
Major events: Full POH team
International: BSS Tier One assets when needed

THE BALANCE:
Hawk stays home with kids first 3 years
Bella handles day-to-day POH coordination
Elena manages ceremonial and artifacts
Kendra handles security
Harper tracks financial obligations
Sunday dinners are sacred no matter what`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella', 'Selene', 'Elena Barrett', 'Kendra', 'Harper']),
      themes: JSON.stringify(['POH', 'BSS', 'Battle Rhythm', 'Balance'])
    },
    {
      title: "Hawk: Stay-at-Home General for POH",
      category: "POH / Family",
      description: "How Hawk supports Addie's POH role by staying home",
      content: `HAWK AS STAY-AT-HOME GENERAL

THE DECISION:
"I've had my battles. I've had my seasons out there. This is yours now. You go lead, Addie. I'll keep the fort."

THE TRADE:
Hawk traded helicopters and missions for fatherhood.
Rose before dawn to walk the property, check fences.
Learned lullabies and rocking chairs.
Mastered swaddling and catching sleep in thirty-minute increments.

WHILE ADDIE TRAVELS:
She jets to New York one week, stands at Sunday table the next.
Galas become weapons - silk gowns as armor, conversations securing allies.

AT HOME:
Hawk in the kitchen, one child on hip, another tugging his sleeve.
Third constructing a fort out of couch cushions.
Center of gravity at the compound.
Steadied Bella when newborn kept her awake for days.
Sparred with Grace's boys until they collapsed laughing.
Held babies against his chest while reading after-action reports.

THE IMBALANCE:
Late nights, Addie sinks into bed exhausted.
"I should be here more. I should be the one doing bedtime."

Hawk: "Addie, you're giving our kids a mother who stands for something bigger than herself. That's not absence. That's a legacy. And when you're gone, they're with me. They're safe. That's what matters."

THE SYSTEMS:
Au pair vetted through POH channels.
Sunday dinners are sacred.
At least once a week - just the two of them on the porch swing, no phones.

THE RESULT:
POH didn't steal her from family. It forced them to redefine strength together.
Hawk became protector at home so she could be protector beyond it.
Children bright-eyed, laughing, surrounded by chosen family.
Proof they were doing it right.`,
      characters: JSON.stringify(['Hawk', 'Addie']),
      themes: JSON.stringify(['POH', 'Family', 'Stay-at-Home Dad', 'Partnership'])
    }
  ];

  // Add/update POH organization
  console.log("--- Adding POH Organization ---");
  const existingOrg = await prisma.organization.findFirst({
    where: { name: pohOrg.name, projectId: project.id }
  });

  if (existingOrg) {
    await prisma.organization.update({
      where: { id: existingOrg.id },
      data: pohOrg
    });
    console.log("Updated: Palace of Honor organization");
  } else {
    await prisma.organization.create({
      data: { projectId: project.id, ...pohOrg }
    });
    console.log("Created: Palace of Honor organization");
  }

  // Add storylines
  console.log("\n--- Adding POH Storylines ---");
  for (const storyline of pohStorylines) {
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

  // Summary
  const orgCount = await prisma.organization.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Organizations: ${orgCount}`);
  console.log(`Storylines: ${storyCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
