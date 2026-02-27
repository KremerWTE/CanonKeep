'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'document' | 'block' | 'character' | 'crisis' | 'gala' | 'chapter' | 'location';
  name: string;
  matchedField: string;
  matchedText: string;
  documentName?: string;
  documentId?: string;
  score: number;
  link: string;
}

interface Document {
  id: string;
  fileName: string;
}

const TYPE_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  document: { label: 'Document', color: 'bg-blue-100 text-blue-700', icon: '📄' },
  block: { label: 'Content Block', color: 'bg-blue-100 text-blue-700', icon: '📄' },
  character: { label: 'Character', color: 'bg-purple-100 text-purple-700', icon: '👤' },
  crisis: { label: 'Crisis', color: 'bg-red-100 text-red-700', icon: '🚨' },
  gala: { label: 'Gala', color: 'bg-pink-100 text-pink-700', icon: '🎉' },
  chapter: { label: 'Chapter', color: 'bg-green-100 text-green-700', icon: '📖' },
  location: { label: 'Location', color: 'bg-yellow-100 text-yellow-700', icon: '📍' }
};

export default function AdvancedSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [total, setTotal] = useState(0);

  // Load available documents on mount
  useEffect(() => {
    fetch('/api/documents/upload')
      .then(res => res.json())
      .then(data => setDocuments(data.documents || []))
      .catch(() => {});
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || query.length < 2) return;

    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({ q: query });
      if (selectedTypes.length > 0) {
        params.set('types', selectedTypes.join(','));
      }
      if (selectedDocuments.length > 0) {
        params.set('documents', selectedDocuments.join(','));
      }

      const response = await fetch(`/api/search/documents?${params}`);
      const data = await response.json();

      setResults(data.results || []);
      setTotal(data.total || 0);
    } catch {
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(docId) ? prev.filter(d => d !== docId) : [...prev, docId]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedDocuments([]);
  };

  const allTypes = ['document', 'character', 'crisis', 'gala', 'chapter', 'location'];

  // Group results by type
  const resultsByType = results.reduce((acc, result) => {
    const type = result.type === 'block' ? 'document' : result.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Advanced Search</h1>
            <p className="text-gray-600">Search within specific document types and content</p>
          </div>
          <Link href="/search" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Basic Search
          </Link>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for anything (min 2 characters)..."
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={loading || query.length < 2}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {/* Type Filters */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Filter by type:</span>
                {(selectedTypes.length > 0 || selectedDocuments.length > 0) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedTypes.includes(type)
                        ? TYPE_CONFIG[type].color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {TYPE_CONFIG[type].icon} {TYPE_CONFIG[type].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Filters */}
            {documents.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-700 block mb-2">
                  Filter by source document:
                </span>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {documents.map(doc => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => toggleDocument(doc.id)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        selectedDocuments.includes(doc.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {doc.fileName.replace('.docx', '')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {total} result{total !== 1 ? 's' : ''} found
                {selectedTypes.length > 0 && ` in ${selectedTypes.length} type${selectedTypes.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No results found for &quot;{query}&quot;. Try different keywords or remove filters.
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(resultsByType).map(([type, typeResults]) => (
                  <div key={type} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className={`px-4 py-3 ${TYPE_CONFIG[type]?.color || 'bg-gray-100'} border-b`}>
                      <h2 className="font-semibold flex items-center gap-2">
                        <span>{TYPE_CONFIG[type]?.icon}</span>
                        {TYPE_CONFIG[type]?.label || type}
                        <span className="text-sm font-normal opacity-75">
                          ({typeResults.length} result{typeResults.length !== 1 ? 's' : ''})
                        </span>
                      </h2>
                    </div>
                    <div className="divide-y">
                      {typeResults.map((result, idx) => (
                        <Link
                          key={`${result.id}-${idx}`}
                          href={result.link}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900">{result.name}</h3>
                            <span className="text-xs text-gray-400">
                              {Math.round(result.score * 100)}% match
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span>Matched in: <span className="font-medium">{result.matchedField}</span></span>
                            {result.documentName && (
                              <>
                                <span>•</span>
                                <span>From: {result.documentName}</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 bg-gray-50 rounded p-2 line-clamp-2">
                            {result.matchedText}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!searched && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 mb-4">
              Search across all your story content - documents, characters, crises, galas, chapters, and locations.
            </p>
            <div className="text-sm text-gray-400">
              Use the type filters to narrow your search to specific content types.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
