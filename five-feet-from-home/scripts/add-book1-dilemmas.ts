import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Book 1 Crises/Dilemmas from conflicts-catalog.md...\n");

  // Book 1 Crises from the conflicts catalog
  const book1Crises = [
    {
      name: 'London Data Breach',
      codeName: 'LONDON BREACH',
      clientName: 'Corporate Client (unnamed)',
      clientType: 'Corporate/Technology',
      crisisType: 'Cybersecurity Breach',
      severity: 'critical',
      location: 'London, UK',
      timeframe: 'Book 1 Opening - 2:17 AM call',
      description: 'Data intrusion through third-party vendor access. Initial fears of large breach scope.',
      situation: 'Data intrusion detected through third-party vendor access. Initial assessment suggests massive breach scope that could devastate the client.',
      complications: 'High-pressure executives demanding immediate answers. Media circling. Misinformation spreading. Need to draft statements for multiple scenarios.',
      resolution: 'Access logs showed intrusion window shorter than feared. Breach scope contained. Statement drafted for CEO signature.',
      outcome: 'Crisis contained within ~24 hours. Jasper executed flawlessly but left Elena and Grace abruptly at 2 AM.',
      bssTeam: JSON.stringify(['Jasper Barrett']),
      stakes: 'Corporate reputation, client data security, regulatory compliance',
      bookAppearance: 'Book 1, Chapter 1 - Opens the story',
      status: 'resolved',
    },
    {
      name: 'Hong Kong Assignment',
      codeName: 'HONG KONG',
      clientType: 'Unknown',
      crisisType: 'Corporate Crisis',
      severity: 'high',
      location: 'Hong Kong',
      timeframe: 'Book 1 - Immediately after London',
      description: 'High-priority assignment in Hong Kong with accelerated timeline.',
      situation: 'NEW SCOPE/ACCELERATED TIMELINE email received. Jasper was expected to fly to Hong Kong immediately after London.',
      complications: 'Elena hospitalized before Jasper could depart.',
      resolution: 'Crisis abandoned when Elena was hospitalized.',
      outcome: 'Represents Jasper\'s first choice of family over work - a turning point.',
      bssTeam: JSON.stringify(['Jasper Barrett (assigned but declined)']),
      stakes: 'Client relationship vs. family emergency',
      bookAppearance: 'Book 1 - Referenced but not detailed',
      status: 'abandoned',
    },
    {
      name: 'Chicago Contamination Case',
      codeName: 'ROCK BOTTOM',
      clientType: 'Food/Manufacturing',
      crisisType: 'Contamination/Public Health',
      severity: 'critical',
      location: 'Chicago, IL',
      timeframe: 'Pre-Book 1 (flashback)',
      description: 'Contamination case requiring crisis management. Referenced as a pivotal moment in Jasper\'s career.',
      situation: 'Contamination crisis requiring immediate on-site response.',
      complications: 'Jasper missed Grace\'s school recital - the one Elena said was important.',
      resolution: 'Jasper executes flawlessly.',
      outcome: 'This is referenced as a turning point - the moment Jasper started questioning his work-life balance.',
      lessonsLearned: 'Rookie consultant\'s words: "You can\'t manage a crisis if you\'re living in one."',
      bssTeam: JSON.stringify(['Jasper Barrett']),
      stakes: 'Public health, corporate reputation, family relationship',
      bookAppearance: 'Book 1 - Flashback reference',
      status: 'resolved',
    },
    {
      name: 'Project Wildcard',
      codeName: 'WILDCARD',
      clientName: 'Alexandra Pierce\'s Company',
      clientType: 'Corporate',
      crisisType: 'Corporate Crisis',
      severity: 'high',
      location: 'Charlotte area (local)',
      timeframe: 'Book 1 - During Elena\'s recovery',
      description: 'High-profile corporate crisis requiring immediate attention. Alexandra Pierce is the CEO/Principal.',
      situation: 'Corporate crisis requiring Jasper\'s direct involvement. Client: Alexandra Pierce, mid-forties, composed, direct.',
      complications: 'Alexandra represents temptation for Jasper - she makes work feel exciting and validates his need to be essential. Her signature style: "Need you now. Ten minutes."',
      resolution: 'Stabilized and contained by party weekend.',
      outcome: 'Distracted Jasper during Elena\'s early recovery; creates tension with Elena.',
      bssTeam: JSON.stringify(['Jasper Barrett', 'Harper Caldwell', 'Team']),
      stakes: 'Client reputation, Jasper\'s marriage, work-life boundaries',
      bookAppearance: 'Book 1 - During Elena\'s recovery',
      status: 'resolved',
    },
    {
      name: 'Whitaker Medical Holdings Financial Crisis',
      codeName: 'WHITAKER',
      clientName: 'Whitaker Medical Holdings',
      clientType: 'Healthcare/Medical',
      crisisType: 'Financial fraud/Embezzlement',
      severity: 'critical',
      location: 'Charlotte area',
      timeframe: 'Book 1 - During Elena\'s recovery',
      description: '$12 million missing from last quarter\'s operating budget. Not sloppy accounting - deliberate, clean movement.',
      situation: 'Someone moved $12M - clean, deliberate, like they were prepping for a quiet exit. Money layered through three shell vendors in Delaware and a shell of a shell in Cyprus. CFO signing off without reading fine print.',
      complications: 'CEO collapsed. Board coup in motion. Harper\'s text: "CEO collapsed. Board coup in motion. Get here NOW."',
      resolution: 'Rafe\'s forensic work traced money through shell companies and exposed the scheme.',
      outcome: 'Crisis contained. Whitaker done by end of Book 1.',
      bssTeam: JSON.stringify(['Harper Caldwell (lead on-site)', 'Jasper Barrett (oversight)', 'Rafe Moreno (forensic accounting/money trail)']),
      stakes: '$12M missing, CEO health, board stability, company survival',
      bookAppearance: 'Book 1 - Major thread',
      status: 'resolved',
    },
    {
      name: 'Africa Coup Intervention',
      codeName: 'AFRICA OPS',
      clientName: 'Private client (unnamed)',
      clientType: 'Political/Government',
      crisisType: 'Political crisis - coup in motion',
      severity: 'critical',
      location: 'Africa (Lagos as hub)',
      timeframe: 'Book 1 - Concurrent with Elena\'s recovery',
      description: 'Coup in motion - Western partner needs extraction cover. Encrypted comms, back-channel negotiations.',
      situation: 'Cole\'s text to Jasper: "Need approval to ghost for 48 hrs. Private client. Africa. Coup in motion."',
      complications: 'The kind of work that never made it into any report and never would. Harper navigated delicate politics in Lagos where one wrong word could have destabilized an entire region.',
      resolution: 'Interim government in place. Coup leaders out. American interests secure.',
      outcome: 'Successfully resolved after 3+ weeks in the field. Team returning for Elena\'s party. Final signed agreement from Lagos.',
      bssTeam: JSON.stringify(['Cole (lead field operative)', 'Dean (field operative)', 'Harper Caldwell (oversight from Lagos)']),
      stakes: 'Regional stability, American interests, lives of operatives',
      bookAppearance: 'Book 1 - Major thread',
      status: 'resolved',
    },
    {
      name: 'Singapore Security Breach',
      codeName: 'SINGAPORE',
      clientType: 'Corporate/Political',
      crisisType: 'Security breach with political complications',
      severity: 'high',
      location: 'Singapore',
      timeframe: 'Book 1 - Referenced during hospital stay',
      description: 'Security breach traced to mid-tier analyst in Singapore. Politicians making noise.',
      situation: 'Leak traced to mid-tier analyst. Politicians making noise about the security breach. Analyst admitted on record it was speculation.',
      complications: 'Board in panic mode. Addison called from secure line with option to flip this before close.',
      resolution: 'Contained.',
      outcome: 'Sets up Book 2 thread. Harper\'s message: "Something\'s happening in Singapore that doesn\'t match any of our intel."',
      bssTeam: JSON.stringify(['Harper Caldwell (lead, on-site in Asia)', 'Team support']),
      stakes: 'Corporate security, political relations, ongoing investigation',
      bookAppearance: 'Book 1 - Setup for Book 2',
      status: 'resolved',
    },
    {
      name: 'Senator\'s Task Force Assignment',
      codeName: 'TASK FORCE',
      clientName: 'Senator Kirkland\'s office',
      clientType: 'Government',
      crisisType: 'Government advisory role',
      severity: 'medium',
      location: 'Washington, D.C.',
      timeframe: 'Book 1 - Offered during hospital stay',
      description: 'Bipartisan Critical Incident Management Task Force. High-stakes corporate, infrastructure, and public safety.',
      situation: 'Role: Heading up a new bipartisan task force - critical incident management. They need someone who can operate at the intersection of crisis response and private-sector pressure.',
      complications: 'Position requires stepping back from day-to-day crisis contracts. A strategist, not a field operator.',
      resolution: 'Jasper initially deferred decision; eventually accepted but with modified boundaries.',
      outcome: 'Represents potential pivot from field work to advisory role - "a seat at the table, but not the table." Took role to be closer to home; less travel-intensive.',
      bssTeam: JSON.stringify(['Jasper Barrett', 'Team: Former FEMA deputy, energy-sector analyst, cyber-response lead']),
      stakes: 'Career direction, work-life balance, government influence',
      bookAppearance: 'Book 1 - Major decision point',
      status: 'active',
    },
    {
      name: 'NFL Ownership Battle',
      codeName: 'PANTHERS',
      clientName: 'Chris Cole (star quarterback)',
      clientType: 'Professional Sports/NFL',
      crisisType: 'Corporate/ownership dispute',
      severity: 'high',
      location: 'Charlotte area',
      timeframe: 'Book 1 - Ongoing, escalates in Book 2',
      description: 'Battle for control of NFL franchise. Backroom politics, whispered deals, multiple factions.',
      situation: 'Chris Cole, face of the team, is caught in middle of ownership battle. Pressured to take sides. Talk of selling minority stake to tech guy from West Coast - "Silicon Valley money, wants to modernize the franchise."',
      complications: 'Chris is pressured to leverage his influence in ways unrelated to football.',
      resolution: 'Unresolved in Book 1.',
      outcome: 'Major thread for Book 2. Caroline\'s message: "Ownership group meeting moved up. Certain people want you in the room. This isn\'t a request, Jasper. They need you."',
      bssTeam: JSON.stringify(['Jasper Barrett (advisory)']),
      stakes: 'Franchise control, Chris Cole\'s position, BSS influence in sports',
      bookAppearance: 'Book 1 and Book 2',
      status: 'ongoing',
    },
    {
      name: 'Prescott Grand Hotel Renovation',
      codeName: 'PRESCOTT',
      clientName: 'Investment group (unnamed)',
      clientType: 'Construction/Hospitality',
      crisisType: 'Construction project failure/mismanagement',
      severity: 'critical',
      location: 'Uptown Charlotte',
      timeframe: '8 years before main story (historical)',
      description: 'Where Jessica discovered Jasper. 3 months behind schedule, bleeding money daily.',
      situation: 'HVAC installs done out of order. Ductwork conflicting with electrical. Italian fixtures stuck in customs. Concrete pour curing wrong. Millwork team walked off (pay dispute). HVAC subcontractor MIA. Project manager doing crossword puzzles.',
      complications: 'Jasper was not even lead PM - technically support - but was actually holding entire project together. 18-hour days, triaging problems, fixing today while planning next week.',
      resolution: 'Jessica Vaughn recommended giving Jasper full authority. Three months later, the Prescott Grand opened on schedule. Under budget.',
      outcome: 'Origin of Jessica/Jasper mentor relationship. Jessica\'s quote: "You\'re not just putting out fires. You\'re redesigning the building while it\'s burning down."',
      lessonsLearned: 'Jessica recognized Jasper\'s unique ability to manage chaos and build simultaneously.',
      bssTeam: JSON.stringify(['Jasper Barrett (junior role, later promoted)']),
      stakes: 'Project success, Jasper\'s career trajectory, future of BSS',
      bookAppearance: 'Book 1 - Flashback in Chapter 29',
      status: 'resolved',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const crisis of book1Crises) {
    const existing = await prisma.crisis.findFirst({
      where: { name: crisis.name, projectId: project.id }
    });

    if (existing) {
      await prisma.crisis.update({
        where: { id: existing.id },
        data: crisis
      });
      console.log(`Updated: ${crisis.name}`);
      updated++;
    } else {
      await prisma.crisis.create({
        data: {
          projectId: project.id,
          ...crisis,
        }
      });
      console.log(`Created: ${crisis.name}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.crisis.count();
  console.log(`Total crises in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
