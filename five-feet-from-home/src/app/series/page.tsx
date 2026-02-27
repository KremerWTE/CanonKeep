import Link from 'next/link';
import { prisma } from '@/lib/db';

// Safe JSON parse that handles both JSON arrays and plain strings
function safeParseArray(str: string | null): string[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [str];
  } catch {
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }
}

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

export default async function SeriesPage() {
  const series = await prisma.bookSeries.findMany({
    orderBy: { readingOrder: 'asc' },
  });

  const seriesTypeColors: Record<string, string> = {
    Main: 'bg-purple-100 text-purple-800 border-purple-300',
    'Spin-off': 'bg-blue-100 text-blue-800 border-blue-300',
    Companion: 'bg-green-100 text-green-800 border-green-300',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Book Series</h1>
            <p className="text-gray-600">Five Feet From Home Universe</p>
          </div>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {/* Universe Overview */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Story Universe Overview</h2>
          <p className="text-gray-700 mb-4">
            The Five Feet From Home universe centers on Jasper Barrett and Barrett Strategic Solutions (BSS),
            with multiple spin-off series following other characters' journeys. The main series establishes
            the world, while spin-offs explore deeper stories of supporting characters.
          </p>
          <div className="flex gap-4">
            <span className={`px-3 py-1 rounded border ${seriesTypeColors['Main']}`}>Main Series</span>
            <span className={`px-3 py-1 rounded border ${seriesTypeColors['Spin-off']}`}>Spin-off</span>
            <span className={`px-3 py-1 rounded border ${seriesTypeColors['Companion']}`}>Companion</span>
          </div>
        </div>

        {/* Series Grid */}
        <div className="space-y-6">
          {series.map((s) => {
            const books = safeParseBooksArray(s.books);
            const themes = safeParseArray(s.themes);

            return (
              <div key={s.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      {s.readingOrder && (
                        <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {s.readingOrder}
                        </span>
                      )}
                      <h2 className="text-2xl font-bold">{s.name}</h2>
                      {s.seriesType && (
                        <span className={`px-2 py-1 rounded text-sm border ${seriesTypeColors[s.seriesType] || 'bg-gray-100'}`}>
                          {s.seriesType}
                        </span>
                      )}
                    </div>
                    {s.protagonist && (
                      <p className="text-gray-600 mt-1">Protagonist: <strong>{s.protagonist}</strong></p>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <Link
                      href={`/series/${s.id}/edit`}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <span className={`px-2 py-1 rounded text-sm ${s.status === 'in-progress' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {s.status}
                    </span>
                    {s.totalBooks && (
                      <p className="text-sm text-gray-500">{s.totalBooks} books planned</p>
                    )}
                  </div>
                </div>

                {s.premise && (
                  <p className="text-gray-700 mb-4">{s.premise}</p>
                )}

                {themes.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">Themes: </span>
                    {themes.map((theme: string, i: number) => (
                      <span key={i} className="text-sm text-gray-600">
                        {theme}{i < themes.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}

                {s.parentSeries && (
                  <p className="text-sm text-gray-500 mb-4">
                    Spin-off from: <strong>{s.parentSeries}</strong>
                  </p>
                )}

                {books.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Books in Series:</h3>
                    <div className="space-y-4">
                      {books.map((book: any, i: number) => (
                        <div key={i} className="bg-gray-50 rounded border">
                          <Link
                            href={`/series/${s.id}/book/${book.number}`}
                            className="block p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="font-medium text-blue-600">
                              Book {book.number}: {book.title}
                            </div>
                            {book.subtitle && (
                              <div className="text-sm text-gray-500 italic">{book.subtitle}</div>
                            )}
                            {book.synopsis && (
                              <p className="text-sm text-gray-600 mt-1">{book.synopsis}</p>
                            )}
                          </Link>

                          {/* Chapter Summaries */}
                          {book.chapters && book.chapters.length > 0 && (
                            <details className="border-t">
                              <summary className="p-2 px-3 bg-gray-100 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-200">
                                {book.chapters.length} Chapters (click to expand)
                              </summary>
                              <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                                {book.chapters.map((ch: any) => (
                                  <div key={ch.number} className="text-sm border-l-2 border-blue-300 pl-3 py-1">
                                    <div className="flex justify-between items-start">
                                      <span className="font-medium text-gray-800">
                                        Ch {ch.number}: {ch.title}
                                      </span>
                                      {ch.pov && (
                                        <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                                          {ch.pov}
                                        </span>
                                      )}
                                    </div>
                                    {ch.location && (
                                      <div className="text-xs text-gray-500">{ch.location}</div>
                                    )}
                                    {ch.summary && (
                                      <p className="text-xs text-gray-600 mt-1">{ch.summary}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {s.connections && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <span className="text-sm font-medium text-blue-700">Connections: </span>
                    <span className="text-sm text-blue-600">{s.connections}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {series.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No book series found. Run the populate script to add series data.
          </div>
        )}

        {/* Recommended Additional Series */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow mt-8">
          <h2 className="text-xl font-bold mb-4">Recommended Additional Series</h2>
          <p className="text-gray-700 mb-4">Based on the story content, these spin-offs could expand the universe:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border">
              <h3 className="font-semibold">Spring Break in Florida</h3>
              <p className="text-sm text-gray-600">Izzy and friends' coming-of-age adventure</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <h3 className="font-semibold">The Cooking Class</h3>
              <p className="text-sm text-gray-600">Wives Club bonding and friendship stories</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <h3 className="font-semibold">Lottie's Seating Chart</h3>
              <p className="text-sm text-gray-600">Behind-the-scenes of elite event planning</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <h3 className="font-semibold">The Teacher's Heart</h3>
              <p className="text-sm text-gray-600">Maggie Donnelly's romantic journey</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <h3 className="font-semibold">Faith & Fortune</h3>
              <p className="text-sm text-gray-600">Chris and Kendra's Catholic PE world</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <h3 className="font-semibold">POH Secrets</h3>
              <p className="text-sm text-gray-600">Palace of Honor political intrigue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
