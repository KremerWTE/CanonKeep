/**
 * Generate comprehensive markdown canon files from database
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const CANON_DIR = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home\\docs\\canon';

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  // Create directories
  ensureDir(CANON_DIR);
  ensureDir(path.join(CANON_DIR, 'characters'));
  ensureDir(path.join(CANON_DIR, 'organizations'));
  ensureDir(path.join(CANON_DIR, 'locations'));
  ensureDir(path.join(CANON_DIR, 'crises'));
  ensureDir(path.join(CANON_DIR, 'galas'));
  ensureDir(path.join(CANON_DIR, 'storylines'));
  ensureDir(path.join(CANON_DIR, 'series'));

  console.log('Generating canon files...\n');

  // =============================================
  // CHARACTERS
  // =============================================
  console.log('--- Characters ---');
  const characters = await prisma.character.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  const charIndex: string[] = ['# Characters Canon\n\n'];

  for (const char of characters) {
    const slug = slugify(char.name);
    const filename = `${slug}.md`;

    let content = `# ${char.name}\n\n`;

    if (char.nickname) content += `**Nickname:** ${char.nickname}\n\n`;
    if (char.archetype) content += `**Archetype:** ${char.archetype}\n\n`;
    if (char.age) content += `**Age:** ${char.age}\n\n`;

    content += `## Affiliations\n\n`;
    if (char.affiliationRole) content += `- **Role:** ${char.affiliationRole}\n`;
    if (char.bssRole) content += `- **BSS Role:** ${char.bssRole}\n`;
    if (char.wivesClubRole) content += `- **Wives Club:** ${char.wivesClubRole}\n`;
    if (char.pohRole) content += `- **POH Role:** ${char.pohRole}\n`;
    if (char.maisonAureliaRole) content += `- **Maison Aurelia:** ${char.maisonAureliaRole}\n`;
    if (char.hubLocation) content += `- **Hub Location:** ${char.hubLocation}\n`;
    content += '\n';

    if (char.background) {
      content += `## Background\n\n${char.background}\n\n`;
    }

    if (char.education) {
      content += `## Education\n\n${char.education}\n\n`;
    }

    if (char.appearance) {
      content += `## Appearance\n\n${char.appearance}\n\n`;
    }

    if (char.wardrobeStyle) {
      content += `## Wardrobe & Style\n\n${char.wardrobeStyle}\n\n`;
    }

    if (char.personality) {
      content += `## Personality\n\n${char.personality}\n\n`;
    }

    if (char.motivations) {
      content += `## Motivations\n\n${char.motivations}\n\n`;
    }

    if (char.fears) {
      content += `## Fears\n\n${char.fears}\n\n`;
    }

    if (char.secrets) {
      content += `## Secrets\n\n${char.secrets}\n\n`;
    }

    if (char.relationships) {
      content += `## Relationships\n\n${char.relationships}\n\n`;
    }

    if (char.catchphrases) {
      content += `## Catchphrases\n\n${char.catchphrases}\n\n`;
    }

    if (char.arcStart || char.arcChange || char.arcEnd) {
      content += `## Character Arc\n\n`;
      if (char.arcStart) content += `**Start:** ${char.arcStart}\n\n`;
      if (char.arcChange) content += `**Change:** ${char.arcChange}\n\n`;
      if (char.arcEnd) content += `**End:** ${char.arcEnd}\n\n`;
    }

    if (char.faithRoots) {
      content += `## Faith & Roots\n\n${char.faithRoots}\n\n`;
    }

    content += `---\n*[Back to Characters Index](./index.md)*\n`;

    fs.writeFileSync(path.join(CANON_DIR, 'characters', filename), content);
    charIndex.push(`- [${char.name}](./${filename}) - ${char.archetype || 'Character'}\n`);
  }

  fs.writeFileSync(path.join(CANON_DIR, 'characters', 'index.md'), charIndex.join(''));
  console.log(`  Created ${characters.length} character files`);

  // =============================================
  // ORGANIZATIONS
  // =============================================
  console.log('--- Organizations ---');
  const orgs = await prisma.organization.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  const orgIndex: string[] = ['# Organizations Canon\n\n'];

  for (const org of orgs) {
    const slug = slugify(org.name);
    const filename = `${slug}.md`;

    let content = `# ${org.name}\n\n`;

    if (org.shortName) content += `**Short Name:** ${org.shortName}\n\n`;
    if (org.type) content += `**Type:** ${org.type}\n\n`;
    if (org.industry) content += `**Industry:** ${org.industry}\n\n`;
    if (org.headquarters) content += `**Headquarters:** ${org.headquarters}\n\n`;

    if (org.description) {
      content += `## Description\n\n${org.description}\n\n`;
    }

    if (org.founder) content += `**Founder:** ${org.founder}\n\n`;

    if (org.leadership) {
      content += `## Leadership\n\n`;
      try {
        const leaders = JSON.parse(org.leadership);
        leaders.forEach((l: string) => content += `- ${l}\n`);
      } catch {
        content += org.leadership + '\n';
      }
      content += '\n';
    }

    if (org.services) {
      content += `## Services\n\n${org.services}\n\n`;
    }

    if (org.significance) {
      content += `## Story Significance\n\n${org.significance}\n\n`;
    }

    content += `---\n*[Back to Organizations Index](./index.md)*\n`;

    fs.writeFileSync(path.join(CANON_DIR, 'organizations', filename), content);
    orgIndex.push(`- [${org.name}](./${filename}) - ${org.type || 'Organization'}\n`);
  }

  fs.writeFileSync(path.join(CANON_DIR, 'organizations', 'index.md'), orgIndex.join(''));
  console.log(`  Created ${orgs.length} organization files`);

  // =============================================
  // LOCATIONS
  // =============================================
  console.log('--- Locations ---');
  const locations = await prisma.location.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  const locIndex: string[] = ['# Locations Canon\n\n'];

  for (const loc of locations) {
    const slug = slugify(loc.name);
    const filename = `${slug}.md`;

    let content = `# ${loc.name}\n\n`;

    if (loc.description) {
      content += `## Description\n\n${loc.description}\n\n`;
    }

    if (loc.rules) {
      content += `## Rules & World-Building\n\n${loc.rules}\n\n`;
    }

    if (loc.significance) {
      content += `## Story Significance\n\n${loc.significance}\n\n`;
    }

    content += `---\n*[Back to Locations Index](./index.md)*\n`;

    fs.writeFileSync(path.join(CANON_DIR, 'locations', filename), content);
    locIndex.push(`- [${loc.name}](./${filename})\n`);
  }

  fs.writeFileSync(path.join(CANON_DIR, 'locations', 'index.md'), locIndex.join(''));
  console.log(`  Created ${locations.length} location files`);

  // =============================================
  // CRISES
  // =============================================
  console.log('--- Crises ---');
  const crises = await prisma.crisis.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  const crisisIndex: string[] = ['# Crises Canon\n\n'];

  for (const crisis of crises) {
    const slug = slugify(crisis.name);
    const filename = `${slug}.md`;

    let content = `# ${crisis.name}\n\n`;

    if (crisis.crisisType) content += `**Type:** ${crisis.crisisType}\n\n`;
    if (crisis.severity) content += `**Severity:** ${crisis.severity}\n\n`;
    if (crisis.location) content += `**Location:** ${crisis.location}\n\n`;
    if (crisis.status) content += `**Status:** ${crisis.status}\n\n`;

    if (crisis.description) {
      content += `## Description\n\n${crisis.description}\n\n`;
    }

    if (crisis.situation) {
      content += `## Initial Situation\n\n${crisis.situation}\n\n`;
    }

    if (crisis.complications) {
      content += `## Complications\n\n${crisis.complications}\n\n`;
    }

    if (crisis.resolution) {
      content += `## Resolution\n\n${crisis.resolution}\n\n`;
    }

    if (crisis.lessonsLearned) {
      content += `## Lessons Learned\n\n${crisis.lessonsLearned}\n\n`;
    }

    if (crisis.bssTeam) {
      content += `## BSS Team Involved\n\n`;
      try {
        const team = JSON.parse(crisis.bssTeam);
        team.forEach((t: string) => content += `- ${t}\n`);
      } catch {
        content += crisis.bssTeam + '\n';
      }
      content += '\n';
    }

    if (crisis.bookAppearance) {
      content += `**Book Appearance:** ${crisis.bookAppearance}\n\n`;
    }

    content += `---\n*[Back to Crises Index](./index.md)*\n`;

    fs.writeFileSync(path.join(CANON_DIR, 'crises', filename), content);
    crisisIndex.push(`- [${crisis.name}](./${filename}) - ${crisis.crisisType || 'Crisis'} (${crisis.severity || 'unknown'})\n`);
  }

  fs.writeFileSync(path.join(CANON_DIR, 'crises', 'index.md'), crisisIndex.join(''));
  console.log(`  Created ${crises.length} crisis files`);

  // =============================================
  // GALAS
  // =============================================
  console.log('--- Galas ---');
  const galas = await prisma.gala.findMany({
    where: { projectId: project.id },
    orderBy: { name: 'asc' },
  });

  const galaIndex: string[] = ['# Galas & Events Canon\n\n'];

  for (const gala of galas) {
    const slug = slugify(gala.name);
    const filename = `${slug}.md`;

    let content = `# ${gala.name}\n\n`;

    if (gala.purpose) content += `**Purpose:** ${gala.purpose}\n\n`;
    if (gala.organization) content += `**Organization:** ${gala.organization}\n\n`;
    if (gala.venue) content += `**Venue:** ${gala.venue}\n\n`;
    if (gala.location) content += `**Location:** ${gala.location}\n\n`;

    if (gala.significance) {
      content += `## Significance\n\n${gala.significance}\n\n`;
    }

    if (gala.clothingDescriptions) {
      content += `## Clothing Descriptions\n\n`;
      try {
        const clothing = JSON.parse(gala.clothingDescriptions);
        for (const [char, desc] of Object.entries(clothing)) {
          content += `**${char}:** ${desc}\n\n`;
        }
      } catch {
        content += gala.clothingDescriptions + '\n\n';
      }
    }

    if (gala.bookAppearance) {
      content += `**Book Appearance:** ${gala.bookAppearance}\n\n`;
    }

    content += `---\n*[Back to Galas Index](./index.md)*\n`;

    fs.writeFileSync(path.join(CANON_DIR, 'galas', filename), content);
    galaIndex.push(`- [${gala.name}](./${filename}) - ${gala.purpose || 'Event'}\n`);
  }

  fs.writeFileSync(path.join(CANON_DIR, 'galas', 'index.md'), galaIndex.join(''));
  console.log(`  Created ${galas.length} gala files`);

  // =============================================
  // BOOK SERIES
  // =============================================
  console.log('--- Book Series ---');
  const series = await prisma.bookSeries.findMany({
    where: { projectId: project.id },
    orderBy: { readingOrder: 'asc' },
  });

  const seriesIndex: string[] = ['# Book Series Canon\n\n'];

  for (const s of series) {
    const slug = slugify(s.name);
    const filename = `${slug}.md`;

    let content = `# ${s.name}\n\n`;

    if (s.seriesType) content += `**Type:** ${s.seriesType}\n\n`;
    if (s.protagonist) content += `**Protagonist:** ${s.protagonist}\n\n`;
    if (s.status) content += `**Status:** ${s.status}\n\n`;
    if (s.totalBooks) content += `**Total Books:** ${s.totalBooks}\n\n`;
    if (s.readingOrder) content += `**Reading Order:** ${s.readingOrder}\n\n`;

    if (s.premise) {
      content += `## Premise\n\n${s.premise}\n\n`;
    }

    if (s.themes) {
      content += `## Themes\n\n`;
      try {
        const themes = JSON.parse(s.themes);
        themes.forEach((t: string) => content += `- ${t}\n`);
      } catch {
        content += s.themes + '\n';
      }
      content += '\n';
    }

    if (s.books) {
      content += `## Books\n\n`;
      try {
        const books = JSON.parse(s.books);
        books.forEach((b: any) => {
          content += `### Book ${b.number || '?'}: ${b.title || 'Untitled'}\n`;
          if (b.chapters) content += `- Chapters: ${b.chapters}\n`;
          if (b.synopsis) content += `- Synopsis: ${b.synopsis}\n`;
          content += '\n';
        });
      } catch {
        content += s.books + '\n\n';
      }
    }

    content += `---\n*[Back to Series Index](./index.md)*\n`;

    fs.writeFileSync(path.join(CANON_DIR, 'series', filename), content);
    seriesIndex.push(`- [${s.name}](./${filename}) - ${s.totalBooks || '?'} books (${s.status})\n`);
  }

  fs.writeFileSync(path.join(CANON_DIR, 'series', 'index.md'), seriesIndex.join(''));
  console.log(`  Created ${series.length} series files`);

  // =============================================
  // MAIN INDEX
  // =============================================
  const mainIndex = `# Five Feet From Home - Canon Bible

## Overview

This canon bible contains all the official story elements for the Five Feet From Home universe.

## Contents

- [Characters](./characters/index.md) - ${characters.length} characters
- [Organizations](./organizations/index.md) - ${orgs.length} organizations
- [Locations](./locations/index.md) - ${locations.length} locations
- [Crises](./crises/index.md) - ${crises.length} crises/cases
- [Galas & Events](./galas/index.md) - ${galas.length} galas
- [Book Series](./series/index.md) - ${series.length} series

## Core Characters

### The Barrett Family
- [Jasper Barrett](./characters/jasper-barrett.md) - CEO of BSS
- [Elena Hale-Barrett](./characters/elena-hale-barrett.md) - CEO of Maison Aurelia
- [Grace Barrett](./characters/grace-barrett.md) - Their daughter

### BSS Leadership
- [Harper Reynolds](./characters/harper-reynolds.md) - COO
- [Michael "Hawk" Barrett](./characters/michael-hawk-barrett.md) - Head of Operations
- [Adelaide "Addie" Barrett](./characters/adelaide-addie-barrett.md) - POH Patroness

### Core Women
- [Isabella "Bella" Rossi](./characters/isabella-bella-rossi.md) - BSS Fixer, POH Page
- [Kendra Donnelly](./characters/kendra-donnelly.md) - BSS Fixer, CrossFit Champion
- [Charlotte "Lottie" Hale](./characters/charlotte-lottie-hale.md) - Operations Chief

## Key Organizations

- [Barrett Security Solutions (BSS)](./organizations/barrett-security-solutions.md)
- [Maison Aurelia](./organizations/maison-aurelia.md)
- [Palace of Honor (POH)](./organizations/palace-of-honor.md)
- [Wives Club](./organizations/wives-club.md)

---
*Generated from database on ${new Date().toISOString().split('T')[0]}*
`;

  fs.writeFileSync(path.join(CANON_DIR, 'index.md'), mainIndex);
  console.log('\n✓ Created main index');

  console.log('\n========================================');
  console.log('Canon files generated successfully!');
  console.log(`Location: ${CANON_DIR}`);
  console.log('========================================');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
