#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Comprehensive Auto-Fix Script
 *
 * This script automatically fixes all fixable issues:
 * 1. Prettier formatting (auto-fixes)
 * 2. ESLint issues (auto-fixes what it can)
 * 3. TypeScript type checking (shows errors - manual fix required)
 * 4. SonarQube analysis (optional - shows issues - manual fix required)
 *
 * Usage:
 *   npm run fix:all:auto              # Fix everything automatically
 *   npm run fix:all:auto --skip-sonar # Skip SonarQube (faster)
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

// Log directory
const logDir = path.join(process.cwd(), ".logs", "code-quality");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const logFiles = {
  summary: path.join(logDir, `summary-${timestamp}.log`),
  lint: path.join(logDir, `lint-${timestamp}.log`),
  typeCheck: path.join(logDir, `type-check-${timestamp}.log`),
  sonarqube: path.join(logDir, `sonarqube-${timestamp}.log`),
  prettier: path.join(logDir, `prettier-${timestamp}.log`),
};

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log file writers
const logWriters = {
  summary: fs.createWriteStream(logFiles.summary, { flags: "w" }),
  lint: fs.createWriteStream(logFiles.lint, { flags: "w" }),
  typeCheck: fs.createWriteStream(logFiles.typeCheck, { flags: "w" }),
  sonarqube: fs.createWriteStream(logFiles.sonarqube, { flags: "w" }),
  prettier: fs.createWriteStream(logFiles.prettier, { flags: "w" }),
};

function log(message, color = "reset", logToFile = true) {
  const messageText = message.replace(/\x1b\[[0-9;]*m/g, ""); // Remove ANSI colors
  console.log(`${colors[color]}${message}${colors.reset}`);
  if (logToFile) {
    logWriters.summary.write(messageText + "\n");
  }
}

function logToFile(category, message) {
  const messageText = message.replace(/\x1b\[[0-9;]*m/g, ""); // Remove ANSI colors
  if (logWriters[category]) {
    logWriters[category].write(messageText + "\n");
  }
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

    // Capture output for logging
    const output = execSync(command, {
      encoding: "utf8",
      stdio: silent ? "pipe" : ["inherit", "pipe", "pipe"],
      ...options,
    });

    // Log to file if category specified
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

    // Log to file if category specified
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

function getLintStats() {
  try {
    const result = runCommand("npm run lint", "Checking lint status", {
      silent: true,
      continueOnError: true,
    });
    const output = result.output || "";
    const match = output.match(/(\d+)\s+problems?\s+\((\d+)\s+error/, "i");
    if (match) {
      return {
        total: parseInt(match[1], 10),
        errors: parseInt(match[2], 10),
        warnings: parseInt(match[1], 10) - parseInt(match[2], 10),
      };
    }
  } catch (_error) {
    // Ignore
  }
  return null;
}

async function main() {
  const skipSonar = process.argv.includes("--skip-sonar");
  const skipTypeCheck = process.argv.includes("--skip-type-check");

  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("🚀 Comprehensive Auto-Fix Script", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log(`📅 Started: ${new Date().toISOString()}`, "cyan");
  log(`📁 Logs directory: ${logDir}`, "cyan");
  log("");

  const results = {
    fixed: [],
    errors: [],
    warnings: [],
    logFiles: [],
  };

  // Step 1: Prettier Formatting (Auto-fix)
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 1: Fixing Formatting (Prettier)", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );
  const prettierResult = runCommand(
    "npm run format",
    "Fixing Prettier formatting",
    { logCategory: "prettier" },
  );
  if (prettierResult.success) {
    results.fixed.push("Formatting");
  }
  results.logFiles.push(`Prettier: ${logFiles.prettier}`);

  // Step 2: ESLint Auto-Fix
  log(
    "\n════════════════════════════════════════════════════════════════",
    "magenta",
  );
  log("STEP 2: Fixing ESLint Issues (Auto-fixable)", "magenta");
  log(
    "════════════════════════════════════════════════════════════════",
    "magenta",
  );

  // Get initial stats and log full lint output
  logToFile("lint", `\n=== ESLint Check (Before Fix) ===\n`);
  logToFile("lint", `Timestamp: ${new Date().toISOString()}\n\n`);
  const beforeLintResult = runCommand(
    "npm run lint",
    "Checking ESLint status",
    {
      silent: true,
      continueOnError: true,
      logCategory: "lint",
    },
  );

  const beforeStats = getLintStats();
  if (beforeStats) {
    log(
      `\n📊 Before: ${beforeStats.total} problems (${beforeStats.errors} errors, ${beforeStats.warnings} warnings)`,
      "yellow",
    );
    logToFile(
      "lint",
      `\nSummary: ${beforeStats.total} problems (${beforeStats.errors} errors, ${beforeStats.warnings} warnings)\n`,
    );
  }

  logToFile("lint", `\n=== ESLint Auto-Fix ===\n`);
  const lintFixResult = runCommand("npm run lint:fix", "Fixing ESLint issues", {
    logCategory: "lint",
  });

  // Get stats after fix and log full lint output
  logToFile("lint", `\n=== ESLint Check (After Fix) ===\n`);
  logToFile("lint", `Timestamp: ${new Date().toISOString()}\n\n`);
  const afterLintResult = runCommand(
    "npm run lint",
    "Checking ESLint status after fix",
    {
      silent: true,
      continueOnError: true,
      logCategory: "lint",
    },
  );

  const afterStats = getLintStats();
  if (afterStats) {
    const fixed = beforeStats ? beforeStats.total - afterStats.total : 0;
    if (fixed > 0) {
      log(`\n✅ Fixed ${fixed} ESLint issues automatically`, "green");
    }
    log(
      `📊 After: ${afterStats.total} problems (${afterStats.errors} errors, ${afterStats.warnings} warnings)`,
      afterStats.errors > 0 ? "red" : "yellow",
    );

    if (afterStats.errors > 0) {
      results.errors.push(
        `${afterStats.errors} ESLint errors (manual fix required)`,
      );
    }
    if (afterStats.warnings > 0) {
      results.warnings.push(
        `${afterStats.warnings} ESLint warnings (mostly manual fixes needed)`,
      );
    }
  }

  if (lintFixResult.success) {
    results.fixed.push("ESLint (auto-fixable issues)");
  }
  results.logFiles.push(`ESLint: ${logFiles.lint}`);

  // Step 3: TypeScript Type Checking
  if (!skipTypeCheck) {
    log(
      "\n════════════════════════════════════════════════════════════════",
      "magenta",
    );
    log("STEP 3: TypeScript Type Checking", "magenta");
    log(
      "════════════════════════════════════════════════════════════════",
      "magenta",
    );
    log(
      "💡 TypeScript errors cannot be auto-fixed - manual fixes required",
      "yellow",
    );

    const typeCheckResult = runCommand(
      "npm run type-check",
      "Checking TypeScript types",
      {
        continueOnError: true,
        logCategory: "typeCheck",
      },
    );

    if (typeCheckResult.success) {
      log("\n✅ No TypeScript errors!", "green");
    } else {
      log("\n❌ TypeScript errors found - manual fixes required", "red");
      log("💡 Review the output above to see specific errors", "yellow");
      log(`💡 Full output saved to: ${logFiles.typeCheck}`, "cyan");
      results.errors.push("TypeScript errors (manual fix required)");
    }
    results.logFiles.push(`TypeScript: ${logFiles.typeCheck}`);
  }

  // Step 4: SonarQube Analysis (Optional)
  if (!skipSonar) {
    log(
      "\n════════════════════════════════════════════════════════════════",
      "magenta",
    );
    log("STEP 4: SonarQube Analysis (Optional)", "magenta");
    log(
      "════════════════════════════════════════════════════════════════",
      "magenta",
    );
    log(
      "💡 SonarQube issues cannot be auto-fixed - manual fixes required",
      "yellow",
    );

    const sonarToken = process.env.SONAR_TOKEN;
    if (!sonarToken) {
      log("⚠️  SONAR_TOKEN not set, skipping SonarQube analysis", "yellow");
      log(
        "💡 Set SONAR_TOKEN in .env.local to enable SonarQube checks",
        "cyan",
      );
    } else {
      const sonarResult = runCommand(
        "npm run sonar:quick",
        "Running SonarQube analysis",
        {
          continueOnError: true,
          logCategory: "sonarqube",
        },
      );

      if (sonarResult.success) {
        log("\n✅ SonarQube analysis completed", "green");
        log(
          "💡 View results at: https://sonarcloud.io/dashboard?id=FoushWare_GreatFrontendHub",
          "cyan",
        );
        log(`💡 Full output saved to: ${logFiles.sonarqube}`, "cyan");
      } else {
        log(
          "\n⚠️  SonarQube found issues - review dashboard for details",
          "yellow",
        );
        log(`💡 Full output saved to: ${logFiles.sonarqube}`, "cyan");
        results.warnings.push("SonarQube issues (review dashboard)");
      }
      results.logFiles.push(`SonarQube: ${logFiles.sonarqube}`);
    }
  } else {
    log(
      "\n⏭️  Skipping SonarQube analysis (use without --skip-sonar to include)",
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
  log("");

  if (results.fixed.length > 0) {
    log("✅ Auto-Fixed:", "green");
    results.fixed.forEach((item) => {
      log(`   ✅ ${item}`, "green");
    });
  }

  if (results.errors.length > 0) {
    log("\n❌ Errors (Manual Fix Required):", "red");
    results.errors.forEach((item) => {
      log(`   ❌ ${item}`, "red");
    });
  }

  if (results.warnings.length > 0) {
    log("\n⚠️  Warnings (Manual Fix Recommended):", "yellow");
    results.warnings.forEach((item) => {
      log(`   ⚠️  ${item}`, "yellow");
    });
  }

  if (results.fixed.length > 0) {
    log("\n💡 Next Steps:", "cyan");
    log("   1. Review the fixed files", "cyan");
    log("   2. Stage changes: git add -A", "cyan");
    log(
      "   3. Commit: git commit -m 'fix: auto-fix code quality issues'",
      "cyan",
    );

    if (results.errors.length > 0) {
      log("\n   4. Fix remaining errors manually", "yellow");
      log("   5. Run this script again to verify", "yellow");
    }
  }

  // Log files summary
  if (results.logFiles.length > 0) {
    log("\n📁 Log Files Generated:", "cyan");
    log(
      "════════════════════════════════════════════════════════════════",
      "cyan",
    );
    results.logFiles.forEach((file) => {
      log(`   📄 ${file}`, "cyan");
    });
    log(`\n💡 All logs saved to: ${logDir}`, "cyan");
  }

  // Write final summary to log file
  logToFile("summary", `\n=== Final Summary ===\n`);
  logToFile("summary", `Timestamp: ${new Date().toISOString()}\n`);
  logToFile("summary", `Fixed: ${results.fixed.join(", ")}\n`);
  logToFile("summary", `Errors: ${results.errors.join(", ")}\n`);
  logToFile("summary", `Warnings: ${results.warnings.join(", ")}\n`);
  logToFile("summary", `\nLog Files:\n${results.logFiles.join("\n")}\n`);

  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log(`📄 Summary log: ${logFiles.summary}`, "cyan");
  log("");

  // Close all log file streams
  Object.values(logWriters).forEach((writer) => {
    writer.end();
  });

  // Exit with error code if there are critical errors
  if (results.errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  log(`\n❌ Fatal Error: ${error.message}`, "red");
  process.exit(1);
});
