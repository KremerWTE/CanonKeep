import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const book = await prisma.book.findFirst({
    where: { title: { contains: 'Book 4' } },
    include: {
      chapters: {
        orderBy: { number: 'asc' }
      }
    }
  });

  if (!book) {
    console.log('Book 4 not found');
    return;
  }

  console.log('================================================');
  console.log('BOOK 4: THE BREAKING POINT - 45 Chapters');
  console.log('================================================\n');

  for (const ch of book.chapters) {
    // Add part headers
    if (ch.number === 1) {
      console.log('--- PART 1: DENVER CRISIS (Ch 1-12) ---\n');
    } else if (ch.number === 13) {
      console.log('\n--- PART 2: GLOBAL DETOUR (Ch 13-24) ---\n');
    } else if (ch.number === 25) {
      console.log('\n--- PART 3: THE UNRAVELING (Ch 25-36) ---\n');
    } else if (ch.number === 37) {
      console.log('\n--- PART 4: THE BREAKING (Ch 37-45) ---\n');
    }

    console.log(`CH ${ch.number}: ${ch.title}`);
    console.log(`POV: ${ch.pov} | Location: ${ch.tags}`);
    console.log(ch.synopsis);
    console.log('');
  }

  console.log('================================================');
  console.log('ENDING: Cole finds Addie on the office floor at 2am');
  console.log('        Heart arrhythmia from caffeine and exhaustion');
  console.log('        Ambulance sirens approaching...');
  console.log('================================================');

  await prisma.$disconnect();
}

main().catch(console.error);
