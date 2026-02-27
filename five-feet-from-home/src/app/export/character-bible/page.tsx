'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CharacterEntry {
  name: string;
  nickname: string | null;
  archetype: string | null;
  age: string | null;
  role: string | null;
  personality: string | null;
  background: string | null;
  careerHistory: string | null;
  appearance: string | null;
  modeledAfter: string | null;
  relationships: string[];
}

interface Section {
  title: string;
  characters: CharacterEntry[];
}

interface BibleData {
  title: string;
  generatedAt: string;
  totalCharacters: number;
  sections: Section[];
}

export default function CharacterBiblePage() {
  const [data, setData] = useState<BibleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/export/character-bible')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'character-bible.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-8">Generating Character Bible...</div>;
  if (!data) return <div className="p-8 text-red-600">Failed to generate bible</div>;

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { font-size: 11pt; }
          .character-card { page-break-inside: avoid; }
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Header - no print */}
        <div className="no-print bg-gray-800 text-white p-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Character Bible Export</h1>
              <p className="text-gray-300 text-sm">{data.totalCharacters} characters</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Print / Save PDF
              </button>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Export JSON
              </button>
              <Link href="/characters" className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* Document content */}
        <div className="max-w-4xl mx-auto p-8">
          {/* Title page */}
          <div className="text-center mb-16 pt-16">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-gray-600">
              Generated: {new Date(data.generatedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">{data.totalCharacters} Characters</p>
          </div>

          {/* Table of Contents */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Table of Contents</h2>
            {data.sections.map((section, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">{section.title}</span>
                <span className="text-gray-500">{section.characters.length} characters</span>
              </div>
            ))}
          </div>

          {/* Sections */}
          {data.sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className={sectionIdx > 0 ? 'print-break' : ''}>
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">
                {section.title}
              </h2>

              <div className="space-y-8">
                {section.characters.map((char, charIdx) => (
                  <div key={charIdx} className="character-card border rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{char.name}</h3>
                        {char.nickname && (
                          <p className="text-gray-600 italic">"{char.nickname}"</p>
                        )}
                      </div>
                      {char.age && (
                        <span className="text-gray-500">{char.age}</span>
                      )}
                    </div>

                    {char.archetype && (
                      <p className="text-blue-700 font-medium mb-2">{char.archetype}</p>
                    )}

                    {char.role && (
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Role:</strong> {char.role}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {char.personality && (
                        <div>
                          <strong className="text-gray-700">Personality:</strong>
                          <p className="text-gray-600">{char.personality}</p>
                        </div>
                      )}

                      {char.appearance && (
                        <div>
                          <strong className="text-gray-700">Appearance:</strong>
                          <p className="text-gray-600">{char.appearance}</p>
                        </div>
                      )}

                      {char.modeledAfter && (
                        <div>
                          <strong className="text-gray-700">Modeled After:</strong>
                          <p className="text-gray-600">{char.modeledAfter}</p>
                        </div>
                      )}

                      {char.careerHistory && (
                        <div>
                          <strong className="text-gray-700">Career:</strong>
                          <p className="text-gray-600">{char.careerHistory}</p>
                        </div>
                      )}
                    </div>

                    {char.background && (
                      <div className="mt-3 text-sm">
                        <strong className="text-gray-700">Background:</strong>
                        <p className="text-gray-600 whitespace-pre-wrap">{char.background}</p>
                      </div>
                    )}

                    {char.relationships.length > 0 && (
                      <div className="mt-3 text-sm">
                        <strong className="text-gray-700">Relationships:</strong>
                        <p className="text-gray-600">{char.relationships.join(', ')}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t text-center text-gray-500 text-sm">
            <p>Five Feet From Home - Character Bible</p>
            <p>Generated {new Date(data.generatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
