import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Matt, Mandy, Nashville & Bella Arc Content...\n");

  // ========== ADD MATT CHARACTER ==========
  console.log("--- Adding Matt ---\n");

  const mattData = {
    name: 'Matt',
    firstName: 'Matt',
    archetype: 'BSS Operator / Bella\'s Partner',
    hubLocation: 'Charlotte, NC',
    bssRole: 'Operator',
    personality: 'Funny, makes terrible country-song impressions, relaxed but steady. Makes everyone laugh. The kind of partner who makes Bella feel like she can stop apologizing for existing.',
    background: `BSS operator who becomes Bella's partner after her relationship with Mandy.

Bella said of meeting Matt: "And then I met Matt, and… everything blossomed. I stopped feeling small. I stopped apologizing for existing."

Part of the close friend group that includes Hawk, Bella, Mandy, Evie, and Cole. Travels with the group to Nashville for bonding weekends.

At the Nashville steakhouse, Matt made everyone laugh so hard with his terrible country-song impressions that Evie nearly choked on her sweet tea.`,
    relationships: `Bella - partner, helped her blossom
Mandy - Bella's ex, now close friend (they all hang out together)
Hawk - fellow BSS operator, friend
Evie Maren - friend
Cole - friend`,
  };

  const matt = await prisma.character.findFirst({
    where: { firstName: 'Matt', bssRole: { contains: 'Operator' } }
  });

  if (matt) {
    await prisma.character.update({ where: { id: matt.id }, data: mattData });
    console.log('Updated: Matt');
  } else {
    const existingMatt = await prisma.character.findFirst({
      where: { firstName: 'Matt' }
    });
    if (existingMatt) {
      await prisma.character.update({ where: { id: existingMatt.id }, data: mattData });
      console.log('Updated: Matt (existing)');
    } else {
      await prisma.character.create({ data: { projectId: project.id, ...mattData, isConfirmed: true } });
      console.log('Created: Matt');
    }
  }

  // ========== ADD MANDY CHARACTER ==========
  console.log("\n--- Adding Mandy ---\n");

  const mandyData = {
    name: 'Mandy',
    firstName: 'Mandy',
    archetype: 'Bella\'s Ex / Close Friend & Mentor',
    hubLocation: 'Charlotte, NC',
    personality: `Playful, teasing, tests and pushes people out of their shells. Sharp but supportive perspective. Keeps things light while being wise. Raises chopsticks in mock salutes.

"I'll keep it light and playful, and make sure you don't forget to laugh while you're building something big."`,
    background: `Bella's former girlfriend who helped her discover her sexuality and confidence. They broke up because of differing views on kids/timing, but remained close friends - "impossible sisters."

Mandy pushed Bella, teased her, tested her, forced her out of hiding. Their relationship opened doors Bella didn't know were closed - to her sexuality, her confidence, her ability to live fully.

Now part of the core friend group. She and Bella are inseparable friends who openly discuss their past relationship. When asked about the breakup, Bella said: "It hurt. But it was the right call. And now we get to keep the best part. Friendship. Family."

Mandy raised her chopsticks: "Exactly. We may have broken up, but she'll always be my girl."

Co-mentors Evie with Bella in her "My Fair Lady" transformation. Sees Evie's foundation potential - "Strong & Savory is the seed, but you could build something global."`,
    relationships: `Bella - ex-girlfriend, now "impossible sisters"
Matt - Bella's current partner, friend (they all hang out together)
Evie Maren - mentee, co-mentoring with Bella
Hawk - friend
Cole - friend`,
    wivesClubRole: 'Extended Circle - Friend',
  };

  const mandy = await prisma.character.findFirst({
    where: { firstName: 'Mandy' }
  });

  if (mandy) {
    await prisma.character.update({ where: { id: mandy.id }, data: mandyData });
    console.log('Updated: Mandy');
  } else {
    await prisma.character.create({ data: { projectId: project.id, ...mandyData, isConfirmed: true } });
    console.log('Created: Mandy');
  }

  // ========== UPDATE BELLA WITH RELATIONSHIP ARC ==========
  console.log("\n--- Updating Bella Relationship Arc ---\n");

  const bella = await prisma.character.findFirst({
    where: { name: { contains: 'Bella' } }
  });

  if (bella) {
    const updatedRelationships = (bella.relationships || '') + `

RELATIONSHIP ARC:
1. ADDIE - Mentor, "My Fair Lady" transformation. Addie taught her everything - tested her, challenged her, pushed her to grow, gave her jobs and opportunities.

2. MANDY - Former girlfriend. Their relationship opened doors Bella didn't know were closed - to her sexuality, her confidence, her ability to live fully. Broke up over kids/timing, but remained "impossible sisters."

3. MATT - Current partner. "And then I met Matt, and everything blossomed. I stopped feeling small. I stopped apologizing for existing."

Matt - current partner
Mandy - ex-girlfriend, now close friend`;

    await prisma.character.update({
      where: { id: bella.id },
      data: { relationships: updatedRelationships }
    });
    console.log('Updated: Bella with relationship arc');
  }

  // ========== ADD NASHVILLE TRIP STORYLINES ==========
  console.log("\n--- Adding Nashville Trip Storylines ---\n");

  const storylines = [
    {
      title: 'Nashville Weekend - The Invitation',
      category: 'Vignette',
      description: 'Bella and Mandy invite Evie to Nashville for a friend getaway',
      content: `Bella appeared at Evie's classroom doorframe, smiling warmly. "A weekend. Nothing fancy. Just Nashville. Good food, good music, and even better company."

Evie's hands stilled on the dish towel. "Nashville? Who's going?"

"Hawk, Matt, me, Mandy," Bella listed casually. Then she added with a sly smile, "And if you want to bring Cole, it'll be a great friend getaway. Zero pressure. Just fun."

Evie blinked, caught off guard. "Wait — me? With you all?"

Mandy smirked. "Yes, you. You've been hiding in kid-world for six months. Time to stretch those legs."

Bella laughed, her arm still on Evie's shoulder. "No — this is going to be family."

EVIE'S RESPONSE:
Evie hesitated, then slowly smiled. "Okay. Yes. I'll ask Cole."

This is her first step back into the circle in a relaxed way - no gala, no pressure. Just friends, family, fun.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy', 'Cole', 'Hawk', 'Matt'])
    },
    {
      title: 'Nashville Weekend - Day 1 Dinner',
      category: 'Vignette',
      description: 'The group arrives in Nashville and hits a steakhouse',
      content: `DAY 1 — ARRIVAL & DINNER

The group piled into SUVs and rolled into Nashville on a Friday evening. Hawk found a steakhouse that turned dinner into a feast.

Matt made everyone laugh so hard with his terrible country-song impressions that Evie nearly choked on her sweet tea.

Cole sat beside her, relaxed, his steady presence making the chaos feel safe.

Bella and Mandy clinked margaritas while Hawk ordered enough ribs to feed an army.

Cole's dry one-liners slipped in between Matt's antics, sending Evie into quiet fits of laughter.

For the first time in months, Evie felt completely at ease - surrounded by people who wanted nothing from her except her company.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Mandy', 'Hawk', 'Matt'])
    },
    {
      title: 'Nashville Weekend - Honky Tonk Dance',
      category: 'Vignette',
      description: 'Cole gets Evie to dance at the honky-tonk',
      content: `DAY 2 — THE MUSIC & THE DANCE

Saturday night, they crowded into a packed honky-tonk, the air alive with fiddles and guitars. Live music thundered out of every open doorway.

At some point, Bella and Mandy disappeared into the crowd with Hawk and Matt, leaving Evie and Cole near the edge of the dance floor.

Cole leaned down, voice steady but playful: "You can't come to Nashville and not dance."

Evie hesitated, then let him lead her into the crush of couples. At first, she was awkward, tripping over her own boots, but Cole steadied her with patience.

By the third song, she was laughing — really laughing — as he spun her under his arm.

Neither of them noticed Bella watching from across the room, a knowing smile on her face.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Mandy', 'Hawk', 'Matt'])
    },
    {
      title: 'Nashville Weekend - Rooftop Confession',
      category: 'Vignette',
      description: 'Evie admits Bella and Mandy are her best friends',
      content: `NIGHT 2 — ROOFTOP

Later, the group gathered on the rooftop of their hotel with ice cream and drinks. The city glowed beneath them, guitars still faint in the distance.

Evie sat between Bella and Mandy, her laughter bubbling as they teased Matt and Hawk.

Then, in a quiet moment, she looked at the two women and blurted without thinking:

"You two… you're the best friends I've ever had."

Bella squeezed her hand instantly, her eyes soft.

Mandy leaned her head on Evie's shoulder with a smug grin. "Took you long enough to admit it."

Evie laughed, a tear slipping out before she could stop it. "I just… never had this before. People who actually want me around. Who don't want anything from me."

Bella's voice was gentle. "Well, get used to it. You're stuck with us now."

Mandy smirked. "No escape."`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy', 'Hawk', 'Matt', 'Cole'])
    },
    {
      title: 'Bella & Mandy - Why They Broke Up',
      category: 'Character Arc',
      description: 'Bella and Mandy explain their past relationship to Evie',
      content: `DINNER SCENE - THE PAST REVEALED

Over takeout and wine at Bella's place, the conversation turned deeper.

Evie asked carefully: "Can I ask... about you two? You're so close, but you dated?"

Bella nodded, her smile tinged with sadness but steady. "It hurt. But it was the right call. And now—" She glanced at Mandy, her eyes warm. "We get to keep the best part. Friendship. Family. And Matt fits her better than I ever could've."

Mandy raised her chopsticks like a toast. "Exactly. We may have broken up, but she'll always be my girl."

Evie blinked at both of them, heart tight. "That's… kind of amazing. You two are so open about it."

Bella leaned forward, nudging her shoulder. "That's what real family looks like, Evie. It's messy, it's honest, and it survives everything."

WHY THEY BROKE UP:
Kids. Timing. Different visions for the future. But the love remained - transformed into something deeper.`,
      characters: JSON.stringify(['Bella', 'Mandy', 'Evie Maren', 'Matt'])
    },
    {
      title: 'Bella\'s My Fair Lady Arc - Mentoring Evie',
      category: 'Character Arc',
      description: 'Bella shares her transformation story with Evie',
      content: `BELLA'S CONFESSION TO EVIE:

Bella settled beside Evie, her posture open. "Addie was right about us. We are alike. I was exactly where you are — quiet, uncertain, feeling like I didn't belong in these spaces."

Evie blinked. "You? But you seem so…"

Bella smiled. "Now, maybe. But back then? Addie had to teach me everything. Like My Fair Lady."

Evie's eyes widened. "That's my favorite book!"

Bella's grin turned conspiratorial. "Then you'll understand. I was shy, reserved, completely unsure. Addie tested me, challenged me, pushed me to grow. And when I stumbled, she never gave up — she gave me jobs, opportunities, a place at her side. She welcomed me when I felt invisible."

Evie's chest tightened. "That sounds… exactly like her."

Bella nodded. "And Mandy helped me too. Our relationship opened doors I didn't even know were closed — to my sexuality, my confidence, my ability to live fully. And then I met Matt, and… everything blossomed. I stopped feeling small. I stopped apologizing for existing."

Evie laughed nervously. "I can't even imagine being that bold."

Bella leaned forward, eyes sparkling. "You don't have to imagine. Addie sees it in you already. And so do I. You just need time."`,
      characters: JSON.stringify(['Bella', 'Evie Maren', 'Addie', 'Mandy', 'Matt'])
    },
    {
      title: 'Evie\'s Shopping Day - The Makeover',
      category: 'Character Arc',
      description: 'Addie and Bella take Evie shopping for a complete wardrobe',
      content: `THE SHOPPING SPREE:

Addie appeared with a checklist. "And yes, we're even hitting the cooking store. If we're doing this, we're doing it right."

Bella grinned, looping her arm through Evie's. "You heard the boss. Let's go."

SHOES & DRESSES:
At the shoe store, Addie insisted on heels to match every gown and flats "for when you're teaching and still want to look sharp." Bella teased Evie into trying boots that made her feel ten feet tall.

At the dress boutique, Addie chose sleek pieces for galas, Bella picked playful ones for coffee runs, and Evie found herself in the middle — her reflection a balance she'd never seen before.

LINGERIE:
The boutique was quiet, hushed with soft lighting and racks of lace and silk. Evie hovered near the entrance.

Addie said matter-of-factly: "You've survived a gala. Now it's time for the foundation pieces."

Evie's face went crimson. "Foundation pieces?"

Bella grinned, holding up a delicate lace set. "Translation: lingerie. You need at least a drawer full."

Addie's smile was wicked. "Yes. And by the time we're done, you'll have one. Consider it a gift from your sisters."

THE REALIZATION:
By the end of the day, Evie wasn't just wearing new clothes — she was seeing herself differently. She finally had close female friends. Real ones.`,
      characters: JSON.stringify(['Evie Maren', 'Addie', 'Bella'])
    },
    {
      title: 'Evie at Her First Gala - Cole\'s Reaction',
      category: 'Vignette',
      description: 'Cole sees Evie descend the staircase in her gown',
      content: `GALA NIGHT - THE STAIRCASE:

The ballroom glittered with chandeliers, music drifting from the string quartet.

At the top of the staircase, Evie hesitated in her sage-green gown, heart pounding. Addie gave her a tiny nod. "You're ready. Go."

Evie descended slowly, one hand on the railing. Her eyes swept the room — and landed on Cole.

COLE'S REACTION:
Cole stood near the bar, drink in hand, mid-sentence with Hawk.

Then he saw her.

His words trailed off. His grip on the glass tightened. For a long moment, he just stared — not with shock, but with something quieter. Something that made Evie's breath catch.

Hawk followed his gaze, then smirked. "Breathe, man."

Cole didn't respond. He just watched her reach the bottom of the stairs, his expression unreadable except for the faintest flicker of wonder.

EVIE SEES ADDIE AS POH:
Across the ballroom, Evie noticed Addie — not just standing, but commanding. People orbited her without realizing it. VIPs leaned in when she spoke. Security staff nodded at her glances.

This was Palace of Honor. This was Addie's domain.

And when Addie caught Evie's eye and gave her a subtle nod, Evie understood: she was protected here. Truly protected.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Addie', 'Hawk'])
    }
  ];

  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({ data: { projectId: project.id, ...storyline } });
      console.log(`Created storyline: ${storyline.title}`);
    } else {
      await prisma.storyline.update({ where: { id: existing.id }, data: storyline });
      console.log(`Updated storyline: ${storyline.title}`);
    }
  }

  // ========== ADD NASHVILLE TRIP BUSINESS TRIP ==========
  console.log("\n--- Adding Nashville Business Trip ---\n");

  const nashvilleTrip = {
    name: 'Nashville Friend Weekend',
    traveler: 'Evie, Cole, Bella, Mandy, Hawk, Matt',
    destination: 'Nashville, TN',
    origin: 'Charlotte, NC',
    purpose: 'Friend getaway - music, food, bonding',
    duration: 'Weekend (Fri-Sun)',
    companions: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Mandy', 'Hawk', 'Matt']),
    storyEvents: `Day 1: Steakhouse dinner. Matt's terrible country impressions. Margaritas and ribs.
Day 2: Honky-tonk. Cole gets Evie to dance. First real laughter in months.
Night 2: Rooftop with ice cream. Evie admits Bella and Mandy are her best friends.
Day 3: Drive home. Evie commits to starting the foundation slowly and asks Bella/Mandy to mentor her.`,
    outcome: 'Evie bonds deeply with the group, commits to Strong & Savory Foundation, asks for My Fair Lady mentorship',
  };

  const existingTrip = await prisma.businessTrip.findFirst({
    where: { name: nashvilleTrip.name, projectId: project.id }
  });

  if (!existingTrip) {
    await prisma.businessTrip.create({ data: { projectId: project.id, ...nashvilleTrip } });
    console.log('Created: Nashville Friend Weekend trip');
  } else {
    console.log('Already exists: Nashville Friend Weekend trip');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();
  const tripCount = await prisma.businessTrip.count();

  console.log(`\nTotal storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total business trips: ${tripCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
