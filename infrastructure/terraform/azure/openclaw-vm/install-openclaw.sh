#!/bin/bash
set -euo pipefail
# Interactive installer for OpenClaw (manual use on VM)
# Usage: ssh into the VM and run this script, or copy & execute.

echo "Installing openclaw globally via npm..."
sudo npm install -g openclaw

echo
echo "To complete setup, run the interactive onboarding step:" 
echo "  openclaw onboard"
echo
if [ -t 0 ]; then
  echo "TTY detected — launching 'openclaw onboard' now. Follow the prompts."
  openclaw onboard
else
  echo "No TTY detected. SSH into the VM and run 'openclaw onboard' interactively."
fi

echo "Done."
