'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TimelineItem {
  id: string;
  type: 'event' | 'crisis' | 'gala' | 'trip';
  name: string;
  timeRef: string | null;
  sortOrder: number;
  description: string | null;
  characters: { id: string; name: string }[];
  locations: { id: string; name: string }[];
  metadata: Record<string, any>;
}

interface TimelineData {
  totalItems: number;
  byType: Record<string, number>;
  items: TimelineItem[];
  bookGroups: Record<string, TimelineItem[]>;
}

const TYPE_COLORS = {
  event: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700', dot: 'bg-blue-500' },
  crisis: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', dot: 'bg-red-500' },
  gala: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700', dot: 'bg-purple-500' },
  trip: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', dot: 'bg-green-500' }
};

export default function InteractiveTimelinePage() {
  const [data, setData] = useState<TimelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'book'>('list');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading timeline...</div>;
  if (!data) return <div className="p-8 text-red-600">Failed to load timeline</div>;

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Filter items
  let filteredItems = data.items;
  if (filter !== 'all') {
    filteredItems = filteredItems.filter(i => i.type === filter);
  }
  if (search) {
    const lower = search.toLowerCase();
    filteredItems = filteredItems.filter(i =>
      i.name.toLowerCase().includes(lower) ||
      i.description?.toLowerCase().includes(lower) ||
      i.characters.some(c => c.name.toLowerCase().includes(lower))
    );
  }

  const getItemLink = (item: TimelineItem) => {
    switch (item.type) {
      case 'crisis': return `/crises/${item.id}`;
      case 'gala': return `/galas/${item.id}`;
      case 'trip': return `/trips/${item.id}`;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Interactive Timeline</h1>
            <p className="text-gray-600">{data.totalItems} total items across the story</p>
          </div>
          <Link href="/timeline" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Classic View
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(data.byType).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setFilter(filter === type ? 'all' : type)}
              className={`p-4 rounded-lg shadow transition-all ${
                filter === type ? TYPE_COLORS[type as keyof typeof TYPE_COLORS].bg : 'bg-white'
              } ${filter === type ? 'ring-2 ring-offset-2' : ''}`}
            >
              <div className={`text-2xl font-bold ${TYPE_COLORS[type as keyof typeof TYPE_COLORS]?.text || 'text-gray-700'}`}>
                {count}
              </div>
              <div className="text-sm text-gray-600 capitalize">{type}s</div>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search events, characters..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border rounded flex-1 min-w-[200px]"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                List View
              </button>
              <button
                onClick={() => setView('book')}
                className={`px-4 py-2 rounded ${view === 'book' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                By Book
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Zoom:</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={zoom}
                onChange={e => setZoom(parseFloat(e.target.value))}
                className="w-24"
              />
            </div>

            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="px-3 py-1 bg-gray-200 rounded text-sm"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Timeline */}
        {view === 'list' ? (
          <div className="relative" style={{ fontSize: `${zoom}rem` }}>
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-red-200" />

            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center text-gray-500">
                  No items match your search/filter
                </div>
              ) : (
                filteredItems.map(item => {
                  const colors = TYPE_COLORS[item.type];
                  const isExpanded = expandedItems.has(item.id);
                  const link = getItemLink(item);

                  return (
                    <div key={item.id} className="relative pl-14">
                      <div className={`absolute left-4 w-5 h-5 rounded-full ${colors.dot} border-4 border-white shadow`} />

                      <div
                        className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => toggleExpand(item.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`text-xs px-2 py-0.5 rounded ${colors.text} ${colors.bg} font-medium uppercase`}>
                              {item.type}
                            </span>
                            <h3 className="font-semibold mt-1">{item.name}</h3>
                            {item.timeRef && (
                              <span className="text-sm text-gray-500">{item.timeRef}</span>
                            )}
                          </div>
                          {link && (
                            <Link
                              href={link}
                              className="text-sm text-blue-600 hover:underline"
                              onClick={e => e.stopPropagation()}
                            >
                              View Details
                            </Link>
                          )}
                        </div>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            {item.description && (
                              <p className="text-gray-600 mb-2">{item.description}</p>
                            )}

                            {item.characters.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                <span className="text-sm text-gray-500">Characters:</span>
                                {item.characters.map(c => (
                                  <Link
                                    key={c.id}
                                    href={`/characters/${c.id}`}
                                    className="text-sm px-2 py-0.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    {c.name}
                                  </Link>
                                ))}
                              </div>
                            )}

                            {item.locations.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                <span className="text-sm text-gray-500">Locations:</span>
                                {item.locations.map((l, i) => (
                                  <span key={i} className="text-sm px-2 py-0.5 bg-green-100 text-green-700 rounded">
                                    {l.name}
                                  </span>
                                ))}
                              </div>
                            )}

                            {Object.keys(item.metadata).length > 0 && (
                              <div className="mt-2 text-sm text-gray-500">
                                {Object.entries(item.metadata).map(([k, v]) => v && (
                                  <span key={k} className="mr-3">
                                    <strong>{k}:</strong> {String(v)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(data.bookGroups)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([book, items]) => {
                const bookItems = items.filter(i =>
                  (filter === 'all' || i.type === filter) &&
                  (!search || i.name.toLowerCase().includes(search.toLowerCase()))
                );
                if (bookItems.length === 0) return null;

                return (
                  <div key={book} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="bg-gray-800 text-white p-4">
                      <h2 className="text-xl font-bold">{book}</h2>
                      <p className="text-gray-300 text-sm">{bookItems.length} items</p>
                    </div>
                    <div className="p-4 space-y-2">
                      {bookItems.map(item => {
                        const colors = TYPE_COLORS[item.type];
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 p-2 rounded ${colors.bg}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                            <span className={`text-xs ${colors.text} uppercase font-medium w-16`}>
                              {item.type}
                            </span>
                            <span className="flex-1 font-medium">{item.name}</span>
                            {item.timeRef && (
                              <span className="text-sm text-gray-500">{item.timeRef}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
