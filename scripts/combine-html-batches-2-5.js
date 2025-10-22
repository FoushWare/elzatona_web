const fs = require('fs');
const path = require('path');

// Read batches 2-5 and combine them
let combinedSQL = '';

for (let i = 2; i <= 5; i++) {
  const batchFile = path.join(__dirname, `html-batch-${i}.sql`);
  if (fs.existsSync(batchFile)) {
    const batchContent = fs.readFileSync(batchFile, 'utf8');
    combinedSQL += batchContent + '\n\n';
    console.log(
      `Added batch ${i} (${batchContent.split('VALUES')[1].split('(').length - 1} questions)`
    );
  }
}

// Write combined SQL
const combinedFile = path.join(__dirname, 'html-batches-2-5.sql');
fs.writeFileSync(combinedFile, combinedSQL);

console.log(`Combined SQL written to ${combinedFile}`);
console.log(`Total length: ${combinedSQL.length} characters`);
