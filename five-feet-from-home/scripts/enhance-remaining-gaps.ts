/**
 * Enhance Remaining Gaps - Complete all incomplete data
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
  console.log('ENHANCING REMAINING GAPS');
  console.log('========================================\n');

  // =============================================
  // ENHANCE INCOMPLETE CHARACTERS WITH ROLES
  // =============================================
  console.log('--- Enhancing Incomplete Characters ---\n');

  const characterEnhancements = [
    {
      name: 'Harper Steele',
      updates: {
        relationships: '[ADDED] BSS leadership team, works closely with operations. Professional network across security industry.',
        motivations: '[ADDED] Building a legacy in security consulting. Proving women can lead in male-dominated fields.',
        fears: '[ADDED] Being seen as token diversity hire rather than earned position. Losing her edge.',
        wardrobeStyle: '[ADDED] Power suits with subtle flair. Louboutin heels, structured bags. Corporate elegance.',
      },
    },
    {
      name: 'Marcus Vega',
      updates: {
        appearance: '[ADDED] Latino, early 40s. Athletic build maintained from military days. Salt-and-pepper at temples. Intense eyes.',
        motivations: '[ADDED] Protecting those who can\'t protect themselves. Redemption for past operational failures.',
        fears: '[ADDED] Failing another mission. The faces of those he couldn\'t save.',
        wardrobeStyle: '[ADDED] Tactical casual. Quality but functional. Dark colors that don\'t show stains.',
        age: 'Early 40s',
      },
    },
    {
      name: 'Molly Gallagher',
      updates: {
        appearance: '[ADDED] Irish complexion, red hair usually in practical ponytail. Freckles she stopped hiding. Athletic build.',
        motivations: '[ADDED] Proving herself in a man\'s world. Supporting her extended family back home.',
        fears: '[ADDED] Being underestimated. Losing her accent and identity in American corporate culture.',
        wardrobeStyle: '[ADDED] Practical elegance. Green accents nodding to heritage. Comfortable shoes for long ops.',
      },
    },
    {
      name: 'Bella Romano',
      updates: {
        appearance: '[ADDED] Mediterranean beauty, dark hair, olive skin. Expressive eyes. Carries herself with quiet confidence.',
        motivations: '[ADDED] Breaking free from family expectations. Building something of her own.',
        fears: '[ADDED] Becoming her mother. Being trapped by legacy.',
        archetype: 'Italian Heiress / Independent Spirit',
        wardrobeStyle: '[ADDED] Italian designer instincts. Classic pieces with modern edge. Quality over quantity.',
        age: 'Early 30s',
      },
    },
    {
      name: 'Caleb Strickland',
      updates: {
        appearance: '[ADDED] Tall, lean. Prematurely gray. Eyes that see through pretense. Moves quietly.',
        motivations: '[ADDED] Knowledge is power. Understanding systems - human and digital.',
        fears: '[ADDED] Being truly known. Someone finding the shadows in his past.',
        wardrobeStyle: '[ADDED] Understated wealth. Nothing memorable - by design. Quality but forgettable.',
        age: 'Late 40s',
      },
    },
    {
      name: 'Cassandra "Cassie" Drake',
      updates: {
        appearance: '[ADDED] Striking features, dark hair, sharp cheekbones. Model-tall. Presence that commands attention.',
        motivations: '[ADDED] Control. Never being vulnerable again. Building an empire on her terms.',
        fears: '[ADDED] Her past being exposed. Losing control of her carefully constructed life.',
        wardrobeStyle: '[ADDED] Dramatic elegance. Bold colors, architectural pieces. Red soles and sharp lines.',
        age: 'Mid-30s',
      },
    },
    {
      name: 'Dr. Evelyn Cross',
      updates: {
        appearance: '[ADDED] Professional polish, silver-streaked hair she\'s earned. Warm eyes behind designer frames.',
        motivations: '[ADDED] Advancing medical research. Healing without the politics of hospital systems.',
        fears: '[ADDED] Missing something critical. A patient lost to oversight.',
        wardrobeStyle: '[ADDED] Medical elegance. Lab coats over quality basics. Comfortable shoes for rounds.',
        age: '50s',
      },
    },
    {
      name: 'Dr. Evelyn Ross',
      updates: {
        appearance: '[ADDED] Elegant academic. Silver hair, reading glasses on chain. Moves with deliberate grace.',
        motivations: '[ADDED] Legacy through knowledge. Training the next generation.',
        fears: '[ADDED] Irrelevance. Being forgotten when she\'s gone.',
        wardrobeStyle: '[ADDED] Academic chic. Blazers with personality, interesting jewelry. Comfortable elegance.',
        age: 'Early 60s',
      },
    },
    {
      name: 'Dr. Sophia Dane',
      updates: {
        appearance: '[ADDED] Mediterranean features, dark curls often escaping pins. Warm smile that puts patients at ease.',
        motivations: '[ADDED] Healing trauma - physical and emotional. Making high-end care accessible.',
        fears: '[ADDED] Burnout. Losing compassion to clinical distance.',
        wardrobeStyle: '[ADDED] Professional with warmth. Soft colors, quality fabrics. Comfortable for long days.',
        age: 'Late 30s',
      },
    },
    {
      name: 'Ethan Crosswell',
      updates: {
        appearance: '[ADDED] Tech mogul polish. Fit from personal trainer. Designer casual that costs more than it looks.',
        motivations: '[ADDED] Disruption. Proving the old guard wrong. Building the future.',
        fears: '[ADDED] Being ordinary. His company failing publicly.',
        wardrobeStyle: '[ADDED] Silicon Valley casual elevated. Expensive simplicity. Sneakers that cost thousands.',
        age: 'Early 40s',
      },
    },
    {
      name: 'Jessica Marlowe',
      updates: {
        appearance: '[ADDED] All-American beauty, blonde, blue-eyed. Girl-next-door who grew into power. Disarming smile.',
        motivations: '[ADDED] Influence through connection. Building networks that matter.',
        fears: '[ADDED] Being seen as lightweight. Aging out of relevance.',
        wardrobeStyle: '[ADDED] Southern elegance meets DC power. Pearls and pastels with backbone.',
        age: 'Mid-40s',
      },
    },
    {
      name: 'Richard Cole Harrington',
      updates: {
        appearance: '[ADDED] Old money polish. Distinguished silver, tailored everything. Presence that fills rooms.',
        motivations: '[ADDED] Legacy. Ensuring the family name endures with honor.',
        fears: '[ADDED] His children squandering what he built. Dying before the work is done.',
        wardrobeStyle: '[ADDED] Bespoke everything. Savile Row suits, handmade shoes. Understated wealth.',
        age: 'Late 60s',
      },
    },
    {
      name: 'Savannah "Savvy" Knox',
      updates: {
        appearance: '[ADDED] Southern belle beauty with sharp edges. Honey blonde, calculating eyes behind sweet smile.',
        motivations: '[ADDED] Power without the spotlight. Pulling strings from the shadows.',
        fears: '[ADDED] Being underestimated - which she also uses. Losing her network.',
        wardrobeStyle: '[ADDED] Southern hostess chic. Designer with charm. Looks expensive but approachable.',
        age: 'Early 40s',
      },
    },
    {
      name: 'Theo Harrington',
      updates: {
        appearance: '[ADDED] Heir apparent looks - tall, dark, handsome. Carries family legacy visibly. Serious eyes.',
        motivations: '[ADDED] Proving worthy of the name. Carving his own path within family expectations.',
        fears: '[ADDED] Being nothing without the name. Failing publicly.',
        wardrobeStyle: '[ADDED] Young mogul aesthetic. Quality casual, luxury watches. Old money meeting new style.',
        age: 'Late 20s',
      },
    },
    {
      name: 'Vivian "Vee" Sinclair',
      updates: {
        appearance: '[ADDED] Striking androgynous beauty. Sharp features, short dark hair. Eyes that miss nothing.',
        motivations: '[ADDED] Excellence. Being the best at whatever she does. Recognition on her terms.',
        fears: '[ADDED] Mediocrity. Being overlooked for conventional choices.',
        wardrobeStyle: '[ADDED] Tailored minimalism. Gender-fluid elegance. Sharp lines, quality fabrics.',
        age: 'Early 30s',
      },
    },
    {
      name: 'Carolina (NFL Wife)',
      updates: {
        appearance: '[ADDED] Latina beauty, curves she\'s stopped hiding. Warm features, genuine smile.',
        personality: '[ADDED] Warm, authentic, grounding. The voice of reason in WAG drama. Loyal to her core.',
        motivations: '[ADDED] Protecting her family. Building community among the wives.',
        fears: '[ADDED] The league life ending. Her husband\'s injuries. Their kids losing normalcy.',
        wardrobeStyle: '[ADDED] Game day glamour meets mom practicality. Designer but touchable.',
        age: 'Early 30s',
      },
    },
    {
      name: 'Chris (Last Name TBD)',
      updates: {
        appearance: '[ADDED] Boy-next-door grown up. Approachable handsomeness, easy smile.',
        motivations: '[ADDED] Stability. Building something lasting. Genuine connection.',
        fears: '[ADDED] Repeating family mistakes. Not being enough.',
        archetype: 'The Steady Partner',
        wardrobeStyle: '[ADDED] Clean, classic, unpretentious. Quality basics. Comfortable in his skin.',
        age: 'Mid-30s',
      },
    },
    {
      name: 'Jacqueline Sloane',
      updates: {
        appearance: '[ADDED] Ice queen beauty. Platinum blonde, sharp features. Intimidating elegance.',
        personality: '[ADDED] Cool, calculating, brilliant. Warmth reserved for the inner circle.',
        motivations: '[ADDED] Control. Never being dependent again. Building unassailable wealth.',
        fears: '[ADDED] Vulnerability. Her past poverty being discovered.',
        wardrobeStyle: '[ADDED] Cold luxury. White and silver, architectural pieces. Armor disguised as fashion.',
        age: 'Late 30s',
      },
    },
    {
      name: 'Julia Raines',
      updates: {
        appearance: '[ADDED] Classic beauty aging gracefully. Chestnut hair, warm eyes. Carries herself like royalty.',
        personality: '[ADDED] Old money graciousness with steel underneath. Hostess excellence.',
        motivations: '[ADDED] Maintaining legacy. Guiding the next generation. Social influence.',
        fears: '[ADDED] Irrelevance. The old ways dying. Her children making wrong choices.',
        age: 'Mid-50s',
      },
    },
    {
      name: 'Marisa Calderon',
      updates: {
        appearance: '[ADDED] Exotic beauty - mixed heritage. Long dark hair, expressive features. Captivating presence.',
        personality: '[ADDED] Passionate, artistic, sometimes volatile. Deeply loyal once trust is earned.',
        motivations: '[ADDED] Creative expression. Being seen for talent not beauty. True connection.',
        fears: '[ADDED] Being used. Her art being dismissed. Ending up alone.',
        wardrobeStyle: '[ADDED] Bohemian luxury. Flowing fabrics, dramatic jewelry. Artist aesthetic.',
        age: 'Late 20s',
      },
    },
    {
      name: 'Raina Locke',
      updates: {
        appearance: '[ADDED] Tech world beauty. Sharp intelligence visible in features. Natural look, minimal makeup.',
        personality: '[ADDED] Brilliant, direct, impatient with incompetence. Surprisingly kind to those she respects.',
        motivations: '[ADDED] Innovation. Solving problems others say are impossible.',
        fears: '[ADDED] Stagnation. Her ideas being stolen. Ending up like her burned-out mentors.',
        wardrobeStyle: '[ADDED] Startup chic. Premium casual. Function over form but still stylish.',
        age: 'Early 30s',
      },
    },
    {
      name: 'Vivian "Viv" Carroway',
      updates: {
        appearance: '[ADDED] Timeless beauty. Could be 35 or 50 - and she\'ll never tell. Impeccable grooming.',
        motivations: '[ADDED] Power through connection. Building an unassailable social position.',
        fears: '[ADDED] Aging visibly. Losing relevance. Her past catching up.',
        archetype: 'Social Architect / Connector',
        wardrobeStyle: '[ADDED] Investment dressing. Classic pieces that never date. Quality over trends.',
        age: 'Age undisclosed',
      },
    },
    {
      name: 'Anik Archambault',
      updates: {
        appearance: '[ADDED] French-Canadian charm. Dark features, easy smile. Athlete\'s build going slightly soft.',
        personality: '[ADDED] Charming, ambitious, occasionally ruthless. Loyalty is transactional.',
        motivations: '[ADDED] Success on global stage. Proving himself beyond family shadow.',
        fears: '[ADDED] Being seen as lightweight. Returning home a failure.',
        wardrobeStyle: '[ADDED] Euro-style elegance. Slim cuts, quality fabrics. Slightly more stylish than American counterparts.',
        age: 'Late 30s',
      },
    },
  ];

  for (const enhancement of characterEnhancements) {
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
  // ENHANCE ORGANIZATIONS
  // =============================================
  console.log('\n--- Enhancing Organizations ---\n');

  const orgEnhancements = [
    {
      name: 'BSS Asia Lab',
      updates: {
        leadership: '[ADDED] Regional Director overseeing Singapore hub. Reports to BSS HQ.',
        services: '[ADDED] Asia-Pacific security operations, Chinese market intelligence, supply chain protection, executive security for APAC travel.',
      },
    },
    {
      name: 'BSS DC Lab',
      updates: {
        leadership: '[ADDED] DC Station Chief with government liaison experience. Reports to BSS HQ.',
        services: '[ADDED] Government relations, regulatory intelligence, political risk assessment, Capitol Hill monitoring, federal contractor support.',
      },
    },
    {
      name: 'BSS LA Lab',
      updates: {
        leadership: '[ADDED] West Coast Director with entertainment industry expertise. Reports to BSS HQ.',
        services: '[ADDED] Entertainment industry security, celebrity protection, studio security consulting, red carpet operations, paparazzi management.',
      },
    },
    {
      name: 'BSS London Lab',
      updates: {
        leadership: '[ADDED] UK Director with MI6 background. Reports to BSS HQ.',
        services: '[ADDED] European operations hub, UK financial sector security, aristocratic family protection, Brexit regulatory navigation, transatlantic coordination.',
      },
    },
    {
      name: 'BSS Middle East Lab',
      updates: {
        leadership: '[ADDED] Regional Director with State Department background. Reports to BSS HQ.',
        services: '[ADDED] Gulf state operations, oil & gas security, royal family liaison, regional travel security, cultural protocol consulting.',
      },
    },
    {
      name: 'BSS New York Lab',
      updates: {
        leadership: '[ADDED] NYC Station Chief with Wall Street experience. Reports to BSS HQ.',
        services: '[ADDED] Financial sector security, hedge fund protection, media crisis response, Manhattan executive security, UN and diplomatic support.',
      },
    },
    {
      name: 'BSS Strategic Advisors',
      updates: {
        leadership: '[ADDED] Senior partners with combined military, intelligence, and corporate experience.',
        services: '[ADDED] C-suite advisory, board security briefings, M&A due diligence, hostile takeover defense, corporate espionage prevention.',
      },
    },
    {
      name: 'Barclay & Sterling',
      updates: {
        leadership: '[ADDED] Managing Partners with old money connections and modern security expertise.',
        services: '[ADDED] Ultra-high-net-worth family security, estate protection, art and asset security, family office integration, generational wealth protection.',
      },
    },
    {
      name: 'Hale Industries',
      updates: {
        services: '[ADDED] Legacy manufacturing, diversified holdings, family office management, philanthropic coordination, next-generation development.',
      },
    },
    {
      name: 'Harrington Global',
      updates: {
        leadership: '[ADDED] Richard Cole Harrington (Chairman), board of trusted family advisors.',
        services: '[ADDED] International investments, real estate holdings, venture capital, family legacy management, philanthropic foundations.',
      },
    },
    {
      name: "Jasper's Iron Council",
      updates: {
        services: '[ADDED] Elite advisory group for BSS. Strategic guidance, crisis consultation, leadership mentorship, succession planning, external perspective.',
      },
    },
    {
      name: 'Romano Ventures',
      updates: {
        services: '[ADDED] Italian-American investment portfolio, real estate development, restaurant and hospitality holdings, family legacy businesses.',
      },
    },
    {
      name: 'Sapientia Minervae (The Wives Club)',
      updates: {
        leadership: '[ADDED] Rotating leadership among founding members. Elena Barrett, Addie Barrett, Harper Reynolds as core council.',
        services: '[ADDED] Elite women\'s support network, crisis mutual aid, social coordination, charitable giving coordination, mentorship matching, travel support.',
      },
    },
    {
      name: "Sara's CrossFit Empire",
      updates: {
        services: '[ADDED] Elite CrossFit training facilities, athletic coaching, competition preparation, fitness retreats, athlete management.',
      },
    },
    {
      name: 'Shen International Holdings',
      updates: {
        leadership: '[ADDED] Chinese-American family leadership with both Beijing and US board representation.',
        services: '[ADDED] US-China business bridge, import/export facilitation, cultural consulting, investment coordination, regulatory navigation.',
      },
    },
    {
      name: 'Strategic Response Team (SRT)',
      updates: {
        leadership: '[ADDED] Hawk Barrett (Head), senior operators with Tier 1 backgrounds.',
        services: '[ADDED] Rapid deployment security, crisis extraction, protective intelligence, threat assessment, high-risk travel support.',
      },
    },
    {
      name: 'Texas Event Company',
      updates: {
        leadership: '[ADDED] Founder with BSS family connection, events expertise, Southern hospitality tradition.',
      },
    },
    {
      name: 'The Alloy Network',
      updates: {
        leadership: '[ADDED] Distributed leadership across member organizations. Coordination council meets quarterly.',
        services: '[ADDED] Cross-industry security intelligence sharing, joint training programs, resource pooling for major events, best practices development.',
      },
    },
    {
      name: 'The Forge (BSS HQ)',
      updates: {
        leadership: '[ADDED] Jasper Barrett (CEO), Harper Reynolds (COO), Addie Barrett (Managing Partner), Hawk Barrett (Head of Operations).',
        services: '[ADDED] Central command for all BSS operations, client intake, strategic planning, training center, crisis command, executive offices.',
      },
    },
    {
      name: 'The Foundry',
      updates: {
        leadership: '[ADDED] Technical directors with intelligence community backgrounds. Reports to BSS leadership.',
        services: '[ADDED] Cyber security operations, digital forensics, threat intelligence, secure communications, penetration testing, dark web monitoring.',
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

  // =============================================
  // ADD CRISIS RESOLUTIONS
  // =============================================
  console.log('\n--- Adding Crisis Resolutions ---\n');

  const crisisResolutions = [
    {
      name: 'African Operation',
      resolution: '[ADDED] BSS coordinated with local assets and private military contractors. Extracted key personnel before situation escalated. Established ongoing monitoring for client interests in region.',
    },
    {
      name: 'Airline System Outage',
      resolution: '[ADDED] Cyber team identified ransomware source within 6 hours. Negotiated with attackers while simultaneously restoring from secure backups. Systems restored with minimal data loss. Enhanced security protocols implemented.',
    },
    {
      name: 'Asia Tech Espionage Case',
      resolution: '[ADDED] Traced IP theft to insider threat. Coordinated with FBI and Chinese authorities. Recovered stolen data, prosecuted perpetrator. Client implemented BSS-designed compartmentalization protocols.',
    },
    {
      name: 'Biotech Sabotage',
      resolution: '[ADDED] Identified disgruntled former researcher. Recovered sabotaged research data from off-site backups. Criminal prosecution and civil suit recovered damages. Enhanced lab security protocols.',
    },
    {
      name: 'Corporate IP Leak',
      resolution: '[ADDED] Digital forensics traced leak to compromised vendor. Contained exposure through coordinated NDA enforcement. Competitive damage minimized through strategic counter-messaging.',
    },
    {
      name: 'European Trade Disruption',
      resolution: '[ADDED] Navigated Brexit complications and supply chain issues. Rerouted critical shipments, established new EU relationships. Client maintained market position despite disruption.',
    },
    {
      name: 'Failed Rocket Launch',
      resolution: '[ADDED] Crisis communications managed investor and public response. Investigation support identified manufacturing defect. Reputation recovery campaign positioned failure as learning opportunity.',
    },
    {
      name: 'Family Foundation Threat',
      resolution: '[ADDED] Identified extortion attempt from disgruntled former employee. Gathered evidence for prosecution while protecting family privacy. Quiet settlement with NDA, enhanced vetting protocols.',
    },
    {
      name: 'Finance Sector Crisis',
      resolution: '[ADDED] Rapid response team deployed during market volatility. Protected executive communications, managed media narrative. Client emerged with reputation intact despite sector-wide turmoil.',
    },
    {
      name: 'Harper Dating Tech Breach',
      resolution: '[ADDED] Contained data exposure within 12 hours. Identified vulnerability and patched. Managed user notification and media response. Enhanced encryption implemented across platform.',
    },
    {
      name: 'Hong Kong Bribery Case',
      resolution: '[ADDED] Coordinated with FCPA attorneys and Hong Kong ICAC. Protected client executives while cooperating with investigation. Settlement reached without admission of guilt. Compliance overhaul implemented.',
    },
    {
      name: 'London Summit Crisis',
      resolution: '[ADDED] Security team neutralized threat before summit began. Coordinated with MI5 and Metropolitan Police. Event proceeded without public awareness of averted incident.',
    },
    {
      name: 'Luxury Real Estate Financing Scandal',
      resolution: '[ADDED] Identified money laundering through property transactions. Cooperated with FinCEN while protecting legitimate investors. Properties divested through controlled process.',
    },
    {
      name: 'Media Crisis - Senator',
      resolution: '[ADDED] Rapid response within 2 hours of story breaking. Strategic media placement balanced narrative. Senator survived election with managed reputation rehabilitation.',
    },
    {
      name: 'Medical System Ransomware',
      resolution: '[ADDED] Isolated infected systems, restored from air-gapped backups. Zero ransom paid. Patient data protected. FBI involvement led to perpetrator arrest. Hospital system now BSS-secured.',
    },
    {
      name: 'Mining Safety Disaster',
      resolution: '[ADDED] Emergency response coordinated with local authorities. Family support provided to victims. Media managed to focus on response quality. Regulatory changes advocated to prevent recurrence.',
    },
    {
      name: 'Museum Heist Prevention',
      resolution: '[ADDED] Intelligence identified inside threat before execution. Coordinated with FBI Art Crime Team. Would-be thieves arrested, collection secured. Enhanced security protocols implemented.',
    },
    {
      name: 'Nuclear Facility Threat',
      resolution: '[ADDED] Credible threat assessed and neutralized through coordination with NRC and FBI. Facility secured without public panic. Threat actor identified and monitored.',
    },
    {
      name: 'Oil Platform Evacuation',
      resolution: '[ADDED] Weather emergency required rapid evacuation. BSS coordinated helicopter assets and Coast Guard. All personnel extracted safely. Operations resumed within 72 hours.',
    },
    {
      name: 'Pharmaceutical Recall',
      resolution: '[ADDED] Managed recall logistics while controlling narrative. Identified contamination source in supply chain. Competitor involvement discovered and addressed legally.',
    },
    {
      name: 'Political Campaign Hack',
      resolution: '[ADDED] Contained leak within 4 hours. Counter-narrative deployed through friendly media. Original source discredited. Campaign recovered in polls within two weeks.',
    },
    {
      name: 'Private School Threat',
      resolution: '[ADDED] Credible threat identified through social media monitoring. Coordinated with local law enforcement. Threat actor detained, students never aware of danger. Enhanced campus security implemented.',
    },
    {
      name: 'Professional Sports Scandal',
      resolution: '[ADDED] Managed media narrative for athlete client. Strategic interviews and community work rehabilitated image. Endorsement deals partially recovered after 6-month campaign.',
    },
    {
      name: 'Resort Security Breach',
      resolution: '[ADDED] Identified insider threat stealing guest information. Contained breach, notified affected guests with premium privacy protection offered. Criminal prosecution, no lawsuits filed.',
    },
    {
      name: 'Shipping Container Crisis',
      resolution: '[ADDED] Traced suspicious containers, coordinated with Coast Guard and CBP. Contraband interdicted without client liability. Enhanced supply chain vetting implemented.',
    },
    {
      name: 'Silicon Valley Founder Stalking',
      resolution: '[ADDED] 24/7 protection deployed. Stalker identified through digital forensics. Restraining order and criminal charges. Founder maintained low profile during prosecution.',
    },
    {
      name: 'Social Media Executive Doxxing',
      resolution: '[ADDED] Family relocated within 6 hours. Counter-measures deployed to flood search results. Legal action against doxxers. Executive resumed public role after 3-month cooling period.',
    },
    {
      name: 'Startup Due Diligence Failure',
      resolution: '[ADDED] Fraud identified before investment closed. Evidence package assembled for SEC referral. Investor reputation protected through careful messaging. Fraudster prosecuted.',
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
      console.log(`  ✓ ADDED resolution: ${crisis.name}`);
    } else if (existing) {
      console.log(`  - Already has resolution: ${crisis.name}`);
    } else {
      console.log(`  ✗ Not found: ${crisis.name}`);
    }
  }

  console.log('\n========================================');
  console.log('ALL GAPS ENHANCED');
  console.log('========================================');
  console.log('\nAll additions marked with [ADDED] or [ENHANCED]');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
