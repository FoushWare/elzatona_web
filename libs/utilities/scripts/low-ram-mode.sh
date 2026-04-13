#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-website}"

export NODE_OPTIONS="--max-old-space-size=2048"
export JEST_MAX_WORKERS="1"

case "$MODE" in
  website)
    echo "Starting website in low-RAM mode..."
    exec npm run dev:turbo
    ;;
  admin)
    echo "Starting admin in low-RAM mode..."
    exec NODE_OPTIONS="--max-old-space-size=1536" npm run dev:admin
    ;;
  check)
    echo "Running low-RAM checks..."
    npm run cleanup:build-cache
    npm run lint:ci
    npm run type-check
    npm run sonar:quick
    ;;
  *)
    echo "Unknown mode: $MODE"
    echo "Usage: bash libs/utilities/scripts/low-ram-mode.sh [website|admin|check]"
    exit 1
    ;;
esac
