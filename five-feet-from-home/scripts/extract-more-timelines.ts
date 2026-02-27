import * as mammoth from 'mammoth';

const keyDocs = [
  { name: 'Jasper and Elena Transitions', path: 'Jasper and Elena Transitions.docx' },
  { name: 'Addie and Hawk Journey', path: "Characters_Source/Addie and Hawk's Journey.docx" },
  { name: 'Addie Power Dynamic', path: "Characters_Source/Addie's Power dynamic.docx" },
  { name: 'Harper COO Transition', path: 'Characters_Source/Harper COO transition story.docx' },
  { name: 'Evie Sofia Chat', path: 'Characters_Source/Build Evie and Sofia Chat.docx' },
  { name: 'Love Triangle', path: 'Characters_Source/Love Triangle Storyline.docx' },
  { name: 'Bella Background', path: "Characters_Source/Bella's Background Pre-BSS.docx" },
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
  console.log('=== EXTRACTING MORE TIMELINES ===\n');

  for (const doc of keyDocs) {
    const text = await parseDoc(doc.path);
    if (!text) continue;

    console.log(`\n${'='.repeat(70)}`);
    console.log(`DOCUMENT: ${doc.name}`);
    console.log(`Length: ${text.length} characters`);
    console.log(`${'='.repeat(70)}\n`);

    // Print first 6000 characters
    const preview = text.substring(0, 6000).replace(/\n{4,}/g, '\n\n');
    console.log(preview);
    console.log('\n... [continues]');
  }
}

main().catch(console.error);
