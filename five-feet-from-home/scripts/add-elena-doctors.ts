import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Elena's Doctor Connections...\n");

  const doctors = [
    // ========== DR. NATHAN COLE ==========
    {
      name: 'Dr. Nathan Cole',
      firstName: 'Nathan',
      lastName: 'Cole',
      title: 'Dr.',
      archetype: 'Pediatric Doctor / PT',
      careerHistory: 'Primary Care physician and Physical Therapist for children.',
      affiliationRole: 'Grace\'s Doctor - Primary Care/PT',
      hubLocation: 'Charlotte, NC',
      relationships: "Grace Barrett's primary care physician and PT doctor. Connected to Elena Barrett.",
      background: "Grace Barrett's primary care physician and physical therapist. Trusted medical professional for the Barrett family. Provides comprehensive care for Grace's health and physical development.",
    },

    // ========== DR. JULIA BENNETT ==========
    {
      name: 'Dr. Julia Bennett',
      firstName: 'Julia',
      lastName: 'Bennett',
      title: 'Dr.',
      archetype: 'Neurologist / Friend',
      careerHistory: 'Neurologist.',
      affiliationRole: 'Elena\'s Neurologist & Friend',
      hubLocation: 'Charlotte, NC',
      relationships: "Elena Barrett's neurologist and personal friend.",
      wivesClubRole: 'Extended Circle - Medical Professional',
      background: "Elena Barrett's neurologist who has also become a personal friend. Provides medical expertise while being part of Elena's trusted inner circle. Her dual role as doctor and friend gives Elena both medical care and emotional support.",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const doc of doctors) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: doc.name },
          { firstName: doc.firstName, lastName: doc.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: doc
      });
      console.log(`Updated: ${doc.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...doc,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${doc.name}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
