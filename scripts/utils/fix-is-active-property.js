const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../../src/lib/supabase-learning-cards-service.ts'
);

try {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace is_active with isActive in object properties
  content = content.replace(/is_active:/g, 'isActive:');

  // Replace is_active property access with isActive
  content = content.replace(/\.is_active/g, '.isActive');

  fs.writeFileSync(filePath, content);
  console.log(
    '✅ Fixed is_active property references in supabase-learning-cards-service.ts'
  );
} catch (error) {
  console.error('❌ Error fixing is_active properties:', error.message);
}
