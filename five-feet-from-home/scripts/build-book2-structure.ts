import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Book 2 chapter structure - ends at Lucas's Baptism
// From Chat 1 document - Elena pregnant, Kendra introduced, Lucas born
// Addison arc: trust → Kendra connection → threesome → promotion
// Threesome and promotion happen BEFORE wedding/baptism
const book2Chapters = [
  // PART 1 — Foundations & New Tensions
  // Tone: Relationships redefined, big news drops, new players appear.
  { number: 1, title: 'New Season, Old Habits', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Jasper at his desk early — juggling three fresh conflicts: NFL ownership issue, a global supply chain mess, and an IP breach. Claire Ashford arrives for her first day. Jasper reflects on why he hired her: after Elena\'s health scare, he realized his team was running on adrenaline and willpower alone. He found Claire through a Pentagon contact — she\'d built mental performance programs for Navy SEALs and Fortune 100 executives. Former Division I swimmer and Olympic hopeful who blew out her shoulder junior year. Instead of quitting, she reinvented herself as an endurance athlete — became an Ironman World Champion. Then pivoted to sports psychology and high-stakes corporate performance. "She doesn\'t fix broken people," his contact said. "She makes elite performers sustainable." Exactly what BSS needs.' },
  { number: 2, title: 'The Lunch with Elena', pov: 'Elena Barrett', location: 'Charlotte', synopsis: 'Elena has stepped back into real estate + a non-profit role, energized and more confident since the Wife Club Zoom in Book 1. Harper meets Ethan for the first time on-page. Sara mentions Kendra — "placed third in regionals, she\'s a machine."' },
  { number: 3, title: 'Sara\'s Pool Party', pov: 'Elena Barrett', location: 'Sara\'s House', synopsis: 'Pool/BBQ at Sara\'s. Kendra, Dylan, Tasha, and Eli introduced — the elite athlete crew. Kendra and Addison click right away, talking gym programming and training splits. Addison floats the idea of Kendra training them both. Elena notices their chemistry and files it away. First hint of jealousy.' },
  { number: 4, title: 'Wives\' Circle Lunch', pov: 'Elena Barrett', location: 'Charlotte Rooftop', synopsis: 'In-person rooftop lunch. Harper teased about "mystery man" (Ethan). Two crises pop for Jasper: European client tied to African coup, NFL agent crisis PR request. Addison announces Kendra is now their "joint trainer" — she\'s bringing her into their world. Elena feels a flicker of being replaced.' },
  { number: 5, title: 'Shower Reveal', pov: 'Jasper/Elena', location: 'Oak Watch', synopsis: 'Playful intimacy between Elena & Jasper in the shower. Twist: They\'ve been quietly trying for baby #2... and it\'s happened. Before they can savor it, Jasper gets pulled into multiple conflicts.' },

  // PART 2 — Escalation & Shifting Roles
  // Tone: Crises heat up, Harper slipping, Addison/Kendra growing closer.
  { number: 6, title: 'Stacking the Deck', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'NFL issue explodes — public feud between owners. Africa coup subplot intensifies. Jasper brings Addison closer into strategy sessions. Harper out of town with Ethan — first signs she\'s slipping.' },
  { number: 7, title: 'Kendra\'s Regional', pov: 'Elena Barrett', location: 'CrossFit Venue', synopsis: 'Kendra competes in regional CrossFit competition. Addison can\'t attend — away on a work trip with Jasper. Elena goes to support Kendra instead. They bond over post-competition dinner. Kendra opens up about not feeling like she belongs at the office.' },
  { number: 8, title: 'Claire\'s Assessment', pov: 'Claire', location: 'The Forge', synopsis: 'Claire\'s first POV chapter. She reflects on her journey — the shoulder injury that ended her Olympic swimming dreams at 20, the dark year that followed where she nearly gave up entirely. Then her college coach suggested triathlon — "You can\'t sprint anymore, but you can endure." She threw herself into it, learned to rebuild around limitations instead of fighting them. Four years later: Ironman World Champion in Kona. But standing on that podium, she realized winning wasn\'t what saved her — understanding the mental game was. PhD at Stanford, consulting for SEAL Team Six, then a decade with CEOs who ran companies like combat operations. She sees BSS clearly: brilliant people redlining their nervous systems. Jasper\'s blind spot is thinking he can outwork any problem. Harper\'s hiding something — her focus is fractured. But Addison... Claire watches her in a meeting, the way she tracks conversations like a chess player seeing three moves ahead. "Interesting," she murmurs. Kendra around the office more now (Addison pulling her in for logistics help). Claire notices Kendra\'s hesitancy too — athletic confidence that hasn\'t translated to the boardroom yet. Multiple projects to work on.' },
  { number: 9, title: 'Harper\'s Reveal', pov: 'Harper', location: 'Oak Watch', synopsis: 'Harper formally introduces Ethan to Jasper and Elena — a private dinner, just the four of them. Jasper skeptical but polite — protective older brother energy. Elena likes him. Harper nervous, wanting their approval. The rest of the circle won\'t meet him until the wedding/baptism weekend.' },
  { number: 10, title: 'Three Fires at Once', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Jasper juggling: NFL at peak media frenzy, coup destabilizing client region, Asian market manipulation. Harper trying to help but Ethan distractions pull her focus.' },
  { number: 11, title: 'Claire\'s Intervention', pov: 'Claire', location: 'The Forge', synopsis: 'Claire pulls Harper into her office after a missed deadline. No judgment — just observation. "You\'re splitting your attention, and it\'s showing." Harper defensive at first, then breaks: "I don\'t know how to be good at both." Claire gets it — she lost herself in a relationship once too, a fellow swimmer during rehab. She gave up pieces of herself to keep him happy, and by the time she realized it, she\'d lost both the relationship and her sense of self. "I rebuilt from scratch," Claire tells Harper. "You don\'t have to. Love doesn\'t have to cost you your edge — but you have to learn to hold both." They start weekly sessions: compartmentalization techniques she developed with Special Forces operators, focus triggers, reclaiming identity. Harper asks, "Did you ever find someone who fit?" Claire smiles. "Still looking. But I know who I am now. That\'s the foundation."' },
  { number: 12, title: 'Kendra Wins', pov: 'Multiple', location: 'Charlotte', synopsis: 'Kendra wins her Games division — big celebration. Even Jasper toasts her. Elena says, "We\'re stealing her for the office full-time." Addison and Kendra inseparable at the party.' },

  // PART 3 — Collisions & Resets
  // Tone: High stakes meet personal turning points.
  { number: 13, title: 'Elena\'s Push', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena insists Jasper step up for Harper. Jasper starts mentoring Addison. Elena announces pregnancy to close friends. She also admits to Addison she noticed her closeness with Kendra — Addison reassures her.' },
  { number: 14, title: 'The Fixer\'s Eye', pov: 'Claire', location: 'The Forge', synopsis: 'Claire observes Addison in a strategy session — notices how she reads the room, anticipates problems before they surface, connects dots others miss. It reminds her of the best operators she worked with at DEVGRU — not the loudest ones, but the ones who saw the whole battlefield. After the meeting, Claire pulls her aside: "You see things. Most people react to fires. You smell the smoke before it starts." Addison, surprised: "I just notice patterns." Claire: "I spent a decade with SEALs. The ones who survive aren\'t the strongest — they\'re the ones who read situations before they unfold. You have that instinct. It\'s rare." She shares her philosophy: crisis management isn\'t about putting out fires, it\'s about seeing which sparks will catch. "Jasper\'s brilliant at the fix. You could be brilliant at the prevent." They begin working together — scenario exercises from her Pentagon days, crisis simulations, teaching Addison to trust her gut and articulate what she sees.' },
  { number: 15, title: 'Engagement Party Chaos', pov: 'Multiple', location: 'Charlotte', synopsis: 'Harper & Ethan announce engagement — same week Elena\'s pregnancy news hits wider circle. NFL agent joins team part-time. Kendra assists on a sports sponsorship deal, nails it.' },
  { number: 16, title: 'Finding Their Footing', pov: 'Claire', location: 'The Forge/Charlotte', synopsis: 'Claire reflects on why this team matters to her. After years of consulting — Pentagon contracts, Fortune 100 boardrooms, operators who went home to empty apartments — she\'d started to wonder if sustainable excellence was even possible. Most high performers burned out or burned relationships. BSS is different: Jasper chose family over a client and it made him better, not worse. Harper in session: she\'s regaining focus, learning to hold both worlds. "I forgot I was good at this before him." Claire: "You didn\'t forget. You just stopped trusting yourself." Meanwhile, Addison runs a mock crisis scenario — nails the read, anticipates second-order effects, even catches something Claire missed. Later, Claire to Jasper privately: "Harper\'s finding her balance. She\'ll be sharper than before — people who almost lose something fight harder to keep it. And Addison? She\'s not just coordinator material anymore. She thinks like us. Maybe better." Jasper nods. "Elena saw it first. She always does."' },
  { number: 17, title: 'Piling On', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'All conflicts converge: NFL nightmare, Africa coup, Tech COO trouble. Claire runs war-room coaching day. Kendra speaks up in a meeting — her comment carries weight.' },
  { number: 18, title: 'Addison\'s Trial by Fire', pov: 'Addison', location: 'The Forge', synopsis: 'Addison runs point on NFL media coordination — proves she can handle heat. Harper drops a ball but recovers quickly, using Claire\'s techniques. Jasper notices the improvement. Addison and Kendra travel together for a day trip, hotel gym workout afterward.' },

  // PART 4 — Lucas, Threesome, & The Weekend
  // Tone: Birth, culmination, celebration.
  { number: 19, title: 'The Waiting Room', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Elena goes into labor. Jasper races from The Forge. Hours in the waiting room — Harper, Addison, Kendra, Sara all there. Grace asking questions. The inner circle holding vigil.' },
  { number: 20, title: 'Lucas Arrives', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Lucas Barrett is born. Jasper holds his son for the first time. Elena exhausted but radiant. Grace meets her baby brother. Addison and Kendra both there — Elena squeezes Addison\'s hand in gratitude.' },
  { number: 21, title: 'Party Prep Night', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Night before the wedding. Addison & Kendra upstairs steaming dresses in matching silk robes and lingerie. They start kissing — slow, unhurried. Elena walks in, pauses, then smiles: "Finish the dresses before the after-party." Grace bounds in wanting to get dressed with them.' },
  { number: 22, title: 'The Threesome', pov: 'Jasper/Elena/Addison', location: 'Oak Watch', synopsis: 'After the dresses, after Grace is asleep. Elena initiates with Addison — the culmination of trust built through hospital visits, Grace, everything. One night of connection. Not transactional. Kendra knows, gives them space.' },
  { number: 23, title: 'Morning After', pov: 'Multiple', location: 'Oak Watch', synopsis: 'The morning after. Quiet understanding between Elena and Addison. Jasper promotes Addison to junior strategist at breakfast — earned through work, sealed by trust. "You\'ve proven yourself. This is official."' },
  { number: 24, title: 'Wedding Weekend', pov: 'Multiple', location: 'Charlotte Church/Venue', synopsis: 'First Wives Club wedding — full glamour. Harper radiant as maid of honor. Elena with baby Lucas, glowing. Addison in pastel yellow, Kendra in mint-green wrap dress. The new junior strategist holds court with the Tier 1 guys. Everyone finally meets Ethan.' },
  { number: 25, title: 'Baptism Morning', pov: 'Jasper Barrett', location: 'Charlotte Church', synopsis: 'Same church — sacred calm after wedding chaos. Lucas\'s baptism. Jasper\'s presence means the world to Elena. Addison and Kendra help dress Grace. The family surrounded by their chosen circle.' },
  { number: 26, title: 'Closing Circles', pov: 'Multiple', location: 'Oak Watch', synopsis: 'Post-baptism brunch at Oak Watch. NFL resolved, Africa stable, Harper balanced and sharp again. Claire finds Jasper on the porch — she\'s had offers from three Fortune 100 companies since starting with BSS. "I\'m turning them down. Signing on for Year Two." Jasper surprised: "We can\'t match their money." Claire: "I\'ve worked with SEALs, senators, CEOs worth billions. Most of them were running from something. You\'re the first one I\'ve seen running toward something." She gestures inside — Elena holding Lucas, Grace showing Addison a drawing, Harper laughing with Kendra. "You built something real. I want to see how far it can go." Lucas sleeping in Jasper\'s arms. Later, Jasper tells Harper about Kendra: "She\'s not you or Addison, but she\'s calculated. We can use that." Addison catches Claire\'s eye across the room — a nod of recognition between mentor and protégé. Seeds planted for Book 3.' }
];

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Building Book 2 Chapter Structure ===\n");

  // Find Book 2 - it's "The Bridge" at sortOrder 2
  let book2 = await prisma.book.findFirst({
    where: { projectId: project.id, sortOrder: 2 }
  });

  // If not found, try by title
  if (!book2) {
    book2 = await prisma.book.findFirst({
      where: { projectId: project.id, title: { contains: 'Bridge' } }
    });
  }

  // Create Book 2 if it doesn't exist
  if (!book2) {
    book2 = await prisma.book.create({
      data: {
        projectId: project.id,
        title: 'Book 2 - New Season',
        sortOrder: 2,
        synopsis: 'Placeholder',
        status: 'outlined'
      }
    });
    console.log("Created Book 2\n");
  }

  // Clear existing chapters
  await prisma.chapter.deleteMany({ where: { bookId: book2.id } });
  console.log("Cleared existing chapters\n");

  // Create all chapters
  for (const ch of book2Chapters) {
    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book2.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        status: 'outlined',
        tags: ch.location
      }
    });
    console.log(`Ch ${ch.number}: ${ch.title} (${ch.pov}) - ${ch.location}`);
  }

  // Update book synopsis
  await prisma.book.update({
    where: { id: book2.id },
    data: {
      title: 'Book 2 - New Season',
      synopsis: `Book 2 of the Jasper Barrett Series

26 chapters from New Season through Lucas's Baptism.

PART ONE - Foundations & New Tensions (Ch 1-5)
New crises emerge. Elena pregnant with baby #2. Claire arrives. Kendra introduced at Sara's pool party — clicks with Addison (Elena notices, files away jealousy).

PART TWO - Escalation & Shifting Roles (Ch 6-12)
NFL explodes, Africa intensifies. Kendra's regional competition — Addison away on trip, Elena goes instead, bonds with Kendra. Harper slipping — Claire intervenes with weekly sessions. Kendra wins Games division.

PART THREE - Collisions & Resets (Ch 13-18)
Elena pushes Jasper to mentor Addison. Claire identifies Addison's "fixer instinct" — begins developing her crisis anticipation skills. Harper regains balance through Claire's techniques. Engagement announced. Addison proves herself under fire.

PART FOUR - Lucas, Threesome & The Weekend (Ch 19-26)
Lucas born. Party Prep Night — Addison & Kendra in lingerie steaming dresses, kissing, Elena walks in. Threesome (Elena/Jasper/Addison). Promotion the next morning. Wedding (everyone meets Ethan). Lucas's baptism. Claire signs on for another year.

KEY ARCS:
- Elena: Pregnancy → jealousy of Addison/Kendra → birth of Lucas
- Addison "My Fair Lady Phase 2": Elena pushes Jasper to mentor her. Claire recognizes her "fixer's eye" — trains her crisis instincts. Coordinator → proves herself under fire → threesome (trust culmination) → junior strategist.
- Harper Recovery: Slipping due to Ethan distractions → Claire's intervention → weekly sessions on compartmentalization and focus → regains her edge while keeping the relationship
- Claire's Impact: Performance coach becomes essential — saves Harper's career, develops Addison into a budding fixer, signs on for Year 2
- Kendra: Sara introduces at pool party → Addison recruits as "joint trainer" → regional comp → Games win → full BSS integration
- Harper & Ethan: Private intro to Jasper/Elena → engagement → wedding (everyone meets Ethan)
- Lucas: Born and baptized`
    }
  });

  console.log(`\n=== Created ${book2Chapters.length} chapters ===`);

  // Stats
  const povCounts: Record<string, number> = {};
  for (const ch of book2Chapters) {
    povCounts[ch.pov] = (povCounts[ch.pov] || 0) + 1;
  }
  console.log('\nChapters by POV:');
  for (const [pov, count] of Object.entries(povCounts)) {
    console.log(`  ${pov}: ${count}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
