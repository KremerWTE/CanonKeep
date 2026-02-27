/**
 * Enhance Canon Data - Add missing characters and fill in gaps
 * All additions marked with [ADDED] or [ENHANCED] for tracking
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  console.log('========================================');
  console.log('ENHANCING CANON DATA');
  console.log('========================================\n');

  // =============================================
  // MISSING CHARACTERS TO ADD
  // =============================================
  console.log('--- Adding Missing Characters ---\n');

  const missingCharacters = [
    {
      name: 'Storm',
      archetype: 'Therapeutic Horse / Healing Companion',
      background: '[ADDED] A rescue horse at Mandy\'s ranch, Storm becomes Bella\'s primary healing companion during her six-month retreat. Named for his stormy grey coat and the turbulent past he survived. Previously abused, Storm learned to trust again - mirroring Bella\'s own journey.',
      personality: '[ADDED] Initially skittish and distrustful, Storm responds only to patience and genuine presence. He can sense anxiety and won\'t approach until someone is truly calm. His breakthrough moments with Bella mark key points in her healing arc.',
      appearance: '[ADDED] Large grey gelding with dappled coat, dark mane. Has visible scars from previous neglect. Eyes that seem to look right through you. Moves with unexpected gentleness for his size.',
      relationships: '[ADDED] Bella (primary bond - healing partnership), Mandy (owner/rescuer), Matt (accepts him after initial wariness)',
      rawNotes: '[ADDED] SIGNIFICANCE: Storm represents the story\'s theme that healing comes through connection and patience. His arc parallels Bella\'s - both learning to trust after being broken. LOCATION: Mandy\'s Ranch (TN/VA/NC border).',
    },
    {
      name: 'The Veterans Group',
      archetype: 'Healing Community / Support Network',
      background: '[ADDED] A group of military veterans who gather weekly at Mandy\'s ranch for equine therapy. Mix of ages and service branches, all dealing with various forms of trauma. They become unexpected mentors and friends to Bella.',
      personality: '[ADDED] Collectively: dark humor, fierce loyalty, no-nonsense approach to emotional honesty. They don\'t coddle but they never abandon. Their camaraderie models healthy support for Bella.',
      relationships: '[ADDED] Mandy (facilitator), Bella (honorary member), Each other (brotherhood/sisterhood)',
      rawNotes: '[ADDED] SIGNIFICANCE: They show Bella that trauma doesn\'t make you broken - it makes you part of a larger community of survivors.',
    },
    {
      name: 'Tom (Veteran)',
      archetype: 'Vietnam Veteran / Wise Elder',
      background: '[ADDED] Oldest member of the veterans group. Served three tours in Vietnam. Has been coming to Mandy\'s ranch for fifteen years. Lost his wife to cancer five years ago. Grandfather figure to the younger vets.',
      personality: '[ADDED] Quiet, observant, speaks rarely but with impact. Has a gift for asking the one question that cuts through denial. Dry wit that surfaces unexpectedly.',
      age: '70s',
      appearance: '[ADDED] Weathered face, silver hair, still stands straight. Wears an old Army jacket with faded patches. Gentle hands that calm even the most nervous horses.',
      relationships: '[ADDED] Veterans group (elder), Bella (mentor), Storm (has worked with him for years)',
    },
    {
      name: 'Marcus (Veteran)',
      archetype: 'Afghanistan Veteran / Bridge Builder',
      background: '[ADDED] Mid-30s veteran who served two tours in Afghanistan. Lost his leg to an IED. Came to the ranch angry and bitter, transformed into one of its biggest advocates. Works as a peer counselor.',
      personality: '[ADDED] Initially cynical, now cautiously hopeful. Uses humor as armor but is learning to let it down. Fiercely protective of the newer members.',
      age: 'Mid-30s',
      appearance: '[ADDED] Athletic build despite prosthetic leg. Close-cropped hair, ready smile that took years to reclaim. Tattoo sleeves telling his story.',
      relationships: '[ADDED] Veterans group (peer leader), Bella (identifies with her perfectionism), Tom (respects as elder)',
    },
  ];

  for (const char of missingCharacters) {
    const existing = await prisma.character.findFirst({
      where: { projectId: project.id, name: char.name },
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
        },
      });
      console.log(`  ✓ ADDED: ${char.name}`);
    } else {
      console.log(`  - Already exists: ${char.name}`);
    }
  }

  // =============================================
  // ENHANCE INCOMPLETE PRIORITY CHARACTERS
  // =============================================
  console.log('\n--- Enhancing Priority Characters ---\n');

  const enhancements = [
    {
      name: 'Adelaide "Addie" Barrett',
      updates: {
        background: '[ENHANCED] Born Adelaide Price, worked her way up from rough beginnings through sheer grit. No elite pedigree - earned everything. Started as Jasper\'s sharp but unpolished assistant, eventually became Managing Partner of BSS. Converted to Catholicism alongside Hawk to become Grace\'s godparents. Now serves as the unofficial Patroness of Honor for the POH.',
        fears: '[ENHANCED] Being seen as "just the assistant" despite her rise. Burning out like she almost did. Losing Hawk. Not being enough for Grace as a godmother. Her past coming back to undermine her earned position.',
        age: 'Late 30s',
      },
    },
    {
      name: 'Michael "Hawk" Barrett',
      updates: {
        fears: '[ENHANCED] Failing to protect those he loves. The classified Yemen mission still haunts him. Being too broken for civilian life and family. Losing Addie to his own darkness. Not being the father figure Grace deserves.',
        wardrobeStyle: '[ENHANCED] Functional operator aesthetic. Well-fitted tactical casual - quality but never flashy. Dark colors that fade into backgrounds. Always dressed to move. Wedding ring is his only jewelry.',
        age: 'Late 30s - Early 40s',
      },
    },
    {
      name: 'Charlotte "Lottie" Hale',
      updates: {
        fears: '[ENHANCED] Being truly seen as the DUFF - not just the joke she makes of it. Never finding romantic love because she\'s always the "friend." Her organizational genius being taken for granted. Being overlooked in photos and memories.',
        age: 'Early 30s',
        appearance: '[ENHANCED] Slightly obese with round cheeks and soft curves. Practical rather than polished. Freckles she\'s stopped trying to hide. Glasses always perched on her nose. Easy laugh that lights up rooms. Carries herself with quiet confidence in her domain.',
        wardrobeStyle: '[ENHANCED] Comfortable elegance - knows what works for her body and owns it. At galas, she\'s learned to dress for her shape rather than against it. Prefers rich jewel tones. Always has a backup outfit for emergencies.',
      },
    },
    {
      name: 'Kendra Donnelly',
      updates: {
        background: '[ENHANCED] Started as analyst at BSS while training for CrossFit Games. Raised Catholic - never walked away from faith even during competitive years. Elite athlete who competes at Games level. Now a working mother balancing championship training, BSS career, and family with Chris.',
        fears: '[ENHANCED] Having to choose between career, athletics, and family. Not being enough for any of them. Losing her athletic identity to motherhood. Burning out trying to be perfect at everything.',
        age: 'Late 20s - Early 30s',
      },
    },
    {
      name: 'Margaret "Maggie" Donnelly',
      updates: {
        appearance: '[ENHANCED] Warm and approachable beauty - the kind that makes students feel safe. Bright eyes that miss nothing. Hair usually in practical but pretty styles. Dresses professionally but with personality - a colorful scarf, interesting earrings.',
        motivations: '[ENHANCED] To ignite curiosity in her students. To find lasting love despite her pattern of failed relationships. To be part of something bigger than her classroom - drawn to Elena\'s world.',
        fears: '[ENHANCED] Dying alone despite being surrounded by children all day. That her flirty exterior masks real intimacy issues. Never being taken seriously because she\'s "just" a teacher.',
        wardrobeStyle: '[ENHANCED] Teacher chic - structured dresses, cardigans with personality, comfortable but stylish flats. For social events, she cleans up surprisingly well - elegant with a hint of playful.',
        age: 'Late 20s - Early 30s',
      },
    },
    {
      name: 'Chris Donnelly',
      updates: {
        appearance: '[ENHANCED] Irish good looks - dark hair with hints of auburn, blue eyes, easy smile. Athletic but not bulky. Face that shows his faith in its calm centeredness.',
        motivations: '[ENHANCED] To live his faith authentically in business. To be the steady partner Kendra needs. To build a family rooted in values. To prove that faith and success aren\'t mutually exclusive.',
        fears: '[ENHANCED] Compromising his values for worldly success. Being seen as preachy or judgmental. Not being strong enough for Kendra when she needs him. Failing as a father.',
        wardrobeStyle: '[ENHANCED] Clean, classic, understated. Quality over flash. Cross he wears but doesn\'t flaunt. Brooks Brothers meets Irish country casual.',
        age: 'Early 30s',
      },
    },
    {
      name: 'Mandy',
      updates: {
        wardrobeStyle: '[ENHANCED] Ranch practical meets earthy elegant. Worn jeans, quality boots, soft flannel shirts. For special occasions, bohemian dresses that flow. Hair often in a practical braid. Jewelry is meaningful - grandmother\'s ring, leather bracelet from a veteran who healed.',
        appearance: '[ENHANCED] Sun-weathered beauty - lines from genuine smiles, strong hands from ranch work. Long hair usually braided. Moves with the calm that comes from working with animals. Eyes that see past pretense.',
      },
    },
    {
      name: 'Matt',
      updates: {
        wardrobeStyle: '[ENHANCED] Vacation home businessman casual. Quality outdoor wear - Patagonia, well-worn Timberlands. Cleans up effortlessly for city events but prefers ranch comfort. Wedding ring he never takes off after marrying Bella.',
        appearance: '[ENHANCED] Rugged handsome - the kind that comes from outdoor work, not a gym. Easy smile, patient eyes. Graying at the temples in a distinguished way. Hands that know work.',
      },
    },
  ];

  for (const enhancement of enhancements) {
    const existing = await prisma.character.findFirst({
      where: { projectId: project.id, name: enhancement.name },
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: enhancement.updates,
      });
      console.log(`  ✓ ENHANCED: ${enhancement.name}`);
    } else {
      console.log(`  ✗ Not found: ${enhancement.name}`);
    }
  }

  // =============================================
  // ADD GALA CLOTHING DESCRIPTIONS
  // =============================================
  console.log('\n--- Adding Gala Clothing Descriptions ---\n');

  const galaClothing = [
    {
      name: 'Kennedy Foundation Gala',
      clothingDescriptions: JSON.stringify({
        '[ADDED] Elena': 'Midnight blue Valentino gown with subtle silver threading. Diamond drop earrings. Hair in elegant updo.',
        '[ADDED] Jasper': 'Classic Tom Ford tuxedo, black tie. Presidential cufflinks gift from a grateful client.',
        '[ADDED] Addie': 'Emerald green Marchesa with architectural shoulders. Statement gold earrings. Power personified.',
        '[ADDED] Bella': 'Blush A-line Monique Lhuillier with delicate beading. Jimmy Choo champagne heels. Soft, romantic.',
        '[ADDED] Harper': 'Navy Oscar de la Renta with subtle power. Pearl earrings. Understated elegance.',
        '[ADDED] Kendra': 'Athletic-cut red Badgley Mischka that shows her CrossFit build. Bold but appropriate.',
      }),
    },
    {
      name: 'Easter Vigil Mass',
      clothingDescriptions: JSON.stringify({
        '[ADDED] Elena': 'Cream Chanel suit with pearl buttons. Mantilla veil. Classic Catholic elegance.',
        '[ADDED] Grace': 'White dress with delicate lace collar. Patent leather Mary Janes. Hair ribbon.',
        '[ADDED] Addie': 'Soft grey Armani dress, tasteful cross pendant. Converting meant embracing the aesthetic.',
        '[ADDED] Hawk': 'Navy suit, no tie. Simple but respectful. Still learning this world.',
        '[ADDED] Bella': 'Soft lavender dress, small cross necklace from Addie. Finding her faith through family.',
      }),
    },
    {
      name: "Grace's First Communion",
      clothingDescriptions: JSON.stringify({
        '[ADDED] Grace': 'Traditional white communion dress with tulle skirt, white veil, white gloves. Angelic.',
        '[ADDED] Elena': 'Soft white suit with subtle floral brooch. Proud mother radiance.',
        '[ADDED] Jasper': 'Light grey suit. Present and engaged. A father first that day.',
        '[ADDED] Addie': 'Godmother in sophisticated cream. Pearl rosary bracelet. Emotional.',
        '[ADDED] Hawk': 'Godfather in charcoal suit, cross lapel pin. Still surprised by his own faith journey.',
      }),
    },
    {
      name: "Grace's Confirmation",
      clothingDescriptions: JSON.stringify({
        '[ADDED] Grace': 'Red confirmation dress (color of the Holy Spirit). More mature style. Growing up.',
        '[ADDED] Elena': 'Elegant red accent in cream outfit to match Grace. Coordinated love.',
        '[ADDED] Addie': 'Sponsor in deep burgundy. Mentor presence.',
        '[ADDED] The family': 'Coordinated in warm tones. Visual unity of faith and family.',
      }),
    },
    {
      name: 'Palace of Honor Galas',
      clothingDescriptions: JSON.stringify({
        '[ADDED] Addie (Patroness)': 'Always in signature colors - deep jewel tones. Gold or platinum statement pieces. The standard others aspire to.',
        '[ADDED] Bella (Page)': 'Learning elegance under Addie\'s guidance. Softer silhouettes in blush and champagne. Growing into her role.',
        '[ADDED] Vestals': 'White or cream with gold accents. Unified aesthetic. Purity of purpose.',
        '[ADDED] Knights': 'Dark formal wear with subtle POH pins. Protective elegance.',
      }),
    },
    {
      name: 'Vatican-linked Fundraisers',
      clothingDescriptions: JSON.stringify({
        '[ADDED] Elena': 'Modest but luxurious - high necklines, longer hemlines. Respectful of venue while maintaining style.',
        '[ADDED] Addie': 'Vatican-appropriate elegance. Covered shoulders, tasteful jewelry. Her conversion showing.',
        '[ADDED] Bella': 'Learning the dress codes. Chiara helps her navigate Italian Catholic expectations.',
        '[ADDED] Men': 'Dark suits, conservative ties. Some clergy present. Formality respected.',
      }),
    },
  ];

  for (const gala of galaClothing) {
    const existing = await prisma.gala.findFirst({
      where: { projectId: project.id, name: gala.name },
    });

    if (existing && !existing.clothingDescriptions) {
      await prisma.gala.update({
        where: { id: existing.id },
        data: { clothingDescriptions: gala.clothingDescriptions },
      });
      console.log(`  ✓ ADDED clothing for: ${gala.name}`);
    } else if (existing) {
      console.log(`  - Already has clothing: ${gala.name}`);
    } else {
      console.log(`  ✗ Gala not found: ${gala.name}`);
    }
  }

  // =============================================
  // ADD CRISIS RESOLUTIONS
  // =============================================
  console.log('\n--- Adding Crisis Resolutions ---\n');

  const crisisResolutions = [
    {
      name: 'African Energy Coup Fallout',
      resolution: '[ADDED] BSS extracted key executives before the coup succeeded. Coordinated with private security to secure assets. Long-term: helped client divest gracefully while protecting local employees who had cooperated.',
    },
    {
      name: 'Asia Markets Crash',
      resolution: '[ADDED] Rapid response team deployed to Hong Kong. Protected client communications, managed media narrative, coordinated regulatory response across three jurisdictions. Client survived with reputation intact.',
    },
    {
      name: 'Corporate Espionage Case',
      resolution: '[ADDED] Cyber team traced the leak to a compromised contractor. Legal contained the damage, counter-intel fed disinformation. Competitor\'s advantage neutralized without public scandal.',
    },
    {
      name: 'Global Shipping Lane Crisis',
      resolution: '[ADDED] Coordinated with multiple naval assets and private security. Rerouted critical shipments, negotiated with local authorities. Zero cargo lost, minimal delays. Client relationship strengthened.',
    },
    {
      name: 'Celebrity PR Crisis',
      resolution: '[ADDED] Media containment within 4 hours. Controlled narrative release. Rehabilitation strategy over 6 months. Client returned to public favor with enhanced authenticity narrative.',
    },
  ];

  for (const crisis of crisisResolutions) {
    const existing = await prisma.crisis.findFirst({
      where: { projectId: project.id, name: crisis.name },
    });

    if (existing && !existing.resolution) {
      await prisma.crisis.update({
        where: { id: existing.id },
        data: { resolution: crisis.resolution },
      });
      console.log(`  ✓ ADDED resolution for: ${crisis.name}`);
    } else if (existing) {
      console.log(`  - Already has resolution: ${crisis.name}`);
    } else {
      console.log(`  ✗ Crisis not found: ${crisis.name}`);
    }
  }

  // =============================================
  // ADD FRIENDS, FAMILY & SOCIAL CONNECTIONS
  // =============================================
  console.log('\n--- Adding Friends, Family & Social Connections ---\n');

  // First, add new characters who are friends/family/non-work connections
  const socialConnections = [
    // BELLA'S SOCIAL CIRCLE
    {
      name: 'Rosa Rossi',
      archetype: 'Matriarch / Nurturer',
      background: '[ADDED] Bella\'s mother. Runs the family cafe/bookstore with her husband in Boston. Immigrant roots, worked her way up. Still makes Sunday dinner mandatory when family is in town.',
      personality: '[ADDED] Warm but direct. Speaks with hands. Feeds people as love language. Can read her children\'s moods before they walk through the door. Fierce protector.',
      age: 'Late 60s',
      appearance: '[ADDED] Silver-streaked dark hair usually pinned up. Warm brown eyes. Flour-dusted apron is her uniform. Laugh lines from decades of joy.',
      relationships: '[ADDED] Bella (daughter), Marcus (son), Daniel (son), Giovanni (husband). The emotional center of the Rossi family.',
    },
    {
      name: 'Giovanni Rossi',
      archetype: 'Patriarch / Quiet Strength',
      background: '[ADDED] Bella\'s father. Immigrated from Italy at 18 with a dream. Built the cafe/bookstore in Boston from nothing. Taught his children that work is love made visible.',
      personality: '[ADDED] Quiet, observant, patient. Speaks through actions. Will work beside you silently when words fail. His approval is rare and treasured.',
      age: 'Early 70s',
      appearance: '[ADDED] Silvery hair, still thick. Strong hands from decades of work. Always dressed simply but neatly. Reading glasses perpetually on his head.',
      relationships: '[ADDED] Rosa (wife), Bella (daughter - his bookworm), Marcus (son - his practical one), Daniel (son - his athlete)',
    },
    {
      name: 'Sarah Chen',
      archetype: 'College Best Friend / Grounding Force',
      background: '[ADDED] Bella\'s college roommate and best friend from Boston College. Now a pediatric nurse in Boston. Knew her when she was crying over midterms.',
      personality: '[ADDED] No-nonsense, loyal to a fault. Calls Bella on her BS. Completely unimpressed by wealth or status. Still uses Bella\'s embarrassing college nickname.',
      age: 'Late 30s - 40s',
      appearance: '[ADDED] Practical short haircut, usually in scrubs. Comfortable in her own skin. Quick smile, quicker wit.',
      relationships: '[ADDED] Bella (best friend since college), Married to a middle school teacher, two kids. The "normal life" Bella sometimes envies.',
    },
    {
      name: 'Father Anthony Ricci',
      archetype: 'Spiritual Guide / Old Friend',
      background: '[ADDED] Grew up in Bella\'s Boston neighborhood. He and Bella were in the same youth group. Became a priest while she went to law school.',
      personality: '[ADDED] Gentle, wise beyond his years. Never preachy - leads by listening. Bella turns to him when worldly advice isn\'t enough.',
      age: 'Early 40s',
      appearance: '[ADDED] Kind face, prematurely graying. Simple clerical collar. Eyes that have seen confessions but never judge.',
      relationships: '[ADDED] Bella (childhood friend), The Rossi family (parish connection), Addie (provides spiritual direction during conversion)',
    },

    // KENDRA'S SOCIAL CIRCLE
    {
      name: 'Coach Mike Patterson',
      archetype: 'Mentor / Second Father',
      background: '[ADDED] Kendra\'s CrossFit coach since she started training seriously. Former Olympic weightlifter. Saw her potential and pushed her to elite level. Based in Charlotte area.',
      personality: '[ADDED] Demanding but fair. Believes in Kendra when she doubts herself. Knows when to push and when to back off.',
      age: 'Mid-50s',
      appearance: '[ADDED] Still fit from years of training. Bald by choice, salt-and-pepper beard. Voice carries across any gym.',
      relationships: '[ADDED] Kendra (athlete/mentee), Chris (respects him for supporting Kendra\'s dreams), Other elite athletes he coaches',
    },
    {
      name: 'Tanya Williams',
      archetype: 'Gym Rival / Reluctant Friend',
      background: '[ADDED] Kendra\'s main competitor at CrossFit Games. Based in Denver, competes nationally. Rivalry evolved into genuine friendship.',
      personality: '[ADDED] Intense competitor who leaves everything on the floor. Off the competition stage, surprisingly goofy. Gets Kendra in ways non-athletes can\'t.',
      age: 'Late 20s',
      appearance: '[ADDED] Powerfully built, African American, signature braids. Every muscle earned through brutal work.',
      relationships: '[ADDED] Kendra (rival/friend), They text each other workout tips despite competing against each other',
    },
    {
      name: 'Shannon Donnelly-Walsh',
      archetype: 'Older Sister / Voice of Experience',
      background: '[ADDED] Chris\'s older sister in Boston area. Already married with three kids when Chris and Kendra got together. Traditional Irish Catholic family.',
      personality: '[ADDED] Practical, maternal, slightly bossy. Gives unsolicited advice that\'s usually right. Runs her household like a benevolent general.',
      age: 'Late 30s',
      appearance: '[ADDED] Looks like Chris around the eyes. Usually in comfortable mom clothes. Hair perpetually escaping its ponytail.',
      relationships: '[ADDED] Chris (younger brother), Kendra (sister-in-law), Maggie (ongoing sister-in-law rivalry/friendship)',
    },

    // ELENA'S SOCIAL CIRCLE
    {
      name: 'Victoria Hale',
      archetype: 'Mother / Aristocratic Matriarch',
      background: '[ADDED] Elena\'s mother. Old money elegance from the family estate. Raised Elena with impossible standards that Elena both resents and internalized.',
      personality: '[ADDED] Poised, exacting, rarely satisfied. Shows love through criticism "for your own good." Slowly softening as grandmother to Grace.',
      age: 'Early 70s',
      appearance: '[ADDED] Silver hair perfectly coiffed. Still beautiful in a timeless way. Dressed impeccably at all times.',
      relationships: '[ADDED] Elena (daughter), Grace (granddaughter - her soft spot), Jasper (son-in-law - initially disapproved, now respects)',
    },
    {
      name: 'Catherine "Cat" Ashworth',
      archetype: 'Prep School Friend / Reality Check',
      background: '[ADDED] Elena\'s best friend from prep school days. Rebelled against wealthy upbringing - became a documentary filmmaker. Lives nomadically, Brooklyn when stateside.',
      personality: '[ADDED] Irreverent, grounded, allergic to pretension. Calls Elena "Laney" - the only one allowed to. Keeps Elena humble.',
      age: 'Early 40s',
      appearance: '[ADDED] Deliberately unpolished - natural hair, minimal makeup, cargo pants. Pretty in a way she doesn\'t bother cultivating.',
      relationships: '[ADDED] Elena (best friend since 14), Travels for documentaries so friendship maintained through calls and catch-up visits',
    },
    {
      name: 'Dr. Miriam Okonkwo',
      archetype: 'Therapist / Trusted Confidante',
      background: '[ADDED] Elena\'s therapist for over a decade in Charlotte. Helped her work through imposter syndrome and family of origin issues.',
      personality: '[ADDED] Calm, perceptive, never rattled. Creates a space where Elena can be vulnerable. Bound by confidentiality but genuinely cares.',
      age: '50s',
      appearance: '[ADDED] Professional but warm. African heritage evident in features. Presence that makes you feel held.',
      relationships: '[ADDED] Elena (long-term client), Professional relationship but genuine care',
    },

    // JASPER'S SOCIAL CIRCLE
    {
      name: 'Lucas Barrett',
      archetype: 'Younger Brother / Black Sheep',
      background: '[ADDED] Jasper\'s younger brother. Didn\'t follow into military or security. Became an artist in Austin instead. Family tension for years, now reconciling.',
      personality: '[ADDED] Creative, free-spirited, honest to a fault. Rejected family pressure but never stopped loving them. Grace\'s cool uncle who teaches her to paint.',
      age: 'Late 30s',
      appearance: '[ADDED] Paint-stained fingers, relaxed wardrobe. Shares Jasper\'s build but softer around edges. Easy smile.',
      relationships: '[ADDED] Jasper (older brother - complicated respect), Grace (adores his niece), Elena (she helped bridge the brothers\' gap)',
    },
    {
      name: 'Colonel William "Bill" Tate (Ret.)',
      archetype: 'Military Mentor / Old Guard',
      background: '[ADDED] Jasper\'s commanding officer in his early military days. Now retired in Northern Virginia, consults for BSS occasionally.',
      personality: '[ADDED] Old school military bearing, but not inflexible. Taught Jasper that strength and compassion aren\'t mutually exclusive.',
      age: 'Early 70s',
      appearance: '[ADDED] Still carries himself like a soldier. Silver crew cut, ramrod posture. Eyes that have seen things.',
      relationships: '[ADDED] Jasper (mentee), Hawk (knows his service history), BSS (occasional consultant)',
    },
    {
      name: 'David Kim',
      archetype: 'Business School Friend / Sounding Board',
      background: '[ADDED] Met Jasper during his brief MBA stint. Became unlikely friends - the soldier and the tech founder from San Francisco. Just a friend who sees Jasper as a person.',
      personality: '[ADDED] Wickedly smart, slightly awkward. Provides outside perspective. They play golf badly together.',
      age: 'Mid-40s',
      appearance: '[ADDED] Korean American, perpetually rumpled despite wealth. Glasses always slightly askew.',
      relationships: '[ADDED] Jasper (genuine friend outside BSS world), They vacation together occasionally - wives get along',
    },

    // ADDIE'S SOCIAL CIRCLE
    {
      name: 'Carla Martinez',
      archetype: 'Childhood Friend / Roots Connection',
      background: '[ADDED] Grew up with Addie in their rough neighborhood. Became a social worker. Still lives there by choice. Keeps Addie connected to who she was before BSS.',
      personality: '[ADDED] Blunt, loyal, unimpressed by Addie\'s rise. Still calls her "Del." The friend who knew her when she had nothing.',
      age: 'Late 30s',
      appearance: '[ADDED] Practical, no-frills. Working class comfort. Eyes that have seen hard things.',
      relationships: '[ADDED] Addie (best friend since childhood), Still lives in their old neighborhood - by choice',
    },
    {
      name: 'Father Michael Torres',
      archetype: 'RCIA Director / Faith Guide',
      background: '[ADDED] The Charlotte parish priest who guided Addie and Hawk through their conversion to Catholicism. Patient with their questions.',
      personality: '[ADDED] Scholarly but approachable. Explains theology without talking down. Genuinely moved by adult conversions.',
      age: 'Mid-50s',
      appearance: '[ADDED] Warm Latino features. Reading glasses. The kind of priest who makes confession feel safe.',
      relationships: '[ADDED] Addie (convert he guided), Hawk (convert), Grace (prepared her for sacraments)',
    },

    // HAWK'S SOCIAL CIRCLE
    {
      name: 'Sam "Wraith" Walker',
      archetype: 'Military Brother / Survivor Buddy',
      background: '[ADDED] Served with Hawk in the Yemen mission. Only other survivor. Now a fishing boat captain on the Gulf Coast. They don\'t talk about it, but the bond is unbreakable.',
      personality: '[ADDED] Quieter than Hawk. Dealt with trauma by seeking peace on the water. They can sit in silence for hours.',
      age: 'Late 30s - Early 40s',
      appearance: '[ADDED] Sun-weathered, beard. Carries himself like a man who found his own peace.',
      relationships: '[ADDED] Hawk (mission survivor bond), Addie (she\'s grateful for anyone who helps Hawk process)',
    },
    {
      name: 'Dr. Nathan Wells',
      archetype: 'VA Therapist / PTSD Specialist',
      background: '[ADDED] Hawk\'s therapist at the Charlotte VA. Former military psychologist. Specializes in special ops veterans.',
      personality: '[ADDED] Patient, grounded, never shocked. Has heard it all. Doesn\'t flinch at the dark stuff.',
      age: '50s',
      appearance: '[ADDED] Quiet strength in his presence. Comfortable office, no military memorabilia. Creates safety.',
      relationships: '[ADDED] Hawk (long-term client), Consults for BSS on trauma-informed approaches',
    },

    // LOTTIE'S SOCIAL CIRCLE
    {
      name: 'Marcus Chen',
      archetype: 'College Friend / Fashion Confidante',
      background: '[ADDED] Lottie\'s best friend from college. Gay, so no romantic possibility, but he\'s the male perspective she trusts. Fashion designer in NYC.',
      personality: '[ADDED] Dramatic, hilarious, fiercely loyal. Calls Lottie "darling" and means it. Her go-to for emotional crises.',
      age: 'Early 30s',
      appearance: '[ADDED] Impeccably styled Asian American man. Fashion-forward. Makes Lottie feel beautiful.',
      relationships: '[ADDED] Lottie (best friend), Occasionally consults on gala fashion for BSS events',
    },
    {
      name: 'Beth Hale',
      archetype: 'Cousin / Normal Life Model',
      background: '[ADDED] Lottie\'s cousin from the "regular" branch of the Hale family in suburban Charlotte. Elementary school teacher, married, two kids, minivan.',
      personality: '[ADDED] Genuinely content with her ordinary life. No pretension. Makes Lottie feel both better and worse about her choices.',
      age: 'Early 30s',
      appearance: '[ADDED] Similar to Lottie in features but softer edges. Mom uniform of comfortable clothes.',
      relationships: '[ADDED] Lottie (cousin/confidante), Elena (distant cousin - they knew each other as children)',
    },

    // HARPER'S SOCIAL CIRCLE
    {
      name: 'Dr. Amanda Reynolds',
      archetype: 'Ex-Wife / Co-Parent',
      background: '[ADDED] Harper\'s first wife, married young. Divorced amicably. Now an academic in Boston, remarried to a woman. Still co-parents their children well.',
      personality: '[ADDED] Direct, professional, still cares for Harper in a post-romantic way. They holiday together sometimes.',
      age: 'Early 40s',
      appearance: '[ADDED] Professional academic look. Still attractive. At ease with herself in ways she wasn\'t when married to Harper.',
      relationships: '[ADDED] Harper (ex-wife/co-parent), Their children (primary focus), Her wife (remarried happily)',
    },
    {
      name: 'James Reynolds',
      archetype: 'Father / Naval Admiral',
      background: '[ADDED] Harper\'s father. Retired Navy Admiral from Annapolis. Raised Harper with strict expectations. Came to respect BSS work.',
      personality: '[ADDED] Formal, precise, slowly learning to express emotions. Proud of Harper in ways he struggles to say.',
      age: 'Early 70s',
      appearance: '[ADDED] Military bearing never fades. Silver-haired, trim. Still wears his Naval ring.',
      relationships: '[ADDED] Harper (daughter), Jasper (respects him as a fellow serviceman)',
    },
  ];

  for (const char of socialConnections) {
    const existing = await prisma.character.findFirst({
      where: { projectId: project.id, name: char.name },
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
        },
      });
      console.log(`  ✓ ADDED: ${char.name}`);
    } else {
      console.log(`  - Already exists: ${char.name}`);
    }
  }

  // =============================================
  // ENHANCE MAIN CHARACTER RELATIONSHIPS
  // =============================================
  console.log('\n--- Enhancing Main Character Relationships ---\n');

  const relationshipEnhancements = [
    {
      name: 'Isabella "Bella" Rossi',
      updates: {
        relationships: '[ENHANCED] FAMILY: Rosa Rossi (mother - café matriarch), Giovanni Rossi (father - quiet wisdom), Marcus Rossi (brother - lawyer, protective), Daniel Rossi (brother - soccer player, teases her). WORK: Addie (mentor/mother figure), Hawk (mentor), Kendra (sister-like bond). LOVE: Mandy (ex/first love - healing journey), Matt (husband - found love). FRIENDS: Sarah Chen (college BFF - keeps her grounded), Father Anthony Ricci (childhood friend/spiritual guide). MENTORS: Chiara Benedetti (Italian POH guide), Msgr. Russo (faith connection).',
      },
    },
    {
      name: 'Kendra Donnelly',
      updates: {
        relationships: '[ENHANCED] FAMILY: Chris Donnelly (husband - steadfast faith), Maggie Donnelly (sister-in-law - working friendship), Shannon Donnelly-Walsh (sister-in-law - experienced voice). WORK: BSS analyst team, Bella (sister-bond), the Wives Club inner circle. ATHLETIC: Coach Mike Patterson (mentor since beginning), Tanya Williams (competitor turned friend). FAITH: Catholic community through Chris\'s family.',
      },
    },
    {
      name: 'Elena Hale-Barrett',
      updates: {
        relationships: '[ENHANCED] FAMILY: Jasper Barrett (husband - partnership of equals), Grace Barrett (daughter - her heart), Victoria Hale (mother - complicated love), Lottie Hale (sister - protective bond), Sara Hale (sister - younger, different path). WORK: Maison Aurelia team, BSS through Jasper. FRIENDS: Cat Ashworth (prep school BFF - reality check), Dr. Miriam Okonkwo (therapist - decade of trust). EXTENDED: Addie (sister-in-law energy), Harper (respects deeply).',
      },
    },
    {
      name: 'Jasper Barrett',
      updates: {
        relationships: '[ENHANCED] FAMILY: Elena (wife - his anchor), Grace (daughter - his soft spot), Hawk (brother - blood and battlefield), Addie (sister-in-law - deeply trusted), Lucas Barrett (younger brother - reconciled). WORK: BSS leadership, COO Harper. MENTORS: Colonel Bill Tate (military mentor). FRIENDS: David Kim (MBA friend - outside world perspective). The men who served with him never forgotten.',
      },
    },
    {
      name: 'Adelaide "Addie" Barrett',
      updates: {
        relationships: '[ENHANCED] FAMILY: Hawk (partner - her person), Grace (goddaughter - soul connection). WORK: Jasper (boss turned family), BSS leadership, POH Patroness role. ROOTS: Carla Martinez (childhood friend - knows her origin). FAITH: Father Michael Torres (conversion guide), POH sisterhood. MENTEES: Bella (Page - sees herself in her), other rising women.',
      },
    },
    {
      name: 'Michael "Hawk" Barrett',
      updates: {
        relationships: '[ENHANCED] FAMILY: Jasper (brother by choice and battle), Addie (partner - his salvation), Grace (goddaughter - learning softness). MILITARY: Sam "Wraith" Walker (Yemen survivor - unspoken bond), teams he led. HEALING: Dr. Nathan Wells (therapist - PTSD guide), Veterans he quietly supports. WORK: BSS operators who respect him.',
      },
    },
    {
      name: 'Charlotte "Lottie" Hale',
      updates: {
        relationships: '[ENHANCED] FAMILY: Elena (sister - protective older), Sara (sister - sometimes overlooked middle), Victoria Hale (mother - never quite enough). FRIENDS: Marcus Chen (college BFF - fashion/emotional support), Beth Hale (cousin - normal life model). WORK: BSS operations - the organizing genius. Dating life: Series of disappointments, still hoping.',
      },
    },
    {
      name: 'Harper Reynolds',
      updates: {
        relationships: '[ENHANCED] FAMILY: Izzy, Nico, Sofia (children - her priority), Dr. Amanda Reynolds (ex-wife - amicable co-parent), James Reynolds (father - Admiral, complicated pride). WORK: BSS COO role, Jasper (mutual respect), the leadership team. Personal life: Navigating dating as divorced executive mother.',
      },
    },
  ];

  for (const enhancement of relationshipEnhancements) {
    const existing = await prisma.character.findFirst({
      where: { projectId: project.id, name: enhancement.name },
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: enhancement.updates,
      });
      console.log(`  ✓ ENHANCED relationships: ${enhancement.name}`);
    } else {
      console.log(`  ✗ Not found: ${enhancement.name}`);
    }
  }

  // =============================================
  // ENHANCE KEY ORGANIZATIONS
  // =============================================
  console.log('\n--- Enhancing Organizations ---\n');

  const orgEnhancements = [
    {
      name: 'Palace of Honor',
      updates: {
        services: '[ADDED] Catholic social network for elite families. Charitable giving coordination. Faith-based mentorship. Gala and event organization. Marriage and family support. Quiet influence in Catholic philanthropic circles.',
        leadership: JSON.stringify([
          '[ADDED] Patroness of Honor: Adelaide "Addie" Barrett (unofficial but universally recognized)',
          'Vestals: Inner circle of trusted women',
          'Pages: Emerging leaders in training (Bella)',
          'Knights: Male members who support the mission',
        ]),
      },
    },
    {
      name: 'The Wives Club',
      updates: {
        services: '[ADDED] Support network for women connected to high-stakes professions. Crisis support for families. Social coordination. Resource sharing. Mentorship between generations. "The sisterhood behind the scenes."',
        leadership: JSON.stringify([
          '[ADDED] Vestals (Inner Circle): Elena, Addie, Harper - founding vision',
          'Owls (Advisors): Experienced women who guide',
          'Shieldmaidens (Protectors): Active support network',
          'Regional leaders across major cities',
        ]),
      },
    },
    {
      name: "Evie's Catering Company",
      updates: {
        description: '[ADDED] Boutique catering service run by Evelyn "Evie" Maren. Started as side gig while teaching culinary arts. Now handles intimate events for BSS and POH circles. Known for comfort food elevated to elegance.',
        services: '[ADDED] Intimate dinner parties. Family celebrations. Cooking classes for BSS families. Emergency feeding for crisis situations. "The food that feels like home but looks like art."',
        leadership: JSON.stringify(['[ADDED] Evie Maren - Owner/Head Chef', 'Small trusted team of former students']),
      },
    },
    {
      name: "Matt's Vacation Home Business",
      updates: {
        description: '[ADDED] Luxury vacation rental management and property development. Started with inherited family properties, grew into boutique business. Focus on authentic experiences over cookie-cutter luxury.',
        services: '[ADDED] Vacation property management. Property development consulting. Experience curation for high-end clients. Quiet retreats for those needing privacy.',
        leadership: JSON.stringify(['[ADDED] Matt - Owner/Operator', 'Small team of trusted property managers']),
      },
    },
  ];

  for (const org of orgEnhancements) {
    const existing = await prisma.organization.findFirst({
      where: { projectId: project.id, name: org.name },
    });

    if (existing) {
      await prisma.organization.update({
        where: { id: existing.id },
        data: org.updates,
      });
      console.log(`  ✓ ENHANCED: ${org.name}`);
    } else {
      console.log(`  ✗ Not found: ${org.name}`);
    }
  }

  console.log('\n========================================');
  console.log('ENHANCEMENT COMPLETE');
  console.log('========================================');
  console.log('\nAll additions marked with [ADDED] or [ENHANCED]');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
