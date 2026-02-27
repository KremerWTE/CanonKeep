'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  subtitle: string | null;
  status: string;
  chapterCount: number;
  wordCount: number;
}

type ExportFormat = 'markdown' | 'docx' | 'epub';

const FORMAT_INFO: Record<ExportFormat, { label: string; icon: string; description: string }> = {
  markdown: {
    label: 'Markdown',
    icon: '📝',
    description: 'Plain text format suitable for further editing or version control',
  },
  docx: {
    label: 'Word Document',
    icon: '📄',
    description: 'Microsoft Word format for professional editing and formatting',
  },
  epub: {
    label: 'ePub',
    icon: '📚',
    description: 'E-book format compatible with most e-readers and reading apps',
  },
};

export default function ExportPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('docx');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data.books || []);
    } catch {
      console.error('Failed to load books');
    }
    setLoading(false);
  };

  const handleExport = async (bookId: string, format: ExportFormat) => {
    setExporting(`${bookId}-${format}`);

    try {
      const response = await fetch(`/api/export/${bookId}?format=${format}`);

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `export.${format === 'epub' ? 'epub' : format === 'docx' ? 'docx' : 'md'}`;

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export. Please try again.');
    }

    setExporting(null);
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Export Books</h1>
        <div className="text-gray-600">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Export Books</h1>
          <p className="mt-1 text-gray-600">
            Download your manuscripts in various formats
          </p>
        </div>
        <Link
          href="/builder"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
        >
          Book Builder
        </Link>
      </div>

      {/* Format Legend */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h2 className="font-semibold text-gray-900 mb-3">Available Formats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(FORMAT_INFO).map(([key, info]) => (
            <div key={key} className="flex items-start gap-3">
              <span className="text-2xl">{info.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{info.label}</div>
                <div className="text-sm text-gray-500">{info.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Books List */}
      {books.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500 mb-4">
            No books available for export. Create a book in the Book Builder first.
          </p>
          <Link
            href="/builder"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Book Builder
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-sm border p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                  {book.subtitle && (
                    <p className="text-sm text-gray-500">{book.subtitle}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    <span>{book.chapterCount} chapters</span>
                    {book.wordCount > 0 && (
                      <span>{book.wordCount.toLocaleString()} words</span>
                    )}
                    <span className={`badge ${
                      book.status === 'complete' ? 'badge-green' :
                      book.status === 'drafting' ? 'badge-yellow' :
                      'badge-gray'
                    }`}>
                      {book.status}
                    </span>
                  </div>
                </div>

                {selectedBook === book.id ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value as ExportFormat)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="markdown">Markdown (.md)</option>
                      <option value="docx">Word Document (.docx)</option>
                      <option value="epub">ePub (.epub)</option>
                    </select>
                    <button
                      onClick={() => handleExport(book.id, selectedFormat)}
                      disabled={exporting !== null}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {exporting === `${book.id}-${selectedFormat}` ? 'Exporting...' : 'Download'}
                    </button>
                    <button
                      onClick={() => setSelectedBook(null)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedBook(book.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Export
                    </button>
                    <button
                      onClick={() => handleExport(book.id, 'docx')}
                      disabled={exporting !== null}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm disabled:opacity-50"
                      title="Quick export as DOCX"
                    >
                      {exporting === `${book.id}-docx` ? '...' : '📄'}
                    </button>
                    <button
                      onClick={() => handleExport(book.id, 'epub')}
                      disabled={exporting !== null}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm disabled:opacity-50"
                      title="Quick export as ePub"
                    >
                      {exporting === `${book.id}-epub` ? '...' : '📚'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Character Bible Export */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Character Bible</h3>
            <p className="text-sm text-gray-500">
              Export all character profiles and relationships as a reference document
            </p>
          </div>
          <Link
            href="/export/character-bible"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm text-center"
          >
            Export Character Bible
          </Link>
        </div>
      </div>
    </div>
  );
}
