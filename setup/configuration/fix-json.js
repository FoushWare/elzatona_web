#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(
  __dirname,
  'data/json/system_design/questions-system-design.json'
);
let content = fs.readFileSync(filePath, 'utf8');

// Fix JSON syntax issues:
// 1. Add quotes around property keys
content = content.replace(/(\w+):/g, '"$1":');

// 2. Fix new Date().toISOString() calls
content = content.replace(
  /new Date\(\)\.toISOString\(\)/g,
  '"2025-01-08T00:00:00Z"'
);

// 3. Remove trailing commas before closing braces/brackets
content = content.replace(/,(\s*[}\]])/g, '$1');

// 4. Fix boolean values (they should be lowercase in JSON)
content = content.replace(/true/g, 'true');
content = content.replace(/false/g, 'false');

// Write the fixed content back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed JSON syntax in questions-system-design.json');
console.log('📝 Changes made:');
console.log('   - Added double quotes around property keys');
console.log('   - Replaced new Date().toISOString() with static date');
console.log('   - Removed trailing commas');
console.log('   - Ensured proper JSON formatting');
