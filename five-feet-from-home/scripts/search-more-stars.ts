import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Cam Star Build.docx' });
  const text = result.value.toLowerCase();

  // Search for various terms
  const searchTerms = [
    'bailey', 'brewer', 'instagram', 'insta', 'influencer',
    'tiktok', 'onlyfans', 'fansly', 'cam girl', 'cam star',
    'brooke', 'kylie', 'bella', 'megan', 'paige', 'riley',
    'emma', 'chloe', 'sophie', 'zoey', 'maya', 'luna',
    'amber', 'jade', 'ivy', 'ruby', 'diamond', 'crystal',
    'chaturbate', 'myfreecams', 'stripchat', 'bongacams'
  ];

  console.log('=== SEARCHING FOR ADDITIONAL NAMES ===\n');

  for (const term of searchTerms) {
    const count = (text.match(new RegExp(term, 'g')) || []).length;
    if (count > 0) {
      console.log(`"${term}": ${count} mentions`);
    }
  }

  // Get lines containing "character" or "model" or "based on"
  console.log('\n=== CHARACTER CREATION SECTIONS ===\n');
  const lines = result.value.split('\n');
  for (const line of lines) {
    const lower = line.toLowerCase();
    if ((lower.includes('character:') || lower.includes('stage name:') ||
         lower.includes('based on') || lower.includes('build a') ||
         lower.includes('create a')) && line.length > 20 && line.length < 200) {
      console.log(line.trim());
    }
  }
}

main().catch(console.error);
