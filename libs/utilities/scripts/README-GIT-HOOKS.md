# Git Hooks with Code Quality Checks

This project includes git hooks that automatically run code quality checks before you commit or push, providing helpful feedback to fix issues.

## 🚀 Quick Setup

```bash
# Hooks are installed automatically after npm install
npm install

# Reinstall them manually if needed
npm run setup:hooks
```

This enables:

- **Pre-commit hook**: Runs `lint-staged` on staged files only
- **Pre-push hook**: Runs the same format, lint, type-check, and build checks as CI

## 📋 What Gets Checked

### Pre-Commit Hook

Before each commit, automatically runs staged-file checks only:

1. ✅ **ESLint** with `--fix` on staged JS/TS files
2. ✅ **Prettier** on staged source and markup files

### Pre-Push Hook

Before each push, automatically runs:

1. ✅ **Prettier** on tracked files
2. ✅ **ESLint** for the repository
3. ✅ **TypeScript** type checking
4. ✅ **Build** validation

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
# Run the same checks CI uses
npm run verify:ci

# Run only staged-file checks
npm run check:staged

# Individual checks
npm run format:check:tracked
npm run lint:ci
npm run type-check:ci
npm run build:ci
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









