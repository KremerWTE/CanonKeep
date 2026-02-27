import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Flashbacks & Storylines...\n");

  // ========== LENA ORTIZ CHARACTER ==========
  const lena = await prisma.character.findFirst({
    where: { firstName: 'Lena', lastName: 'Ortiz' }
  });

  if (!lena) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Lena Ortiz',
        firstName: 'Lena',
        lastName: 'Ortiz',
        archetype: 'Diplomatic Society Connector / Elena\'s Mentor',
        education: 'Georgetown University (4 years ahead of Elena)',
        hubLocation: 'Madrid / Washington D.C. / Paris',
        wivesClubRole: 'Core Circle - Diplomatic Connections',
        background: `Georgetown University graduate, 4 years older than Elena. Comes from diplomatic background with European cosmopolitan connections.

When Elena was first branching out into events (before Jasper's empire took off), she met Lena in D.C. through embassy circles. Elena had the style and charm but not the high-society access or credibility yet. Lena — with her diplomatic background and global family connections — introduced her to Madrid, Paris, and Rome society contacts who became Elena's first major clients.

FLASHBACK - Georgetown Years:
Setting: Spanish Embassy Gala, spring semester. Elena (18, first-year) is working the coat check as part of her internship. Lena (22, senior, flawless in a black gown) spots her.
Elena (to herself): "God, I don't belong here."
Lena (approaching, amused): "You'll never belong if you keep hiding in the coat room."
Elena (startled): "I'm just… learning the ropes."
Lena (handing her a glass of champagne): "Lesson one — you don't learn from the sidelines. Walk with me."
By the end of the night, Elena had met three ambassadors' wives — her first step into the world Lena had mastered.

FLASHBACK - Starting the Company (8 years ago):
Setting: A Georgetown café. Elena has sketches of gala layouts, but her contact list is short. Lena flips through, sipping tea.
Elena: "It's good, but no one's going to hire a newcomer for a $100K gala."
Lena (smiling): "They will if they think you're already part of the inner circle. Come with me to Madrid next month. I'll introduce you to the right people."
Elena: "And why would you do that?"
Lena: "Because, darling, I'm tired of dull embassy parties. And you? You're not dull."
Fast forward: Elena's first "big break" gala in Madrid had Lena's fingerprints all over it.`,

        personality: 'European poise, diplomatic Rolodex, natural calm. Elegant without being cold. Sees talent and potential before others do.',
        appearance: 'Flawless in formal wear. Sophisticated, cosmopolitan style.',
        relationships: `Elena Barrett - mentee, introduced to high society, directly tied to Elena's origin story and rise.

That bond is why Elena insists Lena belongs at the core of the wives club.

Elena = Southern polish, Catholic family grace, and entrepreneurial hustle.
Lena = European poise, diplomatic Rolodex, natural calm.
Together, they blended elegance + influence that created Elena's event empire.`,

        modeledAfter: 'Cosmopolitan diplomatic society connector',
        sourceFiles: 'New character creation',
        isConfirmed: true,
      }
    });
    console.log('Created: Lena Ortiz');
  } else {
    console.log('Exists: Lena Ortiz');
  }

  // ========== UPDATE ELENA WITH LENA CONNECTION ==========
  const elena = await prisma.character.findFirst({
    where: { firstName: 'Elena' }
  });

  if (elena) {
    const currentBackground = elena.background || '';
    const currentRelationships = elena.relationships || '';

    if (!currentBackground.includes('Lena')) {
      await prisma.character.update({
        where: { id: elena.id },
        data: {
          background: currentBackground + `

LENA ORTIZ CONNECTION (Mentor & Big Sister):
Met Lena at Georgetown - Spanish Embassy Gala during first year. Lena (22, senior) pulled Elena from the coat check and introduced her to ambassadors' wives.

Lena = 4 years older Georgetown mentor, cosmopolitan and elegant. She's directly tied to Elena's origin story and rise. Their connection explains Lena's anchor position in the wives club.

8 years ago, Lena introduced Elena to Madrid/Paris/Rome society contacts who became her first major clients when starting her event company.`,

          relationships: currentRelationships + `

Lena Ortiz - Georgetown mentor (4 years older), introduced Elena to high society, directly enabled her event company success. "Big sister" in the wives club.`,
        }
      });
      console.log('Updated: Elena with Lena connection');
    }
  }

  // ========== ADDIE TRANSFORMATION STORY ==========
  const addie = await prisma.character.findFirst({
    where: { firstName: 'Addie' }
  });

  if (addie) {
    const currentBackground = addie.background || '';

    if (!currentBackground.includes('hippie stoner')) {
      await prisma.character.update({
        where: { id: addie.id },
        data: {
          background: currentBackground + `

TRANSFORMATION STORY - "Hippie to Warrior Goddess" (Year One at BSS):

BEFORE BSS (Pre-Office Assistant):
Addie was hyper-intelligent but unpolished. She lived like a hippie stoner → thrift-store clothes, hair in messy braids, oversized hoodies, bare feet whenever possible. Brilliant on paper — sharp memory, analytical mind — but came across as chaotic, disorganized, "too much."

JASPER'S FLASHBACK - Why He Hired Her:
Three weeks earlier at a late-night policy symposium in D.C. — she'd cornered a defense contractor in the lobby, challenging him on a supply chain model she'd overheard. Within five minutes, she'd dismantled his entire argument with nothing but a hotel notepad and a borrowed pen. No credentials. No filter. Just raw, surgical brilliance.
That moment stuck with Jasper. He didn't need another polished Ivy grad — he had plenty. He needed someone who could see the angles no one else could.

YEAR ONE - THE OFFICE ASSISTANT ERA:

RILEY'S Influence (Discipline & Professionalism):
Riley, the pragmatic office manager, became her first "trainer." He taught her how to:
- Build and control schedules with precision
- Present information crisply, no rambling
- Show up on time, dressed for the room she was entering
Riley's approach: Tough love. He pushed back hard on her chaotic tendencies until she started to self-correct.

HARPER's Influence (Strategic Thinking):
Harper taught her:
- How to see beyond the surface of a problem
- To anticipate what a client needed before they asked
- How to think like a fixer, not just an assistant
Harper's lesson: "You don't win by being the smartest — you win by seeing what's coming before it arrives."

ELENA's Influence (Elegance & Social Savvy):
Elena rounded out the transformation by teaching Addie how to own rooms socially. Introduced her to:
- High-end fashion basics (fitted dresses, neutral palettes, statement jewelry)
- Hair and makeup as professional polish, not vanity
- The art of small talk and charm at galas and dinners
Elena's lesson: "Charm opens doors that intelligence alone cannot."

THE TRANSFORMATION MOMENT:
Within a year, Addie went from the rough, rugged hippie stoner to warrior goddess mode. Like My Fair Lady, Addie never looked back.`,

          arcStart: 'Brilliant but unpolished hippie stoner - chaotic genius with no filter',
          arcChange: 'Year one at BSS - shaped by Riley (discipline), Harper (strategy), Elena (elegance)',
          arcEnd: 'Warrior goddess mode - polished, commanding, strategic powerhouse',
        }
      });
      console.log('Updated: Addie with transformation story');
    }
  }

  // ========== ADD FLASHBACK EVENTS ==========
  const flashbackEvents = [
    {
      name: 'Lena & Elena First Meeting - Spanish Embassy Gala',
      description: `Setting: Spanish Embassy Gala, spring semester at Georgetown. Elena (18, first-year) is working the coat check as part of her internship. Lena (22, senior, flawless in a black gown) spots her.

Elena (to herself): "God, I don't belong here."
Lena (approaching, amused): "You'll never belong if you keep hiding in the coat room."
Elena (startled): "I'm just… learning the ropes."
Lena (handing her a glass of champagne): "Lesson one — you don't learn from the sidelines. Walk with me."

By the end of the night, Elena had met three ambassadors' wives — her first step into the world Lena had mastered.`,
      timelineRef: 'Georgetown Years - Elena first year',
      consequences: 'Lena becomes Elena\'s mentor and gateway to high society',
    },
    {
      name: 'Lena & Elena - Georgetown Café Planning',
      description: `Setting: A Georgetown café, 8 years ago. Elena has sketches of gala layouts, but her contact list is short. Lena flips through, sipping tea.

Elena: "It's good, but no one's going to hire a newcomer for a $100K gala."
Lena (smiling): "They will if they think you're already part of the inner circle. Come with me to Madrid next month. I'll introduce you to the right people."
Elena: "And why would you do that?"
Lena: "Because, darling, I'm tired of dull embassy parties. And you? You're not dull."

Fast forward: Elena's first "big break" gala in Madrid had Lena's fingerprints all over it.`,
      timelineRef: '8 years before main story',
      consequences: 'Elena\'s event company launched with Lena\'s connections',
    },
    {
      name: 'Addie Hired - Defense Contractor Confrontation',
      description: `Jasper's flashback to why he hired Addie:

Three weeks earlier at a late-night policy symposium in D.C. — Addie had cornered a defense contractor in the lobby, challenging him on a supply chain model she'd overheard. Within five minutes, she'd dismantled his entire argument with nothing but a hotel notepad and a borrowed pen. No credentials. No filter. Just raw, surgical brilliance.

That moment stuck with Jasper. He didn't need another polished Ivy grad — he had plenty. He needed someone who could see the angles no one else could.`,
      timelineRef: 'Before Addie\'s Year One at BSS',
      consequences: 'Jasper hires Addie despite her rough appearance',
    },
    {
      name: 'Addie First Day at BSS',
      description: `Addie arrives at BSS office for first time. Jasper barely glances up from behind her during her interview. Too rough, too unpolished, too strange. But he remembered exactly why he'd hired her.

Riley led her toward her desk. Addie glanced around the office like she was casing it, eyes darting over files, screens, whiteboards. She was already studying. Already working.

Within an hour, Riley dropped a pile of scheduling conflicts on her desk, more as a test than an assignment.`,
      timelineRef: 'Year One - Day One',
      consequences: 'Beginning of Addie\'s transformation journey',
    },
    {
      name: 'Nate & Jasper First Meeting - Telemetry Glitch',
      description: `Jasper first met Nate when a defense client's classified payload on a Falcon 9 launch risked exposure from a telemetry glitch. Nate quietly worked with Jasper to cover the math errors, saving both the client and the mission.

Since then, Nate's become Jasper's off-the-books aerospace consigliere. When BSS cases touch space (satellite collisions, cyberattacks on launches, corporate sabotage, orbital disputes), Nate is who Jasper calls.`,
      timelineRef: 'Before main story',
      consequences: 'Nate becomes Jasper\'s aerospace consultant for BSS',
    },
  ];

  for (const event of flashbackEvents) {
    const existing = await prisma.event.findFirst({
      where: { name: event.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.event.create({
        data: {
          projectId: project.id,
          ...event,
          tags: JSON.stringify(['flashback', 'backstory']),
        }
      });
      console.log(`Created flashback event: ${event.name}`);
    } else {
      console.log(`Exists: ${event.name}`);
    }
  }

  // ========== ALEX WHITMORE - THE LOGAN TYPE ==========
  const alex = await prisma.character.findFirst({
    where: { firstName: 'Alexander', lastName: 'Whitmore' }
  });

  if (!alex) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Alexander "Alex" Whitmore',
        firstName: 'Alexander',
        lastName: 'Whitmore',
        nickname: 'Alex',
        archetype: 'Old Money Media Heir / The Logan Huntzberger Type',
        education: 'Georgetown University',
        hubLocation: 'Boston / Washington D.C.',
        background: `Heir to a Boston publishing + media empire, old money New England family. Georgetown educated. Polished prep-school handsome — tailored suits, messy-yet-intentional hair, always with a smirk.

Charismatic, wealthy, a little reckless, but with charm and connections that make him both useful and complicated.

Useful connector when BSS needs a media leak or spin run through private channels. Natural bridge to Boston's Catholic elite - connects to Chris Donnelly's world.`,
        personality: 'Charming, reckless, useful but complicated. The kind of man who could be an "almost-flame" for Addie during her pre-Hawk phase — someone she found intoxicating but ultimately too unstable.',
        appearance: 'Polished prep-school handsome — tailored suits, messy-yet-intentional hair, always with a smirk.',
        relationships: `Could easily fit into Elena's social events - Lena likely knew him from Georgetown circles.

Addie's Orbit: Could be an "almost-flame" for Addie during her pre-Hawk phase.

Chris Donnelly connection through Boston Catholic elite circles.`,
        modeledAfter: 'Logan Huntzberger (Gilmore Girls)',
        sourceFiles: 'New character creation',
        isConfirmed: true,
      }
    });
    console.log('Created: Alexander "Alex" Whitmore');
  } else {
    console.log('Exists: Alexander Whitmore');
  }

  console.log("\nFlashbacks and storylines added!");

  const charCount = await prisma.character.count();
  const eventCount = await prisma.event.count();
  console.log(`Total characters: ${charCount}`);
  console.log(`Total events: ${eventCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
