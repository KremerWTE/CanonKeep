'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface DocumentStatus {
  id: string;
  fileName: string;
  status: 'unchanged' | 'changed' | 'missing';
  ingestedAt: string;
  fileModified: string | null;
  blockCount: number;
  hashChanged: boolean;
}

interface Stats {
  total: number;
  unchanged: number;
  changed: number;
  missing: number;
  newFiles: number;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentStatus[]>([]);
  const [newFiles, setNewFiles] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'changed' | 'unchanged' | 'missing'>('all');

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/documents/reparse');
      const data = await res.json();
      setDocuments(data.documents || []);
      setNewFiles(data.newFiles || []);
      setStats(data.stats || null);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load documents' });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const reparseDocument = async (docId: string, force: boolean = false) => {
    setProcessing(docId);
    setMessage(null);

    try {
      const res = await fetch('/api/documents/reparse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: docId, forceReparse: force })
      });

      const data = await res.json();

      if (data.success) {
        if (data.unchanged) {
          setMessage({ type: 'success', text: data.message });
        } else {
          setMessage({
            type: 'success',
            text: `Re-parsed ${data.document.fileName}: ${data.document.previousBlocks} -> ${data.document.newBlocks} blocks`
          });
        }
        loadData();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to re-parse document' });
    }

    setProcessing(null);
  };

  const uploadNewFile = async (file: File) => {
    setProcessing(file.name);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        loadData();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to upload file' });
    }

    setProcessing(null);
  };

  const reparseAll = async (onlyChanged: boolean = true) => {
    setProcessing('all');
    setMessage(null);

    const toReparse = onlyChanged
      ? documents.filter(d => d.status === 'changed')
      : documents.filter(d => d.status !== 'missing');

    let success = 0;
    let failed = 0;

    for (const doc of toReparse) {
      try {
        const res = await fetch('/api/documents/reparse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ documentId: doc.id, forceReparse: !onlyChanged })
        });

        const data = await res.json();
        if (data.success && !data.unchanged) {
          success++;
        }
      } catch {
        failed++;
      }
    }

    setMessage({
      type: success > 0 ? 'success' : 'error',
      text: `Re-parsed ${success} documents${failed > 0 ? `, ${failed} failed` : ''}`
    });

    loadData();
    setProcessing(null);
  };

  // Filter documents
  const filteredDocs = filter === 'all'
    ? documents
    : documents.filter(d => d.status === filter);

  const totalBlocks = documents.reduce((sum, d) => sum + d.blockCount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'changed':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Changed</span>;
      case 'unchanged':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Up to date</span>;
      case 'missing':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">File missing</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <div className="text-gray-600">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Documents</h1>
          <p className="mt-1 text-gray-600">
            {documents.length} documents with {totalBlocks.toLocaleString()} content blocks
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {stats && stats.changed > 0 && (
            <button
              onClick={() => reparseAll(true)}
              disabled={processing !== null}
              className="px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 text-sm sm:text-base"
            >
              {processing === 'all' ? 'Processing...' : `Re-parse ${stats.changed} Changed`}
            </button>
          )}
          <Link
            href="/documents/upload"
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="hidden sm:inline">Upload Documents</span>
            <span className="sm:hidden">Upload</span>
          </Link>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Documents</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.unchanged}</div>
            <div className="text-xs sm:text-sm text-gray-500">Up to Date</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.changed}</div>
            <div className="text-xs sm:text-sm text-gray-500">Changed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.missing}</div>
            <div className="text-xs sm:text-sm text-gray-500">Missing Files</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 col-span-2 sm:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.newFiles}</div>
            <div className="text-xs sm:text-sm text-gray-500">New Files</div>
          </div>
        </div>
      )}

      {/* New Files */}
      {newFiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-semibold text-blue-800 mb-2">New Files Found in Ingest Folder</h2>
          <p className="text-sm text-blue-600 mb-3">These files have not been ingested yet. Upload them to add to the database.</p>
          <div className="flex flex-wrap gap-2">
            {newFiles.map(file => (
              <div key={file} className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-sm">
                <span className="text-sm font-medium">{file}</span>
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.docx';
                    input.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files?.[0]) {
                        uploadNewFile(target.files[0]);
                      }
                    };
                    input.click();
                  }}
                  disabled={processing !== null}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50"
                >
                  Upload
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: `All (${documents.length})` },
          { key: 'changed', label: `Changed (${documents.filter(d => d.status === 'changed').length})` },
          { key: 'unchanged', label: `Up to Date (${documents.filter(d => d.status === 'unchanged').length})` },
          { key: 'missing', label: `Missing (${documents.filter(d => d.status === 'missing').length})` }
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-3 sm:px-4 py-2 rounded text-xs sm:text-sm ${filter === f.key ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {documents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 mb-4">No documents uploaded yet.</p>
          <Link
            href="/documents/upload"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload your first document
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content Blocks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Ingested
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Modified
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium text-gray-900">{doc.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.blockCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(doc.ingestedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.fileModified
                      ? new Date(doc.fileModified).toLocaleDateString()
                      : <span className="text-red-500">Not found</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/documents/${doc.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </Link>
                      {doc.status !== 'missing' && (
                        <>
                          <button
                            onClick={() => reparseDocument(doc.id, false)}
                            disabled={processing !== null}
                            className={`px-3 py-1 text-sm rounded ${
                              doc.status === 'changed'
                                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } disabled:opacity-50`}
                          >
                            {processing === doc.id ? 'Processing...' : 'Re-parse'}
                          </button>
                          <button
                            onClick={() => reparseDocument(doc.id, true)}
                            disabled={processing !== null}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                            title="Force re-parse even if unchanged"
                          >
                            Force
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {filteredDocs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No documents match the current filter
            </div>
          )}
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">How Document Re-parsing Works</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Place updated .docx files in the <code className="bg-gray-200 px-1 rounded">ingest</code> folder</li>
          <li>Documents with changed content will show as &quot;Changed&quot;</li>
          <li>Click &quot;Re-parse&quot; to update the database with new content</li>
          <li>Use &quot;Force&quot; to re-parse even if the file appears unchanged</li>
          <li>Content blocks are replaced but extracted entities are preserved</li>
        </ul>
      </div>
    </div>
  );
}
