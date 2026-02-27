import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING THE ROYAL PHOENIX SERIES (ADDIE'S JOURNEY) ===\n");

  // Create the Royal Phoenix series
  const existingSeries = await prisma.bookSeries.findFirst({
    where: { name: "The Royal Phoenix", projectId: project.id }
  });

  if (!existingSeries) {
    await prisma.bookSeries.create({
      data: {
        projectId: project.id,
        name: "The Royal Phoenix",
        seriesType: "Main",
        protagonist: "Addie",
        premise: "Addie's journey from office assistant to BSS #3 and Patroness of Honor - her 'My Fair Lady' transformation, mentored by Hawk and proving herself through Vegas missions, international recovery efforts, and building the POH network.",
        themes: JSON.stringify(['Transformation', 'Leadership', 'Romance', 'POH', 'Power']),
        status: "in-progress",
        readingOrder: 2
      }
    });
    console.log("Created Series: The Royal Phoenix");
  }

  // Storylines for Addie's journey - based on documented info
  const storylines = [
    // THE FORGE PROGRESSION
    {
      title: "Addie: Office Assistant Era",
      category: "The Royal Phoenix / Career",
      description: "Addie's entry into BSS as an office assistant",
      content: `THE BEGINNING:
Addie enters BSS world initially through philanthropic connections.
Started as office assistant at The Forge (BSS CLT HQ).

WHAT SHE DID:
- Administrative work
- Quietly observed operations
- Proved herself indispensable through intellect and work ethic

THE SPARK:
Jasper noticed her potential early.
Her genius with data and analysis began showing through routine tasks.`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett']),
      themes: JSON.stringify(['Beginnings', 'Potential', 'The Forge'])
    },
    {
      title: "Addie: The Analyst Transition",
      category: "The Royal Phoenix / Career",
      description: "Addie's promotion from assistant to analyst",
      content: `THE PROMOTION:
Addie's brilliance with data made her promotion to analyst inevitable.

ANALYST ROLE:
- Running background checks
- Tracing funds through shell accounts
- Mapping suspicious financial flows
- Finding data anomalies others missed

THE LONDON TRIP:
First time Addie stepped into "frontline" role with Jasper instead of just back-office research.
Her presentation skills helped win the Barclay & Sterling account.
This proved she could operate beyond the office.`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett', 'Harper']),
      themes: JSON.stringify(['Growth', 'Analysis', 'London', 'Proving Worth'])
    },
    {
      title: "Addie: The My Fair Lady Transition",
      category: "The Royal Phoenix / Transformation",
      description: "Hawk prepares Addie for the high-stakes world",
      content: `THE TRANSFORMATION:
Hawk took Addie under his wing to prepare her for the high-stakes world of BSS operations.

WHAT HAWK TAUGHT HER:
- Body language in high-stakes rooms
- How to spot "tells" like in poker
- Reading players vs. laundering money ("betting black chips for three hours with no reaction")
- The importance of appearance in elite settings
- Art/jewelry trade tricks to spot fakes
- Understanding provenance papers
- What "private cage" really means (off-the-books money movement)

THE PHILOSOPHY:
"In Vegas, everyone's dirty. The question is—dirty how? You need to see the world through that filter, or you'll miss the entire game."

PREPARATION MOMENTS:
Hawk taught her: "Jasper trusts your brain. I'm making sure you don't look like fresh meat when you walk in."
Lesson one: "Don't ever order bourbon in front of a whale. They'll peg you as middle-class. In the Argentum, it's Macallan 18, neat—or nothing."`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['Transformation', 'Mentorship', 'My Fair Lady', 'Training'])
    },
    {
      title: "Addie: The Fixer Era",
      category: "The Royal Phoenix / Career",
      description: "Addie's evolution into a full BSS fixer",
      content: `THE EVOLUTION:
From analyst to fixer - Addie proved she could handle field operations.

WHAT CHANGED:
- No longer just back-office research
- Client-facing roles
- Crisis management on the ground
- Traveling internationally for BSS

KEY QUALITIES:
- Strategic thinking
- Brilliant intuition with data anomalies
- Ability to crack open complex networks
- Diplomatic presence in elite circles

RECOGNITION:
Became known as the "IT girl" for BSS operations.
Jasper called her his "rising star."`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett', 'Hawk']),
      themes: JSON.stringify(['Fixer', 'Field Work', 'Growth', 'Recognition'])
    },

    // VEGAS MISSIONS
    {
      title: "Vegas Mission 1: Casino Financial Crisis",
      category: "The Royal Phoenix / Vegas",
      description: "Addie's first major Vegas win - The Argentum casino",
      content: `THE CLIENT:
A major Strip casino - The Argentum - was hemorrhaging money.
On paper the ledgers were fine, but the owners were panicking.
BSS was hired through Jasper's connections with the private equity fund that bankrolled the casino.

ADDIE'S ROLE:
- Junior analyst
- Running background checks
- Tracing funds
- Mapping suspicious flows through shell accounts

THE DISCOVERY:
Money laundering + internal embezzlement.
Addie cracked it open by finding data anomalies others missed.
Her unpolished but brilliant intuition exposed the network.

THE WIN:
BSS exposed a mid-level casino exec as the weak link working with a foreign criminal group.
Jasper handled the boardroom - Addie's work made the case stick.

HAWK'S WEEKEND PREP:
Hawk visited on weekends, giving her crash courses in Vegas culture.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Jasper Barrett', 'Kendra']),
      themes: JSON.stringify(['Vegas', 'Money Laundering', 'Breakthrough', 'The Argentum'])
    },
    {
      title: "Vegas Mission 2: Fake Art in Casino Gallery",
      category: "The Royal Phoenix / Vegas",
      description: "Addie's second Vegas operation - art forgery ring",
      content: `THE CLIENT:
A luxury casino-gallery selling supposed masterpieces and gems to ultra-wealthy guests.
A client tied into EOHSJ or European royalty brought BSS in after doubts.

THE OPERATION:
Addie and Kendra got assigned to "undercover" roles.
Addie posed as a buyer's assistant.

THE DISCOVERY:
High-level forgery ring tied to international smugglers.
Addie nearly got burned when she recognized discrepancies in the paperwork faster than the pros.

HAWK'S TEACHING:
On his Vegas weekends, Hawk taught her about the art/jewelry trade's tricks.
How to sniff out fakes.
"If he's really proud of his Renoir, he'll let you see the provenance papers. If he's evasive, odds are it's forged."

THE STING:
Addie maneuvered a sting meeting.
Jasper closed the negotiation in classic BSS style.
The forgery ring was quietly shut down with pressure from international law enforcement.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Kendra', 'Jasper Barrett']),
      themes: JSON.stringify(['Vegas', 'Art Forgery', 'Undercover', 'The Argentum'])
    },

    // POH TRAVEL & RECOVERY
    {
      title: "POH: Hurricane Carolinas Recovery",
      category: "The Royal Phoenix / POH Recovery",
      description: "Addie leads Southeast hurricane relief",
      content: `THE CRISIS:
A Category 4 hurricane devastates the NC coast.

ADDIE'S RESPONSE:
- Opened ranch compound to shelter dozens of displaced families
- Personally coordinated with BSS logistics
- Worked with Knights of Columbus to deliver water and fuel

CONFLICT:
FEMA delays caused tension.
Addie leaned on Elena's event network to bring supplies by private jet.

RESULT:
Survivors called her "The Lady of the Mountains."
Cemented POH's quiet influence in the Southeast.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Elena Barrett']),
      themes: JSON.stringify(['POH', 'Recovery', 'Hurricane', 'Leadership'])
    },
    {
      title: "POH: Philippines Typhoon Response",
      category: "The Royal Phoenix / POH International",
      description: "Addie leads international disaster relief in Philippines",
      content: `THE MISSION:
Addie arrives in Tacloban with Hawk, Bella, and BSS logistics operators.
Flew in on a chartered cargo jet loaded with water purification units and medical tents.

POH ROLE:
- Coordinated distribution through Catholic parishes when local infrastructure collapsed
- Worked with Order of Malta connections

CONFLICT:
Rival NGOs accused POH of being "shadowy."
Addie walked into the storm-battered cathedral and publicly prayed with the people, silencing doubts.

RESULT:
BSS earned international credibility.
Addie was remembered as "the woman who brought light to a city with no power."`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella']),
      themes: JSON.stringify(['POH', 'International', 'Typhoon', 'Faith'])
    },
    {
      title: "POH: Ukraine War Relief",
      category: "The Royal Phoenix / POH International",
      description: "Addie coordinates humanitarian aid in Ukraine",
      content: `THE MISSION:
Addie and her POH circle travel with humanitarian convoys into Lviv.
Joined by BSS cyber and logistics teams.

POH ROLE:
- Arranged secure communications between aid workers and separated families

CONFLICT:
Russian cyberattacks targeted relief groups.
Addie authorized BSS cyber analysts to counter the hacks.

RESULT:
Aid moved smoothly.
Word spread of an "American lady commander" who knew how to outmaneuver chaos.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'BSS Cyber Team']),
      themes: JSON.stringify(['POH', 'Ukraine', 'Humanitarian', 'Cyber Defense'])
    },
    {
      title: "POH: Beirut Explosion Recovery",
      category: "The Royal Phoenix / POH International",
      description: "Addie leads rebuilding efforts in Lebanon",
      content: `THE MISSION:
Months after the port explosion, Addie travels with Bella, Selene, and Kendra.
They arrive with architectural engineers and trauma counselors.

POH ROLE:
- Negotiated with church leaders and NGOs to rebuild a Catholic school

CONFLICT:
Local politicians tried to co-opt the funds.
Addie demanded direct oversight by parish nuns, refusing compromise.

RESULT:
The rebuilt school was dedicated with a plaque honoring "those who came from abroad with no flag but faith."`,
      characters: JSON.stringify(['Addie', 'Bella', 'Selene', 'Kendra']),
      themes: JSON.stringify(['POH', 'Beirut', 'Rebuilding', 'Faith'])
    },

    // POH ROLE ACCEPTANCE
    {
      title: "Addie Accepts the POH Mantle",
      category: "The Royal Phoenix / POH",
      description: "The moment Addie fully embraces being Patroness of Honor",
      content: `THE STRUGGLE:
At first, Addie felt the weight of the POH title.
- Worried about appearances
- Felt she might be "crossing a line"
- Questioned her worthiness

THE REALIZATION:
As responsibilities grew - coordinating recovery abroad, organizing relief missions, creating the Silver Room - Addie realized the title isn't about status.
It's about stewardship.

THE ACCEPTANCE:
"I've been thinking about this whole Patroness of Honor thing. At first, I fought it. I didn't want the title. I thought it was too much responsibility, too much attention. But these past months... I realized something. Being POH isn't about me. It's about us. It's about being a steward of what we're building."

THE CROWN:
For the first time, she felt the title not as a weight, but as a crown she was finally ready to wear.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella', 'Elena Barrett', 'Kendra']),
      themes: JSON.stringify(['POH', 'Acceptance', 'Leadership', 'Vocation'])
    },

    // ADDIE & HAWK FAMILY
    {
      title: "Hawk Becomes Stay-at-Home Dad",
      category: "The Royal Phoenix / Family",
      description: "Hawk's transition to support Addie's POH role",
      content: `THE DECISION:
When the twins came, Hawk still deployed with BSS teams.
But with Mikey arriving so quickly after, reality hit.
Three kids under three. Addie deep in POH responsibilities.

HAWK'S CHOICE:
"I've had my battles. I've had my seasons out there. This is yours now. You go lead, Addie. I'll keep the fort."

STAY-AT-HOME GENERAL:
- Rose before dawn to walk the property
- Learned lullabies and swaddling
- Became the center of gravity at the compound
- "Commander of Chaos" - the wives' club teasing nickname

WHAT IT MEANT:
Their roles weren't imbalanced - they were complementary.
Hawk became the protector at home so she could be the protector beyond it.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Will Hawthorne', 'Izzy Hawthorne', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Family', 'Partnership', 'Sacrifice', 'Balance'])
    },

    // BSS #3 POSITION
    {
      title: "Addie: BSS #3",
      category: "The Royal Phoenix / Career",
      description: "Addie's position as third in command at BSS",
      content: `THE POSITION:
Addie evolved from office assistant to the #3 position at Barrett Strategic Solutions.

HIERARCHY:
1. Jasper Barrett - Founder/CEO
2. Harper - COO
3. Addie - Strategic Operations / POH Bridge

HER ROLE:
- Core loyalty to Elena, Hawk, Jasper
- "IT girl" for BSS operations
- Takes front-facing responsibility, freeing Jasper for strategic command
- Bridges BSS, the Orders, and family life as "chaos coordinator"

DELEGATED TRAVEL:
Jasper shifted client-facing travel to Addie, Kendra, Bella.
This allowed Jasper to move to 75% work / 25% family balance.`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett', 'Harper', 'Elena Barrett', 'Hawk']),
      themes: JSON.stringify(['Leadership', 'BSS', 'Hierarchy', 'Trust'])
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

  // Note about missing info
  console.log(`\n--- NOTES ---`);
  console.log(`Missing documented info (user said leave blank if not found):`);
  console.log(`- Addie's specific college/university name`);
  console.log(`- Addie's college cam work screen name`);
  console.log(`- Addie's degree/major`);
  console.log(`- Specific details of Addie & Selene's show together`);

  const count = await prisma.storyline.count();
  console.log(`\nTotal Storylines: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
