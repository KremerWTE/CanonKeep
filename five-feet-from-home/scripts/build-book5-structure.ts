import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find the project
  const project = await prisma.project.findFirst({
    where: { name: 'STORY_PROJECT' }
  });

  const projectId = project?.id;

  if (!projectId) {
    throw new Error('No project found');
  }

  // Delete existing Book 5 if it exists
  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 5' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 5');
  }

  // Create Book 5: The Royal Phoenix Rising
  const book5 = await prisma.book.create({
    data: {
      title: 'Book 5: The Royal Phoenix Rising',
      projectId: projectId,
      synopsis: 'Addie wakes in the hospital after her collapse. Cole introduces her to Hawk — a Delta Force operator who sees "fire that needed protecting." Addie begins her slow rebuild: forced rest, confronting her demons, learning to accept help. Hawk becomes her anchor. The SM network rallies around her, and POH becomes official. She rises from the ashes not as the broken perfectionist, but as something stronger. The Royal Phoenix.',
      status: 'outlined'
    }
  });

  // Book 5 Chapters - The Royal Phoenix Rising
  const chapters = [
    // ============================================
    // PART 1: THE HOSPITAL (Ch 1-12)
    // ============================================
    { number: 1, title: 'White Ceiling', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Addie wakes to white. Hospital ceiling. Beeping machines. Her body feels like lead. She tries to sit up — can\'t. A nurse appears: "Easy. You\'ve been out for 18 hours." Heart arrhythmia. Severe exhaustion. Malnutrition. Her perfect facade has shattered.' },

    { number: 2, title: 'Cole\'s Vigil', pov: 'Cole', location: 'Charlotte Hospital', synopsis: 'Cole has been in the waiting room since he carried her through the ER doors. Jasper arrived at 4am, Elena at 5am. Cole remembers finding her — the silk blouse, the perfect hair splayed on the floor, how light she was when he picked her up. He\'d driven 90 mph to the hospital. He\'s not leaving until she\'s okay.' },

    { number: 3, title: 'The Family Arrives', pov: 'Elena', location: 'Charlotte Hospital', synopsis: 'Elena, Jasper, and Kendra crowd the waiting room. Grace wanted to come but it\'s a school day. Kendra is crying. Elena is silent with fury — at Addie for hiding, at herself for not seeing. Jasper blames himself. The doctor says: minimum one week in hospital, then mandatory rest.' },

    { number: 4, title: 'Addie Wakes Fully', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Second day. Addie is fully conscious. She tries to check her email — they\'ve taken her phone. She asks about her cases. Jasper: "Handled. All of them." She feels useless. Naked without her armor of work. For the first time in months, she has no 5-foot world to hide in.' },

    { number: 5, title: 'Cole Introduces Hawk', pov: 'Cole', location: 'Charlotte Hospital', synopsis: 'Day three. Cole brings a visitor — Jason "Hawk" Hayes, Delta Force operator, one of Cole\'s old contacts. Hawk has been helping with BSS security projects. Cole: "Thought you two should meet." Hawk sees Addie in her hospital gown, stripped of her armor. Something shifts in him. She\'s fire that needs protecting.' },

    { number: 6, title: 'First Hawk Meeting', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Addie meets Hawk. He doesn\'t pity her. Doesn\'t lecture. Just sits in the chair by her bed and talks about his work — Delta missions, tactical failures, moments when operators push too hard. "The body keeps score," he says. "You can\'t outrun yourself forever." She doesn\'t know why, but she listens.' },

    { number: 7, title: 'Grace\'s Hospital Visit', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Grace visits after school. She brings a card: "Get Well Soon Aunt Addie" with glitter and stickers. She climbs into the hospital bed, careful of the wires. "Mommy said you worked too hard." Addie: "I did." Grace: "Don\'t do that anymore, okay?" Addie holds her tight. "Okay, baby."' },

    { number: 8, title: 'The Mental Performance Coach', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Day four. Dr. Reyes, the mental performance coach Mason demanded, arrives. Addie expects to hate her. Instead: "I\'m not here to fix you. You\'re not broken. You\'re exhausted." First real session. Topics: perfectionism, worth tied to productivity, the 5-foot world as avoidance. Addie cries for the first time in months.' },

    { number: 9, title: 'Kendra\'s Confession', pov: 'Kendra', location: 'Charlotte Hospital', synopsis: 'Kendra visits alone. She holds Addie\'s hand. "I should have pushed harder. I saw you slipping." Addie: "I didn\'t want to be seen." Kendra admits her own fear — that she was so focused on her boyfriend, her stability, that she let Addie fall. They cry together. First crack in the wall between them.' },

    { number: 10, title: 'Hawk Returns', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'Day five. Hawk shows up again. No reason given. He brings coffee (decaf, doctor\'s orders) and sits. They talk about nothing — sports, weather, a documentary about penguins. Addie realizes: he\'s not here to save her. He\'s just... here. It\'s been a long time since someone was just here.' },

    { number: 11, title: 'SM Rallies', pov: 'Elena', location: 'Charlotte Hospital', synopsis: 'The SM network mobilizes. Lady Margaret sends flowers with a note: "Rest. The role will wait." Lady Caroline arranges for meal deliveries to Addie\'s apartment. Dames and Knights reach out with quiet support. The message is clear: POH needs you. But only when you\'re ready.' },

    { number: 12, title: 'Discharge Day', pov: 'Addison', location: 'Charlotte Hospital', synopsis: 'One week. Addie is discharged. Rules: no work for one month, mandatory therapy, someone with her at all times for the first week. She expects to feel free. Instead, she feels terrified. Who is she without the work? She\'s about to find out.' },

    // ============================================
    // PART 2: THE RECOVERY (Ch 13-25)
    // ============================================
    { number: 13, title: 'First Day Home', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Addie\'s apartment feels foreign. Elena has stocked the fridge. Kendra installed a white noise machine. There\'s a schedule on the counter — meals, therapy, rest times. Addie doesn\'t know what to do with herself. She stares at the ceiling. The silence is deafening.' },

    { number: 14, title: 'Hawk\'s First Visit', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Hawk shows up with takeout. "Cole mentioned you were home." He doesn\'t ask how she\'s feeling. He asks what she wants to watch. They sit on her couch and watch a nature documentary. She falls asleep. When she wakes, he\'s still there, reading a book. He stays until Elena arrives.' },

    { number: 15, title: 'Therapy Session 2', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Second session with Dr. Reyes. Topic: the 5-foot world. "You built a cage and called it survival." Addie resists. Then admits: "I didn\'t know how else to cope." Dr. Reyes: "That\'s why we\'re here. To build something better." Homework: one thing each day that isn\'t productive.' },

    { number: 16, title: 'Grace Time', pov: 'Addison', location: 'Oak Watch', synopsis: 'Addie visits Oak Watch — but not to work. She\'s there for Grace. They bake cookies (badly). They watch a movie. Grace teaches Addie a card game she made up (the rules keep changing). For three hours, Addie doesn\'t think about cases. It\'s the longest break she can remember.' },

    { number: 17, title: 'The Rotation Begins', pov: 'Elena', location: 'Various', synopsis: 'The family creates a rotation. Elena mornings, Kendra afternoons, Hawk evenings (he volunteered). Jasper checks in daily. Cole stops by randomly. Addie feels smothered — then realizes: this is love. This is what she was running from. And it\'s overwhelming.' },

    { number: 18, title: 'Hawk\'s Story', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Evening with Hawk. Addie asks about his past. He tells her: Vegas, the women, the whiskey, running from combat trauma. "I thought speed and chaos would fill the void. Spoiler: it doesn\'t." He looks at her. "You know something about that." First real moment of connection.' },

    { number: 19, title: 'The Relapse Attempt', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Week two. Addie finds her work laptop. Opens it. The emails are there — hundreds of them. Her fingers hover over the keyboard. Then Hawk\'s voice from the doorway: "That the best idea?" She closes it. Cries. He sits with her until she stops.' },

    { number: 20, title: 'Therapy Session 4', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Dr. Reyes pushes deeper. "Why do you need to prove yourself?" Addie deflects. Deflects. Finally: "Because if I stop being useful, I stop mattering." Silence. Dr. Reyes: "Who told you that?" Addie can\'t answer. The question haunts her for days.' },

    { number: 21, title: 'The POH Conversation', pov: 'Elena', location: 'Oak Watch', synopsis: 'Elena sits with Addie. "The Order has been asking about you." POH. The role Addie was circling before the collapse. "Lady Margaret wants to know if you\'re still interested." Addie: "I don\'t know who I am anymore. How can I lead anything?" Elena: "Maybe that\'s exactly why you should."' },

    { number: 22, title: 'Hawk and Cole', pov: 'Cole', location: 'Charlotte Bar', synopsis: 'Cole and Hawk at a bar. Cole: "You spend a lot of time with her." Hawk: "She\'s... different." Cole grins. "You\'re falling for her." Hawk denies it. Then admits: "She\'s fire, Cole. The kind that warms, not burns. I haven\'t seen fire like that in years."' },

    { number: 23, title: 'Three Week Mark', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Three weeks of rest. Addie is sleeping 7 hours. Eating real meals. Her hands don\'t shake anymore. She looks in the mirror — color has returned to her cheeks. She doesn\'t look perfect anymore. She looks... human. It\'s terrifying and freeing.' },

    { number: 24, title: 'First Walk Outside', pov: 'Addison', location: 'Charlotte Park', synopsis: 'Hawk takes Addie for a walk in the park. Not a workout — a walk. They sit on a bench. She watches children play. "I forgot the world existed outside the office." Hawk: "It\'s still here. Waiting for you." She leans against his shoulder. He doesn\'t move.' },

    { number: 25, title: 'The Letter from Lady Margaret', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'A handwritten letter arrives. Lady Margaret. "The Order of Sapientia Minervae formally requests your consideration for the role of Patroness of Honor. Not because you performed. Because you fell and chose to rise. That is the mark of true leadership."' },

    // ============================================
    // PART 3: THE RISING (Ch 26-40)
    // ============================================
    { number: 26, title: 'Therapy Breakthrough', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Session eight. Dr. Reyes asks: "What if your worth isn\'t earned?" Addie has no answer. "What if you matter just because you exist?" The question cracks something open. Addie realizes: she\'s spent her whole life trying to earn love she already had.' },

    { number: 27, title: 'The POH Decision', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Addie reads Lady Margaret\'s letter again. She calls Elena. "I want to do it. But not the way I was doing it before." Elena: "Then do it differently. Build the role around who you\'re becoming, not who you were." Addie: "I don\'t know who that is yet." Elena: "You\'re about to find out."' },

    { number: 28, title: 'Hawk\'s Confession', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Evening at Addie\'s. Hawk finally says it: "I\'ve been coming here because I want to. Not because Cole asked or because you need a babysitter." Addie: "Then why?" Hawk: "Because you\'re the first thing that\'s felt real in a long time." They don\'t kiss. They don\'t need to. They know.' },

    { number: 29, title: 'Return to The Forge', pov: 'Addison', location: 'The Forge', synopsis: 'One month. Addie returns to BSS headquarters — not to work, to visit. She walks through the halls. People stare, then smile. Harper hugs her. Daniel nods with respect. Jasper takes her to his office. "Welcome back. When you\'re ready." She\'s not ready yet. But she\'s getting there.' },

    { number: 30, title: 'The Kendra Reconciliation', pov: 'Kendra', location: 'Oak Watch', synopsis: 'Kendra and Addie have the real conversation. Everything that happened. The promise ring. The distance. "I felt like I was losing you to something I couldn\'t fight." Addie: "I was losing myself. I couldn\'t see anything else." They hold each other. The sisterhood reforms, stronger.' },

    { number: 31, title: 'Grace\'s Art Show', pov: 'Addison', location: 'Grace\'s School', synopsis: 'Grace\'s school art show. Addie is there — not on a phone, not distracted. Grace\'s painting: "My Family" — and Addie is in it, right next to Mommy and Daddy. Grace: "See? I told you you\'re family." Addie\'s heart is full for the first time in months.' },

    { number: 32, title: 'Meeting the SM Council', pov: 'Addison', location: 'Cathedral', synopsis: 'Addie meets with the SM council about POH. She\'s honest: "I collapsed because I tried to be perfect. I won\'t be perfect. But I\'ll be present." Lady Margaret smiles. "That\'s exactly what the Order needs." The council votes. It\'s unanimous.' },

    { number: 33, title: 'Hawk and Addie: The Talk', pov: 'Addison', location: 'Charlotte Park', synopsis: 'Addie and Hawk on their bench. "What are we doing?" she asks. He takes her hand. "I don\'t know. But I don\'t want to stop." First kiss. Soft, certain, like they\'ve been waiting for this without knowing.' },

    { number: 34, title: 'The Official Announcement', pov: 'Elena', location: 'SM Gala', synopsis: 'SM gala. The announcement: Addison will assume the role of Patroness of Honor. Lady Margaret presents her with the pendant. Applause fills the room. Addie looks out at the crowd — Kendra, Elena, Jasper, Harper, Cole, Hawk. Her family. She\'s not perfect. She\'s present.' },

    { number: 35, title: 'First Day as POH', pov: 'Addison', location: 'Various', synopsis: 'First day in the role. Addie doesn\'t try to do everything. She delegates. She listens. She admits when she doesn\'t know. It feels foreign. It feels right. She checks in with Dr. Reyes that evening: "I didn\'t try to be perfect." "How did it feel?" "Terrifying. And free."' },

    { number: 36, title: 'Hawk Meets Grace', pov: 'Hawk', location: 'Oak Watch', synopsis: 'Addie brings Hawk to Sunday dinner. Grace inspects him seriously. "Are you Aunt Addie\'s boyfriend?" Hawk: "I think so." Grace: "Good. She needs someone nice." She gives him a sticker of approval. He wears it the whole dinner. He\'s never felt more proud.' },

    { number: 37, title: 'Building the New Rhythm', pov: 'Addison', location: 'Various', synopsis: 'Addie establishes her new rhythm. Work with boundaries. POH with purpose. Therapy twice a week. Time with Grace. Evenings with Hawk. She\'s not working 20 hours a day. She\'s not perfect. She\'s happy. She didn\'t know it could feel like this.' },

    { number: 38, title: 'The Phoenix Metaphor', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Late night with Hawk. She tells him about the collapse, really tells him. The 20-hour days, the perfect hair hiding the breaking heart, the moment she hit the floor. "I had to burn to rise." Hawk: "That\'s what phoenixes do." She laughs. "The Royal Phoenix." He kisses her forehead. "My Royal Phoenix."' },

    { number: 39, title: 'Six Month Check-In', pov: 'Dr. Reyes', location: 'Dr. Reyes Office', synopsis: 'Six months since the hospital. Dr. Reyes reviews the progress. "You\'re not the same person who walked in here." Addie: "Is that good?" Dr. Reyes: "You tell me." Addie thinks. "I like who I\'m becoming. I never liked who I was pretending to be." That\'s the whole answer.' },

    { number: 40, title: 'The Royal Phoenix Rising', pov: 'Addison', location: 'SM Gala', synopsis: 'Annual SM gala. Addie presides as POH — confident, present, imperfect. She gives a speech about falling and rising. About the danger of perfection. About the power of letting yourself be held. "I am not unbreakable. I broke. And I rose stronger for it." Standing ovation. Hawk watches from the corner, eyes shining. The Royal Phoenix has risen.' }
  ];

  // Insert all chapters
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

  console.log('✅ Book 5: The Royal Phoenix Rising created with', chapters.length, 'chapters');
  console.log('');
  console.log('=== BOOK 5 STRUCTURE ===');
  console.log('');
  console.log('PART 1: THE HOSPITAL (Ch 1-12)');
  console.log('  - Addie wakes, Cole\'s vigil, Hawk introduction');
  console.log('  - Grace visits, therapy begins, SM rallies');
  console.log('');
  console.log('PART 2: THE RECOVERY (Ch 13-25)');
  console.log('  - Forced rest, Hawk\'s presence grows');
  console.log('  - Therapy breakthroughs, POH letter arrives');
  console.log('');
  console.log('PART 3: THE RISING (Ch 26-40)');
  console.log('  - POH decision and acceptance');
  console.log('  - Hawk and Addie relationship solidifies');
  console.log('  - The Royal Phoenix rises');

  await prisma.$disconnect();
}

main().catch(console.error);
