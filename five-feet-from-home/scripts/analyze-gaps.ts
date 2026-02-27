/**
 * Analyze database for gaps and identify main characters
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CharacterCompleteness {
  name: string;
  archetype: string | null;
  score: number;
  missing: string[];
  hasBackground: boolean;
  hasAppearance: boolean;
  hasRelationships: boolean;
  hasPersonality: boolean;
  hasBssRole: boolean;
  hasWivesClubRole: boolean;
  hasPohRole: boolean;
}

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  // =============================================
  // MAIN CHARACTERS ANALYSIS
  // =============================================
  console.log('========================================');
  console.log('MAIN CHARACTERS UNIVERSE');
  console.log('========================================\n');

  const allChars = await prisma.character.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  // Score each character for completeness
  const scored: CharacterCompleteness[] = allChars.map(char => {
    const missing: string[] = [];
    let score = 0;

    // Core fields (2 points each)
    if (char.background) score += 2; else missing.push('background');
    if (char.appearance) score += 2; else missing.push('appearance');
    if (char.personality) score += 2; else missing.push('personality');
    if (char.relationships) score += 2; else missing.push('relationships');
    if (char.motivations) score += 2; else missing.push('motivations');
    if (char.fears) score += 2; else missing.push('fears');

    // Role fields (1 point each)
    if (char.archetype) score += 1; else missing.push('archetype');
    if (char.bssRole) score += 1;
    if (char.wivesClubRole) score += 1;
    if (char.pohRole) score += 1;
    if (char.wardrobeStyle) score += 1; else missing.push('wardrobeStyle');
    if (char.age) score += 1; else missing.push('age');

    return {
      name: char.name,
      archetype: char.archetype,
      score,
      missing,
      hasBackground: !!char.background,
      hasAppearance: !!char.appearance,
      hasRelationships: !!char.relationships,
      hasPersonality: !!char.personality,
      hasBssRole: !!char.bssRole,
      hasWivesClubRole: !!char.wivesClubRole,
      hasPohRole: !!char.pohRole,
    };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Identify main characters (score >= 10 or have major roles)
  const mainChars = scored.filter(c =>
    c.score >= 8 ||
    c.hasBssRole ||
    c.hasWivesClubRole ||
    c.hasPohRole
  );

  // Core characters (highest scores)
  const coreChars = scored.filter(c => c.score >= 12);

  console.log('=== CORE CHARACTERS (Most Complete) ===\n');
  coreChars.forEach(c => {
    console.log(`${c.name}`);
    console.log(`  Archetype: ${c.archetype || 'None'}`);
    console.log(`  Score: ${c.score}/17`);
    if (c.missing.length > 0) console.log(`  Missing: ${c.missing.join(', ')}`);
    console.log('');
  });

  // =============================================
  // GAPS ANALYSIS
  // =============================================
  console.log('\n========================================');
  console.log('GAPS ANALYSIS - NEEDS MORE DETAIL');
  console.log('========================================\n');

  // Characters with roles but missing key details
  const roledButIncomplete = scored.filter(c =>
    (c.hasBssRole || c.hasWivesClubRole || c.hasPohRole) &&
    c.score < 10
  );

  console.log('=== CHARACTERS WITH ROLES BUT INCOMPLETE ===');
  console.log('(Have BSS/Wives Club/POH role but missing key details)\n');
  roledButIncomplete.slice(0, 30).forEach(c => {
    console.log(`• ${c.name} (Score: ${c.score}/17)`);
    console.log(`  Missing: ${c.missing.join(', ')}`);
  });

  // Characters missing background
  const noBackground = scored.filter(c => !c.hasBackground && c.score >= 3);
  console.log(`\n=== MISSING BACKGROUND (${noBackground.length} chars) ===`);
  noBackground.slice(0, 20).forEach(c => {
    console.log(`• ${c.name} - ${c.archetype || 'no archetype'}`);
  });

  // Characters missing appearance
  const noAppearance = scored.filter(c => !c.hasAppearance && c.score >= 5);
  console.log(`\n=== MISSING APPEARANCE (${noAppearance.length} chars) ===`);
  noAppearance.slice(0, 20).forEach(c => {
    console.log(`• ${c.name} - ${c.archetype || 'no archetype'}`);
  });

  // Characters missing relationships
  const noRelationships = scored.filter(c => !c.hasRelationships && c.score >= 5);
  console.log(`\n=== MISSING RELATIONSHIPS (${noRelationships.length} chars) ===`);
  noRelationships.slice(0, 20).forEach(c => {
    console.log(`• ${c.name} - ${c.archetype || 'no archetype'}`);
  });

  // =============================================
  // ENTITY GAPS
  // =============================================
  console.log('\n========================================');
  console.log('ENTITY GAPS');
  console.log('========================================\n');

  // Organizations missing details
  const orgs = await prisma.organization.findMany({
    where: { projectId: project.id },
  });

  const incompleteOrgs = orgs.filter(o => !o.description || !o.leadership || !o.services);
  console.log(`=== ORGANIZATIONS NEEDING DETAIL (${incompleteOrgs.length}/${orgs.length}) ===`);
  incompleteOrgs.forEach(o => {
    const missing = [];
    if (!o.description) missing.push('description');
    if (!o.leadership) missing.push('leadership');
    if (!o.services) missing.push('services');
    console.log(`• ${o.name} - missing: ${missing.join(', ')}`);
  });

  // Locations missing details
  const locs = await prisma.location.findMany({
    where: { projectId: project.id },
  });

  const incompleteLocs = locs.filter(l => !l.description || !l.significance);
  console.log(`\n=== LOCATIONS NEEDING DETAIL (${incompleteLocs.length}/${locs.length}) ===`);
  incompleteLocs.forEach(l => {
    const missing = [];
    if (!l.description) missing.push('description');
    if (!l.significance) missing.push('significance');
    console.log(`• ${l.name} - missing: ${missing.join(', ')}`);
  });

  // Crises missing resolution
  const crises = await prisma.crisis.findMany({
    where: { projectId: project.id },
  });

  const incompleteCrises = crises.filter(c => !c.resolution || !c.description);
  console.log(`\n=== CRISES NEEDING DETAIL (${incompleteCrises.length}/${crises.length}) ===`);
  incompleteCrises.slice(0, 15).forEach(c => {
    const missing = [];
    if (!c.description) missing.push('description');
    if (!c.resolution) missing.push('resolution');
    console.log(`• ${c.name} - missing: ${missing.join(', ')}`);
  });
  if (incompleteCrises.length > 15) {
    console.log(`  ... and ${incompleteCrises.length - 15} more`);
  }

  // Galas missing clothing
  const galas = await prisma.gala.findMany({
    where: { projectId: project.id },
  });

  const incompleteGalas = galas.filter(g => !g.clothingDescriptions);
  console.log(`\n=== GALAS MISSING CLOTHING DESCRIPTIONS (${incompleteGalas.length}/${galas.length}) ===`);
  incompleteGalas.forEach(g => {
    console.log(`• ${g.name}`);
  });

  // =============================================
  // FULL MAIN CHARACTER LIST
  // =============================================
  console.log('\n========================================');
  console.log('FULL MAIN CHARACTER LIST BY CATEGORY');
  console.log('========================================\n');

  // Barrett Family
  const barretts = scored.filter(c =>
    c.name.includes('Barrett') ||
    c.name.includes('Elena') ||
    c.name.includes('Grace')
  );
  console.log('=== THE BARRETT FAMILY ===');
  barretts.forEach(c => console.log(`• ${c.name} (${c.archetype || 'N/A'}) - Score: ${c.score}`));

  // BSS Leadership
  console.log('\n=== BSS LEADERSHIP ===');
  const bssLeaders = scored.filter(c =>
    c.name.includes('Jasper') ||
    c.name.includes('Harper') ||
    c.name.includes('Hawk') ||
    c.name.includes('Addie') ||
    c.name.includes('Addison') ||
    c.archetype?.includes('COO') ||
    c.archetype?.includes('CEO')
  );
  bssLeaders.forEach(c => console.log(`• ${c.name} (${c.archetype || 'N/A'}) - Score: ${c.score}`));

  // Core Women
  console.log('\n=== CORE WOMEN (Wives Club Inner Circle) ===');
  const coreWomen = scored.filter(c =>
    c.name.includes('Bella') ||
    c.name.includes('Kendra') ||
    c.name.includes('Selene') ||
    c.name.includes('Lottie') ||
    c.name.includes('Sara') ||
    c.name.includes('Evie') ||
    c.name.includes('Sofia')
  );
  coreWomen.forEach(c => console.log(`• ${c.name} (${c.archetype || 'N/A'}) - Score: ${c.score}`));

  // BSS Operators
  console.log('\n=== BSS OPERATORS ===');
  const operators = allChars.filter(c =>
    c.bssRole?.toLowerCase().includes('operator') ||
    c.archetype?.toLowerCase().includes('operator')
  );
  operators.forEach(c => console.log(`• ${c.name} - ${c.bssRole || c.archetype}`));

  // Love Interests / Romance Characters
  console.log('\n=== LOVE INTERESTS ===');
  const loveInterests = scored.filter(c =>
    c.name.includes('Matt') ||
    c.name.includes('Mandy') ||
    c.name.includes('Daniel') ||
    c.name.includes('Chris') ||
    c.archetype?.includes('Love')
  );
  loveInterests.forEach(c => console.log(`• ${c.name} (${c.archetype || 'N/A'}) - Score: ${c.score}`));

  // Summary stats
  console.log('\n========================================');
  console.log('SUMMARY STATISTICS');
  console.log('========================================');
  console.log(`Total Characters: ${allChars.length}`);
  console.log(`Core Characters (score >= 12): ${coreChars.length}`);
  console.log(`Main Characters (score >= 8 or has role): ${mainChars.length}`);
  console.log(`Characters with BSS Role: ${scored.filter(c => c.hasBssRole).length}`);
  console.log(`Characters with Wives Club Role: ${scored.filter(c => c.hasWivesClubRole).length}`);
  console.log(`Characters with POH Role: ${scored.filter(c => c.hasPohRole).length}`);
  console.log(`\nCompletely Empty (score 0-2): ${scored.filter(c => c.score <= 2).length}`);
  console.log(`Minimal Data (score 3-5): ${scored.filter(c => c.score > 2 && c.score <= 5).length}`);
  console.log(`Partial Data (score 6-10): ${scored.filter(c => c.score > 5 && c.score <= 10).length}`);
  console.log(`Well Developed (score 11+): ${scored.filter(c => c.score > 10).length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
