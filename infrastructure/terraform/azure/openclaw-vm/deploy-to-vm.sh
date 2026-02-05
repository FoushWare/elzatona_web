#!/bin/bash
set -euo pipefail
# Local helper to copy and run the remote setup script non-interactively
# Usage: ./deploy-to-vm.sh <vm_ip> [ssh_key_path] [username]

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <vm_ip> [ssh_key_path] [username]"
  exit 1
fi

VM_IP="$1"
SSH_KEY="${2:-$HOME/.ssh/id_rsa}"
USER="${3:-azureuser}"
SCRIPT_NAME="setup-deps.sh"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOCAL_SCRIPT="$SCRIPT_DIR/$SCRIPT_NAME"

if [ ! -f "$LOCAL_SCRIPT" ]; then
  echo "Error: $LOCAL_SCRIPT not found. Run this from the repo folder where the script exists." >&2
  exit 2
fi

echo "Removing existing host key for $VM_IP (if any)"
ssh-keygen -R "$VM_IP" >/dev/null 2>&1 || true

echo "Copying $SCRIPT_NAME to $USER@$VM_IP:~"
scp -i "$SSH_KEY" "$LOCAL_SCRIPT" "$USER@$VM_IP:~"

echo "Executing remote setup (non-interactive). This may take several minutes..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$USER@$VM_IP" bash -s <<'EOF'
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a
chmod +x ~/setup-deps.sh
sudo bash ~/setup-deps.sh
EOF

echo "Remote setup finished. Check /var/log/setup-deps.log on the VM for details."
