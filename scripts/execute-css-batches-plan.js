const fs = require('fs');
const path = require('path');

// This script will help execute CSS batches systematically
const cssBatchesDir = path.join(__dirname, 'css-batches');
const batchFiles = fs
  .readdirSync(cssBatchesDir)
  .filter(file => file.startsWith('css-batch-') && file.endsWith('.sql'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
  });

console.log('CSS Batch Execution Plan:');
console.log('=======================');

let totalStatements = 0;
batchFiles.forEach((file, index) => {
  const batchPath = path.join(cssBatchesDir, file);
  const content = fs.readFileSync(batchPath, 'utf8');
  const statements = content.split(';').filter(stmt => stmt.trim().length > 0);
  totalStatements += statements.length;

  console.log(`Batch ${index + 1}: ${file} - ${statements.length} statements`);
});

console.log(`\nTotal CSS statements to execute: ${totalStatements}`);
console.log('\nTo execute all CSS batches, use Supabase MCP execute_sql tool');
console.log('with each batch file content as the query parameter.');

// Show first few statements from first batch as example
const firstBatch = path.join(cssBatchesDir, batchFiles[0]);
const firstContent = fs.readFileSync(firstBatch, 'utf8');
const firstStatements = firstContent
  .split(';')
  .filter(stmt => stmt.trim().length > 0);

console.log('\nFirst 3 statements from batch 1:');
firstStatements.slice(0, 3).forEach((stmt, index) => {
  console.log(`\nStatement ${index + 1}:`);
  console.log(stmt.trim().substring(0, 150) + '...');
});
