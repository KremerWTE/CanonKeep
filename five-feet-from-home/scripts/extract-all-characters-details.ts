import * as mammoth from 'mammoth';
import * as fs from 'fs';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  console.log('=== EXTRACTING ALL CHARACTERS FROM CHARACTERS.DOCX ===\n');

  // Character name patterns to search for
  const knownCharacters = [
    'Evie', 'Evelyn', 'Sofia', 'Bella', 'Mandy', 'Matt', 'Cole', 'Hawk', 'Addie',
    'Elena', 'Jasper', 'Grace', 'Kendra', 'Chris', 'Marcus', 'Evelyn Cross',
    'Jazz', 'Jasmine', 'Claire', 'Sara', 'Maggie', 'Harper', 'Riley', 'Lottie',
    'Alex', 'Colt', 'Lena', 'Victoria', 'Cardinal', 'Monsignor', 'Father',
    'Colton', 'Jordan', 'Cassie', 'Abby', 'Jen', 'Raine', 'Lorain', 'Lila',
    'Serena', 'Isabella', 'Derek', 'Ethan', 'Jessica', 'Darius', 'Charlotte',
    'Dr. Nate', 'Dr. Adrian', 'Jamal', 'Ryan', 'Nate Ellis', 'Ali', 'Evan',
    'Patrick', 'Mary', 'Lucas', 'Clara', 'Gabriel', 'Lucía', 'Mateo'
  ];

  // Search for each character and extract context
  const characterDetails: { [key: string]: string[] } = {};

  for (const name of knownCharacters) {
    let pos = 0;
    const contexts: string[] = [];

    while ((pos = text.indexOf(name, pos)) !== -1) {
      const start = Math.max(0, pos - 50);
      const end = Math.min(text.length, pos + 200);
      const context = text.substring(start, end).replace(/\n/g, ' ').trim();

      // Only add if it looks like character description
      if (context.includes('Background') || context.includes('Personality') ||
          context.includes('Age') || context.includes('Role') ||
          context.includes('Archetype') || context.includes('Modeled') ||
          context.includes('appearance') || context.includes('relationship')) {
        if (!contexts.some(c => c.includes(context.substring(50, 150)))) {
          contexts.push(context);
        }
      }
      pos += name.length;
    }

    if (contexts.length > 0) {
      characterDetails[name] = contexts.slice(0, 3);
    }
  }

  // Search for new character patterns
  console.log('--- NEW CHARACTER MENTIONS ---\n');

  // Look for character introduction patterns
  const introPatterns = [
    /([A-Z][a-z]+(?:\s+"[^"]+")?\s+[A-Z][a-z]+)\s*[-—–]\s*(?:The|A|An)/g,
    /(?:Meet|Introducing|Character:)\s+([A-Z][a-zA-Z\s]+)/gi,
    /([A-Z][a-z]+)\s+(?:is|was)\s+(?:a|an|the)\s+[a-z]+\s+(?:who|that|from)/g
  ];

  const newNames = new Set<string>();
  for (const pattern of introPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const name = match[1].trim();
      if (name.length > 2 && name.length < 40) {
        newNames.add(name);
      }
    }
  }

  // Search for specific character types
  console.log('\n--- OPERATORS/BSS STAFF MENTIONED ---');
  let pos = 0;
  while ((pos = text.toLowerCase().indexOf('operator', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 200));
    const nameMatch = ctx.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:is|was|the)\s+(?:an?\s+)?operator/i);
    if (nameMatch) {
      console.log(`  - ${nameMatch[1]}`);
    }
    pos += 8;
  }

  console.log('\n--- WIVES/SPOUSES MENTIONED ---');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('wife', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 150));
    console.log(ctx.replace(/\n/g, ' ').trim().substring(0, 200));
    pos += 4;
  }

  console.log('\n--- CHILDREN MENTIONED ---');
  const childTerms = ['daughter', 'son', 'child', 'kid', 'baby'];
  for (const term of childTerms) {
    pos = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1) {
      const ctx = text.substring(Math.max(0, pos - 80), Math.min(text.length, pos + 120));
      if (ctx.match(/[A-Z][a-z]+'s\s+(?:daughter|son|child)/)) {
        console.log(`  [${term}] ` + ctx.replace(/\n/g, ' ').trim().substring(0, 180));
      }
      pos += term.length;
    }
  }

  console.log('\n--- MODELED AFTER REFERENCES ---');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('modeled after', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 200));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 13;
  }

  console.log('\n--- CLOTHING/GALA OUTFIT DESCRIPTIONS ---');
  const clothingTerms = ['gown', 'dress', 'tuxedo', 'wore', 'wearing', 'outfit', 'lingerie'];
  for (const term of clothingTerms) {
    pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 10) {
      const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 250));
      if (ctx.match(/[A-Z][a-z]+/) && (ctx.toLowerCase().includes('gala') ||
          ctx.toLowerCase().includes('event') || ctx.toLowerCase().includes('wear'))) {
        console.log(`[${term}] ` + ctx.replace(/\n/g, ' ').trim().substring(0, 300));
        console.log('---');
        count++;
      }
      pos += term.length;
    }
  }

  // Save extracted data
  const output = {
    totalLength: text.length,
    charactersFound: Object.keys(characterDetails).length,
    newNamesFound: Array.from(newNames),
    characterDetails: characterDetails
  };

  fs.writeFileSync('extracted-characters.json', JSON.stringify(output, null, 2));
  console.log('\n\nSaved extracted data to extracted-characters.json');
}

main().catch(console.error);
