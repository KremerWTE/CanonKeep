import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  const characters = [
    // === VIVIAN "VIV" CARROWAY ===
    {
      name: 'Vivian "Viv" Carroway',
      firstName: 'Vivian',
      lastName: 'Carroway',
      nickname: 'Viv',
      modeledAfter: 'Samantha Ponder + Maria Taylor',
      personality: 'Elegant, diplomatic, hosts major sports galas, known for her bridge between NFL owners and broadcasters.',
      relationships: 'Married to a hedge fund manager who bankrolls sports franchises.',
      affiliationRole: 'Sports gala hostess; bridge between NFL owners and broadcasters',
      wivesClubRole: 'Sports & Broadcasting Connector',
      sourceFiles: 'wives club anchor names.docx',
      isConfirmed: true,
    },

    // === DR. AMARA CROSS ===
    {
      name: 'Dr. Amara Cross',
      firstName: 'Amara',
      lastName: 'Cross',
      title: 'Dr.',
      archetype: 'Physician / Wives Club Medical Lead',
      careerHistory: 'Infectious diseases specialist; uses BSS for medical crisis consulting',
      relationships: 'Married to Marcus Vega (PhD in economics, former Ranger, CIA economics background, BSS fixer)',
      affiliationRole: 'Infectious diseases specialist; consults with BSS',
      wivesClubRole: 'Medical Specialist',
      sourceFiles: 'New character creation.docx',
      isConfirmed: true,
    },

    // === MARCUS VEGA (spouse of Dr. Cross) ===
    {
      name: 'Marcus Vega',
      firstName: 'Marcus',
      lastName: 'Vega',
      archetype: 'BSS Fixer / Economist',
      education: 'PhD in Economics',
      background: 'Former Ranger, CIA economics background',
      careerHistory: 'Ranger → CIA (economics) → BSS Fixer',
      relationships: 'Married to Dr. Amara Cross (infectious diseases specialist)',
      bssRole: 'Fixer',
      affiliationRole: 'BSS Fixer - Economics & Intelligence',
      sourceFiles: 'New character creation.docx',
      isConfirmed: true,
    },

    // === DR. SOPHIA DANE ===
    {
      name: 'Dr. Sophia Dane',
      firstName: 'Sophia',
      lastName: 'Dane',
      title: 'Dr.',
      archetype: 'Trauma Surgeon / Cathy Mueller Type',
      modeledAfter: 'Cathy Mueller (Jack Ryan)',
      education: 'Princeton — B.A. in Biology; Johns Hopkins — M.D. in Trauma Surgery',
      background: 'Top-tier trauma surgeon at Johns Hopkins, married to a Tier 1 operator. Member of the wives club of special operations families — women who hold down the home front with quiet strength.',
      careerHistory: 'Trauma surgeon at Johns Hopkins',
      personality: 'Compassionate, brilliant, resilient. Balances life-and-death decisions at work with the constant worry of a husband in dangerous service.',
      relationships: 'Married to Major Ethan Dane (Tier 1 operator); two children (ages 8 and 5)',
      affiliationRole: 'Johns Hopkins trauma surgeon; Wives Club medical pillar',
      wivesClubRole: 'Medical Pillar',
      sourceFiles: 'New character creation.docx',
      isConfirmed: true,
    },

    // === MAJOR ETHAN DANE ===
    {
      name: 'Major Ethan Dane',
      firstName: 'Ethan',
      lastName: 'Dane',
      title: 'Major',
      archetype: 'Tier 1 Operator',
      careerHistory: 'Tier 1 special operations (mostly off-page)',
      relationships: 'Married to Dr. Sophia Dane (Johns Hopkins trauma surgeon); two children (ages 8 and 5)',
      affiliationRole: 'Tier 1 Operator',
      sourceFiles: 'New character creation.docx',
      isConfirmed: true,
    },

    // === DANIEL (HARPER'S HUSBAND) ===
    {
      name: 'Daniel Whitfield',
      firstName: 'Daniel',
      lastName: 'Whitfield',
      archetype: 'Shipping/Logistics Magnate',
      careerHistory: 'Shipping/logistics magnate in Miami',
      relationships: 'Married to Harper Steele/Whitfield. Three kids (two boys and a girl, under 10 years old).',
      hubLocation: 'Miami (Coral Gables mansion)',
      sourceFiles: 'Harper COO transition story.docx',
      isConfirmed: true,
    },

    // === CAROLINE WHITMORE (MENTOR) ===
    {
      name: 'Caroline Whitmore',
      firstName: 'Caroline',
      lastName: 'Whitmore',
      archetype: 'Political Consultant / Mentor',
      age: 'Early 50s',
      careerHistory: 'Political consultant',
      personality: '"Own your space; build a life he wants to step into."',
      appearance: 'Plum sheath dress, pearls.',
      relationships: 'Married to ex-Congressman turned lobbyist.',
      hubLocation: 'Atlanta/DC',
      affiliationRole: 'Advisor to Elena; political strategist',
      sourceFiles: 'Organize character profiles.docx, Character Bio.docx',
      isConfirmed: true,
    },

    // === ISABEL REYES (CUBAN-AMERICAN) ===
    {
      name: 'Isabel Reyes',
      firstName: 'Isabel',
      lastName: 'Reyes',
      archetype: 'Cuban-American Social Connector',
      appearance: 'Olive skin, dark wavy hair, expressive eyes. Glamorous but approachable. Dresses with Cuban flair — bold colors, statement jewelry.',
      background: 'Strong Catholic roots — Eucharistic adoration, Marian devotion. Often helps organize Hispanic Catholic galas.',
      personality: 'Loves big family gatherings with music, dancing, food.',
      relationships: 'Married to a Cuban-American businessman tied to Miami real estate. Has two kids (preteens). Large extended family.',
      faithRoots: 'Strong Catholic roots — Eucharistic adoration, Marian devotion',
      hubLocation: 'Miami',
      wivesClubRole: 'Hispanic Catholic Gala Organizer',
      sourceFiles: 'Wives Club Characters Development.docx',
      isConfirmed: true,
    },

    // === PRINCESS KATARINA OF LUXEMBOURG ===
    {
      name: 'Princess Katarina of Luxembourg',
      firstName: 'Katarina',
      archetype: 'European Royal / Vestal Powerhouse',
      relationships: 'Ex-wife of Archduke Leopold. Had romantic involvement with Selene.',
      affiliationRole: 'Vestal powerhouse; Venice Symposium connection',
      sourceFiles: 'Selene Troubles.docx',
      isConfirmed: true,
    },

    // === PRINCE RAFAEL DI NAVARRA ===
    {
      name: 'Prince Rafael di Navarra',
      firstName: 'Rafael',
      archetype: 'Mediterranean Royal',
      appearance: 'Tall, silver-haired Mediterranean royal',
      personality: 'Reputation for charm and scandal.',
      background: 'Formerly married to Princess Sofia of Savoy (commanding, glamorous Vestal). Divorce was quiet but whispered to be explosive — affairs, money hidden in Liechtenstein accounts.',
      relationships: 'Ex-husband of Princess Sofia of Savoy. Met Selene at Palace of Honor dinner.',
      sourceFiles: 'Selene Troubles.docx',
      isConfirmed: true,
    },

    // === PRINCESS SOFIA OF SAVOY ===
    {
      name: 'Princess Sofia of Savoy',
      firstName: 'Sofia',
      archetype: 'European Vestal Powerhouse',
      personality: 'Commanding and glamorous. Still wields enormous influence in the European branch of the club.',
      relationships: 'Ex-wife of Prince Rafael di Navarra.',
      affiliationRole: 'European Vestal branch - enormous influence',
      sourceFiles: 'Selene Troubles.docx',
      isConfirmed: true,
    },

    // === CAROLINE VANCE ===
    {
      name: 'Caroline Vance',
      firstName: 'Caroline',
      lastName: 'Vance',
      archetype: 'Financial Journalist',
      careerHistory: 'Ex-Wall Street quant → financial journalist',
      relationships: 'Harper\'s ally',
      affiliationRole: 'Financial journalist; Harper\'s strategic ally',
      sourceFiles: 'Organize character profiles.docx',
      isConfirmed: true,
    },

    // === CAROLINE WESTBROOK ===
    {
      name: 'Caroline Westbrook',
      firstName: 'Caroline',
      lastName: 'Westbrook',
      archetype: 'Finance Professor / Media Commentator',
      careerHistory: 'NYC finance professor and media commentator',
      personality: 'Blunt with Jasper.',
      hubLocation: 'New York City',
      sourceFiles: 'Organize character profiles.docx',
      isConfirmed: true,
    },

    // === DAMIAN CARROW ===
    {
      name: 'Damian Carrow',
      firstName: 'Damian',
      lastName: 'Carrow',
      archetype: 'Financier / Antagonist',
      background: 'Vivienne\'s ex-husband, a financier with mafia ties. His art-laundering scheme nearly pulled Selene down.',
      personality: 'The wrong kind of thrill.',
      relationships: 'Ex-husband of Vivienne. Had fling with Selene (Months 4-6).',
      sourceFiles: 'Selene Troubles.docx',
      isConfirmed: true,
    },
  ];

  console.log(`Processing ${characters.length} characters...`);
  let added = 0;
  let updated = 0;

  for (const char of characters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { name: { contains: char.firstName + (char.lastName ? ' ' + char.lastName : '') } }
        ]
      }
    });

    if (existing) {
      const updateData: any = {};
      for (const [key, value] of Object.entries(char)) {
        if (value && key !== 'name' && key !== 'firstName' && key !== 'lastName') {
          const existingValue = (existing as any)[key];
          if (!existingValue || (typeof value === 'string' && value.length > (existingValue?.length || 0))) {
            updateData[key] = value;
          }
        }
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.character.update({
          where: { id: existing.id },
          data: updateData
        });
        console.log(`  Updated: ${char.name} (${Object.keys(updateData).length} fields)`);
        updated++;
      } else {
        console.log(`  Skipped: ${char.name} (no new data)`);
      }
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
        }
      });
      console.log(`  Added: ${char.name}`);
      added++;
    }
  }

  console.log(`\nAdded: ${added}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters in database: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
