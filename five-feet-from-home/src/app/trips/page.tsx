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

export default async function TripsPage() {
  const trips = await prisma.businessTrip.findMany({
    orderBy: { tripOrder: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Business Trips</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-4">
          {trips.map((trip, index) => {
            const companions = safeParseArray(trip.companions);

            return (
              <div key={trip.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {trip.tripOrder || index + 1}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{trip.name}</h2>
                      <p className="text-gray-600">
                        {trip.traveler} → {trip.destination}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/trips/${trip.id}/edit`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {trip.origin && (
                    <div>
                      <span className="font-medium text-gray-500">From:</span>
                      <p>{trip.origin}</p>
                    </div>
                  )}
                  {trip.destination && (
                    <div>
                      <span className="font-medium text-gray-500">To:</span>
                      <p>{trip.destination}</p>
                    </div>
                  )}
                  {trip.duration && (
                    <div>
                      <span className="font-medium text-gray-500">Duration:</span>
                      <p>{trip.duration}</p>
                    </div>
                  )}
                  {trip.timeframe && (
                    <div>
                      <span className="font-medium text-gray-500">Timeline:</span>
                      <p>{trip.timeframe}</p>
                    </div>
                  )}
                </div>

                {trip.purpose && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Purpose:</span>
                    <p className="text-gray-700">{trip.purpose}</p>
                  </div>
                )}

                {trip.crisisName && (
                  <div className="mt-2">
                    <span className="font-medium text-gray-500">Related Crisis:</span>
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                      {trip.crisisName}
                    </span>
                  </div>
                )}

                {trip.storyEvents && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Story Events:</span>
                    <p className="text-gray-700">{trip.storyEvents}</p>
                  </div>
                )}

                {trip.homeImpact && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Impact on Home:</span>
                    <p className="text-gray-700">{trip.homeImpact}</p>
                  </div>
                )}

                {companions.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Companions:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {companions.map((c: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {trip.bookAppearance && (
                  <div className="mt-4 text-sm text-gray-500">
                    Appears in: {trip.bookAppearance}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {trips.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No business trips found. Run the import script to populate data.
          </div>
        )}
      </div>
    </div>
  );
}
