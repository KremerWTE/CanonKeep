import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding comprehensive organizations, companies, charities, and sponsors...\n");

  // ========== MAIN COMPANIES ==========
  console.log("--- Adding Main Companies ---\n");

  const companies = [
    {
      name: 'Barrett Strategic Solutions (BSS)',
      shortName: 'BSS',
      type: 'Corporation',
      description: 'Global crisis management and strategic consulting firm',
      industry: 'Crisis Management / Strategic Consulting',
      founder: 'Jasper Barrett',
      leadership: JSON.stringify(['Jasper Barrett (CEO)', 'Harper (COO)', 'Addie (Senior Fixer)', 'Daniel (#4)', 'Cole Harrington (Tier 1)']),
      headquarters: 'Charlotte, NC',
      services: 'Crisis management, strategic consulting, field operations, global deployment',
      relationships: 'Connected to POH, Wives Club, Maison Aurelia',
      significance: `LEADERSHIP STRUCTURE:
- Jasper Barrett: Founder/CEO, transitioned from field to office management
- Harper: COO, became Jasper's top field presence after her engagement
- Addie: Senior Fixer, "fixer of last resort," mentors Daniel
- Daniel: #4 in company, groomed by Addie as trusted fixer
- Cole Harrington: Tier 1 operator, protection and tactical operations

KEY ARCS:
- Denver Crisis (Book 4): Month-long telecoms issue, tests Addie's limits
- Asia operations: Market fires requiring Tier 1/Harper management
- Chicago dinners: High-level client meetings`
    },
    {
      name: 'Maison Aurelia',
      type: 'Corporation',
      description: 'Elena\'s luxury real estate and nonprofit ventures',
      industry: 'Luxury Real Estate / Nonprofit',
      founder: 'Elena Barrett',
      leadership: JSON.stringify(['Elena Barrett (Founder)', 'Bella (Accounts/Events)']),
      headquarters: 'Charlotte, NC',
      services: 'High-end real estate development, nonprofit partnerships, gala hosting',
      relationships: 'Connected to BSS through Jasper, Strong & Savory Foundation, The Compound',
      significance: `Elena's luxury real estate and nonprofit enterprise.

ELENA'S RETURN TO WORK:
After her health crisis, Elena returned to work in luxury real estate and nonprofit with help from:
- Addison helped style her for more confidence
- The Wives Club Zoom calls supported her transformation`
    },
    {
      name: 'Sara\'s Gym',
      shortName: 'Sara\'s Gym',
      type: 'Business',
      description: 'Fitness center and community hub',
      industry: 'Fitness / Community Services',
      founder: 'Sara Hale/Marquez',
      leadership: JSON.stringify(['Sara Hale/Marquez (Owner)']),
      headquarters: 'Charlotte, NC',
      services: 'Fitness programs, Strong & Savory cooking classes, Special Olympics athlete support',
      relationships: 'Hosts Strong & Savory Foundation, connected to Kendra, Special Olympics',
      significance: `Community hub for athletes and families.

PROGRAMS HOSTED:
- Strong & Savory Cooking Classes
- Athlete training and fitness programs
- Special Olympics athlete support
- Sara's Gym Fundraising Banquet`
    },
    {
      name: 'Texas Event Company',
      type: 'Business',
      description: 'Event planning company where Bella works late nights',
      industry: 'Event Planning',
      headquarters: 'Texas',
      services: 'Event planning and coordination',
      relationships: 'Bella works here as one of three jobs',
      significance: `Bella works late nights for this Texas-based event company as one of her three jobs:
1. BSS analyst by day
2. Texas Event Company late nights
3. Elena's Maison Aurelia accounts in early hours

This workload eventually contributes to Bella's breakdown in Germany.`
    },
  ];

  for (const org of companies) {
    const existing = await prisma.organization.findFirst({
      where: { name: org.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({ data: { projectId: project.id, ...org } });
      console.log(`Created: ${org.name}`);
    } else {
      await prisma.organization.update({ where: { id: existing.id }, data: org });
      console.log(`Updated: ${org.name}`);
    }
  }

  // ========== CHARITIES AND NON-PROFITS ==========
  console.log("\n--- Adding Charities and Non-Profits ---\n");

  const charities = [
    {
      name: 'Strong & Savory Foundation',
      shortName: 'Strong & Savory',
      type: 'Non-Profit',
      description: 'Life skills and meal prep program for special needs athletes',
      industry: 'Nonprofit / Education',
      founder: 'Evie Maren',
      leadership: JSON.stringify(['Evie Maren (Founder)', 'Sara (Host)', 'Jazz Carter (Assistant Teacher)']),
      headquarters: 'Charlotte, NC',
      services: 'Meal prep workshops, life skills mentoring, cooking classes for Special Olympics athletes',
      relationships: 'Hosted at Sara\'s Gym, supported by Kendra, connected to Wives Club',
      significance: `MISSION: "Food is love in its purest form"

ORIGINS:
- Started as cooking classes at Sara's Gym
- Evie refused payment: "Let it be free"
- Jazz Carter awakened Evie's new purpose

KEY PEOPLE:
- Evie Maren: Founder, runs classes
- Sara: Hosts at her gym
- Kendra: Leads workouts when in Charlotte
- Jazz Carter: Assistant teacher
- Grace Barrett: Volunteers

PHILOSOPHY:
Evie's refusal of money made the program a symbol of pure service.`
    },
    {
      name: 'Protectresses of Honor (POH)',
      shortName: 'POH',
      type: 'Order/Non-Profit',
      description: 'Women\'s protective and service order',
      industry: 'Service Organization',
      founder: 'Unknown',
      leadership: JSON.stringify(['Addie (Protectress)']),
      headquarters: 'Various locations',
      services: 'Protection, family support, crisis visitation, community service',
      relationships: 'Connected to Wives Club, BSS, military families',
      significance: `ADDIE'S ROLE:
- Protectress: Leadership position in the Order
- Balances POH duties with BSS work
- Uses motherhood experience to speak with authentic empathy

MISSION:
- Protect families and support those in crisis
- Visit grieving families
- Provide the "umbrella" of protection for the circle

EVIE'S PROTECTION:
Addie formally brought Evie under POH protection:
"You're protected now. Whatever comes, you're not alone."`
    },
    {
      name: 'Special Olympics Charlotte',
      type: 'Non-Profit',
      description: 'Sports programs for athletes with intellectual disabilities',
      industry: 'Sports / Nonprofit',
      leadership: JSON.stringify(['Various coaches', 'Bella (Volunteer Coach)']),
      headquarters: 'Charlotte, NC',
      services: 'Bowling, swimming, track & field, unified sports programs',
      relationships: 'Connected to Strong & Savory, Sara\'s Gym, The Compound',
      significance: `BELLA'S COACHING:
- Bowling: Her first Special Olympics team
- Swimming: Discovered Jazz at a local meet
- Track & Field: Coaching through unified programs

KEY ATHLETES:
- Jazz Carter: Swimmer, Team NC/Team USA
- Claire Donahue: Bowler, competed at International Games

BELLA'S PHILOSOPHY:
"Coaching wasn't a side project, it was part of who she was."`
    },
    {
      name: 'The Wives Club',
      type: 'Social/Support Organization',
      description: 'Support network for wives of BSS/military personnel',
      industry: 'Social Support',
      leadership: JSON.stringify(['Elena', 'Addie', 'Kendra', 'Harper', 'Bella', 'Selene', 'Lottie', 'Sara']),
      headquarters: 'Charlotte, NC',
      services: 'Emotional support, luncheons, pre-gala rituals, shopping trips, crisis support',
      relationships: 'Connected to BSS, POH, all family members',
      significance: `CORE MEMBERS:
- Elena: Often hosts at Aurelia estate
- Addie: Protector role, "the umbrella"
- Kendra: Athletic inspiration
- Harper: COO of BSS, organizing force
- Bella: "Soft beauty," mentor to newer members
- Selene: Dangerous allure, complexity
- Lottie: "The DUFF," logistics and grounding force
- Sara: Heart of the family network

ACTIVITIES:
- Luncheons at fine restaurants
- Pre-gala rituals and dressing together
- Shopping trips (gowns, lingerie, jewelry)
- Support during crises and family events`
    },
  ];

  for (const org of charities) {
    const existing = await prisma.organization.findFirst({
      where: { name: org.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({ data: { projectId: project.id, ...org } });
      console.log(`Created: ${org.name}`);
    } else {
      await prisma.organization.update({ where: { id: existing.id }, data: org });
      console.log(`Updated: ${org.name}`);
    }
  }

  // ========== KENDRA'S SPONSORS ==========
  console.log("\n--- Adding Kendra's Sponsors ---\n");

  const sponsors = [
    {
      name: 'Kendra\'s Athletic Sponsors',
      type: 'Sponsorship Portfolio',
      description: 'Kendra\'s CrossFit and fitness sponsorships',
      industry: 'Athletic Sponsorship',
      leadership: JSON.stringify(['Kendra (Athlete)']),
      headquarters: 'Various',
      services: 'Athletic apparel, fitness equipment, nutrition, wellness products',
      relationships: 'Connected to CrossFit, Sara\'s Gym, Strong & Savory',
      significance: `ATHLETIC ACHIEVEMENTS:
- CrossFit Games competitor (placed 5th)
- National-level athlete
- Fitness influencer and role model

SPONSOR TYPES:
- Athletic apparel brands
- Fitness equipment companies
- Nutrition and supplement brands
- Wellness and recovery products

KEY SCENES:
- "Lift Heavy, Live Salty" shirts from Miami
- Team NC/Team USA gear for Jazz
- Equipment donations to Sara's Gym

MYTHIC STATUS:
Kendra becomes a "mythic big sister figure" to Strong & Savory athletes.`
    },
  ];

  for (const org of sponsors) {
    const existing = await prisma.organization.findFirst({
      where: { name: org.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.organization.create({ data: { projectId: project.id, ...org } });
      console.log(`Created: ${org.name}`);
    } else {
      await prisma.organization.update({ where: { id: existing.id }, data: org });
      console.log(`Updated: ${org.name}`);
    }
  }

  // ========== HAWK'S BACKGROUND UPDATES ==========
  console.log("\n--- Updating Hawk with complete background ---\n");

  const hawk = await prisma.character.findFirst({
    where: { name: { contains: 'Hawk' } }
  });

  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        background: `Full Name: [Callsign only] - universally known as Hawk

ORIGIN & FAMILY:
Grew up in a small, rough Texas town where life revolved around grit, survival, and keeping your head down.

Parents were absent from his adult life—either estranged or deceased—leaving him with a younger sister, Claire (based in Dallas), as his only blood relative. Their relationship is cordial but distant.

THE BROTHERHOOD:
Rose through the military ranks with distinction. His bond with his teammates became his chosen family. The Brotherhood is sacred to him.

BOND WITH COLE:
Cole Harrington is his brother-in-arms. Stories include:
- The Dust Storm Extraction (Afghanistan)
- Balcony Shot: Cole respects Hawk's mind
- Pickup Chase: Their banter comes from surviving together

RELATIONSHIP WITH ADDIE:
- Met during her burnout period
- The midnight shower "proposal" scene
- Built house together, moved in
- Quiet but romantic proposal, wedding on their property
- Twins (boy and girl) plus third child quickly after
- "Dad Ops" - late nights rocking babies to sleep

PERSONALITY:
Both stoic and magnetic. Doesn't waste words, but when he speaks, people listen.`,
        relationships: `Addie - Wife, married after quiet proposal, have twins plus one more child
Cole Harrington - Brother-in-arms, deep trust from military days
Claire (sister) - Only blood relative, in Dallas, cordial but distant
The Brotherhood - His chosen family from military service
Grace Barrett - Protective uncle figure`
      }
    });
    console.log('Updated: Hawk with complete background');
  }

  // ========== ADDIE FAMILY UPDATES ==========
  console.log("\n--- Updating Addie with family growth ---\n");

  const addie = await prisma.character.findFirst({
    where: { firstName: 'Addison' }
  });

  if (addie) {
    const addieUpdate = {
      background: (addie.background || '') + `

FAMILY WITH HAWK:

THE TWINS:
After stepping fully into her role as Protectress of Honor (POH), Addie and Hawk welcome twin babies — one boy and one girl.

The birth softens Hawk in surprising ways. The team calls him "Dad Ops."

THE THIRD CHILD:
Pregnant again within a year. A divine surprise that strengthens their faith.

Hawk: "We've survived combat zones together, love. We can survive diapers."

FERTILITY STRUGGLES:
Doctors warned pregnancy might be difficult — her body, mind, and spirit had been through exhaustion hospitalization.

Dr. wife of Wives Club in Greensboro helped them through the process.`
    };

    await prisma.character.update({
      where: { id: addie.id },
      data: addieUpdate
    });
    console.log('Updated: Addie with family growth');
  }

  // Final counts
  const orgCount = await prisma.organization.count();
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\nTotal organizations: ${orgCount}`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
