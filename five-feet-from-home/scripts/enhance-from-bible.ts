/**
 * Enhance database characters from character-bible.json
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface BibleCharacter {
  name: string;
  archetype?: string;
  age?: string;
  aliases?: string[];
  background?: string;
  motivations?: string;
  fears?: string;
  flaw?: string;
  secrets?: string;
  voiceNotes?: string;
  appearance?: string;
  arc?: string;
  relationships?: { relatedTo: string; description: string }[];
  storylines?: string[];
}

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  // Read character bible
  const biblePath = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\exports\\character-bible.json';
  const bibleData: BibleCharacter[] = JSON.parse(fs.readFileSync(biblePath, 'utf-8'));

  console.log(`Found ${bibleData.length} characters in bible\n`);

  let updated = 0;
  let created = 0;

  for (const char of bibleData) {
    // Try to find existing character
    let existing = await prisma.character.findFirst({
      where: {
        projectId: project.id,
        OR: [
          { name: char.name },
          { name: { contains: char.name.split(' ')[0] } },
        ],
      },
    });

    const updateData: any = {};

    // Only update fields that are empty in database
    if (char.archetype && !existing?.archetype) updateData.archetype = char.archetype;
    if (char.age && !existing?.age) updateData.age = char.age;
    if (char.background && !existing?.background) updateData.background = char.background;
    if (char.motivations && !existing?.motivations) updateData.motivations = char.motivations;
    if (char.fears && !existing?.fears) updateData.fears = char.fears;
    if (char.flaw && !existing?.flaw) updateData.flaw = char.flaw;
    if (char.secrets && !existing?.secrets) updateData.secrets = char.secrets;
    if (char.voiceNotes && !existing?.voiceNotes) updateData.voiceNotes = char.voiceNotes;
    if (char.appearance && !existing?.appearance) updateData.appearance = char.appearance;
    if (char.aliases && char.aliases.length > 0 && !existing?.aliases) {
      updateData.aliases = JSON.stringify(char.aliases);
    }
    if (char.relationships && char.relationships.length > 0 && !existing?.relationships) {
      updateData.relationships = char.relationships.map(r => `${r.relatedTo}: ${r.description}`).join('; ');
    }

    if (existing && Object.keys(updateData).length > 0) {
      await prisma.character.update({
        where: { id: existing.id },
        data: updateData,
      });
      console.log(`  Updated: ${char.name} (${Object.keys(updateData).length} fields)`);
      updated++;
    } else if (!existing) {
      // Create new character
      await prisma.character.create({
        data: {
          projectId: project.id,
          name: char.name,
          archetype: char.archetype,
          age: char.age,
          background: char.background,
          motivations: char.motivations,
          fears: char.fears,
          flaw: char.flaw,
          secrets: char.secrets,
          voiceNotes: char.voiceNotes,
          appearance: char.appearance,
          aliases: char.aliases ? JSON.stringify(char.aliases) : undefined,
          relationships: char.relationships?.map(r => `${r.relatedTo}: ${r.description}`).join('; '),
        },
      });
      console.log(`  Created: ${char.name}`);
      created++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Enhancement complete!`);
  console.log(`  Updated: ${updated} characters`);
  console.log(`  Created: ${created} characters`);
  console.log(`========================================`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
