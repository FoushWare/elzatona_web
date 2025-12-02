#!/bin/bash
# Script to switch between different pre-push hook configurations

HOOKS_DIR="Rest/other/.husky"
GIT_HOOKS_DIR=".git/hooks"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔄 Switching Pre-Push Hook Configuration"
echo "════════════════════════════════════════════════════════════════"
echo ""

if [ "$1" == "with-lint-ts" ]; then
  echo "📝 Switching to pre-push hook WITH linting and TypeScript checks..."
  cp "$HOOKS_DIR/pre-push-with-lint-ts" "$HOOKS_DIR/pre-push"
  cp "$HOOKS_DIR/pre-push" "$GIT_HOOKS_DIR/pre-push"
  chmod +x "$GIT_HOOKS_DIR/pre-push"
  echo "✅ Switched to pre-push hook with linting and TypeScript checks"
  echo "   🔍 Will run: ESLint auto-fix, ESLint check, TypeScript check, Build"
elif [ "$1" == "standard" ] || [ "$1" == "" ]; then
  echo "📝 Switching to standard pre-push hook (build only)..."
  # Restore the standard pre-push (which now includes linting and TS)
  cp "$HOOKS_DIR/pre-push" "$GIT_HOOKS_DIR/pre-push"
  chmod +x "$GIT_HOOKS_DIR/pre-push"
  echo "✅ Switched to standard pre-push hook"
  echo "   🔍 Will run: ESLint auto-fix, ESLint check, TypeScript check, Build"
else
  echo "❌ Unknown option: $1"
  echo ""
  echo "Usage: bash Rest/scripts/scripts/switch-pre-push.sh [option]"
  echo ""
  echo "Options:"
  echo "  standard      - Standard pre-push hook (default, includes linting & TS)"
  echo "  with-lint-ts  - Pre-push hook with linting and TypeScript checks"
  echo ""
  exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ Pre-push hook configuration updated!"
echo "════════════════════════════════════════════════════════════════"
echo ""

