import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Fixing Character Nicknames/Callsigns ===\n");

  // Characters with callsigns/nicknames (not last names)
  const callsignUpdates = [
    {
      name: 'Hawk',
      update: {
        archetype: 'The Operator',
        bssRole: 'Head of Operators / Tier 1',
        background: `Callsign: "Hawk"
Real name not commonly used - everyone calls him Hawk.

Head of Operators at BSS. Tier 1 background (Special Operations). Sets standards, leads high-stakes deployments.

ROLE:
• Oversees all regional operator teams
• Sets doctrine for operators
• Approves heavy moves
• Leads ground operations on critical cases

PHILOSOPHY: Operators are thinking predators - blend first, observe second, fight last.

KEY CASES:
• Africa Medical Personnel Rescue - Ground lead
• Singapore Sovereign Wealth Scandal - Lead operator with Addie`,
        relationships: JSON.stringify({
          spouse: 'Addie',
          reports_to: ['Jasper Barrett', 'Harper'],
          mentors: ['Younger operators']
        })
      }
    },
    {
      name: 'Max',
      update: {
        background: `Callsign: "Max" (Marcus Calderon)
Full name: Marcus "Max" Calderon

Foundry member - part of Jasper's Iron Council of trusted advisors and friends.`
      }
    },
    {
      name: 'Dom',
      update: {
        background: `Callsign: "Dom" (Dominic Arakelian)
Full name: Dominic "Dom" Arakelian

Foundry member - part of Jasper's Iron Council of trusted advisors and friends.`
      }
    },
    {
      name: 'Rex',
      update: {
        background: `Callsign: "Rex" (Ryan Fraser)
Full name: Ryan "Rex" Fraser

Foundry member - part of Jasper's Iron Council of trusted advisors and friends.`
      }
    },
    {
      name: 'Mase',
      update: {
        background: `Callsign: "Mase" (Mason Whitlock)
Full name: Mason "Mase" Whitlock

Foundry member - part of Jasper's Iron Council of trusted advisors and friends.`
      }
    }
  ];

  for (const charUpdate of callsignUpdates) {
    const existing = await prisma.character.findFirst({
      where: { name: charUpdate.name, projectId: project.id }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: charUpdate.update
      });
      console.log(`Updated: ${charUpdate.name} (callsign noted)`);
    } else {
      console.log(`Not found: ${charUpdate.name}`);
    }
  }

  // Also update any characters that have nicknames in their names to clarify
  const charactersWithNicknames = await prisma.character.findMany({
    where: {
      projectId: project.id,
      name: { contains: '"' }
    }
  });

  for (const char of charactersWithNicknames) {
    // Extract the nickname and real name parts
    const match = char.name.match(/^(.+?)\s*"(.+?)"\s*(.+)?$/);
    if (match) {
      const firstName = match[1];
      const nickname = match[2];
      const lastName = match[3] || '';

      const newBackground = `Nickname: "${nickname}"
Full name: ${firstName} ${lastName}`.trim() + '\n\n' + (char.background || '');

      await prisma.character.update({
        where: { id: char.id },
        data: { background: newBackground }
      });
      console.log(`Clarified nickname for: ${char.name}`);
    }
  }

  console.log("\nDone!");
  await prisma.$disconnect();
}

main().catch(console.error);
