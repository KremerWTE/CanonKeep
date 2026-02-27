import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating BSS characters with comprehensive details from documents...\n');

  // ========== ADDIE (Adelaide) ==========
  const addie = await prisma.character.findFirst({
    where: { OR: [{ name: { contains: 'Addie' } }, { name: { contains: 'Adelaide' } }] }
  });
  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        name: 'Addison Price',
        firstName: 'Addison',
        lastName: 'Price',
        nameVariants: 'Addie, Adelaide',
        archetype: 'Managing Partner / Patroness of Honor',
        bssRole: 'Managing Partner / Traveling Fixer / POH',
        hubLocation: 'Charlotte, NC (Global deployments)',
        careerHistory: 'Started as rough but sharp assistant at BSS. Rose through ranks to Managing Partner. Became Patroness of Honor (POH).',
        background: `Started as office assistant, then analyst at BSS. Evolved into core operator and strategic leader. Initially resisted POH title but grew into role. Las Vegas breakthrough: 3-week operation exposing money laundering, mafia/cartel pipeline, and trafficking ring. Converts to Catholicism with Hawk to become Grace's godparents. "IT girl" who thrived where perfect resumes (PhDs, Navy SEALs, Rhodes Scholars) failed.`,
        relationships: 'Married to Ethan Cole (Hawk). Mother of twins William "Will" and Isabella "Izzy", plus Michael "Mikey". Godmother to Grace. Works under Riley Whitmore. Boss is Jasper Barrett. Past romantic involvement with Kendra. Close with Elena, Bella, Selene.',
        personality: 'Direct, no-nonsense, dark humor under pressure. Brilliant analyst who sees patterns others miss. Chaos coordinator. Walls up emotionally but softens around Elena and Grace. Adaptable, improvises under pressure.',
        motivations: 'To prove herself, to be taken seriously in world of Ivy League credentials, to build something of her own within BSS.',
        fears: 'Being seen as "just the assistant", burning out, losing herself in work like Jasper.',
        appearance: 'Athletic build (CrossFit). Power suits that mean business. Hair always perfect even at 3 AM.',
      }
    });
    console.log('Updated: Addison Price (Addie)');
  }

  // ========== HAWK (Ethan Cole) ==========
  const hawk = await prisma.character.findFirst({
    where: { OR: [{ name: { contains: 'Hawk' } }, { name: { contains: 'Ethan Cole' } }] }
  });
  if (hawk) {
    await prisma.character.update({
      where: { id: hawk.id },
      data: {
        name: 'Ethan Cole',
        firstName: 'Ethan',
        lastName: 'Cole',
        nameVariants: 'Hawk, Cole',
        archetype: 'Chief of Security / Former SEAL',
        bssRole: 'Head of Security (NOT BSS employee - biotech company)',
        hubLocation: 'Charlotte, NC (adjacent to Chris/Kendra estate)',
        careerHistory: 'Former DEVGRU (SEAL Team Six) operator. Medically retired after classified Yemen mission. Worked Las Vegas high-level private security. Now Chief of Security for biotech company.',
        background: `Born and raised small-town Texas. Rough childhood, no safety net. Parents gone early. Decorated special operations background - calm under fire, lethal in execution. The Brotherhood became his true family. Vegas years deepened disillusionment with excess/corruption. Serves on board of veterans foundation. Financially independent. NOT a BSS employee - orbits BSS world through biotech security role. Became stay-at-home dad for first 3 years after twins.`,
        relationships: 'Married to Addison Price (Addie). Father of twins Will and Izzy, plus Mikey. Godfather to Grace. Only blood relative: sister Jennifer "Jen" in Dallas. Operator bond with Ridge. Mentors Bella.',
        personality: 'Chess-player mentality - always 3 steps ahead. Stoic but magnetic. Speaks little but words matter. Rigid personal code: protect, never betray, never quit. Zero tolerance for screens - no tech in rooms with kids, confiscates phones at dinner (even from Harper).',
        motivations: 'To protect those who matter, to find family after losing his team, to prove warriors can have soft hearts.',
        fears: 'Failing to protect someone again, being too broken for civilian life, letting Addie see his darkest moments.',
        appearance: 'Operator build - functional muscle, not gym show. Lean build from years in field. Alert eyes that scan every room. Scars he doesn\'t talk about.',
        modeledAfter: 'Sonny Quinn (SEAL Team) + Danny McCoy (Las Vegas TV show)',
      }
    });
    console.log('Updated: Ethan Cole (Hawk)');
  }

  // ========== HARPER ==========
  const harper = await prisma.character.findFirst({
    where: { name: { contains: 'Harper' } }
  });
  if (harper) {
    await prisma.character.update({
      where: { id: harper.id },
      data: {
        archetype: 'COO / Co-Founder / Quiet Queen',
        bssRole: 'Co-Founder / COO / Miami Office Lead / Traveling Fixer',
        hubLocation: 'Miami (Coral Gables)',
        careerHistory: 'Co-founded BSS with Jasper. Shadow partner for years 1-2. Official COO years 3-4. Became "The Overseer" years 7-8. Legacy builder years 9-10.',
        background: `True strategic brain of BSS - not flashy like operators but indispensable. Reads people before they walk in room. Has "Oracle sight" - sees outcomes before they happen. Carries leather-bound ledger instead of laptop. Color-coded dossiers system. Created "Harper Index" scoring BSS members on performance, resilience, loyalty. Hosts "quiet dinners" testing loyalty. Coral Gables mansion: sleek minimalist, dual-use (playroom upstairs, war-room study downstairs).`,
        relationships: 'Married to Matthew Keating (shipping magnate). Three children: Isabella "Izzy" (9), twins Nicolas "Nico" and Sofia (7). Au pair: Chiara Benedetti (Florence). Strategic partners with Jasper (had unspoken feelings but never crossed line). Mentor to Bella, Kendra, Selene.',
        personality: 'Measured, precise. Speaks in frameworks and options. Terrifyingly accurate predictions. Calm under extreme pressure. Reads body language like superpower. Can be too analytical. Doesn\'t advocate enough for herself.',
        motivations: 'To build something lasting, to prove strategy matters as much as action, to support Jasper while building her own legacy.',
        fears: 'Being overlooked because not "in the field", the firm falling apart if Jasper burns out.',
        appearance: 'Green eyes, dark hair (sharp knot/braid). Poised, elegant. Tailored clothing (black suits, silk blouses). Reading glasses she\'s always pushing up.',
      }
    });
    console.log('Updated: Harper');
  }

  // ========== KENDRA ==========
  const kendra = await prisma.character.findFirst({
    where: { name: { contains: 'Kendra' } }
  });
  if (kendra) {
    await prisma.character.update({
      where: { id: kendra.id },
      data: {
        name: 'Kendra Whitaker',
        firstName: 'Kendra',
        lastName: 'Whitaker',
        archetype: 'Senior Analyst / Fixer / CrossFit Athlete',
        bssRole: 'Senior Analyst → Fixer',
        careerHistory: 'Started as analyst. Elite CrossFit athlete - competitive at Games level. Returns as Fixer with Bella as analyst after maternity leave.',
        background: `Raised Catholic, never walked away from faith. Becomes working mother balancing championship training, BSS career, and family. Groomed to become fixer. Develops East Coast corridor expertise. Known for running "full speed" at work. Journaling helps process emotions. Maternity year: graduated from analyst to fixer while raising baby.`,
        relationships: 'Married to Chris. Daughter: Sophia Addison Whitaker. Past romantic involvement with Addie (complicates working relationship). Bella is her field analyst. Addie is mentor/godmother to Sophia. Hawk is godfather to Sophia.',
        personality: 'Confident but not arrogant. Athlete\'s discipline in speech. Warmer with close friends. Perfectionist - takes on too much. Can\'t ask for help even when drowning.',
        motivations: 'To excel at everything, to prove working mothers can compete at elite levels, to stay grounded in faith and values.',
        fears: 'Having to choose between career and family, not being enough for either, losing athletic identity to motherhood.',
        appearance: 'Athletic, powerful build. Competition-ready physique from CrossFit. Moves with athlete\'s efficiency.',
      }
    });
    console.log('Updated: Kendra Whitaker');
  }

  // ========== BELLA ==========
  const bella = await prisma.character.findFirst({
    where: { name: 'Bella' }
  });
  if (bella) {
    await prisma.character.update({
      where: { id: bella.id },
      data: {
        archetype: 'Analyst / Multi-Role / Fun Aunt',
        bssRole: 'Analyst (grooming for Fixer) / POH Page',
        careerHistory: 'BSS analyst grooming for fixer. TX event support company with venue development. COO/Marketing for Maison Aurelia. POH Page role.',
        background: `Works triple duty: BSS, TX events, Elena's Maison Aurelia. Underestimated publicly but indispensable privately. Becomes analyst for Kendra. Insane schedule: 18-20 hour days, 3-4 hours sleep. "Fun aunt" to Jasper and Elena\'s kids - teaches them to lasso, horseback riding, ice cream trips. Favorite of Sofia (Harper\'s daughter) who calls her "favorite aunt."`,
        relationships: 'Analyst for Kendra. Love triangle resolution - ends up with Matt (vacation home business). Former relationship with Mandy. Elena guides her in business/life. Close to Grace. Brings lightness to heavy situations.',
        personality: 'Warm, capable, occasionally self-deprecating. More confident in work than romance. Takes on too much. Doesn\'t advocate for herself. People-pleaser. Devoted to Grace above all.',
        motivations: 'To build her own empire while helping others build theirs, to find love that doesn\'t require her to shrink.',
        fears: 'Being seen as just support staff forever, choosing wrong in love.',
        appearance: 'Girl-next-door beauty. Always put-together but approachable.',
      }
    });
    console.log('Updated: Bella');
  }

  // ========== RIDGE ==========
  const ridge = await prisma.character.findFirst({
    where: { name: 'Ridge' }
  });
  if (ridge) {
    await prisma.character.update({
      where: { id: ridge.id },
      data: {
        archetype: 'Head of Operators / Former SEAL / Sports Protection',
        bssRole: 'Assistant Head of Operators → Head of Operators / Sports Protection Unit Lead',
        hubLocation: 'Asia → Charlotte, NC',
        careerHistory: 'Former SEAL Team Six. Led BSS Asia team until engagement. Promoted to Assistant Head of Operators, then Head of Operators. Spearheads Sports Protection Unit (SPU).',
        background: `Years of forward deployment as "fixer" - the guy called when things go sideways. Known for quiet violence and steady hands. Transition from lone wolf operator to mentor, husband, father, builder. Still gets "play trips" from Cole to stay sharp. SPU handles elite athlete protection: blackmail prevention, safe travel, stalkers, rogue insiders.`,
        relationships: 'Married to Julia Raines. Two children: daughter (same age as Sophia) and son. Operator bond with Hawk. Close to operator brotherhood.',
        personality: 'Operator calm. Clear, precise communication. Looser with fellow team members. Can be restless in leadership roles. Misses field work.',
        motivations: 'To serve with excellence, to build family while staying connected to mission, to mentor younger operators.',
        fears: 'Losing the edge that keeps people safe, choosing wrong between family and mission.',
        appearance: 'Operator fit. Moves like predator even in civilian clothes.',
      }
    });
    console.log('Updated: Ridge');
  }

  // ========== MAYA RUIZ ==========
  const maya = await prisma.character.findFirst({
    where: { name: { contains: 'Maya' } }
  });
  if (!maya) {
    const project = await prisma.project.findFirst();
    if (project) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          name: 'Maya Ruiz',
          firstName: 'Maya',
          lastName: 'Ruiz',
          archetype: 'Senior Analyst / Watch Desk Oracle',
          bssRole: 'Senior Analyst / Anchor of Watch Desk',
          hubLocation: 'Charlotte, NC',
          careerHistory: 'Former NSA analyst. Now senior analyst at BSS.',
          background: 'Cuban-American, former NSA analyst. Divorced, secretly dating someone in Elena\'s event world. Uncanny ability to predict issues - correlates chatter, social media, field reports. Most trusted by Jasper and Cole for 6am/6pm battle handoffs. Can "read tea leaves like an oracle." Noticed operator stress patterns two weeks before team fractures. Quiet savior of morale and operational tempo.',
          relationships: 'Divorced. Secretly dating someone in Elena\'s event world. Trusted by Jasper and Cole.',
          sourceFiles: 'Canon update',
          isConfirmed: true,
        }
      });
      console.log('Created: Maya Ruiz');
    }
  } else {
    console.log('Maya Ruiz already exists');
  }

  // ========== THEO HARRINGTON ==========
  const theo = await prisma.character.findFirst({
    where: { name: { contains: 'Theo' } }
  });
  if (theo) {
    await prisma.character.update({
      where: { id: theo.id },
      data: {
        name: 'Theo Harrington',
        firstName: 'Theo',
        lastName: 'Harrington',
        background: 'Ivy League grad who kept blowing simple ops with overthinking. Underwent brutal mentorship from Maya and Harper. Tests of instinct, rapid decision-making, judgment under fire. Eventually called the right shot on live case and earned his seat. Part of "genius rookies who don\'t fit anywhere else" program.',
      }
    });
    console.log('Updated: Theo Harrington');
  }

  // ========== SELENE ==========
  const selene = await prisma.character.findFirst({
    where: { name: { contains: 'Selene' } }
  });
  if (selene) {
    await prisma.character.update({
      where: { id: selene.id },
      data: {
        archetype: 'Protection Specialist / Operator',
        bssRole: 'Protection Specialist / Operator',
        background: 'Running protection detail for European CEO in London. Sharp enough to notice HQ\'s behind-the-scenes orchestration. Sneaked into "Circle" night at HQ. Works closely with Addie. "Not a kids person" - Grace\'s least favorite ("Selene\'s boring. She doesn\'t play").',
        personality: 'Chic, faintly uncomfortable around children but doesn\'t apologize for it. Sharp, observant.',
        relationships: 'Close to Addie and Hawk. Not favored by Grace.',
      }
    });
    console.log('Updated: Selene');
  }

  // ========== JASPER BARRETT - Final comprehensive update ==========
  const jasper = await prisma.character.findFirst({
    where: { name: { contains: 'Jasper Barrett' } }
  });
  if (jasper) {
    await prisma.character.update({
      where: { id: jasper.id },
      data: {
        archetype: 'CEO / Founder / Crisis Management Master',
        careerHistory: 'Former construction PM → Mentored by Jessica Hall → Founded BSS → Global crisis management empire.',
        background: `Lives on large compound outside Charlotte, NC in Appalachian foothills. Estate has many guest rooms and extensive land. Started in Construction Management as PM before being found by Jessica Hall. CEO and Founder of BSS (Barrett Security Solutions). BSS is corporate crisis management firm employing tier operators, cyber analysts, and fixers. Grew from 2 clients in townhouse garage to global think tank. Leads 6am/6pm "battle handoff" rituals. Lives by "Five Foot World" mindset - focus only on immediate reach during crises. Workaholic who cannot delegate. Commands rooms with short, direct sentences under pressure.`,
        personality: 'Disciplined, duty-bound, strategic thinker. Guarded charisma. Commands rooms. Short, direct sentences under pressure. More reflective and vulnerable with Elena and Grace. Military-style briefing language at work.',
        motivations: 'To be best crisis manager in world, to protect clients. Secretly: prove he can have both career success and family.',
        fears: 'Losing control, missing something critical, being exposed as someone who chose work over family one too many times.',
        modeledAfter: 'Chess player - strategic, patient',
      }
    });
    console.log('Updated: Jasper Barrett (comprehensive)');
  }

  // ========== ELENA BARRETT ==========
  const elena = await prisma.character.findFirst({
    where: { name: { contains: 'Elena Barrett' } }
  });
  if (elena) {
    await prisma.character.update({
      where: { id: elena.id },
      data: {
        archetype: 'CEO / Elite Event Planner / Southern Mother',
        careerHistory: 'Former luxury real estate agent. Literary non-profit organizer. Elite party planner. CEO of Maison Aurelia.',
        background: `Lives on Barrett family compound outside Charlotte, NC in Appalachian foothills. Started in high society. Now southern mother raising Grace (1st grade at Book 1 start) and baby Lucas. CEO of Maison Aurelia - global event and lifestyle management firm. Specialties: Vatican-linked fundraisers, Fortune 100 CEO summits, cultural diplomacy dinners, Palace of Honor galas. Sisters: Camila (older, married European royal), Sara (younger, owns CrossFit gym).`,
        personality: 'Elegant, graceful. Artistry in event creation. Balancing high-powered career with motherhood. Guides Bella in business and life.',
      }
    });
    console.log('Updated: Elena Barrett');
  }

  // ========== RILEY WHITMORE ==========
  const riley = await prisma.character.findFirst({
    where: { name: { contains: 'Riley' }, hubLocation: { contains: 'Charlotte' } }
  });
  if (riley) {
    await prisma.character.update({
      where: { id: riley.id },
      data: {
        name: 'Riley Whitmore',
        firstName: 'Riley',
        lastName: 'Whitmore',
        nameVariants: 'Riley Grant',
        archetype: 'Charlotte HQ Operations Leader',
        bssRole: 'Charlotte HQ Operations Leader / Office Manager',
        background: 'Works directly at Jasper\'s Charlotte HQ. Mentor, boss, and partner in running day-to-day operations. Addie works under him. Reliable, competent, essential to BSS function. Turned down field work to stay in Charlotte.',
        personality: 'Calm, organized. Good at defusing tension. Can be too focused on process. Risk-averse. "Dad energy."',
        motivations: 'To keep BSS running smoothly, to develop talent like Addie.',
        fears: 'Chaos, things falling through cracks.',
      }
    });
    console.log('Updated: Riley Whitmore');
  }

  // ========== JESSICA HALL ==========
  const jessica = await prisma.character.findFirst({
    where: { name: { contains: 'Jessica Hall' } }
  });
  if (jessica) {
    await prisma.character.update({
      where: { id: jessica.id },
      data: {
        archetype: 'Original Mentor / Advisor',
        bssRole: 'Mentor / Advisor (semi-retired)',
        background: 'Found Jasper on troubled construction megaprojects. Recognized his talent and mentored him into crisis management. Early champion who gave him his start. Now semi-retired but sits on boards and maintains social influence. She sees herself in Jasper\'s workaholism - almost lost her own family the same way.',
        personality: 'Elegant, measured. Speaks from experience. Occasional steel when needed. Can be too hands-off now.',
        motivations: 'To see her protégés succeed, to maintain influence without daily grind.',
        fears: 'That Jasper will burn out like she almost did, becoming irrelevant.',
        appearance: 'Aging gracefully. Power suits softened with personal touches. Commanding presence.',
      }
    });
    console.log('Updated: Jessica Hall');
  }

  // ========== CIPHER ==========
  const cipher = await prisma.character.findFirst({
    where: { name: 'Cipher' }
  });
  if (cipher) {
    await prisma.character.update({
      where: { id: cipher.id },
      data: {
        background: 'Cyber specialist for BSS. Part of central cyber team in Charlotte with Patch and Grayson. Goes by callsign "Cipher". Handles digital intelligence, hacking, and cyber operations.',
      }
    });
    console.log('Updated: Cipher');
  }

  // ========== COLE (Operator) ==========
  const coleOp = await prisma.character.findFirst({
    where: { name: 'Cole', bssRole: { contains: 'Operator' } }
  });
  if (coleOp) {
    await prisma.character.update({
      where: { id: coleOp.id },
      data: {
        background: 'Tier operator for BSS. Participates in 6am/6pm battle handoffs with Jasper. Trusts Maya Ruiz for operational intelligence. Introduced Hawk to Addie.',
      }
    });
    console.log('Updated: Cole (Operator)');
  }

  const count = await prisma.character.count();
  console.log(`\nTotal characters: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
