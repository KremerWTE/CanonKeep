import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("Adding Evie & Sofia Romance Arc...\n");

  // ========== UPDATE SOFIA WITH EVIE RELATIONSHIP ==========
  console.log("--- Updating Sofia ---\n");

  const sofia = await prisma.character.findFirst({
    where: { firstName: 'Sofia' }
  });

  if (sofia) {
    const sofiaUpdate = {
      relationships: (sofia.relationships || '') + `

EVIE MAREN - Romantic relationship. Sofia asks Evie to become lovers after months of friend dates and late-night work sessions building the foundation together. Sofia is more experienced, guides Evie through her first romantic/physical relationship with a woman.

THE PHYSICIAN - Chris sets Sofia up with a respected physician. Sofia is drawn to both relationships - publicly with the physician (stability, family approval) and privately with Evie (passion, creativity, soul connection). Creates a love triangle.

MANDY - Mandy threatens Sofia: "If you hurt Evie, I will come after you and destroy everything you've built." Sofia takes this seriously.`,
      background: (sofia.background || '') + `

ROMANTIC ARC WITH EVIE:
After 25 friend dates and 8 late-night work sessions building the foundation together, Sofia realizes she wants more than friendship with Evie. She asks Evie to become her lover.

When Evie admits she's a virgin and never thought she was into women, Sofia responds with tenderness: "That doesn't change how I feel. It makes me want to take care of you even more. We'll go at your pace."

Sofia later begins dating a physician that Chris introduces, creating a complex love triangle where she's drawn to both - Evie for passion and soul connection, the physician for stability and social acceptance.`
    };

    await prisma.character.update({
      where: { id: sofia.id },
      data: sofiaUpdate
    });
    console.log('Updated: Sofia with Evie romance');
  }

  // ========== UPDATE EVIE WITH SOFIA RELATIONSHIP ==========
  console.log("\n--- Updating Evie ---\n");

  const evie = await prisma.character.findFirst({
    where: { firstName: 'Evelyn', lastName: 'Maren' }
  });

  if (evie) {
    const evieUpdate = {
      relationships: (evie.relationships || '') + `

SOFIA - Romantic relationship during Cole's ghosting period. Sofia asks Evie to become lovers after months of foundation work together. Evie discovers she's attracted to women through this relationship.

THE PHYSICIAN - Sofia also dates a physician, creating tension. Evie struggles with being "the hidden love" but can't walk away from what they share.`,
      background: (evie.background || '') + `

ROMANCE WITH SOFIA (During Cole's Ghosting):
While Cole ghosted her, Evie grew close to Sofia through 25 friend dates and 8 late-night work sessions building the foundation together.

EVIE'S DISCOVERY:
When Sofia asked to be more than friends, Evie admitted:
- "I never expected this. I never even thought I liked girls."
- "But this—being with you, all the late nights, the way you look at me—it feels amazing. Like I can finally breathe."
- She also confessed she was still a virgin.

Sofia guided her gently through her first romantic relationship with a woman. Evie realizes love doesn't fit into the box she expected.

COMPLEXITY:
Sofia later begins dating a physician (introduced by Chris), creating a love triangle. Evie struggles between jealousy and loyalty, between being Sofia's "hidden love" and wanting to be chosen openly.

Bella remains Evie's confidant through all of this, and Mandy threatens Sofia: "If you hurt Evie, I will destroy you."`
    };

    await prisma.character.update({
      where: { id: evie.id },
      data: evieUpdate
    });
    console.log('Updated: Evie with Sofia romance and self-discovery');
  }

  // ========== ADD THE PHYSICIAN CHARACTER ==========
  console.log("\n--- Adding The Physician ---\n");

  const physicianData = {
    name: 'The Physician',
    firstName: 'TBD',
    archetype: 'Sofia\'s Other Love Interest',
    hubLocation: 'Charlotte, NC',
    personality: 'Charming, stable, respected. Admired in social circles. Represents the "safe" choice for Sofia.',
    background: `A respected physician introduced to Sofia by Chris through a double date. He's charming, stable, and everything society expects Sofia to want.

Sofia is genuinely attracted to him, but her heart is also with Evie. She begins dating both:
- Publicly with the physician (stability, appearances, family approval)
- Privately with Evie (passion, creativity, soul connection)

He eventually senses Sofia's heart isn't fully his, creating tension in the love triangle.`,
    relationships: `Sofia - dating, the "stable" choice
Chris Donnelly - introduced them
Evie Maren - rival for Sofia's heart (though they may not directly interact)`,
  };

  const physician = await prisma.character.findFirst({
    where: { archetype: { contains: 'Physician' } }
  });

  if (!physician) {
    await prisma.character.create({
      data: { projectId: project.id, ...physicianData, isConfirmed: true }
    });
    console.log('Created: The Physician');
  } else {
    console.log('Already exists: The Physician');
  }

  // ========== ADD EVIE-SOFIA STORYLINES ==========
  console.log("\n--- Adding Evie-Sofia Storylines ---\n");

  const storylines = [
    {
      title: 'Evie & Sofia - 25 Friend Dates',
      category: 'Character Arc',
      description: 'The foundation of Evie and Sofia\'s relationship',
      content: `25 FRIEND DATES - Building Their Bond

STAGE 1: CASUAL & FUN (1-8)
1. Coffee at an artsy café after yoga
2. Shopping for gala dresses together
3. Movie night at Sofia's loft — wine, snacks, trashy rom-coms
4. Foundation board meeting turns into late lunch
5. Rooftop bar for cocktails, laughing over dating horror stories
6. Charity spin class, sweating and teasing each other
7. Fashion show as each other's "plus one"
8. Brunch after church — Sofia's favorite spot

STAGE 2: SHARED EXPERIENCES (9-16)
9. Weekend farmers' market, sharing pastries and flowers
10. Art museum — Sofia teases Evie for staring too long at portraits
11. Horseback riding at a ranch getaway
12. Winery day trip, tasting and laughing until tipsy
13. Friend's birthday party as "wingwomen"
14. Mountain trail hiking — sweaty selfies and genuine talks
15. Cooking night at Evie's — one bottle of wine turns into two
16. Pool day at hotel cabana — sun, cocktails, playful splashing

STAGE 3: EMOTIONAL INTIMACY (17-22)
17. Spa day — facials, massages, quiet relaxation
18. Beach at sunset, talking about dreams
19. Gala where Evie is Sofia's official "plus one"
20. Late-night ice cream run in pajamas
21. Private dinner at Sofia's loft with candles — intimate but still "friendly"
22. Road trip to charity event, singing loudly to music

STAGE 4: CROSSING THE LINE (23-25)
23. Ski lodge weekend — sharing a room, too much champagne
24. Club dancing, stumbling home together
25. Foundation retreat — sneak away, swim under the stars, hold each other too long`,
      characters: JSON.stringify(['Evie Maren', 'Sofia'])
    },
    {
      title: 'Evie & Sofia - 8 Late Night Work Sessions',
      category: 'Character Arc',
      description: 'Foundation work that deepens their bond',
      content: `8 LATE NIGHT WORK SESSIONS

1. FIRST WORK NIGHT
Sofia's sleek office, city skyline glowing outside. Takeout, scattered papers. Small talk turns into personal stories.

2. SHARED PLAYLIST
Evie brings a speaker: "We need music to survive this." They make a joint playlist, banter over guilty-pleasure songs. Dancing while waiting for files to upload.

3. WINE + WHITEBOARDS
Sofia uncorks wine after midnight: "It's technically tomorrow, so cheers." Brainstorming on whiteboards. Evie smudges marker on her cheek. Sofia wipes it off gently — a lingering moment.

4. MIDNIGHT FOOD RUN
24-hour diner at 1 AM after burning out on spreadsheets. In a booth with greasy fries, they talk about why they care about the foundation. Evie opens up about wanting to help kids who feel invisible.

5. LAPTOPS + LAUGHTER
Budget revisions derail into memes and embarrassing old photos. 45 minutes of nothing done, but more fun than work has ever been.

6. RAINY NIGHT
Thunderstorm, power flickers. Candles lit, working on laptops. Sofia admits: "I never work this late with anyone else… you're different."

7. ALMOST TOO CLOSE
Side by side on a couch instead of across the table. Hands brush as they pass papers. Neither pulls away. Silence stretches — Evie breaks the tension with a joke.

8. THE GALA VISION
Exhausted, running on coffee. Evie: "We need something that brings people in, makes them feel the mission."
Sofia: "What if we showcase the kids? Not just stories — let them perform, display art, speak for themselves."
Evie grins: "That's it. A gala by the kids, for the kids."
The moment feels bigger than work — they just created something special together.`,
      characters: JSON.stringify(['Evie Maren', 'Sofia'])
    },
    {
      title: 'Evie & Sofia - Sofia Asks for More',
      category: 'Character Arc',
      description: 'Sofia asks Evie to become lovers; Evie reveals she\'s a virgin',
      content: `THE SCENE - FIRST LOVER CONVERSATION

Setting: Evie's apartment, after a long gala celebration. Wine glasses half-finished. Both still in their dresses, hair slightly undone.

SOFIA (softly): "We've done everything together… built this foundation, laughed, cried, stayed up all night. But there's one thing we keep dancing around."

EVIE (nervous laugh): "You mean all those almost-kisses? Or the fact that everyone thinks we're already dating?"

SOFIA (moves closer, serious): "No, Evie. I mean us. I want more than friendship. I want you. Not just the late nights, not just the laughter — all of you. I want to be your lover."

(Pause. Evie freezes.)

EVIE (vulnerable): "Sofia… I need to tell you something before this goes any further."

SOFIA (taking her hand): "What is it?"

EVIE (whispering): "I've never… with anyone. I'm still a virgin. Completely."

(Sofia softens instantly, brushing Evie's hair back.)

SOFIA (gentle): "Evie… that doesn't change how I feel. It makes me want to take care of you even more. We'll go at your pace. No pressure. Just us, when you're ready."

EVIE'S DISCOVERY:
"I never expected this. I never even thought I liked girls… but with you, it feels different. It feels amazing. Like I can finally breathe. Like maybe this is what I was waiting for, even if I didn't know it."

(The kiss that follows is tentative at first, then deepens. The shift from friends to lovers is complete.)`,
      characters: JSON.stringify(['Evie Maren', 'Sofia'])
    },
    {
      title: 'Evie & Sofia - The Love Triangle Begins',
      category: 'Character Arc',
      description: 'Sofia begins dating the physician while still with Evie',
      content: `THE LOVE TRIANGLE

INTRODUCTION OF THE PHYSICIAN:
Chris arranges a double date with his work friend — a respected, charming physician.

SURPRISE:
Sofia and the physician click. He's everything society expects her to want: stable, admired, charming.

CONFLICT:
Evie is supportive at first — she tells Sofia she deserves happiness. But Evie can't walk away from what they share.

DUAL LIFE:
Sofia begins dating both:
- Publicly with the physician (appearances, stability, family approval)
- Privately with Evie (passion, creativity, soul connection)

KEY TENSION SCENES:
- Gala where Sofia attends with the physician as her date but sneaks away to find Evie
- Evie watching Sofia light up when she talks about him — torn between jealousy and loyalty
- Sofia admitting she doesn't want to give either up: "I need them both."

EVIE'S STRUGGLE:
She wrestles with being "the hidden love" but also doesn't want to lose Sofia. Bella guides her through this, reminding her: "You deserve to be chosen, Evie. Don't settle for being someone's secret, even if you love her."`,
      characters: JSON.stringify(['Evie Maren', 'Sofia', 'The Physician', 'Chris Donnelly', 'Bella'])
    },
    {
      title: 'Mandy Threatens Sofia',
      category: 'Character Arc',
      description: 'Mandy confronts Sofia about hurting Evie',
      content: `THE CONFRONTATION

Timing: After Evie confides in Bella about becoming Sofia's lover, Bella shares it with Mandy out of love and concern.

Setting: Private moment after a foundation event — quiet hallway after a gala.

MANDY (low voice, direct): "Listen to me, Sofia. Evie's not like the rest of us. She's pure. She's trusting. And if you hurt her, if you play with her heart the way I've seen you play before… I will come after you. And I don't mean a catfight. I mean I will burn every bridge you've built until there's nothing left of your perfect reputation."

SOFIA (startled): "Mandy, I—"

MANDY: "I'm not finished. Evie is protected. By me. By Bella. By this entire circle. If you're going to love her, you better mean it. Because if I find out you're using her while you play house with that physician, I will destroy you. Do you understand?"

(Sofia nods slowly, seeing a side of Mandy she's never witnessed before.)

MANDY: "Good. Now go be the woman Evie thinks you are. Or get out of her life completely."

WHY MANDY REACTS:
- Mandy adores Evie's innocence and kindness
- Mandy knows Sofia has a history of playing both sides
- Mandy's protective instinct is fierce — she refuses to let Evie be collateral damage`,
      characters: JSON.stringify(['Mandy', 'Sofia', 'Evie Maren', 'Bella'])
    }
  ];

  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({ data: { projectId: project.id, ...storyline } });
      console.log(`Created storyline: ${storyline.title}`);
    } else {
      await prisma.storyline.update({ where: { id: existing.id }, data: storyline });
      console.log(`Updated storyline: ${storyline.title}`);
    }
  }

  // ========== UPDATE MANDY WITH PROTECTIVE ROLE ==========
  console.log("\n--- Updating Mandy with Evie protection role ---\n");

  const mandy = await prisma.character.findFirst({
    where: { firstName: 'Mandy' }
  });

  if (mandy) {
    const mandyUpdate = {
      relationships: (mandy.relationships || '') + `
Evie Maren - fiercely protective, threatens Sofia about hurting her
Sofia - warned her directly about consequences of hurting Evie`,
      personality: (mandy.personality || '') + `

PROTECTIVE SIDE:
When it comes to people she loves (like Evie), Mandy becomes fierce and dangerous. She threatened Sofia: "If you hurt Evie, I will burn every bridge you've built until there's nothing left of your perfect reputation."`
    };

    await prisma.character.update({
      where: { id: mandy.id },
      data: mandyUpdate
    });
    console.log('Updated: Mandy with protective role');
  }

  // Final counts
  const storylineCount = await prisma.storyline.count();
  const charCount = await prisma.character.count();

  console.log(`\nTotal storylines: ${storylineCount}`);
  console.log(`Total characters: ${charCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
