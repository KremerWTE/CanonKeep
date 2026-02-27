import Link from 'next/link';
import prisma from '@/lib/db';

async function getContinuityData() {
  const conflicts = await prisma.conflict.findMany({
    orderBy: [{ resolved: 'asc' }, { severity: 'asc' }, { createdAt: 'desc' }],
    include: {
      project: true,
    },
  });

  // Get characters missing key fields
  const underdevelopedCharacters = await prisma.character.findMany({
    where: {
      OR: [
        { motivations: null },
        { fears: null },
        { flaw: null },
      ],
    },
    select: {
      id: true,
      name: true,
      motivations: true,
      fears: true,
      flaw: true,
      secrets: true,
    },
  });

  // Get plot threads without resolution
  const danglingPlots = await prisma.plotThread.findMany({
    where: {
      status: 'active',
      resolution: null,
    },
    select: {
      id: true,
      name: true,
      premise: true,
    },
  });

  // Get chapters without POV
  const chaptersWithoutPov = await prisma.chapter.findMany({
    where: {
      pov: null,
    },
    select: {
      id: true,
      number: true,
      title: true,
    },
  });

  // Get characters with no relationships
  const isolatedCharacters = await prisma.character.findMany({
    where: {
      AND: [
        { relationshipsFrom: { none: {} } },
        { relationshipsTo: { none: {} } },
      ],
    },
    select: {
      id: true,
      name: true,
    },
  });

  return {
    conflicts,
    underdevelopedCharacters,
    danglingPlots,
    chaptersWithoutPov,
    isolatedCharacters,
  };
}

const severityColors: Record<string, string> = {
  error: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

const severityIcons: Record<string, string> = {
  error: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

export default async function ContinuityPage() {
  const {
    conflicts,
    underdevelopedCharacters,
    danglingPlots,
    chaptersWithoutPov,
    isolatedCharacters,
  } = await getContinuityData();

  const unresolvedConflicts = conflicts.filter((c) => !c.resolved);
  const resolvedConflicts = conflicts.filter((c) => c.resolved);

  const totalIssues =
    unresolvedConflicts.length +
    underdevelopedCharacters.length +
    danglingPlots.length +
    chaptersWithoutPov.length +
    isolatedCharacters.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Continuity & Gaps</h1>
        <p className="mt-1 text-gray-600">
          {totalIssues} issue{totalIssues !== 1 ? 's' : ''} detected in your story
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">{unresolvedConflicts.length}</div>
          <div className="text-sm text-red-600">Conflicts</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-700">{underdevelopedCharacters.length}</div>
          <div className="text-sm text-yellow-600">Underdeveloped Characters</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-700">{danglingPlots.length}</div>
          <div className="text-sm text-orange-600">Dangling Plot Threads</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">{chaptersWithoutPov.length}</div>
          <div className="text-sm text-blue-600">Chapters Without POV</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-700">{isolatedCharacters.length}</div>
          <div className="text-sm text-purple-600">Isolated Characters</div>
        </div>
      </div>

      {/* Detected Conflicts */}
      {unresolvedConflicts.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Detected Conflicts</h2>
          <div className="space-y-3">
            {unresolvedConflicts.map((conflict) => (
              <div
                key={conflict.id}
                className={`rounded-lg border p-4 ${severityColors[conflict.severity]}`}
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={severityIcons[conflict.severity]}
                    />
                  </svg>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{conflict.conflictType.replace(/_/g, ' ')}</span>
                      <span className="badge badge-gray">{conflict.severity}</span>
                    </div>
                    <p className="mt-1">{conflict.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Underdeveloped Characters */}
      {underdevelopedCharacters.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Underdeveloped Characters</h2>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {underdevelopedCharacters.map((char) => {
              const missing: string[] = [];
              if (!char.motivations) missing.push('motivations');
              if (!char.fears) missing.push('fears');
              if (!char.flaw) missing.push('flaw');

              return (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{char.name}</span>
                    <div className="flex gap-2">
                      {missing.map((field) => (
                        <span key={field} className="badge badge-yellow">
                          Missing {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Dangling Plot Threads */}
      {danglingPlots.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dangling Plot Threads</h2>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {danglingPlots.map((plot) => (
              <Link
                key={plot.id}
                href={`/plots/${plot.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{plot.name}</span>
                    {plot.premise && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{plot.premise}</p>
                    )}
                  </div>
                  <span className="badge badge-orange">No resolution</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Chapters Without POV */}
      {chaptersWithoutPov.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapters Without POV</h2>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {chaptersWithoutPov.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {chapter.title || `Chapter ${chapter.number}`}
                  </span>
                  <span className="badge badge-blue">No POV defined</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Isolated Characters */}
      {isolatedCharacters.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Isolated Characters</h2>
          <p className="text-sm text-gray-500 mb-3">
            These characters have no defined relationships with other characters.
          </p>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {isolatedCharacters.map((char) => (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{char.name}</span>
                  <span className="badge badge-purple">No relationships</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Resolved Conflicts */}
      {resolvedConflicts.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Resolved Conflicts ({resolvedConflicts.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {resolvedConflicts.map((conflict) => (
              <div key={conflict.id} className="p-4 opacity-60">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{conflict.description}</span>
                </div>
                {conflict.resolution && (
                  <p className="text-sm text-gray-500 mt-1 ml-6">
                    Resolution: {conflict.resolution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Clear */}
      {totalIssues === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-green-800">All Clear!</h2>
          <p className="text-green-700 mt-2">
            No continuity issues or gaps detected in your story content.
          </p>
        </div>
      )}
    </div>
  );
}
