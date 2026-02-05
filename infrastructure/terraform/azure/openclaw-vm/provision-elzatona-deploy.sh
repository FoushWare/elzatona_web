#!/usr/bin/env bash
set -euo pipefail
# provision-elzatona-deploy.sh
#
# Usage (local machine):
#   ./provision-elzatona-deploy.sh <VM_IP> [ssh_user] [repo]
# Example:
#   ./provision-elzatona-deploy.sh 104.40.244.55 azureuser git@github.com:FoushWare/elzatona_web.git
#
# Behavior:
# - Generates an ed25519 deploy key pair (files: ./elzatona_deploy and ./elzatona_deploy.pub)
# - If env var GITHUB_TOKEN is set, it will call GitHub API to add the public key as a deploy key
#   to the target repo (requires repo access). Otherwise it prints the public key and waits
#   for you to add it manually in GitHub (Settings → Deploy keys).
# - Copies the private key to the VM at ~/.ssh/elzatona_deploy and installs a remote helper
#   script that clones the repo into /opt/elzatona_web (idempotent).

VM_IP="$1"
SSH_USER="${2:-azureuser}"
REPO="${3:-git@github.com:FoushWare/elzatona_web.git}"

LOCAL_KEY="./elzatona_deploy"
LOCAL_PUB="${LOCAL_KEY}.pub"

if [ -f "$LOCAL_KEY" ] || [ -f "$LOCAL_PUB" ]; then
  echo "Key files already exist: $LOCAL_KEY or ${LOCAL_PUB}. Aborting to avoid overwrite."
  echo "Remove or move them and re-run if you want to create a fresh key."
  exit 1
fi

echo "Generating deploy key pair..."
ssh-keygen -t ed25519 -f "$LOCAL_KEY" -C "elzatona-deploy" -N "" >/dev/null
chmod 600 "$LOCAL_KEY"

PUBKEY_CONTENT=$(cat "$LOCAL_PUB")
echo "\nPublic key (add this as a Deploy key in GitHub for $REPO):\n"$PUBKEY_CONTENT"\n"

# Helper to parse owner/repo from git@github.com:owner/repo.git or https URL
parse_github_owner_repo() {
  local url="$1"
  if [[ "$url" =~ git@github.com:(.+)/(.+)\.git ]]; then
    echo "${BASH_REMATCH[1]}/${BASH_REMATCH[2]}"
    return
  fi
  if [[ "$url" =~ https://github.com/(.+)/(.+)\.git ]]; then
    echo "${BASH_REMATCH[1]}/${BASH_REMATCH[2]}"
    return
  fi
  # fallback: attempt to strip
  echo "${url##*:}" | sed 's/\.git$//'
}

OWNER_REPO=$(parse_github_owner_repo "$REPO")

if [ -n "${GITHUB_TOKEN:-}" ]; then
  echo "GITHUB_TOKEN provided; attempting to add deploy key via GitHub API for $OWNER_REPO"
  TITLE="elzatona-deploy-$(date +%s)"
  API_URL="https://api.github.com/repos/$OWNER_REPO/keys"
  resp=$(curl -s -o /dev/stderr -w "%{http_code}" -X POST "$API_URL" \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d "{\"title\":\"$TITLE\",\"key\":\"$PUBKEY_CONTENT\",\"read_only\":false}") || true
  # curl will print HTTP code to stdout because of -w; we can't easily capture both body and code here
  echo "Attempted to add deploy key via GitHub API (check repo settings or GH response above)."
else
  echo "No GITHUB_TOKEN set. Please add the public key above to the GitHub repo as a deploy key," \
       "then press ENTER to continue when done (or Ctrl+C to abort)."
  read -r _
fi

echo "Copying private key to VM: $SSH_USER@$VM_IP:~/.ssh/elzatona_deploy"
scp -i ~/.ssh/id_rsa "$LOCAL_KEY" "$SSH_USER@$VM_IP:~/.ssh/elzatona_deploy"

echo "Creating remote helper script on VM and executing it..."
REMOTE_SCRIPT=/tmp/remote-setup-elzatona.sh
ssh -i ~/.ssh/id_rsa "$SSH_USER@$VM_IP" bash -s <<'REMOTE'
set -euo pipefail
REMOTE_SCRIPT="/tmp/remote-setup-elzatona.sh"
cat > "$REMOTE_SCRIPT" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "Remote setup started: $(date)"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
mv -f ~/elzatona_deploy ~/.ssh/elzatona_deploy || true
chmod 600 ~/.ssh/elzatona_deploy

echo "Adding github.com to known_hosts"
ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null || true

REPO="REPO_PLACEHOLDER"
TARGET_DIR="/opt/elzatona_web"
mkdir -p "$TARGET_DIR"
chown $(whoami) "$TARGET_DIR" || true

GIT_SSH_COMMAND="ssh -i ~/.ssh/elzatona_deploy -o IdentitiesOnly=yes"
if [ -d "$TARGET_DIR/.git" ]; then
  echo "Repository already exists, fetching latest..."
  cd "$TARGET_DIR"
  $GIT_SSH_COMMAND git fetch --all || true
  $GIT_SSH_COMMAND git reset --hard origin/HEAD || true
else
  echo "Cloning $REPO into $TARGET_DIR"
  $GIT_SSH_COMMAND git clone "$REPO" "$TARGET_DIR" || {
    echo "Clone failed - likely the deploy key has not been added to GitHub or permissions are incorrect." >&2
    exit 2
  }
fi

echo "Remote setup finished: $(date)"
EOF
chmod +x "$REMOTE_SCRIPT"
bash "$REMOTE_SCRIPT"
REMOTE

echo "Done. If cloning failed, ensure the public key was added as a Deploy key in GitHub and re-run the script."
