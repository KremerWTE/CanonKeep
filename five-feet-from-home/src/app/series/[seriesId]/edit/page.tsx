'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DocPullModal from '@/components/DocPullModal';

interface BookSeries {
  id: string;
  name: string;
  seriesType: string | null;
  protagonist: string | null;
  premise: string | null;
  themes: string | null;
  totalBooks: number | null;
  status: string;
  readingOrder: number | null;
  parentSeries: string | null;
  connections: string | null;
  timeline: string | null;
  books: string | null;
  tags: string | null;
}

export default function EditBookSeriesPage() {
  const params = useParams();
  const router = useRouter();
  const [series, setSeries] = useState<BookSeries | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pullModalOpen, setPullModalOpen] = useState(false);
  const [pullTargetField, setPullTargetField] = useState<keyof BookSeries | null>(null);
  const [pullFieldName, setPullFieldName] = useState<string>('');

  useEffect(() => {
    fetch(`/api/series/${params.seriesId}`)
      .then((res) => res.json())
      .then((data) => { setSeries(data); setLoading(false); })
      .catch(() => { setError('Failed to load book series'); setLoading(false); });
  }, [params.seriesId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!series) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/series/${params.seriesId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(series),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/series');
    } catch { setError('Failed to save book series'); setSaving(false); }
  };

  const updateField = (field: keyof BookSeries, value: string | number | null) => {
    if (!series) return;
    setSeries({ ...series, [field]: value ?? null });
  };

  const openPullModal = (field: keyof BookSeries, fieldLabel: string) => {
    setPullTargetField(field); setPullFieldName(fieldLabel); setPullModalOpen(true);
  };

  const handlePullSelect = (text: string, source: string) => {
    if (!pullTargetField || !series) return;
    const currentValue = String(series[pullTargetField] || '');
    updateField(pullTargetField, currentValue ? `${currentValue}\n\n[From ${source}]\n${text}` : text);
  };

  const FieldWithPull = ({ field, label, value, rows = 4, placeholder }: {
    field: keyof BookSeries; label: string; value: string; rows?: number; placeholder?: string;
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
  if (!series) return <div className="p-8">Book series not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Series: {series.name}</h1>
          <div className="flex gap-2">
            <button type="button" onClick={() => openPullModal('premise', 'All fields')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Search Docs</button>
            <Link href="/series" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
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
                <label className="block text-sm font-medium text-gray-700">Series Name</label>
                <input type="text" value={series.name} onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Series Type</label>
                <select value={series.seriesType || ''} onChange={(e) => updateField('seriesType', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border">
                  <option value="">Select type</option>
                  <option value="Main">Main</option>
                  <option value="Spin-off">Spin-off</option>
                  <option value="Companion">Companion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Protagonist</label>
                <input type="text" value={series.protagonist || ''} onChange={(e) => updateField('protagonist', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select value={series.status} onChange={(e) => updateField('status', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border">
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Books</label>
                <input type="number" value={series.totalBooks || ''} onChange={(e) => updateField('totalBooks', e.target.value ? parseInt(e.target.value) : null)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reading Order</label>
                <input type="number" value={series.readingOrder || ''} onChange={(e) => updateField('readingOrder', e.target.value ? parseInt(e.target.value) : null)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Premise & Themes</h2>
            <div className="space-y-4">
              <FieldWithPull field="premise" label="Premise" value={series.premise || ''} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Themes (comma-separated)</label>
                <input type="text" value={series.themes || ''} onChange={(e) => updateField('themes', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Romance, family, redemption" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Series Connections</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Series (if spin-off)</label>
                <input type="text" value={series.parentSeries || ''} onChange={(e) => updateField('parentSeries', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <FieldWithPull field="connections" label="Connections to Other Series" value={series.connections || ''} rows={3} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Timeline (relative to main series)</label>
                <input type="text" value={series.timeline || ''} onChange={(e) => updateField('timeline', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Concurrent with Book 2, After main series" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Books in Series</h2>
            <div className="space-y-4">
              <FieldWithPull field="books" label="Books (JSON array format)" value={series.books || ''} rows={8}
                placeholder='[{"title": "Book 1 Title", "synopsis": "..."}, ...]' />
              <p className="text-xs text-gray-500">Format: {`[{"title": "Book Title", "synopsis": "Brief description"}]`}</p>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input type="text" value={series.tags || ''} onChange={(e) => updateField('tags', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-2">
            <Link href="/series" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <DocPullModal isOpen={pullModalOpen} onClose={() => setPullModalOpen(false)} onSelect={handlePullSelect}
        entityType="series" entityName={series.name} fieldName={pullFieldName} />
    </div>
  );
}
