import * as mammoth from 'mammoth';

async function main() {
  console.log('=== PARSING CAM STAR BUILD FOR VIXENS ===\n');

  try {
    const result = await mammoth.extractRawText({ path: 'Cam Star Build.docx' });
    const text = result.value;

    console.log(`Document length: ${text.length} characters\n`);

    // Full document
    console.log('=== FULL DOCUMENT ===\n');
    console.log(text.replace(/\n{4,}/g, '\n\n\n'));

  } catch (e) {
    console.log('Error reading document:', e);
  }
}

main().catch(console.error);
