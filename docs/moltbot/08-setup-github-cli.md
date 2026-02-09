# Task 8: Setup GitHub CLI

> **Time**: 15-20 minutes  
> **Prerequisites**: GitHub account, VPS with dependencies installed

---

## Checklist

- [ ] Install GitHub CLI
- [ ] Authenticate with GitHub
- [ ] Install Copilot extension
- [ ] Clone elzatona_web repository
- [ ] Configure git identity
- [ ] Test GitHub operations

---

## Step 1: Install GitHub CLI

Should already be installed from Task 4, but verify:

```bash
# SSH into VPS
ssh moltbot

# Check if installed
gh --version

# If not installed:
type -p curl >/dev/null || sudo apt install curl -y
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y
```

---

## Step 2: Authenticate with GitHub

### Option A: Interactive Login (Recommended)

```bash
gh auth login
```

Follow the prompts:

```
? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser

! First copy your one-time code: XXXX-XXXX
Press Enter to open github.com in your browser...
```

Since VPS has no browser, use device code:

1. Go to https://github.com/login/device on your local machine
2. Enter the code shown in terminal
3. Authorize the application

### Option B: Token-Based Login

1. Create a Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes:
     - `repo` (Full control of private repositories)
     - `read:org` (Read org membership)
     - `workflow` (Update GitHub Actions workflows)
   - Copy the token

2. Login with token:

```bash
gh auth login --with-token < <(echo "ghp_xxxxxxxxxxxxxxxxxxxx")

# Or interactively
gh auth login
# Choose "Paste an authentication token"
```

### Save Token for MoltBot

```bash
# Add to credentials
nano ~/.moltbot-credentials

# Add:
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## Step 3: Install Copilot CLI Extension

```bash
# Install Copilot extension
gh extension install github/gh-copilot

# Verify
gh copilot --version

# Test (needs Copilot access)
gh copilot explain "what is a git rebase"
```

---

## Step 4: Configure Git Identity

```bash
# Set your identity (use your GitHub email)
git config --global user.name "Hamada Bot"
git config --global user.email "your-email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set credential helper
git config --global credential.helper store

# Verify
git config --list
```

---

## Step 5: Clone elzatona_web Repository

```bash
# Clone the repository
cd ~
gh repo clone FoushWare/elzatona_web

# Or with HTTPS
git clone https://github.com/FoushWare/elzatona_web.git

# Navigate to repo
cd elzatona_web

# Install dependencies
npm install

# Verify
ls -la
git status
```

---

## Step 6: Test GitHub Operations

### Test Issue Access

```bash
cd ~/elzatona_web

# List open issues
gh issue list

# View a specific issue
gh issue view 1

# List labels
gh label list
```

### Test PR Operations

```bash
# List PRs
gh pr list

# Check PR status
gh pr status
```

### Test Repository Info

```bash
# View repo info
gh repo view

# View collaborators
gh api repos/FoushWare/elzatona_web/collaborators
```

---

## Step 7: Configure Git Hooks (Optional)

Disable local hooks on VPS (we run checks manually):

```bash
cd ~/elzatona_web

# Disable husky (if present)
git config core.hooksPath /dev/null

# Or remove hooks
rm -rf .git/hooks/*
```

---

## Step 8: Create GitHub Operations Script

Create helper functions for MoltBot:

```bash
cat > ~/moltbot/github-ops.sh << 'EOF'
#!/bin/bash
# GitHub operations for Hamada bot

REPO_DIR="$HOME/elzatona_web"

# List issues
list_issues() {
  cd "$REPO_DIR"
  gh issue list --limit 20
}

# Get issue details
get_issue() {
  local issue_num=$1
  cd "$REPO_DIR"
  gh issue view "$issue_num"
}

# Create branch for issue
create_issue_branch() {
  local issue_num=$1
  cd "$REPO_DIR"
  git fetch origin
  git checkout -b "fix/issue-$issue_num" origin/develop
}

# Commit changes
commit_changes() {
  local message=$1
  cd "$REPO_DIR"
  git add -A
  git commit -m "$message"
}

# Push changes
push_changes() {
  local branch=$(git branch --show-current)
  cd "$REPO_DIR"
  git push -u origin "$branch"
}

# Create PR
create_pr() {
  local title=$1
  local body=$2
  cd "$REPO_DIR"
  gh pr create --title "$title" --body "$body" --base develop
}

# Get repo status
repo_status() {
  cd "$REPO_DIR"
  echo "=== Git Status ==="
  git status -s
  echo ""
  echo "=== Recent Commits ==="
  git log --oneline -5
  echo ""
  echo "=== Current Branch ==="
  git branch --show-current
}

# Pull latest changes
pull_latest() {
  cd "$REPO_DIR"
  git fetch origin
  git pull origin develop
}

# Run command based on argument
case "$1" in
  list-issues) list_issues ;;
  get-issue) get_issue "$2" ;;
  create-branch) create_issue_branch "$2" ;;
  commit) commit_changes "$2" ;;
  push) push_changes ;;
  create-pr) create_pr "$2" "$3" ;;
  status) repo_status ;;
  pull) pull_latest ;;
  *) echo "Usage: $0 {list-issues|get-issue|create-branch|commit|push|create-pr|status|pull}" ;;
esac
EOF

chmod +x ~/moltbot/github-ops.sh
```

Test the script:

```bash
# List issues
~/moltbot/github-ops.sh list-issues

# Get repo status
~/moltbot/github-ops.sh status

# Pull latest
~/moltbot/github-ops.sh pull
```

---

## Verification Checklist

Run these commands to verify setup:

```bash
# 1. GitHub CLI authenticated
gh auth status
# Should show: ✓ Logged in to github.com

# 2. Can access repo
gh repo view FoushWare/elzatona_web

# 3. Can list issues
cd ~/elzatona_web && gh issue list

# 4. Git configured
git config user.name
git config user.email

# 5. Copilot CLI works
gh copilot --version

# 6. Repo cloned and updated
cd ~/elzatona_web && git status
```

---

## Quick Reference

```bash
# GitHub CLI
gh auth status          # Check auth
gh issue list           # List issues
gh issue view <n>       # View issue
gh pr list              # List PRs
gh pr create            # Create PR
gh repo view            # Repo info

# Git operations
git fetch origin        # Fetch updates
git pull origin develop # Pull develop
git checkout -b <branch># New branch
git add -A              # Stage all
git commit -m "msg"     # Commit
git push                # Push

# Copilot CLI
gh copilot explain "x"  # Explain code
gh copilot suggest "x"  # Suggest command
```

---

## Troubleshooting

### "authentication required" error

```bash
# Re-authenticate
gh auth logout
gh auth login
```

### "repository not found" error

```bash
# Check if you have access
gh api repos/FoushWare/elzatona_web

# Check your username
gh api user | jq '.login'
```

### Can't push to repository

```bash
# Check remote URL
git remote -v

# Set correct remote
git remote set-url origin https://github.com/FoushWare/elzatona_web.git

# Or use gh CLI
gh repo set-default FoushWare/elzatona_web
```

---

## Next Task

Once GitHub CLI is set up, proceed to:  
➡️ [Task 9: Configure Cloudflare](./09-configure-cloudflare.md)
