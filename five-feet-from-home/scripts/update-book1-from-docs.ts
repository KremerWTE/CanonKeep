import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Updating Book 1 with ACTUAL Chapter Structure from Outline.docx ===\n");

  // Find the Book 1 record
  const book1 = await prisma.book.findFirst({
    where: { projectId: project.id, title: 'Five Feet From Home' }
  });

  if (!book1) {
    console.error('Book 1 not found');
    return;
  }

  // Delete existing chapters for this book to replace with correct ones
  await prisma.chapter.deleteMany({
    where: { bookId: book1.id }
  });
  console.log('Cleared existing chapters for Book 1');

  // ACTUAL chapters from Outline.docx
  const chapters = [
    // Part One — The Five-Foot World
    {
      number: 1,
      title: 'The Call',
      synopsis: '2:17 a.m., London data breach. Jasper snaps into operational mode, assembling a team and flying out before dawn. First glimpse of the family anchor he leaves behind.',
      pov: 'Jasper Barrett',
      tags: 'Part One: The Five-Foot World, London'
    },
    {
      number: 2,
      title: 'War Room',
      synopsis: 'Jasper in his element: handling high-pressure executives, dictating media strategy, firefighting misinformation. Flashes of personal life only in the quiet in-between.',
      pov: 'Jasper Barrett',
      tags: 'Part One: The Five-Foot World, London'
    },
    {
      number: 3,
      title: 'Passing Through',
      synopsis: "Brief stop at home between trips. He's physically present but mentally elsewhere, already preparing for the next client emergency.",
      pov: 'Jasper Barrett',
      tags: 'Part One: The Five-Foot World, Charlotte'
    },
    {
      number: 4,
      title: 'The Five-Foot Rule',
      synopsis: "We see how Jasper survives pressure: focusing only on what's within immediate reach. Great for the job, destructive at home.",
      pov: 'Jasper Barrett',
      tags: 'Part One: The Five-Foot World'
    },
    // Part Two — Letting Both Teams Down
    {
      number: 5,
      title: 'Missed Flight Home',
      synopsis: "Chooses to stay an extra day in Hong Kong to secure a contract. Meanwhile, Grace (his daughter) has an asthma attack. Elena (his wife) leaves him a sharp voicemail he doesn't answer.",
      pov: 'Jasper Barrett',
      tags: 'Part Two: Letting Both Teams Down, Hong Kong'
    },
    {
      number: 6,
      title: 'A Slip in the Line',
      synopsis: "A junior associate mishandles a key client relationship because Jasper wasn't watching the bigger picture. First time a colleague questions his leadership.",
      pov: 'Jasper Barrett',
      tags: 'Part Two: Letting Both Teams Down'
    },
    {
      number: 7,
      title: 'Our Team',
      synopsis: 'At home, Grace asks if Daddy is "on our team." Jasper freezes. The words stick in his head during the next crisis.',
      pov: 'Jasper Barrett/Grace',
      tags: 'Part Two: Letting Both Teams Down, Charlotte'
    },
    {
      number: 8,
      title: 'The Divide',
      synopsis: "Work colleagues notice Jasper's distraction. Elena stops calling him when things break at home—she just handles them herself.",
      pov: 'Jasper Barrett',
      tags: 'Part Two: Letting Both Teams Down'
    },
    // Part Three — The Reckoning
    {
      number: 9,
      title: 'Rock Bottom',
      synopsis: `Chicago contamination case. Jasper arrives, executes flawlessly, but misses Grace's recital—the one he promised to attend. Rookie consultant tells him, "You can't manage a crisis if you're living in one."`,
      pov: 'Jasper Barrett',
      tags: 'Part Three: The Reckoning, Chicago'
    },
    {
      number: 10,
      title: 'The Offer',
      synopsis: 'Global expansion role is on the table—his career peak, but a guaranteed death sentence for his home life.',
      pov: 'Jasper Barrett',
      tags: 'Part Three: The Reckoning'
    },
    {
      number: 11,
      title: 'Looking Up',
      synopsis: 'Jasper chooses to turn down the expansion. Redefines success as mentoring and selectively taking cases that allow him to be home more.',
      pov: 'Jasper Barrett',
      tags: 'Part Three: The Reckoning'
    },
    {
      number: 12,
      title: 'Five Feet From Home',
      synopsis: `Jasper at Grace's soccer game. Phone buzzes—a new crisis. This time, he turns it off. Final line mirrors title: "The world's bigger than five feet, but it's where I stand that matters."`,
      pov: 'Jasper Barrett',
      tags: 'Part Three: The Reckoning, Charlotte'
    }
  ];

  for (const chapter of chapters) {
    await prisma.chapter.create({
      data: {
        bookId: book1.id,
        projectId: project.id,
        ...chapter
      }
    });
    console.log(`Created: Ch ${chapter.number}: ${chapter.title}`);
  }

  // Update book synopsis
  await prisma.book.update({
    where: { id: book1.id },
    data: {
      synopsis: `Jasper Barrett is all in on the job, thriving on the adrenaline and high-stakes problem solving, but with that one tether—his family—that he can never quite cut free from.

Part One: The Five-Foot World - Jasper thrives inside his professional bubble, but cracks start to show.
Part Two: Letting Both Teams Down - He starts failing both at work and at home because his bubble is too small.
Part Three: The Reckoning - Pressure forces him to look beyond the five feet.`
    }
  });

  console.log(`\nUpdated Book 1 with 12 chapters from Outline.docx`);

  await prisma.$disconnect();
}

main().catch(console.error);
