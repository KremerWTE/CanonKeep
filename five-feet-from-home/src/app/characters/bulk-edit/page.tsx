'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Character {
  id: string;
  name: string;
  archetype: string | null;
  isConfirmed: boolean;
  bssRole: string | null;
  wivesClubRole: string | null;
  tags: string | null;
}

export default function BulkEditPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState<'all' | 'bss' | 'wives' | 'unconfirmed'>('all');

  // Bulk update fields
  const [updateField, setUpdateField] = useState<string>('');
  const [updateValue, setUpdateValue] = useState<string>('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/characters')
      .then(res => res.json())
      .then(data => {
        setCharacters(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const selectAll = () => {
    setSelected(new Set(filteredCharacters.map(c => c.id)));
  };

  const selectNone = () => {
    setSelected(new Set());
  };

  const handleBulkUpdate = async () => {
    if (selected.size === 0) {
      setMessage('No characters selected');
      return;
    }
    if (!updateField || !updateValue) {
      setMessage('Please select a field and enter a value');
      return;
    }

    setUpdating(true);
    setMessage(null);

    try {
      const res = await fetch('/api/characters/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterIds: Array.from(selected),
          updates: { [updateField]: updateValue }
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Successfully updated ${data.updated} characters`);
        // Refresh character list
        const refreshRes = await fetch('/api/characters');
        setCharacters(await refreshRes.json());
        setSelected(new Set());
        setUpdateValue('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Failed to update characters');
    }

    setUpdating(false);
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) {
      setMessage('No characters selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selected.size} characters? This cannot be undone.`)) {
      return;
    }

    setUpdating(true);
    setMessage(null);

    try {
      const res = await fetch('/api/characters/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterIds: Array.from(selected) })
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Successfully deleted ${data.deleted} characters`);
        setCharacters(characters.filter(c => !selected.has(c.id)));
        setSelected(new Set());
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Failed to delete characters');
    }

    setUpdating(false);
  };

  // Filter characters
  let filteredCharacters = characters;
  if (filter) {
    const lower = filter.toLowerCase();
    filteredCharacters = filteredCharacters.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.archetype?.toLowerCase().includes(lower) ||
      c.tags?.toLowerCase().includes(lower)
    );
  }
  if (filterField === 'bss') {
    filteredCharacters = filteredCharacters.filter(c => c.bssRole);
  } else if (filterField === 'wives') {
    filteredCharacters = filteredCharacters.filter(c => c.wivesClubRole);
  } else if (filterField === 'unconfirmed') {
    filteredCharacters = filteredCharacters.filter(c => !c.isConfirmed);
  }

  if (loading) return <div className="p-8">Loading characters...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Bulk Edit Characters</h1>
            <p className="text-gray-600">{characters.length} total, {filteredCharacters.length} filtered, {selected.size} selected</p>
          </div>
          <Link href="/characters" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Back to Characters
          </Link>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('Error') || message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search by name, archetype, tags..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 border rounded flex-1 min-w-[200px]"
            />

            <select
              value={filterField}
              onChange={e => setFilterField(e.target.value as any)}
              className="px-4 py-2 border rounded"
            >
              <option value="all">All Characters</option>
              <option value="bss">BSS Team Only</option>
              <option value="wives">Wives Club Only</option>
              <option value="unconfirmed">Unconfirmed Only</option>
            </select>

            <button onClick={selectAll} className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              Select All ({filteredCharacters.length})
            </button>
            <button onClick={selectNone} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Select None
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold mb-3">Bulk Actions ({selected.size} selected)</h3>
          <div className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Field to Update</label>
              <select
                value={updateField}
                onChange={e => setUpdateField(e.target.value)}
                className="px-4 py-2 border rounded"
              >
                <option value="">Select field...</option>
                <option value="isConfirmed">Confirmed Status</option>
                <option value="archetype">Archetype</option>
                <option value="bssRole">BSS Role</option>
                <option value="wivesClubRole">Wives Club Role</option>
                <option value="affiliationRole">Affiliation Role</option>
                <option value="hubLocation">Hub Location</option>
                <option value="tags">Tags (append)</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-gray-600 mb-1">New Value</label>
              {updateField === 'isConfirmed' ? (
                <select
                  value={updateValue}
                  onChange={e => setUpdateValue(e.target.value)}
                  className="px-4 py-2 border rounded w-full"
                >
                  <option value="">Select...</option>
                  <option value="true">Confirmed</option>
                  <option value="false">Unconfirmed</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={updateValue}
                  onChange={e => setUpdateValue(e.target.value)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Enter value..."
                />
              )}
            </div>

            <button
              onClick={handleBulkUpdate}
              disabled={updating || selected.size === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Apply to Selected'}
            </button>

            <button
              onClick={handleBulkDelete}
              disabled={updating || selected.size === 0}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Delete Selected
            </button>
          </div>
        </div>

        {/* Character List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selected.size === filteredCharacters.length && filteredCharacters.length > 0}
                    onChange={() => selected.size === filteredCharacters.length ? selectNone() : selectAll()}
                    className="w-4 h-4"
                  />
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Archetype</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharacters.map(char => (
                <tr
                  key={char.id}
                  className={`border-t hover:bg-gray-50 cursor-pointer ${selected.has(char.id) ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleSelect(char.id)}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.has(char.id)}
                      onChange={() => toggleSelect(char.id)}
                      onClick={e => e.stopPropagation()}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-3 font-medium">{char.name}</td>
                  <td className="p-3 text-sm text-gray-600">{char.archetype || '-'}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {char.bssRole || char.wivesClubRole || '-'}
                  </td>
                  <td className="p-3">
                    {char.isConfirmed ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Confirmed</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Unconfirmed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
