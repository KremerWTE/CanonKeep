import * as mammoth from 'mammoth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function extractDocx(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    return '';
  }
}

// Chapter summaries from Outline.docx
const chapterOutline = [
  { number: 1, title: 'The Call', synopsis: '2:17 a.m., London data breach. Jasper snaps into operational mode, assembling a team and flying out before dawn. First glimpse of the family anchor he leaves behind.' },
  { number: 2, title: 'War Room', synopsis: 'Jasper in his element: handling high-pressure executives, dictating media strategy, firefighting misinformation. Flashes of personal life only in the quiet in-between.' },
  { number: 3, title: 'Passing Through', synopsis: "Brief stop at home between trips. He's physically present but mentally elsewhere, already preparing for the next client emergency." },
  { number: 4, title: 'The Five-Foot Rule', synopsis: "We see how Jasper survives pressure: focusing only on what's within immediate reach. Great for the job, destructive at home." },
  { number: 5, title: 'Missed Flight Home', synopsis: "Chooses to stay an extra day in Hong Kong to secure a contract. Meanwhile, Grace has an asthma attack. Elena leaves him a sharp voicemail he doesn't answer." },
  { number: 6, title: 'A Slip in the Line', synopsis: "A junior associate mishandles a key client relationship because Jasper wasn't watching the bigger picture. First time a colleague questions his leadership." },
  { number: 7, title: 'Our Team', synopsis: 'At home, Grace asks if Daddy is "on our team." Jasper freezes. The words stick in his head during the next crisis.' },
  { number: 8, title: 'The Divide', synopsis: "Work colleagues notice Jasper's distraction. Elena stops calling him when things break at home—she just handles them herself." },
  { number: 9, title: 'Rock Bottom', synopsis: "Chicago contamination case. Jasper executes flawlessly, but misses Grace's recital—the one he promised to attend. Rookie tells him: 'You can't manage a crisis if you're living in one.'" },
  { number: 10, title: 'The Offer', synopsis: 'Global expansion role is on the table—his career peak, but a guaranteed death sentence for his home life.' },
  { number: 11, title: 'Looking Up', synopsis: 'Jasper chooses to turn down the expansion. Redefines success as mentoring and selectively taking cases that allow him to be home more.' },
  { number: 12, title: 'Five Feet From Home', synopsis: "Jasper at Grace's soccer game. Phone buzzes—a new crisis. This time, he turns it off. Final line mirrors title." },
];

async function main() {
  const fiveFeetDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\Five Feet From Home';

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Populating Book 1 with Real Chapter Content ===\n");

  // Find or create Book 1
  let book1 = await prisma.book.findFirst({
    where: { projectId: project.id, title: 'Five Feet From Home' }
  });

  if (!book1) {
    book1 = await prisma.book.create({
      data: {
        projectId: project.id,
        title: 'Five Feet From Home',
        subtitle: 'The Five-Foot World',
        sortOrder: 1,
        status: 'drafting',
        synopsis: `Jasper Barrett is all in on the job, thriving on the adrenaline and high-stakes problem solving, but with that one tether—his family—that he can never quite cut free from.

Part One: The Five-Foot World (Ch 1-4) - Jasper thrives inside his professional bubble, but cracks start to show.
Part Two: Letting Both Teams Down (Ch 5-8) - He starts failing both at work and at home because his bubble is too small.
Part Three: The Reckoning (Ch 9-12) - Pressure forces him to look beyond the five feet.`
      }
    });
    console.log('Created Book 1');
  }

  // Clear existing chapters
  await prisma.chapter.deleteMany({ where: { bookId: book1.id } });
  console.log('Cleared existing chapters');

  // Extract and create chapters 1-9 with actual content
  for (let i = 1; i <= 9; i++) {
    const chapterContent = await extractDocx(`${fiveFeetDir}\\Chapter ${i}.docx`);
    const outline = chapterOutline[i - 1];

    // Extract first line as title verification or use outline title
    const lines = chapterContent.split('\n').filter(l => l.trim());
    let title = outline.title;

    // Try to extract actual title from content
    const titleMatch = lines[0]?.match(/Chapter \d+\s*[–-]\s*(.+)/i);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }

    // Determine part
    let tags = '';
    if (i <= 4) tags = 'Part One: The Five-Foot World';
    else if (i <= 8) tags = 'Part Two: Letting Both Teams Down';
    else tags = 'Part Three: The Reckoning';

    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book1.id,
        number: i,
        title: title,
        synopsis: outline.synopsis,
        draftText: chapterContent,
        pov: 'Jasper Barrett',
        status: chapterContent.length > 1000 ? 'draft' : 'planned',
        wordCount: chapterContent.split(/\s+/).length,
        tags: tags
      }
    });
    console.log(`Created Ch ${i}: ${title} (${chapterContent.split(/\s+/).length} words)`);
  }

  // Create placeholder chapters 10-12 from outline (not yet written)
  for (let i = 10; i <= 12; i++) {
    const outline = chapterOutline[i - 1];
    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book1.id,
        number: i,
        title: outline.title,
        synopsis: outline.synopsis,
        pov: 'Jasper Barrett',
        status: 'planned',
        tags: 'Part Three: The Reckoning'
      }
    });
    console.log(`Created Ch ${i}: ${outline.title} (planned - no draft yet)`);
  }

  // Update book with word count
  const chapters = await prisma.chapter.findMany({
    where: { bookId: book1.id },
    select: { wordCount: true }
  });
  const totalWords = chapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);

  console.log(`\n=== SUMMARY ===`);
  console.log(`Book: ${book1.title}`);
  console.log(`Chapters: 12 (9 drafted, 3 planned)`);
  console.log(`Total words: ${totalWords}`);

  await prisma.$disconnect();
}

main().catch(console.error);
