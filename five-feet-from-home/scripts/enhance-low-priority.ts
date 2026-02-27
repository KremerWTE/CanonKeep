/**
 * Enhance Low Priority Characters - Fill in missing details based on archetype
 * All additions marked with [ADDED] for tracking
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Archetype-based templates for generating content
const archetypeTemplates: Record<string, {
  appearance?: string;
  personality?: string;
  motivations?: string;
  fears?: string;
  wardrobeStyle?: string;
  age?: string;
}> = {
  // Military/Security types
  'military': {
    appearance: 'Military bearing, fit build. Alert eyes that assess every room. Posture that never fully relaxes.',
    personality: 'Disciplined, loyal, protective. Dry humor masks deeper emotions. Values honor and duty.',
    motivations: 'Protecting those who can\'t protect themselves. Living up to the uniform.',
    fears: 'Failing those who depend on them. Losing control.',
    wardrobeStyle: 'Tactical casual. Dark colors, functional clothing. Quality boots.',
    age: '40s-50s',
  },
  'operator': {
    appearance: 'Athletic build, watchful eyes. Moves with economy and purpose. Hands that know weapons.',
    personality: 'Calm under pressure. Dark humor. Loyal to teammates. Actions over words.',
    motivations: 'The mission. Brotherhood. Protecting the client.',
    fears: 'Failing the team. The mission going sideways.',
    wardrobeStyle: 'Functional. Dark colors, layers. Always dressed to move.',
    age: '30s-40s',
  },
  'intelligence': {
    appearance: 'Forgettable by design. Blends into any crowd. Eyes that catalog everything.',
    personality: 'Analytical, patient, secretive. Trust is earned in millimeters.',
    motivations: 'Information is power. Staying three moves ahead.',
    fears: 'Being burned. Cover blown. Assets compromised.',
    wardrobeStyle: 'Context-appropriate. Changes to fit the environment. Unremarkable.',
    age: '40s',
  },
  // Business types
  'executive': {
    appearance: 'Polished, professional. Carries themselves with authority. Designer details.',
    personality: 'Strategic, ambitious, controlled. Warm when it serves. Direct when needed.',
    motivations: 'Building legacy. Winning. Being the best.',
    fears: 'Irrelevance. Being outmaneuvered. Losing position.',
    wardrobeStyle: 'Power dressing. Quality suits, luxury accessories. Status signals.',
    age: '40s-50s',
  },
  'entrepreneur': {
    appearance: 'Dynamic energy. Dressed for the pitch. Eyes alive with ideas.',
    personality: 'Driven, optimistic, risk-tolerant. Infectious enthusiasm. Impatient with obstacles.',
    motivations: 'Disruption. Building something new. Proving doubters wrong.',
    fears: 'Failure. Running out of runway. Being ordinary.',
    wardrobeStyle: 'Startup casual meets success. Premium basics. Expensive simplicity.',
    age: '30s-40s',
  },
  'finance': {
    appearance: 'Expensive watch, perfect grooming. Numbers behind the eyes. Confidence of money.',
    personality: 'Calculating, strategic, private. Charming when useful. Sharp underneath.',
    motivations: 'Wealth. Status. Winning the game.',
    fears: 'Losses. Market shifts. Losing the edge.',
    wardrobeStyle: 'Wall Street standard. Bespoke suits, luxury timepieces. Conservative excellence.',
    age: '40s-50s',
  },
  // Society types
  'socialite': {
    appearance: 'Camera-ready at all times. Glamorous without trying. Born for the spotlight.',
    personality: 'Charming, connected, strategic. Warmth is genuine but calculated.',
    motivations: 'Influence. Being seen. Building the perfect life narrative.',
    fears: 'Scandal. Aging out. Being forgotten.',
    wardrobeStyle: 'High fashion meets accessibility. Designer everything. Trend-aware.',
    age: '30s-40s',
  },
  'philanthropist': {
    appearance: 'Elegant, approachable. Warmth in the eyes. Dressed to give, not take.',
    personality: 'Generous, compassionate, strategic about impact. Genuine care.',
    motivations: 'Making a difference. Legacy through giving. Solving real problems.',
    fears: 'Not doing enough. Resources running out. Cynicism winning.',
    wardrobeStyle: 'Elegant simplicity. Quality over flash. Approachable luxury.',
    age: '40s-50s',
  },
  'wife': {
    appearance: 'Polished, put-together. Balances glamour with practicality. Eyes that manage everything.',
    personality: 'Supportive, strategic, stronger than she appears. Hidden steel.',
    motivations: 'Family stability. Quiet influence. Building something lasting.',
    fears: 'Losing what she\'s built. Being underestimated. Her world unraveling.',
    wardrobeStyle: 'Elegant practicality. Designer basics. Jewelry with meaning.',
    age: '30s-40s',
  },
  // Professional types
  'doctor': {
    appearance: 'Professional, composed. Capable hands. Eyes that have seen everything.',
    personality: 'Calm, competent, caring. Compartmentalizes. Dark humor in private.',
    motivations: 'Healing. Saving lives. Making a difference.',
    fears: 'Missing something critical. Losing a patient. Burnout.',
    wardrobeStyle: 'Professional. Lab coat over quality basics. Practical elegance.',
    age: '40s-50s',
  },
  'lawyer': {
    appearance: 'Sharp, polished. Every detail considered. Presence that fills courtrooms.',
    personality: 'Articulate, strategic, tenacious. Warm to clients, fierce to opposition.',
    motivations: 'Justice. Winning. Protecting clients.',
    fears: 'Losing the case. Missing the argument. Being outmaneuvered.',
    wardrobeStyle: 'Power dressing. Quality suits, conservative accessories. Authority.',
    age: '40s-50s',
  },
  'academic': {
    appearance: 'Intellectual presence. Slightly rumpled. Eyes full of knowledge.',
    personality: 'Curious, analytical, occasionally absent-minded. Passionate about subject.',
    motivations: 'Knowledge. Understanding. Passing wisdom on.',
    fears: 'Irrelevance. Being wrong. Ideas dying.',
    wardrobeStyle: 'Academic chic. Blazers, interesting accessories. Comfort meets credibility.',
    age: '50s-60s',
  },
  // Athletic types
  'athlete': {
    appearance: 'Peak physical condition. Carries themselves like a champion. Competition in their eyes.',
    personality: 'Competitive, disciplined, focused. Team-oriented or driven solo performer.',
    motivations: 'Winning. Being the best. Proving themselves.',
    fears: 'Injury. Losing the edge. Career ending.',
    wardrobeStyle: 'Athletic casual. Premium sportswear. Sponsor-appropriate.',
    age: '20s-30s',
  },
  'coach': {
    appearance: 'Fit, authoritative. Clipboard presence. Eyes that see potential.',
    personality: 'Demanding, supportive, tactical. Knows when to push and when to hold.',
    motivations: 'Developing talent. Winning. Legacy through athletes.',
    fears: 'Failing an athlete. Missing potential. Being obsolete.',
    wardrobeStyle: 'Athletic professional. Team gear or polo with quality pants.',
    age: '40s-50s',
  },
  // Creative types
  'artist': {
    appearance: 'Creative flair in every choice. Expressive, unconventional. Beauty on their terms.',
    personality: 'Creative, emotional, authentic. Sees the world differently.',
    motivations: 'Expression. Beauty. Being understood.',
    fears: 'Creative block. Being commercial. Losing the muse.',
    wardrobeStyle: 'Artistic expression. Unique pieces, vintage, statement items.',
    age: '30s-40s',
  },
  'media': {
    appearance: 'Camera-ready or comfortable behind scenes. Sharp, current, aware.',
    personality: 'Quick-thinking, connected, story-driven. Always on.',
    motivations: 'The story. Influence. Being first.',
    fears: 'Missing the story. Being scooped. Losing relevance.',
    wardrobeStyle: 'On-air polished or behind-scenes functional. Trend-aware.',
    age: '30s-40s',
  },
  // European/International types
  'european': {
    appearance: 'Continental elegance. Effortless style. Cultural confidence.',
    personality: 'Sophisticated, worldly, refined. Different values from American counterparts.',
    motivations: 'Culture. Quality. European way of life.',
    fears: 'Vulgarity. Loss of tradition. American excess.',
    wardrobeStyle: 'European elegance. Quality over quantity. Timeless pieces.',
    age: '40s-50s',
  },
  'heiress': {
    appearance: 'Born to wealth. Carries lineage visibly. Effortless elegance.',
    personality: 'Privileged, occasionally naive, learning to use power wisely.',
    motivations: 'Meaning beyond money. Proving herself. Finding identity.',
    fears: 'Being just the money. Being used. Losing family legacy.',
    wardrobeStyle: 'Old money elegance. Understated luxury. Family jewels.',
    age: '20s-30s',
  },
  // Default
  'default': {
    appearance: 'Presentable and appropriate for their role. Carries themselves with quiet confidence.',
    personality: 'Professional, reliable, competent. Depth beneath the surface.',
    motivations: 'Success in their field. Building something meaningful.',
    fears: 'Failure. Being overlooked. Not measuring up.',
    wardrobeStyle: 'Appropriate for their role. Quality basics.',
    age: '30s-40s',
  },
};

// Map archetypes to template categories
function getTemplateCategory(archetype: string | null): string {
  if (!archetype) return 'default';
  const lower = archetype.toLowerCase();

  if (lower.includes('military') || lower.includes('colonel') || lower.includes('ret)')) return 'military';
  if (lower.includes('operator') || lower.includes('tier 1') || lower.includes('security')) return 'operator';
  if (lower.includes('cia') || lower.includes('intelligence') || lower.includes('intel')) return 'intelligence';
  if (lower.includes('ceo') || lower.includes('executive') || lower.includes('magnate') || lower.includes('owner')) return 'executive';
  if (lower.includes('entrepreneur') || lower.includes('founder') || lower.includes('startup')) return 'entrepreneur';
  if (lower.includes('finance') || lower.includes('venture') || lower.includes('banking') || lower.includes('investor')) return 'finance';
  if (lower.includes('socialite') || lower.includes('celebrity') || lower.includes('influencer')) return 'socialite';
  if (lower.includes('philanthropist') || lower.includes('foundation')) return 'philanthropist';
  if (lower.includes('wife') || lower.includes('spouse') || lower.includes('partner')) return 'wife';
  if (lower.includes('doctor') || lower.includes('dr.') || lower.includes('medical') || lower.includes('surgeon')) return 'doctor';
  if (lower.includes('lawyer') || lower.includes('attorney') || lower.includes('legal')) return 'lawyer';
  if (lower.includes('academic') || lower.includes('professor') || lower.includes('scholar')) return 'academic';
  if (lower.includes('athlete') || lower.includes('crossfit') || lower.includes('nfl') || lower.includes('sports')) return 'athlete';
  if (lower.includes('coach') || lower.includes('trainer')) return 'coach';
  if (lower.includes('artist') || lower.includes('creative') || lower.includes('designer')) return 'artist';
  if (lower.includes('media') || lower.includes('anchor') || lower.includes('producer') || lower.includes('journalist')) return 'media';
  if (lower.includes('european') || lower.includes('french') || lower.includes('german') || lower.includes('swiss') || lower.includes('dutch') || lower.includes('italian') || lower.includes('greek') || lower.includes('turkish')) return 'european';
  if (lower.includes('heiress') || lower.includes('aristocrat') || lower.includes('dynasty')) return 'heiress';

  return 'default';
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
  console.log('ENHANCING LOW PRIORITY CHARACTERS');
  console.log('========================================\n');

  // Get all characters that need enhancement (score <= 5)
  const allChars = await prisma.character.findMany({
    where: { projectId: project.id },
  });

  let enhanced = 0;
  let skipped = 0;

  for (const char of allChars) {
    // Calculate current score
    let score = 0;
    if (char.background) score += 2;
    if (char.appearance) score += 2;
    if (char.personality) score += 2;
    if (char.relationships) score += 2;
    if (char.motivations) score += 2;
    if (char.fears) score += 2;
    if (char.archetype) score += 1;
    if (char.wardrobeStyle) score += 1;
    if (char.age) score += 1;

    // Only enhance if score <= 5
    if (score > 5) {
      skipped++;
      continue;
    }

    // Get template based on archetype
    const category = getTemplateCategory(char.archetype);
    const template = archetypeTemplates[category];

    // Build updates only for missing fields
    const updates: Record<string, string> = {};

    if (!char.appearance && template.appearance) {
      updates.appearance = `[ADDED] ${template.appearance}`;
    }
    if (!char.personality && template.personality) {
      updates.personality = `[ADDED] ${template.personality}`;
    }
    if (!char.motivations && template.motivations) {
      updates.motivations = `[ADDED] ${template.motivations}`;
    }
    if (!char.fears && template.fears) {
      updates.fears = `[ADDED] ${template.fears}`;
    }
    if (!char.wardrobeStyle && template.wardrobeStyle) {
      updates.wardrobeStyle = `[ADDED] ${template.wardrobeStyle}`;
    }
    if (!char.age && template.age) {
      updates.age = template.age;
    }

    // Add archetype if missing
    if (!char.archetype) {
      updates.archetype = 'Supporting Character';
    }

    // Add basic background if missing
    if (!char.background) {
      updates.background = `[ADDED] Connected to the BSS/Wives Club universe through professional or social networks.`;
    }

    // Add basic relationships if missing
    if (!char.relationships) {
      updates.relationships = `[ADDED] Part of the extended network around BSS and the Wives Club.`;
    }

    if (Object.keys(updates).length > 0) {
      await prisma.character.update({
        where: { id: char.id },
        data: updates,
      });
      enhanced++;
      if (enhanced % 20 === 0) {
        console.log(`  Enhanced ${enhanced} characters...`);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`ENHANCEMENT COMPLETE`);
  console.log(`========================================`);
  console.log(`Enhanced: ${enhanced} characters`);
  console.log(`Skipped (already complete): ${skipped} characters`);
  console.log(`\nAll additions marked with [ADDED]`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
