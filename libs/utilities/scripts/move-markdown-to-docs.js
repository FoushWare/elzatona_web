const fs = require("fs");
const path = require("path");

const MARKDOWN_DIR = path.join(__dirname, "../../../Markdown");
const DOCS_DIR = path.join(__dirname, "../../../docs");
const ROOT_DIR = path.join(__dirname, "../../..");

// Files to keep (essential documentation)
const KEEP_FILES = [
  "SECURITY.md",
  "COMPLETE_SECURITY_PIPELINE.md",
  "GIT_HISTORY_REMEDIATION.md",
  "SECRET_ROTATION_GUIDE.md",
  "SECRET_SCANNING_AUTOMATION.md",
  "LOCAL_DEV_ENVIRONMENT_GUIDE.md",
  "SETUP_TEST_DATABASE.md",
  "HOW_TO_GET_SUPABASE_SERVICE_ROLE_KEY.md",
];

// Files to remove (temporary, setup-specific, or obsolete)
const REMOVE_PATTERNS = [
  /^FIX_/,
  /^QUICK_/,
  /^CONFIGURE_/,
  /^UPDATE_/,
  /^DEPENDABOT_/,
  /^GITHUB_WORKFLOWS_/,
  /^GITIGNORE_/,
  /^INTEGRATION_VERIFICATION/,
  /^REPOSITORY_ACCESS_/,
  /^RESTRICT_/,
  /^VERCEL_/,
  /^PLAYWRIGHT_/,
  /^SONARCLOUD_/,
  /^README_SONARQUBE/,
  /^BEST_PRACTICES_/,
  /^COMPLETE_INTEGRATION_/,
  /^GIT_HOOKS_/,
  /^GIT_WORKFLOW_/,
  /^MEMORY_OPTIMIZATION_/,
  /^ENVIRONMENT_/,
];

// Root-level markdown files to check
const ROOT_MD_FILES = ["TESTING_SUMMARY.md"];

function shouldKeepFile(fileName) {
  // Always keep files in KEEP_FILES list
  if (KEEP_FILES.includes(fileName)) {
    return true;
  }

  // Remove files matching REMOVE_PATTERNS
  for (const pattern of REMOVE_PATTERNS) {
    if (pattern.test(fileName)) {
      return false;
    }
  }

  // Keep SECURITY.md and other essential files
  if (fileName === "SECURITY.md") {
    return true;
  }

  // Default: keep if unsure
  return true;
}

console.log("📚 Moving Markdown/ to docs/ and cleaning up...\n");

// Create docs directory if it doesn't exist
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  console.log("✅ Created docs/ directory");
}

// Process Markdown directory
if (fs.existsSync(MARKDOWN_DIR)) {
  const files = fs.readdirSync(MARKDOWN_DIR);
  let keptCount = 0;
  let removedCount = 0;

  for (const file of files) {
    const sourcePath = path.join(MARKDOWN_DIR, file);
    const destPath = path.join(DOCS_DIR, file);

    if (fs.statSync(sourcePath).isFile() && file.endsWith(".md")) {
      if (shouldKeepFile(file)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Kept: ${file}`);
        keptCount++;
      } else {
        console.log(`🗑️  Removing: ${file}`);
        removedCount++;
      }
    }
  }

  console.log(
    `\n📊 Markdown/ processing: Kept ${keptCount}, Removed ${removedCount}`,
  );

  // Remove the Markdown directory after processing
  fs.rmSync(MARKDOWN_DIR, { recursive: true, force: true });
  console.log("✅ Removed Markdown/ directory");
}

// Process root-level markdown files
console.log("\n📄 Processing root-level markdown files...");
for (const file of ROOT_MD_FILES) {
  const sourcePath = path.join(ROOT_DIR, file);
  if (fs.existsSync(sourcePath)) {
    // Move temporary files to docs or remove
    if (file === "TESTING_SUMMARY.md") {
      const destPath = path.join(DOCS_DIR, file);
      fs.copyFileSync(sourcePath, destPath);
      fs.unlinkSync(sourcePath);
      console.log(`✅ Moved ${file} to docs/`);
    }
  }
}

console.log("\n✅ Migration complete!");
console.log(`📁 Documentation is now in: docs/`);
