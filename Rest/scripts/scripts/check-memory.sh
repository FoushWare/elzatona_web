#!/bin/bash

# Memory monitoring script for Node.js development
# Helps track memory usage of Node processes during development

echo "🔍 Node.js Memory Usage Monitor"
echo "================================"
echo ""

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS memory check
  echo "📊 System Memory:"
  vm_stat | perl -ne '/page size of (\d+)/ and $size=$1; /Pages\s+([^:]+)[^\d]+(\d+)/ and printf("%-16s % 16.2f Mi\n", "$1:", $2 * $size / 1048576);'
  echo ""
  
  # Check swap usage
  echo "💾 Swap Usage:"
  sysctl vm.swapusage | awk '{print $3, $4, $5, $6, $7, $8, $9}'
  echo ""
fi

# Find all Node.js processes
echo "🟢 Node.js Processes:"
echo "---------------------"

# Check if ps command supports different formats
if ps -o pid,comm,rss,vsz,pmem,args -p $(pgrep -f node) 2>/dev/null | head -1; then
  ps -o pid,comm,rss,vsz,pmem,args -p $(pgrep -f node) 2>/dev/null | tail -n +2 | while read line; do
    if [ ! -z "$line" ]; then
      echo "$line"
    fi
  done
else
  # Fallback for systems without pgrep or different ps format
  ps aux | grep -E "node|next|nx|jest" | grep -v grep | awk '{printf "PID: %-8s RSS: %-10s %%MEM: %-6s %s\n", $2, $6, $4, $11" "$12" "$13" "$14" "$15" "$16" "$17}'
fi

echo ""

# Calculate total memory used by Node processes
echo "📈 Memory Summary:"
echo "------------------"

TOTAL_RSS=0
NODE_COUNT=0

if command -v pgrep >/dev/null 2>&1; then
  for pid in $(pgrep -f node); do
    if ps -p $pid >/dev/null 2>&1; then
      RSS=$(ps -o rss= -p $pid 2>/dev/null | tr -d ' ')
      if [ ! -z "$RSS" ]; then
        TOTAL_RSS=$((TOTAL_RSS + RSS))
        NODE_COUNT=$((NODE_COUNT + 1))
      fi
    fi
  done
fi

if [ $NODE_COUNT -gt 0 ]; then
  TOTAL_MB=$((TOTAL_RSS / 1024))
  echo "Total Node.js processes: $NODE_COUNT"
  echo "Total memory used: ${TOTAL_MB} MB ($(echo "scale=2; $TOTAL_MB / 1024" | bc) GB)"
  echo ""
  
  # Memory recommendations
  if [ $TOTAL_MB -gt 3072 ]; then
    echo "⚠️  WARNING: High memory usage detected (>3GB)"
    echo "   Consider:"
    echo "   - Using 'npm run dev:light' for lighter memory usage"
    echo "   - Closing other applications"
    echo "   - Restarting the dev server"
  elif [ $TOTAL_MB -gt 2048 ]; then
    echo "ℹ️  Memory usage is moderate (2-3GB)"
    echo "   System should be responsive"
  else
    echo "✅ Memory usage is low (<2GB)"
    echo "   System should be running smoothly"
  fi
else
  echo "No Node.js processes found"
fi

echo ""
echo "💡 Tips:"
echo "   - Use 'npm run dev:light' for lower memory usage (1.5GB limit)"
echo "   - Use 'npm run dev:turbo' for Turbopack (more efficient)"
echo "   - Close browser tabs and other apps when memory is tight"
echo "   - Restart dev server if memory usage keeps growing"
echo ""


