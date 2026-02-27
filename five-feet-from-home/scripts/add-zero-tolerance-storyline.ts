import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING ZERO TOLERANCE STORYLINE ===\n");

  const storylines = [
    {
      title: "Hawk's Zero Tolerance Policy",
      category: "Family Values / Core",
      description: "Hawk's strict no-screen rules that define the Hawthorne household",
      content: `THE PHILOSOPHY:
"I've spent half my life staring at screens. These kids are gonna grow up knowing their dad's eyes, not the back of a phone."

This isn't a preference - it's a core value that defines the Hawthorne household and influences the entire inner circle.

THE RULES:

1. NO TECH IN THE NURSERY
- No tablets, no baby monitors glowing in the dark, no phones on nightstand
- The nursery is sacred space
- "This room's clean. No screens."
- Even Addie must leave her Vatican tablet at the door
- "They get us. Not whatever's buzzing out there."

2. NO TVs IN COMMON AREAS
- No television in the living room
- No screens in gathering spaces
- "This is where we talk, not zone out."
- What fills the space instead: laughter, piano practice, reading aloud, real conversation
- BSS operators share stories by firelight instead of watching games

3. ZERO TOLERANCE AT MEALS
- No phones at the dinner table - NO EXCEPTIONS
- Not for guests
- Not for Addie
- Not for Bella
- Not for Harper
- Not for anyone

THE ENFORCEMENT:

When someone breaks the rule, Hawk doesn't raise his voice.
He simply holds out his palm and says one word: "Phone."

If they hesitate: "You'll get it back after dessert. House rule."

THE HARPER INCIDENT:
Harper's phone lit up during Sunday dinner.
She reached for it: "It's a board message, Hawk. I just need to—"
Hawk: "Phone."
Harper looked around for support. Nobody came to her defense.
Even Selene raised an eyebrow as if to say "your funeral."
Harper surrendered the phone.
Grace announced: "No phones at dinner! Daddy's rule!"

THE ADDIE INCIDENT:
Addie walked in with her Vatican tablet, scanning a briefing.
Hawk: "Devices on the counter."
Addie: "It's work, Hawk. I just need two more minutes."
Hawk: "Then take them before you sit down. When we're at this table, we're here. For each other. Not them."
Addie sighed, set the tablet down, and gave him a small smile — equal parts exasperated and admiring.

WHY IT MATTERS:

For Hawk:
- He used to measure days by missions survived
- Now he measures them by diapers conquered and conversations had
- "I used to think I needed a wall of screens to run ops. Turns out, I just needed fire, food, my people in one room. That's command."

For the Children:
- Will and Izzy grow up knowing their father's eyes
- They learn presence, not distraction
- They know they matter more than any notification

For the Community:
- Sunday dinners become deeper without screens pulling attention
- Conversations run longer about family, faith, future
- The inner circle respects Hawk's household standards
- Even the most powerful people in their world surrender their phones at his table

THE RIPPLE EFFECT:
Other families in the wives' club start adopting similar rules.
The no-screen policy becomes part of the culture Hawk and Addie build.
It's not just a personal preference - it's legacy.

HAWK'S FINAL WORD:
"These kids don't need to be entertained. They need to be seen. And I'm going to see them - every moment I can."`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Harper', 'Bella', 'Grace', 'Will Hawthorne', 'Izzy Hawthorne']),
      themes: JSON.stringify(['Zero Tolerance', 'No Screens', 'Presence', 'Family Values', 'Core Rule'])
    },
    {
      title: "The Table Rule: No Exceptions",
      category: "Family Values / Scenes",
      description: "Specific moments when Hawk enforces the no-phone rule",
      content: `SCENE 1: HARPER'S PHONE

The Sunday dinner table was already set, candles flickering.
Harper leaned back, phone lighting up with a notification.
Instinctively, she reached for it, thumb swiping across the screen.

The room shifted. Hawk's eyes flicked up from carving brisket.
He set the knife down, wiped his hands, held out his palm.

"Phone," he said simply.

Harper froze mid-text. "It's a board message, Hawk. I just need to—"

"Phone." His voice didn't rise, but it carried weight that silenced even the kids.

Harper slid the phone across the table.
Hawk tucked it into his pocket with a half-smile.
"You'll get it back after dessert. House rule."

Grace clapped: "Daddy wins again!"

---

SCENE 2: BELLA'S SLIP

Bella trailed Addie into dinner, phone in hand, thumbs flying across the screen.
She was firing off messages to her event team.

Hawk's eyes flicked up, sharp as a knife.

"Devices on the counter," he said.

Bella glanced at Addie, half-expecting her to push back.
Addie only sighed and set her own tablet down.
Bella followed suit with a guilty grin.

---

SCENE 3: THE NEW GUEST

A first-time guest at Sunday dinner pulled out their phone to check the time.
Before they could unlock it, Grace leaned over and whispered:
"You can't have that here. It's Daddy's rule."

The guest looked to Hawk, who simply raised an eyebrow.
The phone disappeared back into a pocket.

Hawk nodded approvingly at Grace. "Good call, soldier."

---

SCENE 4: ADDIE'S VATICAN CALL

The most secure phone in the house buzzed - a Vatican priority message.
Addie reached for it instinctively.

Hawk cleared his throat.

"It's the Vatican, Hawk."

"And this is our table."

Long pause. Addie set the phone face-down.
"They can wait twenty minutes."

Hawk raised his glass to her. "That's my girl."`,
      characters: JSON.stringify(['Hawk', 'Addie', 'Harper', 'Bella', 'Grace']),
      themes: JSON.stringify(['Zero Tolerance', 'Enforcement', 'Table Rule', 'No Exceptions'])
    },
    {
      title: "Why Hawk Chose Presence",
      category: "Character Arc / Philosophy",
      description: "The deeper meaning behind Hawk's screen rules",
      content: `THE PAST:
Hawk spent years staring at screens.
Satellite feeds. Mission briefings. Tactical displays.
Green night-vision footage of operations.
Encrypted messages at 3am.
His eyes on screens while his heart was far from home.

THE TURNING POINT:
When the twins came, something shifted.
He watched other parents at parks - faces buried in phones.
Kids calling "Daddy! Daddy!" while dad scrolled.
He saw himself in them and felt sick.

THE DECISION:
"I'm not going to be that guy."
He made a choice that night.
When he's with his kids, he's WITH his kids.
No half-presence. No divided attention.

THE NURSERY RULE:
The nursery became sacred ground.
No tech crosses the threshold.
When he rocks Izzy at 2am, there's no phone glowing in his pocket.
When Will has a nightmare, Hawk is fully there - not checking email.

THE TABLE RULE:
Meals became the second sacred space.
"When we're at this table, we're here. For each other."
No exceptions. Not for work. Not for emergencies. Not for anyone.

THE LIVING ROOM:
He removed the TV entirely.
"This is where we talk, not zone out."
The space fills with what matters: laughter, stories, music, connection.

THE PHILOSOPHY:
"I've survived combat zones. I've lost friends. I've seen what happens when you're not present - people die.
In this house, I'm present. My kids will never wonder if they're more important than a screen.
They'll know."

THE LEGACY:
This isn't about being strict.
It's about being intentional.
Hawk is building something - a family that knows how to be together.
A home where presence is the default, not the exception.

His children will grow up knowing their father's eyes.
And someday, they'll do the same for their own kids.
That's the real mission.`,
      characters: JSON.stringify(['Hawk', 'Will Hawthorne', 'Izzy Hawthorne', 'Mikey Hawthorne']),
      themes: JSON.stringify(['Presence', 'Philosophy', 'Legacy', 'Intentional Parenting'])
    }
  ];

  for (const storyline of storylines) {
    const existing = await prisma.storyline.findFirst({
      where: { title: storyline.title, projectId: project.id }
    });

    if (!existing) {
      await prisma.storyline.create({
        data: { projectId: project.id, ...storyline }
      });
      console.log(`Created: ${storyline.title}`);
    } else {
      await prisma.storyline.update({
        where: { id: existing.id },
        data: storyline
      });
      console.log(`Updated: ${storyline.title}`);
    }
  }

  const count = await prisma.storyline.count();
  console.log(`\nTotal Storylines: ${count}`);

  await prisma.$disconnect();
}

main().catch(console.error);
