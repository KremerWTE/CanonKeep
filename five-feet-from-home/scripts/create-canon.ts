/**
 * Create canonical character profiles and Book 1 structure
 * Based on consolidated information from all source documents
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating canonical story data...\n');

  // Get or create project
  const project = await prisma.project.upsert({
    where: { name: 'Five Feet From Home' },
    update: {
      description: 'A corporate crisis manager learns to balance his intense career with the family that anchors him',
      genre: 'Contemporary Romance/Drama',
      povStyle: 'third-person-limited',
    },
    create: {
      name: 'Five Feet From Home',
      description: 'A corporate crisis manager learns to balance his intense career with the family that anchors him',
      genre: 'Contemporary Romance/Drama',
      povStyle: 'third-person-limited',
    },
  });

  console.log(`Project: ${project.name}\n`);

  // Clear existing character data for clean slate
  await prisma.characterRelationship.deleteMany({
    where: { fromCharacter: { projectId: project.id } },
  });
  await prisma.chapterCharacter.deleteMany({
    where: { character: { projectId: project.id } },
  });
  await prisma.plotCharacter.deleteMany({
    where: { character: { projectId: project.id } },
  });
  await prisma.character.deleteMany({
    where: { projectId: project.id },
  });

  console.log('Cleared existing character data.\n');

  // ============================================
  // CORE FAMILY
  // ============================================

  const jasper = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Jasper Barrett',
      aliases: JSON.stringify(['Jasper', 'Jasper Whitaker']),
      archetype: 'Protagonist',
      age: 'Late 30s - Early 40s',
      background: `Former construction/infrastructure project manager who discovered his talent for crisis management. Built Barrett Strategic Solutions (BSS) from two clients into a global crisis solutions firm. Lives by the "Five Foot World" mindset - focusing only on what's within immediate reach during crises. This makes him exceptional at his job but destructive at home.`,
      motivations: 'To be the best crisis manager in the world. To protect his clients. Secretly: to prove he can have both career success and family.',
      fears: 'Losing control. Missing something critical. Being exposed as someone who chose work over family one too many times.',
      flaw: 'Workaholism. Cannot delegate. Believes he must personally solve every crisis. His "five foot rule" blinds him to the bigger picture at home.',
      secrets: 'He knows his marriage is at a breaking point but keeps choosing work anyway.',
      voiceNotes: 'Commands rooms. Short, direct sentences under pressure. More reflective and vulnerable with Elena and Grace. Uses military-style briefing language at work.',
      appearance: 'Lean, athletic build. Always in motion posture. Sharper, restless energy - thrives in high-stress environments. Guarded charisma.',
      arcStart: 'Completely immersed in work. Family is an afterthought - an anchor that tugs but never stops his momentum.',
      arcChange: 'Elena\'s medical emergency forces him to confront what he\'s been avoiding. Learns to be present.',
      arcEnd: 'Integrates both worlds. Still intense at work but no longer sacrifices family for it.',
      tags: JSON.stringify(['protagonist', 'crisis-manager', 'workaholic', 'family-man', 'BSS']),
    },
  });
  console.log(`Created: ${jasper.name}`);

  const elena = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Elena Barrett',
      aliases: JSON.stringify(['Elena', 'Elena Davenport', 'Elena Davenport Barrett']),
      archetype: 'Female Lead / Heart of the Story',
      age: 'Late 30s',
      background: `Raised Catholic in a loving family. Met Jasper at a networking event and fell for his intensity. Built her own career while supporting his. Runs Maison Aurelia, an elite event/lifestyle company. The emotional anchor Jasper needs but often neglects.`,
      motivations: 'To have a real partnership with Jasper, not just parallel lives. To raise Grace with both parents present. To build something meaningful with Maison Aurelia.',
      fears: 'That she\'ll always come second to Jasper\'s work. That Grace will grow up with an absent father like she did. Losing herself in being "Jasper\'s wife."',
      flaw: 'Too accommodating. Stops calling Jasper when things break at home - just handles it herself. Enables his workaholism by being competent.',
      secrets: 'She\'s been considering whether this marriage can continue.',
      voiceNotes: 'Warm but with steel underneath. Uses humor to deflect pain. More direct with close friends. Rarely raises her voice but when she does, it matters.',
      appearance: 'Elegant, classic beauty. Grace under pressure. The kind of presence that commands attention at galas but feels genuine.',
      arcStart: 'Managing everything alone. Competent but increasingly lonely. Debating whether to demand change or leave.',
      arcChange: 'Medical emergency forces vulnerability. Sees Jasper choose her for the first time in years.',
      arcEnd: 'Partnership restored. No longer managing alone - they\'re truly a team.',
      tags: JSON.stringify(['female-lead', 'wife', 'mother', 'business-owner', 'Catholic']),
    },
  });
  console.log(`Created: ${elena.name}`);

  const grace = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Grace Barrett',
      aliases: JSON.stringify(['Grace', 'Gracie']),
      archetype: 'The Emotional Truth-Teller',
      age: '7-9 years old',
      background: `Only daughter of Jasper and Elena. Modeled after Jamie Scott from One Tree Hill. Fiercely proud of her dad even when he\'s away too much. Sometimes exaggerates his work into superhero territory when talking to friends.`,
      motivations: 'To have Daddy home. To be "on the same team" as her parents. To be seen and heard.',
      fears: 'That Daddy loves work more than her. That something bad will happen to Mommy.',
      flaw: 'Can be dramatic to get attention. Sometimes uses guilt to manipulate.',
      secrets: 'She pretends to be asleep when Daddy comes home late so she can hear him check on her.',
      voiceNotes: 'Precocious but still childlike. Asks the questions adults are afraid to ask. "Daddy, are you on our team?"',
      appearance: 'Bright eyes, always in motion like her father. Hair often escaping braids.',
      arcStart: 'Adapting to an absent father. Acting out in small ways.',
      arcChange: 'Mommy\'s hospital stay terrifies her but also brings Daddy home.',
      arcEnd: 'Has the present father she always wanted.',
      tags: JSON.stringify(['child', 'daughter', 'truth-teller', 'emotional-anchor']),
    },
  });
  console.log(`Created: ${grace.name}`);

  const lucas = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Lucas Barrett',
      aliases: JSON.stringify(['Lucas', 'Luke']),
      archetype: 'Symbol of New Beginning',
      age: 'Newborn/Infant',
      background: 'Born after Jasper and Elena\'s reconciliation. Represents their commitment to doing things differently.',
      motivations: 'N/A - infant',
      fears: 'N/A - infant',
      flaw: 'N/A - infant',
      secrets: null,
      voiceNotes: 'N/A',
      appearance: 'Newborn. Has Elena\'s eyes.',
      arcStart: 'Not yet born in Book 1',
      arcChange: 'Birth represents family\'s new chapter',
      arcEnd: 'Symbol of hope and second chances',
      tags: JSON.stringify(['infant', 'son', 'symbol', 'later-books']),
    },
  });
  console.log(`Created: ${lucas.name}`);

  // ============================================
  // BSS LEADERSHIP
  // ============================================

  const addie = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Addison Price',
      aliases: JSON.stringify(['Addie', 'Addison']),
      archetype: 'The Rising Star / Right Hand',
      age: 'Late 20s - Early 30s',
      background: `Started as Jasper\'s rough but sharp assistant. Worked her way up through sheer grit and intelligence. No elite pedigree - earned everything. Eventually becomes Managing Partner. Converts to Catholicism with Hawk to become Grace\'s godparents.`,
      motivations: 'To prove herself. To be taken seriously in a world of Ivy League credentials. To build something of her own within BSS.',
      fears: 'Being seen as "just the assistant." Burning out. Losing herself in work like Jasper did.',
      flaw: 'Overworks to compensate for perceived inadequacy. Can be too sharp with colleagues. Walls up emotionally.',
      secrets: 'Complex romantic history with colleagues (Kendra, others). Uses work to avoid dealing with personal life.',
      voiceNotes: 'Direct, no-nonsense. Dark humor under pressure. Softens around Elena and Grace. Professional mask rarely slips.',
      appearance: 'Athletic build (CrossFit). Power suits that mean business. Hair always perfect even at 3 AM.',
      arcStart: 'Rough assistant, underestimated',
      arcChange: 'Takes on bigger roles, proves herself in crises',
      arcEnd: 'Managing Partner, mentor to others, finds personal balance',
      tags: JSON.stringify(['leadership', 'BSS', 'rising-star', 'workaholic', 'CrossFit']),
    },
  });
  console.log(`Created: ${addie.name}`);

  const harper = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Harper',
      aliases: JSON.stringify(['Harper']),
      archetype: 'The Brain / Strategic Anchor',
      age: 'Late 30s - Early 40s',
      background: `Co-founded BSS with Jasper. The true strategic brain of the operation - not flashy like the operators, but indispensable. Handles the complex analysis and planning that makes crisis resolution possible. Transitioning to COO role.`,
      motivations: 'To build something lasting. To prove strategy matters as much as action. To support Jasper while building her own legacy.',
      fears: 'Being overlooked because she\'s not "in the field." The firm falling apart if Jasper burns out.',
      flaw: 'Can be too analytical. Sometimes paralyzed by seeing too many angles. Doesn\'t advocate enough for herself.',
      secrets: 'She\'s been offered positions elsewhere but stays out of loyalty.',
      voiceNotes: 'Measured, precise. Speaks in frameworks and options. Warms up significantly with close colleagues.',
      appearance: 'Professional, put-together. Reading glasses she\'s always pushing up. Calm presence.',
      arcStart: 'Senior Strategist, backbone of BSS operations',
      arcChange: 'Steps up during Jasper\'s absence, proves leadership capacity',
      arcEnd: 'COO, full partner in every sense',
      tags: JSON.stringify(['leadership', 'BSS', 'strategist', 'COO', 'analytical']),
    },
  });
  console.log(`Created: ${harper.name}`);

  const kendra = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Kendra',
      aliases: JSON.stringify(['Kendra']),
      archetype: 'The Grounded Achiever',
      age: 'Late 20s - Early 30s',
      background: `Started as analyst at BSS. Elite CrossFit athlete - competitive at Games level. Raised Catholic, never walked away from faith. Becomes working mother balancing championship training, BSS career, and family.`,
      motivations: 'To excel at everything she does. To prove working mothers can compete at elite levels. To stay grounded in faith and values.',
      fears: 'Having to choose between career and family. Not being enough for either. Losing her athletic identity to motherhood.',
      flaw: 'Perfectionism. Takes on too much. Can\'t ask for help even when drowning.',
      secrets: 'Past romantic involvement with Addie that complicates their working relationship.',
      voiceNotes: 'Confident but not arrogant. Athlete\'s discipline in speech. Warmer with close friends.',
      appearance: 'Athletic, powerful build. Competition-ready physique. Moves with athlete\'s efficiency.',
      arcStart: 'Analyst, competitive athlete',
      arcChange: 'Maternity leave, struggles with identity, returns stronger',
      arcEnd: 'Fixer level, successful working mother, balanced',
      tags: JSON.stringify(['BSS', 'analyst', 'CrossFit', 'athlete', 'Catholic', 'mother']),
    },
  });
  console.log(`Created: ${kendra.name}`);

  // ============================================
  // SECURITY / OPERATIONS
  // ============================================

  const hawk = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Ethan Cole',
      aliases: JSON.stringify(['Hawk', 'Cole', 'Ethan']),
      archetype: 'The Warrior with Heart',
      age: 'Mid 30s',
      background: `Former DEVGRU (SEAL Team Six) operator. Medically retired after classified mission in Yemen. No family except sister in Dallas - his team IS his family. Cole mentored him into corporate/private security. Now Head of Security at The Palisade. Converts to Catholicism with Addie.`,
      motivations: 'To protect those who matter. To find family after losing his team. To prove warriors can have soft hearts.',
      fears: 'Failing to protect someone again. Being too broken for civilian life. Letting Addie see his darkest moments.',
      flaw: 'Survivor\'s guilt. Keeps emotions locked down. Can be over-protective.',
      secrets: 'Still has nightmares about Yemen. The classified mission cost him more than his career.',
      voiceNotes: 'Economical with words. Says more with silence than speech. Softens only with Addie and close circle.',
      appearance: 'Operator build - functional muscle, not gym show. Alert eyes that scan every room. Scars he doesn\'t talk about.',
      arcStart: 'Guarded, professional, keeping everyone at distance',
      arcChange: 'Addie breaks through his walls. Faith gives him new purpose.',
      arcEnd: 'Head of Security, engaged/married to Addie, godfather to Grace, found his new family',
      tags: JSON.stringify(['security', 'military', 'SEAL', 'DEVGRU', 'operator', 'love-interest']),
    },
  });
  console.log(`Created: ${hawk.name}`);

  const ridge = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Ridge',
      aliases: JSON.stringify(['Ridge']),
      archetype: 'The Loyal Operator',
      age: 'Mid 30s',
      background: `Former SEAL Team Six. BSS operator who led Asia team until his engagement. Promoted to Head of Operators after proving himself in Singapore. Close to Hawk and the operator brotherhood.`,
      motivations: 'To serve with excellence. To build a family while staying connected to the mission. To mentor younger operators.',
      fears: 'Losing the edge that keeps people safe. Choosing wrong between family and mission.',
      flaw: 'Misses field work. Can be restless in leadership roles.',
      secrets: 'Sometimes takes unnecessary risks because he misses the action.',
      voiceNotes: 'Operator calm. Clear, precise communication. Looser with fellow team members.',
      appearance: 'Operator fit. Moves like a predator even in civilian clothes.',
      arcStart: 'Asia team lead, field operator',
      arcChange: 'Engagement, promotion to headquarters role',
      arcEnd: 'Head of Operators, balancing leadership with occasional field work',
      tags: JSON.stringify(['BSS', 'operator', 'SEAL', 'leadership', 'military']),
    },
  });
  console.log(`Created: ${ridge.name}`);

  // ============================================
  // KEY SUPPORTING CHARACTERS
  // ============================================

  const bella = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Bella',
      aliases: JSON.stringify(['Bella']),
      archetype: 'The Underestimated Force',
      age: 'Mid 20s',
      background: `Works triple duty: BSS analyst (grooming for fixer), TX event support company with venue development, and COO/marketing for Elena\'s Maison Aurelia. Underestimated publicly but indispensable privately. In love triangle with Matt and Mandy.`,
      motivations: 'To build her own empire while helping others build theirs. To find love that doesn\'t require her to shrink.',
      fears: 'Being seen as just support staff forever. Choosing wrong in love.',
      flaw: 'Takes on too much. Doesn\'t advocate for herself. People-pleaser.',
      secrets: 'The love triangle is more complicated than anyone knows.',
      voiceNotes: 'Warm, capable, occasionally self-deprecating. More confident in work than romance.',
      appearance: 'Girl-next-door beauty. Always put-together but approachable.',
      arcStart: 'Analyst, support role, underestimated',
      arcChange: 'Takes on fixer responsibilities, love triangle intensifies',
      arcEnd: 'Full fixer, resolved love situation, own business success',
      tags: JSON.stringify(['BSS', 'analyst', 'event-planning', 'love-triangle', 'rising']),
    },
  });
  console.log(`Created: ${bella.name}`);

  const mason = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Mason',
      aliases: JSON.stringify(['Mason']),
      archetype: 'The Truth-Telling Friend',
      age: 'Late 30s - Early 40s',
      background: `Jasper\'s best friend from Duke lacrosse days. UVA Law. Outside advisor who tells Jasper what he needs to hear, not what he wants to hear. Part of Jasper\'s "Iron Sharpens Iron Council."`,
      motivations: 'To keep Jasper grounded. To maintain the friendship that matters. To be the voice of reason.',
      fears: 'Watching Jasper destroy his marriage. Being unable to help.',
      flaw: 'Can be too blunt. Sometimes his advice comes across as judgment.',
      secrets: 'Went through his own marriage crisis years ago. Knows exactly what Jasper is risking.',
      voiceNotes: 'Lawyer precise but friend warm. Uses sports metaphors. Doesn\'t sugarcoat.',
      appearance: 'Former athlete gone slightly soft. Expensive casual. Approachable authority.',
      arcStart: 'Concerned friend watching from outside',
      arcChange: 'Calls Jasper out when no one else will',
      arcEnd: 'Celebrates the restoration of Jasper\'s family',
      tags: JSON.stringify(['friend', 'mentor', 'advisor', 'lawyer', 'truth-teller']),
    },
  });
  console.log(`Created: ${mason.name}`);

  const jessica = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Jessica',
      aliases: JSON.stringify(['Jessica']),
      archetype: 'The Original Mentor',
      age: 'Late 50s - 60s',
      background: `Found Jasper on troubled construction megaprojects. Recognized his talent and mentored him into crisis management. Early champion who gave him his start. Now semi-retired but sits on boards and maintains social influence.`,
      motivations: 'To see her protégés succeed. To maintain influence without the daily grind.',
      fears: 'That Jasper will burn out like she almost did. Becoming irrelevant.',
      flaw: 'Can be too hands-off now. Sometimes her advice is outdated.',
      secrets: 'She sees herself in Jasper\'s workaholism - she almost lost her own family the same way.',
      voiceNotes: 'Elegant, measured. Speaks from experience. Occasional steel when needed.',
      appearance: 'Aging gracefully. Power suits softened with personal touches. Commanding presence.',
      arcStart: 'Semi-retired mentor, occasional advisor',
      arcChange: 'Provides wisdom during Elena\'s crisis',
      arcEnd: 'Proud of Jasper\'s growth',
      tags: JSON.stringify(['mentor', 'retired', 'advisor', 'founder-figure']),
    },
  });
  console.log(`Created: ${jessica.name}`);

  const evie = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Evie',
      aliases: JSON.stringify(['Evie']),
      archetype: 'The Outsider-Insider',
      age: 'Late 20s',
      background: `Pulled into Elena\'s orbit despite not being glamorous, political, or strategic like the core women. Has special relationship with Sofia. Represents the "normal" person in an elite world.`,
      motivations: 'To find where she belongs. To maintain her identity while growing.',
      fears: 'Not measuring up. Losing her authentic self to fit in.',
      flaw: 'Self-doubt. Compares herself to others too much.',
      secrets: 'Her feelings for Sofia are more complicated than friendship.',
      voiceNotes: 'Self-deprecating humor. Calls herself the "background girl." Surprisingly insightful.',
      appearance: 'Pretty but not glamorous. Comfortable in her skin when she forgets to compare.',
      arcStart: 'On the periphery, unsure of her place',
      arcChange: 'Sofia relationship deepens, finds her role',
      arcEnd: 'Confident in her unique place in the group',
      tags: JSON.stringify(['friendship', 'outsider', 'growth', 'Sofia-connection']),
    },
  });
  console.log(`Created: ${evie.name}`);

  const sofia = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Sofia',
      aliases: JSON.stringify(['Sofia']),
      archetype: 'The Principled Beauty',
      age: 'Late 20s',
      background: `Close to Evie. Physician boyfriend storyline. Has conviction about relationships - her choices reflect values, not shyness. Connected to the wider social circle but maintains her own standards.`,
      motivations: 'To find love that matches her values. To support her friends authentically.',
      fears: 'Settling. Losing Evie if their relationship changes.',
      flaw: 'Can be too idealistic. Sometimes her standards prevent connection.',
      secrets: 'The physician boyfriend is more serious than she\'s admitted.',
      voiceNotes: 'Warm, direct. Doesn\'t gossip. Supportive without being sycophantic.',
      appearance: 'Natural beauty. Doesn\'t try too hard. Elegant simplicity.',
      arcStart: 'Single, principled, close to Evie',
      arcChange: 'Physician relationship develops, dynamics with Evie shift',
      arcEnd: 'Resolved relationships, matured friendships',
      tags: JSON.stringify(['friendship', 'values', 'Evie-connection', 'physician-storyline']),
    },
  });
  console.log(`Created: ${sofia.name}`);

  const maddie = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Maddie',
      aliases: JSON.stringify(['Maddie']),
      archetype: 'The Survivor',
      age: 'Late 20s - Early 30s',
      background: `Has overcome significant personal struggles. Her difficult past shaped her resilience. Connected to Sofia and the wider friend group. Her history affects her confidence and relationships.`,
      motivations: 'To build a life beyond her past. To be seen for who she is now.',
      fears: 'Her past defining her. Not being enough.',
      flaw: 'Self-protection can become walls. Trust issues.',
      secrets: 'The full story of her past is darker than most know.',
      voiceNotes: 'Guarded at first, opens up slowly. Dry humor as defense.',
      appearance: 'Attractive but doesn\'t flaunt it. Comfortable clothes, practical style.',
      arcStart: 'Managing her past, keeping walls up',
      arcChange: 'Group acceptance helps her open up',
      arcEnd: 'Integrated, healing, contributing',
      tags: JSON.stringify(['survivor', 'growth', 'friendship', 'healing']),
    },
  });
  console.log(`Created: ${maddie.name}`);

  const isabella = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Isabella',
      aliases: JSON.stringify(['Isabella', 'Izzy']),
      archetype: 'The Glamorous Mentor',
      age: 'Late 30s - 40s',
      background: `Former Broadway star who now runs an elite youth talent academy. Mentors Grace in performing arts and Kendra in stage presence/professional femininity. Acts as social hub between elite families, BSS, and the Wives Club. "Motherly" figure to younger women.`,
      motivations: 'To nurture the next generation. To use her platform for mentorship.',
      fears: 'Irrelevance as she ages out of performing. Not having children of her own.',
      flaw: 'Can be too controlling in mentoring. Perfectionist standards.',
      secrets: 'Regrets choosing career over family when younger.',
      voiceNotes: 'Theater-trained voice. Commands attention. Warm with mentees.',
      appearance: 'Glamorous but age-appropriate. Always performance-ready.',
      arcStart: 'Established mentor figure',
      arcChange: 'Deeper connections with Grace and Kendra',
      arcEnd: 'Surrogate family through mentorship',
      tags: JSON.stringify(['mentor', 'Broadway', 'glamour', 'Wives-Club', 'performing-arts']),
    },
  });
  console.log(`Created: ${isabella.name}`);

  const selene = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Selene',
      aliases: JSON.stringify(['Selene']),
      archetype: 'The Wild Card',
      age: 'Late 20s',
      background: `Close to Addie and Hawk but wants her own identity without neediness. Reckless fun energy in the group. Gets into complicated situations including encounter with Count Rafael d\'Argento.`,
      motivations: 'To live fully without being defined by others. To find excitement.',
      fears: 'Being trapped. Being boring. Needing people too much.',
      flaw: 'Recklessness. Poor judgment in men. Avoids commitment.',
      secrets: 'The Rafael situation is more dangerous than she admits.',
      voiceNotes: 'Quick, witty, deflects with humor. Rarely serious.',
      appearance: 'Striking, attention-grabbing. Dresses to be noticed.',
      arcStart: 'Peripheral chaos agent',
      arcChange: 'Rafael situation creates real stakes',
      arcEnd: 'Matures without losing spark',
      tags: JSON.stringify(['wild-card', 'reckless', 'Addie-connection', 'Palace-of-Honor']),
    },
  });
  console.log(`Created: ${selene.name}`);

  const chris = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Chris',
      aliases: JSON.stringify(['Chris']),
      archetype: 'The Faith-Business Bridge',
      age: 'Late 30s - Early 40s',
      background: `Integrates faith with business life. Sounding board for colleagues. Arranges social connections (like Sofia\'s physician introduction). Respected for his values-based approach.`,
      motivations: 'To live his faith authentically in business. To help others find balance.',
      fears: 'Compromising values for success. Being seen as preachy.',
      flaw: 'Can be too cautious. Sometimes his faith makes him judgmental.',
      secrets: 'His own faith was tested by past business failures.',
      voiceNotes: 'Thoughtful, measured. Asks good questions. Never pushy about faith.',
      appearance: 'Professional, approachable. Cross that he doesn\'t hide.',
      arcStart: 'Established faith-business figure',
      arcChange: 'Supports others through their crises',
      arcEnd: 'Vindicated in his approach',
      tags: JSON.stringify(['faith', 'business', 'mentor', 'connector']),
    },
  });
  console.log(`Created: ${chris.name}`);

  const matt = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Matt',
      aliases: JSON.stringify(['Matt']),
      archetype: 'The Good Man',
      age: 'Early 30s',
      background: `In love triangle with Bella and Mandy. Good man navigating complicated situation. Eventually declares for Bella while trying to keep Mandy in their lives.`,
      motivations: 'To find real love. To do right by everyone. To build something lasting.',
      fears: 'Hurting people he cares about. Making the wrong choice.',
      flaw: 'Indecisive. Tries to please everyone. Avoids hard conversations.',
      secrets: 'He knew earlier than he admitted that Bella was the one.',
      voiceNotes: 'Earnest, genuine. Struggles with difficult conversations.',
      appearance: 'Handsome, approachable. The guy everyone likes.',
      arcStart: 'Triangle situation, unclear direction',
      arcChange: 'Trip forces clarity, declares for Bella',
      arcEnd: 'Committed relationship, integrated friend group',
      tags: JSON.stringify(['love-triangle', 'Bella', 'Mandy', 'romantic-lead']),
    },
  });
  console.log(`Created: ${matt.name}`);

  const mandy = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Mandy',
      aliases: JSON.stringify(['Mandy']),
      archetype: 'The Third Point',
      age: 'Late 20s',
      background: `Part of love triangle with Matt and Bella. Demands the trio trip that forces resolution. Ultimately wants Matt\'s happiness even if it\'s not with her. Remains part of their lives.`,
      motivations: 'To know where she stands. To maintain friendships even through romantic disappointment.',
      fears: 'Being strung along. Losing both relationships.',
      flaw: 'Can be demanding. Sometimes creates drama.',
      secrets: 'She suspected the outcome before the trip.',
      voiceNotes: 'Direct, doesn\'t play games. Emotional when hurt.',
      appearance: 'Attractive, confident. Different energy than Bella.',
      arcStart: 'Triangle participant, uncertain status',
      arcChange: 'Forces resolution through trip ultimatum',
      arcEnd: 'Graceful acceptance, maintained friendships',
      tags: JSON.stringify(['love-triangle', 'Matt', 'Bella', 'friend']),
    },
  });
  console.log(`Created: ${mandy.name}`);

  const cam = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Cam',
      aliases: JSON.stringify(['Cam', 'Camila']),
      archetype: 'The Star',
      age: 'Mid 20s - Early 30s',
      background: `Model inspiration: Natali Tangherlini. Former college baseball player who pivoted after injury. Or: Georgetown-trained journalist turned political advisor. Charismatic, makes audiences feel like close friends.`,
      motivations: 'To succeed on her own terms. To maintain authenticity in a fake world.',
      fears: 'Being used. Losing her genuine self to the image.',
      flaw: 'Can be guarded. Sometimes sharp when feeling threatened.',
      secrets: 'The public persona and private self are more different than people know.',
      voiceNotes: 'Funny, witty, able to connect. More guarded one-on-one.',
      appearance: 'Star quality. Camera-ready but not artificial.',
      arcStart: 'Established in her world',
      arcChange: 'Drawn into BSS/Wives Club orbit',
      arcEnd: 'Integrated, using platform for good',
      tags: JSON.stringify(['media', 'star', 'journalist', 'Natali-inspired']),
    },
  });
  console.log(`Created: ${cam.name}`);

  const daniel = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Daniel',
      aliases: JSON.stringify(['Daniel']),
      archetype: 'The Scholar',
      age: 'Early 30s',
      background: `Yale PhD in International Relations. Rising intellectual in policy circles. His success validates the judgment of those who believed in him.`,
      motivations: 'To make a difference through ideas. To prove merit matters.',
      fears: 'Being dismissed as just academic. Not having real impact.',
      flaw: 'Can be too in his head. Sometimes misses emotional undercurrents.',
      secrets: 'Imposter syndrome despite credentials.',
      voiceNotes: 'Articulate, thoughtful. Can lecture if not careful.',
      appearance: 'Academic handsome. Glasses, disheveled charm.',
      arcStart: 'Rising academic/policy figure',
      arcChange: 'Real-world experience through BSS connections',
      arcEnd: 'Integrated scholar-practitioner',
      tags: JSON.stringify(['academic', 'Yale', 'policy', 'intellectual']),
    },
  });
  console.log(`Created: ${daniel.name}`);

  const riley = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Riley Whitmore',
      aliases: JSON.stringify(['Riley', 'Riley Grant']),
      archetype: 'The Steady Hand',
      age: 'Late 30s',
      background: `Male Riley works directly at Jasper\'s Charlotte HQ. Mentor, boss, and partner in running day-to-day operations. Addie works under him. Reliable, competent, essential to BSS function.`,
      motivations: 'To keep BSS running smoothly. To develop talent like Addie.',
      fears: 'Chaos. Things falling through cracks.',
      flaw: 'Can be too focused on process. Risk-averse.',
      secrets: 'Turned down field work to stay in Charlotte.',
      voiceNotes: 'Calm, organized. Good at defusing tension.',
      appearance: 'Professional, approachable. Dad energy.',
      arcStart: 'Established operations leader',
      arcChange: 'Steps up during Jasper\'s absence',
      arcEnd: 'Vindicated leadership, developed Addie',
      tags: JSON.stringify(['BSS', 'operations', 'Charlotte-HQ', 'mentor']),
    },
  });
  console.log(`Created: ${riley.name}`);

  const caroline = await prisma.character.create({
    data: {
      projectId: project.id,
      name: 'Caroline Bauer',
      aliases: JSON.stringify(['Caroline']),
      archetype: 'The Washington Player',
      age: '50s',
      background: `D.C. mentor figure. Relationship with Lexi is cool but professional. Sees Lexi as dangerous but necessary. Connected to political/power circles.`,
      motivations: 'To maintain power and influence. To manage threats like Lexi.',
      fears: 'Losing control. Being outmaneuvered.',
      flaw: 'Too calculating. Uses people as chess pieces.',
      secrets: 'Her past includes compromises she doesn\'t discuss.',
      voiceNotes: 'D.C. smooth. Never says what she means directly.',
      appearance: 'Power-dressed. Every detail intentional.',
      arcStart: 'Established D.C. figure',
      arcChange: 'Involved in crises that reach Washington',
      arcEnd: 'Maintains position, grudging respect for protagonists',
      tags: JSON.stringify(['DC', 'politics', 'power', 'mentor', 'Lexi-connection']),
    },
  });
  console.log(`Created: ${caroline.name}`);

  // ============================================
  // CREATE RELATIONSHIPS
  // ============================================

  console.log('\nCreating relationships...');

  // Jasper relationships
  await createRelationship(jasper.id, elena.id, 'spouse', 'Married, central relationship of the series');
  await createRelationship(jasper.id, grace.id, 'father', 'Doting but often absent father');
  await createRelationship(jasper.id, lucas.id, 'father', 'Father of newborn son');
  await createRelationship(jasper.id, harper.id, 'business partner', 'Co-founded BSS, strategic partners');
  await createRelationship(jasper.id, addie.id, 'mentor', 'Boss who develops her into Managing Partner');
  await createRelationship(jasper.id, mason.id, 'best friend', 'Duke lacrosse buddy, truth-teller');
  await createRelationship(jasper.id, jessica.id, 'mentee', 'She discovered and mentored him');

  // Elena relationships
  await createRelationship(elena.id, grace.id, 'mother', 'Primary parent, deep bond');
  await createRelationship(elena.id, addie.id, 'close friend', 'Complex friendship, mutual respect');
  await createRelationship(elena.id, bella.id, 'mentor', 'Guides her in business and life');

  // Addie relationships
  await createRelationship(addie.id, hawk.id, 'romantic partner', 'Love story, eventual marriage');
  await createRelationship(addie.id, kendra.id, 'complicated', 'Past romantic involvement, now colleagues');
  await createRelationship(addie.id, grace.id, 'godparent', 'Becomes godmother through conversion');
  await createRelationship(addie.id, selene.id, 'close friend', 'Selene is close to Addie and Hawk');
  await createRelationship(addie.id, riley.id, 'reports to', 'Works under Riley at Charlotte HQ');

  // Hawk relationships
  await createRelationship(hawk.id, grace.id, 'godparent', 'Becomes godfather through conversion');
  await createRelationship(hawk.id, ridge.id, 'brotherhood', 'Operator bond, SEAL connection');

  // Bella relationships
  await createRelationship(bella.id, matt.id, 'romantic partner', 'Love triangle resolution - they end up together');
  await createRelationship(bella.id, mandy.id, 'complicated friend', 'Triangle dynamic, maintain friendship');
  await createRelationship(bella.id, kendra.id, 'colleague', 'Becomes analyst for Kendra');

  // Evie/Sofia
  await createRelationship(evie.id, sofia.id, 'close friend', 'Special relationship, possibly more');

  console.log('Relationships created.');

  // ============================================
  // CREATE BOOK 1 STRUCTURE
  // ============================================

  console.log('\nCreating Book 1 structure...');

  // Delete existing Book 1 if exists
  const existingBook = await prisma.book.findFirst({
    where: { projectId: project.id, title: 'Five Feet From Home: Book 1' },
  });
  if (existingBook) {
    await prisma.chapter.updateMany({
      where: { bookId: existingBook.id },
      data: { bookId: null },
    });
    await prisma.book.delete({ where: { id: existingBook.id } });
  }

  const book1 = await prisma.book.create({
    data: {
      projectId: project.id,
      title: 'Five Feet From Home: Book 1',
      subtitle: 'The Five Foot World',
      synopsis: `Jasper Barrett is the best crisis manager in the business - called at 2 AM to fix corporate disasters worldwide. His "Five Foot World" mindset makes him exceptional: focus only on what's within immediate reach, solve the crisis, move on. But when his wife Elena collapses from a sudden medical emergency, Jasper faces a crisis he can't manage. For the first time, he must choose between his career and his family - and learn that some things can't be fixed from five feet away.`,
      structure: JSON.stringify({
        hook: 'Chapter 1 - The Call: 2:17 AM phone call pulls Jasper from bed to London data breach',
        incitingIncident: 'Elena collapses - medical emergency that can\'t be solved with work skills',
        firstPlotPoint: 'Jasper stays home for the first time in years, begins reconnecting',
        midpoint: 'Jasper must choose between major client crisis and Elena\'s recovery',
        darkMoment: 'Grace asks "Daddy, are you on our team?" - confronts his absence',
        climax: 'Final choice between old patterns and new commitment',
        resolution: 'Big Party at Barrett house - family restored, new balance achieved',
      }),
      status: 'drafting',
    },
  });

  // Create chapters for Book 1
  const chapters = [
    {
      number: 1,
      title: 'The Call',
      synopsis: '2:17 AM - London data breach. Jasper snaps into operational mode, assembling a team and flying out before dawn. First glimpse of the family anchor he leaves behind.',
      pov: 'Jasper Barrett',
      beats: ['Phone buzzes at 2:17 AM', 'Jasper already reaching for go-bag', 'Quick glimpse of Elena sleeping', 'Photo of wife and daughter in passport wallet', 'On plane before dawn'],
    },
    {
      number: 2,
      title: 'War Room',
      synopsis: 'Jasper in his element: handling high-pressure executives, dictating media strategy, firefighting misinformation. Flashes of personal life only in quiet in-between moments.',
      pov: 'Jasper Barrett',
      beats: ['Crisis command center in London', 'Jasper commanding the room', 'Brief call home - distracted', 'Team watches him work with awe', 'Success - but at what cost?'],
    },
    {
      number: 3,
      title: 'Passing Through',
      synopsis: 'Brief stop at home between trips. Jasper is physically present but mentally elsewhere, already preparing for the next client emergency.',
      pov: 'Jasper Barrett',
      beats: ['Arrives home exhausted', 'Grace excited then disappointed', 'Elena\'s quiet frustration', 'Already checking emails', 'Next crisis calling'],
    },
    {
      number: 4,
      title: 'The Five-Foot Rule',
      synopsis: 'We see how Jasper survives pressure: focusing only on what\'s within immediate reach. Great for the job, destructive at home.',
      pov: 'Jasper Barrett',
      beats: ['Flashback to how he learned the rule', 'Applying it to current crisis', 'Elena mentions marriage counseling - he deflects', 'Works even during family dinner', 'The walls he doesn\'t see building'],
    },
    {
      number: 5,
      title: 'The Collapse',
      synopsis: 'Elena collapses from a sudden, serious medical issue. The hospital scene shakes Jasper: this is a crisis he can\'t control. Emotional pivot to love story.',
      pov: 'Jasper Barrett',
      beats: ['Normal morning routine', 'Elena collapses', 'Hospital - Jasper in shock', 'Doctors speak - he can\'t fix this', 'Grace terrified, needs him present'],
    },
    {
      number: 6,
      title: 'Crisis He Can\'t Manage',
      synopsis: 'Jasper tries to apply work skills to Elena\'s situation. It doesn\'t work. He must learn to be present instead of productive.',
      pov: 'Jasper Barrett',
      beats: ['Trying to research, plan, fix', 'Nurses gently redirect him', 'Addison calls - work crisis', 'He hesitates - then delegates', 'First real conversation with Elena in months'],
    },
    {
      number: 7,
      title: 'Our Team',
      synopsis: 'Grace asks if Daddy is "on our team." Jasper freezes. The words stick in his head. He begins choosing family.',
      pov: 'Jasper Barrett',
      beats: ['Grace visits hospital', 'The question that breaks him', 'Jasper really sees his daughter', 'Promise made', 'Elena watches - hope returning'],
    },
    {
      number: 8,
      title: 'Coming Home',
      synopsis: 'Elena is discharged. Jasper takes real time off. He learns to be present - cooking, school runs, quiet mornings.',
      pov: 'Jasper Barrett',
      beats: ['Bringing Elena home', 'Learning the house routine', 'Cooking disasters and successes', 'Grace blooming with attention', 'Elena healing - physically and emotionally'],
    },
    {
      number: 9,
      title: 'The Test',
      synopsis: 'Major work crisis erupts. Old Jasper would have been on a plane in hours. New Jasper must choose.',
      pov: 'Jasper Barrett',
      beats: ['Crisis call from Harper', 'The pull of old patterns', 'Elena watching, not asking him to stay', 'Jasper makes a different choice', 'Delegates to team - they rise'],
    },
    {
      number: 10,
      title: 'The Big Party',
      synopsis: 'Elena hosts the event she\'d been planning. Jasper is fully present. The family is restored. New chapter begins.',
      pov: 'Multiple',
      beats: ['Party preparations - Jasper helping', 'Guests arrive - the whole world watching', 'Grace showing off her present dad', 'Elena and Jasper moment', 'Toast to family, balance, new beginning'],
    },
  ];

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const chapter = await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book1.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        beats: JSON.stringify(ch.beats),
        status: 'draft',
        sortOrder: i,
      },
    });

    // Link characters to chapters
    const chapterCharacters = ['Jasper Barrett'];
    if (ch.pov === 'Multiple' || ch.synopsis.includes('Elena')) chapterCharacters.push('Elena Barrett');
    if (ch.synopsis.includes('Grace')) chapterCharacters.push('Grace Barrett');
    if (ch.synopsis.includes('Harper') || ch.synopsis.includes('Addison')) chapterCharacters.push('Addison Price');
    if (ch.synopsis.includes('Harper')) chapterCharacters.push('Harper');

    for (const charName of chapterCharacters) {
      const char = await prisma.character.findFirst({
        where: { projectId: project.id, name: charName },
      });
      if (char) {
        await prisma.chapterCharacter.create({
          data: {
            chapterId: chapter.id,
            characterId: char.id,
            role: charName === 'Jasper Barrett' ? 'pov' : 'major',
          },
        });
      }
    }
  }

  console.log(`Created Book 1 with ${chapters.length} chapters.`);

  // ============================================
  // CREATE PLOT THREADS
  // ============================================

  console.log('\nCreating plot threads...');

  await prisma.plotThread.deleteMany({ where: { projectId: project.id } });

  const plotThreads = [
    {
      name: 'The Five Foot World',
      premise: 'Jasper\'s coping mechanism of focusing only on immediate crises serves him at work but destroys his home life.',
      stakes: 'His marriage and relationship with Grace will fail if he doesn\'t learn to see beyond five feet.',
      phases: ['Established pattern - work success, family neglect', 'Crisis breaks the pattern', 'Learning new ways', 'Integration - success in both worlds'],
      status: 'active',
    },
    {
      name: 'Elena\'s Recovery',
      premise: 'Elena\'s medical emergency forces the family to slow down and reconnect.',
      stakes: 'Elena\'s health and the marriage itself hang in the balance.',
      phases: ['The collapse', 'Hospital vigil', 'Home recovery', 'Stronger together'],
      status: 'active',
    },
    {
      name: 'Grace\'s Question',
      premise: '"Daddy, are you on our team?" The question that haunts Jasper.',
      stakes: 'Grace\'s relationship with her father and her sense of security.',
      phases: ['The question is asked', 'Jasper wrestles with it', 'Actions speak louder', 'Team restored'],
      status: 'active',
    },
    {
      name: 'BSS Leadership Transition',
      premise: 'With Jasper stepping back, Harper and Addie must step up.',
      stakes: 'The company\'s survival and the careers of those who depend on it.',
      phases: ['Crisis during Jasper\'s absence', 'Harper/Addie prove themselves', 'New structure emerges', 'Stronger organization'],
      status: 'active',
    },
  ];

  for (const pt of plotThreads) {
    await prisma.plotThread.create({
      data: {
        projectId: project.id,
        name: pt.name,
        premise: pt.premise,
        stakes: pt.stakes,
        phases: JSON.stringify(pt.phases),
        status: pt.status,
      },
    });
  }

  console.log(`Created ${plotThreads.length} plot threads.`);

  // Summary
  const charCount = await prisma.character.count({ where: { projectId: project.id } });
  const chapterCount = await prisma.chapter.count({ where: { projectId: project.id } });

  console.log('\n' + '='.repeat(60));
  console.log('CANON CREATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Project: ${project.name}`);
  console.log(`Characters: ${charCount}`);
  console.log(`Chapters: ${chapterCount}`);
  console.log(`Plot Threads: ${plotThreads.length}`);
  console.log('\nOpen http://localhost:3000 to view the results.');
}

async function createRelationship(fromId: string, toId: string, type: string, description: string) {
  try {
    await prisma.characterRelationship.create({
      data: {
        fromCharacterId: fromId,
        toCharacterId: toId,
        relationshipType: type,
        description,
        confidence: 1.0,
      },
    });
  } catch (e) {
    // Ignore duplicates
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
