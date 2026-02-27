/**
 * Export Character Bible - Full details per character card
 * Generates a comprehensive character reference document
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface CharacterCard {
  name: string;
  archetype: string;
  age: string;
  aliases: string[];
  background: string;
  motivations: string;
  fears: string;
  flaw: string;
  secrets: string;
  voiceNotes: string;
  appearance: string;
  arc: string;
  relationships: {
    type: string;
    relatedTo: string;
    description: string;
  }[];
  storylines: string[];
}

async function main() {
  console.log('Exporting Character Bible...\n');

  const project = await prisma.project.findFirst({
    where: { name: 'Five Feet From Home' },
  });

  if (!project) {
    console.log('Project not found. Run create-canon.ts first.');
    return;
  }

  // Get all characters with relationships
  const characters = await prisma.character.findMany({
    where: { projectId: project.id },
    include: {
      relationshipsFrom: {
        include: { toCharacter: true },
      },
      relationshipsTo: {
        include: { fromCharacter: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  // Get book and chapter info
  const book = await prisma.book.findFirst({
    where: { projectId: project.id },
    include: { chapters: { orderBy: { number: 'asc' } } },
  });

  // Build character cards
  const cards: CharacterCard[] = [];

  for (const char of characters) {
    const aliases = char.aliases ? JSON.parse(char.aliases) : [];

    // Combine relationships from both directions
    const relationships: CharacterCard['relationships'] = [];

    for (const rel of char.relationshipsFrom) {
      relationships.push({
        type: rel.relationshipType,
        relatedTo: rel.toCharacter.name,
        description: rel.description || '',
      });
    }

    for (const rel of char.relationshipsTo) {
      relationships.push({
        type: rel.relationshipType + ' (reverse)',
        relatedTo: rel.fromCharacter.name,
        description: rel.description || '',
      });
    }

    // Determine storylines based on archetype and background
    const storylines: string[] = [];
    const bg = (char.background || '').toLowerCase();
    const arc = ((char.arcStart || '') + ' ' + (char.arcChange || '') + ' ' + (char.arcEnd || '')).toLowerCase();

    if (bg.includes('bss') || bg.includes('crisis')) storylines.push('BSS Operations');
    if (bg.includes('poh') || bg.includes('order')) storylines.push('POH/Orders');
    if (bg.includes('wives club')) storylines.push('Wives Club');
    if (arc.includes('family') || arc.includes('marriage')) storylines.push('Family Drama');
    if (arc.includes('leadership') || arc.includes('coo') || arc.includes('transition')) storylines.push('Leadership Transition');
    if (arc.includes('romance') || arc.includes('love')) storylines.push('Romance');
    if (char.archetype?.includes('Child')) storylines.push('Next Generation');

    cards.push({
      name: char.name,
      archetype: char.archetype || 'Supporting',
      age: char.age || 'Unknown',
      aliases,
      background: char.background || 'No background available',
      motivations: char.motivations || 'Not specified',
      fears: char.fears || 'Not specified',
      flaw: char.flaw || 'Not specified',
      secrets: char.secrets || 'Not specified',
      voiceNotes: char.voiceNotes || 'Not specified',
      appearance: char.appearance || 'Not specified',
      arc: (char.arcStart || char.arcChange || char.arcEnd) ? `${char.arcStart || ''} → ${char.arcChange || ''} → ${char.arcEnd || ''}`.trim() : 'Not specified',
      relationships,
      storylines,
    });
  }

  // Generate Markdown output
  let markdown = `# Five Feet From Home - Character Bible

Generated: ${new Date().toISOString().split('T')[0]}

---

## Quick Reference

| Character | Archetype | Age | Storylines |
|-----------|-----------|-----|------------|
`;

  for (const card of cards) {
    markdown += `| ${card.name} | ${card.archetype} | ${card.age} | ${card.storylines.join(', ') || 'General'} |\n`;
  }

  markdown += `\n---\n\n`;

  // Group by archetype
  const byArchetype: Record<string, CharacterCard[]> = {};
  for (const card of cards) {
    const arch = card.archetype || 'Other';
    if (!byArchetype[arch]) byArchetype[arch] = [];
    byArchetype[arch].push(card);
  }

  const archetypeOrder = [
    'Protagonist',
    'Protagonist Partner',
    'Child',
    'Second Lead',
    'Supporting - BSS Leadership',
    'Supporting - BSS Security',
    'Supporting',
    'Recurring',
    'Minor',
  ];

  for (const archetype of archetypeOrder) {
    const chars = byArchetype[archetype];
    if (!chars || chars.length === 0) continue;

    markdown += `## ${archetype}\n\n`;

    for (const card of chars) {
      markdown += generateCharacterCard(card);
    }
  }

  // Add storyline reference
  markdown += `\n---\n\n## Storyline Reference\n\n`;

  if (book) {
    markdown += `### Book 1: ${book.title}\n\n`;
    markdown += `**Subtitle:** ${book.subtitle || 'Not specified'}\n\n`;
    markdown += `**Synopsis:** ${book.synopsis || 'Not specified'}\n\n`;

    markdown += `#### Chapters\n\n`;
    for (const ch of book.chapters) {
      markdown += `**Chapter ${ch.number}: ${ch.title}**\n`;
      markdown += `- POV: ${ch.pov || 'Various'}\n`;
      markdown += `- Synopsis: ${ch.synopsis || 'Not specified'}\n\n`;
    }
  }

  // Add relationship map
  markdown += `\n---\n\n## Relationship Map\n\n`;
  markdown += `### Core Family (Barrett)\n\n`;
  markdown += `\`\`\`
                    JASPER ──── ELENA
                       │           │
              ┌────────┴───────────┘
              │                   │
            GRACE              LUCAS
            (7 yrs)          (newborn)
\`\`\`\n\n`;

  markdown += `### BSS Leadership\n\n`;
  markdown += `\`\`\`
                    JASPER (CEO)
                         │
         ┌───────────────┼───────────────┐
         │               │               │
      ADDIE          HARPER          KENDRA
   (Right Hand)    (Sr. Strategist)  (Analyst)
         │
     ┌───┴───┐
   HAWK    RIDGE
  (Head Security) (Operator)
\`\`\`\n\n`;

  markdown += `### Romantic Connections\n\n`;
  markdown += `\`\`\`
  Jasper ❤️ Elena
  Addie ❤️ Hawk
  Bella ❤️ Matt
  Kendra ❤️ Chris
  Ridge ❤️ [TBD]
\`\`\`\n\n`;

  // Write files
  const outputDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const mdPath = path.join(outputDir, 'character-bible.md');
  fs.writeFileSync(mdPath, markdown);
  console.log(`Markdown saved to: ${mdPath}`);

  // Also save JSON for programmatic access
  const jsonPath = path.join(outputDir, 'character-bible.json');
  fs.writeFileSync(jsonPath, JSON.stringify(cards, null, 2));
  console.log(`JSON saved to: ${jsonPath}`);

  console.log(`\n${'='.repeat(60)}`);
  console.log(`CHARACTER BIBLE EXPORT COMPLETE`);
  console.log(`${'='.repeat(60)}`);
  console.log(`
Characters exported: ${cards.length}
Formats: Markdown (.md) and JSON (.json)
Location: ./exports/

You can now:
1. Open character-bible.md in any markdown viewer
2. Import character-bible.json into other tools
3. View characters at http://localhost:3000/characters
`);
}

function generateCharacterCard(card: CharacterCard): string {
  let md = `### ${card.name}\n\n`;

  md += `| Field | Value |\n`;
  md += `|-------|-------|\n`;
  md += `| **Archetype** | ${card.archetype} |\n`;
  md += `| **Age** | ${card.age} |\n`;

  if (card.aliases.length > 0) {
    md += `| **Aliases** | ${card.aliases.join(', ')} |\n`;
  }

  md += `\n#### Background\n${card.background}\n\n`;

  md += `#### Character Traits\n`;
  md += `- **Motivations:** ${card.motivations}\n`;
  md += `- **Fears:** ${card.fears}\n`;
  md += `- **Fatal Flaw:** ${card.flaw}\n`;
  md += `- **Secrets:** ${card.secrets}\n`;

  if (card.appearance !== 'Not specified') {
    md += `\n#### Appearance\n${card.appearance}\n`;
  }

  if (card.voiceNotes !== 'Not specified') {
    md += `\n#### Voice & Mannerisms\n${card.voiceNotes}\n`;
  }

  md += `\n#### Character Arc\n${card.arc}\n`;

  if (card.relationships.length > 0) {
    md += `\n#### Relationships\n`;
    for (const rel of card.relationships) {
      md += `- **${rel.type}** → ${rel.relatedTo}`;
      if (rel.description) md += `: ${rel.description}`;
      md += `\n`;
    }
  }

  if (card.storylines.length > 0) {
    md += `\n#### Storylines\n`;
    for (const s of card.storylines) {
      md += `- ${s}\n`;
    }
  }

  md += `\n---\n\n`;
  return md;
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
