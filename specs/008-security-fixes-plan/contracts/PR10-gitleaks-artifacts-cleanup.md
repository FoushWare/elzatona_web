# PR 10: Remove Build Artifacts Containing Leaked Secrets

**Branch**: `fix/gitleaks-artifacts-cleanup`
**Priority**: 🔴 HIGH (build artifacts with real AWS keys in repo)
**Gitleaks Rules**: aws-access-key, generic-api-key

## Instructions

Delete tracked build artifacts that should never have been committed and add them to `.gitignore`.

## Files to Delete

### 1. playwright-report/index.html

**Alert type**: aws-access-key
**Reason**: Playwright HTML report was accidentally committed; contains AWS credentials in test output

```bash
git rm playwright-report/index.html
```

### 2. static/main.js

**Alert types**: generic-api-key, aws-access-key
**Reason**: Build artifact (bundled JS) containing all environment secrets baked in at build time

```bash
git rm static/main.js
```

### 3. playwright-report/ (entire directory if exists)

**Reason**: All report artifacts should be gitignored

```bash
git rm -r --cached playwright-report/ 2>/dev/null || true
```

## Update .gitignore

Add these entries if not already present:

```gitignore
# Build artifacts
static/
dist/
.next/
out/

# Test reports
playwright-report/
test-results/
coverage/

# Environment files
.env
.env.local
.env.*.local
```

## Verify .gitignore Works

```bash
# After adding to .gitignore, verify files are no longer tracked
git status --porcelain | grep -E "playwright-report|static/main"
# Should show 'D' (deleted) entries, no new tracked files
```

## BFG Consideration (Optional, for git history)

> **Note**: Deleting files from the working tree doesn't remove them from git history.
> For complete remediation, after this PR merges, consider running:
>
> ```bash
> # Install BFG Repo-Cleaner
> brew install bfg
>
> # Remove files from all history
> bfg --delete-files main.js --no-blob-protection
> bfg --delete-folders playwright-report --no-blob-protection
>
> # Force push (coordinate with team!)
> git reflog expire --expire=now --all
> git gc --prune=now --aggressive
> git push --force
> ```
>
> This is destructive and requires team coordination. Schedule separately.

## Commit

```bash
git commit -m "fix(security): remove build artifacts containing leaked secrets

- Delete playwright-report/index.html (contains AWS access key)
- Delete static/main.js (contains bundled API keys)
- Update .gitignore to prevent future commits of build artifacts"
```
