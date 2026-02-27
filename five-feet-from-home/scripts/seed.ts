/**
 * Seed Script - Creates sample data for demonstration
 *
 * Usage: npm run seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample data...');

  // Create project
  const project = await prisma.project.upsert({
    where: { name: 'The Last Echo' },
    update: {},
    create: {
      name: 'The Last Echo',
      description: 'A dystopian thriller about memory and identity',
      genre: 'sci-fi',
      povStyle: 'third-person-limited',
    },
  });

  console.log(`Created project: ${project.name}`);

  // Create characters
  const characters = await Promise.all([
    prisma.character.upsert({
      where: { projectId_name: { projectId: project.id, name: 'Maya Chen' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'Maya Chen',
        archetype: 'Protagonist',
        age: '32',
        background: 'Former neuroscientist who lost her memories in an experimental procedure. Now works as a "memory hunter" - someone who retrieves lost memories for clients in the underground economy.',
        motivations: 'To recover her own lost memories and understand who she was before the procedure.',
        fears: 'That the person she was before was someone she wouldn\'t want to be.',
        flaw: 'Trusts technology over human connection.',
        secrets: 'She was the one who invented the memory-wiping procedure.',
        voiceNotes: 'Speaks in clipped, precise sentences. Rarely uses contractions. Often pauses mid-sentence as if searching for a word she\'s forgotten.',
        arcStart: 'Isolated, clinical, treats memories as data',
        arcChange: 'Begins to value emotional connections over information',
        arcEnd: 'Chooses to keep certain painful memories rather than erase them',
      },
    }),
    prisma.character.upsert({
      where: { projectId_name: { projectId: project.id, name: 'Kai Ortega' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'Kai Ortega',
        archetype: 'Ally/Love Interest',
        age: '29',
        background: 'A "memory keeper" - someone whose job is to store other people\'s memories. Has an eidetic memory and can recall everything, which is both a gift and a curse.',
        motivations: 'To help Maya find what she\'s looking for, even if it means losing her.',
        fears: 'Forgetting even one moment of his life.',
        flaw: 'Cannot let go of the past.',
        secrets: 'He holds one of Maya\'s memories - the moment she fell in love.',
        voiceNotes: 'Speaks in flowing, descriptive language. References the past constantly. Voice softens when talking about memories.',
      },
    }),
    prisma.character.upsert({
      where: { projectId_name: { projectId: project.id, name: 'Director Voss' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'Director Voss',
        archetype: 'Antagonist',
        age: '58',
        background: 'Head of the Memory Bureau, the government agency that controls memory extraction and storage. Believes memories are too dangerous to leave in individual hands.',
        motivations: 'To create a society free from the pain of traumatic memories.',
        fears: 'His own memories of what he did during the Purge.',
        flaw: 'Believes the ends always justify the means.',
        secrets: 'He ordered the experimental procedure on Maya specifically to suppress her knowledge.',
      },
    }),
  ]);

  console.log(`Created ${characters.length} characters`);

  // Create relationships
  await prisma.characterRelationship.upsert({
    where: {
      fromCharacterId_toCharacterId_relationshipType: {
        fromCharacterId: characters[0].id,
        toCharacterId: characters[1].id,
        relationshipType: 'romantic interest',
      },
    },
    update: {},
    create: {
      fromCharacterId: characters[0].id,
      toCharacterId: characters[1].id,
      relationshipType: 'romantic interest',
      description: 'Maya feels an inexplicable connection to Kai, not knowing he holds her memory of falling in love.',
    },
  });

  await prisma.characterRelationship.upsert({
    where: {
      fromCharacterId_toCharacterId_relationshipType: {
        fromCharacterId: characters[0].id,
        toCharacterId: characters[2].id,
        relationshipType: 'enemy',
      },
    },
    update: {},
    create: {
      fromCharacterId: characters[0].id,
      toCharacterId: characters[2].id,
      relationshipType: 'enemy',
      description: 'Maya suspects Voss knows more about her past than he reveals.',
    },
  });

  console.log('Created character relationships');

  // Create locations
  const locations = await Promise.all([
    prisma.location.upsert({
      where: { projectId_name: { projectId: project.id, name: 'The Vault' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'The Vault',
        description: 'An underground bunker where memory keepers store the memories they hold. Walls lined with crystalline storage units that glow faintly with captured moments.',
        rules: 'Memories stored here cannot be accessed without the original owner\'s consent.',
        significance: 'Represents the weight of the past and the price of preservation.',
      },
    }),
    prisma.location.upsert({
      where: { projectId_name: { projectId: project.id, name: 'The Bureau' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'The Bureau',
        description: 'The Memory Bureau headquarters - a sterile white tower that dominates the city skyline. Inside, everything is designed to suppress emotional responses.',
        rules: 'All memories within the Bureau are property of the state.',
        significance: 'Symbol of authoritarian control over the most personal aspects of human experience.',
      },
    }),
  ]);

  console.log(`Created ${locations.length} locations`);

  // Create plot threads
  const plotThreads = await Promise.all([
    prisma.plotThread.upsert({
      where: { projectId_name: { projectId: project.id, name: 'The Search for Identity' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'The Search for Identity',
        premise: 'Maya must piece together who she was before the memory wipe, discovering both beautiful and terrible truths.',
        stakes: 'If Maya doesn\'t find her memories, she\'ll never know who she truly is. But finding them may destroy the person she\'s become.',
        phases: JSON.stringify([
          'Maya discovers she was a scientist, not just a test subject',
          'She learns she invented the memory-wipe procedure',
          'She confronts the choice: remember everything or stay who she is now',
        ]),
        status: 'active',
      },
    }),
    prisma.plotThread.upsert({
      where: { projectId_name: { projectId: project.id, name: 'The Resistance' } },
      update: {},
      create: {
        projectId: project.id,
        name: 'The Resistance',
        premise: 'An underground movement fights to preserve humanity\'s right to their own memories, and they want Maya\'s help.',
        stakes: 'The Bureau is planning mass memory extraction. Only Maya\'s knowledge can stop them.',
        phases: JSON.stringify([
          'Maya is contacted by the Resistance',
          'She must choose between safety and justice',
          'The final confrontation with the Bureau',
        ]),
        status: 'active',
      },
    }),
  ]);

  console.log(`Created ${plotThreads.length} plot threads`);

  // Create chapters
  const chapters = await Promise.all([
    prisma.chapter.upsert({
      where: { id: 'ch1-seed' },
      update: {},
      create: {
        id: 'ch1-seed',
        projectId: project.id,
        number: 1,
        title: 'The Blank Slate',
        synopsis: 'Maya wakes in a sterile room with no memory of who she is. A man named Kai tells her she hired him to find something, but he won\'t say what.',
        pov: 'Maya Chen',
        beats: JSON.stringify([
          'Maya awakens disoriented',
          'Kai introduces himself as her employee',
          'She sees her own face and doesn\'t recognize it',
          'First hint of the Memory Bureau\'s involvement',
        ]),
        status: 'draft',
        wordCount: 3200,
      },
    }),
    prisma.chapter.upsert({
      where: { id: 'ch2-seed' },
      update: {},
      create: {
        id: 'ch2-seed',
        projectId: project.id,
        number: 2,
        title: 'Echoes',
        synopsis: 'Maya experiences her first memory fragment - a lab, a procedure, her own voice saying "I\'m sorry." She begins to suspect she wasn\'t just a victim.',
        pov: 'Maya Chen',
        beats: JSON.stringify([
          'A routine memory extraction triggers a flashback',
          'Maya sees herself in a lab coat',
          'Kai reveals he\'s been protecting her from the Bureau',
          'They decide to visit The Vault',
        ]),
        status: 'draft',
        wordCount: 4100,
      },
    }),
    prisma.chapter.upsert({
      where: { id: 'ch3-seed' },
      update: {},
      create: {
        id: 'ch3-seed',
        projectId: project.id,
        number: 3,
        title: 'The Weight of Keeping',
        synopsis: 'At The Vault, Maya meets other memory keepers. She learns the true cost of remembering everything - and that Kai carries a piece of her.',
        pov: 'Maya Chen',
        beats: JSON.stringify([
          'Maya enters The Vault for the first time',
          'She witnesses memory keepers overwhelmed by others\' pain',
          'Kai admits he holds one of her memories',
          'Director Voss\'s agents arrive',
        ]),
        status: 'draft',
        wordCount: 3800,
      },
    }),
  ]);

  console.log(`Created ${chapters.length} chapters`);

  // Link characters to chapters
  for (const chapter of chapters) {
    await prisma.chapterCharacter.upsert({
      where: {
        chapterId_characterId: {
          chapterId: chapter.id,
          characterId: characters[0].id,
        },
      },
      update: {},
      create: {
        chapterId: chapter.id,
        characterId: characters[0].id,
        role: 'pov',
      },
    });

    await prisma.chapterCharacter.upsert({
      where: {
        chapterId_characterId: {
          chapterId: chapter.id,
          characterId: characters[1].id,
        },
      },
      update: {},
      create: {
        chapterId: chapter.id,
        characterId: characters[1].id,
        role: 'major',
      },
    });
  }

  // Link plot threads to chapters
  await prisma.chapterPlot.upsert({
    where: {
      chapterId_plotThreadId: {
        chapterId: chapters[0].id,
        plotThreadId: plotThreads[0].id,
      },
    },
    update: {},
    create: {
      chapterId: chapters[0].id,
      plotThreadId: plotThreads[0].id,
      advancement: 'Establishes Maya\'s amnesia and the mystery of her identity',
    },
  });

  // Create events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { id: 'evt1-seed' },
      update: {},
      create: {
        id: 'evt1-seed',
        projectId: project.id,
        name: 'The Purge',
        description: 'Five years ago, the Memory Bureau conducted mass memory extractions, erasing a generation\'s traumatic memories of the civil war.',
        timelineRef: '5 years before story',
        timelineSort: 1,
        consequences: 'Created the underground memory economy and the Resistance movement.',
      },
    }),
    prisma.event.upsert({
      where: { id: 'evt2-seed' },
      update: {},
      create: {
        id: 'evt2-seed',
        projectId: project.id,
        name: 'Maya\'s Procedure',
        description: 'Maya undergoes an experimental memory wipe that removes all personal memories while preserving skills and knowledge.',
        timelineRef: '6 months before story',
        timelineSort: 2,
        consequences: 'Maya loses her identity but retains her scientific knowledge.',
      },
    }),
    prisma.event.upsert({
      where: { id: 'evt3-seed' },
      update: {},
      create: {
        id: 'evt3-seed',
        projectId: project.id,
        name: 'Maya Hires Kai',
        description: 'The new Maya, acting on instinct, hires Kai to find "something important" without knowing what it is.',
        timelineRef: '3 months before story',
        timelineSort: 3,
        consequences: 'Sets the story in motion.',
      },
    }),
  ]);

  console.log(`Created ${events.length} events`);

  // Create a sample conflict
  await prisma.conflict.upsert({
    where: { id: 'conflict-sample' },
    update: {},
    create: {
      id: 'conflict-sample',
      projectId: project.id,
      conflictType: 'missing_field',
      severity: 'info',
      description: 'Character "Director Voss" has no defined character arc (start, change, end)',
      entityTypeA: 'character',
      entityIdA: characters[2].id,
    },
  });

  console.log('Created sample conflict');

  // Create a book
  const book = await prisma.book.upsert({
    where: { projectId_title: { projectId: project.id, title: 'The Last Echo: Book One' } },
    update: {},
    create: {
      projectId: project.id,
      title: 'The Last Echo: Book One',
      subtitle: 'Memory',
      synopsis: 'In a world where memories can be extracted and stored, one woman must find the truth of who she was - even if it destroys who she\'s become.',
      structure: JSON.stringify({
        hook: 'Maya wakes with no memory in Chapter 1',
        incitingIncident: 'Learning she may have invented the memory-wipe procedure',
        midpoint: 'Discovering Kai holds her memory of love',
        climax: 'Confrontation with Director Voss',
        resolution: 'Maya\'s choice about her memories',
      }),
      status: 'drafting',
    },
  });

  // Assign chapters to book
  await prisma.chapter.updateMany({
    where: { id: { in: chapters.map((c) => c.id) } },
    data: { bookId: book.id },
  });

  console.log(`Created book: ${book.title}`);

  console.log('');
  console.log('========================================');
  console.log('Seeding complete!');
  console.log('========================================');
  console.log('');
  console.log('Run `npm run dev` to view the sample data.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
