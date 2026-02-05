# 🚀 MoltBot GitHub Integration - Next Steps

**Status**: Ready to deploy  
**Token**: ✅ Deployed and verified  
**Goal**: SSH to VPS → Clone repo → Listen for Telegram commands

---

## Phase 1: SSH to VPS and Clone Repository (10 minutes)

### Step 1: Connect to VPS via SSH

```bash
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
```

**Expected output:**

```
Welcome to Ubuntu 22.04.3 LTS
Last login: [date]
azureuser@openclaw-vm:~$
```

If connection fails:

- Check VM is running in Azure portal
- Verify SSH key: `ls -la ~/.ssh/id_rsa`
- Test connectivity: `ping 104.40.244.55`

### Step 2: Create Workspace Directory (if not exists)

```bash
mkdir -p /opt/workspace
cd /opt/workspace
```

### Step 3: Clone the Repository Using Token

```bash
gh repo clone FoushWare/elzatona_web
cd elzatona_web
```

**Expected output:**

```
Cloning into 'elzatona_web'...
remote: Enumerating objects: [count], done.
Cloning complete!
```

If clone fails:

- Verify token: `gh auth status`
- Check token permissions: `gh api user/repos`
- Verify gh CLI version: `gh --version`

### Step 4: Verify Repository Cloned

```bash
git log --oneline -5
```

**Expected output:** Last 5 commits from the repository

---

## Phase 2: Set Up MoltBot for Telegram Commands (15 minutes)

### Step 1: Stop Current OpenClaw Gateway

```bash
systemctl --user stop openclaw-gateway
```

### Step 2: Check OpenClaw Canvas Configuration

The OpenClaw gateway reads commands from `.openclaw/canvas.md`. You need to add GitHub CLI handlers.

```bash
ls -la ~/.openclaw/
```

Should show:

- `canvas.md` (main configuration)
- `config.json` (settings)
- Other state files

### Step 3: View Current Canvas

```bash
cat ~/.openclaw/canvas.md | head -50
```

This shows current MoltBot capabilities.

### Step 4: Create GitHub Commands Handler

The canvas file contains command patterns. You need to add handlers for:

- Clone
- Branch
- Commit
- Push
- Create PR
- List issues

Example structure (will be integrated into canvas.md):

```markdown
## GitHub Commands

### Clone Repository

Pattern: `clone the repo|clone elzatona|clone elzatona_web`
Handler: Execute `gh repo clone FoushWare/elzatona_web /opt/workspace/elzatona_web`
Response: Send directory listing to Telegram

### Create Branch

Pattern: `create branch [branch-name]|new branch [name]`
Handler: Execute `git checkout -b [branch-name]`
Response: Confirm branch creation

### Commit Changes

Pattern: `commit|commit with message [message]`
Handler: Execute `git add . && git commit -m "[message]"`
Response: Show commit hash and message

### Push to Remote

Pattern: `push|push this branch|push to origin`
Handler: Execute `git push origin [current-branch]`
Response: Confirm push and show remote URL

### Create Pull Request

Pattern: `create pr|create pull request|pr [title]`
Handler: Execute `gh pr create -t "[title]" -B main`
Response: Show PR number and URL

### List Issues

Pattern: `show issues|list issues|what issues`
Handler: Execute `gh issue list`
Response: Format and send issue list
```

---

## Phase 3: Modify OpenClaw Gateway Canvas (Command Integration)

### Option A: Manual Edit (Recommended for learning)

1. **Edit canvas.md file:**

```bash
nano ~/.openclaw/canvas.md
```

2. **Add GitHub Commands section** at the end with patterns and handlers

3. **Restart gateway:**

```bash
systemctl --user start openclaw-gateway
```

4. **Check logs:**

```bash
journalctl --user -u openclaw-gateway -n 20 -f
```

### Option B: Programmatic Edit (Using script)

Create a script to inject GitHub commands into canvas:

```bash
cat >> ~/.openclaw/canvas.md << 'EOF'

## GitHub Repository Commands

### Clone Repository
**Pattern**: "clone the repo", "clone elzatona", "setup repo"
**Action**: Execute `gh repo clone FoushWare/elzatona_web /opt/workspace/elzatona_web && ls -la /opt/workspace/elzatona_web/src`
**Response**: Send folder structure to Telegram user

### Create Feature Branch
**Pattern**: "create branch [name]", "new branch [name]", "checkout [name]"
**Action**: Execute in /opt/workspace/elzatona_web: `git checkout -b $BRANCH_NAME`
**Response**: Confirm branch created

### Make Commit
**Pattern**: "commit [message]", "commit with [message]"
**Action**: Execute in /opt/workspace/elzatona_web: `git add . && git commit -m "$MESSAGE"`
**Response**: Show commit hash and message

### Push Changes
**Pattern**: "push", "push to origin", "push branch"
**Action**: Execute in /opt/workspace/elzatona_web: `git push origin $(git rev-parse --abbrev-ref HEAD)`
**Response**: Confirm push to GitHub

### Create Pull Request
**Pattern**: "create pr", "pr [title]", "pull request"
**Action**: Execute `gh pr create -t "$TITLE" -B main -H $(git rev-parse --abbrev-ref HEAD)`
**Response**: Return PR number and URL

### List Issues
**Pattern**: "show issues", "list issues", "what issues"
**Action**: Execute `gh issue list -R FoushWare/elzatona_web --limit 10`
**Response**: Format and send issue list to Telegram

### List Pull Requests
**Pattern**: "show prs", "list prs", "what prs"
**Action**: Execute `gh pr list -R FoushWare/elzatona_web --limit 10`
**Response**: Format and send PR list to Telegram

### Check Repository Status
**Pattern**: "repo status", "repo info", "what's in the repo"
**Action**: Execute `gh repo view FoushWare/elzatona_web`
**Response**: Send repo details (stars, watchers, description)

### Show File Content
**Pattern**: "show [filename]", "read [filename]", "what's in [filename]"
**Action**: Execute `cat /opt/workspace/elzatona_web/$FILENAME`
**Response**: Send file content to Telegram (truncate if >4000 chars)

### Show Folder Structure
**Pattern**: "list files", "folder structure", "what's in [folder]"
**Action**: Execute `ls -la /opt/workspace/elzatona_web/$FOLDER`
**Response**: Send directory listing to Telegram

EOF
```

---

## Phase 4: Verify MoltBot is Listening (5 minutes)

### Step 1: Restart Gateway with Logs

```bash
systemctl --user restart openclaw-gateway
journalctl --user -u openclaw-gateway -f
```

Watch for:

```
[INFO] Canvas loaded with GitHub commands
[INFO] Telegram provider ready
[INFO] Listening for messages on @HamadapilotBot
```

### Step 2: Send Test Command from Telegram

Send to @HamadapilotBot:

```
clone the repo
```

### Step 3: Check Response

Expected response within 10 seconds:

```
✅ Repository cloned to /opt/workspace/elzatona_web
Folder structure:
- src/
- docs/
- .gitignore
- README.md
[etc.]
```

If no response:

1. Check logs: `journalctl --user -u openclaw-gateway -n 50`
2. Verify Telegram pairing: `/pair` command
3. Verify token: `gh auth status` on VPS
4. Check canvas syntax: `cat ~/.openclaw/canvas.md | grep -A5 "Clone Repository"`

---

## Summary of Commands

| Step | Command                                        | Location           |
| ---- | ---------------------------------------------- | ------------------ |
| 1    | `ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55` | Local machine      |
| 2    | `mkdir -p /opt/workspace && cd /opt/workspace` | VPS                |
| 3    | `gh repo clone FoushWare/elzatona_web`         | VPS                |
| 4    | `cd elzatona_web && git log --oneline -5`      | VPS                |
| 5    | `systemctl --user stop openclaw-gateway`       | VPS                |
| 6    | `cat ~/.openclaw/canvas.md \| head -50`        | VPS                |
| 7    | Add GitHub commands to canvas.md               | VPS (~/.openclaw/) |
| 8    | `systemctl --user restart openclaw-gateway`    | VPS                |
| 9    | `journalctl --user -u openclaw-gateway -f`     | VPS (logs)         |
| 10   | Send "clone the repo" to @HamadapilotBot       | Telegram           |

---

## Troubleshooting Checklist

| Issue                           | Solution                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| SSH connection fails            | Check VM running in Azure portal, verify SSH key, test ping                          |
| gh clone fails                  | Run `gh auth status`, verify token with `gh api user/repos`                          |
| Gateway won't start             | Check canvas.md syntax, view logs with journalctl                                    |
| No response to Telegram command | Verify Telegram pairing, check gateway logs, verify canvas patterns                  |
| Token auth error                | Redeploy token: `./infrastructure/terraform/azure/openclaw-vm/setup-github-token.sh` |
| Command takes too long          | Increase timeout in canvas.md, check VPS resources                                   |
| PR creation fails               | Verify main branch exists: `git branch -a` on VPS                                    |

---

## Next Actions (Priority Order)

✅ Phase 1: **SSH and Clone** (NOW)

- Connect to VPS
- Clone repo to `/opt/workspace/elzatona_web`
- Verify clone: `git log --oneline -5`

✅ Phase 2: **Add Canvas Commands** (AFTER clone works)

- Stop gateway
- Edit `.openclaw/canvas.md`
- Add GitHub command patterns
- Restart gateway

✅ Phase 3: **Test Commands** (AFTER canvas updated)

- Send "clone the repo" to Telegram
- Send "create branch test-branch"
- Send "list issues"
- Verify each response

✅ Phase 4: **Full Workflow** (AFTER commands work)

- Create branch
- Make changes
- Commit
- Push
- Create PR
- All via Telegram

---

## References

- **Setup Guide**: `GITHUB_TOKEN_SETUP.md`
- **Deployment Report**: `GITHUB_TOKEN_DEPLOYMENT_COMPLETE.md`
- **Feature Spec**: `specs/007-github-repo-access/spec.md`
- **Gateway Logs**: `journalctl --user -u openclaw-gateway -f`
- **Canvas Location**: `~/.openclaw/canvas.md` on VPS

---

**Status**: Ready to start Phase 1  
**Estimated Time**: 30 minutes total  
**Next**: SSH to VPS and run `gh repo clone FoushWare/elzatona_web`
