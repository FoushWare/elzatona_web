#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-all}"

cd "$ROOT_DIR"

export NEXT_PUBLIC_SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://placeholder.supabase.co}"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY:-placeholder-key}"
export JWT_SECRET="${JWT_SECRET:-placeholder-secret}"
export NEXT_TELEMETRY_DISABLED="${NEXT_TELEMETRY_DISABLED:-1}"

run_prettier_check() {
  local files=()
  local file

  while IFS= read -r -d '' file; do
    files+=("$file")
  done < <(
    git ls-files -z | while IFS= read -r -d '' file; do
      if [[ "$file" =~ \.(js|jsx|ts|tsx|json|md|yml|yaml|css|scss|html)$ ]] && [[ -f "$file" && ! -L "$file" ]]; then
        printf '%s\0' "$file"
      fi
    done
  )

  if [[ ${#files[@]} -eq 0 ]]; then
    echo "No tracked files found for Prettier check."
    return 0
  fi

  npx prettier --check "${files[@]}"
}

run_lint_check() {
  npm run lint
}

run_type_check() {
  NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}" npm run type-check
}

run_build_check() {
  npm run build
}

case "$MODE" in
  format)
    run_prettier_check
    ;;
  lint)
    run_lint_check
    ;;
  typecheck)
    run_type_check
    ;;
  build)
    run_build_check
    ;;
  all)
    run_prettier_check
    run_lint_check
    run_type_check
    # Removed run_build_check from local pre-push to avoid Nx signalExit bugs and speed up local workflow
    ;;
  *)
    echo "Unknown mode: $MODE"
    echo "Usage: bash scripts/ci-quality-gate.sh [format|lint|typecheck|build|all]"
    exit 1
    ;;
esac