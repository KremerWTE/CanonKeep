import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log('Projects:');
  projects.forEach(p => console.log(`  ID: ${p.id}, Name: ${p.name}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
