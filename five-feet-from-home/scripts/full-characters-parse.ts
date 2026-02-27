import * as mammoth from 'mammoth';
import * as fs from 'fs';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  // Save full text for reference
  fs.writeFileSync('characters-full-text.txt', text);
  console.log('Saved full text to characters-full-text.txt\n');

  console.log('=== FULL CHARACTERS.DOCX ANALYSIS ===\n');
  console.log(`Total length: ${text.length} characters\n`);

  // Extract all character names mentioned
  console.log('--- ALL CHARACTER MENTIONS ---\n');
  const characterPatterns = [
    /(?:^|\s)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:is|was|has|had|says|said|looks|looked|walks|walked)/g,
    /(?:Character|Name|Full Name):\s*([A-Z][a-zA-Z\s"']+)/g,
  ];

  // Search for specific character-related sections
  const sections = [
    'Character Bio',
    'Full Name',
    'Background',
    'Personality',
    'Appearance',
    'Relationships',
    'Arc',
    'Role in Story',
    'Modeled After',
    'Archetype',
    'Scene',
    'Vignette',
    'Timeline',
    'Flashback'
  ];

  for (const section of sections) {
    let count = 0;
    let pos = 0;
    while ((pos = text.indexOf(section, pos)) !== -1) {
      count++;
      pos += section.length;
    }
    if (count > 0) {
      console.log(`${section}: ${count} occurrences`);
    }
  }

  // Extract all scenes/vignettes
  console.log('\n--- SCENES AND VIGNETTES ---\n');
  const sceneMatches = text.match(/(?:Scene|Vignette|🟤\s*Scene)[^]*?(?=(?:Scene|Vignette|🟤|Character Bio|$))/gi);
  if (sceneMatches) {
    console.log(`Found ${sceneMatches.length} scenes/vignettes\n`);
  }

  // Extract relationship mentions
  console.log('\n--- RELATIONSHIP PATTERNS ---\n');
  const relationshipTerms = ['sister', 'brother', 'mother', 'father', 'daughter', 'son', 'wife', 'husband',
                            'mentor', 'mentee', 'friend', 'rival', 'ally', 'enemy', 'coach', 'student',
                            'partner', 'lover', 'ex', 'fiancé', 'aunt', 'uncle', 'cousin', 'niece', 'nephew'];

  for (const term of relationshipTerms) {
    let count = 0;
    let pos = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1) {
      count++;
      pos += term.length;
    }
    if (count > 2) {
      console.log(`${term}: ${count} mentions`);
    }
  }

  // Extract timeline references
  console.log('\n--- TIMELINE REFERENCES ---\n');
  const timelineTerms = ['years ago', 'months later', 'weeks before', 'first met', 'Georgetown',
                        'college', 'wedding', 'engagement', 'pregnant', 'born', 'childhood',
                        'flashback', 'origin', 'before BSS', 'after BSS', 'Year 1', 'Year 2'];

  for (const term of timelineTerms) {
    let pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
      count++;
      pos += term.length;
    }
    if (count > 0) {
      console.log(`"${term}": ${count} mentions`);
    }
  }

  // Extract all named characters by looking for patterns
  console.log('\n--- EXTRACTING CHARACTER BIOS ---\n');

  // Look for "Character Bio:" sections
  let bioPos = 0;
  const bios: string[] = [];
  while ((bioPos = text.indexOf('Character Bio:', bioPos)) !== -1) {
    const end = Math.min(text.length, bioPos + 2000);
    const bioText = text.substring(bioPos, end);
    const nameMatch = bioText.match(/(?:Full Name|Name):\s*([^\n]+)/);
    if (nameMatch) {
      bios.push(nameMatch[1].trim());
    }
    bioPos += 14;
  }

  console.log(`Found ${bios.length} character bios:`);
  bios.forEach(b => console.log(`  - ${b}`));

  // Look for "modeled after" sections
  console.log('\n--- MODELED AFTER REFERENCES ---\n');
  let modelPos = 0;
  while ((modelPos = text.toLowerCase().indexOf('modeled after', modelPos)) !== -1) {
    const start = Math.max(0, modelPos - 50);
    const end = Math.min(text.length, modelPos + 150);
    const context = text.substring(start, end).replace(/\n/g, ' ').trim();
    console.log(context);
    console.log('---');
    modelPos += 13;
  }

  // Look for organizations/companies
  console.log('\n--- ORGANIZATIONS MENTIONED ---\n');
  const orgTerms = ['BSS', 'Palace of Honor', 'POH', 'Maison Aurelia', 'Foundation', 'Company', 'LLC', 'Inc'];
  for (const term of orgTerms) {
    let count = 0;
    let pos = 0;
    while ((pos = text.indexOf(term, pos)) !== -1) {
      count++;
      pos += term.length;
    }
    if (count > 0) {
      console.log(`${term}: ${count} mentions`);
    }
  }

  // Look for location references
  console.log('\n--- LOCATIONS MENTIONED ---\n');
  const locations = ['Charlotte', 'Boston', 'D.C.', 'Washington', 'Madrid', 'Paris', 'Georgetown',
                    'Blue Ridge', 'compound', 'estate', 'gym', 'school', 'academy', 'pool', 'Brazil'];
  for (const loc of locations) {
    let count = 0;
    let pos = 0;
    while ((pos = text.indexOf(loc, pos)) !== -1) {
      count++;
      pos += loc.length;
    }
    if (count > 0) {
      console.log(`${loc}: ${count} mentions`);
    }
  }

  // Extract any remaining character names we might have missed
  console.log('\n--- POTENTIAL NEW CHARACTERS ---\n');
  const namePattern = /(?:^|\n)([A-Z][a-z]+(?:\s+"[^"]+")?\s+[A-Z][a-z]+)\s*[—–-]/g;
  let match;
  const potentialNames = new Set<string>();
  while ((match = namePattern.exec(text)) !== null) {
    potentialNames.add(match[1].trim());
  }

  if (potentialNames.size > 0) {
    console.log('Potential character names found:');
    potentialNames.forEach(n => console.log(`  - ${n}`));
  }

  // Look for Matt mentions (new character?)
  console.log('\n--- MATT MENTIONS ---\n');
  let mattPos = 0;
  let mattCount = 0;
  while ((mattPos = text.indexOf('Matt', mattPos)) !== -1) {
    if (mattCount < 5) {
      const start = Math.max(0, mattPos - 100);
      const end = Math.min(text.length, mattPos + 300);
      console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
      console.log('---');
    }
    mattCount++;
    mattPos += 4;
  }
  console.log(`Total Matt mentions: ${mattCount}`);

  // Look for Mandy mentions
  console.log('\n--- MANDY MENTIONS ---\n');
  let mandyPos = 0;
  let mandyCount = 0;
  while ((mandyPos = text.indexOf('Mandy', mandyPos)) !== -1) {
    if (mandyCount < 5) {
      const start = Math.max(0, mandyPos - 100);
      const end = Math.min(text.length, mandyPos + 300);
      console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
      console.log('---');
    }
    mandyCount++;
    mandyPos += 5;
  }
  console.log(`Total Mandy mentions: ${mandyCount}`);

  // Look for any wedding/engagement storylines
  console.log('\n--- WEDDING/ENGAGEMENT STORYLINES ---\n');
  let weddingPos = 0;
  while ((weddingPos = text.toLowerCase().indexOf('wedding', weddingPos)) !== -1) {
    const start = Math.max(0, weddingPos - 100);
    const end = Math.min(text.length, weddingPos + 400);
    const context = text.substring(start, end).replace(/\n/g, ' ').trim();
    if (!context.includes('already logged')) {
      console.log(context.substring(0, 450));
      console.log('---');
    }
    weddingPos += 7;
  }
}

main().catch(console.error);
