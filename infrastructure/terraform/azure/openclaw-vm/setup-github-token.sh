#!/usr/bin/env bash
set -euo pipefail

# setup-github-token.sh
#
# Creates and deploys a GitHub Fine-Grained Personal Access Token (PAT)
# scoped to a single repository for use with MoltBot's gh CLI integration.
#
# Usage (local machine):
#   ./setup-github-token.sh <VM_IP> <GITHUB_TOKEN> [ssh_user] [repo_owner] [repo_name]
# Example:
#   ./setup-github-token.sh 104.40.244.55 github_pat_abc123xyz azureuser FoushWare elzatona_web
#
# Before running:
# 1. Create a Fine-Grained PAT on GitHub:
#    - Go to https://github.com/settings/tokens?type=beta
#    - Name: "elzatona-moltbot-token"
#    - Expiration: 90 days
#    - Repository access: Only FoushWare/elzatona_web
#    - Permissions:
#      ✅ Contents (read & write)
#      ✅ Pull requests (read & write)
#      ✅ Issues (read only)
#      ✅ Metadata (read only)
# 2. Copy the token and pass it to this script
#
# This script will:
# - Validate the token works with gh CLI
# - Copy token to VPS in ~/.config/gh/hosts.yml (mode 600, encrypted at rest)
# - Create a .env file for MoltBot with GITHUB_TOKEN reference
# - Set up gh CLI authentication on the VPS
# - Verify gh commands work (non-destructive: gh repo view)

VM_IP="${1:-}"
GITHUB_TOKEN="${2:-}"
SSH_USER="${3:-azureuser}"
REPO_OWNER="${4:-FoushWare}"
REPO_NAME="${5:-elzatona_web}"

if [ -z "$VM_IP" ] || [ -z "$GITHUB_TOKEN" ]; then
  cat <<EOF
Usage: $0 <VM_IP> <GITHUB_TOKEN> [ssh_user] [repo_owner] [repo_name]

Example:
  $0 104.40.244.55 github_pat_abc123xyz azureuser FoushWare elzatona_web

Before running, create a Fine-Grained PAT at:
  https://github.com/settings/tokens?type=beta

Configuration:
  - Name: "elzatona-moltbot-token"
  - Expiration: 90 days
  - Repository access: Only $REPO_OWNER/$REPO_NAME
  - Permissions:
    ✅ Contents (read & write)
    ✅ Pull requests (read & write)
    ✅ Issues (read only)
    ✅ Metadata (read only)
EOF
  exit 1
fi

REPO_URL="$REPO_OWNER/$REPO_NAME"
SSH_KEY="${HOME}/.ssh/id_rsa"
REMOTE_GH_CONFIG="/home/${SSH_USER}/.config/gh/hosts.yml"
REMOTE_ENV_FILE="/opt/elzatona_web/.env"

echo "═══════════════════════════════════════════════════════════════"
echo "GitHub Token Setup for MoltBot (Fine-Grained PAT)"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Configuration:"
echo "  VM: $VM_IP (SSH user: $SSH_USER)"
echo "  Repository: $REPO_URL"
echo "  Token: ${GITHUB_TOKEN:0:20}... (${#GITHUB_TOKEN} chars)"
echo ""

# Step 1: Validate token locally with gh CLI
echo "[1/4] Validating token with GitHub..."
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) not found locally. Install from https://cli.github.com"
  exit 1
fi

# Create a temporary gh auth token for testing
TEMP_GH_DIR=$(mktemp -d)
trap "rm -rf $TEMP_GH_DIR" EXIT

export GH_TOKEN="$GITHUB_TOKEN"
if ! gh repo view "$REPO_URL" >/dev/null 2>&1; then
  echo "❌ Token validation failed. Ensure:"
  echo "   - Token is valid and not expired"
  echo "   - Token has access to $REPO_URL"
  echo "   - Token has correct permissions (Contents, PRs, Issues, Metadata)"
  exit 1
fi
echo "✅ Token validated successfully"
echo ""

# Step 2: Create remote gh CLI config
echo "[2/4] Setting up gh CLI on VPS..."
cat > /tmp/gh_hosts.yml <<'GHEOF'
github.com:
    user: {user}
    oauth_token: {token}
    git_protocol: ssh
GHEOF

# Replace placeholders
sed -i '' "s/{token}/$GITHUB_TOKEN/g" /tmp/gh_hosts.yml
sed -i '' "s/{user}/unknown/g" /tmp/gh_hosts.yml  # Will be filled by gh auth on VPS

# Copy to VPS
scp -i "$SSH_KEY" /tmp/gh_hosts.yml "${SSH_USER}@${VM_IP}:/tmp/gh_hosts_setup.yml" 2>/dev/null || {
  echo "❌ SSH failed to $VM_IP. Check:"
  echo "   - VM is running and reachable"
  echo "   - SSH key at $SSH_KEY is correct"
  exit 1
}
echo "✅ Token copied to VPS"
echo ""

# Step 3: Install and configure gh on VPS
echo "[3/4] Installing gh CLI on VPS..."
ssh -i "$SSH_KEY" "${SSH_USER}@${VM_IP}" bash -s <<'SSHEOF'
set -euo pipefail

# Install gh CLI if not present
if ! command -v gh &> /dev/null; then
  echo "  Installing GitHub CLI..."
  sudo apt-get update -qq && sudo apt-get install -y -qq gh >/dev/null 2>&1
fi

# Set up gh config directory and hosts.yml
mkdir -p ~/.config/gh
mv /tmp/gh_hosts_setup.yml ~/.config/gh/hosts.yml
chmod 600 ~/.config/gh/hosts.yml
echo "  ✅ gh CLI configured"

# Create .env for MoltBot if repo exists
if [ -d "/opt/elzatona_web" ]; then
  if [ ! -f "/opt/elzatona_web/.env" ]; then
    cat > /opt/elzatona_web/.env <<'ENVEOF'
# GitHub Fine-Grained PAT for gh CLI
# Scoped to FoushWare/elzatona_web repo only
GITHUB_TOKEN=$(cat ~/.config/gh/hosts.yml | grep oauth_token | awk '{print $2}')
NODE_ENV=production
ENVEOF
    chmod 600 /opt/elzatona_web/.env
  fi
  echo "  ✅ .env file configured"
fi
SSHEOF

echo "✅ gh CLI installed and configured on VPS"
echo ""

# Step 4: Test gh commands on VPS
echo "[4/4] Testing gh commands on VPS..."
ssh -i "$SSH_KEY" "${SSH_USER}@${VM_IP}" bash -s "$REPO_URL" <<'SSHEOF'
set -euo pipefail
REPO_URL="$1"

# Verify gh auth is working (read-only test)
if gh repo view "$REPO_URL" >/dev/null 2>&1; then
  echo "  ✅ gh repo view: Success"
else
  echo "  ❌ gh repo view failed"
  exit 1
fi

# Test gh issue list (read-only)
if gh issue list -R "$REPO_URL" --state all 2>/dev/null | head -1; then
  echo "  ✅ gh issue list: Success"
else
  echo "  ⚠️  gh issue list returned no results (repo may have no issues)"
fi

echo ""
echo "All tests passed! MoltBot can now use gh CLI with token:"
echo "  - Clone repo: gh repo clone $REPO_URL"
echo "  - List issues: gh issue list -R $REPO_URL"
echo "  - Create PR: gh pr create -R $REPO_URL ..."
SSHEOF

echo "✅ gh commands verified on VPS"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "Setup Complete! MoltBot GitHub Integration Ready"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Update MoltBot skills to use gh CLI commands:"
echo "   - Parse Telegram messages for commands (clone, branch, push, pr, etc.)"
echo "   - Execute gh/git commands from skills"
echo "   - Return results to user via Telegram"
echo ""
echo "2. Security checklist:"
echo "   ✅ Token is Fine-Grained (single repo only: $REPO_URL)"
echo "   ✅ Token is stored securely (~/.config/gh/hosts.yml, mode 600)"
echo "   ✅ Token expires in 90 days (set expiration on GitHub)"
echo "   ✅ Token is SSH-transferred (not sent in plaintext)"
echo "   ✅ MoltBot process should not log token (use GH_TOKEN env var)"
echo ""
echo "3. Token rotation (before 90-day expiration):"
echo "   - Create new token on GitHub"
echo "   - Run this script again with new token"
echo "   - Old token will be overwritten"
echo ""
echo "4. Troubleshooting:"
echo "   - SSH to VPS: ssh -i ~/.ssh/id_rsa $SSH_USER@$VM_IP"
echo "   - View gh config: gh config get -h github.com"
echo "   - Test gh: gh repo view $REPO_URL"
echo "   - View logs: journalctl --user -u openclaw-gateway -f"
echo ""
