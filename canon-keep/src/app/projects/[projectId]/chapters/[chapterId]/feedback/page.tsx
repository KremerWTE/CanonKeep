'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Eye,
  Zap,
  Heart,
  Users,
  Target,
  Loader2,
} from 'lucide-react';

type FeedbackMode = 'gentle' | 'professional' | 'brutal';

interface FeedbackDimension {
  score: number;
  analysis: string;
  suggestions: string[];
}

interface Feedback {
  id: string;
  mode: string;
  createdAt: string;
  feedback: {
    summary: string;
    pacing: FeedbackDimension;
    clarity: FeedbackDimension;
    stakes: FeedbackDimension;
    characterAgency: FeedbackDimension;
    scenePurpose: FeedbackDimension;
    emotionalImpact: FeedbackDimension;
    strengths: string[];
    weaknesses: string[];
    overallScore: number;
  };
}

const MODE_CONFIG: Record<FeedbackMode, { label: string; description: string; color: string }> = {
  gentle: {
    label: 'Gentle',
    description: 'Encouraging and supportive feedback',
    color: 'bg-green-500',
  },
  professional: {
    label: 'Professional',
    description: 'Balanced, constructive critique',
    color: 'bg-blue-500',
  },
  brutal: {
    label: 'Brutal',
    description: 'Unfiltered, harsh honesty',
    color: 'bg-red-500',
  },
};

const DIMENSION_ICONS: Record<string, typeof TrendingUp> = {
  pacing: TrendingUp,
  clarity: Eye,
  stakes: Zap,
  characterAgency: Users,
  scenePurpose: Target,
  emotionalImpact: Heart,
};

export default function FeedbackPage({
  params,
}: {
  params: Promise<{ projectId: string; chapterId: string }>;
}) {
  const resolvedParams = use(params);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedMode, setSelectedMode] = useState<FeedbackMode>('professional');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, [resolvedParams.projectId, resolvedParams.chapterId]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/chapters/${resolvedParams.chapterId}/feedback`
      );
      const data = await response.json();
      setFeedbacks(data);
      if (data.length > 0) {
        setCurrentFeedback(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateFeedback = async () => {
    setGenerating(true);
    try {
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/chapters/${resolvedParams.chapterId}/feedback`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: selectedMode }),
        }
      );
      const data = await response.json();
      setCurrentFeedback(data);
      await fetchFeedbacks();
    } catch (error) {
      console.error('Failed to generate feedback:', error);
    } finally {
      setGenerating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const fb = currentFeedback?.feedback;

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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Chapter Feedback
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Get AI-powered feedback on your chapter
        </p>
      </div>

      {/* Mode Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Choose Feedback Mode
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {(Object.keys(MODE_CONFIG) as FeedbackMode[]).map((mode) => {
            const config = MODE_CONFIG[mode];
            return (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedMode === mode
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {config.description}
                </p>
              </button>
            );
          })}
        </div>
        <Button onClick={generateFeedback} loading={generating} className="w-full">
          {generating ? 'Generating Feedback...' : 'Generate Feedback'}
        </Button>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
        </div>
      ) : !fb ? (
        <Card className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No feedback yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Generate feedback to get started
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Overall Score
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {currentFeedback?.mode} feedback •{' '}
                  {new Date(currentFeedback?.createdAt || '').toLocaleDateString()}
                </p>
              </div>
              <div
                className={`text-5xl font-bold ${getScoreColor(fb.overallScore)}`}
              >
                {fb.overallScore}/10
              </div>
            </div>
            <p className="mt-4 text-slate-700 dark:text-slate-300">{fb.summary}</p>
          </Card>

          {/* Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(DIMENSION_ICONS).map(([key, Icon]) => {
              const dimension = fb[key as keyof typeof fb] as FeedbackDimension;
              if (!dimension) return null;

              return (
                <Card key={key}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-slate-500" />
                      <h3 className="font-semibold text-slate-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                    </div>
                    <span className={`text-2xl font-bold ${getScoreColor(dimension.score)}`}>
                      {dimension.score}/10
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {dimension.analysis}
                  </p>
                  {dimension.suggestions?.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 uppercase">
                        Suggestions
                      </p>
                      <ul className="space-y-1">
                        {dimension.suggestions.map((s, i) => (
                          <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                            • {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ThumbsUp className="w-5 h-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <ul className="space-y-2">
                {fb.strengths?.map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                    • {s}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <ThumbsDown className="w-5 h-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <ul className="space-y-2">
                {fb.weaknesses?.map((w, i) => (
                  <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                    • {w}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Previous Feedbacks */}
          {feedbacks.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Previous Feedbacks</CardTitle>
              </CardHeader>
              <div className="space-y-2">
                {feedbacks.slice(1).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCurrentFeedback(f)}
                    className="w-full p-3 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900 dark:text-white capitalize">
                        {f.mode} Mode
                      </span>
                      <span className="text-sm text-slate-500">
                        {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
