import * as mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

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
  const baseDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\Five Feet From Home';

  // Extract Outline
  console.log('=== OUTLINE.DOCX ===\n');
  const outlineContent = await extractDocx(path.join(baseDir, 'Outline.docx'));
  console.log(outlineContent.substring(0, 5000));

  // Save to file for review
  fs.writeFileSync('outline_extracted.txt', outlineContent);
  console.log('\n\nFull outline saved to outline_extracted.txt');

  // Extract first few chapters to see structure
  console.log('\n\n=== CHAPTER 1 PREVIEW ===\n');
  const ch1 = await extractDocx(path.join(baseDir, 'Chapter 1.docx'));
  console.log(ch1.substring(0, 2000));

  console.log('\n\n=== CHAPTER 2 PREVIEW ===\n');
  const ch2 = await extractDocx(path.join(baseDir, 'Chapter 2.docx'));
  console.log(ch2.substring(0, 2000));
}

main().catch(console.error);
