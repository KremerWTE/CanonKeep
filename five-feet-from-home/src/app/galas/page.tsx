import Link from 'next/link';
import { prisma } from '@/lib/db';

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

// Safe JSON parse for objects
function safeParseObject(str: string | null): Record<string, string> {
  if (!str) return {};
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export default async function GalasPage() {
  const galas = await prisma.gala.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Galas & Events</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/galas/fun-time" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-500">
              Fun Time
            </Link>
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {galas.map((gala) => {
            const attendees = safeParseArray(gala.attendees);
            const clothing = safeParseObject(gala.clothingDescriptions);

            return (
              <div key={gala.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{gala.name}</h2>
                    {gala.organization && (
                      <p className="text-gray-600">For: {gala.organization}</p>
                    )}
                  </div>
                  <Link
                    href={`/galas/${gala.id}/edit`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {gala.venue && (
                    <div>
                      <span className="font-medium text-gray-500">Venue:</span>
                      <p>{gala.venue}</p>
                    </div>
                  )}
                  {gala.location && (
                    <div>
                      <span className="font-medium text-gray-500">Location:</span>
                      <p>{gala.location}</p>
                    </div>
                  )}
                  {gala.purpose && (
                    <div>
                      <span className="font-medium text-gray-500">Purpose:</span>
                      <p>{gala.purpose}</p>
                    </div>
                  )}
                  {gala.dresscode && (
                    <div>
                      <span className="font-medium text-gray-500">Dress Code:</span>
                      <p>{gala.dresscode}</p>
                    </div>
                  )}
                </div>

                {gala.significance && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Story Significance:</span>
                    <p className="text-gray-700 whitespace-pre-line">{gala.significance}</p>
                  </div>
                )}

                {/* Before Activities */}
                {gala.beforeActivities && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <span className="font-medium text-blue-700">Before the Event:</span>
                    <p className="text-blue-800 whitespace-pre-line mt-1">{gala.beforeActivities}</p>
                  </div>
                )}

                {/* During the Gala */}
                {gala.events && (
                  <div className="mt-4 p-3 bg-purple-50 rounded">
                    <span className="font-medium text-purple-700">During the Gala (Networking, Dancing, Activities):</span>
                    <p className="text-purple-800 whitespace-pre-line mt-1">{gala.events}</p>
                  </div>
                )}

                {/* Clothing Descriptions */}
                {Object.keys(clothing).length > 0 && (
                  <div className="mt-4 p-3 bg-pink-50 rounded">
                    <span className="font-medium text-pink-700">Outfit Choices:</span>
                    <div className="mt-2 space-y-2">
                      {Object.entries(clothing).map(([person, outfit], i) => (
                        <div key={i} className="text-sm">
                          <span className="font-semibold text-pink-900">{person}:</span>
                          <span className="text-pink-800 ml-2">{outfit as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* After Activities */}
                {gala.afterActivities && (
                  <div className="mt-4 p-3 bg-amber-50 rounded">
                    <span className="font-medium text-amber-700">After the Event:</span>
                    <p className="text-amber-800 whitespace-pre-line mt-1">{gala.afterActivities}</p>
                  </div>
                )}

                {/* Next Morning */}
                {gala.nextMorning && (
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <span className="font-medium text-green-700">Next Morning:</span>
                    <p className="text-green-800 whitespace-pre-line mt-1">{gala.nextMorning}</p>
                  </div>
                )}

                {attendees.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Key Attendees:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {attendees.map((a: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {gala.bookAppearance && (
                  <div className="mt-4 text-sm text-gray-500">
                    Appears in: {gala.bookAppearance}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {galas.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No galas found. Run the import script to populate data.
          </div>
        )}
      </div>
    </div>
  );
}
