import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  console.log('=== CHARACTERS.DOCX EXTRACTION ===');
  console.log('Document length:', text.length, 'characters\n');

  // ========== BELLA CONTENT ==========
  console.log('\n=== BELLA CONTENT ===\n');
  let pos = 0;
  let count = 0;
  while ((pos = text.indexOf('Bella', pos)) !== -1 && count < 20) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 400);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 5;
    count++;
  }

  // ========== EVIE/COOKING CONTENT ==========
  console.log('\n=== EVIE / COOKING CONTENT ===\n');
  const evieTerms = ['Evie', 'cooking', 'chef', 'kitchen', 'recipe', 'food'];
  for (const term of evieTerms) {
    pos = 0;
    count = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1 && count < 5) {
      const start = Math.max(0, pos - 50);
      const end = Math.min(text.length, pos + 400);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('---');
      pos += term.length;
      count++;
    }
  }

  // ========== GRACE CONTENT ==========
  console.log('\n=== GRACE / COMPANIES CONTENT ===\n');
  pos = 0;
  count = 0;
  while ((pos = text.indexOf('Grace', pos)) !== -1 && count < 15) {
    const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
    if (context.includes('compan') || context.includes('business') || context.includes('Olympic') ||
        context.includes('sister') || context.includes('Down') || context.includes('special')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 5;
    count++;
  }

  // ========== SPECIAL OLYMPICS CONTENT ==========
  console.log('\n=== SPECIAL OLYMPICS CONTENT ===\n');
  const olympicTerms = ['Special Olympics', 'Down syndrome', 'Down Syndrome', 'disabilities'];
  for (const term of olympicTerms) {
    pos = 0;
    while ((pos = text.indexOf(term, pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 500);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('---');
      pos += term.length;
    }
  }

  // ========== SERIES/BOOKS CONTENT ==========
  console.log('\n=== SERIES / BOOKS CONTENT ===\n');
  const seriesTerms = ['series', 'book', 'spin-off', 'spinoff', 'prequel', 'sequel'];
  for (const term of seriesTerms) {
    pos = 0;
    count = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1 && count < 10) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 300));
      if (context.includes('Bella') || context.includes('Evie') || context.includes('Grace') ||
          context.includes('Addie') || context.includes('cooking')) {
        console.log(`[${term}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('---');
        count++;
      }
      pos += term.length;
    }
  }

  // ========== COMPANIES CONTENT ==========
  console.log('\n=== COMPANIES / BUSINESSES ===\n');
  const bizTerms = ['company', 'companies', 'business', 'venture', 'startup', 'foundation', 'brand'];
  for (const term of bizTerms) {
    pos = 0;
    count = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1 && count < 10) {
      const start = Math.max(0, pos - 50);
      const end = Math.min(text.length, pos + 300);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('---');
      pos += term.length;
      count++;
    }
  }
}

main().catch(console.error);
