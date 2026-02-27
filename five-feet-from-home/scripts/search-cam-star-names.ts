import * as mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({ path: 'Cam Star Build.docx' });
  const text = result.value.toLowerCase();

  // List of common adult star names to search for
  const potentialNames = [
    'lana rhoades', 'riley reid', 'mia malkova', 'mia khalifa', 'angela white',
    'abella danger', 'kendra lust', 'kendra sunderland', 'brandi love',
    'lisa ann', 'ava addams', 'nicole aniston', 'madison ivy', 'alexis texas',
    'kimmy granger', 'elsa jean', 'lena paul', 'autumn falls', 'emily willis',
    'eva lovia', 'jessa rhodes', 'kissa sins', 'janice griffith', 'remy lacroix',
    'leah gotti', 'karlee grey', 'valentina nappi', 'gianna michaels',
    'julia ann', 'cory chase', 'reagan foxx', 'cherie deville', 'india summer',
    'syren de mer', 'casca akashova', 'kit mercer', 'kylie rocket',
    'vanna bardot', 'haley reed', 'skylar vox', 'lacy lennon', 'siri dahl',
    'natasha nice', 'sophie dee', 'alina lopez', 'aria lee', 'adria rae',
  ];

  console.log('=== SEARCHING FOR ADDITIONAL ADULT STAR NAMES ===\n');

  const found: string[] = [];
  for (const name of potentialNames) {
    if (text.includes(name)) {
      found.push(name);
    }
  }

  if (found.length > 0) {
    console.log('FOUND MENTIONS OF:');
    found.forEach(n => console.log(`  - ${n}`));
  } else {
    console.log('No additional names found from common list.');
  }

  // Also search for mentions of "modeled after" or "inspired by"
  console.log('\n=== SECTIONS WITH "MODELED AFTER" ===\n');
  const lines = result.value.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes('modeled after') || line.toLowerCase().includes('inspired by')) {
      console.log(line.substring(0, 200));
    }
  }
}

main().catch(console.error);
