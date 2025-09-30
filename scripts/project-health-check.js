#!/usr/bin/env node

/**
 * Project Health Check Script
 * 
 * This script performs various health checks on the project:
 * - File organization
 * - Dependencies
 * - Build status
 * - Code quality
 * - Security
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏥 Starting project health check...\n');

let issues = [];
let warnings = [];

// Helper function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Helper function to check if directory exists
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

// Helper function to get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

// 1. Check project structure
console.log('📁 Checking project structure...');

const requiredDirs = [
  'src',
  'public',
  'config',
  'docs',
  'scripts',
  'tests',
  'temp',
  'reports'
];

requiredDirs.forEach(dir => {
  if (dirExists(dir)) {
    console.log(`  ✅ ${dir}/ directory exists`);
  } else {
    issues.push(`Missing required directory: ${dir}/`);
  }
});

// 2. Check configuration files
console.log('\n⚙️  Checking configuration files...');

const configFiles = [
  'package.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'next.config.ts',
  'eslint.config.mjs'
];

configFiles.forEach(file => {
  if (fileExists(file)) {
    console.log(`  ✅ ${file} exists`);
  } else {
    issues.push(`Missing configuration file: ${file}`);
  }
});

// 3. Check for duplicate configs
console.log('\n🔍 Checking for duplicate configurations...');

const duplicateChecks = [
  { files: ['next.config.js', 'next.config.ts'], keep: 'next.config.ts' },
  { files: ['postcss.config.js', 'postcss.config.mjs'], keep: 'postcss.config.js' }
];

duplicateChecks.forEach(({ files, keep }) => {
  const existing = files.filter(file => fileExists(file));
  if (existing.length > 1) {
    warnings.push(`Multiple config files found: ${existing.join(', ')}. Consider keeping only ${keep}`);
  }
});

// 4. Check package.json health
console.log('\n📦 Checking package.json...');

if (fileExists('package.json')) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check for required fields
    const requiredFields = ['name', 'version', 'scripts', 'dependencies'];
    requiredFields.forEach(field => {
      if (packageJson[field]) {
        console.log(`  ✅ ${field} field present`);
      } else {
        issues.push(`Missing required field in package.json: ${field}`);
      }
    });
    
    // Check for scripts
    const requiredScripts = ['dev', 'build', 'start'];
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(`  ✅ ${script} script present`);
      } else {
        issues.push(`Missing required script: ${script}`);
      }
    });
    
    // Check for security vulnerabilities
    console.log('  🔒 Checking for security vulnerabilities...');
    try {
      execSync('npm audit --audit-level=moderate --json > temp/audit.json 2>/dev/null', { stdio: 'ignore' });
      const audit = JSON.parse(fs.readFileSync('temp/audit.json', 'utf8'));
      
      if (audit.vulnerabilities) {
        const vulnCount = Object.keys(audit.vulnerabilities).length;
        if (vulnCount > 0) {
          warnings.push(`${vulnCount} security vulnerabilities found. Run 'npm audit fix' to resolve.`);
        } else {
          console.log('    ✅ No security vulnerabilities found');
        }
      }
      
      safeRemove('temp/audit.json');
    } catch (error) {
      console.log('    ℹ️  Could not check security vulnerabilities');
    }
    
  } catch (error) {
    issues.push('Invalid package.json format');
  }
}

// 5. Check for large files
console.log('\n📊 Checking for large files...');

try {
  const largeFiles = execSync('find . -type f -size +5M -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null', { encoding: 'utf8' });
  if (largeFiles.trim()) {
    const files = largeFiles.trim().split('\n').filter(Boolean);
    files.forEach(file => {
      const size = execSync(`du -h "${file}" | cut -f1`, { encoding: 'utf8' }).trim();
      warnings.push(`Large file: ${file} (${size})`);
    });
  } else {
    console.log('  ✅ No large files found');
  }
} catch (error) {
  console.log('  ℹ️  Could not check for large files');
}

// 6. Check for test coverage
console.log('\n🧪 Checking test setup...');

if (fileExists('jest.config.js') || fileExists('vitest.config.ts')) {
  console.log('  ✅ Test configuration found');
} else {
  warnings.push('No test configuration found');
}

if (dirExists('tests') || dirExists('__tests__')) {
  console.log('  ✅ Test directory found');
} else {
  warnings.push('No test directory found');
}

// 7. Check for documentation
console.log('\n📚 Checking documentation...');

const docFiles = [
  'README.md',
  'docs/',
  'CONTRIBUTING.md',
  'CHANGELOG.md'
];

docFiles.forEach(doc => {
  if (fileExists(doc) || dirExists(doc)) {
    console.log(`  ✅ ${doc} exists`);
  } else {
    warnings.push(`Missing documentation: ${doc}`);
  }
});

// 8. Check for environment files
console.log('\n🔐 Checking environment configuration...');

const envFiles = ['.env.local', '.env.example'];
envFiles.forEach(env => {
  if (fileExists(env)) {
    console.log(`  ✅ ${env} exists`);
  } else {
    warnings.push(`Missing environment file: ${env}`);
  }
});

// 9. Check for git hooks
console.log('\n🪝 Checking git hooks...');

if (dirExists('.husky')) {
  console.log('  ✅ Husky git hooks configured');
} else {
  warnings.push('No git hooks configured');
}

// Helper function to safely remove files
function safeRemove(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    // Ignore errors
  }
}

// Summary
console.log('\n📋 Health Check Summary:');
console.log(`  Issues: ${issues.length}`);
console.log(`  Warnings: ${warnings.length}`);

if (issues.length > 0) {
  console.log('\n❌ Issues that need attention:');
  issues.forEach(issue => {
    console.log(`  - ${issue}`);
  });
}

if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  warnings.forEach(warning => {
    console.log(`  - ${warning}`);
  });
}

if (issues.length === 0 && warnings.length === 0) {
  console.log('\n🎉 Project is in excellent health!');
} else if (issues.length === 0) {
  console.log('\n✅ Project is healthy with some minor warnings');
} else {
  console.log('\n🔧 Project needs attention');
}

console.log('\n💡 Recommendations:');
console.log('  - Run "npm run build" to test build process');
console.log('  - Run "npm test" to run tests');
console.log('  - Run "npm run lint" to check code quality');
console.log('  - Review and address any issues above');
