import * as mammoth from 'mammoth';

async function main() {
  const wivesChars = await mammoth.extractRawText({ path: 'Wives Club Characters Development.docx' });

  console.log('=== WIVES CLUB CHARACTERS DEVELOPMENT - FULL STRUCTURE ===\n');

  const lines = wivesChars.value.split('\n');
  let count = 0;

  for (const line of lines) {
    // Look for structure, names, circles, tiers
    if (line.length > 15 &&
        (line.includes('Circle') ||
         line.includes('Tier') ||
         line.includes('Section') ||
         line.includes('Division') ||
         line.includes('Council') ||
         line.includes('Order') ||
         line.includes('Name:') ||
         line.includes('Role:') ||
         line.includes('Palace') ||
         line.includes('Patroness') ||
         line.includes('Founder') ||
         line.includes('Inner') ||
         line.includes('Outer') ||
         line.includes('Core') ||
         line.match(/^\d+\.\s+[A-Z]/) ||
         line.match(/^[A-Z][a-z]+\s+[A-Z][a-z]+\s*[-–—]/) // Names with dash
        ) && count < 150) {
      console.log(line.substring(0, 250));
      count++;
    }
  }

  // Also search for fancy name
  console.log('\n\n=== SEARCHING FOR FANCY NAMES ===\n');
  for (const line of lines) {
    if (line.toLowerCase().includes('wives') ||
        line.toLowerCase().includes('palace') ||
        line.toLowerCase().includes('order') ||
        line.toLowerCase().includes('sisterhood') ||
        line.toLowerCase().includes('society') ||
        line.toLowerCase().includes('circle')) {
      if (line.length > 20 && line.length < 300) {
        console.log(line);
      }
    }
  }
}

main().catch(console.error);
