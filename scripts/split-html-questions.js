const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, 'all-html-questions-fixed.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Extract the VALUES part
const valuesMatch = sqlContent.match(/VALUES\s*(.+);/s);
if (!valuesMatch) {
  console.error('Could not find VALUES in SQL');
  process.exit(1);
}

const valuesContent = valuesMatch[1];
console.log('Values content length:', valuesContent.length);

// Split by individual question records (each starts with '(')
const questionRecords = valuesContent
  .split(/,\s*\(/)
  .map((record, index) => {
    if (index === 0) {
      return record.trim();
    } else {
      return '(' + record.trim();
    }
  })
  .filter(record => record.trim() && record.includes('html-'));

console.log(`Found ${questionRecords.length} question records`);

// Create batches of 10 questions each
const batchSize = 10;
for (let i = 0; i < questionRecords.length; i += batchSize) {
  const batch = questionRecords.slice(i, i + batchSize);
  const batchValues = batch.join(',\n');

  const batchSql = `INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
${batchValues};`;

  const batchFile = path.join(
    __dirname,
    `html-batch-${Math.floor(i / batchSize) + 1}.sql`
  );
  fs.writeFileSync(batchFile, batchSql);
  console.log(`Created ${batchFile} with ${batch.length} questions`);
}

console.log('All batches created successfully!');
