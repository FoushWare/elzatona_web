# Git Hooks Optimization Guide

## 🎯 Optimization Summary

We've optimized the git hooks to **remove duplicate steps** and create a more efficient workflow.

## 📊 Before vs After

### ❌ Before (Duplicated Steps)

**Pre-Commit Hook:**
- ✅ Formatting
- ✅ Linting (duplicate)
- ✅ Type checking (duplicate)
- ✅ Secret scanning (duplicate)

**Pre-Push Hook:**
- ✅ Linting (duplicate)
- ✅ Type checking (duplicate)
- ✅ Build validation
- ✅ Secret scanning (duplicate)

**Issues:**
- Linting ran twice (commit + push)
- Type checking ran twice (commit + push)
- Secret scanning ran twice (commit + push)
- Slower commit process
- Redundant checks

---

### ✅ After (Optimized Structure)

**Pre-Commit Hook (Fast Checks - ~10-30 seconds):**
- ✅ Formatting (quick)
- ✅ Secret scanning (critical - prevents secrets in commits)

**Pre-Push Hook (Comprehensive Checks - ~2-5 minutes):**
- ✅ Linting (auto-fix + check)
- ✅ Type checking (comprehensive)
- ✅ Build validation (ensures code compiles)
- ✅ Secret scanning (critical - final check before push)
- ✅ Cleanup (removes build artifacts)

**Benefits:**
- ✅ No duplicate steps
- ✅ Faster commits (only quick checks)
- ✅ Comprehensive checks before push
- ✅ Secret scanning at both stages (critical for security)
- ✅ Better developer experience

---

## 🔄 Optimized Workflow

```
┌─────────────────────────────────────────────────────────┐
│                    DEVELOPMENT FLOW                     │
└─────────────────────────────────────────────────────────┘

1. Write Code
   │
   ▼
2. git add .
   │
   ▼
3. git commit
   │
   ├─► PRE-COMMIT HOOK (Fast - ~10-30s)
   │   ├─► Formatting ✅
   │   └─► Secret Scan ✅ (BLOCKS if found)
   │
   ▼
4. git push
   │
   ├─► PRE-PUSH HOOK (Comprehensive - ~2-5min)
   │   ├─► Linting ✅ (auto-fix + check)
   │   ├─► Type Check ✅ (BLOCKS if errors)
   │   ├─► Build ✅ (BLOCKS if fails)
   │   ├─► Secret Scan ✅ (BLOCKS if found)
   │   └─► Cleanup ✅
   │
   ▼
5. Code pushed to GitHub
   │
   ├─► GitHub Secret Scanning (automatic)
   ├─► CodeQL Analysis
   └─► SonarQube Analysis
```

---

## 📋 Detailed Hook Breakdown

### Pre-Commit Hook (Fast Checks)

**Purpose:** Quick validation before committing  
**Time:** ~10-30 seconds  
**Blocks commit if:** Formatting fails OR secrets detected

**Steps:**
1. **Prettier Formatting**
   - Auto-formats code
   - Ensures consistent style
   - Fast operation

2. **Secret Scanning**
   - Scans staged files for hardcoded secrets
   - **CRITICAL:** Prevents secrets from being committed
   - Blocks commit if secrets found

3. **Auto-Stage**
   - Adds formatted files to staging

**Why this structure?**
- Formatting should happen before commit (ensures clean commits)
- Secret scanning is critical (must catch secrets early)
- Fast enough to not slow down commits
- Linting/type checking can wait until push (slower operations)

---

### Pre-Push Hook (Comprehensive Checks)

**Purpose:** Comprehensive validation before pushing  
**Time:** ~2-5 minutes  
**Blocks push if:** Linting errors, TypeScript errors, build fails, OR secrets detected

**Steps:**
1. **ESLint Auto-Fix**
   - Automatically fixes linting issues
   - Reduces manual work

2. **ESLint Check**
   - Validates linting rules
   - Warns about remaining issues (doesn't block)

3. **TypeScript Type Checking**
   - **BLOCKS push if errors found**
   - Ensures type safety
   - Catches type errors before they reach GitHub

4. **Build Validation**
   - **BLOCKS push if build fails**
   - Ensures code compiles
   - Catches build errors early

5. **Secret Scanning**
   - Scans changed files for secrets
   - **CRITICAL:** Final check before push
   - Blocks push if secrets found

6. **Auto-Stage**
   - Adds auto-fixed files to staging

7. **Cleanup**
   - Removes build artifacts (.next, build, etc.)
   - Keeps repository clean

**Why this structure?**
- Comprehensive checks before code reaches GitHub
- Catches all issues before they affect CI/CD
- Build validation ensures code compiles
- Secret scanning as final safety check
- Only runs on development branches (main, develop, release/**)

---

## 🔒 Why Secret Scanning in Both Hooks?

**Pre-Commit Secret Scan:**
- ✅ Catches secrets early (before commit)
- ✅ Prevents secrets from entering git history
- ✅ Fast check on staged files only

**Pre-Push Secret Scan:**
- ✅ Final safety check before push
- ✅ Scans all changed files (not just staged)
- ✅ Catches secrets that might have been missed
- ✅ Prevents secrets from reaching GitHub

**Both are critical for security!**

---

## ⚡ Performance Comparison

### Before Optimization

**Commit Time:** ~2-3 minutes
- Formatting: ~10s
- Linting: ~30s
- Type checking: ~60s
- Secret scanning: ~10s

**Push Time:** ~3-5 minutes
- Linting: ~30s (duplicate)
- Type checking: ~60s (duplicate)
- Build: ~2-3min
- Secret scanning: ~10s (duplicate)

**Total:** ~5-8 minutes per commit+push cycle

---

### After Optimization

**Commit Time:** ~10-30 seconds
- Formatting: ~10s
- Secret scanning: ~10s

**Push Time:** ~2-5 minutes
- Linting: ~30s
- Type checking: ~60s
- Build: ~2-3min
- Secret scanning: ~10s

**Total:** ~2-5 minutes per commit+push cycle

**Time Saved:** ~3-3 minutes per cycle! ⚡

---

## 🎯 When Each Check Runs

| Check | Pre-Commit | Pre-Push | Why |
|-------|-----------|----------|-----|
| **Formatting** | ✅ Yes | ❌ No | Should happen before commit |
| **Linting** | ❌ No | ✅ Yes | Can wait until push (slower) |
| **Type Checking** | ❌ No | ✅ Yes | Can wait until push (slower) |
| **Build** | ❌ No | ✅ Yes | Only needed before push |
| **Secret Scanning** | ✅ Yes | ✅ Yes | **Critical at both stages** |
| **Cleanup** | ❌ No | ✅ Yes | Only needed after build |

---

## 🚀 Usage

### Normal Workflow

```bash
# 1. Make changes
# ... edit files ...

# 2. Stage changes
git add .

# 3. Commit (fast - only formatting + secret scan)
git commit -m "feat: Add new feature"
# ✅ Formatting applied
# ✅ Secret scanning passed
# ⏱️  ~10-30 seconds

# 4. Push (comprehensive - all checks)
git push
# ✅ Linting fixed
# ✅ Type checking passed
# ✅ Build passed
# ✅ Secret scanning passed
# ⏱️  ~2-5 minutes
```

### If Secrets Are Detected

```bash
# Pre-commit will block:
git commit -m "message"
# ❌ SECRETS DETECTED! Commit blocked.

# Fix secrets:
./scripts/fix-secrets-from-alerts.sh
git add .
git commit -m "security: Remove secrets"
# ✅ Now it works
```

### Skip Checks (NOT Recommended)

```bash
# Skip pre-commit (formatting + secret scan)
git commit --no-verify -m "message"

# Skip pre-push (all comprehensive checks)
git push --no-verify
```

---

## 📊 Hook Configuration

### Pre-Commit Hook
**File:** `.git/hooks/pre-commit`  
**Source:** `Rest/other/.husky/pre-commit` (if using husky)

**Checks:**
- Formatting (Prettier)
- Secret scanning

**Blocks if:**
- Formatting fails
- Secrets detected

---

### Pre-Push Hook
**File:** `.git/hooks/pre-push`  
**Source:** `Rest/other/.husky/pre-push` (if using husky)

**Checks:**
- Linting (ESLint)
- Type checking (TypeScript)
- Build validation
- Secret scanning
- Cleanup

**Blocks if:**
- TypeScript errors found
- Build fails
- Secrets detected

**Runs on:**
- `main` branch
- `develop` branch
- `release/**` branches

**Skips on:**
- Feature branches (faster development)

---

## 🔧 Customization

### Switch Hook Configurations

```bash
# Fast pre-commit (current - optimized)
npm run pre-commit:standard

# Full pre-commit (if you want all checks)
npm run pre-commit:full

# Fast pre-push (skip some checks)
# Edit .git/hooks/pre-push manually
```

### Disable Secret Scanning

```bash
# Skip secret scan in pre-commit
SKIP_SECRET_SCAN=true git commit -m "message"

# Skip secret scan in pre-push
SKIP_SECRET_SCAN=true git push
```

---

## ✅ Benefits of Optimization

1. **Faster Commits**
   - Only quick checks run
   - No waiting for linting/type checking
   - Better developer experience

2. **Comprehensive Push Checks**
   - All important checks before push
   - Catches issues before they reach GitHub
   - Ensures code quality

3. **No Duplicates**
   - Each check runs once
   - More efficient
   - Clear separation of concerns

4. **Security Maintained**
   - Secret scanning at both stages
   - Early detection (pre-commit)
   - Final safety check (pre-push)

5. **Better Performance**
   - ~3-3 minutes saved per cycle
   - Faster development workflow
   - Less waiting time

---

## 📝 Summary

**Optimized Structure:**
- **Pre-Commit:** Fast checks (formatting + secret scan)
- **Pre-Push:** Comprehensive checks (linting + type + build + secret scan)

**Key Changes:**
- ✅ Removed duplicate linting
- ✅ Removed duplicate type checking
- ✅ Kept secret scanning in both (critical for security)
- ✅ Faster commits
- ✅ Comprehensive push checks

**Result:**
- ⚡ Faster development workflow
- 🛡️ Security maintained
- ✅ No duplicate steps
- 🎯 Clear separation of concerns

---

**Last Updated:** December 2024  
**Status:** Optimized and ready! 🚀

