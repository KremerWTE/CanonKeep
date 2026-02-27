import * as mammoth from 'mammoth';
import * as fs from 'fs';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  console.log('=== DEEP PARSING CHARACTERS.DOCX ===\n');
  console.log(`Total document length: ${text.length} characters\n`);

  // Find Cole's relationship arc details
  console.log('--- COLE\'S RELATIONSHIP/FEAR ARC ---\n');
  let pos = 0;
  while ((pos = text.toLowerCase().indexOf('afraid', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 150), Math.min(text.length, pos + 300));
    if (ctx.toLowerCase().includes('cole') || ctx.toLowerCase().includes('relationship')) {
      console.log(ctx.replace(/\n/g, ' ').trim());
      console.log('---');
    }
    pos += 6;
  }

  // Find "Canon Anchor" sections
  console.log('\n--- CANON ANCHOR SECTIONS ---\n');
  pos = 0;
  while ((pos = text.indexOf('Canon Anchor', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 500));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
  pos += 12;
  }

  // Find character arcs
  console.log('\n--- CHARACTER ARC DEFINITIONS ---\n');
  const arcTerms = ['arc:', 'Arc:', 'ARC:', 'arcStart', 'arcEnd', 'Narrative Role'];
  for (const term of arcTerms) {
    pos = 0;
    while ((pos = text.indexOf(term, pos)) !== -1) {
      const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 400));
      console.log(`[${term}] ` + ctx.replace(/\n/g, ' ').trim());
      console.log('---');
      pos += term.length;
    }
  }

  // Find friend dates between Cole and Evie
  console.log('\n--- COLE & EVIE FRIEND DATES ---\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('friend date', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 400));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 11;
  }

  // Find Hawk's role
  console.log('\n--- HAWK MENTIONS ---\n');
  pos = 0;
  let count = 0;
  while ((pos = text.indexOf('Hawk', pos)) !== -1 && count < 15) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 4;
    count++;
  }

  // Find Selene mentions
  console.log('\n--- SELENE MENTIONS ---\n');
  pos = 0;
  count = 0;
  while ((pos = text.indexOf('Selene', pos)) !== -1 && count < 10) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 6;
    count++;
  }

  // Find BSS/POH mentions
  console.log('\n--- BSS/POH ORGANIZATION DETAILS ---\n');
  pos = 0;
  count = 0;
  while ((pos = text.indexOf('BSS', pos)) !== -1 && count < 10) {
    const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
    if (ctx.includes('role') || ctx.includes('work') || ctx.includes('analyst')) {
      console.log(ctx.replace(/\n/g, ' ').trim());
      console.log('---');
      count++;
    }
    pos += 3;
  }

  // Find the ex-wife/daughter mentions for Cole
  console.log('\n--- COLE\'S EX-WIFE AND DAUGHTER ---\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('ex-wife', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 150), Math.min(text.length, pos + 350));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 7;
  }

  pos = 0;
  while ((pos = text.toLowerCase().indexOf('estranged', pos)) !== -1) {
    const ctx = text.substring(Math.max(0, pos - 150), Math.min(text.length, pos + 350));
    console.log(ctx.replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 9;
  }

  // Find Bishop/Religious mentions
  console.log('\n--- RELIGIOUS/BISHOP MENTIONS ---\n');
  const religiousTerms = ['Bishop', 'Cardinal', 'Monsignor', 'Father', 'church'];
  for (const term of religiousTerms) {
    pos = 0;
    count = 0;
    while ((pos = text.indexOf(term, pos)) !== -1 && count < 5) {
      const ctx = text.substring(Math.max(0, pos - 80), Math.min(text.length, pos + 250));
      console.log(`[${term}] ` + ctx.replace(/\n/g, ' ').trim());
      console.log('---');
      pos += term.length;
      count++;
    }
  }

  // Find scene descriptions
  console.log('\n--- SCENE DESCRIPTIONS ---\n');
  pos = 0;
  count = 0;
  while ((pos = text.indexOf('Scene —', pos)) !== -1 && count < 20) {
    const ctx = text.substring(pos, Math.min(text.length, pos + 600));
    console.log(ctx.replace(/\n/g, ' ').trim().substring(0, 500));
    console.log('---');
    pos += 7;
    count++;
  }

  console.log('\n=== EXTRACTION COMPLETE ===');
}

main().catch(console.error);
