import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const books = await prisma.book.findMany({
    include: { chapters: true },
    orderBy: { sortOrder: 'asc' }
  });

  console.log(`Total Books: ${books.length}\n`);

  for (const book of books) {
    console.log(`${book.title}`);
    console.log(`  Chapters: ${book.chapters.length}`);
    console.log(`  Status: ${book.status}`);
    if (book.chapters.length > 0) {
      console.log(`  First chapter: ${book.chapters[0].title}`);
      console.log(`  Last chapter: ${book.chapters[book.chapters.length - 1].title}`);
    }
    console.log('');
  }

  // Also check BookSeries
  const series = await prisma.bookSeries.findMany();
  console.log(`\nBook Series: ${series.length}`);
  for (const s of series) {
    console.log(`  - ${s.name} (${s.seriesType || 'Unknown type'})`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
