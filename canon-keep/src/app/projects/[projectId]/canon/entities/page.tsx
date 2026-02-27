'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Package, Flag, Sparkles, Search, Filter } from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  type: string;
  description?: string;
  _count: {
    mentions: number;
    facts: number;
    sourceRelations: number;
    targetRelations: number;
  };
}

const TYPE_CONFIG: Record<string, { icon: typeof Users; color: string; label: string }> = {
  character: { icon: Users, color: 'bg-blue-500', label: 'Character' },
  location: { icon: MapPin, color: 'bg-green-500', label: 'Location' },
  object: { icon: Package, color: 'bg-orange-500', label: 'Object' },
  faction: { icon: Flag, color: 'bg-purple-500', label: 'Faction' },
  theme: { icon: Sparkles, color: 'bg-pink-500', label: 'Theme' },
};

export default function EntitiesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const url = typeFilter
          ? `/api/projects/${resolvedParams.projectId}/entities?type=${typeFilter}`
          : `/api/projects/${resolvedParams.projectId}/entities`;
        const response = await fetch(url);
        const data = await response.json();
        setEntities(data);
      } catch (error) {
        console.error('Failed to fetch entities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [resolvedParams.projectId, typeFilter]);

  const filteredEntities = entities.filter((entity) =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedEntities = filteredEntities.reduce((acc, entity) => {
    if (!acc[entity.type]) {
      acc[entity.type] = [];
    }
    acc[entity.type].push(entity);
    return acc;
  }, {} as Record<string, Entity[]>);

  const types = ['character', 'location', 'object', 'faction', 'theme'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Canon Entities</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          All characters, locations, objects, and more extracted from your manuscripts
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entities..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <Link href={`/projects/${resolvedParams.projectId}/canon/entities`}>
            <Button variant={!typeFilter ? 'primary' : 'outline'} size="sm">
              All
            </Button>
          </Link>
          {types.map((type) => {
            const config = TYPE_CONFIG[type];
            const Icon = config.icon;
            return (
              <Link
                key={type}
                href={`/projects/${resolvedParams.projectId}/canon/entities?type=${type}`}
              >
                <Button
                  variant={typeFilter === type ? 'primary' : 'outline'}
                  size="sm"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {config.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : filteredEntities.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No entities found</p>
          <p className="text-sm text-slate-500 mt-1">
            Upload manuscripts to extract entities
          </p>
        </Card>
      ) : typeFilter ? (
        // Single type view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntities.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
              projectId={resolvedParams.projectId}
            />
          ))}
        </div>
      ) : (
        // Grouped view
        <div className="space-y-8">
          {types.map((type) => {
            const typeEntities = groupedEntities[type];
            if (!typeEntities?.length) return null;

            const config = TYPE_CONFIG[type];
            const Icon = config.icon;

            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {config.label}s ({typeEntities.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {typeEntities.slice(0, 6).map((entity) => (
                    <EntityCard
                      key={entity.id}
                      entity={entity}
                      projectId={resolvedParams.projectId}
                    />
                  ))}
                </div>
                {typeEntities.length > 6 && (
                  <Link
                    href={`/projects/${resolvedParams.projectId}/canon/entities?type=${type}`}
                    className="inline-block mt-4 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    View all {typeEntities.length} {config.label.toLowerCase()}s →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EntityCard({ entity, projectId }: { entity: Entity; projectId: string }) {
  const config = TYPE_CONFIG[entity.type] || TYPE_CONFIG.character;
  const Icon = config.icon;
  const totalRelations = entity._count.sourceRelations + entity._count.targetRelations;

  return (
    <Link href={`/projects/${projectId}/canon/entities/${entity.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {entity.name}
            </h3>
            {entity.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {entity.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="default">
                {entity._count.mentions} mentions
              </Badge>
              {entity._count.facts > 0 && (
                <Badge variant="info">
                  {entity._count.facts} facts
                </Badge>
              )}
              {totalRelations > 0 && (
                <Badge variant="success">
                  {totalRelations} relations
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
