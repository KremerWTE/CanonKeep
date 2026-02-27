import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.log('No project found');
    return;
  }

  console.log('Adding/Updating Wives Club characters and data...\n');

  // Wives Club Characters from the documents
  const wivesClubCharacters = [
    {
      name: 'Vanessa "Nessa" Caldwell',
      nickname: 'Nessa',
      firstName: 'Vanessa',
      lastName: 'Caldwell',
      age: '33',
      archetype: 'Rebecca Bowen-inspired',
      modeledAfter: 'Shantel VanSanten (Rebecca Bowen in SEAL Team) + Amal Clooney elegant polish',
      appearance: '5\'9", striking brunette with sharp cheekbones and piercing hazel eyes. Always impeccably styled — sleek suits, understated jewelry, designer heels.',
      wardrobeStyle: 'Sleek professional wear — navy or black suits, understated jewelry, heels. Gives off "network anchor" presence.',
      education: 'American University — B.A. International Relations. Fordham University School of Law — J.D.',
      careerHistory: 'Former congressional aide, then junior associate at D.C. lobbying law firm. Pivoted into defense compliance and lobbying. Currently Senior Counsel & Policy Advisor specializing in defense contracting and political risk.',
      background: 'Polished, ambitious, unapologetically her own force. Ex-girlfriend turned wife, deeply tied into D.C./NY professional networks.',
      hubLocation: 'D.C. / New York',
      wivesClubRole: 'Political/Media Strategist - Inside-Outsider',
      affiliationRole: 'Senior Counsel & Policy Advisor, Defense Contracting',
      personality: 'Quick-witted, independent, fiercely protective of her independence even within marriage. Reputation for being skeptical of the "wives as kingmakers" model but plays the game anyway. Cynical at times, yet deeply loyal when she commits.',
      relationships: 'Married to D.C./NY-based BSS operator. Former girlfriend who became wife.',
      motivations: 'Career advancement, maintaining independence, political influence',
      flaw: 'Can be dismissive of others finding their way, sometimes puts ambition over relationships',
      secrets: 'Skeptical of Wives Club model but uses it anyway',
    },
    {
      name: 'Charlotte "Charlie" Whitmore',
      nickname: 'Charlie',
      firstName: 'Charlotte',
      lastName: 'Whitmore',
      age: '30',
      archetype: 'Stella-inspired Southern Connector',
      modeledAfter: 'Ashley Williams (How I Met Your Mother) — girl-next-door charm, radiant smile, approachable presence',
      appearance: '5\'6", brunette with soft highlights (caramel tones), blue-green eyes, always smiling. Approachable, stylish-but-comfortable Southern chic.',
      wardrobeStyle: 'Colorful Southern chic — wrap dresses, wedges, blazers with pops of color, sundresses, bold jewelry.',
      education: 'UNC Charlotte — B.A. Sociology. NC State — Ph.D. candidate in Communications, teaching assistant.',
      careerHistory: 'Former PR intern in New York (brief corporate exposure). Returned home for graduate school. Currently PhD student/TA writing dissertation on branding, identity, and Southern philanthropy networks.',
      background: 'Southern charm, ambitious but still finding her footing. In "next step" limbo — deciding between academia, corporate PR, or riding Wives Club into influence.',
      hubLocation: 'Charlotte, NC',
      wivesClubRole: 'Social/PR Connector - The Connector',
      affiliationRole: 'PhD Candidate / TA at NC State',
      personality: 'Charismatic, ambitious, socially fearless. Can appear shallow but has gift for making people feel seen. Uses social events as power plays — charity galas, NASCAR boxes, courtside seats as stages for influence.',
      relationships: 'Married to Charlotte-based BSS operator who runs Southeast footprint.',
      motivations: 'Finding her place, social influence, connecting people',
      flaw: 'Sometimes more style than substance, still figuring out identity',
    },
    {
      name: 'Dr. Layla Hassan',
      nickname: null,
      firstName: 'Layla',
      lastName: 'Hassan',
      age: '36',
      archetype: 'Naima-inspired Moral Anchor',
      modeledAfter: 'Golshifteh Farahani (mysterious elegance) + Rula Jebreal (intellectual poise)',
      appearance: '5\'5", olive complexion, long dark hair (sometimes styled, often practical), deep brown eyes. Elegant but understated professional attire.',
      wardrobeStyle: 'Hospital chic — scrubs or tailored suits during day. Elegant but understated dresses at Wives Club gatherings. Graceful presence.',
      education: 'Northeastern University — B.S. Nursing. Massachusetts College of Pharmacy & Health Sciences (MCPHS) — Doctor of Healthcare Administration (DHA).',
      careerHistory: 'ICU nurse at Massachusetts General. Trauma nurse during husband\'s deployments. Transitioned into administration — now Director of Clinical Operations for a Boston hospital network.',
      background: 'Born in Boston to Lebanese immigrant parents. Grounded, principled, professional gravitas. Understands cost of deployments on families. Quietly became moral compass for the group.',
      hubLocation: 'Boston, MA',
      wivesClubRole: 'Healthcare/Biotech Anchor - The Anchor',
      affiliationRole: 'Director of Clinical Operations, Boston Hospital Network',
      personality: 'Calm, principled, nurturing but tough. Will call out nonsense when needed. Grounded, thoughtful, deeply empathetic but unwilling to compromise values. The group\'s conscience.',
      relationships: 'Married to Boston-based BSS operator (ex-special ops, now biotech/defense security). Met during his rehab after injury.',
      motivations: 'Family stability, moral integrity, healthcare excellence',
      flaw: 'Can be too principled, sometimes slow to act',
      faithRoots: 'Lebanese-American heritage, faith-based community ties',
    },
    {
      name: 'Isabella "Izzy" Marconi',
      nickname: 'Izzy',
      firstName: 'Isabella',
      lastName: 'Marconi',
      age: '34',
      archetype: 'Worldly Mysterious Girlfriend',
      modeledAfter: 'Charlene Amoia — Italian-American allure, graceful and grounded, with a touch of mystery',
      appearance: '5\'7", dark brown hair with natural waves, olive complexion, hazel eyes. Presence that makes people think she knows more than she says.',
      wardrobeStyle: 'Subtle sophistication — fitted blouses, dark jeans, elegant coats, and heels. Cosmopolitan style.',
      education: 'University of San Diego — B.A. International Business. Johns Hopkins SAIS (D.C.) — M.A. International Relations (focus on Europe & Mediterranean affairs).',
      careerHistory: 'Boutique consulting firm in D.C. focused on transatlantic trade and energy policy. Brief stint in Brussels as liaison officer with EU trade reps. Now policy analyst for multinational energy company with European ties.',
      background: 'Polished, worldly, mysterious. Not a wife but girlfriend of London-based operator. Her international connections make her influential. Bridge to European clients and contacts.',
      hubLocation: 'London / D.C.',
      wivesClubRole: 'European Connection - Auxiliary Member',
      affiliationRole: 'Policy Analyst, Multinational Energy Company',
      personality: 'Worldly professional with international ties, slightly aloof but magnetic. More pragmatic than the others.',
      relationships: 'Girlfriend of London-based BSS operator',
      motivations: 'International influence, strategic positioning',
      flaw: 'Emotional distance, prioritizes strategy over connection',
    },
  ];

  // Add/update each character
  for (const charData of wivesClubCharacters) {
    const existing = await prisma.character.findFirst({
      where: {
        projectId: project.id,
        name: charData.name
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: charData
      });
      console.log(`Updated: ${charData.name}`);
    } else {
      await prisma.character.create({
        data: {
          ...charData,
          projectId: project.id
        }
      });
      console.log(`Created: ${charData.name}`);
    }
  }

  // Add Wives Club as an organization if not exists
  const wivesClubOrg = await prisma.organization.findFirst({
    where: { name: 'Wives Club' }
  });

  if (!wivesClubOrg) {
    await prisma.organization.create({
      data: {
        projectId: project.id,
        name: 'Wives Club',
        type: 'Social/Support Network',
        description: 'Informal network of BSS operator wives who have evolved into kingmakers and power brokers. Originally formed as support network during deployments, now serves as strategic social/political influence hub.',
        founder: 'Elena Barrett, Addie Price',
        significance: `
Leadership: Addie Price (de facto leader), Elena Barrett (anchor), Kendra Donnelly (integrator)
Headquarters: Charlotte, NC (primary) with nodes in Boston, D.C./NY, London
Influence: High - Corporate, political, social, and philanthropic circles across US and Europe

WIVES CLUB STRUCTURE:
- The Anchor (Elena): Emotional center, hosts gatherings
- The Integrator (Kendra): Organizes, connects, builds relationships
- The Fixer (Addie): Problem solver, strategic operator
- The Connector (Charlie): Social/PR, opens doors
- The Political/Media (Nessa): D.C. access, information warfare
- The Healthcare/Biotech (Layla): Boston connections, moral compass

GEOGRAPHIC NODES:
- Charlotte HQ: Elena, Addie, Kendra, Charlie
- Boston: Dr. Layla Hassan
- D.C./NY: Vanessa "Nessa" Caldwell
- London: Isabella "Izzy" Marconi (girlfriend, auxiliary)

THEMES:
- Wives as kingmakers
- Balancing family with influence
- Sisterhood and rivalry
- The cost of power
- Strategic social maneuvering

TRIAD ROLES:
- Nessa (DC/NY): Political/media strategist — outsider edge
- Charlie (CLT): Social/PR connector — Southern power hub
- Layla (Boston): Healthcare/biotech anchor — moral compass
`.trim(),
        relationships: `
WIVES CLUB STRUCTURE:
- The Anchor (Elena): Emotional center, hosts gatherings
- The Integrator (Kendra): Organizes, connects, builds relationships
- The Fixer (Addie): Problem solver, strategic operator
- The Connector (Charlie): Social/PR, opens doors
- The Political/Media (Nessa): D.C. access, information warfare
- The Healthcare/Biotech (Layla): Boston connections, moral compass

GEOGRAPHIC NODES:
- Charlotte HQ: Elena, Addie, Kendra, Charlie
- Boston: Dr. Layla Hassan
- D.C./NY: Vanessa "Nessa" Caldwell
- London: Isabella "Izzy" Marconi (girlfriend, auxiliary)

THEMES:
- Wives as kingmakers
- Balancing family with influence
- Sisterhood and rivalry
- The cost of power
- Strategic social maneuvering

TRIAD ROLES:
- Nessa (DC/NY): Political/media strategist — outsider edge
- Charlie (CLT): Social/PR connector — Southern power hub
- Layla (Boston): Healthcare/biotech anchor — moral compass
        `.trim()
      }
    });
    console.log('\nCreated Wives Club organization');
  } else {
    console.log('\nWives Club organization already exists');
  }

  // Add plot thread for Wives Club dynamics
  try {
    await prisma.plotThread.create({
      data: {
        projectId: project.id,
        name: 'Wives Club as Kingmakers',
        premise: 'The BSS operator wives evolve from support network into strategic power brokers with influence across corporate, political, and social circles.',
        stakes: 'Their influence, their marriages, the balance between ambition and family',
        status: 'active',
      }
    });
    console.log('Added plot thread: Wives Club as Kingmakers');
  } catch (e: any) {
    if (e.code === 'P2002') console.log('Plot thread already exists');
  }

  // Update existing Wives Club members with roles
  const wivesClubMembers = [
    { name: 'Elena Barrett', wivesClubRole: 'The Anchor - Emotional center, hosts gatherings' },
    { name: 'Addie Price', wivesClubRole: 'The Fixer - Problem solver, strategic operator' },
    { name: 'Kendra Donnelly', wivesClubRole: 'The Integrator - Organizes, connects, builds relationships' },
    { name: 'Bella Romano', wivesClubRole: 'The Heart - Emotional support, Italian warmth' },
    { name: 'Sara Hale', wivesClubRole: 'Member (divorced)' },
  ];

  for (const member of wivesClubMembers) {
    const char = await prisma.character.findFirst({
      where: { projectId: project.id, name: member.name }
    });
    if (char) {
      await prisma.character.update({
        where: { id: char.id },
        data: { wivesClubRole: member.wivesClubRole }
      });
      console.log(`Updated Wives Club role for: ${member.name}`);
    }
  }

  console.log('\n=== WIVES CLUB DATA IMPORT COMPLETE ===');

  const charCount = await prisma.character.count({ where: { wivesClubRole: { not: null } } });
  console.log(`Characters with Wives Club roles: ${charCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
