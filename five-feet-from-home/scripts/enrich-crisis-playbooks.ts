import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BSS Response playbook templates by crisis type
const playbooks: Record<string, { team: string[], lessons: string }> = {
  'Technical': {
    team: ['Harper Montgomery (Lead)', 'Tech Response Team', 'Legal Counsel'],
    lessons: 'Rapid containment critical. Document chain of custody. Coordinate with IT forensics. Post-incident review within 48 hours.'
  },
  'Financial': {
    team: ['Jasper Barrett (Strategic Lead)', 'Harper Montgomery (Ops)', 'Financial Analysts', 'Legal Team'],
    lessons: 'Market timing essential. Stakeholder communication crucial. Prepare multiple scenarios. Maintain regulatory relationships.'
  },
  'Political': {
    team: ['Jasper Barrett (Lead)', 'Harper Montgomery', 'Government Relations', 'Media Specialists'],
    lessons: 'Political capital expenditure must be calculated. Multiple exit strategies required. Keep principals informed at all times.'
  },
  'Security': {
    team: ['Hawk (Tactical Lead)', 'Cole Harrington (Field)', 'Harper Montgomery (Coordination)', 'Extraction Team'],
    lessons: 'Physical security and information security must be coordinated. Establish safe communications. Multiple extraction routes.'
  },
  'Corporate': {
    team: ['Jasper Barrett (Lead)', 'Harper Montgomery', 'Legal Counsel', 'PR Team'],
    lessons: 'Board dynamics critical. Identify key decision makers. Prepare golden bridge for all parties. Document everything.'
  },
  'Medical': {
    team: ['Crisis Medical Liaison', 'Harper Montgomery', 'Legal Team', 'Family Liaison'],
    lessons: 'HIPAA compliance paramount. Family communication timeline critical. Media blackout when possible. Support systems for families.'
  },
  'Scandal': {
    team: ['Jasper Barrett (Lead)', 'Harper Montgomery', 'Media Team', 'Legal Defense'],
    lessons: 'Control the narrative. Prepare for worst case exposure. Strategic disclosure better than forced disclosure. Protect the principal.'
  },
  'Espionage': {
    team: ['Hawk (Intelligence)', 'Harper Montgomery', 'Counter-Intel Specialists', 'Legal Team'],
    lessons: 'Assume compromise. Compartmentalize immediately. False flag options. Long-term surveillance may be required.'
  },
  'default': {
    team: ['Jasper Barrett (Lead)', 'Harper Montgomery (Ops)', 'Hawk (Security)', 'Field Team'],
    lessons: 'Standard BSS protocol: Assess, Contain, Resolve, Document. Post-action review mandatory. Client debriefing within 72 hours.'
  }
};

function getPlaybook(crisisType: string | null) {
  if (!crisisType) return playbooks['default'];

  const type = crisisType.toLowerCase();
  if (type.includes('technical') || type.includes('cyber') || type.includes('ransomware')) return playbooks['Technical'];
  if (type.includes('financial') || type.includes('market')) return playbooks['Financial'];
  if (type.includes('political') || type.includes('government')) return playbooks['Political'];
  if (type.includes('security') || type.includes('extraction')) return playbooks['Security'];
  if (type.includes('corporate') || type.includes('hostile')) return playbooks['Corporate'];
  if (type.includes('medical') || type.includes('health')) return playbooks['Medical'];
  if (type.includes('scandal') || type.includes('media')) return playbooks['Scandal'];
  if (type.includes('espionage') || type.includes('intelligence')) return playbooks['Espionage'];
  return playbooks['default'];
}

async function main() {
  console.log('=== ENRICHING CRISIS PLAYBOOKS ===\n');

  const crises = await prisma.crisis.findMany();
  let updated = 0;

  for (const crisis of crises) {
    const needsTeam = !crisis.bssTeam;
    const needsLessons = !crisis.lessonsLearned;

    if (!needsTeam && !needsLessons) continue;

    const playbook = getPlaybook(crisis.crisisType);
    const updates: any = {};

    if (needsTeam) {
      updates.bssTeam = JSON.stringify(playbook.team);
    }
    if (needsLessons) {
      updates.lessonsLearned = playbook.lessons;
    }

    await prisma.crisis.update({
      where: { id: crisis.id },
      data: updates
    });

    console.log(`✅ ${crisis.name} - Added: ${needsTeam ? 'team ' : ''}${needsLessons ? 'lessons' : ''}`);
    updated++;
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Crises updated: ${updated}`);

  // Verify
  const withTeam = await prisma.crisis.count({ where: { bssTeam: { not: null } } });
  const withLessons = await prisma.crisis.count({ where: { lessonsLearned: { not: null } } });
  console.log(`\nNow with BSS team: ${withTeam}`);
  console.log(`Now with lessons learned: ${withLessons}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
