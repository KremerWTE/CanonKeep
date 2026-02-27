import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING BOOKS AND CHAPTERS (REAL DATA ONLY) ===\n");

  // FIVE FEET FROM HOME - BOOK 1
  // From Outline.docx - these are the documented chapters
  const fiveFeetChapters = [
    {
      number: 1,
      title: "The Call",
      synopsis: "2:17 a.m., London data breach. Jasper snaps into operational mode, assembling a team and flying out before dawn. First glimpse of the family anchor he leaves behind.",
      pov: "Jasper Barrett"
    },
    {
      number: 2,
      title: "War Room",
      synopsis: "Jasper in his element: handling high-pressure executives, dictating media strategy, firefighting misinformation. Flashes of personal life only in the quiet in-between.",
      pov: "Jasper Barrett"
    },
    {
      number: 3,
      title: "Passing Through",
      synopsis: "Brief stop at home between trips. He's physically present but mentally elsewhere, already preparing for the next client emergency.",
      pov: "Jasper Barrett"
    },
    {
      number: 4,
      title: "The Five-Foot Rule",
      synopsis: "We see how Jasper survives pressure: focusing only on what's within immediate reach. Great for the job, destructive at home.",
      pov: "Jasper Barrett"
    },
    {
      number: 5,
      title: "Missed Flight Home",
      synopsis: "Chooses to stay an extra day in Hong Kong to secure a contract. Meanwhile, Grace (his daughter) has an asthma attack. Elena leaves him a sharp voicemail he doesn't answer.",
      pov: "Jasper Barrett"
    },
    {
      number: 6,
      title: "A Slip in the Line",
      synopsis: "A junior associate mishandles a key client relationship because Jasper wasn't watching the bigger picture. First time a colleague questions his leadership.",
      pov: "Jasper Barrett"
    },
    {
      number: 7,
      title: "Our Team",
      synopsis: 'At home, Grace asks if Daddy is "on our team." Jasper freezes. The words stick in his head during the next crisis.',
      pov: "Jasper Barrett"
    },
    {
      number: 8,
      title: "The Divide",
      synopsis: "Work colleagues notice Jasper's distraction. Elena stops calling him when things break at home—she just handles them herself.",
      pov: "Jasper Barrett"
    },
    {
      number: 9,
      title: "Rock Bottom",
      synopsis: 'Chicago contamination case. Jasper arrives, executes flawlessly, but misses Grace\'s recital—the one he promised to attend. Rookie consultant tells him, "You can\'t manage a crisis if you\'re living in one."',
      pov: "Jasper Barrett"
    },
    {
      number: 10,
      title: "The Offer",
      synopsis: "Global expansion role is on the table—his career peak, but a guaranteed death sentence for his home life.",
      pov: "Jasper Barrett"
    },
    {
      number: 11,
      title: "Looking Up",
      synopsis: "Jasper chooses to turn down the expansion. Redefines success as mentoring and selectively taking cases that allow him to be home more.",
      pov: "Jasper Barrett"
    },
    {
      number: 12,
      title: "Five Feet From Home",
      synopsis: 'Jasper at Grace\'s soccer game. Phone buzzes—a new crisis. This time, he turns it off. Final line mirrors title: "The world\'s bigger than five feet, but it\'s where I stand that matters."',
      pov: "Jasper Barrett"
    }
  ];

  // Create or update the book first
  let fiveFeetBook = await prisma.book.findFirst({
    where: { title: "Five Feet From Home", projectId: project.id }
  });

  if (!fiveFeetBook) {
    fiveFeetBook = await prisma.book.create({
      data: {
        projectId: project.id,
        title: "Five Feet From Home",
        subtitle: "A Jasper Barrett Novel",
        synopsis: "Jasper Barrett is a world-class corporate crisis manager who lives by the five-foot rule: focus only on what's within immediate reach. But when his obsessive focus on work begins to cost him his family, he must learn that the most important crises are the ones happening at home.",
        status: "drafting",
        sortOrder: 1
      }
    });
    console.log("Created book: Five Feet From Home");
  } else {
    console.log("Book exists: Five Feet From Home");
  }

  // Add chapters
  for (const chapter of fiveFeetChapters) {
    const existing = await prisma.chapter.findFirst({
      where: {
        projectId: project.id,
        bookId: fiveFeetBook.id,
        number: chapter.number
      }
    });

    if (!existing) {
      await prisma.chapter.create({
        data: {
          projectId: project.id,
          bookId: fiveFeetBook.id,
          number: chapter.number,
          title: chapter.title,
          synopsis: chapter.synopsis,
          pov: chapter.pov,
          sortOrder: chapter.number,
          status: "draft"
        }
      });
      console.log(`  Created Chapter ${chapter.number}: ${chapter.title}`);
    } else {
      await prisma.chapter.update({
        where: { id: existing.id },
        data: {
          title: chapter.title,
          synopsis: chapter.synopsis,
          pov: chapter.pov
        }
      });
      console.log(`  Updated Chapter ${chapter.number}: ${chapter.title}`);
    }
  }

  // Also ensure we have the BookSeries entry
  const existingSeries = await prisma.bookSeries.findFirst({
    where: { name: "Jasper Barrett Series", projectId: project.id }
  });

  if (!existingSeries) {
    await prisma.bookSeries.create({
      data: {
        projectId: project.id,
        name: "Jasper Barrett Series",
        seriesType: "Main",
        protagonist: "Jasper Barrett",
        premise: "Jasper Barrett is a blue-collar kid from Gastonia, NC who became a world-class corporate crisis manager. The series follows his journey balancing family, work, and the high-stakes world of BSS (Barrett Strategic Solutions).",
        themes: JSON.stringify(['Work-Life Balance', 'Family', 'Crisis Management', 'Leadership', 'Legacy']),
        status: "in-progress",
        readingOrder: 1,
        books: JSON.stringify([
          { title: "Five Feet From Home", status: "drafting" }
        ])
      }
    });
    console.log("\nCreated Series: Jasper Barrett Series");
  }

  // Summary
  const bookCount = await prisma.book.count({ where: { projectId: project.id } });
  const chapterCount = await prisma.chapter.count({ where: { projectId: project.id } });
  const seriesCount = await prisma.bookSeries.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Books: ${bookCount}`);
  console.log(`Chapters: ${chapterCount}`);
  console.log(`Series: ${seriesCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
