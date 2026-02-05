# 🚀 MoltBot GitHub Integration - Quick Reference

**Status**: ✅ OPERATIONAL  
**Token**: ✅ Deployed & Verified  
**Repository**: ✅ Cloned to ~/workspace/elzatona_web  
**Telegram**: ✅ Responding to commands

---

## Available Telegram Commands

### Repository Operations

| Command            | What It Does                              |
| ------------------ | ----------------------------------------- |
| `clone the repo`   | Clone FoushWare/elzatona_web to workspace |
| `show structure`   | List folder structure                     |
| `folder structure` | Same as above                             |
| `show README`      | Display README.md content                 |
| `read file [name]` | Show file content                         |

### Branch Operations

| Command                | What It Does                   |
| ---------------------- | ------------------------------ |
| `create branch [name]` | Create and checkout new branch |
| `new branch [name]`    | Same as above                  |
| `list branches`        | Show all branches              |
| `show branches`        | Same as above                  |
| `current branch`       | Show which branch you're on    |
| `switch to [name]`     | Switch to existing branch      |
| `checkout [name]`      | Same as above                  |

### Commit & Push

| Command                 | What It Does                  |
| ----------------------- | ----------------------------- |
| `commit [message]`      | Stage all and commit          |
| `commit with [message]` | Same as above                 |
| `push`                  | Push current branch to origin |
| `push to origin`        | Same as above                 |
| `push branch`           | Same as above                 |
| `show commits`          | Show last 10 commits          |
| `last commits`          | Same as above                 |
| `commit history`        | Same as above                 |

### Pull Requests

| Command               | What It Does                          |
| --------------------- | ------------------------------------- |
| `create pr`           | Create PR from current branch to main |
| `create pull request` | Same as above                         |
| `pr [title]`          | Create PR with title                  |
| `new pr`              | Same as above                         |
| `show prs`            | List open PRs                         |
| `list prs`            | Same as above                         |
| `pr [number]`         | Show PR details                       |
| `pr status`           | Check PR status                       |

### Issues

| Command               | What It Does       |
| --------------------- | ------------------ |
| `show issues`         | List open issues   |
| `list issues`         | Same as above      |
| `open issues`         | Same as above      |
| `show issue [number]` | Show issue details |
| `issue [number]`      | Same as above      |

### Help & Info

| Command           | What It Does                |
| ----------------- | --------------------------- |
| `help`            | Show available commands     |
| `what can you do` | Same as above               |
| `status`          | Check if MoltBot is working |
| `test`            | Same as above               |

---

## Complete Workflow Example

### Create a Feature Branch and Make Changes

**1. Create branch**

```
You: "create branch fix/homepage-typo"
MoltBot: "✅ Branch fix/homepage-typo created"
```

**2. Show files**

```
You: "show structure"
MoltBot: Shows folder listing
```

**3. View a file**

```
You: "show README"
MoltBot: Shows README content
```

**4. Commit changes**

```
You: "commit Fix typo in main heading"
MoltBot: "✅ Committed: Fix typo in main heading"
```

**5. Push to GitHub**

```
You: "push to origin"
MoltBot: "✅ Pushed to origin/fix/homepage-typo"
```

**6. Create Pull Request**

```
You: "create pr Fix homepage typo"
MoltBot: "✅ PR created! #205"
```

**7. Check PR status**

```
You: "pr 205"
MoltBot: Shows PR details and status
```

---

## System Information

### GitHub Token

| Property    | Value                                 |
| ----------- | ------------------------------------- |
| Type        | Fine-Grained PAT                      |
| Scope       | FoushWare/elzatona_web only           |
| Permissions | Contents (R/W), PRs (R/W), Issues (R) |
| Expiration  | 90 days from creation                 |
| Storage     | ~/.config/gh/hosts.yml (VPS)          |
| Status      | ✅ Active and verified                |

### Repository Location

| Property | Value                                         |
| -------- | --------------------------------------------- |
| Location | ~/workspace/elzatona_web                      |
| Remote   | https://github.com/FoushWare/elzatona_web.git |
| Protocol | HTTPS (token-based)                           |
| Size     | 341 MB                                        |
| Objects  | 49,110                                        |
| Status   | ✅ Cloned and ready                           |

### VPS & Gateway

| Property     | Value                      |
| ------------ | -------------------------- |
| IP Address   | 104.40.244.55              |
| SSH User     | azureuser                  |
| Gateway      | OpenClaw v2026.2.1         |
| Service      | openclaw-gateway (systemd) |
| Telegram Bot | @HamadapilotBot            |
| Status       | ✅ Running                 |

---

## Troubleshooting Checklist

### MoltBot Not Responding?

**1. Check gateway status**

```bash
ssh azureuser@104.40.244.55
systemctl --user status openclaw-gateway
```

→ Should show `Active: active (running)`

**2. Check canvas file**

```bash
ls -la ~/.openclaw/canvas/github.md
```

→ Should exist (3877+ bytes)

**3. View gateway logs**

```bash
journalctl --user -u openclaw-gateway -n 30
```

→ Should show `[telegram]` messages without errors

**4. Restart gateway**

```bash
systemctl --user restart openclaw-gateway
sleep 3
systemctl --user status openclaw-gateway
```

### Token Not Working?

**Check token status**

```bash
gh auth status
```

→ Should show "Logged in to github.com as FoushWare"

**Redeploy if needed**

```bash
./infrastructure/terraform/azure/openclaw-vm/setup-github-token.sh \
  104.40.244.55 \
  github_pat_NEW_TOKEN \
  azureuser \
  FoushWare \
  elzatona_web
```

### Repository Not Cloned?

**Check repository**

```bash
ls -la ~/workspace/elzatona_web/
```

→ Should show `src/`, `docs/`, `.git/`, etc.

**Reclone if needed**

```bash
cd ~/workspace
git clone https://github.com/FoushWare/elzatona_web.git
cd elzatona_web
git log --oneline -5
```

---

## VPS SSH Commands

### Connect to VPS

```bash
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
```

### Gateway Management

```bash
# Check status
systemctl --user status openclaw-gateway

# Start gateway
systemctl --user start openclaw-gateway

# Stop gateway
systemctl --user stop openclaw-gateway

# Restart gateway
systemctl --user restart openclaw-gateway

# View logs
journalctl --user -u openclaw-gateway -f

# Last 50 lines of logs
journalctl --user -u openclaw-gateway -n 50
```

### Token Management

```bash
# Check token status
gh auth status

# Verify token works
gh repo view FoushWare/elzatona_web

# List GitHub config
gh config list
```

### Repository Management

```bash
# Navigate to repo
cd ~/workspace/elzatona_web

# Check current branch
git branch --show-current

# Show recent commits
git log --oneline -10

# Check git status
git status

# Pull latest changes
git pull origin main

# List all branches
git branch -a
```

---

## Common Errors & Fixes

### Error: "Permission denied (publickey)"

**Cause**: Git trying to use SSH instead of HTTPS
**Fix**: Set git protocol to HTTPS

```bash
gh config set git_protocol https
```

### Error: "Could not read from remote repository"

**Cause**: Token invalid or expired
**Fix**: Redeploy token (see "Token Not Working?" above)

### Error: "branch doesn't exist"

**Cause**: You asked for a branch that doesn't exist
**Fix**: Use `list branches` to see available branches

### Error: "push failed due to conflicts"

**Cause**: Remote changed, need to sync first
**Fix**: Pull first with `git pull origin main`

### Error: "MoltBot not responding"

**Cause**: Gateway crashed or telegram pairing expired
**Fix**: Restart gateway, check logs (see "Troubleshooting Checklist" above)

---

## Security Reminders

✅ **DO**:

- Use the Fine-Grained PAT for all GitHub operations
- Keep token expiration in mind (90 days)
- Report any token leaks immediately
- Use HTTPS (not SSH) for git operations

❌ **DON'T**:

- Commit private keys to git
- Share token in Telegram messages
- Hardcode token in scripts
- Use classic PAT (too broad permissions)

---

## Token Maintenance

### Before Day 80 (Token Expiration)

1. Create new Fine-Grained PAT at https://github.com/settings/tokens?type=beta
2. Configure: Name, 90-day expiration, FoushWare/elzatona_web, same permissions
3. Copy token (shown only once)
4. Deploy to VPS:
   ```bash
   ./infrastructure/terraform/azure/openclaw-vm/setup-github-token.sh \
     104.40.244.55 \
     github_pat_NEW_TOKEN \
     azureuser \
     FoushWare \
     elzatona_web
   ```
5. Verify: `gh repo view FoushWare/elzatona_web`
6. Delete old token on GitHub

### If Token Expires

All GitHub operations will fail with auth error. Immediately deploy new token following steps above.

---

## Files Reference

| File                                       | Purpose                      |
| ------------------------------------------ | ---------------------------- |
| MOLTBOT_GITHUB_INTEGRATION_COMPLETE.md     | Full documentation           |
| GITHUB_TOKEN_SETUP.md                      | Token setup guide            |
| GITHUB_TOKEN_DEPLOYMENT_COMPLETE.md        | Deployment details           |
| PHASE_3_SSH_CLONE_AND_TELEGRAM_COMMANDS.md | Workflow guide               |
| cleanup-git.sh                             | Remove private keys from git |
| setup-github-token.sh                      | Deploy token to VPS          |

---

## Support

For detailed information:

- **Full documentation**: MOLTBOT_GITHUB_INTEGRATION_COMPLETE.md
- **Setup guide**: GITHUB_TOKEN_SETUP.md
- **Troubleshooting**: GITHUB_TOKEN_DEPLOYMENT_COMPLETE.md

For issues:

1. Check logs: `journalctl --user -u openclaw-gateway -n 50`
2. Verify token: `gh auth status` on VPS
3. Restart gateway: `systemctl --user restart openclaw-gateway`
4. Consult troubleshooting section above

---

**Status**: ✅ Fully Operational  
**Last Updated**: February 5, 2026  
**Token Expires**: 90 days from creation date  
**Next Maintenance**: Day 80 (token rotation)
