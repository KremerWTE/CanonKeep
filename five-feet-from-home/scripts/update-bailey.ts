import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bailey = await prisma.character.findFirst({
    where: { name: { contains: 'Bailey' } }
  });

  if (bailey) {
    console.log('Current Bailey profile:');
    console.log('Name:', bailey.name);
    console.log('Nickname:', bailey.nickname);
    console.log('Archetype:', bailey.archetype);
    console.log('Modeled After:', bailey.modeledAfter);

    // Update with Towball Queen info
    await prisma.character.update({
      where: { id: bailey.id },
      data: {
        nickname: 'Towball Queen',
        archetype: 'Siren - The Country Queen / Towball Princess',
        modeledAfter: 'Bailey Brewer (Towball Queen)',
        appearance: 'Southern country beauty with curves that stop traffic. Long hair, denim and boots aesthetic, all-American country girl appeal.',
        wardrobeStyle: 'Country glam - cutoffs, boots, truck tailgate aesthetic turned runway.',
        background: `Country girl who built massive social media following through truck culture and southern charm. The "Towball Queen" became her brand - trucks, tailgates, and undeniable curves. Leveraged following into influencer empire.`,
        personality: 'Down-to-earth Southern charm with business savvy underneath. Knows her brand and works it. Approachable but sharp.',
        bssRole: 'Siren Asset - The Country Queen. Perfect for Southern/rural elite, truck culture crossover, and NASCAR/country music circuit infiltration.',
        clubsAssociations: 'Sirens Network, Vixens, Influencer Division'
      }
    });
    console.log('\nUpdated Bailey with Towball Queen profile!');
  }

  await prisma.$disconnect();
}

main();
