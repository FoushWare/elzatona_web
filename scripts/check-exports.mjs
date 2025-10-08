#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to check export type of a component
function checkExportType(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for default export
    const hasDefaultExport =
      content.includes('export default') ||
      content.includes('export { default }') ||
      content.includes('export default function') ||
      content.includes('export default class');

    // Check for named export
    const hasNamedExport =
      content.includes('export const') ||
      content.includes('export function') ||
      content.includes('export class') ||
      content.includes('export {');

    return {
      hasDefaultExport,
      hasNamedExport,
      fileName: path.basename(filePath, '.tsx'),
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });

  return results;
}

// Main execution
console.log('🔍 Checking component export types...');

const sharedComponentsDir = path.join(
  __dirname,
  '..',
  'src',
  'shared',
  'components'
);
const files = findFiles(sharedComponentsDir);

console.log(`Found ${files.length} files to check`);

const exportInfo = files.map(file => checkExportType(file)).filter(Boolean);

console.log('\n📊 Export Analysis:');
console.log('==================');

exportInfo.forEach(info => {
  const exportType = info.hasDefaultExport ? 'default' : 'named';
  console.log(`${info.fileName}: ${exportType} export`);
});

console.log('\n✅ Export analysis complete!');
