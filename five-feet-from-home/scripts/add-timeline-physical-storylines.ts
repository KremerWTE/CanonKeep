import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding timeline storylines and physical interaction subsections...\n");

  // ========== BOOK 4 STORYLINES FROM LOVE OPTION ==========
  console.log("--- Adding Book 4 (Love Option) Storylines ---\n");

  const book4Storylines = [
    {
      title: 'Book 4: Denver Crisis - Addie\'s Month-Long Mission',
      category: 'Timeline - Book 4',
      description: 'Opening arc of Love Option Book 4',
      content: `DENVER CRISIS (Month-Long)

Opening Fires:
Addie and Daniel are in Denver solving a major telecoms crisis for a company in the West. This becomes a month-long adventure that tests Addie's limits.

THE TEAM:
- Addie: Lead fixer, pushing herself to exhaustion
- Daniel: Being groomed by Addie as BSS's #4, trusted fixer
- Jasper: The boss, monitors from Charlotte, sends Kendra to meet Addie at windmills

PRESSURE POINTS:
- Denver situation worsens — Addie is pulled into every single problem because no one else has her range
- She ignores bigger questions (her relationship with Kendra, her role at HQ, even her own health)
- Override Mode: She pushes through exhaustion, teaching herself to live in survival rhythm

WHAT SHE MISSES:
While in Denver, life continues without her:
- Harper's wedding planning begins
- Kendra places 5th at CrossFit Games
- Baptism for Lucas
- Jasper's dinner in Chicago

This sets up Addie's growing isolation and eventual collapse.`,
      characters: JSON.stringify(['Addie', 'Daniel', 'Jasper Barrett', 'Kendra', 'Harper'])
    },
    {
      title: 'Book 4: Addie\'s Burnout and Collapse',
      category: 'Timeline - Book 4',
      description: 'Addie pushes herself until she breaks',
      content: `ADDIE'S COLLAPSE

THE PATTERN:
Addie lives by the "five feet" rule — she focuses only on "just the next call," "just the next fix," "just the next hour." She ignores bigger questions.

OVERRIDE MODE:
She pushes through exhaustion, overrides sleep and meals, teaching herself to live in survival rhythm.

THE MISSED CALL:
Hospital bed. Addie wakes up realizing she missed Grace's call — the one thing she promised she'd never miss.

She breaks down silently. Her sacrifice hurt the one relationship she thought she could keep.

THE PIVOT:
Book 4 is a turning point: Addie isn't just building others up — she's forced to confront her own fragility. This sets up Book 5 as the rebuilding arc.

Cole (Tier 1 guy) watches over her, but even he says: "You can't save her. You can keep her alive until she chooses to save herself."`,
      characters: JSON.stringify(['Addie', 'Cole Harrington', 'Grace Barrett', 'Hawk'])
    },
    {
      title: 'Book 4: Cole Harrington - Tier 1 Protector',
      category: 'Character Arc',
      description: 'Cole Harrington\'s role as Addie\'s protector/mentor',
      content: `COLE HARRINGTON ("TIER 1 GUY")

Age: 46
Background: Former Tier 1 operator (DEVGRU / SEAL Team Six equivalent). Decorated career, multiple deployments across the Middle East and Africa.

INJURIES & TRANSITION:
Injuries (knee and shoulder) plus family pressure pulled him into semi-retirement at 42. Still fit, still sharp, but with the scars of war.

HIS ROLE:
- Addie's protector/mentor/father-figure
- Pragmatic and tough but quietly broken in his own ways
- Watches over Addie, tries to tether her when she's spiraling
- Eventually finds his own girlfriend and becomes part of the family

THE BAR SCENE:
Cole at the bar with his buddy (Hawk) during Jasper's dinner with Addie in Chicago. They trade stories about Addie. His buddy says: "You can't save her, but you can keep her alive until she chooses to save herself."

BOND WITH HAWK:
Cole and Hawk have history — Hawk trusts Cole when things go sideways. Cole respects Hawk's mind.`,
      characters: JSON.stringify(['Cole Harrington', 'Addie', 'Hawk'])
    },
    {
      title: 'Book 4: Kendra\'s Promise Ring',
      category: 'Character Arc',
      description: 'Kendra\'s boyfriend surprises her after the Games',
      content: `KENDRA'S PROMISE RING

After the CrossFit Games (where Kendra places 5th), her boyfriend surprises her with a promise ring — not a proposal, but a next-step commitment.

ADDIE'S REACTION:
Addie feels blindsided, conflicted. She respects Kendra's choice, but it twists the knife on their unresolved intimacy/sisterhood spark.

Addie chooses to stay on the road longer to avoid confronting it.

THE ROOT:
Later, a doctor gets Addie to admit the root of her pain: she has feelings for Kendra, and Kendra is dating a great guy who's taking the next step.

Addie would be okay with it if she had someone, or if her feelings for Kendra weren't so strong.

COLE'S INSIGHT:
The Tier 1 guy said to the doc: "My partner is struggling. Help please." So the doc approached it carefully, respecting Cole's Catholic values.

Elena realizes this is the root of all Addie's pain — trusting Cole so much while trying to protect his values.`,
      characters: JSON.stringify(['Kendra', 'Addie', 'Cole Harrington', 'Elena'])
    },
    {
      title: 'Book 4: Harper\'s Proposal and Field Heir',
      category: 'Character Arc',
      description: 'Harper gets proposed to and becomes Jasper\'s top field presence',
      content: `HARPER'S RISE

PROPOSAL:
Harper gets proposed to by her boyfriend. But instead of stepping back, she becomes Jasper's top field presence — like he used to be.

FIELD HEIR:
This puts more pressure on Addie, who is the "other one." Harper shows rising prominence with Jasper while Addie carries the weight alone.

JASPER'S TRANSITION:
Jasper learns how to transition from field work to managing things from the office and home. He's home more often, still works 18 hours, but understands delegation now.

THE PARALLEL:
- Harper: Rising, getting married, taking Jasper's old role
- Addie: Burning out, isolated, avoiding personal life
- The contrast drives the emotional weight of Book 4.`,
      characters: JSON.stringify(['Harper', 'Jasper Barrett', 'Addie'])
    },
    {
      title: 'Book 4: Hawk\'s "Proposal" to Addie',
      category: 'Character Arc',
      description: 'The midnight shower scene where Hawk offers himself',
      content: `HAWK'S "PROPOSAL"

THE MIDNIGHT SHOWER SCENE:
Addie is at her lowest. Hawk finds her. The water pounds down. Addie breaks.

HAWK'S WORDS:
"Wait... is that your proposal, goddess? Because if it is, the answer's yes. If it's not, then I'll wait. I'll take it at your speed. No rush. But just so you know — I'd marry you right here, soaking wet, under freezing shower water if that's what you wanted."

Addie laughed through her tears, punching his shoulder lightly, then burying her face against his chest.

THE MORNING AFTER:
Lying in bed, Addie processing Hawk's words.

"You realize what you just said in there, right?"

"Yeah. That I'd marry you soaking wet under freezing water. Very romantic. Hallmark might call."

"No, you idiot. You said you'd marry me. Like... actually marry me."

Hawk shifted, propping himself up on one elbow:
"I meant it. Doesn't mean I'm rushing you. But yeah — I could see it. Easy. The war goddess with me."`,
      characters: JSON.stringify(['Hawk', 'Addie'])
    },
    {
      title: 'Book 4: Cole Checks on Addie (Protective)',
      category: 'Character Arc',
      description: 'Cole and Hawk\'s protective dynamic around Addie',
      content: `COLE CHECKS ON ADDIE

After Hawk's "proposal" moment, Cole steps in — not loudly, but watching.

THE SCENE:
Cole (deadpan): "If I leave you two alone, am I coming back to a wedding announcement, or...?"

Addie throws a pillow at him. Hawk chuckles, catching it one-handed.

Hawk (grinning): "Relax, Papa Bear. She's safe with me."

Cole (pointed look): "She better be. I trust you — but I'm still watching."

Addie rolls her eyes, but there's warmth underneath.

THE BOND:
This shows Cole's role as the father-figure protector. He trusts Hawk because of their shared history, but he'll always watch over Addie.`,
      characters: JSON.stringify(['Cole Harrington', 'Hawk', 'Addie'])
    },
  ];

  for (const storyline of book4Storylines) {
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

  // ========== PHYSICAL INTERACTION STORYLINES (Gala Subsections) ==========
  console.log("\n--- Adding Physical Interaction Storylines (Gala Subsections) ---\n");

  const physicalStorylines = [
    {
      title: 'Gala Physical: Elena & Kendra - First Spark',
      category: 'Gala Physical Interactions',
      description: 'Elena and Kendra\'s first intimate connection',
      content: `ELENA & KENDRA - FIRST SPARK

Setting: Pre-gala or after-party at Elena's home

THE CONTEXT:
Kendra deepens bonds with Elena and Grace. The intimacy between Elena and Kendra builds during Jasper's travel-heavy period.

PROGRESSION:
- Night 1: Balcony scene, slow progression to intimacy
- Night 2 (week later): They try it again, even more comfortable, lots of laughter, confessions, and genuine bonding — ends with them tangled on the couch

THE THREESOME BUILD:
This leads to the threesome with Addie:
- Elena invited Addie into the ritual
- Night on the balcony with Kendra, light drinking, slow burn, playful intimacy
- Week later: repeat with more comfort and openness

Then eventually: The Threesome Night (Chapter 30).`,
      characters: JSON.stringify(['Elena', 'Kendra', 'Addie'])
    },
    {
      title: 'Gala Physical: The Threesome Night - Elena, Kendra, Addie',
      category: 'Gala Physical Interactions',
      description: 'The threesome between Elena, Kendra, and Addie',
      content: `THE THREESOME NIGHT (Chapter 30)

Setting: Jasper away on work trip. Grace with family.

THE BUILD-UP:
1. First Spark: Kendra stays the night at Elena's. Addie slips over late, "just to check in"
2. Another Attempt: Week later, sparks fly again
3. The Promise: Elena's promised threesome comes to fruition

THE NIGHT:
Three women together — Elena, Kendra, and Addie. What started as sisterhood and support crossed into something more intimate.

AFTERMATH:
The experience deepens their bond but also complicates relationships:
- Kendra has a boyfriend who eventually gives her a promise ring
- Addie's feelings for Kendra become a source of pain
- Elena balances it all

Part 2 Opening (Book 2):
The high energy of the first act bridges into heavier relationship-and-work-balance themes after this night.`,
      characters: JSON.stringify(['Elena', 'Kendra', 'Addie', 'Jasper Barrett'])
    },
    {
      title: 'Gala Physical: Addie & Hawk - Midnight Shower Intimacy',
      category: 'Gala Physical Interactions',
      description: 'Addie and Hawk\'s intimate shower moment',
      content: `ADDIE & HAWK - MIDNIGHT SHOWER

Setting: Addie's lowest point during Denver arc

THE SCENE:
The water pounded down. Addie was breaking. Hawk found her.

WHAT HAPPENED:
Addie needed grounding. Hawk provided it — not just emotionally, but physically present. The shower scene became a turning point where Hawk offered himself completely.

His quirky but sincere words:
"Is that your proposal, goddess? Because if it is, the answer's yes. If it's not, then I'll wait. I'll take it at your speed."

THE AFTERMATH:
They end up in bed together — not just physically intimate, but emotionally raw. Addie processes what Hawk offered.

Morning after: They lie together, and Addie realizes he meant every word about marriage.

This is the scene where Addie finally starts to let someone in.`,
      characters: JSON.stringify(['Addie', 'Hawk'])
    },
    {
      title: 'Gala Physical: Cole Finding His Own Happiness',
      category: 'Gala Physical Interactions',
      description: 'Cole Harrington finds a girlfriend and becomes family',
      content: `COLE'S NEW CHAPTER

THE TRANSITION:
Cole was Addie's protector/warden for years. But eventually, he needs his own life.

FINDING LOVE:
Cole finds a girlfriend. He's at the firepit, girlfriend at his side, glass in hand — not a warden anymore, but family.

THE LOOK:
When Hawk passes, they trade a look that says: "We both did right by her."

THE ARC:
Cole's arc doesn't just end with "he stepped back" — it blooms into its own storyline:
- From protector to family member
- From isolated warrior to man with a partner
- Still watches over Addie, but from a place of fullness, not loneliness`,
      characters: JSON.stringify(['Cole Harrington', 'Hawk', 'Addie'])
    },
    {
      title: 'Gala Physical: Jasper & Elena - Intimacy Arc',
      category: 'Gala Physical Interactions',
      description: 'Jasper and Elena\'s reconnection after her recovery',
      content: `JASPER & ELENA - INTIMACY ARC

THE DISTANCE:
During Elena's recovery from her health crisis, Jasper had been emotionally distant — always working, always traveling.

THE RECONNECTION:
During Elena's recovery, Jasper helps her with a personal project she had shelved years ago. Working together reopens intimacy — not just romance, but real partnership.

KEY MOMENTS:
- The kitchen scene: Jasper sees Elena alone at midnight, radio humming
- The hospital chair: He sat beside her bed while she dozed
- The first morning home: Sunlight across rumpled sheets, her hand curled around his

POST-BAPTISM:
After the baptism (six months later), the intimacy arc between Elena and Jasper deepens. Power dynamics shift as Elena goes back to work and thrives.

Jasper is home more often, managing from office, and their physical relationship strengthens.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena'])
    },
    {
      title: 'Gala Physical: Bella & Mandy - Opening Doors',
      category: 'Gala Physical Interactions',
      description: 'Bella\'s relationship with Mandy that opened her sexuality',
      content: `BELLA & MANDY - OPENING DOORS

THE REVELATION:
Bella admitted her relationship with Mandy "opened the doors to her sexuality."

THE CONTEXT:
Bella and Mandy's relationship was formative. Before Matt, Mandy helped Bella discover who she was:
- Their relationship wasn't just physical — it was emotional awakening
- Bella learned to accept herself through Mandy's love
- When she met Matt, "everything blossomed"

THE PATTERN:
Bella's journey: Addie's mentorship → relationship with Mandy → love with Matt.

This mirrors Evie's arc, which is why Bella is the perfect mentor for Evie — she understands the journey of discovering unexpected love.

CONTINUING BOND:
Even after Bella married Matt, Mandy remains her "sister" — the triangle of Bella/Matt/Mandy is built on love and mutual respect, not jealousy.`,
      characters: JSON.stringify(['Bella', 'Mandy', 'Matt', 'Addie'])
    },
  ];

  for (const storyline of physicalStorylines) {
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

  // ========== ADD COLE HARRINGTON AS NEW CHARACTER ==========
  console.log("\n--- Adding Cole Harrington character ---\n");

  const coleHarrington = await prisma.character.findFirst({
    where: { firstName: 'Cole', lastName: 'Harrington' }
  });

  if (!coleHarrington) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Cole Harrington',
        firstName: 'Cole',
        lastName: 'Harrington',
        archetype: 'Tier 1 Operator / Addie\'s Protector',
        hubLocation: 'Charlotte, NC',
        personality: 'Pragmatic and tough but quietly broken in his own ways. Father-figure protector. Still fit, still sharp, but with the scars of war.',
        background: `Former Tier 1 operator (DEVGRU / SEAL Team Six equivalent). Decorated career, multiple deployments across the Middle East and Africa.

INJURIES & TRANSITION:
Injuries (knee and shoulder) plus family pressure pulled him into semi-retirement at 42. Still fit, still sharp, but with the scars of war.

HIS ROLE WITH ADDIE:
- Addie's protector/mentor/father-figure
- Watches over her, tries to tether her when she's spiraling
- The one who called the doc: "My partner is struggling. Help please."

BOND WITH HAWK:
Cole and Hawk have history from their military days. Hawk trusts Cole when things go sideways. Cole respects Hawk's mind. They share stories at bars.

FINDING LOVE:
Eventually finds his own girlfriend and becomes part of the family — at the firepit, girlfriend at his side, no longer just a warden but family.`,
        relationships: `Addie - protector, mentor, father-figure
Hawk - brother-in-arms, deep trust from military days
Girlfriend (TBD) - finds love after stepping back from warden role`,
        isConfirmed: true,
      }
    });
    console.log('Created: Cole Harrington');
  } else {
    console.log('Already exists: Cole Harrington');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();

  console.log(`\nTotal storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
