'use client';

import { useState, useEffect, useCallback } from 'react';

interface Tag {
  id: string;
  name: string;
  color: string;
  category: string | null;
  isApplied?: boolean;
}

interface TagSelectorProps {
  entityType: string;
  entityId: string;
  entityName: string;
  compact?: boolean;
}

export default function TagSelector({ entityType, entityId, entityName, compact = false }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [appliedTags, setAppliedTags] = useState<Tag[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTags = useCallback(async () => {
    try {
      // Get all tags and entity's tags
      const res = await fetch(`/api/tags?entityType=${entityType}&entityId=${entityId}`);
      const data = await res.json();

      setTags(data.tags || []);
      setAppliedTags((data.tags || []).filter((t: Tag) => t.isApplied));
    } catch {
      console.error('Failed to load tags');
    }
  }, [entityType, entityId]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  const toggleTag = async (tag: Tag) => {
    setLoading(true);

    try {
      if (tag.isApplied) {
        // Remove tag
        await fetch(`/api/tags/entity?tagId=${tag.id}&entityType=${entityType}&entityId=${entityId}`, {
          method: 'DELETE'
        });
      } else {
        // Add tag
        await fetch('/api/tags/entity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tagId: tag.id,
            entityType,
            entityId,
            entityName
          })
        });
      }

      loadTags();
    } catch {
      console.error('Failed to toggle tag');
    }

    setLoading(false);
  };

  const createAndApplyTag = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      // Create new tag
      const createRes = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchQuery.trim() })
      });

      const createData = await createRes.json();

      if (createData.success || createData.tag) {
        const tagId = createData.tag?.id || createData.tag?.id;

        // Apply to entity
        await fetch('/api/tags/entity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tagId,
            entityType,
            entityId,
            entityName
          })
        });

        setSearchQuery('');
        loadTags();
      }
    } catch {
      console.error('Failed to create tag');
    }

    setLoading(false);
  };

  // Filter tags by search
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const noMatchingTag = searchQuery && !filteredTags.some(t => t.name.toLowerCase() === searchQuery.toLowerCase());

  if (compact) {
    return (
      <div className="relative">
        {/* Applied Tags */}
        <div className="flex flex-wrap gap-1 items-center">
          {appliedTags.map(tag => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs cursor-pointer hover:opacity-80"
              style={{ backgroundColor: tag.color + '20', color: tag.color }}
              onClick={() => toggleTag(tag)}
              title="Click to remove"
            >
              {tag.name}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          ))}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-2 py-0.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            + Add Tag
          </button>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-64 bg-white rounded-lg shadow-lg border p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search or create tag..."
              className="w-full px-2 py-1 text-sm border rounded mb-2 focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
              autoFocus
            />

            <div className="max-h-40 overflow-y-auto">
              {filteredTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag)}
                  disabled={loading}
                  className="w-full flex items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded text-left"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="flex-1">{tag.name}</span>
                  {tag.isApplied && (
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}

              {noMatchingTag && (
                <button
                  onClick={createAndApplyTag}
                  disabled={loading}
                  className="w-full flex items-center gap-2 px-2 py-1 text-sm hover:bg-blue-50 rounded text-left text-blue-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create &quot;{searchQuery}&quot;
                </button>
              )}
            </div>

            <button
              onClick={() => setShowDropdown(false)}
              className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span>🏷️</span> Tags
      </h3>

      {/* Applied Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {appliedTags.length === 0 ? (
          <span className="text-sm text-gray-500 italic">No tags applied</span>
        ) : (
          appliedTags.map(tag => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm cursor-pointer hover:opacity-80"
              style={{ backgroundColor: tag.color + '20', color: tag.color }}
              onClick={() => toggleTag(tag)}
              title="Click to remove"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
              {tag.name}
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          ))
        )}
      </div>

      {/* Add Tags */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Add tags..."
          className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        />

        {showDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto">
            {filteredTags.filter(t => !t.isApplied).map(tag => (
              <button
                key={tag.id}
                onClick={() => {
                  toggleTag(tag);
                  setSearchQuery('');
                }}
                disabled={loading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 text-left border-b last:border-0"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span>{tag.name}</span>
                {tag.category && (
                  <span className="text-xs text-gray-400 capitalize">({tag.category})</span>
                )}
              </button>
            ))}

            {noMatchingTag && (
              <button
                onClick={createAndApplyTag}
                disabled={loading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-blue-50 text-left text-blue-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create new tag &quot;{searchQuery}&quot;
              </button>
            )}

            {filteredTags.filter(t => !t.isApplied).length === 0 && !noMatchingTag && (
              <div className="px-3 py-2 text-sm text-gray-500">
                {searchQuery ? 'No matching tags' : 'All tags applied'}
              </div>
            )}
          </div>
        )}
      </div>

      {showDropdown && (
        <button
          onClick={() => setShowDropdown(false)}
          className="mt-2 text-xs text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      )}
    </div>
  );
}
