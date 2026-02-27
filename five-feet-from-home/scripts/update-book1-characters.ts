import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== UPDATING BOOK 1 CHARACTERS FROM SOURCE DOCUMENTS ===\n');

  // Book 1 Core Characters from Chat 1 and Love Option Book 4
  const characterUpdates = [
    // JASPER BARRETT
    {
      name: 'Jasper Barrett',
      data: {
        firstName: 'Jasper',
        lastName: 'Barrett',
        nickname: null,
        archetype: 'Protagonist / Crisis Manager',
        age: '38',
        affiliationRole: 'Senior Partner, BSS',
        bssRole: 'Lead Crisis Manager',
        modeledAfter: 'Dylan O\'Brien energy - sharp eyes, lean build, moves like he might sprint through an airport',
        appearance: 'Lean build, sharp eyes that seem to clock every detail, short-cropped hair with some silver, well-cut suits that move like they were tailored for someone who might have to sprint through an airport. Athletic but not bulky. Looks like a man who doesn\'t sleep enough but makes it work anyway.',
        personality: 'Controlled, precise, lives in a "five-foot world" mindset - focus only on what\'s immediately in front of you. Thrives on adrenaline and high-stakes problem solving. Brilliant under pressure but struggles to be present at home. Uses work as both escape and identity.',
        background: 'Built BSS from the ground up with Jessica Vaughn as his mentor. Known for handling impossible situations - product recalls, corporate scandals, cyberattacks. His reputation is built on never losing a client. Met Elena at a DC mixer, proposed on a Chicago rooftop. Father to Grace.',
        motivations: 'Being indispensable. Solving the unsolvable. Proving he can hold everything together.',
        fears: 'Being unnecessary. Losing Elena and Grace. Discovering his work addiction has cost him everything that matters.',
        flaw: 'Uses work to avoid emotional vulnerability. Measures his worth in crises solved rather than moments shared.',
        arcStart: 'Fully immersed in work, taking family for granted',
        arcChange: 'Elena\'s medical crisis forces him to choose family over work for the first time',
        arcEnd: 'Learns to be present, accepts task force role for better balance',
      }
    },
    // ELENA BARRETT
    {
      name: 'Elena Barrett',
      data: {
        firstName: 'Elena',
        lastName: 'Barrett',
        nickname: null,
        archetype: 'The Anchor / Photographer',
        age: '36',
        affiliationRole: 'Photographer, Maison Aurelia founder',
        maisonAureliaRole: 'Founder/Owner',
        modeledAfter: 'Mónica Barbaro - grounded warmth, polished elegance, equally natural in jeans or formalwear',
        appearance: 'Dark hair, warm eyes, the kind of presence that feels like gravity. Equally natural in jeans and a sweater as in something formal. Classic beauty that doesn\'t need to try. She looks like Elena Barrett - polished but approachable.',
        personality: 'Graceful under pressure but worn thin by years of waiting. Fiercely loyal, quietly strong. Can read Jasper better than anyone. Has learned to carry the family alone but wishes she didn\'t have to.',
        background: 'Professional photographer who put her career on hold for the family. Built Maison Aurelia. Met Jasper at a DC mixer - her laugh cut through the noise and he forgot to check his phone for the first time in months. Her sister Sara is her closest confidante.',
        motivations: 'Keeping her family together. Being seen by Jasper - truly seen, not just acknowledged between crises.',
        fears: 'That Jasper will always choose work over her. That she\'s lost the man she married.',
        flaw: 'Sometimes swallows her needs to keep the peace. Has accepted less than she deserves.',
        arcStart: 'Exhausted from carrying the family alone while Jasper travels',
        arcChange: 'Medical crisis forces the family to reckon with what matters',
        arcEnd: 'Reconnects with Jasper, rebuilds trust through his changed behavior',
      }
    },
    // GRACE BARRETT
    {
      name: 'Grace Barrett',
      data: {
        firstName: 'Grace',
        lastName: 'Barrett',
        nickname: null,
        archetype: 'The Daughter / Innocent Anchor',
        age: '7',
        modeledAfter: 'Chloe Coleman (My Spy, Dungeons & Dragons)',
        appearance: 'Seven years old with her mother\'s warmth and her father\'s observant eyes. Hair that smells of strawberries and pencil shavings. Quick smile, curious gaze.',
        personality: 'Perceptive beyond her years. Notices when Daddy is distracted. Loves stories, spelling words, and soccer. Has learned to accept brief goodbyes but doesn\'t like them.',
        background: 'Only child of Jasper and Elena. Has grown up with a father who\'s often absent but loves her fiercely. Close to Aunt Sara. Keeps a drawing of "Dad Saves the Day" on her wall.',
        motivations: 'Wanting her father to stay. Being seen and heard.',
        fears: 'Daddy going somewhere scary. Things not being okay.',
        flaw: 'Sometimes hides her feelings to protect her parents.',
        arcStart: 'Accepts father\'s absences as normal',
        arcChange: 'Mother\'s illness and father\'s presence shows her what family can be',
        arcEnd: 'Gets her father present and engaged - "I like it when you\'re here"',
      }
    },
    // HARPER CALDWELL
    {
      name: 'Harper Caldwell',
      data: {
        firstName: 'Harper',
        lastName: 'Caldwell',
        nickname: null,
        archetype: 'The COO / International Operations Lead',
        age: '35',
        affiliationRole: 'COO, BSS',
        bssRole: 'Chief Operations Officer, International Lead',
        wivesClubRole: 'Member, Columbia sorority connection',
        modeledAfter: 'Ana de Armas - magnetic, intoxicating presence, always knows how to work a room',
        appearance: 'Dark hair pulled back, tailored blazers, emerald scarf as signature piece. Burgundy tote. Southern Belle polish over steel-trap mind. Television-ready elegance but more substance than show.',
        personality: 'Brilliant, loyal, observant. Can read a room and find the angle everyone else missed. Speaks with a faint Georgia drawl when tired. Never lets Jasper get too lost in work without a reality check.',
        background: 'Met Jasper early in his career, has been his right hand ever since. Columbia sorority sister to the Wives Club. Runs international operations including Africa and Singapore. The one who dragged Jasper out of the office the night he met Elena.',
        motivations: 'Excellence. Protecting the BSS family. Being the best at what she does.',
        fears: 'Jasper burning out. The work consuming everything.',
        flaw: 'Sometimes enables Jasper\'s workaholism by being too competent.',
        firstAppearance: 'Book 1, Chapter 2',
        majorCases: 'Africa Coup Intervention, Singapore Security Breach, Whitaker Medical Holdings',
      }
    },
    // ADDISON PRICE
    {
      name: 'Addison Price',
      data: {
        firstName: 'Addison',
        lastName: 'Price',
        nickname: 'Addie',
        archetype: 'Executive Assistant / Logistics Genius',
        affiliationRole: 'Executive Assistant to Jasper',
        bssRole: 'Jasper\'s executive assistant, logistics coordinator',
        modeledAfter: 'Jessica Biel (The Sinner) - sharp, unflappable, elegant authority',
        appearance: 'Polished and professional. The kind of woman who can run an international operation from a smartphone while looking camera-ready. Never a hair out of place.',
        personality: 'Sharp, unflappable, knows everyone\'s schedule better than they do. Fiercely protective of Jasper. Can be soft when needed but usually operates in full efficiency mode.',
        background: 'Has worked with Jasper for years. Knows his tells, his weaknesses, his schedule. The one who keeps BSS running when Jasper is in the field. Called him "My Fair Lady" once as a joke.',
        motivations: 'Keeping Jasper functional. Making sure nothing falls through the cracks.',
        fears: 'Jasper collapsing from stress. Being unable to protect him from himself.',
        catchphrases: '"Jasper, you good?" / "Brief me at 2:30."',
        firstAppearance: 'Book 1, Chapter 2',
      }
    },
    // JESSICA VAUGHN
    {
      name: 'Jessica Vaughn',
      data: {
        firstName: 'Jessica',
        lastName: 'Vaughn',
        nickname: null,
        archetype: 'Mentor / Industry Legend',
        affiliationRole: 'BSS Founder, Jasper\'s mentor',
        bssRole: 'Founder, Senior Advisor',
        modeledAfter: 'Christine Baranski (The Good Wife) - elegant authority, sharp wit, decades of wisdom',
        appearance: 'Silver hair, oxblood leather tote as signature piece. The kind of woman who walks into a room and owns it without trying. Timeless elegance with visible experience.',
        personality: 'Wise, patient, sees talent others miss. Direct but kind. Has built empires and mentored legends. Knows when to push and when to let someone find their own way.',
        background: 'Founded BSS. Discovered Jasper at the Prescott Grand Hotel renovation eight years ago when he was junior staff holding an impossible project together. Saw something special and gave him full authority. Has watched him build his career and worried about his personal life.',
        motivations: 'Cultivating the next generation. Protecting her legacy through the people she\'s mentored.',
        fears: 'Watching Jasper become what she warned him against.',
        catchphrases: '"You\'re not just putting out fires. You\'re redesigning the building while it\'s burning down."',
        firstAppearance: 'Book 1, Chapter 20',
        majorCases: 'Prescott Grand Hotel (origin story with Jasper)',
      }
    },
    // SARA WHITAKER
    {
      name: 'Sara Whitaker',
      data: {
        firstName: 'Sara',
        lastName: 'Whitaker',
        nickname: null,
        archetype: 'The Supportive Sister',
        affiliationRole: 'Elena\'s sister, CrossFit coach',
        modeledAfter: 'Athletic, warm, practical energy',
        appearance: 'Athletic build from CrossFit coaching. Practical style - activewear that\'s both functional and put-together. Warm smile, strong presence.',
        personality: 'Fiercely protective of Elena and Grace. Practical, grounded, the sister who shows up when needed. Struggles with PCOS and weight but channels her challenges into empathy.',
        background: 'Elena\'s younger sister. CrossFit coach. The one who stays with Grace when things go wrong. Grew up in Charlotte, close to both Elena and the Wives Club orbit.',
        motivations: 'Protecting her sister and niece. Being the reliable one.',
        fears: 'Not being enough when her family needs her.',
        flaw: 'Cares too much for everyone she considers family, sometimes at her own expense.',
        firstAppearance: 'Book 1, Chapter 3',
      }
    },
    // ALEXANDRA PIERCE
    {
      name: 'Alexandra Pierce',
      data: {
        firstName: 'Alexandra',
        lastName: 'Pierce',
        nickname: null,
        archetype: 'The Temptation / Power Client',
        affiliationRole: 'CEO, BSS client',
        modeledAfter: 'Magnetic, composed, mid-forties power presence',
        appearance: 'Mid-forties, composed in that way that makes you think nothing could shake her. Perfectly tailored even at midnight. The kind of woman who arranges discreet lilies and makes entrances.',
        personality: 'Direct, confident, knows exactly what she wants. Makes Jasper feel essential, validated, excited about work in ways that feel dangerous. Uses "Need you now" as her calling card.',
        background: 'CEO of a major corporation. Project Wildcard is her crisis. Represents everything Jasper left behind when he chose family - the thrill, the danger, the feeling of being indispensable.',
        motivations: 'Getting what she needs. Winning at all costs.',
        fears: 'Losing control. Being seen as anything less than exceptional.',
        flaw: 'Uses people. Doesn\'t respect boundaries.',
        catchphrases: '"Need you now. Ten minutes."',
        firstAppearance: 'Book 1, Chapter 13',
        majorCases: 'Project Wildcard',
      }
    },
    // MASON REILLY
    {
      name: 'Mason Reilly',
      data: {
        firstName: 'Mason',
        lastName: 'Reilly',
        nickname: null,
        archetype: 'Best Friend / Truth-Teller',
        affiliationRole: 'Political fixer, Jasper\'s Duke buddy',
        modeledAfter: 'The friend who calls you on your bullshit',
        appearance: 'Comfortable in a dive bar or a boardroom. The kind of guy who shows up with whiskey and hard truths.',
        personality: 'Blunt, loyal, sees through Jasper\'s defenses. Not afraid to hold up a mirror. Uses humor to soften the blow but never backs down from the truth.',
        background: 'Met Jasper at Duke. They were juniors at a dive bar when Jasper tanked an interview by being too honest. Mason said "You\'re an idiot, but at least you\'re an honest idiot." They\'ve been friends ever since.',
        motivations: 'Keeping Jasper grounded. Protecting his friend from himself.',
        fears: 'Watching Jasper destroy his marriage.',
        catchphrases: '"You can\'t manage a crisis if you\'re living in one."',
        firstAppearance: 'Book 1, Chapter 26',
      }
    },
    // COLE
    {
      name: 'Cole',
      data: {
        firstName: 'Cole',
        lastName: null, // Callsign only
        nickname: 'Cole',
        archetype: 'Operator / Field Specialist',
        affiliationRole: 'BSS Operator',
        bssRole: 'Ex-Special Forces, Field Operations Lead',
        appearance: 'Military bearing. The kind of presence that says he\'s seen things. Moves with quiet efficiency.',
        personality: 'Mission-focused, loyal, protective. His creed: Get in. Get out. Get home. The "getting home" part is new - before BSS, home was whatever four walls were available.',
        background: 'Ex-Special Forces. Recruited to BSS for cyber ops and field extraction. Works closely with Dean. Led the Africa coup intervention.',
        motivations: 'The mission. Protecting the team.',
        fears: 'Failing the people he\'s sworn to protect.',
        firstAppearance: 'Book 1, Chapter 36',
        majorCases: 'Africa Coup Intervention',
      }
    },
    // DEAN
    {
      name: 'Dean',
      data: {
        firstName: 'Dean',
        lastName: null, // Callsign only
        nickname: 'Dean',
        archetype: 'Operator / Intel Specialist',
        affiliationRole: 'BSS Operator',
        bssRole: 'Ex-NSA, Intelligence Operations',
        appearance: 'Quiet, observant. The kind of guy who notices everything and says little.',
        personality: 'Analytical, precise, sees patterns others miss. Prefers data to drama.',
        background: 'Ex-NSA. Recruited to BSS for intelligence work. Works field operations with Cole.',
        motivations: 'Finding the truth. Protecting operational security.',
        firstAppearance: 'Book 1, Chapter 37',
        majorCases: 'Africa Coup Intervention',
      }
    },
    // RAFE MORENO
    {
      name: 'Rafe Moreno',
      data: {
        firstName: 'Rafe',
        lastName: 'Moreno',
        nickname: null,
        archetype: 'Unconventional Asset / Forensic Specialist',
        affiliationRole: 'BSS Specialist',
        bssRole: 'Forensic accounting, unconventional solutions',
        modeledAfter: 'Neal Caffrey from White Collar - charming, quick-thinking, reformed criminal',
        appearance: 'Polished casual. The look of someone who could charm his way into or out of anywhere. Dark hair, well-styled. Chameleon who adapts to any situation.',
        personality: 'Charming, quick-thinking, utterly loyal to those who gave him a second chance. Uses elaborate hand gestures when telling stories - 80% truth, 20% embellished for effect.',
        background: 'Ex-con and former art thief. Recruited by Jasper for his charm, unconventional skills, and street-level instincts. Now uses his talents for legitimate purposes. Has paid his debts to society.',
        motivations: 'Proving he\'s more than his past. Loyalty to those who believed in him.',
        fears: 'Falling back into old patterns. Losing the trust he\'s earned.',
        catchphrases: '"Africa\'s not cooling down. Call me before someone else does. This one has teeth."',
        firstAppearance: 'Book 1, Chapter 34',
        majorCases: 'Whitaker Medical Holdings (traced the $12M)',
      }
    },
    // CAROLINE WESTBROOK
    {
      name: 'Caroline Westbrook',
      data: {
        firstName: 'Caroline',
        lastName: 'Westbrook',
        nickname: null,
        archetype: 'Finance Expert / Media Presence',
        affiliationRole: 'Professor, TV commentator, NFL ownership advisor',
        modeledAfter: 'Television-ready academic with Wall Street connections',
        appearance: 'Mid-40s to 50s. Television-ready elegance - tailored blazers in camera-friendly colors, statement earrings, hair professionally maintained. Every outfit chosen with potential camera appearance in mind.',
        personality: 'Intellectually formidable and knows it. Can shift from academic jargon to television-friendly explanations in the same sentence. Collaborative despite her polish.',
        background: 'Finance-world insider with academic credentials. Respected professor based in New York. Moves between high-net-worth boardrooms, lecture halls, and TV panels. Involved in NFL ownership discussions.',
        motivations: 'Being taken seriously. Elevating other women through mentorship.',
        catchphrases: '"Ownership group meeting moved up. Certain people want you in the room. This isn\'t a request, Jasper. They need you."',
        firstAppearance: 'Book 1, Chapter 38',
        majorCases: 'NFL Ownership Battle',
      }
    },
    // CHRIS COLE
    {
      name: 'Chris Cole',
      data: {
        firstName: 'Chris',
        lastName: 'Cole',
        nickname: null,
        archetype: 'NFL Star / Power Client',
        affiliationRole: 'Star QB, Charlotte NFL team',
        modeledAfter: 'Star athlete caught in ownership politics',
        appearance: 'Athletic quarterback physique, currently recovering from shoulder injury. Casual wealth at home - workout gear, green smoothies. Polished when public.',
        personality: 'Competitive, frustrated by politics he can\'t control through athletic performance. Used to winning through effort and skill, uncomfortable with backroom negotiations.',
        background: 'Star NFL quarterback dealing with team ownership drama. Face of the team but caught in the middle of franchise politics. Pressured by different factions to take sides.',
        motivations: 'Playing football. Staying out of politics.',
        fears: 'Being used as a pawn. Losing control of his career.',
        firstAppearance: 'Book 1, Chapter 32',
        majorCases: 'NFL Ownership Battle',
      }
    },
    // MADDIE COLE
    {
      name: 'Madison "Maddie" Cole',
      data: {
        firstName: 'Madison',
        lastName: 'Cole',
        nickname: 'Maddie',
        archetype: 'NFL Wife / Wives Club Member',
        affiliationRole: 'Chris Cole\'s wife, luxury wellness studios owner',
        wivesClubRole: 'Member, Columbia sorority connection to Harper',
        modeledAfter: 'Former swimmer, camera-ready elegance',
        appearance: 'Early 30s. Former swimmer\'s build - athletic, elegant. Hair often in a messy bun that looks artfully casual. Camera-ready even at home - leggings and fitted pullovers that still look put-together.',
        personality: 'Wise beyond her years about spotlight life. Sees through performance to what\'s real. Values authenticity over impression.',
        background: 'Former Columbia swimmer who met Harper in their sorority days. Married to star QB Chris Cole. Runs luxury wellness studios. Lives on fifteen acres outside Charlotte - part horse country aesthetic, part NFL money.',
        motivations: 'Authenticity. Supporting Chris without losing herself.',
        fears: 'Being defined only as an NFL wife.',
        catchphrases: '"We need someone who knows how to breathe under pressure." (What Harper said when they first met)',
        firstAppearance: 'Book 1, Chapter 32',
      }
    },
  ];

  let updated = 0;
  let notFound = 0;

  for (const char of characterUpdates) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char.data
      });
      console.log(`Updated: ${char.name}`);
      updated++;
    } else {
      // Try to create new character
      try {
        await prisma.character.create({
          data: {
            projectId: project.id,
            name: char.name,
            ...char.data,
          }
        });
        console.log(`Created: ${char.name}`);
        updated++;
      } catch (e) {
        console.log(`Not found and could not create: ${char.name}`);
        notFound++;
      }
    }
  }

  console.log(`\nUpdated/Created: ${updated}, Not found: ${notFound}`);

  await prisma.$disconnect();
}

main().catch(console.error);
