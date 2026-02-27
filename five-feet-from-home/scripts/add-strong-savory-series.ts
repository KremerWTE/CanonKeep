import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Strong and Savory Series and Content...\n");

  // ========== CREATE THE BOOK SERIES ==========
  console.log("--- Creating Strong and Savory Book Series ---\n");

  const strongSavorySeries = {
    name: 'Strong and Savory',
    seriesType: 'Spin-off',
    protagonist: 'Evelyn "Evie" Maren',
    premise: `A heartwarming spin-off series centered on Evie Maren, the culinary arts teacher pulled into Elena's orbit. The series follows Evie's journey from classroom cooking teacher to founder of the Strong & Savory Foundation - a regional (then national) program teaching athletes, especially Special Olympics athletes, meal prep and life skills.

Core Theme: "Food is love in its purest form" - Evie's belief that cooking can heal, connect, and empower.

The series explores:
- Evie's unexpected friendship with the elite wives club circle
- Her "My Fair Lady" transformation (keeping her personality while growing into new spaces)
- The founding and growth of the Strong & Savory Foundation
- Her slow-burn platonic-to-romantic relationship with Cole
- Teaching meal prep to Special Olympics athletes like Jazz
- Building a legacy through kindness rather than power`,
    themes: JSON.stringify(['everyday heroism', 'food as love', 'found family', 'transformation while staying true to oneself', 'empowering athletes', 'accessibility', 'unlikely sisterhood']),
    totalBooks: 5,
    status: 'planned',
    connections: `Connected to main Five Feet From Home series through:
- Elena Barrett and the wives club
- Sara Marquez (gym connection)
- Grace Barrett (student who adores Evie)
- Jazz Carter (Special Olympics swimmer trained by Bella)
- Bella (Evie's mentor in the "My Fair Lady" makeover)
- Mandy (co-mentor with Bella)
- Cole (slow-burn romance)
- Addie (provides contacts and protection)`,
    timeline: 'Concurrent with main series, starting Year 2',
    books: JSON.stringify([
      {
        title: 'Flour on Her Hands',
        synopsis: 'Evie is first noticed by Elena at Grace\'s school. Her warmth reminds Elena of Victoria\'s energy. Grace loves Evie\'s classroom - "school feels like family." Evie is invited into the extended orbit. Sara offers her a gym meal business, but Evie says no to business, yes to teaching.'
      },
      {
        title: 'The Unlikely Sister',
        synopsis: 'Evie doesn\'t fit the typical model of Elena\'s circle - messy bun, flour-dusted cardigans, kitchen apron instead of ballgown. But she provides authentic warmth and everyday stability. Elena pulls her in deeper. "She doesn\'t fit our world, but she makes our world better."'
      },
      {
        title: 'Strong & Savory: The Foundation',
        synopsis: 'Bella and Mandy cast a vision for Evie: "You already have a larger-than-life aura. Now it\'s time to expand it." They see a foundation in her future. Addie overwhelms her with contacts. Evie decides to start regional, slowly, keeping kids at the heart. She asks Bella and Mandy to mentor her through a "My Fair Lady" makeover without losing her personality.'
      },
      {
        title: 'The Sweet Alchemy',
        synopsis: 'Evie\'s gift is transforming the ordinary into something memorable. Students say she has "magic hands." She designs hands-on workshops at Sara\'s gym where athletes learn healthy meals, portion food, and shop on a budget. Jazz proudly shows Grace her "meal prep boxes."'
      },
      {
        title: 'Mrs. Cole',
        synopsis: 'The slow-burn romance with Cole reaches its peak. From the joke about "future Mrs. Cole" that Evie couldn\'t get out of her head, to Cole\'s quiet affirmation: "You do have a larger-than-life aura. People light up around you." The foundation goes regional, then national. Evie becomes exactly who Addie saw in her.'
      }
    ])
  };

  const existingSeries = await prisma.bookSeries.findFirst({
    where: { name: strongSavorySeries.name, projectId: project.id }
  });

  if (!existingSeries) {
    await prisma.bookSeries.create({
      data: { projectId: project.id, ...strongSavorySeries }
    });
    console.log(`Created series: ${strongSavorySeries.name}`);
  } else {
    await prisma.bookSeries.update({
      where: { id: existingSeries.id },
      data: strongSavorySeries
    });
    console.log(`Updated series: ${strongSavorySeries.name}`);
  }

  // ========== UPDATE EVIE CHARACTER ==========
  console.log("\n--- Updating Evie Maren Character ---\n");

  const evieUpdate = {
    name: 'Evelyn "Evie" Maren',
    firstName: 'Evelyn',
    lastName: 'Maren',
    nickname: 'Evie',
    archetype: 'The Everyday Saint / Culinary Arts Teacher',
    age: '34',
    hubLocation: 'Charlotte, NC',
    education: 'Culinary arts degree, started as line cook and pastry chef before teaching',
    careerHistory: `Line cook and pastry chef before realizing her true calling was teaching. Now Culinary Arts & Life Skills Teacher at Grace's Charlotte academy. Helps with school events, fundraisers, and community bake sales.`,
    modeledAfter: 'Ashley Williams (Victoria from How I Met Your Mother) - approachable, warm, girl-next-door beauty with expressive eyes and open smile',
    appearance: `Height: 5'6"
Hair: Chestnut brown, shoulder-length, often tied in messy bun with stray wisps
Eyes: Hazel-green with constant spark of curiosity
Style: Comfortable and whimsical - patterned skirts, colorful cardigans, aprons with flour smudges. Always looks like she stepped out of a cozy bakery.
Signature Aura: Radiates warmth and creativity, with a "safe" kind of approachable beauty that puts students at ease.`,
    personality: `Playful, nurturing, with streak of whimsical creativity. Can be scatterbrained when in her element. Believes food is love in its purest form. Has perfectionism in personal relationships that has led to heartbreak. Makes every student feel like the most important person in the room.`,
    background: `Parents still live in Asheville, running a small diner. Evie visits often; her students sometimes get care packages of diner pie from her mom. Lives alone in cozy apartment filled with cookbooks, plants, and string lights. Keeps a sourdough starter alive like it's a pet.

THE UNLIKELY SISTER:
Elena first noticed Evie at Grace's school - not just as a teacher, but as someone Grace truly adored. Elena says: "She doesn't fit our world, but she makes our world better."

Evie isn't polished or elite, but she's real. At first, people whispered: "Why is Elena bringing the teacher?" But over time, they noticed her gentle way of making everyone feel comfortable.

STRONG & SAVORY FOUNDATION:
What started as cooking classes evolved into the Strong & Savory Foundation - teaching athletes (especially Special Olympics athletes) meal prep and life skills. Sara offered Evie a fresh-meal business; Evie said yes to teaching but no to business because "the kids are that important to her."

Bella and Mandy see a foundation in Evie's future: "Strong & Savory is the seed, but you could take that love for kids and families and turn it into a legacy."

MY FAIR LADY TRANSFORMATION:
Bella and Mandy mentor Evie through a transformation - keeping her personality while expanding into new spaces. She asks them: "Will you mentor me and do my fair lady makeover without getting rid of my personality?"

Addie overwhelms Evie with contacts - "people who specialize in foundations, funding, legal structures. People who owe me favors."`,
    relationships: `Grace Barrett - student who adores her, says "school feels like family" in Evie's class
Elena Barrett - respects Evie as grounding influence in Grace's life
Sara Marquez - inseparable friends, kindred spirits who both give too much of themselves
Bella - mentor in My Fair Lady transformation
Mandy - co-mentor, sees foundation potential
Addie - provides protection and contacts
Cole - slow-burn platonic-to-romantic relationship
Jazz Carter - Special Olympics athlete she teaches meal prep
Maggie Donnelly - kindred spirit, "softer Maggie" energy`,
    wivesClubRole: 'Extended Circle - The Everyday Saint',
    reputationalNotes: `Students say she has "magic hands" - anything she bakes tastes like happiness itself. Uses food to heal, connect, and celebrate. One of the quiet emotional anchors in Grace's world.

Evie represents the "ordinary extraordinary" - someone with no strategic power, no global influence, but whose love and presence ripple out and transform the group in quiet, lasting ways.

She is proof that Elena's world, though glittering, still makes space for authentic, everyday goodness.`,
    arcStart: 'Classroom teacher, messy bun, flour-dusted cardigans',
    arcChange: 'Pulled into Elena\'s orbit, mentored by Bella and Mandy, overwhelmed by Addie\'s contacts',
    arcEnd: 'Founder of Strong & Savory Foundation, maintaining personality while expanding into new spaces'
  };

  const evie = await prisma.character.findFirst({
    where: { firstName: 'Evelyn', lastName: 'Maren' }
  });

  if (evie) {
    await prisma.character.update({
      where: { id: evie.id },
      data: evieUpdate
    });
    console.log('Updated: Evelyn "Evie" Maren');
  } else {
    await prisma.character.create({
      data: { projectId: project.id, ...evieUpdate, isConfirmed: true }
    });
    console.log('Created: Evelyn "Evie" Maren');
  }

  // ========== ADD COLE CHARACTER ==========
  console.log("\n--- Adding Cole Character ---\n");

  const coleData = {
    name: 'Cole',
    firstName: 'Cole',
    archetype: 'Evie\'s Slow-Burn Love Interest',
    hubLocation: 'Charlotte, NC',
    personality: 'Grounded, steady, quiet strength. Affirms Evie\'s beauty without making it romantic pressure.',
    background: `Evie's slow-burn romantic interest. Their "friend dates" became routine - movies, late diners, coffee walks.

KEY MOMENT - AFFIRMING EVIE:
At a dinner, Cole told Evie: "You already carry something rare - you're beautiful without ever trying to be. It's the kind of thing that makes a room softer when you walk in. You don't need to change anything about that."

When Evie asked about Bella and Mandy's "Mrs. Cole" joke, he said: "If they're teasing about 'future Mrs. Cole,' it means they see something we haven't figured out yet. But that's not pressure, Evie. It's just love. They love you, and they love us together — whatever that looks like."

He reframes everything for her with grounding wisdom: "It's your choice, Evie. It's always your choice."`,
    relationships: `Evie Maren - slow-burn romance, started as friend dates
Bella - friend who teases about "Mrs. Cole"
Mandy - friend who sees the connection`,
  };

  const cole = await prisma.character.findFirst({
    where: { firstName: 'Cole' }
  });

  if (cole) {
    await prisma.character.update({
      where: { id: cole.id },
      data: coleData
    });
    console.log('Updated: Cole');
  } else {
    await prisma.character.create({
      data: { projectId: project.id, ...coleData, isConfirmed: true }
    });
    console.log('Created: Cole');
  }

  // ========== ADD STRONG & SAVORY STORYLINES ==========
  console.log("\n--- Adding Strong & Savory Storylines ---\n");

  const storylines = [
    {
      title: 'Strong & Savory - Sara\'s Gym Classes',
      category: 'Character Arc',
      description: 'Evie teaches meal prep to athletes at Sara\'s gym',
      content: `Sara's Vision: Sara sees that many athletes at her gym — including Special Olympics athletes like Jazz — struggle with nutrition and life skills. She immediately thinks of Evie.

EVIE'S MEAL PREP CLASSES:
- Hands-on workshops where athletes learn to cook healthy meals, portion food, and shop on a budget
- She turns meal prep into fun: playlists, group cooking challenges, everyone leaving with containers of food they prepared themselves
- Jazz loves it, proudly showing Grace her "meal prep boxes" after the first class

THE BUSINESS OFFER:
Sara, ever the entrepreneur, offers Evie the chance to expand into a fresh-meal business tied to the gym. She sees potential: branded meal kits, a subscription model, a way to scale.

Evie listens kindly, grateful for the trust, but declines.

She says: "If I turn this into a business, I'll lose the part I love most. The kids need me in the classroom — not managing invoices and delivery schedules."

Why She Says No: Evie's heart belongs to her students. The joy for her isn't profit or scale — it's the moment when a young athlete beams because they cooked their first meal.`,
      characters: JSON.stringify(['Evie Maren', 'Sara Marquez', 'Jazz Carter', 'Grace Barrett'])
    },
    {
      title: 'Strong & Savory - Bella and Mandy Cast the Vision',
      category: 'Character Arc',
      description: 'Bella and Mandy tell Evie she could build a foundation',
      content: `THE VISION SCENE:
The smoothies were nearly finished. Bella leaned forward, eyes steady but kind.

"Evie, you already have a larger-than-life aura," Bella said firmly. "You don't even see it, but everyone feels it. You walk into a room, and people light up. Now it's time to expand that — with sisters at your side, with family and friends supporting you — to go bigger than you ever imagined. That's what Addie saw in you."

Evie's lips parted, stunned. "Larger than life? Me?"

Mandy cut in smoothly: "And when you do? That aura is going to carry something bigger. A foundation, maybe. Strong & Savory is the seed, but you could take that love for kids and families and turn it into a legacy. Local, national… maybe even global."

Evie blinked hard, whispering, "A foundation? That's… too big. That's not me."

Mandy smirked. "It's exactly you. Don't argue with me."

THE MRS. COLE TEASE:
The air grew thick with meaning — until Mandy smirked.

"And if all else fails, you've still got your future with Cole."

Evie's face went crimson. "What?"

Bella grinned wickedly. "The future Mrs. Cole. Don't think we haven't noticed."

They joked. They teased. And Evie couldn't get it out of her head.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy', 'Cole'])
    },
    {
      title: 'Strong & Savory - Evie\'s Journal Entry',
      category: 'Character Arc',
      description: 'Evie journals about the vision and can\'t stop thinking about it',
      content: `That night, Evie curled up at her kitchen table, pen in hand, her journal open to a blank page.

Bella said I already have a larger-than-life aura. Larger-than-life. Me. I can't stop replaying it. She said it's time to expand that with sisters, with family, to go bigger.

And Mandy — she said Strong & Savory is just the seed. She sees a foundation in me. Global, lasting, something that could be my legacy. My legacy.

And then they joked about the future Mrs. Cole. I laughed it off, I blushed, I said no. But I can't get it out of my head either.

Larger-than-life. A foundation. Mrs. Cole.

They're circling me over and over, and I don't know what to do with them.

She closed the journal quickly, heart pounding, but the words wouldn't leave her.`,
      characters: JSON.stringify(['Evie Maren'])
    },
    {
      title: 'Strong & Savory - Cole Affirms the Vision',
      category: 'Character Arc',
      description: 'On their next friend date, Evie asks Cole his thoughts',
      content: `Their "friend dates" had become routine — movies, late diners, coffee walks. Tonight, it was a simple stroll through the park.

Finally, Evie blurted: "Bella and Mandy said something the other day. Actually… a few things. And I can't stop thinking about them."

Cole listened, steady and patient.

"Bella said I have a larger-than-life aura, and that I should expand it with family and friends, go bigger. Mandy said Strong & Savory is just the seed, that I could have a foundation one day. Something lasting. And then—" She hesitated, cheeks heating. "They joked about the future Mrs. Cole. And I can't get any of it out of my head."

Cole was quiet, his steps slow and steady. Finally, he spoke.

"Bella's right. You do have a larger-than-life aura. People light up around you. You don't see it, but everyone else does. And Mandy's right too — Strong & Savory is more than a class. It's the kind of thing that could grow into something much bigger, if you wanted it to."

Evie's throat tightened. "And the other thing?"

Cole gave a faint smile. "If they're teasing about 'future Mrs. Cole,' it means they see something we haven't figured out yet. But that's not pressure, Evie. It's just love. They love you, and they love us together — whatever that looks like."

His grounding wisdom: "It's your choice, Evie. It's always your choice."`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Mandy'])
    },
    {
      title: 'Strong & Savory - Addie Plants the Seed',
      category: 'Character Arc',
      description: 'Addie overwhelms Evie with contacts to build the foundation',
      content: `A few days after her walk with Cole, Evie found herself at Addie's desk.

"I heard about Bella and Mandy's comments," Addie said gently.

Evie nodded, nervous. "They said Strong & Savory could become a foundation one day. That I could… build something lasting. I can't stop thinking about it, but it feels too big. I'm just me. Just a teacher."

Addie leaned forward, eyes steady. "Evie, I've watched you. You're not 'just' anything. You've created something powerful without even trying. Strong & Savory isn't just a class — it's a blueprint. With the right support, it could become an institution. And if you want it, I can help you get there."

Evie blinked. "Help me… how?"

Addie reached into a folder and began sliding papers across the desk. Names. Numbers. Organizations.

"These are contacts — people who specialize in foundations, funding, legal structures, education networks. People who owe me favors. If you wanted to build this tomorrow, you'd have the team to do it."

Evie stared at the list, overwhelmed. "This is… too much. I don't even know where to start."

Addie smiled softly. "That's why you have me. And Bella. And Mandy. You were never meant to do it alone."

Evie swallowed hard, tears pricking her eyes. "Addie… why me?"

Addie's expression warmed. "Because you're already doing the work with nothing but your heart and a handful of pans. Imagine what you could do with real resources."`,
      characters: JSON.stringify(['Evie Maren', 'Addie', 'Bella', 'Mandy'])
    },
    {
      title: 'Strong & Savory - The Drive Home Decision',
      category: 'Character Arc',
      description: 'Evie decides to start the foundation slowly and asks for mentorship',
      content: `THE DRIVE HOME (after Nashville trip):
The SUVs hummed down the interstate. Evie sat between Bella and Mandy. For miles she stayed quiet, watching the blur of trees. Then, almost shyly, she spoke.

"I've been thinking," she began.

Bella glanced over, alert immediately. "About?"

Evie drew in a slow breath. "The foundation. Strong & Savory. I don't want to jump straight into galas and national spotlights. It feels too big. Too much. But… what if I start regional? Just a few hubs. A slower build. One step at a time."

Bella's face softened, pride flickering in her eyes. "That's smart. Steady. Sustainable."

Mandy leaned back with a grin. "And very you. Keep it scrappy at the start, prove it works, then grow."

Evie smiled nervously, then turned to them both.

"But I can't do it alone. Girls… will you mentor me? Not just the foundation, but… me. A My Fair Lady makeover. But—" she rushed to add, cheeks pink — "without getting rid of my personality. I don't want to become someone else. I just want to… expand. Does that make sense?"

Bella's smile was warm. "Perfect sense. And yes. Of course we will."

Mandy winked. "Consider it done. But fair warning — you're stuck with us now."`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy'])
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
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated storyline: ${storyline.title}`);
    }
  }

  // ========== ADD STRONG & SAVORY ORGANIZATION ==========
  console.log("\n--- Adding Strong & Savory Foundation Organization ---\n");

  const foundation = {
    name: 'Strong & Savory Foundation',
    shortName: 'Strong & Savory',
    type: 'Nonprofit Foundation',
    industry: 'Education / Nutrition / Athletics',
    description: `A foundation teaching athletes — especially Special Olympics athletes — meal prep and life skills. Founded by Evelyn "Evie" Maren, it started as cooking classes at Grace's school and expanded through Sara Marquez's gym connection.

Core belief: "Food is love in its purest form."

The foundation transforms the ordinary (a bake sale, a cooking class, a late-night snack) into something memorable. Evie's gift is making anyone feel capable of cooking their own healthy meals.`,
    founder: 'Evelyn "Evie" Maren',
    leadership: JSON.stringify(['Evie Maren (Founder)', 'Sara Marquez (Gym Partner)', 'Addie (Advisor/Contacts)', 'Bella (Mentor)', 'Mandy (Mentor)']),
    services: `- Hands-on meal prep workshops for athletes
- Healthy cooking on a budget classes
- Life skills training (grocery shopping, portion control)
- Group cooking challenges with playlists and fun
- Containers of prepared food for participants to take home`,
    clients: 'Special Olympics athletes, gym members at Sara\'s facility, students at Grace\'s school',
    significance: `Started regional, with a slower build. "Just a few hubs. A slower build. One step at a time."

Vision from Bella and Mandy: "Strong & Savory is the seed, but you could take that love for kids and families and turn it into a legacy. Local, national… maybe even global."

Evie's condition: She said yes to teaching but no to making it a profit-driven business, because "the kids are that important to her."`,
  };

  const existingFoundation = await prisma.organization.findFirst({
    where: { name: foundation.name, projectId: project.id }
  });

  if (!existingFoundation) {
    await prisma.organization.create({
      data: { projectId: project.id, ...foundation }
    });
    console.log('Created: Strong & Savory Foundation');
  } else {
    await prisma.organization.update({
      where: { id: existingFoundation.id },
      data: foundation
    });
    console.log('Updated: Strong & Savory Foundation');
  }

  // Final counts
  const seriesCount = await prisma.bookSeries.count();
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();

  console.log(`\nTotal book series: ${seriesCount}`);
  console.log(`Total storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
