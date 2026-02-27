import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Updating Galas with Clothing/Activities and Adding Storylines...\n");

  // ========== UPDATE GALAS WITH CLOTHING DESCRIPTIONS ==========

  const galaUpdates = [
    {
      name: 'Veterans Day Benefit Gala',
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Deep crimson gown sweeping the marble like royalty, braid wound into elegant chignon',
        'Grace Barrett': 'Little white dress with matching crimson sash, clutching Elena\'s hand proudly',
        'Evelyn Cross': 'Deep sapphire gown, serene and radiant, small clutch in hand',
        'Kendra': 'Fitted navy gown (tugging at snug waistline, unknowingly pregnant), posture fierce',
        'Addie': 'Sleek black column dress with daring slit, hair swept back, diamond studs',
        'Hawk': 'Sharp tuxedo, protective without being overbearing',
        'Chris Donnelly': 'Sharp black tux',
        'Jasper Barrett': 'Tailored black suit, scotch in hand',
        'Marcus Vega': 'Dark sport coat, no tie'
      }),
      beforeActivities: `DRESSING ROOM SCENE - Elena's mountain compound, guest wing dressing room. Late afternoon. Dresses, jewelry, and makeup scattered across the room.

Grace (7) sits cross-legged on the carpet in a puff of tulle, clutching a small box of hairpins like crown jewels. "Auntie Addie, you need sparkly ones. You're the fun one."

Addie in silk robe, carefully takes the pins, sticks out her tongue in concentration as Grace "helps" tuck one into her hair.

Elena before the mirror in crimson gown. Grace adjusts her bracelet. "There. Perfect, Mama." Elena kisses her head, eyes softening.

Evelyn helps Grace fasten Kendra's navy dress. Kendra mutters: "Honestly, I don't know why this feels tighter than last time." Evelyn hides a knowing glance.

Addie twirls dramatically once zipped - Grace claps: "You look like a superhero!"
Addie winks, crouching to eye level: "Don't forget - superheroes always have sidekicks. You ready?"

Four women and one little girl reflected in the mirror - beauty, strength, legacy. Elena in crimson, Evelyn in sapphire, Kendra in navy, Addie in black, Grace in white.

"Alright," Elena says softly. "Let's show them how it's done."`,
      afterActivities: `AFTER-GALA WIND-DOWN - Elena's mountain compound, late night. Kids tucked in upstairs. Gowns and tuxes traded for cozy sweaters and bare feet. Wives club plus Hawk gather in great room, firelight flickering against stone hearth.

Elena curls into corner of couch, braid loosened, blanket over lap. Evelyn nearby, still somehow poised. Marcus stretched beside her. Kendra sprawled across an armchair. Addie on the floor, back against the couch, Hawk beside her.

Hawk, gazing at the fire: "You know... I'd love to have kids someday. Especially with you."

Addie, without missing a beat: "You sure you don't already?"

The room goes quiet. Hawk blinks. Evelyn and Elena exchange a look. Kendra snorts.

Addie leans into Hawk's shoulder, voice softening: "When we're ready. But tonight... I think we've already got a little sidekick who claimed us."

Hawk smiles, kissing the top of her head.

In another room, Addie admits to Elena she suspects Kendra is pregnant.`
    },
    {
      name: 'D.C. Defense Contractor Gala',
      clothingDescriptions: JSON.stringify({
        'Addie': 'Elena-selected gown, hair swept back, eyes sharp - her "My Fair Lady" transformation debut',
        'Elena Barrett': 'Elegant gown, steadying hand on Addie\'s shoulder',
        'Harper': 'Formal attire, watching critically then smirking approval',
        'Jasper Barrett': 'Tailored suit, watching Addie from across the room'
      }),
      beforeActivities: `MIRROR SCENE - Addie adjusts her gown nervously in the mirror. Elena steadies her hand on her shoulder.

"Stop fidgeting. You belong here. They just don't know it yet."

Harper enters, glances critically, then smirks: "Not bad. Remember - don't prove yourself. Make them prove themselves to you."`,
      afterActivities: `JASPER'S REALIZATION - Hours later, Addie is gliding through the room, smiling just enough, listening more than talking.

At first, she's overlooked. Then she speaks - one sharp, perfectly timed line that silences a table of executives.

Jasper, watching from across the room, leans toward Hawk: "She'll never be overlooked again."

Jasper realizes she's not the assistant anymore - she's his future number two.`
    },
    {
      name: 'Spanish Embassy Gala - Georgetown',
      clothingDescriptions: JSON.stringify({
        'Lena Ortiz': 'Flawless in a black gown, champagne in hand',
        'Elena Barrett': 'Working coat check in intern attire, feeling out of place'
      }),
      beforeActivities: `Elena (18, first-year) is working the coat check as part of her internship.

Elena (to herself): "God, I don't belong here."`,
      afterActivities: `By the end of the night, Elena had met three ambassadors' wives - her first step into the world Lena had mastered.

Lena at a Georgetown café later: "They will hire you if they think you're already part of the inner circle. Come with me to Madrid next month. I'll introduce you to the right people."`
    },
    {
      name: 'Paris Gala - Weapons Broker Op',
      clothingDescriptions: JSON.stringify({
        'Isabella Marquez': 'Floor-length emerald gown, hair pinned elegantly, champagne in hand - appearing as diplomat\'s daughter'
      }),
      beforeActivities: `Isabella drifts through the ballroom. To the guests, she's just another diplomat's daughter. In reality, she's tracking a weapons broker across the room.`,
      afterActivities: `When he excuses himself, she slips after him - heels silent, expression calm. Moments later, in the shadow of a marble hallway, she's got him pinned against the wall, silenced pistol under his chin.

"You'll walk back inside and smile. And you'll give me everything on the Belgrade shipment."

He nods. She releases him, straightens her gown, and walks back into the gala as if nothing happened.`
    },
    {
      name: 'Charlotte Gala - Pregnancy Foreshadow',
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Deep crimson gown',
        'Evelyn Cross': 'Deep sapphire gown, calm and composed',
        'Kendra': 'Fitted navy gown, fussing with straps',
        'Addie': 'Silk robe (during prep), then sleek black gown',
        'Grace Barrett': 'Little white party dress with tulle'
      }),
      beforeActivities: `CONFESSION SCENE - Elena's mountain compound, guest wing dressing room.

Kendra stands in front of the mirror: "I swear this dress shrunk. I've been bloated for weeks." She laughs it off.

Elena arches a brow: "Or maybe you're just glowing and don't see it."

Kendra waves her off: "Glowing? Please. More like sweaty."

When Kendra leaves for the bathroom, Addie confides to Elena her fear of losing herself to motherhood.

Elena and Evelyn exchange knowing looks - they both suspect what Kendra doesn't know yet.`,
      afterActivities: `The women reflect on the night. Addie's confession hangs in the air. Elena offers quiet reassurance that Addie doesn't have to be anyone other than herself - even if motherhood comes.`
    }
  ];

  for (const update of galaUpdates) {
    const gala = await prisma.gala.findFirst({
      where: { name: update.name, projectId: project.id }
    });

    if (gala) {
      await prisma.gala.update({
        where: { id: gala.id },
        data: {
          clothingDescriptions: update.clothingDescriptions,
          beforeActivities: update.beforeActivities,
          afterActivities: update.afterActivities
        }
      });
      console.log(`Updated gala: ${update.name}`);
    } else {
      console.log(`Gala not found: ${update.name}`);
    }
  }

  // ========== ADD SILLY AUNT ADDIE STORYLINES ==========
  console.log("\n--- Adding Silly Aunt Addie Storylines ---\n");

  const addieStorylines = [
    {
      title: 'Silly Aunt Addie - Gala Night',
      category: 'Character Arc',
      description: `Grace Barrett claims Addie as her "fun auntie" at galas and events`,
      content: `SCENE - Veterans Day Gala

Grace breaks away from Elena, rushing to grab Addie's hand, tugging her into the spotlight. The crowd notices. The "silly auntie" has been claimed by the princess.

Hawk watches, grinning, as Addie smiles down at Grace - still the untamed storm, but softened around the edges.

A former teammate of Hawk's nudges him: "Well, would you look at that. Hawk's already got a wife and kid he didn't tell us about."

The group chuckles. Addie rolls her eyes. "She's not ours."

Hawk only smirks. His teammate fires back: "Doesn't matter. She looks at you two like you are."

Later, Hawk lifts Grace onto his shoulders to see the chocolate fountain. Addie slips cookies from catering. The three become inseparable for the evening.`,
      characters: JSON.stringify(['Addie', 'Grace Barrett', 'Hawk', 'Elena Barrett'])
    },
    {
      title: 'Silly Aunt Addie - Kids Circle Her Like Ducklings',
      category: 'Character Arc',
      description: `At family gatherings, all the kids gravitate to Addie`,
      content: `SCENE - Elena's Mountain Compound, Family Gathering

The adults are scattered across the great room and patio - discussing BSS, foundation work, the usual serious topics. But in the corner, something different is happening.

Addie sits cross-legged on the floor, surrounded by:
- Grace Barrett (7) - clutching her arm
- Clara Vega (7) - giggling at her jokes
- Isabella Marquez (9) - trying to act mature but failing
- Lucía Marquez (7) - braiding Addie's hair
- Mateo Marquez (5) - climbing on her back
- Gabriel Vega (4) - showing her a toy truck

"You're like the Pied Piper," Evelyn observes from the couch.

Addie grins up at her. "I prefer 'chaos coordinator.'"

Elena watches, a small smile playing at her lips. "They know you're one of them. Just taller."

Hawk appears with two cups of coffee, stepping over Mateo. "Need backup?"

Addie reaches up for a cup. "Always. But also - Gabriel just told me a secret about a frog he's hiding in his room. So. We might have a situation."`,
      characters: JSON.stringify(['Addie', 'Grace Barrett', 'Clara Vega', 'Isabella Marquez', 'Lucía Marquez', 'Mateo Marquez', 'Gabriel Vega', 'Evelyn Cross', 'Elena Barrett', 'Hawk'])
    },
    {
      title: 'Silly Aunt Addie - Double Date Babysitter',
      category: 'Character Arc',
      description: `Addie watches all the kids during wives club double dates`,
      content: `SCENE - Elena's Compound, Date Night

The couples are dressed for their double date - Jasper and Elena, Chris and Kendra, Marcus and Evelyn. Sara Marquez has dropped off her three for the evening.

Seven children. One Addie. Hawk is on standby (reluctantly excited).

"You sure about this?" Elena asks, adjusting her earring.

Addie waves her off. "Please. I've handled warlords. I think I can manage a pizza party."

Grace tugs at her hand. "Can we build a fort?"

"Obviously."

Gabriel holds up a stuffed dinosaur. "Mr. Rex wants to watch a movie."

"Then Mr. Rex gets the best seat."

Hawk arrives with four pizzas. The children swarm.

Later, when the couples return, they find: the living room transformed into an elaborate blanket fort, all seven kids passed out inside, Hawk asleep on the couch with Gabriel on his chest, and Addie quietly sipping wine in the corner with a satisfied smirk.

"Told you I had it handled."`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Grace Barrett', 'Gabriel Vega', 'Clara Vega', 'Isabella Marquez', 'Lucía Marquez', 'Mateo Marquez', 'Lucas Barrett', 'Elena Barrett', 'Jasper Barrett', 'Chris Donnelly', 'Kendra', 'Marcus Vega', 'Evelyn Cross'])
    },
    {
      title: 'Silly Aunt Addie - Dressing Room Helper',
      category: 'Character Arc',
      description: `Grace helps Addie get ready for galas - their special bonding`,
      content: `SCENE - Elena's Mountain Compound, Guest Dressing Suite

Grace Barrett (7) sits cross-legged on the carpet in a puff of tulle, clutching a small box of hairpins like crown jewels.

"Auntie Addie, you need sparkly ones. You're the fun one."

Addie, in a silk robe, smiles. She carefully takes the pins from Grace, then sticks her tongue out in concentration as Grace "helps" tuck one into her hair.

"There," Grace announces. "Perfect. Now you look like a princess."

Addie crouches to eye level. "Don't forget - superheroes always have sidekicks. You ready?"

Grace nods solemnly, taking her hand.

Addie twirls dramatically once her gown is zipped - a sleek black column dress with a daring slit. Grace claps her hands.

"You look like a superhero!"

"That's more like it."

The wives tease Addie about being "mom material." She deflects. But when she looks at Grace, everyone sees it - the transformation from wild spirit to something softer, something she never expected to want.`,
      characters: JSON.stringify(['Addie', 'Grace Barrett', 'Elena Barrett', 'Evelyn Cross', 'Kendra'])
    },
    {
      title: 'Silly Aunt Addie - Hawk\'s Observation',
      category: 'Character Arc',
      description: `Hawk realizes Addie is ready for motherhood before she does`,
      content: `SCENE - After-Gala, Elena's Compound

The kids are tucked in upstairs. Hawk and Addie sit by the fire, wine glasses in hand.

Hawk gazes at the flames. "You know... I'd love to have kids someday. Especially with you."

Addie, without missing a beat: "You sure you don't already?"

The room goes quiet. Hawk blinks.

Addie leans into his shoulder, voice softening. "When we're ready. But tonight... I think we've already got a little sidekick who claimed us."

Hawk smiles, kissing the top of her head. "She's got good taste."

"Obviously. She picked me."

Later, alone with Elena, Addie admits: "I think Kendra's pregnant. And I think... I think I'm jealous."

Elena's eyes soften. "You don't have to decide anything tonight."

"I know." Addie swirls her wine. "But watching Grace tonight... something shifted. And it terrifies me."`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Elena Barrett', 'Grace Barrett'])
    }
  ];

  for (const storyline of addieStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          ...storyline
        }
      });
      console.log(`Created storyline: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated storyline: ${storyline.title}`);
    }
  }

  // ========== ADD WIVES CLUB LUNCHEONS ==========
  console.log("\n--- Adding Wives Club Luncheons ---\n");

  const luncheons = [
    {
      name: 'Wives Club - Sara\'s Welcome Luncheon',
      organization: 'Wives Club',
      venue: 'Elena\'s Mountain Compound',
      location: 'Blue Ridge Mountains, NC',
      purpose: 'Welcoming Sara Marquez into the wives club circle',
      dresscode: 'Casual elegant',
      attendees: JSON.stringify(['Elena Barrett', 'Evelyn Cross', 'Addie', 'Kendra', 'Sara Marquez', 'Grace Barrett', 'Isabella Marquez', 'Lucía Marquez', 'Mateo Marquez', 'Clara Vega', 'Gabriel Vega']),
      significance: `The long table at Elena's compound is filled with fresh bread, fruit, and coffee. Evelyn is mid-story when Sara enters with a casserole dish and a grin.

"Am I late?"

Elena stands, pulling her sister into a hug. "Right on time."

The kids swarm in - Isabella heads straight for Grace, Lucía skips to the toy box, and Mateo already has Gabriel in a wrestling match on the rug.

This is Sara's formal welcome into the wives club extended circle - not married to a BSS operator, but her proximity and kids make her essential to the circle.`,
      events: 'Sara welcomed to wives club. Kids integrate immediately. Addie teases Sara about being "mom material."',
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Elegant but relaxed - silk blouse, tailored pants',
        'Evelyn Cross': 'Professional casual - blouse and slacks',
        'Addie': 'Casual chic - fitted jeans, boots, leather jacket over a soft tee',
        'Kendra': 'Athletic casual - comfortable but put-together',
        'Sara Marquez': 'Warm, approachable elegance - wrap dress, gold jewelry'
      }),
      beforeActivities: 'Elena prepares the compound. Evelyn coordinates food. Addie pretends to help but ends up taste-testing everything.',
      afterActivities: 'The women linger at the table while kids play. Sara shares stories of raising three under ten. Addie makes mental notes she\'ll deny taking.'
    },
    {
      name: 'Wives Club - Weekly Wine & Strategy',
      organization: 'Wives Club',
      venue: 'Rotating - Elena\'s, Evelyn\'s, Kendra\'s homes',
      location: 'Charlotte area',
      purpose: 'Weekly check-ins, life updates, and wine',
      dresscode: 'Comfortable',
      attendees: JSON.stringify(['Elena Barrett', 'Evelyn Cross', 'Addie', 'Kendra', 'Sara Marquez']),
      significance: `The wives club's informal weekly gathering. No galas, no events - just the women checking in on each other.

Topics covered:
- BSS operations updates (what can be shared)
- Kids' activities and schedules
- Foundation work and charity events
- Relationship check-ins
- Stress management and support

The unspoken rules:
- What's said at wine night stays at wine night
- No phones unless it's an emergency
- Everyone pours their own glass
- Tears are allowed, judgment is not`,
      events: 'Weekly gathering for support, updates, and wine. The emotional backbone of the wives club.',
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Cashmere sweater, leggings, hair down',
        'Evelyn Cross': 'Comfortable slacks, soft blouse',
        'Addie': 'Oversized sweater, bare feet',
        'Kendra': 'Yoga pants, hoodie',
        'Sara Marquez': 'Cozy cardigan, jeans'
      }),
      beforeActivities: 'Host preps snacks and wine. Group text confirms attendance. Kids are with partners or sitters.',
      afterActivities: 'Hugs, promises to text, and the knowledge that no matter what the week brings, they\'ll face it together.'
    },
    {
      name: 'Wives Club - Crisis Support Session',
      organization: 'Wives Club',
      venue: 'Elena\'s Mountain Compound',
      location: 'Blue Ridge Mountains, NC',
      purpose: 'Emergency gathering when a wife needs support',
      dresscode: 'Whatever you\'re wearing when you get the call',
      attendees: JSON.stringify(['Elena Barrett', 'Evelyn Cross', 'Addie', 'Kendra', 'Sara Marquez']),
      significance: `When Evelyn gets the call that Marcus's op went sideways, the wives club mobilizes.

Elena handles logistics - compound is open, spare rooms ready.
Addie runs interference with BSS to get real updates.
Kendra brings practical supplies and stays close.
Sara takes the kids so Evelyn can focus.

This is what the wives club is really for: holding each other when the men they love are in danger, and keeping the machine running until they come home.`,
      events: 'Emergency support when an operator is in crisis. The wives club proves its worth.',
      clothingDescriptions: JSON.stringify({
        'Everyone': 'Whatever they were wearing when they got the call - sweats, pajamas, yesterday\'s clothes. No one cares.'
      }),
      beforeActivities: 'The call comes. Everyone drops everything. No questions asked.',
      afterActivities: 'They wait together. They pray. They don\'t sleep until they know.'
    },
    {
      name: 'Wives Club - Monthly Brunch',
      organization: 'Wives Club',
      venue: 'Upscale restaurant in Charlotte',
      location: 'Charlotte, NC',
      purpose: 'Monthly celebration and connection',
      dresscode: 'Sunday best',
      attendees: JSON.stringify(['Elena Barrett', 'Evelyn Cross', 'Addie', 'Kendra', 'Sara Marquez', 'Grace Barrett']),
      significance: `The monthly brunch is sacred. It's when the wives club steps out of crisis mode and into celebration.

Mimosas flow. Stories are shared. Laughter fills the private dining room.

Grace is occasionally included - she's learning the rhythms of the wives club, absorbing how these women support each other.

Topics:
- Upcoming events and galas
- Foundation projects
- Kids' milestones
- Fashion consultations (mostly for Addie, who pretends to hate it)
- Future planning

It's not just brunch. It's the monthly reminder that they chose this life, and they chose each other.`,
      events: 'Monthly brunch celebrating their bond. Grace sometimes attends as "junior member."',
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Elegant sundress, understated jewelry, perfect chignon',
        'Evelyn Cross': 'Tailored blazer over silk top, polished but warm',
        'Addie': 'Leather jacket (of course), fitted dress underneath, boots',
        'Kendra': 'Sharp but comfortable - blazer, jeans that cost more than rent',
        'Sara Marquez': 'Colorful wrap dress, statement earrings, Sofia Vergara energy',
        'Grace Barrett': 'Little dress matching her mother\'s, practicing her poise'
      }),
      beforeActivities: 'Group text the night before confirming the restaurant and time. Elena makes the reservation (they have her on speed dial).',
      afterActivities: 'Shopping, sometimes. Walking the city together. Or just lingering over coffee until someone has to pick up kids.'
    },
    {
      name: 'Wives Club - Double Date Night Planning',
      organization: 'Wives Club',
      venue: 'Elena\'s Mountain Compound',
      location: 'Blue Ridge Mountains, NC',
      purpose: 'Planning couples\' social activities and coordinating childcare',
      dresscode: 'Casual',
      attendees: JSON.stringify(['Elena Barrett', 'Evelyn Cross', 'Addie', 'Kendra', 'Sara Marquez']),
      significance: `The logistics meeting for the couples' calendar. Because with this many operators and this many kids, spontaneity requires planning.

Coordinating:
- Jasper & Elena's schedule
- Chris & Kendra's availability
- Marcus & Evelyn's commitments
- Hawk & Addie's missions

And the critical question: Who's watching the kids?

Usually Addie volunteers. She pretends it's a sacrifice. Everyone knows she's counting the minutes until she's surrounded by the chaos of seven children and one very willing Hawk.`,
      events: 'Coordinating couple time and childcare. Addie always ends up on kid duty.',
      clothingDescriptions: JSON.stringify({
        'All': 'Casual - sweats, jeans, whatever they\'re comfortable in for planning sessions'
      }),
      beforeActivities: 'Calendars out. Phones silenced. Wine optional but encouraged.',
      afterActivities: 'Dates scheduled. Addie resigned to another blanket fort night. Everyone wins.'
    }
  ];

  for (const luncheon of luncheons) {
    const existing = await prisma.gala.findFirst({
      where: { name: luncheon.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.gala.create({
        data: {
          projectId: project.id,
          ...luncheon
        }
      });
      console.log(`Created luncheon: ${luncheon.name}`);
    } else {
      await prisma.gala.update({
        where: { id: existing.id },
        data: luncheon
      });
      console.log(`Updated luncheon: ${luncheon.name}`);
    }
  }

  // Final counts
  const galaCount = await prisma.gala.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\nTotal galas/events: ${galaCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
