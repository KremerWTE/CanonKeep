/**
 * Analyze all docx files and their ingestion status
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface DocxInfo {
  name: string;
  folder: string;
  sizeKB: number;
  estimatedPages: number;
  ingested: boolean;
  blocksCount?: number;
}

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  // Get all ingested documents
  const ingestedDocs = await prisma.document.findMany({
    where: { projectId: project.id },
    select: { fileName: true, id: true },
  });

  const ingestedNames = new Set(ingestedDocs.map(d => d.fileName.toLowerCase()));

  // Get block counts for each document
  const blockCounts: Record<string, number> = {};
  for (const doc of ingestedDocs) {
    const count = await prisma.contentBlock.count({ where: { documentId: doc.id } });
    blockCounts[doc.fileName.toLowerCase()] = count;
  }

  // Find all docx files (excluding node_modules and duplicates)
  const rootDir = 'C:\\Users\\Chris Kremer\\Documents\\GitHub\\five-feet-from-home';
  const docxFiles: DocxInfo[] = [];
  const seenFiles = new Set<string>();

  function scanDir(dir: string, folderName: string) {
    if (dir.includes('node_modules')) return;

    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDir(fullPath, item);
        } else if (item.endsWith('.docx') && !seenFiles.has(item.toLowerCase())) {
          seenFiles.add(item.toLowerCase());
          const sizeKB = Math.round(stat.size / 1024);
          // Rough estimate: ~3KB per page for docx
          const estimatedPages = Math.max(1, Math.round(sizeKB / 3));
          const isIngested = ingestedNames.has(item.toLowerCase());

          docxFiles.push({
            name: item,
            folder: folderName || 'root',
            sizeKB,
            estimatedPages,
            ingested: isIngested,
            blocksCount: isIngested ? blockCounts[item.toLowerCase()] : undefined,
          });
        }
      }
    } catch (e) {
      // Skip inaccessible dirs
    }
  }

  scanDir(rootDir, '');

  // Sort by size (largest first)
  docxFiles.sort((a, b) => b.sizeKB - a.sizeKB);

  // Print results
  console.log('========================================');
  console.log('DOCX FILES ANALYSIS');
  console.log('========================================\n');

  console.log('| File | Size (KB) | Est. Pages | Ingested | Blocks |');
  console.log('|------|-----------|------------|----------|--------|');

  let totalIngested = 0;
  let totalNotIngested = 0;

  for (const doc of docxFiles) {
    const status = doc.ingested ? '✓' : '✗';
    const blocks = doc.blocksCount !== undefined ? doc.blocksCount.toString() : '-';
    console.log(`| ${doc.name.substring(0, 40).padEnd(40)} | ${doc.sizeKB.toString().padStart(9)} | ${doc.estimatedPages.toString().padStart(10)} | ${status.padStart(8)} | ${blocks.padStart(6)} |`);

    if (doc.ingested) totalIngested++;
    else totalNotIngested++;
  }

  console.log('\n========================================');
  console.log('SUMMARY');
  console.log('========================================');
  console.log(`Total unique docx files: ${docxFiles.length}`);
  console.log(`Ingested: ${totalIngested}`);
  console.log(`Not ingested: ${totalNotIngested}`);

  // List not ingested
  const notIngested = docxFiles.filter(d => !d.ingested);
  if (notIngested.length > 0) {
    console.log('\n--- NOT INGESTED (need parsing) ---');
    notIngested.forEach(d => console.log(`  • ${d.name} (${d.estimatedPages} pages)`));
  }

  // Large files that might need deep parsing
  console.log('\n--- LARGE FILES (>100 pages, may need deep parsing) ---');
  docxFiles.filter(d => d.estimatedPages > 100).forEach(d => {
    console.log(`  • ${d.name} (~${d.estimatedPages} pages, ${d.blocksCount || 0} blocks)`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
