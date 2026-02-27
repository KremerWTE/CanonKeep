import * as mammoth from 'mammoth';

async function main() {
  const docs = [
    'Characters_Source/Hawk character background.docx',
    'Characters_Source/Addie and Hawk family growth.docx',
    'Characters_Source/Addie and Hawk\'s Journey.docx',
    'Characters_Source/Addie\'s Power dynamic.docx',
    'Characters_Source/Continue love story thread.docx',
    'Characters_Source/Love Triangle Storyline.docx',
  ];

  for (const docPath of docs) {
    try {
      const result = await mammoth.extractRawText({ path: docPath });
      const text = result.value;

      console.log(`\n${'='.repeat(60)}`);
      console.log(`DOCUMENT: ${docPath}`);
      console.log(`Length: ${text.length} characters`);
      console.log(`${'='.repeat(60)}\n`);

      // First 2500 chars
      console.log('--- FIRST 2500 CHARS ---\n');
      console.log(text.substring(0, 2500).replace(/\n{3,}/g, '\n\n'));

      // Key character mentions
      console.log('\n--- KEY MENTIONS ---\n');
      const chars = ['Hawk', 'Addie', 'Cole', 'Elena', 'Jasper', 'Kendra', 'Grace'];
      for (const char of chars) {
        const count = (text.match(new RegExp(char, 'g')) || []).length;
        if (count > 0) console.log(`${char}: ${count} mentions`);
      }

      // Relationship content
      console.log('\n--- RELATIONSHIP CONTENT ---');
      const relationTerms = ['marry', 'wedding', 'love', 'proposal', 'baby', 'pregnant', 'family'];
      for (const term of relationTerms) {
        let pos = text.toLowerCase().indexOf(term);
        if (pos !== -1) {
          const ctx = text.substring(Math.max(0, pos - 80), Math.min(text.length, pos + 200));
          console.log(`\n[${term}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 250)}`);
        }
      }

    } catch (e) {
      console.log(`\nError reading ${docPath}: ${e}`);
    }
  }
}

main().catch(console.error);
