'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Character {
  id: string;
  name: string;
  modeledAfter: string | null;
  appearance: string | null;
  portraitUrl: string | null;
  portraitPrompt: string | null;
  archetype: string | null;
}

interface Stats {
  total: number;
  withPrompt: number;
  withPortrait: number;
  withModeledAfter: number;
}

export default function PortraitsPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'withPrompt' | 'withPortrait' | 'needsPrompt'>('all');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadData = async () => {
    const res = await fetch('/api/portraits');
    const data = await res.json();
    setCharacters(data.characters || []);
    setStats(data.stats || null);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const generatePrompt = async (characterId: string) => {
    setGenerating(true);
    setMessage(null);

    try {
      const res = await fetch('/api/portraits/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId })
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Generated prompt for ${data.characterName}`);
        loadData();
        if (selectedChar?.id === characterId) {
          setSelectedChar({ ...selectedChar, portraitPrompt: data.prompt });
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Failed to generate prompt');
    }

    setGenerating(false);
  };

  const generateAllPrompts = async () => {
    setGenerating(true);
    setMessage('Generating prompts for all characters...');

    const needsPrompt = characters.filter(c => !c.portraitPrompt && (c.modeledAfter || c.appearance));

    let count = 0;
    for (const char of needsPrompt) {
      try {
        const res = await fetch('/api/portraits/generate-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ characterId: char.id })
        });
        if (res.ok) count++;
      } catch {
        // Continue
      }
    }

    setMessage(`Generated ${count} prompts`);
    loadData();
    setGenerating(false);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setMessage('Prompt copied to clipboard!');
    setTimeout(() => setMessage(null), 2000);
  };

  // Filter characters
  let filteredChars = characters;
  if (filter === 'withPrompt') {
    filteredChars = characters.filter(c => c.portraitPrompt);
  } else if (filter === 'withPortrait') {
    filteredChars = characters.filter(c => c.portraitUrl);
  } else if (filter === 'needsPrompt') {
    filteredChars = characters.filter(c => !c.portraitPrompt && (c.modeledAfter || c.appearance));
  }

  if (loading) return <div className="p-8">Loading portrait data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">AI Portrait Generation</h1>
            <p className="text-gray-600">Generate portrait prompts for characters</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateAllPrompts}
              disabled={generating}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate All Prompts'}
            </button>
            <Link href="/characters" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Back
            </Link>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Characters</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.withModeledAfter}</div>
              <div className="text-sm text-gray-600">With "Modeled After"</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">{stats.withPrompt}</div>
              <div className="text-sm text-gray-600">With Prompts</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{stats.withPortrait}</div>
              <div className="text-sm text-gray-600">With Portraits</div>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all', label: `All (${characters.length})` },
            { key: 'withPrompt', label: `With Prompt (${characters.filter(c => c.portraitPrompt).length})` },
            { key: 'withPortrait', label: `With Portrait (${characters.filter(c => c.portraitUrl).length})` },
            { key: 'needsPrompt', label: `Needs Prompt (${characters.filter(c => !c.portraitPrompt && (c.modeledAfter || c.appearance)).length})` }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`px-4 py-2 rounded text-sm ${filter === f.key ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Character List */}
          <div className="col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
            {filteredChars.map(char => (
              <div
                key={char.id}
                onClick={() => setSelectedChar(char)}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedChar?.id === char.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{char.name}</h3>
                    {char.archetype && (
                      <p className="text-sm text-gray-500">{char.archetype}</p>
                    )}
                    {char.modeledAfter && (
                      <p className="text-sm text-blue-600 mt-1">
                        Modeled after: {char.modeledAfter.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {char.portraitPrompt ? (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Has Prompt</span>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); generatePrompt(char.id); }}
                        disabled={generating}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                      >
                        Generate
                      </button>
                    )}
                    {char.portraitUrl && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Has Portrait</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-4">
            {selectedChar ? (
              <>
                <h2 className="text-xl font-bold mb-4">{selectedChar.name}</h2>

                {selectedChar.portraitUrl && (
                  <div className="mb-4">
                    <img
                      src={selectedChar.portraitUrl}
                      alt={selectedChar.name}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {selectedChar.modeledAfter && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-700 mb-1">Modeled After</h3>
                    <p className="text-sm text-gray-600">{selectedChar.modeledAfter}</p>
                  </div>
                )}

                {selectedChar.appearance && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-700 mb-1">Appearance</h3>
                    <p className="text-sm text-gray-600">{selectedChar.appearance.substring(0, 200)}...</p>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-sm text-gray-700">Portrait Prompt</h3>
                    {selectedChar.portraitPrompt && (
                      <button
                        onClick={() => copyPrompt(selectedChar.portraitPrompt!)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                  {selectedChar.portraitPrompt ? (
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded font-mono">
                      {selectedChar.portraitPrompt}
                    </p>
                  ) : (
                    <div className="text-sm text-gray-500 italic">No prompt generated yet</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => generatePrompt(selectedChar.id)}
                    disabled={generating}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    {selectedChar.portraitPrompt ? 'Regenerate' : 'Generate'} Prompt
                  </button>
                  <Link
                    href={`/characters/${selectedChar.id}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    View
                  </Link>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
                  <strong>Tip:</strong> Copy the prompt and use it with DALL-E, Midjourney, or Stable Diffusion to generate the portrait. Then upload the URL.
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-8">
                Select a character to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
