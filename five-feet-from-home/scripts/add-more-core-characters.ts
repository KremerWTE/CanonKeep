import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== ADDING/UPDATING MORE CORE CHARACTERS ===\n');

  const characters = [
    {
      name: 'Hawk',
      firstName: 'Ethan',
      lastName: 'Hawkins',
      nickname: 'Hawk',
      archetype: 'Tier 1 Operator / Security Chief',
      age: 'Early-Mid 30s',
      modeledAfter: 'Delta Force operator - calm, calculating, "built for a tux"',
      appearance: `Hair: Dark, damp from runs/showers
Eyes: Steady, calculating, "storm-like"
Build: Muscular, athletic; ex-Tier 1 operator
Distinguishing features: Calm demeanor; operator bearing; looks "built for a tux"
Clothing: Dress blues, casual polo and jeans, hoodies, athletic wear, dress clothes`,
      personality: `Strategic thinker; plays "chessmaster." Calm under pressure; no panic response. Protective but not possessive. Direct communicator. Observant; reads people like tactical maps. Dry humor. Patient with Addie's armor. Loyal and committed. Operates with military precision in civilian life. Sees multiple moves ahead (strategic).`,
      background: `Former Delta/Tier 1 operator. "Broken" by service; nearly died before recovery. Transitioned to private security in Vegas (Head of security at The Palmetto casino). Met Addie and becomes her steady support during her collapse. Helps her rebuild; becomes boyfriend/partner. Eventually moves to Charlotte. Marries Addie; builds family. Becomes father figure to Grace.

Phoenix Foundation director/board member. Special projects advisor to Jasper.`,
      wardrobeStyle: `**Overall Aesthetic:** Operator Elegance - tactical precision meets "built for a tux"

**Color Palette:**
- Primary: Black, navy, charcoal
- Casual: Gray, olive
- Formal: Classic black tie

**Key Pieces:**
- Dress blues (when appropriate)
- Casual polo and jeans
- Athletic wear (functional)
- Quality tactical watches
- Well-fitted suits when needed

**Style Notes:**
- Operator bearing even in casual clothes
- "Built for a tux" - looks natural in formal wear
- Military precision in appearance
- Never overdressed, never underdressed`,
      bssRole: 'Head of Operators',
      hubLocation: 'Charlotte, NC (from Vegas)',
      catchphrases: '"War Goddess" (to Addie)',
    },
    {
      name: 'Kendra Whitaker',
      firstName: 'Kendra',
      lastName: 'Whitaker',
      archetype: 'CrossFit Athlete / Gym Owner',
      age: 'Late 20s-Early 30s',
      modeledAfter: 'CrossFit athlete - powerful, beautiful, athletic presence',
      appearance: `Hair: Often pinned up (after workouts); can be in messy braid; beautiful
Eyes: Expressive
Build: Very athletic, muscular (CrossFit athlete)
Distinguishing features: Strong arms/physique; powerful presence; glowing
Clothing: Bright coral leggings, emerald gown, athletic wear, sundresses`,
      personality: `Athletic and strong. Playful and teasing. Loyal and protective. Initially hides emotional pain. Pushes herself hard physically. Becomes more vulnerable as series progresses. Caring with younger people (like Grace). Complex feelings about Addison. Bounces between strength and insecurity.`,
      background: `CrossFit athlete; competes in Regionals. Gym owner/operator (Sara's CrossFit gym connection). Eventually moves into nonprofit/foundation work. Trains young people including Grace.

Has complicated romantic history with Addison. Meets Chris (boyfriend/fiancé) early. Reconnects with Addison through family events. Eventually gets engaged to Chris.`,
      wardrobeStyle: `**Overall Aesthetic:** Athletic Power - CrossFit meets elegant when needed

**Color Palette:**
- Primary: Bright athletic colors (coral, emerald)
- Workout: Bold, energetic tones
- Formal: Elegant gowns when occasion calls

**Key Pieces:**
- Bright coral leggings
- Athletic wear (quality brands)
- Sundresses for casual
- Emerald gown for events
- Messy braids and pinned-up styles

**Style Notes:**
- Athletic wear most of the time
- Cleans up beautifully for events
- Strong physique influences all clothing choices
- Hair often workout-appropriate`,
      bssRole: 'Analyst / Athlete',
      hubLocation: 'Charlotte, NC',
      wivesClubRole: 'Owls - Leader',
    },
    {
      name: 'Chris Whitaker',
      firstName: 'Chris',
      lastName: 'Whitaker',
      archetype: 'Man of Faith / Foundation Executive',
      age: 'Early 30s',
      modeledAfter: 'Supportive partner type - emotionally intelligent, faith-based values',
      appearance: `Build: Fit
Clothing: Casual (jeans, polo) - understated quality`,
      personality: `Supportive and loyal. Emotionally intelligent. Can read Kendra's needs. Strategic thinker (like Hawk/Jasper). Man of faith (mentioned as having faith-based beliefs). Patient and understanding of complex relationships.`,
      background: `Kendra's boyfriend/fiancé/husband. Professional background. Becomes involved with nonprofit/foundation work (COO role). Develops feelings for Kendra. Navigates relationship as Addie reenters Kendra's life. Eventually proposes to and marries Kendra.`,
      wardrobeStyle: `**Overall Aesthetic:** Understated Professional - quality without flash

**Color Palette:**
- Primary: Navy, white, gray
- Casual: Earth tones
- Formal: Classic suits

**Key Pieces:**
- Quality polo shirts
- Well-fitted jeans
- Professional suits for work
- Quality watch

**Style Notes:**
- Understated quality
- Never flashy
- Appropriate for any setting
- Faith influences modest choices`,
      bssRole: 'Foundation COO',
      hubLocation: 'Charlotte, NC',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { nickname: char.nickname }
        ],
        projectId: project.id
      }
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

  // Summary
  const total = await prisma.character.count();
  const complete = await prisma.character.count({
    where: {
      AND: [
        { appearance: { not: null } },
        { personality: { not: null } },
        { background: { not: null } }
      ]
    }
  });

  console.log(`\nTotal characters: ${total}`);
  console.log(`Complete (with appearance/personality/background): ${complete}`);

  await prisma.$disconnect();
}

main().catch(console.error);
