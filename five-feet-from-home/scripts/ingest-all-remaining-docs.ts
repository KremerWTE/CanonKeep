import * as mammoth from 'mammoth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// All remaining documents to parse
const allDocs = [
  // BSS/Organization
  { name: 'Jasper Buddies Creation', path: 'Jasper bussdies creation.docx', category: 'BSS' },
  { name: 'Wives Club Structure', path: 'Wives Club structure.docx', category: 'Wives Club' },
  { name: 'Wives Club Characters Development', path: 'Wives Club Characters Development.docx', category: 'Wives Club' },
  { name: 'BSS Description', path: 'BSS Description.docx', category: 'BSS' },
  { name: 'Jasper and Elena Transitions', path: 'Jasper and Elena Transitions.docx', category: 'BSS' },
  { name: 'Jasper Barrett Series Chat', path: 'Jasper Barrett series chat.docx', category: 'BSS' },

  // Character Development
  { name: 'Izzy College Journey', path: 'Izzy College Journey.docx', category: 'Character' },
  { name: 'Bella Work Schedule', path: 'Bella work schedule.docx', category: 'Character' },
  { name: 'Bella Background Pre-BSS', path: "Bella's Background Pre-BSS.docx", category: 'Character' },
  { name: 'New Character Creation', path: 'New character creation.docx', category: 'Character' },
  { name: 'Character Influences', path: 'Character influences and calibaration.docx', category: 'Character' },
  { name: 'Organize Character Profiles', path: 'Organize character profiles.docx', category: 'Character' },

  // Story/Plot Documents
  { name: 'Build Evie and Sofia Chat', path: 'Build Evie and Sofia Chat.docx', category: 'Storyline' },
  { name: 'Selene Troubles', path: 'Selene Troubles.docx', category: 'Storyline' },
  { name: 'Harper Story Ideas', path: 'Harper Story ideas.docx', category: 'Storyline' },
  { name: 'Kendra Maternity Leave', path: 'Kebdra Maternity leave outline.docx', category: 'Storyline' },
  { name: 'Love Triangle Storyline', path: 'Characters_Source/Love Triangle Storyline.docx', category: 'Storyline' },
  { name: 'Vegas for Addie', path: 'Vegas for Addie.docx', category: 'Storyline' },
  { name: 'Spring Break Scene Florida', path: 'Spring Break Scene Florida.docx', category: 'Storyline' },
  { name: 'Summer Camp Setup', path: 'Summer Camp set-up.docx', category: 'Storyline' },
  { name: 'Family Party Narrative', path: 'Family Party Narrative (series closing).docx', category: 'Storyline' },
  { name: 'Traditions for Book Scenes', path: 'Traditions for book scenes.docx', category: 'Storyline' },
  { name: 'Continue Love Story Thread', path: 'Characters_Source/Continue love story thread.docx', category: 'Storyline' },

  // Five Feet From Home Book
  { name: 'FFTH Outline', path: 'Five Feet From Home/Outline.docx', category: 'Book' },
  { name: 'FFTH Five Dilemmas', path: 'Five Feet From Home/The Five Dilemmas.docx', category: 'Book' },
  { name: 'FFTH Flashback', path: 'Five Feet From Home/Flashback.docx', category: 'Book' },
  { name: 'FFTH Second Chat', path: 'Five Feet From Home/second chat.docx', category: 'Book' },
  { name: 'FFTH Chapter 1', path: 'Five Feet From Home/Chapter 1.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 2', path: 'Five Feet From Home/Chapter 2.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 3', path: 'Five Feet From Home/Chapter 3.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 4', path: 'Five Feet From Home/Chapter 4.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 5', path: 'Five Feet From Home/Chapter 5.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 6', path: 'Five Feet From Home/Chapter 6.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 7', path: 'Five Feet From Home/Chapter 7.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 8', path: 'Five Feet From Home/Chapter 8.docx', category: 'Book Chapter' },
  { name: 'FFTH Chapter 9', path: 'Five Feet From Home/Chapter 9.docx', category: 'Book Chapter' },
];

async function parseDoc(path: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  } catch (e) {
    console.log(`  Could not parse: ${path}`);
    return '';
  }
}

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== PARSING ALL REMAINING DOCUMENTS ===\n");

  const parsedDocs: { name: string; content: string; category: string }[] = [];

  for (const doc of allDocs) {
    const text = await parseDoc(doc.path);
    if (text && text.length > 100) {
      parsedDocs.push({ name: doc.name, content: text, category: doc.category });
      console.log(`Parsed: ${doc.name} (${text.length} chars) [${doc.category}]`);
    }
  }

  console.log(`\n=== CREATING STORYLINES FROM ${parsedDocs.length} DOCUMENTS ===\n`);

  // Create storylines from each parsed document
  for (const doc of parsedDocs) {
    const existing = await prisma.storyline.findFirst({
      where: { title: doc.name, projectId: project.id }
    });

    // Clean content - remove "Skip to content" and chat metadata
    let cleanContent = doc.content
      .replace(/Skip to content[\s\S]*?ChatGPT said:/g, '')
      .replace(/You said:/g, '\n---\n')
      .replace(/ChatGPT said:/g, '\n')
      .substring(0, 15000); // Limit size

    const storylineData = {
      title: doc.name,
      category: doc.category,
      description: `Content from ${doc.name} document`,
      content: cleanContent,
    };

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storylineData }
      });
      console.log(`Created storyline: ${doc.name}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storylineData
      });
      console.log(`Updated storyline: ${doc.name}`);
    }
  }

  // Now update specific characters with their document content
  console.log("\n=== UPDATING CHARACTERS FROM DOCUMENTS ===\n");

  // Update Izzy
  const izzyDoc = parsedDocs.find(d => d.name === 'Izzy College Journey');
  if (izzyDoc) {
    const izzy = await prisma.character.findFirst({
      where: { firstName: 'Izzy', projectId: project.id }
    });
    if (izzy) {
      await prisma.character.update({
        where: { id: izzy.id },
        data: {
          background: `${izzy.background || ''}\n\n--- FROM IZZY COLLEGE JOURNEY ---\n${izzyDoc.content.substring(0, 5000)}`,
          sourceFiles: 'Izzy College Journey.docx'
        }
      });
      console.log("Updated: Izzy with college journey");
    }
  }

  // Update Bella
  const bellaDoc = parsedDocs.find(d => d.name === 'Bella Background Pre-BSS');
  const bellaWorkDoc = parsedDocs.find(d => d.name === 'Bella Work Schedule');
  if (bellaDoc || bellaWorkDoc) {
    const bella = await prisma.character.findFirst({
      where: { firstName: 'Bella', projectId: project.id }
    });
    if (bella) {
      let newBackground = bella.background || '';
      if (bellaDoc) newBackground += `\n\n--- BELLA PRE-BSS ---\n${bellaDoc.content.substring(0, 4000)}`;
      if (bellaWorkDoc) newBackground += `\n\n--- BELLA WORK SCHEDULE ---\n${bellaWorkDoc.content.substring(0, 3000)}`;

      await prisma.character.update({
        where: { id: bella.id },
        data: {
          background: newBackground,
          sourceFiles: "Bella's Background Pre-BSS.docx, Bella work schedule.docx"
        }
      });
      console.log("Updated: Bella with background and work schedule");
    }
  }

  // Update Selene
  const seleneDoc = parsedDocs.find(d => d.name === 'Selene Troubles');
  if (seleneDoc) {
    const selene = await prisma.character.findFirst({
      where: { firstName: 'Selene', projectId: project.id }
    });
    if (selene) {
      await prisma.character.update({
        where: { id: selene.id },
        data: {
          background: `${selene.background || ''}\n\n--- SELENE TROUBLES ---\n${seleneDoc.content.substring(0, 5000)}`,
          sourceFiles: (selene.sourceFiles || '') + ', Selene Troubles.docx'
        }
      });
      console.log("Updated: Selene with troubles storyline");
    }
  }

  // Update Harper
  const harperDoc = parsedDocs.find(d => d.name === 'Harper Story Ideas');
  if (harperDoc) {
    const harper = await prisma.character.findFirst({
      where: { firstName: 'Harper', projectId: project.id }
    });
    if (harper) {
      await prisma.character.update({
        where: { id: harper.id },
        data: {
          background: `${harper.background || ''}\n\n--- HARPER STORY IDEAS ---\n${harperDoc.content.substring(0, 5000)}`,
          sourceFiles: (harper.sourceFiles || '') + ', Harper Story ideas.docx'
        }
      });
      console.log("Updated: Harper with story ideas");
    }
  }

  // Update Jasper
  const jasperDocs = parsedDocs.filter(d => d.name.includes('Jasper'));
  if (jasperDocs.length > 0) {
    const jasper = await prisma.character.findFirst({
      where: { firstName: 'Jasper', projectId: project.id }
    });
    if (jasper) {
      let jasperContent = jasper.background || '';
      for (const jd of jasperDocs) {
        jasperContent += `\n\n--- ${jd.name.toUpperCase()} ---\n${jd.content.substring(0, 3000)}`;
      }
      await prisma.character.update({
        where: { id: jasper.id },
        data: {
          background: jasperContent.substring(0, 15000),
          sourceFiles: jasperDocs.map(d => d.name + '.docx').join(', ')
        }
      });
      console.log("Updated: Jasper with all Jasper documents");
    }
  }

  // Update Elena
  const elenaDoc = parsedDocs.find(d => d.name === 'Jasper and Elena Transitions');
  if (elenaDoc) {
    const elena = await prisma.character.findFirst({
      where: { firstName: 'Elena', projectId: project.id }
    });
    if (elena) {
      await prisma.character.update({
        where: { id: elena.id },
        data: {
          background: `${elena.background || ''}\n\n--- ELENA TRANSITIONS ---\n${elenaDoc.content.substring(0, 5000)}`,
          sourceFiles: (elena.sourceFiles || '') + ', Jasper and Elena Transitions.docx'
        }
      });
      console.log("Updated: Elena with transition storyline");
    }
  }

  // Update Wives Club organization
  const wivesClubDocs = parsedDocs.filter(d => d.category === 'Wives Club');
  if (wivesClubDocs.length > 0) {
    const wivesClub = await prisma.organization.findFirst({
      where: { name: { contains: 'Wives' }, projectId: project.id }
    });
    if (wivesClub) {
      let wcContent = wivesClub.significance || '';
      for (const wd of wivesClubDocs) {
        wcContent += `\n\n--- ${wd.name.toUpperCase()} ---\n${wd.content.substring(0, 4000)}`;
      }
      await prisma.organization.update({
        where: { id: wivesClub.id },
        data: { significance: wcContent.substring(0, 20000) }
      });
      console.log("Updated: Wives Club organization with structure documents");
    }
  }

  // Update BSS organization
  const bssDocs = parsedDocs.filter(d => d.category === 'BSS');
  if (bssDocs.length > 0) {
    const bss = await prisma.organization.findFirst({
      where: { name: { contains: 'Barrett Strategic' }, projectId: project.id }
    });
    if (bss) {
      let bssContent = bss.significance || '';
      for (const bd of bssDocs) {
        bssContent += `\n\n--- ${bd.name.toUpperCase()} ---\n${bd.content.substring(0, 3000)}`;
      }
      await prisma.organization.update({
        where: { id: bss.id },
        data: { significance: bssContent.substring(0, 25000) }
      });
      console.log("Updated: BSS organization with all BSS documents");
    }
  }

  // Final counts
  const charCount = await prisma.character.count();
  const storylineCount = await prisma.storyline.count();
  const orgCount = await prisma.organization.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Characters: ${charCount}`);
  console.log(`Storylines: ${storylineCount}`);
  console.log(`Organizations: ${orgCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
