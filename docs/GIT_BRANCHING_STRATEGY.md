# Git Branching Strategy

## Overview

This document describes the Git branching strategy for the project. The strategy ensures that `main` branch only contains releases and hotfixes, while features are developed in isolation and integrated through a controlled flow.

## Branch Hierarchy

```
main (production)
  ├── releases (release preparation)
  │     └── develop (feature integration)
  │           └── feature/* (individual features)
  └── hotfix/* (emergency fixes)
```

## Branch Types

### 1. `main` Branch

- **Purpose**: Production-ready code only
- **Contains**: Releases and hotfixes
- **Protection**: Should be protected, requires PR reviews
- **Never**: Direct commits (except hotfixes in emergencies)

### 2. `releases` Branch

- **Purpose**: Release preparation and testing
- **Created from**: `main`
- **Merged to**: `main` (after testing and approval)
- **Contains**: Accumulated features from `develop` ready for release

### 3. `develop` Branch

- **Purpose**: Feature integration and continuous development
- **Created from**: `main` (or `releases` if it exists)
- **Merged to**: `releases` (when features are ready for release)
- **Contains**: Multiple merged feature branches

### 4. `feature/*` Branches

- **Purpose**: Individual feature development
- **Created from**: `develop`
- **Merged to**: `develop` (via Pull Request)
- **Naming**: `feature/feature-name` or `feat/feature-name`

### 5. `hotfix/*` Branches

- **Purpose**: Emergency fixes for production
- **Created from**: `main`
- **Merged to**: `main` and `releases` (and optionally `develop`)
- **Naming**: `hotfix/issue-description`

## Workflow

### Feature Development Flow

1. **Start Feature Development**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-new-feature
   ```

2. **Work on Feature**
   - Make commits on your feature branch
   - Push to remote: `git push -u origin feature/my-new-feature`

3. **Merge Feature to Develop**
   - Create Pull Request: `feature/my-new-feature` → `develop`
   - Review and approve
   - Merge PR to `develop`

4. **Accumulate Features in Develop**
   - Multiple features can be merged to `develop`
   - Test integration of features together

5. **Prepare Release**

   ```bash
   git checkout releases
   git pull origin releases
   git merge develop
   git push origin releases
   ```

   - Or create PR: `develop` → `releases`
   - Test release candidate thoroughly

6. **Release to Production**

   ```bash
   git checkout main
   git pull origin main
   git merge releases
   git push origin main
   ```

   - Or create PR: `releases` → `main`
   - Tag the release: `git tag v1.0.0 && git push origin v1.0.0`

### Hotfix Flow

1. **Create Hotfix Branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-bug-fix
   ```

2. **Fix the Issue**
   - Make commits on hotfix branch
   - Test thoroughly

3. **Merge Hotfix**

   ```bash
   # Merge to main
   git checkout main
   git merge hotfix/critical-bug-fix
   git push origin main

   # Merge to releases (if exists)
   git checkout releases
   git merge hotfix/critical-bug-fix
   git push origin releases

   # Merge to develop (to keep it in sync)
   git checkout develop
   git merge hotfix/critical-bug-fix
   git push origin develop
   ```

## Branch Creation Commands

### Initial Setup (One-time)

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create releases branch from main
git checkout -b releases
git push -u origin releases

# Create develop branch from main (if not exists)
git checkout main
git checkout -b develop
git push -u origin develop
```

### Daily Workflow

```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/my-feature-name

# Work and commit
git add .
git commit -m "feat: Add new feature"
git push -u origin feature/my-feature-name

# After PR is merged to develop, update local
git checkout develop
git pull origin develop
```

## Pull Request Guidelines

### Feature → Develop

- **Title**: `feat: Feature description`
- **Description**: What the feature does, how to test
- **Reviewers**: At least one approval required
- **Checks**: All CI checks must pass

### Develop → Releases

- **Title**: `chore: Prepare release vX.Y.Z`
- **Description**: List of features included, testing notes
- **Reviewers**: At least two approvals required
- **Checks**: All CI checks + manual testing

### Releases → Main

- **Title**: `release: vX.Y.Z`
- **Description**: Release notes, changelog
- **Reviewers**: At least two approvals required
- **Checks**: All CI checks + production readiness verification
- **Tag**: Create version tag after merge

## Branch Protection Rules

### Main Branch

- ✅ Require pull request reviews (2 approvals)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Include administrators
- ❌ Allow force pushes
- ❌ Allow deletions

### Releases Branch

- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ❌ Allow force pushes
- ❌ Allow deletions

### Develop Branch

- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ⚠️ Allow force pushes (for emergency fixes only)
- ❌ Allow deletions

## Best Practices

1. **Always start from the correct branch**
   - Features: from `develop`
   - Hotfixes: from `main`
   - Releases: from `main`

2. **Keep branches up to date**
   - Regularly pull latest changes
   - Rebase feature branches on `develop` if needed

3. **Use descriptive branch names**
   - ✅ `feature/user-authentication`
   - ✅ `feat/admin-dashboard`
   - ✅ `hotfix/login-redirect-bug`
   - ❌ `fix` or `new-feature`

4. **Write clear commit messages**
   - Use conventional commits format
   - `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`

5. **Clean up after merge**
   - Delete merged feature branches
   - Keep `develop`, `releases`, and `main` clean

6. **Test before merging**
   - Test features in isolation
   - Test integration in `develop`
   - Test release candidate in `releases`
   - Verify production readiness before `main`

## Example Workflow

```bash
# Day 1: Start feature
git checkout develop
git pull origin develop
git checkout -b feature/admin-login-refactor
# ... work and commit ...
git push -u origin feature/admin-login-refactor
# Create PR: feature/admin-login-refactor → develop

# Day 2: Feature merged to develop
git checkout develop
git pull origin develop
# Start another feature
git checkout -b feature/user-dashboard
# ... work ...

# Day 3: Multiple features in develop, ready for release
git checkout releases
git pull origin releases
git merge develop
# Test release candidate
git push origin releases
# Create PR: releases → main

# Day 4: Release approved and merged to main
git checkout main
git pull origin main
git tag v1.1.0
git push origin v1.1.0
```

## Emergency Hotfix Example

```bash
# Critical bug found in production
git checkout main
git pull origin main
git checkout -b hotfix/login-session-expiry

# Fix the bug
# ... make changes ...
git commit -m "fix: Resolve login session expiry issue"
git push -u origin hotfix/login-session-expiry

# Merge to main
git checkout main
git merge hotfix/login-session-expiry
git push origin main

# Merge to releases and develop
git checkout releases
git merge hotfix/login-session-expiry
git push origin releases

git checkout develop
git merge hotfix/login-session-expiry
git push origin develop
```

## Summary

- **main**: Only releases and hotfixes
- **releases**: Created from main, receives features from develop
- **develop**: Created from main, receives features from feature branches
- **feature/\***: Created from develop, merged back to develop
- **hotfix/\***: Created from main, merged to main, releases, and develop

This strategy ensures:

- ✅ Clean production history
- ✅ Isolated feature development
- ✅ Controlled release process
- ✅ Easy rollback if needed
- ✅ Clear separation of concerns
