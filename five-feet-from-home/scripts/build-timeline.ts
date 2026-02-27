/**
 * Build comprehensive timeline from all documents
 * Extracts events, temporal markers, and creates an ordered timeline
 * with a section for unplaced events
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TimelineEvent {
  description: string;
  source: string;
  blockIndex: number;
  temporalMarker?: string;
  characters: string[];
  placement: 'placed' | 'unplaced';
  suggestedPosition?: string;
  rawContext: string;
}

// Temporal patterns to identify events
const TEMPORAL_PATTERNS = [
  // Specific times
  /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/gi,
  // Days/dates
  /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/gi,
  /(next day|the following|that morning|that evening|that night|later that)/gi,
  // Relative time
  /(after|before|during|while|when|as soon as)/gi,
  // Story beats
  /(chapter|scene|act|part|book)/gi,
  // Event markers
  /(party|wedding|funeral|meeting|call|arrival|departure|birth|crisis)/gi,
];

// Known timeline anchors from Book 1
const TIMELINE_ANCHORS = [
  { marker: '2:17 AM', event: 'London data breach call', chapter: 1, position: 1 },
  { marker: 'London', event: 'Jasper arrives in London', chapter: 1, position: 2 },
  { marker: 'crisis', event: 'Data breach crisis management', chapter: 2, position: 3 },
  { marker: 'medical emergency', event: "Elena's medical emergency", chapter: 3, position: 4 },
  { marker: 'hospital', event: 'Elena in hospital', chapter: 4, position: 5 },
  { marker: 'recovery', event: "Elena's recovery begins", chapter: 5, position: 6 },
  { marker: 'five feet', event: "Grace's five feet question", chapter: 6, position: 7 },
  { marker: 'transition', event: 'BSS leadership transition', chapter: 7, position: 8 },
  { marker: 'Wives Club', event: 'Wives Club interactions', chapter: 8, position: 9 },
  { marker: 'family', event: 'Family reconciliation', chapter: 9, position: 10 },
  { marker: 'big party', event: 'The Big Party', chapter: 10, position: 11 },
];

// Main characters for event association
const MAIN_CHARACTERS = [
  'Jasper', 'Elena', 'Grace', 'Lucas', 'Addie', 'Addison', 'Hawk', 'Ethan',
  'Harper', 'Kendra', 'Bella', 'Ridge', 'Mason', 'Jessica', 'Evie', 'Sofia',
  'Maddie', 'Isabella', 'Izzy', 'Selene', 'Chris', 'Matt', 'Mandy', 'Cam',
  'Daniel', 'Riley', 'Caroline'
];

async function main() {
  console.log('Building comprehensive timeline from all documents...\n');

  const project = await prisma.project.findFirst({
    where: { name: 'Five Feet From Home' },
  });

  if (!project) {
    console.log('Project not found. Run create-canon.ts first.');
    return;
  }

  // Get all content blocks with event-like content
  const blocks = await prisma.contentBlock.findMany({
    include: { document: true },
    orderBy: [{ documentId: 'asc' }, { blockIndex: 'asc' }],
  });

  console.log(`Analyzing ${blocks.length} content blocks for timeline events...\n`);

  const events: TimelineEvent[] = [];
  const seenEvents = new Set<string>();

  for (const block of blocks) {
    const text = block.rawText;
    if (text.length < 30) continue;

    // Check for temporal markers
    let hasTemporalMarker = false;
    let temporalMarker: string | undefined;

    for (const pattern of TEMPORAL_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        hasTemporalMarker = true;
        temporalMarker = match[0];
        break;
      }
    }

    // Check for character involvement
    const involvedCharacters: string[] = [];
    for (const char of MAIN_CHARACTERS) {
      if (text.toLowerCase().includes(char.toLowerCase())) {
        involvedCharacters.push(char);
      }
    }

    // Only include blocks with temporal markers AND character involvement
    if (hasTemporalMarker && involvedCharacters.length > 0) {
      // Create a unique key to avoid duplicates
      const eventKey = text.substring(0, 100).toLowerCase();
      if (seenEvents.has(eventKey)) continue;
      seenEvents.add(eventKey);

      // Determine placement based on timeline anchors
      let placement: 'placed' | 'unplaced' = 'unplaced';
      let suggestedPosition: string | undefined;

      for (const anchor of TIMELINE_ANCHORS) {
        if (text.toLowerCase().includes(anchor.marker.toLowerCase())) {
          placement = 'placed';
          suggestedPosition = `Chapter ${anchor.chapter}: ${anchor.event}`;
          break;
        }
      }

      events.push({
        description: extractEventDescription(text),
        source: block.document.fileName,
        blockIndex: block.blockIndex,
        temporalMarker,
        characters: involvedCharacters,
        placement,
        suggestedPosition,
        rawContext: text.substring(0, 300),
      });
    }
  }

  console.log(`Found ${events.length} potential timeline events.\n`);

  // Clear existing events and create new ones
  await prisma.event.deleteMany({ where: { projectId: project.id } });

  // Create events in database
  const placedEvents = events.filter(e => e.placement === 'placed');
  const unplacedEvents = events.filter(e => e.placement === 'unplaced');

  console.log('='.repeat(80));
  console.log('PLACED EVENTS (matched to Book 1 timeline)');
  console.log('='.repeat(80));

  let eventOrder = 1;
  for (const event of placedEvents.slice(0, 50)) {
    await prisma.event.create({
      data: {
        projectId: project.id,
        name: event.description.substring(0, 100),
        description: event.rawContext,
        timelineRef: event.suggestedPosition || 'Unknown',
        timelineSort: eventOrder++,
        tags: JSON.stringify({ type: 'story_beat', characters: event.characters }),
      },
    });

    console.log(`\n[${event.suggestedPosition || 'Position TBD'}]`);
    console.log(`  Characters: ${event.characters.join(', ')}`);
    console.log(`  Source: ${event.source} (block ${event.blockIndex})`);
    console.log(`  "${event.description}"`);
  }

  console.log('\n\n' + '='.repeat(80));
  console.log('UNPLACED EVENTS (need timeline positioning)');
  console.log('='.repeat(80));
  console.log('\nThese events were found but need to be placed in the story timeline.\n');

  for (const event of unplacedEvents.slice(0, 100)) {
    await prisma.event.create({
      data: {
        projectId: project.id,
        name: `[UNPLACED] ${event.description.substring(0, 80)}`,
        description: event.rawContext,
        timelineRef: 'NEEDS PLACEMENT',
        timelineSort: eventOrder++,
        tags: JSON.stringify({ type: 'unplaced', characters: event.characters }),
      },
    });

    console.log(`\n[UNPLACED - ${event.source}]`);
    console.log(`  Temporal marker: ${event.temporalMarker || 'none'}`);
    console.log(`  Characters: ${event.characters.join(', ')}`);
    console.log(`  "${event.description}"`);
  }

  // Output summary
  console.log('\n\n' + '='.repeat(80));
  console.log('TIMELINE SUMMARY');
  console.log('='.repeat(80));
  console.log(`
Total events found: ${events.length}
Placed events: ${placedEvents.length}
Unplaced events: ${unplacedEvents.length}

BOOK 1 TIMELINE STRUCTURE:
--------------------------
Chapter 1: The Call (2:17 AM - London data breach)
Chapter 2: The Five Foot World (Jasper's crisis management)
Chapter 3: The Pivot (Elena's medical emergency)
Chapter 4: Walls Come Down (Hospital stay)
Chapter 5: Finding Ground (Elena's recovery)
Chapter 6: Five Feet Apart (Grace asks the question)
Chapter 7: New Formations (BSS leadership transition)
Chapter 8: The Wives Club (Social dynamics)
Chapter 9: Coming Home (Family reconciliation)
Chapter 10: The Big Party (Resolution)

View unplaced events in the Timeline page at http://localhost:3000/timeline
Filter by type "unplaced" to see events needing positioning.
`);
}

function extractEventDescription(text: string): string {
  // Try to extract a meaningful event description
  const sentences = text.split(/[.!?]+/);

  // Find the most event-like sentence
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length > 20 && trimmed.length < 200) {
      // Check if it contains action verbs
      if (/\b(went|came|said|told|asked|arrived|called|found|saw|heard|felt|started|began|ended|finished|opened|closed|walked|ran|drove)\b/i.test(trimmed)) {
        return trimmed;
      }
    }
  }

  // Fallback to first meaningful sentence
  const firstSentence = sentences[0]?.trim();
  return firstSentence && firstSentence.length > 10
    ? firstSentence.substring(0, 150)
    : text.substring(0, 150);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
