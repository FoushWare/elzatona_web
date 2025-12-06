# Git Workflow Best Practices

## 🎯 Why Use Feature Branches & PRs?

**Direct pushes to `main` should be avoided** because:
- ❌ No code review process
- ❌ No quality checks before merge
- ❌ Can break production immediately
- ❌ Hard to track changes
- ❌ No discussion/approval process

**Feature branches + PRs provide:**
- ✅ Code review before merge
- ✅ Quality checks (SonarCloud, tests, linting)
- ✅ Discussion and collaboration
- ✅ Easy rollback if issues found
- ✅ Better change tracking

## 📋 Standard Workflow

### 1. Create Feature Branch

```bash
# Always start from main
git checkout main
git pull origin main

# Create feature branch
git checkout -b fix/sonarcloud-code-quality-issues
# or
git checkout -b feat/new-feature-name
# or
git checkout -b docs/update-readme
```

### 2. Make Changes

```bash
# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit with clear message
git commit -m "fix: Resolve SonarCloud code quality issues

- Fix require() style imports in test files
- Add display names to React components
- Replace 'any' types with proper TypeScript types
- Fix unused variables and parameters"
```

### 3. Push Feature Branch

```bash
# Push to remote (creates branch on GitHub)
git push origin fix/sonarcloud-code-quality-issues
```

### 4. Create Pull Request

1. **Go to GitHub**: https://github.com/FoushWare/elzatona_web/pulls
2. **Click "New Pull Request"**
3. **Select branches**:
   - Base: `main`
   - Compare: `fix/sonarcloud-code-quality-issues`
4. **Fill PR details**:
   - Title: Clear description
   - Description: What changed and why
   - Assign reviewers: @FoushWare
5. **Create PR**

### 5. Review & Merge

1. **Wait for CI checks** (SonarCloud, tests, linting)
2. **Review the PR** yourself
3. **Fix any issues** if CI fails
4. **Approve and merge** when ready

## 🔒 Branch Protection (Recommended)

To enforce this workflow, enable branch protection on `main`:

1. **Go to**: https://github.com/FoushWare/elzatona_web/settings/branches
2. **Add rule** for `main` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require approvals: 1 (yourself)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing the above settings

## 📝 Branch Naming Conventions

Use clear, descriptive branch names:

- `fix/` - Bug fixes
  - `fix/sonarcloud-errors`
  - `fix/login-bug`
  
- `feat/` - New features
  - `feat/user-dashboard`
  - `feat/payment-integration`
  
- `docs/` - Documentation
  - `docs/update-readme`
  - `docs/api-documentation`
  
- `refactor/` - Code refactoring
  - `refactor/auth-service`
  - `refactor/database-queries`
  
- `chore/` - Maintenance tasks
  - `chore/update-dependencies`
  - `chore/cleanup-unused-files`

## 🚨 When Direct Push to Main is OK

**Only for:**
- ✅ Emergency hotfixes (then create PR immediately after)
- ✅ Documentation-only changes (README, guides)
- ✅ Configuration files (CI/CD, linting rules)

**Even then, prefer PRs for:**
- Better tracking
- Review process
- Quality checks

## 📋 Current Workflow Status

**Current Issue**: We've been pushing directly to `main` for documentation/configuration changes.

**Going Forward**: 
- ✅ Use feature branches for all changes
- ✅ Create PRs for review
- ✅ Wait for CI checks to pass
- ✅ Merge after approval

## 🔧 Quick Commands

```bash
# Create feature branch
git checkout -b fix/issue-name

# Push and create PR
git push origin fix/issue-name
# Then go to GitHub to create PR

# After PR is merged, clean up
git checkout main
git pull origin main
git branch -d fix/issue-name  # Delete local branch
```

---

**Last Updated:** December 2024  
**Status:** Git workflow best practices documented ✅

