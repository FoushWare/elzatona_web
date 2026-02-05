#!/bin/bash
set -euo pipefail
# Automated installer for OpenClaw + best-effort non-interactive onboarding
# Usage:
#  - Provide an answers file with one line per expected prompt: --answers-file /path/to/answers.txt
#  - Or run without answers file to only install the package and print next steps.

ANSWERS_FILE=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --answers-file) ANSWERS_FILE="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 2 ;;
  esac
done

echo "Installing openclaw globally via npm (non-interactive)..."
sudo npm install -g openclaw

if [ -n "$ANSWERS_FILE" ] && [ -f "$ANSWERS_FILE" ]; then
  echo "Answers file provided: $ANSWERS_FILE"
  echo "Installing 'expect' to drive the interactive onboard flow..."
  sudo apt-get update -y
  sudo apt-get install -y expect

  TMP_EXPECT_SCRIPT=$(mktemp /tmp/openclaw-onboard-XXXX.expect)
  cat > "$TMP_EXPECT_SCRIPT" <<'EXPECT'
#!/usr/bin/expect -f
set timeout -1
set ansfile [lindex $argv 0]
set fh [open $ansfile r]
spawn openclaw onboard
while {[gets $fh line] != -1} {
  sleep 1
  send -- "$line\r"
}
expect eof
EXPECT

  chmod +x "$TMP_EXPECT_SCRIPT"
  echo "Running automated onboarding (this will feed your answers sequentially)."
  "$TMP_EXPECT_SCRIPT" "$ANSWERS_FILE" || true
  rm -f "$TMP_EXPECT_SCRIPT"
  echo "Automated onboarding finished (check logs and service status)."
else
  echo "No answers file provided. The installer completed but onboarding requires interaction."
  echo "SSH into the VM and run: openclaw onboard"
  echo "If you want automation, create a plain-text answers file where each line is the response" 
  echo "to the corresponding prompt, then run: ./install-openclaw-auto.sh --answers-file ./answers.txt"
fi

echo "Finished."
