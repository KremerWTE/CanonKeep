import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find the project
  const project = await prisma.project.findFirst({
    where: { name: { contains: 'Five Feet' } }
  });

  if (!project) {
    console.log('Project not found. Creating default project...');
    const newProject = await prisma.project.create({
      data: {
        name: 'Five Feet From Home',
        description: 'Corporate crisis management meets family drama',
        genre: 'Romance/Drama'
      }
    });
    console.log('Created project:', newProject.name);
  }

  const projectId = project?.id || (await prisma.project.findFirst())?.id;

  if (!projectId) {
    throw new Error('No project found');
  }

  // Delete existing Book 4 if it exists
  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 4' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 4');
  }

  // Create Book 4: The Breaking Point
  const book4 = await prisma.book.create({
    data: {
      title: 'Book 4: The Breaking Point',
      projectId: projectId,
      synopsis: 'Addie becomes indispensable as crises stack globally. Her schedule: 20 hours working, 2 hours gym, 2 hours sleep. She looks stunning and perfect while closing cases across Denver, Asia, Spain, and Africa. The SM network notices — whispers grow that she\'s perfect for POH. Weekly Zoom calls with Grace are her only tether. Meanwhile, Kendra receives a promise ring, Harper gets engaged. The book ends with Addie\'s collapse — Cole finds her on the office floor at 2am and drives her to the hospital himself.',
      status: 'outlined'
    }
  });

  // Book 4 Chapters - The Breaking Point (55 chapters)
  const chapters = [
    // ============================================
    // PART 1: DENVER CRISIS (Ch 1-15)
    // ============================================
    { number: 1, title: 'Western Collapse', pov: 'Jasper', location: 'Charlotte', synopsis: 'Telecom systems across the Western US collapse. Denver becomes ground zero. Jasper gets the call at 3am — this is bigger than anything they\'ve faced. He makes a decision: stay in Charlotte, run strategic cover from HQ. It\'s time to learn a new way to lead.' },

    { number: 2, title: 'Addie Takes Point', pov: 'Addison', location: 'Denver', synopsis: 'Addie flies to Denver to lead the Midwest team. CLT support is split and inconsistent. She\'s essentially alone with a skeleton crew. First day: chaos. But she thrives in chaos. Her schedule crystallizes: 20 hours working, 2 hours in the hotel gym, 2 hours of sleep. She looks immaculate — silk blouse, perfect makeup, not a hair out of place. No one can see she\'s running on fumes.' },

    { number: 3, title: 'Grace Call #1', pov: 'Addison', location: 'Denver Hotel', synopsis: 'First weekly Zoom with Grace from Denver. Grace shows off her spelling test — 100%. She asks when Aunt Addie is coming home. "Soon, Gracie. I promise." Grace makes her pinky-promise through the screen. Addie does. Then hangs up and works until 3am.' },

    { number: 4, title: 'Daniel\'s Trial', pov: 'Addison', location: 'Denver', synopsis: 'Daniel — Yale IR grad, PhD in theory — arrives as support. Eager but untested. Addie watches him fumble through his first real-world crisis. Book-smart means nothing when systems are burning. She starts teaching him the hard way. Between meetings, she does a 45-minute HIIT session in the stairwell.' },

    { number: 5, title: 'The 5-Foot World', pov: 'Addison', location: 'Denver', synopsis: 'A week in. The schedule holds: 20 hours work, 2 hours gym, 2 hours sleep. She develops a new coping mechanism: the 5-foot world. Only focus on the next 5 feet. The next task. The next hour. Ignore the bigger picture. Her skin glows from the hotel facials she books at 5am. Her hair is always perfect. No one suspects the machine is breaking.' },

    { number: 6, title: 'Promise Ring', pov: 'Kendra', location: 'Charlotte', synopsis: 'CrossFit Games are over. Kendra\'s boyfriend surprises her with a promise ring. Not a proposal — a next step. She says yes. It feels right. Stable. Safe. She texts Addie the news. Addie\'s response is one word: "Congrats."' },

    { number: 7, title: 'The Sting', pov: 'Addison', location: 'Denver', synopsis: 'Addie sees Kendra\'s promise ring photo. Something twists inside her. She tells herself it\'s fine. Kendra deserves happiness. But she buries herself deeper in work. Skips dinner. Hits the gym harder — an extra hour of cardio. She closes a pharmaceutical case remotely while managing Denver. Two fires, one woman. She looks stunning. She\'s dying inside.' },

    { number: 8, title: 'Harper\'s Moment', pov: 'Harper', location: 'Charlotte', synopsis: 'Harper\'s boyfriend proposes. She says yes. But instead of stepping back, she steps up — becoming Jasper\'s #1 field operator. She\'s becoming "his younger self" in capability. The torch is passing.' },

    { number: 9, title: 'Grace Call #2', pov: 'Addison', location: 'Denver Hotel', synopsis: 'Second weekly Zoom. Grace is learning cursive — shows Addie her wobbly signature. "Look, I wrote your name too!" ADDISON in careful loops. Addie\'s throat tightens. "That\'s beautiful, baby." Grace asks why Addie looks tired. "Just the lighting, Gracie." She applies more concealer after the call. Then works 22 hours straight.' },

    { number: 10, title: 'Elena Thrives', pov: 'Elena', location: 'Charlotte', synopsis: 'Elena returns to work and thrives. She\'s found her rhythm again. Grace is in school, Lucas is with the nanny, and she\'s closing deals. Kendra visits often, bonding with her and Grace. The sisterhood is shifting — Addie\'s absence is felt at Sunday dinners.' },

    { number: 11, title: 'The SM Charity Lunch', pov: 'Addison', location: 'Denver', synopsis: 'A Sapientia Minervae charity luncheon in Denver. Addie attends despite exhaustion — networking is survival. She wears a tailored cream suit, commands every conversation. Lady Margaret pulls her aside: "You have presence, dear. The Order has noticed." Whispers follow Addie. POH has been vacant for years. People are wondering.' },

    { number: 12, title: 'Denver Week Two', pov: 'Addison', location: 'Denver', synopsis: 'Two weeks in Denver. The schedule holds: 20 hours work, 2 hours gym, 2 hours sleep. Addie closes a tech merger case from her hotel room between Denver fires. She looks stunning in her power suits — everyone comments on how "put together" she is. Her hands shake when she\'s alone. Daniel is improving.' },

    { number: 13, title: 'Jasper\'s New Rhythm', pov: 'Jasper', location: 'Charlotte', synopsis: 'Jasper is learning to lead from the backline. Morning strategy calls. Afternoon with Grace. Evening check-ins with field teams. It\'s working. He\'s proving you can be present and powerful. But he worries about Addie — she\'s closing more cases than anyone, but something feels off.' },

    { number: 14, title: 'The Sisterhood Shifts', pov: 'Kendra', location: 'Charlotte', synopsis: 'Kendra notices Addie pulling away. Texts go unanswered. Calls ignored. She talks to Elena about it. Elena says give her space. But Kendra knows something\'s wrong. She just doesn\'t know how wrong.' },

    { number: 15, title: 'Denver Breakthrough', pov: 'Addison', location: 'Denver', synopsis: 'Major breakthrough in Denver — they\'ve identified the root cause. But before they can celebrate, Addie\'s phone rings. Jasper. "We have a situation in Asia. Ridge needs you. Two days, then you\'re back." She doesn\'t hesitate. "I\'m on the next flight." She hasn\'t slept in 38 hours. She looks perfect.' },

    // ============================================
    // PART 2: GLOBAL DETOUR (Ch 16-30)
    // ============================================
    { number: 16, title: 'Asia: Day One', pov: 'Addison', location: 'Asia', synopsis: 'Addie lands in Asia exhausted. Ridge briefs her on a regional political crisis threatening major clients. She has 48 hours to fix it. She doesn\'t sleep. She works out in the hotel gym at 4am — an hour of weights, an hour of cardio. She looks fresh for the 7am meeting. The 5-foot world is all she knows now.' },

    { number: 17, title: 'Grace Call #3', pov: 'Addison', location: 'Asia Hotel', synopsis: 'Weekly Zoom from Asia — time zones make it early morning for Addie, evening for Grace. Grace is excited about her school play. She\'s playing a flower. She practices her one line for Addie: "The sun makes me grow!" Addie laughs for the first time in days. After the call, the laughter fades. Back to work.' },

    { number: 18, title: 'Asia: Day Two', pov: 'Addison', location: 'Asia', synopsis: 'Second day in Asia. Addie pulls off an impossible save — relationships mended, assets protected. Ridge is impressed. "You\'re something else." She\'s already on her phone — Spain is burning. "I\'ll handle it," she tells Jasper. He doesn\'t argue. She packs while still on the call.' },

    { number: 19, title: 'Spain: The Fire', pov: 'Addison', location: 'Spain', synopsis: 'High-profile client in Spain. Political and technical tensions. Addie lands and goes straight to meetings. No hotel check-in. No shower. Just the next 5 feet. She finds a gym at midnight, does 90 minutes of brutal cardio. She patches the situation in 36 hours. She looks flawless in the final meeting.' },

    { number: 20, title: 'Daniel Steps Up', pov: 'Jasper', location: 'Charlotte', synopsis: 'With Addie gone, Jasper gives Daniel functional command in Denver. It\'s a test. Daniel rises to it. He\'s not Addie — but he\'s proving himself. Jasper sees a future #4 fixer emerging. Meanwhile, Addie has closed 3 cases this week alone.' },

    { number: 21, title: 'The Order of Malta Dinner', pov: 'Addison', location: 'Spain', synopsis: 'Before leaving Spain, Addie attends an Order of Malta dinner — networking never stops. She wears a black gown that draws every eye. A Grand Master comments: "Jasper\'s protégé has become something more." A Dame whispers to her friend: "POH material, surely." Addie smiles graciously. Her heart pounds from caffeine.' },

    { number: 22, title: 'Africa: Infrastructure', pov: 'Addison', location: 'Africa', synopsis: 'From Spain to Africa. Infrastructure failure. Addie hasn\'t been home in three weeks. She\'s solving four fires in four countries. In airport lounges, she holds the museum keepsake from her trip with Kendra and Grace. It\'s her only tether. She does push-ups in the business lounge. People stare. She doesn\'t care.' },

    { number: 23, title: 'Grace Call #4', pov: 'Addison', location: 'Africa Hotel', synopsis: 'Weekly Zoom. Grace has a loose tooth — she wiggles it on camera. "The tooth fairy gives FIVE dollars now!" Addie: "Inflation." Grace: "What\'s inflation?" For twenty minutes, Addie explains economics to a second-grader using candy examples. Grace giggles. Addie breathes. Then the call ends.' },

    { number: 24, title: 'The Keepsake', pov: 'Addison', location: 'Africa', synopsis: 'Late night in an African hotel room. Addie pulls out the museum prize — a small trinket from that trip with Kendra and Grace. She holds it for a long time. It represents everything she\'s running from. Her schedule: 20 hours work, 2 hours gym, 2 hours sleep. She looks perfect. She puts the keepsake back in her purse.' },

    { number: 25, title: 'Kendra\'s Worry', pov: 'Kendra', location: 'Charlotte', synopsis: 'Kendra tries calling Addie. Straight to voicemail. Texts: read but not answered. She goes to Elena. "Something\'s really wrong. She looks amazing in all her photos but she\'s never home." Elena agrees. They decide to talk to Jasper.' },

    { number: 26, title: 'Pull Her Back', pov: 'Elena', location: 'Charlotte', synopsis: 'Elena and Kendra confront Jasper. "Pull her back before she destroys herself." Jasper is torn. He calls Addie. Her response is cold: "I\'m fine. Better than fine. Check the case numbers." She\'s closed 8 cases in 4 weeks. Record-breaking.' },

    { number: 27, title: 'Africa: The Win', pov: 'Addison', location: 'Africa', synopsis: 'Addie solves the African infrastructure crisis. Four fires. Four countries. All extinguished. She\'s brilliant. She\'s unstoppable. She\'s eating protein bars for meals and running on 2 hours of sleep. Her hair shines. Her makeup is flawless. She\'s dying.' },

    { number: 28, title: 'The SM Gala', pov: 'Addison', location: 'Africa', synopsis: 'A last-minute SM fundraising gala in Johannesburg. Addie attends in a stunning red gown she bought that afternoon. She dazzles — speaks three languages, quotes market data, charms donors. Lady Caroline takes her aside: "The whispers are getting louder, dear. POH has been empty too long. Your name is on everyone\'s lips." Addie smiles. Inside, she\'s hollow.' },

    { number: 29, title: 'The Flight Home', pov: 'Addison', location: 'In Transit', synopsis: 'On the flight back to the US, Addie stares out the window. She should feel victorious. She feels hollow. Her hands shake from caffeine. Her heart races. She does stretches in the airplane bathroom. Applies fresh makeup. She tells herself it\'s just turbulence.' },

    { number: 30, title: 'Denver Closed', pov: 'Addison', location: 'Denver', synopsis: 'Addie returns to Denver. Daniel has closed the crisis. He did it. She trained him well. Everyone celebrates. Addie stands apart in a perfect silk blouse, already thinking about the next thing. There\'s always a next thing.' },

    // ============================================
    // PART 3: THE UNRAVELING (Ch 31-42)
    // ============================================
    { number: 31, title: 'Back to Charlotte', pov: 'Addison', location: 'Charlotte', synopsis: 'Addie returns to Charlotte HQ. She looks different — thinner but toned, paler but with perfect makeup, eyes that don\'t quite focus but framed by flawless liner. Elena tries to hug her. Addie stiffens. "I have work to do." She goes to the gym before unpacking.' },

    { number: 32, title: 'Grace Call #5', pov: 'Addison', location: 'Charlotte', synopsis: 'Finally a Zoom from home. Grace lost her tooth! She holds up a crumpled dollar — Elena let her keep the money from under her pillow. "But I wanted to show YOU first." Addie\'s heart cracks a little. "I\'m so proud of you, Gracie." Grace: "Are you home now?" Addie: "For a little while."' },

    { number: 33, title: 'The Band-Aid Theory', pov: 'Addison', location: 'Charlotte', synopsis: 'Addie makes a decision: pull away from everyone. Rip the band-aid off. She believes distancing herself protects Kendra\'s happiness with her boyfriend. Protects Elena from her chaos. It\'s sacrifice. It\'s love. It\'s self-destruction. She looks perfect doing it.' },

    { number: 34, title: 'The EOHSJ Reception', pov: 'Addison', location: 'Charlotte', synopsis: 'EOHSJ reception at the Cathedral. Addie attends — another SM networking event. She wears a navy dress that costs more than her first month\'s rent. A Knight approaches: "We\'ve been watching your work. Impressive." A Dame: "POH needs someone who can handle pressure. You seem... unbreakable." If only they knew.' },

    { number: 35, title: 'Kendra\'s Stability', pov: 'Kendra', location: 'Charlotte', synopsis: 'Kendra settles into life with her promise-ring boyfriend. She spends more time with Elena and Grace. The sisterhood trio becomes Elena-Kendra-Grace. Addie\'s chair at Sunday dinner stays empty. Kendra wonders how Addie can look so perfect and be so absent.' },

    { number: 36, title: 'The Mason Call', pov: 'Addison', location: 'Charlotte', synopsis: 'Addie is on a call with Mason — her mentor. Updating him on Denver, Asia, Spain, Africa. Eleven cases closed. Her schedule: 20 hours work, 2 hours gym, 2 hours sleep. Mid-sentence, her vision blurs. Her words slur. She faints. The line goes dead.' },

    { number: 37, title: 'Mason\'s Warning', pov: 'Addison', location: 'Charlotte', synopsis: 'Addie wakes up on the office floor. Phone buzzing. Mason calling back. She answers, shaky, fixes her hair. He\'s furious. "You need to see the mental performance coach." Her response: "I have four fires in four countries. That\'s therapy enough." She reapplies her lipstick. Back to work.' },

    { number: 38, title: 'Word Spreads', pov: 'Elena', location: 'Charlotte', synopsis: 'Word of Addie\'s collapse reaches Elena and Kendra. They panic. Try to reach her. Addie dodges calls. Gives curt replies. "I\'m fine. It was just low blood sugar." She sends a selfie to prove it — perfect hair, glowing skin. She doesn\'t mention she took 47 photos to get one where she didn\'t look dead.' },

    { number: 39, title: 'Grace Call #6', pov: 'Addison', location: 'Charlotte', synopsis: 'Weekly Zoom. Grace is making a Mother\'s Day card — even though it\'s October. "It\'s for you," she whispers. "Don\'t tell Mommy. You\'re like my other mommy." Addie can\'t breathe. "I love you, Gracie." "I love you more, Aunt Addie." After the call, Addie cries in the gym shower.' },

    { number: 40, title: 'The Ultimatum', pov: 'Jasper', location: 'Charlotte', synopsis: 'Elena and Kendra beg Jasper to pull Addie back. Jasper confronts her. She\'s just come from the gym — 2 hours, perfect ponytail. "You need to stop." Addie\'s response is ice: "If you pull me, I\'m gone. I\'ll walk." Jasper is stunned.' },

    { number: 41, title: 'Chicago Flares', pov: 'Addison', location: 'Chicago', synopsis: 'New crisis in Chicago. Addie volunteers before anyone can stop her. She\'s running toward the fire because standing still means facing herself. And that terrifies her more than any crisis. She packs a gym bag. Her schedule: 20 hours work, 2 hours gym, 2 hours sleep.' },

    { number: 42, title: 'Jasper Flies', pov: 'Jasper', location: 'Chicago', synopsis: 'Jasper makes a decision. He flies to Chicago to meet Addie face-to-face. This isn\'t about work anymore. This is about family. He finds her at midnight in the hotel gym. She looks stunning. She\'s been there for 3 hours.' },

    // ============================================
    // PART 4: THE BREAKING (Ch 43-55)
    // ============================================
    { number: 43, title: 'The Chicago Talk', pov: 'Addison', location: 'Chicago', synopsis: 'Jasper finds Addie in the hotel conference room at 6am, pale but perfect. He reminds her of when he promoted her from assistant to office manager — right here in Chicago. "I believed in you then. I believe in you now. But you\'re killing yourself." She listens but doesn\'t yield. Her hair is flawless.' },

    { number: 44, title: 'You Are Family', pov: 'Jasper', location: 'Chicago', synopsis: 'Jasper tells her: "You\'re family, Addie. Always will be. Even when you push us away." She accepts the bridge — but doesn\'t walk across it. She thanks him. Returns to work. The conversation cracks something, but doesn\'t break through.' },

    { number: 45, title: 'Work, Self, Family', pov: 'Addison', location: 'Chicago', synopsis: 'Addie\'s internal logic: Work → Self → Family. She must prove herself through work before she can face herself. And she can\'t face her family until she\'s "fixed." But she refuses to look at herself — because that\'s what terrifies her most. She hits the gym. 3 hours. She looks perfect.' },

    { number: 46, title: 'Chicago Solved', pov: 'Addison', location: 'Chicago', synopsis: 'Addie solves Chicago. Another brilliant save. Another notch on the belt. She should fly home. Instead, she takes another case. And another. She can\'t stop. Total cases this quarter: 14. Record-breaking. She attends a SM dinner in Chicago. More whispers about POH.' },

    { number: 47, title: 'Grace Call #7', pov: 'Addison', location: 'Hotel Room', synopsis: 'Weekly Zoom. Grace shows her Halloween costume plans — she wants to be a "business lady like Aunt Addie." She\'s drawn a picture: stick figure in a suit, holding a briefcase and a phone. "See, you\'re saving the world!" Addie forces a smile. "That\'s beautiful, Gracie." Grace: "You look tired." "I\'m okay." She\'s not okay.' },

    { number: 48, title: 'Everyone Moves Forward', pov: 'Elena', location: 'Charlotte', synopsis: 'Elena is thriving at work. Kendra is settled with her boyfriend. Harper is engaged and crushing it in the field. Daniel is the new #4. Everyone is moving forward. Except Addie, who is falling apart while looking absolutely perfect.' },

    { number: 49, title: 'The SM Network Buzz', pov: 'Addison', location: 'Charlotte', synopsis: 'Back in Charlotte, Addie attends three SM events in one week. A charity auction, a board dinner, a foundation meeting. She\'s brilliant at all of them. The whispers are now open conversation: "She\'s the one. For POH." Lady Margaret: "The role has been vacant too long. Perhaps it\'s time." Addie smiles. Her hands shake under the table.' },

    { number: 50, title: 'The Hollow Victory', pov: 'Addison', location: 'Various', synopsis: 'Addie has closed more cases in three months than most fixers close in a year. She\'s legendary. She\'s indispensable. She\'s eating protein bars for meals and running on 2 hours of sleep. The 5-foot world is now 5 inches. But her hair is perfect. Her makeup is flawless. She\'s stunning. She\'s dying.' },

    { number: 51, title: 'Cole\'s Concern', pov: 'Cole', location: 'Charlotte', synopsis: 'Cole — one of the NSA specialists — notices Addie at HQ. She\'s in at midnight, still there at 6am, then hits the gym for 2 hours, then back to work. She looks amazing. Something is very wrong. He mentions it to Jasper. "Someone should check on her." Jasper says he\'s tried. Cole decides to keep an eye out.' },

    { number: 52, title: 'Grace Call #8', pov: 'Addison', location: 'Charlotte Office', synopsis: 'Weekly Zoom — from the office at 9pm. Grace is in her pajamas. "Why are you at work, Aunt Addie?" "Just finishing something." "You always say that." Grace yawns. "I miss you." "I miss you too, baby." Grace falls asleep on camera. Addie watches her breathe for ten minutes before disconnecting. Then works until 4am.' },

    { number: 53, title: 'The Final Push', pov: 'Addison', location: 'Charlotte', synopsis: 'Addie takes on one more case. A complex situation requiring 72 hours of straight work. She tells herself this is the last one. After this, she\'ll rest. She always tells herself that. Her schedule breaks: 22 hours work, 1 hour gym, 1 hour sleep. She still looks perfect.' },

    { number: 54, title: 'Heart Racing', pov: 'Addison', location: 'Charlotte', synopsis: 'Midnight. Addie\'s heart is racing. Not from caffeine — from exhaustion. Her hands shake as she types. Her vision doubles. She blinks it away. Just a few more hours. Just the next 5 feet. She\'s wearing a $400 silk blouse. Her hair is still perfect. She\'s dying.' },

    { number: 55, title: 'Cole Finds Her', pov: 'Cole', location: 'Charlotte', synopsis: '2am. Cole is leaving the building after a late security project. He passes Addie\'s office. The light is on. He knocks. No answer. He opens the door. Addie is on the floor, unconscious, silk blouse wrinkled, perfect hair splayed around her. No food in two days. Heart arrhythmia from caffeine and exhaustion. He doesn\'t call 911. He gathers her up — she weighs almost nothing — and carries her to his car. He drives to the hospital himself, calling Jasper on the way. The book ends with Cole carrying Addie through the emergency room doors.' }
  ];

  // Insert all chapters
  for (const ch of chapters) {
    await prisma.chapter.create({
      data: {
        projectId: projectId,
        bookId: book4.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        tags: ch.location,
        status: 'outlined'
      }
    });
  }

  console.log('✅ Book 4: The Breaking Point created with', chapters.length, 'chapters');
  console.log('');
  console.log('=== BOOK 4 STRUCTURE ===');
  console.log('');
  console.log('PART 1: DENVER CRISIS (Ch 1-15)');
  console.log('PART 2: GLOBAL DETOUR (Ch 16-30)');
  console.log('PART 3: THE UNRAVELING (Ch 31-42)');
  console.log('PART 4: THE BREAKING (Ch 43-55)');
  console.log('');
  console.log('KEY ELEMENTS:');
  console.log('- Addie\'s schedule: 20 hours work, 2 hours gym, 2 hours sleep');
  console.log('- Looking stunning and perfect while dying inside');
  console.log('- 8 Grace Zoom calls throughout the book');
  console.log('- SM galas and networking — POH whispers grow');
  console.log('- ENDING: Cole carries Addie to the hospital himself');

  await prisma.$disconnect();
}

main().catch(console.error);
