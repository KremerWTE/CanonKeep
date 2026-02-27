import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Special Olympics Content...\n");

  // ========== UPDATE JAZZ CARTER ==========
  console.log("--- Updating Jazz Carter ---\n");

  const jazzData = {
    name: 'Jasmine "Jazz" Carter',
    firstName: 'Jasmine',
    lastName: 'Carter',
    nickname: 'Jazz',
    archetype: 'Special Olympics Champion Swimmer',
    age: 'Late teens to early 20s',
    hubLocation: 'Charlotte, NC',
    background: `Born and raised in Charlotte to a single mom who works two jobs. Diagnosed with autism and mild developmental delays, but found freedom in the water early on. Her mom enrolled her in swim classes to build confidence, and by 15 she was beating older swimmers in Special Olympics competitions.

Bella discovered Jazz at a local meet after moving to Charlotte and offered to coach her, sensing her raw, natural speed.

ACHIEVEMENT ARC:
- State Games: Jazz WINS gold in her freestyle event, strutting off the podium with her medal jangling
- National Games: Top 5 in the National Special Olympics Games, competing against the best from all states
- International Games: Selected for International Special Olympics in Brazil - not about winning, but the experience of representing her country, swimming on foreign soil, making friends from other nations

THE PATRIOT SWIMMER:
Jazz wears her Team USA gear like it was her college football team. She struts around in her jacket even at grocery stores, beaming when strangers ask where she competed.`,
    personality: `Bubbly, playful, loves music and will often sing or hum on the pool deck before races. Extremely affectionate - hugs everyone, including the BSS operators when she sees them at family events. Fiercely competitive in the water - when the race begins, the world disappears for her. Has endless optimism that draws people in; always the first to cheer for others.`,
    appearance: 'Athletic swimmer\'s build. Favorite outfit is her Team USA jacket paired with jeans and sneakers Grace helped pick out. Hairstyles Grace helped her practice.',
    relationships: `Bella - coach, calls her "the one who believed in me first"
Grace Barrett - assistant coach, style mentor, like a younger sister who became a guide
Evie Maren - "new favorite grown-up," loves her cooking classes
The core women - sponsor part of her training costs through the Palace of Honor Foundation`,
    fitnessSports: 'Freestyle & butterfly swimming. State champion, Top 5 National, International Games participant (Brazil)',
    reputationalNotes: `An emotional victory for her family, who never imagined she'd compete on a world stage. Beloved figure at both the gym and family events.

GRACE'S ASSISTANT COACHING:
Grace meets Jazz at 11 when Jazz is 16. Grace instantly attaches - carrying the stopwatch, clapping loudest, scribbling notes like she was Bella's assistant coach. Jazz treats Grace like a kid sister at first, but Grace steps into the role of guide, especially in style and social skills.

Grace once told Bella: "I have Addie, Kendra, and you as my big sisters. Not everyone is that lucky. So I want to spread that wealth — Jazz deserves sisters too."`,
    arcStart: 'Shy outside the pool, talented in the water',
    arcChange: 'Coached by Bella, mentored by Grace in style and social skills',
    arcEnd: 'Team USA International Games participant, walking taller, speaking with more confidence'
  };

  const jazz = await prisma.character.findFirst({
    where: { firstName: 'Jasmine', lastName: 'Carter' }
  });

  if (jazz) {
    await prisma.character.update({
      where: { id: jazz.id },
      data: jazzData
    });
    console.log('Updated: Jazz Carter');
  } else {
    const jazzByNickname = await prisma.character.findFirst({
      where: { nickname: 'Jazz' }
    });
    if (jazzByNickname) {
      await prisma.character.update({
        where: { id: jazzByNickname.id },
        data: jazzData
      });
      console.log('Updated: Jazz Carter (by nickname)');
    } else {
      await prisma.character.create({
        data: { projectId: project.id, ...jazzData, isConfirmed: true }
      });
      console.log('Created: Jazz Carter');
    }
  }

  // ========== UPDATE CLAIRE DONAHUE ==========
  console.log("\n--- Updating Claire Donahue ---\n");

  const claireData = {
    name: 'Claire Donahue',
    firstName: 'Claire',
    lastName: 'Donahue',
    archetype: 'Special Olympics Champion Bowler',
    age: 'Mid-20s to early 30s',
    hubLocation: 'Boston, MA',
    background: `Grew up in South Boston in a close-knit Irish-American family. Diagnosed with intellectual disabilities as a child; her parents encouraged her to find activities that built confidence. Discovered bowling at a community center league and fell in love with the rhythm of it.

When Bella lived in Boston, she volunteered with the Special Olympics program and was paired with Claire, who quickly latched onto her as both coach and role model.

ACHIEVEMENT ARC:
Bella traveled with Claire all the way to the Special Olympics World Games in Athens (then again later to Berlin), cheering so loudly the entire delegation knew who she was.

Has a "lucky pink wristband" she wears at every competition.`,
    personality: `Grounded, steady, fiercely determined. Quiet by nature, but once she warms up, her dry humor can leave everyone laughing. Loves rituals. Incredibly loyal to Bella; she calls her "Coach B" and still texts her updates years later.`,
    relationships: `Bella - coach, calls her "Coach B," sees her as a sister
Grace Barrett - idolizes her, often telling people that "Aunt Bella makes champions"
Harper's kids - become part of Claire's cheering section at competitions`,
    fitnessSports: 'Ten-pin Bowling. Special Olympics World Games competitor (Athens, Berlin)',
    reputationalNotes: `Claire sees Bella not just as a coach but as a sister. She knows Bella doubts herself and often reminds her: "Coach B, you're my lucky charm. You make me brave."`,
  };

  const claire = await prisma.character.findFirst({
    where: { firstName: 'Claire', lastName: 'Donahue' }
  });

  if (claire) {
    await prisma.character.update({
      where: { id: claire.id },
      data: claireData
    });
    console.log('Updated: Claire Donahue');
  } else {
    await prisma.character.create({
      data: { projectId: project.id, ...claireData, isConfirmed: true }
    });
    console.log('Created: Claire Donahue');
  }

  // ========== UPDATE BELLA WITH SPECIAL OLYMPICS DETAILS ==========
  console.log("\n--- Updating Bella ---\n");

  const bella = await prisma.character.findFirst({
    where: { name: { contains: 'Bella' } }
  });

  if (bella) {
    const bellaUpdate = {
      background: (bella.background || '') + `

SPECIAL OLYMPICS COACHING - THE COACH WHO NEVER LET GO:
Even with her crushing schedule — BSS analyst work, Elena's Maison Aurelia projects, her growing event company, and personal relationships — Bella never set aside her Special Olympics athletes. She often said coaching wasn't a side project, it was part of who she was.

SPORTS SHE COACHES:
- BOWLING (Boston): Her first Special Olympics team. Coached Claire Donahue, traveling with her to the Special Olympics World Games in Athens and Berlin.
- SWIMMING (Charlotte): After moving to Charlotte, discovered Jazz Carter at a local meet. Under Bella's guidance, Jazz qualified for international games.

WHY IT MATTERS:
Coaching gave Bella balance — when the BSS world was chaotic, her athletes kept her grounded. She often said her athletes taught her more about courage and perseverance than she ever taught them about sports.

Even on her busiest weeks, Bella carved out evenings for practices. The kids in the circle adore her athletes, often coming to practices to cheer or volunteer. Grace especially loves swimming alongside Jazz.

This is one of the deepest reasons people who know her well find her so beautiful - not in galas or deals, but in pools and lanes where someone overcomes fear and competition.`,
    };

    await prisma.character.update({
      where: { id: bella.id },
      data: bellaUpdate
    });
    console.log('Updated: Bella with Special Olympics details');
  }

  // ========== ADD SPECIAL OLYMPICS STORYLINES ==========
  console.log("\n--- Adding Special Olympics Storylines ---\n");

  const storylines = [
    {
      title: 'Grace as Assistant Coach - First Practice',
      category: 'Character Arc',
      description: 'Grace meets Jazz and becomes her assistant coach',
      content: `THE FIRST MEETING:
Grace is 11, Jazz is 16. Bella introduces Grace at a practice.

The humid air in the natatorium clung to Grace's hair, curling it into wisps. She sat cross-legged at the edge of the pool, clipboard balanced on her knees, mimicking Aunt Bella's way of jotting down split times.

"Grace, watch her turn at the wall," Bella said. "See how tight she tucks? That's why she's fast. Mark the lap."

Grace scribbled furiously. When Jazz popped up at the wall, gasping but grinning, Grace clapped so hard her hands stung. "You beat your last time by almost two seconds!"

THE MOMENT OF CHOICE:
On the bleachers, a few of Grace's classmates pointed and whispered, snickering at her for hanging out with "the Special Olympics girl" instead of sticking with them.

Grace flushed for half a second — but then Jazz waved at her from the water, still beaming, and the embarrassment dissolved.

Jazz climbed out, dripping and laughing. "Did I do good, Coach Grace?" she teased.

Grace puffed up, pretending to be all business. "You did excellent. But next time, chin tighter, legs straighter. I expect a gold medal pace."

Jazz giggled and pulled Grace into a soaking hug, drenching the clipboard. Grace squealed but didn't pull away.

BELLA'S REALIZATION:
From across the pool deck, Bella watched with quiet pride. Grace didn't care what the other kids thought. Maggie caught Bella's eye and whispered:

"See? That's your girl. She's not chasing the spotlight. She's building it for someone else."

And Bella realized: this was her legacy taking root — not in galas or deals, but in the pure joy of a child who believed in someone enough to stand by the pool, clipboard in hand, ignoring the laughter behind her.`,
      characters: JSON.stringify(['Grace Barrett', 'Jazz Carter', 'Bella', 'Maggie Donnelly'])
    },
    {
      title: 'Jazz Wins State Games',
      category: 'Character Arc',
      description: 'Jazz wins gold at State Games with the family cheering',
      content: `STATE GAMES - GOLD:
Jazz wins gold in her freestyle event, strutting off the podium with her medal jangling and her state team jacket zipped up like it was a superhero cape.

She wore her Team USA gear everywhere afterward — grocery stores, restaurants, anywhere someone might ask where she competed. She beamed every time.

BELLA'S PRIDE:
Bella sees this as one of her proudest moments. She knows how much work Jazz put in, and the State championship validates years of coaching sacrifice.

Grace, as assistant coach, is right there at every milestone — helping Jazz settle nerves, tracking split times, cheering louder than anyone.

JASPER'S OBSERVATION:
Jasper watches quietly, proud beyond words. Grace is proving herself not just as the daughter of leaders but as a leader in her own right — building someone else's spotlight instead of chasing her own.`,
      characters: JSON.stringify(['Jazz Carter', 'Bella', 'Grace Barrett', 'Jasper Barrett'])
    },
    {
      title: 'Jazz at International Games - Brazil',
      category: 'Character Arc',
      description: 'Jazz represents USA at International Special Olympics in Brazil',
      content: `INTERNATIONAL GAMES - BRAZIL:
Jazz is selected to participate in an International Special Olympics event in Brazil. It's not about winning, but about the experience:

- Representing her country on foreign soil
- Making friends from other nations
- Hearing other languages
- Carrying Charlotte pride to the global stage

THE PATRIOT SWIMMER:
Jazz wears her Team USA gear like it was her college football team. The entire BSS family tracks her progress from back home.

GRACE'S ROLE:
When Jazz goes to Brazil, Grace is with her as assistant coach — helping her settle nerves, helping her through jet lag, cheering her on. She learns logistics, encouragement, and how to manage pressure.

Grace once told Bella: "I have Addie, Kendra, and you as my big sisters. Not everyone is that lucky. So I want to spread that wealth — Jazz deserves sisters too."

THE LEGACY:
This is recognition beyond medals — Jazz is seen, celebrated, and carries the spirit of everyone who believed in her. The core women sponsored part of her training costs through the Palace of Honor Foundation, making them all part of this victory.`,
      characters: JSON.stringify(['Jazz Carter', 'Grace Barrett', 'Bella', 'Team USA'])
    },
    {
      title: 'Grace Mentors Jazz in Style',
      category: 'Character Arc',
      description: 'Grace teaches Jazz social skills and style outside the pool',
      content: `THE MENTORSHIP FLIP:
Grace is technically the "younger one" (11 vs Jazz's 16), but she consciously takes up the role of mentor — proving how much she absorbed from Addie, Kendra, and Bella.

WHAT GRACE TEACHES JAZZ:
- Style: Grace helps Jazz pair her beloved Team USA jacket with jeans and sneakers that look polished
- Hairstyles: Grace practices hairstyles with Jazz until she gets them right
- Social skills: Grace helps Jazz navigate conversation starters, thank-you notes, and carrying herself like a champion

THE IMPACT:
Jazz soaks it all up, not embarrassed but genuinely grateful. She starts showing up to meets looking sharper, walking taller, speaking with more confidence.

At practices, Grace keeps it light: "You've got the speed in the pool, but outside of it, I'll help you swim through life."

GRACE'S REFLECTION:
Grace once told Bella: "I have Addie, Kendra, and you as my big sisters. Not everyone is that lucky. So I want to spread that wealth — Jazz deserves sisters too."`,
      characters: JSON.stringify(['Grace Barrett', 'Jazz Carter', 'Bella', 'Addie', 'Kendra'])
    },
    {
      title: 'Claire at the World Games',
      category: 'Character Arc',
      description: 'Bella travels with Claire to the Special Olympics World Games',
      content: `SPECIAL OLYMPICS WORLD GAMES - ATHENS:
Bella travels to the Special Olympics World Games in Athens with Claire, staying with Claire's family and cheering her on.

She cheered so loudly the entire delegation knew who she was.

Claire, the quiet, steady bowler from South Boston, walked to her lane with her lucky pink wristband on. When she looked back at the crowd and saw Bella, she mouthed: "You make me brave."

BERLIN - AGAIN:
Later, Bella traveled again to Berlin for Claire's next competition. The ritual continued — the wristband, the determination, the moment before the roll when everything goes silent.

THE SISTER BOND:
Claire sees Bella not just as a coach but as a sister. She knows Bella doubts herself and often reminds her: "Coach B, you're my lucky charm."

Years later, Claire still texts Bella updates. Their bond transcends the sport.

RECOGNITION:
The core women, especially Harper's kids, become part of Claire's cheering section when they can. Grace idolizes her, often telling people that "Aunt Bella makes champions."`,
      characters: JSON.stringify(['Claire Donahue', 'Bella', 'Grace Barrett'])
    }
  ];

  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created storyline: ${storyline.title}`);
    } else {
      console.log(`Already exists: ${storyline.title}`);
    }
  }

  // ========== ADD SOFIA & EVIE FOUNDATION GALA ==========
  console.log("\n--- Adding Sofia & Evie Foundation Showcase ---\n");

  const showcaseGala = {
    name: 'Foundation Kids Showcase Gala (Sofia & Evie)',
    organization: 'Sofia & Evie Foundation / Strong & Savory',
    venue: 'Charlotte venue',
    location: 'Charlotte, NC',
    purpose: 'Showcase Special Olympics and foundation kids\' talents',
    dresscode: 'Formal',
    attendees: JSON.stringify(['Sofia', 'Evie Maren', 'Bella', 'Jazz Carter', 'Claire Donahue', 'Elena Barrett', 'Grace Barrett']),
    significance: `The culminating gala idea that Sofia and Evie created during their 8th late-night work session.

"We need something that brings people in, something that makes them feel the mission."
"What if we showcase the kids? Not just stories — let them perform, display art, speak for themselves."
"That's it. A gala by the kids, for the kids."

Special Olympics athletes and foundation students showcase their talents:
- Jazz performs in the pool demonstration
- Kids display art and cooking skills they learned through Strong & Savory
- Claire is invited as guest of honor from Boston

This is the merger of Sofia's foundation vision with Evie's Strong & Savory mission — showing that food, athletics, and art can all be pathways to empowerment.`,
    events: 'Kids perform, display art, demonstrate cooking. Evie and Sofia\'s vision realized.',
  };

  const existingShowcase = await prisma.gala.findFirst({
    where: { name: showcaseGala.name, projectId: project.id }
  });

  if (!existingShowcase) {
    await prisma.gala.create({
      data: { projectId: project.id, ...showcaseGala }
    });
    console.log('Created: Foundation Kids Showcase Gala');
  } else {
    console.log('Already exists: Foundation Kids Showcase Gala');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();
  const galaCount = await prisma.gala.count();

  console.log(`\nTotal storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total galas: ${galaCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
