import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  // Characters extracted from all documents with spouse and occupation info
  const characters = [
    // === FROM CHARACTER BIO.DOCX ===

    // Jasper Barrett
    {
      name: 'Jasper Barrett',
      firstName: 'Jasper',
      lastName: 'Barrett',
      age: '36-38',
      appearance: 'Dark hair, sharp jawline, expressive eyes that can turn ice-cold when focused. Keeps a bit of scruff unless he\'s presenting to a boardroom.',
      personality: 'Always assessing, scanning, ready to move — even in "quiet" scenes, there\'s a coiled-spring feel.',
      careerHistory: 'World-class corporate crisis manager, hands-on approach, less old-school boardroom politics.',
      relationships: 'Married to Elena Barrett. Father of Grace.',
      sourceFiles: 'Character Bio.docx',
    },

    // Elena Barrett
    {
      name: 'Elena Barrett',
      firstName: 'Elena',
      lastName: 'Barrett',
      age: 'Late 30s',
      relationships: 'Married to Jasper Barrett. Mother of Grace. Sister of Sara.',
      sourceFiles: 'Character Bio.docx',
    },

    // Grace Barrett
    {
      name: 'Grace Barrett',
      firstName: 'Grace',
      lastName: 'Barrett',
      age: '10-11 years old',
      appearance: 'Brown hair, expressive eyes, always seems to be quietly assessing the adults around her.',
      personality: 'Mature for her age, thanks to growing up with a dad who\'s often away and a mom who\'s fiercely independent. Witty in a subtle way — drops one-liners that make even stressed-out Jasper laugh. Has a soft, almost shy side that comes out when she\'s unsure.',
      relationships: 'Daughter of Jasper and Elena Barrett.',
      sourceFiles: 'Character Bio.docx',
    },

    // === BSS TEAM FROM CHARACTER BIO.DOCX ===

    // Lexi Donovan
    {
      name: 'Lexi Donovan',
      firstName: 'Lexi',
      lastName: 'Donovan',
      age: '32',
      modeledAfter: 'Jessica Biel',
      background: 'Grew up in Savannah, Georgia, debutante circuit, competitive equestrian in her teens.',
      education: 'BA in International Relations, Columbia University; MBA in Finance & Strategy, Wharton School.',
      careerHistory: 'Worked for a major consulting firm before joining Jasper\'s company as a crisis management specialist.',
      appearance: 'Dresses in a way that\'s elegant yet approachable.',
      affiliationRole: 'BSS Crisis Management Specialist',
      sourceFiles: 'Character Bio.docx',
    },

    // Ryan "Ry" Maddox
    {
      name: 'Ryan "Ry" Maddox',
      firstName: 'Ryan',
      lastName: 'Maddox',
      nickname: 'Ry',
      modeledAfter: 'Garrett Hedlund (TRON: Legacy, Mudbound)',
      background: 'Former logistics specialist from Jasper\'s days before corporate. Now runs a boutique security consultancy.',
      personality: 'Laid-back charm masking a razor-sharp operational brain. He\'s the only one who can get away with poking at Jasper\'s intensity.',
      affiliationRole: 'Boutique security consultancy owner; old field teammate of Jasper',
      sourceFiles: 'Character Bio.docx',
    },

    // Dr. Nathan Cole
    {
      name: 'Dr. Nathan Cole',
      firstName: 'Nathan',
      lastName: 'Cole',
      title: 'Dr.',
      modeledAfter: 'Richard Madden (Bodyguard, Eternals)',
      age: 'Late 30s to early 40s',
      background: 'Grew up locally, returned after med school to run a respected family practice. Well-liked in the community.',
      personality: 'Grounded, attentive, with a calm confidence that makes patients feel heard. Witty in small doses, professional when needed.',
      careerHistory: 'Family practice physician',
      affiliationRole: 'Family doctor; routine check-ins for Grace',
      sourceFiles: 'Character Bio.docx',
    },

    // === WIVES CLUB CHARACTERS.DOCX ===

    // Vanessa "Nessa" Caldwell - update with structured data
    {
      name: 'Vanessa "Nessa" Caldwell',
      firstName: 'Vanessa',
      lastName: 'Caldwell',
      nickname: 'Nessa',
      archetype: 'Political/Media Strategist',
      age: '33',
      appearance: '5\'8", dark chestnut hair often worn in a sleek blowout, sharp green eyes, lean athletic build (former collegiate rower at Georgetown). Prefers minimalist, classic fashion — black dresses, clean lines, understated luxury.',
      background: 'Born in Connecticut to a family of lawyers and journalists. Attended Georgetown, double majored in Political Science and Journalism.',
      education: 'Georgetown - Political Science & Journalism',
      careerHistory: 'Political journalist turned policy advisor in D.C. Capitol Hill and New York media connections.',
      personality: 'Independent, witty, a little guarded. More skeptical of the tight-knit circle but still tethered through old bonds.',
      relationships: 'Married to DC/NY operator. Formerly dated one of the BSS operators.',
      affiliationRole: 'Political advisor and media strategist',
      wivesClubRole: 'Media/Policy Strategist',
      hubLocation: 'D.C. / New York',
      sourceFiles: 'Wives Club Characters.docx',
    },

    // Charlotte "Charlie" Whitmore - update
    {
      name: 'Charlotte "Charlie" Whitmore',
      firstName: 'Charlotte',
      lastName: 'Whitmore',
      nickname: 'Charlie',
      archetype: 'Southern Social Connector',
      age: '30',
      appearance: '5\'6", blonde hair styled in soft waves, blue eyes, warm Carolina accent. Dresses in chic Southern fashion — bright colors, heels, statement jewelry. Polished socialite aesthetic.',
      background: 'Raised in Charlotte in an old banking family. Attended UNC Chapel Hill, studied communications. Short stint in New York PR before returning to Charlotte.',
      education: 'UNC Chapel Hill - Communications',
      careerHistory: 'High-profile PR executive, daughter of a prominent Wall Street family, accustomed to elite circles.',
      personality: 'Charismatic, sophisticated, socially fearless. Master at reading rooms and leveraging relationships for power.',
      relationships: 'Married to a Charlotte-based operator (one of Jasper\'s mid-senior lieutenants).',
      affiliationRole: 'PR/brand connector; opens Southern finance/PR doors',
      wivesClubRole: 'Social Connector',
      hubLocation: 'Charlotte',
      sourceFiles: 'Wives Club Characters.docx',
    },

    // Dr. Layla Hassan - update
    {
      name: 'Dr. Layla Hassan',
      firstName: 'Layla',
      lastName: 'Hassan',
      title: 'Dr.',
      archetype: 'Moral Anchor',
      age: '36',
      appearance: '5\'5", olive complexion, long dark hair often tied back, deep brown eyes. Professional attire (hospital chic — scrubs or tailored suits), elegant but understated dresses at Wives Club gatherings. Calm, centered, quietly commanding presence.',
      background: 'Born in Boston to Lebanese immigrant parents. Former trauma nurse turned healthcare executive.',
      careerHistory: 'Trauma nurse turned hospital administrator/healthcare executive.',
      personality: 'Calm, principled, nurturing but tough. Will call out nonsense when needed. Grounded, quietly formidable. The steady voice in the room.',
      relationships: 'Married to Boston-based operator (ex-special operations, now in biotech/defense tech/academia contracts). Understands the cost of deployments on families.',
      affiliationRole: 'Hospital leadership; moral compass for the group',
      wivesClubRole: 'Healthcare Exec / Moral Anchor',
      hubLocation: 'Boston',
      sourceFiles: 'Wives Club Characters.docx',
    },

    // === JASPER'S BUDDIES / THE FOUNDRY ===

    // Max Sterling (Ed Mylett inspired)
    {
      name: 'Max Sterling',
      firstName: 'Max',
      lastName: 'Sterling',
      modeledAfter: 'Ed Mylett',
      archetype: 'Visionary / Motivational Powerhouse',
      age: 'Early 40s',
      appearance: '6\'2", athletic build, tailored suits with a casual edge (luxury watches, pocket squares). Chiseled jawline, salt-and-pepper hair that adds gravitas, warm but piercing brown eyes. Always impeccably groomed.',
      background: 'Former college baseball player who dreamed of the pros but pivoted after injury. Parlayed insurance/finance hustle into building a billion-dollar wealth and coaching empire. Grew up modest but now operates like a polished motivational powerhouse.',
      personality: 'Smooth-talking, empathetic, deeply loyal to Jasper but also plays "big brother" role. Believes in power of visualization, confidence, and faith.',
      careerHistory: 'Insurance/finance → billion-dollar wealth and coaching empire builder',
      affiliationRole: 'The Foundry - Core Inner Circle; incredible at reading rooms and building trust instantly',
      sourceFiles: 'Character influences and calibaration.docx, Jasper bussdies creation.docx',
    },

    // Viktor Kasabian (Bedros Keuilian inspired)
    {
      name: 'Viktor Kasabian',
      firstName: 'Viktor',
      lastName: 'Kasabian',
      modeledAfter: 'Bedros Keuilian',
      archetype: 'Operator-Entrepreneur',
      age: 'Late 40s',
      appearance: '5\'10", powerful build with a thick chest and broad shoulders. Shaved head, trimmed black beard flecked with gray. Scar across his left eyebrow from a fight in his youth. Prefers simple black t-shirts, jeans, and combat boots — always looks like he could step into a fight.',
      background: 'Armenian immigrant, Marine veteran, built his life from nothing — gyms, franchises, then empire builder. Wears scars of hardship and has zero tolerance for excuses.',
      personality: 'Intense, commanding, blunt. Streetwise edge mixed with battlefield discipline. Loyal but calls Jasper out when he\'s soft or too "strategist" instead of decisive.',
      careerHistory: 'Marine veteran → gym franchises → empire builder',
      affiliationRole: 'The Foundry - Core Inner Circle; systems builder, ruthless operator',
      sourceFiles: 'Character influences and calibaration.docx, Jasper bussdies creation.docx',
    },

    // Drew Hollister (Andy Frisella inspired)
    {
      name: 'Drew Hollister',
      firstName: 'Drew',
      lastName: 'Hollister',
      modeledAfter: 'Andy Frisella',
      archetype: 'Mental Toughness / Culture Builder',
      age: 'Mid 40s',
      appearance: '6\'0", thick muscular frame, tattoos on both arms, usually in gym gear or branded hoodies from his supplement empire. Rough beard, buzz-cut hair, intense blue eyes. Radiates controlled chaos — like he could laugh with you or tear your head off in the same breath.',
      background: 'Blue-collar Midwestern kid turned supplement/fitness mogul. Known for raw rants, no-filter honesty, and his transformation from broke and overweight to world-class operator. Grew up in Missouri.',
      personality: 'Loud, passionate, sometimes abrasive. Believes in "mental toughness above all." Not a polished speaker like Max, but when he speaks, people listen.',
      careerHistory: 'Supplement/fitness mogul; broke and overweight to world-class operator',
      affiliationRole: 'The Foundry - Core Inner Circle; mental conditioning, resilience, culture building',
      sourceFiles: 'Character influences and calibaration.docx, Jasper bussdies creation.docx',
    },

    // Colin Mercer (Loyal Brother archetype)
    {
      name: 'Colin Mercer',
      firstName: 'Colin',
      lastName: 'Mercer',
      archetype: 'Loyal Brother / Anchor to Jasper\'s Past',
      age: 'Late 30s (same age bracket as Jasper)',
      appearance: '6\'1", lean athletic frame that still carries the muscle memory of a lacrosse midfielder. Short sandy-blonde hair, usually a little disheveled. Blue-gray eyes, quick smile, and a rugged handsomeness that feels approachable. Dresses casual but expensive — Patagonia vests.',
      affiliationRole: 'The Foundry - The Loyal Brother / Anchor to Jasper\'s Past',
      sourceFiles: 'Character influences and calibaration.docx',
    },
  ];

  console.log(`Processing ${characters.length} characters...`);
  let added = 0;
  let updated = 0;

  for (const char of characters) {
    // Check if character already exists
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: char.name },
          { name: { contains: char.firstName + ' ' + char.lastName } }
        ]
      }
    });

    if (existing) {
      // Update with new data - merge, don't overwrite
      const updateData: any = {};
      for (const [key, value] of Object.entries(char)) {
        if (value && key !== 'name' && key !== 'firstName' && key !== 'lastName') {
          // Only update if existing field is empty or we have richer data
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
          isConfirmed: true,
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
