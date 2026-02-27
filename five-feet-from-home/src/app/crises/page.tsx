import Link from 'next/link';
import { prisma } from '@/lib/db';

// Safe JSON parse that handles both JSON arrays and plain strings
function safeParseArray(str: string | null): string[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [str];
  } catch {
    // Not valid JSON - treat as comma-separated string
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }
}

export default async function CrisesPage() {
  const crises = await prisma.crisis.findMany({
    orderBy: { name: 'asc' },
  });

  const severityColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crises & Cases</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-4">
          {crises.map((crisis) => {
            const team = safeParseArray(crisis.bssTeam);

            return (
              <div key={crisis.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold">{crisis.name}</h2>
                      {crisis.severity && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${severityColors[crisis.severity] || 'bg-gray-100'}`}>
                          {crisis.severity.toUpperCase()}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${crisis.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {crisis.status}
                      </span>
                    </div>
                    {crisis.codeName && (
                      <p className="text-gray-500 text-sm mt-1">Code Name: {crisis.codeName}</p>
                    )}
                  </div>
                  <Link
                    href={`/crises/${crisis.id}/edit`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {crisis.clientName && (
                    <div>
                      <span className="font-medium text-gray-500">Client:</span>
                      <p>{crisis.clientName}</p>
                    </div>
                  )}
                  {crisis.clientType && (
                    <div>
                      <span className="font-medium text-gray-500">Client Type:</span>
                      <p>{crisis.clientType}</p>
                    </div>
                  )}
                  {crisis.crisisType && (
                    <div>
                      <span className="font-medium text-gray-500">Crisis Type:</span>
                      <p>{crisis.crisisType}</p>
                    </div>
                  )}
                  {crisis.location && (
                    <div>
                      <span className="font-medium text-gray-500">Location:</span>
                      <p>{crisis.location}</p>
                    </div>
                  )}
                </div>

                {crisis.description && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Description:</span>
                    <p className="text-gray-700">{crisis.description}</p>
                  </div>
                )}

                {crisis.situation && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Initial Situation:</span>
                    <p className="text-gray-700">{crisis.situation}</p>
                  </div>
                )}

                {crisis.complications && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Complications:</span>
                    <p className="text-gray-700">{crisis.complications}</p>
                  </div>
                )}

                {crisis.stakes && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Stakes:</span>
                    <p className="text-gray-700">{crisis.stakes}</p>
                  </div>
                )}

                {crisis.resolution && (
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <span className="font-medium text-green-700">Resolution:</span>
                    <p className="text-green-800">{crisis.resolution}</p>
                  </div>
                )}

                {team.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">BSS Team:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {team.map((member: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {crisis.bookAppearance && (
                  <div className="mt-4 text-sm text-gray-500">
                    Appears in: {crisis.bookAppearance}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {crises.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No crises found. Run the import script to populate data.
          </div>
        )}
      </div>
    </div>
  );
}
