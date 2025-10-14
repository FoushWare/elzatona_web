#!/bin/bash

# This script provides a convenient way to clear and seed Security questions.

# Function to display usage
usage() {
  echo "Usage: $0 {clear|seed-all|seed-sec-01|seed-sec-02|seed-sec-03|seed-sec-04|seed-sec-05|seed-sec-06|seed-sec-07|seed-sec-08|seed-sec-09|seed-sec-10|seed-sec-11}"
  echo "  clear        - Clears all questions from the Firebase 'questions' collection."
  echo "  seed-all     - Seeds all Security questions from all JSON files in sequence."
  echo "  seed-sec-01  - Seeds Security questions from sec-01.json."
  echo "  seed-sec-02  - Seeds Security questions from sec-02.json."
  echo "  seed-sec-03  - Seeds Security questions from sec-03.json."
  echo "  seed-sec-04  - Seeds Security questions from sec-04.json."
  echo "  seed-sec-05  - Seeds Security questions from sec-05.json."
  echo "  seed-sec-06  - Seeds Security questions from sec-06.json."
  echo "  seed-sec-07  - Seeds Security questions from sec-07.json."
  echo "  seed-sec-08  - Seeds Security questions from sec-08.json."
  echo "  seed-sec-09  - Seeds Security questions from sec-09.json."
  echo "  seed-sec-10  - Seeds Security questions from sec-10.json."
  echo "  seed-sec-11  - Seeds Security questions from sec-11.json."
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
  seed-all)
    echo "Executing seed-all-security-questions.ts..."
    npx ts-node scripts/seed-all-security-questions.ts
    ;;
  seed-sec-01)
    echo "Executing seed-security-sec-01.ts..."
    npx ts-node scripts/seed-security-sec-01.ts
    ;;
  seed-sec-02)
    echo "Executing seed-security-sec-02.ts..."
    npx ts-node scripts/seed-security-sec-02.ts
    ;;
  seed-sec-03)
    echo "Executing seed-security-sec-03.ts..."
    npx ts-node scripts/seed-security-sec-03.ts
    ;;
  seed-sec-04)
    echo "Executing seed-security-sec-04.ts..."
    npx ts-node scripts/seed-security-sec-04.ts
    ;;
  seed-sec-05)
    echo "Executing seed-security-sec-05.ts..."
    npx ts-node scripts/seed-security-sec-05.ts
    ;;
  seed-sec-06)
    echo "Executing seed-security-sec-06.ts..."
    npx ts-node scripts/seed-security-sec-06.ts
    ;;
  seed-sec-07)
    echo "Executing seed-security-sec-07.ts..."
    npx ts-node scripts/seed-security-sec-07.ts
    ;;
  seed-sec-08)
    echo "Executing seed-security-sec-08.ts..."
    npx ts-node scripts/seed-security-sec-08.ts
    ;;
  seed-sec-09)
    echo "Executing seed-security-sec-09.ts..."
    npx ts-node scripts/seed-security-sec-09.ts
    ;;
  seed-sec-10)
    echo "Executing seed-security-sec-10.ts..."
    npx ts-node scripts/seed-security-sec-10.ts
    ;;
  seed-sec-11)
    echo "Executing seed-security-sec-11.ts..."
    npx ts-node scripts/seed-security-sec-11.ts
    ;;
  *)
    usage
    ;;
esac
