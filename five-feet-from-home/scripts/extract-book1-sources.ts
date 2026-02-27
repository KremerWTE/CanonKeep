import * as mammoth from 'mammoth';
import * as fs from 'fs';

async function extractDocx(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    console.error(`Error extracting ${filePath}:`, err);
    return '';
  }
}

async function main() {
  const ingestDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\ingest';
  const fiveFeetDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\Five Feet From Home';

  let allContent = '';

  console.log("=== Extracting Book 1 Source Documents ===\n");

  // 1. Book 1.docx
  console.log("--- BOOK 1.DOCX ---");
  const book1 = await extractDocx(`${fiveFeetDir}\\book 1.docx`);
  console.log(`Extracted: ${book1.length} chars`);
  allContent += `\n\n========== BOOK 1.DOCX ==========\n\n${book1}`;

  // 2. Chapters 1-9
  for (let i = 1; i <= 9; i++) {
    console.log(`--- CHAPTER ${i}.DOCX ---`);
    const chapter = await extractDocx(`${fiveFeetDir}\\Chapter ${i}.docx`);
    console.log(`Extracted: ${chapter.length} chars`);
    allContent += `\n\n========== CHAPTER ${i}.DOCX ==========\n\n${chapter}`;
  }

  // Also grab Chapter 1&2 combined
  console.log("--- CHAPTER 1&2.DOCX ---");
  const ch12 = await extractDocx(`${fiveFeetDir}\\Chapter 1&2.docx`);
  console.log(`Extracted: ${ch12.length} chars`);
  allContent += `\n\n========== CHAPTER 1&2.DOCX ==========\n\n${ch12}`;

  // 3. Second chat
  console.log("--- SECOND CHAT.DOCX ---");
  const secondChat = await extractDocx(`${ingestDir}\\second chat.docx`);
  console.log(`Extracted: ${secondChat.length} chars`);
  allContent += `\n\n========== SECOND CHAT.DOCX ==========\n\n${secondChat}`;

  // 4. Flashback
  console.log("--- FLASHBACK.DOCX ---");
  const flashback = await extractDocx(`${ingestDir}\\Flashback.docx`);
  console.log(`Extracted: ${flashback.length} chars`);
  allContent += `\n\n========== FLASHBACK.DOCX ==========\n\n${flashback}`;

  // 5. Outline
  console.log("--- OUTLINE.DOCX ---");
  const outline = await extractDocx(`${fiveFeetDir}\\Outline.docx`);
  console.log(`Extracted: ${outline.length} chars`);
  allContent += `\n\n========== OUTLINE.DOCX ==========\n\n${outline}`;

  // Save everything
  fs.writeFileSync('book1_all_sources.txt', allContent);
  console.log(`\n\nTotal extracted: ${allContent.length} characters`);
  console.log("Saved to book1_all_sources.txt");
}

main().catch(console.error);
