'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Conflict {
  reference: string;
  count: number;
  characters: {
    id: string;
    name: string;
    fullModeledAfter: string;
    archetype: string | null;
  }[];
}

interface LookalikeData {
  totalCharactersWithLookalikes: number;
  totalUniqueReferences: number;
  conflictsCount: number;
  conflicts: Conflict[];
  allReferences: { reference: string; count: number; characters: string[] }[];
}

export default function LookalikesPage() {
  const [data, setData] = useState<LookalikeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'conflicts' | 'all'>('conflicts');

  useEffect(() => {
    fetch('/api/lookalikes')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading lookalike data...</div>;
  if (!data) return <div className="p-8 text-red-600">Failed to load data</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Lookalike Conflict Detection</h1>
            <p className="text-gray-600">Characters sharing the same actress/model inspiration</p>
          </div>
          <Link href="/characters" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Back to Characters
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">{data.totalCharactersWithLookalikes}</div>
            <div className="text-sm text-gray-600">Characters with Lookalikes</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">{data.totalUniqueReferences}</div>
            <div className="text-sm text-gray-600">Unique References</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-red-600">{data.conflictsCount}</div>
            <div className="text-sm text-gray-600">Potential Conflicts</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView('conflicts')}
            className={`px-4 py-2 rounded ${view === 'conflicts' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Conflicts Only ({data.conflictsCount})
          </button>
          <button
            onClick={() => setView('all')}
            className={`px-4 py-2 rounded ${view === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All References ({data.totalUniqueReferences})
          </button>
        </div>

        {view === 'conflicts' ? (
          <div className="space-y-4">
            {data.conflicts.length === 0 ? (
              <div className="bg-green-50 p-6 rounded-lg text-green-700">
                No conflicts detected! Each actress/model reference is unique to one character.
              </div>
            ) : (
              data.conflicts.map((conflict, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-red-700">{conflict.reference}</h3>
                      <p className="text-sm text-gray-500">{conflict.count} characters share this reference</p>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      Conflict
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {conflict.characters.map(char => (
                      <div key={char.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <Link href={`/characters/${char.id}`} className="font-medium text-blue-600 hover:underline">
                            {char.name}
                          </Link>
                          {char.archetype && (
                            <span className="ml-2 text-sm text-gray-500">({char.archetype})</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 max-w-md truncate">
                          {char.fullModeledAfter}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Reference</th>
                  <th className="text-left p-3">Count</th>
                  <th className="text-left p-3">Characters</th>
                </tr>
              </thead>
              <tbody>
                {data.allReferences.map((ref, idx) => (
                  <tr key={idx} className={`border-t ${ref.count > 1 ? 'bg-red-50' : ''}`}>
                    <td className="p-3 font-medium">{ref.reference}</td>
                    <td className="p-3">
                      {ref.count > 1 ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">{ref.count}</span>
                      ) : (
                        <span className="text-gray-500">{ref.count}</span>
                      )}
                    </td>
                    <td className="p-3 text-sm text-gray-600">{ref.characters.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
