#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Skip node_modules and other common directories
      if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
        results = results.concat(findFiles(filePath, extensions));
      }
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });

  return results;
}

// Function to update imports in a file
function updateImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Update imports from @/components/ to @/shared/components/
    const oldImportPattern = /from ['"]@\/components\//g;
    if (oldImportPattern.test(content)) {
      content = content.replace(oldImportPattern, "from '@/shared/components/");
      updated = true;
    }

    // Update relative imports from ../components/ to ../shared/components/
    const relativeImportPattern = /from ['"]\.\.\/components\//g;
    if (relativeImportPattern.test(content)) {
      content = content.replace(
        relativeImportPattern,
        "from '../shared/components/"
      );
      updated = true;
    }

    // Update relative imports from ./components/ to ./shared/components/
    const sameDirImportPattern = /from ['"]\.\/components\//g;
    if (sameDirImportPattern.test(content)) {
      content = content.replace(
        sameDirImportPattern,
        "from './shared/components/"
      );
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔄 Updating component imports...');

const srcDir = path.join(__dirname, '..', 'src');
const files = findFiles(srcDir);

console.log(`Found ${files.length} files to check`);

let updatedCount = 0;
files.forEach(file => {
  const originalContent = fs.readFileSync(file, 'utf8');
  updateImports(file);

  // Check if file was actually updated
  const newContent = fs.readFileSync(file, 'utf8');
  if (originalContent !== newContent) {
    updatedCount++;
  }
});

console.log(`✅ Updated imports in ${updatedCount} files`);
console.log('🎉 Component import update complete!');
