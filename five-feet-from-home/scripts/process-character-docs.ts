import * as mammoth from 'mammoth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function extractDocx(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    return '';
  }
}

// Character connection mapping - who references who
const characterConnections: Record<string, string[]> = {
  'Addie': ['Hawk', 'Bella', 'Kendra', 'Selene', 'Grace', 'Elena', 'Jasper'],
  'Hawk': ['Addie', 'Jasper', 'Ridge', 'Chris', 'Matt', 'Cole'],
  'Bella': ['Addie', 'Matt', 'Mandy', 'Kendra', 'Elena'],
  'Harper': ['Jasper', 'Elena', 'Addie', 'Kendra'],
  'Kendra': ['Chris', 'Addie', 'Bella', 'Elena'],
  'Selene': ['Addie', 'Hawk'],
  'Ridge': ['Hawk', 'Cole', 'Jasper'],
  'Chris': ['Kendra', 'Hawk'],
  'Evie': ['Sofia'],
  'Elena': ['Jasper', 'Grace', 'Addie', 'Harper', 'Sara'],
  'Grace': ['Jasper', 'Elena', 'Addie', 'Bella', 'Kendra'],
};

// Documents to process with their primary character
const characterDocs = [
  { file: "Addie and Hawk's Journey.docx", primary: 'Addie', category: 'Relationship Arc' },
  { file: "Addie and POH role.docx", primary: 'Addie', category: 'Character Development' },
  { file: "Addie and Hawk family growth.docx", primary: 'Addie', category: 'Family Arc' },
  { file: "Addie's Power dynamic.docx", primary: 'Addie', category: 'Character Development' },
  { file: "Vegas for Addie.docx", primary: 'Addie', category: 'Event Scene' },
  { file: "Bella's Background Pre-BSS.docx", primary: 'Bella', category: 'Backstory' },
  { file: "Bella work schedule.docx", primary: 'Bella', category: 'World Building' },
  { file: "Harper Story ideas.docx", primary: 'Harper', category: 'Plot Arc' },
  { file: "Harper COO transition story.docx", primary: 'Harper', category: 'Career Arc' },
  { file: "Hawk character background.docx", primary: 'Hawk', category: 'Backstory' },
  { file: "Selene Troubles.docx", primary: 'Selene', category: 'Character Arc' },
  { file: "Ridge story.docx", primary: 'Ridge', category: 'Character Arc' },
  { file: "Kebdra Maternity leave outline.docx", primary: 'Kendra', category: 'Life Arc' },
  { file: "Chris background expnasion.docx", primary: 'Chris', category: 'Backstory' },
  { file: "Build Evie and Sofia Chat.docx", primary: 'Evie', category: 'Character Development' },
  { file: "Izzy College Journey.docx", primary: 'Izzy', category: 'Coming of Age' },
  { file: "Spring Break Scene Florida.docx", primary: 'Group', category: 'Event Scene' },
  { file: "POH story outlines.docx", primary: 'POH', category: 'World Building' },
  { file: "Summer Camp set-up.docx", primary: 'Group', category: 'Event Scene' },
  { file: "Family Party Narrative (series closing).docx", primary: 'Family', category: 'Series Finale' },
];

async function main() {
  const ingestDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\ingest';

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Processing Character Documents ===\n");

  for (const doc of characterDocs) {
    const content = await extractDocx(`${ingestDir}\\${doc.file}`);
    if (!content || content.length < 100) {
      console.log(`Skipped: ${doc.file} (no content)`);
      continue;
    }

    console.log(`\n--- ${doc.file} (${doc.primary}) ---`);

    // Find connected characters mentioned in this document
    const mentionedCharacters: string[] = [];
    const connections = characterConnections[doc.primary] || [];

    for (const char of connections) {
      if (content.includes(char)) {
        mentionedCharacters.push(char);
      }
    }

    // Look for scene/arc patterns
    const scenes = content.match(/(?:Scene|Arc|Chapter|Day|Month|Part)\s*\d*\s*[:\s–-]+[^\n]+/gi) || [];

    // Create a main storyline for this document
    const mainTitle = `${doc.primary}: ${doc.file.replace('.docx', '')}`;

    // Generate character connection notes
    let characterNotes = '';
    if (mentionedCharacters.length > 0) {
      characterNotes = `\n\n[CHARACTER CONNECTIONS: This storyline references ${mentionedCharacters.join(', ')}. `;
      characterNotes += `Consider how these characters' arcs intersect with ${doc.primary}'s story.]`;
    }

    // Add potential expansion notes
    let expansionNotes = '';
    if (doc.category === 'Backstory') {
      expansionNotes = `\n\n[EXPANSION NOTE: This backstory could be expanded into flashback chapters or a prequel novella.]`;
    } else if (doc.category === 'Event Scene') {
      expansionNotes = `\n\n[EXPANSION NOTE: This event could feature POV chapters from multiple characters present.]`;
    } else if (doc.category === 'Relationship Arc') {
      expansionNotes = `\n\n[EXPANSION NOTE: This relationship arc spans multiple books. Track development across series.]`;
    }

    // Check if exists
    const existing = await prisma.storyline.findFirst({
      where: { projectId: project.id, title: mainTitle }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          title: mainTitle,
          category: doc.category,
          description: content.substring(0, 2000) + characterNotes + expansionNotes,
          characters: JSON.stringify(mentionedCharacters),
          tags: `${doc.primary}, ${doc.category}, source_doc`
        }
      });
      console.log(`  Created main storyline`);
      console.log(`  Connected characters: ${mentionedCharacters.join(', ') || 'none detected'}`);
    }

    // Create sub-storylines for each scene/arc found
    for (let i = 0; i < Math.min(scenes.length, 10); i++) {
      const scene = scenes[i];
      const sceneTitle = `${doc.primary}: ${scene.substring(0, 80).trim()}`;

      const sceneExists = await prisma.storyline.findFirst({
        where: { projectId: project.id, title: sceneTitle }
      });

      if (!sceneExists) {
        await prisma.storyline.create({
          data: {
            projectId: project.id,
            title: sceneTitle,
            category: 'Scene',
            description: scene,
            characters: JSON.stringify(mentionedCharacters),
            tags: `${doc.primary}, scene, ${doc.category}`
          }
        });
        console.log(`  Created scene: ${scene.substring(0, 50)}...`);
      }
    }
  }

  const count = await prisma.storyline.count({ where: { projectId: project.id } });
  console.log(`\n=== Total Storylines: ${count} ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
