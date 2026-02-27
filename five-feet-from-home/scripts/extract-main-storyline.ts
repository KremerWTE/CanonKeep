import * as mammoth from 'mammoth';
import * as fs from 'fs';

async function extractDocx(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    console.error(`Error: ${err}`);
    return '';
  }
}

async function main() {
  const ingestDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\ingest';

  console.log("=== Extracting Main Storyline Documents ===\n");

  // Chat 1.docx - main storyline
  console.log("--- CHAT 1.DOCX ---\n");
  const chat1 = await extractDocx(`${ingestDir}\\Chat 1.docx`);
  fs.writeFileSync('chat1_extracted.txt', chat1);
  console.log(`Extracted Chat 1: ${chat1.length} characters`);
  console.log("\nPREVIEW (first 5000 chars):\n");
  console.log(chat1.substring(0, 5000));

  console.log("\n\n--- LOVE OPTION BOOK 4.DOCX ---\n");
  const loveOption4 = await extractDocx(`${ingestDir}\\Love Option Book 4.docx`);
  fs.writeFileSync('love_option_4_extracted.txt', loveOption4);
  console.log(`Extracted Love Option Book 4: ${loveOption4.length} characters`);
  console.log("\nPREVIEW (first 5000 chars):\n");
  console.log(loveOption4.substring(0, 5000));

  console.log("\n\nFull content saved to chat1_extracted.txt and love_option_4_extracted.txt");
}

main().catch(console.error);
