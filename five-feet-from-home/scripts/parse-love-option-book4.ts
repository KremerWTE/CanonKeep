import * as mammoth from 'mammoth';

async function main() {
  console.log('=== PARSING LOVE OPTION BOOK 4.docx ===\n');

  const result = await mammoth.extractRawText({ path: 'Characters_Source/Love Option Book 4.docx' });
  const text = result.value;

  console.log(`Document length: ${text.length} characters\n`);

  // Get first 5000 characters
  console.log('--- BEGINNING (First 4000 chars) ---\n');
  console.log(text.substring(0, 4000).replace(/\n{3,}/g, '\n\n'));

  // Find relationship/romantic sections
  console.log('\n--- RELATIONSHIP/ROMANTIC SECTIONS ---\n');
  const romanticTerms = ['romance', 'love interest', 'relationship', 'dating', 'marry', 'wedding', 'proposal', 'boyfriend', 'girlfriend'];
  for (const term of romanticTerms) {
    let pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 5) {
      const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
      console.log(`[${term}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 350)}`);
      console.log('---');
      pos += term.length;
      count++;
    }
  }

  // Find character-specific content
  console.log('\n--- CHARACTER SPECIFIC CONTENT ---\n');
  const chars = ['Bella', 'Mandy', 'Matt', 'Cole', 'Evie', 'Sofia', 'Colton', 'Jordan'];
  for (const char of chars) {
    let pos = 0;
    let count = 0;
    while ((pos = text.indexOf(char, pos)) !== -1 && count < 3) {
      const ctx = text.substring(Math.max(0, pos - 80), Math.min(text.length, pos + 400));
      console.log(`[${char}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 400)}`);
      console.log('---');
      pos += char.length;
      count++;
    }
  }

  // Find physical/intimate content
  console.log('\n--- PHYSICAL/INTIMATE CONTENT ---\n');
  const intimateTerms = ['kiss', 'touch', 'night together', 'bed', 'intimate', 'first time', 'passion', 'desire'];
  for (const term of intimateTerms) {
    let pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 5) {
      const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
      console.log(`[${term}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 350)}`);
      console.log('---');
      pos += term.length;
      count++;
    }
  }

  console.log('\n=== END OF LOVE OPTION BOOK 4 PARSING ===');
}

main().catch(console.error);
