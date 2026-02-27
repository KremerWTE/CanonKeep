import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== FLASHBACK SCENES & BACKSTORY ===\n');

  // Search for flashback
  let pos = 0;
  while ((pos = text.toLowerCase().indexOf('flashback', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 800);
    console.log('--- FLASHBACK ---');
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n');
    pos += 9;
  }

  // Search for "backstory"
  console.log('\n=== BACKSTORY MENTIONS ===\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('backstory', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 600);
    console.log('--- BACKSTORY ---');
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n');
    pos += 9;
  }

  // Search for "memory" or "memories" or "remembered"
  console.log('\n=== MEMORY/PAST SCENES ===\n');
  const memoryTerms = ['memory', 'memories', 'remembered', 'years ago', 'back then', 'before BSS', 'first met'];
  for (const term of memoryTerms) {
    pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 5) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
      // Only show if it seems like story content
      if (context.includes('Addie') || context.includes('Jasper') || context.includes('Hawk') ||
          context.includes('Elena') || context.includes('Kendra') || context.includes('BSS')) {
        console.log(`--- ${term.toUpperCase()} ---`);
        console.log(context.replace(/\n/g, ' ').trim());
        console.log('\n');
        count++;
      }
      pos += term.length;
    }
  }

  // Search for prequel content
  console.log('\n=== PREQUEL CONTENT ===\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('prequel', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 500);
    console.log('--- PREQUEL ---');
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n');
    pos += 7;
  }

  // Search for origin story content
  console.log('\n=== ORIGIN/TRANSFORMATION STORIES ===\n');
  const originTerms = ['origin', 'transformation', 'became', 'turned into', 'evolved', 'journey from'];
  for (const term of originTerms) {
    pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 3) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
      if (context.includes('Addie') || context.includes('Jasper') || context.includes('Hawk') ||
          context.includes('Elena') || context.includes('BSS')) {
        console.log(`--- ${term.toUpperCase()} ---`);
        console.log(context.replace(/\n/g, ' ').trim());
        console.log('\n');
        count++;
      }
      pos += term.length;
    }
  }
}

main().catch(console.error);
