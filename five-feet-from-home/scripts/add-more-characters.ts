import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  const characters = [
    // === VICTORIA "VEE" ALDRIDGE ===
    {
      name: 'Victoria "Vee" Aldridge',
      firstName: 'Victoria',
      lastName: 'Aldridge',
      nickname: 'Vee',
      archetype: 'Media Perfectionist',
      age: '39',
      hubLocation: 'Los Angeles / Charlotte / New York',
      appearance: 'Tall (5\'9"), blonde, blue-eyed, glamorous but professional. Perfectly pressed blouses, tailored pencil skirts, heels that click with authority. Always immaculately put together — even her "casual" yoga gear looks editorial.',
      modeledAfter: 'Katherine Heigl (The Ugly Truth)',
      background: 'Born in Connecticut to an old New England family with political and business ties. Grew up with high expectations; valedictorian, Ivy-caliber education (chose Northwestern for journalism). Climbed the ranks in TV news, becoming an executive producer and on-air host hybrid known for demanding control and flawless broadcasts. Public divorce after marrying a high-profile media lawyer — fueled her "control everything" personality even more. Entered Minervae orbit when Harper Steele recruited her to help shape narratives during crises.',
      careerHistory: 'Executive producer of a major morning news program; later transitions into media strategy consultant for Minervae allies.',
      personality: 'Type-A Perfectionist: Every detail must be perfect — wardrobe, scripts, dinner parties. Charming but Intense: Can dazzle a crowd, but staff whisper about her standards. Awkward in Romance: Brilliant at work, flustered in dating. Loyal: Once you\'re inside her trust circle, she will fight to the death for you.',
      affiliationRole: 'The Media Perfectionist: Ensures the wives\' image is flawless in press and public events. Harper Steele\'s Right Hand: Trusted to polish narratives and spin stories before they break.',
      wivesClubRole: 'Media Perfectionist / Harper\'s Right Hand',
      relationships: 'With Addie: Push-pull dynamic — Addie favors authenticity, Vee favors polish. They respect each other but sometimes clash. With Harper Steele: Loyal partner in media strategy; Harper is the visionary, Vee makes it bulletproof. With Selene: Opposites — Selene\'s chaos drives her insane, but deep down she admires Selene\'s ability to live free. With Serena von Habsburg: Bonded over perfection and high standards — occasionally competitive.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === VICTORIA "VEE" LANGFORD ===
    {
      name: 'Victoria "Vee" Langford',
      firstName: 'Victoria',
      lastName: 'Langford',
      nickname: 'Vee',
      archetype: 'The Shark / Ruthless Attorney',
      modeledAfter: 'Elizabeth Debicki energy / Ari Gold archetype flipped',
      affiliationRole: 'Ruthless entertainment attorney (Ari archetype)',
      personality: 'The ruthless closer',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === VALENTINA RUSSO ===
    {
      name: 'Valentina Russo',
      firstName: 'Valentina',
      lastName: 'Russo',
      archetype: 'The Star / Drama Queen',
      modeledAfter: 'Sofia Vergara (Drama archetype)',
      background: 'Italian ex-TV personality',
      personality: 'Glamorous, chaotic presence. The glamorous chaos magnet.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === KAYLEE DAWSON ===
    {
      name: 'Kaylee Dawson',
      firstName: 'Kaylee',
      lastName: 'Dawson',
      archetype: 'The Hustler',
      modeledAfter: 'Florence Pugh vibe',
      personality: 'Southern hustler, underestimated but growing. The underestimated hustler who surprises everyone.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ARIA PATEL ===
    {
      name: 'Aria Patel',
      firstName: 'Aria',
      lastName: 'Patel',
      archetype: 'The Underestimated Heart / Cyber Analyst',
      modeledAfter: 'Naomi Scott',
      hubLocation: 'Charlotte',
      affiliationRole: 'CLT cyber analyst, underestimated core member',
      personality: 'The underestimated heart of the team',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === TESSA CALDWELL (Anna Kendrick archetype) ===
    {
      name: 'Tessa Caldwell',
      firstName: 'Tessa',
      lastName: 'Caldwell',
      archetype: 'Comedic Relief / Authentic',
      modeledAfter: 'Anna Kendrick',
      personality: 'Makes fun of Victoria Aldridge\'s stiffness. Total contrast to Vee.',
      wivesClubRole: 'Comedic contrast member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === SERENA VON HABSBURG ===
    {
      name: 'Serena von Habsburg',
      firstName: 'Serena',
      lastName: 'von Habsburg',
      archetype: 'European Royal / Executive',
      modeledAfter: 'Meghan Markle (modern royal, glamorous executive)',
      affiliationRole: 'COO of Vogue International, married to Austrian prince. The "obvious heir" to Diana but supported Addie.',
      wivesClubRole: 'European Minervae leadership',
      relationships: 'Bonded with Victoria Aldridge over perfection and high standards — occasionally competitive.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ISABELLA MARINI ===
    {
      name: 'Isabella Marini',
      firstName: 'Isabella',
      lastName: 'Marini',
      archetype: 'Italian Aristocrat',
      modeledAfter: 'Italian countess archetype',
      affiliationRole: 'Italian aristocrat, philanthropy + culture. Heritage finance + cultural philanthropy.',
      wivesClubRole: 'European Minervae member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ELENI PAPADAKIS ===
    {
      name: 'Eleni Papadakis',
      firstName: 'Eleni',
      lastName: 'Papadakis',
      archetype: 'Greek Shipping Heiress',
      modeledAfter: 'Greek shipping heiress archetype',
      affiliationRole: 'Greek shipping wealth. Sharp, political ties.',
      wivesClubRole: 'European Minervae member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === CAROLINE DUBOIS ===
    {
      name: 'Caroline Dubois',
      firstName: 'Caroline',
      lastName: 'Dubois',
      archetype: 'French Political Wife',
      modeledAfter: 'Carla Bruni + French first lady archetype',
      affiliationRole: 'French political wife. Chic, icy, high-level influence.',
      wivesClubRole: 'European Minervae member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === AMÉLIE VOGT ===
    {
      name: 'Amélie Vogt',
      firstName: 'Amélie',
      lastName: 'Vogt',
      archetype: 'Swiss Banking Power',
      modeledAfter: 'Swiss finance archetype',
      affiliationRole: 'Swiss banker\'s wife, finance/intelligence anchor.',
      wivesClubRole: 'European Minervae member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === SASKIA VAN DOREN ===
    {
      name: 'Saskia van Doren',
      firstName: 'Saskia',
      lastName: 'van Doren',
      archetype: 'Dutch Fashion/Lifestyle Influencer',
      modeledAfter: 'Dutch model/influencer archetype',
      affiliationRole: 'Dutch fashion/lifestyle, influencer elite.',
      wivesClubRole: 'European Minervae member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === HELENE SCHNEIDER ===
    {
      name: 'Helene Schneider',
      firstName: 'Helene',
      lastName: 'Schneider',
      archetype: 'German Corporate',
      modeledAfter: 'German corporate archetype',
      affiliationRole: 'German CEO\'s wife.',
      wivesClubRole: 'European Minervae member',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === SOFIA MAROUN ===
    {
      name: 'Sofia Maroun',
      firstName: 'Sofia',
      lastName: 'Maroun',
      archetype: 'Classical Elegance Wife',
      modeledAfter: 'Sloan (Entourage)',
      personality: 'The classical elegance wife, grounded and diplomatic.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === DANA LEVITT ===
    {
      name: 'Dana Levitt',
      firstName: 'Dana',
      lastName: 'Levitt',
      archetype: 'Sharp-Tongued Strategist',
      modeledAfter: 'Dana Gordon (Entourage)',
      affiliationRole: 'Hollywood/media power. The sharp-tongued strategist.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === ALESSANDRA D'AMICO ===
    {
      name: 'Alessandra D\'Amico',
      firstName: 'Alessandra',
      lastName: 'D\'Amico',
      archetype: 'Seductive Dealmaker',
      modeledAfter: 'Amanda Daniels (Entourage)',
      affiliationRole: 'Finance & luxury. The seductive dealmaker.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === JULIETTE NAVARRO ===
    {
      name: 'Juliette Navarro',
      firstName: 'Juliette',
      lastName: 'Navarro',
      archetype: 'Celebrity Crossover',
      modeledAfter: 'Jamie-Lynn Sigler (Entourage)',
      personality: 'The celebrity crossover, approachable glamour.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },

    // === BIANCA LAZZARO ===
    {
      name: 'Bianca Lazzaro',
      firstName: 'Bianca',
      lastName: 'Lazzaro',
      archetype: 'Chaotic Influencer',
      personality: 'The chaotic influencer, adds spark and unpredictability.',
      sourceFiles: 'Wives Club Characters.docx',
      isConfirmed: true,
    },
  ];

  console.log(`Adding ${characters.length} characters...`);
  let added = 0;
  let skipped = 0;

  for (const char of characters) {
    // Check if character already exists
    const existing = await prisma.character.findFirst({
      where: { name: char.name }
    });

    if (existing) {
      console.log(`  Skipping ${char.name} - already exists`);
      skipped++;
      continue;
    }

    try {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
        }
      });
      console.log(`  Added: ${char.name}`);
      added++;
    } catch (err: any) {
      console.log(`  Error adding ${char.name}: ${err.message}`);
    }
  }

  console.log(`\nAdded: ${added}, Skipped: ${skipped}`);

  const count = await prisma.character.count();
  console.log(`Total characters in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
