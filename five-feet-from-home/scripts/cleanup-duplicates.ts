import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function mergeDuplicates(name: string) {
  // Find all characters with similar name
  const chars = await prisma.character.findMany({
    where: { name: { contains: name } }
  });

  if (chars.length < 2) {
    console.log(`  No duplicates found for "${name}"`);
    return;
  }

  console.log(`\n--- Merging ${chars.length} "${name}" records ---`);

  // Sort by field count (keep the one with most data)
  const ranked = chars.map(c => {
    let fieldCount = 0;
    for (const [key, value] of Object.entries(c)) {
      if (value && key !== 'id' && key !== 'projectId' && key !== 'createdAt' && key !== 'updatedAt') {
        fieldCount++;
      }
    }
    return { ...c, fieldCount };
  }).sort((a, b) => b.fieldCount - a.fieldCount);

  const keep = ranked[0];
  const remove = ranked.slice(1);

  console.log(`  Keeping: ${keep.id} (${keep.fieldCount} fields)`);

  // Merge data from duplicates into the keeper
  const mergeData: any = {};
  for (const dup of remove) {
    console.log(`  Removing: ${dup.id} (${dup.fieldCount} fields)`);

    for (const [key, value] of Object.entries(dup)) {
      if (value && key !== 'id' && key !== 'projectId' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'name') {
        const keepValue = (keep as any)[key];
        // If keeper doesn't have this field, or duplicate has longer content
        if (!keepValue || (typeof value === 'string' && value.length > keepValue.length)) {
          mergeData[key] = value;
        }
      }
    }
  }

  // Update keeper with merged data
  if (Object.keys(mergeData).length > 0) {
    await prisma.character.update({
      where: { id: keep.id },
      data: mergeData
    });
    console.log(`  Merged ${Object.keys(mergeData).length} fields into keeper`);
  }

  // Delete duplicates
  for (const dup of remove) {
    await prisma.character.delete({ where: { id: dup.id } });
    console.log(`  Deleted: ${dup.id}`);
  }
}

async function main() {
  console.log('Cleaning up duplicate characters...\n');

  // Merge the known duplicates
  await mergeDuplicates('Charlotte "Charlie" Whitmore');
  await mergeDuplicates('Dr. Layla Hassan');
  await mergeDuplicates('Vanessa "Nessa" Caldwell');

  // Final count
  const count = await prisma.character.count();
  console.log(`\n\nTotal characters after cleanup: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
