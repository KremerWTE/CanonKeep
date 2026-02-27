import * as mammoth from 'mammoth';

async function main() {
  // Search BSS Description for roster
  const bssDesc = await mammoth.extractRawText({ path: 'BSS Description.docx' });
  const jasperBuddies = await mammoth.extractRawText({ path: 'Jasper bussdies creation.docx' });
  const wivesClub = await mammoth.extractRawText({ path: 'Wives Club structure.docx' });
  const wivesChars = await mammoth.extractRawText({ path: 'Wives Club Characters Development.docx' });

  console.log('=== BSS DESCRIPTION - SEARCHING FOR OPERATORS/ROSTER ===\n');
  const bssLines = bssDesc.value.split('\n');
  for (const line of bssLines) {
    if (line.toLowerCase().includes('operator') ||
        line.toLowerCase().includes('tier') ||
        line.toLowerCase().includes('team') ||
        line.toLowerCase().includes('division') ||
        line.toLowerCase().includes('role') ||
        line.toLowerCase().includes('fixer') ||
        line.includes('Cole') ||
        line.includes('Ridge') ||
        line.includes('Hawk') ||
        line.includes('Daniel')) {
      console.log(line.substring(0, 200));
    }
  }

  console.log('\n\n=== JASPER BUDDIES - SEARCHING FOR CHARACTERS ===\n');
  const jbLines = jasperBuddies.value.split('\n');
  for (const line of jbLines) {
    if (line.length > 20 && line.length < 300 &&
        (line.includes('Name:') ||
         line.includes('Background:') ||
         line.includes('Role:') ||
         line.match(/^\d+\.\s+\w+/) ||
         line.includes('Operator') ||
         line.includes('Fixer'))) {
      console.log(line);
    }
  }

  console.log('\n\n=== WIVES CLUB STRUCTURE ===\n');
  const wcLines = wivesClub.value.split('\n');
  for (const line of wcLines) {
    if (line.length > 10) {
      console.log(line.substring(0, 250));
    }
  }

  console.log('\n\n=== WIVES CLUB CHARACTERS - NAMES ===\n');
  const wccLines = wivesChars.value.split('\n');
  let count = 0;
  for (const line of wccLines) {
    if ((line.includes('Name:') ||
         line.includes('Wife:') ||
         line.includes('Member:') ||
         line.match(/^\d+\.\s+[A-Z]/) ||
         line.includes('Circle') ||
         line.includes('Tier') ||
         line.includes('Section')) && count < 100) {
      console.log(line.substring(0, 200));
      count++;
    }
  }
}

main().catch(console.error);
