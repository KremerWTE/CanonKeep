'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  BookOpen,
  Users,
  TrendingUp,
  Layers,
  Globe,
  MessageSquare,
  Target,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Loader2,
  Award,
} from 'lucide-react';

type FeedbackMode = 'gentle' | 'professional' | 'brutal';

interface BookFeedbackData {
  id: string;
  mode: string;
  createdAt: string;
  feedback: {
    summary: string;
    overallScore: number;
    structure: {
      score: number;
      analysis: string;
      arcStrength: string;
      suggestions: string[];
    };
    characterDevelopment: {
      score: number;
      analysis: string;
      characterArcs: { character: string; arcDescription: string; strength: string }[];
      suggestions: string[];
    };
    plotAndPacing: {
      score: number;
      analysis: string;
      plotHoles: string[];
      pacingIssues: string[];
      suggestions: string[];
    };
    thematicDepth: {
      score: number;
      themes: string[];
      analysis: string;
      suggestions: string[];
    };
    worldBuilding: {
      score: number;
      analysis: string;
      strengths: string[];
      gaps: string[];
      suggestions: string[];
    };
    dialogueAndVoice: {
      score: number;
      analysis: string;
      distinctVoices: boolean;
      suggestions: string[];
    };
    marketReadiness: {
      score: number;
      genre: string;
      targetAudience: string;
      comparableTitles: string[];
      publishingReadiness: string;
      analysis: string;
    };
    strengths: string[];
    weaknesses: string[];
    prioritizedImprovements: {
      priority: number;
      area: string;
      description: string;
      impact: string;
    }[];
  };
}

const MODE_CONFIG: Record<FeedbackMode, { label: string; description: string; color: string }> = {
  gentle: {
    label: 'Gentle',
    description: 'Encouraging and supportive',
    color: 'bg-green-500',
  },
  professional: {
    label: 'Professional',
    description: 'Balanced developmental edit',
    color: 'bg-blue-500',
  },
  brutal: {
    label: 'Brutal',
    description: 'Unfiltered harsh critique',
    color: 'bg-red-500',
  },
};

const READINESS_COLORS: Record<string, string> = {
  needs_major_revision: 'bg-red-100 text-red-800',
  needs_polish: 'bg-yellow-100 text-yellow-800',
  ready_for_beta: 'bg-blue-100 text-blue-800',
  ready_for_submission: 'bg-green-100 text-green-800',
};

const READINESS_LABELS: Record<string, string> = {
  needs_major_revision: 'Needs Major Revision',
  needs_polish: 'Needs Polish',
  ready_for_beta: 'Ready for Beta Readers',
  ready_for_submission: 'Ready for Submission',
};

export default function BookFeedbackPage({
  params,
}: {
  params: Promise<{ projectId: string; bookId: string }>;
}) {
  const resolvedParams = use(params);
  const [feedbacks, setFeedbacks] = useState<BookFeedbackData[]>([]);
  const [selectedMode, setSelectedMode] = useState<FeedbackMode>('professional');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<BookFeedbackData | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, [resolvedParams.bookId]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/books/${resolvedParams.bookId}/feedback`
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
        `/api/projects/${resolvedParams.projectId}/books/${resolvedParams.bookId}/feedback`,
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

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 6) return 'bg-yellow-100 dark:bg-yellow-900/20';
    if (score >= 4) return 'bg-orange-100 dark:bg-orange-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const fb = currentFeedback?.feedback;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/projects/${resolvedParams.projectId}/books`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Book-Level Feedback
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Comprehensive manuscript analysis
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Full Manuscript Review
          </CardTitle>
        </CardHeader>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Get a comprehensive developmental edit of your entire book. This analyzes structure,
          character arcs, pacing, themes, and market positioning.
        </p>
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
        <Button onClick={generateFeedback} disabled={generating} className="w-full">
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Manuscript...
            </>
          ) : (
            'Generate Book Feedback'
          )}
        </Button>
        {generating && (
          <p className="text-sm text-slate-500 mt-2 text-center">
            This may take a minute as we analyze your entire manuscript...
          </p>
        )}
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
        </div>
      ) : !fb ? (
        <Card className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No feedback yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Generate a full manuscript review to get started
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Overall Score & Summary */}
          <Card>
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={MODE_CONFIG[currentFeedback?.mode as FeedbackMode]?.color}>
                    {currentFeedback?.mode} review
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {new Date(currentFeedback?.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Executive Summary
                </h2>
                <p className="text-slate-700 dark:text-slate-300">{fb.summary}</p>
              </div>
              <div className={`text-center p-6 rounded-xl ${getScoreBg(fb.overallScore)}`}>
                <div className={`text-5xl font-bold ${getScoreColor(fb.overallScore)}`}>
                  {fb.overallScore}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">out of 10</div>
              </div>
            </div>
          </Card>

          {/* Market Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Market Readiness
              </CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-slate-500">Genre</p>
                <p className="font-medium text-slate-900 dark:text-white">{fb.marketReadiness.genre}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Target Audience</p>
                <p className="font-medium text-slate-900 dark:text-white">{fb.marketReadiness.targetAudience}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <Badge className={READINESS_COLORS[fb.marketReadiness.publishingReadiness]}>
                  {READINESS_LABELS[fb.marketReadiness.publishingReadiness]}
                </Badge>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-3">{fb.marketReadiness.analysis}</p>
            {fb.marketReadiness.comparableTitles.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Comparable Titles</p>
                <div className="flex flex-wrap gap-2">
                  {fb.marketReadiness.comparableTitles.map((title, i) => (
                    <Badge key={i} variant="secondary">{title}</Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Score Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Structure */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Structure</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(fb.structure.score)}`}>
                  {fb.structure.score}/10
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{fb.structure.analysis}</p>
              <p className="text-xs text-slate-500">Arc: {fb.structure.arcStrength}</p>
            </Card>

            {/* Characters */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Characters</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(fb.characterDevelopment.score)}`}>
                  {fb.characterDevelopment.score}/10
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{fb.characterDevelopment.analysis}</p>
            </Card>

            {/* Plot & Pacing */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Plot & Pacing</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(fb.plotAndPacing.score)}`}>
                  {fb.plotAndPacing.score}/10
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{fb.plotAndPacing.analysis}</p>
            </Card>

            {/* Themes */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Themes</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(fb.thematicDepth.score)}`}>
                  {fb.thematicDepth.score}/10
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {fb.thematicDepth.themes.map((theme, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{theme}</Badge>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{fb.thematicDepth.analysis}</p>
            </Card>

            {/* World Building */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">World Building</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(fb.worldBuilding.score)}`}>
                  {fb.worldBuilding.score}/10
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{fb.worldBuilding.analysis}</p>
            </Card>

            {/* Dialogue & Voice */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Dialogue & Voice</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(fb.dialogueAndVoice.score)}`}>
                  {fb.dialogueAndVoice.score}/10
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{fb.dialogueAndVoice.analysis}</p>
              <p className="text-xs text-slate-500 mt-1">
                Distinct voices: {fb.dialogueAndVoice.distinctVoices ? 'Yes' : 'Needs work'}
              </p>
            </Card>
          </div>

          {/* Character Arcs */}
          {fb.characterDevelopment.characterArcs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Character Arcs
                </CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {fb.characterDevelopment.characterArcs.map((arc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-white">{arc.character}</span>
                        <Badge variant={arc.strength === 'strong' ? 'default' : arc.strength === 'moderate' ? 'secondary' : 'outline'}>
                          {arc.strength}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{arc.arcDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Plot Holes & Pacing Issues */}
          {(fb.plotAndPacing.plotHoles.length > 0 || fb.plotAndPacing.pacingIssues.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  Issues to Address
                </CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fb.plotAndPacing.plotHoles.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">Plot Holes</h4>
                    <ul className="space-y-1">
                      {fb.plotAndPacing.plotHoles.map((hole, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400">• {hole}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {fb.plotAndPacing.pacingIssues.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">Pacing Issues</h4>
                    <ul className="space-y-1">
                      {fb.plotAndPacing.pacingIssues.map((issue, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}

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
                {fb.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 dark:text-slate-300">• {s}</li>
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
                {fb.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-slate-700 dark:text-slate-300">• {w}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Prioritized Improvements */}
          {fb.prioritizedImprovements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Prioritized Improvements</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {fb.prioritizedImprovements
                  .sort((a, b) => a.priority - b.priority)
                  .map((imp, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-600">{imp.priority}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-white">{imp.area}</span>
                          <Badge variant={imp.impact === 'high' ? 'default' : imp.impact === 'medium' ? 'secondary' : 'outline'}>
                            {imp.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{imp.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {/* Previous Feedbacks */}
          {feedbacks.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Previous Reviews</CardTitle>
              </CardHeader>
              <div className="space-y-2">
                {feedbacks.slice(1).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCurrentFeedback(f)}
                    className="w-full p-3 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${MODE_CONFIG[f.mode as FeedbackMode]?.color}`} />
                        <span className="font-medium text-slate-900 dark:text-white capitalize">
                          {f.mode} Review
                        </span>
                        <span className={`text-lg font-bold ${getScoreColor(f.feedback.overallScore)}`}>
                          {f.feedback.overallScore}/10
                        </span>
                      </div>
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
