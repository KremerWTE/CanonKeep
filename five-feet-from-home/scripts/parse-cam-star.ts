import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Cam Star Build.docx' });
  const text = result.value;

  console.log('=== CAM STAR BUILD DOCUMENT ===\n');
  console.log('Length:', text.length, 'characters\n');

  // Print the full document
  console.log(text);
}

main().catch(console.error);
