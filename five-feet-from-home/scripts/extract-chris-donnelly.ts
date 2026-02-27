import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== CHRIS DONNELLY STORY & DETAILS ===\n');

  // Find all mentions of Chris Donnelly
  let pos = 0;
  const snippets: string[] = [];

  // Search for "Chris Donnelly"
  while ((pos = text.indexOf('Chris Donnelly', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 500);
    const snippet = text.substring(start, end);
    if (!snippets.some(s => s.includes(snippet.substring(100, 200)))) {
      snippets.push(snippet);
    }
    pos += 14;
  }

  // Also search for just "Chris" in relevant contexts (near Kendra, Notre Dame, etc.)
  pos = 0;
  while ((pos = text.indexOf('Chris', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 300));
    if ((context.includes('Kendra') || context.includes('Notre Dame') || context.includes('Donnelly') ||
         context.includes('Msgr') || context.includes('Catholic') || context.includes('Boston')) &&
        !snippets.some(s => s.includes(context.substring(50, 150)))) {
      snippets.push(text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 400)));
    }
    pos += 5;
  }

  // Print unique snippets
  snippets.forEach((s, i) => {
    console.log(`--- Snippet ${i + 1} ---`);
    console.log(s.replace(/\n/g, ' ').trim());
    console.log('\n');
  });

  console.log(`\nTotal snippets found: ${snippets.length}`);

  // Also search for Kendra content
  console.log('\n\n=== KENDRA & CHRIS RELATIONSHIP ===\n');
  pos = 0;
  while ((pos = text.indexOf('Kendra', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 300));
    if (context.includes('Chris') || context.includes('husband') || context.includes('marriage') || context.includes('wedding')) {
      console.log('---');
      console.log(text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 400)).replace(/\n/g, ' ').trim());
      console.log('\n');
    }
    pos += 6;
  }
}

main().catch(console.error);
