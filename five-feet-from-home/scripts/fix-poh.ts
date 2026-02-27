import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findUnique({ where: { name: 'STORY_PROJECT' } });
  if (!project) return;

  const orgs = await prisma.organization.findMany({
    where: { projectId: project.id, name: { contains: 'Palace' } }
  });

  console.log('Found orgs:', orgs.map(o => o.name));

  for (const org of orgs) {
    if (!org.leadership || !org.services) {
      await prisma.organization.update({
        where: { id: org.id },
        data: {
          leadership: '[ADDED] Patroness of Honor: Adelaide "Addie" Barrett. Vestals: Inner circle. Pages: Emerging leaders (Bella). Knights: Male supporters.',
          services: '[ADDED] Catholic social network for elite families. Charitable giving. Faith-based mentorship. Gala organization. Family support.',
        }
      });
      console.log('✓ Enhanced:', org.name);
    }
  }
}

main().finally(() => prisma.$disconnect());
