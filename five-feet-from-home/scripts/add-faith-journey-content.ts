import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING FAITH JOURNEY CONTENT ===\n");

  // ============ CHARACTERS TO UPDATE WITH FAITH INFO ============
  const characterUpdates = [
    {
      name: "Addie",
      faithRoots: "Convert - Joins Catholic Church through RCIA",
      update: {
        faithRoots: `Convert - Joins Catholic Church through RCIA

SACRAMENTS:
- Baptized and confirmed at Easter Vigil
- Godmother to Grace
- Grace's Confirmation sponsor

FAITH JOURNEY:
- Always orbited faith through Wives Club traditions
- Galas with Catholic Orders (EOHSJ, Malta)
- Quiet prayers before major missions
- Grace's request was the moment of clarity

RCIA PROCESS:
- Throws herself into reading, history, and ritual
- POH library stocked with early Church Fathers and rare Catholic texts
- Sponsors: likely Elena and Jasper, or Bella and Matt

SYMBOLIC ROLE:
- Keeper of the "Silver Room" and sacred library
- Embodies spiritual heart of the group
- Weaves faith into Wives Club traditions (grounding presence, not preachy)
- Silver Room has special shelf: Grace's baptismal candle, rosaries, rare signed Catholic books`
      }
    },
    {
      name: "Hawk",
      update: {
        faithRoots: `Convert - Joins Catholic Church through RCIA

SACRAMENTS:
- Baptized and confirmed at Easter Vigil
- Godfather to Grace

FAITH JOURNEY:
- Takes quieter approach than Addie
- Sits in back of RCIA class at first
- Slowly finds peace in the prayers
- Relates to the structure and discipline
- His strategic mind now rooted in faith

ROLE:
- Quiet strength beside Addie and Grace
- Brings quiet reverence to the group`
      }
    },
    {
      name: "Kendra Donnelly",
      update: {
        faithRoots: `Cradle Catholic - Raised in the Church

BACKGROUND:
- Never walked away from faith even when not outwardly devout
- Goes to Mass when she can, especially around sacraments
- Not always consistent due to training, competitions, motherhood

ROLE IN CONVERSIONS:
- Quietly helps Addie and Hawk through RCIA
- Answers questions and explains traditions in down-to-earth way
- Bond with Grace through faith and training

SACRAMENTS:
- Baptism, First Communion, Confirmation
- Married in the Church (eventually)
- Raising children in the faith with Chris

CHARACTER:
- Anchors the group as "steady Catholic athlete" figure
- Faith lived out through resilience and discipline`
      }
    },
    {
      name: "Bella",
      update: {
        faithRoots: `Cradle Catholic - Rediscovering Faith

BACKGROUND:
- Raised Catholic but faith tested during grief and PTSD struggles
- Went through seasons of distance from Church
- Never fully abandoned it

PRESENT:
- Grace looking up to her pulls her back in
- Asked to be co-maid of honor, then sponsor
- Being around Addie, Kendra, Elena, and the Orders keeps pulling her deeper
- Arc is rediscovery, not conversion - she's coming home

SACRAMENTS:
- Baptized, First Communion, Confirmation earlier in life
- Growing into vocation as Catholic wife and mother (with Matt)

ROLE:
- Co-maid of honor for Kendra
- Surrogate older sister and "bonus mom" for Grace
- Bridge between old world and new
- Brings Mandy into Catholic spaces
- Shares Catholic traditions with Grace (Mass, feast days, family rosaries)`
      }
    },
    {
      name: "Mandy",
      update: {
        faithRoots: `Not Catholic - Protestant Background

BACKGROUND:
- Christian but not raised in Catholicism
- Encountered faith through POH women and bond with Bella

PRESENT:
- Deeply respectful and curious about Catholicism
- Attends Mass often with Bella
- Hasn't converted
- Represents "close to the circle but not fully in"

ROLE:
- Eventually recognizes Bella needs sacramental family life
- Part of why she steps aside romantically
- Remains beloved sister in Wives Club (Shieldmaidens)
- Embodies loyalty and love while staying close but not converting
- Keeps her role as Bella's "wild counterpart" intact`
      }
    },
    {
      name: "Matt",
      update: {
        faithRoots: `Convert - Protestant to Catholic

BACKGROUND:
- Culturally Christian, not deeply religious growing up
- Raised Protestant

CONVERSION:
- Open and interested in faith because of love for Bella
- Bond with Grace deepens his interest
- Man of principle who sees discipline and community of Catholic life
- Aligns with his sense of responsibility
- Begins RCIA around same time as Addie and Hawk

SACRAMENTS:
- Baptized as child
- Confirmed into Catholic Church before marriage

ROLE:
- Husband to Bella
- Stepfather to Grace
- Embraces Catholic family life as calling
- Embodies strength and servant leadership
- Represents masculine balance and Church's role in family life`
      }
    },
    {
      name: "Elena Barrett",
      update: {
        faithRoots: `Cradle Catholic - European Background

BACKGROUND:
- European background, culturally rooted in the Church
- More cultural/European Catholic expression

SACRAMENTS:
- Baptism, Confirmation
- Married in the Church

ROLE:
- Anchors the Owls (sorority-style leaders in Wives Club)
- Mentor to Bella
- Helps blend faith with elegance and tradition
- Keeps European and cultural Catholic heritage alive
- Bridges faith and society`
      }
    },
    {
      name: "Jasper Barrett",
      update: {
        faithRoots: `Not Catholic - Supportive

BACKGROUND:
- Baptized Christian, not Catholic

ROLE:
- Deeply respectful of Elena and group's faith life
- Allows home and resources for POH and Wives Club gatherings
- Supportive husband to Elena's Catholic practice`
      }
    },
    {
      name: "Ridge",
      update: {
        faithRoots: `Protestant Background

BACKGROUND:
- Baptized as a child, not Catholic

PRESENT:
- Tied to Shieldmaidens via his wife
- Supportive of faith traditions for their kids
- His wife leans Catholic
- Creating bridge for possible future conversion`
      }
    },
    {
      name: "Sara",
      update: {
        faithRoots: `Catholic by Upbringing

RELATION: Elena's sister

BACKGROUND:
- More culturally tied to faith
- Becomes more devout after motherhood

ROLE:
- CrossFit coach at Invictus
- Runs fitness ministry/community aspect
- Helps Addie and Bella with kids
- Supports POH activities`
      }
    }
  ];

  // ============ STORYLINES ============
  const storylines = [
    {
      title: "Addie & Hawk's Catholic Conversion",
      category: "Faith Journey",
      description: "How Addie and Hawk formally join the Catholic Church through RCIA",
      content: `THE CATALYST:
Grace is preparing for her Confirmation.
She asks Addie and Hawk to be not just godparents in spirit, but formally in the Church.
To do that, they must both be baptized and received into full communion with the Catholic faith.

THE DECISION:
Addie and Hawk have always orbited faith through:
- Wives Club traditions
- Galas with Catholic Orders
- Quiet prayers before major missions

Grace's request is the moment of clarity - they don't want to just "be around" faith, they want to belong for her sake.

THE JOURNEY (RCIA):
Addie:
- Throws herself into reading, history, and ritual
- POH library stocked with early Church Fathers and rare Catholic texts

Hawk:
- Takes quieter approach
- Sits in back of class at first
- Slowly finds peace in the prayers
- Relates to the structure and discipline

Their sponsors (likely Elena and Jasper, or Bella and Matt) walk with them through the process.

THE SACRAMENTS:
At the Easter Vigil Mass, both Addie and Hawk are baptized and confirmed.
Grace is in the front pew, beaming, because her "real" godparents now officially belong.

CONFIRMATION CONNECTION:
When it's Grace's turn, she asks Addie to be her sponsor.
Addie is floored - one of the greatest honors of her life.
Hawk serves as quiet strength beside them.

RIPPLE EFFECT:
Their conversion becomes a touchpoint for the rest of the group.
An anchor tradition for baptisms, confirmations, weddings.
Even Selene, who isn't particularly "into kids," is moved by how real and intentional they made their faith for Grace.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Grace', 'Elena Barrett', 'Jasper Barrett']),
      themes: JSON.stringify(['Faith', 'Conversion', 'RCIA', 'Godparents', 'Grace'])
    },
    {
      title: "Faith Map: Wives Club & Inner Circle",
      category: "Faith Journey / Reference",
      description: "Who is Catholic, convert, or orbiting the faith",
      content: `CONVERTS:
- Addie & Hawk: Join through RCIA, baptized at Easter Vigil
- Matt: Protestant to Catholic, RCIA before marrying Bella

CRADLE CATHOLICS:
- Kendra: Raised Catholic, not always devout but never left
- Bella: Raised Catholic, faith tested by grief/PTSD, rediscovering
- Elena: European background, culturally rooted in Church
- Sara: Elena's sister, becomes more devout after motherhood

NOT CATHOLIC BUT SUPPORTIVE:
- Jasper: Baptized Christian, deeply respectful, supportive of Elena
- Mandy: Protestant background, curious, attends Mass with Bella
- Ridge: Protestant background, wife leans Catholic

WIVES CLUB CIRCLES:
- Shieldmaidens: Wives of operators, Catholic or supportive spouses, mission/discipline-oriented
- Owls: Former sorority women (Bella, Camila, Rachel). Some cradle Catholics, some seekers
- Vestals: Elite society women (Elena, Order connections). Mostly Catholic, tied to tradition and Vatican

CHILDREN:
Grace, Luke, Emily, etc. become visible fruit of group's faith and family values.
Central to traditions like Sunday dinners, confirmations, and Catholic feast days.`,
      characters: JSON.stringify(['Addie', 'Hawk', 'Kendra', 'Bella', 'Elena Barrett', 'Jasper Barrett', 'Matt', 'Mandy', 'Sara', 'Ridge']),
      themes: JSON.stringify(['Faith', 'Catholic', 'Conversion', 'Reference'])
    },
    {
      title: "Grace's Sacramental Journey",
      category: "Faith Journey",
      description: "Grace's First Communion and Confirmation with Addie as sponsor",
      content: `FIRST COMMUNION:
Already special moment in Grace's faith journey.
Ties the inner circle together emotionally.

CONFIRMATION:
Grace asks Addie to be her Confirmation sponsor.
This request is the catalyst for Addie and Hawk's conversion.

THE REQUEST:
Grace wants them to be not just godparents in spirit, but formally in the Church.
Her request becomes the moment of clarity for Addie and Hawk.

THE CEREMONY:
Addie stands as sponsor beside Grace during Confirmation.
One of the greatest honors of Addie's life.
Hawk serves as quiet strength beside them.

SYMBOLISM:
Grace's innocent faith pulls the adults deeper into commitment.
Her sacraments become touchpoints for the whole group.`,
      characters: JSON.stringify(['Grace', 'Addie', 'Hawk', 'Elena Barrett']),
      themes: JSON.stringify(['Faith', 'Confirmation', 'Godparents', 'Sacraments'])
    },
    {
      title: "Bella's Faith Rediscovery",
      category: "Faith Journey",
      description: "Bella's return to the Catholic Church through relationships",
      content: `THE DISTANCE:
Bella was raised Catholic but her faith was tested.
Grief and PTSD during her struggles created seasons of distance from the Church.
But she never fully abandoned it.

THE PULL BACK:
Grace looking up to her as co-maid of honor and sponsor.
Being around Addie, Kendra, Elena, and the Orders (EOHSJ, Malta).
These relationships keep pulling her deeper.

THE REALIZATION:
Bella's arc is rediscovery, not conversion.
She's coming home, not starting over.
Understanding marriage more deeply as a vocation through Kendra's wedding prep.

ROLE IN THE CIRCLE:
- Bridge between her old world and new
- Brings Mandy into Catholic spaces
- Stands shoulder to shoulder with Kendra and Addie in faith formation
- Shares Catholic traditions with Grace (Mass, feast days, family rosaries)`,
      characters: JSON.stringify(['Bella', 'Grace', 'Addie', 'Kendra', 'Elena Barrett', 'Matt']),
      themes: JSON.stringify(['Faith', 'Rediscovery', 'Healing', 'Return'])
    },
    {
      title: "The Silver Room: Sacred Shelf",
      category: "POH / Faith",
      description: "Addie's Silver Room gains special faith-related items",
      content: `THE TRADITION:
Addie weaves her new faith into the traditions of the Wives Club.
Not in a preachy way, but as a grounding presence.

THE SILVER ROOM:
Her "Silver Room" of gifts now has one special shelf devoted to faith:

ITEMS ON THE SHELF:
- Grace's baptismal candle
- Rosaries from her godparents
- Rare signed Catholic books
- Early Church Fathers texts
- Other sacred mementos from sacramental moments

SYMBOLISM:
This shelf represents the intersection of POH traditions and genuine faith.
Physical reminders of spiritual commitments.
The tangible side of the group's invisible bonds.`,
      characters: JSON.stringify(['Addie', 'Grace']),
      themes: JSON.stringify(['POH', 'Faith', 'Silver Room', 'Tradition'])
    }
  ];

  // Update characters with faith info
  console.log("--- Updating Character Faith Info ---");
  for (const charUpdate of characterUpdates) {
    const existing = await prisma.character.findFirst({
      where: { name: charUpdate.name, projectId: project.id }
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: charUpdate.update
      });
      console.log(`Updated faith info: ${charUpdate.name}`);
    } else {
      console.log(`Character not found: ${charUpdate.name}`);
    }
  }

  // Add storylines
  console.log("\n--- Adding Faith Storylines ---");
  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  const storyCount = await prisma.storyline.count({ where: { projectId: project.id } });
  console.log(`\nTotal Storylines: ${storyCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
