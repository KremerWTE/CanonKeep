import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== ADDING WARDROBE/OUTFIT DATA TO BOOK 1 CHARACTERS ===\n');

  // Wardrobe data for Book 1 characters
  const wardrobeData = [
    {
      name: 'Jasper Barrett',
      wardrobeStyle: `**Overall Aesthetic:** Crisis Commander — tailored power meeting portable practicality

**Color Palette:**
- Primary: Navy, charcoal, slate gray
- Accent: White/cream shirts, burgundy ties
- Neutral: Black for crisis mode

**Key Pieces:**
- Well-cut suits that move like they were tailored for sprinting through airports
- Rolled sleeves, loosened tie = work mode
- Go-bag always packed
- Quality watch, minimal accessories

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| London Crisis | Navy suit, tie loosened, sleeves rolled | Glass-walled conference room commander |
| Hospital Vigil | Rumpled shirt, jacket discarded | First time appearance didn't matter |
| Home Morning | Casual but put-together | Proving he can be present |
| Thank You Party | Quality casual, relaxed fit | Finally at ease |

**Style Notes:**
- Clothes are functional armor
- Never looks sloppy, even exhausted
- Go-bag contains full crisis kit
- Dresses for the worst-case scenario`,
    },
    {
      name: 'Elena Barrett',
      wardrobeStyle: `**Overall Aesthetic:** Timeless Elegance — classic pieces that transition from studio to gala

**Color Palette:**
- Primary: Navy, cream, soft neutrals
- Accent: Pearl jewelry, gold touches
- Occasional: Emerald green for special events

**Key Pieces:**
- Quality jeans and cashmere sweaters for daily
- The blue silk dress (first meeting memory)
- Simple, elegant jewelry with meaning
- Comfortable but never sloppy

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| First Meeting (Flashback) | Blue silk dress | The moment Jasper fell in love |
| Hospital Stay | Hospital gown, later own sweater | Vulnerable but still herself |
| Recovery at Home | Comfortable but put-together | Healing |
| Thank You Party | Elegant hostess attire | Back in her element |

**Style Notes:**
- Equally natural in jeans or formalwear
- Jewelry has sentimental value
- The blue dress is referenced as anchor
- Photographed by others more than she photographs herself now`,
    },
    {
      name: 'Grace Barrett',
      wardrobeStyle: `**Overall Aesthetic:** Seven-year-old magic — sparkles, comfort, and whatever she picked herself

**Color Palette:**
- Primary: Pink, purple, teal
- Accent: Sparkles, sequins, anything shiny
- Comfortable: Leggings, soft fabrics

**Key Pieces:**
- School uniform during week
- Mismatched socks (intentional)
- Special party dresses
- Soccer uniform

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| School Morning | Uniform, strawberry shampoo hair | Ready for spelling bee practice |
| Hospital Visit | Soft clothes, maybe pajamas | Scared but brave |
| Thank You Party | Party dress she helped choose | Feeling special |
| Soccer | Full kit, grass-stained knees | In her element |

**Style Notes:**
- Dresses herself with strong opinions
- Hair often smells of strawberries
- Keeps treasures in pockets
- Has a "Dad Saves the Day" drawing on her wall`,
    },
    {
      name: 'Harper Caldwell',
      wardrobeStyle: `**Overall Aesthetic:** Southern Steel — polished professional with signature touches

**Color Palette:**
- Primary: Navy, burgundy, forest green
- Accent: Emerald (signature scarf)
- Neutral: Cream blouses, tailored blacks

**Key Pieces:**
- Emerald silk scarf (signature piece)
- Burgundy leather tote
- Tailored blazers that mean business
- Heels that can still run if needed

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| BSS Office | Tailored blazer, emerald scarf | Professional commander |
| Crisis Operations | Same, slightly rumpled | 48 hours in same clothes |
| Lagos/Africa | Practical but polished | Field-appropriate elegance |
| Thank You Party | Elevated version of daily style | Celebrating |

**Style Notes:**
- The emerald scarf is her tell
- Burgundy tote carries everything
- Faint Georgia drawl appears when tired
- Southern Belle polish over steel-trap mind`,
    },
    {
      name: 'Addison Price',
      wardrobeStyle: `**Overall Aesthetic:** Executive Precision — camera-ready efficiency

**Color Palette:**
- Primary: Black, navy, gray
- Accent: Subtle gold jewelry
- Statement: Red lips for power meetings

**Key Pieces:**
- Perfectly pressed blouses
- Streamlined dresses
- Quality heels, never impractical
- Phone as accessory (always in hand)

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| BSS Office | Polished professional | Running everything from her phone |
| Hospital Visit | Slightly softer, bringing Elena's sweatshirt | "Brought you some things from home" |
| Crisis Mode | Same outfit, 18 hours later | Never shows the strain |

**Style Notes:**
- Never a hair out of place
- Makeup always camera-ready
- Carries everyone's schedules in her head
- The phone is her weapon`,
    },
    {
      name: 'Jessica Vaughn',
      wardrobeStyle: `**Overall Aesthetic:** Industry Legend — timeless power dressing

**Color Palette:**
- Primary: Oxblood, navy, cream
- Accent: Silver jewelry (matches her hair)
- Statement: The oxblood leather tote

**Key Pieces:**
- The legendary oxblood leather tote
- Tailored blazers with history
- Quality scarves
- Reading glasses on a chain

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Hospital Visit | Understated elegance | Mentor checking on protégé |
| Thank You Party | Celebrating decades of work | Still the sharpest in the room |
| Flashback: Prescott Grand | Assessing suit, oxblood tote | "You're redesigning the building while it's burning" |

**Style Notes:**
- The oxblood tote has been everywhere
- Silver hair as crown, not surrender
- Dresses like she owns every room
- Every piece tells a story`,
    },
    {
      name: 'Sara Whitaker',
      wardrobeStyle: `**Overall Aesthetic:** Athletic Practical — CrossFit coach meets supportive sister

**Color Palette:**
- Primary: Athletic neutrals, navy, gray
- Accent: Pops of color in activewear
- Comfortable: Leggings, quality sneakers

**Key Pieces:**
- Quality activewear that works for coaching
- Comfortable jeans for family time
- Always has a sweatshirt for lending
- Practical bags with room for Grace's stuff

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| CrossFit Coaching | Full athletic gear | In her element |
| Hospital Support | Whatever she wore when she got the call | Dropped everything |
| Staying with Grace | Comfortable, reassuring | Being the steady aunt |
| Thank You Party | Slightly dressed up casual | Celebrating her sister |

**Style Notes:**
- Function over fashion
- Always ready to move
- Clothes reflect health journey (PCOS)
- Carries snacks for Grace`,
    },
    {
      name: 'Alexandra Pierce',
      wardrobeStyle: `**Overall Aesthetic:** Corporate Temptation — power dressing as seduction

**Color Palette:**
- Primary: Black, midnight blue, deep jewel tones
- Accent: Gold jewelry, subtle but expensive
- Statement: Red for closing deals

**Key Pieces:**
- Perfectly tailored everything
- Power suits that command rooms
- Heels that add authority
- Discrete designer touches

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Project Wildcard Meeting | Midnight blue suit | "Need you now. Ten minutes." |
| Hospital Visit (midnight) | Perfectly tailored, lilies in hand | Even midnight looks intentional |
| Gala (Flashback) | Black dress, champagne in hand | The photo she texted later |

**Style Notes:**
- Everything is intentional
- Clothes are armor AND weapon
- Never appears unpolished
- Dresses to be remembered`,
    },
    {
      name: 'Mason Reilly',
      wardrobeStyle: `**Overall Aesthetic:** Political Fixer Casual — equally at home in dive bars and boardrooms

**Color Palette:**
- Primary: Earth tones, navy, gray
- Accent: Quality watch
- Casual: Well-worn favorites

**Key Pieces:**
- Sports coat that works everywhere
- Quality jeans
- Comfortable shoes for long nights
- The kind of clothes that say "I don't need to try"

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Confrontation with Jasper | Casual but intentional | Came to speak truth |
| Flashback: Duke Bar | Whatever juniors wore | Sticky tables, neon signs |
| Professional Mode | Upgraded casual | Political fixer attire |

**Style Notes:**
- Clothes don't define him
- Comfortable > impressive
- Duke loyalties visible in small ways
- Shows up with whiskey and hard truths`,
    },
    {
      name: 'Rafe Moreno',
      wardrobeStyle: `**Overall Aesthetic:** Chameleon — polished enough for boardrooms, adaptable enough for anywhere

**Color Palette:**
- Primary: Navy, charcoal, clean whites
- Adapts to situation
- Nothing too memorable (intentional)

**Key Pieces:**
- Blazers that travel well
- Versatile shoes
- Quality casual wear
- Charm as primary accessory

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Crisis Operations | Context-appropriate | Blends in wherever needed |
| Thank You Party | Polished casual | Telling elaborate stories near bar |
| Forensic Accounting Work | Whatever gets him access | Chameleon mode |

**Style Notes:**
- His real skill is reading what's appropriate
- Can shift from street to boardroom same day
- Nothing too distinctive (needs to blend)
- Charm matters more than clothes`,
    },
    {
      name: 'Caroline Westbrook',
      wardrobeStyle: `**Overall Aesthetic:** Television-Ready Academic — camera-friendly professional

**Color Palette:**
- Primary: Navy, burgundy, jewel tones that pop on camera
- Neutral: Cream, gray
- Avoid: Patterns that don't read well on TV

**Key Pieces:**
- Tailored blazers in camera-friendly colors
- Simple, elegant blouses
- Statement earrings (TV standard)
- Quality jewelry that doesn't distract

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Thank You Party | Television-ready elegance | Discussing charity gala with Harper |
| TV Appearances | Camera-ready professional | Regular commentary role |
| Ownership Meetings | Academic meets Wall Street | Commanding the room |

**Style Notes:**
- Every outfit chosen with potential camera in mind
- Makeup always done for high-definition
- Hair professionally maintained
- Projects competence and credibility`,
    },
    {
      name: 'Madison "Maddie" Cole',
      wardrobeStyle: `**Overall Aesthetic:** Camera-Ready Casual — effortless elegance for spotlight life

**Color Palette:**
- Primary: Cream, navy, soft neutrals
- Accent: Classic pearls, subtle gold
- Occasional: Bold pieces for events

**Key Pieces:**
- Quality leggings (dark, flattering)
- Fitted pullovers and sweaters
- Flowy dresses for events
- Pearl earrings/necklace

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Home Morning | Dark leggings, fitted pullover, messy bun | Camera-ready even at home |
| Thank You Party | Flowy cream dress, pearls | "You did this. All of it." |
| NFL Events | Polished wife-of-star-player attire | Always potential photos |

**Style Notes:**
- Learned early that photographers might appear
- "Messy bun" is actually artfully casual
- Prioritizes comfort but never looks sloppy
- Former swimmer's grace in everything`,
    },
    {
      name: 'Chris Cole',
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
| Event | Outfit | Notes |
|-------|--------|-------|
| Home Morning | Workout clothes, green smoothie | Doing PT exercises for shoulder |
| Thank You Party | Casual wealth—quality pieces, relaxed fit | NFL money, horse country aesthetic |
| Team Events | Game day or business casual | Depends on context |

**Style Notes:**
- Dresses for function at home
- Appropriateness matters in public
- Comfort over impression when off-duty
- Green smoothies are more accessory than clothing`,
    },
  ];

  let updated = 0;

  for (const char of wardrobeData) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: { wardrobeStyle: char.wardrobeStyle }
      });
      console.log(`Added wardrobe: ${char.name}`);
      updated++;
    } else {
      console.log(`Character not found: ${char.name}`);
    }
  }

  console.log(`\nWardrobe data added to ${updated} characters`);

  await prisma.$disconnect();
}

main().catch(console.error);
