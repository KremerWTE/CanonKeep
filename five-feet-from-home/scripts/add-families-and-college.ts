import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING FAMILIES AND KENDRA'S COLLEGE DAYS ===\n");

  // ========== ADDIE'S FAMILY ==========
  console.log("--- Adding Addie's Family ---\n");

  const addieFamily = [
    {
      name: 'Margaret "Maggie" Price',
      firstName: 'Margaret',
      lastName: 'Price',
      nickname: 'Maggie',
      archetype: "Addie's Mother (Estranged)",
      background: `Addie's biological mother. They have not spoken in over a decade.

HISTORY:
- Single mother who struggled with addiction
- Prioritized boyfriends over her daughter
- One of those boyfriends was abusive to Addie
- When Addie left, she didn't look back

CURRENT STATUS:
- Living in a small town in the Midwest
- Has tried to reach out since Addie became prominent
- Addie has not responded

NARRATIVE PURPOSE:
Margaret represents what Addie escaped. Her occasional attempts at contact create tension - especially when Hawk asks about Addie's family.`,
      relationships: `Mother to Addie (estranged)
Addie has not spoken to her since leaving home at 19`,
      sourceFiles: 'Addie backstory'
    },
    {
      name: 'Tommy Price',
      firstName: 'Tommy',
      lastName: 'Price',
      archetype: "Addie's Half-Brother",
      background: `Addie's younger half-brother from one of her mother's relationships. They met as adults.

DISCOVERY:
- Tommy found Addie through social media years after she'd reinvented herself
- He was 18, she was already at BSS
- He didn't want money - just to know his sister

RELATIONSHIP:
- Addie initially kept him at arm's length
- Over time, she's grown protective of him
- She's quietly funded his education
- He knows nothing about BSS or her past

CURRENT:
Tommy is now 24, finishing a graduate degree in social work
He visits Charlotte occasionally
He's the only blood family Addie maintains contact with
He calls her "Sissy" which she pretends to hate`,
      relationships: `Half-brother to Addie
Only family member Addie maintains contact with`,
      sourceFiles: 'Addie backstory'
    }
  ];

  for (const member of addieFamily) {
    const existing = await prisma.character.findFirst({
      where: { name: member.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...member }
      });
      console.log(`Created: ${member.name}`);
    }
  }

  // ========== HAWK'S FAMILY ==========
  console.log("\n--- Adding Hawk's Family ---\n");

  const hawkFamily = [
    {
      name: 'Colonel James "Jim" Hawkins (Ret.)',
      firstName: 'James',
      lastName: 'Hawkins',
      nickname: 'Jim',
      archetype: "Hawk's Father - Retired Military",
      background: `Hawk's father. A career Army officer who raised Hawk with strict military discipline.

CHARACTER:
- Retired Colonel, 30 years of service
- Stoic, demanding, old-school
- Expected Hawk to follow in his footsteps (which he did)
- Proud but doesn't say it

RELATIONSHIP WITH HAWK:
- Strained when Hawk was medically discharged
- Jim saw it as failure; Hawk saw it as betrayal
- They've slowly rebuilt over the years
- Jim respects Jasper, which helped

CURRENT:
- Lives in Virginia with Hawk's mother
- Visits Charlotte occasionally
- Has warmed to Addie (slowly)
- Finally told Hawk he was proud after seeing BSS in action`,
      relationships: `Father to Hawk
Retired Army Colonel
Slowly rebuilding relationship with his son`,
      sourceFiles: 'Hawk backstory'
    },
    {
      name: 'Patricia "Pat" Hawkins',
      firstName: 'Patricia',
      lastName: 'Hawkins',
      nickname: 'Pat',
      archetype: "Hawk's Mother - Military Wife",
      background: `Hawk's mother. The soft balance to his father's harshness.

CHARACTER:
- Classic military wife - moved 15 times
- Raised Hawk largely alone while Jim deployed
- Warm, nurturing, devout Christian
- The emotional anchor of the family

RELATIONSHIP WITH HAWK:
- Always supported him, even when Jim didn't
- Was devastated by his injury
- Prays for him daily
- Adores Addie

CURRENT:
- Lives in Virginia
- Wants grandchildren (hints constantly)
- Video calls Hawk every Sunday
- Has been to Charlotte several times`,
      relationships: `Mother to Hawk
Warm relationship, adores Addie
Wants grandchildren`,
      sourceFiles: 'Hawk backstory'
    },
    {
      name: 'Captain Luke Hawkins',
      firstName: 'Luke',
      lastName: 'Hawkins',
      archetype: "Hawk's Younger Brother - Active Military",
      background: `Hawk's younger brother by 4 years. Active duty Army Captain.

CHARACTER:
- Followed the family tradition
- Currently deployed overseas
- Looks up to Hawk despite the discharge
- Lives in his brother's shadow (happily)

RELATIONSHIP:
- Close with Hawk despite distance
- They talk when missions allow
- Luke sends Hawk updates via encrypted channel
- Has visited Charlotte once, impressed by BSS

NARRATIVE PURPOSE:
Luke represents the path Hawk might have stayed on. His continued service is both a source of pride and occasional pain for Hawk.`,
      relationships: `Younger brother to Hawk
Active duty Army Captain
Close despite distance`,
      sourceFiles: 'Hawk backstory'
    }
  ];

  for (const member of hawkFamily) {
    const existing = await prisma.character.findFirst({
      where: { name: member.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...member }
      });
      console.log(`Created: ${member.name}`);
    }
  }

  // ========== KENDRA'S COLLEGE DAYS ==========
  console.log("\n--- Adding Kendra's College Days Storyline ---\n");

  const kendraCollegeStoryline = {
    title: "Kendra's College Days: Building a Brand",
    category: "Backstory / Character Development",
    description: "Kendra's journey from college athlete to fitness influencer, the origins of her empire",
    content: `SETTING: University of South Carolina, 8-10 years before present
MAJOR: Exercise Science
SPORT: Track & Field (sprinter)

FRESHMAN YEAR:
- Arrives on campus as a scholarship athlete
- Roommate introduces her to fitness posting
- First Instagram post: gym mirror selfie (500 likes)
- Balances athletics with academics
- First Bible study group - her faith deepens

SOPHOMORE YEAR:
- Track team success (conference champion, 200m)
- Fitness account grows to 50K followers
- First brand reaches out (small supplement company)
- Meets Chris at a campus ministry event
- They become friends first (both too focused on goals)

JUNIOR YEAR:
- Injury threatens track career (hamstring)
- Shifts focus to fitness content full-time
- Develops her training philosophy
- Account hits 200K followers
- Chris starts pursuing her romantically
- Their first date: Bible study then pizza

SENIOR YEAR:
- Graduates with honors in Exercise Science
- Fitness following at 500K
- First serious sponsorship deals
- Chris proposes at graduation (she says yes)
- Already planning post-college brand launch

THE FOUNDATION:
Kendra built her empire through:
- Authentic faith integration (never preachy)
- Science-based training programs
- Consistency (never missed a posting day)
- Engaging directly with followers
- Partnering only with brands she believed in

COLLEGE FRIENDS:
Several still appear in her content today:
- Her former roommate (bridesmaid)
- Track teammates who became influencers themselves
- The Bible study leader who mentored her faith

MEETING CHRIS - THE REAL STORY:
At a campus ministry BBQ, Kendra was holding court about nutrition.
Chris walked up: "You know, there's more to life than macros."
She shot back: "And there's more to conversation than terrible opening lines."
He laughed. She laughed.
Two years later, he proposed.`,
    characters: JSON.stringify(['Kendra Donnelly', 'Chris Donnelly']),
    timeline: '8-10 years before present',
    location: 'University of South Carolina',
    themes: JSON.stringify(['Growth', 'Faith', 'Athleticism', 'Entrepreneurship', 'Love'])
  };

  const existingKendraStory = await prisma.storyline.findFirst({
    where: { title: kendraCollegeStoryline.title, projectId: project.id }
  });

  if (!existingKendraStory) {
    await prisma.storyline.create({
      data: { projectId: project.id, ...kendraCollegeStoryline }
    });
    console.log(`Created: ${kendraCollegeStoryline.title}`);
  }

  // Update Kendra's character with college info
  const kendra = await prisma.character.findFirst({
    where: { firstName: 'Kendra', projectId: project.id }
  });

  if (kendra) {
    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        education: `University of South Carolina - B.S. Exercise Science (Honors)
Track & Field Scholarship (Sprinter)
Conference Champion - 200m
Campus Ministry Leadership`,
        background: `${kendra.background || ''}

COLLEGE YEARS:
Kendra attended USC on a track scholarship, competing as a sprinter while majoring in Exercise Science. A hamstring injury junior year shifted her focus from athletics to fitness content creation.

She met Chris Donnelly at a campus ministry BBQ sophomore year. Their friendship grew into romance over shared faith and complementary ambitions.

By graduation, she had 500K followers and a clear path to building her fitness empire. Chris proposed at her graduation ceremony.

THE BRAND ORIGIN:
Kendra's social media presence began as casual gym posts but evolved into a science-based, faith-integrated fitness brand. She never compromised on the brands she partnered with or the content she created.`,
        fitnessSports: `Former Track & Field athlete (sprinter)
Conference Champion - 200m
Current: Elite-level fitness training
Specialty: HIIT, strength training, post-natal fitness
Competed through sophomore year before injury`
      }
    });
    console.log("Updated Kendra with college background");
  }

  // ========== UPDATE HAWK WITH FAMILY REFERENCES ==========
  console.log("\n--- Updating Hawk's Family References ---\n");

  const hawk = await prisma.character.findFirst({
    where: {
      OR: [
        { nickname: 'Hawk' },
        { name: { contains: 'Hawk' } }
      ],
      projectId: project.id
    }
  });

  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        relationships: `${hawk.relationships || ''}

FAMILY:
- Father: Colonel James "Jim" Hawkins (Ret.) - Strict military father, relationship rebuilt over time
- Mother: Patricia "Pat" Hawkins - Warm, nurturing, adores Addie, wants grandchildren
- Brother: Captain Luke Hawkins - Active duty, 4 years younger, still serving

PARTNER:
- Addie - The love of his life, his anchor, the reason he found peace after leaving the military`
      }
    });
    console.log("Updated Hawk with family relationships");
  }

  // ========== UPDATE ADDIE WITH FAMILY REFERENCES ==========
  const addie = await prisma.character.findFirst({
    where: {
      OR: [
        { firstName: 'Addie' },
        { name: { contains: 'Addie' } }
      ],
      projectId: project.id
    }
  });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        relationships: `${addie.relationships || ''}

BIOLOGICAL FAMILY:
- Mother: Margaret "Maggie" Price - Estranged. Last contact over a decade ago.
- Half-Brother: Tommy Price - Only blood family she maintains contact with. He knows nothing of her past.

CHOSEN FAMILY:
- Hawk - Her partner, protector, equal
- Jasper Barrett - The man who saved her and gave her purpose
- Elena Barrett - Sister in all but blood
- The Wives Club - The sisterhood she never had growing up`
      }
    });
    console.log("Updated Addie with family relationships");
  }

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
