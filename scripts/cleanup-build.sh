#!/bin/bash

# Build Cleanup Script
# This script removes build artifacts and restarts the development server

echo "🧹 Starting build cleanup..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Remove build directories
echo "🗑️  Removing build directories..."
rm -rf .next
rm -rf build
rm -rf storybook-static
rm -rf test-results
rm -rf coverage

# Remove build artifacts
echo "🗑️  Removing build artifacts..."
rm -f tsconfig.tsbuildinfo
rm -f .next/cache
rm -f .next/static

# Remove log files
echo "🗑️  Removing log files..."
rm -f dev.log
rm -f server.log
rm -f build.log

# Kill running processes
echo "💀 Killing running development servers..."
if command_exists pkill; then
    pkill -f "npm run dev" || true
    pkill -f "npm run start" || true
    pkill -f "next-server" || true
    pkill -f "storybook" || true
else
    echo "⚠️  pkill not available, skipping process cleanup"
fi

# Clean npm cache (optional)
if [ "$1" = "--deep" ]; then
    echo "🧹 Deep cleaning npm cache..."
    npm cache clean --force
fi

# Restart development server
echo "🚀 Restarting development server..."
nohup npm run dev > dev.log 2>&1 &

# Wait a moment for server to start
sleep 2

echo "✅ Build cleanup completed!"
echo "📝 Development server restarted and running in background"
echo "📋 Check dev.log for server output"
echo ""
echo "💡 Usage:"
echo "  ./scripts/cleanup-build.sh        # Basic cleanup"
echo "  ./scripts/cleanup-build.sh --deep # Deep cleanup including npm cache"
