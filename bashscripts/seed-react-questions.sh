#!/bin/bash

# React Questions Seeding Script Runner
# This script provides easy commands to clear and seed React questions

echo "🌱 React Questions Seeding Script Runner"
echo "========================================"

case "$1" in
  "clear")
    echo "🗑️  Clearing all questions from Firebase..."
    npx ts-node scripts/clear-questions.ts
    ;;
  "seed-1-25")
    echo "📚 Seeding React questions 1-25..."
    npx ts-node scripts/seed-react-1-25.ts
    ;;
  "seed-26-50")
    echo "📚 Seeding React questions 26-50..."
    npx ts-node scripts/seed-react-26-50.ts
    ;;
  "seed-51-75")
    echo "📚 Seeding React questions 51-75..."
    npx ts-node scripts/seed-react-51-75.ts
    ;;
  "seed-76-100")
    echo "📚 Seeding React questions 76-100..."
    npx ts-node scripts/seed-react-76-100.ts
    ;;
  "seed-101-151")
    echo "📚 Seeding React questions 101-151..."
    npx ts-node scripts/seed-react-101-151.ts
    ;;
  "seed-152-200")
    echo "📚 Seeding React questions 152-200..."
    npx ts-node scripts/seed-react-152-200.ts
    ;;
  "seed-201-251")
    echo "📚 Seeding React questions 201-251..."
    npx ts-node scripts/seed-react-201-251.ts
    ;;
  "seed-252-306")
    echo "📚 Seeding React questions 252-306..."
    npx ts-node scripts/seed-react-252-306.ts
    ;;
  "seed-all")
    echo "🚀 Seeding ALL React questions (1-306)..."
    npx ts-node scripts/seed-all-react-questions.ts
    ;;
  *)
    echo "Usage: $0 {command}"
    echo ""
    echo "Available commands:"
    echo "  clear         - Clear all questions from Firebase"
    echo "  seed-1-25     - Seed React questions 1-25"
    echo "  seed-26-50    - Seed React questions 26-50"
    echo "  seed-51-75    - Seed React questions 51-75"
    echo "  seed-76-100   - Seed React questions 76-100"
    echo "  seed-101-151  - Seed React questions 101-151"
    echo "  seed-152-200  - Seed React questions 152-200"
    echo "  seed-201-251  - Seed React questions 201-251"
    echo "  seed-252-306  - Seed React questions 252-306"
    echo "  seed-all      - Seed ALL React questions (1-306)"
    echo ""
    echo "Examples:"
    echo "  $0 clear"
    echo "  $0 seed-all"
    echo "  $0 seed-1-25"
    ;;
esac
