import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== VERIFYING WARDROBE DATA ===\n');

  const charactersWithWardrobe = await prisma.character.findMany({
    where: {
      wardrobeStyle: { not: null }
    },
    select: {
      name: true,
      wardrobeStyle: true,
    },
    orderBy: { name: 'asc' }
  });

  console.log(`Characters with wardrobe data: ${charactersWithWardrobe.length}\n`);

  charactersWithWardrobe.forEach(c => {
    const preview = c.wardrobeStyle?.substring(0, 100).replace(/\n/g, ' ') || '';
    console.log(`- ${c.name}`);
    console.log(`  Preview: ${preview}...`);
    console.log('');
  });

  // Also check name variants
  console.log('\n=== CHECKING NAME VARIANTS ===\n');

  const charactersWithVariants = await prisma.character.findMany({
    where: {
      nameVariants: { not: null }
    },
    select: {
      name: true,
      nameVariants: true,
    }
  });

  console.log(`Characters with name variants: ${charactersWithVariants.length}`);
  charactersWithVariants.forEach(c => {
    console.log(`- ${c.name}: ${c.nameVariants}`);
  });

  await prisma.$disconnect();
}

main().catch(console.error);
