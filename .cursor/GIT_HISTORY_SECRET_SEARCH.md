# Git History Secret Search Guide

## Quick Search Commands

### Search for Specific API Keys in History

```bash
# Search for Firebase API keys
git log --all -p -S "AIzaSy" --oneline

# Search for JWT tokens (Supabase anon keys)
git log --all -p -S "YOUR_SUPABASE_KEY_HERE" --oneline

# Search for specific service role key
git log --all -p -S "process.env.SUPABASE_SERVICE_ROLE_KEY" --oneline

# Search for project identifiers
git log --all -p -S "hpnewqkvpnthpohvxcmq" --oneline
```

### Search All Commits for Patterns

```bash
# Search in all commits for any file containing the pattern
git log --all --source --pretty=format:"%H %s" | while read commit; do
  git show $commit | grep -l "AIzaSy\|YOUR_SUPABASE_KEY_HERE" && echo "Found in: $commit"
done
```

### Search in Specific Files Across History

```bash
# Search in .env files (if they were ever committed)
git log --all --source --pretty=format:"%H" -- ".env*" | while read commit; do
  git show $commit:.env 2>/dev/null | grep -E "(API_KEY|SECRET|PASSWORD)" && echo "Found in commit: $commit"
done
```

### Comprehensive Search Script

Use the provided script:

```bash
bash .cursor/scripts/search-git-history-for-secrets.sh
```

## What to Search For

### Common Patterns

1. **Firebase API Keys:**
   - Pattern: `AIzaSy[A-Za-z0-9_-]{35}`
   - Example: `AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y`

2. **JWT Tokens:**
   - Pattern: `YOUR_SUPABASE_KEY_HERE`
   - These are Supabase anon keys or JWT tokens

3. **Service Role Keys:**
   - Pattern: Long JWT tokens ending with specific signatures
   - Example: `process.env.SUPABASE_SERVICE_ROLE_KEY`

4. **Project Identifiers:**
   - Supabase project refs: `hpnewqkvpnthpohvxcmq`
   - Firebase project IDs: `fir-demo-project-adffb`

5. **Hardcoded Secrets:**
   - JWT secrets: `elzatona-super-secret-jwt-key-2024-production-ready`
   - NextAuth secrets: `elzatona-nextauth-secret-2024-production-ready`

## If Secrets Are Found

### Step 1: Rotate Keys IMMEDIATELY

**Before removing from git history**, rotate all exposed keys:

1. **Supabase Dashboard:**
   - Settings → API → Regenerate service_role key
   - Regenerate anon key if needed

2. **Firebase Console:**
   - Project Settings → General → Regenerate API keys

3. **Update all environments** with new keys

### Step 2: Remove from Git History

See `.cursor/scripts/remove-secrets-from-git-history.md` for detailed instructions.

**Quick option using git-filter-repo:**

```bash
# Install
pip install git-filter-repo

# Create replacement file
cat > replacements.txt << EOF
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y==>your-firebase-api-key-here
<<<<<<< HEAD
<<<<<<< HEAD
YOUR_SUPABASE_KEY_HERE...==>your-supabase-anon-key-here
=======
YOUR_SUPABASE_KEY_HERE
>>>>>>> origin/security/fix-gitleaks-config
=======
YOUR_SUPABASE_KEY_HERE
>>>>>>> origin/main
process.env.SUPABASE_SERVICE_ROLE_KEY==>your-service-role-key-here
EOF

# Apply replacements
git filter-repo --replace-text replacements.txt

# Force push (⚠️ WARNING: Rewrites history)
git push origin --force --all
```

### Step 3: Prevent Future Commits

```bash
# Install git-secrets
brew install git-secrets  # macOS

# Configure
git secrets --install
git secrets --add 'AIzaSy[A-Za-z0-9_-]{35}'
git secrets --add 'YOUR_SUPABASE_KEY_HERE'
```

## Alternative: Use Secret Scanning Tools

### truffleHog

```bash
# Install
pip install truffleHog

# Scan entire repository
trufflehog --regex --entropy=False .

# Scan specific commits
trufflehog --regex --entropy=False git file://. --since-commit HEAD~50
```

### detect-secrets

```bash
# Install
pip install detect-secrets

# Scan
detect-secrets scan . > .secrets.baseline

# Audit
detect-secrets audit .secrets.baseline
```

## Important Notes

1. **Rotate keys FIRST** - Don't just remove from history
2. **Notify team** - If rewriting history, everyone needs to reset
3. **Backup first** - Create a backup before rewriting history
4. **Test locally** - Test the removal on a copy first
5. **Consider alternatives** - Sometimes just rotating keys is safer

## Files Created

1. `.cursor/scripts/search-git-history-for-secrets.sh` - Search script
2. `.cursor/scripts/remove-secrets-from-git-history.md` - Removal guide
3. `.cursor/GIT_HISTORY_SECRET_SEARCH.md` - This file
