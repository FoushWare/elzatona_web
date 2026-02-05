#!/bin/bash
# QUICK_START_GITHUB_TOKEN.sh
# One-command reference for token setup

cat << 'EOF'

╔════════════════════════════════════════════════════════════════════════════╗
║                     MoltBot GitHub Token Setup - QUICK START              ║
╚════════════════════════════════════════════════════════════════════════════╝

Your Goal: Make MoltBot access ONLY elzatona_web repo (not all GitHub)

✅ SOLUTION: Fine-Grained Personal Access Token (PAT)
   - Scoped to FoushWare/elzatona_web ONLY
   - Limited permissions (no delete, no account access)
   - 90-day expiration (auto-rotate reminder)

────────────────────────────────────────────────────────────────────────────
 STEP 1: Create Token on GitHub (2 minutes)
────────────────────────────────────────────────────────────────────────────

1. Visit: https://github.com/settings/tokens?type=beta

2. Click "Generate new token" (NEW)

3. Fill form:
   
   Token name:
   └─ elzatona-moltbot-token
   
   Expiration:
   └─ 90 days
   
   Repository access:
   └─ ✓ Only select repositories → FoushWare/elzatona_web
   
   Permissions (expand each section):
   ├─ Repository permissions:
   │  ├─ ✓ Contents: Read and Write
   │  ├─ ✓ Pull requests: Read and Write
   │  └─ ✓ Issues: Read
   └─ Account permissions:
      └─ ✓ Metadata: Read (always required)

4. Click "Generate token"

5. ⚠️  COPY TOKEN IMMEDIATELY (shown only once!)
   └─ github_pat_XXXXXXXXXXXXXXXXXX

────────────────────────────────────────────────────────────────────────────
 STEP 2: Deploy Token to VPS (2 minutes)
────────────────────────────────────────────────────────────────────────────

On your local machine:

$ cd ~/S/New_elzatona/infrastructure/terraform/azure/openclaw-vm

$ chmod +x setup-github-token.sh

$ ./setup-github-token.sh \
    104.40.244.55 \
    github_pat_YOUR_TOKEN_HERE \
    azureuser \
    FoushWare \
    elzatona_web

Expected output:
  ✅ Token validated successfully
  ✅ Token copied to VPS
  ✅ gh CLI installed and configured on VPS
  ✅ gh commands verified on VPS

────────────────────────────────────────────────────────────────────────────
 STEP 3: Verify Setup (1 minute)
────────────────────────────────────────────────────────────────────────────

$ ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

$ gh repo view FoushWare/elzatona_web
  Expected: Shows repo info (author, stars, etc.)

$ gh issue list -R FoushWare/elzatona_web
  Expected: Lists issues or shows "no issues"

Both commands work? ✅ Setup complete!

────────────────────────────────────────────────────────────────────────────
 What This Token Can Do
────────────────────────────────────────────────────────────────────────────

✅ Clone/pull the repo
✅ Create and push branches
✅ Create/manage pull requests
✅ Read and comment on issues
✅ View repo structure

❌ Access other repos
❌ Modify your account settings
❌ Delete the repo
❌ Access other organizations

────────────────────────────────────────────────────────────────────────────
 Security: Where Token Is Stored
────────────────────────────────────────────────────────────────────────────

Location: /home/azureuser/.config/gh/hosts.yml
Permissions: 600 (owner read/write only)
Encrypted: YES (via SSH tunnel)
Logged: NO (never in Telegram responses)

────────────────────────────────────────────────────────────────────────────
 Token Rotation (Before 90 Days)
────────────────────────────────────────────────────────────────────────────

1. Create new token on GitHub (same steps)
2. Run setup script again with new token
3. Old token automatically replaced

────────────────────────────────────────────────────────────────────────────
 Troubleshooting
────────────────────────────────────────────────────────────────────────────

Script fails: "SSH failed to 104.40.244.55"
  → Check: ping 104.40.244.55
  → Check: ls ~/.ssh/id_rsa exists

Script fails: "Token validation failed"
  → Check: Token is valid on GitHub
  → Check: Token hasn't expired
  → Check: Repository access enabled

On VPS, gh commands fail:
  → Run: gh auth status
  → View: cat ~/.config/gh/hosts.yml
  → Re-auth: gh auth login --with-token

────────────────────────────────────────────────────────────────────────────
 Bot Not Responding? See DEPLOYMENT.md Troubleshooting
────────────────────────────────────────────────────────────────────────────

$ ssh -i ~/.ssh/id_rsa azureuser@104.40.244.55

$ systemctl --user status openclaw-gateway

$ journalctl --user -u openclaw-gateway -f

$ systemctl --user restart openclaw-gateway

────────────────────────────────────────────────────────────────────────────
 Next Steps
────────────────────────────────────────────────────────────────────────────

1. ✅ Create token on GitHub
2. ✅ Run setup-github-token.sh
3. ✅ Verify gh works on VPS
4. ⏭️  Implement MoltBot commands to use gh CLI
5. ⏭️  Test end-to-end Telegram → MoltBot → GitHub flow

────────────────────────────────────────────────────────────────────────────
 More Info
────────────────────────────────────────────────────────────────────────────

README: GITHUB_TOKEN_SETUP.md
Spec: specs/007-github-repo-access/spec.md
Deploy Docs: docs/moltbot/DEPLOYMENT.md
Action Plan: GITHUB_INTEGRATION_ACTION_PLAN.md

EOF
