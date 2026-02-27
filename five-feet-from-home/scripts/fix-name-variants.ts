import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== UPDATING NAME VARIANTS FOR BOOK 1 CHARACTERS ===\n');

  // Key Book 1 characters with name variant updates (only update existing records)
  const nameVariantUpdates = [
    {
      name: 'Harper Caldwell',
      nameVariants: 'Harper Vance, Harper Whitaker, Harper Ellis, Harper Montgomery, Harper Cole'
    },
    {
      name: 'Jessica Vaughn',
      nameVariants: 'Jessica Maddox, Jessica Hall'
    },
    {
      name: 'Alexandra Pierce',
      nameVariants: 'Alexandra Vance, Alex Vance, Alex Pierce'
    },
    {
      name: 'Mason Reilly',
      nameVariants: 'Mason Kane, Mason Ward, Mason Keating, Mason Price'
    },
    {
      name: 'Caroline Westbrook',
      nameVariants: 'Caroline Vance'
    },
    {
      name: 'Elena Barrett',
      nameVariants: 'Elena Rourke (early drafts)'
    },
    {
      name: 'Jasper Barrett',
      nameVariants: 'Jack Rourke (early drafts)'
    },
    {
      name: 'Rafe Moreno',
      nameVariants: 'Ethan Cross (code name)'
    },
    {
      name: 'Madison "Maddie" Cole',
      nameVariants: 'Maddie Cole'
    },
    {
      name: 'Chris Cole',
      nameVariants: 'Christopher Cole'
    }
  ];

  let updated = 0;

  for (const update of nameVariantUpdates) {
    const existing = await prisma.character.findFirst({
      where: {
        name: update.name,
        projectId: project.id
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: { nameVariants: update.nameVariants }
      });
      console.log(`Updated: ${update.name}`);
      console.log(`  Variants: ${update.nameVariants}\n`);
      updated++;
    } else {
      console.log(`Not found: ${update.name}`);
    }
  }

  console.log(`\nUpdated ${updated} characters with name variants`);

  // Show final state of key characters
  console.log('\n=== FINAL STATE OF BOOK 1 CORE CHARACTERS ===\n');

  const book1Names = [
    'Jasper Barrett', 'Elena Barrett', 'Grace Barrett',
    'Harper Caldwell', 'Addison Price', 'Jessica Vaughn',
    'Sara Whitaker', 'Alexandra Pierce', 'Mason Reilly',
    'Rafe Moreno', 'Caroline Westbrook', 'Madison "Maddie" Cole', 'Chris Cole'
  ];

  for (const name of book1Names) {
    const char = await prisma.character.findFirst({
      where: { name, projectId: project.id },
      select: {
        name: true,
        firstName: true,
        lastName: true,
        nameVariants: true,
        wardrobeStyle: true,
        appearance: true,
        personality: true,
        background: true
      }
    });

    if (char) {
      const hasWardrobe = char.wardrobeStyle ? 'Yes' : 'NO';
      const hasAppearance = char.appearance ? 'Yes' : 'NO';
      const hasPersonality = char.personality ? 'Yes' : 'NO';
      const hasBackground = char.background ? 'Yes' : 'NO';

      console.log(`${char.name}`);
      console.log(`  Name Variants: ${char.nameVariants || 'None'}`);
      console.log(`  Wardrobe: ${hasWardrobe} | Appearance: ${hasAppearance} | Personality: ${hasPersonality} | Background: ${hasBackground}`);
      console.log('');
    } else {
      console.log(`${name} - NOT FOUND`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
