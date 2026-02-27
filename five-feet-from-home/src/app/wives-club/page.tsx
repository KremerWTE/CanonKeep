import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function WivesClubPage() {
  // Get characters with Wives Club related bssRole
  const members = await prisma.character.findMany({
    where: {
      OR: [
        { bssRole: { contains: 'Wives Club' } },
        { wivesClubRole: { not: null } },
      ],
    },
    orderBy: { lastName: 'asc' },
  });

  // Get storylines related to Wives Club
  const storylines = await prisma.storyline.findMany({
    where: {
      OR: [
        { category: { contains: 'Wives Club' } },
        { title: { contains: 'Wives Club' } },
      ],
    },
    orderBy: { title: 'asc' },
  });

  // Categorize members by subsection (Shieldmaidens, Owls, Vestals)
  const categorizeBySubsection = (member: typeof members[0]): string => {
    const role = member.wivesClubRole?.toLowerCase() || '';
    const bssRole = member.bssRole?.toLowerCase() || '';

    // Shieldmaidens - protectors, security, field operators
    if (role.includes('shieldmaiden') || role.includes('protector') || role.includes('defender') ||
        bssRole.includes('operator') || bssRole.includes('security') || bssRole.includes('field')) {
      return 'Shieldmaidens';
    }
    // Owls - intelligence, analysts, strategists
    if (role.includes('owl') || role.includes('intel') || role.includes('strategist') ||
        bssRole.includes('analyst') || bssRole.includes('intelligence') || bssRole.includes('research')) {
      return 'Owls';
    }
    // Vestals - tradition keepers, mentors, elders
    if (role.includes('vestal') || role.includes('founder') || role.includes('mentor') ||
        role.includes('keeper') || role.includes('elder')) {
      return 'Vestals';
    }
    return 'General';
  };

  // Categorize by location hub
  const categorizeByLocation = (member: typeof members[0]): string => {
    const hub = member.hubLocation?.toLowerCase() || '';
    const bssRole = member.bssRole?.toLowerCase() || '';

    if (hub.includes('charlotte') || hub.includes('clt') || bssRole.includes('charlotte')) return 'Charlotte (The Forge)';
    if (hub.includes('dc') || hub.includes('washington') || hub.includes('new york') || hub.includes('ny') || bssRole.includes('dc') || bssRole.includes('d.c.')) return 'DC / New York';
    if (hub.includes('boston') || bssRole.includes('boston')) return 'Boston';
    if (hub.includes('london') || hub.includes('europe') || hub.includes('uk')) return 'London / Europe';
    if (hub.includes('la') || hub.includes('los angeles') || hub.includes('california')) return 'Los Angeles';
    return 'Other';
  };

  // Categorize by role type
  const categorizeByType = (bssRole: string | null) => {
    if (!bssRole) return 'General';
    if (bssRole.includes('Sports Media')) return 'Sports Media Circle';
    if (bssRole.includes('Trophy')) return 'Trophy Wives';
    if (bssRole.includes('Bubble Trophy')) return 'Bubble Trophy Wives';
    if (bssRole.includes('External Fixer')) return 'External Advisors';
    if (bssRole.includes('D.C.') || bssRole.includes('Charlotte') || bssRole.includes('Boston')) return 'Geographic Hub Leaders';
    if (bssRole.includes('PR')) return 'PR & Branding';
    return 'General';
  };

  // Group members by subsection
  const subsectionGroups: Record<string, typeof members> = {
    'Shieldmaidens': [],
    'Owls': [],
    'Vestals': [],
    'General': []
  };
  for (const m of members) {
    const subsection = categorizeBySubsection(m);
    subsectionGroups[subsection].push(m);
  }

  // Group members by location
  const locationGroups: Record<string, typeof members> = {};
  for (const m of members) {
    const location = categorizeByLocation(m);
    if (!locationGroups[location]) locationGroups[location] = [];
    locationGroups[location].push(m);
  }

  // Group members by role type
  const typeGroups: Record<string, typeof members> = {};
  for (const m of members) {
    const type = categorizeByType(m.bssRole);
    if (!typeGroups[type]) typeGroups[type] = [];
    typeGroups[type].push(m);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Sapientia Minervae</h1>
            <p className="text-gray-600 italic">"The Wisdom of Minerva" — The Wives Club</p>
          </div>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {/* Overview */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-pink-500 mb-8">
          <h2 className="text-xl font-bold mb-2">About Sapientia Minervae</h2>
          <p className="text-gray-700 mb-4">
            The backbone of the BSS world. Not just emotional support — they are a quiet intelligence network.
            Part support group, part power behind the power. Named for Minerva, the Roman goddess of wisdom and strategic warfare.
          </p>
        </div>

        {/* Three Subsections */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">The Three Subsections</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-red-500 p-4 bg-red-50 rounded-r">
              <h3 className="font-bold text-red-800">The Shieldmaidens</h3>
              <p className="text-sm text-gray-700 mt-2">
                Protectors and fierce defenders. Active in crisis response and security support.
                They stand at the front when danger threatens the circle.
              </p>
            </div>
            <div className="border-l-4 border-amber-500 p-4 bg-amber-50 rounded-r">
              <h3 className="font-bold text-amber-800">The Owls</h3>
              <p className="text-sm text-gray-700 mt-2">
                Intelligence gatherers and strategists. Watchers who see everything and share quietly.
                The bridge between Shieldmaidens and Vestals.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 p-4 bg-purple-50 rounded-r">
              <h3 className="font-bold text-purple-800">The Vestals</h3>
              <p className="text-sm text-gray-700 mt-2">
                Keepers of tradition and sacred bonds. Maintain ceremonies, rituals, and emotional bonds.
                They preserve the heart of Sapientia Minervae.
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p><strong>The Council:</strong> One leader from each subsection serves on a rotating council to coordinate major decisions.</p>
          </div>
        </div>

        {/* Geographic Hub Leaders */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Geographic Hub Leaders</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-bold">Vanessa "Nessa" Caldwell</h3>
              <p className="text-sm text-blue-600">D.C./NY Hub - The Closer</p>
              <p className="text-xs text-gray-600 mt-2">Political/media credibility, access to lawmakers, lawyers, and journalists.</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold">Charlotte "Charlie" Whitmore</h3>
              <p className="text-sm text-green-600">Charlotte Hub - The Connector</p>
              <p className="text-xs text-gray-600 mt-2">Ties group into Charlotte finance, philanthropy, NASCAR, and corporate networks.</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold">Dr. Layla Hassan</h3>
              <p className="text-sm text-red-600">Boston Hub - The Anchor</p>
              <p className="text-xs text-gray-600 mt-2">Mediates disputes, keeps ethics in play, ties into healthcare and biotech elite.</p>
            </div>
          </div>
        </div>

        {/* Sports Media Circle */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Sports Media Circle</h2>
          <p className="text-gray-700 mb-4">
            Former sports anchors and media personalities who curate narratives and shape public perception.
            "Public face whisperers" with individual symbols of power.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <p className="font-bold">Vivian "Viv" Carroway</p>
              <p className="text-sm text-gray-600">The Peacemaker</p>
              <p className="text-xs text-pink-600">Symbol: Silver dove pin</p>
              <p className="text-xs text-gray-500 mt-1">Modeled on: Samantha Ponder + Maria Taylor</p>
            </div>
            <div className="border p-4 rounded">
              <p className="font-bold">Elena Duvall</p>
              <p className="text-sm text-gray-600">Reputation Fixer</p>
              <p className="text-xs text-pink-600">Symbol: Red wine toast ritual</p>
              <p className="text-xs text-gray-500 mt-1">Modeled on: Erin Andrews + Charissa Thompson</p>
            </div>
            <div className="border p-4 rounded">
              <p className="font-bold">Sloane Hartwell</p>
              <p className="text-sm text-gray-600">Finance Keeper</p>
              <p className="text-xs text-pink-600">Symbol: Coded ledger</p>
              <p className="text-xs text-gray-500 mt-1">Modeled on: Kay Adams + Molly Qerim</p>
            </div>
            <div className="border p-4 rounded">
              <p className="font-bold">Marisa Calderón</p>
              <p className="text-sm text-gray-600">The Conscience</p>
              <p className="text-xs text-pink-600">Symbol: Rosary ring</p>
              <p className="text-xs text-gray-500 mt-1">Modeled on: Allie LaForce + Doris Burke</p>
            </div>
            <div className="border p-4 rounded">
              <p className="font-bold">Tessa Loring</p>
              <p className="text-sm text-gray-600">The Storyteller</p>
              <p className="text-xs text-pink-600">Symbol: Storytelling circle</p>
              <p className="text-xs text-gray-500 mt-1">Modeled on: Jenny Taft + Charissa Thompson</p>
            </div>
            <div className="border p-4 rounded">
              <p className="font-bold">Raina "The Ledger" Locke</p>
              <p className="text-sm text-gray-600">The Enforcer</p>
              <p className="text-xs text-pink-600">Symbol: Black fountain pen</p>
              <p className="text-xs text-gray-500 mt-1">Modeled on: Ballers reporter + Jemele Hill</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <p><strong>Dynamic:</strong> Viv + Sloane = balance sheet and big-picture deals. Elena + Tessa = spin masters of public narrative. Marisa = conscience + connector. Raina = the hammer.</p>
          </div>
        </div>

        {/* Key Scenes */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Key Wives Club Scenes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-purple-400 p-4">
              <h3 className="font-semibold">Hospital Vigil (Founding Moment)</h3>
              <p className="text-sm text-gray-600">
                Elena, Addie, Grace spend the night during Elena's medical crisis.
                This becomes the seed of the Wives Club — the emotional glue forms here.
              </p>
            </div>
            <div className="border-l-4 border-pink-400 p-4">
              <h3 className="font-semibold">Baby Shower Overload</h3>
              <p className="text-sm text-gray-600">
                Kendra leads the charge in showering Grace with endless items, books, advice.
                Grace panics; Addie calms her down; Elena delivers wisdom about motherhood being "imperfect but holy."
              </p>
            </div>
            <div className="border-l-4 border-orange-400 p-4">
              <h3 className="font-semibold">Wedding Rivalry</h3>
              <p className="text-sm text-gray-600">
                Kendra jokes about wanting to overshadow Addie's wedding.
                Hawk overhears, sets up playful banter. Cements their "sisters who bicker but love" dynamic.
              </p>
            </div>
            <div className="border-l-4 border-blue-400 p-4">
              <h3 className="font-semibold">Crisis Strategy Night</h3>
              <p className="text-sm text-gray-600">
                When a major scandal hits, the wives gather separately.
                They trade intel, gossip, and quietly influence how BSS men will respond.
              </p>
            </div>
          </div>
        </div>

        {/* Core Inner Circle - Charlotte (The Forge) */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-2">The Inner Circle</h2>
          <p className="text-gray-600 mb-4">The core wives who keep BSS and its leaders grounded.</p>

          {/* Charlotte HQ */}
          <h3 className="text-lg font-semibold text-amber-700 mb-3 border-b border-amber-300 pb-1">Charlotte (The Forge) - HQ</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Elena Barrett</h3>
              <p className="text-pink-600 text-sm">Spouse: Jasper Barrett (CEO)</p>
              <p className="text-blue-600 text-sm">CEO, Maision Aurelia</p>
              <p className="text-purple-600 text-xs font-semibold">Subsection: Vestals (Founder)</p>
              <p className="text-gray-500 text-xs mt-1">The matriarch. Mentor to all. Runs elite events while anchoring the family.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Addie</h3>
              <p className="text-pink-600 text-sm">Spouse: Hawk (Head of Operators)</p>
              <p className="text-blue-600 text-sm">POH Patroness / Senior Fixer</p>
              <p className="text-red-600 text-xs font-semibold">Subsection: Shieldmaidens (Leader)</p>
              <p className="text-gray-500 text-xs mt-1">Rose from assistant to legendary fixer. Keeps Jasper and Elena honest.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Kendra</h3>
              <p className="text-pink-600 text-sm">Spouse: Chris (Operator)</p>
              <p className="text-blue-600 text-sm">Senior Analyst / Operator</p>
              <p className="text-amber-600 text-xs font-semibold">Subsection: Owls (Leader)</p>
              <p className="text-gray-500 text-xs mt-1">Balance advisor to Elena. Intelligence and strategy.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Bella</h3>
              <p className="text-pink-600 text-sm">Spouse: Matt (Operator)</p>
              <p className="text-blue-600 text-sm">POH - The Hand</p>
              <p className="text-purple-600 text-xs font-semibold">Subsection: Vestals</p>
              <p className="text-gray-500 text-xs mt-1">Addie's right hand. The kids' fun aunt.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Selene</h3>
              <p className="text-pink-600 text-sm">Spouse: Wife + Throuple Partner</p>
              <p className="text-blue-600 text-sm">Undercover Specialist</p>
              <p className="text-red-600 text-xs font-semibold">Subsection: Shieldmaidens</p>
              <p className="text-gray-500 text-xs mt-1">The wild card. Thrives in chaos.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Sara</h3>
              <p className="text-pink-600 text-sm">Elena's Sister</p>
              <p className="text-blue-600 text-sm">Family Anchor</p>
              <p className="text-purple-600 text-xs font-semibold">Subsection: Vestals</p>
              <p className="text-gray-500 text-xs mt-1">Steps in when parents travel.</p>
            </div>
          </div>

          {/* DC/NY Hub */}
          <h3 className="text-lg font-semibold text-blue-700 mb-3 border-b border-blue-300 pb-1">Washington DC / New York</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Vanessa "Nessa" Caldwell</h3>
              <p className="text-pink-600 text-sm">DC/NY Hub Leader</p>
              <p className="text-blue-600 text-sm">The Closer</p>
              <p className="text-amber-600 text-xs font-semibold">Subsection: Owls</p>
              <p className="text-gray-500 text-xs mt-1">Political/media credibility. Access to lawmakers and journalists.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Caroline</h3>
              <p className="text-pink-600 text-sm">Alloy Network</p>
              <p className="text-blue-600 text-sm">NYU Finance Professor</p>
              <p className="text-amber-600 text-xs font-semibold">Subsection: Owls</p>
              <p className="text-gray-500 text-xs mt-1">Market/hedge fund insider intel.</p>
            </div>
          </div>

          {/* Boston Hub */}
          <h3 className="text-lg font-semibold text-green-700 mb-3 border-b border-green-300 pb-1">Boston</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Dr. Layla Hassan</h3>
              <p className="text-pink-600 text-sm">Boston Hub Leader</p>
              <p className="text-blue-600 text-sm">The Anchor</p>
              <p className="text-purple-600 text-xs font-semibold">Subsection: Vestals</p>
              <p className="text-gray-500 text-xs mt-1">Mediates disputes. Healthcare and biotech elite connections.</p>
            </div>
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">Claire</h3>
              <p className="text-pink-600 text-sm">Chris's First Love</p>
              <p className="text-blue-600 text-sm">European Intel</p>
              <p className="text-amber-600 text-xs font-semibold">Subsection: Owls</p>
              <p className="text-gray-500 text-xs mt-1">Santa Clara Law. Vatican connections.</p>
            </div>
          </div>

          {/* London Hub */}
          <h3 className="text-lg font-semibold text-purple-700 mb-3 border-b border-purple-300 pb-1">London / Europe</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">European Wives</h3>
              <p className="text-pink-600 text-sm">London Lab Connections</p>
              <p className="text-blue-600 text-sm">Fashion, Media, Political Consulting</p>
              <p className="text-amber-600 text-xs font-semibold">Subsection: Owls</p>
              <p className="text-gray-500 text-xs mt-1">Ties to aristocracy, EU finance, Vatican circles.</p>
            </div>
          </div>

          {/* LA Hub */}
          <h3 className="text-lg font-semibold text-orange-700 mb-3 border-b border-orange-300 pb-1">Los Angeles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-pink-300 p-4 rounded bg-pink-50">
              <h3 className="font-bold text-lg">LA Wives</h3>
              <p className="text-pink-600 text-sm">LA Lab Connections</p>
              <p className="text-blue-600 text-sm">Media, Hollywood, Tech</p>
              <p className="text-red-600 text-xs font-semibold">Subsection: Shieldmaidens</p>
              <p className="text-gray-500 text-xs mt-1">Entertainment industry and Silicon Valley network.</p>
            </div>
          </div>
        </div>

        {/* Extended Circle */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Extended Circle</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-semibold">Claire</h3>
              <p className="text-sm text-gray-600">The Outsider-Insider</p>
              <p className="text-xs text-gray-500 mt-1">Chris's first love. Supplies intel from European networks. Catholic — connects to Vatican circles.</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold">Mandy</h3>
              <p className="text-sm text-gray-600">Beautiful & Wild</p>
              <p className="text-xs text-gray-500 mt-1">Bella's past. The one who helped her come out of her shell. Complicated but unforgettable.</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold">Grace</h3>
              <p className="text-sm text-gray-600">The Next Generation</p>
              <p className="text-xs text-gray-500 mt-1">Jasper and Elena's daughter. Adores the aunties. Learning the ways of Sapientia Minervae.</p>
            </div>
          </div>
        </div>

        {/* Members by Subsection */}
        <h2 className="text-2xl font-bold mb-4">Members by Subsection ({members.length} total)</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Shieldmaidens */}
          <div className="bg-white rounded-lg shadow border-t-4 border-red-500">
            <div className="p-4 border-b bg-red-50">
              <h3 className="text-lg font-bold text-red-800">Shieldmaidens ({subsectionGroups['Shieldmaidens'].length})</h3>
              <p className="text-xs text-red-600">Protectors • Defenders • Field Operators</p>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {subsectionGroups['Shieldmaidens'].map((member) => (
                <Link href={`/characters/${member.id}`} key={member.id}>
                  <div className="p-2 rounded hover:bg-red-50 border-l-2 border-red-300">
                    <div className="font-medium text-sm">{member.name}</div>
                    {member.wivesClubRole && <div className="text-xs text-gray-500">{member.wivesClubRole}</div>}
                  </div>
                </Link>
              ))}
              {subsectionGroups['Shieldmaidens'].length === 0 && (
                <p className="text-sm text-gray-400 italic">No members assigned</p>
              )}
            </div>
          </div>

          {/* Owls */}
          <div className="bg-white rounded-lg shadow border-t-4 border-amber-500">
            <div className="p-4 border-b bg-amber-50">
              <h3 className="text-lg font-bold text-amber-800">Owls ({subsectionGroups['Owls'].length})</h3>
              <p className="text-xs text-amber-600">Intelligence • Analysts • Strategists</p>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {subsectionGroups['Owls'].map((member) => (
                <Link href={`/characters/${member.id}`} key={member.id}>
                  <div className="p-2 rounded hover:bg-amber-50 border-l-2 border-amber-300">
                    <div className="font-medium text-sm">{member.name}</div>
                    {member.wivesClubRole && <div className="text-xs text-gray-500">{member.wivesClubRole}</div>}
                  </div>
                </Link>
              ))}
              {subsectionGroups['Owls'].length === 0 && (
                <p className="text-sm text-gray-400 italic">No members assigned</p>
              )}
            </div>
          </div>

          {/* Vestals */}
          <div className="bg-white rounded-lg shadow border-t-4 border-purple-500">
            <div className="p-4 border-b bg-purple-50">
              <h3 className="text-lg font-bold text-purple-800">Vestals ({subsectionGroups['Vestals'].length})</h3>
              <p className="text-xs text-purple-600">Tradition Keepers • Mentors • Elders</p>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {subsectionGroups['Vestals'].map((member) => (
                <Link href={`/characters/${member.id}`} key={member.id}>
                  <div className="p-2 rounded hover:bg-purple-50 border-l-2 border-purple-300">
                    <div className="font-medium text-sm">{member.name}</div>
                    {member.wivesClubRole && <div className="text-xs text-gray-500">{member.wivesClubRole}</div>}
                  </div>
                </Link>
              ))}
              {subsectionGroups['Vestals'].length === 0 && (
                <p className="text-sm text-gray-400 italic">No members assigned</p>
              )}
            </div>
          </div>
        </div>

        {/* Members by Location */}
        <h2 className="text-2xl font-bold mb-4">Members by Location Hub</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(locationGroups)
            .sort(([a], [b]) => {
              const order = ['Charlotte (The Forge)', 'DC / New York', 'Boston', 'London / Europe', 'Los Angeles', 'Other'];
              return order.indexOf(a) - order.indexOf(b);
            })
            .filter(([_, groupMembers]) => groupMembers.length > 0)
            .map(([location, groupMembers]) => {
              const locationColors: Record<string, string> = {
                'Charlotte (The Forge)': 'border-amber-500 bg-amber-50',
                'DC / New York': 'border-blue-500 bg-blue-50',
                'Boston': 'border-green-500 bg-green-50',
                'London / Europe': 'border-purple-500 bg-purple-50',
                'Los Angeles': 'border-orange-500 bg-orange-50',
                'Other': 'border-gray-400 bg-gray-50'
              };
              return (
                <div key={location} className={`bg-white rounded-lg shadow border-l-4 ${locationColors[location] || 'border-gray-400'}`}>
                  <div className={`p-3 ${locationColors[location]?.split(' ')[1] || 'bg-gray-50'}`}>
                    <h3 className="font-bold">{location} ({groupMembers.length})</h3>
                  </div>
                  <div className="p-3 space-y-1 max-h-64 overflow-y-auto">
                    {groupMembers.map((member) => (
                      <Link href={`/characters/${member.id}`} key={member.id}>
                        <div className="text-sm hover:text-blue-600">{member.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Members by Role Type */}
        <h2 className="text-2xl font-bold mb-4">Members by Role Type</h2>
        {Object.entries(typeGroups)
          .sort(([a], [b]) => {
            const order = ['Geographic Hub Leaders', 'Sports Media Circle', 'PR & Branding', 'External Advisors', 'Trophy Wives', 'Bubble Trophy Wives', 'General'];
            return order.indexOf(a) - order.indexOf(b);
          })
          .map(([group, groupMembers]) => (
            <div key={group} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">{group} ({groupMembers.length})</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupMembers.map((member) => (
                  <Link href={`/characters/${member.id}`} key={member.id}>
                    <div className="bg-white p-4 border rounded hover:shadow-md transition-shadow">
                      <h4 className="font-semibold">{member.name}</h4>
                      {member.nickname && (
                        <p className="text-sm text-gray-500">"{member.nickname}"</p>
                      )}
                      {member.archetype && (
                        <p className="text-sm text-blue-600 mt-1">{member.archetype}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        {/* Related Storylines */}
        {storylines.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Related Storylines ({storylines.length})</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {storylines.slice(0, 8).map((storyline) => (
                <Link href={`/storylines/${storyline.id}`} key={storyline.id}>
                  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h4 className="font-semibold">{storyline.title}</h4>
                    <p className="text-sm text-purple-600">{storyline.category}</p>
                    {storyline.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{storyline.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {storylines.length > 8 && (
              <p className="text-center text-gray-500 mb-8">
                + {storylines.length - 8} more storylines...
              </p>
            )}
          </>
        )}

        {/* Themes */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Themes of Sapientia Minervae</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Power Behind the Power</p>
              <p className="text-gray-600">Not just emotional support — a quiet intelligence network</p>
            </div>
            <div>
              <p className="font-semibold">Sisterhood + Rivalry</p>
              <p className="text-gray-600">Bonds tested by ego, weddings, motherhood, and past loves</p>
            </div>
            <div>
              <p className="font-semibold">Two Worlds Intersecting</p>
              <p className="text-gray-600">BSS boardrooms + Catholic elite dinners</p>
            </div>
            <div>
              <p className="font-semibold">Generational Growth</p>
              <p className="text-gray-600">Elena (mentor) → Addie (fixer) → Kendra (firebrand) → Grace (newbie)</p>
            </div>
            <div>
              <p className="font-semibold">The Three Paths</p>
              <p className="text-gray-600">Shieldmaidens (protection) + Owls (intelligence) + Vestals (tradition)</p>
            </div>
            <div>
              <p className="font-semibold">Wisdom of Minerva</p>
              <p className="text-gray-600">Strategic thinking, fierce protection, and sacred bonds — the goddess embodied</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
