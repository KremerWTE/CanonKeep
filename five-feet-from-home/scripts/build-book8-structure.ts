import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { name: 'STORY_PROJECT' }
  });

  const projectId = project?.id;
  if (!projectId) throw new Error('No project found');

  const existingBook = await prisma.book.findFirst({
    where: { title: { contains: 'Book 8' } }
  });

  if (existingBook) {
    await prisma.chapter.deleteMany({ where: { bookId: existingBook.id } });
    await prisma.book.delete({ where: { id: existingBook.id } });
    console.log('Deleted existing Book 8');
  }

  // Create Book 8: Hawk & Addie - A Love Story
  const book8 = await prisma.book.create({
    data: {
      title: 'Book 8: Hawk & Addie - A Love Story',
      projectId: projectId,
      synopsis: 'The full development of Hawk and Addie\'s relationship. From protector to partner. First dates, first fights, learning each other\'s wounds and strengths. Hawk opens up about his past — the women, the whiskey, the darkness. Addie shares her fears of intimacy. Together they build something real. The book follows their journey from tentative beginnings to committed partnership.',
      status: 'outlined'
    }
  });

  const chapters = [
    // ============================================
    // PART 1: FROM PROTECTOR TO PARTNER (Ch 1-12)
    // ============================================
    { number: 1, title: 'After the Installation', pov: 'Addison', location: 'Various', synopsis: 'The dust settles after POH installation. Addie realizes: Hawk has been constant through everything. But what are they? He\'s been her guide, her support, her friend. Now she wants more. The question: does he?' },

    { number: 2, title: 'The First Real Date', pov: 'Hawk', location: 'Restaurant', synopsis: 'Hawk asks Addie out. Not a "hang out" — a date. Proper. He picks her up, opens doors, the works. They\'re both nervous. It\'s absurd — they\'ve been through hospitals and breakdowns together. But this is different. This is intentional.' },

    { number: 3, title: 'Dinner Conversation', pov: 'Addison', location: 'Restaurant', synopsis: 'At dinner, they talk — really talk. Not crisis management, not POH strategy. Childhood memories. Favorite movies. The silly things. Addie laughs. Hawk watches her laugh like it\'s the first time he\'s seen it. Maybe it is, without the shadow of collapse.' },

    { number: 4, title: 'The Goodnight', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk walks Addie to her door. Pause. They both know what comes next. He kisses her — gentle, deliberate. "I\'ve wanted to do that for months." Addie: "What took you so long?" Hawk: "You needed to heal first." She did. She has.' },

    { number: 5, title: 'Navigating the New', pov: 'Addison', location: 'Various', synopsis: 'Dating while being POH. Dating a Delta operator. Both their lives are complicated. They try to find a rhythm — texts during the day, dinners when possible, weekends together. It\'s imperfect. It\'s theirs.' },

    { number: 6, title: 'Introducing to Grace', pov: 'Hawk', location: 'Oak Watch', synopsis: 'Grace already knows Hawk. But now he\'s "Aunt Addie\'s boyfriend." She inspects him seriously. "Are you going to marry her?" Hawk: "Maybe someday." Grace: "Good. She needs someone nice." She gives him a sticker. He wears it all day.' },

    { number: 7, title: 'The Jasper Talk', pov: 'Hawk', location: 'BSS HQ', synopsis: 'Jasper pulls Hawk aside. "I know you care about her. But I need to know your intentions." Hawk doesn\'t flinch. "I love her. I haven\'t said it yet. But I will. And I\'ll spend the rest of my life proving it." Jasper nods. That\'s enough.' },

    { number: 8, title: 'First Disagreement', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'First fight. Hawk is overprotective — suggests she skip a stressful event. Addie bristles: "I\'m not fragile." Hawk: "I know. But I worry." They argue. They cool down. They talk it through. Conflict and repair — a relationship skill they\'re learning.' },

    { number: 9, title: 'Hawk Opens Up', pov: 'Hawk', location: 'His Apartment', synopsis: 'Hawk invites Addie to his place for the first time. Sparse, functional. He tells her about the nightmares, the missions that haunt him. "I\'m not whole either." Addie: "Neither am I. We fit."' },

    { number: 10, title: 'Addie\'s Fear', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Therapy session. Addie admits: she\'s scared of intimacy. Real intimacy. "What if he sees all of me and leaves?" Dr. Reyes: "What if he sees all of you and stays?" The question reframes everything.' },

    { number: 11, title: 'The L Word', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Quiet night. Takeout, documentary, tangled on the couch. Hawk says it first: "I love you." Addie freezes. Then: "I love you too." It\'s simple. It\'s everything. The moment they both knew was coming finally arrives.' },

    { number: 12, title: 'Going Public', pov: 'Addison', location: 'SM Event', synopsis: 'First public appearance as a couple at a SM event. Addie the POH, Hawk the Delta operator. People whisper. Lady Margaret approves: "He grounds you." Alexandra sneers. Addie doesn\'t care. She has Hawk on her arm. Nothing else matters.' },

    // ============================================
    // PART 2: LEARNING EACH OTHER (Ch 13-28)
    // ============================================
    { number: 13, title: 'Hawk\'s Vegas Past', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Hawk tells Addie about Vegas. Really tells her. The fast women, the whiskey mornings, the emptiness. "I wasn\'t a good man." Addie listens. "That was then. Who are you now?" Hawk: "Someone trying to deserve you."' },

    { number: 14, title: 'Addie\'s Walls', pov: 'Addison', location: 'Various', synopsis: 'Addie catches herself building walls again. Old habits. Hawk notices: "You\'re pulling back." She admits: "I don\'t know how to be this close." Hawk: "Then we learn together." He doesn\'t push. He waits. She comes back.' },

    { number: 15, title: 'Meeting Hawk\'s People', pov: 'Addison', location: 'Delta Gathering', synopsis: 'Hawk takes Addie to a Delta gathering — retired operators, current ones. Rough men, dark humor. They assess her. She holds her own. By the end of the night, she\'s charmed them. Hawk is proud. She fits in his world too.' },

    { number: 16, title: 'The Fight About Work', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Addie is overworking again. Small signs. Hawk calls it out. She resents the monitoring. They fight — louder this time. "I\'m not glass!" "And I\'m not leaving!" The fight breaks something open. They talk until 3am. Closer than before.' },

    { number: 17, title: 'First Trip Together', pov: 'Addison', location: 'Beach House', synopsis: 'A weekend away. Just them. Beach house Elena recommended. No phones (mostly). They cook together, walk the beach, make love without urgency. Addie realizes: this is what peace feels like.' },

    { number: 18, title: 'Hawk\'s Nightmares', pov: 'Addison', location: 'Hawk\'s Apartment', synopsis: 'Addie stays over. Hawk wakes screaming — combat nightmare. She holds him until the shaking stops. "I\'m sorry you saw that." Addie: "I\'m not. This is part of you. I want all of you." He cries. She doesn\'t look away.' },

    { number: 19, title: 'The Key Exchange', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'Practical step: exchanging keys. But it means something. "You can come and go," Addie says. "This is your home too." Hawk: "Are you sure?" She\'s never been more sure of anything.' },

    { number: 20, title: 'Cole\'s Observation', pov: 'Cole', location: 'Bar', synopsis: 'Cole and Hawk. "You\'re different now." Hawk: "Better or worse?" Cole: "Softer. It suits you." Hawk admits: "She saved me. I thought I was saving her, but she saved me."' },

    { number: 21, title: 'Addie\'s Insecurity', pov: 'Addison', location: 'Dr. Reyes Office', synopsis: 'Therapy. Addie admits: she sometimes waits for Hawk to leave. "Everyone leaves." Dr. Reyes: "Has he given you any reason to believe that?" No. He hasn\'t. The work is trusting what she knows.' },

    { number: 22, title: 'Six Months Together', pov: 'Hawk', location: 'Restaurant', synopsis: 'Six month anniversary. Hawk takes Addie to the same restaurant as their first date. "Full circle." Addie: "Just the first circle. There\'ll be more." They talk about the future — carefully, hopefully.' },

    { number: 23, title: 'The Meet the Parents Question', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Hawk asks about Addie\'s parents. She hesitates. "We\'re not close." Hawk: "I\'d still like to meet them. Someday. If you want." She\'s never brought anyone home. Maybe it\'s time.' },

    { number: 24, title: 'Addie\'s Mom Calls', pov: 'Addison', location: 'Addie\'s Apartment', synopsis: 'Addie\'s mother calls — rare. Small town news, careful words. Addie mentions Hawk. "Someone... serious." Her mother\'s voice shifts. "Bring him home sometime." Addie agrees. Another wall coming down.' },

    { number: 25, title: 'The Hometown Visit', pov: 'Hawk', location: 'Small Town USA', synopsis: 'Hawk meets Addie\'s parents. Simple house, simple people. Her dad shakes his hand hard. Her mom makes pot roast. It\'s awkward, then warm. Hawk sees where Addie came from. He loves her more.' },

    { number: 26, title: 'The Talk About Forever', pov: 'Addison', location: 'Beach', synopsis: 'Walking on a beach. Addie asks: "Where do you see this going?" Hawk stops. "All the way. Marriage. Family. The whole thing. When you\'re ready." Addie: "What if I\'m never ready?" Hawk: "Then I wait."' },

    { number: 27, title: 'Moving In Discussion', pov: 'Hawk', location: 'Addie\'s Apartment', synopsis: 'They\'re practically living together anyway. Hawk spends most nights at Addie\'s. "Should we make it official?" Addie considers. "Let\'s find a new place. Together. Ours." Not his, not hers. Theirs.' },

    { number: 28, title: 'The New Place', pov: 'Addison', location: 'New Apartment', synopsis: 'They find it — a condo with a view. Big enough for two, small enough to feel close. Moving day: Kendra helps, Elena supervises, Grace "inspects." First night in their home. Everything feels right.' },

    // ============================================
    // PART 3: BECOMING PARTNERS (Ch 29-40)
    // ============================================
    { number: 29, title: 'Domestic Life', pov: 'Hawk', location: 'Home', synopsis: 'Living together. Morning routines, grocery shopping, who takes out the trash. It\'s mundane and wonderful. Hawk cooks (she burns water). She organizes (he\'s chaos). They balance.' },

    { number: 30, title: 'Supporting POH', pov: 'Hawk', location: 'Various', synopsis: 'Hawk becomes part of POH world. He attends galas, holds her hand through difficult conversations, debriefs her after hard days. He\'s not just her boyfriend — he\'s her partner in everything.' },

    { number: 31, title: 'First Big Crisis as a Couple', pov: 'Addison', location: 'Various', synopsis: 'A major POH crisis erupts. Addie is stressed, distracted. She snaps at Hawk unfairly. He gives her space but doesn\'t disappear. "I\'m here when you\'re ready." She apologizes. They navigate it together.' },

    { number: 32, title: 'Hawk\'s Deployment Scare', pov: 'Addison', location: 'Home', synopsis: 'Hawk gets a call — possible deployment. Nothing certain. But the reminder: his world is dangerous. Addie faces it: loving him means accepting risk. She does. She doesn\'t ask him to stop being who he is.' },

    { number: 33, title: 'The False Alarm', pov: 'Hawk', location: 'Home', synopsis: 'No deployment. This time. Hawk sees how worried Addie was. "I can\'t promise safety." Addie: "I don\'t want promises. I want you." They hold each other tighter that night.' },

    { number: 34, title: 'One Year Anniversary', pov: 'Addison', location: 'Beach House', synopsis: 'One year since they first kissed. Back to the beach house where they had their first trip. This time, Hawk has a ring in his pocket. He\'s not ready to use it yet. But he carries the possibility.' },

    { number: 35, title: 'Therapy Together', pov: 'Hawk', location: 'Therapist Office', synopsis: 'They try couples therapy. Not because they\'re broken — because they want to be better. Learning communication skills, understanding triggers. Dr. Reyes approves: "This is how healthy relationships grow."' },

    { number: 36, title: 'Building a Future', pov: 'Addison', location: 'Home', synopsis: 'Talk turns to the future. Where do they want to be in five years? Ten? Hawk wants family. Addie is terrified but open. "Let\'s not rush. Let\'s just keep walking." They do.' },

    { number: 37, title: 'Grace\'s Blessing', pov: 'Hawk', location: 'Oak Watch', synopsis: 'Grace, now wiser, asks Hawk: "Are you going to marry Aunt Addie?" Hawk: "I hope so." Grace: "Good. Because she smiles more now. That\'s because of you." From the mouth of a child.' },

    { number: 38, title: 'The Partnership Deepens', pov: 'Addison', location: 'Various', synopsis: 'Addie realizes: Hawk isn\'t just her partner — he\'s her equal. He challenges her, supports her, sees her fully. She does the same for him. This is what healthy love looks like.' },

    { number: 39, title: 'Looking Forward', pov: 'Hawk', location: 'Home', synopsis: 'Hawk and Addie on their balcony, city lights below. "We built this," he says. "From broken pieces." Addie: "The best things are." They\'re not perfect. They don\'t need to be. They\'re together.' },

    { number: 40, title: 'A Love Story', pov: 'Addison', location: 'Various', synopsis: 'Book ends with Addie reflecting: from collapse to POH, from stranger to partner. Hawk walked every step with her. Not as savior — as equal. This is their love story. And it\'s just beginning.' }
  ];

  for (const ch of chapters) {
    await prisma.chapter.create({
      data: {
        projectId: projectId,
        bookId: book8.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        tags: ch.location,
        status: 'outlined'
      }
    });
  }

  console.log('✅ Book 8: Hawk & Addie - A Love Story - 40 chapters');
  console.log('');
  console.log('PART 1: FROM PROTECTOR TO PARTNER (Ch 1-12)');
  console.log('PART 2: LEARNING EACH OTHER (Ch 13-28)');
  console.log('PART 3: BECOMING PARTNERS (Ch 29-40)');

  await prisma.$disconnect();
}

main().catch(console.error);
