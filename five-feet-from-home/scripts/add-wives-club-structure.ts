import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING WIVES CLUB DETAILED STRUCTURE ===\n");

  // Update the main Wives Club organization with full structure
  const wivesClubOrg = {
    name: "The Wives Club",
    type: "Secret Society / Power Network",
    industry: "Social Influence / Intelligence / Philanthropy",
    headquarters: "Colorado Compound (Primary) with hubs in D.C./NY, Charlotte, Boston, Miami, Europe",
    description: `THE WIVES CLUB - OFFICIAL STRUCTURE & ORGANIZATION

OFFICIAL NAME: The Wives Club (sometimes called "The Circle" in private)
Not a formal organization with bylaws, but a recognized network with unwritten rules and traditions.

═══════════════════════════════════════════════════════════
ORGANIZATIONAL STRUCTURE
═══════════════════════════════════════════════════════════

LEADERSHIP POSITIONS:

1. THE MATRIARCH (Elena Barrett)
   - The original anchor who holds everyone together
   - Provides perspective and wisdom
   - Final say on who enters the inner circle
   - Symbol: Silver bracelet passed down from founding

2. THE FIXER (Addie)
   - Operational backbone of the club
   - Handles crises, logistics, and sensitive matters
   - BSS #3 - bridges the club with operations
   - Symbol: Simple but elegant watch (always practical)

3. THE FIREBRAND (Kendra)
   - Chief organizer and event host
   - Drives energy and competition
   - Handles social calendar and major gatherings
   - Symbol: Statement earrings (always noticed)

4. THE YOUNGER SISTER (Grace)
   - Represents the next generation
   - Protected and mentored by all
   - Emotional heart of the group
   - Symbol: Heart pendant from Elena

═══════════════════════════════════════════════════════════
SUB-GROUPS / CATEGORIES
═══════════════════════════════════════════════════════════

1. SHIELDMAIDENS
   Who they are: Wives of BSS operators
   Character: Mission/discipline-oriented, understand the lifestyle
   Faith: Catholic or supportive spouses
   Focus: Family resilience, operational security, mutual support
   Key members: Core operator wives, Layla Hassan
   Symbol: Shield pendant or pin
   Meetings: During deployments, crisis situations

2. THE OWLS
   Who they are: Former sorority women
   Character: Social connectors, friendship-focused
   Faith: Mix of cradle Catholics and seekers
   Focus: Networking, social events, bridging old world and new
   Key members: Bella, Camila, Rachel
   Symbol: Owl charm (wisdom through sisterhood)
   Meetings: Regular brunches, social gatherings

3. THE VESTALS
   Who they are: Elite society women with Order connections
   Character: High society, philanthropic
   Faith: Mostly Catholic, tied to Vatican tradition
   Focus: Philanthropy, Catholic networks, European connections
   Key members: Elena Barrett, Order-connected women
   Symbol: Flame pin (sacred fire of service)
   Meetings: Galas, Vatican events, order ceremonies

4. THE SPORTS MEDIA CIRCLE
   Who they are: Former sports anchors and media personalities
   Character: Polished, connected, narrative shapers
   Focus: PR, reputation management, media control
   Key members: Vivian Carroway, Elena Duvall, Sloane Hartwell, Marisa Calderon, Tessa Loring, Raina Locke
   Individual symbols:
   - Viv: Silver dove pin ("The Peacemaker")
   - Elena D: Red wine toast ritual
   - Sloane: Coded ledger
   - Marisa: Rosary ring
   - Tessa: Storytelling circle
   - Raina: Black fountain pen ("The Ledger")

5. TROPHY WIVES (Peripheral)
   Who they are: Beautiful women who married wealth
   Character: Range from toxic to sympathetic
   Status: Tolerated but not inner circle
   The Trophy Five: Brittany, Tiffany, Maddie, Vanessa M, Chloe
   The Bubble Wives: Savannah, Natalia, Haley, Jasmine, Lily

═══════════════════════════════════════════════════════════
GEOGRAPHIC HUBS
═══════════════════════════════════════════════════════════

1. COLORADO COMPOUND (Primary Hub)
   Leader: Addie & Elena
   Function: Sunday dinners, major gatherings, family events
   Character: Ranch house, firelight, no-screens policy

2. D.C./NY CORRIDOR
   Leader: Vanessa "Nessa" Caldwell
   Function: Political/media access, lobbying, policy
   Character: Power lunches, Capitol Hill access

3. CHARLOTTE HUB
   Leader: Charlotte "Charlie" Whitmore
   Function: Southern finance, NASCAR, corporate connections
   Character: Country club elegance, rising influence

4. BOSTON HUB
   Leader: Dr. Layla Hassan
   Function: Healthcare, biotech, medical networks
   Character: Academic/medical prestige, ethical anchor

5. MIAMI/FLORIDA
   Leader: Cami (Cuban-American connections)
   Function: Latin American ties, Caribbean networks
   Character: Cuban fire, family gatherings, warmth

6. EUROPEAN CONNECTIONS
   Leader: Elena Barrett (through Vatican/Order ties)
   Function: Vatican access, European nobility, international philanthropy
   Character: Galas, Catholic orders, royal connections

═══════════════════════════════════════════════════════════
RITUALS & CEREMONIES
═══════════════════════════════════════════════════════════

1. SUNDAY DINNERS
   Location: Colorado Compound
   Rules: No screens, grace before meals, everyone helps clean
   Purpose: Weekly family connection, strategy discussions
   Who attends: Core families, invited guests

2. THE HOSPITAL VIGIL (Origin Story)
   What it was: Elena, Addie, Grace spending the night during Elena's medical crisis
   Significance: The founding moment of the Wives Club
   "Remember the hospital?" = shorthand for deep trust

3. INITIATION TRADITION
   - New members introduced at Florida/Colorado retreats
   - Harper or Elena makes the formal introduction
   - Red wine toast to welcome
   - Gift of symbol (varies by sub-group)

4. CRISIS STRATEGY NIGHTS
   When: Major scandals or threats to BSS/families
   Where: Elena's living room or secure location
   What happens: Wives gather separately, trade intel, shape response
   Rule: Phones silenced, secrets stay in the room

5. THE STORYTELLING CIRCLE
   Led by: Tessa Loring
   Purpose: Craft cover stories and narratives before launches
   When: Before major public events or crisis responses

6. BABY SHOWER TRADITION
   Style: Overwhelming, full of advice and gifts
   Led by: Kendra (the charge)
   Grounded by: Addie (the calmer)
   Wisdom from: Elena ("Motherhood is imperfect but holy")

═══════════════════════════════════════════════════════════
CLUB SYMBOLS & TOKENS
═══════════════════════════════════════════════════════════

GENERAL WIVES CLUB:
- No official logo (secrecy is power)
- Recognition through relationships, not badges

SUB-GROUP SYMBOLS:
- Shieldmaidens: Shield pendant/pin
- Owls: Owl charm
- Vestals: Flame pin
- Sports Media: Individual symbols (dove, pen, rosary ring, etc.)

PERSONAL LEADERSHIP SYMBOLS:
- Elena (Matriarch): Silver bracelet
- Addie (Fixer): Elegant watch
- Kendra (Firebrand): Statement earrings
- Grace (Younger Sister): Heart pendant

═══════════════════════════════════════════════════════════
CORE VALUES & THEMES
═══════════════════════════════════════════════════════════

1. POWER BEHIND THE POWER
   "The wives are not just emotional support — they are a quiet intelligence network."

2. SISTERHOOD + RIVALRY
   Bonds of loyalty tested by ego, weddings, motherhood, and past loves

3. TWO WORLDS INTERSECTING
   BSS boardrooms + Catholic elite dinners — wives play the chess game alongside the men

4. GENERATIONAL GROWTH
   Elena (mentor) → Addie (fixer) → Kendra (firebrand) → Grace (newbie)

5. SUBSTANCE OVER SURFACE
   The club is about strength, faith, and resilience — not just beauty and status`,
    significance: "The power network behind BSS operations, family influence, and social capital"
  };

  // Update existing organization
  const existingOrg = await prisma.organization.findFirst({
    where: { name: "The Wives Club", projectId: project.id }
  });

  if (existingOrg) {
    await prisma.organization.update({
      where: { id: existingOrg.id },
      data: wivesClubOrg
    });
    console.log("Updated: The Wives Club organization");
  } else {
    await prisma.organization.create({
      data: { projectId: project.id, ...wivesClubOrg }
    });
    console.log("Created: The Wives Club organization");
  }

  // Create detailed storylines for each aspect
  const structureStorylines = [
    {
      title: "Wives Club: Complete Organizational Structure",
      category: "Wives Club / Reference",
      description: "The full organizational structure of the Wives Club",
      content: `THE WIVES CLUB - ORGANIZATIONAL STRUCTURE

OFFICIAL NAME: "The Wives Club" (informally "The Circle")
Not a formal organization — a recognized network with unwritten rules and traditions.

═══════════════════════════════════════════════════════════
LEADERSHIP HIERARCHY
═══════════════════════════════════════════════════════════

THE MATRIARCH - Elena Barrett
- Original anchor who holds everyone together
- Provides perspective and wisdom
- Final say on inner circle membership
- Symbol: Silver bracelet

THE FIXER - Addie
- Operational backbone
- Handles crises and sensitive matters
- BSS #3, bridges club with operations
- Symbol: Elegant watch

THE FIREBRAND - Kendra
- Chief organizer and event host
- Drives energy and competition
- Handles social calendar
- Symbol: Statement earrings

THE YOUNGER SISTER - Grace
- Next generation representative
- Protected and mentored by all
- Emotional heart of the group
- Symbol: Heart pendant from Elena

═══════════════════════════════════════════════════════════
SUB-GROUPS
═══════════════════════════════════════════════════════════

SHIELDMAIDENS - Operator wives, mission-oriented, Catholic
THE OWLS - Sorority women, social connectors
THE VESTALS - Elite society, Vatican/Order connections
SPORTS MEDIA CIRCLE - Former anchors, narrative shapers
TROPHY WIVES - Peripheral, tolerated but not inner circle`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Kendra', 'Grace']),
      themes: JSON.stringify(['Structure', 'Leadership', 'Organization', 'Reference'])
    },
    {
      title: "Wives Club: The Shieldmaidens",
      category: "Wives Club / Sub-Groups",
      description: "Detailed profile of the Shieldmaidens sub-group",
      content: `THE SHIELDMAIDENS

WHO THEY ARE:
Wives of BSS operators and military-connected women

CHARACTER:
- Mission/discipline-oriented
- Understand the deployment lifestyle
- Resilient through separations and danger

FAITH:
Catholic or supportive spouses of the Catholic mission

FOCUS:
- Family resilience during deployments
- Operational security awareness
- Mutual support during crises
- Protecting the home front

KEY MEMBERS:
- Dr. Layla Hassan (Boston anchor)
- Other BSS operator wives
- Jax Sloane (external advisor)

SYMBOL:
Shield pendant or pin - representing protection of family and mission

MEETING TRADITIONS:
- Gather during deployments for support
- Crisis response coordination
- Deployment send-offs and homecomings
- Private prayer circles

VALUES:
- Strength through adversity
- Silence when necessary
- Loyalty above all
- Faith as foundation`,
      characters: JSON.stringify(['Dr. Layla Hassan', 'Jacqueline Sloane']),
      themes: JSON.stringify(['Shieldmaidens', 'Operators', 'Military Wives', 'Resilience'])
    },
    {
      title: "Wives Club: The Owls",
      category: "Wives Club / Sub-Groups",
      description: "Detailed profile of the Owls sub-group",
      content: `THE OWLS

WHO THEY ARE:
Former sorority women who bring social networking expertise

CHARACTER:
- Social connectors and relationship builders
- Friendship-focused approach
- Bridge between old collegiate world and new power circles

FAITH:
Mix of cradle Catholics and seekers on faith journeys

FOCUS:
- Social events and networking
- Bringing in new connections
- Friendship and sisterhood bonds
- Bridging different social circles

KEY MEMBERS:
- Bella (sorority background)
- Camila
- Rachel
- Other collegiate-connected wives

SYMBOL:
Owl charm - representing wisdom through sisterhood
(Owls see in the dark, navigate social complexity)

MEETING TRADITIONS:
- Regular brunches and lunches
- Social event planning sessions
- Sisterhood bonding retreats
- Networking introductions

VALUES:
- Wisdom through connection
- Loyalty to sisters
- Strategic relationships
- Growth through community`,
      characters: JSON.stringify(['Bella', 'Camila', 'Rachel']),
      themes: JSON.stringify(['Owls', 'Sorority', 'Social Networking', 'Sisterhood'])
    },
    {
      title: "Wives Club: The Vestals",
      category: "Wives Club / Sub-Groups",
      description: "Detailed profile of the Vestals sub-group",
      content: `THE VESTALS

WHO THEY ARE:
Elite society women with Vatican and Catholic Order connections

CHARACTER:
- High society background
- Philanthropic leadership
- European and Vatican access

FAITH:
Mostly Catholic, deeply tied to Vatican tradition and Catholic orders

FOCUS:
- Philanthropy and charitable giving
- Catholic network maintenance
- Vatican and European connections
- Order of the Holy Sepulchre and Order of Malta ties

KEY MEMBERS:
- Elena Barrett (primary Vestal leader)
- Women connected to EOHSJ (Order of the Holy Sepulchre)
- Order of Malta-connected wives
- European aristocratic connections

SYMBOL:
Flame pin - representing the sacred fire of service
(Like the ancient Vestal Virgins who kept the sacred flame)

MEETING TRADITIONS:
- Vatican galas and events
- Order ceremonies and investitures
- Philanthropic board meetings
- European society events

VALUES:
- Service through privilege
- Sacred duty to faith
- Stewardship of tradition
- Graceful power`,
      characters: JSON.stringify(['Elena Barrett']),
      themes: JSON.stringify(['Vestals', 'Vatican', 'Catholic Orders', 'Philanthropy'])
    },
    {
      title: "Wives Club: Geographic Hub Details",
      category: "Wives Club / Structure",
      description: "Complete breakdown of all geographic hubs",
      content: `WIVES CLUB GEOGRAPHIC HUBS

═══════════════════════════════════════════════════════════
PRIMARY HUB: COLORADO COMPOUND
═══════════════════════════════════════════════════════════
Leaders: Addie & Elena
Location: Ranch house at the Colorado compound
Function: Sunday dinners, major gatherings, family events
Character:
- Long farmhouse table with candles
- Firelight and mountain twilight
- No-screens policy strictly enforced
- Kids building Lego castles, adults cross-legged with plates
Events: Sunday dinners, baby showers, crisis strategy nights

═══════════════════════════════════════════════════════════
D.C./NY CORRIDOR
═══════════════════════════════════════════════════════════
Leader: Vanessa "Nessa" Caldwell
Function: Political/media access, lobbying, policy influence
Character: Power lunches, Capitol Hill access, media connections
Key Access:
- Congressional relationships
- Lobbying firm networks
- Media/journalist connections
- Think tank influence
Role: Can kill a bill, push a story, or bury a scandal

═══════════════════════════════════════════════════════════
CHARLOTTE HUB
═══════════════════════════════════════════════════════════
Leader: Charlotte "Charlie" Whitmore
Function: Southern finance, NASCAR, corporate connections
Character: Country club elegance, rising influence, Southern hospitality
Key Access:
- Banking and finance families
- NASCAR sponsorship networks
- Southern philanthropy circles
- Corporate board connections
Role: The connector for Southern power networks

═══════════════════════════════════════════════════════════
BOSTON HUB
═══════════════════════════════════════════════════════════
Leader: Dr. Layla Hassan
Function: Healthcare, biotech, medical networks
Character: Academic/medical prestige, ethical anchor
Key Access:
- Hospital networks (Massachusetts General)
- Biotech and pharmaceutical companies
- Medical research institutions
- Healthcare policy circles
Role: The anchor and moral compass for the club

═══════════════════════════════════════════════════════════
MIAMI/FLORIDA HUB
═══════════════════════════════════════════════════════════
Leader: Cami (Cuban-American connections)
Function: Latin American ties, Caribbean networks
Character: Cuban fire, family gatherings, warmth
Key Access:
- Cuban-American business community
- Latin American social networks
- Miami real estate circles
- Hispanic Catholic community
Role: Cultural bridge and family warmth

═══════════════════════════════════════════════════════════
EUROPEAN CONNECTIONS
═══════════════════════════════════════════════════════════
Leader: Elena Barrett (through Vatican/Order ties)
Function: Vatican access, European nobility, international philanthropy
Character: Galas, Catholic orders, royal connections
Key Access:
- Vatican officials and ceremonies
- European Catholic nobility
- International charitable organizations
- Royal and aristocratic circles
Role: Bridge to Old World power and tradition`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Vanessa Caldwell', 'Charlotte Whitmore', 'Dr. Layla Hassan', 'Cami']),
      themes: JSON.stringify(['Geographic Hubs', 'Locations', 'Power Centers', 'Regional Influence'])
    },
    {
      title: "Wives Club: Rituals and Ceremonies",
      category: "Wives Club / Traditions",
      description: "All rituals, ceremonies, and traditions of the Wives Club",
      content: `WIVES CLUB RITUALS & CEREMONIES

═══════════════════════════════════════════════════════════
SUNDAY DINNERS
═══════════════════════════════════════════════════════════
Location: Colorado Compound (Addie & Hawk's ranch)
Frequency: Weekly
Rules:
- NO SCREENS at the table (Hawk's zero tolerance policy)
- Grace before every meal
- Everyone helps clean up
Purpose: Family connection, strategy discussions, community building
Atmosphere:
- Long farmhouse table with candles flickering
- Cast-iron pan of cornbread
- Mountain twilight pressing against windows
- Room glowing with firelight and children's laughter

═══════════════════════════════════════════════════════════
THE HOSPITAL VIGIL (Founding Moment)
═══════════════════════════════════════════════════════════
What happened: Elena, Addie, Grace spent the night during Elena's medical crisis
Significance: The seed from which the Wives Club grew
The bond: Hours of waiting, coffee runs, whispered fears
Aftermath: "Remember the hospital?" becomes shorthand for deepest trust
Legacy: New members learn this origin story as part of their introduction

═══════════════════════════════════════════════════════════
NEW MEMBER INTRODUCTION
═══════════════════════════════════════════════════════════
Location: Florida retreat or Colorado gathering
Process:
1. Harper or Elena makes formal introduction
2. New member meets the core circle
3. Red wine toast to welcome
4. Symbolic gift given (varies by sub-group)
5. First story shared - vulnerability as entry
Example: Harper introducing Isa and Cami at Florida retreat

═══════════════════════════════════════════════════════════
CRISIS STRATEGY NIGHTS
═══════════════════════════════════════════════════════════
When: Major scandals or threats to BSS/families
Where: Elena's living room or secure location
Protocol:
- Phones silenced and put away
- Nessa brings D.C./media intel
- Lila brings PR strategy
- Layla keeps ethics in focus
- Addie takes charge of action plan
- Elena delivers final wisdom
Rule: Secrets stay in the room
Outcome: Men wake up to situations already being managed

═══════════════════════════════════════════════════════════
THE STORYTELLING CIRCLE
═══════════════════════════════════════════════════════════
Led by: Tessa Loring (Sports Media Circle)
Purpose: Craft cover stories and narratives before public launches
When: Before major events, product launches, or crisis responses
Process: Each relevant member contributes perspective
Outcome: Unified narrative that protects the circle

═══════════════════════════════════════════════════════════
BABY SHOWER TRADITION
═══════════════════════════════════════════════════════════
Style: Overwhelmingly generous, full of advice and gifts
Roles:
- Kendra: Leads the charge, orchestrates the overload
- Addie: Grounds the overwhelmed mother-to-be
- Elena: Delivers wisdom ("Motherhood is imperfect but holy")
- Grace: Enthusiastic cheerleader
- Others: Pile on gifts, books, advice
Aftermath: Private moment where experienced mothers calm the new one

═══════════════════════════════════════════════════════════
FLORIDA RETREAT
═══════════════════════════════════════════════════════════
Location: Oceanfront villa
Purpose: Part social, part spiritual, part strategy
Atmosphere:
- Dining veranda lit with string lights
- Cuban music playing softly
- Long wooden table with tropical flowers, rosé, tapas
Events: New member introductions, strategy sessions, bonding

═══════════════════════════════════════════════════════════
RED WINE TOAST
═══════════════════════════════════════════════════════════
Used for: Welcoming new members, celebrating victories
Led by: Elena Duvall (Sports Media) "toasts away" scandals
Symbolism: Blood of sisterhood, shared commitment
Rule: What's toasted, stays toasted`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Kendra', 'Grace', 'Harper', 'Tessa Loring']),
      themes: JSON.stringify(['Rituals', 'Ceremonies', 'Traditions', 'Sunday Dinners'])
    },
    {
      title: "Wives Club: Symbols and Tokens",
      category: "Wives Club / Symbolism",
      description: "All symbols, tokens, and identifying marks of the Wives Club",
      content: `WIVES CLUB SYMBOLS & TOKENS

═══════════════════════════════════════════════════════════
GENERAL PHILOSOPHY
═══════════════════════════════════════════════════════════
The Wives Club has NO official logo or public marking.
"Secrecy is power" — recognition comes through relationships, not badges.
Symbols are personal, subtle, and meaningful only to those who know.

═══════════════════════════════════════════════════════════
LEADERSHIP SYMBOLS
═══════════════════════════════════════════════════════════

THE MATRIARCH (Elena Barrett)
Symbol: Silver bracelet
Meaning: Connection passed through founding
Worn: Always, as constant reminder of responsibility

THE FIXER (Addie)
Symbol: Elegant but practical watch
Meaning: Time is the fixer's currency
Character: Simple, functional, effective (like Addie herself)

THE FIREBRAND (Kendra)
Symbol: Statement earrings
Meaning: Always noticed, always commanding attention
Character: Bold, competitive, impossible to ignore

THE YOUNGER SISTER (Grace)
Symbol: Heart pendant (gift from Elena)
Meaning: Protected, loved, carrying the future
Character: Innocent, precious, cherished

═══════════════════════════════════════════════════════════
SUB-GROUP SYMBOLS
═══════════════════════════════════════════════════════════

SHIELDMAIDENS
Symbol: Shield pendant or pin
Meaning: Protection of family and mission
Given: Upon acceptance into the operator wife circle
Material: Usually silver, understated

THE OWLS
Symbol: Owl charm
Meaning: Wisdom through sisterhood (owls see in the dark)
Given: Often at sorority-connected gatherings
Character: Subtle, recognizable to sisters

THE VESTALS
Symbol: Flame pin
Meaning: Sacred fire of service (like ancient Vestals)
Given: Through Order ceremonies or Vatican events
Character: Elegant, often gold, discreet

═══════════════════════════════════════════════════════════
SPORTS MEDIA CIRCLE - INDIVIDUAL SYMBOLS
═══════════════════════════════════════════════════════════

VIVIAN "VIV" CARROWAY
Symbol: Silver dove pin
Title: "The Peacemaker"
Meaning: Smoothing introductions, keeping peace

ELENA DUVALL
Symbol: Red wine toast ritual
Role: "Toasting away" scandals at club dinners
Meaning: Transformation and release

SLOANE HARTWELL
Symbol: Coded ledger
Role: Keeper of the club's finance files
Meaning: Knowledge of who owns what, who's leveraged

MARISA CALDERON
Symbol: Rosary ring
Ritual: Kissed before each major decision
Meaning: Faith guiding choices

TESSA LORING
Symbol: The storytelling circle she leads
Role: Crafting narratives before launches
Meaning: Words as power

RAINA LOCKE "THE LEDGER"
Symbol: Black fountain pen
Given: Passed hand to hand at initiation
Meaning: Power over words and reputations
Role: Enforcer of silence

═══════════════════════════════════════════════════════════
COLORS
═══════════════════════════════════════════════════════════
No official club colors (secrecy again)
However, certain colors appear in sub-groups:
- Shieldmaidens: Silver (protection)
- Vestals: Gold (sacred service)
- Sports Media: Red wine (shared toasts)
- Owls: Neutral/earth tones (wisdom)

═══════════════════════════════════════════════════════════
RECOGNITION SIGNALS
═══════════════════════════════════════════════════════════
Members recognize each other through:
- Subtle jewelry (sub-group symbols)
- Code phrases ("Remember the hospital?")
- Mutual connections (introduction by existing member)
- Attendance at specific events (Sunday dinners, retreats)`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Kendra', 'Grace', 'Vivian Carroway', 'Elena Duvall', 'Sloane Hartwell', 'Marisa Calderon', 'Tessa Loring', 'Raina Locke']),
      themes: JSON.stringify(['Symbols', 'Tokens', 'Recognition', 'Secrecy'])
    }
  ];

  console.log("--- Adding Structure Storylines ---");
  for (const storyline of structureStorylines) {
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

  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });
  console.log(`\nTotal Storylines: ${storyCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
