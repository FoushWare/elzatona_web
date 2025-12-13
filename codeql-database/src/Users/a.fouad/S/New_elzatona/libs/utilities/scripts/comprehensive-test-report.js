/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const APPS_DIR = path.join(__dirname, "../../../apps");
const OUTPUT_FILE = path.join(
  __dirname,
  "../../../docs/COMPREHENSIVE_TEST_REPORT.md",
);

/**
 * Get all files with their tests and stories
 */
function getAllFiles() {
  const files = [];

  function walkDir(dir, baseDir = APPS_DIR) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip build/cache directories
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dist" ||
        entry.name === "build" ||
        entry.name === "coverage" ||
        entry.name === "__snapshots__"
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        walkDir(fullPath, baseDir);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if ([".tsx", ".ts", ".jsx", ".js"].includes(ext)) {
          // Skip test and story files themselves
          if (
            entry.name.includes(".test.") ||
            entry.name.includes(".spec.") ||
            entry.name.includes(".stories.")
          ) {
            continue;
          }

          const baseName = path.basename(entry.name, ext);
          const dirPath = path.dirname(fullPath);
          const relPath = path.relative(baseDir, fullPath);

          // Find test files
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
            const testPath = path.join(dirPath, pattern);
            if (fs.existsSync(testPath)) {
              testFiles.push({
                name: pattern,
                path: path.relative(baseDir, testPath),
                type: pattern.includes("integration") ? "integration" : "unit",
              });
            }
          }

          // Find storybook files
          const storyFiles = [];
          const storyPattern = `${baseName}.stories${ext}`;
          const storyPath = path.join(dirPath, storyPattern);
          if (fs.existsSync(storyPath)) {
            storyFiles.push({
              name: storyPattern,
              path: path.relative(baseDir, storyPath),
            });
          }

          // Find snapshot files
          const snapshotDir = path.join(dirPath, "__snapshots__");
          const snapshotFiles = [];
          if (fs.existsSync(snapshotDir)) {
            const snapshots = fs.readdirSync(snapshotDir);
            for (const snap of snapshots) {
              if (snap.includes(baseName)) {
                snapshotFiles.push(snap);
              }
            }
          }

          files.push({
            path: relPath,
            name: entry.name,
            type: getFileType(fullPath),
            tests: testFiles,
            stories: storyFiles,
            snapshots: snapshotFiles,
            hasTests: testFiles.length > 0,
            hasStories: storyFiles.length > 0,
            hasSnapshots: snapshotFiles.length > 0,
          });
        }
      }
    }
  }

  walkDir(APPS_DIR);
  return files;
}

function getFileType(filePath) {
  if (filePath.includes("/components/")) return "component";
  if (filePath.includes("/page-components/") || filePath.includes("/pages/"))
    return "page";
  if (filePath.includes("/network/routes/") || filePath.includes("/api/"))
    return "route";
  if (filePath.includes("/utilities/") || filePath.includes("/utils/"))
    return "utility";
  if (filePath.includes("/lib/")) return "library";
  if (filePath.includes("/context/")) return "context";
  if (filePath.includes("/providers/")) return "provider";
  if (filePath.includes("/hooks/")) return "hook";
  if (filePath.includes("/middleware")) return "middleware";
  return "other";
}

/**
 * Run test command and parse results
 */
function runTestCommand(command) {
  try {
    const output = execSync(command, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: "pipe",
    });
    return parseTestOutput(output);
  } catch (e) {
    const output = e.stdout || e.stderr || e.message;
    return parseTestOutput(output);
  }
}

function parseTestOutput(output) {
  const results = {
    suites: { passed: 0, failed: 0, total: 0 },
    tests: { passed: 0, failed: 0, total: 0 },
    snapshots: { passed: 0, failed: 0, total: 0 },
  };

  // Parse test suites
  const suiteMatch = output.match(
    /Test Suites:\s+(\d+)\s+failed,\s+(\d+)\s+passed,\s+(\d+)\s+total/,
  );
  if (suiteMatch) {
    results.suites.failed = parseInt(suiteMatch[1]);
    results.suites.passed = parseInt(suiteMatch[2]);
    results.suites.total = parseInt(suiteMatch[3]);
  }

  // Parse tests
  const testMatch = output.match(
    /Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed,\s+(\d+)\s+total/,
  );
  if (testMatch) {
    results.tests.failed = parseInt(testMatch[1]);
    results.tests.passed = parseInt(testMatch[2]);
    results.tests.total = parseInt(testMatch[3]);
  }

  // Parse snapshots
  const snapMatch = output.match(
    /Snapshots:\s+(\d+)\s+failed,\s+(\d+)\s+passed,\s+(\d+)\s+total/,
  );
  if (snapMatch) {
    results.snapshots.failed = parseInt(snapMatch[1]);
    results.snapshots.passed = parseInt(snapMatch[2]);
    results.snapshots.total = parseInt(snapMatch[3]);
  }

  return results;
}

/**
 * Generate comprehensive report
 */
function generateReport() {
  console.log("📊 Generating comprehensive test report...\n");

  const files = getAllFiles();

  // Group by type
  const byType = {};
  for (const file of files) {
    if (!byType[file.type]) {
      byType[file.type] = [];
    }
    byType[file.type].push(file);
  }

  // Run tests
  console.log("Running unit tests...");
  const unitResults = runTestCommand("bun run test:unit 2>&1");

  console.log("Running integration tests...");
  const integrationResults = runTestCommand("bun run test:integration 2>&1");

  console.log("Running E2E tests...");
  const e2eResults = runTestCommand("bun run test:e2e 2>&1");

  // Calculate statistics
  const totalFiles = files.length;
  const filesWithTests = files.filter((f) => f.hasTests).length;
  const filesWithStories = files.filter((f) => f.hasStories).length;
  const filesWithSnapshots = files.filter((f) => f.hasSnapshots).length;

  const totalTestFiles = files.reduce((sum, f) => sum + f.tests.length, 0);
  const totalStoryFiles = files.reduce((sum, f) => sum + f.stories.length, 0);
  const totalSnapshotFiles = files.reduce(
    (sum, f) => sum + f.snapshots.length,
    0,
  );

  // Generate markdown
  let report = `# Comprehensive Test Report

Generated: ${new Date().toISOString()}

## 📊 Executive Summary

### Test Results

#### Unit Tests
- **Test Suites:** ${unitResults.suites.passed} passed, ${unitResults.suites.failed} failed, ${unitResults.suites.total} total
- **Tests:** ${unitResults.tests.passed} passed, ${unitResults.tests.failed} failed, ${unitResults.tests.total} total
- **Snapshots:** ${unitResults.snapshots.passed} passed, ${unitResults.snapshots.failed} failed, ${unitResults.snapshots.total} total
- **Pass Rate:** ${unitResults.tests.total > 0 ? ((unitResults.tests.passed / unitResults.tests.total) * 100).toFixed(1) : 0}%

#### Integration Tests
- **Test Suites:** ${integrationResults.suites.passed} passed, ${integrationResults.suites.failed} failed, ${integrationResults.suites.total} total
- **Tests:** ${integrationResults.tests.passed} passed, ${integrationResults.tests.failed} failed, ${integrationResults.tests.total} total
- **Pass Rate:** ${integrationResults.tests.total > 0 ? ((integrationResults.tests.passed / integrationResults.tests.total) * 100).toFixed(1) : 0}%

#### E2E Tests
- **Tests:** ${e2eResults.tests.passed} passed, ${e2eResults.tests.failed} failed, ${e2eResults.tests.total} total
- **Pass Rate:** ${e2eResults.tests.total > 0 ? ((e2eResults.tests.passed / e2eResults.tests.total) * 100).toFixed(1) : 0}%

### Coverage Statistics

- **Total Source Files:** ${totalFiles}
- **Files with Tests:** ${filesWithTests} (${((filesWithTests / totalFiles) * 100).toFixed(1)}%)
- **Files with Stories:** ${filesWithStories}
- **Files with Snapshots:** ${filesWithSnapshots}
- **Total Test Files:** ${totalTestFiles}
- **Total Story Files:** ${totalStoryFiles}
- **Total Snapshot Files:** ${totalSnapshotFiles}

---

## 📁 Detailed Breakdown by Type

`;

  // Generate sections for each type
  for (const [type, typeFiles] of Object.entries(byType)) {
    if (typeFiles.length === 0) continue;

    const withTests = typeFiles.filter((f) => f.hasTests).length;
    const withStories = typeFiles.filter((f) => f.hasStories).length;
    const coverage = ((withTests / typeFiles.length) * 100).toFixed(1);

    report += `### ${type.charAt(0).toUpperCase() + type.slice(1)}s (${typeFiles.length})

- **With Tests:** ${withTests}/${typeFiles.length} (${coverage}%)
- **With Stories:** ${withStories}/${typeFiles.length}

#### Files

`;

    for (const file of typeFiles.slice(0, 50)) {
      // Limit to first 50 per type
      report += `##### ${file.name}\n`;
      report += `- **Path:** \`${file.path}\`\n`;

      if (file.tests.length > 0) {
        report += `- **Tests:**\n`;
        for (const test of file.tests) {
          report += `  - \`${test.name}\` (${test.type}) - \`${test.path}\`\n`;
        }
      } else {
        report += `- **Tests:** ⚠️ No tests\n`;
      }

      if (file.stories.length > 0) {
        report += `- **Stories:**\n`;
        for (const story of file.stories) {
          report += `  - \`${story.name}\` - \`${story.path}\`\n`;
        }
      }

      if (file.snapshots.length > 0) {
        report += `- **Snapshots:** ${file.snapshots.length} file(s)\n`;
      }

      report += `\n`;
    }

    if (typeFiles.length > 50) {
      report += `\n*... and ${typeFiles.length - 50} more files*\n\n`;
    }

    report += `\n`;
  }

  report += `\n## 📈 Test Coverage by Type

| Type | Total | With Tests | Coverage | With Stories |
|------|-------|------------|----------|--------------|
`;

  for (const [type, typeFiles] of Object.entries(byType)) {
    if (typeFiles.length === 0) continue;
    const withTests = typeFiles.filter((f) => f.hasTests).length;
    const withStories = typeFiles.filter((f) => f.hasStories).length;
    const coverage = ((withTests / typeFiles.length) * 100).toFixed(1);
    report += `| ${type} | ${typeFiles.length} | ${withTests} | ${coverage}% | ${withStories} |\n`;
  }

  report += `\n## ✅ Recommendations

`;

  // Find files without tests
  const withoutTests = files.filter((f) => !f.hasTests && f.type !== "other");
  if (withoutTests.length > 0) {
    report += `### Files Missing Tests (${withoutTests.length})\n\n`;
    for (const file of withoutTests.slice(0, 20)) {
      report += `- \`${file.path}\` (${file.type})\n`;
    }
    if (withoutTests.length > 20) {
      report += `\n*... and ${withoutTests.length - 20} more files*\n`;
    }
    report += `\n`;
  }

  fs.writeFileSync(OUTPUT_FILE, report);
  console.log(`\n✅ Comprehensive report written to: ${OUTPUT_FILE}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Total files: ${totalFiles}`);
  console.log(
    `   - Files with tests: ${filesWithTests} (${((filesWithTests / totalFiles) * 100).toFixed(1)}%)`,
  );
  console.log(`   - Files with stories: ${filesWithStories}`);
  console.log(`   - Total test files: ${totalTestFiles}`);
}

generateReport();
