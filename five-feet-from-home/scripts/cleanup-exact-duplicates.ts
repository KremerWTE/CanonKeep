import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function mergeByIds(ids: string[]) {
  const chars = await prisma.character.findMany({
    where: { id: { in: ids } }
  });

  if (chars.length < 2) return;

  console.log(`\n--- Merging ${chars.length} records: ${chars[0].name} ---`);

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

  // Merge data
  const mergeData: any = {};
  for (const dup of remove) {
    console.log(`  Removing: ${dup.id} (${dup.fieldCount} fields)`);

    for (const [key, value] of Object.entries(dup)) {
      if (value && key !== 'id' && key !== 'projectId' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'name') {
        const keepValue = (keep as any)[key];
        if (!keepValue || (typeof value === 'string' && value.length > keepValue.length)) {
          mergeData[key] = value;
        }
      }
    }
  }

  if (Object.keys(mergeData).length > 0) {
    await prisma.character.update({
      where: { id: keep.id },
      data: mergeData
    });
    console.log(`  Merged ${Object.keys(mergeData).length} fields`);
  }

  for (const dup of remove) {
    await prisma.character.delete({ where: { id: dup.id } });
    console.log(`  Deleted: ${dup.id}`);
  }
}

async function main() {
  console.log('Cleaning up exact duplicates...\n');

  // Charlotte "Charlie" Whitmore
  await mergeByIds([
    'cmjhshwm300031pzdt7odqq57',
    'cmjhmd1yv001p13aelvxli225'
  ]);

  // Vanessa "Nessa" Caldwell
  await mergeByIds([
    'cmjhshwlv00011pzd7clnghsi',
    'cmjhmd1yp001n13ae9me32vqx'
  ]);

  const count = await prisma.character.count();
  console.log(`\n\nTotal characters after cleanup: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
