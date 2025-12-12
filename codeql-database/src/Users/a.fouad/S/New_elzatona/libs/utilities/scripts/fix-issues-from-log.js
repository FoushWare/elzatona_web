#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Fix Issues from Log File
 *
 * This script:
 * 1. Parses the latest lint log file
 * 2. Automatically fixes common issues (unused vars, unused imports)
 * 3. Updates the log file to remove fixed issues
 *
 * Usage:
 *   npm run fix:from-log              # Fix issues from latest log
 *   npm run fix:from-log -- <log-file> # Fix issues from specific log
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Colors
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Parse log file to extract issues
function parseLogFile(logFilePath) {
  if (!fs.existsSync(logFilePath)) {
    log(`❌ Log file not found: ${logFilePath}`, "red");
    return null;
  }

  const content = fs.readFileSync(logFilePath, "utf8");
  const issues = [];
  const fileIssues = new Map(); // file -> array of issues

  // Find the "--- Output ---" section (prefer "After Fix", fallback to "Before Fix")
  const lines = content.split("\n");
  let inOutputSection = false;
  let outputStartIndex = -1;
  let outputEndIndex = -1;

  // Look for "After Fix" section first, then "Before Fix"
  const afterFixIndex = lines.findIndex((line) =>
    line.includes("ESLint Check (After Fix)"),
  );
  const beforeFixIndex = lines.findIndex((line) =>
    line.includes("ESLint Check (Before Fix)"),
  );

  const sectionStartIndex = afterFixIndex >= 0 ? afterFixIndex : beforeFixIndex;

  if (sectionStartIndex >= 0) {
    // Find "--- Output ---" in this section
    for (let i = sectionStartIndex; i < lines.length; i++) {
      if (lines[i].includes("--- Output ---")) {
        outputStartIndex = i + 1;
        break;
      }
    }

    // Find "--- End Output ---" or next section
    if (outputStartIndex >= 0) {
      for (let i = outputStartIndex; i < lines.length; i++) {
        if (
          lines[i].includes("--- End Output ---") ||
          lines[i].includes("--- Error Output ---") ||
          lines[i].includes("=== ")
        ) {
          outputEndIndex = i;
          break;
        }
      }
      if (outputEndIndex === -1) {
        outputEndIndex = lines.length;
      }
    }
  }

  // Parse issues from the output section
  let currentFile = null;
  const issueLines =
    outputStartIndex >= 0 ? lines.slice(outputStartIndex, outputEndIndex) : [];

  for (let i = 0; i < issueLines.length; i++) {
    const line = issueLines[i];
    const trimmed = line.trim();

    // Skip empty lines and separators
    if (!trimmed || trimmed.startsWith("---") || trimmed.startsWith("===")) {
      continue;
    }

    // Check if this is a file path (starts with / and ends with .tsx/.ts/.jsx/.js)
    if (
      (trimmed.startsWith("/") || trimmed.startsWith("./")) &&
      /\.(tsx?|jsx?)$/.test(trimmed)
    ) {
      currentFile = trimmed;
      continue;
    }

    // Check if this is an issue line (starts with spaces, then line:col)
    // Format: "  line:col  level  message  rule"
    const issueMatch = trimmed.match(
      /^(\d+):(\d+)\s+(error|warning)\s+(.+?)\s+([^\s]+)$/,
    );
    if (issueMatch && currentFile) {
      const [, lineNum, col, level, message, rule] = issueMatch;
      const issue = {
        file: currentFile,
        line: parseInt(lineNum, 10),
        col: parseInt(col, 10),
        level,
        message: message.trim(),
        rule: rule.trim(),
        original: line,
        lineIndex: outputStartIndex + i,
      };

      issues.push(issue);

      if (!fileIssues.has(currentFile)) {
        fileIssues.set(currentFile, []);
      }
      fileIssues.get(currentFile).push(issue);
    }
  }

  return { issues, fileIssues, content, lines };
}

// Fix unused variable by prefixing with _
function fixUnusedVariable(filePath, line, variableName) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    if (line < 1 || line > lines.length) {
      return false;
    }

    const lineContent = lines[line - 1];
    const trimmed = lineContent.trim();

    // Patterns to match unused variables
    const patterns = [
      // const variable = ...
      new RegExp(`\\bconst\\s+${variableName}\\s*=`),
      // let variable = ...
      new RegExp(`\\blet\\s+${variableName}\\s*=`),
      // var variable = ...
      new RegExp(`\\bvar\\s+${variableName}\\s*=`),
      // function variable(...) or variable: ...
      new RegExp(`\\b${variableName}\\s*[:=]`),
      // import { variable } or import variable
      new RegExp(`\\b${variableName}\\b`),
    ];

    let fixed = false;
    let newLine = lineContent;

    // Check if it's an import statement
    if (trimmed.startsWith("import")) {
      // Remove from import or prefix with _
      if (
        trimmed.includes(`{ ${variableName} }`) ||
        trimmed.includes(`{${variableName}}`)
      ) {
        // Remove from named import
        newLine = lineContent.replace(
          new RegExp(
            `,\\s*${variableName}\\s*}|{\\s*${variableName}\\s*,|{\\s*${variableName}\\s*}`,
          ),
          (match) => {
            if (match.includes(",")) {
              return match.replace(
                new RegExp(`,\\s*${variableName}\\s*|${variableName}\\s*,`),
                "",
              );
            }
            return match.replace(variableName, "");
          },
        );
        fixed = newLine !== lineContent;
      } else if (trimmed.includes(`import ${variableName}`)) {
        // Remove default import - comment it out
        newLine = `// ${lineContent.trim()}`;
        fixed = true;
      }
    } else {
      // For other cases, prefix with _
      for (const pattern of patterns) {
        if (pattern.test(lineContent)) {
          newLine = lineContent.replace(
            new RegExp(`\\b${variableName}\\b`, "g"),
            `_${variableName}`,
          );
          fixed = newLine !== lineContent;
          break;
        }
      }
    }

    if (fixed) {
      lines[line - 1] = newLine;
      fs.writeFileSync(filePath, lines.join("\n"), "utf8");
      return true;
    }
  } catch (error) {
    log(`   ⚠️  Error fixing ${filePath}:${line}: ${error.message}`, "yellow");
    return false;
  }

  return false;
}

// Fix unused caught error by prefixing with _
function fixUnusedError(filePath, line) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    if (line < 1 || line > lines.length) {
      return false;
    }

    const lineContent = lines[line - 1];
    // Match catch (error) or catch(error)
    const catchRegex = /catch\s*\(\s*(\w+)\s*\)/;
    const match = lineContent.match(catchRegex);

    if (match && match[1] === "error") {
      const newLine = lineContent.replace(
        /catch\s*\(\s*error\s*\)/,
        "catch (_error)",
      );
      if (newLine !== lineContent) {
        lines[line - 1] = newLine;
        fs.writeFileSync(filePath, lines.join("\n"), "utf8");
        return true;
      }
    }
  } catch (error) {
    log(`   ⚠️  Error fixing ${filePath}:${line}: ${error.message}`, "yellow");
    return false;
  }

  return false;
}

// Remove fixed issues from log content
function removeFixedIssuesFromLog(parsed, fixedIssues) {
  const { lines, issues } = parsed;
  const fixedLineIndices = new Set(fixedIssues.map((issue) => issue.lineIndex));

  // Remove fixed issue lines
  const newLines = lines.filter((line, index) => {
    // Check if this is a fixed issue line
    return !fixedLineIndices.has(index);
  });

  // Also remove file headers that have no issues left
  const fileHasIssues = new Map();
  issues.forEach((issue) => {
    if (!fixedIssues.includes(issue)) {
      fileHasIssues.set(issue.file, true);
    }
  });

  const finalLines = [];
  for (let i = 0; i < newLines.length; i++) {
    const line = newLines[i];
    // Check if this is a file path line
    if (
      (line.startsWith("/") ||
        line.startsWith("./") ||
        line.startsWith("../")) &&
      /\.(tsx?|jsx?)$/.test(line.trim())
    ) {
      // Only include if file still has issues
      if (fileHasIssues.get(line.trim())) {
        finalLines.push(line);
      }
      // Skip the file line if no issues remain
    } else {
      finalLines.push(line);
    }
  }

  return finalLines.join("\n");
}

async function main() {
  const logDir = path.join(process.cwd(), ".logs", "code-quality");
  let logFilePath;

  // Get log file from args or use latest
  if (process.argv[2] && !process.argv[2].startsWith("--")) {
    logFilePath = path.resolve(process.argv[2]);
  } else {
    // Find latest lint log
    try {
      const files = fs
        .readdirSync(logDir)
        .filter((f) => f.startsWith("lint-") && f.endsWith(".log"))
        .map((f) => ({
          name: f,
          path: path.join(logDir, f),
          time: fs.statSync(path.join(logDir, f)).mtime,
        }))
        .sort((a, b) => b.time - a.time);

      if (files.length === 0) {
        log(
          "❌ No lint log files found. Run 'npm run fix:all:quick' first.",
          "red",
        );
        process.exit(1);
      }

      logFilePath = files[0].path;
    } catch (error) {
      log(`❌ Error finding log file: ${error.message}`, "red");
      process.exit(1);
    }
  }

  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("🔧 Fixing Issues from Log File", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log(`📄 Log file: ${logFilePath}`, "cyan");
  log("");

  // Parse log file
  log("📋 Parsing log file...", "cyan");
  const parsed = parseLogFile(logFilePath);

  if (!parsed) {
    process.exit(1);
  }

  const { issues, fileIssues } = parsed;
  log(`   Found ${issues.length} issues in ${fileIssues.size} files`, "cyan");
  log("");

  // Categorize issues
  const unusedVarIssues = issues.filter(
    (issue) =>
      issue.rule === "@typescript-eslint/no-unused-vars" &&
      issue.message.includes("is defined but never used"),
  );

  const unusedErrorIssues = issues.filter(
    (issue) =>
      issue.rule === "@typescript-eslint/no-unused-vars" &&
      issue.message.includes("caught errors must match"),
  );

  log("📊 Issue Categories:", "cyan");
  log(`   Unused variables: ${unusedVarIssues.length}`, "yellow");
  log(`   Unused errors: ${unusedErrorIssues.length}`, "yellow");
  log(
    `   Other issues: ${issues.length - unusedVarIssues.length - unusedErrorIssues.length}`,
    "yellow",
  );
  log("");

  // Fix unused variables
  log("🔧 Fixing unused variables...", "cyan");
  const fixedIssues = [];
  let fixedCount = 0;
  let attemptedCount = 0;

  for (const issue of unusedVarIssues) {
    // Extract variable name from message
    const varMatch = issue.message.match(/'([^']+)'/);
    if (!varMatch) continue;

    const varName = varMatch[1];
    const filePath = path.resolve(process.cwd(), issue.file);

    // Only log every 50th to avoid spam
    if (attemptedCount % 50 === 0 || attemptedCount < 10) {
      log(`   Fixing ${issue.file}:${issue.line} - ${varName}`, "cyan");
    }
    attemptedCount++;

    if (fixUnusedVariable(filePath, issue.line, varName)) {
      fixedIssues.push(issue);
      fixedCount++;
    }
  }

  if (attemptedCount > 10) {
    log(`   ... (processed ${attemptedCount} unused variable issues)`, "cyan");
  }

  // Fix unused errors
  log("\n🔧 Fixing unused caught errors...", "cyan");
  for (const issue of unusedErrorIssues) {
    const filePath = path.resolve(process.cwd(), issue.file);
    // Only log every 50th to avoid spam
    if (fixedCount % 50 === 0 || fixedCount < 10) {
      log(`   Fixing ${issue.file}:${issue.line} - unused error`, "cyan");
    }

    if (fixUnusedError(filePath, issue.line)) {
      fixedIssues.push(issue);
      fixedCount++;
    }
  }

  // Update log file
  if (fixedCount > 0) {
    log("\n📝 Updating log file...", "cyan");
    const updatedContent = removeFixedIssuesFromLog(parsed, fixedIssues);

    // Create backup
    const backupPath = logFilePath.replace(".log", ".backup.log");
    // Ensure backup directory exists
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    fs.copyFileSync(logFilePath, backupPath);

    // Write updated content
    fs.writeFileSync(logFilePath, updatedContent, "utf8");

    log(`   ✅ Fixed ${fixedCount} issues`, "green");
    log(`   📄 Backup saved to: ${backupPath}`, "cyan");
    log(`   📄 Updated log: ${logFilePath}`, "cyan");
    log(
      `   📊 Remaining issues in log: ${parsed.issues.length - fixedCount}`,
      "yellow",
    );
  } else {
    log("\n⚠️  No issues were automatically fixed", "yellow");
    log(
      "   Some issues require manual fixes (e.g., 'any' types, hook dependencies)",
      "yellow",
    );
  }

  // Summary
  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("📊 Summary", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log(`   Total issues: ${issues.length}`, "cyan");
  log(`   Fixed: ${fixedCount}`, "green");
  log(`   Remaining: ${issues.length - fixedCount}`, "yellow");
  log("");

  if (fixedCount > 0) {
    log("💡 Next Steps:", "cyan");
    log("   1. Review the fixed files", "cyan");
    log("   2. Run: npm run lint:fix", "cyan");
    log("   3. Run: npm run fix:from-log (again to fix more)", "cyan");
  }

  log("");
}

main().catch((error) => {
  log(`\n❌ Fatal Error: ${error.message}`, "red");
  console.error(error);
  process.exit(1);
});
