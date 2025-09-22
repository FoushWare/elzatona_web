#!/bin/bash

# Build Cleanup Script
# This script removes build artifacts and restarts the development server

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🧹 MANUAL BUILD CLEANUP STARTING..."
echo "════════════════════════════════════════════════════════════════"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Remove build directories
echo "📁 STEP 1: Cleaning build directories..."
echo "   🗑️  Removing .next directory..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "   ✅ .next directory removed"
else
    echo "   ℹ️  .next directory not found (already clean)"
fi

echo "   🗑️  Removing build directory..."
if [ -d "build" ]; then
    rm -rf build
    echo "   ✅ build directory removed"
else
    echo "   ℹ️  build directory not found (already clean)"
fi

echo "   🗑️  Removing storybook-static directory..."
if [ -d "storybook-static" ]; then
    rm -rf storybook-static
    echo "   ✅ storybook-static directory removed"
else
    echo "   ℹ️  storybook-static directory not found (already clean)"
fi

echo "   🗑️  Removing test-results directory..."
if [ -d "test-results" ]; then
    rm -rf test-results
    echo "   ✅ test-results directory removed"
else
    echo "   ℹ️  test-results directory not found (already clean)"
fi

echo "   🗑️  Removing coverage directory..."
if [ -d "coverage" ]; then
    rm -rf coverage
    echo "   ✅ coverage directory removed"
else
    echo "   ℹ️  coverage directory not found (already clean)"
fi
echo ""

# Step 2: Remove build artifacts
echo "📄 STEP 2: Cleaning build artifacts..."
echo "   🗑️  Removing TypeScript build info..."
if [ -f "tsconfig.tsbuildinfo" ]; then
    rm -f tsconfig.tsbuildinfo
    echo "   ✅ tsconfig.tsbuildinfo removed"
else
    echo "   ℹ️  tsconfig.tsbuildinfo not found (already clean)"
fi

echo "   🗑️  Removing .next cache..."
if [ -d ".next/cache" ]; then
    rm -rf .next/cache
    echo "   ✅ .next/cache removed"
else
    echo "   ℹ️  .next/cache not found (already clean)"
fi

echo "   🗑️  Removing .next static files..."
if [ -d ".next/static" ]; then
    rm -rf .next/static
    echo "   ✅ .next/static removed"
else
    echo "   ℹ️  .next/static not found (already clean)"
fi
echo ""

# Step 3: Remove log files
echo "📝 STEP 3: Cleaning log files..."
echo "   🗑️  Removing dev.log..."
if [ -f "dev.log" ]; then
    rm -f dev.log
    echo "   ✅ dev.log removed"
else
    echo "   ℹ️  dev.log not found (already clean)"
fi

echo "   🗑️  Removing server.log..."
if [ -f "server.log" ]; then
    rm -f server.log
    echo "   ✅ server.log removed"
else
    echo "   ℹ️  server.log not found (already clean)"
fi

echo "   🗑️  Removing build.log..."
if [ -f "build.log" ]; then
    rm -f build.log
    echo "   ✅ build.log removed"
else
    echo "   ℹ️  build.log not found (already clean)"
fi
echo ""

# Step 4: Kill running processes
echo "💀 STEP 4: Stopping running development servers..."
echo "   🔍 Checking for running processes..."

if command_exists pkill; then
    # Check and stop npm dev
    if pgrep -f "npm run dev" > /dev/null; then
        echo "   🛑 Found running npm dev, stopping..."
        pkill -f "npm run dev" || true
        sleep 1
        echo "   ✅ npm dev stopped"
    else
        echo "   ℹ️  No npm dev process running"
    fi
    
    # Check and stop npm start
    if pgrep -f "npm run start" > /dev/null; then
        echo "   🛑 Found running npm start, stopping..."
        pkill -f "npm run start" || true
        sleep 1
        echo "   ✅ npm start stopped"
    else
        echo "   ℹ️  No npm start process running"
    fi
    
    # Check and stop next-server
    if pgrep -f "next-server" > /dev/null; then
        echo "   🛑 Found running next-server, stopping..."
        pkill -f "next-server" || true
        sleep 1
        echo "   ✅ next-server stopped"
    else
        echo "   ℹ️  No next-server process running"
    fi
    
    # Check and stop storybook
    if pgrep -f "storybook" > /dev/null; then
        echo "   🛑 Found running storybook, stopping..."
        pkill -f "storybook" || true
        sleep 1
        echo "   ✅ storybook stopped"
    else
        echo "   ℹ️  No storybook process running"
    fi
else
    echo "   ⚠️  pkill not available, skipping process cleanup"
fi
echo ""

# Step 5: Deep clean (optional)
if [ "$1" = "--deep" ]; then
    echo "🧹 STEP 5: Deep cleaning npm cache..."
    echo "   📦 Running: npm cache clean --force"
    npm cache clean --force
    echo "   ✅ npm cache cleaned"
    echo ""
fi

# Step 6: Restart development server
echo "🚀 STEP 6: Starting fresh development server..."
echo "   📝 Starting server in background..."
nohup npm run dev > dev.log 2>&1 &
SERVER_PID=$!
echo "   📋 Server PID: $SERVER_PID"
echo "   ⏳ Waiting for server to initialize..."

# Wait for server to start
sleep 3

# Check if server is running
if ps -p $SERVER_PID > /dev/null; then
    echo "   ✅ Development server started successfully"
    echo "   🌐 Server should be available at http://localhost:3000"
else
    echo "   ⚠️  Server may have failed to start, check dev.log"
fi
echo ""

# Final summary
echo "📊 CLEANUP SUMMARY:"
echo "   ✅ Build directories cleaned"
echo "   ✅ Build artifacts removed"
echo "   ✅ Log files cleaned"
echo "   ✅ Old servers stopped"
echo "   ✅ New server started"
echo "   📝 Logs available in dev.log"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ MANUAL BUILD CLEANUP COMPLETED SUCCESSFULLY!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "💡 Usage:"
echo "  ./scripts/cleanup-build.sh        # Basic cleanup"
echo "  ./scripts/cleanup-build.sh --deep # Deep cleanup including npm cache"
echo ""
