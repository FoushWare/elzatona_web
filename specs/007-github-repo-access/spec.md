# Feature Specification: MoltBot GitHub CLI Integration for elzatona_web

**Feature Branch**: `007-github-repo-access`  
**Created**: February 3, 2026  
**Status**: Draft  
**Input**: User description: "Configure MoltBot on VPS to use GitHub CLI (gh) with minimal privileges to work on FoushWare/elzatona_web repo via Telegram commands"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Ask MoltBot to Clone and Explore Repo (Priority: P1)

As a developer, I want to message MoltBot on Telegram asking it to clone elzatona_web and explore the codebase, so I can get information about the project without SSH access.

**Why this priority**: This is the foundation — MoltBot needs repo access before any other GitHub operations. Read-only exploration is the safest starting point.

**Independent Test**: Send Telegram message "clone the elzatona_web repo and show me the folder structure" and verify MoltBot clones and responds with the directory listing.

**Acceptance Scenarios**:

1. **Given** MoltBot is running with gh authenticated, **When** user sends "clone elzatona_web", **Then** MoltBot clones repo to workspace and confirms success.
2. **Given** repo is cloned, **When** user asks "what's in src folder?", **Then** MoltBot lists the contents.
3. **Given** repo is cloned, **When** user asks "show me the README", **Then** MoltBot displays the README content.

---

### User Story 2 - Ask MoltBot to Create Branch and Make Changes (Priority: P2)

As a developer, I want to message MoltBot on Telegram to create a feature branch and make code changes, so I can develop remotely via chat.

**Why this priority**: After reading, developers need to make changes. This enables the core development workflow via Telegram.

**Independent Test**: Send "create branch fix/typo and update the README title" and verify the branch is created with the change committed.

**Acceptance Scenarios**:

1. **Given** repo is cloned, **When** user sends "create branch feature/new-page", **Then** MoltBot creates and switches to the new branch.
2. **Given** on a feature branch, **When** user sends "edit file X and change Y to Z", **Then** MoltBot makes the edit and shows the diff.
3. **Given** changes are made, **When** user sends "commit with message 'fix typo'", **Then** MoltBot commits the changes.

---

### User Story 3 - Ask MoltBot to Push and Create PR (Priority: P3)

As a developer, I want to message MoltBot on Telegram to push my branch and create a pull request, so I can submit changes for review without leaving Telegram.

**Why this priority**: Completes the development loop — changes need to be shared via PRs for team collaboration.

**Independent Test**: Send "push this branch and create a PR to main" and verify PR appears on GitHub.

**Acceptance Scenarios**:

1. **Given** commits exist on feature branch, **When** user sends "push to origin", **Then** MoltBot pushes and confirms with the remote URL.
2. **Given** branch is pushed, **When** user sends "create PR titled 'Fix typo in README'", **Then** MoltBot creates draft PR and returns the PR URL.
3. **Given** PR exists, **When** user sends "what's the status of my PR?", **Then** MoltBot shows PR status, reviews, and CI checks.

---

### User Story 4 - Ask MoltBot to Check Issues and PRs (Priority: P2)

As a developer, I want to ask MoltBot about open issues and PRs on the repo, so I can stay informed about project status via Telegram.

**Why this priority**: Visibility into project status is essential for remote work and doesn't require write access.

**Independent Test**: Send "show me open issues" and verify MoltBot lists issues from the repo.

**Acceptance Scenarios**:

1. **Given** gh is authenticated, **When** user sends "list open issues", **Then** MoltBot shows issue titles and numbers.
2. **Given** gh is authenticated, **When** user sends "show PR #5", **Then** MoltBot displays PR details.
3. **Given** gh is authenticated, **When** user sends "list my PRs", **Then** MoltBot shows PRs authored by the authenticated user.

---

### Edge Cases

- What happens when gh token is invalid? → MoltBot reports auth error and provides instructions to re-authenticate.
- What happens when user asks to access a different repo? → MoltBot checks if token has access; if not, explains the token is scoped to elzatona_web only.
- What happens when push fails due to conflicts? → MoltBot explains the conflict and suggests pulling first.
- What happens when network is down? → MoltBot retries briefly, then reports connectivity issue.
- What happens when user isn't approved in MoltBot? → Pairing flow is required before any commands work.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: VPS MUST have GitHub CLI (`gh`) installed and available in PATH.
- **FR-002**: gh MUST be authenticated with a Fine-Grained PAT scoped to FoushWare/elzatona_web repository only.
- **FR-003**: Token MUST have minimal required permissions: Contents (read/write), Pull Requests (read/write), Issues (read), Metadata (read).
- **FR-004**: Token MUST be stored securely (e.g., `~/.config/gh/hosts.yml` or environment variable) with no exposure in logs.
- **FR-005**: MoltBot MUST be able to execute gh CLI commands on the VPS when receiving Telegram messages.
- **FR-006**: MoltBot MUST clone the repo to a workspace directory (e.g., `/opt/elzatona_web` or `~/workspace/elzatona_web`).
- **FR-007**: MoltBot MUST support git operations: clone, pull, branch, checkout, add, commit, push.
- **FR-008**: MoltBot MUST support gh operations: pr create, pr list, pr view, issue list, issue view, repo view.
- **FR-009**: MoltBot MUST return command output to the user via Telegram in a readable format.
- **FR-010**: MoltBot MUST log all GitHub operations for audit (excluding sensitive tokens).
- **FR-011**: Only approved Telegram users (via pairing) can execute GitHub commands.

### Key Entities

- **GitHubToken**: Fine-Grained PAT; scoped to single repo, has expiration, stored securely on VPS.
- **Workspace**: Local clone directory on VPS where MoltBot operates on the repo.
- **TelegramUser**: Approved user who can send commands; identified by Telegram user ID.
- **Command**: User message parsed by MoltBot; mapped to gh/git CLI execution.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: User can clone repo and get file listing via Telegram in under 60 seconds.
- **SC-002**: User can create branch, edit file, commit, and push via Telegram in under 3 minutes.
- **SC-003**: User can create a PR via Telegram and receive the PR URL within 30 seconds.
- **SC-004**: User can list issues and PRs via Telegram within 10 seconds.
- **SC-005**: 100% of gh errors result in user-friendly Telegram messages with guidance.
- **SC-006**: Zero token exposure in Telegram messages or MoltBot logs.

## Setup & Configuration

### Prerequisites

1. **GitHub Account**: User must have access to FoushWare/elzatona_web repository.
2. **VPS Setup**: Git and GitHub CLI (`gh`) must be installed on the VPS.
3. **MoltBot Running**: OpenClaw/MoltBot must be installed, running, and Telegram pairing completed.

### Create Fine-Grained PAT on GitHub

1. Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Name: `moltbot-elzatona-web` (or similar)
4. Expiration: 90 days (recommended)
5. Repository access: `FoushWare/elzatona_web` (only this repo)
6. Permissions:
   - Contents: Read and Write
   - Pull Requests: Read and Write
   - Issues: Read
   - Metadata: Read (always required)
7. Click "Generate token" and copy the token (you'll only see it once)

### Configure GitHub CLI on VPS

1. SSH into the VPS
2. Install `gh` if not already installed:
   ```bash
   sudo apt update && sudo apt install -y gh
   ```
3. Authenticate with the token:
   ```bash
   gh auth login
   # When prompted:
   # - Protocol: HTTPS
   # - Authenticate git with your GitHub credentials: Yes
   # - Paste your token when asked
   ```
   Or use the token directly (non-interactive):
   ```bash
   echo "<PASTE_TOKEN_HERE>" | gh auth login --with-token
   ```
4. Verify authentication:
   ```bash
   gh repo view FoushWare/elzatona_web
   ```

### Configure MoltBot to Use gh

MoltBot needs to be configured to execute `gh` commands. Options:

1. **As Commands/Skills**: Add custom OpenClaw commands that wrap gh CLI (e.g., "repo clone", "pr create", "issue list").
2. **As Environment Variable**: Store token in MoltBot's environment (e.g., `GITHUB_TOKEN` in `/opt/elzatona_web/.env`).
3. **As Hooks/Workflows**: Create OpenClaw workflows that listen for Telegram messages matching git/gh patterns and execute corresponding commands.

Token storage location (pick one):

- `~/.config/gh/hosts.yml` (default gh location, auto-managed by `gh auth`)
- `GITHUB_TOKEN` environment variable in MoltBot's systemd unit or .env file
- `/opt/elzatona_web/.env` with permissions `chmod 600`

## Setup Instructions

### 1. Create Fine-Grained Personal Access Token (PAT) on GitHub

This is a one-time setup to create a scoped token that can only access the elzatona_web repo (not your entire GitHub account).

**Steps**:

1. Go to https://github.com/settings/tokens?type=beta
2. Click "Generate new token"
3. Configure:
   - **Token name**: `elzatona-moltbot-token`
   - **Expiration**: 90 days (set a reminder to rotate before expiration)
   - **Repository access**: Select "Only select repositories" → Choose `FoushWare/elzatona_web`
   - **Permissions** (expand each section):
     - ✅ Repository permissions:
       - Contents: Read and Write
       - Pull requests: Read and Write
       - Issues: Read
     - ✅ Account permissions:
       - Metadata: Read (always required)
4. Click "Generate token"
5. **Copy the token immediately** (you won't see it again)

**Security Notes**:

- This token can ONLY access the elzatona_web repository
- It cannot access other repos or your account settings
- It cannot delete the repo (no Admin permissions)
- Expires in 90 days (you'll need to create a new one)

### 2. Deploy Token to VPS

Run the automated setup script (from your local machine):

```bash
cd infrastructure/terraform/azure/openclaw-vm

# Make script executable
chmod +x setup-github-token.sh

# Run with your token and VM details
./setup-github-token.sh 104.40.244.55 github_pat_YOUR_TOKEN_HERE azureuser FoushWare elzatona_web
```

**What this script does**:

1. Validates the token works with GitHub
2. Copies token securely to VPS via SSH
3. Installs GitHub CLI on VPS (if not present)
4. Configures gh to use the token
5. Creates `.env` file for MoltBot with token reference
6. Tests gh commands (non-destructive: `gh repo view`, `gh issue list`)

**Script output** will show:

```
✅ Token validated successfully
✅ Token copied to VPS
✅ gh CLI installed and configured on VPS
✅ gh commands verified on VPS
```

**If script fails**:

- Check VM is running and reachable: `ping 104.40.244.55`
- Check SSH key is correct: `ls ~/.ssh/id_rsa`
- Check token is valid: Try `gh auth login` locally first
- Check repo access: Token must have access to `FoushWare/elzatona_web`

### 3. Verify Setup on VPS

SSH to the VPS and test manually:

```bash
# SSH to VPS
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

# Check gh auth is working
gh repo view FoushWare/elzatona_web

# List issues (should work even if empty)
gh issue list -R FoushWare/elzatona_web

# Check token is stored securely
ls -la ~/.config/gh/hosts.yml  # Should show mode 600 (rw-------)
```

## Assumptions

- MoltBot (OpenClaw) is installed and running on the VPS with Telegram provider configured.
- User has completed Telegram pairing and is approved.
- VPS has internet access to GitHub (github.com and api.github.com).
- Git is installed on the VPS.
- User has created a Fine-Grained PAT on GitHub (scoped to elzatona_web only).
- User has run `setup-github-token.sh` to deploy the token to VPS.
- MoltBot is configured with custom commands or workflows to invoke gh CLI and return results to Telegram.

## Security Considerations

- Use Fine-Grained PAT (not classic PAT) to limit access to single repository.
- Set token expiration (recommend 90 days) and rotate periodically.
- Required scopes for FoushWare/elzatona_web:
  - Contents: Read and Write
  - Pull Requests: Read and Write
  - Issues: Read
  - Metadata: Read (always required)
- Never log or display the token in Telegram responses.
- Only paired/approved Telegram users can execute commands.
