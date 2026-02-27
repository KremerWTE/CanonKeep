import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding Full BSS Structure ===\n");

  // ============ BSS FAILED RECRUITS ============
  console.log("--- Adding BSS Failed Recruits ---\n");

  const failedRecruits = [
    {
      name: "Derek Vaughn",
      firstName: "Derek",
      lastName: "Vaughn",
      archetype: "The Decorated Officer Who Crumbles",
      background: `Former Ranger Battalion officer with multiple deployments, Ivy MBA.
On paper, a dream hire - rare blend of combat and business pedigree.

FAILURE: Struggled with pace and ambiguity at BSS. Froze in first solo crisis brief with a Fortune 50 CEO. Mishandled a client leak, made situation worse.

OUTCOME: Quietly pushed out after less than a year. His failure highlights how Addie and Kendra thrived where "perfect résumés" couldn't.`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Sophia Klein",
      firstName: "Sophia",
      lastName: "Klein",
      archetype: "The Analyst Who Breaks",
      background: `PhD in international relations, fluent in 4 languages, ex-State Department rising star.
Recruited as high-level geopolitical analyst for BSS.

FAILURE: Brilliant with data, but emotionally fragile. Sent to Europe with Kendra for high-pressure client rescue - panicked under interrogation from hostile press and leaked confidential strategy.

OUTCOME: Left in disgrace; retreated into academia. Her flameout is an internal cautionary tale Addie references when mentoring new analysts.`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Ethan Cho",
      firstName: "Ethan",
      lastName: "Cho",
      archetype: "The Hacker Who Can't Play Team",
      background: `Former NSA cyber specialist, recruited to lead BSS's technical operations.

FAILURE: Incredibly gifted, but arrogant. Undermined Addie early in her rise, assuming she was just a "secretary-turned-analyst." In a live crisis, went solo with risky cyber strike that backfired, nearly costing a billion-dollar client.

OUTCOME: Fired after Addie stepped in to salvage the situation. His downfall became part of Addie's transformation into "the IT girl."`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Julian Mercer",
      firstName: "Julian",
      lastName: "Mercer",
      archetype: "The Ivy League Wunderkind",
      background: `Harvard Kennedy School, Rhodes Scholar, policy wunderkind in D.C.

FAILURE: Strategic thinking brilliant in abstract but paralyzed by speed. Wanted weeks of prep; BSS lives on hours. First boardroom crisis, he hesitated waiting for "the right data" while Addie improvised and saved the client.

OUTCOME: Eased into consulting job elsewhere. Quiet embarrassment for Jasper, who had personally recruited him.`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Amira D'Souza",
      firstName: "Amira",
      lastName: "D'Souza",
      archetype: "The Tier-1 Burnout",
      background: `Former Navy SEAL officer (rare female pipeline graduate), multiple combat tours, revered in special operations circles.

FAILURE: Incredible presence and toughness, but couldn't adjust to political/boardroom fight club. Treated CEOs like lieutenants, offended clients. Temper blew in a high-stakes London negotiation.

OUTCOME: One of the fastest flameouts in BSS history. Addie later mused: "She could survive Ramadi, but not a cocktail party."`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Lukas Reinhardt",
      firstName: "Lukas",
      lastName: "Reinhardt",
      archetype: "The PhD Ghost",
      background: `German national, Cambridge PhD in behavioral economics, recruited for cutting-edge crisis modeling.

FAILURE: Lived entirely in models and theory. Simulations fell apart when clients changed course mid-crisis. Got caught "scripting" outcomes while Addie adapted live.

OUTCOME: Returned to academia. Harper uses his story to remind recruits: "We solve people, not math."`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Maya Cortez",
      firstName: "Maya",
      lastName: "Cortez",
      archetype: "The Reluctant Prodigy",
      background: `First-gen college grad, discovered as brilliant researcher by Harper while temping at BSS.

FAILURE: Harper saw Addie 2.0 in her, but Maya didn't want to give her soul to the job. Clocked out at 5 p.m., refused weekend calls.

OUTCOME: Left on good terms, became a teacher. Addie remembers her as "the one who could've been."`,
      bssRole: "BSS - Departed (9-to-5)"
    },
    {
      name: "Sean Taylor",
      firstName: "Sean",
      lastName: "Taylor",
      nickname: "Skip",
      archetype: "The Happy-Go-Lucky Vet",
      background: `Former Army Intel NCO, sharp instincts, good humor. Jasper thought he could be molded.

FAILURE: Reliable but never developed killer edge. In crisis rooms, cracked jokes instead of owning silence. Clients didn't take him seriously.

OUTCOME: Gently rotated out. Found happy career in mid-tier corporate security.`,
      bssRole: "BSS - Departed (9-to-5)"
    },
    {
      name: "Caroline Wu",
      firstName: "Caroline",
      lastName: "Wu",
      archetype: "The Planner Who Won't Pivot",
      background: `Stanford undergrad, Duke MBA, meticulous project manager type.

FAILURE: Obsessed with order and schedules, couldn't adapt to chaos BSS thrives on. During one international crisis, froze when every plan unraveled.

OUTCOME: Quietly phased into administrative support. Addie ended up replacing her directly on a big client.`,
      bssRole: "BSS - Failed Recruit"
    },
    {
      name: "Darius Knox",
      firstName: "Darius",
      lastName: "Knox",
      archetype: "The 9-to-5 Guy",
      background: `Ex-corporate lawyer, Georgetown, razor-sharp but checked out from grind culture.

FAILURE: Openly told Kendra he only wanted steady paycheck and no late nights. In BSS's world, that's career suicide.

OUTCOME: Quit before they could fire him. Addie and Kendra later laugh about him as "the intern who tried to unionize us."`,
      bssRole: "BSS - Departed (9-to-5)"
    }
  ];

  for (const recruit of failedRecruits) {
    const existing = await prisma.character.findFirst({
      where: { name: recruit.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...recruit }
      });
      console.log(`Created: ${recruit.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: recruit
      });
      console.log(`Updated: ${recruit.name}`);
    }
  }

  // ============ BSS LABS ============
  console.log("\n--- Adding BSS Labs ---\n");

  const bssLabs = [
    {
      name: "BSS New York Lab",
      type: "Regional Operations Hub",
      industry: "Finance / Corporate / Wall Street",
      headquarters: "Brooklyn brownstone",
      description: `NEW YORK LAB

LOCATION: Old Brooklyn brownstone with boarded-up storefront
SPECIALIZATION: Finance, hedge funds, corporate battles, Wall Street

FACILITIES:
- Boxing ring in the basement (sparring + teaching clients "discipline under fire")
- Dojo in basement, roof wired for surveillance
- Living quarters upstairs for rotating staff

TRAINING FOCUS: Boxing, corporate combat readiness`,
      significance: "Finance and corporate crisis hub"
    },
    {
      name: "BSS DC Lab",
      type: "Regional Operations Hub",
      industry: "Politics / Government / Lobbying",
      headquarters: "Run-down rowhouse near Capitol Hill",
      description: `DC LAB

LOCATION: Run-down rowhouse near Capitol Hill - looks abandoned
SPECIALIZATION: Politics, lobbying, federal-level maneuvering

FACILITIES:
- Wired with comms, maps of political networks
- Small basement gym
- Wrestling mats and small tactical shoot house in old garage

TRAINING FOCUS: Wrestling, tactical scenarios`,
      significance: "Political and government operations hub"
    },
    {
      name: "BSS London Lab",
      type: "Regional Operations Hub",
      industry: "EU Finance / Aristocracy / Intelligence",
      headquarters: "Old East End warehouse",
      description: `LONDON LAB

LOCATION: Old East End warehouse - exposed brick, iron beams
SPECIALIZATION: EU finance, legacy aristocracy networks, MI5/MI6 crossover

FACILITIES:
- Sparring mats on main floor
- Analyst desks on mezzanine
- Outdoor courtyard converted to hybrid strongman/obstacle course

TRAINING FOCUS: Strongman, obstacle course training`,
      significance: "European operations and intelligence crossover"
    },
    {
      name: "BSS LA Lab",
      type: "Regional Operations Hub",
      industry: "Media / Hollywood / Tech",
      headquarters: "Old Spanish-style house in Echo Park",
      description: `LA LAB

LOCATION: Old Spanish-style house in Echo Park - looks like a party house
SPECIALIZATION: Media, Hollywood, Silicon Valley, venture capital

FACILITIES:
- Minimalist and functional inside
- Rotating cast of operators
- Pool and outdoor space for surf training, swimming, water rescue drills

TRAINING FOCUS: Swimming, surf training, water rescue`,
      significance: "Media and tech crisis management"
    },
    {
      name: "BSS Asia Lab",
      type: "Regional Operations Hub",
      industry: "Trade / Sovereign Wealth / Great Power",
      headquarters: "Decayed colonial shophouse (Singapore/HK)",
      description: `ASIA LAB (Singapore/Hong Kong)

LOCATION: Decayed colonial shophouse blending with crumbling facades
SPECIALIZATION: Trade, sovereign wealth funds, great-power competition

FACILITIES:
- Tech-heavy, sleek interior
- Bunk-style living quarters
- Rooftop for martial arts sparring (Muay Thai, Kali, Krav Maga) with city skyline

TRAINING FOCUS: Muay Thai, Kali, Krav Maga`,
      significance: "Asia-Pacific operations hub"
    },
    {
      name: "BSS Middle East Lab",
      type: "Regional Operations Hub",
      industry: "Energy / Sovereign Funds / Tribal Politics",
      headquarters: "Weathered villa (Dubai/Doha)",
      description: `MIDDLE EAST LAB (Dubai/Doha)

LOCATION: Weathered villa on edge of old city
SPECIALIZATION: Energy, sovereign funds, tribal/political alliances

FACILITIES:
- Cool, fortified interior
- Stocked for longer stays
- Sand pit for desert rucking and conditioning
- Small indoor climbing wall for load/tactical drills

TRAINING FOCUS: Desert rucking, climbing, tactical conditioning`,
      significance: "Middle East and energy sector operations"
    }
  ];

  for (const lab of bssLabs) {
    const existing = await prisma.organization.findFirst({
      where: { name: lab.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({
        data: { projectId: project.id, ...lab }
      });
      console.log(`Created: ${lab.name}`);
    } else {
      await prisma.organization.update({
        where: { id: existing.id },
        data: lab
      });
      console.log(`Updated: ${lab.name}`);
    }
  }

  // ============ BSS GROWTH STORYLINES ============
  console.log("\n--- Adding BSS Growth Storylines ---\n");

  const bssStorylines = [
    {
      title: "BSS Genesis - The First Two Clients",
      category: "BSS / Origin Story",
      description: "How Jasper and Harper started BSS from a garage with two clients",
      content: `BSS GENESIS - YEAR 0-1

THE SPARK:
Jasper (transitioning from operational focus) and Harper (strategic mastermind) notice a gap: high-net-worth individuals need discrete crisis response far beyond traditional firms.

FIRST TWO CLIENTS:
1. Private Equity Fund - needed discreet asset recovery in Eastern Europe
2. Middle Eastern Royal Household - confidential family security incident

THE FIRST COMMAND POST:
- Converted garage
- Secure comms setup
- Whiteboards covered in maps
- Cots shoved in corners

BSS wasn't a company yet — just two people answering impossible calls.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper']),
      themes: JSON.stringify(['BSS', 'Origin', 'Foundation'])
    },
    {
      title: "BSS - The Ransomware Case",
      category: "BSS / Crisis",
      description: "BSS's first major test - multinational healthcare cyberattack",
      content: `THE RANSOMWARE CASE - YEAR 2

THE CRISIS:
A multinational healthcare corporation crippled by hostile-state cyberattack.

THE RESPONSE:
Harper builds the first cyber unit overnight, pulling in specialists.
BSS coordinates response team: cyber experts, negotiators, former Tier 1 operators.

THE RESULT:
Not only negotiate with attackers but harden client's infrastructure.
Earns credibility in boardrooms across industries.

This case established BSS as more than security - they became problem solvers.`,
      characters: JSON.stringify(['Harper', 'Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Cyber', 'Healthcare'])
    },
    {
      title: "BSS Signature Wins",
      category: "BSS / Crisis",
      description: "The operations that built BSS's legendary reputation",
      content: `BSS SIGNATURE WINS - YEAR 3-5

MEDICAL RESCUE:
High-profile recovery of kidnapped medical personnel in Africa.
Tier 1 operators extracted them while analysts managed media blackout.

NATO ADVISORY:
Advising a NATO ally on space-based communication resilience.
BSS's strategic studies division published classified white papers.

HOSPITAL CYBER DEFENSE:
Quietly thwarted large-scale cyber attack on U.S. hospital system.
Never publicized, but whispered about in Pentagon corridors.

Each win added to the legend: "BSS is who you call when no one else can."`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Addie', 'Hawk']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Signature Operations'])
    },
    {
      title: "BSS Operator Philosophy",
      category: "BSS / Culture",
      description: "How BSS operators are different - thinking predators, not just muscle",
      content: `BSS OPERATOR PHILOSOPHY

CORE IDENTITY:
Operators at BSS ≠ Mercenaries
They are THINKING PREDATORS - problem solvers who happen to be lethal.

PRIMARY FUNCTION:
- Human Terrain Mapping (HTT)
- Situational intel gathering
- Blending into environments
- Security IF needed

Fighting and gunslinging is LAST RESORT.
Guns and hard fights are backup tools, not the playbook.

EVERY OPERATOR TRAINED TO:
- Blend in seamlessly
- Move comfortably in boardrooms, bazaars, nightclubs, or warzones
- Think on their feet
- Act as analysts or blend in for intel gathering

"We're not here to fight. We're here to solve. Fighting means something went wrong."`,
      characters: JSON.stringify(['Hawk', 'Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Operators', 'Philosophy', 'Culture'])
    },
    {
      title: "Derek Vaughn's Failure - Addie Steps Up",
      category: "BSS / Failed Recruits",
      description: "When Derek froze, Addie improvised and saved the client",
      content: `DEREK VAUGHN'S FAILURE

THE SETUP:
Derek - Ranger Battalion officer, Ivy MBA, dream hire on paper.
First solo crisis brief with a Fortune 50 CEO.

THE MOMENT:
Derek froze. Stammered under pressure.
The CEO was about to walk. The deal was dying.

ADDIE'S IMPROVISATION:
She stepped in. No prep. No script.
Read the room, spoke their language, turned the meeting around.
The client signed. Derek was done.

AFTERMATH:
Addie's legend begins.
Jasper realized: credentials don't survive the crucible. Addie does.`,
      characters: JSON.stringify(['Derek Vaughn', 'Addie', 'Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Failed Recruits', 'Addie Rise'])
    },
    {
      title: "Ethan Cho vs Addie - The Cyber Showdown",
      category: "BSS / Failed Recruits",
      description: "When Ethan's arrogance nearly cost them everything, Addie salvaged it",
      content: `ETHAN CHO VS ADDIE - THE CYBER SHOWDOWN

THE CONFLICT:
Ethan Cho - Former NSA cyber specialist, arrogant genius.
Undermined Addie early, assuming she was just a "secretary-turned-analyst."

THE CRISIS:
Live situation, billion-dollar client at stake.
Ethan went solo with a risky cyber strike.
It backfired spectacularly.

ADDIE'S SALVATION:
She stepped in, coordinated the recovery.
Worked with Harper's team to contain the damage.
Client saved. Barely.

THE OUTCOME:
Ethan fired.
His downfall became part of Addie's transformation into "the IT girl."
The moment Jasper and others realized she had instincts Ethan never had.`,
      characters: JSON.stringify(['Ethan Cho', 'Addie', 'Harper']),
      themes: JSON.stringify(['BSS', 'Failed Recruits', 'Cyber', 'Addie Rise'])
    }
  ];

  for (const storyline of bssStorylines) {
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

  // ============ SUMMARY ============
  const charCount = await prisma.character.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });
  const orgCount = await prisma.organization.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Storylines: ${storyCount}`);
  console.log(`Organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
