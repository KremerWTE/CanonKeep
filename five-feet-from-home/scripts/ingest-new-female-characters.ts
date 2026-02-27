import * as mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const filePath = path.join(process.cwd(), 'new female characters.docx');

  console.log('Reading: new female characters.docx\n');

  const result = await mammoth.extractRawText({ path: filePath });
  const text = result.value;

  console.log('=== DOCUMENT CONTENT ===\n');
  console.log(text);
  console.log('\n=== END OF DOCUMENT ===');

  // Save extracted text for reference
  fs.writeFileSync('new-female-characters-extracted.txt', text);
  console.log('\nSaved to: new-female-characters-extracted.txt');
}

main().catch(console.error);
