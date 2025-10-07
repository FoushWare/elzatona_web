#!/bin/bash

echo "🔄 Restarting Elzatona Web Development Server..."

# Kill any existing Next.js processes
echo "1️⃣ Stopping existing servers..."
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

# Wait a moment
sleep 2

# Clean build artifacts
echo "2️⃣ Cleaning build artifacts..."
rm -rf .next 2>/dev/null || true

# Install dependencies if needed
echo "3️⃣ Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies..."
    npm install
fi

# Start the development server
echo "4️⃣ Starting development server..."
echo "   Server will start on http://localhost:3000 (or next available port)"
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the server
npm run dev

