import Link from 'next/link';
import prisma from '@/lib/db';

async function getStats() {
  const [
    projects,
    characters,
    chapters,
    plotThreads,
    events,
    locations,
    conflicts,
    documents,
    crises,
    organizations,
    galas,
    trips,
    series,
  ] = await Promise.all([
    prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
    }),
    prisma.character.count(),
    prisma.chapter.count(),
    prisma.plotThread.count(),
    prisma.event.count(),
    prisma.location.count(),
    prisma.conflict.count({ where: { resolved: false } }),
    prisma.document.count(),
    prisma.crisis.count(),
    prisma.organization.count(),
    prisma.gala.count(),
    prisma.businessTrip.count(),
    prisma.bookSeries.count(),
  ]);

  return {
    projects,
    counts: {
      characters,
      chapters,
      plotThreads,
      events,
      locations,
      conflicts,
      documents,
      crises,
      organizations,
      galas,
      trips,
      series,
    },
  };
}

export default async function HomePage() {
  const { projects, counts } = await getStats();

  const statCards = [
    { label: 'Characters', count: counts.characters, href: '/characters', color: 'bg-blue-500' },
    { label: 'Chapters', count: counts.chapters, href: '/chapters', color: 'bg-green-500' },
    { label: 'Plot Threads', count: counts.plotThreads, href: '/plots', color: 'bg-purple-500' },
    { label: 'Events', count: counts.events, href: '/timeline', color: 'bg-orange-500' },
    { label: 'Locations', count: counts.locations, href: '/locations', color: 'bg-teal-500' },
    { label: 'Documents', count: counts.documents, href: '#', color: 'bg-gray-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your story content and narrative elements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg shadow-sm border p-4 card-hover"
          >
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-white font-bold">{stat.count}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Conflicts Alert */}
      {counts.conflicts > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-yellow-800 font-medium">
              {counts.conflicts} unresolved continuity issue{counts.conflicts !== 1 ? 's' : ''} found
            </span>
            <Link
              href="/continuity"
              className="ml-auto text-yellow-700 hover:text-yellow-900 font-medium text-sm"
            >
              Review Issues →
            </Link>
          </div>
        </div>
      )}

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h2>
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <p className="text-gray-500 mb-4">No projects yet. Run the ingest command to get started.</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-left inline-block">
              npm run ingest
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm border p-4 card-hover"
              >
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Grid */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Story Elements</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          <Link href="/characters" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{counts.characters}</div>
            <p className="text-xs sm:text-sm text-gray-600">Characters</p>
          </Link>
          <Link href="/bss-roster" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl">🏢</div>
            <p className="text-xs sm:text-sm text-gray-600">BSS Roster</p>
          </Link>
          <Link href="/wives-club" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl">👑</div>
            <p className="text-xs sm:text-sm text-gray-600">Wives Club</p>
          </Link>
          <Link href="/crises" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-red-600">{counts.crises}</div>
            <p className="text-xs sm:text-sm text-gray-600">Crises</p>
          </Link>
          <Link href="/organizations" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">{counts.organizations}</div>
            <p className="text-xs sm:text-sm text-gray-600">Organizations</p>
          </Link>
          <Link href="/galas" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-pink-600">{counts.galas}</div>
            <p className="text-xs sm:text-sm text-gray-600">Galas</p>
          </Link>
          <Link href="/trips" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-teal-600">{counts.trips}</div>
            <p className="text-xs sm:text-sm text-gray-600">Business Trips</p>
          </Link>
          <Link href="/series" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-indigo-600">{counts.series}</div>
            <p className="text-xs sm:text-sm text-gray-600">Book Series</p>
          </Link>
          <Link href="/chapters" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{counts.chapters}</div>
            <p className="text-xs sm:text-sm text-gray-600">Chapters</p>
          </Link>
          <Link href="/plots" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">{counts.plotThreads}</div>
            <p className="text-xs sm:text-sm text-gray-600">Plot Threads</p>
          </Link>
          <Link href="/timeline" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-orange-600">{counts.events}</div>
            <p className="text-xs sm:text-sm text-gray-600">Timeline</p>
          </Link>
          <Link href="/locations" className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 card-hover text-center">
            <div className="text-lg sm:text-2xl font-bold text-teal-600">{counts.locations}</div>
            <p className="text-xs sm:text-sm text-gray-600">Locations</p>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/search"
            className="bg-white rounded-lg shadow-sm border p-4 card-hover flex items-center"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Search</p>
              <p className="text-sm text-gray-500">Find anything</p>
            </div>
          </Link>

          <Link
            href="/character-search"
            className="bg-white rounded-lg shadow-sm border p-4 card-hover flex items-center"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Character Search</p>
              <p className="text-sm text-gray-500">Search documents</p>
            </div>
          </Link>

          <Link
            href="/builder"
            className="bg-white rounded-lg shadow-sm border p-4 card-hover flex items-center"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Book Builder</p>
              <p className="text-sm text-gray-500">Assemble manuscript</p>
            </div>
          </Link>

          <Link
            href="/continuity"
            className="bg-white rounded-lg shadow-sm border p-4 card-hover flex items-center"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Continuity</p>
              <p className="text-sm text-gray-500">Review conflicts</p>
            </div>
          </Link>

          <Link
            href="/timeline/backstories"
            className="bg-white rounded-lg shadow-sm border p-4 card-hover flex items-center"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Backstories</p>
              <p className="text-sm text-gray-500">Character timelines</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
