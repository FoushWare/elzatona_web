# PR 2: Fix BLOCKER — auth-config Always Returns Same Value

**Branch**: `fix/sonar-blocker-auth-config`
**Priority**: 🔴 BLOCKER
**SonarQube Rule**: S3516

## Target File

`apps/website/src/app/lib/auth-config.ts` — Line 47

## Issue

The function at line 47 always returns the same value regardless of input conditions. This is a BLOCKER-level SonarQube issue.

## Instructions

### Step 1: Read the file

Read `apps/website/src/app/lib/auth-config.ts` in full.

### Step 2: Identify the function

Find the function at line 47 that triggers S3516. Analyze its control flow to understand:

- What different values SHOULD it return?
- Which branch is dead code?

### Step 3: Fix the logic

Common patterns:

- If the function is supposed to return different values based on conditions, fix the conditions
- If one branch should return `true` and another `false`, ensure both paths are reachable
- If the function is intentionally constant, convert it to a `const` variable

### Step 4: Test

```bash
npx nx run website:build
```

### Step 5: Commit

```bash
git commit -m "fix(auth): resolve BLOCKER S3516 — auth-config function always returns same value"
```
