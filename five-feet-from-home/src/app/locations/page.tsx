import Link from 'next/link';
import prisma from '@/lib/db';

async function getLocations() {
  return prisma.location.findMany({
    include: {
      project: true,
      events: {
        include: { event: true },
      },
      scenes: {
        include: { chapter: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <p className="mt-1 text-gray-600">
          {locations.length} location{locations.length !== 1 ? 's' : ''} in your story world
        </p>
      </div>

      {locations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">
            No locations found. Import documents with location definitions to populate this page.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={`/locations/${location.id}`}
              className="bg-white rounded-lg shadow-sm border p-4 card-hover"
            >
              <h3 className="font-semibold text-gray-900">{location.name}</h3>

              {location.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {location.description}
                </p>
              )}

              {location.significance && (
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Significance:</strong> {location.significance}
                </p>
              )}

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                {location.events.length > 0 && (
                  <span>
                    {location.events.length} event{location.events.length !== 1 ? 's' : ''}
                  </span>
                )}
                {location.scenes.length > 0 && (
                  <span>
                    {location.scenes.length} scene{location.scenes.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
