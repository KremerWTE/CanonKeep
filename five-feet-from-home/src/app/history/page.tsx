'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  entityName: string | null;
  action: string;
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  changedBy: string | null;
  createdAt: string;
}

interface Stats {
  entityType: string;
  action: string;
  count: number;
}

const ACTION_COLORS = {
  create: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
  update: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
  delete: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' }
};

export default function HistoryPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');

  useEffect(() => {
    fetch('/api/audit-log?limit=500')
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs || []);
        setStats(data.stats || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter logs
  let filteredLogs = logs;
  if (filterType !== 'all') {
    filteredLogs = filteredLogs.filter(l => l.entityType === filterType);
  }
  if (filterAction !== 'all') {
    filteredLogs = filteredLogs.filter(l => l.action === filterAction);
  }

  // Get unique entity types
  const entityTypes = [...new Set(logs.map(l => l.entityType))];

  // Get entity link
  const getEntityLink = (log: AuditLog) => {
    switch (log.entityType) {
      case 'character': return `/characters/${log.entityId}`;
      case 'crisis': return `/crises/${log.entityId}`;
      case 'gala': return `/galas/${log.entityId}`;
      case 'book': return `/books/${log.entityId}`;
      default: return null;
    }
  };

  if (loading) return <div className="p-8">Loading history...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Version History</h1>
            <p className="text-gray-600">{logs.length} changes tracked</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Dashboard
          </Link>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            {['create', 'update', 'delete'].map(action => {
              const count = stats.filter(s => s.action === action).reduce((sum, s) => sum + s.count, 0);
              const colors = ACTION_COLORS[action as keyof typeof ACTION_COLORS];
              return (
                <div key={action} className={`${colors.bg} p-4 rounded-lg`}>
                  <div className={`text-2xl font-bold ${colors.text}`}>{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{action}s</div>
                </div>
              );
            })}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-700">{entityTypes.length}</div>
              <div className="text-sm text-gray-600">Entity Types</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-4 items-center flex-wrap">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Entity Type</label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="px-4 py-2 border rounded"
              >
                <option value="all">All Types</option>
                {entityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Action</label>
              <select
                value={filterAction}
                onChange={e => setFilterAction(e.target.value)}
                className="px-4 py-2 border rounded"
              >
                <option value="all">All Actions</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>

            <div className="flex-1" />

            <span className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {logs.length} entries
            </span>
          </div>
        </div>

        {/* History List */}
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No history entries yet. Changes will appear here as you edit content.
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map(log => {
              const colors = ACTION_COLORS[log.action as keyof typeof ACTION_COLORS] || ACTION_COLORS.update;
              const link = getEntityLink(log);

              return (
                <div
                  key={log.id}
                  className={`bg-white rounded-lg shadow p-4 border-l-4 ${colors.border}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${colors.bg} ${colors.text}`}>
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                        {log.entityType}
                      </span>
                      {link ? (
                        <Link href={link} className="font-medium text-blue-600 hover:underline">
                          {log.entityName || log.entityId}
                        </Link>
                      ) : (
                        <span className="font-medium">{log.entityName || log.entityId}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {log.fieldName && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">Field:</span>{' '}
                      <span className="font-mono bg-gray-100 px-1 rounded">{log.fieldName}</span>
                    </div>
                  )}

                  {(log.oldValue || log.newValue) && (
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      {log.oldValue && (
                        <div>
                          <span className="text-red-600 font-medium">Old:</span>
                          <p className="text-gray-600 truncate max-w-md" title={log.oldValue}>
                            {log.oldValue.substring(0, 100)}{log.oldValue.length > 100 ? '...' : ''}
                          </p>
                        </div>
                      )}
                      {log.newValue && (
                        <div>
                          <span className="text-green-600 font-medium">New:</span>
                          <p className="text-gray-600 truncate max-w-md" title={log.newValue}>
                            {log.newValue.substring(0, 100)}{log.newValue.length > 100 ? '...' : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
