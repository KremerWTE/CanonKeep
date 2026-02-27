import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.log('No project found');
    return;
  }

  const book1Crises = [
    { name: 'London Data Breach', crisisType: 'Data Breach', location: 'London, UK', timeframe: 'Book 1', severity: 'Critical', description: 'Major data breach requiring immediate BSS response', bookAppearance: 'Book 1' },
    { name: 'Hong Kong Bribery Case', crisisType: 'Corporate Corruption', location: 'Hong Kong', timeframe: 'Book 1', severity: 'High', description: 'International bribery scandal', bookAppearance: 'Book 1' },
    { name: 'Senator Kirkland Budget Issue', crisisType: 'Political Crisis', location: 'Washington DC', timeframe: 'Book 1', severity: 'High', clientType: 'Political', description: 'Budget-related political crisis involving Senator Kirkland', bookAppearance: 'Book 1' },
    { name: 'Pipeline Breach South Texas', crisisType: 'Infrastructure', location: 'South Texas', timeframe: 'Book 1', severity: 'Critical', description: 'Pipeline security breach in South Texas', bookAppearance: 'Book 1' },
    { name: 'Airline System Outage', crisisType: 'Technical Crisis', location: 'National', timeframe: 'Book 1', severity: 'Critical', clientType: 'Corporate', description: 'Major airline systems failure causing widespread disruption', bookAppearance: 'Book 1' },
    { name: 'Project Wildcard', codeName: 'WILDCARD', crisisType: 'Aerospace/Telemetrics', location: 'Classified', timeframe: 'Book 1', severity: 'Critical', description: 'Aerospace and telemetric systems issue - highly sensitive', bookAppearance: 'Book 1' },
    { name: 'Medical System Ransomware', crisisType: 'Cybersecurity', location: 'National', timeframe: 'Book 1', severity: 'Critical', clientType: 'Healthcare', description: 'Ransomware attack on medical systems', bookAppearance: 'Book 1' },
    { name: 'Finance Sector Crisis', crisisType: 'Financial', location: 'New York/Global', timeframe: 'Book 1', severity: 'Critical', clientType: 'Financial Services', description: 'Major finance sector disruption', bookAppearance: 'Book 1' },
    { name: 'Asia Markets Crash', crisisType: 'Financial', location: 'Asia', timeframe: 'Book 1', severity: 'Critical', description: 'Asian markets crash requiring crisis management', bookAppearance: 'Book 1' },
    { name: 'Whitaker Medical Board Coup', crisisType: 'Political/Corporate', location: 'Domestic', timeframe: 'Book 1', severity: 'High', description: 'Political issue involving Whitaker and medical board takeover attempt', bookAppearance: 'Book 1' },
    { name: 'African Operation', codeName: 'OFF THE BOOKS', crisisType: 'Covert Operation', location: 'Africa', timeframe: 'Book 1 Ending', severity: 'Critical', description: 'Off-the-books operation involving Cole and Dean', bssTeam: 'Cole (Hawk), Dean', bookAppearance: 'Book 1 - Ending' },
    { name: 'NFL Investigation', crisisType: 'Sports/Legal', location: 'National', timeframe: 'Book 1-2 Bridge', severity: 'High', description: 'NFL-related issue that trails into Book 2', bookAppearance: 'Book 1/Book 2' },
  ];

  console.log('Adding Book 1 crises...\n');

  for (const crisis of book1Crises) {
    try {
      await prisma.crisis.create({
        data: {
          ...crisis,
          projectId: project.id,
          status: 'resolved',
        },
      });
      console.log('Added:', crisis.name);
    } catch (e: any) {
      if (e.code === 'P2002') {
        console.log('Already exists:', crisis.name);
      } else {
        console.log('Error adding', crisis.name, ':', e.message);
      }
    }
  }

  const total = await prisma.crisis.count();
  console.log('\nTotal crises now:', total);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
