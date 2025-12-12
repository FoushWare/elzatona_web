#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Batch Fix ESLint Issues
 *
 * This script helps fix ESLint issues systematically:
 * 1. Auto-fixes what it can
 * 2. Shows remaining issues by category
 * 3. Provides targeted fix commands
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
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n🔧 ${description}...`, "cyan");
    const output = execSync(command, { encoding: "utf8", stdio: "pipe" });
    return { success: true, output };
  } catch (error) {
    return {
      success: false,
      output: error.stdout || error.stderr || error.message,
    };
  }
}

async function main() {
  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("🔧 Batch ESLint Issue Fixer", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("");

  // Step 1: Auto-fix what we can
  log("STEP 1: Auto-fixing issues...", "yellow");
  const fixResult = runCommand("npm run lint:fix", "Auto-fixing ESLint issues");

  if (fixResult.success) {
    log("✅ Auto-fix completed", "green");
  } else {
    log("⚠️  Some issues couldn't be auto-fixed", "yellow");
  }

  // Step 2: Check remaining issues
  log("\nSTEP 2: Checking remaining issues...", "yellow");
  const checkResult = runCommand("npm run lint", "Checking remaining issues");

  if (checkResult.success) {
    log("✅ No remaining issues!", "green");
    log("\n🎉 All ESLint issues are fixed!", "green");
    return;
  }

  // Step 3: Analyze issues
  log("\nSTEP 3: Analyzing remaining issues...", "yellow");
  const output = checkResult.output;

  // Count issues
  const errorMatch = output.match(
    /(\d+) problems? \(([0-9]+) error[s]?, ([0-9]+) warning[s]?\)/,
  );
  if (errorMatch) {
    const total = errorMatch[1];
    const errors = errorMatch[2];
    const warnings = errorMatch[3];

    log(`\n📊 Issue Summary:`, "blue");
    log(`   Total: ${total} problems`, "blue");
    log(`   Errors: ${errors}`, errors > 0 ? "red" : "green");
    log(`   Warnings: ${warnings}`, warnings > 0 ? "yellow" : "green");
  }

  // Extract common issue patterns
  const unusedVarMatches = output.match(/'(\w+)' is defined but never used/g);
  const explicitAnyMatches = output.match(/Unexpected any/g);
  const missingDepsMatches = output.match(/React Hook.*missing dependency/g);

  log("\n📋 Common Issue Categories:", "blue");

  if (unusedVarMatches) {
    log(`   ⚠️  Unused variables: ${unusedVarMatches.length}`, "yellow");
    log("      Fix: Prefix with _ or remove", "cyan");
  }

  if (explicitAnyMatches) {
    log(`   ⚠️  Explicit 'any' types: ${explicitAnyMatches.length}`, "yellow");
    log("      Fix: Add proper types or use eslint-disable comment", "cyan");
  }

  if (missingDepsMatches) {
    log(`   ⚠️  Missing dependencies: ${missingDepsMatches.length}`, "yellow");
    log("      Fix: Add to useEffect dependency array", "cyan");
  }

  // Step 4: Save detailed report
  const reportFile = ".eslint-issues-report.txt";
  fs.writeFileSync(reportFile, output);
  log(`\n📄 Full report saved to: ${reportFile}`, "blue");

  // Step 5: Provide fix strategy
  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("💡 Fix Strategy", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("");
  log("1. Fix errors first (they block builds):", "yellow");
  log("   npm run lint 2>&1 | grep 'error'", "cyan");
  log("");
  log("2. Fix warnings in batches:", "yellow");
  log("   - Unused variables: Search and prefix with _", "cyan");
  log("   - Explicit any: Add types or disable with comment", "cyan");
  log("   - Missing deps: Add to dependency arrays", "cyan");
  log("");
  log("3. View full report:", "yellow");
  log(`   cat ${reportFile}`, "cyan");
  log("");
  log("4. Fix by file (focus on one file at a time):", "yellow");
  log("   npm run lint -- apps/website/path/to/file.tsx", "cyan");
  log("");

  // Show first few errors
  const errorLines = output
    .split("\n")
    .filter((line) => line.includes("error"));
  if (errorLines.length > 0) {
    log("🔴 First few errors:", "red");
    errorLines.slice(0, 5).forEach((line) => {
      log(`   ${line}`, "red");
    });
    if (errorLines.length > 5) {
      log(`   ... and ${errorLines.length - 5} more`, "yellow");
    }
  }

  log("\n");
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}`, "red");
  process.exit(1);
});
