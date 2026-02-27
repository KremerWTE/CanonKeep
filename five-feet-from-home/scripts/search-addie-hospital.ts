import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all documents
  const docs = await prisma.document.findMany({
    select: { id: true, fileName: true }
  });

  console.log('=== SEARCHING ALL DOCUMENTS FOR ADDIE HOSPITAL ===\n');
  console.log('Documents to search:', docs.length);
  docs.forEach(d => console.log(' - ' + d.fileName));
  console.log('');

  // Search terms related to hospital stay
  const searchTerms = ['hospital', 'ER', 'emergency', 'IV', 'admitted', 'bed rest', 'doctor', 'nurse', 'recovery'];

  for (const doc of docs) {
    // Skip Chat 1 and Love Option Book 4 since we already searched those
    if (doc.fileName === 'Chat 1.docx' || doc.fileName.includes('Love Option Book 4')) {
      continue;
    }

    let foundAny = false;

    for (const term of searchTerms) {
      const blocks = await prisma.contentBlock.findMany({
        where: {
          documentId: doc.id,
          rawText: { contains: term }
        },
        take: 50
      });

      for (const b of blocks) {
        const text = b.rawText.toLowerCase();
        if (text.includes('addie') || text.includes('addison')) {
          if (!foundAny) {
            console.log('=== ' + doc.fileName + ' ===\n');
            foundAny = true;
          }
          console.log('[Block ' + b.blockIndex + '] Search term: "' + term + '"');
          console.log(b.rawText.substring(0, 800));
          console.log('\n---\n');
        }
      }
    }
  }

  // Also search for breakdown/collapse/faint across all docs
  console.log('\n=== SEARCHING FOR BREAKDOWN/COLLAPSE/FAINT ===\n');

  const breakdownTerms = ['breakdown', 'collapse', 'faint', 'pass out', 'exhaustion'];

  for (const doc of docs) {
    if (doc.fileName === 'Chat 1.docx' || doc.fileName.includes('Love Option Book 4')) {
      continue;
    }

    for (const term of breakdownTerms) {
      const blocks = await prisma.contentBlock.findMany({
        where: {
          documentId: doc.id,
          rawText: { contains: term }
        },
        take: 20
      });

      for (const b of blocks) {
        const text = b.rawText.toLowerCase();
        if (text.includes('addie') || text.includes('addison')) {
          console.log('[' + doc.fileName + ' Block ' + b.blockIndex + '] "' + term + '"');
          console.log(b.rawText.substring(0, 800));
          console.log('\n---\n');
        }
      }
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
