import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING WHIRLWIND TRIPS ===\n");

  const trips = [
    // US WHIRLWIND TOUR
    {
      name: 'US Whirlwind Tour - Coast to Coast',
      traveler: 'Jasper Barrett',
      destination: 'Multiple US Cities',
      origin: 'Charlotte, NC',
      purpose: 'Major client meetings and crisis prevention across the country',
      duration: '10 days',
      timeframe: 'Book 2 - Chapter 8-12',
      companions: JSON.stringify(['Hawk', 'Harper Vance', 'Cole Harrington']),
      storyEvents: `DAY 1-2: NEW YORK CITY
- Wall Street client facing hostile takeover
- Emergency board meeting intervention
- Late night strategy session at private club
- Hawk handles security threat from opposing faction

DAY 3: WASHINGTON DC
- Senator requires discrete assistance
- Meeting in secure government facility
- Lunch with influential lobbyist
- Information exchange with intelligence contacts

DAY 4-5: CHICAGO
- Fortune 500 CEO scandal containment
- Press conference coordination
- Family protection detail
- Harper flies in for media strategy

DAY 6: DALLAS
- Oil magnate crisis
- Property dispute with dangerous elements
- Cole runs point on security
- Late night negotiation

DAY 7-8: LOS ANGELES
- Entertainment industry client
- Studio lot meetings
- Sirens intelligence briefing (Selene connection)
- Hollywood party for networking

DAY 9: SAN FRANCISCO
- Tech billionaire situation
- Silicon Valley discretion required
- Cyber threat neutralized
- Video call with Elena (she misses him)

DAY 10: RETURN
- Red-eye back to Charlotte
- Exhausted but successful
- Elena waiting at home
- Jasper realizes the cost of being everywhere`,
      homeImpact: `Elena handles everything alone for 10 days:
- Children's school events
- Wives Club meetings
- Her own Maison Aurelia commitments
- Growing resentment builds

When Jasper returns:
- Tense reunion
- Elena expresses frustration
- Jasper promises to do better
- A conversation about priorities begins`,
      outcome: 'All clients satisfied, but marriage strained. Jasper begins questioning the pace.',
      bookAppearance: 'Five Feet From Home: Book 2',
      tripOrder: 20
    },
    {
      name: 'US Whirlwind Tour - Southern Circuit',
      traveler: 'Jasper Barrett',
      destination: 'Southern US Cities',
      origin: 'Charlotte, NC',
      purpose: 'Relationship maintenance with key Southern clients and political connections',
      duration: '5 days',
      timeframe: 'Book 1 - Chapter 15',
      companions: JSON.stringify(['Daniel Cruz', 'Ridge Callahan']),
      storyEvents: `DAY 1: ATLANTA
- Meeting with Georgia political figure
- Private dinner at capital club
- Ridge provides security assessment
- Late night flight to next city

DAY 2: MIAMI
- Harper's territory tour
- Miami Lab operations review
- Beach club meeting with Latin American contact
- Selene intelligence briefing

DAY 3: NEW ORLEANS
- Oil industry client dinner
- Jazz club private event
- Discrete conversation about Gulf Coast situation
- Daniel Cruz handles fixer work

DAY 4: HOUSTON
- Energy sector crisis prevention
- Board room negotiations
- Texas hospitality (long dinner)
- Call home to Elena

DAY 5: NASHVILLE
- Entertainment industry client
- Country music connections
- Quick meeting, then home
- Arrives Charlotte by midnight`,
      homeImpact: `Elena manages without complaint this time
- She's learned to prepare
- Wives Club support network activates
- She realizes she needs her own mission`,
      outcome: 'Successful relationship maintenance. Jasper gets better at checking in.',
      bookAppearance: 'Five Feet From Home: Book 1',
      tripOrder: 15
    },
    // WORLD TOUR
    {
      name: 'World Tour - European Circuit',
      traveler: 'Jasper Barrett',
      destination: 'Multiple European Cities',
      origin: 'Charlotte, NC',
      purpose: 'International client relations, EOHSJ business, and crisis response',
      duration: '14 days',
      timeframe: 'Book 3 - Chapter 1-5',
      companions: JSON.stringify(['Harper Vance', 'Hawk', 'Elena Barrett (partial)']),
      storyEvents: `DAY 1-2: LONDON
- BSS London Office meetings
- Royal connection cultivated
- Private dinner with aristocratic clients
- Hawk checks on UK operators

DAY 3-4: PARIS
- French industrial client
- Luxury hotel crisis (discrete)
- Elena joins for romantic dinner
- Shopping at Elena's insistence

DAY 5: GENEVA
- Swiss banking relationships
- Discrete financial matters
- Lunch overlooking the lake
- Elena returns to Charlotte

DAY 6-7: ROME
- Vatican connections maintained
- EOHSJ leadership meetings
- Private papal audience
- Cardinal's dinner

DAY 8: MADRID
- Spanish business expansion
- Madrid society event
- Flamenco evening (Harper's idea)
- New client secured

DAY 9-10: BERLIN
- German industrial client
- Cold War-era contacts still valuable
- Discrete government meeting
- Crisis averted

DAY 11-12: DUBAI
- Middle East relationships
- Luxury and opulence
- Sheikh's private gathering
- Hawk uncomfortable but performs

DAY 13-14: RETURN VIA LONDON
- Final meetings
- Exhaustion sets in
- Long flight home
- Jasper sleeps 14 hours upon return`,
      homeImpact: `Elena joined for Paris portion:
- Their time together was meaningful
- She saw his world up close
- Understanding grew, but so did concern

When apart:
- Daily calls (when possible)
- Elena runs everything perfectly
- She realizes she could do this alone if needed
- That thought troubles her`,
      outcome: 'International relationships strengthened. Marriage tested but survived. Jasper comes home different.',
      bookAppearance: 'Five Feet From Home: Book 3',
      tripOrder: 30
    },
    {
      name: 'World Tour - Asia Pacific',
      traveler: 'Jasper Barrett',
      destination: 'Asia Pacific Region',
      origin: 'Charlotte, NC',
      purpose: 'Expansion into Asian markets, client relationships',
      duration: '12 days',
      timeframe: 'Book 4 - Chapter 7-9',
      companions: JSON.stringify(['Cole Harrington', 'Ghost Grid Team (remote)']),
      storyEvents: `DAY 1-2: TOKYO
- Japanese corporate client
- Formal business dinners
- Jet lag battles
- Cultural navigation

DAY 3-4: HONG KONG
- Financial sector crisis
- Fast-paced city energy
- Cole proves invaluable
- Late night dim sum meetings

DAY 5-6: SINGAPORE
- Southeast Asia hub establishment
- Government connections
- Potential Lab location scouted
- First vacation day (walks the city)

DAY 7-8: SYDNEY
- Australian mining client
- Outback security situation
- Unique challenges
- Operator network established

DAY 9-10: SEOUL
- Korean tech crisis
- Language barriers overcome
- K-pop industry connection (unexpected)
- Understanding new markets

DAY 11-12: RETURN
- Longest flight home
- Reflection time
- Writes letter to Elena mid-flight
- Arrives home with perspective`,
      homeImpact: `This is the longest Jasper has been away:
- Elena feels the distance
- Children ask when Daddy comes home
- Wives Club rallies around her
- She starts planning her own initiatives

The letter Jasper writes:
- Most honest he's ever been
- Questions if this is sustainable
- Promises change is coming`,
      outcome: 'Asian expansion successful. Jasper returns questioning everything about the pace of his life.',
      bookAppearance: 'Five Feet From Home: Book 4',
      tripOrder: 40
    },
    {
      name: 'Emergency World Tour - Crisis Response',
      traveler: 'Jasper Barrett',
      destination: 'Multiple Crisis Locations',
      origin: 'Charlotte, NC',
      purpose: 'Multiple simultaneous crises requiring personal intervention',
      duration: '8 days',
      timeframe: 'Book 2 - Climax',
      companions: JSON.stringify(['Full BSS Senior Team']),
      storyEvents: `THE CRISIS CASCADE:
Everything breaks at once.

DAY 1: LONDON
- Major client data breach
- Government involvement
- BSS reputation on the line
- Jasper flies immediately

DAY 2: FRANKFURT
- Connected crisis emerges
- Same threat actor
- Banks affected
- Ghost Grid working overtime

DAY 3: DUBAI
- The source is traced here
- Hawk leads ground team
- Dangerous extraction
- Jasper directs from war room

DAY 4: SINGAPORE
- Asian markets affected
- Damage control
- Press management
- No sleep for anyone

DAY 5-6: RETURN TO LONDON
- Resolution phase
- Client meetings
- Government briefings
- Victory, but at what cost

DAY 7-8: RETURN
- Debriefing on the plane
- Team exhausted
- Jasper makes a decision
- He needs to restructure everything`,
      homeImpact: `Elena's perspective shift:
- She sees the news, knows he's involved
- Fear she's never felt before
- The Wives Club becomes her support
- She writes in her journal

When he returns:
- She doesn't yell
- She holds him
- They both cry
- A turning point`,
      outcome: 'Crisis resolved but at great personal cost. Jasper begins restructuring BSS leadership.',
      bookAppearance: 'Five Feet From Home: Book 2 Climax',
      tripOrder: 25
    },
    {
      name: 'Elena\'s World Tour - Charity Circuit',
      traveler: 'Elena Barrett',
      destination: 'European Cities',
      origin: 'Charlotte, NC',
      purpose: 'Elena leads international charitable initiatives',
      duration: '10 days',
      timeframe: 'Book 3 - Chapter 10-12',
      companions: JSON.stringify(['Addie', 'Kendra Donnelly', 'Wives Club delegation']),
      storyEvents: `ELENA TAKES THE LEAD:
For the first time, Elena travels on her own mission.

DAY 1-2: LONDON
- Meeting with British charities
- Duchess connection activated
- High tea at private club
- Elena proves herself

DAY 3-4: PARIS
- French charitable society
- Fashion week adjacent events
- Networking at highest level
- Addie provides strategic advice

DAY 5-6: ROME
- Vatican charitable arm
- Her own papal connection established
- EOHSJ women's initiatives
- Dinner with Cardinals (her own)

DAY 7-8: VIENNA
- Opera house charity gala
- European society embrace
- Elena shines independently
- Kendra documents everything

DAY 9-10: RETURN
- Triumphant homecoming
- New initiatives planned
- Elena has found her power
- Jasper is proud`,
      homeImpact: `Role reversal:
- Jasper stays home with children
- He handles school runs
- He misses important calls for recitals
- He understands Elena's sacrifice

What he learns:
- Running the house is hard
- The children need him
- Elena does more than he knew`,
      outcome: 'Elena establishes independent charitable power. Marriage rebalanced. New respect.',
      bookAppearance: 'Five Feet From Home: Book 3',
      tripOrder: 35
    }
  ];

  for (const trip of trips) {
    const existing = await prisma.businessTrip.findFirst({
      where: { name: trip.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.businessTrip.create({
        data: { projectId: project.id, ...trip }
      });
      console.log(`Created: ${trip.name}`);
    } else {
      await prisma.businessTrip.update({
        where: { id: existing.id },
        data: trip
      });
      console.log(`Updated: ${trip.name}`);
    }
  }

  // Count trips
  const tripCount = await prisma.businessTrip.count();
  console.log(`\nTotal Business Trips: ${tripCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
