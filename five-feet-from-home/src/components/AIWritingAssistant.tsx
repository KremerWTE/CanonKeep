'use client';

import { useState } from 'react';

type SuggestionType = 'continue' | 'improve' | 'alternatives' | 'dialogue' | 'description' | 'outline';

interface AIWritingAssistantProps {
  initialText?: string;
  chapterId?: string;
  characterIds?: string[];
  onInsert?: (text: string) => void;
  className?: string;
}

const SUGGESTION_TYPES: { type: SuggestionType; label: string; icon: string; description: string }[] = [
  { type: 'continue', label: 'Continue', icon: '➡️', description: 'Continue the story from this point' },
  { type: 'improve', label: 'Improve', icon: '✨', description: 'Enhance the writing quality' },
  { type: 'alternatives', label: 'Alternatives', icon: '🔄', description: 'Get different versions' },
  { type: 'dialogue', label: 'Dialogue', icon: '💬', description: 'Generate character dialogue' },
  { type: 'description', label: 'Description', icon: '🎨', description: 'Enhance descriptions' },
  { type: 'outline', label: 'Outline', icon: '📝', description: 'Create scene structure' },
];

export default function AIWritingAssistant({
  initialText = '',
  chapterId,
  characterIds,
  onInsert,
  className = '',
}: AIWritingAssistantProps) {
  const [text, setText] = useState(initialText);
  const [selectedType, setSelectedType] = useState<SuggestionType>('improve');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGetSuggestion = async () => {
    if (!text.trim()) {
      setError('Please enter some text first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          text,
          context: {
            chapterId,
            characterIds,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuggestion(data.suggestion);
      } else {
        setError(data.error || 'Failed to get suggestion');
      }
    } catch {
      setError('Failed to connect to AI service');
    }

    setLoading(false);
  };

  const handleInsert = () => {
    if (suggestion && onInsert) {
      // Remove the demo mode prefix if present
      const cleanSuggestion = suggestion.replace(/^\[Demo Mode[^\]]*\]\n\n/, '');
      onInsert(cleanSuggestion);
      setSuggestion(null);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-t-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="font-medium text-gray-900">AI Writing Assistant</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t">
          {/* Text Input */}
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text to work with
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type text you want AI assistance with..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 resize-none"
              rows={4}
            />
          </div>

          {/* Suggestion Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SUGGESTION_TYPES.map(({ type, label, icon, description }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  title={description}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    selectedType === type
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg block">{icon}</span>
                  <span className="text-xs block mt-1">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGetSuggestion}
            disabled={loading || !text.trim()}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              `Get ${SUGGESTION_TYPES.find(t => t.type === selectedType)?.label} Suggestion`
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Suggestion Result */}
          {suggestion && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">AI Suggestion</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(suggestion)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Copy
                  </button>
                  {onInsert && (
                    <button
                      onClick={handleInsert}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Insert
                    </button>
                  )}
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {suggestion}
                </pre>
              </div>
            </div>
          )}

          {/* Configuration Notice */}
          <div className="text-xs text-gray-500 text-center">
            {process.env.NEXT_PUBLIC_AI_CONFIGURED === 'true' ? (
              <span>Powered by AI</span>
            ) : (
              <span>
                Running in demo mode. Set <code className="bg-gray-100 px-1 rounded">AI_API_KEY</code> and{' '}
                <code className="bg-gray-100 px-1 rounded">AI_PROVIDER</code> environment variables for full functionality.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
