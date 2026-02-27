import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  const sirensOrg = await prisma.organization.findFirst({
    where: { name: { contains: 'Sirens' }, projectId: project.id }
  });

  if (sirensOrg) {
    await prisma.organization.update({
      where: { id: sirensOrg.id },
      data: {
        significance: `THE SIRENS NETWORK - SELENE'S SHADOW SISTERHOOD
44 Members Across 8 Divisions

NETWORK FOUNDER: Selene Thorne

CORE DIVISION (Original Cam Stars):
- Nadia Noir (Natali Tangherlini) - The Strategist
- Hannah Vale (Hannah Harper) - The Muse
- Kelsi Monroe (Kelsi Monroe) - The Fire/Closer
- Dillion Harper (Dillion Harper) - The Infiltrator
- Gabbi Carter (Gabbi Carter) - The Ingenue
- Serenity Knox (Serenity Cox) - The Trophy
- Lila Lux (Lana Rhoades) - Apprentice
- Elsa Jean (Elsa Jean) - Porcelain Doll
- Aidra Fox (Aidra Fox) - Wild Card
- Jill K (Jill Kassidy) - All-American
- Meg Tiff (Meghan Tiff) - Fresh-Faced
- Taylor Belle (Taylor Bell) - Fitness Queen
- Lexi Amor (Alexis Amor) - Latina Temptress

MILF DIVISION:
- Penny Barber (Penny Barber) - The Matriarch
- Veronica Vail - The Professor
- Bianca Blaze - The Hedonist
- Eva Divine - The Ice Queen
- Abby Bliss (Abby Somers) - Comfort Fantasy
- Ms. Lane (littlecrazyteacher) - Crazy Teacher
- Love (Jennifer Love Hewitt) - Secret Life

WNBA DIVISION (Athletic Sirens):
- Nia Clarke (Caitlin Clark) - Athletic Golden Girl
- Talia Cunn (Sophie Cunningham) - Cheeky Sharpshooter
- Sabina (Sabrina Ionescu) - Cerebral Playmaker
- Brenna (Breanna Stewart) - Amazon Powerhouse

INFLUENCER DIVISION:
- Towball Queen (Bailey Brewer) - Country Queen
- Annie (Annie Agar) - Sports Media Sweetheart
- KP (Kennedy Paige) - Instagram Princess
- Bri Blossom (Bri Blossom) - Blossoming Beauty
- Rubber Ducky (Rubberduckybathbaby) - Playful Tease
- Em Twins (Emily Twinsney) - Disney Princess
- Sienna Twin (Sentertwins) - Twin Fantasy
- Sierra Twin (Sentertwins) - Twin Fantasy

INTERNATIONAL DIVISION:
- Little Caprice (Little Caprice) - European Bohemian
- Val Nappi (Valentina Nappi) - Italian Bombshell
- Renna Sky (Renna Sky) - Exotic Mystery
- Valeria Knight - European Bombshell

BOMBSHELLS DIVISION:
- Angie White (Angela White) - Powerhouse Bombshell
- Scarlett Vaughn (Angela White mix) - Intellectual Bombshell
- Cami Rae - Digital Cam Queen

CHAOS DIVISION:
- Misty Meaner (Misty Meaner) - Chaos Agent
- Adriana Cech (Adriana Chechik) - Shock Trooper

SPECIAL ASSETS:
- The Madame (Madam archetype) - Gatekeeper
- Angie Cross (Angela from Landman) - Southern Power Player
- Serenity Knox - Trophy Fantasy

OPERATIONS:
- Pre-screening potential clients/operators online
- In-person deployments to Miami, Vegas, European trips
- Gala infiltrations and social engineering
- High-stakes seduction and influence campaigns
- Training new Sirens in manipulation techniques
- WNBA/Athletic circle infiltration
- Influencer network leverage
- International operations across Europe, Latin America

SELENE'S VISION:
The Sirens are a rival power center - seductive, dangerous, capable of moving between BSS, Wives Club, and global elite. Each division fills unique archetypes giving Selene unmatched roster for any mission.`
      }
    });
    console.log('Updated Sirens organization with all 44 members and 8 divisions');
  }

  await prisma.$disconnect();
}

main();
