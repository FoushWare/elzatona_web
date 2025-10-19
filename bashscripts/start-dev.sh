#!/bin/bash

# Startup Script with Configuration Validation
# This script validates configuration before starting the application

echo "🚀 Starting Elzatona Web Application..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please copy env.example to .env and fill in your values:"
    echo "   cp env.example .env"
    echo "   # Then edit .env with your actual values"
    exit 1
fi

echo "✅ .env file found"

# Validate configuration
echo "🔍 Validating configuration..."
npx tsx src/scripts/validate-config.ts

if [ $? -ne 0 ]; then
    echo "❌ Configuration validation failed!"
    echo "📝 Please fix the configuration issues and try again."
    exit 1
fi

echo "✅ Configuration validated successfully!"
echo ""

# Start the development server
echo "🌐 Starting development server..."
npm run dev
