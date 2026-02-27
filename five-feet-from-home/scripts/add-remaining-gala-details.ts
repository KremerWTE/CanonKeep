import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Remaining galas that need details
const galaUpdates: { name: string, updates: any }[] = [
  {
    name: "Vatican-linked Fundraisers",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Cardinal Dolan", "Cardinal Burke",
        "Addie Price-Hawkins", "Hawk", "Chris Donnelly", "Kendra Donnelly",
        "Vatican officials", "European Catholic nobility", "American EOHSJ members"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": "Elegant black lace Maria Grazia Chiuri for Dior gown with modest neckline and three-quarter sleeves - Vatican-appropriate. Heirloom rosary as a bracelet, small diamond cross.",
        "Jasper Barrett": "Dark charcoal Brioni suit, papal audience-appropriate. Simple cross pin on lapel.",
        "Addie Price-Hawkins": "Navy Valentino column gown, mantilla for chapel portions. Her transformation visible - from survival to sanctity.",
        "Hawk": "Dark suit, understated. His faith journey reflected in his quiet reverence.",
        "Kendra Donnelly": "Modest sage green Tadashi Shoji gown, hair covered for chapel. Cross necklace her grandmother gave her.",
        "Chris Donnelly": "Navy suit, rosary beads visible in pocket. The Catholic PE world meets Vatican elite."
      }),
      venue: "Vatican City - Various venues",
      purpose: "Faith-based charitable fundraising",
      beforeActivities: "Private Mass at dawn in the Vatican gardens. Breakfast with Vatican officials discussing charitable initiatives.",
      events: "Formal reception in the Vatican Museums after hours. Private viewing of sacred art. Speeches about faith and philanthropy. Significant pledges for Holy Land charitable works.",
      afterActivities: "Intimate dinner at a private Vatican restaurant. Discussions of faith, family, and service continuing late into the evening.",
      nextMorning: "Early Mass at St. Peter's before flights home. Renewed sense of purpose and faith."
    }
  },
  {
    name: "Easter Vigil Mass",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Grace Barrett", "Lucas Barrett",
        "Addie Price-Hawkins", "Hawk", "Chris Donnelly", "Kendra Donnelly",
        "Sara Davenport", "Connor Davenport", "All BSS families",
        "Father Michael O'Brien"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": "White silk blouse, pastel skirt, Easter hat with delicate flowers. Grace in matching pastels.",
        "Jasper Barrett": "Light gray suit with lavender tie - Easter colors for the resurrection celebration.",
        "Grace Barrett": "New Easter dress - pale yellow with white flowers, white patent shoes, matching headband.",
        "Addie Price-Hawkins": "Cream colored suit, simple gold jewelry. New life symbolized in her outfit.",
        "Hawk": "Navy suit, pale blue tie. His RCIA journey culminating in this celebration.",
        "Kendra Donnelly": "Soft pink dress, flower crown for the celebration. Radiant with Easter joy.",
        "Chris Donnelly": "Tan suit, Easter lily boutonniere. Leading the family in celebration."
      }),
      venue: "St. Gabriel's Catholic Church, Charlotte",
      purpose: "Easter Vigil - Celebration of the Resurrection",
      beforeActivities: "Good Friday fish fry at the Barrett compound. Holy Saturday preparations - coloring eggs with the children, preparing Easter baskets. Afternoon rest before the long vigil service.",
      events: "The sacred Easter Vigil - lighting of the new fire, blessing of the Easter candle, readings from creation to resurrection. New members received into the church (including Hawk's full reception). First Eucharist of Easter. The Alleluia returning after Lenten silence. Grace carrying her candle carefully.",
      afterActivities: "Late night celebration meal back at the compound. Hawk emotional after his first Easter as a full Catholic. Children fighting sleep to see the Easter bunny's work. The adults lingering over wine and gratitude.",
      nextMorning: "Easter Sunday brunch. Children hunting for eggs. Facetime with extended family. Elena's famous ham. Hawk giving Grace a special Easter rosary."
    }
  },
  {
    name: "Grace's First Communion",
    updates: {
      attendees: JSON.stringify([
        "Grace Barrett", "Elena Barrett", "Jasper Barrett", "Lucas Barrett",
        "Addie Price-Hawkins", "Hawk", "Kendra Donnelly", "Chris Donnelly",
        "Sara Davenport", "Margaret Davenport", "Father Michael O'Brien",
        "Grace's godparents", "Grace's classmates"
      ]),
      clothingDescriptions: JSON.stringify({
        "Grace Barrett": "Traditional white First Communion dress with full skirt, delicate lace veil, white gloves, pearl bracelet gift from Addie. Her grandmother's small gold cross. Pure and precious.",
        "Elena Barrett": "Soft blue Oscar de la Renta dress, matching hat, grandmother's pearl earrings. Tears ready before the ceremony begins.",
        "Jasper Barrett": "Light gray suit, blue tie to match Elena. Camera ready to capture every moment.",
        "Addie Price-Hawkins": "Champagne Chanel suit as godmother. Special First Communion gift in her purse - a leather-bound missal with Grace's name embossed.",
        "Hawk": "Dark suit, proud godfather stance. Remembering his own recent entry into the faith.",
        "Kendra Donnelly": "Blush pink dress, serving as Grace's 'communion coach' having prepared her.",
        "Margaret Davenport": "Classic grandmother elegance in navy, dabbing eyes throughout."
      }),
      venue: "St. Gabriel's Catholic Church, Charlotte",
      purpose: "First Holy Communion celebration",
      beforeActivities: "Morning prayer with Kendra helping Grace prepare her heart. Elena doing Grace's hair, weaving in baby's breath. Photo session at the compound before church.",
      events: "Processional of First Communion children. Grace nervous but determined. Father Michael's gentle homily about welcoming Jesus. The moment Grace receives - Elena crying, Jasper recording, Addie squeezing Hawk's hand. Grace's face of wonder.",
      afterActivities: "Celebration luncheon at Maison Aurelia - Elena's charity venue transformed for her daughter. Grace opening gifts - rosaries, missals, cross jewelry. Cake shaped like a Bible. Grace giving her first real testimony about what this means to her.",
      nextMorning: "Quiet family breakfast. Grace insisting on going to Mass again. Elena and Jasper marveling at their little girl's faith journey."
    }
  },
  {
    name: "Grace's Confirmation",
    updates: {
      attendees: JSON.stringify([
        "Grace Barrett", "Elena Barrett", "Jasper Barrett", "Lucas Barrett",
        "Addie Price-Hawkins", "Hawk", "Bishop Robert Barron", "Father Michael O'Brien",
        "Kendra Donnelly", "Chris Donnelly", "Sara Davenport", "Margaret Davenport",
        "Grace's confirmation class", "Extended family"
      ]),
      clothingDescriptions: JSON.stringify({
        "Grace Barrett": "Elegant red dress - the color of the Holy Spirit's fire. Modest but mature. Confirmation name: 'Teresa' after Mother Teresa. Gold dove pendant gift from Elena.",
        "Elena Barrett": "Deep burgundy Valentino suit echoing Grace's red. Emotional but composed.",
        "Jasper Barrett": "Dark suit with burgundy pocket square. His little girl becoming a woman of faith.",
        "Addie Price-Hawkins": "As confirmation sponsor, wearing elegant red Escada suit to match Grace. Her gift: a pilgrimage trip to Calcutta together.",
        "Hawk": "Dark suit, red tie. Proud of Grace's journey that mirrors his own.",
        "Bishop Barron": "Full episcopal vestments for the sacrament.",
        "Kendra Donnelly": "Coral dress, having helped Grace write her confirmation essay."
      }),
      venue: "St. Gabriel's Catholic Church, Charlotte",
      purpose: "Sacrament of Confirmation",
      beforeActivities: "Morning retreat with Addie - discussing what confirmation means, what service looks like. Grace journaling her intentions. Final confession before the sacrament.",
      events: "Solemn Mass with Bishop Barron presiding. Grace's confirmation class renewing their baptismal promises. The laying on of hands, the chrism oil, 'Be sealed with the gift of the Holy Spirit.' Grace choosing Addie as her sponsor - a public acknowledgment of their bond. Grace's confirmation essay read aloud - bringing tears to everyone.",
      afterActivities: "Celebration dinner at the Barrett compound. Grace giving a speech thanking her sponsors and family. Addie's gift reveal - the pilgrimage trip bringing Grace to happy tears. Fire pit gathering, adults sharing their own confirmation memories.",
      nextMorning: "Grace at Mass with new adult purpose. Discussion of her service project - working with Addie on a youth mentorship program. Elena marveling at who Grace is becoming."
    }
  },
  {
    name: "Bella & Matt Wedding",
    updates: {
      attendees: JSON.stringify([
        "Bella Mitchell", "Matt Mitchell", "Addie Price-Hawkins", "Hawk",
        "Elena Barrett", "Jasper Barrett", "Harper Montgomery", "Daniel Marchand",
        "Kendra Donnelly", "Chris Donnelly", "Sara Davenport", "Connor Davenport",
        "Lottie Chen", "Grace Barrett (flower girl)", "Lucas Barrett (ring bearer)",
        "Mandy (ranch owner)", "All BSS family", "Bella's recovered family members"
      ]),
      clothingDescriptions: JSON.stringify({
        "Bella Mitchell": "Custom Vera Wang gown - simple, elegant, nothing like the over-the-top dress her past self would have chosen. Addie's vintage veil, borrowed. Small yellow wildflowers in her bouquet. Transformation made visible.",
        "Matt Mitchell": "Classic navy suit, boots appropriate for the barn venue. Wildflower boutonniere matching Bella's bouquet. Tears already before she appears.",
        "Addie Price-Hawkins": "As matron of honor, wearing champagne silk dress that complements without competing. Her gift: the down payment on their first home.",
        "Hawk": "Best man, dark suit with wildflower boutonniere. His speech will make everyone cry.",
        "Elena Barrett": "Soft lavender Oscar de la Renta, matching fascinator. Already emotional.",
        "Grace Barrett": "White flower girl dress, basket of wildflowers. Taking her role very seriously.",
        "Lucas Barrett": "Tiny suit matching Jasper's, pillow with rings. Trying not to wiggle.",
        "Kendra Donnelly": "Bridesmaid in soft yellow - Bella wanted color, wanted joy.",
        "Lottie Chen": "Bridesmaid coordinator, wearing blush with her signature vintage jewelry. The seating chart is her masterpiece."
      }),
      venue: "Mandy's Ranch, Blue Ridge Mountains",
      purpose: "Wedding celebration",
      dresscode: "Elegant rustic - boots encouraged",
      beforeActivities: "Morning yoga with the bridal party, led by Sara. Bella writing her vows with Addie's help. Hair and makeup in the farmhouse. Champagne toasts. Hawk's prayer with Matt and the groomsmen. Grace practicing her petal throwing.",
      events: "Sunset ceremony in the barn, doors open to the mountain view. Hawk walking Bella down the aisle - 'You're not giving her away. You're walking her toward her future.' Vows that reference the journey from broken to beautiful. First kiss as the sun sets. Reception under string lights. First dance to 'The Way You Look Tonight.' Father-daughter dance with Hawk (not her biological father, but her real one). Addie's toast: 'From the red dress to the white.'",
      afterActivities: "S'mores by the firepit. Dancing until midnight. Sparkler send-off to the honeymoon cabin on the property.",
      nextMorning: "Breakfast for overnight guests at the ranch. Bella and Matt emerging, married, glowing. Plans for their new life together."
    }
  },
  {
    name: "Palace of Honor Galas",
    updates: {
      attendees: JSON.stringify([
        "Addie Price-Hawkins (Patroness)", "Elena Barrett", "All POH members",
        "Selected guests and honorees", "Charitable recipients", "Hawk"
      ]),
      clothingDescriptions: JSON.stringify({
        "Addie Price-Hawkins": "As Patroness, always in signature elegant neutrals - cream, champagne, white. Statement jewelry. The Patroness pin prominently displayed.",
        "Elena Barrett": "As senior member, coordinating colors with the evening's theme. POH pin on display.",
        "POH Members": "Dress code strictly elegant - this is an organization of refinement and purpose. Each member's style reflecting their personality while meeting the standard."
      }),
      venue: "The Palazzo (Addie's Estate) and rotating venues",
      purpose: "Various POH charitable initiatives",
      beforeActivities: "Private member rituals and briefings. Addie reviewing the evening's charitable asks. Coordinating with beneficiaries who will speak.",
      events: "Formal reception showcasing charitable accomplishments. Member presentations. Significant fundraising. Networking among women of influence. The evening always includes a moment of purpose - remembering why they do this.",
      afterActivities: "Inner circle debrief. Planning next initiatives. Mentoring newer members.",
      nextMorning: "Follow-up calls to major donors. Planning implementation of raised funds."
    }
  }
];

async function main() {
  console.log('Adding details to remaining galas...\n');

  for (const { name, updates } of galaUpdates) {
    const gala = await prisma.gala.findFirst({
      where: { name: { contains: name.split(' - ')[0].trim() } }
    });

    if (gala) {
      await prisma.gala.update({
        where: { id: gala.id },
        data: updates
      });
      console.log(`✅ Updated: ${name}`);
    } else {
      // Create new gala if it doesn't exist
      const project = await prisma.project.findFirst();
      if (project) {
        await prisma.gala.create({
          data: {
            projectId: project.id,
            name: name,
            ...updates
          }
        });
        console.log(`✨ Created: ${name}`);
      }
    }
  }

  // Final count
  const allGalas = await prisma.gala.findMany();
  console.log(`\n✅ Total galas in database: ${allGalas.length}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
