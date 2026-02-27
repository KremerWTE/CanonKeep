'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Users, ArrowRight, MapPin, Package, Flag } from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  type: string;
}

interface Relationship {
  id: string;
  relationType: string;
  description?: string;
  evidence?: string;
  confidence: number;
  sourceEntity: Entity;
  targetEntity: Entity;
}

const TYPE_ICONS: Record<string, typeof Users> = {
  character: Users,
  location: MapPin,
  object: Package,
  faction: Flag,
};

const RELATION_CATEGORIES: Record<string, string[]> = {
  Family: ['parent_of', 'child_of', 'sibling_of', 'married_to', 'spouse_of'],
  Social: ['friend_of', 'enemy_of', 'colleague_of', 'ally_of', 'rival_of'],
  Organization: ['member_of', 'leader_of', 'founder_of', 'works_for'],
  Location: ['lives_in', 'located_in', 'born_in', 'works_at'],
  Other: [],
};

export default function RelationshipsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        const response = await fetch(
          `/api/projects/${resolvedParams.projectId}/relationships`
        );
        const data = await response.json();
        setRelationships(data);
      } catch (error) {
        console.error('Failed to fetch relationships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelationships();
  }, [resolvedParams.projectId]);

  // Group by relation category
  const categorizeRelation = (type: string): string => {
    for (const [category, types] of Object.entries(RELATION_CATEGORIES)) {
      if (types.includes(type)) return category;
    }
    return 'Other';
  };

  const filteredRelationships = filter
    ? relationships.filter((r) => categorizeRelation(r.relationType) === filter)
    : relationships;

  const categories = [...new Set(relationships.map((r) => categorizeRelation(r.relationType)))];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Relationships</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Connections between entities in your story
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            !filter
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
          }`}
        >
          All ({relationships.length})
        </button>
        {categories.map((category) => {
          const count = relationships.filter(
            (r) => categorizeRelation(r.relationType) === category
          ).length;
          return (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : relationships.length === 0 ? (
        <Card className="text-center py-12">
          <Network className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">No relationships found</p>
          <p className="text-sm text-slate-500 mt-1">
            Upload manuscripts to extract character relationships
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRelationships.map((rel) => {
            const SourceIcon = TYPE_ICONS[rel.sourceEntity.type] || Users;
            const TargetIcon = TYPE_ICONS[rel.targetEntity.type] || Users;

            return (
              <Card key={rel.id}>
                <div className="flex items-center gap-3">
                  {/* Source Entity */}
                  <Link
                    href={`/projects/${resolvedParams.projectId}/canon/entities/${rel.sourceEntity.id}`}
                    className="flex items-center gap-2 hover:text-indigo-600"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <SourceIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {rel.sourceEntity.name}
                    </span>
                  </Link>

                  {/* Relationship Arrow */}
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-700" />
                    <Badge variant="default" className="whitespace-nowrap">
                      {rel.relationType.replace(/_/g, ' ')}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-700" />
                  </div>

                  {/* Target Entity */}
                  <Link
                    href={`/projects/${resolvedParams.projectId}/canon/entities/${rel.targetEntity.id}`}
                    className="flex items-center gap-2 hover:text-indigo-600"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">
                      {rel.targetEntity.name}
                    </span>
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                      <TargetIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </Link>
                </div>

                {rel.evidence && (
                  <p className="text-sm text-slate-500 italic mt-3 line-clamp-2">
                    "{rel.evidence}"
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
