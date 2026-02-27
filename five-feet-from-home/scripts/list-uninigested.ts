/**
 * List all Word documents that have not been ingested yet
 * Compares filesystem with database
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function findDocxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules, .git, and other non-content directories
      if (!['node_modules', '.git', '.next', 'prisma', 'src', 'tests'].includes(entry.name)) {
        files.push(...await findDocxFiles(fullPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.docx') && !entry.name.startsWith('~$')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const projectRoot = process.cwd();
  console.log('='.repeat(80));
  console.log('DOCUMENT INGESTION STATUS');
  console.log('='.repeat(80));
  console.log(`\nScanning: ${projectRoot}\n`);

  // Find all .docx files in the project
  const allDocxFiles = await findDocxFiles(projectRoot);
  console.log(`Found ${allDocxFiles.length} .docx files in project folder.\n`);

  // Get all ingested documents from database
  const ingestedDocs = await prisma.document.findMany({
    select: { fileName: true, filePath: true },
  });

  const ingestedNames = new Set(ingestedDocs.map(d => d.fileName.toLowerCase()));
  const ingestedPaths = new Set(ingestedDocs.map(d => d.filePath?.toLowerCase()));

  // Categorize files
  const ingested: string[] = [];
  const notIngested: string[] = [];

  for (const filePath of allDocxFiles) {
    const fileName = path.basename(filePath).toLowerCase();
    const normalizedPath = filePath.toLowerCase();

    if (ingestedNames.has(fileName) || ingestedPaths.has(normalizedPath)) {
      ingested.push(filePath);
    } else {
      notIngested.push(filePath);
    }
  }

  console.log('─'.repeat(60));
  console.log('INGESTED DOCUMENTS (' + ingested.length + ')');
  console.log('─'.repeat(60));
  for (const doc of ingested.sort()) {
    const relativePath = path.relative(projectRoot, doc);
    console.log(`  ✓ ${relativePath}`);
  }

  console.log('\n' + '─'.repeat(60));
  console.log('NOT YET INGESTED (' + notIngested.length + ')');
  console.log('─'.repeat(60));

  if (notIngested.length === 0) {
    console.log('  All documents have been ingested!');
  } else {
    for (const doc of notIngested.sort()) {
      const relativePath = path.relative(projectRoot, doc);
      console.log(`  ✗ ${relativePath}`);
    }

    console.log(`\nTo ingest these documents, copy them to the ./ingest folder and run:`);
    console.log(`  npx tsx scripts/ingest.ts`);
  }

  // Also check the ingest folder
  const ingestFolder = path.join(projectRoot, 'ingest');
  if (fs.existsSync(ingestFolder)) {
    const ingestFiles = fs.readdirSync(ingestFolder)
      .filter(f => f.endsWith('.docx') && !f.startsWith('~$'));

    console.log('\n' + '─'.repeat(60));
    console.log('DOCUMENTS IN INGEST FOLDER (' + ingestFiles.length + ')');
    console.log('─'.repeat(60));

    for (const file of ingestFiles.sort()) {
      const isIngested = ingestedNames.has(file.toLowerCase());
      console.log(`  ${isIngested ? '✓' : '○'} ${file}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`
Total .docx files found: ${allDocxFiles.length}
Already ingested: ${ingested.length}
Not yet ingested: ${notIngested.length}

Database contains ${ingestedDocs.length} document records.
`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
