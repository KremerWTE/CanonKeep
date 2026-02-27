import { PrismaClient } from '@prisma/client';
import * as mammoth from 'mammoth';

const prisma = new PrismaClient();

async function parseDoc(path: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  } catch {
    return '';
  }
}

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== COMPREHENSIVE CONTENT INGEST ===\n");

  // ========== KENDRA VOS - CROSSFIT TIMELINE ==========
  console.log("--- Updating Kendra with CrossFit Timeline ---\n");

  const kendraUpdate = {
    name: 'Kendra Vos',
    firstName: 'Kendra',
    lastName: 'Vos',
    age: '24',
    archetype: 'Elite CrossFit Athlete / BSS Fixer',
    hubLocation: 'Denver, CO / Charlotte, NC',
    modeledAfter: 'Elite CrossFit Games Athlete',
    appearance: 'Athletic brilliance - fit, glowing, a natural draw to anyone who admires strength paired with femininity. Known for hourglass figure and incredible cardio capacity.',
    fitnessSports: `CROSSFIT CAREER:
- Just qualified for first CrossFit Games in 2025
- Nicknamed "The Engine" for ridiculous cardio capacity
- Claire Donnelly working with her to manage competition anxiety
- Quiet, but when she speaks, she's funny and sharp
- Year 2: Placed 25th at CrossFit Games (no longer "postpartum comeback" - athlete in her own right)
- Kendra helps prep for CF Games Finals when not on BSS missions`,
    background: `BSS CAREER:
- Works as fixer at Barrett Strategic Solutions
- Also serves as analyst under Addie during maternity leave
- Returns to field work with Bella as her analyst on East Coast trips

MATERNITY LEAVE ARC:
- Baby: Sophia Addison ("Sophie")
- Year-long maternity leave working from CLT
- Worked mostly from Charlotte as Addie's analyst
- Postpartum return to CrossFit while balancing motherhood

FAITH:
Kendra is Catholic - raised in the faith and still practicing.`,
    relationships: `Chris (Husband) - Gave her a promise ring after CF Games Finals, later married
Addie - Former fling, now complicated sisterhood with unresolved sparks
Elena Barrett - Close friend, helped with CF Games prep
Bella Romano - Her analyst when she returns to fieldwork
Daniel Cruz - Addie suggested she work with him or Harper
Sophie (Daughter) - Baby Sophia Addison`,
    arcStart: 'Up-and-coming CrossFit Games rookie, BSS analyst',
    arcChange: 'Motherhood, maternity leave, promise ring from boyfriend',
    arcEnd: 'Elite athlete, mother, fixer - balancing all three',
    sourceFiles: 'Character Bio, Characters, Love Option Book 4, Kebdra Maternity leave outline, Chat 1',
    clubsAssociations: 'CrossFit Community, BSS Core Team, Wives Club'
  };

  const existingKendra = await prisma.character.findFirst({
    where: { firstName: 'Kendra', projectId: project.id }
  });

  if (existingKendra) {
    await prisma.character.update({
      where: { id: existingKendra.id },
      data: kendraUpdate
    });
    console.log('Updated: Kendra Vos with complete CrossFit timeline');
  } else {
    await prisma.character.create({ data: { projectId: project.id, ...kendraUpdate } });
    console.log('Created: Kendra Vos');
  }

  // ========== KENDRA'S CROSSFIT STORYLINES ==========
  console.log("\n--- Creating Kendra CrossFit Storylines ---\n");

  const kendraStorylines = [
    {
      title: 'Kendra Maternity Leave Year',
      category: 'Character Arc',
      description: 'Year-long outline of Kendra maternity leave and return to fixer role',
      content: `KENDRA'S MATERNITY LEAVE YEAR

PART I - THE ARRIVAL (Months 1-3)
Month 1-2: Recovery & Restlessness
- Baby Sophia Addison ("Sophie") arrives
- Kendra working from CLT headquarters as Addie's analyst
- Physical recovery while mind stays active on BSS work
- Learning new rhythm of motherhood

Month 3: Finding Balance
- Settling into CLT routine
- Remote support for field teams
- First gentle returns to fitness

PART II - THE MIDDLE (Months 4-8)
- Rebuilding strength postpartum
- Working mostly from Charlotte
- Analyst role for Addie and team
- CrossFit training resumes carefully

PART III - THE RETURN (Months 9-12)
- Getting back on track as fixer
- Bella becomes her analyst on short trips
- East Coast operations only at first
- Balancing Sophie, CrossFit, and fieldwork

CROSSFIT THREAD:
- Postpartum return to training
- CF Games qualification as goal
- First Games: proved she belongs
- Year 2: Placed 25th - no longer "comeback story," just athlete`,
      characters: JSON.stringify(['Kendra Vos', 'Addison "Addie"', 'Bella Romano', 'Sophia Addison'])
    },
    {
      title: 'Kendra at the CrossFit Games - Year 2',
      category: 'Competition Scene',
      description: 'Kendra second CrossFit Games appearance, placing 25th',
      content: `KENDRA AT THE CROSSFIT GAMES - YEAR 2

The Coliseum buzzed with the electric roar of thousands. Chalk dust swirled like smoke in the beams of the spotlights. Banners for the Games hung overhead, and on the competition floor, Kendra adjusted the wrap on her wrist, her jaw set.

Sophie is now ~18 months old. Kendra's arc has shifted - she's no longer the "postpartum comeback" story, she's an athlete in her own right.

THE PLACEMENT:
25th place finish - solid performance proving she belongs among the elite.

THE COMMUNITY WATCHES:
- Family/Orders/BSS community all watching
- Chris (now husband) in the stands
- Sophie on someone's lap, pointing at "mommy"
- Elena and the Wives Club cheering
- BSS team following remotely

WHAT IT MEANS:
Kendra has proven she can be:
- Elite athlete
- Mother to Sophie
- BSS fixer
All three, not choosing between them.`,
      characters: JSON.stringify(['Kendra Vos', 'Chris Donnelly', 'Sophia Addison', 'Elena Barrett'])
    },
    {
      title: 'Kendra and Chris - The Promise Ring',
      category: 'Relationship',
      description: 'Chris surprises Kendra with promise ring after CF Games Finals',
      content: `THE PROMISE RING

TIMING:
After the CrossFit Games Finals, Chris surprises Kendra with a promise ring. Not an engagement proposal - but the next step in their relationship.

THE MOMENT:
After months of supporting her training, traveling to competitions, and helping with Sophie, Chris makes his commitment clear. The promise ring symbolizes:
- Their future together
- His support of her athletic career
- Building a family as a team

ADDIE'S REACTION:
When Addie finds out about the promise ring:
- She thinks Chris is "great and the right one"
- But it hurts - the complicated feelings for Kendra unresolved
- She volunteers to be on the road to avoid dealing with it
- Distances herself from CLT support

THE IMPACT:
Kendra becomes closer with Elena and Grace because of Addie's decision to distance. Their sisterhood with Addie continues, but with tension underneath.`,
      characters: JSON.stringify(['Kendra Vos', 'Chris Donnelly', 'Addison "Addie"', 'Elena Barrett', 'Grace Barrett'])
    }
  ];

  for (const storyline of kendraStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({ data: { projectId: project.id, ...storyline } });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({ where: { id: existing.id }, data: storyline });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  // ========== SARA - CROSSFIT COACH ==========
  console.log("\n--- Updating Sara as CrossFit Coach ---\n");

  const saraUpdate = {
    name: 'Sara Whitaker',
    firstName: 'Sara',
    lastName: 'Whitaker',
    archetype: 'CrossFit Coach / Grounded Support',
    bssRole: 'Host to Grace when Jasper and Elena pulled away',
    hubLocation: 'Charlotte, NC',
    background: `Elena's close friend, CrossFit coach, grounded and loyal.

COACHING:
- Runs Sara's Gym in Charlotte
- Coaches elite CrossFitters, lifters, and endurance athletes
- Hosts Strong & Savory cooking classes
- Coached Dylan "Diesel" Rourke since his rehab

ELITE ATHLETES JOIN STRONG & SAVORY:
Some of Sara's elite competitors notice the buzz around Tuesday/Thursday nights at the gym. They see kids and parents leaving with containers of food and smiles, and hear Jazz bragging about her "coach Evie brownies."

A few approach Sara and Evie after class: "Coach, can we jump in sometime? Not to run the show — just to help."

Elite athletes rotate in to help with the cooking classes, creating mentorship between champions and the kids.`,
    relationships: `Elena Barrett - Close friend
Grace Barrett - Host when parents pulled away
Evie Maren - Partner for Strong & Savory at her gym
Dylan "Diesel" Rourke - Coached him since rehab, tight bond
Kendra Vos - Trains at her gym`,
    sourceFiles: 'Character Bio, Chat 1, Characters'
  };

  const existingSara = await prisma.character.findFirst({
    where: { firstName: 'Sara', lastName: 'Whitaker', projectId: project.id }
  });

  if (!existingSara) {
    await prisma.character.create({ data: { projectId: project.id, ...saraUpdate } });
    console.log('Created: Sara Whitaker');
  } else {
    await prisma.character.update({ where: { id: existingSara.id }, data: saraUpdate });
    console.log('Updated: Sara Whitaker');
  }

  // ========== CLAIRE DONNELLY - PERFORMANCE COACH ==========
  console.log("\n--- Creating Claire Donnelly - Performance Coach ---\n");

  const claireCoach = {
    name: 'Claire Hensley',
    firstName: 'Claire',
    lastName: 'Hensley',
    archetype: 'Performance Coach / Sports Psychologist',
    background: `Late 30s, former Olympic-level swimmer turned sports psychologist and corporate performance coach.

CAREER:
- Worked with NFL agents (connects with Chase Rourke subplot)
- Worked with multiple Tier 1 military units
- Known for "mental load mapping" - breaking down what's draining people and what's fueling them

CROSSFIT CONNECTION:
- Working with Kendra now to manage competition anxiety
- Claire is quiet but when she speaks, she's funny and sharp`,
    education: 'Harvard Psychology Graduate',
    fitnessSports: 'Former Olympic-level swimmer, Ironman podium finisher',
    relationships: `Kendra Vos - Working with her on competition anxiety
Chase Rourke - NFL connection
Sara Whitaker - Gym connection`,
    sourceFiles: 'Character Bio, Chat 1'
  };

  const existingClaire = await prisma.character.findFirst({
    where: { firstName: 'Claire', lastName: 'Hensley', projectId: project.id }
  });

  if (!existingClaire) {
    await prisma.character.create({ data: { projectId: project.id, ...claireCoach } });
    console.log('Created: Claire Hensley (Performance Coach)');
  }

  // ========== DYLAN "DIESEL" ROURKE ==========
  console.log("\n--- Creating Dylan Diesel Rourke ---\n");

  const diesel = {
    name: 'Dylan "Diesel" Rourke',
    firstName: 'Dylan',
    lastName: 'Rourke',
    nickname: 'Diesel',
    archetype: 'Adaptive CrossFit Champion',
    fitnessSports: `ADAPTIVE CROSSFIT CAREER:
- Competes in Adaptive Division
- 2-time Fittest on Earth - Adaptive Lower Extremity winner
- Sara has coached him since rehab - their bond is tight
- Gives motivational talks with Claire at sports conferences`,
    relationships: `Sara Whitaker - Coach since rehab, tight bond
Claire Hensley - Co-speaker at conferences
Ridge - Fast friends over bourbon and training talk`,
    sourceFiles: 'Character Bio, Chat 1'
  };

  const existingDiesel = await prisma.character.findFirst({
    where: { nickname: 'Diesel', projectId: project.id }
  });

  if (!existingDiesel) {
    await prisma.character.create({ data: { projectId: project.id, ...diesel } });
    console.log('Created: Dylan "Diesel" Rourke');
  }

  // ========== BELLA SPECIAL OLYMPICS STORYLINE ==========
  console.log("\n--- Creating Bella Special Olympics Storyline ---\n");

  const bellaSOStoryline = {
    title: 'Bella Special Olympics Coaching',
    category: 'Character Arc',
    description: 'Bella coaches two female athletes to the International Games',
    content: `BELLA'S SPECIAL OLYMPICS COACHING

Despite all her jobs and relationship complications, Bella puts her Special Olympics athletes as an important piece of her life.

COACHING ROLES:
- Bowling Coach
- Swimming Coach

TWO ATHLETES TO INTERNATIONAL GAMES:

1. BOSTON ATHLETE (Bowling)
- Female bowler Bella has coached
- Made it to International Special Olympics Games
- Represents the long-distance coaching relationship

2. CHARLOTTE ATHLETE (Swimming)
- Jazz Carter - discovered at local swim meet
- Made it to International Special Olympics Games
- Team NC/Team USA gear
- Closer geographically, more hands-on coaching

BELLA'S PHILOSOPHY:
"Coaching wasn't a side project - it was part of who she was."

While others shine in glamorous settings, Bella shines when she's with her athletes. This highlights her heart for service and loyalty even while buried in work and relationships.

Her "soft beauty" and wholesome character comes through most clearly in these moments.`,
    characters: JSON.stringify(['Bella Romano', 'Jazz Carter', 'Claire Donahue'])
  };

  const existingBellaSO = await prisma.storyline.findFirst({
    where: { title: bellaSOStoryline.title, projectId: project.id }
  });

  if (!existingBellaSO) {
    await prisma.storyline.create({ data: { projectId: project.id, ...bellaSOStoryline } });
    console.log('Created: Bella Special Olympics Storyline');
  }

  // ========== ADDIE "5-FOOT WORLD" COPING ==========
  console.log("\n--- Creating Addie 5-Foot World Storyline ---\n");

  const addie5Foot = {
    title: 'Addie 5-Foot World Coping',
    category: 'Character Trait',
    description: 'Addie picks up the habit of 5-foot world - ignore and override',
    content: `ADDIE'S "5-FOOT WORLD" MINDSET

The "5-foot world" is a term soldiers and endurance athletes use: only focus on the next 5 feet, the next rep, the next step.

HOW ADDIE USES IT:
When overwhelmed by Denver's crisis AND the emotional fallout of Kendra's promise ring, Addie starts breaking everything down:
- Not thinking about tomorrow
- Not thinking about what Kendra is doing
- Just the next 5 feet of work

THE COPING MECHANISM:
- Ignoring emotional pain
- Overriding personal needs
- Focusing only on immediate work
- Withdrawing emotionally while doubling down on tasks

DURING BOOK 4 (DENVER CRISIS):
This habit helps her survive the month-long crisis while dealing with complicated feelings about Kendra. But it also means she's not processing - just surviving.

LONG-TERM IMPACT:
This coping style serves her in crisis but creates distance in relationships. It's how she volunteers to stay on the road rather than face the Kendra/boyfriend situation at home.`,
    characters: JSON.stringify(['Addison "Addie"', 'Kendra Vos'])
  };

  const existingAddie5 = await prisma.storyline.findFirst({
    where: { title: addie5Foot.title, projectId: project.id }
  });

  if (!existingAddie5) {
    await prisma.storyline.create({ data: { projectId: project.id, ...addie5Foot } });
    console.log('Created: Addie 5-Foot World Storyline');
  }

  // ========== ELITE ATHLETES JOIN STRONG & SAVORY ==========
  console.log("\n--- Creating Elite Athletes x Strong & Savory Storyline ---\n");

  const eliteSSStoryline = {
    title: 'Elite Athletes Join Strong & Savory',
    category: 'Community',
    description: 'Sara elite CrossFit athletes volunteer with Strong & Savory cooking classes',
    content: `ELITE ATHLETES JOIN STRONG & SAVORY

THE CURIOSITY:
Some of Sara's elite competitors — CrossFitters, lifters, and even endurance athletes she trains — start noticing the buzz around Tuesday/Thursday nights at the gym. They see kids and parents leaving with containers of food and smiles, and they hear Jazz bragging in the pool about her "coach Evie brownies."

THE ASK:
A few of them approach Sara and Evie after class:
"Coach, can we jump in sometime? Not to run the show — just to help. These kids are doing real work, and we want to support."

THE INTEGRATION:
- Elite athletes rotate in to help with cooking classes
- Creating mentorship between champions and kids
- The Cooking Class isn't just a "side project" - it's respected by the elite too
- Athletes see value in the service and community

THE IMPACT:
This validates Strong & Savory as something meaningful beyond charity. When Games-level athletes volunteer their time, it sends a message that this matters.

Jazz brags about having "real athletes" in her cooking class. The other kids feel special too.`,
    characters: JSON.stringify(['Evie Maren', 'Sara Whitaker', 'Jazz Carter', 'Dylan "Diesel" Rourke'])
  };

  const existingEliteSS = await prisma.storyline.findFirst({
    where: { title: eliteSSStoryline.title, projectId: project.id }
  });

  if (!existingEliteSS) {
    await prisma.storyline.create({ data: { projectId: project.id, ...eliteSSStoryline } });
    console.log('Created: Elite Athletes x Strong & Savory');
  }

  // ========== WIVES CIRCLE CHARACTERS ==========
  console.log("\n--- Creating Wives Circle Characters ---\n");

  const wivesCircle = [
    {
      name: 'Madison "Maddie" Cole',
      firstName: 'Madison',
      lastName: 'Cole',
      nickname: 'Maddie',
      archetype: 'Wives Circle - Fitness Entrepreneur',
      background: 'Former collegiate swimmer turned boutique fitness entrepreneur. Runs a chain of luxury wellness studios across the Southeast.',
      wardrobeStyle: 'Sporty chic - designer athleisure by day, tailored jumpsuits and gold hoops by night. Looks like she stepped out of a Vogue "Sport Luxe" spread.',
      relationships: 'Chris Cole (Spouse) - star NFL quarterback for Charlotte team, dealing with quiet tension over team ownership drama',
      sourceFiles: 'Character Bio, Chat 1'
    },
    {
      name: 'Vivienne "Viv" Ross',
      firstName: 'Vivienne',
      lastName: 'Ross',
      nickname: 'Viv',
      archetype: 'Wives Circle - Heiress/Designer',
      background: 'Heiress to an East Coast shipping fortune, now a high-end interior designer. Splits her time between locations.',
      sourceFiles: 'Character Bio, Chat 1'
    },
    {
      name: 'Jessica Hall',
      firstName: 'Jessica',
      lastName: 'Hall',
      archetype: 'Mentor/Advisor',
      background: 'Jasper mentor and long-time advisor. Razor-sharp strategist who first scouted Jasper in Charlotte and brought him into big-league circles.',
      relationships: 'Jasper Barrett - Mentored him, helped found BSS with her introductions',
      sourceFiles: 'Character Bio'
    },
    {
      name: 'Mason Reilly',
      firstName: 'Mason',
      lastName: 'Reilly',
      archetype: 'Friend/Advisor',
      education: 'Duke Lacrosse teammate of Jasper, UVA Law grad',
      background: 'Jasper Duke lacrosse teammate turned high-powered fixer. Tells Jasper what he needs to hear, not what he wants to hear.',
      sourceFiles: 'Character Bio'
    },
    {
      name: 'Rafe Moreno',
      firstName: 'Rafe',
      lastName: 'Moreno',
      archetype: 'Recruited Specialist',
      background: 'Ex-con, former art thief in the vein of Neal Caffrey. Recruited by Jasper for his charm.',
      sourceFiles: 'Character Bio'
    }
  ];

  for (const char of wivesCircle) {
    const existing = await prisma.character.findFirst({
      where: { firstName: char.firstName, lastName: char.lastName, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({ data: { projectId: project.id, ...char } });
      console.log(`Created: ${char.name}`);
    }
  }

  // ========== CHRIS DONNELLY - KENDRA'S HUSBAND ==========
  console.log("\n--- Creating/Updating Chris Donnelly ---\n");

  const chrisDonnelly = {
    name: 'Chris Donnelly',
    firstName: 'Chris',
    lastName: 'Donnelly',
    archetype: 'Kendra Husband / Builder',
    background: `CAREER PATH (10+ Years Arc):
- Forms his own company or family-run firm: small but deeply respected
- Specialty: projects that leave a mark - youth sports complexes, parks, veterans housing, fitness facilities
- Not political, not flashy, but by then everybody knows Chris as the quiet guy who built half the town

WHAT MAKES HIM DIFFERENT:
- Not foundation or nonprofit work - he builds things
- Not dragged into Jasper's orbit - stays local/regional, independent
- Not strategic chess moves - his "strategy" is execution and trust
- Visible legacy - while others have influence, he has buildings with his name

THE PROMISE RING:
After CF Games Finals, Chris surprises Kendra with a promise ring. Not engagement proposal, but the next step. Shows his commitment to their future, her athletic career, and building family as team.`,
    relationships: `Kendra Vos - Wife (gave her promise ring after CF Games Finals)
Sophia Addison - Daughter ("Sophie")`,
    sourceFiles: 'Love Option Book 4, Character Bio, Chris background expansion'
  };

  const existingChris = await prisma.character.findFirst({
    where: { firstName: 'Chris', lastName: 'Donnelly', projectId: project.id }
  });

  if (!existingChris) {
    await prisma.character.create({ data: { projectId: project.id, ...chrisDonnelly } });
    console.log('Created: Chris Donnelly');
  } else {
    await prisma.character.update({ where: { id: existingChris.id }, data: chrisDonnelly });
    console.log('Updated: Chris Donnelly');
  }

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();
  const seriesCount = await prisma.bookSeries.count();

  console.log(`\n=== COMPREHENSIVE INGEST COMPLETE ===`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total storylines: ${storylineCount}`);
  console.log(`Total book series: ${seriesCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
