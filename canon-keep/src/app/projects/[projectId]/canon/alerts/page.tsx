'use client';

import { useEffect, useState, use } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AlertEvidence {
  facts: Array<{
    id: string;
    factType: string;
    factValue: string;
    chapterId?: string;
    evidence?: string;
  }>;
  mentions: Array<{
    id: string;
    chapterId: string;
    snippet: string;
  }>;
}

interface CanonAlert {
  id: string;
  alertType: string;
  severity: string;
  confidence: number;
  title: string;
  description: string;
  evidence: AlertEvidence;
  suggestedFix?: string;
  status: string;
  createdAt: string;
}

const SEVERITY_CONFIG: Record<string, { color: string; badge: 'error' | 'warning' | 'info' }> = {
  high: { color: 'border-l-red-500', badge: 'error' },
  medium: { color: 'border-l-yellow-500', badge: 'warning' },
  low: { color: 'border-l-blue-500', badge: 'info' },
};

const ALERT_TYPE_LABELS: Record<string, string> = {
  trait_conflict: 'Trait Conflict',
  alive_dead: 'Alive/Dead Conflict',
  knowledge_state: 'Knowledge Inconsistency',
  event_order: 'Event Order Conflict',
  location_description: 'Location Description',
  age_inconsistency: 'Age Inconsistency',
  timeline_conflict: 'Timeline Conflict',
  relationship_conflict: 'Relationship Conflict',
};

export default function AlertsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [alerts, setAlerts] = useState<CanonAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedAlerts, setExpandedAlerts] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('open');

  const fetchAlerts = async () => {
    try {
      const status = filter === 'all' ? 'all' : filter;
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/alerts?status=${status}`
      );
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [resolvedParams.projectId, filter]);

  const recheckConsistency = async () => {
    setRefreshing(true);
    try {
      await fetch(`/api/projects/${resolvedParams.projectId}/alerts`, {
        method: 'POST',
      });
      await fetchAlerts();
    } catch (error) {
      console.error('Failed to recheck consistency:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const updateAlertStatus = async (alertId: string, status: string) => {
    try {
      await fetch(`/api/projects/${resolvedParams.projectId}/alerts/${alertId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await fetchAlerts();
    } catch (error) {
      console.error('Failed to update alert:', error);
    }
  };

  const toggleExpanded = (alertId: string) => {
    setExpandedAlerts((prev) => {
      const next = new Set(prev);
      if (next.has(alertId)) {
        next.delete(alertId);
      } else {
        next.add(alertId);
      }
      return next;
    });
  };

  const openAlerts = alerts.filter((a) => a.status === 'open');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Consistency Alerts
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Possible inconsistencies detected in your story canon
          </p>
        </div>
        <Button onClick={recheckConsistency} loading={refreshing}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Recheck Consistency
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'open' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('open')}
        >
          Open ({openAlerts.length})
        </Button>
        <Button
          variant={filter === 'resolved' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('resolved')}
        >
          Resolved
        </Button>
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : alerts.length === 0 ? (
        <Card className="text-center py-12">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Inconsistencies Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Your story canon looks consistent! Great work.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const config = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.low;
            const isExpanded = expandedAlerts.has(alert.id);

            return (
              <Card
                key={alert.id}
                padding="none"
                className={`border-l-4 ${config.color} overflow-hidden`}
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleExpanded(alert.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`w-5 h-5 mt-0.5 ${
                          alert.severity === 'high'
                            ? 'text-red-500'
                            : alert.severity === 'medium'
                            ? 'text-yellow-500'
                            : 'text-blue-500'
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {alert.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {alert.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant={config.badge}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </Badge>
                          <Badge variant="default">
                            {ALERT_TYPE_LABELS[alert.alertType] || alert.alertType}
                          </Badge>
                          <Badge variant="default">
                            {Math.round(alert.confidence * 100)}% confidence
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.status === 'open' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateAlertStatus(alert.id, 'resolved');
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateAlertStatus(alert.id, 'dismissed');
                            }}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                    {/* Evidence */}
                    {alert.evidence?.facts?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Conflicting Facts:
                        </h4>
                        <div className="space-y-2">
                          {alert.evidence.facts.map((fact, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded text-sm"
                            >
                              <span className="font-medium">
                                {fact.factType.replace('_', ' ')}:
                              </span>{' '}
                              {fact.factValue}
                              {fact.evidence && (
                                <p className="text-slate-500 italic mt-1">"{fact.evidence}"</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Fix */}
                    {alert.suggestedFix && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                          Suggested Resolution:
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          {alert.suggestedFix}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
