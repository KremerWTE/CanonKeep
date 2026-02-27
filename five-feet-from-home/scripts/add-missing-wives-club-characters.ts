import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get the project
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  const characters = [
    // === CASSIE DRAKE ===
    {
      name: 'Cassandra "Cassie" Drake',
      firstName: 'Cassandra',
      lastName: 'Drake',
      nickname: 'Cassie',
      archetype: 'Finance/Biotech Powerhouse',
      hubLocation: 'Los Angeles',
      affiliationRole: 'Energy, natural resources, biotech, and large-scale farming finance. Western/Midwestern powerhouse tied into big finance. Agri-business / energy / biotech finance queen.',
      wivesClubRole: 'Finance & Biotech Lead',
      personality: 'Power player in finance circles',
      relationships: 'Courted by Riley Bishop (Northwest lead) for tech/start-up networks. Close to Nessa Caldwell for sports/finance crossover deals. Allies with Harper Steele and European section leads for strategic partnerships.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === BROOKE TANNER ===
    {
      name: 'Brooke Tanner',
      firstName: 'Brooke',
      lastName: 'Tanner',
      archetype: 'Pro Athlete / Fitness Entrepreneur',
      modeledAfter: 'Dani Rhodes',
      affiliationRole: 'Pro athlete turned fitness entrepreneur wife',
      wivesClubRole: 'Athlete / Fitness Member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === CAROLINE REILLY-KEANE ===
    {
      name: 'Caroline Reilly-Keane',
      firstName: 'Caroline',
      lastName: 'Reilly-Keane',
      archetype: 'Wives Club Member',
      wivesClubRole: 'Member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === TAYLOR HALE ===
    {
      name: 'Taylor Hale',
      firstName: 'Taylor',
      lastName: 'Hale',
      archetype: 'Olympian / Foundation Leader',
      age: '30',
      appearance: '5\'8", toned build, long blonde hair often in a ponytail, piercing blue eyes.',
      modeledAfter: 'Julie Ertz with a touch of Hilary Knight (power athlete beauty)',
      background: 'Former Olympic-level soccer midfielder, two-time World Cup champion. Retired early after injuries but still serves as an ambassador for women\'s sports. Runs a foundation supporting girls in athletics.',
      personality: 'Competitive, disciplined, loyal. Seen as "sports royalty," she carries herself with confidence but no arrogance.',
      affiliationRole: 'Celebrity athlete credibility and brand sponsorship power. Connects the group into Nike, ESPN, Olympic committees, and high-visibility sports philanthropy.',
      wivesClubRole: 'Athletic Credibility Lead',
      relationships: 'Married to Marcus Hale. Balances Brooke\'s more down-to-earth sports vibe.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === MARCUS HALE ===
    {
      name: 'Marcus Hale',
      firstName: 'Marcus',
      lastName: 'Hale',
      archetype: 'Husband / Sports Figure',
      relationships: 'Married to Taylor Hale',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === JORDAN VEGA ===
    {
      name: 'Jordan Vega',
      firstName: 'Jordan',
      lastName: 'Vega',
      archetype: 'Global Brand Ambassador',
      age: '35',
      appearance: '5\'7", dark brunette with sleek waves, sharp cheekbones, and a radiant smile.',
      modeledAfter: 'Alex Morgan with a touch of Eva Longoria glam',
      background: 'One of the most famous U.S. soccer players of her era, the face of women\'s sports marketing. Continues to play at a high level internationally while balancing family life.',
      personality: 'Charismatic, media-savvy, polished. She thrives under the spotlight and uses it deliberately to advocate for equality in sports and pay.',
      affiliationRole: 'The global brand ambassador. She brings star power and connects the group into international media, Olympic networks, and global sponsorships.',
      wivesClubRole: 'Global Brand Ambassador',
      relationships: 'Married to Alex Vega. Rivals Nessa and Cassie in sheer influence.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ALEX VEGA ===
    {
      name: 'Alex Vega',
      firstName: 'Alex',
      lastName: 'Vega',
      archetype: 'Training Partner / Triathlete',
      affiliationRole: 'Training partner and Ironman triathlete, not tied to BSS.',
      relationships: 'Married to Jordan Vega. Close friend of Chris (training partner).',
      sourceFiles: 'Chris background expnasion.docx, Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ELISE DUBOIS ===
    {
      name: 'Elise Dubois',
      firstName: 'Elise',
      lastName: 'Dubois',
      archetype: 'Lifestyle/Fashion Queen',
      age: '32',
      appearance: '5\'6", French-Canadian, light brown hair with blonde highlights, hazel eyes, stylish but approachable.',
      modeledAfter: 'A cross between Angela Price (Carey\'s wife) and Olivia Palermo (elegant, chic)',
      background: 'Former fashion buyer turned lifestyle blogger. Founded a boutique lifestyle brand that blends hockey culture with Canadian/French elegance.',
      personality: 'Warm, witty, stylish. Known for being both glamorous and approachable, she is loved by fans almost as much as her husband.',
      affiliationRole: 'The style and lifestyle queen. She brings fashion and branding reach, Canadian sponsorships, and a bridge into NHL celebrity culture.',
      wivesClubRole: 'Lifestyle/Fashion Lead, Canadian Wives Club member',
      relationships: 'Married to Vincent Dubois. Natural ally to Charlie in the "social connector" role. Bonds with Cassie over fashion/finance & luxury branding.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === VINCENT DUBOIS ===
    {
      name: 'Vincent Dubois',
      firstName: 'Vincent',
      lastName: 'Dubois',
      archetype: 'NHL Player',
      relationships: 'Married to Elise Dubois',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === SAVANNAH "SAVVY" KNOX ===
    {
      name: 'Savannah "Savvy" Knox',
      firstName: 'Savannah',
      lastName: 'Knox',
      nickname: 'Savvy',
      archetype: 'Fighter / Rebel',
      modeledAfter: 'Ronda Rousey',
      personality: 'The fighter archetype, very different energy. Bold, unpolished, outsider/rebel energy.',
      affiliationRole: 'Fighter / athlete with outsider energy',
      wivesClubRole: 'Outsider member - doesn\'t "fit the mold" forcing others to navigate her unpolished presence',
      relationships: 'Teases Cassie Varela relentlessly but also protects her. Helps Camila bond with the baby through Lila\'s classes.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === CASSANDRA "CASSIE" VARELA ===
    {
      name: 'Cassandra "Cassie" Varela',
      firstName: 'Cassandra',
      lastName: 'Varela',
      nickname: 'Cassie',
      archetype: 'Wholesome/Media Faith Anchor',
      modeledAfter: 'Candace Cameron Bure',
      affiliationRole: 'Wholesome/media faith anchor',
      wivesClubRole: 'Media & Faith Communications',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === LAUREN STEELE ===
    {
      name: 'Lauren Steele',
      firstName: 'Lauren',
      lastName: 'Steele',
      archetype: 'Media Professional / Fixer',
      modeledAfter: 'Erin Andrews',
      affiliationRole: 'Polished media professional, fixer',
      wivesClubRole: 'Media & PR Fixer',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === FAITH PARKER ===
    {
      name: 'Faith Parker',
      firstName: 'Faith',
      lastName: 'Parker',
      archetype: 'Celebrity / Country Music Star',
      modeledAfter: 'Carrie Underwood',
      hubLocation: 'Nashville',
      affiliationRole: 'Celebrity star-power and Southern/Nashville connections. Member of Sapientia Minervae, Southeast section (Nashville/Atlanta).',
      wivesClubRole: 'Celebrity Influence, Southeast Minervae',
      personality: 'Celebrity wife inside the circle with strong Southern/Nashville connections',
      relationships: 'Engaged to a retired NFL player who invests in music festivals and wellness retreats. Close to Lila Chamberlain and Nashville cultural & philanthropic wing. Pairs naturally with Cassie Varela in Southern/Nashville events. Co-hosts music/charity festivals with Jenna Carter.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === DANIELLE "DANI" CROSS ===
    {
      name: 'Danielle "Dani" Cross',
      firstName: 'Danielle',
      lastName: 'Cross',
      nickname: 'Dani',
      archetype: 'Canadian/Hollywood Link',
      modeledAfter: 'Elisha Cuthbert',
      affiliationRole: 'Fun, glamorous, Canadian/Hollywood link',
      wivesClubRole: 'Canadian Wives Club member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === MARCUS "CAV" KELLAN ===
    {
      name: 'Marcus "Cav" Kellan',
      firstName: 'Marcus',
      lastName: 'Kellan',
      nickname: 'Cav',
      archetype: 'Pro Cyclist - Flashy Sprinter',
      modeledAfter: 'Mark Cavendish',
      personality: 'Cocky showman. Flashy sprinter-celebrity, constantly in the news for either records or outbursts.',
      affiliationRole: 'BSS client - BSS manages his brand',
      relationships: 'Significant other is a glamorous influencer',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === CALLUM "IRON" REEVES ===
    {
      name: 'Callum "Iron" Reeves',
      firstName: 'Callum',
      lastName: 'Reeves',
      nickname: 'Iron',
      archetype: 'Pro Cyclist - Stoic Grinder',
      modeledAfter: 'Cadel Evans',
      personality: 'Stoic grinder. Long-term quiet client.',
      affiliationRole: 'BSS client - used by BSS to access sports governance, foundations, and endurance branding',
      relationships: 'Significant other is a humanitarian doctor',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === GARETH "GRIT" MORGAN ===
    {
      name: 'Gareth "Grit" Morgan',
      firstName: 'Gareth',
      lastName: 'Morgan',
      nickname: 'Grit',
      archetype: 'Pro Cyclist - Loyal Veteran',
      modeledAfter: 'Geraint Thomas',
      personality: 'Loyal wit. Steady pro, loyal to BSS.',
      affiliationRole: 'BSS client - often defends them in sports politics',
      relationships: 'Significant other is a grounded teacher',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === THEO POJAN ===
    {
      name: 'Theo Pojan',
      firstName: 'Theo',
      lastName: 'Pojan',
      archetype: 'Pro Cyclist - Playful Prodigy',
      modeledAfter: 'Tadej Pogačar',
      personality: 'Playful prodigy.',
      affiliationRole: 'High-profile BSS client whose career BSS protects (sponsorship deals, doping allegations, stalkers, data leaks). Treated not as an operator, but as a high-profile client.',
      relationships: 'Significant other is an adventurous physiologist',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },
  ];

  console.log(`Adding ${characters.length} missing characters...`);

  for (const char of characters) {
    // Check if character already exists
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { name: { contains: char.firstName + ' ' + char.lastName } }
        ]
      }
    });

    if (existing) {
      console.log(`  Skipping ${char.name} - already exists as ${existing.name}`);
      continue;
    }

    await prisma.character.create({
      data: {
        projectId: project.id,
        ...char,
      }
    });
    console.log(`  Added: ${char.name}`);
  }

  // Get final count
  const count = await prisma.character.count();
  console.log(`\nTotal characters in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
