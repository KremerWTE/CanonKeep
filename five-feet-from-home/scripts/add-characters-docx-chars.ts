import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Characters from Characters.docx...\n");

  const characters = [
    // ========== EVELYN "EVIE" MAREN ==========
    {
      name: 'Evelyn "Evie" Maren',
      firstName: 'Evelyn',
      lastName: 'Maren',
      nickname: 'Evie',
      archetype: 'Culinary Arts Teacher / Cooking Mentor',
      education: 'Appalachian State - Culinary Arts and Education',
      hubLocation: 'Charlotte, NC',
      background: `Grace's culinary arts and home economics teacher at her private school. Also helps with school events, fundraisers, and organizes bake sales that feel like full-on community festivals.

BACKGROUND:
- Hometown: Asheville, NC. Grew up in small mountain town surrounded by food, family, and faith
- Originally wanted to open a bakery, but after volunteering at a community center realized her true calling was teaching
- Parents still live in Asheville, running a small diner. Students sometimes get care packages of diner pie from her mom

CONNECTION TO THE CIRCLE:
- Grace loves her because Evie's classroom is always full of life, laughter, and the smell of fresh bread
- Evie takes special interest in Grace's curiosity and creativity, often letting her experiment with recipes after hours
- Elena and Sara meet her during a school function; her warmth and humor remind them of Maggie
- Becomes one of the few people Elena trusts for honest advice

SPECIAL OLYMPICS CONNECTION:
- After meeting Jazz through the gym, Evie expands into teaching cooking skills to special needs athletes
- Runs weekly "Cooking Life Skills" session at Sara's gym
- Adapts recipes into simple, repeatable steps using color-coded tools and visual timers
- Says: "This isn't about recipes. They need someone to believe they can do it."

THE BUSINESS OFFER:
Sara offers Evie a fresh-meal business tied to the gym. Evie says YES to teaching meal prep but NO to the business because "the kids are that important to her."

MAKEOVER:
Bella and Mandy take Evie shopping - tailored aprons, sleek chef jackets, elegant blouses, fitted trousers. She emerges in a deep blue dress that hugged her curves just right. Her style transforms: "Elegant for the galas. Strong for the kitchen. And always, always you."`,
      personality: 'Brilliant at making kids feel safe and inspired. Natural community-builder. Deeply creative, believes food is not just sustenance but a way to build joy and connection. Conflict-averse - prefers baking cookies to soothe tension. Single by choice - kids are what matters, jokes off single dads who hit on her.',
      appearance: 'Mid-30s, wavy chestnut hair often pulled into messy bun dusted with flour. Bright eyes, soft features, approachable beauty that feels "safe" and welcoming. Dresses in colorful skirts and aprons.',
      modeledAfter: 'Warm teacher archetype with culinary arts passion',
      relationships: `Grace Barrett - favorite student, lets her experiment after hours
Elena Barrett - pulled into orbit, becomes trusted advisor
Sara - teaches meal prep at gym, refuses business expansion
Jazz Carter - teaches cooking life skills, helps build independence
Bella - gets makeover from Bella and Mandy`,
      sourceFiles: 'Characters.docx',
    },

    // ========== CLAIRE DONAHUE ==========
    {
      name: 'Claire Donahue',
      firstName: 'Claire',
      lastName: 'Donahue',
      archetype: 'Special Olympics Bowling Athlete',
      hubLocation: 'South Boston, MA',
      background: `Special Olympics bowling athlete from South Boston. Irish-American family. Diagnosed with Down syndrome at birth.

SPORTS:
- Ten-pin bowling specialist
- Has "lucky pink wristband" she wears at every competition
- When Bella lived in Boston, she volunteered with Special Olympics and was paired with Claire

RELATIONSHIP WITH BELLA:
- Quickly latched onto Bella as both coach and role model
- Calls her "Coach B" and still texts updates years later
- Bella traveled with Claire to Special Olympics World Games (Athens, then Berlin)
- Says to Bella: "Coach B, you're my lucky charm. You make me brave."

PERSONALITY:
- Grounded, steady, fiercely determined
- Quiet by nature, but once she warms up, her dry humor can leave everyone laughing
- Loves rituals
- Incredibly loyal to Bella - sees her not just as coach but as a sister`,
      personality: 'Grounded, steady, fiercely determined. Quiet but with dry humor once comfortable. Ritual-oriented. Incredibly loyal.',
      relationships: `Bella - "Coach B", role model, sister figure
Harper's kids - become part of her cheering section at games
Grace - idolizes her, tells people "Aunt Bella makes champions"`,
      sourceFiles: 'Characters.docx',
    },

    // ========== JASMINE "JAZZ" CARTER ==========
    {
      name: 'Jasmine "Jazz" Carter',
      firstName: 'Jasmine',
      lastName: 'Carter',
      nickname: 'Jazz',
      archetype: 'Special Olympics Swimming Athlete',
      hubLocation: 'Charlotte, NC',
      background: `Special Olympics swimmer from Charlotte. Has Down syndrome.

SPORTS:
- Swimming specialist with raw speed and fearless love of water
- Her mom enrolled her in swim classes to build confidence
- By 15, was beating older swimmers in Special Olympics competitions
- Under Bella's guidance, qualified for international games

DISCOVERY:
Bella discovered Jazz at a local meet after moving to Charlotte and offered to coach her, sensing her raw, natural speed.

WITH EVIE:
- Thrives in Evie's kitchen classes
- Learns to make sandwiches, prep smoothies, bake healthier cookies
- Beams when she tells Grace: "I made dinner for Mom all by myself!"
- Evie realizes: "This isn't just cooking — it's independence and dignity."

WITH GRACE:
When Grace's classmates pointed and whispered about her hanging out with "the Special Olympics girl," Grace flushed - but then Jazz waved from the water, still beaming, and the embarrassment dissolved. Jazz climbed out, dripping and laughing: "Did I do good, Coach Grace?"`,
      personality: 'Bubbly, playful, loves music and will often sing or hum on pool deck before races. Extremely affectionate - hugs everyone including BSS operators at family events. Fiercely competitive in water. Endless optimism that draws people in.',
      relationships: `Bella - coach, discovered her at local meet
Evie - cooking mentor, teaches life skills
Grace Barrett - friend, calls her "Coach Grace"`,
      sourceFiles: 'Characters.docx',
    },

    // ========== MARGARET "MAGGIE" DONNELLY ==========
    {
      name: 'Margaret "Maggie" Donnelly',
      firstName: 'Margaret',
      lastName: 'Donnelly',
      nickname: 'Maggie',
      archetype: 'Grace\'s Literature Teacher',
      hubLocation: 'Charlotte, NC',
      background: `Grace's favorite teacher at her private school in Charlotte. Teaches literature and history with a special way of drawing out curiosity in students.

CONNECTION TO THE GROUP:
- Grace adores her and often talks about "Miss Donnelly" at home
- Elena gets to know Maggie through school events
- Their friendship begins with small conversations at parent nights
- Eventually invited into galas and dinners

ROLE:
- Sees potential in kids before anyone else does
- Grace credits her with igniting her love of reading, storytelling, and curiosity about history
- Outsider-turned-insider, the "teacher friend" who sparks unexpected conversations with VIPs through wit and lack of intimidation

DYNAMIC WITH SARA:
Maggie is loud and flirty; Evie is gentle and sweet. Together, they run school events like a comedy duo. Where Sara nurtures with steady presence, Maggie inspires with energy and creativity.`,
      personality: 'Loud, flirty, energetic. Inspires with creativity. Sees potential in kids before anyone else. Not intimidated by VIPs.',
      relationships: `Grace Barrett - favorite student, ignites her love of reading
Elena Barrett - friendship through school events
Evie Maren - run school events together like comedy duo
Sara - sisters by choice, Maggie balances Sara's steady nurturing`,
      sourceFiles: 'Characters.docx',
    },

    // ========== SARA HALE (if different from Sara Barrett) ==========
    // Note: May need to merge with Sara Barrett - appears to be same person
  ];

  let created = 0;
  let updated = 0;

  for (const char of characters) {
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

  // Update Bella with Special Olympics expansion
  const bella = await prisma.character.findFirst({
    where: { firstName: 'Bella' }
  });

  if (bella) {
    const currentBackground = bella.background || '';
    if (!currentBackground.includes('Special Olympics')) {
      await prisma.character.update({
        where: { id: bella.id },
        data: {
          background: currentBackground + `

SPECIAL OLYMPICS COACHING:
Even with her crushing schedule — balancing BSS analyst work, Elena's Maison Aurelia projects, her growing event company, and relationships with Mandy and Matt — Bella never set aside her Special Olympics athletes. She often said coaching wasn't a side project, it was part of who she was.

SPORTS SHE COACHES:
- Bowling: First Special Olympics team in Boston. Coached Claire Donahue, traveled with her to World Games in Athens and Berlin.
- Swimming: After moving to Charlotte, discovered Jasmine "Jazz" Carter and coached her to international games.

"When I stand next to Addie, Elena, or Selene, I feel like the ugly one in the group. I don't shine like they do." But in truth, that very humility is what makes her distinct. If the others were jewels glittering in the light, Bella was the hidden stone — unassuming, yet precious beyond measure.`,
        }
      });
      console.log('Updated: Bella with Special Olympics coaching');
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
