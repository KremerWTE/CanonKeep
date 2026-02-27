'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DocPullModal from '@/components/DocPullModal';

interface BusinessTrip {
  id: string;
  name: string;
  traveler: string | null;
  destination: string | null;
  origin: string | null;
  purpose: string | null;
  duration: string | null;
  timeframe: string | null;
  crisisId: string | null;
  crisisName: string | null;
  companions: string | null;
  storyEvents: string | null;
  homeImpact: string | null;
  outcome: string | null;
  bookAppearance: string | null;
  tripOrder: number | null;
  tags: string | null;
}

export default function EditBusinessTripPage() {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<BusinessTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pullModalOpen, setPullModalOpen] = useState(false);
  const [pullTargetField, setPullTargetField] = useState<keyof BusinessTrip | null>(null);
  const [pullFieldName, setPullFieldName] = useState<string>('');

  useEffect(() => {
    fetch(`/api/trips/${params.id}`)
      .then((res) => res.json())
      .then((data) => { setTrip(data); setLoading(false); })
      .catch(() => { setError('Failed to load business trip'); setLoading(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trip) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${params.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(trip),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/trips');
    } catch { setError('Failed to save business trip'); setSaving(false); }
  };

  const updateField = (field: keyof BusinessTrip, value: string | number | null) => {
    if (!trip) return;
    setTrip({ ...trip, [field]: value ?? null });
  };

  const openPullModal = (field: keyof BusinessTrip, fieldLabel: string) => {
    setPullTargetField(field); setPullFieldName(fieldLabel); setPullModalOpen(true);
  };

  const handlePullSelect = (text: string, source: string) => {
    if (!pullTargetField || !trip) return;
    const currentValue = String(trip[pullTargetField] || '');
    updateField(pullTargetField, currentValue ? `${currentValue}\n\n[From ${source}]\n${text}` : text);
  };

  const FieldWithPull = ({ field, label, value, rows = 3, placeholder }: {
    field: keyof BusinessTrip; label: string; value: string; rows?: number; placeholder?: string;
  }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button type="button" onClick={() => openPullModal(field, label)}
          className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200">Pull from docs</button>
      </div>
      <textarea value={value} onChange={(e) => updateField(field, e.target.value)} rows={rows}
        className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder={placeholder} />
    </div>
  );

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!trip) return <div className="p-8">Business trip not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Trip: {trip.name}</h1>
          <div className="flex gap-2">
            <button type="button" onClick={() => openPullModal('storyEvents', 'All fields')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Search Docs</button>
            <Link href="/trips" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
            <button onClick={handleSubmit} disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Trip Name</label>
                <input type="text" value={trip.name} onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Traveler</label>
                <input type="text" value={trip.traveler || ''} onChange={(e) => updateField('traveler', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Origin</label>
                <input type="text" value={trip.origin || ''} onChange={(e) => updateField('origin', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input type="text" value={trip.destination || ''} onChange={(e) => updateField('destination', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input type="text" value={trip.duration || ''} onChange={(e) => updateField('duration', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="3 days, 2 weeks" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Trip Order</label>
                <input type="number" value={trip.tripOrder || ''} onChange={(e) => updateField('tripOrder', e.target.value ? parseInt(e.target.value) : null)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Purpose & Related Crisis</h2>
            <div className="space-y-4">
              <FieldWithPull field="purpose" label="Purpose" value={trip.purpose || ''} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Related Crisis Name</label>
                  <input type="text" value={trip.crisisName || ''} onChange={(e) => updateField('crisisName', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeframe</label>
                  <input type="text" value={trip.timeframe || ''} onChange={(e) => updateField('timeframe', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Companions & Story Events</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Companions (comma-separated)</label>
                <input type="text" value={trip.companions || ''} onChange={(e) => updateField('companions', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Harper, Hawk, etc." />
              </div>
              <FieldWithPull field="storyEvents" label="Story Events" value={trip.storyEvents || ''} rows={4} placeholder="What happens during the trip..." />
              <FieldWithPull field="homeImpact" label="Impact on Home/Family" value={trip.homeImpact || ''} />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Outcome & Story</h2>
            <div className="space-y-4">
              <FieldWithPull field="outcome" label="Outcome" value={trip.outcome || ''} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Book Appearance</label>
                <input type="text" value={trip.bookAppearance || ''} onChange={(e) => updateField('bookAppearance', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input type="text" value={trip.tags || ''} onChange={(e) => updateField('tags', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-2">
            <Link href="/trips" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <DocPullModal isOpen={pullModalOpen} onClose={() => setPullModalOpen(false)} onSelect={handlePullSelect}
        entityType="trip" entityName={trip.name} fieldName={pullFieldName} />
    </div>
  );
}
