import * as mammoth from 'mammoth';

async function main() {
  console.log('=== PARSING CHAT 1.docx (BASELINE STORYLINE) ===\n');

  const result = await mammoth.extractRawText({ path: 'Five Feet From Home/Chat 1.docx' });
  const text = result.value;

  console.log(`Document length: ${text.length} characters\n`);

  // Get first 5000 characters to understand the beginning
  console.log('--- BEGINNING OF STORY (First 3000 chars) ---\n');
  console.log(text.substring(0, 3000).replace(/\n{3,}/g, '\n\n'));

  // Find chapter/section markers
  console.log('\n--- CHAPTER/SECTION MARKERS ---\n');
  const chapterPatterns = [
    /Chapter\s+\d+/gi,
    /Part\s+\d+/gi,
    /Scene\s*[-:—]/gi,
    /\*\*\*.*/g
  ];

  for (const pattern of chapterPatterns) {
    let match;
    const patternCopy = new RegExp(pattern.source, pattern.flags);
    let count = 0;
    while ((match = patternCopy.exec(text)) !== null && count < 20) {
      const ctx = text.substring(match.index, Math.min(text.length, match.index + 150));
      console.log(ctx.replace(/\n/g, ' ').trim().substring(0, 120));
      count++;
    }
  }

  // Find key character introductions
  console.log('\n--- KEY CHARACTER INTRODUCTIONS ---\n');
  const chars = ['Jasper', 'Elena', 'Addie', 'Hawk', 'Cole', 'Bella', 'Evie', 'Mandy'];
  for (const char of chars) {
    let pos = text.indexOf(char);
    if (pos !== -1) {
      const ctx = text.substring(Math.max(0, pos - 50), Math.min(text.length, pos + 200));
      console.log(`[${char}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 200)}`);
    }
  }

  // Find timeline markers
  console.log('\n--- TIMELINE MARKERS ---\n');
  const timeTerms = ['years ago', 'months later', 'week later', 'the next', 'that night', 'morning', 'evening'];
  for (const term of timeTerms) {
    let pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 5) {
      const ctx = text.substring(Math.max(0, pos - 80), Math.min(text.length, pos + 120));
      console.log(`[${term}] ${ctx.replace(/\n/g, ' ').trim()}`);
      pos += term.length;
      count++;
    }
  }

  // Find physical/intimate scenes
  console.log('\n--- PHYSICAL/INTIMATE SCENE MARKERS ---\n');
  const intimateTerms = ['kiss', 'touch', 'held', 'embrace', 'bed', 'night together', 'made love', 'first time'];
  for (const term of intimateTerms) {
    let pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 8) {
      const ctx = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 200));
      // Check if it's a romantic context
      if (ctx.match(/[A-Z][a-z]+/)) {
        console.log(`[${term}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 250)}`);
        count++;
      }
      pos += term.length;
    }
  }

  // Find gala/event scenes
  console.log('\n--- GALA/EVENT SCENES ---\n');
  const eventTerms = ['gala', 'ballroom', 'dance', 'event', 'party', 'celebration'];
  for (const term of eventTerms) {
    let pos = 0;
    let count = 0;
    while ((pos = text.toLowerCase().indexOf(term, pos)) !== -1 && count < 5) {
      const ctx = text.substring(Math.max(0, pos - 80), Math.min(text.length, pos + 250));
      console.log(`[${term}] ${ctx.replace(/\n/g, ' ').trim().substring(0, 280)}`);
      pos += term.length;
      count++;
    }
  }

  console.log('\n=== END OF CHAT 1 PARSING ===');
}

main().catch(console.error);
