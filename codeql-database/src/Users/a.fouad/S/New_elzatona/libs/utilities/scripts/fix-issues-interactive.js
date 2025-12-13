#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Interactive Issue Fix Helper
 *
 * This script helps you fix code quality issues interactively
 * by running auto-fix commands and showing what was fixed
 */

const { execSync } = require("child_process");
// const fs = require("fs"); // Unused
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

function runCommand(command, description) {
  try {
    log(`\n🔧 ${description}...`, "cyan");
    execSync(command, { stdio: "inherit" });
    log(`✅ ${description} completed`, "green");
    return true;
  } catch (_error) {
    log(`❌ ${description} failed`, "red");
    return false;
  }
}

async function main() {
  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("🔧 Interactive Issue Fix Helper", "blue");
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("");

  const fixes = [];

  // Step 1: Prettier
  log("STEP 1: Fix Formatting Issues (Prettier)", "yellow");
  const fixPrettier = await ask("Fix formatting issues? (y/n): ");
  if (fixPrettier === "y" || fixPrettier === "yes") {
    if (runCommand("npm run format", "Fixing formatting")) {
      fixes.push("Formatting");
    }
  }

  // Step 2: ESLint
  log("\nSTEP 2: Fix ESLint Issues", "yellow");
  const fixESLint = await ask("Fix ESLint issues? (y/n): ");
  if (fixESLint === "y" || fixESLint === "yes") {
    if (runCommand("npm run lint:fix", "Fixing ESLint issues")) {
      fixes.push("ESLint");
    }
  }

  // Step 3: TypeScript
  log("\nSTEP 3: Check TypeScript Errors", "yellow");
  const checkTS = await ask("Check TypeScript errors? (y/n): ");
  if (checkTS === "y" || checkTS === "yes") {
    log("\n📋 TypeScript Errors:", "cyan");
    try {
      execSync("npm run type-check", { stdio: "inherit" });
      log("\n✅ No TypeScript errors!", "green");
    } catch (_error) {
      log("\n❌ TypeScript errors found. Please fix them manually.", "red");
      log("💡 Check the output above for specific errors.", "yellow");
    }
  }

  // Summary
  log(
    "\n════════════════════════════════════════════════════════════════",
    "blue",
  );
  if (fixes.length > 0) {
    log("✅ Fixed Issues:", "green");
    fixes.forEach((fix) => {
      log(`   ✅ ${fix}`, "green");
    });
    log("\n💡 Fixed files need to be staged:", "yellow");
    log("   git add -A", "cyan");
    log("   git commit", "cyan");
  } else {
    log("ℹ️  No auto-fixes were applied", "yellow");
  }
  log(
    "════════════════════════════════════════════════════════════════",
    "blue",
  );
  log("");

  rl.close();
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}`, "red");
  process.exit(1);
});
