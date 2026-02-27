import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find documents related to wives club or characters
  const docs = await prisma.document.findMany({
    where: {
      OR: [
        { fileName: { contains: 'wives' } },
        { fileName: { contains: 'Wives' } },
        { fileName: { contains: 'character' } },
        { fileName: { contains: 'Character' } },
        { fileName: { contains: 'club' } },
        { fileName: { contains: 'Club' } },
      ]
    },
    select: { id: true, fileName: true }
  });

  console.log('Documents found:');
  for (const doc of docs) {
    console.log(`  ${doc.id}: ${doc.fileName}`);
  }

  // Also list all documents
  console.log('\nAll documents:');
  const allDocs = await prisma.document.findMany({
    select: { id: true, fileName: true },
    orderBy: { fileName: 'asc' }
  });
  for (const doc of allDocs) {
    console.log(`  ${doc.fileName}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
