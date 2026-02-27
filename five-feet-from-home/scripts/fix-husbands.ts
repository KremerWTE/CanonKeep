import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing incorrect husband data...\n');

  // Delete the made-up husbands
  const fakeNames = ['Kyle Price', 'Marco Romano', 'Declan Hale'];

  for (const name of fakeNames) {
    const result = await prisma.character.deleteMany({ where: { name } });
    if (result.count > 0) console.log('Deleted fake husband:', name);
  }

  // Update Addie - married to Hawk
  const addie = await prisma.character.findFirst({ where: { name: 'Addie Price' } });
  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        relationships: 'Wife of Cole "Hawk" Hawkins, BSS Managing Partner, Core member of Wives Club, Close confidante of Elena Barrett, Part of complex dynamic with Jasper and Elena',
      }
    });
    console.log('Updated Addie - married to Hawk');
  }

  // Update Hawk - married to Addie
  const hawk = await prisma.character.findFirst({ where: { name: { contains: 'Hawk' } } });
  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        relationships: 'Husband of Addie Price/Hawkins, BSS Head of Operations',
      }
    });
    console.log('Updated Hawk - married to Addie');
  }

  // Update Sara - divorced
  const sara = await prisma.character.findFirst({ where: { name: 'Sara Hale' } });
  if (sara) {
    await prisma.character.update({
      where: { id: sara.id },
      data: {
        relationships: 'Divorced, Mother of Lottie Hale, Wives Club member, Maison Aurelia support',
        background: 'Divorced. Grounding presence in Wives Club.',
      }
    });
    console.log('Updated Sara - divorced');
  }

  // Update Bella - need to remove wrong husband reference
  const bella = await prisma.character.findFirst({ where: { name: 'Bella Romano' } });
  if (bella) {
    await prisma.character.update({
      where: { id: bella.id },
      data: {
        relationships: 'Wives Club Core Member - Emotional Heart. Husband name TBD.',
      }
    });
    console.log('Updated Bella - husband name TBD');
  }

  // Also update Chris Donnelly if he exists - is he Kendra's husband?
  const chris = await prisma.character.findFirst({ where: { name: 'Chris Donnelly' } });
  if (chris) {
    console.log('Chris Donnelly exists - keeping as Kendra\'s husband (confirm if correct)');
  }

  console.log('\nCharacter count:', await prisma.character.count());
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
