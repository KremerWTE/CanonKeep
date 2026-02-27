import Link from 'next/link';
import { notFound } from 'next/navigation';
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

interface Props {
  params: Promise<{ id: string }>;
}

async function getPlotThread(id: string) {
  return prisma.plotThread.findUnique({
    where: { id },
    include: {
      project: true,
      characters: {
        include: { character: true },
      },
      chapters: {
        include: { chapter: true },
        orderBy: { chapter: { number: 'asc' } },
      },
    },
  });
}

export default async function PlotThreadPage({ params }: Props) {
  const { id } = await params;
  const plot = await getPlotThread(id);

  if (!plot) {
    notFound();
  }

  const phases = safeParseArray(plot.phases);

  const statusColors: Record<string, string> = {
    active: 'badge-green',
    resolved: 'badge-blue',
    abandoned: 'badge-gray',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/plots"
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
        >
          ← Back to Plot Threads
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{plot.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`badge ${statusColors[plot.status] || 'badge-gray'}`}>
                {plot.status}
              </span>
              <span className="text-gray-400">Project: {plot.project.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Premise */}
          {plot.premise && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Premise</h2>
              <p className="prose-story whitespace-pre-wrap">{plot.premise}</p>
            </section>
          )}

          {/* Stakes */}
          {plot.stakes && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Stakes</h2>
              <p className="prose-story whitespace-pre-wrap">{plot.stakes}</p>
            </section>
          )}

          {/* Phases */}
          {phases.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Phases</h2>
              <div className="space-y-4">
                {phases.map((phase: string, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-700">{phase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Resolution */}
          {plot.resolution ? (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Resolution</h2>
              <p className="prose-story whitespace-pre-wrap">{plot.resolution}</p>
            </section>
          ) : plot.status === 'active' ? (
            <section className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h2 className="text-lg font-semibold text-yellow-800 mb-3">Resolution Needed</h2>
              <p className="text-yellow-700">
                This plot thread is active but has no resolution defined. Consider adding how this
                thread will conclude.
              </p>
            </section>
          ) : null}

          {/* Chapter Appearances */}
          {plot.chapters.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Chapter Appearances ({plot.chapters.length})
              </h2>
              <div className="space-y-3">
                {plot.chapters.map((cp) => (
                  <Link
                    key={cp.id}
                    href={`/chapters/${cp.chapter.id}`}
                    className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {cp.chapter.title || `Chapter ${cp.chapter.number}`}
                      </span>
                    </div>
                    {cp.advancement && (
                      <p className="text-sm text-gray-500 mt-1">
                        Advances: {cp.advancement}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Involved Characters */}
          {plot.characters.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Involved Characters ({plot.characters.length})
              </h2>
              <div className="space-y-2">
                {plot.characters.map((pc) => (
                  <Link
                    key={pc.id}
                    href={`/characters/${pc.character.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{pc.character.name}</span>
                    {pc.role && <span className="badge badge-purple">{pc.role}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* No characters warning */}
          {plot.characters.length === 0 && (
            <section className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h2 className="text-sm font-semibold text-yellow-800 mb-2">No Characters Linked</h2>
              <p className="text-sm text-yellow-700">
                This plot thread has no characters explicitly linked. Consider which characters
                drive this storyline.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
