import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding Selene Scenes & BSS Conflicts ===\n");

  // ============ SELENE INTIMATE SCENES ============
  console.log("--- Adding Selene Intimate Scenes ---\n");

  const seleneStorylines = [
    {
      title: "Selene's Throuple - The Dynamic",
      category: "Intimate / Selene",
      description: "The unconventional three-person relationship at the heart of Selene's life",
      content: `SELENE'S THROUPLE - THE DYNAMIC

THE RELATIONSHIP:
Selene navigates a committed three-person relationship while working for BSS.
One partner from her old life, one she meets through work.

THE PARTNERS:
- Her wife: The anchor, the steady presence
- The third: Someone who completes what they both need

HOW IT WORKS:
The dynamic provides emotional anchor for dangerous work.
Their intimate life is complicated by secrets, schedules, and threat of exposure.
They've built something unconventional but real.

THE CHALLENGES:
- Balancing three schedules
- Keeping the relationship private from outsiders
- Managing jealousy and attention
- The strain of Selene's BSS work

WHAT THEY SHARE:
Intimacy that flows between all three.
Nights that belong to different configurations.
A bond stronger than traditional definitions.`,
      characters: JSON.stringify(['Selene']),
      themes: JSON.stringify(['Intimate', 'Throuple', 'Polyamory', 'Fun Time'])
    },
    {
      title: "Selene and Her Wife - The Foundation",
      category: "Intimate / Selene",
      description: "The core relationship between Selene and her wife",
      content: `SELENE AND HER WIFE - THE FOUNDATION

THE BEGINNING:
Before the throuple, there was them.
Two women who found each other in chaos and built something steady.

THEIR DYNAMIC:
Selene is fire. Her wife is earth.
Where Selene runs hot, her wife grounds her.
Their intimacy is passionate but also healing.

WHAT HER WIFE PROVIDES:
- The only person who can truly calm Selene down
- A safe space when the BSS work gets too dark
- The one who sees past Selene's walls

THEIR PRIVATE MOMENTS:
Long talks in bed after difficult missions.
The way her wife traces her scars without asking.
Morning rituals that anchor Selene's chaotic life.
Passionate reunions after time apart.

THE AGREEMENT:
When they opened the relationship, it was her wife's idea.
She saw what Selene needed and loved her enough to make room.`,
      characters: JSON.stringify(['Selene']),
      themes: JSON.stringify(['Intimate', 'Marriage', 'Wife', 'Fun Time'])
    },
    {
      title: "Selene's Throuple - Night Together",
      category: "Intimate / Selene",
      description: "An intimate night with all three partners",
      content: `SELENE'S THROUPLE - NIGHT TOGETHER

THE SETTING:
Their home. Safe space. All three present.
The rare nights when schedules align.

THE ENERGY:
Different from when it's two of them.
Three bodies, three desires, three rhythms finding harmony.
Who leads changes throughout the night.

THE DYNAMICS:
Sometimes Selene is in the middle - receiving from both.
Sometimes she watches while the other two connect.
Sometimes she takes charge of both.

WHAT MAKES IT WORK:
Communication. Trust. No jealousy, only compersion.
They've built this over time, through mistakes and growth.
Each knows their place while staying fluid.

THE AFTERMATH:
Three bodies tangled together.
Quiet breathing. Hands finding hands.
The peace of being fully known and accepted.`,
      characters: JSON.stringify(['Selene']),
      themes: JSON.stringify(['Intimate', 'Throuple', 'Three', 'Fun Time'])
    }
  ];

  for (const storyline of seleneStorylines) {
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

  // ============ BSS CONFLICTS/CASES ============
  console.log("\n--- Adding BSS Conflicts/Cases ---\n");

  const bssConflicts = [
    // CORPORATE CRISES
    {
      title: "BSS Case: Eastern European Asset Recovery",
      category: "BSS / Corporate Crisis",
      description: "BSS's first client case - private equity fund asset recovery",
      content: `EASTERN EUROPEAN ASSET RECOVERY

CLIENT: Private Equity Fund (First BSS Client)
CRISIS: Assets under threat in Eastern Europe

THE SITUATION:
A PE fund's investments being stripped by corrupt local officials.
Legal channels frozen. Local police bought off.
Fund stands to lose $200M+.

BSS RESPONSE:
- Jasper personally led the case
- Harper coordinated logistics from CLT
- Operators embedded as "consultants"
- Cyber team traced money flows

RESOLUTION:
Assets recovered through combination of pressure, leverage, and quiet negotiation.
No shots fired. No headlines.
Client's reputation and capital preserved.

WHO WORKED IT: Jasper, Harper, early operator team`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Corporate', 'Asset Recovery'])
    },
    {
      title: "BSS Case: Royal Family Security Incident",
      category: "BSS / VIP Protection",
      description: "BSS's second client - Middle Eastern royal family protection",
      content: `ROYAL FAMILY SECURITY INCIDENT

CLIENT: Middle Eastern Royal Household (Second BSS Client)
CRISIS: Family security incident requiring discrete response

THE SITUATION:
A member of the royal family in danger.
Local security compromised. Trust broken.
Needed outside team with no political ties.

BSS RESPONSE:
- Tier 1 operators deployed
- 24/7 protection detail established
- Threat actors identified and neutralized
- Family extracted to safe location

RESOLUTION:
Royal family member safely protected.
Threat eliminated without international incident.
BSS earned lifetime trust of the household.

WHO WORKED IT: Early operator team, Jasper on-site`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Crisis', 'VIP', 'Royal Family'])
    },
    {
      title: "BSS Case: Healthcare Ransomware Attack",
      category: "BSS / Cyber Crisis",
      description: "Multinational healthcare system crippled by state-sponsored attack",
      content: `HEALTHCARE RANSOMWARE ATTACK

CLIENT: Multinational Healthcare Corporation
CRISIS: Hostile-state cyberattack crippling hospital systems

THE SITUATION:
Ransomware shut down hospital networks across multiple countries.
Patient data at risk. Lives literally on the line.
Attackers demanding $50M in crypto.

BSS RESPONSE:
- Harper built cyber unit overnight
- Ghost Grid team engaged
- Negotiators deployed while tech team worked
- Operators provided physical security for key systems

RESOLUTION:
Systems recovered without paying ransom.
Attackers traced and exposed to relevant governments.
Client infrastructure hardened for future attacks.

WHO WORKED IT: Harper (lead), Ghost Grid cyber team, Addie (client liaison)`,
      characters: JSON.stringify(['Harper', 'Addie']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Cyber', 'Healthcare'])
    },
    {
      title: "BSS Case: Africa Medical Personnel Rescue",
      category: "BSS / Extraction",
      description: "High-profile rescue of kidnapped medical volunteers",
      content: `AFRICA MEDICAL PERSONNEL RESCUE

CLIENT: International Medical NGO
CRISIS: Medical volunteers kidnapped by militant group

THE SITUATION:
12 medical personnel held hostage in remote region.
Local government unable or unwilling to act.
Ransom demands escalating.

BSS RESPONSE:
- Hawk led operator team on the ground
- Addie coordinated with NGO leadership
- Kendra ran intelligence analysis
- Operators embedded for weeks gathering intel

RESOLUTION:
All 12 hostages recovered alive.
Zero BSS casualties.
Militant network disrupted.

WHO WORKED IT: Hawk (ground lead), Addie, Kendra, operator team`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Kendra']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Extraction', 'Hostage'])
    },
    {
      title: "BSS Case: Wall Street Hostile Takeover",
      category: "BSS / Corporate Crisis",
      description: "Defending a Fortune 100 company from hostile acquisition",
      content: `WALL STREET HOSTILE TAKEOVER

CLIENT: Fortune 100 Corporation
CRISIS: Hostile takeover attempt by activist investors

THE SITUATION:
Activist hedge fund accumulating shares secretly.
Board members being targeted for pressure.
CEO facing coordinated media attacks.

BSS RESPONSE:
- NY Lab team activated
- Caroline (Alloy Network - NYU professor) provided market intel
- Cyber team uncovered coordination between attackers
- Jasper personally advised the CEO

RESOLUTION:
Hostile takeover blocked.
Activist fund exposed for market manipulation.
CEO position secured.

WHO WORKED IT: NY Lab, Jasper, Caroline (informant), cyber team`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Corporate', 'Wall Street'])
    },
    {
      title: "BSS Case: DC Lobbying Scandal",
      category: "BSS / Political Crisis",
      description: "Containing a lobbying scandal threatening a senator",
      content: `DC LOBBYING SCANDAL

CLIENT: Sitting U.S. Senator
CRISIS: Foreign lobbying scandal about to break

THE SITUATION:
Evidence of improper foreign payments surfacing.
Opposition research team feeding media.
Senator facing career destruction.

BSS RESPONSE:
- DC Lab team led response
- Addie coordinated media containment
- Analysts traced source of leaked documents
- Countermeasures deployed against opposition

RESOLUTION:
Story reframed - senator positioned as target of foreign influence, not perpetrator.
Original accusers discredited.
Senator's career saved.

WHO WORKED IT: DC Lab, Addie, analyst team`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Political', 'Scandal'])
    },
    {
      title: "BSS Case: London Banking Crisis",
      category: "BSS / Financial Crisis",
      description: "European bank scandal involving Vatican-adjacent parties",
      content: `LONDON BANKING CRISIS

CLIENT: Major European Bank
CRISIS: Scandal mixing bank operations with Vatican-adjacent entities

THE SITUATION:
Bank entangled with suspicious Vatican-linked transactions.
Regulatory investigation imminent.
Reputational and criminal exposure.

BSS RESPONSE:
- London Lab activated
- Harper coordinated with European contacts
- Elena provided society-level introductions
- Jasper negotiated with Vatican representatives

RESOLUTION:
Bank separated from problematic entities cleanly.
Regulatory issues resolved through proper channels.
BSS earned credibility across Europe.

WHO WORKED IT: London Lab, Harper, Elena, Jasper`,
      characters: JSON.stringify(['Harper', 'Elena Barrett', 'Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Banking', 'Vatican'])
    },
    {
      title: "BSS Case: Hollywood Studio CEO Scandal",
      category: "BSS / Media Crisis",
      description: "Managing crisis involving studio head, hedge fund, and cartel financing",
      content: `HOLLYWOOD STUDIO CEO SCANDAL

CLIENT: Major Film Studio
CRISIS: CEO exposed for ties to hedge fund and cartel-backed financing

THE SITUATION:
Studio CEO had taken money from cartel-connected investors.
Evidence about to surface.
Studio's entire slate at risk.

BSS RESPONSE:
- LA Lab led the response
- Cyber team contained digital evidence
- Operators handled physical security
- Addie managed client communications

RESOLUTION:
CEO quietly removed.
Studio's reputation protected.
Cartel connections severed without violence.

WHO WORKED IT: LA Lab, Addie, cyber team, operators`,
      characters: JSON.stringify(['Addie']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Hollywood', 'Cartel'])
    },
    {
      title: "BSS Case: NATO Space Communications",
      category: "BSS / Government",
      description: "Advising NATO ally on space-based communication resilience",
      content: `NATO SPACE COMMUNICATIONS

CLIENT: NATO Allied Nation
CRISIS: Vulnerabilities in space-based military communications

THE SITUATION:
Hostile state demonstrating ability to disrupt satellite communications.
Allied military networks potentially compromised.
Urgent need for resilience planning.

BSS RESPONSE:
- Strategic Studies Division engaged
- White papers produced on space warfare theory
- Recommendations provided for hardening systems
- Training delivered to allied personnel

RESOLUTION:
Communications networks strengthened.
New protocols implemented.
BSS reputation in government circles enhanced.

WHO WORKED IT: Strategic Studies Division, Jasper (advisory)`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Government', 'NATO', 'Space'])
    },
    {
      title: "BSS Case: U.S. Hospital System Cyber Defense",
      category: "BSS / Cyber Crisis",
      description: "Quietly thwarting massive attack on American hospitals",
      content: `U.S. HOSPITAL SYSTEM CYBER DEFENSE

CLIENT: Major U.S. Hospital Network
CRISIS: State-sponsored attack targeting patient systems

THE SITUATION:
Coordinated attack attempting to compromise hospital networks nationwide.
Lives at stake if systems went down.
Federal agencies too slow to respond.

BSS RESPONSE:
- Ghost Grid (cyber division) took lead
- Harper coordinated defense
- 24/7 operations until threat contained
- Attack traced to hostile state actors

RESOLUTION:
Attack thwarted before systems compromised.
Never publicized - kept quiet at government request.
Whispered about in Pentagon corridors.

WHO WORKED IT: Ghost Grid, Harper, Jasper (liaison with feds)`,
      characters: JSON.stringify(['Harper', 'Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Cyber', 'Healthcare'])
    },
    {
      title: "BSS Case: Singapore Sovereign Wealth Scandal",
      category: "BSS / Financial Crisis",
      description: "Scandal involving sovereign wealth, shipping, and cyber theft",
      content: `SINGAPORE SOVEREIGN WEALTH SCANDAL

CLIENT: Regional Sovereign Wealth Fund
CRISIS: Mixing of sovereign funds, shipping lanes, and cyber theft

THE SITUATION:
Fund compromised by cyber intrusion.
Billions in transactions potentially manipulated.
Diplomatic implications enormous.

BSS RESPONSE:
- Asia Lab led response
- Hawk and Addie deployed as lead operators
- Cyber team traced intrusions
- Kendra provided analytical support

RESOLUTION:
Intrusions identified and contained.
Manipulated transactions reversed.
Responsible parties quietly dealt with.

WHO WORKED IT: Asia Lab, Hawk, Addie, Kendra, cyber team`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Kendra']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Asia', 'Sovereign Wealth'])
    },
    {
      title: "BSS Case: Dubai Energy Negotiations",
      category: "BSS / Geopolitical",
      description: "High-stakes energy deal requiring discrete intervention",
      content: `DUBAI ENERGY NEGOTIATIONS

CLIENT: Multinational Energy Consortium
CRISIS: Critical deal collapsing due to tribal/political interference

THE SITUATION:
$10B energy deal at risk.
Local factions playing consortium members against each other.
Violence threatened if deal proceeded wrong way.

BSS RESPONSE:
- Middle East Lab activated
- Jasper personally negotiated
- Operators provided security for executives
- Cultural advisors ensured proper protocols

RESOLUTION:
Deal restructured to satisfy all parties.
No violence. No broken relationships.
BSS became preferred advisor in the region.

WHO WORKED IT: Middle East Lab, Jasper, operator team`,
      characters: JSON.stringify(['Jasper Barrett']),
      themes: JSON.stringify(['BSS', 'Crisis', 'Middle East', 'Energy'])
    }
  ];

  for (const conflict of bssConflicts) {
    const existing = await prisma.storyline.findFirst({
      where: { title: conflict.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...conflict }
      });
      console.log(`Created: ${conflict.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: conflict
      });
      console.log(`Updated: ${conflict.title}`);
    }
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
