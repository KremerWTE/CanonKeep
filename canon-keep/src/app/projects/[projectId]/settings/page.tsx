'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Settings,
  Trash2,
  Download,
  AlertTriangle,
  Save,
  Shield,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function SettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${resolvedParams.projectId}`);
        const data = await response.json();
        setProject(data);
        setName(data.name);
        setDescription(data.description || '');
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.projectId]);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch(`/api/projects/${resolvedParams.projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/projects/${resolvedParams.projectId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to delete project:', error);
      setDeleting(false);
    }
  };

  const exportData = async () => {
    // TODO: Implement full data export
    alert('Data export coming soon! This will download all your project data as JSON.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your project settings and data
        </p>
      </div>

      {/* Project Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <Button onClick={saveSettings} loading={saving}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Privacy & Data */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Data
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
              Your Data is Private
            </h4>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
              <li>• Your manuscripts are never used for AI training</li>
              <li>• All data is stored securely on your server</li>
              <li>• You can export or delete your data at any time</li>
              <li>• Entity extractions are stored locally, not in cloud AI</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Deleting your project will permanently remove all manuscripts, extracted entities,
            relationships, events, alerts, and feedback. This action cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </Button>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                Are you sure you want to delete "{project?.name}"? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="danger"
                  onClick={deleteProject}
                  loading={deleting}
                >
                  Yes, Delete Everything
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Project Info */}
      <div className="mt-6 text-sm text-slate-500">
        <p>Created: {new Date(project?.createdAt || '').toLocaleString()}</p>
        <p>Last updated: {new Date(project?.updatedAt || '').toLocaleString()}</p>
      </div>
    </div>
  );
}
