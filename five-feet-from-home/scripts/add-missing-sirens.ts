import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst();
  if (!project) {
    console.error('No project found');
    return;
  }

  console.log("=== ADDING MISSING SIRENS FROM CAM STAR BUILD ===\n");

  const missingSirens = [
    {
      name: 'Abigail "Abby" Sommers',
      nickname: 'Abby Bliss',
      firstName: 'Abigail',
      lastName: 'Sommers',
      archetype: 'Siren - The Comfort Fantasy (MILF Division)',
      modeledAfter: 'Abby Somers',
      appearance: 'Warm, approachable MILF with soft curves, honey-blonde hair, inviting smile. The "mom next door" fantasy.',
      wardrobeStyle: 'Cozy but sexy - cardigans that slip off shoulders, soft fabrics.',
      background: `Former suburban mom who discovered camming after divorce. Built massive following by being genuinely warm and nurturing on camera. Her fans feel like they're being taken care of, not just entertained.`,
      personality: 'Genuinely warm and maternal, but hides a daring, sexually fearless edge. The comfort fantasy - makes everyone feel safe.',
      bssRole: 'Siren Asset - The comfort fantasy. Deployed for clients who need emotional connection wrapped in intimacy. Disarms with warmth.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Jillian "Jill" Cassidy',
      nickname: 'Jill K',
      firstName: 'Jillian',
      lastName: 'Cassidy',
      archetype: 'Siren - The All-American Sweetheart',
      modeledAfter: 'Jill Kassidy',
      appearance: 'Sweet, all-American girl-next-door. Fresh-faced, bright eyes, natural beauty. College cheerleader vibe.',
      wardrobeStyle: 'Preppy, sporty, wholesome-looking.',
      background: `Texas native, former cheerleader and sorority girl. Discovered adult work through college financial pressures. Balances the flashier MILFs with genuine sweetness.`,
      personality: 'Sweet but surprisingly bold. Uses her wholesome appearance to disarm before striking. Competitive underneath the sweetness.',
      bssRole: 'Siren Asset - The sweetheart. Perfect for targets who want the "girl they should have married" fantasy.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Renna Cielo',
      nickname: 'Renna Sky',
      firstName: 'Renna',
      lastName: 'Cielo',
      archetype: 'Siren - The Exotic Mystery',
      modeledAfter: 'Renna Sky',
      appearance: 'Exotic, mysterious, petite Latina beauty. Sultry eyes, dark hair, emotionally layered presence.',
      wardrobeStyle: 'Bohemian meets seductive - flowing fabrics, deep colors.',
      background: `Born in Puerto Rico, raised between the islands and Miami. Mysterious past that she never fully reveals. Known for her emotional depth on camera.`,
      personality: 'Sultry and mysterious, with emotional layers. Never fully reveals herself. Masters the art of making men chase.',
      bssRole: 'Siren Asset - The mystery. Deployed when intrigue and emotional entanglement are needed.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Caprice Novak',
      nickname: 'Little Caprice',
      firstName: 'Caprice',
      lastName: 'Novak',
      archetype: 'Siren - The European Bohemian',
      modeledAfter: 'Little Caprice',
      appearance: 'European, bohemian, chic. Petite with elegant features, cosmopolitan air. Prague-born glamour.',
      wardrobeStyle: 'European chic - designer casual, effortlessly stylish.',
      background: `Czech-born model who built an empire from Prague. Known for combining art-house aesthetics with raw sexuality. Runs her own production company.`,
      personality: 'Glamorous but playful, with cosmopolitan sophistication. Business-minded beneath the bohemian exterior.',
      bssRole: 'Siren Asset - The European sophisticate. Perfect for international missions and European clients.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Meghan Tiffany',
      nickname: 'Meg Tiff',
      firstName: 'Meghan',
      lastName: 'Tiffany',
      archetype: 'Siren - The Fresh-Faced Natural',
      modeledAfter: 'Meghan Tiff',
      appearance: 'Fresh-faced, playful, natural beauty with effortless charm. Wholesome meets wild.',
      wardrobeStyle: 'Casual, approachable, "just rolled out of bed" sexy.',
      background: `Small-town girl who found fame through authenticity. Known for genuine reactions and unforced sexuality. The anti-plastic aesthetic.`,
      personality: 'Genuinely playful and unforced. Makes everyone feel at ease. Secretly sharp observer.',
      bssRole: 'Siren Asset - The natural. Deployed when authenticity is key to winning trust.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Taylor Belmont',
      nickname: 'Taylor Belle',
      firstName: 'Taylor',
      lastName: 'Belmont',
      archetype: 'Siren - The Fitness Queen',
      modeledAfter: 'Taylor Bell',
      appearance: 'Sporty, bubbly, fitness-girl-next-door. Athletic curves, sun-kissed skin, infectious energy.',
      wardrobeStyle: 'Athleisure - yoga pants, sports bras, workout chic.',
      background: `Former college athlete who leveraged fitness following into adult content. Known for athletic performances and genuine enthusiasm.`,
      personality: 'Bubbly, energetic, sunshine personality. Uses fitness as both brand and lifestyle. Competitive streak.',
      bssRole: 'Siren Asset - The fitness fantasy. Deployed for athletic/health-conscious targets.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Jenna Hayes',
      nickname: 'Love',
      firstName: 'Jenna',
      lastName: 'Hayes',
      archetype: 'Siren - The Secret Life',
      modeledAfter: 'Jennifer Love Hewitt (The Client List)',
      appearance: 'Classic American beauty with girl-next-door appeal hiding a secret life. Dark hair, warm eyes, inviting smile.',
      wardrobeStyle: 'By day: suburban mom. By night: sultry transformation.',
      background: `Former suburban wife who discovered her power through the Sirens network. Lives dual life - PTA meetings by day, operations by night.`,
      personality: 'The perfect double life. Sweet and approachable on surface, dangerously effective underneath.',
      bssRole: 'Siren Asset - The secret life. Can infiltrate normal suburban circles then transform.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Aidra Foxx',
      nickname: 'Aidra',
      firstName: 'Aidra',
      lastName: 'Foxx',
      archetype: 'Siren - The Wild Card',
      modeledAfter: 'Aidra Fox',
      appearance: 'Striking brunette with intense eyes and athletic build. Raw, unpolished beauty.',
      wardrobeStyle: 'Edgy, alternative, unpredictable.',
      background: `Midwest rebel who escaped small-town life for the spotlight. Known for intensity and willingness to push limits.`,
      personality: 'Intense, unpredictable, fiercely independent. The wild card no one sees coming.',
      bssRole: 'Siren Asset - The wild card. Deployed when unpredictability is the weapon.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Valentina Romano',
      nickname: 'Val Nappi',
      firstName: 'Valentina',
      lastName: 'Romano',
      archetype: 'Siren - The Italian Bombshell',
      modeledAfter: 'Valentina Nappi',
      appearance: 'Italian bombshell - dark hair, olive skin, curves that command attention. Mediterranean goddess.',
      wardrobeStyle: 'Italian glamour - Versace meets seduction.',
      background: `Italian-born model who conquered the international adult scene. Known for combining European sophistication with raw sexuality. Openly intellectual.`,
      personality: 'Unapologetically sexual but deeply intellectual. Quotes philosophers between scenes. Feminist perspective on her work.',
      bssRole: 'Siren Asset - The Italian bombshell. Perfect for Mediterranean clients and European operations.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Angela Whitmore',
      nickname: 'Angie White',
      firstName: 'Angela',
      lastName: 'Whitmore',
      archetype: 'Siren - The Powerhouse Bombshell',
      modeledAfter: 'Angela White',
      appearance: 'Statuesque bombshell - tall, curves that stop traffic, commanding presence. Australian-born beauty.',
      wardrobeStyle: 'Bold, glamorous, impossible to ignore.',
      background: `Australian who became one of the biggest names in adult entertainment through business savvy and undeniable presence. Runs her own production company.`,
      personality: 'Brilliant business mind wrapped in bombshell packaging. Knows exactly what she is worth. Commands every room.',
      bssRole: 'Siren Asset - The powerhouse. When you need someone who can dominate any situation through sheer presence.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Madame Elise Laurent',
      nickname: 'The Madame',
      firstName: 'Elise',
      lastName: 'Laurent',
      archetype: 'Siren - The Gatekeeper / Madam',
      modeledAfter: 'High-end madam archetypes',
      appearance: 'Elegant French woman, late 40s. Timeless beauty, always impeccably dressed. Commands respect.',
      wardrobeStyle: 'Haute couture. Chanel. Classic French elegance.',
      background: `Former high-end escort who built an empire. Now runs exclusive network for elite clients. The gatekeeper to luxury desire. Works closely with Selene.`,
      personality: 'Controlled, calculating, elegant. Speaks softly but everyone listens. Knows every secret in every city.',
      bssRole: 'Siren Asset - The Madame. Controls access to the highest tier of Sirens operations. Selene second-in-command for international operations.',
      sourceFiles: 'Cam Star Build'
    },
    {
      name: 'Elsa Winters',
      nickname: 'Elsa Jean',
      firstName: 'Elsa',
      lastName: 'Winters',
      archetype: 'Siren - The Porcelain Doll',
      modeledAfter: 'Elsa Jean',
      appearance: 'Petite blonde with porcelain skin, doll-like features. Delicate beauty that hides steel.',
      wardrobeStyle: 'Innocent whites and pastels. The ingenue aesthetic.',
      background: `Small-town Ohio girl who became one of the youngest stars in the industry. Built empire on delicate beauty and surprising intensity.`,
      personality: 'Looks fragile but is steel underneath. Masters the art of weaponizing perceived innocence.',
      bssRole: 'Siren Asset - The porcelain doll. When you need someone who looks innocent but delivers devastation.',
      sourceFiles: 'Cam Star Build'
    }
  ];

  for (const siren of missingSirens) {
    const existing = await prisma.character.findFirst({
      where: {
        OR: [
          { name: siren.name },
          { nickname: siren.nickname }
        ],
        projectId: project.id
      }
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          projectId: project.id,
          ...siren,
          clubsAssociations: 'Sirens Network, Vixens'
        }
      });
      console.log(`Created: ${siren.name} (${siren.nickname}) - Modeled after: ${siren.modeledAfter}`);
    } else {
      console.log(`Exists: ${siren.name}`);
    }
  }

  // Update Lila Monroe to be modeled after Lana Rhoades
  const lila = await prisma.character.findFirst({
    where: { name: { contains: 'Lila Monroe' }, projectId: project.id }
  });
  if (lila) {
    await prisma.character.update({
      where: { id: lila.id },
      data: { modeledAfter: 'Lana Rhoades' }
    });
    console.log('\nUpdated: Lila Monroe - now modeled after Lana Rhoades');
  }

  // Final count
  const sirenCount = await prisma.character.count({
    where: {
      clubsAssociations: { contains: 'Sirens' },
      projectId: project.id
    }
  });

  console.log(`\n=== SIRENS COUNT: ${sirenCount} ===`);

  await prisma.$disconnect();
}

main().catch(console.error);
