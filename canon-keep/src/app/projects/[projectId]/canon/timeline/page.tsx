'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Users, MapPin, Zap } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  description?: string;
  narrativeTime?: string;
  eventType?: string;
  participants: string[];
  location?: string;
  evidence?: string;
  chapter: {
    id: string;
    title: string;
    orderIndex: number;
    book: {
      id: string;
      title: string;
    };
  };
}

const EVENT_TYPE_CONFIG: Record<string, { color: string; icon: typeof Zap }> = {
  action: { color: 'bg-red-500', icon: Zap },
  dialogue: { color: 'bg-blue-500', icon: Users },
  revelation: { color: 'bg-purple-500', icon: Zap },
  flashback: { color: 'bg-orange-500', icon: Calendar },
  transition: { color: 'bg-slate-500', icon: Calendar },
  other: { color: 'bg-slate-400', icon: Calendar },
};

export default function TimelinePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/projects/${resolvedParams.projectId}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [resolvedParams.projectId]);

  // Group events by chapter
  const groupedEvents = events.reduce((acc, event) => {
    const key = event.chapter.id;
    if (!acc[key]) {
      acc[key] = {
        chapter: event.chapter,
        events: [],
      };
    }
    acc[key].events.push(event);
    return acc;
  }, {} as Record<string, { chapter: Event['chapter']; events: Event[] }>);

  const chapters = Object.values(groupedEvents).sort(
    (a, b) => a.chapter.orderIndex - b.chapter.orderIndex
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Story Timeline</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Key events in chronological order
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : events.length === 0 ? (
        <Card className="text-center py-12">
          <Calendar className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No events extracted yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Upload manuscripts to extract timeline events
          </p>
        </Card>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

          <div className="space-y-8">
            {chapters.map(({ chapter, events: chapterEvents }) => (
              <div key={chapter.id} className="relative pl-16">
                {/* Chapter marker */}
                <div className="absolute left-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                {/* Chapter header */}
                <div className="mb-4">
                  <Link
                    href={`/projects/${resolvedParams.projectId}/chapters/${chapter.id}`}
                    className="hover:text-indigo-600"
                  >
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {chapter.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-slate-500">{chapter.book.title}</p>
                </div>

                {/* Events */}
                <div className="space-y-3">
                  {chapterEvents.map((event) => {
                    const config = EVENT_TYPE_CONFIG[event.eventType || 'other'];
                    const Icon = config.icon;

                    return (
                      <Card key={event.id} padding="sm">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-slate-900 dark:text-white">
                              {event.name}
                            </h3>
                            {event.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {event.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {event.eventType && (
                                <Badge variant="default">{event.eventType}</Badge>
                              )}
                              {event.narrativeTime && (
                                <Badge variant="info">{event.narrativeTime}</Badge>
                              )}
                              {event.participants?.length > 0 && (
                                <Badge variant="default">
                                  <Users className="w-3 h-3 mr-1" />
                                  {event.participants.length} participants
                                </Badge>
                              )}
                            </div>
                            {event.evidence && (
                              <p className="text-xs text-slate-500 mt-2 italic line-clamp-2">
                                "{event.evidence}"
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
