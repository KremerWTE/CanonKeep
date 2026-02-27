'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SearchResult, EntityType } from '@/types';

const entityTypeLabels: Record<EntityType, string> = {
  character: 'Character',
  location: 'Location',
  chapter: 'Chapter',
  plotThread: 'Plot Thread',
  event: 'Event',
  faction: 'Faction',
  note: 'Note',
};

const entityTypeColors: Record<EntityType, string> = {
  character: 'badge-blue',
  location: 'badge-green',
  chapter: 'badge-purple',
  plotThread: 'badge-yellow',
  event: 'badge-red',
  faction: 'badge-gray',
  note: 'badge-gray',
};

const entityTypeLinks: Record<EntityType, string> = {
  character: '/characters',
  location: '/locations',
  chapter: '/chapters',
  plotThread: '/plots',
  event: '/timeline',
  faction: '/factions',
  note: '/notes',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<EntityType[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({ q: query });
      if (selectedTypes.length > 0) {
        params.set('types', selectedTypes.join(','));
      }

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (type: EntityType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const allTypes: EntityType[] = ['character', 'location', 'chapter', 'plotThread', 'event'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Search</h1>
          <p className="mt-1 text-gray-600">Find anything in your story content</p>
        </div>
        <Link
          href="/search/advanced"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm whitespace-nowrap"
        >
          Advanced Search
        </Link>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search characters, chapters, plots, events..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Filter by type:</span>
          {allTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={`badge cursor-pointer transition-colors ${
                selectedTypes.includes(type)
                  ? entityTypeColors[type]
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {entityTypeLabels[type]}
            </button>
          ))}
          {selectedTypes.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTypes([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>

          {results.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <p className="text-gray-500">
                No results found for "{query}". Try different keywords or remove filters.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result, index) => (
                <Link
                  key={`${result.entityType}-${result.entityId}-${index}`}
                  href={`${entityTypeLinks[result.entityType]}/${result.entityId}`}
                  className="block bg-white rounded-lg shadow-sm border p-4 card-hover"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{result.entityName}</h3>
                        <span className={`badge ${entityTypeColors[result.entityType]}`}>
                          {entityTypeLabels[result.entityType]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Matched in: {result.matchedField}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      Score: {Math.round(result.score * 100)}%
                    </span>
                  </div>
                  {result.matchedText && (
                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded p-2">
                      ...{result.matchedText}...
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial state */}
      {!searched && (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-gray-500">
            Enter a search query to find characters, chapters, plot threads, and more.
          </p>
        </div>
      )}
    </div>
  );
}
