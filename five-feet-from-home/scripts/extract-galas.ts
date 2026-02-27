import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== GALA MENTIONS IN NEW CHARACTER CREATION DOC ===\n');

  // Search for gala mentions
  let pos = 0;
  const galas = new Set<string>();

  while ((pos = text.toLowerCase().indexOf('gala', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 300);
    const snippet = text.substring(start, end).replace(/\n/g, ' ').trim();

    // Only show unique snippets
    const key = snippet.substring(50, 150);
    if (!galas.has(key)) {
      galas.add(key);
      console.log(snippet);
      console.log('---');
    }
    pos += 4;
  }

  // Also check Characters.docx
  console.log('\n\n=== GALA MENTIONS IN CHARACTERS.DOCX ===\n');

  const result2 = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text2 = result2.value;

  pos = 0;
  const galas2 = new Set<string>();

  while ((pos = text2.toLowerCase().indexOf('gala', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text2.length, pos + 300);
    const snippet = text2.substring(start, end).replace(/\n/g, ' ').trim();

    const key = snippet.substring(50, 150);
    if (!galas2.has(key)) {
      galas2.add(key);
      console.log(snippet);
      console.log('---');
    }
    pos += 4;
  }

  // Look for specific gala types
  console.log('\n\n=== SPECIFIC GALA TYPES ===\n');
  const galaTypes = [
    'Veterans Day',
    'Spanish Embassy',
    'Foundation Gala',
    'Charity Gala',
    'Art Basel',
    'Museum',
    'Fundraiser',
    'Black Tie'
  ];

  for (const type of galaTypes) {
    pos = 0;
    let count = 0;
    while ((pos = text.indexOf(type, pos)) !== -1 && count < 3) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 200));
      if (context.toLowerCase().includes('gala') || context.toLowerCase().includes('event') ||
          context.toLowerCase().includes('ball')) {
        console.log(`[${type}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('---');
        count++;
      }
      pos += type.length;
    }
  }
}

main().catch(console.error);
