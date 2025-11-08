#!/bin/bash

# This script provides a convenient way to clear and seed System Design questions.

# Function to display usage
usage() {
  echo "Usage: $0 {clear|seed}"
  echo "  clear - Clears all questions from the Firebase 'questions' collection."
  echo "  seed  - Seeds all System Design questions from questions-system-design.json."
  exit 1
}

# Check if npx and ts-node are available
if ! command -v npx &> /dev/null
then
    echo "npx could not be found. Please ensure Node.js and npm are installed."
    exit 1
fi

if ! npx ts-node --version &> /dev/null
then
    echo "ts-node could not be found. Please install it: npm install -g ts-node"
    exit 1
fi

# Navigate to the project root if not already there
if [[ "$(basename "$PWD")" == "scripts" ]]; then
  echo "Navigating to project root..."
  cd ..
fi

# Execute the requested action
case "$1" in
  clear)
    echo "Executing clear-questions.ts..."
    npx ts-node scripts/clear-questions.ts
    ;;
  seed)
    echo "Executing seed-system-design-questions.js..."
    node scripts/seed-system-design-questions.js
    ;;
  *)
    usage
    ;;
esac
