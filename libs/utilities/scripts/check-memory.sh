#!/usr/bin/env bash
set -euo pipefail

echo "=== Memory Snapshot (macOS) ==="
date

echo ""
echo "Top memory consumers (RSS MB):"
ps -axo pid,ppid,%cpu,rss,comm | awk 'NR==1 {printf "%-8s %-8s %-8s %-10s %s\n", "PID", "PPID", "%CPU", "RSS_MB", "COMMAND"; next} {printf "%-8s %-8s %-8s %-10.1f %s\n", $1, $2, $3, $4/1024, $5}' | sort -k4 -nr | head -n 20

echo ""
echo "Key dev processes:"
ps -axo pid,%cpu,rss,command | grep -E "node|next dev|Code Helper|java|Brave Browser|Safari" | grep -v grep | awk '{printf "PID=%s CPU=%s RSS_MB=%.1f CMD=%s\n", $1, $2, $3/1024, $4}'

echo ""
echo "Memory pressure summary:"
if command -v memory_pressure >/dev/null 2>&1; then
  memory_pressure | head -n 20
else
  echo "memory_pressure command not available"
fi
