import { PrismaClient } from '@prisma/client';
import * as mammoth from 'mammoth';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== COMPREHENSIVE CONTENT INGESTION ===\n");

  // ========== CHAT 1 - MAIN CHARACTERS ==========
  console.log("--- Chat 1: Main Characters ---\n");

  const chat1Characters = [
    {
      name: 'Jasper Barrett',
      firstName: 'Jasper',
      lastName: 'Barrett',
      archetype: 'Crisis Management CEO / Protagonist',
      hubLocation: 'Charlotte, NC',
      personality: 'Strategic, commanding, distinct, memorable. Confident but learning to balance work and family.',
      background: `Founder and CEO of Barrett Strategic Solutions (BSS). Jasper built a global crisis management empire but struggles with the "five feet from home" dilemma - always focused on the next crisis, the next task.

CHAT 1 ARC:
- Opens with Jasper working crisis management, always on calls
- Misses family moments (Grace's soccer games, school events)
- Elena's collapse forces him to confront his choices
- Learns to delegate, trust Harper and Addie more
- Transitions from field to office management over time

KEY TRAITS:
- Lives by "five feet" rule - only focuses on immediate task
- This narrow focus means he sometimes misses the bigger picture
- Eventually learns that family IS the mission

WORK STYLE:
- 12-hour war room marathons
- Whiteboards covered in timelines
- Media strategy sessions
- The office calls him when fires start`,
      relationships: `Elena Barrett - Wife, their relationship tested by his work obsession
Grace Barrett - Daughter, he misses key moments then learns to be present
Harper - COO, becomes his field heir
Addie - Senior fixer, trusts her completely
Hawk - Brother-in-arms connection
The Team - His BSS family`,
      arcStart: 'Workaholic CEO missing family moments, focused only on crises',
      arcChange: 'Elena\'s collapse and Grace\'s questions force him to reconsider',
      arcEnd: 'Learns to delegate, be present, balance work and home',
    },
    {
      name: 'Elena Barrett',
      firstName: 'Elena',
      lastName: 'Barrett',
      archetype: 'Wife / School Counselor / Maison Aurelia Founder',
      hubLocation: 'Charlotte, NC - The Aurelia Estate',
      personality: 'Supportive but worn thin. Elegant, driven, learning to thrive again after health crisis.',
      background: `Elena is Jasper's wife and Grace's mother. Originally a school counselor, worn thin by Jasper's constant absences.

CHAT 1 ARC:
- Age 32 at story start
- Supportive but exhausted by missed birthdays, sleepless nights
- The "knock on the door" fear - worrying Jasper won't come home
- Collapses from stress/health crisis
- Recovery becomes turning point for whole family

RETURN TO WORK:
After recovery, Elena returns to work in luxury real estate and nonprofit (Maison Aurelia). The Wives Club Zoom calls support her transformation. Addie helps style her for confidence.

KEY MOMENTS:
- Hospital scene where Jasper realizes what he's missing
- Working together on personal project reopens intimacy
- Back at work, thriving with new confidence`,
      relationships: `Jasper Barrett - Husband, tested marriage that strengthens
Grace Barrett - Daughter, protective and loving
Addie - Close friend, style mentor, protector
Kendra - Intimate connection, deepens during Jasper's travels
The Wives Club - Her support network`,
      arcStart: 'Worn thin by absent husband, carrying family alone',
      arcChange: 'Health collapse forces family to recalibrate',
      arcEnd: 'Thriving in work and relationships, stronger marriage',
    },
    {
      name: 'Grace Barrett',
      firstName: 'Grace',
      lastName: 'Barrett',
      archetype: 'Daughter / Heart of the Family',
      hubLocation: 'Charlotte, NC',
      personality: 'Sweet, perceptive beyond her years, keeps journal of "things to tell Daddy when he is home."',
      background: `Grace is Jasper and Elena's daughter. At story start, she's 6 years old.

CHAT 1 ROLE:
- Keeps a journal of things to tell Daddy when he's home
- The heart that keeps the family grounded
- Her questions cut through adult pretenses
- "Is Daddy on our team anymore?" - the question that shakes Jasper

KEY MOMENTS:
- Soccer games where Jasper is texting instead of watching
- School projects Jasper helps with (no phone in reach)
- Recitals he finally attends
- Calling Evie "Aunt Evie" for the first time

GROWING UP:
As story progresses, Grace goes from 6 to teenager. She becomes friends with Jazz, helps at Strong & Savory, and sees Addie/Kendra/Bella as "big sisters."`,
      relationships: `Jasper Barrett - Daddy, learning to be present
Elena Barrett - Mama, her rock
Addie - "Aunt Addie," runs to her at parties
Evie Maren - "Aunt Evie," favorite teacher
Jazz Carter - Friend, Special Olympics connection
Kendra - Big sister figure`,
    },
    {
      name: 'Harper Vance',
      firstName: 'Harper',
      lastName: 'Vance',
      archetype: 'COO / Former Journalist / Field Heir',
      hubLocation: 'Charlotte, NC / Global Travel',
      personality: 'Nordic features, early 40s, sharp and capable. Former embedded journalist turned crisis comms consultant.',
      background: `Harper is BSS's COO and Jasper's field heir.

CELEBRITY MATCH: Rebecca Ferguson (Mission: Impossible – Fallout, Silo)

CHAT 1 ARC:
- Former embedded journalist turned private crisis comms consultant
- Rises to become Jasper's top field presence after her engagement
- Gets proposed to by boyfriend
- Instead of stepping back, becomes MORE involved in field work

ROLE AT BSS:
- COO - Chief Operating Officer
- Travels globally for crisis management
- 14 hours ahead in Asia juggling market fires
- Shows rising prominence while Jasper learns to stay home more

BOOK 4:
- Gets proposed to
- Becomes Jasper's field heir "like he used to be"
- Wedding planning happens during Addie's Denver crisis`,
      relationships: `Jasper Barrett - Boss, mentor, trusts her completely
Boyfriend/Fiancé - Proposes during Book 4
Addie - Colleague, feels Addie's absence during wedding planning
Elena - Friend, backyard dinners together
Riley - Works with him on logistics`,
      arcStart: 'Rising COO learning the ropes',
      arcChange: 'Engagement and increasing responsibility',
      arcEnd: 'Field heir, running global operations',
    },
    {
      name: 'Kendra Vos',
      firstName: 'Kendra',
      lastName: 'Vos',
      archetype: 'CrossFit Athlete / Intimate Connection',
      hubLocation: 'Denver, CO / Charlotte visits',
      personality: 'Athletic brilliance, fit, glowing. Natural draw to anyone who admires strength paired with femininity. "The Engine" for ridiculous cardio capacity.',
      background: `Kendra is a CrossFit Games athlete with complex relationships in the orbit.

CHAT 1 INTRODUCTION:
- Age 24, from Denver, CO
- Just qualified for first CrossFit Games in 2025
- Nicknamed "The Engine" for cardio capacity

ATHLETIC CAREER:
- CrossFit Games competitor
- Places 5th at Games/Finals
- Sponsored by athletic brands
- Role model at Strong & Savory

RELATIONSHIPS:
- Has a boyfriend who gives her promise ring (not proposal)
- Intimate connection with Elena during Jasper's travels
- Addie has unresolved feelings for her
- Deepens bonds with Elena and Grace

BOOK 4:
- Boyfriend surprises her with promise ring after Games
- Addie is conflicted about her feelings
- Kendra settles into stable relationship
- Still close with Elena and Grace`,
      relationships: `Boyfriend - Promise ring, taking next step
Elena - Intimate connection, deep friendship
Addie - Unresolved spark, causes Addie pain
Grace - Big sister figure
Strong & Savory athletes - Mythic role model`,
      arcStart: 'Rising CrossFit star, finding her place',
      arcChange: 'Relationship with boyfriend deepens, intimacy with Elena',
      arcEnd: 'Stable relationship, integral part of family',
    },
    {
      name: 'Daniel',
      firstName: 'Daniel',
      archetype: 'BSS #4 / Addie\'s Protégé',
      hubLocation: 'Charlotte, NC / Field deployments',
      personality: 'Rising star, trusted fixer, groomed by Addie for leadership.',
      background: `Daniel is BSS's #4 operator, groomed by Addie as her trusted successor.

BOOK 4 ROLE:
- In Denver with Addie for month-long telecoms crisis
- Addie mentors him throughout
- Proves his judgment and capability
- Addie suggests Kendra work with him or Harper as analyst

DEVELOPMENT:
- Learning from Addie's methods
- Handles increasing responsibility
- Trusted with solo operations
- Part of the succession plan at BSS`,
      relationships: `Addie - Mentor, she grooms him for leadership
Jasper - Boss, recognizes his potential
Harper - Colleague, works field operations together
Kendra - Potential work partnership`,
    },
    {
      name: 'Riley',
      firstName: 'Riley',
      archetype: 'BSS Logistics / Road Support',
      hubLocation: 'Charlotte, NC',
      personality: 'The one who keeps things running. Phone tucked under chin, espresso in hand.',
      background: `Riley handles logistics for BSS, coordinating between field teams.

ROLE:
- Coordinates Harper in Asia and operations on ground
- Phone always in hand, espresso in other
- Keeps the home fires burning while field teams deploy
- Works with Harper on travel-heavy fixes

KEY SCENE:
While Harper's 14 hours ahead in Asia juggling market fires, Riley's in Charlotte, phone tucked under chin, coordinating everyone.`,
      relationships: `Harper - Close coordination on field ops
Jasper - Part of HQ team
The Team - Trusted logistics person`,
    },
  ];

  for (const char of chat1Characters) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({ data: { projectId: project.id, ...char, isConfirmed: true } });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({ where: { id: existing.id }, data: char });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ========== CAM STAR BUILD - SIRENS CHARACTERS ==========
  console.log("\n--- Cam Star Build: Sirens Characters ---\n");

  const sirensCharacters = [
    {
      name: 'Selene',
      firstName: 'Selene',
      archetype: 'Sirens Leader / Dangerous Allure',
      hubLocation: 'Various / International',
      personality: 'Dangerous allure, commanding presence. The one who spots talent and builds the empire.',
      background: `Selene is the leader of the Sirens - an elite group of cam performers and influencers.

ROLE:
- Spots talent with "rare ability to make intimacy look effortless"
- Builds the Sirens organization
- Deploys her women at BSS-backed international galas
- Commands attention without trying

THE SIRENS STRUCTURE:
Selene created a tiered organization:
- Bombshells (attention commanders)
- Specialists (unique talents)
- Junior layer (apprentices like Lila)

THE TRIFECTA:
Selene unleashes three bombshells when she wants everyone to look:
- Valeria = old-world Mediterranean glamour
- Scarlett = curvy intellectual dominance
- Camila = cam-powered digital queen`,
      relationships: `The Sirens - Her organization
Valeria Knight - European Bombshell
Scarlett Vaughn - Intellectual Bombshell
Camila Rose - Digital Bombshell
Lila Monroe - Apprentice
BSS - Business connections`,
    },
    {
      name: 'Lila Monroe',
      firstName: 'Lila',
      lastName: 'Monroe',
      nickname: 'Lila Lux',
      archetype: 'Sirens Assistant / Apprentice Cam Actress',
      hubLocation: 'Various',
      personality: 'Outdoorsy: hiking, skiing, horseback riding. Casual, playful persona. Gets things done while others hold spotlight.',
      background: `Stage Name: Lila Lux

ORIGIN:
- Rose to fame online with casual, playful persona
- Videos feel more like "hanging out with a flirty friend"
- Selene spotted her for rare ability to make intimacy look effortless

ROLE IN SIRENS:
- Assistant/Apprentice position
- Actually gets things done while Jenna holds spotlight
- Others underestimate her because she doesn't flaunt power
- Junior layer of leadership

PERSONALITY:
The one who makes everything happen behind the scenes while appearing to just be helping out.`,
      relationships: `Selene - Boss, mentor
Jenna - Works under her spotlight
The Sirens - Part of the organization`,
    },
    {
      name: 'Valeria Knight',
      firstName: 'Valeria',
      lastName: 'Knight',
      archetype: 'European Bombshell / Sirens',
      hubLocation: 'Europe / International',
      personality: 'Luxurious, slow-burn seduction. European sophistication. Talks philosophy, art, and politics.',
      background: `Modeled after Valentina Nappi - European Bombshell aesthetic.

CAM STYLE:
- Luxurious, slow-burn seduction
- Streams from glamorous, styled rooms
- Velvet sofas, chandeliers, soft lighting
- Plays up European sophistication
- Lingerie, silk robes, wine glasses
- Discusses philosophy, art, and politics

ROLE IN SIRENS:
Part of the "Bombshell Trifecta" - old-world Mediterranean glamour. When Selene wants everyone to look, everyone to talk, and no one to forget, she deploys the trifecta.`,
      relationships: `Selene - Leader
Scarlett Vaughn - Fellow Bombshell
Camila Rose - Fellow Bombshell
The Sirens - Organization`,
    },
    {
      name: 'Scarlett Vaughn',
      firstName: 'Scarlett',
      lastName: 'Vaughn',
      archetype: 'Intellectual Bombshell / Sirens',
      hubLocation: 'Various',
      personality: 'Direct, confident, playful but with authority. "Talk first, tease after" approach. Wit before seduction.',
      background: `Modeled after Angela White - Intellectual Bombshell aesthetic.

CAM STYLE:
- Direct, confident, playful but with authority
- High-definition, polished setups like luxury studios
- "Talk first, tease after" sessions
- Debating, joking, showing wit before shifting to seduction
- For viewers who need intellectual engagement too

ROLE IN SIRENS:
Part of the "Bombshell Trifecta" - curvy intellectual dominance. The one who proves beauty and brains go together.`,
      relationships: `Selene - Leader
Valeria Knight - Fellow Bombshell
Camila Rose - Fellow Bombshell
The Sirens - Organization`,
    },
    {
      name: 'Camila Rose',
      firstName: 'Camila',
      lastName: 'Rose',
      nickname: 'Cami Rae',
      archetype: 'Digital Bombshell / Cam Queen / Sirens',
      hubLocation: 'Miami / Digital',
      personality: 'Hyper-modern, influencer-style. Redhead with striking features. Always perfectly lit, always camera-ready.',
      background: `Stage Name: Cami Rae
Modeled after Caitlin Bell / top cam performers with "bombshell cam queen" aesthetics.

LOOK:
- Redhead with striking features
- Full lips, long legs, statuesque figure
- Always perfectly lit, always camera-ready

CAM STYLE:
- Hyper-modern, influencer-style streaming
- Neon lighting, ring lights, perfect makeup
- Curated backgrounds (luxury apartments, Miami skylines)
- Very interactive - polls, Q&As
- Makes viewers feel like they're part of something exclusive

ROLE IN SIRENS:
Part of the "Bombshell Trifecta" - cam-powered digital queen. The modern face of the organization.`,
      relationships: `Selene - Leader
Valeria Knight - Fellow Bombshell
Scarlett Vaughn - Fellow Bombshell
The Sirens - Organization`,
    },
  ];

  for (const char of sirensCharacters) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({ data: { projectId: project.id, ...char, isConfirmed: true } });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({ where: { id: existing.id }, data: char });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ========== CHAT 1 STORYLINES ==========
  console.log("\n--- Chat 1: Main Story Arcs ---\n");

  const chat1Storylines = [
    {
      title: 'Chat 1: Part 1 - Setting the Stakes',
      category: 'Timeline - Book 1',
      description: 'Opening arc establishing characters and conflicts',
      content: `PART 1 - SETTING THE STAKES (Chapters 1-10)

COLD OPEN:
Jasper and team wrapping three major issues. Establishing the crisis management world.

CHAPTER STRUCTURE:
Ch 1 - Rooftop: Flood rescue in progress. Jack (Jasper) narrates through touch, breath, details - "five feet at a time"
Ch 2 - Home Front: Breakfast scene, Jack distracted, already mentally at work. Elena hints at family strain.
Ch 3 - Cracks at Work: Training exercise where Jack focuses on his task so hard he misses teammate's error
Ch 4 - Avoidance: Grace's soccer game. Jack physically there but answering work texts. Grace notices.
Ch 5 - The Pile-Up: Multi-vehicle accident. Jack chooses immediate victim over teammate in trouble.

THE FIVE-FOOT PHILOSOPHY:
Jack/Jasper is calm, methodical, unbeatable because he focuses only on the immediate rope, the next handhold, the next breath. But this narrow focus means he sometimes misses the bigger picture.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett'])
    },
    {
      title: 'Chat 1: Part 2 - The Breaking Point',
      category: 'Timeline - Book 1',
      description: 'Elena\'s collapse and family reckoning',
      content: `PART 2 - THE BREAKING POINT

KEY CHAPTERS:
Ch 6 - The Confrontation: Elena says she's tired of being a "safe house he visits." Grace asks "Is Daddy on our team?"
Ch 7 - Locker Room Alone: Jack realizes no one to text after shift. Even crew cooling toward him.
Ch 8 - The Rookie's Words: Rookie says: "You can't save the world five feet at a time. Sometimes you've got to look up."

ELENA'S COLLAPSE:
The hospital scene becomes the turning point. Jasper in the low hospital light, phone in hand, reading messages to Elena while she dozes.

He sat in the triangular chair beside the bed, one hand on hers, finally present.

THE REALIZATION:
"You've been somewhere else in your head... I can see it." Elena's words cut through. Jasper realizes he never defined what the "payoff" was for all his absence.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett'])
    },
    {
      title: 'Chat 1: Part 3 - The Reckoning',
      category: 'Timeline - Book 1',
      description: 'Jasper learns to balance and reconnect',
      content: `PART 3 - THE RECKONING

KEY CHAPTERS:
Ch 9 - Decision Point: Major downtown collapse. Jack deliberately steps back, letting others lead. Stays available but not consumed.
Ch 10 - Bridge: At home, Jack sits with Grace to help with school project, no phone in reach. Elena notices the change.
Ch 11 - The Real Win: Jack still works rescue but mentors more, deploys less. He's at Grace's recital, holding Elena's hand.

RECOVERY ARC:
During Elena's recovery, Jasper helps her with a personal project she had shelved years ago. Working together reopens intimacy - not just romance, but real partnership.

THE NEW RHYTHM:
- Jasper mentors more, deploys less
- At Grace's recital, holding Elena's hand
- Learns that family IS the mission
- Delegates to Harper and Addie

EPILOGUE SETUP:
Two days later, Jasper at the porch. The air cool, street quiet. He's made peace with not being everywhere at once.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett', 'Harper', 'Addie'])
    },
    {
      title: 'Chat 1: Elena & Kendra Intimacy Arc',
      category: 'Character Arc',
      description: 'The developing connection between Elena and Kendra',
      content: `ELENA & KENDRA INTIMACY ARC

THE CONTEXT:
During Jasper's heavy travel periods, Elena and Kendra's friendship deepens into something more.

PROGRESSION:
Night 1: Balcony scene, slow progression to intimacy
Night 2 (week later): They try again, more comfortable, lots of laughter and confessions. Ends tangled on the couch.

THE THREESOME BUILD:
Eventually leads to threesome with Addie:
- Evening together - light drinking, slow burn, playful intimacy
- One week later, repeat with more comfort and openness
- Ch 30 - The Threesome Night: Jasper away on work trip, Grace with family

AFTERMATH:
The experience deepens their bond but complicates relationships:
- Kendra gets promise ring from boyfriend
- Addie's feelings for Kendra become source of pain
- Elena balances it all with grace`,
      characters: JSON.stringify(['Elena Barrett', 'Kendra Vos', 'Addie', 'Jasper Barrett'])
    },
    {
      title: 'The Sirens Organization',
      category: 'Organization Arc',
      description: 'Selene\'s network of cam performers',
      content: `THE SIRENS - SELENE'S ORGANIZATION

STRUCTURE:
Selene built a tiered organization of elite performers:

TOP TIER - THE BOMBSHELL TRIFECTA:
1. Valeria Knight - European Bombshell (Mediterranean glamour)
2. Scarlett Vaughn - Intellectual Bombshell (curvy intellectual dominance)
3. Camila Rose (Cami Rae) - Digital Bombshell (cam-powered queen)

JUNIOR TIER:
- Lila Monroe (Lila Lux) - Assistant/Apprentice, actually runs things
- Jenna - Holds the spotlight but Lila does the work

PURPOSE:
When Selene wants everyone to look, everyone to talk, and no one to forget, she deploys the trifecta.

BSS CONNECTION:
The Sirens appear at BSS-backed international galas. They're the women who command every room.

CAM STYLES:
Each has distinct approach:
- Valeria: Slow-burn, philosophy and art
- Scarlett: Talk first, tease after, intellectual engagement
- Camila: Hyper-modern, influencer-style, interactive`,
      characters: JSON.stringify(['Selene', 'Valeria Knight', 'Scarlett Vaughn', 'Camila Rose', 'Lila Monroe'])
    },
  ];

  for (const storyline of chat1Storylines) {
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

  // ========== ADD SIRENS ORGANIZATION ==========
  console.log("\n--- Adding Sirens Organization ---\n");

  const sirensOrg = {
    name: 'The Sirens',
    shortName: 'Sirens',
    type: 'Entertainment Organization',
    description: 'Elite network of cam performers and influencers led by Selene',
    industry: 'Adult Entertainment / Influencer',
    founder: 'Selene',
    leadership: JSON.stringify(['Selene (Leader)', 'Lila Monroe (Operations)', 'Jenna (Spotlight)']),
    headquarters: 'Various / International',
    services: 'High-end cam performances, gala appearances, influencer content',
    relationships: 'Connected to BSS through gala appearances',
    significance: `THE SIRENS STRUCTURE:

TOP TIER - BOMBSHELL TRIFECTA:
1. Valeria Knight - European Bombshell (Mediterranean glamour)
2. Scarlett Vaughn - Intellectual Bombshell
3. Camila Rose - Digital Bombshell

JUNIOR TIER:
- Lila Monroe (Lila Lux) - Actually runs things
- Jenna - Holds spotlight

PURPOSE:
Selene's elite group. When she wants everyone to look, everyone to talk, no one to forget - she deploys them.

BSS CONNECTION:
Appear at BSS-backed international galas as attention commanders.`
  };

  const existingSirens = await prisma.organization.findFirst({
    where: { name: sirensOrg.name, projectId: project.id }
  });

  if (!existingSirens) {
    await prisma.organization.create({ data: { projectId: project.id, ...sirensOrg } });
    console.log('Created: The Sirens organization');
  } else {
    await prisma.organization.update({ where: { id: existingSirens.id }, data: sirensOrg });
    console.log('Updated: The Sirens organization');
  }

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();
  const orgCount = await prisma.organization.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total storylines: ${storylineCount}`);
  console.log(`Total organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
