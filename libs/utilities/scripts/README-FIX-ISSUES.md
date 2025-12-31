# Fix Issues Before Commit/Push

This guide shows you how to automatically fix code quality issues before committing or pushing.

## 🚀 Quick Fix (Recommended)

```bash
# Auto-fix all fixable issues
npm run fix:all
```

This runs:

- `npm run format` - Fixes formatting
- `npm run lint:fix` - Fixes ESLint issues

## 🔧 Interactive Fix Helper

For step-by-step fixing with prompts:

```bash
npm run fix:issues
```

This will:

1. Ask if you want to fix formatting
2. Ask if you want to fix ESLint issues
3. Show TypeScript errors (if any)
4. Provide a summary of what was fixed

## 📋 Git Hooks (Automatic)

The git hooks automatically try to fix issues:

### Pre-Commit Hook

- ✅ **Auto-fixes** Prettier formatting
- ✅ **Auto-fixes** ESLint issues (where possible)
- ⚠️ **Shows** TypeScript errors (must fix manually)
- ✅ **Re-stages** fixed files automatically

### Pre-Push Hook

- ✅ **Auto-fixes** Prettier formatting
- ✅ **Auto-fixes** ESLint issues (where possible)
- ⚠️ **Shows** TypeScript errors (must fix manually)
- ✅ **Runs** Build check
- ✅ **Runs** SonarQube (if token is set)

## 💡 Workflow Examples

### Before Committing

```bash
# Option 1: Let the hook auto-fix (recommended)
git commit -m "your message"
# Hook will auto-fix and re-stage files

# Option 2: Fix manually first
npm run fix:all
git add -A
git commit -m "your message"
```

### When Hook Blocks Commit

If the hook blocks your commit:

```bash
# 1. See what failed
# (The hook shows this automatically)

# 2. Auto-fix what you can
npm run fix:all

# 3. Fix TypeScript errors manually
npm run type-check
# (Fix the errors shown)

# 4. Try committing again
git add -A
git commit -m "your message"
```

### Before Pushing

```bash
# Option 1: Let the hook check everything
git push
# Hook will run all checks including build

# Option 2: Check manually first
npm run check:all:quick
# Fix any issues
git push
```

## 🎯 Common Issues & Fixes

### Formatting Issues

```bash
npm run format
git add -A
```

### ESLint Issues

```bash
npm run lint:fix
git add -A
```

### TypeScript Errors

```bash
npm run type-check
# Fix errors shown
git add -A
```

### Build Errors

```bash
npm run build
# Fix errors shown
```

## 📄 Log Files

All fixes and checks are logged to:

- `.code-quality-check.log` (git-ignored)

View logs:

```bash
cat .code-quality-check.log
tail -f .code-quality-check.log  # Watch in real-time
```

## ⚡ Quick Reference

| Issue      | Fix Command        | Auto-Fix? |
| ---------- | ------------------ | --------- |
| Formatting | `npm run format`   | ✅ Yes    |
| ESLint     | `npm run lint:fix` | ✅ Yes    |
| TypeScript | Fix manually       | ❌ No     |
| Build      | Fix manually       | ❌ No     |

## 🔄 Complete Workflow

```bash
# 1. Make your changes
# ... edit files ...

# 2. Auto-fix what you can
npm run fix:all

# 3. Stage changes
git add -A

# 4. Commit (hook will check and auto-fix)
git commit -m "your message"

# 5. Push (hook will check everything)
git push
```

## 🚨 Emergency: Skip Checks

If you absolutely must skip checks (not recommended):

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

**⚠️ Warning:** Only use `--no-verify` in emergencies. It bypasses all safety checks.

## 📚 Related

- `README-GIT-HOOKS.md` - Git hooks documentation
- `README-CODE-QUALITY.md` - Code quality tools guide














