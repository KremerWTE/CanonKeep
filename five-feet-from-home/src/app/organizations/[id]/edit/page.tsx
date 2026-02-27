'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DocPullModal from '@/components/DocPullModal';

interface Organization {
  id: string;
  name: string;
  shortName: string | null;
  type: string | null;
  industry: string | null;
  description: string | null;
  headquarters: string | null;
  founded: string | null;
  founder: string | null;
  leadership: string | null;
  employees: string | null;
  services: string | null;
  clients: string | null;
  competitors: string | null;
  relationships: string | null;
  significance: string | null;
  tags: string | null;
}

export default function EditOrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pullModalOpen, setPullModalOpen] = useState(false);
  const [pullTargetField, setPullTargetField] = useState<keyof Organization | null>(null);
  const [pullFieldName, setPullFieldName] = useState<string>('');

  useEffect(() => {
    fetch(`/api/organizations/${params.id}`)
      .then((res) => res.json())
      .then((data) => { setOrg(data); setLoading(false); })
      .catch(() => { setError('Failed to load organization'); setLoading(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!org) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/organizations/${params.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(org),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/organizations');
    } catch { setError('Failed to save organization'); setSaving(false); }
  };

  const updateField = (field: keyof Organization, value: string | null) => {
    if (!org) return;
    setOrg({ ...org, [field]: value || null });
  };

  const openPullModal = (field: keyof Organization, fieldLabel: string) => {
    setPullTargetField(field); setPullFieldName(fieldLabel); setPullModalOpen(true);
  };

  const handlePullSelect = (text: string, source: string) => {
    if (!pullTargetField || !org) return;
    const currentValue = org[pullTargetField] || '';
    updateField(pullTargetField, currentValue ? `${currentValue}\n\n[From ${source}]\n${text}` : text);
  };

  const FieldWithPull = ({ field, label, value, rows = 3, placeholder }: {
    field: keyof Organization; label: string; value: string; rows?: number; placeholder?: string;
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
  if (!org) return <div className="p-8">Organization not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit: {org.name}</h1>
          <div className="flex gap-2">
            <button type="button" onClick={() => openPullModal('description', 'All fields')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Search Docs</button>
            <Link href="/organizations" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
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
                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input type="text" value={org.name} onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Name / Acronym</label>
                <input type="text" value={org.shortName || ''} onChange={(e) => updateField('shortName', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="BSS, POH, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input type="text" value={org.type || ''} onChange={(e) => updateField('type', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" placeholder="Corporation, Firm, Club" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <input type="text" value={org.industry || ''} onChange={(e) => updateField('industry', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">About</h2>
            <div className="space-y-4">
              <FieldWithPull field="description" label="Description" value={org.description || ''} rows={4} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Headquarters</label>
                  <input type="text" value={org.headquarters || ''} onChange={(e) => updateField('headquarters', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Founded</label>
                  <input type="text" value={org.founded || ''} onChange={(e) => updateField('founded', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Founder</label>
                  <input type="text" value={org.founder || ''} onChange={(e) => updateField('founder', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size / Employees</label>
                  <input type="text" value={org.employees || ''} onChange={(e) => updateField('employees', e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Leadership & Services</h2>
            <div className="space-y-4">
              <FieldWithPull field="leadership" label="Leadership" value={org.leadership || ''} rows={2} />
              <FieldWithPull field="services" label="Services" value={org.services || ''} />
              <FieldWithPull field="clients" label="Notable Clients" value={org.clients || ''} rows={2} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Competitors</label>
                <input type="text" value={org.competitors || ''} onChange={(e) => updateField('competitors', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Story Role</h2>
            <div className="space-y-4">
              <FieldWithPull field="relationships" label="Relationships to Other Orgs" value={org.relationships || ''} rows={2} />
              <FieldWithPull field="significance" label="Story Significance" value={org.significance || ''} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input type="text" value={org.tags || ''} onChange={(e) => updateField('tags', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-2">
            <Link href="/organizations" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <DocPullModal isOpen={pullModalOpen} onClose={() => setPullModalOpen(false)} onSelect={handlePullSelect}
        entityType="organization" entityName={org.name} fieldName={pullFieldName} />
    </div>
  );
}
