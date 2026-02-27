import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Complete Book 1 chapter structure through the party
// Elena's medical crisis (not pregnancy), recovery, thank-you party
// Addison introduced meaningfully at party - sets up Book 2 arc
const book1Chapters = [
  // Part One - The Five-Foot World
  { number: 1, title: 'The Call', pov: 'Jasper Barrett', location: 'Charlotte/London', synopsis: '2:17 a.m. phone buzz. London data breach. Jasper snaps into operational mode, assembling a team and flying out before dawn. First glimpse of the family anchor he leaves behind - Elena and Grace.' },
  { number: 2, title: 'War Room', pov: 'Jasper Barrett', location: 'London', synopsis: 'Jasper in his element: handling high-pressure executives, dictating media strategy, firefighting misinformation. Lives for whiteboards covered in timelines. Flashes of personal life only in the quiet in-between.' },
  { number: 3, title: 'Passing Through', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Brief stop at home between trips. He\'s physically present but mentally elsewhere. Elena collapses at the dinner table - sudden medical emergency. Jasper\'s crisis manager instincts kick in, but this time for family.' },
  { number: 4, title: 'Anchors', pov: 'Jasper Barrett', location: 'Hospital/Oak Watch', synopsis: 'Jasper at Elena\'s bedside. Flashbacks to their dating life weave through present-day hospital scenes. Terminal List-style emotional interludes as he falls for her all over again.' },
  { number: 5, title: 'Our Team', pov: 'Grace', location: 'Hospital', synopsis: 'Jasper takes Grace for hot chocolate from the hospital cafeteria. Grace chatters about school - "Miss Donnelly said I wrote the best story in class" and "Miss Evie let me help make cookies for the bake sale." Then she looks up at him: "When you\'re here, I feel safe. But you\'re not here much." Later, at home: "Daddy, are you on our team now?" The question sticks in his head during every crisis that follows. He can\'t shake it.' },

  // Part Two - The Crisis Deepens
  { number: 6, title: 'Fault Lines', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Hospital time is elastic. Jasper tries to balance returning to work while staying anchored at the hospital. The tension between his corporate war-room instincts and the pull of family. Grace\'s question echoes: "Are you on our team?"' },
  { number: 7, title: 'Project Wildcard', pov: 'Jasper Barrett', location: 'The Forge/Oak Watch', synopsis: 'Harper arrives with a high-stakes project - private aerospace crisis. Grace\'s drawing centered on Jasper\'s desk like a paper compass: two capes, one small, one tall, "DADDY SAVES THE DAY" in bubble letters, the A backwards. Introduction to Alexandria - silk ivory blouse, black pencil skirt, Chanel No. 5. Public professionalism, but when they\'re alone she lets slip flirtatious asides, extended eye contact. She leans over his laptop to point something out, perfume and warmth closing in.' },
  { number: 8, title: 'Holding Pattern', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Jasper home after the first Wildcard wave. Night flows into morning PT session. Layered flashbacks to early relationship. Fragile calm as Elena\'s condition stabilizes.' },
  { number: 9, title: 'Fracture Lines', pov: 'Jasper Barrett', location: 'Oak Watch/The Forge', synopsis: 'Wildcard ramps back up, drawing Jasper\'s focus toward the client just as home life is warming. Elena discharged but recovering. His attention split when she needs him most. Alexandria\'s texts escalate - late-night "thinking of you" messages, invitations to events without Elena.' },
  { number: 10, title: 'Alexandria\'s Play', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Late evening at Alexandria\'s company HQ. Lights low, city lights outside. She\'s testing boundaries now - calculated vulnerability, "confiding" in Jasper about personal struggles. His phone buzzes: a near-naked selfie from Alexandria. He deletes it without responding. But the temptation is undeniable. Grace\'s email arrives with a scanned drawing: "Mom, Dad, Me" - the three of them holding hands.' },
  { number: 11, title: 'When the Floor Gives Way', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Elena\'s condition worsens - relapse. Jasper witnesses it firsthand. The boardroom empties, only Alexandra and Jasper remain. Real-time choice between staying with client or running to Elena. He chooses Elena.' },
  { number: 12, title: 'The Line in the Floor', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Waiting room vigil. Harper\'s text from Singapore. Political briefs stack up. Doctor delivers news: "She\'s stable." Jasper deletes the Asia itinerary. Deletes Alexandria\'s contact. The choice is made.' },

  // Part Three - Recovery and Crises
  { number: 13, title: 'Convergence', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Morning rounds. Elena propped up in hospital gown. Harper arrives with coffee. Addison shows up with Grace\'s favorite snacks and a change of clothes for Elena. The inner circle converges - support network visible. Jasper beginning to let others help.' },
  { number: 14, title: 'Holding the Line', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Jasper back at work but changed. Whitaker Medical crisis heating up. Harper running point. Addison quietly handling hospital visits when Jasper can\'t be there - sitting with Elena, keeping Grace occupied.' },

  // Elena's Transformation Arc (Week 5) - THE TURNING POINT
  { number: 15, title: 'The Wives\' Circle', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena at her kitchen table, laptop open, flowers from well-wishers in the background. Five wives on Zoom: Caroline Whitmore (political consultant, Atlanta/DC), Ronnie Blake (NYC PR CEO), Julia Raines (DC veterans nonprofit), Savannah Cole (Charleston real estate), Madison Lowe (Miami philanthropy). Each gives advice: Caroline - "Own your space, build a life he wants to step into." Ronnie - "Adrenaline men need a different drug at home - connection and curiosity." Julia - "Don\'t wait for perfect timing." Savannah - "Don\'t let him confuse provision with presence." Madison - "Make him remember the woman he fought to marry." Elena jots notes in her old real estate notebook. Homework: one intentional connection move this week. Lead with wins, not complaints.' },
  { number: 16, title: 'Girl Talk', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena shares the wives\' strategies with Addison and Kendra over coffee. She starts trying them: playful touches when Jasper walks by, longer hugs, little notes. Jasper notices the warmth - sexual tension flickers but he\'s still cautious after her relapse. Hints at their eventual reconnection.' },
  { number: 17, title: 'Cleared', pov: 'Elena Barrett', location: 'Hospital/Oak Watch', synopsis: 'PT clears Elena for "full activity." She teases Jasper that night - "Full means everything." He\'s happy but still careful, protective. The sexual tension builds. Elena feels her confidence returning.' },

  { number: 18, title: 'The Pull', pov: 'Jasper Barrett', location: 'Hospital/The Forge', synopsis: 'Still at Elena\'s bedside when phone buzzes. Addison arrives to take over - Elena visibly relaxes with her there. Grace runs to Addison like family. Multiple crises demanding attention. Jasper learning to delegate.' },
  { number: 19, title: 'Stepping Up', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Elena home and recovering. Addison stops by with groceries and stays to help. Grace refuses to let her leave, chattering about Miss Evie\'s chocolate chip recipe and how Miss Donnelly is helping her write a story about "a superhero dad." Elena watches their bond - something shifts in how she sees Addison.' },

  // Elena's Visible Transformation
  { number: 20, title: 'Color Returns', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena embraces color in her outfits, stepping out of dark, muted clothes. She reclaims space in the home, confident again. Visual marker of her post-Zoom transformation. Jasper notices - "You look... different. Good different." She smiles. "I feel different."' },
  { number: 21, title: 'Reconnection', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Evening at Oak Watch. Elena uses the wives\' advice - small touches, presence, curiosity about his day instead of complaints. Tender, intimate moment in bed. Not explicit, but emotionally charged. Jasper responds, still protective but clearly drawn back to her. Three years of distance beginning to close.' },
  { number: 22, title: 'Thank You Notes', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena sends personal thank-you emails to each wife from the Zoom call. She cites specific advice from each - signals her growth and new self-assured tone. Caroline replies with a wine emoji. Ronnie: "Low maintenance, high survival rate - just like you." The wives\' circle becomes her anchor.' },

  // Part Four - Party Prep Arc
  { number: 23, title: 'Party Prep Night', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'House settling into cheerful chaos - eucalyptus and candle wax scent. Elena planning thank-you party. Harper\'s flowers arrive. Sara helping with setup.' },
  { number: 24, title: 'Three Hours', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Quick meeting - thirty minutes in Alexandra\'s boardroom, sign papers, smooth egos. Racing to get back before party. Time crunch builds tension.' },
  { number: 25, title: 'The Message', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Surgeon emerges past eight p.m. Final medical update. Relief floods through. Jasper able to finally focus on celebration ahead.' },
  { number: 26, title: 'Lines in the Sand', pov: 'Jasper Barrett', location: 'O\'Malley\'s Bar', synopsis: 'Wood smoke and spilled beer scent. Mason conversation. Jasper defines new boundaries between work and life. Understanding what he\'s willing to protect.' },

  // Part Five - The Party Arc
  { number: 27, title: 'What Jessica Sees', pov: 'Jessica', location: 'Hospital/Oak Watch', synopsis: 'Hospital corridors quieter. Jessica\'s perspective on Jasper\'s transformation. Antiseptic smell fading. Setup for the celebration.' },
  { number: 28, title: 'The Night Watch', pov: 'Jasper Barrett', location: 'Hospital', synopsis: 'Clock ticking softly in half-dark. Nurses dim lights. Final night vigil before Elena\'s full recovery and the party.' },
  { number: 29, title: 'The Pull in Two Directions', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Carolina air has sharp winter clarity. Cold breath visible. Final work threads being tied off. Africa and Whitaker resolving. Party approaching.' },
  { number: 30, title: 'Homecoming', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Three days later. Nurse wheels Elena toward the car. She\'s pale but improving. Coming home to prepare for the celebration.' },

  // The Whitaker/Africa Resolution
  { number: 31, title: 'Lunch in the War Room', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Harper\'s office - battlefield of tablets, printouts, coffee cups. Cole and Dean\'s Lagos feed choppy but urgent. Final push on Whitaker deal.' },
  { number: 32, title: 'The Invitation', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Sun low when Jasper pulls into gravel drive. Open pasture stretching toward foothills. Elena at kitchen counter slicing bread. She shares party plans.' },
  { number: 33, title: 'Tying Off Whitaker', pov: 'Jasper Barrett', location: 'The Forge', synopsis: 'Downtown office with Harper, Rafe, finance leads. Whitaker money issue finally resolved. Rafe\'s pressure tactic works. Jasper makes the "It\'s over" call to the board.' },
  { number: 34, title: 'Party Plans in Motion', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Elena with Sara and Grace in the garden. Walking through tent, lights, seating placement. Grace asks if Miss Evie can come - "She makes the best cookies, Mommy!" Elena smiles: "We\'ll invite her and Miss Donnelly both." Sara lights up - she\'s been wanting to pull Evie into the gym for meal prep classes. Texts with Harper about guest list. Picking outfit - signaling "I\'m back."' },
  { number: 35, title: 'The Africa Wrap-Up', pov: 'Harper', location: 'Lagos/Video Call', synopsis: 'Harper on secure video with Cole and Dean from Lagos hotel. Coup leaders neutralized. Harper reflects on Elena\'s resilience. Sends flowers and card.' },
  { number: 36, title: 'Loose Ends and Loyalty', pov: 'Cole', location: 'Lagos', synopsis: 'Cole and Dean wrap Africa with final handoff to State liaison. Cole texts Jasper: "Africa done. Whitaker done. Go have your damn party, boss."' },
  { number: 37, title: 'The Quiet Between Storms', pov: 'Jasper Barrett', location: 'The Forge/Oak Watch', synopsis: 'Strangest part - no phones ringing. First time in months Jasper walks in without ticking clock weight. Drives home windows down. Elena directing party setup.' },
  { number: 38, title: 'Building the Night', pov: 'Harper/Sara', location: 'Oak Watch', synopsis: 'Harper steps into Elena\'s kitchen fresh from airport. Sara directs setup. Addison arrives early to help with logistics - moving tables, coordinating vendors. Elena barefoot in grass, hair loose. Army of neighbors moving tables and chairs.' },
  { number: 39, title: 'Pre-Party', pov: 'Jasper/Elena', location: 'Oak Watch', synopsis: 'Jasper pulls up gravel drive. Tent already up, white canvas glowing under lantern strings. Addison helping Grace with last-minute decorations. Quick intimate moment with Elena before guests arrive.' },

  // The Party - Addison integrated into the family circle
  { number: 40, title: 'The Party', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'First thing noticed - the sound of laughter everywhere. Driveway slow parade of familiar faces. Harper in emerald wrap dress, Cole in navy suit, Rafe with Sofia, Mason whiskey in hand. Addison in a chic cocktail dress. Caroline Whitmore in plum and pearls, Ronnie Blake glittering gold, Julia Raines in deep green silk, Savannah Cole in white sheath. The wives\' circle teasing Harper mercilessly about her "mystery man." Julia and Ridge flirting near the bookcase.' },
  { number: 41, title: 'The Cookie Circuit', pov: 'Multiple', location: 'Oak Watch', synopsis: 'Addison and Grace deliver thank-you cookies around the party - baked with Miss Evie\'s secret recipe. Grace beams when she spots her teachers by the kitchen: "Miss Evie! Miss Donnelly!" Evie (flour-dusted cardigan, warm smile) and Maggie (flirty, outgoing energy) chat with Elena and Sara - not wives\' circle glamour, just genuine friendship. Evie and Sara talk meal prep for athletes. Maggie makes Elena laugh with a story about Grace\'s writing. These are Elena and Sara\'s people - teachers, not power players. Grace places cookies on the wives\' napkins: "Mom says these are thank-you cookies." Madison to Addison: "And who is this vision helping our cookie captain?" Addison: "She\'s family now. Grace too."' },
  { number: 42, title: 'By the Fire', pov: 'Jasper Barrett', location: 'Oak Watch', synopsis: 'Firepit throws a low, steady glow. Jasper with single malt, Mason with bourbon, Rafe in an Adirondack, Evan scanning the yard in that Tier 1 way. Mason: "Still not sure if Whitaker or Africa was the bigger headache." Easy banter with business undertones. Jasper watches Addison slide between his worlds - wives\' circle, Harper, Tier 1 crowd, Julia and Ridge. She\'s not just handling herself; she\'s handling them.' },
  { number: 43, title: 'The Toast', pov: 'Elena Barrett', location: 'Oak Watch', synopsis: 'Lanterns glowing full in the night. Elena steps forward, glass in hand. "Thank you for being here... for reminding us what we\'ve built isn\'t just this house or company, but this family." Jasper\'s arm around her waist. No phone buzz. Caroline follows up on a thread from the Zoom call. The wives\' circle has become Elena\'s anchor.' },
  { number: 44, title: 'Wind-Down', pov: 'Multiple', location: 'Oak Watch', synopsis: 'After crowd thins. Jasper with Mason at the fire. Elena with the wives\' circle on the patio, pale blue wrap dress, glass of rosé, laughing like she\'s always been part of their orbit. Harper gets final teasing about bringing her mystery man around "when he survives the vetting process." Addison and Grace step away together. Harper thanks Addison for being there through the hard months. Seeds planted for Book 2. The celebration complete.' }
];

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== Building Book 1 Final Chapter Structure ===\n");

  // Find Book 1
  const book1 = await prisma.book.findFirst({
    where: { projectId: project.id, title: 'Five Feet From Home' }
  });

  if (!book1) {
    console.log("Book 1 not found!");
    await prisma.$disconnect();
    return;
  }

  // Clear existing chapters
  await prisma.chapter.deleteMany({ where: { bookId: book1.id } });
  console.log("Cleared existing chapters\n");

  // Create all chapters
  for (const ch of book1Chapters) {
    await prisma.chapter.create({
      data: {
        projectId: project.id,
        bookId: book1.id,
        number: ch.number,
        title: ch.title,
        synopsis: ch.synopsis,
        pov: ch.pov,
        status: 'outlined',
        tags: ch.location
      }
    });
    console.log(`Ch ${ch.number}: ${ch.title} (${ch.pov}) - ${ch.location}`);
  }

  // Update book synopsis
  await prisma.book.update({
    where: { id: book1.id },
    data: {
      synopsis: `Five Feet From Home - Book 1 of the Jasper Barrett Series

44 chapters from The Call through Elena's thank-you party at Oak Watch.

PART ONE - The Five-Foot World (Ch 1-5)
Jasper Barrett, corporate crisis manager, thrives in his professional bubble. Elena's collapse at the dinner table shatters everything. Grace asks Jasper: "Are you on our team now?" - the question that haunts him through every crisis.

PART TWO - The Crisis Deepens (Ch 6-12)
Hospital vigils, Project Wildcard with Alexandria's flirtation (silk blouse, Chanel No. 5, selfies). Grace's drawing "DADDY SAVES THE DAY" anchors Jasper. Her email with "Mom, Dad, Me" drawing arrives at the same moment as Alexandria's most aggressive play. Jasper chooses Elena. Deletes Alexandria's contact.

PART THREE - Recovery and Elena's Transformation (Ch 13-22)
Elena recovers. THE WIVES' CIRCLE ZOOM CALL (Ch 15) - the emotional turning point where five wives give Elena advice. Elena shares strategies with Addison and Kendra, gets cleared for "full activity," embraces color in her wardrobe, and reconnects intimately with Jasper. Three years of distance begin to close.

PART FOUR - Party Prep (Ch 23-26)
Final medical clearance. Jasper and Mason define new boundaries. Party planning begins.

PART FIVE - The Party Arc (Ch 27-44)
Whitaker and Africa crises resolved. The inner circle gathers at Oak Watch for Elena's thank-you party. The Cookie Circuit - Addison and Grace deliver thank-you cookies, showing Addison's integration into all spheres. Firepit scene with the guys. Wives' circle teases Harper about "mystery man." Julia and Ridge flirting. Addison integrated into the family circle - seeds planted for Book 2.

KEY STORYLINES:
- Grace: "Our team" question, drawings ("DADDY SAVES THE DAY", "Mom Dad Me"), Cookie Circuit, talks about her teachers
- Grace's Teachers: Miss Donnelly (Maggie - literature, flirty, outgoing) and Miss Evie (culinary arts, warm, flour-dusted cardigan) - friends of Elena and Sara, not wives' circle
- Alexandria: Flirtation arc, selfies, temptation → Jasper's rejection and recommitment to Elena
- Wives' Circle: Zoom call (Ch 15) drives Elena's transformation
- Addison: Hospital visits, helping with Grace → integration into family circle`
    }
  });

  console.log(`\n=== Created ${book1Chapters.length} chapters ===`);

  // Stats
  const povCounts: Record<string, number> = {};
  for (const ch of book1Chapters) {
    povCounts[ch.pov] = (povCounts[ch.pov] || 0) + 1;
  }
  console.log('\nChapters by POV:');
  for (const [pov, count] of Object.entries(povCounts)) {
    console.log(`  ${pov}: ${count}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
