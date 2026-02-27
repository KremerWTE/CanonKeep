import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

interface DraftFile {
  name: string;
  slug: string;
  content: string;
  wordCount: number;
}

interface BookData {
  title: string;
  folder: string;
  chapters: DraftFile[];
  totalWords: number;
}

const BOOK_INFO = {
  book1: { title: 'Five Feet From Home', folder: 'book1' },
  book2: { title: 'The Ownership Game', folder: 'book2' },
  book3: { title: 'The Expansion', folder: 'book3' }
};

async function getBookChapters(draftsPath: string, folder: string): Promise<DraftFile[]> {
  const bookPath = path.join(draftsPath, folder);
  const drafts: DraftFile[] = [];

  try {
    const files = await fs.readdir(bookPath);
    for (const file of files.filter(f => f.endsWith('.md'))) {
      const content = await fs.readFile(path.join(bookPath, file), 'utf-8');
      const name = file.replace('.md', '').replace(/-/g, ' ').replace(/chapter (\d+)/, 'Chapter $1');
      const wordCount = content.split(/\s+/).length;
      drafts.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        slug: file.replace('.md', ''),
        content,
        wordCount
      });
    }
    drafts.sort((a, b) => {
      const numA = parseInt(a.slug.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.slug.match(/\d+/)?.[0] || '0');
      return numA - numB;
    });
  } catch {
    // No chapters yet for this book
  }

  return drafts;
}

async function getDrafts(): Promise<{ books: BookData[]; characterBible: DraftFile | null }> {
  const draftsPath = path.join(process.cwd(), 'drafts');

  const books: BookData[] = [];

  for (const [key, info] of Object.entries(BOOK_INFO)) {
    const chapters = await getBookChapters(draftsPath, info.folder);
    books.push({
      title: info.title,
      folder: info.folder,
      chapters,
      totalWords: chapters.reduce((sum, ch) => sum + ch.wordCount, 0)
    });
  }

  let characterBible: DraftFile | null = null;
  try {
    const biblePath = path.join(draftsPath, 'character-bible.md');
    const content = await fs.readFile(biblePath, 'utf-8');
    characterBible = {
      name: 'Character Bible',
      slug: 'character-bible',
      content,
      wordCount: content.split(/\s+/).length
    };
  } catch {
    // No character bible yet
  }

  return { books, characterBible };
}

function BookSection({ book, bookNumber }: { book: BookData; bookNumber: number }) {
  const plannedChapters = bookNumber === 1 ? 44 : bookNumber === 2 ? 26 : 57;
  const colors = [
    { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'hover:bg-blue-200' },
    { bg: 'bg-emerald-100', text: 'text-emerald-700', hover: 'hover:bg-emerald-200' },
    { bg: 'bg-purple-100', text: 'text-purple-700', hover: 'hover:bg-purple-200' }
  ][bookNumber - 1];

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Book {bookNumber}: {book.title}</h2>
          <p className="text-sm text-gray-500">
            {book.chapters.length} of {plannedChapters} chapters | {book.totalWords.toLocaleString()} words
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`/api/drafts/download?format=docx&type=${book.folder}`}
            className={`px-3 py-1 text-sm ${colors.bg} ${colors.text} rounded ${colors.hover}`}
          >
            Download Book (Word)
          </a>
          <a
            href={`/api/drafts/download?format=docx&type=${book.folder}-chapters-zip`}
            className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
          >
            All Chapters (ZIP)
          </a>
          <a
            href={`/api/drafts/download?format=md&type=${book.folder}-chapters-zip`}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            All MD (ZIP)
          </a>
        </div>
      </div>

      {book.chapters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">No draft chapters yet. Chapters will appear here as they are written.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {book.chapters.map((draft) => (
            <div key={draft.slug} className="bg-white rounded-lg shadow-sm border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href={`/drafts/${book.folder}/${draft.slug}`}
                    className="font-medium text-gray-900 hover:text-blue-600"
                  >
                    {draft.name}
                  </Link>
                  <span className="ml-2 text-sm text-gray-400">
                    {draft.wordCount.toLocaleString()} words
                  </span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/api/drafts/download?format=docx&file=${book.folder}/${draft.slug}`}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    Word
                  </a>
                  <a
                    href={`/api/drafts/download?format=md&file=${book.folder}/${draft.slug}`}
                    className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
                  >
                    MD
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function DraftsPage() {
  const { books, characterBible } = await getDrafts();
  const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0);
  const totalWords = books.reduce((sum, b) => sum + b.totalWords, 0) + (characterBible?.wordCount || 0);
  const plannedTotal = 44 + 26 + 57; // Book 1 + Book 2 + Book 3

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Draft Chapters</h1>
          <p className="mt-1 text-gray-600">
            {totalChapters} chapters across 3 books | {totalWords.toLocaleString()} total words
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/api/drafts/download?format=docx&type=all"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Download All Books (Word)
          </a>
          <a
            href="/api/drafts/download?format=md&type=all"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            Download All (MD)
          </a>
        </div>
      </div>

      {/* Character Bible Section */}
      {characterBible && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Reference Materials</h2>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/drafts/character-bible" className="font-semibold text-gray-900 hover:text-blue-600">
                  {characterBible.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {characterBible.wordCount.toLocaleString()} words | Complete character profiles
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="/api/drafts/download?format=docx&file=character-bible"
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Word
                </a>
                <a
                  href="/api/drafts/download?format=md&file=character-bible"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  MD
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Books */}
      {books.map((book, index) => (
        <BookSection key={book.folder} book={book} bookNumber={index + 1} />
      ))}

      {/* Progress Summary */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{books[0].chapters.length}/44</div>
            <div className="text-sm text-gray-500">Book 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-emerald-600">{books[1].chapters.length}/26</div>
            <div className="text-sm text-gray-500">Book 2</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{books[2].chapters.length}/57</div>
            <div className="text-sm text-gray-500">Book 3</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-amber-600">
              {Math.round((totalChapters / plannedTotal) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {totalWords.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Words</div>
          </div>
        </div>
      </div>
    </div>
  );
}
