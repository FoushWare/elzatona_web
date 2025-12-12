# 🚀 Quick Reference: Pre-Push Checks

## ⚡ Fastest Way (All Checks)

```bash
# Run all checks (ESLint + TypeScript + SonarQube)
npm run check:pre-push
```

## 📋 Individual Checks

### ESLint

```bash
npm run lint        # Check
npm run lint:fix   # Auto-fix
```

### TypeScript

```bash
npm run type-check  # Check (must fix manually)
```

### SonarQube

```bash
npm run sonar:quick  # Quick check
```

## 🔧 Fix Issues

### Auto-Fix Everything

```bash
npm run fix:all     # Fixes formatting + ESLint
git add -A          # Stage fixed files
```

### Step-by-Step

```bash
npm run fix:issues  # Interactive helper
```

## ✅ Complete Workflow

```bash
# 1. Fix everything automatically
npm run fix:all

# 2. Check TypeScript (fix manually if needed)
npm run type-check

# 3. Verify all checks pass
npm run check:pre-push

# 4. Commit (hooks will verify)
git add -A
git commit -m "your message"

# 5. Push (hooks will run full checks)
git push
```

## 📄 View Logs

```bash
cat .code-quality-check.log
```

## 🚨 If Checks Fail

1. **ESLint:** `npm run lint:fix`
2. **TypeScript:** Fix errors shown by `npm run type-check`
3. **SonarQube:** Visit dashboard or check log file

---

**Full guide:** `libs/utilities/scripts/README-PRE-PUSH-CHECKS.md`
