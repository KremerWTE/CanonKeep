import * as mammoth from 'mammoth';
import * as fs from 'fs';
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

// Character/series keywords to search for
const seriesKeywords: Record<string, string[]> = {
  'Addie': ['Addie', 'Addison', 'POH', 'Palace of Honor', 'Patroness'],
  'Bella': ['Bella', 'Isabella', 'My Fair Lady', 'Matt'],
  'Harper': ['Harper', 'Miami', 'COO'],
  'Selene': ['Selene', 'throuple', 'undercover'],
  'Hawk': ['Hawk', 'operators', 'Tier 1'],
  'Kendra': ['Kendra', 'CrossFit', 'analyst', 'maternity'],
  'Ridge': ['Ridge', 'sports security'],
  'Chris': ['Chris', 'Kendra\'s husband'],
  'Evie': ['Evie', 'Sofia'],
  'Elena': ['Elena', 'Maision Aurelia'],
  'Grace': ['Grace', 'daughter'],
};

async function main() {
  const ingestDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\ingest';

  console.log("=== Extracting Universe Storylines from Main Chats ===\n");

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // Load the main chat documents
  console.log("Loading Chat 1...");
  const chat1 = fs.existsSync('chat1_extracted.txt')
    ? fs.readFileSync('chat1_extracted.txt', 'utf-8')
    : await extractDocx(`${ingestDir}\\Chat 1.docx`);

  console.log("Loading Second Chat...");
  const secondChat = await extractDocx(`${ingestDir}\\second chat.docx`);

  console.log("Loading Love Option Book 4...");
  const loveOption4 = fs.existsSync('love_option_4_extracted.txt')
    ? fs.readFileSync('love_option_4_extracted.txt', 'utf-8')
    : await extractDocx(`${ingestDir}\\Love Option Book 4.docx`);

  const allContent = chat1 + '\n\n' + secondChat + '\n\n' + loveOption4;
  console.log(`Total content: ${allContent.length} characters\n`);

  // Find storyline patterns for each series
  const storylinePatterns = [
    /Here's (?:a |the )?(?:storyline|arc|outline|scene|chapter)[:\s]+([^\n]+)/gi,
    /(?:Arc|Story|Scene|Chapter) \d+[:\s–-]+(.+)/gi,
    /Storyline[:\s]+(.+)/gi,
  ];

  // Extract and organize storylines by character
  const storylinesBySeries: Record<string, Set<string>> = {};

  for (const [series, keywords] of Object.entries(seriesKeywords)) {
    storylinesBySeries[series] = new Set();

    for (const keyword of keywords) {
      // Find paragraphs containing this keyword
      const regex = new RegExp(`[^.]*\\b${keyword}\\b[^.]*\\.`, 'gi');
      const matches = allContent.match(regex) || [];

      for (const match of matches) {
        // Filter for meaningful storyline content
        if (match.length > 50 && match.length < 500) {
          storylinesBySeries[series].add(match.trim());
        }
      }
    }
  }

  // Create storylines in database
  console.log("=== Creating Storylines ===\n");

  for (const [series, storylines] of Object.entries(storylinesBySeries)) {
    const uniqueStorylines = Array.from(storylines).slice(0, 20); // Limit to top 20

    if (uniqueStorylines.length === 0) continue;

    console.log(`\n--- ${series} (${uniqueStorylines.length} storylines) ---`);

    for (let i = 0; i < Math.min(5, uniqueStorylines.length); i++) {
      const content = uniqueStorylines[i];
      const title = `${series}: Scene ${i + 1}`;

      const existing = await prisma.storyline.findFirst({
        where: { projectId: project.id, title }
      });

      if (!existing) {
        await prisma.storyline.create({
          data: {
            projectId: project.id,
            title,
            description: content,
            category: series === 'Elena' || series === 'Grace' ? 'Family' : 'Character Arc',
            tags: series
          }
        });
        console.log(`  Created: ${title}`);
      }
    }
  }

  // Also extract specific story arcs mentioned in the documents
  console.log("\n=== Extracting Named Story Arcs ===");

  // Look for "Arc X:" patterns
  const arcMatches = allContent.match(/Arc \d+[:\s–-]+[^\n]+(?:\n[^\n]+){0,3}/gi) || [];
  console.log(`Found ${arcMatches.length} named arcs`);

  for (const arc of arcMatches.slice(0, 30)) {
    const lines = arc.split('\n');
    const title = lines[0].trim();
    const desc = lines.slice(1).join(' ').trim();

    const existing = await prisma.storyline.findFirst({
      where: { projectId: project.id, title: { contains: title.substring(0, 50) } }
    });

    if (!existing && title.length > 10) {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          title: title.substring(0, 200),
          description: desc.substring(0, 2000) || title,
          category: 'Plot Arc',
          tags: 'chat_extracted'
        }
      });
      console.log(`  Created arc: ${title.substring(0, 60)}...`);
    }
  }

  const count = await prisma.storyline.count({ where: { projectId: project.id } });
  console.log(`\n=== Total Storylines: ${count} ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
