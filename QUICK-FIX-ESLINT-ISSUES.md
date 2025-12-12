# 🚀 Quick Fix for 1429 ESLint Issues

## ⚡ Fastest Solution

```bash
# 1. Auto-fix everything possible
npm run lint:fix

# 2. Check what's left
npm run lint 2>&1 | tail -5

# 3. Find the 1 error (most critical)
npm run lint 2>&1 | grep "error" -A 3

# 4. Fix the error manually, then continue
```

## 📊 Understand the Issues

You have:

- **1 error** - Must fix (blocks builds)
- **1428 warnings** - Should fix (code quality)

## 🎯 Step-by-Step Fix

### Step 1: Auto-Fix (Fixes Many Issues)

```bash
npm run lint:fix
npm run format
git add -A
```

This will fix:

- Formatting issues
- Many ESLint auto-fixable issues
- Simple code style issues

### Step 2: Find the Error

```bash
# Find the error
npm run lint 2>&1 | grep "error" -B 2 -A 5

# Or save to file
npm run lint > eslint-issues.txt
grep "error" eslint-issues.txt
```

**Fix the error first** - it's blocking your build.

### Step 3: Fix Warnings in Batches

Most warnings are likely:

1. **Unused variables** - Prefix with `_` or remove
2. **Explicit 'any'** - Add types or disable with comment
3. **Missing dependencies** - Add to useEffect arrays

**Fix unused variables:**

```bash
# Find them
npm run lint 2>&1 | grep "is defined but never used" | head -20

# Fix: Prefix with _ or remove
# Example: const unusedVar → const _unusedVar
```

**Fix explicit any:**

```bash
# Find them
npm run lint 2>&1 | grep "Unexpected any" | head -20

# Fix: Add proper types
# Example: function test(data: any) → function test(data: string)
```

## 🔧 Helper Commands

```bash
# Analyze issues
npm run fix:lint:analyze

# Fix specific file
npm run lint:fix -- apps/website/path/to/file.tsx

# Check specific file
npm run lint -- apps/website/path/to/file.tsx
```

## 💡 Pro Tips

1. **Most warnings won't block your push** - Focus on the error first
2. **Fix by file** - One file at a time is manageable
3. **Use IDE** - Most IDEs can auto-fix many issues
4. **Fix your changes first** - Focus on files you modified

## 🚨 If You Need to Push Now

The git hooks will:

- ✅ Auto-fix Prettier and ESLint (where possible)
- ⚠️ Show TypeScript errors
- ⚠️ Show remaining ESLint warnings

**You can push with warnings** (they don't block), but fix the error first.

```bash
# Fix the error
npm run lint 2>&1 | grep "error"

# Then push (warnings won't block)
git add -A
git commit -m "your message"
git push
```

## 📚 Full Guide

See `libs/utilities/scripts/FIX-1429-ISSUES.md` for detailed instructions.
