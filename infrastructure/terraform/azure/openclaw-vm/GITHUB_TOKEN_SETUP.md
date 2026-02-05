# MoltBot GitHub Token Setup Guide

## Quick Summary

Your request: "Make the bot have access to my repo, not all the GitHub account"

**Solution**: Use GitHub's **Fine-Grained Personal Access Token (PAT)**

✅ Token accesses **only** `FoushWare/elzatona_web` repo  
✅ Cannot access other repos or your account  
✅ Limited permissions (Contents, PRs, Issues, Metadata)  
✅ 90-day expiration (automatic rotation reminder)  
✅ Stored securely on VPS with SSH transport (not plaintext)

---

## Step-by-Step Setup (5 minutes)

### Step 1: Create Token on GitHub (2 min)

1. Go to: https://github.com/settings/tokens?type=beta
2. Click "Generate new token"
3. Fill in:
   - **Name**: `elzatona-moltbot-token`
   - **Expiration**: 90 days
   - **Repository access**: "Only select repositories" → `FoushWare/elzatona_web`
   - **Permissions** → Expand sections and check:

     ```
     ✅ Repository permissions:
       - Contents: ✓ Read and Write
       - Pull requests: ✓ Read and Write
       - Issues: ✓ Read

     ✅ Account permissions:
       - Metadata: ✓ Read (always required)
     ```
4. Click "Generate token"
5. **Copy the token** (you won't see it again!)

### Step 2: Deploy Token to VPS (2 min)

On your **local machine**:

```bash
cd ~/S/New_elzatona/infrastructure/terraform/azure/openclaw-vm

# Run deployment script (replace XXXX with your actual token)
./setup-github-token.sh 104.40.244.55 github_pat_XXXXXXXXXXXXXXXXXXXX azureuser FoushWare elzatona_web
```

**Expected output**:

```
✅ Token validated successfully
✅ Token copied to VPS
✅ gh CLI installed and configured on VPS
✅ gh commands verified on VPS
```

### Step 3: Verify Setup (1 min)

SSH to VPS and test:

```bash
ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

# Test authentication
gh repo view FoushWare/elzatona_web

# Test listing issues
gh issue list -R FoushWare/elzatona_web
```

If both commands work → **Setup complete!**

---

## Understanding the Security Model

### What can the token do?

- ✅ Clone/pull the repo
- ✅ Create branches and push commits
- ✅ Create and manage pull requests
- ✅ Read and comment on issues
- ✅ View repo metadata

### What can it NOT do?

- ❌ Access any other GitHub repo
- ❌ Access or modify your account settings
- ❌ Delete the repo (no Admin permissions)
- ❌ Modify team members or access controls
- ❌ Access any other organization repos

### Storage Security

- Token is stored at: `~/.config/gh/hosts.yml` on VPS
- File permissions: `600` (only readable by azureuser)
- Not logged or displayed in Telegram responses
- Transferred via SSH encryption (not plaintext)

---

## Token Rotation (Before 90 Days)

**When token is about to expire**:

1. Create a new token on GitHub (same steps as above)
2. Run the script again with new token:
   ```bash
   ./setup-github-token.sh 104.40.244.55 github_pat_NEW_TOKEN azureuser FoushWare elzatona_web
   ```
3. Old token is automatically overwritten

---

## Troubleshooting

**Script fails: "SSH failed to 104.40.244.55"**

- Check VM is running: Go to Azure portal
- Check IP is correct: `ping 104.40.244.55`
- Check SSH key: `ls ~/.ssh/id_rsa`

**Script fails: "Token validation failed"**

- Check token is valid: `gh auth login` locally
- Check repo access: Token must have access to `FoushWare/elzatona_web`
- Check permissions: All required scopes must be enabled

**On VPS, `gh` commands fail**

```bash
# Check gh auth status
gh auth status

# Check token file exists
cat ~/.config/gh/hosts.yml

# Force re-auth if needed
gh auth login --with-token < /dev/stdin
# Paste token and press Ctrl+D
```

---

## What About MoltBot?

After token is deployed:

1. **MoltBot can now use gh CLI** to execute commands from Telegram
2. Token is available in MoltBot's environment via `GITHUB_TOKEN`
3. You'll need to add Telegram commands to MoltBot to:
   - Listen for messages like "clone repo", "create PR", etc.
   - Execute `gh` and `git` commands
   - Return results to Telegram

Example MoltBot command (pseudo-code):

```
User sends: "list open issues"
↓
MoltBot receives message
↓
Calls: gh issue list -R FoushWare/elzatona_web
↓
Returns result to Telegram: "Issue #1: Fix bug in header"
```

---

## FAQ

**Q: Why not just use my GitHub password?**  
A: GitHub doesn't support password authentication anymore. PATs are more secure (scoped, expiring, revocable).

**Q: What if I revoke the token?**  
A: gh commands will fail. Just create a new token and run the script again.

**Q: Can I use this token from my local machine?**  
A: The script deploys it to VPS only. If you want it locally too, copy `/tmp/gh_hosts.yml` (but keep it secure!).

**Q: What if the token expires?**  
A: You'll get auth errors. Create a new one and run the script again (see Token Rotation above).

**Q: Can I use environment variables instead of gh config?**  
A: Yes! Set `GITHUB_TOKEN=github_pat_xxx` in MoltBot's systemd unit or `.env` file.

---

## Files Created

- `setup-github-token.sh` — Automated token deployment script
- `spec.md` — Updated with token setup instructions
- This guide — Quick reference for the token setup process

---

## Next Steps

1. ✅ Create Fine-Grained PAT on GitHub
2. ✅ Run `setup-github-token.sh` to deploy
3. ✅ Verify with `gh repo view` on VPS
4. ⏭️ **Configure MoltBot commands** to use gh CLI (implementation phase)
5. ⏭️ Test end-to-end Telegram→MoltBot→gh→Telegram flow

---

## Bot Not Responding Issue

See [DEPLOYMENT.md](../moltbot/DEPLOYMENT.md) for troubleshooting:

- Check gateway service: `systemctl --user status openclaw-gateway`
- View logs: `journalctl --user -u openclaw-gateway -f`
- Verify Telegram pairing: Check if user ID is approved in OpenClaw config
- Restart gateway: `systemctl --user restart openclaw-gateway`
