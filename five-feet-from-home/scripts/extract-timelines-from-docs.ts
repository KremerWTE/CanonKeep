import * as mammoth from 'mammoth';

// Key documents to extract timeline information from
const keyDocs = [
  { name: 'Chat 1 (Main Story)', path: 'Five Feet From Home/Chat 1.docx' },
  { name: 'Love Option Book 4', path: 'Characters_Source/Love Option Book 4.docx' },
  { name: 'Characters', path: 'Characters.docx' },
  { name: 'Character Bio', path: 'Character Bio.docx' },
  { name: 'Jasper and Elena Transitions', path: 'Jasper and Elena Transitions.docx' },
  { name: 'Addie and Hawk Journey', path: "Characters_Source/Addie and Hawk's Journey.docx" },
  { name: 'Addie Power Dynamic', path: "Characters_Source/Addie's Power dynamic.docx" },
  { name: 'Addie POH Role', path: 'Characters_Source/Addie and POH role.docx' },
  { name: 'Bella Background', path: "Characters_Source/Bella's Background Pre-BSS.docx" },
  { name: 'Harper COO Transition', path: 'Characters_Source/Harper COO transition story.docx' },
  { name: 'Evie Sofia Chat', path: 'Characters_Source/Build Evie and Sofia Chat.docx' },
  { name: 'Strong and Savory Series', path: 'Characters_Source/Cam Star Build.docx' },
  { name: 'Love Triangle', path: 'Characters_Source/Love Triangle Storyline.docx' },
  { name: 'Family Party Narrative', path: 'Characters_Source/Family Party Narrative (series closing).docx' },
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
  console.log('=== EXTRACTING TIMELINES AND STORY STRUCTURE ===\n');

  for (const doc of keyDocs) {
    const text = await parseDoc(doc.path);
    if (!text) continue;

    console.log(`\n${'='.repeat(70)}`);
    console.log(`DOCUMENT: ${doc.name}`);
    console.log(`Path: ${doc.path}`);
    console.log(`Length: ${text.length} characters`);
    console.log(`${'='.repeat(70)}\n`);

    // Print first 8000 characters for analysis
    const preview = text.substring(0, 8000).replace(/\n{4,}/g, '\n\n');
    console.log(preview);
    console.log('\n... [truncated]');
  }
}

main().catch(console.error);
