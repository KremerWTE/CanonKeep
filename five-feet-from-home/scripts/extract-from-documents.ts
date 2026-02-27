/**
 * Extract character and crisis information from all documents
 * Compiles findings into profiles even if conflicting
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DocumentMention {
  document: string;
  section: string | null;
  text: string;
}

async function searchDocumentsForTerm(searchTerms: string[]): Promise<DocumentMention[]> {
  const mentions: DocumentMention[] = [];

  for (const term of searchTerms) {
    if (!term || term.length < 2) continue;

    const blocks = await prisma.contentBlock.findMany({
      where: {
        rawText: {
          contains: term,
        },
      },
      include: {
        document: { select: { fileName: true } },
      },
      take: 100, // Limit per term to avoid overwhelming
    });

    for (const block of blocks) {
      // Skip if already have this exact text
      if (mentions.some(m => m.text === block.rawText)) continue;

      mentions.push({
        document: block.document.fileName,
        section: block.sectionHeading,
        text: block.rawText.length > 1000
          ? block.rawText.substring(0, 1000) + '...'
          : block.rawText,
      });
    }
  }

  return mentions;
}

function getSearchTermsForCharacter(name: string, nickname?: string | null, aliases?: string | null): string[] {
  const terms: string[] = [name];

  // Add first name
  if (name.includes(' ')) {
    terms.push(name.split(' ')[0]);
  }

  // Add nickname
  if (nickname) {
    terms.push(nickname.replace(/"/g, ''));
  }

  // Add aliases
  if (aliases) {
    terms.push(...aliases.split(/[,;]/).map(a => a.trim()).filter(a => a.length > 2));
  }

  // Handle special name patterns like 'Cole "Hawk" Hawkins'
  const quotedMatch = name.match(/"([^"]+)"/);
  if (quotedMatch) {
    terms.push(quotedMatch[1]);
  }

  return Array.from(new Set(terms)); // Dedupe
}

async function extractCharacterInfo() {
  console.log('=== EXTRACTING CHARACTER INFORMATION FROM DOCUMENTS ===\n');

  const characters = await prisma.character.findMany({
    orderBy: { name: 'asc' },
  });

  console.log(`Processing ${characters.length} characters...\n`);

  let processed = 0;
  for (const char of characters) {
    const searchTerms = getSearchTermsForCharacter(char.name, char.nickname, char.aliases);

    const mentions = await searchDocumentsForTerm(searchTerms);

    if (mentions.length > 0) {
      // Compile all mentions into rawNotes
      let compiledNotes = `=== DOCUMENT EXTRACTIONS FOR ${char.name.toUpperCase()} ===\n`;
      compiledNotes += `Search terms used: ${searchTerms.join(', ')}\n`;
      compiledNotes += `Found ${mentions.length} mentions across documents\n\n`;

      // Group by document
      const byDocument = new Map<string, DocumentMention[]>();
      for (const m of mentions) {
        if (!byDocument.has(m.document)) {
          byDocument.set(m.document, []);
        }
        byDocument.get(m.document)!.push(m);
      }

      for (const [doc, docMentions] of Array.from(byDocument.entries())) {
        compiledNotes += `--- ${doc} ---\n`;
        for (const m of docMentions) {
          if (m.section) {
            compiledNotes += `[${m.section}]\n`;
          }
          compiledNotes += `${m.text}\n\n`;
        }
      }

      // Truncate if too long (Prisma text field limit)
      if (compiledNotes.length > 50000) {
        compiledNotes = compiledNotes.substring(0, 50000) + '\n\n[TRUNCATED - Too many mentions]';
      }

      await prisma.character.update({
        where: { id: char.id },
        data: { rawNotes: compiledNotes },
      });

      console.log(`  ${char.name}: ${mentions.length} mentions from ${byDocument.size} documents`);
      processed++;
    } else {
      console.log(`  ${char.name}: No mentions found`);
    }
  }

  console.log(`\nProcessed ${processed} characters with document mentions`);
}

async function extractCrisisInfo() {
  console.log('\n=== EXTRACTING CRISIS INFORMATION FROM DOCUMENTS ===\n');

  const crises = await prisma.crisis.findMany({
    orderBy: { name: 'asc' },
  });

  console.log(`Processing ${crises.length} crises...\n`);

  let processed = 0;
  for (const crisis of crises) {
    // Build search terms from crisis name
    const searchTerms: string[] = [crisis.name];

    // Add codename if exists
    if (crisis.codeName) {
      searchTerms.push(crisis.codeName);
    }

    // Add key words from name
    const keywords = crisis.name.split(/[\s\-]+/).filter(w => w.length > 4);
    searchTerms.push(...keywords);

    const mentions = await searchDocumentsForTerm(searchTerms);

    if (mentions.length > 0) {
      let compiledNotes = `=== DOCUMENT EXTRACTIONS FOR ${crisis.name.toUpperCase()} ===\n`;
      compiledNotes += `Search terms: ${searchTerms.join(', ')}\n`;
      compiledNotes += `Found ${mentions.length} mentions\n\n`;

      for (const m of mentions) {
        compiledNotes += `--- ${m.document} ---\n`;
        if (m.section) compiledNotes += `[${m.section}]\n`;
        compiledNotes += `${m.text}\n\n`;
      }

      // Truncate if needed
      if (compiledNotes.length > 20000) {
        compiledNotes = compiledNotes.substring(0, 20000) + '\n\n[TRUNCATED]';
      }

      // Store in lessonsLearned field (repurposing for notes)
      await prisma.crisis.update({
        where: { id: crisis.id },
        data: { lessonsLearned: compiledNotes },
      });

      console.log(`  ${crisis.name}: ${mentions.length} mentions`);
      processed++;
    } else {
      console.log(`  ${crisis.name}: No mentions found`);
    }
  }

  console.log(`\nProcessed ${processed} crises with document mentions`);
}

async function main() {
  console.log('Starting document extraction...\n');
  console.log('This will search all 212,000+ content blocks for character and crisis mentions.\n');

  await extractCharacterInfo();
  await extractCrisisInfo();

  console.log('\n=== EXTRACTION COMPLETE ===');
  console.log('Character rawNotes and crisis lessonsLearned fields now contain document extractions.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
