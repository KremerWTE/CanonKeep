import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Extracting Book 1 Chapter Structure ===\n");

  // Read the main chat document
  const content = fs.readFileSync('chat1_extracted.txt', 'utf-8');
  const lines = content.split('\n');

  // Find chapter content by looking for "Chapter X —" or "Chapter X –" patterns
  // and extracting the content that follows
  const chapterData: {
    number: number;
    title: string;
    content: string;
    pov: string;
    location: string;
    synopsis: string;
  }[] = [];

  // Pattern to find chapter headers with content
  const chapterRegex = /^Chapter (\d+)\s*[–—-]\s*(.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const match = line.match(chapterRegex);

    if (match) {
      const chNum = parseInt(match[1]);
      const title = match[2].trim();

      // Skip retrofit versions
      if (title.includes('Retrofit')) continue;

      // Extract content - next 100 lines or until next chapter
      let chapterContent = '';
      for (let j = i + 1; j < Math.min(i + 150, lines.length); j++) {
        const nextLine = lines[j];
        // Stop if we hit another chapter header or "You said:" or "ChatGPT said:"
        if (nextLine.match(/^Chapter \d+\s*[–—-]/) ||
            nextLine.includes('You said:') ||
            nextLine.includes('ChatGPT said:') ||
            nextLine.includes('Do you want me to')) {
          break;
        }
        chapterContent += nextLine + '\n';
      }

      // Only keep if we have substantial content
      if (chapterContent.length > 500) {
        // Detect POV from content
        let pov = 'Jasper Barrett';
        if (chapterContent.toLowerCase().includes('elena pov') ||
            title.toLowerCase().includes('elena')) {
          pov = 'Elena Barrett';
        } else if (chapterContent.toLowerCase().includes('harper pov') ||
                   title.toLowerCase().includes('harper')) {
          pov = 'Harper';
        } else if (chapterContent.toLowerCase().includes('sara pov') ||
                   title.toLowerCase().includes('sara')) {
          pov = 'Sara';
        } else if (chapterContent.toLowerCase().includes('cole pov') ||
                   title.toLowerCase().includes('cole')) {
          pov = 'Cole';
        } else if (chapterContent.toLowerCase().includes('grace pov') ||
                   title.toLowerCase().includes('grace')) {
          pov = 'Grace';
        }

        // Detect location from content
        let location = 'Charlotte';
        if (chapterContent.toLowerCase().includes('london')) location = 'London';
        else if (chapterContent.toLowerCase().includes('hong kong')) location = 'Hong Kong';
        else if (chapterContent.toLowerCase().includes('hospital')) location = 'Hospital';
        else if (chapterContent.toLowerCase().includes('oak watch') ||
                 chapterContent.toLowerCase().includes('compound') ||
                 chapterContent.toLowerCase().includes('home')) location = 'Oak Watch';
        else if (chapterContent.toLowerCase().includes('forge') ||
                 chapterContent.toLowerCase().includes('office')) location = 'The Forge (BSS HQ)';
        else if (chapterContent.toLowerCase().includes('party')) location = 'Oak Watch (Party)';

        // Create synopsis from first paragraph
        const paragraphs = chapterContent.split('\n\n').filter(p => p.trim().length > 50);
        const synopsis = paragraphs[0]?.substring(0, 500) || title;

        chapterData.push({
          number: chNum,
          title,
          content: chapterContent.substring(0, 5000), // Limit stored content
          pov,
          location,
          synopsis
        });
      }
    }
  }

  // Dedupe - keep the longest/most detailed version of each chapter number
  const chapterMap = new Map<number, typeof chapterData[0]>();
  for (const ch of chapterData) {
    const existing = chapterMap.get(ch.number);
    if (!existing || ch.content.length > existing.content.length) {
      chapterMap.set(ch.number, ch);
    }
  }

  // Sort and display
  const sortedChapters = Array.from(chapterMap.values()).sort((a, b) => a.number - b.number);

  console.log(`Found ${sortedChapters.length} unique chapters with structure:\n`);

  for (const ch of sortedChapters) {
    console.log(`Ch ${ch.number}: ${ch.title}`);
    console.log(`  POV: ${ch.pov}`);
    console.log(`  Location: ${ch.location}`);
    console.log(`  Synopsis: ${ch.synopsis.substring(0, 100)}...`);
    console.log('');
  }

  // Update database
  const book1 = await prisma.book.findFirst({
    where: { projectId: project.id, title: 'Five Feet From Home' }
  });

  if (!book1) {
    console.log("Book 1 not found!");
    await prisma.$disconnect();
    return;
  }

  // Clear and recreate chapters
  await prisma.chapter.deleteMany({ where: { bookId: book1.id } });
  console.log("\nCleared existing chapters");

  for (const ch of sortedChapters) {
    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book1.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        draftText: ch.content,
        pov: ch.pov,
        status: 'drafted',
        wordCount: ch.content.split(/\s+/).length,
        tags: ch.location
      }
    });
  }

  console.log(`\nCreated ${sortedChapters.length} chapters with full structure`);

  // Show chapter count by POV
  const povCounts: Record<string, number> = {};
  for (const ch of sortedChapters) {
    povCounts[ch.pov] = (povCounts[ch.pov] || 0) + 1;
  }
  console.log('\nChapters by POV:');
  for (const [pov, count] of Object.entries(povCounts)) {
    console.log(`  ${pov}: ${count}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
