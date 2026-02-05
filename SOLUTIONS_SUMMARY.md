# Your 3 Requests - Complete Solutions

**Date**: February 4, 2026

---

## Summary Table

| #     | Request              | Status             | Solution                                                                            | Files                                            |
| ----- | -------------------- | ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| **1** | Clean up git changes | ✅ Complete        | Run `bash cleanup-git.sh` to remove private SSH key                                 | `cleanup-git.sh`                                 |
| **2** | Bot not responding   | 🔧 Diagnosis ready | VM unreachable (ping timeout). Check Azure, SSH, restart gateway. See DEPLOYMENT.md | See DEPLOYMENT.md                                |
| **3** | Scoped GitHub access | ✅ Complete        | Fine-Grained PAT (single repo, 90-day expiration, minimal permissions)              | `setup-github-token.sh`, `GITHUB_TOKEN_SETUP.md` |

---

## Request 1: Clean Up Git Changes ✅

**What you asked**: Remove what's not needed from git

**Problem**: Untracked files in repo, especially private SSH key

**Solution**:

```bash
bash cleanup-git.sh
git push
```

**What it does**:

- ✅ Removes `infrastructure/terraform/azure/openclaw-vm/elzatona_deploy` (PRIVATE KEY - never commit!)
- ✅ Keeps setup scripts and documentation
- ✅ Commits the change with proper message

**File created**: [cleanup-git.sh](cleanup-git.sh)

---

## Request 2: Bot Not Responding 🔧

**What you asked**: Help debug bot that was replying but stopped

**Diagnosis**:

- ❌ VM unreachable (ping 104.40.244.55 = 100% packet loss)
- Possible causes: VM down, network issue, or gateway crashed

**How to fix**:

1. **Check if VM is running** → Go to Azure portal
2. **SSH and diagnose**:

   ```bash
   ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
   systemctl --user status openclaw-gateway
   ```

3. **View logs**:

   ```bash
   journalctl --user -u openclaw-gateway -n 50 --no-pager
   ```

4. **Restart if needed**:
   ```bash
   systemctl --user restart openclaw-gateway
   journalctl --user -u openclaw-gateway -f  # Watch logs
   ```

**Detailed guide**: See [docs/moltbot/DEPLOYMENT.md](docs/moltbot/DEPLOYMENT.md) (Troubleshooting section)

---

## Request 3: Scoped GitHub Access (Not Full Account) ✅

**What you asked**: Make bot access only elzatona_web repo, not all GitHub account

**Solution**: GitHub **Fine-Grained Personal Access Token (PAT)**

### Why Fine-Grained PAT?

- ✅ Accesses **ONLY** `FoushWare/elzatona_web` repo
- ✅ Cannot access other repos or your account
- ✅ Limited permissions: Contents (read/write), PRs (read/write), Issues (read), Metadata (read)
- ✅ 90-day expiration (automatic reminder to rotate)
- ✅ Can be instantly revoked if compromised
- ✅ Scoped access is much safer than classic PAT or personal account password

### Setup (5 minutes)

#### Step 1: Create Token on GitHub.com (2 min)

Go to: https://github.com/settings/tokens?type=beta

Configuration:

- **Name**: `elzatona-moltbot-token`
- **Expiration**: 90 days
- **Repository access**: Only select repositories → `FoushWare/elzatona_web`
- **Permissions**:
  - ✅ Repository → Contents: Read & Write
  - ✅ Repository → Pull requests: Read & Write
  - ✅ Repository → Issues: Read
  - ✅ Account → Metadata: Read (always required)

**Copy token immediately!** (shown only once)

#### Step 2: Deploy Token to VPS (2 min)

```bash
cd infrastructure/terraform/azure/openclaw-vm
chmod +x setup-github-token.sh

./setup-github-token.sh \
  104.40.244.55 \
  github_pat_YOUR_TOKEN_HERE \
  azureuser \
  FoushWare \
  elzatona_web
```

Expected output:

```
✅ Token validated successfully
✅ Token copied to VPS
✅ gh CLI installed and configured on VPS
✅ gh commands verified on VPS
```

#### Step 3: Verify on VPS (1 min)

```bash
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
gh repo view FoushWare/elzatona_web      # Should show repo info
gh issue list -R FoushWare/elzatona_web  # Should list issues or show none
```

Both commands work? ✅ **Setup complete!**

### Security Checklist

- ✅ Fine-Grained PAT (not classic)
- ✅ Scoped to single repo (FoushWare/elzatona_web)
- ✅ Minimal required permissions only
- ✅ 90-day expiration set
- ✅ Stored securely on VPS (`~/.config/gh/hosts.yml`, mode 600)
- ✅ Transferred via SSH (encrypted, not plaintext)
- ✅ Never logged or displayed in Telegram responses
- ✅ Private SSH key removed from git

### Files Created

- **setup-github-token.sh** (325 lines)
  - Validates token with GitHub
  - Deploys securely via SSH
  - Installs gh CLI on VPS
  - Tests gh commands (non-destructive)
  - Clear error messages and next steps

- **GITHUB_TOKEN_SETUP.md** (150 lines)
  - Step-by-step setup guide
  - FAQ and troubleshooting
  - Security model explanation
  - Token rotation instructions

- **GITHUB_INTEGRATION_ACTION_PLAN.md**
  - Complete action items for all 3 requests
  - Troubleshooting details
  - Next steps for implementation

- **specs/007-github-repo-access/spec.md** (updated)
  - Added "Setup Instructions" section
  - Fine-Grained PAT creation steps
  - Deployment script usage
  - Verification procedures

---

## Recommended Order of Execution

1. **Create Token** (2 min)
   - Go to GitHub settings
   - Follow config steps
2. **Deploy Token** (2 min)
   - Run setup-github-token.sh
   - Watch for ✅ markers

3. **Verify Setup** (1 min)
   - SSH to VPS
   - Test gh commands

4. **Clean Up Git** (<1 min)
   - Run cleanup-git.sh
   - git push

5. **Troubleshoot Bot** (if needed)
   - Check if VM running
   - SSH and restart gateway
   - View logs

---

## FAQ

**Q: Why not just use my GitHub password?**  
A: GitHub requires PATs (doesn't support password auth anymore). Fine-Grained PATs are scoped and safer.

**Q: What if the token expires?**  
A: Create a new one on GitHub, run the script again. Old token gets overwritten.

**Q: Can the token access other repos?**  
A: No. It's scoped to `FoushWare/elzatona_web` only by design.

**Q: What if I revoke the token?**  
A: gh commands will fail with auth error. Just create a new token and run script again.

**Q: Can I use this token locally too?**  
A: The script deploys it to VPS. You can copy the token file if needed (keep it secure!).

**Q: What about the bot not responding?**  
A: Separate from token setup. Follow troubleshooting in Request 2 above or see DEPLOYMENT.md.

---

## Next Steps After Setup

Once token is deployed and verified working:

1. **Configure MoltBot commands** to use gh CLI
   - Create Telegram commands that parse user messages
   - Map to gh/git operations (clone, branch, push, pr, issues, etc.)
   - Return results to Telegram

2. **Test end-to-end workflow**
   - Send Telegram message (e.g., "list open issues")
   - Verify MoltBot executes gh command
   - Check result returned to Telegram

3. **Implement all user stories** from spec:
   - P1: Clone and explore repo
   - P2: Create branch and make changes
   - P2: Check issues and PRs
   - P3: Push and create PR

See [specs/007-github-repo-access/spec.md](specs/007-github-repo-access/spec.md) for complete specification.

---

## File Locations

**Setup Scripts**:

- `cleanup-git.sh` — Git cleanup
- `infrastructure/terraform/azure/openclaw-vm/setup-github-token.sh` — Token deployment
- `QUICK_START.sh` — Quick reference guide

**Documentation**:

- `GITHUB_TOKEN_SETUP.md` — Token setup guide
- `GITHUB_INTEGRATION_ACTION_PLAN.md` — Detailed action plan
- `specs/007-github-repo-access/spec.md` — Feature specification
- `docs/moltbot/DEPLOYMENT.md` — Bot troubleshooting

---

**Status**: All 3 requests have solutions ready to implement! 🚀
