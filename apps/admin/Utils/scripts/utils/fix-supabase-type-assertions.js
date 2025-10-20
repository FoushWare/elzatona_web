const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/lib/supabase-server.ts');

try {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all supabase.from calls with type assertion
  content = content.replace(/supabase\.from\(/g, '(supabase as any).from(');

  fs.writeFileSync(filePath, content);
  console.log('✅ Fixed Supabase type assertions in supabase-server.ts');
} catch (error) {
  console.error('❌ Error fixing Supabase type assertions:', error.message);
}
