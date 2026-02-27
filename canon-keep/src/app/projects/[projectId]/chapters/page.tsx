'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, MessageSquare, Sparkles, ChevronRight } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  orderIndex: number;
  wordCount: number;
}

interface Book {
  id: string;
  title: string;
  orderIndex: number;
  chapters: Chapter[];
}

interface Series {
  id: string;
  name: string;
  orderIndex: number;
  books: Book[];
}

interface Project {
  id: string;
  name: string;
  series: Series[];
}

export default function ChaptersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${resolvedParams.projectId}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.projectId]);

  // Flatten all chapters
  const allChapters: (Chapter & { bookTitle: string })[] = [];
  project?.series?.forEach((series) => {
    series.books?.forEach((book) => {
      book.chapters?.forEach((chapter) => {
        allChapters.push({ ...chapter, bookTitle: book.title });
      });
    });
  });

  // Sort by order
  allChapters.sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chapters</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Browse chapters, get AI feedback, and view enhancement suggestions
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : allChapters.length === 0 ? (
        <Card className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No chapters found</p>
          <p className="text-sm text-slate-500 mt-1">
            Upload manuscripts to import chapters
          </p>
          <Link
            href={`/projects/${resolvedParams.projectId}/uploads`}
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Go to Uploads →
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {allChapters.map((chapter, index) => (
            <Card
              key={chapter.id}
              padding="none"
              className="hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {chapter.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-500">{chapter.bookTitle}</span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-sm text-slate-500">
                          {chapter.wordCount.toLocaleString()} words
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/projects/${resolvedParams.projectId}/chapters/${chapter.id}/feedback`}
                    >
                      <Badge
                        variant="info"
                        className="cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Feedback
                      </Badge>
                    </Link>
                    <Link
                      href={`/projects/${resolvedParams.projectId}/chapters/${chapter.id}/enhance`}
                    >
                      <Badge
                        variant="success"
                        className="cursor-pointer hover:bg-green-200 dark:hover:bg-green-800"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Enhance
                      </Badge>
                    </Link>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
