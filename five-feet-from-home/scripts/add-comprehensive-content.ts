import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING COMPREHENSIVE CONTENT ===\n");

  // ============ BSS STRUCTURE ============
  console.log("--- Adding BSS Structure ---\n");

  const bssOrg = {
    name: "BSS Strategic Advisors",
    type: "Private Crisis Management Firm",
    industry: "Strategic Advisory / Intelligence / Security",
    headquarters: "Charlotte, NC (The Forge)",
    description: `BSS STRATEGIC ADVISORS - THE FULL STRUCTURE

PUBLIC FACE:
"Clarity. Confidence. Control."
A boutique strategic advisory firm specializing in corporate resilience, executive strategy, and global market entry.

SHADOW IDENTITY:
An elite private crisis and power management firm — equal parts fixer, intelligence shop, negotiation team, and covert ops unit.
Known for discreetly neutralizing existential threats — scandals, cyberattacks, hostile competitors, or hostile governments.

═══════════════════════════════════════════════════════════
HQ - "THE FORGE" (Charlotte, NC)
═══════════════════════════════════════════════════════════

EXECUTIVE TIER:
- Jasper Barrett - CEO / Architect (visionary, final decision maker)
- Harper - COO / Engineer (operational backbone, day-to-day execution)

CORE HQ DIVISIONS:

STRATEGIC FIXERS ("The Hammer Unit")
- High-level troubleshooters, deployed like special envoys
- "Boardroom operators" — manipulate media, finance, and politics
- Only leave The Forge for client-facing missions or high-stakes negotiations

OPERATOR COMMAND
- Head of Operators (Tier 1 background, sets standards & deployments)
- Deputy/Assistant Head of Operators (training, readiness, recruitment)
- Oversees all regional operator teams, sets doctrine, approves heavy moves

CYBER DIVISION ("The Ghost Grid")
- Head of Cyber (Chief Technologist)
- Controls hacking, SIGINT, counter-cyber ops
- Analysts, penetration specialists, data miners

ANALYST WING ("The Watchtower")
- Researchers, intel analysts, red-team thinkers
- Build "big picture" maps of crisis, clients, and adversaries

LOGISTICS ("The Bones")
- Movement, finance, clean IDs, weapons, safehouses, travel

EXECUTIVE SUPPORT
- Office assistants, schedulers, client liaisons, gatekeepers

═══════════════════════════════════════════════════════════
REGIONAL NODES - "LABS"
═══════════════════════════════════════════════════════════

Each Lab is built inside old, rundown buildings or houses — blending into the city's background.
Part office, part dojo/training floor, part safehouse.

LAB COMPOSITION:
- Operators (muscle, surveillance, security)
- Cyber Cell (tied to Ghost Grid)
- Analyst/Fixers (region-specific problem solvers)
- Local Logistics Officer

KEY LABS:
- New York Lab: Finance, hedge funds, corporate battles
- DC Lab: Politics, lobbying, federal-level maneuvering
- London Lab: EU finance, legacy aristocracy, MI5/MI6 crossover
- LA Lab: Media, Hollywood, Silicon Valley, venture capital
- Asia Lab (Singapore/HK): Trade, sovereign wealth, great-power competition
- Middle East Lab (Dubai/Doha): Energy, sovereign funds, tribal/political alliances

═══════════════════════════════════════════════════════════
THE ALLOY NETWORK (Informants & Specialists)
═══════════════════════════════════════════════════════════

Trusted part-time operatives and embedded specialists activated when needed.
Example: Caroline (NYU finance professor) — market/hedge fund insider
Journalists, lawyers, bankers, mid-level regulators, ex-diplomats`,
    significance: "The central organization of the series - crisis management meets covert ops"
  };

  // Upsert BSS organization
  const existingBSS = await prisma.organization.findFirst({
    where: { name: bssOrg.name, projectId: project.id }
  });

  if (existingBSS) {
    await prisma.organization.update({
      where: { id: existingBSS.id },
      data: bssOrg
    });
    console.log("Updated: BSS Strategic Advisors");
  } else {
    await prisma.organization.create({
      data: { projectId: project.id, ...bssOrg }
    });
    console.log("Created: BSS Strategic Advisors");
  }

  // ============ THE FOUNDRY (Jasper's Iron Council) ============
  console.log("\n--- Adding The Foundry (Jasper's Council) ---\n");

  const foundryOrg = {
    name: "The Foundry",
    type: "Private Brotherhood / Advisory Council",
    industry: "Business Leadership / Personal Development",
    headquarters: "Various locations (private)",
    description: `THE FOUNDRY - JASPER'S IRON COUNCIL

Not advertised, not public. Even within their circles, few know it exists.
No website, no flashy branding. Just men who respect each other enough to show up and bleed honesty.

PURPOSE:
- Forge stronger men through accountability, brutal honesty, and shared wisdom
- Push each other beyond limits — in business, family, faith, fitness, and legacy
- Hold one another accountable for living as men of integrity

DYNAMIC:
- They don't flatter each other. They confront. They demand.
- No minutes, no structure. Just truth.

RITUALS (unspoken but consistent):
- A bottle is opened, poured once — no toast, no speech. The meeting begins.
- Phones are left at the door. No recordings, no distractions.
- A question is thrown on the table — "Where are you failing right now?" — and each man must answer.

═══════════════════════════════════════════════════════════
FOUNDING MEMBERS
═══════════════════════════════════════════════════════════

MARCUS "MAX" CALDERON - The Visionary
- Former college baseball player turned billion-dollar empire builder
- Smooth-talking, empathetic, deeply loyal
- Plays the "wise older brother" role
- Connection: Met Jasper at a private equity retreat

DOMINIC "DOM" ARAKELIAN - The Enforcer/Operator
- Armenian immigrant, Marine veteran
- Built his life from nothing — gyms, franchises, empire
- Intense, commanding, blunt. Streetwise edge mixed with battlefield discipline
- Connection: Met through mutual military contacts

RYAN "REX" FRASER - The Fire/Mental Toughness
- Blue-collar Midwestern kid turned supplement/fitness mogul
- Loud, passionate, sometimes abrasive
- "Fuck your feelings, do the work" philosophy
- Connection: Met at an underground endurance event

MASON "MASE" WHITLOCK - The Anchor/Old Brother
- Jasper's old lacrosse teammate from college
- Went into venture capital and early-stage tech investing
- Easygoing on surface, sharp underneath
- The only man Jasper trusts without question

JASPER BARRETT - The Strategist
- The one who ties vision, grit, and discipline into action`,
    significance: "Jasper's personal advisory council - men who sharpen each other"
  };

  const existingFoundry = await prisma.organization.findFirst({
    where: { name: foundryOrg.name, projectId: project.id }
  });

  if (existingFoundry) {
    await prisma.organization.update({
      where: { id: existingFoundry.id },
      data: foundryOrg
    });
    console.log("Updated: The Foundry");
  } else {
    await prisma.organization.create({
      data: { projectId: project.id, ...foundryOrg }
    });
    console.log("Created: The Foundry");
  }

  // ============ FOUNDRY MEMBERS ============
  console.log("\n--- Adding Foundry Members ---\n");

  const foundryMembers = [
    {
      name: "Marcus Calderon",
      firstName: "Marcus",
      lastName: "Calderon",
      nickname: "Max",
      archetype: "The Visionary",
      background: `Former college baseball player who pivoted after injury. Cut his teeth in finance, became a rainmaker in wealth management, then parlayed it into a billion-dollar empire of coaching, investment funds, and motivational platforms.

Known as a speaker who can command arenas, but equally effective in one-on-one mentorship.
Deep faith grounds him; believes God put him on earth to elevate others.

PERSONALITY: Empathetic, charismatic, magnetic. Knows when to comfort and when to push. Optimist at heart, but pragmatic in execution.

PHYSICAL: 6'2", athletic build, tailored suits with casual edge. Chiseled jawline, salt-and-pepper hair, warm but piercing brown eyes.

FOUNDRY ROLE: Vision - when Jasper thinks too small or drifts into cynicism, Max realigns him with purpose.`,
      bssRole: "The Foundry - The Visionary"
    },
    {
      name: "Dominic Arakelian",
      firstName: "Dominic",
      lastName: "Arakelian",
      nickname: "Dom",
      archetype: "The Enforcer/Operator",
      background: `Born in Armenia, immigrated to the U.S. as a child after his family fled war and poverty. Bullied and broke growing up, he found discipline in the Marines, where he served multiple deployments.

After service, built a gym franchise from scratch, then expanded into coaching, security consulting, and large-scale event management. Today, a multimillionaire empire-builder.

PERSONALITY: Intense, blunt, commanding. Hates excuses, despises weakness of will. Underneath, fiercely loyal and protective of his circle.

PHYSICAL: 5'10", powerful build with thick chest and broad shoulders. Shaved head, trimmed black beard flecked with gray. Scar across left eyebrow. Prefers simple black t-shirts, jeans, and combat boots.

FOUNDRY ROLE: Discipline/Hammer - when Jasper hesitates or over-strategizes, Dom reminds him to act and dominate.`,
      bssRole: "The Foundry - The Enforcer"
    },
    {
      name: "Ryan Fraser",
      firstName: "Ryan",
      lastName: "Fraser",
      nickname: "Rex",
      archetype: "The Fire/Mental Toughness",
      background: `Grew up in Missouri, overweight and broke, scraping by on odd jobs. Started a supplement company with his brother; nearly bankrupt multiple times but clawed back through sheer grind.

Developed a "no excuses" philosophy — mental toughness became his brand. His company is now one of the biggest in the fitness/health space.

PERSONALITY: Loud, raw, unapologetic. Swears a lot, doesn't care who's offended. Surprisingly thoughtful beneath the rage; believes in building people by breaking them down.

PHYSICAL: 6'0", thick muscular frame, tattoos on both arms, usually in gym gear or branded hoodies. Rough beard, buzz-cut hair, intense blue eyes.

FOUNDRY ROLE: Fire - when Jasper wavers or questions the cost, Rex forces him back into the fight with brutal honesty.`,
      bssRole: "The Foundry - The Fire"
    },
    {
      name: "Mason Whitlock",
      firstName: "Mason",
      lastName: "Whitlock",
      nickname: "Mase",
      archetype: "The Anchor/Old Brother",
      background: `Met Jasper at college on the lacrosse team — bonded instantly over competitiveness, grit, and late-night strategy talks.

After school, went into venture capital and early-stage tech investing. Known as the "risk whisperer" — spots big ideas early before anyone else.

Married once, divorced quietly; no kids. Poured himself into business and friendships.

PERSONALITY: Easygoing on the surface, but sharp underneath. The kind of guy who can joke around but switch to serious strategy in a heartbeat.

PHYSICAL: 6'1", lean athletic frame. Short sandy-blonde hair, usually disheveled. Blue-gray eyes, quick smile. Dresses casual but expensive.

FOUNDRY ROLE: Grounding - reminds Jasper that identity isn't just about business or missions; it's about who they were before the world demanded more.`,
      bssRole: "The Foundry - The Anchor"
    }
  ];

  for (const member of foundryMembers) {
    const existing = await prisma.character.findFirst({
      where: { name: member.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...member }
      });
      console.log(`Created: ${member.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: member
      });
      console.log(`Updated: ${member.name}`);
    }
  }

  // ============ INTIMATE STORYLINES ============
  console.log("\n--- Adding Intimate Storylines ---\n");

  const intimateStorylines = [
    {
      title: "Marine Corps Ball - Trophy Move",
      category: "Intimate / Hawk & Addie",
      description: "Addie's bold move at the Marine Corps Birthday Ball in Las Vegas",
      content: `MARINE CORPS BIRTHDAY BALL (LAS VEGAS)
A luxury hotel ballroom, chandeliers glowing, Marines in dress blues.
Hawk looks carved out of granite in his tux. Addie? Red satin gown with a high slit — daring, confident, and magnetic.

DINNER BANTER:
"Seriously, Hawk, did you bribe her with a trust fund?"
"Or did she lose some high-stakes bet?"
Addie fires back: "Neither. He just promised to sharpen all my kitchen knives for life. You know, real romance."

THE TROPHY MOVE:
Halfway through dinner, Addie slides her hand beneath the tablecloth.
She presses something into Hawk's hand. Delicate lace. Her panties.
Addie whispers in his ear: "Your trophy for the evening, soldier."

Hawk's jaw tightens. His hand closes around the lace, slipping it into his jacket pocket.
"You're going to pay for that later," he murmurs back.
Addie just smiles. "I'm counting on it."`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['Intimate', 'Tension', 'Gala', 'Marine Corps Ball', 'Fun Time'])
    },
    {
      title: "After the Marine Corps Ball",
      category: "Intimate / Hawk & Addie",
      description: "What happens in the hotel suite after the Marine Corps Ball",
      content: `AFTER THE MARINE CORPS BALL
Hawk's hotel suite, Las Vegas — the glow of the Strip outside, muted light inside.

ARRIVAL:
The moment the door closes, Hawk drops the "stone face" he kept all evening.
He pins her with a look that makes it clear he's been simmering since dinner.

Addie: "What's wrong, Lieutenant Stone Face? Too hot in the ballroom?"

Hawk steps closer: "You've been smiling at everyone, charming every general and senator in that room… and the whole time, I had that in my pocket."
He pulls the lace panties from his jacket, dangling them like evidence.

Addie smirks: "Like I said… your trophy."

THE BANTER BEFORE THE BURN:
He corners her against the suite's window, the lights of Vegas behind them.
"You think you can play me like that?"

She whispers in his ear: "Not playing, Hawk. Rewarding. You looked so good in that tux — thought you deserved something to remember the night."

He growls: "Fair warning, Addison Price — I'm cashing this in."

Addie: "I wouldn't have it any other way."`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['Intimate', 'Passion', 'Hotel Suite', 'Fun Time'])
    },
    {
      title: "The Midnight Shower Scene",
      category: "Intimate / Hawk & Addie",
      description: "The famous midnight shower scene where Hawk offers himself completely",
      content: `THE MIDNIGHT SHOWER SCENE

Addie needed grounding. Hawk provided it — not just emotionally, but physically present.

The shower scene became a turning point where Hawk offered himself completely.
Not as a soldier, not as an operator, but as a man who saw her fully.

This scene represents the shift in their relationship from protector/protected to equals in love.
Hawk's vulnerability in offering himself matched Addie's vulnerability in accepting.

The steam, the water, the confession — all elements that stripped away pretense.`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['Intimate', 'Vulnerability', 'Turning Point', 'Fun Time'])
    },
    {
      title: "Cabin Threesome - Addie, Kendra, Elena",
      category: "Intimate / Book 2",
      description: "The cabin encounter that changes the dynamic between Addie, Kendra, and Elena",
      content: `CABIN THREESOME - BOOK 2

This moment was about trust, vulnerability, and the depth of sisterhood pushed to its extremes.

THE SETUP:
A weekend at the cabin. Wine flowing. Tensions high from recent BSS crises.
Kendra and Elena both needed Addie's grounding presence.
What started as comfort evolved into something more.

THE AFTERMATH:
Addie made the decision that this couldn't happen again with Kendra.
The intimacy was too deep, too complicated with Chris entering the picture.
Kendra becomes closer with Elena and Grace because of Addie's decision to distance.
Their sisterhood with Addie continues, but with tension underneath.

This event is referenced throughout the series as the moment that both bonded and complicated their relationships.`,
      characters: JSON.stringify(['Addie', 'Kendra', 'Elena Barrett']),
      themes: JSON.stringify(['Intimate', 'Threesome', 'Cabin', 'Sisterhood', 'Fun Time'])
    },
    {
      title: "Selene's Island Retreat - Couples Exploration",
      category: "Intimate / Selene",
      description: "Selene's private island retreats for couples exploration",
      content: `SELENE'S ISLAND RETREAT

Selene hosts invitation-only retreats on a private island.
Originally designed for relationship development and exploration.
Safe space for couples to reconnect, explore boundaries.

WHAT HAPPENS:
- Structured activities for intimacy building
- Private sessions with Selene as guide
- Group dinners where trust is tested
- Individual exploration exercises

THE CORRUPTION:
Word spreads beyond Selene's inner circle.
Wealthy couples and thrill-seekers start showing up under false pretenses.
What was meant to be relationship development slowly devolves into something else.
Selene must reclaim the original purpose.`,
      characters: JSON.stringify(['Selene']),
      themes: JSON.stringify(['Intimate', 'Island Retreat', 'Couples', 'Exploration', 'Fun Time'])
    },
    {
      title: "Range Dates - Hawk & Addie Training",
      category: "Intimate / Hawk & Addie",
      description: "The series of range dates where training becomes flirtation",
      content: `RANGE DATES - HAWK & ADDIE

12 dates that blend tactical training with slow-burn romance:

DATE 1 - First Handgun: Hawk adjusts her grip, their bodies close, breathing synced.

DATE 2 - Night Vision: His hands brush her hair adjusting the NVGs. "Guess you do kiss with your eyes closed."

DATE 3 - Stress Games: She edges him out on accuracy. "Don't pout. I just kicked your ass."

DATE 4 - CQB Drill: Shoulder against shoulder, breath brushing skin. "You'd make a terrifying roommate."

DATE 5 - Simulated Mission: "That's my girl." "Yours, huh?" "Figure of speech… unless you want it to be more."

DATE 6 - Remote Cabin Range: Sitting on the tailgate, sipping bourbon. "Most people take girls to dinner. You bring me to shoot sim rounds." "You're not most people."

DATE 7 - Sniper Training: His hand slides along her back adjusting posture. She nails her first 600-yard shot.

DATE 8 - Trust Fall: 40-foot rappel. "I got the rope. Trust me." He catches her when she unclips.

DATE 9 - Blindfold Drill: When she pulls it off, he's right there. Neither steps back.

DATE 10 - Desert Moving Target: Heat, sweat, competition. Chest bumps turning into lingering press.

DATE 11 - Silent Signals: Role-reversal. "Didn't think I'd enjoy you bossing me around so much."

DATE 12 - Campfire After: Shoulder to shoulder, watching sparks. His hand brushes hers, stays there.`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['Intimate', 'Training', 'Range Dates', 'Slow Burn', 'Fun Time'])
    },
    {
      title: "Cole & Evie - Balcony Kiss",
      category: "Intimate / Cole & Evie",
      description: "The first kiss between Cole and Evie at the Wilmington gala",
      content: `BALCONY KISS - COLE & EVIE

THE MOMENT:
The night air was cool, the ocean stretching dark and endless beyond the harbor.
Evie's chest still ached with the echo of Cole's words: "They saw your glow."

THE EXCHANGE:
Evie: "Why do you always say things like that? Things I don't believe but somehow… want to."

Cole stepped closer, his hand reaching up, brushing a strand of hair from her face.
"Because you don't see what I see."

THE KISS:
Neither knew who started it. It just happened.
Steady, careful, but undeniable.
He pulled back first, something flickering in his eyes — regret? Fear?
"That… shouldn't have happened."
She nodded, breathless. "But it did."

EVIE'S JOURNAL:
"The kiss. My first real one in… I don't even know how long. And it was him. Steady, careful Cole, who swore off relationships. He kissed me. Or maybe I kissed him back. I just know it happened.

It scares me. I don't want to want this. But tonight, on that balcony, none of that mattered. It was just him. And me. And a kiss that I'll never forget."`,
      characters: JSON.stringify(['Cole', 'Evie']),
      themes: JSON.stringify(['Intimate', 'First Kiss', 'Balcony', 'Gala', 'Fun Time'])
    },
    {
      title: "Addie's Intimate Circle Explained",
      category: "Intimate / Relationships",
      description: "The truth about Addie's intimate connections within the inner circle",
      content: `ADDIE'S INTIMATE CIRCLE

HAWK'S RULE:
Hawk forbade Addie from being with Bella — too complicated.
But Addie wanted her.

WHO ADDIE HAD:
- Elena: Deep emotional and physical connection
- Kendra: The most complicated — ended after Chris
- Selene: The wild card, chaos she couldn't fully control

THE DYNAMIC:
These weren't casual encounters. Each represented trust, vulnerability, and the depth of sisterhood pushed to extremes.

BELLA'S PARALLEL:
Bella had Mandy — beautiful, wild, unforgettable but complicated.
Those moments shaped both women.

THE WARNING TO EVIE:
"Sexuality is a powerful thing for good, or bad. Be aware of the tensions. Know what you want — even if it's being single."`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Kendra', 'Selene', 'Bella', 'Mandy']),
      themes: JSON.stringify(['Intimate', 'Inner Circle', 'Sexuality', 'Power', 'Fun Time'])
    },
    {
      title: "The Forge Late Nights",
      category: "Intimate / BSS",
      description: "What happens at BSS headquarters during crisis mode",
      content: `THE FORGE LATE NIGHTS

Crisis mode at BSS headquarters. Adrenaline running high.

THE ENVIRONMENT:
- Long hours, close quarters
- Pressure cooker of high-stakes decisions
- Lines blur between professional and personal

WHO'S INVOLVED:
- Operators and analysts working together
- Wives sometimes present during major crises
- The tension between work and connection

WHAT HAPPENS:
When the mission ends and adrenaline crashes...
When the secure room finally empties...
When relief floods through and they need to feel alive...

The Forge has witnessed more than just business.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Addie']),
      themes: JSON.stringify(['Intimate', 'BSS', 'Crisis Mode', 'Adrenaline', 'Fun Time'])
    }
  ];

  for (const storyline of intimateStorylines) {
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

  // ============ BSS EXPANSION STORYLINES ============
  console.log("\n--- Adding BSS Expansion Storylines ---\n");

  const bssExpansionStorylines = [
    {
      title: "BSS Expansion Phase 1: Charlotte as The Forge",
      category: "BSS / Expansion",
      description: "How Jasper built BSS from Charlotte as the foundation",
      content: `PHASE 1 - CHARLOTTE (CLT) AS THE FORGE

WHY CLT?
Jasper starts in Charlotte because it's a financial hub but not oversaturated like NYC. He quietly builds his first network here with hedge funds, private equity shops, and Southern family offices.

KEY CATALYST:
A scandal tied to a NASCAR sponsor and a regional bank almost collapsing gives Jasper his first big case. He earns a reputation for quietly fixing problems without headlines.

CHARACTER DEVELOPMENT:
Harper and Elena anchor him, while Addie is just entering the story as the rough but sharp assistant who evolves into a force of her own.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Elena Barrett', 'Addie']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Charlotte', 'Foundation'])
    },
    {
      title: "BSS Expansion Phase 2: East Coast (NYC/DC/Boston)",
      category: "BSS / Expansion",
      description: "BSS expands to the East Coast power centers",
      content: `PHASE 2 - EAST COAST EXPANSION

NYC:
After CLT success, Jasper is pulled into Wall Street and media crises (anchors, networks, hedge funds). NYC becomes the second hub, giving him international visibility.

DC:
Leveraging military/intel ties, BSS builds influence in defense contracting, lobbying scandals, and foreign-agent registration cases. Hawk's Tier 1 background starts feeding into these contracts.

BOSTON:
BSS plugs into biotech and elite universities. Addie and Kendra's analyst networks thrive here. Claire's reappearance adds tension.`,
      characters: JSON.stringify(['Jasper Barrett', 'Hawk', 'Addie', 'Kendra', 'Claire']),
      themes: JSON.stringify(['BSS', 'Expansion', 'East Coast', 'NYC', 'DC', 'Boston'])
    },
    {
      title: "BSS Expansion Phase 3: London Hub",
      category: "BSS / Expansion",
      description: "BSS establishes European presence through London",
      content: `PHASE 3 - LONDON HUB (THE BRIDGE)

REASON FOR LONDON:
With transatlantic financial clients and Catholic/royalty networks, London becomes the natural first international hub. Harper's European connections and Elena's society links open doors.

MAJOR CASE:
A European bank + Vatican-adjacent scandal gives BSS its legitimacy across the pond. They prove they can handle aristocracy, monarchy, and Vatican ties with discretion.

ANCHOR CHARACTERS:
Nessa (DC/NY) stays in America, but new "Wives Club" members in Europe tie into fashion, media, and political consulting.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper', 'Elena Barrett']),
      themes: JSON.stringify(['BSS', 'Expansion', 'London', 'International', 'Vatican'])
    },
    {
      title: "BSS Expansion Phase 4-7: Global Reach",
      category: "BSS / Expansion",
      description: "BSS expands to Midwest, LA, Asia, and Middle East",
      content: `PHASES 4-7 - GLOBAL EXPANSION

MIDWEST (Chicago/Detroit):
Rise of manufacturing, agriculture tech, and energy infrastructure. A food processing scandal tied to biotech gives Jasper his entry. More "blue collar power brokers" — Jasper respects their grit.

LOS ANGELES:
Scandals in Hollywood, big streaming companies, AI/biotech startups. BSS handles celebrity and corporate crossover crises.

ASIA (Singapore, Tokyo, Hong Kong):
Future of finance + tech influence shifting east. Singapore becomes the command hub. Scandal mixing sovereign wealth funds, shipping lanes, and cyber theft.

MIDDLE EAST (Dubai, Doha, Riyadh):
Oil, energy diversification, sovereign influence. Where money, politics, and religion intersect. Brings Jasper's Catholic ties into contact with Islam, royalty, and geopolitical balance.`,
      characters: JSON.stringify(['Jasper Barrett', 'Addie', 'Hawk']),
      themes: JSON.stringify(['BSS', 'Expansion', 'Global', 'Midwest', 'LA', 'Asia', 'Middle East'])
    }
  ];

  for (const storyline of bssExpansionStorylines) {
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

  // ============ POH / WIVES CLUB STRUCTURE ============
  console.log("\n--- Adding POH/Wives Club Structure (Sapientia Minervae) ---\n");

  const wivesClubOrg = {
    name: "Sapientia Minervae (The Wives Club)",
    type: "Women's Power Network",
    industry: "Social / Intelligence / Support Network",
    headquarters: "Charlotte, NC (rotating locations)",
    description: `SAPIENTIA MINERVAE - "THE WISDOM OF MINERVA"
Official name of The Wives Club

The backbone of the BSS world. Not just emotional support — a quiet intelligence network.
Part support group, part power behind the power.

═══════════════════════════════════════════════════════════
THREE SUBSECTIONS
═══════════════════════════════════════════════════════════

THE SHIELDMAIDENS
- Protectors and fierce defenders
- Active in crisis response and security support
- Symbol: [TBD - to be documented]
- Color: [TBD - to be documented]

THE OWLS
- Intelligence gatherers and strategists
- Watchers who see everything and share quietly
- Bridge between Shieldmaidens and Vestals
- Symbol: [TBD - to be documented]
- Color: [TBD - to be documented]

THE VESTALS
- Keepers of tradition and sacred bonds
- Maintain ceremonies, rituals, and emotional bonds
- Symbol: [TBD - to be documented]
- Color: [TBD - to be documented]

═══════════════════════════════════════════════════════════
THE COUNCIL
═══════════════════════════════════════════════════════════

- One leader from each subsection
- Rotating leadership
- Meets to coordinate major decisions

═══════════════════════════════════════════════════════════
GEOGRAPHIC NETWORK
═══════════════════════════════════════════════════════════

DOMESTIC:
- D.C./NY Hub: Vanessa "Nessa" Caldwell (The Closer)
- Charlotte Hub: Charlotte "Charlie" Whitmore (The Connector)
- Boston Hub: Dr. Layla Hassan (The Anchor)

INTERNATIONAL:
- European wives (London, Paris, Rome)
- Middle Eastern wives (Dubai, Doha)
- South American wives (Brazil connections)
- Asian wives (Singapore, Hong Kong, Tokyo)`,
    significance: "The secret power network of BSS wives and partners"
  };

  const existingWC = await prisma.organization.findFirst({
    where: { name: { contains: "Sapientia Minervae" }, projectId: project.id }
  });

  if (existingWC) {
    await prisma.organization.update({
      where: { id: existingWC.id },
      data: wivesClubOrg
    });
    console.log("Updated: Sapientia Minervae (The Wives Club)");
  } else {
    await prisma.organization.create({
      data: { projectId: project.id, ...wivesClubOrg }
    });
    console.log("Created: Sapientia Minervae (The Wives Club)");
  }

  // ============ MORE INTIMATE STORYLINES ============
  console.log("\n--- Adding More Intimate Storylines ---\n");

  const moreIntimateStorylines = [
    {
      title: "Lingerie Shopping - Addie, Bella & Evie",
      category: "Intimate / Sisterhood",
      description: "Addie promises to take Evie lingerie shopping after seeing her old undergarments",
      content: `LINGERIE SHOPPING PROMISE

THE SCENE:
At the pre-gala ritual in the hotel suite, Evie slips into the dressing room.
She's embarrassed by her old, ratty undergarments - nothing flattering.
Addie notices when helping with the zipper.

ADDIE'S RESPONSE:
"Don't be embarrassed. We've all been there. You're beautiful, Evie — the gown will do its work. But next time, I'm dragging you to the lingerie counter whether you like it or not."

BELLA JOINS IN:
Bella admits Addie had to teach her everything too - "like My Fair Lady."
Evie laughs - that's her favorite book.
Bella admits her relationship with Mandy opened the doors to her sexuality.
Then she met Matt and everything blossomed.
Bella wants in on the lingerie shopping too.

THE BOND:
This becomes a bonding ritual - the women taking Evie under their wing.
Teaching her that beauty isn't just about the outside.`,
      characters: JSON.stringify(['Evie', 'Addie', 'Bella']),
      themes: JSON.stringify(['Intimate', 'Lingerie', 'Sisterhood', 'Fun Time'])
    },
    {
      title: "Bella & Mandy - Opening Doors",
      category: "Intimate / Bella's Past",
      description: "How Bella's relationship with Mandy opened doors to her sexuality",
      content: `BELLA & MANDY - OPENING DOORS

THE HISTORY:
Before Matt, Bella was shy and reserved.
Mandy was beautiful, wild, unforgettable... but complicated.

THE AWAKENING:
Their relationship opened doors to Bella's sexuality.
Mandy taught her confidence, desire, how to be seen.
Those moments stayed with her, shaped her.

WHAT BELLA TELLS EVIE:
"I had Mandy. Beautiful, wild, unforgettable… but complicated. Those moments stay with you, Evie. They shape you."

THE TRANSITION:
Then Matt entered the picture.
Everything blossomed into something steady, safe, but still passionate.`,
      characters: JSON.stringify(['Bella', 'Mandy', 'Matt']),
      themes: JSON.stringify(['Intimate', 'Sexuality', 'Past', 'Fun Time'])
    },
    {
      title: "Pre-Gala Undressing - Evie's Vulnerability",
      category: "Intimate / Evie",
      description: "Evie's embarrassment at being seen undressed in front of the wives",
      content: `PRE-GALA UNDRESSING

THE HOTEL SUITE:
Garment bags hanging from every door, curling irons sizzling, perfume in the air.
This is the wives' pre-gala tradition: gather in one room, transform together.

EVIE'S VULNERABILITY:
She slipped out of her clothes, folding them neatly.
Her undergarments were old — practical, worn thin.
The kind of thing no one else was ever supposed to see.
She prayed no one would notice.

THE MOMENT:
Addie stepped in to help with the zipper.
She caught sight of the straps and seams.
Her brows arched, then a mischievous grin.

EVIE'S REACTION:
Evie froze, cheeks blazing.
"I… these are just what I have. I didn't think anyone would— I mean—"
Her arms crossed protectively over her chest.

THE COMFORT:
Addie steadied her gently:
"Don't be embarrassed. We've all been there. You're beautiful, Evie."`,
      characters: JSON.stringify(['Evie', 'Addie']),
      themes: JSON.stringify(['Intimate', 'Undress', 'Vulnerability', 'Fun Time'])
    }
  ];

  for (const storyline of moreIntimateStorylines) {
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
