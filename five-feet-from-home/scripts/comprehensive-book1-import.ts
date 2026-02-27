import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== COMPREHENSIVE BOOK 1 IMPORT ===\n");

  // ========================================
  // PART 1: ALL FLASHBACKS FROM CATALOG
  // ========================================
  console.log("--- Adding Flashbacks ---\n");

  const allFlashbacks = [
    // JASPER & ELENA - DATING & EARLY MARRIAGE
    {
      title: 'The Café in the Rain',
      category: 'Flashback',
      description: 'Jasper and Elena find a café during a rainstorm - early dating magic.',
      content: `A café with paint peeling off the walls. They'd found it by accident after a rainstorm, ducking in to escape the downpour. The place smelled like cinnamon and burnt espresso. They talked until the owner stacked chairs on tables and locked the door around them.

"Guess we shut the place down," she'd said, and he'd thought, I could shut the world down if it meant keeping her here.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early dating',
      location: 'Unknown city café',
      themes: JSON.stringify(['romance', 'early love', 'connection']),
    },
    {
      title: 'The Chicago Rooftop Proposal',
      category: 'Flashback',
      description: 'Jasper proposes to Elena on a Chicago rooftop.',
      content: `A rooftop in Chicago. The city spread out below them in a web of gold light. The ring in his palm felt heavier than anything he'd ever carried on a mission.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Before marriage - proposal',
      location: 'Chicago rooftop',
      themes: JSON.stringify(['proposal', 'commitment', 'vulnerability']),
    },
    {
      title: 'Sunday Morning Stay',
      category: 'Flashback',
      description: 'A rare Sunday when Jasper stayed home.',
      content: `A Sunday morning years ago, sunlight pouring across rumpled sheets. Elena's hair fanned across the pillow, her hand curled loosely around his. "Stay home today," she'd murmured. He had. Once.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'During marriage',
      location: 'Barrett bedroom',
      themes: JSON.stringify(['intimacy', 'rare presence', 'what was lost']),
    },
    {
      title: 'The First Apartment - When Home Felt Natural',
      category: 'Flashback',
      description: 'Their first cramped apartment when life was simpler.',
      content: `Their first apartment had been a cramped one-bedroom on the third floor of a building with temperamental heating and a super who never returned calls. The rent just barely covered each month, and some months it didn't cover at all.

Jasper had taken a small crisis job for a startup no one had heard of—a meal-kit company that had accidentally shipped boxes with salmonella-tainted chicken to three thousand customers across the Midwest. It paid almost nothing, but the hours were reasonable.

He'd come home at six every night. They'd eat dinner at the folding table by the window, watching the sun set over the parking lot next door. Afterward, they'd move to the couch—a secondhand thing with sagging cushions—and talk. About everything. About nothing.

"What if this is as good as it gets?" Elena had asked one night.

"Then it's pretty good," he'd said.

Back then, being home had felt natural. Like breathing. Like the default state of his existence.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'First apartment - early career',
      location: 'First apartment',
      themes: JSON.stringify(['simplicity', 'early marriage', 'what was lost', 'home']),
    },
    {
      title: 'The Wedding Beach Escape',
      category: 'Flashback',
      description: 'Jasper and Elena sneak away from a boring wedding reception.',
      content: `Not Elena in a hospital bed, but Elena the way she'd been on the night they'd snuck away from a wedding reception.

The venue had been some overpriced country club. They'd both been bored senseless by midnight, trading glances across the table until Elena had leaned in and whispered: Let's get out of here.

They'd slipped out a side door and found themselves on a quiet beach, the reception's noise fading behind them. Elena had kicked off her heels, holding them in one hand as she picked her way across the sand.

"You're going to ruin your suit," she'd teased when he stepped into the water.

But she'd followed anyway, laughing as the hem of her dress caught the foam.

He remembered how her hair had smelled of sea salt and champagne. She'd leaned in and whispered:

"I think I could do forever with you."`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'During marriage - wedding escape',
      location: 'Beach near country club',
      themes: JSON.stringify(['spontaneity', 'romance', 'forever promise']),
    },
    {
      title: 'The Street Café Phone Theft',
      category: 'Flashback',
      description: 'Elena takes Jasper\'s phone during early dating.',
      content: `They'd been dating for maybe six months, still in that phase where every moment felt precious. He'd been checking his email at the table, half-present while she tried to tell him about something.

Without warning, she'd reached across and plucked the phone right out of his hands.

"Hey—"

"You're here, but you're not here," she'd said, slipping it into her bag with a mischievous smile. "Stay with me tonight."

They'd stayed at that café for hours, talking about nothing important. The phone had stayed in her bag.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early dating - 6 months in',
      location: 'Street café',
      themes: JSON.stringify(['presence vs absence', 'phone addiction', 'Elena\'s directness']),
    },

    // JASPER & ELENA - MARRIAGE STRAIN
    {
      title: 'The Missed Dinner - Cold Takeout',
      category: 'Flashback',
      description: 'Elena\'s planned romantic dinner ruined by Jasper\'s lateness.',
      content: `Their first apartment. Elena in her work blouse, sleeves rolled up, hair pulled back like she'd given up on the night before it started.

Two plates of cold takeout on the table. A single candle burned between them, its wax dripping down in uneven rivulets, pooling on the plate beneath it like tears.

She'd planned something. He could tell from the way the table was set, the wine she'd opened, the dress she'd changed out of.

Traffic, he'd said, loosening his tie. An hour late. Maybe two.

Work, she'd replied, her voice flat, the fight gone before it started.

The candle had burned low between them, and they'd eaten in silence.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'First apartment - pattern begins',
      location: 'First apartment',
      themes: JSON.stringify(['disappointment', 'silence', 'pattern of absence']),
    },
    {
      title: 'The Dinner Table Argument',
      category: 'Flashback',
      description: 'Elena confronts Jasper about competing with work.',
      content: `Her eyes flashing in anger at a dinner table set for four. His chair empty until an hour too late.

"I don't mind you loving your work," she'd said, voice shaking. "But don't make me compete with it."`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'During marriage - recurring pattern',
      location: 'Barrett dining room',
      themes: JSON.stringify(['confrontation', 'work vs family', 'Elena\'s frustration']),
    },
    {
      title: 'The #1 Dad Mug',
      category: 'Flashback',
      description: 'Elena gives Jasper a Father\'s Day mug with hope.',
      content: `A kitchen years ago, Elena handing him a coffee mug that read #1 Dad. He'd laughed, hugged her, felt that rush of purpose.

Her first words: "I hope you're here for this."

His first thought: I need to work harder.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'Early parenthood',
      location: 'Barrett kitchen',
      themes: JSON.stringify(['fatherhood', 'misplaced priorities', 'Elena\'s hope']),
    },
    {
      title: 'Elena\'s Late-Night Question',
      category: 'Flashback',
      description: 'Elena asks if Jasper is sleeping during London crisis.',
      content: `Elena's voice on the phone the night before, low and careful so Grace wouldn't overhear: "You're not sleeping again, are you?"

He'd told her he was fine. He always told her he was fine.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Book 1 - During London crisis',
      location: 'Phone call',
      themes: JSON.stringify(['concern', 'denial', 'patterns']),
    },

    // JASPER & GRACE - FATHER-DAUGHTER
    {
      title: 'Grace\'s Spelling Words',
      category: 'Flashback',
      description: 'Grace\'s wisdom about team and promises unkept.',
      content: `A kitchen table at home, Grace bent over spelling words. She'd looked up at him, pencil between her teeth, and said, "You can't spell 'team' without 'me,' Daddy."

He'd smiled and promised to remember that. He hadn't.`,
      characters: JSON.stringify(['Jasper Barrett', 'Grace Barrett']),
      timeline: 'Pre-story',
      location: 'Barrett kitchen',
      themes: JSON.stringify(['childhood wisdom', 'broken promises', 'Grace\'s insight']),
    },
    {
      title: 'Grace\'s 7th Birthday - The Missed Cake',
      category: 'Flashback',
      description: 'Jasper misses Grace blowing out candles.',
      content: `The call had come during Grace's seventh birthday party.

He'd stepped away to take it, promising "five minutes."

He'd missed the cake entirely.

When he came back, Grace had frosting on her cheeks and no interest in showing him how she'd blown out the candles.

Elena had looked at him across the room like she'd just stopped believing in something.`,
      characters: JSON.stringify(['Jasper Barrett', 'Grace Barrett', 'Elena Barrett']),
      timeline: 'Grace age 7',
      location: 'Barrett home - birthday party',
      themes: JSON.stringify(['missed moments', 'birthday', 'Elena losing faith']),
    },
    {
      title: 'Grace\'s First Soccer Goal',
      category: 'Flashback',
      description: 'Jasper too tired to reply to Grace\'s achievement.',
      content: `In a boardroom in New York, he'd sat through a twelve-hour session negotiating a merger that would keep two thousand people employed.

That night, in the hotel, Elena had texted him a photo of Grace's first soccer goal. He'd been too tired to reply until morning.

By then, the moment was over.`,
      characters: JSON.stringify(['Jasper Barrett', 'Grace Barrett', 'Elena Barrett']),
      timeline: 'Pre-story',
      location: 'New York hotel / soccer field',
      themes: JSON.stringify(['achievement', 'too late', 'exhaustion']),
    },

    // JASPER - DELIVERY ROOM
    {
      title: 'Grace\'s Birth - Be Here Not There',
      category: 'Flashback',
      description: 'Elena\'s fierce demand during Grace\'s birth.',
      content: `Elena in the delivery room, her face slick with sweat, her hand crushing his with a strength he hadn't known she possessed. The machines beeping their urgent rhythms, the nurses moving with practiced efficiency.

Grace's first cry piercing through the chaos like a declaration of war.

Elena had turned to him, her eyes wild and fierce.

"Be here, not there."

He'd promised. He'd meant it with everything he had.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'Grace\'s birth',
      location: 'Hospital delivery room',
      themes: JSON.stringify(['birth', 'promise', 'Elena\'s demand']),
    },

    // JASPER - PROFESSIONAL
    {
      title: 'The Wildfire Photo',
      category: 'Flashback',
      description: 'The framed photo in Jasper\'s old office.',
      content: `In his old office on K Street, he'd kept a framed photograph on the wall behind his desk. A wildfire at night—bright orange flames against the black sky, captured from a helicopter during a crisis he'd helped navigate years ago.

Clients had commented on it sometimes. "Quite the image," they'd say, and Jasper would explain that it represented what they were all fighting—the chaos that could swallow companies, careers, entire industries if left unchecked.

He'd told himself the photo was a reminder of why his work mattered.

Now he wondered if his whole career had been about running into the fire.`,
      characters: JSON.stringify(['Jasper Barrett']),
      timeline: 'K Street office era',
      location: 'K Street office, Washington DC',
      themes: JSON.stringify(['self-reflection', 'running into fire', 'crisis addiction']),
    },
    {
      title: 'Florence Terrace - Italy Trip',
      category: 'Flashback',
      description: 'Jasper takes work call during Italian vacation.',
      content: `They were in Italy for a client summit, the first time they'd extended a work trip into something resembling a vacation. They'd been eating breakfast on a terrace in Florence when his phone rang with a "bad enough" call.

He'd taken it. She'd watched the city wake without him for three hours.

When he returned, she'd asked if he even remembered what the coffee had tasted like. He hadn't.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Italy trip - during marriage',
      location: 'Florence, Italy - terrace',
      themes: JSON.stringify(['work intrusion', 'ruined vacation', 'Elena alone']),
    },

    // ALEXANDRA - TEMPTATION
    {
      title: 'Alexandra - The Hotel Lobby',
      category: 'Flashback',
      description: 'Near-temptation moment with Alexandra in hotel lobby.',
      content: `A night two years back, after a tense contract negotiation that had dragged into the early morning hours. They'd ended up alone in a hotel lobby, the rain coming down hard outside.

She'd suggested one more drink—just to decompress. He'd agreed because saying no would have meant admitting there was something to say no to.

They'd sat in leather chairs by the fireplace. She'd leaned in when she laughed, close enough that he could smell her perfume. Her hand had brushed his arm—slow, deliberate—and stayed there a beat too long.

He'd told himself it was nothing. He'd walked away.

But his pulse had been pounding the whole ride home.`,
      characters: JSON.stringify(['Jasper Barrett', 'Alexandra Pierce']),
      timeline: '2 years before Book 1',
      location: 'Hotel lobby',
      themes: JSON.stringify(['temptation', 'near-miss', 'attraction']),
    },
    {
      title: 'Alexandra - The Gala Photo',
      category: 'Flashback',
      description: 'Alexandra sends old gala photo to remind Jasper.',
      content: `A gala years ago, before the distance between him and Elena had grown. Alexandra in a black dress, champagne in hand, her head tilted toward him as if they were sharing a secret the rest of the room couldn't hear.

She'd texted it two months ago with: "Remember how we used to win together?"`,
      characters: JSON.stringify(['Jasper Barrett', 'Alexandra Pierce']),
      timeline: 'Years ago / recent text',
      location: 'Gala venue',
      themes: JSON.stringify(['temptation', 'nostalgia weaponized', 'Alexandra\'s play']),
    },

    // PRESCOTT GRAND - JESSICA DISCOVERS JASPER
    {
      title: 'Prescott Grand Hotel - Jessica Discovers Jasper',
      category: 'Flashback',
      description: 'Origin story: Jessica sees Jasper\'s genius at the Prescott Grand.',
      content: `Eight years ago. The Prescott Grand Hotel renovation. Uptown Charlotte.

The project was bleeding money at a rate that made investors physically ill. Three months behind schedule. HVAC installs done out of order so ductwork conflicted with electrical. Italian marble fixtures stuck in customs. Millwork team had walked off over a pay dispute. The concrete pour on the third floor was curing wrong. And the HVAC subcontractor? Missing.

Jessica had been brought in to assess whether the project could be saved or if it was time to cut losses. She'd expected to find chaos. She found something else entirely.

In the middle of the construction trailer—papers everywhere, coffee cups stacked three deep, a whiteboard covered in colored markers and arrows—sat a young man who wasn't supposed to be running anything. Jasper Barrett. Officially, he was support staff. Unofficially, he was holding the entire project together with duct tape and force of will.

"You're not just putting out fires," Jessica told him. "You're redesigning the building while it's burning down."

Three months later, the Prescott Grand opened on schedule. Under budget.`,
      characters: JSON.stringify(['Jessica Vaughn', 'Jasper Barrett']),
      timeline: '8 years before Book 1',
      location: 'Prescott Grand Hotel, Uptown Charlotte',
      themes: JSON.stringify(['origin story', 'mentor discovery', 'raw talent']),
    },

    // MASON - DUKE DAYS
    {
      title: 'Mason and Jasper - Dive Bar Duke Days',
      category: 'Flashback',
      description: 'College friendship moment at Duke.',
      content: `A dive bar near Duke, sticky tables and neon beer signs. They were juniors. Jasper had just tanked an interview because he'd been honest about what he thought of the company's strategy.

"You're an idiot," Mason had said, sliding a fresh beer across the table. "But at least you're an honest idiot."`,
      characters: JSON.stringify(['Jasper Barrett', 'Mason Reilly']),
      timeline: 'Duke University - junior year',
      location: 'Dive bar near Duke',
      themes: JSON.stringify(['friendship', 'honesty', 'college days']),
    },

    // COLE - MILITARY BACKGROUND
    {
      title: 'Cole\'s Creed',
      category: 'Flashback',
      description: 'Cole reflects on his operational philosophy.',
      content: `Cole had a creed he'd developed over years of operations: Get in. Get out. Get home. Everything else was noise.

The getting home part was new. Before Hawk, before BSS, before the life he'd built with the team, "home" had been a concept more than a place. A barracks. A safe house. Whatever four walls happened to be available.`,
      characters: JSON.stringify(['Cole']),
      timeline: 'Cole\'s past - military days',
      location: 'Various operational locations',
      themes: JSON.stringify(['military', 'finding home', 'transformation']),
    },

    // HARPER MEETS ELENA
    {
      title: 'Harper First Meets Elena - DC Bar',
      category: 'Flashback',
      description: 'Harper\'s perspective on first meeting Elena.',
      content: `It had been in D.C., right after a brutal fourteen-day crisis cycle. The kind of stretch that left you hollow and wired at the same time, where sleep felt like a foreign concept and the boundary between work and everything else dissolved completely.

Harper had finally dragged Jasper out of the office, insisting that they celebrate closing the deal even if neither of them could remember what day it was.

Elena had walked in like she owned the room. Not arrogant—confident. She'd spotted Jasper across the bar, and something in her expression shifted.`,
      characters: JSON.stringify(['Harper Caldwell', 'Elena Barrett', 'Jasper Barrett']),
      timeline: 'Before Jasper and Elena married',
      location: 'DC bar',
      themes: JSON.stringify(['first impressions', 'Elena\'s presence', 'Harper observing']),
    },

    // SINGAPORE HOTEL - FORTUNE 500 CALL
    {
      title: 'Singapore Hotel - 3 AM Board Call',
      category: 'Flashback',
      description: 'Jasper on a video call while Elena texts Grace\'s achievement.',
      content: `It was a hotel room in Singapore, 3 a.m. Jasper on a video call with a Fortune 500 board while Elena texted him a picture of Grace's science fair ribbon.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'During marriage - Singapore trip',
      location: 'Singapore hotel room',
      themes: JSON.stringify(['missed moments', 'work vs family', 'time zones']),
    },
  ];

  let flashbacksCreated = 0;
  let flashbacksUpdated = 0;

  for (const fb of allFlashbacks) {
    const existing = await prisma.storyline.findFirst({
      where: { title: fb.title, projectId: project.id }
    });

    if (existing) {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: fb
      });
      flashbacksUpdated++;
    } else {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          ...fb,
          tags: JSON.stringify(['flashback', 'book1', 'terminal-list-style']),
        }
      });
      flashbacksCreated++;
    }
  }

  console.log(`Flashbacks - Created: ${flashbacksCreated}, Updated: ${flashbacksUpdated}`);

  // ========================================
  // PART 2: BUSINESS TRIPS
  // ========================================
  console.log("\n--- Adding Business Trips ---\n");

  const businessTrips = [
    {
      name: 'London Data Breach Response',
      traveler: 'Jasper Barrett',
      destination: 'London, UK',
      origin: 'Charlotte, NC',
      purpose: 'Crisis response - corporate data breach',
      duration: '~24 hours',
      timeframe: 'Book 1 Opening',
      crisisName: 'London Data Breach',
      companions: JSON.stringify([]),
      storyEvents: 'Jasper leaves at 2:17 AM. Assembles crisis team. Flies to London. Operates from glass-walled conference room. Contains breach. Drafts CEO statement.',
      homeImpact: 'Left Elena and Grace abruptly. Grace didn\'t get to say goodbye.',
      outcome: 'Breach contained. Jasper returns home briefly before Hong Kong call.',
      bookAppearance: 'Book 1, Chapters 1-2',
      tripOrder: 1,
    },
    {
      name: 'Hong Kong Assignment (Interrupted)',
      traveler: 'Jasper Barrett',
      destination: 'Hong Kong',
      origin: 'Charlotte, NC',
      purpose: 'Corporate crisis - accelerated timeline',
      duration: 'Planned multi-day - never happened',
      timeframe: 'Book 1 - After London',
      crisisName: 'Hong Kong Assignment',
      companions: JSON.stringify([]),
      storyEvents: 'Email arrives: NEW SCOPE/ACCELERATED TIMELINE. Jasper was about to leave when Elena collapsed.',
      homeImpact: 'Elena\'s hospitalization forces Jasper to decline. First time he chooses family over work.',
      outcome: 'Trip abandoned. Turning point in Jasper\'s arc.',
      bookAppearance: 'Book 1, Chapter 3',
      tripOrder: 2,
    },
    {
      name: 'Chicago Contamination Response',
      traveler: 'Jasper Barrett',
      destination: 'Chicago, IL',
      origin: 'Charlotte, NC (assumed)',
      purpose: 'Contamination crisis management',
      duration: 'Unknown - at least overnight',
      timeframe: 'Pre-Book 1 (referenced)',
      crisisName: 'Chicago Contamination Case',
      companions: JSON.stringify([]),
      storyEvents: 'Jasper executes flawlessly on the crisis.',
      homeImpact: 'Missed Grace\'s school recital - the one Elena said was important.',
      outcome: 'Crisis resolved but marked beginning of Jasper questioning work-life balance.',
      bookAppearance: 'Book 1 - Flashback reference',
      tripOrder: 0,
    },
    {
      name: 'Africa Coup Intervention',
      traveler: 'Cole, Dean, Harper Caldwell',
      destination: 'Africa (Lagos hub)',
      origin: 'Various',
      purpose: 'Political crisis - coup intervention, Western partner extraction',
      duration: '3+ weeks in the field',
      timeframe: 'Book 1 - During Elena\'s recovery',
      crisisName: 'Africa Coup Intervention',
      companions: JSON.stringify(['Cole', 'Dean', 'Harper Caldwell']),
      storyEvents: 'Encrypted comms, back-channel negotiations. Harper navigates delicate politics in Lagos. Cole and Dean in field operations.',
      homeImpact: 'Team away for weeks. Harper coordinates from Lagos.',
      outcome: 'Interim government in place. Coup leaders out. American interests secure. Team returns for Elena\'s party.',
      bookAppearance: 'Book 1 - Major thread',
      tripOrder: 3,
    },
    {
      name: 'Singapore Security Breach Response',
      traveler: 'Harper Caldwell',
      destination: 'Singapore',
      origin: 'Charlotte, NC',
      purpose: 'Security breach investigation, political damage control',
      duration: 'Multi-day',
      timeframe: 'Book 1 - During Elena\'s hospital stay',
      crisisName: 'Singapore Security Breach',
      companions: JSON.stringify([]),
      storyEvents: 'Leak traced to mid-tier analyst. Politicians making noise. Addison calls from secure line with option to flip before close.',
      homeImpact: 'Harper away during critical time.',
      outcome: 'Contained. Sets up Book 2 thread.',
      bookAppearance: 'Book 1, referenced',
      tripOrder: 4,
    },
    {
      name: 'Florence Client Summit',
      traveler: 'Jasper Barrett, Elena Barrett',
      destination: 'Florence, Italy',
      origin: 'Unknown',
      purpose: 'Client summit extended into vacation attempt',
      duration: 'Multi-day',
      timeframe: 'Pre-Book 1 (flashback)',
      crisisName: null,
      companions: JSON.stringify(['Elena Barrett']),
      storyEvents: 'Jasper takes 3-hour work call during breakfast on terrace. Elena watches the city wake without him.',
      homeImpact: 'Ruined vacation moment. Elena asks if he remembers what the coffee tasted like. He doesn\'t.',
      outcome: 'Another pattern of work intrusion on personal time.',
      bookAppearance: 'Book 1 - Flashback',
      tripOrder: -1,
    },
    {
      name: 'Bangkok Deal Collapse',
      traveler: 'Harper Caldwell',
      destination: 'Bangkok, Thailand',
      origin: 'Charlotte or Singapore',
      purpose: 'Regulatory approval for deal',
      duration: 'Multi-day',
      timeframe: 'Book 1 - Concurrent with Elena\'s recovery',
      crisisName: 'Asia Operations',
      companions: JSON.stringify([]),
      storyEvents: 'Regulatory approval held up. Partners threatening to walk. Deal hangs by a thread.',
      homeImpact: 'Harper stretched thin managing multiple Asian operations.',
      outcome: 'Deal implodes. Referenced as disaster.',
      bookAppearance: 'Book 1, Chapter 13',
      tripOrder: 5,
    },
    {
      name: 'New York Merger Negotiation',
      traveler: 'Jasper Barrett',
      destination: 'New York City',
      origin: 'Charlotte, NC',
      purpose: '12-hour merger negotiation to save 2,000 jobs',
      duration: 'Overnight',
      timeframe: 'Pre-Book 1 (flashback)',
      crisisName: null,
      companions: JSON.stringify([]),
      storyEvents: 'Jasper negotiates all day. Elena texts photo of Grace\'s first soccer goal. He\'s too tired to reply until morning.',
      homeImpact: 'By morning, the moment was over.',
      outcome: 'Work success, family disconnect.',
      bookAppearance: 'Book 1 - Flashback',
      tripOrder: -2,
    },
  ];

  let tripsCreated = 0;
  let tripsUpdated = 0;

  for (const trip of businessTrips) {
    const existing = await prisma.businessTrip.findFirst({
      where: { name: trip.name, projectId: project.id }
    });

    if (existing) {
      await prisma.businessTrip.update({
        where: { id: existing.id },
        data: trip
      });
      tripsUpdated++;
    } else {
      await prisma.businessTrip.create({
        data: {
          projectId: project.id,
          ...trip,
          tags: JSON.stringify(['book1']),
        }
      });
      tripsCreated++;
    }
  }

  console.log(`Business Trips - Created: ${tripsCreated}, Updated: ${tripsUpdated}`);

  // ========================================
  // PART 3: ADDITIONAL CRISES/CONFLICTS
  // ========================================
  console.log("\n--- Adding Additional Crises ---\n");

  const additionalCrises = [
    {
      name: 'Elena\'s Medical Crisis',
      codeName: 'HOME FRONT',
      clientName: 'Personal - Barrett Family',
      clientType: 'Personal/Family',
      crisisType: 'Medical Emergency',
      severity: 'critical',
      location: 'Charlotte, NC',
      timeframe: 'Book 1 - Central event',
      description: 'Elena collapses at home. Hospitalized with serious condition requiring surgery and recovery.',
      situation: 'Elena found collapsed at home. Rushed to hospital. Grace and Sara there.',
      complications: 'Jasper was about to leave for Hong Kong. Grace traumatized. Recovery will take weeks.',
      resolution: 'Elena survives surgery and begins recovery. Jasper cancels Hong Kong.',
      outcome: 'Catalyst for Jasper\'s transformation. He chooses family over work for the first time.',
      bssTeam: JSON.stringify(['Addison Price (managing BSS)', 'Harper Caldwell (from afar)']),
      stakes: 'Elena\'s life, Barrett family, Jasper\'s priorities',
      bookAppearance: 'Book 1 - Central arc',
      status: 'resolved',
    },
    {
      name: 'Startup Salmonella Crisis',
      codeName: 'MEAL KIT',
      clientName: 'Meal-kit startup (unnamed)',
      clientType: 'Startup',
      crisisType: 'Food Safety/Contamination',
      severity: 'medium',
      location: 'Midwest (remote)',
      timeframe: 'Pre-Book 1 - First apartment era',
      description: 'Meal-kit company shipped salmonella-tainted chicken to 3,000 customers.',
      situation: 'Startup shipped contaminated food. Required crisis management.',
      complications: 'Paid almost nothing, but hours were reasonable.',
      resolution: 'Contained. No next crisis waiting.',
      outcome: 'Rare period when Jasper came home at 6 PM every night. He and Elena ate dinner together.',
      lessonsLearned: 'This was when being home felt natural - shows what was lost.',
      bssTeam: JSON.stringify(['Jasper Barrett']),
      stakes: 'Startup reputation, customer health',
      bookAppearance: 'Book 1, Chapter 10 - Flashback',
      status: 'resolved',
    },
    {
      name: 'Airline Global Systems Outage',
      codeName: 'GROUNDED',
      clientName: 'Global Airline Brand',
      clientType: 'Fortune 500',
      crisisType: 'Technical/Operational',
      severity: 'critical',
      location: 'National - multiple hubs',
      timeframe: 'Book 1 - During Elena\'s recovery',
      description: 'Systems outage rolling across hubs on two continents. Flights grounded.',
      situation: 'Passengers furious. Regulators sharpening knives. CEO wants Jasper personally. Blank check offered.',
      complications: 'Could be handled remote in 2 days with no flights or midnight rooms.',
      resolution: 'Jasper takes it as a test - can he do this differently?',
      outcome: 'Handled remotely while staying with Elena.',
      bssTeam: JSON.stringify(['Jasper Barrett', 'Addison Price']),
      stakes: 'Airline reputation, passenger trust, regulatory compliance',
      bookAppearance: 'Book 1, Chapter 8',
      status: 'resolved',
    },
  ];

  let crisesCreated = 0;
  let crisesUpdated = 0;

  for (const crisis of additionalCrises) {
    const existing = await prisma.crisis.findFirst({
      where: { name: crisis.name, projectId: project.id }
    });

    if (existing) {
      await prisma.crisis.update({
        where: { id: existing.id },
        data: crisis
      });
      crisesUpdated++;
    } else {
      await prisma.crisis.create({
        data: {
          projectId: project.id,
          ...crisis,
        }
      });
      crisesCreated++;
    }
  }

  console.log(`Additional Crises - Created: ${crisesCreated}, Updated: ${crisesUpdated}`);

  // ========================================
  // SUMMARY
  // ========================================
  console.log("\n=== IMPORT SUMMARY ===\n");

  const totalFlashbacks = await prisma.storyline.count({ where: { category: 'Flashback' } });
  const totalTrips = await prisma.businessTrip.count();
  const totalCrises = await prisma.crisis.count();

  console.log(`Total Flashbacks in database: ${totalFlashbacks}`);
  console.log(`Total Business Trips in database: ${totalTrips}`);
  console.log(`Total Crises in database: ${totalCrises}`);

  await prisma.$disconnect();
}

main().catch(console.error);
