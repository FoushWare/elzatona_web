# Secret Scanning Automation Guide

## Overview

This repository includes automation to help resolve GitHub secret scanning alerts automatically. The automation can mark alerts as resolved after you've rotated the secrets and removed them from the codebase.

## Available Automation

### 1. Fix and Resolve Workflow (RECOMMENDED) ⭐

**File:** `.github/workflows/fix-and-resolve-secrets.yml`

**Features:**

- ✅ **Actually fixes the code** - removes/replaces hardcoded secrets
- ✅ Replaces secrets with `process.env` in code files
- ✅ Replaces secrets with placeholders in documentation
- ✅ Automatically commits fixes (optional)
- ✅ Creates PR with fixes (optional)
- ✅ Resolves secret scanning alerts after fixing
- Runs on schedule (weekly) or manual trigger

**This is the recommended workflow** as it actually fixes the security issues, not just marks them as resolved.

### 2. Auto-Resolve Workflow (Mark as Resolved Only)

**File:** `.github/workflows/auto-resolve-secret-scanning.yml`

**Features:**

- Automatically resolves secret scanning alerts
- Supports multiple resolution types
- Can filter by secret type
- Runs on schedule (daily) or manual trigger
- Provides summary of resolved alerts

**Note:** This workflow only marks alerts as resolved. It does NOT fix the code. Use the "Fix and Resolve" workflow instead.

**Usage:**

#### Manual Trigger (Recommended)

1. Go to: https://github.com/FoushWare/elzatona_web/actions/workflows/auto-resolve-secret-scanning.yml
2. Click "Run workflow"
3. Select resolution type:
   - **`revoked`** - Secret has been rotated/revoked (most common)
   - **`false_positive`** - Not actually a secret (e.g., placeholder)
   - **`used_in_tests`** - Test secret that's safe
   - **`wont_fix`** - Won't be fixed (not recommended)
4. Optionally add a comment
5. Optionally filter by secret type
6. Click "Run workflow"

#### Scheduled Run

The workflow runs daily at 2 AM UTC and automatically resolves alerts marked as `revoked`.

### 2. Local Script

**File:** `scripts/resolve-secret-scanning-alerts.sh`

**Usage:**

```bash
# Resolve all alerts as "revoked" (default)
./scripts/resolve-secret-scanning-alerts.sh

# Resolve with custom resolution and comment
./scripts/resolve-secret-scanning-alerts.sh revoked "Secrets rotated and removed from git history"

# Resolve only specific secret type
./scripts/resolve-secret-scanning-alerts.sh revoked "Resolved" supabase_service_key

# Mark as false positive
./scripts/resolve-secret-scanning-alerts.sh false_positive "This is a placeholder, not a real secret"
```

**Requirements:**

- GitHub CLI (`gh`) installed and authenticated
- Repository access permissions

## Resolution Types

### `revoked` (Recommended)

Use when:

- Secret has been rotated in the service dashboard
- Secret has been removed from codebase
- Secret is no longer valid

**Example:** Supabase key was rotated, old key removed from code

### `false_positive`

Use when:

- It's a placeholder value (e.g., `YOUR_KEY_HERE`)
- It's example code, not a real secret
- GitHub incorrectly identified it as a secret

**Example:** Documentation showing `API_KEY=example_key_12345`

### `used_in_tests`

Use when:

- Secret is only used in test files
- Test secrets are safe to expose
- Secret is for test environment only

**Example:** Test API key in `tests/` directory

### `wont_fix` (Not Recommended)

Use only if:

- Secret is intentionally public
- Cannot be rotated for business reasons
- You accept the security risk

## Current Alert Status

As of the last check, there are **28 open alerts**:

- **Supabase Service Keys**: Multiple instances in scripts and documentation
- **Google API Keys**: Multiple instances in various scripts
- **GitHub OAuth Token**: In `.cursor/mcp.json` (should be in `.gitignore`)
- **OpenAI API Key**: In `.cursor/mcp.json` (should be in `.gitignore`)
- **Sentry Token**: In documentation files
- **Google OAuth Credentials**: In documentation files

## Recommended Workflow

### Option A: Automated Fix (RECOMMENDED) ⭐

**Use the "Fix and Resolve Secrets" workflow:**

1. Go to: https://github.com/FoushWare/elzatona_web/actions/workflows/fix-and-resolve-secrets.yml
2. Click "Run workflow"
3. Configure:
   - **Auto commit**: `true` (to commit fixes)
   - **Create PR**: `true` (to create PR for review)
   - **Resolution**: `revoked` (after rotation)
4. Click "Run workflow"
5. Review the PR and merge
6. Rotate secrets (see Step 1 below)

**This workflow will:**

- ✅ Find all files with hardcoded secrets
- ✅ Replace secrets with `process.env` in code
- ✅ Replace secrets with placeholders in docs
- ✅ Commit the fixes
- ✅ Create a PR for review
- ✅ Resolve the alerts

### Option B: Manual Fix

### Step 1: Rotate Secrets (CRITICAL - Do First!)

**⚠️ IMPORTANT:** Always rotate secrets BEFORE resolving alerts!

1. **Supabase Keys**: Rotate in Supabase Dashboard
2. **Google API Keys**: Revoke/restrict in Google Cloud Console
3. **GitHub Token**: Revoke in GitHub Settings → Developer settings → Tokens
4. **OpenAI Key**: Delete in OpenAI Dashboard
5. **Sentry Token**: Revoke in Sentry Settings
6. **OAuth Credentials**: Rotate in Google Cloud Console

See `SECRET_ROTATION_GUIDE.md` for detailed instructions.

### Step 2: Remove Secrets from Codebase

1. Remove hardcoded secrets from source files
2. Replace with environment variables
3. Update `.gitignore` to exclude config files with secrets
4. Remove secrets from git history (if needed)

### Step 3: Fix the Code

**Option A: Use GitHub Actions (Recommended)**

1. Go to Actions → "Fix and Resolve Secret Scanning Issues"
2. Click "Run workflow"
3. Configure:
   - Auto commit: `true`
   - Create PR: `true`
   - Resolution: `revoked`
4. Run workflow
5. Review and merge the PR

**Option B: Use Local Script**

```bash
# Fix secrets in files
./scripts/fix-secrets-from-alerts.sh

# Review changes
git diff

# Commit fixes
git add .
git commit -m "security: Remove hardcoded secrets"

# Resolve alerts
./scripts/resolve-secret-scanning-alerts.sh revoked "Secrets removed from code"
```

### Step 4: Verify

1. Check: https://github.com/FoushWare/elzatona_web/security/secret-scanning
2. Verify alerts are marked as "Resolved"
3. Confirm no new alerts appear

## Prevention

### 1. Pre-commit Hooks

The repository includes pre-commit hooks that scan for secrets before committing:

```bash
# Check if hooks are installed
ls -la .git/hooks/pre-commit

# Install hooks if missing
npm run prepare
```

### 2. .gitignore Configuration

Ensure sensitive files are in `.gitignore`:

```
.env*
.cursor/mcp.json
*.key
*.pem
secrets/
```

### 3. Environment Variables

Always use environment variables:

```typescript
// ❌ BAD
const apiKey = "sk-1234567890";

// ✅ GOOD
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is required");
}
```

## Troubleshooting

### Workflow Fails with Permission Error

**Issue:** `Resource not accessible by integration`

**Solution:**

1. Go to: https://github.com/FoushWare/elzatona_web/settings/actions
2. Under "Workflow permissions", ensure:
   - "Read and write permissions" is selected
   - "Allow GitHub Actions to create and approve pull requests" is checked

### Script Fails with Authentication Error

**Issue:** `Not authenticated with GitHub CLI`

**Solution:**

```bash
gh auth login
# Follow prompts to authenticate
```

### Alerts Don't Resolve

**Issue:** Alerts remain open after running automation

**Possible Causes:**

1. Insufficient permissions
2. Alert is in a different state
3. API rate limiting

**Solution:**

1. Check alert status manually
2. Resolve alerts one by one via GitHub UI
3. Check workflow logs for errors

## API Reference

### GitHub Secret Scanning API

**List Alerts:**

```bash
gh api repos/OWNER/REPO/secret-scanning/alerts
```

**Resolve Alert:**

```bash
gh api repos/OWNER/REPO/secret-scanning/alerts/ALERT_NUMBER \
  --method PATCH \
  -f state=resolved \
  -f resolution=revoked \
  -f resolution_comment="Comment here"
```

**Get Alert Details:**

```bash
gh api repos/OWNER/REPO/secret-scanning/alerts/ALERT_NUMBER
```

## Best Practices

1. **Rotate First**: Always rotate secrets before resolving alerts
2. **Remove from Code**: Ensure secrets are removed from codebase
3. **Use Environment Variables**: Never hardcode secrets
4. **Regular Audits**: Check secret scanning alerts weekly
5. **Document Rotation**: Keep track of when secrets were rotated
6. **Automate Prevention**: Use pre-commit hooks to prevent future leaks

## Quick Commands

```bash
# View all open alerts
gh api repos/FoushWare/elzatona_web/secret-scanning/alerts --paginate --jq '[.[] | select(.state == "open")]'

# Count alerts by type
gh api repos/FoushWare/elzatona_web/secret-scanning/alerts --paginate --jq '[.[] | select(.state == "open") | .secret_type] | group_by(.) | map({type: .[0], count: length})'

# Resolve all alerts (after rotation)
./scripts/resolve-secret-scanning-alerts.sh revoked "Secrets rotated"
```

## Related Documentation

- `SECRET_ROTATION_GUIDE.md` - Detailed secret rotation instructions
- `SECURITY.md` - Security policy and best practices
- `.githooks/pre-commit` - Pre-commit secret scanning hook

---

**Last Updated**: December 2024
**Status**: Automation ready - Use after rotating secrets
