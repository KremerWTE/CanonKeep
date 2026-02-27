'use client';

import { useEffect, useState, use } from 'react';
import { Sidebar } from '@/components/layout/sidebar';

interface Project {
  id: string;
  name: string;
}

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${resolvedParams.projectId}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(console.error);
  }, [resolvedParams.projectId]);

  return (
    <div className="flex min-h-screen">
      <Sidebar projectId={resolvedParams.projectId} projectName={project?.name} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
