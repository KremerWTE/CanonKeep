import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Extracting ALL Romance, Tension, and Relationship Storylines...\n");

  const storylines = [
    // ========== JASPER & ELENA - CORE ROMANCE ==========
    {
      title: 'Jasper & Elena: Marriage Strain and Crisis',
      category: 'Romance',
      description: 'The central love story - marriage under strain from work-life imbalance, Elena\'s health crisis, and Jasper\'s constant travel',
      characters: JSON.stringify(['Jasper Barrett', 'Elena Barrett']),
      timeline: 'Book 1 - Primary Arc',
      location: 'Charlotte, Various Crisis Locations',
      themes: JSON.stringify(['Marriage under pressure', 'Work-life balance', 'Reconnection', 'Health crisis', 'Choose family over career']),
      content: `CORE STORYLINE: Jasper and Elena's marriage is the emotional center of Book 1.

TIMELINE & KEY MOMENTS:
- Early chapters: Jasper is constantly traveling for BSS crises, missing family moments
- The Divide: Work colleagues notice Jasper's distraction. Elena stops calling when things break - she handles them herself
- Elena's Collapse: During dinner at home, Elena collapses. Jasper rushes her to hospital - the crisis he can't control
- Hospital Vigil: Jasper sits by Elena's bed, staring at monitors, realizing he's been missing everything
- Flashbacks to Dating: Terminal List-style rapid flashbacks to when they fell in love - beach wedding reception, barefoot, "I could do forever with you"
- Recovery Period: Jasper stays home, cooks breakfast, drives Grace to school, works from kitchen table
- Rekindling Intimacy: Working together on Elena's shelved project reopens intimacy - not just romance but real partnership
- The Test: Chicago contamination case - Jasper executes flawlessly but misses Grace's school recital that Elena said was important
- Rookie's Challenge: "You can't manage a crisis if you're living in one"
- Recommitment: Jasper's arc becomes about earning his place back in Elena's heart

EMOTIONAL CORE:
- Jasper fell for Elena at a beach wedding reception - she kicked off heels, walked barefoot, said "I could do forever with you"
- Elena deliberately holds back intimacy early in Book 1 even though both still want it - punishment/protection for his absence
- The marriage evolves from strain to reconnection when Jasper chooses family over career advancement

KEY SCENES:
- Coffee in Elena's favorite mug (chipped white one with faded red heart)
- Jasper kissing her temple before taking Grace to school
- Hospital flashback: photo in passport wallet of Elena and Grace on beach with kite
- Elena's hand tightening around his as monitors beep
- Jasper making real efforts to win Elena's trust and love back

RESOLUTION:
Marriage strengthens as Jasper commits to being present, not just physically but emotionally. Sets foundation for Book 2's deeper partnership.`,
      tags: JSON.stringify(['romance', 'marriage', 'central-arc', 'book1', 'health-crisis', 'reconnection']),
    },

    // ========== JASPER & ALEXANDRA PIERCE - TEMPTATION ==========
    {
      title: 'Jasper & Alexandra Pierce: The Temptation Arc',
      category: 'Tension',
      description: 'Alexandra Pierce, a mid-40s client, creates persistent temptation for Jasper during Elena\'s health crisis',
      characters: JSON.stringify(['Jasper Barrett', 'Alexandra Pierce', 'Elena Barrett']),
      timeline: 'Book 1 - Chapters 9-23',
      location: 'Boardrooms, Hospital, Hong Kong (avoided)',
      themes: JSON.stringify(['Temptation', 'Loyalty test', 'Professional boundaries', 'Marriage protection', 'Near-affair']),
      content: `TEMPTATION STORYLINE: Alexandra Pierce represents the professional world pulling Jasper away from family.

CHARACTER: Alexandra Pierce
- Mid-forties, composed, makes you think nothing could shake her
- Perfectly tailored, always polished
- Diamond studs, slim silver pen as signature items
- Black sheath dresses, white blazers, cream sheaths
- Red lacquered nails

KEY MOMENTS:

Chapter 9 - First Temptation:
Boardroom empty except Alexandra and Jasper after rehearsal. She leans in, asks direct questions, eyes fixed on him like he's the only one who matters. Jasper feels the pull but leaves.

The Intrusive Flash:
Right before Elena collapses, Jasper has brief intrusive flash of what it would have looked like if he'd gone further with Alexandra. Guilt follows immediately.

Hospital Arrival:
Alexandra appears at hospital, perfectly tailored even at midnight, carrying discreet arrangement of lilies. Offers to postpone Asia trip. The room cools when she enters.

The Texts Begin:
Alexandra starts texting persistently:
- Photo of her in slate-gray dress with champagne flute: "Your chair's still empty"
- "Final chance" with Contingency Plan attachment
- Continuing pressure even as Elena recovers

Mason's Bar Scene:
Jasper admits to Mason: "Alexandra... she's... persistent."
Shows Mason the texts, the mental images he keeps flashing to
Not just one conversation - an ongoing pull he's been trying to ignore

The Choice:
"I'm not going to Asia," Jasper tells Alexandra at hospital
Harper nods once; Sara's eyes say "good"
Alexandra places lilies, silver pen tapping her folder, leaves with practiced smile

EMOTIONAL CORE:
- Alexandra is "useful connector" but crosses professional lines
- Represents Jasper's old world of pure work focus
- Temptation isn't about her specifically - it's about the clarity and simplicity of work vs. messy complexity of family
- Jasper sees through it: choosing her would mean losing Elena forever

RESOLUTION:
Jasper closes the door. Doesn't go to Asia. Chooses family. Alexandra fades but represents ongoing pressure from professional world.

Harper later manages Asia crisis without him, proving he's not indispensable.`,
      tags: JSON.stringify(['tension', 'temptation', 'near-affair', 'book1', 'professional-boundaries', 'loyalty-test']),
    },

    // ========== ADDIE & HAWK - LOVE STORY ==========
    {
      title: 'Addie & Hawk: The Chessmaster and the War Goddess',
      category: 'Romance',
      description: 'How Addie met Hawk during her hospital collapse and their relationship growth as he becomes her anchor',
      characters: JSON.stringify(['Addie', 'Hawk']),
      timeline: 'Begins during Elena\'s hospitalization, develops through series',
      location: 'Hospital (first meeting), Vegas to Charlotte, BSS operations',
      themes: JSON.stringify(['Meeting at lowest point', 'Protection without smothering', 'Strategic partnership', 'Relocation for love', 'Grounding force']),
      content: `LOVE STORY: Addie and Hawk - The hospital origin and deepening partnership

HOW THEY MET: During Elena's Hospital Crisis

THE COLLAPSE:
Addie had been running full-tilt during Elena's hospitalization - coordinating with BSS, managing crisis responses, keeping Grace calm, supporting Jasper. She was the fixer who fixed everyone else.

But Addie burned too hot, too long. She collapsed in the hospital cafeteria from exhaustion.

HAWK'S ENTRANCE:
Hawk was there on unrelated business (security consultation for hospital). He saw her go down, moved immediately - calm, strategic, protective but not smothering.

While others panicked, Hawk:
- Cleared space around her
- Called for medical without creating scene
- Stayed present but gave her dignity
- Brought her coffee later when she was cleared
- Didn't ask what happened - just said "You're allowed to be human too"

THE CONNECTION:
Addie, who never lets herself be weak, met Hawk at her absolute lowest - and he didn't see weakness. He saw strength worth protecting.

Hawk recognized a kindred spirit: someone who runs multiple boards in their head, someone strategic and brilliant but burning out.

EARLY RELATIONSHIP:
- Hawk stayed in Vegas initially (Palisade Casino security role)
- They maintained long-distance while Addie's BSS role intensified
- He became her chessmaster in the corner - calm voice when she spiraled
- "That's your third move - are you ready for the fifth?"

THE BIG MOVE:
Hawk recognized Addie's increasing importance at BSS and her deep connection with Jasper's family circle. He chose to leave Vegas and move to Charlotte to support her fully - rare, selfless move for someone so rooted in control.

In Charlotte, Hawk:
- Consults on high-level security strategy for select BSS clients
- Runs his own boutique private security consultancy
- Sometimes drops strategic insights that hit Jasper hard
- Grounds Addie when she runs too hot

THEIR DYNAMIC:
- Addie is always in motion with BSS
- Hawk is stabilizing partner - intense, intelligent, strategic
- He grounds himself in one place (now Charlotte)
- Tension between her mobility and his rootedness
- He plays the long game, she plays rapid response

EMOTIONAL CORE:
- Hawk: "War Goddess, you're not a wrecking ball"
- He sees her clearly - brilliant, fierce, but also vulnerable
- Protective without possessive
- Strategic mind that matches hers
- He moved across country for her

PARALLEL TO ELENA/JASPER:
Elena has Jasper, Addie has Hawk - different men, different love, but both pushing them to grow.

RELATIONSHIP MOMENTS:
- Quiet cafeteria coffee after her collapse
- Late-night calls when she's spiraling on cases
- Him warning her she's three moves ahead but hasn't planned the fifth
- His decision to leave Vegas entirely
- Setting up Charlotte consultancy to be near her
- Standing beside her during major BSS operations`,
      tags: JSON.stringify(['romance', 'love-story', 'hospital-meeting', 'relocation', 'strategic-partnership', 'grounding-force']),
    },

    // ========== ADDIE & KENDRA - COMPLICATED PAST ==========
    {
      title: 'Addie & Kendra: The Romantic Past and Reconnection',
      category: 'Relationship',
      description: 'Addie and Kendra\'s complicated romantic history, their separation, and eventual healing with Chris\'s blessing',
      characters: JSON.stringify(['Addie', 'Kendra', 'Chris Donnelly', 'Elena Barrett', 'Hawk']),
      timeline: 'Past relationship, separation, Book 2-3 reconnection',
      location: 'Various - cabin trips, gyms, private moments',
      themes: JSON.stringify(['Past romance', 'Complicated history', 'Healing', 'Polyamorous exploration', 'Husband\'s acceptance', 'Truth and freedom']),
      content: `COMPLEX RELATIONSHIP: Addie and Kendra's past romance and path to healing

THE PAST RELATIONSHIP:
- Addie and Kendra were more than friends - they had genuine romantic/sexual relationship
- Not "just experimenting" - real emotional and physical intimacy
- Both identify as straight but their connection transcended simple labels
- The relationship was real and made them both better

THE BREAK:
When Chris entered Kendra's life, Addie pulled away completely. She thought she was:
- Respecting boundaries
- Protecting Chris and Kendra's relationship
- Doing the "right thing"

But pulling away created a wound neither healed. Kendra lost her playful side. Addie carried guilt and grief.

ADDIE'S FEAR (Love Option 4 Document):
"I'm terrified of breaking Chris and Kendra's relationship. They're solid, strong. If I step into that with all this old wreckage, I could tear it apart. That would kill me."

The most important thing to Addie is Chris & Kendra's happiness - she sees herself as potential threat.

CHRIS'S REVELATION (Beers Round 2):
Chris admits to Hawk:
"I know their thing was more than 'just friends.' At first it stung. But I've watched what losing Addie did to Kendra. It changed her. I hate it. If Addie being back - even if it means revisiting that - makes her whole again, I'm good with it. I want her whole."

Chris sees Addie not as threat but as missing piece of Kendra's heart.

HAWK'S CHESS STRATEGY:
Hawk orchestrates careful reconnection:
- Step 1: Elena (pawn taken - tests Addie's ability to be intimate again)
- Step 2: Chris (piece secured - husband is bridge not wall)
- Step 3: Addie and Kendra healing

The checkmate isn't fixing Addie's career - it's breaking her armor long enough to admit truth: she loves Kendra, and that truth frees her rather than destroys her.

ELENA'S ROLE:
Elena already knows the history. She:
- Playfully flirts with Addie to help her reconnect with intimacy
- Proposes experimental nights together
- Facilitates healing through trust and playfulness
- Book 2: Threesome with Jasper and Addie (separate storyline)
- Cabin trips where Elena, Addie, and Kendra explore together

THE CABIN WEEKENDS (Post-Baptism):
Three-night progression of Addie, Kendra, and Elena:
- Night One: Gentle reconnection, oral, toys, building trust
- Night Two: Full intimacy including penetration and anal exploration
- Night Three: Addie and Kendra alone, going "all the way"

Grab bag toys, public dinner teasing, complete vulnerability.
Everything on the table. Healing through intimacy.

KENDRA'S PLAYFUL RETURN:
As Addie reconnects, Kendra's playful side returns - the version Chris fell in love with. This proves the healing is working.

CHRIS'S ACCEPTANCE:
"The damage isn't Addie and me - it's Addie missing from Kendra's life. That's the wound."

Chris becomes ally in bringing them back together as sisters/anchors, not rivals.

EMOTIONAL CORE:
- Love that transcends simple labels
- Grief of chosen separation
- Fear of causing harm to those you love
- Husband who sees truth and chooses wholeness
- Healing through vulnerability and honesty
- Addie learning she's not a wrecking ball

RESOLUTION:
Addie and Kendra reconnect as sisters/anchors. The romantic/sexual element exists but within healthy boundaries that include Chris. All three are stronger for the honesty.

Addie with Hawk, Kendra with Chris, but their bond restored and honored.`,
      tags: JSON.stringify(['complicated-past', 'romantic-history', 'healing', 'polyamorous-elements', 'husband-acceptance', 'truth-freedom']),
    },

    // ========== KENDRA & CHRIS - ENGAGEMENT AND MARRIAGE ==========
    {
      title: 'Kendra & Chris Donnelly: Engagement and Marriage',
      category: 'Romance',
      description: 'Kendra and Chris\'s relationship, engagement at Hawk Foundation Gala, wedding in Texas, and becoming parents',
      characters: JSON.stringify(['Kendra', 'Chris Donnelly']),
      timeline: 'Book 2-3 progression',
      location: 'Charlotte to Texas to Boston',
      themes: JSON.stringify(['Engagement', 'Marriage', 'Faith integration', 'Parenthood', 'Cross-cultural Catholic families', 'Business partnership']),
      content: `ROMANCE STORYLINE: Kendra and Chris's journey to marriage and family

CHRIS DONNELLY PROFILE:
- Boston Catholic elite background
- Old-money East Coast family
- Connected to Catholic orders and institutions
- Finance/business world - Hawk Foundation connections
- Spiritual director: Msgr. Anthony Russo (officiates wedding)
- Measured, honest, emotionally intelligent
- Fitness-oriented - loves idea of family gym compound

THE RELATIONSHIP:
Chris pursued Kendra knowing she was complicated, brilliant, and worth the effort. He fell for her strength and intensity.

EARLY TENSION:
Chris knew about Kendra and Addie's past. Initially it stung - felt like Addie had piece of Kendra he couldn't touch.

GROWTH:
Over time, Chris realized: losing Addie wounded Kendra. The playful, whole version of Kendra he loved needed that friendship/bond healed.

THE ENGAGEMENT:
- Hawk Foundation Gala in NYC
- Perfect blend of Chris's financial world, Kendra's glamour, shared faith
- Public but intimate moment
- Full family and BSS circle present

WEDDING PREPARATIONS (Month 6):
- Travel to Texas with baby
- Balance new motherhood, wife role, BSS leadership
- Extended family and Catholic orders present
- Integration of Boston elite and Texas connections

THE WEDDING:
- Texas location (Kendra's roots)
- Msgr. Anthony Russo officiates
- Blends Chris's Boston Catholic elite world with Kendra's Texas BSS family
- Full wives club, BSS team, Catholic orders present
- Baby daughter present at wedding
- Addie and Hawk significant participants (godparents-to-be)

MARRIAGE DYNAMICS:
- Faith integration: Chris helped Kendra deepen Catholic practice
- Business partnership: Chris respects Kendra's BSS role
- Fitness together: Gym compound vision with Hawk and Addie
- Parenting partnership: Both hands-on with daughter
- Boston-Texas-Charlotte triangle: navigating multiple home bases

KENDRA'S DAUGHTER:
- Born before wedding (Month 5-6 timeline)
- Sleepless early weeks with Chris's support
- Addie and wives club rally around them
- Baby present at wedding ceremony
- Chris is devoted, hands-on father

THE ADDIE FACTOR:
Chris's ultimate acceptance: "If Addie being back makes Kendra whole, I'm good with it. More than good. I want it. Because I want her whole."

This acceptance strengthens marriage rather than threatening it.

CROSS-CULTURAL CATHOLIC BLEND:
- Chris brings Boston old-money Catholic institutional connections
- Kendra brings Texas Catholic family warmth
- Both integrate faith into business and family life
- Msgr. Russo bridges both worlds

EMOTIONAL CORE:
- Chris chose Kendra knowing her complexity
- He loves the playful, strong Kendra - wants that version back
- Secure enough in marriage to facilitate Addie healing
- Faith, family, fitness as three pillars
- Building life that honors all relationships

FUTURE VISION:
- Family compound in Charlotte with gym
- Close connection to Addie/Hawk
- Godparents to Grace and others
- BSS leadership continues for Kendra
- Faith-centered parenting`,
      tags: JSON.stringify(['romance', 'engagement', 'marriage', 'wedding', 'parenthood', 'faith', 'cross-cultural']),
    },

    // ========== HARPER'S ROMANCE - FIANCÉ STORYLINE ==========
    {
      title: 'Harper & Her Fiancé: The Mystery Man',
      category: 'Romance',
      description: 'Harper\'s relationship with her overseas fiancé Daniel Cruz, his surprise appearances, and their long-distance dynamic',
      characters: JSON.stringify(['Harper Vance', 'Daniel Cruz']),
      timeline: 'Book 2 - Wedding weekend, Baptism surprise',
      location: 'Overseas (finance), Savannah wedding, Charlotte baptism',
      themes: JSON.stringify(['Long-distance love', 'Mystery romance', 'Surprise appearance', 'Work-life balance', 'High-achieving couple']),
      content: `ROMANCE STORYLINE: Harper's fiancé and their long-distance relationship

DANIEL CRUZ PROFILE:
- Finance professional, overseas deals
- Transatlantic work requiring travel
- Polished, articulate, clearly successful
- Easy smile, closes deals in three languages
- Keeps personal details light in public
- Respects Harper's BSS role and intensity

THE MYSTERY:
Throughout Book 2, wives club and friends tease Harper about her "mystery fiancé" who no one has met:
- "Where's the fiancé?" - constant question
- "If he actually exists, bring him to baptism or we're staging intervention"
- Harper deflects: "Some mysteries are worth keeping"
- Video calls from overseas military posts

SAVANNAH'S WEDDING:
Harper attends solo - Daniel overseas closing finance deal
- Harper plays charming in his absence
- Elena's "arm candy" on dance floor
- Video call during reception - first time Jasper hears his voice
- Harper flushed but smiling after call

THE SURPRISE ARRIVAL (Baptism Lunch):
Door opens during baptism lunch at country club.
Daniel Cruz steps in - still in travel-wrinkled navy suit from transatlantic flight.

"Ladies, sorry to crash, but I caught last-minute flight."

IMPACT OF ARRIVAL:
- Wives circle exchanges raised eyebrows and knowing smiles
- "He actually exists!"
- First time whole group interacts with him
- Harper visibly relieved and happy
- By end of lunch, he's laughing with athletes and political players
- Fits into group despite being outsider

THEIR DYNAMIC:
- Both high-achieving professionals
- Long-distance trust and independence
- Harper dodges questions to protect privacy
- Daniel makes grand gestures (surprise flight)
- Mutual respect for demanding careers
- He understands her BSS intensity

EMOTIONAL CORE:
- Harper fiercely protects this relationship
- Mystery element shields it from scrutiny
- Daniel's surprise appearance shows commitment
- Long-distance requires deep trust
- Both sacrifice for careers but prioritize each other

CONNECTION TO MAIN STORY:
- Shows Harper has life outside BSS
- Parallels Jasper/Elena work-life balance struggle
- Proves high-achieving women can have both
- Adds dimension to Harper's character

FUTURE TRAJECTORY:
- Marriage likely in later books
- How will COO role and finance career blend?
- Children possible but not immediate priority
- Miami-based life as Harper transitions to COO`,
      tags: JSON.stringify(['romance', 'long-distance', 'mystery', 'surprise', 'high-achievers', 'book2']),
    },

    // ========== POLYAMOROUS DYNAMICS - ELENA/ADDIE/KENDRA ==========
    {
      title: 'Elena, Addie & Kendra: The Cabin Weekends',
      category: 'Relationship',
      description: 'The three-night cabin progression where Elena facilitates healing between Addie and Kendra through intimate exploration',
      characters: JSON.stringify(['Elena Barrett', 'Addie', 'Kendra']),
      timeline: 'Book 2 - Post-Baptism weekend',
      location: 'Mountain cabin (North Carolina)',
      themes: JSON.stringify(['Healing through intimacy', 'Female friendship', 'Sexual exploration', 'Trust building', 'Polyamorous elements', 'Vulnerability']),
      content: `INTIMATE STORYLINE: Three-night cabin progression for healing

CONTEXT & SETUP:
After baptism weekend, Elena orchestrates three-night cabin trip to facilitate Addie and Kendra's reconnection. This happens with Jasper's knowledge and Chris's blessing.

Timing: Was supposed to happen two weeks after promise ring incident, but delayed.

PARTICIPANTS:
- Elena (pregnant, confident, in control - she leads)
- Addie (healing from guilt and separation)
- Kendra (reclaiming playful side)

THE DRIVE UP:
- Three women, light banter, scenic overlook for pictures
- Kendra in leggings, sports bra, cropped hoodie
- Addie in fitted jeans, leather jacket
- Elena in flowy dress, cardigan
- Sexual tension building subtly

NIGHT ONE - GENTLE RECONNECTION:
Setting: Cabin with fireplace, wine for Addie/Kendra, mocktail for pregnant Elena

Progression:
- Playful conversation about "who will last longest tonight"
- Addie and Kendra take turns undressing Elena
- Whispered compliments, "remember that night..." callbacks
- Oral play, gentle touching
- Toys introduced: vibrators, controlled exploration
- Multiple peaks for all three
- Emotional vulnerability as walls come down

Clothing: Matching robes, then nothing
Aftermath: Curled together, processing the healing

NIGHT TWO - GOING DEEPER:
The Grab Bag Game:
- Each woman draws a toy from bag
- Controllers swapped mid-dinner
- Public restaurant with remote-controlled toys active
- Addie draws plug, Kendra draws phone-controlled vibe
- Elena orchestrates the swap

Dinner Scene:
- All three barely holding composure
- Other diners oblivious
- Building anticipation and trust
- Returns to cabin highly aroused

Full Intimacy:
- Oral, penetration, toys, anal exploration
- Kendra's first time with anal (Addie's second)
- Complete vulnerability and trust
- All three reaching multiple peaks
- Laughter mixed with intensity
- "We might be trouble for each other"

NIGHT THREE - ADDIE & KENDRA ALONE:
Elena steps back, gives them private night

Setting: Just the two of them
- Black silk cami/boyshorts (Addie)
- Burgundy lace set (Kendra)
- Sheer chemise and pale pink teddy options

Complete intimacy:
- Everything from previous nights
- Going "all the way" without Elena present
- Healing the specific wound between them
- Reclaiming their connection
- No holding back

Emotional Resolution:
- Playful Kendra returns fully
- Addie releases guilt
- Their bond honored and restored

NEXT MORNING RITUALS:
Each morning:
- Elena wakes first, makes coffee
- Cold lake plunge together
- Splashing and laughter
- Casual intimacy continuing
- Processing previous night

TOYS USED:
- Remote-controlled vibrators
- Plugs (various sizes)
- Strap-on equipment
- Luxury massage oils
- Phone-app controlled devices
- "Grab bag" surprise element

EMOTIONAL CORE:
- Elena as confident facilitator
- Healing through vulnerability
- Trust building incrementally
- Laughter essential to process intensity
- All three stronger after
- Kendra's playful side returns (what Chris wanted)

AFTERMATH:
- Addie and Kendra relationship healed
- Can be sisters/anchors again
- Chris sees playful Kendra return
- Elena's role as healer/connector deepened
- Once-yearly tradition potentially established
- "Until it no longer seems right"

SECRECY:
Jasper knows (separate threesome with him and Addie/Elena exists)
Chris knows and blessed it
Hawk orchestrated the conditions
Rest of circle doesn't know details`,
      tags: JSON.stringify(['polyamorous', 'healing', 'intimacy', 'cabin-weekend', 'female-friendship', 'sexual-exploration', 'book2']),
    },

    // ========== ELENA, JASPER & ADDIE THREESOME ==========
    {
      title: 'Elena, Jasper & Addie: The Trust Threesome',
      category: 'Relationship',
      description: 'Elena-led threesome with Jasper and Addie that deepens trust and intimacy without creating favoritism',
      characters: JSON.stringify(['Elena Barrett', 'Jasper Barrett', 'Addie']),
      timeline: 'Book 2 - Chapter 7 or 15 (post-reconnection)',
      location: 'Elena and Jasper\'s home',
      themes: JSON.stringify(['Trust deepening', 'Elena-led', 'Playful intimacy', 'No favoritism', 'Mentorship foundation', 'Adventurousness']),
      content: `INTIMATE STORYLINE: Elena, Jasper, and Addie's trust-building threesome

CONTEXT:
This happens AFTER Elena and Addie's connection deepens post-Book 1, but BEFORE Elena is pregnant (or early pregnancy).

This is NOT about the sex - it's about trust, playfulness, and Elena's confidence in her marriage and her relationship with Addie.

THE LEAD-UP (Book 2):
Building sexual tension between Elena and Addie:
- Straight but curious vibe
- Locker room moment
- Party prep flirtation
- Addie borrowing Elena's clothes
- Shared gym sessions
- "You have no idea how much she can be" (callback line)

THE SETUP:
Chapter 7 or 15: Elena and Addie have playful night at Elena's place after event. They're prepping for client dinner or winding down. Lingering chemistry from Book 1 moments (seeing each other naked, inside jokes, physical closeness).

Jasper comes home late from meeting. The mood turns flirtatious. Elena leads the moment.

ELENA'S CONTROL:
This is Elena-led entirely. She:
- Initiates the conversation
- Sets boundaries clearly
- Orchestrates the experience
- Ensures no one feels used or secondary
- Maintains her position as Jasper's primary

Not replacement for their bond - indulgence within secure marriage.

THE EXPERIENCE:
- All three fully consenting and enthusiastic
- Playful, adventurous energy
- Elena directing action
- Jasper focused on both women
- Addie honored and respected
- Multiple configurations explored
- Laughter and intensity balanced

EMOTIONAL SAFETY:
- Framed as "last playful adventure before baby comes"
- Elena's pregnancy timeline makes this time-limited
- Trust exercise, not ongoing arrangement
- Addie's loyalty and competence already proven

AFTERMATH (Next Morning):
Elena broaches Jasper mentoring Addie - calm, matter-of-fact, strategic way.

NOT because of the threesome.
BECAUSE Elena recognizes Addie's:
- Strategic skill set
- Loyalty to their family
- Potential for higher-level work
- Need for mentorship Jasper can provide

The intimacy makes the mentorship more relaxed and teasing in tone, but it's professionally motivated.

IMPACT ON RELATIONSHIPS:

Jasper & Elena:
- Marriage strengthened by trust
- Elena's confidence in their bond proven
- Playfulness and adventure reaffirmed

Jasper & Addie:
- Mentorship begins with deeper foundation
- Professional respect combined with personal trust
- Teasing dynamic but clear boundaries

Elena & Addie:
- Deepened friendship and sisterhood
- Sexual tension acknowledged and resolved
- Can work together without unresolved attraction

WHAT IT'S NOT:
- Not ongoing polyamory
- Not favoritism toward Addie
- Not replacement for marriage
- Not secret from Hawk (Addie's partner)
- Not undermining any relationship

WHAT IT IS:
- Trust exercise
- Adventurous exploration within secure bonds
- Elena's gift to all three
- Foundation for mentorship
- Proof of marriage strength

CALLBACK MOMENTS:
Later references subtle:
- Teasing glances during BSS operations
- "You have no idea how much she can be"
- Addie's comfort in their home
- Mentorship dynamic includes inside jokes

PARALLEL TO CABIN WEEKENDS:
Elena facilitates healing and connection through intimate vulnerability - does this for Addie/Kendra too. This is her gift and skill.`,
      tags: JSON.stringify(['threesome', 'trust', 'Elena-led', 'no-favoritism', 'mentorship-foundation', 'book2']),
    },

    // ========== BELLA'S RELATIONSHIPS ==========
    {
      title: 'Bella\'s Romantic Journey',
      category: 'Romance',
      description: 'Bella\'s relationships, dating life, and connections within the BSS/POH circle',
      characters: JSON.stringify(['Bella']),
      timeline: 'Series-long development',
      location: 'Charlotte, various BSS locations',
      themes: JSON.stringify(['Finding love', 'Professional growth', 'Family connection', 'Loyalty', 'Ranch life']),
      content: `BELLA'S ROMANTIC ARC:

BACKGROUND:
Bella is younger member of BSS circle, deeply loyal to Jasper's family. She adores the kids - chasing them in yard, teaching tricks on horseback at the ranch.

For Jasper: Bella is proof he can trust younger team to both protect and love what matters to him.

PERSONALITY:
- Loyal, protective
- Connected to ranch/horses
- Natural with children
- Integrates into family dynamics
- Treated as equal by Addie (not as kid)

RELATIONSHIP SEARCH:
Bella seeks partner who:
- Understands BSS lifestyle and demands
- Respects her ranch connection
- Values family as she does
- Can handle her fierce loyalty
- Appreciates her youth without dismissing her

POTENTIAL CONNECTIONS:
- Could connect with someone from BSS team
- Ranch community connections
- Someone who shares outdoor/fitness lifestyle
- Needs equal who won't be intimidated by BSS intensity

EMOTIONAL NEEDS:
- Wants to be seen as capable adult
- Values being treated as equal (Addie's gift to her)
- Seeks stability while maintaining adventure
- Ranch as grounding force

SERIES DEVELOPMENT:
Details to be developed further as series progresses. Bella's romantic arc is open for growth.`,
      tags: JSON.stringify(['romance', 'development', 'younger-character', 'ranch-life', 'family-connection']),
    },

    // ========== MASON'S RELATIONSHIPS ==========
    {
      title: 'Mason\'s Romantic Life',
      category: 'Romance',
      description: 'Mason\'s relationship status, dating life, and role as mentor figure',
      characters: JSON.stringify(['Mason']),
      timeline: 'Background to main series',
      location: 'Various',
      themes: JSON.stringify(['Mentor figure', 'Unconditional love', 'Tough love', 'Work-life wisdom', 'Personal sacrifice']),
      content: `MASON'S ROMANTIC PROFILE:

ROLE IN STORY:
Mason is tough-love mentor to Jasper. Stan Hurley type: "You're going to burn out your people, Barrett."

RELATIONSHIP PHILOSOPHY:
- Knows cost of work-life imbalance
- Warns about "overworking people until they break"
- Speaks of "unconditional love" with weight of experience
- Understands what relationships require

MENTORSHIP MOMENTS:
- Gives Jasper "two flashback trigger" advice
- Tells him about early relationship with Elena, Grace's birth
- Warning: "Don't screw this up"
- Has seen relationships destroyed by work obsession

PERSONAL LIFE:
- Likely has past relationship regrets
- May be divorced or widowed
- Speaks from experience about loss
- "Unconditional love" comment suggests deep personal cost
- Uses own mistakes to guide Jasper

RIDGE CONNECTION:
When Ridge asks for balance ("girl I love and work I enjoy but need more balance"), Mason's comment about overworking people hits Jasper hard.

Mason sees pattern repeating - doesn't want Jasper making his mistakes.

EMOTIONAL DEPTH:
- Gruff exterior hides deep wisdom
- Has loved and lost
- Prioritizes others' relationships even if his failed
- Mentor love is form of unconditional care

MYSTERY:
Specific romantic history left somewhat mysterious - adds gravitas to his warnings.

His past pain makes his advice to Jasper more urgent and real.`,
      tags: JSON.stringify(['mentor', 'tough-love', 'relationship-wisdom', 'past-regrets', 'unconditional-love']),
    },

    // ========== SELENE'S RELATIONSHIPS ==========
    {
      title: 'Selene\'s Independence and Relationships',
      category: 'Relationship',
      description: 'Selene\'s closeness to Addie and Hawk while maintaining fierce independence',
      characters: JSON.stringify(['Selene', 'Addie', 'Hawk']),
      timeline: 'During POH and BSS development',
      location: 'POH compound, various operations',
      themes: JSON.stringify(['Independence', 'Not needing rescue', 'Close bonds without neediness', 'Professional respect', 'Solo strength']),
      content: `SELENE'S RELATIONSHIP DYNAMICS:

CORE TRAIT: Independence Without Isolation

CLOSENESS WITH ADDIE & HAWK:
- Deep bonds with both
- Addie: Kindred spirit understanding
- Hawk: Quiet camaraderie, mutual respect
- She values bonds but never leans on them

KEY DIFFERENCE FROM OTHERS:
"Addie leans heavily on both Hawk and Selene. Selene, while close, never leans back - she doesn't need rescuing. She values the bond but protects her independence."

WITH HAWK SPECIFICALLY:
- Hawk respects Selene's composure
- He doesn't hover over her like he might with Bella or Kendra
- Quiet camaraderie forged in between moments when Addie is offstage
- She can handle herself - he knows it

INTERNAL CONFLICT:
Selene is torn:
- Loves closeness with Addie and Hawk
- Those relationships give belonging and power
- But senses if she clings too tightly, she'll become needy or replaceable
- Works to build her own without neediness

WANTING HER OWN:
During POH and BSS craziness, Selene:
- Observes Addie's intensity and growth
- Sees relationships forming around her
- Wants something similar but entirely her own
- Refuses to be defined by proximity to power couple

NOT "INTO KIDS":
Unlike others who gravitate to Grace and family moments, Selene:
- Is moved by Addie/Hawk's faith journey for Grace
- But not particularly "into kids" herself
- Finds meaning in other ways

RELATIONSHIP TO POH:
- Close to Addie as POH develops
- But style differs from POH intensity
- Needs space from constant family/compound energy

ROMANTIC LIFE:
Details TBD - but likely:
- Values independence highly
- Would choose partner who respects space
- Not looking to be saved or rescued
- Equal partnership only
- Professional respect essential

EMOTIONAL CORE:
Strength through independence. Bonds that enhance rather than define. Refusing neediness while honoring connection.`,
      tags: JSON.stringify(['independence', 'no-rescue', 'professional-respect', 'solo-strength', 'complicated-bonds']),
    },
  ];

  // Create all storylines
  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: {
        projectId: project.id,
        title: storyline.title
      }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: {
          projectId: project.id,
          ...storyline,
        }
      });
      console.log(`✓ Created: ${storyline.title}`);
    } else {
      // Update existing to ensure latest content
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline,
      });
      console.log(`✓ Updated: ${storyline.title}`);
    }
  }

  console.log("\n========================================");
  console.log("ROMANCE & TENSION EXTRACTION COMPLETE");
  console.log("========================================\n");

  const stats = await prisma.storyline.count({
    where: {
      projectId: project.id,
      OR: [
        { category: 'Romance' },
        { category: 'Tension' },
        { category: 'Relationship' }
      ]
    }
  });

  console.log(`Total Romance/Tension/Relationship Storylines: ${stats}`);

  // Show breakdown
  const romance = await prisma.storyline.count({
    where: { projectId: project.id, category: 'Romance' }
  });
  const tension = await prisma.storyline.count({
    where: { projectId: project.id, category: 'Tension' }
  });
  const relationship = await prisma.storyline.count({
    where: { projectId: project.id, category: 'Relationship' }
  });

  console.log(`\nBreakdown:`);
  console.log(`  Romance: ${romance}`);
  console.log(`  Tension: ${tension}`);
  console.log(`  Relationship: ${relationship}`);

  await prisma.$disconnect();
}

main().catch(console.error);
