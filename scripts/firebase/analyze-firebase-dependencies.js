#!/usr/bin/env node

/**
 * Firebase Dependency Analyzer
 * Analyzes Firebase usage across the project and provides removal recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

// Firebase import patterns to detect
const firebasePatterns = [
  /from\s+['"]firebase\//,
  /from\s+['"]@\/lib\/firebase/,
  /from\s+['"]@\/lib\/firebase-/,
  /import.*firebase/,
  /require\(['"]firebase/,
  /require\(['"]@\/lib\/firebase/,
];

// Files to analyze
const directoriesToScan = [
  'src/app/api',
  'src/lib',
  'src/hooks',
  'src/contexts',
  'src/shared/components',
  'src/atoms',
];

function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}:`, error.message);
  }

  return files;
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(projectRoot, filePath);

    const firebaseImports = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      firebasePatterns.forEach(pattern => {
        if (pattern.test(line)) {
          firebaseImports.push({
            line: index + 1,
            content: line.trim(),
            file: relativePath,
          });
        }
      });
    });

    return {
      file: relativePath,
      hasFirebase: firebaseImports.length > 0,
      imports: firebaseImports,
      lineCount: lines.length,
    };
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}:`, error.message);
    return {
      file: path.relative(projectRoot, filePath),
      hasFirebase: false,
      imports: [],
      lineCount: 0,
      error: error.message,
    };
  }
}

function categorizeFiles(analysisResults) {
  const categories = {
    apiRoutes: [],
    libServices: [],
    hooks: [],
    contexts: [],
    components: [],
    other: [],
  };

  analysisResults.forEach(result => {
    const file = result.file;

    if (file.includes('/api/')) {
      categories.apiRoutes.push(result);
    } else if (file.includes('/lib/')) {
      categories.libServices.push(result);
    } else if (file.includes('/hooks/')) {
      categories.hooks.push(result);
    } else if (file.includes('/contexts/')) {
      categories.contexts.push(result);
    } else if (file.includes('/components/')) {
      categories.components.push(result);
    } else {
      categories.other.push(result);
    }
  });

  return categories;
}

function generateRemovalPlan(categories) {
  const plan = {
    priority: {
      high: [],
      medium: [],
      low: [],
    },
    recommendations: [],
  };

  // High priority: Core Firebase files
  categories.libServices.forEach(result => {
    if (result.file.includes('firebase') && result.hasFirebase) {
      plan.priority.high.push({
        file: result.file,
        action: 'DELETE',
        reason: 'Core Firebase configuration file',
        imports: result.imports.length,
      });
    }
  });

  // High priority: Auth context
  categories.contexts.forEach(result => {
    if (result.hasFirebase) {
      plan.priority.high.push({
        file: result.file,
        action: 'REPLACE',
        reason: 'Authentication context - needs Supabase replacement',
        imports: result.imports.length,
      });
    }
  });

  // Medium priority: API routes
  categories.apiRoutes.forEach(result => {
    if (result.hasFirebase) {
      plan.priority.medium.push({
        file: result.file,
        action: 'UPDATE',
        reason: 'API route using Firebase - convert to Supabase',
        imports: result.imports.length,
      });
    }
  });

  // Medium priority: Hooks
  categories.hooks.forEach(result => {
    if (result.hasFirebase) {
      plan.priority.medium.push({
        file: result.file,
        action: 'REPLACE',
        reason: 'Firebase hook - needs Supabase replacement',
        imports: result.imports.length,
      });
    }
  });

  // Low priority: Components
  categories.components.forEach(result => {
    if (result.hasFirebase) {
      plan.priority.low.push({
        file: result.file,
        action: 'UPDATE',
        reason: 'Component using Firebase - update to Supabase',
        imports: result.imports.length,
      });
    }
  });

  return plan;
}

function main() {
  console.log('🔍 Analyzing Firebase Dependencies...\n');

  const allFiles = [];
  directoriesToScan.forEach(dir => {
    const fullDir = path.join(projectRoot, dir);
    if (fs.existsSync(fullDir)) {
      allFiles.push(...findFiles(fullDir));
    }
  });

  console.log(`📁 Found ${allFiles.length} files to analyze\n`);

  const analysisResults = allFiles.map(analyzeFile);
  const firebaseFiles = analysisResults.filter(result => result.hasFirebase);

  console.log(
    `🔥 Found ${firebaseFiles.length} files with Firebase dependencies\n`
  );

  const categories = categorizeFiles(firebaseFiles);
  const plan = generateRemovalPlan(categories);

  console.log('📊 Firebase Usage by Category:');
  console.log(`  API Routes: ${categories.apiRoutes.length}`);
  console.log(`  Library Services: ${categories.libServices.length}`);
  console.log(`  Hooks: ${categories.hooks.length}`);
  console.log(`  Contexts: ${categories.contexts.length}`);
  console.log(`  Components: ${categories.components.length}`);
  console.log(`  Other: ${categories.other.length}\n`);

  console.log('🎯 Removal Plan by Priority:\n');

  console.log('🔴 HIGH PRIORITY (Core Infrastructure):');
  plan.priority.high.forEach(item => {
    console.log(`  ${item.action}: ${item.file}`);
    console.log(`    Reason: ${item.reason}`);
    console.log(`    Firebase imports: ${item.imports}\n`);
  });

  console.log('🟡 MEDIUM PRIORITY (API & Hooks):');
  plan.priority.medium.forEach(item => {
    console.log(`  ${item.action}: ${item.file}`);
    console.log(`    Reason: ${item.reason}`);
    console.log(`    Firebase imports: ${item.imports}\n`);
  });

  console.log('🟢 LOW PRIORITY (Components):');
  plan.priority.low.forEach(item => {
    console.log(`  ${item.action}: ${item.file}`);
    console.log(`    Reason: ${item.reason}`);
    console.log(`    Firebase imports: ${item.imports}\n`);
  });

  console.log('📋 Summary:');
  console.log(`  Total files with Firebase: ${firebaseFiles.length}`);
  console.log(`  High priority: ${plan.priority.high.length}`);
  console.log(`  Medium priority: ${plan.priority.medium.length}`);
  console.log(`  Low priority: ${plan.priority.low.length}`);

  console.log('\n🎯 Recommended Next Steps:');
  console.log('1. Remove high priority files (core Firebase configs)');
  console.log('2. Set up Supabase Auth to replace Firebase Auth');
  console.log('3. Convert API routes to Supabase');
  console.log('4. Update hooks and contexts');
  console.log('5. Update components');
  console.log('6. Test complete system');
}

main();
