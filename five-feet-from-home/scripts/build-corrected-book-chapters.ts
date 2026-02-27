import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== BUILDING CORRECTED BOOK CHAPTERS FROM SOURCE DOCUMENTS ===\n");

  // ========== RENAME FAITH & FORTUNE ==========
  console.log("--- Renaming Faith & Fortune ---\n");

  const faithFortune = await prisma.bookSeries.findFirst({
    where: { name: 'Faith & Fortune', projectId: project.id }
  });

  if (faithFortune) {
    await prisma.bookSeries.update({
      where: { id: faithFortune.id },
      data: {
        name: 'Faith, Fitness and Fortune',
        premise: `Chris & Kendra Donnelly's journey - Faith, Fitness, and Fortune.

CORE THEMES:
- Faith: Their spiritual foundation and values (Kendra is Catholic)
- Fitness: Kendra's CrossFit Games career and athletic dominance
- Fortune: Chris's business success and their combined wealth

SERIES ARC:
The Donnelly power couple - how they met, built their empire, and maintained their bond through Kendra's athletic fame and Chris's business world. Kendra's boyfriend (later husband) gave her a promise ring after the CF Games.`
      }
    });
    console.log('Renamed: Faith & Fortune -> Faith, Fitness and Fortune');
  }

  // ========== FIVE FEET FROM HOME - MAIN SERIES ==========
  console.log("\n--- Building Five Feet From Home Main Series ---\n");

  const mainSeriesBooks = [
    {
      title: 'Five Feet From Home (Book 1)',
      synopsis: 'Jasper Barrett is at the top of his game - global clients, private jets, a multimillion-dollar lifestyle. But the grind has costs. Elena patience is thinning, Grace is growing up without him home.',
      chapters: [
        { num: 1, title: 'The Crisis Manager', summary: 'Jasper in his element - running BSS crisis ops, living in airports and boardrooms.' },
        { num: 2, title: 'Elena at Home', summary: 'Elena managing the household, stepping back from CEO role to stabilize home life.' },
        { num: 3, title: 'Grace Growing Up', summary: 'Grace preparing for school events her father keeps missing.' },
        { num: 4, title: 'The Missed Play', summary: 'Jasper chooses a client dinner over his daughter school play. Watches recording later, sees what he missed.' },
        { num: 5, title: 'Elena Calm Warning', summary: '"You will build ten more companies. You only get one chance to be their father."' },
        { num: 6, title: 'BSS Growing Pains', summary: 'The firm expanding - Charlotte, DC, London. Jasper stretched too thin.' },
        { num: 7, title: 'Addie Rising', summary: 'Addie starting to take more front-facing responsibility, allowing Jasper bandwidth.' },
        { num: 8, title: 'Five Feet Away', summary: 'The realization that home is only five feet from where he stands, but he is always facing the other direction.' }
      ]
    },
    {
      title: 'A Home Forged in Chaos (Book 2)',
      synopsis: 'Jasper begins his transition from Work 90%/Family 10% to Work 80%/Family 20%. Elena prepares to return to her empire.',
      chapters: [
        { num: 1, title: 'The First Shift', summary: 'Jasper moves meetings from evening dinners to lunchtime power sessions.' },
        { num: 2, title: 'Delegation Begins', summary: 'Delegating client-facing travel to Addie, Kendra, Bella, and regional BSS teams.' },
        { num: 3, title: 'War Room Role', summary: 'Jasper shifts into office war room role - strategy, oversight, mentorship.' },
        { num: 4, title: 'Elena Spark Returns', summary: 'A former client calls: "We only trust Elena." She runs a gala, the buzz is electric.' },
        { num: 5, title: 'Jasper Notices', summary: 'Jasper sees how alive Elena is in command. "You carried me long enough. Time to build your empire again."' },
        { num: 6, title: 'Maison Aurelia Restructure', summary: 'Elena restructures as global event and lifestyle management firm.' },
        { num: 7, title: 'New Rhythms', summary: 'Building family dinner rhythms, turning down lucrative but high-drama clients.' },
        { num: 8, title: 'Chaos to Order', summary: 'Home forged in chaos now finding its shape.' }
      ]
    },
    {
      title: 'The Phoenix Rising (Book 3)',
      synopsis: 'Jasper Work 75%/Family 25%. Elena back as CEO. The couple becomes a power partnership.',
      chapters: [
        { num: 1, title: 'Family Dinners Sacred', summary: 'Jasper builds rhythm: office hours structured, family dinners non-negotiable.' },
        { num: 2, title: 'Kids in His World', summary: 'Bringing kids into parts of his work - office visits, small trips. Showing them the "why."' },
        { num: 3, title: 'Elena CEO Mode', summary: 'Elena back jet-setting selectively - London, Rome, Dubai, NYC. One parent always home.' },
        { num: 4, title: 'Extension of Elena', summary: 'Elena packages her team as "extensions of Elena" - just like BSS builds fixers under Addie.' },
        { num: 5, title: 'Joint Ventures', summary: 'BSS and Maison Aurelia run joint ventures - dinners where crises are smoothed over socially.' },
        { num: 6, title: 'Weekend Routines', summary: 'Weekends non-negotiable. Jasper "offline" Saturdays unless national security–level crisis.' },
        { num: 7, title: 'Harper Rising', summary: 'Harper becomes Jasper top field presence, the new "him" for client-facing work.' },
        { num: 8, title: 'Power Couple Model', summary: 'Jasper as builder at HQ. Elena as face of elegance. Together hosting Palace of Honor–style galas.' }
      ]
    },
    {
      title: 'Redefining Legacy (Book 4)',
      synopsis: 'The Denver crisis. Addie leads. Jasper manages from CLT. Everyone transitions.',
      chapters: [
        { num: 1, title: 'Denver Crisis Erupts', summary: 'Major telecoms issue for the entire West. Addie deployed with Daniel.' },
        { num: 2, title: 'Addie in Command', summary: 'Jasper trusts Addie as lead. Only interferes to run blocking maneuvers.' },
        { num: 3, title: 'Daniel First Fire', summary: 'Daniel fresh from PhD in IR from Yale. Theory becomes reality.' },
        { num: 4, title: 'Month-Long Adventure', summary: 'Denver becomes month-long crisis. Addie split from CLT support.' },
        { num: 5, title: 'CF Games Finals', summary: 'Kendra determined to stay home for Elena prep and CF Games Finals. Places.' },
        { num: 6, title: 'The Promise Ring', summary: 'After Games, Kendra boyfriend surprises with promise ring - not engagement, next step.' },
        { num: 7, title: 'Harper Proposed To', summary: 'Harper boyfriend proposes. But she steps UP not back - becomes Jasper top field presence.' },
        { num: 8, title: 'Elena Thrives', summary: 'Elena goes back to work and thrives as CEO of Maison Aurelia.' },
        { num: 9, title: 'Addie Volunteers Away', summary: 'After Denver, Addie volunteers to be on road - avoiding Kendra/boyfriend situation.' },
        { num: 10, title: 'Daniel Groomed', summary: 'Addie groomed Daniel as great #4 in company, trusted fixer. Not dating him despite assumptions.' },
        { num: 11, title: 'Jasper New Balance', summary: 'Jasper home more - still 18-hour days but 9-5 office, then work from home. Day trips only.' },
        { num: 12, title: 'Legacy Redefined', summary: 'Everyone has transitioned. The legacy continues in new forms.' }
      ]
    }
  ];

  const mainSeries = await prisma.bookSeries.findFirst({
    where: { name: 'Five Feet From Home', projectId: project.id }
  });

  if (mainSeries) {
    await prisma.bookSeries.update({
      where: { id: mainSeries.id },
      data: {
        totalBooks: 4,
        books: JSON.stringify(mainSeriesBooks),
        premise: `Jasper Barrett's journey from Work 90%/Family 10% to Work 75%/Family 25%.

The main series follows Jasper Barrett, founder of Barrett Strategic Solutions, as he learns to balance his crisis management empire with being present for his family.

KEY THEMES:
- Work-life balance at the highest levels
- Elena's return to CEO role at Maison Aurelia
- The evolution of BSS leadership
- Harper becoming Jasper's field heir
- Addie's rise as senior fixer
- The Denver Crisis (Book 4) as turning point

JASPER'S BACKGROUND:
- Blue-collar family from Gastonia, NC
- Duke University for Business
- First job at mid-tier construction firm
- Charlotte Hotel Project breakthrough
- Founded BSS with Jessica's help and Harper's connections

THE MARRIAGE:
- Married Elena young, lived in small drafty apartment
- She supported him through the grind years
- Now a power couple model: Jasper as strategist at HQ, Elena as face of elegance`
      }
    });
    console.log('Updated: Five Feet From Home (4 books with corrected timeline)');
  }

  // ========== ADDIE POWER DYNAMICS STORYLINES ==========
  console.log("\n--- Creating Addie Power Dynamics Storylines ---\n");

  const addieStorylines = [
    {
      title: 'Addie: The Chaos Coordinator',
      category: 'Character Arc',
      description: 'Addie first to blur all lines at BSS - intimacy with Jasper, Elena, Kendra, and Selene',
      content: `ADDIE AS THE CHAOS COORDINATOR

Addie is the first at BSS to truly blur professional and personal lines, making her both the chaos coordinator and the secret heart of the inner circle.

INTIMATE CONNECTIONS:
- Jasper (boss/employee): Classic blurred line in high-pressure environments
- Elena: Inner circle, mentor, sisterhood pushed to the extreme
- Kendra (subordinate): Complex - consensual trust-building, not favoritism
- Selene: Wild card, destabilizer, adds another dimension

WHY IT WORKS (BSS CIA-STYLE CONTEXT):
BSS is not a conventional office - it's closer to CIA/MI6/paramilitary "family business." In high-risk units, people date and marry inside the "family" because outsiders can't understand the pressure. "Date within the agency" is survival strategy.

KEPT QUIET AND CONTROLLED:
Addie is first to really do this and be the chaos coordinator, but it is kept quiet and controlled. No major hurt feelings other than Addie when Kendra got serious with her boyfriend.

WHAT IT SAYS ABOUT ADDIE:
- Sexual fluidity & openness
- Power navigation: Comfortable crossing dangerous boundaries
- Risk-taker: Believes she can manage consequences
- Pack-bond instinct: Sex is also alliance-building

THE ONLY HURT:
When Kendra got the promise ring from her boyfriend, Addie volunteered to be on the road because she didn't want to deal with it. She thinks Kendra's boyfriend is great and the right one - but it still hurts.`,
      characters: JSON.stringify(['Addison "Addie"', 'Kendra Vos', 'Elena Barrett', 'Jasper Barrett', 'Selene Thorne'])
    },
    {
      title: 'Addie and Kendra: Sisterhood, Intimacy, and Sparks',
      category: 'Relationship',
      description: 'The complicated relationship between Addie and Kendra - chosen sisterhood with unresolved sparks',
      content: `ADDIE AND KENDRA - THE COMPLICATED BOND

Their relationship defies simple categorization: chosen sisterhood, past intimacy, and unresolved sparks that make everything complicated.

THE HISTORY:
- Addie and Kendra had a fling/intimate relationship
- They chose to remain "sisters" professionally
- The sparks never fully went away

THE CONFLICT:
When Kendra got serious with her boyfriend and received the promise ring, Addie struggled:
- She thinks Kendra's boyfriend is "great and the right one"
- But she couldn't deal with the emotional weight
- She volunteered to stay on the road to avoid the situation

AFTER DENVER CRISIS:
Everyone assumed Addie would be dating Daniel after their month-long Denver adventure. Instead, Addie decided she needed "a different type" and groomed Daniel to be #4 in the company.

She suggested Kendra work with Daniel or Harper as an analyst - partly professional mentorship, partly distance.

THE SISTERHOOD CONTINUES:
Despite the complications, they maintain their chosen sisterhood. The intimacy is past, but the sparks remain unspoken.`,
      characters: JSON.stringify(['Addison "Addie"', 'Kendra Vos', 'Daniel Cruz'])
    }
  ];

  for (const storyline of addieStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({ data: { projectId: project.id, ...storyline } });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({ where: { id: existing.id }, data: storyline });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  // ========== HARPER COO SERIES WITH CORRECTED TIMELINE ==========
  console.log("\n--- Updating Harper Miami Heat with Correct Timeline ---\n");

  const harperBooks = [
    {
      title: 'Book 1: The Shadow Partner',
      synopsis: 'Harper is Jasper quiet co-strategist from Miami - the one who reads people before they walk in the room.',
      chapters: [
        { num: 1, title: 'Miami Operations', summary: 'Harper working out of Miami as fixer in the shadows.' },
        { num: 2, title: 'Setting Up Deals', summary: 'Setting up deals and smoothing problems when Jasper moves too fast.' },
        { num: 3, title: 'Bonnie and Clyde', summary: 'Their dynamic: he drives the vision, she makes sure it doesn crash.' },
        { num: 4, title: 'The Crack Spotted', summary: 'Harper spots a crack in a deal Jasper is celebrating, pulls him aside.' },
        { num: 5, title: 'The Implosion', summary: 'Six months later, the deal implodes exactly as she predicted. BSS pivots because she saw it coming.' },
        { num: 6, title: 'Earning Trust', summary: 'Harper proves her value beyond fixing - she is strategic foresight.' },
        { num: 7, title: 'The Partner Title', summary: 'No longer just fixer but recognized as Jasper partner-in-crime.' },
        { num: 8, title: 'Miami Hub Established', summary: 'Her Miami hub becoming the second HQ.' }
      ]
    },
    {
      title: 'Book 2: COO by Design',
      synopsis: 'Jasper expands BSS into multiple cities. Harper formalizes the chaos.',
      chapters: [
        { num: 1, title: 'Multiple Cities', summary: 'BSS expanding to Charlotte, DC, London. Harper formalizes the chaos.' },
        { num: 2, title: 'The Playbooks', summary: 'Writing playbooks for operations so even when Jasper improvises, there is a spine.' },
        { num: 3, title: 'Finance and Structure', summary: 'Miami hub becomes where finance, HR, compliance, and structure flow from.' },
        { num: 4, title: 'Still Dangerous', summary: 'Not a paper-pusher COO - she can call every team lead directly.' },
        { num: 5, title: 'Knowing Everything', summary: 'Knows their weaknesses, marriages, addictions, and blind spots.' },
        { num: 6, title: 'Victory/Failure Board', summary: 'Color-coded dossiers of every case, every team, and where the next fire will ignite.' },
        { num: 7, title: 'The Transition', summary: 'Shifting from "Jasper fixer" to "BSS COO."' },
        { num: 8, title: 'The Marriage', summary: 'Marries a Miami-based businessman strong enough to hold his own in her orbit.' }
      ]
    },
    {
      title: 'Book 3: The Proposal',
      synopsis: 'Harper boyfriend proposes. But instead of stepping back, she steps UP.',
      chapters: [
        { num: 1, title: 'The Boyfriend', summary: 'Her relationship with the Miami businessman.' },
        { num: 2, title: 'The Proposal Comes', summary: 'He proposes, expecting her to slow down.' },
        { num: 3, title: 'Stepping Up Not Back', summary: 'Harper becomes Jasper top field presence - like he used to be.' },
        { num: 4, title: 'His Reaction', summary: 'He understands. Their relationship evolves.' },
        { num: 5, title: 'Field Presence', summary: 'Taking over the client-facing role Jasper is stepping back from.' },
        { num: 6, title: 'Sanctuary Home', summary: 'Their Miami home becomes sanctuary: sleek, ocean-facing, filled with art and order.' },
        { num: 7, title: 'The Balance', summary: 'He lets her roam, but also gives her grounding life outside BSS adrenaline.' },
        { num: 8, title: 'One Week a Month', summary: 'She carves out one week a month just for him. Jasper jokes he "stole Harper three days a month."' }
      ]
    },
    {
      title: 'Book 4: The Overseer',
      synopsis: 'Harper rarely shows up on missions - yet everyone feels her presence.',
      chapters: [
        { num: 1, title: 'Oracle Sight', summary: 'The younger BSS members whisper Harper has "Oracle sight" - sees outcomes before they happen.' },
        { num: 2, title: 'Three-Word Notes', summary: 'Texts case leads mid-mission with three-word notes that save ops. "Check gate logs." "Call Sasha." "He will fold."' },
        { num: 3, title: 'Recovery Plans Ready', summary: 'When losses hit, she already has recovery plan drafted. When wins come, she already knows next step.' },
        { num: 4, title: 'Jasper as Face', summary: 'Jasper becomes charismatic face, Harper the cold brain. Together unstoppable.' },
        { num: 5, title: 'Parallel Travel', summary: 'When Jasper checks on teams in London, LA, Middle East, Harper travels in parallel.' },
        { num: 6, title: 'Quiet Dinners', summary: 'Hosting "quiet dinners" where she tests loyalty, finds cracks, rebuilds confidence.' },
        { num: 7, title: 'The Warning', summary: 'BSS team learns: if Harper shows up in your city, either you are being promoted, fixed - or replaced.' },
        { num: 8, title: 'The Overseer Complete', summary: 'Harper is less COO, more architect of BSS long-term survival. The quiet matriarch.' }
      ]
    },
    {
      title: 'Book 5: Legacy Builder',
      synopsis: 'Harper begins grooming her own replacements.',
      chapters: [
        { num: 1, title: 'Teaching the Next', summary: 'Grooming Bella, Kendra, and Selene to read operations at scale.' },
        { num: 2, title: 'The Harper Index', summary: 'A private ledger scoring BSS members on performance, resilience, loyalty, and survivability.' },
        { num: 3, title: 'Jasper Still Leads', summary: 'When crises explode, Jasper still leads from front - but Harper already wrote the script.' },
        { num: 4, title: 'Marriage Remains Strong', summary: 'She keeps BSS from ever consuming all of her.' },
        { num: 5, title: 'Bella Rising', summary: 'Training Bella in accounts and oversight.' },
        { num: 6, title: 'Kendra Rising', summary: 'Training Kendra in analytics and field work.' },
        { num: 7, title: 'Selene Rising', summary: 'Training Selene in... Selene things. The wild card.' },
        { num: 8, title: 'Legacy Secured', summary: 'By the end, Harper is the architect of BSS long-term survival. Quiet matriarch with succession plan.' }
      ]
    },
    {
      title: 'Book 6: Mrs. Vance',
      synopsis: 'The culmination of Harper journey - wife, COO, legacy builder.',
      chapters: [
        { num: 1, title: 'The Wedding', summary: 'Finally celebrating their marriage properly.' },
        { num: 2, title: 'New Rhythm Established', summary: 'Their partnership as married couple fully integrated with her COO role.' },
        { num: 3, title: 'BSS Next Generation', summary: 'The succession plan in full effect.' },
        { num: 4, title: 'Jasper Gratitude', summary: 'Jasper acknowledging all she has built.' },
        { num: 5, title: 'The Next Crisis', summary: 'A crisis comes. Harper handles it from her living room.' },
        { num: 6, title: 'Husband Understanding', summary: 'He brings her coffee during the crisis call. Perfect partnership.' },
        { num: 7, title: 'Mrs. Vance Complete', summary: 'Harper fully realized as wife, COO, and matriarch.' },
        { num: 8, title: 'The View Forward', summary: 'Looking at what comes next - BSS thriving, marriage strong, legacy secured.' }
      ]
    }
  ];

  const harperSeries = await prisma.bookSeries.findFirst({
    where: { name: 'Miami Heat', projectId: project.id }
  });

  if (harperSeries) {
    await prisma.bookSeries.update({
      where: { id: harperSeries.id },
      data: {
        books: JSON.stringify(harperBooks),
        premise: `Harper's journey from Jasper's shadow partner to COO of BSS.

HARPER'S EVOLUTION:
- Starts as Jasper's quiet co-strategist from Miami
- The one who reads people before they walk in the room
- Becomes COO by Design - formalizing the chaos
- Boyfriend proposes but she steps UP not back
- Becomes Jasper's top field presence "like he used to be"
- Marries Miami businessman, ocean-facing sanctuary home
- Becomes "The Overseer" with "Oracle sight"
- Creates "The Harper Index" - scoring BSS members
- Grooms successors: Bella, Kendra, Selene
- Legacy builder, quiet matriarch

THE MARRIAGE:
- Marries Miami-based businessman (logistics/shipping)
- He's strong enough to hold his own in her orbit
- Their home is sanctuary: sleek, ocean-facing, filled with art
- One week a month just for him
- Jasper respects their marriage deeply`
      }
    });
    console.log('Updated: Miami Heat (Harper series with correct timeline)');
  }

  // ========== EVIE & SOFIA STORYLINES ==========
  console.log("\n--- Creating Evie & Sofia Storylines ---\n");

  const eveSofiaStorylines = [
    {
      title: 'Evie & Sofia: 25 Friend Dates',
      category: 'Relationship Development',
      description: 'The foundation of their relationship through casual, meaningful, and intimate friend dates',
      content: `EVIE & SOFIA - 25 FRIEND DATES

Stage 1: Casual & Fun (1–8)
1. Coffee at an artsy café after yoga
2. Shopping for gala dresses together
3. Movie night at Sofia's loft — wine, snacks, trashy rom-coms
4. Foundation board meeting turns into late lunch
5. Rooftop bar for cocktails, laughing over dating horror stories
6. Charity spin class, sweating and teasing each other
7. Fashion show as each other's "plus one"
8. Brunch after church — Sofia's favorite spot

Stage 2: Shared Experiences (9–16)
9. Weekend farmers' market, pastries and flowers
10. Art museum afternoon, Sofia teasing Evie about portraits
11. Horseback riding at ranch getaway
12. Winery day trip, tasting until tipsy
13. Friend's birthday party as "wingwomen"
14. Hiking mountain trail — sweaty selfies and genuine talks
15. Cooking night at Evie's — one bottle of wine turns into two
16. Pool day at hotel cabana

Stage 3: Emotional Intimacy (17–22)
17. Spa day — facials, massages, quiet relaxation
18. Driving to beach for sunset, talking about dreams
19. Gala where Evie is Sofia's official "plus one"
20. Late-night ice cream run in pajamas
21. Private dinner at Sofia's loft with candles
22. Long road trip to weekend charity event

Stage 4: Crossing the Line (23–25)
23. Weekend getaway at ski lodge — sharing a room, too much champagne
24. Crazy night dancing at a club, stumbling home together
25. "Foundation retreat" — sneak away, swim under the stars, hold each other too long`,
      characters: JSON.stringify(['Evie Maren', 'Sofia Reyes'])
    },
    {
      title: 'Evie & Sofia: 8 Late Night Work Sessions',
      category: 'Relationship Development',
      description: 'Professional collaboration deepening into personal connection, culminating in the Foundation Gala idea',
      content: `EVIE & SOFIA - 8 LATE NIGHT WORK SESSIONS

1. First Work Night
Location: Sofia's sleek office, city skyline glowing
- Order takeout, scatter papers
- Evie jokes about Sofia's "organized chaos"
- Small talk turns to personal stories

2. Shared Planning
- Working on foundation logistics
- Evie admits she always over-prepares
- Sofia admits she thrives under pressure

3. The Long Night
- Working past midnight
- Ordering second round of coffee
- Laughter breaking the tension

4. Foundation Vision
- Big dreams for what they could build
- Sofia sees Evie's passion clearly
- Connection deepening

5. The Breakthrough
- Solving a major funding problem together
- High-fives and celebration
- Staying later than necessary

6. Personal Shares
- Work turns to life stories
- Vulnerabilities shared
- Trust building

7. Almost Done
- The project nearing completion
- Reluctant to finish
- Finding excuses to keep working

8. The Foundation Gala Idea
- The final session where they create it
- A gala to showcase the kids
- Strong & Savory Foundation celebration
- This becomes their shared legacy project`,
      characters: JSON.stringify(['Evie Maren', 'Sofia Reyes'])
    }
  ];

  for (const storyline of eveSofiaStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({ data: { projectId: project.id, ...storyline } });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({ where: { id: existing.id }, data: storyline });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  // ========== ADDIE AND HAWK - FAITH JOURNEY ==========
  console.log("\n--- Creating Addie & Hawk Faith Journey ---\n");

  const faithStoryline = {
    title: 'Addie and Hawk Become Catholic',
    category: 'Faith Journey',
    description: 'Addie and Hawk convert to Catholicism to be Grace godparents and Confirmation sponsor',
    content: `ADDIE AND HAWK BECOME CATHOLIC

THE CATALYST:
Grace is preparing for her Confirmation, and she asks Addie and Hawk to be not just godparents in spirit, but formally in the Church. To do that, they must both be baptized and received into full communion with the Catholic faith.

THE DECISION:
Addie and Hawk have always orbited faith through:
- Wives Club traditions
- Galas with Catholic Orders
- Quiet prayers before major missions

Grace's request is the moment of clarity — they don't want to just "be around" faith, they want to belong for her sake.

THE JOURNEY - RCIA:
- They start Rite of Christian Initiation for Adults
- Addie throws herself into reading, history, and ritual
- Her "POH library" gets stocked with early Church Fathers and rare Catholic texts
- Hawk takes quieter approach, sitting in back of class at first
- He slowly begins to find peace in the prayers
- He relates to the structure and discipline

THE SPONSORS:
Likely Elena and Jasper, or Bella and Matt — walking with them through the process, creating a spiritual family bond.

THE SACRAMENTS:
At the Easter Vigil Mass, both Addie and Hawk are baptized (or confirmed and received if baptized elsewhere). Grace is in the front pew, beaming, because her "real" godparents now officially belong.

CONFIRMATION:
When it's Grace's turn, she asks Addie to be her sponsor. Addie is floored, taking it as one of the greatest honors of her life. Hawk serves as quiet strength beside them.

POH INTEGRATION:
Addie weaves her new faith into Wives Club traditions — not preachy, but as grounding presence. Her "Silver Room" of gifts now has:
- Grace's baptismal candle
- Rosaries from her godparents
- Rare signed Catholic books

RIPPLE EFFECT:
Their conversion becomes touchpoint for the rest of the group — an anchor tradition for baptisms, confirmations, weddings. Even Selene, who isn't "into kids," is moved by how real and intentional Addie and Hawk made their faith for Grace.`,
    characters: JSON.stringify(['Addison "Addie"', 'Hawk', 'Grace Barrett', 'Elena Barrett', 'Jasper Barrett'])
  };

  const existingFaith = await prisma.storyline.findFirst({
    where: { title: faithStoryline.title, projectId: project.id }
  });

  if (!existingFaith) {
    await prisma.storyline.create({ data: { projectId: project.id, ...faithStoryline } });
    console.log('Created: Addie and Hawk Faith Journey');
  } else {
    await prisma.storyline.update({ where: { id: existingFaith.id }, data: faithStoryline });
    console.log('Updated: Addie and Hawk Faith Journey');
  }

  // Final counts
  const seriesCount = await prisma.bookSeries.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== COMPLETE ===`);
  console.log(`Total book series: ${seriesCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
