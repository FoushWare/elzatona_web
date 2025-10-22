const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, 'all-html-questions-fixed.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Split into individual INSERT statements
const insertStatements = sqlContent
  .split('INSERT INTO questions')
  .filter(stmt => stmt.trim())
  .map(stmt => 'INSERT INTO questions' + stmt.trim())
  .filter(stmt => stmt.includes('VALUES'));

console.log(`Found ${insertStatements.length} INSERT statements`);

// Execute in batches of 20
const batchSize = 20;
for (let i = 0; i < insertStatements.length; i += batchSize) {
  const batch = insertStatements.slice(i, i + batchSize);
  const batchSql = batch.join(';\n') + ';';

  const batchFile = path.join(
    __dirname,
    `html-batch-${Math.floor(i / batchSize) + 1}.sql`
  );
  fs.writeFileSync(batchFile, batchSql);
  console.log(`Created ${batchFile} with ${batch.length} statements`);
}

console.log('All batches created successfully!');
