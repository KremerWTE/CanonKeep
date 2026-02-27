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

async function getChapter(id: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: {
      project: true,
      book: true,
      scenes: {
        orderBy: { sceneNumber: 'asc' },
        include: { location: true },
      },
      characters: {
        include: { character: true },
      },
      plots: {
        include: { plotThread: true },
      },
      events: {
        include: { event: true },
      },
    },
  });

  if (!chapter) return null;

  // Get provenance
  const provenance = await prisma.provenance.findMany({
    where: {
      entityType: 'chapter',
      entityId: id,
    },
    include: {
      block: {
        include: { document: true },
      },
    },
  });

  return { chapter, provenance };
}

export default async function ChapterPage({ params }: Props) {
  const { id } = await params;
  const data = await getChapter(id);

  if (!data) {
    notFound();
  }

  const { chapter, provenance } = data;
  const beats = safeParseArray(chapter.beats);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/chapters"
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
        >
          ← Back to Chapters
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {chapter.title || `Chapter ${chapter.number}`}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              {chapter.number && (
                <span className="text-gray-500">Chapter {chapter.number}</span>
              )}
              {chapter.book && (
                <span className="text-gray-400">in {chapter.book.title}</span>
              )}
              {chapter.pov && <span className="badge badge-blue">POV: {chapter.pov}</span>}
              <span
                className={`badge ${
                  chapter.status === 'final'
                    ? 'badge-green'
                    : chapter.status === 'revised'
                    ? 'badge-yellow'
                    : 'badge-gray'
                }`}
              >
                {chapter.status}
              </span>
            </div>
          </div>
          {chapter.wordCount && (
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">
                {chapter.wordCount.toLocaleString()}
              </span>
              <p className="text-sm text-gray-500">words</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Synopsis */}
          {chapter.synopsis && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Synopsis</h2>
              <p className="prose-story whitespace-pre-wrap">{chapter.synopsis}</p>
            </section>
          )}

          {/* Beats */}
          {beats.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Chapter Beats</h2>
              <ol className="space-y-3">
                {beats.map((beat: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{beat}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Scenes */}
          {chapter.scenes.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Scenes ({chapter.scenes.length})
              </h2>
              <div className="space-y-4">
                {chapter.scenes.map((scene) => (
                  <div key={scene.id} className="border-l-4 border-primary-200 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        Scene {scene.sceneNumber}
                      </span>
                      {scene.location && (
                        <Link
                          href={`/locations/${scene.location.id}`}
                          className="badge badge-green hover:bg-green-200"
                        >
                          {scene.location.name}
                        </Link>
                      )}
                    </div>
                    {scene.description && (
                      <p className="text-sm text-gray-600 mt-1">{scene.description}</p>
                    )}
                    {scene.goal && (
                      <p className="text-xs text-gray-500 mt-2">
                        <strong>Goal:</strong> {scene.goal}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Draft Text */}
          {chapter.draftText && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Draft Text</h2>
              <div className="prose-story whitespace-pre-wrap bg-gray-50 rounded-lg p-4 text-sm max-h-96 overflow-y-auto">
                {chapter.draftText}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Characters */}
          {chapter.characters.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Characters ({chapter.characters.length})
              </h2>
              <div className="space-y-2">
                {chapter.characters.map((cc) => (
                  <Link
                    key={cc.id}
                    href={`/characters/${cc.character.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{cc.character.name}</span>
                    {cc.role && <span className="badge badge-blue">{cc.role}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Plot Threads */}
          {chapter.plots.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Plot Threads ({chapter.plots.length})
              </h2>
              <div className="space-y-2">
                {chapter.plots.map((cp) => (
                  <Link
                    key={cp.id}
                    href={`/plots/${cp.plotThread.id}`}
                    className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{cp.plotThread.name}</span>
                    {cp.advancement && (
                      <p className="text-xs text-gray-500 mt-1">{cp.advancement}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Events */}
          {chapter.events.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Events ({chapter.events.length})
              </h2>
              <div className="space-y-2">
                {chapter.events.map((ce) => (
                  <div
                    key={ce.id}
                    className="p-2 rounded-lg bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{ce.event.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Provenance */}
          {provenance.length > 0 && (
            <section className="bg-gray-50 rounded-lg border p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Source Documents</h2>
              <div className="space-y-2 text-sm">
                {provenance.map((p) => (
                  <div key={p.id} className="text-gray-600">
                    <span className="font-medium">{p.block.document.fileName}</span>
                    {p.block.sectionHeading && (
                      <span className="text-gray-400"> / {p.block.sectionHeading}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
