const fs = require('fs');
const path = require('path');

function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix test_cases to be JSONB (NULL for empty)
  content = content.replace(/ARRAY\[\]::text\[\]/g, 'NULL');

  // Fix hints to be ARRAY[]::text[] for empty arrays
  content = content.replace(/NULL/g, 'ARRAY[]::text[]');

  // Fix tags to be proper ARRAY format
  content = content.replace(
    /'\["([^"]+)","([^"]+)","([^"]+)"\]'/g,
    "ARRAY['$1','$2','$3']::text[]"
  );
  content = content.replace(
    /'\["([^"]+)","([^"]+)"\]'/g,
    "ARRAY['$1','$2']::text[]"
  );
  content = content.replace(/'\["([^"]+)"\]'/g, "ARRAY['$1']::text[]");

  // Fix hints to be NULL for empty arrays
  content = content.replace(/ARRAY\[\]::text\[\]/g, 'NULL');

  // Fix tags to be proper ARRAY format (keep as ARRAY)
  content = content.replace(
    /ARRAY\['css','css-fundamentals','beginner'\]::text\[\]/g,
    "ARRAY['css','css-fundamentals','beginner']::text[]"
  );

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

// Fix all CSS batch files
const scriptsDir = path.join(__dirname, 'css-batches');
const batchFiles = fs
  .readdirSync(scriptsDir)
  .filter(file => file.startsWith('css-batch-') && file.endsWith('.sql'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
  });

batchFiles.forEach(file => {
  fixSqlFile(path.join(scriptsDir, file));
});

console.log('All CSS SQL batch files fixed!');
