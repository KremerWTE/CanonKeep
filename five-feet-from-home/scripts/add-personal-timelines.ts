import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING PERSONAL TIMELINES (REAL DATA ONLY) ===\n");

  // Personal timelines based ONLY on documented information
  const timelines = [
    // JASPER BARRETT TIMELINE
    {
      title: "Jasper Barrett: Early Life",
      category: "Personal Timeline",
      description: "Jasper's childhood and family background",
      content: `ORIGIN:
Born in Gastonia, North Carolina, just outside Charlotte.

FAMILY:
- Blue-collar family
- Father worked shifts in a textile plant until it closed
- Mother ran a small hair salon out of the house

EARLY WORK:
- Learned early how to hustle
- Mowed lawns, fixed bikes, took handyman jobs to help cover bills
- First in his family to go to college`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['Origins', 'Blue-Collar', 'Hard Work', 'Family'])
    },
    {
      title: "Jasper Barrett: Education",
      category: "Personal Timeline",
      description: "Jasper's academic journey",
      content: `HIGH SCHOOL:
- Star high school student with strong academics
- Varsity track and soccer captain

APPALACHIAN STATE:
- Studied Construction Management
- First in family to attend college

DUKE UNIVERSITY:
- Business Administration (Fuqua School of Business undergrad track)
- Concentration: Operations & Strategy
- Electives in negotiation, leadership psychology, and real estate finance
- Summer internships in Charlotte with construction firms
- Built formidable network of Duke alumni (later became clients/connections)

NOTE: Jasper never served in the military.`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['Education', 'Duke', 'Appalachian State', 'Self-Made'])
    },
    {
      title: "Jasper Barrett: Career Beginnings",
      category: "Personal Timeline",
      description: "Early career before BSS",
      content: `POST-GRADUATION:
- Moved to Charlotte to work as project coordinator at mid-tier construction/development firm
- Barely making ends meet
- Stuck under mediocre leadership
- Watched high-visibility projects go to better-connected PMs

MEETING ELENA:
- Met Elena during a mutual friend's weekend trip to D.C.
- She was already in real estate at the time
- Instantly drawn to her confidence

EARLY MARRIAGE:
- Married young
- Lived in small, drafty apartment
- Jasper took every overtime hour offered
- Elena closed mid-market real estate deals
- Late-night takeout dinners on the couch
- Dreaming about the "someday" lifestyle`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      themes: JSON.stringify(['Career', 'Struggle', 'Marriage', 'Partnership'])
    },
    {
      title: "Jasper Barrett: The Breakthrough",
      category: "Personal Timeline",
      description: "The Charlotte Hotel Project that changed everything",
      content: `THE CHARLOTTE HOTEL PROJECT (8 years before present):
- Dead-end firm brought in on floundering luxury hotel renovation
- Most PMs didn't want to touch it: political infighting, investor panic, massive delays
- Jasper volunteered, seeing it as his one shot

KEY CONNECTIONS MADE:
- Jessica (investor-side consultant) first noticed him here
- Harper saw him while shadowing her PE firm's senior partner

RESULT:
- Jasper pulled the project back from the brink
- Made himself indispensable
- This opened doors to everything that followed`,
      characters: JSON.stringify(['Jasper Barrett', 'Jessica', 'Harper']),
      themes: JSON.stringify(['Breakthrough', 'Risk', 'Opportunity', 'Hotel Project'])
    },
    {
      title: "Jasper Barrett: Victor Langford Era",
      category: "Personal Timeline",
      description: "Working under the private equity titan",
      content: `RECRUITED BY VICTOR LANGFORD:
After the hotel win, approached by Victor Langford — a legendary, ruthless Charlotte-based private equity magnate with holdings in real estate, hospitality, and logistics.

ROLE: Director of Special Projects
- Essentially Langford's personal fixer for deals, developments, and corporate fires

WHAT HE GAINED:
- Three high-value clients of his own (later became BSS's first contracts)
- Insider access to how big money works: private equity moves, political influence, backchannel deals
- Taste for operating at global level: travel to Europe, Asia, Middle East
- Rolodex of top-tier attorneys, ex-military specialists, and government insiders

DURATION: Three intense years under Langford`,
      characters: JSON.stringify(['Jasper Barrett', 'Victor Langford']),
      themes: JSON.stringify(['Private Equity', 'Mentorship', 'Global', 'Connections'])
    },
    {
      title: "Jasper Barrett: Founding BSS",
      category: "Personal Timeline",
      description: "Creating Barrett Strategic Solutions",
      content: `THE LAUNCH:
- Left Langford's firm with Jessica's encouragement
- Brought his three loyal clients with him

BUILDING THE TEAM:
- Recruited Ethan Cole (SF → NSA cyber ops)
- Recruited Ryan Maddox (SF → CIA HUMINT)
- Built elite crisis management team

REPUTATION:
- Quickly earned rep as the go-to guy for impossible problems
- Boutique corporate crisis management firm serving global clients`,
      characters: JSON.stringify(['Jasper Barrett', 'Jessica', 'Ethan Cole', 'Ryan Maddox']),
      themes: JSON.stringify(['Founding', 'BSS', 'Elite Team', 'Crisis Management'])
    },
    {
      title: "Jasper Barrett: Work-Life Transition",
      category: "Personal Timeline",
      description: "The journey from 90% work to balanced life",
      content: `PHASE 1 - WORK 90% / FAMILY 10%:
- Lives in airports and boardrooms
- Elena and kids see him at dinners and Sundays, but mentally elsewhere
- Hawk calls him out: "You're building an empire but missing the kingdom at home"

THE BREAKING POINT:
- Client dinner collides with daughter's school play
- Chooses work, watches recording later
- Elena tells him: "You'll build ten more companies. You only get one chance to be their father."

PHASE 2 - WORK 75% / FAMILY 25%:
- Delegates client-facing travel to Addie, Kendra, Bella
- Shifts to office war room role: strategy, oversight, mentorship
- Family dinners become sacred
- Weekend routines non-negotiable

GOAL - WORK 60% / FAMILY 40%:
- Struggles with identity tied to being "fixer's fixer"
- Starts mentoring younger fixers as succession strategy
- Anchors more at CLT office compound`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Hawk', 'Addie']),
      themes: JSON.stringify(['Balance', 'Family', 'Transition', 'Leadership'])
    },

    // ELENA BARRETT TIMELINE
    {
      title: "Elena Barrett: Background",
      category: "Personal Timeline",
      description: "Elena's origins and early career",
      content: `EARLY CAREER:
- Started her company in college
- Was in real estate when she met Jasper

APPEARANCE:
- Warm olive skin
- Dark brown hair, usually in loose knot or braid when working
- Eyes the color of strong tea
- Smile that doesn't arrive all at once

PERSONALITY:
- Quietly intelligent, keen observer
- Dry, understated humor
- Steady in a way that's earned, not innate
- Protective of family's center of gravity

CONFIDANTE:
- College roommate Marisol Vega (lifelong friend)
- High school guidance counselor
- They talk weekly`,
      characters: JSON.stringify(['Elena Barrett', 'Marisol Vega']),
      themes: JSON.stringify(['Origins', 'College', 'Personality', 'Friendship'])
    },
    {
      title: "Elena Barrett: CEO Transition",
      category: "Personal Timeline",
      description: "Elena's return to running Maision Aureulia",
      content: `ON PAUSE:
During Jasper's peak travel years, Elena pulled back from full CEO role to be stabilizer at home.
Still kept hand in Maision Aureulia, running select high-profile events.

THE SPARK RETURNS:
- Former client calls: "We only trust Elena"
- She runs a gala, the buzz is electric
- Jasper insists: "You've carried me long enough. Time to build your empire again."

RE-ENTRY AS CEO:
- Restructures Maision Aureulia as global event and lifestyle management firm
- Not just weddings or galas: cultural diplomacy dinners, Vatican-linked fundraisers, Fortune 100 CEO summits
- Trains protégés to run day-to-day while she curates vision

FULLY ACTIVATED:
- Jet-setting selectively: London, Rome, Dubai, NYC
- Coordinates with Jasper so only one parent away at a time
- Joint ventures with BSS: dinners where crises smoothed over socially

PARTNERSHIP MODEL:
- Jasper: Builder of legacies, strategist at HQ
- Elena: Face of elegance, architect of influence through events
- Together they host Palace of Honor-style galas`,
      characters: JSON.stringify(['Elena Barrett', 'Jasper Barrett']),
      themes: JSON.stringify(['CEO', 'Maision Aureulia', 'Events', 'Power Couple'])
    },

    // ADDIE & HAWK TIMELINE
    {
      title: "Addie: POH Role",
      category: "Personal Timeline",
      description: "Addie as Patroness of Honor",
      content: `ROLE:
- POH (Patroness of Honor)
- The "chaos coordinator" of the inner circle
- Runs strategic operations at the BSS compound

INNER CIRCLE CONNECTIONS:
- Elena Barrett
- Jasper Barrett
- Kendra
- Selene

Note: Specific details about Addie's college education, cam work past, and screen name to be added from source documents.`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['POH', 'Leadership', 'Inner Circle'])
    },
    {
      title: "Addie & Hawk: Family",
      category: "Personal Timeline",
      description: "Their children and family life",
      content: `THE TWINS:
Born after Addie stepped fully into POH role.

William "Will" Alexander Hawthorne:
- Oldest twin (by 6 minutes)
- Protective and observant
- Has Hawk's steady eyes and quiet intensity

Isabella "Izzy" Grace Hawthorne:
- Younger twin
- Bright, bold, adventurous
- Has Addie's spark
- Fearless around horses
- Name honors Bella and Grace

THE SURPRISE BABY:
Michael Gabriel "Mikey" Hawthorne:
- Born just over a year after the twins
- The peacemaker of the siblings
- Angelic calm
- Prefers "Gabe" as he gets older
- Named after Archangels Michael and Gabriel`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Will Hawthorne', 'Izzy Hawthorne', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Family', 'Children', 'Twins', 'Faith'])
    },
    {
      title: "Hawk: Stay-at-Home Dad Era",
      category: "Personal Timeline",
      description: "Hawk's transition from operator to family man",
      content: `THE TRANSITION:
After twins born, Hawk still deployed with BSS teams.
When Mikey came along, reality of three kids under three hit hard.
Addie deep in POH responsibilities, so Hawk stepped back from frontline operations.

STAY-AT-HOME GENERAL:
- Takes over day-to-day parenting
- Bottles at dawn, wrangling toddlers, managing chaos
- Wives' club teases him as "Commander of Chaos"
- Sets up household like military unit: duty rosters, gear inspections
- "Mini-rucks" where kids carry small backpacks on hikes

BOARDROOM WARRIOR:
- Joins BSS Board of Directors
- Leads foundation's security & resilience initiatives
- Advises on high-level projects with The Foundry and the Orders
- Quiet architect behind the scenes

MENTORSHIP:
- Younger operators stop by ranch for training
- Becomes unofficial father figure to them
- Channels warrior energy into husband, father, leader`,
      characters: JSON.stringify(['Hawk', 'Addie']),
      themes: JSON.stringify(['Fatherhood', 'Board', 'Mentorship', 'Transition'])
    },

    // HAWK'S REAL FAMILY
    {
      title: "Hawk: Family Background",
      category: "Personal Timeline",
      description: "Hawk's real family situation",
      content: `PARENTS:
- Both passed away

SISTER:
Sarah Hawthorne (married name varies)
- Lives in Dallas, Texas
- Has a husband and children
- Hawk's only remaining blood family

NOTE: Hawk has no parents, no brother. Only his sister Sarah and her family.`,
      characters: JSON.stringify(['Hawk', 'Sarah Hawthorne']),
      themes: JSON.stringify(['Family', 'Loss', 'Sister', 'Dallas'])
    }
  ];

  for (const timeline of timelines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: timeline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...timeline }
      });
      console.log(`Created: ${timeline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: timeline
      });
      console.log(`Updated: ${timeline.title}`);
    }
  }

  const count = await prisma.storyline.count();
  console.log(`\nTotal Storylines: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
