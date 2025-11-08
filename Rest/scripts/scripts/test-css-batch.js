const fs = require('fs');
const path = require('path');

// Read the first batch file
const batchFile = path.join(__dirname, 'css-batches/css-batch-1.sql');
const sqlContent = fs.readFileSync(batchFile, 'utf8');

// Split into individual INSERT statements
const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);

console.log(`Found ${statements.length} INSERT statements in CSS batch 1`);

// Execute first 5 statements as a test
const testStatements = statements.slice(0, 5);
console.log('\nFirst 5 statements:');
testStatements.forEach((stmt, index) => {
  console.log(`\nStatement ${index + 1}:`);
  console.log(stmt.trim().substring(0, 200) + '...');
});

console.log('\nReady to execute these statements via Supabase MCP');
