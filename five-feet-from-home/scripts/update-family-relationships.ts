import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== UPDATING FAMILY RELATIONSHIPS ===\n');

  // Complete family data extracted from source documents
  const familyData = [
    {
      name: 'Jasper Barrett',
      relationships: JSON.stringify({
        spouse: 'Elena Barrett',
        children: ['Grace Barrett', 'Lucas Barrett'],
        sisterInLaw: 'Sara Whitaker',
        brotherInLaw: 'Mark Whitaker',
        nieces: ['Isabella Alvarez', 'Emma Whitaker', 'Chloe Whitaker', 'Lily Whitaker'],
        nephews: ['Ethan Whitaker'],
        godchildren: [],
        details: [
          { name: 'Elena Barrett', relation: 'wife', notes: 'Former photographer, CEO of Maison Aurelia' },
          { name: 'Grace Barrett', relation: 'daughter', notes: 'Age 7-10 across series, loves Frozen, calls Addie "silly Aunt Addie"' },
          { name: 'Lucas Barrett', relation: 'son', notes: 'Younger sibling to Grace' }
        ]
      })
    },
    {
      name: 'Elena Barrett',
      relationships: JSON.stringify({
        spouse: 'Jasper Barrett',
        children: ['Grace Barrett', 'Lucas Barrett'],
        sister: 'Sara Whitaker',
        brotherInLaw: 'Mark Whitaker',
        nieces: ['Isabella Alvarez', 'Emma Whitaker', 'Chloe Whitaker', 'Lily Whitaker'],
        nephews: ['Ethan Whitaker'],
        details: [
          { name: 'Jasper Barrett', relation: 'husband', notes: 'Crisis manager, founder of BSS' },
          { name: 'Sara Whitaker', relation: 'younger sister', notes: 'CrossFit coach, helps with childcare' },
          { name: 'Addie', relation: 'sister figure/godmother to children', notes: 'Deep bond, facilitates healing' }
        ]
      })
    },
    {
      name: 'Grace Barrett',
      relationships: JSON.stringify({
        parents: ['Jasper Barrett', 'Elena Barrett'],
        siblings: ['Lucas Barrett'],
        aunts: ['Sara Whitaker', 'Addie (godmother)', 'Kendra (aunt figure)'],
        uncles: ['Mark Whitaker', 'Hawk (Uncle Hawk)'],
        cousins: ['Isabella Alvarez', 'Emma', 'Chloe', 'Lily', 'Ethan'],
        details: [
          { name: 'Addie', relation: 'godmother/aunt figure', notes: 'Calls her "silly Aunt Addie"' },
          { name: 'Hawk', relation: 'uncle figure', notes: 'Named him "Uncle Hawk", he teaches her to punch' },
          { name: 'Kendra', relation: 'aunt figure', notes: 'Does braids and face masks with Grace' },
          { name: 'Bella', relation: 'fun aunt', notes: 'Teaches horseback riding' }
        ]
      })
    },
    {
      name: 'Sara Whitaker',
      relationships: JSON.stringify({
        spouse: 'Mark Whitaker',
        children: ['Isabella "Izzy" Alvarez', 'Emma', 'Chloe', 'Lily', 'Ethan'],
        sister: 'Elena Barrett',
        brotherInLaw: 'Jasper Barrett',
        nieces: ['Grace Barrett'],
        nephews: ['Lucas Barrett'],
        details: [
          { name: 'Mark Whitaker', relation: 'husband', notes: 'Supportive, involved father' },
          { name: 'Isabella "Izzy" Alvarez', relation: 'oldest daughter', notes: 'Applying to colleges, natural leader' },
          { name: 'Emma', relation: 'daughter', notes: 'Close in age to Grace, playmates' },
          { name: 'Elena Barrett', relation: 'older sister', notes: 'Protective relationship, sounding board' }
        ]
      })
    },
    {
      name: 'Addison Price',
      relationships: JSON.stringify({
        chosenFamily: true,
        godchildren: ['Grace Barrett', 'Lucas Barrett'],
        sisterFigures: ['Elena Barrett', 'Kendra'],
        bossFamilyFigure: 'Jasper Barrett',
        romanticInterest: 'Hawk (Ethan Hawkins)',
        protectorFigure: 'Cole',
        details: [
          { name: 'Grace Barrett', relation: 'goddaughter', notes: 'Grace calls her "silly Aunt Addie"' },
          { name: 'Lucas Barrett', relation: 'godson', notes: 'Part of barn play scenes' },
          { name: 'Elena Barrett', relation: 'sister figure', notes: 'Deep bond, intimacy storyline' },
          { name: 'Kendra', relation: 'complicated past/sister figure', notes: 'Former romantic relationship, healing journey' },
          { name: 'Hawk', relation: 'boyfriend/partner', notes: 'Met during Elena hospital crisis, relocates to Charlotte for her' },
          { name: 'Cole', relation: 'protector/father figure', notes: 'Tier 1 operator, sees Addie as daughter' }
        ]
      })
    },
    {
      name: 'Hawk',
      relationships: JSON.stringify({
        romanticPartner: 'Addison Price (Addie)',
        nieceFigure: 'Grace Barrett',
        brotherFigure: 'Cole',
        details: [
          { name: 'Addie', relation: 'girlfriend/partner', notes: 'Relocates from Vegas to Charlotte for her' },
          { name: 'Grace Barrett', relation: 'niece figure', notes: 'She named him Uncle Hawk, teaches her to punch' },
          { name: 'Cole', relation: 'brother/teammate', notes: 'Former Tier 1 operator together' },
          { name: 'Jasper Barrett', relation: 'colleague/friend', notes: 'Mutual respect, parallel operators' }
        ]
      })
    },
    {
      name: 'Kendra Whitaker',
      relationships: JSON.stringify({
        spouse: 'Chris Whitaker',
        children: ['Newborn Daughter'],
        sisterFigures: ['Addie', 'Elena Barrett'],
        details: [
          { name: 'Chris Whitaker', relation: 'husband', notes: 'Notre Dame grad, Irish-Catholic from Chicago' },
          { name: 'Newborn Daughter', relation: 'daughter', notes: 'Born around same time as Elena third child' },
          { name: 'Addie', relation: 'complicated past/sister', notes: 'Former romantic relationship, healing with Chris blessing' },
          { name: 'Elena Barrett', relation: 'close friend/sister figure', notes: 'Facilitates healing between Kendra and Addie' }
        ]
      })
    },
    {
      name: 'Chris Whitaker',
      relationships: JSON.stringify({
        spouse: 'Kendra Whitaker',
        children: ['Newborn Daughter'],
        parents: ['Mother (literature teacher)', 'Father (high school principal)'],
        siblings: ['Older Brother (Chicago firefighter)', 'Younger Sister (Boston nurse)'],
        closeFriend: 'Father Matt Callahan (college roommate, diocesan priest)',
        details: [
          { name: 'Kendra', relation: 'wife', notes: 'Engagement at Hawk Foundation Gala NYC' },
          { name: 'Father Matt Callahan', relation: 'college buddy', notes: 'Notre Dame roommate, now diocesan priest' }
        ]
      })
    },
    {
      name: 'Harper Caldwell',
      relationships: JSON.stringify({
        fiance: 'Daniel Cruz',
        details: [
          { name: 'Daniel Cruz', relation: 'fiancé', notes: 'Overseas finance professional, surprise arrival at baptism' },
          { name: 'Jasper Barrett', relation: 'boss/colleague', notes: 'COO of BSS' },
          { name: 'Columbia Sorority', relation: 'sorority sisters', notes: 'Connector-in-chief for Wives Circle' }
        ]
      })
    },
    {
      name: 'Bella',
      relationships: JSON.stringify({
        spouse: 'Matt',
        parents: ['Father (quiet, strategic)', 'Mother (highly social, charismatic)'],
        siblings: ['Two Older Brothers'],
        nieceFigures: ['Grace Barrett', 'Lucas Barrett'],
        details: [
          { name: 'Matt', relation: 'husband', notes: 'Hosts Camp Legacy together' },
          { name: 'Grace Barrett', relation: 'niece figure', notes: 'Teaches horseback riding at ranch' },
          { name: 'Kendra', relation: 'close friend/colleague', notes: 'BSS analyst connection' }
        ]
      })
    },
    {
      name: 'Cole',
      relationships: JSON.stringify({
        exSpouse: 'Ex-Wife (marriage didnt survive deployments)',
        children: [],
        brotherFigure: 'Hawk',
        daughterFigure: 'Addie',
        details: [
          { name: 'Addie', relation: 'daughter figure', notes: 'Tier 1 protector, no children of own - sees Addie as daughter' },
          { name: 'Hawk', relation: 'brother/teammate', notes: 'Former Tier 1 operator together, deep bond' },
          { name: 'Jasper Barrett', relation: 'colleague/employer', notes: 'BSS core team' }
        ]
      })
    },
    {
      name: 'Madison "Maddie" Cole',
      relationships: JSON.stringify({
        spouse: 'Chris Cole (NFL QB)',
        details: [
          { name: 'Chris Cole', relation: 'husband', notes: 'NFL quarterback, dealing with team ownership drama' },
          { name: 'Harper Caldwell', relation: 'Columbia sorority sister', notes: 'Met through sorority, Wives Circle connection' }
        ]
      })
    },
    {
      name: 'Chris Cole',
      relationships: JSON.stringify({
        spouse: 'Madison "Maddie" Cole',
        details: [
          { name: 'Maddie Cole', relation: 'wife', notes: 'Former Columbia swimmer, wellness entrepreneur' }
        ]
      })
    }
  ];

  let updated = 0;

  for (const data of familyData) {
    const char = await prisma.character.findFirst({
      where: { name: data.name, projectId: project.id }
    });

    if (char) {
      await prisma.character.update({
        where: { id: char.id },
        data: { relationships: data.relationships }
      });
      console.log(`✓ Updated relationships: ${data.name}`);
      updated++;
    } else {
      console.log(`✗ Not found: ${data.name}`);
    }
  }

  console.log(`\n=== Updated ${updated} characters with family relationships ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
