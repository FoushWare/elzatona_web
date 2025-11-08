# Check Build and Push Command

A comprehensive command that checks for build errors, runs tests, attempts to fix them automatically, and pushes to GitHub.

**Related Commands:**

- [Code Review Checklist](./code-review-checklist.md) - Use after pushing for thorough code review
- [Security Audit](./security-audit.md) - Run periodically for security review

## Quick Start

```bash
npm run build:check-and-push
```

Or specify a branch:

```bash
.cursor/check-build-and-push.sh main
```

## What It Does

This command performs the following steps in sequence:

**Note:** The duplicate `/gh` command has been removed. Use `/gh-push` instead.

### 1. 🔍 Check for Uncommitted Changes

- Automatically stages all uncommitted changes
- Prepares the working directory for commit

### 2. 🔧 Run Linting with Auto-Fix

- Executes `npm run lint:fix` to automatically fix linting errors
- Stages any fixes made by the linter
- Continues even if some linting issues remain (non-blocking)

### 3. 🔍 Check TypeScript Errors

- Runs `tsc --noEmit` to check for type errors
- Reports TypeScript errors but continues to build check
- Helps identify type issues before build

### 4. 🏗️ Run Build Check

- Executes `npm run build` to verify the project builds successfully
- Captures build output for error analysis
- **This step must pass** for the script to continue

### 5. 🧪 Run Tests

- Executes `npm test` to run all tests
- **This step must pass** for the script to continue
- Captures test output for error analysis
- Attempts to fix missing test dependencies automatically

#### Auto-Fix Test Errors

The script attempts to automatically fix common test errors:

##### Missing Test Dependencies

- **Detects**: "Cannot find module" or "Module not found" errors in tests
- **Fixes**: Runs `npm install` to reinstall dependencies
- **Retries**: Automatically retries tests after fixing

##### Vercel-Related Test Errors

- **Detects**: Vercel-related errors in test output
- **Fixes**: Uses Vercel CLI to pull environment variables
- **Retries**: Automatically retries tests after fixing

##### Test Failures

- **Detects**: Any test failures
- **Action**: Reports failures and exits (requires manual fix)
- **Message**: Provides helpful output showing which tests failed

### 6. 🔧 Auto-Fix Common Build Errors

The script attempts to automatically fix common build errors:

#### Vercel-Related Errors

- **Detects**: Errors containing "vercel", "Vercel", or "VERCEL"
- **Fixes**:
  - Uses Vercel CLI to pull environment variables (`vercel env pull`)
  - Links Vercel project if not linked (`vercel link`)
  - Checks Vercel deployment status
- **Requirements**: Vercel CLI must be installed (`npm i -g vercel`)

#### Missing Dependencies

- **Detects**: "Cannot find module" or "Module not found" errors
- **Fixes**: Runs `npm install` to reinstall dependencies
- **Retries**: Automatically retries the build after fixing

#### Syntax Errors

- **Detects**: SyntaxError or ParseError
- **Action**: Reports error and exits (requires manual fix)

#### Type Errors

- **Detects**: TypeScript type errors
- **Action**: Reports error and exits (requires manual fix)

### 7. 📝 Commit Changes

- Creates a commit with all fixes if any changes were made
- Uses a descriptive commit message:

  ```
  fix(build): resolve build errors, test failures, and linting issues

  - Auto-fixed linting errors
  - Resolved build issues
  - Fixed test failures
  - Updated dependencies if needed
  ```

- **Note**: After committing, consider running a [code review](./code-review-checklist.md) before pushing

### 7. 🔒 Security Audit Check

- **Scans for hardcoded secrets** in staged files
- **Prevents .env files** from being committed (automatically unstages them)
- **Runs npm audit** to check for dependency vulnerabilities
- **Reports security issues** but allows continuation (non-blocking)
- **Provides warnings** for potential security risks

#### Security Checks Performed

##### Hardcoded Secrets Detection

- **Detects**: Common patterns like `password=`, `secret=`, `key=`, `token=` with hardcoded values
- **Action**: Warns about potential secrets but allows continuation
- **Recommendation**: Review and move secrets to environment variables

##### .env File Protection

- **Detects**: `.env`, `.env.local`, `.env.production` files in staged changes
- **Fixes**: Automatically unstages .env files to prevent accidental commits
- **Action**: Prevents sensitive environment files from being pushed

##### Dependency Vulnerabilities

- **Runs**: `npm audit --audit-level=moderate`
- **Reports**: Known vulnerabilities in dependencies
- **Action**: Shows audit results but doesn't block push
- **Recommendation**: Review and update vulnerable packages

### 8. 🚀 Push to GitHub

- Pushes to the specified branch (or current branch)
- **Auto-fixes GitHub issues** using GitHub CLI or MCP tools
- Provides helpful error messages if push fails
- Suggests solutions for common git issues
- **Post-push**: Consider running [security-audit.md](./security-audit.md) for security review

#### Auto-Fix GitHub Issues

The script automatically handles common GitHub push errors:

##### Upstream Branch Not Set

- **Detects**: "no upstream branch" or "set upstream" errors
- **Fixes**: Automatically sets upstream with `git push -u origin <branch>`
- **Retries**: Automatically retries push after setting upstream

##### Remote Changes Detected

- **Detects**: "rejected", "non-fast-forward", or "fetch first" errors
- **Fixes**:
  - Uses GitHub CLI to check repository status (if available)
  - Pulls and rebases changes automatically
  - Retries push after successful rebase
- **Requirements**: GitHub CLI (`gh`) recommended for better error handling

##### Authentication Issues

- **Detects**: "permission", "authentication", or "unauthorized" errors
- **Fixes**:
  - Checks GitHub CLI authentication status
  - Verifies git remote configuration
  - Provides instructions for authentication setup

##### Branch/Remote Not Found

- **Detects**: "branch not found" or "remote not found" errors
- **Fixes**:
  - Uses GitHub CLI to get repository URL
  - Sets up git remote if missing
  - Configures origin remote automatically

## Usage Examples

### Basic Usage

```bash
# Uses current branch
npm run build:check-and-push
```

### Specify Branch

```bash
.cursor/check-build-and-push.sh main
.cursor/check-build-and-push.sh develop
.cursor/check-build-and-push.sh feature/my-feature
```

### Direct Script Execution

```bash
bash .cursor/check-build-and-push.sh
```

## Expected Output

### Successful Run

```
🔍 Checking build errors and preparing to push to GitHub...
Branch: main

⚠️  You have uncommitted changes. Staging all changes...
✅ Changes staged

🔧 Running linter with auto-fix...
✅ Linting passed

🔍 Checking TypeScript errors...
✅ TypeScript check passed

🏗️  Running build check...
✅ Build successful!

🧪 Running tests...
✅ All tests passed!

📝 Committing changes...
✅ Changes committed

🚀 Pushing to GitHub (branch: main)...
✅ Successfully pushed to GitHub!

🎉 All done! Build is clean, tests passed, and code is pushed.
```

### Build Failure (Auto-Fixed - Dependencies)

```
🏗️  Running build check...
❌ Build failed!
Build output (last 50 lines):
...

🔧 Detected missing module error. Attempting to fix...
✅ Dependencies reinstalled. Retrying build...
✅ Build successful after dependency fix!
```

### Build Failure (Auto-Fixed - Vercel)

```
🏗️  Running build check...
❌ Build failed!
Build output (last 50 lines):
...

🔧 Detected Vercel-related error. Attempting to fix with Vercel CLI...
📦 Checking Vercel configuration...
✅ Vercel environment variables pulled
🔄 Retrying build...
✅ Build successful after Vercel fix!
```

### Test Failure (Auto-Fixed)

```
🧪 Running tests...
❌ Tests failed!
Test output (last 50 lines):
...

🔧 Detected missing test dependencies. Attempting to fix...
✅ Dependencies reinstalled. Retrying tests...
✅ Tests passed after dependency fix!
```

### Test Failure (Auto-Fixed - Vercel)

```
🧪 Running tests...
❌ Tests failed!
Test output (last 50 lines):
...

🔧 Detected Vercel-related test error. Attempting to fix...
✅ Vercel environment variables pulled. Retrying tests...
✅ Tests passed after Vercel fix!
```

### Test Failure (Manual Fix Required)

```
🧪 Running tests...
❌ Tests failed!
Test output (last 50 lines):
...

⚠️  Test failures detected. Please fix tests before pushing.
```

### Push Failure (Auto-Fixed - Upstream)

```
🚀 Pushing to GitHub (branch: main)...
❌ Failed to push to GitHub
Push output:
fatal: The current branch main has no upstream branch.

🔧 Detected upstream issue. Setting upstream branch...
✅ Successfully pushed with upstream set!
🎉 All done! Build is clean, tests passed, and code is pushed.
```

### Push Failure (Auto-Fixed - Rebase)

```
🚀 Pushing to GitHub (branch: main)...
❌ Failed to push to GitHub
Push output:
! [rejected]        main -> main (non-fast-forward)

🔧 Detected remote changes. Attempting to pull and rebase...
✅ Successfully pulled and rebased. Retrying push...
✅ Successfully pushed after rebase!
🎉 All done! Build is clean, tests passed, and code is pushed.
```

### Build Failure (Manual Fix Required)

```
🏗️  Running build check...
❌ Build failed!
Build output (last 50 lines):
...

⚠️  Type errors detected. Please fix manually.
```

## Error Handling

### Non-Blocking Errors

- **Linting failures**: Script continues to build check
- **TypeScript warnings**: Script continues to build check

### Blocking Errors

- **Build failures**: Script stops and reports error
- **Test failures**: Script stops and reports error (unless auto-fixed)
- **Syntax errors**: Script stops (requires manual fix)
- **Type errors**: Script stops (requires manual fix)
- **Push failures**: Script stops with helpful suggestions

## Troubleshooting

### Build Fails with Vercel Errors

The script will automatically:

1. Detect Vercel-related errors
2. Use Vercel CLI to pull environment variables
3. Link Vercel project if needed
4. Retry the build

**Requirements:**

- Install Vercel CLI: `npm i -g vercel`
- Ensure you're logged in: `vercel login`
- Have a Vercel project linked or be in a Vercel project directory

If it still fails:

- Check Vercel project configuration
- Verify environment variables in Vercel dashboard
- Check `vercel.json` configuration file

### Build Fails with Missing Modules

The script will automatically:

1. Detect the missing module error
2. Run `npm install`
3. Retry the build

If it still fails, check:

- Package.json dependencies
- Node modules installation
- Version conflicts

### Push Fails

The script will automatically attempt to:

1. Set upstream branch if missing
2. Pull and rebase remote changes
3. Check GitHub authentication
4. Configure git remote if missing

**Requirements:**

- GitHub CLI (`gh`) recommended for better error handling
- Install: `brew install gh` (macOS) or `npm i -g @github/cli`
- Authenticate: `gh auth login`

If automatic fixes don't work:

- Set upstream manually: `git push -u origin <branch>`
- Pull latest: `git pull origin <branch>`
- Resolve conflicts manually
- Check authentication: `gh auth status`

### TypeScript Errors

The script reports TypeScript errors but doesn't auto-fix them. You need to:

1. Review the reported errors
2. Fix type issues manually
3. Run the command again

### Test Failures

The script will attempt to fix missing dependencies, but actual test failures need manual fixing:

1. Review the test output to see which tests failed
2. Fix the failing tests
3. Run the command again
4. Use `npm test` to run tests individually for debugging

## Integration

This command is integrated into `package.json`:

```json
{
  "scripts": {
    "build:check-and-push": "bash .cursor/check-build-and-push.sh"
  }
}
```

## Script Location

The actual script is located at:

```
.cursor/check-build-and-push.sh
```

## Notes

- The script uses colored output for better readability
- All temporary files are stored in `/tmp/` (lint-output.log, tsc-output.log)
- The script does not use `set -e` to allow graceful error handling
- Git operations are performed automatically (stage, commit, push)
- The script respects your current git branch unless specified
- **Vercel CLI** is used automatically when Vercel errors are detected
- **GitHub CLI** (`gh`) is used for better GitHub error handling (optional but recommended)
- The script attempts to use MCP tools for GitHub operations when available

## Best Practices

1. **Run before pushing manually**: Use this command instead of manual git push
2. **Fix TypeScript errors first**: The script reports but doesn't fix type errors
3. **Fix test failures**: Ensure all tests pass before pushing
4. **Review auto-fixes**: Check what the linter changed before committing
5. **Use specific branches**: Specify branch name when working on feature branches
6. **Run tests locally first**: Use `npm test` to debug test failures before running this command
7. **Code review**: After pushing, use [code-review-checklist.md](./code-review-checklist.md) for thorough code review
8. **Security audit**: Periodically run [security-audit.md](./security-audit.md) to ensure codebase security

## Related Commands

### NPM Scripts

- `npm run build` - Standard build command
- `npm run build:check` - Build with validation
- `npm run lint:fix` - Fix linting errors only
- `npm test` - Run all tests
- `npm run test:admin-login` - Run admin login tests
- `npm run test:e2e` - Run end-to-end tests

### Related Documentation

- [code-review-checklist.md](./code-review-checklist.md) - Comprehensive checklist for code reviews
- [security-audit.md](./security-audit.md) - Security audit guide for identifying and fixing vulnerabilities

## External Tools Used

### Vercel CLI

- **Install**: `npm i -g vercel`
- **Login**: `vercel login`
- **Commands used**:
  - `vercel env pull` - Pull environment variables
  - `vercel link` - Link Vercel project
  - `vercel inspect` - Check deployment status

### GitHub CLI

- **Install**: `brew install gh` (macOS) or `npm i -g @github/cli`
- **Login**: `gh auth login`
- **Commands used**:
  - `gh repo view` - Check repository status
  - `gh auth status` - Check authentication
  - `gh repo view --json url` - Get repository URL

### GitHub MCP Tools

When running through an AI agent (like Cursor), the script can leverage GitHub MCP tools for:

- Creating issues for build/test failures
- Checking repository status
- Managing pull requests
- Viewing deployment status
- Accessing repository information

The script will use GitHub CLI when available, and MCP tools can be used by the AI agent to provide additional assistance.
