import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function BSSPage() {
  // Get BSS-related organizations
  const organizations = await prisma.organization.findMany({
    where: {
      OR: [
        { name: { contains: 'BSS' } },
        { name: { contains: 'Forge' } },
        { name: { contains: 'Foundry' } },
      ],
    },
    orderBy: { name: 'asc' },
  });

  // Get BSS-related storylines
  const storylines = await prisma.storyline.findMany({
    where: {
      OR: [
        { category: { contains: 'BSS' } },
        { title: { contains: 'BSS' } },
      ],
    },
    orderBy: { title: 'asc' },
  });

  // Get BSS characters
  const characters = await prisma.character.findMany({
    where: {
      bssRole: { not: null },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Barrett Strategic Solutions</h1>
            <p className="text-gray-400 italic">"Clarity. Confidence. Control."</p>
          </div>
          <Link href="/" className="text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {/* Overview */}
        <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
          <h2 className="text-xl font-bold mb-2">About BSS</h2>
          <p className="text-gray-300 mb-4">
            Barrett Strategic Solutions exists to solve impossible problems—the kinds of crises where traditional
            firms can't move fast enough, or where discretion and deniability are essential. Equal parts fixer,
            intelligence shop, negotiation team, and covert ops unit.
          </p>
          <p className="text-gray-400 text-sm italic">
            "When no one else can fix it, we can."
          </p>
        </div>

        {/* Executive Leadership */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Executive Leadership</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-700 p-4 rounded bg-gray-850">
              <h3 className="font-bold text-lg">Jasper Barrett</h3>
              <p className="text-blue-400 text-sm">CEO / The Architect</p>
              <p className="text-pink-400 text-sm">Spouse: Elena Barrett</p>
              <p className="text-gray-400 text-xs mt-2">Visionary, final decision maker, high-touch on elite clients.</p>
            </div>
            <div className="border border-gray-700 p-4 rounded bg-gray-850">
              <h3 className="font-bold text-lg">Harper</h3>
              <p className="text-blue-400 text-sm">COO / The Engineer</p>
              <p className="text-pink-400 text-sm">Spouse: TBD</p>
              <p className="text-gray-400 text-xs mt-2">Operational backbone, runs day-to-day execution and structure.</p>
            </div>
          </div>
        </div>

        {/* HQ - The Forge */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-amber-400">HQ: The Forge (Charlotte, NC)</h2>
          <p className="text-gray-400 mb-4">The brain and heart of BSS. Where problems are melted down and reforged into solutions.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-amber-700/50 p-3 rounded bg-amber-900/20">
              <h4 className="font-semibold text-amber-300">Strategic Fixers</h4>
              <p className="text-xs text-gray-400">"The Hammer Unit"</p>
              <p className="text-xs text-gray-500 mt-1">Elite troubleshooters. Boardroom operators. Deploy for high-stakes negotiations.</p>
            </div>
            <div className="border border-amber-700/50 p-3 rounded bg-amber-900/20">
              <h4 className="font-semibold text-amber-300">Operator Command</h4>
              <p className="text-xs text-gray-400">Head of Operators + Deputy</p>
              <p className="text-xs text-gray-500 mt-1">Oversees all regional teams, sets doctrine, approves heavy moves.</p>
            </div>
            <div className="border border-amber-700/50 p-3 rounded bg-amber-900/20">
              <h4 className="font-semibold text-amber-300">Cyber Division</h4>
              <p className="text-xs text-gray-400">"The Ghost Grid"</p>
              <p className="text-xs text-gray-500 mt-1">Hacking, SIGINT, counter-cyber ops, penetration specialists.</p>
            </div>
            <div className="border border-amber-700/50 p-3 rounded bg-amber-900/20">
              <h4 className="font-semibold text-amber-300">Analyst Wing</h4>
              <p className="text-xs text-gray-400">"The Watchtower"</p>
              <p className="text-xs text-gray-500 mt-1">Intel analysts, researchers, red-team thinkers.</p>
            </div>
            <div className="border border-amber-700/50 p-3 rounded bg-amber-900/20">
              <h4 className="font-semibold text-amber-300">Logistics</h4>
              <p className="text-xs text-gray-400">"The Bones"</p>
              <p className="text-xs text-gray-500 mt-1">Movement, finance, clean IDs, weapons, safehouses, travel.</p>
            </div>
            <div className="border border-amber-700/50 p-3 rounded bg-amber-900/20">
              <h4 className="font-semibold text-amber-300">Executive Support</h4>
              <p className="text-xs text-gray-400">Assistants & Liaisons</p>
              <p className="text-xs text-gray-500 mt-1">Office assistants, schedulers, client liaisons, gatekeepers.</p>
            </div>
          </div>
        </div>

        {/* Key Operators */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-400">Key Operators & Staff</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-700 p-4 rounded">
              <h3 className="font-bold">Hawk</h3>
              <p className="text-green-400 text-sm">Head of Operators / Tier 1</p>
              <p className="text-pink-400 text-sm">Spouse: Addie</p>
              <p className="text-gray-400 text-xs mt-1">Sets standards, leads high-stakes deployments.</p>
            </div>
            <div className="border border-gray-700 p-4 rounded">
              <h3 className="font-bold">Addie</h3>
              <p className="text-green-400 text-sm">Senior Fixer / POH Patroness</p>
              <p className="text-pink-400 text-sm">Spouse: Hawk</p>
              <p className="text-gray-400 text-xs mt-1">Risen from assistant to legendary fixer.</p>
            </div>
            <div className="border border-gray-700 p-4 rounded">
              <h3 className="font-bold">Kendra</h3>
              <p className="text-green-400 text-sm">Senior Analyst / Operator</p>
              <p className="text-pink-400 text-sm">Spouse: Chris</p>
              <p className="text-gray-400 text-xs mt-1">Intelligence analysis, field operations.</p>
            </div>
            <div className="border border-gray-700 p-4 rounded">
              <h3 className="font-bold">Bella</h3>
              <p className="text-green-400 text-sm">POH - The Hand</p>
              <p className="text-pink-400 text-sm">Spouse: Matt</p>
              <p className="text-gray-400 text-xs mt-1">Addie's closest confidante and executive assistant.</p>
            </div>
            <div className="border border-gray-700 p-4 rounded">
              <h3 className="font-bold">Selene</h3>
              <p className="text-green-400 text-sm">Undercover Specialist</p>
              <p className="text-pink-400 text-sm">Spouse: Wife + Throuple Partner</p>
              <p className="text-gray-400 text-xs mt-1">The wild card. Thrives in chaos.</p>
            </div>
            <div className="border border-gray-700 p-4 rounded">
              <h3 className="font-bold">Grace</h3>
              <p className="text-green-400 text-sm">Analyst</p>
              <p className="text-pink-400 text-sm">Spouse: Zach</p>
              <p className="text-gray-400 text-xs mt-1">The newest member of the inner circle.</p>
            </div>
          </div>
        </div>

        {/* Regional Labs */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-400">Regional Labs</h2>
          <p className="text-gray-400 mb-4">
            Each Lab is built inside an old, rundown building — blending into the city's background.
            Part office, part dojo/training floor, part safehouse.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-purple-700/50 p-4 rounded bg-purple-900/20">
              <h3 className="font-bold text-purple-300">New York Lab</h3>
              <p className="text-xs text-gray-400">Brooklyn Brownstone</p>
              <p className="text-xs text-gray-500 mt-1">Finance, hedge funds, corporate battles</p>
              <p className="text-xs text-purple-400 mt-2">Training: Boxing ring in basement</p>
            </div>
            <div className="border border-purple-700/50 p-4 rounded bg-purple-900/20">
              <h3 className="font-bold text-purple-300">DC Lab</h3>
              <p className="text-xs text-gray-400">Capitol Hill Rowhouse</p>
              <p className="text-xs text-gray-500 mt-1">Politics, lobbying, federal-level maneuvering</p>
              <p className="text-xs text-purple-400 mt-2">Training: Wrestling mats, shoot house</p>
            </div>
            <div className="border border-purple-700/50 p-4 rounded bg-purple-900/20">
              <h3 className="font-bold text-purple-300">London Lab</h3>
              <p className="text-xs text-gray-400">East End Warehouse</p>
              <p className="text-xs text-gray-500 mt-1">EU finance, aristocracy, MI5/MI6 crossover</p>
              <p className="text-xs text-purple-400 mt-2">Training: Strongman/obstacle course</p>
            </div>
            <div className="border border-purple-700/50 p-4 rounded bg-purple-900/20">
              <h3 className="font-bold text-purple-300">LA Lab</h3>
              <p className="text-xs text-gray-400">Echo Park House</p>
              <p className="text-xs text-gray-500 mt-1">Media, Hollywood, Silicon Valley, VC</p>
              <p className="text-xs text-purple-400 mt-2">Training: Pool, surf, water rescue</p>
            </div>
            <div className="border border-purple-700/50 p-4 rounded bg-purple-900/20">
              <h3 className="font-bold text-purple-300">Asia Lab</h3>
              <p className="text-xs text-gray-400">Singapore/HK Shophouse</p>
              <p className="text-xs text-gray-500 mt-1">Trade, sovereign wealth, great-power competition</p>
              <p className="text-xs text-purple-400 mt-2">Training: Rooftop martial arts</p>
            </div>
            <div className="border border-purple-700/50 p-4 rounded bg-purple-900/20">
              <h3 className="font-bold text-purple-300">Middle East Lab</h3>
              <p className="text-xs text-gray-400">Dubai/Doha Villa</p>
              <p className="text-xs text-gray-500 mt-1">Energy, sovereign funds, tribal/political alliances</p>
              <p className="text-xs text-purple-400 mt-2">Training: Sand pit, climbing wall</p>
            </div>
          </div>
        </div>

        {/* Alloy Network */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-cyan-400">The Alloy Network</h2>
          <p className="text-gray-400 mb-4">
            Trusted part-time operatives and embedded specialists activated when needed.
            The "external metals" blended into operations.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-cyan-700/50 p-3 rounded">
              <h4 className="font-semibold text-cyan-300">Caroline</h4>
              <p className="text-xs text-gray-400">NYU Finance Professor</p>
              <p className="text-xs text-gray-500 mt-1">Market/hedge fund insider intel</p>
            </div>
            <div className="border border-cyan-700/50 p-3 rounded">
              <h4 className="font-semibold text-cyan-300">Journalists</h4>
              <p className="text-xs text-gray-400">Media Network</p>
              <p className="text-xs text-gray-500 mt-1">Story placement and kill</p>
            </div>
            <div className="border border-cyan-700/50 p-3 rounded">
              <h4 className="font-semibold text-cyan-300">Lawyers & Bankers</h4>
              <p className="text-xs text-gray-400">Professional Network</p>
              <p className="text-xs text-gray-500 mt-1">Legal cover and financial channels</p>
            </div>
          </div>
        </div>

        {/* BSS Cases */}
        <h2 className="text-2xl font-bold mb-4 text-red-400">Recent Cases ({storylines.length})</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {storylines.slice(0, 12).map((storyline) => (
            <Link href={`/storylines/${storyline.id}`} key={storyline.id}>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-semibold text-white">{storyline.title}</h4>
                <p className="text-sm text-red-400">{storyline.category}</p>
                {storyline.description && (
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{storyline.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
        {storylines.length > 12 && (
          <p className="text-center text-gray-500 mb-8">
            + {storylines.length - 12} more cases...
          </p>
        )}

        {/* Operator Philosophy */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Operator Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-400">Thinking Predators</p>
              <p className="text-gray-400">Problem solvers who happen to be lethal. Not mercenaries.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400">Last Resort</p>
              <p className="text-gray-400">Fighting means something went wrong. We solve, not shoot.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400">Human Terrain</p>
              <p className="text-gray-400">Primary function is intel gathering and blending in.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400">Adaptability</p>
              <p className="text-gray-400">Comfortable in boardrooms, bazaars, nightclubs, or warzones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
