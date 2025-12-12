# Pre-Push Checks: ESLint, TypeScript, and SonarQube

Complete guide to running and fixing all checks before pushing to GitHub.

## 🚀 Quick Start (Recommended)

```bash
# Run all checks at once (fastest way)
npm run check:all:quick

# Or with SonarQube (slower but comprehensive)
npm run check:all
```

## 📋 Individual Checks

### 1. ESLint (Code Quality)

**Run:**

```bash
npm run lint
```

**Fix automatically:**

```bash
npm run lint:fix
```

**What it checks:**

- Code quality issues
- Style violations
- Potential bugs
- Best practices
- Unused variables
- Import errors

**Common fixes:**

```bash
# Auto-fix most issues
npm run lint:fix

# Then stage fixed files
git add -A
```

### 2. TypeScript (Type Checking)

**Run:**

```bash
npm run type-check
```

**Fix manually:**
TypeScript errors must be fixed manually. The output shows:

- Which files have errors
- Line numbers
- Error messages

**Example fix:**

```typescript
// ❌ Error: Parameter 'x' implicitly has an 'any' type
function test(x) {}

// ✅ Fix: Add type annotation
function test(x: string) {}
```

**Common TypeScript errors:**

- Missing type annotations → Add types
- Type mismatches → Fix types
- Missing imports → Add imports
- Module not found → Check import paths

### 3. SonarQube (Security & Quality)

**Run:**

```bash
# Quick (skip tests and build)
npm run sonar:quick

# Light (skip tests)
npm run sonar:light

# Full (includes tests and build)
npm run sonar
```

**Prerequisites:**

- `SONAR_TOKEN` must be set in `.env.local`
- Token is automatically loaded from `.env.local`

**What it checks:**

- Security vulnerabilities
- Code smells
- Code duplication
- Test coverage
- Maintainability issues

**View results:**
After running, visit: https://sonarcloud.io/dashboard?id=FoushWare_GreatFrontendHub

## 🔧 Complete Pre-Push Workflow

### Step-by-Step Process

```bash
# 1. Make your changes
# ... edit files ...

# 2. Run all checks
npm run check:all:quick

# 3. Fix issues automatically
npm run fix:all

# 4. Check TypeScript (must fix manually)
npm run type-check

# 5. Fix any remaining TypeScript errors
# ... edit files to fix errors ...

# 6. Run checks again to verify
npm run check:all:quick

# 7. Stage all changes
git add -A

# 8. Commit (hooks will verify)
git commit -m "your message"

# 9. Push (hooks will run full checks)
git push
```

## 🎯 Fixing Issues

### ESLint Issues

**Auto-fixable:**

```bash
npm run lint:fix
git add -A
```

**Manual fixes:**

- Unused variables → Remove or prefix with `_`
- Missing dependencies → Add to useEffect dependencies
- Explicit any → Add proper types or disable with comment

**Example:**

```typescript
// ❌ Error: 'unusedVar' is defined but never used
const unusedVar = "test";

// ✅ Fix: Prefix with underscore
const _unusedVar = "test";
```

### TypeScript Issues

**Common fixes:**

1. **Missing type annotation:**

```typescript
// ❌ Error: Parameter 'x' implicitly has an 'any' type
function test(x) {}

// ✅ Fix
function test(x: string) {}
```

2. **Type mismatch:**

```typescript
// ❌ Error: Type 'string' is not assignable to type 'number'
const num: number = "123";

// ✅ Fix
const num: number = 123;
```

3. **Module not found:**

```typescript
// ❌ Error: Cannot find module '@/components/Button'
import { Button } from "@/components/Button";

// ✅ Fix: Check import path or create the file
import { Button } from "@elzatona/components";
```

### SonarQube Issues

**Security vulnerabilities:**

- Fix immediately (high priority)
- Usually related to XSS, injection, or insecure patterns

**Code smells:**

- Refactor complex code
- Remove duplication
- Improve maintainability

**View detailed issues:**

1. Run `npm run sonar:quick`
2. Visit SonarCloud dashboard
3. Review issues by severity
4. Fix and re-run

## 🛠️ Helper Commands

### Auto-Fix Everything

```bash
# Fix formatting and ESLint
npm run fix:all

# Then stage
git add -A
```

### Interactive Fix Helper

```bash
# Step-by-step interactive fixing
npm run fix:issues
```

### Check Everything

```bash
# All checks (quick, no SonarQube)
npm run check:all:quick

# All checks (with SonarQube)
npm run check:all
```

## 📄 Understanding Output

### ESLint Output

```
✖ 5 problems (2 errors, 3 warnings)
  apps/website/file.tsx
    10:5  error  'x' is defined but never used
    15:3  warning  Unexpected any
```

**Fix:**

```bash
npm run lint:fix  # Auto-fixes what it can
# Then fix remaining issues manually
```

### TypeScript Output

```
apps/website/file.tsx:10:5 - error TS2322: Type 'string' is not assignable to type 'number'.
```

**Fix:** Edit the file to fix the type error

### SonarQube Output

```
✅ SonarQube Analysis Completed Successfully!
📊 View results at: https://sonarcloud.io/dashboard?id=...
```

**Fix:** Visit the dashboard to see detailed issues

## 🚨 When Checks Fail

### ESLint Fails

```bash
# 1. Try auto-fix
npm run lint:fix

# 2. Check remaining issues
npm run lint

# 3. Fix manually or disable rule (if justified)
# eslint-disable-next-line @typescript-eslint/no-explicit-any
```

### TypeScript Fails

```bash
# 1. See all errors
npm run type-check

# 2. Fix each error
# - Add missing types
# - Fix type mismatches
# - Add missing imports

# 3. Verify
npm run type-check
```

### SonarQube Fails

```bash
# 1. Run analysis
npm run sonar:quick

# 2. View dashboard
# https://sonarcloud.io/dashboard?id=FoushWare_GreatFrontendHub

# 3. Fix high-severity issues first
# - Security vulnerabilities
# - Code smells
# - Duplications

# 4. Re-run
npm run sonar:quick
```

## 🔄 Git Hooks (Automatic)

The git hooks automatically run checks:

### Pre-Commit Hook

- ✅ Prettier (auto-fixes)
- ✅ ESLint (auto-fixes)
- ⚠️ TypeScript (shows errors)

### Pre-Push Hook

- ✅ Prettier (auto-fixes)
- ✅ ESLint (auto-fixes)
- ⚠️ TypeScript (shows errors)
- ✅ Build check
- ✅ SonarQube (if token set)

**If hook blocks you:**

1. Read the error message
2. Run the suggested fix command
3. Try again

## 📊 Log Files

All results are logged to:

- `.code-quality-check.log` (git-ignored)

**View logs:**

```bash
# View full log
cat .code-quality-check.log

# View last 50 lines
tail -50 .code-quality-check.log

# Search for errors
grep -i "error" .code-quality-check.log
```

## ⚡ Quick Reference

| Check      | Run                       | Auto-Fix           | Manual Fix |
| ---------- | ------------------------- | ------------------ | ---------- |
| ESLint     | `npm run lint`            | `npm run lint:fix` | Edit code  |
| TypeScript | `npm run type-check`      | ❌ No              | Edit code  |
| SonarQube  | `npm run sonar:quick`     | ❌ No              | Edit code  |
| All        | `npm run check:all:quick` | `npm run fix:all`  | Edit code  |

## 🎯 Recommended Workflow

```bash
# 1. Before starting work
npm run check:all:quick  # See current state

# 2. Make your changes
# ... edit files ...

# 3. Auto-fix what you can
npm run fix:all

# 4. Check TypeScript
npm run type-check
# Fix any errors shown

# 5. Verify everything
npm run check:all:quick

# 6. Commit (hooks will verify)
git add -A
git commit -m "your message"

# 7. Push (hooks will run full checks)
git push
```

## 🚨 Emergency: Skip Checks

**Not recommended, but if absolutely necessary:**

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

**⚠️ Warning:** Only use in emergencies. Always fix issues properly.

## 📚 Related Documentation

- `README-FIX-ISSUES.md` - Detailed fix guide
- `README-GIT-HOOKS.md` - Git hooks documentation
- `README-CODE-QUALITY.md` - All code quality tools
- `README-ENV-VARIABLES.md` - Environment variables setup
