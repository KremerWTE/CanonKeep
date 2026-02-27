import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Jasper's Friends...\n");

  const jasperFriends = [
    {
      name: 'Ryan "Ry" Maddox',
      firstName: 'Ryan',
      lastName: 'Maddox',
      nameVariants: 'Ry',
      archetype: 'Logistics Specialist / Security Consultant',
      careerHistory: 'Old college teammate of Jasper. Runs a boutique security consulting firm specializing in logistics.',
      affiliationRole: "Jasper's Friend - Security Consulting Firm Owner",
      relationships: "Old college teammate of Jasper Barrett. Runs boutique security consulting firm. Logistics specialist.",
      background: "One of Jasper's oldest friends from college. Now operates a boutique security consulting firm with expertise in logistics operations. Part of Jasper's trusted inner circle.",
    },
    {
      name: 'Marcus "Mac" Bennett',
      firstName: 'Marcus',
      lastName: 'Bennett',
      nameVariants: 'Mac',
      archetype: 'Senior Analyst',
      careerHistory: "Old coworker from Jasper's previous firm. Now Senior Analyst.",
      affiliationRole: "Jasper's Friend - Senior Analyst",
      relationships: "Old coworker of Jasper Barrett from his previous firm. Now senior analyst.",
      background: "Former colleague who worked with Jasper before BSS. Rose to senior analyst position. Maintains close friendship with Jasper and provides analytical perspective from outside BSS.",
    },
    {
      name: 'Olivia "Liv" Carrow',
      firstName: 'Olivia',
      lastName: 'Carrow',
      nameVariants: 'Liv',
      archetype: 'Media Consultant / Former Journalist',
      careerHistory: 'Former investigative journalist. Now media consultant who sends leads to Jasper.',
      affiliationRole: "Jasper's Friend - Media Consultant / Lead Source",
      relationships: "Friend of Jasper Barrett. Sends leads and intelligence from media world.",
      background: "Former investigative journalist who transitioned to media consulting. Uses her connections and investigative skills to send leads to Jasper. Valuable source of early intelligence on potential crises.",
    },
    {
      name: 'Tyler "Tye" Romero',
      firstName: 'Tyler',
      lastName: 'Romero',
      nameVariants: 'Tye',
      archetype: 'Bar Owner / Social Hub',
      careerHistory: "Owns O'Malley's, a local bar where Jasper escapes with Mason.",
      affiliationRole: "Jasper's Friend - Bar Owner",
      hubLocation: 'Charlotte, NC',
      relationships: "Friend of Jasper Barrett and Mason Keating. Owns O'Malley's bar.",
      background: "Owns and operates O'Malley's, a local bar in Charlotte that serves as Jasper's escape spot. Jasper and Mason (his truth-teller) regularly meet there to decompress and talk freely away from work.",
    },
    {
      name: 'Preston Hale',
      firstName: 'Preston',
      lastName: 'Hale',
      archetype: 'Private Equity / Former M&A Lawyer',
      careerHistory: 'Former Corporate Lawyer (M&A) in the style of Harvey Specter. Now runs Hale Capital Partners, a PE firm focused on tech, energy, and defense.',
      affiliationRole: "Jasper's Friend - PE Firm Principal",
      relationships: "Friend of Jasper Barrett. Runs Hale Capital Partners (PE firm).",
      background: "Former high-powered M&A corporate lawyer who made the transition to private equity. Now runs Hale Capital Partners, focusing on tech, energy, and defense investments. Sharp, strategic, and well-connected in finance circles.",
    },
    {
      name: 'Victor Langford',
      firstName: 'Victor',
      lastName: 'Langford',
      archetype: 'Mentor / Former Employer',
      careerHistory: "Jasper's mentor and former employer before BSS.",
      affiliationRole: "Jasper's Mentor - Former Employer",
      mentorsMentees: 'Mentor to Jasper Barrett',
      relationships: "Mentor to Jasper Barrett. Former employer who gave Jasper early career guidance.",
      background: "One of the key figures in Jasper's early career development. Served as both employer and mentor, helping shape Jasper's approach to crisis management and business before he founded BSS.",
    },
    {
      name: 'Ethan Drake',
      firstName: 'Ethan',
      lastName: 'Drake',
      archetype: 'Venture Capital Heavyweight',
      careerHistory: 'Venture Capital heavyweight with significant influence in startup and tech investment.',
      affiliationRole: "Jasper's Friend - VC Heavyweight",
      relationships: "Friend of Jasper Barrett. Major player in venture capital.",
      background: "Influential venture capital investor with deep pockets and extensive networks in tech and startup ecosystems. Part of Jasper's network of powerful business contacts.",
    },
    {
      name: 'Colin "Cole" Maddox',
      firstName: 'Colin',
      lastName: 'Maddox',
      nameVariants: 'Cole',
      archetype: 'Pro Sports Team Owner',
      careerHistory: 'Minor owner in a professional sports team.',
      affiliationRole: "Jasper's Friend - Pro Sports Team Owner",
      relationships: "Friend of Jasper Barrett. Married to Savannah. Minor owner in pro sports team.",
      background: "Part-owner in a professional sports team. Connected to Jasper through business and social circles. Married to Savannah.",
    },
    {
      name: 'Savannah Maddox',
      firstName: 'Savannah',
      lastName: 'Maddox',
      archetype: 'Sports Team Owner Spouse',
      relationships: "Wife of Colin 'Cole' Maddox (pro sports team owner). Connected to Jasper's network.",
      wivesClubRole: 'Extended Circle - Sports Owner Wife',
    },
    {
      name: 'Marcus Vance',
      firstName: 'Marcus',
      lastName: 'Vance',
      archetype: 'Private Equity Partner',
      careerHistory: 'PE Partner at major firm.',
      affiliationRole: "Jasper's Friend - PE Partner",
      relationships: "Friend of Jasper Barrett. Private equity partner.",
      background: "Private equity partner with significant deal flow and investment expertise. Part of Jasper's network of financial heavyweights.",
    },
    {
      name: 'Adrian Kade',
      firstName: 'Adrian',
      lastName: 'Kade',
      archetype: 'Global Logistics Magnate',
      careerHistory: 'Global logistics magnate specializing in Africa shipping operations.',
      affiliationRole: "Jasper's Friend - Africa Shipping Magnate",
      hubLocation: 'Africa',
      relationships: "Friend of Jasper Barrett. Controls significant Africa shipping operations.",
      background: "Global logistics magnate with dominant presence in African shipping lanes. Provides Jasper with connections and intelligence in African markets. Key contact for BSS Africa operations.",
    },
    {
      name: 'Marcello De Luca',
      firstName: 'Marcello',
      lastName: 'De Luca',
      archetype: 'European Investment Banker',
      careerHistory: 'European investment banker.',
      affiliationRole: "Jasper's Friend - European Investment",
      hubLocation: 'Europe',
      relationships: "Friend of Jasper Barrett. European investment banking connections.",
      background: "European investment banker with deep ties to continental finance. Provides Jasper with European market intelligence and high-net-worth client connections.",
    },
    {
      name: 'Shane Albright',
      firstName: 'Shane',
      lastName: 'Albright',
      archetype: 'AI/Robotics Executive',
      careerHistory: 'COO for an AI and Robotics firm.',
      affiliationRole: "Jasper's Friend - AI/Robotics COO",
      relationships: "Friend of Jasper Barrett. COO of AI and Robotics company.",
      background: "Chief Operating Officer at a cutting-edge AI and Robotics firm. Provides Jasper with insights into emerging technology, automation, and the future of defense and industrial applications.",
    },
    {
      name: 'Cameron Holt',
      firstName: 'Cameron',
      lastName: 'Holt',
      archetype: 'VC / Cyber Defense CEO',
      education: 'Duke University',
      careerHistory: 'Venture Capitalist and CEO of cyber defense company. Duke graduate.',
      affiliationRole: "Jasper's Friend - VC / Cyber Defense CEO",
      relationships: "Friend of Jasper Barrett from Duke. VC and cyber defense CEO.",
      background: "Duke University graduate who built a career in venture capital and cyber defense. Now runs a cyber defense company while maintaining VC investments. Provides Jasper with cutting-edge cybersecurity intelligence and tech investment opportunities.",
    },
  ];

  let created = 0;
  let updated = 0;

  for (const friend of jasperFriends) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: friend.name },
          { firstName: friend.firstName, lastName: friend.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: friend
      });
      console.log(`Updated: ${friend.name}`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...friend,
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log(`Created: ${friend.name}`);
      created++;
    }
  }

  // Update Jasper with his friends network
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });

  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        relationships: `Married to Elena Barrett. Father of Grace and Lucas. Mentored by Jessica Hall and Victor Langford. Truth-teller: Mason Keating (Duke Lacrosse).
Ambassador friends: Robert Hale (Africa), Charles Whitfield (Holy See), Lila Serrano (South America), William Carrington (Europe).
Political: Senator Ruth Halversen.
Client sources: Clive Patterson (Ivy League Economics/IMF).
Intelligence: Brendan Cho (CIA).
Operators: Holt (BSS Tier 1), COL (ret) Jack Maddox (security consultant).
Inner Circle Friends: Ryan "Ry" Maddox (security consulting), Marcus "Mac" Bennett (analyst), Olivia "Liv" Carrow (media consultant), Tyler "Tye" Romero (O'Malley's bar owner), Preston Hale (Hale Capital Partners PE), Victor Langford (mentor), Ethan Drake (VC), Colin "Cole" Maddox (sports team owner), Marcus Vance (PE partner), Adrian Kade (Africa shipping), Marcello De Luca (European investment).
Other contacts: David Kim (Tech COO), Dr. Nolan Gray (NFL team doc).`,
      }
    });
    console.log("\nUpdated Jasper Barrett with full friends network");
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
