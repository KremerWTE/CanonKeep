import * as mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

const docsToRead = [
  'BSS Description.docx',
  'BSS early growth outline.docx',
  'BSS failures.docx',
  'BSS and POH outline.docx',
  "Bella's Background Pre-BSS.docx",
  'Jasper and Elena Transitions.docx',
  'Jasper expansion story.docx',
  'Jasper bussdies creation.docx',
  'Jasper Barrett series chat.docx'
];

async function extractDocx(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return '';
  }
}

async function main() {
  const rootDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home';

  console.log('='.repeat(80));
  console.log('BSS AND JASPER DOCUMENTS - COMPREHENSIVE EXTRACTION');
  console.log('='.repeat(80));

  for (const docName of docsToRead) {
    const filePath = path.join(rootDir, docName);

    if (fs.existsSync(filePath)) {
      console.log('\n');
      console.log('='.repeat(80));
      console.log(`DOCUMENT: ${docName}`);
      console.log('='.repeat(80));

      const content = await extractDocx(filePath);
      console.log(content);
    } else {
      console.log(`File not found: ${docName}`);
    }
  }
}

main().catch(console.error);
