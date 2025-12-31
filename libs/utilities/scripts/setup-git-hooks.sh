#!/bin/bash
# Setup git hooks with code quality checks
# This script installs pre-commit and pre-push hooks that run checks before commit/push

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔧 Setting Up Git Hooks with Code Quality Checks"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Paths
PRE_COMMIT_SOURCE="$SCRIPT_DIR/pre-commit-with-checks.sh"
PRE_PUSH_SOURCE="$SCRIPT_DIR/pre-push-with-checks.sh"
GIT_HOOKS_DIR="$PROJECT_ROOT/.git/hooks"
PRE_COMMIT_HOOK="$GIT_HOOKS_DIR/pre-commit"
PRE_PUSH_HOOK="$GIT_HOOKS_DIR/pre-push"

# Check if hooks directory exists
if [ ! -d "$GIT_HOOKS_DIR" ]; then
  echo "❌ Git hooks directory not found: $GIT_HOOKS_DIR"
  echo "   Make sure you're in a git repository"
  exit 1
fi

# Install pre-commit hook
echo "📝 Installing pre-commit hook..."
if [ -f "$PRE_COMMIT_SOURCE" ]; then
  cp "$PRE_COMMIT_SOURCE" "$PRE_COMMIT_HOOK"
  chmod +x "$PRE_COMMIT_HOOK"
  echo -e "${GREEN}✅ Pre-commit hook installed${NC}"
else
  echo -e "${YELLOW}⚠️  Pre-commit script not found: $PRE_COMMIT_SOURCE${NC}"
fi

# Install pre-push hook
echo "📝 Installing pre-push hook..."
if [ -f "$PRE_PUSH_SOURCE" ]; then
  cp "$PRE_PUSH_SOURCE" "$PRE_PUSH_HOOK"
  chmod +x "$PRE_PUSH_HOOK"
  echo -e "${GREEN}✅ Pre-push hook installed${NC}"
else
  echo -e "${YELLOW}⚠️  Pre-push script not found: $PRE_PUSH_SOURCE${NC}"
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Git Hooks Installed Successfully!${NC}"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}What happens now:${NC}"
echo "  • Pre-commit: Runs Prettier, ESLint, and TypeScript checks"
echo "  • Pre-push: Runs all checks + Build + SonarQube (if token set)"
echo ""
echo -e "${BLUE}To skip checks (not recommended):${NC}"
echo "  • Skip pre-commit: git commit --no-verify"
echo "  • Skip pre-push: git push --no-verify"
echo ""
echo -e "${BLUE}To disable specific checks:${NC}"
echo "  • Skip build: SKIP_BUILD_CHECK=true git push"
echo "  • Skip SonarQube: SKIP_SONAR_CHECK=true git push"
echo ""
echo -e "${YELLOW}💡 Make sure SONAR_TOKEN is set in .env.local${NC}"
echo ""


















