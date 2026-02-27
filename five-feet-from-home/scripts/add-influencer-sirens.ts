import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING INFLUENCER SIRENS ===\n");

  const influencerSirens = [
    {
      name: 'Bailey Brewer',
      nickname: 'Towball Queen',
      firstName: 'Bailey',
      lastName: 'Brewer',
      archetype: 'Siren - The Country Queen / Towball Princess',
      modeledAfter: 'Bailey Brewer (Towball Queen)',
      appearance: 'Southern country beauty with curves that stop traffic. Long hair, denim and boots aesthetic, all-American country girl appeal.',
      wardrobeStyle: 'Country glam - cutoffs, boots, truck tailgate aesthetic turned runway.',
      background: `Country girl who built massive social media following through truck culture and southern charm. The "Towball Queen" became her brand - trucks, tailgates, and undeniable curves. Leveraged following into influencer empire.`,
      personality: 'Down-to-earth Southern charm with business savvy underneath. Knows her brand and works it. Approachable but sharp.',
      bssRole: 'Siren Asset - The Country Queen. Perfect for Southern/rural elite, truck culture crossover, and NASCAR/country music circuit infiltration.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Alexis Amore',
      nickname: 'Lexi Amor',
      firstName: 'Alexis',
      lastName: 'Amore',
      archetype: 'Siren - The Latina Temptress',
      modeledAfter: 'Alexis Amor',
      appearance: 'Stunning Latina curves, dark flowing hair, sultry eyes. The embodiment of passionate beauty.',
      wardrobeStyle: 'Bold, colorful, unapologetically sexy Latin aesthetic.',
      background: `Built following through passionate, unfiltered content. Known for her curves and confident sexuality. Became a symbol of body positivity and Latin beauty.`,
      personality: 'Passionate, fiery, unapologetic. Owns her sexuality completely. Protective of her community.',
      bssRole: 'Siren Asset - The Passionate Temptress. Perfect for Latin American operations and targets who crave fire.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Sienna Senter',
      nickname: 'Sienna Twin',
      firstName: 'Sienna',
      lastName: 'Senter',
      archetype: 'Siren - The Twin Fantasy (Part 1)',
      modeledAfter: 'Sentertwins',
      appearance: 'Identical twin beauty - blonde, fit, perfectly coordinated aesthetic. The fantasy of two.',
      wardrobeStyle: 'Matching outfits, coordinated looks, twin aesthetic perfection.',
      background: `One half of the famous Senter Twins. Built empire through twin content and coordinated social media presence. The fantasy of identical beauty doubled.`,
      personality: 'Works perfectly with her twin. Finishing each other sentences. Uses twin dynamic as ultimate disorienting weapon.',
      bssRole: 'Siren Asset - The Twin Fantasy. Always deployed with sister. Double the impact, double the distraction.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Sierra Senter',
      nickname: 'Sierra Twin',
      firstName: 'Sierra',
      lastName: 'Senter',
      archetype: 'Siren - The Twin Fantasy (Part 2)',
      modeledAfter: 'Sentertwins',
      appearance: 'Identical twin beauty - blonde, fit, perfectly coordinated with her sister. Mirror image perfection.',
      wardrobeStyle: 'Matching outfits, coordinated looks, twin aesthetic perfection.',
      background: `Other half of the Senter Twins. Together they command rooms and confuse targets. The ultimate double-act.`,
      personality: 'The slightly bolder twin. Takes the lead while sister plays support. Twin telepathy level coordination.',
      bssRole: 'Siren Asset - The Twin Fantasy. Always with sister. Used for high-value targets who need overwhelming.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Kennedy Paige',
      nickname: 'KP',
      firstName: 'Kennedy',
      lastName: 'Paige',
      archetype: 'Siren - The Instagram Princess',
      modeledAfter: 'Kennedy Paige',
      appearance: 'Picture-perfect Instagram aesthetic. Flawless features, curated beauty, influencer polish.',
      wardrobeStyle: 'Instagram-perfect - trending styles, designer collaborations, always photo-ready.',
      background: `Built massive Instagram following through perfect aesthetics and lifestyle content. Knows exactly how to present herself. Every post calculated for maximum impact.`,
      personality: 'Curated perfection on surface, strategic mind underneath. Masters the algorithm of attraction.',
      bssRole: 'Siren Asset - The Instagram Princess. Perfect for social media-connected targets and influencer circles.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Brianna Blossom',
      nickname: 'Bri Blossom',
      firstName: 'Brianna',
      lastName: 'Blossom',
      archetype: 'Siren - The Blossoming Beauty',
      modeledAfter: 'Bri Blossom',
      appearance: 'Fresh-faced beauty with natural curves. The "blossom" aesthetic - soft, natural, inviting.',
      wardrobeStyle: 'Soft, feminine, floral themes. Natural beauty enhanced not hidden.',
      background: `Rose to fame through authentic, natural content. Known for genuine personality and approachable beauty. The anti-fake aesthetic.`,
      personality: 'Genuinely sweet with hidden depths. Uses approachability as her weapon. Everyone trusts her immediately.',
      bssRole: 'Siren Asset - The Natural Beauty. Trust-building specialist. Targets open up to her.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Annie Agar',
      nickname: 'Annie',
      firstName: 'Annie',
      lastName: 'Agar',
      archetype: 'Siren - The Sports Media Sweetheart',
      modeledAfter: 'Annie Agar (Sports Social Media)',
      appearance: 'All-American sports broadcaster beauty. Brunette, athletic, camera-ready smile. The fantasy sports anchor.',
      wardrobeStyle: 'Sports media chic - blazers, team gear styled fashionably, sideline ready.',
      background: `Built massive sports social media following through wit, charm, and genuine sports knowledge. Can talk football with the boys and turn heads doing it.`,
      personality: 'Witty, sports-smart, one of the guys energy but undeniably feminine. Disarms male targets through genuine sports banter.',
      bssRole: 'Siren Asset - The Sports Sweetheart. Perfect for athlete targets, sports executives, and locker room adjacent operations.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Ruby Duckett',
      nickname: 'Rubber Ducky',
      firstName: 'Ruby',
      lastName: 'Duckett',
      archetype: 'Siren - The Playful Tease',
      modeledAfter: 'Rubberduckybathbaby',
      appearance: 'Playful, curvy, bubbly personality that matches her aesthetic. Bath-time fantasy personified.',
      wardrobeStyle: 'Playful, bubble aesthetic, retro pinup meets modern influencer.',
      background: `Built following through playful, teasing content with signature bath aesthetic. The rubber ducky became her brand. Masters the art of playful seduction.`,
      personality: 'Playful, teasing, never quite serious. Makes everything feel like a game. Disarms through laughter.',
      bssRole: 'Siren Asset - The Playful Tease. Uses humor and playfulness to lower guards.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Emily Twinsney',
      nickname: 'Em Twins',
      firstName: 'Emily',
      lastName: 'Twinsney',
      archetype: 'Siren - The Disney Princess',
      modeledAfter: 'Emily Twinsney',
      appearance: 'Disney princess aesthetic - wholesome beauty with magical appeal. The fantasy girl-next-door.',
      wardrobeStyle: 'Disney-inspired, princess aesthetic, wholesome but alluring.',
      background: `Built following through Disney/magical girl aesthetic. Known for princess energy and wholesome-yet-alluring content. The fantasy of the girl you bring home to mom.`,
      personality: 'Magical girl energy, genuinely sweet, but knows exactly what she is doing. Uses wholesome image strategically.',
      bssRole: 'Siren Asset - The Disney Princess. Perfect for family-adjacent targets who need wholesome cover.',
      sourceFiles: 'Social Media Influencers'
    },
    {
      name: 'Melissa Lane',
      nickname: 'Ms. Lane',
      firstName: 'Melissa',
      lastName: 'Lane',
      archetype: 'Siren - The Crazy Teacher',
      modeledAfter: 'Ms. Lane (littlecrazyteacher)',
      appearance: 'Hot teacher fantasy personified. Professional by day, wild by nature. Glasses, pencil skirts, hidden fire.',
      wardrobeStyle: 'Teacher chic - pencil skirts, glasses, blouses that suggest more. Classroom to bedroom aesthetic.',
      background: `Former teacher who built massive social media following through "crazy teacher" content. The forbidden teacher fantasy made real. Education meets seduction.`,
      personality: 'Structured and professional on surface, genuinely wild underneath. Uses authority figure dynamic as weapon.',
      bssRole: 'Siren Asset - The Teacher Fantasy. Perfect for academic/professional targets. Authority figure seduction specialist.',
      sourceFiles: 'Social Media Influencers'
    }
  ];

  for (const siren of influencerSirens) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: siren.name },
          { nickname: siren.nickname }
        ],
        projectId: project.id
      }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...siren,
          clubsAssociations: 'Sirens Network, Vixens, Influencer Division'
        }
      });
      console.log(`Created: ${siren.name} (${siren.nickname}) - Modeled after: ${siren.modeledAfter}`);
    } else {
      console.log(`Exists: ${siren.name}`);
    }
  }

  // Final count
  const sirenCount = await prisma.character.count({
    where: {
      clubsAssociations: { contains: 'Sirens' },
      projectId: project.id
    }
  });

  const totalChars = await prisma.character.count();

  console.log(`\n=== TOTAL SIRENS: ${sirenCount} ===`);
  console.log(`=== TOTAL CHARACTERS: ${totalChars} ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
