import * as mammoth from 'mammoth';
import * as fs from 'fs';

interface ExtractedData {
  characters: any[];
  storylines: any[];
  relationships: any[];
  scenes: any[];
  timeline: any[];
}

async function parseDocument(path: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  } catch (e) {
    console.log(`Error reading ${path}: ${e}`);
    return '';
  }
}

async function extractCharacterBios(text: string): Promise<any[]> {
  const characters: any[] = [];

  // Pattern for character introductions
  const bioPatterns = [
    /(?:Character Bio|Character Profile|Full Name):\s*([A-Z][a-zA-Z\s"']+?)(?:\n|Age:|Background:)/gi,
    /([A-Z][a-z]+(?:\s+"[^"]+")?\s+[A-Z][a-z]+)\s*[-—–]\s*(?:Age|The|A)/gi,
    /([A-Z][a-z]+)\s+\((?:nickname|callsign|goes by)[:\s]+([^)]+)\)/gi,
  ];

  // Extract character names and their contexts
  const namePattern = /(?:^|\n)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[-:—]/gm;
  let match;

  while ((match = namePattern.exec(text)) !== null) {
    const name = match[1].trim();
    if (name.length > 2 && name.length < 30) {
      const contextStart = Math.max(0, match.index - 50);
      const contextEnd = Math.min(text.length, match.index + 500);
      const context = text.substring(contextStart, contextEnd);

      // Check if this looks like a character definition
      if (context.match(/age|background|personality|role|occupation|archetype/i)) {
        characters.push({
          name,
          context: context.replace(/\n/g, ' ').trim()
        });
      }
    }
  }

  return characters;
}

async function extractScenes(text: string): Promise<any[]> {
  const scenes: any[] = [];

  // Find scene markers
  const scenePattern = /(?:Scene|SCENE)\s*[-—:]\s*([^\n]+)/gi;
  let match;

  while ((match = scenePattern.exec(text)) !== null) {
    const title = match[1].trim();
    const contentStart = match.index;
    const contentEnd = Math.min(text.length, match.index + 1500);
    const content = text.substring(contentStart, contentEnd);

    scenes.push({
      title,
      content: content.replace(/\n/g, ' ').trim().substring(0, 1200)
    });
  }

  return scenes;
}

async function extractChapters(text: string): Promise<any[]> {
  const chapters: any[] = [];

  const chapterPattern = /Chapter\s+(\d+)[\s:-]+([^\n]+)/gi;
  let match;

  while ((match = chapterPattern.exec(text)) !== null) {
    const num = match[1];
    const title = match[2].trim();
    const contentStart = match.index;
    const contentEnd = Math.min(text.length, match.index + 800);
    const content = text.substring(contentStart, contentEnd);

    chapters.push({
      number: parseInt(num),
      title,
      synopsis: content.replace(/\n/g, ' ').trim().substring(0, 600)
    });
  }

  return chapters;
}

async function extractRelationships(text: string): Promise<any[]> {
  const relationships: any[] = [];

  // Patterns for relationships
  const patterns = [
    /([A-Z][a-z]+)\s+(?:and|&)\s+([A-Z][a-z]+)\s*[-—:]\s*([^\n]+)/gi,
    /([A-Z][a-z]+)'s\s+(?:wife|husband|boyfriend|girlfriend|partner|love interest)\s*[:—-]\s*([^\n]+)/gi,
    /(?:relationship|romance|love)\s+(?:with|between)\s+([A-Z][a-z]+)\s+(?:and|&)\s+([A-Z][a-z]+)/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      relationships.push({
        char1: match[1],
        char2: match[2] || '',
        description: match[3] || match[0],
        context: text.substring(Math.max(0, match.index - 50), Math.min(text.length, match.index + 200)).replace(/\n/g, ' ').trim()
      });
    }
  }

  return relationships;
}

async function main() {
  console.log('=== COMPREHENSIVE DOCUMENT PARSING ===\n');

  const documents = [
    { name: 'Chat 1', path: 'Five Feet From Home/Chat 1.docx' },
    { name: 'Love Option Book 4', path: 'Characters_Source/Love Option Book 4.docx' },
    { name: 'Characters', path: 'Characters.docx' },
    { name: 'Cam Star Build', path: 'Characters_Source/Cam Star Build.docx' },
  ];

  const allData: any = {
    characters: [],
    scenes: [],
    chapters: [],
    relationships: [],
    rawExtracts: {}
  };

  for (const doc of documents) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`PARSING: ${doc.name}`);
    console.log(`${'='.repeat(60)}\n`);

    const text = await parseDocument(doc.path);
    if (!text) continue;

    console.log(`Document length: ${text.length} characters`);

    // Store raw extracts for specific searches
    allData.rawExtracts[doc.name] = text;

    // Extract characters
    const chars = await extractCharacterBios(text);
    console.log(`Found ${chars.length} character mentions`);
    allData.characters.push(...chars.map(c => ({ ...c, source: doc.name })));

    // Extract scenes
    const scenes = await extractScenes(text);
    console.log(`Found ${scenes.length} scenes`);
    allData.scenes.push(...scenes.map(s => ({ ...s, source: doc.name })));

    // Extract chapters
    const chapters = await extractChapters(text);
    console.log(`Found ${chapters.length} chapters`);
    allData.chapters.push(...chapters.map(c => ({ ...c, source: doc.name })));

    // Extract relationships
    const rels = await extractRelationships(text);
    console.log(`Found ${rels.length} relationship mentions`);
    allData.relationships.push(...rels.map(r => ({ ...r, source: doc.name })));

    // Specific extractions based on document
    if (doc.name === 'Chat 1') {
      // Extract main story arcs
      console.log('\n--- MAIN STORY STRUCTURE ---');
      const parts = text.match(/Part\s+\d+[^]*?(?=Part\s+\d+|$)/gi) || [];
      console.log(`Found ${parts.length} parts`);

      // Extract character intros
      const mainChars = ['Jasper', 'Elena', 'Grace', 'Addie', 'Hawk', 'Harper', 'Kendra', 'Cole', 'Bella', 'Mandy'];
      for (const char of mainChars) {
        const firstMention = text.indexOf(char);
        if (firstMention !== -1) {
          const ctx = text.substring(firstMention, Math.min(text.length, firstMention + 300));
          console.log(`\n[${char}] First appearance: ${ctx.replace(/\n/g, ' ').substring(0, 200)}...`);
        }
      }
    }

    if (doc.name === 'Cam Star Build') {
      console.log('\n--- CAM STAR SPECIFIC CONTENT ---');
      // Extract Cam-related content
      let pos = 0;
      let count = 0;
      while ((pos = text.indexOf('Cam', pos)) !== -1 && count < 10) {
        const ctx = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 300));
        console.log(`\n[Cam] ${ctx.replace(/\n/g, ' ').trim().substring(0, 280)}`);
        pos += 3;
        count++;
      }
    }
  }

  // Save extracted data
  fs.writeFileSync('comprehensive-extracted-data.json', JSON.stringify(allData, null, 2));
  console.log('\n\nSaved comprehensive data to comprehensive-extracted-data.json');

  // Summary
  console.log('\n=== EXTRACTION SUMMARY ===');
  console.log(`Total characters found: ${allData.characters.length}`);
  console.log(`Total scenes found: ${allData.scenes.length}`);
  console.log(`Total chapters found: ${allData.chapters.length}`);
  console.log(`Total relationships found: ${allData.relationships.length}`);
}

main().catch(console.error);
