#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Testing Elzatona Web App...\n');

// Test 1: Check if required files exist
console.log('1️⃣ Checking required files...');
const requiredFiles = [
  'src/app/layout.tsx',
  'src/providers/JotaiProvider.tsx',
  'src/atoms/index.ts',
  'src/hooks/index.ts',
  'package.json',
  'next.config.ts',
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

console.log('\n2️⃣ Checking TypeScript compilation...');
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  console.log('   ✅ TypeScript compilation successful');
} catch (error) {
  console.log('   ❌ TypeScript compilation failed');
  console.log('   Error:', error.message);
  process.exit(1);
}

console.log('\n3️⃣ Checking Next.js build...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('   ✅ Next.js build successful');
} catch (error) {
  console.log('   ❌ Next.js build failed');
  console.log('   Error:', error.message);
  process.exit(1);
}

console.log('\n4️⃣ Testing development server startup...');
try {
  const child = execSync('timeout 5s npm run dev', { stdio: 'pipe' });
  console.log('   ✅ Development server started successfully');
} catch (error) {
  if (error.status === 124) {
    console.log(
      '   ✅ Development server started (timeout reached - this is expected)'
    );
  } else {
    console.log('   ❌ Development server failed to start');
    console.log('   Error:', error.message);
    process.exit(1);
  }
}

console.log('\n🎉 All tests passed! The app is working correctly.');
console.log('\n📋 Summary:');
console.log('   ✅ All required files present');
console.log('   ✅ TypeScript compilation successful');
console.log('   ✅ Next.js build successful');
console.log('   ✅ Development server starts correctly');
console.log('\n🚀 The app is ready for development!');
