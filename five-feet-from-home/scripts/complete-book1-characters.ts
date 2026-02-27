import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== COMPLETING BOOK 1 CORE CHARACTERS ===\n');

  const characterUpdates = [
    {
      name: 'Grace Barrett',
      data: {
        firstName: 'Grace',
        lastName: 'Barrett',
        age: '7',
        archetype: 'Emotional Anchor / Catalyst',
        modeledAfter: 'Child actress energy - expressive, wise beyond years',
        appearance: `Physical: Small, child-sized build. Brown curly hair, often tangled from humidity or sleep - frequently in crooked braids, messy ponytails, or with colorful clips/ribbons. Wide, expressive eyes that catch light easily. Dimple-like expressions when smiling; serious/appraising look when observing adults. Often has crayon smudges or glitter on hands and clothes.

Signature Look: Seven-year-old whose mother picks her clothes but who has strong opinions about accessories. Practical school wear meets unicorn leggings meets glitter sneakers. Always something slightly askew—a crooked ribbon, a stained shirt, evidence of a day fully lived.`,
        personality: `Core Traits: Perceptive - sees what adults try to hide. Direct - asks the questions no one else will. Brave - faces fears with quiet courage. Playful - still very much a kid despite her wisdom. Protective - fiercely loyal to family. Loving - leads with her heart.

Strengths: Cuts through adult pretense with innocent honesty. Natural peacemaker. Brings levity to tense situations. Observes everything; remembers everything. Can comfort adults with surprising insight.

Weaknesses: Carries worries too big for her age. Sometimes too aware of family tensions. Anxious about being abandoned. Takes on emotional weight she shouldn't have to.

Quirks: Expresses herself through art - fridge drawings with crooked houses, three-figure families holding hands, backward letters, and big yellow suns touching everything. "You can't spell 'team' without 'me'" - her phrase to Jasper that becomes a touchstone.`,
        background: `Grace Barrett is seven years old and has already learned more about adult relationships than most kids her age. She's watched her mother hold everything together while her father existed mostly as a voice on the phone and a figure who showed up late to birthday parties—if he showed up at all.

But Grace isn't bitter. She's observant. She notices when her dad checks his phone during her soccer games. She notices when her mom pretends everything is fine. She notices the way conversations stop when she walks into a room.

Despite growing up with an often-absent father, Grace has retained an almost preternatural sweetness and wisdom. She asks the questions adults are afraid to ask, cuts through pretense with innocent honesty, and somehow becomes the moral compass for a family of high-achieving adults.

Her broken foot early in Book 1 sets off a chain of events that culminates in her mother's hospitalization—and ultimately, her family's healing.`,
        wardrobeStyle: `**Overall Aesthetic:** Seven-year-old magic — sparkles, comfort, and whatever she picked herself

**Color Palette:**
- Primary: Bright colors (pink, purple, turquoise)
- Secondary: Pastels (blush, lavender)
- Accent: Glitter, sparkles, metallics

**Signature Pieces:**
- The Glitter Sneakers: Light-up or sparkly; worn everywhere possible
- The Unicorn Leggings: Patterned favorites
- The Tulle Dress: For special occasions (blush and champagne)
- The Ribbons/Clips: Colorful hair accessories

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| School Day | School polo, leggings, backpack | Standard uniform |
| Hospital Visit | Pajamas wrapped in hospital blanket | Refused to leave Elena |
| Home/Play | Unicorn leggings, school hoodie | Comfortable play |
| Soccer Game | Jersey, shorts, glitter sneakers | Athletic Grace |
| Special Event | Tulle dress (blush and champagne) | When dressing up matters |

**Style Notes:**
- Normal kid with a sparkle obsession
- Nothing too precious
- Clothes that can survive a full day of art, playground, and strong emotions
- Dresses herself with strong opinions`,
        arcStart: 'A seven-year-old who has learned to expect her father\'s absence. Brave but anxious. Watches adults carefully.',
        arcChange: 'Becomes the unexpected catalyst for family healing. Her broken foot, her hospital vigil for Elena, and her simple question ("Is Daddy on our team?") force Jasper to confront his priorities.',
        arcEnd: 'Gets what she wanted—a father who shows up. Maintains her wisdom while getting to just be a kid.',
        catchphrases: '"Is Daddy on our team?" | "You can\'t spell \'team\' without \'me\', Daddy." | "I love you infinity."',
      }
    },
    {
      name: 'Sara Whitaker',
      data: {
        firstName: 'Sara',
        lastName: 'Whitaker',
        age: 'Mid-30s',
        archetype: 'Family Anchor / Sister',
        modeledAfter: 'Athletic sister-type - practical, no-nonsense, fiercely protective',
        appearance: `Build: Athletic, strong—the body of someone who coaches CrossFit for a living
Hair: Usually pulled back in a practical ponytail
Style: Functional and comfortable—jeans, NC State t-shirts, sneakers. Occasional dressed-up looks for special events.`,
        personality: `Sara is pragmatic, loyal, and direct. She doesn't sugarcoat things, but her bluntness comes from love. She's the person who holds things together while others fall apart, asking nothing in return except that people try to do better.

Quirk: Sara stress-eats appetizers at parties. She circulates with trays and steals bites when she thinks no one's looking.`,
        background: `Sara Whitaker is Elena's younger sister—fiercely protective, no-nonsense, and the kind of person who shows up when everyone else disappears. She works as a CrossFit coach and brings that same coaching energy to her family relationships: supportive but demanding, encouraging but honest.

She's been the steady presence for Grace during Jasper and Elena's crises, covering the gaps that Jasper's work schedule creates. She's lost count of the school pickups she's handled, the birthday parties she's helped with, the nights she's kept Elena company when the silence of an empty house got too loud.

Sara has her own daughter, Emma, who is close in age to Grace, making the cousins natural playmates.

Role: Sara represents unconditional family loyalty. She loves Jasper—has vouched for him more than once when Elena's patience ran thin—but she's also willing to call him out when needed. She's the one who watches, who notices, who makes silent promises to protect Grace if Jasper doesn't learn to prioritize his family. She's also Elena's sounding board.`,
        wardrobeStyle: `**Overall Aesthetic:** Athletic-casual—the wardrobe of someone who values function over fashion

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
- Minimal jewelry—maybe small studs

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Hospital Waiting Room | Comfortable clothes | Keeping Grace calm during surgery |
| Party Setup | Jeans, NC State t-shirt, ponytail | On a ladder stringing lights |
| Thank You Party | Serving appetizers, casual dress | Stealing bites between trips |
| Coffee with Elena | Casual meeting attire | The sister heart-to-heart |
| CrossFit Coaching | Full athletic gear | In her element |

**Style Notes:**
- Dresses up when the occasion demands but never looks uncomfortable
- Ponytail is her go-to hairstyle
- Always looks like she could spring into action at a moment's notice
- Function over form, always`,
        catchphrases: '"Don\'t let her fool you, Harper—she\'s been micromanaging like Jasper on a bad day." | "Love has to look like showing up. And Jasper too often lets that come second." | "She\'s too used to making her own quiet." (About Grace)',
        hubLocation: 'Charlotte, NC',
        wivesClubRole: 'Vestals - Family Anchor',
      }
    },
    {
      name: 'Chris Cole',
      data: {
        firstName: 'Chris',
        lastName: 'Cole',
        age: 'Early to mid-30s',
        archetype: 'High-Profile Client / NFL Star',
        modeledAfter: 'NFL quarterback - athletic, competitive, frustrated by politics',
        appearance: `Build: Athletic quarterback physique (currently recovering from shoulder injury)
Style: Casual wealth—workout gear at home, polished when public`,
        personality: `Competitive, frustrated by politics he can't control through athletic performance. Used to winning through effort and skill, uncomfortable with backroom negotiations. At the top of his profession but caught in the middle of franchise politics.`,
        background: `Chris Cole is a star NFL quarterback dealing with team ownership drama. He's at the top of his profession but caught in the middle of franchise politics—pressured by different factions to take sides while recovering from a shoulder injury that has him questioning his future in the game.

He lives with his wife Maddie on fifteen acres of manicured land outside Charlotte—part horse country aesthetic, part NFL money—where photographers might show up at the gate at any moment and every outfit choice matters.

Role: Chris represents another facet of Jasper's work—the high-profile clients who need crisis management at the intersection of sports, business, and media. The ownership battle for his team is one of the threads setting up Book 2.`,
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
        hubLocation: 'Charlotte, NC',
      }
    },
    {
      name: 'Cole',
      data: {
        firstName: 'Cole',
        lastName: null, // Call sign only
        nickname: 'Cole',
        age: 'Late 30s to early 40s',
        archetype: 'BSS Operator / Cyber-Intel Specialist',
        modeledAfter: 'Ex-Special Forces operator - calm, scarred, always scanning',
        appearance: `Build: Athletic, military bearing that never quite faded
Style: Tactical casual—tactical pants, faded polos, functional clothing
Presence: The posture of a man who never stops scanning for threats
Distinguishing features: Calm presence; scarred (implied combat history)`,
        personality: `Observant, protective, thoughtful. He notices things others miss and cares deeply about the people he works with, even if he doesn't say it out loud. Loyal to core team. Capable in high-stress situations. Shows up when things "go red." Brother-like bond with Hawk. Protector instinct.`,
        background: `Cole is ex-Special Forces who served before transitioning to intelligence work (CIA). He now works as Jasper's embedded cyber and intelligence specialist, handling the "dirty digital work" and occasional real-world extractions that the firm's clients require.

He's been in the field with Dean for high-stakes operations—encrypted tunnels at 2 AM, back-channel meetings with people whose real names they'll never know, extractions that involve more firepower than anyone will ever admit on paper.

Former Tier 1 operator (Delta implied, alongside Hawk). Shares "we survived that together" bond with the team. Eventually becomes COO of nonprofit partner with Phoenix Foundation.

Role: Cole represents the dangerous, morally gray side of Jasper's work—the operations that never make the papers, the crises that require more than corporate strategy to resolve. He's fiercely loyal to Jasper and respects Elena for her strength during the hospital crisis.`,
        wardrobeStyle: `**Overall Aesthetic:** Tactical casual—always ready for action

**Color Palette:**
- Primary: Olive, khaki, navy, black
- Neutral: Gray, tan
- No bright colors

**Key Pieces:**
- Tactical pants
- Faded polos
- Fitted blazers (for civilian events)
- Functional boots
- Quality watch (tactical)
- Duffel bags over luggage

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Africa Operations | Tactical gear | Field work |
| Flight Home | Tactical pants, faded polo | Decompressing from mission |
| Thank You Party | Dark jeans, fitted blazer | Still standing military-straight |
| Hospital Intel Drop | Tactical casual | Delivering intel to Jasper during Elena's surgery |

**Style Notes:**
- Even in civilian clothes, stands with military posture
- Always scanning the perimeter out of habit
- Never looks fully relaxed—always ready`,
        catchphrases: '"Tell me we\'re not landing into another crisis." | "Barrett\'s throwing a party." "Like, with actual food and drinks and people who aren\'t trying to kill us?" | "Ma\'am, keeping Barrett grounded is above my pay grade. But I try."',
        bssRole: 'Operator / Cyber-Intel Specialist',
        hubLocation: 'Charlotte, NC (HQ)',
      }
    },
    {
      name: 'Dean',
      data: {
        firstName: 'Dean',
        lastName: null, // Call sign only
        nickname: 'Dean',
        age: 'Late 30s to early 40s',
        archetype: 'BSS Operator / Intel Specialist',
        modeledAfter: 'Ex-Special Forces - slightly more relaxed than Cole, quicker to joke',
        appearance: `Build: Athletic, slightly more relaxed demeanor than Cole
Style: Button-downs, casual but ready for action
Quirk: Stress-eats protein bars; snores loudly when he finally lets himself sleep`,
        personality: `More outwardly expressive than Cole, quicker to joke, but just as competent when things get serious. He's the one who lightens the mood after tense operations. Shares the unshakeable bond of men who've been in combat together with Cole.`,
        background: `Dean is ex-Special Forces who served before transitioning to intelligence work (NSA). He now works alongside Cole as Jasper's embedded intelligence specialist, handling the operations that require more than corporate strategy to resolve.

He's been in the field with Cole for high-stakes operations—encrypted tunnels at 2 AM, back-channel meetings with people whose real names they'll never know, extractions that involve more firepower than anyone will ever admit on paper.

Role: Dean represents the dangerous, morally gray side of Jasper's work alongside Cole. They're the team that handles the crises that never make the papers. Fiercely loyal to Jasper and the BSS family.`,
        wardrobeStyle: `**Overall Aesthetic:** Slightly more relaxed than Cole but still mission-ready

**Color Palette:**
- Similar to Cole but occasionally lighter tones
- Olive, navy, gray, khaki

**Key Pieces:**
- Button-down shirts
- Quality casual pants
- Comfortable boots
- Protein bars (always)

**Events & Outfits:**
| Event | Outfit | Notes |
|-------|--------|-------|
| Africa Operations | Tactical gear | Field work alongside Cole |
| Flight Home | Button-down, casual | Decompressing from mission |
| Thank You Party | Button-down, jeans | Lighter mood than Cole |

**Style Notes:**
- Even in civilian clothes, military posture
- Always scanning the perimeter out of habit
- Never looks fully relaxed—always ready
- More approachable appearance than Cole`,
        bssRole: 'Operator / Intel Specialist',
        hubLocation: 'Charlotte, NC (HQ)',
      }
    }
  ];

  let updated = 0;

  for (const char of characterUpdates) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char.data
      });
      console.log(`✓ Updated: ${char.name}`);
      updated++;
    } else {
      // Create if doesn't exist
      await prisma.character.create({
        data: {
          name: char.name,
          projectId: project.id,
          ...char.data
        }
      });
      console.log(`+ Created: ${char.name}`);
      updated++;
    }
  }

  console.log(`\n=== Updated/Created ${updated} characters ===`);

  // Verify the updates
  console.log('\n=== VERIFICATION ===\n');

  const names = ['Grace Barrett', 'Sara Whitaker', 'Chris Cole', 'Cole', 'Dean'];
  for (const name of names) {
    const char = await prisma.character.findFirst({
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

    if (char) {
      const hasAppearance = char.appearance ? '✓' : '✗';
      const hasPersonality = char.personality ? '✓' : '✗';
      const hasBackground = char.background ? '✓' : '✗';
      const hasWardrobe = char.wardrobeStyle ? '✓' : '✗';
      const hasModel = char.modeledAfter ? '✓' : '✗';

      console.log(`${char.name}: appearance${hasAppearance} personality${hasPersonality} background${hasBackground} wardrobe${hasWardrobe} model${hasModel}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
