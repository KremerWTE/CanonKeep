import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== SYNCING CHAPTER SUMMARIES TO SERIES ===\n');

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // Get Jasper Barrett Series
  const jasperSeries = await prisma.bookSeries.findFirst({
    where: { name: 'Jasper Barrett Series' }
  });

  if (!jasperSeries) {
    console.log('Jasper Barrett Series not found');
    return;
  }

  // Get all books with their chapters
  const books = await prisma.book.findMany({
    where: { projectId: project.id },
    include: {
      chapters: {
        orderBy: { number: 'asc' }
      }
    },
    orderBy: { sortOrder: 'asc' }
  });

  // Build the books JSON with chapter summaries
  const booksWithChapters = books
    .filter(b => b.sortOrder && b.sortOrder > 0) // Only books with valid sortOrder
    .map(book => ({
      number: book.sortOrder,
      title: book.title,
      synopsis: book.synopsis?.split('\n')[0] || '', // First line of synopsis
      chapters: book.chapters.map(ch => ({
        number: ch.number,
        title: ch.title,
        pov: ch.pov,
        location: ch.tags,
        summary: ch.synopsis
      }))
    }));

  console.log(`Found ${booksWithChapters.length} books with chapters:\n`);
  booksWithChapters.forEach(b => {
    console.log(`Book ${b.number}: ${b.title} - ${b.chapters.length} chapters`);
  });

  // Update the series with the books data
  await prisma.bookSeries.update({
    where: { id: jasperSeries.id },
    data: {
      books: JSON.stringify(booksWithChapters),
      totalBooks: booksWithChapters.length
    }
  });

  console.log('\n=== JASPER BARRETT SERIES UPDATED ===');
  console.log(`Total books: ${booksWithChapters.length}`);
  console.log(`Total chapters: ${booksWithChapters.reduce((sum, b) => sum + b.chapters.length, 0)}`);

  await prisma.$disconnect();
}

main().catch(console.error);
