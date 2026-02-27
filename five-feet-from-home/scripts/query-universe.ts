import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const series = await prisma.bookSeries.findMany({
    select: { id: true, name: true, totalBooks: true, books: true, status: true, protagonist: true }
  });
  console.log('=== EXISTING BOOK SERIES ===');
  series.forEach(s => {
    const bookCount = s.books ? JSON.parse(s.books).length : 0;
    console.log(`- ${s.name}`);
    console.log(`  Protagonist: ${s.protagonist || 'Not set'}`);
    console.log(`  Books: ${bookCount} defined / ${s.totalBooks || '?'} planned`);
    console.log(`  Status: ${s.status}`);
  });

  const books = await prisma.book.findMany({
    select: { title: true, subtitle: true, sortOrder: true },
    orderBy: { sortOrder: 'asc' }
  });
  console.log('\n=== BOOK RECORDS ===');
  books.forEach(b => console.log(`- Book ${b.sortOrder}: ${b.title}${b.subtitle ? ' - ' + b.subtitle : ''}`));

  const chapters = await prisma.chapter.count();
  console.log(`\n=== TOTAL CHAPTERS: ${chapters} ===`);

  await prisma.$disconnect();
}

main();
