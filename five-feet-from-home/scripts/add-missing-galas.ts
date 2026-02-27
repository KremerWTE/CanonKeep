import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Missing Galas...\n");

  const galas = [
    // ========== VETERANS DAY GALA ==========
    {
      name: 'Veterans Day Benefit Gala',
      organization: 'BSS / Jasper Barrett Foundation',
      venue: 'Charlotte Convention Center',
      location: 'Charlotte, NC',
      purpose: 'Veterans Day benefit, BSS public face event',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Elena', 'Addie', 'Hawk', 'Kendra', 'Chris', 'Evelyn', 'Marcus', 'Grace', 'Jasper', 'Lottie', 'Alex']),
      significance: `Major BSS public event. Red, white, and blue spotlights wash the exterior. String quartet plays as guests in tuxedos and gowns gather beneath glittering chandeliers.

The wives club arrives together - Elena leads in crimson, Addie in sharp black, Evelyn in midnight blue, Kendra (unknowingly pregnant) in navy. Grace trails as their "little princess."

Key moments:
- Hawk and Addie treat Grace as if she's theirs
- Hawk's former teammate teases them about Grace
- Chris & Kendra have side conversations with Jasper & Elena
- Evelyn & Marcus work the floor as professional power-couple
- Lottie manages seating charts flawlessly`,
      events: `Addie slips away with Grace to sneak cookies from catering.
After-gala wind-down at Elena's compound where Hawk mentions wanting kids with Addie.
Addie admits she suspects Kendra is pregnant.`,
    },

    // ========== SPANISH EMBASSY GALA ==========
    {
      name: 'Spanish Embassy Gala - Georgetown',
      organization: 'Spanish Embassy',
      venue: 'Spanish Embassy',
      location: 'Washington D.C. / Georgetown',
      purpose: 'Diplomatic event - Elena & Lena origin flashback',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Lena Ortiz', 'Elena Barrett (flashback)']),
      significance: `FLASHBACK - Georgetown Years, spring semester.

Elena (18, first-year) is working the coat check as part of her internship. Lena (22, senior, flawless in a black gown) spots her.

Elena (to herself): "God, I don't belong here."
Lena (approaching, amused): "You'll never belong if you keep hiding in the coat room."
Elena (startled): "I'm just… learning the ropes."
Lena (handing her a glass of champagne): "Lesson one — you don't learn from the sidelines. Walk with me."

By the end of the night, Elena had met three ambassadors' wives — her first step into the world Lena had mastered.`,
      events: 'Lena introduces Elena to ambassadors\' wives. Elena\'s launchpad into high society events.',
    },

    // ========== D.C. DEFENSE CONTRACTOR GALA ==========
    {
      name: 'D.C. Defense Contractor Gala',
      organization: 'Defense Contractor Client',
      venue: 'Washington D.C. venue',
      location: 'Washington D.C.',
      purpose: 'Defense industry networking - Addie\'s My Fair Lady debut',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Addie', 'Jasper', 'Elena', 'Harper', 'Riley']),
      significance: `Addie's "My Fair Lady" debut - her transformation from hippie stoner to warrior goddess is complete.

Six months into her time at BSS. Addie arrives in a gown Elena chose, Harper's lessons etched in her movements, Riley's structure guiding her prep.

At first, she's overlooked. Then she speaks — one sharp, perfectly timed line that silences a table of executives.

Jasper, watching from across the room, realizes she's not the assistant anymore — she's his future number two.

Even Jasper paused, seeing not the assistant — but his future number two.`,
      events: 'Addie\'s transformation debut. Jasper recognizes her potential.',
    },

    // ========== PARIS GALA (ISABELLA) ==========
    {
      name: 'Paris Gala - Weapons Broker Op',
      organization: 'European diplomatic/social event',
      venue: 'Paris ballroom',
      location: 'Paris, France',
      purpose: 'BSS operation - Isabella tracking weapons broker',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Isabella Marquez']),
      significance: `BSS operational gala. Isabella drifts through the ballroom in a floor-length emerald gown, hair pinned elegantly, champagne in hand.

To the guests, she's just another diplomat's daughter. In reality, she's tracking a weapons broker across the room.

When he excuses himself, she slips after him — heels silent, expression calm. Moments later, in the shadow of a marble hallway, she's got him pinned against the wall, silenced pistol pressed under his chin.

"You'll walk back inside and smile. And you'll give me everything on the Belgrade shipment."`,
      events: 'Isabella neutralizes weapons broker threat.',
    },

    // ========== FOUNDATION KIDS SHOWCASE GALA ==========
    {
      name: 'Foundation Kids Showcase Gala',
      organization: 'Sofia & Evie Foundation',
      venue: 'Charlotte venue',
      location: 'Charlotte, NC',
      purpose: 'Showcase Special Olympics and foundation kids\' talents',
      dresscode: 'Formal',
      attendees: JSON.stringify(['Sofia', 'Evie', 'Bella', 'Jazz', 'Claire', 'Elena', 'Grace']),
      significance: `The culminating gala idea that Sofia and Evie created during their 8th late-night work session.

"We need something that brings people in, something that makes them feel the mission."
"What if we showcase the kids? Not just stories — let them perform, display art, speak for themselves."
"That's it. A gala by the kids, for the kids."

Special Olympics athletes and foundation students showcase their talents. Jazz performs in the pool. Kids display art and cooking skills.`,
      events: 'Kids perform, display art, speak for themselves. Evie and Sofia\'s vision realized.',
    },

    // ========== MADRID GALA (ELENA'S FIRST BIG BREAK) ==========
    {
      name: 'Madrid Society Gala',
      organization: 'Madrid high society',
      venue: 'Madrid venue',
      location: 'Madrid, Spain',
      purpose: 'Elena\'s first "big break" gala, launched by Lena\'s connections',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Elena Barrett', 'Lena Ortiz']),
      significance: `Elena's first major gala success, 8 years before main story.

Lena had told Elena at a Georgetown café: "They will hire you if they think you're already part of the inner circle. Come with me to Madrid next month. I'll introduce you to the right people."

Elena's first "big break" gala in Madrid had Lena's fingerprints all over it. This launched Elena's event planning empire and connected her to European high society.`,
      events: 'Elena\'s event planning career launched. Lena\'s connections open doors.',
    },

    // ========== GALA PREP SCENE ==========
    {
      name: 'Charlotte Gala - Pregnancy Foreshadow',
      organization: 'Charlotte event',
      venue: 'Charlotte venue',
      location: 'Charlotte, NC',
      purpose: 'Gala prep scene where Kendra doesn\'t realize she\'s pregnant',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Addie', 'Elena', 'Evelyn', 'Kendra', 'Grace']),
      significance: `Dressing room scene at Elena's mountain compound, hours before the gala.

Kendra stands in front of the mirror in a fitted navy gown, fussing with the straps. "I swear this dress shrunk. I've been bloated for weeks." She laughs it off.

Meanwhile, Addie privately confesses to Elena her fear of losing herself to motherhood. Grace (7) helps the women get ready, clutching hairpins like treasure.

Elena throws a knowing look to Evelyn - they both suspect what Kendra doesn't know yet.`,
      events: 'Addie confesses fear of motherhood. Kendra unknowingly pregnant. Grace helps with prep.',
    },

    // ========== ART BASEL GALA ==========
    {
      name: 'Art Basel Gala - Miami',
      organization: 'Art Basel / Casino Gallery',
      venue: 'Miami Beach Convention Center',
      location: 'Miami Beach, FL',
      purpose: 'Art world event - connects to BSS crisis "Gallery" and fake art sting',
      dresscode: 'Black tie',
      attendees: JSON.stringify(['Addie', 'Serena Ward', 'Hawk', 'Colt', 'Security team']),
      significance: `High-profile art world event during Art Basel week.

Connected to BSS crises:
- GALLERY: Cartel assassination attempt at Art Basel threatens high-profile clients
- MASTERPIECE: Luxury casino gallery selling forgeries to international clients

Art specialists, diplomats, and royalty in attendance. BSS provides security and handles any incidents quietly.`,
      events: 'Art Basel week operations. BSS handles security and crisis management.',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const gala of galas) {
    const existing = await prisma.gala.findFirst({
      where: { name: gala.name, projectId: project.id }
    });

    if (existing) {
      await prisma.gala.update({
        where: { id: existing.id },
        data: gala
      });
      console.log(`Updated: ${gala.name}`);
      updated++;
    } else {
      await prisma.gala.create({
        data: {
          projectId: project.id,
          ...gala,
        }
      });
      console.log(`Created: ${gala.name}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.gala.count();
  console.log(`Total galas: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
