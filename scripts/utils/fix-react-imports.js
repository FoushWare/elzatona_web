#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing missing React imports...');

function findTsxFiles(dir) {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findTsxFiles(fullPath));
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return files;
}

function fixReactImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if file uses React hooks but doesn't import them
    const usesUseState = content.includes('useState(');
    const usesUseEffect = content.includes('useEffect(');
    const usesUseMemo = content.includes('useMemo(');
    const usesUseCallback = content.includes('useCallback(');
    const usesSuspense = content.includes('<Suspense');
    const usesComponent = content.includes('extends Component');
    const usesReactNode = content.includes('ReactNode');
    const usesErrorInfo = content.includes('ErrorInfo');

    if (
      usesUseState ||
      usesUseEffect ||
      usesUseMemo ||
      usesUseCallback ||
      usesSuspense ||
      usesComponent ||
      usesReactNode ||
      usesErrorInfo
    ) {
      // Check if React is imported
      const hasReactImport = content.includes("import React from 'react'");
      const hasReactImportWithHooks = content.includes('import React, {');

      if (hasReactImport && !hasReactImportWithHooks) {
        console.log(`  📝 Fixing React imports in ${path.basename(filePath)}`);

        // Build the import statement
        const hooks = [];
        if (usesUseState) hooks.push('useState');
        if (usesUseEffect) hooks.push('useEffect');
        if (usesUseMemo) hooks.push('useMemo');
        if (usesUseCallback) hooks.push('useCallback');
        if (usesSuspense) hooks.push('Suspense');
        if (usesComponent) hooks.push('Component');
        if (usesReactNode) hooks.push('ReactNode');
        if (usesErrorInfo) hooks.push('ErrorInfo');

        const importStatement = `import React, { ${hooks.join(', ')} } from 'react';`;

        // Replace the import
        content = content.replace(
          "import React from 'react';",
          importStatement
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Find all TSX/TS files
const srcDir = path.join(process.cwd(), 'src');
const files = findTsxFiles(srcDir);

console.log(`Found ${files.length} TSX/TS files to check`);

let fixedCount = 0;

files.forEach(filePath => {
  if (fixReactImports(filePath)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
console.log('🎉 React imports fix complete!');
