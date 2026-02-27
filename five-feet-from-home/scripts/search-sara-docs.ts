import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== SARA MENTIONS IN NEW CHARACTER CREATION ===\n');

  // Search for Sara Hale
  let pos = 0;
  console.log('--- SARA HALE ---');
  while ((pos = text.indexOf('Sara Hale', pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 400);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 9;
  }

  // Search for Sara Barrett
  pos = 0;
  console.log('\n--- SARA BARRETT ---');
  while ((pos = text.indexOf('Sara Barrett', pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 400);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 12;
  }

  // Search for "Elena's sister"
  pos = 0;
  console.log('\n--- ELENA\'S SISTER ---');
  while ((pos = text.toLowerCase().indexOf("elena's sister", pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(text.length, pos + 400);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 14;
  }

  // Search for Sara with context
  pos = 0;
  console.log('\n--- SARA (with Elena context) ---');
  while ((pos = text.indexOf('Sara', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
    if (context.includes('Elena') || context.includes('sister') || context.includes('gym') ||
        context.includes('teacher') || context.includes('Hale')) {
      console.log(context.replace(/\n/g, ' ').trim().substring(0, 350));
      console.log('---');
    }
    pos += 4;
  }
}

main().catch(console.error);
