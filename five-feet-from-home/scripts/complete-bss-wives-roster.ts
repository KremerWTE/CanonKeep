import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== COMPLETING BSS ROSTER & WIVES CLUB STRUCTURE ===\n");

  // ========== BSS SENTINEL TEAM ==========
  console.log("--- Adding BSS Sentinels (Watch Desk Team) ---\n");

  const sentinels = [
    {
      name: 'Daniel "Hawk-Eye" Mercer',
      firstName: 'Daniel',
      lastName: 'Mercer',
      nickname: 'Hawk-Eye',
      archetype: 'Senior Sentinel / Day Shift Lead',
      background: `Former Wall Street quantitative analyst who transitioned to pattern recognition and crisis monitoring. Known for never panicking even when ten crises break at once. Academic/data background gives him elite pattern recognition skills.

Married to Laura McKay who runs a Charlotte bookstore/café. She thinks Daniel runs an analytics-driven financial call desk.`,
      bssRole: 'Senior Sentinel - Day Shift Lead. Keeper of institutional memory, patterns & log precision.',
      hubLocation: 'Charlotte, NC - CLT HQ (The Forge)',
      sourceFiles: 'BSS Description.docx'
    },
    {
      name: 'Alexis "Lex" Chen',
      firstName: 'Alexis',
      lastName: 'Chen',
      nickname: 'Lex',
      archetype: 'Sentinel / Day Shift',
      background: `Warm, extroverted, balances Daniel's introverted analytical streak. Real-time triage specialist, escalation and pressure manager.`,
      bssRole: 'Sentinel - Day Shift. Real-time triage, escalation, pressure management.',
      hubLocation: 'Charlotte, NC - CLT HQ (The Forge)',
      sourceFiles: 'BSS Description.docx'
    },
    {
      name: 'Owen "Quiet" Talbot',
      firstName: 'Owen',
      lastName: 'Talbot',
      nickname: 'Quiet',
      archetype: 'Sentinel / Night Shift Lead',
      background: `Former game designer turned strategic analyst. Known for red-teaming scenarios on the fly to test Labs' resilience. Operators sometimes find him unnerving - like he's always gaming out how they will fail.`,
      bssRole: 'Sentinel - Night Shift Lead. Cyber integration, keeps ops picture clean for morning.',
      hubLocation: 'Charlotte, NC - CLT HQ (The Forge)',
      sourceFiles: 'BSS Description.docx'
    },
    {
      name: 'Priya "Radar" Ranganathan',
      firstName: 'Priya',
      lastName: 'Ranganathan',
      nickname: 'Radar',
      archetype: 'Sentinel / Night Shift',
      background: `Former overseas NGO coordinator who crossed paths with BSS operator working under cover. Harper recruited her recognizing her radar-like intuition. Global pulse-reader who tracks stress cycles across Labs, monitors operators' readiness, anticipates breakdowns before anyone reports them.`,
      bssRole: 'Sentinel - Night Shift. Monitors wellness, stress cycles across global team.',
      hubLocation: 'Charlotte, NC - CLT HQ (The Forge)',
      sourceFiles: 'BSS Description.docx'
    }
  ];

  for (const char of sentinels) {
    const existing = await prisma.character.findFirst({
      where: { firstName: char.firstName, lastName: char.lastName, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char, clubsAssociations: 'BSS, The Sentinels' }
      });
      console.log(`Created: ${char.name}`);
    } else {
      await prisma.character.update({ where: { id: existing.id }, data: char });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ========== JASPER'S IRON COUNCIL ==========
  console.log("\n--- Adding Jasper's Iron Council ---\n");

  const ironCouncil = [
    {
      name: 'Marcus "Max" Calderon',
      firstName: 'Marcus',
      lastName: 'Calderon',
      nickname: 'Max',
      archetype: 'Iron Council - Vision (Ed Mylett inspired)',
      modeledAfter: 'Ed Mylett',
      background: `Former college baseball player who parlayed insurance/finance hustle into billion-dollar wealth and coaching empire. 6'2", athletic build, tailored suits, salt-and-pepper hair.

Empathetic, charismatic, magnetic. Plays "wise older brother" role in Jasper's life. Met Jasper at private equity retreat. Serves as Jasper's mirror for vision - realigns him with purpose when he drifts.`,
      bssRole: 'External - Iron Council member. Connector who knows everyone in finance, sports, politics.',
      sourceFiles: 'Jasper bussdies creation.docx'
    },
    {
      name: 'Dominic "Dom" Arakelian',
      firstName: 'Dominic',
      lastName: 'Arakelian',
      nickname: 'Dom',
      archetype: 'Iron Council - Discipline (Bedros Keuilian inspired)',
      modeledAfter: 'Bedros Keuilian',
      background: `Armenian immigrant, Marine veteran, built life from nothing. 5'10", powerful build, shaved head, scar across left eyebrow. Prefers black t-shirts, jeans, combat boots.

Intense, blunt, commanding. Zero tolerance for excuses. Systems builder, ruthless operator. Serves as Jasper's hammer - reminds him to act and dominate when he hesitates.`,
      bssRole: 'External - Iron Council member. Enforcer/business architect hybrid.',
      sourceFiles: 'Jasper bussdies creation.docx'
    },
    {
      name: 'Ryan "Rex" Fraser',
      firstName: 'Ryan',
      lastName: 'Fraser',
      nickname: 'Rex',
      archetype: 'Iron Council - Grit (Andy Frisella inspired)',
      modeledAfter: 'Andy Frisella / 75 HARD',
      background: `Blue-collar Midwestern kid turned supplement/fitness mogul. 6'0", thick muscular frame, tattoos on both arms, rough beard, buzz-cut, intense blue eyes.

Loud, raw, unapologetic. Swears a lot. "Mental toughness above all" philosophy. Serves as Jasper's fire - forces him back into fight with brutal honesty.`,
      bssRole: 'External - Iron Council member. Motivator/discipline hammer.',
      sourceFiles: 'Jasper bussdies creation.docx'
    }
  ];

  for (const char of ironCouncil) {
    const existing = await prisma.character.findFirst({
      where: { firstName: char.firstName, lastName: char.lastName, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: { projectId: project.id, ...char, clubsAssociations: 'Iron Council' }
      });
      console.log(`Created: ${char.name}`);
    } else {
      console.log(`Exists: ${char.name}`);
    }
  }

  // ========== UPDATE BSS ORGANIZATION ==========
  console.log("\n--- Updating BSS Organization Structure ---\n");

  const bss = await prisma.organization.findFirst({
    where: { name: { contains: 'Barrett Strategic' }, projectId: project.id }
  });

  if (bss) {
    await prisma.organization.update({
      where: { id: bss.id },
      data: {
        significance: `BARRETT STRATEGIC SOLUTIONS (BSS)
"The group you call when you can't call anyone else"

EXECUTIVE TIER:
- Jasper Barrett: Founder/CEO
- Harper Vance: COO (Miami-based)
- Elena Barrett: Events & Gala Division
- Addie: Senior Fixer / Patroness of Honor
- Hawk: Tier 1 Operator

THE FORGE (CLT HQ):
1st Floor: Public Face / Reception
2nd-3rd Floors: Elena's Event & Gala Division
4th-5th Floors: The Crucible
  - The Sentinels Watch Desk (Hawk-Eye, Lex, Quiet, Radar)
  - CrossFit-style gym & training
  - Integration zone for operators/analysts
6th Floor: Cyber Division ("The Ghost Grid")
7th Floor: Analyst Wing ("The Watchtower")
8th Floor: Strategic Fixers ("The Hammer")
9th-10th Floors: Executive Suite & Secure Range

CORE DIVISIONS:
- Strategic Fixers ("The Hammer") - Elite troubleshooters
- Operator Command - Head & Deputy, all operators worldwide
- Cyber Division ("The Ghost Grid") - Offensive/defensive cyber
- Analyst Wing ("The Watchtower") - Intelligence, red-teaming
- Strategic Response Team (SRT) - HQ's mobile elite (Crucible Team)
- Mental Performance / Optimization Cell

THE SENTINELS (Watch Desk):
Day Shift: Daniel "Hawk-Eye" Mercer (Lead) + Alexis "Lex" Chen
Night Shift: Owen "Quiet" Talbot (Lead) + Priya "Radar" Ranganathan
Schedule: 12-hour shifts Mon-Fri, Hammer/Watchtower cover weekends

REGIONAL LABS:
Each has: Operators, Cyber, Analysts/Fixers, Logistics
- Miami Lab
- LA Lab (Echo Park)
- London Office
- Middle East Presence
- Asia Office

BSS OPERATOR PHILOSOPHY:
Operators ≠ Mercenaries. They're thinking predators.
Primary role: Human Terrain Team (HTT) intel gathering
Security if needed, but brains first, fists last.
Trained to: Blend/observe, map human terrain, support analysts/fixers

CULTURE:
- Everyone is an athlete, everyone's a fighter, everyone's sharp
- Weekly competitions: sparring, CrossFit WODs, ruck races
- Morning/evening training is ritual
- Analysts and fixers train physically too`,
        leadership: JSON.stringify([
          'Jasper Barrett (CEO)',
          'Harper Vance (COO)',
          'Elena Barrett (Events)',
          'Addie (Senior Fixer)',
          'Hawk (Head Operator)',
          'Cole Harrington (Tier 1 Operator)',
          'Ridge (Assistant Head Operators)',
          'Daniel Cruz (#4 Fixer)',
          'Maya Ruiz (Oracle/Watch Desk)'
        ])
      }
    });
    console.log("Updated: BSS with complete structure");
  }

  // ========== UPDATE WIVES CLUB / PALACE OF HONOR ==========
  console.log("\n--- Updating Wives Club / Palace of Honor ---\n");

  // Delete duplicate Wives Club entries
  await prisma.organization.deleteMany({
    where: { name: 'Wives Club', projectId: project.id }
  });

  const wivesClub = await prisma.organization.findFirst({
    where: { name: { contains: 'The Wives Club' }, projectId: project.id }
  });

  if (wivesClub) {
    await prisma.organization.update({
      where: { id: wivesClub.id },
      data: {
        name: 'The Wives Club / Protectresses of Honor',
        shortName: 'POH',
        type: 'Elite Social Order',
        industry: 'High Society / Catholic Philanthropy',
        significance: `THE WIVES CLUB / PROTECTRESSES OF HONOR (POH)
"The Patronesses" - Official Name: Protectresses of Honor

LEADERSHIP:
- Patroness of Honor (POH): Addie (unofficial but everyone defers to her)
- Inner Circle: Elena Barrett, Harper Vance, and core wives

STRUCTURE:
1. INNER CIRCLE (Core Wives)
   - The founders and key decision-makers
   - Direct connection to BSS leadership
   - Plan major galas and charity events

2. TRUSTED CIRCLE
   - Proven wives who've earned trust
   - Handle sensitive information
   - Support operations when needed

3. SOCIAL CIRCLE
   - Newer members, still being vetted
   - Participate in events and fundraising
   - May advance with time and trust

SECTIONS:
- Event Planning Committee (Elena leads)
- Charity & Philanthropy Wing
- Sports Wives Division (Anchor names from sports media)
- Faith & Order Connection (EOHSJ, Order of Malta ties)

TRADITIONS:
- Monthly gatherings at The Compound
- Quarterly galas for Catholic charities
- Annual retreat (Palm Beach or similar)
- Support network for families during deployments

CONNECTION TO BSS:
The Wives Club is the social cover and support network for BSS families. They maintain appearances, run philanthropic fronts, and provide emotional support during operations. Palace of Honor is the inner sanctum where real power resides.`
      }
    });
    console.log("Updated: Wives Club with POH structure");
  }

  // Delete duplicate POH
  await prisma.organization.deleteMany({
    where: { name: 'Palace of Honor (POH)', projectId: project.id }
  });
  await prisma.organization.deleteMany({
    where: { name: 'Protectresses of Honor (POH)', projectId: project.id }
  });

  // Delete duplicate Sirens
  await prisma.organization.deleteMany({
    where: { name: 'The Sirens', projectId: project.id }
  });

  // ========== ADD IRON COUNCIL ORGANIZATION ==========
  const existingIronCouncil = await prisma.organization.findFirst({
    where: { name: { contains: 'Iron Council' }, projectId: project.id }
  });

  if (!existingIronCouncil) {
    await prisma.organization.create({
      data: {
        projectId: project.id,
        name: "Jasper's Iron Council",
        shortName: 'Iron Council',
        type: 'Personal Advisory Circle',
        industry: 'Entrepreneurship / Performance',
        description: "Jasper's inner circle of friends who sharpen, challenge, and ground him. Not BSS operators, but entrepreneurial warriors.",
        founder: 'Jasper Barrett',
        leadership: JSON.stringify(['Marcus "Max" Calderon', 'Dominic "Dom" Arakelian', 'Ryan "Rex" Fraser']),
        significance: `JASPER'S IRON COUNCIL
"Iron sharpens iron" - Personal board of directors

MEMBERS:
1. Marcus "Max" Calderon (Ed Mylett inspired)
   - Vision / The Connector
   - Billion-dollar coaching empire
   - Faith-driven, empathetic leader

2. Dominic "Dom" Arakelian (Bedros Keuilian inspired)
   - Discipline / The Enforcer
   - Marine veteran, immigrant success story
   - Systems builder, no-BS approach

3. Ryan "Rex" Fraser (Andy Frisella inspired)
   - Grit / The Fire
   - Mental toughness advocate
   - Supplement/fitness empire

PURPOSE:
They fight, debate, and argue - but friction forges sharper edges.
When Jasper is isolated from BSS or drowning in chaos, this trio reminds him of the man behind the mission.`
      }
    });
    console.log("Created: Iron Council organization");
  }

  // Final counts
  const charCount = await prisma.character.count();
  const orgCount = await prisma.organization.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
