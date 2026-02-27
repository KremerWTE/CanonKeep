import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING LOVE STORY THREAD CONTENT ===\n");

  // ============ CHARACTERS ============
  const characters = [
    // BSS CLIENTS
    {
      name: "Richard Cole Harrington",
      firstName: "Richard",
      lastName: "Harrington",
      archetype: "BSS Client / CEO",
      bssRole: "Client - CEO of Harrington Global",
      background: `Old-money New York finance leader with deep family ties in banking.

Knew Jasper through mutual boardroom connections.
Had respect for BSS's discretion and results.
Personally made the introduction to Barclay & Sterling because he wanted someone he trusted to handle sensitive international accounts.
Jasper's mix of strategy + Addie's sharp analysis impressed him.`,
      personality: "Old Money, New York Finance, BSS Connector",
      relationships: "Referred BSS to Barclay & Sterling in London"
    },
    {
      name: "Victor Shen",
      firstName: "Victor",
      lastName: "Shen",
      archetype: "BSS Client / Heir",
      bssRole: "Client - CEO's Son at Shen International Holdings",
      education: "Harvard",
      background: `Son of the CEO of Shen International Holdings (Hong Kong conglomerate).

Was at Harvard with one of BSS's early U.S. partners.
Pushed BSS as a boutique, high-discretion alternative to larger consulting firms.
This connection made Shen International one of BSS's first international clients.`,
      relationships: "Harvard connection with early BSS partner"
    },
    {
      name: "Mason",
      firstName: "Mason",
      lastName: "",
      archetype: "Mentor",
      bssRole: "Senior Leader / Addie's Mentor",
      background: `Senior figure at BSS who mentors Addie.

Warned her repeatedly about burning out.
His point was brutally proven when Addie fainted mid-call with him.
After her collapse, Mason insisted: "You need to see the mental performance coach."
Addie's response: "I don't have time to sit on a couch and talk about feelings. I've got four fires in four countries to put out."`,
      personality: "Experienced, Warning Voice, Protective of team"
    },
    {
      name: "Daniel",
      firstName: "Daniel",
      lastName: "",
      archetype: "Rising Fixer",
      bssRole: "New Fixer / Analyst",
      education: "PhD in International Relations from Yale",
      background: `New to BSS after completing PhD in International Relations from Yale.

No stranger to complex issues, but everything has been theoretical until now.
First real field assignment during Denver crisis.
Book-smart but untested in practical crisis management.
Addie grooms him to be a great #4 in the company and trusted fixer.`,
      personality: "Book-smart, Eager, Theoretical to Practical transition"
    },
    {
      name: "Chris Donnelly",
      firstName: "Chris",
      lastName: "Donnelly",
      archetype: "Inner Circle / Romantic Partner",
      background: `Kendra's boyfriend who gives her a promise ring (not engagement, but next step commitment).

The only person who truly sees what Addie is doing - sacrificing herself to protect Kendra's happiness.

When Kendra confides about her flirty messages with Addie:
- Initially scared/threatened
- Then realizes Addie is deliberately distancing to give Kendra a stable future
- Agrees with Addie's logic but hates watching her destroy herself
- Reaches out to Addie: "Thanks — I understand what you're doing. I won't spill the beans. Love and the girls miss you."
- Offers: "We want to be your safety net again."`,
      personality: "Understanding, Protective, Conflicted Ally",
      relationships: "Kendra's boyfriend, understands Addie's sacrifice"
    }
  ];

  // ============ ORGANIZATIONS ============
  const organizations = [
    {
      name: "Harrington Global",
      type: "BSS Client",
      industry: "Finance / Private Equity",
      headquarters: "New York",
      description: `US anchor client in New York. One of BSS's anchor U.S. clients with longstanding ties in London finance.

CEO: Richard Cole Harrington
Role: Referred BSS to Barclay & Sterling in London, opening the European market for BSS.
The referral was a reputation test - if BSS could deliver for Barclay & Sterling, it would validate them in the European market.`,
      significance: "Gateway to European market for BSS"
    },
    {
      name: "Barclay & Sterling",
      type: "BSS Client",
      industry: "Private Wealth / Financial Management",
      headquarters: "London",
      description: `High-end private wealth and financial management firm based in London.

Became a BSS client through referral from Harrington Global.
This was the London client Jasper went to see in Book 1.
The London trip was a hinge point - first time Addie stepped into "frontline" role with Jasper instead of just back-office research.
Securing this client gave BSS credibility in the European market.`,
      significance: "First major European client for BSS"
    },
    {
      name: "Shen International Holdings",
      type: "BSS Client",
      industry: "Logistics / Shipping / Financial Services",
      headquarters: "Hong Kong",
      description: `Hong Kong-based conglomerate with holdings in logistics, shipping, and financial services.

One of the first international clients BSS landed.
Connection came through Victor Shen (CEO's son) who was at Harvard with one of BSS's early U.S. partners.
This contract helped Jasper justify expanding BSS's footprint beyond New York.
In Book 1, Jasper balances Asia (Shen) and London (Barclay & Sterling) simultaneously.`,
      significance: "First international client that justified BSS global expansion"
    }
  ];

  // ============ STORYLINES ============
  const storylines = [
    // BOOK 4: DENVER CRISIS
    {
      title: "Book 4: The Denver Crisis - Overview",
      category: "Love Story / Book 4",
      description: "Major telecom crisis in the Western US",
      content: `SETTING:
Telecom systems in the West collapse. Denver becomes ground zero for the crisis.

KEY PLAYERS:
- Addie: Point leader, cut off from CLT support
- Daniel: First real field assignment post-PhD
- Jasper: Stays in CLT HQ, providing strategic cover
- Kendra: Stays behind for CrossFit Games Finals
- Harper: Rising as Jasper's field presence

ADDIE'S CHALLENGE:
- Split from easy CLT support
- Must lead independently with smaller Midwest team
- Simultaneously pulled to Asia, Spain, Africa for other crises
- Four fires in four countries`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett', 'Daniel', 'Kendra', 'Harper']),
      themes: JSON.stringify(['Crisis Management', 'Leadership', 'Isolation', 'Denver'])
    },
    {
      title: "Addie's 5-Foot World Coping",
      category: "Love Story / Character Arc",
      description: "How Addie survives through tunnel vision",
      content: `THE MINDSET:
Soldiers and endurance athletes use "5-foot world" - only focus on the next 5 feet, the next rep, the next step.

ADDIE'S APPLICATION:
- Breaks everything into immediate, solvable tasks
- "Just the next call, just the next fix, just the next hour"
- Ignores bigger questions (Kendra, her role at HQ, her health)
- Override Mode: pushes through exhaustion, overrides sleep and meals

THE COST:
- Allows superhuman function but destroys long-term well-being
- Lives only for the next crisis, next trip, next client
- Brilliant but brittle - life reduced to task lists and flights`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['Coping', 'Avoidance', 'Survival', '5-Foot World'])
    },
    {
      title: "Addie's Shower Breakdowns",
      category: "Love Story / Character Arc",
      description: "Private collapses hidden from everyone",
      content: `THE PATTERN:
After brutal 20+ hour days followed by punishing workouts, Addie steps into the shower.
She curls up on the floor, sobbing.

THE MASK:
- Running water masks the sound, masks the tears
- Even from her own awareness - she tells herself "It's just the water. Not me."
- She convinces herself it doesn't count

THE REACTION:
- When she realizes what she's doing, she hates herself
- "I'm stronger than this. I don't break."
- Self-loathing leads to anger
- Anger fuels pushing harder: more work, more workouts, less rest

THE LOOP:
1. Overwork & exhaustion
2. Breakdown in shower
3. Self-hate for breaking
4. Anger → pushing harder
5. More exhaustion → cycle repeats

FREQUENCY:
- What started as occasional becomes weekly
- Then multiple times a week
- Each time masked, denied, punished with longer work`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['Mental Health', 'Hidden Pain', 'Self-Destruction', 'Isolation'])
    },
    {
      title: "Addie Faints Mid-Call with Mason",
      category: "Love Story / Book 4",
      description: "The public collapse that proves Mason's warnings",
      content: `THE MOMENT:
Midway through a critical update call, Addie faints.
Mason (her mentor) had warned her about burning out.
His point is brutally proven.

MASON'S RESPONSE:
When she recovers, Mason insists: "You need to see the mental performance coach."

ADDIE'S RESPONSE:
"I don't have time to sit on a couch and talk about feelings. I've got four fires in four countries to put out. That's my therapy."

THE FALLOUT:
- Word spreads back to CLT
- Elena and Kendra panic, try to reach her
- Addie dodges them, gives curt replies
- Both beg Jasper to pull her back
- Addie threatens: "If you pull me, I'll quit"
- Jasper, torn, lets her stay`,
      characters: JSON.stringify(['Addie', 'Mason', 'Elena Barrett', 'Kendra', 'Jasper Barrett']),
      themes: JSON.stringify(['Collapse', 'Stubbornness', 'Burnout', 'Ultimatum'])
    },
    {
      title: "Chicago Confrontation: Jasper & Addie",
      category: "Love Story / Book 4",
      description: "Jasper flies to meet Addie and remind her she's family",
      content: `THE SETUP:
After Addie's threat to quit if pulled, Jasper flies to Chicago for a client issue - really to talk to her.

JASPER'S MESSAGE:
- Reminds her of when he promoted her from assistant to office manager
- "You weren't ready by resume, Addie. But you were ready by heart."
- Admits he used to think carrying it all made him strong
- "What saved me was letting people in."
- "Family isn't who you lean on only when it's easy. It's who you let carry the weight when you can't."
- "You are family, Addie. Always will be. Even when you try to push us away."

ADDIE'S RESPONSE:
- Listens, defenses slip slightly
- "I appreciate what you're saying. But I need to figure myself out first."
- Accepts the bridge but doesn't walk across it

THE CORE ISSUE:
Addie's inner order: work → self → family
She can't belong to family until she's "fixed herself"
But she refuses to look at herself - it terrifies her
So the cycle continues`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett']),
      themes: JSON.stringify(['Family', 'Mentorship', 'Vulnerability', 'Chicago'])
    },
    {
      title: "The Museum Keepsake",
      category: "Love Story / Symbol",
      description: "Small prize Addie keeps from museum trip with Kendra & Grace",
      content: `THE ITEM:
A small prize from a museum trip with Kendra and Grace.
Tucked away in Addie's purse.

WHAT IT REPRESENTS:
- A private reminder of what was and what she can't return to
- The contradiction between her actions (pulling away) and her heart (still holding on)
- In quiet moments (airports, hotel rooms), she holds onto it
- She never mentions it to anyone

THE PATTERN:
- She rereads Kendra's messages, then clutches the keepsake
- It jolts her into awareness of what she's suppressing
- Then she shoves it back down and returns to "5-foot world"

SIGNIFICANCE:
- Her secret tether to humanity
- The crack in her armor she refuses to acknowledge`,
      characters: JSON.stringify(['Addie', 'Kendra', 'Grace']),
      themes: JSON.stringify(['Memory', 'Loss', 'Symbol', 'Hidden Attachment'])
    },
    {
      title: "Kendra's Promise Ring",
      category: "Love Story / Book 4",
      description: "Kendra's boyfriend surprises her with commitment",
      content: `THE MOMENT:
After CrossFit Games Finals, Kendra's boyfriend surprises her with a promise ring.
Not a proposal, but the next step in commitment.

ADDIE'S REACTION:
- Feels blindsided, conflicted
- Respects Kendra's choice but it twists the knife
- Decides the only way to save Kendra's long-term happiness is to cut herself out
- Volunteers to stay on the road to avoid dealing with it
- Thinks: "He's great and the right one for her"

THE CHOICE:
Addie pulls away from Kendra (and Elena) to "protect" Kendra's future.
Rips the band-aid off.
Better to hurt them once than keep them torn.`,
      characters: JSON.stringify(['Kendra', "Chris (Kendra's Boyfriend)", 'Addie']),
      themes: JSON.stringify(['Commitment', 'Sacrifice', 'Promise Ring', 'Letting Go'])
    },
    {
      title: "Kendra's Flirty Messages",
      category: "Love Story / Book 4",
      description: "The texts that break Addie further",
      content: `THE PATTERN:
After word of Addie's collapse spreads, Kendra starts sending messages.
Heartfelt, persistent, gently tugging at their old bond.
Some carry a flirty undertone.

EXAMPLE MESSAGES:
"I know you. You don't have to do this alone."
"You've always been the one holding us up. Let me hold you for once."
"We're still sisters, Addie. Nothing changes that."
"When you finally stop playing superhero across four countries, maybe I'll let you buy me coffee again. If you behave."

ADDIE'S RESPONSE:
- Short, clipped replies
- "I'm fine." / "Busy. Can't talk." / "Focus on your life. I've got this."

ADDIE'S INNER REACTION:
- Reads them, smiles despite herself, feels warmth
- But warmth curdles into pain
- "She has a boyfriend. She deserves her life. I'll ruin it."
- Cries in shower later, hating herself for both wanting and refusing`,
      characters: JSON.stringify(['Addie', 'Kendra']),
      themes: JSON.stringify(['Flirtation', 'Longing', 'Resistance', 'Messages'])
    },
    {
      title: "Boyfriend Understands Addie's Sacrifice",
      category: "Love Story / Book 4",
      description: "Kendra's boyfriend becomes unexpected ally",
      content: `KENDRA'S CONFESSION:
She sits her boyfriend down and confides:
- She still has sparks with Addie
- Their messages sometimes cross into flirtation
- She doesn't want to hurt him but can't ignore it

HIS REACTION:
- At first: shaken, jealous, scared
- Then realizes what Addie is doing
- Sees Addie is sacrificing herself to give Kendra a stable, happy life
- Becomes the only person who truly sees the truth

HIS TEXT TO ADDIE:
"Hey Addie. Just wanted to say thanks — I understand what you're doing. I won't spill the beans. Love and the girls miss you."

ADDIE'S RESPONSE:
"What? And what do you know?"

HIS FOLLOW-UP:
"Enough. I see it. I get it. And I'm grateful. Just… don't burn out completely, okay?"
"We want to be your safety net again."

ADDIE'S APOLOGY:
"I owe you an apology. Not for now — for before. For the way things were between me and Kendra. Please don't blame her. That's on me."

HIS GRACE:
"Addie… I already know. And I don't blame her. Or you. Feelings get messy. What matters is where we are now."`,
      characters: JSON.stringify(['Addie', "Chris (Kendra's Boyfriend)", 'Kendra']),
      themes: JSON.stringify(['Understanding', 'Sacrifice', 'Forgiveness', 'Safety Net'])
    },
    {
      title: "Grace's Weekly Zoom Calls",
      category: "Love Story / Book 4",
      description: "The only connection Addie maintains",
      content: `THE LIFELINE:
The only person Addie continues to talk to is Grace, Elena's 2nd-grade daughter.
Once a week, a quiet Zoom call.

WHAT THEY TALK ABOUT:
- School, art projects, little victories
- Grace has no agenda, no expectations
- Addie listens, softens, laughs
- For a few minutes she remembers what normal feels like

WHY GRACE:
- She's innocence and unguarded love
- Addie can't accept intimacy from her peers
- But she can from a child who simply likes her

SYMBOLISM:
- Grace represents the simple warmth Addie craves
- The gap between simplicity she wants and complexity she runs from
- Not enough to heal her, but enough to keep her from vanishing completely`,
      characters: JSON.stringify(['Addie', 'Grace']),
      themes: JSON.stringify(['Innocence', 'Connection', 'Lifeline', 'Weekly Calls'])
    },
    {
      title: "Africa Tier 1 Advice: Ignore and Override",
      category: "Love Story / Book 4",
      description: "The wrong compass Addie follows",
      content: `THE OUTREACH:
Too desperate to stay silent, Addie messages her Africa Tier 1 support team:
"How do you overcome internal struggle when you can't show weakness?"

THEIR ANSWER:
- Ignore and override
- Stay in the fight — bullets flying are comfort
- Never out of the fight
- The only easy day was yesterday

THE EFFECT:
Instead of pulling her back, it convinces Addie her only solution is to work harder.
She locks into 20+ hour days across different time zones.
Sleep becomes minimal - maybe collapsing at her desk when her body forces it.
She adds punishing workouts on top of everything.

THE IRONY:
The advice from warriors feeds her self-destruction.
She interprets exhaustion not as warning but as proof she's doing it right.`,
      characters: JSON.stringify(['Addie', 'Africa Tier 1 Team']),
      themes: JSON.stringify(['Wrong Advice', 'Military Mindset', 'Self-Destruction', 'Ignore Override'])
    },
    {
      title: "Harper's Engagement",
      category: "Love Story / Book 4",
      description: "Harper gets proposed to and rises as Jasper's field presence",
      content: `THE PROPOSAL:
Harper's boyfriend proposes and she accepts.

HER RISE:
- Becomes Jasper's #1 field presence
- Steps into the role he used to play
- "His younger self" in capability and client presence

CONTRAST WITH ADDIE:
- Harper: slips under pressure, learns by falling, grows stronger
- Addie: never slips, sees cracks before they break, but refuses to face personal truths
- Harper's humanity makes her freer
- Addie's denial makes her fragile beneath the perfection`,
      characters: JSON.stringify(['Harper', 'Jasper Barrett']),
      themes: JSON.stringify(['Engagement', 'Promotion', 'Field Leadership', 'Contrast'])
    },
    {
      title: "Addie Knows the Answer But Won't Face It",
      category: "Love Story / Character Arc",
      description: "The tragedy of brilliant denial",
      content: `ADDIE'S GIFT:
In the professional world, Addie is prophetic.
She sees problems before they happen, anticipates solutions.
This is why Jasper trusts her above all others.

THE PERSONAL PARALLEL:
The same foresight applies to her private life - she knows the truth:
- Her breakdowns mean she can't keep going like this
- Kendra is her emotional pivot, the unresolved tie
- Family is the real solution - Jasper's right

BUT:
Knowing and admitting aren't the same.
She refuses to acknowledge it out loud.
That would force her to face herself - and she's terrified of what she'll see.

HER INNER ORDER:
Work → Self → Family
She can't belong to family until she's "fixed herself"
But she refuses to look at "self"
So family remains forever out of reach

THE TRAGEDY:
She sees answers before problems in work.
She sees the personal answers too... but refuses to admit them.`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['Self-Awareness', 'Denial', 'Fear', 'Tragedy'])
    }
  ];

  // Add characters
  console.log("--- Adding Characters ---");
  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  // Add organizations
  console.log("\n--- Adding Organizations ---");
  for (const org of organizations) {
    const existing = await prisma.organization.findFirst({
      where: { name: org.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({
        data: { projectId: project.id, ...org }
      });
      console.log(`Created: ${org.name}`);
    } else {
      await prisma.organization.update({
        where: { id: existing.id },
        data: org
      });
      console.log(`Updated: ${org.name}`);
    }
  }

  // Add storylines
  console.log("\n--- Adding Storylines ---");
  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  // Summary
  const charCount = await prisma.character.count({ where: { projectId: project.id } });
  const orgCount = await prisma.organization.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Organizations: ${orgCount}`);
  console.log(`Storylines: ${storyCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
