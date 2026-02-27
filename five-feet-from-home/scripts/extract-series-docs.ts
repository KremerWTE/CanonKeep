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
  const ingestDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\ingest';

  const seriesToExtract = [
    // Addie's series
    { file: "Addie and Hawk's Journey.docx", series: 'Addie' },
    { file: 'Addie and POH role.docx', series: 'Addie' },

    // Bella's series
    { file: "Bella's Background Pre-BSS.docx", series: 'Bella' },

    // Harper's series
    { file: 'Harper Story ideas.docx', series: 'Harper' },
    { file: 'Harper COO transition story.docx', series: 'Harper' },

    // Izzy's series
    { file: 'Izzy College Journey.docx', series: 'Izzy' },

    // Spring Break
    { file: 'Spring Break Scene Florida.docx', series: 'Spring Break' },

    // Ridge
    { file: 'Ridge story.docx', series: 'Ridge' },

    // Selene
    { file: 'Selene Troubles.docx', series: 'Selene' },

    // POH
    { file: 'POH story outlines.docx', series: 'POH' },

    // Kendra
    { file: 'Kebdra Maternity leave outline.docx', series: 'Kendra' },

    // Chris
    { file: 'Chris background expnasion.docx', series: 'Chris' },

    // Evie
    { file: 'Build Evie and Sofia Chat.docx', series: 'Evie' }
  ];

  const output: Record<string, string[]> = {};

  for (const item of seriesToExtract) {
    const filePath = path.join(ingestDir, item.file);
    console.log(`\n=== Extracting: ${item.file} ===`);

    try {
      const content = await extractDocx(filePath);
      if (content) {
        if (!output[item.series]) output[item.series] = [];
        output[item.series].push(`--- ${item.file} ---\n${content.substring(0, 3000)}\n`);
        console.log(`Extracted ${content.length} characters`);
      }
    } catch (err) {
      console.log(`Skipped: ${item.file}`);
    }
  }

  // Save all extracted content
  let fullOutput = '';
  for (const [series, contents] of Object.entries(output)) {
    fullOutput += `\n\n========== ${series.toUpperCase()} SERIES ==========\n\n`;
    fullOutput += contents.join('\n');
  }

  fs.writeFileSync('series_extracted.txt', fullOutput);
  console.log('\n\nAll series content saved to series_extracted.txt');
}

main().catch(console.error);
