import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolutions = [
  { name: 'Middle East Port Shutdown', resolution: '[ADDED] Coordinated with Gulf state contacts and private security. Rerouted critical shipments. Negotiated port reopening through diplomatic back channels. Client operations resumed within 48 hours.' },
  { name: 'NFL Investigation', resolution: '[ADDED] Managed media narrative during league investigation. Protected player client communications. Investigation concluded without sanctions. Reputation management campaign restored public image.' },
  { name: 'NFL Ownership Dispute', resolution: '[ADDED] Mediated between ownership factions. Gathered intelligence on opposing interests. Facilitated settlement that preserved client position. Confidential terms protected all parties.' },
  { name: 'Pharma Recall Crisis', resolution: '[ADDED] Managed recall logistics across 50 states. Controlled narrative through strategic media placement. Identified manufacturing defect. Class action settlement minimized without admission of fault.' },
  { name: 'Pharma Supply Chain Investigation', resolution: '[ADDED] Internal audit identified supply chain vulnerabilities. Cooperated with FDA while protecting proprietary processes. Enhanced vendor vetting implemented. No regulatory action taken.' },
  { name: 'Pipeline Breach South Texas', resolution: '[ADDED] Emergency response team deployed within 2 hours. Coordinated with EPA and state regulators. Contained spill, managed local community relations. Cleanup completed ahead of schedule.' },
  { name: 'Political Scandals', resolution: '[ADDED] Rapid response contained each scandal before viral spread. Strategic opposition research provided leverage. Multiple politicians retained positions through managed disclosure and rehabilitation.' },
  { name: 'Senator Kirkland Budget Issue', resolution: '[ADDED] Traced budget discrepancy to staff error, not malfeasance. Managed narrative before opposition weaponized. Senator issued proactive statement. Reelection secured.' },
  { name: 'Silicon Valley Tech Breach', resolution: '[ADDED] Contained breach within 24 hours. Zero-day vulnerability patched. User data exposure limited. Managed disclosure satisfied regulators. Company valuation recovered post-IPO.' },
  { name: 'Tech CEO Extraction', resolution: '[ADDED] Asset extracted from hostile foreign jurisdiction within 72 hours. Coordinated with State Department and private aviation. CEO returned safely. International incident avoided.' },
  { name: 'The Broken Deal', resolution: '[ADDED] M&A collapse managed through strategic communications. Client reputation protected despite deal failure. Counter-narrative positioned client as prudent. Alternative deal secured within 6 months.' },
  { name: 'Vatican Gala Security', resolution: '[ADDED] Security perimeter maintained despite threat intelligence. Coordinated with Vatican security and Italian authorities. Event proceeded flawlessly. Threat actors identified and monitored.' },
  { name: 'Whitaker Medical Board Coup', resolution: '[ADDED] Gathered intelligence on opposing board faction. Protected Whitaker interests through proxy voting coordination. Hostile takeover defeated. Board composition stabilized.' },
];

async function main() {
  const project = await prisma.project.findUnique({ where: { name: 'STORY_PROJECT' } });
  if (!project) {
    console.log('Project not found');
    return;
  }

  console.log('Adding remaining crisis resolutions...\n');

  for (const r of resolutions) {
    const crisis = await prisma.crisis.findFirst({
      where: { projectId: project.id, name: r.name }
    });
    if (crisis && !crisis.resolution) {
      await prisma.crisis.update({
        where: { id: crisis.id },
        data: { resolution: r.resolution }
      });
      console.log('✓ Added resolution:', r.name);
    } else if (!crisis) {
      console.log('✗ Not found:', r.name);
    } else {
      console.log('- Already has resolution:', r.name);
    }
  }

  console.log('\nDone!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
