# Security Fix Tools Guide

## 🎯 Quick Answer

**YES!** You have multiple automated tools available. You don't need to fix everything manually.

## 📊 Available Tools (Ranked by Automation Level)

### ⭐ **Level 1: Fully Automated (RECOMMENDED)**

#### Option A: GitHub Actions Workflow (Easiest)

**File:** `.github/workflows/fix-and-resolve-secrets.yml`

**What it does:**
- ✅ Automatically finds all files with secrets
- ✅ Fixes code by replacing secrets with `process.env`
- ✅ Fixes documentation by replacing with placeholders
- ✅ Commits fixes automatically
- ✅ Creates PR for review
- ✅ Resolves alerts after fixing

**How to use:**
1. Go to: https://github.com/FoushWare/elzatona_web/actions/workflows/fix-and-resolve-secrets.yml
2. Click **"Run workflow"**
3. Set:
   - `auto_commit`: `true` ✅
   - `create_pr`: `true` ✅
   - `resolution`: `revoked`
4. Click **"Run workflow"**
5. Wait for completion (5-10 minutes)
6. Review and merge the PR

**Result:** All secrets fixed automatically! 🎉

---

#### Option B: Local Automated Script

**File:** `scripts/fix-secrets-from-alerts.sh`

**What it does:**
- ✅ Reads GitHub secret scanning alerts
- ✅ Finds all files with secrets
- ✅ Fixes code automatically
- ✅ Shows what was changed

**How to use:**
```bash
# Make sure you're authenticated
gh auth login

# Run the fix script
./scripts/fix-secrets-from-alerts.sh

# Review changes
git diff

# Commit and push
git add .
git commit -m "security: Remove hardcoded secrets"
git push
```

**Result:** Secrets fixed locally, then you commit manually.

---

### 🔧 **Level 2: Semi-Automated (Targeted Fixes)**

#### Fix All Secrets in Code Files

**File:** `scripts/fix-all-secrets-comprehensive.js`

**What it does:**
- Fixes secrets in JavaScript/TypeScript files
- Replaces with `process.env` references

**How to use:**
```bash
node scripts/fix-all-secrets-comprehensive.js
```

---

#### Fix Secrets in Documentation

**File:** `scripts/fix-docs-secrets.sh`

**What it does:**
- Fixes secrets in markdown/documentation files
- Replaces with placeholders

**How to use:**
```bash
./scripts/fix-docs-secrets.sh
```

---

#### Fix Secrets in Rest/Scripts (Legacy)

**File:** `scripts/fix-rest-scripts-secrets.sh`

**What it does:**
- Fixes secrets in `Rest/scripts/` directory
- Legacy file cleanup

**How to use:**
```bash
./scripts/fix-rest-scripts-secrets.sh
```

---

#### Remove All Hardcoded Secrets

**File:** `scripts/remove-all-hardcoded-secrets.sh`

**What it does:**
- Scans all code files
- Replaces secrets with environment variables

**How to use:**
```bash
./scripts/remove-all-hardcoded-secrets.sh
```

---

### 🛠️ **Level 3: Manual Tools (For Specific Cases)**

#### Resolve Alerts Only (After Fixing)

**File:** `scripts/resolve-secret-scanning-alerts.sh`

**What it does:**
- Only marks alerts as resolved
- Does NOT fix code (use after fixing manually)

**How to use:**
```bash
# After you've fixed the code manually
./scripts/resolve-secret-scanning-alerts.sh revoked "Secrets removed"
```

---

#### Remove Secrets from Git History

**File:** `scripts/remove-secrets-from-history.sh`

**What it does:**
- Removes secrets from git commit history
- Requires force push (dangerous!)

**⚠️ WARNING:** Only use after rotating secrets!

**How to use:**
```bash
# 1. Rotate secrets first!
# 2. Then run:
./scripts/remove-secrets-from-history.sh
```

---

## 🚀 Recommended Workflow

### For Most Users (Fully Automated)

**Step 1: Run GitHub Actions Workflow**
1. Go to: https://github.com/FoushWare/elzatona_web/actions/workflows/fix-and-resolve-secrets.yml
2. Click "Run workflow"
3. Enable auto_commit and create_pr
4. Run and wait
5. Review and merge PR

**Step 2: Rotate Secrets**
- See `SECRET_ROTATION_GUIDE.md` for instructions
- Rotate in each service dashboard

**Done!** ✅

---

### For Advanced Users (Local Control)

**Step 1: Fix Secrets Locally**
```bash
# Fix all secrets from GitHub alerts
./scripts/fix-secrets-from-alerts.sh

# OR fix specific areas:
./scripts/fix-all-secrets-comprehensive.js  # Code files
./scripts/fix-docs-secrets.sh               # Documentation
```

**Step 2: Review Changes**
```bash
git diff
```

**Step 3: Commit and Push**
```bash
git add .
git commit -m "security: Remove hardcoded secrets"
git push
```

**Step 4: Resolve Alerts**
```bash
./scripts/resolve-secret-scanning-alerts.sh revoked "Secrets removed"
```

**Step 5: Rotate Secrets**
- See `SECRET_ROTATION_GUIDE.md`

---

## 📋 Tool Comparison

| Tool | Automation | Fixes Code | Creates PR | Best For |
|------|------------|------------|------------|----------|
| **GitHub Actions Workflow** | ⭐⭐⭐⭐⭐ | ✅ Yes | ✅ Yes | Everyone |
| **fix-secrets-from-alerts.sh** | ⭐⭐⭐⭐ | ✅ Yes | ❌ No | Local control |
| **fix-all-secrets-comprehensive.js** | ⭐⭐⭐ | ✅ Yes | ❌ No | Code files only |
| **fix-docs-secrets.sh** | ⭐⭐⭐ | ✅ Yes | ❌ No | Docs only |
| **resolve-secret-scanning-alerts.sh** | ⭐⭐ | ❌ No | ❌ No | After manual fix |
| **remove-secrets-from-history.sh** | ⭐⭐⭐ | ❌ No | ❌ No | Git history cleanup |

---

## 🎯 Which Tool Should I Use?

### "I want the easiest solution"
→ **Use GitHub Actions Workflow** (Option A above)

### "I want to see what's being fixed"
→ **Use `fix-secrets-from-alerts.sh`** (Option B above)

### "I only want to fix code files"
→ **Use `fix-all-secrets-comprehensive.js`**

### "I only want to fix documentation"
→ **Use `fix-docs-secrets.sh`**

### "I've already fixed everything manually"
→ **Use `resolve-secret-scanning-alerts.sh`**

### "I need to remove secrets from git history"
→ **Use `remove-secrets-from-history.sh`** (⚠️ Advanced)

---

## 📝 Current Security Issues

**28 open alerts** detected:
- 14 Supabase Service Keys
- 9 Google API Keys
- 1 GitHub OAuth Token
- 1 OpenAI API Key
- 1 Sentry Token
- 1 Google OAuth Client ID
- 1 Google OAuth Client Secret

**Files affected:** 18 files

---

## ✅ Quick Start (Copy & Paste)

### Fully Automated (Recommended)
```bash
# Just go to GitHub Actions and run the workflow!
# https://github.com/FoushWare/elzatona_web/actions/workflows/fix-and-resolve-secrets.yml
```

### Local Automated
```bash
# Fix secrets
./scripts/fix-secrets-from-alerts.sh

# Review
git diff

# Commit
git add .
git commit -m "security: Remove hardcoded secrets"
git push

# Resolve alerts
./scripts/resolve-secret-scanning-alerts.sh revoked "Fixed"
```

---

## 🔗 Related Documentation

- `SECRET_SCANNING_AUTOMATION.md` - Detailed automation guide
- `SECRET_ROTATION_GUIDE.md` - How to rotate exposed secrets
- `SECURITY.md` - Security policy

---

## ❓ FAQ

### Q: Do I need to fix everything manually?
**A:** No! Use the GitHub Actions workflow - it's fully automated.

### Q: Will the tools break my code?
**A:** No, they only replace hardcoded secrets with `process.env` references. You'll need to set environment variables.

### Q: What if a file is in git history only?
**A:** The tools will skip it (file not found). Use `remove-secrets-from-history.sh` for git history cleanup.

### Q: Do I still need to rotate secrets?
**A:** Yes! Fixing code doesn't rotate secrets. See `SECRET_ROTATION_GUIDE.md`.

### Q: Can I run multiple tools?
**A:** Yes, but start with the GitHub Actions workflow - it does everything.

---

**Last Updated:** December 2024
**Status:** All tools ready to use! 🚀

