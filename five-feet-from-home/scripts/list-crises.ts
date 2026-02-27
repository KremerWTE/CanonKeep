import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const crises = await prisma.crisis.findMany({
    orderBy: { name: 'asc' }
  });

  console.log(`Total Crises: ${crises.length}\n`);

  let withResolution = 0;
  let withTeam = 0;
  let withPlaybook = 0;

  for (const c of crises) {
    if (c.resolution) withResolution++;
    if (c.bssTeam) withTeam++;
    if (c.lessonsLearned) withPlaybook++;
  }

  console.log(`With resolution: ${withResolution}`);
  console.log(`With BSS team: ${withTeam}`);
  console.log(`With lessons learned: ${withPlaybook}`);

  console.log('\n--- Sample crises needing enrichment ---');
  const sample = crises.filter(c => !c.resolution || !c.bssTeam).slice(0, 5);
  sample.forEach(c => {
    console.log(`\n${c.name} (${c.codeName || 'no code'})`);
    console.log(`  Type: ${c.crisisType || 'unknown'}`);
    console.log(`  Severity: ${c.severity || 'unknown'}`);
    console.log(`  Resolution: ${c.resolution ? 'Has' : 'MISSING'}`);
    console.log(`  BSS Team: ${c.bssTeam ? 'Has' : 'MISSING'}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
