const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, 'all-html-questions.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Fix the hints field by replacing '[]' with ARRAY[]::text[]
const fixedContent = sqlContent.replace(/'\[\]'/g, 'ARRAY[]::text[]');

// Write the fixed content
const fixedFile = path.join(__dirname, 'all-html-questions-fixed.sql');
fs.writeFileSync(fixedFile, fixedContent);

console.log('✅ Fixed SQL file generated: all-html-questions-fixed.sql');
console.log('📊 Fixed hints field formatting');
