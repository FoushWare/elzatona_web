#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$REPO_ROOT/tmp"
REPORT_FILE="$OUTPUT_DIR/gitleaks-report.json"

mkdir -p "$OUTPUT_DIR"

# Run Gitleaks against the working tree only (no git history).
# Uses repo config if present.
gitleaks detect \
  --source "$REPO_ROOT" \
  --no-git \
  --redact \
  --report-format json \
  --report-path "$REPORT_FILE"

echo "Gitleaks report written to: $REPORT_FILE"
