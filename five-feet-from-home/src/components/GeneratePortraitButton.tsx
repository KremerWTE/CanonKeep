'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GeneratePortraitButtonProps {
  characterId: string;
  hasExistingPortrait: boolean;
}

export default function GeneratePortraitButton({ characterId, hasExistingPortrait }: GeneratePortraitButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/characters/${characterId}/generate-portrait`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message || 'Portrait generated successfully!');
        // Refresh the page to show the new image
        router.refresh();
      } else {
        setError(data.error || 'Failed to generate portrait');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
          loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </span>
        ) : hasExistingPortrait ? (
          'Regenerate Portrait'
        ) : (
          'Generate AI Portrait'
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}

      {message && (
        <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{message}</p>
      )}
    </div>
  );
}
