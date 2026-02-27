'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Users,
  MapPin,
  Package,
  Flag,
  Sparkles,
  BookOpen,
  Link as LinkIcon,
  Quote,
  Info,
} from 'lucide-react';

interface EntityMention {
  id: string;
  evidenceSnippet: string;
  context?: string;
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

interface CanonFact {
  id: string;
  factType: string;
  factValue: string;
  evidence?: string;
  chapterId?: string;
}

interface Relationship {
  id: string;
  relationType: string;
  description?: string;
  evidence?: string;
  sourceEntity?: { id: string; name: string; type: string };
  targetEntity?: { id: string; name: string; type: string };
}

interface Entity {
  id: string;
  name: string;
  type: string;
  description?: string;
  aliases: string[];
  metadata: Record<string, string>;
  mentions: EntityMention[];
  facts: CanonFact[];
  sourceRelations: Relationship[];
  targetRelations: Relationship[];
}

const TYPE_CONFIG: Record<string, { icon: typeof Users; color: string; label: string }> = {
  character: { icon: Users, color: 'bg-blue-500', label: 'Character' },
  location: { icon: MapPin, color: 'bg-green-500', label: 'Location' },
  object: { icon: Package, color: 'bg-orange-500', label: 'Object' },
  faction: { icon: Flag, color: 'bg-purple-500', label: 'Faction' },
  theme: { icon: Sparkles, color: 'bg-pink-500', label: 'Theme' },
};

export default function EntityDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; entityId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch(
          `/api/projects/${resolvedParams.projectId}/entities/${resolvedParams.entityId}`
        );
        if (!response.ok) {
          router.push(`/projects/${resolvedParams.projectId}/canon/entities`);
          return;
        }
        const data = await response.json();
        setEntity(data);
      } catch (error) {
        console.error('Failed to fetch entity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntity();
  }, [resolvedParams.projectId, resolvedParams.entityId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!entity) {
    return null;
  }

  const config = TYPE_CONFIG[entity.type] || TYPE_CONFIG.character;
  const Icon = config.icon;
  const allRelations = [...entity.sourceRelations, ...entity.targetRelations];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/projects/${resolvedParams.projectId}/canon/entities?type=${entity.type}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {config.label}s
        </Link>
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 ${config.color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{entity.name}</h1>
            <Badge variant="default" className="mt-2">{config.label}</Badge>
            {entity.aliases.length > 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Also known as: {entity.aliases.join(', ')}
              </p>
            )}
          </div>
        </div>
        {entity.description && (
          <p className="text-slate-600 dark:text-slate-400 mt-4">{entity.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Canon Facts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Canon Facts ({entity.facts.length})
              </CardTitle>
            </CardHeader>
            {entity.facts.length === 0 ? (
              <p className="text-slate-500 text-sm">No facts recorded yet</p>
            ) : (
              <div className="space-y-3">
                {entity.facts.map((fact) => (
                  <div
                    key={fact.id}
                    className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        {fact.factType.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {fact.factValue}
                    </p>
                    {fact.evidence && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 italic">
                        "{fact.evidence}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Mentions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="w-5 h-5" />
                Mentions ({entity.mentions.length})
              </CardTitle>
            </CardHeader>
            {entity.mentions.length === 0 ? (
              <p className="text-slate-500 text-sm">No mentions recorded</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {entity.mentions.map((mention) => (
                  <Link
                    key={mention.id}
                    href={`/projects/${resolvedParams.projectId}/chapters/${mention.chapter.id}`}
                    className="block p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {mention.chapter.book.title} - {mention.chapter.title}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                      "{mention.evidenceSnippet}"
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Relationships */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Relationships ({allRelations.length})
              </CardTitle>
            </CardHeader>
            {allRelations.length === 0 ? (
              <p className="text-slate-500 text-sm">No relationships recorded</p>
            ) : (
              <div className="space-y-3">
                {allRelations.map((rel) => {
                  const isSource = 'targetEntity' in rel && rel.targetEntity;
                  const otherEntity = isSource ? rel.targetEntity : rel.sourceEntity;
                  if (!otherEntity) return null;

                  const relConfig = TYPE_CONFIG[otherEntity.type] || TYPE_CONFIG.character;
                  const RelIcon = relConfig.icon;

                  return (
                    <Link
                      key={rel.id}
                      href={`/projects/${resolvedParams.projectId}/canon/entities/${otherEntity.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <div className={`w-8 h-8 ${relConfig.color} rounded-lg flex items-center justify-center`}>
                        <RelIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {otherEntity.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {rel.relationType.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Mentions</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {entity.mentions.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Facts</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {entity.facts.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Relationships</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {allRelations.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Chapters appeared</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {new Set(entity.mentions.map(m => m.chapter.id)).size}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
