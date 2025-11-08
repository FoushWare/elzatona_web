const fs = require('fs');
const path = require('path');

function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix tags array syntax: '["item1","item2"]' to ARRAY['item1','item2']::text[]
  content = content.replace(
    /'\[\"([^\"]*?)\"(?:,\"([^\"]*?)\")*\]'/g,
    match => {
      const innerContent = match.substring(2, match.length - 2);
      const items = innerContent
        .split('","')
        .map(item => `'${item.replace(/'/g, "''")}'`);
      return `ARRAY[${items.join(',')}]::text[]`;
    }
  );

  // Fix empty array syntax '[]' to ARRAY[]::text[]
  content = content.replace(/'\[\]'/g, 'ARRAY[]::text[]');

  // Fix test_cases: change ARRAY[]::jsonb[] to NULL
  content = content.replace(
    /test_cases, ARRAY\[\]::jsonb\[\]/g,
    'test_cases, NULL'
  );
  content = content.replace(
    /test_cases, ARRAY\[(.*?)\]::jsonb\[\]/g,
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

const scriptsDir = path.join(__dirname, 'nextjs-batches');
const batchFiles = fs
  .readdirSync(scriptsDir)
  .filter(file => file.startsWith('nextjs-batch-') && file.endsWith('.sql'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
  });

batchFiles.forEach(file => {
  fixSqlFile(path.join(scriptsDir, file));
});

console.log('All Next.js SQL batch files fixed!');
