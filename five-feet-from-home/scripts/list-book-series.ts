import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const series = await prisma.bookSeries.findMany();

  console.log('=== BOOK SERIES ===\n');

  for (const s of series) {
    console.log(`${s.name} - ${s.totalBooks} books (${s.protagonist})`);
    if (s.books) {
      try {
        const books = JSON.parse(s.books);
        books.forEach((b: any, i: number) => {
          console.log(`  ${i+1}. ${b.title}`);
        });
      } catch {}
    }
    console.log('');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
