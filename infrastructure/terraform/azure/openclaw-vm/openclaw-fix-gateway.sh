#!/bin/bash
set -euo pipefail
# Helper: reinstall OpenClaw, build Control UI, restart gateway, collect logs
# Usage: sudo bash ./openclaw-fix-gateway.sh

LOG=/tmp/openclaw-fix-gateway.log
echo "=== openclaw-fix-gateway started: $(date) ===" | tee -a "$LOG"

echo "Removing broken global openclaw (if any)..." | tee -a "$LOG"
sudo npm uninstall -g openclaw >> "$LOG" 2>&1 || true

echo "Reinstalling openclaw globally (allow lifecycle scripts)..." | tee -a "$LOG"
sudo npm install -g openclaw --unsafe-perm=true --allow-root >> "$LOG" 2>&1

NPM_ROOT=$(npm root -g)
echo "npm root: $NPM_ROOT" | tee -a "$LOG"
echo "Listing openclaw scripts dir (if present):" | tee -a "$LOG"
ls -la "$NPM_ROOT/openclaw/scripts" >> "$LOG" 2>&1 || true

echo "Ensure pnpm is installed..." | tee -a "$LOG"
sudo npm install -g pnpm >> "$LOG" 2>&1 || true

if [ -d "$NPM_ROOT/openclaw" ]; then
  echo "Building UI from $NPM_ROOT/openclaw..." | tee -a "$LOG"
  sudo pnpm --prefix "$NPM_ROOT/openclaw" install --frozen-lockfile >> "$LOG" 2>&1 || sudo pnpm --prefix "$NPM_ROOT/openclaw" install >> "$LOG" 2>&1 || true
  sudo pnpm --prefix "$NPM_ROOT/openclaw" run ui:build >> "$LOG" 2>&1 || sudo pnpm --prefix "$NPM_ROOT/openclaw" ui:build >> "$LOG" 2>&1 || true
else
  echo "openclaw package dir not found at $NPM_ROOT/openclaw — cloning and building from source..." | tee -a "$LOG"
  cd /tmp
  sudo rm -rf openclaw || true
  sudo git clone https://github.com/openclaw/openclaw.git >> "$LOG" 2>&1 || true
  cd openclaw || exit 1
  pnpm install >> "$LOG" 2>&1 || true
  pnpm ui:build >> "$LOG" 2>&1 || true
fi

echo "Restarting user gateway service (systemd user)..." | tee -a "$LOG"
systemctl --user daemon-reload || true
systemctl --user restart openclaw-gateway.service >> "$LOG" 2>&1 || true

echo "Dumping recent gateway journal to /tmp/openclaw-gateway.log" | tee -a "$LOG"
journalctl --user -u openclaw-gateway.service -n 400 --no-pager | tee /tmp/openclaw-gateway.log

echo "=== openclaw-fix-gateway finished: $(date) ===" | tee -a "$LOG"
echo "Log saved to $LOG and /tmp/openclaw-gateway.log"
