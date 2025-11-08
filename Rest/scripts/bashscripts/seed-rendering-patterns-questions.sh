#!/bin/bash

# This script provides a convenient way to clear and seed Rendering Patterns questions.

# Function to display usage
usage() {
  echo "Usage: $0 {clear|seed-all|seed-rendering|seed-rendering-2|seed-rendering-4|seed-rendering-5|seed-render-6|seed-render-7|seed-rendering-8|seed-rendering-9|seed-rendering-10|seed-island-archeticure}"
  echo "  clear                    - Clears all questions from the Firebase 'questions' collection."
  echo "  seed-all                 - Seeds all Rendering Patterns questions from all JSON files in sequence."
  echo "  seed-rendering           - Seeds Rendering Patterns questions from rendering.json."
  echo "  seed-rendering-2         - Seeds Rendering Patterns questions from rendering-2.json."
  echo "  seed-rendering-4         - Seeds Rendering Patterns questions from rendering-4.json."
  echo "  seed-rendering-5         - Seeds Rendering Patterns questions from rendering-5.json."
  echo "  seed-render-6            - Seeds Rendering Patterns questions from render-6.json."
  echo "  seed-render-7            - Seeds Rendering Patterns questions from render-7.json."
  echo "  seed-rendering-8         - Seeds Rendering Patterns questions from rendering-8.json."
  echo "  seed-rendering-9         - Seeds Rendering Patterns questions from rendering-9.json."
  echo "  seed-rendering-10        - Seeds Rendering Patterns questions from rendering-10.json."
  echo "  seed-island-archeticure  - Seeds Rendering Patterns questions from island-archeticure.json."
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
# This script assumes it's run from the project root or scripts directory
# If run from scripts/, it will cd ..
# If run from root, it will stay in root
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
  seed-all)
    echo "Executing seed-all-rendering-patterns-questions.ts..."
    npx ts-node scripts/seed-all-rendering-patterns-questions.ts
    ;;
  seed-rendering)
    echo "Executing seed-rendering-patterns-rendering.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering.ts
    ;;
  seed-rendering-2)
    echo "Executing seed-rendering-patterns-rendering-2.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering-2.ts
    ;;
  seed-rendering-4)
    echo "Executing seed-rendering-patterns-rendering-4.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering-4.ts
    ;;
  seed-rendering-5)
    echo "Executing seed-rendering-patterns-rendering-5.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering-5.ts
    ;;
  seed-render-6)
    echo "Executing seed-rendering-patterns-render-6.ts..."
    npx ts-node scripts/seed-rendering-patterns-render-6.ts
    ;;
  seed-render-7)
    echo "Executing seed-rendering-patterns-render-7.ts..."
    npx ts-node scripts/seed-rendering-patterns-render-7.ts
    ;;
  seed-rendering-8)
    echo "Executing seed-rendering-patterns-rendering-8.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering-8.ts
    ;;
  seed-rendering-9)
    echo "Executing seed-rendering-patterns-rendering-9.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering-9.ts
    ;;
  seed-rendering-10)
    echo "Executing seed-rendering-patterns-rendering-10.ts..."
    npx ts-node scripts/seed-rendering-patterns-rendering-10.ts
    ;;
  seed-island-archeticure)
    echo "Executing seed-rendering-patterns-island-archeticure.ts..."
    npx ts-node scripts/seed-rendering-patterns-island-archeticure.ts
    ;;
  *)
    usage
    ;;
esac
