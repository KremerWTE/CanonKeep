/**
 * Sync Story Elements Script
 *
 * Populates the database with extracted story elements from EXTRACTED-STORY-ELEMENTS.md
 *
 * Usage: npx tsx scripts/sync-story-elements.ts
 */

import { PrismaClient } from '@prisma/client';
import {
  bookSeries,
  characters,
  organizations,
  locations,
  crises,
  galas,
  businessTrips,
  funTimeEncounters,
  storylines,
} from '../data/story-elements';

const prisma = new PrismaClient();

async function main() {
  console.log('========================================');
  console.log('Syncing Story Elements to Database');
  console.log('========================================\n');

  // Use the existing STORY_PROJECT (contains data from docx files)
  let project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    // Fallback to creating if doesn't exist
    project = await prisma.project.create({
      data: {
        name: 'STORY_PROJECT',
        description: 'Multi-generational saga of the Barrett family empire, crisis management, love, and legacy',
        genre: 'romantic drama',
        povStyle: 'third-person-limited',
      },
    });
  }

  console.log(`✓ Project: ${project.name}`);

  // Sync Book Series
  console.log('\n--- Syncing Book Series ---');
  for (const series of bookSeries) {
    await prisma.bookSeries.upsert({
      where: { projectId_name: { projectId: project.id, name: series.name } },
      update: {
        seriesType: series.seriesType,
        protagonist: series.protagonist,
        premise: series.premise,
        themes: series.themes,
        totalBooks: series.totalBooks,
        status: series.status,
        readingOrder: series.readingOrder,
        books: series.books,
      },
      create: {
        projectId: project.id,
        name: series.name,
        seriesType: series.seriesType,
        protagonist: series.protagonist,
        premise: series.premise,
        themes: series.themes,
        totalBooks: series.totalBooks,
        status: series.status,
        readingOrder: series.readingOrder,
        books: series.books,
      },
    });
    console.log(`  ✓ ${series.name}`);
  }

  // Sync Characters
  console.log('\n--- Syncing Characters ---');
  for (const char of characters) {
    await prisma.character.upsert({
      where: { projectId_name: { projectId: project.id, name: char.name } },
      update: {
        nickname: char.nickname,
        archetype: char.archetype,
        affiliationRole: char.affiliationRole,
        bssRole: char.bssRole,
        wivesClubRole: char.wivesClubRole,
        pohRole: char.pohRole,
        maisonAureliaRole: char.maisonAureliaRole,
        hubLocation: char.hubLocation,
        education: char.education,
        background: char.background,
        appearance: char.appearance,
        wardrobeStyle: char.wardrobeStyle,
        personality: char.personality,
        motivations: char.motivations,
        fears: char.fears,
        secrets: char.secrets,
        relationships: char.relationships,
        catchphrases: char.catchphrases,
        arcStart: char.arcStart,
        arcChange: char.arcChange,
        arcEnd: char.arcEnd,
        age: char.age,
        faithRoots: char.faithRoots,
      },
      create: {
        projectId: project.id,
        name: char.name,
        nickname: char.nickname,
        archetype: char.archetype,
        affiliationRole: char.affiliationRole,
        bssRole: char.bssRole,
        wivesClubRole: char.wivesClubRole,
        pohRole: char.pohRole,
        maisonAureliaRole: char.maisonAureliaRole,
        hubLocation: char.hubLocation,
        education: char.education,
        background: char.background,
        appearance: char.appearance,
        wardrobeStyle: char.wardrobeStyle,
        personality: char.personality,
        motivations: char.motivations,
        fears: char.fears,
        secrets: char.secrets,
        relationships: char.relationships,
        catchphrases: char.catchphrases,
        arcStart: char.arcStart,
        arcChange: char.arcChange,
        arcEnd: char.arcEnd,
        age: char.age,
        faithRoots: char.faithRoots,
      },
    });
    console.log(`  ✓ ${char.name}`);
  }

  // Sync Organizations
  console.log('\n--- Syncing Organizations ---');
  for (const org of organizations) {
    await prisma.organization.upsert({
      where: { projectId_name: { projectId: project.id, name: org.name } },
      update: {
        shortName: org.shortName,
        type: org.type,
        industry: org.industry,
        description: org.description,
        headquarters: org.headquarters,
        founder: org.founder,
        leadership: org.leadership,
        services: org.services,
        relationships: org.relationships,
        significance: org.significance,
      },
      create: {
        projectId: project.id,
        name: org.name,
        shortName: org.shortName,
        type: org.type,
        industry: org.industry,
        description: org.description,
        headquarters: org.headquarters,
        founder: org.founder,
        leadership: org.leadership,
        services: org.services,
        relationships: org.relationships,
        significance: org.significance,
      },
    });
    console.log(`  ✓ ${org.name}`);
  }

  // Sync Locations
  console.log('\n--- Syncing Locations ---');
  for (const loc of locations) {
    await prisma.location.upsert({
      where: { projectId_name: { projectId: project.id, name: loc.name } },
      update: {
        description: loc.description,
        significance: loc.significance,
        rules: loc.rules,
      },
      create: {
        projectId: project.id,
        name: loc.name,
        description: loc.description,
        significance: loc.significance,
        rules: loc.rules,
      },
    });
    console.log(`  ✓ ${loc.name}`);
  }

  // Sync Crises
  console.log('\n--- Syncing Crises ---');
  for (const crisis of crises) {
    await prisma.crisis.upsert({
      where: { projectId_name: { projectId: project.id, name: crisis.name } },
      update: {
        crisisType: crisis.crisisType,
        severity: crisis.severity,
        location: crisis.location,
        description: crisis.description,
        resolution: crisis.resolution,
        lessonsLearned: crisis.lessonsLearned,
        bssTeam: crisis.bssTeam,
        status: crisis.status,
        bookAppearance: crisis.bookAppearance,
      },
      create: {
        projectId: project.id,
        name: crisis.name,
        crisisType: crisis.crisisType,
        severity: crisis.severity,
        location: crisis.location,
        description: crisis.description,
        resolution: crisis.resolution,
        lessonsLearned: crisis.lessonsLearned,
        bssTeam: crisis.bssTeam,
        status: crisis.status,
        bookAppearance: crisis.bookAppearance,
      },
    });
    console.log(`  ✓ ${crisis.name}`);
  }

  // Sync Galas
  console.log('\n--- Syncing Galas ---');
  for (const gala of galas) {
    await prisma.gala.upsert({
      where: { projectId_name: { projectId: project.id, name: gala.name } },
      update: {
        purpose: gala.purpose,
        organization: gala.organization,
        venue: gala.venue,
        location: gala.location,
        significance: gala.significance,
        bookAppearance: gala.bookAppearance,
        clothingDescriptions: gala.clothingDescriptions,
      },
      create: {
        projectId: project.id,
        name: gala.name,
        purpose: gala.purpose,
        organization: gala.organization,
        venue: gala.venue,
        location: gala.location,
        significance: gala.significance,
        bookAppearance: gala.bookAppearance,
        clothingDescriptions: gala.clothingDescriptions,
      },
    });
    console.log(`  ✓ ${gala.name}`);
  }

  // Sync Business Trips
  console.log('\n--- Syncing Business Trips ---');
  for (const trip of businessTrips) {
    // Use a composite lookup since there's no unique constraint on name
    const existing = await prisma.businessTrip.findFirst({
      where: { projectId: project.id, name: trip.name },
    });

    if (existing) {
      await prisma.businessTrip.update({
        where: { id: existing.id },
        data: {
          traveler: trip.traveler,
          destination: trip.destination,
          duration: trip.duration,
          purpose: trip.purpose,
          storyEvents: trip.storyEvents,
          bookAppearance: trip.bookAppearance,
        },
      });
    } else {
      await prisma.businessTrip.create({
        data: {
          projectId: project.id,
          name: trip.name,
          traveler: trip.traveler,
          destination: trip.destination,
          duration: trip.duration,
          purpose: trip.purpose,
          storyEvents: trip.storyEvents,
          bookAppearance: trip.bookAppearance,
        },
      });
    }
    console.log(`  ✓ ${trip.name}`);
  }

  // Sync Fun Time Encounters
  console.log('\n--- Syncing Intimate Encounters ---');
  for (const encounter of funTimeEncounters) {
    // Use findFirst since there's no unique constraint on title
    const existing = await prisma.funTimeEncounter.findFirst({
      where: { projectId: project.id, title: encounter.title },
    });

    if (existing) {
      await prisma.funTimeEncounter.update({
        where: { id: existing.id },
        data: {
          encounterType: encounter.encounterType,
          participants: encounter.participants,
          location: encounter.location,
          galaConnection: encounter.galaConnection,
          setting: encounter.setting,
          description: encounter.description,
          powerDynamic: encounter.powerDynamic,
          aftermath: encounter.aftermath,
          emotionalImpact: encounter.emotionalImpact,
          bookAppearance: encounter.bookAppearance,
        },
      });
    } else {
      await prisma.funTimeEncounter.create({
        data: {
          projectId: project.id,
          title: encounter.title,
          encounterType: encounter.encounterType,
          participants: encounter.participants,
          location: encounter.location,
          galaConnection: encounter.galaConnection,
          setting: encounter.setting,
          description: encounter.description,
          powerDynamic: encounter.powerDynamic,
          aftermath: encounter.aftermath,
          emotionalImpact: encounter.emotionalImpact,
          bookAppearance: encounter.bookAppearance,
        },
      });
    }
    console.log(`  ✓ ${encounter.title}`);
  }

  // Sync Storylines
  console.log('\n--- Syncing Storylines ---');
  for (const storyline of storylines) {
    await prisma.storyline.upsert({
      where: { projectId_title: { projectId: project.id, title: storyline.title } },
      update: {
        category: storyline.category,
        description: storyline.description,
        characters: storyline.characters,
        themes: storyline.themes,
      },
      create: {
        projectId: project.id,
        title: storyline.title,
        category: storyline.category,
        description: storyline.description,
        characters: storyline.characters,
        themes: storyline.themes,
      },
    });
    console.log(`  ✓ ${storyline.title}`);
  }

  // Summary
  console.log('\n========================================');
  console.log('Sync Complete!');
  console.log('========================================');
  console.log(`
Summary:
  - Book Series: ${bookSeries.length}
  - Characters: ${characters.length}
  - Organizations: ${organizations.length}
  - Locations: ${locations.length}
  - Crises: ${crises.length}
  - Galas: ${galas.length}
  - Business Trips: ${businessTrips.length}
  - Intimate Encounters: ${funTimeEncounters.length}
  - Storylines: ${storylines.length}
`);
}

main()
  .catch((e) => {
    console.error('Sync failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
