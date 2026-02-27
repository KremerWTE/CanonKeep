import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Book 1 Flashbacks to Storylines...\n");

  // Book 1 Flashbacks extracted from chapters
  const flashbacks = [
    // Chapter 1 - The Call
    {
      title: 'Five Feet at a Time Morning Ritual',
      category: 'Flashback',
      description: 'Jasper\'s mental ritual for handling mornings after crises.',
      content: `Five feet at a time—that's how you handled the mornings. Get out of bed. Five feet to the bathroom. Splash water on your face. Five feet to the closet. One task at a time, one step at a time, until the world stopped spinning and the weight on your chest eased enough to breathe.`,
      characters: JSON.stringify(['Jasper Barrett']),
      timeline: 'Book 1, Chapter 1 - Opening',
      location: 'Barrett home',
      themes: JSON.stringify(['coping mechanism', 'crisis management mindset', 'morning ritual']),
    },
    // Chapter 2 - War Room
    {
      title: 'Elena\'s Phone Call - Not Sleeping',
      category: 'Flashback',
      description: 'Elena checking on Jasper\'s sleep patterns during the London crisis.',
      content: `Elena's voice on the phone the night before, low and careful so Grace wouldn't overhear: "You're not sleeping again, are you?"

He hadn't answered. She'd known anyway.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Book 1, Chapter 2 - During London crisis',
      location: 'Phone call',
      themes: JSON.stringify(['marital concern', 'sleep deprivation', 'work stress']),
    },
    {
      title: 'Grace\'s Spelling Words',
      category: 'Flashback',
      description: 'Grace helping with spelling homework - a moment Jasper didn\'t fully appreciate.',
      content: `A kitchen table at home, Grace bent over spelling words. She'd looked up at him, pencil between her teeth, and said, "You can't spell 'team' without 'me,' Daddy." He'd smiled and promised to remember that. He hadn't.`,
      characters: JSON.stringify(['Jasper Barrett', 'Grace Barrett']),
      timeline: 'Pre-story - ordinary moment',
      location: 'Barrett home kitchen',
      themes: JSON.stringify(['fatherhood', 'missed moments', 'promises unkept']),
    },
    {
      title: 'Sunday Morning in Bed',
      category: 'Flashback',
      description: 'A rare Sunday morning when Jasper stayed home with Elena.',
      content: `A Sunday morning years ago, sunlight pouring across rumpled sheets. Elena's hair fanned across the pillow, her hand curled loosely around his. "Stay home today," she'd murmured. He had. Once.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Years before main story',
      location: 'Barrett bedroom',
      themes: JSON.stringify(['intimacy', 'rarity of presence', 'what was lost']),
    },
    // Chapter 4 - Anchors
    {
      title: 'Blue Silk Dress - First Meeting',
      category: 'Flashback',
      description: 'The moment Jasper first saw Elena at a DC mixer.',
      content: `Blue silk dress, hair falling over one shoulder. She's standing by the bar, laughing at something a stranger said. That laugh—bright, unguarded—cut through the noise of the mixer, and for the first time in months he'd forgotten to check his phone.

That was the beginning. A laugh and a blue dress.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Years before marriage - DC',
      location: 'DC mixer/bar',
      themes: JSON.stringify(['first meeting', 'love at first sight', 'Elena\'s laugh']),
    },
    {
      title: 'Rainy Café - Early Dating',
      category: 'Flashback',
      description: 'Jasper and Elena discovering a café during a rainstorm.',
      content: `A café with paint peeling off the walls. They'd found it by accident after a rainstorm, ducking in to escape the downpour. The place smelled like cinnamon and burnt espresso. They talked until the owner stacked chairs on tables and locked the door around them.

That night, she'd said, "I didn't know people could talk like that anymore." And he'd kissed her, tasting coffee and rain and the start of something he didn't deserve.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early dating period',
      location: 'Café in the rain',
      themes: JSON.stringify(['connection', 'organic romance', 'intimate conversation']),
    },
    {
      title: 'Dinner Table Fight - Competing with Work',
      category: 'Flashback',
      description: 'Elena confronting Jasper about his absence at a dinner for four.',
      content: `Her eyes flashing in anger at a dinner table set for four. His chair empty until an hour too late. "I don't mind you loving your work," she'd said, voice shaking. "But don't make me compete with it."

He'd kissed her temple and promised it wouldn't happen again. It did.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'During marriage - recurring pattern',
      location: 'Barrett dining room',
      themes: JSON.stringify(['work-life conflict', 'broken promises', 'marital tension']),
    },
    {
      title: 'Chicago Rooftop Proposal',
      category: 'Flashback',
      description: 'Jasper proposing to Elena on a Chicago rooftop.',
      content: `A rooftop in Chicago. The city spread out below them in a web of gold light. The ring in his palm felt heavier than it should have. "You're the only thing I've ever wanted that doesn't come with a contract," he'd said, and she'd kissed him before he could open the box.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Before marriage - proposal',
      location: 'Chicago rooftop',
      themes: JSON.stringify(['proposal', 'vulnerability', 'love without conditions']),
    },
    {
      title: '#1 Dad Mug',
      category: 'Flashback',
      description: 'Elena giving Jasper a Father\'s Day mug.',
      content: `A kitchen years ago, Elena handing him a coffee mug that read #1 Dad. He'd laughed, hugged her, felt that rush of purpose.

Her first words: "I hope you're here for this."

His first thought: I need to work harder.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'Early parenthood',
      location: 'Barrett kitchen',
      themes: JSON.stringify(['fatherhood', 'misplaced priorities', 'Elena\'s hope']),
    },
    // Chapter 10 - Five Feet From Home
    {
      title: 'Startup Salmonella Crisis',
      category: 'Flashback',
      description: 'A small crisis job Jasper took for a meal-kit startup.',
      content: `Jasper had taken a small crisis job for a startup no one had heard of—a meal-kit company that had accidentally shipped boxes with salmonella-tainted chicken to three thousand customers across the Midwest. It paid almost nothing, but the hours were reasonable, and when the crisis was contained, there was no next crisis waiting in the wings.`,
      characters: JSON.stringify(['Jasper Barrett']),
      timeline: 'Pre-story - smaller job',
      location: 'Midwest (remote work)',
      themes: JSON.stringify(['work-life balance attempt', 'small stakes', 'temporary peace']),
    },
    // Chapter 21 - The Night Watch
    {
      title: 'Rain Argument - I\'ll Try Harder',
      category: 'Flashback',
      description: 'Elena confronting Jasper in the rain about his absences.',
      content: `"You keep saying you'll slow down," she'd said, her voice barely audible over the rain. "But you don't stop. Not for me. Not for Grace. Not for anything that doesn't have a deadline attached to it."

He'd stepped toward her then, wrapping her up in the coat that was already soaked, pulling her against his chest. "I'll try harder," he'd promised. "I will."

And for a while, he had. A week, maybe two. Long enough for the rain to dry and the fight to fade and the next dilemma to pull him back into the current.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'During marriage - pattern of broken promises',
      location: 'Barrett home - rain',
      themes: JSON.stringify(['broken promises', 'patterns', 'Elena\'s frustration']),
    },
    // Chapter 25 - Harper's Chapter
    {
      title: 'Harper First Meets Elena - DC Bar',
      category: 'Flashback',
      description: 'Harper\'s first meeting with Elena after a brutal crisis cycle.',
      content: `It had been in D.C., right after a brutal fourteen-day crisis cycle. The kind of stretch that left you hollow and wired at the same time, where sleep felt like a foreign concept and the boundary between work and everything else dissolved completely. Harper had finally dragged Jasper out of the office, insisting that they celebrate closing the deal even if neither of them could remember what day it was.

Elena had walked in like she owned the room. Not arrogant—confident. She'd spotted Jasper across the bar, and something in her expression shifted.`,
      characters: JSON.stringify(['Harper Caldwell', 'Elena Barrett', 'Jasper Barrett']),
      timeline: 'Before marriage - how Harper met Elena',
      location: 'DC bar',
      themes: JSON.stringify(['first impressions', 'Harper observing', 'Elena\'s presence']),
    },
    // Chapter 28 - Mason Confrontation
    {
      title: 'Mason and Jasper - Dive Bar Duke Days',
      category: 'Flashback',
      description: 'A memory of Mason and Jasper at their college dive bar.',
      content: `A dive bar near Duke, sticky tables and neon beer signs. They were juniors. Jasper had just tanked an interview because he'd been honest about what he thought of the company's strategy.

"You're an idiot," Mason had said, sliding a fresh beer across the table. "But at least you're an honest idiot."`,
      characters: JSON.stringify(['Jasper Barrett', 'Mason Reilly']),
      timeline: 'Duke University - junior year',
      location: 'Dive bar near Duke',
      themes: JSON.stringify(['friendship', 'honesty', 'college days']),
    },
    // Chapter 29 - Jessica Finds Jasper (Prescott Grand)
    {
      title: 'Prescott Grand Hotel - Jessica Discovers Jasper',
      category: 'Flashback',
      description: 'The Prescott Grand renovation crisis where Jessica first discovered Jasper\'s talents.',
      content: `Eight years ago. The Prescott Grand Hotel renovation. Uptown Charlotte.

The project was bleeding money at a rate that made investors physically ill. Three months behind schedule. HVAC installs done out of order so ductwork conflicted with electrical. Italian marble fixtures stuck in customs. Millwork team had walked off over a pay dispute. The concrete pour on the third floor was curing wrong. And the HVAC subcontractor? Missing.

Jessica had been brought in to assess whether the project could be saved or if it was time to cut losses. She'd expected to find chaos. She found something else entirely.

In the middle of the construction trailer—papers everywhere, coffee cups stacked three deep, a whiteboard covered in colored markers and arrows—sat a young man who wasn't supposed to be running anything. Jasper Barrett. Officially, he was support staff. Unofficially, he was holding the entire project together with duct tape and force of will.

Jessica's quote: "You're not just putting out fires. You're redesigning the building while it's burning down."`,
      characters: JSON.stringify(['Jessica Vaughn', 'Jasper Barrett']),
      timeline: '8 years before main story',
      location: 'Prescott Grand Hotel, Uptown Charlotte',
      themes: JSON.stringify(['origin story', 'mentor discovery', 'hidden talent', 'crisis management']),
    },
    // Chapter 33 - Jessica Mentor
    {
      title: 'Grace Being Born - Jasper in the Hallway',
      category: 'Flashback',
      description: 'Jasper on work calls during Grace\'s birth.',
      content: `He remembered the day Grace was born. He'd been in the hospital hallway, phone pressed to his ear, handling a crisis in Singapore while Elena labored in the next room. The nurses had to come get him twice.

He'd made it in time. Barely. And when he'd held Grace for the first time—this tiny, perfect, terrifying bundle of potential—something had shifted in his chest.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett']),
      timeline: 'Grace\'s birth',
      location: 'Hospital',
      themes: JSON.stringify(['birth', 'work addiction', 'transformation moment']),
    },
    // Chapter 34 - Last Fires Out
    {
      title: 'Old Duke Stories - Mason and Jasper',
      category: 'Flashback',
      description: 'Mason and Jasper reminiscing about Duke days.',
      content: `By the third round, they'd shifted to safer ground—old Duke stories, late nights fueled by cheap beer and cheaper pizza, the women they'd been stupid enough to chase. Mason reminded him of the time Jasper had skipped a midterm for a girl and almost failed economics.

"You'd think you'd have learned something about balance back then," Mason said, his grin genuine now.`,
      characters: JSON.stringify(['Jasper Barrett', 'Mason Reilly']),
      timeline: 'Duke University memories',
      location: 'Duke campus',
      themes: JSON.stringify(['college memories', 'friendship', 'patterns']),
    },
    // Chapter 37 - Cole POV
    {
      title: 'Cole\'s Creed - Extracted from Danger',
      category: 'Flashback',
      description: 'Cole reflecting on his operational creed.',
      content: `Cole had a creed he'd developed over years of operations: Get in. Get out. Get home. Everything else was noise.

The getting home part was new. Before Hawk, before BSS, before the life he'd built with the team, "home" had been a concept more than a place. A barracks. A safe house. Whatever four walls happened to be available.`,
      characters: JSON.stringify(['Cole']),
      timeline: 'Cole\'s past - military days',
      location: 'Various operational locations',
      themes: JSON.stringify(['military background', 'finding home', 'transformation']),
    },
    // Chapter 40 - After the Last Glass
    {
      title: 'First Night Together - Hotel',
      category: 'Flashback',
      description: 'Jasper remembering the first night with Elena.',
      content: `He remembered their first night together. A hotel room in Georgetown, the city spread out below them through rain-streaked windows. They'd ordered room service at midnight and eaten cold pasta while sitting on the floor, talking about nothing and everything.

That night, time had felt different. Slower. Like the world outside could wait while they figured out what this thing between them meant.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Early relationship',
      location: 'Georgetown hotel',
      themes: JSON.stringify(['first intimacy', 'time standing still', 'beginning']),
    },
    {
      title: 'First Morning After - Late to Work',
      category: 'Flashback',
      description: 'Jasper being late to work after staying with Elena.',
      content: `That morning, he'd been late to work. He'd walked into the office two hours behind schedule with a smile he couldn't quite hide, and Harper had looked at him with knowing amusement and said nothing.

Some things were worth being late for.

He'd forgotten that, somewhere along the way.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Harper Caldwell']),
      timeline: 'Early relationship',
      location: 'BSS office',
      themes: JSON.stringify(['priorities', 'what was lost', 'worth being late']),
    },
  ];

  let created = 0;
  let updated = 0;

  for (const flashback of flashbacks) {
    const existing = await prisma.storyline.findFirst({
      where: { title: flashback.title, projectId: project.id }
    });

    if (existing) {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: flashback
      });
      console.log(`Updated: ${flashback.title}`);
      updated++;
    } else {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          ...flashback,
          tags: JSON.stringify(['flashback', 'book1', 'terminal-list-style']),
        }
      });
      console.log(`Created: ${flashback.title}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.storyline.count();
  console.log(`Total storylines in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
