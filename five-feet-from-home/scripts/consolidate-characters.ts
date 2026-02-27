/**
 * Consolidate character information from all documents
 * Creates canonical character profiles by combining scattered information
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Main characters to search for based on the story
const MAIN_CHARACTERS = [
  'Jasper Barrett',
  'Elena Barrett',
  'Elena Davenport',
  'Grace Barrett',
  'Lucas Barrett',
  'Addie',
  'Addison Price',
  'Hawk',
  'Ethan Cole',
  'Harper',
  'Kendra',
  'Bella',
  'Ridge',
  'Mason',
  'Chris',
  'Jessica',
  'Evie',
  'Sofia',
  'Maddie',
  'Isabella',
  'Izzy',
  'Selene',
  'Daniel',
  'Matt',
  'Cam',
  'Riley',
  'Caroline',
  'Lexi',
];

interface CharacterInfo {
  name: string;
  mentions: number;
  details: {
    source: string;
    text: string;
  }[];
  attributes: Record<string, string[]>;
}

async function main() {
  const characters: Map<string, CharacterInfo> = new Map();

  // Initialize character map
  for (const name of MAIN_CHARACTERS) {
    characters.set(name.toLowerCase(), {
      name,
      mentions: 0,
      details: [],
      attributes: {
        role: [],
        age: [],
        background: [],
        personality: [],
        relationships: [],
        career: [],
        arc: [],
      },
    });
  }

  // Get all content blocks
  const blocks = await prisma.contentBlock.findMany({
    include: { document: true },
    orderBy: { blockIndex: 'asc' },
  });

  console.log(`Searching ${blocks.length} content blocks...\n`);

  // Search each block for character mentions
  for (const block of blocks) {
    const text = block.rawText.toLowerCase();
    const docName = block.document.fileName;

    for (const [key, char] of Array.from(characters.entries())) {
      // Search for character name (case insensitive)
      const nameVariants = [char.name.toLowerCase()];

      // Add first name variant
      if (char.name.includes(' ')) {
        nameVariants.push(char.name.split(' ')[0].toLowerCase());
      }

      for (const variant of nameVariants) {
        if (text.includes(variant)) {
          char.mentions++;

          // Extract context around the mention
          const fullText = block.rawText;

          // Look for key attribute patterns
          extractAttributes(fullText, char);

          // Store significant details (longer content blocks)
          if (fullText.length > 100 && !char.details.some(d => d.text === fullText)) {
            char.details.push({
              source: docName,
              text: fullText.substring(0, 500),
            });
          }
          break; // Count once per block
        }
      }
    }
  }

  // Output consolidated character profiles
  console.log('='.repeat(80));
  console.log('CANONICAL CHARACTER PROFILES - Five Feet From Home');
  console.log('='.repeat(80));

  const sortedChars = Array.from(characters.values())
    .filter(c => c.mentions > 10)
    .sort((a, b) => b.mentions - a.mentions);

  for (const char of sortedChars) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`CHARACTER: ${char.name.toUpperCase()}`);
    console.log(`Mentions: ${char.mentions}`);
    console.log(`${'─'.repeat(60)}`);

    // Dedupe and output attributes
    for (const [attrName, values] of Object.entries(char.attributes)) {
      const uniqueValues = Array.from(new Set(values)).filter(v => v.length > 0);
      if (uniqueValues.length > 0) {
        console.log(`\n${attrName.toUpperCase()}:`);
        for (const v of uniqueValues.slice(0, 5)) {
          console.log(`  • ${v}`);
        }
      }
    }

    // Show key details
    if (char.details.length > 0) {
      console.log(`\nKEY DETAILS:`);
      const uniqueSources = Array.from(new Set(char.details.map(d => d.source)));
      for (const source of uniqueSources.slice(0, 3)) {
        const detail = char.details.find(d => d.source === source);
        if (detail) {
          console.log(`\n  [${source}]`);
          console.log(`  ${detail.text.substring(0, 300)}...`);
        }
      }
    }
  }

  // Output Canon Summary
  console.log('\n\n' + '='.repeat(80));
  console.log('STORY CANON SUMMARY');
  console.log('='.repeat(80));

  console.log(`
SETTING: Contemporary drama/romance
MAIN PROTAGONIST: Jasper Barrett - Corporate crisis manager

CORE FAMILY:
  • Jasper Barrett - Crisis manager, workaholic with family anchor
  • Elena Barrett (née Davenport) - Jasper's wife, central female lead
  • Grace Barrett - Daughter (7 years old), modeled after Jamie Scott (OTH)
  • Lucas Barrett - Newborn son

KEY SUPPORTING CHARACTERS:
  • Addie (Addison Price) - Jasper's right hand, transitions to strategist
  • Hawk (Ethan Cole) - Former military, Head of Security
  • Harper - Senior strategist, COO transition storyline
  • Kendra - Analyst, championship/working mother arc
  • Bella - Connected to Matt, charity/mentorship focus
  • Ridge - Former SEAL Team Six, BSS operator
  • Mason - Jasper's mentor/truth-telling friend
  • Jessica - Early mentor to Jasper, retired

ORGANIZATION:
  • BSS (Barrett Strategic Solutions) - Jasper's crisis management firm
  • The Wives Club - Elite social circle
  • POH - Related organization

BOOK 1 ARC:
  • Opens: 2:17 AM call - London data breach crisis
  • Jasper's "Five Foot World" mindset - focused only on immediate crisis
  • Elena's medical emergency pivots story to love/family focus
  • Builds to: Big Party at Jasper & Elena's house
`);
}

function extractAttributes(text: string, char: CharacterInfo) {
  // Extract age
  const ageMatch = text.match(/(?:age|years old)[:\s]+(\d+|early \d+s|late \d+s|mid-\d+s)/i);
  if (ageMatch) char.attributes.age.push(ageMatch[1]);

  // Extract role/job
  const rolePatterns = [
    /(?:role|job|position|career|profession)[:\s]+([^.]+)/i,
    /(?:works as|serves as|is a|is the)[:\s]+([^.]+)/i,
  ];
  for (const pattern of rolePatterns) {
    const match = text.match(pattern);
    if (match && match[1].length < 100) {
      char.attributes.role.push(match[1].trim());
    }
  }

  // Extract relationships
  const relPatterns = [
    /(?:married to|wife of|husband of|dating|engaged to)[:\s]+([^.]+)/i,
    /(?:mentor|mentors|mentored by)[:\s]+([^.]+)/i,
    /(?:sister|brother|father|mother|daughter|son) of[:\s]+([^.]+)/i,
  ];
  for (const pattern of relPatterns) {
    const match = text.match(pattern);
    if (match && match[1].length < 100) {
      char.attributes.relationships.push(match[1].trim());
    }
  }

  // Extract personality/traits
  const traitPatterns = [
    /(?:personality|traits?|character)[:\s]+([^.]+)/i,
    /(?:is|are) (?:known for|characterized by)[:\s]+([^.]+)/i,
  ];
  for (const pattern of traitPatterns) {
    const match = text.match(pattern);
    if (match && match[1].length < 150) {
      char.attributes.personality.push(match[1].trim());
    }
  }

  // Extract background
  const bgPatterns = [
    /(?:background|backstory|history)[:\s]+([^.]+)/i,
    /(?:former|previously|used to)[:\s]+([^.]+)/i,
  ];
  for (const pattern of bgPatterns) {
    const match = text.match(pattern);
    if (match && match[1].length < 150) {
      char.attributes.background.push(match[1].trim());
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
