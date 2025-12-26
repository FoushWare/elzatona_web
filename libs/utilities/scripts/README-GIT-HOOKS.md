# Git Hooks with Code Quality Checks

This project includes git hooks that automatically run code quality checks before you commit or push, providing helpful feedback to fix issues.

## 🚀 Quick Setup

```bash
# Install the hooks (one-time setup)
npm run setup:hooks
```

This installs:

- **Pre-commit hook**: Runs Prettier, ESLint, and TypeScript checks
- **Pre-push hook**: Runs all checks + Build + SonarQube (if token is set)

## 📋 What Gets Checked

### Pre-Commit Hook

Before each commit, automatically runs:

1. ✅ **Prettier** - Code formatting
2. ✅ **ESLint** - Code quality and style
3. ✅ **TypeScript** - Type checking

### Pre-Push Hook

Before each push, automatically runs:

1. ✅ **Prettier** - Code formatting
2. ✅ **ESLint** - Code quality and style
3. ✅ **TypeScript** - Type checking
4. ✅ **Build** - Ensures code compiles
5. ✅ **SonarQube** - Security and quality analysis (if token is set)

## 💡 Helpful Feedback

When checks fail, you'll see:

- ❌ Which checks failed
- ✅ Which checks passed
- 💡 Quick fix commands
- 📄 Location of detailed log file

### Example Output

```
❌ Pre-Commit Checks Failed
════════════════════════════════════════════════════════════════

Failed checks:
  ❌ Prettier
  ❌ ESLint

Passed checks:
  ✅ TypeScript

💡 Quick Fix Commands:
   npm run format      # Fix formatting
   npm run lint:fix    # Fix ESLint issues
   npm run type-check # See TypeScript errors

📄 Full details saved to: .code-quality-check.log
```

## 🔧 Configuration

### SonarQube Token

The SonarQube token is stored in `.env.local` (git-ignored):

```bash
# .env.local
SONAR_TOKEN=your_token_here
```

**✅ Already configured!** Your token is set in `.env.local`.

### Skip Checks (Not Recommended)

If you need to skip checks in an emergency:

```bash
# Skip pre-commit checks
git commit --no-verify

# Skip pre-push checks
git push --no-verify

# Skip specific checks
SKIP_BUILD_CHECK=true git push
SKIP_SONAR_CHECK=true git push
```

## 📄 Log Files

All check results are logged to:

- `.code-quality-check.log` (git-ignored)

View the log:

```bash
cat .code-quality-check.log
less .code-quality-check.log
tail -f .code-quality-check.log  # Watch in real-time
```

## 🛠️ Manual Checks

You can also run checks manually:

```bash
# Run all checks
npm run check:all

# Quick check (skip SonarQube)
npm run check:all:quick

# Individual checks
npm run lint
npm run type-check
npm run format
npm run sonar
```

## 🔄 Reinstalling Hooks

If hooks get removed or you want to reinstall:

```bash
npm run setup:hooks
```

## 📝 Hook Scripts

The hooks are located in:

- `libs/utilities/scripts/pre-commit-with-checks.sh`
- `libs/utilities/scripts/pre-push-with-checks.sh`

You can customize these scripts if needed.

## ✅ Benefits

1. **Catch issues early** - Before they reach CI/CD
2. **Save time** - Fix locally instead of waiting for CI
3. **Better commits** - Only commit code that passes checks
4. **Helpful feedback** - Clear instructions on how to fix issues
5. **Detailed logs** - Full output saved for later review

## 🚨 Troubleshooting

### Hooks not running?

```bash
# Reinstall hooks
npm run setup:hooks

# Check if hooks are executable
ls -la .git/hooks/pre-commit
ls -la .git/hooks/pre-push
```

### SonarQube not running?

```bash
# Check if token is set
grep SONAR_TOKEN .env.local

# Or set it manually
export SONAR_TOKEN=your_token_here
```

### Hooks too slow?

```bash
# Use quick mode (skip SonarQube in pre-push)
SKIP_SONAR_CHECK=true git push
```

## 📚 Related Documentation

- `README-CODE-QUALITY.md` - Full code quality tools guide
- `run-all-checks.js` - Manual check script with logging






