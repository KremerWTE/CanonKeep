'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import {
  Upload,
  Users,
  MapPin,
  Calendar,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectStats {
  uploads: number;
  entities: number;
  characters: number;
  locations: number;
  events: number;
  alerts: number;
  chapters: number;
}

interface RecentAlert {
  id: string;
  title: string;
  alertType: string;
  severity: string;
  createdAt: string;
}

export default function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entitiesRes, alertsRes, eventsRes] = await Promise.all([
          fetch(`/api/projects/${resolvedParams.projectId}/entities`),
          fetch(`/api/projects/${resolvedParams.projectId}/alerts`),
          fetch(`/api/projects/${resolvedParams.projectId}/events`),
        ]);

        const entities = await entitiesRes.json();
        const alerts = await alertsRes.json();
        const events = await eventsRes.json();

        setStats({
          uploads: 0, // Would need separate API
          entities: entities.length,
          characters: entities.filter((e: { type: string }) => e.type === 'character').length,
          locations: entities.filter((e: { type: string }) => e.type === 'location').length,
          events: events.length,
          alerts: alerts.length,
          chapters: 0, // Would need separate API
        });

        setRecentAlerts(alerts.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.projectId]);

  const statCards = [
    { name: 'Characters', value: stats?.characters || 0, icon: Users, href: `/projects/${resolvedParams.projectId}/canon/entities?type=character`, color: 'bg-blue-500' },
    { name: 'Locations', value: stats?.locations || 0, icon: MapPin, href: `/projects/${resolvedParams.projectId}/canon/entities?type=location`, color: 'bg-green-500' },
    { name: 'Events', value: stats?.events || 0, icon: Calendar, href: `/projects/${resolvedParams.projectId}/canon/timeline`, color: 'bg-purple-500' },
    { name: 'Alerts', value: stats?.alerts || 0, icon: AlertTriangle, href: `/projects/${resolvedParams.projectId}/canon/alerts`, color: 'bg-yellow-500' },
  ];

  const severityColors: Record<string, string> = {
    high: 'error',
    medium: 'warning',
    low: 'info',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Project Overview</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Your story canon at a glance
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.name}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <Link href={`/projects/${resolvedParams.projectId}/uploads`}>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Manuscript
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/projects/${resolvedParams.projectId}/canon/entities`}>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  View Canon Dashboard
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/projects/${resolvedParams.projectId}/chapters`}>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Browse Chapters
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/projects/${resolvedParams.projectId}/coach`}>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Writing Coach
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            {recentAlerts.length > 0 && (
              <Link
                href={`/projects/${resolvedParams.projectId}/canon/alerts`}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                View all
              </Link>
            )}
          </CardHeader>
          {recentAlerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-slate-600 dark:text-slate-400">No consistency alerts</p>
              <p className="text-sm text-slate-500">Your canon is looking good!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={`/projects/${resolvedParams.projectId}/canon/alerts`}
                  className="block p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {alert.title}
                    </p>
                    <Badge variant={severityColors[alert.severity] as 'warning' | 'error' | 'info'}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
