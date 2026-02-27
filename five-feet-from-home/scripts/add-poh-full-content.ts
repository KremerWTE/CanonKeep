import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING FULL POH CONTENT ===\n");

  // ============ POH ASSISTANT CHARACTER UPDATES ============
  console.log("--- Updating POH Assistant Characters ---\n");

  const pohAssistants = [
    {
      name: "Bella",
      pohRole: "The Hand of the POH",
      pohSymbol: "Silver quill pin",
      pohDescription: "Closest personal confidante and executive assistant to Addie. Handles daily coordination, messaging, and whispers things no one else dares to. The voice and right hand of POH.",
      bssRole: "POH - The Hand of the POH"
    },
    {
      name: "Elena Barrett",
      pohRole: "The Marshal of the Silver Room",
      pohSymbol: "Key-shaped brooch",
      pohDescription: "Keeper of the POH library and artifacts, ensures cultural and historical gifts are catalogued. Acts as ceremonial planner for major gatherings.",
      bssRole: "POH - The Marshal of the Silver Room"
    },
    {
      name: "Harper",
      pohRole: "The Guardian of the Ledger",
      pohSymbol: "Silver bracelet with etched scales of justice",
      pohDescription: "Manages the treasury of favors, gifts, and promises—both financial and strategic. Keeps track of who owes what and when.",
      bssRole: "POH - The Guardian of the Ledger"
    },
    {
      name: "Kendra",
      pohRole: "The Warden of the Gates",
      pohSymbol: "Steel signet ring with hidden cross",
      pohDescription: "Oversees security, travel, and protective measures via BSS and personal networks. Ensures POH's safety without drawing attention.",
      bssRole: "POH - The Warden of the Gates"
    },
    {
      name: "Selene",
      pohRole: "The Herald of the Flame",
      pohSymbol: "Pendant with stylized flame",
      pohDescription: "Public face when Addie cannot appear. Speaks at galas, manages whispers, and spreads the POH message subtly through high society.",
      bssRole: "POH - The Herald of the Flame"
    },
    {
      name: "Sara",
      pohRole: "The Mistress of the Table",
      pohSymbol: "Silver goblet charm",
      pohDescription: "Ensures the traditions of meals, gatherings, and rituals are carried out. She keeps the bonds alive through shared moments.",
      bssRole: "POH - The Mistress of the Table"
    },
    {
      name: "Mandy",
      pohRole: "The Keeper of the Seal",
      pohSymbol: "Wax-seal emblem necklace",
      pohDescription: "Trusted to deliver confidential messages and negotiate on Addie's behalf. Her word carries Addie's weight when abroad.",
      bssRole: "POH - The Keeper of the Seal"
    }
  ];

  for (const assistant of pohAssistants) {
    // Try to find existing character
    const existing = await prisma.character.findFirst({
      where: {
        projectId: project.id,
        OR: [
          { name: assistant.name },
          { name: { contains: assistant.name.split(' ')[0] } }
        ]
      }
    });

    if (existing) {
      // Update with POH role
      await prisma.character.update({
        where: { id: existing.id },
        data: {
          bssRole: assistant.bssRole,
          background: existing.background
            ? `${existing.background}\n\nPOH ROLE: ${assistant.pohRole}\nSymbol: ${assistant.pohSymbol}\n${assistant.pohDescription}`
            : `POH ROLE: ${assistant.pohRole}\nSymbol: ${assistant.pohSymbol}\n${assistant.pohDescription}`
        }
      });
      console.log(`Updated: ${assistant.name} with POH role: ${assistant.pohRole}`);
    } else {
      // Create new character
      await prisma.character.create({
        data: {
          projectId: project.id,
          name: assistant.name,
          firstName: assistant.name.split(' ')[0],
          lastName: assistant.name.split(' ')[1] || '',
          archetype: assistant.pohRole,
          bssRole: assistant.bssRole,
          background: `POH ROLE: ${assistant.pohRole}\nSymbol: ${assistant.pohSymbol}\n${assistant.pohDescription}`
        }
      });
      console.log(`Created: ${assistant.name} with POH role: ${assistant.pohRole}`);
    }
  }

  // ============ POH RECOVERY MISSION STORYLINES ============
  console.log("\n--- Adding POH Recovery Mission Storylines ---\n");

  const recoveryStorylines = [
    {
      title: "Hurricane Carolinas Recovery",
      category: "POH / Recovery Mission",
      description: "A Category 4 hurricane devastates the NC coast - POH opens the compound to displaced families",
      content: `SOUTHEAST RECOVERY - HURRICANE CAROLINAS

A Category 4 hurricane devastates the NC coast.

THE MISSION:
Addie and Hawk open their ranch compound to shelter dozens of displaced families.

POH ROLE:
She personally coordinates with BSS logistics and the Knights of Columbus to deliver water and fuel.

CONFLICT:
FEMA delays cause tension. Addie leans on Elena's event network to bring supplies by private jet.

RESOLUTION:
Survivors call her "The Lady of the Mountains," cementing POH's quiet influence in the Southeast.

WHO'S INVOLVED:
- Addie (leading)
- Hawk (logistics coordination)
- Elena (supply network)
- Kendra (security)
- Knights of Columbus delegation`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Elena Barrett', 'Kendra']),
      themes: JSON.stringify(['POH', 'Recovery', 'Hurricane', 'Southeast', 'Humanitarian'])
    },
    {
      title: "Train Derailment Recovery - Pennsylvania",
      category: "POH / Recovery Mission",
      description: "A toxic chemical spill threatens Appalachian towns - POH rapid response",
      content: `NORTHEAST RECOVERY - TRAIN DERAILMENT IN PENNSYLVANIA

A toxic chemical spill threatens towns near the Appalachians.

THE MISSION:
Addie arrives in boots and work gloves, ignoring press requests. She walks the wreckage with first responders.

POH ROLE:
She pulls Harper and Bella into a rapid-response fundraising campaign, raising millions for medical support.

CONFLICT:
A corporate donor tries to spin the disaster. Addie confronts him privately, forcing accountability.

RESOLUTION:
Families receive treatment, and Addie's leadership is whispered about in DC circles.

WHO'S INVOLVED:
- Addie (on the ground)
- Harper (fundraising)
- Bella (coordination)
- First responders`,
      characters: JSON.stringify(['Addie', 'Harper', 'Bella']),
      themes: JSON.stringify(['POH', 'Recovery', 'Northeast', 'Environmental Crisis'])
    },
    {
      title: "Kansas Tornado Recovery",
      category: "POH / Recovery Mission",
      description: "A string of tornadoes levels entire neighborhoods in the Midwest",
      content: `MIDWEST RECOVERY - TORNADOES IN KANSAS

A string of tornadoes levels entire neighborhoods.

THE MISSION:
Addie travels to Kansas with Mandy. They ride in on trucks loaded with generators and livestock feed.

POH ROLE:
She directs crews to rebuild barns and distribute relief packages, showing respect for the farm families.

CONFLICT:
Local officials resist outside help. Addie earns trust by working side by side in the mud.

RESOLUTION:
The story of a "commander's wife in jeans and braids" spreads through the Midwest.

WHO'S INVOLVED:
- Addie (leading)
- Mandy (The Keeper of the Seal)
- BSS logistics teams
- Local farm families`,
      characters: JSON.stringify(['Addie', 'Mandy']),
      themes: JSON.stringify(['POH', 'Recovery', 'Midwest', 'Tornadoes', 'Rural Community'])
    },
    {
      title: "California Wildfire Relief",
      category: "POH / Recovery Mission",
      description: "Massive fires displace thousands north of LA - POH organizes relief",
      content: `WEST RECOVERY - CALIFORNIA WILDFIRES

Massive fires displace thousands north of LA.

THE MISSION:
Addie joins Elena and Selene at a temporary shelter, organizing food and housing rotations.

POH ROLE:
She arranges a silent auction in 72 hours, raising funds for displaced families and volunteer firefighters.

CONFLICT:
Tension rises when celebrities arrive for photo-ops. Addie draws a hard line between charity and vanity.

RESOLUTION:
She becomes a respected figure among frontline volunteers, not the cameras.

WHO'S INVOLVED:
- Addie (leading)
- Elena (gala organization)
- Selene (The Herald - public face)
- Volunteer firefighters`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Selene']),
      themes: JSON.stringify(['POH', 'Recovery', 'West Coast', 'Wildfires', 'Celebrity Culture'])
    },
    {
      title: "Philippines Typhoon Recovery",
      category: "POH / International Recovery",
      description: "Addie leads POH/BSS team to Tacloban after devastating typhoon",
      content: `INTERNATIONAL RECOVERY - PHILIPPINES TYPHOON

THE MISSION:
Addie arrives in Tacloban with Hawk, Bella, and BSS logistics operators. They fly in on a chartered cargo jet loaded with water purification units and medical tents.

POH ROLE:
She coordinates distribution through Catholic parishes when local infrastructure collapses.

CONFLICT:
Rival NGOs accuse POH of being "shadowy." Addie walks into the storm-battered cathedral and publicly prays with the people, silencing doubts.

RESOLUTION:
BSS earns international credibility. Addie is remembered as the woman who brought light to a city with no power.

TIER ONE ASSETS:
BSS logistics operators and medics deployed under POH cover.

WHO'S INVOLVED:
- Addie (leading)
- Hawk (operations)
- Bella (The Hand - coordination)
- BSS Tier One assets
- Catholic parish network`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Bella']),
      themes: JSON.stringify(['POH', 'International Recovery', 'Philippines', 'Typhoon', 'Catholic Network'])
    },
    {
      title: "Haiti Earthquake Recovery",
      category: "POH / International Recovery",
      description: "POH/BSS delegation provides medical triage and protection after earthquake",
      content: `INTERNATIONAL RECOVERY - HAITI EARTHQUAKE AFTERMATH

THE MISSION:
Addie leads a small POH/BSS delegation, including Elena (for event fundraising logistics) and Harper (finance).

POH ROLE:
She directs medical triage in a ruined school, setting up tents with the Order of Malta.

CONFLICT:
Local gangs try to extort aid convoys. BSS security defuses the situation, while Addie personally calms terrified mothers.

RESOLUTION:
A photo (not staged, just captured) of Addie holding a Haitian child circulates among diplomats in DC, giving POH quiet leverage.

TIER ONE ASSETS:
BSS security team protects convoys and establishes perimeter.

WHO'S INVOLVED:
- Addie (leading medical triage)
- Elena (fundraising)
- Harper (The Guardian - finance)
- Order of Malta
- BSS security`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Harper']),
      themes: JSON.stringify(['POH', 'International Recovery', 'Haiti', 'Earthquake', 'Order of Malta'])
    },
    {
      title: "Ukraine War Relief Effort",
      category: "POH / International Recovery",
      description: "POH circle travels with humanitarian convoys into Lviv during conflict",
      content: `INTERNATIONAL RECOVERY - UKRAINE WAR RELIEF

THE MISSION:
Addie and her POH circle travel with humanitarian convoys into Lviv, joined by BSS cyber and logistics.

POH ROLE:
She arranges secure communications between aid workers and families separated by conflict.

CONFLICT:
Russian cyberattacks target relief groups. Addie authorizes BSS cyber analysts to counter the hacks.

RESOLUTION:
Aid moves smoothly, and word spreads of an "American lady commander" who knew how to outmaneuver chaos.

TIER ONE ASSETS:
BSS cyber operators counter Russian attacks. Logistics team secures supply lines.

WHO'S INVOLVED:
- Addie (leading)
- Bella (coordination)
- Kendra (The Warden - security)
- BSS cyber and logistics teams`,
      characters: JSON.stringify(['Addie', 'Bella', 'Kendra']),
      themes: JSON.stringify(['POH', 'International Recovery', 'Ukraine', 'War Relief', 'Cyber Operations'])
    },
    {
      title: "Beirut Explosion Recovery",
      category: "POH / International Recovery",
      description: "Months after the port explosion, POH brings engineers and counselors",
      content: `INTERNATIONAL RECOVERY - LEBANON BEIRUT EXPLOSION

THE MISSION:
Months after the port explosion, Addie travels with Bella, Selene, and Kendra. They arrive with architectural engineers and trauma counselors.

POH ROLE:
She negotiates with church leaders and NGOs to rebuild a Catholic school.

CONFLICT:
Local politicians try to co-opt the funds. Addie demands direct oversight by parish nuns, refusing compromise.

RESOLUTION:
The rebuilt school is dedicated with a plaque honoring "those who came from abroad with no flag but faith."

WHO'S INVOLVED:
- Addie (leading negotiations)
- Bella (The Hand - coordination)
- Selene (The Herald - public relations)
- Kendra (The Warden - security)
- Parish nuns`,
      characters: JSON.stringify(['Addie', 'Bella', 'Selene', 'Kendra']),
      themes: JSON.stringify(['POH', 'International Recovery', 'Lebanon', 'Explosion', 'Catholic School'])
    },
    {
      title: "Kenya Drought & Famine Relief",
      category: "POH / International Recovery",
      description: "POH/BSS team travels to rural Kenya for drought relief",
      content: `INTERNATIONAL RECOVERY - KENYA DROUGHT & FAMINE

THE MISSION:
Addie brings the POH/BSS team into Nairobi, then travels by convoy to rural villages. Elena manages water purification equipment while Bella runs food distribution.

POH ROLE:
She ensures partnerships with Catholic Relief Services and local chiefs.

CONFLICT:
Skeptical villagers distrust foreign aid. Addie earns trust by carrying water on her head alongside women.

RESOLUTION:
The village grants her an honorary title, and the POH women leave with bonds that last for decades.

WHO'S INVOLVED:
- Addie (leading)
- Elena (water purification)
- Bella (food distribution)
- Catholic Relief Services
- Local village chiefs`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Bella']),
      themes: JSON.stringify(['POH', 'International Recovery', 'Kenya', 'Drought', 'Famine Relief'])
    },
    {
      title: "India Monsoon Flooding Relief",
      category: "POH / International Recovery",
      description: "POH/BSS leads relief effort in Kerala after devastating floods",
      content: `INTERNATIONAL RECOVERY - INDIA MONSOON FLOODING

THE MISSION:
Addie leads POH/BSS into Kerala after floods destroy thousands of homes.

POH ROLE:
She organizes temporary housing and supply drops by helicopter.

CONFLICT:
Bureaucracy stalls relief permits. Addie and Elena charm the regional governor over dinner, unlocking the gates for supply convoys.

RESOLUTION:
BSS establishes an emergency playbook for Asia, and Addie becomes a quiet legend among the Indian Christian minority.

WHO'S INVOLVED:
- Addie (leading)
- Elena (diplomacy)
- Harper (logistics)
- BSS helicopter assets
- Indian Christian communities`,
      characters: JSON.stringify(['Addie', 'Elena Barrett', 'Harper']),
      themes: JSON.stringify(['POH', 'International Recovery', 'India', 'Monsoon', 'Flooding'])
    },
    {
      title: "Turkey Earthquake Response",
      category: "POH / International Recovery",
      description: "A 7.9 earthquake devastates villages - POH leverages Order of Malta connections",
      content: `INTERNATIONAL RECOVERY - EARTHQUAKE IN TURKEY

A 7.9 earthquake devastates villages and cities.

THE MISSION:
Addie flies into Istanbul with medical supplies, escorted by BSS security.

POH ROLE:
She leverages Order of Malta connections to coordinate hospital tents.

CONFLICT:
Corrupt officials try to redirect aid. Addie bypasses them, working directly with parish priests and doctors.

RESOLUTION:
She leaves quietly, but the Vatican receives a letter of gratitude citing her by name.

WHO'S INVOLVED:
- Addie (leading)
- BSS security escort
- Order of Malta
- Local doctors and priests`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['POH', 'International Recovery', 'Turkey', 'Earthquake', 'Order of Malta'])
    }
  ];

  for (const storyline of recoveryStorylines) {
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

  // ============ POH REGIONAL STORYLINES ============
  console.log("\n--- Adding POH Regional Storylines ---\n");

  const regionalStorylines = [
    {
      title: "POH Southeast: Silver Room Dedication",
      category: "POH / Regional",
      description: "Addie unveils the curated library and artifacts wing to the Southeast circle",
      content: `SOUTHEAST - THE SILVER ROOM DEDICATION

Addie unveils the curated library and artifacts wing to the Southeast circle.
Guests gift her rare manuscripts.
The Silver Room becomes the ceremonial heart of POH operations.

Elena serves as Marshal, cataloguing each gift and its significance.`,
      characters: JSON.stringify(['Addie', 'Elena Barrett']),
      themes: JSON.stringify(['POH', 'Southeast', 'Silver Room', 'Library'])
    },
    {
      title: "POH Southeast: Miami Gala Rescue",
      category: "POH / Regional",
      description: "Harper pulls off a last-minute miracle when a venue cancels",
      content: `SOUTHEAST - MIAMI GALA RESCUE

Harper pulls off a last-minute miracle saving a high-profile gala from collapsing when a venue cancels.
POH reputation for crisis management solidified.
The Guardian of the Ledger proves her worth under pressure.`,
      characters: JSON.stringify(['Harper']),
      themes: JSON.stringify(['POH', 'Southeast', 'Miami', 'Gala', 'Crisis Management'])
    },
    {
      title: "POH Southeast: Camp Legacy",
      category: "POH / Regional",
      description: "Bella and Matt host the first Camp Legacy",
      content: `SOUTHEAST - SUMMER CAMP LEGACY

Bella and Matt host the first Camp Legacy at the compound.
Blending family, training, and tradition.
The next generation of BSS and POH families bond together.

This becomes an annual tradition, cementing the extended family structure.`,
      characters: JSON.stringify(['Bella', 'Matt']),
      themes: JSON.stringify(['POH', 'Southeast', 'Camp', 'Family', 'Tradition'])
    },
    {
      title: "POH Northeast: Embassy Dinner",
      category: "POH / Regional",
      description: "Addie represents POH at a Vatican Embassy dinner",
      content: `NORTHEAST - THE EMBASSY DINNER

Addie represents POH at a Vatican Embassy dinner.
Networking future ambassadors.
Building diplomatic channels for Catholic humanitarian work.

Selene accompanies as the Herald, managing introductions and whispers.`,
      characters: JSON.stringify(['Addie', 'Selene']),
      themes: JSON.stringify(['POH', 'Northeast', 'Vatican', 'Diplomacy'])
    },
    {
      title: "POH Northeast: Wall Street Intervention",
      category: "POH / Regional",
      description: "Harper and Jasper save a financial partner during market crash",
      content: `NORTHEAST - WALL STREET INTERVENTION

Harper and Jasper step in to save a financial partner teetering during a market crash.
The Guardian of the Ledger tracks every favor owed.
This intervention creates lasting obligations in the financial sector.`,
      characters: JSON.stringify(['Harper', 'Jasper Barrett']),
      themes: JSON.stringify(['POH', 'Northeast', 'Wall Street', 'Finance', 'Market Crash'])
    },
    {
      title: "POH Northeast: Georgetown Gala",
      category: "POH / Regional",
      description: "Elena stages a Catholic Order gala in DC",
      content: `NORTHEAST - GEORGETOWN GALA

Elena stages a Catholic Order gala in DC.
Introducing POH's presence to old-money powerhouses.
The Marshal of the Silver Room shows her ceremonial planning expertise.

EOHSJ and Order of Malta dignitaries attend.`,
      characters: JSON.stringify(['Elena Barrett']),
      themes: JSON.stringify(['POH', 'Northeast', 'Georgetown', 'Gala', 'Catholic Orders'])
    },
    {
      title: "POH West: Hollywood Weekend",
      category: "POH / Regional",
      description: "Elena runs a gala for stars while Bella and Kendra handle crisis",
      content: `WEST - HOLLYWOOD WEEKEND

Elena runs a gala for stars.
Bella and Kendra handle crisis when paparazzi expose too much.
The Warden of the Gates proves her security expertise.

POH learns to navigate celebrity culture while maintaining discretion.`,
      characters: JSON.stringify(['Elena Barrett', 'Bella', 'Kendra']),
      themes: JSON.stringify(['POH', 'West Coast', 'Hollywood', 'Celebrity', 'Crisis Management'])
    },
    {
      title: "POH West: Denver Ranch Talks",
      category: "POH / Regional",
      description: "Mandy hosts Addie and Bella at her mountain ranch",
      content: `WEST - DENVER RANCH TALKS

Mandy hosts Addie and Bella at her mountain ranch.
Planting seeds of future alliances.
The Keeper of the Seal negotiates on Addie's behalf.

Family time combined with strategic planning.`,
      characters: JSON.stringify(['Mandy', 'Addie', 'Bella']),
      themes: JSON.stringify(['POH', 'West', 'Denver', 'Ranch', 'Alliance Building'])
    },
    {
      title: "POH International: London Launch",
      category: "POH / Regional",
      description: "Jasper expands BSS Europe with POH gala",
      content: `INTERNATIONAL - LONDON LAUNCH

Jasper expands BSS Europe.
Elena organizes the launch gala with MI6 whispers in the background.
POH establishes European presence through Sapientia Minervae connections.`,
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      themes: JSON.stringify(['POH', 'International', 'London', 'BSS Europe', 'Intelligence'])
    },
    {
      title: "POH International: Rome Pilgrimage",
      category: "POH / Regional",
      description: "Addie and Hawk lead members to the Vatican",
      content: `INTERNATIONAL - ROME PILGRIMAGE

Addie and Hawk lead members to the Vatican.
Securing papal blessing for POH's charitable work.
The spiritual dimension of POH formalized through Vatican recognition.`,
      characters: JSON.stringify(['Addie', 'Hawk']),
      themes: JSON.stringify(['POH', 'International', 'Rome', 'Vatican', 'Papal Blessing'])
    },
    {
      title: "POH International: Jerusalem Vigil",
      category: "POH / Regional",
      description: "The POH circle participates in a Holy Sepulchre vigil",
      content: `INTERNATIONAL - JERUSALEM VIGIL

The POH circle participates in a Holy Sepulchre vigil.
Strengthening ties with sacred orders.
EOHSJ connections deepened through shared prayer and pilgrimage.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Elena Barrett']),
      themes: JSON.stringify(['POH', 'International', 'Jerusalem', 'Holy Sepulchre', 'EOHSJ'])
    }
  ];

  for (const storyline of regionalStorylines) {
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

  // ============ UPDATE ADDIE WITH POH ROLE ============
  console.log("\n--- Updating Addie as Patroness of Honor ---\n");

  const addie = await prisma.character.findFirst({
    where: { projectId: project.id, name: { contains: 'Addie' } }
  });

  if (addie) {
    const pohAddition = `

═══════════════════════════════════════════════════════════
PALACE OF HONOR (POH) - PATRONESS OF HONOR
═══════════════════════════════════════════════════════════

TITLE: Patroness of Honor (POH)
- Title not announced but earned through action
- Natural center of gravity for BSS, Orders, and families
- Bridges strategy, hospitality, and connection

POH ASSISTANT COUNCIL (Unofficial but Everyone Knows):
- The Hand of the POH - Bella (silver quill pin)
- The Marshal of the Silver Room - Elena (key-shaped brooch)
- The Guardian of the Ledger - Harper (silver bracelet with scales)
- The Warden of the Gates - Kendra (steel signet ring)
- The Herald of the Flame - Selene (flame pendant)
- The Mistress of the Table - Sara (silver goblet charm)
- The Keeper of the Seal - Mandy (wax-seal emblem necklace)

HOW IT WORKS:
- No oaths, no ceremony - positions used in practice
- Titles slip into conversation with humor and respect
- "Talk to the Hand first" or "Only the Keeper can deliver that"
- Never written, never public, but universally understood

BATTLE RHYTHM (40 Cases/Month + POH):
- ~40 BSS cases per month (1-2 per day)
- Evening POH events, ceremonies, strategic meetings
- 1 recovery week per month (CLT, TX, or Denver)
- Daily: Selene and Bella accompany
- Weekends: Hawk always present
- Major events: Full POH team`;

    await prisma.character.update({
      where: { id: addie.id },
      data: {
        bssRole: addie.bssRole ? `${addie.bssRole} | Patroness of Honor (POH)` : 'Patroness of Honor (POH)',
        background: addie.background ? `${addie.background}${pohAddition}` : pohAddition
      }
    });
    console.log("Updated: Addie with full POH Patroness role");
  }

  // ============ SUMMARY ============
  const charCount = await prisma.character.count({ where: { projectId: project.id } });
  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });
  const orgCount = await prisma.organization.count({ where: { projectId: project.id } });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Storylines: ${storyCount}`);
  console.log(`Organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
