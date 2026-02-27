import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING WNBA & LANDMAN SIRENS ===\n");

  const additionalSirens = [
    {
      name: 'Angelina "Angie" Cross',
      nickname: 'Angie Cross',
      firstName: 'Angelina',
      lastName: 'Cross',
      archetype: 'Siren - The Southern Power Player',
      modeledAfter: 'Angela from Landman (TV Show)',
      appearance: 'Sharp, ambitious, Texas polish. Southern belle meets power broker. Always impeccably dressed for the boardroom.',
      wardrobeStyle: 'Texas power style - designer boots, fitted blazers, big diamonds.',
      background: `Texas oil money family. Grew up learning to play the long game in rooms full of powerful men. Uses charm and patience as weapons. Knows how to work the Southern old-money circuit.`,
      personality: 'Patient, calculating, strategic. Plays the long game. Sweet Southern accent hiding razor-sharp mind.',
      bssRole: 'Siren Asset - The Southern power player. Deployed for Texas/oil money targets. Can infiltrate old money circles.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Caitlin "Nia" Clarke',
      nickname: 'Nia Clarke',
      firstName: 'Caitlin',
      lastName: 'Clarke',
      archetype: 'Siren - The Athletic Golden Girl (WNBA Division)',
      modeledAfter: 'Caitlin Clark (WNBA)',
      appearance: 'Tall, athletic, all-American golden girl. Brunette with fierce competitive energy. Basketball build with model features.',
      wardrobeStyle: 'Athletic chic - jerseys turned lingerie, sporty meets sexy.',
      background: `Former WNBA player turned sports performance coach. Runs elite training camps for young women athletes. Built massive fan following through athletic prowess.`,
      personality: 'Competitive fire, sharp wit, fearless on and off the court. Uses athletic fame as cover.',
      bssRole: 'Siren Asset - Athletic division. Deployed for sports-connected targets. Uses fame to open doors.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Talia Cunningham',
      nickname: 'Talia Cunn',
      firstName: 'Talia',
      lastName: 'Cunningham',
      archetype: 'Siren - The Cheeky Sharpshooter (WNBA Division)',
      modeledAfter: 'Sophie Cunningham (WNBA - Phoenix Mercury)',
      appearance: 'Blonde bombshell athlete. Tall, strong, cocky smile. Sharpshooter confidence.',
      wardrobeStyle: 'Sporty blonde energy - playful, competitive, impossible to ignore.',
      background: `WNBA veteran turned sports media personality and motivational speaker. Known for cheeky personality and competitive fire.`,
      personality: 'Cocky, playful, disarms targets with humor before striking. Never backs down from a challenge.',
      bssRole: 'Siren Asset - Athletic division. Partner to Nia Clarke. Uses playful energy to disarm.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Sabina Ionis',
      nickname: 'Sabina',
      firstName: 'Sabina',
      lastName: 'Ionis',
      archetype: 'Siren - The Cerebral Playmaker (WNBA Division)',
      modeledAfter: 'Sabrina Ionescu (WNBA - New York Liberty)',
      appearance: 'Tall, athletic, dark-haired beauty. Carries herself with quiet intensity. Nike athlete polish.',
      wardrobeStyle: 'Sleek athletic elegance - branded ambassador style.',
      background: `Retired pro basketball player, now Nike brand ambassador and trainer for elite youth basketball. Triple-double queen on the court, cerebral strategist off it.`,
      personality: 'Cerebral, strategic, quiet intensity. Reads people like she reads defenses. Patient but deadly.',
      bssRole: 'Siren Asset - Athletic division. The Liberty Duo. Strategic operator for sports/athlete-connected missions.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Brenna Strowe',
      nickname: 'Brenna',
      firstName: 'Brenna',
      lastName: 'Strowe',
      archetype: 'Siren - The Amazon Powerhouse (WNBA Division)',
      modeledAfter: 'Breanna Stewart (WNBA - New York Liberty, MVP)',
      appearance: 'Tall, powerful, commanding presence. Amazon athlete build. Olympic gold medalist aura.',
      wardrobeStyle: 'Power athlete - makes everything look like a runway.',
      background: `WNBA superstar, multiple MVP, Olympic gold medalist. Commands every room through sheer physical and mental presence.`,
      personality: 'Powerful, commanding, fearless. Uses size and presence to dominate. Surprisingly gentle one-on-one.',
      bssRole: 'Siren Asset - Athletic division. The Liberty Duo partner to Sabina. The intimidation factor.',
      sourceFiles: 'Cam Star Build'
    }
  ];

  for (const siren of additionalSirens) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: siren.name },
          { firstName: siren.firstName, lastName: siren.lastName }
        ],
        projectId: project.id
      }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...siren,
          clubsAssociations: 'Sirens Network, Vixens, Athletic Division'
        }
      });
      console.log(`Created: ${siren.name} - Modeled after: ${siren.modeledAfter}`);
    } else {
      console.log(`Exists: ${siren.name}`);
    }
  }

  // Final count
  const sirenCount = await prisma.character.count({
    where: {
      clubsAssociations: { contains: 'Sirens' },
      projectId: project.id
    }
  });

  console.log(`\n=== TOTAL SIRENS: ${sirenCount} ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
