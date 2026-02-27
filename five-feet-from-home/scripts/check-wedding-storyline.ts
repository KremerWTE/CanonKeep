import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("=== KENDRA & CHRIS WEDDING STORYLINE ===\n");

  // Check events
  const events = await prisma.event.findMany({
    where: {
      OR: [
        { name: { contains: 'Chris' } },
        { name: { contains: 'Kendra' } },
        { name: { contains: 'Wedding' } },
        { name: { contains: 'Engagement' } },
        { name: { contains: 'Pregnancy' } },
        { name: { contains: 'Donnelly' } },
      ]
    }
  });

  console.log(`Found ${events.length} related events:\n`);
  events.forEach(e => {
    console.log(`- ${e.name}`);
    console.log(`  Timeline: ${e.timelineRef}`);
    console.log(`  Description: ${e.description?.substring(0, 200)}...`);
    console.log('');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
