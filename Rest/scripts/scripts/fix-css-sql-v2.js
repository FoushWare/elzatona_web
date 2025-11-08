const fs = require('fs');
const path = require('path');

function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix test_cases and hints to be JSONB instead of text arrays
  content = content.replace(/ARRAY\[\]::text\[\]/g, 'NULL');

  // Fix tags to be proper JSONB
  content = content.replace(
    /'\["([^"]+)","([^"]+)","([^"]+)"\]'/g,
    '\'["$1","$2","$3"]\''
  );
  content = content.replace(/'\["([^"]+)","([^"]+)"\]'/g, '\'["$1","$2"]\'');
  content = content.replace(/'\["([^"]+)"\]'/g, '\'["$1"]\'');

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
