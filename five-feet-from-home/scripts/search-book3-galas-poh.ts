import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Searching for Galas, POH, Wives Club, East Coast Trips ===\n');

  // Search for galas
  const galas = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'gala' } },
        { rawText: { contains: 'Gala' } },
        { rawText: { contains: 'charity' } },
        { rawText: { contains: 'fundraiser' } },
        { rawText: { contains: 'ball' } },
      ]
    },
    include: { document: true },
    take: 50
  });

  console.log('=== GALAS & CHARITY EVENTS ===');
  console.log(`Found ${galas.length} blocks\n`);
  galas.slice(0, 8).forEach(b => {
    console.log('---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 400));
    console.log();
  });

  // Search for POH / Palace of Honor
  const poh = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'POH' } },
        { rawText: { contains: 'Palace of Honor' } },
        { rawText: { contains: 'Protectress' } },
        { rawText: { contains: 'EOHSJ' } },
        { rawText: { contains: 'Order' } },
      ]
    },
    include: { document: true },
    take: 50
  });

  console.log('\n\n=== POH / PALACE OF HONOR / ORDERS ===');
  console.log(`Found ${poh.length} blocks\n`);
  poh.slice(0, 8).forEach(b => {
    console.log('---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 400));
    console.log();
  });

  // Search for East Coast trips
  const eastCoast = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'NYC' } },
        { rawText: { contains: 'New York' } },
        { rawText: { contains: 'D.C.' } },
        { rawText: { contains: 'Washington' } },
        { rawText: { contains: 'Boston' } },
        { rawText: { contains: 'East Coast' } },
      ]
    },
    include: { document: true },
    take: 50
  });

  const tripBlocks = eastCoast.filter(b =>
    b.rawText.toLowerCase().includes('addie') ||
    b.rawText.toLowerCase().includes('jasper') ||
    b.rawText.toLowerCase().includes('trip') ||
    b.rawText.toLowerCase().includes('case') ||
    b.rawText.toLowerCase().includes('crisis')
  );

  console.log('\n\n=== EAST COAST TRIPS (Addie/Jasper) ===');
  console.log(`Found ${tripBlocks.length} blocks\n`);
  tripBlocks.slice(0, 8).forEach(b => {
    console.log('---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 400));
    console.log();
  });

  // Search for wives club setup
  const wivesClub = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { rawText: { contains: 'Wives Club' } },
        { rawText: { contains: 'wives club' } },
        { rawText: { contains: 'Sapientia' } },
        { rawText: { contains: 'inner circle' } },
      ]
    },
    include: { document: true },
    take: 50
  });

  const setupBlocks = wivesClub.filter(b =>
    b.rawText.toLowerCase().includes('addie') ||
    b.rawText.toLowerCase().includes('setting') ||
    b.rawText.toLowerCase().includes('position') ||
    b.rawText.toLowerCase().includes('groom')
  );

  console.log('\n\n=== WIVES CLUB SETTING UP ADDIE ===');
  console.log(`Found ${setupBlocks.length} blocks\n`);
  setupBlocks.slice(0, 8).forEach(b => {
    console.log('---', b.document?.fileName, '---');
    console.log(b.rawText.substring(0, 400));
    console.log();
  });

  await prisma.$disconnect();
}

main().catch(console.error);
