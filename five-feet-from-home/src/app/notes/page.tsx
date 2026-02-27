'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Note {
  id: string;
  title: string | null;
  content: string;
  suggestedType: string | null;
  suggestedName: string | null;
  tags: string | null;
  processed: boolean;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // New note form
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newEntityType, setNewEntityType] = useState('');
  const [newEntityId, setNewEntityId] = useState('');
  const [newTags, setNewTags] = useState('');
  const [saving, setSaving] = useState(false);

  const loadNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setSaving(true);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle || null,
          content: newContent,
          entityType: newEntityType || null,
          entityId: newEntityId || null,
          tags: newTags || null
        })
      });

      if (res.ok) {
        setNewTitle('');
        setNewContent('');
        setNewEntityType('');
        setNewEntityId('');
        setNewTags('');
        setShowForm(false);
        loadNotes();
      }
    } catch (e) {
      console.error('Failed to create note:', e);
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this note?')) return;

    try {
      await fetch(`/api/notes?id=${id}`, { method: 'DELETE' });
      setNotes(notes.filter(n => n.id !== id));
    } catch (e) {
      console.error('Failed to delete note:', e);
    }
  };

  // Filter notes
  let filteredNotes = notes;
  if (filter !== 'all') {
    filteredNotes = notes.filter(n => n.suggestedType === filter);
  }

  // Get unique entity types
  const entityTypes = [...new Set(notes.map(n => n.suggestedType).filter(Boolean))];

  if (loading) return <div className="p-8">Loading notes...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notes & Annotations</h1>
            <p className="text-gray-600">{notes.length} notes</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : '+ New Note'}
            </button>
            <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Dashboard
            </Link>
          </div>
        </div>

        {/* New Note Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Note</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title (optional)</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Note title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  rows={4}
                  placeholder="Write your note..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                  <select
                    value={newEntityType}
                    onChange={e => setNewEntityType(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">General note</option>
                    <option value="character">Character</option>
                    <option value="crisis">Crisis</option>
                    <option value="gala">Gala</option>
                    <option value="book">Book</option>
                    <option value="chapter">Chapter</option>
                    <option value="storyline">Storyline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entity Name/ID</label>
                  <input
                    type="text"
                    value={newEntityId}
                    onChange={e => setNewEntityId(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="e.g., Jasper Barrett"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="e.g., todo, research, idea"
                />
              </div>

              <button
                onClick={handleCreate}
                disabled={saving || !newContent.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All ({notes.length})
          </button>
          {entityTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type!)}
              className={`px-3 py-1 rounded text-sm ${filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {type} ({notes.filter(n => n.suggestedType === type).length})
            </button>
          ))}
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No notes yet. Create one to get started!
            </div>
          ) : (
            filteredNotes.map(note => (
              <div key={note.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {note.title && <h3 className="font-semibold">{note.title}</h3>}
                    {note.suggestedType && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                        {note.suggestedType}: {note.suggestedName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                {note.tags && (
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {note.tags.split(',').map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
