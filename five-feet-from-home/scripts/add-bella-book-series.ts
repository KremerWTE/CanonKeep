import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Bella's Book Series (Wild at Heart - My Fair Lady Theme)...\n");

  // Check if series exists
  const existingSeries = await prisma.bookSeries.findFirst({
    where: { name: { contains: 'Wild at Heart' } }
  });

  const bellaBooks = [
    {
      number: 1,
      title: "Wouldn't It Be Loverly",
      subtitle: "The dream of belonging, before anyone saw her worth",
      synopsis: "Bella's journey from cafe/bookstore childhood through Boston College sorority life to Boston finance career. The formation of her self-worth struggles and her quiet dream of the Wives Club."
    },
    {
      number: 2,
      title: "The Rain in Spain",
      subtitle: "The breakthrough - learning she could be more",
      synopsis: "Bella joins BSS, asks Addie to mentor her, survives the Europe crisis with Doc's help, and begins fire pit rituals with Hawk. Transformation from analyst to fixer."
    },
    {
      number: 3,
      title: "I Could Have Danced All Night",
      subtitle: "The moment she was finally chosen",
      synopsis: "The engagement dinner with three gifts - the Wives Club pendant, the bonus check, and the leather-bound 'My Fair Lady' signed by Mom (Addie) and Dad (Hawk). Bella crying in the gym. Finally belonging."
    },
    {
      number: 4,
      title: "Show Me",
      subtitle: "Learning to trust love again",
      synopsis: "Bella at Mandy's ranch in Denver. Former Agency operative Mandy teaches her slow, safe intimacy. First real romantic healing. But Bella wants kids someday and Mandy doesn't."
    },
    {
      number: 5,
      title: "Black Moves Second",
      subtitle: "She was always the responder - now she makes her move",
      synopsis: "Matt's patient courtship. Bella learning to receive love without suspicion. The proposal, the wedding with Hawk walking her down the aisle, becoming the Queen who claims her Black King."
    },
    {
      number: 6,
      title: "I've Grown Accustomed to Her Face",
      subtitle: "Building her empire",
      synopsis: "Bella as married woman, POH page, and empire builder. TX Event Support, COO/Marketing at Maison Aurelia, her own ventures. No longer the #2 or #3 - finally the leader."
    },
    {
      number: 7,
      title: "A Hymn to Her",
      subtitle: "Motherhood and legacy",
      synopsis: "Bella and Matt having children. Full circle from her own childhood. Passing down what she learned. The legacy continues. (Optional future book)"
    }
  ];

  if (existingSeries) {
    // Update existing
    await prisma.bookSeries.update({
      where: { id: existingSeries.id },
      data: {
        name: "Wild at Heart: Bella's Story",
        seriesType: 'Spin-off',
        protagonist: 'Bella',
        premise: "Bella's journey from self-doubting background fixer to confident queen. Themed around 'My Fair Lady' - the book Addie and Hawk gave her that made her cry. From cafe/bookstore childhood through BSS mentorship to marriage with Matt (the Black King) and building her own empire.",
        themes: JSON.stringify(['Self-worth', 'Found family', 'Chess metaphors', 'Chosen vs. biological family', 'Love after trauma', 'Becoming a leader']),
        totalBooks: 7,
        status: 'planned',
        parentSeries: 'Five Feet From Home',
        connections: "Connects to main series through Addie (mentor/Mom), Hawk (mentor/Dad), Elena (business mentor), Kendra (fellow fixer). Fire pit rituals and chess lessons are central motifs.",
        books: JSON.stringify(bellaBooks),
      }
    });
    console.log('Updated: Wild at Heart: Bella\'s Story');
  } else {
    // Create new
    await prisma.bookSeries.create({
      data: {
        projectId: project.id,
        name: "Wild at Heart: Bella's Story",
        seriesType: 'Spin-off',
        protagonist: 'Bella',
        premise: "Bella's journey from self-doubting background fixer to confident queen. Themed around 'My Fair Lady' - the book Addie and Hawk gave her that made her cry. From cafe/bookstore childhood through BSS mentorship to marriage with Matt (the Black King) and building her own empire.",
        themes: JSON.stringify(['Self-worth', 'Found family', 'Chess metaphors', 'Chosen vs. biological family', 'Love after trauma', 'Becoming a leader']),
        totalBooks: 7,
        status: 'planned',
        readingOrder: 10, // After main series
        parentSeries: 'Five Feet From Home',
        connections: "Connects to main series through Addie (mentor/Mom), Hawk (mentor/Dad), Elena (business mentor), Kendra (fellow fixer). Fire pit rituals and chess lessons are central motifs.",
        books: JSON.stringify(bellaBooks),
      }
    });
    console.log('Created: Wild at Heart: Bella\'s Story');
  }

  const count = await prisma.bookSeries.count();
  console.log(`\nTotal book series: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
