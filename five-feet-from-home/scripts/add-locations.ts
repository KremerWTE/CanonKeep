import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Adding Key Locations ===\n");

  const locations = [
    {
      name: 'Oak Watch',
      significance: 'Residence / Compound',
      description: `Jasper and Elena Barrett's family compound in the Charlotte area.

DESCRIPTION:
- Main family residence
- Large property with gardens, patio areas
- Where the thank-you party is held at the end of Book 1
- Grace's home base

KEY SCENES:
- Elena's recovery after hospitalization
- Family dinners and reconnection moments
- The thank-you party (Book 1 finale)
- Multiple POV chapters set here

CHARACTER ASSOCIATIONS:
Jasper, Elena, Grace, Sara (Elena's sister who helps with childcare)`
    },
    {
      name: 'The Forge (BSS HQ)',
      significance: 'Office / Headquarters',
      description: `Barrett Strategic Solutions headquarters in Charlotte, NC.

DESCRIPTION:
- The founding location of BSS
- War rooms, executive offices, operator briefing rooms
- Where Jasper built his crisis management empire

WHY CHARLOTTE:
From documents: "Charlotte is a financial hub but not oversaturated like NYC. Jasper quietly builds his first network with hedge funds, private equity shops, and Southern family offices."

KEY FEATURES:
- War room with screens and whiteboards
- Jasper's corner office
- Team briefing areas
- Secure communications

KEY SCENES:
- Multiple crisis coordination scenes
- Harper's COO work
- Team meetings with Addie, Hawk, Kendra`
    },
    {
      name: 'Addie and Hawk\'s Ranch Compound',
      significance: 'Residence / Ranch',
      description: `Addie and Hawk's property - a working ranch that also serves as a gathering place.

DESCRIPTION:
- Ranch-style compound
- POH events sometimes hosted here
- Barn used for family gatherings (Christmas play scene)

KEY SCENES (from documents):
- Christmas Eve barn play: "The barn smelled of hay and cinnamon... Grace wore a cape made from a plaid scarf and a crown cut from gold poster board."
- "Jasper stared at the new wing of the compound. Floor-to-ceiling glass, oak desks, a war-room-style screen against one wall." (Office at compound scene)
- Parallel Cradles scene: Elena and Kendra with newborns

CHARACTER ASSOCIATIONS:
Addie, Hawk, their children, visiting BSS family members`
    },
    {
      name: 'Kendra and Chris\'s Home',
      significance: 'Residence',
      description: `Kendra and Chris's home in the Charlotte area.

Part of the inner circle of BSS families. Close enough for regular gatherings with the Barretts and other families.

KEY SCENES:
- Parallel Cradles scene with Elena
- CrossFit training coordination
- Family dinners`
    },
    {
      name: 'Bella and Matt\'s Home',
      significance: 'Residence',
      description: `Bella and Matt's residence.

Bella serves as the kids' "fun aunt" - horseback rides, ice cream trips, secret late-night movies. Their home is part of the extended family network.`
    },
    {
      name: 'Harper\'s Miami Residence',
      significance: 'Residence',
      description: `Harper's home base in Miami when she's not traveling for BSS.

Harper serves as COO and frequently travels between Miami, Charlotte (The Forge), and international locations. Her Miami residence is her personal anchor.

KEY SCENES:
- Miami evacuation storyline
- Personal moments between crisis work`
    },
    {
      name: 'BSS DC Lab',
      significance: 'Regional Office',
      description: `BSS Washington DC regional office.

ROLE:
- Defense contracting and lobbying scandal cases
- Foreign-agent registration cases
- Hawk's Tier 1 background feeds into DC contracts
- Government liaison work

From documents: "Leveraging military/intel ties, BSS builds influence in defense contracting, lobbying scandals, and foreign-agent registration cases."`
    },
    {
      name: 'BSS NYC Lab',
      significance: 'Regional Office',
      description: `BSS New York City regional office.

ROLE:
- Wall Street crisis management
- Media/network crises (anchors, networks, hedge funds)
- International visibility hub

From documents: "After CLT success, Jasper is pulled into Wall Street and media crises. NYC becomes the second hub, giving him international visibility."`
    },
    {
      name: 'BSS London Lab',
      significance: 'Regional Office',
      description: `BSS London regional office - the first international hub.

ROLE:
- Transatlantic financial clients
- Catholic/royalty networks (through Harper's European connections)
- Elena's society links
- Vatican-adjacent cases

From documents: "With transatlantic financial clients and Catholic/royalty networks, London becomes the natural first international hub."

KEY CASES:
- European bank + Vatican-adjacent scandal`
    },
    {
      name: 'BSS Singapore Hub',
      significance: 'Regional Office',
      description: `BSS Singapore - the Asia command hub.

ROLE:
- Future of finance + tech influence
- Neutral territory with wealth concentration
- Addie and Hawk become lead operators for Asia cases

From documents: "Singapore becomes the command hub due to its neutrality and wealth concentration."

KEY CASES:
- Sovereign wealth fund scandal
- Shipping lane/cyber theft incident`
    },
    {
      name: 'Maison Aurelia',
      significance: 'Business / Event Venue',
      description: `Elena's business - global event and lifestyle management firm.

Named after a significant figure in Elena's life. Represents her own professional identity separate from Jasper's BSS world.

ROLE:
- Event planning and management
- Lifestyle consulting
- Elena's professional return after medical recovery

From documents: "Elena's Return: Maision Aurelia becomes global event and lifestyle management firm."`
    },
    {
      name: 'Sara\'s Gym',
      significance: 'Business',
      description: `Gym owned/operated by Sara (Elena's sister).

Part of the Charlotte community. CrossFit connections with Kendra and the BSS fitness culture.`
    },
    {
      name: 'The Cabin',
      significance: 'Retreat Property',
      description: `A retreat cabin used by the extended BSS family circle.

KEY SCENES:
- Addie and Kendra scenes before the cabin weekend
- Group retreats and intimate gatherings away from the city

From Arc outline: "Arc 2 – The Cabin Weekend"`
    }
  ];

  for (const loc of locations) {
    const existing = await prisma.location.findFirst({
      where: { projectId: project.id, name: loc.name }
    });

    if (!existing) {
      await prisma.location.create({
        data: {
          projectId: project.id,
          ...loc
        }
      });
      console.log(`Created: ${loc.name}`);
    } else {
      await prisma.location.update({
        where: { id: existing.id },
        data: loc
      });
      console.log(`Updated: ${loc.name}`);
    }
  }

  const count = await prisma.location.count({ where: { projectId: project.id } });
  console.log(`\nTotal locations: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
