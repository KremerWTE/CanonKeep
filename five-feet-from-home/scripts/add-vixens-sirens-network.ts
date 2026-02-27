import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING VIXENS / SIRENS NETWORK ===\n");

  // ========== SIRENS CHARACTERS ==========
  console.log("--- Adding Sirens Network Characters ---\n");

  const sirensCharacters = [
    {
      name: 'Nadia Trani',
      nickname: 'Nadia Noir',
      firstName: 'Nadia',
      lastName: 'Trani',
      archetype: 'Siren - The Strategist / Recruiter',
      modeledAfter: 'Natali Tangherlini',
      appearance: 'Striking Italian-American beauty - long dark hair with auburn undertones, sculpted cheekbones, inviting smile that flips between playful and sultry. Fitness-toned but soft, girl next door turned fantasy star.',
      wardrobeStyle: 'Signature style: mixing elegance (silk robes, vintage lingerie) with raw, unscripted energy. Old Hollywood glamour at galas - black gowns, perfect hair, mystery aura.',
      background: `Top-tier cam star with international following. Known for blending elegance with raw, unscripted intensity. Her brand is high-end intimacy - champagne, silk, piano music in the background.

Born in San Diego to middle-class family with traditional streak. Grew up balancing sports (volleyball, swimming) with arts (dance, theater). Tried "normal" path through college in communications but felt boxed in. Discovered camming during sophomore year, first to cover tuition, then as creative outlet.

Built fanbase not just on looks but personality - funny, witty, able to make audience feel like close friends.`,
      personality: 'On camera: playful, sharp-tongued, endlessly flirtatious. Off camera: deeply observant, strategic - journals after sessions noting power dynamics. Witty and sarcastic, easily disarms Wives Club women who first see her as threat.',
      bssRole: 'Siren Asset - Recruiter & tester. Screens men, teases operators, occasionally flies in for special trips.',
      relationships: `Selene Thorne - Recruited her into Sirens, trusted asset
The Sirens - Fellow network members
Hawk - Quietly respects her ability to see through people`,
      arcStart: 'International cam star with massive following',
      arcChange: 'Integrated into Sirens network, uses platform strategically',
      arcEnd: 'Leverages fame into bigger platform - podcasting, acting, or activism',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Helena "Hannah" Voss',
      nickname: 'Hannah Vale',
      firstName: 'Helena',
      lastName: 'Voss',
      archetype: 'Siren - The Muse / Refined Temptress',
      modeledAfter: 'Hannah Harper',
      appearance: 'Classic blonde bombshell - platinum hair, soft curves, radiant smile, porcelain skin. Aesthetic is "angelic but dangerous."',
      wardrobeStyle: 'Classical elegance - able to make anyone feel like they are in a decadent 18th-century painting.',
      background: `Grew up in Cornwall, England, daughter of strict Anglican family. At 18, rebelled, moved to London, began glamour modeling before slipping into adult work. Reinvented herself in U.S. where her accent and British elegance made her stand out.`,
      personality: 'On camera: Sweet and nurturing, almost a "fantasy girlfriend" but with wild streak when pushed. Off camera: Surprisingly intellectual - reads history and philosophy, quotes poets, loves long conversations about politics and art. Knows how to "play dumb" to make men underestimate her, but sharp.',
      bssRole: 'Siren Asset - Used for European clients and older money men who want refinement wrapped in temptation. Plays role of "classical muse."',
      relationships: `Selene Thorne - Her handler
The Sirens - Sister network`,
      arcStart: 'British elegance in American adult world',
      arcChange: 'Torn between double life - craving normalcy (marriage, child) but addicted to power',
      arcEnd: 'Must choose between masks and authenticity',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Kelsi Morales',
      nickname: 'Kelsi Monroe',
      firstName: 'Kelsi',
      lastName: 'Morales',
      archetype: 'Siren - The Fire / The Closer',
      modeledAfter: 'Kelsi Monroe',
      appearance: 'Exotic Latina beauty - sun-kissed skin, long brunette hair with waves, curvy athletic build. Known for hourglass figure and radiant confidence.',
      wardrobeStyle: 'Bold, colorful, party-ready. Miami nightlife aesthetic.',
      background: `Born in Miami to Cuban-American parents. Grew up around dance, nightlife, and sports. Played soccer competitively until 18, then pivoted to modeling and eventually cam work. Unlike others, embraces the party lifestyle - clubs, music, high energy.`,
      personality: 'On camera: Bold, fiery, unapologetically sexual. Off camera: Loyal and protective, like big sister to younger Sirens. Huge laugh, curses freely, never hides who she is. Street-smart, knows how to move in Miami/Vegas nightlife without getting burned.',
      bssRole: 'Siren Asset - The "closer." When Selene needs intensity and someone to overwhelm even cockiest client. Handles Latin American clients and Miami nightlife operations.',
      relationships: `Selene Thorne - Handler
Grace Barrett - "Cool older sister" vibe (Selene disapproves)
The Sirens - Protective big sister energy`,
      arcStart: 'Wild party queen of Miami',
      arcChange: 'Struggles with being typecast as "the wild one"',
      arcEnd: 'Secretly wonders if she is too far gone for love or stability',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Marissa "Misty" Moreno',
      nickname: 'Misty Meaner',
      firstName: 'Marissa',
      lastName: 'Moreno',
      archetype: 'Siren - The Chaos Agent / Enforcer',
      modeledAfter: 'Misty Meaner',
      appearance: 'Punk-meets-glam - short choppy hair that shifts colors (platinum, pink, blue), multiple tattoos, dangerous smile.',
      wardrobeStyle: 'Edgy, alternative, leather and lace. Never blends in.',
      background: `Raised in Las Vegas in chaos of casinos and neon. Never fit into "normal life" - turned to nightlife, burlesque, eventually camming. Reputation for shock factor - thrives on going where others won't.`,
      personality: 'On camera: Dominant, teasing, unpredictable. Fans never know if they get comedy, seduction, or humiliation. Off camera: Surprisingly loyal. Calls herself "the attack dog" of Sirens - anyone who disrespects others answers to her. Loves adrenaline: motorcycles, base jumping, late-night chaos.',
      bssRole: 'Siren Asset - Deployed for chaos missions. Intimidation, distraction, pure outrageous energy. Even Hawk admits she is effective because she unsettles men who think they are in control.',
      relationships: `Selene Thorne - Handler
The Sirens - Their protector/enforcer`,
      arcStart: 'Vegas chaos agent with shock reputation',
      arcChange: 'Armor hides old wounds (family abandonment, failed relationships)',
      arcEnd: 'Could become Selene most dangerous ally - or turn against system when pushed',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Adriana Carver',
      nickname: 'Adriana Cech',
      firstName: 'Adriana',
      lastName: 'Carver',
      archetype: 'Siren - The Shock Trooper / Extreme',
      modeledAfter: 'Adriana Chechik',
      appearance: 'Petite but powerful, brunette with piercing hazel eyes, body that radiates athletic energy. Known for stamina, flexibility, infectious smile that hides ruthlessness.',
      wardrobeStyle: 'Athletic-chic, always ready for action.',
      background: `Grew up in Pennsylvania, small-town Catholic family. Ran from that world at 18, chasing freedom. Built career in adult work by pushing extremes and redefining limits. When Selene finds her, already a legend online.`,
      personality: 'On camera: Fearless, daring, endlessly playful. Makes hardest things look effortless. Off camera: Restless, high-energy, always training - yoga, CrossFit, martial arts. Does not sit still. Adrenaline junkie with streak of self-destructiveness.',
      bssRole: 'Siren Asset - The shock trooper. Used when Selene needs someone to push line further than anyone else. Makes every other Siren look tame by comparison.',
      relationships: `Selene Thorne - Handler
The Sirens - Fellow extreme operator`,
      arcStart: 'Already a legend in extreme content',
      arcChange: 'Need for intensity risks burning her out',
      arcEnd: 'Could evolve into tragic hero - or reinvent as fitness influencer, stuntwoman',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Delilah "Dillon" Hart',
      nickname: 'Dillion Harper',
      firstName: 'Delilah',
      lastName: 'Hart',
      archetype: 'Siren - The Infiltrator / Innocent Mask',
      modeledAfter: 'Dillion Harper',
      appearance: 'Small-town beauty - brunette, soft Southern charm, wide-eyed innocence. Radiates "girl next door" archetype.',
      wardrobeStyle: 'Sweet, approachable, deceptively innocent.',
      background: `From Ocala, Florida. Grew up in conservative, churchgoing family. Loved singing in choir, was headed to nursing school. Secretly began camming in late teens to escape small-town expectations. Quickly built brand as "sweetheart Siren" but underneath is clever manipulator.`,
      personality: 'On camera: Coy, shy, blushing - fantasy of being "the first" or "the innocent." Off camera: Witty, sarcastic, far less innocent than appears. Loves to joke with other Sirens. Hidden competitive streak - likes being underestimated then proving smarter.',
      bssRole: 'Siren Asset - The infiltrator. Perfect for targets who crave innocence, purity, or idea of "corrupting" someone. Wins trust fast, slips into circles where other Sirens would be too obvious. Can charm wives as easily as she seduces husbands.',
      relationships: `Selene Thorne - Handler
The Sirens - Underestimated sister`,
      arcStart: 'Innocent mask hiding sharp mind',
      arcChange: 'Torn between keeping innocent mask and dropping it to be true bold self',
      arcEnd: 'Could surprise everyone by becoming Selene most dangerous operator - because no one ever suspects her',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Gabrielle "Gabbi" Cortez',
      nickname: 'Gabbi Carter',
      firstName: 'Gabrielle',
      lastName: 'Cortez',
      archetype: 'Siren - The Ingenue / Natural Allure',
      modeledAfter: 'Gabbi Carter',
      appearance: 'Tall, blonde, radiant - long golden hair, luminous skin, wide green eyes. Effortlessly gorgeous, unplanned natural beauty. College girl next door look but height and poise make her stand out.',
      wardrobeStyle: 'Natural, fresh, unforced elegance.',
      background: `Born in Arizona, raised in quiet desert suburb. Star athlete in high school (track & field, swimming). Tried college briefly but structure never fit - craved freedom and adventure. Turned to modeling and camming where natural beauty quickly made her one of most requested.`,
      personality: 'On camera: Playful, teasing, innocent-but-curious. Leans into "new girl" fantasy. Off camera: Surprisingly shy, thoughtful, almost introverted. Loves nature, hiking, stargazing. Does not see herself as manipulative like some Sirens - more of a dreamer who gets swept along.',
      bssRole: 'Siren Asset - The ingenue. Placed in roles where fresh youth and wide-eyed beauty are needed to disarm or distract. Perfect for luring high-profile targets drawn to "pure, natural" allure.',
      relationships: `Selene Thorne - Handler
The Sirens - Youngest member energy`,
      arcStart: 'Natural beauty swept into Sirens world',
      arcChange: 'Struggles with place in Sirens - truly one of them or being used as baby face?',
      arcEnd: 'Could have redemption storyline breaking free for normal life - or become Selene secret weapon',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Penelope "Penny" Barker',
      nickname: 'Penny Barber',
      firstName: 'Penelope',
      lastName: 'Barker',
      archetype: 'Siren - The Matriarch / Enforcer (MILF Division)',
      modeledAfter: 'Penny Barber',
      appearance: 'Striking brunette, mid-30s, sharp cheekbones, piercing brown eyes, commanding presence.',
      wardrobeStyle: 'Subtle power: pencil skirts, silk blouses, heels - more CEO or professor than party girl.',
      background: `Bay Area native, highly educated (studied literature and sociology before dropping out of grad school). Worked in education and corporate training before pivoting into cam/adult world. Unlike younger Sirens, chose this world consciously - seeing it as both liberation and way to control power dynamics.`,
      personality: 'On camera: Confident, dominant, maternal - nurturing one second, cuttingly strict the next. Off camera: Incredibly sharp, analytical, planner. Loves debate, literature, wine tastings. The "older sister" of Sirens keeping wilder ones in check. Dry wit, not afraid to tell Selene when she is wrong.',
      bssRole: 'Siren Asset - The matriarch/enforcer. Deployed when situation requires authority and control, not just beauty. Often acts as handler for younger Sirens during missions. Can blend into professional settings - law firms, boardrooms, academia.',
      relationships: `Selene Thorne - Essentially second-in-command (Selene does not admit it)
The Sirens - Trainer and handler`,
      arcStart: 'Educated woman who chose this world for power',
      arcChange: 'Wrestles with being both performer and leader',
      arcEnd: 'Wants more influence, may push for autonomy or become rival power center',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Veronica Lane',
      nickname: 'Veronica Vail',
      firstName: 'Veronica',
      lastName: 'Lane',
      archetype: 'Siren - The Professor (MILF Division)',
      modeledAfter: 'MILF/teaching-style stars',
      appearance: 'Mid-40s, statuesque brunette with streaks of silver, always polished.',
      wardrobeStyle: 'Sharp, intellectual style - glasses, blouses, fitted dresses that whisper sophistication.',
      background: `Once a real college professor of psychology, left academia after scandal involving personal life. Rebuilt herself as "teaching star" creating videos framed as lessons in seduction, intimacy, and dominance. Fanbase reveres her as both mentor and fantasy.`,
      personality: 'Sharp, commanding, intellectual. Quotes Jung and Foucault between sultry lines. Off-camera: mentor to younger Sirens - patient but demanding. Watches everything in room, quietly analyzing before striking.',
      bssRole: 'Siren Asset - Deployed to high-level intellectual clients: judges, academics, lawyers. Plays role of instructor and dominatrix, dismantling egos while keeping control. Among Sirens, actually trains them in manipulation techniques.',
      relationships: `Selene Thorne - Handler
The Sirens - Their actual teacher`,
      arcStart: 'Former professor turned teaching star',
      arcChange: 'Torn between desire for control and unspoken loneliness',
      arcEnd: 'Could emerge as Siren who secretly manipulates Selene herself',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Bianca "Bee" Navarro',
      nickname: 'Bianca Blaze',
      firstName: 'Bianca',
      lastName: 'Navarro',
      archetype: 'Siren - The Hedonist / Party Queen (MILF Division)',
      modeledAfter: 'MILF/anal star archetype',
      appearance: 'Latina, late 30s, voluptuous with curves that command attention. Long black hair, smoky eyes, always in bold colors.',
      wardrobeStyle: 'Bold colors, revealing, party-ready luxury.',
      background: `Miami native, former club promoter. Got into adult work through nightlife scene, quickly made name by pushing boundaries onscreen. Proud of reputation as "the star who never says no."`,
      personality: 'Loud, funny, unapologetically vulgar - owns every room she enters. Fiercely loyal to those she trusts, savage to those who cross her. Loves luxury, parties, excess - but hides iron discipline under chaos.',
      bssRole: 'Siren Asset - Called "the hammer." When client or operator needs to be completely overwhelmed. Thrives in nightlife operations, VIP lounges, Latin American missions. Presence is intoxicating - leaves men ruined, women intimidated or secretly enamored.',
      relationships: `Selene Thorne - Handler
The Sirens - Overwhelming force`,
      arcStart: 'Wild reputation as party queen',
      arcChange: 'Battles with whether wild reputation is power or prison',
      arcEnd: 'Possible redemption arc - wanting to be loved for more than intensity',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Evelyn Drake',
      nickname: 'Eva Divine',
      firstName: 'Evelyn',
      lastName: 'Drake',
      archetype: 'Siren - The Ice Queen (MILF Division)',
      modeledAfter: 'MILF stars in forbidden/taboo categories',
      appearance: 'Early 40s, tall, blonde, surgically refined features, immaculate fashion sense. Always appears untouchable - diamonds, couture dresses, precise makeup.',
      wardrobeStyle: 'Couture, diamonds, perfection. Untouchable elegance.',
      background: `Former trophy wife of tech billionaire. Divorced after being discarded for someone younger, turned to adult work in "revenge rebirth." Specializes in content framed as reclaiming power through taboo.`,
      personality: 'Cold, calculating, aristocratic bearing. On-camera: plays cruel, untouchable goddess - fantasy of being with someone far above you. Off-camera: fiercely private, sipping champagne and reading history in silence.',
      bssRole: 'Siren Asset - Deployed to high-net-worth clients who crave humiliation or thrill of unattainable beauty. At galas, intimidates even the Wives - her elegance feels like threat. Clashes with younger Sirens who mistake reserve for weakness.',
      relationships: `Selene Thorne - Handler
Hawk - May eventually bond, sees through icy exterior
Addie - May eventually bond
The Sirens - Intimidating elder`,
      arcStart: 'Discarded trophy wife seeking revenge through power',
      arcChange: 'Struggles with vulnerability - terrified of being discarded again',
      arcEnd: 'May find authentic connection through unlikely bonds',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Serena Knox',
      nickname: 'Serenity Knox',
      firstName: 'Serena',
      lastName: 'Knox',
      archetype: 'Siren - The Trophy Fantasy',
      modeledAfter: 'Serenity Cox',
      appearance: 'Blonde bombshell with striking curves and polished glamour. Always looks like she just stepped out of a magazine - perfect hair, red lips, diamond jewelry.',
      wardrobeStyle: 'Magazine-perfect glamour. Trophy wife aesthetic reimagined.',
      background: `Born in Toronto to family of politicians and business executives. Expected to follow traditional path - private schools, sororities. Decided to write her own rules instead. Has that "dream woman" aura - fantasy of trophy wife who took control.`,
      personality: 'On camera: Perfect fantasy - glamorous, approachable, aspirational. Off camera: Surprisingly business-minded, strategic about her brand and future.',
      bssRole: 'Siren Asset - The trophy fantasy. Deployed when clients want polished perfection with edge. Appeals to men who want the "complete package."',
      relationships: `Selene Thorne - Handler
The Sirens - The polished one`,
      arcStart: 'Expected traditional path, chose rebellion',
      arcChange: 'Building brand and future strategically',
      arcEnd: 'May leverage Sirens into legitimate empire',
      sourceFiles: 'Cam Star Build'
    }
  ];

  for (const char of sirensCharacters) {
    const existing = await prisma.character.findFirst({
      where: { name: char.name, projectId: project.id }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...char,
          clubsAssociations: 'Sirens Network, Vixens'
        }
      });
      console.log(`Created: ${char.name} (${char.nickname})`);
    } else {
      await prisma.character.update({
        where: { id: existing.id },
        data: {
          ...char,
          clubsAssociations: 'Sirens Network, Vixens'
        }
      });
      console.log(`Updated: ${char.name}`);
    }
  }

  // ========== CREATE VIXENS/SIRENS ORGANIZATION ==========
  console.log("\n--- Creating Vixens/Sirens Organization ---\n");

  const sirensOrg = {
    name: 'The Sirens Network (Vixens)',
    shortName: 'Sirens',
    type: 'Shadow Organization',
    description: 'Selene\'s international network of cam stars and adult performers',
    industry: 'Adult Entertainment / Influence Operations',
    founder: 'Selene Thorne',
    leadership: JSON.stringify(['Selene Thorne (Founder)', 'Penny Barker (Second-in-Command)', 'Veronica Lane (Trainer)']),
    headquarters: 'Miami / International',
    services: 'Client screening, influence operations, social engineering, gala infiltration, high-stakes seduction',
    relationships: 'Connected to BSS through operator relationships, Wives Club through Selene',
    significance: `THE SIRENS NETWORK - SELENE'S SHADOW SISTERHOOD

NETWORK STRUCTURE:
- Young Division: Nadia Noir, Hannah Vale, Kelsi Monroe, Dillon Hart, Gabbi Carter
- MILF Division: Veronica Lane (Professor), Bianca Blaze (Hedonist), Eva Divine (Ice Queen), Penny Barker (Matriarch)
- Additional Assets: Serena Knox, Adriana Cech, Misty Meaner

ARCHETYPES:
- The Strategist (Nadia): Recruiter and tester
- The Muse (Hannah): Refined temptress for old money
- The Fire (Kelsi): The closer, overwhelming intensity
- The Chaos Agent (Misty): Shock and disruption
- The Shock Trooper (Adriana): Extreme operations
- The Infiltrator (Dillon): Innocent mask, trust-winner
- The Ingenue (Gabbi): Natural allure, disarming youth
- The Matriarch (Penny): Authority and control
- The Professor (Veronica): Intellectual domination
- The Hedonist (Bianca): Party queen, overwhelming presence
- The Ice Queen (Eva): Untouchable elegance
- The Trophy (Serena): Polished perfection

OPERATIONS:
- Pre-screening potential clients/operators online
- In-person deployments to Miami, Vegas, European trips
- Gala infiltrations and social engineering
- High-stakes seduction and influence campaigns
- Training new Sirens in manipulation techniques

SELENE'S VISION:
The Sirens are a rival power center - seductive, dangerous, capable of moving between BSS, Wives Club, and global elite. Each member fills unique archetype giving Selene unmatched roster for any mission.`
  };

  const existingOrg = await prisma.organization.findFirst({
    where: { name: sirensOrg.name, projectId: project.id }
  });

  if (!existingOrg) {
    await prisma.organization.create({ data: { projectId: project.id, ...sirensOrg } });
    console.log('Created: The Sirens Network organization');
  } else {
    await prisma.organization.update({ where: { id: existingOrg.id }, data: sirensOrg });
    console.log('Updated: The Sirens Network organization');
  }

  // ========== CREATE VIXENS STORYLINES ==========
  console.log("\n--- Creating Vixens Storylines ---\n");

  const vixensStorylines = [
    {
      title: 'Selene Recruits Nadia Noir',
      category: 'Sirens Origin',
      description: 'Selene discovers Nadia during late-night scouting online, sees her as asset not just cam star',
      content: `Selene discovers Nadia during one of her late-night scouting sessions online. She notices Nadia's blend of charisma, sensuality, and control.

Rather than dismiss her as "just a cam star," Selene sees her as an asset and recruits her into the Sirens network.

Nadia's role becomes unique — she doesn't always meet clients/operators in person, but she uses her platform to pre-screen, tease, and test potential men Selene wants to place with the Sirens or BSS operators.

When needed, she does join the in-person wild nights, often flying in under the radar to Miami, Vegas, or European trips.`,
      characters: JSON.stringify(['Selene Thorne', 'Nadia Trani'])
    },
    {
      title: 'The Arrival of the MILFs',
      category: 'Sirens Scene',
      description: 'Selene introduces the MILF Division to the younger Sirens',
      content: `The penthouse suite in Miami was lit by low golden lamps, floor-to-ceiling windows reflecting the city's neon glow. The younger Sirens lounged across velvet sofas — Gabbi, cross-legged with wide eyes; Kelsi, sipping tequila; Dillon, fiddling with her phone; Adriana, stretching like a coiled spring; Misty, tapping her nails against a champagne flute.

The door opened. Selene stepped in first, flanked by three women who radiated authority.

"Girls," Selene purred, her tone both affectionate and commanding. "Meet your teachers."

First was Veronica Lane, tall in a black pencil skirt, glasses glinting under the lights. She didn't smile. "Observation is the first lesson," she said, her voice smooth and professorial. "Every gesture tells you who someone is before they open their mouth. Learn to read the room, and you'll own it."

Next came Bianca Blaze, curves wrapped in crimson silk, laughter booming as she threw herself onto the couch next to Kelsi. "And the second lesson," Bianca said with a wink, "is that sometimes subtlety is overrated. Men are weak — give them fire, and they'll burn for you until there's nothing left."

Finally, Eva Divine appeared, diamond earrings catching the light, her expression carved from ice. She didn't sit — she perched in a high-back chair like a queen on her throne. "The third lesson," she said coolly, "is that you don't chase power. You make them crawl to you. The moment you bend for them, you've already lost."

The younger Sirens exchanged glances — Gabbi whispered "they're terrifying" to Dillon, who nodded nervously. Misty smirked, "Finally, women who can keep up." Adriana rolled her eyes but kept watching, fascinated.

Selene raised her glass. "These three are your guides. You'll hate them at times, but you'll learn from them. Without them, you'll never master the game. With them…" she smiled like a predator, "the world is yours."`,
      characters: JSON.stringify(['Selene Thorne', 'Veronica Lane', 'Bianca Navarro', 'Evelyn Drake', 'Gabrielle Cortez', 'Kelsi Morales', 'Delilah Hart', 'Adriana Carver', 'Marissa Moreno'])
    },
    {
      title: 'Sirens Network Dossier',
      category: 'Reference',
      description: 'BSS-style dossier on the complete Sirens Network',
      content: `SIRENS NETWORK - CLASSIFIED DOSSIER

NETWORK LEADER: Selene Thorne
STATUS: Active / International Operations

YOUNG DIVISION:
1. Nadia Noir (Nadia Trani) - STRATEGIST
   Skills: Recruitment, screening, online influence
   Weakness: Ambitious - may seek independent power

2. Hannah Vale (Helena Voss) - MUSE
   Skills: Old money seduction, European clients
   Weakness: Craves normalcy, dual life conflict

3. Kelsi Monroe (Kelsi Morales) - FIRE
   Skills: Closing deals, overwhelming intensity, Miami ops
   Weakness: Typecast as wild, seeks deeper connection

4. Dillion Harper (Delilah Hart) - INFILTRATOR
   Skills: Trust-building, innocent mask, wife-charming
   Weakness: Identity conflict - mask vs true self

5. Gabbi Carter (Gabrielle Cortez) - INGENUE
   Skills: Natural allure, disarming youth, high-profile targets
   Weakness: Uncertain of place, may break free

MILF DIVISION:
6. Penny Barber (Penelope Barker) - MATRIARCH
   Skills: Authority, handler ops, professional settings
   Weakness: Power ambitions, potential rival

7. Veronica Vail (Veronica Lane) - PROFESSOR
   Skills: Intellectual clients, training, manipulation
   Weakness: Loneliness, may manipulate upward

8. Bianca Blaze (Bianca Navarro) - HEDONIST
   Skills: Overwhelming presence, Latin ops, VIP lounges
   Weakness: Wild reputation, craves authentic love

9. Eva Divine (Evelyn Drake) - ICE QUEEN
   Skills: High-net-worth humiliation, intimidation
   Weakness: Fear of abandonment, revenge-driven

CHAOS DIVISION:
10. Misty Meaner (Marissa Moreno) - CHAOS AGENT
    Skills: Disruption, intimidation, enforcement
    Weakness: Hidden wounds, could turn against system

11. Adriana Cech (Adriana Carver) - SHOCK TROOPER
    Skills: Extreme operations, pushing limits
    Weakness: Self-destructive tendencies, burnout risk

SPECIALTY:
12. Serenity Knox (Serena Knox) - TROPHY FANTASY
    Skills: Polished perfection, complete package appeal
    Weakness: Strategic ambition, building exit plan

NETWORK ASSESSMENT:
Together they form an unmatched roster - international, diverse in archetypes, capable of any mission. The Sirens are a rival power center to BSS, capable of moving between worlds.`,
      characters: JSON.stringify(['Selene Thorne', 'Nadia Trani', 'Helena Voss', 'Kelsi Morales', 'Delilah Hart', 'Gabrielle Cortez', 'Penelope Barker', 'Veronica Lane', 'Bianca Navarro', 'Evelyn Drake', 'Marissa Moreno', 'Adriana Carver', 'Serena Knox'])
    }
  ];

  for (const storyline of vixensStorylines) {
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
  const charCount = await prisma.character.count();
  const orgCount = await prisma.organization.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Total characters: ${charCount}`);
  console.log(`Total organizations: ${orgCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
