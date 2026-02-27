import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Missed Characters from New Character Creation Doc...\n");

  const missedCharacters = [
    // ========== DR. NATE ARCHER ==========
    {
      name: 'Dr. Nathaniel "Nate" Archer',
      firstName: 'Nathaniel',
      lastName: 'Archer',
      nickname: 'Numbers',
      title: 'Dr.',
      archetype: 'SpaceX Launch Engineer / Math Genius',
      education: 'MIT PhD Applied Mathematics. NASA Johnson Space Center training.',
      careerHistory: 'Decade at NASA Johnson Space Center as Flight Dynamics Officer (FDO) and mission analysis. Recruited by SpaceX after NASA budget cuts. Now Senior Launch Engineer in Hawthorne - on console for Falcon 9 and Falcon Heavy missions.',
      hubLocation: 'Hawthorne, CA / Houston, TX',
      relationships: "Jasper's off-the-books aerospace consigliere. Works with Jordan Reese (former NASA partner, now at ULA). Addie calls him 'Numbers.'",
      background: `Ex-NASA math/trajectory brain, now SpaceX. PhD in Applied Mathematics from MIT. Spent a decade at Johnson Space Center in Houston as FDO - responsible for trajectory design, orbital mechanics, abort path calculations during shuttle-era and early commercial crew launches. Known internally at SpaceX as the guy who can solve "unsolvable" trajectory math in his head. Jasper first met Nate when a defense client's classified payload on Falcon 9 risked exposure from telemetry glitch - Nate quietly covered the math errors. Since then, Nate is who Jasper calls when BSS cases touch space.`,
      personality: 'Precise, disciplined, hyper-rational. Sees the world in probabilities. Socially awkward but dry humor under pressure. Genius with quiet intensity. Not arrogant - just exhausted from carrying launch math in his head.',
      appearance: 'Lean, slightly gaunt from late nights at consoles. Sharp eyes behind rectangular glasses, dark hair with streaks of grey. Always in jeans and NASA/SpaceX branded pullovers.',
      modeledAfter: 'NASA/SpaceX engineer archetype',
      sourceFiles: 'New character creation',
    },

    // ========== COL. JORDAN REESE ==========
    {
      name: 'Col. (Ret.) Jordan Reese',
      firstName: 'Jordan',
      lastName: 'Reese',
      archetype: 'ULA Senior VP / Former USAF',
      education: 'U.S. Air Force Academy graduate.',
      careerHistory: 'USAF Major at Cape Canaveral, liaison between USAF Space Command and NASA/contractor launches. Retired O-5. Now Senior VP of Mission Assurance at ULA, overseeing government and commercial launches.',
      hubLocation: 'Washington DC / Cape Canaveral',
      relationships: 'Former NASA partner of Dr. Nate Archer - worked side by side at Cape Canaveral. Now at ULA while he went to SpaceX. Jasper uses their old bond to triangulate between ULA and SpaceX.',
      background: `Ex-USAF/NASA liaison, now ULA senior exec. During her time at Cape, she worked side by side with Nate - he on the math, she on military compliance and ops coordination. Unlike Nate, she loves politics and optics. Knows how to work senators, Pentagon brass, and journalists as easily as engineers. Jasper keeps her close for missions where military contracts, optics, and government stakeholders matter more than raw math. She can quietly hand BSS access to ULA assets or data.`,
      personality: 'Disciplined, confident, ambitious. Thrives in boardrooms and on launch pads. Loves politics and optics. She and Nate bicker constantly - he obsessed with math purity, she focused on optics of success.',
      appearance: 'Tall, commanding presence. Sleek suits, crisp lines, military posture never left her. Short styled hair, piercing blue eyes.',
      modeledAfter: 'Female USAF executive archetype',
      sourceFiles: 'New character creation',
    },

    // ========== DR. EVELYN ROSS ==========
    {
      name: 'Dr. Evelyn Ross',
      firstName: 'Evelyn',
      lastName: 'Ross',
      title: 'Dr.',
      archetype: 'Infectious Disease Physician / Wives Club Mentor',
      education: 'Duke University medical training. Residency in Africa (Ebola work). COVID frontline experience.',
      careerHistory: 'Infectious diseases physician at Duke. Works with CDC on outbreak coordination. Wives Club mentor.',
      hubLocation: 'Durham, NC / Duke University',
      wivesClubRole: 'Core Circle - Mentor / Medical',
      faithRoots: 'Catholic - faith deepened during residency in Africa (Ebola) and COVID work. Grounded in Catholic service and resilience.',
      relationships: 'Close to Chris Donnelly through Catholic faith. They share a spiritual director (Msgr. Reilly). Connected through Catholic Medical Association and Vatican-linked bioethics think tanks.',
      background: `Infectious diseases physician at Duke. Faith deepened during residency years in Africa (Ebola) and later COVID work. Mentorship in the wives club is grounded in Catholic service and resilience. Close to Chris Donnelly through Catholic faith - they connect on quiet moments, long talks about vocation and calling, supporting each other balancing faith with ambition. Through their faith partnership, invited into networks BSS can't touch: Catholic Medical Association, Vatican-linked bioethics think tanks.`,
      personality: 'Fierce like Dr. Lauren Bloom (New Amsterdam). Uncompromising when she knows she\'s right. Willing to clash with bureaucrats, politicians, or even BSS leadership if they risk lives. Natural mentor.',
      modeledAfter: 'Dr. Lauren Bloom (New Amsterdam)',
      sourceFiles: 'New character creation',
    },

    // ========== CHRIS DONNELLY ==========
    {
      name: 'Chris Donnelly',
      firstName: 'Chris',
      lastName: 'Donnelly',
      nickname: 'Donny',
      archetype: 'Catholic Finance / Kendra\'s Husband',
      education: 'Notre Dame - Economics major, Political Science minor. Played club hockey.',
      careerHistory: 'Finance career. CrossFit athlete. Active in Catholic philanthropic boards.',
      hubLocation: 'Charlotte, NC',
      faithRoots: 'Cradle Catholic. Boston Irish-American, firefighter dad, nurse mom. Altar server growing up. Knights of Columbus. Never left the faith.',
      wivesClubRole: 'Spouse of Core Member',
      relationships: "Married to Kendra (Whitaker). Spiritual director: Msgr. Patrick Reilly. College roommate/best friend: Fr. James Callahan. Close to Dr. Evelyn Ross through Catholic faith. Notre Dame roommate with James for two years.",
      background: `Boston-born Irish-American. Firefighter dad, nurse mom. Grew up Catholic - Mass on Sundays, altar serving, Knights of Columbus fish fries. Notre Dame graduate - Economics major, Political Science minor, played club hockey. Two lifelong relationships from Notre Dame: Fr. James Callahan (roommate turned priest) and Msgr. Patrick Reilly (eventual spiritual director). Through his faith partnership with Dr. Ross, invited into Catholic finance & philanthropic boards, high-level Vatican/Jesuit diplomatic dinners.`,
      personality: 'Grounded, stubborn (only Msgr. Reilly can out-stubborn him), faithful, intense about CrossFit. Blue-collar roots despite finance career.',
      modeledAfter: 'Boston Catholic finance professional',
      sourceFiles: 'New character creation',
    },

    // ========== MSGR. PATRICK REILLY ==========
    {
      name: 'Msgr. Patrick Reilly',
      firstName: 'Patrick',
      lastName: 'Reilly',
      title: 'Msgr.',
      archetype: 'Catholic Priest / Spiritual Director',
      education: 'Seminary training.',
      careerHistory: 'Catholic priest. Now serving in Charlotte. Spiritual director to Chris Donnelly and introduced Dr. Ross to retreat circles.',
      hubLocation: 'Charlotte, NC',
      faithRoots: 'Catholic priest. Boston-born.',
      relationships: "Chris Donnelly's spiritual director since Chris's 20s. Introduced Dr. Evelyn Ross to retreat circles. Known Chris since his 20s.",
      background: `Late 50s, seasoned, Boston-born but serving now in Charlotte. Wise, practical, sharp sense of humor. Known Chris Donnelly since his 20s and became his spiritual director when Chris moved South. The kind of priest who mixes blunt advice with deep compassion. Meets Chris at coffee shops or over golf, reminding him to balance ambition with humility.`,
      personality: 'Wise, practical, sharp sense of humor. Blunt advice with deep compassion.',
      catchphrases: '"Chris, you don\'t need more answers. You need to sit still long enough to hear the ones God already gave you."',
      sourceFiles: 'New character creation',
    },

    // ========== FR. JAMES CALLAHAN ==========
    {
      name: 'Fr. James Callahan',
      firstName: 'James',
      lastName: 'Callahan',
      title: 'Fr.',
      archetype: 'Catholic Priest / College Friend',
      education: 'Notre Dame (with Chris Donnelly). Seminary after graduation.',
      careerHistory: 'Parish priest in Indiana.',
      hubLocation: 'Indiana',
      faithRoots: 'Catholic priest.',
      relationships: "Chris Donnelly's Notre Dame roommate for two years. Now a parish priest. They still talk monthly. Kept Chris anchored when his dad died suddenly. Still calls Chris by hockey nickname 'Donny.'",
      background: `Same age as Chris Donnelly, Notre Dame roommate for two years. While Chris went into finance, James went to seminary after graduation. Now a parish priest in Indiana. Still talks with Chris monthly - joking but slipping into deep conversations about vocation, calling, and friendship. Chris credits James with keeping him anchored when his dad died suddenly. Less formal than Msgr. Reilly - still cracks jokes about dorm life.`,
      personality: 'Warm, humorous, deep when asked. Fits right into the group - drinks a beer, watches a game, then surprises everyone with how deeply he can speak about faith.',
      sourceFiles: 'New character creation',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of missedCharacters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { firstName: char.firstName, lastName: char.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    }
  }

  // Update Kendra's relationships to include Chris
  const kendra = await prisma.character.findFirst({
    where: { firstName: 'Kendra', lastName: 'Whitaker' }
  });
  if (kendra) {
    const currentRel = kendra.relationships || '';
    if (!currentRel.includes('Chris Donnelly')) {
      await prisma.character.update({
        where: { id: kendra.id },
        data: {
          relationships: currentRel + ' Married to Chris Donnelly (Notre Dame, Catholic, finance).'
        }
      });
      console.log('\nUpdated Kendra with Chris Donnelly relationship');
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
