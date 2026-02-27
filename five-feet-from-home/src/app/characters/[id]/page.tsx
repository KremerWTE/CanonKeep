import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import CopyButton from '@/components/CopyButton';
import GeneratePortraitButton from '@/components/GeneratePortraitButton';

interface Props {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string) {
  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      project: true,
      relationshipsFrom: {
        include: { toCharacter: true },
      },
      relationshipsTo: {
        include: { fromCharacter: true },
      },
      chapterAppearances: {
        include: { chapter: true },
      },
      plotInvolvements: {
        include: { plotThread: true },
      },
    },
  });

  if (!character) return null;

  // Get provenance
  const provenance = await prisma.provenance.findMany({
    where: { entityType: 'character', entityId: id },
    include: { block: { include: { document: true } } },
  });

  // Find characters with same modeledAfter (lookalike conflicts)
  let lookalikeConflicts: { id: string; name: string; modeledAfter: string | null }[] = [];
  if (character.modeledAfter) {
    const keywords = character.modeledAfter.split(/[+,\/]/).map(s => s.trim().toLowerCase()).filter(s => s.length > 3);
    if (keywords.length > 0) {
      const allChars = await prisma.character.findMany({
        where: {
          modeledAfter: { not: null },
          id: { not: character.id }
        },
        select: { id: true, name: true, modeledAfter: true }
      });
      lookalikeConflicts = allChars.filter(c => {
        const otherKeywords = c.modeledAfter?.toLowerCase() || '';
        return keywords.some(k => otherKeywords.includes(k));
      });
    }
  }

  return { character, provenance, lookalikeConflicts };
}

// Generate AI image prompt from character data
function generateImagePrompt(character: {
  name: string;
  modeledAfter?: string | null;
  physicalDescription?: string | null;
  appearance?: string | null;
  wardrobeStyle?: string | null;
  age?: string | null;
  archetype?: string | null;
}): string {
  const parts: string[] = [];

  // Start with base description
  parts.push('Professional portrait photograph');

  // Use modeledAfter for inspiration
  if (character.modeledAfter) {
    // Extract key descriptors from modeledAfter (not the celebrity names themselves)
    const modelInfo = character.modeledAfter.toLowerCase();
    if (modelInfo.includes('blonde')) parts.push('blonde hair');
    if (modelInfo.includes('brunette') || modelInfo.includes('brown')) parts.push('brown hair');
    if (modelInfo.includes('red') || modelInfo.includes('auburn')) parts.push('auburn/red hair');
    if (modelInfo.includes('black hair')) parts.push('black hair');
    if (modelInfo.includes('athletic')) parts.push('athletic build');
    if (modelInfo.includes('elegant') || modelInfo.includes('refined')) parts.push('elegant appearance');
  }

  // Add physical description
  if (character.physicalDescription) {
    const desc = character.physicalDescription.slice(0, 200); // Limit length
    parts.push(desc);
  } else if (character.appearance) {
    const desc = character.appearance.slice(0, 200);
    parts.push(desc);
  }

  // Add style/wardrobe hints
  if (character.wardrobeStyle) {
    const styleWords = character.wardrobeStyle.slice(0, 100);
    parts.push(`wearing ${styleWords}`);
  }

  // Add age context
  if (character.age) {
    parts.push(`${character.age} years old`);
  }

  // Add archetype vibe
  if (character.archetype) {
    parts.push(`${character.archetype.toLowerCase()} personality`);
  }

  // Add quality markers
  parts.push('high quality, professional lighting, detailed, realistic');

  return parts.filter(Boolean).join(', ');
}

// Parse relationships string into structured format
function parseRelationships(relationshipsStr: string | null): { name: string; type: string }[] {
  if (!relationshipsStr) return [];

  const relationships: { name: string; type: string }[] = [];
  const parts = relationshipsStr.split(/[,;]/).map(s => s.trim()).filter(Boolean);

  for (const part of parts) {
    // Try to extract "X of Y" patterns
    const ofMatch = part.match(/^(.+?)\s+of\s+(.+)$/i);
    if (ofMatch) {
      relationships.push({ type: ofMatch[1], name: ofMatch[2] });
      continue;
    }
    // Try "X's Y" patterns
    const possMatch = part.match(/^(.+?)'s\s+(.+)$/i);
    if (possMatch) {
      relationships.push({ type: possMatch[2], name: possMatch[1] });
      continue;
    }
    // Default: use whole thing
    relationships.push({ type: 'Connected to', name: part });
  }

  return relationships;
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;
  const data = await getCharacter(id);

  if (!data) {
    notFound();
  }

  const { character, provenance, lookalikeConflicts } = data;
  const parsedRelationships = parseRelationships(character.relationships);

  // Combine DB relationships
  const dbRelationships = [
    ...character.relationshipsFrom.map((r) => ({
      otherCharacter: r.toCharacter,
      type: r.relationshipType,
    })),
    ...character.relationshipsTo.map((r) => ({
      otherCharacter: r.fromCharacter,
      type: r.relationshipType,
    })),
  ];

  return (
    <div className="space-y-8">
      {/* Header with Portrait */}
      <div className="flex items-start gap-6">
        {/* Portrait Section */}
        <div className="flex-shrink-0 w-48">
          <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 aspect-square relative">
            {character.portraitUrl ? (
              <img
                src={character.portraitUrl}
                alt={`Portrait of ${character.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-3">
            <GeneratePortraitButton
              characterId={character.id}
              hasExistingPortrait={!!character.portraitUrl}
            />
          </div>
        </div>

        {/* Character Info */}
        <div className="flex-1">
          <Link href="/characters" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
            ← Back to Characters
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{character.name}</h1>
          {character.nickname && (
            <p className="text-xl text-gray-600 mt-1">"{character.nickname}"</p>
          )}
          {/* Network Color Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {character.archetype && <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">{character.archetype}</span>}

            {/* BSS Employee - Blue */}
            {character.bssRole && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                BSS: {character.bssRole}
              </span>
            )}

            {/* Wives Club - Pink/Rose */}
            {character.wivesClubRole && (
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                Wives Club: {character.wivesClubRole}
              </span>
            )}

            {/* Maison Aurelia - Purple */}
            {character.maisonAureliaRole && (
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                Maison Aurelia: {character.maisonAureliaRole}
              </span>
            )}

            {/* POH - Gold/Amber */}
            {character.pohRole && (
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                POH: {character.pohRole}
              </span>
            )}

            {/* Sport Athlete - Green */}
            {character.fitnessSports && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                Athlete: {character.fitnessSports.split(',')[0]}
              </span>
            )}

            {/* BSS Client - Teal */}
            {character.affiliationRole?.toLowerCase().includes('client') && (
              <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                BSS Client
              </span>
            )}

            {/* Cam Star Network - Red/Crimson */}
            {(character.affiliationRole?.toLowerCase().includes('cam') || character.affiliationRole?.toLowerCase().includes('adult')) && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                Cam Star Network
              </span>
            )}
          </div>
        </div>

        <Link href={`/characters/${id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-shrink-0">
          Edit
        </Link>
      </div>

      {/* Lookalike Conflict Warning */}
      {lookalikeConflicts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Lookalike Conflict Detected
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            Other characters share similar model/inspiration references:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {lookalikeConflicts.map(c => (
              <Link key={c.id} href={`/characters/${c.id}`} className="text-sm bg-yellow-100 px-2 py-1 rounded hover:bg-yellow-200">
                {c.name} ({c.modeledAfter})
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Card */}
          <section className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Identity</h2>
            <div className="grid grid-cols-2 gap-4">
              {character.title && <div><span className="text-sm text-gray-500">Title:</span> <span className="font-medium">{character.title}</span></div>}
              {character.firstName && <div><span className="text-sm text-gray-500">First Name:</span> <span className="font-medium">{character.firstName}</span></div>}
              {character.lastName && <div><span className="text-sm text-gray-500">Last Name:</span> <span className="font-medium">{character.lastName}</span></div>}
              {character.nickname && <div><span className="text-sm text-gray-500">Nickname/Call-sign:</span> <span className="font-medium">{character.nickname}</span></div>}
              {character.aliases && <div><span className="text-sm text-gray-500">Aliases:</span> <span className="font-medium">{character.aliases}</span></div>}
              {character.nameVariants && <div><span className="text-sm text-gray-500">Name Variants:</span> <span className="font-medium">{character.nameVariants}</span></div>}
              {character.age && <div><span className="text-sm text-gray-500">Age:</span> <span className="font-medium">{character.age}</span></div>}
              {character.hubLocation && <div><span className="text-sm text-gray-500">Hub/Location:</span> <span className="font-medium">{character.hubLocation}</span></div>}
            </div>
          </section>

          {/* Model/Inspiration - Prominent placement */}
          {character.modeledAfter && (
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300 p-6">
              <h2 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Modeled After / Lookalike
              </h2>
              <p className="text-lg text-purple-800 font-medium">{character.modeledAfter}</p>
            </section>
          )}

          {/* Roles & Affiliations */}
          <section className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Roles & Affiliations</h2>
            <div className="grid grid-cols-2 gap-4">
              {character.bssRole && <div><span className="text-sm text-gray-500">BSS Role:</span> <span className="font-medium">{character.bssRole}</span></div>}
              {character.wivesClubRole && <div><span className="text-sm text-gray-500">Wives Club:</span> <span className="font-medium">{character.wivesClubRole}</span></div>}
              {character.maisonAureliaRole && <div><span className="text-sm text-gray-500">Maison Aurelia:</span> <span className="font-medium">{character.maisonAureliaRole}</span></div>}
              {character.pohRole && <div><span className="text-sm text-gray-500">POH:</span> <span className="font-medium">{character.pohRole}</span></div>}
              {character.affiliationRole && <div className="col-span-2"><span className="text-sm text-gray-500">Affiliation/Role:</span> <span className="font-medium">{character.affiliationRole}</span></div>}
            </div>
          </section>

          {/* Background & Career */}
          {(character.background || character.education || character.careerHistory) && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Background & Career</h2>
              {character.education && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Education</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{character.education}</p>
                </div>
              )}
              {character.careerHistory && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Career History</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{character.careerHistory}</p>
                </div>
              )}
              {character.background && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Background</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{character.background}</p>
                </div>
              )}
            </section>
          )}

          {/* Personality */}
          {character.personality && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Personality</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{character.personality}</p>
            </section>
          )}

          {/* Physical Description */}
          {(character.appearance || character.wardrobeStyle || character.fitnessSports) && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Physical</h2>
              {character.appearance && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Appearance</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{character.appearance}</p>
                </div>
              )}
              {character.wardrobeStyle && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Wardrobe & Style</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{character.wardrobeStyle}</p>
                </div>
              )}
              {character.fitnessSports && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Fitness & Sports</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{character.fitnessSports}</p>
                </div>
              )}
            </section>
          )}

          {/* AI Image Generation Prompt */}
          <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6">
            <h2 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              AI Image Prompt
            </h2>
            <p className="text-xs text-indigo-600 mb-2">Copy this prompt to use with DALL-E, Midjourney, or other AI image generators:</p>
            <div className="relative">
              <pre className="text-sm bg-white p-4 rounded-lg border border-indigo-100 whitespace-pre-wrap text-gray-700 font-mono">
                {generateImagePrompt(character)}
              </pre>
              <CopyButton text={generateImagePrompt(character)} className="absolute top-2 right-2" />
            </div>
            <p className="text-xs text-indigo-500 mt-2">
              Based on: {[
                character.modeledAfter && 'modeledAfter',
                character.appearance && 'appearance',
                character.wardrobeStyle && 'style',
                character.age && 'age',
                character.archetype && 'archetype'
              ].filter(Boolean).join(', ') || 'basic description'}
            </p>
          </section>

          {/* Character Arc */}
          {(character.arcStart || character.arcChange || character.arcEnd) && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Character Arc</h2>
              <div className="space-y-4">
                {character.arcStart && <div><h3 className="text-sm font-medium text-gray-700">Starting Point</h3><p className="text-gray-600 mt-1">{character.arcStart}</p></div>}
                {character.arcChange && <div><h3 className="text-sm font-medium text-gray-700">Change/Growth</h3><p className="text-gray-600 mt-1">{character.arcChange}</p></div>}
                {character.arcEnd && <div><h3 className="text-sm font-medium text-gray-700">End State</h3><p className="text-gray-600 mt-1">{character.arcEnd}</p></div>}
              </div>
            </section>
          )}

          {/* Additional Details */}
          {(character.catchphrases || character.majorCases || character.mentorsMentees || character.reputationalNotes || character.faithRoots || character.clubsAssociations) && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
              <div className="space-y-4">
                {character.catchphrases && <div><h3 className="text-sm font-medium text-gray-700">Catchphrases</h3><p className="text-gray-600 mt-1">{character.catchphrases}</p></div>}
                {character.majorCases && <div><h3 className="text-sm font-medium text-gray-700">Major Cases/Projects</h3><p className="text-gray-600 mt-1">{character.majorCases}</p></div>}
                {character.mentorsMentees && <div><h3 className="text-sm font-medium text-gray-700">Mentors & Mentees</h3><p className="text-gray-600 mt-1">{character.mentorsMentees}</p></div>}
                {character.reputationalNotes && <div><h3 className="text-sm font-medium text-gray-700">Reputation</h3><p className="text-gray-600 mt-1">{character.reputationalNotes}</p></div>}
                {character.faithRoots && <div><h3 className="text-sm font-medium text-gray-700">Faith & Roots</h3><p className="text-gray-600 mt-1">{character.faithRoots}</p></div>}
                {character.clubsAssociations && <div><h3 className="text-sm font-medium text-gray-700">Clubs & Associations</h3><p className="text-gray-600 mt-1">{character.clubsAssociations}</p></div>}
              </div>
            </section>
          )}

          {/* Story Presence */}
          {(character.firstAppearance || character.chapterAppearances.length > 0) && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Story Presence</h2>
              {character.firstAppearance && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700">First Appearance</h3>
                  <p className="text-gray-600 mt-1">{character.firstAppearance}</p>
                </div>
              )}
              {character.chapterAppearances.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Chapter Appearances ({character.chapterAppearances.length})</h3>
                  <div className="space-y-2">
                    {character.chapterAppearances.map((appearance) => (
                      <Link key={appearance.id} href={`/chapters/${appearance.chapter.id}`} className="block p-3 rounded-lg border hover:bg-gray-50">
                        <span className="font-medium">{appearance.chapter.title || `Chapter ${appearance.chapter.number}`}</span>
                        {appearance.role && <span className="ml-2 badge badge-blue">{appearance.role}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Relationship Boxes */}
          {(parsedRelationships.length > 0 || dbRelationships.length > 0 || character.relationships) && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Relationships
              </h2>

              {/* DB relationships with color-coded boxes */}
              {dbRelationships.length > 0 && (
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {dbRelationships.map((rel, idx) => {
                    const relType = rel.type.toLowerCase();
                    let colorClass = 'from-gray-50 to-gray-100 border-gray-200';
                    let textClass = 'text-gray-600';
                    let icon = '👤';

                    if (relType.includes('spouse') || relType.includes('wife') || relType.includes('husband')) {
                      colorClass = 'from-red-50 to-pink-50 border-red-200';
                      textClass = 'text-red-600';
                      icon = '💍';
                    } else if (relType.includes('parent') || relType.includes('mother') || relType.includes('father')) {
                      colorClass = 'from-green-50 to-emerald-50 border-green-200';
                      textClass = 'text-green-600';
                      icon = '👨‍👩‍👧';
                    } else if (relType.includes('sibling') || relType.includes('sister') || relType.includes('brother')) {
                      colorClass = 'from-amber-50 to-yellow-50 border-amber-200';
                      textClass = 'text-amber-600';
                      icon = '👫';
                    } else if (relType.includes('godparent') || relType.includes('godchild')) {
                      colorClass = 'from-cyan-50 to-sky-50 border-cyan-200';
                      textClass = 'text-cyan-600';
                      icon = '✨';
                    } else if (relType.includes('mentor')) {
                      colorClass = 'from-indigo-50 to-violet-50 border-indigo-200';
                      textClass = 'text-indigo-600';
                      icon = '🎓';
                    } else if (relType.includes('friend')) {
                      colorClass = 'from-purple-50 to-fuchsia-50 border-purple-200';
                      textClass = 'text-purple-600';
                      icon = '🤝';
                    } else if (relType.includes('protector')) {
                      colorClass = 'from-teal-50 to-emerald-50 border-teal-200';
                      textClass = 'text-teal-600';
                      icon = '🛡️';
                    } else if (relType.includes('colleague') || relType.includes('coworker')) {
                      colorClass = 'from-blue-50 to-sky-50 border-blue-200';
                      textClass = 'text-blue-600';
                      icon = '💼';
                    } else if (relType.includes('romantic')) {
                      colorClass = 'from-rose-50 to-pink-50 border-rose-200';
                      textClass = 'text-rose-600';
                      icon = '❤️';
                    }

                    return (
                      <Link
                        key={idx}
                        href={`/characters/${rel.otherCharacter.id}`}
                        className={`block p-3 rounded-lg border-2 bg-gradient-to-r ${colorClass} hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icon}</span>
                          <div className="flex-1">
                            <div className={`text-xs uppercase font-bold ${textClass}`}>{rel.type}</div>
                            <div className="font-semibold text-gray-900">{rel.otherCharacter.name}</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Parsed relationship boxes */}
              {parsedRelationships.length > 0 && dbRelationships.length === 0 && (
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {parsedRelationships.map((rel, idx) => (
                    <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                      <div className="text-xs text-blue-600 uppercase font-bold">{rel.type}</div>
                      <div className="font-semibold text-gray-900">{rel.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Raw relationships text if no parsed ones */}
              {parsedRelationships.length === 0 && dbRelationships.length === 0 && character.relationships && (
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{character.relationships}</p>
              )}

              {/* Link to full relationship graph */}
              <Link
                href="/relationships"
                className="block mt-4 text-center text-sm text-blue-600 hover:underline"
              >
                View Full Relationship Graph →
              </Link>
            </section>
          )}

          {/* Key Traits */}
          <section className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Traits</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Motivations</h3>
                <p className="text-gray-600 mt-1">{character.motivations || <span className="text-yellow-600 italic">Not defined</span>}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Fears</h3>
                <p className="text-gray-600 mt-1">{character.fears || <span className="text-yellow-600 italic">Not defined</span>}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Flaw</h3>
                <p className="text-gray-600 mt-1">{character.flaw || <span className="text-yellow-600 italic">Not defined</span>}</p>
              </div>
              {character.secrets && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Secrets</h3>
                  <p className="text-gray-600 mt-1">{character.secrets}</p>
                </div>
              )}
            </div>
          </section>

          {/* Plot Involvements */}
          {character.plotInvolvements.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Plot Threads ({character.plotInvolvements.length})</h2>
              <div className="space-y-2">
                {character.plotInvolvements.map((involvement) => (
                  <Link key={involvement.id} href={`/plots/${involvement.plotThread.id}`} className="block p-3 rounded-lg border hover:bg-gray-50">
                    <div className="font-medium text-gray-900">{involvement.plotThread.name}</div>
                    {involvement.role && <div className="text-sm text-gray-500">{involvement.role}</div>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Source Files */}
          {(character.sourceFiles || provenance.length > 0) && (
            <section className="bg-gray-50 rounded-lg border p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Source Documents</h2>
              {character.sourceFiles && <p className="text-sm text-gray-600 mb-2">{character.sourceFiles}</p>}
              {provenance.length > 0 && (
                <div className="space-y-1 text-sm">
                  {provenance.map((p) => (
                    <div key={p.id} className="text-gray-600">
                      <span className="font-medium">{p.block.document.fileName}</span>
                      {p.block.sectionHeading && <span className="text-gray-400"> / {p.block.sectionHeading}</span>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
