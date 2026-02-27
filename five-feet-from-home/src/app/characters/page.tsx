import Link from 'next/link';
import prisma from '@/lib/db';

async function getCharacters() {
  const characters = await prisma.character.findMany({
    include: {
      project: true,
      relationshipsFrom: {
        include: { toCharacter: true },
      },
      chapterAppearances: true,
    },
  });

  // Sort by lastName, with blanks/nulls at the bottom
  return characters.sort((a, b) => {
    const lastNameA = a.lastName?.trim() || '';
    const lastNameB = b.lastName?.trim() || '';

    // Both have lastName - sort alphabetically
    if (lastNameA && lastNameB) {
      return lastNameA.localeCompare(lastNameB);
    }
    // A has lastName, B doesn't - A comes first
    if (lastNameA && !lastNameB) {
      return -1;
    }
    // B has lastName, A doesn't - B comes first
    if (!lastNameA && lastNameB) {
      return 1;
    }
    // Neither has lastName - sort by firstName or name
    const firstNameA = a.firstName?.trim() || a.name || '';
    const firstNameB = b.firstName?.trim() || b.name || '';
    return firstNameA.localeCompare(firstNameB);
  });
}

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Characters</h1>
          <p className="mt-1 text-gray-600">
            {characters.length} character{characters.length !== 1 ? 's' : ''} in your story
          </p>
        </div>
      </div>

      {characters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">
            No characters found. Import documents with character definitions to populate this page.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="bg-white rounded-lg shadow-sm border p-4 card-hover"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {character.lastName ? (
                      <>{character.lastName}, {character.firstName || character.name.split(' ')[0]}</>
                    ) : (
                      character.name
                    )}
                  </h3>
                  {!character.lastName && (
                    <span className="text-xs text-gray-400">(No last name)</span>
                  )}
                  {character.archetype && (
                    <span className="badge badge-purple mt-1">{character.archetype}</span>
                  )}
                </div>
                {character.age && (
                  <span className="text-sm text-gray-500">Age: {character.age}</span>
                )}
              </div>

              {character.background && (
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {character.background}
                </p>
              )}

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                {character.relationshipsFrom.length > 0 && (
                  <span>{character.relationshipsFrom.length} relationship{character.relationshipsFrom.length !== 1 ? 's' : ''}</span>
                )}
                {character.chapterAppearances.length > 0 && (
                  <span>In {character.chapterAppearances.length} chapter{character.chapterAppearances.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              {/* Quick tags for key attributes */}
              <div className="mt-3 flex flex-wrap gap-1">
                {character.motivations && <span className="badge badge-green">Has motivation</span>}
                {character.fears && <span className="badge badge-yellow">Has fears</span>}
                {character.secrets && <span className="badge badge-red">Has secrets</span>}
                {!character.motivations && !character.fears && (
                  <span className="badge badge-gray">Needs development</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
