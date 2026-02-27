import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  console.log('=== FULL CHARACTERS.DOCX CONTENT ===\n');

  // Search for Evie content
  console.log('--- EVIE CONTENT ---\n');
  let pos = 0;
  while ((pos = text.indexOf('Evie', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 800);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n---\n');
    pos += 4;
  }

  // Search for cooking content
  console.log('\n--- COOKING/CHEF CONTENT ---\n');
  const cookingTerms = ['cooking', 'chef', 'recipe', 'kitchen', 'culinary', 'food', 'restaurant'];
  for (const term of cookingTerms) {
    pos = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 500);
      const context = text.substring(start, end).replace(/\n/g, ' ').trim();
      if (!context.includes('already printed')) {
        console.log(`[${term}] ${context}`);
        console.log('\n---\n');
      }
      pos += term.length;
    }
  }

  // Search for Sofia content
  console.log('\n--- SOFIA CONTENT ---\n');
  pos = 0;
  while ((pos = text.indexOf('Sofia', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 600);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n---\n');
    pos += 5;
  }

  // Search for Special Olympics content
  console.log('\n--- SPECIAL OLYMPICS / BELLA ---\n');
  const specialTerms = ['Special Olympics', 'Bella', 'swimming', 'athlete', 'disability', 'Down syndrome'];
  for (const term of specialTerms) {
    pos = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 600);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('\n---\n');
      pos += term.length;
    }
  }

  // Search for Grace content
  console.log('\n--- GRACE / COMPANIES ---\n');
  pos = 0;
  while ((pos = text.indexOf('Grace', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 500);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n---\n');
    pos += 5;
  }

  // Search for series/show content
  console.log('\n--- SERIES / SHOW / YOUTUBE ---\n');
  const seriesTerms = ['series', 'show', 'YouTube', 'channel', 'episode', 'program'];
  for (const term of seriesTerms) {
    pos = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 500);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('\n---\n');
      pos += term.length;
    }
  }
}

main().catch(console.error);
