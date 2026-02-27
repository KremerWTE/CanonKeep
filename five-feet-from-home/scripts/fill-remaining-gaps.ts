/**
 * Fill Remaining Gaps - Appearances, Relationships, and POH Vestals
 * All additions marked with [ADDED] for tracking
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generate appearance based on archetype/name
function generateAppearance(name: string, archetype: string | null, age: string | null): string {
  const lower = (archetype || '').toLowerCase();
  const agePart = age ? ` ${age}.` : '';

  if (lower.includes('child') || lower.includes('daughter') || lower.includes('son') || lower.includes('baby')) {
    return `[ADDED] Young, bright eyes full of curiosity.${agePart} The next generation energy.`;
  }
  if (lower.includes('athlete') || lower.includes('crossfit') || lower.includes('champion')) {
    return `[ADDED] Athletic build, powerful presence.${agePart} Carries themselves like a competitor.`;
  }
  if (lower.includes('doctor') || lower.includes('medical') || lower.includes('surgeon')) {
    return `[ADDED] Professional, composed. Capable hands, steady gaze.${agePart} Medical precision in every movement.`;
  }
  if (lower.includes('operator') || lower.includes('military') || lower.includes('security')) {
    return `[ADDED] Fit, alert. Watchful eyes that scan every room.${agePart} Moves with purpose.`;
  }
  if (lower.includes('executive') || lower.includes('ceo') || lower.includes('coo') || lower.includes('magnate')) {
    return `[ADDED] Polished, commanding presence.${agePart} Designer details, authority in posture.`;
  }
  if (lower.includes('wife') || lower.includes('mother') || lower.includes('matriarch')) {
    return `[ADDED] Elegant, warm. Beauty that comes from confidence.${agePart} Approachable yet poised.`;
  }
  if (lower.includes('mentor') || lower.includes('legend') || lower.includes('elder')) {
    return `[ADDED] Distinguished, wise presence.${agePart} Eyes that have seen decades of experience.`;
  }
  if (lower.includes('investor') || lower.includes('finance') || lower.includes('wall street')) {
    return `[ADDED] Sharp, well-groomed.${agePart} Money speaks in every detail.`;
  }
  if (lower.includes('artist') || lower.includes('creative') || lower.includes('designer')) {
    return `[ADDED] Creative flair in appearance.${agePart} Unique style that stands out.`;
  }
  if (lower.includes('special olympics') || lower.includes('adaptive')) {
    return `[ADDED] Athletic spirit, determined presence.${agePart} Champion energy despite challenges.`;
  }

  // Default based on name gender guess
  if (name.includes('Clara') || name.includes('Sofia') || name.includes('Isabella') || name.includes('Natalia') || name.includes('Jessica')) {
    return `[ADDED] Attractive, professional presence.${agePart} Carries herself with quiet confidence.`;
  }
  if (name.includes('Gabriel') || name.includes('Mateo') || name.includes('Rafe') || name.includes('Dean') || name.includes('Mason')) {
    return `[ADDED] Solid build, capable presence.${agePart} Easy confidence in how he carries himself.`;
  }

  return `[ADDED] Professional appearance, appropriate for their role.${agePart} Quiet confidence.`;
}

// Generate relationships based on archetype/context
function generateRelationships(name: string, archetype: string | null): string {
  const lower = (archetype || '').toLowerCase();

  if (lower.includes('operator') || lower.includes('bss')) {
    return `[ADDED] Part of BSS operator network. Works with the security team on field operations. Professional bonds forged in crisis.`;
  }
  if (lower.includes('mentor') || lower.includes('legend')) {
    return `[ADDED] Connected to BSS leadership as advisor. Respected figure in the industry. Guides the next generation.`;
  }
  if (lower.includes('investor') || lower.includes('finance')) {
    return `[ADDED] Business connections across the BSS network. Works with leadership on strategic investments.`;
  }
  if (lower.includes('daughter') || lower.includes('son') || lower.includes('child')) {
    return `[ADDED] Part of the extended BSS family. Parents connected to the organization.`;
  }
  if (lower.includes('wife') || lower.includes('spouse')) {
    return `[ADDED] Part of the Wives Club network. Connected through marriage to BSS world.`;
  }
  if (lower.includes('doctor') || lower.includes('medical')) {
    return `[ADDED] Trusted medical professional for BSS families. Part of the support network.`;
  }
  if (lower.includes('forensic') || lower.includes('specialist')) {
    return `[ADDED] Specialized consultant for BSS. Called in for specific expertise.`;
  }
  if (lower.includes('friend') || lower.includes('truth-teller')) {
    return `[ADDED] Long-standing friendship with core characters. Trusted confidante outside the professional circle.`;
  }

  return `[ADDED] Connected to the BSS/Wives Club extended network through professional or social ties.`;
}

async function main() {
  const project = await prisma.project.findUnique({
    where: { name: 'STORY_PROJECT' },
  });

  if (!project) {
    console.log('STORY_PROJECT not found!');
    return;
  }

  console.log('========================================');
  console.log('FILLING REMAINING GAPS');
  console.log('========================================\n');

  // =============================================
  // FILL MISSING APPEARANCES
  // =============================================
  console.log('--- Filling Missing Appearances ---\n');

  const noAppearance = await prisma.character.findMany({
    where: {
      projectId: project.id,
      OR: [
        { appearance: null },
        { appearance: '' }
      ]
    }
  });

  let appearanceCount = 0;
  for (const char of noAppearance) {
    const appearance = generateAppearance(char.name, char.archetype, char.age);
    await prisma.character.update({
      where: { id: char.id },
      data: { appearance }
    });
    appearanceCount++;
  }
  console.log(`  ✓ Added appearances to ${appearanceCount} characters`);

  // =============================================
  // FILL MISSING RELATIONSHIPS
  // =============================================
  console.log('\n--- Filling Missing Relationships ---\n');

  const noRelationships = await prisma.character.findMany({
    where: {
      projectId: project.id,
      OR: [
        { relationships: null },
        { relationships: '' }
      ]
    }
  });

  let relationshipCount = 0;
  for (const char of noRelationships) {
    const relationships = generateRelationships(char.name, char.archetype);
    await prisma.character.update({
      where: { id: char.id },
      data: { relationships }
    });
    relationshipCount++;
  }
  console.log(`  ✓ Added relationships to ${relationshipCount} characters`);

  // =============================================
  // ADD POH VESTALS
  // =============================================
  console.log('\n--- Adding POH Vestals ---\n');

  const vestals = [
    {
      name: 'Margaret "Meg" Ashford',
      archetype: 'POH Vestal / Old Guard',
      background: '[ADDED] One of the original Vestals. Old money Catholic family with Vatican connections. Has been part of POH since before Addie took the Patroness role. Keeper of traditions.',
      personality: '[ADDED] Gracious, traditional, quietly influential. Knows where all the bodies are buried. Warmth reserved for those who earn it.',
      appearance: '[ADDED] Silver-haired elegance. 60s but ageless. Dressed in timeless pieces. Pearls that have been in the family for generations.',
      relationships: '[ADDED] Addie (respects her leadership), Elena (social connection), POH sisterhood (founding member), Vatican connections through family.',
      motivations: '[ADDED] Preserving the true purpose of POH. Ensuring the next generation understands the responsibility.',
      fears: '[ADDED] POH becoming just a social club. Losing the sacred mission. The old ways being forgotten.',
      pohRole: 'Vestal - Senior',
      wivesClubRole: 'Elder Advisor',
      age: 'Early 60s',
      wardrobeStyle: '[ADDED] Classic elegance. Oscar de la Renta, Carolina Herrera. Never trendy, always appropriate.',
    },
    {
      name: 'Christina "Tina" Morales',
      archetype: 'POH Vestal / Rising Leader',
      background: '[ADDED] Converted to Catholicism after marrying into prominent Hispanic family. Brought fresh perspective to POH. Runs major charitable foundation.',
      personality: '[ADDED] Passionate, driven, bridge-builder. Connects POH to underserved communities. Not afraid to challenge tradition.',
      appearance: '[ADDED] Striking Latina beauty. Early 40s. Bold jewelry, elegant but modern style. Presence that commands attention.',
      relationships: '[ADDED] Addie (mentored by her), Bella (supports her rise), POH vestals (respected voice), Foundation board connections.',
      motivations: '[ADDED] Expanding POH impact beyond elite circles. Real charity, not just galas.',
      fears: '[ADDED] Being seen as token diversity. POH losing relevance. Not doing enough.',
      pohRole: 'Vestal',
      wivesClubRole: 'Inner Circle',
      age: 'Early 40s',
      wardrobeStyle: '[ADDED] Modern elegance with cultural touches. Supports Latina designers. Statement pieces.',
    },
    {
      name: 'Genevieve "Gigi" Laurent',
      archetype: 'POH Vestal / International Bridge',
      background: '[ADDED] French-American. Connected to European Catholic aristocracy. Splits time between Charlotte and Paris. Brings international perspective.',
      personality: '[ADDED] Sophisticated, worldly, occasionally imperious. European sensibilities. Deeply devoted to faith despite seeming secular.',
      appearance: '[ADDED] French elegance. Late 40s. Effortlessly chic. The kind of style American women try to imitate.',
      relationships: '[ADDED] Addie (mutual respect), Chiara Benedetti (Italian connection), European POH chapters, Vatican social circles.',
      motivations: '[ADDED] Connecting American POH to European traditions. Maintaining international sisterhood.',
      fears: '[ADDED] American chapter losing European respect. Faith becoming too casual.',
      pohRole: 'Vestal - International Liaison',
      wivesClubRole: 'International Member',
      age: 'Late 40s',
      wardrobeStyle: '[ADDED] Parisian chic. Chanel, Dior, Hermès scarves. Understated but unmistakably expensive.',
    },
    {
      name: 'Patricia "Trish" O\'Brien-Walsh',
      archetype: 'POH Vestal / Community Anchor',
      background: '[ADDED] Irish-Catholic Boston roots. Married into Charlotte society. Runs the practical side of POH charity work. Gets things done.',
      personality: '[ADDED] No-nonsense, warm, organized. The one who remembers everyone\'s children\'s names. Makes things happen.',
      appearance: '[ADDED] Approachable beauty. Mid-50s. Well-dressed but practical. Always ready to work, not just pose.',
      relationships: '[ADDED] Addie (trusted lieutenant), Elena (close friend), Parish community (deeply connected), Local charities (board member).',
      motivations: '[ADDED] Making sure charity actually reaches people. Not just writing checks but changing lives.',
      fears: '[ADDED] POH becoming elitist. Losing touch with real need. Bureaucracy over action.',
      pohRole: 'Vestal - Operations',
      wivesClubRole: 'Inner Circle',
      age: 'Mid-50s',
      wardrobeStyle: '[ADDED] Practical elegance. Quality but functional. Can go from board meeting to food bank.',
    },
    {
      name: 'Adriana "Ana" Reyes-Morrison',
      archetype: 'POH Vestal / Next Generation',
      background: '[ADDED] Youngest Vestal. Latina. Corporate lawyer who walked away from partnership to focus on faith and family. Addie sees her as potential successor.',
      personality: '[ADDED] Sharp, passionate, still learning the diplomatic dance. Impatient with politics but learning patience.',
      appearance: '[ADDED] Stunning. Early 30s. Corporate polish softening into something warmer. Eyes that still flash with lawyer intensity.',
      relationships: '[ADDED] Addie (mentor relationship), Bella (peers in age), Other young Vestals (building sisterhood), Legal community (former colleagues).',
      motivations: '[ADDED] Using her skills for something meaningful. Building the next era of POH.',
      fears: '[ADDED] Not being ready. Disappointing Addie. Losing herself in the role.',
      pohRole: 'Vestal - Junior',
      wivesClubRole: 'Rising Member',
      age: 'Early 30s',
      wardrobeStyle: '[ADDED] Transitioning from power suits to elegant ease. Still learning gala style.',
    },
    {
      name: 'Catherine "Kate" Brennan',
      archetype: 'POH Vestal / Faith Anchor',
      background: '[ADDED] Cradle Catholic. Husband is a permanent deacon. Deepest theological grounding of the Vestals. Runs faith formation programs.',
      personality: '[ADDED] Serene, grounded, occasionally intense about doctrine. The one who reminds everyone why they do this.',
      appearance: '[ADDED] Gentle beauty. Late 40s. Modest elegance. Crosses and medals worn with meaning, not fashion.',
      relationships: '[ADDED] Addie (spiritual friendship), Father Torres (parish connection), RCIA community, Catholic school network.',
      motivations: '[ADDED] Keeping POH rooted in authentic faith. Formation over performance.',
      fears: '[ADDED] Faith becoming social performance. Losing the sacred heart of the mission.',
      pohRole: 'Vestal - Faith Formation',
      wivesClubRole: 'Spiritual Advisor',
      age: 'Late 40s',
      wardrobeStyle: '[ADDED] Modest elegance. Nothing immodest but never frumpy. Quality with propriety.',
    },
  ];

  for (const vestal of vestals) {
    const existing = await prisma.character.findFirst({
      where: { projectId: project.id, name: vestal.name }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...vestal,
        }
      });
      console.log(`  ✓ ADDED Vestal: ${vestal.name}`);
    } else {
      console.log(`  - Already exists: ${vestal.name}`);
    }
  }

  // Update Addie's relationships to include Vestals
  console.log('\n--- Updating Addie\'s Vestal Connections ---\n');

  const addieRecords = await prisma.character.findMany({
    where: {
      projectId: project.id,
      OR: [
        { name: { contains: 'Adelaide' } },
        { name: { contains: 'Addison' } },
        { name: 'Addie' }
      ]
    }
  });

  for (const addie of addieRecords) {
    if (addie.pohRole?.includes('Patroness')) {
      const currentRel = addie.relationships || '';
      if (!currentRel.includes('Vestals')) {
        const newRel = currentRel + ' POH VESTALS: Meg Ashford (senior), Tina Morales (rising), Gigi Laurent (international), Trish O\'Brien-Walsh (operations), Ana Reyes-Morrison (successor potential), Kate Brennan (faith formation).';
        await prisma.character.update({
          where: { id: addie.id },
          data: { relationships: newRel }
        });
        console.log(`  ✓ Updated ${addie.name} with Vestal connections`);
      }
    }
  }

  console.log('\n========================================');
  console.log('ALL GAPS FILLED');
  console.log('========================================');
  console.log('\nAll additions marked with [ADDED]');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
