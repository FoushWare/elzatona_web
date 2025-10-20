#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// Patterns to match different Firebase imports
const firebasePatterns = [
  // Firebase server imports
  /import\s+\{([^}]+)\}\s+from\s+['"]@\/lib\/firebase-server['"];?/g,
  /import\s+\{([^}]+)\}\s+from\s+['"]\.\/firebase-server['"];?/g,

  // Firebase client imports
  /import\s+\{([^}]+)\}\s+from\s+['"]@\/lib\/firebase['"];?/g,
  /import\s+\{([^}]+)\}\s+from\s+['"]\.\/firebase['"];?/g,

  // Firebase Firestore imports
  /import\s+\{([^}]+)\}\s+from\s+['"]firebase\/firestore['"];?/g,

  // Firebase Admin imports
  /import\s+\{([^}]+)\}\s+from\s+['"]firebase-admin\/auth['"];?/g,
  /import\s+\{([^}]+)\}\s+from\s+['"]firebase-admin\/app['"];?/g,

  // Firebase Auth Context imports
  /import\s+\{([^}]+)\}\s+from\s+['"]@\/contexts\/FirebaseAuthContext['"];?/g,
];

// Supabase imports and initialization
const supabaseImport = `import { createClient } from '@supabase/supabase-js';`;
const supabaseClientInit = `
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
`;

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  let originalContent = content;
  let hasChanges = false;

  // Check if Supabase client is already imported and initialized
  const hasSupabaseImport = content.includes(supabaseImport);
  const hasSupabaseInit = content.includes(
    'createClient(supabaseUrl, supabaseServiceRoleKey)'
  );

  // 1. Remove all Firebase imports
  for (const pattern of firebasePatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, '');
      hasChanges = true;
    }
  }

  // 2. Add Supabase import and initialization if not already present
  if (
    !hasSupabaseImport &&
    (content.includes('NextRequest') || content.includes('NextResponse'))
  ) {
    // For API routes, add Supabase import after Next.js imports
    content = content.replace(
      /import\s+\{NextRequest,\s*NextResponse\}\s+from\s+['"]next\/server['"];/,
      `import { NextRequest, NextResponse } from 'next/server';\n${supabaseImport}`
    );
    hasChanges = true;
  } else if (!hasSupabaseImport && content.includes('React')) {
    // For React components, add Supabase import after React imports
    content = content.replace(
      /import\s+React[^;]+;/,
      `import React from 'react';\n${supabaseImport}`
    );
    hasChanges = true;
  }

  if (!hasSupabaseInit && hasChanges) {
    content = content.replace(
      supabaseImport,
      `${supabaseImport}\n${supabaseClientInit}`
    );
  }

  // 3. Remove Firebase-specific logic
  content = content.replace(
    /if\s*\(!db\)\s*\{\s*throw\s*new\s*Error\(['"]Firebase not initialized['"]\);\s*\}/g,
    ''
  );
  content = content.replace(
    /if\s*\(!db\)\s*\{\s*return\s*NextResponse\.json\(\s*\{\s*success:\s*false,\s*error:\s*['"]Database not initialized['"]\s*\},\s*\{\s*status:\s*500\s*\}\s*\);\s*\}/g,
    ''
  );

  // 4. Remove Firebase app initialization
  content = content.replace(
    /const\s+db\s*=\s*app\s*\?\s*getFirestore\(app\)\s*:\s*null;?/g,
    ''
  );
  content = content.replace(/const\s+app\s*=\s*[^;]+;?/g, '');

  if (content !== originalContent) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${path.relative(projectRoot, filePath)}`);
    return true;
  }
  return false;
}

async function processDirectory(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  let fixedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      fixedCount += await processDirectory(fullPath);
    } else if (
      file.isFile() &&
      (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))
    ) {
      if (await fixFile(fullPath)) {
        fixedCount++;
      }
    }
  }
  return fixedCount;
}

async function main() {
  console.log('🔧 Fixing ALL Firebase import errors...\n');

  // Process all TypeScript files in src directory
  const srcDir = path.join(projectRoot, 'src');
  const fixedCount = await processDirectory(srcDir);

  console.log('\n📊 Summary:');
  console.log(`✅ Files fixed: ${fixedCount}`);
  console.log(`📁 Total processed: All TypeScript files in src/`);

  console.log('\n🎉 All Firebase import fixes completed!');

  console.log('\n📋 Next steps:');
  console.log("1. Run 'npm run build:check' to verify fixes");
  console.log(
    '2. Update components to use Supabase auth instead of Firebase auth'
  );
  console.log('3. Test the updated API routes and components');
}

main().catch(console.error);
