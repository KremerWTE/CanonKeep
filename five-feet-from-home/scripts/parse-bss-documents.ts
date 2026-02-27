import * as mammoth from 'mammoth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const bssDocs = [
  { name: 'CLT HQ Staff Storyline', path: 'CLT HQ staff storyline.docx' },
  { name: 'BSS Early Growth Outline', path: 'BSS early growth outline.docx' },
  { name: 'BSS and POH Outline', path: 'BSS and POH outline.docx' },
  { name: 'Addie Power Dynamic', path: "Addie's Power dynamic.docx" },
  { name: 'Harper COO Transition', path: 'Harper COO transition story.docx' },
  { name: 'BSS Failures', path: 'BSS failures.docx' },
  { name: 'Jasper Expansion Story', path: 'Jasper expansion story.docx' },
  { name: 'Crisis Management Solutions', path: 'Crisi Management solutions.docx' },
  { name: 'BSS Description', path: 'BSS Description.docx' },
];

async function parseDoc(path: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  } catch {
    return '';
  }
}

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== PARSING BSS DOCUMENTS ===\n');

  for (const doc of bssDocs) {
    const text = await parseDoc(doc.path);
    if (!text) continue;

    console.log(`\n${'='.repeat(60)}`);
    console.log(`DOCUMENT: ${doc.name}`);
    console.log(`Length: ${text.length} characters`);
    console.log(`${'='.repeat(60)}\n`);

    // Print first 5000 characters
    const preview = text.substring(0, 5000).replace(/\n{4,}/g, '\n\n');
    console.log(preview);
    console.log('\n... [continues]');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
