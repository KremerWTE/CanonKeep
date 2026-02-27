import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const books = await prisma.book.findMany();
  console.log("Books:");
  books.forEach(b => {
    console.log(`  - id: ${b.id}, title: ${b.title}, sortOrder: ${b.sortOrder}`);
  });
  await prisma.$disconnect();
}

main();
