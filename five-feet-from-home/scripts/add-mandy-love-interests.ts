import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Mandy's Love Interests and Bella/Matt/Mandy Triangle...\n");

  // ========== ADD COLTON ==========
  console.log("--- Adding Colton ---\n");

  const coltonData = {
    name: 'Colton',
    firstName: 'Colton',
    archetype: 'Mandy\'s Potential Love Interest (Male)',
    hubLocation: 'Ranch near Mandy\'s property',
    personality: 'Traditional, steady, patient. The kind of man who works with his hands and has quiet gravity. Widowed single dad raising a son alone.',
    background: `Ranch neighbor who becomes one of Mandy's potential love interests after Bella marries Matt.

Colton is a widowed single dad - his wife passed, leaving him to raise their son alone. He's traditional, steady, and represents stability.

Mandy goes on double dates with Bella and Matt, bringing Colton. She's drawn to his grounded nature but also fears being "boxed in" by traditional expectations.

Hawk tells Mandy: "Your job was never to stay stuck. You kept Bella safe. You did that. Now you've got to let yourself live, too."`,
    relationships: `Mandy - dating, potential partner
Bella - friend (Mandy's "sister")
Matt - friend
His son - raising alone after wife's death`,
  };

  const colton = await prisma.character.findFirst({
    where: { firstName: 'Colton' }
  });

  if (!colton) {
    await prisma.character.create({ data: { projectId: project.id, ...coltonData, isConfirmed: true } });
    console.log('Created: Colton');
  } else {
    await prisma.character.update({ where: { id: colton.id }, data: coltonData });
    console.log('Updated: Colton');
  }

  // ========== ADD JORDAN PRICE ==========
  console.log("\n--- Adding Jordan Price ---\n");

  const jordanData = {
    name: 'Jordan Price',
    firstName: 'Jordan',
    lastName: 'Price',
    archetype: 'Mandy\'s Potential Love Interest (Female)',
    hubLocation: 'Ranch area - runs women\'s rodeo training camp',
    personality: 'Tall, athletic, fearless in the arena but shy about her emotions. Quiet, graceful, lives in her own head. Stunning without knowing she\'s being stared at.',
    background: `Horse trainer and rodeo rider who runs a women's rodeo training camp nearby. One of Mandy's potential love interests.

Jordan is a widow with a young daughter. She reminds Mandy of Bella - that same unassuming beauty, unaware of how magnetic she is, but with a quieter, gentler vibe.

FIRST SPARK SCENE:
At the barn, Jordan helps kids with a performance rehearsal. She's tall and graceful in a simple sundress, hair falling soft. Mandy watches her with the kids - patient, gentle, present.

Mandy thinks: "God. It's like watching Bella all over again... but quieter. More still."

Jordan looks up, catches Mandy's eyes across the barn, and smiles. It's soft, honest. Mandy's stomach flips.

Jordan's daughter would fold right into the "village" of kids at the barn.`,
    relationships: `Mandy - dating, potential partner
Her daughter - raising alone after husband's death
Bella - Jordan reminds Mandy of Bella`,
  };

  const jordan = await prisma.character.findFirst({
    where: { firstName: 'Jordan', lastName: 'Price' }
  });

  if (!jordan) {
    await prisma.character.create({ data: { projectId: project.id, ...jordanData, isConfirmed: true } });
    console.log('Created: Jordan Price');
  } else {
    await prisma.character.update({ where: { id: jordan.id }, data: jordanData });
    console.log('Updated: Jordan Price');
  }

  // ========== ADD CASSIE ==========
  console.log("\n--- Adding Cassie ---\n");

  const cassieData = {
    name: 'Cassie',
    firstName: 'Cassie',
    archetype: 'Mandy\'s Potential Love Interest (Female)',
    hubLocation: 'Nashville / Gala circuit',
    personality: 'Magnetic, soulful Latina musician. Sharp-tongued, witty, but with a heart that aches for belonging. Sees in Mandy a kindred spirit.',
    background: `Nashville singer-songwriter who Addie met on the gala circuit. Cassie meets Mandy on one of the Nashville girls' weekends.

Represents art, passion, and freedom - someone who can match Mandy's fire while also drawing out her softer side.

One of Mandy's potential love interests after Bella marries Matt.`,
    relationships: `Mandy - dating, potential partner
Addie - introduced them on gala circuit`,
  };

  const cassie = await prisma.character.findFirst({
    where: { firstName: 'Cassie' }
  });

  if (!cassie) {
    await prisma.character.create({ data: { projectId: project.id, ...cassieData, isConfirmed: true } });
    console.log('Created: Cassie');
  } else {
    await prisma.character.update({ where: { id: cassie.id }, data: cassieData });
    console.log('Updated: Cassie');
  }

  // ========== ADD BELLA/MATT/MANDY TRIANGLE STORYLINES ==========
  console.log("\n--- Adding Bella/Matt/Mandy Triangle Storylines ---\n");

  const storylines = [
    {
      title: 'Bella/Matt/Mandy - The Almost-Threesome Dating',
      category: 'Character Arc',
      description: 'The strange constellation of Bella dating both Mandy and Matt',
      content: `THE ALMOST-THREESOME ARC:

From the outside, it seemed like Bella was caught in some kind of love triangle. Matt - rugged, steady, the kind of man who worked with his hands - had slipped into their lives first as a neighbor, then as a helping hand around Mandy's ranch.

For months the three moved like a constellation: dinners together, weekend rides through wooded trails, long evenings by the fire where Bella sometimes leaned into Mandy's shoulder, sometimes into Matt's.

To outsiders, it looked like a strange, easy threesome. To Bella, it felt like safety - like she didn't have to choose yet.

But Mandy noticed what Bella couldn't: Matt's steady eyes always found Bella first, and his silences around her weren't disinterest, but restraint.

THE DEMAND:
One evening, after a cookout at Addie's compound, Mandy pulled them aside:

"Enough dancing around. You two are going on a trip. Just you. No me. I'll hold down the ranch. You need to know what this is without me standing in the middle."

Bella went pale. But Mandy kissed her forehead: "I'll always be part of your life, Bells. But you've got to see what's right in front of you."`,
      characters: JSON.stringify(['Bella', 'Matt', 'Mandy', 'Addie'])
    },
    {
      title: 'Bella\'s Breakdown - Germany Hospital',
      category: 'Character Arc',
      description: 'Bella cracks under pressure during a solo Europe trip',
      content: `THE PRESSURE COOKER:

Bella had been burning the candle from every end:
- THREE JOBS: BSS analyst by day, Texas event company late nights, Elena's Maison Aurelia accounts bleeding into early hours
- EMOTIONAL CONFUSION: Matt's quiet devotion and Mandy's protective love - both anchoring and suffocating
- NO HAWK TALKS: Her fatherly advice sessions with Hawk had disappeared as he was tied up with assignments

When Jasper and Harper floated the idea of a solo test run in Europe - a chance to shadow a fixer case in Berlin and prove herself - Bella said yes. It wasn't just work. It was an escape.

THE CRACK:
In Germany, alone and overwhelmed, Bella cracked. She ended up in the hospital.

THE RESCUE:
One of the operators leaked it to Cole, who told Hawk. The clue was a missed call with Grace - Bella always answered Grace's calls.

Hawk and Mandy rushed to Germany. They found her broken but breathing.

Hawk: "You've been carrying everyone else's fights for too long. It's okay to fall apart. But you don't get to say you're not enough."

Mandy wrapped her arms around Bella: "You are loved. You are safe. Nothing you do will change that."`,
      characters: JSON.stringify(['Bella', 'Hawk', 'Mandy', 'Cole', 'Grace Barrett', 'Jasper Barrett', 'Harper'])
    },
    {
      title: 'Matt Confesses His Love',
      category: 'Character Arc',
      description: 'On the trip Mandy demanded, Matt tells Bella he loves her',
      content: `THE TRIP:

Matt picked a quiet mountain lodge just over the Virginia line. The drive was filled with awkward laughter, Bella fidgeting with her phone.

The second night, after dinner, they sat on the porch watching fireflies. Matt finally turned toward her.

"I love you, Bella. Not in a passing way. Not in a 'maybe someday' way. I've been holding this back because of Mandy - because I didn't want to wreck what you two have. But she's right. You deserve someone who'll stand in the storm with you. That's what I want to be."

Bella blinked, tears sliding down her cheeks. "But Mandy - what about Mandy?"

Matt took her hands. "She's part of us. Always will be. I don't want her gone from your life. I just want to be the man in it with you."

AFTERMATH:
When they returned, Bella was radiant in a way the others hadn't seen before. Mandy welcomed the new arrangement with a wry grin.

Around the fire pit, the three settled into a new rhythm: Bella and Matt building something real, Mandy still their confidante and sister-figure.`,
      characters: JSON.stringify(['Bella', 'Matt', 'Mandy'])
    },
    {
      title: 'Mandy Dates Again',
      category: 'Character Arc',
      description: 'After Bella marries Matt, Mandy opens her heart again',
      content: `MANDY'S PATH FORWARD:

After Bella & Matt marry, Mandy is over the moon for them - but there's also a quiet emptiness she doesn't admit at first. For years, her identity was half protector, half wild counterpart. With Bella stepping fully into her new life, Mandy has to face her own heart.

HAWK'S PUSH:
Hawk pulls her aside: "Your job was never to stay stuck, Mandy. You kept Bella safe. You did that. Now you've got to let yourself live, too."

DATING OPTIONS:
Mandy does dip her toe back in. At first, it's casual. Over time, she meets potential partners:

1. COLTON - widowed single dad, ranch neighbor, traditional, steady
2. JORDAN PRICE - female horse trainer, widow with daughter, reminds Mandy of Bella
3. CASSIE - female Nashville singer-songwriter, sharp-tongued and passionate

THE TWIST:
When Mandy finally admits she wants more than just being the protector, Bella and Matt are the first to cheer her on.

Bella tells her: "Mandy, you've been my safety net for years. You deserve someone who makes you feel as safe as you made me."`,
      characters: JSON.stringify(['Mandy', 'Bella', 'Matt', 'Hawk', 'Colton', 'Jordan Price', 'Cassie'])
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

  // ========== UPDATE MANDY WITH DATING INFO ==========
  console.log("\n--- Updating Mandy with dating arc ---\n");

  const mandy = await prisma.character.findFirst({
    where: { firstName: 'Mandy' }
  });

  if (mandy) {
    const mandyUpdate = {
      background: (mandy.background || '') + `

DATING AFTER BELLA MARRIES MATT:
After Bella and Matt marry, Mandy faces her own heart. For years, her identity was half protector, half wild counterpart to Bella. Now she has to find her own happiness.

Hawk tells her: "Your job was never to stay stuck. You kept Bella safe. Now you've got to let yourself live, too."

POTENTIAL LOVE INTERESTS:
- Colton: widowed single dad, ranch neighbor, traditional
- Jordan Price: female horse trainer, widow with daughter (reminds Mandy of Bella)
- Cassie: female Nashville singer-songwriter

Bella tells her: "You've been my safety net for years. You deserve someone who makes you feel as safe as you made me."`,
    };

    await prisma.character.update({
      where: { id: mandy.id },
      data: mandyUpdate
    });
    console.log('Updated: Mandy with dating arc');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();

  console.log(`\nTotal storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
