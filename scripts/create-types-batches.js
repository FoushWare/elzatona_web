const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, 'fix-question-types-and-options.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Split into individual UPDATE statements
const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);

console.log(`Found ${statements.length} UPDATE statements to execute`);

// Process in batches of 20
const batchSize = 20;
const batches = [];

for (let i = 0; i < statements.length; i += batchSize) {
  const batch = statements.slice(i, i + batchSize);
  batches.push(batch);
}

console.log(`Created ${batches.length} batches`);

// Write batch files
for (let i = 0; i < batches.length; i++) {
  const batchFile = path.join(__dirname, `fix-types-batch-${i + 1}.sql`);
  const batchContent = batches[i].join(';\n\n') + ';';
  fs.writeFileSync(batchFile, batchContent);
  console.log(`Created batch ${i + 1}: ${batches[i].length} statements`);
}

console.log(
  `\nAll batch files created! Execute them using Supabase MCP tools.`
);
