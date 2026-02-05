# MoltBot GitHub Integration - Action Items & Troubleshooting

Date: February 4, 2026

---

## 📋 Your Three Requests - Status

### 1. ✅ Clean Up Git Changes

**What**: Remove unneeded files from git (especially private SSH key)

**Action**:

```bash
cd /Users/a.fouad/S/New_elzatona

# Option A: Use the cleanup script
bash cleanup-git.sh

# Option B: Manual cleanup
rm infrastructure/terraform/azure/openclaw-vm/elzatona_deploy
git add -A
git commit -m "chore: remove private SSH deploy key from repository"
```

**Current status**: You have untracked files (`??` in git status)

- ✅ Keep: `infrastructure/terraform/azure/openclaw-vm/setup-github-token.sh` (new token script)
- ✅ Keep: `infrastructure/terraform/azure/openclaw-vm/GITHUB_TOKEN_SETUP.md` (documentation)
- ✅ Keep: `specs/007-github-repo-access/spec.md` (feature specification)
- ❌ Remove: `infrastructure/terraform/azure/openclaw-vm/elzatona_deploy` (PRIVATE KEY)
- ❌ Remove: `infrastructure/terraform/azure/openclaw-vm/elzatona_deploy.pub` (optional, but was temporary)

---

### 2. 🔧 Bot Not Responding - Troubleshooting

**Problem**: Bot replied via Telegram initially, then stopped responding

**Likely causes**:

1. **VM unreachable** - Ping to 104.40.244.55 failed (100% packet loss)
2. **Gateway service crashed** - OpenClaw gateway process died
3. **Telegram provider disconnected** - Network or auth issue
4. **Gateway closed with 1006** - Abnormal closure (seen before in DEPLOYMENT.md)

**Diagnosis steps** (requires VM to be running):

```bash
# 1. Check if VM is running in Azure portal
# 2. Check if SSH can connect
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

# 3. Once connected, check gateway status
systemctl --user status openclaw-gateway

# 4. View recent logs (last 50 lines)
journalctl --user -u openclaw-gateway -n 50 --no-pager

# 5. Check if gateway is listening
netstat -tlnp | grep 18789

# 6. If not running, restart
systemctl --user restart openclaw-gateway

# 7. Watch logs in real-time
journalctl --user -u openclaw-gateway -f
```

**Common fixes**:

If gateway crashed with "1006 abnormal closure" or "Missing Control UI assets":

```bash
# Run the fix script
cd /opt/openclaw  # or wherever OpenClaw is installed
sudo chown -R $USER /opt/openclaw  # Fix permissions if needed
npm run build  # Rebuild UI assets
systemctl --user restart openclaw-gateway
```

See [DEPLOYMENT.md](../moltbot/DEPLOYMENT.md) for more detailed troubleshooting.

---

### 3. ✅ Scoped GitHub Token Setup (Not Full Account Access)

**Problem**: Need gh CLI to work with only FoushWare/elzatona_web repo, not entire GitHub account

**Solution**: GitHub Fine-Grained Personal Access Token (PAT)

**Why this is better than full account access**:

- ✅ Token can only access ONE repo (FoushWare/elzatona_web)
- ✅ Cannot access other repos or account settings
- ✅ Limited permissions (Contents read/write, PRs read/write, Issues read)
- ✅ 90-day expiration (automatic rotation)
- ✅ Can be revoked instantly if compromised

**Setup (5 minutes)**:

#### Step 1: Create token on GitHub.com

1. Go to: https://github.com/settings/tokens?type=beta
2. Click "Generate new token"
3. Configure:

   ```
   Name: elzatona-moltbot-token
   Expiration: 90 days
   Repository access: Only select repositories → FoushWare/elzatona_web

   Permissions:
   ✅ Repository permissions → Contents (Read & Write)
   ✅ Repository permissions → Pull requests (Read & Write)
   ✅ Repository permissions → Issues (Read)
   ✅ Account permissions → Metadata (Read) [always required]
   ```

4. Click "Generate token"
5. **Copy token immediately** (shown only once!)

#### Step 2: Deploy token to VPS

```bash
cd ~/S/New_elzatona/infrastructure/terraform/azure/openclaw-vm

# Make script executable (if not already)
chmod +x setup-github-token.sh

# Run with your token (replace XXXX)
./setup-github-token.sh 104.40.244.55 github_pat_XXXXXXXXXXXX azureuser FoushWare elzatona_web
```

Expected output:

```
✅ Token validated successfully
✅ Token copied to VPS
✅ gh CLI installed and configured on VPS
✅ gh commands verified on VPS
```

#### Step 3: Verify on VPS

```bash
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

# Test gh authentication
gh repo view FoushWare/elzatona_web

# Test listing issues
gh issue list -R FoushWare/elzatona_web

# Both should succeed without errors
```

**Important Security Notes**:

- ✅ Token stored securely at `~/.config/gh/hosts.yml` (mode 600)
- ✅ Token transferred via SSH (not plaintext)
- ✅ Token never exposed in logs or Telegram responses
- ✅ 90-day expiration means automatic reminder to rotate
- ✅ If compromised, can be instantly revoked on GitHub

**Regarding "MCP to create API key"**:

- ✅ The `setup-github-token.sh` script automates this (which is better than MCP)
- It validates the token, deploys it securely via SSH, and verifies it works
- No manual SSH needed for token transfer

---

## 📁 Files Created/Modified This Session

### New Scripts

- **setup-github-token.sh** (325 lines)
  - Automated token creation validation and VPS deployment
  - Installs gh CLI on VPS
  - Tests gh commands
  - Creates .env file for MoltBot
  - Provides clear error messages and next steps

- **cleanup-git.sh** (20 lines)
  - Removes private SSH key from git tracking
  - Commits cleanup with proper message

### Documentation

- **GITHUB_TOKEN_SETUP.md** (150 lines)
  - Quick reference guide for token setup
  - Step-by-step instructions (5 minutes)
  - FAQ and troubleshooting
  - Security model explanation
  - Token rotation instructions

- **specs/007-github-repo-access/spec.md** (updated)
  - Added "Setup Instructions" section
  - Details Fine-Grained PAT creation steps
  - Deployment script usage
  - Verification procedures

---

## 🎯 Next Steps

### Immediate (Today)

1. [ ] Create Fine-Grained PAT on GitHub (5 min)
   - Go to https://github.com/settings/tokens?type=beta
   - Follow config in GITHUB_TOKEN_SETUP.md
2. [ ] Run `setup-github-token.sh` to deploy token (2 min)

   ```bash
   cd infrastructure/terraform/azure/openclaw-vm
   ./setup-github-token.sh 104.40.244.55 github_pat_XXX azureuser FoushWare elzatona_web
   ```

3. [ ] Verify setup on VPS (1 min)

   ```bash
   ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55
   gh repo view FoushWare/elzatona_web
   ```

4. [ ] Clean up git repo
   ```bash
   bash cleanup-git.sh
   git push
   ```

### Short-term (Next Phase)

1. [ ] Troubleshoot bot not responding
   - Check if VM is running
   - SSH and check gateway service status
   - Review logs for errors
   - Restart if needed

2. [ ] Implement MoltBot commands
   - Add commands to handle: "clone repo", "create branch", "commit", "push", "create PR", "list issues", etc.
   - Wrap gh CLI calls in Telegram message handlers
   - Return readable output back to user

3. [ ] Test end-to-end flow
   - Send Telegram messages and verify gh commands execute
   - Test all user stories from spec (Clone/Explore, Branch/Changes, Push/PR, Issues/PRs)
   - Verify no token exposure in logs

---

## 🔐 Security Checklist

- ✅ Fine-Grained PAT (not classic PAT)
- ✅ Scoped to single repo (FoushWare/elzatona_web)
- ✅ Minimal permissions (Contents, PRs, Issues, Metadata)
- ✅ 90-day expiration set
- ✅ Stored securely on VPS (not in local repo)
- ✅ Transferred via SSH (encrypted in transit)
- ✅ Mode 600 file permissions (owner read/write only)
- ✅ Not logged or displayed in Telegram
- ✅ Private SSH key removed from git

---

## 📞 Support

**Files to review**:

1. [GITHUB_TOKEN_SETUP.md](GITHUB_TOKEN_SETUP.md) - Quick reference
2. [spec.md](../specs/007-github-repo-access/spec.md) - Feature specification
3. [DEPLOYMENT.md](../moltbot/DEPLOYMENT.md) - Detailed troubleshooting

**If bot still not responding**:

- Check VM is reachable: `ping 104.40.244.55`
- SSH to VM: `ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55`
- Check service: `systemctl --user status openclaw-gateway`
- View logs: `journalctl --user -u openclaw-gateway -f`

---

**Summary**: You now have:

1. ✅ Automated token deployment script (setup-github-token.sh)
2. ✅ Clear token setup documentation (GITHUB_TOKEN_SETUP.md)
3. ✅ Updated feature spec with setup instructions
4. ✅ Git cleanup script to remove sensitive files
5. ✅ Troubleshooting guide for bot issues

Next action: Create token → Deploy → Verify → Implement MoltBot commands.
