import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.log('No project found');
    return;
  }

  console.log('Adding Book 2 crises and events...\n');

  // Book 2 BSS Crises
  const book2Crises = [
    { name: 'European Trade Disruption', crisisType: 'Trade/Economic', location: 'Europe', timeframe: 'Book 2', severity: 'Critical', description: 'Major European trade disruption requiring BSS intervention' },
    { name: 'African Energy Coup Fallout', crisisType: 'Political/Energy', location: 'Africa', timeframe: 'Book 2', severity: 'Critical', description: 'Fallout from energy sector coup in Africa - continuation from Book 1 African Operation' },
    { name: 'Silicon Valley Tech Breach', crisisType: 'Cybersecurity', location: 'Silicon Valley, CA', timeframe: 'Book 2', severity: 'Critical', description: 'Major tech breach in Silicon Valley' },
    { name: 'Middle East Port Shutdown', crisisType: 'Infrastructure/Political', location: 'Middle East', timeframe: 'Book 2', severity: 'Critical', description: 'Critical port shutdown in Middle East affecting global trade' },
    { name: 'Luxury Real Estate Financing Scandal', crisisType: 'Financial/Legal', location: 'National', timeframe: 'Book 2', severity: 'High', description: 'High-profile real estate financing scandal' },
    { name: 'Pharma Supply Chain Investigation', crisisType: 'Corporate/Legal', location: 'National', timeframe: 'Book 2', severity: 'High', clientType: 'Pharmaceutical', description: 'Investigation into pharmaceutical supply chain issues' },
    { name: 'Pharma Recall Crisis', crisisType: 'Corporate/Health', location: 'National', timeframe: 'Book 2', severity: 'Critical', clientType: 'Pharmaceutical', description: 'Major pharmaceutical product recall crisis' },
    { name: 'NFL Ownership Dispute', crisisType: 'Sports/Legal', location: 'National', timeframe: 'Book 2', severity: 'High', description: 'NFL ownership dispute - continuation from Book 1 NFL Investigation' },
    { name: 'Asia Tech Espionage Case', crisisType: 'Espionage/Corporate', location: 'Asia', timeframe: 'Book 2', severity: 'Critical', description: 'Tech espionage case involving IP theft in Asia' },
    { name: 'Global Shipping Lane Crisis', crisisType: 'Maritime/Legal', location: 'International', timeframe: 'Book 2', severity: 'Critical', description: 'Global shipping issues with shipping lane laws' },
    { name: 'Celebrity PR Crisis', crisisType: 'PR/Media', location: 'National', timeframe: 'Book 2', severity: 'Medium', clientType: 'Entertainment', description: 'High-profile celebrity PR issues' },
    { name: 'Corporate IP Leak', crisisType: 'Corporate/Security', location: 'National', timeframe: 'Book 2', severity: 'High', description: 'Major corporate intellectual property leak' },
    { name: 'Biotech Sabotage', crisisType: 'Corporate/Security', location: 'National', timeframe: 'Book 2', severity: 'Critical', clientType: 'Biotech', description: 'Sabotage at biotech company' },
    { name: 'Harper Dating Tech Breach', crisisType: 'Personal/Cybersecurity', location: 'Charlotte', timeframe: 'Book 2', severity: 'Medium', description: 'Tech breach connected to Harper\'s distraction with dating and engagement', bssTeam: 'Harper Whitfield' },
    { name: 'Failed Rocket Launch', crisisType: 'Aerospace', location: 'National', timeframe: 'Book 2', severity: 'Critical', clientType: 'Aerospace', description: 'Failed rocket launch requiring crisis management' },
    { name: 'Political Scandals', crisisType: 'Political', location: 'Washington DC', timeframe: 'Book 2', severity: 'High', clientType: 'Political', description: 'Multiple political scandal management' },
  ];

  for (const crisis of book2Crises) {
    try {
      await prisma.crisis.create({
        data: { ...crisis, projectId: project.id, status: 'resolved', bookAppearance: 'Book 2' },
      });
      console.log('Added crisis:', crisis.name);
    } catch (e: any) {
      if (e.code === 'P2002') {
        console.log('Already exists:', crisis.name);
      }
    }
  }

  // Book 2 Personal/Story Events (add as Events)
  const book2Events = [
    { name: 'Ridge and Julia Engagement', description: 'Ridge Callahan gets engaged to Julia', timelineRef: 'Book 2' },
    { name: 'Harper Dating Distraction', description: 'Harper becomes distracted by dating and eventually gets engaged', timelineRef: 'Book 2' },
    { name: 'Cabin Threesome', description: 'Addie, Kendra, and Elena have intimate encounter at the cabin - significant relationship development', timelineRef: 'Book 2' },
    { name: 'Charlotte Cole and Tommy Eastman Wedding', description: 'Savannah\'s sister Charlotte Cole marries Tommy Eastman', timelineRef: 'Book 2' },
    { name: 'Kendra Crossfit Competition', description: 'Kendra competes in Crossfit competition', timelineRef: 'Book 2' },
    { name: 'Ethan\'s Baptism', description: 'Ethan\'s baptism ceremony - family/faith event', timelineRef: 'Book 2' },
  ];

  for (const event of book2Events) {
    try {
      await prisma.event.create({
        data: { ...event, projectId: project.id },
      });
      console.log('Added event:', event.name);
    } catch (e: any) {
      if (e.code === 'P2002') {
        console.log('Event exists:', event.name);
      }
    }
  }

  // Add Julia as a character if not exists
  const julia = await prisma.character.findFirst({ where: { name: { contains: 'Julia' } } });
  if (!julia) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Julia',
        relationships: 'Engaged to Ridge Callahan',
        firstAppearance: 'Book 2',
      }
    });
    console.log('\nAdded character: Julia (Ridge\'s fiancée)');
  }

  // Add Tommy Eastman if not exists
  const tommy = await prisma.character.findFirst({ where: { name: { contains: 'Tommy Eastman' } } });
  if (!tommy) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Tommy Eastman',
        relationships: 'Marries Charlotte Cole (Savannah\'s sister)',
        firstAppearance: 'Book 2 - Wedding',
      }
    });
    console.log('Added character: Tommy Eastman');
  }

  // Add Charlotte Cole if not exists (Savannah's sister)
  const charlotteCole = await prisma.character.findFirst({ where: { name: 'Charlotte Cole' } });
  if (!charlotteCole) {
    await prisma.character.create({
      data: {
        projectId: project.id,
        name: 'Charlotte Cole',
        relationships: 'Sister of Savannah, marries Tommy Eastman',
        firstAppearance: 'Book 2 - Wedding',
      }
    });
    console.log('Added character: Charlotte Cole (Savannah\'s sister)');
  }

  // Update the threesome dynamic - now includes Kendra!
  const kendra = await prisma.character.findFirst({ where: { name: 'Kendra Donnelly' } });
  if (kendra) {
    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        arcChange: 'Becomes part of intimate dynamic with Addie and Elena. Competes in Crossfit. Navigating complex relationships.',
        secrets: 'Part of cabin threesome with Addie and Elena',
      }
    });
    console.log('\nUpdated Kendra with Book 2 arc');
  }

  // Update Elena - threesome is with Addie AND Kendra, not Jasper
  const elena = await prisma.character.findFirst({ where: { name: 'Elena Barrett' } });
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        arcEnd: 'Complex intimate dynamic develops with Addie and Kendra (cabin threesome). Relationship with Jasper evolving.',
        secrets: 'Cabin threesome with Addie and Kendra; depth of emotional bonds with the women',
      }
    });
    console.log('Updated Elena - threesome is with Addie and Kendra');
  }

  // Update Addie
  const addie = await prisma.character.findFirst({ where: { name: 'Addie Price' } });
  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        arcEnd: 'Intimate bond with Elena deepens, extends to include Kendra (cabin threesome). Navigating marriage to Hawk alongside these dynamics.',
        secrets: 'Cabin threesome with Elena and Kendra; complex feelings for both women',
      }
    });
    console.log('Updated Addie - threesome is with Elena and Kendra');
  }

  const crisisCount = await prisma.crisis.count();
  const eventCount = await prisma.event.count();
  console.log('\n=== Summary ===');
  console.log('Total crises:', crisisCount);
  console.log('Total events:', eventCount);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
