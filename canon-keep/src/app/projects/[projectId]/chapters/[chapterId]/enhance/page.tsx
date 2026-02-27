'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Repeat,
  MessageCircle,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Shield,
} from 'lucide-react';

interface Suggestion {
  id: string;
  suggestionType: string;
  title: string;
  description: string;
  canonConstraints: string[];
  evidence?: string;
  priority: string;
  status: string;
  createdAt: string;
}

const TYPE_CONFIG: Record<string, { icon: typeof Lightbulb; color: string; label: string }> = {
  weak_subplot: { icon: TrendingUp, color: 'bg-orange-500', label: 'Weak Subplot' },
  dropped_thread: { icon: Repeat, color: 'bg-red-500', label: 'Dropped Thread' },
  escalation: { icon: TrendingUp, color: 'bg-purple-500', label: 'Escalation Opportunity' },
  thematic: { icon: MessageCircle, color: 'bg-blue-500', label: 'Thematic Reinforcement' },
  character_arc: { icon: BookOpen, color: 'bg-green-500', label: 'Character Arc' },
  world_building: { icon: Lightbulb, color: 'bg-teal-500', label: 'World Building' },
  tension: { icon: TrendingUp, color: 'bg-yellow-500', label: 'Tension' },
  pacing: { icon: Clock, color: 'bg-slate-500', label: 'Pacing' },
};

const PRIORITY_COLORS: Record<string, 'error' | 'warning' | 'info'> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

export default function EnhancePage({
  params,
}: {
  params: Promise<{ projectId: string; chapterId: string }>;
}) {
  const resolvedParams = use(params);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchSuggestions();
  }, [resolvedParams.projectId, resolvedParams.chapterId]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/chapters/${resolvedParams.chapterId}/enhance`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSuggestions = async () => {
    setGenerating(true);
    try {
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/chapters/${resolvedParams.chapterId}/enhance`,
        { method: 'POST' }
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setGenerating(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    // This would need a PATCH endpoint - for now just update locally
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const groupedSuggestions = suggestions.reduce((acc, s) => {
    if (!acc[s.suggestionType]) {
      acc[s.suggestionType] = [];
    }
    acc[s.suggestionType].push(s);
    return acc;
  }, {} as Record<string, Suggestion[]>);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/projects/${resolvedParams.projectId}/chapters`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapters
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Enhancement Suggestions
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              AI-powered suggestions to strengthen your story
            </p>
          </div>
          <Button onClick={generateSuggestions} loading={generating}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Suggestions
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
        </div>
      ) : suggestions.length === 0 ? (
        <Card className="text-center py-12">
          <Sparkles className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No suggestions yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Generate suggestions to find enhancement opportunities
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSuggestions).map(([type, typeSuggestions]) => {
            const config = TYPE_CONFIG[type] || {
              icon: Lightbulb,
              color: 'bg-slate-500',
              label: type,
            };
            const Icon = config.icon;

            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {config.label} ({typeSuggestions.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {typeSuggestions.map((suggestion) => (
                    <Card key={suggestion.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {suggestion.title}
                            </h3>
                            <Badge variant={PRIORITY_COLORS[suggestion.priority]}>
                              {suggestion.priority}
                            </Badge>
                            {suggestion.status !== 'pending' && (
                              <Badge
                                variant={
                                  suggestion.status === 'accepted' ? 'success' : 'default'
                                }
                              >
                                {suggestion.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {suggestion.description}
                          </p>

                          {suggestion.evidence && (
                            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                              <p className="text-xs font-medium text-slate-500 uppercase mb-1">
                                Based on:
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                "{suggestion.evidence}"
                              </p>
                            </div>
                          )}

                          {suggestion.canonConstraints?.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center gap-1 mb-2">
                                <Shield className="w-4 h-4 text-indigo-500" />
                                <p className="text-xs font-medium text-slate-500 uppercase">
                                  Canon Constraints
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {suggestion.canonConstraints.map((c, i) => (
                                  <Badge key={i} variant="default" size="sm">
                                    {c}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {suggestion.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateStatus(suggestion.id, 'accepted')}
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateStatus(suggestion.id, 'rejected')}
                            >
                              <XCircle className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
