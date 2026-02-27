import Link from 'next/link';
import prisma from '@/lib/db';

async function getEvents() {
  return prisma.event.findMany({
    include: {
      project: true,
      characters: {
        include: { character: true },
      },
      locations: {
        include: { location: true },
      },
      chapters: {
        include: { chapter: true },
      },
    },
    orderBy: [{ timelineSort: 'asc' }, { createdAt: 'asc' }],
  });
}

export default async function TimelinePage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Timeline</h1>
          <p className="mt-1 text-gray-600">
            {events.length} event{events.length !== 1 ? 's' : ''} in chronological order
          </p>
        </div>
        <Link
          href="/timeline/backstories"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          View Character Backstories
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">
            No events found. Import documents with timeline or event information to populate this page.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary-500 border-2 border-white shadow" />

                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.name}</h3>
                      {event.timelineRef && (
                        <span className="text-sm text-gray-500">{event.timelineRef}</span>
                      )}
                    </div>
                    {event.timelineSort !== null && (
                      <span className="badge badge-gray">#{event.timelineSort}</span>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  )}

                  {event.consequences && (
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>Consequences:</strong> {event.consequences}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    {event.characters.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Who:</span>
                        <div className="flex gap-1 flex-wrap">
                          {event.characters.map((ec) => (
                            <Link
                              key={ec.id}
                              href={`/characters/${ec.character.id}`}
                              className="badge badge-blue hover:bg-blue-200"
                            >
                              {ec.character.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.locations.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Where:</span>
                        <div className="flex gap-1 flex-wrap">
                          {event.locations.map((el) => (
                            <Link
                              key={el.id}
                              href={`/locations/${el.location.id}`}
                              className="badge badge-green hover:bg-green-200"
                            >
                              {el.location.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.chapters.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">In chapters:</span>
                        <div className="flex gap-1 flex-wrap">
                          {event.chapters.map((ec) => (
                            <Link
                              key={ec.id}
                              href={`/chapters/${ec.chapter.id}`}
                              className="badge badge-purple hover:bg-purple-200"
                            >
                              {ec.chapter.title || `Ch ${ec.chapter.number}`}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
