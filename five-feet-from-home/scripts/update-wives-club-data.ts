import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== UPDATING WIVES CLUB MEMBER DATA ===\n');

  // Update core Wives Club members with hubLocation and wivesClubRole
  const updates = [
    // Charlotte Hub (The Forge)
    { name: 'Elena Barrett', hubLocation: 'Charlotte, NC', wivesClubRole: 'Vestals - Founder' },
    { name: 'Addison Price', hubLocation: 'Charlotte, NC', wivesClubRole: 'Shieldmaidens - Leader' },
    { name: 'Kendra Whitaker', hubLocation: 'Charlotte, NC', wivesClubRole: 'Owls - Leader' },
    { name: 'Isabella Marquez', hubLocation: 'Charlotte, NC', wivesClubRole: 'Vestals - The Hand' },
    { name: 'Selene', hubLocation: 'Charlotte, NC', wivesClubRole: 'Shieldmaidens' },
    { name: 'Sara Whitaker', hubLocation: 'Charlotte, NC', wivesClubRole: 'Vestals - Family Anchor' },
    { name: 'Charlotte "Charlie" Whitmore', hubLocation: 'Charlotte, NC', wivesClubRole: 'Hub Leader - Charlotte' },
    { name: 'Madison "Maddie" Cole', hubLocation: 'Charlotte, NC', wivesClubRole: 'Vestals' },

    // DC / NY Hub
    { name: 'Vanessa "Nessa" Caldwell', hubLocation: 'Washington, DC', wivesClubRole: 'Hub Leader - DC/NY (Owls)' },
    { name: 'Caroline Westbrook', hubLocation: 'New York, NY', wivesClubRole: 'Owls - Finance Intel' },
    { name: 'Harper Caldwell', hubLocation: 'Washington, DC', wivesClubRole: 'Owls - Strategic Advisor' },

    // Boston Hub
    { name: 'Dr. Layla Hassan', hubLocation: 'Boston, MA', wivesClubRole: 'Hub Leader - Boston (Vestals)' },
    { name: 'Claire Donavan', hubLocation: 'Boston, MA', wivesClubRole: 'Owls - European Intel' },

    // Sports Media Circle
    { name: 'Vivian Carroway', hubLocation: 'Charlotte, NC', wivesClubRole: 'Sports Media Circle - Peacemaker' },
    { name: 'Elena Duvall', hubLocation: 'Charlotte, NC', wivesClubRole: 'Sports Media Circle - Reputation Fixer' },
    { name: 'Sloane Hartwell', hubLocation: 'Charlotte, NC', wivesClubRole: 'Sports Media Circle - Finance Keeper' },
    { name: 'Marisa Calderón', hubLocation: 'Charlotte, NC', wivesClubRole: 'Sports Media Circle - Conscience' },
    { name: 'Tessa Loring', hubLocation: 'Charlotte, NC', wivesClubRole: 'Sports Media Circle - Storyteller' },
    { name: 'Raina Locke', hubLocation: 'Charlotte, NC', wivesClubRole: 'Sports Media Circle - Enforcer' },
  ];

  let updated = 0;

  for (const update of updates) {
    const existing = await prisma.character.findFirst({
      where: {
        name: { contains: update.name.split(' ')[0] },
        projectId: project.id
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: {
          hubLocation: update.hubLocation,
          wivesClubRole: update.wivesClubRole
        }
      });
      console.log(`Updated: ${existing.name} -> ${update.hubLocation}, ${update.wivesClubRole}`);
      updated++;
    } else {
      console.log(`Not found: ${update.name}`);
    }
  }

  console.log(`\nUpdated ${updated} Wives Club members`);

  // Show current stats
  const wivesClubMembers = await prisma.character.findMany({
    where: {
      OR: [
        { bssRole: { contains: 'Wives Club' } },
        { wivesClubRole: { not: null } },
      ]
    },
    select: {
      name: true,
      hubLocation: true,
      wivesClubRole: true
    },
    orderBy: { name: 'asc' }
  });

  console.log(`\n=== CURRENT WIVES CLUB MEMBERS ===`);
  console.log(`Total with Wives Club role: ${wivesClubMembers.length}`);

  const withHub = wivesClubMembers.filter(m => m.hubLocation);
  console.log(`With hub location: ${withHub.length}`);

  await prisma.$disconnect();
}

main().catch(console.error);
