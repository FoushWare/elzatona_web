#!/usr/bin/env node
/**
 * Run SonarQube/SonarCloud analysis locally with memory limits
 * v1.0 - Local code quality and security analysis
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Memory limit for SonarQube scanner (in MB)
const MEMORY_LIMIT = process.env.SONAR_MEMORY_LIMIT || "1536"; // Default to light mode

console.log("");
console.log("════════════════════════════════════════════════════════════════");
console.log("🔍 SonarQube/SonarCloud Local Analysis");
console.log("════════════════════════════════════════════════════════════════");
console.log("");
console.log(`📊 Memory limit: ${MEMORY_LIMIT}MB`);
console.log("");

// Check if sonar-project.properties exists
const sonarConfigPath = path.join(process.cwd(), "sonar-project.properties");
if (!fs.existsSync(sonarConfigPath)) {
  console.error("❌ sonar-project.properties not found!");
  console.error("   Please create the configuration file first.");
  process.exit(1);
}

// Parse sonar-project.properties file
function parseSonarProperties(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const properties = {};

  content.split("\n").forEach((line) => {
    line = line.trim();
    // Skip comments and empty lines
    if (line && !line.startsWith("#")) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        properties[key] = value;
      }
    }
  });

  return properties;
}

const sonarProperties = parseSonarProperties(sonarConfigPath);
const sonarProjectKey = sonarProperties["sonar.projectKey"];
const sonarOrg = sonarProperties["sonar.organization"] || process.env.SONAR_ORG;

// Validate project key from properties file
if (!sonarProjectKey) {
  console.error("❌ sonar.projectKey not found in sonar-project.properties!");
  console.error("   Please add: sonar.projectKey=your-project-key");
  process.exit(1);
}

// Validate organization (from properties file or env var)
if (!sonarOrg) {
  console.error(
    "❌ sonar.organization not found in sonar-project.properties and SONAR_ORG not set!",
  );
  console.error("");
  console.error("   Add to sonar-project.properties:");
  console.error("   sonar.organization=your-org-key");
  console.error("");
  console.error("   Or set environment variable:");
  console.error("   export SONAR_ORG=your-org-key");
  console.error("   Or add to .env.local:");
  console.error("   SONAR_ORG=your-org-key");
  console.error("");
  process.exit(1);
}

// Check for SonarQube token (must come from environment variable for security)
const sonarToken = process.env.SONAR_TOKEN;
if (!sonarToken) {
  console.error("❌ SONAR_TOKEN environment variable not set!");
  console.error("");
  console.error("   To get your token:");
  console.error("   1. Go to https://sonarcloud.io/");
  console.error("   2. Log in with GitHub");
  console.error("   3. Go to My Account > Security");
  console.error("   4. Generate a new token");
  console.error("   5. Export it: export SONAR_TOKEN=your_token_here");
  console.error("");
  console.error("   Or add it to your .env.local file:");
  console.error("   SONAR_TOKEN=your_token_here");
  console.error("");
  console.error("   ⚠️  Never hardcode tokens in configuration files!");
  console.error("");
  process.exit(1);
}

console.log(`📋 Project Key: ${sonarProjectKey}`);
console.log(`📋 Organization: ${sonarOrg}`);
console.log("");

// Step 1: Check SonarScanner installation
console.log("📦 STEP 1: Checking SonarScanner installation...");
let sonarScannerAvailable = false;

try {
  execSync("sonar-scanner --version", { stdio: "ignore" });
  sonarScannerAvailable = true;
  console.log("   ✅ SonarScanner is installed");
} catch (_error) {
  console.log("   ⚠️  SonarScanner not found");
  console.log("   💡 Attempting to use npx (no installation needed)...");

  // Try using npx instead (no global installation needed)
  try {
    execSync("npx sonarqube-scanner --version", { stdio: "ignore" });
    sonarScannerAvailable = true;
    console.log("   ✅ SonarScanner available via npx");
  } catch (_npxError) {
    console.log("   ⚠️  SonarScanner not available via npx");
    console.log("");
    console.log("   📦 Installation options:");
    console.log("");
    console.log("   Option 1: Install globally (recommended)");
    console.log("   npm install -g sonarqube-scanner");
    console.log("");
    console.log("   Option 2: Use npx (no installation)");
    console.log("   The script will try to use npx automatically");
    console.log("");
    console.log("   Option 3: Use Docker");
    console.log(
      "   docker run --rm -v $(pwd):/usr/src sonarsource/sonar-scanner-cli",
    );
    console.log("");
    console.log("   Continuing with npx attempt...");
  }
}
console.log("");

// Step 2: Run tests with coverage (optional)
const skipTests = process.argv.includes("--skip-tests");
if (!skipTests) {
  console.log("🧪 STEP 2: Running tests with coverage...");
  console.log("   ⏳ This may take a moment...");
  console.log("");

  try {
    execSync(
      "npm run test:unit -- --coverage --coverageReporters=lcov --coverageDirectory=coverage",
      {
        stdio: "inherit",
        env: {
          ...process.env,
          NODE_OPTIONS: `--max-old-space-size=${MEMORY_LIMIT}`,
          JEST_MAX_WORKERS: "1",
        },
      },
    );
    console.log("");
    console.log("   ✅ Tests completed with coverage");
  } catch (_error) {
    console.log("");
    console.log("   ⚠️  Tests failed or no coverage generated");
    console.log("   💡 Continuing with SonarQube analysis anyway...");
  }
  console.log("");
} else {
  console.log("🧪 STEP 2: Skipping tests (--skip-tests flag used)");
  console.log("");
}

// Step 3: Build project (optional)
const skipBuild = process.argv.includes("--skip-build");
if (!skipBuild) {
  console.log("🏗️  STEP 3: Building project...");
  console.log("   ⏳ This may take a moment...");
  console.log("");

  try {
    execSync("npm run build", {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_OPTIONS: `--max-old-space-size=${MEMORY_LIMIT}`,
      },
    });
    console.log("");
    console.log("   ✅ Build completed");
  } catch (_error) {
    console.log("");
    console.log("   ⚠️  Build failed");
    console.log("   💡 Continuing with SonarQube analysis anyway...");
  }
  console.log("");
} else {
  console.log("🏗️  STEP 3: Skipping build (--skip-build flag used)");
  console.log("");
}

// Step 4: Run SonarQube analysis
console.log("🔍 STEP 4: Running SonarQube/SonarCloud analysis...");
console.log("   ⏳ This may take a few minutes...");
console.log("");

try {
  const sonarArgs = [
    `-Dsonar.projectKey=${sonarProjectKey}`,
    `-Dsonar.organization=${sonarOrg}`,
    `-Dsonar.host.url=https://sonarcloud.io`,
    `-Dsonar.login=${sonarToken}`,
    `-Dsonar.verbose=true`,
    `-Dsonar.scanner.dumpToFile=./sonar-scanner.log`,
  ];

  // Add coverage if available
  const coveragePath = path.join(process.cwd(), "coverage", "lcov.info");
  if (fs.existsSync(coveragePath)) {
    sonarArgs.push(`-Dsonar.javascript.lcov.reportPaths=${coveragePath}`);
    sonarArgs.push(`-Dsonar.typescript.lcov.reportPaths=${coveragePath}`);
    console.log("   📊 Coverage report found, including in analysis");
  }

  // Use npx if sonar-scanner is not globally available
  const scannerCommand = sonarScannerAvailable
    ? "sonar-scanner"
    : "npx sonarqube-scanner";

  // Set memory limit for SonarScanner
  const sonarCommand = `NODE_OPTIONS="--max-old-space-size=${MEMORY_LIMIT}" ${scannerCommand} ${sonarArgs.join(" ")}`;

  console.log("🚀 Starting SonarQube analysis with verbose output...");
  console.log(`📝 Command: ${sonarCommand}`);
  console.log("");

  execSync(sonarCommand, {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_OPTIONS: `--max-old-space-size=${MEMORY_LIMIT}`,
      SONAR_TOKEN: sonarToken,
      SONAR_ORG: sonarOrg,
      SONAR_VERBOSE: "true",
      SONAR_SCANNER_OPTS: "-Dsonar.verbose=true",
    },
  });

  console.log("");
  console.log(
    "════════════════════════════════════════════════════════════════",
  );
  console.log("✅ SonarQube Analysis Completed Successfully!");
  console.log(
    "════════════════════════════════════════════════════════════════",
  );
  console.log("");
  console.log(
    `📊 View results at: https://sonarcloud.io/dashboard?id=${sonarProjectKey}`,
  );
  console.log("");
} catch (_error) {
  console.log("");
  console.error("❌ SonarQube analysis failed");
  console.error("");
  console.error("Common issues:");
  console.error("  1. Check SONAR_TOKEN is correct (from .env.local)");
  console.error(
    `  2. Check organization in sonar-project.properties: ${sonarOrg}`,
  );
  console.error(
    `  3. Check project key in sonar-project.properties: ${sonarProjectKey}`,
  );
  console.error("  4. Ensure project exists in SonarCloud");
  console.error("  5. Check network connection");
  console.error("");
  process.exit(1);
}
