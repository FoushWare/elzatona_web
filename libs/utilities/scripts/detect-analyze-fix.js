#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Comprehensive Issue Detection, Analysis, and Fix Script
 *
 * This script:
 * 1. Detects issues (ESLint, TypeScript, formatting)
 * 2. Analyzes and categorizes them
 * 3. Auto-fixes what's possible
 * 4. Updates log files to remove fixed issues
 *
 * Usage:
 *   npm run detect-fix              # Full analysis and fix
 *   npm run detect-fix --skip-sonar # Skip SonarQube
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env.local if it exists
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").trim();
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = cleanValue;
        }
      }
    }
  });
}

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

// Log directory
const logDir = path.join(process.cwd(), ".logs", "code-quality");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const logFiles = {
  summary: path.join(logDir, `detect-fix-${timestamp}.log`),
  lint: path.join(logDir, `lint-${timestamp}.log`),
  typeCheck: path.join(logDir, `type-check-${timestamp}.log`),
  sonarqube: path.join(logDir, `sonarqube-${timestamp}.log`),
};

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logWriters = {
  summary: fs.createWriteStream(logFiles.summary, { flags: "w" }),
  lint: fs.createWriteStream(logFiles.lint, { flags: "w" }),
  typeCheck: fs.createWriteStream(logFiles.typeCheck, { flags: "w" }),
  sonarqube: fs.createWriteStream(logFiles.sonarqube, { flags: "w" }),
};

function logToFile(category, message) {
  const messageText = message.replace(/\x1b\[[0-9;]*m/g, "");
  if (logWriters[category]) {
    logWriters[category].write(messageText + "\n");
  }
  logWriters.summary.write(messageText + "\n");
}

function runCommand(command, description, options = {}) {
  const {
    silent = false,
    continueOnError = false,
    logCategory = null,
  } = options;
  try {
    if (!silent) {
      log(`\n🔧 ${description}...`, "cyan");
    }

    const output = execSync(command, {
      encoding: "utf8",
      stdio: silent ? "pipe" : ["inherit", "pipe", "pipe"],
      ...options,
    });

    if (logCategory && output) {
      logToFile(logCategory, `\n=== ${description} ===\n`);
      logToFile(logCategory, `Command: ${command}\n`);
      logToFile(logCategory, `Timestamp: ${new Date().toISOString()}\n`);
      logToFile(logCategory, `\n--- Output ---\n`);
      logToFile(logCategory, output);
      logToFile(logCategory, `\n--- End Output ---\n\n`);
    }

    if (!silent) {
      log(`✅ ${description} completed`, "green");
    }
    return { success: true, output: output || "" };
  } catch (error) {
    const stdout = error.stdout || "";
    const stderr = error.stderr || "";
    const output = stdout + stderr + (error.message || "");

    if (logCategory) {
      logToFile(logCategory, `\n=== ${description} (FAILED) ===\n`);
      logToFile(logCategory, `Command: ${command}\n`);
      logToFile(logCategory, `Timestamp: ${new Date().toISOString()}\n`);
      logToFile(logCategory, `\n--- Error Output ---\n`);
      logToFile(logCategory, output);
      logToFile(logCategory, `\n--- End Error Output ---\n\n`);
    }

    if (!silent) {
      if (continueOnError) {
        log(`⚠️  ${description} found issues (continuing...)`, "yellow");
      } else {
        log(`❌ ${description} failed`, "red");
      }
    }
    return { success: false, output, error: error.message };
  }
}

// Parse lint output to extract issues
function parseLintOutput(output) {
  const issues = [];
  const fileIssues = new Map();
  const lines = output.split("\n");
  let currentFile = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // File path
    if (
      (trimmed.startsWith("/") || trimmed.startsWith("./")) &&
      /\.(tsx?|jsx?)$/.test(trimmed)
    ) {
      currentFile = trimmed;
      continue;
    }

    // Issue line: "  line:col  level  message  rule"
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
      };

      issues.push(issue);

      if (!fileIssues.has(currentFile)) {
        fileIssues.set(currentFile, []);
      }
      fileIssues.get(currentFile).push(issue);
    }
  }

  return { issues, fileIssues };
}

// Analyze issues
function analyzeIssues(issues) {
  const analysis = {
    total: issues.length,
    errors: 0,
    warnings: 0,
    byRule: new Map(),
    byFile: new Map(),
    categories: {
      unusedVars: [],
      unusedErrors: [],
      explicitAny: [],
      hookDeps: [],
      other: [],
    },
  };

  issues.forEach((issue) => {
    if (issue.level === "error") analysis.errors++;
    else analysis.warnings++;

    // Count by rule
    const ruleCount = analysis.byRule.get(issue.rule) || 0;
    analysis.byRule.set(issue.rule, ruleCount + 1);

    // Count by file
    const fileCount = analysis.byFile.get(issue.file) || 0;
    analysis.byFile.set(issue.file, fileCount + 1);

    // Categorize
    if (
      issue.rule === "@typescript-eslint/no-unused-vars" &&
      issue.message.includes("is defined but never used")
    ) {
      analysis.categories.unusedVars.push(issue);
    } else if (
      issue.rule === "@typescript-eslint/no-unused-vars" &&
      issue.message.includes("caught errors")
    ) {
      analysis.categories.unusedErrors.push(issue);
    } else if (issue.rule === "@typescript-eslint/no-explicit-any") {
      analysis.categories.explicitAny.push(issue);
    } else if (issue.rule === "react-hooks/exhaustive-deps") {
      analysis.categories.hookDeps.push(issue);
    } else {
      analysis.categories.other.push(issue);
    }
  });

  return analysis;
}

// Fix unused variable
function fixUnusedVariable(filePath, line, variableName) {
  try {
    if (!fs.existsSync(filePath)) return false;

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    if (line < 1 || line > lines.length) return false;

    const lineContent = lines[line - 1];
    const trimmed = lineContent.trim();
    let newLine = lineContent;
    let fixed = false;

    // Handle imports: import { a, b, unused } from ... or import { a as unused } from ...
    if (trimmed.startsWith("import")) {
      // Check if it's a named import with the variable
      if (lineContent.includes(`{`) && lineContent.includes(`}`)) {
        // Match: import { ... variableName ... } or import { something as variableName, ... }
        const importMatch = lineContent.match(/import\s+{([^}]+)}\s+from/);
        if (importMatch) {
          const imports = importMatch[1];
          // Check if variableName is in the imports (either as direct name or as alias)
          const hasVariable = new RegExp(`\\b${variableName}\\b`).test(imports);

          if (hasVariable) {
            // Split imports and filter out the one with variableName
            let cleanedImports = imports
              .split(",")
              .map((imp) => imp.trim())
              .filter((imp) => {
                // Handle both: "variableName" and "something as variableName"
                const parts = imp.split(/\s+as\s+/);
                const importName = parts[0].trim();
                const aliasName = parts[1] ? parts[1].trim() : null;
                // Remove if variableName is the import name OR the alias
                return (
                  importName !== variableName && aliasName !== variableName
                );
              })
              .join(", ");

            // Only fix if there are remaining imports
            if (cleanedImports.trim().length > 0) {
              // Replace the import block
              newLine = lineContent.replace(
                /import\s+{([^}]+)}\s+from/,
                `import { ${cleanedImports} } from`,
              );
              fixed = newLine !== lineContent;
            } else {
              // All imports removed, comment out the whole line
              newLine = `// ${lineContent.trim()}`;
              fixed = true;
            }
          }
        } else {
          // Default import: import variableName from ...
          const defaultImportMatch = lineContent.match(
            new RegExp(`import\\s+${variableName}\\s+from`),
          );
          if (defaultImportMatch) {
            newLine = `// ${lineContent.trim()}`;
            fixed = true;
          }
        }
      } else {
        // Default import: import variableName from ...
        const defaultImportMatch = lineContent.match(
          new RegExp(`import\\s+${variableName}\\s+from`),
        );
        if (defaultImportMatch) {
          newLine = `// ${lineContent.trim()}`;
          fixed = true;
        }
      }
    } else {
      // For variable declarations: const/let/var variableName = ...
      // Match: const variableName =, let variableName =, var variableName =
      const declRegex = new RegExp(`\\b(const|let|var)\\s+${variableName}\\b`);
      if (declRegex.test(lineContent)) {
        newLine = lineContent.replace(
          new RegExp(`\\b${variableName}\\b`, "g"),
          `_${variableName}`,
        );
        fixed = newLine !== lineContent;
      } else {
        // For function parameters or other uses, prefix with _
        const varRegex = new RegExp(`\\b${variableName}\\b`, "g");
        if (
          varRegex.test(lineContent) &&
          !lineContent.includes(`_${variableName}`) &&
          !lineContent.includes(`"${variableName}"`) &&
          !lineContent.includes(`'${variableName}'`)
        ) {
          newLine = lineContent.replace(varRegex, `_${variableName}`);
          fixed = newLine !== lineContent;
        }
      }
    }

    if (fixed) {
      // SECURITY: Check file hasn't changed since read to prevent race condition
      try {
        const currentStats = fs.statSync(filePath);
        if (originalStats && currentStats.mtime.getTime() !== originalStats.mtime.getTime()) {
          console.warn(`⚠️  File ${filePath} was modified during processing. Skipping write.`);
          return false;
        }
      } catch (_statError) {
        // If stat fails, proceed with write (file might not exist)
      }
      lines[line - 1] = newLine;
      fs.writeFileSync(filePath, lines.join("\n"), "utf8");
      return true;
    }
  } catch (_error) {
    return false;
  }

  return false;
}

// Fix unused error (handles both catch blocks and destructured errors)
function fixUnusedError(filePath, line) {
  try {
    if (!fs.existsSync(filePath)) return false;

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    if (line < 1 || line > lines.length) return false;

    const lineContent = lines[line - 1];
    const trimmed = lineContent.trim();
    let newLine = lineContent;
    let fixed = false;

    // Check for catch blocks: catch (error) or catch(error)
    const catchRegex = /catch\s*\(\s*(\w+)\s*\)/;
    const catchMatch = trimmed.match(catchRegex);

    if (catchMatch && catchMatch[1] === "error") {
      newLine = lineContent.replace(
        /catch\s*\(\s*error\s*\)/,
        "catch (_error)",
      );
      fixed = newLine !== lineContent;
    } else {
      // Check for destructured errors: const { error } = ... or error: errorName
      // Look at current line and previous lines for destructuring context
      let contextToCheck = [lineContent];
      if (line > 1) contextToCheck.unshift(lines[line - 2]); // Previous line
      if (line > 2) contextToCheck.unshift(lines[line - 3]); // 2 lines before

      const fullContext = contextToCheck.join("\n");

      // Match: error: errorName (where errorName is the variable being assigned)
      const destructurePattern = /error\s*:\s*(\w+)/;
      const destructureMatch = fullContext.match(destructurePattern);

      if (destructureMatch) {
        const errorVarName = destructureMatch[1];
        // Find which line has the destructuring
        for (let i = 0; i < contextToCheck.length; i++) {
          if (contextToCheck[i].includes(`error: ${errorVarName}`)) {
            const targetLineIndex = line - 1 - (contextToCheck.length - 1 - i);
            if (targetLineIndex >= 0 && targetLineIndex < lines.length) {
              // Replace error: errorName with error: _errorName
              const targetLine = lines[targetLineIndex];
              const newTargetLine = targetLine.replace(
                new RegExp(`error\\s*:\\s*${errorVarName}\\b`),
                `error: _${errorVarName}`,
              );
              if (newTargetLine !== targetLine) {
                lines[targetLineIndex] = newTargetLine;
                fixed = true;
                break;
              }
            }
          }
        }
      } else if (trimmed.includes("error:") && trimmed.includes("error")) {
        // More general: any line with error: and error variable
        newLine = lineContent.replace(
          /\berror\s*:\s*error\b/g,
          "error: _error",
        );
        fixed = newLine !== lineContent;
      } else {
        // Check for destructured error: { data, error } or { error: errorName }
        // Look at the line and previous lines for destructuring context
        let contextLines = [lineContent];
        if (line > 1) {
          contextLines.unshift(lines[line - 2]); // Previous line
        }
        const context = contextLines.join("\n");

        // Match: error: errorName (where errorName is the variable being assigned)
        const destructurePattern = /error\s*:\s*(\w+)/;
        const destructureMatch = context.match(destructurePattern);

        if (destructureMatch) {
          const errorVarName = destructureMatch[1];
          // Find which line has the destructuring and fix it
          for (let i = 0; i < contextLines.length; i++) {
            const checkLineContent = contextLines[i];
            if (checkLineContent.includes(`error: ${errorVarName}`)) {
              const targetLineIndex = line - 1 - (contextLines.length - 1 - i);
              if (targetLineIndex >= 0 && targetLineIndex < lines.length) {
                const targetLine = lines[targetLineIndex];
                // Replace error: varName with error: _varName (prefix the assigned variable)
                const newTargetLine = targetLine.replace(
                  new RegExp(`error\\s*:\\s*${errorVarName}\\b`),
                  `error: _${errorVarName}`,
                );
                if (newTargetLine !== targetLine) {
                  lines[targetLineIndex] = newTargetLine;
                  fixed = true;
                  break;
                }
              }
            }
          }
        } else {
          // Try to find standalone error variable in destructuring: { error } or { error,
          const standaloneErrorRegex = /\b(error)\s*[,}]/;
          if (
            standaloneErrorRegex.test(lineContent) &&
            !lineContent.includes("_error")
          ) {
            // Replace error with _error in destructuring
            newLine = lineContent.replace(/\berror\s*([,}])/, "_error$1");
            fixed = newLine !== lineContent;
          } else {
            // Try to find error variable on this line and prefix it
            // Match: const error =, let error =, var error =, or just error variable
            const errorVarRegex = /\b(error)\s*[=,;\)]/;
            if (
              errorVarRegex.test(lineContent) &&
              !lineContent.includes("_error")
            ) {
              // Prefix the first occurrence of 'error' variable
              newLine = lineContent.replace(/\berror\b/, "_error");
              fixed = newLine !== lineContent;
            }
          }
        }
      }
    }

    if (fixed) {
      // SECURITY: Check file hasn't changed since read to prevent race condition
      try {
        const currentStats = fs.statSync(filePath);
        if (originalStats && currentStats.mtime.getTime() !== originalStats.mtime.getTime()) {
          console.warn(`⚠️  File ${filePath} was modified during processing. Skipping write.`);
          return false;
        }
      } catch (_statError) {
        // If stat fails, proceed with write (file might not exist)
      }
      lines[line - 1] = newLine;
      fs.writeFileSync(filePath, lines.join("\n"), "utf8");
      return true;
    }
  } catch (_error) {
    return false;
  }

  return false;
}

// Update log file to remove fixed issues
function updateLogFile(logFilePath, fixedIssues, allIssues) {
  try {
    if (!fs.existsSync(logFilePath)) return;

    // SECURITY: Store file stats before reading to detect race conditions
    const originalStats = fs.statSync(logFilePath);
    const content = fs.readFileSync(logFilePath, "utf8");
    const lines = content.split("\n");
    const fixedLineIndices = new Set(
      fixedIssues.map((issue) => issue.lineIndex || -1),
    );

    // Remove fixed issue lines
    const newLines = lines.filter((line, index) => {
      return !fixedLineIndices.has(index);
    });

    // Remove file headers with no remaining issues
    const fileHasIssues = new Map();
    allIssues.forEach((issue) => {
      if (!fixedIssues.includes(issue)) {
        fileHasIssues.set(issue.file, true);
      }
    });

    const finalLines = [];
    for (let i = 0; i < newLines.length; i++) {
      const line = newLines[i];
      if (
        (line.startsWith("/") || line.startsWith("./")) &&
        /\.(tsx?|jsx?)$/.test(line.trim())
      ) {
        if (fileHasIssues.get(line.trim())) {
          finalLines.push(line);
        }
      } else {
        finalLines.push(line);
      }
    }

    // SECURITY: Check file hasn't changed since read to prevent race condition
    let currentStats;
    try {
      currentStats = fs.statSync(logFilePath);
      if (originalStats && currentStats.mtime.getTime() !== originalStats.mtime.getTime()) {
        console.warn(`⚠️  Log file ${logFilePath} was modified during processing. Skipping write.`);
        return null;
      }
    } catch (_statError) {
      // If stat fails, proceed with write (file might not exist)
    }

    // Create backup
    const backupPath = logFilePath.replace(".log", ".backup.log");
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    fs.copyFileSync(logFilePath, backupPath);

    // Write updated content
    fs.writeFileSync(logFilePath, finalLines.join("\n"), "utf8");
    return backupPath;
  } catch (_error) {
    return null;
  }
}

async function main() {
  const skipSonar = process.argv.includes("--skip-sonar");
  const skipTypeCheck = process.argv.includes("--skip-type-check");

  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("🔍 Detect, Analyze, Fix & Update Logs", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log(`📅 Started: ${new Date().toISOString()}`, "cyan");
  log(`📁 Logs: ${logDir}`, "cyan");
  log("");

  const results = {
    detected: { lint: null, typeCheck: null, sonarqube: null },
    analysis: null,
    fixed: [],
    fixedCount: 0,
    logFiles: [],
  };

  // STEP 1: DETECT - Run Prettier
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 1: DETECT - Formatting Issues", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );
  const prettierResult = runCommand("npm run format", "Fixing formatting", {
    logCategory: "summary",
  });
  if (prettierResult.success) {
    results.fixed.push("Formatting");
  }

  // STEP 2: DETECT - ESLint
  log(
    "\n════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 2: DETECT - ESLint Issues", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );

  logToFile("lint", `=== ESLint Detection ===\n`);
  logToFile("lint", `Timestamp: ${new Date().toISOString()}\n\n`);

  const beforeLintResult = runCommand(
    "npm run lint",
    "Detecting ESLint issues",
    {
      silent: true,
      continueOnError: true,
      logCategory: "lint",
    },
  );

  const beforeLintParsed = parseLintOutput(beforeLintResult.output || "");
  results.detected.lint = beforeLintParsed;
  const beforeCount = beforeLintParsed.issues.length;

  if (beforeCount > 0) {
    log(`\n📊 Detected: ${beforeCount} ESLint issues`, "yellow");
  }

  // STEP 3: ANALYZE
  log(
    "\n════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 3: ANALYZE - Categorizing Issues", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );

  const analysis = analyzeIssues(beforeLintParsed.issues);
  results.analysis = analysis;

  log("\n📊 Issue Analysis:", "cyan");
  log(`   Total: ${analysis.total} issues`, "cyan");
  log(`   Errors: ${analysis.errors}`, analysis.errors > 0 ? "red" : "green");
  log(`   Warnings: ${analysis.warnings}`, "yellow");
  log("\n📋 By Category:", "cyan");
  log(
    `   Unused variables: ${analysis.categories.unusedVars.length}`,
    "yellow",
  );
  log(`   Unused errors: ${analysis.categories.unusedErrors.length}`, "yellow");
  log(`   Explicit 'any': ${analysis.categories.explicitAny.length}`, "yellow");
  log(`   Hook dependencies: ${analysis.categories.hookDeps.length}`, "yellow");
  log(`   Other: ${analysis.categories.other.length}`, "yellow");

  logToFile("summary", `\n=== Analysis ===\n`);
  logToFile("summary", JSON.stringify(analysis, null, 2));
  logToFile("summary", `\n`);

  // STEP 4: FIX - Auto-fix ESLint
  log(
    "\n════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 4: FIX - Auto-fixing Issues", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );

  const lintFixResult = runCommand("npm run lint:fix", "Auto-fixing ESLint", {
    logCategory: "lint",
    continueOnError: true, // Continue even if there are remaining issues
  });

  // Fix unused variables
  log("\n🔧 Fixing unused variables...", "cyan");
  const fixedIssues = [];
  let fixedVars = 0;
  let attemptedVars = 0;

  for (const issue of analysis.categories.unusedVars) {
    const varMatch = issue.message.match(/'([^']+)'/);
    if (!varMatch) continue;

    const varName = varMatch[1];
    const filePath = path.resolve(process.cwd(), issue.file);

    attemptedVars++;
    // Only log first few and every 50th to avoid spam
    if (attemptedVars <= 5 || attemptedVars % 50 === 0) {
      log(`   Fixing ${issue.file}:${issue.line} - ${varName}`, "cyan");
    }

    if (fixUnusedVariable(filePath, issue.line, varName)) {
      issue.lineIndex = -1; // Mark as fixed
      fixedIssues.push(issue);
      fixedVars++;
    }
  }

  if (attemptedVars > 5) {
    log(`   ... (processed ${attemptedVars} unused variable issues)`, "cyan");
  }

  // Fix unused errors
  log("🔧 Fixing unused caught errors...", "cyan");
  let fixedErrors = 0;

  for (const issue of analysis.categories.unusedErrors) {
    const filePath = path.resolve(process.cwd(), issue.file);
    // Log first few to show progress
    if (fixedErrors < 5) {
      log(`   Fixing ${issue.file}:${issue.line} - unused error`, "cyan");
    }

    // Try fixing on the reported line and a few lines before (destructuring might be on previous line)
    let fixed = false;
    for (let offset = -3; offset <= 0 && !fixed; offset++) {
      const checkLine = issue.line + offset;
      if (checkLine >= 1) {
        fixed = fixUnusedError(filePath, checkLine);
      }
    }

    if (fixed) {
      issue.lineIndex = -1;
      fixedIssues.push(issue);
      fixedErrors++;
    }
  }

  if (analysis.categories.unusedErrors.length > 5) {
    log(
      `   ... (processed ${analysis.categories.unusedErrors.length} unused error issues)`,
      "cyan",
    );
  }

  // Count total fixes (will be updated after re-check)
  results.fixedCount = fixedVars + fixedErrors;
  if (results.fixedCount > 0) {
    results.fixed.push(`Unused variables/errors (${results.fixedCount})`);
  }

  // Also count ESLint auto-fixes
  if (lintFixResult.success || lintFixResult.output) {
    // ESLint --fix may have fixed some issues even if it exits with error
    results.fixed.push("ESLint auto-fixes");
  }

  // Re-check after fixes
  log("\n🔍 Re-checking after fixes...", "cyan");
  const afterLintResult = runCommand("npm run lint", "Re-checking ESLint", {
    silent: true,
    continueOnError: true,
    logCategory: "lint",
  });

  const afterLintParsed = parseLintOutput(afterLintResult.output || "");
  const remaining = afterLintParsed.issues.length;
  const totalFixed = beforeCount - remaining;
  const manuallyFixed = fixedVars + fixedErrors;

  if (totalFixed > 0) {
    log(`\n✅ Fixed ${totalFixed} issues automatically`, "green");
    if (manuallyFixed > 0) {
      const eslintFixed = totalFixed - manuallyFixed;
      if (eslintFixed > 0) {
        log(
          `   📝 Breakdown: ${manuallyFixed} unused vars/errors + ${eslintFixed} ESLint auto-fixes`,
          "cyan",
        );
      } else {
        log(`   📝 Fixed: ${manuallyFixed} unused variables/errors`, "cyan");
      }
    } else if (totalFixed > 0) {
      log(`   📝 Fixed: ${totalFixed} ESLint auto-fixable issues`, "cyan");
    }
  } else {
    log(`\n⚠️  No issues were automatically fixed`, "yellow");
    log(
      `   Most issues require manual fixes (explicit 'any', hook dependencies, etc.)`,
      "yellow",
    );
  }
  log(`📊 Remaining: ${remaining} issues`, remaining > 0 ? "yellow" : "green");

  // STEP 5: UPDATE LOG FILES
  log(
    "\n════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 5: UPDATE - Log Files", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );

  // Update lint log file
  const backupPath = updateLogFile(
    logFiles.lint,
    fixedIssues,
    beforeLintParsed.issues,
  );
  if (backupPath) {
    log(`✅ Updated lint log file`, "green");
    log(`   📄 Backup: ${backupPath}`, "cyan");
    log(`   📄 Updated: ${logFiles.lint}`, "cyan");
  }

  // STEP 6: TypeScript Check
  if (!skipTypeCheck) {
    log(
      "\n════════════════════════════════════════════════════════════════",
      "magenta",
    );
    log("STEP 6: DETECT - TypeScript Issues", "magenta");
    log(
      "════════════════════════════════════════════════════════════════",
      "magenta",
    );

    const typeCheckResult = runCommand(
      "npm run type-check",
      "TypeScript check",
      {
        continueOnError: true,
        logCategory: "typeCheck",
      },
    );

    results.detected.typeCheck = {
      success: typeCheckResult.success,
      output: typeCheckResult.output,
    };

    if (!typeCheckResult.success) {
      log("❌ TypeScript errors found - manual fixes required", "red");
    }
    results.logFiles.push(`TypeScript: ${logFiles.typeCheck}`);
  }

  // STEP 7: SonarQube (Optional)
  if (!skipSonar) {
    log(
      "\n════════════════════════════════════════════════════════════════",
      "magenta",
    );
    log("STEP 7: DETECT - SonarQube Analysis", "magenta");
    log(
      "════════════════════════════════════════════════════════════════",
      "magenta",
    );

    const sonarToken = process.env.SONAR_TOKEN;
    if (sonarToken) {
      const sonarResult = runCommand(
        "npm run sonar:quick",
        "SonarQube analysis",
        {
          continueOnError: true,
          logCategory: "sonarqube",
        },
      );
      results.detected.sonarqube = { success: sonarResult.success };
      results.logFiles.push(`SonarQube: ${logFiles.sonarqube}`);
    } else {
      log("⚠️  SONAR_TOKEN not set, skipping", "yellow");
    }
  }

  // FINAL SUMMARY
  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("📊 Final Summary", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("");

  if (results.fixed.length > 0) {
    log("✅ Auto-Fixed:", "green");
    results.fixed.forEach((item) => {
      log(`   ✅ ${item}`, "green");
    });
  }

  log(`\n📊 Issue Status:`, "cyan");
  log(`   Before: ${beforeCount} issues`, "yellow");
  if (totalFixed > 0) {
    log(`   ✅ Fixed: ${totalFixed} issues`, "green");
  } else if (manuallyFixed > 0) {
    // Manual fixes were applied but count didn't change (might be same file, different line)
    log(`   ✅ Fixed: ${manuallyFixed} issues (manual fixes applied)`, "green");
  } else {
    log(`   ⚠️  Fixed: 0 issues (all require manual fixes)`, "yellow");
  }
  log(
    `   📊 Remaining: ${remaining} issues`,
    remaining > 0 ? "yellow" : "green",
  );

  // Update results with final counts
  results.fixedCount = totalFixed;
  results.remainingCount = remaining;

  if (results.logFiles.length > 0) {
    log("\n📁 Log Files:", "cyan");
    results.logFiles.forEach((file) => {
      log(`   📄 ${file}`, "cyan");
    });
  }

  log(`\n📄 Summary log: ${logFiles.summary}`, "cyan");
  log("");

  // Close log streams
  Object.values(logWriters).forEach((writer) => {
    writer.end();
  });

  // Exit with error if critical issues remain
  if (
    remaining > 0 ||
    (results.detected.typeCheck && !results.detected.typeCheck.success)
  ) {
    process.exit(1);
  }
}

main().catch((error) => {
  log(`\n❌ Fatal Error: ${error.message}`, "red");
  console.error(error);
  process.exit(1);
});
