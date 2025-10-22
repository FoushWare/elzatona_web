const fs = require('fs');
const path = require('path');

// Fix SQL files to use proper PostgreSQL array syntax
function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix tags array syntax
  content = content.replace(
    /'\["([^"]+)","([^"]+)","([^"]+)"\]'/g,
    "ARRAY['$1','$2','$3']::text[]"
  );
  content = content.replace(
    /'\["([^"]+)","([^"]+)"\]'/g,
    "ARRAY['$1','$2']::text[]"
  );
  content = content.replace(/'\["([^"]+)"\]'/g, "ARRAY['$1']::text[]");

  // Fix hints array syntax (already correct as ARRAY[]::text[])
  // Fix test_cases array syntax
  content = content.replace(/'\[\]'/g, 'ARRAY[]::text[]');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

// Fix all batch files
const scriptsDir = path.join(__dirname);
const batchFiles = fs
  .readdirSync(scriptsDir)
  .filter(file => file.startsWith('questions-batch-') && file.endsWith('.sql'))
  .sort((a, b) => {
    const aNum = parseInt(a.match(/questions-batch-(\d+)\.sql/)[1]);
    const bNum = parseInt(b.match(/questions-batch-(\d+)\.sql/)[1]);
    return aNum - bNum;
  });

console.log(`Found ${batchFiles.length} batch files to fix`);

for (const batchFile of batchFiles) {
  const batchPath = path.join(scriptsDir, batchFile);
  fixSqlFile(batchPath);
}

console.log('All batch files have been fixed!');
