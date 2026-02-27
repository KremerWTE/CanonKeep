import Link from 'next/link';
import prisma from '@/lib/db';
import { BookBuilderClient } from './BookBuilderClient';

async function getBuilderData() {
  const [projects, books, chapters, plotThreads] = await Promise.all([
    prisma.project.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.book.findMany({
      include: {
        project: true,
        chapters: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { title: 'asc' },
    }),
    prisma.chapter.findMany({
      where: { bookId: null },
      include: {
        project: true,
        characters: {
          include: { character: true },
        },
      },
      orderBy: [{ number: 'asc' }, { sortOrder: 'asc' }],
    }),
    prisma.plotThread.findMany({
      where: { status: 'active' },
      include: {
        project: true,
        characters: {
          include: { character: true },
        },
      },
    }),
  ]);

  return { projects, books, chapters, plotThreads };
}

export default async function BuilderPage() {
  const { projects, books, chapters, plotThreads } = await getBuilderData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Builder</h1>
        <p className="mt-1 text-gray-600">
          Assemble chapters into books and export manuscripts
        </p>
      </div>

      {/* Existing Books */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Books</h2>
        {books.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-gray-500">No books created yet. Create your first book below.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-sm border p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{book.title}</h3>
                    {book.subtitle && (
                      <p className="text-sm text-gray-500">{book.subtitle}</p>
                    )}
                  </div>
                  <span
                    className={`badge ${
                      book.status === 'complete'
                        ? 'badge-green'
                        : book.status === 'drafting'
                        ? 'badge-yellow'
                        : 'badge-gray'
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {book.chapters.length} chapter{book.chapters.length !== 1 ? 's' : ''}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/builder/${book.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Edit Structure
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    href={`/api/export/${book.id}`}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Export Manuscript
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Book Builder Tool */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Book</h2>
        <BookBuilderClient
          projects={projects}
          unassignedChapters={chapters}
          plotThreads={plotThreads}
        />
      </section>

      {/* Unassigned Chapters */}
      {chapters.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Unassigned Chapters ({chapters.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="p-4 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">
                    {chapter.title || `Chapter ${chapter.number}`}
                  </span>
                  <span className="text-sm text-gray-400 ml-2">
                    ({chapter.project.name})
                  </span>
                  {chapter.synopsis && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {chapter.synopsis}
                    </p>
                  )}
                </div>
                <Link
                  href={`/chapters/${chapter.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
