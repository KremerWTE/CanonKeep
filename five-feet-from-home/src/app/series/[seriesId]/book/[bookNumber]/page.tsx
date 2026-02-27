import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

// Safe JSON parse for book arrays (objects with specific structure)
function safeParseBooksArray(str: string | null): any[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ seriesId: string; bookNumber: string }>;
}

// Bella's book chapters data
const bellaBookChapters: Record<number, { parts: { title: string; chapters: { number: number; title: string; summary: string }[] }[] }> = {
  1: {
    parts: [
      {
        title: 'Part One: Foundations (Pre-College)',
        chapters: [
          { number: 1, title: 'The Cafe and The Books', summary: "Bella's childhood in her family's cafe and bookstore. Mother runs the cafe (warm, charismatic), father runs the bookstore (quiet, strategic). Learning to read people through customer service." },
          { number: 2, title: 'High School Attempts at Love', summary: 'Dated a star athlete. Relationship ended when Bella realized she wanted more depth. First pattern of choosing stability over sparks.' },
        ]
      },
      {
        title: 'Part Two: Boston College Years',
        chapters: [
          { number: 3, title: 'The Sorority Shadow', summary: 'Business major at Boston College. Joins sorority but never leads - always #2 or #3. Becomes known for fixing crises behind the scenes.' },
          { number: 4, title: 'The Boy Who Saw Her', summary: 'Junior year law student boyfriend who was genuinely into her. Bella buries herself in school/sorority/cafe work. Ends it before he can "realize she isn\'t worth it."' },
          { number: 5, title: 'The Girl in the Circle', summary: 'Close connection with a sorority sister - emotional and quietly romantic. Circle disapproves. Bella internalizes their judgment.' },
          { number: 6, title: 'Vee Sinclair and the Dream', summary: 'Meets Vivian "Vee" Sinclair from Harvard. Vee is elegant, Ivy-coded - everything Bella thinks she isn\'t. First hears about the Wives Club.' },
          { number: 7, title: 'Goodbye Tessa', summary: 'Graduation. Roommate Tessa goes into event planning. Their lives drift apart. Bella never really replaces that friendship until BSS.' },
        ]
      },
      {
        title: 'Part Three: Boston Professional Years',
        chapters: [
          { number: 8, title: 'The Finance Grind', summary: 'Analyst at mid-tier Boston finance firm. Strong work ethic but never pushes for promotions. Culture feels shallow. Family business struggling post-COVID.' },
          { number: 9, title: 'Galas and Whispers', summary: 'Stays connected to sorority network. Attends charity galas, hears whispers of the Wives Club. Quietly hopes to one day be selected.' },
        ]
      },
      {
        title: 'Part Four: The Bridge to BSS',
        chapters: [
          { number: 10, title: 'The Charity Gala', summary: 'Boston charity gala for her finance firm. Event logistics failing. Bella quietly saves the night. Someone notices - Addie, Harper, or Elena.' },
          { number: 11, title: 'The Ask', summary: 'Initial approach from BSS. Bella\'s hesitation - she doesn\'t think she belongs. She takes the leap anyway.' },
        ]
      },
    ]
  },
  2: {
    parts: [
      {
        title: 'Part One: The Mentorship',
        chapters: [
          { number: 1, title: 'Asking for a Mentor', summary: 'Bella specifically asks Addie to mentor her. Addie accepts. Beginning of the mother-figure dynamic.' },
          { number: 2, title: 'Learning the Ropes', summary: 'Early days at BSS - analyst work. Learning the culture, the players, the stakes.' },
          { number: 3, title: 'The Fire Pit (First Time)', summary: 'First fire pit ritual with Hawk. Two questions: "How are you doing?" and "How can I support you?" Chess metaphors begin.' },
        ]
      },
      {
        title: 'Part Two: Trial by Fire',
        chapters: [
          { number: 4, title: 'Europe Assignment', summary: 'Major BSS operation abroad. High stakes, high pressure.' },
          { number: 5, title: 'Almost Cracked', summary: 'Bella "almost cracked" during the assignment. Hawk had Doc positioned in Europe specifically for this. First glimpse of Hawk\'s protective network.' },
          { number: 6, title: 'Recovery and Return', summary: 'Processing what happened. Addie\'s support through the aftermath. Decision to keep going.' },
        ]
      },
      {
        title: 'Part Three: The Transformation',
        chapters: [
          { number: 7, title: 'Range Training', summary: 'Hawk teaches shooting and tactics. Physical competence building confidence.' },
          { number: 8, title: 'Chess Lessons', summary: 'Hawk\'s Afghanistan story - losing two men when he misread the board. "The cost of misreading the board, Bella. Sometimes you don\'t just lose the game - you lose the pieces that trusted you."' },
          { number: 9, title: 'Daughter', summary: 'Over months of fire pit rituals, Hawk begins calling her "daughter." Bella begins to believe she might be worth something.' },
          { number: 10, title: 'From Analyst to Fixer', summary: 'Bella\'s promotion/evolution. Taking on more responsibility. Proving herself in the field.' },
        ]
      },
    ]
  },
  3: {
    parts: [
      {
        title: 'Part One: Rising',
        chapters: [
          { number: 1, title: 'The Fixer\'s Life', summary: 'Day-to-day of Bella as fixer. Cases, clients, crisis management. Building her reputation.' },
          { number: 2, title: 'Fire Pit Wisdom', summary: 'Ongoing mentorship with Hawk. Deeper chess lessons. "You\'re not the player anymore, daughter. You\'re the Queen."' },
          { number: 3, title: 'The Wives Club Dream', summary: 'Bella\'s quiet hope still alive. Watching the inner circle from the edges. Not believing she belongs there yet.' },
        ]
      },
      {
        title: 'Part Two: The Ceremony',
        chapters: [
          { number: 4, title: 'The Invitation', summary: 'Bella learns about the engagement dinner. Nerves, anticipation. What does this mean?' },
          { number: 5, title: 'The Engagement Dinner', summary: 'The ceremony itself. Being surrounded by the people who chose her.' },
          { number: 6, title: 'The Three Gifts', summary: '(1) Club pendant with sorority subsection symbol - the Wives Club is real. (2) Bonus check larger than yearly salary. (3) Private gift: leather-bound "My Fair Lady" signed "Mom" (Addie) and "Dad" (Hawk).' },
          { number: 7, title: 'The Gym', summary: 'Bella found crying in the gym after receiving the book. Processing what it means to be claimed as family.' },
        ]
      },
      {
        title: 'Part Three: After',
        chapters: [
          { number: 8, title: 'The Text to Tessa', summary: 'Bella texts Tessa to share the moment. Connection across the years. Full circle from college friendship.' },
          { number: 9, title: 'New Normal', summary: 'Life as a full member. New responsibilities. New relationships within the circle.' },
        ]
      },
    ]
  },
  4: {
    parts: [
      {
        title: 'Part One: Denver',
        chapters: [
          { number: 1, title: 'The Ranch', summary: 'Mandy\'s ranch near Denver. Why Bella ends up there. First sight of the place.' },
          { number: 2, title: 'Mandy', summary: 'Former Agency operative who left "as a wreck - nights sitting in shower crying until water went cold." Now helps veterans with PTSD. Stunning with steel-green eyes.' },
          { number: 3, title: 'The Veterans', summary: 'Mandy\'s mission - helping veterans heal. Bella seeing a different kind of service.' },
        ]
      },
      {
        title: 'Part Two: Slow and Safe',
        chapters: [
          { number: 4, title: 'Building Trust', summary: 'Mandy reading Bella carefully. Taking things slow. Bella\'s walls starting to come down.' },
          { number: 5, title: 'First Intimacy', summary: 'Mandy makes it slow, gentle, and safe. First time Bella allows herself to be vulnerable in love.' },
          { number: 6, title: 'The Relationship Deepens', summary: 'Daily life together at the ranch. Bella healing from years of self-rejection. Genuine happiness.' },
        ]
      },
      {
        title: 'Part Three: The Fork',
        chapters: [
          { number: 7, title: 'The Conversation', summary: 'Bella realizes she wants kids someday. Mandy doesn\'t. "I\'d rather watch you grow into everything you\'re meant to be than keep you small."' },
          { number: 8, title: 'Matt', summary: 'Patient, respectful rancher. Treats Bella "same way you\'d gentle a horse." Tips his cap, gives soft peck on cheek after trail ride.' },
          { number: 9, title: 'Letting Go and Moving Forward', summary: 'Bella and Mandy\'s transition. Gratitude for what they had. Opening to what comes next.' },
        ]
      },
    ]
  },
  5: {
    parts: [
      {
        title: 'Part One: Courtship',
        chapters: [
          { number: 1, title: 'Trail Rides', summary: 'Matt and Bella spending time together. His patience, her hesitation. Slow build of trust.' },
          { number: 2, title: 'Gentling', summary: 'Matt treats her "same way you\'d gentle a horse." Bella learning to receive without suspicion.' },
          { number: 3, title: 'Falling', summary: 'Bella realizes she\'s in love. The terror and joy of it. Finally believing she\'s worth choosing.' },
        ]
      },
      {
        title: 'Part Two: The Proposal',
        chapters: [
          { number: 4, title: 'The Question', summary: 'Matt proposes. Bella\'s internal battle - can she say yes? She says yes.' },
          { number: 5, title: 'Telling the Family', summary: 'Hawk and Addie\'s reaction (their daughter is getting married). The Wives Club celebration. Mandy\'s blessing.' },
        ]
      },
      {
        title: 'Part Three: The Wedding',
        chapters: [
          { number: 6, title: 'Planning', summary: 'Wedding preparations. Wives Club involvement. Bella as the center of attention.' },
          { number: 7, title: 'The Day', summary: 'The wedding ceremony. Hawk walking her down the aisle. The culmination of her journey to self-worth.' },
          { number: 8, title: 'The Queen and Her King', summary: 'Married life begins. "You\'re not the player anymore, daughter. You\'re the Queen."' },
        ]
      },
    ]
  },
  6: {
    parts: [
      {
        title: 'Part One: The Vision',
        chapters: [
          { number: 1, title: 'What\'s Next?', summary: 'Bella as married woman, POH page, established fixer. Seeds of her own empire.' },
          { number: 2, title: 'TX Event Support', summary: 'Building out event support business. Using her sorority/fixer skills at scale.' },
          { number: 3, title: 'Learning from Elena', summary: 'Elena as business mentor. Maison Aurelia as model. Understanding luxury events.' },
        ]
      },
      {
        title: 'Part Two: Maison Aurelia Role',
        chapters: [
          { number: 4, title: 'COO/Marketing', summary: 'Bella takes on COO/Marketing role at Maison Aurelia. Working with Elena directly.' },
          { number: 5, title: 'Building the Brand', summary: 'Marketing strategies. Growing the business. Finding her voice as a leader.' },
        ]
      },
      {
        title: 'Part Three: POH Page',
        chapters: [
          { number: 6, title: 'The Page Role', summary: 'Bella\'s elevation to POH Page. New responsibilities and influence.' },
          { number: 7, title: 'Charitable Work', summary: 'POH charitable mission. Connecting her sorority background to philanthropy.' },
        ]
      },
      {
        title: 'Part Four: Her Own Empire',
        chapters: [
          { number: 8, title: 'The Next Venture', summary: 'Bella launching her own company/initiative. Support from Matt, Hawk, Addie, the Wives Club.' },
          { number: 9, title: 'The Queen Builds', summary: 'Bella as empire builder. No longer the background fixer - the leader. Full transformation complete.' },
        ]
      },
    ]
  },
  7: {
    parts: [
      {
        title: 'Motherhood and Legacy',
        chapters: [
          { number: 1, title: 'The News', summary: 'Bella and Matt expecting their first child.' },
          { number: 2, title: 'Full Circle', summary: 'Bella as mother. Thinking about her own childhood at the cafe and bookstore.' },
          { number: 3, title: 'Passing It Down', summary: 'Teaching the next generation what she learned. The legacy continues.' },
        ]
      },
    ]
  },
};

const bookTitles: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Wouldn't It Be Loverly", subtitle: 'The dream of belonging, before anyone saw her worth' },
  2: { title: 'The Rain in Spain', subtitle: 'The breakthrough - learning she could be more' },
  3: { title: 'I Could Have Danced All Night', subtitle: 'The moment she was finally chosen' },
  4: { title: 'Show Me', subtitle: 'Learning to trust love again' },
  5: { title: 'Black Moves Second', subtitle: 'She was always the responder - now she makes her move' },
  6: { title: "I've Grown Accustomed to Her Face", subtitle: 'Building her empire' },
  7: { title: 'A Hymn to Her', subtitle: 'Motherhood and legacy' },
};

export default async function BookPage({ params }: Props) {
  const { seriesId, bookNumber } = await params;
  const bookNum = parseInt(bookNumber);

  // Get series info
  const series = await prisma.bookSeries.findUnique({
    where: { id: seriesId },
  });

  if (!series) {
    notFound();
  }

  // Parse books from series
  const books = safeParseBooksArray(series.books);
  const book = books.find((b: any) => b.number === bookNum);

  if (!book) {
    notFound();
  }

  // Get chapter data (for Bella's series we have detailed chapters)
  const isBellaSeries = series.name.includes('Bella') || series.name.includes('My Fair Lady');
  const chapters = isBellaSeries ? bellaBookChapters[bookNum] : null;
  const titleInfo = isBellaSeries ? bookTitles[bookNum] : null;

  // For Jasper Barrett series, get chapters from database
  let dbChapters: { number: number | null; title: string | null; synopsis: string | null; pov: string | null; tags: string | null }[] = [];
  if (series.name.includes('Jasper Barrett')) {
    // Find the Book record
    const dbBook = await prisma.book.findFirst({
      where: { projectId: series.projectId, sortOrder: bookNum },
      include: { chapters: { orderBy: { number: 'asc' } } }
    });
    if (dbBook) {
      dbChapters = dbBook.chapters;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/series" className="hover:text-blue-600">Series</Link>
          <span>/</span>
          <Link href="/series" className="hover:text-blue-600">{series.name}</Link>
          <span>/</span>
          <span className="text-gray-900">Book {bookNum}</span>
        </div>

        {/* Book Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Book {bookNum}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {titleInfo?.title || book.title}
              </h1>
              {(titleInfo?.subtitle || book.subtitle) && (
                <p className="text-lg text-gray-600 italic mt-2">
                  {titleInfo?.subtitle || book.subtitle}
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {series.seriesType || 'Series'}
              </span>
            </div>
          </div>

          {book.synopsis && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Synopsis</h3>
              <p className="text-gray-600">{book.synopsis}</p>
            </div>
          )}
        </div>

        {/* Chapter Outline */}
        {chapters ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Chapter Outline</h2>

            {chapters.parts.map((part, partIdx) => (
              <div key={partIdx} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 border-b">
                  <h3 className="font-semibold text-gray-800">{part.title}</h3>
                </div>
                <div className="divide-y">
                  {part.chapters.map((chapter) => (
                    <div key={chapter.number} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {chapter.number}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{chapter.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : dbChapters.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Chapter Outline</h2>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="divide-y">
                {dbChapters.map((chapter) => (
                  <div key={chapter.number} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {chapter.number}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                          {chapter.pov && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              POV: {chapter.pov}
                            </span>
                          )}
                        </div>
                        {chapter.tags && (
                          <p className="text-xs text-gray-500 mt-1">Location: {chapter.tags}</p>
                        )}
                        {chapter.synopsis && (
                          <p className="text-sm text-gray-600 mt-2">{chapter.synopsis}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
            <p>Chapter details not yet available for this book.</p>
            <p className="text-sm mt-2">Check back later or add chapter information.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {bookNum > 1 ? (
            <Link
              href={`/series/${seriesId}/book/${bookNum - 1}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              ← Book {bookNum - 1}
            </Link>
          ) : <div />}

          {bookNum < 7 ? (
            <Link
              href={`/series/${seriesId}/book/${bookNum + 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Book {bookNum + 1} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
