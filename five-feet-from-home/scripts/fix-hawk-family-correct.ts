import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== FIXING HAWK'S FAMILY WITH CORRECT DATA FROM DOCUMENTS ===\n");

  // Delete the placeholder I created
  const placeholder = await prisma.character.findFirst({
    where: { name: "Hawk's Sister", projectId: project.id }
  });
  if (placeholder) {
    await prisma.character.delete({ where: { id: placeholder.id } });
    console.log("Deleted placeholder entry");
  }

  // Create Sarah - Hawk's actual sister from the documents
  const sarah = {
    name: 'Sarah Hawkins',
    firstName: 'Sarah',
    lastName: 'Hawkins',
    archetype: "Hawk's Sister",
    background: `Hawk's younger sister who lives in Dallas with her husband and children.

Their relationship is cordial but distant. Sarah lives a normal life with her family, far away from Hawk's dangerous world.

Hawk keeps her at arm's length—protecting her from the world he moves in. They talk occasionally (birthdays, holidays), but Hawk compartmentalizes that world. He doesn't want his dangerous life touching hers.`,
    hubLocation: 'Dallas, TX',
    relationships: `Sister to Hawk (only blood relative)
Married with children
Lives a normal life away from BSS world`,
    sourceFiles: 'Hawk character background.docx'
  };

  const existingSarah = await prisma.character.findFirst({
    where: { firstName: 'Sarah', lastName: 'Hawkins', projectId: project.id }
  });

  if (!existingSarah) {
    await prisma.character.create({
      data: { projectId: project.id, ...sarah }
    });
    console.log("Created: Sarah Hawkins (Hawk's sister in Dallas)");
  } else {
    await prisma.character.update({
      where: { id: existingSarah.id },
      data: sarah
    });
    console.log("Updated: Sarah Hawkins");
  }

  // Update Hawk with correct family and Las Vegas background
  const hawk = await prisma.character.findFirst({
    where: {
      OR: [
        { nickname: 'Hawk' },
        { name: { contains: 'Hawk' } }
      ],
      archetype: { not: { contains: 'Sister' } },
      projectId: project.id
    }
  });

  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        relationships: `BLOOD FAMILY:
- Parents: Gone (estranged or deceased)
- Sister: Sarah - Lives in Dallas with her husband and children
- They talk occasionally (birthdays, holidays) but Hawk keeps her at arm's length to protect her from his world

CHOSEN FAMILY (THE BROTHERHOOD):
- His teammates/brothers-in-arms are his true family
- Loyalty is absolute; betrayal is unforgivable
- He carries the weight of the fallen silently but constantly

PARTNER:
- Addie - The love of his life

BSS FAMILY:
- Jasper Barrett - Gave him purpose after military
- Chris Donnelly - Lives adjacent to his property
- The operators - Brothers in arms`,
        background: `ORIGIN:
Grew up in a small, hard-edged Texas town. Life was survival, grit, and loyalty over bloodlines.

MILITARY CAREER:
Distinguished military career with a reputation for calm under pressure and surgical precision in operations. Rose to a leadership role embodying the ethos of never leaving a man behind.

LAS VEGAS CHAPTER (PRE-CHARLOTTE):
After transitioning out of active military service, Hawk spent several years in Las Vegas, working high-level private security and crisis operations. Specialized in protection and crisis management before connecting with Jasper and joining BSS.

TRANSITION TO BSS:
Jasper recruited him, recognizing a warrior who needed purpose. Charlotte became home. BSS became family.

PERSONALITY:
- Stoic and magnetic - doesn't waste words, but when he speaks, people listen
- Rigid code of honor - protect those under his care at all costs, never abandon a brother
- Quiet depth that reveals itself only in rare, intimate moments
- Fiercely private; few people know his whole story

HOME:
Built a home base adjacent to Chris and Kendra's estate, symbolizing both independence and commitment to the "new family" circle.`
      }
    });
    console.log("Updated Hawk with correct background from documents");
  }

  console.log("\n=== HAWK FAMILY CORRECTED ===");

  await prisma.$disconnect();
}

main().catch(console.error);
