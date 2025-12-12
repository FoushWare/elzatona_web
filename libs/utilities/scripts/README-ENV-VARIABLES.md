# Environment Variables Setup

This project uses environment variables for all secrets and sensitive configuration. **Never hardcode secrets in code!**

## 🔒 Security Rules

- ✅ **ALWAYS** use environment variables for secrets
- ✅ **ALWAYS** add secrets to `.env.local` (git-ignored)
- ✅ **ALWAYS** use `.env.example` for documentation
- ❌ **NEVER** hardcode secrets in code
- ❌ **NEVER** commit `.env.local` to git

## 📋 Required Environment Variables

### SonarQube/SonarCloud Token

**Required for:** SonarQube analysis

**How to get:**

1. Go to https://sonarcloud.io/
2. Log in with GitHub
3. Go to My Account > Security
4. Generate a new token

**Setup:**

```bash
# Add to .env.local
SONAR_TOKEN=your_token_here
```

**Usage in scripts:**

- All scripts read from `process.env.SONAR_TOKEN` (Node.js)
- All scripts read from `$SONAR_TOKEN` (Bash)
- Automatically loaded from `.env.local` in hooks

## 🔧 How Scripts Load Environment Variables

### Node.js Scripts

```javascript
// Reads from process.env
const sonarToken = process.env.SONAR_TOKEN;
if (!sonarToken) {
  // Error: token not set
}
```

### Bash Scripts

```bash
# Load from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Use the variable
if [ -n "$SONAR_TOKEN" ]; then
  # Token is set
fi
```

### Git Hooks

The pre-push hook automatically loads `.env.local`:

```bash
# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi
```

## 📁 File Structure

```
.env.example          # Template (committed to git)
.env.local            # Your actual secrets (git-ignored)
.gitignore            # Ensures .env.local is ignored
```

## ✅ Verification

### Check if token is set:

```bash
# In Node.js scripts
echo $SONAR_TOKEN  # Should show your token (or nothing if not set)

# In bash
if [ -n "$SONAR_TOKEN" ]; then
  echo "Token is set"
else
  echo "Token is not set"
fi
```

### Verify .env.local is git-ignored:

```bash
git check-ignore .env.local
# Should output: .env.local
```

### Check for hardcoded secrets:

```bash
# Search for potential hardcoded tokens (should find nothing)
grep -r "e410633adf39138ed522d35a8216146ed7750aa5" . --exclude-dir=node_modules
# Should return: No matches found
```

## 🚨 If You Accidentally Commit Secrets

1. **Rotate the secret immediately** (generate new token)
2. **Remove from git history** (use git history remediation scripts)
3. **Update .env.local** with new token
4. **Never commit the new token**

## 📚 Related Documentation

- `README-CODE-QUALITY.md` - Code quality tools
- `README-GIT-HOOKS.md` - Git hooks documentation
- `.gitignore` - Ensures .env.local is ignored
