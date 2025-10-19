#!/bin/bash

# Performance Patterns Questions Seeding Script
# This script clears existing questions and seeds Performance Patterns questions

echo "⚡ Performance Patterns Questions Seeding Process"
echo "================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to run a command and check for errors
run_command() {
    echo "🔄 Running: $1"
    if eval "$1"; then
        echo "✅ Command completed successfully"
    else
        echo "❌ Command failed: $1"
        exit 1
    fi
}

# Clear existing questions
echo ""
echo "🧹 Step 1: Clearing existing questions..."
run_command "node scripts/clear-questions.js"

# Wait a moment for the clear operation to complete
echo "⏳ Waiting for clear operation to complete..."
sleep 2

# Seed Performance Patterns questions
echo ""
echo "🌱 Step 2: Seeding Performance Patterns questions..."
run_command "node scripts/seed-all-performance-patterns-questions.js"

echo ""
echo "🎉 Performance Patterns Questions seeding completed successfully!"
echo "📊 Check your Firebase console to verify the questions were added"
echo "🌐 Visit http://localhost:3000/admin/content/questions to see the questions"
