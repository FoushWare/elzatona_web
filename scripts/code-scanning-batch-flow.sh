#!/bin/bash

set -euo pipefail

MODE="${1:-start}"
BRANCH_PREFIX="${BRANCH_PREFIX:-fix/code-scanning-bugs}"
ISSUE_LIMIT="${ISSUE_LIMIT:-500}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

usage() {
  cat <<'EOF'
Usage:
  bash scripts/code-scanning-batch-flow.sh start
  bash scripts/code-scanning-batch-flow.sh pr

Modes:
  start   Sync local main with origin/main, create a fresh branch, and generate
          a remediation report for open code-scanning alerts + open "bugs" issues.
  pr      Push current branch and create PR to main.

Environment variables:
  BRANCH_PREFIX   Prefix for new remediation branches (default: fix/code-scanning-bugs)
  ISSUE_LIMIT     Max number of open "bugs" issues to fetch (default: 500)
  PR_TITLE        Optional title for pr mode
  PR_BODY_FILE    Optional markdown file for PR body in pr mode

Examples:
  bash scripts/code-scanning-batch-flow.sh start
  PR_TITLE="fix(code-scanning): resolve batch alerts" bash scripts/code-scanning-batch-flow.sh pr
EOF
}

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo -e "${RED}❌ Missing required command: ${cmd}${NC}"
    exit 1
  fi
}

ensure_clean_worktree() {
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo -e "${RED}❌ Working tree is not clean.${NC}"
    echo -e "${YELLOW}   Commit or stash changes before starting a new code-scanning batch.${NC}"
    exit 1
  fi
}

repo_name_with_owner() {
  gh repo view --json nameWithOwner --jq '.nameWithOwner'
}

count_open_code_scanning_alerts() {
  local repo="$1"
  local page=1
  local total=0
  local alerts_file="$2"

  : > "$alerts_file"

  while true; do
    local response
    response=$(gh api "/repos/${repo}/code-scanning/alerts?state=open&per_page=100&page=${page}")
    local page_count
    page_count=$(echo "$response" | jq 'length')

    if [[ "$page_count" -eq 0 ]]; then
      break
    fi

    total=$((total + page_count))

    echo "$response" | jq -r '.[] | [
      .number,
      .rule.id,
      .rule.security_severity_level,
      .most_recent_instance.location.path
    ] | @tsv' >> "$alerts_file"

    if [[ "$page_count" -lt 100 ]]; then
      break
    fi

    page=$((page + 1))
  done

  echo "$total"
}

create_start_report() {
  local branch_name="$1"
  local repo="$2"
  local issues_json="$3"
  local issues_count="$4"
  local alerts_count="$5"
  local alerts_file="$6"
  local timestamp="$7"
  local report_file="docs/security/CODESCANNING_BATCH_${timestamp}.md"

  cat > "$report_file" <<EOF
# Code Scanning Remediation Batch

## Scope

- Repository: ${repo}
- Branch: ${branch_name}
- Open code-scanning alerts: ${alerts_count}
- Open issues with label bugs: ${issues_count}

## Required Flow

1. Started from latest main.
2. Created a dedicated remediation branch.
3. Fix code-scanning issues.
4. Commit and push branch.
5. Open PR to main.
6. After merge, linked issues are closed/deleted by workflow.

## bugs Issues (Open)

EOF

  if [[ "$issues_count" -gt 0 ]]; then
    echo "$issues_json" | jq -r '.[] | "- [ ] #\(.number) \(.title) (\(.url))"' >> "$report_file"
  else
    echo "- None" >> "$report_file"
  fi

  cat >> "$report_file" <<EOF

## Code Scanning Alerts Snapshot

EOF

  if [[ "$alerts_count" -gt 0 ]]; then
    {
      echo "| Alert | Rule | Severity | File |"
      echo "|---|---|---|---|"
      head -n 100 "$alerts_file" | awk -F'\t' '{printf "| #%s | %s | %s | %s |\n", $1, $2, $3, $4}'
    } >> "$report_file"

    if [[ "$alerts_count" -gt 100 ]]; then
      echo "" >> "$report_file"
      echo "- Showing first 100 alerts only (total open: ${alerts_count})." >> "$report_file"
    fi
  else
    echo "- None" >> "$report_file"
  fi

  cat >> "$report_file" <<EOF

## Next Command

After you finish fixes and commit on ${branch_name}:

\`bash scripts/code-scanning-batch-flow.sh pr\`
EOF

  echo "$report_file"
}

run_start() {
  require_cmd git
  require_cmd gh
  require_cmd jq

  ensure_clean_worktree

  local repo
  repo="$(repo_name_with_owner)"

  echo -e "${BLUE}🔄 Syncing with origin/main...${NC}"
  git fetch origin main
  git checkout main
  git pull --ff-only origin main

  local timestamp
  timestamp="$(date -u +%Y%m%d-%H%M%S)"
  local branch_name
  branch_name="${BRANCH_PREFIX}-${timestamp}"

  echo -e "${BLUE}🌿 Creating branch ${branch_name}...${NC}"
  git checkout -b "$branch_name"

  echo -e "${BLUE}📥 Fetching open issues with label bugs...${NC}"
  local issues_json
  issues_json="$(gh issue list --repo "$repo" --state open --label bugs --limit "$ISSUE_LIMIT" --json number,title,url)"
  local issues_count
  issues_count="$(echo "$issues_json" | jq 'length')"

  echo -e "${BLUE}🛡️ Fetching open code-scanning alerts...${NC}"
  local alerts_file
  alerts_file="$(mktemp)"
  local alerts_count
  alerts_count="$(count_open_code_scanning_alerts "$repo" "$alerts_file")"

  local report_file
  report_file="$(create_start_report "$branch_name" "$repo" "$issues_json" "$issues_count" "$alerts_count" "$alerts_file" "$timestamp")"

  rm -f "$alerts_file"

  echo -e "${GREEN}✅ Batch started successfully${NC}"
  echo -e "${GREEN}   Branch: ${branch_name}${NC}"
  echo -e "${GREEN}   Report: ${report_file}${NC}"
}

run_pr() {
  require_cmd git
  require_cmd gh

  local current_branch
  current_branch="$(git branch --show-current)"

  if [[ "$current_branch" == "main" ]]; then
    echo -e "${RED}❌ Current branch is main. Switch to a remediation branch first.${NC}"
    exit 1
  fi

  if [[ -z "$(git log origin/main..HEAD --oneline 2>/dev/null || true)" ]]; then
    echo -e "${RED}❌ No commits found ahead of origin/main on ${current_branch}.${NC}"
    echo -e "${YELLOW}   Add fixes and commit before creating PR.${NC}"
    exit 1
  fi

  echo -e "${BLUE}⬆️ Pushing branch ${current_branch}...${NC}"
  git push -u origin "$current_branch"

  local default_title
  default_title="fix(code-scanning): resolve bugs batch on ${current_branch}"
  local pr_title
  pr_title="${PR_TITLE:-$default_title}"

  local default_body_file
  default_body_file="tmp/${current_branch//\//-}-pr-body.md"
  local pr_body_file
  pr_body_file="${PR_BODY_FILE:-$default_body_file}"

  if [[ ! -f "$pr_body_file" ]]; then
    mkdir -p tmp
    cat > "$pr_body_file" <<EOF
## Summary

- Resolve code-scanning findings and related issues with label bugs.
- Branch was created from latest main before applying fixes.

## Related issues

Add only issues fixed by this PR, for example:

- Closes #1234
- Closes #5678
EOF
  fi

  echo -e "${BLUE}🧾 Creating PR to main...${NC}"
  gh pr create \
    --base main \
    --head "$current_branch" \
    --title "$pr_title" \
    --body-file "$pr_body_file"

  echo -e "${GREEN}✅ PR created targeting main.${NC}"
}

case "$MODE" in
  start)
    run_start
    ;;
  pr)
    run_pr
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    echo -e "${RED}❌ Unknown mode: ${MODE}${NC}"
    usage
    exit 1
    ;;
esac
