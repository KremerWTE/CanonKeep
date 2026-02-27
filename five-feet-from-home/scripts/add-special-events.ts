import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING SPECIAL EVENTS & SCENES ===\n");

  // ========== KENDRA'S BABY BAPTISM BY THE POPE ==========
  console.log("--- Adding Kendra's Baby Baptism by the Pope ---\n");

  // Create as a Gala (major event)
  const baptismExists = await prisma.gala.findFirst({
    where: { name: { contains: 'Papal Baptism' }, projectId: project.id }
  });

  if (!baptismExists) {
    await prisma.gala.create({
      data: {
        projectId: project.id,
        name: "The Papal Baptism: Kendra's First Child",
        organization: 'The Vatican / Catholic Church',
        venue: "St. Peter's Basilica",
        location: 'Vatican City, Rome',
        purpose: 'Baptism of Kendra & Chris Donnelly\'s first child by Pope Francis',
        dresscode: 'Traditional Catholic formal - women in black with mantillas (chapel veils), men in dark suits',
        attendees: JSON.stringify([
          'Kendra Donnelly',
          'Chris Donnelly',
          'Pope Francis',
          'Jasper Barrett',
          'Elena Barrett',
          'Addie',
          'Maggie Donnelly',
          'Patrick Donnelly',
          'Select Wives Club members',
          'Vatican officials'
        ]),
        significance: `A once-in-a-lifetime event that cements the Donnelly family's standing within Catholic high society and the Equestrian Order of the Holy Sepulchre.

This baptism represents:
- The Donnelly family's deep Catholic faith
- BSS's connections to the highest levels of the Church
- A crowning moment for Kendra after her maternity struggles
- Chris's pride as a father and Catholic man

The Pope personally performing the baptism is a result of:
- The Barrett family's charitable work through EOHSJ
- Jasper's significant donations to Vatican causes
- Addie's connections within the Order of Malta`,
        events: `THE CEREMONY:
1. Private arrival at Vatican - security coordinated with Swiss Guard
2. Personal audience with Pope Francis before ceremony
3. Baptism in the Sistine Chapel (rare honor)
4. Pope speaks blessing over the child and family
5. Photographs with the Pope (unprecedented access)
6. Private lunch in Vatican apartments
7. Tour of Vatican archives (exclusive)

EMOTIONAL MOMENTS:
- Kendra weeps when the Pope holds her child
- Chris speechless with gratitude
- Elena records everything on her phone
- Addie serves as godmother
- Jasper shares a private moment with the Pope about faith and duty`,
        hostOrganizer: 'Arranged through EOHSJ connections / Jasper Barrett',
        clothingDescriptions: JSON.stringify({
          'Kendra Donnelly': 'Black Valentino dress with traditional black mantilla, pearl rosary from grandmother, subtle diamond cross necklace',
          'Chris Donnelly': 'Custom navy Brioni suit, Vatican-approved tie, his late father\'s cufflinks',
          'Elena Barrett': 'Black Oscar de la Renta, white Chantilly lace mantilla, the Barrett family cross',
          'Addie': 'Black Dior haute couture, antique Spanish mantilla, Dame of Malta insignia',
          'Jasper Barrett': 'Black Kiton suit, Knight Commander of EOHSJ regalia',
          'Baby Donnelly': 'Antique Irish christening gown (Donnelly family heirloom, 150 years old)'
        }),
        beforeActivities: `THE JOURNEY TO ROME:
- Private flight on Barrett jet (configured for baby comfort)
- Arrival 2 days before for jet lag adjustment
- Stay at Hotel de Russie (entire floor secured)
- Private evening mass at Santa Maria in Trastevere
- Elena coordinates with Vatican protocol office

THE MORNING OF:
- Family breakfast together - everyone nervous
- Kendra prays alone in her room
- Chris helps baby into christening gown
- Caravan of black cars to Vatican
- Swiss Guard escort inside`,
        afterActivities: `AFTER THE BAPTISM:
- Private tour of Vatican gardens
- Gift presentation: Pope gives family a blessed rosary and personal letter
- Family photos in St. Peter's Square (closed for them)
- Jasper and Pope discuss a charitable project for refugees
- Elena already planning thank-you gala in Charlotte

THE CELEBRATION:
- Dinner at La Pergola (three Michelin stars)
- Private room, toasts to the baby
- Addie gives Kendra a gift - family heirloom passed to godmother tradition
- Chris makes a speech about faith and fatherhood`,
        nextMorning: `THE MORNING AFTER:
- Breakfast on hotel terrace overlooking Rome
- Everyone still processing what happened
- Kendra nurses baby while looking at photos
- Pope Francis sends a personal handwritten note thanking them for their faith
- Elena already has the baptism gown professionally preserved
- Discussion of when to return to Charlotte
- Family prayer together - Chris leads

THE RETURN:
- Flight home, baby sleeps entire way
- Reflection on what this means for the family
- Jasper and Chris discuss the future
- Phone calls to Maggie back home with updates`
      }
    });
    console.log("Created: Papal Baptism event");
  }

  // Add as a storyline
  const baptismStory = await prisma.storyline.findFirst({
    where: { title: { contains: 'Papal Baptism' }, projectId: project.id }
  });

  if (!baptismStory) {
    await prisma.storyline.create({
      data: {
        projectId: project.id,
        title: "The Papal Baptism",
        category: "Major Life Event",
        description: "Kendra and Chris's first child is baptized by Pope Francis at the Vatican",
        content: `One of the most significant events in the Five Feet From Home universe. Kendra and Chris Donnelly's first child receives the sacrament of baptism from Pope Francis himself.

WHY THE POPE:
- The Barrett/BSS connection to EOHSJ (Equestrian Order of the Holy Sepulchre of Jerusalem)
- Jasper's substantial charitable giving to Vatican causes
- Addie's position within the Order of Malta
- A favor called in after BSS handled a sensitive Vatican matter (off-books)

THE SIGNIFICANCE:
For Kendra: The ultimate validation of her faith journey, proof that stepping back from her career was worth it
For Chris: His Irish Catholic roots meeting the highest expression of the faith
For the family: Cementing their place in Catholic aristocracy
For BSS: Demonstrating reach and connections beyond business

STORY BEATS:
1. The invitation arrives - everyone in shock
2. Preparations (what to wear, protocol lessons)
3. The journey to Rome
4. Private audience with the Pope
5. The baptism itself - tears, prayers, joy
6. The aftermath - how this changes everything
7. Return home as a different family`,
        characters: JSON.stringify(['Kendra Donnelly', 'Chris Donnelly', 'Jasper Barrett', 'Elena Barrett', 'Addie', 'Pope Francis']),
        themes: JSON.stringify(['Faith', 'Family', 'Tradition', 'Privilege', 'Grace'])
      }
    });
    console.log("Created: Papal Baptism storyline");
  }

  // ========== COLE & HAWK HOSPITAL SCENES ==========
  console.log("\n--- Adding Cole & Hawk Hospital Scenes ---\n");

  const hospitalStorylines = [
    {
      title: "Hawk's Injury: The Hospital Vigil",
      category: "Crisis/Drama",
      description: "Hawk is critically injured on a mission. The BSS family gathers.",
      content: `Hawk goes down on an overseas operation. Word reaches Charlotte. The family converges on the hospital.

SCENE 1 - THE CALL:
- Jasper gets the encrypted message
- His face goes white
- He tells Elena: "Hawk's been hit. They're medevacing him."
- Elena immediately mobilizes the Wives Club support network
- Addie gets the call and freezes - then shifts into action mode

SCENE 2 - THE FLIGHT:
- Addie on the Barrett jet, alone with her thoughts
- Flashbacks to her life with Hawk
- Prayer - real, raw, desperate
- Landing to find the BSS team waiting

SCENE 3 - THE HOSPITAL:
- Sterile corridors, hushed voices
- Addie sits beside Hawk's bed, holding his hand
- Machines beep steadily
- The surgeons come and go
- Jasper handles logistics; Chris keeps watch
- The Sentinels monitor from Charlotte

SCENE 4 - THE VIGIL:
- Elena arrives with supplies
- The Wives Club sends messages
- Hawk wakes briefly, sees Addie, tries to smile
- "I'm not done yet," he whispers
- Addie breaks down for the first time

SCENE 5 - RECOVERY:
- Slow progress, physical therapy
- Hawk's frustration at being weak
- Addie's strength carrying them both
- The team visits, one by one
- Hawk makes a decision about his future`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Jasper Barrett', 'Elena Barrett', 'Cole Harrington']),
      themes: JSON.stringify(['Sacrifice', 'Love', 'Vulnerability', 'Brotherhood'])
    },
    {
      title: "Cole's Emergency: Shot in the Line of Duty",
      category: "Crisis/Drama",
      description: "Cole Harrington takes a bullet protecting a principal. Ridge stays by his side.",
      content: `Cole steps in front of a bullet meant for a client. He's rushed to surgery while the team handles the aftermath.

SCENE 1 - THE OPERATION GOES WRONG:
- Extraction under fire
- Cole sees the shooter aim at the principal
- Without thinking, he moves
- The impact. The fall. Blood.
- Ridge drags him to cover, applying pressure

SCENE 2 - THE EVAC:
- Helicopter extraction
- Cole fading in and out
- Ridge refusing to leave his side
- Radio chatter as the team coordinates
- "Stay with me, Cole. That's an order."

SCENE 3 - THE HOSPITAL ABROAD:
- Foreign hospital, unfamiliar faces
- Ridge in the waiting room, covered in Cole's blood
- Hawk video calls from Charlotte - gives orders, stays calm
- Jasper reroutes to their location
- Surgery takes hours

SCENE 4 - THE AFTERMATH:
- Cole survives but it's close
- Ridge hasn't slept in 48 hours
- The client sends flowers - feels inadequate
- Cole wakes, first words: "Did they get out?"
- Yes. Because of you.

SCENE 5 - RECOVERY:
- Cole's long road back
- Ridge becomes his unofficial nurse
- The team rotates through visits
- Cole struggles with the physical limitations
- A conversation with Hawk about what comes next
- "You take a bullet, you earn the right to choose your path."`,
      characters: JSON.stringify(['Cole Harrington', 'Ridge Callahan', 'Hawk', 'Jasper Barrett']),
      themes: JSON.stringify(['Sacrifice', 'Brotherhood', 'Heroism', 'Recovery'])
    },
    {
      title: "Elena's Hospital Scare: The Pregnancy Complication",
      category: "Family Drama",
      description: "Elena has a pregnancy scare that brings Jasper rushing home from overseas",
      content: `Elena is rushed to the hospital with complications. Jasper is halfway around the world.

THE CRISIS:
- Elena at a charity event, sudden pain
- Addie immediately takes charge
- Hospital admission, doctors concerned
- Elena alone in the room, terrified

JASPER'S RESPONSE:
- Gets the call during a critical negotiation
- Doesn't hesitate - walks out
- Calls in every favor for the fastest route home
- Harper handles the abandoned meeting
- On the plane, Jasper confronts his priorities

THE HOSPITAL:
- Addie stays with Elena
- The Wives Club forms a prayer circle
- Doctors stabilize Elena
- The baby is safe - but she needs rest
- Jasper arrives, bursts through doors
- Holds Elena, doesn't speak, doesn't need to

THE AFTERMATH:
- Elena on bed rest
- Jasper cancels everything
- He stays home. Really stays.
- A turning point in their marriage
- The birth, healthy, a new beginning`,
      characters: JSON.stringify(['Elena Barrett', 'Jasper Barrett', 'Addie', 'The Wives Club']),
      themes: JSON.stringify(['Family', 'Priorities', 'Fear', 'Love', 'Growth'])
    },
    {
      title: "Maggie's Medical Emergency",
      category: "Family Crisis",
      description: "Maggie Donnelly collapses at a family gathering, revealing a hidden health battle",
      content: `Maggie Donnelly has been hiding something. At a family dinner, she collapses.

THE COLLAPSE:
- Family dinner at the Barrett compound
- Maggie seems tired but waves off concern
- Mid-conversation, she goes pale
- Chris catches her as she falls
- 911 called, Jasper clears a path

THE HOSPITAL:
- Diagnosis: Maggie has been fighting cancer privately
- She didn't want to worry anyone
- Chris is devastated - his mother kept this from him
- Kendra holds him as he processes
- The family regroups around Maggie's bed

THE TREATMENT:
- Maggie agrees to aggressive treatment
- The Wives Club organizes everything
- Chris takes time from BSS to be with his mother
- Jasper quietly arranges for the best specialists
- Elena handles Maggie's affairs

THE FIGHT:
- Chemo, radiation, the works
- Maggie's hair falls out; she jokes about wigs
- The family learns to be present differently
- Chris and Maggie have long talks they've never had
- She tells him about his father, about her own regrets

THE OUTCOME:
- Maggie beats it - or at least, enters remission
- A celebration, quieter than usual
- Everyone understands life's fragility
- Maggie becomes more involved in Wives Club
- She's not ready to go; there's too much left to do`,
      characters: JSON.stringify(['Maggie Donnelly', 'Chris Donnelly', 'Kendra Donnelly', 'Elena Barrett']),
      themes: JSON.stringify(['Family', 'Secrets', 'Illness', 'Strength', 'Love'])
    }
  ];

  for (const storyline of hospitalStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  // ========== ADD SAMPLE CRISES IF NONE EXIST ==========
  const crisisCount = await prisma.crisis.count({ where: { projectId: project.id } });
  console.log(`\n--- Checking Crises (current: ${crisisCount}) ---\n`);

  if (crisisCount === 0) {
    const crises = [
      {
        name: "The Vatican Leak",
        codeName: "OPERATION CHALICE",
        clientName: "Vatican City State",
        clientType: "Religious Institution / Government",
        crisisType: "Data Breach / Blackmail",
        severity: "critical",
        location: "Rome, Italy",
        description: "Sensitive Vatican documents have been stolen and the thieves threaten to release them unless paid. BSS is called in to recover the documents and neutralize the threat.",
        situation: "An insider with access to Vatican archives has stolen documents containing centuries of sensitive information. They've partnered with dark web actors to auction the data.",
        complications: "The Vatican cannot officially acknowledge the theft. Italian authorities are compromised. The leak window is 72 hours.",
        resolution: "BSS cyber division traces the leak, operators recover the documents, and the insider is quietly handed to Vatican security.",
        stakes: "If released, the documents could destabilize the Church and expose secrets kept for centuries.",
        bssTeam: JSON.stringify(['Jasper Barrett', 'Hawk', 'Cole Harrington', 'Ghost Grid (Cyber)']),
        status: 'resolved',
        bookAppearance: 'Five Feet From Home: Book 3'
      },
      {
        name: "Charlotte Media Scandal",
        codeName: "OPERATION FIREWALL",
        clientName: "Major Charlotte Corporation (Confidential)",
        clientType: "Fortune 500",
        crisisType: "Executive Scandal / Reputation Management",
        severity: "high",
        location: "Charlotte, NC",
        description: "A Fortune 500 CEO is caught in a scandal that threatens to tank the company's stock and destroy thousands of jobs.",
        situation: "Video evidence surfaces of the CEO in a compromising situation. It's being weaponized by a hostile takeover group.",
        complications: "The CEO's family doesn't know. Board members are panicking. Media is circling.",
        resolution: "BSS proves the video is a deepfake manufactured by the takeover group. Counter-operation exposes the real criminals.",
        stakes: "12,000 jobs, a family's reputation, and the integrity of Charlotte's business community.",
        bssTeam: JSON.stringify(['Jasper Barrett', 'Daniel Cruz', 'Watchtower Analysts']),
        status: 'resolved',
        bookAppearance: 'Five Feet From Home: Book 1'
      },
      {
        name: "The Miami Extraction",
        codeName: "OPERATION SUNSET",
        clientName: "US Government (Classified)",
        clientType: "Government",
        crisisType: "Hostage Rescue / Diplomatic Incident",
        severity: "critical",
        location: "South America / Miami",
        description: "An American diplomat's family is taken hostage in South America. Official channels can't act fast enough.",
        situation: "Cartel elements have kidnapped the diplomat's wife and children. Ransom demands are a cover - they want the diplomat to leak classified information.",
        complications: "State Department tied in red tape. Local police are compromised. Time is running out.",
        resolution: "Harper coordinates from Miami. BSS operators extract the family. The cartel operation is exposed to DEA.",
        stakes: "Three innocent lives and national security secrets.",
        bssTeam: JSON.stringify(['Harper Vance', 'Cole Harrington', 'Ridge Callahan', 'Miami Lab']),
        status: 'resolved',
        bookAppearance: 'Five Feet From Home: Book 2'
      }
    ];

    for (const crisis of crises) {
      await prisma.crisis.create({
        data: { projectId: project.id, ...crisis }
      });
      console.log(`Created crisis: ${crisis.name}`);
    }
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const galaCount = await prisma.gala.count();
  const finalCrisisCount = await prisma.crisis.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Storylines: ${storylineCount}`);
  console.log(`Galas: ${galaCount}`);
  console.log(`Crises: ${finalCrisisCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
