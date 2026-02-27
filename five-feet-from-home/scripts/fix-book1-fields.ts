import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== FIXING BOOK 1 CHARACTER FIELDS ===\n');

  // Fix Grace Barrett
  const grace = await prisma.character.findFirst({ where: { name: 'Grace Barrett' } });
  if (grace) {
    await prisma.character.update({
      where: { id: grace.id },
      data: {
        wardrobeStyle: `**Overall Aesthetic:** Seven-year-old magic — sparkles, comfort, and whatever she picked herself

**Color Palette:**
- Primary: Bright colors (pink, purple, turquoise)
- Secondary: Pastels (blush, lavender)
- Accent: Glitter, sparkles, metallics

**Key Pieces:**
- Glitter sneakers (light-up or sparkly)
- Unicorn leggings
- Tulle dress for special occasions
- Colorful hair ribbons and clips

**Events & Outfits:**
| Event | Outfit |
|-------|--------|
| School Day | School polo, leggings, backpack |
| Hospital Visit | Pajamas wrapped in hospital blanket |
| Soccer Game | Jersey, shorts, glitter sneakers |
| Special Event | Tulle dress (blush and champagne) |

**Style Notes:** Normal kid with sparkle obsession. Clothes that survive art, playground, and emotions.`,
      }
    });
    console.log('✓ Fixed Grace Barrett wardrobeStyle');
  }

  // Fix Sara Whitaker
  const sara = await prisma.character.findFirst({ where: { name: 'Sara Whitaker' } });
  if (sara) {
    await prisma.character.update({
      where: { id: sara.id },
      data: {
        appearance: `Build: Athletic, strong—the body of someone who coaches CrossFit for a living
Hair: Usually pulled back in a practical ponytail
Style: Functional and comfortable—jeans, NC State t-shirts, sneakers
Age: Mid-30s`,
        personality: `Pragmatic, loyal, and direct. Doesn't sugarcoat things, but her bluntness comes from love. The person who holds things together while others fall apart, asking nothing in return except that people try to do better.

Quirk: Stress-eats appetizers at parties. Circulates with trays and steals bites when she thinks no one's looking.`,
        wardrobeStyle: `**Overall Aesthetic:** Athletic-casual—function over fashion

**Color Palette:**
- Primary: Navy, gray, black, NC State red
- Neutral: White, denim blue
- Accent: Occasional coral or bright workout colors

**Key Pieces:**
- Well-worn jeans
- College t-shirts (NC State loyalty)
- Athletic wear for coaching
- Practical sneakers
- Hair ties (always has extras)
- Minimal jewelry

**Events & Outfits:**
| Event | Outfit |
|-------|--------|
| Hospital Waiting | Comfortable clothes, keeping Grace calm |
| Party Setup | Jeans, NC State t-shirt, ponytail |
| Thank You Party | Casual dress, serving appetizers |
| CrossFit Coaching | Full athletic gear |

**Style Notes:** Ponytail is go-to. Always ready to spring into action. Function over form.`,
        modeledAfter: 'Athletic sister-type - practical, no-nonsense CrossFit coach energy',
      }
    });
    console.log('✓ Fixed Sara Whitaker');
  }

  // Fix Chris Cole
  const chris = await prisma.character.findFirst({ where: { name: 'Chris Cole' } });
  if (chris) {
    await prisma.character.update({
      where: { id: chris.id },
      data: {
        appearance: `Age: Early to mid-30s
Build: Athletic quarterback physique (recovering from shoulder injury)
Style: Casual wealth—workout gear at home, polished when public`,
        personality: `Competitive, frustrated by politics he can't control through athletic performance. Used to winning through effort and skill, uncomfortable with backroom negotiations. At the top of his profession but caught in the middle of franchise politics.`,
        wardrobeStyle: `**Overall Aesthetic:** Athletic Casual — underlying wealth meets workout gear

**Color Palette:**
- Primary: Athletic neutrals—gray, navy, black
- Casual: Quality basics
- Game Day: Team-appropriate

**Key Pieces:**
- Quality workout gear
- Casual polo shirts
- Well-fitted jeans for events
- Quality watches

**Events & Outfits:**
| Event | Outfit |
|-------|--------|
| Home Morning | Workout clothes, green smoothie, PT exercises |
| Thank You Party | Casual wealth—quality pieces, relaxed fit |
| Team Events | Game day or business casual |

**Style Notes:** Function at home, appropriateness in public. Comfort over impression when off-duty. Green smoothies are more accessory than clothing.`,
        modeledAfter: 'NFL quarterback - athletic build, competitive, star player dealing with franchise politics',
      }
    });
    console.log('✓ Fixed Chris Cole');
  }

  // Verify all
  console.log('\n=== VERIFICATION ===\n');
  const names = ['Grace Barrett', 'Sara Whitaker', 'Chris Cole', 'Cole', 'Dean'];
  for (const name of names) {
    const c = await prisma.character.findFirst({
      where: { name },
      select: {
        name: true,
        appearance: true,
        personality: true,
        background: true,
        wardrobeStyle: true,
        modeledAfter: true
      }
    });
    if (c) {
      const status = [
        c.appearance ? '✓app' : '✗app',
        c.personality ? '✓per' : '✗per',
        c.background ? '✓bg' : '✗bg',
        c.wardrobeStyle ? '✓ward' : '✗ward',
        c.modeledAfter ? '✓model' : '✗model',
      ].join(' ');
      console.log(`${name}: ${status}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
