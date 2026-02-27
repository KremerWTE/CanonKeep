import Link from 'next/link';
import prisma from '@/lib/db';

async function getChapters() {
  return prisma.chapter.findMany({
    include: {
      project: true,
      book: true,
      characters: {
        include: { character: true },
      },
      plots: {
        include: { plotThread: true },
      },
    },
    orderBy: [{ bookId: 'asc' }, { number: 'asc' }, { sortOrder: 'asc' }],
  });
}

export default async function ChaptersPage() {
  const chapters = await getChapters();

  // Group chapters by book
  const chaptersByBook = chapters.reduce(
    (acc, chapter) => {
      const bookKey = chapter.book?.title || 'Unassigned';
      if (!acc[bookKey]) {
        acc[bookKey] = [];
      }
      acc[bookKey].push(chapter);
      return acc;
    },
    {} as Record<string, typeof chapters>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chapters</h1>
          <p className="mt-1 text-gray-600">
            {chapters.length} chapter{chapters.length !== 1 ? 's' : ''} across your projects
          </p>
        </div>
      </div>

      {chapters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">
            No chapters found. Import documents with chapter content to populate this page.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(chaptersByBook).map(([bookTitle, bookChapters]) => (
            <div key={bookTitle}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{bookTitle}</h2>
              <div className="space-y-3">
                {bookChapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.id}`}
                    className="block bg-white rounded-lg shadow-sm border p-4 card-hover"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {chapter.number && (
                            <span className="text-sm font-medium text-gray-400">
                              #{chapter.number}
                            </span>
                          )}
                          <h3 className="font-semibold text-gray-900">
                            {chapter.title || `Chapter ${chapter.number}`}
                          </h3>
                          {chapter.pov && (
                            <span className="badge badge-blue">POV: {chapter.pov}</span>
                          )}
                          <span className={`badge ${
                            chapter.status === 'final' ? 'badge-green' :
                            chapter.status === 'revised' ? 'badge-yellow' :
                            'badge-gray'
                          }`}>
                            {chapter.status}
                          </span>
                        </div>

                        {chapter.synopsis && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {chapter.synopsis}
                          </p>
                        )}

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          {chapter.wordCount && (
                            <span>{chapter.wordCount.toLocaleString()} words</span>
                          )}
                          {chapter.characters.length > 0 && (
                            <span>
                              Characters: {chapter.characters.map(c => c.character.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
