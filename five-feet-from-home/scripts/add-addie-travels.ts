import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // List current trips
  const existingTrips = await prisma.businessTrip.findMany({
    where: { projectId: project.id }
  });
  console.log(`\n=== EXISTING TRIPS (${existingTrips.length}) ===`);
  for (const t of existingTrips) {
    console.log(`  ${t.tripOrder || '?'}: ${t.name} - ${t.traveler}`);
  }

  console.log("\n=== ADDING ADDIE'S CRAZY TRAVELS ===\n");

  const addieTrips = [
    {
      name: "Addie's Vegas Rescue Mission",
      traveler: 'Addie',
      destination: 'Las Vegas, NV',
      origin: 'Charlotte, NC',
      purpose: 'Extract a Wives Club member from a dangerous situation with a predatory ex',
      duration: '3 days',
      timeframe: 'Book 2 - Chapter 3',
      companions: JSON.stringify(['Elena Barrett', 'Two BSS operators (discrete)']),
      storyEvents: `THE CALL:
A Wives Club member's daughter is trapped in Vegas with an abusive boyfriend who's connected to dangerous people.

DAY 1 - ARRIVAL:
- Private jet, no questions asked
- Addie checks into a different hotel than the target location
- Surveillance begins
- Elena handles family communications from Charlotte

DAY 1 - NIGHT:
- Addie infiltrates a high-roller party where the boyfriend is gambling
- She's dressed to kill, playing a role
- Gathers intel on his schedule
- Almost gets made, but talks her way out

DAY 2 - THE EXTRACTION:
- BSS operators create a distraction (staged fight at casino)
- Addie gets the girl out through service entrance
- The boyfriend realizes too late
- Car chase through Vegas strip (Addie drives, terrifyingly well)
- Safe house outside city

DAY 2 - NIGHT:
- The boyfriend sends people looking
- Addie and the girl lay low
- Heart-to-heart conversation about survival
- Addie shares just enough of her own past

DAY 3 - EXIT:
- Early morning departure
- Private jet to Charlotte
- Girl reunited with mother
- Addie disappears before thanks can be given`,
      homeImpact: `Hawk doesn't know details but knows something is happening:
- He trusts Addie completely
- He has operators on standby if she calls
- She comes home exhausted but victorious
- They don't discuss it, but he knows

The Wives Club:
- The rescued girl becomes fiercely loyal to Addie
- This story spreads quietly
- Addie's reputation grows`,
      outcome: 'Girl saved. Boyfriend dealt with (legally, eventually). Another soul added to Addie\'s network of the protected.',
      bookAppearance: 'Vegas for Addie storyline',
      tripOrder: 50
    },
    {
      name: "Addie's Monaco Chaos",
      traveler: 'Addie',
      destination: 'Monaco / French Riviera',
      origin: 'Charlotte, NC',
      purpose: 'High society infiltration to gather intel on a European threat to BSS client',
      duration: '5 days',
      timeframe: 'Book 3 - Chapter 7',
      companions: JSON.stringify(['Harper Vance', 'Selene Thorne (undercover)']),
      storyEvents: `THE MISSION:
A European aristocrat is threatening a major BSS client. Addie is sent to gather leverage.

DAY 1 - ARRIVAL IN NICE:
- First class, playing wealthy American widow
- Harper coordinates from yacht in harbor
- Selene already embedded at target's favorite club
- Wardrobe: Chanel, Dior, nothing but the best

DAY 2 - THE PARTY CIRCUIT:
- Lunch at Hotel du Cap-Eden-Roc
- Tennis at Monte-Carlo Country Club (Addie plays well)
- Cocktails where the target's wife will be
- Addie befriends the wife effortlessly

DAY 3 - CASINO NIGHT:
- Monte Carlo Casino, high stakes table
- Addie plays baccarat, wins big (she's good)
- Target notices her, approaches
- She plays hard to get perfectly
- Selene provides backup intelligence

DAY 4 - THE YACHT:
- Invited to target's yacht party
- Addie plants listening devices
- Nearly caught by security
- Escapes by jumping overboard (evening gown and all)
- Harper's boat picks her up
- They laugh about it over champagne

DAY 5 - THE EXIT:
- Intel secured
- Target has no idea
- Addie flies home via Paris (shopping stop)
- Mission accomplished`,
      homeImpact: `Hawk tracks her location via secure app:
- He sees she's moving around
- He knows she can handle herself
- Still loses sleep

When she returns:
- She brings him a watch from Monaco
- She smells like the sea
- He doesn't ask, she doesn't tell
- They're closer for it`,
      outcome: 'Intel gathered destroys the threat legally. Client protected. Addie adds European connections.',
      bookAppearance: 'The Royal Phoenix: Book 2',
      tripOrder: 55
    },
    {
      name: "Addie's Dubai Deception",
      traveler: 'Addie',
      destination: 'Dubai, UAE',
      origin: 'Charlotte, NC',
      purpose: 'Rescue operation for kidnapped American businessman, wife is Wives Club connected',
      duration: '6 days',
      timeframe: 'Book 3 - Chapter 12',
      companions: JSON.stringify(['Hawk (for first time)', 'Cole Harrington', 'Ghost Grid support']),
      storyEvents: `THE CRISIS:
American businessman kidnapped in Dubai. His wife is a Wives Club member. Official channels are failing.

DAY 1 - MOBILIZATION:
- Addie gets the call at 3 AM
- Hawk insists on going this time
- They're on a jet within hours
- Cole meets them in Dubai

DAY 2 - RECONNAISSANCE:
- Hawk leads tactical assessment
- Addie works social connections
- She's been to Dubai before (she doesn't say when)
- Old contacts surface, some uncomfortable

DAY 3 - THE PARTY:
- Addie attends a Sheikh's gathering
- She's there as a "consultant" to American interests
- Finds the connection to the kidnappers
- A man from her past appears (cam star days connection)
- Tense moment, but he's now legitimate and helps

DAY 4 - THE LOCATION:
- Kidnappers found in industrial area
- Hawk plans the extraction
- Addie provides internal intel
- They move at night

DAY 4 - NIGHT - THE RESCUE:
- Cole and operators breach
- Hawk provides overwatch
- Addie handles the victim (he's traumatized)
- Firefight, brief but intense
- Everyone gets out

DAY 5 - AFTERMATH:
- Victim stabilized
- Quiet departure arranged
- Addie and Hawk's first operation together
- He sees her in action, truly
- Respect deepens

DAY 6 - RETURN:
- Long flight home
- They talk, really talk
- Hawk asks about the man from her past
- She tells him everything
- He loves her more for it`,
      homeImpact: `This trip changes their relationship:
- They've now worked together in the field
- Hawk understands Addie's world fully
- She's not just the Patroness; she's an operator
- They're true partners now

The Wives Club:
- Husband returned safely
- Wife's gratitude is permanent
- Story becomes legend (never told publicly)`,
      outcome: 'Businessman rescued. Marriage saved. Addie and Hawk forge new bond. Her past fully integrated with present.',
      bookAppearance: 'The Royal Phoenix: Book 3',
      tripOrder: 60
    },
    {
      name: "Addie's London Reckoning",
      traveler: 'Addie',
      destination: 'London, UK',
      origin: 'Charlotte, NC',
      purpose: 'Someone from her cam star days is threatening to expose her past to Charlotte society',
      duration: '4 days',
      timeframe: 'Book 4 - Chapter 5',
      companions: JSON.stringify(['Jasper Barrett']),
      storyEvents: `THE THREAT:
An anonymous message arrives. Someone knows about Addie's past. They want money or they'll tell everyone.

DAY 1 - THE DECISION:
- Addie shows Jasper the message
- He doesn't hesitate: "We handle this together"
- They fly to London (the trail leads there)
- Addie is scared for the first time in years

DAY 2 - THE HUNT:
- Ghost Grid traces the message
- It leads to a former "manager" from her LA days
- He's fallen on hard times, desperate
- Addie remembers him: he wasn't the worst, but he wasn't good

DAY 3 - THE CONFRONTATION:
- They find him in a shabby flat in East London
- Jasper stays back, lets Addie lead
- She confronts him: calm, cold, powerful
- He breaks down, apologizes
- She offers him money, not as payment but as mercy
- A chance to disappear, start over

DAY 3 - NIGHT:
- Addie and Jasper have dinner at The Ritz
- She tells him everything about that time
- He listens without judgment
- "You survived. That's what matters."
- She cries for the first time in years

DAY 4 - RESOLUTION:
- The man takes the offer, disappears
- All evidence of her past secured
- Flight home
- Addie is lighter somehow
- Jasper has never respected anyone more`,
      homeImpact: `The secret is contained:
- Only Jasper, Hawk, and now this man know
- Hawk asks no questions when she returns
- She tells him anyway
- Their love is unshakeable

For Addie:
- The past no longer has power over her
- She owns her story completely
- She's free`,
      outcome: 'Threat neutralized. Past integrated. Addie emerges stronger. Jasper becomes true family.',
      bookAppearance: 'The Royal Phoenix: Book 4',
      tripOrder: 65
    },
    {
      name: "Addie's Rome Pilgrimage",
      traveler: 'Addie',
      destination: 'Rome / Vatican City',
      origin: 'Charlotte, NC',
      purpose: 'Private spiritual journey after years of living in moral gray areas',
      duration: '7 days',
      timeframe: 'Book 4 - Chapter 15',
      companions: JSON.stringify(['Alone (first time)']),
      storyEvents: `THE JOURNEY:
Addie goes to Rome alone. She needs to reckon with her faith after everything she's done.

DAY 1 - ARRIVAL:
- No handlers, no security (BSS shadows, but she doesn't know)
- Small hotel near the Pantheon
- Walks the streets alone
- Lights a candle at a small church

DAY 2 - THE VATICAN:
- Private tour arranged through EOHSJ
- She sees the Sistine Chapel
- Overwhelmed by beauty
- Confession (anonymous, to a priest who doesn't know her)
- Tears she didn't know she had

DAY 3 - PRIVATE AUDIENCE:
- Through Order connections, she meets a Cardinal
- They talk about sin and redemption
- He doesn't know her past, but he sees her soul
- "God uses broken vessels. That's the whole point."

DAY 4 - REST:
- She walks the Borghese gardens
- Reads, thinks, prays
- Calls Hawk just to hear his voice
- First peaceful day in years

DAY 5 - THE CATACOMBS:
- She tours the ancient Christian burial sites
- Thinks about mortality, legacy
- What does she want her life to mean?
- Writes in a journal for the first time

DAY 6 - RESOLUTION:
- Final mass at St. Peter's
- She feels something shift
- Not absolution exactly, but acceptance
- She's done terrible things and good things
- Both are true. Both are her.

DAY 7 - RETURN:
- Flight home with a new sense of peace
- Buys rosaries for the Wives Club inner circle
- Hawk meets her at the airport
- She's different. Softer. Stronger.`,
      homeImpact: `Hawk notices immediately:
- She's not carrying something heavy anymore
- She laughs more easily
- She's more present

The Wives Club:
- The rosaries become treasured
- Addie speaks differently about faith
- She's found her spiritual home`,
      outcome: 'Addie finds peace with her past. Faith becomes real, not just performance. She returns transformed.',
      bookAppearance: 'The Royal Phoenix: Book 4 - Epilogue',
      tripOrder: 70
    },
    {
      name: "Addie's Tokyo Mission",
      traveler: 'Addie',
      destination: 'Tokyo, Japan',
      origin: 'Charlotte, NC',
      purpose: 'Extract information from a yakuza-connected businessman threatening a Fortune 500 client',
      duration: '5 days',
      timeframe: 'Book 2 - Chapter 18',
      companions: JSON.stringify(['Harper Vance', 'BSS Asia contact']),
      storyEvents: `THE ASSIGNMENT:
A Japanese businessman with yakuza ties is extorting a BSS client. Addie's social skills are needed.

DAY 1 - ARRIVAL:
- First class to Tokyo
- Harper briefs on the flight
- The target frequents high-end hostess clubs
- Addie will play a role she knows too well

DAY 2 - INFILTRATION:
- She enters the world of Tokyo nightlife
- The clubs are different from American ones: ritualized, elegant
- She stands out as the exotic American
- Word reaches the target about her

DAY 3 - THE MEETING:
- Target requests her company at a private event
- She plays the perfect hostess
- Pours his drinks, laughs at his jokes
- He trusts her, starts talking

DAY 4 - THE INFORMATION:
- She records everything (hidden device)
- He reveals his leverage over the client
- She sees her opening: his own secrets
- A careful hint that she knows things too
- He panics, makes a deal

DAY 5 - EXIT:
- The leverage is neutralized
- Both parties agree to walk away
- Addie disappears before dawn
- She's on a jet home by noon

AFTERMATH:
- She showers for an hour when she gets home
- Hawk holds her without asking
- Some missions cost more than others`,
      homeImpact: `This trip leaves marks:
- Addie is quiet for days after
- She plays a role too close to her past
- Hawk provides silent support
- They grow closer through the darkness`,
      outcome: 'Client protected. Extortion ended. Addie reminded of who she used to be, and grateful for who she became.',
      bookAppearance: 'The Royal Phoenix: Book 2',
      tripOrder: 52
    },
    {
      name: "Addie's Miami Girls' Trip (Cover Story)",
      traveler: 'Addie',
      destination: 'Miami, FL',
      origin: 'Charlotte, NC',
      purpose: 'Official: Wives Club retreat. Actual: Coordinate with Sirens network and handle a trafficking situation',
      duration: '4 days',
      timeframe: 'Book 3 - Chapter 3',
      companions: JSON.stringify(['Elena Barrett', 'Kendra Donnelly', 'Wives Club inner circle']),
      storyEvents: `THE COVER:
A Wives Club retreat to Miami. Shopping, spa, bonding. That's what everyone thinks.

THE REALITY:
Addie has received intel about a trafficking operation bringing girls into Miami. She can't ignore it.

DAY 1 - ARRIVAL:
- Wives Club arrives in style
- Elena genuinely thinks it's just a retreat
- Addie meets with Harper privately
- The operation is planned

DAY 2 - THE RETREAT:
- Morning spa with the wives
- Addie excuses herself for "shopping"
- She meets Selene and two Miami operators
- They surveil the trafficking operation

DAY 2 - NIGHT:
- Dinner with the Wives Club (Addie is distracted)
- Elena notices something is wrong
- Addie deflects, poorly
- Late night, she slips out

DAY 3 - THE OPERATION:
- Addie coordinates the bust (anonymous tip to FBI)
- Selene provides key testimony (cover protected)
- 15 girls rescued
- Addie back at hotel by breakfast
- No one knows she was gone

DAY 3 - AFTERNOON:
- Beach day with the wives
- Addie sees the news on her phone
- "Major trafficking bust in Miami"
- She says nothing, smiles at Kendra's jokes

DAY 4 - RETURN:
- Flight home
- Elena finally asks: "What did you really do this weekend?"
- Addie: "Exactly what you saw. Plus a little extra."
- Elena doesn't push. She's learning.`,
      homeImpact: `The mission stays secret:
- Hawk knows (always knows)
- Harper debriefs with Jasper
- The girls are in protection now
- Addie adds 15 more souls to her list of the saved

The Wives Club:
- They had a lovely retreat
- Elena suspects more but respects boundaries
- The sisterhood deepens`,
      outcome: 'Trafficking ring dismantled. Girls saved. Cover maintained. Addie proves the retreat itself is real.',
      bookAppearance: 'The Royal Phoenix: Book 3',
      tripOrder: 57
    },
    {
      name: "Addie's Emergency L.A. Run",
      traveler: 'Addie',
      destination: 'Los Angeles, CA',
      origin: 'Charlotte, NC',
      purpose: 'A former friend from her cam days is dying and wants to see her',
      duration: '2 days',
      timeframe: 'Book 4 - Chapter 10',
      companions: JSON.stringify(['Alone']),
      storyEvents: `THE CALL:
A message from L.A.: "Maria is dying. She's asking for you."

Maria was one of the only people who was kind to Addie in those dark years.

DAY 1 - THE JOURNEY:
- Addie doesn't tell anyone except Hawk
- First class to LAX
- A car takes her to a hospice in the Valley
- The building is modest, clean
- She almost can't go in

THE VISIT:
- Maria is thin, fragile, unrecognizable
- But she smiles when she sees Addie
- "You made it out. I always knew you would."
- They hold hands for hours
- Addie tells her about Hawk, about Charlotte
- Maria: "You found your family. That's all that matters."

THE NIGHT:
- Addie stays in the room
- Maria sleeps, wakes, talks in fragments
- Stories from the old days, some Addie had forgotten
- Maria passes at 4 AM, peaceful
- Addie is holding her hand

DAY 2 - AFTER:
- Addie handles the arrangements (pays for everything)
- A small service, just a few old friends
- They recognize Addie but say nothing
- She's someone else now

THE RETURN:
- Flight home in silence
- Hawk picks her up
- She falls apart in the car
- He drives them somewhere quiet
- She tells him about Maria, about all of it
- He listens, loves, holds`,
      homeImpact: `This trip breaks and heals Addie:
- She confronts who she was
- She grieves someone from that life
- She accepts that girl was also her
- Hawk's love is unconditional

Moving forward:
- Addie creates a scholarship in Maria's name
- For girls escaping the industry
- Anonymous, of course
- But real`,
      outcome: 'A goodbye. A reckoning. A scholarship. A wound healed.',
      bookAppearance: 'The Royal Phoenix: Book 4',
      tripOrder: 68
    }
  ];

  for (const trip of addieTrips) {
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

  // Final count
  const tripCount = await prisma.businessTrip.count();
  console.log(`\n=== TOTAL TRIPS: ${tripCount} ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
