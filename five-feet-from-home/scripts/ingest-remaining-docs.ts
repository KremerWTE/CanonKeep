import * as mammoth from 'mammoth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Documents to parse
const wivesClubDocs = [
  { name: 'Wives Club Anchor Names', path: 'wives club anchor names.docx' },
  { name: 'Addie and POH Role', path: 'Addie and POH role.docx' },
  { name: 'POH Story Outlines', path: 'POH story outlines.docx' },
];

const characterDocs = [
  { name: 'Ridge Story', path: 'Ridge story.docx', character: 'Ridge' },
  { name: 'Chris Background', path: 'Chris background expnasion.docx', character: 'Chris' },
  { name: 'Hawk Character Background', path: 'Hawk character background.docx', character: 'Hawk' },
  { name: 'Addie and Hawk Family Growth', path: 'Addie and Hawk family growth.docx', character: 'Hawk' },
  { name: 'Addie and Hawk Journey', path: "Addie and Hawk's Journey.docx", character: 'Hawk' },
];

async function parseDoc(path: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  } catch {
    return '';
  }
}

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== PARSING AND INGESTING REMAINING DOCUMENTS ===\n");

  // ============ WIVES CLUB / POH DOCUMENTS ============
  console.log("--- Parsing Wives Club / POH Documents ---\n");

  const parsedWivesContent: { name: string; content: string }[] = [];

  for (const doc of wivesClubDocs) {
    const text = await parseDoc(doc.path);
    if (text) {
      parsedWivesContent.push({ name: doc.name, content: text });
      console.log(`Parsed: ${doc.name} (${text.length} chars)`);
      console.log(`Preview: ${text.substring(0, 500).replace(/\n+/g, ' ')}...\n`);
    }
  }

  // ============ CHARACTER BACKGROUND DOCUMENTS ============
  console.log("\n--- Parsing Character Background Documents ---\n");

  const parsedCharacterContent: { name: string; content: string; character: string }[] = [];

  for (const doc of characterDocs) {
    const text = await parseDoc(doc.path);
    if (text) {
      parsedCharacterContent.push({ name: doc.name, content: text, character: doc.character });
      console.log(`Parsed: ${doc.name} (${text.length} chars)`);
      console.log(`Preview: ${text.substring(0, 500).replace(/\n+/g, ' ')}...\n`);
    }
  }

  // ============ NOW INGEST THE CONTENT ============
  console.log("\n=== INGESTING CONTENT INTO DATABASE ===\n");

  // Create/Update Wives Club Organization
  const wivesClubContent = parsedWivesContent.map(p => p.content).join('\n\n---\n\n');

  const existingWivesClub = await prisma.organization.findFirst({
    where: { name: { contains: 'Wives Club' }, projectId: project.id }
  });

  if (existingWivesClub) {
    await prisma.organization.update({
      where: { id: existingWivesClub.id },
      data: {
        significance: `WIVES CLUB / PALACE OF HONOR\n\nParsed from source documents:\n\n${wivesClubContent.substring(0, 10000)}`
      }
    });
    console.log("Updated: Wives Club organization with POH content");
  } else {
    // Create wives club organization
    await prisma.organization.create({
      data: {
        projectId: project.id,
        name: 'The Wives Club / Palace of Honor',
        type: 'Secret Society / Philanthropy',
        industry: 'High Society / Catholic Philanthropy',
        significance: `WIVES CLUB / PALACE OF HONOR\n\nParsed from source documents:\n\n${wivesClubContent.substring(0, 10000)}`
      }
    });
    console.log("Created: Wives Club / Palace of Honor organization");
  }

  // Create storylines from POH content
  const pohStorylines = [
    {
      title: 'Wives Club - Inner Circle',
      category: 'Wives Club',
      description: 'The inner workings of the Wives Club and its members',
      content: parsedWivesContent.find(p => p.name === 'Wives Club Anchor Names')?.content || 'Wives Club anchor members and their roles.'
    },
    {
      title: 'Addie POH Role',
      category: 'Palace of Honor',
      description: 'Addie role within the Palace of Honor organization',
      content: parsedWivesContent.find(p => p.name === 'Addie and POH Role')?.content || 'Addie role in POH.'
    },
    {
      title: 'POH Story Arcs',
      category: 'Palace of Honor',
      description: 'Story outlines for Palace of Honor events and missions',
      content: parsedWivesContent.find(p => p.name === 'POH Story Outlines')?.content || 'POH story outlines.'
    }
  ];

  for (const storyline of pohStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created storyline: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated storyline: ${storyline.title}`);
    }
  }

  // ============ UPDATE CHARACTER BACKGROUNDS ============
  console.log("\n--- Updating Character Backgrounds ---\n");

  // Group content by character
  const ridgeContent = parsedCharacterContent.filter(p => p.character === 'Ridge').map(p => p.content).join('\n\n');
  const chrisContent = parsedCharacterContent.filter(p => p.character === 'Chris').map(p => p.content).join('\n\n');
  const hawkContent = parsedCharacterContent.filter(p => p.character === 'Hawk').map(p => p.content).join('\n\n');

  // Update Ridge
  if (ridgeContent) {
    const ridge = await prisma.character.findFirst({
      where: { firstName: 'Ridge', projectId: project.id }
    });
    if (ridge) {
      await prisma.character.update({
        where: { id: ridge.id },
        data: {
          background: `${ridge.background || ''}\n\n--- FROM SOURCE DOCUMENTS ---\n\n${ridgeContent.substring(0, 8000)}`,
          sourceFiles: 'Ridge story.docx'
        }
      });
      console.log("Updated: Ridge character with background from source docs");
    }

    // Create Ridge storyline
    await prisma.storyline.upsert({
      where: { id: 'ridge-story-placeholder' },
      update: {},
      create: {
        projectId: project.id,
        title: 'Ridge - Complete Story Arc',
        category: 'Character Background',
        description: 'Ridge complete story and background',
        content: ridgeContent,
        characters: JSON.stringify(['Ridge'])
      }
    });
    console.log("Created storyline: Ridge - Complete Story Arc");
  }

  // Update Chris (likely Chris Donnelly)
  if (chrisContent) {
    const chris = await prisma.character.findFirst({
      where: {
        OR: [
          { firstName: 'Chris' },
          { name: { contains: 'Chris' } }
        ],
        projectId: project.id
      }
    });
    if (chris) {
      await prisma.character.update({
        where: { id: chris.id },
        data: {
          background: `${chris.background || ''}\n\n--- FROM SOURCE DOCUMENTS ---\n\n${chrisContent.substring(0, 8000)}`,
          sourceFiles: 'Chris background expnasion.docx'
        }
      });
      console.log(`Updated: ${chris.name} character with background from source docs`);
    }

    // Create Chris storyline
    const existingChrisStory = await prisma.storyline.findFirst({
      where: { title: 'Chris - Background Story', projectId: project.id }
    });
    if (!existingChrisStory) {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          title: 'Chris - Background Story',
          category: 'Character Background',
          description: 'Chris complete background and story',
          content: chrisContent,
          characters: JSON.stringify(['Chris'])
        }
      });
      console.log("Created storyline: Chris - Background Story");
    }
  }

  // Update Hawk
  if (hawkContent) {
    const hawk = await prisma.character.findFirst({
      where: { firstName: 'Hawk', projectId: project.id }
    });
    if (hawk) {
      await prisma.character.update({
        where: { id: hawk.id },
        data: {
          background: `${hawk.background || ''}\n\n--- FROM SOURCE DOCUMENTS ---\n\n${hawkContent.substring(0, 8000)}`,
          sourceFiles: 'Hawk character background.docx, Addie and Hawk family growth.docx, Addie and Hawk\'s Journey.docx'
        }
      });
      console.log("Updated: Hawk character with background from source docs");
    }

    // Create Hawk storylines
    const hawkStorylines = [
      {
        title: 'Hawk - Character Background',
        category: 'Character Background',
        description: 'Hawk complete character background',
        content: parsedCharacterContent.find(p => p.name === 'Hawk Character Background')?.content || ''
      },
      {
        title: 'Addie and Hawk - Family Growth',
        category: 'Relationship',
        description: 'The growth of Addie and Hawk family',
        content: parsedCharacterContent.find(p => p.name === 'Addie and Hawk Family Growth')?.content || ''
      },
      {
        title: 'Addie and Hawk - The Journey',
        category: 'Relationship',
        description: 'Addie and Hawk relationship journey',
        content: parsedCharacterContent.find(p => p.name === 'Addie and Hawk Journey')?.content || ''
      }
    ];

    for (const storyline of hawkStorylines) {
      if (!storyline.content) continue;

      const existing = await prisma.storyline.findFirst({
        where: { title: storyline.title, projectId: project.id }
      });

      if (!existing) {
        await prisma.storyline.create({
          data: {
            projectId: project.id,
            ...storyline,
            characters: JSON.stringify(['Hawk', 'Addison "Addie"'])
          }
        });
        console.log(`Created storyline: ${storyline.title}`);
      } else {
        await prisma.storyline.update({
          where: { id: existing.id },
          data: storyline
        });
        console.log(`Updated storyline: ${storyline.title}`);
      }
    }
  }

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();
  const orgCount = await prisma.organization.count();

  console.log(`\n=== REMAINING DOCS INGEST COMPLETE ===`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total storylines: ${storylineCount}`);
  console.log(`Total organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
