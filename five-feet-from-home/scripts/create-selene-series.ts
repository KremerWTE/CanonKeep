import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== CREATING SELENE SERIES WITH VIXENS ===\n");

  // ========== SELENE SERIES - MIDNIGHT SUN EXPANDED ==========
  const seleneSeries = {
    name: 'Midnight Sun',
    seriesType: 'Main',
    protagonist: 'Selene Thorne',
    totalBooks: 3,
    books: JSON.stringify([
      {
        title: 'Book 1: Building the Sirens',
        synopsis: 'Selene builds the Sirens Network from the ground up - recruiting, training, and organizing her shadow sisterhood.',
        chapters: [
          { num: 1, title: 'The Vision', summary: 'Selene sees opportunity in creating a network of elite performers with influence.' },
          { num: 2, title: 'Recruiting Nadia', summary: 'Late-night scouting online leads to discovering Nadia Noir - strategist material.' },
          { num: 3, title: 'The First Recruits', summary: 'Hannah Vale, Kelsi Morales join - building the Young Division.' },
          { num: 4, title: 'Finding the Wild Ones', summary: 'Misty Meaner and Adriana Cech bring chaos and extreme capabilities.' },
          { num: 5, title: 'The Innocent Mask', summary: 'Dillon Hart and Gabbi Cortez complete the Young Division archetypes.' },
          { num: 6, title: 'The MILF Division', summary: 'Penny Barker, Veronica Lane, Bianca Blaze, Eva Divine bring maturity and authority.' },
          { num: 7, title: 'Training the Network', summary: 'Veronica as trainer, Penny as second-in-command, the hierarchy forms.' },
          { num: 8, title: 'First Coordinated Operation', summary: 'The Sirens work together for the first time - proving the concept.' }
        ]
      },
      {
        title: 'Book 2: The Recovery Center',
        synopsis: 'Selene helps build the recovery center - a legitimate front that also provides real services for those leaving the industry.',
        chapters: [
          { num: 1, title: 'The Idea', summary: 'Selene sees the need for a transition path for performers who want out.' },
          { num: 2, title: 'Planning the Center', summary: 'Working with Sofia and foundation connections to create something real.' },
          { num: 3, title: 'The Location', summary: 'Finding the right place - private but accessible.' },
          { num: 4, title: 'Building the Team', summary: 'Counselors, job training specialists, medical support.' },
          { num: 5, title: 'First Residents', summary: 'Former performers beginning their transition.' },
          { num: 6, title: 'The Dual Purpose', summary: 'Recovery center also serves as safe house for Sirens between operations.' },
          { num: 7, title: 'Sirens Contributing', summary: 'Each Siren brings skills - Penny teaches business, Veronica teaches psychology.' },
          { num: 8, title: 'Legacy Building', summary: 'The center becomes a lasting positive contribution.' }
        ]
      },
      {
        title: 'Book 3: The Siren Stories',
        synopsis: 'Selene involvement with each Siren - their individual arcs and how they intertwine.',
        chapters: [
          { num: 1, title: 'Nadia Arc', summary: 'Nadia Noir as strategist - building her platform beyond Sirens.' },
          { num: 2, title: 'Hannah Arc', summary: 'Hannah Vale torn between dual life and craving normalcy.' },
          { num: 3, title: 'Kelsi Arc', summary: 'Kelsi Morales - the fire who secretly wonders if she is too wild for love.' },
          { num: 4, title: 'The Wild Cards', summary: 'Misty and Adriana - chaos agents finding their limits.' },
          { num: 5, title: 'The Innocents', summary: 'Dillon and Gabbi - masks vs. true selves.' },
          { num: 6, title: 'The Matriarchs', summary: 'Penny and Veronica - power dynamics and mentorship.' },
          { num: 7, title: 'The Extremes', summary: 'Bianca and Eva - hedonism and ice, finding middle ground.' },
          { num: 8, title: 'Selene Complete', summary: 'How building the Sirens changed Selene herself.' }
        ]
      }
    ]),
    premise: `Selene Thorne's journey building and running the Sirens Network.

THE SIRENS NETWORK:
A shadow sisterhood of cam stars and adult performers, organized by Selene as a rival power center to BSS - seductive, dangerous, and capable of moving between worlds.

BOOK 1 - BUILDING THE SIRENS:
Recruiting and training the network:
- Young Division: Nadia Noir (Strategist), Hannah Vale (Muse), Kelsi Morales (Fire), Dillon Hart (Infiltrator), Gabbi Cortez (Ingenue)
- Chaos Division: Misty Meaner (Chaos Agent), Adriana Cech (Shock Trooper)
- MILF Division: Penny Barker (Matriarch), Veronica Lane (Professor), Bianca Blaze (Hedonist), Eva Divine (Ice Queen)
- Special: Serena Knox (Trophy Fantasy)

BOOK 2 - THE RECOVERY CENTER:
Selene helps build a recovery center for performers who want to transition out:
- Legitimate front with real services
- Job training, counseling, medical support
- Dual purpose as safe house for Sirens
- Each Siren contributes their skills
- Legacy beyond the network

BOOK 3 - THE SIREN STORIES:
Individual arcs for each Siren and how Selene mentors them all:
- Nadia building platform beyond Sirens
- Hannah craving normalcy
- Kelsi wondering if she is too wild for love
- The wild cards finding limits
- The innocents revealing true selves
- The matriarchs managing power
- The extremes finding balance
- Selene complete - how building the Sirens changed her`
  };

  const existingSeries = await prisma.bookSeries.findFirst({
    where: { name: 'Midnight Sun', projectId: project.id }
  });

  if (existingSeries) {
    await prisma.bookSeries.update({
      where: { id: existingSeries.id },
      data: seleneSeries
    });
    console.log('Updated: Midnight Sun (Selene Series) - 3 books with Vixens content');
  } else {
    await prisma.bookSeries.create({ data: { projectId: project.id, ...seleneSeries } });
    console.log('Created: Midnight Sun (Selene Series)');
  }

  // ========== UPDATE SELENE CHARACTER ==========
  console.log("\n--- Updating Selene Thorne ---\n");

  const seleneUpdate = {
    name: 'Selene Thorne',
    firstName: 'Selene',
    lastName: 'Thorne',
    archetype: 'Sirens Network Founder / Dangerous Allure',
    background: `SIRENS NETWORK FOUNDER:
Selene builds and runs the Sirens Network - a shadow sisterhood of cam stars and adult performers organized as a rival power center to BSS.

NETWORK STRUCTURE:
- Young Division: Nadia, Hannah, Kelsi, Dillon, Gabbi
- MILF Division: Penny (Second-in-Command), Veronica (Trainer), Bianca, Eva
- Chaos Division: Misty, Adriana
- Special Assets: Serena

RECOVERY CENTER:
Helps build recovery center for performers transitioning out:
- Legitimate front with real services
- Job training, counseling, medical support
- Dual purpose as safe house for Sirens
- Each Siren contributes skills

PERSONALITY:
- Dangerous allure, complexity
- Not particularly "into kids" but moved by Addie and Hawk faith for Grace
- Part of Wives Club but with different energy
- Wild card in the group dynamics

ADDIE CONNECTION:
Part of Addie intimate connections as "chaos coordinator." Adds complexity and wildcard energy to the inner circle.`,
    relationships: `Sirens Network - Founder and Leader
Penny Barker - Second-in-Command (though Selene doesn't admit it)
Veronica Lane - Trainer for the network
All Sirens - Handler and mentor
Addie - Part of intimate inner circle
Wives Club - Member with different energy`,
    sourceFiles: 'Cam Star Build, Selene Troubles, Characters',
    clubsAssociations: 'Sirens Network, Wives Club'
  };

  const existingSelene = await prisma.character.findFirst({
    where: { firstName: 'Selene', projectId: project.id }
  });

  if (existingSelene) {
    await prisma.character.update({
      where: { id: existingSelene.id },
      data: seleneUpdate
    });
    console.log('Updated: Selene Thorne with Sirens Network role');
  }

  // ========== SELENE STORYLINES ==========
  console.log("\n--- Creating Selene Storylines ---\n");

  const seleneStorylines = [
    {
      title: 'Selene Builds the Recovery Center',
      category: 'Character Arc',
      description: 'Selene creates a recovery center for performers transitioning out of the industry',
      content: `SELENE BUILDS THE RECOVERY CENTER

THE VISION:
Selene sees the need for a transition path for performers who want out of the industry. Many have no skills outside their work, no savings, and no support system.

THE CREATION:
Working with Sofia and foundation connections, Selene builds something real:
- Private location, accessible but discreet
- Counselors and mental health support
- Job training and career transition
- Medical support
- Financial literacy training

SIREN CONTRIBUTIONS:
Each Siren brings skills to the center:
- Penny Barker: Teaches business and professional skills
- Veronica Lane: Psychology and manipulation awareness
- Hannah Vale: European connections for international placement
- Others rotate through to mentor residents

DUAL PURPOSE:
The recovery center also serves as:
- Safe house for Sirens between operations
- Meeting place for sensitive conversations
- Cover for network activities

LEGACY:
This becomes Selene's lasting positive contribution - proving she's more than just the "dangerous allure" everyone sees.`,
      characters: JSON.stringify(['Selene Thorne', 'Sofia Reyes', 'Penelope Barker', 'Veronica Lane', 'Helena Voss'])
    },
    {
      title: 'Selene Recruits Each Siren',
      category: 'Network Building',
      description: 'How Selene discovered and recruited each member of the Sirens Network',
      content: `SELENE RECRUITS THE SIRENS

NADIA NOIR (The Strategist):
Discovered during late-night scouting online. Selene noticed her blend of charisma, sensuality, and control. Saw her as an asset, not just a cam star.

HANNAH VALE (The Muse):
Found her British elegance and intellectual depth. Perfect for European clients and old money.

KELSI MORALES (The Fire):
Miami nightlife connection. Selene needed someone who could overwhelm even the cockiest client.

MISTY MEANER (The Chaos Agent):
Vegas scene. Selene needed disruption capability - Misty delivered.

ADRIANA CECH (The Shock Trooper):
Already a legend online. Selene sought her out specifically for extreme operations.

DILLON HART (The Infiltrator):
The innocent mask was too valuable to ignore. Perfect for trust-building operations.

GABBI CORTEZ (The Ingenue):
Natural allure that couldn't be taught. Selene saw potential for high-profile targets.

PENNY BARKER (The Matriarch):
Sought out for her authority and experience. Became second-in-command.

VERONICA LANE (The Professor):
Intellectual dominance was rare. Selene made her the trainer.

BIANCA BLAZE (The Hedonist):
Miami party queen with iron discipline underneath. Perfect for overwhelming operations.

EVA DIVINE (The Ice Queen):
Former trophy wife seeking revenge through power. Selene gave her a platform.

SERENA KNOX (The Trophy):
Polished perfection with strategic ambition. A wild card with her own agenda.`,
      characters: JSON.stringify(['Selene Thorne', 'Nadia Trani', 'Helena Voss', 'Kelsi Morales', 'Marissa Moreno', 'Adriana Carver', 'Delilah Hart', 'Gabrielle Cortez', 'Penelope Barker', 'Veronica Lane', 'Bianca Navarro', 'Evelyn Drake', 'Serena Knox'])
    }
  ];

  for (const storyline of seleneStorylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({ data: { projectId: project.id, ...storyline } });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({ where: { id: existing.id }, data: storyline });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  // Final counts
  const seriesCount = await prisma.bookSeries.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== COMPLETE ===`);
  console.log(`Total book series: ${seriesCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
