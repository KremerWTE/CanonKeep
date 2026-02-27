'use client';

import { useEffect, useState } from 'react';
import AIWritingAssistant from '@/components/AIWritingAssistant';
import Link from 'next/link';

interface Chapter {
  id: string;
  title: string | null;
  number: number | null;
  book: { title: string } | null;
}

interface Character {
  id: string;
  name: string;
}

export default function AIAssistantPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [chaptersRes, charactersRes] = await Promise.all([
        fetch('/api/chapters'),
        fetch('/api/characters'),
      ]);

      const chaptersData = await chaptersRes.json();
      const charactersData = await charactersRes.json();

      setChapters(chaptersData.data || []);
      setCharacters(charactersData.data || []);
    } catch {
      console.error('Failed to load data');
    }
    setLoading(false);
  };

  const toggleCharacter = (id: string) => {
    setSelectedCharacters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleInsert = (text: string) => {
    setOutputText((prev) => (prev ? `${prev}\n\n${text}` : text));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  const clearOutput = () => {
    setOutputText('');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Writing Assistant</h1>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Writing Assistant</h1>
          <p className="mt-1 text-gray-600">
            Get AI-powered help with your writing
          </p>
        </div>
        <Link
          href="/drafts"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
        >
          Back to Drafts
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Assistant Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Context Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Context (Optional)</h2>
            <p className="text-sm text-gray-500 mb-4">
              Select a chapter or characters to give the AI more context for better suggestions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working on Chapter
                </label>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">No specific chapter</option>
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.title || `Chapter ${ch.number}`}
                      {ch.book ? ` (${ch.book.title})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Characters ({selectedCharacters.length} selected)
                </label>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                  {characters.slice(0, 20).map((char) => (
                    <button
                      key={char.id}
                      onClick={() => toggleCharacter(char.id)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        selectedCharacters.includes(char.id)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {char.name}
                    </button>
                  ))}
                  {characters.length > 20 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{characters.length - 20} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant Component */}
          <AIWritingAssistant
            chapterId={selectedChapter || undefined}
            characterIds={selectedCharacters.length > 0 ? selectedCharacters : undefined}
            onInsert={handleInsert}
          />

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Tips for Better Results</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>- Provide at least a paragraph of context for continuation</li>
              <li>- Select relevant characters to get consistent voice</li>
              <li>- Use &quot;Alternatives&quot; to explore different approaches</li>
              <li>- The &quot;Outline&quot; tool is great for planning scenes</li>
              <li>- AI suggestions are starting points - always edit and refine</li>
            </ul>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Collected Output</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  disabled={!outputText}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Copy All
                </button>
                <button
                  onClick={clearOutput}
                  disabled={!outputText}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </div>

            {outputText ? (
              <div className="bg-gray-50 rounded-lg p-3 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {outputText}
                </pre>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic text-center py-8">
                Click &quot;Insert&quot; on suggestions to collect them here
              </p>
            )}
          </div>

          {/* Configuration Status */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-medium text-gray-900 mb-2">Configuration</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-gray-600">Demo Mode Active</span>
              </div>
              <p className="text-xs text-gray-500">
                For full AI functionality, configure:
              </p>
              <ul className="text-xs text-gray-500 ml-4 space-y-1">
                <li>- AI_PROVIDER (openai or anthropic)</li>
                <li>- AI_API_KEY (your API key)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
