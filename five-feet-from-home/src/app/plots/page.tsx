import Link from 'next/link';
import prisma from '@/lib/db';

// Safe JSON parse that handles both JSON arrays and plain strings
function safeParseArray(str: string | null): string[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [str];
  } catch {
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }
}

async function getPlotThreads() {
  return prisma.plotThread.findMany({
    include: {
      project: true,
      characters: {
        include: { character: true },
      },
      chapters: {
        include: { chapter: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

export default async function PlotsPage() {
  const plots = await getPlotThreads();

  const statusColors: Record<string, string> = {
    active: 'badge-green',
    resolved: 'badge-blue',
    abandoned: 'badge-gray',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plot Threads</h1>
        <p className="mt-1 text-gray-600">
          {plots.length} plot thread{plots.length !== 1 ? 's' : ''} tracking your story arcs
        </p>
      </div>

      {plots.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">
            No plot threads found. Import documents with plot definitions to populate this page.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {plots.map((plot) => {
            const phases = safeParseArray(plot.phases);

            return (
              <Link
                key={plot.id}
                href={`/plots/${plot.id}`}
                className="block bg-white rounded-lg shadow-sm border p-6 card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{plot.name}</h3>
                      <span className={`badge ${statusColors[plot.status] || 'badge-gray'}`}>
                        {plot.status}
                      </span>
                    </div>

                    {plot.premise && (
                      <p className="text-gray-600 mt-2 line-clamp-2">{plot.premise}</p>
                    )}

                    {plot.stakes && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Stakes:</strong> {plot.stakes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  {plot.characters.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Characters:</span>
                      <div className="flex gap-1">
                        {plot.characters.slice(0, 3).map((pc) => (
                          <span key={pc.id} className="badge badge-purple">
                            {pc.character.name}
                          </span>
                        ))}
                        {plot.characters.length > 3 && (
                          <span className="badge badge-gray">
                            +{plot.characters.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {plot.chapters.length > 0 && (
                    <span className="text-gray-500">
                      Touches {plot.chapters.length} chapter{plot.chapters.length !== 1 ? 's' : ''}
                    </span>
                  )}

                  {phases.length > 0 && (
                    <span className="text-gray-500">{phases.length} phases defined</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
