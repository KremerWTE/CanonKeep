/**
 * Populate Full Canon - Complete story database with all details
 * Characters, Crises, Organizations, Book Series, and Timelines
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Populating complete story canon...\n');

  const project = await prisma.project.findFirst({
    where: { name: 'Five Feet From Home' },
  });

  if (!project) {
    console.log('Project not found. Run create-canon.ts first.');
    return;
  }

  // =====================================================
  // ENHANCED CHARACTER PROFILES
  // =====================================================
  console.log('Updating character profiles with full details...\n');

  // Clear and recreate characters with full details
  await prisma.characterRelationship.deleteMany({ where: { fromCharacter: { projectId: project.id } } });
  await prisma.character.deleteMany({ where: { projectId: project.id } });

  const characters = await createCharacters(project.id);
  console.log(`Created ${characters.length} detailed character profiles.\n`);

  // Create relationships
  await createRelationships(project.id);
  console.log('Created character relationships.\n');

  // =====================================================
  // CRISES & CASES
  // =====================================================
  console.log('Creating crises and cases...\n');
  await prisma.crisis.deleteMany({ where: { projectId: project.id } });
  await createCrises(project.id);
  console.log('Created crises database.\n');

  // =====================================================
  // ORGANIZATIONS
  // =====================================================
  console.log('Creating organizations...\n');
  await prisma.organization.deleteMany({ where: { projectId: project.id } });
  await createOrganizations(project.id);
  console.log('Created organizations.\n');

  // =====================================================
  // BOOK SERIES
  // =====================================================
  console.log('Creating book series structure...\n');
  await prisma.bookSeries.deleteMany({ where: { projectId: project.id } });
  await createBookSeries(project.id);
  console.log('Created book series.\n');

  console.log('=' .repeat(60));
  console.log('FULL CANON POPULATION COMPLETE');
  console.log('=' .repeat(60));
}

async function createCharacters(projectId: string) {
  const characterData = [
    // ===== CORE FAMILY =====
    {
      name: 'Jasper Barrett',
      aliases: JSON.stringify(['Jasper', 'Jas']),
      archetype: 'Protagonist',
      age: '36-38 years old',
      background: `Born in Gastonia, North Carolina (just outside Charlotte). Blue-collar family: father worked shifts in textile plant (later closed), mother ran hair salon from home. First in family to attend college.

EDUCATION: Construction Management at Appalachian State University.

PRE-BSS CAREER:
- Post-college: Project coordinator at mid-tier construction/development firm in Charlotte, barely making ends meet under mediocre leadership
- The Breakthrough (8 years ago): Volunteered for floundering luxury hotel renovation project in Charlotte that others avoided. Successfully pulled project back from brink. This is where Jessica first noticed him and Harper saw him while shadowing her PE firm's senior partner.
- Director of Special Projects for Victor Langford (Charlotte PE magnate) - gave him three high-value clients and insider access to global operations, private equity moves, backchannel deals
- Founded BSS with Jessica's encouragement and Harper's investor connections

FORMATIVE MEMORY: Scraping by with Elena - fridge with only condiments, counting change for gas. This fear of returning to poverty drives his workaholism.`,
      appearance: 'Dark hair, sharp jawline, expressive eyes that can turn ice-cold when focused. Keeps scruff unless presenting to boardroom. Lean, athletic build with restless "always in motion" posture. Coiled-spring feel even in quiet scenes. Guarded charisma.',
      motivations: 'To be the best crisis manager in the world. To protect his clients. Secretly: to prove he can have both career success and family. Deep fear of returning to poverty drives compulsive work.',
      fears: 'Losing control. Missing something critical. Being exposed as someone who chose work over family one too many times. Returning to poverty.',
      flaw: 'Workaholism. Cannot delegate. Believes he must personally solve every crisis. His "Five Foot World" mindset blinds him to the bigger picture at home. Success addiction.',
      secrets: 'He knows his marriage is at a breaking point but keeps choosing work anyway. Part of him is terrified the poverty of his youth will return if he ever lets up.',
      voiceNotes: 'Commands rooms. Short, direct sentences under pressure. More reflective and vulnerable with Elena and Grace. Uses military-style briefing language at work. Southern roots occasionally surface.',
      arcStart: 'Work 90% / Family 10% - believes this sacrifice is necessary to secure their future',
      arcChange: 'Elena\'s health scare forces confrontation with what he\'s actually prioritizing',
      arcEnd: 'Aspires to Work 60% / Family 40% - learning to trust his team and be present',
    },
    {
      name: 'Elena Barrett',
      aliases: JSON.stringify(['Elena', 'Elena Davenport']),
      archetype: 'Female Lead / Heart of the Story',
      age: 'Late 30s',
      background: `Georgetown graduate. Previously worked in luxury real estate market specializing in penthouses, historic estates, and resort properties in NY and international markets. Thrived on adrenaline of closing big deals, reading hidden motivations of high-net-worth buyers. Frequently flew to property expos in London, Dubai, Hong Kong; did private showings in resort locations.

CAREER BEFORE GRACE:
- Wore tailored suits, designer heels, understated expensive jewelry
- Polished people skills, could close multimillion-dollar deals
- Jet-setting lifestyle similar to Jasper's current travel

TRANSITION:
- Pulled back during Grace's pregnancy and market shift
- Told herself it would be temporary but found constant travel didn't fit with newborn
- Now runs photography studio and teaches classes part-time
- Sees world through composition and light, frames moments Jasper would rush past

CURRENT ROLE: Founded/runs Maison Aurelia (luxury event planning/lifestyle management firm). Re-entering as full CEO, restructuring to focus on global events: cultural diplomacy dinners, Vatican-linked fundraisers, Fortune 100 summits.`,
      appearance: 'Warm olive skin that holds onto sunlight longer than season allows. Dark brown hair, usually pulled back in loose knot or braid. Eyes the color of strong tea—deep enough that Jasper feels they catch the part of him unsaid. Smile that doesn\'t arrive all at once—begins with eyes, spreads slowly. Dresses simply: soft sweaters, worn jeans, flats or boots; comfort without carelessness. Understated, practical elegance.',
      motivations: 'Protecting her family\'s center of gravity. Building a creative life that matters. Helping Jasper see what he\'s missing without forcing the issue.',
      fears: 'That Jasper will wake up one day and realize he missed Grace\'s entire childhood. That she\'s become invisible in her own marriage. Losing herself in service to his career.',
      flaw: 'Sometimes too patient. Waits for Jasper to see the distance himself rather than confronting it directly. Can suppress her own needs to keep peace.',
      secrets: 'Misses the thrill of her real estate career more than she admits. Sometimes resents the sacrifice even though she chose it.',
      voiceNotes: 'Quietly intelligent, keen observer, rarely wastes words. Dry, understated humor that surfaces at exactly the right time. Not intimidated by Jasper\'s high-intensity career.',
      arcStart: 'Supporting Jasper\'s career while quietly building her own smaller world',
      arcChange: 'Health scare becomes catalyst for rebalancing the marriage',
      arcEnd: 'Returns to CEO role with Maison Aurelia, creating collaborative jet-setting schedule where only one parent is away at a time',
    },
    {
      name: 'Grace Barrett',
      aliases: JSON.stringify(['Grace', 'Gracie']),
      archetype: 'The Emotional Truth-Teller (Child)',
      age: '10-11 years old',
      background: 'Attends private academy in Charlotte. Favorite teacher is Miss Donnelly (literature & history). Mature for her age thanks to growing up with dad often away and mom fiercely independent. Has artistic streak - keeps sketchbooks. Loves playing soccer.',
      appearance: 'Brown hair, expressive eyes. Always seems to be quietly assessing the adults around her.',
      motivations: 'Wants her dad to actually be present, not just physically there. Wants to understand the adult world around her.',
      fears: 'That her dad loves his job more than her. That things will never change.',
      flaw: 'Can be too perceptive - sees through adult excuses in ways that make them uncomfortable.',
      secrets: 'Keeps a journal of all the times her dad has missed important events.',
      voiceNotes: 'Witty in a subtle way - drops one-liners that make even stressed Jasper laugh. Has a soft, almost shy side that comes out when unsure of her place in dad\'s high-intensity life.',
      arcStart: 'Resigned to her dad\'s absence, has learned to not expect him',
      arcChange: 'Hospital scare bonds her with Addie, forces Jasper to see her fear',
      arcEnd: 'Asks "the five feet question" that reframes Jasper\'s entire worldview',
    },
    {
      name: 'Lucas Barrett',
      aliases: JSON.stringify(['Lucas']),
      archetype: 'Symbol of New Beginning (Child)',
      age: 'Newborn/Infant',
      background: 'Jasper and Elena\'s newborn son. His arrival symbolizes new chapter in family.',
      motivations: 'N/A (infant)',
      fears: 'N/A',
      flaw: 'N/A',
    },

    // ===== BSS LEADERSHIP =====
    {
      name: 'Addison Price',
      aliases: JSON.stringify(['Addie', 'Addison']),
      archetype: 'Managing Partner / The Rising Star Right Hand',
      age: 'Mid-40s',
      background: `Former field operator turned high-end corporate crisis strategist. Spotted Jasper's talent eight years ago during Charlotte hotel renovation project (she was external investor-side consultant). Taught him the politics that come after solving the problem.

CAREER PATH:
- Field operations background (classified)
- Transitioned to corporate crisis strategy consulting
- Discovered Jasper, helped develop his talents
- Now Managing Partner at BSS

Has her own quiet regrets about the toll the job takes. Understands the sacrifice because she's lived it.`,
      appearance: 'Striking with sharp features. Impeccable dress, precision to movements. Always seems half a step ahead in conversation. Athletic build, poised but approachable. Wardrobe blends corporate polish and practical movement (ready for boardroom or warehouse inspection). At parties: black tailored jumpsuit, bold gold cuff, sleek ponytail.',
      motivations: 'Building BSS into a legacy. Protecting Jasper from his own worst instincts. Finding her own balance after years of sacrifice.',
      fears: 'That she\'s given too much to the job and can\'t get those years back. That she enabled Jasper\'s workaholism.',
      flaw: 'Can be overly invested in Jasper\'s success to the detriment of her own life.',
      secrets: 'She was in a similar position to Jasper once - chose career over family. Her marriage didn\'t survive.',
      voiceNotes: 'Professional in public, direct/blunt in private. Advocates for Jasper while challenging him to think long-term. Strategic thinker.',
      arcStart: 'The one who enables Jasper\'s 24/7 availability',
      arcChange: 'Becomes key support during Elena\'s crisis, bonds with Grace',
      arcEnd: 'Takes more front-facing responsibility, allowing Jasper to shift office-based',
    },
    {
      name: 'Ethan Cole',
      aliases: JSON.stringify(['Hawk', 'Cole']),
      archetype: 'Chief of Operations / The Warrior with Heart',
      age: 'Mid-to-late 30s',
      background: `Grew up in small, hard-edged Texas town; life was survival, grit, loyalty over bloodlines. Parents gone (estranged or deceased). Only blood relative: younger sister Sarah in Dallas with husband and children - keeps her at arm's length to protect her from his dangerous world.

MILITARY CAREER:
- Distinguished military career with reputation for calm under pressure and surgical precision
- Rose to leadership role embodying "never leave a man behind" ethos
- Special Forces background (implied SF/NSA cyber ops)

POST-MILITARY:
- Transitioned to private security/intelligence sphere
- Las Vegas Chapter: Spent several years in Las Vegas working high-level private security and crisis operations
- Specialized in VIP protection, exclusive security
- Built reputation before joining BSS

CURRENT: Chief of Operations for BSS. Partners with Jasper on crisis cases. Built home adjacent to Chris and Kendra's estate, symbolizing commitment to "new family" circle.`,
      appearance: 'Sharp, imposing military bearing. Dark features. Always assessing, scanning. Coiled-spring presence even at rest. Carries himself like someone who\'s been through battle.',
      motivations: 'Protecting those under his care at all costs. Never abandoning a brother. Building a family outside combat - terrifying leap for man who\'s lived by mission.',
      fears: 'Allowing himself to be loved. Believing he deserves happiness given shadows in his past.',
      flaw: 'Rigid code of honor can make him inflexible. Struggles with personal vulnerability despite being emotionally stable for others.',
      secrets: 'The specific missions and losses that haunt him. Why he really keeps his sister at distance.',
      voiceNotes: 'Stoic and magnetic - doesn\'t waste words but when he speaks, people listen. Quiet depth revealing only in rare intimate moments. Both steel and vulnerability.',
      arcStart: 'The consummate operator - identity defined by missions and brotherhood',
      arcChange: 'Relationship with Addie challenges his walls',
      arcEnd: 'Learning to lead without always needing to fight while holding onto the edge that made him invaluable',
    },
    {
      name: 'Harper Whitfield',
      aliases: JSON.stringify(['Harper', 'Harper Vance']),
      archetype: 'Senior Crisis Specialist / The Elegant Strategist',
      age: 'Early 40s',
      background: `Savannah, Georgia roots. Debutante circuit, competitive equestrian in teens.

EDUCATION:
- BA in International Relations, Columbia University
- MBA in Finance & Strategy, Wharton School

CAREER PATH:
- Embedded journalist (former)
- Freelance specialist
- Crisis comms consultant
- Crisis management specialist at BSS

Works high-touch client relationships with ease. Reads rooms instantly, handles delicate situations with Southern charm and tactical precision.`,
      appearance: 'Nordic features, sharp but disarming smile. Rebecca Ferguson type. Warm Southern drawl. Elegant, polished appearance - immaculate style. Fitted dresses, pearls, soft pastel blouses (peach, mint, cream) paired with tailored skirts. Hair always immaculate.',
      motivations: 'Thriving in the chaos. Proving she\'s more than a Southern belle. Finding her place between ambition and connection.',
      fears: 'Being underestimated. Getting too close and losing professional edge. The restlessness that never settles.',
      flaw: 'Uses charm as deflection. Can be unpredictable. Temptation energy that creates complications.',
      secrets: 'Her past as embedded journalist included dangerous situations she doesn\'t discuss.',
      voiceNotes: 'Warm, tactically charming, master at putting others at ease while steering conversation exactly where she wants. Quick-witted, sharp strategist. Savannah softness that melts through steel.',
      arcStart: 'Professional partner on sensitive projects, subtle chemistry with Jasper',
      arcChange: 'Represents the dangerous temptation of who Jasper was before family',
      arcEnd: 'Mirror that shows Jasper what walking that path again would cost',
    },
    {
      name: 'Kendra Donnelly',
      aliases: JSON.stringify(['Kendra']),
      archetype: 'Analyst / The Grounded Achiever',
      age: 'Early 30s',
      background: 'BSS analyst with competitive streak and athletic brilliance. Marries Christopher "Chris" Donnelly. Builds estate next to Addie/Hawk with massive shared gym complex between couples.',
      appearance: 'Athletic, fit, strong build. Glowing with health and vitality. Mix of strength and femininity.',
      motivations: 'Excellence in everything. Building a power couple life with Chris. Integrating into the Wives\' Club as natural organizer.',
      fears: 'Not measuring up. Her competitive nature creating friction. Balancing ambition with family.',
      flaw: 'Can be too competitive. Sometimes jokes about wanting to outshine others at events.',
      secrets: 'Wary of Chris\'s ex Claire at first, then becomes strategic ally.',
      voiceNotes: 'Ambitious, competitive, fiery energy. Natural integrator, pulls people together. Loves the overload of baby prep.',
      arcStart: 'Ambitious analyst building career at BSS',
      arcChange: 'Marriage to Chris, pregnancy, entry into Catholic/society circles',
      arcEnd: 'Balancing luxury, family, faith as new mother',
    },
    {
      name: 'Ridge Hawkins',
      aliases: JSON.stringify(['Ridge']),
      archetype: 'Assistant Head of Operators / The Evolving Warrior',
      age: 'Late 20s to mid-30s',
      background: `Forward-deployed fixer, sharp operator. Years of field work, battle-hardened.

CAREER EVOLUTION:
- Forward-deployed missions as sharp operator
- Returns to Charlotte from field roles
- Promoted to Assistant Head of Operators at BSS Charlotte location
- Reports to Cole (Head of Operations)
- Leadership position shaping training, mission prep, team culture
- Credibility from having "been there" earns instant respect from operators

PERSONAL: Recently married, wife is strong and grounded. Newly has baby - major life change.`,
      appearance: 'Big brother vibe. Military operator build. Battle-hardened presence.',
      motivations: 'Balancing his desire for the rush of operations with his new responsibilities as husband and father. Building the sports security vertical for BSS.',
      fears: 'That he\'s lost his edge. That he can\'t be both the operator he was and the family man he needs to become.',
      flaw: 'Still craves the adrenaline of field work. Struggles with the transition to leadership and fatherhood.',
      secrets: 'The specific missions that changed him. What he saw that made him ready to come home.',
      voiceNotes: 'Intense, witty, can make others laugh. Fiercely protective. Big brother energy.',
      arcStart: 'Returns from forward deployment, promoted to leadership',
      arcChange: 'Birth of baby changes him at core - weight of responsibility unlike anything missions brought',
      arcEnd: 'Evolves from field fixer to architect of BSS sports security vertical; family becomes new source of purpose',
    },
    {
      name: 'Bella Romano',
      aliases: JSON.stringify(['Bella']),
      archetype: 'The Underestimated Force',
      age: 'Mid 20s',
      background: 'Works in or around BSS operations. Often overlooked compared to glamorous figures like Addie, Elena, Selene. Connected to Matt romantically. Charity/mentorship focus.',
      appearance: 'Soft beauty, sweet, wholesome. Shy, understated charm. Innocence and kindness evident. In certain moments (right dress, natural warmth with kids) steals attention in ways she doesn\'t realize.',
      motivations: 'Being a grounding force for others. Building real connections without the spotlight. Making a difference through quiet service.',
      fears: 'Being overlooked forever. Not finding her place in the glamorous world around her.',
      flaw: 'Can undervalue herself. Sometimes fades into the background when she should speak up.',
      secrets: 'She notices everything others miss. Her "plainness" is actually keen observation.',
      voiceNotes: 'Shy, practical, not a natural spotlight-seeker. Kind, warm, loyal. Makes everyone feel safe and valued.',
      arcStart: 'The "soft beauty" perceived as DUFF compared to glamorous circle',
      arcChange: 'Becomes confidante for Grace, reveals hidden depths',
      arcEnd: 'Those closest recognize unique glow - she\'s the one others lean on emotionally',
    },
    {
      name: 'Jessica Aldridge',
      aliases: JSON.stringify(['Jessica', 'Jess']),
      archetype: 'The Original Mentor',
      age: 'Late 50s to 60s',
      background: 'The one who first spotted Jasper\'s talent during the Charlotte hotel project eight years ago. External investor-side consultant who saw something special. Encouraged him to found BSS, connected him with early investors. Now retired but still influential.',
      motivations: 'Seeing her protégé succeed. Legacy through those she\'s mentored.',
      fears: 'That Jasper will make the same mistakes she did. Irrelevance in retirement.',
      flaw: 'Can be too hands-off, letting Jasper learn lessons the hard way.',
    },
    {
      name: 'Mason Wright',
      aliases: JSON.stringify(['Mason', 'Mase']),
      archetype: 'The Truth-Telling Friend',
      age: 'Late 30s to early 40s',
      background: 'Jasper\'s Duke lacrosse buddy. The friend who tells Jasper the hard truths no one else will. Not part of BSS - gives outside perspective.',
      motivations: 'Keeping Jasper grounded. Maintaining the friendship from before success.',
      fears: 'Losing Jasper to the corporate world. His friend becoming someone unrecognizable.',
      flaw: 'Can be brutally honest in ways that hurt. Sometimes resents Jasper\'s success.',
      voiceNotes: 'Blunt, loyal, calls it like he sees it. The one voice Jasper can\'t spin or manage.',
    },

    // ===== SUPPORTING CHARACTERS =====
    {
      name: 'Christopher Donnelly',
      aliases: JSON.stringify(['Chris']),
      archetype: 'The Faith-Business Bridge',
      age: 'Mid-30s',
      background: `Large Irish-Catholic family based in Chicago. Third of five siblings. Father: high school principal. Mother: literature teacher. Older brother: firefighter in Chicago. Younger sister: nurse in Boston.

EDUCATION:
- University of Notre Dame (double major: Finance and Theology)
- MBA from Columbia

CAREER: Private equity partner in boutique investment firm. Known for working on legacy-impact projects and philanthropic ventures. Specializes in mission-driven investments: hospitals, schools, sustainable energy, Catholic institutions.

SPIRITUAL LIFE:
- Devout Catholic, guided by spiritual directors
- Deeply networked with clergy
- Key mentors: Msgr. Anthony Russo (officiates wedding), Father Matt Callahan (college roommate turned priest)
- Connected to Papal Nuncio in D.C. through philanthropy

LIFESTYLE: Extremely disciplined - cyclist, runner, weight training. Old-school classic style, rosary in pocket.`,
      appearance: 'Fit, disciplined build. Old-school classic style - tailored suits. Grounded confidence.',
      motivations: 'Integrating faith with business success. Building a family rooted in tradition. Using wealth for good.',
      fears: 'Compromising values for success. The temptations of wealth. Losing connection to faith roots.',
      flaw: 'Can be rigid about moral standards. Sometimes judgmental.',
      secrets: 'First love Claire from Notre Dame still occasionally resurfaces professionally.',
      voiceNotes: 'Quiet strength. Brings stability to Kendra\'s fiery energy. Witty and playful with grounded confidence.',
    },
    {
      name: 'Charlotte Hale',
      aliases: JSON.stringify(['Lottie']),
      archetype: 'The Indispensable Orchestrator',
      age: '30s to 40s',
      background: `Childhood friend of Elena's younger sister Sara. Grew up in Charlotte while Sara was athletic and Elena became society beauty - Lottie was dependable, steady, thoughtful friend who kept their world in order. When Elena built Maison Aurelia, Lottie came on board first as event logistics coordinator.

CURRENT ROLE: Event logistics and operations chief for Maison Aurelia. Behind-the-scenes mastermind who turns chaos into flawless elegance. Elena's right hand.

SUPERPOWER - SEATING CHARTS: Almost supernatural ability to arrange people at galas, dinners, family gatherings. Can seat heads of state, rival CEOs, bishops, military brass, socialites in exact constellation to defuse egos, spark alliances, prevent disasters. Jasper jokes BSS could run entire operation on one of Lottie's seating charts.`,
      appearance: 'Slightly obese, curvier, softer than contemporaries. Round cheeks, soft curves, easy laugh. Freckles (makeup artists try to cover but kids adore). Glasses perched on nose. Hair usually pinned back rather than styled. At galas: more likely mistaken for staffer than celebrated woman.',
      motivations: 'Making everyone else shine. Proving her worth through indispensable competence. Finding her own place.',
      fears: 'Invisibility. Being the "DUFF" forever. Burying her own desires under responsibility.',
      flaw: 'Insecurity about looks. Sometimes resents being the one who holds the clipboard while others shine.',
      secrets: 'Has romantic hopes she never voices. Her self-deprecating humor masks real hurt.',
      voiceNotes: 'Quick-witted, self-deprecating humor, sharp tongue when needed. Deep empathy - notices what others miss. Uses "DUFF" label as inside joke she reclaims.',
    },
    {
      name: 'Sara Hale',
      aliases: JSON.stringify(['Sara']),
      archetype: 'The Grounding Sister',
      age: 'Early 40s',
      background: `Elena's younger sister (by 4 years). Grew up in Charlotte with Lottie and Maggie Donnelly. Where Elena was the dazzler, Sara was athletic and fiery.

CAREER: High school English teacher; also coaches girls' soccer team. (Updated version: Senior Administrative Assistant at mid-sized law firm)

PERSONAL: Mother of Isabella "Izzy" and Emma. Battles PCOS - hormonal imbalances, weight struggles, quiet ache of fertility challenges. Envies Kendra's athletic frame, Selene's fire, Addie's glow, Elena's polish. Resists letting bitterness take root; channels into compassion.`,
      appearance: 'Wavy auburn hair, hazel eyes. Casual but stylish. Isla Fisher type - warm, approachable, athletic. Cardigans, pencil skirts, flats in professional settings.',
      motivations: 'Supporting her sister and niece. Being the emotional anchor of the family. Self-acceptance despite health struggles.',
      fears: 'Not measuring up to Elena. Her PCOS affecting how others see her. Losing her fire.',
      flaw: 'Sometimes carries others\' burdens so deeply it weighs her down. Struggles with boundaries.',
      voiceNotes: 'Warm, practical, speaks her mind but never cruel. Teacher\'s patience, teacher\'s heart. Quietly faithful.',
    },
    {
      name: 'Isabella Alvarez',
      aliases: JSON.stringify(['Izzy', 'Isabella']),
      archetype: 'The Rising Generation',
      age: 'College-age (17-18)',
      background: 'Sara\'s oldest daughter. Quiet achiever since childhood - AP classes, varsity soccer. Tutors younger kids at Sara\'s CrossFit complex. Serious about shaping own future, not floating in orbit of BSS privilege.',
      appearance: 'Takes after Sara - athletic, warm features. Carries herself with quiet confidence beyond her years.',
      motivations: 'Finding her own path outside family\'s powerful orbit. Making an impact. Getting into the right college on her own merits.',
      fears: 'Being defined by her family\'s connections. Not being taken seriously. Failing to live up to potential.',
      flaw: 'Can be too serious. Sometimes dismisses help that\'s genuinely offered.',
      voiceNotes: 'Witty observer (inherited from Elena/Sara side). Deep thinker, ambitious. "I want to be somewhere that feels bigger than me - but also somewhere I can make an impact."',
    },
    {
      name: 'Margaret Donnelly',
      aliases: JSON.stringify(['Maggie', 'Miss Donnelly']),
      archetype: 'The Beloved Teacher',
      age: 'Late 30s to early 40s',
      background: 'Grace\'s favorite teacher at private academy (literature & history). Special way of drawing out curiosity in students. Childhood friend of Sara Hale. Struggles with loneliness and string of failed relationships - gives too much, falls too hard, ends up hurt.',
      appearance: 'Curvy, natural blush in cheeks. Bright eyes, playful smile. Dresses with mix of teacherly chic and unexpected flashes (colorful heels, bold earrings). Not goddess-type but charisma and sparkle draw people in.',
      motivations: 'Igniting love of learning in students. Finding lasting love. Building connections beyond the classroom.',
      fears: 'Ending up alone. Being taken advantage of. Missing her chance at family.',
      flaw: 'Romantic instability. Gives too much too quickly. Flirty demeanor masks fears about worth.',
      voiceNotes: 'Gentle, bookish, nurturing but quietly ambitious. Outgoing, warm, unafraid to tease. Loves to laugh, sometimes too loud (infectious).',
    },
    {
      name: 'Selene Marchetti',
      aliases: JSON.stringify(['Selene']),
      archetype: 'The Wild Card',
      age: 'Late 20s to early 30s',
      background: 'Part of POH and Addie\'s immediate circle. Constant shadow of Addie during palace events, but differently than others. "Other half of the room" - elegantly dressed, slipping into whispered conversations, watching for tells. Thrives in flow of elite dinners while remaining calm and detached.',
      appearance: 'Objectively stunning. "Intoxicating" allure. Wild, magnetic presence. Dangerous beauty - radiant yet shadowed by turbulence.',
      motivations: 'Carving her own lane. Independence without abandoning those she loves. Finding her own ground.',
      fears: 'Being defined as Addie\'s shadow. Clinging too tightly and becoming needy or replaceable.',
      flaw: 'Recklessness. Self-destructive edge. The chaos she carries can unsettle others.',
      secrets: 'What caused the turbulence in her past. Why she keeps everyone at slight distance.',
      voiceNotes: 'Calm, reserved, sharp in detachment. Observer rather than center of chaos. Values bonds but protects independence.',
    },
    {
      name: 'Evelyn Sterling',
      aliases: JSON.stringify(['Evie']),
      archetype: 'The Outsider-Insider',
      age: 'Late 20s',
      background: 'Building relationship with Sofia. Part of the expanding circle. Developing storyline follows their friendship progression.',
      motivations: 'Finding her place in the group. Building genuine connection with Sofia.',
    },
    {
      name: 'Sofia Reyes',
      aliases: JSON.stringify(['Sofia']),
      archetype: 'The Principled Beauty',
      age: 'Late 20s',
      background: 'Building relationship with Evie. Part of the expanding circle. Developing storyline follows their friendship progression.',
      motivations: 'Authenticity. Real connections over social games.',
    },
    {
      name: 'Madeline Foster',
      aliases: JSON.stringify(['Maddie']),
      archetype: 'The Survivor',
      age: 'Late 20s to early 30s',
      background: 'Part of the supporting cast. Has overcome significant challenges in her past.',
      motivations: 'Building a stable life. Proving her resilience.',
    },
    {
      name: 'Matthew Keating',
      aliases: JSON.stringify(['Matt']),
      archetype: 'The Good Man',
      age: 'Early 30s',
      background: 'Ex-Navy Intel, maritime security. Annapolis/USNA + King\'s College grad. Calm, worldly but often absent due to work. Connected to Harper romantically. Connected to Bella.',
      motivations: 'Balance between duty and relationships. Building something meaningful.',
    },
    {
      name: 'Daniel Chen',
      aliases: JSON.stringify(['Daniel']),
      archetype: 'The Scholar',
      age: 'Early 30s',
      background: 'Part of the BSS/social circle. Academic background. Thoughtful, analytical.',
      motivations: 'Understanding the bigger picture. Contributing intellect to the group.',
    },
    {
      name: 'Cameron Rhodes',
      aliases: JSON.stringify(['Cam']),
      archetype: 'The Star',
      age: 'Mid 20s to early 30s',
      background: 'Athletic/entertainment background. Star presence with growing storyline.',
      motivations: 'Success in the spotlight. Real relationships despite fame.',
    },
    {
      name: 'Riley Whitmore',
      aliases: JSON.stringify(['Riley']),
      archetype: 'The Steady Hand',
      age: 'Late 30s',
      background: 'BSS operations. Recruited Addison Reed after she flawlessly managed investor weekend.',
      motivations: 'Building the team. Reliability and competence.',
    },
    {
      name: 'Caroline Bauer',
      aliases: JSON.stringify(['Caroline']),
      archetype: 'The Washington Player',
      age: '50s',
      background: 'Political consultant, Atlanta/DC. Mentor to Elena. Advice: "Own your space; build a life he wants to step into."',
      motivations: 'Power and influence. Shaping the next generation of women.',
    },
    {
      name: 'Addison Reed',
      aliases: JSON.stringify(['Addison']),
      archetype: 'The Protégé',
      age: 'Early to mid 20s',
      background: `DISTINCT from Addison Price (Addie). Born in Wilmington, NC. First in family to graduate college: UNC-Chapel Hill (business admin + communications). Started in luxury hotel guest relations. Recruited by Riley Grant after flawlessly managing investor weekend.

APPEARANCE AT PARTY: Floor-length emerald silk slip dress, deep V back, slim gold chain, strappy heels. Soft Hollywood waves, glowing makeup, bold red lip. Brought vintage bottle of Macallan 25 for Jasper. Guests still talked about her afterward - not just looks but poise.`,
      appearance: 'Polished but approachable. Soft professional: wrap dresses, ballet flats, low bun or long waves. Carries leather tote as mobile command center.',
      motivations: 'Proving herself. Learning from the best. Rising on her own merits.',
      flaw: '"Southern sweet until crossed."',
      voiceNotes: 'Warm and approachable, sharp enough to cut through nonsense. Has mental Rolodex of clients\' coffee orders, personal tells, small talk topics.',
    },
  ];

  const created = [];
  for (const char of characterData) {
    const c = await prisma.character.create({
      data: {
        projectId,
        ...char,
      },
    });
    created.push(c);
    console.log(`  Created: ${char.name}`);
  }
  return created;
}

async function createRelationships(projectId: string) {
  const characters = await prisma.character.findMany({
    where: { projectId },
    select: { id: true, name: true },
  });

  const charMap = new Map(characters.map(c => [c.name, c.id]));

  const relationships = [
    // Barrett Family
    { from: 'Jasper Barrett', to: 'Elena Barrett', type: 'spouse', desc: 'Married, central relationship of the series' },
    { from: 'Jasper Barrett', to: 'Grace Barrett', type: 'parent', desc: 'Doting but often absent father' },
    { from: 'Jasper Barrett', to: 'Lucas Barrett', type: 'parent', desc: 'Father of newborn son' },
    { from: 'Elena Barrett', to: 'Grace Barrett', type: 'parent', desc: 'Close, protective relationship' },
    { from: 'Elena Barrett', to: 'Lucas Barrett', type: 'parent', desc: 'Mother of newborn' },
    { from: 'Elena Barrett', to: 'Sara Hale', type: 'sibling', desc: 'Sisters - Elena is older' },

    // BSS Professional
    { from: 'Jasper Barrett', to: 'Addison Price', type: 'professional', desc: 'Boss/Managing Partner - she develops into his right hand' },
    { from: 'Jasper Barrett', to: 'Harper Whitfield', type: 'professional', desc: 'Co-founded BSS, strategic partners with tension' },
    { from: 'Jasper Barrett', to: 'Jessica Aldridge', type: 'mentor', desc: 'She discovered and mentored him' },
    { from: 'Jasper Barrett', to: 'Mason Wright', type: 'friend', desc: 'Duke lacrosse buddy, truth-teller' },
    { from: 'Jasper Barrett', to: 'Ethan Cole', type: 'professional', desc: 'Chief of Operations, deep trust' },
    { from: 'Jasper Barrett', to: 'Addison Reed', type: 'mentor', desc: 'Mentors her from admin to strategist' },

    // Addie & Hawk
    { from: 'Addison Price', to: 'Ethan Cole', type: 'romantic', desc: 'Deep bond, married' },
    { from: 'Ethan Cole', to: 'Ridge Hawkins', type: 'professional', desc: 'Head of Ops to Assistant Head - trust and mentorship' },

    // Chris & Kendra
    { from: 'Christopher Donnelly', to: 'Kendra Donnelly', type: 'spouse', desc: 'Power couple, Catholic faith foundation' },

    // Elena's World
    { from: 'Elena Barrett', to: 'Charlotte Hale', type: 'professional', desc: 'Lottie is her right hand at Maison Aurelia' },
    { from: 'Elena Barrett', to: 'Caroline Bauer', type: 'mentor', desc: 'Political consultant, advisor' },

    // Sara's Family
    { from: 'Sara Hale', to: 'Isabella Alvarez', type: 'parent', desc: 'Mother of Izzy' },
    { from: 'Sara Hale', to: 'Charlotte Hale', type: 'friend', desc: 'Childhood friends from Charlotte' },
    { from: 'Sara Hale', to: 'Margaret Donnelly', type: 'friend', desc: 'Childhood friends, shared struggles' },

    // Grace's World
    { from: 'Grace Barrett', to: 'Margaret Donnelly', type: 'teacher', desc: 'Favorite teacher, ignites love of reading' },
    { from: 'Grace Barrett', to: 'Addison Price', type: 'bond', desc: 'Hospital bonding, becomes protector' },
    { from: 'Grace Barrett', to: 'Bella Romano', type: 'bond', desc: 'Confidante relationship' },

    // Selene
    { from: 'Selene Marchetti', to: 'Addison Price', type: 'ally', desc: 'Close but maintaining independence' },
    { from: 'Selene Marchetti', to: 'Ethan Cole', type: 'ally', desc: 'Quiet camaraderie, mutual respect' },

    // Romantic
    { from: 'Bella Romano', to: 'Matthew Keating', type: 'romantic', desc: 'Connected romantically' },
    { from: 'Harper Whitfield', to: 'Matthew Keating', type: 'romantic_past', desc: 'Past connection' },
  ];

  for (const rel of relationships) {
    const fromId = charMap.get(rel.from);
    const toId = charMap.get(rel.to);
    if (fromId && toId) {
      await prisma.characterRelationship.create({
        data: {
          fromCharacterId: fromId,
          toCharacterId: toId,
          relationshipType: rel.type,
          description: rel.desc,
        },
      });
    }
  }
}

async function createCrises(projectId: string) {
  const crises = [
    {
      name: 'The London Data Breach',
      codeName: 'Operation Firewall',
      clientName: 'Major Financial Institution',
      clientType: 'Fortune 500',
      crisisType: 'Data Breach',
      severity: 'critical',
      location: 'London, UK',
      timeframe: 'Book 1, Chapter 1-3',
      description: 'Massive data breach at a major financial institution threatens to expose millions of customer records and tank stock price.',
      situation: '2:17 AM call. Breach discovered. Media has 4-hour head start. Stock opens in 6 hours.',
      complications: 'Internal sabotage suspected. Regulatory pressure from multiple jurisdictions. CEO in denial about scope.',
      resolution: 'BSS team contains breach, manages media narrative, identifies internal threat actor.',
      outcome: 'Stock stabilizes. CEO eventually replaced. BSS reputation enhanced.',
      bssTeam: JSON.stringify(['Jasper Barrett', 'Harper Whitfield', 'Ethan Cole']),
      stakes: 'Client: $2B market cap at risk. BSS: reputation with financial sector.',
      status: 'resolved',
      bookAppearance: 'Book 1: Five Feet From Home',
    },
    {
      name: 'The Tech Titan Scandal',
      codeName: 'Operation Cleanup',
      clientName: 'Silicon Valley CEO',
      clientType: 'Individual',
      crisisType: 'Personal Scandal',
      severity: 'high',
      location: 'San Francisco / Charlotte',
      timeframe: 'Book 1, Chapter 5-6',
      description: 'Prominent tech CEO faces allegations that threaten company IPO.',
      situation: 'Whistleblower goes to media. IPO in 30 days. Board divided.',
      complications: 'Some allegations have merit. Legal team at war with PR team. Founder refuses to step down.',
      stakes: 'Client: $10B IPO. Thousands of employee stock options. Company survival.',
      status: 'active',
      bookAppearance: 'Book 1: Five Feet From Home',
    },
    {
      name: 'The Hostile Takeover Defense',
      codeName: 'Operation Shield',
      clientName: 'Legacy Manufacturing Company',
      clientType: 'Fortune 500',
      crisisType: 'Hostile Takeover',
      severity: 'critical',
      location: 'Charlotte / New York',
      timeframe: 'Book 2',
      description: 'Generational family business faces hostile takeover from private equity firm with questionable motives.',
      situation: 'Activist investor accumulating shares. Board leak. Family divided.',
      complications: 'Some family members want to sell. Legacy employees\' pensions at risk. Media framing as "old vs new."',
      stakes: 'Client: Family legacy, 50,000 jobs. BSS: Establishing corporate defense practice.',
      status: 'active',
      bookAppearance: 'Book 2',
    },
    {
      name: 'The Embassy Crisis',
      codeName: 'Operation Diplomat',
      clientName: 'US State Department',
      clientType: 'Government',
      crisisType: 'International Incident',
      severity: 'critical',
      location: 'Undisclosed Middle East',
      timeframe: 'Book 3',
      description: 'American executives detained abroad. Official channels frozen. Families desperate.',
      situation: 'Three executives held without charges. Local government denying access. Media blackout.',
      complications: 'State Department handcuffed by politics. Corporate parent can\'t be seen negotiating. Clock ticking.',
      stakes: 'Lives of three Americans. US-foreign relations. BSS expansion into international extraction.',
      status: 'active',
      bookAppearance: 'Book 3',
    },
    {
      name: 'The Sports League Scandal',
      codeName: 'Operation Playbook',
      clientName: 'Major Sports League',
      clientType: 'Sports Organization',
      crisisType: 'Integrity Crisis',
      severity: 'high',
      location: 'Multiple Cities',
      timeframe: 'Ridge Spin-off',
      description: 'Gambling scandal threatens to taint championship season. Multiple players implicated.',
      situation: 'Federal investigation. Players lawyering up. Sponsors threatening withdrawal.',
      complications: 'Some allegations true. Union protecting players. Commissioner under fire.',
      stakes: 'League integrity. Billions in media rights. Player careers.',
      bssTeam: JSON.stringify(['Ridge Hawkins', 'Ethan Cole']),
      status: 'active',
      bookAppearance: 'Ridge Sports Security Series',
    },
    {
      name: 'The Charity Fraud Investigation',
      codeName: 'Operation Goodwill',
      clientName: 'Major Non-Profit',
      clientType: 'Non-Profit',
      crisisType: 'Financial Scandal',
      severity: 'medium',
      location: 'Charlotte',
      timeframe: 'Bella Spin-off',
      description: 'Beloved local charity accused of misappropriating funds. Founder\'s legacy at stake.',
      situation: 'Whistleblower allegations. State AG investigation. Donors demanding answers.',
      complications: 'Founder is elderly, health fragile. Some board members complicit. Media loves fallen angel stories.',
      stakes: 'Charity mission. Founder\'s legacy. Thousands of beneficiaries.',
      status: 'active',
      bookAppearance: 'Bella Series',
    },
  ];

  for (const crisis of crises) {
    await prisma.crisis.create({
      data: { projectId, ...crisis },
    });
    console.log(`  Created crisis: ${crisis.name}`);
  }
}

async function createOrganizations(projectId: string) {
  const orgs = [
    {
      name: 'Barrett Strategic Solutions',
      shortName: 'BSS',
      type: 'Corporation',
      industry: 'Crisis Management / Corporate Strategy',
      description: 'Elite corporate crisis management firm founded by Jasper Barrett. Handles high-stakes situations for Fortune 500 companies, governments, and high-net-worth individuals.',
      headquarters: 'Charlotte, North Carolina',
      founded: '8 years before Book 1',
      founder: 'Jasper Barrett',
      leadership: JSON.stringify(['Jasper Barrett (CEO)', 'Addison Price (Managing Partner)', 'Ethan Cole (Chief of Operations)', 'Harper Whitfield (Senior Crisis Specialist)']),
      employees: '50-100 (core team plus network of contractors)',
      services: 'Crisis management, corporate reputation defense, hostile takeover defense, executive protection, media relations, cybersecurity response',
      clients: 'Fortune 500 companies, governments, celebrities, sports leagues',
      significance: 'Central organization of the story. Where most main characters work.',
    },
    {
      name: 'Palace of Honor',
      shortName: 'POH',
      type: 'Elite Social Organization',
      industry: 'High Society / Philanthropy',
      description: 'Exclusive network of wealthy and influential families. Part social club, part power broker, part philanthropic organization. Operates in shadows of high society.',
      headquarters: 'Multiple locations globally',
      leadership: JSON.stringify(['Various titled members']),
      services: 'Networking, influence, philanthropy, social positioning',
      significance: 'Provides social/political backdrop. Addie and Selene operate in this sphere.',
    },
    {
      name: 'The Wives Club',
      shortName: 'TWC',
      type: 'Social Circle',
      industry: 'Social / Support',
      description: 'Informal but powerful network of wives connected to BSS and POH. Part support group, part intelligence network, part social powerhouse.',
      headquarters: 'Charlotte (primarily)',
      leadership: JSON.stringify(['Addie (practical anchor)', 'Elena (graceful center)', 'Kendra (enthusiastic organizer)']),
      members: JSON.stringify(['Addie', 'Elena', 'Kendra', 'Harper', 'Bella', 'Selene', 'Sara', 'Lottie']),
      significance: 'Emotional core of the series. Where the women support each other.',
    },
    {
      name: 'Maison Aurelia',
      shortName: 'MA',
      type: 'Corporation',
      industry: 'Luxury Event Planning / Lifestyle Management',
      description: 'Elena\'s luxury event planning and lifestyle management firm. Handles cultural diplomacy dinners, Vatican-linked fundraisers, Fortune 100 summits.',
      headquarters: 'Charlotte, North Carolina',
      founder: 'Elena Barrett',
      leadership: JSON.stringify(['Elena Barrett (CEO)', 'Charlotte Hale (Operations Chief)']),
      services: 'Event planning, lifestyle management, cultural diplomacy, high-society coordination',
      clients: 'Diplomats, Fortune 100 executives, religious institutions, cultural organizations',
      significance: 'Elena\'s professional world. Often coordinates with BSS on events.',
    },
    {
      name: 'Langford Capital',
      type: 'Private Equity',
      industry: 'Finance / Investment',
      description: 'Charlotte PE firm where Jasper worked before founding BSS. Victor Langford gave him his first major clients.',
      headquarters: 'Charlotte, North Carolina',
      founder: 'Victor Langford',
      significance: 'Jasper\'s past. Langford remains connected to the story.',
    },
    {
      name: 'Donnelly Investments',
      type: 'Boutique Investment Firm',
      industry: 'Private Equity / Impact Investing',
      description: 'Chris Donnelly\'s firm. Specializes in mission-driven investments: hospitals, schools, sustainable energy, Catholic institutions.',
      headquarters: 'Charlotte / New York',
      leadership: JSON.stringify(['Christopher Donnelly (Partner)']),
      services: 'Impact investing, mission-driven finance, Catholic institutional support',
      significance: 'Chris\'s professional world. Bridges faith and business.',
    },
    {
      name: 'The Hawk Foundation',
      type: 'Non-Profit / Foundation',
      industry: 'Philanthropy / Veteran Support',
      description: 'Foundation supporting veterans and their families. Connected to Ethan Cole\'s work.',
      headquarters: 'Charlotte / New York',
      services: 'Veteran support, family assistance, transition programs',
      significance: 'Where Chris and Kendra get engaged (NYC Gala). Represents the good BSS circle does.',
    },
  ];

  for (const org of orgs) {
    await prisma.organization.create({
      data: { projectId, ...org },
    });
    console.log(`  Created organization: ${org.name}`);
  }
}

async function createBookSeries(projectId: string) {
  const series = [
    {
      name: 'The Barrett Chronicles',
      seriesType: 'Main',
      protagonist: 'Jasper Barrett',
      premise: 'Crisis manager Jasper Barrett learns that the biggest crisis he needs to solve is the distance between himself and his family.',
      themes: JSON.stringify(['work-life balance', 'marriage', 'family', 'ambition vs presence', 'redemption']),
      totalBooks: 4,
      status: 'in-progress',
      readingOrder: 1,
      timeline: 'Primary timeline - present day',
      books: JSON.stringify([
        { number: 1, title: 'Five Feet From Home', subtitle: 'The Five Foot World', synopsis: 'Jasper learns his "five foot world" crisis management mindset is destroying his family when Elena\'s health scare forces him to choose.' },
        { number: 2, title: 'Five Feet From Home: Book 2', subtitle: 'The Distance Between', synopsis: 'Jasper struggles to maintain his new priorities while BSS faces its biggest case yet.' },
        { number: 3, title: 'Five Feet From Home: Book 3', subtitle: 'Coming Home', synopsis: 'The Barrett family faces a crisis that tests everything they\'ve rebuilt.' },
        { number: 4, title: 'Five Feet From Home: Book 4', subtitle: 'The Final Five', synopsis: 'Series conclusion - Jasper must choose between the career opportunity of a lifetime and being present for a critical family moment.' },
      ]),
    },
    {
      name: 'The Right Hand',
      seriesType: 'Spin-off',
      protagonist: 'Addison Price',
      premise: 'Addie\'s journey from field operator to BSS Managing Partner, and finding love with Hawk.',
      themes: JSON.stringify(['career sacrifice', 'second chances at love', 'mentorship', 'building legacy']),
      totalBooks: 3,
      status: 'planned',
      readingOrder: 2,
      parentSeries: 'The Barrett Chronicles',
      timeline: 'Parallel to main series with backstory flashbacks',
      books: JSON.stringify([
        { number: 1, title: 'The Right Hand', synopsis: 'Addie\'s backstory - how she became who she is, and her growing connection with Hawk.' },
        { number: 2, title: 'The Right Hand: Rising', synopsis: 'Addie steps into larger leadership role while navigating new relationship.' },
        { number: 3, title: 'The Right Hand: Complete', synopsis: 'Addie finds her own balance between career, love, and the family she\'s built.' },
      ]),
    },
    {
      name: 'The Operator',
      seriesType: 'Spin-off',
      protagonist: 'Ethan Cole (Hawk)',
      premise: 'Hawk\'s journey from military operator to family man, learning to love and be loved.',
      themes: JSON.stringify(['PTSD and healing', 'military to civilian transition', 'brotherhood', 'vulnerability']),
      totalBooks: 2,
      status: 'planned',
      readingOrder: 3,
      parentSeries: 'The Barrett Chronicles',
      timeline: 'Backstory through present',
      books: JSON.stringify([
        { number: 1, title: 'The Operator', synopsis: 'Hawk\'s military career, what brought him to BSS, and learning to open up to Addie.' },
        { number: 2, title: 'The Operator: Home Base', synopsis: 'Hawk builds a home and family while staying sharp for the missions that matter.' },
      ]),
    },
    {
      name: 'Sports Security',
      seriesType: 'Spin-off',
      protagonist: 'Ridge Hawkins',
      premise: 'Ridge builds BSS\'s sports security vertical while becoming a father.',
      themes: JSON.stringify(['fatherhood', 'identity beyond combat', 'sports world', 'protection']),
      totalBooks: 2,
      status: 'planned',
      readingOrder: 4,
      parentSeries: 'The Barrett Chronicles',
      timeline: 'Follows main series',
      books: JSON.stringify([
        { number: 1, title: 'The Playbook', synopsis: 'Ridge tackles a sports scandal while adjusting to fatherhood.' },
        { number: 2, title: 'Game Day', synopsis: 'Ridge\'s sports security team faces their biggest challenge.' },
      ]),
    },
    {
      name: 'The Quiet Force',
      seriesType: 'Spin-off',
      protagonist: 'Bella Romano',
      premise: 'Bella finds her voice and her power in a world of glamour and crisis.',
      themes: JSON.stringify(['self-discovery', 'quiet strength', 'charity work', 'finding love']),
      totalBooks: 2,
      status: 'planned',
      readingOrder: 5,
      parentSeries: 'The Barrett Chronicles',
      timeline: 'Parallel to main series',
      books: JSON.stringify([
        { number: 1, title: 'The Quiet Force', synopsis: 'Bella navigates a charity scandal while discovering her own power.' },
        { number: 2, title: 'Still Waters', synopsis: 'Bella comes into her own as a force in the wives\' circle.' },
      ]),
    },
    {
      name: 'The Wild Card',
      seriesType: 'Spin-off',
      protagonist: 'Selene Marchetti',
      premise: 'Selene carves her own path in the POH world while confronting her past.',
      themes: JSON.stringify(['independence', 'past trauma', 'finding identity', 'dangerous beauty']),
      totalBooks: 2,
      status: 'planned',
      readingOrder: 6,
      parentSeries: 'The Barrett Chronicles',
      timeline: 'Parallel to main series',
      books: JSON.stringify([
        { number: 1, title: 'The Wild Card', synopsis: 'Selene\'s past catches up with her as she tries to build independence.' },
        { number: 2, title: 'Untamed', synopsis: 'Selene finds her place without losing herself.' },
      ]),
    },
    {
      name: 'The Strategist',
      seriesType: 'Spin-off',
      protagonist: 'Harper Whitfield',
      premise: 'Harper\'s journey from embedded journalist to crisis specialist, and the complicated feelings that follow.',
      themes: JSON.stringify(['ambition', 'complicated romance', 'journalism ethics', 'Southern identity']),
      totalBooks: 2,
      status: 'planned',
      readingOrder: 7,
      parentSeries: 'The Barrett Chronicles',
      books: JSON.stringify([
        { number: 1, title: 'The Strategist', synopsis: 'Harper\'s backstory and how she became who she is.' },
        { number: 2, title: 'Southern Steel', synopsis: 'Harper navigates professional and personal complications.' },
      ]),
    },
    {
      name: 'The Next Generation',
      seriesType: 'Companion',
      protagonist: 'Grace Barrett / Isabella Alvarez',
      premise: 'The children of the BSS circle come of age.',
      themes: JSON.stringify(['coming of age', 'legacy', 'identity', 'college']),
      totalBooks: 2,
      status: 'planned',
      readingOrder: 8,
      parentSeries: 'The Barrett Chronicles',
      timeline: '10-15 years after main series',
      books: JSON.stringify([
        { number: 1, title: 'Five Feet Forward', synopsis: 'Grace and Izzy navigate college and early careers in the shadow of their famous families.' },
        { number: 2, title: 'New Foundations', synopsis: 'The next generation builds their own paths.' },
      ]),
    },
  ];

  for (const s of series) {
    await prisma.bookSeries.create({
      data: { projectId, ...s },
    });
    console.log(`  Created series: ${s.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
