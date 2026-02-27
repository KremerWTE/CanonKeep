import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const series = await prisma.bookSeries.findFirst({ where: { name: 'Five Feet From Home' } });

  if (series) {
    const books = [
      { number: 1, title: 'Five Feet From Home', synopsis: 'Jasper constantly pulled away by crises while Elena faces pregnancy complications, grayscale diagnosis, difficult birth, postpartum. Addie becomes Elena\'s rock.' },
      { number: 2, title: 'A Home Forged in Chaos', synopsis: 'Crises continue. Addie evolves into fixer with conflicts with Jasper. Kendra becomes Addie\'s analyst. Cabin threesome. Ridge/Julia engagement. Harper engagement.' },
      { number: 3, title: 'The Phoenix Rising', synopsis: 'TBD' },
      { number: 4, title: 'TBD', synopsis: 'TBD' }
    ];
    await prisma.bookSeries.update({ where: { id: series.id }, data: { books: JSON.stringify(books) } });
    console.log('Updated series with all book titles');
  }

  await prisma.crisis.updateMany({ where: { bookAppearance: { contains: 'Book 2' } }, data: { bookAppearance: 'Book 2 - A Home Forged in Chaos' } });
  await prisma.event.updateMany({ where: { timelineRef: { contains: 'Book 2' } }, data: { timelineRef: 'Book 2 - A Home Forged in Chaos' } });

  console.log('Updated all Book 2 references to "A Home Forged in Chaos"');
}

main().finally(() => prisma.$disconnect());
