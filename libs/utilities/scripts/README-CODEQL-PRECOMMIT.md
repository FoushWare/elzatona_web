# CodeQL Pre-Commit Hook

This directory contains scripts for running CodeQL security analysis as a pre-commit hook.

## Overview

The pre-commit hook automatically runs CodeQL analysis on staged JavaScript/TypeScript files before each commit. If critical security issues are found, the commit is blocked and an auto-fix script attempts to resolve common issues.

## Files

- **`check-codeql-precommit.sh`**: Main script that runs CodeQL analysis on staged files
- **`fix-codeql-issues.js`**: Auto-fix script that attempts to resolve common CodeQL issues

## How It Works

1. **Pre-Commit Hook** (`.husky/pre-commit`):
   - Runs Prettier formatting (Step 1)
   - Runs GitGuardian secret scanning (Step 2)
   - **Runs CodeQL security analysis (Step 3)** ← New!
   - Stages formatted files (Step 4)

2. **CodeQL Check Process**:
   - Checks if JavaScript/TypeScript files are staged
   - Creates a CodeQL database for the codebase
   - Analyzes using `security-extended,security-and-quality` query suite
   - Parses SARIF results for critical issues (errors and high-severity warnings)
   - Blocks commit if critical issues found
   - Attempts auto-fix for common issues

3. **Auto-Fix**:
   - Fixes missing origin verification in `postMessage` handlers
   - Fixes incomplete string escaping (adds backslash escaping)
   - Fixes property access on null/undefined (adds optional chaining)
   - Fixes incomplete sanitization (adds HTML tag removal)
   - Fixes polynomial regex (adds bounded quantifiers)
   - Fixes `window` usage (replaces with `globalThis.window`)

## Installation

### Prerequisites

1. **CodeQL CLI**: Install the CodeQL CLI

   ```bash
   # macOS
   brew install codeql

   # Or download from:
   # https://github.com/github/codeql-cli-binaries/releases
   ```

2. **jq** (optional but recommended for better result parsing):
   ```bash
   brew install jq
   ```

### Setup

The pre-commit hook is already configured in `.husky/pre-commit`. No additional setup needed!

## Usage

### Automatic (Pre-Commit Hook)

The CodeQL check runs automatically on every commit:

```bash
git commit -m "Your commit message"
# CodeQL check runs automatically
```

### Manual Execution

You can also run the check manually:

```bash
# Run CodeQL pre-commit check
npm run codeql:precommit

# Auto-fix issues from a SARIF file
npm run codeql:fix [path-to-results.sarif]
```

## Behavior

### If CodeQL CLI is Not Installed

- Shows a warning
- **Non-blocking**: Allows commit to proceed
- Suggests installation instructions

### If Critical Issues Found

- **Blocks commit** (exit code 1)
- Shows summary of critical issues
- Attempts auto-fix
- Prompts to review and stage fixes

### If No Issues Found

- Shows success message
- Commit proceeds normally

### Timeouts

- Database creation: 2 minutes max
- Analysis: 3 minutes max
- If timeout occurs, check is skipped (non-blocking)

## Skipping the Check

**⚠️ NOT RECOMMENDED** - Only skip if absolutely necessary:

```bash
git commit --no-verify
```

## Auto-Fix Capabilities

The auto-fix script can automatically resolve:

1. **Missing Origin Verification**:

   ```typescript
   // Before
   window.addEventListener("message", handleMessage);

   // After
   window.addEventListener("message", (event) => {
     if (event.origin !== window.location.origin) {
       console.warn("Received message from untrusted origin:", event.origin);
       return;
     }
     handleMessage(event);
   });
   ```

2. **Incomplete String Escaping**:

   ```typescript
   // Before
   const code = `${input.replace(/`/g, "\\`")}`;

   // After
   const code = `${input.replace(/\\/g, "\\\\").replace(/`/g, "\\`")}`;
   ```

3. **Property Access on Null/Undefined**:

   ```typescript
   // Before
   dashboardStats.recentActivity.map(...)

   // After
   dashboardStats?.recentActivity?.map(...)
   ```

4. **Incomplete Sanitization**:

   ```typescript
   // Before
   code = decodeHtmlEntities(code);

   // After
   code = decodeHtmlEntities(code);
   code = code.replace(/<\/?[a-z][a-z0-9]{0,20}(?:\s+[^>]{0,200})?>/gi, "");
   ```

5. **Polynomial Regex**:

   ```typescript
   // Before
   /<code[^>]*>[\s\S]*?<\/code>/g

   // After
   /<code[^>]{0,200}>[\s\S]{0,50000}?<\/code>/g
   ```

6. **Window Usage**:

   ```typescript
   // Before
   if (typeof window !== "undefined")

   // After
   if (typeof globalThis.window !== "undefined")
   ```

## Troubleshooting

### CodeQL Check is Too Slow

The check uses timeouts to prevent hanging:

- Database creation: 2 minutes
- Analysis: 3 minutes

If it's consistently timing out, consider:

1. Running CodeQL only on push (pre-push hook)
2. Using a faster query suite (e.g., `security-and-quality` only)
3. Analyzing only changed files (already implemented)

### False Positives

Some CodeQL warnings may be false positives in React code:

- "Useless conditional" - Often false positives with dynamic state
- "Comparison between inconvertible types" - Valid TypeScript type narrowing

These are typically warnings/notices and won't block commits.

### Database Creation Fails

If database creation fails:

- Check that `npm install` works
- Try running manually: `codeql database create .codeql-database-precommit --language=javascript --source-root=.`
- The hook will skip the check if database creation fails (non-blocking)

## Integration with Other Tools

The CodeQL pre-commit hook works alongside:

- **Prettier**: Formats code (Step 1)
- **GitGuardian**: Scans for secrets (Step 2)
- **Pre-push hook**: Runs linting, type checking, and build validation

## Related Scripts

- `run-codeql-local.sh`: Full CodeQL analysis (for manual runs)
- `detect-analyze-fix.js`: Comprehensive issue detection and fixing
- `fix-all-automatically.js`: Auto-fix for linting, formatting, etc.

## Best Practices

1. **Don't skip the check** unless absolutely necessary
2. **Review auto-fixes** before committing
3. **Fix issues manually** if auto-fix doesn't work
4. **Install CodeQL CLI** for best experience
5. **Keep CodeQL updated**: `brew upgrade codeql`

## Performance

- **Typical runtime**: 30-60 seconds
- **Timeout protection**: Prevents hanging
- **Only checks staged files**: Faster than full analysis
- **Non-blocking on errors**: Won't block if CodeQL fails

## Security Benefits

The pre-commit hook catches security vulnerabilities **before** code reaches GitHub:

- XSS vulnerabilities
- ReDoS attacks
- Incomplete sanitization
- Missing origin verification
- Property access on null/undefined

This prevents security issues from entering the codebase and reduces the need for post-commit fixes.
