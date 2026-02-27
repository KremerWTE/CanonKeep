import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check CharacterRelationship table
  const relCount = await prisma.characterRelationship.count();
  console.log(`CharacterRelationship table: ${relCount} relationships\n`);

  // Check characters with relationships field
  const charsWithRel = await prisma.character.findMany({
    where: { relationships: { not: null } },
    select: { name: true, relationships: true }
  });

  console.log(`Characters with relationships field populated: ${charsWithRel.length}\n`);

  // Sample some relationships from the table
  const sampleRels = await prisma.characterRelationship.findMany({
    take: 10,
    include: {
      fromCharacter: { select: { name: true } },
      toCharacter: { select: { name: true } }
    }
  });

  console.log('Sample relationships from table:');
  sampleRels.forEach(r => {
    console.log(`  ${r.fromCharacter.name} -> ${r.toCharacter.name}: ${r.relationshipType}`);
  });

  // Key characters to check
  const keyNames = ['Jasper Barrett', 'Elena Barrett', 'Addison', 'Hawk', 'Cole', 'Kendra'];
  console.log('\n\nKey character relationships:');
  for (const name of keyNames) {
    const char = await prisma.character.findFirst({
      where: { name: { contains: name } },
      select: { name: true, relationships: true }
    });
    if (char) {
      console.log(`\n${char.name}:`);
      console.log(`  ${char.relationships ? char.relationships.substring(0, 200) + '...' : 'No relationships field'}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
