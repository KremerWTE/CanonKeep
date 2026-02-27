import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.character.updateMany({
    where: { name: 'Chris Donnelly' },
    data: {
      name: 'Chris (Last Name TBD)',
      lastName: 'TBD - was Donnelly in some versions'
    }
  });
  console.log('Updated Chris:', result.count);
}

main().finally(() => prisma.$disconnect());
