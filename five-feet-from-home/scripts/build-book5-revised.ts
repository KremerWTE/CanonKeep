import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { name: { contains: 'Five Feet' } }
  });

  const projectId = project?.id;
  if (!projectId) throw new Error('No project found');

  // Delete existing Book 5
  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 5' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 5');
  }

  // Create Book 5: The Royal Phoenix Rising (REVISED - Hospital, Recovery, POH Grooming)
  const book5 = await prisma.book.create({
    data: {
      title: 'Book 5: The Royal Phoenix Rising',
      projectId: projectId,
      synopsis: 'Addie wakes in the hospital after her collapse. Cole introduces Hawk, who becomes her guide through recovery. Part 1 covers the hospital stay and family rallying. Part 2 is the slow recovery with Hawk as constant presence. Part 3 is Hawk guiding Addie through the early POH grooming process - not yet accepting, but being prepared. The book ends with Addie stable and the POH question formally raised.',
      status: 'outlined'
    }
  });

  const chapters = [
    // ============================================
    // PART 1: THE HOSPITAL (Ch 1-15)
    // ============================================
    { number: 1, title: 'White Ceiling', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Addie wakes to white. Hospital ceiling. Beeping machines. Her body feels like lead. She tries to sit up — can\'t. A nurse appears: "Easy. You\'ve been out for 18 hours." Heart arrhythmia. Severe exhaustion. Malnutrition. Her perfect facade has shattered.' },

    { number: 2, title: 'Cole\'s Vigil', pov: 'Cole', location: 'Charlotte Hospital', synopsis: 'Cole has been in the waiting room since he carried her through the ER doors at 2am. He remembers finding her — the silk blouse, the perfect hair splayed on the floor, how light she was. He drove 90 mph. He called Jasper from the car. He\'s not leaving until she\'s okay.' },

    { number: 3, title: 'The Family Arrives', pov: 'Elena', location: 'Charlotte Hospital', synopsis: 'Elena, Jasper, and Kendra crowd the waiting room. Grace wanted to come but it\'s a school day. Kendra is crying. Elena is silent with fury — at Addie for hiding, at herself for not seeing. Jasper blames himself. Doctor: minimum one week in hospital, then mandatory rest.' },

    { number: 4, title: 'Jasper\'s Guilt', pov: 'Jasper', location: 'Charlotte Hospital', synopsis: 'Jasper sits alone in the chapel. He pushed her. He saw the signs and didn\'t stop her. He flew to Chicago and still didn\'t pull her back. This is his fault. Elena finds him: "It\'s not your fault." He doesn\'t believe her. He needs to make this right.' },

    { number: 5, title: 'Addie Wakes Fully', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Second day. Addie is fully conscious. She asks for her phone — they\'ve taken it. She asks about her cases. Jasper: "Handled." She feels useless. Naked without work. For the first time in months, she has no 5-foot world to hide in.' },

    { number: 6, title: 'Cole Introduces Hawk', pov: 'Cole', location: 'Charlotte Hospital', synopsis: 'Day three. Cole brings a visitor — Jason "Hawk" Hayes, Delta Force operator. Cole: "Thought you two should meet. He\'s been consulting on BSS security." Hawk sees Addie in her hospital gown, stripped of her armor. Something shifts in him. She\'s fire that needs protecting.' },

    { number: 7, title: 'First Hawk Meeting', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Addie meets Hawk. He doesn\'t pity her. Doesn\'t lecture. Just sits and talks about Delta missions, tactical failures, moments when operators push too hard. "The body keeps score. You can\'t outrun yourself forever." She doesn\'t know why, but she listens.' },

    { number: 8, title: 'Grace\'s Hospital Visit', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Grace visits after school with a card: "Get Well Soon Aunt Addie" — glitter and stickers. She climbs into the hospital bed carefully. "Mommy said you worked too hard." Addie: "I did." Grace: "Don\'t do that anymore, okay?" Addie holds her tight. "Okay, baby."' },

    { number: 9, title: 'Kendra\'s Bedside', pov: 'Kendra', location: 'Charlotte Hospital', synopsis: 'Kendra visits alone. She holds Addie\'s hand. "I should have pushed harder. I saw you slipping." Addie: "I didn\'t want to be seen." Kendra admits her own fear — focused on Chris, on stability, while Addie fell. They cry together. First crack in the wall.' },

    { number: 10, title: 'The Mental Performance Coach', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Day four. Dr. Reyes, the mental performance coach Mason demanded, arrives. "I\'m not here to fix you. You\'re not broken. You\'re exhausted." First session: perfectionism, worth tied to productivity, the 5-foot world as avoidance. Addie cries for the first time in months.' },

    { number: 11, title: 'Hawk Returns', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Day five. Hawk shows up again. No reason given. He brings coffee (decaf) and sits. They talk about nothing — sports, weather, penguins. Addie realizes: he\'s not here to save her. He\'s just... here. It\'s been a long time since someone was just here.' },

    { number: 12, title: 'SM Rallies', pov: 'Elena', location: 'Charlotte Hospital', synopsis: 'The SM network mobilizes. Lady Margaret sends flowers with a note: "Rest. The role will wait." Lady Caroline arranges meal deliveries. Dames and Knights reach out. The message: POH needs you. But only when you\'re ready.' },

    { number: 13, title: 'Cole and Hawk Talk', pov: 'Cole', location: 'Hospital Cafeteria', synopsis: 'Cole and Hawk in the cafeteria. Cole: "You\'ve been here every day." Hawk: "She\'s... different." Cole: "Different how?" Hawk can\'t explain. He just knows he needs to be here. Cole sees it: his friend is falling for the woman he carried through the ER doors.' },

    { number: 14, title: 'Discharge Planning', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Day six. Doctors outline discharge: no work for one month, mandatory therapy, someone with her at all times first week. Addie feels trapped. Who is she without work? Hawk, visiting: "You\'re about to find out who you really are."' },

    { number: 15, title: 'Leaving the Hospital', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'One week. Discharge day. Addie is wheeled out. Cole drove her in; Hawk drives her home. In the car, silence. Then Hawk: "The hardest mission I ever ran wasn\'t combat. It was learning to be still." Addie stares out the window. She\'s terrified.' },

    // ============================================
    // PART 2: THE RECOVERY (Ch 16-30)
    // ============================================
    { number: 16, title: 'First Day Home', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Addie\'s apartment feels foreign. Elena stocked the fridge. Kendra installed a white noise machine. There\'s a schedule: meals, therapy, rest times. Addie doesn\'t know what to do with herself. She stares at the ceiling. The silence is deafening.' },

    { number: 17, title: 'Hawk\'s First Home Visit', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk shows up with takeout. "Cole mentioned you were home." He doesn\'t ask how she\'s feeling. Asks what she wants to watch. They sit on her couch — nature documentary. She falls asleep. He stays until Elena arrives. First of many visits.' },

    { number: 18, title: 'The Rotation', pov: 'Elena', location: 'Various', synopsis: 'The family creates a rotation. Elena mornings, Kendra afternoons, Hawk evenings (he volunteered). Jasper daily check-ins. Cole randomly. Addie feels smothered — then realizes: this is love. This is what she was running from.' },

    { number: 19, title: 'Therapy Session 2', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Second session with Dr. Reyes. "You built a cage and called it survival." Addie resists. Then: "I didn\'t know how else to cope." Dr. Reyes: "That\'s why we\'re here." Homework: one thing each day that isn\'t productive.' },

    { number: 20, title: 'Grace Time', pov: 'Addison', location: 'Oak Watch', synopsis: 'Addie visits Oak Watch — not to work. For Grace. They bake cookies (badly). Watch a movie. Grace teaches Addie a card game with changing rules. Three hours without thinking about cases. The longest break she can remember.' },

    { number: 21, title: 'Hawk\'s Story', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Evening with Hawk. Addie asks about his past. Vegas, women, whiskey, running from combat trauma. "I thought speed and chaos would fill the void. It doesn\'t." He looks at her. "You know something about that." First real connection.' },

    { number: 22, title: 'The Relapse Attempt', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Week two. Addie finds her work laptop. Opens it. Hundreds of emails. Her fingers hover. Then Hawk from the doorway: "That the best idea?" She closes it. Cries. He sits with her until she stops.' },

    { number: 23, title: 'Therapy Breakthrough', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Dr. Reyes pushes: "Why do you need to prove yourself?" Deflection. Deflection. Finally: "Because if I stop being useful, I stop mattering." Silence. "Who told you that?" Addie can\'t answer. The question haunts her.' },

    { number: 24, title: 'Three Week Mark', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Three weeks of rest. Sleeping 7 hours. Eating real meals. Hands don\'t shake. She looks in the mirror — color in her cheeks. She doesn\'t look perfect. She looks human. Terrifying and freeing.' },

    { number: 25, title: 'First Walk Outside', pov: 'Addison', location: 'Charlotte Park', synopsis: 'Hawk takes Addie for a walk. Not a workout — a walk. They sit on a bench. She watches children play. "I forgot the world existed outside the office." Hawk: "It\'s still here. Waiting." She leans against his shoulder. He doesn\'t move.' },

    { number: 26, title: 'Hawk and Jasper', pov: 'Jasper', location: 'BSS HQ', synopsis: 'Jasper meets with Hawk. "You\'ve been spending a lot of time with her." Hawk: "Is that a problem?" Jasper studies him. "Just don\'t hurt her. She\'s family." Hawk: "I know. That\'s why I\'m there."' },

    { number: 27, title: 'The Sisters Reconnect', pov: 'Kendra', location: 'Addie\'s Apartment', synopsis: 'Afternoon with Kendra. Real talk: the promise ring, Chris, the distance that grew. "I felt like I was losing you." Addie: "I was losing myself." They cry. They laugh. The sisterhood isn\'t healed, but it\'s healing.' },

    { number: 28, title: 'One Month', pov: 'Addison', location: 'Various', synopsis: 'One month since the hospital. Addie is stable. Not healed — stable. She can sit with silence now. She can be unproductive. She still doesn\'t know who she is without work. But she\'s learning.' },

    { number: 29, title: 'Hawk\'s Patience', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk hasn\'t pushed anything romantic. Hasn\'t even hinted. He\'s just present. Addie notices. "Why are you still here?" Hawk: "Because you\'re worth waiting for." She doesn\'t know what to say. She files it away.' },

    { number: 30, title: 'Ready for the Next Step', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Session with Dr. Reyes. "You\'ve stabilized. Now comes the harder work — rebuilding." Addie: "Rebuilding what?" Dr. Reyes: "Your life. On your terms this time." Addie thinks about POH. About Hawk. About who she wants to become.' },

    // ============================================
    // PART 3: POH GROOMING - HAWK AS GUIDE (Ch 31-45)
    // ============================================
    { number: 31, title: 'Lady Margaret\'s Letter', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'A handwritten letter from Lady Margaret. "The Order formally requests your consideration for POH. Not because you performed. Because you fell and chose to rise. That is the mark of true leadership." Addie shows Hawk. He reads it twice.' },

    { number: 32, title: 'Hawk as Guide', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk: "You know what POH means?" Addie: "Power. Responsibility. More pressure." Hawk: "Or — purpose. Community. Something bigger than yourself." He\'s seen how she lights up talking about the sisterhood, Grace, Elena. "This could be good for you. If you do it right."' },

    { number: 33, title: 'The First Feeler', pov: 'Elena', location: 'Oak Watch', synopsis: 'Elena sits with Addie. "Lady Margaret wants to meet. Informal. No pressure." Addie is nervous. Hawk: "I\'ll drive you. Wait in the car." Having him nearby makes it possible. She says yes.' },

    { number: 34, title: 'Tea with Lady Margaret', pov: 'Addison', location: 'Lady Margaret\'s Home', synopsis: 'Tea with Lady Margaret. The Dame is warm, sharp, assessing. "POH isn\'t about perfection. It\'s about presence." Addie: "I\'m still learning presence." Lady Margaret: "Good. The role will teach you the rest." No commitment asked. Just... connection.' },

    { number: 35, title: 'Hawk\'s Debrief', pov: 'Hawk', location: 'Addie\'s Car', synopsis: 'Driving home. Hawk: "How was it?" Addie processes aloud — the conversation, the expectations, her fears. Hawk listens. Asks questions. Doesn\'t advise. By the time they reach her apartment, she\'s clearer. He\'s becoming her sounding board.' },

    { number: 36, title: 'SM Dinner Invitation', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'An invitation: SM dinner, small group, informal. First social event since the hospital. Addie panics. Hawk: "You don\'t have to be perfect. You just have to show up." She asks him to come. He says yes.' },

    { number: 37, title: 'The SM Dinner', pov: 'Addison', location: 'Private Club', synopsis: 'SM dinner. Eight people. Hawk stays at her side — not hovering, just present. Addie is nervous, then settles. She\'s not performing. She\'s just... there. Lady Caroline: "You seem different." Addie: "I am different." Progress.' },

    { number: 38, title: 'Hawk\'s Assessment', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'After the dinner. Hawk: "You did good." Addie: "I was terrified." Hawk: "That\'s what courage is. Being scared and doing it anyway." He\'s coaching her without calling it coaching. Delta training applied to civilian life.' },

    { number: 39, title: 'The POH Question Grows', pov: 'Elena', location: 'Oak Watch', synopsis: 'Elena and Addie. The Order is getting more serious about POH. "They want to formalize the conversation." Addie isn\'t ready to say yes. But she\'s not saying no either. Hawk\'s influence: take it slow, gather information.' },

    { number: 40, title: 'Therapy Check-In', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Dr. Reyes: "You\'re considering something big." Addie explains POH. Dr. Reyes: "What scares you about it?" Addie: "That I\'ll fall back into old patterns." Dr. Reyes: "Then we build guardrails. You don\'t have to do it the way you did before."' },

    { number: 41, title: 'Hawk Meets the Circle', pov: 'Hawk', location: 'Private Event', synopsis: 'Another SM event. This time, Hawk is introduced properly. Lady Margaret assesses him. "You\'re the Delta operator Cole mentioned." Hawk: "Yes ma\'am." Lady Margaret: "You\'ve been good for her." Hawk: "She\'s been good for me too."' },

    { number: 42, title: 'The Grooming Begins', pov: 'Addison', location: 'Various', synopsis: 'Informal grooming starts. Coffee with Lady Caroline. Lunch with Dame Elizabeth. Each meeting is education: what POH means, what it requires, what it offers. Hawk drives her to each one. Debriefs after. He\'s her anchor.' },

    { number: 43, title: 'Hawk\'s Boundaries', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk sets a boundary: "I\'m your guide, not your crutch. You need to start doing some of these alone." Addie resists. Then understands: he\'s pushing her to be strong, not dependent. That\'s what she needs.' },

    { number: 44, title: 'Solo SM Event', pov: 'Addison', location: 'Charity Event', synopsis: 'First SM event without Hawk. A charity luncheon. Addie is nervous but manages. She even enjoys parts of it. When she tells Hawk, he grins: "See? You didn\'t need me." She did need him. Just not in the room.' },

    { number: 45, title: 'The Formal Question', pov: 'Elena', location: 'Oak Watch', synopsis: 'Elena delivers the news: "The Order wants to formally extend the POH offer. You don\'t have to answer now. But they\'re ready when you are." Addie looks at Hawk, who\'s become part of her world. She\'s not ready to say yes. But she\'s finally ready to consider it seriously. Book 5 ends with the question open.' }
  ];

  for (const ch of chapters) {
    await prisma.chapter.create({
      data: {
        projectId: projectId,
        bookId: book5.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        tags: ch.location,
        status: 'outlined'
      }
    });
  }

  console.log('✅ Book 5 (Revised): The Royal Phoenix Rising - 45 chapters');
  console.log('');
  console.log('PART 1: THE HOSPITAL (Ch 1-15)');
  console.log('PART 2: THE RECOVERY (Ch 16-30)');
  console.log('PART 3: POH GROOMING - HAWK AS GUIDE (Ch 31-45)');
  console.log('');
  console.log('ENDS WITH: POH question formally raised, Hawk as established guide');

  await prisma.$disconnect();
}

main().catch(console.error);
