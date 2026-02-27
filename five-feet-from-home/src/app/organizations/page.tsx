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

export default async function OrganizationsPage() {
  const orgs = await prisma.organization.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Organizations & Companies</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-4">
          {orgs.map((org) => {
            const leadership = safeParseArray(org.leadership);

            return (
              <div key={org.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold">{org.name}</h2>
                      {org.shortName && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                          {org.shortName}
                        </span>
                      )}
                    </div>
                    {org.type && (
                      <p className="text-gray-500 text-sm mt-1">{org.type}</p>
                    )}
                  </div>
                  <Link
                    href={`/organizations/${org.id}/edit`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {org.industry && (
                    <div>
                      <span className="font-medium text-gray-500">Industry:</span>
                      <p>{org.industry}</p>
                    </div>
                  )}
                  {org.headquarters && (
                    <div>
                      <span className="font-medium text-gray-500">HQ:</span>
                      <p>{org.headquarters}</p>
                    </div>
                  )}
                  {org.founder && (
                    <div>
                      <span className="font-medium text-gray-500">Founder:</span>
                      <p>{org.founder}</p>
                    </div>
                  )}
                </div>

                {org.description && (
                  <div className="mt-4">
                    <p className="text-gray-700">{org.description}</p>
                  </div>
                )}

                {org.services && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Services:</span>
                    <p className="text-gray-700">{org.services}</p>
                  </div>
                )}

                {leadership.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-500">Leadership:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {leadership.map((leader: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {leader}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {org.significance && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded">
                    <span className="font-medium text-yellow-700">Story Significance:</span>
                    <p className="text-yellow-800">{org.significance}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {orgs.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No organizations found. Run the import script to populate data.
          </div>
        )}
      </div>
    </div>
  );
}
