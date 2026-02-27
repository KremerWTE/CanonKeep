import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  console.log('=== SEARCHING FOR SERIES/SHOW/YOUTUBE CONTENT ===\n');

  // Search for meal prep content
  console.log('--- MEAL PREP ---\n');
  let pos = 0;
  while ((pos = text.toLowerCase().indexOf('meal prep', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 800);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n---\n');
    pos += 9;
  }

  // Search for YouTube/video content
  console.log('\n--- YOUTUBE/VIDEO ---\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('youtube', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 800);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('\n---\n');
    pos += 7;
  }

  // Search for pilot/episode content
  console.log('\n--- PILOT/EPISODE ---\n');
  const episodeTerms = ['pilot', 'episode', 'film', 'shoot'];
  for (const term of episodeTerms) {
    pos = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1) {
      const start = Math.max(0, pos - 150);
      const end = Math.min(text.length, pos + 600);
      const context = text.substring(start, end);
      if (context.toLowerCase().includes('evie') || context.toLowerCase().includes('sofia') ||
          context.toLowerCase().includes('cooking') || context.toLowerCase().includes('athlete')) {
        console.log(`[${term}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('\n---\n');
      }
      pos += term.length;
    }
  }

  // Search for foundation/nonprofit content
  console.log('\n--- FOUNDATION/NONPROFIT ---\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('foundation', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 600);
    const context = text.substring(start, end);
    if (context.toLowerCase().includes('evie') || context.toLowerCase().includes('sofia') ||
        context.toLowerCase().includes('jazz') || context.toLowerCase().includes('special')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('\n---\n');
    }
    pos += 10;
  }

  // Search for Bella's swimming/Special Olympics
  console.log('\n--- BELLA / JAZZ / SWIMMING ---\n');
  const bellaTerms = ['Bella', 'Jazz', 'swimmer', 'swimming', 'Special Olympics', 'pool'];
  for (const term of bellaTerms) {
    pos = 0;
    while ((pos = text.indexOf(term, pos)) !== -1) {
      const start = Math.max(0, pos - 150);
      const end = Math.min(text.length, pos + 700);
      console.log(`[${term}] ${text.substring(start, end).replace(/\n/g, ' ').trim()}`);
      console.log('\n---\n');
      pos += term.length;
    }
  }

  // Search for Grace companies/business
  console.log('\n--- GRACE COMPANIES/BUSINESS ---\n');
  pos = 0;
  while ((pos = text.indexOf('Grace', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 600);
    const context = text.substring(start, end);
    if (context.toLowerCase().includes('compan') || context.toLowerCase().includes('business') ||
        context.toLowerCase().includes('empire') || context.toLowerCase().includes('ceo') ||
        context.toLowerCase().includes('foundation') || context.toLowerCase().includes('board')) {
      console.log(context.replace(/\n/g, ' ').trim());
      console.log('\n---\n');
    }
    pos += 5;
  }
}

main().catch(console.error);
