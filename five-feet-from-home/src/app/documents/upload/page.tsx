'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface UploadResult {
  success: boolean;
  document?: {
    id: string;
    fileName: string;
    blocksCreated: number;
  };
  message?: string;
  error?: string;
}

export default function DocumentUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploading(true);
    setError(null);
    setResults([]);

    const fileArray = Array.from(files).filter(f => f.name.endsWith('.docx'));

    if (fileArray.length === 0) {
      setError('Please select .docx files only');
      setUploading(false);
      return;
    }

    const uploadResults: UploadResult[] = [];

    for (const file of fileArray) {
      try {
        const result = await uploadFile(file);
        uploadResults.push(result);
        setResults([...uploadResults]);
      } catch (err) {
        uploadResults.push({
          success: false,
          error: `Failed to upload ${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`
        });
        setResults([...uploadResults]);
      }
    }

    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/documents" className="text-blue-600 hover:underline text-sm">
          ← Back to Documents
        </Link>
        <h1 className="text-3xl font-bold mt-2">Upload Documents</h1>
        <p className="text-gray-600 mt-1">
          Upload Word documents (.docx) to be parsed and stored for character/story extraction.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center transition-all
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragging ? 'Drop files here...' : 'Drag & drop Word documents here'}
        </p>
        <p className="text-sm text-gray-500 mb-4">or</p>

        <label className="inline-block">
          <input
            type="file"
            accept=".docx"
            multiple
            onChange={handleFileInput}
            className="hidden"
            disabled={uploading}
          />
          <span className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            Browse Files
          </span>
        </label>

        <p className="text-xs text-gray-400 mt-4">
          Supported: .docx files only
        </p>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-blue-700 font-medium">Uploading and parsing documents...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="font-semibold text-lg">Upload Results</h2>
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.success
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              {result.success ? (
                <div>
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {result.document?.fileName}
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Created {result.document?.blocksCreated} content blocks
                  </p>
                </div>
              ) : (
                <div className="text-red-700">
                  <span className="font-medium">Error:</span> {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border">
        <h2 className="font-semibold text-lg mb-3">How it works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Upload your Word documents (.docx files)</li>
          <li>The system parses the text and detects section headings</li>
          <li>Content is split into blocks for searching and extraction</li>
          <li>Use the search or extraction tools to pull character/story data</li>
        </ol>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> If you upload a file with the same name as an existing document,
            the old version will be replaced.
          </p>
        </div>
      </div>
    </div>
  );
}
