const fs = require('fs');
const path = require('path');

function fixSqlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix tags to be proper ARRAY format - more specific patterns
  content = content.replace(
    /'\["css","css-fundamentals","beginner"\]'/g,
    "ARRAY['css','css-fundamentals','beginner']::text[]"
  );
  content = content.replace(
    /'\["css","css-fundamentals","intermediate"\]'/g,
    "ARRAY['css','css-fundamentals','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css3-features","intermediate"\]'/g,
    "ARRAY['css','css3-features','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","selectors","intermediate"\]'/g,
    "ARRAY['css','selectors','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","selectors","beginner"\]'/g,
    "ARRAY['css','selectors','beginner']::text[]"
  );
  content = content.replace(
    /'\["css","css-grid","advanced"\]'/g,
    "ARRAY['css','css-grid','advanced']::text[]"
  );
  content = content.replace(
    /'\["css","css-flexbox","intermediate"\]'/g,
    "ARRAY['css','css-flexbox','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css-layout","intermediate"\]'/g,
    "ARRAY['css','css-layout','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css-methodologies","intermediate"\]'/g,
    "ARRAY['css','css-methodologies','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css-performance","intermediate"\]'/g,
    "ARRAY['css','css-performance','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css-animations","intermediate"\]'/g,
    "ARRAY['css','css-animations','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css-box-model","intermediate"\]'/g,
    "ARRAY['css','css-box-model','intermediate']::text[]"
  );
  content = content.replace(
    /'\["css","css-positioning","advanced"\]'/g,
    "ARRAY['css','css-positioning','advanced']::text[]"
  );
  content = content.replace(
    /'\["css","css-positioning","intermediate"\]'/g,
    "ARRAY['css','css-positioning','intermediate']::text[]"
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
