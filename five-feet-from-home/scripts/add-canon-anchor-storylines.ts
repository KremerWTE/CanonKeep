import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Canon Anchor storylines and character updates...\n");

  // ========== CANON ANCHOR STORYLINES ==========
  console.log("--- Adding Canon Anchor Storylines ---\n");

  const storylines = [
    {
      title: 'Evie\'s Sweet Simplicity - Character Foundation',
      category: 'Character Arc',
      description: 'Evie\'s choice to love through vocation, not romance',
      content: `CANON ANCHOR - EVIE'S CORE:
Evie's desserts are symbolic — sweet, simple gifts that leave lasting impressions.

Her refusal to jump into a relationship just because "she should" makes her stand apart in Elena's orbit. She represents the choice to love through vocation, not just romance — and the group respects her more for it.

At Sara's gym during meal-prep night, a single dad tried to flirt. Evie joked it off, making the athletes laugh while Sara smirked knowingly.

She doesn't chase romance - kids are her relationship. Her cooking and teaching become her way of loving the world.`,
      characters: JSON.stringify(['Evie Maren', 'Sara', 'Elena'])
    },
    {
      title: 'Evie Evolves - From Teacher to Life-Skills Mentor',
      category: 'Character Arc',
      description: 'Jazz awakens Evie\'s new purpose',
      content: `CANON ANCHOR - EVIE'S EVOLUTION:
Evie evolves from "just the sweet teacher" into a life-skills mentor for special needs athletes.

Jazz is the bridge that awakens her new purpose. While Evie may never run a business or fit the elite mold, she becomes irreplaceable in her own lane — giving athletes tools for dignity and independence, one recipe at a time.

FIRST CLASS WITH JAZZ:
Evie was nervous at first, but found joy as the athletes lit up learning to cook. Jazz became her "assistant teacher," helping the younger kids and making everyone laugh.

Eventually, Evie evolved from being "Grace's favorite teacher" to the founder of a life-skills after-school program for special needs youth, directly inspired by Jazz's transformation. It's small, local, and deeply personal — exactly the kind of grassroots good that makes her irreplaceable in the orbit.`,
      characters: JSON.stringify(['Evie Maren', 'Jazz Carter', 'Grace Barrett'])
    },
    {
      title: 'Evie\'s "No Money" Policy',
      category: 'Character Arc',
      description: 'Evie refuses payment for her program',
      content: `CANON ANCHOR - PURE SERVICE:
When asked about charging for her program, Evie said: "Let it be free."

Her refusal of money and insistence on free access made her program a symbol of pure service. In a world filled with power, wealth, and glamor, she became the quiet proof that the greatest influence comes from love without price tags.

FUNDRAISER NIGHT:
The first fundraiser was a school bake sale/small auction. Maggie hammed it up as auctioneer, Grace ran around selling cookies, and Evie just blushed at the crowd's love.

By merging food and fitness with Sara, they created a holistic, free program for special needs athletes — a model of dignity and joy that reshapes lives.`,
      characters: JSON.stringify(['Evie Maren', 'Sara', 'Maggie Donnelly', 'Grace Barrett'])
    },
    {
      title: 'Cole and Evie - The Flour Moment',
      category: 'Character Arc',
      description: 'The first spark between Cole and Evie',
      content: `CANON ANCHOR - THE FIRST SPARK:
When Cole first saw Evie, she was covered in flour, laughing with the kids at Strong & Savory. Her heart stopped when she saw him. Cole was intrigued.

They dated once, but both realized neither of them were ready for a relationship. They remained close friends instead.

THE UNFINISHED CHEMISTRY:
They never denied the flirty energy. That moment lingers as a private memory for both.

The decision: They weren't ready for a relationship. Neither wanted to risk what they were building — so they chose friendship, deliberately.

Cole's attraction to Evie becomes part of the undercurrent — acknowledged silently but never pursued. He values her innocence, her shy-yet-bold aura, and her independence. That's enough to make her one of the few people in his life who genuinely grounds him.`,
      characters: JSON.stringify(['Evie Maren', 'Cole'])
    },
    {
      title: 'Evie\'s Hidden Beauty',
      category: 'Character Arc',
      description: 'Evie doesn\'t believe she\'s attractive',
      content: `CANON ANCHOR - EVIE'S CONTRADICTION:
Evie is the character who never believes she's attractive — but in reality, she's one of the most beautiful women in the orbit.

Her appeal is different: understated, wholesome, radiant in moments of authenticity. That contrast between self-doubt and reality makes her unforgettable, both to readers and to the characters around her.

COLE'S OBSERVATION:
Cole notices this contrast — Evie brushing off her looks, while he privately sees her as absolutely stunning. The way she walks isn't a runway stride. It's soft, a little self-conscious, like she's still unsure if she deserves to be here. But there's something magnetic about it.

Cole told her: "You already carry something rare — you're beautiful without ever trying to be. It's the kind of thing that makes a room softer when you walk in."`,
      characters: JSON.stringify(['Evie Maren', 'Cole'])
    },
    {
      title: 'Cole and Evie - Friend Dates That Look Like Dating',
      category: 'Character Arc',
      description: 'Their platonic companionship that everyone assumes is romantic',
      content: `CANON ANCHOR - THE RHYTHM:
From the outside, it looks like dating. From the inside, it's friendship — companionship that feels like a respite for both.

Cole admires her innocence and glow; Evie treasures his steadiness and presence. They don't need to name it.

THE RUNNING GAG:
Everyone around them keeps insisting they're dating — kids, Maggie, Sara — while Cole and Evie insist "it's just friendship" (but secretly enjoy that people see them that way).

LOW-KEY VS HIGH-KEY:
- Low-key: Ordinary moments (grocery runs, baking, long walks) that feel intimate, comfortable, and always spark outside assumptions
- High-key: Public events (galas, school auctions, ranch dinners) where they look like a polished couple, but remain platonic

Together, they build the image of a pair who "date without dating" — companions with undeniable chemistry, yet grounded in a friendship neither wants to risk.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Maggie Donnelly', 'Sara'])
    },
    {
      title: 'Addie Protects Cole and Evie\'s Bond',
      category: 'Character Arc',
      description: 'Addie becomes advocate of their friendship',
      content: `CANON ANCHOR - ADDIE'S ROLE:
Addie becomes the protector and advocate of Evie & Cole's bond, much like Cole once was for her.

She doesn't force anything — she just makes space, offers cover, and reminds Cole that Evie belongs.

ADDIE'S WORDS:
"You're not wrong to keep her at arm's length — but you're also not wrong to want her close. Just don't let fear be the reason you hold back. If you both decide you want more, the path will already be clear."

It adds depth to Cole's arc: his reluctance, his respect for Evie's innocence, and Addie's recognition of how much Evie already means to him.`,
      characters: JSON.stringify(['Addie', 'Cole', 'Evie Maren'])
    },
    {
      title: 'Evie Joins the Family - Addie\'s Promise',
      category: 'Character Arc',
      description: 'Evie learns she\'s under Addie\'s protection',
      content: `CANON ANCHOR - THE ADMISSION:
Evie admitted openly: kids are her relationship, not romance.

Addie revealed her history with Cole, grounding him as someone who saves lives quietly.

Addie formally brought Evie into the "family" — foreshadowing POH/Wives Club without explanation, only weight.

Grace is the bridge — her love for Evie sealed her protection.

SARA'S AFFIRMATION:
When Evie processed Addie's promise with Sara, Sara affirmed Addie's importance in vague but weighty language. Evie doesn't learn about the Wives Circle or POH — she only feels the gravity of being brought under Addie's wing.

This leaves Evie innocent, but aware: Addie's word means something binding.`,
      characters: JSON.stringify(['Evie Maren', 'Addie', 'Sara', 'Grace Barrett', 'Cole'])
    },
    {
      title: 'Grace Calls Her "Aunt Evie"',
      category: 'Character Arc',
      description: 'Grace makes it official in front of the family',
      content: `CANON ANCHOR - THE NAMING:
At a firepit gathering, Grace casually named Evie "Aunt Evie" in front of the family — not at school, not at the gym, but in the safe heart of the orbit.

Evie was stunned, unsure how to respond, but the group's quiet acceptance made it stick. Cole's subtle nod reinforced that she belonged.

THE MOMENT:
Grace's simple words confirmed Addie's promise. Evie heard it not from an adult with secrets, but from a child she trusts — making it hit deeper.

The firepit setting made it intimate, almost ceremonial, without being formal.

"Aunt Evie" stuck — Grace kept using it at family events, the others adopted it, and Evie eventually embraced it, though always with that shy blush.`,
      characters: JSON.stringify(['Evie Maren', 'Grace Barrett', 'Cole', 'Addie'])
    },
    {
      title: 'Evie\'s Journal Reflection - I Am Family',
      category: 'Character Arc',
      description: 'Evie reflects and finally believes she belongs',
      content: `CANON ANCHOR - THE REALIZATION:
After all the affirmations from Addie, Cole, and Grace, Evie reflected alone — journaling and baking afterward — realizing for herself that "family" means she doesn't have to earn belonging anymore.

JOURNAL ENTRY:
"I don't have to earn this anymore."

Her writing confirmed the voices of Addie, Cole, and Grace had finally sunk in.

Baking shifted from a way to earn worth → to an expression of belonging.

She ended with quietly affirming to herself: she is family. And for the first time, she believed it.`,
      characters: JSON.stringify(['Evie Maren'])
    },
    {
      title: 'Bella\'s My Fair Lady Story',
      category: 'Character Arc',
      description: 'Bella shares her transformation journey with Evie',
      content: `CANON ANCHOR - BELLA'S ADMISSION:
Bella admitted: "Addie did the same for me. Made me see myself. Dressed me up. Showed me who I could be."

Evie bonded instantly with that reference - her own "My Fair Lady" transformation.

BELLA'S ARC:
- Addie's mentorship
- Relationship with Mandy opened doors to her sexuality
- Love with Matt blossomed after
- She stopped hiding from herself

Bella affirmed Evie's worth, promising to help (starting with lingerie shopping).

Evie gained not just Addie's protection, but Bella as a true peer ally.`,
      characters: JSON.stringify(['Bella', 'Evie Maren', 'Addie', 'Mandy', 'Matt'])
    },
    {
      title: 'The Girls\' Day - Full Makeover',
      category: 'Character Arc',
      description: 'Addie escalates the shopping into a full transformation',
      content: `CANON ANCHOR - THE FULL EXPERIENCE:
Addie escalated the lingerie trip → full girls' day of shopping.

They covered every area of Evie's life:
- Shoes
- Dresses
- Everyday clothes
- Jewelry
- Even cooking gear

Evie confided in Bella about her discomfort and gratitude.

Bella and Addie affirmed: she now has sisters, no take-backs.

THE MOMENT:
At the end, Evie walked out knowing she wasn't alone anymore. The lingerie drawer, the new wardrobe — they became symbols of belonging, proof she has real female friends for the first time.`,
      characters: JSON.stringify(['Evie Maren', 'Addie', 'Bella'])
    },
    {
      title: 'Evie\'s Retreat - Back to Baggy Clothes',
      category: 'Character Arc',
      description: 'Evie panics and retreats after Cole\'s reaction',
      content: `CANON ANCHOR - THE RETREAT:
When Evie showed up to the gym in her new gear, Cole didn't recognize her at first — that striking was her transformation.

His reaction was undeniable. But it scared Evie.

She panicked and retreated back to her "safe" baggy clothes. The lingerie drawer became her private tether to the life Addie and Bella showed her.

She wasn't ready yet — but she kept the possibility close, worn against her skin.

BELLA'S RESPONSE:
Bella found her in baggy clothes, called her out with love:

"You're not hiding from us. You're hiding from yourself. We're not going anywhere, Evie. Take your time. But we'll always check in."

Evie felt supported, not judged.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Addie'])
    },
    {
      title: 'Evie Admits Fear to Cole',
      category: 'Character Arc',
      description: 'Evie confesses Cole\'s reaction scared her',
      content: `CANON ANCHOR - THE CONFESSION:
At the diner (neutral, safe ground), Evie told Cole everything — the girls' day, the new clothes, why she pulled back.

She admitted: "Your reaction felt like more than friendship. And I don't want that. I'm not ready."

Cole respected her boundary completely, affirming their friendship.

COLE'S RESPONSE:
"I get it. And I'm not pushing for anything. I just needed the full story."

He also revealed Addie & Bella's matchmaking instincts are rooted in love: "They want us together. That's why the outfits, the hints, the galas. It's the best way they know how to help."

Their bond was strengthened by honesty, not weakened.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Addie', 'Bella'])
    },
    {
      title: 'Bella and Mandy\'s Vision for Evie',
      category: 'Character Arc',
      description: 'They see Evie\'s potential for a foundation',
      content: `CANON ANCHOR - THE VISION:
Bella reframed: "You already have a larger-than-life aura. Now it's time to expand it."

Mandy built on it: "That aura should fuel something big, like a foundation."

Both affirmed Addie saw the same things.

THE "MRS. COLE" TEASE:
They joked about "future Mrs. Cole," making Evie blush but laugh. She said: "I hate you both." But she was smiling.

Evie's journal entry that night: she wrestled with Bella calling her "larger than life" and Mandy's foundation vision, while trying to brush off (but secretly lingering on) the "Mrs. Cole" joke she couldn't quite shake.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy'])
    },
    {
      title: 'Cole Explains the "Mrs. Cole" Joke',
      category: 'Character Arc',
      description: 'Cole reframes the teasing as love',
      content: `CANON ANCHOR - THE EXPLANATION:
After Evie blurted out her confusion about the "Mrs. Cole" joke, Cole affirmed Bella & Mandy's vision but reframed the tease:

"If they're teasing about 'future Mrs. Cole,' it means they see something we haven't figured out yet. But that's not pressure, Evie. It's just love."

He closed with reassurance: "No one's going anywhere."

That night, Evie smiled without embarrassment for the first time when thinking about it.

In her journal she processed: Addie & Bella's "pressure" wasn't about romance — it was about unconditional love, wanting her to see herself the way they already do.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Mandy', 'Addie'])
    },
    {
      title: 'Addie Overwhelms with Contacts',
      category: 'Character Arc',
      description: 'Addie gives Evie resources for her foundation',
      content: `CANON ANCHOR - THE FOLDER:
Addie affirmed Bella & Mandy's vision directly. Then she overwhelmed Evie with a folder of contacts, showing her real tools and resources.

Evie felt terrified, but Addie reframed it: "This is the right place to begin."

BELLA'S HELP:
When Evie showed Bella the folder, Bella laughed: "Yep, that's Addie — she doesn't plant seeds, she builds whole gardens."

Bella helped break it down into three steps:
1. Mentor
2. Funding
3. Legal

Evie started to believe — not all at once, but piece by piece. Maybe she could actually do this.`,
      characters: JSON.stringify(['Evie Maren', 'Addie', 'Bella'])
    },
    {
      title: 'Evie Asks Bella to Be Her Mentor',
      category: 'Character Arc',
      description: 'Evie takes the first step toward her foundation',
      content: `CANON ANCHOR - THE ASK:
Evie asked Bella directly to be her mentor.

Bella was shocked but deeply honored, seeing it as a full-circle moment from Addie.

Bella accepted with conditions: "I'll push. I won't let you hide."

ADDING MANDY:
Bella brought Mandy along as well:
- Bella = "Hawk with Addie" → patient, step by step, Evie sets the pace
- Mandy = the sharper edge → no hiding, no excuses

Evie ended with both — a steady guide and a sharp challenger. The path felt like a climb she wouldn't have to make alone.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy'])
    },
    {
      title: 'Cole\'s Past - Ex-Wife and Estranged Daughter',
      category: 'Character Arc',
      description: 'Cole\'s reason for avoiding relationships',
      content: `CANON ANCHOR - COLE'S CONFESSION:
Cole admitted: his past was filled with shallow relationships, an ex-wife, and estrangement from his daughter.

He distances himself to protect others. He doesn't want a relationship because he went through women like candy during his team days.

THE FEAR:
He has an ex-wife and daughter he is estranged from. He doesn't want to do that to anyone else — so to protect Evie (and himself), he keeps distance.

Evie admitted: she never expected anything like this. She'd never even thought she liked girls (referring to her confusion with Sofia). But with both relationships, she discovered love doesn't fit into the box she expected.

The only person Cole's let close since is Addie, because he was once her protector.`,
      characters: JSON.stringify(['Cole', 'Evie Maren', 'Addie'])
    },
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

  // ========== UPDATE COLE WITH EX-WIFE/DAUGHTER DETAILS ==========
  console.log("\n--- Updating Cole with ex-wife/daughter backstory ---\n");

  const cole = await prisma.character.findFirst({
    where: { firstName: 'Cole' }
  });

  if (cole) {
    const coleUpdate = {
      background: (cole.background || '') + `

EX-WIFE AND ESTRANGED DAUGHTER:
Cole's past is filled with shallow relationships. During his team days, he went through women like candy. He has an ex-wife and a daughter he's estranged from.

He doesn't want a relationship because he doesn't want to do that to anyone else. So to protect Evie (and himself), he kept distance when he started to feel something real.

The only person he's let close since is Addie, because he was once her protector.

He won't drag Evie into his wreckage — not the shadows of his past, not the weight of his mistakes, not the wreckage of an ex-wife and a daughter he barely knew.`,
    };

    await prisma.character.update({
      where: { id: cole.id },
      data: coleUpdate
    });
    console.log('Updated: Cole with ex-wife/daughter backstory');
  }

  // ========== UPDATE EVIE WITH COMPLETE ARC ==========
  console.log("\n--- Updating Evie with complete character arc ---\n");

  const evie = await prisma.character.findFirst({
    where: { firstName: 'Evelyn', lastName: 'Maren' }
  });

  if (evie) {
    const evieArc = {
      arcStart: 'Sweet teacher who doesn\'t believe she\'s attractive, refuses romance, loves through vocation',
      arcChange: 'Pulled into orbit by Addie, transformed by girls\' day shopping, discovers sisterhood, retreats in fear, then slowly accepts belonging',
      arcEnd: 'Founder of Strong & Savory Foundation, surrounded by sisters, potentially opens heart to Cole or Sofia',
    };

    await prisma.character.update({
      where: { id: evie.id },
      data: evieArc
    });
    console.log('Updated: Evie with complete arc');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();

  console.log(`\nTotal storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
