import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Characters.docx' });
  const text = result.value;

  console.log('=== MATT & MANDY FULL EXTRACTION ===\n');

  // Search for Bella/Matt/Mandy triangle
  console.log('--- BELLA-MATT-MANDY RELATIONSHIP ---\n');
  let pos = 0;
  const mattMandyContexts: string[] = [];
  while ((pos = text.indexOf('Matt', pos)) !== -1) {
    const start = Math.max(0, pos - 200);
    const end = Math.min(text.length, pos + 400);
    const context = text.substring(start, end);
    if (context.includes('Mandy') || context.includes('Bella')) {
      const cleaned = context.replace(/\n/g, ' ').trim();
      if (!mattMandyContexts.some(c => c.includes(cleaned.substring(50, 150)))) {
        mattMandyContexts.push(cleaned);
      }
    }
    pos += 4;
  }

  console.log(`Found ${mattMandyContexts.length} unique Matt-Mandy-Bella contexts:\n`);
  mattMandyContexts.slice(0, 15).forEach((ctx, i) => {
    console.log(`[${i + 1}] ${ctx.substring(0, 500)}`);
    console.log('---\n');
  });

  // Search for Bella's relationships
  console.log('\n--- BELLA RELATIONSHIP DETAILS ---\n');
  pos = 0;
  while ((pos = text.indexOf('Bella', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 500);
    const context = text.substring(start, end);
    if (context.includes('relationship') || context.includes('dated') || context.includes('dating') ||
        context.includes('love') || context.includes('partner')) {
      console.log(context.replace(/\n/g, ' ').trim().substring(0, 500));
      console.log('---\n');
    }
    pos += 5;
  }

  // Look for Mandy's background
  console.log('\n--- MANDY CHARACTER DETAILS ---\n');
  pos = 0;
  let mandyDetails: string[] = [];
  while ((pos = text.indexOf('Mandy', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 600);
    const context = text.substring(start, end).replace(/\n/g, ' ').trim();
    if (context.includes('background') || context.includes('personality') ||
        context.includes('appearance') || context.includes('role') ||
        context.includes('sexuality') || context.includes('confidence')) {
      if (!mandyDetails.some(d => d.includes(context.substring(100, 200)))) {
        mandyDetails.push(context);
      }
    }
    pos += 5;
  }

  mandyDetails.slice(0, 10).forEach((d, i) => {
    console.log(`[${i + 1}] ${d.substring(0, 600)}`);
    console.log('---\n');
  });

  // Look for Matt's background
  console.log('\n--- MATT CHARACTER DETAILS ---\n');
  pos = 0;
  let mattDetails: string[] = [];
  while ((pos = text.indexOf('Matt', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 600);
    const context = text.substring(start, end).replace(/\n/g, ' ').trim();
    if (context.includes('BSS') || context.includes('operator') ||
        context.includes('personality') || context.includes('background') ||
        context.includes('appearance') || context.includes('archetype')) {
      if (!mattDetails.some(d => d.includes(context.substring(100, 200)))) {
        mattDetails.push(context);
      }
    }
    pos += 4;
  }

  mattDetails.slice(0, 10).forEach((d, i) => {
    console.log(`[${i + 1}] ${d.substring(0, 600)}`);
    console.log('---\n');
  });

  // Look for date scenes
  console.log('\n--- DATE/ROMANCE SCENES ---\n');
  const dateTerms = ['friend date', 'date night', 'first date', 'double date', 'romantic'];
  for (const term of dateTerms) {
    pos = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1) {
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 500);
      const context = text.substring(start, end).replace(/\n/g, ' ').trim();
      console.log(`[${term}] ${context.substring(0, 500)}`);
      console.log('---\n');
      pos += term.length;
    }
  }

  // Look for gala/event scenes with new details
  console.log('\n--- GALA SCENES WITH EVIE/COLE ---\n');
  pos = 0;
  while ((pos = text.toLowerCase().indexOf('gala', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 600);
    const context = text.substring(start, end);
    if (context.includes('Evie') || context.includes('Cole')) {
      console.log(context.replace(/\n/g, ' ').trim().substring(0, 550));
      console.log('---\n');
    }
    pos += 4;
  }

  // Look for Nashville trip
  console.log('\n--- NASHVILLE TRIP ---\n');
  pos = 0;
  while ((pos = text.indexOf('Nashville', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 700);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---\n');
    pos += 9;
  }

  // Look for "My Fair Lady" transformation scenes
  console.log('\n--- MY FAIR LADY TRANSFORMATION ---\n');
  pos = 0;
  while ((pos = text.indexOf('My Fair Lady', pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(text.length, pos + 600);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---\n');
    pos += 12;
  }
}

main().catch(console.error);
