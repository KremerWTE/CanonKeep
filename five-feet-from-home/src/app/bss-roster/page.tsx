import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function BSSRosterPage() {
  // Get all characters with BSS roles
  const characters = await prisma.character.findMany({
    where: {
      OR: [
        { bssRole: { not: null } },
        { affiliationRole: { contains: 'BSS' } },
        { affiliationRole: { contains: 'Fixer' } },
        { affiliationRole: { contains: 'Operator' } },
        { affiliationRole: { contains: 'Strategist' } },
      ],
    },
    orderBy: { name: 'asc' },
  });

  // Group by role type
  const leadership = characters.filter((c) =>
    c.affiliationRole?.toLowerCase().includes('founder') ||
    c.affiliationRole?.toLowerCase().includes('ceo') ||
    c.affiliationRole?.toLowerCase().includes('managing') ||
    c.affiliationRole?.toLowerCase().includes('head')
  );

  const operators = characters.filter((c) =>
    c.affiliationRole?.toLowerCase().includes('operator') ||
    c.nickname?.toLowerCase().includes('hawk') ||
    c.name.toLowerCase().includes('ridge') ||
    c.affiliationRole?.toLowerCase().includes('fixer')
  );

  const strategists = characters.filter((c) =>
    c.affiliationRole?.toLowerCase().includes('strategist') ||
    c.affiliationRole?.toLowerCase().includes('analyst')
  );

  const support = characters.filter(
    (c) => !leadership.includes(c) && !operators.includes(c) && !strategists.includes(c)
  );

  const RosterSection = ({
    title,
    members,
    color,
  }: {
    title: string;
    members: typeof characters;
    color: string;
  }) => (
    <div className="mb-8">
      <h2 className={`text-xl font-bold mb-4 pb-2 border-b-2 ${color}`}>{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((person) => (
          <div key={person.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <Link href={`/characters/${person.id}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{person.name}</h3>
                  {person.nickname && (
                    <p className="text-sm text-gray-500">"{person.nickname}"</p>
                  )}
                </div>
                {person.hubLocation && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {person.hubLocation.split(';')[0].trim()}
                  </span>
                )}
              </div>

              {person.affiliationRole && (
                <p className="mt-2 text-blue-700 text-sm font-medium">
                  {person.affiliationRole}
                </p>
              )}

              {person.careerHistory && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {person.careerHistory}
                </p>
              )}

              {person.personality && (
                <p className="mt-2 text-gray-500 text-sm italic line-clamp-2">
                  {person.personality}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
      {members.length === 0 && (
        <p className="text-gray-500 italic">No staff in this category</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">BSS Staff Roster</h1>
            <p className="text-gray-600">Barrett Strategic Solutions - Complete Staff Directory</p>
          </div>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600">{characters.length}</div>
            <div className="text-gray-500">Total Staff</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-purple-600">{leadership.length}</div>
            <div className="text-gray-500">Leadership</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-red-600">{operators.length}</div>
            <div className="text-gray-500">Operators</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600">{strategists.length}</div>
            <div className="text-gray-500">Strategists</div>
          </div>
        </div>

        {/* Organization Chart Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Organization Structure</h2>
          <div className="font-mono text-sm bg-gray-50 p-4 rounded">
            <pre>{`
                    JASPER BARRETT
                    (Founder & CEO)
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ADDIE PRICE      HAWK (COLE)      HARPER
   (Managing Partner)  (Chief Ops)    (Sr. Strategist)
         │                │
    ┌────┴────┐      ┌────┴────┐
    │         │      │         │
 Strategists Analysts Ridge   Operators
                   (Asst Head)
            `}</pre>
          </div>
        </div>

        <RosterSection title="Leadership" members={leadership} color="border-purple-500" />
        <RosterSection title="Operators & Security" members={operators} color="border-red-500" />
        <RosterSection title="Strategists & Analysts" members={strategists} color="border-green-500" />
        <RosterSection title="Support Staff" members={support} color="border-gray-500" />

        {/* Locations */}
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <h2 className="text-xl font-bold mb-4">BSS Locations</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Charlotte HQ</h3>
              <p className="text-gray-600 text-sm">Primary headquarters, main operations center</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Washington D.C.</h3>
              <p className="text-gray-600 text-sm">Political affairs, government clients</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">New York</h3>
              <p className="text-gray-600 text-sm">Financial clients, media operations</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">London</h3>
              <p className="text-gray-600 text-sm">European operations</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Atlanta</h3>
              <p className="text-gray-600 text-sm">Southern operations hub</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Boston</h3>
              <p className="text-gray-600 text-sm">Northeast corridor support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
