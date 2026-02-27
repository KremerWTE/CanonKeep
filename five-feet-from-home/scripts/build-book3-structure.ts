import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Book 3: THE EXPANSION - 50 chapters
// SETUP book before Book 4's Denver crisis
// Key themes:
// - MORE Addie & Jasper East Coast trips/cases
// - CrossFit athletes - Kendra's journey: Open → Quarterfinals → Semifinals → Games
// - Real CrossFit details: Madison Wisconsin, Tia-Clair Toomey references, brutal events
// - Building POH - galas, wives club, positioning Addie to become Protectress
// - Harper's Miami transition
// - Kendra meets Chris
// - Jasper turns down global expansion
// NOTE: NO Bella (comes after Addie becomes POH), NO breakdown, NO Hawk

const book3Chapters = [
  // ============================================
  // PART 1 — NEW ROLES & CROSSFIT OPEN (Ch 1-12)
  // ============================================
  { number: 1, title: 'The Promotion Settles', pov: 'Addison', location: 'The Forge', synopsis: 'Three months after Lucas\'s baptism. Addison as junior strategist is reality now. Her own office, her own caseload. First real test: a hedge fund client in NYC wants her specifically. Jasper: "You ready to lead one solo?" Addison: "I\'ve been ready."' },

  { number: 2, title: 'Harper\'s Miami Pitch', pov: 'Harper', location: 'The Forge', synopsis: 'Harper presents her vision: BSS regional expansion, starting with Miami. Caribbean clients, Latin American money. "You want to run your own office?" Harper: "I want to build something. Not just execute your plays — create my own." Jasper: "Write me a full proposal."' },

  { number: 3, title: 'Kendra\'s 5 AM', pov: 'Kendra', location: 'Charlotte Gym', synopsis: 'CrossFit Open season begins. Kendra at the gym before dawn — rowing, lifting, running. Her coach pushes her toward Games-level performance. She watches videos of Tia-Clair Toomey, the seven-time champion, studying her movements. "That\'s the standard." She\'s also doing analyst work for BSS. Two lives, one body.' },

  { number: 4, title: 'The Expansion Offer', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'The board calls Jasper with the career-defining offer: Global expansion lead. London, Singapore, Dubai, São Paulo. It\'s everything. It\'s also a death sentence for his family. Claire finds him late: "Big decision?" Jasper: "The biggest."' },

  { number: 5, title: 'Open Workout 1', pov: 'Kendra', location: 'Charlotte Gym', synopsis: 'First Open workout drops Thursday night. Kendra watches the worldwide announcement — this year it\'s a brutal AMRAP: thrusters and chest-to-bar pull-ups. Friday morning, she attacks it. Her body screams. She finishes in the top 100 in her region. Her coach: "That\'s Games-qualifier territory." The dream feels real.' },

  { number: 6, title: 'First NYC Trip', pov: 'Addison', location: 'NYC', synopsis: 'Addison\'s first major case as lead: hedge fund founder accused of securities fraud. She flies to NYC with Jasper — her first real road trip as equals. The dynamic has shifted. He\'s not teaching anymore; he\'s partnering. Evening debrief: "You\'ve changed." Addison: "I had to."' },

  { number: 7, title: 'The EOHSJ Dinner', pov: 'Addison', location: 'NYC', synopsis: 'That night, EOHSJ dinner at a cathedral rectory. Elena arranged it — introducing Addison to the Catholic order network. Addison feels like a fraud among Knights and Dames. Lady Margaret: "Faith can grow. Character cannot be taught. You have character." First seed planted for POH.' },

  { number: 8, title: 'Open Workout 3', pov: 'Kendra', location: 'Charlotte Gym', synopsis: 'Workout 3 is a ladder — deadlifts and handstand push-ups, weights climbing. Kendra\'s specialty. She goes unbroken longer than anyone expected. When the leaderboard updates, she\'s 47th in North America. Chris Donnelly, an athletic consultant, watches from the corner. He\'s been scouting athletes. He notices her.' },

  { number: 9, title: 'Elena\'s New Chapter', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena has stepped into her new life: real estate investments, nonprofit boards, being present. One night: "What aren\'t you telling me?" Jasper admits the expansion offer. Elena: "What do you want?" He doesn\'t know. "Then we figure it out together."' },

  { number: 10, title: 'Grace\'s First Communion Prep', pov: 'Elena Barrett', location: 'Charlotte Church', synopsis: 'Grace preparing for First Communion. Father Thomas meets with Elena and Jasper — Grace needs sponsors. Elena: "What about Addison?" Jasper: "She\'s not even Catholic." Elena: "She could be. And Grace adores her." That night, Elena calls Addison with the question.' },

  { number: 11, title: 'The RCIA Study Buddy', pov: 'Addison', location: 'Oak Watch', synopsis: 'Grace takes her job as Addie\'s unofficial RCIA helper VERY seriously. She makes flashcards with crayon drawings — the Holy Spirit is a sparkly blue chicken, the Eucharist has a smiley face. She quizzes Addie on saints and purposely gives wrong answers to make her laugh. "Saint Francis talked to dragons!" Addie: "Pretty sure it was animals." Grace: "Dragons ARE animals, Addie." They end up in a giggle fit on the floor. Elena watches from the doorway, smiling.' },

  { number: 12, title: 'Open Finals', pov: 'Kendra', location: 'Charlotte Gym', synopsis: 'Final Open workout — a chipper that tests everything: row, wall balls, double-unders, muscle-ups. Kendra pushes through the pain cave. When results finalize, she\'s 31st in North America. Top 30 go straight to Quarterfinals. She made it by alternate spots when two athletes above her fail video review. She\'s in.' },

  { number: 13, title: 'The Wives\' Circle Gala', pov: 'Elena Barrett', location: 'Charlotte Ballroom', synopsis: 'Annual Wives\' Circle gala. All five wives fly in. Addison attends as guest of honor for the first time. Caroline to Elena: "She\'s ready, isn\'t she? For whatever you\'re grooming her for." Elena realizes the circle has noticed — positioning Addison for POH.' },

  // ============================================
  // PART 2 — EAST COAST & QUARTERFINALS (Ch 14-26)
  // ============================================
  { number: 14, title: 'DC Crisis', pov: 'Addison', location: 'Washington DC', synopsis: 'Defense contractor facing congressional inquiry. Jasper and Addison fly to DC. Three days of war rooms, witness prep, political maneuvering. A senior congressman tries to intimidate her; she doesn\'t blink. Jasper: "You were made for this."' },

  { number: 15, title: 'Quarterfinals Week', pov: 'Kendra', location: 'Charlotte Gym', synopsis: 'CrossFit Quarterfinals — four days, four workouts, filmed and submitted. Workout 1: heavy snatches and burpees over bar. Kendra\'s form is flawless. Workout 2: a 20-minute AMRAP that nearly breaks her. Chris visits between workouts, brings recovery shakes. She finishes 23rd. Semifinals bound.' },

  { number: 16, title: 'The Order of Malta Gala', pov: 'Addison', location: 'NYC', synopsis: 'Black-tie gala for the Order of Malta. Elena brings Addison as her guest — full introduction to Catholic high society. Addison in a silk gown, feeling like an imposter. But she plays the room perfectly. Lady Margaret: "We should talk about your future. The Order needs women like you."' },

  { number: 17, title: 'Boston Biotech', pov: 'Jasper Barrett', location: 'Boston', synopsis: 'Jasper and Addison in Boston — biotech CEO facing activist investor attack. Addison handles academic stakeholders while Jasper works financial angles. They\'re a machine now. Jasper notices: she\'s outpacing him in some areas. The student becoming the master.' },

  { number: 18, title: 'Harper\'s Proposal Approved', pov: 'Harper', location: 'The Forge', synopsis: 'Harper presents her full Miami proposal. Market analysis, client pipeline, operational structure. Jasper approves it. "Miami is yours. Build it." Ethan on video that night: "You got it?" Harper: "I got it." But she sees the strain in his face.' },

  { number: 19, title: 'The Catholic Question', pov: 'Addison', location: 'Charlotte Church', synopsis: 'Addison meets Father Thomas about Grace\'s sponsorship. "I don\'t know if I believe. But I want to understand." He doesn\'t push. "Why are you here?" Addison: "Because Grace asked me. And I won\'t do it unless I mean it." RCIA begins.' },

  { number: 20, title: 'Kendra\'s History', pov: 'Kendra', location: 'Charlotte', synopsis: 'Flashback chapter. Kendra grew up in Texas — mom ran a small dance/gymnastics studio, dad worked oil services. By twelve, she was on the junior elite track. Full gymnastics scholarship to UCLA. The balance beam taught her control; the vault taught her to fly. Boys came easy but never stayed. Marcus freshman year, sweet but boring. Tyler junior year, exciting but a liar. And there was a girl — [TBD - find details]. She learned to keep walls up. Then an injury ended gymnastics. During rehab, CrossFit found her. The gym became her relationship. Now there\'s Addison, who confuses everything. And there\'s Chris Donnelly — she met him at a BSS event, quiet and steady, nothing like the ones who burned her. Kendra doesn\'t know what she wants. She just knows she\'s tired of walls.' },

  { number: 21, title: 'Zoo Day with Grace', pov: 'Addison', location: 'Charlotte Zoo', synopsis: 'Addie takes Grace to the zoo — just the two of them. Grace insists they see EVERY animal, makes Addie do silly walks to match each one. At the flamingos, Grace stands on one leg until she falls over laughing. They ride the carousel three times. Grace picks the unicorn; Addie gets stuck on a rooster. They get matching penguin stuffed animals. Grace names hers "Sir Waddles." Addie\'s is "Detective Penguin." Grace: "This is the best day ever." Addie realizes it might be hers too.' },

  { number: 22, title: 'Chris Makes His Move', pov: 'Kendra', location: 'Charlotte', synopsis: 'Chris Donnelly formally asks Kendra to dinner. He\'s been watching her compete, supporting from the sidelines. "I\'ve worked with a lot of athletes. None of them have what you have." Kendra hesitates — the thing with Addison is undefined. But she says yes. The dinner is perfect. He doesn\'t push. He listens. He\'s nothing like Marcus or Tyler. Maybe that\'s what scares her.' },

  { number: 23, title: 'Philly Hospital Crisis', pov: 'Addison', location: 'Philadelphia', synopsis: 'Hospital system hit by ransomware — patients at risk, media frenzy, FBI involved. Addison leads with Jasper in support. 72 hours of hell. When it\'s over, the CEO shakes her hand: "You saved us." Jasper: "You don\'t need me on these anymore."' },

  { number: 24, title: 'Jasper\'s Decision', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Jasper sits with Elena, kids asleep. "I\'m turning it down." The expansion. "I spent my whole career building toward that moment. Now that it\'s here, I don\'t want it. I want this." Elena cries from relief. "What will you do instead?" Jasper: "Mentor. Advise. Be here."' },

  { number: 25, title: 'The Sapientia Minervae Strategy', pov: 'Elena Barrett', location: 'Charlotte Compound', synopsis: 'Wives\' inner circle strategy meeting. Topic: BSS\'s future leadership. Elena raises Addison\'s name officially. "She\'s ready to be more than junior strategist." Who becomes Jasper\'s true successor? Caroline: "She needs to prove she can carry the weight." The wives begin serious positioning for POH.' },

  { number: 26, title: 'NYC Media Crisis', pov: 'Addison', location: 'NYC', synopsis: 'Addison and Jasper in NYC — media mogul facing #MeToo allegations. Complex case: some true, some fabricated by rivals. Addison navigates the gray areas while Jasper handles the board. A week in Manhattan. By the end, a managed resolution that protects victims and preserves what\'s salvageable.' },

  { number: 27, title: 'Kendra\'s Choice', pov: 'Kendra', location: 'Charlotte', synopsis: 'Kendra and Chris are real now. She texts Addison: "I need to talk." Kendra admits: "I think I need to try this. With Chris. For real." Addison feels the loss but doesn\'t show it. "Then try it." Kendra: "Are we okay?" Addison: "We\'ll always be okay. Different, but okay."' },

  // ============================================
  // PART 3 — SEMIFINALS & POH BUILDING (Ch 28-41)
  // ============================================
  { number: 28, title: 'Semifinals Day 1', pov: 'Kendra', location: 'Knoxville, TN', synopsis: 'CrossFit Semifinals in Knoxville. First event: a brutal swim-run-lift combo. Kendra pushes through the lake swim, runs the hill, hits the barbell. She finishes 8th in the event. Laura Horvath, the reigning champion, finishes first. Kendra watches her — that\'s the level she\'s chasing.' },

  { number: 29, title: 'Miami Launch', pov: 'Harper', location: 'Miami', synopsis: 'Miami office opens. Harper\'s first day as regional head. It\'s everything she wanted — and lonelier than expected. First client call: Cuban business family with cartel connections they want to sever. Classic Miami. Harper smiles. This is where she belongs.' },

  { number: 30, title: 'Semifinals Day 2', pov: 'Kendra', location: 'Knoxville, TN', synopsis: 'Day 2 — three events. Kendra\'s body is screaming. Event 4: legless rope climbs and heavy cleans. She almost fails the last clean, but muscle memory takes over. Finishes 5th. Event 5: a sprint that she dominates. She\'s climbing the leaderboard. Chris is in the stands, tracking every rep.' },

  { number: 31, title: 'The Unspoken Thing', pov: 'Addison', location: 'Charlotte', synopsis: 'Addie and Kendra meet for coffee — first time since "the choice." It\'s awkward in ways they\'ve never been. Kendra talks about Chris. Addie listens, says the right things. But there\'s something underneath. When Kendra leaves, Addie sits alone for an hour. She doesn\'t know what she lost. Only that she lost it.' },

  { number: 32, title: 'Semifinals Day 3', pov: 'Kendra', location: 'Knoxville, TN', synopsis: 'Final day. Top 5 go to the Games. Kendra starts the day in 6th. Last event: a chipper that tests everything. She goes all out. When she crosses the finish line, she collapses. The leaderboard updates: 4th overall. She\'s going to Madison. She\'s going to the CrossFit Games.' },

  { number: 33, title: 'DC Political Case', pov: 'Addison', location: 'Washington DC', synopsis: 'Addison and Jasper in DC again — senator facing ethics investigation. Addison works the political angles while Jasper handles media. They operate as true partners. Evenings at a quiet hotel bar, debriefing. Jasper: "You\'re ready to run these alone." Addison: "Not yet. I like having you there."' },

  { number: 34, title: 'EOHSJ Investment Dinner', pov: 'Addison', location: 'NYC', synopsis: 'Elena takes Addison to an EOHSJ investment dinner in NYC. High-net-worth Catholics discussing charitable giving, order business. Addison observes how faith and finance intertwine. Lady Margaret introduces her to key donors: "This is the woman I\'ve been telling you about." She\'s being positioned.' },

  { number: 35, title: 'Jasper\'s New Rhythm', pov: 'Jasper Barrett', location: 'The Forge/Oak Watch', synopsis: 'Jasper announces his decision: turning down global expansion, stepping into mentor role. Weekly sessions with junior staff. Learning to transition from field warrior to strategic anchor. Still 18-hour days, but office 9-5 and home for dinner. Day trips only for key clients.' },

  { number: 36, title: 'The Baking Disaster', pov: 'Addison', location: 'Oak Watch Kitchen', synopsis: 'Addie and Grace decide to bake Elena a surprise birthday cake. Flour EVERYWHERE. Grace cracks eggs with both hands — shells included. Addie reads the recipe wrong and uses salt instead of sugar. The first cake comes out looking like a volcanic crater. They try again. The second one catches fire. Grace: "We should just buy one." Addie: "Absolutely." They order from a bakery but present Elena with their floury disaster photo. Elena frames it.' },

  { number: 37, title: 'RCIA Deepens', pov: 'Addison', location: 'Charlotte Church', synopsis: 'Addison deeper in RCIA. Father Thomas pushes: "Why do you want this? Really?" Addison: "Because the people I love have faith. I want to understand what they know." Elena accompanies her. The faith journey parallels her professional journey: building something from nothing.' },

  { number: 38, title: 'The POH Council Forms', pov: 'Elena Barrett', location: 'Charlotte Compound', synopsis: 'Elena formally establishes the POH leadership council. The wives, Lady Margaret, key order members. Topic: who leads the next generation? Elena nominates Addison. Debate ensues — she\'s not Catholic yet, not a wife. Lady Margaret: "She has something the others don\'t. Vision."' },

  { number: 39, title: 'Boston Financial Crisis', pov: 'Addison', location: 'Boston', synopsis: 'Addison leads her first solo case — Boston private equity firm facing SEC investigation. Jasper provides remote cover from Charlotte. She handles it herself: witness prep, regulatory meetings, media. Three weeks in Boston. Jasper: "You don\'t need me anymore." Addison: "Maybe. But I still want you there."' },

  { number: 40, title: 'Harper\'s First Win', pov: 'Harper', location: 'Miami', synopsis: 'Harper closes her first major Miami case: extracting a businessman from cartel entanglement without violence or exposure. Elegant work. Jasper calls to congratulate. "You built something real down there." Ethan flies down. They celebrate on a yacht.' },

  { number: 41, title: 'What We Don\'t Say', pov: 'Kendra', location: 'Charlotte', synopsis: 'Kendra and Chris hit six months. He\'s met her whole world — except the complicated history with Addison. Kendra watches Addie at a BSS gathering, sees her laughing with someone else. Something twists. Chris: "You okay?" Kendra: "Yeah. Just thinking." She\'s not sure what they are anymore. Friends? Former something? The undefined thing that was never named is now an undefined loss.' },

  // ============================================
  // PART 4 — THE GAMES & NYC (Ch 42-52)
  // ============================================
  { number: 42, title: 'Games Day 1', pov: 'Kendra', location: 'Madison, Wisconsin', synopsis: 'CrossFit Games. Alliant Energy Center. First event: a lake swim followed by a trail run with sandbag carries. Kendra exits the water 15th, runs her heart out, finishes 11th. She watches Tia-Clair Toomey dominate — seven-time champion, back after having a baby. That\'s the level. But Kendra belongs here.' },

  { number: 43, title: 'Grace\'s First Communion', pov: 'Elena Barrett', location: 'Charlotte Church', synopsis: 'Grace\'s First Communion. Jasper, Elena, Lucas, Addison, Sara gathered. Grace in white, glowing. Addison stands as sponsor — guiding her in the faith she\'s still learning. Grace receives the Eucharist. Elena cries. Grace hugs Addison: "Thank you for being my person." (Kendra sends a video message from Madison.)' },

  { number: 44, title: 'Sleepover Celebration', pov: 'Addison', location: 'Oak Watch', synopsis: 'Post-First Communion sleepover. Grace convinces Addie to stay over. They build a blanket fort in the living room and watch Moana three times. Grace teaches Addie a TikTok dance — Addie is terrible at it. They do face masks and Grace puts cucumber slices on her eyes. At midnight, Grace whispers: "Addie, do you have secrets?" Addie: "Everyone does." Grace: "I\'ll keep yours if you keep mine." They pinky promise. Elena finds them asleep in the fort the next morning.' },

  { number: 45, title: 'Games Day 2', pov: 'Kendra', location: 'Madison, Wisconsin', synopsis: 'Day 2 — three brutal events. Kendra\'s body is breaking down. Event 4: heavy deadlifts and box jump overs. Her back is screaming but she pushes. Event 5: a sprint workout where she finishes 7th. She\'s climbing. Chris is there with her family, tracking every moment.' },

  { number: 46, title: 'The POH Invitation', pov: 'Addison', location: 'Charlotte', synopsis: 'Official invitation: Addison asked to join Palace of Honor leadership council. Not as a wife, not as support staff — as a leader in her own right. Elena presents it with Lady Margaret. "We want you to help shape what POH becomes." Addison: "I\'m not even confirmed yet." Lady Margaret: "We want your mind, not just your faith."' },

  { number: 47, title: 'Games Day 3', pov: 'Kendra', location: 'Madison, Wisconsin', synopsis: 'Day 3. Kendra wakes up in pain everywhere. But she\'s 9th overall. Top 10. Event 7: a long chipper. She paces smart, finishes 6th. Event 8: handstand walks and heavy snatches. Her weakness. She struggles, finishes 14th. Still in striking distance. One day left.' },

  { number: 48, title: 'Addison\'s Confirmation', pov: 'Addison', location: 'Charlotte Church', synopsis: 'Addison\'s Confirmation. The BSS family present — except Kendra, who\'s at the Games. Grace is Addison\'s sponsor — a beautiful reversal. When the bishop anoints Addison, she feels something shift. She\'s part of something now. Elena holds her hand: "You did it. You\'re one of us."' },

  { number: 49, title: 'Games Final Day', pov: 'Kendra', location: 'Madison, Wisconsin', synopsis: 'Final day. Two events left. Kendra starts 10th. Event 9: a classic couplet — thrusters and chest-to-bar. She goes unbroken, finishes 4th. Final event: the elimination ladder. One by one, athletes drop. Kendra survives three rounds before getting cut. Final standing: 8th in the world. Top 10. She did it.' },

  { number: 50, title: 'The POH Summit', pov: 'Addison', location: 'Charlotte Compound', synopsis: 'First major POH leadership summit with Addison as a council member. She presents her vision: linking BSS\'s crisis capabilities with POH\'s humanitarian mission. "We can do good and do well." Lady Margaret nods. Elena beams. By the end, Addison has won them over. She\'s shaping POH now.' },

  { number: 51, title: 'NYC Just Us', pov: 'Addison', location: 'NYC', synopsis: 'Jasper, Addie, and Kendra fly to NYC for a financial client. Day one goes smooth. Then Jasper gets a call — urgent situation in Chicago. He has to go. "You two can handle this." Suddenly it\'s just Addie and Kendra. Alone. In New York. Day two: late dinner, too much wine, walking back to the hotel in the rain. Kendra pulls Addie into a doorway. They kiss. It\'s not a mistake — it\'s everything they\'ve been avoiding. They spend the night together. Day three: finishing the case, not talking about it. The flight home is silent. Everything has changed.' },

  { number: 52, title: 'The Sunday Table', pov: 'Elena Barrett', location: 'Charlotte Compound', synopsis: 'Sunday dinner at the compound. Everyone there: Jasper and Elena with Grace and Lucas. Addison, back from NYC. Kendra and Chris. Harper and Ethan. Sara and family. Elena raises a glass: "To us. To what we\'ve built. To what comes next." But Elena watches Addie and Kendra carefully not looking at each other. Chris has his arm around Kendra. Kendra is somewhere else entirely. Elena knows that look. Something happened in New York.' },

  // ============================================
  // PART 5 — THE CABIN & PROMISE RING (Ch 53-57)
  // ============================================
  { number: 53, title: 'Harper\'s Proposal', pov: 'Harper', location: 'Miami', synopsis: 'Ethan proposes. He flies to Miami, takes her to their spot on the water. "I know this life is crazy. I know you\'re building an empire. I want to build it with you." Harper says yes. She calls Elena first, then Jasper. The BSS family celebrates. A wedding to plan.' },

  { number: 54, title: 'The Cabin Trip', pov: 'Addison', location: 'Blue Ridge Mountains', synopsis: 'Girls\' trip to the mountain cabin — Addie, Kendra, Harper, Sara. First time alone together since New York. Addie has the title. Harper has Miami. Sara has babies. Kendra has Chris. And Kendra and Addie have a secret. They cook badly, drink wine, hike to a waterfall. But underneath the laughter, New York is everywhere.' },

  { number: 55, title: 'Firelight Confessions', pov: 'Kendra', location: 'Blue Ridge Cabin', synopsis: 'Night two at the cabin. Harper and Sara go to bed early. Kendra and Addie by the fire, wine half-gone. Finally they talk about it. New York. What it meant. What it means now. Kendra: "I don\'t know how to go back." Addie: "I don\'t either." They don\'t kiss — not here, not with Harper and Sara asleep upstairs. But they don\'t pretend anymore either.' },

  { number: 56, title: 'The Drive Home', pov: 'Addison', location: 'Blue Ridge → Charlotte', synopsis: 'The drive back. Four women in the car, the mountains fading behind them. Kendra sits in the back, quiet. Addie drives, eyes on the road. Harper and Sara trade stories about wedding planning. But in the rearview mirror, Kendra\'s eyes find Addie\'s. Nothing is resolved. Everything is changing. The cabin trip ends, but what started in New York doesn\'t.' },

  { number: 57, title: 'Kendra\'s Promise Ring', pov: 'Kendra', location: 'Charlotte', synopsis: 'A week after the cabin. Chris takes Kendra to dinner. He\'s been patient, steady, everything she should want. He pulls out a ring box. A promise ring. "I want to build something that lasts." Kendra looks at it. Thinks about New York. About the cabin. About Addie\'s eyes in the rearview mirror. She says yes. But when she gets home, she stares at the ring for a long time. Book 3 closes with Kendra wearing Chris\'s promise — and wondering what she promised away.' }
];

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Building Book 3: THE EXPANSION - 57 Chapters ===\n");

  let book3 = await prisma.book.findFirst({
    where: { projectId: project.id, sortOrder: 3 }
  });

  if (!book3) {
    book3 = await prisma.book.create({
      data: {
        projectId: project.id,
        title: 'Book 3 - The Expansion',
        sortOrder: 3,
        synopsis: 'Placeholder',
        status: 'outlined'
      }
    });
    console.log("Created Book 3\n");
  }

  await prisma.chapter.deleteMany({ where: { bookId: book3.id } });
  console.log("Cleared existing chapters\n");

  for (const ch of book3Chapters) {
    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book3.id,
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

  await prisma.book.update({
    where: { id: book3.id },
    data: {
      title: 'Book 3 - The Expansion',
      synopsis: `Book 3 of the Jasper Barrett Series

57 chapters - THE SETUP BOOK before Book 4's Denver crisis.
NOTE: NO Bella (comes after Addie becomes POH), NO breakdown, NO Hawk

KENDRA'S BACKSTORY:
- Ch 20: Kendra's History - Texas girl. Mom ran a dance/gymnastics studio, dad in oil services. Junior elite by 12. Full gymnastics scholarship to UCLA. Injury ended it. CrossFit during rehab. Marcus (freshman, sweet but boring), Tyler (junior, liar). Walls went up. Met Chris at a BSS event - quiet, steady, nothing like the boys who burned her.

SILLY ADDIE & GRACE ADVENTURES:
- Ch 11: The RCIA Study Buddy - Grace's flashcards with dragon drawings, giggle fits
- Ch 21: Zoo Day with Grace - carousel, penguin stuffies (Sir Waddles & Detective Penguin)
- Ch 36: The Baking Disaster - floury mess, volcanic cake, fire, Elena frames the photo
- Ch 44: Sleepover Celebration - blanket fort, Moana x3, TikTok dances, midnight secrets

ADDIE/KENDRA TENSION:
- Ch 27: Kendra's Choice - choosing Chris, "We'll always be okay. Different, but okay."
- Ch 31: The Unspoken Thing - awkward coffee, Addie sits alone for an hour
- Ch 41: What We Don't Say - Kendra watching Addie at a gathering, the unnamed loss
- Ch 51: NYC Just Us - Jasper called to Chicago. Addie & Kendra alone in NYC. Rain, doorway, kiss. They spend the night together. Everything changes.
- Ch 54-56: THE CABIN - tension peaks, firelight confessions, the drive home
- Ch 57: Promise Ring - A WEEK AFTER the cabin. Kendra says yes to Chris, but wonders what she promised away

CROSSFIT GAMES JOURNEY (Kendra's Arc):
- Ch 3, 5, 8, 12: CrossFit Open - qualifies for Quarterfinals
- Ch 15: Quarterfinals - finishes 23rd, advances to Semifinals
- Ch 28, 30, 32: Semifinals in Knoxville - finishes 4th, qualifies for Games
- Ch 42, 45, 47, 49: CrossFit Games in Madison, Wisconsin - finishes 8th in the world
- References Tia-Clair Toomey (7x champion), Laura Horvath (2023 champion)
- Ch 57: Promise ring from Chris (a week AFTER the cabin trip)

ADDIE & JASPER TRIPS:
- Ch 6-7: First NYC Trip (hedge fund + EOHSJ dinner)
- Ch 14: DC Crisis (defense contractor)
- Ch 16: Order of Malta Gala (NYC)
- Ch 17: Boston Biotech
- Ch 23: Philly Hospital Crisis (ransomware)
- Ch 26: NYC Media Crisis (#MeToo case)
- Ch 33: DC Political Case (senator)
- Ch 34: EOHSJ Investment Dinner (NYC)
- Ch 39: Boston Financial (Addie's first solo)

BUILDING POH:
- Ch 7: EOHSJ Dinner - first seed
- Ch 13: Wives' Circle Gala - positioning begins
- Ch 16: Order of Malta Gala
- Ch 25: Sapientia Minervae Strategy
- Ch 34: EOHSJ Investment Dinner
- Ch 38: POH Council Forms
- Ch 46: POH Invitation to Addison
- Ch 50: POH Summit
(NOTE: Addie is NOT named Protectress in Book 3 - that comes later)

KEY ARCS:
- Addison: Junior strategist → East Coast cases → RCIA → Confirmation → POH council member (not yet Protectress)
- Kendra: CrossFit Open → Quarterfinals → Semifinals (4th) → Games (8th) → NYC tension → Cabin → Promise ring (wondering)
- Jasper: Expansion offer → turns it down → transitions to mentor/office role
- Harper: COO → Miami regional head → engaged to Ethan
- Elena: Positioning Addison for POH, thriving in her new chapter
- Chris: Enters Kendra's life → promise ring after cabin trip
- Grace: First Communion with Addison as sponsor + silly adventures together

ENDS WITH: THE CABIN & PROMISE RING - Girls' weekend in Blue Ridge. Firelight confessions. The drive home with eyes meeting in the rearview. Then a week later: Chris proposes with a promise ring. Kendra says yes. Book 3 closes with Kendra wearing Chris's promise — and wondering what she promised away.`
    }
  });

  console.log(`\n=== Created ${book3Chapters.length} chapters ===`);

  const povCounts: Record<string, number> = {};
  for (const ch of book3Chapters) {
    povCounts[ch.pov] = (povCounts[ch.pov] || 0) + 1;
  }
  console.log('\nChapters by POV:');
  for (const [pov, count] of Object.entries(povCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${pov}: ${count}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
