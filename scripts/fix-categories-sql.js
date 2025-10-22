const fs = require('fs');
const path = require('path');

// Fix SQL files to use proper PostgreSQL array syntax
function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix hints array syntax
  content = content.replace(/ARRAY\[\]::text\[\]/g, "'[]'");

  // Fix tags array syntax - convert JSON strings to proper PostgreSQL arrays
  content = content.replace(/'\["([^"]+)"\]'/g, "ARRAY['$1']::text[]");
  content = content.replace(
    /'\["([^"]+)","([^"]+)"\]'/g,
    "ARRAY['$1','$2']::text[]"
  );
  content = content.replace(
    /'\["([^"]+)","([^"]+)","([^"]+)"\]'/g,
    "ARRAY['$1','$2','$3']::text[]"
  );

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

// Fix all batch files
const scriptsDir = path.join(__dirname);
const batchFiles = fs
  .readdirSync(scriptsDir)
  .filter(
    file => file.startsWith('seed-categories-batch-') && file.endsWith('.sql')
  )
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
  });

batchFiles.forEach(file => {
  fixSqlFile(path.join(scriptsDir, file));
});

console.log('All SQL batch files fixed!');
