import Link from 'next/link';
import prisma from '@/lib/db';

async function getVixens() {
  // Get all characters who are part of the Sirens Network
  return prisma.character.findMany({
    where: {
      OR: [
        { clubsAssociations: { contains: 'Sirens' } },
        { clubsAssociations: { contains: 'Vixens' } },
        { archetype: { contains: 'Siren' } },
      ],
    },
    orderBy: { name: 'asc' },
  });
}

async function getSelene() {
  return prisma.character.findFirst({
    where: { firstName: 'Selene' },
  });
}

async function getSirensOrg() {
  return prisma.organization.findFirst({
    where: { name: { contains: 'Sirens' } },
  });
}

async function getSeleneSeries() {
  return prisma.bookSeries.findFirst({
    where: { name: 'Midnight Sun' },
  });
}

async function getSirensStorylines() {
  return prisma.storyline.findMany({
    where: {
      OR: [
        { title: { contains: 'Siren' } },
        { title: { contains: 'Vixen' } },
        { category: { contains: 'Sirens' } },
        { title: { contains: 'Selene' } },
      ],
    },
    orderBy: { title: 'asc' },
  });
}

// Helper to check if character belongs to a division
function isDivision(v: any, keywords: string[]): boolean {
  const archetype = v.archetype?.toLowerCase() || '';
  const clubs = v.clubsAssociations?.toLowerCase() || '';
  return keywords.some(k => archetype.includes(k.toLowerCase()) || clubs.includes(k.toLowerCase()));
}

export default async function VixensPage() {
  const vixens = await getVixens();
  const selene = await getSelene();
  const sirensOrg = await getSirensOrg();
  const seleneSeries = await getSeleneSeries();
  const storylines = await getSirensStorylines();

  // Parse books from Selene series
  let books: any[] = [];
  if (seleneSeries?.books) {
    try {
      books = JSON.parse(seleneSeries.books);
    } catch {}
  }

  // Filter out Selene from divisions (she's shown separately)
  const allSirens = vixens.filter(v => v.firstName !== 'Selene');

  // Categorize by division
  const milfDivision = allSirens.filter(v =>
    isDivision(v, ['MILF', 'Matriarch', 'Professor', 'Hedonist', 'Ice Queen', 'Comfort Fantasy', 'Secret Life', 'Crazy Teacher'])
  );

  const wnbaDivision = allSirens.filter(v =>
    isDivision(v, ['WNBA', 'Athletic', 'Amazon', 'Sharpshooter', 'Playmaker'])
  );

  const influencerDivision = allSirens.filter(v =>
    isDivision(v, ['Influencer', 'Country Queen', 'Towball', 'Instagram', 'Sports Media', 'Playful Tease', 'Disney', 'Twin Fantasy', 'Blossoming'])
  );

  const internationalDivision = allSirens.filter(v =>
    isDivision(v, ['European', 'Italian', 'Bohemian', 'Exotic', 'International']) &&
    !isDivision(v, ['MILF', 'WNBA', 'Influencer'])
  );

  const chaosDivision = allSirens.filter(v =>
    isDivision(v, ['Chaos', 'Shock', 'Wild Card'])
  );

  const bombshellsDivision = allSirens.filter(v =>
    isDivision(v, ['Bombshell', 'Powerhouse', 'Cam Queen', 'Digital']) &&
    !isDivision(v, ['MILF', 'WNBA', 'Influencer', 'European', 'Italian'])
  );

  const specialAssets = allSirens.filter(v =>
    isDivision(v, ['Trophy', 'Gatekeeper', 'Madam', 'Southern Power'])
  );

  // Core/Young Division - everyone not in other divisions
  const assignedIds = new Set([
    ...milfDivision.map(v => v.id),
    ...wnbaDivision.map(v => v.id),
    ...influencerDivision.map(v => v.id),
    ...internationalDivision.map(v => v.id),
    ...chaosDivision.map(v => v.id),
    ...bombshellsDivision.map(v => v.id),
    ...specialAssets.map(v => v.id),
  ]);

  const coreDivision = allSirens.filter(v => !assignedIds.has(v.id));

  // Division component
  const DivisionSection = ({
    title,
    color,
    members,
    textColor = 'text-gray-600'
  }: {
    title: string;
    color: string;
    members: any[];
    textColor?: string;
  }) => {
    if (members.length === 0) return null;
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${color}`}></span>
          {title}
          <span className="text-sm font-normal text-gray-500">({members.length})</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((siren) => (
            <Link
              key={siren.id}
              href={`/characters/${siren.id}`}
              className="p-4 rounded-lg border card-hover"
            >
              <h3 className="font-semibold text-gray-900">{siren.name}</h3>
              {siren.nickname && (
                <span className={`text-sm ${textColor}`}>Stage: {siren.nickname}</span>
              )}
              {siren.archetype && (
                <p className="text-sm text-gray-600 mt-1">{siren.archetype}</p>
              )}
              {siren.modeledAfter && (
                <p className="text-xs text-gray-500 mt-2">Modeled after: {siren.modeledAfter}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">The Sirens Network (Vixens)</h1>
        <p className="mt-2 text-purple-100">
          Selene&apos;s shadow sisterhood of cam stars, adult performers, and influencers -
          seductive, dangerous, and capable of moving between worlds.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">{vixens.length} Members</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">8 Divisions</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">{storylines.length} Storylines</span>
          {books.length > 0 && (
            <span className="bg-white/20 px-3 py-1 rounded-full">{books.length} Books</span>
          )}
        </div>
      </div>

      {/* Selene - Network Leader */}
      {selene && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Network Founder</h2>
          <Link href={`/characters/${selene.id}`} className="block card-hover p-4 rounded-lg border-2 border-purple-200 bg-purple-50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-900">{selene.name}</h3>
                {selene.archetype && (
                  <span className="text-sm text-purple-700">{selene.archetype}</span>
                )}
              </div>
              <span className="badge badge-purple">Founder</span>
            </div>
            {selene.background && (
              <p className="mt-3 text-sm text-gray-600 line-clamp-3">{selene.background}</p>
            )}
          </Link>
        </div>
      )}

      {/* All Divisions */}
      <div className="space-y-6">
        <DivisionSection
          title="Core Division (Original Cam Stars)"
          color="bg-pink-500"
          members={coreDivision}
          textColor="text-pink-600"
        />

        <DivisionSection
          title="MILF Division"
          color="bg-purple-500"
          members={milfDivision}
          textColor="text-purple-600"
        />

        <DivisionSection
          title="WNBA Division (Athletic Sirens)"
          color="bg-orange-500"
          members={wnbaDivision}
          textColor="text-orange-600"
        />

        <DivisionSection
          title="Influencer Division"
          color="bg-blue-500"
          members={influencerDivision}
          textColor="text-blue-600"
        />

        <DivisionSection
          title="International Division"
          color="bg-emerald-500"
          members={internationalDivision}
          textColor="text-emerald-600"
        />

        <DivisionSection
          title="Bombshells Division"
          color="bg-rose-500"
          members={bombshellsDivision}
          textColor="text-rose-600"
        />

        <DivisionSection
          title="Chaos Division"
          color="bg-red-500"
          members={chaosDivision}
          textColor="text-red-600"
        />

        <DivisionSection
          title="Special Assets"
          color="bg-yellow-500"
          members={specialAssets}
          textColor="text-yellow-600"
        />
      </div>

      {/* Organization Details */}
      {sirensOrg && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Organization Details</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-medium text-gray-900">Type</h4>
              <p className="text-gray-600">{sirensOrg.type}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Industry</h4>
              <p className="text-gray-600">{sirensOrg.industry}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Headquarters</h4>
              <p className="text-gray-600">{sirensOrg.headquarters}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Services</h4>
              <p className="text-gray-600">{sirensOrg.services}</p>
            </div>
          </div>
        </div>
      )}

      {/* Book Series */}
      {seleneSeries && books.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Midnight Sun Series</h2>
          <p className="text-gray-600 mb-4">{seleneSeries.premise?.substring(0, 300)}...</p>
          <div className="grid gap-4 md:grid-cols-3">
            {books.map((book: any, index: number) => (
              <div key={index} className="p-4 rounded-lg border bg-gray-50">
                <h3 className="font-semibold text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{book.synopsis}</p>
                {book.chapters && (
                  <p className="text-xs text-gray-500 mt-2">{book.chapters.length} chapters</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storylines */}
      {storylines.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Storylines</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {storylines.map((storyline) => (
              <div key={storyline.id} className="p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900">{storyline.title}</h3>
                {storyline.category && (
                  <span className="badge badge-purple mt-1">{storyline.category}</span>
                )}
                {storyline.description && (
                  <p className="text-sm text-gray-600 mt-2">{storyline.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
