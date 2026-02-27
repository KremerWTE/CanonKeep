import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Characters extracted from "new female characters.docx"
const newCharacters = [
  // === AUTUMN REESER-INSPIRED ===
  {
    name: "Eleanor Whitaker",
    nickname: "Nell",
    archetype: "The Steady Heart / Moral Center",
    age: "Mid-30s",
    profession: "Director of Community Health Initiatives",
    personality: "Calm, empathetic, principled, quietly courageous",
    coreWound: "Learned early to put everyone else first; fears wanting too much for herself",
    strength: "Can stabilize chaos without demanding credit",
    romanticDynamic: "Drawn to a man burdened by leadership or guilt; she sees his best self before he does",
    narrativeRole: "The woman people turn to when things fall apart. She does not dominate scenes—she anchors them. Her power is restraint, her influence moral rather than positional.",
    tags: "Autumn Reeser inspired, emotional anchor, moral center, potential love interest",
    status: "potential"
  },
  {
    name: "Claire Ashford",
    archetype: "The Elegant Professional with a Tender Core",
    age: "Late 30s",
    profession: "Nonprofit executive / Political liaison / Foundation COO",
    personality: "Polished, articulate, strategic—but deeply romantic",
    coreWound: "Learned to armor herself after loving the wrong man at the wrong time",
    strength: "Balances heart and intellect with rare grace",
    romanticDynamic: "Slow-burn love rooted in mutual respect and shared mission",
    narrativeRole: "Thrives in rooms of power yet longs for intimacy that doesn't require performance. Believable in boardrooms and kitchens at midnight.",
    tags: "Autumn Reeser inspired, professional, slow burn romance, foundation executive",
    status: "potential"
  },
  {
    name: "Maggie Sullivan",
    archetype: "The Girl Who Stayed / Keeper of Home",
    age: "Early-mid 30s",
    profession: "Innkeeper, event planner, or family business operator",
    personality: "Warm, witty, emotionally intuitive",
    coreWound: "Watched others leave while she stayed behind",
    strength: "Creates belonging wherever she goes",
    romanticDynamic: "Reunion romance with someone who once left to 'become someone'",
    narrativeRole: "Represents rootedness. She is memory, continuity, and forgiveness embodied—never naive, never bitter.",
    tags: "Autumn Reeser inspired, hometown, keeper of traditions",
    status: "potential"
  },
  {
    name: "Dr. Lillian Moore",
    archetype: "The Compassionate Intellect",
    age: "Late 30s-early 40s",
    profession: "Physician, therapist, or research director",
    personality: "Thoughtful, emotionally perceptive, ethically rigorous",
    coreWound: "Carries responsibility for outcomes she couldn't control",
    strength: "Can sit with pain—hers and others'—without flinching",
    romanticDynamic: "Intimate, emotionally literate partnership built on trust",
    narrativeRole: "Where science meets soul. She asks hard questions but offers gentle answers.",
    tags: "Autumn Reeser inspired, medical professional, emotional intelligence",
    status: "potential"
  },
  {
    name: "Anna Carlisle",
    archetype: "The Quietly Devoted Believer",
    age: "Mid-30s",
    profession: "School administrator, parish program director, counselor",
    personality: "Gentle, observant, deeply faithful without being rigid",
    coreWound: "Learned to endure disappointment with grace",
    strength: "Spiritual steadiness; hope that survives loss",
    romanticDynamic: "Love grounded in shared values and sacrificial trust",
    narrativeRole: "Embodies the unseen strength of faith lived daily. She doesn't preach—she lives truth.",
    tags: "Autumn Reeser inspired, faith-adjacent, Catholic values",
    status: "potential"
  },

  // === ASHLEY WILLIAMS-INSPIRED ===
  {
    name: "Julia Bennett",
    archetype: "The Fast-Thinking Optimist / Verbal Sparring Partner",
    age: "Mid-30s",
    profession: "Communications Director / Marketing Lead / Crisis PR",
    personality: "Sharp, playful, emotionally perceptive, fearless in conversation",
    coreWound: "Uses humor to stay ahead of disappointment",
    strength: "Can defuse tension and expose truth in the same breath",
    romanticDynamic: "Banter-heavy romance with intellectual equals",
    narrativeRole: "Talks fast because she thinks faster. Can charm a room and still notice the one person not smiling.",
    tags: "Ashley Williams inspired, communications, banter, enemies-to-lovers",
    status: "potential"
  },
  {
    name: "Rebecca Lawson",
    nickname: "Beck",
    archetype: "The Competent Chaos Manager",
    age: "Late 30s",
    profession: "Event producer, nonprofit COO, operations lead",
    personality: "Organized, resilient, funny under pressure",
    coreWound: "Learned early that if she didn't handle it, no one would",
    strength: "Keeps everything moving—until she finally stops",
    romanticDynamic: "Learns to accept help and partnership",
    narrativeRole: "The person who holds the whole machine together with spreadsheets, coffee, and dry humor—until the story forces her to let someone else step in.",
    tags: "Ashley Williams inspired, operations, COO potential, event management",
    status: "potential"
  },
  {
    name: "Caroline Pierce",
    archetype: "The Warm Professional / Reluctant Romantic",
    age: "Early-mid 40s",
    profession: "HR Director, School Administrator, Legal Ops",
    personality: "Approachable, ethical, quietly idealistic",
    coreWound: "Believes stability must come at the cost of passion",
    strength: "Models healthy leadership and emotional maturity",
    romanticDynamic: "Slow realization that love doesn't disrupt order—it deepens it",
    narrativeRole: "Represents adulthood done well. She isn't jaded—she's careful. Her arc is rediscovering joy without losing herself.",
    tags: "Ashley Williams inspired, HR, second-act love story",
    status: "potential"
  },
  {
    name: "Sophie Grant",
    archetype: "The Curious Connector / Relational Catalyst",
    age: "Early 30s",
    profession: "Podcast host, journalist, community organizer",
    personality: "Inquisitive, empathetic, socially agile",
    coreWound: "Feels responsible for keeping everyone else connected",
    strength: "Sees patterns between people others miss",
    romanticDynamic: "Falls for someone emotionally reserved or misunderstood",
    narrativeRole: "The bridge-builder. She asks the questions no one else thinks to ask—and listens long enough to hear the real answer.",
    tags: "Ashley Williams inspired, journalist, community builder",
    status: "potential"
  },
  {
    name: "Kate Donovan",
    archetype: "The Big-Hearted Realist",
    age: "Mid-to-late 30s",
    profession: "Nonprofit fundraiser, development director, civic leader",
    personality: "Practical, affectionate, disarmingly honest",
    coreWound: "Learned that loving people doesn't mean they stay",
    strength: "Shows up anyway",
    romanticDynamic: "Grounded love built on shared service and purpose",
    narrativeRole: "Believes in people even when they disappoint her. Her strength is not idealism—it's persistence.",
    tags: "Ashley Williams inspired, fundraiser, civic leader",
    status: "potential"
  },

  // === LACEY CHABERT-INSPIRED ===
  {
    name: "Emily Harper",
    archetype: "The Earnest Optimist / Keeper of Traditions",
    age: "Early-mid 30s",
    profession: "Small-town architect, preservationist, or family business manager",
    personality: "Kind, hopeful, quietly determined",
    coreWound: "Afraid that growing beyond home means betraying it",
    strength: "Holds people together through consistency and care",
    romanticDynamic: "Rekindled love with someone who left—and returns changed",
    narrativeRole: "Emotional gravity. People orbit her because she makes them feel safe without making them small.",
    tags: "Lacey Chabert inspired, hometown, traditions",
    status: "potential"
  },
  {
    name: "Natalie Brooks",
    archetype: "The Gentle Professional / Heart-Led Leader",
    age: "Mid-30s",
    profession: "Teacher, guidance counselor, nonprofit program director",
    personality: "Nurturing, patient, emotionally articulate",
    coreWound: "Believes her needs are less important than others'",
    strength: "Leads through encouragement, not authority",
    romanticDynamic: "Love that grows from friendship into devotion",
    narrativeRole: "Doesn't demand attention—she earns it. Her presence softens sharp edges and invites honesty.",
    tags: "Lacey Chabert inspired, teacher, friends-to-lovers",
    status: "potential"
  },
  {
    name: "Claire Montgomery",
    archetype: "The Polished Heart / City-to-Soul Convert",
    age: "Late 30s",
    profession: "Corporate strategist, consultant, or brand executive",
    personality: "Refined, thoughtful, increasingly self-aware",
    coreWound: "Trained herself to succeed before she learned to feel",
    strength: "Integrates ambition with emotional truth",
    romanticDynamic: "Falls for someone rooted, grounded, and emotionally fluent",
    narrativeRole: "Her arc is not about abandoning success—it's about redefining it.",
    tags: "Lacey Chabert inspired, corporate, transformation arc",
    status: "potential"
  },
  {
    name: "Hannah Wells",
    archetype: "The Faithful Companion / Quiet Heroine",
    age: "Early 40s",
    profession: "Social worker, parish administrator, hospice coordinator",
    personality: "Compassionate, steady, spiritually grounded",
    coreWound: "Learned to grieve without complaint",
    strength: "Endurance, not spectacle",
    romanticDynamic: "Mature love shaped by shared trials",
    narrativeRole: "The person who stays when things are hardest. She doesn't rescue—she accompanies.",
    tags: "Lacey Chabert inspired, faith-adjacent, hospice, second-chance romance",
    status: "potential"
  },
  {
    name: "Lily Carter",
    archetype: "The Creative Caregiver",
    age: "Early 30s",
    profession: "Baker, florist, children's book illustrator, artisan",
    personality: "Gentle, imaginative, emotionally intuitive",
    coreWound: "Fears that her softness makes her invisible",
    strength: "Creates beauty that changes people quietly",
    romanticDynamic: "Love that recognizes and protects her sensitivity",
    narrativeRole: "Reminds the story that gentleness is not weakness—it's influence without force.",
    tags: "Lacey Chabert inspired, creative, artisan, gentle soul",
    status: "potential"
  },

  // === ALISON SWEENEY-INSPIRED ===
  {
    name: "Meredith Kane",
    archetype: "The Relentless Protector / Survivor-Leader",
    age: "Early-mid 40s",
    profession: "Former federal agent, private investigator, security consultant",
    personality: "Direct, vigilant, emotionally controlled",
    coreWound: "Learned early that safety is never guaranteed",
    strength: "Can operate under pressure without losing moral clarity",
    romanticDynamic: "Slow-trust relationship built on shared risk and respect",
    narrativeRole: "Doesn't look for danger—it finds her. She moves forward anyway, not because she's fearless, but because she refuses to let fear decide.",
    tags: "Alison Sweeney inspired, security, former agent, protector",
    status: "potential"
  },
  {
    name: "Julia Harrington",
    archetype: "The Reformer / Woman Rebuilding Her Life",
    age: "Mid-to-late 40s",
    profession: "Nonprofit executive, political reform advocate, community leader",
    personality: "Pragmatic, principled, emotionally honest",
    coreWound: "Paid dearly for trusting the wrong people",
    strength: "Rebuilds institutions and relationships with equal discipline",
    romanticDynamic: "Mature partnership rooted in accountability and shared purpose",
    narrativeRole: "Not interested in appearances—only outcomes. Her arc is about redemption without denial.",
    tags: "Alison Sweeney inspired, reformer, leadership, second act",
    status: "potential"
  },
  {
    name: "Kate O'Connor",
    archetype: "The Organized Fixer / Emotional Strategist",
    age: "Early 40s",
    profession: "Event strategist, operations director, crisis manager",
    personality: "Efficient, sharp, quietly affectionate",
    coreWound: "Learned to equate worth with usefulness",
    strength: "Turns chaos into order—externally and internally",
    romanticDynamic: "Learns to be chosen, not needed",
    narrativeRole: "The person everyone relies on—until the story asks who she relies on when everything breaks.",
    tags: "Alison Sweeney inspired, operations, crisis manager, fixer",
    status: "potential"
  },
  {
    name: "Sarah Whitman",
    archetype: "The Resilient Mother / Quiet Fighter",
    age: "Late 40s",
    profession: "Healthcare administrator, school board chair, nonprofit COO",
    personality: "Protective, compassionate, unyielding when it matters",
    coreWound: "Carries guilt for moments she couldn't protect her family",
    strength: "Models strength through consistency and care",
    romanticDynamic: "Love after loss, built carefully and honestly",
    narrativeRole: "Her courage is not dramatic—it's daily. She shows what it means to keep going when stopping would be easier.",
    tags: "Alison Sweeney inspired, mother, healthcare, resilience",
    status: "potential"
  },
  {
    name: "Rachel Donovan",
    archetype: "The Truth-Seeker / Restorative Heroine",
    age: "Early 40s",
    profession: "Investigative journalist, true-crime podcaster, legal researcher",
    personality: "Curious, ethical, relentless with empathy",
    coreWound: "Once stayed silent when truth mattered",
    strength: "Asks the questions others avoid—and listens to the answers",
    romanticDynamic: "Bond formed through shared search for justice",
    narrativeRole: "Believes truth is an act of love, even when it costs her.",
    tags: "Alison Sweeney inspired, journalist, investigative, truth-seeker",
    status: "potential"
  },

  // === ELOISE MUMFORD-INSPIRED ===
  {
    name: "Violet Harper",
    archetype: "The Gentle Observer / Emotional Deep-Water",
    age: "Early-mid 30s",
    profession: "Archivist, librarian, museum researcher, historian",
    personality: "Thoughtful, reserved, perceptive, quietly humorous",
    coreWound: "Learned early that being unseen was safer",
    strength: "Notices what others overlook—and remembers it",
    romanticDynamic: "Drawn to someone outwardly confident but inwardly lonely",
    narrativeRole: "Doesn't dominate scenes; she changes them. Her power lies in presence, timing, and emotional accuracy.",
    tags: "Eloise Mumford inspired, archivist, observer, slow-burn",
    status: "potential"
  },
  {
    name: "Eleanor Bell",
    nickname: "Nora",
    archetype: "The Soft-Spoken Idealist",
    age: "Mid-30s",
    profession: "Grant writer, nonprofit program designer, philanthropy analyst",
    personality: "Idealistic, ethical, emotionally articulate once trust is earned",
    coreWound: "Afraid that hope makes her naïve",
    strength: "Believes in people even after disappointment",
    romanticDynamic: "Love that grows through shared values and quiet acts",
    narrativeRole: "Operates behind the scenes, shaping outcomes without ever seeking the spotlight.",
    tags: "Eloise Mumford inspired, grant writer, philanthropy, idealist",
    status: "potential"
  },
  {
    name: "Claire Rowan",
    archetype: "The Artist with Restraint",
    age: "Early 30s",
    profession: "Photographer, illustrator, ceramicist, or textile artist",
    personality: "Creative, introspective, emotionally intuitive",
    coreWound: "Was once told her sensitivity was impractical",
    strength: "Translates emotion into beauty",
    romanticDynamic: "Falls for someone who protects her creative space rather than tries to fix her",
    narrativeRole: "Reminds the story that beauty often comes from stillness, not spectacle.",
    tags: "Eloise Mumford inspired, artist, creative, sensitive soul",
    status: "potential"
  },
  {
    name: "Margaret Ellis",
    nickname: "Maggie",
    archetype: "The Caregiver Who Forgot Herself",
    age: "Late 30s-early 40s",
    profession: "Hospice coordinator, patient advocate, pastoral care liaison",
    personality: "Compassionate, emotionally resilient, quietly weary",
    coreWound: "Learned to be strong by being needed",
    strength: "Endurance paired with tenderness",
    romanticDynamic: "Love that teaches her she is worthy of care too",
    narrativeRole: "The person who stays at the bedside long after others leave. Her arc is about choosing herself without abandoning others.",
    tags: "Eloise Mumford inspired, hospice, caregiver, self-discovery",
    status: "potential"
  },
  {
    name: "Anna Whitlow",
    archetype: "The Woman on the Threshold",
    age: "Early-mid 30s",
    profession: "Policy analyst, academic fellow, editorial assistant",
    personality: "Intelligent, self-questioning, ethically serious",
    coreWound: "Afraid to step fully into her own life",
    strength: "Moral clarity paired with courage-in-progress",
    romanticDynamic: "Partnership that invites her forward rather than pulling her",
    narrativeRole: "Exists at the edge of change. The story begins when she decides to step through.",
    tags: "Eloise Mumford inspired, policy, academia, transformation",
    status: "potential"
  },

  // === PRINCESS SWITCH / LAWYER ARCHETYPES ===
  {
    name: "Isabella Montrose",
    nickname: "Bella",
    archetype: "The Hidden Heir / Accidental Royal",
    age: "Early 30s",
    profession: "European principality princess / diplomatic figure",
    personality: "Warm, curious, emotionally open",
    coreWound: "Feels unworthy of inherited authority",
    strength: "Moral clarity shaped by ordinary life",
    romanticDynamic: "Falls for someone who treats her as a woman first, title second",
    narrativeRole: "Exposes the hollowness of inherited power and redeems it by inhabiting it honestly.",
    tags: "Princess Switch inspired, hidden heir, royalty, dual identity",
    status: "potential"
  },
  {
    name: "Margaret Vale",
    archetype: "The Crowned Strategist / Woman of Duty",
    age: "Early-mid 30s",
    profession: "Monarch, duchess, or legacy CEO",
    personality: "Disciplined, elegant, emotionally restrained",
    coreWound: "Learned early that love is a liability",
    strength: "Strategic intelligence and command presence",
    romanticDynamic: "Love that challenges duty without undermining it",
    narrativeRole: "Who Bella might become without love. Her arc is learning that duty and intimacy are not opposites.",
    tags: "Princess Switch inspired, royalty, duty, leadership",
    status: "potential"
  },
  {
    name: "Stella Reed",
    archetype: "The Commoner with Royal Bearing",
    age: "Early 30s",
    profession: "Baker, logistics coordinator, nonprofit operator",
    personality: "Grounded, witty, emotionally fluent",
    coreWound: "Never imagined a life bigger than survival",
    strength: "Natural leadership without entitlement",
    romanticDynamic: "Love born from equality, not awe",
    narrativeRole: "Proves nobility is not inherited—it's practiced.",
    tags: "Princess Switch inspired, commoner, natural leader",
    status: "potential"
  },
  {
    name: "Claire Whitman",
    archetype: "The Ethical Advocate",
    age: "Late 30s-early 40s",
    profession: "Civil litigator / nonprofit counsel",
    personality: "Principled, articulate, quietly idealistic",
    coreWound: "Once compromised her values to survive professionally",
    strength: "Moral courage under pressure",
    romanticDynamic: "Love that respects her boundaries and mission",
    narrativeRole: "Anchors the story in truth and consequence. She is often the conscience of the ensemble.",
    tags: "Lawyer archetype, civil rights, ethical advocate, conscience",
    status: "potential"
  },
  {
    name: "Natalie Brooks, Esq.",
    archetype: "The Controlled Professional Learning to Feel",
    age: "Early 40s",
    profession: "Corporate or estate attorney",
    personality: "Efficient, guarded, intellectually warm",
    coreWound: "Learned to suppress emotion to be taken seriously",
    strength: "Precision and foresight",
    romanticDynamic: "Softening through shared values, not chaos",
    narrativeRole: "Her arc is not abandoning ambition—it's integrating humanity.",
    tags: "Lawyer archetype, corporate attorney, emotional thaw",
    status: "potential"
  },
  {
    name: "Elena Ramirez",
    archetype: "The Justice-Seeking Reformer",
    age: "Mid-30s",
    profession: "Housing rights attorney / immigration advocate",
    personality: "Passionate, disciplined, emotionally sincere",
    coreWound: "Carries responsibility for people she couldn't save",
    strength: "Endurance fueled by hope",
    romanticDynamic: "Partnership rooted in shared service",
    narrativeRole: "Bridges law, faith, and community, making her ideal for mission-driven plots.",
    tags: "Lawyer archetype, housing rights, immigration, justice",
    status: "potential"
  },

  // === ERIN KRAKOW-INSPIRED ===
  {
    name: "Abigail Monroe",
    archetype: "The Steadfast Idealist / Moral North Star",
    age: "Early-mid 30s",
    profession: "Community development director, historical foundation lead",
    personality: "Principled, compassionate, quietly courageous",
    coreWound: "Learned to endure loss without bitterness",
    strength: "Hope anchored in action, not fantasy",
    romanticDynamic: "Love built through shared endurance and trust",
    narrativeRole: "The soul of the story. When others waver, she remembers why the mission matters.",
    tags: "Erin Krakow inspired, community development, moral center",
    status: "potential"
  },

  // === BETHANY JOY LENZ-INSPIRED ===
  {
    name: "Grace Holloway",
    archetype: "The Reflective Rebuilder / Faith-Adjacent Woman",
    age: "Late 30s-early 40s",
    profession: "Music therapist, retreat director, nonprofit counselor",
    personality: "Thoughtful, artistic, emotionally articulate",
    coreWound: "Trusted a system that betrayed her",
    strength: "Rebuilds faith on her own terms",
    romanticDynamic: "Love that doesn't demand certainty—only presence",
    narrativeRole: "Shows what it means to reconstruct faith after institutional failure.",
    tags: "Bethany Joy Lenz inspired, music therapy, faith journey, rebuilder",
    status: "potential"
  },

  // === RACHAEL LEIGH COOK-INSPIRED ===
  {
    name: "Megan Clarke",
    archetype: "The Quietly Brilliant Professional",
    age: "Late 30s",
    profession: "Research scientist, architect, policy analyst",
    personality: "Intelligent, understated, emotionally precise",
    coreWound: "Never learned to advocate for herself",
    strength: "Solves problems others can't see yet",
    romanticDynamic: "Love with someone who sees her before she speaks",
    narrativeRole: "The one who notices the pattern, finds the flaw, and fixes it quietly.",
    tags: "Rachael Leigh Cook inspired, scientist, problem-solver, quiet brilliance",
    status: "potential"
  },

  // === JILL WAGNER-INSPIRED ===
  {
    name: "Cassidy Brooks",
    archetype: "The Capable Protector / Action with Heart",
    age: "Mid-30s",
    profession: "Search and rescue, park ranger, security specialist",
    personality: "Decisive, physically capable, emotionally grounded",
    coreWound: "Learned young that strength was survival",
    strength: "Protects without needing to dominate",
    romanticDynamic: "Love with someone who matches her strength differently",
    narrativeRole: "The woman who runs toward danger, not away from it—but knows why coming home matters.",
    tags: "Jill Wagner inspired, search and rescue, protector, action heroine",
    status: "potential"
  },

  // === ALEXA PENAVEGA-INSPIRED ===
  {
    name: "Daniela Reyes",
    archetype: "The Energetic Heart / Faith-Rooted Connector",
    age: "Early 30s",
    profession: "Youth minister, event coordinator, community outreach",
    personality: "Vibrant, relational, emotionally expressive",
    coreWound: "Fears slowing down means being forgotten",
    strength: "Brings people together through joy",
    romanticDynamic: "Love that teaches her rest is not retreat",
    narrativeRole: "The one who organizes the event, remembers the birthdays, and makes everyone feel seen.",
    tags: "Alexa PenaVega inspired, youth ministry, community, energetic",
    status: "potential"
  }
];

async function main() {
  console.log('Adding new female characters from document...\n');

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  let created = 0;
  let skipped = 0;

  for (const char of newCharacters) {
    // Check if character already exists
    const existing = await prisma.character.findFirst({
      where: {
        name: char.name,
        projectId: project.id
      }
    });

    if (existing) {
      console.log(`⏭️  Skipped (exists): ${char.name}`);
      skipped++;
      continue;
    }

    // Build background from archetype info
    const background = [
      char.archetype ? `Archetype: ${char.archetype}` : '',
      char.coreWound ? `Core Wound: ${char.coreWound}` : '',
      char.strength ? `Strength: ${char.strength}` : '',
      char.narrativeRole ? `Narrative Role: ${char.narrativeRole}` : ''
    ].filter(Boolean).join('\n\n');

    // Extract actress inspiration from tags for modeledAfter field
    const actressMatch = char.tags?.match(/^([A-Za-z\s]+) inspired/);
    const modeledAfter = actressMatch ? actressMatch[1].trim() : null;

    await prisma.character.create({
      data: {
        projectId: project.id,
        name: char.name,
        nickname: char.nickname || null,
        archetype: char.archetype || null,
        age: char.age || null,
        careerHistory: char.profession || null,
        personality: char.personality || null,
        background: background,
        relationships: char.romanticDynamic ? `Romantic Dynamic: ${char.romanticDynamic}` : null,
        modeledAfter: modeledAfter,
        tags: char.tags || null,
        isConfirmed: false,
        affiliationRole: 'Potential Character',
        reputationalNotes: 'New character from planning document',
        sourceFiles: 'new female characters.docx',
      }
    });

    console.log(`✅ Created: ${char.name} (${char.archetype})`);
    created++;
  }

  console.log(`\n--- Summary ---`);
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total: ${created + skipped}`);

  const totalChars = await prisma.character.count();
  console.log(`\nTotal characters in database: ${totalChars}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
