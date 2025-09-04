# Git Version Control - Questions Bank

## Question 1: Git Workflow and Branching Strategies

**Question:** Explain different Git workflow strategies and when to use them.

**Answer:**
**1. Git Flow:**

```bash
# Main branches
main/master     # Production-ready code
develop         # Integration branch for features

# Supporting branches
feature/*       # New features
release/*       # Preparing releases
hotfix/*        # Critical production fixes

# Example workflow
git checkout develop
git checkout -b feature/user-authentication
# ... work on feature ...
git add .
git commit -m "Add user authentication"
git checkout develop
git merge feature/user-authentication
git branch -d feature/user-authentication
```

**2. GitHub Flow:**

```bash
# Simple workflow with main branch
main            # Production-ready code

# Feature branches
feature/*       # New features

# Example workflow
git checkout main
git checkout -b feature/new-feature
# ... work on feature ...
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create pull request
# After review and merge, delete branch
```

**3. GitLab Flow:**

```bash
# Environment branches
main            # Production
pre-production  # Staging
staging         # Testing

# Feature branches
feature/*       # New features

# Example workflow
git checkout main
git checkout -b feature/new-feature
# ... work on feature ...
git push origin feature/new-feature
# Merge to staging first
git checkout staging
git merge feature/new-feature
# After testing, merge to pre-production
# Finally merge to main for production
```

**4. Trunk-based Development:**

```bash
# Single main branch with short-lived feature branches
main            # Main development branch

# Short-lived feature branches (hours/days)
feature/*       # Small features

# Example workflow
git checkout main
git checkout -b feature/small-change
# ... work on feature ...
git add .
git commit -m "Small change"
git checkout main
git merge feature/small-change
git branch -d feature/small-change
```

---

## Question 2: Git Worktree

**Question:** What is Git worktree and how do you use it effectively?

**Answer:**
Git worktree allows you to have multiple working directories for the same repository.

**Basic Worktree Commands:**

```bash
# List existing worktrees
git worktree list

# Create new worktree
git worktree add ../feature-branch feature-branch

# Create worktree with new branch
git worktree add -b new-feature ../new-feature

# Remove worktree
git worktree remove ../feature-branch

# Prune deleted worktrees
git worktree prune
```

**Practical Worktree Usage:**

```bash
# Main project directory
cd /path/to/project

# Create worktree for hotfix
git worktree add ../hotfix-urgent hotfix-urgent
cd ../hotfix-urgent
# ... work on hotfix ...
git add .
git commit -m "Fix critical bug"
git push origin hotfix-urgent

# Create worktree for feature
git worktree add ../feature-auth feature-auth
cd ../feature-auth
# ... work on feature ...
git add .
git commit -m "Add authentication"
git push origin feature-auth

# Switch between worktrees
cd /path/to/project          # Main worktree
cd ../hotfix-urgent          # Hotfix worktree
cd ../feature-auth           # Feature worktree
```

**Advanced Worktree Patterns:**

```bash
# Create worktree from specific commit
git worktree add ../debug-version abc1234

# Create worktree with tracking branch
git worktree add -b feature/new-feature ../new-feature origin/develop

# List all worktrees with details
git worktree list --porcelain

# Move worktree to different location
git worktree move ../old-location ../new-location
```

**Worktree Best Practices:**

```bash
# Use descriptive directory names
git worktree add ../issue-123-fix-bug issue-123-fix-bug

# Clean up when done
git worktree remove ../feature-branch
git branch -d feature-branch

# Use worktree for parallel development
# Main worktree: production fixes
# Feature worktree: new features
# Hotfix worktree: urgent fixes
```

---

## Question 3: Git Hooks

**Question:** What are Git hooks and how do you implement them?

**Answer:**
Git hooks are scripts that run automatically at certain points in the Git workflow.

**Client-side Hooks:**

**1. Pre-commit Hook:**

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run linting
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix errors before committing."
  exit 1
fi

# Run tests
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Please fix tests before committing."
  exit 1
fi

# Check for large files
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(jpg|jpeg|png|gif|pdf)$')
if [ -n "$files" ]; then
  for file in $files; do
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    if [ $size -gt 10485760 ]; then  # 10MB
      echo "File $file is larger than 10MB. Consider using Git LFS."
      exit 1
    fi
  done
fi
```

**2. Commit-msg Hook:**

```bash
#!/bin/sh
# .git/hooks/commit-msg

# Check commit message format
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
  echo "Invalid commit message format!"
  echo "Format: type(scope): description"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi
```

**3. Pre-push Hook:**

```bash
#!/bin/sh
# .git/hooks/pre-push

# Run full test suite before pushing
echo "Running tests before push..."
npm run test:ci
if [ $? -ne 0 ]; then
  echo "Tests failed. Push aborted."
  exit 1
fi

# Check for TODO/FIXME comments
if git diff --cached --name-only | xargs grep -l "TODO\|FIXME"; then
  echo "Warning: Found TODO/FIXME comments in staged files."
  read -p "Continue with push? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
```

**Server-side Hooks:**

**1. Pre-receive Hook:**

```bash
#!/bin/sh
# .git/hooks/pre-receive

# Check branch protection
while read oldrev newrev refname; do
  if [ "$refname" = "refs/heads/main" ]; then
    # Only allow pushes from specific users
    allowed_users="user1 user2 user3"
    pusher=$(git log -1 --pretty=format:'%an' $newrev)
    if [[ ! " $allowed_users " =~ " $pusher " ]]; then
      echo "Error: User $pusher is not allowed to push to main branch"
      exit 1
    fi
  fi
done
```

**2. Update Hook:**

```bash
#!/bin/sh
# .git/hooks/update

refname=$1
oldrev=$2
newrev=$3

# Check for force push
if [ "$oldrev" != "0000000000000000000000000000000000000000" ] &&
   [ "$newrev" != "0000000000000000000000000000000000000000" ]; then
  if git merge-base --is-ancestor $oldrev $newrev; then
    : # Normal push
  else
    echo "Error: Force push detected on $refname"
    exit 1
  fi
fi
```

**3. Post-receive Hook:**

```bash
#!/bin/sh
# .git/hooks/post-receive

# Deploy to staging on push to develop
while read oldrev newrev refname; do
  if [ "$refname" = "refs/heads/develop" ]; then
    echo "Deploying to staging..."
    /path/to/deploy-script.sh staging
  elif [ "$refname" = "refs/heads/main" ]; then
    echo "Deploying to production..."
    /path/to/deploy-script.sh production
  fi
done
```

---

## Question 4: Git Advanced Commands

**Question:** Explain advanced Git commands and their use cases.

**Answer:**
**1. Git Rebase:**

```bash
# Interactive rebase to clean up commits
git rebase -i HEAD~3

# Rebase feature branch onto main
git checkout feature-branch
git rebase main

# Rebase with conflict resolution
git rebase main
# Resolve conflicts
git add .
git rebase --continue

# Abort rebase
git rebase --abort
```

**2. Git Cherry-pick:**

```bash
# Cherry-pick specific commits
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick with no commit
git cherry-pick -n abc1234
git add .
git commit -m "Cherry-picked changes"

# Cherry-pick range
git cherry-pick abc1234..def5678
```

**3. Git Stash:**

```bash
# Stash current changes
git stash

# Stash with message
git stash save "Work in progress on feature"

# List stashes
git stash list

# Apply stash
git stash apply
git stash pop  # Apply and remove

# Apply specific stash
git stash apply stash@{2}

# Drop stash
git stash drop stash@{1}

# Clear all stashes
git stash clear
```

**4. Git Bisect:**

```bash
# Start bisect to find bug
git bisect start
git bisect bad HEAD
git bisect good abc1234

# Test current commit
# If good: git bisect good
# If bad: git bisect bad

# Reset bisect
git bisect reset
```

**5. Git Submodules:**

```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Initialize submodules
git submodule init
git submodule update

# Update submodules
git submodule update --remote

# Remove submodule
git submodule deinit path/to/submodule
git rm path/to/submodule
```

---

## Question 5: Git Collaboration

**Question:** How do you collaborate effectively with Git?

**Answer:**
**1. Pull Request Workflow:**

```bash
# Fork repository
# Clone your fork
git clone https://github.com/yourusername/repo.git
cd repo

# Add upstream remote
git remote add upstream https://github.com/original/repo.git

# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"

# Push to your fork
git push origin feature/new-feature

# Create pull request on GitHub
# After review and merge, clean up
git checkout main
git pull upstream main
git push origin main
git branch -d feature/new-feature
```

**2. Code Review Process:**

```bash
# Review pull request
git fetch origin pull/123/head:pr-123
git checkout pr-123

# Test changes
npm install
npm test

# Add review comments
# Approve or request changes

# After approval, merge
git checkout main
git merge pr-123
git push origin main
```

**3. Conflict Resolution:**

```bash
# Pull latest changes
git pull origin main

# Resolve conflicts
git status
# Edit conflicted files
git add .
git commit -m "Resolve merge conflicts"

# Push resolved changes
git push origin feature-branch
```

**4. Branch Protection:**

```bash
# Protect main branch
git config branch.main.protect true

# Require pull request reviews
# Set up branch protection rules in GitHub/GitLab

# Require status checks
# Set up CI/CD checks that must pass
```

---

## Question 6: Git Best Practices

**Question:** What are Git best practices for team development?

**Answer:**
**1. Commit Message Convention:**

```bash
# Conventional Commits format
feat: add user authentication
fix: resolve login bug
docs: update API documentation
style: format code with prettier
refactor: extract user service
test: add unit tests for auth
chore: update dependencies

# With scope
feat(auth): add OAuth integration
fix(api): handle rate limiting
docs(readme): add installation guide

# With breaking changes
feat!: change API response format
feat(api)!: remove deprecated endpoints
```

**2. Branch Naming:**

```bash
# Feature branches
feature/user-authentication
feature/payment-integration
feature/dashboard-redesign

# Bug fixes
bugfix/login-error
bugfix/memory-leak
bugfix/validation-issue

# Hotfixes
hotfix/security-patch
hotfix/critical-bug

# Releases
release/v1.2.0
release/v2.0.0
```

**3. Git Configuration:**

```bash
# Global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main

# Useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Line ending configuration
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux
```

**4. Repository Structure:**

```bash
# .gitignore best practices
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.min.js
*.min.css

# Environment files
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Runtime data
pids/
*.pid
*.seed
```

**5. Team Workflow:**

```bash
# Daily workflow
git checkout main
git pull origin main
git checkout -b feature/daily-work
# ... work ...
git add .
git commit -m "feat: add daily work"
git push origin feature/daily-work
# Create pull request

# Weekly cleanup
git checkout main
git pull origin main
git branch -d feature/completed-feature
git push origin --delete feature/completed-feature
```
