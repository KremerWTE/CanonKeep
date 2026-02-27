import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding comprehensive characters and gala outfit storylines...\n");

  // ========== NEW/UPDATED CHARACTERS FROM CHARACTERS.DOCX ==========
  console.log("--- Adding/Updating Characters from Characters.docx ---\n");

  const characters = [
    {
      name: 'Charlotte "Lottie" Hale',
      firstName: 'Charlotte',
      lastName: 'Hale',
      nickname: 'Lottie',
      archetype: 'The DUFF / Logistics & Grounding Force',
      hubLocation: 'Works for Elena',
      personality: `Quick wit, self-deprecating humor, and a "get it done" attitude. Sturdy rather than sleek, more practical than polished. She's the one who keeps the galas running, handles the crises, and makes sure everyone else shines.`,
      background: `Charlotte "Lottie" Hale is the core group's logistics manager and grounding force. She works for Elena and handles all the behind-the-scenes details that make events run smoothly.

THE "DUFF" LABEL:
Public perception: Lottie is the "plain" one, often unnoticed beside Addie's regal fire, Selene's dangerous allure, or Bella's soft glow. She's never featured in photos, never wearing the gowns.

Private reality: She's the one everyone leans on. Elena calls her "the spine." Every major player remembers Lottie, often more fondly than the speeches inside. For many, she's the reason they look forward to events.

The "DUFF" label could become an inside joke she reclaims, wearing it with humor rather than shame, because she knows the others would fight anyone who actually treated her that way.`,
      relationships: `Elena - works for her, called "the spine"
Addie, Selene, Bella, Kendra, Harper - core group, they'd defend her fiercely
VIPs and guests - many remember her more than the main events`,
    },
    {
      name: 'Margaret "Maggie" Donnelly',
      firstName: 'Margaret',
      lastName: 'Donnelly',
      nickname: 'Maggie',
      archetype: 'The Flirty Teacher / Grace\'s Favorite',
      hubLocation: 'Charlotte Academy',
      personality: `Gentle, bookish, nurturing but quietly ambitious. Outwardly charming and flirty, inwardly vulnerable. Struggles with keeping relationships but has a magnetic, outgoing attitude. She admires Elena's drive and Sara's heart.`,
      background: `Grace's beloved literature & history teacher at her Charlotte academy. She's whip-smart, creative, and has a gift for making kids love learning. Grace often repeats Maggie's lessons at home, which is how Elena and Sara first noticed her.

CONNECTION TO THE ORBIT:
Maggie was first noticed by Elena at Grace's school events. Her warmth and teaching style reminded Elena of Victoria's energy. She gradually becomes woven into Elena's and Sara's world - she respects Elena's elegance but feels more at ease with Sara's warmth.

RELATIONSHIP STRUGGLES:
Despite her flirty, outgoing attitude, Maggie struggles with keeping relationships. She becomes a confidante for the younger women, especially Bella and Grace, showing them that worth isn't measured by a dress size or a title.`,
      relationships: `Grace Barrett - her favorite student
Elena - first noticed her, respects her elegance
Sara - feels most at ease with her warmth
Bella - becomes a confidante
Chris Donnelly - related (shares last name)`,
    },
    {
      name: 'Aaron',
      firstName: 'Aaron',
      archetype: 'Minor Character - Mentioned in Orbit',
      hubLocation: 'Charlotte area',
      personality: 'Details pending from source documents',
      background: 'Aaron is mentioned in the Characters.docx as part of the extended orbit. Further details to be extracted from source materials.',
    },
    {
      name: 'Sara Hale',
      firstName: 'Sara',
      lastName: 'Hale',
      archetype: 'Gym Owner / Heart of the Family Network',
      hubLocation: 'Charlotte - Sara\'s Gym',
      personality: `Nurturing, steady, deeply human. She's the heart of the family network, the one who sees everyone's children not just as students but as her own. Bonds deeply with all the kids.`,
      background: `Sara owns the gym where the Strong & Savory cooking classes are held. She's not the "DUFF" - that's Lottie's role in perception. Instead, she's the heart of the family network.

PCOS AND WEIGHT STRUGGLE:
Sara has a vulnerable, deeply human storyline around PCOS and weight struggles. This makes her relatable and adds depth to her character beyond the gym owner role.

STRONG & SAVORY CONNECTION:
Sara offered Evie a gym meal business opportunity, but Evie said no to business, yes to teaching. The Strong & Savory cooking classes began at Sara's gym, making Sara integral to Evie's foundation work.`,
      relationships: `Evie Maren - hosts Strong & Savory classes at her gym
Elena - part of her world
Maggie - feels at ease with Sara's warmth
Jazz Carter - trains at her gym
Special Olympics athletes - welcomes them at gym fundraising events`,
    },
  ];

  for (const charData of characters) {
    const existing = await prisma.character.findFirst({
      where: { firstName: charData.firstName, lastName: charData.lastName || undefined }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...charData, isConfirmed: true }
      });
      console.log(`Created: ${charData.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: charData
      });
      console.log(`Updated: ${charData.name}`);
    }
  }

  // ========== GALA OUTFIT STORYLINES ==========
  console.log("\n--- Adding Gala Outfit Storylines ---\n");

  const galaOutfitStorylines = [
    {
      title: 'Evie\'s Gala Transformation - Shopping with Addie',
      category: 'Gala Outfits',
      description: 'Evie asks Addie for help with gala attire',
      content: `THE REQUEST:
At the last gala, Evie felt underdressed. Honestly, that was the nicest thing she owned. She didn't want to stand out for the wrong reasons.

Evie hesitated, twisting her hands. "At the last gala... I felt underdressed. Would you help me? With what to wear?"

Addie didn't hesitate. "Yes. Absolutely. We'll go together. And I'll pay for your whole outfit - or two or three."

THE CATCH:
"Only thing is Grace is allowed to come because she is great at it."

THE SHOPPING TRIP:
Addie took Evie on a full shopping experience:
- Gala gowns (including the sage-green gown that would become her signature)
- Lingerie ("We need to take you out again for undergarments")
- Jewelry
- Beauty products

Addie revealed her role: not only at BSS, but as the "umbrella" that protects everyone in the orbit. Evie is now under that umbrella.`,
      characters: JSON.stringify(['Evie Maren', 'Addie', 'Grace Barrett'])
    },
    {
      title: 'Evie\'s Sage-Green Gown - The Princess Moment',
      category: 'Gala Outfits',
      description: 'Evie debuts her sage-green gown at the gala',
      content: `THE HOTEL SUITE PRE-GALA RITUAL:
The hotel suite buzzed with chatter and laughter as gowns were steamed and jewelry was passed hand to hand. Evie ducked into the dressing room, clutching her sage-green gown like it was a shield.

THE REVEAL:
When Evie stepped out of the dressing room in the sage-green gown, the whole suite seemed to pause.

Grace dropped the shoes she'd been carrying and clapped her hands. "Aunt Evie, you look like a princess!"

The wives smiled knowingly, Addie's reflection glowing with pride.

COLE'S REACTION:
When the men came up to escort the women, Cole's reaction was jaw-dropping. Elena teased him: "Tighten up there, sailor."

Addie ensured Evie walked in last, giving her the entrance she deserved.

LINGERIE MOMENT:
Pre-gala ritual: Addie & Bella asked about lingerie. Evie admitted she chose the blue set they'd picked together.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Addie', 'Grace Barrett', 'Elena', 'Bella'])
    },
    {
      title: 'Addie\'s Gala - Evie\'s First Big Event',
      category: 'Gala Outfits',
      description: 'Evie attends Addie\'s gala in her navy dress',
      content: `THE SETTING:
The ballroom glittered with gowns and tuxedos. Politicians and bishops in formal wear. Glittering ballrooms, sequined gowns everywhere.

EVIE'S OUTFIT:
Evie wore her navy dress - plain against the shimmer of sequins and silk. She felt small at first, out of place.

COLE'S REASSURANCE:
Cole leaned down and murmured, "You belong here, more than half these people."

She straightened her shoulders and smiled. By the end of the night, she had a circle of guests laughing at her flour-covered stories.

ADDIE'S OBSERVATION:
Addie caught Cole watching her and smiled knowingly. The whispers had begun - not about who she was or what she wore, but about how she made them feel.

She wasn't just Cole's plus-one. She was Evie.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Addie'])
    },
    {
      title: 'Holiday Gala at Elena\'s - Velvet Green',
      category: 'Gala Outfits',
      description: 'Evie wears velvet green at Elena\'s Christmas gala',
      content: `THE SETTING:
The Aurelia estate glowed with Christmas lights. The estate twinkled in holiday lights.

EVIE'S OUTFIT:
Evie arrived in a velvet green dress, a cardigan over her shoulders. Cole beside her in a tailored black suit.

THE EVENING:
By the fire, they laughed over mugs of mulled wine while the elite mingled.

"Elena's really outdone herself," Evie whispered.

Cole murmured, "You outshine the lights."

Evie rolled her eyes, but her blush said otherwise. Sara noticed, smiling knowingly.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Elena', 'Sara'])
    },
    {
      title: 'Jasper\'s House Dinner - Simple Black Dress',
      category: 'Gala Outfits',
      description: 'BSS celebration dinner at Jasper\'s house',
      content: `THE SETTING:
Jasper's House Dinner - a BSS Celebration. The adults dressed up for a nice dinner to celebrate BSS.

EVIE'S OUTFIT:
Evie wore a simple black dress. Cole at her side.

THE ATMOSPHERE:
A refined, celebratory dinner with that soft undercurrent between Cole and Evie. Everyone teasing them about being together.

PUBLIC vs PRIVATE:
Public: formal, social celebration
Private: the growing connection between Cole and Evie that everyone notices`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Jasper Barrett', 'Harper'])
    },
    {
      title: 'Sara\'s Gym Fundraising Banquet',
      category: 'Gala Outfits',
      description: 'Cole as Evie\'s plus-one at the gym fundraiser',
      content: `THE EVENT:
Sara's Gym Fundraising Banquet - a more casual but still dressed-up affair for the gym's charitable work.

OUTFITS:
- Evie: Floral dress
- Cole: Gray suit

THE EVENING:
Cole showed up as Evie's plus-one. They ended up laughing together at their table more than anyone else.

The other guests noticed them - clearly comfortable, clearly connected.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Sara'])
    },
    {
      title: 'Wilmington Gala Night - The Full Ritual',
      category: 'Gala Outfits',
      description: 'Complete pre-gala ritual at Wilmington',
      content: `THE HOTEL SUITE CHAOS:
The hotel suite buzzed with its usual pre-gala chaos:
- Curling irons
- Makeup brushes
- Gowns draped across beds

Addie and Bella moved with practiced ease while Evie tried to keep up.

THE RITUAL:
This was the ritual before every major gala: the women gathering to prepare together, trading dresses, fixing makeup, laughing.

EVIE'S MOMENT:
Addie made sure Evie got her "moment" - walking in last, all eyes on her new transformation.

THE LINGERIE CALLBACK:
Playful questions about which set she chose. Evie admitted she went with the blue - their earlier shopping trip paying off.

COLE'S REACTION:
His jaw dropped. Elena's teasing: "Tighten up there, sailor."

This wasn't just about clothes. This was about belonging.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Addie', 'Bella', 'Elena'])
    },
    {
      title: 'The Girls\' Day - Wardrobe Shopping Round Two',
      category: 'Gala Outfits',
      description: 'Bella and Mandy take Evie shopping for work and gala clothes',
      content: `THE EXPANDED SHOPPING:
After Addie's first shopping trip, Bella (and this time Mandy too) took Evie for another wardrobe shopping day.

THE BLEND:
Two worlds combined:
1. Elegant outfits for galas
2. Practical-but-stylish cooking clothes for Strong & Savory

THE TEASING:
Plenty of teasing about Cole - because sisters can't resist.

THE BOUTIQUE MOMENT:
During the shopping, Evie stood frozen in front of a mirror wearing sleek black leggings and a fitted top that made her look ten years younger and more confident.

Bella snapped a photo before Evie could protest, laughing as Evie covered her face with both hands.

BELLA'S ADVICE:
"Trust us. The first time you walk into the gym wearing these, you'll get it."

Addie smirked, slipping her sunglasses back on. "And maybe Cole will too."

Evie groaned, covering her face. "I hate you both."

But she was smiling.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy', 'Addie'])
    },
    {
      title: 'The Lingerie Shopping Trip',
      category: 'Gala Outfits',
      description: 'Bella and Mandy take Evie lingerie shopping',
      content: `THE EXTENDED SHOPPING:
After gowns came: lingerie, jewelry, beauty products. Mandy also needed to grab items for the barn.

THE LINGERIE STORE MOMENT:
At the lingerie store, both Mandy and Bella asked:

"Are you sure you don't play for the other team? Or want to try sometime?"

Evie was flustered but amused.

BELLA'S TEACHING:
Bella taught Evie:
- When to wear what
- How to keep it all organized
- Lingerie as mindset, not just clothing

THE PRIVATE TETHER:
Later, Bella noticed Evie still wore the lingerie as a private tether - a reminder of belonging, even when overwhelmed.

Bella affirmed: "You're welcome in this life at your pace - but you can't escape us."

Evie felt supported, not judged.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy'])
    },
    {
      title: 'Charity 5K Walk - Casual Attire',
      category: 'Gala Outfits',
      description: 'Cole and Evie at the charity walk',
      content: `THE EVENT:
Evie signed up for a Charity 5K Walk, dragging Cole along.

OUTFITS:
- Cole: Running gear
- Evie: Strong & Savory shirts

THE WALK:
They walked side by side the whole way, talking, laughing, handing out cookies at the finish.

To the community, they were the heart of the event.`,
      characters: JSON.stringify(['Evie Maren', 'Cole'])
    },
    {
      title: 'Jazz\'s Team USA Pride',
      category: 'Gala Outfits',
      description: 'Jazz wearing her Team NC and USA gear everywhere',
      content: `NATIONAL GAMES (TOP 5):
Even when she doesn't win gold, Jazz walks tall, wearing her Team North Carolina gear every day:
- To the gym
- To Bella's house
- Even to church with her mom

THE IDENTITY:
It becomes part of her identity. The core kids start teasing her (affectionately) for treating her jersey like a second skin.

TEAM USA:
Jazz grinning ear-to-ear because she's part of something bigger than herself. Wearing the Team USA gear everywhere makes her instantly recognizable in her community, like a walking symbol of pride.

Neighbors and church members see her as a hero.

For Bella, seeing Jazz rep Team USA is validation of everything she's worked for.`,
      characters: JSON.stringify(['Jazz Carter', 'Bella'])
    },
    {
      title: 'Evie\'s Park Stroll - New Wardrobe Debut',
      category: 'Gala Outfits',
      description: 'Evie wears new items on a friendly date with Cole',
      content: `THE OCCASION:
After the shopping experiences, Evie had a friendly date with Cole after work - a stroll in the park.

THE OUTFIT:
She wore some of the new items from the shopping trip, including the small gold chain Bella had fastened around her neck earlier.

She felt both nervous and proud, like she was wearing proof of a new chapter.

COLE'S NOTICE:
Cole was already waiting, hands in his pockets, dressed in his usual no-nonsense jacket and boots.

He gave her a once-over, his brow lifting just slightly.

"New?" he asked.

THE CONVERSATION:
They talked about life as they walked, and Evie recapped the shopping experience - the sisterhood, the overwhelming kindness, the way Addie and Bella had pulled her deeper into the orbit.`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Addie'])
    }
  ];

  for (const storyline of galaOutfitStorylines) {
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

  // ========== UPDATE EVIE WITH COMPLETE FASHION ARC ==========
  console.log("\n--- Updating Evie with complete fashion/gala arc ---\n");

  const evie = await prisma.character.findFirst({
    where: { firstName: 'Evelyn', lastName: 'Maren' }
  });

  if (evie) {
    const fashionDetails = `

GALA WARDROBE EVOLUTION:

BEFORE THE ORBIT:
- Navy dress (nicest thing she owned, felt underdressed at first gala)
- Messy bun, flour-dusted cardigans, kitchen apron instead of ballgown

SHOPPING TRIP WITH ADDIE:
Addie took her shopping for:
- Gala gowns (including signature sage-green gown)
- Lingerie ("undergarments" shopping trip)
- Jewelry (small gold chain)
- Beauty products

Grace came along because "she's great at it."

KEY OUTFITS:
1. Navy dress - first gala, felt small but Cole said "You belong here"
2. Sage-green gown - her "princess moment," Cole's jaw dropped
3. Velvet green dress with cardigan - Holiday Gala at Elena's
4. Simple black dress - Jasper's BSS celebration dinner
5. Floral dress - Sara's Gym Fundraising Banquet
6. Strong & Savory shirts - Charity 5K Walk

THE TRANSFORMATION:
Pre-gala ritual: Addie ensures Evie walks in last, getting her "moment"
Cole's reaction to sage-green gown: Elena teases "Tighten up there, sailor"

LINGERIE AS MINDSET:
Bella taught her: when to wear what, how to organize, lingerie as confidence
Evie still wears the pieces as a "private tether" - proof of belonging`;

    await prisma.character.update({
      where: { id: evie.id },
      data: {
        background: (evie.background || '') + fashionDetails
      }
    });
    console.log('Updated: Evie with complete fashion/gala arc');
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
