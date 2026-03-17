#!/usr/bin/env bash

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

cd "$PROJECT_ROOT"

if [ ! -d .git ]; then
  echo "❌ Git repository not found. Run this command from the project root."
  exit 1
fi

mkdir -p .husky
chmod +x .husky/pre-commit .husky/pre-push 2>/dev/null || true
npx husky

echo ""
echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Git Hooks Installed Successfully${NC}"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}Hook behavior:${NC}"
echo "  • Pre-commit: Runs lint-staged on staged files"
echo "  • Pre-push: Runs the same format, lint, type-check, and build gates used by CI"
echo ""
echo -e "${BLUE}Maintenance:${NC}"
echo "  • Hooks are automatically enabled by 'npm install' via the prepare script"
echo "  • Re-run 'npm run setup:hooks' if hooks are removed locally"
echo ""













