import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Updating Strong and Savory Series with Cole Ghosting Storyline...\n");

  // ========== UPDATE STRONG AND SAVORY SERIES ==========
  const series = await prisma.bookSeries.findFirst({
    where: { name: 'Strong and Savory', projectId: project.id }
  });

  if (series) {
    const updatedBooks = JSON.stringify([
      {
        title: 'Flour on Her Hands',
        synopsis: 'Evie is first noticed by Elena at Grace\'s school. Her warmth reminds Elena of Victoria\'s energy. Grace loves Evie\'s classroom - "school feels like family." Evie is invited into the extended orbit. Sara offers her a gym meal business, but Evie says no to business, yes to teaching. The Strong & Savory cooking classes begin at Sara\'s gym.'
      },
      {
        title: 'The Unlikely Sister',
        synopsis: 'Evie doesn\'t fit the typical model of Elena\'s circle - messy bun, flour-dusted cardigans, kitchen apron instead of ballgown. But she provides authentic warmth and everyday stability. Elena pulls her in deeper. "She doesn\'t fit our world, but she makes our world better." Evie meets Cole through the circle - their friend dates begin.'
      },
      {
        title: 'The Ghosting',
        synopsis: 'Just as Evie and Cole\'s friendship deepens into something more, Cole disappears. He stops returning calls, cancels their friend dates, avoids her at gatherings. Evie is devastated - convinced she did something wrong. Bella and Mandy rally around her, but the hurt runs deep. She throws herself into Strong & Savory, using the cooking classes to cope. Finally, Cole resurfaces with the truth: he\'s terrified of relationships. His past left him convinced he\'d only hurt anyone who got close. Evie must decide if she can trust someone who ran when things got real.'
      },
      {
        title: 'Strong & Savory: The Foundation',
        synopsis: 'Bella and Mandy cast a vision for Evie: "You already have a larger-than-life aura. Now it\'s time to expand it." They see a foundation in her future. Addie overwhelms her with contacts. Evie decides to start regional, slowly, keeping kids at the heart. She asks Bella and Mandy to mentor her through a "My Fair Lady" makeover without losing her personality. Cole, having worked through his fears, becomes her steady support.'
      },
      {
        title: 'The Sweet Alchemy',
        synopsis: 'Evie\'s gift is transforming the ordinary into something memorable. Students say she has "magic hands." She designs hands-on workshops at Sara\'s gym where athletes learn healthy meals, portion food, and shop on a budget. Jazz proudly shows Grace her "meal prep boxes." The Strong & Savory cooking classes expand to multiple locations.'
      },
      {
        title: 'Mrs. Cole',
        synopsis: 'The slow-burn romance with Cole reaches its peak. From the joke about "future Mrs. Cole" that Evie couldn\'t get out of her head, to Cole\'s quiet affirmation: "You do have a larger-than-life aura. People light up around you." The foundation goes regional, then national. Evie becomes exactly who Addie saw in her - and Cole becomes the partner who helps her shine without ever dimming her light.'
      }
    ]);

    await prisma.bookSeries.update({
      where: { id: series.id },
      data: {
        totalBooks: 6,
        books: updatedBooks,
        premise: `A heartwarming spin-off series centered on Evie Maren, the culinary arts teacher pulled into Elena's orbit. The series follows Evie's journey from classroom cooking teacher to founder of the Strong & Savory Foundation - a regional (then national) program teaching athletes, especially Special Olympics athletes, meal prep and life skills.

Core Theme: "Food is love in its purest form" - Evie's belief that cooking can heal, connect, and empower.

The series explores:
- Evie's unexpected friendship with the elite wives club circle
- Her "My Fair Lady" transformation (keeping her personality while growing into new spaces)
- The founding and growth of the Strong & Savory Foundation and cooking classes
- Her slow-burn relationship with Cole - including the devastating period when he ghosts her out of fear
- Cole's fear of relationships and eventual breakthrough
- Teaching meal prep to Special Olympics athletes like Jazz
- Building a legacy through kindness rather than power`
      }
    });
    console.log('Updated: Strong and Savory series with Cole ghosting book');
  }

  // ========== ADD COLE GHOSTING STORYLINES ==========
  console.log("\n--- Adding Cole Ghosting Storylines ---\n");

  const storylines = [
    {
      title: 'Cole Ghosts Evie - The Disappearance',
      category: 'Character Arc',
      description: 'Cole suddenly stops responding to Evie, leaving her confused and hurt',
      content: `THE DISAPPEARANCE:

It started small. A missed call. A cancelled coffee date. "Something came up," he'd text.

Then the texts stopped altogether.

Evie checked her phone obsessively. Had she said something wrong? Done something to push him away? They'd been so close - the friend dates, the Nashville trip, the way he looked at her when she came down the stairs at the gala...

And then nothing.

At the next gathering, Cole wasn't there. Hawk mentioned he was "busy with work." But Evie caught the hesitation in his voice.

A week passed. Then two. Evie left voicemails that went unanswered. Sent texts that showed as "read" but got no reply.

THE BREAKDOWN:
One night, alone in her apartment surrounded by flour and half-finished recipes, Evie finally broke. She called Bella, voice cracking.

"What did I do wrong?"

Bella's response was immediate. "You didn't do anything. This is about him, not you."

"Then why won't he talk to me?"

"Because some people run when they start to feel something real. And Cole... he's been running for a long time."`,
      characters: JSON.stringify(['Evie Maren', 'Cole', 'Bella', 'Hawk'])
    },
    {
      title: 'Cole Ghosts Evie - Bella and Mandy Rally',
      category: 'Character Arc',
      description: 'Bella and Mandy support Evie through the ghosting',
      content: `THE SISTERS RALLY:

Bella and Mandy showed up at Evie's apartment with wine, takeout, and zero tolerance for self-blame.

"First of all," Mandy said, kicking off her shoes, "you're not allowed to apologize for having feelings."

"Second," Bella added, settling onto the couch, "Cole's behavior is about Cole. Not you."

Evie wiped her eyes. "But I thought... I thought we had something."

Mandy's expression softened. "You did. That's exactly why he ran."

"What do you mean?"

Bella took her hand. "Some people are so scared of being hurt - or of hurting someone else - that they'd rather disappear than face what they're feeling. Cole's got history. Things he's never told anyone."

"So what do I do?"

Mandy shrugged. "You let yourself be sad. You let yourself be angry. And you keep living. Strong & Savory doesn't stop because some man can't handle his emotions."

COPING THROUGH COOKING:
Evie threw herself into the cooking classes. When her heart ached, she baked. When she couldn't sleep, she prepped meals for the athletes. Jazz noticed the extra cookies and didn't ask questions - just gave her longer hugs.

The kitchen became her refuge. And slowly, the pain became something she could hold without breaking.`,
      characters: JSON.stringify(['Evie Maren', 'Bella', 'Mandy', 'Jazz Carter'])
    },
    {
      title: 'Cole Ghosts Evie - Cole\'s Fear',
      category: 'Character Arc',
      description: 'Cole\'s perspective on why he ran',
      content: `COLE'S PERSPECTIVE:

Cole sat in his apartment, phone in hand, Evie's latest voicemail playing for the tenth time.

"Cole... I don't understand what happened. Please just talk to me. Even if it's to say goodbye."

He deleted it. Like he'd deleted all the others.

THE FEAR:
He'd watched Evie come down those stairs at the gala, and something shifted. The way she smiled. The way she laughed at his terrible jokes. The way she looked at him like he was enough.

And that terrified him.

Because everyone he'd ever let close had ended up hurt. His ex. His family. Friends who got too deep. He was a disaster in slow motion, and Evie... Evie was too good to become collateral damage.

So he did what he always did. He ran.

THE CONFRONTATION:
Hawk found him at the gym, punching a bag like it owed him money.

"You're an idiot," Hawk said flatly.

Cole didn't stop. "Stay out of it."

"She thinks she did something wrong."

That made him pause. "What?"

"Evie. She thinks she pushed you away. She's been crying to Bella and Mandy for weeks, trying to figure out what she did wrong." Hawk's voice hardened. "You want to protect her? You're doing the opposite."

Cole's fists dropped. The bag swung empty.

"I don't know how to do this," he admitted quietly. "Relationships. Vulnerability. Any of it."

"Then learn. Or let her go for real. But this limbo? It's cruel. And you're better than that."`,
      characters: JSON.stringify(['Cole', 'Hawk', 'Evie Maren'])
    },
    {
      title: 'Cole Ghosts Evie - The Return',
      category: 'Character Arc',
      description: 'Cole finally faces Evie and explains his fear',
      content: `THE RETURN:

Evie was closing up the Strong & Savory kitchen after a late class when she heard the door open. She turned, expecting Jazz or one of the other athletes.

It was Cole.

He looked exhausted. Thinner. Like he hadn't slept in weeks.

"Hi," he said quietly.

Evie's heart clenched. Anger and relief and hurt all tangled together. "You don't get to 'hi' me. Not after a month of nothing."

"I know."

"Do you? Because I called. I texted. I left voicemails. And you just... vanished."

Cole stepped closer, hands in his pockets. "I know. And I'm sorry. That's not enough, but it's true."

THE TRUTH:
"Why?" Evie's voice cracked. "Just tell me why."

Cole took a breath. "Because I was scared. Because every time I let someone in, I destroy it. And you..." He met her eyes. "You're the first person in years who made me want to try. And that terrified me more than anything."

"So you ran."

"I ran. And I hurt you. And I hate myself for it."

Evie was silent for a long moment. Then: "I don't know if I can trust you again."

"I know." Cole's voice was steady. "I'm not asking you to. I'm just asking for the chance to earn it back. However long it takes. However slow you need to go."

THE CHOICE:
Evie looked at him - this man who'd danced with her in Nashville, who'd held her gaze at the gala, who'd shown her what it felt like to be seen.

"One coffee," she said finally. "That's all you get. And if you disappear again, we're done. Forever."

Cole nodded, a flicker of hope in his eyes. "One coffee. I'll be there."

This time, he meant it.`,
      characters: JSON.stringify(['Evie Maren', 'Cole'])
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

  // ========== UPDATE COLE CHARACTER ==========
  console.log("\n--- Updating Cole with Ghosting Arc ---\n");

  const cole = await prisma.character.findFirst({
    where: { firstName: 'Cole' }
  });

  if (cole) {
    await prisma.character.update({
      where: { id: cole.id },
      data: {
        background: `Evie's slow-burn romantic interest. Their "friend dates" became routine - movies, late diners, coffee walks.

FEAR OF RELATIONSHIPS:
Cole has a history of hurting people he lets close. His past relationships ended badly, leaving him convinced he's a "disaster in slow motion." When his feelings for Evie deepened, he panicked and ghosted her for a month.

THE GHOSTING:
After the Nashville trip and the gala, Cole disappeared. No calls, no texts, no explanations. Evie was devastated, convinced she'd done something wrong.

Hawk finally confronted him: "She thinks she did something wrong. You want to protect her? You're doing the opposite."

THE RETURN:
Cole eventually faced Evie at the Strong & Savory kitchen and told her the truth - he was terrified of relationships because everyone he let close got hurt. Evie gave him one chance: "One coffee. And if you disappear again, we're done. Forever."

This time, he meant it.

KEY AFFIRMATION:
Cole told Evie: "You already carry something rare - you're beautiful without ever trying to be. It's the kind of thing that makes a room softer when you walk in."

When Evie asked about the "Mrs. Cole" joke, he said: "If they're teasing about 'future Mrs. Cole,' it means they see something we haven't figured out yet. But that's not pressure, Evie. It's just love."`,
        arcStart: 'Afraid of relationships, convinced he destroys everything he touches',
        arcChange: 'Ghosts Evie out of fear, confronted by Hawk, faces his patterns',
        arcEnd: 'Returns to Evie, commits to earning back her trust, becomes her steady partner'
      }
    });
    console.log('Updated: Cole with ghosting arc');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  console.log(`\nTotal storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
