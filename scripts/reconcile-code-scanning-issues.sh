#!/bin/bash

set -euo pipefail

MODE="${1:-help}"
APPLY_CHANGES="false"
PR_NUMBER=""
REPO="${REPO:-FoushWare/elzatona_web}"

usage() {
  cat <<'EOF'
Usage:
  bash scripts/reconcile-code-scanning-issues.sh resolved-by-pr --pr <number> [--apply]
  bash scripts/reconcile-code-scanning-issues.sh dedupe-bugs [--apply]

Modes:
  resolved-by-pr   Find issues linked to a PR and close/delete matching code-scanning issues.
  dedupe-bugs      Find duplicate open issues with label bugs by alert number and clean duplicates.

Flags:
  --pr <number>    Pull request number (required for resolved-by-pr mode)
  --apply          Apply changes (default is dry-run)

Examples:
  bash scripts/reconcile-code-scanning-issues.sh resolved-by-pr --pr 7525
  bash scripts/reconcile-code-scanning-issues.sh resolved-by-pr --pr 7525 --apply
  bash scripts/reconcile-code-scanning-issues.sh dedupe-bugs
  bash scripts/reconcile-code-scanning-issues.sh dedupe-bugs --apply
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "❌ Missing required command: $1"
    exit 1
  fi
}

is_code_scanning_issue() {
  local title="$1"
  local labels_csv="$2"

  if echo "$labels_csv" | tr ',' '\n' | grep -iq '^bugs$'; then
    return 0
  fi

  if echo "$title" | grep -Eiq 'alert[[:space:]]*#[0-9]+'; then
    return 0
  fi

  return 1
}

close_issue() {
  local issue_number="$1"
  local comment="$2"

  if [[ "$APPLY_CHANGES" != "true" ]]; then
    echo "[dry-run] Would close issue #$issue_number"
    return
  fi

  gh issue close "$issue_number" --repo "$REPO" --comment "$comment" >/dev/null
  echo "✅ Closed issue #$issue_number"
}

delete_issue() {
  local issue_number="$1"

  if [[ "$APPLY_CHANGES" != "true" ]]; then
    echo "[dry-run] Would delete issue #$issue_number"
    return
  fi

  gh issue delete "$issue_number" --repo "$REPO" --yes >/dev/null
  echo "🗑️ Deleted issue #$issue_number"
}

run_resolved_by_pr() {
  if [[ -z "$PR_NUMBER" ]]; then
    echo "❌ --pr is required for resolved-by-pr mode"
    exit 1
  fi

  local owner repo_name
  owner="${REPO%%/*}"
  repo_name="${REPO##*/}"

  local query
  query='query($owner:String!,$repo:String!,$number:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$number){closingIssuesReferences(first:100){nodes{id number title state labels(first:20){nodes{name}}}}}}}'

  local json
  json=$(gh api graphql -f query="$query" -F owner="$owner" -F repo="$repo_name" -F number="$PR_NUMBER")

  echo "$json" | jq -c '.data.repository.pullRequest.closingIssuesReferences.nodes[]?' | while read -r issue; do
    local issue_number issue_title issue_state labels_csv
    issue_number=$(echo "$issue" | jq -r '.number')
    issue_title=$(echo "$issue" | jq -r '.title')
    issue_state=$(echo "$issue" | jq -r '.state')
    labels_csv=$(echo "$issue" | jq -r '[.labels.nodes[].name] | join(",")')

    if ! is_code_scanning_issue "$issue_title" "$labels_csv"; then
      continue
    fi

    if [[ "$issue_state" == "OPEN" ]]; then
      close_issue "$issue_number" "Closed automatically: resolved by merged PR #$PR_NUMBER."
    else
      echo "ℹ️ Issue #$issue_number already closed"
    fi

    delete_issue "$issue_number"
  done
}

extract_alert_id() {
  local title="$1"
  local body="$2"
  local alert_id=""

  alert_id=$(echo "$title" | sed -nE 's/.*[Aa]lert[[:space:]]*#([0-9]+).*/\1/p' | head -n1)
  if [[ -n "$alert_id" ]]; then
    echo "$alert_id"
    return
  fi

  alert_id=$(echo "$body" | sed -nE 's/.*Code[[:space:]]+Scanning[[:space:]]+Alert[[:space:]]*#([0-9]+).*/\1/p' | head -n1)
  echo "$alert_id"
}

run_dedupe_bugs() {
  local issues_json
  issues_json=$(gh issue list --repo "$REPO" --state open --label bugs --limit 1000 --json number,title,body,url)

  local tmp_file
  tmp_file=$(mktemp)

  echo "$issues_json" | jq -c '.[]' | while read -r issue; do
    local number title body alert_id
    number=$(echo "$issue" | jq -r '.number')
    title=$(echo "$issue" | jq -r '.title')
    body=$(echo "$issue" | jq -r '.body // ""')
    alert_id=$(extract_alert_id "$title" "$body")

    if [[ -n "$alert_id" ]]; then
      echo "$alert_id|$number|$title" >> "$tmp_file"
    fi
  done

  if [[ ! -s "$tmp_file" ]]; then
    echo "ℹ️ No bugs issues with detectable alert IDs found."
    rm -f "$tmp_file"
    return
  fi

  cut -d'|' -f1 "$tmp_file" | sort | uniq | while read -r alert_id; do
    local rows count keeper keeper_number
    rows=$(grep "^${alert_id}|" "$tmp_file" | sort -t'|' -k2,2n)
    count=$(echo "$rows" | wc -l | tr -d ' ')

    if [[ "$count" -le 1 ]]; then
      continue
    fi

    keeper=$(echo "$rows" | head -n1)
    keeper_number=$(echo "$keeper" | cut -d'|' -f2)
    echo "🔁 Alert #$alert_id has $count open issues. Keeping #$keeper_number and removing duplicates."

    echo "$rows" | tail -n +2 | while IFS='|' read -r _ duplicate_number _; do
      close_issue "$duplicate_number" "Closing duplicate of #$keeper_number for Code Scanning Alert #$alert_id."
      delete_issue "$duplicate_number"
    done
  done

  rm -f "$tmp_file"
}

parse_args() {
  shift
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --apply)
        APPLY_CHANGES="true"
        shift
        ;;
      --pr)
        PR_NUMBER="${2:-}"
        shift 2
        ;;
      *)
        echo "❌ Unknown argument: $1"
        usage
        exit 1
        ;;
    esac
  done
}

main() {
  require_cmd gh
  require_cmd jq

  case "$MODE" in
    resolved-by-pr)
      parse_args "$@"
      run_resolved_by_pr
      ;;
    dedupe-bugs)
      parse_args "$@"
      run_dedupe_bugs
      ;;
    help|-h|--help)
      usage
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}

main "$@"
