# Git History Secret Remediation Guide

## 🎯 Overview

This guide provides a **complete solution** for removing secrets from git history. Even after fixing code, secrets remain in commit history and must be removed.

## ⚠️ Critical Reminder

**Secrets in git history are PERMANENT until removed!**
- ✅ Fixed code = Secrets removed from current files
- ❌ Git history = Secrets still exist in past commits
- 🔒 **Solution:** Remove from history + Rotate keys

## 🔍 Step 1: Identify Secrets in History

### Automated Scan

```bash
# Run the comprehensive history scanner
./scripts/scan-git-history-for-secrets.sh
```

This script will:
- ✅ Scan all commits in all branches
- ✅ Identify secret patterns (Supabase, Google, GitHub, etc.)
- ✅ List commits containing secrets
- ✅ Generate a report with all findings

### Manual Scan

```bash
# Search for specific patterns
git log --all -p -S "AIzaSy" --oneline | head -20
git log --all -p -S "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" --oneline | head -20
git log --all -p -S "gho_" --oneline | head -20
git log --all -p -S "sk-proj-" --oneline | head -20
```

## 🔄 Step 2: Rotate ALL Exposed Keys FIRST

**⚠️ CRITICAL: Rotate keys BEFORE removing from history!**

### Supabase Keys

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select each project
3. Settings → API → **Regenerate service_role key**
4. **Regenerate anon key** (if exposed)
5. Update all `.env` files
6. Update GitHub Secrets

### Google API Keys

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials
3. For each exposed key:
   - Click on the key
   - **Delete** or **Restrict** the key
   - Create new key if needed
4. Update all `.env` files

### GitHub Tokens

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. **Revoke** all exposed tokens
3. Create new tokens if needed
4. Update all `.env` files

### Other Secrets

- **JWT Secrets:** Generate new secrets
- **OpenAI Keys:** Rotate in OpenAI dashboard
- **Sentry Tokens:** Rotate in Sentry dashboard
- **Any other exposed secrets:** Rotate immediately

## 🛠️ Step 3: Remove Secrets from History

### Option A: Automated Removal (Recommended)

```bash
# Run the automated removal script
./scripts/remove-secrets-from-history-complete.sh
```

This script will:
- ✅ Create a backup branch
- ✅ Use git-filter-repo to remove secrets
- ✅ Replace secrets with placeholders
- ✅ Verify removal
- ✅ Provide force push instructions

### Option B: Manual Removal with git-filter-repo

```bash
# Install git-filter-repo
python3 -m pip install --user git-filter-repo

# Create replacements file
cat > /tmp/replacements.txt << 'EOF'
# Format: old_secret==>new_placeholder
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y==>YOUR_GOOGLE_API_KEY_HERE
gho_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==>YOUR_GITHUB_TOKEN_HERE
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==>YOUR_OPENAI_API_KEY_HERE
EOF

# Apply replacements
python3 -m git_filter_repo --replace-text /tmp/replacements.txt

# Clean up
rm /tmp/replacements.txt
```

### Option C: Using BFG Repo-Cleaner

```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/

# Create secrets file
cat > /tmp/secrets.txt << 'EOF'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y
EOF

# Remove secrets
java -jar bfg.jar --replace-text /tmp/secrets.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

## 🚀 Step 4: Force Push (After Rotation!)

**⚠️ WARNING: Only force push AFTER rotating all keys!**

```bash
# Verify secrets are removed
git log --all -p | grep -i "AIzaSy\|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" | head -5

# If no results, proceed with force push
git push origin --force --all
git push origin --force --tags
```

## 👥 Step 5: Notify Team Members

All team members must reset their local repositories:

```bash
# Fetch latest
git fetch origin

# Reset local branches
git reset --hard origin/main

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

## ✅ Step 6: Verify Removal

```bash
# Run the scanner again
./scripts/scan-git-history-for-secrets.sh

# Should show: "✅ No secrets found in git history"
```

## 🔒 Step 7: Prevent Future Secrets

### Install git-secrets

```bash
# macOS
brew install git-secrets

# Linux
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
sudo make install
```

### Configure git-secrets

```bash
# Install hooks
git secrets --install

# Add patterns
git secrets --add 'AIzaSy[A-Za-z0-9_-]{35}'
git secrets --add 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
git secrets --add 'gho_[A-Za-z0-9]{36}'
git secrets --add 'sk-proj-[A-Za-z0-9_-]{48}'
git secrets --add 'sntryu_[A-Za-z0-9]{64}'
```

## 📊 Complete Remediation Checklist

- [ ] **Step 1:** Scan git history for secrets
- [ ] **Step 2:** Rotate ALL exposed keys (Supabase, Google, GitHub, etc.)
- [ ] **Step 3:** Update all `.env` files with new keys
- [ ] **Step 4:** Update GitHub Secrets with new keys
- [ ] **Step 5:** Remove secrets from git history
- [ ] **Step 6:** Verify removal (scan again)
- [ ] **Step 7:** Force push to remote
- [ ] **Step 8:** Notify team members
- [ ] **Step 9:** Install git-secrets (prevention)
- [ ] **Step 10:** Verify no secrets in current code (pre-push hook)

## 🎯 Integration with Security Pipeline

This remediation process integrates with our complete security pipeline:

1. **Pre-Push Hook:** Prevents new secrets from being pushed
2. **GitHub Secret Scanning:** Detects secrets in commits
3. **Git History Remediation:** Removes secrets from history (this guide)
4. **Auto-Fix Workflows:** Fixes secrets in current code
5. **git-secrets:** Prevents future secret commits

## 📝 Example: Complete Remediation Workflow

```bash
# 1. Scan history
./scripts/scan-git-history-for-secrets.sh

# 2. Rotate keys (manual - in dashboards)
# - Supabase: Regenerate service_role key
# - Google: Delete/restrict API keys
# - GitHub: Revoke tokens

# 3. Update .env files
# Edit .env.local, .env.test.local, etc.

# 4. Update GitHub Secrets
gh secret set SUPABASE_SERVICE_ROLE_KEY --body "new-key"
gh secret set GOOGLE_API_KEY --body "new-key"

# 5. Remove from history
./scripts/remove-secrets-from-history-complete.sh

# 6. Verify
./scripts/scan-git-history-for-secrets.sh

# 7. Force push
git push origin --force --all

# 8. Install prevention
git secrets --install
git secrets --add 'AIzaSy[A-Za-z0-9_-]{35}'
```

## ⚠️ Important Notes

1. **Backup First:** Always create a backup before rewriting history
2. **Rotate Keys First:** Never remove from history before rotating keys
3. **Notify Team:** Always notify team before force pushing
4. **Test Locally:** Test history rewrite on a copy first
5. **Verify Removal:** Always verify secrets are removed after cleanup

## 🔗 Related Documentation

- `SECRET_ROTATION_GUIDE.md` - How to rotate exposed keys
- `COMPLETE_SECURITY_PIPELINE.md` - Complete security pipeline
- `SECRET_SCANNING_AUTOMATION.md` - Automated secret scanning
- `INTEGRATION_VERIFICATION.md` - Integration status

---

**Last Updated:** December 2024  
**Status:** Complete git history remediation solution

