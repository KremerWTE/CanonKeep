'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

interface Tag {
  id: string;
  name: string;
  color: string;
  category: string | null;
  description: string | null;
}

interface Entity {
  id: string;
  type: string;
  name: string;
  link: string;
  description?: string;
}

const TYPE_CONFIG: Record<string, { label: string; icon: string }> = {
  character: { label: 'Characters', icon: '👤' },
  crisis: { label: 'Crises', icon: '🚨' },
  gala: { label: 'Galas', icon: '🎉' },
  chapter: { label: 'Chapters', icon: '📖' },
  location: { label: 'Locations', icon: '📍' },
  storyline: { label: 'Storylines', icon: '📚' },
  businessTrip: { label: 'Business Trips', icon: '✈️' }
};

export default function TagDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tag, setTag] = useState<Tag | null>(null);
  const [groupedEntities, setGroupedEntities] = useState<Record<string, Entity[]>>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tags/${id}/entities`)
      .then(res => res.json())
      .then(data => {
        setTag(data.tag);
        setGroupedEntities(data.groupedEntities || {});
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  if (!tag) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Tag Not Found</h1>
            <p className="text-gray-600 mb-4">The tag you are looking for does not exist.</p>
            <Link href="/tags" className="text-blue-600 hover:underline">
              Back to Tags
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: tag.color + '20' }}
              >
                🏷️
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: tag.color }}
                  >
                    {tag.name}
                  </h1>
                  <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                  >
                    {total} item{total !== 1 ? 's' : ''}
                  </span>
                </div>
                {tag.category && (
                  <p className="text-gray-500 capitalize">{tag.category}</p>
                )}
                {tag.description && (
                  <p className="text-gray-600 mt-1">{tag.description}</p>
                )}
              </div>
            </div>
            <Link
              href="/tags"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Back to Tags
            </Link>
          </div>
        </div>

        {/* Entities by Type */}
        {total === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No entities are tagged with &quot;{tag.name}&quot; yet.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEntities).map(([type, entities]) => (
              <div key={type} className="bg-white rounded-lg shadow overflow-hidden">
                <div
                  className="px-4 py-3 border-b flex items-center gap-2"
                  style={{ backgroundColor: tag.color + '10' }}
                >
                  <span className="text-xl">{TYPE_CONFIG[type]?.icon || '📄'}</span>
                  <h2 className="font-semibold">
                    {TYPE_CONFIG[type]?.label || type}
                  </h2>
                  <span className="text-sm text-gray-500">({entities.length})</span>
                </div>
                <div className="divide-y">
                  {entities.map(entity => (
                    <Link
                      key={entity.id}
                      href={entity.link}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{entity.name}</h3>
                          {entity.description && (
                            <p className="text-sm text-gray-500">{entity.description}</p>
                          )}
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Related Tags */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="flex gap-3">
            <Link
              href={`/search/advanced?q=&types=character,crisis,gala,chapter,location`}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Find more entities to tag
            </Link>
            <Link
              href="/tags"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Manage all tags
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
