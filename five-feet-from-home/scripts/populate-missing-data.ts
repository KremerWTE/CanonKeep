/**
 * Populate missing data for Crises, Organizations, BusinessTrips, and BookSeries
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Populating missing data...\n');

  // Get project
  const project = await prisma.project.findFirst();
  if (!project) {
    console.log('No project found. Please run ingest first.');
    return;
  }

  // === CRISES ===
  console.log('Creating Crises...');
  const crises = [
    {
      name: 'London Summit Crisis',
      codeName: 'OPERATION SUMMIT',
      clientName: 'UK Government',
      clientType: 'Government',
      crisisType: 'Diplomatic Security',
      severity: 'Critical',
      location: 'London, UK',
      timeframe: 'Book 1',
      description: 'High-stakes diplomatic crisis requiring Jasper to leave immediately for London',
      situation: 'International summit threatened by security breach',
      bssTeam: 'Jasper Barrett, Hawk, Ridge, Operations Team',
      stakes: 'International relations, personal family sacrifice',
      status: 'resolved',
      bookAppearance: 'Book 1 - Five Feet From Home',
    },
    {
      name: 'Vatican Gala Security',
      codeName: 'OPERATION SANCTUM',
      clientName: 'Vatican',
      clientType: 'Religious/Diplomatic',
      crisisType: 'Event Security',
      severity: 'High',
      location: 'Vatican City / Rome',
      description: 'High-profile Vatican fundraiser requiring elite security coordination',
      bssTeam: 'BSS Full Team',
      status: 'resolved',
    },
    {
      name: 'Tech CEO Extraction',
      codeName: 'OPERATION PHOENIX',
      clientName: 'Fortune 100 Tech Company',
      clientType: 'Corporate',
      crisisType: 'Executive Protection',
      severity: 'Critical',
      location: 'International',
      description: 'Emergency extraction of CEO from hostile territory',
      bssTeam: 'Hawk, Ridge, Operators',
      status: 'resolved',
    },
    {
      name: 'Media Crisis - Senator',
      codeName: 'OPERATION CLEAN SLATE',
      clientName: 'US Senator',
      clientType: 'Political',
      crisisType: 'Reputation Management',
      severity: 'High',
      location: 'Washington DC',
      description: 'Managing media fallout from leaked information',
      bssTeam: 'Harper, Strategists',
      status: 'resolved',
    },
    {
      name: 'Family Foundation Threat',
      codeName: 'OPERATION SHIELD',
      clientName: 'Philanthropic Foundation',
      clientType: 'Non-Profit',
      crisisType: 'Threat Assessment',
      severity: 'Medium',
      location: 'Charlotte, NC',
      description: 'Credible threats against foundation leadership',
      bssTeam: 'Security Team',
      status: 'active',
    },
    {
      name: 'Corporate Espionage Case',
      codeName: 'OPERATION WATCHDOG',
      clientName: 'Financial Services Firm',
      clientType: 'Corporate',
      crisisType: 'Counter-Intelligence',
      severity: 'High',
      location: 'New York',
      description: 'Investigation into suspected corporate espionage',
      bssTeam: 'Harper, Analysts',
      status: 'active',
    },
  ];

  for (const crisis of crises) {
    await prisma.crisis.upsert({
      where: { projectId_name: { projectId: project.id, name: crisis.name } },
      update: crisis,
      create: { ...crisis, projectId: project.id },
    });
  }
  console.log(`Created ${crises.length} crises\n`);

  // === ORGANIZATIONS ===
  console.log('Creating Organizations...');
  const organizations = [
    {
      name: 'Barrett Strategic Solutions (BSS)',
      shortName: 'BSS',
      type: 'Private Intelligence/Security',
      description: 'Elite crisis management and strategic consulting firm founded by Jasper Barrett. Offices in Charlotte HQ, Washington DC, New York, London, Atlanta, Boston.',
      leadership: 'Jasper Barrett (CEO), Addie Price (Managing Partner), Hawk (Head of Operations)',
      headquarters: 'Charlotte, NC',
      services: 'Crisis management, executive protection, strategic consulting, reputation management',
      relationships: 'POH, Maison Aurelia, various government agencies',
      significance: 'Core organization of the story universe',
    },
    {
      name: 'Maison Aurelia',
      shortName: 'MA',
      type: 'Luxury Event Planning',
      description: 'Elena Barrett\'s high-end event planning and lifestyle management firm',
      leadership: 'Elena Barrett (CEO), Charlotte "Lottie" Hale (Operations Chief)',
      headquarters: 'Charlotte, NC',
      services: 'Cultural diplomacy dinners, Vatican-linked fundraisers, Fortune 100 summits, elite galas',
      relationships: 'BSS, Wives Club, high society networks',
      significance: 'Elena\'s professional domain',
    },
    {
      name: 'Palace of Honor (POH)',
      shortName: 'POH',
      type: 'Elite Private Club',
      description: 'Exclusive membership organization for powerful families and individuals',
      headquarters: 'Multiple locations',
      services: 'Networking, philanthropy, social events',
      relationships: 'BSS, Maison Aurelia',
      significance: 'Social backdrop for many scenes',
    },
    {
      name: 'The Wives Club',
      type: 'Informal Network',
      description: 'Informal but powerful network of wives connected to BSS and POH. Core members: Elena, Addie, Kendra, Harper, Bella, Sara, Lottie, Selene, Maggie',
      leadership: 'Elena Barrett (Queen), Addie Price (Anchor), Kendra Donnelly (Integrator)',
      services: 'Support network, intelligence sharing, social coordination',
      significance: 'Emotional core of the series',
    },
    {
      name: 'Donnelly Capital',
      type: 'Private Equity',
      description: 'Chris Donnelly\'s Catholic-focused private equity firm',
      leadership: 'Chris Donnelly',
      headquarters: 'Charlotte, NC',
      services: 'Faith-based investments, private equity',
      relationships: 'BSS, Catholic networks',
    },
    {
      name: 'Romano Ventures',
      type: 'Investment',
      description: 'Marco Romano\'s investment firm',
      leadership: 'Marco Romano',
      relationships: 'BSS, Italian-American networks',
    },
    {
      name: 'Hale Industries',
      type: 'Corporate',
      description: 'Declan Hale\'s business empire',
      leadership: 'Declan Hale',
      relationships: 'BSS',
    },
  ];

  for (const org of organizations) {
    await prisma.organization.upsert({
      where: { projectId_name: { projectId: project.id, name: org.name } },
      update: org,
      create: { ...org, projectId: project.id },
    });
  }
  console.log(`Created ${organizations.length} organizations\n`);

  // === BUSINESS TRIPS ===
  console.log('Creating Business Trips...');
  const trips = [
    {
      name: 'London Crisis Trip',
      traveler: 'Jasper Barrett',
      destination: 'London, UK',
      origin: 'Charlotte, NC',
      purpose: 'London Summit Crisis management',
      duration: 'Extended',
      timeframe: 'Book 1',
      crisisName: 'London Summit Crisis',
      companions: 'Hawk, Ridge, Operations Team',
      storyEvents: 'Jasper leaves family, Elena manages alone',
      homeImpact: 'Significant strain on family, Wives Club rallies',
      tripOrder: 1,
    },
    {
      name: 'Vatican Gala Trip',
      traveler: 'Jasper Barrett',
      destination: 'Rome/Vatican City',
      origin: 'Charlotte, NC',
      purpose: 'Vatican Gala security coordination',
      crisisName: 'Vatican Gala Security',
      companions: 'Elena Barrett (separate), Maison Aurelia team',
      tripOrder: 2,
    },
    {
      name: 'DC Political Trip',
      traveler: 'Harper',
      destination: 'Washington DC',
      origin: 'Charlotte, NC',
      purpose: 'Senator crisis management',
      crisisName: 'Media Crisis - Senator',
      companions: 'Strategist team',
      tripOrder: 3,
    },
    {
      name: 'New York Financial Trip',
      traveler: 'Jasper Barrett',
      destination: 'New York, NY',
      origin: 'Charlotte, NC',
      purpose: 'Corporate espionage investigation',
      crisisName: 'Corporate Espionage Case',
      companions: 'Harper, Analysts',
      tripOrder: 4,
    },
    {
      name: 'Tech CEO Extraction Mission',
      traveler: 'Hawk',
      destination: 'Classified International',
      origin: 'Charlotte, NC',
      purpose: 'Emergency CEO extraction',
      crisisName: 'Tech CEO Extraction',
      companions: 'Ridge, Extraction Team',
      tripOrder: 5,
    },
  ];

  // Delete existing trips and recreate
  await prisma.businessTrip.deleteMany({ where: { projectId: project.id } });
  for (const trip of trips) {
    await prisma.businessTrip.create({
      data: { ...trip, projectId: project.id },
    });
  }
  console.log(`Created ${trips.length} business trips\n`);

  // === BOOK SERIES ===
  console.log('Creating Book Series...');
  const series = [
    {
      name: 'Five Feet From Home',
      protagonist: 'Jasper Barrett',
      seriesType: 'Main',
      premise: 'Elite fixer Jasper Barrett balances high-stakes crisis management with being a devoted family man. When duty calls him away, his wife Elena and their support network hold everything together.',
      totalBooks: 4,
      status: 'in-progress',
      readingOrder: 1,
      themes: JSON.stringify(['family sacrifice', 'duty vs love', 'found family', 'elite world']),
      books: JSON.stringify([
        { number: 1, title: 'Five Feet From Home', subtitle: 'The London Crisis', synopsis: 'Jasper must leave for London, testing family bonds' },
        { number: 2, title: 'Five Feet From Home', subtitle: 'Coming Home', synopsis: 'The aftermath of extended absence' },
        { number: 3, title: 'Five Feet From Home', subtitle: 'TBD', synopsis: 'Further adventures' },
        { number: 4, title: 'Five Feet From Home', subtitle: 'TBD', synopsis: 'Series conclusion' },
      ]),
      connections: 'Sets up all spin-off series, introduces BSS and Wives Club',
    },
    {
      name: 'The Fixer\'s Wife',
      protagonist: 'Addie Price',
      seriesType: 'Spin-off',
      premise: 'Addie Price navigates being both BSS Managing Partner and devoted wife/mother. Her military intelligence background meets domestic life.',
      totalBooks: 3,
      status: 'planned',
      readingOrder: 2,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['work-life balance', 'female leadership', 'partnership']),
      connections: 'Parallel timeline to main series',
    },
    {
      name: 'Wild Hearts',
      protagonist: 'Bella Romano',
      seriesType: 'Spin-off',
      premise: 'Bella Romano\'s journey as the emotional heart of the Wives Club, balancing Italian-American family expectations with her own path.',
      totalBooks: 3,
      status: 'planned',
      readingOrder: 3,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['identity', 'family expectations', 'finding voice']),
    },
    {
      name: 'Midnight Sun',
      protagonist: 'Selene Marchetti',
      seriesType: 'Spin-off',
      premise: 'Selene\'s wild card energy and mysterious past unfold as she finds her place in the group.',
      totalBooks: 2,
      status: 'planned',
      readingOrder: 4,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['redemption', 'secrets', 'belonging']),
    },
    {
      name: 'Spring Break',
      protagonist: 'Izzy',
      seriesType: 'Spin-off',
      premise: 'Coming-of-age story following Izzy and friends during a pivotal spring break in Florida.',
      totalBooks: 1,
      status: 'planned',
      readingOrder: 5,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['coming of age', 'friendship', 'first love']),
    },
    {
      name: 'Ridge\'s Road',
      protagonist: 'Ridge Callahan',
      seriesType: 'Spin-off',
      premise: 'Ridge Callahan\'s family saga - from military service to BSS, and finding love.',
      totalBooks: 2,
      status: 'planned',
      readingOrder: 6,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['military family', 'Southern roots', 'second chances']),
    },
    {
      name: 'The Cooking Class',
      protagonist: 'Wives Club Ensemble',
      seriesType: 'Companion',
      premise: 'Slice-of-life stories centered around the Wives Club cooking classes - bonding, secrets shared, friendships deepened.',
      totalBooks: 1,
      status: 'planned',
      readingOrder: 7,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['female friendship', 'food and love', 'community']),
    },
    {
      name: 'The Teacher\'s Heart',
      protagonist: 'Maggie Donnelly',
      seriesType: 'Spin-off',
      premise: 'Maggie Donnelly\'s romantic journey as a teacher finding love.',
      totalBooks: 2,
      status: 'planned',
      readingOrder: 8,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['romance', 'education', 'small town']),
    },
    {
      name: 'Faith & Fortune',
      protagonist: 'Chris & Kendra Donnelly',
      seriesType: 'Spin-off',
      premise: 'Chris and Kendra navigate Catholic private equity world, faith, and family.',
      totalBooks: 2,
      status: 'planned',
      readingOrder: 9,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['faith', 'finance', 'marriage']),
    },
    {
      name: 'Lottie\'s Seating Chart',
      protagonist: 'Charlotte "Lottie" Hale',
      seriesType: 'Companion',
      premise: 'Behind-the-scenes of elite event planning through Lottie\'s legendary organizational skills.',
      totalBooks: 1,
      status: 'planned',
      readingOrder: 10,
      parentSeries: 'Five Feet From Home',
      themes: JSON.stringify(['event planning', 'social dynamics', 'hidden power']),
    },
  ];

  for (const s of series) {
    await prisma.bookSeries.upsert({
      where: { projectId_name: { projectId: project.id, name: s.name } },
      update: s,
      create: { ...s, projectId: project.id },
    });
  }
  console.log(`Created ${series.length} book series\n`);

  // Final counts
  const counts = {
    crises: await prisma.crisis.count(),
    organizations: await prisma.organization.count(),
    trips: await prisma.businessTrip.count(),
    series: await prisma.bookSeries.count(),
  };

  console.log('=== Final Counts ===');
  console.log('Crises:', counts.crises);
  console.log('Organizations:', counts.organizations);
  console.log('Business Trips:', counts.trips);
  console.log('Book Series:', counts.series);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
