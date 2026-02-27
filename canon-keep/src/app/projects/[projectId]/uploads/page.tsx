'use client';

import { useEffect, useState, use } from 'react';
import { FileUploader } from '@/components/upload/file-uploader';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';

interface Upload {
  id: string;
  originalName: string;
  fileSize: number;
  status: string;
  createdAt: string;
  processedAt?: string;
  error?: string;
}

export default function UploadsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.projectId}/uploads`);
      const data = await response.json();
      setUploads(data);
    } catch (error) {
      console.error('Failed to fetch uploads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
    const interval = setInterval(fetchUploads, 5000);
    return () => clearInterval(interval);
  }, [resolvedParams.projectId]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
      completed: 'success',
      failed: 'error',
      processing: 'info',
      pending: 'warning',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Uploads</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Upload your manuscript files to extract and analyze story canon
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Manuscript</CardTitle>
          </CardHeader>
          <FileUploader
            projectId={resolvedParams.projectId}
            onUploadComplete={() => fetchUploads()}
          />
        </Card>

        {/* Upload History */}
        <Card>
          <CardHeader>
            <CardTitle>Upload History</CardTitle>
          </CardHeader>
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
            </div>
          ) : uploads.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-slate-600 dark:text-slate-400">No uploads yet</p>
              <p className="text-sm text-slate-500">Upload a manuscript to get started</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                >
                  {getStatusIcon(upload.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {upload.originalName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {formatFileSize(upload.fileSize)}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">
                        {new Date(upload.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {upload.error && (
                      <p className="text-xs text-red-500 mt-1">{upload.error}</p>
                    )}
                  </div>
                  {getStatusBadge(upload.status)}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
