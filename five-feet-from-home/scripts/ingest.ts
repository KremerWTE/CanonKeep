/**
 * Ingestion CLI Script
 *
 * Usage:
 *   npm run ingest                    # Ingest with default project name
 *   npm run ingest -- --project=MyBook   # Custom project name
 *   npm run ingest -- --clear         # Clear existing data before ingesting
 */

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { IngestionPipeline } from '../src/lib/ingest/pipeline';
import type { Config } from '../src/types';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let projectName = 'STORY_PROJECT';
  let clearExisting = false;

  for (const arg of args) {
    if (arg.startsWith('--project=')) {
      projectName = arg.split('=')[1];
    }
    if (arg === '--clear') {
      clearExisting = true;
    }
  }

  console.log('========================================');
  console.log('Story Site - Document Ingestion');
  console.log('========================================');
  console.log(`Project: ${projectName}`);
  console.log(`Clear existing: ${clearExisting}`);
  console.log('');

  // Load config
  const configPath = path.resolve(process.cwd(), 'config.json');
  let config: Config;

  if (fs.existsSync(configPath)) {
    console.log('Loading config from config.json...');
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } else {
    console.log('Using default configuration...');
    config = {
      defaultProject: projectName,
      ingestPath: './ingest',
      tags: {
        genres: [],
        povStyles: [],
        tones: [],
        themes: [],
      },
      extraction: {
        characterHeadingPatterns: [
          '^Character:\\s*(.+)$',
          '^(.+)\\s*[-—]\\s*(?:Background|Profile|Bio)$',
        ],
        chapterHeadingPatterns: [
          '^Chapter\\s+(\\d+)(?:\\s*[-:—]\\s*(.+))?$',
        ],
        plotHeadingPatterns: [
          '^Plot\\s*(?:Thread)?:\\s*(.+)$',
        ],
        locationHeadingPatterns: [
          '^Location:\\s*(.+)$',
          '^Setting:\\s*(.+)$',
        ],
        fieldPatterns: {
          name: '^(?:Name|Full Name):\\s*(.+)$',
          age: '^Age:\\s*(\\d+|[a-zA-Z\\s]+)$',
          motivation: '^(?:Motivation|Goal)s?:\\s*(.+)$',
          fear: '^(?:Fear)s?:\\s*(.+)$',
          secret: '^(?:Secret)s?:\\s*(.+)$',
          flaw: '^(?:Flaw|Weakness)s?:\\s*(.+)$',
          background: '^(?:Background|History):\\s*(.+)$',
        },
      },
      namingRules: {
        titleCase: true,
        stripPunctuation: false,
        aliasDelimiters: ['/', '|', ','],
      },
    };
  }

  // Update project name if specified
  if (projectName !== config.defaultProject) {
    config.defaultProject = projectName;
  }

  // Check ingest directory
  const ingestPath = path.resolve(process.cwd(), config.ingestPath);
  if (!fs.existsSync(ingestPath)) {
    console.log(`Creating ingest directory: ${ingestPath}`);
    fs.mkdirSync(ingestPath, { recursive: true });

    console.log('');
    console.log('No documents to ingest. Place .docx files in the ./ingest folder.');
    console.log('');
    console.log('Example document structure:');
    console.log('  # Character: Izzy');
    console.log('  Name: Isabella "Izzy" Chen');
    console.log('  Age: 28');
    console.log('  Motivation: Find her missing brother');
    console.log('  Fear: Being alone');
    console.log('');
    return;
  }

  // Run ingestion
  const pipeline = new IngestionPipeline(prisma, config);
  const result = await pipeline.ingest(projectName, clearExisting);

  // Print results
  console.log('');
  console.log('========================================');
  console.log('Ingestion Complete');
  console.log('========================================');
  console.log(`Status: ${result.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`Documents processed: ${result.documentsProcessed}`);
  console.log('');
  console.log('Entities extracted:');
  console.log(`  - Characters: ${result.entitiesExtracted.characters}`);
  console.log(`  - Locations: ${result.entitiesExtracted.locations}`);
  console.log(`  - Chapters: ${result.entitiesExtracted.chapters}`);
  console.log(`  - Plot Threads: ${result.entitiesExtracted.plotThreads}`);
  console.log(`  - Events: ${result.entitiesExtracted.events}`);
  console.log(`  - Notes: ${result.entitiesExtracted.notes}`);
  console.log('');
  console.log(`Conflicts detected: ${result.conflicts}`);

  if (result.errors.length > 0) {
    console.log('');
    console.log('Errors:');
    for (const error of result.errors) {
      console.log(`  - ${error}`);
    }
  }

  console.log('');
  console.log('Run `npm run dev` to view results in the web interface.');
}

main()
  .catch((e) => {
    console.error('Ingestion failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
