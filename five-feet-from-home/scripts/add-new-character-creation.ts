import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding New Characters from Character Creation Doc...\n");

  const newCharacters = [
    // ========== GIDEON ROURKE ==========
    {
      name: 'Gideon Rourke',
      firstName: 'Gideon',
      lastName: 'Rourke',
      nickname: 'Revenant',
      archetype: 'Dark Operator / Former DEVGRU',
      education: 'University of Virginia BA Political Science; Naval War College irregular warfare',
      careerHistory: 'Former DEVGRU Gold Squadron sniper and breacher. Medically retired after Yemen op. Now covert contractor with CIA ties.',
      bssRole: 'Contractor / Ally',
      relationships: 'Widower - wife and daughter killed in suspicious car accident while deployed. Keeps their photo in rifle case.',
      background: `Modeled after James Reece (Terminal List/Dark Wolf). Former Navy SEAL DEVGRU Gold Squadron. Medically retired after shrapnel injuries in Yemen. Survivor of compromised op where half his team was lost - still believes intel was deliberately bad. Widower whose wife and daughter died in "car accident" he suspects was targeted.`,
      personality: 'Stoic, brooding, tactical thinker. Operates with quiet intensity. Trust earned with blood not words. Hyper-alert, sleeps light.',
      modeledAfter: 'James Reece (Terminal List/Dark Wolf)',
      appearance: 'Battle-scarred operator look.',
      sourceFiles: 'New character creation',
    },

    // ========== MARCUS VEGA ==========
    {
      name: 'Marcus Vega',
      firstName: 'Marcus',
      lastName: 'Vega',
      nickname: 'Ledger',
      archetype: 'CIA Economist / BSS Fixer',
      education: 'Georgetown BA International Economics; Brown University PhD Economics',
      careerHistory: 'Former Army Ranger (75th Regiment). PhD in Economics from Brown - dissertation on insurgency financing. CIA economic warfare specialist. Now BSS Fixer handling shadow banking and global money flows.',
      bssRole: 'Fixer - Financial/Economic',
      hubLocation: 'Washington DC / Charlotte',
      relationships: 'Married to Dr. Evelyn Cross. Two children (ages 7 and 4). Met Evelyn at Brown University - he was finishing PhD, she was starting fellowship.',
      wivesClubRole: 'Spouse of Member',
      background: `Modeled after Jack Ryan with harder edge. Former Army Ranger 75th Regiment, multiple Iraq/Afghanistan deployments. Earned PhD in Economics at Brown - dissertation mapped how insurgencies fund themselves through illicit trade. Recruited by CIA Directorate of Operations as economic warfare specialist - sanctions manipulation, shell corporations, dark finance networks. Now BSS fixer using shadow banking knowledge. Cuban-American heritage.`,
      personality: 'Calculated, disciplined, moral compass with teeth. Pragmatic enough to bend rules but not lose soul. Steady hand in storm. Quiet but approachable.',
      modeledAfter: 'Jack Ryan (TV) with Ranger edge',
      sourceFiles: 'New character creation',
    },

    // ========== DR. EVELYN CROSS ==========
    {
      name: 'Dr. Evelyn Cross',
      firstName: 'Evelyn',
      lastName: 'Cross',
      title: 'Dr.',
      nickname: 'Sanctuary',
      archetype: 'Infectious Disease Specialist / Power Wife',
      education: 'Princeton BA Biology; Johns Hopkins MD Infectious Disease; Brown University Fellowship Global Health & Epidemiology',
      careerHistory: 'Elite infectious disease specialist. Consults with CDC, WHO, and DoD on pandemics, pathogens, and bioterror risks. Uses BSS for logistics/security in unstable regions.',
      hubLocation: 'Washington DC / Charlotte',
      relationships: 'Married to Marcus Vega (BSS Fixer). Two children. Met Marcus at Brown - she was starting fellowship, he was finishing PhD. He helped with her epidemiology models.',
      wivesClubRole: 'Core Circle - Medical Professional',
      background: `Modeled after Cathy Mueller (Jack Ryan) but sharper and more active. Johns Hopkins-trained infectious disease specialist. Brown University fellowship in Global Health. Consults with CDC, WHO, DoD on pandemics and bioterror. Unlike most wives club members, she USES BSS as her tool - logistics, security, intel for medical deployments in unstable zones. Directly enmeshed in shadow world as active high-level asset.`,
      personality: 'Brilliant, compassionate, steel under pressure. Knows how to manage medical emergencies AND the men of BSS. Fiercely independent. Iron edge when challenged.',
      modeledAfter: 'Cathy Mueller (Jack Ryan) - but more active',
      sourceFiles: 'New character creation',
    },

    // ========== NIKOLAI DRAZEN ==========
    {
      name: 'Nikolai Drazen',
      firstName: 'Nikolai',
      lastName: 'Drazen',
      nickname: 'Volk',
      archetype: 'Russian Defector / Mercenary Fixer',
      education: 'Russian military academies. Languages: Russian, German, English.',
      careerHistory: 'St. Petersburg native, Spetsnaz GRU commando. Defected after refusing to execute civilians in Crimea. Now mercenary/fixer running guns and intel networks across Europe and Africa.',
      hubLocation: 'Europe / Africa',
      relationships: 'Estranged from father (Soviet officer). Has a half-sister in Berlin he secretly protects.',
      background: `Modeled after Russian operators from Terminal List/American Assassin villains. Born St. Petersburg, trained Spetsnaz GRU. Defected after seeing atrocities in Crimea. Operates as mercenary fixer across Europe and Africa - weapons, intelligence, black-market ops.`,
      personality: 'Cold humor, pragmatic nihilist. Values honor among killers but little else. Dangerous charm - people want him around even when they shouldnt. Strange personal code.',
      modeledAfter: 'Russian mercenary archetypes (Terminal List/American Assassin)',
      sourceFiles: 'New character creation',
    },

    // ========== SERENA WARD ==========
    {
      name: 'Serena Ward',
      firstName: 'Serena',
      lastName: 'Ward',
      nickname: 'Whisper',
      archetype: 'Ex-MI6 / Security Consultant',
      education: 'Oxford PPE (Philosophy, Politics, Economics); MI6 advanced field training',
      careerHistory: 'Former MI6 case officer. Burned after Berlin op compromise. Now runs boutique London security consultancy, still linked to clandestine networks.',
      hubLocation: 'London',
      relationships: 'From British political family. Estranged from father (former MP). Keeps personal life sealed.',
      background: `Modeled after MI6 female composites from Jack Ryan + American Assassin. Ex-MI6 field officer burned in Berlin during compromised op. Runs boutique security consultancy in London while freelancing for private clients. Upper-middle-class British family.`,
      personality: 'Sharp, witty, calculated. Sarcasm hides trauma. Works with cold logic until emotions slip through. Fiercely independent.',
      modeledAfter: 'MI6 female operators (Jack Ryan/American Assassin)',
      sourceFiles: 'New character creation',
    },

    // ========== CALEB STRICKLAND ==========
    {
      name: 'Caleb Strickland',
      firstName: 'Caleb',
      lastName: 'Strickland',
      nickname: 'Ghostwire',
      archetype: 'NSA Cyber Operator',
      education: 'MIT BS Computer Science; Stanford MS Cybersecurity',
      careerHistory: 'NSA cyberwarfare officer. Transferred to JSOC targeting cell. Expert in hacking, drone ops, SIGINT exploitation. Handles invisible battles.',
      bssRole: 'Cyber / Shadow Adviser',
      relationships: 'Adopted, raised in Oregon. Limited contact with biological family. Considers his unit his only family.',
      background: `Modeled after Jack Ryan analyst + Terminal List cyber elements. NSA cyber operator embedded with JSOC targeting cell. Handles invisible battles - hacking insurgent comms, manipulating financial markets, running drone overwatch.`,
      personality: 'Sardonic, loves predictability, hates chaos. Appears cold but quietly protective. Control freak. Dry humor.',
      modeledAfter: 'Jack Ryan analyst + Terminal List cyber programs',
      sourceFiles: 'New character creation',
    },

    // ========== SELENE ARAVENA ==========
    {
      name: 'Selene Aravena',
      firstName: 'Selene',
      lastName: 'Aravena',
      nickname: 'Lilith',
      archetype: 'Former Mossad Assassin / Femme Fatale',
      education: 'Hebrew University International Law; Mossad black ops training; Unit 8200 SIGINT',
      careerHistory: 'Former Mossad Kidon operative. Trained in Unit 8200 SIGINT. Left after botched Istanbul op. Now freelancer in Europe - infiltration, seduction, surgical elimination.',
      hubLocation: 'Europe',
      relationships: 'Parents were academics in Tel Aviv. Claims no living relatives. Rumors of brother in Mossad logistics.',
      background: `Modeled after Eliza Perash (Dark Wolf femme fatale). Former Mossad Kidon assassin recruited young after excelling in Unit 8200. Specialized in deep-cover, seduction ops, targeted eliminations. Left under questionable circumstances after botched Istanbul op.`,
      personality: 'Sharp, enigmatic, unpredictable. Can be warm then icy. Master manipulator but craves real connection deep down. Alluring and unreadable.',
      appearance: 'Always wears crimson lipstick, even on operations.',
      modeledAfter: 'Eliza Perash (Dark Wolf)',
      sourceFiles: 'New character creation',
    },

    // ========== COLT MADDOX ==========
    {
      name: 'Colt Maddox',
      firstName: 'Colt',
      lastName: 'Maddox',
      nickname: 'Rogue',
      archetype: 'Ex-SEAL CIA Fixer / Wildcard',
      education: 'Naval Academy; CIA Special Activities Center (SAD) pipeline',
      careerHistory: 'Former Navy SEAL turned CIA paramilitary officer. The guy everyone calls when things go sideways. Operates in gray zones, bending/breaking rules for "the greater mission."',
      relationships: 'Divorced. One daughter he rarely sees. Sends her money and writes unsent letters.',
      background: `Modeled after Ben Edwards (Terminal List). Ex-SEAL/CIA paramilitary fixer. Known for walking the line between loyalty and betrayal. The guy you call when things are messy.`,
      personality: 'Charismatic, roguish, endlessly resourceful. The kind of man you want in your corner but never fully trust. Dangerously likable. Loyalty depends on who holds the cards.',
      modeledAfter: 'Ben Edwards (Terminal List)',
      sourceFiles: 'New character creation',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const char of newCharacters) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { firstName: char.firstName, lastName: char.lastName },
        ]
      }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: char
      });
      console.log(`Updated: ${char.name} (${char.nickname})`);
      updated++;
    } else {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          isConfirmed: true,
        }
      });
      console.log(`Created: ${char.name} (${char.nickname})`);
      created++;
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}`);

  const count = await prisma.character.count();
  console.log(`Total characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
