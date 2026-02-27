'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
}

interface Chapter {
  id: string;
  number: number | null;
  title: string | null;
  synopsis: string | null;
  project: Project;
}

interface PlotThread {
  id: string;
  name: string;
  premise: string | null;
  project: Project;
}

interface Props {
  projects: Project[];
  unassignedChapters: Chapter[];
  plotThreads: PlotThread[];
}

export function BookBuilderClient({ projects, unassignedChapters, plotThreads }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter chapters by selected project
  const projectChapters = unassignedChapters.filter(
    (ch) => ch.project.id === selectedProject
  );

  const toggleChapter = (chapterId: string) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setError('Book title is required');
      return;
    }

    if (!selectedProject) {
      setError('Please select a project');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim() || null,
          projectId: selectedProject,
          chapterIds: selectedChapters,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/builder/${data.data.id}`);
        router.refresh();
      } else {
        setError(data.error || 'Failed to create book');
      }
    } catch (err) {
      setError('Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Book Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Novel"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle (optional)
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="A Story of Adventure"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
          />
        </div>
      </div>

      {/* Project Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project *
        </label>
        <select
          value={selectedProject}
          onChange={(e) => {
            setSelectedProject(e.target.value);
            setSelectedChapters([]);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chapter Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Include Chapters ({selectedChapters.length} selected)
        </label>
        {projectChapters.length === 0 ? (
          <p className="text-sm text-gray-500">
            No unassigned chapters available for this project.
          </p>
        ) : (
          <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
            {projectChapters.map((chapter) => (
              <label
                key={chapter.id}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedChapters.includes(chapter.id)}
                  onChange={() => toggleChapter(chapter.id)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="ml-3 flex-1">
                  <span className="font-medium text-gray-900">
                    {chapter.title || `Chapter ${chapter.number}`}
                  </span>
                  {chapter.synopsis && (
                    <span className="block text-sm text-gray-500 line-clamp-1">
                      {chapter.synopsis}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Structure Template */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Story Structure (Reference)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-medium text-gray-700">Hook</div>
            <div className="text-gray-500 text-xs mt-1">Opening that grabs attention</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-medium text-gray-700">Inciting Incident</div>
            <div className="text-gray-500 text-xs mt-1">Event that starts the story</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-medium text-gray-700">Midpoint</div>
            <div className="text-gray-500 text-xs mt-1">Major turning point</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-medium text-gray-700">Climax</div>
            <div className="text-gray-500 text-xs mt-1">Peak of tension</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setTitle('');
            setSubtitle('');
            setSelectedChapters([]);
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
        <button
          onClick={handleCreate}
          disabled={loading || !title.trim()}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating...' : 'Create Book'}
        </button>
      </div>
    </div>
  );
}
