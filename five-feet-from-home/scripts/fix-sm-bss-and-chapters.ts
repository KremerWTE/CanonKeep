import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Part 1: Fixing SM/BSS Relationship ===\n");

  // Update Sapientia Minervae - NOT organizationally connected to BSS
  const sapientia = await prisma.organization.findFirst({
    where: { projectId: project.id, name: { contains: 'Sapientia' } }
  });

  if (sapientia) {
    await prisma.organization.update({
      where: { id: sapientia.id },
      data: {
        description: `Sapientia Minervae ("Wisdom of Minerva") - Also known as The Wives Club

NOT organizationally connected to BSS - the connection is through PEOPLE only.

WHAT IT IS:
- A women's power network / social organization
- Catholic intellectual and philanthropic traditions
- Operates independently from BSS

CONNECTION TO BSS WORLD:
- Many BSS wives are members (Elena, Kendra, Bella, etc.)
- Some female BSS employees participate (Addie, Harper)
- The PEOPLE overlap, but the organizations are separate

KEY MEMBERS:
- Addie (Patroness of Honor / POH leader)
- Elena Barrett
- Kendra
- Bella
- Harper
- Other wives and female associates

NOTE: SM and BSS share people, not structure. A crisis at BSS doesn't involve SM as an org, but the women who are members of both may coordinate.`,
        relationships: JSON.stringify({
          type: 'Independent organization',
          connection_to_bss: 'Through members only - wives and female employees',
          key_members: ['Addie', 'Elena', 'Kendra', 'Bella', 'Harper']
        })
      }
    });
    console.log("Updated Sapientia Minervae - clarified NOT org-linked to BSS");
  }

  // Update BSS to clarify the relationship
  const bss = await prisma.organization.findFirst({
    where: { projectId: project.id, name: { contains: 'Barrett Strategic' } }
  });

  if (bss) {
    await prisma.organization.update({
      where: { id: bss.id },
      data: {
        relationships: JSON.stringify({
          type: 'Corporation',
          note: 'BSS and Sapientia Minervae are NOT organizationally connected. The only connection is through shared people - wives and female employees who are members of SM.',
          affiliated_orgs: ['Palace of Honor (POH)'],
          people_connection_to_sm: 'Elena, Kendra, Bella, Addie, Harper are members of both worlds'
        })
      }
    });
    console.log("Updated BSS - clarified indirect connection to SM");
  }

  // Update the storyline too
  const storyline = await prisma.storyline.findFirst({
    where: { projectId: project.id, title: 'BSS and Sapientia Minervae Partnership' }
  });

  if (storyline) {
    await prisma.storyline.update({
      where: { id: storyline.id },
      data: {
        title: 'BSS and Sapientia Minervae Connection (Through People)',
        description: `BSS and Sapientia Minervae are NOT organizationally connected.

The connection exists only through the PEOPLE who are members of both:
- Elena Barrett - Jasper's wife, SM member
- Addie - BSS fixer, SM Patroness of Honor
- Kendra - BSS analyst, SM member
- Bella - BSS assistant/coordinator, SM member
- Harper - BSS COO, SM participant

IMPORTANT: When the wives coordinate on something (like Elena's thank-you party), it's as individuals, not as SM acting with BSS.

The "Wives Club" operates its own social calendar, charitable work, and traditions completely independent of BSS crisis work.`
      }
    });
    console.log("Updated storyline to clarify people-only connection");
  }

  console.log("\n=== Part 2: Extracting ALL Book 1 Chapters ===\n");

  // Read the book1 sources
  const content = fs.readFileSync('book1_all_sources.txt', 'utf-8');

  // Find all chapter titles with their line numbers
  const chapterPattern = /^(Chapter \d+[\d.]*)\s*[–—-]\s*(.+)$/gm;
  const chapters: { number: string; title: string; lineNum: number }[] = [];

  let match;
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const chMatch = line.match(/^Chapter (\d+[\d.]*)\s*[–—-]\s*(.+)$/);
    if (chMatch) {
      chapters.push({
        number: chMatch[1],
        title: chMatch[2].trim(),
        lineNum: i
      });
    }
  }

  // Dedupe by chapter number, keeping the last (most refined) version
  const chapterMap = new Map<string, { title: string; lineNum: number }>();
  for (const ch of chapters) {
    // Skip Retrofit versions for now
    if (ch.title.includes('Retrofit')) continue;
    chapterMap.set(ch.number, { title: ch.title, lineNum: ch.lineNum });
  }

  console.log(`Found ${chapterMap.size} unique chapters:\n`);

  // Sort by chapter number
  const sortedChapters = Array.from(chapterMap.entries())
    .sort((a, b) => {
      const numA = parseFloat(a[0]);
      const numB = parseFloat(b[0]);
      return numA - numB;
    });

  for (const [num, data] of sortedChapters) {
    console.log(`  Ch ${num}: ${data.title}`);
  }

  // Find Book 1 record
  const book1 = await prisma.book.findFirst({
    where: { projectId: project.id, title: 'Five Feet From Home' }
  });

  if (!book1) {
    console.log("\nBook 1 not found!");
    await prisma.$disconnect();
    return;
  }

  // Clear existing chapters
  await prisma.chapter.deleteMany({ where: { bookId: book1.id } });
  console.log("\nCleared existing chapters");

  // Create all chapters
  let created = 0;
  for (const [num, data] of sortedChapters) {
    const chNum = Math.floor(parseFloat(num));

    // Extract some content from around the chapter heading
    const startLine = data.lineNum;
    const chapterContent = lines.slice(startLine, startLine + 50).join('\n');

    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book1.id,
        number: chNum,
        title: data.title,
        synopsis: `Chapter ${num} of Book 1. [Content extracted from source documents]`,
        pov: 'Jasper Barrett',
        status: 'drafted',
        tags: `Book 1, Chapter ${num}`
      }
    });
    created++;
  }

  console.log(`\nCreated ${created} chapters for Book 1`);

  // Update book synopsis
  await prisma.book.update({
    where: { id: book1.id },
    data: {
      synopsis: `Five Feet From Home - Book 1 of the Jasper Barrett Series

${sortedChapters.length} chapters from The Call through Elena's thank-you party.

Jasper Barrett, corporate crisis manager, must learn to balance his all-consuming work with his family - Elena and daughter Grace. When Elena has a medical crisis, Jasper is forced to confront what matters most.

The book culminates in a thank-you party at Jasper's house, celebrating the community that supported the family through the crisis.`
    }
  });

  console.log("\n=== Done ===");
  await prisma.$disconnect();
}

main().catch(console.error);
