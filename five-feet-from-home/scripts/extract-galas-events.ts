import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/**
 * Comprehensive Gala and Events Extraction Script
 *
 * Parses ALL source documents to extract:
 * 1. Galas - charity events, fundraisers, balls, formal dinners
 * 2. Parties - Elena's thank you party, family gatherings, celebrations
 * 3. Events - weddings, funerals, business events, conferences
 * 4. Outfit descriptions - what each character wears to each event
 *
 * Updates Character.wardrobeStyle with outfit information found
 */

interface GalaData {
  name: string;
  organization?: string;
  venue?: string;
  location?: string;
  date?: string;
  purpose?: string;
  dresscode?: string;
  attendees?: string; // JSON array
  significance?: string;
  events?: string;
  hostOrganizer?: string;
  bookAppearance?: string;
  clothingDescriptions?: string; // JSON object of character -> outfit
  beforeActivities?: string;
  afterActivities?: string;
  nextMorning?: string;
  tags?: string;
}

interface EventData {
  name: string;
  description?: string;
  timelineRef?: string;
  timelineSort?: number;
  consequences?: string;
  tags?: string;
}

interface OutfitInfo {
  character: string;
  event: string;
  outfit: string;
  context?: string;
}

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log('=== COMPREHENSIVE GALA & EVENTS EXTRACTION ===\n');

  // ========================================
  // ELENA'S THANK YOU PARTY
  // ========================================
  const elenasParty: GalaData = {
    name: "Elena's Thank You Party",
    organization: "Elena Barrett (Personal)",
    venue: "Barrett Compound - Back Lawn",
    location: "Charlotte, NC",
    date: "Post-recovery from surgery (Book 1, after Chapter 35)",
    purpose: "Gratitude party for everyone who helped during Elena's medical crisis",
    dresscode: "Garden party elegant - not corporate gala",
    attendees: JSON.stringify([
      'Elena Barrett',
      'Jasper Barrett',
      'Grace Barrett',
      'Harper Caldwell',
      'Sara Whitaker',
      'Mason Reilly',
      'Jessica Vaughn',
      'Maddie Cole',
      'Vivienne Ross',
      'Natalia Cruz',
      'Camille Whitmore',
      'Isabella Santoro',
      'Cole',
      'Dean',
      'Emma (Sara\'s daughter)'
    ]),
    significance: `Major character development moment for Elena. First time since surgery she feels like herself. Party represents her taking back control of her life.

Key emotional beats:
- Elena proving she's "still here" and can still create something beautiful
- Jasper showing up and being present
- "PT cleared me for all activities" conversation
- Garden walk under the oak tree
- Wives' circle arrives together showing support`,
    events: `Party Setup (Chapter 35):
- Sara strings bistro lights between oak trees
- Harper unpacks glassware with precision
- Elena arranges hydrangeas (soft blue and lavender)
- Harper sends flowers from Lagos before arriving

The Party (Chapter 38):
- Evening arrives with golden light, string music
- Harper at bar in emerald scarf
- Sara circulates with appetizers
- Cole and Dean scan perimeter out of habit
- Mason arrives with whiskey
- Jessica gives Elena warm hug, "You look strong"
- Wives' circle arrives together (Maddie in cream dress with pearls, Vivienne in vintage Hermès, Natalia in blazer over silk, Camille in Southern florals, Isabella in dramatic red)
- Grace runs around with Emma
- Jasper and Elena slip away to oak tree for private moment
- "PT cleared me for all activities" / "All of them" / "Doesn't mean I don't choose you"`,
    hostOrganizer: "Elena Barrett",
    bookAppearance: "Book 1, Chapters 35 (Party Planning) and 38 (The Thank You Party)",
    clothingDescriptions: JSON.stringify({
      "Elena Barrett": "Navy silk dress that skimmed her frame, elegant without trying too hard, hair in loose waves",
      "Harper Caldwell": "Emerald scarf catching candlelight",
      "Sara Whitaker": "Athletic grace, casual server mode",
      "Jasper Barrett": "Navy blazer over crisp white shirt, no tie, casual elegance",
      "Jessica Vaughn": "Tailored trousers, slate-blue blouse, oxblood tote, silver hair swept back",
      "Maddie Cole": "Flowy cream dress with pearls at throat",
      "Vivienne Ross": "Vintage Hermès, subtle generational wealth",
      "Natalia Cruz": "Sharp blazer over silk, legal precision in fashion",
      "Camille Whitmore": "Southern florals",
      "Isabella Santoro": "Dramatic red (signature color)",
      "Cole": "Dark jeans and fitted blazer",
      "Dean": "Button-down purchased for the occasion"
    }),
    beforeActivities: `Chapter 35 - Party Setup:
- Late afternoon sun over back lawn
- Tables under sprawling oak trees with white linens
- Sara on ladder stringing bistro lights (jeans, NC State t-shirt, ponytail)
- Harper unpacking glassware (cream cashmere sweater, sleeves rolled, practical flats)
- Elena kneeling by garden arranging hydrangeas
- Harper/Elena conversation about work-life balance: "Decide the line before the line decides you" / "Invite him over"
- Flower delivery from Harper (white roses, pale green eucalyptus)`,
    afterActivities: `Garden walk under oak tree:
- Jasper and Elena slip away from tent
- Garden lit by string lights and distant house glow
- Stand under the old oak tree (witness to decade of their life together)
- "PT cleared me for all activities" conversation
- Kiss on forehead, promise not to leave party early
- Elena feeling hope - "real hope, the kind that believed tomorrow might actually be different"`,
    tags: JSON.stringify(['party', 'book1', 'elena-recovery', 'family', 'gratitude', 'character-development', 'romance'])
  };

  // ========================================
  // VETERANS DAY BENEFIT GALA
  // ========================================
  const veteransDayGala: GalaData = {
    name: 'Veterans Day Benefit Gala',
    organization: 'BSS / Jasper Barrett Foundation',
    venue: 'Charlotte Convention Center',
    location: 'Charlotte, NC',
    date: 'Veterans Day (Book 2)',
    purpose: 'Veterans Day benefit, BSS public face event',
    dresscode: 'Black tie',
    attendees: JSON.stringify([
      'Elena Barrett',
      'Addison Price',
      'Hawk',
      'Kendra',
      'Chris Donnelly',
      'Evelyn',
      'Marcus',
      'Grace Barrett',
      'Jasper Barrett',
      'Lottie',
      'Alex'
    ]),
    significance: `Major BSS public event. Red, white, and blue spotlights wash the exterior. String quartet plays as guests in tuxedos and gowns gather beneath glittering chandeliers.

The wives club arrives together - Elena leads in crimson, Addie in sharp black, Evelyn in midnight blue, Kendra (unknowingly pregnant) in navy. Grace trails as their "little princess."

Key moments:
- Hawk and Addie treat Grace as if she's theirs
- Hawk's former teammate teases them about Grace
- Chris & Kendra have side conversations with Jasper & Elena
- Evelyn & Marcus work the floor as professional power-couple
- Lottie manages seating charts flawlessly`,
    events: `Addie slips away with Grace to sneak cookies from catering.
After-gala wind-down at Elena's compound where Hawk mentions wanting kids with Addie.
Addie admits she suspects Kendra is pregnant.`,
    clothingDescriptions: JSON.stringify({
      "Elena Barrett": "Crimson gown (leading the wives club)",
      "Addison Price": "Sharp black gown",
      "Evelyn": "Midnight blue gown",
      "Kendra": "Navy gown (unknowingly pregnant, may feel tight)",
      "Grace Barrett": "Little princess outfit (trailing the wives)"
    }),
    bookAppearance: "Book 2",
    tags: JSON.stringify(['gala', 'book2', 'bss', 'veterans', 'public-event', 'wives-club'])
  };

  // ========================================
  // SPANISH EMBASSY GALA (FLASHBACK)
  // ========================================
  const spanishEmbassyGala: GalaData = {
    name: 'Spanish Embassy Gala - Georgetown',
    organization: 'Spanish Embassy',
    venue: 'Spanish Embassy',
    location: 'Washington D.C. / Georgetown',
    date: 'Georgetown Years, spring semester (8+ years before main story)',
    purpose: 'Diplomatic event - Elena & Lena origin flashback',
    dresscode: 'Black tie',
    attendees: JSON.stringify(['Lena Ortiz', 'Elena Barrett (flashback, age 18)']),
    significance: `FLASHBACK - Georgetown Years, spring semester.

Elena (18, first-year) is working the coat check as part of her internship. Lena (22, senior, flawless in a black gown) spots her.

Elena (to herself): "God, I don't belong here."
Lena (approaching, amused): "You'll never belong if you keep hiding in the coat room."
Elena (startled): "I'm just… learning the ropes."
Lena (handing her a glass of champagne): "Lesson one — you don't learn from the sidelines. Walk with me."

By the end of the night, Elena had met three ambassadors' wives — her first step into the world Lena had mastered.`,
    events: 'Lena introduces Elena to ambassadors\' wives. Elena\'s launchpad into high society events.',
    clothingDescriptions: JSON.stringify({
      "Lena Ortiz": "Flawless black gown",
      "Elena Barrett": "Coat check attendant outfit (internship)"
    }),
    bookAppearance: "Flashback referenced in character backgrounds",
    tags: JSON.stringify(['gala', 'flashback', 'georgetown', 'elena-origin', 'mentorship', 'lena-ortiz'])
  };

  // ========================================
  // D.C. DEFENSE CONTRACTOR GALA
  // ========================================
  const dcDefenseGala: GalaData = {
    name: 'D.C. Defense Contractor Gala',
    organization: 'Defense Contractor Client',
    venue: 'Washington D.C. venue',
    location: 'Washington D.C.',
    date: 'Six months into Addie\'s time at BSS',
    purpose: 'Defense industry networking - Addie\'s My Fair Lady debut',
    dresscode: 'Black tie',
    attendees: JSON.stringify(['Addison Price', 'Jasper Barrett', 'Elena Barrett', 'Harper Caldwell', 'Riley']),
    significance: `Addie's "My Fair Lady" debut - her transformation from hippie stoner to warrior goddess is complete.

Six months into her time at BSS. Addie arrives in a gown Elena chose, Harper's lessons etched in her movements, Riley's structure guiding her prep.

At first, she's overlooked. Then she speaks — one sharp, perfectly timed line that silences a table of executives.

Jasper, watching from across the room, realizes she's not the assistant anymore — she's his future number two.

Even Jasper paused, seeing not the assistant — but his future number two.`,
    events: 'Addie\'s transformation debut. Jasper recognizes her potential.',
    clothingDescriptions: JSON.stringify({
      "Addison Price": "Gown Elena chose - elegant transformation look"
    }),
    bookAppearance: "Flashback - Addie's character arc",
    tags: JSON.stringify(['gala', 'flashback', 'addison-transformation', 'bss', 'defense'])
  };

  // ========================================
  // PARIS GALA - WEAPONS BROKER OP
  // ========================================
  const parisGala: GalaData = {
    name: 'Paris Gala - Weapons Broker Op',
    organization: 'European diplomatic/social event',
    venue: 'Paris ballroom',
    location: 'Paris, France',
    date: 'BSS operational period',
    purpose: 'BSS operation - Isabella tracking weapons broker',
    dresscode: 'Black tie',
    attendees: JSON.stringify(['Isabella Marquez']),
    significance: `BSS operational gala. Isabella drifts through the ballroom in a floor-length emerald gown, hair pinned elegantly, champagne in hand.

To the guests, she's just another diplomat's daughter. In reality, she's tracking a weapons broker across the room.

When he excuses himself, she slips after him — heels silent, expression calm. Moments later, in the shadow of a marble hallway, she's got him pinned against the wall, silenced pistol pressed under his chin.

"You'll walk back inside and smile. And you'll give me everything on the Belgrade shipment."`,
    events: 'Isabella neutralizes weapons broker threat.',
    clothingDescriptions: JSON.stringify({
      "Isabella Marquez": "Floor-length emerald gown, hair pinned elegantly"
    }),
    bookAppearance: "BSS operations background",
    tags: JSON.stringify(['gala', 'bss-operation', 'paris', 'isabella', 'weapons-broker'])
  };

  // ========================================
  // FOUNDATION KIDS SHOWCASE GALA
  // ========================================
  const foundationKidsGala: GalaData = {
    name: 'Foundation Kids Showcase Gala',
    organization: 'Sofia & Evie Foundation',
    venue: 'Charlotte venue',
    location: 'Charlotte, NC',
    date: 'Foundation launch period',
    purpose: 'Showcase Special Olympics and foundation kids\' talents',
    dresscode: 'Formal',
    attendees: JSON.stringify(['Sofia', 'Evie', 'Bella', 'Jazz', 'Claire', 'Elena Barrett', 'Grace Barrett']),
    significance: `The culminating gala idea that Sofia and Evie created during their 8th late-night work session.

"We need something that brings people in, something that makes them feel the mission."
"What if we showcase the kids? Not just stories — let them perform, display art, speak for themselves."
"That's it. A gala by the kids, for the kids."

Special Olympics athletes and foundation students showcase their talents. Jazz performs in the pool. Kids display art and cooking skills.`,
    events: 'Kids perform, display art, speak for themselves. Evie and Sofia\'s vision realized.',
    bookAppearance: "Foundation storyline",
    tags: JSON.stringify(['gala', 'foundation', 'sofia-evie', 'special-olympics', 'kids'])
  };

  // ========================================
  // MADRID SOCIETY GALA
  // ========================================
  const madridGala: GalaData = {
    name: 'Madrid Society Gala',
    organization: 'Madrid high society',
    venue: 'Madrid venue',
    location: 'Madrid, Spain',
    date: '8 years before main story',
    purpose: 'Elena\'s first "big break" gala, launched by Lena\'s connections',
    dresscode: 'Black tie',
    attendees: JSON.stringify(['Elena Barrett', 'Lena Ortiz']),
    significance: `Elena's first major gala success, 8 years before main story.

Lena had told Elena at a Georgetown café: "They will hire you if they think you're already part of the inner circle. Come with me to Madrid next month. I'll introduce you to the right people."

Elena's first "big break" gala in Madrid had Lena's fingerprints all over it. This launched Elena's event planning empire and connected her to European high society.`,
    events: 'Elena\'s event planning career launched. Lena\'s connections open doors.',
    bookAppearance: "Flashback - Elena's career origin",
    tags: JSON.stringify(['gala', 'flashback', 'madrid', 'elena-career', 'lena-ortiz'])
  };

  // ========================================
  // CHARLOTTE GALA - PREGNANCY FORESHADOW
  // ========================================
  const charlotteGalaPrep: GalaData = {
    name: 'Charlotte Gala - Pregnancy Foreshadow',
    organization: 'Charlotte event',
    venue: 'Charlotte venue',
    location: 'Charlotte, NC',
    date: 'Book 2 - before Kendra knows she\'s pregnant',
    purpose: 'Gala prep scene where Kendra doesn\'t realize she\'s pregnant',
    dresscode: 'Black tie',
    attendees: JSON.stringify(['Addison Price', 'Elena Barrett', 'Evelyn', 'Kendra', 'Grace Barrett']),
    significance: `Dressing room scene at Elena's mountain compound, hours before the gala.

Kendra stands in front of the mirror in a fitted navy gown, fussing with the straps. "I swear this dress shrunk. I've been bloated for weeks." She laughs it off.

Meanwhile, Addie privately confesses to Elena her fear of losing herself to motherhood. Grace (7) helps the women get ready, clutching hairpins like treasure.

Elena throws a knowing look to Evelyn - they both suspect what Kendra doesn't know yet.`,
    events: 'Addie confesses fear of motherhood. Kendra unknowingly pregnant. Grace helps with prep.',
    clothingDescriptions: JSON.stringify({
      "Kendra": "Fitted navy gown (feels tight, bloated)",
      "Addison Price": "Not specified - getting ready",
      "Elena Barrett": "Getting ready, maternal observer",
      "Grace Barrett": "Age 7, helping with hairpins"
    }),
    bookAppearance: "Book 2",
    tags: JSON.stringify(['gala', 'book2', 'pregnancy-foreshadow', 'kendra', 'wives-circle'])
  };

  // ========================================
  // ART BASEL GALA - MIAMI
  // ========================================
  const artBaselGala: GalaData = {
    name: 'Art Basel Gala - Miami',
    organization: 'Art Basel / Casino Gallery',
    venue: 'Miami Beach Convention Center',
    location: 'Miami Beach, FL',
    date: 'Art Basel week',
    purpose: 'Art world event - connects to BSS crisis "Gallery" and fake art sting',
    dresscode: 'Black tie',
    attendees: JSON.stringify(['Addison Price', 'Serena Ward', 'Hawk', 'Colt', 'Security team']),
    significance: `High-profile art world event during Art Basel week.

Connected to BSS crises:
- GALLERY: Cartel assassination attempt at Art Basel threatens high-profile clients
- MASTERPIECE: Luxury casino gallery selling forgeries to international clients

Art specialists, diplomats, and royalty in attendance. BSS provides security and handles any incidents quietly.`,
    events: 'Art Basel week operations. BSS handles security and crisis management.',
    bookAppearance: "BSS crisis storylines",
    tags: JSON.stringify(['gala', 'art-basel', 'miami', 'bss-crisis', 'security'])
  };

  // ========================================
  // SAVANNAH'S WEDDING (BOOK 2)
  // ========================================
  const savannahWedding: GalaData = {
    name: "Savannah's Wedding",
    organization: "Savannah Cole (personal)",
    venue: "Charleston Country Club",
    location: "Charleston, SC",
    date: "Book 2, Weekend Event Day 1",
    purpose: "Lavish Charleston wedding - Jasper absent in DC",
    dresscode: "Black tie",
    attendees: JSON.stringify([
      'Elena Barrett',
      'Grace Barrett',
      'Harper Caldwell',
      'Sara Whitaker',
      'Addison Price',
      'Kendra',
      'Chloe Whitaker',
      'Caroline Whitmore',
      'Ronnie Blake',
      'Julia Raines',
      'Ridge',
      'Madison Lowe',
      'Savannah Cole',
      'Cole Stratton',
      'Isla',
      'Nate Hollis',
      'Serena Hollis',
      'David Kim',
      'Amelia Kim',
      'CrossFit athletes'
    ]),
    significance: `Lavish Charleston country club affair. Harper is Elena's unofficial "plus one" for the weekend in her fiancé's absence.

Wife circle + hot girls who lift dominate the dance floor. Harper plays charming arm candy for Elena.

Key moments:
- Jasper is absent - still in DC with NSA cyber team on political conflict
- Elena navigates social scene solo, glowing in emerald maternity gown
- Wives' circle teases Harper about "mystery fiancé" who isn't there
- Julia & Ridge openly flirting
- Addison in deep red gown draws multiple stares
- CIA/Tier 1 guys have quiet conversations hinting at ongoing ops`,
    events: `Wedding ceremony and reception.
Harper dodges fiancé questions.
Julia & Ridge chemistry loud.
Addison most visibly sought-after single woman.
CIA/Tier 1 guys slip outside twice for "fresh air."`,
    hostOrganizer: "Savannah Cole",
    bookAppearance: "Book 2, Chapter 21",
    clothingDescriptions: JSON.stringify({
      "Elena Barrett": "Soft emerald maternity gown, hair pinned up, glowing",
      "Grace Barrett": "White dress with pale blue sash (flower-girl level cute)",
      "Harper Caldwell": "Emerald-green off-the-shoulder gown, hair up in sleek twist, diamond drop earrings",
      "Sara Whitaker": "Champagne silk halter gown with low back",
      "Sara's husband": "Navy tux with black lapels",
      "Julia Raines": "Midnight-blue velvet with thigh slit",
      "Ridge": "Tailored charcoal suit",
      "Addison Price": "Floor-length deep red gown, satin with plunging neckline, hair in glossy waves",
      "Kendra": "Sleek black slip dress, gold arm cuff, minimalist heels",
      "Caroline Whitmore": "Silver column gown",
      "Ronnie Blake": "Power-red fitted sheath",
      "Savannah Cole": "Blush lace",
      "Madison Lowe": "Metallic gold with low drape back",
      "Cole Stratton": "Black tux with cufflinks",
      "Rafe": "Black tux with pocket square",
      "Logan Carr": "Black tux, slim fit",
      "Claire (Performance Coach)": "Elegant black gown with asymmetrical neckline"
    }),
    beforeActivities: `Morning at Elena's rented countryside estate:
- 10+ suites, guest cottages
- Guests getting ready in their suites
- Valet shuttles everyone to country club
- Hair, makeup, champagne prep`,
    afterActivities: `Reception dancing, wives' circle holding court.
CIA/Tier 1 guys on terrace with cigars and Macallan.
Harper claims fiancé "wrapping up overseas work."
Elena overhears quiet conversation about "tight timelines" - foreshadows future conflict.`,
    tags: JSON.stringify(['wedding', 'book2', 'charleston', 'wives-circle', 'elena-solo'])
  };

  // ========================================
  // BABY ETHAN'S BAPTISM (BOOK 2)
  // ========================================
  const ethanBaptism: GalaData = {
    name: "Ethan's Baptism",
    organization: "Whitaker Family (Sara & Mark)",
    venue: "Historic Charleston Church",
    location: "Charleston, SC",
    date: "Book 2, Weekend Event Day 2",
    purpose: "Baptism of Sara & Mark's son Ethan Charles Whitaker",
    dresscode: "Formal Sunday best",
    attendees: JSON.stringify([
      'Elena Barrett',
      'Jasper Barrett (arrives as mass starts)',
      'Grace Barrett',
      'Sara Whitaker',
      'Mark Whitaker',
      'Ethan Whitaker (baby)',
      'Chloe Whitaker',
      'Harper Caldwell',
      "Harper's fiancé (arrives during ceremony)",
      'Addison Price',
      'Kendra',
      'Julia Raines',
      'Ridge',
      'Wives Circle members',
      'CIA/Tier 1 guys (Rafe, Logan Carr)',
      'Cole Stratton',
      'Charles & Diane Whitaker (Mark\'s parents)',
      'Emily Whitaker-Kaplan (Mark\'s sister)',
      'Daniel Kaplan',
      'Dr. Nathan Reyes',
      'Dr. Todd Lawson',
      'Jalen Morris (NFL)',
      'Vanessa Cruz',
      'Dr. Leila Nouri',
      'Chase & Whitney Holloway',
      'Derek Langford',
      'Jack "Stone" Maddox',
      'CrossFit crew',
      'Georgetown friends'
    ]),
    significance: `Major family event with cinematic entrance by Jasper.

JASPER'S ENTRANCE:
Just as organ starts and priest steps forward, double doors at back swing open. Jasper walks in, sunlight behind him, suit immaculate but with faint road dust from overnight drive from DC. Rafe and Logan Carr flank him in sharp suits.

Every head turns. Grace beams and waves from front row. Elena exhales, smile saying everything. He walks aisle slowly, nodding to friends, slides in next to Elena, kisses her temple.

HARPER'S FIANCÉ:
Appears quietly halfway through ceremony, sits with Harper. First time most of the group meets him. Wives' circle exchanges raised eyebrows and knowing smiles.

BAPTISM:
Baby Ethan James baptized while Jasper holds Elena's hand. Family ceremony with extended network present.`,
    events: `Church ceremony with Jasper's cinematic entrance.
Harper's fiancé appears during ceremony.
Reception at country club.
Full guest mix: CIA/Tier 1, CrossFit, Georgetown, family, Mark's professional connections.
Addison, Kendra keep Grace & Chloe busy.
Julia & Ridge banter continues.
Jasper and Rafe have quick aside with Cole Stratton for future setup.`,
    hostOrganizer: "Sara & Mark Whitaker",
    bookAppearance: "Book 2, Chapters 24-25",
    clothingDescriptions: JSON.stringify({
      "Elena Barrett": "Dove-blue maternity dress with matching fascinator, hair in waves",
      "Grace Barrett": "White smocked dress with pale pink shoes",
      "Chloe Whitaker": "Tiny navy jumper with bow",
      "Sara Whitaker": "Blush wrap dress",
      "Mark Whitaker": "Grey suit",
      "Ethan Whitaker": "Christening gown",
      "Jasper Barrett": "Immaculate suit with faint road dust from drive",
      "Harper Caldwell": "Navy shift dress with pearl collar",
      "Julia Raines": "Soft rose midi dress",
      "Ridge": "Cream sport coat",
      "Addison Price": "Pastel yellow fit-and-flare",
      "Kendra": "Mint-green wrap dress",
      "Wives Circle": "Spring tones — florals, chiffon, light pastels",
      "CIA/Tier 1 Guys": "Dark suits, sunglasses off inside",
      "Rafe & Logan Carr": "Sharp suits flanking Jasper",
      "Charles Whitaker": "Navy blazer with khakis",
      "Diane Whitaker": "Soft grey silk wrap dress",
      "Emily Whitaker-Kaplan": "Bold floral print wrap dress",
      "Nathan Reyes": "Blue suit, top button open",
      "Todd Lawson": "Blue suit with pocket square matching wife's dress",
      "Jalen Morris": "Custom charcoal suit",
      "Vanessa Cruz": "Emerald green sheath dress",
      "Dr. Leila Nouri": "Cream wide-legged jumpsuit with gold accessories",
      "Whitney Holloway": "Navy/white striped midi dress",
      "Chase Holloway": "Pale linen sport coat",
      "Derek Langford": "Tailored light-blue dress shirt, sleeves rolled, no tie",
      "Jack 'Stone' Maddox": "Dark tailored suit, no tie"
    }),
    beforeActivities: `Morning at Elena's rented estate:
- Guests in casual lounge clothes for breakfast (yoga pants, linen shirts, sweats)
- Coffee and breakfast in big kitchen
- Addison & Kendra help dress Grace
- Chloe toddles around with bow
- Caravan to church`,
    afterActivities: `Reception lunch at country club:
- Harper's fiancé officially introduced
- CIA/Tier 1 + CrossFit + Georgetown + family all mix
- Addison and Kendra keep Grace & Chloe busy
- Jasper and Rafe quick aside with Cole Stratton
- Julia & Ridge banter
- Multiple conversations seeding future plots`,
    nextMorning: `Post-baptism estate breakfast (casual).
Guests drift down for coffee.
Some depart, some stay for extended weekend.
Grace plays with Chloe, exhausted from events.`,
    tags: JSON.stringify(['baptism', 'book2', 'charleston', 'family', 'jasper-entrance', 'harper-fiance'])
  };

  // ========================================
  // PARTY PREP NIGHT (BOOK 2)
  // ========================================
  const partyPrepNight: GalaData = {
    name: "Party Prep Night - Barrett Estate",
    organization: "Jasper & Elena Barrett (hosts)",
    venue: "Barrett Estate",
    location: "Charlotte, NC",
    date: "Book 2, Chapter 15 - evening before big party",
    purpose: "Preparation night for upcoming party, key character moments",
    dresscode: "Casual prep mode, lingerie incident",
    attendees: JSON.stringify([
      'Elena Barrett',
      'Harper Caldwell',
      'Sara Whitaker',
      'Addison Price',
      'Kendra',
      'Grace Barrett',
      'Chloe Whitaker'
    ]),
    significance: `Warm, playful, chaotic preparation night at Barrett compound.

KEY SCENE - Addison/Kendra Make-Out:
Guest room upstairs becomes dressing studio. Addison and Kendra tasked with hemming and steaming. Scene escalates - both in lingerie, they laugh, tease, end up making out.

Elena catches them: "Finish the dresses before you start your after-party." "And make sure Grace doesn't see this."

Grace and Chloe appear asking to help. Addison/Kendra scramble for robes. Girls want to see dresses.

All four head to master closet for dress prep. Playful tension, knowing looks between Elena, Addison, Kendra.

ATMOSPHERE:
House smells like eucalyptus polish and peonies. Playlists drift room to room. Harper coaxing candles, Sara circling with coach's eye. Fairy lights. Canapés. Elena in emerald knit dress with gold chain, sparkling water with lime.`,
    events: `Sara and Harper setting up all day - place cards, candles, table arrangements.
Addison and Kendra upstairs handling wardrobe - steaming, hemming.
Make-out session interrupted by Elena.
Grace and Chloe appear wanting to help.
Promoted to "Chief Twirl Officers" (CTOs).
Group moves to closet for dress selection.
Five-minute candle check call from downstairs.`,
    hostOrganizer: "Elena Barrett",
    bookAppearance: "Book 2, Chapter 15 - Party Prep Night",
    clothingDescriptions: JSON.stringify({
      "Elena Barrett": "Emerald knit dress over belly curve, simple gold chain necklace",
      "Harper Caldwell": "Work mode, sleeves rolled",
      "Sara Whitaker": "Casual prep mode",
      "Addison Price": "Lingerie during steaming/hemming, then robe",
      "Kendra": "Lingerie during steaming/hemming, ponytail, then robe",
      "Grace Barrett": "Hair ribbon askew, constellation of glitter stickers",
      "Chloe Whitaker": "Leggings tucked into socks, glitter stickers on cheek"
    }),
    beforeActivities: `All-day setup:
- Harper with taper candles in antique brass holders
- Sara circling with coach's eye, adjusting vases
- Kitchen with canapés lined up
- Fairy lights across beams
- Elena with list on phone, sparkling water with lime`,
    afterActivities: `Final prep:
- Downstairs for candle inspection
- Grace approved twirl: "Ten out of ten"
- Elena follows laughter downstairs
- Jasper arriving home in an hour
- Night rushing up to meet them`,
    tags: JSON.stringify(['party-prep', 'book2', 'addison-kendra', 'grace-chloe', 'barrett-estate', 'intimate-moment'])
  };

  // ========================================
  // THE WEDDING BEACH ESCAPE (FLASHBACK)
  // ========================================
  const weddingBeachEscape: EventData = {
    name: "The Wedding Beach Escape",
    description: `Flashback from Chapter 15 - Holding the Line.

Elena not in hospital bed, but Elena as she'd been on the night they'd snuck away from a wedding reception.

Jasper and Elena escape from a wedding reception to the beach. Romantic moment from their past that sustains Jasper during crisis.`,
    timelineRef: "Years before Book 1, flashback memory",
    tags: JSON.stringify(['flashback', 'wedding', 'beach', 'jasper-elena', 'romance', 'memory'])
  };

  // ========================================
  // CREATE/UPDATE GALAS IN DATABASE
  // ========================================

  const galas: GalaData[] = [
    elenasParty,
    veteransDayGala,
    spanishEmbassyGala,
    dcDefenseGala,
    parisGala,
    foundationKidsGala,
    madridGala,
    charlotteGalaPrep,
    artBaselGala,
    savannahWedding,
    ethanBaptism,
    partyPrepNight
  ];

  let createdGalas = 0;
  let updatedGalas = 0;

  for (const gala of galas) {
    const existing = await prisma.gala.findFirst({
      where: { name: gala.name, projectId: project.id }
    });

    if (existing) {
      await prisma.gala.update({
        where: { id: existing.id },
        data: gala
      });
      console.log(`✓ Updated Gala: ${gala.name}`);
      updatedGalas++;
    } else {
      await prisma.gala.create({
        data: {
          projectId: project.id,
          ...gala,
        }
      });
      console.log(`✓ Created Gala: ${gala.name}`);
      createdGalas++;
    }
  }

  // ========================================
  // CREATE/UPDATE EVENTS IN DATABASE
  // ========================================

  const events: EventData[] = [
    weddingBeachEscape
  ];

  let createdEvents = 0;
  let updatedEvents = 0;

  for (const event of events) {
    const existing = await prisma.event.findFirst({
      where: { name: event.name, projectId: project.id }
    });

    if (existing) {
      await prisma.event.update({
        where: { id: existing.id },
        data: event
      });
      console.log(`✓ Updated Event: ${event.name}`);
      updatedEvents++;
    } else {
      await prisma.event.create({
        data: {
          projectId: project.id,
          ...event,
        }
      });
      console.log(`✓ Created Event: ${event.name}`);
      createdEvents++;
    }
  }

  // ========================================
  // UPDATE CHARACTER WARDROBE STYLES
  // ========================================

  console.log('\n=== UPDATING CHARACTER WARDROBE STYLES ===\n');

  const wardrobeUpdates = [
    {
      name: 'Elena Barrett',
      additions: `
Galas & Formal Events:
- Navy silk dress (elegant, not trying too hard, loose waves) - Thank You Party
- Soft emerald maternity gown, hair pinned up - Savannah's Wedding
- Dove-blue maternity dress with matching fascinator, hair in waves - Ethan's Baptism
- Emerald knit dress over belly, simple gold chain - Party Prep Night
- Crimson gown (leading wives club) - Veterans Day Gala`
    },
    {
      name: 'Harper Caldwell',
      additions: `
Galas & Formal Events:
- Emerald scarf catching candlelight - Thank You Party
- Emerald-green off-the-shoulder gown, hair up in sleek twist, diamond drop earrings - Savannah's Wedding
- Navy shift dress with pearl collar - Ethan's Baptism
Work/Casual:
- Cream cashmere sweater, sleeves rolled, practical flats - Party prep
- Work mode sleeves rolled - Party prep night`
    },
    {
      name: 'Addison Price',
      additions: `
Galas & Formal Events:
- Sharp black gown - Veterans Day Gala
- Floor-length deep red gown, satin with plunging neckline, hair in glossy waves - Savannah's Wedding
- Pastel yellow fit-and-flare - Ethan's Baptism
- Gown Elena chose (elegant transformation) - D.C. Defense Gala`
    },
    {
      name: 'Kendra',
      additions: `
Galas & Formal Events:
- Navy gown (tight/bloated, unknowingly pregnant) - Charlotte Gala & Veterans Day Gala
- Sleek black slip dress, gold arm cuff, minimalist heels - Savannah's Wedding
- Mint-green wrap dress - Ethan's Baptism`
    },
    {
      name: 'Sara Whitaker',
      additions: `
Galas & Formal Events:
- Champagne silk halter gown with low back - Savannah's Wedding
- Blush wrap dress - Ethan's Baptism
Casual:
- Jeans, NC State t-shirt, ponytail - Party setup athletic mode`
    },
    {
      name: 'Jasper Barrett',
      additions: `
Formal Events:
- Navy blazer over crisp white shirt, no tie (casual elegance) - Thank You Party
- Immaculate suit with faint road dust from overnight drive - Ethan's Baptism (dramatic entrance)`
    },
    {
      name: 'Jessica Vaughn',
      additions: `
- Tailored trousers, slate-blue blouse, oxblood tote, silver hair swept back - Thank You Party`
    },
    {
      name: 'Maddie Cole',
      additions: `
- Flowy cream dress with pearls at throat - Thank You Party`
    },
    {
      name: 'Vivienne Ross',
      additions: `
- Vintage Hermès (subtle generational wealth) - Thank You Party`
    },
    {
      name: 'Natalia Cruz',
      additions: `
- Sharp blazer over silk (legal precision in fashion) - Thank You Party`
    },
    {
      name: 'Camille Whitmore',
      additions: `
- Southern florals - Thank You Party`
    },
    {
      name: 'Isabella Santoro',
      additions: `
- Dramatic red (signature color) - Thank You Party
- Floor-length emerald gown, hair pinned elegantly - Paris Gala (operational)`
    },
    {
      name: 'Isabella Marquez',
      additions: `
Note: May be same as Isabella Santoro
- Floor-length emerald gown, hair pinned elegantly - Paris Gala weapons broker op`
    },
    {
      name: 'Julia Raines',
      additions: `
- Midnight-blue velvet with thigh slit - Savannah's Wedding
- Soft rose midi dress - Ethan's Baptism`
    },
    {
      name: 'Grace Barrett',
      additions: `
- White dress with pale blue sash (flower-girl level cute) - Savannah's Wedding
- White smocked dress with pale pink shoes - Ethan's Baptism
- Hair ribbon askew, glitter stickers - Party prep night`
    },
    {
      name: 'Lena Ortiz',
      additions: `
- Flawless black gown - Spanish Embassy Gala (Georgetown flashback)`
    }
  ];

  let wardrobeUpdatesCount = 0;

  for (const update of wardrobeUpdates) {
    const character = await prisma.character.findFirst({
      where: {
        projectId: project.id,
        name: update.name
      }
    });

    if (character) {
      const currentWardrobe = character.wardrobeStyle || '';
      const newWardrobe = currentWardrobe + '\n\n' + update.additions;

      await prisma.character.update({
        where: { id: character.id },
        data: { wardrobeStyle: newWardrobe.trim() }
      });

      console.log(`✓ Updated wardrobe for: ${update.name}`);
      wardrobeUpdatesCount++;
    } else {
      console.log(`⚠ Character not found: ${update.name}`);
    }
  }

  // ========================================
  // SUMMARY
  // ========================================

  console.log('\n=== SUMMARY ===');
  console.log(`Galas - Created: ${createdGalas}, Updated: ${updatedGalas}`);
  console.log(`Events - Created: ${createdEvents}, Updated: ${updatedEvents}`);
  console.log(`Character Wardrobes Updated: ${wardrobeUpdatesCount}`);

  const totalGalas = await prisma.gala.count({ where: { projectId: project.id } });
  const totalEvents = await prisma.event.count({ where: { projectId: project.id } });

  console.log(`\nTotal Galas in database: ${totalGalas}`);
  console.log(`Total Events in database: ${totalEvents}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
