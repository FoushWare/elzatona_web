#!/usr/bin/env node

/**
 * Project Cleanup Script
 * 
 * This script helps maintain a clean project structure by:
 * - Removing temporary files
 * - Cleaning build artifacts
 * - Organizing files
 * - Checking for unused dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Starting project cleanup...\n');

// Function to safely remove files/directories
function safeRemove(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
        console.log(`  🗑️  Removed directory: ${filePath}`);
      } else {
        fs.unlinkSync(filePath);
        console.log(`  🗑️  Removed file: ${filePath}`);
      }
    }
  } catch (error) {
    console.log(`  ⚠️  Could not remove ${filePath}: ${error.message}`);
  }
}

// Function to find files by pattern
function findFiles(pattern, directory = '.') {
  try {
    const result = execSync(`find ${directory} -name "${pattern}" -type f 2>/dev/null`, { encoding: 'utf8' });
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

// 1. Clean temporary files
console.log('📁 Cleaning temporary files...');
const tempFiles = [
  '*.tmp',
  '*.temp',
  '*.backup',
  '*.bak',
  '*.old',
  '*.orig',
  '*.log',
  '*.cache'
];

tempFiles.forEach(pattern => {
  const files = findFiles(pattern);
  files.forEach(file => {
    if (!file.includes('node_modules') && !file.includes('.git')) {
      safeRemove(file);
    }
  });
});

// 2. Clean build artifacts
console.log('\n🏗️  Cleaning build artifacts...');
const buildDirs = [
  '.next',
  'build',
  'dist',
  'out',
  'coverage',
  'test-results',
  'storybook-static'
];

buildDirs.forEach(dir => {
  safeRemove(dir);
});

// 3. Clean cache directories
console.log('\n💾 Cleaning cache directories...');
const cacheDirs = [
  '.cache',
  '.parcel-cache',
  '.eslintcache',
  '.npm',
  'node_modules/.cache'
];

cacheDirs.forEach(dir => {
  safeRemove(dir);
});

// 4. Clean OS generated files
console.log('\n🖥️  Cleaning OS generated files...');
const osFiles = [
  '.DS_Store',
  'Thumbs.db',
  'ehthumbs.db',
  '*.swp',
  '*.swo',
  '*~'
];

osFiles.forEach(pattern => {
  const files = findFiles(pattern);
  files.forEach(file => {
    safeRemove(file);
  });
});

// 5. Check for large files that might be accidentally committed
console.log('\n📊 Checking for large files...');
try {
  const largeFiles = execSync('find . -type f -size +10M -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null', { encoding: 'utf8' });
  if (largeFiles.trim()) {
    console.log('  ⚠️  Large files found:');
    largeFiles.trim().split('\n').forEach(file => {
      if (file) {
        const size = execSync(`du -h "${file}" | cut -f1`, { encoding: 'utf8' }).trim();
        console.log(`    ${file} (${size})`);
      }
    });
  } else {
    console.log('  ✅ No large files found');
  }
} catch (error) {
  console.log('  ℹ️  Could not check for large files');
}

// 6. Check for unused dependencies
console.log('\n📦 Checking for unused dependencies...');
try {
  execSync('npx depcheck --json > temp/depcheck.json 2>/dev/null', { stdio: 'ignore' });
  const depcheck = JSON.parse(fs.readFileSync('temp/depcheck.json', 'utf8'));
  
  if (depcheck.dependencies && depcheck.dependencies.length > 0) {
    console.log('  ⚠️  Potentially unused dependencies:');
    depcheck.dependencies.forEach(dep => {
      console.log(`    - ${dep}`);
    });
  }
  
  if (depcheck.devDependencies && depcheck.devDependencies.length > 0) {
    console.log('  ⚠️  Potentially unused dev dependencies:');
    depcheck.devDependencies.forEach(dep => {
      console.log(`    - ${dep}`);
    });
  }
  
  if ((!depcheck.dependencies || depcheck.dependencies.length === 0) && 
      (!depcheck.devDependencies || depcheck.devDependencies.length === 0)) {
    console.log('  ✅ No unused dependencies found');
  }
  
  safeRemove('temp/depcheck.json');
} catch (error) {
  console.log('  ℹ️  Could not check dependencies (depcheck not available)');
}

// 7. Clean up empty directories
console.log('\n📂 Cleaning empty directories...');
try {
  execSync('find . -type d -empty -not -path "./node_modules/*" -not -path "./.git/*" -delete 2>/dev/null', { stdio: 'ignore' });
  console.log('  ✅ Empty directories cleaned');
} catch (error) {
  console.log('  ℹ️  Could not clean empty directories');
}

console.log('\n✨ Project cleanup completed!');
console.log('\n💡 Next steps:');
console.log('  - Review any warnings above');
console.log('  - Run "npm install" if needed');
console.log('  - Run "npm run build" to test');
console.log('  - Commit changes if everything looks good');
