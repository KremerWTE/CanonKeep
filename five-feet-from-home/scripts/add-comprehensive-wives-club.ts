import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  const characters = [
    // === HARPER STEELE ===
    {
      name: 'Harper Steele',
      firstName: 'Harper',
      lastName: 'Steele',
      archetype: 'Media Queen / Wives Club Founder',
      age: '38',
      appearance: '5\'9", blonde with sharp features, athletic frame, confident on-camera posture.',
      modeledAfter: 'Samantha Ponder with touches of Erin Andrews\' polish',
      background: 'Former college soccer player turned ESPN-style sideline reporter. Rose through the ranks to host Hard Hits, a brash, locker-room banter sports talk show with national reach.',
      personality: 'Charismatic, competitive, razor-sharp wit. Knows how to run a panel of loud men without losing her composure. Off-camera, more serious and strategic than people realize.',
      affiliationRole: 'Founder of Sapientia Minervae (the Wives Club). Uses her media power and access to shape narratives, kill scandals, and elevate the group\'s image. Serves as the Club\'s queen bee in the public eye.',
      wivesClubRole: 'Founder / East Coast Queen Bee (Media & Politics)',
      hubLocation: 'East Coast',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === SELENE MARQUEZ ===
    {
      name: 'Selene Marquez',
      firstName: 'Selene',
      lastName: 'Marquez',
      archetype: 'Panel Anchor / Chaos Coordinator',
      age: '35',
      appearance: '5\'7", brunette with caramel highlights, big smile, athletic-chic fashion.',
      modeledAfter: 'Charissa Thompson with a Latina edge',
      background: 'Began as a sideline reporter in college football, transitioned into co-hosting major sports talk shows. Became the sarcastic, quick-fire foil to Harper on Hard Hits.',
      personality: 'Funny, unfiltered, loves stirring the pot with sharp banter. Social butterfly, thrives on energy and chaos.',
      affiliationRole: 'Functions as the "chaos coordinator." She\'s playful but dangerous, often catching intel during media events. Tied romantically into the BSS orbit.',
      wivesClubRole: 'Chaos Coordinator / Media',
      relationships: 'Adds social capital in sports/media circles. Harper & Selene have playful banter dynamic.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ELISE ROMANO ===
    {
      name: 'Elise Romano',
      firstName: 'Elise',
      lastName: 'Romano',
      archetype: 'Analyst/Anchor - Data Storyteller',
      age: '33',
      appearance: '5\'5", brunette with sharp eyes and bright smile. Polished but approachable, with a glam-yet-smart style.',
      modeledAfter: 'Kay Adams',
      background: 'Grew up in Chicago, studied communications at DePaul. Got her break in NFL Network\'s morning show, then became Hard Hits\' "stats and strategy" brain.',
      personality: 'Analytical, quick-thinking, balances humor with insight. Has a gift for making complex strategy sound sexy.',
      affiliationRole: 'The data storyteller. She translates analytics into narratives that sway sponsors, fans, and media. Brings sports-media credibility and crossover to corporate sponsors.',
      wivesClubRole: 'Analyst / Data Storyteller',
      relationships: 'Close ally of Nessa and Cassie, often helps package financial/policy decisions for public consumption. Pairs well with Cassie & Nessa on finance/policy/media crossovers.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === BRIANNA "BRI" KNIGHT ===
    {
      name: 'Brianna "Bri" Knight',
      firstName: 'Brianna',
      lastName: 'Knight',
      nickname: 'Bri',
      archetype: 'Field Reporter / Media Face',
      age: '31',
      appearance: '6\'0", athletic, striking presence, radiant smile. Dresses bold but professional.',
      modeledAfter: 'Maria Taylor',
      background: 'Former college basketball player at Georgia. Broke into sports broadcasting, known for interviews with top NFL and NBA players. Recruited onto Hard Hits to add legitimacy and star power.',
      personality: 'Warm, confident, direct. Not easily flustered, but not afraid to push hard questions.',
      affiliationRole: 'Acts as a connector between the Wives Club and players\' unions, athlete foundations, and sports media boards. Provides credibility and a broader network into the NBA/NFL world.',
      wivesClubRole: 'Stabilizing voice, bridges sports media, players\' associations, and philanthropic networks',
      relationships: 'Functions as a stabilizing voice in the wives\' debates, often siding with Layla/Caroline as the "rational" side.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === LAUREN "LO" MAREN ===
    {
      name: 'Lauren "Lo" Maren',
      firstName: 'Lauren',
      lastName: 'Maren',
      nickname: 'Lo',
      archetype: 'Sports Agent / Tough Enforcer',
      age: '34',
      appearance: '5\'7", brunette, fit, piercing hazel eyes. Dresses in sharp leather jackets, skinny jeans, boots. A no-frills, practical but attractive look.',
      modeledAfter: 'Kaniehtiio Horn (Tanis/Laura Mohr–style toughness from Letterkenny)',
      background: 'Grew up in Northern Ontario hockey culture, often the only woman in locker-room circles. Became a sports agent and player manager, specializing in crisis management for hockey players and junior leagues. Originally crossed paths with BSS when her clients were being blackmailed by organized crime. She held her own in negotiations, which caught Jasper\'s attention.',
      personality: 'Blunt, quick-tongued, intimidating when she needs to be. Fiercely protective of her people, especially younger women around sports culture. Not afraid to call out the Wives Club or the operators if she smells BS.',
      affiliationRole: 'Client turned ally (her agency uses BSS for high-stakes problems). Functions as a gatekeeper to Canadian sports talent and sponsorship deals.',
      wivesClubRole: 'Friend of the Wives Club — respected, but not fully inside. Canadian Wives Club member.',
      relationships: 'Selene & Lo = chaos + wrangler, often running interference in hockey/media scandals.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === NATALIE "NAT" SERRANO ===
    {
      name: 'Natalie "Nat" Serrano',
      firstName: 'Natalie',
      lastName: 'Serrano',
      nickname: 'Nat',
      archetype: 'Canadian Chairwoman',
      affiliationRole: 'Queen of the Canadian Wives Club. Controls Sports & Culture division.',
      wivesClubRole: 'Canada Chairwoman (Sports & Culture)',
      hubLocation: 'Canada',
      relationships: 'Harper Steele & Nat Serrano respect each other as "queens" of their clubs — occasional rivalry, but mutual benefit.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === MIA LAURENT ===
    {
      name: 'Mia Laurent',
      firstName: 'Mia',
      lastName: 'Laurent',
      archetype: 'Partner of Canadian Leader',
      relationships: 'Nat Serrano\'s girlfriend',
      wivesClubRole: 'Canadian Wives Club member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === BONNIE MCCRAE ===
    {
      name: 'Bonnie McCrae',
      firstName: 'Bonnie',
      lastName: 'McCrae',
      archetype: 'Sweet Small-Town Darling',
      modeledAfter: 'Bonnie McMurray (Letterkenny)',
      personality: 'Sweet, bubbly, beloved small-town darling',
      wivesClubRole: 'Younger member / "Little Sister"',
      relationships: 'Bonnie & Maddie = the "little sisters" across both clubs, often paired up at events.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === REMY EVERARD ===
    {
      name: 'Remy Everard',
      firstName: 'Remy',
      lastName: 'Everard',
      archetype: 'Pro Cyclist - Fiery Phenom',
      modeledAfter: 'Remco Evenepoel',
      personality: 'Fiery phenom. Social controversies or explosive statements create PR problems BSS has to manage.',
      affiliationRole: 'BSS client whose social controversies or explosive statements create PR problems BSS has to manage.',
      relationships: 'Significant other is a journalist partner.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === JONAS VINTER ===
    {
      name: 'Jonas Vinter',
      firstName: 'Jonas',
      lastName: 'Vinter',
      archetype: 'Pro Cyclist - Quiet Killer',
      modeledAfter: 'Jonas Vingegaard',
      personality: 'Quiet killer. Introverted star who needs protection from intrusive media, sponsorship conflicts, and rival sabotage.',
      affiliationRole: 'BSS client who needs protection from intrusive media, sponsorship conflicts, and rival sabotage.',
      relationships: 'Significant other is a private, loyal scientist.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ANYA NOVAK ===
    {
      name: 'Anya Novak',
      firstName: 'Anya',
      lastName: 'Novak',
      archetype: 'Sports Physiologist / Partner-Athlete',
      modeledAfter: 'Urška Žigart',
      background: 'Eastern European former skier turned sports physiologist.',
      personality: 'Grounded but adventurous. Performance expert and partner-athlete in the younger couple.',
      affiliationRole: 'Partner of Theo Pojan',
      relationships: 'Partner of Theo Pojan (the youngest operator). The younger couple.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === KENDALL "KENSI" ROURKE ===
    {
      name: 'Kendall "Kensi" Rourke',
      firstName: 'Kendall',
      lastName: 'Rourke',
      nickname: 'Kensi',
      archetype: 'Tough Field Operative',
      modeledAfter: 'Kensi Blye (NCIS: Los Angeles)',
      personality: 'Tough, capable, with a vulnerable side.',
      affiliationRole: 'Field investigator and tactical lead on joint ops. Known for going undercover in high-risk environments.',
      relationships: 'Partner/fiancé/husband is Mason "Deeks" Carrow. Often paired with her partner for chemistry and effectiveness.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === MASON "DEEKS" CARROW ===
    {
      name: 'Mason "Deeks" Carrow',
      firstName: 'Mason',
      lastName: 'Carrow',
      nickname: 'Deeks',
      archetype: 'Witty Street-Smart Operative',
      modeledAfter: 'Marty Deeks (NCIS: Los Angeles)',
      personality: 'Witty, street-smart, loyal partner.',
      affiliationRole: 'Undercover specialist and partner operative.',
      relationships: 'Partner of Kendall "Kensi" Rourke. Their relationship blends badass field capability with witty undercover street smarts.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === EVELYN HARTMANN ===
    {
      name: 'Evelyn Hartmann',
      firstName: 'Evelyn',
      lastName: 'Hartmann',
      archetype: 'Graceful Philanthropist',
      affiliationRole: 'The graceful philanthropist, humanitarian shield. Vince\'s wife.',
      wivesClubRole: 'Humanitarian / Philanthropic Wing',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === BAILEY BREWER ===
    {
      name: 'Bailey Brewer',
      firstName: 'Bailey',
      lastName: 'Brewer',
      archetype: 'Cam Star / Fashion Model',
      age: '27',
      hubLocation: 'Nashville, TN',
      appearance: 'Southern bombshell — sun-kissed blonde, denim cutoffs, boots, big smile.',
      background: 'Nashville-based cam star + swimsuit model; part-time influencer in the country music scene. Born in Nashville, raised in a rodeo family. Brief stint in pageants before pivoting into modeling and adult streaming.',
      personality: 'Sweet, bubbly, warm-hearted; sometimes underestimated because of her carefree charm.',
      affiliationRole: 'The "sweetheart" of the group, younger, bubbly, with crossover into fashion modeling. Ties to country music and Nashville entertainment scene.',
      wivesClubRole: 'Part of the Cam Star Collective tied to Brielle.',
      relationships: 'Addie\'s long-time friend from her early days in the industry. Natural bridge to Jenna Carter and Faith Parker in Nashville. Part of Brielle\'s circle with Renna Ryan and Nicole Brooks.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === JENNA CARTER ===
    {
      name: 'Jenna Carter',
      firstName: 'Jenna',
      lastName: 'Carter',
      archetype: 'Nashville Celebrity / Redemption Arc',
      modeledAfter: 'Jana Kramer',
      hubLocation: 'Nashville',
      background: 'Adds a redemptive arc — someone who has fallen hard (failed marriage, public struggles) but rebuilt her life with faith, music, and business savvy.',
      affiliationRole: 'Part of Nashville cultural & philanthropic wing. Southeast Minervae member.',
      wivesClubRole: 'Southeast Minervae (Nashville)',
      relationships: 'Mentor/confidante for Bella and Maddie, teaching them about resilience and self-worth. Co-hosts music/charity festivals with Faith Parker.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === LILA CHAMBERLAIN ===
    {
      name: 'Lila Chamberlain',
      firstName: 'Lila',
      lastName: 'Chamberlain',
      archetype: 'Dance Teacher / Entertainment Lead',
      modeledAfter: 'Lacey Chabert',
      hubLocation: 'Southeast',
      affiliationRole: 'Dance teacher, Southeast regional leader. Lead for Entertainment & Family Values.',
      wivesClubRole: 'Southeast Minervae Lead (Entertainment & Family Values)',
      relationships: 'Close with Faith Parker (they form the Nashville cultural & philanthropic wing). Collaborates on music-and-dance-focused charity events.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ANIK ARCHAMBAULT ===
    {
      name: 'Anik Archambault',
      firstName: 'Anik',
      lastName: 'Archambault',
      archetype: 'Former Figure Skater',
      modeledAfter: 'Self-inspired (Anik Archambault)',
      background: 'Former figure skater, French-Canadian elegance.',
      wivesClubRole: 'Canadian Wives Club member',
      relationships: 'Nessa & Anik cross paths in international cultural/policy circles (Ottawa–D.C.–NYC pipeline).',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === TESSA BONHOMME ===
    {
      name: 'Tessa Bonhomme',
      firstName: 'Tessa',
      lastName: 'Bonhomme',
      archetype: 'Olympian / Broadcaster',
      modeledAfter: 'Self-inspired (Tessa Bonhomme)',
      background: 'Olympian hockey player turned broadcaster.',
      wivesClubRole: 'Canadian Wives Club member',
      relationships: 'Tess & Caroline/Layla share athlete/medical/ethical backgrounds → natural alliance.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === CALLIE HAYES ===
    {
      name: 'Callie Hayes',
      firstName: 'Callie',
      lastName: 'Hayes',
      archetype: 'Southwest Regional Leader',
      modeledAfter: 'Kayla Wallace (Landman)',
      personality: 'Grounded, sharp, quietly magnetic presence — not loud like a Harper Steele or a Nat Serrano, but still someone who anchors a space with understated strength. Blends rural grit + quiet elegance, with ties to energy, land, and family legacy.',
      hubLocation: 'Southwest',
      affiliationRole: 'Southwest regional leader for Sapientia Minervae. Balances Harper Steele\'s East Coast dominance and Nat Serrano\'s control in Canada.',
      wivesClubRole: 'Southwest Minervae Lead (Energy & Land)',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === RILEY BISHOP ===
    {
      name: 'Riley Bishop',
      firstName: 'Riley',
      lastName: 'Bishop',
      archetype: 'Northwest Regional Leader',
      modeledAfter: 'Rachel Bilson',
      hubLocation: 'Northwest',
      affiliationRole: 'Northwest lead, specializes in tech/culture and start-up networks.',
      wivesClubRole: 'Northwest Minervae Lead (Timber & Sustainability / Tech)',
      relationships: 'Courts Isabella Marconi and Cassie Drake for tech/start-up networks.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === MOLLY GALLAGHER ===
    {
      name: 'Molly Gallagher',
      firstName: 'Molly',
      lastName: 'Gallagher',
      archetype: 'Lead College Football Sideline Reporter',
      age: '34',
      background: 'Lead college football sideline reporter who is polished and very well connected. Grew up in the Midwest, played lacrosse in college; degree in broadcast journalism. Rose up through regional sports networks, then got hired by a big Fox/FS1-type network.',
      personality: 'Confident, always prepared, mixed toughness + charm. Friendly but competitive. Values reputation and accuracy.',
      affiliationRole: 'Go-to for high-visibility college football scandals and storylines. Powerful media ally for sports/finance crossover deals.',
      wivesClubRole: 'Media ally',
      relationships: 'Harper Steele respects her professionalism, uses her as the "serious" balance. Selene Marquez teases her for being "too perfect" but secretly relies on her research. Cassie Drake & Nessa Caldwell see Molly as a powerful media ally. Younger women (Maddie, Bonnie, Chloe) idolize her.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === RENNA RYAN ===
    {
      name: 'Renna Ryan',
      firstName: 'Renna',
      lastName: 'Ryan',
      archetype: 'Cam Star / Business-Savvy',
      background: 'Part of the Cam Star Collective with Brielle.',
      personality: 'Known for her sultry persona and business savvy; often helps Bri with marketing strategies.',
      affiliationRole: 'Part of discreet subscription-based media empire with Brielle, Nicole, and Bailey.',
      wivesClubRole: 'Southwest Minervae orbit',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === NICOLE BROOKS ===
    {
      name: 'Nicole Brooks',
      firstName: 'Nicole',
      lastName: 'Brooks',
      archetype: 'Cam Star / Social Media Powerhouse',
      background: 'Part of the Cam Star Collective with Brielle.',
      personality: 'Playful, sarcastic, a social media powerhouse who knows how to drive traffic.',
      affiliationRole: 'Part of discreet subscription-based media empire with Brielle, Renna, and Bailey.',
      wivesClubRole: 'Southwest Minervae orbit',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === BRIELLE LAWSON ===
    {
      name: 'Brielle Lawson',
      firstName: 'Brielle',
      lastName: 'Lawson',
      archetype: 'Cam Star / Fitness Wellness Celebrity',
      background: 'Dual-life influencer: part mainstream fitness/wellness celebrity, part discreet cam star with her own small circle of fellow performers (Renna Ryan, Nicole Brooks, Bailey Brewer).',
      affiliationRole: 'Runs a discreet subscription-based media empire, leveraging tech platforms and influencer marketing.',
      wivesClubRole: 'Southwest Minervae member',
      relationships: 'Sometimes used in undercover ops by BSS — her charm and "harmless" persona make her an effective distraction or asset in social engineering missions.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },
  ];

  console.log(`Adding ${characters.length} characters...`);
  let added = 0;
  let skipped = 0;

  for (const char of characters) {
    // Check if character already exists
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { name: { contains: char.lastName } }
        ]
      }
    });

    if (existing && existing.name.includes(char.firstName)) {
      console.log(`  Skipping ${char.name} - already exists as ${existing.name}`);
      skipped++;
      continue;
    }

    try {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
        }
      });
      console.log(`  Added: ${char.name}`);
      added++;
    } catch (err: any) {
      console.log(`  Error adding ${char.name}: ${err.message}`);
    }
  }

  console.log(`\nAdded: ${added}, Skipped: ${skipped}`);

  const count = await prisma.character.count();
  console.log(`Total characters in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
