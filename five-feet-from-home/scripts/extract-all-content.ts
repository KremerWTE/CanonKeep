import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== FULL DOCUMENT SEARCH ===\n');
  console.log('Document length:', text.length, 'characters\n');

  // Search for Lena and Elena connection
  console.log('=== LENA & ELENA CONNECTION ===\n');
  const lenaStart = text.toLowerCase().indexOf('lena');
  if (lenaStart > -1) {
    // Find all mentions of Lena
    let pos = 0;
    while ((pos = text.toLowerCase().indexOf('lena', pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 300);
      console.log('---');
      console.log(text.substring(start, end));
      pos += 4;
    }
  }

  // Search for flashback content
  console.log('\n\n=== FLASHBACKS ===\n');
  let pos = 0;
  while ((pos = text.toLowerCase().indexOf('flashback', pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 500);
    console.log('---');
    console.log(text.substring(start, end));
    pos += 9;
  }

  // Search for crisis scenarios
  console.log('\n\n=== CRISIS SCENARIOS ===\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('crisis', pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 400);
    console.log('---');
    console.log(text.substring(start, end));
    pos += 6;
  }

  // Search for mission types
  console.log('\n\n=== MISSIONS/OPERATIONS ===\n');
  const missionKeywords = ['extraction', 'rescue', 'operation', 'kidnap', 'hostage', 'threat', 'assassination', 'cartel', 'terrorist'];
  for (const keyword of missionKeywords) {
    pos = 0;
    const results: string[] = [];
    while ((pos = text.toLowerCase().indexOf(keyword, pos)) !== -1) {
      const start = Math.max(0, pos - 30);
      const end = Math.min(text.length, pos + 200);
      results.push(text.substring(start, end));
      pos += keyword.length;
    }
    if (results.length > 0) {
      console.log(`\n--- ${keyword.toUpperCase()} (${results.length} mentions) ---`);
      results.slice(0, 3).forEach(r => console.log(r + '\n'));
    }
  }

  // Look for Addie transformation story
  console.log('\n\n=== ADDIE TRANSFORMATION ===\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('addie', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 20), Math.min(text.length, pos + 300));
    if (context.toLowerCase().includes('hippie') || context.toLowerCase().includes('goddess') ||
        context.toLowerCase().includes('transform') || context.toLowerCase().includes('style') ||
        context.toLowerCase().includes('riley') || context.toLowerCase().includes('harper')) {
      console.log('---');
      console.log(context);
    }
    pos += 5;
  }
}

main().catch(console.error);
