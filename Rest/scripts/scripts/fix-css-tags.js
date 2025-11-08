const fs = require('fs');
const path = require('path');

function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

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
