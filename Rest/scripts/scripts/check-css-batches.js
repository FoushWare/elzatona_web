const fs = require('fs');
const path = require('path');

// Read all CSS batch files and execute them
const cssBatchesDir = path.join(__dirname, 'css-batches');
const batchFiles = fs
  .readdirSync(cssBatchesDir)
  .filter(file => file.startsWith('css-batch-') && file.endsWith('.sql'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
  });

console.log(`Found ${batchFiles.length} CSS batch files:`);
batchFiles.forEach(file => {
  console.log(`- ${file}`);
});

// Read the first batch to see how many statements it contains
const firstBatch = path.join(cssBatchesDir, batchFiles[0]);
const content = fs.readFileSync(firstBatch, 'utf8');
const statements = content.split(';').filter(stmt => stmt.trim().length > 0);

console.log(
  `\nFirst batch (${batchFiles[0]}) contains ${statements.length} INSERT statements`
);
console.log('Ready to execute CSS batches via Supabase MCP tools');
