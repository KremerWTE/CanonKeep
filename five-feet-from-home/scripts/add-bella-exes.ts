import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Bella's Minor Relationship Characters...\n");

  const bellaExes = [
    {
      name: "Bella's HS Boyfriend",
      archetype: 'High School Athlete',
      careerHistory: 'Star athlete in high school.',
      relationships: "Dated Bella in high school. She ended it when she realized she wanted more depth than he offered.",
      background: "Star athlete who dated Bella in high school. The relationship ended because Bella wanted more depth and substance. First pattern of Bella choosing stability over sparks, then walking away. Represents her early romantic attempts before self-worth issues fully developed.",
    },
    {
      name: "Bella's College Boyfriend",
      archetype: 'Law Student',
      education: 'Law school',
      careerHistory: 'Law student, very career-driven.',
      relationships: "Dated Bella in college. Relationship ended because Bella wanted presence, not just prestige.",
      background: "Law student who dated Bella during college. Very career-driven. The relationship ended because Bella wanted presence and emotional connection, not just ambition and prestige. Another pattern of Bella ending things before allowing deeper connection.",
    },
    {
      name: "Bella's Junior Year Guy",
      archetype: 'College Student',
      education: 'Boston College',
      relationships: "Was genuinely into Bella during her junior year. She did not believe his interest was real and ended it.",
      background: "A guy in college who was genuinely interested in Bella during her junior year. He was attentive, patient, and interested. Bella did not believe it - convinced herself he would eventually realize she was not worth it. She buried herself in school, sorority obligations, and helping at the family cafe, leaving little space for him. Eventually she ended it before he could. Key example of her self-worth issues sabotaging potential love.",
    },
    {
      name: "Bella's Sorority Connection",
      archetype: 'Sorority Sister',
      education: 'Boston College',
      relationships: "Grew close with Bella in college - emotional and quietly romantic connection. The sorority circle did not approve.",
      background: "A girl in Bella's sorority circle with whom Bella grew close during college. The connection was both emotional and quietly romantic. However, the sorority circle did not approve of the relationship. Bella internalized their disapproval and the relationship never went anywhere. This experience pushed her deeper into believing that relationships were not meant for her. Key formative moment in her self-worth struggles.",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of bellaExes) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          sourceFiles: 'Bella Background Pre-BSS',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name}`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
