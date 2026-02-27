import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== POPULATING CHARACTER RELATIONSHIPS TABLE ===\n');

  // Get all characters with relationships
  const characters = await prisma.character.findMany({
    where: { relationships: { not: null } },
    select: { id: true, name: true, relationships: true }
  });

  console.log(`Found ${characters.length} characters with relationship data\n`);

  // Create a name-to-id map for faster lookup
  const allChars = await prisma.character.findMany({
    select: { id: true, name: true }
  });
  const nameToId = new Map<string, string>();
  allChars.forEach(c => nameToId.set(c.name.toLowerCase(), c.id));

  // Helper to find character ID by name (fuzzy match)
  function findCharId(name: string): string | null {
    const lower = name.toLowerCase().trim();
    // Direct match
    if (nameToId.has(lower)) return nameToId.get(lower)!;

    // Partial match
    for (const [n, id] of nameToId) {
      if (n.includes(lower) || lower.includes(n)) return id;
    }
    return null;
  }

  let created = 0;
  let skipped = 0;

  for (const char of characters) {
    let relData: any = {};

    try {
      // Try to parse as JSON
      if (char.relationships!.startsWith('{')) {
        relData = JSON.parse(char.relationships!);
      } else {
        // Text format - skip for now
        continue;
      }
    } catch {
      continue;
    }

    // Process spouse
    if (relData.spouse) {
      const targetId = findCharId(relData.spouse);
      if (targetId && targetId !== char.id) {
        try {
          await prisma.characterRelationship.upsert({
            where: {
              fromCharacterId_toCharacterId_relationshipType: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'spouse'
              }
            },
            update: {},
            create: {
              fromCharacterId: char.id,
              toCharacterId: targetId,
              relationshipType: 'spouse',
              description: 'Married'
            }
          });
          created++;
        } catch (e) { skipped++; }
      }
    }

    // Process children
    if (Array.isArray(relData.children)) {
      for (const child of relData.children) {
        const targetId = findCharId(child);
        if (targetId && targetId !== char.id) {
          try {
            await prisma.characterRelationship.upsert({
              where: {
                fromCharacterId_toCharacterId_relationshipType: {
                  fromCharacterId: char.id,
                  toCharacterId: targetId,
                  relationshipType: 'parent'
                }
              },
              update: {},
              create: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'parent',
                description: 'Parent of'
              }
            });
            created++;
          } catch (e) { skipped++; }
        }
      }
    }

    // Process sister figures
    if (Array.isArray(relData.sisterFigures)) {
      for (const sister of relData.sisterFigures) {
        const targetId = findCharId(sister);
        if (targetId && targetId !== char.id) {
          try {
            await prisma.characterRelationship.upsert({
              where: {
                fromCharacterId_toCharacterId_relationshipType: {
                  fromCharacterId: char.id,
                  toCharacterId: targetId,
                  relationshipType: 'sister figure'
                }
              },
              update: {},
              create: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'sister figure',
                description: 'Chosen family sister bond'
              }
            });
            created++;
          } catch (e) { skipped++; }
        }
      }
    }

    // Process godchildren
    if (Array.isArray(relData.godchildren)) {
      for (const godchild of relData.godchildren) {
        const targetId = findCharId(godchild);
        if (targetId && targetId !== char.id) {
          try {
            await prisma.characterRelationship.upsert({
              where: {
                fromCharacterId_toCharacterId_relationshipType: {
                  fromCharacterId: char.id,
                  toCharacterId: targetId,
                  relationshipType: 'godparent'
                }
              },
              update: {},
              create: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'godparent',
                description: 'Godparent to'
              }
            });
            created++;
          } catch (e) { skipped++; }
        }
      }
    }

    // Process romantic interest
    if (relData.romanticInterest) {
      const name = relData.romanticInterest.split('(')[0].trim();
      const targetId = findCharId(name);
      if (targetId && targetId !== char.id) {
        try {
          await prisma.characterRelationship.upsert({
            where: {
              fromCharacterId_toCharacterId_relationshipType: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'romantic partner'
              }
            },
            update: {},
            create: {
              fromCharacterId: char.id,
              toCharacterId: targetId,
              relationshipType: 'romantic partner',
              description: 'Romantic relationship'
            }
          });
          created++;
        } catch (e) { skipped++; }
      }
    }

    // Process protector figure
    if (relData.protectorFigure) {
      const name = relData.protectorFigure.split('(')[0].trim();
      const targetId = findCharId(name);
      if (targetId && targetId !== char.id) {
        try {
          await prisma.characterRelationship.upsert({
            where: {
              fromCharacterId_toCharacterId_relationshipType: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'protector'
              }
            },
            update: {},
            create: {
              fromCharacterId: char.id,
              toCharacterId: targetId,
              relationshipType: 'protector',
              description: 'Protective relationship'
            }
          });
          created++;
        } catch (e) { skipped++; }
      }
    }

    // Process brother figure
    if (relData.brotherFigure) {
      const targetId = findCharId(relData.brotherFigure);
      if (targetId && targetId !== char.id) {
        try {
          await prisma.characterRelationship.upsert({
            where: {
              fromCharacterId_toCharacterId_relationshipType: {
                fromCharacterId: char.id,
                toCharacterId: targetId,
                relationshipType: 'brother figure'
              }
            },
            update: {},
            create: {
              fromCharacterId: char.id,
              toCharacterId: targetId,
              relationshipType: 'brother figure',
              description: 'Chosen family brother bond'
            }
          });
          created++;
        } catch (e) { skipped++; }
        }
    }

    // Process details array for more relationships
    if (Array.isArray(relData.details)) {
      for (const detail of relData.details) {
        if (detail.name && detail.relation) {
          const targetId = findCharId(detail.name);
          if (targetId && targetId !== char.id) {
            try {
              await prisma.characterRelationship.upsert({
                where: {
                  fromCharacterId_toCharacterId_relationshipType: {
                    fromCharacterId: char.id,
                    toCharacterId: targetId,
                    relationshipType: detail.relation
                  }
                },
                update: { description: detail.notes || null },
                create: {
                  fromCharacterId: char.id,
                  toCharacterId: targetId,
                  relationshipType: detail.relation,
                  description: detail.notes || null
                }
              });
              created++;
            } catch (e) { skipped++; }
          }
        }
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Relationships created/updated: ${created}`);
  console.log(`Skipped (duplicates/errors): ${skipped}`);

  const total = await prisma.characterRelationship.count();
  console.log(`\nTotal relationships in table: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
