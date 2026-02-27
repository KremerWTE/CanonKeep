import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== ADDING WIVES CIRCLE CHARACTERS ===\n');

  const wivesCircle = [
    {
      name: 'Vivienne "Viv" Ross',
      firstName: 'Vivienne',
      lastName: 'Ross',
      nickname: 'Viv',
      archetype: 'Old Money Heiress',
      age: 'Early 40s',
      modeledAfter: 'Old money elegance - generations of wealth, subtle power',
      appearance: `Style: Vintage Hermès, subtle wealth that whispers rather than shouts. Classic pieces that have been in her family for decades.
Build: Elegant, refined posture
Hair: Perfectly maintained, never a strand out of place`,
      personality: `Understated, impeccably polite. The kind of woman who knows exactly what to buy and when because her family has been doing it for generations. Confidence that comes from never having to prove anything.`,
      background: `Old money, generational wealth. Her Rolodex includes families whose names are on buildings. Connected to Hamptons/Paris circles. Met the wives circle at Columbia sorority with Harper as connector-in-chief.

Role: The one with connections to old-money circles. Interior designer. Part of Harper's Columbia sorority network.`,
      wardrobeStyle: `**Overall Aesthetic:** Old Money Elegance - generational wealth whispered, not shouted

**Color Palette:**
- Primary: Navy, cream, camel, burgundy
- Accent: Gold (subtle, inherited pieces)
- Signature: Vintage Hermès

**Key Pieces:**
- Vintage Hermès scarves and bags (family heirlooms)
- Classic investment pieces passed down
- Cashmere everything
- Pearl studs (grandmother's)
- Quality leather goods

**Style Notes:**
- Subtle wealth that whispers
- Classic pieces with history
- Never trends, always timeless
- Quality over quantity for generations`,
      wivesClubRole: 'Wives Circle - Old Money Connections',
      hubLocation: 'New York / Hamptons / Paris',
      education: 'Columbia University',
      careerHistory: 'Interior Designer, Heiress',
    },
    {
      name: 'Natalia "Tali" Cruz',
      firstName: 'Natalia',
      lastName: 'Cruz',
      nickname: 'Tali',
      archetype: 'Former Wall Street / Angel Investor',
      age: 'Late 30s',
      modeledAfter: 'Sharp legal/finance type - precise, analytical, cutting when needed',
      appearance: `Style: Sharp blazers over silk. Fashion choices reflect legal precision—nothing frivolous, everything intentional.
Build: Polished, professional
Hair: Sleek, controlled`,
      personality: `Direct, analytical, occasionally cutting. Sharp, precise, analytical. The one who reads contracts before signing anything and notices when terms aren't favorable. Legal precision in everything.`,
      background: `Legal background—sharp, precise, analytical. Married to someone in finance or law. Former Wall Street, now angel investor. Met the wives circle at Columbia sorority with Harper.

Role: The analytical one who catches what others miss. Angel investor with sharp instincts.`,
      wardrobeStyle: `**Overall Aesthetic:** Legal Precision - sharp, intentional, nothing frivolous

**Color Palette:**
- Primary: Black, navy, white, gray
- Accent: Gold jewelry (understated)
- Power: Red lips for negotiations

**Key Pieces:**
- Sharp blazers (tailored perfectly)
- Silk blouses
- Quality heels (practical height)
- Leather portfolio/bag
- Statement watch

**Style Notes:**
- Nothing frivolous, everything intentional
- Legal precision in fashion
- Can intimidate in silk
- Professional armor`,
      wivesClubRole: 'Wives Circle - Legal/Finance',
      hubLocation: 'New York',
      education: 'Columbia University, Law School',
      careerHistory: 'Former Wall Street, Angel Investor',
    },
    {
      name: 'Camille "Cam" Whitmore',
      firstName: 'Camille',
      lastName: 'Whitmore',
      nickname: 'Cam',
      archetype: 'Southern Influencer / Cookbook Author',
      age: 'Late 30s',
      modeledAfter: 'Southern charm meets modern influence - sweet with steel underneath',
      appearance: `Style: Southern florals that somehow don't read as costume on her. Can wear a garden party dress to a board meeting and make it work.
Build: Graceful, warm presence
Hair: Honey blonde, perfectly styled`,
      personality: `Sweet with steel underneath. Navigates Southern social circles with ease. Knows everyone's family history for three generations. Southern charm that disarms before the steel shows.`,
      background: `Southern roots, from money but the kind that doesn't flaunt it. Connected to political or business circles. Lifestyle influencer and cookbook author. Met the wives circle at Columbia sorority with Harper.

Role: The one who navigates Southern social circles with ease. Her social connections span generations.`,
      wardrobeStyle: `**Overall Aesthetic:** Southern Florals - garden party elegance that works anywhere

**Color Palette:**
- Primary: Soft florals, blush, cream, sage
- Accent: Pearl jewelry (always)
- Signature: Garden party prints

**Key Pieces:**
- Floral wrap dresses
- Quality cardigans
- Pearl jewelry (layered tastefully)
- Wedge heels or elegant flats
- Wide-brimmed hats for events

**Style Notes:**
- Southern florals that never read as costume
- Can wear garden party dress to board meeting
- Sweet exterior, steel interior
- Generations of good taste`,
      wivesClubRole: 'Wives Circle - Southern Connections',
      hubLocation: 'Charlotte, NC',
      education: 'Columbia University',
      careerHistory: 'Lifestyle Influencer, Cookbook Author',
    },
    {
      name: 'Isabella "Izzy" Santoro',
      firstName: 'Isabella',
      lastName: 'Santoro',
      nickname: 'Izzy',
      archetype: 'Former Broadway / Arts Academy Director',
      age: 'Late 30s',
      modeledAfter: 'Theatrical presence - dramatic, passionate, refuses to blend in',
      appearance: `Style: Dramatic red, because Isabella always chooses dramatic red. Statement pieces, bold choices, refuses to blend in.
Build: Performer's presence, commanding
Hair: Dark, dramatic styling`,
      personality: `Expressive, passionate, memorable. Adds energy to gatherings. Her presence is never subtle. The one who makes every room more interesting just by being in it.`,
      background: `Former Broadway performer, now runs a performing arts academy. European connections through arts/entertainment industry. Met the wives circle at Columbia sorority with Harper.

Role: The one who adds energy and drama to every gathering. Runs performing arts academy for next generation.`,
      wardrobeStyle: `**Overall Aesthetic:** Dramatic Statement - refuses to blend in

**Color Palette:**
- Primary: Dramatic red (always)
- Secondary: Black, gold
- Accent: Bold jewelry

**Key Pieces:**
- Statement red pieces (dress, coat, shoes)
- Bold jewelry (theatrical)
- Dramatic silhouettes
- Performance-ready makeup
- Designer pieces that command attention

**Style Notes:**
- Always chooses dramatic red
- Statement pieces over subtle
- Never blends in (refuses to)
- Every outfit is a performance`,
      wivesClubRole: 'Wives Circle - Arts & Entertainment',
      hubLocation: 'New York',
      education: 'Columbia University',
      careerHistory: 'Former Broadway, Performing Arts Academy Director',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of wivesCircle) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`✓ Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: { ...char, projectId: project.id }
      });
      console.log(`+ Created: ${char.name}`);
      created++;
    }
  }

  console.log(`\nCreated ${created}, Updated ${updated} characters`);

  // Show summary
  const wivesClubMembers = await prisma.character.count({
    where: {
      OR: [
        { wivesClubRole: { not: null } },
        { bssRole: { contains: 'Wives Club' } }
      ]
    }
  });

  console.log(`\nTotal Wives Club members now: ${wivesClubMembers}`);

  await prisma.$disconnect();
}

main().catch(console.error);
