/**
 * Check for sample/made-up data that should be removed
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check all projects
  const projects = await prisma.project.findMany({
    select: { id: true, name: true },
  });

  console.log('=== ALL PROJECTS ===');
  projects.forEach(p => console.log(`  • ${p.name}`));

  const ffh = await prisma.project.findUnique({
    where: { name: 'Five Feet From Home' },
  });

  if (!ffh) {
    console.log('\nFive Feet From Home project not found!');
    return;
  }

  // Check for other projects
  const otherProjects = projects.filter(p => p.id !== ffh.id);
  if (otherProjects.length > 0) {
    console.log('\n=== OTHER PROJECTS (potential sample data) ===');
    for (const proj of otherProjects) {
      const charCount = await prisma.character.count({ where: { projectId: proj.id } });
      const locCount = await prisma.location.count({ where: { projectId: proj.id } });
      console.log(`  • ${proj.name}: ${charCount} characters, ${locCount} locations`);
    }
  }

  // Look for suspicious characters in FFFH that might not be from docs
  console.log('\n=== CHECKING FOR POTENTIAL NON-DOCX CHARACTERS ===');
  const suspiciousNames = ['Maya', 'Kai', 'Voss', 'Echo'];
  for (const name of suspiciousNames) {
    const found = await prisma.character.findMany({
      where: {
        projectId: ffh.id,
        name: { contains: name }
      },
      select: { name: true, archetype: true }
    });
    if (found.length > 0) {
      console.log(`  Found "${name}": ${found.map(f => f.name).join(', ')}`);
    }
  }

  // Show characters that might be sample data (no bssRole, no relationships, generic archetypes)
  console.log('\n=== CHARACTERS WITH MINIMAL DATA (might be sample) ===');
  const minimal = await prisma.character.findMany({
    where: {
      projectId: ffh.id,
      bssRole: null,
      relationships: null,
      background: null,
    },
    select: { name: true, archetype: true },
    take: 15,
  });
  minimal.forEach(c => console.log(`  • ${c.name} (${c.archetype || 'no archetype'})`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
