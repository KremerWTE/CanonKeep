import { PrismaClient } from '@prisma/client';
import * as mammoth from 'mammoth';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING ADDIE ROYAL PHOENIX SERIES & HARPER MIAMI HEAT ===\n");

  // Parse the Family Party Narrative document
  console.log("--- Parsing Family Party Narrative (Series Closing) ---\n");
  let familyPartyText = '';
  try {
    const result = await mammoth.extractRawText({ path: 'Characters_Source/Family Party Narrative (series closing).docx' });
    familyPartyText = result.value;
    console.log(`Document length: ${familyPartyText.length} characters`);
    console.log('\nFirst 2000 characters:');
    console.log(familyPartyText.substring(0, 2000).replace(/\n{3,}/g, '\n\n'));
  } catch (e) {
    console.log('Could not read Family Party Narrative');
  }

  // ========== ADDIE ROYAL PHOENIX SERIES (13 Books) ==========
  console.log("\n--- Creating Royal Phoenix Series (Addie - 13 Books) ---\n");

  const royalPhoenixBooks = [
    {
      title: 'Book 1: The Protectress Rises',
      synopsis: 'Addie\'s origin story. How she became the "fixer of last resort" at BSS. Her burnout and exhaustion, meeting Cole Harrington (Tier 1 guy), and beginning her path as Protectress of Honor.'
    },
    {
      title: 'Book 2: Denver Crisis',
      synopsis: 'Month-long telecoms crisis in Denver with Daniel. Addie pushes herself to breaking point. Misses Grace\'s calls, Harper\'s wedding planning, Kendra\'s Games placement. The beginning of her collapse.'
    },
    {
      title: 'Book 3: The Breaking',
      synopsis: 'Addie\'s hospitalization from exhaustion. Cole watches over her. The doctor helps her confront her feelings for Kendra. The moment she realizes she\'s been running from herself.'
    },
    {
      title: 'Book 4: Enter the Hawk',
      synopsis: 'Hawk enters Addie\'s life during her recovery. Their first meetings. The midnight shower "proposal" scene. The beginning of something real despite her resistance.'
    },
    {
      title: 'Book 5: Building Home',
      synopsis: 'Addie and Hawk build a house together, moving in. Learning to let someone in. Balancing POH duties with personal life. The slow healing process.'
    },
    {
      title: 'Book 6: The Proposal',
      synopsis: 'Hawk\'s quiet but romantic proposal on their property. Addie accepting love after years of running. Wedding planning with the Wives Club. A warrior goddess learning to be a bride.'
    },
    {
      title: 'Book 7: Mrs. Hawk',
      synopsis: 'The wedding on their property. Brotherhood attending. The compound family celebrating. Addie becoming something new while staying true to herself.'
    },
    {
      title: 'Book 8: The Twins',
      synopsis: 'Fertility struggles after her exhaustion hospitalization. Dr. wife of Wives Club in Greensboro helps. The miracle of twin babies - one boy, one girl. Hawk becomes "Dad Ops."'
    },
    {
      title: 'Book 9: Two Lights, One Mission',
      synopsis: 'Adjusting to motherhood with twins. Addie weaves "two lights, one mission" into her POH leadership. The compound adapts with new wing in ranch house.'
    },
    {
      title: 'Book 10: The Third',
      synopsis: 'Pregnant again within a year. The divine surprise that strengthens their faith. "We\'ve survived combat zones, love. We can survive diapers." Three children under three.'
    },
    {
      title: 'Book 11: Full Circle',
      synopsis: 'Addie using her motherhood experience in POH role. Speaking with authentic empathy about exhaustion, sacrifice, and finding joy. Training the next generation of protectresses.'
    },
    {
      title: 'Book 12: The Legacy',
      synopsis: 'Addie\'s position as the connection point of the entire universe. Her relationships with every major character. How she became the heart that holds everyone together.'
    },
    {
      title: 'Book 13: Phoenix Eternal',
      synopsis: 'The culmination of Addie\'s journey. From burned-out fixer to wife, mother, and spiritual leader. The Royal Phoenix fully risen, her legacy secured for generations.'
    }
  ];

  const royalPhoenixSeries = await prisma.bookSeries.findFirst({
    where: { name: 'Royal Phoenix', projectId: project.id }
  });

  if (!royalPhoenixSeries) {
    await prisma.bookSeries.create({
      data: {
        projectId: project.id,
        name: 'Royal Phoenix',
        seriesType: 'Main',
        protagonist: 'Addison "Addie"',
        premise: `Addie's 13-book saga - the journey of the Protectress.

The Royal Phoenix series follows Addison "Addie" through her complete transformation from burned-out BSS fixer to wife, mother, and spiritual leader.

SERIES ARC:
Addie becomes the main character connecting everything in the Five Feet From Home universe. Her journey from the Denver crisis through building a family with Hawk represents the heart of the entire story.

CORE THEMES:
- The Phoenix symbolism: rebirth, recovery, second chances
- From protector of others to allowing herself to be protected
- Balancing warrior strength with feminine softness
- Building family after years of isolation
- Becoming the connection point for the entire orbit

HAWK'S ROLE:
Hawk takes on the Phoenix Project role - helping people rebuild themselves. He's not just hovering for romance but invested in the same battlefield Addie's fighting: perfection, burnout, identity, hidden wounds.

THE UMBRELLA:
As Protectress of Honor (POH), Addie becomes the "umbrella" that protects everyone in the orbit. By series end, she's the matriarch everyone turns to.`,
        totalBooks: 13,
        books: JSON.stringify(royalPhoenixBooks)
      }
    });
    console.log('Created: Royal Phoenix series (13 books)');
  } else {
    await prisma.bookSeries.update({
      where: { id: royalPhoenixSeries.id },
      data: {
        totalBooks: 13,
        books: JSON.stringify(royalPhoenixBooks)
      }
    });
    console.log('Updated: Royal Phoenix series');
  }

  // ========== HARPER MIAMI HEAT SERIES ==========
  console.log("\n--- Creating Harper Miami Heat Series ---\n");

  const miamiHeatBooks = [
    {
      title: 'Book 1: The Rising COO',
      synopsis: 'Harper Vance\'s rise at BSS. Former embedded journalist becoming crisis comms consultant. Learning the ropes under Jasper. Her first major solo operations.'
    },
    {
      title: 'Book 2: Miami Fires',
      synopsis: 'Major crisis in Miami tests Harper\'s leadership. The heat of the city matches the heat of the situation. Late nights, war rooms, and proving herself.'
    },
    {
      title: 'Book 3: The Proposal',
      synopsis: 'Harper\'s boyfriend proposes. But instead of stepping back, she steps up - becoming Jasper\'s top field presence. Balancing love and career at the highest levels.'
    },
    {
      title: 'Book 4: Field Heir',
      synopsis: 'Harper fully becomes Jasper\'s field heir - "like he used to be." 14 hours ahead in Asia juggling market fires. The new face of BSS global operations.'
    },
    {
      title: 'Book 5: Wedding Season',
      synopsis: 'Planning her wedding while managing global crises. Addie remote, supportive only in chat. The challenge of having it all when "all" spans continents.'
    },
    {
      title: 'Book 6: Mrs. Vance',
      synopsis: 'The wedding, the marriage, and what comes next. Harper finding her rhythm as wife and COO. Setting up the next generation of BSS leadership.'
    }
  ];

  const miamiHeatSeries = await prisma.bookSeries.findFirst({
    where: { name: 'Miami Heat', projectId: project.id }
  });

  if (!miamiHeatSeries) {
    await prisma.bookSeries.create({
      data: {
        projectId: project.id,
        name: 'Miami Heat',
        seriesType: 'Spin-off',
        protagonist: 'Harper Vance',
        premise: `Harper's journey from journalist to BSS Field Heir.

The Miami Heat series follows Harper Vance as she transforms from former embedded journalist to COO and field heir of BSS.

CELEBRITY MATCH: Rebecca Ferguson (Mission: Impossible – Fallout, Silo)

SERIES ARC:
Harper's rise parallels Jasper's stepping back. As he learns to be present at home, she steps into the field role he once held. Miami becomes symbolic - hot, high-stakes, glamorous but demanding.

CORE THEMES:
- Professional woman rising without sacrificing personal life
- Learning to lead globally while staying connected locally
- The proposal that changes everything - and nothing
- Becoming "the new Jasper" for the next era

RELATIONSHIP WITH ADDIE:
Harper feels Addie's absence keenly during her wedding planning. They're meant to be colleagues and friends, but Addie's burnout creates distance. Their reconciliation becomes important.`,
        totalBooks: 6,
        books: JSON.stringify(miamiHeatBooks)
      }
    });
    console.log('Created: Miami Heat series (Harper - 6 books)');
  } else {
    await prisma.bookSeries.update({
      where: { id: miamiHeatSeries.id },
      data: {
        totalBooks: 6,
        books: JSON.stringify(miamiHeatBooks)
      }
    });
    console.log('Updated: Miami Heat series');
  }

  // ========== FAMILY PARTY NARRATIVE - SERIES ENDING ==========
  console.log("\n--- Creating Family Party Narrative (Series Closing) ---\n");

  const familyPartyStoryline = {
    title: 'Family Party Narrative - How The Story Ends',
    category: 'Series Finale',
    description: 'The closing narrative of the entire Five Feet From Home universe',
    content: `THE FAMILY PARTY - SERIES CLOSING

This is how it all ends: not with a crisis, but with a celebration.

THE GATHERING:
Everyone comes home. The compound is full. The Aurelia estate twinkles with lights. All the storylines converge into one final party.

WHO'S THERE:
- Jasper and Elena, finally balanced, Grace grown up beside them
- Addie and Hawk with their three children, the Phoenix fully risen
- Harper and her husband, the field heir at peace
- Kendra and her partner, settled and strong
- Cole Harrington with his girlfriend, no longer just a protector
- Bella and Matt with Mandy nearby, their triangle resolved in love
- Evie (Mrs. Cole?) with the Strong & Savory legacy thriving
- All the Wives Club members, their bonds unbreakable
- The Special Olympics athletes - Jazz, Claire - showing what was built
- The next generation running through the gardens

THE MOMENT:
Firepit burning. Stars overhead. Laughter from every corner. Someone starts the music. Dancing begins.

And Addie looks around - at everyone she protected, everyone who protected her - and finally exhales.

THE MESSAGE:
You can have the career and the family. You can burn out and rise again. You can love deeply in ways you never expected. And in the end, it's not the crises that define you - it's the people who stay.

Five feet from home was always about coming back. And here, finally, everyone has.`,
    characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett', 'Grace Barrett', 'Addie', 'Hawk', 'Harper', 'Kendra Vos', 'Cole Harrington', 'Bella', 'Matt', 'Mandy', 'Evie Maren', 'Jazz Carter', 'Claire Donahue'])
  };

  const existingFinale = await prisma.storyline.findFirst({
    where: { title: familyPartyStoryline.title, projectId: project.id }
  });

  if (!existingFinale) {
    await prisma.storyline.create({ data: { projectId: project.id, ...familyPartyStoryline } });
    console.log('Created: Family Party Narrative (Series Finale)');
  } else {
    await prisma.storyline.update({ where: { id: existingFinale.id }, data: familyPartyStoryline });
    console.log('Updated: Family Party Narrative (Series Finale)');
  }

  // ========== UPDATE ADDIE WITH ROYAL PHOENIX ROLE ==========
  console.log("\n--- Updating Addie as Main Character ---\n");

  const addie = await prisma.character.findFirst({
    where: { firstName: 'Addison' }
  });

  if (addie) {
    await prisma.character.update({
      where: { id: addie.id },
      data: {
        archetype: 'Main Character / Protectress of Honor / Royal Phoenix',
        background: (addie.background || '') + `

ADDIE IS THE MAIN CHARACTER

Addie becomes the connection point for everything in the Five Feet From Home universe. Her 13-book series "Royal Phoenix" tracks her complete transformation.

THE PHOENIX SYMBOLISM:
- Burned out, hospitalized, nearly destroyed
- Rose from the ashes through love (Hawk)
- Built a family (twins + third child)
- Became the matriarch of the entire orbit

HER CONNECTIONS:
- BSS: Senior Fixer, mentors Daniel
- POH: Protectress, the "umbrella" for everyone
- Jasper: Trusted completely
- Harper: Colleague, friend
- Kendra: Unresolved spark, complicated love
- Elena: Close friend, protector
- Grace: "Aunt Addie," protective
- Cole Harrington: He watches over her
- Hawk: Husband, father of her children
- Evie: Brought her under protection
- The Wives Club: Her family

THE SERIES ENDING:
At the Family Party, Addie looks around at everyone she protected and everyone who protected her, and finally exhales. The Royal Phoenix, complete.`
      }
    });
    console.log('Updated: Addie as main character');
  }

  // Final counts
  const seriesCount = await prisma.bookSeries.count();
  const storylineCount = await prisma.storyline.count();

  console.log(`\n=== FINAL COUNTS ===`);
  console.log(`Total book series: ${seriesCount}`);
  console.log(`Total storylines: ${storylineCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
