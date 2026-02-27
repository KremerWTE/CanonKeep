'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Character {
  id: string;
  name: string;
  title: string | null;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  aliases: string | null;
  nameVariants: string | null;
  archetype: string | null;
  age: string | null;
  affiliationRole: string | null;
  hubLocation: string | null;
  bssRole: string | null;
  wivesClubRole: string | null;
  maisonAureliaRole: string | null;
  pohRole: string | null;
  education: string | null;
  careerHistory: string | null;
  background: string | null;
  modeledAfter: string | null;
  personality: string | null;
  motivations: string | null;
  fears: string | null;
  flaw: string | null;
  secrets: string | null;
  voiceNotes: string | null;
  catchphrases: string | null;
  appearance: string | null;
  wardrobeStyle: string | null;
  fitnessSports: string | null;
  relationships: string | null;
  mentorsMentees: string | null;
  majorCases: string | null;
  firstAppearance: string | null;
  reputationalNotes: string | null;
  faithRoots: string | null;
  clubsAssociations: string | null;
  arcStart: string | null;
  arcChange: string | null;
  arcEnd: string | null;
  sourceFiles: string | null;
  rawNotes: string | null;
}

export default function EditCharacterPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/characters/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load character');
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!character) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/characters/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character),
      });

      if (!res.ok) throw new Error('Failed to save');

      router.push(`/characters/${params.id}`);
    } catch (err) {
      setError('Failed to save character');
      setSaving(false);
    }
  };

  const updateField = (field: keyof Character, value: string | null) => {
    if (!character) return;
    setCharacter({ ...character, [field]: value || null });
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!character) return <div className="p-8">Character not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit: {character.name}</h1>
          <div className="flex gap-2">
            <Link href={`/characters/${params.id}`} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identity Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Identity</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Canon Name</label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={character.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  placeholder="Mr., Mrs., Dr., etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={character.firstName || ''}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={character.lastName || ''}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nickname/Callsign</label>
                <input
                  type="text"
                  value={character.nickname || ''}
                  onChange={(e) => updateField('nickname', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name Variants</label>
                <input
                  type="text"
                  value={character.nameVariants || ''}
                  onChange={(e) => updateField('nameVariants', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Classification Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Classification</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Archetype</label>
                <input
                  type="text"
                  value={character.archetype || ''}
                  onChange={(e) => updateField('archetype', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="text"
                  value={character.age || ''}
                  onChange={(e) => updateField('age', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Affiliations Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Affiliations</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Affiliation/Role</label>
                <input
                  type="text"
                  value={character.affiliationRole || ''}
                  onChange={(e) => updateField('affiliationRole', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hub/Location</label>
                <input
                  type="text"
                  value={character.hubLocation || ''}
                  onChange={(e) => updateField('hubLocation', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">BSS Role</label>
                <input
                  type="text"
                  value={character.bssRole || ''}
                  onChange={(e) => updateField('bssRole', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Wives Club Role</label>
                <input
                  type="text"
                  value={character.wivesClubRole || ''}
                  onChange={(e) => updateField('wivesClubRole', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maison Aurelia Role</label>
                <input
                  type="text"
                  value={character.maisonAureliaRole || ''}
                  onChange={(e) => updateField('maisonAureliaRole', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">POH Role</label>
                <input
                  type="text"
                  value={character.pohRole || ''}
                  onChange={(e) => updateField('pohRole', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Background Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Background & Education</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Education (all)</label>
                <textarea
                  value={character.education || ''}
                  onChange={(e) => updateField('education', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Career History</label>
                <textarea
                  value={character.careerHistory || ''}
                  onChange={(e) => updateField('careerHistory', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Background</label>
                <textarea
                  value={character.background || ''}
                  onChange={(e) => updateField('background', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Personality Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Personality & Character</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Modeled After / Lookalike</label>
                <input
                  type="text"
                  value={character.modeledAfter || ''}
                  onChange={(e) => updateField('modeledAfter', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Personality</label>
                <textarea
                  value={character.personality || ''}
                  onChange={(e) => updateField('personality', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Motivations</label>
                  <textarea
                    value={character.motivations || ''}
                    onChange={(e) => updateField('motivations', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fears</label>
                  <textarea
                    value={character.fears || ''}
                    onChange={(e) => updateField('fears', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fatal Flaw</label>
                  <textarea
                    value={character.flaw || ''}
                    onChange={(e) => updateField('flaw', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Secrets</label>
                  <textarea
                    value={character.secrets || ''}
                    onChange={(e) => updateField('secrets', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Voice Notes</label>
                <textarea
                  value={character.voiceNotes || ''}
                  onChange={(e) => updateField('voiceNotes', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catchphrases</label>
                <input
                  type="text"
                  value={character.catchphrases || ''}
                  onChange={(e) => updateField('catchphrases', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Physical Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Physical</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Physical Description</label>
                <textarea
                  value={character.appearance || ''}
                  onChange={(e) => updateField('appearance', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Wardrobe / Style</label>
                <textarea
                  value={character.wardrobeStyle || ''}
                  onChange={(e) => updateField('wardrobeStyle', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fitness / Sports</label>
                <input
                  type="text"
                  value={character.fitnessSports || ''}
                  onChange={(e) => updateField('fitnessSports', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Relationships Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Relationships & Network</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationships</label>
                <textarea
                  value={character.relationships || ''}
                  onChange={(e) => updateField('relationships', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mentors / Mentees</label>
                <textarea
                  value={character.mentorsMentees || ''}
                  onChange={(e) => updateField('mentorsMentees', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Story Presence</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Major Cases / Projects</label>
                <textarea
                  value={character.majorCases || ''}
                  onChange={(e) => updateField('majorCases', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Appearance</label>
                  <input
                    type="text"
                    value={character.firstAppearance || ''}
                    onChange={(e) => updateField('firstAppearance', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source Files</label>
                  <input
                    type="text"
                    value={character.sourceFiles || ''}
                    onChange={(e) => updateField('sourceFiles', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reputational Notes</label>
                <textarea
                  value={character.reputationalNotes || ''}
                  onChange={(e) => updateField('reputationalNotes', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Cultural Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Cultural / Personal</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Faith / Roots</label>
                <textarea
                  value={character.faithRoots || ''}
                  onChange={(e) => updateField('faithRoots', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Clubs / Associations</label>
                <textarea
                  value={character.clubsAssociations || ''}
                  onChange={(e) => updateField('clubsAssociations', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Arc Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Character Arc</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Arc Start</label>
                <textarea
                  value={character.arcStart || ''}
                  onChange={(e) => updateField('arcStart', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Arc Change</label>
                <textarea
                  value={character.arcChange || ''}
                  onChange={(e) => updateField('arcChange', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Arc End</label>
                <textarea
                  value={character.arcEnd || ''}
                  onChange={(e) => updateField('arcEnd', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Raw Notes</h2>
            <textarea
              value={character.rawNotes || ''}
              onChange={(e) => updateField('rawNotes', e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
            />
          </section>

          <div className="flex justify-end gap-2">
            <Link href={`/characters/${params.id}`} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
