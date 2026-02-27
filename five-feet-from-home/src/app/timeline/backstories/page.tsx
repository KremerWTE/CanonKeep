import Link from 'next/link';
import { prisma } from '@/lib/db';

// Timeline data structure for character backstories
interface TimelineEvent {
  year: string;
  age?: string;
  event: string;
  category: 'education' | 'career' | 'relationship' | 'personal' | 'military' | 'crisis';
}

interface CharacterTimeline {
  name: string;
  color: string;
  events: TimelineEvent[];
}

export default async function BackstoryTimelinePage() {
  // Get main characters for the timeline
  const characters = await prisma.character.findMany({
    where: {
      name: {
        in: [
          'Jasper Barrett',
          'Elena Barrett',
          'Addie Price',
          'Cole "Hawk" Hawkins',
          'Harper Whitfield',
          'Kendra Donnelly',
          'Chris (Last Name TBD)',
          'Bella Romano',
          'Ridge Callahan',
          'Sara Hale',
        ],
      },
    },
  });

  // Build timeline data from character histories
  const characterTimelines: CharacterTimeline[] = [
    {
      name: 'Jasper Barrett',
      color: 'bg-blue-500',
      events: [
        { year: '~1985', event: 'Born in Charlotte, NC', category: 'personal' },
        { year: '~2003', event: 'Attends Duke University', category: 'education' },
        { year: '~2007', event: 'Joins military intelligence', category: 'military' },
        { year: '~2010', event: 'Deployed overseas - classified operations', category: 'military' },
        { year: '~2012', event: 'Meets Elena at DC gala', category: 'relationship' },
        { year: '~2013', event: 'Leaves military, starts BSS', category: 'career' },
        { year: '~2014', event: 'Marries Elena', category: 'relationship' },
        { year: '~2015', event: 'BSS expands to multiple cities', category: 'career' },
        { year: 'Book 1', event: 'Called to London crisis - leaves family', category: 'crisis' },
      ],
    },
    {
      name: 'Elena Barrett',
      color: 'bg-pink-500',
      events: [
        { year: '~1987', event: 'Born in Boston to old-money family', category: 'personal' },
        { year: '~2005', event: 'Attends Georgetown - Art History & Business', category: 'education' },
        { year: '~2009', event: 'Works in high-end event planning', category: 'career' },
        { year: '~2012', event: 'Meets Jasper at DC gala', category: 'relationship' },
        { year: '~2014', event: 'Marries Jasper, moves to Charlotte', category: 'relationship' },
        { year: '~2016', event: 'Founds Maison Aurelia', category: 'career' },
        { year: '~2018', event: 'Becomes anchor of Wives Club', category: 'personal' },
        { year: 'Book 1', event: 'Grayscale diagnosis during pregnancy', category: 'crisis' },
        { year: 'Book 1', event: 'Birth of baby boy with complications', category: 'personal' },
        { year: 'Book 1', event: 'Post-birth complications, postpartum struggles', category: 'crisis' },
        { year: 'Book 1', event: 'Addie becomes her rock while Jasper away', category: 'relationship' },
        { year: 'Book 2', event: 'Intimate dynamic develops with Addie and Kendra', category: 'relationship' },
      ],
    },
    {
      name: 'Addie Price',
      color: 'bg-purple-500',
      events: [
        { year: '~1986', event: 'Born in North Carolina', category: 'personal' },
        { year: '~2004', event: 'Attends UNC Chapel Hill', category: 'education' },
        { year: '~2009', event: 'Joins military intelligence (same unit as Jasper)', category: 'military' },
        { year: '~2010', event: 'Serves with Jasper and Hawk in classified operations', category: 'military' },
        { year: '~2013', event: 'Recruited by Jasper to help start BSS', category: 'career' },
        { year: '~2014', event: 'Becomes Managing Partner of BSS', category: 'career' },
        { year: '~2016', event: 'Marries Cole "Hawk" Hawkins', category: 'relationship' },
        { year: 'Book 1', event: 'Becomes Elena\'s rock during medical crisis', category: 'crisis' },
        { year: 'Book 2', event: 'Evolves into fixer, conflicts with Jasper emerge', category: 'career' },
      ],
    },
    {
      name: 'Cole "Hawk" Hawkins',
      color: 'bg-red-500',
      events: [
        { year: '~1984', event: 'Born (location classified)', category: 'personal' },
        { year: '~2002', event: 'Enlists in military', category: 'military' },
        { year: '~2004', event: 'Special forces selection', category: 'military' },
        { year: '~2006', event: 'Multiple overseas deployments', category: 'military' },
        { year: '~2010', event: 'Works with Jasper and Addie on classified ops', category: 'military' },
        { year: '~2013', event: 'Joins BSS as Head of Operations', category: 'career' },
        { year: '~2016', event: 'Marries Addie Price', category: 'relationship' },
        { year: 'Book 1', event: 'Deploys to London with Jasper', category: 'crisis' },
      ],
    },
    {
      name: 'Harper Whitfield',
      color: 'bg-green-500',
      events: [
        { year: '~1988', event: 'Born in Atlanta', category: 'personal' },
        { year: '~2006', event: 'Attends Emory University', category: 'education' },
        { year: '~2010', event: 'Law school, specializes in crisis law', category: 'education' },
        { year: '~2014', event: 'Joins BSS as Senior Strategist', category: 'career' },
        { year: '~2016', event: 'Becomes key voice in BSS strategy', category: 'career' },
        { year: '~2018', event: 'Develops AI ethics interest', category: 'personal' },
        { year: 'Book 1', event: 'Coordinates strategy from Charlotte', category: 'crisis' },
        { year: 'Book 2', event: 'Dating distraction leads to tech breach', category: 'crisis' },
        { year: 'Book 2', event: 'Gets engaged', category: 'relationship' },
      ],
    },
    {
      name: 'Kendra Donnelly',
      color: 'bg-yellow-500',
      events: [
        { year: '~1989', event: 'Born to Catholic family', category: 'personal' },
        { year: '~2007', event: 'Attends Catholic university', category: 'education' },
        { year: '~2010', event: 'Meets Chris', category: 'relationship' },
        { year: '~2012', event: 'Marries Chris', category: 'relationship' },
        { year: '~2014', event: 'Connects with Wives Club', category: 'personal' },
        { year: '~2016', event: 'Becomes the "Integrator" of group', category: 'personal' },
        { year: 'Book 1', event: 'Organizes Wives Club support network', category: 'crisis' },
        { year: 'Book 2', event: 'Becomes Addie\'s analyst as Addie becomes fixer', category: 'career' },
        { year: 'Book 2', event: 'Competes in Crossfit competition', category: 'personal' },
        { year: 'Book 2', event: 'Intimate dynamic with Addie and Elena', category: 'relationship' },
      ],
    },
    {
      name: 'Bella Romano',
      color: 'bg-orange-500',
      events: [
        { year: '~1990', event: 'Born in Italian-American family', category: 'personal' },
        { year: '~2008', event: 'Studies art/design', category: 'education' },
        { year: '~2014', event: 'Married (husband works at BSS)', category: 'relationship' },
        { year: '~2015', event: 'Joins Wives Club circle', category: 'personal' },
        { year: '~2017', event: 'Becomes emotional heart of the group', category: 'personal' },
        { year: 'Book 1', event: 'Provides emotional support during crisis', category: 'crisis' },
      ],
    },
    {
      name: 'Ridge Callahan',
      color: 'bg-teal-500',
      events: [
        { year: '~1986', event: 'Born in rural South', category: 'personal' },
        { year: '~2004', event: 'Military enlistment', category: 'military' },
        { year: '~2008', event: 'Serves with Hawk overseas', category: 'military' },
        { year: '~2012', event: 'Honorable discharge', category: 'military' },
        { year: '~2014', event: 'Joins BSS operations team', category: 'career' },
        { year: '~2016', event: 'Becomes Assistant Head of Ops', category: 'career' },
        { year: 'Book 1', event: 'Ground support for London operation', category: 'crisis' },
        { year: 'Book 2', event: 'Gets engaged to Julia', category: 'relationship' },
      ],
    },
    {
      name: 'Sara Hale',
      color: 'bg-rose-500',
      events: [
        { year: '~1988', event: 'Born', category: 'personal' },
        { year: '~2010', event: 'Married (first marriage)', category: 'relationship' },
        { year: '~2015', event: 'Joins Wives Club through BSS connections', category: 'personal' },
        { year: '~2017', event: 'Divorced', category: 'relationship' },
        { year: 'Book 1', event: 'Active Wives Club member during crisis', category: 'crisis' },
      ],
    },
  ];

  // Key intersection points where characters' lives connect
  const intersections = [
    {
      year: '~2010',
      title: 'Military Intelligence Unit',
      description: 'Jasper, Addie, and Hawk serve together in classified operations',
      characters: ['Jasper Barrett', 'Addie Price', 'Cole "Hawk" Hawkins'],
    },
    {
      year: '~2012',
      title: 'DC Gala Meeting',
      description: 'Jasper meets Elena at a diplomatic function in Washington DC',
      characters: ['Jasper Barrett', 'Elena Barrett'],
    },
    {
      year: '~2013',
      title: 'BSS Founded',
      description: 'Jasper and Addie launch Barrett Strategic Solutions',
      characters: ['Jasper Barrett', 'Addie Price'],
    },
    {
      year: '~2014',
      title: 'Wives Club Forms',
      description: 'The informal network of BSS wives begins to coalesce',
      characters: ['Elena Barrett', 'Addie Price', 'Kendra Donnelly'],
    },
    {
      year: '~2016',
      title: 'Maison Aurelia Launch',
      description: 'Elena formalizes her event planning expertise into a business',
      characters: ['Elena Barrett', 'Charlotte "Lottie" Hale', 'Sara Hale'],
    },
    {
      year: 'Book 1',
      title: 'London Crisis & Elena\'s Medical Crisis',
      description: 'Jasper called away to London while Elena faces grayscale diagnosis, difficult birth, and postpartum. Addie becomes Elena\'s rock.',
      characters: ['Jasper Barrett', 'Elena Barrett', 'Addie Price', 'Cole "Hawk" Hawkins'],
    },
    {
      year: 'Book 2',
      title: 'A Home Forged in Chaos',
      description: 'Crises continue. Addie evolves into fixer, conflicts with Jasper. Cabin threesome. Ridge & Julia engagement. Harper engagement.',
      characters: ['Addie Price', 'Kendra Donnelly', 'Elena Barrett', 'Ridge Callahan', 'Harper Whitfield'],
    },
  ];

  const categoryColors: Record<string, string> = {
    education: 'bg-blue-100 text-blue-800',
    career: 'bg-green-100 text-green-800',
    relationship: 'bg-pink-100 text-pink-800',
    personal: 'bg-gray-100 text-gray-800',
    military: 'bg-red-100 text-red-800',
    crisis: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Character Backstory Timelines</h1>
            <p className="text-gray-600">Past lives converging toward Book 1</p>
          </div>
          <div className="flex gap-4">
            <Link href="/timeline" className="text-blue-600 hover:underline">
              Story Timeline
            </Link>
            <Link href="/" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-2">Event Categories</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <span key={cat} className={`px-3 py-1 rounded text-sm ${color}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Key Intersections */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Key Intersection Points</h2>
          <p className="text-gray-600 mb-4">
            Moments where characters' lives first connect, leading to the world of Book 1
          </p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-300"></div>
            <div className="space-y-6 pl-10">
              {intersections.map((intersection, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-10 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-bold text-indigo-600">{intersection.year}</span>
                        <h3 className="font-semibold text-lg">{intersection.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-1">{intersection.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {intersection.characters.map((char) => (
                        <span key={char} className="text-xs bg-white px-2 py-1 rounded border">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parallel Timelines */}
        <h2 className="text-xl font-bold mb-4">Individual Backstory Timelines</h2>
        <div className="space-y-6">
          {characterTimelines.map((timeline) => (
            <div key={timeline.name} className="bg-white rounded-lg shadow overflow-hidden">
              <div className={`${timeline.color} px-4 py-3`}>
                <h3 className="font-bold text-white text-lg">{timeline.name}</h3>
              </div>
              <div className="p-4">
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-3 pl-8">
                    {timeline.events.map((event, i) => (
                      <div key={i} className="relative flex items-start gap-3">
                        <div
                          className={`absolute -left-8 w-4 h-4 rounded-full border-2 border-white ${timeline.color}`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-500 w-16">{event.year}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[event.category]}`}>
                              {event.category}
                            </span>
                          </div>
                          <p className="text-gray-800 mt-1">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book 1 Starting Point */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow text-white">
          <h2 className="text-2xl font-bold mb-4">Book 1: The Convergence</h2>
          <p className="text-blue-100 mb-4">
            All timelines converge as Jasper receives the call that changes everything.
            He must leave for London, setting in motion the events of Five Feet From Home.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded">
              <h3 className="font-semibold">BSS Team Deploys</h3>
              <p className="text-sm text-blue-100">Jasper, Hawk, and operators head to London</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <h3 className="font-semibold">Home Front</h3>
              <p className="text-sm text-blue-100">Elena and Wives Club manage the waiting</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <h3 className="font-semibold">BSS HQ</h3>
              <p className="text-sm text-blue-100">Addie and Harper coordinate from Charlotte</p>
            </div>
          </div>
        </div>

        {/* Timeline visualization hint */}
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-2">Understanding the Timelines</h3>
          <p className="text-yellow-700">
            Each character has lived a full life before Book 1 begins. Their military service,
            education, relationships, and career paths all interweave to create the world of
            Five Feet From Home. The &quot;~&quot; symbol indicates approximate years based on character ages
            and story references.
          </p>
        </div>
      </div>
    </div>
  );
}
