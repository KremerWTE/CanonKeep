import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // Characters extracted from Characters.docx
  const characters = [
    // === EVELYN "EVIE" MAREN ===
    {
      name: 'Evelyn "Evie" Maren',
      firstName: 'Evelyn',
      lastName: 'Maren',
      nickname: 'Evie',
      age: '34',
      archetype: 'Culinary Teacher / Nurturer',
      careerHistory: 'Culinary Arts & Life Skills Teacher at Grace\'s Charlotte academy; runs athlete meal-prep workshops at Sara\'s gym.',
      affiliationRole: 'Culinary arts & life skills teacher at Grace\'s Charlotte academy',
      modeledAfter: 'Victoria from How I Met Your Mother — Ashley Williams',
      appearance: 'Messy bun dusted with flour, cardigans and colorful skirts, freckles across her cheeks, warm hazel-green eyes. Not glamorous — approachable. The type of woman people feel comfortable confessing things to within minutes.',
      personality: 'Sweet, creative, nurturing, and grounded in kindness. Approachable, warm, girl-next-door beauty with expressive eyes and an open smile.',
      hubLocation: 'Charlotte',
      sourceFiles: 'Characters.docx',
      isConfirmed: true,
    },

    // === CLAIRE DONAHUE ===
    {
      name: 'Claire Donahue',
      firstName: 'Claire',
      lastName: 'Donahue',
      archetype: 'Special Olympics Athlete',
      age: 'Mid-20s when Bella first coaches her; early 30s at International Games',
      fitnessSports: 'Ten-pin Bowling',
      background: 'Grew up in South Boston in a close-knit Irish-American family. Diagnosed with intellectual disabilities as a child; her parents encouraged her to find activities that built confidence. She discovered bowling at a community center league and fell in love with the rhythm of it.',
      relationships: 'Coached by Bella during her Special Olympics volunteer work in Boston.',
      sourceFiles: 'Characters.docx',
      isConfirmed: true,
    },

    // === JASMINE "JAZZ" CARTER ===
    {
      name: 'Jasmine "Jazz" Carter',
      firstName: 'Jasmine',
      lastName: 'Carter',
      nickname: 'Jazz',
      archetype: 'Special Olympics Athlete',
      age: 'Late teens when Bella meets her, early 20s at international stage',
      fitnessSports: 'Freestyle & butterfly swimming',
      background: 'Born and raised in Charlotte to a single mom who works two jobs. Diagnosed with autism and mild developmental delays, but found freedom in the water early on. Her mom enrolled her in swim classes to build confidence, and by 15 she was beating older swimmers in Special Olympics competitions.',
      relationships: 'Bella discovered Jazz at a local meet after moving to Charlotte and offered to coach her, sensing her raw, natural speed. Grace becomes her "big sister" mentor figure.',
      hubLocation: 'Charlotte',
      sourceFiles: 'Characters.docx',
      isConfirmed: true,
    },

    // === MARGARET "MAGGIE" DONNELLY ===
    {
      name: 'Margaret "Maggie" Donnelly',
      firstName: 'Margaret',
      lastName: 'Donnelly',
      nickname: 'Maggie',
      archetype: 'Teacher / Social Connector',
      careerHistory: 'Literature and history teacher at Grace\'s private school in Charlotte. Later hired by Maison Aurelia for reception desk and guest welcome.',
      affiliationRole: 'Grace\'s favorite teacher; Maison Aurelia reception and guest welcome',
      personality: 'Has a special way of drawing out curiosity in students. Rare gift — the ability to make people feel welcome instantly. Knows everyone\'s name, family story, and history before they even reach her. Jokes, remembers names, leaves no one without a laugh.',
      relationships: 'Grace adores her and often talks about "Miss Donnelly" at home. Elena gets to know Maggie through school events. Friendship begins at parent-teacher meetings. Respects Elena\'s elegance but feels more at ease with Sara.',
      wivesClubRole: 'Extended Circle - Teacher',
      hubLocation: 'Charlotte',
      sourceFiles: 'Characters.docx',
      isConfirmed: true,
    },

    // === CHARLOTTE "LOTTIE" HALE === (Update existing)
    {
      name: 'Charlotte "Lottie" Hale',
      firstName: 'Charlotte',
      lastName: 'Hale',
      nickname: 'Lottie',
      archetype: 'Logistics & Grounding Force',
      appearance: 'Lottie isn\'t conventionally glamorous like Addie or Selene. She\'s sturdy rather than sleek — more practical than polished. Curves, freckles, glasses she\'s forever pushing back up her nose. Her beauty isn\'t immediate or "headline worthy," but it\'s the kind that grows the longer you\'re around her.',
      personality: 'Witty, self-deprecating, sharp-minded. She\'s the one who cracks the joke that breaks tension at the table, or who quietly remembers everyone\'s favorite coffee order. People underestimate her at first.',
      background: 'Grew up in Charlotte alongside Elena\'s younger sister Sara. While Sara was the athletic one and Elena the glamorous one, Lottie was the steady, practical friend who often kept them both grounded. When Elena began building Maison Aurelia, Lottie came on board first as an event logistics coordinator — the behind-the-scenes mind who could turn chaos into flawless elegance.',
      careerHistory: 'Event logistics coordinator → Maison Aurelia Operations Chief',
      relationships: 'Elena trusts her completely and treats her like extended family.',
      maisonAureliaRole: 'Operations Chief',
      wivesClubRole: 'Operations Mastermind',
      hubLocation: 'Charlotte',
      sourceFiles: 'Characters.docx',
      isConfirmed: true,
    },

    // === SARA HALE ===
    {
      name: 'Sara Hale',
      firstName: 'Sara',
      lastName: 'Hale',
      archetype: 'Athletic Heart / Teacher',
      affiliationRole: 'Co-founder of adaptive fitness program with Evie; workouts for special needs athletes',
      careerHistory: 'CrossFit entrepreneur; founded Athena Ascent adaptive fitness program with Evie Maren',
      personality: 'The Teacher With Too Much Heart. Athletic, fire-spirited.',
      relationships: 'Elena\'s younger sister. Married to Mark (ex-SF/PE). Mother to Lily, Emma, Ethan.',
      wivesClubRole: 'Core Member - Grounding Presence',
      hubLocation: 'Charlotte',
      sourceFiles: 'Characters.docx',
      isConfirmed: true,
    },
  ];

  console.log(`Processing ${characters.length} characters from Characters.docx...`);
  let added = 0;
  let updated = 0;
  let skipped = 0;

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
      // Update with new data
      await prisma.character.update({
        where: { id: existing.id },
        data: {
          ...char,
          // Don't overwrite existing fields with null
          appearance: char.appearance || existing.appearance,
          personality: char.personality || existing.personality,
          background: char.background || existing.background,
          careerHistory: char.careerHistory || existing.careerHistory,
          affiliationRole: char.affiliationRole || existing.affiliationRole,
          relationships: char.relationships || existing.relationships,
        }
      });
      console.log(`  Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
        }
      });
      console.log(`  Added: ${char.name}`);
      added++;
    }
  }

  console.log(`\nAdded: ${added}, Updated: ${updated}, Skipped: ${skipped}`);

  const count = await prisma.character.count();
  console.log(`Total characters in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
