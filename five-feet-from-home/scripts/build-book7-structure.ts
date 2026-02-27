import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { name: 'STORY_PROJECT' }
  });

  const projectId = project?.id;
  if (!projectId) throw new Error('No project found');

  // Delete existing Book 7
  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 7' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 7');
  }

  // Create Book 7: The POH Dance
  const book7 = await prisma.book.create({
    data: {
      title: 'Book 7: The POH Dance',
      projectId: projectId,
      synopsis: 'A full book dedicated to the political, personal, and spiritual journey of accepting the role of Patroness of Honor. The Order\'s internal politics, competing candidates, the weight of tradition, and Addie\'s own doubts about worthiness. Hawk supports from the sidelines as Addie navigates this alone. The book culminates in her formal acceptance and installation.',
      status: 'outlined'
    }
  });

  const chapters = [
    // ============================================
    // PART 1: THE OFFER (Ch 1-12)
    // ============================================
    { number: 1, title: 'The Formal Invitation', pov: 'Addison', location: 'Oak Watch', synopsis: 'Lady Margaret delivers the formal invitation in person. The Sapientia Minervae formally extends the role of Patroness of Honor to Addison. It\'s not a guarantee — it\'s a beginning. There will be a discernment period. Other names are being considered. The dance begins.' },

    { number: 2, title: 'What POH Means', pov: 'Elena', location: 'Oak Watch', synopsis: 'Elena explains the weight of POH. Not just a title — a calling. The Patroness is the spiritual and social anchor of the network. She connects families, guides resources, represents the Order publicly. "This isn\'t a job," Elena says. "It\'s a vocation."' },

    { number: 3, title: 'The Competition', pov: 'Addison', location: 'Private Club', synopsis: 'Addie learns she\'s not the only candidate. Alexandra Whitmore — old money, perfect pedigree, connected since birth. Diana Ashford — European aristocracy, impeccable credentials. Addie is the outsider. The small-town girl who clawed her way up. Some see that as strength. Others see it as disqualifying.' },

    { number: 4, title: 'Hawk\'s Counsel', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Addie tells Hawk about the competition. "They were born for this. I\'m an imposter." Hawk: "You think Delta accepts legacies? We take the ones who prove themselves in the mud. That\'s you." He doesn\'t minimize her fears. He reframes them.' },

    { number: 5, title: 'The First Test', pov: 'Addison', location: 'SM Event', synopsis: 'A SM luncheon. All three candidates present. Alexandra is polished, cold. Diana is warm but calculated. Addie is... herself. She stumbles once, recovers. Lady Caroline watches everything. Afterward: "You have something they don\'t. Authenticity can\'t be taught."' },

    { number: 6, title: 'The Doubts Begin', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Night alone. Addie spirals. She\'s not good enough. She collapsed four months ago. How can she lead anyone when she couldn\'t lead herself? She almost calls Hawk. Doesn\'t. Some battles she needs to fight alone.' },

    { number: 7, title: 'Therapy: Imposter Syndrome', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Dr. Reyes names it: imposter syndrome. "You feel like a fraud because you achieved something you were told you couldn\'t." Addie: "But what if I really am a fraud?" Dr. Reyes: "Frauds don\'t ask that question."' },

    { number: 8, title: 'The Order\'s History', pov: 'Elena', location: 'Cathedral Library', synopsis: 'Elena takes Addie to the SM archive. The history of POH: warriors, queens, survivors. Not one of them was "ready." They grew into the role. "The mantle makes the woman as much as the woman makes the mantle."' },

    { number: 9, title: 'Alexandra Strikes', pov: 'Addison', location: 'Charity Gala', synopsis: 'Charity gala. Alexandra corners Addie. "You\'re sweet to try. But this role requires... breeding." It\'s a knife wrapped in silk. Addie doesn\'t react publicly. Privately, she fumes. Hawk later: "She\'s scared of you. That\'s why she attacked."' },

    { number: 10, title: 'Diana\'s Approach', pov: 'Addison', location: 'Private Tea', synopsis: 'Diana requests a private tea. She\'s gracious, curious. "I\'ve read about your career. Impressive." Is it genuine or tactical? Addie can\'t tell. Diana: "May the best woman win." It sounds like a threat. Or maybe Addie\'s paranoid.' },

    { number: 11, title: 'The Sisterhood\'s Support', pov: 'Kendra', location: 'Oak Watch', synopsis: 'Kendra and Elena rally around Addie. Sunday dinner — just the three of them. "You\'re not alone in this," Kendra says. "We\'ve got you." For the first time, Addie believes it. The sisterhood is her foundation.' },

    { number: 12, title: 'Hawk Steps Back', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk tells Addie: "This part, I can\'t help with. The Order needs to see you — not you-plus-me." He\'ll still be there. But in the POH dance, she leads. He understands the optics. She needs to earn this alone.' },

    // ============================================
    // PART 2: THE DISCERNMENT (Ch 13-28)
    // ============================================
    { number: 13, title: 'Meeting the Council', pov: 'Addison', location: 'SM Headquarters', synopsis: 'Formal meeting with the SM Council. Seven members, all formidable. They ask about her collapse. She\'s honest: "I broke. I\'m rebuilding." Lady Margaret: "That\'s the first honest answer we\'ve heard all week." Points for Addie.' },

    { number: 14, title: 'The Spiritual Component', pov: 'Addison', location: 'Cathedral', synopsis: 'POH has spiritual requirements. Addie meets with Father Thomas. Her faith is complicated — she\'s been in RCIA, but doubts remain. He doesn\'t demand certainty: "Faith is a journey, not a destination. Are you walking?"' },

    { number: 15, title: 'Alexandra\'s Campaign', pov: 'Elena', location: 'Various', synopsis: 'Elena hears whispers. Alexandra is campaigning hard — dinners, donations, promises. She\'s calling in every favor her family has accumulated over generations. "This is how the old guard operates," Elena warns Addie. "You can\'t fight money with money."' },

    { number: 16, title: 'Addie\'s Counter', pov: 'Addison', location: 'Various', synopsis: 'Addie doesn\'t have money or pedigree. She has relationships. She visits families the Order has helped. She listens. She remembers names, stories, struggles. Word spreads: she actually cares. That\'s rare.' },

    { number: 17, title: 'The Charity Challenge', pov: 'Addison', location: 'Charity Event', synopsis: 'Each candidate is asked to champion a cause. Alexandra chooses something safe — symphony funding. Diana picks arts education. Addie chooses veteran family support. "It\'s not glamorous," she tells the Council, "but it matters."' },

    { number: 18, title: 'Hawk\'s Quiet Pride', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk hears about the veteran cause choice. He doesn\'t say anything. Just pulls her close. She chose something that matters to him — and didn\'t even know it. Or maybe she did. Either way, he\'s never been prouder.' },

    { number: 19, title: 'The Scandal', pov: 'Addison', location: 'Various', synopsis: 'Someone leaks Addie\'s collapse to a society columnist. "POH Candidate Hospitalized for Nervous Breakdown." Alexandra\'s fingerprints are suspected but unprovable. Addie\'s phone explodes. The Council is watching how she handles it.' },

    { number: 20, title: 'Addie\'s Response', pov: 'Addison', location: 'Press Event', synopsis: 'Addie doesn\'t hide. She issues a statement: "I worked myself into exhaustion. I broke. I got help. That\'s not weakness — that\'s wisdom." Lady Margaret calls it "the bravest thing she\'s seen in thirty years of SM."' },

    { number: 21, title: 'The Tide Turns', pov: 'Elena', location: 'Various', synopsis: 'The leak backfires. People respect Addie\'s honesty. Alexandra is suddenly on defense. Diana quietly withdraws from consideration — personal reasons. It\'s down to two: Addie and Alexandra.' },

    { number: 22, title: 'The Final Interview', pov: 'Addison', location: 'SM Headquarters', synopsis: 'Final interview with the full Council. Two hours of questions about leadership, faith, vision. Addie is exhausted but clear. "I don\'t have all the answers. But I\'ll show up. Every time. That\'s my promise."' },

    { number: 23, title: 'Alexandra\'s Last Move', pov: 'Addison', location: 'Private Meeting', synopsis: 'Alexandra requests a private meeting. "Withdraw. I\'ll make it worth your while." Addie: "This isn\'t about worth. It\'s about calling." Alexandra\'s smile freezes. "You\'ll regret this." Addie: "Maybe. But I won\'t regret being myself."' },

    { number: 24, title: 'The Wait', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'The Council deliberates. Three days of silence. Addie can\'t eat, can\'t sleep. Hawk stays close but doesn\'t hover. Kendra brings wine. Elena brings distraction. The sisterhood holds her through the waiting.' },

    { number: 25, title: 'The Call', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Day three, evening. Addie\'s phone rings. Lady Margaret. "The Council has reached a decision. Can you come to the cathedral tomorrow morning?" Addie can\'t read her tone. "Yes. I\'ll be there." Longest night of her life.' },

    { number: 26, title: 'The Cathedral', pov: 'Addison', location: 'Cathedral', synopsis: 'Morning. The cathedral is empty except for the Council. Lady Margaret stands at the altar. "Addison, after careful discernment, the Order of Sapientia Minervae has chosen you as our next Patroness of Honor." Addie can\'t breathe. Then: tears.' },

    { number: 27, title: 'The Acceptance', pov: 'Addison', location: 'Cathedral', synopsis: 'Addie formally accepts. The words feel ancient, weighty. She promises to serve, to guide, to be present. The Council members embrace her one by one. Lady Margaret places a hand on her shoulder: "Welcome home."' },

    { number: 28, title: 'Telling Hawk', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Addie finds Hawk at her apartment. He knew — Elena texted him. But he waited for her to tell him. "I\'m POH." He grins. "I know." He picks her up, spins her. "I\'m so damn proud of you." First kiss since everything began. It means more now.' },

    // ============================================
    // PART 3: THE INSTALLATION (Ch 29-40)
    // ============================================
    { number: 29, title: 'Preparing for Installation', pov: 'Elena', location: 'Various', synopsis: 'The installation is a major SM event. Three weeks of preparation. Guest lists, ceremonies, traditions. Elena helps navigate. "This is your introduction to everyone. Make it count."' },

    { number: 30, title: 'The Dress', pov: 'Addison', location: 'Boutique', synopsis: 'Choosing the installation gown. Jessica, Elena, Kendra — all there. They find it: cream silk, elegant but not ostentatious. "You look like a POH," Kendra says. Addie looks in the mirror. For the first time, she sees it too.' },

    { number: 31, title: 'Hawk\'s Role', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk asks what role he should play at the installation. Addie: "I want you there. Not hiding." This is public. Official. They\'re going to be seen together. He agrees. "I\'ll wear the good suit."' },

    { number: 32, title: 'Grace\'s Excitement', pov: 'Addison', location: 'Oak Watch', synopsis: 'Grace is beside herself. "Aunt Addie is going to be a princess!" Close enough. She\'s been practicing her curtsy. Addie laughs harder than she has in months. Grace wants to come to the installation. Of course she can.' },

    { number: 33, title: 'The Rehearsal', pov: 'Addison', location: 'Cathedral', synopsis: 'Installation rehearsal. Addie learns the ceremony: procession, oaths, the pendant transfer. It\'s elaborate, centuries-old. She stumbles on a Latin phrase. Lady Margaret: "You\'ll have it by the day. You always rise."' },

    { number: 34, title: 'Alexandra\'s Concession', pov: 'Addison', location: 'Private Club', synopsis: 'Alexandra appears at a pre-installation reception. Stiff, formal, but present. "Congratulations." It\'s not warm, but it\'s civil. Addie accepts graciously. Some victories don\'t need to be gloated over.' },

    { number: 35, title: 'The Eve', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Night before the installation. Addie can\'t sleep. Hawk stays over — just holding her. "Tomorrow changes everything." Addie: "No. Tomorrow confirms what already changed." She became POH the moment she chose to rise.' },

    { number: 36, title: 'Installation Morning', pov: 'Addison', location: 'Various', synopsis: 'Installation day. Hair, makeup, the dress. Kendra helps her zip up. Elena adjusts the pendant chain (temporary — the real one comes during the ceremony). Jessica does final touches. "You\'re ready."' },

    { number: 37, title: 'The Procession', pov: 'Elena', location: 'Cathedral', synopsis: 'The cathedral is full. Dignitaries, Dames, Knights, families. Grace sits in the front row, almost vibrating with excitement. Hawk is two rows back, eyes on Addie. Music begins. The doors open. Addie walks in.' },

    { number: 38, title: 'The Ceremony', pov: 'Addison', location: 'Cathedral', synopsis: 'The installation ceremony. Ancient words, sacred promises. Lady Margaret removes the POH pendant from around her own neck and places it on Addie. "Rise, Patroness of Honor." Addie rises. The cathedral erupts in applause.' },

    { number: 39, title: 'The First Speech', pov: 'Addison', location: 'Cathedral', synopsis: 'Addie\'s first speech as POH. She talks about falling and rising. About imperfection and grace. About the families who matter more than the politics. "I don\'t promise to be perfect. I promise to be present." Standing ovation.' },

    { number: 40, title: 'The Royal Phoenix', pov: 'Hawk', location: 'Reception', synopsis: 'Reception after. Hawk finds Addie in a quiet corner. "How does it feel?" Addie looks at the pendant, at the room full of people, at him. "Like I finally became who I was supposed to be." He kisses her hand. "My Royal Phoenix." She smiles. "Yours."' }
  ];

  for (const ch of chapters) {
    await prisma.chapter.create({
      data: {
        projectId: projectId,
        bookId: book7.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        tags: ch.location,
        status: 'outlined'
      }
    });
  }

  console.log('✅ Book 7: The POH Dance - 40 chapters');
  console.log('');
  console.log('PART 1: THE OFFER (Ch 1-12) - Competition begins');
  console.log('PART 2: THE DISCERNMENT (Ch 13-28) - Politics and proving');
  console.log('PART 3: THE INSTALLATION (Ch 29-40) - Acceptance and ceremony');

  await prisma.$disconnect();
}

main().catch(console.error);
