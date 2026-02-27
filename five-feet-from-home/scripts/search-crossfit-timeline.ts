import * as mammoth from 'mammoth';

const docs = [
  'Kebdra Maternity leave outline.docx',
  'Characters_Source/Kebdra Maternity leave outline.docx',
  'Character Bio.docx',
  'Characters.docx',
  'Five Feet From Home/Chat 1.docx',
  'Characters_Source/Love Option Book 4.docx',
];

async function parseDoc(path: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  } catch {
    return '';
  }
}

async function main() {
  console.log('=== SEARCHING FOR CROSSFIT TIMELINE INFO ===\n');

  for (const docPath of docs) {
    const text = await parseDoc(docPath);
    if (!text) continue;

    // Search for CrossFit related content
    const cfTerms = ['crossfit', 'cf games', 'games finals', 'kendra', 'fitness', 'athlete'];
    let foundContent = false;

    for (const term of cfTerms) {
      const regex = new RegExp(term, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        const start = Math.max(0, match.index - 200);
        const end = Math.min(text.length, match.index + 500);
        const context = text.substring(start, end).replace(/\n{3,}/g, '\n').trim();

        if (!foundContent) {
          console.log(`\n${'='.repeat(60)}`);
          console.log(`DOCUMENT: ${docPath}`);
          console.log(`${'='.repeat(60)}`);
          foundContent = true;
        }

        console.log(`\n[${term}] ...${context}...\n`);
        break; // Just first match per term
      }
    }
  }
}

main().catch(console.error);
