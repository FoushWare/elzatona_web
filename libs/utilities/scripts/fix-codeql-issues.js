#!/usr/bin/env node

/**
 * CodeQL Issues Auto-Fix Script
 * Attempts to automatically fix common CodeQL security issues
 */

const fs = require("fs");
const path = require("path");

// Read SARIF file
const sarifFile = process.argv[2] || ".codeql-results-precommit.sarif";

if (!fs.existsSync(sarifFile)) {
  console.log("No CodeQL results file found");
  process.exit(0);
}

const sarif = JSON.parse(fs.readFileSync(sarifFile, "utf8"));
const results = sarif.runs?.[0]?.results || [];

if (results.length === 0) {
  console.log("No issues to fix");
  process.exit(0);
}

// Group issues by rule and file
const issuesByRule = {};
const issuesByFile = {};

results.forEach((result) => {
  const ruleId = result.ruleId || "unknown";
  const location =
    result.locations?.[0]?.physicalLocation?.artifactLocation?.uri;
  const line = result.locations?.[0]?.physicalLocation?.region?.startLine;
  const level = result.level || "note";
  const severity = result.properties?.["security-severity"] || 0;

  if (!issuesByRule[ruleId]) {
    issuesByRule[ruleId] = [];
  }
  if (!issuesByFile[location]) {
    issuesByFile[location] = [];
  }

  issuesByRule[ruleId].push({ location, line, level, severity });
  issuesByFile[location].push({ ruleId, line, level, severity });
});

let fixedCount = 0;

// Fix common issues
Object.entries(issuesByFile).forEach(([filePath, issues]) => {
  if (!filePath || !fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let modified = false;

  issues.forEach((issue) => {
    const { ruleId, line: lineNum } = issue;
    if (!lineNum || lineNum < 1 || lineNum > lines.length) {
      return;
    }

    const lineIndex = lineNum - 1;
    const originalLine = lines[lineIndex];
    let newLine = originalLine;

    // Fix: Missing origin verification in postMessage handler
    if (ruleId?.includes("postMessage") || ruleId?.includes("Missing origin")) {
      if (
        originalLine.includes("addEventListener('message'") ||
        originalLine.includes('addEventListener("message"')
      ) {
        // Check if origin verification exists in the next few lines
        const nextLines = lines.slice(lineIndex, lineIndex + 10).join("\n");
        if (
          !nextLines.includes("origin") ||
          !nextLines.includes("location.origin")
        ) {
          // Find the handler function and add origin check
          const handlerMatch = content.match(
            /const\s+handleMessage\s*=\s*\([^)]*\)\s*=>\s*{/,
          );
          if (handlerMatch) {
            const handlerStart = content.indexOf(handlerMatch[0]);
            const handlerBody = content.substring(handlerStart);
            const firstBrace = handlerBody.indexOf("{");
            if (
              firstBrace !== -1 &&
              !handlerBody.substring(0, firstBrace + 200).includes("origin")
            ) {
              const insertPos = handlerStart + handlerMatch[0].length;
              const originCheck = `\n      // SECURITY: Verify message origin to prevent XSS\n      if (event.origin !== window.location.origin) {\n        console.warn("Received message from untrusted origin:", event.origin);\n        return;\n      }`;
              content =
                content.substring(0, insertPos) +
                originCheck +
                content.substring(insertPos);
              modified = true;
              fixedCount++;
            }
          }
        }
      }
    }

    // Fix: Incomplete string escaping
    if (
      ruleId?.includes("Incomplete string escaping") ||
      ruleId?.includes("string escaping")
    ) {
      if (
        originalLine.includes("replace(/`/g") &&
        !originalLine.includes("replace(/\\\\/g")
      ) {
        // Add backslash escaping before backtick escaping
        newLine = originalLine.replace(/\.replace\([^)]*`[^)]*\)/, (match) => {
          if (!match.includes("\\\\")) {
            return `.replace(/\\\\/g, "\\\\\\\\").replace(/\\\`/g, "\\\\\\\`")${match.replace(/\.replace\(/, ".replace(")}`;
          }
          return match;
        });
        if (newLine !== originalLine) {
          lines[lineIndex] = newLine;
          modified = true;
          fixedCount++;
        }
      }
    }

    // Fix: Property access on null or undefined
    if (
      ruleId?.includes("null") ||
      ruleId?.includes("undefined") ||
      ruleId?.includes("Property access")
    ) {
      // Fix common patterns: obj.prop -> obj?.prop
      const patterns = [
        {
          pattern: /(\w+)\.recentActivity/g,
          replacement: "$1?.recentActivity",
        },
        { pattern: /(\w+)\.(\w+)\.(\w+)/g, replacement: "$1?.$2?.$3" },
      ];

      patterns.forEach(({ pattern, replacement }) => {
        if (pattern.test(originalLine) && !originalLine.includes("?.")) {
          newLine = originalLine.replace(pattern, replacement);
          if (newLine !== originalLine) {
            lines[lineIndex] = newLine;
            modified = true;
            fixedCount++;
          }
        }
      });
    }

    // Fix: Incomplete sanitization - add HTML tag removal
    if (
      ruleId?.includes("sanitization") ||
      ruleId?.includes("Incomplete multi-character")
    ) {
      // Look for decodeHtmlEntities calls without subsequent sanitization
      const context = lines
        .slice(
          Math.max(0, lineIndex - 5),
          Math.min(lines.length, lineIndex + 5),
        )
        .join("\n");
      if (
        context.includes("decodeHtmlEntities") &&
        !context.includes("replace(/<") &&
        !context.includes("sanitizeText")
      ) {
        // Add HTML tag removal after decodeHtmlEntities
        const nextLineIndex = lineIndex + 1;
        if (
          nextLineIndex < lines.length &&
          !lines[nextLineIndex].includes("replace(/<")
        ) {
          const sanitizeLine = lines[lineIndex].replace(
            /code\s*=/,
            'code = code.replace(/<\\/?[a-z][a-z0-9]{0,20}(?:\\s+[^>]{0,200})?>/gi, ""); // SECURITY: Remove HTML tags',
          );
          if (sanitizeLine !== lines[lineIndex]) {
            lines[lineIndex] = sanitizeLine;
            modified = true;
            fixedCount++;
          }
        }
      }
    }

    // Fix: Polynomial regex - add bounded quantifiers
    if (
      ruleId?.includes("Polynomial") ||
      ruleId?.includes("regular expression")
    ) {
      // Replace unbounded quantifiers with bounded ones
      newLine = originalLine
        .replace(/\*\)/g, "{0,200})")
        .replace(/\+\)/g, "{1,200})")
        .replace(/\?\)/g, "{0,1})");

      if (
        (newLine !== originalLine && newLine.includes("{0,200}")) ||
        newLine.includes("{1,200}")
      ) {
        lines[lineIndex] = newLine;
        modified = true;
        fixedCount++;
      }
    }

    // Fix: window -> globalThis.window
    if (
      ruleId?.includes("window") &&
      originalLine.includes("typeof window") &&
      !originalLine.includes("globalThis.window")
    ) {
      newLine = originalLine.replace(
        /typeof window/g,
        "typeof globalThis.window",
      );
      if (newLine !== originalLine) {
        lines[lineIndex] = newLine;
        modified = true;
        fixedCount++;
      }
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log(`✅ Fixed issues in ${filePath}`);
  }
});

if (fixedCount > 0) {
  console.log(`\n✅ Auto-fixed ${fixedCount} issue(s)`);
  console.log("💡 Please review the changes and stage them:");
  console.log("   git add -A");
  console.log("   git commit");
} else {
  console.log("ℹ️  No auto-fixable issues found");
  console.log("💡 Please fix issues manually");
}

process.exit(0);
