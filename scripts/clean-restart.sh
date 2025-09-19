#!/bin/bash

# Clean restart script for development
# Use this when you encounter build manifest errors

echo "🧹 Clean Restart Script"
echo "======================"

# Kill all Next.js processes
echo "💀 Killing all Next.js processes..."
pkill -f "npm run dev" || true
pkill -f "npm run start" || true
pkill -f "next-server" || true
pkill -f "next dev" || true
pkill -f "next start" || true
pkill -f "turbopack" || true

# Deep clean all build artifacts
echo "🧹 Deep cleaning all build artifacts..."
rm -rf .next
rm -rf build
rm -rf node_modules/.cache
rm -rf .turbo
rm -rf out

# Clean temporary files
echo "🧽 Cleaning temporary files..."
find . -name "*.tmp.*" -type f -delete 2>/dev/null || true
find . -name "_buildManifest.js.tmp.*" -type f -delete 2>/dev/null || true

# Wait for processes to terminate
echo "⏳ Waiting for processes to terminate..."
sleep 3

# Restart development server
echo "🚀 Starting fresh development server..."
nohup npm run dev > dev.log 2>&1 &

echo "✅ Clean build and server restart completed!"
echo "📝 Server logs: tail -f dev.log"
echo "🌐 Access: http://localhost:3000"

# Kill current terminal and start fresh
echo "🔄 Starting fresh terminal session..."
sleep 2
exec $SHELL
