const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "../../..");
const APPS_DIR = path.join(ROOT_DIR, "apps");
const LIBS_DIR = path.join(ROOT_DIR, "libs");

/**
 * Analyze file and return statistics
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const lineCount = lines.length;
  
  // Count functions/components
  const functionMatches = content.match(/(?:function|const|export\s+(?:function|const))\s+\w+/g) || [];
  const componentMatches = content.match(/(?:export\s+)?(?:default\s+)?(?:function|const)\s+\w+[^=]*[=:]\s*(?:React\.)?(?:FC|Component|forwardRef|memo)/g) || [];
  
  // Count imports
  const importMatches = content.match(/^import\s+.*from\s+['"]/gm) || [];
  
  // Count exports
  const exportMatches = content.match(/^export\s+/gm) || [];
  
  // Check for multiple responsibilities (heuristics)
  const hasState = /useState|useReducer|useRef/.test(content);
  const hasEffects = /useEffect|useLayoutEffect/.test(content);
  const hasApiCalls = /fetch|axios|useQuery|useMutation/.test(content);
  const hasEventHandlers = /onClick|onChange|onSubmit|handle[A-Z]/.test(content);
  const hasRendering = /return\s*\(|<[A-Z]/.test(content);
  
  const responsibilities = [];
  if (hasState) responsibilities.push("state");
  if (hasEffects) responsibilities.push("effects");
  if (hasApiCalls) responsibilities.push("api");
  if (hasEventHandlers) responsibilities.push("events");
  if (hasRendering) responsibilities.push("rendering");
  
  return {
    path: filePath,
    lineCount,
    functions: functionMatches.length,
    components: componentMatches.length,
    imports: importMatches.length,
    exports: exportMatches.length,
    responsibilities: responsibilities.length,
    responsibilityTypes: responsibilities,
    needsRefactoring: lineCount > 300 || responsibilities.length > 3 || functionMatches.length > 10,
  };
}

/**
 * Walk directory and analyze files
 */
function analyzeDirectory(dir, results = []) {
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
      analyzeDirectory(fullPath, results);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if ([".tsx", ".ts"].includes(ext)) {
        // Skip test and story files
        if (
          entry.name.includes(".test.") ||
          entry.name.includes(".spec.") ||
          entry.name.includes(".stories.")
        ) {
          continue;
        }
        
        try {
          const analysis = analyzeFile(fullPath);
          results.push(analysis);
        } catch (e) {
          console.error(`Error analyzing ${fullPath}:`, e.message);
        }
      }
    }
  }
  
  return results;
}

/**
 * Generate report
 */
function generateReport() {
  console.log("🔍 Analyzing files for refactoring opportunities...\n");
  
  const websiteResults = analyzeDirectory(path.join(APPS_DIR, "website"));
  const adminResults = analyzeDirectory(path.join(APPS_DIR, "admin"));
  const libsResults = analyzeDirectory(LIBS_DIR);
  
  const allResults = [...websiteResults, ...adminResults, ...libsResults];
  
  // Sort by line count
  allResults.sort((a, b) => b.lineCount - a.lineCount);
  
  // Filter files that need refactoring
  const needsRefactoring = allResults.filter(r => r.needsRefactoring);
  
  console.log(`📊 Analysis Complete\n`);
  console.log(`Total files analyzed: ${allResults.length}`);
  console.log(`Files needing refactoring: ${needsRefactoring.length}\n`);
  
  console.log("🔴 Top 30 Files Needing Refactoring:\n");
  console.log("Line Count | Functions | Components | Responsibilities | Path");
  console.log("-".repeat(100));
  
  for (const file of needsRefactoring.slice(0, 30)) {
    const relPath = path.relative(ROOT_DIR, file.path);
    console.log(
      `${String(file.lineCount).padStart(9)} | ${String(file.functions).padStart(9)} | ${String(file.components).padStart(10)} | ${String(file.responsibilities).padStart(14)} | ${relPath}`
    );
  }
  
  // Group by directory
  const byDir = {};
  for (const file of needsRefactoring) {
    const dir = path.dirname(file.path);
    if (!byDir[dir]) {
      byDir[dir] = [];
    }
    byDir[dir].push(file);
  }
  
  // Write detailed report
  const reportPath = path.join(ROOT_DIR, "docs/REFACTORING_ANALYSIS.md");
  let report = `# Refactoring Analysis Report

Generated: ${new Date().toISOString()}

## Summary

- **Total Files Analyzed:** ${allResults.length}
- **Files Needing Refactoring:** ${needsRefactoring.length}
- **Average Line Count:** ${Math.round(allResults.reduce((sum, f) => sum + f.lineCount, 0) / allResults.length)}
- **Average Functions per File:** ${Math.round(allResults.reduce((sum, f) => sum + f.functions, 0) / allResults.length)}

## Files Needing Refactoring

### Criteria
- Files with >300 lines
- Files with >3 responsibilities
- Files with >10 functions

### Top Priority Files

`;

  for (const file of needsRefactoring.slice(0, 50)) {
    const relPath = path.relative(ROOT_DIR, file.path);
    report += `#### ${path.basename(file.path)}\n`;
    report += `- **Path:** \`${relPath}\`\n`;
    report += `- **Lines:** ${file.lineCount}\n`;
    report += `- **Functions:** ${file.functions}\n`;
    report += `- **Components:** ${file.components}\n`;
    report += `- **Responsibilities:** ${file.responsibilities} (${file.responsibilityTypes.join(", ")})\n`;
    report += `- **Imports:** ${file.imports}\n`;
    report += `- **Exports:** ${file.exports}\n`;
    report += `\n`;
  }
  
  fs.writeFileSync(reportPath, report);
  console.log(`\n✅ Detailed report written to: ${reportPath}`);
}

generateReport();

