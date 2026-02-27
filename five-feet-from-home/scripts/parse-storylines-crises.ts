import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Parsing Crises, Business Trips, Flashbacks, and Storylines from extracted documents...\n");

  // ============================================
  // CRISES FROM conflicts-catalog.md
  // ============================================

  const crises = [
    {
      name: 'London Data Breach',
      codeName: 'London Breach Emergency',
      clientName: 'Not specified by name',
      clientType: 'Corporate/Technology',
      crisisType: 'Cybersecurity Breach',
      severity: 'critical',
      location: 'London, UK',
      timeframe: '2:17 AM call, opens Book 1',
      description: 'Data intrusion through third-party vendor access. Initial fears of large breach scope.',
      situation: 'Data intrusion through third-party vendor access. Initial fears of large breach scope. BSS called at 2:17 AM.',
      complications: 'High-pressure executives, misinformation, need for holding statements for three scenarios (contained, expanding, unknown)',
      resolution: 'Access logs showed intrusion window shorter than feared. Breach scope contained. Statement drafted for CEO signature.',
      outcome: 'Contained within ~24 hours',
      bssTeam: JSON.stringify(['Jasper Barrett']),
      stakes: 'Data exposure, corporate reputation, regulatory compliance',
      status: 'resolved',
      bookAppearance: 'Book 1 - Chapter 1: The Call',
      tags: JSON.stringify(['book1', 'opening-crisis', 'jasper-lead']),
    },
    {
      name: 'Hong Kong Assignment',
      codeName: 'Hong Kong (Pending)',
      crisisType: 'Unknown (referenced but not detailed)',
      severity: 'high',
      location: 'Hong Kong',
      timeframe: 'Immediately after London; interrupted by Elena\'s hospitalization',
      description: 'High-priority crisis that required immediate attention. Jasper received "NEW SCOPE/ACCELERATED TIMELINE" email.',
      situation: 'Crisis assignment with accelerated timeline immediately following London breach.',
      resolution: 'Jasper declined/delayed when Elena collapsed - represents his first choice of family over work',
      outcome: 'Crisis abandoned - Jasper chose family over work',
      bssTeam: JSON.stringify(['Jasper Barrett (assigned but declined)']),
      status: 'abandoned',
      bookAppearance: 'Book 1 - Chapter 3',
      tags: JSON.stringify(['book1', 'turning-point', 'family-first']),
    },
    {
      name: 'Chicago Contamination Case',
      codeName: 'Rock Bottom',
      clientType: 'Food/Manufacturing',
      crisisType: 'Contamination/Public Health',
      severity: 'high',
      location: 'Chicago, IL',
      timeframe: 'Pre-story timeline, mentioned in flashback',
      description: 'Contamination case requiring crisis management. Jasper executes flawlessly but misses Grace\'s school recital.',
      situation: 'Contamination case requiring immediate on-site crisis management',
      resolution: 'Jasper executes flawlessly',
      outcome: 'Successfully resolved but at personal cost - missed Grace\'s recital that Elena said was important',
      bssTeam: JSON.stringify(['Jasper Barrett']),
      stakes: 'Public health, corporate reputation, family relationship',
      status: 'resolved',
      bookAppearance: 'Book 1 - Flashback/Chapter 9',
      lessonsLearned: 'Rookie consultant\'s words: "You can\'t manage a crisis if you\'re living in one." - This is referenced as a turning point for Jasper questioning work-life balance.',
      tags: JSON.stringify(['book1', 'flashback', 'personal-cost', 'turning-point']),
    },
    {
      name: 'Project Wildcard',
      codeName: 'Wildcard',
      clientName: 'Alexandra Pierce\'s company',
      clientType: 'Corporate',
      crisisType: 'Corporate crisis (specifics not detailed)',
      severity: 'high',
      location: 'Charlotte area',
      timeframe: 'During Elena\'s recovery period',
      description: 'High-profile corporate crisis requiring immediate attention. Client: Alexandra Pierce (CEO), mid-forties, composed.',
      situation: 'High-profile corporate crisis with demanding client who makes Jasper feel essential',
      complications: 'Alexandra represents temptation for Jasper - validates his need to be essential. Creates tension with Elena.',
      resolution: 'Stabilized; referenced as contained by party weekend',
      outcome: 'Successfully resolved',
      bssTeam: JSON.stringify(['Jasper Barrett (lead)', 'Harper Caldwell', 'team']),
      stakes: 'Corporate stability, client relationship, personal boundaries',
      status: 'resolved',
      bookAppearance: 'Book 1 - During Elena\'s recovery',
      tags: JSON.stringify(['book1', 'temptation', 'alexandra-pierce', 'harper-involved']),
    },
    {
      name: 'Whitaker Medical Holdings Financial Crisis',
      codeName: 'Whitaker',
      clientName: 'Whitaker Medical Holdings',
      clientType: 'Healthcare/Medical',
      crisisType: 'Financial fraud/Embezzlement',
      severity: 'critical',
      location: 'Charlotte area',
      timeframe: 'During Elena\'s recovery',
      description: '$12 million missing from last quarter\'s operating budget. Deliberate, clean movement through shell companies.',
      situation: '$12 million missing from operating budget. Not sloppy accounting - deliberate, clean movement. "Someone moved it—clean, deliberate, like they were prepping for a quiet exit."',
      complications: 'Money layered through three shell vendors in Delaware and Cyprus shell. CFO signing off without reading fine print. CEO collapsed. Board coup in motion.',
      resolution: 'Rafe traced money through shell companies, shadowed CFO. Harper established war room at hospital. Rafe\'s forensic work exposed the scheme.',
      outcome: 'Crisis contained and resolved',
      bssTeam: JSON.stringify(['Harper Caldwell (lead on-site)', 'Jasper Barrett (oversight)', 'Rafe Moreno (forensic accounting/money trail)']),
      stakes: 'Corporate survival, board control, investor confidence',
      status: 'resolved',
      bookAppearance: 'Book 1 - Resolved by end',
      tags: JSON.stringify(['book1', 'financial-fraud', 'harper-lead', 'rafe-forensics']),
    },
    {
      name: 'Africa Coup Intervention',
      codeName: 'Africa Operations',
      clientType: 'Private client (unnamed)',
      crisisType: 'Political crisis - coup in motion',
      severity: 'critical',
      location: 'Africa (Lagos mentioned as hub)',
      timeframe: 'Concurrent with Elena\'s recovery and Whitaker crisis',
      description: 'Coup in motion - Western partner needs extraction cover. Encrypted comms, back-channel negotiations.',
      situation: 'Coup in motion. Western partner needs extraction cover.',
      complications: 'Delicate politics where "one wrong word could have destabilized an entire region"',
      resolution: 'Interim government in place. Coup leaders out. American interests secure. Harper\'s Lagos work: Final signed agreement.',
      outcome: 'Successfully resolved - team returning for Elena\'s party',
      bssTeam: JSON.stringify(['Cole (lead field operative)', 'Dean (field operative)', 'Harper Caldwell (oversight from Lagos)']),
      stakes: 'Regional stability, American interests, lives',
      status: 'resolved',
      bookAppearance: 'Book 1',
      lessonsLearned: 'The kind of work that never made it into any report and never would.',
      tags: JSON.stringify(['book1', 'political', 'field-ops', 'cole-dean', 'harper-oversight']),
    },
    {
      name: 'Singapore Security Breach',
      codeName: 'Singapore',
      clientType: 'Corporate/Political',
      crisisType: 'Security breach with political complications',
      severity: 'high',
      location: 'Singapore',
      timeframe: 'Referenced during Elena\'s hospital stay; ongoing',
      description: 'Leak traced to mid-tier analyst in Singapore. Politicians making noise about security breach.',
      situation: 'Leak traced to "mid-tier analyst in Singapore". Analyst admitted on record it was speculation. Politicians making noise.',
      complications: 'Board in panic mode. Political pressure.',
      resolution: 'Addison called from secure line with option to "flip this before close"',
      outcome: 'Contained',
      bssTeam: JSON.stringify(['Harper Caldwell (lead, on-site in Asia)', 'Team support']),
      stakes: 'Political reputation, corporate security, regional relationships',
      status: 'resolved',
      bookAppearance: 'Book 1; Book 2 Setup',
      tags: JSON.stringify(['book1', 'book2-setup', 'singapore', 'harper-lead']),
    },
    {
      name: 'Prescott Grand Hotel Renovation',
      codeName: 'Prescott',
      clientName: 'Investment group (unnamed)',
      clientType: 'Construction/Hospitality',
      crisisType: 'Construction project failure/mismanagement',
      severity: 'critical',
      location: 'Uptown Charlotte',
      timeframe: '8 years before main story',
      description: 'Construction project 3 months behind schedule, bleeding money daily. Multiple cascading failures.',
      situation: '3 months behind schedule. Bleeding money daily. HVAC installs out of order, ductwork conflicting with electrical, Italian fixtures stuck in customs, concrete pour curing wrong, millwork team walked off (pay dispute), HVAC subcontractor MIA, project manager doing crossword puzzles.',
      complications: 'Cascading construction failures, contractor disputes, financial pressure',
      resolution: 'Jessica Vaughn recommended giving Jasper (not even lead PM at the time) full authority. Three months later, Prescott Grand opened on schedule, under budget.',
      outcome: 'Hotel opened on schedule and under budget',
      bssTeam: JSON.stringify(['Jasper Barrett (junior role, promoted to lead)', 'Jessica Vaughn (consultant/mentor)']),
      stakes: 'Project completion, investor money, Jasper\'s career',
      status: 'resolved',
      bookAppearance: 'Book 1 - Flashback',
      lessonsLearned: 'Jessica\'s quote: "You\'re not just putting out fires. You\'re redesigning the building while it\'s burning down." - Origin of Jasper and Jessica\'s mentor relationship.',
      tags: JSON.stringify(['flashback', 'origin-story', 'jessica-vaughn', 'jasper-breakthrough']),
    },
    {
      name: 'NFL Team Ownership Battle',
      codeName: 'NFL Ownership',
      clientName: 'Chris Cole (star quarterback)',
      clientType: 'Professional Sports/NFL',
      crisisType: 'Corporate/ownership dispute',
      severity: 'high',
      location: 'Charlotte area',
      timeframe: 'Ongoing through Book 1; escalates for Book 2',
      description: 'Battle for control of NFL franchise. Backroom politics, whispered deals, multiple factions.',
      situation: 'Battle for control of NFL franchise. Chris Cole caught in middle as "face of the team" - pressured to leverage influence in ways unrelated to football. Talk of selling minority stake to "tech guy from the West Coast" - "Silicon Valley money, wants to \'modernize the franchise.\'"',
      complications: 'Multiple factions, backroom politics, Chris pressured to take sides',
      resolution: 'Unresolved in Book 1',
      outcome: 'Ongoing - major thread for Book 2',
      bssTeam: JSON.stringify(['Jasper Barrett (advisory)']),
      stakes: 'Team control, Chris\'s position, franchise direction',
      status: 'ongoing',
      bookAppearance: 'Book 1 (ongoing); Book 2 (escalates)',
      tags: JSON.stringify(['book1', 'book2-setup', 'ongoing', 'chris-cole', 'sports']),
    },
    {
      name: 'Denver Telecom Crisis',
      codeName: 'Denver Crisis',
      clientName: 'Telecom company (unnamed)',
      clientType: 'Telecommunications',
      crisisType: 'Infrastructure/Systems Failure',
      severity: 'critical',
      location: 'Denver, CO',
      timeframe: 'Book 4 (Love Option series)',
      description: 'Telecom systems in the West collapse. Denver becomes ground zero for crisis threatening clients and national infrastructure.',
      situation: 'West region telecom outages. Denver becomes command center. Month-long crisis management.',
      complications: 'Regional infrastructure impact, client relationships, national scope',
      resolution: 'Addie + Daniel + Midwest team stabilize after month-long effort',
      outcome: 'Crisis resolved through sustained effort',
      bssTeam: JSON.stringify(['Addie (lead)', 'Daniel (under Jasper)', 'Midwest team']),
      stakes: 'Regional infrastructure, national telecom stability, client relationships',
      status: 'planned',
      bookAppearance: 'Book 4 - Love Option',
      tags: JSON.stringify(['book4', 'love-option', 'addie-lead', 'daniel', 'denver']),
    },
  ];

  // ============================================
  // BUSINESS TRIPS
  // ============================================

  const businessTrips = [
    {
      name: 'London Data Breach Response',
      traveler: 'Jasper Barrett',
      destination: 'London, UK',
      origin: 'Charlotte/Home',
      purpose: 'Emergency cybersecurity breach response',
      duration: '~24 hours',
      timeframe: 'Book 1 opening - 2:17 AM call',
      crisisName: 'London Data Breach',
      storyEvents: 'Jasper assembles crisis response team before dawn, flies to London immediately, operates from glass-walled conference room, manages high-pressure executives, dictates media strategy, fights misinformation, drafts holding statements.',
      homeImpact: 'Left Elena and Grace abruptly at 2 AM; Grace didn\'t get to say goodbye. Key quote: "Five feet at a time—that\'s how you handled the mornings."',
      outcome: 'Breach contained, statement drafted for CEO signature',
      bookAppearance: 'Book 1 - Chapter 1',
      tripOrder: 1,
      tags: JSON.stringify(['book1', 'opening', 'emergency', 'personal-cost']),
    },
    {
      name: 'Hong Kong Assignment (Cancelled)',
      traveler: 'Jasper Barrett',
      destination: 'Hong Kong',
      origin: 'Charlotte/Home',
      purpose: 'Crisis response - NEW SCOPE/ACCELERATED TIMELINE',
      duration: 'Never happened - cancelled',
      timeframe: 'Immediately after London; interrupted by Elena\'s hospitalization',
      crisisName: 'Hong Kong Assignment',
      storyEvents: 'Jasper was assigned but Elena\'s collapse forced him to decline/delay.',
      homeImpact: 'First time Jasper chose family over work - turning point in his arc',
      outcome: 'Trip cancelled - chose Elena over assignment',
      bookAppearance: 'Book 1 - Chapter 3',
      tripOrder: 2,
      tags: JSON.stringify(['book1', 'cancelled', 'turning-point', 'family-first']),
    },
    {
      name: 'Chicago Contamination Response',
      traveler: 'Jasper Barrett',
      destination: 'Chicago, IL',
      origin: 'Home',
      purpose: 'Contamination crisis management',
      duration: 'Not specified',
      timeframe: 'Pre-story timeline - flashback',
      crisisName: 'Chicago Contamination Case',
      storyEvents: 'Jasper executes contamination crisis flawlessly on-site',
      homeImpact: 'Missed Grace\'s school recital - the one Elena said was important. Called "Rock Bottom" - the moment Jasper started questioning his work-life balance.',
      outcome: 'Crisis resolved successfully but at personal cost',
      bookAppearance: 'Book 1 - Flashback',
      tripOrder: null,
      tags: JSON.stringify(['flashback', 'personal-cost', 'turning-point']),
    },
    {
      name: 'Florence Italy Client Summit',
      traveler: 'Jasper Barrett',
      destination: 'Florence, Italy',
      origin: 'Not specified',
      purpose: 'Client summit (extended into vacation attempt)',
      duration: 'Extended trip',
      timeframe: 'Flashback - years before main story',
      storyEvents: 'Eating breakfast on a terrace in Florence when phone rang with a "bad enough" call. Took the call. Elena watched the city wake without him for three hours.',
      homeImpact: 'When he returned, Elena asked if he even remembered what the coffee had tasted like. He hadn\'t.',
      outcome: 'Work interrupted vacation attempt',
      bookAppearance: 'Book 1 - Flashback/Chapter 6',
      tripOrder: null,
      tags: JSON.stringify(['flashback', 'italy', 'work-life-conflict']),
    },
    {
      name: 'Asia Crisis Trip',
      traveler: 'Jasper Barrett',
      destination: 'Asia (multiple locations)',
      origin: 'Charlotte',
      purpose: 'Crisis management',
      duration: '14 days planned',
      timeframe: 'Book 1 - during Elena\'s recovery',
      storyEvents: 'Trip loomed - 14 days of boardrooms, press conferences, and crisis rooms in three countries. Had been locked for weeks.',
      homeImpact: 'Conflict between work obligation and being present for Elena\'s recovery',
      outcome: 'Trip status unclear - context suggests Jasper may have modified or shortened it',
      bookAppearance: 'Book 1',
      tripOrder: null,
      tags: JSON.stringify(['book1', 'asia', 'family-conflict']),
    },
    {
      name: 'Harper\'s Singapore Operations',
      traveler: 'Harper Caldwell',
      destination: 'Singapore',
      origin: 'Charlotte/BSS HQ',
      purpose: 'Security breach response - on-site lead',
      duration: 'Extended deployment',
      timeframe: 'Book 1 - during Elena\'s hospital stay',
      crisisName: 'Singapore Security Breach',
      storyEvents: 'On-site in Asia managing security breach with political complications. Politicians making noise. Board in panic mode.',
      outcome: 'Crisis contained',
      bookAppearance: 'Book 1; Book 2 setup',
      tags: JSON.stringify(['book1', 'harper', 'singapore', 'on-site-lead']),
    },
    {
      name: 'Harper\'s Lagos/Africa Operations',
      traveler: 'Harper Caldwell',
      destination: 'Lagos, Nigeria (Africa operations hub)',
      origin: 'Charlotte/BSS HQ',
      purpose: 'Africa coup intervention - oversight from Lagos',
      duration: '3+ weeks in the field',
      timeframe: 'Book 1 - concurrent with Elena\'s recovery',
      crisisName: 'Africa Coup Intervention',
      companions: JSON.stringify(['Cole (lead field operative)', 'Dean (field operative)']),
      storyEvents: 'Harper on-site in khaki field pants, cream blouse, emerald scarf. Half a world away. Local ministry pulled permit, politician demanding photo op before repairs could begin. Text: "This is worse than we thought." Final signed agreement. Navigated delicate politics where "one wrong word could have destabilized an entire region"',
      outcome: 'Interim government in place. Coup leaders out. American interests secure. Team returning for Elena\'s party.',
      bookAppearance: 'Book 1',
      tags: JSON.stringify(['book1', 'harper', 'africa', 'lagos', 'field-ops']),
    },
    {
      name: 'Addie\'s Spain Crisis (Hospital Collapse)',
      traveler: 'Addie',
      destination: 'Spain',
      origin: 'Previous assignment location',
      purpose: 'Crisis management',
      duration: 'Not specified',
      timeframe: 'Book 4 - Love Option series',
      storyEvents: 'Addie fainted during Spain assignment. Missed Grace\'s call. Covered it up - not a meeting, not a crisis, just her out cold in a hospital bed. Tier 1 swore to secrecy.',
      homeImpact: 'Hidden health crisis - Addie covering up collapse from overwork',
      outcome: 'Crisis resolved but Addie\'s health declining',
      bookAppearance: 'Book 4 - Love Option',
      tags: JSON.stringify(['book4', 'love-option', 'addie', 'spain', 'health-crisis', 'hidden']),
    },
    {
      name: 'Addie\'s Global Crisis Run (Spain → Africa → Chicago → Chile → Boston → Miami)',
      traveler: 'Addie',
      destination: 'Multiple: Spain, Africa, Chicago, South America, Boston, Miami',
      origin: 'Charlotte/BSS HQ',
      purpose: 'Serial crisis management - clients requesting her by name',
      duration: 'Extended multi-city run',
      timeframe: 'Book 4 - Love Option series',
      storyEvents: 'Spain crisis → Africa infrastructure failure → Chicago crisis (messy) → Chile/South America telecom crisis → Boston crisis (short but high-stakes) → Miami. Clients now ask for Addie by name even over Jasper. Jasper protests "you should stop home for a weekend" but crisis always wins. He remembers the lifestyle and misses it. Addie never takes breaks.',
      homeImpact: 'Sends gifts, apologizes with "crisis took me." Elena hurt but doesn\'t press. Addie on exhaustion treadmill, can\'t stop.',
      outcome: 'Crises resolved but Addie burning out',
      bookAppearance: 'Book 4 - Love Option',
      tags: JSON.stringify(['book4', 'love-option', 'addie', 'global', 'burnout', 'montage']),
    },
    {
      name: 'Florida Trip - Harper\'s Fiancé Meeting',
      traveler: 'Jasper Barrett, Elena Barrett',
      destination: 'Florida (Miami area)',
      origin: 'Charlotte',
      purpose: 'Meet Harper\'s fiancé privately, resolve Miami problem',
      duration: 'Weekend trip',
      timeframe: 'Book 1',
      companions: JSON.stringify(['Elena Barrett']),
      storyEvents: 'Jasper and Elena trip to FL to meet Harper\'s fiancé privately for first time. Dockside lunch. Jasper resolves Miami problem, then slips away for lightning trip to DC for another client crisis before getting back home.',
      outcome: 'Meeting successful, crisis resolved',
      bookAppearance: 'Book 1',
      tags: JSON.stringify(['book1', 'florida', 'harper-fiance', 'couple-trip']),
    },
    {
      name: 'Addie & Kendra ATL Trip (Small Conflict Test)',
      traveler: 'Addie, Kendra',
      destination: 'Atlanta, GA',
      origin: 'Charlotte',
      purpose: 'Small to medium conflict solve - test assignment for Kendra under Addie',
      duration: 'Short trip',
      timeframe: 'Book 1',
      companions: JSON.stringify(['Kendra (reporting under Addie for two weeks)']),
      storyEvents: 'Elena proposes match Kendra with Addie but keep her local as much as possible. Test trip to ATL for small to medium conflict with Midwest team (windmill-related issue). Jasper assigns Kendra to Addie as analyst (not yet fixer).',
      outcome: 'Test successful - Kendra proves capable',
      bookAppearance: 'Book 1',
      tags: JSON.stringify(['book1', 'atlanta', 'addie-kendra', 'mentorship', 'test-assignment']),
    },
    {
      name: 'Addie New York Business Trip',
      traveler: 'Addie',
      destination: 'New York City',
      origin: 'Charlotte',
      purpose: 'Business meetings/crisis management',
      duration: 'Overnight/multi-day',
      timeframe: 'Book 1',
      storyEvents: 'Addie\'s work trip to NYC referenced multiple times. Part of her "business trip" nights pattern during Jasper\'s overnight trips.',
      bookAppearance: 'Book 1',
      tags: JSON.stringify(['book1', 'nyc', 'addie', 'business']),
    },
    {
      name: 'Kendra Asia Trip with Harper',
      traveler: 'Kendra',
      destination: 'Asia',
      origin: 'Charlotte',
      purpose: 'Work with Harper on operations',
      duration: 'Week-long flight + operations',
      timeframe: 'Book 1',
      companions: JSON.stringify(['Harper Caldwell']),
      storyEvents: 'Friday morning flight to Asia for a week. Harper efficient, calm, but Kendra senses her guard down only in small cracks. Long flight together.',
      outcome: 'Professional bonding, successful mission',
      bookAppearance: 'Book 1',
      tags: JSON.stringify(['book1', 'asia', 'kendra', 'harper', 'mentorship']),
    },
  ];

  // ============================================
  // FLASHBACKS & STORYLINES
  // ============================================

  const storylines = [
    {
      title: 'The Café in the Rain - Jasper & Elena Early Dating',
      category: 'Flashback',
      description: 'A café with paint peeling off the walls. They\'d found it by accident after a rainstorm, ducking in to escape the downpour. The place smelled like cinnamon and burnt espresso. They talked until the owner stacked chairs on tables and locked the door around them. "Guess we shut the place down," she\'d said, and he\'d thought, *I could shut the world down if it meant keeping her here.*',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early dating',
      location: 'Unknown city café',
      themes: JSON.stringify(['romance', 'early-relationship', 'presence']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'dating', 'terminal-list-style']),
    },
    {
      title: 'Chicago Rooftop Proposal',
      category: 'Flashback',
      description: 'A rooftop in Chicago. The city spread out below them in a web of gold light. The ring in his palm felt heavier than anything he\'d ever carried on a mission.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Engagement',
      location: 'Chicago rooftop',
      themes: JSON.stringify(['romance', 'proposal', 'commitment']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'proposal', 'terminal-list-style']),
    },
    {
      title: 'Sunday Morning Stay',
      category: 'Flashback',
      description: 'A Sunday morning years ago, sunlight pouring across rumpled sheets. Elena\'s hair fanned across the pillow, her hand curled loosely around his. "Stay home today," she\'d murmured. He had. Once.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early marriage',
      location: 'Their bedroom',
      themes: JSON.stringify(['intimacy', 'presence', 'regret']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'marriage', 'terminal-list-style']),
    },
    {
      title: 'First Apartment - When Home Felt Natural',
      category: 'Flashback',
      description: 'Their first apartment had been a cramped one-bedroom on the third floor of a building with temperamental heating and a super who never returned calls. The rent just barely covered each month, and some months it didn\'t cover at all. Jasper had taken a small crisis job for a startup no one had heard of—a meal-kit company that had accidentally shipped boxes with salmonella-tainted chicken to three thousand customers across the Midwest. It paid almost nothing, but the hours were reasonable. He\'d come home at six every night. They\'d eat dinner at the folding table by the window, watching the sun set over the parking lot next door. Afterward, they\'d move to the couch—a secondhand thing with sagging cushions—and talk. About everything. About nothing. "What if this is as good as it gets?" Elena had asked one night. "Then it\'s pretty good," he\'d said. Back then, being home had felt natural. Like breathing. Like the default state of his existence.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early career, early marriage',
      location: 'First apartment - third floor one-bedroom',
      themes: JSON.stringify(['simplicity', 'presence', 'work-life-balance', 'nostalgia']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'origin-story', 'chapter-10']),
    },
    {
      title: 'Wedding Beach Escape',
      category: 'Flashback',
      description: 'Not Elena in a hospital bed, but Elena the way she\'d been on the night they\'d snuck away from a wedding reception. The venue had been some overpriced country club. They\'d both been bored senseless by midnight, trading glances across the table until Elena had leaned in and whispered: *Let\'s get out of here.* They\'d slipped out a side door and found themselves on a quiet beach, the reception\'s noise fading behind them. Elena had kicked off her heels, holding them in one hand as she picked her way across the sand. "You\'re going to ruin your suit," she\'d teased when he stepped into the water. But she\'d followed anyway, laughing as the hem of her dress caught the foam. He remembered how her hair had smelled of sea salt and champagne. She\'d leaned in and whispered: *"I think I could do forever with you."*',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Dating/early marriage',
      location: 'Beach outside wedding venue',
      themes: JSON.stringify(['romance', 'spontaneity', 'commitment', 'escape']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'chapter-15', 'romantic']),
    },
    {
      title: 'Street Café Phone Theft',
      category: 'Flashback',
      description: 'They\'d been dating for maybe six months, still in that phase where every moment felt precious. He\'d been checking his email at the table, half-present while she tried to tell him about something. Without warning, she\'d reached across and plucked the phone right out of his hands. "Hey—" "You\'re here, but you\'re not here," she\'d said, slipping it into her bag with a mischievous smile. "Stay with me tonight." They\'d stayed at that café for hours, talking about nothing important. The phone had stayed in her bag.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Six months into dating',
      location: 'Street café',
      themes: JSON.stringify(['presence-vs-absence', 'early-warning', 'elena-boundary-setting']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'chapter-19', 'foreshadowing']),
    },
    {
      title: 'The Missed Dinner',
      category: 'Flashback',
      description: 'Their first apartment. Elena in her work blouse, sleeves rolled up, hair pulled back like she\'d given up on the night before it started. Two plates of cold takeout on the table. A single candle burned between them, its wax dripping down in uneven rivulets, pooling on the plate beneath it like tears. She\'d planned something. He could tell from the way the table was set, the wine she\'d opened, the dress she\'d changed out of. *Traffic,* he\'d said, loosening his tie. An hour late. Maybe two. *Work,* she\'d replied, her voice flat, the fight gone before it started. The candle had burned low between them, and they\'d eaten in silence.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'First apartment - marriage strain beginning',
      location: 'First apartment - dinner table',
      themes: JSON.stringify(['marriage-strain', 'disappointment', 'work-life-conflict']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'chapter-20', 'marriage-decline']),
    },
    {
      title: 'The Dinner Table Argument',
      category: 'Flashback',
      description: 'Her eyes flashing in anger at a dinner table set for four. His chair empty until an hour too late. "I don\'t mind you loving your work," she\'d said, voice shaking. "But don\'t make me compete with it."',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Marriage strain period',
      location: 'Dinner table',
      themes: JSON.stringify(['marriage-conflict', 'competition-with-work', 'elena-breaking-point']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'chat1-source', 'conflict']),
    },
    {
      title: 'The #1 Dad Mug',
      category: 'Flashback',
      description: 'A kitchen years ago, Elena handing him a coffee mug that read #1 Dad. He\'d laughed, hugged her, felt that rush of purpose. Her first words: "I hope you\'re here for this." His first thought: *I need to work harder.*',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Pregnancy announcement',
      location: 'Kitchen',
      themes: JSON.stringify(['pregnancy', 'misplaced-priorities', 'irony']),
      tags: JSON.stringify(['flashback', 'jasper-elena', 'grace-pregnancy', 'tragic-irony']),
    },
    {
      title: 'Grace\'s Spelling Words',
      category: 'Flashback',
      description: 'A kitchen table at home, Grace bent over spelling words. She\'d looked up at him, pencil between her teeth, and said, "You can\'t spell \'team\' without \'me,\' Daddy." He\'d smiled and promised to remember that. He hadn\'t.',
      characters: JSON.stringify(['Jasper Barrett', 'Grace Barrett']),
      timeline: 'Grace childhood',
      location: 'Kitchen table',
      themes: JSON.stringify(['father-daughter', 'broken-promises', 'team']),
      tags: JSON.stringify(['flashback', 'jasper-grace', 'war-room-scene', 'promises']),
    },
    {
      title: 'Grace\'s 7th Birthday - The Missed Cake',
      category: 'Flashback',
      description: 'The call had come during Grace\'s seventh birthday party. He\'d stepped away to take it, promising "five minutes." He\'d missed the cake entirely. When he came back, Grace had frosting on her cheeks and no interest in showing him how she\'d blown out the candles. Elena had looked at him across the room like she\'d just stopped believing in something.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'Grace age 7',
      location: 'Birthday party',
      themes: JSON.stringify(['absence', 'broken-promises', 'elena-losing-faith']),
      tags: JSON.stringify(['flashback', 'chapter-9', 'birthday', 'personal-cost']),
    },
    {
      title: 'Grace\'s First Soccer Goal',
      category: 'Flashback',
      description: 'In a boardroom in New York, he\'d sat through a twelve-hour session negotiating a merger that would keep two thousand people employed. That night, in the hotel, Elena had texted him a photo of Grace\'s first soccer goal. He\'d been too tired to reply until morning. By then, the moment was over.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'Grace childhood',
      location: 'New York boardroom / hotel',
      themes: JSON.stringify(['absence', 'missed-moments', 'priorities']),
      tags: JSON.stringify(['flashback', 'chapter-8', 'soccer', 'missed-milestone']),
    },
    {
      title: 'The Delivery Room Promise',
      category: 'Flashback',
      description: 'Elena in the delivery room, her face slick with sweat, her hand crushing his with a strength he hadn\'t known she possessed. The machines beeping their urgent rhythms, the nurses moving with practiced efficiency. Grace\'s first cry piercing through the chaos like a declaration of war. Elena had turned to him, her eyes wild and fierce. *"Be here, not there."* He\'d promised. He\'d meant it with everything he had.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett (birth)']),
      timeline: 'Grace\'s birth',
      location: 'Delivery room',
      themes: JSON.stringify(['birth', 'promise', 'commitment', 'presence']),
      tags: JSON.stringify(['flashback', 'chapters-19-20', 'grace-birth', 'broken-promise']),
    },
    {
      title: 'The Wildfire Photo',
      category: 'Flashback',
      description: 'In his old office on K Street, he\'d kept a framed photograph on the wall behind his desk. A wildfire at night—bright orange flames against the black sky, captured from a helicopter during a crisis he\'d helped navigate years ago. Clients had commented on it sometimes. "Quite the image," they\'d say, and Jasper would explain that it represented what they were all fighting—the chaos that could swallow companies, careers, entire industries if left unchecked. He\'d told himself the photo was a reminder of why his work mattered. Now he wondered if his whole career had been about running into the fire.',
      characters: JSON.stringify(['Jasper Barrett']),
      timeline: 'Career reflection',
      location: 'Old office on K Street',
      themes: JSON.stringify(['career-identity', 'self-reflection', 'fire-metaphor']),
      tags: JSON.stringify(['flashback', 'chapter-11', 'professional', 'symbolism']),
    },
    {
      title: 'Florence Terrace - Italy Trip Interrupted',
      category: 'Flashback',
      description: 'They were in Italy for a client summit, the first time they\'d extended a work trip into something resembling a vacation. They\'d been eating breakfast on a terrace in Florence when his phone rang with a "bad enough" call. He\'d taken it. She\'d watched the city wake without him for three hours. When he returned, she\'d asked if he even remembered what the coffee had tasted like. He hadn\'t.',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Years before main story',
      location: 'Florence, Italy - terrace',
      themes: JSON.stringify(['work-interrupts-life', 'absence-while-present', 'lost-moments']),
      tags: JSON.stringify(['flashback', 'chapter-6', 'italy', 'vacation-ruined']),
    },
    {
      title: 'Alexandra - Hotel Lobby Temptation',
      category: 'Flashback',
      description: 'A night two years back, after a tense contract negotiation that had dragged into the early morning hours. They\'d ended up alone in a hotel lobby, the rain coming down hard outside. She\'d suggested one more drink—just to decompress. He\'d agreed because saying no would have meant admitting there was something to say no to. They\'d sat in leather chairs by the fireplace. She\'d leaned in when she laughed, close enough that he could smell her perfume. Her hand had brushed his arm—slow, deliberate—and stayed there a beat too long. He\'d told himself it was nothing. He\'d walked away. But his pulse had been pounding the whole ride home.',
      characters: JSON.stringify(['Jasper Barrett', 'Alexandra Pierce']),
      timeline: 'Two years before main story',
      location: 'Hotel lobby',
      themes: JSON.stringify(['temptation', 'boundaries', 'emotional-affair-risk']),
      tags: JSON.stringify(['flashback', 'chapter-19', 'alexandra', 'temptation']),
    },
    {
      title: 'Alexandra - The Gala Photo',
      category: 'Flashback',
      description: 'A gala years ago, before the distance between him and Elena had grown. Alexandra in a black dress, champagne in hand, her head tilted toward him as if they were sharing a secret the rest of the room couldn\'t hear. She\'d texted it two months ago with: *Remember how we used to win together?*',
      characters: JSON.stringify(['Jasper Barrett', 'Alexandra Pierce']),
      timeline: 'Years before main story',
      location: 'Gala event',
      themes: JSON.stringify(['professional-partnership', 'nostalgia', 'temptation']),
      tags: JSON.stringify(['flashback', 'chapter-19', 'alexandra', 'gala']),
    },
  ];

  // ============================================
  // EXECUTE ADDITIONS
  // ============================================

  let crisisCreated = 0;
  let crisisUpdated = 0;
  let tripCreated = 0;
  let tripUpdated = 0;
  let storylineCreated = 0;
  let storylineUpdated = 0;

  console.log("=== ADDING CRISES ===\n");
  for (const crisis of crises) {
    const existing = await prisma.crisis.findFirst({
      where: { name: crisis.name, projectId: project.id }
    });

    if (existing) {
      await prisma.crisis.update({
        where: { id: existing.id },
        data: crisis
      });
      console.log(`Updated: ${crisis.name}`);
      crisisUpdated++;
    } else {
      await prisma.crisis.create({
        data: {
          projectId: project.id,
          ...crisis,
        }
      });
      console.log(`Created: ${crisis.name}`);
      crisisCreated++;
    }
  }

  console.log("\n=== ADDING BUSINESS TRIPS ===\n");
  for (const trip of businessTrips) {
    const existing = await prisma.businessTrip.findFirst({
      where: { name: trip.name, projectId: project.id }
    });

    if (existing) {
      await prisma.businessTrip.update({
        where: { id: existing.id },
        data: trip
      });
      console.log(`Updated: ${trip.name}`);
      tripUpdated++;
    } else {
      await prisma.businessTrip.create({
        data: {
          projectId: project.id,
          ...trip,
        }
      });
      console.log(`Created: ${trip.name}`);
      tripCreated++;
    }
  }

  console.log("\n=== ADDING STORYLINES & FLASHBACKS ===\n");
  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (existing) {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated: ${storyline.title}`);
      storylineUpdated++;
    } else {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          ...storyline,
        }
      });
      console.log(`Created: ${storyline.title}`);
      storylineCreated++;
    }
  }

  console.log("\n=== SUMMARY ===");
  console.log(`\nCrises - Created: ${crisisCreated}, Updated: ${crisisUpdated}`);
  console.log(`Business Trips - Created: ${tripCreated}, Updated: ${tripUpdated}`);
  console.log(`Storylines - Created: ${storylineCreated}, Updated: ${storylineUpdated}`);

  const totalCrises = await prisma.crisis.count();
  const totalTrips = await prisma.businessTrip.count();
  const totalStorylines = await prisma.storyline.count();

  console.log(`\nTotal in database:`);
  console.log(`  Crises: ${totalCrises}`);
  console.log(`  Business Trips: ${totalTrips}`);
  console.log(`  Storylines: ${totalStorylines}`);

  await prisma.$disconnect();
}

main().catch(console.error);
