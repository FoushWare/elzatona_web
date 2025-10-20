#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing optional chaining syntax errors...');

// Files with specific syntax errors
const filesToFix = [
  'src/lib/admin-auth.ts',
  'src/lib/error-logging-service.ts',
  'src/lib/guided-learning-service.ts',
  'src/lib/notification-service.ts',
  'src/lib/user-auth.ts',
];

let totalFixed = 0;

filesToFix.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  let fileFixed = 0;

  // Fix malformed optional chaining syntax patterns
  const fixes = [
    // Fix: data.lastLogin?, -> data.lastLogin || null,
    {
      pattern: /(\w+\.\w+)\?\s*,/g,
      replacement: '$1 || null,',
    },
    // Fix: data.context.timestamp? || new Date(), -> data.context.timestamp || new Date(),
    {
      pattern: /(\w+\.\w+\.\w+)\?\s*\|\|\s*new\s+Date\(\)/g,
      replacement: '$1 || new Date()',
    },
    // Fix: data.startDate? || new Date(), -> data.startDate || new Date(),
    {
      pattern: /(\w+\.\w+)\?\s*\|\|\s*new\s+Date\(\)/g,
      replacement: '$1 || new Date()',
    },
    // Fix: data.readAt?, -> data.readAt || null,
    {
      pattern: /(\w+\.\w+)\?\s*,/g,
      replacement: '$1 || null,',
    },
    // Fix: data.completionDate?, -> data.completionDate || null,
    {
      pattern: /(\w+\.\w+)\?\s*,/g,
      replacement: '$1 || null,',
    },
  ];

  fixes.forEach(fix => {
    const matches = content.match(fix.pattern);
    if (matches) {
      content = content.replace(fix.pattern, fix.replacement);
      fileFixed += matches.length;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${fileFixed} syntax errors in ${filePath}`);
    totalFixed += fileFixed;
  } else {
    console.log(`ℹ️  No syntax errors found in ${filePath}`);
  }
});

console.log(`\n🎉 Syntax fixing complete! Total fixes: ${totalFixed}`);
