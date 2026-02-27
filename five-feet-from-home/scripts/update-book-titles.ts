import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Update the main series with correct book titles
  const series = await prisma.bookSeries.findFirst({
    where: { name: 'Five Feet From Home' }
  });

  if (series) {
    await prisma.bookSeries.update({
      where: { id: series.id },
      data: {
        books: JSON.stringify([
          {
            number: 1,
            title: 'Five Feet From Home',
            synopsis: 'Jasper is constantly pulled away by crises (London data breach, Hong Kong bribery, etc.) while Elena faces pregnancy complications, grayscale brain diagnosis, difficult birth, postpartum. Long stretches without intimacy. Addie becomes Elena\'s rock. Ends with African off-books operation and Elena-Addie bond deepening.'
          },
          {
            number: 2,
            title: 'TBD',
            synopsis: 'Crises continue (European trade, Silicon Valley breach, biotech sabotage, etc.). Addie evolves into fixer, conflicts with Jasper. Kendra becomes Addie\'s analyst. Cabin threesome (Addie, Kendra, Elena). Ridge & Julia engagement. Harper dating/engagement. Charlotte Cole wedding.'
          },
          {
            number: 3,
            title: 'The Phoenix Rising',
            synopsis: 'TBD - Title confirmed'
          },
          {
            number: 4,
            title: 'TBD',
            synopsis: 'TBD'
          },
        ]),
      }
    });
    console.log('Updated Five Feet From Home series with book titles');
  }

  // Update crisis records with correct book titles
  await prisma.crisis.updateMany({
    where: { bookAppearance: { contains: 'Book 1' } },
    data: { bookAppearance: 'Book 1 - Five Feet From Home' }
  });
  console.log('Updated Book 1 crises with title');

  // Update events
  await prisma.event.updateMany({
    where: { timelineRef: 'Book 1' },
    data: { timelineRef: 'Book 1 - Five Feet From Home' }
  });

  await prisma.event.updateMany({
    where: { timelineRef: 'Book 2' },
    data: { timelineRef: 'Book 2 - TBD' }
  });

  console.log('Updated events with book titles');
  console.log('\nBook titles:');
  console.log('  Book 1: Five Feet From Home');
  console.log('  Book 2: TBD (what is the title?)');
  console.log('  Book 3: The Phoenix Rising');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
