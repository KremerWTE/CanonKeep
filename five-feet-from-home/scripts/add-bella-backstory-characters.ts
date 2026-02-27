import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Characters from Bella's Backstory...\n");

  const bellaCharacters = [
    // ========== VIVIAN "VEE" SINCLAIR ==========
    {
      name: 'Vivian "Vee" Sinclair',
      firstName: 'Vivian',
      lastName: 'Sinclair',
      nameVariants: 'Vee',
      archetype: 'International Consultant / Old Money',
      education: 'Harvard - Political Science, Art History minor',
      careerHistory: 'International consulting. Event circuits. Moves in circles of power and prestige.',
      affiliationRole: 'Wives Club Connection',
      relationships: "Bella's friend from sorority (Harvard/Boston College connection). First told Bella about the Wives Club. Old New England family with quiet wealth.",
      wivesClubRole: 'Core Circle - Ivy League Connection',
      background: "From old New England family with quiet wealth and deep Ivy League ties. Parents in law and academia. Harvard educated in Political Science. Polished, elegant, 'Ivy-coded'. Natural leader who is socially savvy. Bella's 'aspirational shadow' - the mirror of everything Bella thought she wasn't. Genuinely likes Bella, thinks of her as grounded, dependable, sharp.",
      personality: 'Charismatic, socially savvy, natural leader, effortless and approachable but elevated.',
    },

    // ========== TESSA (Bella's roommate) ==========
    {
      name: 'Tessa (Boston College)',
      firstName: 'Tessa',
      archetype: 'Event Planner / Bella\'s Best Friend',
      education: 'Boston College',
      careerHistory: 'Event planning after graduation.',
      relationships: "Bella's college roommate at Boston College. Closest friendship Bella had in college. Lives naturally drifted apart after graduation.",
      background: "Bella's college roommate and closest friend at Boston College. The only one who fully understood Bella's quieter depths. Warm, loyal. Went into event planning after graduation. Bella never really replaced that kind of friendship until BSS. Receives text from Bella after engagement dinner.",
    },

    // ========== MANDY (Denver) ==========
    {
      name: 'Mandy',
      firstName: 'Mandy',
      nameVariants: 'Denver',
      archetype: 'Former Agency / Ranch Owner / Veteran Support',
      careerHistory: 'Former Agency operative. Now runs ranch helping veterans with PTSD.',
      hubLocation: 'Denver / Ranch',
      relationships: "Bella's romantic partner. Former Agency operative. Helps veterans. Guiding Bella toward Matt.",
      wivesClubRole: 'Extended Circle - Veteran Support',
      background: "Left 'the Agency' as a wreck - had nights sitting in shower crying until water went cold. Helping veterans was the only way she could stand herself. Runs a ranch. Stunning with steel-green eyes. Made intimacy slow, gentle, and safe for Bella. Doesn't want kids. Actively supporting Bella finding her 'black king' (Matt). 'I'd rather watch you grow into everything you're meant to be than keep you small.'",
      personality: 'Calm but intent. Patient. Makes things safe. Gentle but strong.',
      appearance: 'Stunning. Steel-green eyes.',
    },

    // ========== MATT (Rancher) ==========
    {
      name: 'Matt (Rancher)',
      firstName: 'Matt',
      archetype: 'Rancher / Bella\'s Future',
      careerHistory: 'Rancher at Mandy\'s ranch.',
      hubLocation: 'Ranch / Denver area',
      relationships: "Bella's potential 'black king' (romantic endgame). Works at Mandy's ranch. Mandy is positioning him as Bella's future.",
      background: "Patient, respectful rancher. Treats Bella gently - 'same way you'd gentle a horse'. Gave her a soft peck on cheek after trail ride. Tips his cap. 'I had a good time too, Bella.' Mandy arranging for him to spend more time at ranch with Bella.",
      personality: 'Patient. Respectful. Gentle. Doesn\'t rush.',
    },

    // ========== DOC ==========
    {
      name: 'Doc',
      firstName: 'Doc',
      archetype: 'Medical / Support Professional',
      bssRole: 'Medical Support',
      relationships: 'Part of Hawk\'s protective network around Bella.',
      background: "Medical/support professional. Hawk ensured Doc was in Europe when Bella 'almost cracked'. Part of Hawk's protective network.",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of bellaCharacters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { firstName: char.firstName, lastName: char.lastName || undefined },
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
          sourceFiles: 'Bella Background Pre-BSS',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    }
  }

  // Update Bella with comprehensive backstory
  const bella = await prisma.character.findFirst({
    where: { name: 'Bella' }
  });
  if (bella) {
    await prisma.character.update({
      where: { id: bella.id },
      data: {
        education: 'Boston College - Business degree',
        careerHistory: 'Finance analyst at mid-tier Boston firm → BSS Analyst → Fixer. Also TX event support, COO/Marketing for Maison Aurelia, POH Page.',
        background: `Youngest of three siblings (two older brothers). Family owns café and bookstore - mother ran café (warm, charismatic), father ran bookstore (quiet, strategic). Learned to read people through customer service. Family business struggled after COVID.

At Boston College: Business degree (NOT Communications), sorority member - always #2 or #3 fixer behind scenes, never president. Earned reputation as dependable but rarely got credit. Closest friend: roommate Tessa. Learned about Wives Club from Harvard friend Vee Sinclair.

Post-college: Analyst at mid-tier Boston finance firm. Strong work ethic but never put herself forward for promotions. Found culture shallow and transactional. Craved purpose over profit.

Met BSS at charity gala - recruited for intangibles: trust, emotional intelligence, adaptability. Asked Addie to mentor her. Nearly cracked in Europe - Hawk had Doc positioned there.

Engagement dinner gifts: (1) Club pendant with sorority subsection symbol, (2) Bonus check larger than yearly salary, (3) Private gift - leather "My Fair Lady" signed "Mom" (Addie) and "Dad" (Hawk). Found crying in gym after receiving book.

Fire pit rituals with Hawk established father-daughter bond. Two questions: "How are you doing?" and "How can I support you?" Range training. Chess metaphors.

Romantic history: HS dated athlete, college law student boyfriend ended it, junior year guy genuinely into her but she didn't believe it, got close with sorority girl but circle disapproved. Core issue: doesn't believe she's worthy of love.

Current: Relationship with Mandy (Denver) - slow, gentle, safe. Realizes she wants kids someday (Mandy doesn't). Mandy guiding her toward Matt (rancher) as her "black king."`,
        relationships: 'Analyst for Kendra. Hawk is chosen father ("Dad"). Addie is chosen mother ("Mom"). Romantic partner: Mandy. Potential future: Matt. College roommate: Tessa. Harvard friend: Vee Sinclair. Elena guides her in business. Close to Grace. "Fun aunt" to kids.',
        personality: '"The glue" - holds people together. Strong moral compass but not naive. Can spot manipulation quickly. Takes on too much responsibility. Understated but highly competent. Improvises under pressure. Quiet, precise, always adjusting. Self-doubt and lack of self-worth. Doesn\'t think of herself as a leader - the fixer behind scenes.',
        motivations: 'To build her own empire while helping others build theirs. To find love that doesn\'t require her to shrink. To believe she\'s worthy.',
        fears: 'Being seen as just support staff forever. Choosing wrong in love. Not being "enough."',
        arcStart: 'Self-doubting background fixer who doesn\'t believe she deserves love or recognition.',
        arcChange: 'Through Hawk\'s mentorship, fire pit lessons, and Mandy\'s love, begins to see her own worth. "You\'re not the player anymore, daughter. You\'re the Queen."',
        arcEnd: 'Emerges as confident fixer, POH page, finds her "black king" in Matt.',
      }
    });
    console.log('\nUpdated Bella with comprehensive backstory');
  }

  // Update Hawk with Bella mentorship details
  const hawk = await prisma.character.findFirst({
    where: { name: { contains: 'Hawk' } }
  });
  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        mentorsMentees: 'Chosen father to Bella. Mentors her through fire pit rituals and range training. Chess grandmaster-level strategic teacher.',
        background: `Born and raised small-town Texas. Rough childhood, no safety net. Parents gone early. Decorated special operations background - calm under fire, lethal in execution. The Brotherhood became his true family. Vegas years deepened disillusionment with excess/corruption. Serves on board of veterans foundation. Financially independent. NOT a BSS employee - orbits BSS world through biotech security role. Became stay-at-home dad for first 3 years after twins.

Afghanistan trauma: Lost two men when he misread the board - thought enemy would hold north wall but they came through east. "The cost of misreading the board, Bella. Sometimes you don't just lose the game — you lose the pieces that trusted you."

Mentorship to Bella: Fire pit rituals with two questions - "How are you doing?" and "How can I support you?" Uses chess metaphors constantly. Teaches through stories. Range training (shooting, tactics). "Ranger TV" = staring at fire together. Calls Bella "daughter." Signed "My Fair Lady" book as "Dad."`,
      }
    });
    console.log('Updated Hawk with Bella mentorship details');
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
