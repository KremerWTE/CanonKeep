import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Building Books from DOCUMENTED Storylines ONLY ===\n");

  // Get or create series
  let series = await prisma.bookSeries.findFirst({
    where: { name: 'Jasper Barrett Series', projectId: project.id }
  });

  if (!series) {
    series = await prisma.bookSeries.create({
      data: {
        projectId: project.id,
        name: 'Jasper Barrett Series',
        premise: 'The saga of Jasper Barrett, BSS, and the world of elite crisis management.',
        themes: JSON.stringify(['Romantic Suspense', 'Thriller', 'Family', 'Power']),
        totalBooks: 4
      }
    });
    console.log('Created series: Jasper Barrett Series');
  }

  // ============ BOOKS FROM DOCUMENTS ============
  // Based on jasper_expansion_extracted.txt phases

  const books = [
    {
      projectId: project.id,
      sortOrder: 1,
      title: 'Five Feet From Home',
      subtitle: 'The Forge',
      synopsis: `FROM DOCUMENT: Phase 1 - Charlotte (CLT) as the Forge

WHY CLT: Jasper starts in Charlotte because it's a financial hub but not oversaturated like NYC. He quietly builds his first network with hedge funds, private equity shops, and Southern family offices.

KEY CATALYST: A scandal tied to a NASCAR sponsor and a regional bank almost collapsing gives Jasper his first big case. He earns a reputation for quietly fixing problems without headlines.

CHARACTER DEVELOPMENT: Harper and Elena anchor him, while Addie is just entering the story as the rough but sharp assistant who evolves into a force of her own.`,
      status: 'outlined'
    },
    {
      projectId: project.id,
      sortOrder: 2,
      title: 'The Bridge',
      subtitle: 'East Coast Expansion',
      synopsis: `FROM DOCUMENT: Phase 2 - East Coast Expansion (NYC/DC/Boston)

NYC: After CLT success, Jasper is pulled into Wall Street and media crises (anchors, networks, hedge funds). NYC becomes the second hub, giving him international visibility.

DC: Leveraging military/intel ties, BSS builds influence in defense contracting, lobbying scandals, and foreign-agent registration cases. Hawk's Tier 1 background starts feeding into these contracts.

BOSTON: BSS plugs into biotech and elite universities - Addie and Kendra's analyst networks thrive here. Claire's reappearance adds tension.`,
      status: 'outlined'
    },
    {
      projectId: project.id,
      sortOrder: 3,
      title: 'The Expansion',
      subtitle: 'London to LA',
      synopsis: `FROM DOCUMENT: Phases 3-5

LONDON HUB (THE BRIDGE): With transatlantic financial clients and Catholic/royalty networks, London becomes the natural first international hub. Harper's European connections and Elena's society links open doors.
MAJOR CASE: A European bank + Vatican-adjacent scandal gives BSS its legitimacy across the pond.

MIDWEST OUTPOST: Jasper sees manufacturing, agriculture tech, and energy infrastructure as new power arenas. A food processing scandal tied to biotech gives Jasper his entry.

LOS ANGELES: Scandals in Hollywood, streaming companies, AI/biotech startups. BSS fixes a crisis involving a major studio CEO, a hedge fund tied to Silicon Valley, and cartel-backed film financing.`,
      status: 'outlined'
    },
    {
      projectId: project.id,
      sortOrder: 4,
      title: 'The Crucible',
      subtitle: 'Global Power',
      synopsis: `FROM DOCUMENT: Phases 6-7 + Family Transition

ASIA (Singapore, Tokyo, Hong Kong): Jasper realizes the future of finance + tech influence is shifting east. Singapore becomes the command hub due to its neutrality and wealth concentration.
ANCHOR CASE: A scandal mixing sovereign wealth funds, shipping lanes, and cyber theft. BSS prevents an international incident.
CHARACTER ROLE: Addie and Hawk become the lead operators for Asia cases, proving their rise from apprentices to equals.

MIDDLE EAST (Dubai, Doha, Riyadh): BSS moves into oil, energy diversification, and sovereign influence. The final frontier where money, politics, and religion intersect.
ANCHOR CASE: BSS helps navigate a crisis between a Gulf sovereign fund, a European defense contractor, and U.S. interests.

JASPER'S TRANSITION (from document): Work 90% → Work 75%. The missed play, first shift, family dinners becoming sacred.
ELENA'S RETURN: Maision Aurelia becomes global event and lifestyle management firm.`,
      status: 'outlined'
    }
  ];

  const createdBooks: any[] = [];

  for (const book of books) {
    let existing = await prisma.book.findFirst({
      where: { projectId: project.id, title: book.title }
    });

    if (!existing) {
      existing = await prisma.book.create({ data: book });
      console.log(`Created Book ${book.sortOrder}: ${book.title}`);
    } else {
      existing = await prisma.book.update({
        where: { id: existing.id },
        data: book
      });
      console.log(`Updated Book ${book.sortOrder}: ${book.title}`);
    }
    createdBooks.push(existing);
  }

  // ============ CHAPTERS FROM DOCUMENTS ============
  console.log("\n--- Creating Chapters from Documents ---\n");

  // Chapters based ONLY on documented scenes from jasper_elena_extracted.txt
  const chaptersData = [
    // BOOK 1 - Charlotte/The Forge
    {
      sortOrder: 1,
      chapters: [
        {
          number: 1,
          title: 'The NASCAR Scandal',
          synopsis: `FROM DOCUMENT: "A scandal tied to a NASCAR sponsor and a regional bank almost collapsing gives Jasper his first big case. He earns a reputation for quietly fixing problems without headlines."`,
          pov: 'Jasper Barrett',
          tags: 'Charlotte'
        },
        {
          number: 2,
          title: 'Addie Enters',
          synopsis: `FROM DOCUMENT: "Addie is just entering the story as the rough but sharp assistant who evolves into a force of her own."`,
          pov: 'Jasper Barrett',
          tags: 'Charlotte'
        }
      ]
    },
    // BOOK 2 - East Coast
    {
      sortOrder: 2,
      chapters: [
        {
          number: 1,
          title: 'Wall Street Crisis',
          synopsis: `FROM DOCUMENT: "After CLT success, Jasper is pulled into Wall Street and media crises (anchors, networks, hedge funds). NYC becomes the second hub, giving him international visibility."`,
          pov: 'Jasper Barrett',
          tags: 'New York City'
        },
        {
          number: 2,
          title: 'DC Power',
          synopsis: `FROM DOCUMENT: "Leveraging military/intel ties, BSS builds influence in defense contracting, lobbying scandals, and foreign-agent registration cases. Hawk's Tier 1 background starts feeding into these contracts."`,
          pov: 'Hawk',
          tags: 'Washington DC'
        },
        {
          number: 3,
          title: 'Boston Biotech',
          synopsis: `FROM DOCUMENT: "BSS plugs into biotech and elite universities - Addie and Kendra's analyst networks thrive here. Claire's reappearance adds tension."`,
          pov: 'Addie',
          tags: 'Boston'
        }
      ]
    },
    // BOOK 3 - London to LA
    {
      sortOrder: 3,
      chapters: [
        {
          number: 1,
          title: 'The Vatican Scandal',
          synopsis: `FROM DOCUMENT: "A European bank + Vatican-adjacent scandal gives BSS its legitimacy across the pond. They prove they can handle aristocracy, monarchy, and Vatican ties with discretion."`,
          pov: 'Jasper Barrett',
          tags: 'London'
        },
        {
          number: 2,
          title: 'Midwest Grit',
          synopsis: `FROM DOCUMENT: "A food processing scandal tied to biotech and large-scale farming gives Jasper his entry. The Midwest team provides grounding against the glamour of London/NYC. More 'blue collar power brokers' - Jasper respects their grit."`,
          pov: 'Jasper Barrett',
          tags: 'Chicago/Detroit'
        },
        {
          number: 3,
          title: 'Hollywood Heat',
          synopsis: `FROM DOCUMENT: "BSS fixes a crisis involving a major studio CEO, a hedge fund tied to Silicon Valley, and cartel-backed film financing."`,
          pov: 'Addie',
          tags: 'Los Angeles'
        }
      ]
    },
    // BOOK 4 - Global + Family Transition
    {
      sortOrder: 4,
      chapters: [
        {
          number: 1,
          title: 'Singapore Command',
          synopsis: `FROM DOCUMENT: "Jasper realizes the future of finance + tech influence is shifting east. Singapore becomes the command hub due to its neutrality and wealth concentration. A scandal mixing sovereign wealth funds, shipping lanes, and cyber theft. BSS prevents an international incident."`,
          pov: 'Hawk',
          tags: 'Singapore'
        },
        {
          number: 2,
          title: 'Middle East Frontier',
          synopsis: `FROM DOCUMENT: "BSS moves into oil, energy diversification, and sovereign influence. The final frontier where money, politics, and religion intersect. BSS helps navigate a crisis between a Gulf sovereign fund, a European defense contractor, and U.S. interests."`,
          pov: 'Jasper Barrett',
          tags: 'Dubai/Doha'
        },
        {
          number: 3,
          title: 'The Missed Play',
          synopsis: `FROM DOCUMENT (Scene 1): "Jasper adjusted the cuff of his tailored jacket as the boardroom lights dimmed for the presentation. A billion-dollar deal on the line... But when his phone buzzed, the image that lit the screen wasn't another crisis alert-it was Elena, streaming a grainy video of their daughter on stage. She wore a crown made of paper stars... Later that night, Elena didn't yell. She simply asked, 'How many more plays do you want to watch on someone else's phone?'"`,
          pov: 'Jasper Barrett',
          tags: 'Charlotte'
        },
        {
          number: 4,
          title: 'The First Shift',
          synopsis: `FROM DOCUMENT (Scene 2): "He started small. Lunch meetings instead of late-night dinners. Delegating the endless travel to Addie and Bella... At first, he twitched like an addict, glancing at flight schedules and hotel bookings. But then he came home on a Tuesday evening and sat at the dinner table... This is harder than a negotiation in Dubai. But it was also better."`,
          pov: 'Jasper Barrett',
          tags: 'Charlotte'
        },
        {
          number: 5,
          title: 'Candlelit Kitchen',
          synopsis: `FROM DOCUMENT: "Elena padded into the kitchen barefoot... On the marble: a candle Addie had snuck in earlier ('No more conference-room lighting in your marriage, please.')... 'Put it down,' Elena said, striking a match. 'No clients. Date night. Here. Now.'... Elena forked pasta from a cooling pan. It wasn't plated; it was truce food."`,
          pov: 'Elena',
          tags: 'Barrett Compound'
        },
        {
          number: 6,
          title: 'The Compound Office',
          synopsis: `FROM DOCUMENT (Scene 1 - Office at the Compound): "Jasper stared at the new wing of the compound. Floor-to-ceiling glass, oak desks, a war-room-style screen against one wall. It wasn't his idea. Addie leaned back in one of the new chairs, smirking. 'You can thank us later. You're not allowed to use the office was too far as an excuse anymore.'"`,
          pov: 'Addie',
          tags: 'Barrett Compound'
        },
        {
          number: 7,
          title: 'Parallel Cradles',
          synopsis: `FROM DOCUMENT: "By August, the nursery was no longer quiet. Elena's newborn son slept in a carved cradle beside the rocking chair. Across the room, a second cradle stood waiting-painted white... Kendra eased herself down beside Elena, one arm wrapped protectively over her own newborn daughter. They rocked in time, two chairs, two babies..."`,
          pov: 'Elena/Kendra',
          tags: 'Barrett Compound'
        },
        {
          number: 8,
          title: 'The Barn Play',
          synopsis: `FROM DOCUMENT (Christmas Eve): "The barn smelled of hay and cinnamon... 'Places!' Grace shouted, wearing a cape made from a plaid scarf and a crown cut from gold poster board... When it ended-on time, more or less-Grace bowed so low her crown slid off. She straightened, looked at Jasper, and pointed at the empty bale beside him. 'That seat,' she announced to the barn. 'Is never empty anymore.'"`,
          pov: 'Grace/Jasper',
          tags: 'Barrett Compound Barn'
        }
      ]
    }
  ];

  for (const bookData of chaptersData) {
    const book = createdBooks.find(b => b.sortOrder === bookData.sortOrder);
    if (!book) continue;

    for (const chapter of bookData.chapters) {
      const existing = await prisma.chapter.findFirst({
        where: { bookId: book.id, number: chapter.number }
      });

      const chapterData = {
        bookId: book.id,
        projectId: project.id,
        ...chapter
      };

      if (!existing) {
        await prisma.chapter.create({ data: chapterData });
        console.log(`  Created: Book ${bookData.sortOrder}, Ch ${chapter.number}: ${chapter.title}`);
      } else {
        await prisma.chapter.update({
          where: { id: existing.id },
          data: chapterData
        });
        console.log(`  Updated: Book ${bookData.sortOrder}, Ch ${chapter.number}: ${chapter.title}`);
      }
    }
  }

  // Update BookSeries with books JSON for display on series page
  const booksForSeries = createdBooks.map((b, idx) => ({
    number: b.sortOrder,
    title: b.title,
    subtitle: b.subtitle,
    synopsis: b.synopsis
  }));

  await prisma.bookSeries.update({
    where: { id: series.id },
    data: {
      books: JSON.stringify(booksForSeries)
    }
  });
  console.log("\nUpdated BookSeries with books data for display");

  // Summary
  const bookCount = await prisma.book.count({ where: { projectId: project.id } });
  const chapterCount = await prisma.chapter.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Series: ${series.name}`);
  console.log(`Books: ${bookCount}`);
  console.log(`Chapters: ${chapterCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
