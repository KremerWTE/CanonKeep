import { PrismaClient } from '@prisma/client';
import * as mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== BUILDING CHAPTERS, FIXING SIRENS, AND EXPANDING SERIES ===\n");

  // ========== STEP 1: FIX SIRENS - REMOVE BSS ROLE (EXCEPT SELENE) ==========
  console.log("--- Step 1: Fixing Sirens (removing BSS role except Selene) ---\n");

  const sirens = await prisma.character.findMany({
    where: {
      projectId: project.id,
      OR: [
        { clubsAssociations: { contains: 'Sirens' } },
        { clubsAssociations: { contains: 'Vixens' } },
        { archetype: { contains: 'Siren' } }
      ]
    }
  });

  console.log(`Found ${sirens.length} Sirens characters`);

  for (const siren of sirens) {
    // Skip Selene - she works for BSS
    if (siren.firstName === 'Selene' || siren.name.includes('Selene')) {
      console.log(`  Keeping BSS role for: ${siren.name} (BSS operative)`);
      continue;
    }

    // Remove bssRole for all other Sirens
    if (siren.bssRole) {
      await prisma.character.update({
        where: { id: siren.id },
        data: { bssRole: null }
      });
      console.log(`  Cleared BSS role from: ${siren.name}`);
    }
  }

  // ========== STEP 2: BUILD OUT SELENE'S THROUPLE STORY ==========
  console.log("\n--- Step 2: Building Selene Throuple Story ---\n");

  // Read Selene Troubles document
  let seleneContent = '';
  try {
    const seleneDoc = await mammoth.extractRawText({ path: 'Selene Troubles.docx' });
    seleneContent = seleneDoc.value;
  } catch (e) {
    console.log("Could not read Selene Troubles.docx");
  }

  // Update Selene's character with throuple information
  const selene = await prisma.character.findFirst({
    where: { firstName: 'Selene', projectId: project.id }
  });

  if (selene) {
    await prisma.character.update({
      where: { id: selene.id },
      data: {
        bssRole: 'Elite Operative / Intelligence Asset - Siren Division. Uses her position in adult entertainment for intelligence gathering. Reports directly to Harper in Miami.',
        background: `${selene.background || ''}

THROUPLE STORYLINE:
Selene's unconventional relationship forms the core of her character arc. She is in a polyamorous relationship (throuple) that challenges traditional relationship norms in the BSS world. This arrangement becomes central to the "Midnight Sun" series.

Her journey explores:
- Navigating a non-traditional relationship while working in covert ops
- The tension between her public persona and private life
- How the Wives Club views her relationship
- Acceptance and growth within the BSS family

She maintains her cover as a cam star/adult entertainer while feeding intelligence to BSS Miami operations.`,
        relationships: `THROUPLE PARTNERS:
- Forms a committed three-person relationship
- The dynamic provides emotional support for dangerous work
- Partners understand her cover identity

BSS CONNECTIONS:
- Reports to Harper Vance (Miami operations)
- Jasper respects her intel capabilities
- The Wives Club has mixed feelings about her lifestyle`
      }
    });
    console.log("Updated Selene with throuple storyline");

    // Create/update Selene storylines
    const seleneStorylines = [
      {
        title: "Selene's Throuple: Love in Triplicate",
        category: "Romance/Character Arc",
        description: "Selene navigates a polyamorous relationship while working undercover for BSS",
        content: `Selene Thorne's unconventional love life becomes the heart of the Midnight Sun series. Her throuple represents a modern take on relationships that challenges the conservative Catholic undertones of the Wives Club world.

KEY BEATS:
1. Introduction of her partners (one from her old life, one she meets through BSS work)
2. Keeping the relationship secret from judgmental eyes
3. A crisis that forces her to choose between love and mission
4. The Wives Club's reaction when truth emerges
5. Finding acceptance - Elena Barrett becomes an unexpected ally
6. The throuple attending a Wives Club function for the first time

THEMES:
- Love doesn't fit neat categories
- Family is who you choose
- Acceptance within traditional structures`,
        characters: JSON.stringify(['Selene Thorne']),
        themes: JSON.stringify(['Polyamory', 'Acceptance', 'Identity', 'Found Family'])
      },
      {
        title: "Midnight Sun: Selene's Origin",
        category: "Backstory",
        description: "How Selene went from cam star to BSS operative",
        content: `Selene Thorne was discovered by Harper Vance during an operation where Selene's online platform gave her access to a high-value target. Rather than dismissing her, Harper recognized Selene's intelligence skills and emotional resilience.

ORIGIN BEATS:
1. Selene building her cam empire after escaping a difficult past
2. A client turns out to be connected to a BSS case
3. Harper makes contact, initially as a "fan"
4. Selene provides crucial intel, saves a BSS operation
5. Harper offers her a position - maintain cover, gather intelligence
6. Selene proves herself in Miami operations

Why it works:
- Her platform gives access no traditional operative has
- Targets let their guard down around her
- She's invisible in plain sight`,
        characters: JSON.stringify(['Selene Thorne', 'Harper Vance']),
        themes: JSON.stringify(['Redemption', 'Undercover', 'Hidden Talents'])
      },
      {
        title: "Selene and the Wives Club",
        category: "Social Dynamics",
        description: "Selene's complicated relationship with the Wives Club",
        content: `Selene exists in a strange limbo within the BSS world. She's too valuable to dismiss but too unconventional to fully embrace.

KEY DYNAMICS:
- Elena sees her as useful for events (Selene has access to celebrity circles)
- Addie respects her work ethic and discretion
- Some wives whisper behind her back
- Others secretly admire her freedom
- She's invited to galas but always feels like an outsider

TURNING POINT:
When Selene's intelligence prevents a major disaster, the Wives Club begins to shift. Elena publicly thanks her. Addie makes a point to sit with her at the next function. Slowly, acceptance grows.`,
        characters: JSON.stringify(['Selene Thorne', 'Elena Barrett', 'Addie']),
        themes: JSON.stringify(['Acceptance', 'Judgment', 'Redemption'])
      }
    ];

    for (const storyline of seleneStorylines) {
      const existing = await prisma.storyline.findFirst({
        where: { title: storyline.title, projectId: project.id }
      });

      if (!existing) {
        await prisma.storyline.create({
          data: { projectId: project.id, ...storyline }
        });
        console.log(`Created storyline: ${storyline.title}`);
      } else {
        await prisma.storyline.update({
          where: { id: existing.id },
          data: storyline
        });
        console.log(`Updated storyline: ${storyline.title}`);
      }
    }
  }

  // Update Midnight Sun series
  const midnightSun = await prisma.bookSeries.findFirst({
    where: { name: { contains: 'Midnight Sun' }, projectId: project.id }
  });

  if (midnightSun) {
    await prisma.bookSeries.update({
      where: { id: midnightSun.id },
      data: {
        protagonist: 'Selene Thorne',
        premise: `Selene Thorne is a cam star with a secret - she's an intelligence operative for BSS Miami. Her unconventional throuple relationship provides the emotional anchor for a life lived in shadows. The series follows her journey from outsider to accepted member of the BSS family.

SERIES ARC:
Book 1 - "Cover Identity": Selene's recruitment and first major operation
Book 2 - "Heart of Three": The throuple faces a crisis that threatens everything
Book 3 - "Into the Light": Selene's relationship becomes public; she must choose between her cover and her love
Book 4 - "Midnight Sun": Full acceptance into the BSS world while maintaining her unique position`,
        books: JSON.stringify([
          { number: 1, title: "Cover Identity", synopsis: "Selene is recruited by Harper after inadvertently helping a BSS operation. She learns to balance her public persona with covert work." },
          { number: 2, title: "Heart of Three", synopsis: "Selene's throuple is tested when one partner discovers her true work. Trust must be rebuilt while a mission goes sideways." },
          { number: 3, title: "Into the Light", synopsis: "The Wives Club learns about Selene's relationship. She must navigate judgment while a threat from her past emerges." },
          { number: 4, title: "Midnight Sun", synopsis: "Selene fully integrates into BSS, attending galas on her own terms. Her throuple is accepted. A final test of loyalty." }
        ]),
        totalBooks: 4,
        themes: JSON.stringify(['Identity', 'Polyamory', 'Acceptance', 'Covert Operations', 'Found Family'])
      }
    });
    console.log("Updated Midnight Sun series with full arc");
  }

  // ========== STEP 3: BUILD FIVE FEET FROM HOME CHAPTERS ==========
  console.log("\n--- Step 3: Building Five Feet From Home Chapters ---\n");

  // Get or create the FFTH book
  let ffthBook = await prisma.book.findFirst({
    where: { title: { contains: 'Five Feet From Home' }, projectId: project.id }
  });

  if (!ffthBook) {
    ffthBook = await prisma.book.create({
      data: {
        projectId: project.id,
        title: 'Five Feet From Home: Book 1',
        synopsis: 'Jasper Barrett runs Barrett Strategic Solutions while trying to be present for his family. When a series of crises converge, he must choose between the mission and the home he claims to protect.',
        status: 'drafting'
      }
    });
  }

  // Read and parse chapter files
  const chapterDir = 'Five Feet From Home';
  const chapterFiles = fs.readdirSync(chapterDir).filter(f => f.startsWith('Chapter') && f.endsWith('.docx'));

  for (const file of chapterFiles) {
    const match = file.match(/Chapter (\d+)/);
    if (!match) continue;

    const chapterNum = parseInt(match[1]);
    const filePath = path.join(chapterDir, file);

    try {
      const doc = await mammoth.extractRawText({ path: filePath });
      const text = doc.value;

      // Extract first paragraph as synopsis
      const paragraphs = text.split('\n').filter(p => p.trim().length > 50);
      const synopsis = paragraphs.slice(0, 2).join('\n').substring(0, 500);

      // Try to identify POV character
      let pov = 'Jasper Barrett';
      if (text.toLowerCase().includes('elena thought') || text.toLowerCase().includes("elena's perspective")) {
        pov = 'Elena Barrett';
      } else if (text.toLowerCase().includes('addie thought') || text.toLowerCase().includes("addie's perspective")) {
        pov = 'Addie';
      }

      // Check if chapter exists
      const existingChapter = await prisma.chapter.findFirst({
        where: { bookId: ffthBook.id, number: chapterNum }
      });

      if (!existingChapter) {
        await prisma.chapter.create({
          data: {
            projectId: project.id,
            bookId: ffthBook.id,
            number: chapterNum,
            title: `Chapter ${chapterNum}`,
            synopsis: synopsis,
            pov: pov,
            sortOrder: chapterNum,
            status: 'draft'
          }
        });
        console.log(`Created Chapter ${chapterNum}`);
      } else {
        await prisma.chapter.update({
          where: { id: existingChapter.id },
          data: { synopsis }
        });
        console.log(`Updated Chapter ${chapterNum}`);
      }
    } catch (e) {
      console.log(`Could not process ${file}: ${e}`);
    }
  }

  // Read the Outline document for chapter summaries
  try {
    const outline = await mammoth.extractRawText({ path: path.join(chapterDir, 'Outline.docx') });
    const outlineText = outline.value;

    // Parse outline for chapter info
    const chapterMatches = outlineText.match(/Chapter \d+[:\s]+[^\n]+/gi);
    if (chapterMatches) {
      for (const match of chapterMatches) {
        const numMatch = match.match(/Chapter (\d+)/i);
        if (numMatch) {
          const num = parseInt(numMatch[1]);
          const chapter = await prisma.chapter.findFirst({
            where: { bookId: ffthBook.id, number: num }
          });
          if (chapter) {
            const title = match.replace(/Chapter \d+[:\s]*/i, '').trim();
            if (title && title.length > 3) {
              await prisma.chapter.update({
                where: { id: chapter.id },
                data: { title: `Chapter ${num}: ${title}` }
              });
            }
          }
        }
      }
    }
    console.log("Applied outline titles to chapters");
  } catch (e) {
    console.log("Could not read Outline.docx");
  }

  // ========== STEP 4: BUILD CHRIS & KENDRA SERIES ==========
  console.log("\n--- Step 4: Building Chris & Kendra Series ---\n");

  // Read Chris background
  let chrisContent = '';
  try {
    const chrisDoc = await mammoth.extractRawText({ path: 'Chris background expnasion.docx' });
    chrisContent = chrisDoc.value;
  } catch (e) {}

  // Read Kendra maternity leave
  let kendraContent = '';
  try {
    const kendraDoc = await mammoth.extractRawText({ path: 'Kebdra Maternity leave outline.docx' });
    kendraContent = kendraDoc.value;
  } catch (e) {}

  const chrisKendraSeries = await prisma.bookSeries.findFirst({
    where: { name: { contains: 'Faith, Fitness' }, projectId: project.id }
  });

  if (chrisKendraSeries) {
    await prisma.bookSeries.update({
      where: { id: chrisKendraSeries.id },
      data: {
        name: 'Faith, Fitness & Fortune: The Chris & Kendra Story',
        protagonist: 'Chris & Kendra Donnelly',
        premise: `Chris and Kendra Donnelly are the heart of the BSS family culture. Chris, a former athlete turned BSS executive, and Kendra, a fitness influencer and pillar of the Wives Club, navigate the challenges of elite careers while raising a family.

Their story explores:
- Balancing high-powered careers with parenthood
- Kendra's maternity leave and the challenges of stepping back
- Chris's rise within BSS and the sacrifices it demands
- Their faith as an anchor in a morally complex world
- The Donnelly family as the emotional center of the Five Feet universe`,
        books: JSON.stringify([
          { number: 1, title: "Iron Sharpens Iron", synopsis: "Chris joins BSS and learns the ropes under Jasper's mentorship. Kendra adjusts to being a BSS wife." },
          { number: 2, title: "The Maternity Bind", synopsis: "Kendra's pregnancy and maternity leave. She struggles with stepping back from her fitness empire. Chris takes on more responsibility at BSS." },
          { number: 3, title: "Returning Stronger", synopsis: "Kendra returns to work, balancing motherhood and career. Chris faces a crisis that tests his values." },
          { number: 4, title: "The Donnelly Legacy", synopsis: "The family fully established. Chris as a senior BSS leader, Kendra as Wives Club leader. Their children's futures." }
        ]),
        totalBooks: 4,
        themes: JSON.stringify(['Family', 'Faith', 'Fitness', 'Career vs Home', 'Partnership'])
      }
    });
    console.log("Updated Chris & Kendra series");

    // Add storylines
    const ckStorylines = [
      {
        title: "Kendra's Maternity Leave",
        category: "Character Arc",
        description: "Kendra navigates stepping back from her fitness empire during pregnancy",
        content: `Kendra Donnelly built a fitness empire. Stepping back for maternity leave feels like losing part of herself.

KEY BEATS:
1. Discovering the pregnancy - joy mixed with fear about career
2. Trying to maintain her fitness presence while pregnant
3. The physical and emotional challenges of late pregnancy
4. Handing over control to her team - harder than any workout
5. Postpartum reality vs. expectations
6. Finding a new identity that includes motherhood
7. The Wives Club rallies around her

EMOTIONAL CORE:
Kendra has always been in control. Pregnancy and motherhood force her to surrender control - and discover she's stronger for it.`,
        characters: JSON.stringify(['Kendra Donnelly', 'Chris Donnelly']),
        themes: JSON.stringify(['Motherhood', 'Identity', 'Control', 'Surrender'])
      },
      {
        title: "Chris's Rise in BSS",
        category: "Character Arc",
        description: "Chris's journey from athlete to BSS executive",
        content: `Chris Donnelly's athletic career ended with an injury. Jasper saw potential and recruited him to BSS.

CAREER ARC:
1. Early days - Chris as a junior operator, learning the business
2. His athleticism translates to tactical work
3. Earning Jasper's trust through a crisis well-handled
4. Transitioning from field to management
5. Becoming a mentor to younger operators
6. Balancing work demands with family needs

CONFLICTS:
- Missing family moments for work
- Ethical dilemmas that test his faith
- Competition with other rising BSS leaders
- Knowing when to fight and when to delegate`,
        characters: JSON.stringify(['Chris Donnelly', 'Jasper Barrett']),
        themes: JSON.stringify(['Career', 'Mentorship', 'Faith', 'Sacrifice'])
      }
    ];

    for (const storyline of ckStorylines) {
      const existing = await prisma.storyline.findFirst({
        where: { title: storyline.title, projectId: project.id }
      });

      if (!existing) {
        await prisma.storyline.create({
          data: { projectId: project.id, ...storyline }
        });
        console.log(`Created storyline: ${storyline.title}`);
      }
    }
  }

  // ========== STEP 5: COMBINE DUPLICATE SERIES ==========
  console.log("\n--- Step 5: Combining Duplicate Series ---\n");

  // Check for Royal Phoenix duplicates
  const royalPhoenixList = await prisma.bookSeries.findMany({
    where: { name: { contains: 'Royal Phoenix' }, projectId: project.id }
  });

  if (royalPhoenixList.length > 1) {
    // Keep the one with more content, delete others
    const primary = royalPhoenixList.reduce((a, b) =>
      (a.premise?.length || 0) > (b.premise?.length || 0) ? a : b
    );

    for (const series of royalPhoenixList) {
      if (series.id !== primary.id) {
        await prisma.bookSeries.delete({ where: { id: series.id } });
        console.log(`Deleted duplicate: ${series.name}`);
      }
    }

    // Update the primary
    await prisma.bookSeries.update({
      where: { id: primary.id },
      data: { name: "The Royal Phoenix: Addie's Story" }
    });
    console.log("Consolidated Royal Phoenix series");
  }

  // Final counts
  const seriesCount = await prisma.bookSeries.count();
  const chapterCount = await prisma.chapter.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Book Series: ${seriesCount}`);
  console.log(`Chapters: ${chapterCount}`);
  console.log(`Storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
