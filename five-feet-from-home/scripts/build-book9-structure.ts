import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { name: 'STORY_PROJECT' }
  });

  const projectId = project?.id;
  if (!projectId) throw new Error('No project found');

  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 9' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 9');
  }

  // Create Book 9: The Chessmaster
  const book9 = await prisma.book.create({
    data: {
      title: 'Book 9: The Chessmaster',
      projectId: projectId,
      synopsis: 'Hawk maps the board. With Addie stable but still armored, he sees the root causes that keep her caged: her unresolved past with Elena, her lost bond with Kendra, and Chris as the pivot point who could be either grenade or peace deal. Working with "the committee" (Cole, Elena, Doc, Jasper), Hawk orchestrates moves without Addie knowing the full strategy — she only knows he has a chessboard to kill her root causes. The endgame: heal the broken triangle, bring Addie and Kendra back together as sisters, and prove that the truth frees rather than destroys.',
      status: 'outlined'
    }
  });

  const chapters = [
    // ============================================
    // PART 1: MAPPING THE BOARD (Ch 1-12)
    // ============================================
    { number: 1, title: 'The Chessmaster Returns', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Late night. Addie sleeps. Hawk lies awake, running the board in his head. He maps the pieces: Addie the Queen burning out alone, Kendra the Rook pulled back behind her wall, Chris the Knight who knows more than he lets on. He sees the root causes. Time to play grandmaster.' },

    { number: 2, title: 'The Committee Meeting', pov: 'Hawk', location: 'Private Dining Room', synopsis: 'Hawk lays out his chessboard to the committee — Cole, Elena, Doc on speaker, Jasper listening. He draws the pieces on a napkin: Addie=Queen, Kendra=Rook, Chris=Knight, Elena=Bishop, Cole=Castle Wall, Doc=King. "And me? I\'m the pawn who made it across the board and became another queen."' },

    { number: 3, title: 'The Checkmate Vision', pov: 'Hawk', location: 'Private Dining Room', synopsis: 'Hawk reveals the endgame: "The checkmate isn\'t fixing her career or body. It\'s breaking her armor long enough to admit the truth: she loves Kendra. And that truth doesn\'t destroy her — it frees her." The room goes silent. Then Elena drops a bomb.' },

    { number: 4, title: 'Elena\'s Revelation', pov: 'Elena', location: 'Private Dining Room', synopsis: 'Elena tells them about the cabin trip that never was. "It wasn\'t just Addie and Kendra. It was me too. We were all going to... experiment. Two weeks after the promise ring. Before Colorado. Then everything shattered." Hawk: "That\'s the missing move. No wonder she\'s been caged."' },

    { number: 5, title: 'The Three of Them', pov: 'Elena', location: 'Hallway', synopsis: 'After the meeting, Elena confesses more to Hawk alone. "It was real. Me, Addie, Kendra. We were inseparable. The jokes that lingered, the late nights where lines blurred. We all felt it." Hawk: "You didn\'t just lose a rook. You lost a whole formation."' },

    { number: 6, title: 'Chris the Knight', pov: 'Hawk', location: 'Bar', synopsis: 'Beers with Chris. Hawk probes carefully. Chris surprises him with blunt honesty: "I know about Addie and Kendra. At least I suspect. At first it stung. But I want playful Kendra back. If Addie being in her life does that, I\'m not against it." The knight just volunteered onto the board.' },

    { number: 7, title: 'The Peace Deal or Grenade', pov: 'Hawk', location: 'Living Room', synopsis: 'Hawk reports to the committee: "Chris is in play. He could be the peace deal or the hand grenade. Every move has to heal the moment when Addie pulled away. One wrong step and this becomes shrapnel." Cole: "Then don\'t miss."' },

    { number: 8, title: 'The Pawn Strategy', pov: 'Hawk', location: 'Jasper\'s Study', synopsis: 'Hawk explains the Elena pawn to her privately: "You\'re still the bishop. But your romantic history with Addie is a pawn blocking every forward move. Until it falls, she won\'t let go." Elena: "And if it backfires?" Hawk: "Then she\'s back in the hospital. But if it works — she stops hiding."' },

    { number: 9, title: 'Approval at Distance', pov: 'Hawk', location: 'Jasper\'s Study', synopsis: 'Hawk names the move: Elena and Addie get physical again. It happens naturally. "My role is approval from distance. If she leans in, I stand down. Checkmate is the cabin trip where all three of us feel comfortable." Elena: "All three?" Hawk: "You, me, and her. Free."' },

    { number: 10, title: 'Telling Addie', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk tells Addie he has chessboard moves ready. "Doc\'s method: find three root causes, kill two. I\'ve got moves lined up. Give me the signal and I\'ll play them." Addie: "Don\'t make your moves yet." He just holds her. "I\'ll hold the board for you."' },

    { number: 11, title: 'Addie\'s Confession', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Late night talk. Addie tells Hawk about Elena — using sexuality as a tool to bring her back from dark places. "I actually enjoyed it. Not because I wanted her, but because I could save her. It was proof I had power." Hawk doesn\'t flinch: "You used the tools you had. That makes you a survivor."' },

    { number: 12, title: 'The Pawn Moves', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk\'s internal monologue: "Pawn\'s already halfway down. She\'s naming the bond herself. No forcing, no nudging — just truth. I\'ll let it breathe until she\'s ready to push further. Then I\'ll be there, approving at distance, just like I promised."' },

    // ============================================
    // PART 2: THE GAUNTLET (Ch 13-28)
    // ============================================
    { number: 13, title: 'Running Hot', pov: 'Hawk', location: 'Planning Room', synopsis: 'Hawk and Cole agree: run Addie through the gauntlet again. "After one pawn falls, she\'ll burn hotter and better without breaking." A world tour: Europe, Africa, Asia, South America, three U.S. stops. Full mission tempo. "Movement keeps her from falling into the shower at 3am. She\'ll be alive."' },

    { number: 14, title: 'The Gauntlet Begins', pov: 'Hawk', location: 'Planning Room', synopsis: 'Hawk assigns roles: "Elena, keep the banter alive. Bring the kids on U.S. legs. Grace and Lucas anchor her. Cole keeps her alive. I\'ll handle the flirty texts — War Goddess reminders. Fuel on the fire." Elena: "You\'re gambling with her heart." Hawk: "It\'s a grandmaster game. And she\'s winning."' },

    { number: 15, title: 'Europe: The Queen\'s Opening', pov: 'Addison', location: 'London/Berlin/Geneva', synopsis: 'Addie commands boardrooms in sleek black. Elena texts: "Your War Goddess heels are probably banned in three countries." Hawk replies to her selfie: "Grandmaster approves the queen\'s opening." Kendra drops a cheeky DM. Addie responds without cracking. Chessboard note: Kendra\'s effect — stable.' },

    { number: 16, title: 'Africa: Burn Brighter', pov: 'Addison', location: 'Kenya/Ghana', synopsis: 'Foundation work. Grace FaceTimes: "Mommy says Aunt Addie is saving elephants!" Hawk texts: "War Goddess walking barefoot in Africa — yeah, burn brighter." Addie flirts back: "Maybe you\'ll be lucky enough to see the tan lines." Cole notes: she\'s working hotter but controlled.' },

    { number: 17, title: 'Asia: Checkmate Incoming', pov: 'Addison', location: 'Singapore/Tokyo/Seoul', synopsis: 'High-stakes strategy meetings. Elena texts: "Remember, chopsticks aren\'t daggers." Hawk: "You in silk in Tokyo is a checkmate I\'m not ready for." Addie sends a hotel mirror selfie in crimson: "Careful, Chessmaster, you\'ll lose all your pawns." Kendra banter stays breezy. The goddess is back.' },

    { number: 18, title: 'South America: Pool Boy', pov: 'Addison', location: 'Brazil/Chile', synopsis: 'Grace and Lucas fly in with Elena for Rio. Addie runs barefoot on the beach with Grace, FaceTimes Hawk: "See, pool boy, you\'d never keep up." Hawk: "That\'s funny, I only like running if I get to stare at you." Cole notes: she\'s laughing more than in months. Stability confirmed.' },

    { number: 19, title: 'U.S. Legs: Family Anchor', pov: 'Addison', location: 'NYC/Dallas/Denver', synopsis: 'Elena and Grace join in Dallas. Grace: "Where\'s my tiger, Uncle Hawk?" Addie slips him a look. Kendra group banter: "NYC without me? Slacking." Addie: "War Goddess doesn\'t share Manhattan." U.S. legs = family anchor. No shower cracks.' },

    { number: 20, title: 'Testing Waters: Chris', pov: 'Hawk', location: 'Hotel Gym', synopsis: 'Dallas. Post-workout. Hawk probes: "You ever wonder if you and Chris need to talk? About Kendra. About what broke." Addie stiffens: "What if I light the grenade? What if it wrecks us?" Hawk: "If it\'s a grenade, I\'ll be the blast shield. You can\'t lose me."' },

    { number: 21, title: 'Addie\'s Real Fear', pov: 'Addison', location: 'Hotel Gym', synopsis: 'Addie admits her deepest fear: "I\'m scared of messing up Chris and Kendra\'s relationship. That\'s the most important thing to me. If I blow that up..." She drops her head against Hawk\'s chest. "I miss her so much. But Chris scares me because he saw me at my worst."' },

    { number: 22, title: 'Beers Round Three', pov: 'Hawk', location: 'Bar', synopsis: 'Hawk meets Chris again. Pushes carefully: "What would it take for her to get back there?" Chris: "Trust. Playfulness. Time. The damage isn\'t Addie and me — it\'s Addie missing from Kendra\'s life. That\'s the wound." Hawk files it: peace deal confirmed, not grenade.' },

    { number: 23, title: 'Chris Admits Everything', pov: 'Chris', location: 'Bar', synopsis: 'Chris opens up: "I know their thing was more than friends. At first it hurt. But now? I\'ve watched what losing Addie did to Kendra. The hole it left. She needs Addie back. Maybe not the same way, but she needs her. And I want Kendra whole. I want us strong."' },

    { number: 24, title: 'The Bridge Not Grenade', pov: 'Hawk', location: 'Bar', synopsis: 'Hawk realizes: "Chris isn\'t the wall. He\'s the bridge." He reports to the committee: "Step one was Elena — pawn taken. Step two was Chris — piece secured. Now the board\'s almost set. The husband isn\'t the wall. He\'s the bridge."' },

    { number: 25, title: 'Canada: War Goddess on Fire', pov: 'Addison', location: 'Montreal/Toronto', synopsis: 'Final leg. Addie sends Hawk her first real flirty mirror pic — blazer open, bra showing. Caption: "War Goddess on fire." Hawk texts Elena: "The Goddess is back. Got a pic tonight that might kill me." Chessboard note: running hot, stable with Kendra banter. Now... the real moves.' },

    { number: 26, title: 'Post-Gauntlet Assessment', pov: 'Hawk', location: 'Home', synopsis: 'Addie returns from the gauntlet transformed. Hotter, sharper, laughing. Hawk\'s assessment: "She doesn\'t crack under stress anymore. She cracks in silence. The tempo kept her alive. Now she\'s ready for the next phase."' },

    { number: 27, title: 'The Signal', pov: 'Addison', location: 'Home', synopsis: 'Addie finally gives the signal. "Okay, Chessmaster. I\'m ready. Make your moves." Hawk studies her. "You sure?" She nods. "Kill my root causes. I trust you." First time she\'s said those words. The game begins.' },

    { number: 28, title: 'Pieces in Position', pov: 'Hawk', location: 'Home', synopsis: 'Hawk calls the committee: "She gave the signal. Pieces in position. Chris is prepped, Elena knows her role, Cole\'s on standby. This is it." Doc on speaker: "Make damn sure she\'s ready before you pull the pin." Hawk: "She\'ll be the one pulling it. Not me."' },

    // ============================================
    // PART 3: CHECKMATE (Ch 29-40)
    // ============================================
    { number: 29, title: 'Chris and Addie: Wine Bar', pov: 'Addison', location: 'Wine Bar', synopsis: 'Small wine bar. Just Chris and Addie. No Hawk, no Kendra. Addie shakes: "I\'m scared this conversation ruins everything you and Kendra have." Chris: "I know your relationship was more than friendship. At first it hurt. But now I see what not having you did to her. She needs you back."' },

    { number: 30, title: 'The Truth Spoken', pov: 'Chris', location: 'Wine Bar', synopsis: 'Chris says it clearly: "I want Kendra whole. And Addie\'s part of that. You\'re not a threat to us. You\'re the missing piece that makes her complete." Addie cries. Chris reaches across the table. "Come home. Both of us want you there."' },

    { number: 31, title: 'Hawk\'s Report', pov: 'Hawk', location: 'Home', synopsis: 'Addie returns from the wine bar. Eyes red but bright. "It worked. He doesn\'t hate me. He wants me back in her life." Hawk pulls her close. "Peace deal. Not grenade. I told you the board was set right."' },

    { number: 32, title: 'Double Date Setup', pov: 'Hawk', location: 'Restaurant', synopsis: 'First double date: Hawk and Addie, Chris and Kendra. Private room. Cole and Elena at a corner table "by chance" — watching like guardians. The air is charged. Kendra and Addie haven\'t been alone together in years.' },

    { number: 33, title: 'Kendra Speaks', pov: 'Kendra', location: 'Restaurant', synopsis: 'Kendra finally says it: "I missed you. Every day. When you pulled away, I thought I\'d done something wrong. Chris told me... he told me he talked with you." Addie: "I pulled away to protect you. I was wrong." The armor cracks on both sides.' },

    { number: 34, title: 'The Sisterhood Returns', pov: 'Addison', location: 'Restaurant', synopsis: 'The dinner shifts. Old jokes surface. Kendra\'s playful side emerges. Addie matches it. Chris and Hawk exchange glances: mission accomplished. By dessert, Addie and Kendra are laughing like they used to. The rook has returned to the board.' },

    { number: 35, title: 'The Cabin Plan', pov: 'Hawk', location: 'Home', synopsis: 'Hawk proposes the endgame: "The cabin trip. The one that never happened. But this time — you, me, Elena. All three of us comfortable. That\'s checkmate." Addie freezes. "The cabin?" Hawk: "Only if you\'re ready. No forcing. No surprises."' },

    { number: 36, title: 'Elena\'s Agreement', pov: 'Elena', location: 'Oak Watch', synopsis: 'Hawk and Addie approach Elena together. "The cabin trip. All of us." Elena\'s eyes fill. "You know what that means. What it could mean." Addie: "I know. And I want to find out. Finally." The bishop agrees to move diagonally one last time.' },

    { number: 37, title: 'The Cabin Arrival', pov: 'Addison', location: 'Cabin', synopsis: 'The cabin. Mountains, firepit, three bedrooms. Addie, Hawk, Elena arrive separately to build comfort. The first hour is logistics. The tension is there but different — anticipation, not fear. The board is set for the final move.' },

    { number: 38, title: 'The Night of Truth', pov: 'Hawk', location: 'Cabin', synopsis: 'Evening. Wine by the fire. No scripts, no agenda. Elena talks about the old days. Addie admits things she\'s never said aloud. Hawk listens, steady, grounding. The ghosts get named. The armor falls piece by piece. This is what freedom feels like.' },

    { number: 39, title: 'Comfortable', pov: 'Addison', location: 'Cabin', synopsis: 'Morning. Addie wakes between Elena and Hawk. No panic. No shame. Just... comfort. "We did it," she whispers. Hawk: "You did it. We just held the board." Elena: "We\'re finally whole." The checkmate Hawk saw from the beginning. Real.' },

    { number: 40, title: 'The Chessmaster Rests', pov: 'Hawk', location: 'Cabin', synopsis: 'Hawk sits on the porch. Addie and Elena laugh inside. The board is clear. Every piece in place. Every root cause killed or carried. He didn\'t force anything — just created conditions for truth. She chose. She healed. "Checkmate," he whispers. And smiles.' }
  ];

  for (const ch of chapters) {
    await prisma.chapter.create({
      data: {
        projectId: projectId,
        bookId: book9.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        tags: ch.location,
        status: 'outlined'
      }
    });
  }

  console.log('✅ Book 9: The Chessmaster - 40 chapters');
  console.log('');
  console.log('PART 1: MAPPING THE BOARD (Ch 1-12)');
  console.log('  - Hawk maps the pieces: Addie=Queen, Kendra=Rook, Chris=Knight');
  console.log('  - Elena reveals the cabin trip that never was');
  console.log('  - Elena pawn strategy: her romantic history with Addie');
  console.log('  - Chris identified as peace deal or grenade');
  console.log('');
  console.log('PART 2: THE GAUNTLET (Ch 13-28)');
  console.log('  - World tour: Europe, Africa, Asia, South America, US');
  console.log('  - Testing Addie\'s resilience after first pawn falls');
  console.log('  - Hawk tests waters about Chris with Addie');
  console.log('  - Chris admits everything - bridge not grenade');
  console.log('  - Addie gives the signal: "Make your moves"');
  console.log('');
  console.log('PART 3: CHECKMATE (Ch 29-40)');
  console.log('  - Chris and Addie wine bar conversation');
  console.log('  - Double date: Hawk/Addie + Chris/Kendra');
  console.log('  - The sisterhood returns');
  console.log('  - The cabin trip: Addie, Hawk, Elena');
  console.log('  - Checkmate: all three comfortable, ghosts gone');

  await prisma.$disconnect();
}

main().catch(console.error);
