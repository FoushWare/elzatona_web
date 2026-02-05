#!/usr/bin/env bash
set -euo pipefail
# auto-deploy-elzatona.sh
# Copies a local deploy key to the VM and clones (or updates) the elzatona_web repo into /opt/elzatona_web
# Usage: ./auto-deploy-elzatona.sh <vm_ip> [ssh_user] [local_deploy_key] [repo]
# Example: ./auto-deploy-elzatona.sh 104.40.244.55 azureuser ./elzatona_deploy git@github.com:FoushWare/elzatona_web.git

VM_IP="${1:-}">
if [ -z "$VM_IP" ]; then
  echo "Usage: $0 <vm_ip> [ssh_user] [local_deploy_key] [repo]"
  exit 2
fi

SSH_USER="${2:-azureuser}"
LOCAL_KEY="${3:-./elzatona_deploy}"
REPO="${4:-git@github.com:FoushWare/elzatona_web.git}"

if [ ! -f "$LOCAL_KEY" ]; then
  echo "Local deploy key not found: $LOCAL_KEY"
  echo "Generate or place the private key at that path, and add its .pub to GitHub as a Deploy key." >&2
  exit 3
fi

echo "Copying $LOCAL_KEY to $SSH_USER@$VM_IP:~/.ssh/elzatona_deploy"
scp -i ~/.ssh/id_rsa "$LOCAL_KEY" "$SSH_USER@$VM_IP:~/.ssh/elzatona_deploy"

echo "Running remote setup on $SSH_USER@$VM_IP"
ssh -i ~/.ssh/id_rsa "$SSH_USER@$VM_IP" bash -s <<'REMOTE'
set -euo pipefail
echo "Preparing ~/.ssh"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
mv -f ~/elzatona_deploy ~/.ssh/elzatona_deploy || true
chmod 600 ~/.ssh/elzatona_deploy

echo "Adding github.com to known_hosts"
ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null || true

TARGET_DIR="/opt/elzatona_web"
echo "Creating $TARGET_DIR (requires sudo)"
sudo mkdir -p "$TARGET_DIR"
sudo chown $(whoami):$(whoami) "$TARGET_DIR" || true

GIT_SSH_COMMAND='ssh -i ~/.ssh/elzatona_deploy -o IdentitiesOnly=yes'
echo "Cloning or updating repo: REPO_PLACEHOLDER"
if [ -d "$TARGET_DIR/.git" ]; then
  cd "$TARGET_DIR"
  $GIT_SSH_COMMAND git fetch --all || true
  $GIT_SSH_COMMAND git reset --hard origin/HEAD || true
else
  $GIT_SSH_COMMAND git clone REPO_PLACEHOLDER "$TARGET_DIR" || {
    echo "Clone failed - ensure the public key is added to GitHub deploy keys." >&2
    exit 2
  }
fi

echo "Remote setup complete"
REMOTE

echo "Done. Repo should be at /opt/elzatona_web on the VM (if clone succeeded)."
