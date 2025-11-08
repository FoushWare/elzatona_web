# Git History Secret Search - Action Plan

## 🔍 Search Performed

I've attempted to search your git history for exposed secrets. Based on the search patterns, here's what needs to be done:

## ⚠️ Assumed Findings (Based on Current Files)

Since we found hardcoded secrets in current files, it's **highly likely** these secrets exist in git history as well.

### Secrets Likely in Git History:

1. **Firebase API Key:** `AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y`
2. **Supabase Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s`
3. **Supabase Service Role Key:** `BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ`
4. **Project Identifiers:** `hpnewqkvpnthpohvxcmq`, `fir-demo-project-adffb`

## 🚨 CRITICAL ACTIONS REQUIRED

### Step 1: Rotate Keys IMMEDIATELY ⚠️

**Before doing anything else**, rotate all exposed keys:

#### Supabase Keys:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. **Regenerate service_role key** (⚠️ This will break existing connections temporarily)
5. **Regenerate anon key** (if you want to be extra safe)
6. Update all environments with new keys

#### Firebase Keys:

1. Go to: https://console.firebase.google.com/
2. Select your project: `fir-demo-project-adffb`
3. Project Settings → General
4. **Regenerate API keys**
5. Update all environments

#### JWT Secrets:

1. Generate new secure JWT secrets
2. Update all `.env` files
3. Update production environment variables

### Step 2: Verify Secrets in History

Run these commands to confirm:

```bash
# Check for Firebase key
git log --all -p -S "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y" --oneline

# Check for Supabase keys
git log --all -p -S "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" --oneline
git log --all -p -S "BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ" --oneline
```

### Step 3: Remove from Git History

**⚠️ WARNING:** This rewrites history and requires force push!

#### Option A: Using git-filter-repo (Recommended)

```bash
# Install git-filter-repo
pip install git-filter-repo

# Create replacements file
cat > /tmp/replacements.txt << 'EOF'
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y==>your-firebase-api-key-here
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s==>your-supabase-anon-key-here
BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ==>your-service-role-key-here
hpnewqkvpnthpohvxcmq==>your-project-ref-here
fir-demo-project-adffb==>your-project-id-here
EOF

# Apply replacements
git filter-repo --replace-text /tmp/replacements.txt

# Clean up
rm /tmp/replacements.txt
```

#### Option B: Using BFG Repo-Cleaner

```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/

# Create file with secrets
cat > /tmp/secrets.txt << 'EOF'
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s
BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ
EOF

# Remove secrets
java -jar bfg.jar --replace-text /tmp/secrets.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Step 4: Force Push (⚠️ Notify Team First!)

```bash
# Force push to remote
git push origin --force --all
git push origin --force --tags
```

**⚠️ IMPORTANT:** Notify all team members before force pushing!

### Step 5: Team Members Must Reset

All team members must run:

```bash
git fetch origin
git reset --hard origin/main
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Step 6: Set Up Prevention

```bash
# Install git-secrets
brew install git-secrets  # macOS

# Configure
git secrets --install
git secrets --add 'AIzaSy[A-Za-z0-9_-]{35}'
git secrets --add 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
git secrets --add 'BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ'
```

## 📋 Checklist

- [ ] ⚠️ Rotate Supabase service_role key
- [ ] ⚠️ Rotate Supabase anon key (optional but recommended)
- [ ] ⚠️ Rotate Firebase API keys
- [ ] ⚠️ Generate new JWT secrets
- [ ] ⚠️ Update all environment variables
- [ ] Verify secrets exist in git history
- [ ] Remove secrets from git history
- [ ] Notify team about force push
- [ ] Force push to remote
- [ ] Set up git-secrets
- [ ] Update CI/CD with secret scanning

## 🎯 Priority Order

1. **IMMEDIATE:** Rotate all exposed keys
2. **HIGH:** Verify secrets in git history
3. **HIGH:** Remove from git history (after rotating keys)
4. **MEDIUM:** Set up prevention tools
5. **LOW:** Update documentation

## 📚 Resources

- **Removal Guide:** `.cursor/scripts/remove-secrets-from-git-history.md`
- **Search Guide:** `.cursor/GIT_HISTORY_SECRET_SEARCH.md`
- **git-filter-repo:** https://github.com/newren/git-filter-repo
- **BFG Repo-Cleaner:** https://rtyley.github.io/bfg-repo-cleaner/

## ⚠️ Important Notes

1. **Rotate keys FIRST** - Don't just remove from history
2. **Backup before rewriting history** - Create a backup branch
3. **Notify team** - Everyone needs to reset their local repos
4. **Test locally first** - Test on a copy before force pushing
5. **Consider alternatives** - Sometimes just rotating keys is safer than rewriting history
