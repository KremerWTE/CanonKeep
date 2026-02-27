import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'New character creation.docx' });
  const text = result.value;

  console.log('=== EXTRACTING MINOR CHARACTERS ===\n');

  // Search for characters related to Addie
  console.log('=== ADDIE-RELATED CHARACTERS ===\n');
  const addieTerms = ['Addie', 'Adrienne', 'office assistant', 'mentee'];
  for (const term of addieTerms) {
    let pos = 0;
    while ((pos = text.indexOf(term, pos)) !== -1) {
      const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
      // Look for character names near Addie mentions
      if (context.match(/[A-Z][a-z]+ [A-Z][a-z]+/) &&
          (context.includes('friend') || context.includes('mentor') || context.includes('partner') ||
           context.includes('works with') || context.includes('relationship') || context.includes('colleague'))) {
        console.log(context.replace(/\n/g, ' ').trim().substring(0, 300));
        console.log('---');
      }
      pos += term.length;
    }
  }

  // Search for Chris-related characters
  console.log('\n\n=== CHRIS-RELATED CHARACTERS ===\n');
  let pos = 0;
  while ((pos = text.indexOf('Chris', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
    if (context.includes('friend') || context.includes('firefighter') || context.includes('lawyer') ||
        context.includes('Notre Dame') || context.includes('Boston') || context.includes('Ryan') ||
        context.includes('Nate') || context.includes('Ali')) {
      console.log(context.replace(/\n/g, ' ').trim().substring(0, 350));
      console.log('---');
    }
    pos += 5;
  }

  // Search for Elena-related characters
  console.log('\n\n=== ELENA-RELATED CHARACTERS ===\n');
  pos = 0;
  while ((pos = text.indexOf('Elena', pos)) !== -1) {
    const context = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 400));
    if (context.match(/[A-Z][a-z]+ [A-Z][a-z]+/) || context.includes('sister') ||
        context.includes('mother') || context.includes('Victoria') || context.includes('Sara')) {
      console.log(context.replace(/\n/g, ' ').trim().substring(0, 350));
      console.log('---');
    }
    pos += 5;
  }

  // Look for all named characters with titles or roles
  console.log('\n\n=== ALL NAMED CHARACTERS WITH ROLES ===\n');
  const rolePatterns = [
    /Ryan [A-Z][a-z]+/g,
    /Nate [A-Z][a-z]+/g,
    /Ali [A-Z][a-z]+/g,
    /Victoria [A-Z][a-z]+/g,
    /Alicia [A-Z][a-z]+/g,
    /Adrian [A-Z][a-z]+/g,
    /Miles [A-Z][a-z]+/g,
  ];

  const foundNames = new Set<string>();
  for (const pattern of rolePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      foundNames.add(match[0]);
    }
  }
  console.log('Named characters found:', Array.from(foundNames).join(', '));

  // Search for friend groups
  console.log('\n\n=== FRIEND GROUPS / CIRCLES ===\n');
  const friendTerms = ['friend', 'buddy', 'roommate', 'teammate', 'college friend', 'childhood friend'];
  for (const term of friendTerms) {
    pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 10) {
      const context = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 300));
      if (context.includes('Chris') || context.includes('Addie') || context.includes('Elena') ||
          context.includes('Kendra') || context.includes('Jasper')) {
        console.log(`[${term}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('---');
        count++;
      }
      pos += term.length;
    }
  }

  // Search for Chris's non-BSS friends
  console.log('\n\n=== CHRIS NON-BSS FRIENDS ===\n');
  const chrisFriendTerms = ['Ryan', 'firefighter friend', 'lawyer friend', 'Nate', 'Ali', 'Alicia'];
  for (const term of chrisFriendTerms) {
    pos = 0;
    while ((pos = text.indexOf(term, pos)) !== -1) {
      const context = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 500));
      if (context.includes('Chris') || context.includes('Donnelly') || context.includes('friend') ||
          context.includes('Boston') || context.includes('CrossFit')) {
        console.log(`[${term}] ${context.replace(/\n/g, ' ').trim()}`);
        console.log('---');
      }
      pos += term.length;
    }
  }

  // Look for Victoria (Elena's mother)
  console.log('\n\n=== VICTORIA (ELENA\'S MOTHER) ===\n');
  pos = 0;
  while ((pos = text.indexOf('Victoria', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(text.length, pos + 500);
    console.log(text.substring(start, end).replace(/\n/g, ' ').trim());
    console.log('---');
    pos += 8;
  }
}

main().catch(console.error);
