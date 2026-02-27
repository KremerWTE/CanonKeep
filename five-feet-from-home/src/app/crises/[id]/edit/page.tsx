'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DocPullModal from '@/components/DocPullModal';

interface Crisis {
  id: string;
  name: string;
  codeName: string | null;
  clientName: string | null;
  clientType: string | null;
  crisisType: string | null;
  severity: string | null;
  location: string | null;
  timeframe: string | null;
  description: string | null;
  situation: string | null;
  complications: string | null;
  resolution: string | null;
  outcome: string | null;
  lessonsLearned: string | null;
  bssTeam: string | null;
  stakes: string | null;
  status: string;
  bookAppearance: string | null;
  tags: string | null;
}

export default function EditCrisisPage() {
  const params = useParams();
  const router = useRouter();
  const [crisis, setCrisis] = useState<Crisis | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pullModalOpen, setPullModalOpen] = useState(false);
  const [pullTargetField, setPullTargetField] = useState<keyof Crisis | null>(null);
  const [pullFieldName, setPullFieldName] = useState<string>('');

  useEffect(() => {
    fetch(`/api/crises/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCrisis(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load crisis');
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crisis) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/crises/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crisis),
      });

      if (!res.ok) throw new Error('Failed to save');
      router.push('/crises');
    } catch (err) {
      setError('Failed to save crisis');
      setSaving(false);
    }
  };

  const updateField = (field: keyof Crisis, value: string | null) => {
    if (!crisis) return;
    setCrisis({ ...crisis, [field]: value || null });
  };

  const openPullModal = (field: keyof Crisis, fieldLabel: string) => {
    setPullTargetField(field);
    setPullFieldName(fieldLabel);
    setPullModalOpen(true);
  };

  const handlePullSelect = (text: string, source: string) => {
    if (!pullTargetField || !crisis) return;
    const currentValue = crisis[pullTargetField] || '';
    const newValue = currentValue ? `${currentValue}\n\n[From ${source}]\n${text}` : text;
    updateField(pullTargetField, newValue);
  };

  const FieldWithPull = ({
    field, label, value, rows = 3, placeholder,
  }: {
    field: keyof Crisis; label: string; value: string; rows?: number; placeholder?: string;
  }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button type="button" onClick={() => openPullModal(field, label)}
          className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
          Pull from docs
        </button>
      </div>
      <textarea value={value} onChange={(e) => updateField(field, e.target.value)}
        rows={rows} className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
        placeholder={placeholder} />
    </div>
  );

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!crisis) return <div className="p-8">Crisis not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Crisis: {crisis.name}</h1>
          <div className="flex gap-2">
            <button type="button" onClick={() => openPullModal('description', 'All fields')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Search Docs
            </button>
            <Link href="/crises" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
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
                <label className="block text-sm font-medium text-gray-700">Crisis Name</label>
                <input type="text" value={crisis.name} onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Code Name</label>
                <input type="text" value={crisis.codeName || ''} onChange={(e) => updateField('codeName', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Internal code name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity</label>
                <select value={crisis.severity || ''} onChange={(e) => updateField('severity', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border">
                  <option value="">Select severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select value={crisis.status} onChange={(e) => updateField('status', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border">
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Client Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input type="text" value={crisis.clientName || ''} onChange={(e) => updateField('clientName', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Type</label>
                <input type="text" value={crisis.clientType || ''} onChange={(e) => updateField('clientType', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Fortune 500, Government, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Crisis Type</label>
                <input type="text" value={crisis.crisisType || ''} onChange={(e) => updateField('crisisType', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Data breach, Scandal, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" value={crisis.location || ''} onChange={(e) => updateField('location', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Crisis Details</h2>
            <div className="space-y-4">
              <FieldWithPull field="description" label="Description" value={crisis.description || ''} />
              <FieldWithPull field="situation" label="Initial Situation" value={crisis.situation || ''} />
              <FieldWithPull field="complications" label="Complications" value={crisis.complications || ''} />
              <FieldWithPull field="stakes" label="Stakes" value={crisis.stakes || ''} rows={2} />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Resolution</h2>
            <div className="space-y-4">
              <FieldWithPull field="resolution" label="Resolution" value={crisis.resolution || ''} />
              <FieldWithPull field="outcome" label="Outcome" value={crisis.outcome || ''} rows={2} />
              <FieldWithPull field="lessonsLearned" label="Lessons Learned" value={crisis.lessonsLearned || ''} rows={2} />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Team & Story</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">BSS Team (comma-separated)</label>
                <input type="text" value={crisis.bssTeam || ''} onChange={(e) => updateField('bssTeam', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Jasper, Harper, Hawk, etc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeframe</label>
                  <input type="text" value={crisis.timeframe || ''} onChange={(e) => updateField('timeframe', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Book Appearance</label>
                  <input type="text" value={crisis.bookAppearance || ''} onChange={(e) => updateField('bookAppearance', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input type="text" value={crisis.tags || ''} onChange={(e) => updateField('tags', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-2">
            <Link href="/crises" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <DocPullModal isOpen={pullModalOpen} onClose={() => setPullModalOpen(false)} onSelect={handlePullSelect}
        entityType="crisis" entityName={crisis.name} fieldName={pullFieldName} />
    </div>
  );
}
