#!/bin/bash
# Dynamic execution wrapper for build-check-and-push script

cd /Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web

# Create log file
LOG_FILE="/tmp/gh-push-dynamic-$(date +%s).log"
echo "Starting build-check-and-push script at $(date)" > "$LOG_FILE"
echo "================================================" >> "$LOG_FILE"

# Run the script and capture all output
bash .cursor/check-build-and-push.sh 2>&1 | tee -a "$LOG_FILE"

# Display the log
echo ""
echo "=== Script Execution Complete ==="
echo "Full log saved to: $LOG_FILE"
echo ""
echo "Last 50 lines of output:"
tail -50 "$LOG_FILE"

