import * as mammoth from 'mammoth';

async function main() {
  const docs = [
    'Characters_Source/Love Triangle Storyline.docx',
    'Characters_Source/Continue love story thread.docx',
    'Characters_Source/Love Option Book 4.docx',
    'Wives Club Characters Development.docx'
  ];

  for (const docPath of docs) {
    try {
      const result = await mammoth.extractRawText({ path: docPath });
      const text = result.value;

      console.log(`\n=== ${docPath} ===\n`);

      // Search for Mandy's new boyfriend after Bella/Matt
      let pos = 0;
      while ((pos = text.indexOf('Mandy', pos)) !== -1) {
        const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 600));
        if (ctx.toLowerCase().includes('boyfriend') || ctx.toLowerCase().includes('new guy') ||
            ctx.toLowerCase().includes('her own') || ctx.toLowerCase().includes('starts dating') ||
            ctx.toLowerCase().includes('finds love') || ctx.toLowerCase().includes('meets someone')) {
          console.log('[MANDY] ' + ctx.replace(/\n/g, ' ').trim().substring(0, 550));
          console.log('---');
        }
        pos += 5;
      }

      // Search for Matt's son
      pos = 0;
      while ((pos = text.indexOf('Matt', pos)) !== -1) {
        const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 600));
        if (ctx.toLowerCase().includes(' son') || ctx.toLowerCase().includes('his boy') ||
            ctx.toLowerCase().includes("matt's kid") || ctx.toLowerCase().includes('father') ||
            ctx.toLowerCase().includes('baby') || ctx.toLowerCase().includes('pregnant')) {
          console.log('[MATT] ' + ctx.replace(/\n/g, ' ').trim().substring(0, 550));
          console.log('---');
        }
        pos += 4;
      }
    } catch (e) {
      console.log(`Error reading ${docPath}`);
    }
  }
}

main().catch(console.error);
