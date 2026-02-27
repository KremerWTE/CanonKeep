import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Core character outfit descriptions
const characterOutfits: Record<string, Record<string, string>> = {
  formal: {
    "Elena Barrett": "A stunning custom emerald Valentino gown with a sweetheart neckline and cathedral train. Harry Winston diamond and emerald drop earrings, matching tennis bracelet. Hair swept into an elegant chignon with face-framing tendrils. Charlotte Tilbury makeup with her signature red lip.",
    "Jasper Barrett": "Impeccably tailored Tom Ford midnight navy tuxedo with peak lapels, ivory silk pocket square, vintage Cartier cufflinks passed down from his grandfather. Brunello Cucinelli black patent leather oxfords.",
    "Addie Price-Hawkins": "Oscar de la Renta champagne silk ballgown with intricate beading at the bodice, a dramatic low back, and flowing skirt. Bulgari Serpenti diamond necklace, her signature piece. Hair in Hollywood waves cascading over one shoulder.",
    "Derek 'Hawk' Hawkins": "Classic black Brioni tuxedo, crisp white shirt, black silk bow tie. Discreet Omega Seamaster watch. He lets Addie be the spotlight; his role is quiet elegance beside her.",
    "Harper Montgomery": "Architectural Carolina Herrera black column gown with dramatic sleeves and hidden pockets. Statement gold Tiffany cuff and simple diamond studs. Power dressing meets gala elegance. Hair slicked back in a severe low bun.",
    "Kendra Donnelly": "Ethereal Monique Lhuillier blush tulle gown with delicate floral applique, modest neckline that still manages to be showstopping. Simple David Yurman pearl earrings, a nod to her faith and femininity. Hair in soft curls.",
    "Chris Donnelly": "Navy Ralph Lauren Purple Label tuxedo with subtle texture, champagne tie to complement Kendra. Cross cufflinks, a wedding gift from his godfather.",
    "Bella Mitchell-Hawkins": "Striking red Zac Posen fit-and-flare gown that commands attention without trying. Vintage art deco diamond earrings borrowed from Addie. Hair in a sleek ponytail, making a statement of confident femininity.",
    "Sara Davenport": "Athletic elegance in a fitted Roland Mouret navy sheath with strategic cutouts showing toned arms. Minimal jewelry - just her wedding band and small diamond studs. Hair in a practical but glamorous French twist.",
    "Selene Thorne": "Dangerously beautiful in a slinky black Versace gown with thigh-high slit and plunging neckline. Sapphire and diamond chandelier earrings. Hair loose and wild, smoky eyes. She knows exactly what effect she creates.",
    "Lottie Chen": "Vintage-inspired Marchesa tea-length gown in dusty rose with intricate lace overlay. Statement vintage brooch at the waist. Hair in victory rolls, red lipstick. Reclaiming elegance on her own terms."
  },
  casual: {
    "Elena Barrett": "Brunello Cucinelli cashmere sweater in dove gray, perfectly fitted dark jeans, Hermes belt, simple gold hoops. Ballet flats. Weekend elegance that still photographs beautifully.",
    "Jasper Barrett": "Loro Piana button-down, sleeves rolled to elbows, well-worn jeans, brown leather loafers. Relaxed but never sloppy.",
    "Addie Price-Hawkins": "Fitted white blouse, high-waisted camel trousers, nude Louboutin pumps. Hair in a casual ponytail. Even dressed down, she looks like money.",
    "Kendra Donnelly": "Lululemon athletic wear - fitted tank and leggings that show off her CrossFit physique. Hair in a high ponytail, minimal makeup, cross necklace always visible.",
    "Harper Montgomery": "Theory blazer over a silk tee, tailored pants, pointed-toe flats. Ready for any meeting that might arise even on a Saturday."
  },
  compound: {
    "Elena Barrett": "Soft cashmere joggers, Jasper's old college sweatshirt, bare feet. Hair in a messy bun. This is the Elena only family sees.",
    "Jasper Barrett": "Faded BSS t-shirt from the early days, comfortable jeans, flip flops. Guard down completely.",
    "Addie Price-Hawkins": "Silk pajama set in blush pink, matching robe. Even her loungewear is luxury.",
    "Hawk": "Simple henley, cargo shorts, barefoot. The warrior at rest.",
    "Kendra Donnelly": "CrossFit shorts and a tank from Sara's gym, hair braided back, face free of makeup."
  }
};

// Detailed gala data to update
const galaUpdates: { name: string, updates: any }[] = [
  {
    name: "EOHSJ Annual Investiture",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Addie Price-Hawkins", "Derek 'Hawk' Hawkins",
        "Cardinal Timothy Dolan", "Bishop Robert Barron", "Chris Donnelly", "Kendra Donnelly",
        "Grace Barrett", "Lucas Barrett", "Margaret Davenport", "Father Michael O'Brien",
        "Ambassador James Worthington", "Duchess of Kent representative"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": "White silk gown befitting the ceremony's solemnity, paired with the EOHSJ dame's regalia - black mantle with the Jerusalem cross. Diamond cross pendant, gift from the Order. Hair in a modest chignon.",
        "Jasper Barrett": "Dark suit appropriate for the ceremony, wearing the knight's mantle with pride. His grandfather's cross cufflinks.",
        "Addie Price-Hawkins": "Elegant cream column gown that complements the ceremony's gravitas. Pearl earrings, simple gold cross. Her transformation from her past to this moment is the real outfit.",
        "Hawk": "Dark suit, understated tie. His cross pin is the only jewelry. The warrior serving a higher purpose.",
        "Kendra Donnelly": "Soft white dress with modest neckline, crystal cross earrings. Hair in soft waves. Radiating the faith that defines her.",
        "Chris Donnelly": "Dark suit with subtle cross pin. Wedding ring gleaming. The faith-filled husband.",
        "Grace Barrett": "White dress with delicate lace overlay, small pearl earrings - her first 'big girl' jewelry. Hair in soft curls with a white ribbon."
      }),
      beforeActivities: "Morning Mass at the cathedral, private breakfast with Cardinal Dolan. The knights and dames gather in the vestry for final preparations. Photographers capture the families arriving.",
      events: "Solemn processional into St. Patrick's Cathedral, the investiture ceremony with ancient Latin prayers, the laying on of hands, presentation of mantles and regalia. Reception following in the cathedral's great hall - champagne toasts, networking among the faithful elite, discussions of Holy Land charitable works. Elena tearfully accepting her grandmother's blessing.",
      afterActivities: "Private dinner at the Cardinal's residence for the newly invested and their families. Jasper gives a moving speech about faith, family, and service. Grace falls asleep on Addie's lap.",
      nextMorning: "Breakfast at the Barretts' Manhattan townhouse. Elena and Addie discussing plans for their first official EOHSJ project together. Grace wearing her new cross necklace proudly."
    }
  },
  {
    name: "Charlotte Opera Opening Night",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Harper Montgomery", "Daniel Marchand",
        "Addie Price-Hawkins", "Hawk", "Sara Davenport", "Connor Davenport",
        "Mayor Patricia Williams", "Charlotte Symphony Director Hans Mueller",
        "Bank of America CEO Brian Moynihan", "Bella Mitchell-Hawkins", "Matt Mitchell"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": characterOutfits.formal["Elena Barrett"],
        "Jasper Barrett": characterOutfits.formal["Jasper Barrett"],
        "Harper Montgomery": characterOutfits.formal["Harper Montgomery"],
        "Addie Price-Hawkins": characterOutfits.formal["Addie Price-Hawkins"],
        "Hawk": characterOutfits.formal["Derek 'Hawk' Hawkins"],
        "Bella Mitchell-Hawkins": characterOutfits.formal["Bella Mitchell-Hawkins"],
        "Sara Davenport": characterOutfits.formal["Sara Davenport"],
        "Daniel Marchand": "Bespoke Savile Row tuxedo in midnight blue, silk bow tie, subtle cufflinks bearing his family crest. European elegance meets American occasion."
      }),
      beforeActivities: "Pre-opera cocktails at the Barrett compound. Harper reviewing the evening's networking targets with Jasper. Elena helping Grace pick out a special dress for the after-party she'll attend briefly. Kendra and Chris arriving early for prayer before the festivities.",
      events: "Grand entrance on the red carpet - photographers shouting names. Champagne in the Founders' Lounge. La Traviata bringing tears to Elena's eyes while Jasper holds her hand. Intermission networking: Jasper securing a new client, Harper smoothing over a business rival, Addie charming the mayor. Standing ovation at the finale.",
      afterActivities: "After-party at the Mint Museum. Jazz quartet, flowing champagne, oysters and caviar. Addie pulling Bella aside for a heart-to-heart about worthiness. Harper intercepting a reporter getting too close to a BSS client. Jasper and Elena stealing a dance in a quiet corner.",
      nextMorning: "Lazy brunch at the compound. Sara leading an optional morning workout that only Kendra and Bella attend. Elena making pancakes for the kids. Jasper reading the reviews - BSS mentioned favorably in the society pages."
    }
  },
  {
    name: "Annual Wives Club Christmas Gala",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Addie Price-Hawkins", "Hawk",
        "Kendra Donnelly", "Chris Donnelly", "Sara Davenport", "Connor Davenport",
        "Harper Montgomery", "Daniel Marchand", "Bella Mitchell-Hawkins", "Matt Mitchell",
        "Lottie Chen", "Grace Barrett", "Lucas Barrett", "Harper's children",
        "All Wives Club members and spouses"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": "Custom red velvet Marchesa gown with subtle gold embroidery, her grandmother's ruby and diamond brooch. Hair in elegant waves with a festive gold ribbon woven through.",
        "Jasper Barrett": "Dark green velvet dinner jacket over black trousers, gold silk pocket square matching Elena's accents. Looking like Christmas incarnate.",
        "Addie Price-Hawkins": "Ivory silk gown with dramatic cape sleeves, diamond snowflake brooch. Playing the winter queen perfectly.",
        "Hawk": "Classic black tuxedo with a deep red tie - letting Addie shine while standing proudly beside her.",
        "Kendra Donnelly": "Forest green Tadashi Shoji gown with modest neckline and flowing skirt. Her baby bump just starting to show - she's glowing.",
        "Chris Donnelly": "Navy suit with Christmas tartan tie that Kendra picked out. Hand on her back protectively all evening.",
        "Bella Mitchell-Hawkins": "Champagne sequined midi dress that catches the candlelight. Vintage earrings. Looking confident in her Wives Club membership.",
        "Lottie Chen": "Bold red jumpsuit with dramatic wide legs - unconventional but perfectly her. Statement gold belt. Refusing to be invisible.",
        "Grace Barrett": "Emerald green velvet dress with white Peter Pan collar, patent leather Mary Janes. Allowed to stay up late for the children's portion of the evening."
      }),
      beforeActivities: "Wives Club members gathering at the Palazzo for final preparations. Lottie reviewing the seating chart one more time. Elena and Addie doing a final walk-through of the decorations - all white roses and gold accents. Children's cookie decorating in the kitchen while adults prepare.",
      events: "Carol singing led by the Charlotte Children's Choir. Secret Santa exchange among the Wives Club - thoughtful, personal gifts. Addie's speech about gratitude and sisterhood bringing tears. Dancing to a live orchestra. Grace and the children performing a rehearsed Christmas skit. Jasper's toast to the women who make BSS families strong. Midnight Mass livestreamed in a quiet room for those who wish to attend virtually.",
      afterActivities: "Children to bed in guest rooms. Adults gather around the fire pit. Hawk telling stories. Hot cocoa with peppermint schnapps. Elena falling asleep on Jasper's shoulder. The core group - Elena, Addie, Kendra, Sara, Harper, Bella - having a moment of real connection.",
      nextMorning: "Christmas Eve morning. Breakfast casserole and fresh pastries. Children opening small gifts from their 'aunts.' Planning Christmas Day logistics. The feeling of extended family that BSS has created."
    }
  },
  {
    name: "Kennedy Foundation Gala",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Harper Montgomery", "Daniel Marchand",
        "Addie Price-Hawkins", "Hawk", "Bella Mitchell-Hawkins", "Matt Mitchell",
        "Senator Sarah Mitchell", "Senator Elizabeth Warren", "Caroline Kennedy",
        "Former President Obama", "Fortune 500 CEOs", "Kennedy family members"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": "Stunning blue Carolina Herrera gown - a nod to the Kennedy legacy. Jackie-inspired elegance with modern edge. Sapphire earrings that match the gown perfectly.",
        "Jasper Barrett": "Classic Tom Ford black tuxedo. American elegance for an American institution.",
        "Addie Price-Hawkins": "White column gown with subtle silver threading - Camelot meets modern power. The outfit that made her notice Bella across the room.",
        "Bella Mitchell-Hawkins": "The dress that changed everything - a bold red Badgley Mischka that Addie spotted from across the room. Before she was Bella Hawkins, before she was anyone. Just a girl in a borrowed dress dreaming of more.",
        "Harper Montgomery": "Black Stella McCartney suit with silk lapels - breaking the gown convention while still commanding respect.",
        "Caroline Kennedy": "Simple navy sheath that lets her legacy speak louder than fashion."
      }),
      beforeActivities: "Private cocktails at the Kennedy Compound for major donors. Jasper in quiet conversation with senior political figures. Elena networking with Caroline Kennedy about shared charitable interests. Addie across the room, not yet meeting Bella's eyes.",
      events: "Grand entrance at the Kennedy Library. Speeches about service and legacy. Auction raising millions for educational initiatives. Addie spotting Bella - the red dress, the nervous energy, the potential. Making mental notes. Dancing with various dignitaries. Jasper declining three presidential requests to discuss running for office.",
      afterActivities: "After-party on a yacht in Boston Harbor. Addie finding a moment to introduce herself to Bella - 'I noticed you across the room. That takes courage.' The beginning of everything. Harper securing two new clients. Jasper and Elena slipping away early for a moonlit walk.",
      nextMorning: "Flight back to Charlotte. Addie already making calls about 'that girl in the red dress.' Elena reviewing thank you notes to write. The ripples of one evening spreading outward."
    }
  },
  {
    name: "Spring Garden Gala",
    updates: {
      attendees: JSON.stringify([
        "Elena Barrett", "Jasper Barrett", "Addie Price-Hawkins", "Hawk",
        "Kendra Donnelly", "Chris Donnelly", "Sara Davenport", "Connor Davenport",
        "Harper Montgomery", "Daniel Marchand", "Bella Mitchell-Hawkins", "Matt Mitchell",
        "Charlotte Garden Club members", "Local philanthropists", "Grace Barrett", "Lucas Barrett"
      ]),
      clothingDescriptions: JSON.stringify({
        "Elena Barrett": "Flowing floral Oscar de la Renta midi dress in soft pastels, wide-brimmed hat, nude Valentino heels. Garden party perfection.",
        "Jasper Barrett": "Light blue linen blazer, white shirt open at collar, tan chinos, suede loafers. Relaxed spring elegance.",
        "Addie Price-Hawkins": "Yellow Zimmermann sundress with delicate eyelet details, statement sunglasses, straw clutch. Sunshine personified.",
        "Hawk": "Light gray blazer, crisp white shirt, navy chinos. Comfortable in the softer setting.",
        "Kendra Donnelly": "Mint green fit-and-flare dress that shows off her post-baby figure, simple sandals, hair in beachy waves. Fresh and feminine.",
        "Chris Donnelly": "Pastel polo, khakis, boat shoes. Every inch the Catholic PE golden boy.",
        "Sara Davenport": "Athletic-chic Tory Burch shift dress in coral, comfortable flats. Ready to wrangle nieces and nephews.",
        "Bella Mitchell-Hawkins": "Vintage-inspired midi skirt with fitted top, kitten heels. Finding her personal style.",
        "Grace Barrett": "Sweet floral dress with matching hair ribbon, white sandals. Learning to be a little lady."
      }),
      beforeActivities: "Morning yoga on the lawn led by Sara. Children helping Elena arrange flowers for the centerpieces. Kendra and Chris at early Mass before joining the festivities. Lottie triple-checking the tent stakes.",
      events: "Garden tour led by Elena showcasing her charitable community gardens. Live acoustic music. Children's egg hunt in the maze garden. Wine tasting from local Carolina vineyards. Silent auction for gardening experiences and landscaping packages. Jasper's surprise announcement of a major donation to urban gardening programs.",
      afterActivities: "Croquet on the lawn - Harper surprisingly competitive. Picnic dinner as the sun sets. Fireflies beginning to dance. Grace and Lucas catching them in jars with supervision from Hawk. The adults lingering over wine as the children tire.",
      nextMorning: "Leisurely breakfast on the veranda. Planning the summer's community garden expansion. Elena and Kendra discussing a faith-based nutrition program for underserved communities."
    }
  },
  {
    name: "Palace of Honor Annual Charity Ball",
    updates: {
      attendees: JSON.stringify([
        "Addie Price-Hawkins", "Hawk", "Elena Barrett", "Jasper Barrett",
        "All Palace of Honor members", "Bella Mitchell-Hawkins", "Matt Mitchell",
        "Cardinal representatives", "European nobility", "Fortune 100 executives",
        "Harper Montgomery", "Kendra Donnelly", "Chris Donnelly"
      ]),
      clothingDescriptions: JSON.stringify({
        "Addie Price-Hawkins": "As Patroness, she wears the ceremonial white - a breathtaking Elie Saab couture gown with subtle gold embroidery symbolizing the POH motto. The Patroness tiara, only worn at this event. The weight of responsibility and honor visible in every detail.",
        "Elena Barrett": "Midnight blue Valentino gown as a senior member, the POH pin displayed prominently. Diamond earrings that were her investiture gift from Addie.",
        "Jasper Barrett": "White tie and tails - the only event that demands it. POH supporter's pin on his lapel.",
        "Hawk": "Classic white tie attire, standing beside Addie as her consort. The military bearing serving him well in this most formal of settings.",
        "Bella Mitchell-Hawkins": "Soft pink Monique Lhuillier as a newer Page member. The dress Addie helped her select. Nervous but growing into her place.",
        "Kendra Donnelly": "Champagne silk gown, modest but elegant. Her faith and the POH's charitable mission aligned perfectly.",
        "Harper Montgomery": "Black Armani gown with architectural details. Even at charity events, she's thinking three moves ahead."
      }),
      beforeActivities: "Private ceremony in the POH chapel - blessing of the new charitable initiatives. Addie leading the oath renewal for all members. Bella's hands trembling as she lights her candle in the Page ritual.",
      events: "Processional entrance with Addie leading. Champagne reception in the grand hall. Presentation of the year's charitable accomplishments - millions raised, lives changed. Live auction raising funds for women's shelters and education. Dancing in the ballroom. Addie's speech bringing tears - 'We lift as we climb.'",
      afterActivities: "Private supper for inner circle members. Addie and Elena discussing the year's successes and challenges. Bella receiving her first real responsibility - heading a youth mentorship initiative. Hawk and Jasper sharing a quiet drink, the warriors at rest.",
      nextMorning: "Strategy breakfast - planning next year's initiatives. Addie mentoring Bella on leadership. Elena proposing a collaboration with Maison Aurelia. The machine of good works continuing to turn."
    }
  },
  {
    name: "The Papal Baptism: Kendra's First Child",
    updates: {
      attendees: JSON.stringify([
        "Kendra Donnelly", "Chris Donnelly", "Baby Donnelly", "Pope Francis",
        "Elena Barrett", "Jasper Barrett", "Grace Barrett", "Lucas Barrett",
        "Addie Price-Hawkins", "Hawk", "Sara Davenport", "Connor Davenport",
        "Father Michael O'Brien", "Cardinal Dolan", "Donnelly family members",
        "Chris's parents", "Kendra's family"
      ]),
      clothingDescriptions: JSON.stringify({
        "Kendra Donnelly": "White lace dress symbolizing purity and new motherhood, her mother's pearl earrings, hair in soft waves. Tears already forming before the ceremony begins.",
        "Chris Donnelly": "Dark suit befitting Vatican protocol, his grandfather's rosary in his pocket. The proudest moment of his life visible on his face.",
        "Baby Donnelly": "Antique christening gown passed through Chris's family for generations, hand-embroidered by his great-grandmother.",
        "Elena Barrett": "Soft blue Dior suit as godmother, elegant but not competing with the occasion. Grace in matching blue as a symbolic big sister.",
        "Jasper Barrett": "Dark suit, reverent demeanor. As godfather, he takes this responsibility with the same seriousness as any BSS operation.",
        "Addie Price-Hawkins": "Cream Chanel suit, mantilla in her hair as Vatican protocol requires for women. Thinking of the children she couldn't have, grateful for this family she's chosen.",
        "Pope Francis": "Simple white papal vestments. The most powerful man in Catholic faith, yet approaching this baby with grandfather-like tenderness."
      }),
      beforeActivities: "Early morning flight to Rome on the BSS jet. Check-in at Hotel de Russie. Breakfast overlooking the city while Kendra feeds the baby. Quiet prayers before heading to the Vatican. Swiss Guards escorting them through private corridors.",
      events: "Private ceremony in the Sistine Chapel - unprecedented for a family not of noble or political significance, but arranged through the EOHSJ connection. Pope Francis holding the baby with practiced gentleness. Chris weeping openly as the holy water touches his child's head. Grace carefully holding her candle. The Pope blessing each family member individually.",
      afterActivities: "Private audience with Pope Francis. He speaks to Kendra about motherhood, to Chris about fatherhood, gives Grace a special rosary. Photos that will be treasured for generations. Dinner at a private Vatican restaurant rarely open to outsiders.",
      nextMorning: "Mass at St. Peter's Basilica. Breakfast at the hotel - everyone still processing the magnitude. Kendra journaling every detail. Grace practicing telling the story to tell at school. Flight home, baby sleeping peacefully, blessed and loved."
    }
  }
];

async function main() {
  console.log('Updating galas with detailed guest lists and outfit information...\n');

  for (const { name, updates } of galaUpdates) {
    const gala = await prisma.gala.findFirst({
      where: { name: { contains: name.split(':')[0].split(' - ')[0].trim() } }
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

  // List all galas that still need updates
  const allGalas = await prisma.gala.findMany({
    select: { name: true, clothingDescriptions: true, attendees: true }
  });

  console.log('\n--- Gala Status Summary ---');
  for (const gala of allGalas) {
    const hasClothing = gala.clothingDescriptions && gala.clothingDescriptions !== '{}';
    const hasAttendees = gala.attendees && gala.attendees !== '[]';
    const status = hasClothing && hasAttendees ? '✅' : '⚠️ needs details';
    console.log(`${status} ${gala.name}`);
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
