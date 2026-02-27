import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find the project
  const project = await prisma.project.findFirst({
    where: { name: 'STORY_PROJECT' }
  });

  const projectId = project?.id;

  if (!projectId) {
    throw new Error('No project found');
  }

  // Delete existing Book 6 if it exists
  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 6' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 6');
  }

  // Create Book 6: The Making of Addison
  const book6 = await prisma.book.create({
    data: {
      title: 'Book 6: The Making of Addison',
      projectId: projectId,
      synopsis: 'Addie\'s origin story. From her family background and complicated childhood, through college survival, to her first terrible job. Then the "My Fair Lady" transformation: Elena spots raw potential, Harper teaches her to move in power circles, and Jessica refines her polish. The book follows Addie\'s journey from scrappy survivor to BSS Assistant — the crucible that forged the woman who would become POH.',
      status: 'outlined'
    }
  });

  // Book 6 Chapters - The Making of Addison
  const chapters = [
    // ============================================
    // PART 1: THE BEGINNING (Ch 1-12)
    // Family & Childhood
    // ============================================
    { number: 1, title: 'Where She Came From', pov: 'Addison', location: 'Small Town USA', synopsis: 'Addie\'s childhood. Small town, struggling family. Dad worked two jobs. Mom stretched every dollar. They weren\'t poor — they were "careful." Addie learned early: want less, work more, never be a burden. She was the kid who babysat at 12, worked retail at 15, and saved every penny.' },

    { number: 2, title: 'The Quiet House', pov: 'Addison', location: 'Family Home', synopsis: 'Addie\'s parents loved her but didn\'t know how to show it. Dad was silent, Mom was anxious. "Make yourself useful" was the closest thing to praise. Addie learned: worth comes from what you do, not who you are. A lesson that would nearly kill her decades later.' },

    { number: 3, title: 'The High School Years', pov: 'Addison', location: 'High School', synopsis: 'High school. Addie wasn\'t popular, wasn\'t invisible. She was "the smart one who worked at the grocery store." She got good grades because failure wasn\'t an option. She had one close friend. She dated a boy for six months — he wanted more than she could give. She focused on the exit: college.' },

    { number: 4, title: 'The Scholarship', pov: 'Addison', location: 'High School', synopsis: 'Senior year. Addie applies for every scholarship she can find. Full ride to State University — not glamorous, but free. Her parents are proud but don\'t know how to say it. Dad: "Don\'t waste it." That becomes her mantra. Don\'t waste it. Don\'t waste it. Don\'t waste anything.' },

    { number: 5, title: 'College: Year One', pov: 'Addison', location: 'State University', synopsis: 'Freshman year. Culture shock. Rich kids who\'ve never worked a day. Addie has three jobs: cafeteria, library, tutoring. She studies between shifts. She doesn\'t party. She doesn\'t date. She survives. Her roommate thinks she\'s boring. Her professors think she\'s promising.' },

    { number: 6, title: 'The Professor', pov: 'Addison', location: 'State University', synopsis: 'Sophomore year. A business professor notices Addie — not for her grades, but for her questions. "You think like a strategist." First time anyone saw potential beyond hard work. He becomes an informal mentor. "You belong in places you can\'t imagine yet. Work like you already do."' },

    { number: 7, title: 'The Internship', pov: 'Addison', location: 'City', synopsis: 'Summer internship at a small consulting firm. Addie is the only one from a state school. The others are Ivy League. She works twice as hard, stays twice as late. The partners notice. "You\'ve got something." She doesn\'t know what it is yet. But she knows it\'s her ticket out.' },

    { number: 8, title: 'College: Final Years', pov: 'Addison', location: 'State University', synopsis: 'Junior and senior year blur together. Work, study, repeat. Addie graduates magna cum laude with zero debt and zero social life. Her parents come to graduation. Mom cries. Dad shakes her hand. "You did good." It\'s the most he\'s ever said.' },

    { number: 9, title: 'The First Job', pov: 'Addison', location: 'City', synopsis: 'First "real" job: administrative assistant at a mid-tier firm. The boss is mediocre. The work is dull. But Addie learns: office politics, corporate navigation, how to make yourself indispensable. She stays two years. She outgrows it in six months.' },

    { number: 10, title: 'The Terrible Boss', pov: 'Addison', location: 'City', synopsis: 'Second job: executive assistant to a VP who takes credit for everything and blame for nothing. Addie learns: how to manage up, how to protect yourself, how to document everything. She also learns: she deserves better. She starts looking.' },

    { number: 11, title: 'The BSS Ad', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'A job listing catches her eye: "Executive Assistant to CEO, Crisis Management Firm, Must Thrive Under Pressure." BSS. Barrett Strategic Solutions. She reads about Jasper Barrett — the legend. She applies. Doesn\'t expect a callback. Gets one within 24 hours.' },

    { number: 12, title: 'The First Interview', pov: 'Addison', location: 'BSS HQ', synopsis: 'First interview at BSS. The office is sleek, intimidating. Addie wears her best suit — bought secondhand, tailored herself. Jasper Barrett is intense, probing. "Why crisis management?" Addie: "Because I\'ve been managing crises my whole life. I just didn\'t have a title for it."' },

    // ============================================
    // PART 2: ELENA SEES POTENTIAL (Ch 13-22)
    // The Discovery
    // ============================================
    { number: 13, title: 'Elena\'s Eye', pov: 'Elena', location: 'BSS HQ', synopsis: 'Elena sits in on the second interview. She watches Addie handle rapid-fire questions from Harper and Jasper. Something about this woman... raw, unpolished, but steel underneath. After Addie leaves, Elena: "Hire her." Jasper: "She needs work." Elena: "That\'s what we\'re for."' },

    { number: 14, title: 'Day One at BSS', pov: 'Addison', location: 'BSS HQ', synopsis: 'First day as Jasper\'s assistant. The pace is brutal. Twelve meetings. Three crises. A congressman on hold. Addie keeps up — barely. At 9pm, Jasper looks up: "You didn\'t drown." Addie: "I don\'t drown." First test: passed.' },

    { number: 15, title: 'The Gap', pov: 'Addison', location: 'Various', synopsis: 'Week two. Addie notices the gap. She can do the work. But she doesn\'t fit. Her clothes are wrong. Her references are wrong. She says "pop" instead of "soda," doesn\'t know wine from wine, flinches at check totals. She\'s an imposter in their world.' },

    { number: 16, title: 'Elena\'s Invitation', pov: 'Elena', location: 'BSS HQ', synopsis: 'Elena invites Addie to lunch. Not a work lunch — a real lunch. She watches how Addie holds her fork, orders food, tips. After: "You\'re brilliant. You know that?" Addie: "I work hard." Elena: "That\'s not the same thing. Would you let me help you?"' },

    { number: 17, title: 'The Proposal', pov: 'Addison', location: 'Elena\'s Office', synopsis: 'Elena lays it out: "You have everything you need except polish. The world you\'re entering judges on surfaces first. Let me teach you the surfaces — so your substance can shine through." Addie hesitates. It feels like charity. Elena: "It\'s investment. In you."' },

    { number: 18, title: 'My Fair Lady Begins', pov: 'Elena', location: 'Various', synopsis: 'The transformation begins. Elena takes Addie shopping — not expensive, but strategic. "Invest in quality basics. Build a capsule wardrobe." First lesson: you don\'t need money, you need knowledge. Addie learns more about fashion in one day than she learned in 25 years.' },

    { number: 19, title: 'Harper Joins', pov: 'Harper', location: 'BSS HQ', synopsis: 'Harper notices the project. "Can I help?" Elena welcomes her in. Harper\'s specialty: power dynamics. "Walk into every room like you own it, even if you\'re terrified." Harper teaches Addie body language, eye contact, the art of commanding space without speaking.' },

    { number: 20, title: 'Dining Lessons', pov: 'Addison', location: 'Upscale Restaurant', synopsis: 'Elena takes Addie to a fancy restaurant. Lesson: which fork, which glass, how to read a menu, how to taste wine, how to summon a waiter without looking desperate. Addie is overwhelmed. Elena: "You\'ll do this a hundred times. After the tenth, it\'s automatic."' },

    { number: 21, title: 'Jessica\'s Polish', pov: 'Jessica', location: 'Salon/Spa', synopsis: 'Jessica — Sara\'s sister, part of the inner circle — joins the project. Her specialty: the physical polish. Hair, makeup, skincare. "You\'re not changing who you are. You\'re learning to present yourself so people see you, not their assumptions." Addie emerges looking like she belongs.' },

    { number: 22, title: 'The First Test', pov: 'Addison', location: 'Client Dinner', synopsis: 'First client dinner since the transformation. Addie is terrified. She wears the right dress, uses the right fork, laughs at the right jokes. By dessert, she\'s not performing — she\'s just... there. The client asks Jasper: "Where did you find her?" Jasper smiles: "She found us."' },

    // ============================================
    // PART 3: BECOMING ESSENTIAL (Ch 23-35)
    // Rise to BSS Assistant
    // ============================================
    { number: 23, title: 'The Mentors', pov: 'Addison', location: 'Various', synopsis: 'Months pass. Elena, Harper, and Jessica become more than teachers — they become friends. Sunday brunches. Late-night calls. They share their own stories: Elena\'s European roots, Harper\'s corporate climb, Jessica\'s quiet strength. Addie realizes: polish isn\'t about pretending. It\'s about belonging.' },

    { number: 24, title: 'Jasper Notices', pov: 'Jasper', location: 'BSS HQ', synopsis: 'Jasper watches Addie change — not just the surface, but the confidence underneath. She speaks up in meetings now. Offers solutions. Catches things he misses. "You\'re not an assistant anymore," he tells her. "You\'re becoming a strategist." First hint of what she could be.' },

    { number: 25, title: 'The First Crisis She Owns', pov: 'Addison', location: 'Client Site', synopsis: 'A crisis erupts when Jasper is unreachable. Addie makes a call — the right call. When Jasper returns, she\'s already resolved it. "You acted." Addie: "Someone had to." Jasper: "Not someone. You." First time she realizes: she\'s not just surviving. She\'s leading.' },

    { number: 26, title: 'The Doubts', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Late night. Addie stares in the mirror. The clothes are right, the hair is right. But who is she? The small-town girl or the BSS executive? The imposter or the rising star? She calls Elena, 2am. "Am I becoming fake?" Elena: "You\'re becoming complete."' },

    { number: 27, title: 'Home Visit', pov: 'Addison', location: 'Family Home', synopsis: 'Addie visits her parents. They notice the changes — the clothes, the confidence, the way she carries herself. Mom: "You seem different." Addie: "I am different." Dad, quiet: "Good different?" Addie: "I think so." He nods. For him, that\'s a hug.' },

    { number: 28, title: 'The Wives\' Circle Introduction', pov: 'Elena', location: 'Private Club', synopsis: 'Elena brings Addie to her first Wives\' Circle event. A private club, old money, quiet power. Addie is introduced to Sara, Jessica, Caroline, Margaret. They assess her. She doesn\'t flinch. By the end of the evening, Caroline pulls Elena aside: "She\'s one of us, isn\'t she?" Elena: "She\'s becoming one of us."' },

    { number: 29, title: 'Harper\'s Challenge', pov: 'Harper', location: 'BSS HQ', synopsis: 'Harper pushes Addie. "You\'re comfortable now. That\'s dangerous." A test: run point on a small case, alone. No Jasper backup, no safety net. Addie is terrified. She does it anyway. She succeeds. Harper: "Now you know. You don\'t need us hovering."' },

    { number: 30, title: 'The Title Change', pov: 'Jasper', location: 'BSS HQ', synopsis: 'Six months in. Jasper calls Addie to his office. "You\'re not my assistant anymore. That title is beneath you." New title: Executive Operations Coordinator. It doesn\'t exist yet. He creates it for her. "You run things when I can\'t. Starting now."' },

    { number: 31, title: 'Growing Pains', pov: 'Addison', location: 'Various', synopsis: 'The new role is harder. More visibility, more pressure. Addie stumbles — overcommits, misses a detail, angers a client. She expects to be fired. Jasper: "Everyone fails. The question is what you do after." She learns: failure isn\'t fatal. It\'s data.' },

    { number: 32, title: 'Jessica\'s Wisdom', pov: 'Jessica', location: 'Spa', synopsis: 'Spa day with Jessica after the failure. "You\'re trying too hard to be perfect." Addie: "That\'s how I got here." Jessica: "That\'s not how you\'ll stay here. Perfection breaks. Excellence adapts." First crack in Addie\'s perfectionism — a crack that should have widened but didn\'t.' },

    { number: 33, title: 'The Sisterhood Forms', pov: 'Addison', location: 'Elena\'s Home', synopsis: 'Dinner at Elena\'s. Grace is there — she\'s just a baby. Addie holds her. Something shifts. This isn\'t just a career network. This is a family she\'s chosen. Elena sees it: "You\'re home now, Addie. You just don\'t know it yet."' },

    { number: 34, title: 'One Year', pov: 'Addison', location: 'BSS HQ', synopsis: 'One year at BSS. Addie compares old photos to new. Same face, different person. She\'s mastered the polish — but more than that, she\'s found her voice. She\'s not pretending anymore. She belongs. The small-town girl and the executive are the same person now.' },

    { number: 35, title: 'The Real Transformation', pov: 'Elena', location: 'Private Dinner', synopsis: 'Private dinner: Elena, Harper, Jessica, Addie. Elena raises a glass: "To Addison. Not for becoming like us — but for becoming herself." Addie: "You gave me the tools." Elena: "You built the house." The My Fair Lady routine is complete. Addie is ready for what comes next.' },

    // ============================================
    // PART 4: THE FOUNDATION (Ch 36-45)
    // Setting Up for Books 1-5
    // ============================================
    { number: 36, title: 'Jasper\'s Right Hand', pov: 'Jasper', location: 'Various', synopsis: 'Year two. Addie is Jasper\'s shadow — every meeting, every crisis, every decision. He trusts her like he trusts no one else. "You\'re the only one who sees the whole board." Addie: "I learned from watching you." Jasper: "You learned from paying attention. That\'s rarer."' },

    { number: 37, title: 'Meeting Kendra', pov: 'Addison', location: 'BSS HQ', synopsis: 'A new analyst joins: Kendra. Athletic, sharp, defensive. Addie sees herself — the outsider energy, the need to prove. She extends a hand. Kendra is wary. Addie: "I was you, not long ago. Let me help." First threads of a bond that will define both their lives.' },

    { number: 38, title: 'The Old Patterns', pov: 'Addison', location: 'Various', synopsis: 'Year three. Addie is working 16-hour days. She doesn\'t notice. The perfectionism that got her here is becoming a trap. Elena gently suggests she slow down. Addie dismisses it: "I\'m fine." First seeds of the pattern that will break her in Book 4.' },

    { number: 39, title: 'Grace Grows Up', pov: 'Elena', location: 'Oak Watch', synopsis: 'Grace is three now, four. Addie is "Aunt Addie" — always there for birthdays, always available for FaceTime. The bond is real. Elena watches: "She loves you." Addie: "I love her too." Elena, quietly worried: "Don\'t let work steal this from you."' },

    { number: 40, title: 'The SM Introduction', pov: 'Addison', location: 'Gala', synopsis: 'Elena brings Addie deeper into the SM world. First formal gala where Addie is introduced to Lady Margaret. The whispers start: "Jasper\'s protégé." "Rising star." "POH material someday." Addie doesn\'t know what POH means yet. But the seeds are planted.' },

    { number: 41, title: 'Cracks Forming', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Late night. Addie alone. The apartment is too quiet. When did she last see friends? When did she last take a day off? She pushes the thoughts away. There\'s always more work. She\'ll rest later. (She won\'t.)' },

    { number: 42, title: 'The Assistant Title Returns', pov: 'Jasper', location: 'BSS HQ', synopsis: 'Jasper officially makes Addie "Senior Executive Assistant" — but the title is a cover. She\'s really his second-in-command. "I need you public-facing now. Clients, partners, boards." Addie: "I\'m ready." She is. But she\'s also burning faster than anyone knows.' },

    { number: 43, title: 'The Promise', pov: 'Addison', location: 'Elena\'s Home', synopsis: 'Dinner with Elena and Grace. Grace, now five, makes Addie promise: "You\'ll always be my Aunt Addie, right?" Addie: "Always, baby." She means it. She doesn\'t know that keeping that promise will require breaking herself first.' },

    { number: 44, title: 'The Foundation Complete', pov: 'Elena', location: 'Various', synopsis: 'Elena reflects on what they\'ve built. Addie isn\'t just polished — she\'s powerful. The scared girl from the first interview is gone. In her place: a woman who can handle anything. Elena just hopes she\'ll learn to handle herself before it\'s too late.' },

    { number: 45, title: 'The Woman She\'s Becoming', pov: 'Addison', location: 'BSS HQ', synopsis: 'Addie stands at her window at BSS, city lights below. She thinks about where she started — the small town, the careful family, the hustle to belong. She made it. She belongs. She\'s ready for whatever comes next. (She isn\'t. But she will be, eventually. After she breaks and rises. The Royal Phoenix is just being forged.)' }
  ];

  // Insert all chapters
  for (const ch of chapters) {
    await prisma.chapter.create({
      data: {
        projectId: projectId,
        bookId: book6.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        tags: ch.location,
        status: 'outlined'
      }
    });
  }

  console.log('✅ Book 6: The Making of Addison created with', chapters.length, 'chapters');
  console.log('');
  console.log('=== BOOK 6 STRUCTURE ===');
  console.log('');
  console.log('PART 1: THE BEGINNING (Ch 1-12)');
  console.log('  - Family background, childhood, college');
  console.log('  - First jobs, finding BSS listing');
  console.log('');
  console.log('PART 2: ELENA SEES POTENTIAL (Ch 13-22)');
  console.log('  - First interview, Elena\'s observation');
  console.log('  - "My Fair Lady" transformation begins');
  console.log('  - Harper teaches power dynamics');
  console.log('  - Jessica provides physical polish');
  console.log('');
  console.log('PART 3: BECOMING ESSENTIAL (Ch 23-35)');
  console.log('  - Mentors become friends');
  console.log('  - First crisis she owns');
  console.log('  - Wives\' Circle introduction');
  console.log('  - Title change and new role');
  console.log('');
  console.log('PART 4: THE FOUNDATION (Ch 36-45)');
  console.log('  - Jasper\'s right hand');
  console.log('  - Meeting Kendra');
  console.log('  - Seeds of future breakdown');
  console.log('  - SM introduction and POH whispers');

  await prisma.$disconnect();
}

main().catch(console.error);
