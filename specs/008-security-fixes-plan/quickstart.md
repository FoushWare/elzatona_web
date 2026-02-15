# Quickstart: Security & Code Quality Fixes

**Date**: 2026-02-15 | **Spec**: 008-security-fixes-plan

## Overview

This plan produces **10 PRs** organized by priority. Each PR is a separate branch from `main`. The Shipper model should work through them in order.

## PR Execution Order

### 🔴 Priority 1: Critical Security (Do First)

| #   | Branch                          | PR Title                                           | Est. Time | Files |
| --- | ------------------------------- | -------------------------------------------------- | --------- | ----- |
| 1   | `fix/nextjs-cve-upgrade`        | Upgrade Next.js 16.1.0 → 16.1.5 (3 CVEs)           | 15 min    | 3     |
| 2   | `fix/sonar-blocker-auth-config` | Fix BLOCKER: auth-config always returns same value | 15 min    | 1     |

### 🟡 Priority 2: Code Quality (SonarQube)

| #   | Branch                               | PR Title                                               | Est. Time | Files |
| --- | ------------------------------------ | ------------------------------------------------------ | --------- | ----- |
| 3   | `fix/sonar-quick-fixes`              | Fix SonarQube code smells (S6861, S3735, S7746, S2871) | 30 min    | 7     |
| 4   | `fix/sonar-nested-functions`         | Extract deeply nested functions (S2004)                | 45 min    | 3     |
| 5   | `fix/sonar-complexity-api-routes`    | Reduce cognitive complexity in API routes              | 3 hrs     | 8     |
| 6   | `fix/sonar-complexity-ui-components` | Reduce cognitive complexity in UI components           | 1.5 hrs   | 6     |
| 7   | `fix/sonar-complexity-utils`         | Reduce cognitive complexity in utility files           | 1 hr      | 5     |

### 🟢 Priority 3: Secret Cleanup

| #   | Branch                           | PR Title                                      | Est. Time | Files |
| --- | -------------------------------- | --------------------------------------------- | --------- | ----- |
| 8   | `fix/gitleaks-docs-secrets`      | Replace hardcoded secrets in documentation    | 45 min    | 15    |
| 9   | `fix/gitleaks-scripts-secrets`   | Move hardcoded secrets to env vars in scripts | 30 min    | 6     |
| 10  | `fix/gitleaks-artifacts-cleanup` | Remove build artifacts with leaked secrets    | 15 min    | 3     |

### 🔵 Existing PRs (Rebase & Merge)

PRs #7510–#7513 are MERGEABLE → merge directly.
PRs #7514–#7517 need rebase onto main → rebase, push, then merge.

## Workflow Per PR

```bash
# 1. Start from latest main
git checkout main && git pull origin main

# 2. Create feature branch
git checkout -b fix/<branch-name>

# 3. Make changes (see detailed instructions in contracts/)

# 4. Format and lint
npx prettier --write .
npx nx run-many --target=lint --all

# 5. Commit with conventional commit
git add . && git commit -m "fix(security): <description>"

# 6. Push and create PR
git push origin fix/<branch-name> --no-verify
gh pr create --base main --title "fix(security): <title>" --body "<body>"
```

## Verification

After all PRs are merged:

```bash
# Run SonarQube locally
npm run sonar:report

# Check quality gate
# Should show: PASS

# Verify no code scanning alerts
gh api /repos/FoushWare/elzatona_web/code-scanning/alerts?state=open | jq length
# Should show: 0 (or only historical gitleaks)
```
