import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING COMPREHENSIVE WIVES CLUB CONTENT ===\n");

  // ============ THE FOUNDRY - JASPER'S IRON COUNCIL ============
  const foundryMembers = [
    {
      name: "Marcus Calderon",
      firstName: "Marcus",
      lastName: "Calderon",
      nickname: "Max",
      archetype: "The Visionary",
      background: `Former college athlete who parlayed insurance/finance hustle into building a billion-dollar wealth and coaching empire. Grew up modest but now operates like a polished motivational powerhouse.

PHYSICAL DESCRIPTION:
6'2", athletic build, tailored suits with casual edge (luxury watches, pocket squares). Chiseled jawline, salt-and-pepper hair that adds gravitas, warm but piercing brown eyes. Always impeccably groomed.
Inspired by: Ed Mylett

PERSONALITY:
- Smooth-talking, empathetic, deeply loyal to Jasper
- Plays "big brother" role
- Believes in power of visualization, confidence, and faith
- Empathetic, charismatic, magnetic
- Knows when to comfort and when to push
- Optimist at heart, but pragmatic in execution

SKILLSET:
Incredible at reading rooms, closing deals, and firing up teams. Can walk into a room of billionaires or a locker room of athletes and get both on his side.

CONNECTION TO JASPER:
Met Jasper at a private equity retreat where Jasper was consulting on risk strategy. Max was struck by Jasper's intensity; Jasper respected Max's presence. They bonded over faith, discipline, and shared belief in legacy.
Serves as Jasper's mirror for vision: when Jasper thinks too small or drifts into cynicism, Max realigns him with purpose.`,
      relationships: "Member of The Foundry (Jasper's Iron Council), close advisor to Jasper Barrett",
      bssRole: "External Advisor / The Foundry"
    },
    {
      name: "Dominic Arakelian",
      firstName: "Dominic",
      lastName: "Arakelian",
      nickname: "Dom",
      archetype: "The Enforcer / Operator",
      background: `Armenian immigrant, Marine veteran, built his life from nothing — gyms, franchises, then empire builder. Wears scars of hardship and has zero tolerance for excuses.

PHYSICAL DESCRIPTION:
5'10", powerful build with thick chest and broad shoulders. Shaved head, trimmed black beard flecked with gray. Scar across left eyebrow from a fight in his youth. Prefers simple black t-shirts, jeans, and combat boots — always looks like he could step into a fight or a boardroom.
Inspired by: Bedros Keuilian

PERSONALITY:
- Intense, commanding, blunt
- Streetwise edge mixed with battlefield discipline
- Loyal but calls Jasper out when he's soft or too "strategist" instead of decisive
- Hates excuses, despises weakness of will
- Underneath, fiercely loyal and protective of his circle
- Pragmatist: "Cut the fluff, what works?"

SKILLSET:
Systems builder, ruthless operator. Can take a chaotic situation (company meltdown, hostile board takeover, or covert mission logistics) and hammer it into disciplined structure.

CONNECTION TO JASPER:
Met through mutual military contacts. Dom immediately respected Jasper's tactical sharpness; Jasper admired Dom's grit and clarity.
Serves as Jasper's hammer: when Jasper hesitates or over-strategizes, Dom reminds him to act and dominate.`,
      relationships: "Member of The Foundry (Jasper's Iron Council), Marine veteran",
      bssRole: "External Advisor / The Foundry"
    },
    {
      name: "Ryan Fraser",
      firstName: "Ryan",
      lastName: "Fraser",
      nickname: "Rex",
      archetype: "The Fire / Mental Toughness",
      background: `Blue-collar Midwestern kid turned supplement/fitness mogul. Known for raw rants, no-filter honesty, and transformation from broke and overweight to world-class operator.

PHYSICAL DESCRIPTION:
6'0", thick muscular frame, tattoos on both arms, usually in gym gear or branded hoodies from his supplement empire. Rough beard, buzz-cut hair, intense blue eyes. Radiates controlled chaos — like he could laugh with you or tear your head off in the same breath.
Inspired by: Andy Frisella (75 HARD & 1st Phorm)

PERSONALITY:
- Loud, raw, unapologetic. Swears a lot, doesn't care who's offended
- Surprisingly thoughtful beneath the rage
- Believes in building people by breaking them down and forcing them to rebuild stronger
- Has massive chip on shoulder from being underestimated — uses it as fuel

SKILLSET:
Mental conditioning, resilience, culture-building. Pushes the group past comfort — "fuck your feelings, do the work." Also surprisingly sharp on branding and consumer psychology.

CONNECTION TO JASPER:
Met at an underground endurance event where both were invited as "special challengers." Rex respected Jasper's quiet dominance; Jasper respected Rex's raw grit.
The two clicked over the idea that most people fold under pressure — bonded over mutual hatred of mediocrity.
Serves as Jasper's fire: when Jasper wavers or questions the cost, Rex forces him back into the fight with brutal honesty.`,
      relationships: "Member of The Foundry (Jasper's Iron Council), fitness empire founder",
      bssRole: "External Advisor / The Foundry"
    },
    {
      name: "Mason Whitlock",
      firstName: "Mason",
      lastName: "Whitlock",
      nickname: "Mase",
      archetype: "The Anchor / Old Brother",
      background: `Jasper's old lacrosse teammate from college. The friendship predates BSS, money, and power.

PHYSICAL DESCRIPTION:
6'1", lean athletic frame that still carries muscle memory of a lacrosse midfielder. Short sandy-blonde hair, usually a little disheveled. Blue-gray eyes, quick smile, rugged handsomeness that feels approachable. Dresses casual but expensive — Patagonia vest over button-downs, watches that show quiet wealth.

PERSONALITY:
- Easygoing on the surface, but sharp underneath
- The kind of guy who can joke around but switch to serious strategy in a heartbeat
- Loyal to the bone — still sees Jasper not as "the fixer" but as the same friend he battled with on the lacrosse field
- Often smooths out tensions between Dom's intensity, Rex's fire, and Jasper's stoicism

CAREER:
After school, went into venture capital and early-stage tech investing. Known in certain circles as the "risk whisperer" — has a knack for spotting big ideas early and backing them before anyone else sees the potential.
Had both spectacular wins and equally big losses, which gives him perspective most others don't have.
Married once, divorced quietly; no kids. Poured himself into business and friendships.

CONNECTION TO JASPER:
Their friendship is the deepest-rooted in The Foundry. Mason is the one man Jasper trusts without question because they've shed blood, sweat, and tears together long before power, money, or missions entered the picture.
Jasper often tests his most vulnerable thoughts with Mason first — because Mason doesn't see "the legend," he just sees "the guy he roomed with sophomore year."
Role: Mason is the memory keeper. He reminds the others — and Jasper — that identity isn't just about business or missions; it's about who they were before the world demanded more.`,
      relationships: "Member of The Foundry (Jasper's Iron Council), Jasper's college lacrosse teammate, venture capitalist",
      bssRole: "External Advisor / The Foundry"
    }
  ];

  // ============ OPERATOR WIVES ============
  const operatorWives = [
    {
      name: "Vanessa Caldwell",
      firstName: "Vanessa",
      lastName: "Caldwell",
      nickname: "Nessa",
      archetype: "Rebecca Bowen-inspired - The Closer",
      background: `Polished, ambitious, unapologetically her own force. Based on Rebecca Bowen from SEAL Team.

PHYSICAL DESCRIPTION:
5'9", striking brunette with sharp cheekbones, piercing hazel eyes. Always impeccably styled — sleek suits, understated jewelry, designer heels.
Lookalikes: Shantel VanSanten + Amal Clooney's high-powered elegance

EDUCATION:
- American University — B.A. International Relations
- Fordham University School of Law — J.D.

CAREER:
- Former congressional aide, then junior associate at D.C. lobbying law firm
- Pivoted into defense compliance and lobbying
- Currently Senior Counsel & Policy Advisor specializing in defense contracting and political risk

MARRIAGE:
Married to a D.C./NY-based BSS operator — a senior intel/liaison type who moves between Wall Street, Langley, and Capitol Hill. Their marriage is both romantic and strategic.

PERSONALITY:
- Brilliant, calculating, fiercely independent
- Doesn't play second fiddle in her marriage or the Wives Club
- She's her own center of gravity
- Sometimes views the Wives Club less as sisterhood and more as extension of her professional networks

FUNCTION IN WIVES CLUB:
The "closer." Political/media credibility, access to lawmakers, lawyers, and journalists. Can kill a bill, push a story, or bury a scandal.`,
      relationships: "Wives Club member (D.C./NY hub), married to D.C./NY BSS operator",
      bssRole: "Wives Club / D.C.-NY Hub"
    },
    {
      name: "Charlotte Whitmore",
      firstName: "Charlotte",
      lastName: "Whitmore",
      nickname: "Charlie",
      archetype: "Stella-inspired - The Connector",
      background: `Southern charm, ambitious but still finding her footing. Inspired by Stella from SEAL Team.

PHYSICAL DESCRIPTION:
5'6", brunette with soft caramel highlights, blue-green eyes, always smiling. Dresses in approachable, stylish Southern chic — sundresses, bold jewelry, blazers when she needs polish.
Lookalikes: Ashley Williams (How I Met Your Mother, Hallmark movies) — warm, approachable, bubbly energy

EDUCATION:
- UNC Charlotte — B.A. Sociology
- NC State — Ph.D. candidate in Communications, teaching assistant
- Dissertation focused on branding and Southern philanthropy

CAREER:
- Former PR intern in New York, briefly worked in event marketing
- Now Ph.D. student/TA, figuring out whether to finish academic track, pivot to corporate PR, or ride the Wives Club wave into influence

MARRIAGE:
Married to a Charlotte-based BSS operator who leads Southeast ops — balancing corporate/financial security contracts with field assignments. Locally viewed as a rising Southern power couple.

PERSONALITY:
- Outgoing, bubbly, naturally magnetic
- Plays up "southern belle" persona but hides sharp instincts underneath
- Still in transition, sometimes insecure about being less polished than Nessa or Layla
- Hungry to grow

FUNCTION IN WIVES CLUB:
The "connector." Hosts social events, ties group into Charlotte finance, philanthropy, NASCAR, and corporate networks.`,
      relationships: "Wives Club member (Charlotte hub), married to Charlotte-based BSS operator",
      bssRole: "Wives Club / Charlotte Hub"
    },
    {
      name: "Dr. Layla Hassan",
      firstName: "Layla",
      lastName: "Hassan",
      archetype: "Naima-inspired - The Anchor",
      background: `Grounded, principled, moral compass with professional gravitas. Inspired by Naima from SEAL Team.

PHYSICAL DESCRIPTION:
5'5", olive skin, long dark hair (sometimes styled, sometimes practical), deep brown eyes. Dresses elegantly but understated.
Lookalikes: Golshifteh Farahani (mysterious elegance) + Rula Jebreal (intellectual poise)

EDUCATION:
- Northeastern University — B.S. Nursing
- Massachusetts College of Pharmacy & Health Sciences (MCPHS) — Doctor of Healthcare Administration (DHA)

CAREER:
- ICU nurse at Massachusetts General
- Trauma nurse during husband's deployments
- Transitioned into administration
- Now Director of Clinical Operations for a Boston hospital network

BACKGROUND:
Born in Boston to Lebanese immigrant parents. Known for both compassion and unshakable resilience, having held families together during deployments.

MARRIAGE:
Married to a Boston-based BSS operator, formerly SOF, now working in biotech/defense contracting after injuries. Met him during his rehab.

PERSONALITY:
- Grounded, principled, quietly formidable
- Known as the calm center in any storm
- Always sees the human cost in the power games

FUNCTION IN WIVES CLUB:
The "anchor." Mediates disputes, keeps ethics in play, ties the group into Boston's healthcare and biotech elite.`,
      relationships: "Wives Club member (Boston hub), married to Boston-based BSS operator",
      bssRole: "Wives Club / Boston Hub"
    }
  ];

  // ============ LILA BEAUMONT (Lacey Beeman inspired) ============
  const lilaBeaumont = {
    name: "Lila Beaumont",
    firstName: "Lila",
    lastName: "Beaumont",
    archetype: "PR/Brand Strategist - The Connector",
    background: `Former lifestyle & wellness influencer turned brand strategist for elite families and nonprofits. Inspired by Lacey Beeman.

PHYSICAL DESCRIPTION:
Tall, blonde, camera-ready in every setting. Fitness and fashion obsessed but approachable. Always dressed on-trend but never overdressed.

PERSONALITY:
- Outgoing, high-energy, and magnetic — but with savvy business edge
- Knows how to work a room, win over people quickly, and make others feel important
- Represents "Visibility vs. Discretion" tension
- Sometimes appears shallow, but has a gift for making people feel seen and important

SKILLS / CONTRIBUTION:
- Expert in public image management — helps with damage control when BSS clients face scandal
- Brings in social influencer networks for fundraising, Catholic charities, and political campaigns
- Introduces the wives' club to new money / Hollywood-adjacent contacts

RELATIONSHIPS IN WIVES CLUB:
- Connector: Brings social capital and PR savvy to the wives' network
- Kendra's Ally: Immediately bonds with Kendra over fitness and branding
- Addie's Counterbalance: Where Addie is private and understated, Lila thrives on spotlight
- Grace's "Big Sister Idol": Grace admires her polish and style
- Elena's Skepticism: Elena respects her but worries about being "too much about appearances"

KEY QUOTE:
"Sometimes the story saves the mission. Perception matters as much as truth."`,
    relationships: "Wives Club member, PR/brand strategist, close to Kendra",
    bssRole: "Wives Club / PR & Branding"
  };

  // ============ SPORTS ANCHOR CHARACTERS ============
  const sportsAnchors = [
    {
      name: "Vivian Carroway",
      firstName: "Vivian",
      lastName: "Carroway",
      nickname: "Viv",
      archetype: "The Peacemaker - Sports Media Elite",
      background: `Elegant, poised, carries deep network across NFL and NBA ownership circles. Hosts annual charity galas where business, politics, and sports intersect.

MODELED ON: Samantha Ponder + Maria Taylor
- Polished, wholesome, strong family/faith ties
- Commanding presence, cross-sport expertise, strategic relationships

INFLUENCE:
Reputation manager. Her husband (hedge fund titan) bankrolls minority stakes in multiple franchises, and Viv uses that access to smooth introductions and quietly kill stories.

SYMBOL/RITUAL:
Wears a silver dove pin at events — in the Club, she's known as "The Peacemaker."`,
      relationships: "Wives Club member, married to hedge fund titan with sports franchise stakes",
      bssRole: "Wives Club / Sports Media"
    },
    {
      name: "Elena Duvall",
      firstName: "Elena",
      lastName: "Duvall",
      archetype: "Reputation Fixer - Sports Media",
      background: `A glamorous, sharp-tongued anchor turned media consultant. Whispers of scandal early in her career became her leverage to advise others on surviving scrutiny.

MODELED ON: Erin Andrews + Charissa Thompson
- Glamorous, resilient, well-connected across leagues
- Witty, approachable, balances levity with authority

INFLUENCE:
Fixer of reputations, manages controlled leaks to media and shields members' families when stories get too close.

SYMBOL/RITUAL:
Red wine ritual at Club dinners, where she "toasts away" the scandals of the week.`,
      relationships: "Wives Club member, husband is high-profile sports agent",
      bssRole: "Wives Club / Sports Media"
    },
    {
      name: "Sloane Hartwell",
      firstName: "Sloane",
      lastName: "Hartwell",
      archetype: "The Finance Keeper - Sports Media",
      background: `Stat-savvy and data-driven, known for running circles around GMs when talking numbers. Keeps soft glamour but is lethal in negotiations.

MODELED ON: Kay Adams + Molly Qerim
- Insider's insider, deep NFL connections
- Calm under pressure, ability to handle fiery personalities

INFLUENCE:
Her old-Wall-Street husband gives her access to market intelligence. She runs the Club's finance files — who owns what, who's leveraged, who's bluffing.

SYMBOL/RITUAL:
Keeps the Club's "ledger" in code, passed down at initiation.`,
      relationships: "Wives Club member, married into old Wall Street money",
      bssRole: "Wives Club / Finance & Sports Media"
    },
    {
      name: "Marisa Calderon",
      firstName: "Marisa",
      lastName: "Calderon",
      archetype: "The Conscience - Sports Media",
      background: `Latina powerhouse, commands respect with academic depth and elegant poise. Known for delivering truths in ways that sound like verdicts.

MODELED ON: Allie LaForce + Doris Burke
- Combines sports knowledge with beauty queen charisma
- Respected intellectual, transcends the "sideline" label

INFLUENCE:
Connector to Silicon Valley + sports-tech VC. She's also the Club's quiet conscience — when a move is risky morally, she makes her voice heard.

SYMBOL/RITUAL:
Carries a rosary ring, said to be kissed before each major decision.`,
      relationships: "Wives Club member, spouse runs Silicon Valley sports-tech startup",
      bssRole: "Wives Club / Sports Tech & VC"
    },
    {
      name: "Tessa Loring",
      firstName: "Tessa",
      lastName: "Loring",
      archetype: "The Storyteller - Sports Media",
      background: `Fun, approachable, but dangerous in how she weaves connections across athletes, owners, and politicians like chess moves.

MODELED ON: Jenny Taft + Charissa Thompson
- Versatile, adaptable, connected in different sports ecosystems

INFLUENCE:
Her husband is a top media executive. Tessa manages the Club's control of narrative arcs — who gets coverage, who disappears from the screen.

SYMBOL/RITUAL:
She runs the "storytelling circle," where new cover stories are crafted before launches.`,
      relationships: "Wives Club member, husband is media executive",
      bssRole: "Wives Club / Media & Narrative"
    },
    {
      name: "Raina Locke",
      firstName: "Raina",
      lastName: "Locke",
      nickname: "The Ledger",
      archetype: "The Enforcer - Sports Media",
      background: `Once the ruthless sports journalist who could end careers with a headline. Left the network world under mysterious circumstances — now plays the insider game. Based on the Ballers investigative reporter + Jemele Hill energy.

PHYSICAL DESCRIPTION:
Bold, striking presence. Sharp eyes that miss nothing. Always dressed like she's ready for either a press conference or a power dinner.

INFLUENCE:
The Club's enforcer of silence and narrative. She knows how to kill a story… or weaponize it. When leverage is needed, Raina has the dirt and knows how to drip it out.

SYMBOL/RITUAL:
A black fountain pen passed hand to hand at initiation, symbolizing power over words and reputations.

ROLE:
Bold, unafraid, still has loyalists in every newsroom. If someone betrays the Club or leaks too much, she's the one who shuts it down.`,
      relationships: "Wives Club member, former investigative sports journalist",
      bssRole: "Wives Club / Enforcement & Intel"
    }
  ];

  // ============ ORGANIZATIONS ============
  const organizations = [
    {
      name: "The Foundry",
      type: "Brotherhood / Advisory Council",
      industry: "Business Leadership",
      headquarters: "No fixed location - private gatherings",
      description: `Jasper Barrett's "Iron Sharpens Iron" Council. Not advertised, not public. A quiet order of select men who meet in private to sharpen one another and push themselves and their businesses to the edge of excellence.

NATURE:
- Not a networking group or a club, but a bond of select men
- Even within their circles, few know it exists
- No website, no flashy branding
- Just men who respect each other enough to show up and bleed honesty
- Meetings are quiet: sometimes in boardrooms, sometimes in a hunting lodge, sometimes over cigars in a dimly lit study. Always private, always off-record.

PURPOSE:
- Forge stronger men through accountability, brutal honesty, and shared wisdom
- Push each other beyond limits — in business, family, faith, fitness, and legacy
- Hold one another accountable not only for profit and power but also for living as men of integrity

RITUALS (unspoken but consistent):
- A bottle is opened, poured once — no toast, no speech. The meeting begins.
- Phones are left at the door. No recordings, no distractions.
- A question is thrown on the table — "Where are you failing right now?" — and each man must answer.
- The Foundry ends when silence lingers, meaning the work has been done.

DYNAMIC:
They don't flatter each other. They confront. They demand.
They operate as Jasper's "iron sharpeners" — the only men who can tell him he's wrong, and he'll listen.
No minutes, no structure. Just truth. And the expectation that every man leaves sharper than when he came in.

MEMBERS:
- Jasper Barrett - The Strategist
- Marcus "Max" Calderon - The Visionary
- Dominic "Dom" Arakelian - The Enforcer / Operator
- Ryan "Rex" Fraser - The Fire / Mental Toughness
- Mason "Mase" Whitlock - The Anchor / Old Brother`,
      significance: "Jasper's personal board of directors and brotherhood outside of BSS operations"
    },
    {
      name: "The Wives Club",
      type: "Secret Society / Network",
      industry: "Social Influence / Intelligence",
      headquarters: "Multiple hubs: D.C./NY, Charlotte, Boston, Colorado",
      description: `The backbone of the BSS world. Not just emotional support — they are a quiet intelligence network. Power behind the power.

STRUCTURE:
The Wives Club operates in concentric circles of trust and influence.

FOUNDING CORE:
- Elena Barrett - The Matriarch (first to hold everyone together during early BSS crises)
- Addie - The Fixer & Protector (transitioned from assistant → analyst → fixer → #3 in BSS)
- Kendra - The Firebrand (BSS analyst turned power-wife, competitive streak)
- Grace - The Younger Sister (started as "kid sister" figure, enthusiastic, full of heart)

GEOGRAPHIC HUBS:
- D.C./NY Hub: Vanessa "Nessa" Caldwell - political/media power
- Charlotte Hub: Charlotte "Charlie" Whitmore - Southern finance/PR
- Boston Hub: Dr. Layla Hassan - healthcare/biotech anchor

SUB-GROUPS:
- Shieldmaidens: Wives of operators, Catholic or supportive spouses, mission/discipline-oriented
- Owls: Former sorority women (Bella, Camila, Rachel). Some cradle Catholics, some seekers
- Vestals: Elite society women (Elena, Order connections). Mostly Catholic, tied to tradition and Vatican

THEMES:
- Power Behind the Power: Not just emotional support — a quiet intelligence network
- Sisterhood + Rivalry: Bonds of loyalty tested by ego, weddings, motherhood, and past loves
- Two Worlds Intersecting: BSS boardrooms + Catholic elite dinners
- Generational Growth: Elena (mentor), Addie (fixer), Kendra (firebrand), Grace (newbie)

FUNCTIONS:
- Trade intel, gossip, and quietly influence how BSS men will respond
- Curate narratives and shape which businesses, men, and missions get spotlighted
- Host charity galas, sports-owner dinners, or exclusive events where deals get brokered quietly`,
      significance: "The quiet power network behind BSS operations and family influence"
    }
  ];

  // ============ STORYLINES ============
  const storylines = [
    {
      title: "The Foundry: Iron Sharpens Iron",
      category: "Brotherhood / The Foundry",
      description: "How Jasper's personal advisory council operates",
      content: `THE FOUNDRY - JASPER'S IRON COUNCIL

Not advertised, not public. Even within their circles, few know it exists.
No website, no flashy branding. Just men who respect each other enough to show up and bleed honesty.

THE MEMBERS:
- Jasper Barrett - The Strategist (ties vision, grit, and discipline into action)
- Marcus "Max" Calderon - The Visionary (Ed Mylett archetype)
- Dominic "Dom" Arakelian - The Enforcer / Operator (Bedros Keuilian archetype)
- Ryan "Rex" Fraser - The Fire / Mental Toughness (Andy Frisella archetype)
- Mason "Mase" Whitlock - The Anchor / Old Brother (Jasper's lacrosse teammate)

THE RITUALS:
- A bottle is opened, poured once — no toast, no speech. The meeting begins.
- Phones are left at the door. No recordings, no distractions.
- A question is thrown on the table — "Where are you failing right now?" — and each man must answer.
- The Foundry ends when silence lingers, meaning the work has been done.

THE DYNAMIC:
Where Max brings vision, Dom brings discipline, Rex brings fire, and Mason brings grounding.
They don't flatter each other. They confront. They demand.
The friction forges sharper edges for all of them.

When Jasper is isolated from BSS or drowning in the chaos of operations, this trio is his reminder of the man behind the mission.
They represent legacy, brotherhood, and balance outside of covert ops — proof that Jasper's world is larger than just missions.`,
      characters: JSON.stringify(['Jasper Barrett', 'Marcus Calderon', 'Dominic Arakelian', 'Ryan Fraser', 'Mason Whitlock']),
      themes: JSON.stringify(['Brotherhood', 'Iron Council', 'The Foundry', 'Accountability', 'Leadership'])
    },
    {
      title: "Wives Club: The Core Circle",
      category: "Wives Club / Structure",
      description: "The founding members and their roles",
      content: `THE FOUNDING CORE OF THE WIVES CLUB

ELENA - The Matriarch
- First to hold everyone together during early BSS crises
- Seen as the "older sister" or maternal presence
- Gives perspective, encourages younger wives not to lose themselves in chaos

ADDIE - The Fixer & Protector
- Transitioned from office assistant → analyst → fixer → #3 in BSS
- Seen as "the practical one" in the club
- Balances professional and personal worlds
- Protects Grace and grounds Kendra when things spin up

KENDRA - The Firebrand
- BSS analyst turned power-wife
- Married Chris, moved next to Addie/Hawk with massive gym between estates
- Competitive streak (wedding / baby jokes, outshining)
- Hosts, organizes, and dominates most Wives' Club events

GRACE - The Younger Sister
- Started as more of a "kid sister" figure
- Emotionally raw (hospital frozen scene)
- Enthusiastic, full of heart — runs and jumps into hugs, easily overwhelmed
- Wives' Club loves to "mother" her

INTERNAL DYNAMICS:
- Addie & Kendra: Push–pull between loyalty and rivalry. Both strong, but Addie more grounded while Kendra thrives on spectacle.
- Grace & Elena: Almost like mother-daughter energy. Elena shields Grace, teaches her resilience.
- Elena & Addie: Mentor–protégé relationship, strongest trust bond in the club.`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Kendra', 'Grace']),
      themes: JSON.stringify(['Wives Club', 'Sisterhood', 'Core Circle', 'Founding Members'])
    },
    {
      title: "Wives Club: Geographic Hubs",
      category: "Wives Club / Structure",
      description: "The three geographic power centers of the Wives Club",
      content: `THE WIVES CLUB GEOGRAPHIC HUBS

D.C./NY HUB - VANESSA "NESSA" CALDWELL
The "Closer"
- Senior Counsel & Policy Advisor
- Political/media credibility
- Access to lawmakers, lawyers, and journalists
- Can kill a bill, push a story, or bury a scandal
- Married to D.C./NY-based BSS intel/liaison operator

CHARLOTTE HUB - CHARLOTTE "CHARLIE" WHITMORE
The "Connector"
- Ph.D. candidate, finding her footing
- Hosts social events
- Ties group into Charlotte finance, philanthropy, NASCAR, and corporate networks
- Married to Charlotte-based BSS Southeast ops leader

BOSTON HUB - DR. LAYLA HASSAN
The "Anchor"
- Director of Clinical Operations
- Mediates disputes, keeps ethics in play
- Ties group into Boston's healthcare and biotech elite
- Married to Boston-based BSS biotech/defense operator

TRIAD REACH:
- Nessa (D.C./NY): Political/media strategist — outsider edge
- Charlie (Charlotte): Social/PR connector — Southern power hub
- Layla (Boston): Healthcare/biotech anchor — moral compass

Together, they form a triangle of influence: politics/media, finance/PR, and healthcare/biotech — mirroring their husbands' operator placements and widening the Wives Club's reach across the U.S.`,
      characters: JSON.stringify(['Vanessa Caldwell', 'Charlotte Whitmore', 'Dr. Layla Hassan']),
      themes: JSON.stringify(['Wives Club', 'Geographic Hubs', 'Influence', 'Power Network'])
    },
    {
      title: "Wives Club: Sub-Groups",
      category: "Wives Club / Structure",
      description: "The three internal sub-groups within the Wives Club",
      content: `THE WIVES CLUB SUB-GROUPS

SHIELDMAIDENS
- Wives of operators
- Catholic or supportive spouses
- Mission/discipline-oriented
- Core membership: operator wives who understand the lifestyle
- Focus: family resilience, operational security, mutual support

THE OWLS
- Former sorority women
- Members: Bella, Camila, Rachel
- Some cradle Catholics, some seekers
- Focus: social connections, friendship, networking
- Bridge between old world and new

THE VESTALS
- Elite society women
- Members: Elena, Order connections (EOHSJ, Malta)
- Mostly Catholic, tied to tradition and Vatican
- Focus: philanthropy, Catholic networks, high society
- Connect BSS world to European/Vatican circles

HOW THEY INTERSECT:
The sub-groups aren't separate clubs — they're overlapping circles within the larger Wives Club.
A woman might be a Shieldmaiden (operator wife) and also an Owl (sorority background) or a Vestal (society connections).
The structure allows different entry points and areas of expertise while maintaining the core sisterhood.`,
      characters: JSON.stringify(['Bella', 'Elena Barrett', 'Camila', 'Rachel']),
      themes: JSON.stringify(['Wives Club', 'Sub-Groups', 'Shieldmaidens', 'Owls', 'Vestals'])
    },
    {
      title: "Wives Club: Sports Media Circle",
      category: "Wives Club / Sports Media",
      description: "The sports anchor members and their influence",
      content: `THE SPORTS MEDIA CIRCLE

These women curate narratives, much like they did on air: shaping which businesses, men, and missions get spotlighted. Their skills in eloquence + networking make them the "public face whisperers."

VIVIAN "VIV" CARROWAY - The Peacemaker
- Elegant, diplomatic, hosts major sports galas
- Network across NFL and NBA ownership circles
- Husband bankrolls minority stakes in multiple franchises
- Symbol: Silver dove pin

ELENA DUVALL - The Reputation Fixer
- Glamorous, sharp-tongued anchor turned media consultant
- Manages controlled leaks to media
- Shields members' families when stories get too close
- Symbol: Red wine toast at dinners

SLOANE HARTWELL - The Finance Keeper
- Stat-savvy and data-driven
- Runs circles around GMs when talking numbers
- Keeps the Club's "ledger" in code
- Access to Wall Street market intelligence

MARISA CALDERON - The Conscience
- Latina powerhouse with academic depth
- Connector to Silicon Valley + sports-tech VC
- The Club's quiet conscience on moral issues
- Symbol: Rosary ring kissed before decisions

TESSA LORING - The Storyteller
- Fun, approachable, weaves connections like chess moves
- Husband is top media executive
- Controls narrative arcs — who gets coverage, who disappears
- Runs the "storytelling circle"

RAINA LOCKE - The Ledger
- Former ruthless sports journalist
- The Club's enforcer of silence and narrative
- Knows how to kill or weaponize a story
- Symbol: Black fountain pen at initiation

THEIR ROLE:
They host charity galas, sports-owner dinners, or exclusive sideline events where deals get brokered quietly. Together: Viv + Sloane = balance sheet and big-picture deals; Elena + Tessa = spin masters of public narrative; Marisa = conscience + connector; Raina = the hammer.`,
      characters: JSON.stringify(['Vivian Carroway', 'Elena Duvall', 'Sloane Hartwell', 'Marisa Calderon', 'Tessa Loring', 'Raina Locke']),
      themes: JSON.stringify(['Wives Club', 'Sports Media', 'Influence', 'Narrative Control'])
    },
    {
      title: "Lila Beaumont: The PR Powerhouse",
      category: "Wives Club / PR",
      description: "Lila's role as the social media and PR expert",
      content: `LILA BEAUMONT - THE PR POWERHOUSE

Inspired by Lacey Beeman
Former lifestyle & wellness influencer turned brand strategist for elite families and nonprofits.

ROLE IN WIVES CLUB:
- Connector: Brings social capital and PR savvy to the wives' network
- Expert in public image management
- Helps with damage control when BSS clients face scandal
- Brings in social influencer networks for fundraising, Catholic charities, and political campaigns
- Introduces the wives' club to new money / Hollywood-adjacent contacts

KEY RELATIONSHIPS:
- Kendra's Ally: Immediately bonds with Kendra over fitness and branding; the two scheme events together (sometimes to Addie's annoyance)
- Addie's Counterbalance: Where Addie is private and understated, Lila thrives on spotlight and visibility. Their differences make for great tension.
- Grace's "Big Sister Idol": Grace admires her polish and style — Lila takes Grace shopping and to influencer-style workouts, though Elena sometimes rolls her eyes at it.
- Elena's Skepticism: Elena respects her but worries about her being "too much about appearances."

KEY SCENES:

THE GALA ENTRANCE:
Lila walks into her first gala with Kendra, both stunning, commanding attention.
Addie notices how fast she draws people in.
Hawk makes a wry comment: "She's like a PR department in heels."

THE STRATEGY DINNER:
BSS faces a reputation issue; Lila coaches the wives on how to present themselves.
She tells Addie: "You don't have to love the spotlight — but you have to own it when it finds you."

THE CLASH WITH ADDIE:
Addie catches Lila posting something too revealing about a BSS client event.
Tense conversation where Addie warns her about operational security.
Lila pushes back: "Sometimes the story saves the mission. Perception matters as much as truth."

THEMES:
- Visibility vs. Discretion: She represents the tension between public image and secret operations
- Style vs. Substance: Challenges the wives to embrace polish without losing authenticity`,
      characters: JSON.stringify(['Lila Beaumont', 'Addie', 'Kendra', 'Grace', 'Elena Barrett', 'Hawk']),
      themes: JSON.stringify(['Wives Club', 'PR', 'Social Media', 'Public Image', 'Visibility'])
    },
    {
      title: "Wives Club Scene: Hospital Vigil",
      category: "Wives Club / Scenes",
      description: "The founding moment of the Wives Club",
      content: `HOSPITAL VIGIL - THE FOUNDING MOMENT

Elena, Addie, Grace spend the night during Elena's medical crisis.
This becomes the seed of the Wives Club — the emotional glue forms here.

THE SCENE:
Hospital waiting room, 3am.
Elena is in surgery or recovery.
Addie sits rigid, handling logistics, making calls.
Grace is frozen in trauma — can't speak, can't move.

THE BOND:
Addie notices Grace's paralysis and sits beside her.
She doesn't force conversation. Just presence.
Hours pass. Coffee runs. Whispered fears.

By morning, something has shifted.
These aren't just colleagues or acquaintances anymore.
They've shared the vigil.

THE AFTERMATH:
This night becomes the origin story they reference later.
"Remember the hospital?" becomes shorthand for deep trust.
The Wives Club grows from this seed — women who've seen each other at their most vulnerable.`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Grace']),
      themes: JSON.stringify(['Wives Club', 'Hospital', 'Founding Moment', 'Sisterhood'])
    },
    {
      title: "Wives Club Scene: Baby Shower Overload",
      category: "Wives Club / Scenes",
      description: "Grace's overwhelming baby shower",
      content: `BABY SHOWER OVERLOAD

Kendra leads the charge in showering Grace with endless items, books, advice.
Grace panics ("I'm not ready!").
Addie takes her aside to calm her down.
Elena delivers wisdom about motherhood being "imperfect but holy."

THE SCENE:
The living room is drowning in gifts.
Baby clothes in every color. Books on sleep training. Organic everything.
Kendra is in her element, orchestrating the chaos.

Grace stands in the middle, eyes wide, slightly hyperventilating.
"There's so much. I don't even know where to start."

THE INTERVENTION:
Addie notices Grace's panic and gently guides her to the kitchen.
"Breathe. You don't have to figure it all out today."

Grace: "What if I'm terrible at this?"

Addie: "Everyone's terrible at first. That's the secret. You just keep showing up."

THE WISDOM:
Elena joins them, glass of sparkling water in hand.
"Motherhood is imperfect. Gloriously, messily imperfect."
She pauses. "And somehow, that's what makes it holy."

Grace exhales. Not fixed, but steadied.
They return to the chaos together.`,
      characters: JSON.stringify(['Grace', 'Kendra', 'Addie', 'Elena Barrett']),
      themes: JSON.stringify(['Wives Club', 'Baby Shower', 'Motherhood', 'Support'])
    },
    {
      title: "Wives Club Scene: Wedding Rivalry",
      category: "Wives Club / Scenes",
      description: "Kendra and Addie's playful wedding competition",
      content: `WEDDING RIVALRY

Kendra jokes about wanting to overshadow Addie's wedding.
Hawk overhears → sets up playful banter.
Adds tension but cements their "sisters who bicker but love" dynamic.

THE SETUP:
Wedding planning is in full swing.
Kendra leans over the table of fabric swatches and floral arrangements.

Kendra: "I mean, my reception is going to have fireworks. Actual fireworks. No offense, Addie."

Addie raises an eyebrow. "None taken. Some of us don't need pyrotechnics."

HAWK ENTERS:
Hawk walks in, catches the tail end.
"Are we comparing explosions? Because I can contribute to that conversation."

Kendra: "Your wife is being boring about her wedding."

Hawk: "My wife could get married in a barn and still outclass everyone."

Kendra: "Challenge accepted."

THE DYNAMIC:
They bicker. They compete.
But underneath, there's no real malice — just sisters sharpening each other.
The rivalry makes both weddings better.
And when each day comes, they're in each other's wedding parties, crying during the vows.`,
      characters: JSON.stringify(['Kendra', 'Addie', 'Hawk']),
      themes: JSON.stringify(['Wives Club', 'Wedding', 'Rivalry', 'Sisters'])
    },
    {
      title: "Wives Club Scene: Crisis Strategy Night",
      category: "Wives Club / Scenes",
      description: "The wives gather to respond to a BSS scandal",
      content: `CRISIS STRATEGY NIGHT

When a major scandal hits, the wives gather separately.
They trade intel, gossip, and quietly influence how BSS men will respond.
Showcases their own power as an informal intelligence hub.

THE SCENE:
Elena's living room, late evening.
Phones are buzzing. The news just broke.
A BSS client is in trouble — and the blowback could touch the foundation.

THE GATHERING:
Nessa (D.C. connections) arrives first: "I've already made three calls. We can contain this if we move fast."

Lila (PR): "We need to get ahead of the narrative. Who's doing the press strategy?"

Layla (the anchor): "Before we spin anything — what's the truth? We need to know what we're actually dealing with."

THE STRATEGY:
Addie takes charge: "Here's what we know. Here's what we don't. Let's fill the gaps before we decide on messaging."

Elena observes quietly, then speaks: "Whatever we decide, we protect the families first. The business will survive. People's trust won't if we lie."

THE OUTCOME:
By midnight, they have a plan.
The men will wake up to a situation that's already being managed.
They'll never know how much of the solution came from this room.

That's the point.`,
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Vanessa Caldwell', 'Lila Beaumont', 'Dr. Layla Hassan']),
      themes: JSON.stringify(['Wives Club', 'Crisis', 'Strategy', 'Intelligence', 'Power'])
    }
  ];

  // ============ ADD CHARACTERS ============
  console.log("--- Adding Foundry Members ---");
  for (const char of foundryMembers) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  console.log("\n--- Adding Operator Wives ---");
  for (const char of operatorWives) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  console.log("\n--- Adding Lila Beaumont ---");
  const existingLila = await prisma.character.findFirst({
    where: { name: lilaBeaumont.name, projectId: project.id }
  });
  if (!existingLila) {
    await prisma.character.create({
      data: { projectId: project.id, ...lilaBeaumont }
    });
    console.log(`Created: ${lilaBeaumont.name}`);
  } else {
    await prisma.character.update({
      where: { id: existingLila.id },
      data: lilaBeaumont
    });
    console.log(`Updated: ${lilaBeaumont.name}`);
  }

  console.log("\n--- Adding Sports Anchor Characters ---");
  for (const char of sportsAnchors) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ============ ADD ORGANIZATIONS ============
  console.log("\n--- Adding Organizations ---");
  for (const org of organizations) {
    const existing = await prisma.organization.findFirst({
      where: { name: org.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({
        data: { projectId: project.id, ...org }
      });
      console.log(`Created: ${org.name}`);
    } else {
      await prisma.organization.update({
        where: { id: existing.id },
        data: org
      });
      console.log(`Updated: ${org.name}`);
    }
  }

  // ============ ADD STORYLINES ============
  console.log("\n--- Adding Storylines ---");
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

  // ============ JAX SLOANE ============
  const jaxSloane = {
    name: "Jacqueline Sloane",
    firstName: "Jacqueline",
    lastName: "Sloane",
    nickname: "Jax",
    archetype: "Cyber Warrior / External Fixer",
    background: `Former U.S. Army Cyber and Information Operations officer, attached to Special Operations for much of her career. Modeled off Jax Scott.

EDUCATION:
- West Point grad
- Master's in cybersecurity from MIT

MILITARY CAREER:
- Served multiple tours in Middle East and Eastern Europe
- Specialized in psychological operations and cyber exploitation
- Daughter of a Marine officer and a teacher
- Grew up disciplined, competitive, with a sharp mind for tech
- Raised Catholic, altar server as a kid, faith still quiet but present

CURRENT DUAL CAREERS:
1. Runs a boutique AI-driven crisis intelligence firm that advises governments, private equity groups, and the Vatican on disinformation campaigns and emerging tech threats.
2. Cybersecurity CEO - built a company from the ground up after leaving the Army

PHYSICAL DESCRIPTION:
Strong, athletic build. Shoulder-length brunette hair, usually in a no-nonsense style. Minimal makeup, prefers sharp suits or tactical casual. Doesn't need glamour — owns rooms with confidence, bluntness, and brainpower.

PERSONALITY:
- Direct: Calls BS instantly, no tolerance for shallow people
- Witty: Dry humor, often makes cutting remarks that leave the room silent
- Loyal: Fierce protector of her inner circle, especially women she sees as vulnerable
- Disciplined: Runs 5am workouts, lives like she's still in the military
- Faithful (Quietly): Not overt, but sense of service and sacrifice is rooted in Catholic upbringing

RELATIONSHIPS IN WIVES CLUB:
- Addie & Hawk: Trusted external partner — the one Addie calls when cyber or information warfare bleeds into their crises
- Elena: Mutual respect, though Jax finds Elena "too soft" sometimes
- Harper: Harper sees her as invaluable and introduces her to the circle
- Kendra: They clash — Jax thinks Kendra is "performative," Kendra thinks Jax is "too blunt"
- Trophy Wives: Terrified of her. She doesn't even acknowledge them unless necessary

KEY QUOTE:
"Funny thing about silk gowns — they don't stop bullets or hackers."`,
    relationships: "External advisor to Wives Club, cyber/intel expert, West Point grad",
    bssRole: "External Fixer / Cyber Intelligence"
  };

  console.log("\n--- Adding Jax Sloane ---");
  const existingJax = await prisma.character.findFirst({
    where: { name: jaxSloane.name, projectId: project.id }
  });
  if (!existingJax) {
    await prisma.character.create({
      data: { projectId: project.id, ...jaxSloane }
    });
    console.log(`Created: ${jaxSloane.name}`);
  } else {
    await prisma.character.update({
      where: { id: existingJax.id },
      data: jaxSloane
    });
    console.log(`Updated: ${jaxSloane.name}`);
  }

  // ============ TROPHY WIVES ============
  const trophyWives = [
    {
      name: "Brittany LaSalle",
      firstName: "Brittany",
      lastName: "LaSalle",
      archetype: "Trophy Wife - The Queen Bee Gold Digger",
      background: `Age: 42 (looks mid-30s thanks to surgery & constant maintenance)
Married her billionaire husband straight out of college sorority life. Never worked a day. Runs on Botox, luxury shopping, and private jets.

PERSONALITY:
Snobby, dismissive of anyone who actually "works." Thinks philanthropy is a photo op.

DYNAMIC:
- Disliked by Addie for being shallow
- Clashes with Cami who calls her "plastic Barbie"
- Kendra tolerates her at events but rolls her eyes constantly
- Known for throwing the biggest parties that everyone hates going to but can't ignore`,
      relationships: "Trophy Wife, married to billionaire",
      bssRole: "Wives Club / Trophy Wives"
    },
    {
      name: "Tiffany Vaughn",
      firstName: "Tiffany",
      lastName: "Vaughn",
      archetype: "Trophy Wife - The Ice Queen",
      background: `Age: 50 (looks 35, endless cosmetic work)
Old money marriage, used her looks to climb from wealthy man to wealthier man. Known for never lifting a finger outside of fashion shoots and galas.

PERSONALITY:
Cold, calculating, always dressed flawlessly, sees other wives as "competition."

DYNAMIC:
- Elena finds her exhausting
- Isa pities her but avoids her
- Addie describes her as "a mannequin with diamonds"
- She intimidates younger wives like Grace, who are unsure whether to fear or laugh at her
- Often seen whispering with Chloe Davenport`,
      relationships: "Trophy Wife, old money marriage",
      bssRole: "Wives Club / Trophy Wives"
    },
    {
      name: "Madison Cross",
      firstName: "Madison",
      lastName: "Cross",
      nickname: "Maddie",
      archetype: "Trophy Wife - The Social Media Princess",
      background: `Age: 28 (the youngest of the Trophy Five)
Married a venture capitalist twice her age. Runs a luxury lifestyle Instagram with millions of followers. No career, but endless brand deals thanks to her husband's money and name.

PERSONALITY:
Sweet, bubbly, naive — she actually is liked by the group because she's kind and non-threatening.

DYNAMIC:
- Grace adores her (sees her as "cool big sister")
- Harper likes her innocence, takes her under her wing
- Addie tolerates her, realizing she's harmless
- Cami teases her endlessly but protects her when others are cruel

NOTE: The exception among trophy wives — genuinely liked and defended by the others.`,
      relationships: "Trophy Wife, married to venture capitalist, lifestyle influencer",
      bssRole: "Wives Club / Trophy Wives"
    },
    {
      name: "Vanessa Moretti",
      firstName: "Vanessa",
      lastName: "Moretti",
      archetype: "Trophy Wife - The Glamorous Diva",
      background: `Age: 39
Former Miss Italy runner-up who married a shipping magnate. Known for her beauty and scandalous past affairs. Never worked, but always jetting between Europe and Miami.

PERSONALITY:
Loud, flirtatious, thrives on drama. Always the center of attention, usually inappropriately dressed for solemn occasions.

DYNAMIC:
- Addie considers her a "liability at galas"
- Harper avoids her at all costs
- Kendra secretly loves gossiping about her
- Isa finds her vulgar
- Men always notice her → makes other wives tense`,
      relationships: "Trophy Wife, former Miss Italy runner-up, married to shipping magnate",
      bssRole: "Wives Club / Trophy Wives"
    },
    {
      name: "Chloe Davenport",
      firstName: "Chloe",
      lastName: "Davenport",
      archetype: "Trophy Wife - The Southern Belle Trophy",
      background: `Age: 34
Married into oil wealth from Texas. Never worked, spends days at the country club. Picture-perfect Barbie looks, but with a mean-girl streak.

PERSONALITY:
Polite to your face, cruel behind your back. Obsessed with appearances and hierarchy.

DYNAMIC:
- Elena distrusts her
- Cami once told her off in Spanish during a charity dinner ("At least I work for my people, you just pose for yours")
- Grace avoids her because she feels bullied
- Often seen whispering with Tiffany (the Ice Queen)`,
      relationships: "Trophy Wife, married into Texas oil wealth",
      bssRole: "Wives Club / Trophy Wives"
    }
  ];

  // ============ BUBBLE TROPHY WIVES ============
  const bubbleTrophyWives = [
    {
      name: "Savannah Brooks",
      firstName: "Savannah",
      lastName: "Brooks",
      archetype: "Bubble Trophy Wife - Former Cheerleader",
      background: `Age: 33
NFL cheerleader in her 20s → married a retired star quarterback. She was his arm candy, then transitioned into "sports wife" circles. Never worked outside of cheering and charity photo ops.

PERSONALITY:
Bubbly, friendly, loves gossip but not malicious.

DYNAMIC:
- Grace likes her energy but thinks she's shallow
- Kendra rolls her eyes at her "cheerleader wisdom" but secretly appreciates her loyalty
- Addie respects that Savannah knows she's lucky and doesn't pretend otherwise
- She's tolerated — not respected like Elena or Isa, but not despised like Tiffany`,
      relationships: "Sports wife, former NFL cheerleader, married to retired quarterback",
      bssRole: "Wives Club / Bubble Trophy"
    },
    {
      name: "Natalia Reyes",
      firstName: "Natalia",
      lastName: "Reyes",
      archetype: "Bubble Trophy Wife - The Runway Beauty",
      background: `Age: 37
Former Victoria's Secret–level model from Brazil. Married a billionaire hotel tycoon who discovered her at a fashion show. Never built a career beyond modeling → now lives between yachts and penthouses.

PERSONALITY:
Stunning, aloof, used to being worshipped. Struggles with purpose now that her modeling days are behind her.

DYNAMIC:
- Isa pities her, seeing emptiness behind the beauty
- Cami pokes fun at her "model diet" constantly
- Elena offers her compassion, tries to nudge her toward philanthropy
- Men still stare at her, which causes tension at every event`,
      relationships: "Former supermodel, married to hotel tycoon",
      bssRole: "Wives Club / Bubble Trophy"
    },
    {
      name: "Haley Monroe",
      firstName: "Haley",
      lastName: "Monroe",
      archetype: "Bubble Trophy Wife - The Pageant Darling",
      background: `Age: 29
Miss Teen USA turned Miss America finalist. Married a real estate mogul in his 50s who bankrolls her "charity" work. Known for being photogenic, not effective.

PERSONALITY:
Polished and sweet in public, insecure and anxious in private.

DYNAMIC:
- Grace likes her sincerity, sees her as a "princess figure"
- Harper recognizes her loneliness and gently encourages her
- Kendra mocks her "pageant answers" behind closed doors
- She's on the bubble: could grow into something real, or remain a shallow socialite`,
      relationships: "Former Miss America finalist, married to real estate mogul",
      bssRole: "Wives Club / Bubble Trophy"
    },
    {
      name: "Jasmine Clarke",
      firstName: "Jasmine",
      lastName: "Clarke",
      archetype: "Bubble Trophy Wife - The Party Girl",
      background: `Age: 31
LA bottle-service model who married a venture capitalist. Known for being the life of every party, always photographed in nightclubs before her marriage. Now a "socialite wife."

PERSONALITY:
Fun, loud, loves champagne, but lacks discipline.

DYNAMIC:
- Cami sees her as "entertainment, not substance"
- Addie doesn't trust her discretion around sensitive BSS events
- Grace is dazzled but kept away from her by Elena
- Still invited because she's "fun," but constantly at risk of embarrassing the circle`,
      relationships: "Former bottle-service model, married to venture capitalist",
      bssRole: "Wives Club / Bubble Trophy"
    },
    {
      name: "Lily Summers",
      firstName: "Lily",
      lastName: "Summers",
      archetype: "Bubble Trophy Wife - The Sweet Small-Town Beauty",
      background: `Age: 25 (the youngest)
Small-town beauty queen who married a hedge fund manager in his 40s. She never worked, but unlike the others, she's genuinely kind and humble. Still learning the "rules" of high society.

PERSONALITY:
Innocent, earnest, always eager to help — but often naïve.

DYNAMIC:
- Grace loves her, they bond like sisters
- Elena protects her from cattier wives
- Kendra finds her boring
- Harper sees potential and invests in her growth
- She's liked despite her "trophy wife" status because she's real`,
      relationships: "Small-town beauty queen, married to hedge fund manager",
      bssRole: "Wives Club / Bubble Trophy"
    }
  ];

  console.log("\n--- Adding Trophy Wives ---");
  for (const char of trophyWives) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  console.log("\n--- Adding Bubble Trophy Wives ---");
  for (const char of bubbleTrophyWives) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ============ ADDITIONAL STORYLINES ============
  const additionalStorylines = [
    {
      title: "Trophy Wives vs Women of Substance",
      category: "Wives Club / Dynamics",
      description: "The contrast between trophy wives and the core Wives Club members",
      content: `THE TROPHY FIVE

These are the "perfect ten" trophy wife characters who serve as contrast (and sometimes conflict) inside the Wives' Club. Each is beautiful, but their reputations and dynamics vary.

THE FIVE:
1. Brittany LaSalle - The Queen Bee Gold Digger (42, looks mid-30s)
2. Tiffany Vaughn - The Ice Queen (50, looks 35)
3. Madison "Maddie" Cross - The Social Media Princess (28, the likeable one)
4. Vanessa Moretti - The Glamorous Diva (39, former Miss Italy)
5. Chloe Davenport - The Southern Belle Trophy (34, Texas oil money)

GROUP DYNAMICS:
- Disliked by most wives for being shallow, useless, or toxic
- Maddie (the youngest) is the exception — genuinely liked and defended by others
- They serve as foils: showing contrast between women of substance vs women of appearance only
- Add drama to galas, dinners, and charity events
- Reinforce that the Wives' Club is about strength, faith, and resilience — not just beauty and status

THE BUBBLE WIVES:
These are on the bubble — not full villains, but not equals to Addie, Elena, or Harper either:
- Savannah Brooks (former NFL cheerleader)
- Natalia Reyes (former supermodel)
- Haley Monroe (former Miss America finalist)
- Jasmine Clarke (former party girl)
- Lily Summers (sweet small-town beauty queen)

Some could evolve into true allies. Others will probably drift into scandals or fade into irrelevance.`,
      characters: JSON.stringify(['Brittany LaSalle', 'Tiffany Vaughn', 'Madison Cross', 'Vanessa Moretti', 'Chloe Davenport', 'Savannah Brooks', 'Natalia Reyes', 'Haley Monroe', 'Jasmine Clarke', 'Lily Summers']),
      themes: JSON.stringify(['Trophy Wives', 'Contrast', 'Substance vs Surface', 'Drama'])
    },
    {
      title: "Jax Sloane: The Cyber Warrior",
      category: "Wives Club / External Fixer",
      description: "Jax's role as the cyber/intel expert for the Wives Club",
      content: `JACQUELINE "JAX" SLOANE - THE CYBER WARRIOR

Former U.S. Army Cyber and Information Operations officer, West Point grad, MIT master's. Now runs a boutique AI-driven crisis intelligence firm AND a cybersecurity company.

KEY SCENES:

FIRST INTRODUCTION:
At a Florida retreat, Harper introduces Jax to the wives.
Kendra smirks at her plain black suit. Jax deadpans: "I don't do glitter. I do results."
Cami bursts out laughing: instant bond.

CRISIS BRIEFING:
BSS faces a coordinated disinformation attack online.
Jax lays out the digital battlefield with brutal clarity: "This isn't trolls. It's a hostile state actor with AI muscle. And you're already three moves behind."
Addie is impressed by her precision.

MENTORSHIP MOMENT:
Grace confides in Jax about feeling small compared to the perfect wives.
Jax takes her on a run at dawn, telling her: "Stop measuring yourself against them. Be a fighter, not a follower."

SHOWDOWN:
At a gala, one of the shallow trophy wives tries to belittle Jax's plain outfit.
Jax smiles faintly: "Funny thing about silk gowns — they don't stop bullets or hackers."
Silence. Elena hides a grin.

THEMES SHE BRINGS:
- Substance vs. Surface: A foil to the trophy wives
- Faith in Action: A modern Catholic warrior-scholar archetype
- Mentorship: Especially valuable for Grace
- Edge: Keeps the Wives' Club grounded in real-world threats, not just social games`,
      characters: JSON.stringify(['Jacqueline Sloane', 'Harper', 'Kendra', 'Grace', 'Elena Barrett', 'Addie']),
      themes: JSON.stringify(['Cyber Security', 'Military', 'Mentorship', 'Substance vs Surface'])
    }
  ];

  console.log("\n--- Adding Additional Storylines ---");
  for (const storyline of additionalStorylines) {
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
  const orgCount = await prisma.organization.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Organizations: ${orgCount}`);
  console.log(`Storylines: ${storyCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
