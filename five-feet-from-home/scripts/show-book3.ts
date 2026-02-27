import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const book = await prisma.book.findFirst({
    where: { title: { contains: 'Book 3' } },
    include: {
      chapters: {
        orderBy: { number: 'asc' }
      }
    }
  });

  if (!book) {
    console.log('Book 3 not found');
    return;
  }

  console.log('========================================');
  console.log('BOOK 3: THE EXPANSION - 57 Chapters');
  console.log('========================================\n');

  let currentPart = 0;
  for (const ch of book.chapters) {
    // Add part headers
    if (ch.number === 1) {
      console.log('--- PART 1: NEW ROLES & CROSSFIT OPEN (Ch 1-13) ---\n');
    } else if (ch.number === 14) {
      console.log('\n--- PART 2: EAST COAST & QUARTERFINALS (Ch 14-27) ---\n');
    } else if (ch.number === 28) {
      console.log('\n--- PART 3: SEMIFINALS & POH BUILDING (Ch 28-41) ---\n');
    } else if (ch.number === 42) {
      console.log('\n--- PART 4: THE GAMES & NYC (Ch 42-52) ---\n');
    } else if (ch.number === 53) {
      console.log('\n--- PART 5: THE CABIN & PROMISE RING (Ch 53-57) ---\n');
    }

    console.log(`CH ${ch.number}: ${ch.title}`);
    console.log(`POV: ${ch.pov} | Location: ${ch.tags}`);
    console.log(ch.synopsis);
    console.log('');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
