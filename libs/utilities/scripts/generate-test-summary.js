const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const APPS_DIR = path.join(__dirname, "../../../apps");
const OUTPUT_FILE = path.join(__dirname, "../../../docs/TEST_SUMMARY.md");

/**
 * Find all source files and their tests
 */
function findFilesWithTests(dir, extensions = [".tsx", ".ts", ".jsx", ".js"]) {
  const files = [];
  
  function walkDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      // Skip build/cache directories
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dist" ||
        entry.name === "build" ||
        entry.name === "coverage"
      ) {
        continue;
      }
      
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          const baseName = path.basename(entry.name, ext);
          const dir = path.dirname(fullPath);
          
          // Find associated test files
          const testFiles = [];
          const testPatterns = [
            `${baseName}.test${ext}`,
            `${baseName}.spec${ext}`,
            `${baseName}.integration.test${ext}`,
            `page.test${ext}`,
            `page.integration.test${ext}`,
            `route.test${ext}`,
          ];
          
          for (const pattern of testPatterns) {
            const testPath = path.join(dir, pattern);
            if (fs.existsSync(testPath)) {
              testFiles.push(pattern);
            }
          }
          
          // Find storybook files
          const storyFiles = [];
          const storyPattern = `${baseName}.stories${ext}`;
          const storyPath = path.join(dir, storyPattern);
          if (fs.existsSync(storyPath)) {
            storyFiles.push(storyPattern);
          }
          
          if (testFiles.length > 0 || storyFiles.length > 0 || entry.name.includes("test") || entry.name.includes("spec")) {
            files.push({
              path: fullPath,
              name: entry.name,
              dir: dir,
              tests: testFiles,
              stories: storyFiles,
              type: getFileType(fullPath),
            });
          }
        }
      }
    }
  }
  
  walkDir(dir);
  return files;
}

function getFileType(filePath) {
  if (filePath.includes("/components/")) return "component";
  if (filePath.includes("/page-components/") || filePath.includes("/pages/")) return "page";
  if (filePath.includes("/network/routes/") || filePath.includes("/api/")) return "route";
  if (filePath.includes("/utilities/") || filePath.includes("/utils/")) return "utility";
  if (filePath.includes("/lib/")) return "library";
  if (filePath.includes("/context/")) return "context";
  if (filePath.includes("/providers/")) return "provider";
  if (filePath.includes("/hooks/")) return "hook";
  return "other";
}

/**
 * Run tests and collect results
 */
function runTests() {
  const results = {
    unit: { passed: 0, failed: 0, total: 0 },
    integration: { passed: 0, failed: 0, total: 0 },
    e2e: { passed: 0, failed: 0, total: 0 },
  };
  
  try {
    console.log("Running unit tests...");
    const unitOutput = execSync("bun run test:unit 2>&1", { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
    const unitMatch = unitOutput.match(/Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed/);
    if (unitMatch) {
      results.unit.failed = parseInt(unitMatch[1]);
      results.unit.passed = parseInt(unitMatch[2]);
      results.unit.total = results.unit.passed + results.unit.failed;
    }
  } catch (e) {
    const output = e.stdout || e.message;
    const match = output.match(/Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed/);
    if (match) {
      results.unit.failed = parseInt(match[1]);
      results.unit.passed = parseInt(match[2]);
      results.unit.total = results.unit.passed + results.unit.failed;
    }
  }
  
  try {
    console.log("Running integration tests...");
    const integrationOutput = execSync("bun run test:integration 2>&1", { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
    const integrationMatch = integrationOutput.match(/Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed/);
    if (integrationMatch) {
      results.integration.failed = parseInt(integrationMatch[1]);
      results.integration.passed = parseInt(integrationMatch[2]);
      results.integration.total = results.integration.passed + results.integration.failed;
    }
  } catch (e) {
    const output = e.stdout || e.message;
    const match = output.match(/Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed/);
    if (match) {
      results.integration.failed = parseInt(match[1]);
      results.integration.passed = parseInt(match[2]);
      results.integration.total = results.integration.passed + results.integration.failed;
    }
  }
  
  return results;
}

/**
 * Generate summary report
 */
function generateSummary() {
  console.log("📊 Generating comprehensive test summary...\n");
  
  const files = findFilesWithTests(APPS_DIR);
  const testResults = runTests();
  
  // Group by type
  const byType = {
    component: [],
    page: [],
    route: [],
    utility: [],
    library: [],
    context: [],
    provider: [],
    hook: [],
    other: [],
  };
  
  for (const file of files) {
    byType[file.type].push(file);
  }
  
  // Generate markdown report
  let report = `# Comprehensive Test Summary

Generated: ${new Date().toISOString()}

## 📊 Test Results Overview

### Unit Tests
- **Passed:** ${testResults.unit.passed}
- **Failed:** ${testResults.unit.failed}
- **Total:** ${testResults.unit.total}
- **Pass Rate:** ${testResults.unit.total > 0 ? ((testResults.unit.passed / testResults.unit.total) * 100).toFixed(1) : 0}%

### Integration Tests
- **Passed:** ${testResults.integration.passed}
- **Failed:** ${testResults.integration.failed}
- **Total:** ${testResults.integration.total}
- **Pass Rate:** ${testResults.integration.total > 0 ? ((testResults.integration.passed / testResults.integration.total) * 100).toFixed(1) : 0}%

### E2E Tests
- **Passed:** ${testResults.e2e.passed}
- **Failed:** ${testResults.e2e.failed}
- **Total:** ${testResults.e2e.total}
- **Pass Rate:** ${testResults.e2e.total > 0 ? ((testResults.e2e.passed / testResults.e2e.total) * 100).toFixed(1) : 0}%

---

## 📁 Files with Tests

### Components (${byType.component.length})

`;

  // Components
  for (const file of byType.component) {
    const relPath = path.relative(APPS_DIR, file.path);
    report += `#### ${file.name}\n`;
    report += `- **Path:** \`${relPath}\`\n`;
    if (file.tests.length > 0) {
      report += `- **Tests:** ${file.tests.join(", ")}\n`;
    } else {
      report += `- **Tests:** ⚠️ No tests found\n`;
    }
    if (file.stories.length > 0) {
      report += `- **Stories:** ${file.stories.join(", ")}\n`;
    }
    report += `\n`;
  }

  report += `\n### Pages (${byType.page.length})\n\n`;
  for (const file of byType.page) {
    const relPath = path.relative(APPS_DIR, file.path);
    report += `#### ${file.name}\n`;
    report += `- **Path:** \`${relPath}\`\n`;
    if (file.tests.length > 0) {
      report += `- **Tests:** ${file.tests.join(", ")}\n`;
    } else {
      report += `- **Tests:** ⚠️ No tests found\n`;
    }
    report += `\n`;
  }

  report += `\n### Routes (${byType.route.length})\n\n`;
  for (const file of byType.route) {
    const relPath = path.relative(APPS_DIR, file.path);
    report += `#### ${file.name}\n`;
    report += `- **Path:** \`${relPath}\`\n`;
    if (file.tests.length > 0) {
      report += `- **Tests:** ${file.tests.join(", ")}\n`;
    } else {
      report += `- **Tests:** ⚠️ No tests found\n`;
    }
    report += `\n`;
  }

  report += `\n### Utilities (${byType.utility.length})\n\n`;
  for (const file of byType.utility) {
    const relPath = path.relative(APPS_DIR, file.path);
    report += `#### ${file.name}\n`;
    report += `- **Path:** \`${relPath}\`\n`;
    if (file.tests.length > 0) {
      report += `- **Tests:** ${file.tests.join(", ")}\n`;
    } else {
      report += `- **Tests:** ⚠️ No tests found\n`;
    }
    report += `\n`;
  }

  // Summary statistics
  const totalFiles = files.length;
  const filesWithTests = files.filter(f => f.tests.length > 0).length;
  const filesWithStories = files.filter(f => f.stories.length > 0).length;
  const totalTests = files.reduce((sum, f) => sum + f.tests.length, 0);
  const totalStories = files.reduce((sum, f) => sum + f.stories.length, 0);

  report += `\n## 📈 Statistics

- **Total Files Analyzed:** ${totalFiles}
- **Files with Tests:** ${filesWithTests} (${((filesWithTests / totalFiles) * 100).toFixed(1)}%)
- **Files with Stories:** ${filesWithStories}
- **Total Test Files:** ${totalTests}
- **Total Story Files:** ${totalStories}

## ✅ Test Coverage by Type

`;

  for (const [type, typeFiles] of Object.entries(byType)) {
    if (typeFiles.length > 0) {
      const withTests = typeFiles.filter(f => f.tests.length > 0).length;
      const coverage = ((withTests / typeFiles.length) * 100).toFixed(1);
      report += `- **${type.charAt(0).toUpperCase() + type.slice(1)}s:** ${withTests}/${typeFiles.length} (${coverage}%)\n`;
    }
  }

  fs.writeFileSync(OUTPUT_FILE, report);
  console.log(`\n✅ Summary written to: ${OUTPUT_FILE}`);
}

generateSummary();

