'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DocPullModal from '@/components/DocPullModal';

interface Gala {
  id: string;
  name: string;
  organization: string | null;
  venue: string | null;
  location: string | null;
  date: string | null;
  purpose: string | null;
  dresscode: string | null;
  attendees: string | null;
  significance: string | null;
  events: string | null;
  hostOrganizer: string | null;
  bookAppearance: string | null;
  clothingDescriptions: string | null;
  beforeActivities: string | null;
  afterActivities: string | null;
  nextMorning: string | null;
  tags: string | null;
}

export default function EditGalaPage() {
  const params = useParams();
  const router = useRouter();
  const [gala, setGala] = useState<Gala | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Doc pull modal state
  const [pullModalOpen, setPullModalOpen] = useState(false);
  const [pullTargetField, setPullTargetField] = useState<keyof Gala | null>(null);
  const [pullFieldName, setPullFieldName] = useState<string>('');

  useEffect(() => {
    fetch(`/api/galas/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setGala(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load gala');
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gala) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/galas/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gala),
      });

      if (!res.ok) throw new Error('Failed to save');
      router.push('/galas');
    } catch (err) {
      setError('Failed to save gala');
      setSaving(false);
    }
  };

  const updateField = (field: keyof Gala, value: string | null) => {
    if (!gala) return;
    setGala({ ...gala, [field]: value || null });
  };

  const openPullModal = (field: keyof Gala, fieldLabel: string) => {
    setPullTargetField(field);
    setPullFieldName(fieldLabel);
    setPullModalOpen(true);
  };

  const handlePullSelect = (text: string, source: string) => {
    if (!pullTargetField || !gala) return;

    const currentValue = gala[pullTargetField] || '';
    const newValue = currentValue
      ? `${currentValue}\n\n[From ${source}]\n${text}`
      : text;

    updateField(pullTargetField, newValue);
  };

  // Reusable field with pull button
  const FieldWithPull = ({
    field,
    label,
    value,
    type = 'textarea',
    rows = 4,
    placeholder,
  }: {
    field: keyof Gala;
    label: string;
    value: string;
    type?: 'input' | 'textarea';
    rows?: number;
    placeholder?: string;
  }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={() => openPullModal(field, label)}
          className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          Pull from docs
        </button>
      </div>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => updateField(field, e.target.value)}
          rows={rows}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => updateField(field, e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!gala) return <div className="p-8">Gala not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Gala: {gala.name}</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => openPullModal('significance', 'All fields')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Search Docs
            </button>
            <Link href="/galas" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
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
          {/* Basic Info */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gala Name</label>
                <input
                  type="text"
                  value={gala.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input
                  type="text"
                  value={gala.organization || ''}
                  onChange={(e) => updateField('organization', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  placeholder="Who it's for"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Venue</label>
                <input
                  type="text"
                  value={gala.venue || ''}
                  onChange={(e) => updateField('venue', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location (City)</label>
                <input
                  type="text"
                  value={gala.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date / Timeline</label>
                <input
                  type="text"
                  value={gala.date || ''}
                  onChange={(e) => updateField('date', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dress Code</label>
                <input
                  type="text"
                  value={gala.dresscode || ''}
                  onChange={(e) => updateField('dresscode', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  placeholder="Black tie, cocktail, etc."
                />
              </div>
            </div>
          </section>

          {/* Purpose & Significance */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Purpose & Story</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Purpose</label>
                <input
                  type="text"
                  value={gala.purpose || ''}
                  onChange={(e) => updateField('purpose', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  placeholder="Charity, networking, celebration, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Host / Organizer</label>
                <input
                  type="text"
                  value={gala.hostOrganizer || ''}
                  onChange={(e) => updateField('hostOrganizer', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <FieldWithPull
                field="significance"
                label="Story Significance"
                value={gala.significance || ''}
                rows={4}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Book Appearance</label>
                <input
                  type="text"
                  value={gala.bookAppearance || ''}
                  onChange={(e) => updateField('bookAppearance', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </section>

          {/* Attendees & Outfits */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Attendees & Outfits</h2>
            <div className="space-y-4">
              <FieldWithPull
                field="attendees"
                label="Key Attendees"
                value={gala.attendees || ''}
                rows={2}
                placeholder="Elena, Jasper, Addie, Harper, etc."
              />
              <FieldWithPull
                field="clothingDescriptions"
                label="Clothing Descriptions (JSON format)"
                value={gala.clothingDescriptions || ''}
                rows={6}
                placeholder='{"Elena": "Emerald silk gown...", "Jasper": "Tom Ford tuxedo..."}'
              />
              <p className="text-xs text-gray-500 -mt-2">
                Format: {`{"Character Name": "Outfit description"}`}
              </p>
            </div>
          </section>

          {/* Timeline of Events */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Timeline of Events</h2>
            <div className="space-y-4">
              <FieldWithPull
                field="beforeActivities"
                label="Before Activities"
                value={gala.beforeActivities || ''}
                rows={4}
                placeholder="Preparation, arrival, pre-event drinks..."
              />
              <FieldWithPull
                field="events"
                label="During the Gala (Events, Networking, Dancing)"
                value={gala.events || ''}
                rows={6}
                placeholder="Speeches, networking moments, dancing, key interactions..."
              />
              <FieldWithPull
                field="afterActivities"
                label="After Activities"
                value={gala.afterActivities || ''}
                rows={4}
                placeholder="After-party, private conversations, departures..."
              />
              <FieldWithPull
                field="nextMorning"
                label="Next Morning"
                value={gala.nextMorning || ''}
                rows={3}
                placeholder="Breakfast, reflection, follow-up conversations..."
              />
            </div>
          </section>

          {/* Tags */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Tags</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                value={gala.tags || ''}
                onChange={(e) => updateField('tags', e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              />
            </div>
          </section>

          <div className="flex justify-end gap-2">
            <Link href="/galas" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
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

      {/* Doc Pull Modal */}
      <DocPullModal
        isOpen={pullModalOpen}
        onClose={() => setPullModalOpen(false)}
        onSelect={handlePullSelect}
        entityType="gala"
        entityName={gala.name}
        fieldName={pullFieldName}
      />
    </div>
  );
}
