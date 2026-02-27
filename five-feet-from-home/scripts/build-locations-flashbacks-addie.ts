import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== BUILDING LOCATIONS, FLASHBACKS & ADDIE BACKSTORY ===\n");

  // ========== STEP 1: BUILD OUT LOCATIONS ==========
  console.log("--- Step 1: Building Detailed Locations ---\n");

  const locations = [
    // BSS LOCATIONS
    {
      name: 'The Forge (BSS Charlotte HQ)',
      description: `Barrett Strategic Solutions headquarters in Charlotte, NC. A 10-story building that houses the nerve center of BSS operations.

FLOOR BREAKDOWN:
1st Floor: Public Face / Reception - Looks like a normal corporate consulting firm
2nd-3rd Floors: Elena's Event & Gala Division - Where the Wives Club social operations are coordinated
4th-5th Floors: The Crucible - Training center with CrossFit-style gym, tactical training areas, and the Sentinels' Watch Desk
6th Floor: The Ghost Grid (Cyber Division) - Offensive and defensive cyber operations
7th Floor: The Watchtower (Analyst Wing) - Intelligence analysis and red-teaming
8th Floor: The Hammer (Strategic Fixers) - Elite troubleshooters
9th-10th Floors: Executive Suite & Secure Range - Jasper's office, secure conference rooms, and private shooting range`,
      significance: 'The heart of BSS operations. Where missions are planned, crises are managed, and the family gathers.',
      rules: 'No personal devices above floor 5. Full biometric security. Operators train daily.'
    },
    {
      name: 'The Barrett Compound',
      description: `Jasper and Elena's primary residence in Charlotte. A sprawling estate that serves as the unofficial gathering place for the BSS family.

LAYOUT:
- Main House: 12,000 sq ft Mediterranean revival
- Guest House: For visiting operators and VIPs
- Pool House: Site of many Wives Club gatherings
- The Barn: Converted to a private gym and event space
- Security Cottage: 24/7 manned by BSS personnel

FEATURES:
- Private chapel (Elena's sanctuary)
- Wine cellar converted to secure room
- Helipad for emergency extractions
- Gardens designed for surveillance coverage`,
      significance: 'Home base for the Barrett family. Where major decisions are made over dinner. The soul of the Five Feet universe.',
      rules: 'Family first in this space. Work discussions in the study only.'
    },
    {
      name: 'BSS Miami Lab',
      description: `The Miami outpost of BSS, run by Harper Vance. Located in a renovated art deco building in Coral Gables.

OPERATIONS:
- Latin America and Caribbean focus
- Maritime operations coordination
- Selene's handler base
- Entertainment industry contacts

VIBE:
More casual than Charlotte. Harper's leadership style is reflected in the open floor plan and rooftop bar for debriefs.`,
      significance: 'Harper\'s domain. Where Selene reports. Gateway to Latin American operations.',
      rules: 'Harper runs it her way. Charlotte respects the autonomy.'
    },
    {
      name: 'BSS London Office',
      description: `European operations hub located in a Georgian townhouse in Mayfair. Understated elegance hiding serious capability.

FOCUS:
- European operations
- Middle East coordination
- Financial sector clients
- Old money connections`,
      significance: 'Gateway to European aristocracy and Middle Eastern royalty.',
      rules: 'Blend in with the surroundings. Discretion above all.'
    },
    {
      name: 'The Echo Park House (LA Lab)',
      description: `BSS Los Angeles presence, a modernist house in Echo Park that serves as base for West Coast and entertainment industry operations.

SPECIALTY:
- Entertainment crisis management
- Celebrity protection
- Tech industry clients
- Sirens West Coast operations`,
      significance: 'Hollywood connections. Where the Sirens coordinate their LA activities.',
      rules: 'Low profile. The neighbors think it\'s a production company.'
    },
    // WIVES CLUB LOCATIONS
    {
      name: 'The Palazzo (Addie\'s Estate)',
      description: `Addie\'s Charlotte estate, known informally as the Palace of Honor. A 15,000 sq ft Italian Renaissance-style mansion.

FEATURES:
- Grand ballroom for Wives Club galas
- Private apartments for visiting dignitaries
- The Rose Garden: Site of many intimate gatherings
- Wine cellar with Vatican-sourced vintages
- Private chapel with original medieval artwork`,
      significance: 'Addie\'s power base. Where the Wives Club\'s inner circle truly convenes. The most exclusive address in Charlotte.',
      rules: 'Invitation only. What happens at the Palazzo stays at the Palazzo.'
    },
    {
      name: 'Maison Aurelia Charlotte',
      description: `The charitable foundation and event space run by Elena Barrett. A restored Gilded Age mansion in Myers Park.

FUNCTIONS:
- Charity galas and fundraisers
- Wives Club official events
- Art exhibitions
- Debutante balls
- Wedding receptions for the connected`,
      significance: 'The public face of the Wives Club\'s charitable work. Where Charlotte society gathers under Elena\'s watchful eye.',
      rules: 'Impeccable behavior expected. This is the public stage.'
    },
    // INTERNATIONAL LOCATIONS
    {
      name: 'Hotel de Russie (Rome)',
      description: `The preferred Rome accommodation for BSS leadership. A luxury hotel near the Spanish Steps with Vatican connections.

SIGNIFICANCE:
- Site of the Donnelly family\'s stay for the papal baptism
- Regular meeting point for Vatican-related operations
- Elena\'s favorite European hotel`,
      significance: 'Gateway to Vatican operations. Where the Barrett family stays in Rome.',
      rules: 'Entire floor secured for BSS visits.'
    },
    {
      name: 'The Vatican',
      description: `Holy See. Site of the most significant religious events in the Five Feet universe.

BSS CONNECTION:
- EOHSJ membership gives access
- The papal baptism occurred here
- Jasper has private audience privileges
- Some operations have protected Church interests`,
      significance: 'Represents the highest expression of faith and power in the series. The baptism changed everything.',
      rules: 'Absolute discretion. Faith comes first here.'
    },
    {
      name: 'Dubai Safe House',
      description: `A luxury penthouse in Dubai Marina serving as BSS Middle East operations base.

FEATURES:
- 360-degree surveillance coverage
- Secure communications
- Extraction route to private airfield
- Cover as real estate investment office`,
      significance: 'Middle East operations hub. Where deals are made and problems disappear.',
      rules: 'Local laws respected publicly. BSS standards maintained privately.'
    },
    // PERSONAL LOCATIONS
    {
      name: 'Sara\'s Gym',
      description: `The CrossFit gym owned and operated by Sara, a member of the Wives Club. Located in Charlotte\'s NoDa district.

ATMOSPHERE:
- Elite training facility
- BSS operators welcome
- Wives Club members train here
- Community programming for local youth`,
      significance: 'Where the BSS family trains together. Sara is a trusted member of the inner circle.',
      rules: 'Train hard. Support each other. No egos.'
    },
    {
      name: 'The Donnelly Home',
      description: `Chris and Kendra\'s family home in Charlotte. A craftsman-style house in Dilworth.

FEATURES:
- More modest than other BSS homes (by choice)
- Nursery for baby Donnelly
- Kendra\'s home gym and content studio
- Backyard perfect for family gatherings`,
      significance: 'Represents the grounded, faith-centered life Chris and Kendra have built.',
      rules: 'Faith first. Family always.'
    }
  ];

  for (const loc of locations) {
    const existing = await prisma.location.findFirst({
      where: { name: loc.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.location.create({
        data: { projectId: project.id, ...loc }
      });
      console.log(`Created: ${loc.name}`);
    } else {
      await prisma.location.update({
        where: { id: existing.id },
        data: loc
      });
      console.log(`Updated: ${loc.name}`);
    }
  }

  // ========== STEP 2: ADD FLASHBACK STORYLINES ==========
  console.log("\n--- Step 2: Building Flashback Storylines ---\n");

  const flashbacks = [
    {
      title: "Flashback: Jasper Meets Elena",
      category: "Flashback / Origin",
      description: "How Jasper Barrett met Elena at a charity gala, years before BSS became what it is",
      content: `SETTING: Charleston, 12 years before present
EVENT: A charity auction for hurricane relief

THE MEETING:
Jasper is working security for a wealthy client attending the gala. He's not the polished executive yet - he's in a rented tux, working a job.

Elena is there representing her family's foundation. She's beautiful, poised, and utterly out of his league.

Their eyes meet across the room.

SCENE:
- Elena approaches him, amused that he's clearly not part of "her world"
- Jasper is direct, unpolished, genuine
- She finds it refreshing after years of society sycophants
- They talk for two hours by the gardens
- He gives her his card (cheap, simple)
- She calls the next day

THE BEGINNING:
Their courtship is unconventional. He takes her to a boxing gym on their second date. She takes him to the opera.

She sees the man he could become.
He sees the life he never imagined having.

SIGNIFICANCE:
This flashback grounds the series - showing that even the most powerful relationships started simply, with two people choosing each other.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: '12 years before present',
      themes: JSON.stringify(['Love', 'Origin', 'Class', 'Destiny'])
    },
    {
      title: "Flashback: Addie's Darkest Days",
      category: "Flashback / Backstory",
      description: "Before Hawk, before the Palace of Honor, Addie survived things she never discusses",
      content: `SETTING: Los Angeles, 8 years before present
CONTEXT: Addie at her lowest point before Jasper found her

THE PAST:
Addie wasn't always the untouchable Patroness. She was a survivor working in the adult entertainment industry, making money however she could.

This flashback reveals:
- How she ended up in LA (escaping an abusive relationship)
- Her time as a cam star and adult performer
- The intelligence she gathered (unintentionally at first)
- The night everything changed

THE TURNING POINT:
A client tries to hurt her. She fights back. Harder than anyone expected.

Jasper, working a case nearby, intervenes. He sees something in her - not a victim, but a survivor with potential.

HE OFFERS HER A CHOICE:
"I can walk away and you go back to this life. Or you can come with me, and I'll teach you how to never be vulnerable again."

She chooses door two.

SIGNIFICANCE:
This flashback humanizes Addie and explains her fierce loyalty to Jasper, her understanding of the Sirens, and her capacity for both tenderness and violence.`,
      characters: JSON.stringify(['Addie', 'Jasper Barrett']),
      timeline: '8 years before present',
      location: 'Los Angeles',
      themes: JSON.stringify(['Survival', 'Transformation', 'Rescue', 'Loyalty'])
    },
    {
      title: "Flashback: Hawk's Military Days",
      category: "Flashback / Origin",
      description: "Hawk before BSS - his final military mission and the injury that changed everything",
      content: `SETTING: Afghanistan, 6 years before present
CONTEXT: Hawk's last military operation

THE MISSION:
Tier 1 unit. Compound raid. Intel suggested high-value target.

THE REALITY:
The intel was bad. It was a trap.

Hawk's team walks into an ambush. The firefight is intense. Hawk takes shrapnel saving a teammate.

THE AFTERMATH:
- Three teammates dead
- Hawk critically wounded
- Months of recovery
- Medical discharge from the military
- Lost. Purposeless. Angry.

THE BRIDGE:
Jasper, himself a veteran, reaches out. Offers Hawk a position at BSS.

"You're not done fighting. You just need a new war."

Hawk joins BSS. Finds family again. Eventually finds Addie.

SIGNIFICANCE:
This flashback explains Hawk's intensity, his need for purpose, his protective nature, and why he'd die for the BSS family without hesitation.`,
      characters: JSON.stringify(['Hawk']),
      timeline: '6 years before present',
      location: 'Afghanistan',
      themes: JSON.stringify(['Sacrifice', 'Loss', 'Purpose', 'Brotherhood'])
    },
    {
      title: "Flashback: The Founding of BSS",
      category: "Flashback / Origin",
      description: "The early days when BSS was just Jasper and a vision",
      content: `SETTING: Charlotte, 10 years before present
CONTEXT: Jasper starting BSS from nothing

THE BEGINNING:
- Jasper fresh out of the military
- One room office, one phone, one laptop
- A vision of what crisis management could be

THE FIRST CLIENT:
A small business owner being extorted. Police wouldn't help.

Jasper solved it in three days. Word spread.

THE GROWTH:
- Year 1: Just Jasper and a few contractors
- Year 2: Hawk joins
- Year 3: First major corporate client
- Year 4: Harper comes aboard
- Year 5: The Forge is built

THE PHILOSOPHY FORMS:
"We're not mercenaries. We're thinking predators. Brains first, fists last."

SIGNIFICANCE:
This flashback shows BSS didn't start as the powerhouse it became. It was built through grit, reputation, and Jasper's uncompromising vision.`,
      characters: JSON.stringify(['Jasper Barrett', 'Hawk', 'Harper Vance']),
      timeline: '10 years before present',
      location: 'Charlotte, NC',
      themes: JSON.stringify(['Ambition', 'Building', 'Vision', 'Growth'])
    },
    {
      title: "Flashback: Chris and Kendra's Wedding",
      category: "Flashback / Life Event",
      description: "The wedding that brought two families together and set the Donnelly story in motion",
      content: `SETTING: Charlotte, 4 years before present
CONTEXT: The wedding of Chris Donnelly and Kendra

THE DAY:
- Small ceremony at a historic chapel
- Reception at Maison Aurelia (Elena's gift)
- BSS provides discrete security
- Maggie cries through the entire ceremony

MOMENTS:
1. Chris's vows - simple, genuine, from the heart
2. Kendra's vows - she quotes scripture about partnership
3. The first dance - "At Last" by Etta James
4. Jasper toasts the couple as his "brother and sister"
5. Elena catches the bouquet (she's already married, but tradition)
6. Hawk and Addie sneak away early (foreshadowing)

THE SIGNIFICANCE:
This wedding represents hope. Chris and Kendra are the heart of the BSS family - their union strengthened everyone.

FORESHADOWING:
During the reception, Kendra whispers to Elena: "I want what you have. A family that means something."

Elena responds: "Then welcome to ours."`,
      characters: JSON.stringify(['Chris Donnelly', 'Kendra Donnelly', 'Maggie Donnelly', 'Elena Barrett', 'Jasper Barrett', 'Hawk', 'Addie']),
      timeline: '4 years before present',
      location: 'Charlotte, NC',
      themes: JSON.stringify(['Love', 'Family', 'New Beginnings', 'Unity'])
    },
    {
      title: "Flashback: Elena's Miscarriage",
      category: "Flashback / Tragedy",
      description: "The loss that Elena and Jasper never discuss but shaped their marriage",
      content: `SETTING: Charlotte, 7 years before present
CONTEXT: A tragedy that tested the Barrett marriage

THE LOSS:
Elena was three months pregnant. Jasper was on an operation.

She was alone when it happened.

THE AFTERMATH:
- Elena's devastation
- Jasper's guilt (he should have been there)
- Months of strain between them
- Elena finding solace in faith
- Jasper doubling down on work

THE HEALING:
Eventually, they talk. Really talk.

Jasper: "I can't protect everyone. I couldn't protect..."
Elena: "You're not responsible for everything. But you are responsible for being here."

They decide together: They will try again when ready.

SIGNIFICANCE:
This flashback explains:
- Why Elena is so protective of pregnant wives in the club
- Why Jasper drops everything for family emergencies
- The depth of their love - tested and proven
- Why the children they do have mean everything`,
      characters: JSON.stringify(['Elena Barrett', 'Jasper Barrett']),
      timeline: '7 years before present',
      location: 'Charlotte, NC',
      themes: JSON.stringify(['Loss', 'Grief', 'Marriage', 'Healing', 'Faith'])
    }
  ];

  for (const flashback of flashbacks) {
    const existing = await prisma.storyline.findFirst({
      where: { title: flashback.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...flashback }
      });
      console.log(`Created: ${flashback.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: flashback
      });
      console.log(`Updated: ${flashback.title}`);
    }
  }

  // ========== STEP 3: UPDATE ADDIE WITH CAM STAR BACKGROUND ==========
  console.log("\n--- Step 3: Adding Addie's Cam Star Background ---\n");

  const addie = await prisma.character.findFirst({
    where: {
      OR: [
        { firstName: 'Addie' },
        { name: { contains: 'Addie' } },
        { name: { contains: 'Addison' } }
      ],
      projectId: project.id
    }
  });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        background: `THE HIDDEN PAST:
Before the Palace of Honor, before Hawk, before becoming the most respected woman in Charlotte's elite circles, Addie was a survivor.

ORIGIN:
- Born into poverty
- Escaped an abusive relationship at 19
- Landed in Los Angeles with nothing
- Did what she had to do to survive

THE CAM STAR YEARS:
- Built a following online as a cam performer
- Learned to read people, manipulate situations
- Gathered intelligence without realizing its value
- Made money, but never felt safe

THE TURNING POINT:
A client got dangerous. Addie fought back harder than expected. Jasper Barrett, working a nearby case, intervened.

He saw not a victim but a survivor with rare talents.

JASPER'S OFFER:
"Come with me. Learn to never be vulnerable again."

THE TRANSFORMATION:
Jasper trained her personally. Not just combat - strategy, analysis, social manipulation. He saw her potential as a fixer.

Years later, she's the Patroness of Honor. Nobody in Charlotte society knows her past - and nobody ever will, unless she chooses to reveal it.

WHY THIS MATTERS:
- Her past explains her understanding of the Sirens
- She champions women others might dismiss
- Her loyalty to Jasper is absolute (he saved her)
- She can spot pretenders because she was one
- Her elegance now is a choice, not an inheritance`,
        secrets: `KNOWN TO VERY FEW:
1. Her cam star past (only Jasper, Hawk know)
2. What really happened the night Jasper found her
3. She still owns the rights to her old content (leverage, just in case)
4. She anonymously funds shelters for women escaping the industry
5. She maintains contact with a few Sirens - not for BSS, but for sisterhood`,
        arcStart: 'Survivor in LA, using the only tools she had to escape her past',
        arcChange: 'Jasper offers her a new life. She accepts and transforms completely.',
        arcEnd: 'The untouchable Patroness of Honor, wielding power with grace and steel'
      }
    });
    console.log(`Updated Addie with complete backstory`);
  }

  // Final counts
  const locationCount = await prisma.location.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Locations: ${locationCount}`);
  console.log(`Storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
