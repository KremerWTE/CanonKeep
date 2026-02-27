/**
 * Analyze parsing depth - are minor characters and events captured?
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  console.log('========================================');
  console.log('PARSING DEPTH ANALYSIS');
  console.log('========================================\n');

  // Characters analysis
  const allChars = await prisma.character.findMany({
    where: { projectId: project.id },
    select: {
      name: true,
      archetype: true,
      background: true,
      relationships: true,
      bssRole: true,
      wivesClubRole: true,
      personality: true,
    },
  });

  const fullChars = allChars.filter(c => c.background && c.relationships && c.personality);
  const partialChars = allChars.filter(c => (c.background || c.relationships || c.personality) && !(c.background && c.relationships && c.personality));
  const minimalChars = allChars.filter(c => !c.background && !c.relationships && !c.personality);

  console.log('=== CHARACTER PARSING ===');
  console.log(`Total characters: ${allChars.length}`);
  console.log(`  Fully detailed (bg + relationships + personality): ${fullChars.length}`);
  console.log(`  Partially detailed: ${partialChars.length}`);
  console.log(`  Minimal (name only): ${minimalChars.length}`);

  // Show minimal characters (likely unparsed minors)
  if (minimalChars.length > 0) {
    console.log('\n--- Minimal Characters (may need deep parsing) ---');
    minimalChars.slice(0, 20).forEach(c => {
      console.log(`  • ${c.name} (${c.archetype || 'no archetype'})`);
    });
    if (minimalChars.length > 20) {
      console.log(`  ... and ${minimalChars.length - 20} more`);
    }
  }

  // Characters with BSS role
  const bssChars = allChars.filter(c => c.bssRole);
  console.log(`\nCharacters with BSS role: ${bssChars.length}`);

  // Characters with Wives Club role
  const wcChars = allChars.filter(c => c.wivesClubRole);
  console.log(`Characters with Wives Club role: ${wcChars.length}`);

  // Crisis analysis
  const crises = await prisma.crisis.findMany({
    where: { projectId: project.id },
    select: { name: true, description: true, resolution: true, bssTeam: true },
  });

  const fullCrises = crises.filter(c => c.description && c.resolution);
  const partialCrises = crises.filter(c => (c.description || c.resolution) && !(c.description && c.resolution));

  console.log('\n=== CRISIS PARSING ===');
  console.log(`Total crises: ${crises.length}`);
  console.log(`  Fully detailed: ${fullCrises.length}`);
  console.log(`  Partially detailed: ${partialCrises.length}`);

  // Storyline analysis
  const storylines = await prisma.storyline.findMany({
    where: { projectId: project.id },
    select: { title: true, description: true, characters: true, content: true },
  });

  const storylinesWithContent = storylines.filter(s => s.content);

  console.log('\n=== STORYLINE PARSING ===');
  console.log(`Total storylines: ${storylines.length}`);
  console.log(`  With full content: ${storylinesWithContent.length}`);
  console.log(`  Without full content: ${storylines.length - storylinesWithContent.length}`);

  // Check for specific minor character types that might be missing
  console.log('\n=== CHECKING FOR SPECIFIC MINOR CHARACTER TYPES ===');

  const searchTerms = [
    { term: 'au pair', desc: 'Au pairs' },
    { term: 'nanny', desc: 'Nannies' },
    { term: 'housekeeper', desc: 'Housekeepers' },
    { term: 'assistant', desc: 'Assistants' },
    { term: 'driver', desc: 'Drivers' },
    { term: 'chef', desc: 'Chefs' },
    { term: 'doctor', desc: 'Doctors' },
    { term: 'priest', desc: 'Priests/Clergy' },
    { term: 'monsignor', desc: 'Monsignors' },
    { term: 'operator', desc: 'BSS Operators' },
    { term: 'fixer', desc: 'Fixers' },
  ];

  for (const { term, desc } of searchTerms) {
    const count = await prisma.character.count({
      where: {
        projectId: project.id,
        OR: [
          { name: { contains: term } },
          { archetype: { contains: term } },
          { bssRole: { contains: term } },
          { affiliationRole: { contains: term } },
        ],
      },
    });
    console.log(`  ${desc}: ${count}`);
  }

  // Events/Galas analysis
  const galas = await prisma.gala.findMany({
    where: { projectId: project.id },
    select: { name: true, clothingDescriptions: true, attendees: true },
  });

  const galasWithClothing = galas.filter(g => g.clothingDescriptions);
  const galasWithAttendees = galas.filter(g => g.attendees);

  console.log('\n=== GALA/EVENT PARSING ===');
  console.log(`Total galas/events: ${galas.length}`);
  console.log(`  With clothing descriptions: ${galasWithClothing.length}`);
  console.log(`  With attendee lists: ${galasWithAttendees.length}`);

  // Business trips
  const trips = await prisma.businessTrip.findMany({
    where: { projectId: project.id },
    select: { name: true, storyEvents: true },
  });

  const tripsWithEvents = trips.filter(t => t.storyEvents);

  console.log('\n=== BUSINESS TRIP PARSING ===');
  console.log(`Total trips: ${trips.length}`);
  console.log(`  With story events: ${tripsWithEvents.length}`);

  // Check document block content for unparsed data
  console.log('\n=== LARGE DOCUMENTS - CONTENT BLOCKS ===');
  const docs = await prisma.document.findMany({
    where: { projectId: project.id },
    select: { fileName: true, id: true },
    orderBy: { fileName: 'asc' },
  });

  const largeDocStats = [];
  for (const doc of docs) {
    const blockCount = await prisma.contentBlock.count({ where: { documentId: doc.id } });
    if (blockCount > 1000) {
      largeDocStats.push({ name: doc.fileName, blocks: blockCount });
    }
  }

  largeDocStats.sort((a, b) => b.blocks - a.blocks);
  largeDocStats.forEach(d => {
    console.log(`  ${d.name}: ${d.blocks} blocks`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
