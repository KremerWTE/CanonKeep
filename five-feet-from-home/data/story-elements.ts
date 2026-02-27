// ==============================================
// EXTRACTED STORY ELEMENTS - Structured Data
// Generated from EXTRACTED-STORY-ELEMENTS.md
// Last Updated: December 25, 2024
// ==============================================

// ==============================================
// BOOK SERIES
// ==============================================

export const bookSeries = [
  {
    name: 'My Fair Lady (Bella Series)',
    seriesType: 'Spin-off',
    protagonist: 'Bella',
    premise: 'From pawn to queen. Bella\'s journey from worthlessness to worth through the worthiness wound, hustle as coping, learning to delegate, and finding peace.',
    themes: JSON.stringify(['Worthiness', 'Hustle/Grind', 'Learning to Delegate', 'Self-Worth', 'Healing']),
    totalBooks: 7,
    status: 'complete',
    readingOrder: 2,
    books: JSON.stringify([
      { number: 1, title: 'Wouldn\'t It Be Loverly', chapters: 37, synopsis: 'Pre-BSS years, Boston College, family background' },
      { number: 2, title: 'The Rain in Spain', chapters: 42, synopsis: 'Early BSS, Europe crash, hustle pattern, POH Page offer' },
      { number: 3, title: 'I Could Have Danced All Night', chapters: 38, synopsis: 'POH Page role, Hawk chess lessons, earning place' },
      { number: 4, title: 'Show Me', chapters: 38, synopsis: 'Mandy\'s ranch, healing, veterans program, Matt introduction' },
      { number: 5, title: 'Black Moves Second', chapters: 38, synopsis: 'Matt proposal, barn wedding, youth program, Charlotte birth' },
      { number: 6, title: 'I\'ve Grown Accustomed to Her Face', chapters: 32, synopsis: 'Empire building, fertility journey, Rose & James births' },
      { number: 7, title: 'A Hymn to Her', chapters: 30, synopsis: 'Later years, Rose calling out pattern, becoming matriarch' },
    ]),
  },
  {
    name: 'The Shadow\'s Ledger (Harper Series)',
    seriesType: 'Spin-off',
    protagonist: 'Harper',
    premise: 'The quiet queen behind BSS. Harper\'s journey as COO, wife, mother, and the woman who sees problems before they happen.',
    themes: JSON.stringify(['Oracle Sight', 'Three Kingdoms', 'Quiet Power', 'Unspoken Love']),
    totalBooks: 1,
    status: 'in-progress',
    readingOrder: 3,
    books: JSON.stringify([
      { number: 1, title: 'Book 1', chapters: 9, synopsis: 'Shadow partner to COO, crises, family' },
    ]),
  },
  {
    name: 'Empire and Home (Jasper & Elena Series)',
    seriesType: 'Spin-off',
    protagonist: 'Jasper & Elena',
    premise: 'The power couple learning to balance empire and family. Jasper\'s work addiction and Elena\'s CEO return.',
    themes: JSON.stringify(['Work/Life Balance', 'Power Couple', 'Present Father', 'CEO Return']),
    totalBooks: 2,
    status: 'in-progress',
    readingOrder: 4,
    books: JSON.stringify([
      { number: 1, title: 'Book 1 - The Balance', chapters: 6, synopsis: 'Work transition, date nights, family focus' },
      { number: 2, title: 'Empire Builders', chapters: 3, synopsis: 'BSS expansion' },
    ]),
  },
  {
    name: 'Faith and Foundation (Addie & Hawk Series)',
    seriesType: 'Spin-off',
    protagonist: 'Addie & Hawk',
    premise: 'The spiritual anchors of the compound. Catholic conversion, POH leadership, fire pit wisdom.',
    themes: JSON.stringify(['Faith', 'Conversion', 'Mentorship', 'Fire Pit Wisdom']),
    totalBooks: 4,
    status: 'planned',
    readingOrder: 5,
    books: JSON.stringify([
      { number: 1, title: 'The Conversion', synopsis: 'Hawk\'s Catholic journey' },
      { number: 2, title: 'Patroness of Honor', synopsis: 'Addie\'s POH role' },
      { number: 3, title: 'Grace\'s Confirmation Story', synopsis: 'Sponsoring Grace' },
      { number: 4, title: 'Fire Pit Wisdom Collection', synopsis: 'Mentorship moments' },
    ]),
  },
  {
    name: 'CrossFit to Crisis (Kendra & Chris Series)',
    seriesType: 'Spin-off',
    protagonist: 'Kendra & Chris',
    premise: 'The athletic anchor and her husband. CrossFit career, BSS work, Catholic wedding, motherhood.',
    themes: JSON.stringify(['Athletic Excellence', 'Faith', 'Motherhood', 'Partnership']),
    totalBooks: 1,
    status: 'planned',
    readingOrder: 6,
  },
];

// ==============================================
// CHARACTERS
// ==============================================

export const characters = [
  // CORE WOMEN
  {
    name: 'Adelaide "Addie" Barrett',
    nickname: 'Addie',
    archetype: 'Matriarch/Mentor',
    affiliationRole: 'POH Patroness, Compound Leader',
    bssRole: 'Senior Leadership',
    wivesClubRole: 'Leader',
    pohRole: 'Patroness of Honor',
    appearance: 'Elegant, aging gracefully, signature diamond drops',
    wardrobeStyle: 'Galas: Floor-length silk in burgundy/midnight blue, Louboutin. Business: Roland Mouret sheath, Valentino blazer. Compound: Cashmere sweater, dark jeans, riding boots.',
    personality: 'Wise, commanding presence, holds space without dominating',
    motivations: 'Protecting and nurturing the family, passing on wisdom',
    relationships: 'Hawk (partner), Bella (protégé/daughter), Grace (goddaughter/sponsor)',
  },
  {
    name: 'Isabella "Bella" Rossi',
    nickname: 'Bella',
    archetype: 'Protagonist/Underdog Rising',
    affiliationRole: 'BSS Fixer, POH Page',
    bssRole: 'Senior Fixer',
    wivesClubRole: 'Inner Circle',
    pohRole: 'Page',
    hubLocation: 'Charlotte',
    education: 'Boston College, Possibly Law degree',
    background: 'Italian-American family, cafe/bookstore parents, two brothers (Marcus - lawyer, Daniel - soccer player)',
    appearance: 'Romantic, soft features, often with journal',
    wardrobeStyle: 'Galas: A-line in blush/soft gold, floral appliqué, Jimmy Choo champagne. Business: Feminine blazer, silk blouse. Casual: Soft sweaters, jeans, ankle boots.',
    personality: 'Intense, perfectionist, hustler mentality masking worthiness wound',
    motivations: 'Proving her worth, learning she\'s already enough',
    fears: 'Not being enough, being found out as unworthy',
    relationships: 'Addie (mentor/mother), Hawk (mentor), Mandy (ex/first love), Matt (husband)',
  },
  {
    name: 'Kendra Donnelly',
    nickname: 'Kendra',
    archetype: 'Athletic Warrior',
    affiliationRole: 'BSS Fixer, CrossFit Champion',
    bssRole: 'Fixer',
    wivesClubRole: 'Inner Circle',
    hubLocation: 'Charlotte',
    education: 'Athletic background',
    appearance: 'Lean muscle, athletic grace, French braid often',
    wardrobeStyle: 'Galas: Sleek column in emerald/sapphire, one-shoulder, gold earrings. Training: Lululemon, Nike Elite. Casual: Premium athleisure, perfect jeans.',
    personality: 'Direct, physical, grounded',
    motivations: 'Excellence in all domains, protecting family',
    relationships: 'Chris (husband), Addison (complex history), Elena (close friend)',
  },
  {
    name: 'Elena Hale-Barrett',
    nickname: 'Elena',
    archetype: 'Elegant CEO',
    affiliationRole: 'CEO Maison Aurelia',
    maisonAureliaRole: 'Founder/CEO',
    hubLocation: 'Charlotte',
    appearance: 'Classic glamour, impeccable',
    wardrobeStyle: 'Galas: Couture in black/ivory/red, Chanel/Valentino, Cartier. Business: The Row/Armani power suits, Hermès scarf. Casual: Cashmere, silk, Ferragamo flats.',
    personality: 'Commanding, elegant, empire builder',
    motivations: 'Building cathedrals (events that echo), balancing empire and family',
    relationships: 'Jasper (husband), Grace/Lucas (children), Sara (sister), Addison & Kendra (complex)',
  },
  {
    name: 'Harper Reynolds',
    nickname: 'Harper',
    archetype: 'The Oracle COO',
    affiliationRole: 'COO of BSS',
    bssRole: 'COO',
    hubLocation: 'Miami',
    appearance: 'Understated power, sharp',
    wardrobeStyle: 'Galas: Sleek charcoal/navy/forest, Victoria Beckham, tennis bracelet. Business: Black/navy tailored blazers, Stuart Weitzman heels. Crisis Mode: Hair back, blazer off, sleeves rolled.',
    personality: 'Sees problems before they happen, quiet power, intensely loyal',
    motivations: 'Protecting BSS, her three kingdoms (Miami home, BSS, children)',
    secrets: 'Unspoken feelings for Jasper, never acted on',
    relationships: 'Daniel (husband), Isabella/Nico/Sofia (children), Jasper (complex professional/personal)',
  },
  {
    name: 'Selene Marchetti',
    nickname: 'Selene',
    archetype: 'Dangerous Beauty',
    affiliationRole: 'Shadow Strategist',
    bssRole: 'Strategist (fallen)',
    wivesClubRole: 'Inner Circle (Complex)',
    appearance: 'Stunning, dangerous allure',
    wardrobeStyle: 'Galas: Bold red/black/emerald, Versace/Tom Ford/McQueen, snake motifs. Private: Actually simpler, silk robes.',
    personality: 'Magnetic, self-destructive, brilliant but broken',
    motivations: 'Unclear - possibly redemption',
    secrets: 'The Incident that caused her fall',
    relationships: 'Nico (Harper\'s son) adores her, others wary',
  },
  {
    name: 'Charlotte "Lottie" Hale',
    nickname: 'Lottie',
    archetype: 'The DUFF (Reclaimed)',
    affiliationRole: 'Operations Chief, Maison Aurelia',
    maisonAureliaRole: 'Operations Chief',
    appearance: 'Polished professional',
    wardrobeStyle: 'Galas (Working): Navy/black sheath, comfortable heels, clipboard. Personal Events: Empire-waist in jewel tone, surprised gasps.',
    personality: 'Logistics genius, sees everything, underestimated',
    motivations: 'Proving value beyond appearance, seating chart mastery',
  },

  // CORE MEN
  {
    name: 'Michael "Hawk" Barrett',
    nickname: 'Hawk',
    archetype: 'The Mentor',
    affiliationRole: 'Head of Operations',
    bssRole: 'Head of Operations',
    hubLocation: 'Charlotte Compound',
    background: 'Former Tier One operator, Catholic convert',
    appearance: 'Weathered, commanding, calm presence',
    personality: 'Steady, wise, asks the two questions',
    motivations: 'Passing on wisdom, protecting family, fire pit tradition',
    relationships: 'Addie (partner), Bella (protégé), Evie (sister)',
    catchphrases: '"How are you doing?" / "How can I support you?"',
  },
  {
    name: 'Jasper Barrett',
    nickname: 'Jasper',
    archetype: 'The CEO',
    affiliationRole: 'CEO of BSS',
    bssRole: 'CEO',
    hubLocation: 'Charlotte',
    appearance: 'Distinguished, powerful',
    personality: 'Work-addicted (healing), learning to be present',
    motivations: 'Transition from 90/10 to 60/40 work/life balance',
    relationships: 'Elena (wife), Grace/Lucas (children), Harper (COO, complex)',
    arcStart: 'Work-addicted, identity tied to being "the fixer\'s fixer"',
    arcChange: 'Learning to be present, floor vs rope (foundation not climber)',
    arcEnd: 'Present father, balanced leader',
  },
  {
    name: 'Matt',
    archetype: 'The Patient Partner',
    affiliationRole: 'Rancher, Vacation Homes Business',
    hubLocation: 'Ranch (TN/VA/NC border)',
    personality: 'Patient, steady, old-fashioned courtship',
    motivations: 'Building life with Bella, unconditional love',
    relationships: 'Bella (wife)',
    catchphrases: '"I\'m patient. I can wait while you figure it out."',
  },
  {
    name: 'Chris Donnelly',
    nickname: 'Chris',
    archetype: 'The Irish-Catholic Partner',
    affiliationRole: 'Finance',
    hubLocation: 'Charlotte',
    background: 'Irish-Catholic roots',
    faithRoots: 'Strong Catholic faith',
    relationships: 'Kendra (wife), Msgr. Russo (spiritual director)',
  },
  {
    name: 'Daniel',
    archetype: 'The Miami Anchor',
    affiliationRole: 'Shipping/Logistics Magnate',
    hubLocation: 'Miami',
    relationships: 'Harper (wife), Isabella/Nico/Sofia (children)',
  },

  // HARPER'S FAMILY
  {
    name: 'Isabella "Izzy" Reynolds',
    nickname: 'Izzy',
    age: '9',
    archetype: 'The Thoughtful Leader',
    relationships: 'Harper (mother), Daniel (father), favorite aunt: Kendra',
    personality: 'Thoughtful, natural leader',
  },
  {
    name: 'Nicolas "Nico" Reynolds',
    nickname: 'Nico',
    age: '7 (twin)',
    archetype: 'The Adventurer',
    relationships: 'Harper (mother), Daniel (father), favorite aunt: Selene',
    personality: 'Mischievous, adventurous',
  },
  {
    name: 'Sofia Reynolds',
    age: '7 (twin)',
    archetype: 'The Princess General',
    relationships: 'Harper (mother), Daniel (father), favorite aunt: Bella',
    personality: 'Bossy, commanding',
  },
  {
    name: 'Chiara Benedetti',
    age: '26',
    archetype: 'The Connected Au Pair',
    affiliationRole: 'Au Pair to Harper\'s children',
    pohRole: 'POH-connected',
    background: 'Florentine, hand-selected by Addie',
  },

  // EXTENDED FAMILY
  {
    name: 'Mandy',
    archetype: 'The Healer',
    affiliationRole: 'Ranch Owner',
    hubLocation: 'TN/VA/NC border ranch',
    background: 'Former Agency, survivor of abuse and addiction',
    personality: 'Wise, grounded, understands worthiness wounds',
    relationships: 'Bella (ex, first love), Matt (introduced Bella to him)',
  },
  {
    name: 'Sara Hale',
    archetype: 'The Athletic Anchor',
    affiliationRole: 'Teacher, CrossFit Empire',
    background: 'PCOS, teacher',
    relationships: 'Elena (sister), Izzy (daughter)',
  },
  {
    name: 'Grace Barrett',
    age: '11',
    archetype: 'The Next Generation',
    relationships: 'Jasper/Elena (parents), Addie (godmother/confirmation sponsor)',
    faithRoots: 'Catholic, preparing for Confirmation',
  },
  {
    name: 'Evie',
    archetype: 'The Sister',
    affiliationRole: 'Catering Company Owner',
    relationships: 'Hawk (brother), has niece and nephew',
  },

  // BELLA'S FAMILY
  {
    name: 'Marcus Rossi',
    archetype: 'The Overachieving Brother',
    affiliationRole: 'Partner at law firm',
    education: 'Georgetown, Columbia Law, federal judge clerk',
    relationships: 'Bella (sister), Daniel Rossi (brother)',
  },
  {
    name: 'Daniel Rossi',
    archetype: 'The Underachieving Brother',
    background: 'Former D1 soccer, "between opportunities", multiple marriages',
    relationships: 'Bella (sister), Marcus Rossi (brother)',
  },

  // CLERGY
  {
    name: 'Msgr. Anthony Russo',
    archetype: 'Spiritual Guide',
    affiliationRole: 'Chris\'s Spiritual Director',
    relationships: 'Chris (directee), will officiate Kendra/Chris wedding',
  },
];

// ==============================================
// ORGANIZATIONS
// ==============================================

export const organizations = [
  {
    name: 'Barrett Security Solutions',
    shortName: 'BSS',
    type: 'Corporation',
    industry: 'Crisis Management / Security',
    description: 'Elite crisis management and security firm handling high-stakes situations for Fortune 500 companies, governments, and wealthy individuals.',
    headquarters: 'Charlotte, NC',
    leadership: JSON.stringify(['Jasper Barrett (CEO)', 'Harper Reynolds (COO)', 'Hawk (Head of Operations)', 'Cole (Head of Operators)', 'Ridge (Asst. Head of Operators)']),
    services: 'Crisis management, security, extraction, reputation protection',
    significance: 'Central organization of the story universe',
  },
  {
    name: 'Maison Aurelia',
    shortName: 'Maison Aurelia',
    type: 'Corporation',
    industry: 'Elite Event Planning / Lifestyle',
    description: 'Elena\'s elite event planning and lifestyle management company.',
    headquarters: 'Charlotte, with presence in Rome, Dubai, NYC, London',
    founder: 'Elena Hale-Barrett',
    leadership: JSON.stringify(['Elena Hale-Barrett (CEO)', 'Lottie Hale (Operations Chief)']),
    services: 'Vatican-linked fundraisers, Fortune 100 CEO summits, cultural diplomacy dinners',
  },
  {
    name: 'Palace of Honor',
    shortName: 'POH',
    type: 'Charitable Organization',
    industry: 'Charitable / Religious',
    description: 'Catholic-connected charitable organization focused on women\'s worth and dignity.',
    leadership: JSON.stringify(['Addie Barrett (Patroness)', 'Bella Rossi (Page)']),
    relationships: 'Vatican connections, works with Maison Aurelia',
    significance: 'Spiritual and charitable arm of the family',
  },
  {
    name: 'Wives Club',
    type: 'Social Club',
    description: 'Hierarchical social network of powerful women connected to BSS.',
    leadership: JSON.stringify(['Addie (Leader)', 'Elena', 'Harper', 'Kendra', 'Bella']),
    services: JSON.stringify(['Vestals (Elite - old money, Vatican/political)', 'Owls (High society, sorority)', 'Shieldmaidens (Operators\' wives)']),
    significance: 'Social support network and power structure',
  },
  {
    name: 'Sara\'s CrossFit Empire',
    type: 'Business',
    industry: 'Fitness',
    description: 'Multiple CrossFit locations with veterans\' programs.',
    founder: 'Sara Hale',
    leadership: JSON.stringify(['Sara Hale']),
  },
  {
    name: 'Matt\'s Vacation Home Business',
    type: 'Business',
    industry: 'Real Estate / Hospitality',
    description: 'Vacation rental property business.',
    founder: 'Matt',
    relationships: 'Connection to BSS security',
  },
  {
    name: 'Evie\'s Catering Company',
    type: 'Business',
    industry: 'Catering',
    description: 'Catering company run by Hawk\'s sister.',
    founder: 'Evie',
    relationships: 'Provides catering for family events',
  },
];

// ==============================================
// LOCATIONS
// ==============================================

export const locations = [
  {
    name: 'Charlotte Compound',
    description: 'Main BSS family compound and headquarters. Features war room, office wing, family wing, dojo, range, and the famous fire pit.',
    significance: 'Central location for all family and business activities',
    rules: 'Fire pit is sacred space. The compound is both fortress and home.',
  },
  {
    name: 'Miami HQ',
    description: 'Harper\'s BSS hub and second command center.',
    significance: 'Harper\'s domain, second BSS headquarters',
  },
  {
    name: 'Mandy\'s Ranch (Primary)',
    description: 'Ranch at the TN/VA/NC border. Features veterans program, equine therapy, and the cabin where Bella healed.',
    significance: 'Location of Bella\'s healing journey and wedding',
  },
  {
    name: 'Mandy\'s Ranch (Secondary)',
    description: 'Secondary ranch property outside Denver.',
    significance: 'Additional ranch location',
  },
  {
    name: 'London Office',
    description: 'BSS London hub for European operations.',
    significance: 'Location of Embassy Ball Save crisis',
  },
  {
    name: 'Blue Ridge Cabin',
    description: 'Retreat cabin in the Blue Ridge mountains. No phones, no staff.',
    significance: 'Jasper/Elena retreat location, site of Firelight Confessions',
  },
  {
    name: 'Virginia Vineyard',
    description: 'Vineyard location for Jasper/Elena date night.',
    significance: 'Vineyard Weekend date location',
  },
  {
    name: 'Lake House',
    description: 'Lake property for post-gala escapes.',
    significance: 'Midnight at the Lake date location',
  },
  {
    name: 'Harper\'s Miami Home',
    description: 'Coral Gables mansion, ocean-facing, art-filled sanctuary.',
    significance: 'Harper\'s family home',
  },
];

// ==============================================
// CRISES
// ==============================================

export const crises = [
  {
    name: 'Miami Hurricane Evacuation',
    crisisType: 'Natural Disaster',
    severity: 'critical',
    location: 'Miami',
    description: 'Category 4 hurricane requiring coordinated evacuation of all client families.',
    resolution: 'No client families stranded. Full coordination success.',
    bssTeam: JSON.stringify(['Harper']),
    status: 'resolved',
  },
  {
    name: 'Embassy Ball Save',
    crisisType: 'Diplomatic',
    severity: 'high',
    location: 'London',
    description: 'Harper stepped in for Jasper to handle diplomats and donors at Embassy Ball.',
    resolution: 'Successfully managed all relationships',
    bssTeam: JSON.stringify(['Harper']),
    status: 'resolved',
  },
  {
    name: 'Red List Call',
    crisisType: 'Humanitarian',
    severity: 'critical',
    location: 'Foreign',
    description: 'Client\'s daughter on red list. 2 AM call requiring humanitarian extraction.',
    resolution: 'Successful extraction',
    bssTeam: JSON.stringify(['Harper', 'BSS Team']),
    status: 'resolved',
  },
  {
    name: 'The Broken Deal',
    crisisType: 'Business',
    severity: 'high',
    location: 'Dubai',
    description: 'Deal collapse that Harper warned about but Jasper ignored. Cost millions.',
    lessonsLearned: 'Listen to Harper\'s warnings',
    bssTeam: JSON.stringify(['Harper', 'Jasper']),
    status: 'resolved',
  },
  {
    name: 'Boston Collapse',
    crisisType: 'Financial',
    severity: 'high',
    location: 'Boston',
    description: 'CFO moving money offshore. Harper spotted it from a cufflink twitch.',
    resolution: 'Caught before major damage',
    bssTeam: JSON.stringify(['Harper']),
    status: 'resolved',
  },
  {
    name: 'Manhattan Hostage',
    crisisType: 'Hostage',
    severity: 'critical',
    location: 'NYC',
    description: 'Hedge funder\'s daughter grabbed. Harper found Chelsea loft location.',
    resolution: 'Successful rescue',
    bssTeam: JSON.stringify(['Harper', 'Operators']),
    status: 'resolved',
  },
  {
    name: 'Europe Assignment',
    crisisType: 'Personnel',
    severity: 'high',
    location: 'Europe',
    description: 'Bella almost cracked during overseas assignment. Burned out, sent home.',
    resolution: 'Bella returned for recovery at compound',
    bssTeam: JSON.stringify(['Bella']),
    status: 'resolved',
    bookAppearance: 'Bella Book 2',
  },
];

// ==============================================
// GALAS & EVENTS
// ==============================================

export const galas = [
  {
    name: 'Kennedy Foundation Gala',
    purpose: 'Charity',
    significance: 'Where Addie first noticed Bella',
    bookAppearance: 'Bella Book 1',
  },
  {
    name: 'Vatican-linked Fundraisers',
    purpose: 'Charity/Religious',
    organization: 'POH / Maison Aurelia',
    significance: 'Regular POH events',
  },
  {
    name: 'Easter Vigil Mass',
    purpose: 'Religious',
    significance: 'Addie & Hawk baptism',
    bookAppearance: 'Addie/Hawk Book 1',
  },
  {
    name: 'Grace\'s First Communion',
    purpose: 'Religious',
    significance: 'Addie as godmother',
  },
  {
    name: 'Grace\'s Confirmation',
    purpose: 'Religious',
    significance: 'Addie as sponsor',
    bookAppearance: 'Addie/Hawk Book 3',
  },
  {
    name: 'Bella & Matt Wedding',
    purpose: 'Wedding',
    venue: 'Barn at Mandy\'s ranch',
    location: 'TN/VA/NC border',
    significance: 'Bella\'s wedding',
    bookAppearance: 'Bella Book 5',
    clothingDescriptions: JSON.stringify({
      'Bella': 'Lace cathedral-length, vintage buttons, great-grandmother\'s rosary',
      'Addie': 'Custom champagne silk, diamond drops',
      'Harper': 'Slate blue column',
      'Elena': 'Ivory with rose gold accents',
    }),
  },
  {
    name: 'Palace of Honor Galas',
    purpose: 'Charity',
    organization: 'POH',
    significance: 'Regular POH events',
  },
];

// ==============================================
// BUSINESS TRIPS
// ==============================================

export const businessTrips = [
  {
    name: 'Jasper & Elena Vineyard Weekend',
    traveler: 'Jasper & Elena',
    destination: 'Virginia',
    purpose: 'Date/Reconnection',
    storyEvents: 'Walking between rows at sunset, Elena talking about her work, Jasper finally listening',
    significance: 'Key relationship moment',
    bookAppearance: 'Jasper/Elena Book 1',
  },
  {
    name: 'Blue Ridge Cabin Retreat',
    traveler: 'Jasper & Elena',
    destination: 'Blue Ridge Mountains',
    duration: '3 days',
    purpose: 'Retreat/Reconnection',
    storyEvents: 'No staff, no phones. Jasper chops wood, Elena reads by fire. First time Jasper speaks about retiring from front-line work.',
    bookAppearance: 'Jasper/Elena Book 1',
  },
  {
    name: 'Bella Ranch Healing',
    traveler: 'Bella',
    destination: 'Mandy\'s Ranch (TN/VA/NC)',
    duration: '6 months',
    purpose: 'Healing/Recovery',
    storyEvents: 'Equine therapy, veterans group, meeting Matt, first intimacy with Mandy, learning to be still',
    bookAppearance: 'Bella Book 4',
  },
];

// ==============================================
// INTIMATE ENCOUNTERS
// ==============================================

export const funTimeEncounters = [
  {
    title: 'The Threesome',
    encounterType: 'threesome',
    participants: JSON.stringify(['Elena Barrett', 'Addison Price', 'Kendra']),
    location: 'Oak Watch master bedroom',
    galaConnection: 'Night before Kendra\'s wedding',
    setting: 'Dress prep complete, children asleep, dresses finished',
    description: 'Elena initiates, Addison vulnerable, Kendra urgent. Slow, consensual, checking in throughout.',
    powerDynamic: 'Elena leads initially, then equal',
    aftermath: 'All three in bed, no regrets. Jasper returns, understands, accepts.',
    emotionalImpact: '"Addition, not replacement" - love as expansion',
    bookAppearance: 'Main Series Book 2, Chapter 22',
  },
  {
    title: 'Bella & Mandy First Intimacy',
    encounterType: 'couple',
    participants: JSON.stringify(['Bella', 'Mandy']),
    location: 'Ranch cabin',
    setting: 'Weeks of trust-building, Thursday night porch conversation',
    description: 'First kiss on porch, Bella cries from emotional release. Mandy makes it slow, safe, checking in.',
    powerDynamic: 'Mandy leads, sets pace',
    aftermath: 'Morning after - "I don\'t want to leave"',
    emotionalImpact: 'Bella\'s first true vulnerability in love',
    bookAppearance: 'Bella Book 4, Chapter 4',
  },
  {
    title: 'Bella & Matt Wedding Night',
    encounterType: 'couple',
    participants: JSON.stringify(['Bella', 'Matt']),
    location: 'Special cabin at Mandy\'s ranch',
    galaConnection: 'Their wedding',
    setting: 'Candles, rose petals, stone fireplace (prepared by Mandy)',
    description: 'Slow, savoring, intentional. Matt undresses her slowly, each button a small ceremony.',
    aftermath: 'Talking until small hours about future, kids, dog names',
    emotionalImpact: 'First night as married couple, "We have forever"',
    bookAppearance: 'Bella Book 5, Chapter 5e',
  },
  {
    title: 'Firelight Confessions',
    encounterType: 'tension',
    participants: JSON.stringify(['Kendra', 'Addison']),
    location: 'Blue Ridge cabin',
    setting: 'After New York kiss, weekend getaway with Harper and Sara',
    description: 'Confession of feelings, sleeping in same bed with careful distance. No physical action.',
    emotionalImpact: 'Existing in "the space between" - the not-knowing',
    bookAppearance: 'Main Series Book 3, Chapter 55',
  },
];

// ==============================================
// STORYLINES (Plot Arcs)
// ==============================================

export const storylines = [
  {
    title: 'Bella\'s Worthiness Journey',
    category: 'Character Arc',
    description: 'Bella\'s journey from believing she\'s worthless to knowing she\'s worthy. The hustle as coping mechanism, learning to delegate, finding peace.',
    characters: JSON.stringify(['Bella', 'Addie', 'Hawk', 'Mandy', 'Matt']),
    themes: JSON.stringify(['Worthiness', 'Hustle', 'Delegation', 'Self-Acceptance']),
  },
  {
    title: 'Jasper\'s Work/Life Balance',
    category: 'Character Arc',
    description: 'Jasper\'s transition from 90/10 work/life to 60/40. Learning to be present father and husband.',
    characters: JSON.stringify(['Jasper', 'Elena', 'Grace', 'Lucas']),
    themes: JSON.stringify(['Work Addiction', 'Presence', 'Fatherhood']),
  },
  {
    title: 'Elena\'s CEO Return',
    category: 'Character Arc',
    description: 'Elena reclaiming her Maison Aurelia identity while balancing motherhood.',
    characters: JSON.stringify(['Elena', 'Lottie', 'Jasper']),
    themes: JSON.stringify(['Identity', 'Ambition', 'Balance']),
  },
  {
    title: 'Fire Pit Tradition',
    category: 'Recurring Element',
    description: 'The sacred fire pit ritual with two questions: "How are you doing?" and "How can I support you?"',
    characters: JSON.stringify(['Hawk', 'Bella', 'Jasper', 'All Characters']),
    themes: JSON.stringify(['Mentorship', 'Presence', 'Support']),
  },
  {
    title: 'Kendra/Addison Complex',
    category: 'Relationship Arc',
    description: 'The complex history between Kendra and Addison, culminating in the Elena connection.',
    characters: JSON.stringify(['Kendra', 'Addison', 'Elena', 'Chris']),
    themes: JSON.stringify(['Love', 'Complexity', 'Addition']),
  },
];
