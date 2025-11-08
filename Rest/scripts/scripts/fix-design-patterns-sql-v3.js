const fs = require('fs');
const path = require('path');

function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix test_cases: change ARRAY[]::text[] to NULL
  content = content.replace(
    /test_cases, ARRAY\[\]::text\[\]/g,
    'test_cases, NULL'
  );
  content = content.replace(
    /test_cases, ARRAY\[(.*?)\]::text\[\]/g,
    (match, p1) => {
      if (p1.trim() === '') {
        return 'test_cases, NULL';
      }
      return match;
    }
  );

  // Fix hints: if it's ARRAY[]::text[], change to NULL
  content = content.replace(/hints, ARRAY\[\]::text\[\]/g, 'hints, NULL');
  content = content.replace(/hints, ARRAY\[(.*?)\]::text\[\]/g, (match, p1) => {
    if (p1.trim() === '') {
      return 'hints, NULL';
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

const scriptsDir = path.join(__dirname, 'design-patterns-batches');
const batchFiles = fs
  .readdirSync(scriptsDir)
  .filter(
    file => file.startsWith('design-patterns-batch-') && file.endsWith('.sql')
  )
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
  });

batchFiles.forEach(file => {
  fixSqlFile(path.join(scriptsDir, file));
});

console.log('All Design Patterns SQL batch files fixed!');
