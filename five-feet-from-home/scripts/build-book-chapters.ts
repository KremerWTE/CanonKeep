import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== BUILDING BOOK CHAPTERS FROM STORYLINES ===\n");

  // ========== RENAME FAITH & FORTUNE ==========
  console.log("--- Renaming Faith & Fortune to Faith, Fitness and Fortune ---\n");

  const faithFortune = await prisma.bookSeries.findFirst({
    where: { name: 'Faith & Fortune', projectId: project.id }
  });

  if (faithFortune) {
    await prisma.bookSeries.update({
      where: { id: faithFortune.id },
      data: {
        name: 'Faith, Fitness and Fortune',
        premise: `Chris & Kendra Donnelly's journey - Faith, Fitness, and Fortune.

CORE THEMES:
- Faith: Their spiritual foundation and values
- Fitness: Kendra's athletic career and CrossFit journey
- Fortune: Chris's business success and their combined wealth

SERIES ARC:
The Donnelly power couple - how they met, built their empire, and maintained their bond through Kendra's athletic fame and Chris's business world.`
      }
    });
    console.log('Renamed: Faith & Fortune -> Faith, Fitness and Fortune');
  }

  // ========== ROYAL PHOENIX - 13 BOOKS WITH CHAPTERS ==========
  console.log("\n--- Building Royal Phoenix Book Chapters ---\n");

  const royalPhoenixChapters = [
    {
      bookNumber: 1,
      bookTitle: 'The Protectress Rises',
      chapters: [
        { num: 1, title: 'First Day at BSS', summary: 'Addie arrives at Barrett Strategic Solutions, meets Jasper for the first time.' },
        { num: 2, title: 'The Fixer Training', summary: 'Learning the ropes under senior fixers. Her natural talent emerges.' },
        { num: 3, title: 'First Solo Crisis', summary: 'Addie handles her first crisis alone - a data breach at a Fortune 500 company.' },
        { num: 4, title: 'The Cole Meeting', summary: 'Cole Harrington enters her orbit. Tier 1 operator, first impressions.' },
        { num: 5, title: 'Proving Herself', summary: 'A high-stakes hostage situation tests her limits.' },
        { num: 6, title: 'Burnout Begins (new)', summary: 'First signs of exhaustion as she takes on too much.' },
        { num: 7, title: 'The "Fixer of Last Resort"', summary: 'Addie earns her reputation - impossible cases become her specialty.' },
        { num: 8, title: 'Protectress Calling', summary: 'Introduction to POH - she feels drawn to the order.' }
      ]
    },
    {
      bookNumber: 2,
      bookTitle: 'Denver Crisis',
      chapters: [
        { num: 1, title: 'The Call', summary: 'Major telecoms crisis erupts in Denver. Addie is deployed.' },
        { num: 2, title: 'War Room', summary: 'Setting up command center. The scope of the crisis becomes clear.' },
        { num: 3, title: 'Daniel Arrives', summary: 'Daniel joins as her partner. Their working relationship forms.' },
        { num: 4, title: 'Week One', summary: 'Sleepless nights begin. The crisis deepens.' },
        { num: 5, title: 'The Missed Calls', summary: 'Grace calls - Addie misses it. Harper wedding planning - missed. Kendra placement - missed.' },
        { num: 6, title: 'Breaking Point', summary: 'Two weeks in, Addie collapses briefly but pushes on.' },
        { num: 7, title: 'Month-Long Battle', summary: 'The crisis stretches to a full month.' },
        { num: 8, title: 'Resolution and Cost', summary: 'Crisis resolved, but Addie is shattered.' }
      ]
    },
    {
      bookNumber: 3,
      bookTitle: 'The Breaking',
      chapters: [
        { num: 1, title: 'Collapse', summary: 'Addie hospitalized from exhaustion. Cole watches over her.' },
        { num: 2, title: 'Hospital Room', summary: 'Waking up, realizing what happened.' },
        { num: 3, title: 'The Doctor', summary: 'Doctor helps her confront deeper issues - why she runs so hard.' },
        { num: 4, title: 'Kendra Confession', summary: 'In therapy, Addie confronts her feelings for Kendra.' },
        { num: 5, title: 'Cole at the Door', summary: 'Cole Harrington visits, silent protector energy.' },
        { num: 6, title: 'The Wives Club Reaches Out', summary: 'Elena, Harper, and others send support.' },
        { num: 7, title: 'Jasper Visit', summary: 'Jasper comes to her bedside, tells her she matters beyond work.' },
        { num: 8, title: 'Stepping Back', summary: 'Addie takes leave from BSS to recover.' }
      ]
    },
    {
      bookNumber: 4,
      bookTitle: 'Enter the Hawk',
      chapters: [
        { num: 1, title: 'Recovery Days', summary: 'Addie in quiet recovery, learning to rest.' },
        { num: 2, title: 'The Compound Invitation', summary: 'Cole invites her to the Brotherhood compound for healing space.' },
        { num: 3, title: 'First Hawk Meeting', summary: 'Hawk appears - quiet, magnetic, intense.' },
        { num: 4, title: 'Resistance', summary: 'Addie resists connection, pushes him away.' },
        { num: 5, title: 'The Midnight Shower Scene', summary: 'The famous midnight shower proposal scene.' },
        { num: 6, title: 'Something Real', summary: 'Despite her resistance, something real begins.' },
        { num: 7, title: 'Cole Approves', summary: 'Cole watches, approves - his brother found someone worthy.' },
        { num: 8, title: 'First Date', summary: 'Hawk takes her stargazing. Walls crumble.' }
      ]
    },
    {
      bookNumber: 5,
      bookTitle: 'Building Home',
      chapters: [
        { num: 1, title: 'The Land', summary: 'Hawk shows Addie the property he wants to build on.' },
        { num: 2, title: 'Blueprint Dreams', summary: 'Together they design their future home.' },
        { num: 3, title: 'Construction Begins', summary: 'Building the house together, side by side.' },
        { num: 4, title: 'POH Duties Resume', summary: 'Addie balances POH duties with personal life.' },
        { num: 5, title: 'The Brotherhood Accepts Her', summary: 'Hawk team considers her family now.' },
        { num: 6, title: 'Moving In', summary: 'They move into the house they built.' },
        { num: 7, title: 'Learning to Stay', summary: 'Addie learns to let someone in, not run.' },
        { num: 8, title: 'Healing Complete (new)', summary: 'Addie emerges transformed, ready for next chapter.' }
      ]
    },
    {
      bookNumber: 6,
      bookTitle: 'The Proposal',
      chapters: [
        { num: 1, title: 'Life in the House', summary: 'Settled life with Hawk, routine and love.' },
        { num: 2, title: 'Hawk Planning (new)', summary: 'Hawk secretly plans proposal with Cole help.' },
        { num: 3, title: 'Wives Club Wedding Talk', summary: 'The wives hint about wedding planning, Addie deflects.' },
        { num: 4, title: 'The Property at Sunset', summary: 'Hawk takes Addie to their favorite spot on the land.' },
        { num: 5, title: 'The Quiet Proposal', summary: 'Simple, romantic proposal under the stars.' },
        { num: 6, title: 'She Says Yes', summary: 'Addie accepts - love after years of running.' },
        { num: 7, title: 'Telling the Family', summary: 'Announcing to Wives Club, BSS, the Brotherhood.' },
        { num: 8, title: 'Wedding Planning Begins', summary: 'Warrior goddess learning to be a bride.' }
      ]
    },
    {
      bookNumber: 7,
      bookTitle: 'Mrs. Hawk',
      chapters: [
        { num: 1, title: 'The Venue', summary: 'Wedding on their property, exactly as dreamed.' },
        { num: 2, title: 'The Dress', summary: 'Wives Club helps Addie choose her gown.' },
        { num: 3, title: 'Bachelor/Bachelorette (new)', summary: 'Brotherhood throws Hawk bash, Wives throw Addie one.' },
        { num: 4, title: 'The Night Before', summary: 'Nerves, excitement, final preparations.' },
        { num: 5, title: 'The Ceremony', summary: 'Brotherhood attending, compound family celebrating.' },
        { num: 6, title: 'The Vows', summary: 'Personal vows that capture their journey.' },
        { num: 7, title: 'The Reception', summary: 'Dancing, laughter, the whole orbit together.' },
        { num: 8, title: 'Mrs. Hawk', summary: 'Addie becomes something new while staying true to herself.' }
      ]
    },
    {
      bookNumber: 8,
      bookTitle: 'The Twins',
      chapters: [
        { num: 1, title: 'Trying', summary: 'Hawk and Addie decide to start a family.' },
        { num: 2, title: 'Fertility Struggles', summary: 'Her body damaged from exhaustion hospitalization.' },
        { num: 3, title: 'Dr. Wife of Wives Club', summary: 'The doctor wife from Greensboro helps them.' },
        { num: 4, title: 'The Miracle', summary: 'Pregnancy confirmed - twins!' },
        { num: 5, title: 'Growing Family', summary: 'Pregnancy journey, Hawk becomes protective.' },
        { num: 6, title: 'Dad Ops Training (new)', summary: 'Hawk prepares for fatherhood with military precision.' },
        { num: 7, title: 'Birth Day', summary: 'Twin babies arrive - one boy, one girl.' },
        { num: 8, title: 'Dad Ops', summary: 'Hawk rocking babies at 3am. The warrior as father.' }
      ]
    },
    {
      bookNumber: 9,
      bookTitle: 'Two Lights, One Mission',
      chapters: [
        { num: 1, title: 'New Parents', summary: 'Adjusting to life with twins.' },
        { num: 2, title: 'POH and Motherhood', summary: 'Weaving motherhood into Protectress role.' },
        { num: 3, title: 'Two Lights Philosophy', summary: 'The twins inspire new POH teaching.' },
        { num: 4, title: 'The Compound Expansion', summary: 'New wing added to ranch house for babies.' },
        { num: 5, title: 'Sleepless Nights (new)', summary: 'The exhaustion of twin parenting, but different from burnout.' },
        { num: 6, title: 'Grace Helps', summary: 'Grace Barrett becomes favorite babysitter.' },
        { num: 7, title: 'Finding Balance', summary: 'Addie learns new kind of balance.' },
        { num: 8, title: 'The Mission Evolves', summary: 'Her protection mission now includes next generation.' }
      ]
    },
    {
      bookNumber: 10,
      bookTitle: 'The Third',
      chapters: [
        { num: 1, title: 'Surprise', summary: 'Pregnant again, within a year of twins.' },
        { num: 2, title: 'Divine Timing', summary: 'The divine surprise strengthens their faith.' },
        { num: 3, title: 'Combat Zone Parenting', summary: '"We survived combat zones. We can survive diapers."' },
        { num: 4, title: 'Three Under Three (new)', summary: 'Preparing for three children under three.' },
        { num: 5, title: 'Hawk Steps Up', summary: 'Hawk takes on even more Dad Ops duties.' },
        { num: 6, title: 'The Birth', summary: 'Third child arrives safely.' },
        { num: 7, title: 'Complete Family', summary: 'The family Addie never thought she would have.' },
        { num: 8, title: 'Full House', summary: 'Five of them now, chaos and love.' }
      ]
    },
    {
      bookNumber: 11,
      bookTitle: 'Full Circle',
      chapters: [
        { num: 1, title: 'Experienced Mother', summary: 'Addie now speaks from authentic experience.' },
        { num: 2, title: 'POH Teachings Evolve', summary: 'Her teachings on exhaustion, sacrifice, and joy.' },
        { num: 3, title: 'Training Next Generation', summary: 'New Protectresses learn from her journey.' },
        { num: 4, title: 'The Young Ones', summary: 'Her children begin to show personalities.' },
        { num: 5, title: 'Return to BSS (new)', summary: 'Consulting role, advising from experience.' },
        { num: 6, title: 'Mentoring Daniel', summary: 'Daniel now senior fixer, thanks to her foundation.' },
        { num: 7, title: 'The Circle Widens', summary: 'Her influence spreads throughout the orbit.' },
        { num: 8, title: 'Full Circle Moment', summary: 'A young fixer faces burnout - Addie intervenes.' }
      ]
    },
    {
      bookNumber: 12,
      bookTitle: 'The Legacy',
      chapters: [
        { num: 1, title: 'The Connection Point', summary: 'Addie recognized as the heart connecting everyone.' },
        { num: 2, title: 'BSS Connections', summary: 'Her relationships with Jasper, Harper, Daniel, Cole.' },
        { num: 3, title: 'Wives Club Bonds', summary: 'Elena, Kendra, Bella, and the sisterhood.' },
        { num: 4, title: 'The Kendra Resolution', summary: 'Finally peace with complicated feelings for Kendra.' },
        { num: 5, title: 'Hawk Partnership', summary: 'Their marriage as foundation for everything.' },
        { num: 6, title: 'The Brotherhood Family', summary: 'How military family became her family.' },
        { num: 7, title: 'Strong & Savory Connection', summary: 'Her bond with Evie and the foundation.' },
        { num: 8, title: 'The Umbrella', summary: 'How she became the protection for the entire orbit.' }
      ]
    },
    {
      bookNumber: 13,
      bookTitle: 'Phoenix Eternal',
      chapters: [
        { num: 1, title: 'Looking Back', summary: 'Addie reflects on her journey from burnout to here.' },
        { num: 2, title: 'The Phoenix Symbol', summary: 'Understanding her rebirth symbolism fully.' },
        { num: 3, title: 'Children Growing', summary: 'The twins and youngest entering school age.' },
        { num: 4, title: 'Next Generation POH', summary: 'The protectresses she trained now lead.' },
        { num: 5, title: 'Hawk Forever', summary: 'Their love story continues, deeper than ever.' },
        { num: 6, title: 'The Family Party Approaches', summary: 'Planning the great gathering.' },
        { num: 7, title: 'Everyone Comes Home', summary: 'All storylines converging for the finale.' },
        { num: 8, title: 'The Exhale', summary: 'At the Family Party, Addie looks around and finally exhales. The Phoenix, complete.' }
      ]
    }
  ];

  // Update Royal Phoenix series with full chapters
  const royalPhoenix = await prisma.bookSeries.findFirst({
    where: { name: 'Royal Phoenix', projectId: project.id }
  });

  if (royalPhoenix) {
    const booksWithChapters = royalPhoenixChapters.map(book => ({
      title: `Book ${book.bookNumber}: ${book.bookTitle}`,
      synopsis: royalPhoenix.books ? JSON.parse(royalPhoenix.books).find((b: any) => b.title.includes(book.bookTitle))?.synopsis || '' : '',
      chapters: book.chapters
    }));

    await prisma.bookSeries.update({
      where: { id: royalPhoenix.id },
      data: {
        books: JSON.stringify(booksWithChapters)
      }
    });
    console.log('Updated: Royal Phoenix with 104 chapters across 13 books');
  }

  // ========== MIAMI HEAT - 6 BOOKS WITH CHAPTERS ==========
  console.log("\n--- Building Miami Heat Book Chapters ---\n");

  const miamiHeatChapters = [
    {
      bookNumber: 1,
      bookTitle: 'The Rising COO',
      chapters: [
        { num: 1, title: 'Former Journalist', summary: 'Harper backstory - embedded journalist turned consultant.' },
        { num: 2, title: 'BSS Interview', summary: 'Harper joins Barrett Strategic Solutions.' },
        { num: 3, title: 'Learning Under Jasper', summary: 'Mentorship begins with the master.' },
        { num: 4, title: 'First Crisis Assignment', summary: 'Harper first solo crisis management.' },
        { num: 5, title: 'Proving Ground', summary: 'She excels, catching Jasper attention.' },
        { num: 6, title: 'The Natural', summary: 'Harper shows innate talent for crisis comms.' },
        { num: 7, title: 'Rising Star (new)', summary: 'Word spreads - Harper is one to watch.' },
        { num: 8, title: 'COO Path', summary: 'Jasper begins grooming her for leadership.' }
      ]
    },
    {
      bookNumber: 2,
      bookTitle: 'Miami Fires',
      chapters: [
        { num: 1, title: 'Miami Assignment', summary: 'Major crisis erupts in Miami.' },
        { num: 2, title: 'The Heat', summary: 'City heat matches crisis heat.' },
        { num: 3, title: 'War Room Nights', summary: 'Late nights, war rooms, intense pressure.' },
        { num: 4, title: 'Testing Leadership', summary: 'Harper makes critical decisions alone.' },
        { num: 5, title: 'The Mistake (new)', summary: 'A decision backfires, she must recover.' },
        { num: 6, title: 'Recovery and Win', summary: 'Harper turns failure into success.' },
        { num: 7, title: 'Miami Victory', summary: 'Crisis resolved, Harper reputation cemented.' },
        { num: 8, title: 'Jasper Impressed', summary: 'She proved herself in fire.' }
      ]
    },
    {
      bookNumber: 3,
      bookTitle: 'The Proposal',
      chapters: [
        { num: 1, title: 'The Boyfriend', summary: 'Harper relationship introduced properly.' },
        { num: 2, title: 'Balancing Act', summary: 'Love and career pressures mount.' },
        { num: 3, title: 'He Proposes', summary: 'The proposal comes.' },
        { num: 4, title: 'Unexpected Response', summary: 'Instead of stepping back, she steps up.' },
        { num: 5, title: 'Career Choice', summary: 'Harper becomes Jasper top field presence.' },
        { num: 6, title: 'Addie Parallel (new)', summary: 'She watches Addie burnout, learns from it.' },
        { num: 7, title: 'Engagement and Empire', summary: 'Engaged and ascending simultaneously.' },
        { num: 8, title: 'Both/And', summary: 'Harper proves you can have career and love.' }
      ]
    },
    {
      bookNumber: 4,
      bookTitle: 'Field Heir',
      chapters: [
        { num: 1, title: 'Jasper Heir', summary: 'Harper fully becomes Jasper field heir.' },
        { num: 2, title: 'Like He Used To Be', summary: 'She operates as Jasper once did.' },
        { num: 3, title: 'Asia Operations', summary: '14 hours ahead, juggling market fires.' },
        { num: 4, title: 'Global Presence', summary: 'The new face of BSS global operations.' },
        { num: 5, title: 'Time Zone Life (new)', summary: 'Living across time zones, wedding planning remote.' },
        { num: 6, title: 'Addie Remote', summary: 'Addie supportive only in chat - distance felt.' },
        { num: 7, title: 'Missing Moments', summary: 'Feeling Addie absence during planning.' },
        { num: 8, title: 'The Cost of Success', summary: 'What she gains and loses at global level.' }
      ]
    },
    {
      bookNumber: 5,
      bookTitle: 'Wedding Season',
      chapters: [
        { num: 1, title: 'Planning While Flying', summary: 'Wedding planning from airport lounges.' },
        { num: 2, title: 'Wives Club Support', summary: 'Elena, Bella, others help remotely.' },
        { num: 3, title: 'Addie Absence Felt', summary: 'Missing her friend during biggest planning.' },
        { num: 4, title: 'Global Crises Continue', summary: 'Work never stops during planning.' },
        { num: 5, title: 'Dress Shopping (new)', summary: 'Quick trip home for dress - emotional.' },
        { num: 6, title: 'Bachelorette', summary: 'Wives Club throws surprise party.' },
        { num: 7, title: 'Final Preparations', summary: 'Everything coming together.' },
        { num: 8, title: 'The Span', summary: 'Having it all when "all" spans continents.' }
      ]
    },
    {
      bookNumber: 6,
      bookTitle: 'Mrs. Vance',
      chapters: [
        { num: 1, title: 'Wedding Day', summary: 'The wedding arrives.' },
        { num: 2, title: 'The Ceremony', summary: 'Beautiful ceremony, all friends present.' },
        { num: 3, title: 'Addie Speech', summary: 'Addie gives emotional toast about friendship.' },
        { num: 4, title: 'The Reception', summary: 'Dancing, celebration, joy.' },
        { num: 5, title: 'Mrs. Vance', summary: 'Harper officially married.' },
        { num: 6, title: 'Honeymoon Brief (new)', summary: 'Short honeymoon - crisis interrupts.' },
        { num: 7, title: 'New Rhythm', summary: 'Finding rhythm as wife and COO.' },
        { num: 8, title: 'Next Generation BSS', summary: 'Setting up BSS leadership for next era.' }
      ]
    }
  ];

  const miamiHeat = await prisma.bookSeries.findFirst({
    where: { name: 'Miami Heat', projectId: project.id }
  });

  if (miamiHeat) {
    const booksWithChapters = miamiHeatChapters.map(book => ({
      title: `Book ${book.bookNumber}: ${book.bookTitle}`,
      synopsis: miamiHeat.books ? JSON.parse(miamiHeat.books).find((b: any) => b.title.includes(book.bookTitle))?.synopsis || '' : '',
      chapters: book.chapters
    }));

    await prisma.bookSeries.update({
      where: { id: miamiHeat.id },
      data: {
        books: JSON.stringify(booksWithChapters)
      }
    });
    console.log('Updated: Miami Heat with 48 chapters across 6 books');
  }

  // ========== MY FAIR LADY: BELLA STORY - 7 BOOKS WITH CHAPTERS ==========
  console.log("\n--- Building My Fair Lady Book Chapters ---\n");

  const bellaChapters = [
    {
      bookNumber: 1,
      bookTitle: "Wouldn't It Be Loverly",
      chapters: [
        { num: 1, title: 'Small Town Texas', summary: 'Bella backstory - small-town Texas girl with big dreams.' },
        { num: 2, title: 'BSS Application', summary: 'Applying to Barrett Strategic Solutions.' },
        { num: 3, title: 'The Interview', summary: 'Meeting Jasper, impressing with raw talent.' },
        { num: 4, title: 'First Day', summary: 'Overwhelmed by the sophistication of BSS world.' },
        { num: 5, title: 'Learning the Ropes', summary: 'Training as analyst, finding her place.' },
        { num: 6, title: 'Addie Takes Notice', summary: 'Addie sees potential in the newcomer.' },
        { num: 7, title: 'The Transformation Begins', summary: 'Wives Club begins subtle refinement.' },
        { num: 8, title: 'Loverly Dreams', summary: 'Bella dreams of belonging to this world.' }
      ]
    },
    {
      bookNumber: 2,
      bookTitle: 'The Rain in Spain',
      chapters: [
        { num: 1, title: 'Three Jobs', summary: 'Bella juggling BSS, Texas Event Company, Maison Aurelia.' },
        { num: 2, title: 'The Workload', summary: 'Exhaustion building but she pushes through.' },
        { num: 3, title: 'Elena Mentor', summary: 'Elena takes her under wing for accounts.' },
        { num: 4, title: 'Matt Appears', summary: 'Meeting Matt Richards - chemistry sparks.' },
        { num: 5, title: 'Mandy Triangle (new)', summary: 'Mandy Brooks enters - complications.' },
        { num: 6, title: 'Special Olympics Coaching', summary: 'Bella finds calling in coaching athletes.' },
        { num: 7, title: 'Jazz Discovery', summary: 'Discovers Jazz Carter at local swim meet.' },
        { num: 8, title: 'Growth Pains', summary: 'Struggling to maintain everything.' }
      ]
    },
    {
      bookNumber: 3,
      bookTitle: 'I Could Have Danced All Night',
      chapters: [
        { num: 1, title: 'First Gala', summary: 'Bella first major gala invitation.' },
        { num: 2, title: 'Wives Club Prep', summary: 'The wives help her get ready.' },
        { num: 3, title: 'The Dress', summary: 'Addie helps style her perfectly.' },
        { num: 4, title: 'Arriving', summary: 'Walking into the gala - transformation visible.' },
        { num: 5, title: 'Dancing with Matt', summary: 'Romantic dance that everyone notices.' },
        { num: 6, title: 'Mandy Watches (new)', summary: 'Mandy sees them together, conflict rising.' },
        { num: 7, title: 'The Night Magic', summary: 'Feeling like she belongs for first time.' },
        { num: 8, title: 'Could Have Danced', summary: 'Not wanting the night to end.' }
      ]
    },
    {
      bookNumber: 4,
      bookTitle: 'Show Me',
      chapters: [
        { num: 1, title: 'Matt Pursuit', summary: 'Matt actively pursuing Bella.' },
        { num: 2, title: 'Mandy Conflict', summary: 'The triangle intensifies.' },
        { num: 3, title: 'Germany Trip', summary: 'Bella breakdown in Germany from overwork.' },
        { num: 4, title: 'Recovery', summary: 'Learning to ask for help.' },
        { num: 5, title: 'Show Me Your World', summary: 'Matt shares his life with her.' },
        { num: 6, title: 'Show Me Your Heart (new)', summary: 'Bella opens up about her past.' },
        { num: 7, title: 'Special Olympics Success', summary: 'Claire at International Games.' },
        { num: 8, title: 'Choosing Matt', summary: 'Making her choice clear.' }
      ]
    },
    {
      bookNumber: 5,
      bookTitle: 'Black Moves Second',
      chapters: [
        { num: 1, title: 'Matt Relationship', summary: 'Established as a couple.' },
        { num: 2, title: 'Mandy Friendship', summary: 'Bella and Mandy become unlikely friends.' },
        { num: 3, title: 'The Resolution', summary: 'Triangle resolves in love for all.' },
        { num: 4, title: 'Career Advancement', summary: 'Bella promoted at BSS.' },
        { num: 5, title: 'Coaching Expands (new)', summary: 'Special Olympics coaching grows.' },
        { num: 6, title: 'Strategic Moves', summary: 'Learning to play the long game.' },
        { num: 7, title: 'Black Moves Second', summary: 'Chess metaphor for patience.' },
        { num: 8, title: 'Winning Move', summary: 'Bella position solidified.' }
      ]
    },
    {
      bookNumber: 6,
      bookTitle: "I've Grown Accustomed to Her Face",
      chapters: [
        { num: 1, title: 'Wives Club Full Member', summary: 'Bella fully embraced by the wives.' },
        { num: 2, title: 'Matt Commitment', summary: 'Their relationship deepens.' },
        { num: 3, title: 'The Family Created', summary: 'Their chosen family forms.' },
        { num: 4, title: 'Coaching Identity', summary: 'Coaching not side project but identity.' },
        { num: 5, title: 'Elena Bond', summary: 'Deep friendship with Elena cemented.' },
        { num: 6, title: 'Accustomed to Her', summary: 'Matt realizes he cannot live without her.' },
        { num: 7, title: 'Planning Future (new)', summary: 'Conversations about marriage.' },
        { num: 8, title: 'Belonging', summary: 'Bella finally belongs completely.' }
      ]
    },
    {
      bookNumber: 7,
      bookTitle: 'A Hymn to Her',
      chapters: [
        { num: 1, title: 'The Proposal', summary: 'Matt proposes.' },
        { num: 2, title: 'Wedding Planning', summary: 'Wives Club helps plan.' },
        { num: 3, title: 'Mandy Maid of Honor', summary: 'Former rival becomes closest friend.' },
        { num: 4, title: 'Jazz and Claire Involved', summary: 'Her athletes part of ceremony.' },
        { num: 5, title: 'The Wedding', summary: 'Beautiful ceremony reflecting her journey.' },
        { num: 6, title: 'Full Circle', summary: 'From small-town girl to this moment.' },
        { num: 7, title: 'Hymn to Her', summary: 'Matt vows celebrating who she became.' },
        { num: 8, title: 'Fair Lady Complete', summary: 'Bella transformation complete - on her terms.' }
      ]
    }
  ];

  const bellaStory = await prisma.bookSeries.findFirst({
    where: { name: 'My Fair Lady: The Bella Story', projectId: project.id }
  });

  if (bellaStory) {
    const booksWithChapters = bellaChapters.map(book => ({
      title: book.bookTitle,
      chapters: book.chapters
    }));

    await prisma.bookSeries.update({
      where: { id: bellaStory.id },
      data: {
        books: JSON.stringify(booksWithChapters)
      }
    });
    console.log('Updated: My Fair Lady with 56 chapters across 7 books');
  }

  // ========== STRONG AND SAVORY - 6 BOOKS WITH CHAPTERS ==========
  console.log("\n--- Building Strong and Savory Book Chapters ---\n");

  const evieChapters = [
    {
      bookNumber: 1,
      bookTitle: 'Flour on Her Hands',
      chapters: [
        { num: 1, title: 'The Restaurant', summary: 'Evie life at Strong & Savory restaurant.' },
        { num: 2, title: 'Food is Love', summary: 'Her philosophy taking shape.' },
        { num: 3, title: 'Sara Gym Meeting', summary: 'Connection with Sara and her gym.' },
        { num: 4, title: 'The Cooking Class Idea', summary: 'Idea for teaching cooking to athletes.' },
        { num: 5, title: 'First Class', summary: 'First Strong & Savory cooking class.' },
        { num: 6, title: 'Jazz Awakening', summary: 'Meeting Jazz Carter changes everything.' },
        { num: 7, title: 'Refusing Payment', summary: '"Let it be free" - the defining moment.' },
        { num: 8, title: 'New Purpose', summary: 'Evie finds renewed purpose.' }
      ]
    },
    {
      bookNumber: 2,
      bookTitle: 'The Unlikely Sister',
      chapters: [
        { num: 1, title: 'Sofia Arrives', summary: 'Sofia enters the story.' },
        { num: 2, title: 'Unlikely Friendship', summary: 'Two very different women bond.' },
        { num: 3, title: 'Teaching Together', summary: 'Sofia helps with classes.' },
        { num: 4, title: 'The Athletes', summary: 'Special Olympics athletes become family.' },
        { num: 5, title: 'Sister Bond (new)', summary: 'Deeper connection forms.' },
        { num: 6, title: 'Kendra Connection', summary: 'Kendra leads workouts at Sara Gym.' },
        { num: 7, title: 'The Foundation Grows', summary: 'Strong & Savory expanding.' },
        { num: 8, title: 'Unlikely Sisters', summary: 'Sofia and Evie inseparable.' }
      ]
    },
    {
      bookNumber: 3,
      bookTitle: 'The Ghosting',
      chapters: [
        { num: 1, title: 'Cole Enters', summary: 'Cole Harrington appears in Evie orbit.' },
        { num: 2, title: 'Attraction', summary: 'Unexpected chemistry.' },
        { num: 3, title: 'Something Builds', summary: 'Romance developing.' },
        { num: 4, title: 'The Mission', summary: 'Cole deployed on mission.' },
        { num: 5, title: 'Silence', summary: 'Cole goes dark - ghosting begins.' },
        { num: 6, title: 'Evie Pain', summary: 'The hurt of sudden silence.' },
        { num: 7, title: 'Addie Intervention', summary: 'Addie brings Evie under POH protection.' },
        { num: 8, title: 'Waiting', summary: 'Learning to hold hope in silence.' }
      ]
    },
    {
      bookNumber: 4,
      bookTitle: 'Strong & Savory: The Foundation',
      chapters: [
        { num: 1, title: 'Building the Foundation', summary: 'Making Strong & Savory official nonprofit.' },
        { num: 2, title: 'Jazz as Teacher', summary: 'Jazz becomes assistant teacher.' },
        { num: 3, title: 'Grace Volunteers', summary: 'Grace Barrett joins as volunteer.' },
        { num: 4, title: 'Kendra Mythic Status', summary: 'Kendra becomes mythic figure to athletes.' },
        { num: 5, title: 'The Philosophy', summary: 'Food is love in purest form.' },
        { num: 6, title: 'Community Impact (new)', summary: 'Foundation touching more lives.' },
        { num: 7, title: 'Sara Partnership', summary: 'Gym and Foundation fully integrated.' },
        { num: 8, title: 'Foundation Complete', summary: 'Strong & Savory fully established.' }
      ]
    },
    {
      bookNumber: 5,
      bookTitle: 'The Sweet Alchemy',
      chapters: [
        { num: 1, title: 'Cole Returns', summary: 'Cole comes back from mission.' },
        { num: 2, title: 'The Explanation', summary: 'Why he went silent explained.' },
        { num: 3, title: 'Forgiveness Path', summary: 'Working through the hurt.' },
        { num: 4, title: 'Recipe for Love', summary: 'Their relationship rebuilds.' },
        { num: 5, title: 'Sweet Moments (new)', summary: 'Cooking together, falling deeper.' },
        { num: 6, title: 'The Brotherhood Accepts', summary: 'Cole team approves of Evie.' },
        { num: 7, title: 'Alchemy', summary: 'Transforming pain into something beautiful.' },
        { num: 8, title: 'Moving Forward', summary: 'Together now, building future.' }
      ]
    },
    {
      bookNumber: 6,
      bookTitle: 'Mrs. Cole',
      chapters: [
        { num: 1, title: 'The Proposal', summary: 'Cole proposes to Evie.' },
        { num: 2, title: 'Wedding Plans', summary: 'Simple ceremony, meaningful guests.' },
        { num: 3, title: 'Athletes Involved', summary: 'Jazz, Claire, athletes part of wedding.' },
        { num: 4, title: 'Brotherhood Support', summary: 'Hawk, operators attend.' },
        { num: 5, title: 'The Wedding', summary: 'Beautiful ceremony at Sara Gym.' },
        { num: 6, title: 'Mrs. Cole', summary: 'Evie becomes Mrs. Cole Harrington.' },
        { num: 7, title: 'Foundation Legacy', summary: 'Strong & Savory thriving.' },
        { num: 8, title: 'Complete', summary: 'Love, purpose, and family achieved.' }
      ]
    }
  ];

  const evieStory = await prisma.bookSeries.findFirst({
    where: { name: 'Strong and Savory', projectId: project.id }
  });

  if (evieStory) {
    const booksWithChapters = evieChapters.map(book => ({
      title: book.bookTitle,
      chapters: book.chapters
    }));

    await prisma.bookSeries.update({
      where: { id: evieStory.id },
      data: {
        books: JSON.stringify(booksWithChapters)
      }
    });
    console.log('Updated: Strong and Savory with 48 chapters across 6 books');
  }

  // Final counts
  const seriesCount = await prisma.bookSeries.count();

  console.log(`\n=== COMPLETE ===`);
  console.log(`Total book series: ${seriesCount}`);
  console.log(`Total chapters built: 256+ chapters across major series`);

  await prisma.$disconnect();
}

main().catch(console.error);
