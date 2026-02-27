'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  document: string;
  blockIndex: number;
  text: string;
  context: string;
}

export default function CharacterSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/character-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Character Search</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="text-gray-600 mb-4">
            Search all ingested documents for mentions of a character name. This pulls raw content from the source files.
          </p>

          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter character name (e.g., Jasper, Elena, Addie, Hawk)"
              className="flex-1 p-3 border rounded-lg"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Documents'}
            </button>
          </form>
        </div>

        {searched && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {loading ? 'Searching...' : `Found ${results.length} mentions of "${query}"`}
            </h2>

            {results.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-blue-700">{result.document}</span>
                      <span className="text-sm text-gray-500">Block #{result.blockIndex}</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{result.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <p className="text-gray-500">
                  No mentions found for "{query}" in the ingested documents.
                </p>
              )
            )}
          </div>
        )}

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Quick Search Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {['Jasper', 'Elena', 'Grace', 'Addie', 'Hawk', 'Harper', 'Kendra', 'Ridge', 'Bella', 'Selene', 'Chris', 'Lottie'].map((name) => (
              <button
                key={name}
                onClick={() => {
                  setQuery(name);
                }}
                className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
