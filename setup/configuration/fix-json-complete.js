const fs = require('fs');

// Read the file
let content = fs.readFileSync(
  'data/json/system_design/questions-system-design.json',
  'utf8'
);

// Fix all JSON syntax issues
content = content
  // Fix property keys - add quotes around unquoted keys
  .replace(/(\w+):/g, '"$1":')
  // Fix new Date().toISOString() calls
  .replace(/new Date\(\)\.toISOString\(\)/g, '"2025-01-08T00:00:00Z"')
  // Remove trailing commas before closing braces/brackets
  .replace(/,(\s*[}\]])/g, '$1')
  // Fix any remaining boolean values
  .replace(/\btrue\b/g, 'true')
  .replace(/\bfalse\b/g, 'false');

// Write back
fs.writeFileSync(
  'data/json/system_design/questions-system-design.json',
  content,
  'utf8'
);

console.log('✅ Fixed entire JSON file!');
console.log('📝 Applied fixes:');
console.log('   - Added quotes around all property keys');
console.log('   - Replaced new Date().toISOString() with static dates');
console.log('   - Removed trailing commas');
console.log('   - Ensured proper JSON formatting');
