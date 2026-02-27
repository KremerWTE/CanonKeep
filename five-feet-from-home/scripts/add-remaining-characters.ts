import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Remaining Characters from New Character Creation Doc...\n");

  const characters = [
    // ========== DEREK CALLAHAN ==========
    {
      name: 'Derek Callahan',
      firstName: 'Derek',
      lastName: 'Callahan',
      archetype: 'Sports & Entertainment Fixer / Former NHL Player',
      education: 'Professional NHL career (Boston Bruins)',
      hubLocation: 'Boston, MA',
      bssRole: 'Part-time Sports & Entertainment Fixer',
      background: `Former defenseman for the Boston Bruins. Played 10 seasons before injuries forced early retirement. Known as a tough, smart, "locker room leader" type, not just raw talent.

After retiring, transitioned into sports management and representation. Represents a mix of NHL players, MLS athletes, and MLL stars. His firm is boutique — high touch, high trust, limited roster.

MLS & MLL Ties: Expanded into soccer and lacrosse by leveraging Boston's sports network. Known for handling messy situations quietly.

BSS ENTRY:
Jasper noticed Derek during a high-profile NHL star's offshore tax scandal. Derek impressed by staying calm under fire and keeping his player out of the press. Eventually pulled in as part-time "sports & entertainment" fixer for BSS, bridging the firm into athlete crises, league scandals, and sponsorship conflicts.

Still runs his sports management firm, but wears a second hat at BSS — often looping Addie or Kendra into celebrity/athlete cases.

VIGNETTE:
Setting: Vegas. An MLS star caught on camera trashing a casino suite. Season opener in 3 days.
Derek's on phone: "Your money's frozen, your agent's useless, and ESPN's about to run the footage. So you're going to sit down, shut up, and let me work."
Addie steps in: "And what about the casino's PR director who's about to leak this to ESPN?"
Derek smirks: "That's why I called you."
Together, they cut a deal: Addie silences the casino, Derek spins the player's image, and BSS gets its first foothold in MLS crises.`,
      personality: 'Charismatic & Smooth. Can talk to anyone — athletes, agents, billionaires, board members. Loyal, genuinely cares about his clients. Fixer-in-training, sometimes too empathetic. Locker-room sharp humor.',
      appearance: 'Ex-athlete build, sharp in designer suits. Charismatic smile, presence that fills a room.',
      modeledAfter: 'Spencer Strasmore (Ballers) with NHL pedigree',
      relationships: 'Boston roots → natural overlap with Chris and his Boston firefighter/lawyer friends. Works with Addie and Kendra on celebrity/athlete cases.',
      sourceFiles: 'New character creation',
    },

    // ========== ETHAN CROSSWELL ==========
    {
      name: 'Ethan Crosswell',
      firstName: 'Ethan',
      lastName: 'Crosswell',
      archetype: 'Budding Fixer / Former Army Medic',
      education: 'Army Medic training, ER crisis management',
      hubLocation: 'Charlotte, NC / Boston, MA',
      bssRole: 'Budding Fixer (Addie\'s mentee)',
      background: `Former Army medic turned ER crisis manager who pivoted into private crisis consulting. Knows pressure, triage, and messy decision-making.

Still "green" in the fixing world, but his instincts make him dangerous. Addie occasionally mentors (and sometimes bullies) him. He admires her, but his moral compass is straighter — often pushes back when she goes too dark.

Forces Addie to step into a mentor role she never imagined.`,
      personality: 'Sharp, intuitive, sees patterns fast. Bit of a rogue streak — doesn\'t always follow Jasper\'s playbook. Moral compass straighter than Addie\'s.',
      modeledAfter: 'Conrad Hawkins (The Resident)',
      relationships: 'Addie\'s mentee. Pushes back when she goes too dark.',
      sourceFiles: 'New character creation',
    },

    // ========== JESSICA MARLOWE ==========
    {
      name: 'Jessica Marlowe',
      firstName: 'Jessica',
      lastName: 'Marlowe',
      archetype: 'Jasper\'s Mentor / Corporate Crisis CEO',
      education: 'White House communications background',
      hubLocation: 'Washington, D.C.',
      bssRole: 'Mentor / Strategic Advisor',
      background: `Former senior White House communications chief turned corporate crisis CEO-for-hire. She mentored Jasper early when he was building BSS, teaching him power optics, strategy, and leverage.

Knows everyone in D.C. worth knowing. Where Jasper is charming and Brad Pitt–like, Jessica is the chess master who plays three boards at once.

Not in medicine, but her arc mirrors the female surgeon who becomes CEO in The Resident — rising through cutthroat environments, balancing idealism with pragmatism.

Jasper's north star (and sometimes shadow). Keeps him sharp and challenges Addie indirectly.`,
      personality: 'Elegant, commanding, ruthless when needed — but projects warmth in public. Chess master who plays three boards at once.',
      modeledAfter: 'Dr. Bell/CEO arc from The Resident',
      relationships: 'Jasper\'s mentor. Challenges Addie indirectly.',
      sourceFiles: 'New character creation',
    },

    // ========== ISABELLA "ISA" MARQUEZ ==========
    {
      name: 'Isabella "Isa" Marquez',
      firstName: 'Isabella',
      lastName: 'Marquez',
      nickname: 'Isa',
      archetype: 'European Field Operator / NATO Intel',
      education: 'Spanish Army Special Operations Group (MOE), NATO Intelligence',
      hubLocation: 'Boston, MA / Madrid, Spain / Europe',
      bssRole: 'Field Operator - Europe/Boston Bridge',
      background: `Born in Madrid, Spain, raised between Spain and Boston after her mother remarried an American diplomat.

Joined the Spanish Army Special Operations Group (MOE) before transitioning into intelligence. Recruited by NATO intelligence as liaison officer, fluent in Spanish, English, French, and Italian.

Pulled into BSS when Addie's network expanded into Europe. Jasper found her for BSS.

UNIQUE TENSION:
- Recruited by Jasper → she owes her spot to him, not Addie
- Tension with Addie → Addie respects her but worries about Jasper's motives, and Isa doesn't always show deference
- Tension with Serena Ward → in Europe they overlap often, creating rivalry between Isa's youth/charm and Serena's experience/polish

VIGNETTE:
Setting: A gala in Paris.
Isabella drifts through the ballroom in floor-length emerald gown, hair pinned elegantly, champagne in hand. To guests, she's just another diplomat's daughter.
In reality, she's tracking a weapons broker across the room.
When he excuses himself, she slips after him — heels silent, expression calm. Moments later, in the shadow of a marble hallway, she's got him pinned against the wall, silenced pistol pressed under his chin.
"You'll walk back inside and smile," she says coolly. "And you'll give me everything on the Belgrade shipment."`,
      personality: 'Glamorous but lethal. Boston anchor for BSS European operations.',
      appearance: 'Floor-length gowns at galas, tactical gear in the field. Effortlessly switches between diplomat\'s daughter and operator.',
      wardrobeStyle: 'Leather jackets in Boston, gowns in Europe, tactical blacks in the field.',
      modeledAfter: 'Ana de Armas (Ghosted – Sadie Rhodes)',
      relationships: 'Jasper-recruited. Tension with Addie and Serena Ward.',
      sourceFiles: 'New character creation',
    },

    // ========== DARIUS COLE ==========
    {
      name: 'Darius Cole',
      firstName: 'Darius',
      lastName: 'Cole',
      nickname: 'Echo',
      archetype: 'Delta Force HUMINT Specialist',
      education: 'Delta Force (CAG), advanced comms and HUMINT training',
      hubLocation: 'Global / Africa / Middle East',
      bssRole: 'Shadow Network Builder',
      background: `Former Delta Force (CAG) operator with comms, HUMINT, and surveillance specialty.

Known for ability to blend anywhere — African slums, European embassies, Middle Eastern deserts. The "grey man" asset.

Works with Nikolai (Volk) to establish Jasper's shadow networks — blending fieldcraft, analysis, and covert charm.

VIGNETTE:
Setting: Istanbul, a crowded bazaar.
Darius blends into the crowd — worn jacket, local scarf, nothing marking him as American. He buys spices, chats with vendors, never rushes.
A contact passes him a phone. No words, no eye contact.
By sundown, he's sent the intel to BSS — and no one in the bazaar remembers a single thing about him.`,
      personality: 'Grey man. Blends anywhere. Smooth operator who thrives in being overlooked.',
      appearance: 'Worn jacket, local attire depending on region. Unremarkable until you look twice.',
      modeledAfter: 'Charles Grey (The Unit)',
      relationships: 'Works with Nikolai Drazen (Volk) on shadow network building.',
      sourceFiles: 'New character creation',
    },

    // ========== SARA (ELENA'S SISTER) ==========
    {
      name: 'Sara Barrett',
      firstName: 'Sara',
      lastName: 'Barrett',
      archetype: 'Elena\'s Sister / Family Anchor',
      hubLocation: 'Charlotte, NC / Near Elena\'s compound',
      wivesClubRole: 'Extended Circle - Family',
      background: `Elena's sister. Not married to a BSS operator, but her proximity and kids make her essential to the wives club circle.

Brings her own kids (same ages as Grace & Clara, some older) into the circle → giving the kids a wider cousin-like network.

Helps ground Elena in family life, while adding warmth and energy to the wives club.

SCENE - Sara Joins the Wives Club:
The long table at Elena's compound is filled with fresh bread, fruit, and coffee. Evelyn is mid-story about Duke's latest outbreak prep drill when Sara enters with a casserole dish and a grin.

"Am I late?"

Elena stands, pulling her sister into a hug. "Right on time. We were just about to start judging Evelyn's hospital stories."

Sara laughs, sets the dish down. Her eyes sweep the table — Addie sharp and watchful at the end, Evelyn warm but commanding, Kendra leaning back with knowing smile.

Addie smirks. "This the famous Sara? Elena keeps threatening to invite you."

Sara grins, sliding into a chair. "Threatening? She practically blackmailed me with pictures from Christmas '09."

The women laugh. Evelyn points toward the kitchen. "Coffee's fresh. Spill the casserole gossip first."

Sara warms immediately to the energy — the sharpness, the humor, the quiet strength in each woman's posture.

Addie leans forward. "So, Sara — what's the wildest thing Elena's ever done that she'd murder you for telling?"

Sara glances at her sister. Elena's eyes narrow. "Don't you dare."

Sara grins wider. "Well, there was this incident in college with a mariachi band and a senator's son…"`,
      personality: 'Warm, lively, maternal. Brings family perspective the others sometimes miss. Reminds Evelyn, Elena, and Addie it\'s not always about shadow wars, but about kids, school, and everyday life.',
      relationships: 'Elena\'s sister. Kids integrate with Grace, Clara, Gabriel, Lucas.',
      sourceFiles: 'New character creation',
    },

    // ========== CHARLOTTE "LOTTIE" WHITMORE ==========
    {
      name: 'Charlotte "Lottie" Whitmore',
      firstName: 'Charlotte',
      lastName: 'Whitmore',
      nickname: 'Lottie',
      archetype: 'Alex Whitmore\'s Wife / Ivy Society Anchor',
      education: 'Princeton University (American Studies/Art History)',
      hubLocation: 'Boston, MA',
      wivesClubRole: 'Extended Circle - High Society',
      background: `Wife of Alexander "Alex" Whitmore (the Logan Huntzberger type).

Princeton graduate — American Studies & Art History. Worked at a major auction house in NYC before marrying Alex. Her Ivy polish and understated confidence make her an asset at galas, museum fundraisers, and art circles.

Unlike Alex (reckless, charm-forward), Charlotte is grounded, strategic, and quietly commanding. She keeps Alex in line socially ("If he has no free time, he has no time to misbehave") while running her own charitable and cultural boards.

In the wives club, she's respected not for flash, but for the network and composure she brings.

SCENE - Veterans Day Gala:
Charlotte glides through the ballroom at Alex's side, her dusty rose gown fitted to perfection. A senator approaches. Alex is about to speak, but Charlotte gently cuts in:

"Senator, so wonderful to see you. I believe you know my husband — and his attention span. But please, let's talk about your vote on the cultural endowment…"

The wives club watches, impressed. That's power — wearing a gown and steering a senator without raising her voice.`,
      personality: 'Grounded, strategic, quietly commanding. The anchor that makes Alex viable in elite circles. Ivy polish without arrogance.',
      appearance: 'Dusty rose gowns, fitted perfection. Understated confidence.',
      modeledAfter: 'High-society Ivy anchor type',
      relationships: 'Married to Alexander "Alex" Whitmore. Secures her place in wives club.',
      sourceFiles: 'New character creation',
    },

    // ========== GRACE BARRETT (ELENA'S DAUGHTER) ==========
    {
      name: 'Grace Barrett',
      firstName: 'Grace',
      lastName: 'Barrett',
      archetype: 'Elena & Jasper\'s Daughter',
      age: '7 (first grade)',
      hubLocation: 'Charlotte, NC / Elena\'s compound',
      background: `Elena and Jasper Barrett's daughter. First grade. Thoughtful, artistic, steady.

Best friends with Clara Vega (Evelyn's daughter) — they mirror their mothers' friendship.

At galas and family gatherings, Grace often ends up in Addie's orbit — Addie treats her like a little sidekick.`,
      personality: 'Thoughtful, artistic, steady. Has Elena\'s calm. Or maybe Jasper\'s silence — always watching, always measuring.',
      relationships: 'Best friends with Clara Vega. "Little sidekick" to Addie at galas.',
      sourceFiles: 'New character creation',
    },

    // ========== LUCAS BARRETT ==========
    {
      name: 'Lucas Barrett',
      firstName: 'Lucas',
      lastName: 'Barrett',
      archetype: 'Elena & Jasper\'s Son',
      age: '1.5 (toddler)',
      hubLocation: 'Charlotte, NC / Elena\'s compound',
      background: 'Elena and Jasper Barrett\'s son. Toddler, curious, playful, the baby of the Barrett family.',
      personality: 'Toddling, curious, soaking it all in.',
      relationships: 'Younger brother to Grace Barrett.',
      sourceFiles: 'New character creation',
    },

    // ========== CLARA VEGA ==========
    {
      name: 'Clara Vega',
      firstName: 'Clara',
      lastName: 'Vega',
      archetype: 'Evelyn & Marcus\'s Daughter',
      age: '7',
      hubLocation: 'Greensboro, NC',
      background: `Evelyn Cross and Marcus Vega's daughter. 7 years old.

Best friends with Grace Barrett — they mirror their mothers' friendship.

Name meaning: Bright, brilliant, clarity.`,
      personality: 'Colorful, energetic, imaginative. All bursts of energy compared to Grace\'s calm precision.',
      relationships: 'Best friends with Grace Barrett. "Sisters" that mirror their mothers.',
      sourceFiles: 'New character creation',
    },

    // ========== GABRIEL VEGA ==========
    {
      name: 'Gabriel "Gabe" Vega',
      firstName: 'Gabriel',
      lastName: 'Vega',
      nickname: 'Gabe',
      archetype: 'Evelyn & Marcus\'s Son',
      age: '4',
      hubLocation: 'Greensboro, NC',
      background: `Evelyn Cross and Marcus Vega's son. 4 years old.

Name meaning: God is my strength.`,
      personality: 'Playful, into toy trucks and noise. Boys crash through life.',
      relationships: 'Younger brother to Clara Vega.',
      sourceFiles: 'New character creation',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { firstName: char.firstName, lastName: char.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
