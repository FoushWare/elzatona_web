#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📦 Copying Shared Libraries to Web App...\n');

const projectRoot = process.cwd();
const webAppSrc = path.join(projectRoot, 'apps/web');

// Helper function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`   ⚠️  Source directory ${src} does not exist, skipping...`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📋 Step 1: Copy Shared Components');
console.log('──────────────────────────────────');

// Copy components
const componentsSource = path.join(
  projectRoot,
  'libs/shared/ui/src/components'
);
const componentsDestination = path.join(webAppSrc, 'components');

if (fs.existsSync(componentsSource)) {
  console.log('📁 Copying shared components...');
  copyDir(componentsSource, componentsDestination);
  console.log('✅ Components copied successfully!');
} else {
  console.log('ℹ️  Components already in web app or not found');
}

console.log('');

console.log('📋 Step 2: Copy Shared Hooks');
console.log('──────────────────────────────');

// Copy hooks
const hooksSource = path.join(projectRoot, 'libs/shared/hooks/src');
const hooksDestination = path.join(webAppSrc, 'hooks');

if (fs.existsSync(hooksSource)) {
  console.log('📁 Copying shared hooks...');
  copyDir(hooksSource, hooksDestination);
  console.log('✅ Hooks copied successfully!');
} else {
  console.log('ℹ️  Hooks already in web app or not found');
}

console.log('');

console.log('📋 Step 3: Copy Shared Contexts');
console.log('──────────────────────────────────');

// Copy contexts
const contextsSource = path.join(projectRoot, 'libs/shared/contexts/src');
const contextsDestination = path.join(webAppSrc, 'contexts');

if (fs.existsSync(contextsSource)) {
  console.log('📁 Copying shared contexts...');
  copyDir(contextsSource, contextsDestination);
  console.log('✅ Contexts copied successfully!');
} else {
  console.log('ℹ️  Contexts already in web app or not found');
}

console.log('');

console.log('📋 Step 4: Copy Shared Types');
console.log('─────────────────────────────');

// Copy types
const typesSource = path.join(projectRoot, 'libs/shared/types/src');
const typesDestination = path.join(webAppSrc, 'types');

if (fs.existsSync(typesSource)) {
  console.log('📁 Copying shared types...');
  copyDir(typesSource, typesDestination);
  console.log('✅ Types copied successfully!');
} else {
  console.log('ℹ️  Types already in web app or not found');
}

console.log('');

console.log('📋 Step 5: Copy Firebase Lib');
console.log('────────────────────────────');

// Copy lib (Firebase utilities)
const libSource = path.join(projectRoot, 'libs/data/firebase/src');
const libDestination = path.join(webAppSrc, 'lib');

if (fs.existsSync(libSource)) {
  console.log('📁 Copying Firebase utilities...');
  copyDir(libSource, libDestination);
  console.log('✅ Firebase utilities copied successfully!');
} else {
  console.log('ℹ️  Firebase utilities already in web app or not found');
}

console.log('');

console.log('📋 Step 6: Copy Shared Utils');
console.log('────────────────────────────');

// Copy utils
const utilsSource = path.join(projectRoot, 'libs/shared/utils/src');
const utilsDestination = path.join(webAppSrc, 'utils');

if (fs.existsSync(utilsSource)) {
  console.log('📁 Copying shared utilities...');
  copyDir(utilsSource, utilsDestination);
  console.log('✅ Utilities copied successfully!');
} else {
  console.log('ℹ️  Utilities already in web app or not found');
}

console.log('');

console.log('🎉 Shared Libraries Copy Complete!');
console.log('');
console.log('📊 Summary:');
console.log('   ✅ Components copied to apps/web/components');
console.log('   ✅ Hooks copied to apps/web/hooks');
console.log('   ✅ Contexts copied to apps/web/contexts');
console.log('   ✅ Types copied to apps/web/types');
console.log('   ✅ Firebase utilities copied to apps/web/lib');
console.log('   ✅ Utilities copied to apps/web/utils');
console.log('');
console.log('🚀 Ready to build unified app with all dependencies!');
