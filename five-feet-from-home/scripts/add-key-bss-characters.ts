import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding Key BSS Characters (Callsigns) ===\n");

  const characters = [
    {
      name: 'Hawk',
      archetype: 'The Operator',
      bssRole: 'Head of Operators / Tier 1',
      background: `Callsign: "Hawk" (real name not commonly used)

Head of Operators at BSS. Tier 1 Special Operations background. Sets standards, leads high-stakes deployments.

ROLE:
• Oversees all regional operator teams
• Sets doctrine for operators
• Approves heavy moves
• Leads ground operations on critical cases
• Quietly called out Jasper: "You're building an empire but missing the kingdom at home."

OPERATOR PHILOSOPHY:
Blend first, observe second, fight last. Operators are thinking predators—not mercenaries.

KEY CASES:
• Africa Medical Personnel Rescue - Ground lead, all 12 hostages recovered alive
• Singapore Sovereign Wealth Scandal - Lead operator with Addie and Kendra
• Royal Family Security Incident - Early operator team`,
      relationships: JSON.stringify({
        spouse: 'Addie',
        reports_to: ['Jasper Barrett', 'Harper'],
        close_to: ['Chris', 'Kendra', 'Matt']
      })
    },
    {
      name: 'Addie',
      archetype: 'The Fixer',
      bssRole: 'Senior Fixer / POH Patroness',
      background: `Started as rough but sharp assistant, evolved into a force of her own. Now a legendary fixer and POH Patroness.

JOURNEY:
• Began as Jasper's assistant during CLT founding
• Rose through ranks to Senior Fixer
• Now leads complex operations independently
• POH Patroness - head of Palace of Honor wives organization

ROLE:
• High-level troubleshooter
• Keeps Jasper and Elena honest
• Built office at compound with Kendra and Bella
• Takes front-facing responsibility so Jasper can focus on family

KEY CASES:
• Healthcare Ransomware Attack - Client liaison
• Africa Medical Personnel Rescue - Coordination
• DC Lobbying Scandal - Media containment and coordination
• Hollywood Studio CEO Scandal - Client communications
• Singapore Sovereign Wealth - Lead operator with Hawk`,
      relationships: JSON.stringify({
        spouse: 'Hawk',
        close_to: ['Elena Barrett', 'Kendra', 'Bella', 'Selene'],
        role: 'Bridge between BSS and POH worlds'
      })
    },
    {
      name: 'Kendra',
      archetype: 'The Analyst',
      bssRole: 'Senior Analyst / Operator',
      background: `Senior Analyst and Operator at BSS. Intelligence analysis combined with field operations capability.

ROLE:
• Intelligence analysis and red-team thinking
• Field operations when needed
• Balance advisor to Elena on motherhood/CEO life
• Guides Elena's re-entry into CEO role

PERSONAL:
• Mother herself - brings baby hacks and balance wisdom
• Told Elena: "You don't have to choose between CEO and mom. You just need to build your flank."

KEY CASES:
• Africa Medical Personnel Rescue - Intelligence analysis
• Singapore Sovereign Wealth Scandal - Analytical support`,
      relationships: JSON.stringify({
        spouse: 'Chris',
        close_to: ['Addie', 'Bella', 'Elena Barrett'],
        children: ['Baby (recent)']
      })
    },
    {
      name: 'Bella',
      archetype: 'The Hand',
      bssRole: 'POH - The Hand / Executive Assistant',
      background: `Addie's closest confidante and executive assistant. Also works with Elena at Maision Aurelia.

ROLE:
• POH - "The Hand" to Addie
• Executive assistant and coordinator
• Works with Elena on events
• The kids' "fun aunt" - gives Jasper and Elena breathing space

PERSONAL:
• Horseback rides, ice cream trips, secret late-night movies with kids
• Before Matt, was shy and reserved - Mandy helped her come out of her shell
• Now confident, warm, sensual`,
      relationships: JSON.stringify({
        spouse: 'Matt',
        close_to: ['Addie', 'Mandy', 'Elena Barrett', 'Kendra'],
        past: ['Mandy (awakening relationship)']
      })
    },
    {
      name: 'Selene',
      archetype: 'The Wild Card',
      bssRole: 'Undercover Specialist',
      background: `Callsign energy - the wild card. Thrives in chaos. Undercover specialist.

ROLE:
• Undercover operations
• Pushes boundaries others won't
• The one who can surprise even Addie

PERSONAL:
• In a throuple relationship (wife + third partner)
• Not a kids person - Grace says "Selene's boring. She doesn't play."
• Fire where others are steady

RELATIONSHIP WITH ADDIE:
Electric, unpredictable connection. Selene is chaos, Addie is control. Their connection is never planned.`,
      relationships: JSON.stringify({
        spouse: 'Wife',
        throuple_partner: 'Third partner',
        close_to: ['Addie', 'Hawk']
      })
    },
    {
      name: 'Grace',
      archetype: 'The Daughter',
      bssRole: null,
      background: `Jasper and Elena's daughter. The emotional heart of the family storylines.

PERSONALITY:
• Adores Addie, Kendra, and Bella ("You're the best")
• Does NOT like Selene ("Selene's boring. She doesn't play.")
• Organizes Christmas plays in the barn

KEY MOMENT:
At Christmas barn play, Grace announces about Jasper's seat: "That seat is never empty anymore." A line she practiced - showing how much his presence means.`,
      relationships: JSON.stringify({
        parents: ['Jasper Barrett', 'Elena Barrett'],
        aunties: ['Addie', 'Kendra', 'Bella', 'Sara'],
        not_fond_of: ['Selene']
      })
    },
    {
      name: 'Sara',
      archetype: 'The Sister',
      bssRole: null,
      background: `Elena's younger sister. The family anchor who steps in when both parents are pulled away.

ROLE:
• Manages kids when Jasper and Elena are both traveling
• Easy laugh, teases Jasper for missed curfews
• "You can run empires, Jasp, but can't run bath time?"

SUPPORT:
• Shuttles kids to sports
• Bakes cookies at midnight
• Fills the gap seamlessly`,
      relationships: JSON.stringify({
        sister: 'Elena Barrett',
        brother_in_law: 'Jasper Barrett',
        close_to: ['Addie', 'Kendra', 'Bella']
      })
    },
    {
      name: 'Chris',
      archetype: 'The Steady One',
      bssRole: 'Operator',
      background: `Operator at BSS. Kendra's spouse. Thoughtful and steady.

Part of the inner circle through his marriage to Kendra and his work at BSS.`,
      relationships: JSON.stringify({
        spouse: 'Kendra',
        close_to: ['Hawk', 'Matt']
      })
    },
    {
      name: 'Matt',
      archetype: 'The Rock',
      bssRole: 'Operator',
      background: `Operator at BSS. Bella's spouse. Steady, reliable, protective without being controlling.

Saw past Bella's shyness immediately. Patient, gave her space. Their connection was instant when she came to him.`,
      relationships: JSON.stringify({
        spouse: 'Bella',
        close_to: ['Hawk', 'Chris']
      })
    }
  ];

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

  const count = await prisma.character.count({ where: { projectId: project.id } });
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
