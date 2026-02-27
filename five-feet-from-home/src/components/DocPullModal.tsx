'use client';

import { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  text: string;
  source: string;
  section: string | null;
  relevance: number;
}

interface DocPullModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (text: string, source: string) => void;
  entityType?: string;
  entityName?: string;
  fieldName?: string;
}

export default function DocPullModal({
  isOpen,
  onClose,
  onSelect,
  entityType,
  entityName,
  fieldName,
}: DocPullModalProps) {
  const [query, setQuery] = useState(entityName || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (isOpen && entityName) {
      setQuery(entityName);
      handleSearch(entityName);
    }
  }, [isOpen, entityName]);

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({
        q,
        ...(entityType && { type: entityType }),
        limit: '15',
      });

      const res = await fetch(`/api/docs/search?${params}`);
      const data = await res.json();

      if (data.results) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              Pull from Documents
              {fieldName && <span className="text-gray-500 font-normal"> - {fieldName}</span>}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Search box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for content in your documents..."
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Searches through {entityType || 'all'} related content in your ingested Word documents
          </p>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8 text-gray-500">
              Searching documents...
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No matching content found. Try different search terms.
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-3 border rounded hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => {
                    onSelect(result.text, result.source);
                    onClose();
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs text-blue-600 font-medium">
                      {result.source}
                    </span>
                    {result.section && (
                      <span className="text-xs text-gray-400">
                        {result.section}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {result.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!searched && !loading && (
            <div className="text-center py-8 text-gray-400">
              Enter a search term to find content from your documents
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Click on a result to insert it into the field
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
