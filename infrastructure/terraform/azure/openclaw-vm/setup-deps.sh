#!/bin/bash
# Phase 2: Install dependencies for secure Azure VM
set -e

# Update package lists
sudo apt update

#!/bin/bash
set -euo pipefail
# Non-interactive setup script for VM (Phase 1 + Phase 2)
# - Installs dependencies (Node.js 20, Python3, build tools)
# - Installs and enables fail2ban
# - Applies UFW and SSH hardening
# - Runs non-interactive upgrades and auto-restarts services

LOG=/var/log/setup-deps.log
echo "=== setup-deps.sh starting: $(date) ===" | sudo tee -a "$LOG"

# Ensure non-interactive installs and auto-restart of daemons
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a

echo "Updating apt cache..." | sudo tee -a "$LOG"
sudo apt-get update -y >> "$LOG" 2>&1

echo "Upgrading packages non-interactively..." | sudo tee -a "$LOG"
sudo apt-get -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" -y upgrade >> "$LOG" 2>&1 || true

echo "Installing base packages..." | sudo tee -a "$LOG"
sudo apt-get install -y curl ca-certificates gnupg lsb-release >> "$LOG" 2>&1

# Install Node.js 20
echo "Installing Node.js 20..." | sudo tee -a "$LOG"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - >> "$LOG" 2>&1
sudo apt-get install -y nodejs >> "$LOG" 2>&1

# Install Python3, pip, build tools and fail2ban
echo "Installing Python3, build-essential, fail2ban..." | sudo tee -a "$LOG"
sudo apt-get install -y python3 python3-pip build-essential fail2ban >> "$LOG" 2>&1

echo "Applying UFW rules..." | sudo tee -a "$LOG"
sudo ufw --force reset >> "$LOG" 2>&1 || true
sudo ufw default deny incoming >> "$LOG" 2>&1 || true
sudo ufw default allow outgoing >> "$LOG" 2>&1 || true
sudo ufw allow 22/tcp >> "$LOG" 2>&1 || true
sudo ufw --force enable >> "$LOG" 2>&1 || true

echo "Hardening SSH configuration..." | sudo tee -a "$LOG"
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config || true
sudo sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config || true
sudo sed -i 's/^#*LoginGraceTime.*/LoginGraceTime 30/' /etc/ssh/sshd_config || true
sudo sed -i 's/^#*MaxAuthTries.*/MaxAuthTries 3/' /etc/ssh/sshd_config || true
sudo systemctl reload sshd || true

echo "Enabling and starting fail2ban..." | sudo tee -a "$LOG"
sudo systemctl enable --now fail2ban >> "$LOG" 2>&1 || true

# Collect verification data
echo "Verification summary:" | sudo tee -a "$LOG"
{ 
	echo "Node: $(node -v 2>/dev/null || echo 'not-installed')"
	echo "NPM: $(npm -v 2>/dev/null || echo 'not-installed')"
	echo "Python: $(python3 --version 2>/dev/null || echo 'not-installed')"
	echo "pip: $(pip3 --version 2>/dev/null || echo 'not-installed')"
	echo "gcc: $(gcc --version 2>/dev/null | head -n1 || echo 'not-installed')"
	echo "make: $(make --version 2>/dev/null | head -n1 || echo 'not-installed')"
	echo "UFW status: $(sudo ufw status verbose 2>/dev/null || echo 'ufw-not-available')"
	echo "fail2ban active: $(sudo systemctl is-active fail2ban 2>/dev/null || echo 'unknown')"
} | sudo tee -a "$LOG"

echo "=== setup-deps.sh finished: $(date) ===" | sudo tee -a "$LOG"
echo "Log saved to $LOG"
