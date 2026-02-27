import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Book 2 EXPANDED - 53 chapters
// Based on document content: BSS crises, Kendra integration, Harper/Ethan arc,
// Elena pregnancy journey, Grace storylines, Claire coaching, wedding prep
// PLUS: Postpartum crisis arc, Addison's "warrior goddess" transformation
const book2Chapters = [
  // ============================================
  // PART 1 — FOUNDATIONS & NEW TENSIONS (Ch 1-8)
  // Tone: New season, new players, seeds planted
  // ============================================
  { number: 1, title: 'New Season, Old Habits', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Jasper at his desk early — juggling three fresh conflicts: NFL ownership issue, a global supply chain mess, and an IP breach. Claire Ashford arrives for her first day. Jasper reflects on why he hired her: after Elena\'s health scare, he realized his team was running on adrenaline and willpower alone. He found Claire through a Pentagon contact — she\'d built mental performance programs for Navy SEALs and Fortune 100 executives. Former Division I swimmer and Olympic hopeful who blew out her shoulder junior year. Instead of quitting, she reinvented herself as an endurance athlete — became an Ironman World Champion. Then pivoted to sports psychology and high-stakes corporate performance. "She doesn\'t fix broken people," his contact said. "She makes elite performers sustainable." Exactly what BSS needs.' },

  { number: 2, title: 'The Lunch with Elena', pov: 'Elena Barrett', location: 'Charlotte', synopsis: 'Elena has stepped back into real estate + a non-profit role, energized and more confident since the Wife Club Zoom in Book 1. Harper meets Ethan for the first time on-page — they\'re grabbing coffee across the restaurant, heads close together. Sara mentions Kendra — "placed third in regionals, she\'s a machine." Elena watches Harper with Ethan, notices she seems lighter, less guarded. But also distracted.' },

  { number: 3, title: 'Sara\'s Pool Party', pov: 'Elena Barrett', location: 'Sara\'s House', synopsis: 'Pool/BBQ at Sara\'s. Kendra, Dylan, Tasha, and Eli introduced — the elite athlete crew. Kendra and Addison click right away, talking gym programming and training splits. Addison floats the idea of Kendra training them both. Elena watches their easy chemistry — the way Kendra makes Addison laugh, the way Addison touches Kendra\'s arm when she talks. First hint of jealousy. Grace splashes in the pool with the other kids. Jasper arrives late, still on a call.' },

  { number: 4, title: 'Wives\' Circle Lunch', pov: 'Elena Barrett', location: 'Charlotte Rooftop', synopsis: 'In-person rooftop lunch with the full circle — Caroline, Ronnie, Julia, Savannah, Madison all in town. Harper teased about "mystery man" (Ethan). Two crises pop for Jasper: European client tied to African coup, NFL agent crisis PR request. Addison announces Kendra is now their "joint trainer" — she\'s bringing her into their world. Elena feels a flicker of being replaced. Madison notices: "You okay?" Elena deflects, but the feeling lingers.' },

  { number: 5, title: 'Shower Reveal', pov: 'Jasper/Elena', location: 'Oak Watch', synopsis: 'Playful intimacy between Elena & Jasper in the shower — the reconnection from Book 1 is holding. Twist: They\'ve been quietly trying for baby #2... and it\'s happened. Before they can savor it, Jasper gets pulled into multiple conflicts. Elena watches him dress and leave, hand on her stomach. "We\'ll celebrate properly," he promises. She believes him this time.' },

  { number: 6, title: 'NFL War Room', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'NFL ownership crisis explodes — public feud between owners, media frenzy, sponsor threats. Jasper in full command: whiteboards covered in stakeholder maps, timeline of leaks, pressure points. Harper runs media monitoring but keeps checking her phone. Addison shadows Jasper, taking notes, watching how he reads the room. Kendra arrives with coffee and stays — fascinated by the controlled chaos. First glimpse of her curiosity about this world.' },

  { number: 7, title: 'Africa Briefing', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'African coup subplot intensifies — European client has assets in the region, needs extraction planning. Hawk on secure video from the field, providing ground truth. The stakes are real: lives, not just money. Jasper brings Addison into the strategy session — her first exposure to the hard edge of BSS work. She handles it. Harper misses the meeting, claiming a schedule conflict. Jasper notices.' },

  { number: 8, title: 'Grace\'s World', pov: 'Grace', location: 'School/Oak Watch', synopsis: 'Grace at school — excited to tell Miss Evie and Miss Donnelly that "Mommy\'s having a baby!" The teachers exchange knowing looks. At home, Grace asks Elena a hundred questions: "Will the baby sleep in my room? Can I pick the name? Will Daddy be here when the baby comes?" Elena reassures her, but Grace catches the hesitation. That night, Grace prays: "Please let Daddy be here this time."' },

  // ============================================
  // PART 2 — ESCALATION & SHIFTING ROLES (Ch 9-18)
  // Tone: Crises heat up, Harper slipping, Kendra rising
  // ============================================
  { number: 9, title: 'Claire\'s Assessment', pov: 'Claire', location: 'The Forge', synopsis: 'Claire\'s first POV chapter. She reflects on her journey — the shoulder injury that ended her Olympic swimming dreams at 20, the dark year that followed where she nearly gave up entirely. Then her college coach suggested triathlon — "You can\'t sprint anymore, but you can endure." She threw herself into it, learned to rebuild around limitations instead of fighting them. Four years later: Ironman World Champion in Kona. But standing on that podium, she realized winning wasn\'t what saved her — understanding the mental game was. PhD at Stanford, consulting for SEAL Team Six, then a decade with CEOs who ran companies like combat operations. She sees BSS clearly: brilliant people redlining their nervous systems. Jasper\'s blind spot is thinking he can outwork any problem. Harper\'s hiding something — her focus is fractured. But Addison... Claire watches her in a meeting, the way she tracks conversations like a chess player seeing three moves ahead. "Interesting," she murmurs. Kendra around the office more now. Multiple projects to work on.' },

  { number: 10, title: 'Harper\'s Reveal', pov: 'Harper', location: 'Oak Watch', synopsis: 'Harper formally introduces Ethan to Jasper and Elena — a private dinner, just the four of them. Jasper skeptical but polite — protective older brother energy. Elena likes him — charming, attentive to Harper, clearly smitten. Harper nervous, wanting their approval. Over dessert, Jasper asks Ethan about his work (finance, private equity). The conversation is cordial but loaded. After they leave, Jasper to Elena: "He seems solid. But she\'s different around him." Elena: "Different good or different bad?" Jasper: "I don\'t know yet."' },

  { number: 11, title: 'Kendra\'s Regional', pov: 'Elena Barrett', location: 'CrossFit Venue', synopsis: 'Kendra competes in regional CrossFit competition. Addison can\'t attend — away on a work trip with Jasper (Africa crisis). Elena goes to support Kendra instead, bringing Grace. They watch Kendra dominate: clean-and-jerks, box jumps, a grueling chipper. Grace is mesmerized. Elena and Kendra bond over post-competition dinner — wine, laughter, real talk. Kendra opens up: "I don\'t know if I belong in their world. I\'m just a gym rat." Elena: "You\'re more than that. Addison sees it. So do I."' },

  { number: 12, title: 'Three Fires at Once', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Jasper juggling: NFL at peak media frenzy, coup destabilizing client region, Asian tech firm with IP theft. Harper trying to help but Ethan distractions pull her focus — she\'s texting during briefings, missing details. Addison picks up the slack without being asked. Kendra, officially helping with logistics now, asks smart questions. Claire observes from the corner, taking notes.' },

  { number: 13, title: 'Claire\'s Intervention', pov: 'Claire', location: 'The Forge', synopsis: 'Claire pulls Harper into her office after a missed deadline. No judgment — just observation. "You\'re splitting your attention, and it\'s showing." Harper defensive at first, then breaks: "I don\'t know how to be good at both." Claire gets it — she lost herself in a relationship once too, a fellow swimmer during rehab. She gave up pieces of herself to keep him happy, and by the time she realized it, she\'d lost both the relationship and her sense of self. "I rebuilt from scratch," Claire tells Harper. "You don\'t have to. Love doesn\'t have to cost you your edge — but you have to learn to hold both." They start weekly sessions: compartmentalization techniques she developed with Special Forces operators, focus triggers, reclaiming identity. Harper asks, "Did you ever find someone who fit?" Claire smiles. "Still looking. But I know who I am now. That\'s the foundation."' },

  { number: 14, title: 'The Washout', pov: 'Addison', location: 'The Forge', synopsis: 'New analyst Marcus arrives — Harvard MBA, Goldman Sachs pedigree, perfect resume. Jasper puts him on the NFL crisis. By day three, Marcus is cracking: can\'t handle the pace, the ambiguity, the pressure of real-time decisions with incomplete information. He freezes in a client call. Jasper covers for him, but everyone sees. Later, Marcus quits, citing "not a good fit." Addison watches him clean out his desk. Kendra, beside her: "That could have been me." Addison: "No. You\'re different." The contrast underscores what BSS actually requires — and what Addison and Kendra have.' },

  { number: 15, title: 'Kendra Wins', pov: 'Multiple', location: 'Charlotte', synopsis: 'Kendra wins her Games division — big celebration at a Charlotte restaurant. Even Jasper toasts her: "To Kendra — proof that champions adapt." Elena, glowing and visibly pregnant now, declares: "We\'re stealing her for the office full-time." Addison and Kendra inseparable at the party — sharing food, finishing each other\'s sentences. Elena watches them, a complex mix of pride and something else she can\'t name.' },

  { number: 16, title: 'First Ultrasound', pov: 'Jasper/Elena', location: 'Hospital', synopsis: 'Jasper makes it to the ultrasound — unlike with Grace. Elena squeezes his hand as the heartbeat fills the room. "It\'s a boy," the tech says. Jasper tears up, surprising himself. Elena: "Lucas. If that\'s okay." It was her grandfather\'s name. Jasper: "Lucas Barrett." They sit in the car afterward, just breathing. For once, no phones buzz. No crises intrude. Just them, and the future.' },

  { number: 17, title: 'Elena\'s Push', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena insists Jasper step up for Harper — "She\'s struggling and you\'re not seeing it." Jasper starts mentoring Addison more formally — lunch meetings, case reviews, explaining his thinking. Elena announces pregnancy to close friends at a small dinner. She also admits to Addison she\'s noticed her closeness with Kendra — "I\'m not jealous. I just... I want to understand." Addison reassures her: "You\'re family. Nothing changes that."' },

  { number: 18, title: 'The Fixer\'s Eye', pov: 'Claire', location: 'The Forge', synopsis: 'Claire observes Addison in a strategy session — notices how she reads the room, anticipates problems before they surface, connects dots others miss. It reminds her of the best operators she worked with at DEVGRU — not the loudest ones, but the ones who saw the whole battlefield. After the meeting, Claire pulls her aside: "You see things. Most people react to fires. You smell the smoke before it starts." Addison, surprised: "I just notice patterns." Claire: "I spent a decade with SEALs. The ones who survive aren\'t the strongest — they\'re the ones who read situations before they unfold. You have that instinct. It\'s rare." She shares her philosophy: crisis management isn\'t about putting out fires, it\'s about seeing which sparks will catch. "Jasper\'s brilliant at the fix. You could be brilliant at the prevent." They begin working together — scenario exercises from her Pentagon days, crisis simulations, teaching Addison to trust her gut and articulate what she sees.' },

  // ============================================
  // PART 3 — COLLISIONS & RESETS (Ch 19-30)
  // Tone: High stakes, personal turning points
  // ============================================
  { number: 19, title: 'Engagement Party Chaos', pov: 'Multiple', location: 'Charlotte', synopsis: 'Harper & Ethan announce engagement — same week Elena\'s pregnancy news hits wider circle. NFL agent joins BSS team part-time (crisis resolved, relationship built). Kendra assists on a sports sponsorship deal, nails it — her athlete credibility opens doors. The party is glamorous but chaotic: caterer issues, last-minute guest changes. Addison handles it all seamlessly. Ethan watches, impressed. "She\'s something else." Harper, proud: "She\'s family."' },

  { number: 20, title: 'Ethan Meets BSS', pov: 'Harper', location: 'The Forge', synopsis: 'Harper brings Ethan to The Forge for the first time — a calculated risk. She wants him to understand her world. He watches a crisis briefing from the observation room: the intensity, the speed, the stakes. Afterward, he\'s quiet. "That\'s what you do every day?" Harper nods. "And you want me to just... wait at home?" Harper: "I want you to understand. And then decide if you can handle it." He can. But it\'s the first real test.' },

  { number: 21, title: 'Finding Their Footing', pov: 'Claire', location: 'The Forge/Charlotte', synopsis: 'Claire reflects on why this team matters to her. After years of consulting — Pentagon contracts, Fortune 100 boardrooms, operators who went home to empty apartments — she\'d started to wonder if sustainable excellence was even possible. Most high performers burned out or burned relationships. BSS is different: Jasper chose family over a client and it made him better, not worse. Harper in session: she\'s regaining focus, learning to hold both worlds. "I forgot I was good at this before him." Claire: "You didn\'t forget. You just stopped trusting yourself." Meanwhile, Addison runs a mock crisis scenario — nails the read, anticipates second-order effects, even catches something Claire missed. Later, Claire to Jasper privately: "Harper\'s finding her balance. She\'ll be sharper than before. And Addison? She\'s not just coordinator material anymore. She thinks like us. Maybe better." Jasper nods. "Elena saw it first. She always does."' },

  { number: 22, title: 'Kendra\'s First Case', pov: 'Kendra', location: 'The Forge', synopsis: 'Kendra\'s first real case assignment — not logistics, actual analysis. A sports agency client has a scandal brewing: star athlete with a secret. Kendra knows this world, knows the pressures, knows how to read between the lines. She spots the real issue before anyone else: it\'s not the scandal, it\'s who\'s leaking it. Her insight saves the client millions. Jasper: "Where did that come from?" Kendra: "I\'ve seen locker room politics. This is the same game, bigger stakes." Addison beams.' },

  { number: 23, title: 'Baby Shower', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'The Wives\' Circle throws Elena a baby shower — all five wives fly in. Caroline brings a onesie that says "Future Diplomat." Ronnie brings a designer diaper bag. The house is full of laughter, champagne (sparkling cider for Elena), and stories. Addison organizes everything flawlessly. Kendra helps with setup, feeling more part of the family than ever. Grace is flower girl for the day, scattering petals from a basket. Elena, surrounded by her people, realizes how much has changed since her collapse. She\'s not alone anymore.' },

  { number: 24, title: 'Piling On', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'All conflicts converge: NFL nightmare final negotiation, Africa coup client extraction complete (Hawk brings the team home), Tech COO scandal hits media. Claire runs war-room coaching day — keeping everyone\'s heads clear under pressure. Kendra speaks up in a meeting — her comment about "controlling the narrative through athlete networks" catches Jasper off guard. It\'s exactly right. He looks at her differently after that.' },

  { number: 25, title: 'Claire Works with Jasper', pov: 'Claire', location: 'The Forge', synopsis: 'Claire finally gets Jasper in a one-on-one. He resists at first — "I don\'t need coaching." Claire: "Everyone needs perspective. Even the best." She walks him through his patterns: the tendency to absorb every problem, the belief that rest is weakness, the fear that slowing down means falling behind. "You almost lost your wife because you couldn\'t stop." Jasper, quiet: "I know." Claire: "Knowing isn\'t changing. What are you going to do different with Lucas?" He doesn\'t have an answer. But the question lands.' },

  { number: 26, title: 'Addison & Kendra: The Gym', pov: 'Addison', location: 'Gym/Charlotte', synopsis: 'Addison and Kendra\'s first real workout together — Kendra\'s domain. Kendra pushes Addison hard: deadlifts, box jumps, rowing intervals. Addison struggles but doesn\'t quit. Afterward, stretching, sweat-soaked and exhausted, they talk. Really talk. About pressure, about proving themselves, about the men who underestimate them. Kendra: "I\'ve never had a friend who gets it." Addison: "Neither have I." Something shifts between them. It\'s not just friendship anymore.' },

  { number: 27, title: 'Harper\'s Bachelorette', pov: 'Harper', location: 'Miami', synopsis: 'The Wives\' Circle plans Harper\'s bachelorette — Miami, two days of glamour and chaos. Elena can\'t fly (too pregnant), but she Zooms in for key moments. Addison and Kendra come as "honorary wives." Pool parties, a yacht, dancing until 3 AM. Harper, usually guarded, lets loose. She tells Addison: "I was afraid to let someone in. Ethan kept showing up anyway." Addison: "That\'s how you know." Later, a quiet moment between Addison and Kendra on the yacht deck. Just looking at stars. Nothing needs to be said.' },

  { number: 28, title: 'Addison\'s Trial by Fire', pov: 'Addison', location: 'The Forge', synopsis: 'Addison runs point on NFL media coordination alone — Jasper pulled to another crisis, Harper on bachelorette recovery. The pressure is immense: live interviews, hostile reporters, a client who panics. Addison holds the line. She uses everything Claire taught her: anticipate, adapt, don\'t react emotionally. Harper calls mid-crisis to check in. Addison: "I\'ve got it." And she does. Jasper reviews the after-action: "Flawless." Addison: "I had good teachers."' },

  { number: 29, title: 'Grace Prepares', pov: 'Grace', location: 'Oak Watch', synopsis: 'Grace preparing for baby Lucas\'s arrival. She\'s decorated his room, picked out books to read him, practiced holding a doll. But she\'s also scared — what if Daddy leaves again? What if Mommy gets sick? Elena finds her crying one night. "What if you forget about me?" Elena holds her: "Impossible. You\'re my first miracle. Lucas is my second. But you came first. Always." Grace sleeps in Elena\'s bed that night, hand on her mother\'s belly, feeling Lucas kick.' },

  { number: 30, title: 'The Vulnerability', pov: 'Addison/Kendra', location: 'Addison\'s Apartment', synopsis: 'Late night at Addison\'s apartment after a long week. Wine, takeout, decompression. The conversation turns personal. Kendra admits she\'s never felt like she belonged anywhere — always the athlete, never the insider. Addison admits she\'s terrified of success — what if she rises and then falls? They\'re sitting close. Kendra reaches for Addison\'s hand. "I\'m glad I found this. Found you." The kiss happens naturally. Soft. Testing. Then deeper. They pull back, breathless. "What are we doing?" Addison whispers. Kendra: "I don\'t know. But I don\'t want to stop."' },

  // ============================================
  // PART 4 — LUCAS & THE WEEKEND (Ch 31-45)
  // Tone: Birth, culmination, celebration
  // ============================================
  { number: 31, title: 'The Waiting Room', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Elena goes into labor three weeks early. Jasper races from The Forge — traffic, red lights, his heart pounding. He makes it. Hours in the waiting room: Harper, Addison, Kendra, Sara all there. Grace asking questions, trying to be brave. The inner circle holds vigil. Jasper paces. Claire texts: "Breathe. You\'re exactly where you need to be." He reads it three times.' },

  { number: 32, title: 'Lucas Arrives', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Lucas Barrett is born. 7 lbs, 3 oz, healthy lungs. Jasper holds his son for the first time — the weight of him, the reality. Elena exhausted but radiant: "He has your eyes." Grace meets her baby brother, terrified to hold him until Jasper guides her arms. "You\'re his big sister. He\'s going to look up to you." Addison and Kendra watch from the doorway. Elena squeezes Addison\'s hand in gratitude.' },

  { number: 33, title: 'The First Week', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'The chaos of a newborn. Lucas doesn\'t sleep. Neither do Jasper and Elena. But this time, Jasper stays. He does the 3 AM feedings, changes diapers, learns the rhythm. Grace helps where she can — fetching diapers, singing to Lucas. The Wives\' Circle organizes a meal train. Addison and Kendra come by daily. The house is full. Elena, exhausted but happy, tells Jasper: "This is what I wanted. You, here."' },

  // ============================================
  // PART 4B — POSTPARTUM CRISIS & ADDIE'S RISE (Ch 34-41)
  // Tone: Elena's darkness, Addison becomes the warrior goddess
  // ============================================
  { number: 34, title: 'Elena\'s Darkness', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Week two. The hormones crash. Elena can\'t stop crying. She feels disconnected from Lucas — loves him but can\'t feel it. The darkness she felt after Grace\'s birth returns, worse this time. She hides it from Jasper, smiles when he checks in. But at 3 AM, alone with Lucas screaming, she sits on the nursery floor and thinks: "I\'m not enough. I\'ll never be enough." She doesn\'t tell anyone. The walls close in.' },

  { number: 35, title: 'Jasper Called Away', pov: 'Jasper Barrett', location: 'Oak Watch/The Forge', synopsis: 'International crisis erupts — a BSS client in Singapore facing hostile takeover with geopolitical implications. Harper can\'t handle it alone; Jasper has to go. He hesitates for the first time in his career. Elena sees it: "Go. We\'ll be fine." But she\'s lying and he knows it. He calls Addison before his flight: "Move in. Don\'t leave her alone." Addison: "Already packing." Jasper boards the plane feeling like he\'s failing both worlds.' },

  { number: 36, title: 'Addie Steps In', pov: 'Addison', location: 'Oak Watch', synopsis: 'Addison arrives with a suitcase and takes over. She doesn\'t ask Elena if she needs help — she just does it. Bottles washed. Laundry folded. Grace picked up from school. Dinner on the table. Elena watches, too tired to protest. "You don\'t have to do this." Addison: "I know. I want to." That night, Addison stays up with Lucas so Elena can sleep. Six hours uninterrupted — the first real rest in weeks. Elena wakes up crying. Addison holds her: "I\'ve got you. Let go."' },

  { number: 37, title: 'Twenty-Hour Days', pov: 'Addison', location: 'Oak Watch/The Forge', synopsis: 'The month from hell. Addison wakes at 5 AM to feed Lucas. Gets Grace ready for school. Handles morning BSS calls from Elena\'s kitchen — a tech CEO meltdown, a pharma whistleblower situation, Harper needing backup on three fronts. Midday: grocery run, Elena\'s doctor appointment, Lucas\'s pediatrician check-up. Afternoon: more crisis calls, Grace\'s homework, cooking dinner. Night: Elena finally sleeps while Addison takes the monitor. Then she opens her laptop and works until 2 AM. Repeat. For thirty days. She loses eight pounds. Her eyes are hollow. But she never stops. Kendra texts: "You\'re killing yourself." Addison: "She needs me." Kendra: "So do I. So does BSS. You can\'t pour from an empty cup." Addison doesn\'t respond. She\'s already on the next fire.' },

  { number: 38, title: 'Kendra\'s Balance', pov: 'Kendra', location: 'Gym/Oak Watch', synopsis: 'Kendra is training for the next Games qualifier while helping with the household. Morning workouts at 5 AM, then she drives to Oak Watch to take Grace to school so Addison can handle Lucas. Afternoons: she picks Grace up, helps with homework, makes her laugh. Grace starts requesting "Aunt Kendra" for bedtime stories. Kendra feels the pull — the competition she\'s trained years for versus the family that\'s becoming hers. One night, Grace falls asleep in her arms and Kendra thinks: "I could do this. Be this." She texts Addison a photo: Grace asleep, caption: "She asked for you but settled for me." Addison\'s reply: "She\'s lucky to have you. So am I."' },

  { number: 39, title: 'Grace Chooses Addie', pov: 'Grace', location: 'Oak Watch', synopsis: 'Grace is scared. Mommy cries all the time. Daddy\'s gone. The baby screams. But Addie is there — steady, warm, always smiling even when she\'s tired. Grace starts following her everywhere. "Can Addie braid my hair?" "Can Addie read to me?" "I want Addie to pick me up." One night, Grace has a nightmare and runs past her mother\'s room to find Addison on the couch. She crawls into Addison\'s lap: "Don\'t leave. Promise?" Addison holds her tight: "I\'m not going anywhere, baby girl. I promise." Elena hears from the hallway. It should hurt — her daughter choosing someone else. Instead, she feels relief. Grace is loved. That\'s what matters.' },

  { number: 40, title: 'Bringing Her Back to Life', pov: 'Elena/Addison/Kendra', location: 'Oak Watch', synopsis: 'Kendra comes over one evening and finds Elena in the dark, Lucas finally asleep, staring at nothing. "When did you last shower?" Elena can\'t remember. Kendra draws a bath — lavender, candles, the works. Addison joins them in the bathroom, just sitting, talking softly. Elena cries in the tub. They don\'t try to fix it. They just stay. Later, Kendra brushes Elena\'s hair while Addison rubs her shoulders. They end up on the bed together — not sexual, just intimate. Bodies curled around each other, Elena in the middle. Human touch. Warmth. Connection. Elena sleeps through the night for the first time since Lucas was born. In the morning, she looks in the mirror and sees herself again. The fog is lifting.' },

  { number: 41, title: 'The Warrior Goddess', pov: 'Multiple', location: 'Oak Watch/The Forge', synopsis: 'Jasper returns from Singapore to find the house running like clockwork. Elena is up, dressed, holding Lucas with actual joy in her eyes. Grace is thriving. And Addison — Addison is transformed. She\'s lost weight but gained something else. A stillness. A certainty. She handled a month of impossible: elite crisis management, newborn care, postpartum support, a grieving child, a household. All of it. Claire, visiting, watches Addison brief Jasper on the cases she managed. "You\'re looking at something rare," Claire tells him later. "Most people break under half that pressure. She became more." Jasper: "What do you call someone like that?" Claire: "In the military, we\'d call her a warrior. In mythology? A goddess." Harper overhears and laughs: "Warrior goddess. I like it." The name sticks. Addison doesn\'t know it yet, but this month defined her. Everything after will be built on this foundation.' },

  // ============================================
  // PART 5 — THE WEDDING WEEKEND (Ch 42-53)
  // Tone: Celebration, culmination, new beginnings
  // ============================================
  { number: 42, title: 'Rehearsal Dinner', pov: 'Harper', location: 'Charlotte', synopsis: 'Harper and Ethan\'s rehearsal dinner — elegant, intimate, family only plus the BSS core. Jasper gives a toast: "Harper is the best of us. Ethan, if you hurt her, there\'s nowhere you can hide." Everyone laughs, but Ethan knows he\'s serious. Elena, recovered and radiant, makes it for the whole evening with baby Lucas. Harper watches her friends — Addison and Kendra sitting close, the wives laughing, Jasper holding his son. Addison looks different — leaner, sharper, more present. "I want this," Harper thinks. "All of it."' },

  { number: 43, title: 'Party Prep Night', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Night before the wedding. Addison & Kendra upstairs steaming dresses in matching silk robes and lingerie. They start kissing — slow, unhurried. Elena walks in, pauses. She\'s known. Maybe always. After everything Addison did for her — the postpartum month, the showers, the intimacy — this feels natural. She smiles: "Finish the dresses before the after-party." Grace bounds in wanting to get dressed with them — the moment shifts to laughter and normalcy. But the door is open now.' },

  { number: 44, title: 'The Threesome', pov: 'Jasper/Elena/Addison', location: 'Oak Watch', synopsis: 'After the dresses, after Grace is asleep. Elena initiates with Addison — the culmination of everything: the postpartum rescue, the warrior goddess month, the trust built through crisis. "I want to share this with you. If you want." Addison looks at Jasper, then Elena. "Are you sure?" Elena: "You saved me. You saved us. I\'ve never been more sure." One night of connection. Not transactional — intimate, tender, surprising. Afterward, they lie together, processing. Kendra knew, gave them space. No jealousy. Different relationships, different containers. All of it okay.' },

  { number: 45, title: 'Morning After', pov: 'Multiple', location: 'Oak Watch', synopsis: 'The morning after. Quiet understanding between Elena and Addison — nothing weird, nothing broken. If anything, closer. Jasper makes breakfast, processing what happened, finding he\'s okay with it. Grace comes downstairs, oblivious, demanding pancakes. Normalcy returns. Then, over coffee, Jasper makes it official: "Addison, I\'m promoting you to junior strategist. Effective immediately." She stares. "You earned it. Not just for last night — for the month. For everything." The warrior goddess has her title.' },

  { number: 46, title: 'Wedding Day Morning', pov: 'Harper', location: 'Hotel Suite', synopsis: 'Harper getting ready — the Wives\' Circle tradition of preparing together. Dresses everywhere, makeup chaos, champagne. Elena there with Lucas strapped to her chest, healthy and glowing. Harper, nervous for the first time anyone can remember: "What if I mess this up?" Addison: "You don\'t know how to mess things up. It\'s annoying, actually." Laughter. Then Harper looks in the mirror, really sees herself: "I\'m getting married." Elena: "Yes, you are. And you\'re going to be magnificent."' },

  { number: 47, title: 'Wedding Ceremony', pov: 'Multiple', location: 'Charlotte Church', synopsis: 'The wedding. Harper radiant, Ethan can\'t stop staring. Elena as matron of honor, baby Lucas surprisingly quiet. Addison as bridesmaid in pastel yellow — thinner, sharper, the warrior goddess in a dress. Kendra in mint-green wrap dress, watching Addison walk down the aisle with something more than friendship in her eyes. The vows are personal, funny, moving. Harper cries, which makes everyone cry. Jasper walks Harper down the aisle (her father passed years ago). He whispers: "You\'ve always been like family. Now it\'s official." Everyone finally meets Ethan\'s family. It works.' },

  { number: 48, title: 'Wedding Reception', pov: 'Multiple', location: 'Charlotte Venue', synopsis: 'The reception — glamorous, alive. First dance, toasts, the BSS table roaring with laughter. Addison, newly minted junior strategist, holds court with Tier 1 clients who came to celebrate. She belongs here. Kendra dances with Elena, then with Addison — holding her close, whispering something that makes Addison laugh and blush. Grace is flower girl, stealing the show. Lucas sleeps through the speeches. Harper pulls Addison aside: "Thank you. For everything — especially for Elena." Addison: "This is what family does."' },

  { number: 49, title: 'The Morning After Wedding', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Post-wedding recovery. Harper and Ethan leave for honeymoon (Maldives). The house quiets. Elena with Lucas, finally resting — truly resting, the postpartum fog fully lifted. Jasper cancels Monday meetings. They do nothing — watch movies, nap, let Grace skip school. Addison and Kendra stop by, bringing coffee and pastries. For one day, the world doesn\'t intrude. Elena thinks: "This is what I wanted. Not perfect. Just present. Just loved."' },

  { number: 50, title: 'Baptism Preparation', pov: 'Jasper Barrett', location: 'Charlotte Church', synopsis: 'Meeting with the priest to plan Lucas\'s baptism. Jasper, not particularly religious, goes through the motions for Elena. But something about the ritual resonates — the idea of committing publicly, of having a community witness. The godparents: Addison and Hawk (who flies in for it). The choice of Addison is obvious now — she earned it in the trenches, not the boardroom. Elena watches Jasper engage, really engage, and thinks maybe he\'s changing in ways she didn\'t expect.' },

  { number: 51, title: 'Baptism Morning', pov: 'Jasper Barrett', location: 'Charlotte Church', synopsis: 'Same church — sacred calm after wedding chaos. Lucas\'s baptism. Jasper holds his son over the font, the water blessing, the words spoken. Addison and Hawk as godparents, taking vows seriously. When Addison says "I will," her voice doesn\'t waver. Grace stands between Elena and Jasper, part of the ceremony. The family surrounded by their chosen circle: BSS, Wives\' Club, friends who became family. Jasper feels, for the first time in years, like he\'s exactly where he belongs.' },

  { number: 52, title: 'Claire Signs On', pov: 'Claire', location: 'Oak Watch', synopsis: 'Post-baptism brunch. Claire finds Jasper on the porch. "I\'ve had offers from three Fortune 100 companies since starting with BSS. I\'m turning them down. Signing on for Year Two." Jasper surprised: "We can\'t match their money." Claire: "I\'ve worked with SEALs, senators, CEOs worth billions. Most of them were running from something. You\'re the first one I\'ve seen running toward something." She gestures inside — Elena holding Lucas, Grace showing Addison a drawing, Kendra laughing with Harper. "And Addison — what she did this past month? That\'s not training. That\'s character. You can\'t teach that." She pauses. "You built something real. I want to see how far it can go."' },

  { number: 53, title: 'Closing Circles', pov: 'Multiple', location: 'Oak Watch', synopsis: 'The brunch winds down. NFL resolved, Africa stable, Singapore handled, Harper balanced and sharp again. Lucas sleeps in Jasper\'s arms. Harper returns from honeymoon refreshed, ready to work. Jasper takes her aside: "I want to talk about Kendra. She\'s not you or Addison, but she\'s calculated. Smart. Loyal. We should develop her." Harper nods: "I\'ve been thinking the same thing." Addison catches Claire\'s eye across the room — a nod of recognition between mentor and protégé. Kendra finds Addison by the window, takes her hand: "What happens now?" Addison: "Everything." Elena watches her family, her people, her life. The warrior goddess is real. The circle is complete. It\'s not perfect. But it\'s hers. Seeds planted for Book 3: Kendra\'s rise, Addison\'s next level, new challenges on the horizon. For now, this moment. This circle. Enough.' }
];

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Building Book 2 EXPANDED - 53 Chapters ===\n");

  // Find or create Book 2
  let book2 = await prisma.book.findFirst({
    where: { projectId: project.id, sortOrder: 2 }
  });

  if (!book2) {
    book2 = await prisma.book.create({
      data: {
        projectId: project.id,
        title: 'Book 2 - New Season',
        sortOrder: 2,
        synopsis: 'Placeholder',
        status: 'outlined'
      }
    });
    console.log("Created Book 2\n");
  }

  // Clear existing chapters
  await prisma.chapter.deleteMany({ where: { bookId: book2.id } });
  console.log("Cleared existing chapters\n");

  // Create all chapters
  for (const ch of book2Chapters) {
    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book2.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        status: 'outlined',
        tags: ch.location
      }
    });
    console.log(`Ch ${ch.number}: ${ch.title} (${ch.pov})`);
  }

  // Update book synopsis
  await prisma.book.update({
    where: { id: book2.id },
    data: {
      title: 'Book 2 - New Season',
      synopsis: `Book 2 of the Jasper Barrett Series - EXPANDED

53 chapters from New Season through Lucas's Baptism.

PART ONE - Foundations & New Tensions (Ch 1-8)
New crises emerge. Claire Ashford joins BSS. Elena pregnant with baby #2. Kendra introduced at Sara's pool party — clicks with Addison. Grace's world adjusts to changes.

PART TWO - Escalation & Shifting Roles (Ch 9-18)
NFL explodes, Africa coup resolved. Claire identifies Harper's struggles and Addison's potential. Kendra's regional → Games win. Marcus the washout proves not everyone can handle BSS. First ultrasound - it's a boy: Lucas.

PART THREE - Collisions & Resets (Ch 19-30)
Engagement announced. Ethan meets BSS world. Kendra's first real case. Baby shower. Claire works with Jasper directly. Addison & Kendra's relationship deepens. Bachelorette in Miami. Addison's trial by fire. Grace prepares for baby brother.

PART FOUR - Lucas Arrives (Ch 31-33)
Lucas born early, healthy. The first week of parenthood. The calm before the storm.

PART FOUR-B - Postpartum Crisis & Addie's Rise (Ch 34-41) ★ NEW ★
Elena's postpartum darkness hits hard. Jasper called away to Singapore. Addison moves in, takes over everything — BSS crises AND household. Twenty-hour days for a month. Kendra balances Games training with helping Grace. Grace becomes attached to Addie. Addison and Kendra bring Elena back to life through intimate care — baths, cuddling, presence. THE WARRIOR GODDESS IS BORN.

PART FIVE - The Wedding Weekend (Ch 42-53)
Rehearsal dinner. Party prep night - the intimacy continues. The threesome (Elena/Jasper/Addison) — earned through the postpartum rescue. Addison promoted to junior strategist. Wedding ceremony and reception. Baptism with Addison as godmother. Claire signs on for Year 2. Seeds planted for Book 3.

KEY ARCS:
- Jasper: Learning to be present, working with Claire, failing and succeeding at balance
- Elena: Pregnancy → postpartum crisis → rescued by Addison/Kendra → renewal
- Addison "THE WARRIOR GODDESS": Coordinator → postpartum savior (20-hr days for a month) → threesome (gratitude/trust) → junior strategist. The month that defined her.
- Harper: Ethan relationship, slipping → recovery via Claire, engagement → wedding
- Kendra: Pool party → Games champion → helping with Grace during postpartum → relationship with Addison
- Claire: Olympic hopeful → Ironman champion → performance coach → names Addison "warrior goddess"
- Grace: Adjusting to baby brother, fears → finds safety in Addie → "Don't leave. Promise?"
- Lucas: Born and baptized

POV BREAKDOWN:
- Jasper Barrett: 10 chapters
- Elena Barrett: 10 chapters
- Multiple: 8 chapters
- Claire: 6 chapters
- Addison: 5 chapters
- Harper: 5 chapters
- Grace: 3 chapters
- Kendra: 3 chapters
- Jasper/Elena: 2 chapters
- Jasper/Elena/Addison: 1 chapter`
    }
  });

  console.log(`\n=== Created ${book2Chapters.length} chapters ===`);

  // Stats
  const povCounts: Record<string, number> = {};
  for (const ch of book2Chapters) {
    povCounts[ch.pov] = (povCounts[ch.pov] || 0) + 1;
  }
  console.log('\nChapters by POV:');
  for (const [pov, count] of Object.entries(povCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${pov}: ${count}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
