import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING FUN TIME ENCOUNTERS ===\n");

  const encounters = [
    // ADDIE'S ENCOUNTERS
    {
      title: "Addie, Jasper & Elena: The Threesome",
      encounterType: "threesome",
      participants: JSON.stringify(['Addie', 'Jasper Barrett', 'Elena Barrett']),
      location: "The Barrett Compound - Master Suite",
      galaConnection: "After EOHSJ Annual Gala",
      setting: `After a particularly intense crisis resolution and a successful gala. The adrenaline was still flowing. Wine was poured. Elena invited Addie to stay late. The conversation shifted. Elena made the first move.`,
      description: `Elena led, as she does in social situations. She undressed first, signaling permission. Jasper watched, aroused by the trust between these two women he respected.

Addie hesitated - this was crossing a line. But Elena's hand on her cheek, Jasper's approving gaze... she surrendered.

Elena positioned herself between them, taking and giving in equal measure. Jasper was gentle with Addie at first, checking her comfort. When she responded eagerly, he became more commanding.

The three of them moved together for hours. Elena and Addie explored each other while Jasper watched, then joined. Different combinations, different rhythms.

It ended with all three exhausted, tangled in silk sheets, laughing at the absurdity and perfection of what they'd done.`,
      powerDynamic: "Elena led initially, then Jasper took command. Addie submitted to both but had moments of control with Elena.",
      aftermath: `It didn't become regular. But it changed everything. The three share a secret that makes their professional relationship unshakeable. They can look at each other across a crowded gala and remember exactly what the others feel like.`,
      emotionalImpact: "Cemented Addie into the innermost circle. Proved Elena's trust. Showed Jasper a new side of both women.",
      isSecret: true,
      bookAppearance: "Referenced in The Royal Phoenix",
      tags: "threesome, power, trust, inner-circle"
    },
    {
      title: "Addie, Kendra & Elena: The Wives' Retreat",
      encounterType: "threesome",
      participants: JSON.stringify(['Addie', 'Kendra Donnelly', 'Elena Barrett']),
      location: "Private cabin - Wives Club retreat",
      galaConnection: "The Cabin Weekend",
      setting: `A weekend retreat for just the inner circle women. No husbands, no children, no responsibilities. The wine flowed freely. The conversation turned personal - fantasies, desires, what they'd never told anyone.`,
      description: `It started with truth or dare. Childish, but the wine made them bold.

Elena dared Kendra to kiss Addie. It was meant as a joke. But the kiss lasted longer than a joke should. When they pulled apart, breathless, Elena's eyes were dark with want.

"Don't stop on my account," Elena said.

They didn't stop.

The three women explored each other through the night. Elena, experienced and confident. Kendra, nervous but eager. Addie, the chaos coordinator, somehow orchestrating even this.

Toys were produced - Elena had packed them "just in case." Vibrators and restraints turned the cabin into a playground.

By morning, they lay in a tangle of limbs and sheets, bonded in a way that transcended words.`,
      toysUsed: JSON.stringify(['vibrators', 'silk restraints', 'massage oils']),
      powerDynamic: "Addie coordinated, Elena brought experience, Kendra discovered new things about herself",
      aftermath: `The weekend changed their friendship. They shared something no one else knew. But when Kendra later chose Chris and traditional marriage, Addie felt the loss deeply - this intimacy was over.`,
      emotionalImpact: "Created unbreakable bond between the three. Kendra's later choice made it bittersweet for Addie.",
      isSecret: true,
      bookAppearance: "The Cabin Weekend storyline",
      tags: "threesome, toys, wives-club, cabin"
    },
    {
      title: "Addie & Kendra: Private Training",
      encounterType: "couple",
      participants: JSON.stringify(['Addie', 'Kendra Donnelly']),
      location: "Sara's Gym - after hours",
      setting: `Late night at the gym. Everyone else had left. Kendra was struggling with something - stress, pressure, the weight of being perfect. Addie stayed to talk. The conversation became physical.`,
      description: `It started as comfort - Addie holding Kendra while she cried about the pressure she was under. But Kendra looked up, eyes wet, and kissed her.

They moved to the mats in the back room. Kendra, the fitness queen, was suddenly vulnerable. Addie took the lead.

Their encounters continued for months - always after training, always secret. Kendra discovered parts of herself she'd hidden. Addie fell harder than she meant to.

The intimacy was gentle, exploratory. Kendra needed tenderness. Addie gave it without expecting anything in return.`,
      powerDynamic: "Addie led, Kendra received. A mentor-student dynamic that became romantic.",
      aftermath: `When Kendra got serious with Chris, she ended things with Addie. "I have to choose a path." Addie understood but the wound never fully healed.`,
      emotionalImpact: "Addie's deepest wound from the inner circle. She loved Kendra more than she admitted.",
      isSecret: true,
      bookAppearance: "Backstory for both characters",
      tags: "couple, emotional, loss, mentorship"
    },
    {
      title: "Addie & Selene: The Show",
      encounterType: "couple",
      participants: JSON.stringify(['Addie', 'Selene Thorne']),
      location: "Online - cam show",
      setting: `Before BSS. Before everything. Addie and Selene met in college through the cam world. They did a show together under their screen names.`,
      description: `Two college girls, both doing cam work to make money. They recognized something in each other - survivors, performers, women using what they had.

Their joint show was legendary in certain circles. The chemistry was real. They weren't acting.

Screen names protected their identities. The audience never knew who they really were.

After, they became friends. Real friends. When Selene later joined the Sirens and connected with BSS, she and Addie recognized each other immediately. The secret bound them.`,
      powerDynamic: "Equals - neither dominated. True partnership in performance.",
      aftermath: `Years later, they're both in the BSS world. Selene knows Addie's past completely. It's leverage she'd never use. They're connected by shared history no one else understands.`,
      emotionalImpact: "Created permanent bond. Selene is the only person besides Hawk who knows Addie's full past.",
      isSecret: true,
      bookAppearance: "Revealed in Addie's backstory",
      tags: "cam-work, college, secrets, history"
    },
    {
      title: "Addie's College Cam Work",
      encounterType: "solo",
      participants: JSON.stringify(['Addie']),
      location: "College dorm / apartment",
      setting: `College years. Addie needed money. She was smart, pretty, and willing to do what others wouldn't. She created a screen name and started camming.`,
      description: `Addie built a following. She was good at reading what people wanted, giving them just enough, keeping them coming back.

The work paid her tuition. It taught her to perform, to read people, to control a room even through a screen.

She kept it completely separate from her academic life. No one knew. The screen name protected her.

She stopped when she got her first real job. But the skills she learned - performance, reading people, controlling dynamics - became the foundation of who she became at BSS.`,
      powerDynamic: "Addie in full control of her audience",
      aftermath: `The past stayed buried until Hawk found evidence of it. Her confession to him became a turning point in their relationship.`,
      emotionalImpact: "Shaped who she became. The secret was a burden until Hawk accepted her completely.",
      isSecret: true,
      tags: "solo, cam-work, college, origin"
    },
    {
      title: "Hawk Discovers Addie's Past",
      encounterType: "tension",
      participants: JSON.stringify(['Addie', 'Hawk']),
      location: "Their home",
      setting: `Hawk was doing background research for a BSS case. He stumbled across something - an old video, a username, a face he recognized. Addie's face.`,
      description: `He didn't confront her immediately. He sat with it. Watched her move through their home, this woman he thought he knew completely.

Finally, he showed her what he'd found.

Addie's world stopped. The secret she'd buried. Out in the open.

She told him everything. The college years. The money troubles. The cam work. Selene. All of it.

Hawk listened. When she finished, terrified of his judgment, he pulled her close.

"You survived. You built yourself into this. I love all of you - including the parts you're ashamed of."

They made love that night differently. No masks. No performance. Just two people seeing each other completely.`,
      powerDynamic: "Vulnerability and acceptance. Both stripped bare emotionally before physically.",
      aftermath: `The secret no longer had power over Addie. Hawk knowing and loving her anyway freed her.`,
      emotionalImpact: "Transformed their relationship. Absolute trust established.",
      isSecret: false,
      bookAppearance: "Key scene in The Royal Phoenix",
      tags: "revelation, acceptance, love, vulnerability"
    },

    // SELENE'S CAM WORK & ENCOUNTERS
    {
      title: "Selene's Rise: The Cam Empire",
      encounterType: "solo",
      participants: JSON.stringify(['Selene Thorne']),
      location: "Miami / Online",
      setting: `Selene built her cam empire deliberately. Not desperation - strategy. She understood the market and dominated it.`,
      description: `Selene was never ashamed of her work. She chose it, refined it, excelled at it.

Her shows were legendary. She understood what viewers wanted before they did. She built genuine connections with her audience while maintaining complete control.

The money was excellent. But more importantly, she gathered intelligence without realizing it at first. Powerful men revealed things to their favorite cam girl that they'd never tell anyone else.

When Harper recognized her potential, the cam work became cover for BSS operations. Same job, new purpose.`,
      powerDynamic: "Selene always in control. She decides what the audience sees.",
      aftermath: `The cam work continues as cover for BSS intel gathering. It's no longer about money - it's about access.`,
      emotionalImpact: "Selene is at peace with her work. It gave her power, then purpose.",
      isSecret: false,
      bookAppearance: "Midnight Sun series",
      tags: "solo, cam-work, empire, power"
    },
    {
      title: "Selene & Addie: The Reunion Show",
      encounterType: "couple",
      participants: JSON.stringify(['Selene Thorne', 'Addie']),
      location: "Private stream",
      setting: `Years after their college collaboration, now both in the BSS world. Selene suggests they do one more show together - private, for very select viewers. Intel gathering disguised as nostalgia.`,
      description: `The chemistry was still there. Older now, more confident, more skilled.

The "audience" was carefully selected targets - men with information BSS needed. Watching them together loosened lips in ways interrogation never could.

But it wasn't just work. The old connection rekindled. Between scenes, between performances, real intimacy happened.

They laughed about the old days. They compared scars, literal and metaphorical. They found each other again as the women they'd become.`,
      toysUsed: JSON.stringify(['professional equipment', 'restraints', 'various devices']),
      powerDynamic: "Equals working together. Trading control back and forth for the performance.",
      aftermath: `The intel was valuable. But more importantly, it re-established their bond. Selene became Addie's closest ally in the secret parts of her past.`,
      emotionalImpact: "Reconnection. Understanding. Two survivors recognizing each other.",
      isSecret: true,
      bookAppearance: "The Royal Phoenix / Midnight Sun crossover",
      tags: "cam-work, intel, reunion, partnership"
    },
    {
      title: "Selene's Throuple: Private Moments",
      encounterType: "threesome",
      participants: JSON.stringify(['Selene Thorne', 'Partner 1', 'Partner 2']),
      location: "Their Miami home",
      setting: `Selene's unconventional relationship. Three people who chose each other.`,
      description: `The throuple works because all three communicate. Jealousy is addressed immediately. Needs are discussed openly.

Their intimate life is rich and varied. Sometimes all three together. Sometimes pairs while the third watches or participates differently. Sometimes solo time honored without insecurity.

They've developed rituals. Sunday mornings belong to all three. Wednesday nights alternate between pairs. The calendar of intimacy is negotiated like a business - but lived like a love story.

The BSS work complicates things. Selene's "performances" for work sometimes bleed into home. Her partners understand but it takes constant communication.`,
      toysUsed: JSON.stringify(['extensive collection', 'custom pieces', 'matching items for the three']),
      powerDynamic: "Rotating leadership. Each partner has domains where they take charge.",
      aftermath: `The relationship is stable because they work at it. The intimacy is the foundation.`,
      emotionalImpact: "Proof that unconventional love can work with effort and honesty.",
      isSecret: false,
      bookAppearance: "Midnight Sun series",
      tags: "throuple, polyamory, communication, love"
    },
    {
      title: "Selene & Harper: Business and Pleasure",
      encounterType: "couple",
      participants: JSON.stringify(['Selene Thorne', 'Harper Vance']),
      location: "BSS Miami Lab",
      setting: `Late night at Miami operations. The line between handler and asset blurred.`,
      description: `Harper recruited Selene. Trained her. Refined her. The professional relationship developed an undercurrent neither acknowledged at first.

One night after a successful operation, the tension broke. Harper initiated - rare for her. Selene responded immediately.

It was intense, competitive. Two women who spend their lives in control fighting for dominance. Neither truly won. Both were satisfied.

It happened a few more times. Never discussed. Never named. Eventually they established boundaries - the work had to come first.`,
      powerDynamic: "Competition. Neither willing to fully submit. Both enjoying the fight.",
      aftermath: `They maintain professional distance now, but the history is there. It makes their working relationship stronger - they've seen each other vulnerable.`,
      emotionalImpact: "Complicated feelings channeled into excellent professional partnership.",
      isSecret: true,
      bookAppearance: "Midnight Sun backstory",
      tags: "couple, power-struggle, work, miami"
    },

    // GALA-CONNECTED ENCOUNTERS
    {
      title: "EOHSJ Gala: After the Ceremony",
      encounterType: "couple",
      participants: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      location: "Hotel suite after the gala",
      galaConnection: "EOHSJ Annual Gala",
      setting: `The regalia removed. The social masks off. Just Jasper and Elena alone after performing perfectly all evening.`,
      description: `Elena was still wearing her tiara when Jasper started undressing her. He liked the contrast - the symbol of her station against the intimacy of her bare skin.

They made love slowly at first, savoring the relief of privacy. Then urgently, releasing the tension of the public performance.

Elena took control near the end - she often does after galas where she's been "on" all night. Jasper surrendered willingly.

Afterwards, they lay tangled, the tiara discarded on the nightstand, laughing about the evening's near-disasters that no one else noticed.`,
      powerDynamic: "Jasper leads initially, Elena finishes. Their pattern after formal events.",
      aftermath: `This is their ritual. Every major gala ends this way. It's how they reconnect after being public property all evening.`,
      emotionalImpact: "Maintains their bond despite constant public demands.",
      isSecret: false,
      bookAppearance: "Five Feet From Home",
      tags: "couple, gala, ritual, marriage"
    },
    {
      title: "Christmas Gala: The Coat Room",
      encounterType: "tension",
      participants: JSON.stringify(['Cole Harrington', 'A guest']),
      location: "Barrett Compound coat room",
      galaConnection: "Christmas Gala",
      setting: `Cole on security duty. A beautiful guest "needing help finding her coat."`,
      description: `The chemistry was immediate. She was bored with the party. He was bored with his post. The coat room offered privacy.

They didn't go all the way - Cole maintained enough professionalism for that. But the heated making out, the hands everywhere, the almost...

They were interrupted by another guest. She straightened her dress. He straightened his earpiece. Both returned to the party separately.`,
      powerDynamic: "Equal attraction. Mutual giving in to the moment.",
      aftermath: `They never spoke again. She left with her husband. Cole went back to his post. But the memory lingered.`,
      emotionalImpact: "A reminder that even the most disciplined people have moments of weakness.",
      isSecret: true,
      bookAppearance: "Referenced in operator banter",
      tags: "tension, gala, almost, temptation"
    },

    // BELLA & MANDY
    {
      title: "Bella & Mandy: The Ranch Connection",
      encounterType: "couple",
      participants: JSON.stringify(['Bella', 'Mandy']),
      location: "Mandy's Ranch",
      setting: `Mandy is a former operator with a ranch in the NC/VA/TN area. Bella came to heal after her own trauma. The connection happened naturally.`,
      description: `Mandy understood Bella in ways others couldn't. Both had seen darkness. Both had survived.

It started during a horseback ride. They'd stopped at a creek. The conversation became confessions. The confessions became closeness.

At the ranch house that night, Mandy made the first move. Bella responded with a hunger that surprised them both.

Their relationship was physical and emotional. Long nights in the ranch house. Morning rides together. A refuge from the world.

Mandy knew Bella also had feelings for Hawk. She accepted it rather than fighting it. "Love isn't a limited resource," she said.`,
      powerDynamic: "Mandy, the experienced operator, often led. Bella found safety in surrendering control.",
      aftermath: `The relationship evolved when Bella chose Matt. Mandy stepped aside gracefully, remaining a close friend. But the history is there.`,
      emotionalImpact: "Healing for Bella. Mandy showed her she could be vulnerable again.",
      isSecret: false,
      bookAppearance: "Bella's storyline",
      tags: "couple, healing, ranch, love"
    },
    {
      title: "Bella & Mandy: Storm Night",
      encounterType: "couple",
      participants: JSON.stringify(['Bella', 'Mandy']),
      location: "Mandy's Ranch - during a storm",
      setting: `A massive storm knocked out power at the ranch. Just Bella and Mandy, candles, and nothing but time.`,
      description: `The storm raged outside. Inside was warm, lit by firelight and candles.

They drank whiskey. Told war stories. Laughed at things that shouldn't be funny but were because they'd both been there.

Mandy reached for Bella's hand during a crack of thunder. Bella didn't let go.

They made love slowly, the thunder providing percussion. The power came back hours later, but they didn't notice for a while.

In the morning, Mandy made breakfast. Neither mentioned the night directly. They didn't need to.`,
      powerDynamic: "Gentle. Taking turns. Comfort rather than intensity.",
      aftermath: `One of many nights at the ranch. This one stood out because of the storm, the vulnerability, the raw honesty.`,
      emotionalImpact: "Deepened their connection. Proved they could be soft with each other.",
      isSecret: false,
      tags: "couple, storm, tender, ranch"
    },
    {
      title: "Bella Between: Hawk and Mandy",
      encounterType: "tension",
      participants: JSON.stringify(['Bella', 'Hawk', 'Mandy']),
      location: "Various",
      setting: `Bella loved both of them. Mandy knew. Hawk eventually understood too.`,
      description: `The tension was constant. Bella drawn to Hawk's intensity and Mandy's tenderness.

There were moments when all three were in the same room - the electricity was palpable. Others noticed. No one said anything.

Bella kissed Hawk once, when they were alone. It was consuming. Mandy found out but didn't react with jealousy - she'd expected it.

The three of them never came together physically, but the emotional triangle defined a chapter of all their lives.

Eventually Bella chose neither of them romantically - she chose Matt. But the connections remain.`,
      powerDynamic: "Three people circling each other, none willing to force a choice.",
      aftermath: `Mandy and Hawk developed their own respect through the experience. All three are close now, the romantic tension transformed into family bonds.`,
      emotionalImpact: "Complicated feelings sorted into lasting friendships. Growth for all three.",
      isSecret: false,
      bookAppearance: "Bella's arc across multiple books",
      tags: "tension, triangle, love, choice"
    },

    // ADDIE & KENDRA AT WEDDING
    {
      title: "Addie & Kendra: Getting Ready",
      encounterType: "couple",
      participants: JSON.stringify(['Addie', 'Kendra Donnelly']),
      location: "Bridal suite - Kendra's wedding day",
      galaConnection: "Kendra & Chris Wedding",
      setting: `The morning of Kendra's wedding to Chris. The bridesmaids have stepped out. Just Addie and Kendra alone, one last time.`,
      description: `Kendra was zipping her dress when Addie entered. They locked eyes in the mirror.

"Are you sure?" Addie asked. The question held everything.

Kendra turned. "I love him, Addie. But that doesn't erase us."

They kissed. Gentle at first, then desperate. Kendra's wedding dress rustling. Addie's bridesmaid dress pushed aside.

They didn't have much time. It was urgent, emotional, a goodbye disguised as pleasure.

When Addie fixed Kendra's lipstick afterward, her hands trembled. Kendra held them steady.

"I'll always love you," Kendra whispered.

"I know. That's what makes this hurt."

Ten minutes later, Addie watched Kendra walk down the aisle to Chris. She smiled through tears no one questioned.`,
      powerDynamic: "Mutual. A farewell between equals.",
      aftermath: `This was their last intimate moment. Kendra committed to Chris fully after. Addie respected it, but the wound never fully healed.`,
      emotionalImpact: "The end of their romantic relationship. Bittersweet closure.",
      isSecret: true,
      bookAppearance: "Flashback in both their storylines",
      tags: "couple, wedding, goodbye, bittersweet"
    },
    {
      title: "Kendra's Bachelorette: The Private Show",
      encounterType: "group",
      participants: JSON.stringify(['Kendra Donnelly', 'Elena Barrett', 'Addie', 'Bella', 'Wives Club inner circle']),
      location: "Private venue",
      galaConnection: "Kendra's Bachelorette Party",
      setting: `The bachelorette party. What happened stayed between the inner circle.`,
      description: `Elena planned the party. It started tame - champagne, games, gifts.

Then came the "entertainment." Not a male stripper - that was too predictable. Instead, Selene arranged something special for her friends.

The private show featured professionals, but audience participation was encouraged. Boundaries were discussed beforehand. Consent was explicit.

Some watched. Some participated more actively. The champagne flowed. Inhibitions lowered.

By the end of the night, lines had blurred. The inner circle shared more than secrets that night.

They never spoke of the specifics again. But they all knew.`,
      toysUsed: JSON.stringify(['party favors', 'professional equipment', 'gifts for the bride']),
      powerDynamic: "Organized chaos. Elena orchestrating, everyone participating at their comfort level.",
      aftermath: `The inner circle grew closer. Secrets shared that night bonded them permanently.`,
      emotionalImpact: "Sisterhood taken to its ultimate expression. Trust cemented.",
      isSecret: true,
      bookAppearance: "Referenced never explicitly shown",
      tags: "group, bachelorette, wives-club, party"
    }
  ];

  for (const encounter of encounters) {
    const existing = await prisma.funTimeEncounter.findFirst({
      where: { title: encounter.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.funTimeEncounter.create({
        data: { projectId: project.id, ...encounter }
      });
      console.log(`Created: ${encounter.title}`);
    } else {
      await prisma.funTimeEncounter.update({
        where: { id: existing.id },
        data: encounter
      });
      console.log(`Updated: ${encounter.title}`);
    }
  }

  const count = await prisma.funTimeEncounter.count();
  console.log(`\nTotal Fun Time Encounters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
