import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== INGESTING BSS CONTENT FROM DOCUMENTS ===\n");

  // ========== CLT HQ STAFF CHARACTERS ==========
  console.log("--- Adding CLT HQ Staff Characters ---\n");

  const hqStaff = [
    {
      name: 'Maya Ruiz',
      firstName: 'Maya',
      lastName: 'Ruiz',
      archetype: 'The Oracle / Senior Watch Desk Anchor',
      background: `Cuban-American former NSA analyst who runs the Watch Desk at CLT HQ.

THE ORACLE:
Maya has a reputation for predicting issues before they surface - her uncanny way of correlating chatter, social media spikes, and field reports makes her indispensable.

She's the one Jasper and Cole trust most for "battle handoff" rituals at 6am/6pm. The ritual isn't just data - it's interpretation, and she can "read the tea leaves" like an oracle.

ORACLE STORYLINE:
Maya notices a pattern in operator stress levels (tracking sleep, comm logs, missed check-ins) and warns Jasper two weeks before one of the teams fractures. She becomes the quiet savior of morale and operational tempo.

PERSONAL:
- Divorced
- Secretly dating someone in Elena's event world`,
      bssRole: 'Senior Analyst / Watch Desk Anchor',
      hubLocation: 'Charlotte, NC - CLT HQ',
      relationships: `Jasper Barrett - Complete trust for battle handoffs
Cole Harrington - Trusts her oracle readings
Harper Vance - Works closely on HQ operations`,
      sourceFiles: 'CLT HQ staff storyline'
    },
    {
      name: 'Theo Harrington',
      firstName: 'Theo',
      lastName: 'Harrington',
      archetype: 'Genius Rookie / Reformed Overthinker',
      background: `Ivy League grad recruited as part of Jasper's "genius rookies" program - recruiting 2-3 people who don't fit anywhere else.

INITIAL STRUGGLE:
Theo kept blowing simple ops with overthinking. Maya and Harper run him through brutal mentorship program that feels like ancient oracle training - tests of instinct, rapid decision-making, and judgment under fire.

THE BREAKTHROUGH:
By the end of the year, Theo calls the right shot on a live case and finally earns his seat.

PERSONAL:
Lives in his parents' basement despite making more than most bankers.`,
      bssRole: 'Analyst / Oracle Apprentice',
      hubLocation: 'Charlotte, NC - CLT HQ',
      relationships: `Maya Ruiz - Mentor who trained him in oracle ways
Harper Vance - Ran his brutal mentorship program`,
      sourceFiles: 'CLT HQ staff storyline'
    },
    {
      name: 'Janine',
      firstName: 'Janine',
      lastName: 'Torres',
      archetype: 'Logistics Queen / Single Mom',
      background: `The logistics queen of CLT HQ. Single mom whose son thinks she just "works in an office."

FAMILY MOMENT:
When Janine's son accidentally wanders into the HQ lobby during an emergency, the entire floor covers for her, pretending it's a tour. The operators realize HQ literally treats each other as family the way the teams do in the field.`,
      bssRole: 'Head of Logistics',
      hubLocation: 'Charlotte, NC - CLT HQ',
      sourceFiles: 'CLT HQ staff storyline'
    }
  ];

  for (const char of hqStaff) {
    const existing = await prisma.character.findFirst({
      where: { firstName: char.firstName, lastName: char.lastName, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({ data: { projectId: project.id, ...char } });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({ where: { id: existing.id }, data: char });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ========== BSS STORYLINES ==========
  console.log("\n--- Creating BSS Storylines ---\n");

  const bssStorylines = [
    {
      title: 'The Oracle Desk (CLT HQ Watch Floor)',
      category: 'BSS Operations',
      description: 'The Watch Desk run by Maya Ruiz - the oracle of BSS',
      content: `THE ORACLE DESK

The Watch Desk is run by a rotating pair of analysts, but everyone knows the senior "Anchor" is Maya Ruiz, a Cuban-American former NSA analyst.

THE ORACLE REPUTATION:
Maya has a reputation for predicting issues before they surface - her uncanny way of correlating chatter, social media spikes, and field reports makes her indispensable.

BATTLE HANDOFF RITUALS:
She's the one Jasper and Cole trust most for "battle handoff" rituals at 6am/6pm. The ritual isn't just data - it's interpretation, and she can "read the tea leaves" like an oracle.

THE PREDICTION:
Maya notices a pattern in operator stress levels (tracking sleep, comm logs, missed check-ins) and warns Jasper two weeks before one of the teams fractures. She becomes the quiet savior of morale and operational tempo.`,
      characters: JSON.stringify(['Maya Ruiz', 'Jasper Barrett', 'Cole Harrington'])
    },
    {
      title: 'The Oracle Circle (Thursday Nights)',
      category: 'BSS Culture',
      description: 'Weekly late-night sessions where HQ staff analyze and predict crises',
      content: `THE ORACLE CIRCLE

On the 4th floor war room, every Thursday night the staff that runs HQ meets for what they call the Circle - pizza, wine, and the week's lessons learned.

THE PURPOSE:
These nights produce better fixes than any boardroom briefing. They gossip about operators, pick apart mistakes, and predict where the next three crises will come from. Almost always, one prediction is dead right.

THE REVELATION:
Selene sneaks into a Circle night and realizes HQ staff know more about Addie's future risks than Addie herself. She confronts Hawk about how much HQ manipulates the flow of information.`,
      characters: JSON.stringify(['Maya Ruiz', 'Theo Harrington', 'Selene Thorne', 'Hawk'])
    },
    {
      title: 'The Phantom Adjustments',
      category: 'BSS Operations',
      description: 'HQ makes covert adjustments to protect operators without telling them',
      content: `THE PHANTOM ADJUSTMENTS

HQ sometimes makes covert adjustments to protect operators without telling them - rerouting payments, shifting logistics, even calling in favors under aliases.

THE DISCOVERY:
A field team discovers that "luck" on an op was actually HQ quietly:
- Hacking the casino cameras
- Laundering bribes through shell accounts
- Moving hotel security staff around

THE CONFLICT:
The operators feel betrayed - are they really that good, or are they just HQ's puppets?

THE RESOLUTION:
They realize it's partnership, not manipulation. HQ keeps them alive; operators execute the mission. Both are essential.`,
      characters: JSON.stringify(['Maya Ruiz', 'Harper Vance', 'Ridge'])
    },
    {
      title: 'Inter-Floor Rivalries (Cyber vs Logistics)',
      category: 'BSS Culture',
      description: 'The ongoing friendly rivalry between Cyber Floor and Logistics Floor',
      content: `INTER-FLOOR RIVALRIES

Cyber Floor vs. Logistics Floor: The cyber team thinks they're the real brain trust, while logistics thinks they keep everyone alive. The bickering often spills into staff meetings.

THE ARBITRATION:
Elena mediates this with a "courtroom-style" arbitration in one story: each floor has to argue why they saved an op more recently.

THE RESULT:
Both discover they were right - and both had missed the bigger piece that only the analysts caught. It reinforces that BSS works as a whole, not as competing factions.`,
      characters: JSON.stringify(['Elena Barrett', 'Janine Torres'])
    },
    {
      title: 'BSS Early Growth: From 2 Clients to Global',
      category: 'BSS History',
      description: 'How BSS grew from Jasper and Harper with two clients to a global think tank',
      content: `BSS EARLY GROWTH

YEAR 0-1: THE SPARK (Foundation Stage)
Jasper and Harper notice a gap: high-net-worth individuals, corporations, and governments need discrete crisis response beyond traditional security firms.

FIRST TWO CLIENTS:
1. Private Equity Fund - needed discreet asset recovery in Eastern Europe
2. Middle Eastern Royal Household - required confidential advisory for family security incident

OPERATION:
Operates from Jasper's townhouse garage with Harper running operations from a laptop.

CORE VALUES ESTABLISHED:
- Loyalty, Brotherhood/Sisterhood, Elite Competence
- Service before Self, Protection of Innocents
- Internal motto: "Protectors, not mercenaries"

YEAR 2-3: EXPANSION OF TRUST
- Word-of-mouth growth through whisper networks
- First major test: multinational corporation ransomware attack
- Harper recruits logistics and cyber specialists
- Jasper brings in trusted operators from military networks
- Addie enters through high-level philanthropic partnership

YEAR 3-5: DIVERSIFICATION
Service Lines:
- Crisis Response: Hostage rescue, secure extractions
- Strategic Consulting: Advising on risk and geopolitics
- Protective Security: VIP and family protection
- Information Advantage: Analyst Cell / "Watch Desk"

Notable Operations:
- Recovery of kidnapped medical personnel in Africa
- Advising NATO ally on space-based communication resilience
- Stopping large-scale cyber attack on U.S. hospital system

YEAR 5-8: GLOBAL FOOTPRINT
Regional Expansions:
- East Coast Division: Harper to Miami for Caribbean/Latin America
- London Office: European and Vatican-related operations
- Middle East Presence: From early royal family connections
- Asia Office: Cyber and maritime security

Client Base:
From 2 clients to dozens of Fortune 500 companies, international NGOs, and government contracts.

"The group you call when you can't call anyone else."`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper Vance', 'Addison "Addie"'])
    },
    {
      title: 'BSS Failures',
      category: 'BSS History',
      description: 'The operations that went wrong and what BSS learned from them',
      content: `BSS FAILURES

Not every operation succeeds. BSS's reputation was built not just on wins, but on how they handled failures.

THE LESSONS:
- Every failure is analyzed in the Oracle Circle
- No one is blamed publicly; everyone learns privately
- Failures are never hidden from leadership
- Recovery plans are always pre-drafted by Harper

THE IMPACT:
Failures humanize the team. They remind operators that HQ isn't infallible. They teach humility alongside competence.`,
      characters: JSON.stringify(['Jasper Barrett', 'Harper Vance', 'Maya Ruiz'])
    },
    {
      title: 'Addie 12-Month BSS & POH Timeline',
      category: 'Character Arc',
      description: 'Addie year-long operational outline combining BSS work and Palace of Honor duties',
      content: `ADDIE'S 12-MONTH BSS & PALACE OF HONOR TIMELINE

~40 cases/year, ~3-4 per month, 1 week/month recovery in CLT, TX, or Denver

MONTH 1 - EAST COAST LAUNCH
BSS (Day):
- Case 1 (NYC): Wall Street exec insider trading scandal
- Case 2 (D.C.): Defense contractor congressional inquiry
- Case 3 (Boston): Biotech CEO vs activist investor smear

POH (Evening):
- EOHSJ Mass and dinner in D.C.
- Drafts briefing for Order of Malta gala
Recovery: Denver with family

MONTH 2 - INTERNATIONAL CRISIS SWEEP
BSS:
- Cases 4-6 (London/Brussels): Premier League betting scandal, NATO cyber intrusion
POH: Sapientia Minervae salon in London with Elena
Recovery: CLT HQ strategy sessions

MONTH 3 - U.S. DOMESTIC SWEEP
BSS:
- Case 7 (Chicago): Hospital ransomware
- Case 8 (Atlanta): Fortune 500 CEO harassment accusation
- Case 9 (Miami): Cartel money laundering investigation
POH: Miami Archdiocese fundraiser, Charlotte compound dinner
Recovery: CLT

MONTH 4-12: Continues pattern...
- Mix of worldwide, U.S., and East Coast trips
- BSS day work, POH evening obligations
- Recovery weeks in CLT, TX (wedding prep), or Denver (family)
- Wedding happens around Month 7

TEMPO: 40 cases in 12 months with proper recovery and family time.`,
      characters: JSON.stringify(['Addison "Addie"', 'Elena Barrett', 'Hawk'])
    },
    {
      title: 'HQ Becomes a Target',
      category: 'BSS Crisis',
      description: 'When rivals realize HQ is the true brain of BSS and attack it directly',
      content: `HQ BECOMES A TARGET

Rivals and enemies realize HQ is the true brain of BSS, not the operators.

THE ATTACK:
A cyberattack penetrates three floors deep, threatening to shut down operations mid-case.

THE DEFENSE:
Harper, Maya, and Theo lock down the building with protocols that feel almost supernatural - like oracles casting protective wards.

THE BATTLE:
For once, HQ itself becomes the battlefield, with staff stepping up as heroes. The analysts and logistics teams prove they can fight when their sanctuary is threatened.

THE AFTERMATH:
New security protocols established. The attack proves HQ's importance to everyone, including operators who sometimes forgot.`,
      characters: JSON.stringify(['Harper Vance', 'Maya Ruiz', 'Theo Harrington'])
    }
  ];

  for (const storyline of bssStorylines) {
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

  // ========== UPDATE BSS ORGANIZATION ==========
  console.log("\n--- Updating BSS Organization ---\n");

  const bssOrg = await prisma.organization.findFirst({
    where: { name: { contains: 'Barrett Strategic Solutions' }, projectId: project.id }
  });

  if (bssOrg) {
    await prisma.organization.update({
      where: { id: bssOrg.id },
      data: {
        significance: `BSS - BARRETT STRATEGIC SOLUTIONS

LEADERSHIP STRUCTURE:
- Jasper Barrett: Founder/CEO, transitioned from field to office management
- Harper Vance: COO, Jasper's top field presence from Miami
- Addie: Senior Fixer, "fixer of last resort," mentors Daniel
- Daniel Cruz: #4 in company, groomed as trusted fixer
- Cole Harrington: Tier 1 operator, protection and tactical operations

CLT HQ STAFF:
- Maya Ruiz: The Oracle, Senior Watch Desk Anchor
- Theo Harrington: Genius Rookie turned competent analyst
- Janine Torres: Logistics Queen

THE ORACLE DESK:
Watch Desk run by Maya Ruiz - predicting issues before they surface, correlating chatter, social media spikes, and field reports. Battle handoff rituals at 6am/6pm.

THE ORACLE CIRCLE:
Thursday nights on 4th floor war room - pizza, wine, lessons learned. Predicts where next crises will come from.

PHANTOM ADJUSTMENTS:
HQ makes covert adjustments to protect operators - rerouting payments, shifting logistics, calling in favors under aliases.

GROWTH HISTORY:
Year 0-1: 2 clients, Jasper's garage
Year 2-3: Word-of-mouth growth, first major cyber response
Year 3-5: Diversified services, notable operations
Year 5-8: Global footprint (London, Miami, Middle East, Asia)
Year 8-10: Consolidation into global brand

CORE VALUES:
- Loyalty, Brotherhood/Sisterhood, Elite Competence
- Service before Self, Protection of Innocents
- "Protectors, not mercenaries"
- "The group you call when you can't call anyone else"`
      }
    });
    console.log('Updated: BSS organization with complete structure');
  }

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== BSS CONTENT INGEST COMPLETE ===`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
