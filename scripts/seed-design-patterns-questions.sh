#!/bin/bash

# This script provides a convenient way to clear and seed Design Patterns questions.

# Function to display usage
usage() {
  echo "Usage: $0 {clear|seed-all|seed-observer|seed-singleton|seed-factory|seed-strategy|seed-decorator|seed-command|seed-adapter|seed-facade|seed-proxy|seed-builder|seed-template-method|seed-state|seed-chain-of-responsibility|seed-memento|seed-visitor|seed-flyweight|seed-bridge|seed-composite|seed-iterator|seed-prototype|seed-abstract-factory|seed-interpreter|seed-mediator}"
  echo "  clear                - Clears all questions from the Firebase 'questions' collection."
  echo "  seed-all             - Seeds all Design Patterns questions from all JSON files in sequence."
  echo "  seed-observer        - Seeds Design Patterns questions from observer-pattern.json."
  echo "  seed-singleton       - Seeds Design Patterns questions from singleton-pattern.json."
  echo "  seed-factory         - Seeds Design Patterns questions from factory-pattern.json."
  echo "  seed-strategy        - Seeds Design Patterns questions from strategy-pattern.json."
  echo "  seed-decorator       - Seeds Design Patterns questions from decorator-pattern.json."
  echo "  seed-command         - Seeds Design Patterns questions from command-pattern.json."
  echo "  seed-adapter         - Seeds Design Patterns questions from adapter-pattern.json."
  echo "  seed-facade          - Seeds Design Patterns questions from facade-pattern.json."
  echo "  seed-proxy           - Seeds Design Patterns questions from proxy-pattern.json."
  echo "  seed-builder         - Seeds Design Patterns questions from builder-pattern.json."
  echo "  seed-template-method - Seeds Design Patterns questions from template-method-pattern.json."
  echo "  seed-state           - Seeds Design Patterns questions from state-pattern.json."
  echo "  seed-chain-of-responsibility - Seeds Design Patterns questions from chain-of-responsibility-pattern.json."
  echo "  seed-memento         - Seeds Design Patterns questions from memento-pattern.json."
  echo "  seed-visitor         - Seeds Design Patterns questions from visitor-pattern.json."
  echo "  seed-flyweight       - Seeds Design Patterns questions from flyweight-pattern.json."
  echo "  seed-bridge          - Seeds Design Patterns questions from bridge-pattern.json."
  echo "  seed-composite       - Seeds Design Patterns questions from composite-pattern.json."
  echo "  seed-iterator        - Seeds Design Patterns questions from iterator-pattern.json."
  echo "  seed-prototype       - Seeds Design Patterns questions from prototype-pattern.json."
  echo "  seed-abstract-factory - Seeds Design Patterns questions from abstract-factory-pattern.json."
  echo "  seed-interpreter     - Seeds Design Patterns questions from interpreter-pattern.json."
  echo "  seed-mediator        - Seeds Design Patterns questions from mediator-pattern.json."
  exit 1
}

# Check if node is available
if ! command -v node &> /dev/null
then
    echo "node could not be found. Please ensure Node.js is installed."
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
    echo "Executing clear-questions.js..."
    node scripts/clear-questions.js
    ;;
  seed-all)
    echo "Executing seed-all-design-patterns-questions.js..."
    node scripts/seed-all-design-patterns-questions.js
    ;;
  seed-observer)
    echo "Executing seed-design-patterns-observer-pattern.js..."
    node scripts/seed-design-patterns-observer-pattern.js
    ;;
  seed-singleton)
    echo "Executing seed-design-patterns-singleton-pattern.js..."
    node scripts/seed-design-patterns-singleton-pattern.js
    ;;
  seed-factory)
    echo "Executing seed-design-patterns-factory-pattern.js..."
    node scripts/seed-design-patterns-factory-pattern.js
    ;;
  seed-strategy)
    echo "Executing seed-design-patterns-strategy-pattern.js..."
    node scripts/seed-design-patterns-strategy-pattern.js
    ;;
  seed-decorator)
    echo "Executing seed-design-patterns-decorator-pattern.js..."
    node scripts/seed-design-patterns-decorator-pattern.js
    ;;
  seed-command)
    echo "Executing seed-design-patterns-command-pattern.js..."
    node scripts/seed-design-patterns-command-pattern.js
    ;;
  seed-adapter)
    echo "Executing seed-design-patterns-adapter-pattern.js..."
    node scripts/seed-design-patterns-adapter-pattern.js
    ;;
  seed-facade)
    echo "Executing seed-design-patterns-facade-pattern.js..."
    node scripts/seed-design-patterns-facade-pattern.js
    ;;
  seed-proxy)
    echo "Executing seed-design-patterns-proxy-pattern.js..."
    node scripts/seed-design-patterns-proxy-pattern.js
    ;;
  seed-builder)
    echo "Executing seed-design-patterns-builder-pattern.js..."
    node scripts/seed-design-patterns-builder-pattern.js
    ;;
  seed-template-method)
    echo "Executing seed-design-patterns-template-method-pattern.js..."
    node scripts/seed-design-patterns-template-method-pattern.js
    ;;
  seed-state)
    echo "Executing seed-design-patterns-state-pattern.js..."
    node scripts/seed-design-patterns-state-pattern.js
    ;;
  seed-chain-of-responsibility)
    echo "Executing seed-design-patterns-chain-of-responsibility-pattern.js..."
    node scripts/seed-design-patterns-chain-of-responsibility-pattern.js
    ;;
  seed-memento)
    echo "Executing seed-design-patterns-memento-pattern.js..."
    node scripts/seed-design-patterns-memento-pattern.js
    ;;
  seed-visitor)
    echo "Executing seed-design-patterns-visitor-pattern.js..."
    node scripts/seed-design-patterns-visitor-pattern.js
    ;;
  seed-flyweight)
    echo "Executing seed-design-patterns-flyweight-pattern.js..."
    node scripts/seed-design-patterns-flyweight-pattern.js
    ;;
  seed-bridge)
    echo "Executing seed-design-patterns-bridge-pattern.js..."
    node scripts/seed-design-patterns-bridge-pattern.js
    ;;
  seed-composite)
    echo "Executing seed-design-patterns-composite-pattern.js..."
    node scripts/seed-design-patterns-composite-pattern.js
    ;;
  seed-iterator)
    echo "Executing seed-design-patterns-iterator-pattern.js..."
    node scripts/seed-design-patterns-iterator-pattern.js
    ;;
  seed-prototype)
    echo "Executing seed-design-patterns-prototype-pattern.js..."
    node scripts/seed-design-patterns-prototype-pattern.js
    ;;
  seed-abstract-factory)
    echo "Executing seed-design-patterns-abstract-factory-pattern.js..."
    node scripts/seed-design-patterns-abstract-factory-pattern.js
    ;;
  seed-interpreter)
    echo "Executing seed-design-patterns-interpreter-pattern.js..."
    node scripts/seed-design-patterns-interpreter-pattern.js
    ;;
  seed-mediator)
    echo "Executing seed-design-patterns-mediator-pattern.js..."
    node scripts/seed-design-patterns-mediator-pattern.js
    ;;
  *)
    usage
    ;;
esac
