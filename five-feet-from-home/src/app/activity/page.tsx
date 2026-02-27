'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Activity {
  type: 'edit' | 'comment';
  action: string;
  entityType: string;
  entityId: string;
  entityName?: string;
  fieldName?: string;
  content?: string;
  user: string;
  userId?: string;
  userName?: string;
  timestamp: string;
}

interface ActiveUser {
  userId: string;
  email: string;
  name: string | null;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string | null;
  lastSeen: string;
}

const ACTION_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  create: { color: 'bg-green-100 text-green-700', icon: '+', label: 'Created' },
  update: { color: 'bg-blue-100 text-blue-700', icon: '✏️', label: 'Updated' },
  delete: { color: 'bg-red-100 text-red-700', icon: '🗑️', label: 'Deleted' },
  comment: { color: 'bg-purple-100 text-purple-700', icon: '💬', label: 'Commented' }
};

const ENTITY_LINKS: Record<string, string> = {
  character: '/characters',
  chapter: '/chapters',
  crisis: '/crises',
  gala: '/galas',
  location: '/locations',
  book: '/books'
};

export default function ActivityPage() {
  const { data: session } = useSession();
  const [activity, setActivity] = useState<Activity[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActivity = useCallback(async () => {
    try {
      const res = await fetch('/api/collaboration/activity?limit=50');
      const data = await res.json();
      setActivity(data.activity || []);
      setActiveUsers(data.activeUsers || []);
    } catch {
      // Silently fail
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadActivity();
    const interval = setInterval(loadActivity, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadActivity]);

  const getEntityLink = (entityType: string, entityId: string) => {
    const base = ENTITY_LINKS[entityType];
    return base ? `${base}/${entityId}` : null;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (!session) {
    return <div className="p-8">Please sign in to view activity.</div>;
  }

  if (loading) {
    return <div className="p-8">Loading activity...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Activity Feed</h1>
            <p className="text-gray-600">Recent changes and collaboration</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-3 order-2 lg:order-1">
            {activity.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No recent activity
              </div>
            ) : (
              activity.map((item, idx) => {
                const config = ACTION_CONFIG[item.action] || ACTION_CONFIG.update;
                const link = getEntityLink(item.entityType, item.entityId);

                return (
                  <div
                    key={`${item.entityId}-${idx}`}
                    className="bg-white rounded-lg shadow p-4 flex items-start gap-3"
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${config.color}`}
                    >
                      {config.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-700">
                          {item.userName || item.user}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${config.color}`}>
                          {config.label}
                        </span>
                        {link ? (
                          <Link
                            href={link}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {item.entityName || item.entityType}
                          </Link>
                        ) : (
                          <span className="font-medium">
                            {item.entityName || item.entityType}
                          </span>
                        )}
                        {item.fieldName && (
                          <span className="text-gray-500 text-sm">
                            ({item.fieldName})
                          </span>
                        )}
                      </div>
                      {item.content && (
                        <p className="text-sm text-gray-600 mt-1 bg-gray-50 rounded p-2">
                          &ldquo;{item.content}&rdquo;
                        </p>
                      )}
                      <span className="text-xs text-gray-400 mt-1 block">
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Active Users Sidebar */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active Now ({activeUsers.length})
              </h2>

              {activeUsers.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No other users active</p>
              ) : (
                <div className="space-y-3">
                  {activeUsers.map(user => {
                    const link = getEntityLink(user.entityType, user.entityId);

                    return (
                      <div key={user.userId} className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                          {(user.name || user.email)[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-700 truncate">
                            {user.name || user.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.action === 'editing' ? '✏️ Editing' : '👁️ Viewing'}{' '}
                            {link ? (
                              <Link href={link} className="text-blue-600 hover:underline">
                                {user.entityName || user.entityType}
                              </Link>
                            ) : (
                              <span>{user.entityName || user.entityType}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-700 mb-3">Today&apos;s Stats</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Edits</span>
                  <span className="font-medium">
                    {activity.filter(a => a.type === 'edit').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Comments</span>
                  <span className="font-medium">
                    {activity.filter(a => a.type === 'comment').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Active Users</span>
                  <span className="font-medium">{activeUsers.length + 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
