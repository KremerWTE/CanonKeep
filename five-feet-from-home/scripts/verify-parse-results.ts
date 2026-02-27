import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("=== VERIFYING PARSED DATA ===\n");

  // Check new crises
  console.log("NEW CRISES:");
  const newCrises = await prisma.crisis.findMany({
    where: {
      name: {
        in: ['NFL Team Ownership Battle', 'Denver Telecom Crisis']
      }
    },
    select: {
      name: true,
      location: true,
      crisisType: true,
      severity: true,
      bssTeam: true,
    }
  });
  console.log(JSON.stringify(newCrises, null, 2));

  // Check business trips
  console.log("\n\nSAMPLE BUSINESS TRIPS:");
  const trips = await prisma.businessTrip.findMany({
    where: {
      name: {
        contains: 'Addie'
      }
    },
    select: {
      name: true,
      traveler: true,
      destination: true,
      purpose: true,
    },
    take: 5
  });
  console.log(JSON.stringify(trips, null, 2));

  // Check flashback storylines
  console.log("\n\nSAMPLE FLASHBACKS:");
  const flashbacks = await prisma.storyline.findMany({
    where: {
      category: 'Flashback'
    },
    select: {
      title: true,
      characters: true,
      timeline: true,
    },
    take: 5
  });
  console.log(JSON.stringify(flashbacks, null, 2));

  await prisma.$disconnect();
}

main().catch(console.error);
