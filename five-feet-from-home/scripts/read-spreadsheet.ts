/**
 * Read the BSS Master Characters spreadsheet and show structure
 */
import * as XLSX from 'xlsx';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'BSS_Master_Characters_All_In_One.xlsx');

const workbook = XLSX.readFile(filePath);

console.log('Sheet Names:', workbook.SheetNames);

for (const sheetName of workbook.SheetNames) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`SHEET: ${sheetName}`);
  console.log('='.repeat(60));

  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Show headers (first row)
  if (data.length > 0) {
    console.log('\nColumns:');
    const headers = data[0] as string[];
    headers.forEach((h, i) => {
      if (h) console.log(`  ${i + 1}. ${h}`);
    });

    // Show first 3 data rows as sample
    console.log('\nSample Data (first 3 rows):');
    for (let i = 1; i < Math.min(4, data.length); i++) {
      console.log(`\n  Row ${i}:`);
      const row = data[i] as any[];
      headers.forEach((h, j) => {
        if (row[j] && h) {
          const value = String(row[j]).substring(0, 100);
          console.log(`    ${h}: ${value}${String(row[j]).length > 100 ? '...' : ''}`);
        }
      });
    }
  }
}
