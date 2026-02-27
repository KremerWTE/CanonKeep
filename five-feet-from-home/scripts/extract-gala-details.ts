import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== GALA CLOTHING AND ACTIVITIES ===\n');

  // Search for dress/gown mentions near gala content
  const galaTerms = ['gown', 'tuxedo', 'crimson', 'navy', 'midnight blue', 'emerald', 'after-gala', 'wind-down', 'dressing room'];

  for (const term of galaTerms) {
    let pos = 0;
    console.log(`\n--- ${term.toUpperCase()} ---`);
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
      const start = Math.max(0, pos - 150);
      const end = Math.min(text.length, pos + 400);
      const context = text.substring(start, end).replace(/\n/g, ' ').trim();
      if (context.toLowerCase().includes('gala') || context.toLowerCase().includes('wives') ||
          context.toLowerCase().includes('elena') || context.toLowerCase().includes('addie')) {
        console.log(context.substring(0, 500));
        console.log('---');
      }
      pos += term.length;
    }
  }

  // Search specifically for Veterans Day Gala details
  console.log('\n\n=== VETERANS DAY GALA SPECIFIC ===');
  let vdPos = 0;
  while ((vdPos = text.indexOf('Veterans Day', vdPos)) !== -1) {
    const start = Math.max(0, vdPos - 100);
    const end = Math.min(text.length, vdPos + 600);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    vdPos += 12;
  }
}

main().catch(console.error);
