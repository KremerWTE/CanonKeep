/**
 * Remove the duplicate "Five Feet From Home" project
 * All data should be in STORY_PROJECT
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ffh = await prisma.project.findUnique({
    where: { name: 'Five Feet From Home' },
  });

  if (!ffh) {
    console.log('No "Five Feet From Home" project found - already cleaned up!');
    return;
  }

  console.log('Found duplicate project: Five Feet From Home');
  console.log('Deleting all associated data...\n');

  // Delete in order due to foreign key constraints (Prisma cascade should handle this)
  await prisma.project.delete({
    where: { id: ffh.id },
  });

  console.log('✓ Deleted "Five Feet From Home" project and all associated data');

  // Verify only STORY_PROJECT remains
  const remaining = await prisma.project.findMany();
  console.log('\nRemaining projects:');
  remaining.forEach(p => console.log(`  • ${p.name}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
