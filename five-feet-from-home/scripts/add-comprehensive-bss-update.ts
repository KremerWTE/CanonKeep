import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== COMPREHENSIVE BSS UPDATE FROM DOCUMENTS ===\n");

  // ============ BSS ORGANIZATIONS ============
  console.log("--- Updating BSS Organizations ---\n");

  const organizations = [
    {
      name: 'BSS Strategic Advisors',
      type: 'Private Firm',
      industry: 'Crisis Management / Strategic Solutions',
      headquarters: 'Charlotte, NC (The Forge)',
      description: `BSS exists to solve impossible problems—the kinds of crises, conflicts, and challenges where traditional firms, law enforcement, or government agencies can't move fast enough, or where discretion and deniability are essential.

PUBLIC FACE: Boutique strategic advisory firm specializing in corporate resilience, executive strategy, and global market entry.
Tagline: "Clarity. Confidence. Control."

SHADOW IDENTITY: Elite private crisis and power management firm—equal parts fixer, intelligence shop, negotiation team, and covert ops unit.
Shadow Tagline: "When no one else can fix it, we can."

SCOPE OF WORK:
• Corporate crisis management (hostile takeovers, leaks, activist investors, scandal containment)
• Political and government consulting (strategy, influence, backchannel negotiations)
• Financial and reputational risk management (hedge funds, oligarch disputes, regulatory exposure)
• Security and intelligence operations (cyber intrusions, asset recovery, counterintelligence)
• Strategic growth solutions (mergers, expansions, international deals in high-risk areas)

REPUTATION: Whisper-level legendary. If you're in the top 0.1% of business or politics, you know someone who has used them.`,
      significance: 'The central organization of the Barrett Strategic Solutions universe'
    },
    {
      name: 'The Forge (BSS HQ)',
      type: 'Headquarters',
      industry: 'Operations Center',
      headquarters: 'Charlotte, NC',
      description: `The brain and heart of BSS. "HQ" is the sterile term, but internally everyone calls it The Forge — the place where problems are melted down and reforged into solutions.

CORE DIVISIONS:
• Strategic Fixers ("The Hammer Unit") - High-level troubleshooters, deployed like special envoys
• Operator Command - Head & Deputy overseeing all regional operator teams
• Cyber Division ("The Ghost Grid") - Hacking, SIGINT, counter-cyber ops
• Analyst Wing ("The Watchtower") - Intel analysts, researchers, red-team thinkers
• Logistics ("The Bones") - Movement, finance, clean IDs, weapons, safehouses
• Performance & Human Systems ("The Forge Within") - Mental & physical optimization
• Executive Support - Assistants, schedulers, client liaisons

COMMAND CENTER: 24/7 nerve center with Battle Captain/Watch Commander`,
      significance: 'Central command and operations hub'
    },
    {
      name: 'BSS New York Lab',
      type: 'Regional Office',
      industry: 'Finance & Corporate',
      headquarters: 'Brooklyn, NY',
      description: `Old Brooklyn brownstone with boarded-up storefront exterior. Boxing ring in basement, roof wired for surveillance, living quarters upstairs.

FOCUS: Finance, Wall Street, hedge funds, corporate battles
TRAINING: Boxing ring for sparring and discipline training
COVER: Rundown exterior, fully renovated secure interior`,
      significance: 'East Coast financial operations hub'
    },
    {
      name: 'BSS DC Lab',
      type: 'Regional Office',
      industry: 'Political & Government',
      headquarters: 'Capitol Hill, Washington DC',
      description: `Run-down rowhouse near Capitol Hill. Looks abandoned but wired with comms, maps of political networks, basement gym.

FOCUS: Politics, lobbying, federal-level maneuvering
TRAINING: Wrestling mats, small tactical shoot house in garage
COVER: Abandoned appearance conceals sophisticated intel operations`,
      significance: 'Political and government operations hub'
    },
    {
      name: 'BSS London Lab',
      type: 'Regional Office',
      industry: 'Finance & Aristocracy',
      headquarters: 'East End, London',
      description: `Hidden in old East End warehouse. Exposed brick, iron beams, sparring mats on main floor, analyst desks on mezzanine.

FOCUS: EU finance, legacy aristocracy networks, MI5/MI6 crossover
TRAINING: Outdoor courtyard hybrid strongman/obstacle course
COVER: Industrial warehouse aesthetic`,
      significance: 'European operations and old money connections'
    },
    {
      name: 'BSS LA Lab',
      type: 'Regional Office',
      industry: 'Media & Technology',
      headquarters: 'Echo Park, Los Angeles',
      description: `Old Spanish-style house in Echo Park. Outwardly looks like a party house; inside is minimalist and functional.

FOCUS: Media, Hollywood, Silicon Valley, venture capital
TRAINING: Pool and outdoor space for surf training, swimming, water rescue drills
COVER: Party house exterior masks operational capability`,
      significance: 'West Coast media and tech operations'
    },
    {
      name: 'BSS Asia Lab',
      type: 'Regional Office',
      industry: 'Trade & Sovereign Wealth',
      headquarters: 'Singapore/Hong Kong',
      description: `Hidden in decayed colonial shophouse, blending with crumbling facades. Inside is tech-heavy, sleek, with bunk-style quarters.

FOCUS: Trade, sovereign wealth funds, great-power competition
TRAINING: Rooftop martial arts (Muay Thai, Kali, Krav Maga) with city skyline backdrop
COVER: Colonial decay hides advanced technology`,
      significance: 'Asia-Pacific operations and emerging markets'
    },
    {
      name: 'BSS Middle East Lab',
      type: 'Regional Office',
      industry: 'Energy & Sovereign Funds',
      headquarters: 'Dubai/Doha',
      description: `Weathered villa on edge of old city. Cool, fortified interior stocked for longer stays.

FOCUS: Energy, sovereign funds, tribal/political alliances
TRAINING: Sand pit for desert conditioning, indoor climbing wall for tactical drills
COVER: Traditional villa appearance`,
      significance: 'Middle East energy and political operations'
    },
    {
      name: 'The Alloy Network',
      type: 'Informant Network',
      industry: 'Intelligence Gathering',
      headquarters: 'Global',
      description: `BSS's covert stable of part-timers, contractors, and embedded assets activated as needed. Treated like chess pieces — only moved when necessary, never overexposed.

MEMBERS INCLUDE:
• Caroline (NYU finance professor) - Market/hedge fund insider intel
• Journalists - Story placement and kill capabilities
• Lawyers & Bankers - Legal cover and financial channels
• Professors & Academics - Industry knowledge and access
• Mid-level Bureaucrats - Government information
• Ex-diplomats - International connections

Called "The Alloy" because they are external metals blended into operations.`,
      significance: 'Extended intelligence and specialist network'
    },
    {
      name: 'Strategic Response Team (SRT)',
      type: 'Elite Unit',
      industry: 'Crisis Response',
      headquarters: 'Charlotte, NC (The Forge)',
      description: `HQ's deployable elite unit. Internally called "The Crucible" - forged for the hottest fires.

EXTERNAL NAME: Crisis Management Response Consultants
INTERNAL NAME: The Crucible

COMPOSITION: Fixer, analyst, operator, cyber asset, performance coach (as needed)

DEPLOYMENT CRITERIA:
• A Lab is out of its depth
• A client's problem is existential
• Jasper/Harper want eyes on the ground

They deploy when stakes are too high for local teams alone.`,
      significance: 'Elite mobile response unit from HQ'
    }
  ];

  for (const org of organizations) {
    const existing = await prisma.organization.findFirst({
      where: { name: org.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({
        data: { projectId: project.id, ...org }
      });
      console.log(`Created org: ${org.name}`);
    } else {
      await prisma.organization.update({
        where: { id: existing.id },
        data: org
      });
      console.log(`Updated org: ${org.name}`);
    }
  }

  // ============ BSS CHARACTERS ============
  console.log("\n--- Updating BSS Characters ---\n");

  const characters = [
    {
      name: 'Jasper Barrett',
      archetype: 'The Architect',
      bssRole: 'CEO / The Architect',
      background: `CEO of BSS Strategic Advisors. Visionary and final decision maker, high-touch on elite clients.

TRANSITION ARC:
• Started at Work 90% / Family 10% - Living in airports and boardrooms
• Breaking point: Missed daughter's school play, watched on phone recording
• First shift to Work 80% / Family 20% - Lunch meetings, delegating travel
• Current: Work 75% / Family 25% - Office war room role, strategy and mentorship
• Aspiration: Work 60% / Family 40%

KEY RELATIONSHIPS:
• Elena Barrett (Wife) - CEO of Maision Aurelia
• Grace (Daughter) - Adores all the women except Selene
• Addie, Kendra, Bella - Keep him honest, built office at compound
• Hawk - Head of Operators, close advisor

PHILOSOPHY: "The legacy of BSS is in building leaders, not in being everywhere himself."`,
      relationships: JSON.stringify({
        spouse: 'Elena Barrett',
        children: ['Grace', 'Two other children', 'Third baby (recent)'],
        innerCircle: ['Harper', 'Hawk', 'Addie', 'Kendra', 'Bella'],
        sister_in_law: 'Sara'
      })
    },
    {
      name: 'Harper',
      archetype: 'The Engineer',
      bssRole: 'COO / The Engineer',
      background: `COO of BSS. Operational backbone, runs day-to-day execution and structure.

RESPONSIBILITIES:
• Day-to-day operations management
• Systems and structure oversight
• Coordinates with all divisions
• European connections for London Lab
• Leads cyber crisis responses

KEY CASES LED:
• Healthcare Ransomware Attack - Built cyber unit overnight
• London Banking Crisis - Coordinated with European contacts
• U.S. Hospital Cyber Defense - Coordinated defense`,
      relationships: JSON.stringify({
        partner: 'Jasper Barrett',
        role: 'COO and operational leader'
      })
    },
    {
      name: 'Caroline',
      archetype: 'The Professor',
      bssRole: 'Alloy Network - Finance Informant',
      background: `NYU Finance Professor and BSS Alloy Network member.

ROLE: Provides market/hedge fund insider intel, discreet access to academia, hedge fund culture, and SEC regulatory language.

USED IN:
• Wall Street Hostile Takeover case - Provided market intel against activist fund`,
      relationships: JSON.stringify({
        affiliation: 'The Alloy Network',
        specialty: 'Finance and hedge fund intelligence'
      })
    },
    {
      name: 'Battle Captain',
      archetype: 'The Watch Commander',
      bssRole: 'Command Center Watch Officer',
      background: `The 24/7 nerve center role at The Forge. Sits in command chair, watches everything, keeps operations humming when Jasper/Harper aren't in the room.

RESPONSIBILITIES:
• Monitors all active operations
• First point of contact for incoming crises
• Coordinates between Labs and HQ
• Manages the Command Center`,
      relationships: JSON.stringify({
        reports_to: ['Jasper Barrett', 'Harper'],
        location: 'The Forge Command Center'
      })
    }
  ];

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created character: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated character: ${char.name}`);
    }
  }

  // ============ BSS STORYLINES - EXPANSION ARC ============
  console.log("\n--- Updating BSS Expansion Storylines ---\n");

  const storylines = [
    {
      title: "BSS Expansion Arc - Phase 1: Charlotte (The Forge)",
      category: "BSS / Expansion",
      description: "Jasper starts in Charlotte as a financial hub without NYC saturation",
      content: `PHASE 1 - CHARLOTTE (CLT) AS THE FORGE

WHY CLT?
Jasper starts in Charlotte because it's a financial hub but not oversaturated like NYC. He quietly builds his first network with hedge funds, private equity shops, and Southern family offices.

KEY CATALYST:
A scandal tied to a NASCAR sponsor and a regional bank almost collapsing gives Jasper his first big case. He earns a reputation for quietly fixing problems without headlines.

CHARACTER DEVELOPMENT:
Harper and Elena anchor him, while Addie is just entering the story as the rough but sharp assistant who evolves into a force of her own.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Elena Barrett', 'Addie']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Origin', 'Charlotte'])
    },
    {
      title: "BSS Expansion Arc - Phase 2: East Coast (NYC/DC/Boston)",
      category: "BSS / Expansion",
      description: "BSS expands to Wall Street, politics, and biotech",
      content: `PHASE 2 - EAST COAST EXPANSION

NYC:
After CLT success, Jasper is pulled into Wall Street and media crises (anchors, networks, hedge funds). NYC becomes the second hub, giving him international visibility.

DC:
Leveraging military/intel ties, BSS builds influence in defense contracting, lobbying scandals, and foreign-agent registration cases. Hawk's Tier 1 background starts feeding into these contracts.

BOSTON:
BSS plugs into biotech and elite universities - Addie and Kendra's analyst networks thrive here. Claire's reappearance adds tension.`,
      characters: JSON.stringify(['Jasper Barrett', 'Hawk', 'Addie', 'Kendra']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Wall Street', 'Politics', 'Biotech'])
    },
    {
      title: "BSS Expansion Arc - Phase 3: London Hub (The Bridge)",
      category: "BSS / Expansion",
      description: "First international hub with transatlantic clients",
      content: `PHASE 3 - LONDON HUB (THE BRIDGE)

REASON FOR LONDON:
With transatlantic financial clients and Catholic/royalty networks, London becomes the natural first international hub. Harper's European connections and Elena's society links open doors.

MAJOR CASE:
A European bank + Vatican-adjacent scandal gives BSS its legitimacy across the pond. They prove they can handle aristocracy, monarchy, and Vatican ties with discretion.

ANCHOR CHARACTERS:
Nessa (DC/NY) stays in America, but new "Wives Club" members in Europe tie into fashion, media, and political consulting.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Elena Barrett']),
      themes: JSON.stringify(['BSS', 'Expansion', 'London', 'Vatican', 'Aristocracy'])
    },
    {
      title: "BSS Expansion Arc - Phase 4: Midwest Outpost (Chicago/Detroit)",
      category: "BSS / Expansion",
      description: "Manufacturing, agriculture tech, and energy infrastructure",
      content: `PHASE 4 - MIDWEST OUTPOST

WHY MIDWEST?
Jasper sees the rise of manufacturing, agriculture tech, and energy infrastructure as the new power arenas.

ANCHOR CASE:
A food processing scandal tied to biotech and large-scale farming gives Jasper his entry.

NARRATIVE ROLE:
The Midwest team provides grounding against the glamour of London/NYC. More "blue collar power brokers" - Jasper respects their grit.`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Midwest', 'Agriculture', 'Manufacturing'])
    },
    {
      title: "BSS Expansion Arc - Phase 5: Los Angeles (Entertainment & Tech)",
      category: "BSS / Expansion",
      description: "Hollywood, streaming, and AI/biotech startups",
      content: `PHASE 5 - LOS ANGELES

WHY LA?
Scandals in Hollywood, big streaming companies, and the rise of AI/biotech startups. Jasper sets up shop to handle celebrity and corporate crossover crises.

CASE EXAMPLE:
BSS fixes a crisis involving a major studio CEO, a hedge fund tied to Silicon Valley, and cartel-backed film financing.`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Hollywood', 'Tech', 'Cartel'])
    },
    {
      title: "BSS Expansion Arc - Phase 6: Asia (Singapore/Tokyo/Hong Kong)",
      category: "BSS / Expansion",
      description: "Finance and tech influence shifting east",
      content: `PHASE 6 - ASIA

WHY ASIA?
Jasper realizes the future of finance + tech influence is shifting east. Singapore becomes the command hub due to its neutrality and wealth concentration.

ANCHOR CASE:
A scandal mixing sovereign wealth funds, shipping lanes, and cyber theft. BSS prevents an international incident.

CHARACTER ROLE:
Addie and Hawk become the lead operators for Asia cases, proving their rise from apprentices to equals.`,
      characters: JSON.stringify(['Jasper Barrett', 'Addie', 'Hawk']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Asia', 'Sovereign Wealth', 'Cyber'])
    },
    {
      title: "BSS Expansion Arc - Phase 7: Middle East (Dubai/Doha/Riyadh)",
      category: "BSS / Expansion",
      description: "Oil, energy diversification, and sovereign influence",
      content: `PHASE 7 - MIDDLE EAST

WHY ME?
BSS moves into oil, energy diversification, and sovereign influence. Jasper sees it as the final frontier where money, politics, and religion intersect.

ANCHOR CASE:
BSS helps navigate a crisis between a Gulf sovereign fund, a European defense contractor, and U.S. interests. It solidifies Jasper as a global operator, not just an American fixer.

NARRATIVE WEIGHT:
Brings his Catholic ties into contact with Islam, royalty, and geopolitical balance.`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Middle East', 'Energy', 'Religion'])
    },
    {
      title: "Jasper & Elena - Work/Family Transition Arc",
      category: "Family / Jasper & Elena",
      description: "Jasper's transition from Work 90% to Work 75% and Elena's return to CEO",
      content: `JASPER'S TRANSITION: WORK 90% → WORK 75%

PHASE 1 - RELUCTANT AWARENESS (Work 90 / Family 10):
Jasper lives in airports and boardrooms. Elena and kids see him at dinners and Sundays, but he's mentally on work calls. Hawk calls him out: "You're building an empire but missing the kingdom at home."

PHASE 2 - THE BREAKING POINT:
Client dinner collides with daughter's school play. He chooses work. Later watches recording and sees how much he missed. Elena: "You'll build ten more companies. You only get one chance to be their father."

PHASE 3 - FIRST SHIFT (Work 80 / Family 20):
Moves meetings to lunchtime power sessions. Starts delegating travel to Addie, Kendra, Bella and regional teams. Shifts to office war room role.

PHASE 4 - WORK 75 / FAMILY 25:
Structured office hours, family dinners sacred. Brings kids into parts of his world. Weekend routines non-negotiable.

ELENA'S RETURN TO CEO:
After years of pulling back to stabilize home, Elena restructures Maision Aurelia as global event and lifestyle management firm. Not just weddings - cultural diplomacy dinners, Vatican fundraisers, Fortune 100 summits.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Addie', 'Kendra', 'Bella', 'Hawk', 'Sara', 'Grace']),
      themes: JSON.stringify(['Family', 'Balance', 'Transition', 'Leadership'])
    },
    {
      title: "The Compound Office - Girls Keep Jasper Honest",
      category: "Family / Inner Circle",
      description: "Addie, Kendra, and Bella build an office at the compound",
      content: `THE COMPOUND OFFICE

THE GIRLS' PLAN:
Addie, Kendra, and Bella built an office in Jasper's compound so he can work from there.

Addie: "You can thank us later. You're not allowed to use 'the office was too far' as an excuse anymore."
Kendra: "This is about accountability. You said you wanted to be here more. Now you can. No excuses."
Bella: "And we made sure it doesn't feel like a bunker. Elena's rule."

THEIR ROLE:
• Keep Jasper honest - enforce rules (no disappearing into work)
• Keep Elena honest - remind her to stay grounded with family
• Deeply bonded with Elena - almost her sisterhood
• Build the structures that force family and work to stay balanced

GRACE'S VIEW:
Grace adores all three of them ("You're the best"). But not Selene: "Selene's boring. She doesn't play." Selene is not a kids person.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Addie', 'Kendra', 'Bella', 'Grace', 'Selene']),
      themes: JSON.stringify(['Family', 'Accountability', 'Sisterhood', 'Balance'])
    },
    {
      title: "BSS Operator Philosophy",
      category: "BSS / Doctrine",
      description: "The core philosophy of BSS operators",
      content: `BSS OPERATOR PHILOSOPHY

CORE IDENTITY:
Operators at BSS ≠ Mercenaries. They're handpicked thinking predators—problem solvers who move comfortably in boardrooms, bazaars, nightclubs, or warzones.

TRAINING PRINCIPLES:
• Blend in → disappear into crowds, corporate events, or high society
• Gather intelligence → read rooms, map networks, identify leverage points
• Support analysts/fixers → provide context, ground truth, live feedback
• Secure the team → shadow presence to deter threats, not provoke them
• Escalate only if necessary → violence is the tool of last resort

HTT (HUMAN TERRAIN TEAM) MINDSET:
Operators are BSS's version of HTTs from counterinsurgency doctrine, applied to boardrooms and global networks. They map the human landscape: who matters, who influences, who can be leveraged.

VIOLENCE PHILOSOPHY:
• Never the first option
• Fighting or gunplay means something went wrong
• Security presence, not aggression
• Controlled threat - reputation is enough
• Clean exit > Messy win

JASPER'S DRILL: "If you win a fight but blow the mission's secrecy, you've failed."`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Hawk']),
      themes: JSON.stringify(['BSS', 'Doctrine', 'Operators', 'Philosophy'])
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
      console.log(`Created storyline: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated storyline: ${storyline.title}`);
    }
  }

  // ============ SUMMARY ============
  const charCount = await prisma.character.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });
  const orgCount = await prisma.organization.count({ where: { projectId: project.id } });

  console.log(`\n=== FINAL SUMMARY ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Storylines: ${storyCount}`);
  console.log(`Organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
