'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface Tag {
  id: string;
  name: string;
  color: string;
  category: string | null;
  description: string | null;
  usageCount: number;
}

interface Category {
  name: string;
  count: number;
}

const PRESET_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E',
  '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
  '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#6B7280'
];

const PRESET_CATEGORIES = [
  'theme', 'character-trait', 'plot-element', 'setting',
  'emotion', 'relationship', 'conflict', 'symbolism'
];

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6B7280');
  const [newTagCategory, setNewTagCategory] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const loadTags = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) {
        params.set('category', selectedCategory);
      }
      const res = await fetch(`/api/tags?${params}`);
      const data = await res.json();
      setTags(data.tags || []);
      setCategories(data.categories || []);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load tags' });
    }
    setLoading(false);
  }, [selectedCategory]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  const createTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTagName.trim(),
          color: newTagColor,
          category: newTagCategory || null,
          description: newTagDescription || null
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `Created tag "${newTagName}"` });
        resetForm();
        loadTags();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to create tag' });
    }
  };

  const updateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTag) return;

    try {
      const res = await fetch('/api/tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedTag.id,
          name: newTagName.trim(),
          color: newTagColor,
          category: newTagCategory || null,
          description: newTagDescription || null
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `Updated tag "${newTagName}"` });
        resetForm();
        loadTags();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to update tag' });
    }
  };

  const deleteTag = async (tagId: string, tagName: string) => {
    if (!confirm(`Delete tag "${tagName}"? This will remove it from all entities.`)) return;

    try {
      const res = await fetch(`/api/tags?id=${tagId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `Deleted tag "${tagName}"` });
        if (selectedTag?.id === tagId) {
          resetForm();
        }
        loadTags();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete tag' });
    }
  };

  const editTag = (tag: Tag) => {
    setSelectedTag(tag);
    setNewTagName(tag.name);
    setNewTagColor(tag.color);
    setNewTagCategory(tag.category || '');
    setNewTagDescription(tag.description || '');
    setEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setNewTagName('');
    setNewTagColor('#6B7280');
    setNewTagCategory('');
    setNewTagDescription('');
    setEditing(false);
    setSelectedTag(null);
    setShowForm(false);
  };

  // Group tags by category
  const tagsByCategory: Record<string, Tag[]> = {};
  for (const tag of tags) {
    const cat = tag.category || 'uncategorized';
    if (!tagsByCategory[cat]) tagsByCategory[cat] = [];
    tagsByCategory[cat].push(tag);
  }

  if (loading) return <div className="p-8">Loading tags...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tag Management</h1>
            <p className="text-gray-600">Create and manage tags for cross-referencing content</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowForm(true); setEditing(false); }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New Tag
            </button>
            <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-700">{tags.length}</div>
            <div className="text-sm text-gray-600">Total Tags</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {tags.reduce((sum, t) => sum + t.usageCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Uses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {tags.filter(t => t.usageCount === 0).length}
            </div>
            <div className="text-sm text-gray-600">Unused Tags</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded text-sm ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            All ({tags.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded text-sm capitalize ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Tag List */}
          <div className="col-span-2 space-y-4">
            {Object.entries(tagsByCategory).map(([category, categoryTags]) => (
              <div key={category} className="bg-white rounded-lg shadow">
                <div className="px-4 py-3 bg-gray-50 border-b rounded-t-lg">
                  <h2 className="font-semibold capitalize">{category}</h2>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {categoryTags.map(tag => (
                      <div
                        key={tag.id}
                        className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm cursor-pointer hover:shadow-md transition-shadow"
                        style={{ backgroundColor: tag.color + '20', borderColor: tag.color, borderWidth: 1 }}
                        onClick={() => editTag(tag)}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        />
                        <span style={{ color: tag.color }}>{tag.name}</span>
                        <span className="text-xs text-gray-500">({tag.usageCount})</span>
                        <Link
                          href={`/tags/${tag.id}`}
                          onClick={e => e.stopPropagation()}
                          className="text-gray-400 hover:text-blue-600"
                          title="View entities with this tag"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {tags.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No tags yet. Create your first tag to start organizing content.
              </div>
            )}
          </div>

          {/* Create/Edit Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {editing ? 'Edit Tag' : 'New Tag'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={editing ? updateTag : createTag} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    placeholder="Enter tag name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRESET_COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewTagColor(color)}
                        className={`w-6 h-6 rounded-full border-2 ${newTagColor === color ? 'border-gray-900' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={newTagColor}
                    onChange={e => setNewTagColor(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTagCategory}
                    onChange={e => setNewTagCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    <option value="">Select or enter custom...</option>
                    {PRESET_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newTagCategory}
                    onChange={e => setNewTagCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded mt-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    placeholder="Or type custom category"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTagDescription}
                    onChange={e => setNewTagDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    rows={2}
                    placeholder="Optional description"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editing ? 'Update' : 'Create'}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      onClick={() => deleteTag(selectedTag!.id, selectedTag!.name)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>

              {/* Preview */}
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Preview:</span>
                <div className="mt-2">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                    style={{ backgroundColor: newTagColor + '20', borderColor: newTagColor, borderWidth: 1 }}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: newTagColor }}
                    />
                    <span style={{ color: newTagColor }}>{newTagName || 'Tag Name'}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
