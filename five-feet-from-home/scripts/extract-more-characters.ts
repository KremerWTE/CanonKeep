import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  // Find Msgr. Reilly
  const msgrStart = text.indexOf('Msgr. Patrick Reilly');
  if (msgrStart > -1) {
    console.log('=== MSGR. PATRICK REILLY ===');
    console.log(text.substring(msgrStart, msgrStart + 1500));
    console.log('\n');
  }

  // Find Fr. Callahan
  const frStart = text.indexOf('Fr. James Callahan');
  if (frStart > -1) {
    console.log('=== FR. JAMES CALLAHAN ===');
    console.log(text.substring(frStart, frStart + 1500));
    console.log('\n');
  }

  // Find Dr. Lauren Bloom
  const bloomStart = text.indexOf('Dr Lauren bloom');
  if (bloomStart > -1) {
    console.log('=== DR. LAUREN BLOOM ===');
    console.log(text.substring(bloomStart - 200, bloomStart + 1500));
    console.log('\n');
  }

  // Find Dr. Nathaniel
  const nathanielStart = text.indexOf('Dr. Nathaniel');
  if (nathanielStart > -1) {
    console.log('=== DR. NATHANIEL ===');
    console.log(text.substring(nathanielStart, nathanielStart + 2000));
    console.log('\n');
  }
}

main().catch(console.error);
