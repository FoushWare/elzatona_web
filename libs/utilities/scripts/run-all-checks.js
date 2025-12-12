#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Run All Code Quality Checks Locally
 *
 * This script runs all static analysis tools to catch issues before CI:
 * 1. ESLint (code quality and style)
 * 2. TypeScript type checking
 * 3. Prettier formatting check
 * 4. SonarQube analysis (optional)
 *
 * Results are logged to .code-quality-check.log (git-ignored)
 *
 * Usage:
 *   npm run check:all              # Run all checks
 *   npm run check:all --skip-sonar # Skip SonarQube (faster)
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Log file path (git-ignored)
const logFilePath = path.join(process.cwd(), ".code-quality-check.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "w" });

// Helper to write to both console and log file
function log(message) {
  console.log(message);
  logStream.write(message + "\n");
}

// Helper to write error to both console and log file
function _logError(message) {
  console.error(message);
  logStream.write(message + "\n");
}

const skipSonar = process.argv.includes("--skip-sonar");
const skipTests = process.argv.includes("--skip-tests");

// Initialize log file
const timestamp = new Date().toISOString();
log("");
log("════════════════════════════════════════════════════════════════");
log("🔍 Running All Code Quality Checks");
log(`📅 Started: ${timestamp}`);
log("════════════════════════════════════════════════════════════════");
log("");

let hasErrors = false;
const errors = [];
const checkResults = [];

// Helper function to run a command and catch errors
function runCheck(name, command, options = {}) {
  log(`\n📋 ${name}...`);
  log(`   Command: ${command}`);
  log("");

  const startTime = Date.now();
  let output = "";
  let success = false;

  // Write to log file
  logStream.write(`\n--- ${name} Output ---\n`);
  logStream.write(`Command: ${command}\n`);
  logStream.write(`Started: ${new Date().toISOString()}\n\n`);

  try {
    // Run command and capture both stdout and stderr
    const result = execSync(command, {
      encoding: "utf8",
      stdio: ["inherit", "pipe", "pipe"],
      ...options,
    });
    output = result || "";
    logStream.write(output);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`\n   ✅ ${name} passed (${duration}s)`);
    checkResults.push({
      name,
      status: "✅ PASSED",
      duration: `${duration}s`,
      command,
    });
    success = true;
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    // Capture both stdout and stderr
    output =
      (error.stdout || "") + (error.stderr || "") + (error.message || "");
    logStream.write(output);
    log(`\n   ❌ ${name} failed (${duration}s)`);
    if (error.message) {
      log(`   Error: ${error.message}`);
    }
    checkResults.push({
      name,
      status: "❌ FAILED",
      duration: `${duration}s`,
      command,
      error: error.message || "Unknown error",
      output: output.substring(0, 2000), // Limit output size for summary
    });
    errors.push(name);
    hasErrors = true;
    success = false;
  }

  logStream.write(`\n--- End ${name} Output ---\n`);
  logStream.write(
    `Duration: ${((Date.now() - startTime) / 1000).toFixed(2)}s\n`,
  );
  logStream.write(`Status: ${success ? "PASSED" : "FAILED"}\n\n`);

  return success;
}

// Step 1: ESLint
log("════════════════════════════════════════════════════════════════");
log("STEP 1: ESLint (Code Quality & Style)");
log("════════════════════════════════════════════════════════════════");
runCheck("ESLint", "npm run lint");

// Step 2: TypeScript Type Checking
log("\n════════════════════════════════════════════════════════════════");
log("STEP 2: TypeScript Type Checking");
log("════════════════════════════════════════════════════════════════");
runCheck("TypeScript", "npm run type-check");

// Step 3: Prettier Formatting Check
log("\n════════════════════════════════════════════════════════════════");
log("STEP 3: Prettier Formatting Check");
log("════════════════════════════════════════════════════════════════");
runCheck("Prettier", "npx prettier --check . --ignore-path .prettierignore");

// Step 4: SonarQube Analysis (optional)
if (!skipSonar) {
  log("\n════════════════════════════════════════════════════════════════");
  log("STEP 4: SonarQube Analysis (Optional)");
  log("════════════════════════════════════════════════════════════════");
  log("   💡 This requires SONAR_TOKEN environment variable");
  log("   💡 Use --skip-sonar to skip this step");
  log("");

  const sonarToken = process.env.SONAR_TOKEN;
  if (!sonarToken) {
    log("   ⚠️  SONAR_TOKEN not set, skipping SonarQube analysis");
    log("   💡 To run SonarQube: export SONAR_TOKEN=your_token");
    log("   💡 Or use: npm run sonar");
  } else {
    const sonarCommand = skipTests
      ? "npm run sonar:quick"
      : "npm run sonar:light";
    runCheck("SonarQube", sonarCommand);
  }
} else {
  log("\n════════════════════════════════════════════════════════════════");
  log("STEP 4: SonarQube Analysis (Skipped)");
  log("════════════════════════════════════════════════════════════════");
  log("   ℹ️  Use 'npm run sonar' to run SonarQube separately");
}

// Write summary to log
const endTime = new Date().toISOString();
const totalDuration = (
  (Date.now() - new Date(timestamp).getTime()) /
  1000
).toFixed(2);

logStream.write("\n");
logStream.write(
  "════════════════════════════════════════════════════════════════\n",
);
logStream.write("SUMMARY\n");
logStream.write(
  "════════════════════════════════════════════════════════════════\n",
);
logStream.write(`Started: ${timestamp}\n`);
logStream.write(`Ended: ${endTime}\n`);
logStream.write(`Total Duration: ${totalDuration}s\n\n`);

logStream.write("Check Results:\n");
checkResults.forEach((result) => {
  logStream.write(`  ${result.status} ${result.name} (${result.duration})\n`);
  if (result.error) {
    logStream.write(`    Error: ${result.error}\n`);
  }
});
logStream.write("\n");

// Summary
log("\n");
log("════════════════════════════════════════════════════════════════");
if (hasErrors) {
  log("❌ Some Checks Failed");
  log("════════════════════════════════════════════════════════════════");
  log("\nFailed checks:");
  errors.forEach((error) => {
    log(`   ❌ ${error}`);
  });
  log("\n💡 Fix the errors above before committing");
  log(`\n📄 Detailed log saved to: ${logFilePath}`);
  log(`   View with: cat ${logFilePath}`);
  log(`   Or: less ${logFilePath}`);
  logStream.end();

  // Try to read and display log file
  try {
    const logContent = fs.readFileSync(logFilePath, "utf8");
    console.log(
      "\n════════════════════════════════════════════════════════════════",
    );
    console.log("📄 LOG FILE CONTENT (Last 50 lines):");
    console.log(
      "════════════════════════════════════════════════════════════════",
    );
    const lines = logContent.split("\n");
    const lastLines = lines.slice(-50).join("\n");
    console.log(lastLines);
    console.log("\n💡 Full log available at:", logFilePath);
  } catch (_readError) {
    // If we can't read it, that's okay
  }

  process.exit(1);
} else {
  log("✅ All Checks Passed!");
  log("════════════════════════════════════════════════════════════════");
  log("\n🎉 Your code is ready to commit!");
  log(`\n📄 Log saved to: ${logFilePath}`);
  logStream.end();
  process.exit(0);
}
