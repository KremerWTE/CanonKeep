import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  // Keywords that indicate crisis scenarios
  const crisisTerms = [
    'kidnap', 'abduct', 'hostage', 'ransom',
    'cartel', 'terrorist', 'assassination', 'blackmail',
    'extraction', 'rescue mission', 'threat',
    'bombing', 'cyber attack', 'hacked',
    'scandal', 'cover-up', 'leak',
    'trafficking', 'smuggling',
    'murder', 'killed', 'death threat',
    'infiltration', 'spy', 'mole',
    'collapse', 'disaster', 'emergency',
    'corrupt', 'bribery', 'extortion'
  ];

  console.log('=== BSS CRISIS SCENARIOS FOUND ===\n');

  const found: Set<string> = new Set();

  for (const term of crisisTerms) {
    let pos = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 300);
      const snippet = text.substring(start, end).replace(/\n/g, ' ').trim();

      // Only add if it looks like a scenario description
      if (!found.has(snippet) &&
          (snippet.includes('BSS') || snippet.includes('mission') || snippet.includes('client') ||
           snippet.includes('Jasper') || snippet.includes('fixer') || snippet.includes('team') ||
           snippet.includes('operation') || snippet.includes('crisis'))) {
        found.add(snippet);
        console.log(`[${term.toUpperCase()}]`);
        console.log(snippet);
        console.log('\n---\n');
      }
      pos += term.length;
    }
  }

  // Also search for specific crisis mentions
  console.log('\n=== DIRECT CRISIS MENTIONS ===\n');

  let pos = 0;
  while ((pos = text.toLowerCase().indexOf('crisis', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 400);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n---\n');
    pos += 6;
  }

  // Search for "case" or "job" scenarios
  console.log('\n=== CASE/JOB SCENARIOS ===\n');
  const caseTerms = ['the case', 'the job', 'the mission', 'the op', 'the operation'];
  for (const term of caseTerms) {
    pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 5) {
      const start = Math.max(0, pos - 50);
      const end = Math.min(text.length, pos + 300);
      const snippet = text.substring(start, end).replace(/\n/g, ' ').trim();
      if (snippet.includes('BSS') || snippet.includes('Jasper') || snippet.includes('client')) {
        console.log(`[${term.toUpperCase()}]`);
        console.log(snippet);
        console.log('\n---\n');
        count++;
      }
      pos += term.length;
    }
  }
}

main().catch(console.error);
