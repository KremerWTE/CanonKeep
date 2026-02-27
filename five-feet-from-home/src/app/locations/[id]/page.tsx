import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

async function getLocation(id: string) {
  return prisma.location.findUnique({
    where: { id },
    include: {
      project: true,
      events: {
        include: { event: true },
      },
      scenes: {
        include: {
          chapter: true,
        },
      },
    },
  });
}

export default async function LocationPage({ params }: Props) {
  const { id } = await params;
  const location = await getLocation(id);

  if (!location) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/locations"
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
        >
          ← Back to Locations
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
        <p className="text-gray-400 mt-1">Project: {location.project.name}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {location.description && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="prose-story whitespace-pre-wrap">{location.description}</p>
            </section>
          )}

          {/* Rules */}
          {location.rules && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Rules & World-Building</h2>
              <p className="prose-story whitespace-pre-wrap">{location.rules}</p>
            </section>
          )}

          {/* Significance */}
          {location.significance && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Narrative Significance</h2>
              <p className="prose-story whitespace-pre-wrap">{location.significance}</p>
            </section>
          )}

          {/* Scenes at this location */}
          {location.scenes.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Scenes at this Location ({location.scenes.length})
              </h2>
              <div className="space-y-3">
                {location.scenes.map((scene) => (
                  <Link
                    key={scene.id}
                    href={`/chapters/${scene.chapter.id}`}
                    className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {scene.chapter.title || `Chapter ${scene.chapter.number}`} - Scene{' '}
                      {scene.sceneNumber}
                    </div>
                    {scene.description && (
                      <p className="text-sm text-gray-500 mt-1">{scene.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Events at this location */}
          {location.events.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Events Here ({location.events.length})
              </h2>
              <div className="space-y-3">
                {location.events.map((el) => (
                  <div key={el.id} className="p-3 rounded-lg bg-gray-50">
                    <div className="font-medium text-gray-900">{el.event.name}</div>
                    {el.event.timelineRef && (
                      <div className="text-xs text-gray-500 mt-1">{el.event.timelineRef}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* No events warning */}
          {location.events.length === 0 && location.scenes.length === 0 && (
            <section className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h2 className="text-sm font-semibold text-yellow-800 mb-2">Unused Location</h2>
              <p className="text-sm text-yellow-700">
                This location has no scenes or events linked to it. Consider if it's needed or
                where it fits in your story.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
