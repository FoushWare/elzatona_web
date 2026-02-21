#!/usr/bin/env bash
set -euo pipefail

# Bulk-dismiss gitleaks code-scanning alerts referencing files not present in the repo.
# Usage:
#   - Dry-run (show counts + preview): ./scripts/run_gitleaks_dismiss.sh
#   - Execute dismissals: ./scripts/run_gitleaks_dismiss.sh --yes
# The script reads GH_TOKEN from the environment, or falls back to parsing .env.local
# (it will not print the token).

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
DRY_RUN=1
if [[ ${1-} == "--yes" ]]; then
  DRY_RUN=0
fi

# Try environment first, then parse .env.local safely
GH_TOKEN_VALUE=""
if [[ -n "${GH_TOKEN-}" ]]; then
  GH_TOKEN_VALUE="$GH_TOKEN"
elif [[ -f .env.local ]]; then
  # Parse GH_TOKEN value without sourcing the file
  GH_TOKEN_VALUE=$(grep -m1 '^GH_TOKEN=' .env.local | sed -E 's/^GH_TOKEN=("?)(.*)\1$/\2/' || true)
fi

if [[ -z "$GH_TOKEN_VALUE" ]]; then
  echo "ERROR: GH_TOKEN not set in environment and not found in .env.local" >&2
  echo "Export a PAT with the 'security_events' scope as GH_TOKEN or add GH_TOKEN to .env.local." >&2
  exit 2
fi

export GH_TOKEN="$GH_TOKEN_VALUE"

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

echo "Fetching open gitleaks alerts (tool_name=gitleaks, state=open)..."
gh api --paginate "/repos/FoushWare/elzatona_web/code-scanning/alerts?tool_name=gitleaks&state=open&per_page=100" --jq '.[] | [.number,.most_recent_instance.location.path] | @tsv' | sort -n > /tmp/gitleaks_open.tsv

echo "Building missing-file list (alerts that reference paths not present locally)..."
awk -F $'\t' 'NF==2 {print $1"\t"$2}' /tmp/gitleaks_open.tsv | while IFS=$'\t' read -r num path; do
  if [[ -n "$path" && ! -e "$path" ]]; then
    printf "%s\t%s\n" "$num" "$path"
  fi
done > /tmp/gitleaks_missing.tsv || true

echo "Counts (open / missing):"
wc -l /tmp/gitleaks_open.tsv /tmp/gitleaks_missing.tsv || true

echo "Preview (first 5 missing entries):"
head -n 5 /tmp/gitleaks_missing.tsv || true

first_num=$(awk -F $'\t' 'NR==1{print $1}' /tmp/gitleaks_missing.tsv || true)
if [[ -z "$first_num" ]]; then
  echo "No missing-file alerts to dismiss. Exiting."
  exit 0
fi

echo "Sample alert to test dismiss: $first_num"

if [[ $DRY_RUN -eq 1 ]]; then
  echo "Dry-run mode: no alerts will be changed. Re-run with --yes to perform dismissals."
  echo "To test dismissal of one alert manually run:"
  echo "  gh api -X PATCH \"/repos/FoushWare/elzatona_web/code-scanning/alerts/$first_num\" -f state=\"dismissed\" -f dismissed_reason=\"won't fix\" -f dismissed_comment=\"File not present in repo; dismissed as stale.\" --jq '{number:.number,state:.state,dismissed_at:.dismissed_at}'"
  exit 0
fi

echo "Proceeding to dismiss all missing-file alerts..."
success=0
fail=0
line=0
while IFS=$'\t' read -r num path; do
  line=$((line+1))
  if [[ -z "$num" ]]; then
    continue
  fi
  # Perform dismissal
  if gh api -X PATCH "/repos/FoushWare/elzatona_web/code-scanning/alerts/$num" -f state="dismissed" -f dismissed_reason="won't fix" -f dismissed_comment="File not present in repo; dismissed as stale." --jq '{number:.number,state:.state}' >/dev/null 2>&1; then
    success=$((success+1))
  else
    echo "ERR dismiss $num" >&2
    fail=$((fail+1))
  fi
  if (( line <= 10 )); then
    :
  elif (( line % 100 == 0 )); then
    echo "Progress: processed $line alerts"
  fi
done < /tmp/gitleaks_missing.tsv

echo "Dismissal complete. success=$success fail=$fail"

echo "Regenerating post-run counts..."
gh api --paginate "/repos/FoushWare/elzatona_web/code-scanning/alerts?tool_name=gitleaks&state=open&per_page=100" --jq '.[] | [.number,.most_recent_instance.location.path] | @tsv' | sort -n > /tmp/gitleaks_open_after.tsv || true
awk -F $'\t' 'NF==2 {print $1"\t"$2}' /tmp/gitleaks_open_after.tsv | while IFS=$'\t' read -r num path; do if [[ -n "$path" && ! -e "$path" ]]; then printf "%s\t%s\n" "$num" "$path"; fi; done > /tmp/gitleaks_missing_after.tsv || true
wc -l /tmp/gitleaks_open_after.tsv /tmp/gitleaks_missing_after.tsv || true

echo "Script finished."
