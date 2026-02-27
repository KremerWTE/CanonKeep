import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Comprehensive timeline events for the Jasper Barrett Series
// Based on actual chapter structure from Book 1 (44 chapters) and Book 2 (26 chapters)

interface TimelineEvent {
  name: string;
  description: string;
  timelineRef: string;
  book: number;
  chapter?: number;
  category: 'crisis' | 'family' | 'relationship' | 'career' | 'medical' | 'celebration' | 'backstory';
  characters: string[];
}

const timelineEvents: TimelineEvent[] = [
  // ============================================
  // PRE-BOOK 1 - BACKSTORY EVENTS
  // ============================================
  {
    name: "Addison's First Transformation",
    description: "Pre-Book 1: Elena, Harper, and the wives' circle transform Addison from 'hippie' to polished coordinator. My Fair Lady Phase 1.",
    timelineRef: 'Pre-Book 1',
    book: 0,
    category: 'career',
    characters: ['Addison', 'Elena Barrett', 'Harper']
  },
  {
    name: "Claire's Olympic Dreams End",
    description: "Claire Ashford, Division I swimmer and Olympic hopeful, blows out her shoulder junior year at age 20. Dark year follows.",
    timelineRef: 'Pre-Book 1 (Claire backstory)',
    book: 0,
    category: 'backstory',
    characters: ['Claire Ashford']
  },
  {
    name: "Claire Becomes Ironman Champion",
    description: "Four years after her injury, Claire wins Ironman World Championship in Kona. Realizes understanding the mental game, not winning, is her calling.",
    timelineRef: 'Pre-Book 1 (Claire backstory)',
    book: 0,
    category: 'backstory',
    characters: ['Claire Ashford']
  },
  {
    name: "Claire's Pentagon Career",
    description: "Claire completes PhD at Stanford, begins consulting for SEAL Team Six/DEVGRU. Spends decade with Fortune 100 CEOs.",
    timelineRef: 'Pre-Book 1 (Claire backstory)',
    book: 0,
    category: 'career',
    characters: ['Claire Ashford']
  },

  // ============================================
  // BOOK 1 - FIVE FEET FROM HOME
  // ============================================
  // Part 1: The Crisis
  {
    name: 'The 2:17 AM Call',
    description: 'London data breach. Jasper snaps into operational mode, assembling team and flying out before dawn.',
    timelineRef: 'Book 1, Chapter 1',
    book: 1,
    chapter: 1,
    category: 'crisis',
    characters: ['Jasper Barrett']
  },
  {
    name: 'War Room - London',
    description: 'Jasper handles high-pressure executives, dictates media strategy, firefights misinformation. In his element.',
    timelineRef: 'Book 1, Chapter 2',
    book: 1,
    chapter: 2,
    category: 'crisis',
    characters: ['Jasper Barrett']
  },
  {
    name: "Elena's Collapse",
    description: 'Brief stop at home. Elena collapses at dinner table - sudden medical emergency. Jasper\'s crisis instincts kick in for family.',
    timelineRef: 'Book 1, Chapter 3',
    book: 1,
    chapter: 3,
    category: 'medical',
    characters: ['Jasper Barrett', 'Elena Barrett']
  },
  {
    name: 'Hospital Vigil Begins',
    description: "Jasper at Elena's bedside. Flashbacks to their dating life weave through present-day hospital scenes.",
    timelineRef: 'Book 1, Chapter 4',
    book: 1,
    chapter: 4,
    category: 'medical',
    characters: ['Jasper Barrett', 'Elena Barrett']
  },
  {
    name: "Grace's Question: 'Our Team'",
    description: 'Grace asks Jasper over hot chocolate: "Daddy, are you on our team now?" The question haunts him through every crisis.',
    timelineRef: 'Book 1, Chapter 5',
    book: 1,
    chapter: 5,
    category: 'family',
    characters: ['Jasper Barrett', 'Grace']
  },
  {
    name: 'Project Wildcard Begins',
    description: 'Harper arrives with high-stakes private aerospace crisis. Alexandria introduced - silk blouse, Chanel No. 5, flirtatious asides.',
    timelineRef: 'Book 1, Chapter 7',
    book: 1,
    chapter: 7,
    category: 'crisis',
    characters: ['Jasper Barrett', 'Harper', 'Alexandria']
  },
  {
    name: "Alexandria's Escalation",
    description: "Alexandria tests boundaries - calculated vulnerability, late-night texts, near-naked selfie. Jasper deletes without responding.",
    timelineRef: 'Book 1, Chapter 10',
    book: 1,
    chapter: 10,
    category: 'relationship',
    characters: ['Jasper Barrett', 'Alexandria']
  },
  {
    name: "Elena's Relapse",
    description: "Elena's condition worsens. Boardroom empties, only Alexandria and Jasper remain. He chooses Elena - runs to hospital.",
    timelineRef: 'Book 1, Chapter 11',
    book: 1,
    chapter: 11,
    category: 'medical',
    characters: ['Jasper Barrett', 'Elena Barrett', 'Alexandria']
  },
  {
    name: 'The Line in the Floor',
    description: "Waiting room vigil. Doctor delivers news: 'She's stable.' Jasper deletes Asia itinerary. Deletes Alexandria's contact. Choice made.",
    timelineRef: 'Book 1, Chapter 12',
    book: 1,
    chapter: 12,
    category: 'family',
    characters: ['Jasper Barrett', 'Elena Barrett']
  },
  {
    name: "The Wives' Circle Zoom Call",
    description: 'Elena on Zoom with five wives: Caroline, Ronnie, Julia, Savannah, Madison. They give advice on reconnecting with Jasper.',
    timelineRef: 'Book 1, Chapter 15',
    book: 1,
    chapter: 15,
    category: 'relationship',
    characters: ['Elena Barrett', 'Caroline Whitmore', 'Ronnie Blake', 'Julia Raines', 'Savannah Cole', 'Madison Lowe']
  },
  {
    name: 'Elena Cleared for Full Activity',
    description: "PT clears Elena. She teases Jasper: 'Full means everything.' Sexual tension builds. Confidence returning.",
    timelineRef: 'Book 1, Chapter 17',
    book: 1,
    chapter: 17,
    category: 'relationship',
    characters: ['Jasper Barrett', 'Elena Barrett']
  },
  {
    name: 'Color Returns',
    description: 'Elena embraces color in her outfits, reclaims space in the home. Visual marker of transformation.',
    timelineRef: 'Book 1, Chapter 20',
    book: 1,
    chapter: 20,
    category: 'relationship',
    characters: ['Elena Barrett']
  },
  {
    name: 'Jasper & Elena Reconnect',
    description: "Evening at Oak Watch. Elena uses wives' advice. Tender, intimate moment. Three years of distance beginning to close.",
    timelineRef: 'Book 1, Chapter 21',
    book: 1,
    chapter: 21,
    category: 'relationship',
    characters: ['Jasper Barrett', 'Elena Barrett']
  },
  {
    name: 'The Cookie Circuit',
    description: "Thank-you party. Grace delivers cookies with Miss Evie's recipe. Teachers Evie and Maggie chat with Elena and Sara as friends.",
    timelineRef: 'Book 1, Chapter 41',
    book: 1,
    chapter: 41,
    category: 'celebration',
    characters: ['Grace', 'Addison', 'Evie', 'Maggie Donnelly', 'Elena Barrett', 'Sara']
  },
  {
    name: 'Book 1 Finale - Celebration',
    description: 'The big party celebrating the end of crises and Elena\'s recovery. Family and BSS team together.',
    timelineRef: 'Book 1, Chapter 44',
    book: 1,
    chapter: 44,
    category: 'celebration',
    characters: ['Jasper Barrett', 'Elena Barrett', 'Grace', 'Addison', 'Harper']
  },

  // ============================================
  // BOOK 2 - NEW SEASON
  // ============================================
  {
    name: 'Claire Ashford Joins BSS',
    description: "Jasper hires Claire through Pentagon contact. Olympic hopeful turned Ironman Champion turned performance coach. 'She makes elite performers sustainable.'",
    timelineRef: 'Book 2, Chapter 1',
    book: 2,
    chapter: 1,
    category: 'career',
    characters: ['Jasper Barrett', 'Claire Ashford']
  },
  {
    name: 'Kendra Introduced at Pool Party',
    description: "Sara's pool/BBQ. Kendra, Dylan, Tasha, Eli introduced. Kendra and Addison click immediately. Elena notices their chemistry.",
    timelineRef: 'Book 2, Chapter 3',
    book: 2,
    chapter: 3,
    category: 'relationship',
    characters: ['Kendra', 'Addison', 'Elena Barrett', 'Sara']
  },
  {
    name: "Addison Recruits Kendra as 'Joint Trainer'",
    description: "Wives' Circle rooftop lunch. Addison announces Kendra is now their joint trainer. Elena feels flicker of being replaced.",
    timelineRef: 'Book 2, Chapter 4',
    book: 2,
    chapter: 4,
    category: 'relationship',
    characters: ['Addison', 'Kendra', 'Elena Barrett']
  },
  {
    name: 'Pregnancy Revealed',
    description: "Shower intimacy between Elena & Jasper. They've been trying for baby #2... and it's happened.",
    timelineRef: 'Book 2, Chapter 5',
    book: 2,
    chapter: 5,
    category: 'family',
    characters: ['Jasper Barrett', 'Elena Barrett']
  },
  {
    name: "Kendra's Regional Competition",
    description: "Kendra competes in CrossFit regionals. Addison away on work trip. Elena goes to support, they bond over dinner.",
    timelineRef: 'Book 2, Chapter 7',
    book: 2,
    chapter: 7,
    category: 'relationship',
    characters: ['Kendra', 'Elena Barrett']
  },
  {
    name: "Claire's Assessment",
    description: "Claire reflects on her journey: Olympic dreams, Kona victory, understanding the mental game. Identifies Jasper's blind spots, Harper's fractured focus, Addison's potential.",
    timelineRef: 'Book 2, Chapter 8',
    book: 2,
    chapter: 8,
    category: 'career',
    characters: ['Claire Ashford', 'Jasper Barrett', 'Harper', 'Addison']
  },
  {
    name: 'Harper Introduces Ethan (Private Dinner)',
    description: 'Harper introduces Ethan to Jasper and Elena - private dinner, just the four. Jasper skeptical but polite. Rest of circle won\'t meet him until wedding.',
    timelineRef: 'Book 2, Chapter 9',
    book: 2,
    chapter: 9,
    category: 'relationship',
    characters: ['Harper', 'Ethan', 'Jasper Barrett', 'Elena Barrett']
  },
  {
    name: "Claire's Intervention with Harper",
    description: "Claire pulls Harper in after missed deadline. Harper admits struggling to balance Ethan and work. Claire shares her own story of losing herself in a relationship. Weekly sessions begin.",
    timelineRef: 'Book 2, Chapter 11',
    book: 2,
    chapter: 11,
    category: 'career',
    characters: ['Claire Ashford', 'Harper']
  },
  {
    name: 'Kendra Wins Games Division',
    description: "Big celebration. Even Jasper toasts her. Elena: 'We're stealing her for the office full-time.' Addison and Kendra inseparable.",
    timelineRef: 'Book 2, Chapter 12',
    book: 2,
    chapter: 12,
    category: 'celebration',
    characters: ['Kendra', 'Jasper Barrett', 'Elena Barrett', 'Addison']
  },
  {
    name: "Claire Identifies Addison's Fixer Instinct",
    description: "Claire observes Addison reading rooms, anticipating problems. Compares her to best DEVGRU operators. 'Jasper's brilliant at the fix. You could be brilliant at the prevent.' Training begins.",
    timelineRef: 'Book 2, Chapter 14',
    book: 2,
    chapter: 14,
    category: 'career',
    characters: ['Claire Ashford', 'Addison']
  },
  {
    name: 'Harper & Ethan Engagement Announced',
    description: "Engagement announcement same week as Elena's pregnancy news. NFL agent joins team part-time. Kendra nails sports sponsorship deal.",
    timelineRef: 'Book 2, Chapter 15',
    book: 2,
    chapter: 15,
    category: 'celebration',
    characters: ['Harper', 'Ethan', 'Elena Barrett', 'Kendra']
  },
  {
    name: 'Finding Their Footing',
    description: "Harper regains focus. Addison nails mock crisis scenario. Claire to Jasper: 'Addison thinks like us. Maybe better.' Jasper: 'Elena saw it first.'",
    timelineRef: 'Book 2, Chapter 16',
    book: 2,
    chapter: 16,
    category: 'career',
    characters: ['Claire Ashford', 'Harper', 'Addison', 'Jasper Barrett']
  },
  {
    name: "Addison's Trial by Fire",
    description: 'Addison runs point on NFL media coordination - proves she can handle heat. Harper drops ball but recovers using Claire\'s techniques.',
    timelineRef: 'Book 2, Chapter 18',
    book: 2,
    chapter: 18,
    category: 'career',
    characters: ['Addison', 'Harper']
  },
  {
    name: 'Lucas Barrett Born',
    description: "Elena goes into labor. Jasper races from The Forge. Lucas Barrett is born. Grace meets her baby brother. Addison squeezes Elena's hand.",
    timelineRef: 'Book 2, Chapters 19-20',
    book: 2,
    chapter: 20,
    category: 'family',
    characters: ['Lucas', 'Jasper Barrett', 'Elena Barrett', 'Grace', 'Addison']
  },
  {
    name: 'Party Prep Night - Addison & Kendra',
    description: "Night before wedding. Addison & Kendra steaming dresses in matching silk robes, lingerie. They start kissing. Elena walks in, smiles: 'Finish the dresses before the after-party.'",
    timelineRef: 'Book 2, Chapter 21',
    book: 2,
    chapter: 21,
    category: 'relationship',
    characters: ['Addison', 'Kendra', 'Elena Barrett']
  },
  {
    name: 'The Threesome',
    description: 'After Grace is asleep. Elena initiates with Addison - culmination of trust built through hospital visits, Grace, everything. One night of connection. Kendra knows, gives them space.',
    timelineRef: 'Book 2, Chapter 22',
    book: 2,
    chapter: 22,
    category: 'relationship',
    characters: ['Jasper Barrett', 'Elena Barrett', 'Addison']
  },
  {
    name: 'Addison Promoted to Junior Strategist',
    description: "Morning after. Jasper promotes Addison at breakfast: 'You've proven yourself. This is official.' Earned through work, sealed by trust.",
    timelineRef: 'Book 2, Chapter 23',
    book: 2,
    chapter: 23,
    category: 'career',
    characters: ['Jasper Barrett', 'Addison']
  },
  {
    name: 'Wedding Weekend',
    description: 'First Wives Club wedding. Harper radiant as maid of honor. Elena with baby Lucas. Addison in pastel yellow, Kendra in mint-green. Everyone meets Ethan.',
    timelineRef: 'Book 2, Chapter 24',
    book: 2,
    chapter: 24,
    category: 'celebration',
    characters: ['Harper', 'Ethan', 'Elena Barrett', 'Lucas', 'Addison', 'Kendra']
  },
  {
    name: "Lucas's Baptism",
    description: "Same church - sacred calm after wedding chaos. Lucas's baptism. Addison and Kendra help dress Grace. Family surrounded by chosen circle.",
    timelineRef: 'Book 2, Chapter 25',
    book: 2,
    chapter: 25,
    category: 'family',
    characters: ['Lucas', 'Jasper Barrett', 'Elena Barrett', 'Grace', 'Addison', 'Kendra']
  },
  {
    name: 'Claire Signs On for Year Two',
    description: "Claire turns down three Fortune 100 offers. 'You're the first one I've seen running toward something.' BSS is different - Jasper chose family and it made him better.",
    timelineRef: 'Book 2, Chapter 26',
    book: 2,
    chapter: 26,
    category: 'career',
    characters: ['Claire Ashford', 'Jasper Barrett']
  },
  {
    name: 'Seeds Planted for Book 3',
    description: "Closing Circles. Jasper to Harper about Kendra: 'She's not you or Addison, but she's calculated. We can use that.' Addison catches Claire's eye - nod of recognition.",
    timelineRef: 'Book 2, Chapter 26',
    book: 2,
    chapter: 26,
    category: 'career',
    characters: ['Jasper Barrett', 'Harper', 'Kendra', 'Addison', 'Claire Ashford']
  },
];

async function main() {
  console.log('Building comprehensive timeline from Book 1 & Book 2 chapters...\n');

  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // Clear existing events
  await prisma.event.deleteMany({ where: { projectId: project.id } });
  console.log('Cleared existing timeline events.\n');

  // Get characters for linking
  const characters = await prisma.character.findMany({
    where: { projectId: project.id }
  });
  const characterMap = new Map(characters.map(c => [c.name.toLowerCase(), c.id]));

  // Create events
  let sortOrder = 1;

  const categoryColors: Record<string, string> = {
    crisis: 'red',
    family: 'blue',
    relationship: 'pink',
    career: 'green',
    medical: 'orange',
    celebration: 'purple',
    backstory: 'gray'
  };

  for (const event of timelineEvents) {
    const createdEvent = await prisma.event.create({
      data: {
        projectId: project.id,
        name: event.name,
        description: event.description,
        timelineRef: event.timelineRef,
        timelineSort: sortOrder++,
        tags: JSON.stringify({
          book: event.book,
          chapter: event.chapter,
          category: event.category,
          color: categoryColors[event.category]
        }),
      },
    });

    // Link characters
    for (const charName of event.characters) {
      const charId = characterMap.get(charName.toLowerCase());
      if (charId) {
        await prisma.eventCharacter.create({
          data: {
            eventId: createdEvent.id,
            characterId: charId,
          },
        }).catch(() => {}); // Ignore if already linked
      }
    }

    console.log(`[${event.timelineRef}] ${event.name}`);
    console.log(`  Category: ${event.category} | Characters: ${event.characters.join(', ')}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('TIMELINE SUMMARY');
  console.log('='.repeat(80));

  const backstoryEvents = timelineEvents.filter(e => e.book === 0);
  const book1Events = timelineEvents.filter(e => e.book === 1);
  const book2Events = timelineEvents.filter(e => e.book === 2);

  console.log(`
Total Events: ${timelineEvents.length}
- Pre-Book 1 (Backstory): ${backstoryEvents.length}
- Book 1 (Five Feet From Home): ${book1Events.length}
- Book 2 (New Season): ${book2Events.length}

Categories:
- Crisis: ${timelineEvents.filter(e => e.category === 'crisis').length}
- Family: ${timelineEvents.filter(e => e.category === 'family').length}
- Relationship: ${timelineEvents.filter(e => e.category === 'relationship').length}
- Career: ${timelineEvents.filter(e => e.category === 'career').length}
- Medical: ${timelineEvents.filter(e => e.category === 'medical').length}
- Celebration: ${timelineEvents.filter(e => e.category === 'celebration').length}
- Backstory: ${timelineEvents.filter(e => e.category === 'backstory').length}

View at: http://localhost:3004/timeline
`);

  await prisma.$disconnect();
}

main().catch(console.error);
