import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ENHANCING GALAS WITH FULL DETAILS ===\n");

  // Get all galas that need enhancement
  const galas = await prisma.gala.findMany({
    where: { projectId: project.id }
  });

  console.log(`Found ${galas.length} galas to enhance\n`);

  // Define detailed enhancements for key galas
  const galaEnhancements: Record<string, any> = {
    // Match by partial name
    "EOHSJ": {
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Floor-length emerald green Elie Saab gown with cape sleeves, diamond tiara (Barrett family heirloom), Jerusalem Cross pendant',
        'Jasper Barrett': 'Black tie with EOHSJ Knight Commander regalia, white gloves, ceremonial cape',
        'Addie': 'Burgundy Valentino gown with high neckline, Dame of Malta insignia, antique Spanish rosary as bracelet',
        'Hawk': 'Classic black tuxedo with discrete BSS pin, Addie\'s gift cufflinks',
        'Kendra Donnelly': 'Navy Oscar de la Renta with modest neckline, cross pendant from Chris',
        'Chris Donnelly': 'Navy tuxedo, EOHSJ member medal, father\'s vintage watch'
      }),
      events: `COCKTAIL HOUR:
- Cardinal Archbishop presides over blessing
- Elena works the room, making introductions
- Jasper converses with Vatican officials about upcoming project
- Addie quietly vets potential Wives Club recruits

DINNER:
- Assigned seating (Elena spent weeks on the chart)
- Silent auction for Holy Land preservation
- Speeches from Order leadership
- Jasper presents major donation to applause

DANCING:
- Orchestra plays classical selections
- Jasper and Elena's first dance tradition
- Hawk surprises everyone by dancing well (Addie taught him)
- Chris and Kendra's sweet moments noticed by all

NETWORKING:
- Elena secures three new charity partnerships
- Jasper meets with European banker (potential BSS client)
- Addie and the Cardinal have their annual private conversation
- Wives Club members solidify bonds`,
      beforeActivities: `THE DAY OF:
- Elena has hair and makeup team at the Compound from 2pm
- Final seating chart adjustments
- Security briefing with BSS team
- Family prayer before leaving

THE ARRIVAL:
- Barrett motorcade with BSS security
- Red carpet with photographers
- Elena poses perfectly; Jasper endures it
- Greeting line with Order officials`,
      afterActivities: `POST-GALA:
- Private after-party at The Palazzo for inner circle
- Elena finally relaxes with champagne
- Jasper removes the regalia with relief
- The women debrief the evening's gossip
- The men discuss business opportunities identified

LATE NIGHT:
- Addie hosts the core group
- Real conversations happen
- Deals are hinted at
- Relationships are strengthened`,
      nextMorning: `NEXT MORNING:
- Brunch at The Palazzo
- Elena reviews thank-you note list
- Jasper takes calls from new contacts
- The group processes who was there, who wasn't, what it means
- Plans for next year's event already discussed`
    },
    "Charlotte Opera": {
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Scarlet Marchesa gown with dramatic train, ruby and diamond necklace, hair in classic updo',
        'Jasper Barrett': 'Peak lapel tuxedo, red pocket square to match Elena',
        'Addie': 'Black Givenchy column dress, statement emerald earrings, sleek hair',
        'Harper Vance': 'Electric blue Versace with thigh slit, Miami glamour meets Charlotte elegance'
      }),
      events: `THE PERFORMANCE:
- Private box with champagne service
- Program personally curated by Elena
- Intermission in the Founders Lounge

THE GALA AFTER:
- Transform from opera audience to gala attendees
- Live orchestra continues opera themes
- Dancing under crystal chandeliers
- Elena on stage thanking donors

NETWORKING MOMENTS:
- Harper meets potential Miami philanthropist
- Addie spots a woman who needs help (future Wives Club case)
- Jasper cornered by city officials wanting BSS consultation`,
      beforeActivities: `PREPARATION:
- Dress fitting earlier in the week
- Elena confirms all arrangements with venue
- Security sweep by BSS

ARRIVAL RITUAL:
- Valet choreographed perfectly
- Champagne waiting in the box
- Programs with personalized notes from Elena`,
      afterActivities: `AFTER THE CURTAIN:
- Small group dinner at a private restaurant
- Discussion of the performance
- Gossip about who wore what
- Planning the next cultural event`,
      nextMorning: `MORNING AFTER:
- Leisurely breakfast
- Reviews in the paper (Elena checks them all)
- Thank-you calls to major donors
- Discussion of the evening's best moments`
    },
    "Christmas": {
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Winter white Reem Acra with silver embroidery, diamond snowflake brooch, fur stole for outdoor moments',
        'Jasper Barrett': 'Midnight blue velvet dinner jacket, silver tie, festive but refined',
        'Addie': 'Forest green Marchesa with gold accents, holiday elegance',
        'Kendra Donnelly': 'Red Carolina Herrera, classic Christmas glamour',
        'Chris Donnelly': 'Dark green velvet jacket, gold accessories, holiday spirit'
      }),
      events: `CHRISTMAS TRADITIONS:
- Carolers in period costume
- Live nativity scene
- Champagne toast at midnight
- Children's choir performance

THE PARTY:
- Dancing to holiday classics
- Photo opportunities with seasonal backdrop
- Gift exchange among inner circle
- Elena's famous dessert table

SPECIAL MOMENTS:
- Jasper gives Elena her Christmas gift publicly
- The Barrett children perform a number
- Addie surprises everyone with a generous donation
- Secret Santa reveals among the Wives Club`,
      beforeActivities: `PREPARATION:
- The Compound transformed with holiday decorations
- Catering setup begins day before
- Elena personally inspects every detail
- BSS security in festive attire

THE MORNING OF:
- Last-minute adjustments
- Staff briefing
- Family breakfast tradition
- Gift opening before guests arrive`,
      afterActivities: `POST-CELEBRATION:
- Close friends stay for late-night cocoa
- Watching the snow fall (if lucky)
- Reflection on the year
- Gratitude expressed

CLEANUP:
- Staff begins next morning
- Elena supervises preservation of special decorations
- Leftover food donated to shelters`,
      nextMorning: `CHRISTMAS MORNING:
- Intimate family breakfast
- Opening of personal gifts
- Video calls with extended family
- Church service at the private chapel
- Relaxation and recovery from the gala`
    },
    "Spring": {
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Floral Oscar de la Renta in soft pastels, garden party elegance',
        'Jasper Barrett': 'Light gray suit, lavender tie, spring appropriate',
        'Addie': 'Soft pink Valentino, feminine but powerful',
        'Kendra Donnelly': 'Yellow Zimmermann sundress elevated with diamonds'
      }),
      events: `GARDEN PARTY ATMOSPHERE:
- Croquet and lawn games
- Jazz quartet
- Flower arranging demonstrations
- Spring fashion showcase

THE CELEBRATION:
- Toasts to new beginnings
- Announcement of spring charitable initiatives
- Dancing as the sun sets
- Garden tour with Elena as guide

NETWORKING:
- New season, new connections
- Discussion of summer plans
- Wives Club recruitment discussions`,
      beforeActivities: `PREPARATIONS:
- Garden in peak bloom (timed perfectly)
- Tents and linens set up
- Floral arrangements throughout
- Weather contingency plans

THE DAY OF:
- Final garden inspection
- Elena's famous attention to detail
- Staff positioned perfectly
- Music begins as guests arrive`,
      afterActivities: `POST-PARTY:
- Sunset drinks for inner circle
- Garden illuminated with fairy lights
- Quiet conversations
- Planning summer getaways`,
      nextMorning: `MORNING AFTER:
- Breakfast on the terrace
- Admiring the garden one more time
- Discussion of event successes
- Rest before the week begins`
    },
    "Wives Club Annual": {
      clothingDescriptions: JSON.stringify({
        'Elena Barrett': 'Gold Marchesa masterpiece, queen of the evening',
        'Addie': 'Royal purple Dior, Patroness in full glory',
        'Kendra Donnelly': 'Rose gold Monique Lhuillier, radiant new mother glow',
        'Harper Vance': 'Sleek black Tom Ford, Miami edge in Charlotte',
        'Maggie Donnelly': 'Elegant navy St. John, classic mother of the family'
      }),
      events: `THE MAIN EVENT:
- Cocktail hour with string quartet
- Seated dinner with custom menus
- Recognition of the year's achievements
- Dancing until midnight

SPECIAL TRADITIONS:
- The Patroness's Address (Addie speaks)
- New member induction ceremony
- Charitable giving announcement
- The Wives Club toast

NETWORKING & BONDING:
- Wives catch up after summer
- New alliances formed
- Support offered to those in need
- Secrets shared on the dance floor`,
      beforeActivities: `THE BUILDUP:
- Months of planning by Elena
- Invitation list carefully curated
- Seating chart negotiations
- Dress consultations among the wives

DAY OF:
- Hair and makeup teams
- Pre-event tea at The Palazzo
- Final run-through with staff
- Inner circle arrives early`,
      afterActivities: `AFTER THE GALA:
- Inner circle retreat to private room
- Real talk about the evening
- Discussion of who impressed, who didn't
- Plans for upcoming year

LATE NIGHT:
- Addie hosts at The Palazzo
- Champagne and confessions
- Bonds strengthened`,
      nextMorning: `MORNING AFTER:
- Brunch at The Palazzo
- Photo review session
- Thank-you planning
- Reflection on the club's year
- Goals set for the coming year`
    }
  };

  // Apply enhancements
  for (const gala of galas) {
    // Find matching enhancement
    let enhancement = null;
    for (const [key, value] of Object.entries(galaEnhancements)) {
      if (gala.name.toLowerCase().includes(key.toLowerCase())) {
        enhancement = value;
        break;
      }
    }

    if (enhancement) {
      await prisma.gala.update({
        where: { id: gala.id },
        data: {
          clothingDescriptions: enhancement.clothingDescriptions || gala.clothingDescriptions,
          events: enhancement.events || gala.events,
          beforeActivities: enhancement.beforeActivities || gala.beforeActivities,
          afterActivities: enhancement.afterActivities || gala.afterActivities,
          nextMorning: enhancement.nextMorning || gala.nextMorning
        }
      });
      console.log(`Enhanced: ${gala.name}`);
    }
  }

  // Add generic enhancement to galas without specific data
  const galasWithoutDetail = await prisma.gala.findMany({
    where: {
      projectId: project.id,
      clothingDescriptions: null
    }
  });

  for (const gala of galasWithoutDetail) {
    await prisma.gala.update({
      where: { id: gala.id },
      data: {
        clothingDescriptions: JSON.stringify({
          'Elena Barrett': 'Elegant designer gown appropriate to the occasion',
          'Jasper Barrett': 'Classic black tie or appropriate formal wear',
          'Addie': 'Sophisticated ensemble befitting the Patroness'
        }),
        beforeActivities: gala.beforeActivities || 'Standard pre-event preparations: security briefing, final arrangements, arrival coordination',
        afterActivities: gala.afterActivities || 'Post-event gathering for inner circle, debriefing the evening\'s events',
        nextMorning: gala.nextMorning || 'Morning-after brunch and reflection on the event\'s success'
      }
    });
    console.log(`Added generic detail to: ${gala.name}`);
  }

  console.log("\n=== GALA ENHANCEMENT COMPLETE ===");

  await prisma.$disconnect();
}

main().catch(console.error);
