import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== UPDATING COMPLETE WIVES CLUB DATA ===\n');

  // Complete Wives Club structure from source documents
  const wivesClubMembers = [
    // VESTALS - Tradition Keepers, Mentors, Elders, Founders
    { name: 'Elena Barrett', wivesClubRole: 'Vestals - Founder', hubLocation: 'Charlotte, NC', maisonAureliaRole: 'CEO / Founder' },
    { name: 'Jessica Vaughn', wivesClubRole: 'Vestals - Elder/Mentor', hubLocation: 'Charlotte, NC', maisonAureliaRole: 'Industry Legend' },
    { name: 'Madison "Maddie" Cole', wivesClubRole: 'Vestals - Core Member', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Sara Whitaker', wivesClubRole: 'Vestals - Family Anchor', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Dr. Layla Hassan', wivesClubRole: 'Vestals - Hub Leader Boston', hubLocation: 'Boston, MA', maisonAureliaRole: null },

    // SHIELDMAIDENS - Protectors, Defenders, Field Operators
    { name: 'Addison Price', wivesClubRole: 'Shieldmaidens - Leader', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Selene', wivesClubRole: 'Shieldmaidens - Operator', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Bella', wivesClubRole: 'Shieldmaidens - Field Support', hubLocation: 'Charlotte, NC', maisonAureliaRole: 'Camp Legacy Host' },

    // OWLS - Intelligence, Analysts, Strategists
    { name: 'Harper Caldwell', wivesClubRole: 'Owls - Strategic Advisor', hubLocation: 'Washington, DC', maisonAureliaRole: null },
    { name: 'Kendra Whitaker', wivesClubRole: 'Owls - Leader', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Caroline Westbrook', wivesClubRole: 'Owls - Finance Intel', hubLocation: 'New York, NY', maisonAureliaRole: null },
    { name: 'Vanessa "Nessa" Caldwell', wivesClubRole: 'Owls - Hub Leader DC/NY', hubLocation: 'Washington, DC', maisonAureliaRole: null },
    { name: 'Claire Donavan', wivesClubRole: 'Owls - European Intel', hubLocation: 'Boston, MA', maisonAureliaRole: null },
    { name: 'Natalia "Tali" Cruz', wivesClubRole: 'Owls - Legal/Finance', hubLocation: 'New York, NY', maisonAureliaRole: null },

    // COLUMBIA SORORITY / WIVES CIRCLE
    { name: 'Vivienne "Viv" Ross', wivesClubRole: 'Wives Circle - Old Money', hubLocation: 'New York / Hamptons', maisonAureliaRole: null },
    { name: 'Camille "Cam" Whitmore', wivesClubRole: 'Wives Circle - Southern Connections', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Isabella "Izzy" Santoro', wivesClubRole: 'Wives Circle - Arts/Entertainment', hubLocation: 'New York, NY', maisonAureliaRole: null },

    // SPORTS MEDIA CIRCLE
    { name: 'Vivian Carroway', wivesClubRole: 'Sports Media Circle - Peacemaker', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Elena Duvall', wivesClubRole: 'Sports Media Circle - Reputation Fixer', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Sloane Hartwell', wivesClubRole: 'Sports Media Circle - Finance Keeper', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Marisa Calderon', wivesClubRole: 'Sports Media Circle - Conscience', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Tessa Loring', wivesClubRole: 'Sports Media Circle - Storyteller', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },
    { name: 'Raina Locke', wivesClubRole: 'Sports Media Circle - Enforcer', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },

    // HUB LEADERS
    { name: 'Charlotte "Charlie" Whitmore', wivesClubRole: 'Hub Leader - Charlotte (The Forge)', hubLocation: 'Charlotte, NC', maisonAureliaRole: null },

    // MAISON AURELIA STAFF
    { name: 'Sofia', wivesClubRole: 'Maison Aurelia Staff', hubLocation: 'Charlotte, NC', maisonAureliaRole: 'Senior Event Coordinator' },
    { name: 'Evie', wivesClubRole: 'Maison Aurelia Staff', hubLocation: 'Charlotte, NC', maisonAureliaRole: 'Event Coordinator' },
  ];

  let updated = 0;
  let created = 0;

  for (const member of wivesClubMembers) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: member.name },
          { name: { contains: member.name.split(' ')[0] } }
        ],
        projectId: project.id
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: {
          wivesClubRole: member.wivesClubRole,
          hubLocation: member.hubLocation,
          maisonAureliaRole: member.maisonAureliaRole,
          clubsAssociations: existing.clubsAssociations
            ? `${existing.clubsAssociations}, Wives Club`
            : 'Wives Club'
        }
      });
      console.log(`✓ Updated: ${existing.name} -> ${member.wivesClubRole}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          name: member.name,
          projectId: project.id,
          wivesClubRole: member.wivesClubRole,
          hubLocation: member.hubLocation,
          maisonAureliaRole: member.maisonAureliaRole,
          clubsAssociations: 'Wives Club'
        }
      });
      console.log(`+ Created: ${member.name} -> ${member.wivesClubRole}`);
      created++;
    }
  }

  // Add Wives Club traditions and structure info as an Organization entry
  const wivesClubOrg = await prisma.organization.findFirst({
    where: { name: 'The Wives Club', projectId: project.id }
  });

  const wivesClubData = {
    name: 'The Wives Club',
    projectId: project.id,
    orgType: 'Social Network / Support Organization',
    headquarters: 'Charlotte, NC (The Forge)',
    mission: 'Support network for women married to or partnered with high-powered, often-absent men. Provides sisterhood, resources, and mutual aid.',
    keyMembers: JSON.stringify([
      'Elena Barrett (Founder)',
      'Harper Caldwell (Strategic Advisor)',
      'Addison Price (Shieldmaidens Leader)',
      'Kendra Whitaker (Owls Leader)',
      'Jessica Vaughn (Elder/Mentor)'
    ]),
    structure: JSON.stringify({
      subsections: {
        Shieldmaidens: 'Protectors, defenders, field operators - those who physically protect the circle',
        Owls: 'Intelligence, analysts, strategists - those who gather and process information',
        Vestals: 'Tradition keepers, mentors, elders - those who maintain the values and mentor newcomers'
      },
      hubs: {
        'Charlotte (The Forge)': 'Main hub, Elena Barrett territory',
        'DC / New York': 'Political and finance connections, led by Nessa Caldwell',
        'Boston': 'Academic and medical connections, led by Dr. Layla Hassan',
        'London / Europe': 'International operations',
        'Los Angeles': 'Entertainment industry connections'
      },
      traditions: [
        'Cooking classes at Maison Aurelia',
        'Mountain cabin weekends',
        'Annual galas and fundraisers',
        'Mentorship pairings'
      ],
      connectedOrgs: ['Maison Aurelia', 'Columbia Sorority Network', 'Sports Media Circle']
    }),
    description: 'The Wives Club is more than a social organization - it\'s a support network of powerful women who understand the unique challenges of life with driven, crisis-managing partners. Founded informally through Elena\'s connections and Harper\'s Columbia sorority network, it has evolved into a structured organization with subsections (Shieldmaidens, Owls, Vestals) and geographic hubs.'
  };

  if (wivesClubOrg) {
    await prisma.organization.update({
      where: { id: wivesClubOrg.id },
      data: wivesClubData
    });
    console.log('\n✓ Updated Wives Club organization');
  } else {
    await prisma.organization.create({ data: wivesClubData });
    console.log('\n+ Created Wives Club organization');
  }

  // Summary
  const totalWivesClub = await prisma.character.count({
    where: {
      OR: [
        { wivesClubRole: { not: null } },
        { clubsAssociations: { contains: 'Wives Club' } }
      ],
      projectId: project.id
    }
  });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated} members`);
  console.log(`Created: ${created} new members`);
  console.log(`Total Wives Club members: ${totalWivesClub}`);

  await prisma.$disconnect();
}

main().catch(console.error);
