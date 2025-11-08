# Removing Secrets from Git History

## ⚠️ WARNING

Removing secrets from git history **rewrites history** and requires force pushing. This affects all collaborators and should be done carefully.

## Step 1: Identify Commits with Secrets

Use the search script to find commits containing secrets:

```bash
bash .cursor/scripts/search-git-history-for-secrets.sh
```

Or manually search:

```bash
# Search for specific patterns
git log --all -p -S "AIzaSy" --oneline
git log --all -p -S "YOUR_SUPABASE_KEY_HERE" --oneline
git log --all -p -S "BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ" --oneline
```

## Step 2: Rotate Exposed Keys FIRST

**BEFORE removing from git history**, rotate all exposed keys:

1. **Supabase:**
   - Go to Supabase Dashboard → Settings → API
   - Regenerate service role key
   - Regenerate anon key (if needed)

2. **Firebase:**
   - Go to Firebase Console → Project Settings
   - Regenerate API keys

3. **JWT Secrets:**
   - Generate new JWT secrets
   - Update all environments

## Step 3: Remove Secrets from History

### Option A: Using git-filter-repo (Recommended)

```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove specific strings from all commits
git filter-repo --replace-text <(echo "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y==>your-firebase-api-key-here")
git filter-repo --replace-text <(echo "YOUR_SUPABASE_KEY_HERE...==>your-supabase-anon-key-here")
git filter-repo --replace-text <(echo "BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ==>your-service-role-key-here")
```

### Option B: Using BFG Repo-Cleaner

```bash
# Download BFG
# https://rtyley.github.io/bfg-repo-cleaner/

# Create a file with secrets to remove
echo "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y" > secrets.txt
echo "YOUR_SUPABASE_KEY_HERE..." >> secrets.txt

# Remove secrets
java -jar bfg.jar --replace-text secrets.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Option C: Manual git filter-branch (Not Recommended)

```bash
# This is more complex and error-prone
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all
```

## Step 4: Force Push (⚠️ DANGEROUS)

**Only do this after:**

1. ✅ All secrets have been rotated
2. ✅ All team members are notified
3. ✅ You have a backup

```bash
# Force push to remote
git push origin --force --all
git push origin --force --tags
```

## Step 5: Notify Team

All team members must:

```bash
# Fetch latest
git fetch origin

# Reset their local branches
git reset --hard origin/main

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

## Alternative: Keep History, Just Rotate Keys

If rewriting history is too risky, you can:

1. **Rotate all exposed keys** (most important)
2. **Add secrets to .gitignore** (prevent future commits)
3. **Use git-secrets** to prevent future commits:

```bash
# Install git-secrets
brew install git-secrets  # macOS
# or
git clone https://github.com/awslabs/git-secrets.git

# Configure
git secrets --install
git secrets --register-aws

# Add custom patterns
git secrets --add 'AIzaSy[A-Za-z0-9_-]{35}'
git secrets --add 'YOUR_SUPABASE_KEY_HERE'
```

## Best Practices Going Forward

1. **Never commit secrets** - Use environment variables
2. **Use git-secrets** - Prevent accidental commits
3. **Use pre-commit hooks** - Scan for secrets before commit
4. **Use secret scanning tools** - GitHub, GitLab have built-in scanning
5. **Rotate keys regularly** - Even if not exposed

## Tools for Secret Detection

- **git-secrets** - AWS tool for preventing secret commits
- **truffleHog** - Scans git history for secrets
- **git-hound** - Finds secrets in git history
- **detect-secrets** - Pre-commit hook for secret detection

## Example: Using truffleHog

```bash
# Install
pip install truffleHog

# Scan repository
trufflehog --regex --entropy=False .

# Scan specific commits
trufflehog --regex --entropy=False git file://. --since-commit HEAD~10
```
