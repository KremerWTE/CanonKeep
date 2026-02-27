import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Build Evie and Sofia Chat.docx' });
  const text = result.value;

  console.log('=== BUILD EVIE AND SOFIA CHAT.DOCX ===');
  console.log('Document length:', text.length, 'characters\n');

  // Print first part of document
  console.log('=== FIRST 10000 CHARACTERS ===\n');
  console.log(text.substring(0, 10000));

  // Search for key terms
  console.log('\n\n=== COOKING SHOW / SERIES CONTENT ===\n');
  const showTerms = ['show', 'series', 'episode', 'channel', 'youtube', 'streaming', 'TV'];
  for (const term of showTerms) {
    let pos = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 300);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('---');
      pos += term.length;
    }
  }

  // Search for Sofia
  console.log('\n\n=== SOFIA CONTENT ===\n');
  let pos = 0;
  while ((pos = text.indexOf('Sofia', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 400);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 5;
  }

  // Search for Grace's companies
  console.log('\n\n=== GRACE / COMPANIES ===\n');
  const bizTerms = ['company', 'business', 'foundation', 'brand', 'venture'];
  for (const term of bizTerms) {
    pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1 && count < 5) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 250));
      if (context.includes('Grace') || context.includes('Evie') || context.includes('Jazz')) {
        console.log(`[${term}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('---');
        count++;
      }
      pos += term.length;
    }
  }
}

main().catch(console.error);
