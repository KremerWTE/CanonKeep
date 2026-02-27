import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function FunTimePage() {
  // Get storylines related to intimate moments
  const allStorylines = await prisma.storyline.findMany({
    orderBy: { title: 'asc' },
  });

  // Filter for intimate/fun time content
  const intimateStorylines = allStorylines.filter(s => {
    const content = (s.content || '').toLowerCase();
    const title = (s.title || '').toLowerCase();
    const desc = (s.description || '').toLowerCase();
    const themes = (s.themes || '').toLowerCase();

    return content.includes('intimate') ||
           content.includes('passion') ||
           content.includes('tension') ||
           content.includes('chemistry') ||
           title.includes('romance') ||
           title.includes('love') ||
           themes.includes('romance') ||
           themes.includes('passion');
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-pink-400">Fun Time</h1>
            <p className="text-gray-400 mt-1">Intimate moments, tension, and private encounters</p>
          </div>
          <Link href="/galas" className="text-pink-400 hover:underline">
            Back to Galas
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700 pb-4">
          <a href="#encounters" className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-500">
            Encounters
          </a>
          <a href="#tension" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500">
            Sexual Tension
          </a>
          <a href="#toys" className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500">
            Toys & Play
          </a>
          <a href="#dynamics" className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-500">
            Power Dynamics
          </a>
        </div>

        {/* ENCOUNTERS SECTION */}
        <section id="encounters" className="mb-12">
          <h2 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-sm">1</span>
            Encounters & Intimate Moments
          </h2>

          <div className="grid gap-4">
            {/* Addie's Inner Circle */}
            <div className="bg-gray-800 p-6 rounded-lg border border-pink-500/30">
              <h3 className="text-xl font-semibold text-pink-300">Addie's Inner Circle Connections</h3>
              <p className="text-gray-400 mt-2">The chaos coordinator's intimate bonds that keep the circle tight</p>

              <div className="mt-4 space-y-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-pink-200">Addie & Elena</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Sisterhood pushed to extremes. What started as mentorship evolved into something deeper.
                    Their connection is about trust, vulnerability, and understanding each other's burdens.
                    Late nights after galas when the masks come off.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-pink-200">Addie & Jasper</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Power and intensity. The boss-employee line crossed in moments of crisis and celebration.
                    Their encounters are charged with the weight of command - he leads everywhere,
                    but with Addie, the dynamic shifts.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-pink-200">Addie & Kendra</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Trust built through shared vulnerability. Their bond was the deepest - which is why
                    it hurt when Kendra got serious with Chris. The only real wound Addie carries
                    from the inner circle.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-pink-200">Addie & Selene</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    The wild card. Selene brings chaos that even Addie can't fully control.
                    Their encounters are unpredictable, intense, and leave both wondering who's really in charge.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-pink-200">Threesome: Addie, Elena & Jasper</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    The ultimate trust exercise. When the three most powerful people in BSS come together,
                    the power dynamics are electric. Elena and Addie sharing Jasper - or is he sharing them?
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-pink-200">Three-way: Addie, Kendra & Elena</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    The wives' inner sanctum. Three women who run different aspects of the BSS world
                    finding connection without the men. Sisterhood in its most intimate form.
                  </p>
                </div>
              </div>
            </div>

            {/* Selene's Throuple */}
            <div className="bg-gray-800 p-6 rounded-lg border border-pink-500/30">
              <h3 className="text-xl font-semibold text-pink-300">Selene's Throuple</h3>
              <p className="text-gray-400 mt-2">The unconventional relationship at the heart of Midnight Sun</p>

              <div className="mt-4 bg-gray-700/50 p-4 rounded">
                <p className="text-gray-300 text-sm">
                  Selene navigates a committed three-person relationship while working undercover for BSS.
                  One partner from her old life, one she meets through work. The dynamic provides emotional
                  anchor for dangerous work. Their intimate life is complicated by secrets, schedules, and
                  the constant threat of exposure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEXUAL TENSION SECTION */}
        <section id="tension" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">2</span>
            Sexual Tension & Unresolved Chemistry
          </h2>

          <div className="grid gap-4">
            <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold text-purple-300">Gala Tension Moments</h3>

              <div className="mt-4 space-y-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-200">The Dance Floor</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Eyes meeting across crowded ballrooms. Hands lingering too long during waltzes.
                    The electricity when certain partners dance - everyone notices but no one speaks.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-200">The Balcony Conversations</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Escaping the crowd for "fresh air." Champagne loosening tongues.
                    Confessions that would never happen inside. The almost-kiss that gets interrupted.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-200">The After-Party Glances</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    When the formal crowd leaves and only the inner circle remains.
                    Guards down, dresses loosened, real feelings surfacing through exhaustion and wine.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold text-purple-300">Workplace Tension</h3>

              <div className="mt-4 space-y-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-200">The Forge Late Nights</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Crisis mode at BSS headquarters. Adrenaline running high.
                    The charged moments when the mission is done and two people are alone in a war room.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-200">Mission Debrief Tension</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Coming down from danger. The need to feel alive manifesting as attraction.
                    Partners who fought together finding new meaning in "watching each other's back."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOYS & PLAY SECTION */}
        <section id="toys" className="mb-12">
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm">3</span>
            Toys & Playful Encounters
          </h2>

          <div className="grid gap-4">
            <div className="bg-gray-800 p-6 rounded-lg border border-red-500/30">
              <h3 className="text-xl font-semibold text-red-300">Private Collections</h3>
              <p className="text-gray-400 mt-2">What happens behind closed doors at the Palazzo and Compound</p>

              <div className="mt-4 space-y-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-red-200">The Palazzo's Secret Room</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Addie's estate has rooms that don't appear on any floor plan.
                    What the Patroness of Honor keeps private stays private.
                    Curated collections, soundproofed walls, complete discretion.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-red-200">Gifts Between Friends</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    The Wives Club exchanges more than recipes.
                    Discrete shopping trips. Recommendations whispered over wine.
                    The bonds of sisterhood extending into intimate life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POWER DYNAMICS SECTION */}
        <section id="dynamics" className="mb-12">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-sm">4</span>
            Power Dynamics & Control
          </h2>

          <div className="grid gap-4">
            <div className="bg-gray-800 p-6 rounded-lg border border-amber-500/30">
              <h3 className="text-xl font-semibold text-amber-300">Who's Really In Charge?</h3>

              <div className="mt-4 space-y-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-amber-200">Jasper & Elena</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    He commands BSS. She commands the social world. In private, they negotiate.
                    Sometimes he leads. Sometimes she does. The dance of equals who chose each other.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-amber-200">Hawk & Addie</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    The operator and the chaos coordinator. He's used to command in the field.
                    She runs an empire of relationships. Their private life is about surrender and trust -
                    taking turns being vulnerable.
                  </p>
                </div>

                <div className="bg-gray-700/50 p-4 rounded">
                  <h4 className="font-semibold text-amber-200">The Mentor Dynamic</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    When teaching becomes something more. The power of knowledge transferred intimately.
                    Lines blurred between guidance and desire. The student becoming the teacher.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Storylines */}
        {intimateStorylines.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Related Storylines</h2>
            <div className="grid gap-4">
              {intimateStorylines.slice(0, 10).map((story) => (
                <div key={story.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-gray-200">{story.title}</h3>
                  {story.description && (
                    <p className="text-gray-400 text-sm mt-1">{story.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Content is for story development purposes only.</p>
        </div>
      </div>
    </div>
  );
}
