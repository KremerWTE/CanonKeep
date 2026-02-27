import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Core relationships extracted from source documents
const coreRelationships = [
  // Barrett Family
  { from: 'Jasper Barrett', to: 'Elena Barrett', type: 'spouse', desc: 'Married, co-founders of their empire' },
  { from: 'Jasper Barrett', to: 'Grace Barrett', type: 'parent', desc: 'Father, she\'s his soft spot' },
  { from: 'Elena Barrett', to: 'Grace Barrett', type: 'parent', desc: 'Mother, her anchor' },
  { from: 'Elena Barrett', to: 'Sara Whitaker', type: 'sibling', desc: 'Younger sister, CrossFit coach' },

  // Addie & Hawk
  { from: 'Addison Price', to: 'Tom Hawkins', type: 'spouse', desc: 'Married after quiet proposal, have twins plus one' },
  { from: 'Addison Price', to: 'Grace Barrett', type: 'godparent', desc: 'Godmother, Grace calls her "silly Aunt Addie"' },
  { from: 'Addison Price', to: 'Elena Barrett', type: 'sister figure', desc: 'Deep sisterhood bond, Elena facilitated her healing' },
  { from: 'Addison Price', to: 'Jasper Barrett', type: 'mentor', desc: 'He recruited her, made her his right hand' },
  { from: 'Addison Price', to: 'Cole Harrington', type: 'protector', desc: 'Cole is her Tier 1 protector, father figure' },
  { from: 'Tom Hawkins', to: 'Cole Harrington', type: 'brother figure', desc: 'Brothers-in-arms from military days' },
  { from: 'Tom Hawkins', to: 'Jasper Barrett', type: 'brother figure', desc: 'Blood-forged brotherhood' },

  // Chris & Kendra
  { from: 'Kendra Holt', to: 'Chris Whitaker', type: 'spouse', desc: 'High school sweethearts, fitness power couple' },
  { from: 'Kendra Holt', to: 'Addison Price', type: 'sister figure', desc: 'Close sisterhood, exercise partners' },
  { from: 'Kendra Holt', to: 'Elena Barrett', type: 'sister figure', desc: 'Part of the wives circle' },
  { from: 'Chris Whitaker', to: 'Jasper Barrett', type: 'colleague', desc: 'Works at BSS, rising through ranks' },

  // Cole's Relationships
  { from: 'Cole Harrington', to: 'Addison Price', type: 'protector', desc: 'Her Tier 1, treats her like a daughter' },
  { from: 'Cole Harrington', to: 'Evie', type: 'close friend', desc: 'Deep platonic bond, orbit hints at more' },

  // Wives Circle
  { from: 'Elena Barrett', to: 'Addison Price', type: 'sister figure', desc: 'Core wives circle' },
  { from: 'Elena Barrett', to: 'Kendra Holt', type: 'sister figure', desc: 'Core wives circle' },
  { from: 'Elena Barrett', to: 'Sara Whitaker', type: 'sibling', desc: 'Blood sisters' },

  // Harper
  { from: 'Harper Montgomery', to: 'Jasper Barrett', type: 'colleague', desc: 'BSS COO, his strategic partner' },
  { from: 'Harper Montgomery', to: 'Addison Price', type: 'mentor', desc: 'Taught her power dynamics in My Fair Lady arc' },

  // BSS Team
  { from: 'Jasper Barrett', to: 'Harper Montgomery', type: 'colleague', desc: 'His COO and strategic mind' },
  { from: 'Jasper Barrett', to: 'Tom Hawkins', type: 'colleague', desc: 'Head of security operations' },
  { from: 'Jasper Barrett', to: 'Cole Harrington', type: 'colleague', desc: 'Senior operative' },

  // Evie's connections
  { from: 'Evie', to: 'Sofia', type: 'business partner', desc: 'Strong & Savory cooking class founders' },
  { from: 'Evie', to: 'Grace Barrett', type: 'aunt figure', desc: 'Grace calls her Aunt Evie' },
  { from: 'Evie', to: 'Addison Price', type: 'friend', desc: 'Addie adopts her, takes her shopping' },
  { from: 'Evie', to: 'Bella', type: 'friend', desc: 'Bella mentors her in confidence' },

  // Bella
  { from: 'Bella', to: 'Addison Price', type: 'friend', desc: 'Part of the sisterhood' },
  { from: 'Bella', to: 'Elena Barrett', type: 'friend', desc: 'Part of the wives circle' },

  // Lottie
  { from: 'Lottie', to: 'Elena Barrett', type: 'colleague', desc: 'Queen of seating charts, runs galas' },
  { from: 'Lottie', to: 'Addison Price', type: 'friend', desc: 'Part of the orbit' },

  // Maggie
  { from: 'Maggie', to: 'Grace Barrett', type: 'mentor', desc: 'Grace\'s teacher' },
  { from: 'Maggie', to: 'Sara Whitaker', type: 'friend', desc: 'Best friend, grounded connection' },
  { from: 'Maggie', to: 'Elena Barrett', type: 'colleague', desc: 'Works reception at galas' },

  // Selene
  { from: 'Selene', to: 'Jasper Barrett', type: 'colleague', desc: 'Siren operative for BSS' },
  { from: 'Selene', to: 'Addison Price', type: 'friend', desc: 'Part of the wives circle' },
];

async function main() {
  console.log('=== ADDING CORE RELATIONSHIPS ===\n');

  // Get all characters
  const chars = await prisma.character.findMany({ select: { id: true, name: true } });
  const nameToId = new Map<string, string>();
  chars.forEach(c => nameToId.set(c.name.toLowerCase(), c.id));

  function findId(name: string): string | null {
    const lower = name.toLowerCase().trim();
    if (nameToId.has(lower)) return nameToId.get(lower)!;
    for (const [n, id] of nameToId) {
      if (n.includes(lower) || lower.includes(n)) return id;
    }
    return null;
  }

  let created = 0;
  let skipped = 0;

  for (const rel of coreRelationships) {
    const fromId = findId(rel.from);
    const toId = findId(rel.to);

    if (!fromId) {
      console.log(`  ⚠️ Not found: ${rel.from}`);
      skipped++;
      continue;
    }
    if (!toId) {
      console.log(`  ⚠️ Not found: ${rel.to}`);
      skipped++;
      continue;
    }

    try {
      await prisma.characterRelationship.upsert({
        where: {
          fromCharacterId_toCharacterId_relationshipType: {
            fromCharacterId: fromId,
            toCharacterId: toId,
            relationshipType: rel.type
          }
        },
        update: { description: rel.desc },
        create: {
          fromCharacterId: fromId,
          toCharacterId: toId,
          relationshipType: rel.type,
          description: rel.desc
        }
      });
      console.log(`  ✅ ${rel.from} -> ${rel.to}: ${rel.type}`);
      created++;
    } catch (e) {
      console.log(`  ❌ Error: ${rel.from} -> ${rel.to}`);
      skipped++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Created/Updated: ${created}`);
  console.log(`Skipped: ${skipped}`);

  const total = await prisma.characterRelationship.count();
  console.log(`\nTotal relationships in table: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
