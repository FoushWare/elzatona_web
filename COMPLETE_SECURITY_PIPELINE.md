# Complete Security Pipeline Guide

## 🎯 Overview

This guide shows you how to use **ALL** security tools and pipelines together, their dependencies, and how they prevent issues **before** they reach GitHub.

## 🛡️ Security Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL DEVELOPMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌────────────┐ │
│  │ Pre-Commit   │ --> │ Pre-Push     │ --> │ Git Push   │ │
│  │ Hook         │     │ Hook         │     │            │ │
│  └──────────────┘     └──────────────┘     └────────────┘ │
│         │                     │                    │        │
│         ▼                     ▼                    ▼        │
│  • Formatting         • Linting            • Secret Scan   │
│                       • Type Check         • Build Check   │
│                       • Build Check        • Cleanup       │
│                       • Secret Scan                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB (Remote)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌────────────┐ │
│  │ Secret       │     │ CodeQL       │     │ SonarQube  │ │
│  │ Scanning     │     │ Analysis     │     │ Analysis   │ │
│  └──────────────┘     └──────────────┘     └────────────┘ │
│         │                     │                    │        │
│         ▼                     ▼                    ▼        │
│  • Auto-detect      • Security vulns    • Code quality     │
│  • Alert creation   • Code issues       • Test coverage   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Auto-Fix Workflows (After Detection)                │ │
│  │  • fix-and-resolve-secrets.yml                       │ │
│  │  • auto-resolve-secret-scanning.yml                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Complete Tool List

### 🔒 **Local Prevention (Before Push)**

#### 1. Pre-Commit Hook (Fast Checks - ~10s)
**Location:** `.git/hooks/pre-commit`  
**Source:** `Rest/other/.husky/pre-commit`

**What it does:**
- ✅ **Prettier formatting** - Auto-formats code (fast)
- ✅ **Auto-stage** - Adds formatted files

**Blocks commit if:**
- Formatting fails

**Why this structure:**
- Fast checks only (formatting)
- Secret scanning moved to pre-push (avoids duplication)
- Linting and type checking moved to pre-push (slower operations)
- Fastest possible commits

---

#### 2. Pre-Push Hook (Comprehensive Checks - ~2-5min)
**Location:** `.git/hooks/pre-push`  
**Source:** `Rest/other/.husky/pre-push`

**What it does:**
- ✅ **ESLint auto-fix** - Auto-fixes linting issues
- ✅ **ESLint check** - Validates linting
- ✅ **TypeScript type checking** - **BLOCKS push if errors**
- ✅ **Build validation** - **BLOCKS push if build fails** (ONLY local build check - no duplication)
- ✅ **Secret scanning** - **BLOCKS push if secrets found** (ONLY local secret scan - no duplication)
- ✅ **Auto-stage** - Adds auto-fixed files
- ✅ **Cleanup** - Removes build artifacts

**Blocks push if:**
- TypeScript errors found
- Build fails
- Secrets detected in changed files

**Optimization Strategy:**
- **Build Check:** Pre-push only (removed from GitHub Actions to avoid duplication)
- **Secret Scanning:** Pre-push + GitHub (2 layers, no duplication in pre-commit)
- **No duplication:** Each check runs in optimal location

**Runs on:**
- `main`, `develop`, `release/**` branches only

**Why this structure:**
- Comprehensive checks before code reaches GitHub
- Linting and type checking run here (slower operations)
- Secret scanning as final safety check
- Build validation ensures code compiles

---

### 🔍 **GitHub Actions (After Push)**

#### 3. Secret Scanning (Automatic)
**Location:** GitHub Settings → Security  
**Workflow:** Built-in GitHub feature

**What it does:**
- ✅ Automatically scans all commits
- ✅ Detects secrets in code
- ✅ Creates alerts in Security tab
- ✅ Notifies you via email

**Triggers:** Every push to any branch

---

#### 4. CodeQL Analysis
**File:** `.github/workflows/codeql-analysis.yml`

**What it does:**
- ✅ Scans for security vulnerabilities
- ✅ Detects SQL injection, XSS, etc.
- ✅ Analyzes JavaScript/TypeScript
- ✅ Creates alerts in Security tab

**Triggers:**
- Push to `main`
- Pull requests to `main`
- Weekly schedule (Mondays)
- Manual trigger

---

#### 5. SonarQube Analysis
**File:** `.github/workflows/sonarcloud.yml`

**What it does:**
- ✅ Code quality analysis
- ✅ Security vulnerability detection
- ✅ Code duplication detection
- ✅ Test coverage analysis
- ✅ Cognitive complexity checks

**Triggers:**
- Push to `main`
- Pull requests to `main`
- Manual trigger

---

### 🔧 **Auto-Fix Tools (After Detection)**

#### 6. Fix and Resolve Secrets
**File:** `.github/workflows/fix-and-resolve-secrets.yml`

**What it does:**
- ✅ Finds files with secrets
- ✅ Fixes code (replaces with `process.env`)
- ✅ Fixes documentation (replaces with placeholders)
- ✅ Commits fixes automatically
- ✅ Creates PR
- ✅ Resolves alerts

**Triggers:**
- Manual trigger (recommended)
- Weekly schedule

---

#### 7. Auto-Resolve Secret Scanning
**File:** `.github/workflows/auto-resolve-secret-scanning.yml`

**What it does:**
- ✅ Marks alerts as resolved
- ✅ Does NOT fix code (use #6 instead)

**Triggers:**
- Manual trigger
- Daily schedule

---

## 🔗 Dependencies & Order

### Local Development Flow (Optimized)

```
1. You write code
   │
   ▼
2. git add .
   │
   ▼
3. git commit
   │
   ├─► Pre-Commit Hook (Fast - ~10s):
   │   └─► Formatting ✅ (quick)
   │
   ▼
4. git push
   │
   ├─► Pre-Push Hook (Comprehensive - ~2-5min):
   │   ├─► Linting ✅ (auto-fix + check)
   │   ├─► Type Check ✅ (BLOCKS if errors)
   │   ├─► Build Check ✅ (ONLY local - BLOCKS if fails, removed from GitHub Actions)
   │   ├─► Secret Scan ✅ (ONLY local scan - prevents secrets from reaching GitHub)
   │   └─► Cleanup ✅
   │
   ▼
5. Code pushed to GitHub
   │
   ├─► GitHub Secret Scanning (automatic)
   │   └─► Creates alerts if secrets found
   │
   ├─► CodeQL Analysis (if on main/PR)
   │   └─► Creates alerts if vulnerabilities found
   │
   └─► SonarQube Analysis (if on main/PR)
       └─► Creates alerts if issues found
```

### Auto-Fix Flow (After Detection)

```
1. Secret detected by GitHub
   │
   ▼
2. Alert created in Security tab
   │
   ▼
3. Run "Fix and Resolve Secrets" workflow
   │
   ├─► Finds files with secrets
   ├─► Fixes code (replaces secrets)
   ├─► Commits fixes
   ├─► Creates PR
   └─► Resolves alerts
   │
   ▼
4. Review and merge PR
   │
   ▼
5. Rotate secrets (manual step)
```

## 🚀 How to Use All Tools Together

### Step 1: Setup (One-Time)

```bash
# Ensure git hooks are installed
npm run prepare

# Verify hooks are active
ls -la .git/hooks/pre-commit
ls -la .git/hooks/pre-push

# Test secret scanning
./scripts/fix-secrets-from-alerts.sh
```

### Step 2: Daily Development Workflow

```bash
# 1. Write your code
# ... make changes ...

# 2. Stage changes
git add .

# 3. Commit (Pre-Commit Hook runs automatically)
git commit -m "feat: Add new feature"
# ✅ Formatting applied
# ⏱️  ~10 seconds (very fast!)

# 4. Push (Pre-Push Hook runs automatically)
git push
# ✅ Linting check passed
# ✅ Type checking passed
# ✅ Build check passed
# ✅ Secret scanning passed

# 5. GitHub automatically scans
# ✅ Secret scanning runs
# ✅ CodeQL runs (if on main/PR)
# ✅ SonarQube runs (if on main/PR)
```

### Step 3: If Secrets Are Detected

```bash
# Option A: Fix locally first (recommended)
./scripts/fix-secrets-from-alerts.sh
git add .
git commit -m "security: Remove hardcoded secrets"
git push

# Option B: Use GitHub Actions workflow
# Go to: https://github.com/FoushWare/elzatona_web/actions/workflows/fix-and-resolve-secrets.yml
# Click "Run workflow"
# Enable auto_commit and create_pr
# Review and merge PR
```

### Step 4: If Security Issues Are Found

```bash
# 1. Check GitHub Security tab
# https://github.com/FoushWare/elzatona_web/security

# 2. Review alerts:
#    - Secret Scanning
#    - Code Scanning (CodeQL)
#    - Dependabot

# 3. Fix issues:
#    - Use auto-fix workflows
#    - Or fix manually

# 4. Verify fixes:
#    - Check alerts are resolved
#    - Run local checks
```

## 🛡️ Prevention Mechanisms

### What Prevents Issues Before Push?

#### ✅ Pre-Commit Hook
- **Prevents:** Formatting issues
- **Action:** Blocks commit if formatting fails
- **Auto-fixes:** Formatting
- **Time:** ~10 seconds (fastest possible)

#### ✅ Pre-Push Hook
- **Prevents:** TypeScript errors, build failures, **secrets in changed files**
- **Action:** Blocks push if issues found
- **Auto-fixes:** Linting
- **Build Check:** Only local (removed from GitHub Actions to avoid duplication)

#### ✅ Secret Scanning (Local - Pre-Push Only)
- **Prevents:** Hardcoded secrets from reaching GitHub
- **Action:** Blocks push if secrets found
- **Scans:** Changed files (pre-push hook only)
- **Why only pre-push:** Avoids duplication (GitHub also scans automatically)

### What Happens After Push?

#### ✅ GitHub Secret Scanning
- **Detects:** Secrets that bypassed local checks
- **Action:** Creates alerts, notifies you
- **Auto-fix:** Use "Fix and Resolve Secrets" workflow

#### ✅ CodeQL Analysis
- **Detects:** Security vulnerabilities
- **Action:** Creates alerts
- **Fix:** Manual review and fix

#### ✅ SonarQube Analysis
- **Detects:** Code quality issues, security issues
- **Action:** Creates alerts
- **Fix:** Manual review and fix

## 📊 Tool Comparison

| Tool | When | What It Does | Blocks? | Auto-Fix? |
|------|------|--------------|---------|-----------|
| **Pre-Commit Hook** | Before commit | Format only (fastest) | ✅ Yes | ✅ Formatting |
| **Pre-Push Hook** | Before push | Lint, type check, **build**, **secret scan** (comprehensive) | ✅ Yes | ✅ Linting |
| **GitHub Secret Scanning** | After push | Detect secrets | ❌ No | ❌ No (use workflow) |
| **CodeQL** | After push | Detect vulnerabilities | ❌ No | ❌ No |
| **SonarQube** | After push | Code quality analysis (no build - removed duplicate) | ❌ No | ❌ No |
| **Fix Secrets Workflow** | Manual/Weekly | Fix secrets in code | ❌ No | ✅ Yes |
| **Resolve Alerts Workflow** | Manual/Daily | Mark alerts resolved | ❌ No | ❌ No |

## 🔧 Configuration

### Enable Secret Scanning in Hooks

The secret scanning is **already integrated** in the hooks. If you need to update it:

```bash
# Check current hook
cat .git/hooks/pre-commit | grep -i secret

# Update hook (if needed)
# The hook automatically includes secret scanning
```

### Switch Hook Configurations

```bash
# Fast (no tests, quick checks)
npm run pre-commit:fast

# Standard (default - with tests)
npm run pre-commit:standard

# Full (all tests including E2E)
npm run pre-commit:full
```

## 📝 Quick Reference

### Daily Commands

```bash
# Normal workflow (hooks run automatically)
git add .
git commit -m "message"  # Pre-commit runs
git push                  # Pre-push runs

# Skip hooks (NOT recommended)
git commit --no-verify -m "message"
git push --no-verify

# Fix secrets before committing
./scripts/fix-secrets-from-alerts.sh
git add .
git commit -m "security: Remove secrets"
```

### Check Status

```bash
# Check git hooks
ls -la .git/hooks/

# Check GitHub Actions
gh run list --limit 5

# Check security alerts
gh api repos/FoushWare/elzatona_web/secret-scanning/alerts --jq 'length'
```

### Fix Issues

```bash
# Fix secrets locally
./scripts/fix-secrets-from-alerts.sh

# Fix secrets via GitHub Actions
# Go to: https://github.com/FoushWare/elzatona_web/actions/workflows/fix-and-resolve-secrets.yml

# Resolve alerts
./scripts/resolve-secret-scanning-alerts.sh revoked "Fixed"
```

## ✅ Checklist: Complete Security Setup

- [ ] Git hooks installed (`npm run prepare`)
- [ ] Pre-commit hook active (checks formatting only - fast ~10s)
- [ ] Pre-push hook active (checks linting, types, build, secrets - comprehensive ~2-5min)
- [ ] GitHub Secret Scanning enabled (automatic)
- [ ] CodeQL workflow configured (`.github/workflows/codeql-analysis.yml`)
- [ ] SonarQube workflow configured (`.github/workflows/sonarcloud.yml`)
- [ ] Fix secrets workflow ready (`.github/workflows/fix-and-resolve-secrets.yml`)
- [ ] Local fix scripts available (`scripts/fix-secrets-from-alerts.sh`)
- [ ] Tested secret scanning (try committing a test secret - should block)

## 🎯 Best Practices

1. **Always use hooks** - Don't skip with `--no-verify`
2. **Fix locally first** - Use local scripts before pushing
3. **Review alerts regularly** - Check Security tab weekly
4. **Use auto-fix workflows** - Let automation handle repetitive tasks
5. **Rotate secrets immediately** - After detection, rotate in service dashboards
6. **Keep hooks updated** - Run `npm run prepare` after updates

## 🔗 Related Documentation

- `SECURITY_FIX_TOOLS_GUIDE.md` - All available tools
- `SECRET_SCANNING_AUTOMATION.md` - Secret scanning automation
- `SECRET_ROTATION_GUIDE.md` - How to rotate secrets
- `GIT_HISTORY_REMEDIATION.md` - **Remove secrets from git history** ⚠️
- `SECURITY.md` - Security policy

---

**Last Updated:** December 2024  
**Status:** Complete security pipeline ready! 🛡️

