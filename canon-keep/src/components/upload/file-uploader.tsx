'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

interface FileUploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
  uploadId?: string;
}

interface FileUploaderProps {
  projectId: string;
  onUploadComplete?: (uploadId: string) => void;
}

export function FileUploader({ projectId, onUploadComplete }: FileUploaderProps) {
  const [files, setFiles] = useState<FileUploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf'],
      'text/markdown': ['.md'],
      'text/plain': ['.txt'],
    },
    multiple: true,
  });

  const uploadFile = async (fileProgress: FileUploadProgress, index: number) => {
    const formData = new FormData();
    formData.append('file', fileProgress.file);

    setFiles(prev => prev.map((f, i) =>
      i === index ? { ...f, status: 'uploading', progress: 10 } : f
    ));

    try {
      const response = await fetch(`/api/projects/${projectId}/uploads`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      setFiles(prev => prev.map((f, i) =>
        i === index ? { ...f, status: 'processing', progress: 50, uploadId: data.id } : f
      ));

      // Poll for processing status
      await pollJobStatus(data.id, index);
    } catch (error) {
      setFiles(prev => prev.map((f, i) =>
        i === index ? { ...f, status: 'error', error: 'Upload failed' } : f
      ));
    }
  };

  const pollJobStatus = async (uploadId: string, index: number) => {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`/api/projects/${projectId}/uploads`);
        const uploads = await response.json();
        const upload = uploads.find((u: { id: string }) => u.id === uploadId);

        if (upload?.status === 'completed') {
          setFiles(prev => prev.map((f, i) =>
            i === index ? { ...f, status: 'complete', progress: 100 } : f
          ));
          onUploadComplete?.(uploadId);
          return;
        } else if (upload?.status === 'failed') {
          setFiles(prev => prev.map((f, i) =>
            i === index ? { ...f, status: 'error', error: upload.error || 'Processing failed' } : f
          ));
          return;
        }

        // Update progress based on status
        const progress = upload?.status === 'processing' ? 50 + (attempts * 0.8) : 30;
        setFiles(prev => prev.map((f, i) =>
          i === index ? { ...f, progress: Math.min(progress, 90) } : f
        ));
      } catch (error) {
        // Continue polling
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    setFiles(prev => prev.map((f, i) =>
      i === index ? { ...f, status: 'error', error: 'Processing timed out' } : f
    ));
  };

  const uploadAll = async () => {
    setIsUploading(true);
    const pendingFiles = files.filter(f => f.status === 'pending');

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'pending') {
        await uploadFile(files[i], i);
      }
    }

    setIsUploading(false);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
        <p className="text-slate-600 dark:text-slate-400">
          {isDragActive
            ? 'Drop your manuscript files here...'
            : 'Drag & drop manuscript files, or click to select'
          }
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Supports DOCX, PDF, MD, and TXT files
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileProgress, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
            >
              {getStatusIcon(fileProgress.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                  {fileProgress.file.name}
                </p>
                {fileProgress.status === 'error' ? (
                  <p className="text-xs text-red-500">{fileProgress.error}</p>
                ) : (
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${fileProgress.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {fileProgress.status === 'pending' && (
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {files.some(f => f.status === 'pending') && (
        <Button onClick={uploadAll} loading={isUploading} className="w-full">
          Upload {files.filter(f => f.status === 'pending').length} file(s)
        </Button>
      )}
    </div>
  );
}
