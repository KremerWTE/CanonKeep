import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== COMPREHENSIVE DOCUMENT EXTRACTION ===');
  console.log('Document length:', text.length, 'characters\n');

  // ========== FIND ALL CHARACTER NAMES ==========
  console.log('=== POTENTIAL NEW CHARACTERS ===\n');

  // Look for patterns like "Name:" or character introductions
  const namePatterns = [
    /Name:\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g,
    /(?:Codename|Callsign):\s*["']?(\w+)["']?/gi,
    /(?:Dr\.|Col\.|Msgr\.|Fr\.)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/g,
  ];

  const foundNames = new Set<string>();
  for (const pattern of namePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      foundNames.add(match[1]);
    }
  }
  console.log('Found names/codenames:', Array.from(foundNames).slice(0, 30).join(', '));

  // ========== FIND SCENES ==========
  console.log('\n\n=== SCENE MARKERS ===\n');
  let pos = 0;
  let sceneCount = 0;
  while ((pos = text.indexOf('Scene —', pos)) !== -1 && sceneCount < 20) {
    const end = Math.min(text.length, pos + 200);
    console.log(text.substring(pos, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 6;
    sceneCount++;
  }

  // ========== FIND VIGNETTES ==========
  console.log('\n\n=== VIGNETTES ===\n');
  pos = 0;
  let vignetteCount = 0;
  while ((pos = text.toLowerCase().indexOf('vignette', pos)) !== -1 && vignetteCount < 10) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 300);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 8;
    vignetteCount++;
  }

  // ========== FIND LOCATIONS ==========
  console.log('\n\n=== LOCATIONS MENTIONED ===\n');
  const locationPatterns = [
    /Setting:\s*([^.]+)/gi,
    /Location:\s*([^.]+)/gi,
    /compound\s*(?:in|near|outside)?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
  ];

  const locations = new Set<string>();
  for (const pattern of locationPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      locations.add(match[1].trim().substring(0, 80));
    }
  }
  console.log('Locations found:', Array.from(locations).slice(0, 20).join('\n'));

  // ========== FIND WIVES CLUB CONTENT ==========
  console.log('\n\n=== WIVES CLUB CONTENT ===\n');
  pos = 0;
  while ((pos = text.indexOf('wives club', pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 300);
    const snippet = text.substring(start, end).replace(/\n/g, ' ').trim();
    if (snippet.includes('member') || snippet.includes('role') || snippet.includes('circle')) {
      console.log(snippet);
      console.log('---');
    }
    pos += 10;
  }

  // ========== FIND DEREK CALLAHAN CONTENT ==========
  console.log('\n\n=== DEREK CALLAHAN (Sports Fixer) ===\n');
  pos = 0;
  while ((pos = text.indexOf('Derek', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 30), Math.min(text.length, pos + 400));
    if (context.includes('Callahan') || context.includes('sports') || context.includes('MLS') ||
        context.includes('athlete') || context.includes('Boston')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 5;
  }

  // ========== FIND ETHAN CROSSWELL CONTENT ==========
  console.log('\n\n=== ETHAN CROSSWELL (Budding Fixer) ===\n');
  pos = 0;
  while ((pos = text.indexOf('Ethan', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 30), Math.min(text.length, pos + 500));
    if (context.includes('Crosswell') || context.includes('fixer') || context.includes('Conrad')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 5;
  }

  // ========== FIND JESSICA MARLOWE CONTENT ==========
  console.log('\n\n=== JESSICA MARLOWE (Mentor) ===\n');
  pos = 0;
  while ((pos = text.indexOf('Jessica', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 30), Math.min(text.length, pos + 500));
    if (context.includes('Marlowe') || context.includes('mentor') || context.includes('White House')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 7;
  }

  // ========== FIND ISABELLA/ISA CONTENT ==========
  console.log('\n\n=== ISABELLA "ISA" MARQUEZ ===\n');
  pos = 0;
  while ((pos = text.indexOf('Isabella', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 30), Math.min(text.length, pos + 500));
    console.log(context.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 8;
  }

  // ========== FIND DARIUS COLE CONTENT ==========
  console.log('\n\n=== DARIUS COLE ===\n');
  pos = 0;
  while ((pos = text.indexOf('Darius', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 30), Math.min(text.length, pos + 500));
    if (context.includes('Cole') || context.includes('Echo') || context.includes('Delta')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 6;
  }

  // ========== FIND KIDS CONTENT ==========
  console.log('\n\n=== CHILDREN/KIDS ===\n');
  const kidNames = ['Grace', 'Lucas', 'Clara', 'Gabriel', 'Gabe'];
  for (const name of kidNames) {
    pos = 0;
    let count = 0;
    while ((pos = text.indexOf(name, pos)) !== -1 && count < 3) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 200));
      if (context.includes('Elena') || context.includes('Evelyn') || context.includes('Barrett') ||
          context.includes('Vega') || context.includes('playdate') || context.includes('kid')) {
        console.log(`[${name}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('---');
        count++;
      }
      pos += name.length;
    }
  }

  // ========== FIND SARA (ELENA'S SISTER) ==========
  console.log('\n\n=== SARA (ELENA\'S SISTER) ===\n');
  pos = 0;
  while ((pos = text.indexOf('Sara', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
    if (context.includes('Elena') || context.includes('sister') || context.includes('wives')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 4;
  }
}

main().catch(console.error);
